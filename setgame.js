function setGame(carsNumber) {

  road = new GameArea(5, 5, width-10, height/3-10);
  for (let i = 0; i < carsNumber; i++) {
    cars.push(new Car(road.width/15+i*45));
  }
  for (let i = 0; i < 2; i++) {
    let a = random(1);
    if (a > 0.5) {
      obstacles.push(new Obstacle(i*road.width/2+40, height/6-60, 100, 40));
    } else {
      obstacles.push(new Obstacle(i*road.width/2+40, height/6+20, 100, 40));
    }
  }
  isPlaying = true;

  let url = "https://api.github.com/repos/a-curnillon/genetic-driving/branches/master";
  let info;

  httpDo(url, "GET", "json", function(res) {
    info = res;
  });

  while(!info){
    ;
  }

  let author = createDiv('Author : ' + info.commit.commit.author.name);
  author.parent('info');
  let date = createDiv('Date : ' + info.commit.commit.author.date);
  date.parent('info');


}
