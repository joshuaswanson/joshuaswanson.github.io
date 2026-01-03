// Language switcher functionality
const languages = ['en', 'de', 'fr'];

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
}

// Add event listeners to all language buttons
languages.forEach(lang => {
    document.querySelector(`.${lang}-link`).addEventListener('click', () => {
        switchLanguage(lang);
    });
});
