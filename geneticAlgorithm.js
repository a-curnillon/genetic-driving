function geneticAlgorithm() {
  let carsParents;
  if (parentsMode == 1) {
    carsParents = cars;
  } else {
    carsParents = bestCars;
  }
  newCars = [];
  for (let i = 0; i < carNumber; i++) {
    let parents = [];
    let r1 = random();
    let prob = 0;
    for (let j = 0; j < carsParents.length; j++) {
      prob += carsParents[j].probability;
      if (r1 < prob) {
        parents.push(carsParents[j]);
        break;
      }
    }
    let r2 = random();
    prob = 0;
    for (let j = 0; j < carsParents.length; j++) {
      prob += carsParents[j].probability;
      if (r2 < prob) {
        parents.push(carsParents[j]);
        break;
      }
    }
    for (p of parents) {
      console.log("parent 1 : " + p.id + " " + p.probability + " " + p.rank);
    }
    newCars.push(new Car(width / 6 - this.w / 2, height / 2, carWidth, carHeight, colorTabR[i%colorTabR.length], colorTabG[i%colorTabG.length], colorTabB[i%colorTabB.length], (gameNumber-1)*carNumber + i));
    let temp = [];
    for (let j = 0; j < newCars[i].driver.numberOfInputs(); j++) {
      let r = random();
      if (r < mutationRate) {
        temp.push(randomParameters(newCars[i].driver.getWeight(j)));
      } else {
        let r3 = random();
        if (r3 < 0.5) {
          newCars[i].driver.setWeight(j, parents[0].driver.getWeight(j));
          temp.push(sourcedParameters(parents[0].id, newCars[i].driver.getWeight(j)));
        } else {
          newCars[i].driver.setWeight(j, parents[1].driver.getWeight(j));
          temp.push(sourcedParameters(parents[0].id, newCars[i].driver.getWeight(j)));
        }
      }
    }
    TREE.push(temp);
  }
  cars = newCars;
  resetObstacle();
  gameState = 1;
  gameNumber++;
  startTime = Date.now();
  watch.reset();

}

function resetObstacle() {
  obstacles = [];
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
}
