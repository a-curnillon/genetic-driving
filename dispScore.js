function dispScore() {

    if (updated == false) {
        let tabCrashTime = [];
        let tempMeanTime = 0;
        for (let car of cars) {
            tabCrashTime.push(car.crashTime);
            tempMeanTime += car.crashTime;
        }
        console.log(tempMeanTime);
        tempMeanTime /= cars.length;
        meanTime.push(tempMeanTime);
        xlabel.push(gameNumber);
        cars.sort((a,b) => b.crashTime - a.crashTime);
        for (let car of cars) {
            car.probability = car.crashTime/tempMeanTime;
            console.log(car.probability);
        }
        tempScoreTab = [];
        for (let i = 0; i < 10; i++) {
            if (Math.trunc(cars[i].crashTime / 60) != 0) {
                tempScoreTab.push(cars[i].id + ". " + Math.trunc(cars[i].crashTime / 60) + "m " + new Intl.NumberFormat({ style: 'decimal' }).format(cars[i].crashTime % 60) + "s");
            } else {
                tempScoreTab.push(cars[i].id + ". " + new Intl.NumberFormat({ style: 'decimal' }).format(cars[i].crashTime % 60) + "s");
            }
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
        bestScore.push(bestCars[0].crashTime);
        chart.update();
        scoreTab.update(tempScoreTab);
        updated = true;
    }
    gameState = 3;
    startTime = Date.now();
    updated = false;

}