class Car {

constructor(x) {
  this.dist = [];
  this.alive = true;
  this.pos = createVector(x, height / 6);
  this.rays = [];
  for (let a = 330; a < 420; a += 10) {
    this.rays.push(new Ray(this.pos, radians(a)));
  }
  this.points = [this.rays.length];
  this.driver = new Neuron(this.rays.length);
  for(let i = 0; i < this.rays.length; i++) {
    this.driver.setWeight(i, 2*random()-1);
  }
}

move(y) {
  if (this.pos.y > y) {
    this.pos.y--;
  } else {
    this.pos.y++;
  }
}

show() {
  if (this.alive == true) {
    fill(255);
  } else {
    fill(255, 0, 0);
  }
  ellipse(this.pos.x, this.pos.y, 5);
  for (let ray of this.rays) {
    ray.show();
  }
}

cast(walls) {
  this.dist = [];
  for (let ray of this.rays) {
    let closest = null;
    let record = Infinity;
    for (let wall of walls) {
      const pt = ray.cast(wall);
      if (pt) {
        const d = p5.Vector.dist(this.pos, pt);
        if (d < record) {
          record = d;
          closest = pt;
        }
      }
    }
    if (closest) {
      stroke(255);
      line(this.pos.x, this.pos.y, closest.x, closest.y);
      noStroke();
      fill(255, 0, 0);
      ellipse(closest.x, closest.y, 5, 5);
      this.dist.push(dist(this.pos.x, this.pos.y, closest.x, closest.y));
    }
  }
}

collision(obstacles) {
  for (let obstacle of obstacles) {
    if (this.pos.x > obstacle.x && this.pos.x < obstacle.x + obstacle.w) {
      if (this.pos.y > obstacle.y && this.pos.y < obstacle.y + obstacle.h) {
        this.alive = false;
      }
    }
  }
}

drive(obstacles, walls, road) {
  this.collision(obstacles);
  this.cast(walls);
  this.move(map(this.driver.think(this.dist), 0, 1, road.y, road.y + road.height));
}

}
