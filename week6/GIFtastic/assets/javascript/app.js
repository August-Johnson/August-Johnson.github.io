// my API key:  uu7UPnnMb9znbuc9OJVO6OnShpQ6EPg9
// create array of strings that hold the animal (or other theme) names
var topics = ["cats", "dogs", "hedgehogs", "owls", "fox", "panda", "axolotl", "bird", "lizard", "frog", "turtle", "snake", "eagle", "lion", "spider", "ferret"];

var newButton;
var search;
var state;
var gifNumber = 10;

$(document).ready(function () {

    // function that creates a button for every string inside of the array
    function displayButtons() {
        $('.buttons-container').empty();
        for (i = 0; i < topics.length; i++) {
            $('.buttons-container').append('<button class="btn btn-info added-button" value="' + topics[i] + '">' + topics[i] + '</button>');
        }
    }

    // push user input into topics array
    function addButton() {
        topics.push(newButton);
    }

    // function for displaying the gifs based on the button clicked. starts off as a still image by default
    function displayGifs() {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=uu7UPnnMb9znbuc9OJVO6OnShpQ6EPg9&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;

            for (i = 0; i < results.length; i++) {
                var gifColumn = $('<div class=col-4><br />');
                var rating = results[i].rating;
                rating = rating.toUpperCase();
                var gifRating = $('<p class="card-header text-center">').text('Rating: ' + rating);

                var gifImage = $('<img>');
                // giving the img data for still and animated gif url
                gifImage.attr('src', results[i].images.fixed_height_still.url);
                gifImage.attr('gif-still', results[i].images.fixed_height_still.url);
                gifImage.attr('gif-animate', results[i].images.fixed_height.url);
                gifImage.attr('gif-state', 'still');


                gifColumn.append(gifRating);
                gifColumn.append(gifImage);
                $('.gif-container').prepend(gifColumn);
            }
        });
    }

    // adds 10 more gifs. does not replace current ones on screen already
    function addMoreGifs() {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=uu7UPnnMb9znbuc9OJVO6OnShpQ6EPg9&offset=" + gifNumber + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            var results = response.data;

            for (i = 0; i < results.length; i++) {
                var gifColumn = $('<div class=col-4><br />');
                var rating = results[i].rating;
                rating = rating.toUpperCase();
                var gifRating = $('<p class="card-header text-center">').text('Rating: ' + rating);

                var gifImage = $('<img>');
                // giving the img data for still and animated gif url
                gifImage.attr('src', results[i].images.fixed_height_still.url);
                gifImage.attr('gif-still', results[i].images.fixed_height_still.url);
                gifImage.attr('gif-animate', results[i].images.fixed_height.url);
                gifImage.attr('gif-state', 'still');

                gifColumn.append(gifRating);
                gifColumn.append(gifImage);
                $('.gif-container').prepend(gifColumn);
            }
        });
    }

    // display the initial button selection from the start
    displayButtons();

    // pressing the enter key adds the button too
    $('input').keyup(function (event) {
        if (event.keyCode === 13) {
            $('.add-button').click();
        }
    });

    // user enters animal name and clicks submit, push the value to the array of strings
    $('.add-button').click(function (event) {
        event.preventDefault();
        newButton = $('input').val();
        newButton = newButton.toLowerCase();
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

    // when user hits one of the animal buttons, call the displayGifs function
    $(document).on('click', '.added-button', function () {
        search = $(this).val();
        displayGifs();
        gifNumber = 10;
        $('.more-results').html('<button class="see-more btn btn-success">Click for more!</button>');
    });

    // when user clicks on an image, it will animate it or make it still based on what its current state is
    $(document).on('click', 'img', function () {
        state = $(this).attr('gif-state');
        // if the gif isn't animated, animate it
        if (state === 'still') {
            $(this).attr('src', $(this).attr('gif-animate'));
            $(this).attr('gif-state', 'animate');
        }
        // if the gif is animated, make it still
        else {
            $(this).attr('src', $(this).attr('gif-still'));
            $(this).attr('gif-state', 'still');
        }
    });
    // BONUS
    // allow user to request additional gifs to be added to the page (add 10 more), make sure it doesnt replace the current gifs
    $(document).on('click', '.see-more', function() {
        addMoreGifs();
        gifNumber += 10;
    });
});