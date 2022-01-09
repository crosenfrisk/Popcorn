// base url and api keys for both apis from config file
var theMovieDbUrl = "https://api.themoviedb.org/3/";
var theMovieDbApiKey = config.theMovieDbApiKey;
var omdbBaseUrl = 'http://www.omdbapi.com/?apikey='
var omdbAPIKey = config.omdbAPIKey;

// placeholder for data that will be pulled from getConfigInfo
let imgBaseUrl = null;
// poster urls are -- imgBaseUrl/posterSize/[poster_path]
let posterSize = null;
let configData = null;

// array to store watchlist items
let storageArray = [];

// if there is a watchlist in storage, set those items to the value of the storage array. If there are no items the storageArray will be empty until items are added
if (localStorage.watchlist) {
    storageArray = JSON.parse(localStorage.watchlist)
}
// get configuration data from TMDB api
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
let watchlistBtn = document.querySelector("#watchlist");
let searchBtn = document.querySelector('#searchBtn');

// grab results area for display
let resultsArea = document.querySelector('#movie-images');

// event listener for search button
searchBtn.addEventListener('click', function() {
    if (searchInputEl.value) {
        searchByKeyword(searchInputEl.value);
        searchInputEl.value = '';
    }
})

// when enter is pressed
document.addEventListener('keypress', function(e) {
    // if the key pressed is 13 (enter) and there is any text in the input box
    if (e.charCode === 13 && searchInputEl.value) {
        resultsArea.innerHTML = '';
        document.querySelector("#genre-list").innerHTML = '';
        // run the search function
        searchByKeyword(searchInputEl.value);
        // reset input area to be blank
        searchInputEl.value = '';
    }
})
// event listener to pull trending movies
top10Btn.addEventListener("click", function () {
  getTopTen();
  // remove "genre" buttons if displayed from previous genre selector click.

//   removeGenres();

});

// event listener to pull genre options for user to select
genreSelBtn.addEventListener("click", function () {
    loadGenres();
});

// even listener for watchlist, displays previously saved movies
watchlistBtn.addEventListener('click', function() {
    // clear results area and genre buttons if they have been generated
    resultsArea.innerHTML = '';
    document.querySelector("#genre-list").innerHTML = '';
    // if nothing in storage, display message
    if (storageArray.length === 0) {
        resultsArea.innerHTML = 'You have nothing saved to your Watchlist';
    } else {
        for (let i = 0; i < storageArray.length; i++) {
            // check to see if movie or tv show - if tv show, it will NOT have property imdbID
            if (!storageArray[i].data.imdbID) {
            // create a div to hold all the info for each item in watch list
            let itemContainer = document.createElement('div');

            // create img element
            let posterEl = document.createElement('img');
            // set src attribute to url for the poster for the item at that index
            posterEl.setAttribute('src', storageArray[i].url)
            // add poster to item container
            itemContainer.appendChild(posterEl);

            // grab the other data
            let name = storageArray[i].data.name;
            let overview = storageArray[i].data.overview;
            let network = storageArray[i].data.networks[0].name;
            let seasons = storageArray[i].data.number_of_seasons;

            // create html elements to contain all that info, append those elements to details container
            let showNameEl = document.createElement('p');
            showNameEl.textContent = name;
            itemContainer.appendChild(showNameEl);

            let showOverviewEl = document.createElement('p');
            showOverviewEl.textContent = overview;
            itemContainer.appendChild(showOverviewEl);

            let showNetworkEl = document.createElement('p');
            showNetworkEl.textContent = network;
            itemContainer.appendChild(showNetworkEl);

            let showSeasonsEl = document.createElement('p');
            showSeasonsEl.textContent = seasons;
            itemContainer.appendChild(showSeasonsEl);

            // add whole container to results area
            resultsArea.appendChild(itemContainer);
            // else statements is for items WITH imdbID, meaning they are type 'movie'
            } else {

                let detailsEl = document.createElement('div');

                // pull all relevant data from response
                let title = storageArray[i].data.Title;
                let rating = storageArray[i].data.Rated;
                let genres = storageArray[i].data.Genre;
                let plot = storageArray[i].data.Plot;
                let director = storageArray[i].data.Director;
                let runTime = storageArray[i].data.Runtime;
    
                // create html elements to hold all that data, append them to container
                let imgEl = document.createElement('img');
                imgEl.setAttribute('src', storageArray[i].url);
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
                runTimeEl.textContent = `Running Time:${runTime}`;
                detailsEl.appendChild(runTimeEl);
    

                // append the container itself to results area (for now)
                resultsArea.appendChild(detailsEl);
            }
        }
        // create button to clear watchlist
        let clearBtn = document.createElement('button');
        clearBtn.textContent = 'Clear Watchlist';
        resultsArea.appendChild(clearBtn);

        clearBtn.addEventListener('click', function() {
            localStorage.clear();
            storageArray = [];
            resultsArea.innerHTML = 'Your watchlist has been cleared';
        })
    }
})

