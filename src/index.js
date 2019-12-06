import './index.css';
import draw from './draw/draw';
import update from './update/update';
import { DOWN, LEFT, RIGHT, UP } from './constants/directions';

const SNAKE_COLOR = 'green';

const width = 800;
const height = 400;
const displayHeight = 100;

const fps = 100;

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
    SNAKE_COLOR,
    fps
};

let state = { scene: 'menu', menuIndex: 0, initialized: false };

const loop = () => {
    state = update(viewParams, state);
    draw(ctx, viewParams, state);
    setTimeout(loop, 1000 / (state.scene === 'menu' ? fps : state.speed));
};

const keyPressHandler = e => {
    if (state.scene === 'menu') {
        switch (e.code) {
            case 'ArrowDown':
            case 'KeyS':
            case 'ArrowRight':
            case 'KeyD':
            case 'ArrowUp':
            case 'KeyW':
            case 'ArrowLeft':
            case 'KeyA':
                state.menuIndex = 1 - state.menuIndex;
                return;
            case 'Space':
            case 'Enter':
                state.scene = state.menuIndex === 0 ? 'game' : 'scores';
            default:
        }
    } else {
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
    }
};

window.onkeydown = keyPressHandler;
loop();
