export default class Biscoiteiro{
    constructor(){
        this.sourceX = 45;
        this.sourceY = 0;
        this.width = 109;
        this.height = 159;
        this.x = 169;
        this.y = 86;
        this.sprites = new Image();
        this.sprites.src = 'assets/biscoiteiro.png'
        this.velocidade = 0;
        this.gravidade = 0.25;
        this.pulo = 4.6
        this.createAnimation();
    }
    draw(context, canvas, frames){

        context.fillStyle = '#15151a';
        context.fillRect(this.x, this.y, this.width, this.height);

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