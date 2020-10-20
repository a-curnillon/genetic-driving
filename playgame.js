function playGame() {

  let walls = [];

  playground.show();
  walls = concat(walls, playground.walls);

  for(let obstacle of obstacles) {
    obstacle.show();
    if(!debugMode && play) {
      obstacle.move(playground.x, playground.x + playground.w);
    }
    walls = concat(walls, obstacle.walls);
  }

  for (let car of cars) {
    if(!car.crashed) {
      car.show(0, 153, 153);
      if(play) {
        car.drive(playground, obstacles, walls);
      }
    }
  }

  if(!play) {
    push();
      fill(0, 200);
      rect(0, 0, width, height);
      textSize(45);
      fill(255);
      textAlign(CENTER, CENTER);
      text('PAUSE', width/2, height/2);
    pop();
  }

}
