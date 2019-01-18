// API key:  uu7UPnnMb9znbuc9OJVO6OnShpQ6EPg9

// create array of strings that hold the animal (or other theme) names
var topics = ["cats", "dogs", "hedgehogs", "owls", "fox", "panda", "axolotl", "bird", "lizard", "frog", "turtle", "snake", "eagle", "lion", "spider", "ferret"];

var newButton;

$(document).ready(function () {


    // function that creates a button for every string inside of the array
    function displayButtons() {
        $('.buttons-container').empty();
        for (i = 0; i < topics.length; i++) {
            $('.buttons-container').append('<button class="btn btn-primary added-button" value="' + topics[i] + '">' + topics[i] + '</button>');
            console.log(topics[i].valueOf());
        }
    }

    // push user input into topics array
    function addButton() {
        topics.push(newButton);
    }

    // display the initial button selection from the start
    displayButtons();

    // pressing the enter key adds the button too
    $('input').keyup(function(event) {
        if (event.keyCode === 13) {
            $('.add-button').click();
        }
    });

    // user enters animal name and clicks submit, push the value to the array of strings (possibly use JSON.stringify?)
    $('.add-button').click(function (event) {
        event.preventDefault();
        newButton = $('input').val();
        newButton = newButton.trim();

        // checks if the submit box isn't just white-space and that a button of the same 'name' doesn't already exist
        if (newButton !== "" && topics.indexOf(newButton) === -1) {
            addButton();
            displayButtons();
            $('input').val('');
            $('.user-alert').empty();
        }
        // tells the user if a button of the same name already exists
        else if (topics.indexOf(newButton) !== -1) {
            $('.user-alert').html('<b>(A button already exists with that name!)</b>');
        }
        // tells the user if they tried to input nothing / just white-space
        else if (newButton === "") {
            $('.user-alert').html('<b>(You did not enter anything! Try again)</b>');
        }
    });
// when user hits one of the animal buttons, call the API or AJAX function and display a certain amount of results
    $(document).on('click', '.added-button', function() {
        var search = $(this).val();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=uu7UPnnMb9znbuc9OJVO6OnShpQ6EPg9&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){

            var results = response.data;
            console.log(results);

            for (i=0; i < results.length; i++) {
                var gifColumn = $('<div class=col-4>');
                var gifRating = $('<p>').text(results[i].rating);

                var gifImage = $('<img>');
                gifImage.attr('src', results[i].images.fixed_height_still.url);

                gifColumn.append(gifRating);
                gifColumn.append(gifImage);
                $('.gif-container').prepend(gifColumn);
            }
        });
    });
// BONUS
// allow user to request additional gifs to be added to the page (add 10 more), make sure it doesnt replace the current gifs
// list other gif data in a clean and readable way (title, tags, etc) for each gif
// add a 1 click download button
});