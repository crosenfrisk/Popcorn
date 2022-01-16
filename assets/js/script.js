// base url and api keys for both apis from config file
var theMovieDbUrl = "https://api.themoviedb.org/3/";
var theMovieDbApiKey = config.theMovieDbApiKey;
var omdbBaseUrl = 'https://www.omdbapi.com/?apikey='
var omdbAPIKey = config.omdbAPIKey;

// placeholder for data that will be pulled from getConfigInfo
let imgBaseUrl = null;
// poster urls are -- imgBaseUrl/posterSize/[poster_path]
let posterSize = null;
let configData = null;

// array to store watchlist items
let storageArray = [];

// if there is a watchlist in storage, set those items to the value of the storage array. If there are no items the storageArray will be empty until items are added
function loadWatchlist() {
    if (localStorage.watchlist) {
        storageArray = JSON.parse(localStorage.watchlist)
    }
}
loadWatchlist();

// get configuration data from TMDB api, must be run to make sure we're using most up to date configuration data from API
var getConfigInfo = function() {
    // fetch config data from TMDB API - it includes info we'll need to get urls for posters
    fetch('https://api.themoviedb.org/3/configuration?api_key=' + theMovieDbApiKey)
    .then(function(response) {
        response.json()
        .then(function(data) {
            // imgBaseUrl is the start of the url for all movie posters
            imgBaseUrl = data.images.secure_base_url;
            // config data is all the relevant information for constructing those urls
            configData = data.images;
            // poster_sizes is an array of sizes, must define a size in url
            posterSize = data.images.poster_sizes;
        })
    })
};

// get the config data after document loads
document.addEventListener("DOMContentLoaded", getConfigInfo);

// grab input element for searches
let searchInputEl = document.querySelector('#searchInput');

// grabbing buttons from html
let top10Btn = document.querySelector("#top10Btn");
let genreSelBtn = document.querySelector("#genreSel");
let watchlistBtn = document.querySelector("#watchList");
let searchBtn = document.querySelector('#searchBtn');

// grab results area for display
let resultsArea = document.querySelector('#movie-images');

// access modal for item data
const itemModalBg = document.querySelector('.modal-background');
const itemModal = document.querySelector('.modal');

// event listener for search button
searchBtn.addEventListener('click', function() {
    // check for text entered by user
    if (searchInputEl.value) {
        // if there is text, use search function on text they've input
        searchByKeyword(searchInputEl.value);
        // clear input element
        searchInputEl.value = '';
    }
})

// when enter is pressed
document.addEventListener('keypress', function(e) {
    // if the key pressed is 13 (enter) and there is any text in the input box
    if (e.charCode === 13 && searchInputEl.value) {
        // clear anything that might have been in display area
        resultsArea.innerHTML = '';
        document.querySelector("#genre-list").innerHTML = '';
        // run the search function with input
        searchByKeyword(searchInputEl.value);
        // reset input area to be blank
        searchInputEl.value = '';
    }
});

// event listener to pull trending movies
top10Btn.addEventListener("click", function () {
  // clear anything previously displayed in results area
  resultsArea.innerHTML = '';
  // run function to pull top ten treding movies/shows
  getTopTen();
});

// event listener to pull genre options for user to select
genreSelBtn.addEventListener("click", function () {
    loadGenres();
});

