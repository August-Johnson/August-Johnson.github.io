// Requiring the word.js file and the inquirer package.
var Word = require("./word");
var inquirer = require("inquirer");
// Array of possible word choices
var words = ["King of The Hill", "Darker Than Black", "Family Guy", "Nathan for You", "American Ninja Warrior", "Master Chef", "Hells Kitchen", "American Dad", "Breaking Bad"];

// Array that will hold all of the user's guess history.
var alreadyGuessed = [];

// Initially setting the sameWord to an empty string.
var sameWord = "";

// Picking a work from the array and starting the game.
gameSetUp();

// Function that chooses a word from the array and runs the constructor functions on said word. After that, it will run the function that prompts the user.
function gameSetUp() {
    // Clearing the user's guess history.
    alreadyGuessed = [];

    // Randomly picking a new word.
    var chosenWord = new Word(words[Math.floor(Math.random() * words.length)]);

    // If sameWord is equal to the word that was just chosen, re-run the function.
    if (sameWord === chosenWord.word) {
        gameSetUp();
    }
    // If the word is different, continue the app normally and set sameWord equal to the new word string.
    else {
        console.log("\nGUESS THE WORD!\n");
        chosenWord.lettersArr();
        chosenWord.displayWord();

        sameWord = chosenWord.word;
        promptUser(chosenWord);
    }
}

// Function that prompts the user to guess a letter. Calls the function checkWin to see if the word has been solved or not (if every letter's 'letterGuessed' value is set to true).
function promptUser(word) {

    inquirer.prompt({
        name: "letter",
        message: "GUESS A LETTER",
        validate: function (value) {
            if (isNaN(value) === true) {
                return true;
            }
            return false;
        }
    }).then(function (answer) {
        // Setting a variable of 'guess' equal to what the user entered in the prompt.
        var guess = answer.letter;

        // Checking if the user's guess is not a letter they have already guessed for this word.
        validGuess(word, guess);
    });
}
// Function that checks if the word is solved or not. If not, it will run the prompt again until the user wins or loses.
function checkWin(word) {
    var wordSolved = false;
    // Variable that represents how many letters are left that need to be guessed.
    var lettersLeft = word.letters.length;

    // Loops through the word and checks for each letter's boolean value. If it is true, meaning it has been guessed correctly, it will subtract 1 from lettersLeft.
    for (var i = 0; i < word.letters.length; i++) {
        if (word.letters[i].letterGuessed === true) {
            lettersLeft--;
        }
    }

    // When lettersLeft is equal to 0, meaning there are no more letters needing to be guessed, or there are no letters with a boolean value of false, tell the user they win and run the gameOver function.
    if (lettersLeft === 0) {
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

// Function that checks if the user's guess is a new one. If they have already guessed that letter, tell them so. If not, continue running the app normally.
function validGuess(word, guess) {
    if (alreadyGuessed.indexOf(guess) === -1) {
        word.userGuess(guess);
        checkWin(word)
        alreadyGuessed.push(guess);
    }
    else {
        console.log("YOU HAVE ALREADY GUESSED THAT LETTER!");
        promptUser(word);
    }
}