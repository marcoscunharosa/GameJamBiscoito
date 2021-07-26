import Game from "./game.js";
import StartPage from "./start_page.js";
import EndPage from "./end_page.js";
class ScreenController{
    constructor(){
        this.canvas = document.querySelector('#background');
        this.context = this.canvas.getContext('2d');
        this.startPage = new StartPage(this.canvas, this.context);
        this.currentScreenTypes = {START: "start", GAME:"game", END: "end"};
        this.currentScreen = {object: this.startPage, type: this.currentScreenTypes.START};
        this.scoreBar = document.getElementById('score');
        this.powerBar = document.getElementById('power_bar');
        this.reportBar = document.getElementById('report_bar');
        this.changeDisplay("hidden")
    }
    click(){
        window.addEventListener('click', (event) =>{
            if(this.currentScreen.object.canBeClicked(event.clientX, event.clientY)){
                if(this.currentScreen.type == this.currentScreenTypes.START){
                    this.game = new Game(this.canvas, this.context);
                    this.changeDisplay("visible")
                    this.currentScreen = {object: this.game, type: this.currentScreenTypes.GAME};
                }
                else if(this.currentScreen.type == this.currentScreenTypes.GAME){
                    this.currentScreen.object.click();
                }
                else if (this.currentScreen.type == this.currentScreenTypes.END){
                    this.endPage.clicks++;
                    if(this.endPage.clicks > 1){
                        this.currentScreen = {object: this.startPage, type: this.currentScreenTypes.START};
                    }
                }
            }
        })
    }
    endTheGame(){
        this.endPage = new EndPage(this.canvas, this.context);
        this.changeDisplay("hidden")
        this.currentScreen = {object: this.endPage, type: this.currentScreenTypes.END};
        this.endPage.setFinalPoints(this.game.powerLevel.catches, this.game.maxFollows, this.context);
    }
    changeDisplay(type){
        this.scoreBar.style.visibility = type;
        this.powerBar.style.visibility = type;
        this.reportBar.style.visibility = type;
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
    if(screenController.currentScreen.type == screenController.currentScreenTypes.GAME){
        if(screen.loseGame){
            screenController.endTheGame();
        }
    }
}
window.setInterval(loopUpdate, 50);
loop();