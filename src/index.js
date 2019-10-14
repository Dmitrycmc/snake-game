import {generateFreePixel} from "./utils/helper";

const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';
const walls = false;

const getDefaultState = () => ({
    speed: 10,
    coords: [{ i: 2, j: 2 }, { i: 2, j: 1 }, { i: 2, j: 0 }],
    feed: [{ i: 0, j: 0 }],
    direction: DOWN
});

const SNAKE_COLOR = 'green';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const displayHeight = 100;
const width = canvas.width;
const height = canvas.height - displayHeight;
const cellWidth = 70;
const lineWidth = cellWidth / 10;

const rows = Math.floor(height / cellWidth);
const columns = Math.floor(width / cellWidth);

const yPadding = (height % cellWidth) / 2;
const xPadding = (width % cellWidth) / 2;

let state = getDefaultState();

const getScore = () => state.coords.length - 3;

const isPixelsEqual = (p1, p2) => p1.i === p2.i && p1.j === p2.j;

const update = () => {
    const { coords, direction, feed } = state;
    const head = coords[0];
    const tag = coords[coords.length - 1];
    const body = coords.slice(1, -1);

    let lookahead;
    switch (direction) {
        case UP:
            lookahead = { i: head.i, j: head.j - 1 };
            break;
        case DOWN:
            lookahead = { i: head.i, j: head.j + 1 };
            break;
        case LEFT:
            lookahead = { i: head.i - 1, j: head.j };
            break;
        case RIGHT:
            lookahead = { i: head.i + 1, j: head.j };
            break;
        default:
    };

    if (body.some(f => isPixelsEqual(f, lookahead))) {
        state = getDefaultState();
        return;
    }

    if (lookahead.i < 0 ||
        lookahead.i >= columns ||
        lookahead.j < 0 ||
        lookahead.j >= rows) {
        if (walls) {
            state = getDefaultState();
            return;
        } else {
            lookahead.i = (lookahead.i + columns) % columns;
            lookahead.j = (lookahead.j + rows) % rows;
        }
    }

    const eaten = feed.find(f => isPixelsEqual(f, lookahead));
    if (eaten) {
        state.feed = [...feed.filter(f => f !== eaten), generateFreePixel([...coords, ...feed], rows, columns)];
        state.coords = [lookahead, head, ...body, tag];
    } else {
        state.coords = [lookahead, head, ...body];
    }
};

const fillBackground = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height + displayHeight);

    for (let i = 0; i < columns; i++) for (let j = 0; j < rows; j++) drawFadedPixel(i, j);
};

const strokePixel = (i, j, color) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(
        xPadding + cellWidth * i + lineWidth * 1.5,
        yPadding + cellWidth * j + lineWidth * 1.5,
        cellWidth - 3 * lineWidth,
        cellWidth - 3 * lineWidth
    );
};

const fillPixel = (i, j, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(
        xPadding + cellWidth * i + 3.5 * lineWidth,
        yPadding + cellWidth * j + 3.5 * lineWidth,
        cellWidth - 7 * lineWidth,
        cellWidth - 7 * lineWidth
    );
};

const drawFadedPixel = (i, j) => {
    strokePixel(i, j, 'rgba(0, 128, 0, 0.2)');
    fillPixel(i, j, 'rgba(0, 128, 0, 0.2');
};

const drawFeedPixel = (i, j) => {
    strokePixel(i, j, 'orange');
    fillPixel(i, j, 'orange');
};

const drawMember = (i, j) => {
    strokePixel(i, j, SNAKE_COLOR);
    fillPixel(i, j, SNAKE_COLOR);
};

const drawHead = (i, j) => {
    strokePixel(i, j, SNAKE_COLOR);
};

const drawSnake = () => {
    const [head, ...body] = state.coords;
    drawHead(head.i, head.j);
    body.forEach(({ i, j }) => {
        drawMember(i, j);
    });
};

const drawFeed = () => {
    const { feed } = state;
    feed.forEach(({ i, j }) => {
        drawFeedPixel(i, j);
    });
};

const drawScore = () => {
    ctx.fillStyle = 'green';
    ctx.font = '30px Arial';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Score: ${getScore()}`, 20, height + displayHeight / 2);
};

const draw = () => {
    ctx.clearRect(0, 0, width, height);
    fillBackground();
    drawSnake();
    drawFeed();
    drawScore();
};

const loop = () => {
    update();
    draw();
    setTimeout(loop, 1000 / state.speed);
};

const keyPressHandler = e => {
    const { direction } = state;
    switch (e.code) {
        case 'ArrowDown':
        case 'KeyS':
            if (direction !== UP) state.direction = DOWN;
            return;
        case 'ArrowUp':
        case 'KeyW':
            if (direction !== DOWN) state.direction = UP;
            return;
        case 'ArrowLeft':
        case 'KeyA':
            if (direction !== RIGHT) state.direction = LEFT;
            return;
        case 'ArrowRight':
        case 'KeyD':
            if (direction !== LEFT) state.direction = RIGHT;
            return;
        default:
    }
};

const init = () => {
    window.onkeydown = keyPressHandler;
    draw();
    loop();
};

init();
