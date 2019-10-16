import { fillPixel, strokePixel } from './pixel';

const drawFadedPixel = (ctx, viewParams, i, j) => {
    strokePixel(ctx, viewParams, i, j, 'rgba(0, 128, 0, 0.2)');
    fillPixel(ctx, viewParams, i, j, 'rgba(0, 128, 0, 0.2');
};

const fillBackground = (ctx, viewParams) => {
    const { width, height, displayHeight, columns, rows } = viewParams;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height + displayHeight);

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            drawFadedPixel(ctx, viewParams, i, j);
        }
    }
};

export default fillBackground;
