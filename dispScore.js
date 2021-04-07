function dispScore() {
    
    if (Date.now() - startTime < 5000) {
        if (updated == false) {
            let tabCrashTime = [];
            let tempMeanTime = 0;
            for (let car of cars) {
                tabCrashTime.push(car.crashTime);
                tempMeanTime += car.crashTime;
            }
            tempMeanTime /= cars.length;
            meanTime.push(tempMeanTime);
            xlabel.push(gameNumber);
            chart.update();
            updated = true;
            tabCrashTime.sort(function (a, b) { return b - a });
            stringTabTime = "";
            for (let i = 0; i < tabCrashTime.length; i++) {
                if (Math.trunc(tabCrashTime[i] / 60) != 0) {
                    stringTabTime += i + ". " + Math.trunc(tabCrashTime[i] / 60) + "m " + new Intl.NumberFormat({ style: 'decimal' }).format(tabCrashTime[i] % 60) + "s" + "\n";
                } else {
                    stringTabTime += i + ". " + new Intl.NumberFormat({ style: 'decimal' }).format(tabCrashTime[i] % 60) + "s" + "\n";
                }
            }
            tabColors = [];
            tabSorted = [];
            while (tabColors.length != tabCrashTime.length) {
                for (let i = 0; i < cars.length; i++) {
                    let flag = false;
                    for (let j = 0; j < tabSorted.length; j++) {
                        if (tabSorted[j] == i) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag == true) {
                        continue;
                    } else {
                        if (tabCrashTime[tabColors.length] == cars[i].crashTime) {
                            tabColors.push([cars[i].r, cars[i].g, cars[i].b]);
                            tabSorted.push(i);
                            break;
                        }
                    }
                }
            }
        }

        push();
        fill(0, 200);
        rect(0, 0, width, height);
        textSize(25);
        fill(255);
        textAlign(CENTER, CENTER);
        text(stringTabTime, 0, 0, width, height);
        ellipseMode(CENTER);
        for (let i = 0; i < tabColors.length; i++) {
            stroke(0.7*tabColors[i][0], 0.7*tabColors[i][1], 0.7*tabColors[i][2]);
            strokeWeight(2);
            fill(tabColors[i][0], tabColors[i][1], tabColors[i][2]);
            ellipse(5 * width / 6, 68 + i*32, 12, 12);
        }
        pop();

    } else {
        gameState = 3;
        startTime = Date.now();
        updated = false;
    }
}