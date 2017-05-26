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