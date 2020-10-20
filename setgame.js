function setGame() {
  playground = new GameArea(0, 75, width, 300);

  let obstacleNumber = 4;
  let obstacleWidth = 40;
  let obstacleHeight = 40;

  for (let i  = 0; i < obstacleNumber; i++) {
    let r = random(1);
    if (r < 1/3) {
      obstacles.push(new Obstacle(i*playground.w/5, playground.y + playground.h/6 - obstacleHeight/2, obstacleWidth, obstacleHeight));
    } else if (r < 2/3) {
      obstacles.push(new Obstacle(i*playground.w/5, playground.y + playground.h/2 - obstacleHeight/2, obstacleWidth, obstacleHeight));
    } else {
      obstacles.push(new Obstacle(i*playground.w/5, playground.y + 5*playground.h/6 - obstacleHeight/2, obstacleWidth, obstacleHeight));
    }
  }

  let carNumber = 1;
  let carWidth = 40;
  let carHeight = 20;

  cars.push(new Car(width/6 - this.w/2, height/2, carWidth, carHeight));
  //console.log("game set.")
}
