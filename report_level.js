export default class ReportLevel{
    constructor(){
        this.bar_level = 0;
        this.maxMissesReport = 10;
        this.bar = document.getElementById('report_bar_level');
        this.container = document.getElementById('report_bar');
        this.bar_width = this.container.clientWidth;
        this.lose = false;
        this.draw();
    }

    addPoints(){
        if(this.bar_level < this.maxMissesReport - 1){
            this.bar_level++;
            this.draw();
        }
        else{
            this.lose = true;
            this.draw();
        }
    }
    restartBar(){
        this.bar_level = 0;
        this.draw();
    }
    draw(){
        const level = this.bar_level * (this.bar_width/this.maxMissesReport);
        this.bar.style.width = level;
    }
}