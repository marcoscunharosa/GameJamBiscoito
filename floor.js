import Game from "./game.js";
export default class Floor{
    constructor(customWidth, x){
        this.sourceX = 0;
        this.sourceY = 278;
        this.width = 687;
        this.height = 72;
        this.x = x;
        this.y = 278;
        this.sprites = new Image();
        this.sprites.src = 'assets/floor.png'
        this.customWidth = customWidth;
        this.createCanvas();
    }
    draw(context, canvas, frames){
        //this.context.clearRect(this.sourceX, this.sourceY, this.canvas.width, this.canvas.height);
        context.drawImage(
            this.sprites,
            this.sourceX, this.sourceY,
            this.width, this.height,
            this.x, this.y,
            this.customWidth, this.height
        );
    }
    move(){
        this.x -= Game.velocity;
    }
    createCanvas(){
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
    }
}