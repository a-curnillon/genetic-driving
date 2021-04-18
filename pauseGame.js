function pauseGame() {
  push();
  fill(0, 0, 0, 0.05);
  rect(0, 0, width, height);
  textSize(45);
  fill(255);
  textAlign(CENTER, CENTER);
  text('PAUSE', width / 2, height / 2);
  pop();
}

class PauseBoard {

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.pause = false;
  }

  show() {
    push();
    noStroke();
    fill(0);
    rect(this.x, this.y, this.w, this.h);
    fill(255);
    pop();
    if(this.pause == false) {
      push();
      noStroke();
      fill(0, 255, 0);
      triangle(this.x + this.w/4, this.y + this.h/4, this.x + this.w/4, this.y + 3*this.h/4, this.x + 3*this.w/4, this.y + this.h/2);
      pop();
    } else {
      push();
      noStroke();
      fill(255);
      rect(this.x + this.w/4, this.y + this.h/4, this.w/8, this.h/2);
      rect(this.x + 3*this.w/4 - this.h/8, this.y + this.h/4, this.w/8, this.h/2);
      pop();
    }
  }

  isPause() {
    return this.pause;
  }

  isPlaying() {
    return !this.pause;
  }

  toggle() {
    this.pause = !this.pause;
  }
}