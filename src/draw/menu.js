const drawMenu = (ctx, viewParams, state) => {
    const { height, displayHeight } = viewParams;
    const { menuIndex } = state;

    ctx.font = '80px Digital';
    ctx.textBaseline = 'middle';

    ctx.textAlign = 'left';
    ctx.fillStyle = menuIndex === 0 ? 'orange' : 'green';
    ctx.fillText('play', 20, height + displayHeight / 2);

    ctx.textAlign = 'right';
    ctx.fillStyle = menuIndex === 1 ? 'orange' : 'green';
    ctx.fillText('scores', viewParams.width - 20, height + displayHeight / 2);
};

export default drawMenu;
