class GameArea {

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.walls = [];
    this.walls.push(new Boundary(x, y, x, y+h));
    this.walls.push(new Boundary(x, y+h, x+w, y+h));
    this.walls.push(new Boundary(x+w, y+h, x+w, y));
    this.walls.push(new Boundary(x+w, y, x, y));
  }

  show() {
    push();
    stroke(255);
    line(5, height/6, width-5, height/6);
    noStroke();
    fill(0);
    rect(0,0, this.x, height);
    rect(this.x+this.width, 0, 25, height);
    rect(0, this.y+this.height, width, height);
    pop();
    for (let wall of this.walls) {
      wall.show();
    }
  }

}
