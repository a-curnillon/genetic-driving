let cars = [];
let obstacles = [];
let walls = [];
let road;
let isPlaying;
let url = "https://api.github.com/repos/a-curnillon/genetic-driving/branches/master";
let info;

function setup() {
  canvas = createCanvas(450, 450);
  canvas.parent('skeych-holder');
  httpDo(url, "GET", "json", function(res) {
    info = res;
  });
  setGame(2);
}

function draw() {
  if (info) {
    let author = createDiv('Author : ' + info.commit.commit.author.name);
    author.parent('info');
    let date = createDiv('Date : ' + info.commit.commit.author.date);
    date.parent('info');
    info = null;
  }
  background(0);
  playGame(cars);
}
