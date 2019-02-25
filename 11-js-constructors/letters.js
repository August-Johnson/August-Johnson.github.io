var inquirer = require("inquirer");

var Letter = function () {
    this.letterString = "",
        this.letterGuessed = false,
        this.displayLetter = function () {
            if (this.letterGuessed === false) {
                return "_";
            }
            else {
                return this.letterString;
            }
        }
};

var newLetter = new Letter("Hello");
newLetter.displayLetter();