class Clock {

  constructor(xpos, ypos, width, height) {
    this.x = xpos;
    this.y = ypos;
    this.w = width;
    this.h = height;
    this.now = Date.now();
    this.delay = 0;
    this.s = 0;
    this.m = 0;
  }

  show() {
    push();
      noStroke();
      fill(0);
      rect(this.x, this.y, this.w, this.h);
      fill(255);
      textAlign(CENTER, CENTER);
      let date = this.m + "m " + new Intl.NumberFormat({style: 'decimal'}).format(this.s) + "s";
      text(date, this.x, this.y, this.w, this.h);
    pop();
  }

  update() {
    this.m = Math.trunc(((Date.now() - this.now)/1000/60)%60);
    this.s = ((Date.now() - this.now)/1000)%60;
  }

  setDelay(time) {
    this.delay = time;
  }

  addDelay() {
    this.now += this.delay;
  }

  getDelay() {
    return this.delay;
  }

  reset() {
    this.now = Date.now();
    this.delay = 0;
  }

  time() {
    return this.s + 60*this.m;
  }

}
