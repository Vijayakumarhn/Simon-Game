var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = []; // Reset user pattern for the new level
  level++; // Increment the level
  $("#level-title").text("Level " + level); // Update the level display

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); // Add new color to the game pattern

  // Show the entire sequence
  animateGamePattern();
}

function animateGamePattern() {
  // Loop through each color in the game pattern
  for (let i = 0; i < gamePattern.length; i++) {
    (function(i) {
      setTimeout(function() {
        $("#" + gamePattern[i]).fadeIn(200).fadeOut(200).fadeIn(200);
        playSound(gamePattern[i]);
      }, i * 1000); // Delay for each color (1000ms for each)
    })(i);
  }
}

function animatePress(currentColor) {
  // $("#" + currentColor).addClass("pressed");
  $("#" + currentColor).fadeIn(200).fadeOut(200).fadeIn(200);
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
