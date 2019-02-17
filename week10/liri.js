// require packages
require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

// action type and secondary input (s0ng, movie, band etc.)
var userCommand = process.argv[2];
var secondCommand = process.argv.splice(3).join(" ");


// spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });


// function for each command type (use ajax api calls)
// concert-this function
function getConcert() {
    var artist = secondCommand;

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {
        for (i = 0; i < response.data.length; i++) {
            // if the location doesn't have a region (areas in Europe), then don't print the empty region with an extra comma
            if (response.data[i].venue.region === "") {
                console.log(i + ':\nVENUE NAME: "' + response.data[i].venue.name +
                    '"\nVENUE LOCATION: "' + response.data[i].venue.city + ", " + response.data[i].venue.country +
                    '"\nDATE OF THE VENUE: ' + moment(response.data[i].datetime).format("MM/DD/YYYY") + '\n-----------------------------------');
            }
            else {
                console.log(i + '\nVENUE NAME: "' + response.data[i].venue.name +
                    '"\nVENUE LOCATION: "' + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country +
                    '"\nDATE OF THE VENUE: ' + moment(response.data[i].datetime).format("MM/DD/YYYY") + '\n-----------------------------------');
            }
        }
    });
}

// spotify-this-song function
function getSong() {
    var songName = secondCommand;
    // if the user didn't enter a song name, print the default of 'The Sign, by Ace of Base'
    if (songName === "" || songName === undefined || songName === null) {
        var defaultSong = 'The Sign';
        spotify.search({ type: 'track', query: defaultSong, limit: 10 }, function (err, response) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log('--------------------------------------\n\nARTIST NAME: "' + response.tracks.items[9].album.artists[0].name +
                '"\nSONG NAME: "' + response.tracks.items[9].name +
                '"\nALBUM NAME: "' + response.tracks.items[9].album.name +
                '"\nLINK TO SONG: "' + response.tracks.items[9].preview_url + '"\n');
        });
    }
    else {
        // if the user did enter a song name
        spotify.search({ type: 'track', query: songName, limit: 5 }, function (err, response) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            for (i = 0; i < response.tracks.items.length; i++) {
                // if there is no preview, just print the link to the full song
                if (response.tracks.items[i].preview_url === null) {
                    console.log('--------------------------------------\n\nARTIST NAME: "' + response.tracks.items[i].album.artists[0].name +
                        '"\nSONG NAME: "' + response.tracks.items[i].name +
                        '"\nALBUM NAME: "' + response.tracks.items[0].album.name +
                        '"\nLINK TO SONG: "' + response.tracks.items[i].album.external_urls.spotify + '"\n');
                }
                else {
                    console.log('--------------------------------------\n\nARTIST NAME: "' + response.tracks.items[i].album.artists[0].name +
                        '"\nSONG NAME: "' + response.tracks.items[i].name +
                        '"\nALBUM NAME: "' + response.tracks.items[0].album.name +
                        '"\nLINK TO SONG: "' + response.tracks.items[i].preview_url + '"\n');
                }
            }
        });
    }
}
// movie-this function
function getMovie() {
    var movieTitle = secondCommand;
    // if the user didn't put in a movie title, print the default data of 'Mr. Nobody'
    if (movieTitle === "" || movieTitle === undefined || movieTitle === null) {
        var defaultMovie = 'Mr. Nobody';

        axios.get("http://www.omdbapi.com/?t=" + defaultMovie + "&plot=full&apikey=3d42b8e8").then(function (response) {
            console.log('--------------------------------------\n\nMOVIE TITLE: "' + response.data.Title +
                '"\nRELEASE YEAR: ' + response.data.Year +
                '\nIMDB RATING: ' + response.data.imdbRating +
                '\nROTTEN TOMATOES RATING: ' + response.data.Ratings[1].Value +
                '\nCOUNTRY: "' + response.data.Country +
                '"\nLANGUAGE: "' + response.data.Language +
                '"\nACTORS: "' + response.data.Actors +
                '"\n\nPLOT: "' + response.data.Plot +
                '"\n--------------------------------------\n(If you haven\'t watched Mr. Nobody, you should! It\'s on Netflix!)\nhttp://www.imdb.com/title/tt0485947/');
        })
    }
    // if the user did put in a movie title
    else {
        axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&plot=full&apikey=3d42b8e8").then(function (response) {
            console.log('--------------------------------------\n\nMOVIE TITLE: "' + response.data.Title +
                '"\nRELEASE YEAR: ' + response.data.Year +
                '\nIMDB RATING: ' + response.data.imdbRating +
                '\nROTTEN TOMATOES RATING: ' + response.data.Ratings[1].Value +
                '\nCOUNTRY: "' + response.data.Country +
                '"\nLANGUAGE: "' + response.data.Language +
                '"\nACTORS: "' + response.data.Actors +
                '"\n\nPLOT: "' + response.data.Plot + '"\n');
        });
    }
}
// do-what-it-says function

// switch statement based on users command type
switch (userCommand) {
    case "concert-this":
        getConcert();
        break;

    case "spotify-this-song":
        getSong();
        break;

    case "movie-this":
        getMovie();
        break;

    case "do-what-it-says":
        console.log("you chose the other one");
        break;

    // default:
    //     console.log("INVALID COMMAND, PLEASE USE ONE OF THE FOLLOWING VALID INPUTS: \n" +
    //         "1)'concert-this' + 'artist name' \n" +
    //         "2)'spotify-this-song' + 'song name' \n" +
    //         "3)'movie-this' + 'movie name' \n" +
    //         "4)'do-what-it-says'");
}