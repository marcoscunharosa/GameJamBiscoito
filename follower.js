export default class Follower{
    constructor(){
        this.sourceX = 0;
        this.sourceY = 0;
        this.width = 104;
        this.height = 199;
        this.x = 446;
        this.y = 46;
        this.sprites = new Image();
        this.sprites.src = 'assets/follower.png'
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
        const frameInterval = 8;
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
            {sourceX: 0, width: 104},
            {sourceX: 177, width: 105},
            {sourceX: 357, width: 109},
        ];
        this.currentFrame = 0;
    }
}