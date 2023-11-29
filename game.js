var gamePattern = [];
var userClickedPattern = [];
var butttonColor = ["red","blue","yellow","green"];
var level = 0;
var started = false;

function nextSequence(){
    // reset user clicked pattern every time we call this method.
    userClickedPattern = [];
    //increase the level by 1 each time this method is called
    level += 1;
    // chnage the h1 as per the level value.
    $("h1").text("Level - " +level); 

    // select a random color from the array and add all sound and animation property to it.
    var randNo = Math.floor(Math.random()*4);
    var randomChosenColour = butttonColor[randNo];
    gamePattern.push(randomChosenColour);
    // flash effect to the choosen button
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    // play audio of chosen button
    playSound(randomChosenColour);

}
// if any keyboard key is pressed then call the next sequence for the 1st time.
// and update the h1 label with level value.
$(document).keypress(function() {
    if (!started) {
        $("h1").text("Level - " +level); 
        nextSequence();
        started = true;
    }

});

// if user press any button then call this function

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var lastIndexOfPattern = (userClickedPattern.length)-1;
    checkAnswer(lastIndexOfPattern);
});

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    var activeButton = $("#"+currentColor);
    activeButton.addClass("pressed"); 
    setTimeout(function() {
        activeButton.removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel) {
 if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log ("Success");
    if(userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
            nextSequence();}, 1000);
    }
 } else {
    worngSelection();
 }
}

function worngSelection(){
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");}, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    resetGame();

}
function resetGame(){
    level = 0;
    started = false;
    gamePattern = [];
}




