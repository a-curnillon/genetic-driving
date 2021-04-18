function playGame() {

  let numberOfCarsShown = 0;

  if (!debugMode) {
    isPlaying = false;
  }

  if (!startTime) {
    startTime = Date.now();
  }

  let walls = [];

  playground.show();
  watch.show();
  scoreTab.show();
  numberTab.show();
  pauseTab.show();
  walls = concat(walls, playground.walls);

  for (let obstacle of obstacles) {
    obstacle.show();
    if (!debugMode && pauseTab.isPlaying()) {
      obstacle.move(playground.x, playground.x + playground.w);
    }
    walls = concat(walls, obstacle.walls);
  }

  if (!debugMode) {
    let alive = 0;
    for (let car of cars) {
      if (!car.crashed) {
        alive++;
        isPlaying = true;
        if (numberOfCarsShown < 10) {
          car.show();
          numberOfCarsShown++;
        }
        if (pauseTab.isPlaying()) {
          car.drive(playground, obstacles, walls);
        }
      }
    }
    numberTab.update(alive);
  } else {
    debugCar.show();
    debugCar.drive(playground, obstacles, walls);
  }

  if (pauseTab.isPlaying()) {
    watch.update();
  }

  if (!isPlaying && !debugMode) {
    gameState = 2;
    startTime = Date.now();
  }
}
