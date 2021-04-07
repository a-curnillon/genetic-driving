function start() {
    push();
    fill(0, 200);
    rect(0, 0, width, height);
    fill(255);
    //textSize(45*Math.abs(((Date.now() - startTime)/1000)-Math.floor((Date.now() - startTime)/1000)));
    textSize(45);
    textAlign(CENTER, CENTER);
  if (Date.now() - startTime < 3000) {
    if(3 - Math.round((Date.now() - startTime)/1000) != 0) {
    text(3 - Math.round((Date.now() - startTime)/1000), width/2, height/2);
    } else {
      text("GO!", width/2, height/2);
    }
  } else {
    gameState = 1;
    startTime = Date.now();
    watch.reset();
  }
  pop();
}
