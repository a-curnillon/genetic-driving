function playGame() {

  let numberOfCarsShown = 0;

  if(!debugMode) {
    isPlaying = false;
  }

  if(!startTime) {
    startTime = Date.now();
  }

  let walls = [];

  playground.show();
  watch.show();
  scoreTab.show();
  numberTab.show();
  walls = concat(walls, playground.walls);

  for(let obstacle of obstacles) {
    obstacle.show();
    if(!debugMode && play) {
      obstacle.move(playground.x, playground.x + playground.w);
    }
    walls = concat(walls, obstacle.walls);
  }

  let alive = 0;
  for (let car of cars) {
    if (!debugMode) {
      if(!car.crashed) {
        alive++;
        isPlaying = true;
        if (numberOfCarsShown < 10) {
          car.show();
          numberOfCarsShown++;
        }
        if(play) {
          car.drive(playground, obstacles, walls);
        }
      }
    } else {
      car.show();
      if(play) {
        car.drive(playground, obstacles, walls);
      }
    }
  }
  numberTab.update(alive);

  if(isPlaying) {
    watch.update();
  }

  if(!isPlaying && !debugMode) {
    gameState = 2;
    startTime = Date.now();
  }
}
