import Game from "./game.js";
export default class Background{
    constructor(){
        this.sourceX = 0;
        this.sourceY = 0;
        this.width = 1000;
        this.height = 350;
        this.x = 0;
        this.y = 0
        this.sprite = new Image();
        this.sprite.src = 'assets/background.png'
    }
    draw(context, canvas, frames){
        context.drawImage(
            this.sprite,
            this.sourceX, this.sourceY,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height
        );
        context.drawImage(
            this.sprite,
            this.sourceX, this.sourceY,
            this.width, this.height,
            (this.x + this.width), this.y,
            this.width, this.height
        );
        
    }
    update(){
        const movChao = Game.velocity; //a cada quadro, 1 pra frente
        const repeteEm = 1000;
        const movimentacao = this.x - movChao;

        this.x = movimentacao % repeteEm;
    }
}