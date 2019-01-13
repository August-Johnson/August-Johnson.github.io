// object array of questions
var questions = [
    {
        question: "Which ocean is the largest? ",
        answers: {
            a: 'The Atlantic Ocean',
            b: 'The Indian Ocean',
            c: 'The Pacific Ocean',
        },
        correctAnswer: 'c'
    },
    {
        question: "What country is larger?",
        answers: {
            a: 'China',
            b: 'Russia',
            c: 'India',
        },
        correctAnswer: 'b'
    },
    {
        question: "In what year did America become an independent country?",
        answers: {
            a: '1790',
            b: '1800',
            c: '1776',
        },
        correctAnswer: 'c'
    },
    {
        question: "How many years did the Roman Empire last?",
        answers: {
            a: '507',
            b: '461',
            c: '500',
        },
        correctAnswer: 'a'
    },
    {
        question: "Which ruler transitioned Rome from a Republic to an Empire?",
        answers: {
            a: 'Augustus',
            b: 'Nero',
            c: 'Julius Caesar',
        },
        correctAnswer: 'a'
    },
    {
        question: "What did the Romans NOT come up with?",
        answers: {
            a: 'Air conditioning',
            b: 'The first fire-arms',
            c: 'A designated firefighting force',
        },
        correctAnswer: 'b'
    },
    {
        question: "How many Roman Emperors were assassinated while in power?",
        answers: {
            a: '20%',
            b: '50%',
            c: '4%',
        },
        correctAnswer: 'a'
    }
];
// timer starts with 60 seconds
var timerNumber = 10;
var intervalId;

// var checked is defined in the global scope (I think)
var checked = undefined;

// array that stores the users answers and the quiz progresses
var userAnswers = [];

// right and wrong answer counter variables
var right = 0;
var wrong = 0;

// the quiz will have 7 questions total so it starts with 7 unanswered and will decrease with each answered question
var unAnswered = 7;

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

        // if no answer is selected when the time runs out, it passes undefined to the userAnswers array
        if (timerNumber === 0) {
            userAnswers.push(checked);
            nextQuestion();
        }
    }

    // stops the timer countdown
    function stopTimer() {
        clearInterval(intervalId);
    }

    // checks if there are more questions, if so - loads next question or ends game
    function nextQuestion() {
        i++;
        if (i >= questions.length) {
            showResults();
        }
        else {
            checked = undefined;
            questionLoad();
            timerNumber = 10;
            $('.timer').html(timerNumber);
            clearInterval(intervalId);
            startTimer();
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

        for (i=0;i<userAnswers.length;i++) {
            if (userAnswers[i] === questions[i].correctAnswer) {
                right++;
                unAnswered--;
            }
            else if (userAnswers[i] === undefined) {
            }
            else {
                wrong++;
                unAnswered--;
            }
        }

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
        $('.timerArea').html('<h2>Time remaining: ' + '<span class="timer">' + timerNumber + '</span>' + '</h2>');
        startTimer();
        questionLoad();
    });

    // when user clicks an answer choice, pass its value to var checked
    $(document).on('click', 'input', function () {
        checked = $(this).val();
        console.log($(this).val())
    });

    // when user clicks submit button, pass var checked value into userAnswer array
    $(document).on('click', '.done', function () {
        userAnswers.push(checked);
        console.log(userAnswers);
        nextQuestion();
    });

    // checking and scoring users answers

    // right, wrong and unanswered are scored/evaluated

    // when user clicks done or if the time runs out display the results
});