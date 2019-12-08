import { strokePixel } from './pixel';

const drawFeedPixel = (ctx, viewParams, i, j) => {
    strokePixel(ctx, viewParams, i, j, 'orange');
};

const drawFeed = (ctx, viewParams, state) => {
    const { feed } = state;
    feed.forEach(({ i, j }) => {
        drawFeedPixel(ctx, viewParams, i, j);
    });
};

export default drawFeed;
