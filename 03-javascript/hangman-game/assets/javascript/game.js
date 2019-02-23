// word list
var words = [
    "python",
    "programming",
    "developer",
    "ruby",
    "coding"
];

// randomly selecting word from list
var word = words[Math.floor(Math.random() * words.length)];

// variables
var result = "";
var wordReveal = "";
var wins = 0;
var displayWord = [];
var guessesLeft = word.length + 2;
var yourGuesses = [];
var allGuesses = [];
var remainingLetters = word.length;


// displaying text to user by relating to html id
var resultText = document.getElementById('result');
var wordRevealText = document.getElementById('wordReveal');
var winsText = document.getElementById('wins');
var guessesLeftText = document.getElementById('guessesLeft');
var yourGuessesText = document.getElementById('lettersGuessed');
var displayWordText = document.getElementById('currentWord');


// functions that update values and display messages
function newWord() {
    word = words[Math.floor(Math.random() * words.length)];
}

function updateWord() {
    displayWordText.textContent = displayWord;
}

function gameResult() {
    resultText.textContent = result;
}

function revealWord() {
    wordRevealText.textContent = "The Word Was: " + word;
}

function updateWins() {
    winsText.textContent = wins;
}

function updateGuesses() {
    guessesLeftText.textContent = guessesLeft;
}

function updateYourGuesses() {
    yourGuessesText.textContent = yourGuesses;
}


// fills the index of the chosen word with underscores for ;placeholding'
for (i = 0; i < word.length; i++) {
    displayWord[i] = "_";
}


// function that loads the game
function loadGame() {
    updateWins();
    updateGuesses();
    updateWord();
}


// function that resets the game once you win or lose
function resetGame() {
    yourGuesses = [];
    allGuesses = [];
    displayWord = [];
    updateYourGuesses();
    updateWins();
    newWord();
    for (i = 0; i < word.length; i++) {
        displayWord[i] = "_";
    }
    console.log(word);
    remainingLetters = word.length;
    guessesLeft = word.length + 2;
    updateGuesses();
    updateWord();
}


// loads game
loadGame();


// pushing a key begins
document.onkeyup = function (event) {
    var userGuess = event.key;

    if (allGuesses.indexOf(userGuess) >= 0) {
        return;
    }

    allGuesses.push(userGuess);

    if (word.indexOf(userGuess) === -1) {
        yourGuesses.push(userGuess);
        guessesLeft--;
        updateGuesses();
        updateYourGuesses();
    }
    else {
        for (j = 0; j < displayWord.length; j++) {
            if (word[j] === userGuess) {
                displayWord[j] = userGuess;
                updateWord();
                remainingLetters--;
            }
        }
    }

    if (remainingLetters === 0) {
        result = "You Win!";
        wins++;
        gameResult();
        revealWord();
        resetGame();
    }

    if (guessesLeft === 0) {
        result = "You Lose!";
        gameResult();
        revealWord();
        resetGame();
    }
};