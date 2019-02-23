// variables
var randomNumber = 0;
var wins = 0;
var losses = 0;
var userTotalScore = 0;
var possibleCrystalValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var crystalValuesArray = [];
var crystalValue = 0;

// function that generates the random number the player needs to match
function getRandomNumber() {
    randomNumber = Math.floor(Math.random() * 101) + 19;
}

// randomly changing the values of the crystalValuesArray
function createCrystalValues() {
    for (i = 0; i < 4; i++) {
        crystalValuesArray.push(possibleCrystalValues[Math.floor(Math.random() * possibleCrystalValues.length)]);
    }
}

// resets all values that dont need to be saved for future 'rounds'
function resetGame() {
    crystalValuesArray = [];
    crystalValue = 0;
    userTotalScore = 0;
    getRandomNumber();
    createCrystalValues();
    assignCrystalValues();
    $('.total-score').text(userTotalScore);
    $('.wins').text(wins);
    $('.losses').text(losses);
    $('.number-box').text(randomNumber);
}

// calling the function resetGame() to set up the first 'round'
resetGame();
console.log(crystalValuesArray);

// assigning the crystals their values
function assignCrystalValues() {
$('.ruby').attr("data-crystal-value", crystalValuesArray[0]);
$('.diamond').attr("data-crystal-value", crystalValuesArray[1]);
$('.black-crystal').attr("data-crystal-value", crystalValuesArray[2]);
$('.orange-crystal').attr("data-crystal-value", crystalValuesArray[3]);
}

$(document).ready(function () {

    // clicking a crystal will start the game and keep track of your scores
    $('.crystal-image').click(function () {

        crystalValue = $(this).attr("data-crystal-value");
        crystalValue = parseInt(crystalValue);
        userTotalScore += crystalValue;
        $('.total-score').text(userTotalScore);

        // when the player wins
        if (userTotalScore === randomNumber) {
            wins++
            $('.game-results').text("You win!");
            resetGame();
        }
        // when the player loses
        if (userTotalScore > randomNumber) {
            losses++
            $('.game-results').text("You lose!");
            resetGame();
        }
    });


});