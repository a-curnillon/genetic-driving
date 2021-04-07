function geneticAlgorithm() {
    console.log("début phase 3");
    newCars = [];
    for (let i = 0; i < carNumber; i++) {
      let temp = [];
      newCars.push(new Car(width/6 - this.w/2, height/2, carWidth, carHeight, colorTabR[i], colorTabG[i], colorTabB[i], gameNumber*10 + i));
      if (i < carNumber - 2) {
        let parentsID = selectParents(cars);
        let param = parametersSelection(mutationRate, parentsID);
        console.log("param.length: " + param.length)
        for (let j = 0; j < param.length; j++) {
          if (param[j] == "r") {
            temp.push(randomParameters(2*random()-1));
          } else {
            temp.push(sourcedParameters(param[j], TREE[param[j]][j].value));
          }
        }
        for (let j = 0; j < temp.length; j++) {
          let v = temp[j].value;
          newCars[i].setDriverParameter(j, v);
        }
      } else {
        for (let j = 0; j < newCars[i].driver.numberOfInput(); j++) {
          temp.push(randomParameters(newCars[i].driver.getWeight(j)));
        }
      }
      TREE.push(temp);
    }
    cars = newCars;
    console.log("Cars[2].id = " + cars[2].id);
    resetObstacle();
    gameState = 1;
    gameNumber++;
    startTime = Date.now();
    watch.reset();

}

function resetObstacle() {
  obstacles = [];
  for (let i  = 0; i < obstacleNumber; i++) {
    let r = random(1);
    if (r < 1/3) {
      obstacles.push(new Obstacle(i*playground.w/5+2*playground.w/3, playground.y + playground.h/6 - obstacleHeight/2, obstacleWidth, obstacleHeight));
    } else if (r < 2/3) {
      obstacles.push(new Obstacle(i*playground.w/5+2*playground.w/3, playground.y + playground.h/2 - obstacleHeight/2, obstacleWidth, obstacleHeight));
    } else {
      obstacles.push(new Obstacle(i*playground.w/5+2*playground.w/3, playground.y + 5*playground.h/6 - obstacleHeight/2, obstacleWidth, obstacleHeight));
    }
  }
}

function selectElement(tabProb) {
  let result;
  let r = random();
  let prob = 0;
  for (let i = 0; i < 8; i++) {
    if (i < 1) {
      prob += tabProb[0];
    } else if (i < 4) {
      prob += tabProb[1];
    } else {
      prob += tabProb[2];
    }
    if (r  < prob) {
      result = i;
      break;
    }
  }
  return result;
}

function selectElement(tabProb, n) {
  let result;
  let r = random();
  let prob = 0;
  for (let i = 0; i < 8; i++) {
    if (i == n) {
      continue;
    }
    if (i < 1) {
      prob += tabProb[0];
    } else if (i < 4) {
      prob += tabProb[1];
    } else {
      prob += tabProb[2];
    }
    if (r  < prob) {
      result = i;
      break;
    }
  }
  return result;
}

function selectParents(c) {
  let temp = [];
  temp.push(selectElement(tabProbR1));
  switch(temp[0]) {
    case 0:
      temp.push(selectElement(tabProbR20, temp[0]));
      break;
    case 1:
    case 2:
    case 3:
      temp.push(selectElement(tabProbR21, temp[0]));
      break;
    case 4:
    case 5:
    case 6:
    case 7:
      temp.push(selectElement(tabProbR22, temp[0]));
      break;
  }
  let p = [c[temp[0]].id, c[temp[1]].id];
  return p;
}

function parametersSelection(mr, p) {
  let para = [];
  for (let i = 0; i < cars[0].driver.numberOfInput(); i++) {
    let r = random();
    if (r < 1 - mr) {
      let rs = random();
      if (rs < 0.5) {
        para.push(p[0]);
      } else {
        para.push(p[1]);
      }
    } else {
    para.push("r");
    }
  }
  return para;
}
