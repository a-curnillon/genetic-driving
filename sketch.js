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
    case 1 :
    playGame();
    break;
    case 2 :
    break;
  }

  console.log((Date.now()%1000)/1000);


}
