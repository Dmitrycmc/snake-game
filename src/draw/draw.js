import fillBackground from './background';
import drawSnake from './snake';
import drawFeed from './feed';
import drawDisplay from './display';
import drawMenu from './menu';
import drawScoresList from './scores';

const draw = (ctx, viewParams, state) => {
    ctx.clearRect(0, 0, viewParams.width, viewParams.height);
    fillBackground(ctx, viewParams);

    switch (state.scene) {
        case 'scores':
            drawScoresList(ctx, viewParams, state);
            break;
        case 'menu':
            drawSnake(ctx, viewParams, state);
            drawFeed(ctx, viewParams, state);
            drawMenu(ctx, viewParams, state);
            break;
        case 'game':
            drawSnake(ctx, viewParams, state);
            drawFeed(ctx, viewParams, state);
            drawDisplay(ctx, viewParams, state);
            break;
        default:
    }
};

export default draw;
