$(document).ready(function () {
    // variables
    var questions = [];
    var timerNumber = 60;
    var correct = 0;
    var wrong = 0;
    // the quiz will have 8 questions total so it starts with 8 unanswered
    var unanswered = 8;

    // functions
    // display start game function
    function gameSetUp() {
        $('.display-screen').html('<button>START</button>');
    };

    // load quiz on click
    $('<button>').on('click', function() {
        
    });
    

    gameSetUp();

    // when user clicks start, display quiz and timer

    // start timer countdown when user presses start button

    // storing the users answers

    // checking and scoring users answers

    // right, wrong and unanswered are scored/evaluated

    // when user clicks done or if the time runs out display the results
});