//Array for colors
var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern= [];
var userClickedPattern= [];

//game not yet started
var started=false;
var level=0;

//jQuery to detect keyboard press
$(document).keypress(function(){
    if(!started){

        //h1 will change to level 0 when game started
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

//jQuery to trigger handler function
$(".btn").click(function () {
    
    //var for storing userChosenColor that got clicked
    var userChosenColour=$(this).attr("id");
    
    //to push color
    userClickedPattern.push(userChosenColour);
    
    //to play sound
    playSound(userChosenColour);
    
    //to animate
    animatePress(userChosenColour);
    
    //Calling check answer
    checkAnswer(userClickedPattern.length-1);
    
    //option to check userClickedPattern
    //console.log(userClickedPattern);
});

//Function to check answer
function checkAnswer(currentLevel) {

    //Checking if game pattern and user pattern is right or wrong
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
         
        if (userClickedPattern.length === gamePattern.length){

            //Calling nextSequence after 1 second delay
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        
        //to play wrong sound from sound folder if answer is wrong
        playSound("wrong");
        
        //Adding css property
        $("body").addClass("game-over");

        //for gameover title
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        //Remove CSS property after .2 second
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function nextSequence() {
    
    userClickedPattern=[];
    
    level++;

    $("#level-title").text("Level "+level);
    
    //Function to generate random number
    var randomNumber=Math.floor(Math.random() * 4);

    //Function to choose random color from array
    var randomChosenColour=buttonColours[randomNumber];

    //Function to push randomcolor
    gamePattern.push(randomChosenColour);

    //Function to use jQuery to select the button with the same id as the randomChosenColour
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function animatePress(currentColor) {

    //to add pressed property from css
    $("#"+currentColor).addClass("pressed");
    
    //to remove pressed property from css
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function playSound(name) {
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
    
function startOver() {
    
    //Function to reset values
    level=0;
    gamePattern=[];
    started=false;
}

