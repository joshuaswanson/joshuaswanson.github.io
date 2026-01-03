// Utility function to update sliding background
function updateSwitcherBg(switcher, animate = true) {
    const activeBtn = switcher.querySelector('button.active');
    const bg = switcher.querySelector('.switcher-bg');
    if (activeBtn && bg) {
        if (!animate) {
            bg.style.transition = 'none';
        }
        bg.style.width = `${activeBtn.offsetWidth}px`;
        bg.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
        if (!animate) {
            // Force reflow then restore transition
            bg.offsetHeight;
            bg.style.transition = '';
        }
    }
}

// Reset all button colors to their proper state
function resetButtonColors(switcher) {
    const buttons = switcher.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.style.color = '';
    });
}

// Update button colors based on bg overlap during drag
function updateButtonColorsDuringDrag(switcher, bgLeft, bgWidth) {
    const buttons = switcher.querySelectorAll('button');
    const bgRight = bgLeft + bgWidth;
    // Get the inactive color from CSS variable
    const inactiveColor = getComputedStyle(document.documentElement).getPropertyValue('--switcher-inactive').trim();

    buttons.forEach(btn => {
        const btnLeft = btn.offsetLeft;
        const btnRight = btnLeft + btn.offsetWidth;
        const btnCenter = btnLeft + btn.offsetWidth / 2;

        // Check if the button's center is covered by the bg
        if (btnCenter >= bgLeft && btnCenter <= bgRight) {
            btn.style.color = 'white';
        } else {
            // Explicitly set inactive color to override .active class
            btn.style.color = inactiveColor;
        }
    });
}

// Draggable switcher functionality
function makeSwitcherDraggable(switcher, onSelect) {
    const bg = switcher.querySelector('.switcher-bg');
    const inner = switcher.querySelector('.switcher-inner');
    const buttons = Array.from(switcher.querySelectorAll('button'));

    let isDragging = false;
    let hasMoved = false;
    let startX = 0;
    let startY = 0;
    let bgStartX = 0;

    function getBgPosition() {
        const transform = bg.style.transform;
        const match = transform.match(/translateX\(([^)]+)px\)/);
        return match ? parseFloat(match[1]) : 0;
    }

    function getClosestButton(x) {
        let closest = buttons[0];
        let closestDist = Infinity;

        buttons.forEach(btn => {
            const btnCenter = btn.offsetLeft + btn.offsetWidth / 2;
            const dist = Math.abs(x + bg.offsetWidth / 2 - btnCenter);
            if (dist < closestDist) {
                closestDist = dist;
                closest = btn;
            }
        });

        return closest;
    }

    function getButtonAtPosition(clientX) {
        const rect = inner.getBoundingClientRect();
        const x = clientX - rect.left;

        for (const btn of buttons) {
            if (x >= btn.offsetLeft && x <= btn.offsetLeft + btn.offsetWidth) {
                return btn;
            }
        }
        return null;
    }

    function onDragStart(e) {
        isDragging = true;
        hasMoved = false;
        bg.style.transition = 'none';
        // Clear any CSS animation so we can apply transforms
        switcher.style.animation = 'none';
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
        bgStartX = getBgPosition();
        e.preventDefault();
    }

    function onDragMove(e) {
        if (!isDragging) return;

        const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const currentY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        // Only count as moved if we've dragged more than 3px
        if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
            hasMoved = true;
        }

        let newX = bgStartX + deltaX;

        const minX = 0;
        const maxX = inner.offsetWidth - bg.offsetWidth;

        // Calculate X overdrag
        let overdragX = 0;
        if (newX < minX) {
            overdragX = newX - minX; // negative
            newX = minX;
        } else if (newX > maxX) {
            overdragX = newX - maxX; // positive
            newX = maxX;
        }

        // Calculate Y overdrag based on cursor position relative to switcher
        const switcherRect = switcher.getBoundingClientRect();
        let overdragY = 0;
        if (currentY < switcherRect.top) {
            overdragY = currentY - switcherRect.top; // negative (above)
        } else if (currentY > switcherRect.bottom) {
            overdragY = currentY - switcherRect.bottom; // positive (below)
        }

        // Apply stretch to the entire switcher with diminishing returns
        if (overdragX !== 0 || overdragY !== 0) {
            // Asymptotic formula: approaches maxStretch but never exceeds it
            const maxStretchX = 0.25; // Max 25% stretch in X
            const maxStretchY = 0.35; // Max 35% stretch in Y
            const damping = 40; // How quickly it resists (higher = more resistance)

            const absOverdragX = Math.abs(overdragX);
            const absOverdragY = Math.abs(overdragY);
            const stretchFactorX = maxStretchX * (absOverdragX / (absOverdragX + damping));
            const stretchFactorY = maxStretchY * (absOverdragY / (absOverdragY + damping));
            const scaleX = 1 + stretchFactorX;
            const scaleY = 1 + stretchFactorY;

            // Set transform-origin based on drag direction
            let originX = 'center';
            let originY = 'center';
            if (overdragX < 0) originX = 'right';
            else if (overdragX > 0) originX = 'left';
            if (overdragY < 0) originY = 'bottom';
            else if (overdragY > 0) originY = 'top';

            switcher.style.transformOrigin = `${originX} ${originY}`;
            switcher.style.transform = `scale(${scaleX}, ${scaleY})`;
        } else {
            switcher.style.transform = '';
        }

        bg.style.transform = `translateX(${newX}px)`;

        // Update button colors based on current bg position
        if (hasMoved) {
            updateButtonColorsDuringDrag(switcher, newX, bg.offsetWidth);
        }
    }

    // Spring animation for switcher jiggle
    function springSwitcherBack(callback) {
        const currentTransform = switcher.style.transform;
        const match = currentTransform.match(/scale\(([^,]+),\s*([^)]+)\)/);
        const startScaleX = match ? parseFloat(match[1]) : 1;
        const startScaleY = match ? parseFloat(match[2]) : 1;

        if (startScaleX === 1 && startScaleY === 1) {
            if (callback) callback();
            return;
        }

        const duration = 400;
        const startTime = performance.now();

        // Spring parameters
        const damping = 0.5;
        const frequency = 4;

        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Damped spring formula - oscillates around 1
            const decay = Math.exp(-damping * progress * 10);
            const oscillation = Math.cos(frequency * progress * Math.PI * 2);
            const scaleOffsetX = (startScaleX - 1) * decay * oscillation;
            const scaleOffsetY = (startScaleY - 1) * decay * oscillation;
            const currentScaleX = 1 + scaleOffsetX;
            const currentScaleY = 1 + scaleOffsetY;

            switcher.style.transform = `scale(${currentScaleX}, ${currentScaleY})`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                switcher.style.transform = '';
                if (callback) callback();
            }
        }

        requestAnimationFrame(animate);
    }

    function onDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;

        if (!hasMoved) {
            // It was a click, not a drag - find which button was clicked
            switcher.style.transform = '';
            bg.style.transition = ''; // Restore transition for smooth animation
            const clientX = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
            const clickedBtn = getButtonAtPosition(clientX);
            if (clickedBtn) {
                onSelect(clickedBtn);
                resetButtonColors(switcher);
                return;
            }
        }

        // Find closest button and snap to it
        const currentX = getBgPosition();
        const closestBtn = getClosestButton(currentX);

        // Restore transition and snap slider simultaneously with jiggle
        bg.style.transition = '';
        onSelect(closestBtn);
        resetButtonColors(switcher);

        // Animate switcher jiggle
        springSwitcherBack();
    }

    // Mouse events on the inner container
    inner.addEventListener('mousedown', onDragStart);
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);

    // Touch events
    inner.addEventListener('touchstart', onDragStart, { passive: false });
    document.addEventListener('touchmove', onDragMove, { passive: true });
    document.addEventListener('touchend', onDragEnd);
}

