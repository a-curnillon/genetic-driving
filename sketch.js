function setup() {

  canvas = createCanvas(450, 450);
  canvas.parent('sketch-holder');

  askForInformation();

  setGame();

}

function draw() {

  background(51);

  updateInformation();

  playGame();


}
