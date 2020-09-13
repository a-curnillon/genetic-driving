class Obstacle {

constructor(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.walls = [];
  this.walls.push(new Boundary(x, y, x, y+h));
  this.walls.push(new Boundary(x, y+h, x+w, y+h));
  this.walls.push(new Boundary(x+w, y+h, x+w, y));
  this.walls.push(new Boundary(x+w, y, x, y));
}

move(minWidth, maxWidth) {
  this.x--;
  if ( this.x+this.w < minWidth ) {
    this.x = maxWidth;
    let a = random(1);
    if (a > 0.5) {
      this.y = height/6-60;
    } else {
      this.y = height/6+20;
    }
  }
  this.walls[0].update(this.x, this.y, this.x, this.y+this.h);
  this.walls[1].update(this.x, this.y+this.h, this.x+this.w, this.y+this.h);
  this.walls[2].update(this.x+this.w, this.y+this.h, this.x+this.w, this.y);
  this.walls[3].update(this.x+this.w, this.y, this.x, this.y);
}

show() {
  noStroke();
  fill(255, 200, 0);
  rect(this.x, this.y, this.w, this.h);
  for (let wall of this.walls) {
    wall.show();
  }
}

}
