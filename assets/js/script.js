// base url for api calls
var theMovieDbUrl = "https://api.themoviedb.org/3/";
// api key pulled from config file
var theMovieDbApiKey = config.theMovieDbApiKey;
var omdbAPIKey = config.omdbAPIKey;
var omdbBaseUrl = 'http://www.omdbapi.com/?apikey='

// placeholder for data that will be pulled from getConfigInfo
// poster urls are -- imgBaseUrl/posterSize/[poster_path]
let imgBaseUrl = null;
let configData = null;
let posterSize = null;

// get configuration data from TMDB api
var getConfigInfo = function() {
    fetch('https://api.themoviedb.org/3/configuration?api_key=' + theMovieDbApiKey)
    .then(function(response) {
        response.json()
        .then(function(data) {
            // imgBaseUrl is the start of the url for all movie posters
            imgBaseUrl = data.images.secure_base_url;
            // config data is all the relevant information for constructing those urls
            configData = data.images;
            // poster_sizes is an array of sizes, must define a size in url
            posterSize = data.images.poster_sizes[1];
        })
    })
};

// get the config data after document loads
document.addEventListener("DOMContentLoaded", getConfigInfo);

// grabbing buttons from html

let top10Btn = document.querySelector("#top10Btn");
let genreSelBtn = document.querySelector("#genreSel");
let watchlistBtn = document.querySelector("#watchlist");
let resultsArea = document.querySelector('#movie-images');

// event listener to pull trending movies
top10Btn.addEventListener("click", function () {
  getTopTen();
  // remove "genre" buttons if displayed from previous genre selector click.
  // removeGenres();
});

// event listener to pull genre options for user to select
genreSelBtn.addEventListener("click", function () {
    loadGenres();
});

var getMovieData = function(imdbID) {
    console.log(imdbID, 'this is a movie');
    fetch(`${omdbBaseUrl}${omdbAPIKey}&i=${imdbID}`)
    .then(function(response) {
        response.json()
        .then(function(data) {
            console.log(data);
            let detailsEl = document.createElement('div');

            let title = data.Title;
            let rating = data.Rated;
            let genres = data.Genre;
            let plot = data.Plot;
            let director = data.Director;
            let runTime = data.Runtime;
            let rottenTomatoesScore = data.Ratings[1].Value;

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

            let rottenTomatoesScoreEl = document.createElement('p');
            rottenTomatoesScoreEl.textContent = `Rotten Tomatoes Score: ${rottenTomatoesScore}`;
            detailsEl.appendChild(rottenTomatoesScoreEl);

            resultsArea.appendChild(detailsEl);
        })
    })
}

var getTVData = function(data) {
    let detailsEl = document.createElement('div');
    
    let name = data.name;
    let overview = data.overview;
    let network = data.networks[0].name;
    let seasons = data.number_of_seasons;

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

    document.querySelector('main').appendChild(detailsEl)
    console.log(detailsEl);
}

// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
// fetch movie data from TMDB API

var getTopTen = function() {
    resultsArea.innerHTML = '';
    // url pulls top 20 trending movies/shows for the day
    fetch(`${theMovieDbUrl}trending/all/day?api_key=${theMovieDbApiKey}`)
    .then(function(response) {
        response.json()
        .then(function(data) {
            // data.results is the array of results
            let results = data.results;
            console.log(results);
            // loop through results array
            for (let i = 0; i < 10; i++) {
                let imgBlock = document.createElement('img');
                imgBlock.setAttribute('id', `movie${i+1}`);
                
                // pull id for each index
                let id = results[i].id;
                // pull media type for each index (movie/tv show)
                let mediaType = results[i].media_type;
                // for each item, pull full entry from tmdb (to get url for poster)
                fetch(`${theMovieDbUrl}${mediaType}/${id}?api_key=${theMovieDbApiKey}`)
                .then(function(response) {
                    response.json()
                    .then(function(data) {
                        console.log(data);
                        // end of url for the poster
                        let posterPath = data.poster_path;
                        // full url for poster
                        let fullUrl = `${imgBaseUrl}/${posterSize}/${posterPath}`
                        // grab img element from html
                        // let imgBlock = document.querySelector(`#movie${i+1}`);
                        // set src attribute of imgBlock to full poster url
                        imgBlock.setAttribute('src', fullUrl);
                        if (mediaType === 'movie') {
                            imgBlock.setAttribute('alt', `Poster for ${data.title}`)
                        }
                        if (mediaType === 'tv') {
                            imgBlock.setAttribute('alt', `Poster for ${data.name}`)
                        }
                        imgBlock.setAttribute('data-imdbid', data.imdb_id);
                        // imgBlock.dataset.imdbID = data.imdb_id
                        imgBlock.setAttribute('data-mediatype', mediaType);
                        resultsArea.appendChild(imgBlock);
                        imgBlock.addEventListener('click', function(e) {
                            if (e.target.dataset.mediatype === 'movie'){
                                let imdbID = e.target.dataset.imdbid 
                                getMovieData(imdbID);                            
                            }
                            else if (e.target.dataset.mediatype === 'tv') {
                                getTVData(data);
                            }
                        })
                    })
                })
            }
          ;
        }
      );
    }
  );
};

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
        parentDivEl.append(button);
      }
        
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
    console.log(genreDataId);
    //   // Here the user will select ONE genre as a filter and
      // on click, results of 10 movies for that genre will return to display.
    // event.target()
    fetch( theMovieDbUrl + "discover/movie?api_key=" + theMovieDbApiKey + "&with_genres=" + genreDataId+ "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
    .then(function (response){
    response.json().then(function (data) {
      console.log(data);})})
    //   for (i =0;)
}




// TODO: Keyword search can filter request using Search, Discover, or Keyword API; clear input after submit -- Omar

// TODO: Jake and Omar on CSS and Bulma framework
