import ReportHouse from './report_house.js';
import Follower from './follower.js';
import Floor from './floor.js';

export default class Creator{
    constructor(game){
        this.game = game;
        this.lastFloorWidth;
        this.listOfCurrentElements = [];
    }

    addFloor(width, x){
        const floor = new Floor(width, x);
        this.game.floors.push(floor);
    }

    addFollower(positionX){
        const follower = new Follower(positionX, 278);
        this.game.listOfFollowers.push(follower);
        this.listOfCurrentElements.push(follower);
    }

    addReportHouse(positionX){
        const reportHouse = new ReportHouse(positionX, 278);
        this.game.listOfReportHouses.push(reportHouse);
        this.listOfCurrentElements.push(reportHouse);
    }

    removeElements(){
        var oldElements = [];
        for(var i = 0; i < this.listOfCurrentElements.length; i++){
            const element = this.listOfCurrentElements[i];
            if(element.x < 1000){
                oldElements.push(element);
            }
        }
        this.listOfCurrentElements = this.listOfCurrentElements.filter((el) => !oldElements.includes(el));
    }

    createNewObjects(){
        this.createFloor();
    }
    createFloor(){
        this.removeElements();
        const random = Math.floor(Math.random() * 500) + 200;
        const lastFloor = this.game.floors[this.game.floors.length - 1];
        if((lastFloor.x + lastFloor.customWidth <= this.game.canvas.width - random) 
        && (this.game.canvas.width - lastFloor.x + lastFloor.customWidth >= random)){
            const randomWidth = Math.floor(Math.random() * 1000) + 500;
            this.addFloor(randomWidth, this.game.canvas.width);
            this.lastFloorWidth = randomWidth;
            this.createFollowers();
            this.createReportHouses();
        }
    }
    createFollowers(){
        var quantity = Math.floor(Math.random() * 6);
        for( var i = 0; i < quantity; i++){
            const randomDrop = Math.floor(Math.random() * (this.game.canvas.width + this.lastFloorWidth - 104 - this.game.canvas.width + 11)) + (this.game.canvas.width + 10);
            if(this.canBePuted(randomDrop, randomDrop + 104)){
                this.addFollower(randomDrop);
            }
        }
    }

    createReportHouses(){
        var quantity = Math.floor(Math.random() * 3);
        for(var i = 0; i < quantity; i++){
            const randomDrop = Math.floor(Math.random() * (this.game.canvas.width + this.lastFloorWidth - 188 - this.game.canvas.width + 1)) + (this.game.canvas.width);
            if(this.canBePuted(randomDrop, randomDrop + 188)){
                this.addReportHouse(randomDrop);
            }
        }
    }

    intersect(ini, end, element){
        var x = element.x;
        var x1 = x + element.width;
        if(x1 < ini || x > end){
            return false;
        }
        else{
            return true;
        }
        /* const x = element.x;
        const x1 = element.x + element.width;
        const w1 = ini;
        const w2 = end;
        
        var det, gamma, lambda;
        var b = 0; var d = 0; var q = 0; var s = 0;
        det = (x1 - x) * (s - q) - (w2 - w1) * (d - b);
        if (det === 0) {
            return false;
        } else {
            lambda = ((s - q) * (w2 - x) + (p - w2) * (s - b)) / det;
            gamma = ((b - d) * (w2 - x) + (x1 - x) * (s - b)) / det;
            return ((0 < lambda && lambda < 1) && (0 < gamma && gamma < 1));
        } */
    }

    canBePuted(ini, end){
        var validation;
        for(var i = 0; i < this.listOfCurrentElements.length; i++){
            if(this.intersect(ini, end, this.listOfCurrentElements[i])){
                return false;
            }
        }
        return true;
    }
}