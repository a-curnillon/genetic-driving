class Car {

  constructor(xpos, ypos, width, height) {

    this.x = xpos;
    this.y = ypos;
    this.w = width;
    this.h = height;

    let xStaticPosition = width/6;

    this.walls = [];
    this.walls.push(new Boundary(this.x, this.y+this.h, this.x+this.w, this.y+this.h));
    this.walls.push(new Boundary(this.x+this.w, this.y+this.h, this.x+this.w, this.y));
    this.walls.push(new Boundary(this.x+this.w, this.y, this.x, this.y));
    this.walls.push(new Boundary(this.x, this.y, this.x, this.y+this.h));

    this.crashed = false;

    this.rays = [];
    for(let a = 300; a < 450; a+= 30) {
      this.rays.push(new Ray(createVector(this.x + this.w, this.y + this.w/2), radians(a)));
    }

    this.points = [];
    this.dist = [];

    this.driver = new Neuron(this.rays.length);
    for(let i = 0; i < this.rays.length; i++) {
      this.driver.setWeight(i, 2*random()-1);
    }

  }

  show(r, g, b) {

    push();
      noStroke();
      fill(r, g, b);
      rect(this.x, this.y, this.w, this.h);
    pop();

    for (let wall of this.walls) {
      if(!this.crashed) {
        wall.show(0.7*r, 0.7*g, 0.7*b);
      } else {
        wall.show(255, 0, 0);
      }
    }

    if(debugMode || !debugMode) {

      for (let ray of this.rays) {
        ray.show();
      }

      for (let point of this.points) {
        push();
          stroke(255);
          line(this.x + this.w, this.y + this.h/2, point.x, point.y);
          noStroke();
          fill(255, 0, 0);
          ellipse(point.x, point.y, 5, 5)
          pop();
      }

    }

  }

  move(x, y) {

    this.x = x;
    this.y = y;

    this.walls[0].update(this.x, this.y+this.h, this.x+this.w, this.y+this.h);
    this.walls[1].update(this.x+this.w, this.y+this.h, this.x+this.w, this.y);
    this.walls[2].update(this.x+this.w, this.y, this.x, this.y);
    this.walls[3].update(this.x, this.y, this.x, this.y+this.h);

    for (let ray of this.rays) {
      ray.setPos(this.x + this.w, this.y + this.h/2);
    }

  }

  leaveRoad(way) {

    if (this.x < way.x || this.y < way.y
      || this.x + this.w > way.x + way.w
      || this.y + this.h > way.y + way.h) {
      this.crashed = true;
    } else {
      this.crashed = false;
    }

  }

  crashInto(box) {

    if(this.x + this.w >= box.x && this.x <= box.x + box.w && this.y + this.h >= box.y && this.y <= box.y + box.h) {
      this.crashed = true;
    }

  }

  collision(way, boxes) {

    this.leaveRoad(way);
    for(let box of boxes) {
      this.crashInto(box);
    }

  }

  cast(walls) {

    this.points = [];
    this.dist = [];

    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = p5.Vector.dist(createVector(this.x + this.w, this.y + this.h/2), pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest) {
        this.points.push(closest);
        this.dist.push(dist(this.x + this.w, this.y + this.h/2, closest.x, closest.y));
      } else {
        this.dist.push(Infinity);
      }
    }

  }

  drive(way, boxes, walls) {

    this.collision(way, boxes);
    this.cast(walls);
    if (play) {
      console.log(this.dist);
      if(debugMode) {
        this.move(mouseX, mouseY);
      } else {
        let diry = map(this.driver.think(this.dist), 0, 1, 0, height);
        if (diry >= this.y) {
          this.move(width/6 - this.w/2, this.y+1);
        } else {
          this.move(width/6 - this.w/2, this.y-1);
        }
      }
    }

  }

}
