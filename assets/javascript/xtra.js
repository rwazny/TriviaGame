

#answerblock {
  text-align: center;
}
});



$("audio#horn")[0].play();



function playAudio() {
  var audio = new horn("hockeyhorn.wav");
  audio.play();
}
playAudio();


<audio id="horn"><source src="hockeyhorn.wav" type="audio/wav" /></audio>