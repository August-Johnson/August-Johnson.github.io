// creating the Letter constructor
function Letter(letter) {
    this.letter = letter,
        // boolean value that defines if the letter has been guessed or not. starts as not guessed.
        this.letterGuessed = false,
        // if the letter hasn't been guessed, return the placeholder (in this case, an underscore). if the letter has been guessed, return the actual letter.
        this.displayLetter = function () {
            // added logic so it wouldn't count spaces inside the word as false, since you don't really guess spaces in hangman. (ex: "King of The Hill").
            if (this.letter === " ") {
                this.letterGuessed = true;
            }

            if (this.letterGuessed === false) {
                return "_";
            }
            else {
                return this.letter;
            }
        },
        // checks whether or not the letter is guessed or not. if it remains as false or is switched to true.
        this.letterCheck = function (userLetter) {
            if (userLetter.toLowerCase() === this.letter || userLetter.toUpperCase() === this.letter) {
                this.letterGuessed = true;
            }
        }
};
// exporting the Letter constructor
module.exports = Letter;