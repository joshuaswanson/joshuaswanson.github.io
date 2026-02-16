// Tab navigation functionality
const tabNav = document.querySelector(".tab-nav");
const tabButtons = tabNav.querySelectorAll(".tab-btn");

const avatar = document.querySelector(".avatar");
const avatarDefault = "assets/joshua.png";
const avatarBallroom = "assets/joshua_ballroom.png";
const avatarRandom = "assets/joshua_random.png";
const avatarContact = "assets/joshua_contact.png";

const avatarMap = {
  ballroom: avatarBallroom,
  now: avatarRandom,
  contact: avatarContact,
};

// Preload all avatar images so tab switches are instant
[avatarDefault, avatarBallroom, avatarRandom, avatarContact].forEach((src) => {
  const img = new Image();
  img.src = src;
});

function switchTab(tabName) {
  // Swap avatar image and position
  avatar.src = avatarMap[tabName] || avatarDefault;
  avatar.className =
    "avatar" +
    (tabName !== "about" && tabName !== "publications"
      ? ` avatar-${tabName}`
      : "");

  // Update button states
  tabButtons.forEach((btn) => {
    if (btn.dataset.tab === tabName) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Update content visibility for all languages
  document.querySelectorAll(".tab-content").forEach((content) => {
    if (content.classList.contains(tabName)) {
      content.classList.add("active");
    } else {
      content.classList.remove("active");
    }
  });

  updateTabNavBg(tabNav);
}

// Update tab nav sliding background
function updateTabNavBg(nav, animate = true) {
  const activeBtn = nav.querySelector(".tab-btn.active");
  const bg = nav.querySelector(".switcher-bg");
  const inner = nav.querySelector(".switcher-inner");
  if (activeBtn && bg && inner) {
    if (!animate) {
      bg.style.transition = "none";
    }
    // Account for the padding on switcher-inner
    const padding = 5;
    bg.style.width = `${activeBtn.offsetWidth}px`;
    bg.style.transform = `translateX(${activeBtn.offsetLeft - padding}px)`;
    if (!animate) {
      bg.offsetHeight;
      bg.style.transition = "";
    }
  }
}

// Make tab nav draggable with jiggly behavior
function makeTabNavDraggable(nav, onSelect) {
  const bg = nav.querySelector(".switcher-bg");
  const inner = nav.querySelector(".switcher-inner");
  const buttons = Array.from(nav.querySelectorAll(".tab-btn"));
  const padding = 5;

  let isDragging = false;
  let hasMoved = false;
  let startX = 0;
  let startY = 0;
  let bgStartX = 0;
  let bgStartWidth = 0;
  let currentScaleX = 1;
  let currentScaleY = 1;
  let currentOriginX = "center";
  let currentOriginY = "center";

  function getBgPosition() {
    const transform = bg.style.transform;
    const match = transform.match(/translateX\(([^)]+)px\)/);
    return match ? parseFloat(match[1]) : 0;
  }

  function getClosestButton(x, bgWidth) {
    let closest = buttons[0];
    let closestDist = Infinity;

    buttons.forEach((btn) => {
      const btnCenter = btn.offsetLeft - padding + btn.offsetWidth / 2;
      const dist = Math.abs(x + bgWidth / 2 - btnCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = btn;
      }
    });

    return closest;
  }

  // Get interpolated width based on position between buttons
  function getInterpolatedWidth(x) {
    const bgCenter = x + bg.offsetWidth / 2;

    let leftBtn = null;
    let rightBtn = null;

    for (let i = 0; i < buttons.length; i++) {
      const btnCenter =
        buttons[i].offsetLeft - padding + buttons[i].offsetWidth / 2;
      if (btnCenter <= bgCenter) {
        leftBtn = buttons[i];
      }
      if (btnCenter >= bgCenter && !rightBtn) {
        rightBtn = buttons[i];
      }
    }

    if (!leftBtn)
      return rightBtn ? rightBtn.offsetWidth : buttons[0].offsetWidth;
    if (!rightBtn) return leftBtn.offsetWidth;
    if (leftBtn === rightBtn) return leftBtn.offsetWidth;

    const leftCenter = leftBtn.offsetLeft - padding + leftBtn.offsetWidth / 2;
    const rightCenter =
      rightBtn.offsetLeft - padding + rightBtn.offsetWidth / 2;
    const t = (bgCenter - leftCenter) / (rightCenter - leftCenter);

    return (
      leftBtn.offsetWidth + (rightBtn.offsetWidth - leftBtn.offsetWidth) * t
    );
  }

  function getButtonAtPosition(clientX) {
    const rect = inner.getBoundingClientRect();
    const x = clientX - rect.left;

    for (const btn of buttons) {
      const btnLeft = btn.offsetLeft - padding;
      if (x >= btnLeft && x <= btnLeft + btn.offsetWidth) {
        return btn;
      }
    }
    return null;
  }

  function onDragStart(e) {
    isDragging = true;
    hasMoved = false;
    currentScaleX = 1;
    currentScaleY = 1;
    currentOriginX = "center";
    currentOriginY = "center";
    bg.style.transition = "none";
    inner.style.animation = "none";
    startX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    startY = e.type === "mousedown" ? e.clientY : e.touches[0].clientY;
    bgStartX = getBgPosition();
    bgStartWidth = bg.offsetWidth;
    e.preventDefault();
  }

  function onDragMove(e) {
    if (!isDragging) return;

    const currentX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    const currentY = e.type === "mousemove" ? e.clientY : e.touches[0].clientY;
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      hasMoved = true;
    }

    // Calculate new width based on position
    const newWidth = getInterpolatedWidth(bgStartX + deltaX);

    // Adjust position to account for width change
    const widthDelta = newWidth - bgStartWidth;
    let newX = bgStartX + deltaX - widthDelta / 2;

    const minX = 0;
    const maxX = inner.offsetWidth - newWidth - padding * 2;

    let overdragX = 0;
    if (newX < minX) {
      overdragX = newX - minX;
      newX = minX;
    } else if (newX > maxX) {
      overdragX = newX - maxX;
      newX = maxX;
    }

    const innerRect = inner.getBoundingClientRect();
    let overdragY = 0;
    if (currentY < innerRect.top) {
      overdragY = currentY - innerRect.top;
    } else if (currentY > innerRect.bottom) {
      overdragY = currentY - innerRect.bottom;
    }

    let targetScaleX = 1;
    let targetScaleY = 1;

    if (overdragX !== 0 || overdragY !== 0) {
      const maxStretchX = 0.12;
      const maxStretchY = 0.15;
      const damping = 40;

      const absOverdragX = Math.abs(overdragX);
      const absOverdragY = Math.abs(overdragY);

      // Always stretch (grow) in the direction pulled
      targetScaleX =
        1 + maxStretchX * (absOverdragX / (absOverdragX + damping));
      targetScaleY =
        1 + maxStretchY * (absOverdragY / (absOverdragY + damping));

      // Set transform-origin based on drag direction
      if (overdragX < 0) currentOriginX = "right";
      else if (overdragX > 0) currentOriginX = "left";
      else currentOriginX = "center";
      if (overdragY < 0) currentOriginY = "bottom";
      else if (overdragY > 0) currentOriginY = "top";
      else currentOriginY = "center";
    }

    const lerpFactor = 0.3;
    currentScaleX += (targetScaleX - currentScaleX) * lerpFactor;
    currentScaleY += (targetScaleY - currentScaleY) * lerpFactor;

    if (
      Math.abs(currentScaleX - 1) > 0.001 ||
      Math.abs(currentScaleY - 1) > 0.001
    ) {
      inner.style.transformOrigin = `${currentOriginX} ${currentOriginY}`;
      inner.style.transform = `scale(${currentScaleX}, ${currentScaleY})`;
    } else {
      currentScaleX = 1;
      currentScaleY = 1;
      currentOriginX = "center";
      currentOriginY = "center";
      inner.style.transform = "";
    }

    bg.style.width = `${newWidth}px`;
    bg.style.transform = `translateX(${newX}px)`;

    if (hasMoved) {
      updateTabButtonColorsDuringDrag(nav, newX, newWidth);
    }
  }

  function springInnerBack(callback) {
    const currentTransform = inner.style.transform;
    const match = currentTransform.match(/scale\(([^,]+),\s*([^)]+)\)/);
    const startScaleX = match ? parseFloat(match[1]) : 1;
    const startScaleY = match ? parseFloat(match[2]) : 1;

    if (startScaleX === 1 && startScaleY === 1) {
      if (callback) callback();
      return;
    }

    const duration = 600;
    const startTime = performance.now();
    const damping = 0.5;
    const frequency = 3;

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const decay = Math.exp(-damping * progress * 10);
      const oscillation = Math.cos(frequency * progress * Math.PI * 2);
      const scaleOffsetX = (startScaleX - 1) * decay * oscillation;
      const scaleOffsetY = (startScaleY - 1) * decay * oscillation;
      const currentScaleX = 1 + scaleOffsetX;
      const currentScaleY = 1 + scaleOffsetY;

      inner.style.transform = `scale(${currentScaleX}, ${currentScaleY})`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        inner.style.transform = "";
        if (callback) callback();
      }
    }

    requestAnimationFrame(animate);
  }

  function onDragEnd(e) {
    if (!isDragging) return;
    isDragging = false;

    if (!hasMoved) {
      inner.style.transform = "";
      bg.style.transition = "";
      const clientX =
        e.type === "mouseup" ? e.clientX : e.changedTouches[0].clientX;
      const clickedBtn = getButtonAtPosition(clientX);
      if (clickedBtn) {
        onSelect(clickedBtn);
        resetTabButtonColors(nav);
        return;
      }
    }

    const currentX = getBgPosition();
    const currentWidth = bg.offsetWidth;
    const closestBtn = getClosestButton(currentX, currentWidth);

    bg.style.transition = "";
    onSelect(closestBtn);
    resetTabButtonColors(nav);

    springInnerBack();
  }

  inner.addEventListener("mousedown", onDragStart);
  document.addEventListener("mousemove", onDragMove);
  document.addEventListener("mouseup", onDragEnd);

  inner.addEventListener("touchstart", onDragStart, { passive: false });
  document.addEventListener("touchmove", onDragMove, { passive: true });
  document.addEventListener("touchend", onDragEnd);
}

