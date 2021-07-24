export default class Biscoiteiro{
    constructor(positionX, positionY){
        this.sourceX = 45;
        this.sourceY = 0;
        this.width = 109;
        this.height = 159;
        this.x = positionX;
        this.y = positionY - this.height;
        this.sprites = new Image();
        this.sprites.src = 'assets/biscoiteiro.png'
        this.velocity = 0;
        this.gravity = 0.25;
        this.pulo = 12;
        this.createAnimation();
    }
    fall(){
        this.velocity += this.gravity;
        this.y += this.velocity;
    }
    jump(size){
        this.velocity = - 10;
        this.y += this.velocity;
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
    }

    getPushed(){
        this.x -= 6;
    }

    update(){
        
    }

    updateCurrentFrame(frames){
        const frameInterval = 6;
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
            {sourceX: 45, width: 109},
            {sourceX: 187, width: 167},
            {sourceX: 383, width: 128},
            {sourceX: 578, width: 106},
            {sourceX: 741, width: 134},
            {sourceX: 902, width: 176},
            {sourceX: 1096, width: 142},
            {sourceX: 1297, width: 143},
        ];
        this.currentFrame = 0;
    }
}