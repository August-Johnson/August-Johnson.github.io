var config = {
    apiKey: "AIzaSyC_UXUkDA9oER3fuAsHATciP8eyfgNmkyI",
    authDomain: "gus-train-scheduler.firebaseapp.com",
    databaseURL: "https://gus-train-scheduler.firebaseio.com",
    projectId: "gus-train-scheduler",
    storageBucket: "",
    messagingSenderId: "334309145373"
};

firebase.initializeApp(config);

var database = firebase.database();

// submit button on-click event
$('#submit-train').on('click', function (event) {
    event.preventDefault();

    // setting the variables equal to the related input field values
    var name = $('#train-name').val().trim();
    var destination = $('#train-destination').val().trim();
    var startTime = moment($('#train-time').val().trim(), "HH:mm A").format("hh:mm A");
    var frequency = $('#train-frequency').val().trim();

    // current time in preferred format
    var currentTime = moment().format("hh:mm A");
    console.log(currentTime);

    // checking if any of the inputs fields are empty
    if (name !== "" && destination !== "" && startTime !== "" && frequency !== "") {

        var newTrain = {
            train: name,
            place: destination,
            firstTime: startTime,
            frequent: frequency
        };

        // adding the new train we just passed the values to, over to firebase
        database.ref().push(newTrain);

        // clearing the input fields back to 'blank' or white-space
        $('#train-name').val('');
        $('#train-destination').val('');
        $('#train-time').val('');
        $('#train-frequency').val('');
    }
    // if any input fields are empty, alert the user they haven't filled everything out
    else {
        console.log("Please finish filling out the form!");
    }
});

// giving variables the value of the firebase objects for easier calling
database.ref().on("child_added", function (childSnapshot) {
    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().place;
    var startTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequent;

    // time difference between now and the first train time in minutes
    var timeDiff = moment().diff(moment(startTime, "hh:mm A"), "minutes");

    // the amount of minutes that have passed since the last train arrived. 
    var prevTrain = timeDiff % frequency;

    // using that amount to calculate the minutes away and next arrival
    var minutesAway = frequency - prevTrain;
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm A");

    // adding it to the table on the users end
    $('tbody').append('<tr>'
        + '<td>' + trainName + '</td>'
        + '<td>' + destination + '</td>'
        + '<td>' + frequency + '</td>'
        + '<td>' + nextArrival + '</td>'
        + '<td>' + minutesAway + '</td>'
        + '</tr>');
});