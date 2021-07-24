export default class PowerLevel{
    constructor(){
        this.bar_level = 0;
        this.maxFollowers = 30;
        this.bar = document.getElementById('power_bar_level');
        this.container = document.getElementById('power_bar');
        this.bar_width = this.container.clientWidth;
    }

    addPoints(){
        if(this.bar_level < this.maxFollowers){
            this.bar_level++;
            this.draw();
        }
        else{
            this.restartBar();
        }
    }
    restartBar(){
        this.bar_level = 0;
        this.draw();
    }
    draw(){
        const level = this.bar_level * (this.bar_width/this.maxFollowers);
        this.bar.style.width = level;
    }
}