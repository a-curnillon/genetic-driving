let cars = [];
let obstacles = [];
let walls = [];
let road;
let isPlaying;

function setup() {
  canvas = createCanvas(450, 450);
  canvas.parent('skeych-holder');
  setGame(2);
}

function draw() {
  background(0);
  playGame(cars);
}
