import fillBackground from './background';
import drawSnake from './snake';
import drawFeed from './feed';
import drawDisplay from './display';

const draw = (ctx, viewParams, state) => {
    ctx.clearRect(0, 0, viewParams.width, viewParams.height);
    fillBackground(ctx, viewParams);
    drawSnake(ctx, viewParams, state);
    drawFeed(ctx, viewParams, state);
    drawDisplay(ctx, viewParams, state);
};

export default draw;
