var userClickedPattern=[];
var gamePattern=[];
var level=0;
var started=false;
const buttonColours=["red","blue","green","yellow"];

function nextSequence()
{
  level=level+1;
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  $("h1").text("Level "+level);
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}
// nextSequence();

$(".btn").click(function(){
  var userChoosenColour=$(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  checkAnswer(userClickedPattern.length-1);
  // playSound(userChoosenColour);
  animatePress(userChoosenColour);
});

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  addClass=document.querySelector("."+currentColor);
  $("."+currentColor).addClass('pressed');
  setTimeout(function(){
    addClass.classList.remove("pressed")
  },100);
}


$(document).on('keypress',function(e){
  if(!started)
  {
    nextSequence();
    started=true;
  }
});

function startOver(){
  level=0;
  started=false;
  gamePattern=[];
  userClickedPattern=[];
  // console.log(gamePattern);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
  {
    playSound(userClickedPattern[currentLevel]);
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
      userClickedPattern=[];
    }
  }
  else
  {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    var wrongBody = document.querySelector("body");
    setTimeout(function(){
      wrongBody.classList.remove("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}
