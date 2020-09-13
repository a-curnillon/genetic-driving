function playGame(cars) {
  if (isPlaying) {
    isPlaying = false;
    for (let obstacle of obstacles) {
      obstacle.move(5, width-10);
      obstacle.show();
      walls = concat(walls, obstacle.walls);
    }
    road.show();
    walls = concat(walls, road.walls);
    for (let car of cars) {
      if (car.alive == true) {
        car.show();
        car.drive(obstacles, walls, road);
        isPlaying = true;
      }
    }
    walls = [];
  }
}
