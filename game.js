import Biscoiteiro from './biscoiteiro.js';
import Follower from './follower.js';
import Floor from './floor.js';

var frames = 0;
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

context.fillStyle = '#15151a';
context.fillRect(0, 0, canvas.width, canvas.height);

const biscoiteiro = new Biscoiteiro();
const floor = new Floor();
const follower = new Follower();

function loop() {
    biscoiteiro.draw(context, canvas, frames);
    follower.draw(context, canvas, frames);
    floor.draw(context, canvas, frames);
    frames += 1;
    requestAnimationFrame(loop);
}

loop();