function refreshWatchlist() {
// clear results area and genre buttons if they have been generated
    resultsArea.innerHTML = '';
    document.querySelector("#genre-list").innerHTML = '';
    // if nothing in storage, display message
    if (storageArray.length === 0) {
        resultsArea.innerHTML = 'You have nothing saved to your Watchlist';
    } else {
        // loop through array of items saved in storage
        for (let i = 0; i < storageArray.length; i++) {
            // check to see if movie or tv show - if tv show, it will NOT have property imdbID
            if (!storageArray[i].data.imdbID) {

            // create a div to hold all the info for each item in watch list
            let itemContainer = document.createElement('div');

            // create img element
            let posterEl = document.createElement('img');

            // set src attribute to url for the poster for the item at that index
            posterEl.setAttribute('src', storageArray[i].url)

            posterEl.addEventListener('click', function() {
                // when poster is clicked, grab full url
                let fullUrl = storageArray[i].url;
                // then split at '/' to grab the last section of the url, the poster path
                let split = fullUrl.split('/');
                let src = split[split.length-1];
                // then get the details for that show with the data and the poster path (so we can grab a larger size from API)
                getTVData(storageArray[i].data, src);
                // open the modal to display item details
                itemModal.classList.add('is-active');
            })

            // add poster to item container
            itemContainer.appendChild(posterEl);

            // grab the other data
            let name = storageArray[i].data.name;

            // create html element for title, append to details container
            let showNameEl = document.createElement('p');
            showNameEl.textContent = name;
            itemContainer.appendChild(showNameEl);

            // create a button, when clicked it will remove that item from local storage
            let removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.setAttribute('class', 'remove-item');
            itemContainer.appendChild(removeBtn);

            // event listener for remove button
            removeBtn.addEventListener('click', function(e) {
                // use array method splice to remove 1 element at the index we're targeting
                storageArray.splice(i, 1);
                // reset the array in storage to reflect that removal
                localStorage.watchlist = JSON.stringify(storageArray);
                // run refreshWatchlist again so storageArray will reflect what is in local storage
                refreshWatchlist();
            })

            // add whole container to results area
            resultsArea.appendChild(itemContainer);

            // else statements is for items WITH imdbID, meaning they are type 'movie'
            } else {
                // create element to hold info for item
                let detailsEl = document.createElement('div');

                // pull title from item data
                let title = storageArray[i].data.Title;

                // create html elements, append them to container
                let imgEl = document.createElement('img');
                imgEl.setAttribute('src', storageArray[i].url);
                detailsEl.appendChild(imgEl);

                // when poster is clicked
                imgEl.addEventListener('click', function() {
                    // grab full url
                    let fullUrl = storageArray[i].url;
                    // split and grab poster path
                    let split = fullUrl.split('/');
                    let src = split[split.length-1];

                    // get details from OMDB, passing the item data and the poster path
                    getMovieData(storageArray[i].data.imdbID, src);
                    // open modal to display details
                    itemModal.classList.add('is-active');
                })

                // add title
                let titleEl = document.createElement('p');
                titleEl.textContent = title;
                detailsEl.appendChild(titleEl);

                // create a button to remove that item
                let removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.setAttribute('class', 'remove-item');
                detailsEl.appendChild(removeBtn);

                // when remove button clicked...
                removeBtn.addEventListener('click', function(e) {
                    // use array.splice to remove the 1 item at that index
                    storageArray.splice(i, 1);
                    // reset that altered array to watchlist in local storage
                    localStorage.watchlist = JSON.stringify(storageArray);
                    // run refreshWatchlist so watchlist is up to date
                    refreshWatchlist();
                })

                // append the container itself to results area
                resultsArea.appendChild(detailsEl);
            }
        }

        // create button to clear entire watchlist
        let clearBtn = document.createElement('button');
        clearBtn.textContent = 'Clear Watchlist';
        clearBtn.setAttribute('class', 'clear-watchlist');
        resultsArea.appendChild(clearBtn);

        // when clear button is clicked...
        clearBtn.addEventListener('click', function() {
            // run function to clear everything in local storage
            localStorage.clear();
            // reset storageArray to be empty
            storageArray = [];
            // Give message to user that their watchlist is empty
            resultsArea.innerHTML = 'Your watchlist has been cleared';
        })
    }
};

// even listener for watchlist, displays previously saved movies
watchlistBtn.addEventListener('click', function() {
    refreshWatchlist();
    })