function updateTabButtonColorsDuringDrag(nav, bgLeft, bgWidth) {
  const buttons = nav.querySelectorAll(".tab-btn");
  const bgRight = bgLeft + bgWidth;
  const inactiveColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--switcher-inactive")
    .trim();
  const padding = 5;

  buttons.forEach((btn) => {
    const btnLeft = btn.offsetLeft - padding;
    const btnCenter = btnLeft + btn.offsetWidth / 2;

    if (btnCenter >= bgLeft && btnCenter <= bgRight) {
      btn.style.color = "white";
    } else {
      btn.style.color = inactiveColor;
    }
  });
}

function resetTabButtonColors(nav) {
  const buttons = nav.querySelectorAll(".tab-btn");
  buttons.forEach((btn) => {
    btn.style.color = "";
  });
}

// Initialize tab nav
updateTabNavBg(tabNav, false);

// Make tab nav draggable
makeTabNavDraggable(tabNav, (btn) => {
  switchTab(btn.dataset.tab);
});

// Update backgrounds on resize
window.addEventListener("resize", () => {
  updateTabNavBg(tabNav, false);
});

// Parallax effect for hero image
const heroImage = document.querySelector(".hero-image");
const hero = document.querySelector(".hero");

function updateParallax() {
  const scrollY = window.scrollY;
  const heroHeight = hero.offsetHeight;

  // Only apply parallax while hero is visible
  if (scrollY < heroHeight) {
    // Move background slower than scroll (0.4 = 40% of scroll speed)
    const parallaxOffset = scrollY * 0.4;
    heroImage.style.setProperty(
      "--parallax-offset",
      `calc(40% + ${parallaxOffset}px)`,
    );
  }
}

