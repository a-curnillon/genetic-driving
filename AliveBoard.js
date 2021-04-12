class AliveBoard {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.aliveNumber = 0;
    }

    show() {
        push();
            noStroke();
            fill(0);
            rect(this.x, this.y, this.w, this.h);
            fill(255);
            textAlign(CENTER, CENTER);
            text(this.aliveNumber + "/" + carNumber, this.x, this.y, this.w, this.h);
        pop()
    }

    update(alive) {
        this.aliveNumber = alive;
    }

}