import Biscoiteiro from './biscoiteiro.js';
import Follower from './follower.js';
import Floor from './floor.js';
import ColisionController from './colision_controller.js';
import RunnerFollower from './runner_follower.js';
import Score from './score.js';
import PowerLevel from './power_level.js';

//http-server -c-1
class Game{
    constructor(){
        this.frames = 0;
        this.canvas = document.querySelector('#background');
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = '#15151a';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.biscoiteiro = new Biscoiteiro(300, 278);
        this.listOfFollowers = [];
        this.listOfRunners = [];
        this.floors = [];
        this.colisionController = new ColisionController();
        this.score = new Score();
        this.powerLevel = new PowerLevel();
    }

    addFloor(width, x){
        const floor = new Floor(width, x);
        this.floors.push(floor);
        console.log(this.floors)
    }

    addFollower(positionX){
        const follower = new Follower(positionX, 278);
        this.listOfFollowers.push(follower);
    }

    addRunner(positionX){
        const runnerFollower = new RunnerFollower(positionX, 278);
        this.listOfRunners.push(runnerFollower);
    }

    createFloor(){
        const random = Math.floor(Math.random() * 500) + 200;
        const lastFloor = this.floors[this.floors.length - 1];
        if((lastFloor.x + lastFloor.customWidth <= this.canvas.width - random) 
        && (this.canvas.width - lastFloor.x + lastFloor.customWidth >= random)){
            const randomWidth = Math.floor(Math.random() * 1000) + 500;
            this.addFloor(randomWidth, this.canvas.width);
            const quantity = Math.floor(Math.random() * 3);
            for( var i = 0; i < quantity; i++){
                this.createFollower(randomWidth);
            }
        }
    }
    
    createFollower(randomWidth){
        const randomDrop = Math.floor(Math.random() * (this.canvas.width + randomWidth - 104 - this.canvas.width + 11)) + (this.canvas.width + 10);
        this.addFollower(randomDrop);


    }

    removeFloor(){
        if(this.floors[0].x + this.floors[0].customWidth <= 0){
            this.floors.shift();
        }
    }

    draw(){

        this.biscoiteiro.draw(this.context, this.canvas, this.frames);

        for(var i = 0; i < this.floors.length; i++){
            this.floors[i].draw(this.context, this.canvas, this.frames);
        }

        for(var i = 0; i < this.listOfFollowers.length; i++){
            this.listOfFollowers[i].draw(this.context, this.canvas, this.frames);
        }
        for(var i = 0; i < this.listOfRunners.length; i++){
            this.listOfRunners[i].draw(this.context, this.canvas, this.frames);
        }
    }

    update(){
        this.createFloor();
        this.removeFloor();

        if(!this.colisionController.colisionMainFloor(this.biscoiteiro, this.floors)){
            this.biscoiteiro.fall();
        }
        if(this.colisionController.colideForeheadFloor(this.biscoiteiro, this.floors)){
            this.biscoiteiro.getPushed();
        }

        var deadRunners = [];

        for(var i = 0; i < this.listOfRunners.length; i++){
            if(!this.colisionController.colisionMainFloor(this.listOfRunners[i], this.floors)){
                this.listOfRunners[i].fall();
            }
            if(this.colisionController.colideForeheadFloor(this.listOfRunners[i], this.floors)){
                this.listOfRunners[i].getPushed();
            }
            if(this.listOfRunners[i].y >= this.canvas.height){
                deadRunners.push(this.listOfRunners[i]);
                this.score.removePoint();
            }
        }
        this.listOfRunners= this.listOfRunners.filter((el) => !deadRunners.includes(el));
        var colidedFollowers = [];

        for(var i = 0; i < this.listOfFollowers.length; i++){
            this.listOfFollowers[i].move();
            if(this.colisionController.colisionMainFollower(this.biscoiteiro, this.listOfFollowers[i])){
                this.score.addPoint();
                this.powerLevel.addPoints();
                if(this.listOfRunners.length == 0){
                    this.addRunner(this.biscoiteiro.x - 120);
                }
                else{
                    this.addRunner(this.listOfRunners[this.listOfRunners.length - 1].x - 10);
                }
                colidedFollowers.push(this.listOfFollowers[i]);
                this.listOfFollowers[i].remove(this.context);
            }
        }

        //Removing:
        this.listOfFollowers = this.listOfFollowers.filter((el) => !colidedFollowers.includes(el));
        //Moving others

        for(var i = 0; i < this.floors.length; i++){
            this.floors[i].move();
        }
    }

    action(){
        if(this.biscoiteiro.y + this.biscoiteiro.height == this.floors[0].y){
            this.biscoiteiro.jump();
            setTimeout(() => {
                this.jumpRunners();
            }, 200);
        }
    }

    jumpRunners(){
        for(var i = 0; i < this.listOfRunners.length; i++){
            this.listOfRunners[i].jump(i);
        }
    }

    click(){
        //this.action(size);
        document.addEventListener('keyup', (event) => {
            var name = event.key;
            if( name == ' '){
                game.action();
            }
        });
    }

}

const game = new Game();
game.addFollower(1000);
game.addFloor(2000, 0);
game.click();

function loop() {
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

    game.draw();
    game.update();

    game.frames += 1;
    requestAnimationFrame(loop);
}
loop();