function dispScore() {

    if (updated == false) {
        let tempMeanTime = 0;
        for (let car of cars) {
            tempMeanTime += car.crashTime;
        }
        if (fitnessMode == 1) {
            for (let car of cars) {
                car.probability = car.crashTime / tempMeanTime;
            }
        }
        tempMeanTime /= cars.length;
        meanTime.push(tempMeanTime);
        xlabel.push(gameNumber);
        cars.sort((a, b) => b.crashTime - a.crashTime);
        tempScoreTab = [];
        for (let i = 0; i < 10; i++) {
            if (Math.trunc(cars[i].crashTime / 60) != 0) {
                tempScoreTab.push(cars[i].id + ". " + Math.trunc(cars[i].crashTime / 60) + "m " + new Intl.NumberFormat({ style: 'decimal' }).format(cars[i].crashTime % 60) + "s");
            } else {
                tempScoreTab.push(cars[i].id + ". " + new Intl.NumberFormat({ style: 'decimal' }).format(cars[i].crashTime % 60) + "s");
            }
        }
        let totalProb = 0;
        for (let i = 0; i < cars.length; i++) {
            cars[i].rank = i;
            if (fitnessMode == 2) {
                let d = cars.length * (cars.length - 1);
                if (i < cars.length / 2) {
                    let n = 2 * (cars.length - 1) - (i + 1);
                    cars[i].probability = n / d;
                } else {
                    let n = cars.length - i;
                    cars[i].probability = n / d;
                }
                totalProb += cars[i].probability;
            }
            console.log("totalProb : " + totalProb);
        }
        if (bestCars.length == 0) {
            for (let i = 0; i < 25; i++) {
                bestCars.push(cars[i]);
            }
        } else {
            for (let i = 0; i < cars.length; i++) {
                for (let j = 0; j < bestCars.length; j++) {
                    if (cars[i].crashTime > bestCars[j].crashTime) {
                        let t = bestCars.splice(j);
                        bestCars = [...bestCars, cars[i], ...t];
                        bestCars.pop();
                        break;
                    }
                }
            }
        }
        if (parentsMode == 2) {
            if (fitnessMode == 1) {
                let mt = 0;
                for(car of bestCars) {
                    mt += car.crashTime;
                }
                mt /= bestCars.length;
                for(car of bestCars) {
                    car.probability = car.crashTime/mt;
                }
            }
            for (let i = 0; i < bestCars.length; i++) {
                bestCars[i].rank = i;
                if (fitnessMode == 2) {
                    let d = bestCars.length * (bestCars.length - 1);
                    if (i < bestCars.length / 2) {
                        let n = 2 * (bestCars.length - 1) - (i + 1);
                        bestCars[i].probability = n / d;
                    } else {
                        let n = bestCars.length - i;
                        bestCars[i].probability = n / d;
                    }
                }
            }
        }
        bestScore.push(bestCars[0].crashTime);
        chart.update();
        scoreTab.update(tempScoreTab);
        updated = true;
    }
    gameState = 3;
    startTime = Date.now();
    updated = false;
}