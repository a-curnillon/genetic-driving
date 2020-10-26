function startGame() {
  let beginDate = (Date.now()%1000)/1000;
  push();
    fill(51);
    rect(0, 0, width, height);
    textSize(35);
    fill(255, 255, 0);
    textAlign(CENTER, CENTER);
    if(Date2Seconds(Date.now()) - Date2Seconds(beginDate) < 1) {
      text('3', width/2, height/2);
    } else if (Date2Seconds(Date.now()) - Date2Seconds(beginDate) < 2) {
      text('2', width/2, height/2);
    } else if (Date2Seconds(Date.now()) - Date2Seconds(beginDate) < 3) {
      text('1', width/2, height/2);
    } else {
      gameState++;
    }
  pop();
}
