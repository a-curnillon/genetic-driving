function setGame() {

  playground = new GameArea(0, 75, width, 300);
  watch = new Clock(playground.x + playground.w / 2 - 120, playground.y + playground.h + 12, 240, 50);
  scoreTab = new ScoreBoard(0, 0, playground.w, playground.y);
  numberTab = new AliveBoard((playground.x + playground.w / 2 - 120)/2 - 25, playground.y + playground.h + 12, 50, 50);
  pauseTab = new PauseBoard((playground.x + playground.w) - (playground.x + playground.w / 2 - 120)/2 - 25, playground.y + playground.h + 12, 50, 50);

  for (let i = 0; i < obstacleNumber; i++) {
    let r = random(1);
    if (r < 1 / 3) {
      obstacles.push(new Obstacle(i * playground.w / 5 + 2 * playground.w / 3, playground.y + playground.h / 6 - obstacleHeight / 2, obstacleWidth, obstacleHeight));
    } else if (r < 2 / 3) {
      obstacles.push(new Obstacle(i * playground.w / 5 + 2 * playground.w / 3, playground.y + playground.h / 2 - obstacleHeight / 2, obstacleWidth, obstacleHeight));
    } else {
      obstacles.push(new Obstacle(i * playground.w / 5 + 2 * playground.w / 3, playground.y + 5 * playground.h / 6 - obstacleHeight / 2, obstacleWidth, obstacleHeight));
    }
  }

  for (let i = 0; i < carNumber; i++) {
    let temp = [];
    cars.push(new Car(width / 6 - this.w / 2, height / 2, carWidth, carHeight, colorTabR[i%colorTabR.length], colorTabG[i%colorTabG.length], colorTabB[i%colorTabB.length], (gameNumber-1)*carNumber + i));
    for (let j = 0; j < cars[i].driver.numberOfInputs(); j++) {
      temp.push(randomParameters(cars[i].driver.getWeight(j)));
    }
    TREE.push(temp);
  }

  debugCar = new Car(width / 6 - this.w / 2, height / 2, carWidth, carHeight, 200, 200, 200, -1);

  isStarted = true;
  isPlaying = true;

  gameState = 0;
  startTime = Date.now();
  watch.reset();
}
