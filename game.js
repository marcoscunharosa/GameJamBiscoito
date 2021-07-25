import Biscoiteiro from './biscoiteiro.js';
import Follower from './follower.js';
import Floor from './floor.js';
import ColisionController from './colision_controller.js';
import RunnerFollower from './runner_follower.js';
import Score from './score.js';
import PowerLevel from './power_level.js';
import ReportLevel from './report_level.js';
import ReportHouse from './report_house.js';
import Creator from './creator.js';
import Background from './background.js';

//http-server -c-1
export default class Game{
    constructor(canvas, context){
        this.frames = 0;
        this.canvas = canvas
        this.context = context
        this.context.fillStyle = '#15151a';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.biscoiteiro = new Biscoiteiro(300, 278);
        this.listOfFollowers = [];
        this.listOfRunners = [];
        this.listOfReportHouses = [];
        this.listOfAllElements = [];
        this.floors = [];
        this.colisionController = new ColisionController();
        this.score = new Score();
        this.powerLevel = new PowerLevel();
        this.reportLevel = new ReportLevel();
        this.creator = new Creator(this);
        this.background = new Background();
        this.creator.addReportHouse(1200);
        this.creator.addFollower(1000);
        this.creator.addFloor(2000, 0);
    }

    addRunner(positionX){
        const runnerFollower = new RunnerFollower(positionX, 278);
        this.listOfRunners.push(runnerFollower);
    }

    removeFloor(){
        if(this.floors[0].x + this.floors[0].customWidth <= 0){
            this.floors.shift();
        }
    }
    canBeClicked(x, y){
        return true;
    }

    draw(){
        this.background.draw(this.context, this.canvas, this.frames);

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

        for(var i = 0; i < this.listOfReportHouses.length; i++){
            this.listOfReportHouses[i].draw(this.context, this.canvas, this.frames);
        }
    }

    update(){
        this.background.update();
        var lastFloor = this.floors[this.floors.length - 1];
        if(lastFloor.x + lastFloor.customWidth < this.canvas.width){
            this.creator.createNewObjects();
        }

        this.removeFloor();

        //Update biscoiteiro

        if(this.colisionController.colisionMainFloor(this.biscoiteiro, this.floors) && this.biscoiteiro.y < 290 - this.biscoiteiro.height){
            this.biscoiteiro.y = 278 - this.biscoiteiro.height;
            this.biscoiteiro.velocity = 0;
            this.biscoiteiro.coliding = true;
        }
        else if(this.colisionController.checkColisitionReporter(this.biscoiteiro, this.listOfReportHouses)){
            this.biscoiteiro.y = 3;
            this.biscoiteiro.velocity = 0;
            this.biscoiteiro.coliding = true;
        }
        else{
            this.biscoiteiro.fall();
            this.biscoiteiro.coliding = false;
        }
        if(!this.biscoiteiro.isBeingPushed && this.biscoiteiro.x <= this.biscoiteiro.inicialX){
            this.biscoiteiro.run();
        }
        if(this.colisionController.colideForeheadFloor(this.biscoiteiro, this.floors)){
            this.biscoiteiro.getPushed();
        }

        //update Runners
        var deadRunners = [];

        for(var i = 0; i < this.listOfRunners.length; i++){
            const runner = this.listOfRunners[i];
            if(this.colisionController.colisionMainFloor(this.listOfRunners[i], this.floors) && runner.y < 290 - runner.height){
                runner.y = 278 - runner.height;
                runner.velocity = 0;
            }
            else if(this.colisionController.checkColisitionReporter(runner, this.listOfReportHouses)){
                runner.y = -37;
                runner.velocity = 0;
            }
            else{
                runner.fall();
            }
            if(this.colisionController.colideForeheadFloor(this.listOfRunners[i], this.floors)){
                this.listOfRunners[i].getPushed();
            }
            if(this.listOfRunners[i].y >= this.canvas.height || this.checkIfItIsGone(this.listOfRunners[i])){
                deadRunners.push(this.listOfRunners[i]);
                this.score.removePoint();
            }
            if(!runner.isBeingPushed && runner.x < runner.inicialX){
                runner.run();
            }
        }
        this.listOfRunners= this.listOfRunners.filter((el) => !deadRunners.includes(el));
        var colidedFollowers = [];
        var goneFollowers = [];
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
            if(this.listOfFollowers[i].x + this.listOfFollowers[i].width < 0){
                goneFollowers.push(this.listOfFollowers[i]);
            }
        }

        //Removing:
        this.listOfFollowers = this.listOfFollowers.filter((el) => !colidedFollowers.includes(el));
        this.listOfFollowers = this.listOfFollowers.filter((el) => !goneFollowers.includes(el));

        //Moving others
        var goneFloors = [];
        var goneHouses = [];

        //Floors
        for(var i = 0; i < this.floors.length; i++){
            this.floors[i].move();
            if (this.floors[i].x + this.floors[i].customWidth < 0){
                goneFloors.push(this.floors[i]);
            }
        }

        //Report Houses
        var numberOfColisions = 0;
        for(var i = 0; i < this.listOfReportHouses.length; i++){
            const reportHouse = this.listOfReportHouses[i];
            reportHouse.numberOfColisions = 0;
            if(this.checkIfItIsGone(this.listOfReportHouses[i])){
                goneHouses.push(this.listOfReportHouses[i]);
                this.reportLevel.addPoints();
            }
            if(this.colisionController.colisionMainReportHorizontal(this.biscoiteiro, reportHouse)){
                this.biscoiteiro.getPushed();
                this.biscoiteiro.isBeingPushed = true;
                numberOfColisions++;
            }
            else{
                this.biscoiteiro.isBeingPushed = false;
            }
            /* else{
                this.biscoiteiro.fall();
            } */
            for(var j = 0; j < this.listOfRunners.length; j++){
                const runner = this.listOfRunners[j];
                if(this.colisionController.colisionMainReportHorizontal(runner, reportHouse)){
                    numberOfColisions++;
                    runner.isBeingPushed = true;
                    runner.getPushed();
                }
                else{
                    runner.isBeingPushed = false;
                }
            }
            reportHouse.numberOfColisions = numberOfColisions;
            this.listOfReportHouses[i].move();
        }
        for(var i = 0; i < this.listOfReportHouses.length; i++){
            const reportHouse = this.listOfReportHouses[i];
            if(reportHouse.numberOfColisions >= reportHouse.limit){
                goneHouses.push(reportHouse);
            }
        }

        //Removing:
        this.floors = this.floors.filter((el) => !goneFloors.includes(el));
        this.listOfReportHouses = this.listOfReportHouses.filter((el) => !goneHouses.includes(el));
    }

    checkIfItIsGone(element){
        if (element.x + element.width < 0){
            return true;
        }
        else{
            return false;
        }
    }

    action(){
        if(this.biscoiteiro.coliding){
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
        this.action();
        //this.action(size);
        /* document.addEventListener('keyup', (event) => {
            var name = event.key;
            if( name == ' '){
                game.action();
            }
        }); */
    }

}

/* const game = new Game();
game.creator.addFollower(1000);
game.creator.addFloor(2000, 0);
game.click();

function loop() {
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

    game.draw();
    game.update();

    game.frames += 1;
    requestAnimationFrame(loop);
}

function loopUpdate(){
    game.update();
}
window.setInterval(loopUpdate, 50);
loop(); */