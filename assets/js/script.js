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
var getConfigInfo = function () {
  fetch(
    "https://api.themoviedb.org/3/configuration?api_key=" + theMovieDbApiKey
  ).then(function (response) {
    response.json().then(function (data) {
      imgBaseUrl = data.images.secure_base_url;
      configData = data.images;
      posterSize = data.images.poster_sizes[1];
    });
  });
};

// get the config data after document loads
document.addEventListener("DOMContentLoaded", getConfigInfo);

// grabbing buttons from html
let top10Btn = document.querySelector("#top10Btn");
let genreSelBtn = document.querySelector("#genreSel");
let watchlistBtn = document.querySelector("#watchlist");
// event listener to pull trending movies
top10Btn.addEventListener("click", function () {
  getTopTen();
});

// event listener to pull genre options for user to select
genreSelBtn.addEventListener("click", function () {
  loadGenres();
});

// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
// fetch movie data from TMDB API
var getTopTen = function () {
  fetch(`${theMovieDbUrl}trending/all/day?api_key=${theMovieDbApiKey}`).then(
    function (response) {
      response.json().then(function (data) {
        let results = data.results;
        console.log(results);
        for (let i = 0; i < 9; i++) {
          let id = results[i].id;
          fetch(`${theMovieDbUrl}movie/${id}?api_key=${theMovieDbApiKey}`).then(
            function (response) {
              response.json().then(function (data) {
                console.log(data);
                let posterPath = data.poster_path;
                let fullUrl = `${imgBaseUrl}/${posterSize}/${posterPath}`;
                let imgBlock = document.querySelector(`#movie${i + 1}`);
                imgBlock.setAttribute("src", fullUrl);
              });
            }
          );
        }
      });
    }
  );
};

// TODO: Update top ten for movie && | show -- Colin
// TODO: On click, show synopsis of movie or show -- use modal -- dismiss on click or swipe -- up for grabs!

// TODO: Add button to movie results/posters for local storage, cueing save to watchlist -- up for grabs!

// TODO: Gene selector -- using genre ids filter choices: let them choose from list using if() statement -- Claire

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

      for (var i = 0; i < data.genres.length; i++) {
        
        var genreDataId = data.genres[i].id;

        var button = document.createElement("button");
        console.log("button", button);

        button.setAttribute("id", data.genres[i].id);
        button.setAttribute("class", data.genres[i].name);
        button.textContent = data.genres[i].name;
        console.log(button);

        button.addEventListener("click", function(){
            searchByGenre(genreDataId);
        });
        parentDivEl.appendChild(button);
      }
      // Prevent default load if button is clicked more than once, limit display to one occurrence. Remove additional elements if necessary.
    });
  });
};

var searchByGenre = function (genreDataId) {
    console.log(genreDataId);
    // event.target()
    // fetch( theMovieDbUrl + "discover/movie?api_key=" + theMovieDbApiKey + "&with_genres=37&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
    // .then(function (response){
    // response.json().then(function (data) {
    //   console.log(data);})})
}

//   // Here the user will select ONE genre as a filter and
// //        // on click, results of 10 movies for that genre will return to display.


// TODO: Keyword search can filter request using Search, Discover, or Keyword API; clear input after submit -- Omar

// TODO: Jake and Omar on CSS and Bulma framework
