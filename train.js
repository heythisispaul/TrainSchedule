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
//uses moment js to set current time
var now = moment();
// logs the time to make sure it works
console.log("time: " + now.format('MMM Do YYYY, h:mm:ss: a'));


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

	// time calculations (used 7.3 trainexample.html as a guide from class repository)
	// logs the time to make sure it works
	console.log("time: " + now.format('HH:MM'));

	var firstTime = moment(snapshot.val().trainTime, 'hh:mm').subtract(1, "years");

	var diffTime = moment().diff(moment(firstTime), "minutes");

	var remainder = diffTime % frequency;

	var minutesUntilTrain = frequency - remainder;

	var nextTrain = moment().add(minutesUntilTrain, "minutes");

	// Adds the snapshot event values and necessary html to the table on the page
	$("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minutesUntilTrain + "</td></tr>");
});

//I unforuntunately have run out of time but known bugs I could not resolve:
// 1. Next Arrival is clearly not calculating correctly.
// 2. The only data that pulls correctly from firebase after refreshing is the name. I'm not sure why that happens.

