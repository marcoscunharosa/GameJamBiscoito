export default class StartPage{
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.spriteBackground = new Image();
        this.spriteBackground.src = 'assets/background.png'
        this.spriteInitial = new Image();
        this.spriteInitial.src = 'assets/inicialandbutton.png'
        this.frames = 0;
    }
    draw(){
        this.context.drawImage(
            this.spriteBackground,
            0, 0,
            1000, 350,
            0, 0,
            1000, 350
        );
        this.context.drawImage(
            this.spriteInitial,
            36, 47,
            929, 161,
            36, 47,
            929, 161
        );
        this.context.drawImage(
            this.spriteInitial,
            426, 231,
            153, 57,
            426, 231,
            153, 57
        );

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