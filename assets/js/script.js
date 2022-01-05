var theMovieDbUrl = "https://api.themoviedb.org/3/movie/550?api_key="; 
var theMovieDbApiKey = config.theMovieDbApiKey;

var getMovieData = function() {
    fetch(theMovieDbUrl+theMovieDbApiKey)
    .then(function(response) {
        response.json()
        .then(function(data) {
            console.log(data);
        })
    })
}