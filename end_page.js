export default class EndPage{
    constructor(canvas, context){
        this.sourceX = 285;
        this.sourceY = 47;
        this.width = 430;
        this.height = 257;
        this.x = this.sourceX;
        this.y = this.sourceY;
        this.canvas = canvas;
        this.context = context;
        this.sprite = new Image();
        this.sprite.src = 'assets/endgame.png'
        this.frames = 0;
        this.maxFollowers = 0;
        this.maxFollows = 0;
        this.clicks = 0;
    }
    draw(){
        this.context.drawImage(
            this.sprite,
            this.sourceX, this.sourceY,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height
        );
        this.drawFinalPoints();
    }
    setFinalPoints(maxFollowers, maxFollows){
        this.maxFollowers = maxFollowers;
        this.maxFollows = maxFollows;
    }
    drawFinalPoints(){
        const {context} = this;

        context.font = 'bold 35px monospace';
        context.fillStyle = '#00fce4';
        context.textAlign = 'center';
        context.fillText(`${this.maxFollows}`, 577 + 30 , 180 + 32);

        context.font = 'bold 35px monospace';
        context.fillStyle = '#008270';
        context.textAlign = 'center';
        context.fillText(`${this.maxFollows}`, 577 + 30 , 180 + 30);

        context.font = 'bold 35px monospace';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText(`${this.maxFollows}`, 577 + 30 , 180 + 28);

        context.font = 'bold 35px monospace';
        context.fillStyle = '#00fce4';
        context.textAlign = 'center';
        context.fillText(`${this.maxFollowers}`, 577 +  30, 245 + 32);

        context.font = 'bold 35px monospace';
        context.fillStyle = '#008270';
        context.textAlign = 'center';
        context.fillText(`${this.maxFollowers}`, 577 +  30, 245 + 30);

        context.font = 'bold 35px monospace';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText(`${this.maxFollowers}`, 577 +  30, 245 + 28);
    }
    canBeClicked(x, y){
        return true;
        /* var rect1 = {x: 426, y: 231, width: 153, height: 57};
        var rect2 = {x: x, y: y, width: 1, height: 1}

        if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
            return true;
        }
        return false; */
    }
    update(){

    }
}