function setGame() {
  playground = new GameArea(0, 75, width, 300);

  let obstacleNumber = 4;
  let obstacleWidth = 40;
  let obstacleHeight = 40;

  for (let i  = 0; i < obstacleNumber; i++) {
    let r = random(1);
    if (r < 1/3) {
      obstacles.push(new Obstacle(i*playground.w/5+2*playground.w/3, playground.y + playground.h/6 - obstacleHeight/2, obstacleWidth, obstacleHeight));
    } else if (r < 2/3) {
      obstacles.push(new Obstacle(i*playground.w/5+2*playground.w/3, playground.y + playground.h/2 - obstacleHeight/2, obstacleWidth, obstacleHeight));
    } else {
      obstacles.push(new Obstacle(i*playground.w/5+2*playground.w/3, playground.y + 5*playground.h/6 - obstacleHeight/2, obstacleWidth, obstacleHeight));
    }
  }

  let carNumber = 10;
  let carWidth = 40;
  let carHeight = 20;


  for (let i = 0; i < carNumber; i++) {
    cars.push(new Car(width/6 - this.w/2, height/2, carWidth, carHeight, colorTabR[i], colorTabG[i], colorTabB[i]));
  }
  //cars.push(new Car(width/6 - this.w/2, height/2, carWidth, carHeight));

  isStarted = true;
  isPlaying = true;

  //console.log("game set.");
}