window.addEventListener("scroll", updateParallax, { passive: true });
updateParallax(); // Initial call

// Mood Meter draggable dot functionality
function initMoodDot(dot) {
  if (!dot) return;

  const grid = dot.closest(".mood-main").querySelector(".mood-grid");
  const sobackCell = grid.querySelector(".mood-soback");
  const letsgoEl = grid.querySelector(".mood-letsgo");
  const vibingCell = grid.querySelector(".mood-vibing");
  const itisEls = grid.querySelectorAll(".mood-itis");

  let isDragging = false;
  let startX, startY, dotStartX, dotStartY;

  function getDotPosition() {
    const left = parseFloat(dot.style.left) || 50;
    const top = parseFloat(dot.style.top) || 50;
    return { left, top };
  }

  function setDotPosition(left, top) {
    dot.style.left = `${left}%`;
    dot.style.top = `${top}%`;
  }

  function checkCellOverlap() {
    const dotRect = dot.getBoundingClientRect();
    const dotCenterX = dotRect.left + dotRect.width / 2;
    const dotCenterY = dotRect.top + dotRect.height / 2;

    const sobackRect = sobackCell.getBoundingClientRect();
    const letsgoRect = letsgoEl ? letsgoEl.getBoundingClientRect() : null;

    // Check if dot center is within "LETS FUCKING GOOOOOOOO" area (more intense vibration)
    let inLetsgo = false;
    if (letsgoRect) {
      inLetsgo =
        dotCenterX >= letsgoRect.left &&
        dotCenterX <= letsgoRect.right &&
        dotCenterY >= letsgoRect.top &&
        dotCenterY <= letsgoRect.bottom;
    }

    // Check if dot center is within any "it is" orange elements
    let inItis = false;
    itisEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (
        dotCenterX >= rect.left &&
        dotCenterX <= rect.right &&
        dotCenterY >= rect.top &&
        dotCenterY <= rect.bottom
      ) {
        inItis = true;
      }
    });

    // Check if dot center is within "We are so fucking back" cell (but not in letsgo or itis areas)
    const inSoback =
      !inLetsgo &&
      !inItis &&
      dotCenterX >= sobackRect.left &&
      dotCenterX <= sobackRect.right &&
      dotCenterY >= sobackRect.top &&
      dotCenterY <= sobackRect.bottom;

    // Toggle vibration classes
    if (inSoback) {
      sobackCell.classList.add("vibrating");
    } else {
      sobackCell.classList.remove("vibrating");
    }

    if (inLetsgo && letsgoEl) {
      letsgoEl.classList.add("vibrating");
    } else if (letsgoEl) {
      letsgoEl.classList.remove("vibrating");
    }

    // Check if dot center is within "We vibing" cell
    if (vibingCell) {
      const vibingRect = vibingCell.getBoundingClientRect();
      const inVibing =
        dotCenterX >= vibingRect.left &&
        dotCenterX <= vibingRect.right &&
        dotCenterY >= vibingRect.top &&
        dotCenterY <= vibingRect.bottom;
      if (inVibing) {
        vibingCell.classList.add("vibrating");
      } else {
        vibingCell.classList.remove("vibrating");
      }
    }
  }

  function onDragStart(e) {
    isDragging = true;
    dot.style.cursor = "grabbing";
    dot.classList.add("dragging");

    const pos = getDotPosition();
    const gridRect = grid.getBoundingClientRect();

    if (e.type === "mousedown") {
      startX = e.clientX;
      startY = e.clientY;
    } else {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }

    dotStartX = (pos.left / 100) * gridRect.width;
    dotStartY = (pos.top / 100) * gridRect.height;

    e.preventDefault();
  }

  function onDragMove(e) {
    if (!isDragging) return;

    const gridRect = grid.getBoundingClientRect();
    let clientX, clientY;

    if (e.type === "mousemove") {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    let newX = dotStartX + deltaX;
    let newY = dotStartY + deltaY;

    // Clamp to grid bounds
    const dotRadius = dot.offsetWidth / 2;
    newX = Math.max(dotRadius, Math.min(gridRect.width - dotRadius, newX));
    newY = Math.max(dotRadius, Math.min(gridRect.height - dotRadius, newY));

    // Convert to percentage
    const leftPercent = (newX / gridRect.width) * 100;
    const topPercent = (newY / gridRect.height) * 100;

    setDotPosition(leftPercent, topPercent);
    checkCellOverlap();
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    dot.style.cursor = "grab";
    dot.classList.remove("dragging");
    // Check if dot is in vibration zone and maintain vibration if so
    checkCellOverlap();
  }

  function onGridClick(e) {
    // Skip if clicking on the dot itself
    if (e.target === dot) return;

    const gridRect = grid.getBoundingClientRect();
    let clientX, clientY;

    if (e.type === "touchstart") {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Calculate position relative to grid
    let newX = clientX - gridRect.left;
    let newY = clientY - gridRect.top;

    // Clamp to grid bounds
    const dotRadius = dot.offsetWidth / 2;
    newX = Math.max(dotRadius, Math.min(gridRect.width - dotRadius, newX));
    newY = Math.max(dotRadius, Math.min(gridRect.height - dotRadius, newY));

    // Convert to percentage
    const leftPercent = (newX / gridRect.width) * 100;
    const topPercent = (newY / gridRect.height) * 100;

    setDotPosition(leftPercent, topPercent);
    checkCellOverlap();

    // Start dragging so user can continue moving
    isDragging = true;
    dot.style.cursor = "grabbing";
    startX = clientX;
    startY = clientY;
    dotStartX = newX;
    dotStartY = newY;

    // Add dragging class after transition completes to disable transition for subsequent moves
    setTimeout(() => {
      if (isDragging) dot.classList.add("dragging");
    }, 150);

    e.preventDefault();
  }

  // Mouse events
  grid.addEventListener("mousedown", onGridClick);
  dot.addEventListener("mousedown", onDragStart);
  document.addEventListener("mousemove", onDragMove);
  document.addEventListener("mouseup", onDragEnd);

  // Touch events
  grid.addEventListener("touchstart", onGridClick, { passive: false });
  dot.addEventListener("touchstart", onDragStart, { passive: false });
  document.addEventListener("touchmove", onDragMove, { passive: true });
  document.addEventListener("touchend", onDragEnd);
}

// Initialize all mood dots (one per language)
document.querySelectorAll(".mood-dot").forEach(initMoodDot);

// ==========================================================================
// Swiss German (Züridütsch) Language Toggle
// ==========================================================================

const chTranslations = {
  "tab-about": "Hei",
  "tab-publications": "Publikatione",
  "tab-ballroom": "Tanze",
  "tab-now": "Allerhand",
  "about-heading": "Hoi zäme!",
  "about-intro": "Ich bi de Joshua Swanson.",
  "about-bio":
    'Ich mach grad min Master i Informatik a de <a href="https://ethz.ch/en.html">ETH Züri</a>, mit Schwerpunkt Machine Intelligence und Minor i Data Management. Vorher hani Mathematik und Informatik a de <a href="https://www.washington.edu">University of Washington</a> z\'Seattle studiert.',
  "about-origin": "Ich chum ursprünglich us de USA.",
  "about-footnote":
    "Website zletscht aktualisiert: Februar 2026.<br>Designed vo: Joshua Swanson",
  "now-heading": "Allerhand",
  "now-intro":
    "Es paar Sache woni intressant, lustig, oder wärt zum Teile find.",
  "now-monitor":
    'Wänn ich de ganz Tag a minere Masterarbeit schaffe, dänki immer wieder wie geil es wär, en grössere Bildschirm z\'ha als nur min MacBook. Normalerwiis hani es IDE, es Terminal, Overleaf, Spotify, und es Dutzed anderi Sache gliichziitig offe. Ich ha Glück gha und en Samsung SyncMaster SA850 uf de Strass z\'Züri gratis gfunde. Aber wo ich denn agfange ha, mich nach emene richtige Upgrade umzluege, hät mich d\'Azahl vo Specs wo me muess vergliiche echli überforderet -- Uflösig, PPI, Siitverhältnis, Diagonali, Panel-Typ -- also hani gmacht was jede vernünftigi Person mache würd und es <a href="https://joshuaswanson.github.io/monitor-comparison/" target="_blank" rel="noopener">interaktivs Monitor-Vergliichstool</a> baut. Es zeigt Monitore uf emene Scatter-Chart mit konfigurierbare Achse und me cha nach jedere Eigenschaft filtere.',
  "now-mood":
    "Ich ha de Mood Meter neulich uf Instagram gseh und ha ne mega lustig gfunde. Ich ha ne da i HTML/CSS nachbaut. Es hät öppis komisch Bestätigends, wänn me gnau cha zeige wo me grad druf isch.",
  "mood-title": "DE STIMMIGSMESSER",
  "mood-high-energy": "VOLL<br>POWER",
  "mood-low-energy": "KEIN<br>POWER",
  "mood-unpleasant": "GRUUSIG",
  "mood-pleasant": "GEIL",
  "mood-fuckitball": "Scheiss druf<br>mir gönd",
  "mood-soback": "Mir sind<br>so zrugg",
  "mood-letsgo": "GOPFERTAMI<br>LOOOOOOS",
  "mood-itsover": "Es isch<br>so verbi",
  "mood-momsad": "D'Mama wär<br>truurig",
  "mood-vibing": "Mir<br>chille",
  "mood-itis1": "Es isch",
  "mood-itis2": "es isch",
  "mood-what": "was",
  "ballroom-heading": "Turniertanz",
  "ballroom-intro": "Es Tagebuch vo minere Turniertanz-Reis i de Schwiiz.",
  "ballroom-upcoming": "Chunnt no",
  "ballroom-past": "Vergange",
  "ballroom-trafo":
    'Ich tanze am <a href="https://www.dancesport.ch/events/trafo-cup/" target="_blank" rel="noopener">Trafo Cup</a> z\'Bade i de Schwiiz.',
  "ballroom-sm":
    'Ich tanze a de <a href="https://www.dancesport.ch/events/schweizer-meisterschaften-standard-26/" target="_blank" rel="noopener">Schwiizer Meisterschafte Standard</a> z\'Bade i de Schwiiz.',
  "ballroom-license":
    'Ich ha mini Turnierlizenz vom <a href="https://www.dancesport.ch" target="_blank" rel="noopener">Schwiizer Tanzsport Verband</a> übercho.',
  "ballroom-etds":
    'Ich bi 3. worde im Latin Masters am 70. <a href="https://en.wikipedia.org/wiki/European_Tournament_for_Dancing_Students" target="_blank" rel="noopener">ETDS</a> (European Tournament for Dancing Students) z\'Monheim am Rhein.',
  "tab-contact": "Kontakt",
  "contact-heading": "Meld di!",
  "contact-intro": "Ich biisse nur manchmal.",
  "contact-socials": "Find mi im Internet:",
  "contact-email":
    "Mini E-Mail folgt em Standard-ETH-Format: erschte Buechstabe vom Vorname + Nachname at ethz.ch.",
  "contact-standing":
    'Ich echo d\'<a href="https://www.kalzumeus.com/standing-invitation/" target="_blank" rel="noopener">Standing Invitation</a>:',
  "pub-heading": "Publikatione",
  "pub-intro": "S'komplette Wärk.",
  "pub-more": "Meh chunnt bald...",
};

const originals = {};
let currentLang = localStorage.getItem("lang") || "en";

function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (lang === "ch") {
      if (!(key in originals)) {
        originals[key] = el.innerHTML;
      }
      if (chTranslations[key]) {
        el.innerHTML = chTranslations[key];
      }
    } else {
      if (key in originals) {
        el.innerHTML = originals[key];
      }
    }
  });

  currentLang = lang;
  localStorage.setItem("lang", lang);

  const toggle = document.getElementById("lang-toggle");
  toggle.classList.toggle("active", lang === "ch");
  toggle.setAttribute(
    "aria-label",
    lang === "ch" ? "Switch to English" : "Switch to Swiss German",
  );

  updateTabNavBg(tabNav);
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  applyLanguage(currentLang === "ch" ? "en" : "ch");
});

// Apply saved language on load
if (currentLang === "ch") {
  applyLanguage("ch");
}
