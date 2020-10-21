class GameArea {

  constructor(xpos, ypos, width, height) {
    this.x = xpos;
    this.y = ypos;
    this.w = width;
    this.h = height;
    this.walls = [];
    this.walls.push(new Boundary(this.x, this.y+this.h, this.x+this.w, this.y+this.h));
    this.walls.push(new Boundary(this.x+this.w, this.y+this.h, this.x+this.w, this.y));
    this.walls.push(new Boundary(this.x+this.w, this.y, this.x, this.y));
    this.walls.push(new Boundary(this.x, this.y, this.x, this.y+this.h));
    this.wallsNumber = this.walls.length;
  }

  show() {
    push();
      noStroke();
      fill(0, 220, 40);
      rect(0, 0, this.w, this.y-0);
      rect(this.x, this.y+this.h, this.w, height-(this.y+this.h));
    pop();
    push();
      stroke(255, 255, 0);
      for (let i = 0; i < 15; i++) {
        line(this.x+(i*this.h/10), this.y+this.h/3, this.x+((i+0.5)*this.h/10), this.y+this.h/3);
        line(this.x+(i*this.h/10), this.y+2*this.h/3, this.x+((i+0.5)*this.h/10), this.y+2*this.h/3);
      }
    pop();
    for(let i = 0; i < this.wallsNumber; i++) {
      if (i == 2 || i == 0) {
        this.walls[i].show(color(0, 179, 0));
      } else {
        this.walls[i].show(0);
      }
    }
  }

}
