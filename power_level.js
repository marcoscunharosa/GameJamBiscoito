export default class PowerLevel{
    constructor(){
        this.bar_level = 0;
        this.maxFollowers = 20;
        this.bar = document.getElementById('power_bar_level');
        this.container = document.getElementById('power_bar');
        this.bar_width = this.container.clientWidth;
        this.draw();
        this.catches = 0;
        this.full = false;
    }

    addPoints(){
        this.catches++;
        if(!this.full){
            if(this.bar_level < this.maxFollowers - 1){
                this.bar_level++;
                this.draw();
            }
            else{
                this.bar_level++;
                this.draw();
                this.full = true;
            }
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