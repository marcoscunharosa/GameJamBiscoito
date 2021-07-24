export default class Score{
    constructor(){
        this.points = 0;
        this.text = document.getElementById('scoreText');
    }
    addPoint(){
        this.points++;
        this.draw();
    }
    removePoint(){
        this.points--;
        this.draw();
    }
    draw(){
        this.text.innerHTML = this.points;
    }
}