// called if media_type is 'movie', calls OMDB API for movie details
var getMovieData = function(imdbID, posterPath) {
    console.log(imdbID, 'this is a movie');
    // fetch using imdbID passed as argument
    fetch(`${omdbBaseUrl}${omdbAPIKey}&i=${imdbID}`)
    .then(function(response) {
        response.json()
        .then(function(data) {
            console.log(data);
            // make a container to put all the details
            let detailsEl = document.createElement('div');


            // pull all relevant data from response
            let title = data.Title;
            let rating = data.Rated;
            let genres = data.Genre;
            let plot = data.Plot;
            let director = data.Director;
            let runTime = data.Runtime;

            // construct url for poster from different pieces of data collected from TMDB API
            let fullPosterPath = `${imgBaseUrl}/${posterSize[3]}/${posterPath}`;

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

            // create save button
            let saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save to Watchlist';
            detailsEl.appendChild(saveBtn);

            // data for this item will be saved to watchlist on click
            saveBtn.addEventListener('click', function() {
                saveItem(posterPath, data)
            })

            // append the container itself to results area (for now)
            resultsArea.appendChild(detailsEl);
                // append details of container to modal, remove above ^ (resultsArea.appendChild(detailsEl))
                // var modalEl = document.createElement("div");
                // modalEl.className = "modal-content";
                // modalEl.appendChild(detailsEl);
                // resultsArea.appendChild(modalEl);
                // modalEl..appendChild(saveBtn);
        })
    })
}

// get details for tv shows, using data passes as argument from other function
var getTVData = function(data, src) {

    // create container for all details
    let detailsEl = document.createElement('div');
    
    // pull relevant info
    let fullUrl = `${imgBaseUrl}/${posterSize[3]}/${src}`
    let name = data.name;
    let overview = data.overview;
    let network = data.networks[0].name;
    let seasons = data.number_of_seasons;

    // create html elements to contain all that info, append those elements to details container
    let imgEl = document.createElement('img');
    imgEl.setAttribute('src', fullUrl);
    detailsEl.appendChild(imgEl)

    let showNameEl = document.createElement('p');
    showNameEl.textContent = name;
    detailsEl.appendChild(showNameEl);

    let showOverviewEl = document.createElement('p');
    showOverviewEl.textContent = overview;
    detailsEl.appendChild(showOverviewEl);

    let showNetworkEl = document.createElement('p');
    showNetworkEl.textContent = network;
    detailsEl.appendChild(showNetworkEl);

    let showSeasonsEl = document.createElement('p');
    showSeasonsEl.textContent = seasons;
    detailsEl.appendChild(showSeasonsEl);

    // create save button
    let saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save to Watchlist';
    // click even listener for save button
    saveBtn.addEventListener('click', function() {
        saveItem(src, data);
    })
    // append save button to details container
    detailsEl.appendChild(saveBtn);
    
    // append the details container to the end of the page (for now)
    resultsArea.appendChild(detailsEl)
    // append details of container to modal, remove above ^ (resultsArea.appendChild(detailsEl))
      // var modalEl = document.createElement("div");
      // modal.className= "modal-content";
      // modalEl.appendChild(detailsEl);
      // modalEl..appendChild(saveBtn);

}

// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
// fetch movie data from TMDB API

