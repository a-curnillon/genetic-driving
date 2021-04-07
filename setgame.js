function setGame() {

  playground = new GameArea(0, 75, width, 300);
  watch = new Clock(playground.x + playground.w / 2 - 120, playground.y + playground.h + 12, 240, 50);

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
    cars.push(new Car(width / 6 - this.w / 2, height / 2, carWidth, carHeight, colorTabR[i], colorTabG[i], colorTabB[i], (gameNumber-1)*10 + i));
    for (let j = 0; j < cars[i].driver.numberOfInput(); j++) {
      temp.push(randomParameters(cars[i].driver.getWeight(j)));
    }
    TREE.push(temp);
  }
  console.log(cars[1].driver.getWeight(2));
  console.log(TREE[1][2].value);

  isStarted = true;
  isPlaying = true;

  gameState = 0;
  startTime = Date.now();
  watch.reset();
}
