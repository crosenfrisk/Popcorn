


// Modal of about the App
const appButton = document.querySelector('#about')
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');
const modalContentArea = document.querySelector('#modal-content-area')

appButton.addEventListener('click', () => {
    modalContentArea.innerHTML = '';
    modal.classList.add('is-active');
    let headingEl = document.createElement('h3');
    headingEl.classList = 'title has-text-white p-5 mb-5';
    headingEl.textContent = 'How the app works';

    let aboutEl = document.createElement('p');
    aboutEl.textContent = `You can search for the movie you want to watch by clickig on buttons 'Top Ten' or 'Watchlist' after you choose it and 'Genre Select.`;
    let about2El = document.createElement('p');
    about2El.textContent = `After the search result presented to you you can click once on any of the movies to read its details`;
    let about3El = document.createElement('p');
    about3El.textContent = `Click outside this box to go back to the main page`;
    let about4El = document.createElement('p');
    about4El.textContent = `Have a nice time`;

    modalContentArea.appendChild(headingEl);
    modalContentArea.appendChild(aboutEl);
    modalContentArea.appendChild(about2El);
    modalContentArea.appendChild(about3El);
    modalContentArea.appendChild(about4El);
});

modalBg.addEventListener('click', () => {
    modal.classList.remove('is-active');
});