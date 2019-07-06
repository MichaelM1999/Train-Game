var firebaseConfig = {
    apiKey: "AIzaSyB7ySPEV0gp6qFYWi0v_daSWIaAQbpOuh8",
    authDomain: "newproject-be903.firebaseapp.com",
    databaseURL: "https://newproject-be903.firebaseio.com",
    projectId: "newproject-be903",
    storageBucket: "newproject-be903.appspot.com",
    messagingSenderId: "213280593884",
    appId: "1:213280593884:web:36cc06648062fc8a"
  };

  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();

console.log("HEYU")

  let name = "";
  let destination = "";
  let time = "";
  let frequency = "";

  $('#submit').on('click', function(event){
      console.log("YO")
      event.preventDefault();
      
      name = $('#name').val().trim();
      destination = $('#destination').val().trim();
      time = $('#time').val().trim();
      frequency = $('#frequency').val().trim();

      console.log(name);


    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,

    // clear
      
    });
    $("#name").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");
});
database.ref().on('child_added', function(childSnapshot){

    let nextArr;
    // let minAway;
    const timenew = moment(childSnapshot.val().time, "hh:mm");
    let differenttime = moment().diff(moment(timenew), "minutes");
    let leftovertime = differenttime % childSnapshot.val().frequency;
    let minAway = childSnapshot.val().frequency - leftovertime;
    let nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");
    const trainName = childSnapshot.val().name;
    const destination = childSnapshot.val().destination;
    const frequency = childSnapshot.val().frequency;

    // console.log(trainName);
    // console.log(destination);
    // console.log(time);
    // console.log(frequency);
  //   let today = moment().format('MM/DD/YYYY');
  // console.log(time);
  //   let timeCool = time.split(":")
  //   let timeCooler = parseInt(timeCool, 10);
  //   let timeCoolest = moment.unix(timeCooler).format(today, "hh:mm a");
  //   console.log(timeCoolest);



    // let nextArr = moment(timeCoolest, "hh:mm a").add(frequency, 'minutes').format("hh:mm a");
    // console.log(nextArr);

    //min away
    // let now = moment().format("hh:mm a");
    // let minAway = moment(nextArr, "hh:mm a").subtract(now, 'm');
    // console.log(now);
    let newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(minAway),
    );
    $("#train-table > tbody").append(newRow);
}, function(errorObject) {
  console.log("you done goofed " + errorObject.code);
});

