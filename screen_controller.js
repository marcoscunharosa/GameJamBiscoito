import Game from "./game.js";
import StartPage from "./start_page.js";
class ScreenController{
    constructor(){
        this.canvas = document.querySelector('#background');
        this.context = this.canvas.getContext('2d');
        this.game = new Game(this.canvas, this.context);
        this.startPage = new StartPage(this.canvas, this.context);
        this.currentScreenTypes = {START: "start", GAME:"game"};
        this.currentScreen = {object: this.startPage, type: this.currentScreenTypes.START};
    }
    click(){
        window.addEventListener('click', (event) =>{
            if(this.currentScreen.object.canBeClicked(event.clientX, event.clientY)){
                if(this.currentScreen.type == this.currentScreenTypes.START){
                    this.currentScreen = {object: this.game, type: this.currentScreenTypes.GAME};
                }
                else if(this.currentScreen.type == this.currentScreenTypes.GAME){
                    this.currentScreen.object.click();
                }
            }
        })
    }
}
const screenController = new ScreenController();
screenController.click();

function loop() {
    const screen = screenController.currentScreen.object;
    //screen.context.fillRect(0, 0, screen.canvas.width, screen.canvas.height);

    screen.draw();
    screen.update();

    screen.frames += 1;
    requestAnimationFrame(loop);
}

function loopUpdate(){
    const screen = screenController.currentScreen.object;
    screen.update();
}
window.setInterval(loopUpdate, 50);
loop();