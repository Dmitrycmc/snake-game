const groupBy = (list, keyExtractor, transform = e => e) => {
    let res = {};
    list.forEach(el => {
        const key = keyExtractor(el);
        const transformedEl = transform(el);
        res = { ...res, [key]: [...(res[key] || []), transformedEl] };
    });
    return res;
};

const getPreparedScoresList = scoresList => groupBy(scoresList, el => el.score);

const drawScoresList = (ctx, viewParams, state) => {
    const scoresList = getPreparedScoresList(state.scoresList);

    ctx.font = '30px Digital';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'green';

    let currentLine = 1;
    let currentColumn = 1;
    let currentPlace = 1;
    Object.entries(scoresList)
        .sort((a, b) => b[0] - a[0])
        .forEach(([key, scores]) => {
            const place = scores.length === 1 ? currentPlace : `${currentPlace}-${currentPlace + scores.length - 1}`;
            scores.reverse().forEach(({ name, score }) => {
                ctx.fillText(`${place}. ${name} (${score})`, 30 + (currentColumn - 1) * 280, currentLine++ * 40);
                currentPlace += scores.length;
                if (currentLine > 8) {
                    currentLine = 1;
                    currentColumn++;
                }
            });
        });
};

export default drawScoresList;
