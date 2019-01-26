var config = {
    apiKey: "AIzaSyC_UXUkDA9oER3fuAsHATciP8eyfgNmkyI",
    authDomain: "gus-train-scheduler.firebaseapp.com",
    databaseURL: "https://gus-train-scheduler.firebaseio.com",
    projectId: "gus-train-scheduler",
    storageBucket: "",
    messagingSenderId: "334309145373"
};

firebase.initializeApp(config);

// initializing variables
var database = firebase.database();

var name = "";
var destination = "";
var startTime = "";
var frequency = "";

// calculated data, not stored in firebase
var nextArrival = "";
var minutesAway = "";


// submit button on-click event
$('#submit-train').on('click', function (event) {
    event.preventDefault();

    name = $('#train-name').val().trim();
    destination = $('#train-destination').val().trim();
    startTime = $('#train-time').val().trim();
    frequency = $('#train-frequency').val().trim();
    // ------------------------------------------------------------ 

    // getting the start time into the right format
    startTime = moment(startTime, "HH:mm A").format("hh:mm A");
    console.log(startTime);

    // calculating next arrival and formatting it
    nextArrival = moment(startTime, "hh:mm A").add(frequency, "m");
    nextArrival = moment(nextArrival).format("hh:mm A");
    console.log(nextArrival);

    // getting the minutes away




    database.ref().push({
        name: name,
        destination: destination,
        startTime: startTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // resets the input fields to empty
    $('#train-name').val('');
    $('#train-destination').val('');
    $('#train-time').val('');
    $('#train-frequency').val('');

});
// adding train to the table / list
database.ref().on('child_added', function (childSnapshot) {
    $('tbody').append('<tr>'
        + '<td>' + name + '</td>'
        + '<td>' + destination + '</td>'
        + '<td>' + frequency + '</td>'
        + '<td>' + nextArrival + '</td>'
        + '<td>' + minutesAway + '</td>'
        + '</tr>');
});