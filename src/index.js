const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';

const getDefaultState = () => ({
    speed: 2,
    coords: [
        {i: 2, j: 2},
        {i: 2, j: 1},
        {i: 2, j: 0}
    ],
    feed: [
        {i: 0, j: 0},
    ],
    direction: DOWN
});

const SNAKE_COLOR = 'green';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let lastRender = 0;

const displayHeight = 100;
const width = canvas.width;
const height = canvas.height - displayHeight;
const cellWidth = 50;
const lineWidth = cellWidth / 10;

const rows = Math.floor(height / cellWidth);
const columns = Math.floor(width / cellWidth);

const yPadding = (height % cellWidth) / 2;
const xPadding = (width % cellWidth) / 2;

let state = getDefaultState();

const getScore = () => state.coords.length - 3;

const isEqualPixels = (p1, p2) => p1.i === p2.i && p1.j === p2.j;

const generateFeed = () => {
	const {coords, feed} = state;
	let pixel;
    do {
    	pixel = {   
            i: Math.floor(Math.random() * columns),
            j: Math.floor(Math.random() * rows)
        };
    } while ([...coords, ...feed].some(p => isEqualPixels(p, pixel)));
    return pixel;
};

const update = (progress = 0) => {
    const { coords, direction, feed } = state;
    const head = coords[0];
    const tag = coords[coords.length - 1];
    const body = coords.slice(1, -1);
    
    let lookahead;
    switch (direction) {
        case UP:
            lookahead = {i: head.i ,j: head.j - 1};
            break;
        case DOWN:
            lookahead = {i: head.i ,j: head.j + 1};
            break;
        case LEFT:
            lookahead = {i: head.i - 1,j: head.j};
            break;
        case RIGHT:
            lookahead = {i: head.i + 1,j: head.j};
    }
    
    const crash = body.some(f => isEqualPixels(f, lookahead)) || lookahead.i < 0 || lookahead.i >= columns || lookahead.j < 0 || lookahead.j >= rows;
    if (crash) {
    	state = getDefaultState();
        return;
    }
    const eaten = feed.find(f => isEqualPixels(f, lookahead));
    if (eaten) {
        state.feed = [...feed.filter(f => f !== eaten), generateFeed()];
        state.coords = [lookahead, head, ...body, tag];
    } else {
        state.coords = [lookahead, head, ...body];
    }
}

const fillBackground = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height + displayHeight);

    for (let i = 0; i < columns; i++)
        for (let j = 0; j < rows; j++)
            drawFadedPixel(i, j);
};

const strokePixel = (i, j, color) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(xPadding + cellWidth * i + lineWidth * 1.5, yPadding + cellWidth * j + lineWidth * 1.5, cellWidth - 3 * lineWidth, cellWidth - 3 * lineWidth);
};

const fillPixel = (i, j, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(xPadding + cellWidth * i + 3.5 * lineWidth, yPadding + cellWidth * j + 3.5 * lineWidth, cellWidth - 7 * lineWidth, cellWidth - 7 * lineWidth);
};

const drawFadedPixel = (i, j) => {
    strokePixel(i, j, "rgba(0, 128, 0, 0.2)");
    fillPixel(i, j, "rgba(0, 128, 0, 0.2");
};

const drawFeedPixel = (i, j) => {
    strokePixel(i, j, "orange");
    fillPixel(i, j, "orange");
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
    body.forEach(({i, j}) => {drawMember(i, j)});
};

const drawFeed = () => {
    const { feed } = state;
    feed.forEach(({i, j}) => {drawFeedPixel(i, j)});
};

const drawScore = () => {
	ctx.fillStyle = 'green';
    ctx.font = "30px Arial";
	ctx.textBaseline = "middle";
    ctx.fillText(`Score: ${getScore()}`, 20, height + displayHeight / 2);
};

const draw = () => {
    ctx.clearRect(0, 0, width, height);
    fillBackground();
    drawSnake();
    drawFeed();
    drawScore();
}

const loop = timestamp => {
    var progress = timestamp - lastRender;

    if (Math.floor(lastRender / 1000 * state.speed) !== Math.floor(timestamp / 1000 * state.speed)) {
        update(progress);
        draw();
    }

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
};

const init = () => {
    draw();
    window.requestAnimationFrame(loop);
};

window.onkeydown = e => {
	const { direction } = state;
    switch (e.code) {
        case 'ArrowDown':
        case 'KeyS':
            if (direction !== UP ) state.direction = DOWN;
            return;
        case 'ArrowUp':
        case 'KeyW':
            if (direction !== DOWN ) state.direction = UP;
            return;
        case 'ArrowLeft':
        case 'KeyA':
            if (direction !== RIGHT ) state.direction = LEFT;
            return;
        case 'ArrowRight':
        case 'KeyD':
            if (direction !== LEFT ) state.direction = RIGHT;
            return;
    }
};

init();