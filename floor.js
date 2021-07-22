export default class Floor{
    constructor(){
        this.sourceX = 0;
        this.sourceY = 245;
        this.width = 687;
        this.height = 105;
        this.x = 0;
        this.y = 245;
        this.sprites = new Image();
        this.sprites.src = 'assets/floor.png'
    }
    draw(context, canvas, frames){
        context.drawImage(
            this.sprites,
            this.sourceX, this.sourceY,
            this.width, this.height,
            this.x, this.y,
            500, this.height
        );
    }
}