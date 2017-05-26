//checking for link
console.log("hello world!");

// Initialize Firebase
var config = {
apiKey: "AIzaSyBnh07gxxbAVUGV9UO5MhayQcOBKU7vUvs",
authDomain: "traintimechoochoo-e73ba.firebaseapp.com",
databaseURL: "https://traintimechoochoo-e73ba.firebaseio.com",
projectId: "traintimechoochoo-e73ba",
storageBucket: "traintimechoochoo-e73ba.appspot.com",
messagingSenderId: "446470105732"
};

firebase.initializeApp(config);

// set firebase to variable
var database = firebase.database();

// storing input results as blank variables until assigned
var name;
var destination;
var trainTime;
var frequency;
var minutesAway;

// Function that runs when the submit button is pressed to add train info to firebase
$("#trainSubmit").on("click", function(event) {
	// Prevents the standard submit response
	event.preventDefault();
	// assigns value from input fields to variables and trim white space
	name = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	trainTime = $("#trainTime").val().trim();
	frequency = $("#frequency").val().trim();
	// pushes this information to firebase with these key value pairings:
	database.ref().push({
		name: name,
		destination: destination,
		trainTime: trainTime,
		frequency: frequency
	});
});

// Takes snapshot when new child is added to database:
database.ref().on("child_added", function(snapshot) {

	// prints this child's information to console to check:
	console.log(snapshot.val().name);
	console.log(snapshot.val().destination);
	console.log(snapshot.val().trainTime);
	console.log(snapshot.val().frequency);

	//clears out the input fields inside the form div
	$(".form-control").val("");

	// sets the current time
	var currentTime = moment();
	// logs the time to make sure it works
	console.log("time: " + moment(currentTime).format('HH:MM'));

	// Adds the snapshot event values and necessary html to the table on the page
	$("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + trainTime + "</td><td>" + frequency + "</td><td>" + minutesAway + "</td></tr>");
});

