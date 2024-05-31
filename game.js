var gamePattern=[];
var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"]
let level = 0;
let started = false;


function nextSequence(){
    let randomNumber = Math.floor(Math.random()*4)
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    let buttonId = $("#" + gamePattern[gamePattern.length - 1]);
    $(buttonId).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
    level += 1;
}

function playSound(name){
    let audio = new Audio(`./sounds/` + name + `.mp3`)
    audio.play()
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length){
            userClickedPattern = [];
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{
        let wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
         }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

$( document ).on("keypress", function(){
    if (started == false){
        $("#level-title").text("Level " + level.toString());
    nextSequence();
    started = true;
    }
})



$( ".btn" ).on( "click", function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length - 1);
  } );

