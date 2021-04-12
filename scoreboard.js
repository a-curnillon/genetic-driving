class ScoreBoard {
    
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.scores = [];
    }

    show() {
        push();
            noStroke();
            fill(0);
            rect(this.x, this.y, this.w, this.h);
            fill(255);
            textAlign(CENTER, CENTER);
            let s = "";
            for (let i = 0; i < this.scores.length; i++) {
                s += this.scores[i] + "\t\t";
                if (i == this.scores.length/2-1) s += "\n";
            }
            text(s, this.x, this.y, this.w, this.h);
        pop();
    }

    update(newScores) {
        this.scores = newScores;
    }

}