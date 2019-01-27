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

// trains array variable
var trains = [];

// empty object to store the new train data inside
var newTrain = {
    name: "",
    destination: "",
    startTime: "",
    frequency: ""
};

// calculated data, not stored in firebase
var nextArrival = [];
var minutesAway = [];

// submit button on-click event
$('#submit-train').on('click', function (event) {
    event.preventDefault();

    name = $('#train-name').val().trim();
    destination = $('#train-destination').val().trim();
    startTime = $('#train-time').val().trim();
    startTime = moment(startTime, "HH:mm A").format("hh:mm A");
    frequency = $('#train-frequency').val().trim();

    // checking if any of the inputs fields are empty
    if (name !== "" && destination !== "" && startTime !== "" && frequency !== "") {

        newTrain.name = name;
        newTrain.destination = destination;
        newTrain.startTime = startTime;
        newTrain.frequency = frequency;

        trains.push(newTrain);


        // storing the trains array value to firebase
        database.ref().set({
            trains: trains,
        });

        $('#train-name').val('');
        $('#train-destination').val('');
        $('#train-time').val('');
        $('#train-frequency').val('');

    }
    // if any input fields are empty, alert the user they haven't filled everything out
    else {
        console.log("Please finish filling out the form!");
    }

    // calculating next arrival and formatting it
    // nextArrival.push(moment(startTime, "hh:mm A").add(frequency, "m"));
    // nextArrival = moment(nextArrival).format("hh:mm A");
    // console.log(nextArrival);


    // getting the minutes away

    // resets the input fields to empty


});
// adding train to the table / list
// change back to .on('child_added'), later also childSnapshot

database.ref().on("value", function (snapshot) {
    trains = snapshot.val().trains;
    //     $('tbody').html('<tr>'
    //         + '<td>' + snapshot.val().name + '</td>'
    //         + '<td>' + snapshot.val().destination + '</td>'
    //         + '<td>' + snapshot.val().frequency + '</td>'
    //         + '<td>' + nextArrival + '</td>'
    //         + '<td>' + minutesAway + '</td>'
    //         + '</tr>');
});