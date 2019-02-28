var Word = require("./word");
var inquirer = require("inquirer");
// array of possible word choices
var words = ["King of The Hill", "Darker Than Black", "Family Guy", "Nathan for You", "American Ninja Warrior", "Master Chef", "Hells Kitchen", "American Dad", "Breaking Bad"];


function chooseWord() {
    console.log(Math.floor(Math.random() * 5));
}

chooseWord();