// called if media_type is 'movie', calls OMDB API for movie details and displays them in modal
var getMovieData = function(imdbID, posterPath) {
    // clears modal, if it previously had anything in it
    modalContentArea.innerHTML = '';

    // fetch using imdbID passed as argument
    fetch(`${omdbBaseUrl}${omdbAPIKey}&i=${imdbID}`)
    .then(function(response) {
        response.json()
        .then(function(data) {
            // make a container to put all the details
            let detailsEl = document.createElement('div');

            // if OMDB does not have more information for that id number
            if (data.Response === 'False') {
                // let the user know there is no more information
                detailsEl.textContent = 'No more information for this title';
            }
            // if request is successful
            else {
                // pull all relevant data from response
                let title = data.Title;

                // since some items return with no rating information, set up condition to check if rating is set as N/A
                let rating = '';
                if (data.Rated === 'N/A') {
                    rating = 'Not rated';
                } else {
                    rating = data.Rated;
                }
                // grab genres for movie
                let genres = data.Genre;

                // since some items return with no plot write up, set up condition to check for that before displaying
                let plot = '';
                if (data.Plot === 'N/A') {
                    plot = 'No synopsis available'
                } else {
                    plot = data.Plot;
                }

                // grab director, runtime
                let director = data.Director;
                let runTime = data.Runtime;
    
                // set poster path to be empty to allow for using dummy image if data returned has no image
                let fullPosterPath = ''
    
                // if the dummy image was passed, use that
                if (posterPath === 'assets/images/dummyposterupgrade.jpg') {
                    fullPosterPath = 'assets/images/dummyposterupgrade.jpg';
                }
                // otherwise grab full url to display the larger version of the poster
                else {
                    // construct url for poster from different pieces of data collected from TMDB API
                    fullPosterPath = `${imgBaseUrl}/${posterSize[3]}/${posterPath}`;
                }
    
                // create html elements to hold all that data, append them to container
                let imgEl = document.createElement('img');
                imgEl.setAttribute('src', fullPosterPath);
                detailsEl.appendChild(imgEl);
    
                let titleEl = document.createElement('p');
                titleEl.textContent = title;
                detailsEl.appendChild(titleEl);
    
                let ratingEl = document.createElement('p');
                ratingEl.textContent = rating;
                detailsEl.appendChild(ratingEl);
    
                let genresEl = document.createElement('p');
                genresEl.textContent = genres;
                detailsEl.appendChild(genresEl);
    
                let plotEl = document.createElement('p');
                plotEl.textContent = plot;
                detailsEl.appendChild(plotEl);
    
                let directorEl = document.createElement('p');
                directorEl.textContent = `Director: ${director}`;
                detailsEl.appendChild(directorEl);
    
                let runTimeEl = document.createElement('p');
                runTimeEl.textContent = `Running Time: ${runTime}`;
                detailsEl.appendChild(runTimeEl);       
    
                // use .some method to check if that item is already in storage
                if (!storageArray.some(e => e.data.imdbID === data.imdbID)) {
                    // if NOT in storage, create save button
                    let saveBtn = document.createElement('button');
                    saveBtn.classList = 'saveButton';
                    saveBtn.textContent = 'Save to Watchlist';
                    detailsEl.appendChild(saveBtn);
                    
                    // data for this item will be saved to watchlist on click
                    saveBtn.addEventListener('click', function() {
                        saveItem(posterPath, data);

                        // remove the save button, repalce with an element telling the user the item was saved
                        detailsEl.removeChild(detailsEl.lastChild);
                        let savedEl = document.createElement('p');
                        savedEl.textContent = 'Saved to Watchlist';
                        detailsEl.appendChild(savedEl);
                    })
                    // if item IS in storage
                } else {
                    // create an element and display to user that the item they're viewing is already in storage
                    let savedTextEl = document.createElement('p');
                    savedTextEl.textContent = 'Saved to Watchlist';
                    savedTextEl.setAttribute('class', 'already-saved-text')
                    detailsEl.appendChild(savedTextEl);
                }
            }
            // append the container itself to modal
            document.querySelector('.modal-content').appendChild(detailsEl);
        })
    })
};

// get details for tv shows, using data passed as argument from other function, original data item from TMDB API
var getTVData = function(data, src) {
    // reset data passed to a new variable because data will be used again in the later watch provider API call
    let dataObject = data;
    // clear modal
    modalContentArea.innerHTML = '';
    // create container for all details
    let detailsEl = document.createElement('div');
    
    // create url for larger poster size
    let fullUrl = `${imgBaseUrl}/${posterSize[3]}/${src}`

    // pull other needed details from data passed
    let name = data.name;
    let overview = data.overview;
    let network = data.networks[0].name;
    let seasons = data.number_of_seasons;

    // create html elements to contain all that info, append those elements to details container
    let imgEl = document.createElement('img');
    imgEl.setAttribute('src', fullUrl);
    detailsEl.appendChild(imgEl);

    let showNameEl = document.createElement('p');
    showNameEl.textContent = name;
    detailsEl.appendChild(showNameEl);

    let showOverviewEl = document.createElement('p');
    showOverviewEl.textContent = overview;
    detailsEl.appendChild(showOverviewEl);

    let showNetworkEl = document.createElement('p');
    showNetworkEl.textContent = 'Network: ' + network;
    detailsEl.appendChild(showNetworkEl);

    let showSeasonsEl = document.createElement('p');
    showSeasonsEl.textContent = 'Number of seasons: ' + seasons;
    detailsEl.appendChild(showSeasonsEl);
    
    // set up another API call to get watch providers from TMDB API for TV shows (when available)
    fetch(`https://api.themoviedb.org/3/tv/${data.id}/watch/providers?api_key=${theMovieDbApiKey}`)
    .then(function(response) {
        response.json()
        .then(function(data) {
            // check only for results for US
            if (data.results.US) {
                // check only for items that are available on streaming services, not buy/rent
                if (data.results.US.flatrate){
                    // if streaming available, pull that info, create element, display to user
                    let provider = data.results.US.flatrate[0].provider_name;
                    let providerEl = document.createElement('p');
                    providerEl.textContent = 'Watch on: ' + provider;
                    detailsEl.appendChild(providerEl);
                }
            }
            // check if this item is already in storage
            if (!storageArray.some(e => e.data.id === data.id)) {
                // if not, create save button
                let saveBtn = document.createElement('button');
                saveBtn.classList = 'saveButton';
                saveBtn.textContent = 'Save to Watchlist';
                // click even listener for save button
                saveBtn.addEventListener('click', function() {
                    // save the item to the watchlist
                    saveItem(src, dataObject);

                    // remove the save button, replace with a new element telling user the item was saved
                    detailsEl.removeChild(detailsEl.lastChild);
                    let savedEl = document.createElement('p');
                    savedEl.textContent = 'Saved to Watchlist';
                    detailsEl.appendChild(savedEl);
                })
                // append save button to details container
                detailsEl.appendChild(saveBtn);
            } else {
                // if item is in storage, let user know they've already saved that item
                let savedTextEl = document.createElement('p');
                savedTextEl.textContent = 'Saved to Watchlist';
                savedTextEl.setAttribute('class', 'already-saved-text')
                detailsEl.appendChild(savedTextEl);
            }
        
            // append the details container to modal
            modalContentArea.appendChild(detailsEl);  
        })
    })
}

