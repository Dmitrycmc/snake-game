import './index.css';
import draw from './draw/draw';
import update from './update/update';
import { DOWN, LEFT, RIGHT, UP } from './constants/directions';
import { getScoresList } from './update/helpers';

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

const defaultState = {
    scene: 'menu',
    menuIndex: 0,
    speed: 5,
    coords: [{ i: 3, j: 2 }, { i: 2, j: 2 }, { i: 1, j: 2 }],
    feed: [],
    snakeDirection: DOWN,
    lastDirection: RIGHT,
    walls: false,
    initialized: true
};

let state = defaultState;

const getFps = () => {
    switch (state.scene) {
        case 'game':
            return state.speed;
        case 'menu':
            return viewParams.fps;
        case 'scores':
            return 0.01;
        default:
            return fps;
    }
};

const loop = () => {
    state = update(viewParams, state) || defaultState;
    draw(ctx, viewParams, state);
    setTimeout(loop, 1000 / getFps());
};

const keyPressHandler = e => {
    if (state.scene === 'menu') {
        const { menuIndex } = state;
        switch (e.code) {
            case 'ArrowDown':
            case 'KeyS':
            case 'ArrowRight':
            case 'KeyD':
            case 'ArrowUp':
            case 'KeyW':
            case 'ArrowLeft':
            case 'KeyA':
                state = { ...state, menuIndex: 1 - menuIndex };
                return;
            case 'Space':
            case 'Enter':
                if (menuIndex === 0) {
                    state = { ...state, scene: 'game', feed: [{ i: 6, j: 2 }] };
                } else {
                    getScoresList(1, scoresList => {
                        state = { ...state, scene: 'scores', scoresList };
                    });
                }
                return;
            default:
        }
    } else {
        const { snakeDirection } = state;
        switch (e.code) {
            case 'ArrowDown':
            case 'KeyS':
                if (snakeDirection !== UP) state = { ...state, lastDirection: DOWN };
                return;
            case 'ArrowUp':
            case 'KeyW':
                if (snakeDirection !== DOWN) state = { ...state, lastDirection: UP };
                return;
            case 'ArrowLeft':
            case 'KeyA':
                if (snakeDirection !== RIGHT) state = { ...state, lastDirection: LEFT };
                return;
            case 'ArrowRight':
            case 'KeyD':
                if (snakeDirection !== LEFT) state = { ...state, lastDirection: RIGHT };
                return;
            default:
        }
    }
};

window.onkeydown = keyPressHandler;
loop();
