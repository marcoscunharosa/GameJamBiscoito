import Game from "./game.js";
export default class ReportHouse{
    constructor(positionX, positionY){
        this.sourceX = 0;
        this.sourceY = 0;
        this.width = 182;
        this.height = 188;
        this.x = positionX;
        this.y = positionY - this.height;
        this.sprites = new Image();
        this.sprites.src = 'assets/report_house.png'
        this.createAnimation();
        this.limit = 4;
        this.numberOfColisions = 0;
    }
    draw(context, canvas, frames){

        context.fillStyle = '#15151a';
        //context.fillRect(this.x, this.y, this.width, this.height);

        this.updateCurrentFrame(frames);
        this.sourceX = this.movements[this.currentFrame].sourceX;
        this.width = this.movements[this.currentFrame].width;

        context.drawImage(
            this.sprites,
            this.sourceX, this.sourceY,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height
        );

        context.font = '35px monospace';
        context.fillStyle = 'white';
        context.textAlign = 'right';
        context.fillText(`${this.numberOfColisions}/${this.limit}`, this.x, this.y);
        context.fillStyle = '#15151a';
    }
    move(){
        this.x -= Game.velocity;
    }
    remove(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(){
        
    }

    updateCurrentFrame(frames){
        const frameInterval = 11;
        const exceedFrame = frames % frameInterval === 0;
        if(exceedFrame){
            const incrementBases = 1;
            const increment = incrementBases + this.currentFrame;
            const repetition = this.movements.length;
            this.currentFrame = increment % repetition;
        }
    }
    createAnimation(){
        this.movements = [
            {sourceX: 0, width: 182},
            {sourceX: 204, width: 182},
            {sourceX: 408, width: 182},
        ];
        this.currentFrame = 0;
    }
}