// creating the Letter constructor
function Letter(letter) {
    this.letter = letter,
    // boolean value that defines if the letter has been guessed or not. starts as not guessed.
        this.letterGuessed = false,
        // if the letter hasn't been guessed, return the placeholder (in this case, an underscore). if the letter has been guessed, return the actual letter.
        this.displayLetter = function () {
            if (this.letterGuessed === false) {
                return "_";
            }
            else {
                return this.letter;
            }
        },
        // if the user correctly guesses the letter, switch the boolean value of that letter to true.
        this.updateLetter = function(userLetter) {
            if (userLetter === this.letter) {
                this.letterGuessed = true;
            }
        }
};
// exporting the Letter constructor
module.exports = Letter;