var getTopTen = function() {                 
    resultsArea.innerHTML = '';
    document.querySelector("#genre-list").innerHTML = '';

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


function populateResultsArea(results) {
        //    loop through results array
        for (let i = 0; i < 10; i++) {
        // create a block for each poster
        let imgBlock = document.createElement('img');
        // set id for each poster
        imgBlock.setAttribute('id', `movie${i+1}`);
        
        // pull TMDB id for each index
        let id = results[i].id;
        // pull media type for each index (movie/tv show)
        let mediaType = results[i].media_type;
        // this is a bit of a hack - items receieved from search by genre are only movies so media type is not given
        // SO if there is NO media type, it will be set to movie
        if (!mediaType) {
            mediaType = 'movie';
        }
        console.log(mediaType);
        // for each item, pull full entry from tmdb (to get url for poster)
        fetch(`${theMovieDbUrl}${mediaType}/${id}?api_key=${theMovieDbApiKey}`)
        .then(function(response) {
            response.json()
            .then(function(data) {
                console.log(data);
                // end of url for the poster
                let posterPath = data.poster_path;
                // full url for poster
                let fullUrl = `${imgBaseUrl}/${posterSize[1]}/${posterPath}`;
                // set src attribute of imgBlock to full poster url
                imgBlock.setAttribute('src', fullUrl);
                // need to determine whether the item at this index is a movie or tv show to grab name/title for alt tags
                if (mediaType === 'movie') {
                    imgBlock.setAttribute('alt', `Poster for ${data.title}`)
                }
                if (mediaType === 'tv') {
                    imgBlock.setAttribute('alt', `Poster for ${data.name}`)
                }
                // set data attribute to be able to pull imdb_ids for movies
                imgBlock.setAttribute('data-imdbid', data.imdb_id);

                // set data attribute for media type to pull correct data in future
                imgBlock.setAttribute('data-mediatype', mediaType);
                // append that image to the results area
                resultsArea.appendChild(imgBlock);
                // when images are clicked, more data will be returned for the item. Different process for movies and tv shows
                imgBlock.addEventListener('click', function(e) {
                    // if img clicked has is 'movie' mediatype, grab imdbID and pass to getMovieData function
                    if (e.target.dataset.mediatype === 'movie'){
                        let imdbID = e.target.dataset.imdbid 
                        getMovieData(imdbID, posterPath);                            
                    }
                    // if img clicked is NOT a movie, take all data retrieved and pass to getTVData with url for poster
                    else if (e.target.dataset.mediatype === 'tv') {
                        getTVData(data, posterPath);
                    }
                })
            })
        })
    };
}

// TODO: On click, show synopsis of movie or show -- use modal -- dismiss on click or swipe -- up for grabs! Working on it -- Claire


// TODO: Add button to movie results/posters for local storage, cueing save to watchlist -- up for grabs! -- Colin

// Fetch genre options from TMDB api, targeting genre ids
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
    //   event.target(genreSelBtn(stopPropagation());
      // Prevent default load if button is clicked more than once, limit display to one occurrence. Remove additional elements if necessary.      

    });
  });
};



// function removeGenres(){
//     // Remove genre buttons from dynamic display
//     var parentDivEl = document.querySelector("#genre-list");
//     var removeGenreBtnsEl = document.getElementsByClassName("genre");
//     parentDivEl.remove(removeGenreBtnsEl);
//     // enable genreSelBtn to work again (some how I can't do both)
// }


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
    //   for (i =0;)
};


// https://api.themoviedb.org/3/search/keyword?api_key=<<api_key>>&page=1
function searchByKeyword (input) {
    let keywordUrl = `${theMovieDbUrl}search/movie?api_key=${theMovieDbApiKey}&query=${input}`;
    fetch(keywordUrl)
    .then(function (response) {
        response.json()
        .then(function (data) {
            let results = data.results;
            populateResultsArea(results);
        })
    })
}


// TODO: Keyword search can filter request using Search, Discover, or Keyword API; clear input after submit -- Omar

// TODO: Jake and Omar on CSS and Bulma framework


// watch list functionality pseudo-code
// 1. when an image is clicked, the details for the image will show on the screen.
// 2. create a button among the details that when clicked, will save the id/imdb id to make calls again with that information
// 3. that data will be stored in an array in local storage
// 4. when the user clicks watchlist, the items saved in storage will be displayed again to the screen

function saveItem(imgUrl, data) {
    let fullPosterPath = `${imgBaseUrl}/${posterSize[1]}/${imgUrl}`;
    let itemObject = {
        url: fullPosterPath,
        data: data
    }
    if (itemObject.data.imdbID) {
        if (!storageArray.some(e => e.data.imdbID === itemObject.data.imdbID)) {
            console.log('This item is a MOVIE and is NOT in storage');
            storageArray.push(itemObject);
            localStorage.setItem('watchlist', JSON.stringify(storageArray));
        } else {
            console.log('This item is a MOVIE and IS in storage');
        }
    } else {
        if (!storageArray.some(e => e.data.id === itemObject.data.id)) {
            console.log('this item is a TV SHOW and is NOT in storage');
            storageArray.push(itemObject);
            localStorage.setItem('watchlist', JSON.stringify(storageArray));
        } else {
            console.log('This item is a TV show and IS in storage');
        }
    }


};