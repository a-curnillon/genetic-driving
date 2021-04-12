class Obstacle {

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
  }

  show() {
    push();
      noStroke();
      fill(255, 153, 0);
      rect(this.x, this.y, this.w, this.h);
    pop();
    for (let wall of this.walls) {
      wall.show(color(153, 92, 0));
    }
  }

  move(minWidth, maxWidth) {
    this.x--;
    if(this.x+this.w < minWidth) {
      let r = random(1)
      if (r < 1/3) {
        this.y = playground.y + playground.h/6 - this.h/2;
      } else if (r < 2/3) {
        this.y = playground.y + playground.h/2 - this.h/2;
      } else {
        this.y = playground.y + 5*playground.h/6 - this.h/2;
      }
      this.x = maxWidth;
    }
    this.walls[0].update(this.x, this.y+this.h, this.x+this.w, this.y+this.h);
    this.walls[1].update(this.x+this.w, this.y+this.h, this.x+this.w, this.y);
    this.walls[2].update(this.x+this.w, this.y, this.x, this.y);
    this.walls[3].update(this.x, this.y, this.x, this.y+this.h);
  }

}
