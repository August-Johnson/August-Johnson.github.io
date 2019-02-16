require("dotenv").config();
var keys = require("./keys.js");
var spotify = keys.spotify;

var axios = require("axios");
var moment = require("moment");

// action type and secondary input
var userCommand = process.argv[2];
var secondCommand = process.argv.splice(3).join(" ");


// function for each command type (use ajax api calls)

// concert-this function
function getConcert() {
    var artist = secondCommand;

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {
        for (i = 0; i < response.data.length; i++) {
            console.log("VENUE NAME: " + response.data[i].venue.name + "\n" +
                "VENUE LOCATION: " + response.data[i].venue.city + " " + response.data[i].venue.region + "\n" +
                "DATE OF THE VENUE: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n-----------------------------------");
        }
    });
}
// spotify-this-song function
// movie-this function
// do-what-it-says function

// switch statement based on users command type
switch (userCommand) {
    case "concert-this":
        getConcert();
        break;

    case "spotify-this-song":
        console.log("you chose the spotify command");
        break;

    case "movie-this":
        console.log("you chose the movie command");
        break;

    case "do-what-it-says":
        console.log("you chose the other one");
        break;

        default:
        console.log("INVALID COMMAND, PLEASE USE ONE OF THE FOLLOWING VALID INPUTS: \n" + 
        "1)'concert-this' + 'artist name' \n" +
        "2)'spotify-this-song' + 'song name' \n" + 
        "3)'movie-this' + 'movie name' \n" + 
        "4)'do-what-it-says'");
}