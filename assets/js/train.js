   // Initialize Firebase
   var config = {
    apiKey: "AIzaSyBaJLLCnc8mKbR5XuMouUawqbTkFMpO2iw",
    authDomain: "trainscheduler-isw.firebaseapp.com",
    databaseURL: "https://trainscheduler-isw.firebaseapp.com/",
    projectId: "trainscheduler-isw",
    storageBucket: "trainscheduler-isw.appspot.com",
    messagingSenderId: "174165369354"
  };

  

  firebase.initializeApp(config);

  var database = firebase.database();
	var trainName ="";
  var destination = "";
  var arrival = 0;
  var frequency = 0;
  var trainData = "";
  var destinationData = "";
  var arrivalData = 0;
  var frequencyData = 0;
  var arrivalData = 0;
  var nextTrain = 0;
  var  nextTrainFormatted = 0 ;

  // add on click funtion to add values
	$("#addUser").on("click",function() {
	 event.preventDefault();
   
	 trainName = $("#name-input").val().trim();
	 destination = $("#destination-input").val().trim();
	 arrival = $("#traintime-input").val().trim();
	 frequency = $("#frequency-input").val().trim();
   
	 database.ref().push({
 	 trainName : trainName,
 	 destination : destination,
 	 arrival : arrival,
   frequency : frequency
   
   });
   });

	database.ref().on("child_added", function(childSnapshot, prevChildKey){
	console.log(childSnapshot.val());
	 trainData = childSnapshot.val().trainName;
	 destinationData = childSnapshot.val().destination;
	 frequencyData = childSnapshot.val().frequency;
	 arrivalData = childSnapshot.val().arrival;	
 	
  // moment.js time converted and next arrival time calculated
  firstTimeConverted = moment(arrival, "hh:mm").subtract(1, "years");
  currentTime = moment();
  diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  tRemainder = diffTime % frequency;
  minutesTillTrain = frequency - tRemainder;
  nextTrain = moment().add(minutesTillTrain, "minutes");
  nextTrainFormatted = moment(nextTrain).format("hh:mm");
  // appending the values to the browser
 $("#table > tbody").append("<tr><td>" + trainData + "</td><td>" + destinationData + "</td><td>" +
   arrivalData + "</td><td>" + frequencyData + "</td><td>"  + nextTrainFormatted +  "</td></tr>");
  }, function (errorObject){
    console.log(errorObject.code);
  });