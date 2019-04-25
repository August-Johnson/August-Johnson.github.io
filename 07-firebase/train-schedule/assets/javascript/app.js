var config = {
    apiKey: "AIzaSyC_UXUkDA9oER3fuAsHATciP8eyfgNmkyI",
    authDomain: "gus-train-scheduler.firebaseapp.com",
    databaseURL: "https://gus-train-scheduler.firebaseio.com",
    projectId: "gus-train-scheduler",
    storageBucket: "",
    messagingSenderId: "334309145373"
};
firebase.initializeApp(config);
// variables
var database = firebase.database();
// variables stored in firebase
var name = "";
var destination = "";
var startTime = "";
var frequency = "";
// calculated variables, not stored in firebase
var nextArrival = "";
var minutesAway = "";
// function that adds the newly defined train into firebase
function addTrain() {
    var newTrain = {
        name: name,
        destination: destination,
        startTime: startTime,
        frequency: frequency
    }
    // pushing the new train object into the database
    database.ref().push(newTrain);
};
// function that handles the on child added event
function childAdded() {
    // looking for when a child element (new train object) is added
    database.ref().on("child_added", function (childSnapshot) {
        // setting the variables equal to the objects related property values
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainStartTime = childSnapshot.val().startTime;
        var trainFrequency = childSnapshot.val().frequency;
        /* 
        calculating the amount of time in minutes between now and the first start time, 
        and since the last train arrived. then using those values to help calculate the minutesAway and nextArrival time 
        */
        var timeDiff = moment().diff(moment(trainStartTime, "hh:mm A"), "minutes");
        // if the first train time is later than it currently is
        if (timeDiff <= -1) {
            nextArrival = trainStartTime;
            minutesAway = moment().diff(moment(trainStartTime, "hh:mm A"), "minutes");
            minutesAway = minutesAway - 1;
            minutesAway = minutesAway * -1;
            $('tbody').append(
                '<tr>'
                + '<td>' + trainName + '</td>'
                + '<td>' + trainDestination + '</td>'
                + '<td>' + trainFrequency + '</td>'
                + '<td>' + nextArrival + '</td>'
                + '<td>' + minutesAway + '</td>'
                + '</tr>')
        }
        else {
            var prevTrain = timeDiff % trainFrequency;
            // calculating the minutes away and next arrival time
            minutesAway = trainFrequency - prevTrain;
            nextArrival = moment().add(minutesAway, "minutes").format("hh:mm A");
            // adding the data to the table to display to users
            $('tbody').append(
                '<tr>'
                + '<td>' + trainName + '</td>'
                + '<td>' + trainDestination + '</td>'
                + '<td>' + trainFrequency + '</td>'
                + '<td>' + nextArrival + '</td>'
                + '<td>' + minutesAway + '</td>'
                + '</tr>')
        }
    });
}
/* 
function that will re-run the childAdded function -
therefore updating the current time and subsequently the nextArrival and minutesAway values, which will be displayed on the page
*/
function updateTimes() {
    setInterval(function () {
        $('tbody').empty();
        childAdded();
    }, 20 * 1000);
}
childAdded();
updateTimes();
// on submit button click, run the function
$('#submit-train').on('click', function () {
    name = $('#train-name').val().trim();
    destination = $('#train-destination').val().trim();
    startTime = moment($('#train-time').val().trim(), "HH:mm A").format("hh:mm A");
    frequency = $('#train-frequency').val().trim();
    // looking for any empty input field
    if (name !== "" && destination !== "" && startTime !== "" && frequency !== "") {
        addTrain();
        childAdded();
    }
    else {
        alert('You did not fill out the entire form!');
    }
});