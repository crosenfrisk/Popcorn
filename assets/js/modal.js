


// Modal of about the App
const appButton = document.querySelector('#about')
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');

appButton.addEventListener('click', () => {
    modal.classList.add('is-active');
});

modalBg.addEventListener('click', () => {
    modal.classList.remove('is-active');
});