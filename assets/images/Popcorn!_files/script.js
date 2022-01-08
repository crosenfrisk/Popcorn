// base url for api calls
var theMovieDbUrl = "https://api.themoviedb.org/3/"; 
// api key pulled from config file
var theMovieDbApiKey = config.theMovieDbApiKey;

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
            imgBaseUrl = data.images.secure_base_url;
            configData = data.images;
            posterSize = data.images.poster_sizes[1];
        })
    })
};

// get the config data after document loads
document.addEventListener('DOMContentLoaded', getConfigInfo);

// grabbing buttons from html
let top10Btn = document.querySelector('#top10Btn');
let myFavBtn = document.querySelector('#myFav');
let genreSelBtn = document.querySelector('#genreSel');
let runTimeBtn = document.querySelector('#runTime');
// event listener to pull trending movies
top10Btn.addEventListener('click', function() {
    getTopTen();
});

// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
// fetch movie data from TMDB API
var getTopTen = function() {
    fetch(`${theMovieDbUrl}trending/all/day?api_key=${theMovieDbApiKey}`)
    .then(function(response) {
        response.json()
        .then(function(data) {
            let results = data.results;
            console.log(results);
            for (let i = 0; i < 9; i++) {
                let id = results[i].id;
                fetch(`${theMovieDbUrl}movie/${id}?api_key=${theMovieDbApiKey}`)
                .then(function(response) {
                    response.json()
                    .then(function(data) {
                        console.log(data);
                        let posterPath = data.poster_path;
                        let fullUrl = `${imgBaseUrl}/${posterSize}/${posterPath}`
                        let imgBlock = document.querySelector(`#movie${i+1}`);
                        imgBlock.setAttribute('src', fullUrl);
                    })
                })
            }
        })
    })
};

