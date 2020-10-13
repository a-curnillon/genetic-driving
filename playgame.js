function playGame() {

  let walls = [];

  playground.show();
  walls = concat(walls, playground.walls);

  for(let obstacle of obstacles) {
    obstacle.show();
    if(obstacleMoving && play) {
      obstacle.move(playground.x, playground.x + playground.w);
    }
    walls = concat(walls, obstacle.walls);
  }

  for (let car of cars) {
    car.show(0, 153, 153);
    car.move(mouseX, mouseY);
    car.collision(playground, obstacles);
    car.cast(walls);
  }

}
