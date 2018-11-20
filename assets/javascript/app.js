$(document).ready(function() {
  var options = [
    {
      question: "What Does NHL stand for?",
      choice: [
        "New Hockey League",
        "National Hockey League",
        "Nation Hockey League",
        "Natural Hockey League"
      ],
      answer: 1,
      photo: "./assets/images/NHLcut.png"
    },
    {
      question: "Who is the All-Time leader in NHL scoring?",
      choice: ["Wayne Gretzky", "Mario Lemieux", "Guy LaFleur", "Gordy Howe"],
      answer: 0,
      photo: "./assets/images/wayne.jpg"
    },
    {
      question: "What Team has won the most Cups in NHL history? 24 of them!!!",
      choice: [
        "Detroit Red Wings",
        "Boston Bruins",
        "Montreal Canadiens",
        "Toronto Maple Leafs"
      ],
      answer: 2,
      photo:
        "./assets/images/Hockey-Montreal-Canadiens-Stanley-Cup-Champions.jpg"
    },
    {
      question: "Who holds the record for the most penalty minutes in the NHL?",
      choice: ["Tie Domi", "Dale Hunter", "Tiger Williams", "Marty McSorely"],
      answer: 2,
      photo: "./assets/images/Tiger_Williams.jpg"
    },
    {
      question:
        "Who holds the record for the most points scored by an American born player?",
      choice: ["Brian leetch", "Neal Broten", "Jeremy Roenick", "Mike Modano"],
      answer: 3,
      photo: "./assets/images/mike-modano.jpg"
    },
    {
      question: "Who has recorded the most Shut-Outs in NHL history?",
      choice: ["Dominik Hasek", "Martin Brodeur", "Terry Sawchuk", "Cam Ward"],
      answer: 1,
      photo: "./assets/images/Martin-Brodeur.jpg"
    },
    {
      question: "Is there a penalty for fighting in the NHL?",
      choice: ["Hell No!", "Sometimes", "Yes", "Only Third man in"],
      answer: 2,
      photo: "./assets/images/Hockey-Fights.jpg"
    },

    {
      question: "What year was the NHL founded?",
      choice: [
        "1917 Montreal, Canada",
        "1920 Canton, OH",
        "1946 New York City, NY",
        "1869 Cincinnati, OH"
      ],
      answer: 0,
      photo: "./assets/images/1917NHL.jpg"
    },

    {
      question: "What City received an NHL Team last year?",
      choice: ["Columbus", "Orlando", "Manitoba", "Las Vegas"],
      answer: 3,
      photo: "./assets/images/Vegas-main-pic.png"
    },

    {
      question: "Do Hockey players ever get their teeth fixed...?",
      choice: [
        "Never",
        "Teeth are over-rated",
        "Who Needs Teeth",
        "They have a dentist on speed dial"
      ],
      answer: 3,
      photo: "./assets/images/smilePretty.jpg"
    }
  ];

  var correctCount = 0;
  var wrongCount = 0;
  var unanswerCount = 0;
  var timer = 10;
  var intervalId;
  var userGuess = "";
  var running = false;
  var qCount = options.length;
  var pick;
  var index;
  var newArray = [];
  var holder = [];

  $("#reset").hide();

  //click start button to start game
  $("#start").on("click", function() {
    $("#start").hide();
    displayQuestion();
    runTimer();
    for (var i = 0; i < options.length; i++) {
      holder.push(options[i]);
    }
  });
  //timer start
  function runTimer() {
    if (!running) {
      intervalId = setInterval(decrement, 1000);
      running = true;
    }
  }
  //timer countdown
  function decrement() {
    $("#timeleft").html("<h2>Time Remaining: " + timer + "</h2>");
    timer--;

    //stop timer if reach 0
    if (timer === 0) {
      unanswerCount++;
      stop();
      $("#answerblock").html(
        "<p>Your Time is Up! The correct answer is: " +
          pick.choice[pick.answer] +
          "</p>"
      );
      hidepicture();
    }
  }

  //timer stop
  function stop() {
    running = false;
    clearInterval(intervalId);
  }
  //randomly pick question in array if not already shown
  //display question and loop though and display possible answers
  function displayQuestion() {
    //generate random index in array
    index = Math.floor(Math.random() * options.length);
    pick = options[index];

    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //iterate through answer array and display

    $("#questionblock").html("<h2>" + pick.question + "</h2>");
    for (var i = 0; i < pick.choice.length; i++) {
      var userChoice = $("<div>");
      userChoice.addClass("answerchoice");
      userChoice.html(pick.choice[i]);

      //assign array position to it so can check answer
      userChoice.attr("data-guessvalue", i);
      $("#answerblock").append(userChoice);
    }

    //click function to select answer and outcomes
    $(".answerchoice").on("click", function() {
      //grab array position from userGuess
      userGuess = parseInt($(this).attr("data-guessvalue"));

      //correct guess or wrong guess outcomes
      if (userGuess === pick.answer) {
        stop();
        correctCount++;
        //play some sound
        document.getElementById("horn").play();
        userGuess = "";
        $("#answerblock").html("<p>Correct!</p>");

        hidepicture();
      } else {
        stop();
        wrongCount++;
        //play some sound
        document.getElementById("aww").play();
        userGuess = "";
        $("#answerblock").html(
          "<p>Wrong! The correct answer is: " +
            pick.choice[pick.answer] +
            "</p>"
        );

        hidepicture();
      }
    });
  }

  function hidepicture() {
    $("#answerblock").append("<img src=" + pick.photo + ">");
    newArray.push(pick);
    options.splice(index, 1);

    var hidpic = setTimeout(function() {
      $("#answerblock").empty();
      timer = 10;

      //This will run the score screen once all questions answered
      if (wrongCount + correctCount + unanswerCount === qCount) {
        $("#questionblock").empty();
        $("#questionblock").html("<h3>Games Over!  Your Game Stats: </h3>");
        $("#answerblock").append("<h3> GOALS: " + correctCount + "</h3>");
        $("#answerblock").append("<h3> MISSED SHOTS: " + wrongCount + "</h3>");
        $("#answerblock").append(
          "<h3> Over the Glass: " + unanswerCount + "</h3>"
        );
        $("#reset").show();
        correctCount = 0;
        wrongCount = 0;
        unanswerCount = 0;
      } else {
        runTimer();
        displayQuestion();
      }
    }, 3000);
  }

  $("#reset").on("click", function() {
    $("#reset").hide();
    $("#answerblock").empty();
    $("#questionblock").empty();
    for (var i = 0; i < holder.length; i++) {
      options.push(holder[i]);
    }
    runTimer();
    displayQuestion();
  });
});
