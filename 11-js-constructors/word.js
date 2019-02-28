var Letter = require("./letters");

function Word(word) {
    this.word = word,
        // array that holds the letter objects from the Letter constructor.
        this.letters = [],
        // array that holds only the letter value for each letter in the word. used as reference for an incorrect guess
        this.lettersTracker = [],
        // creates a new Letter object from each letter in the selected word.
        this.lettersArr = function () {
            for (i = 0; i < this.word.length; i++) {
                var newLetter = new Letter(this.word[i]);
                this.letters.push(newLetter);
            }
            for (i = 0; i < this.letters.length; i++) {
                this.lettersTracker.push(this.letters[i].letter.toLowerCase());
            }
        },
        // prints the word string to the console. testArr stores the letters or the placeholders as one array for easier calling.
        this.displayWord = function () {
            var testArr = [];
            for (i = 0; i < this.letters.length; i++) {
                testArr.push(this.letters[i].displayLetter());
            }
            console.log(testArr.join(" "));
        },
        // function that runs the letterCheck function for the user's guess on each letter in the current word.
        this.userGuess = function (guess) {
            for (i = 0; i < this.letters.length; i++) {
                this.letters[i].letterCheck(guess);
            }
            // if (this.guessesLeft > 0) {
                if (this.lettersTracker.indexOf(guess.toLowerCase()) === -1) {
                    // this.guessesLeft--;
                    // console.log("\nINCORRECT! YOU HAVE " + this.guessesLeft + " GUESSES LEFT\n");
                    console.log("WRONG");
                }
                // calling displayWord again so it reprints the (possibly) updated word.
                this.displayWord();
            // }
        }
};
// testing calls and functions
// var newWord = new Word("Hello");
// var newWord = new Word("King of The Hill");
// newWord.lettersArr();
// console.log(newWord.letters.length);
// newWord.displayWord();
// console.log(newWord.letters);

// newWord.userGuess("o");
// newWord.userGuess("H");
// newWord.userGuess("L");
// newWord.userGuess("k");
// newWord.userGuess("t");
// newWord.userGuess("e");
// newWord.userGuess("i");
// newWord.userGuess("z");
// exporting the Word constructor
module.exports = Word;