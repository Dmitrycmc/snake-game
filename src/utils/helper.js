const range = n => [...Array(n)].map((i, j) => j);

const buildHashFunction = columns => ({ i, j }) => j * columns + i;

const buildReverseHashFunction = columns => hash => ({
    i: hash % columns,
    j: Math.floor(hash / columns)
});

const getRandomElement = list => {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
};

export const generateFreePixel = (excludedPixels, rows, columns) => {
    const getHash = buildHashFunction(columns);
    const getPixel = buildReverseHashFunction(columns);
    const excludedHashes = excludedPixels.map(getHash);
    const hashes = range(columns * rows).filter(h => !excludedHashes.includes(h));
    const hash = getRandomElement(hashes);

    return getPixel(hash);
};
