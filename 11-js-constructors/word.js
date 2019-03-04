var Letter = require("./letters");
// Creating the Word constructor.
function Word(word) {
    this.word = word,
        // User gets 8 guesses.
        this.guessesLeft = 8,
        // Array that holds the letter objects from the 'Letter' constructor.
        this.letters = [],
        // Creates a new Letter object from each letter in the selected word.
        this.lettersArr = function () {
            for (i = 0; i < this.word.length; i++) {
                var newLetter = new Letter(this.word[i]);
                this.letters.push(newLetter);
            }
        },
        // Function that prints the word to the console.
        this.displayWord = function () {
            var lettersArr = [];
            for (i = 0; i < this.letters.length; i++) {
                lettersArr.push(this.letters[i].displayLetter());
            }
            console.log(lettersArr.join(" "));
        },
        // Function that runs the 'letterCheck' function for the user's guess on each letter in the current word.
        this.userGuess = function (guess) {
            for (i = 0; i < this.letters.length; i++) {
                this.letters[i].letterCheck(guess);
            }
            // If their guess is wrong, the guesses go down by one and they are alerted of such.
            if (this.word.toLowerCase().indexOf(guess) === -1) {
                this.guessesLeft--;
                console.log("\nINCORRECT! YOU HAVE " + this.guessesLeft + " GUESSES REMAINING\n");
            }
            else {
                console.log("\nCORRECT\n");
            }
            // Calling displayWord again so it reprints the (possibly) updated word.
            this.displayWord();
        }
};
// Exporting the Word constructor
module.exports = Word;