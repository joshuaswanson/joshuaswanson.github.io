const enLink = document.querySelector('.en-link');
const deLink = document.querySelector('.de-link');
const frLink = document.querySelector('.fr-link');
const enDiv = document.querySelector('.en');
const deDiv = document.querySelector('.de');
const frDiv = document.querySelector('.fr');

// Show the English div by default
enLink.classList.add('active');
enDiv.style.display = 'block';

// Add event listeners to language switcher links
enLink.addEventListener('click', function(event) {
    event.preventDefault();
    enLink.classList.add('active');
    deLink.classList.remove('active');
    frLink.classList.remove('active');
    enDiv.style.display = 'block';
    deDiv.style.display = 'none';
    frDiv.style.display = 'none';
});

deLink.addEventListener('click', function(event) {
    event.preventDefault();
    enLink.classList.remove('active');
    deLink.classList.add('active');
    frLink.classList.remove('active');
    enDiv.style.display = 'none';
    deDiv.style.display = 'block';
    frDiv.style.display = 'none';
});

frLink.addEventListener('click', function(event) {
    event.preventDefault();
    enLink.classList.remove('active');
    deLink.classList.remove('active');
    frLink.classList.add('active');
    enDiv.style.display = 'none';
    deDiv.style.display = 'none';
    frDiv.style.display = 'block';
});