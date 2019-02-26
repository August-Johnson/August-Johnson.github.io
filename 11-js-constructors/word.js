var Letter = require("./letters");

function Word(word) {
    this.word = word,
    // array that holds the letter objects from the Letter constructor.
        this.letters = [],
        // creates a new Letter object from each letter in the selected word.
        this.lettersArr = function () {
            for (i=0; i < this.word.length; i++) {
                var newLetter = new Letter(this.word[i]);
                this.letters.push(newLetter);
            }
        },
        // prints the word string to the console. testArr stores the letters or the placeholders as one array for easier calling.
        this.displayWord = function () {
            var testArr = [];
            for (i=0; i < this.letters.length; i++) {
                testArr.push(this.letters[i].displayLetter());
            }
            console.log(testArr.join(" "));
        },
        // checks whether or not the letter is guessed or not. if it remains as false or is switched to true.
        this.letterCheck = function(guess) {
            for (i=0; i < this.letters.length; i++) {
                this.letters[i].updateLetter(guess);
            }
            // calling displayWord again so it reprints the updated word.
            newWord.displayWord();
        }
};
// testing calls and functions
var newWord = new Word("Hello");
newWord.lettersArr();
console.log(newWord.letters.length);
newWord.displayWord();
console.log(newWord.letters);

newWord.letterCheck("o");

module.exports = Word;