// fetch trending movie/shows from TMDB API
var getTopTen = function() {         
    // clear results area/genre buttons in case they're already displayed
    resultsArea.innerHTML = '';
    document.querySelector("#genre-list").innerHTML = '';

    // add heading
    let heading = document.createElement('h2');
    heading.textContent = `Today's Top Ten`;
    heading.className='has-text-info is-size-4 is-family-monospace m-0'
    resultsArea.appendChild(heading);

    // url pulls top 20 trending movies/shows for the day
    fetch(`${theMovieDbUrl}trending/all/day?api_key=${theMovieDbApiKey}`)
    .then(function(response) {
        response.json()
        .then(function(data) {
            // data.results is the array of results
            let results = data.results;
            // run function to fill page with info from results array
            populateResultsArea(results);
        }
      );
    }
  );
};

// generic function to take any array of results returned from TMDB API and display those results for the user
function populateResultsArea(results) {
    //    loop through results array to get info for first 10 results
    for (let i = 0; i < 10; i++) {
        // since some results include actors/directors, only continue if the item is NOT a person
        if (!(results[i].media_type === 'person')) {
        // container for each item
        let containerDiv = document.createElement('div');
        containerDiv.setAttribute('class', 'poster-container');

        // create a block for each poster
        let imgBlock = document.createElement('img');
        // set id for each poster
        imgBlock.setAttribute('id', `movie${i+1}`);
            
        // pull TMDB id for each index
        let id = results[i].id;
        // pull media type for each index (movie/tv show)
        let mediaType = results[i].media_type;
        
        // this is a bit of a hack - items received from search by genre are only movies so media type is not given
        // SO if there is NO media type, it will be set to movie
        if (!mediaType) {
            mediaType = 'movie';
        }

        // for each item, pull full entry from tmdb (to get url for poster)
        fetch(`${theMovieDbUrl}${mediaType}/${id}?api_key=${theMovieDbApiKey}`)
        .then(function(response) {
            response.json()
            .then(function(data) {
                // use data.poster_path OR if that's not there use dummy image
                let posterPath = (data.poster_path || 'assets/images/dummyposterupgrade.jpg')
                containerDiv.appendChild(imgBlock);
                // if the full item returned now has no poster path, set that back to dummy image
                if (data.poster_path === null) {
                    imgBlock.setAttribute('class', 'dummy-poster')
                    imgBlock.setAttribute('src', posterPath);
    
                    // overlay title on dummy image
                    let overlayTitleEl = document.createElement('p');
                    overlayTitleEl.textContent = data.title;
                    overlayTitleEl.setAttribute('class', 'overlay-title')
                    containerDiv.appendChild(overlayTitleEl);    
                } else {    
                    // grab full url for poster, small size
                    let fullUrl = `${imgBaseUrl}/${posterSize[1]}/${posterPath}`;
                    // set src attribute of imgBlock to full poster url
                    imgBlock.setAttribute('src', fullUrl);
                }
                // need to determine whether the item at this index is a movie or tv show to grab name/title property for alt tags
                if (mediaType === 'movie') {
                    imgBlock.setAttribute('alt', `Poster for ${data.title}`)
                }
                if (mediaType === 'tv') {
                    imgBlock.setAttribute('alt', `Poster for ${data.name}`)
                }
                // set data attribute to be able to pull imdb_ids for movies
                imgBlock.setAttribute('data-imdbid', data.imdb_id);

                // set data attribute for media type to pull correct data if we need it in the future
                imgBlock.setAttribute('data-mediatype', mediaType);
    
                // append that image to the results area
                resultsArea.appendChild(containerDiv);
                    
                // when images are clicked, more data will be returned for the item. Different process for movies and tv shows
                imgBlock.addEventListener('click', function(e) {
                    // open modal
                    itemModal.classList.add('is-active');
                    // if img clicked has 'movie' mediatype, grab imdbID and pass to getMovieData function
                    if (e.target.dataset.mediatype === 'movie'){
                        let imdbID = e.target.dataset.imdbid 
                        getMovieData(imdbID, posterPath);                            
                    }
                        // if img clicked is a tv show, take all data retrieved and pass to getTVData with url for poster
                    else if (e.target.dataset.mediatype === 'tv') {
                        getTVData(data, posterPath);
                    }
                    })
                })
            })
        };
    }
};

