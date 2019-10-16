export const strokePixel = (ctx, viewParams, i, j, color) => {
    const { lineWidth, xPadding, yPadding, cellWidth } = viewParams;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(
        xPadding + cellWidth * i + lineWidth * 1.5,
        yPadding + cellWidth * j + lineWidth * 1.5,
        cellWidth - 3 * lineWidth,
        cellWidth - 3 * lineWidth
    );
};

export const fillPixel = (ctx, viewParams, i, j, color) => {
    const { lineWidth, xPadding, yPadding, cellWidth } = viewParams;
    ctx.fillStyle = color;
    ctx.fillRect(
        xPadding + cellWidth * i + 3.5 * lineWidth,
        yPadding + cellWidth * j + 3.5 * lineWidth,
        cellWidth - 7 * lineWidth,
        cellWidth - 7 * lineWidth
    );
};
