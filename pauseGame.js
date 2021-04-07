function pauseGame() {
    push();
      fill(0, 200);
      rect(0, 0, width, height);
      textSize(45);
      fill(255);
      textAlign(CENTER, CENTER);
      text('PAUSE', width/2, height/2);
    pop();
}