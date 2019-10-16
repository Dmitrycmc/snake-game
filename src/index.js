import './index.css';
import draw from './draw/draw';
import update from './update/update';
import { DOWN, LEFT, RIGHT, UP } from './constants/directions';

const SNAKE_COLOR = 'green';

const width = 800;
const height = 400;
const displayHeight = 100;

const canvas = document.createElement('canvas');
canvas.setAttribute('width', width);
canvas.setAttribute('height', height + displayHeight);
const root = document.getElementById('root');
root.appendChild(canvas);

const ctx = canvas.getContext('2d');

const cellWidth = 70;
const lineWidth = cellWidth / 10;

const rows = Math.floor(height / cellWidth);
const columns = Math.floor(width / cellWidth);

const yPadding = (height % cellWidth) / 2;
const xPadding = (width % cellWidth) / 2;

const viewParams = {
    displayHeight,
    width,
    height,
    cellWidth,
    lineWidth,
    rows,
    columns,
    yPadding,
    xPadding,
    SNAKE_COLOR
};

let state = null;
const loop = () => {
    state = update(viewParams, state);
    draw(ctx, viewParams, state);
    setTimeout(loop, 1000 / state.speed);
};

const keyPressHandler = e => {
    const { snakeDirection } = state;
    switch (e.code) {
        case 'ArrowDown':
        case 'KeyS':
            if (snakeDirection !== UP) state.lastDirection = DOWN;
            return;
        case 'ArrowUp':
        case 'KeyW':
            if (snakeDirection !== DOWN) state.lastDirection = UP;
            return;
        case 'ArrowLeft':
        case 'KeyA':
            if (snakeDirection !== RIGHT) state.lastDirection = LEFT;
            return;
        case 'ArrowRight':
        case 'KeyD':
            if (snakeDirection !== LEFT) state.lastDirection = RIGHT;
            return;
        default:
    }
};

window.onkeydown = keyPressHandler;
loop();
