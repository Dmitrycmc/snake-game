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

const loop = () => {
    state = update(viewParams, state) || defaultState;
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
                state = { ...state, menuIndex: 1 - state.menuIndex };
                return;
            case 'Space':
            case 'Enter':
                if (state.menuIndex === 0) {
                    state = { ...state, scene: 'game', feed: [{ i: 6, j: 2 }] };
                } else {
                    state = { ...state, scene: 'scores' };
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

const url1 = new URL('https://snake-game-backend.glitch.me/api/records');
url1.searchParams.append('level', 1);
fetch(url1.href)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(result => console.log(result));

const url2 = new URL('https://snake-game-backend.glitch.me/api/records');
url2.searchParams.append('name', 'Oleg');
url2.searchParams.append('score', 123);
url2.searchParams.append('level', 1);
fetch(url2.href, {
    method: 'POST',
    body: JSON.stringify({ name: '123', score: 12, level: 2 })
})
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(result => console.log(result));