// Language switcher functionality
const languages = ['en', 'de', 'fr'];
const langSwitcher = document.querySelector('.language-switcher');

function switchLanguage(lang) {
    languages.forEach(l => {
        const link = document.querySelector(`.${l}-link`);
        const div = document.querySelector(`.${l}`);

        if (l === lang) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'true');
            div.style.display = 'block';
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            div.style.display = 'none';
        }
    });
    updateSwitcherBg(langSwitcher);
}

// Make language switcher draggable (also handles clicks)
makeSwitcherDraggable(langSwitcher, (btn) => {
    const lang = languages.find(l => btn.classList.contains(`${l}-link`));
    if (lang) switchLanguage(lang);
});

// Theme toggle functionality
const themeSwitcher = document.querySelector('.theme-toggle');
const themeLightBtn = document.querySelector('.theme-light');
const themeDarkBtn = document.querySelector('.theme-dark');

// Check for saved theme preference or default to light
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeDarkBtn.classList.add('active');
        themeLightBtn.classList.remove('active');
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeLightBtn.classList.add('active');
        themeDarkBtn.classList.remove('active');
    }
    localStorage.setItem('theme', theme);
    updateSwitcherBg(themeSwitcher);
}

// Initialize theme
setTheme(getPreferredTheme());

// Initialize switcher backgrounds after DOM is ready
updateSwitcherBg(langSwitcher);
updateSwitcherBg(themeSwitcher);

// Make theme switcher draggable (also handles clicks)
makeSwitcherDraggable(themeSwitcher, (btn) => {
    if (btn.classList.contains('theme-light')) {
        setTheme('light');
    } else if (btn.classList.contains('theme-dark')) {
        setTheme('dark');
    }
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Update backgrounds on resize
window.addEventListener('resize', () => {
    updateSwitcherBg(langSwitcher, false);
    updateSwitcherBg(themeSwitcher, false);
});

// Parallax effect for hero image
const heroImage = document.querySelector('.hero-image');
const hero = document.querySelector('.hero');

function updateParallax() {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;

    // Only apply parallax while hero is visible
    if (scrollY < heroHeight) {
        // Move background slower than scroll (0.4 = 40% of scroll speed)
        const parallaxOffset = scrollY * 0.4;
        heroImage.style.setProperty('--parallax-offset', `calc(40% + ${parallaxOffset}px)`);
    }
}

window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax(); // Initial call
