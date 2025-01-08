var buttonColors = ["red", "blue", "green", "yellow" ];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


// restart the game once user got wrong

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    console.log("game is started....");

}


// Chech the user answer with the system answer using the last index
function checkAnswer(currentlevel){
    if (userClickedPattern[currentlevel-1] === gamePattern[currentlevel-1]){
        if (userClickedPattern.length === gamePattern.length)
            {

            // Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                 userClickedPattern = [];
                 nextSequence();
            }, 1000);
    
          }
        
    }
    else{ 
        $("h1").text("Game Over, Press Any Key to Restart");
        new Audio('sounds/wrong.mp3').play();
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
  
        },200)
        startOver();
        console.log("game is starting....");

    }
}


// Plays the sound as per the given input
function playSound(name){
    new Audio("sounds/"+ name +".mp3").play();
}


//Animate the button which is clicked by the user
function animatePress(currentColor){
    $("."+currentColor).addClass('pressed');
    setTimeout(function(){
     $("."+currentColor).removeClass('pressed');

    },100)
}

// Chooses the next Button to be clicked
function nextSequence(){
    $('h1').text("Level " + ++level);
    var randomNumber = Math.ceil(Math.random()*3)
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// Detects which button is clicked by the user.
$('.btn').click(function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length)
    
})





$(document).keydown(function(){
    if(!started){
    $('h1').text("Level " +level);
    nextSequence();
    started = true
    }
})


