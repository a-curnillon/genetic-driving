function setup() {

  canvas = createCanvas(450, 450);
  canvas.parent('sketch-holder');

  askForInformation();

  setGame();

}

function draw() {

  background(51);

  updateInformation();

  switch(gameState) {
    case 0 :
      start();
      break;
    case 1 :
      playGame();
      break;
    case 2 :
      dispScore();
      break;
    case 3 :
      geneticAlgorithm();
      break;
    case 4 :
      pauseGame();
      break;
    case 5 :
      debugGame();
      break;
    case 6 :
      endGame();
      break;
  }

  console.log("gameState : " + gameState);
  /*
  push();
  stroke(255, 0, 0);
  fill(255, 0, 0);
  line(0, mouseY, width, mouseY);
  line(mouseX, 0, mouseX, height)
  pop();
  console.log(mouseX);
  */
}
