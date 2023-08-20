var buttonColors = ["green", "red", "yellow", "blue"];
var texts = ["Woohoo! You're doing great.", "Keep up the good work!", "You're amazing!", "You have a pretty sharp memeory!", "Just a little more!"];
var loses = ["Hard luck :'("];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;
$(document).keypress(function(event){
    if (start == false){
        nextSequence();
        $("#level-title").text("Level "+level);
        start = true;
    }
});
$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});
function nextSequence(){
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
}
function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $(".currentColor").addClass("pressed");
    setTimeout(function(){
        $(".currentColor").removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
            $("h3").text(texts[Math.floor(Math.random()*5)]).fadeIn("fast");
                setTimeout(function(){
                    $("h3").faeOut("slow");
            });
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("h3").text(loses[0]).fadeIn("fast");
        setTimeout(function(){
          $("h3").faeOut("slow");
        });
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

        startOver();
    }
}
function startOver(){
    level = 0;
    gamePattern = 0;
    start = false;
}