let cars = [];
let obstacles = [];
let walls = [];
let road;
let isPlaying;

function setup() {
  createCanvas(450, 450);
  setGame(2);
}

function draw() {
  background(0);
  playGame(cars);
}
