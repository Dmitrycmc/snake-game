import { fillPixel, strokePixel } from './pixel';

const drawSnakeMember = (ctx, viewParams, i, j) => {
    strokePixel(ctx, viewParams, i, j, viewParams.SNAKE_COLOR);
};

const drawHead = (ctx, viewParams, i, j) => {
    strokePixel(ctx, viewParams, i, j, viewParams.SNAKE_COLOR);
    fillPixel(ctx, viewParams, i, j, viewParams.SNAKE_COLOR);
};

const drawSnake = (ctx, viewParams, state) => {
    const [head, ...body] = state.coords;
    drawHead(ctx, viewParams, head.i, head.j);
    body.forEach(({ i, j }) => {
        drawSnakeMember(ctx, viewParams, i, j);
    });
};

export default drawSnake;
