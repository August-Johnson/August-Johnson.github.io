// Requiring the word.js file and the inquirer package.
var Word = require("./word");
var inquirer = require("inquirer");
// Array of possible word choices
var words = ["King of The Hill", "Darker Than Black", "Family Guy", "Nathan for You", "American Ninja Warrior", "Master Chef", "Hells Kitchen", "American Dad", "Breaking Bad"];
// Picking a work from the array and starting the game.
gameSetUp();

// Function that chooses a word from the array and runs the constructor functions on said word. After that, it will run the function that prompts the user.
function gameSetUp() {
    var chosenWord = new Word(words[Math.floor(Math.random() * words.length)]);
    chosenWord.lettersArr();
    chosenWord.displayWord();

    promptUser(chosenWord);
}

// Function that prompts the user to guess a letter. Calls the function checkWin to see if the word has been solved or not (if every letter's 'letterGuessed' value is set to true).
function promptUser(word) {

    inquirer.prompt({
        name: "letter",
        message: "GUESS A LETTER"
    }).then(function (answer) {
        var guess = answer.letter;

        word.userGuess(guess);
        checkWin(word);
    });
}
// Function that checks if the word is solved or not. If not, it will run the prompt again until the user wins or loses.
function checkWin(word) {
    var wordSolved = false;
    // Array that will hold the boolean value of each letter in the word.
    var letterGuessedArr = [];
    // Loops through the word and pushes each letter's boolean value to the array.
    for (var i = 0; i < word.letters.length; i++) {
        letterGuessedArr.push(word.letters[i].letterGuessed);
    }
    // If all of the letters have a l'etterGuessed' value of true, the user wins.
    if (letterGuessedArr.indexOf(false) === -1) {
        wordSolved = true;
        console.log("YOU WIN!");
        gameOver();
    }
    // If the word is not wolved yet and the user still has guesses left, run the prompt again.
    if (word.guessesLeft > 0 && wordSolved === false) {
        promptUser(word);
    }
    // If the user runs out of guesses, they lose.
    else if (word.guessesLeft === 0) {
        console.log("YOU LOSE!");
        gameOver();
    }
}

// Function that is called when the user either wins or loses. It will ask if they want to play again. If they do, it'll run the programm all over again. If not, the application ends.
function gameOver() {
    inquirer.prompt({
        name: "action",
        message: "WOULD YOU LIKE TO PLAY AGAIN?",
        type: "list",
        choices: ["YES", "NO"]
    }).then(function (answer) {
        switch (answer.action) {
            case "YES":
                gameSetUp();
                break;

            case "NO":
                break;
        }
    });
}