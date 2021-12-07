var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    fadeOutIn(randomColor);
    playSound(randomColor);
       
}

function handler(cl) {
    var userChosenColor = cl;
    userClickedPattern.push(userChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); 
}

function fadeOutIn(name) {
    $("#" + name).fadeOut(80).fadeIn(80).fadeOut(80).fadeIn(80);
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){ $("#" + currentColour).removeClass("pressed"); }, 100);
}

function isEqual(a, b) {
    var n = a.length;
    var flag = true;
    for (var i = 0; i < n; i++){
        if (a[i] != b[i]){
            flag = false;
            break;
        }
    }
    return flag;
}

$(document).on("keydown", function(){
    
    nextSequence();
    $("h1").html("Level " + gamePattern.length.toString());
   
});

$("div.btn").on("click", function(){
    var doNotPlaySound = false;

    if (gamePattern.length>userClickedPattern.length || userClickedPattern.length != 0){

        doNotPlaySound = false;
        
        handler(this.id);
        animatePress(this.id)
        
        if (gamePattern.length === userClickedPattern.length && isEqual(gamePattern, userClickedPattern) == true){
            $("h1").html("Level " + gamePattern.length.toString() + " passed");
            playSound("success");
            userClickedPattern = [];
            doNotPlay = true;
        }
        else if (gamePattern.length === userClickedPattern.length && isEqual(gamePattern, userClickedPattern) == false) {
            $("h1").html("Level " + gamePattern.length.toString() + " failed");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){ $("body").removeClass("game-over"); }, 100);
            setTimeout(function(){ $("h1").html("Press Any Key to Increase the Level by 1. Memorize the Pattern and Repeat"); }, 800);
            gamePattern = [];
            userClickedPattern = [];
        }
        if (doNotPlaySound == false) {
            playSound(this.id);
        }
        
    }
 
});

