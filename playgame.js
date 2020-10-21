function playGame() {

  isPlaying = false;

  if(!startTime) {
    startTime = Date.now();
  }

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
        isPlaying = true;
        car.drive(playground, obstacles, walls);
      }
    }
  }

  if(!isPlaying) {
    let tabCrashTime = [];
    while(tabCrashTime.length < cars.length) {
      for (let car of cars) {
        tabCrashTime.push(car.crashTime);
        console.log(car.crashTime);
      }
    }
    console.log(tabCrashTime.length);
    tabCrashTime.sort(function(a, b){return b-a});
    let stringTabTime = "";
    for (let i = 0; i < tabCrashTime.length; i++) {
      stringTabTime += i + ". " + tabCrashTime[i].toString(10) + "\n";
    }
    push();
      fill(0, 200);
      rect(0, 0, width, height);
      textSize(25);
      fill(255);
      textAlign(CENTER, CENTER);
      text(stringTabTime, 0, 0, width, height);
    pop();
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
