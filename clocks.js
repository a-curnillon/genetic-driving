class Clock {

  constructor(xpos, ypos, width, height) {
    this.x = xpos;
    this.y = ypos;
    this.w = width;
    this.h = height;
    this.m = 0;
    this.s = 0;
  }

  show() {
    push();
      noStroke();
      fill(0);
      rect(this.x, this.y, this.w, this.h);
      fill(255);
      textAlign(CENTER, CENTER);
      let date = this.m + "m " + this.s + "s"
      text(date, this.x, this.y, this.w, this.h);
    pop();
  }

  update() {
    let d = new Date;
    this.m = d.getMinutes();
    this.s = d.getSeconds();
  }

}
