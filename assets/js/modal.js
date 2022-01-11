


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
    headingEl.textContent = 'Welcome to Popcorn!';

    let imageEL = document.createElement('img');
    imageEL.src = "assets/images/cinema-popcorn.jpg";
    imageEL.classList = 'aboutimg';
    let aboutEl = document.createElement('p');
    aboutEl.textContent = `Popcorn is a mobile-friendly interactive tool that allows users to find new media to enjoy.`;
    let about2El = document.createElement('p');
    about2El.textContent = `To begin, select one of the options from the navigation bar:`;
    let about3El = document.createElement('p');
    about3El.textContent = `Top 10 will display the most popular media being viewed today in America.`;
    let about4El = document.createElement('p');
    about4El.textContent = `Genre Selector lists content based on "type" -- if you are looking for something light-hearted, choose "Comedy" -- for family friendly, "Family" -- for something more mysterious, choose "Mystery" -- you get the idea.`;
    let about5El = document.createElement('p');
    about4El.textContent = `At any point you can use the keyword search to find a movie by title, actor, or anything you can think of!`;
    let about6El = document.createElement('p');
    about4El.textContent = `If you would like to learn more about the movie itself, click the movie poster and a pop-up box will appear with more details such as synopsis, director, run-time...
    You can add a movie or T.V. show to your watchlist, dismiss details of the current movie by clicking anywhere outside the description box.
    Selecting Watchlist will bring you to all your saved items. You can always update your list adding more or removing those you've seen.`;


    modalContentArea.appendChild(imageEL);
    modalContentArea.appendChild(headingEl);
    modalContentArea.appendChild(aboutEl);
    modalContentArea.appendChild(about2El);
    modalContentArea.appendChild(about3El);
    modalContentArea.appendChild(about4El);
    modalContentArea.appendChild(about5El);
    modalContentArea.appendChild(about6El);
    
});

modalBg.addEventListener('click', () => {
    modal.classList.remove('is-active');
});