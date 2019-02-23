// Require packages calls.
require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
// Putting process.argv[3] into a better format.
process.argv[3] = process.argv.splice(3).join(" ");
console.log(process.argv[3]);
// Function for switch statement based on the users' command type.
function getUserCommand(commandType, commandValue) {
    switch (commandType) {
        case "concert-this":
            getConcert(commandValue);
            break;

        case "spotify-this-song":
            getSong(commandValue);
            break;

        case "movie-this":
            getMovie(commandValue);
            break;

        case "do-what-it-says":
            getFileText(commandType, commandValue);
            break;

        default:
            console.log('\nINVALID COMMAND, PLEASE USE ONE OF THE FOLLOWING VALID INPUTS: \n\n' +
                '1)"concert-this" + "artist name"\n\n' +
                '2)"spotify-this-song" + "song name"\n\n' +
                '3)"movie-this" + "movie name"\n\n' +
                '4)"do-what-it-says"');
    }
}
// Appending each command to log.txt
    var textToAppend = process.argv[2] + ' ' + process.argv[3] + '\n';
    fs.appendFile("log.txt", textToAppend, function (err) {
        if (err) {
            console.log(err);
        }
    });
// Functions for each command type.
// Function for the 'concert-this' command.
function getConcert(artist) {

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {
        // If there are no concerts found, prints a message to the user telling them so.
        if (response.data.length === 0) {
            console.log('\nZERO RESULTS FOUND.\n');
        }
        // Otherwise, run normally. I made 'variable i' start at 1 for the sake of displaying the number of each response.
        for (i = 1; i < response.data.length + 1; i++) {
            // If the location doesn't have a region (areas in Europe), then don't print the empty region with an extra comma and white space.
            if (response.data[i - 1].venue.region === "") {
                console.log('\n' + i + ':\nVENUE NAME: "' + response.data[i - 1].venue.name +
                    '"\nVENUE LOCATION: "' + response.data[i - 1].venue.city + ", " + response.data[i - 1].venue.country +
                    '"\nDATE OF THE VENUE: ' + moment(response.data[i - 1].datetime).format("MM/DD/YYYY") + '\n\n-----------------------------------');
            }
            else {
                console.log('\n' + i + '\nVENUE NAME: "' + response.data[i - 1].venue.name +
                    '"\nVENUE LOCATION: "' + response.data[i - 1].venue.city + ", " + response.data[i - 1].venue.region + ", " + response.data[i - 1].venue.country +
                    '"\nDATE OF THE VENUE: ' + moment(response.data[i - 1].datetime).format("MM/DD/YYYY") + '\n\n-----------------------------------');
            }
        }
    });
}
// Function for the 'spotify-this-song' command.
function getSong(songName) {
    // If the user didn't enter a song name, print the data of the default-('The Sign, by Ace of Base').
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
        // If the user did enter a song name, run normally.
        spotify.search({ type: 'track', query: songName, limit: 5 }, function (err, response) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            for (i = 0; i < response.tracks.items.length; i++) {
                // If there is no preview, just print the link to the full song instead.
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
// Function for the 'movie-this' command.
function getMovie(movieTitle) {
    // If the user didn't put in a movie title, print the default data of 'Mr. Nobody'.
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
                '"\n--------------------------------------\n(If you haven\'t watched Mr. Nobody, you should! It\'s on Netflix!)\n"http://www.imdb.com/title/tt0485947/"');
        })
    }
    // If the user did put in a movie title, run normally.
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
// function for the 'do-what-it-says' command
function getFileText(fileCommand, fileValue) {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // Formatting the text file into an array and then seperating each part into a seperate command value. 
        // The first one being the command and the second one being the parameter or arguement for the command.
        var dataArr = data.split(",");
        fileCommand = dataArr[0];
        fileValue = dataArr[1];
        // Taking the command value and putting it into an array so I can remove the double quotes.
        // The concert-this command didn't run into any issues when I manually entered the second arguement with double quotes,
        // but it freaked out when the readFile tried to put in the double quotes.
        fileValue = fileValue.split("");
        fileValue.splice(fileValue.indexOf('"'), 1);
        fileValue.splice(fileValue.lastIndexOf('"'), 1);
        fileValue = fileValue.join('');
        // Running the getUserCommand function and passing in the random.txt values.
        getUserCommand(fileCommand, fileValue);
    });
}
// Run the function to check the users' command upon start.
getUserCommand(process.argv[2], process.argv.splice(3).join(" "));