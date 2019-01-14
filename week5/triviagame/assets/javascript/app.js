// object array of questions
var questions = [
    {
        question: "Which ocean is the largest? ",
        answers: {
            a: 'The Atlantic Ocean',
            b: 'The Indian Ocean',
            c: 'The Pacific Ocean',
        },
        correctAnswer: 'c',
        correctAnswerString: 'The Pacific Ocean'
    },
    {
        question: "What country is larger?",
        answers: {
            a: 'China',
            b: 'Russia',
            c: 'India',
        },
        correctAnswer: 'b',
        correctAnswerString: 'Russia'
    },
    {
        question: "In what year did America become an independent country?",
        answers: {
            a: '1790',
            b: '1800',
            c: '1776',
        },
        correctAnswer: 'c',
        correctAnswerString: '1776'
    },
    {
        question: "How many years did the Roman Empire last?",
        answers: {
            a: '507',
            b: '461',
            c: '500',
        },
        correctAnswer: 'a',
        correctAnswerString: '507'
    },
    {
        question: "Which ruler transitioned Rome from a Republic to an Empire?",
        answers: {
            a: 'Augustus',
            b: 'Nero',
            c: 'Julius Caesar',
        },
        correctAnswer: 'a',
        correctAnswerString: 'Augustus'
    },
    {
        question: "What did the Romans NOT come up with?",
        answers: {
            a: 'Air conditioning',
            b: 'The first fire-arms',
            c: 'A designated firefighting force',
        },
        correctAnswer: 'b',
        correctAnswerString: 'The First fire-arms'
    },
    {
        question: "What percentage of Roman Emperors were assassinated while in power?",
        answers: {
            a: '20%',
            b: '50%',
            c: '4%',
        },
        correctAnswer: 'a',
        correctAnswerString: '20%'
    }
];

console.log(questions[0].answers["a"].valueOf());


// timer starts with 60 seconds
var timerNumber = 15;
var intervalId;

// var checked is defined in the global scope (I think) for easier management 
var checked = undefined;

// var that stores the users answer
var userAnswer = undefined;

// right and wrong answer counter variables
var right = 0;
var wrong = 0;

// setting unanswered to originally be the amount of questions in the quiz
var unAnswered = questions.length;

// var i is defined globally for easier use and reference for it
var i = 0;

// document ready
$(document).ready(function () {
    // functions
    // timer start function
    function startTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    // counting down, when it reaches 0, goes to next question if there is one
    function decrement() {
        timerNumber--;
        $('.timer').html(timerNumber);

        // if no answer is selected when the time runs out, it passes undefined to userAnswer
        if (timerNumber === 0) {
            userAnswer = checked;
            nextQuestion();
        }
    }

    // stops the timer countdown
    function stopTimer() {
        clearInterval(intervalId);
    }


    function displayTimer() {
        $('.timerArea').html('<h2>Time remaining: ' + '<span class="timer">' + timerNumber + '</span>' + '</h2>');
    }

    // checks if there are more questions, if so - loads next question or ends game
    function nextQuestion() {
        i++;
        if (i >= questions.length) {
            stopTimer();
            showResults();
        }
        else {
            checked = undefined;
            questionLoad();
            timerNumber = 15;
            displayTimer();
            clearInterval(intervalId);
            startTimer();
        }
    }

    // shows the answerCompare for 3 seconds
    function compareScreen() {
        timerNumber = 3;
        $('.timerArea').empty();
        clearInterval();
        startTimer();
    }

    // displays to the user if they answered correctly
    function answerCompare() {
        if (userAnswer === questions[i].correctAnswer) {
            right++;
            unAnswered--;
            $('.display-screen').html("<h3>Correct!</h3>");
            compareScreen();
        }
        else if (userAnswer === undefined) {
            $('.display-screen').html('<h3>You chose nothing!</h3>' + '<div class="revealAnswer">The correct answer was: ' + questions[i].correctAnswerString);
            compareScreen();
        }
        else {
            wrong++;
            unAnswered--;
            $('.display-screen').html('<h3>Wrong!</h3>' + '<div class="revealAnswer">The correct answer was: ' + questions[i].correctAnswerString);
            compareScreen();
        }
    }

    // displays the quiz to user
    function questionLoad() {
        var output = [];
        var answers = [];
        for (letter in questions[i].answers) {
            answers.push(
                '<label>'
                + '<input type="radio" name="question" value="' + letter + '">'
                + questions[i].answers[letter]
                + '</label>');
        }
        output.push('<div class="question">'
            + questions[i].question
            + '</div>'
            + '<div class="answer">'
            + answers.join('')
            + '</div>');

        $('.display-screen').html(output);
        $('.display-screen').append('<button class="done" type="submit">Sumbit</button>');
    }

    // displays results to user
    function showResults() {
        clearInterval(intervalId);

        $('.timerArea').html('<h2>All Done!</h2>');
        $('.display-screen').html(
            '<h3>Your Results: </h3>'
            + '<div class="right">Correct Answers: ' + right + '</div>'
            + '<div class="wrong">Incorrect Answers: ' + wrong + '</div>'
            + '<div class="unAnswered">Unanswered: ' + unAnswered + '</div>'
        );
    }

    // when user clicks start, display quiz and timer
    $('.start').click(function () {
        displayTimer();
        startTimer();
        questionLoad();
    });

    // when user clicks an answer choice, pass its value to var checked
    $(document).on('click', 'input', function () {
        checked = $(this).val();
        console.log($(this).val());
    });

    // when user clicks submit button, pass the checked value to equal userAnswer
    $(document).on('click', '.done', function () {
        userAnswer = checked;
            answerCompare()
    });
});