var loadGenres = function () {
  fetch(
    theMovieDbUrl +
      "genre/movie/list?api_key=" +
      theMovieDbApiKey +
      "&language=en-US"
  ).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      resultsArea.innerHTML = '';
      // viewing genre ids from array as dynamic buttons on html
      var parentDivEl = document.querySelector("#genre-list");

      parentDivEl.innerHTML="";

      for (var i = 0; i < data.genres.length; i++) {
        
        var genreDataId = data.genres[i].id;

        // var genreBtnEl = document.querySelectorAll(".genre");

        var button = document.createElement("button");
        console.log("button", button);

        button.setAttribute("id", data.genres[i].id);
        button.setAttribute("name", data.genres[i].name);
        button.className = "genre"
        button.textContent = data.genres[i].name;
        // console.log(button);

        button.addEventListener("click", function(event){
          searchByGenre(event.target.getAttribute('id'));
        });

        parentDivEl.appendChild(button);
    }   

    });
  });
};

var searchByGenre = function (genreDataId) {
    resultsArea.innerHTML = '';
    console.log(genreDataId);
    //   // Here the user will select ONE genre as a filter and
      // on click, results of 10 movies for that genre will return to display.
    // event.target()
    fetch( theMovieDbUrl + "discover/movie?api_key=" + theMovieDbApiKey + "&with_genres=" + genreDataId+ "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
    .then(function (response){
    response.json().then(function (data) {
         // data.results is the array of results
         let results = data.results;
         // run function to fill page with info from adults array
         populateResultsArea(results);    
    })})
};

// take text entered by user and use multi search endpoint from TMDB API to return results with that word
function searchByKeyword (input) {
    resultsArea.innerHTML = '';
    let keywordUrl = `${theMovieDbUrl}search/multi?api_key=${theMovieDbApiKey}&query=${input}`;
    fetch(keywordUrl)
    .then(function (response) {
        response.json()
        .then(function (data) {
            // grab array of results returned and pass to populate results function for display to user
            let results = data.results;
            populateResultsArea(results);
        })
    })
}

// save an item to the watch list, pass in the url for the poster and the data object used for details
function saveItem(imgUrl, data) {
    // condition to allow for different urls passed in - dummy image / poster path from TMDB
    let fullPosterPath = '';
    if (imgUrl === 'assets/images/dummyposterupgrade.jpg') {
        // if dummy image was used it will be set to the saved item
        fullPosterPath = imgUrl;
    }
    else {
        // if just poster path was used, full path for that item is saved
        fullPosterPath = `${imgBaseUrl}/${posterSize[1]}/${imgUrl}`;
    }
    // create object for storage
    let itemObject = {
        url: fullPosterPath,
        data: data
    }
    // if item has imdbID (must be a movie), handle as such
    if (itemObject.data.imdbID) {
        // check if stored, if not, store it
        if (!storageArray.some(e => e.data.imdbID === itemObject.data.imdbID)) {
            // add the new item to end of storage array
            storageArray.push(itemObject);
            // reset the watchlist in local storage to the new array
            localStorage.setItem('watchlist', JSON.stringify(storageArray));
        }
        // else is then only tv shows
    } else {
        // if item is NOT in storage, store it
        if (!storageArray.some(e => e.data.id === itemObject.data.id)) {
            // add that item to end of storage array
            storageArray.push(itemObject);
            // reset the watchlist in local storage to the new array
            localStorage.setItem('watchlist', JSON.stringify(storageArray));
        }
    }
};

// when the page is fully loaded, the topten function will automatically run and fill the page with top trending results
window.addEventListener('DOMContentLoaded', getTopTen());