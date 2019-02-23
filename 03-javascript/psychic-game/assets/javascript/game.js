var computerChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var myWinsElement = document.getElementById('myWins');
var myLossesElement = document.getElementById('myLosses');
var guessesLeftElement = document.getElementById('guessesLeft');
var myGuessesSoFarElement = document.getElementById('myGuesses');

var computerThinkingOf = computerChoices[Math.floor(Math.random() * computerChoices.length)];

document.onkeypress = function (event) {
    var myGuess = event.key;

    console.log(computerThinkingOf);

    if (myGuess === computerThinkingOf) {
        myWinsElement.textContent = parseInt(myWinsElement.textContent) + 1;
        myGuessesSoFarElement.textContent = "";
        guessesLeftElement.textContent = 9;
        computerThinkingOf = computerChoices[Math.floor(Math.random() * computerChoices.length)];

    }

    else {
        guessesLeftElement.textContent = parseInt(guessesLeftElement.textContent) - 1;
        myGuessesSoFarElement.textContent += myGuess + ", ";
    }

    if (guessesLeftElement.textContent == 1) {
        guessesLeftElement.textContent += " (Only one guess left!)";
    }

    if (guessesLeftElement.textContent == 0) {
        myLossesElement.textContent = parseInt(myLossesElement.textContent) + 1;
        myGuessesSoFarElement.textContent = "";
        guessesLeftElement.textContent = 9;
        computerThinkingOf = computerChoices[Math.floor(Math.random() * computerChoices.length)];

    }
}