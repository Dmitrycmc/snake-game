const getScore = state => state.coords.length - 3;

const drawDisplay = (ctx, viewParams, state) => {
    const { height, displayHeight } = viewParams;
    ctx.fillStyle = 'green';
    ctx.font = '80px Digital';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Score: ${getScore(state)}`, 20, height + displayHeight / 2);
};

export default drawDisplay;
