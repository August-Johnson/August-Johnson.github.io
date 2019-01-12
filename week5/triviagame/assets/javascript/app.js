$(document).ready(function () {
    // list of questions
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

    console.log(questions.length);

    // timer starts with 60 seconds
    var timerNumber = 60;
    var intervalId;

    // right and wrong answer counter variables
    var userAnswer = "";
    var right = 0;
    var wrong = 0;
    // the quiz will have 7 questions total so it starts with 7 unanswered
    var unAnswered = 7;
    
    // functions
    // timer start function
    function startTimer() {
        intervalId = setInterval(decrement, 1000);
    }

    // displays results to user
    function showResults() {
        clearInterval(intervalId);

        $('.display-screen').html(
            '<h3>All Done!</h3>'
            + '<div class="right">Correct Answers: ' + right + '</div>'
            + '<div class="wrong">Incorrect Answers: ' + wrong + '</div>'
            + '<div class="unAnswered">Unanswered: ' + unAnswered + '</div>'
        );
    }

    // counting down, when it reaches 0 - run showResults function
    function decrement() {
        timerNumber--;
        $('.timer').html(timerNumber);

        if (timerNumber === 0) {
            showResults();
        }
    }

    // displays the quiz to user
    function questionLoad() {
        var outPut = [];
        var answers;

        for (i = 0; i < questions.length; i++) {

            answers = [];

            for (letter in questions[i].answers) {
                answers.push(
                    '<label>'
                    + '<input type="radio" name="question ' + i + '" value="' + letter + '">'
                    + letter + ': '
                    + questions[i].answers[letter]
                    + '</label>');
            }
            outPut.push(
                '<div class="question">' + questions[i].question + '</div>' + '<div class="answers">' + answers.join('') + '</div>'
            );
        }
        $('.display-screen').append(outPut);
    }

    // when user clicks start, display quiz and timer
    // load quiz on button click
    $('.start').click(function () {
        $('.display-screen').html('<h2>Time remaining: ' + '<span class="timer">' + timerNumber + '</span>' + '</h2>');
        startTimer();
        questionLoad();

    });

    // start timer countdown when user presses start button

    // storing the users answers

    // checking and scoring users answers

    // right, wrong and unanswered are scored/evaluated

    // when user clicks done or if the time runs out display the results
});