import { generateFreePixel, isPixelsEqual } from '../utils/helper';
import { DOWN, LEFT, RIGHT, UP } from '../constants/directions';
import pickSound from '../assets/sounds/pick.wav';
import hitSound from '../assets/sounds/hit.wav';

const pickAudio = new Audio(pickSound);
const hitAudio = new Audio(hitSound);

const getDefaultState = () => ({
    speed: 5,
    coords: [{ i: 2, j: 2 }, { i: 2, j: 1 }, { i: 2, j: 0 }],
    feed: [{ i: 0, j: 0 }],
    direction: DOWN,
    walls: false
});

const update = (viewParams, state) => {
    if (!state) return getDefaultState();

    const { coords, direction, feed } = state;
    const { columns, rows } = viewParams;
    const head = coords[0];
    const tag = coords[coords.length - 1];
    const body = coords.slice(1, -1);

    let lookahead;
    switch (direction) {
        case UP:
            lookahead = { i: head.i, j: head.j - 1 };
            break;
        case DOWN:
            lookahead = { i: head.i, j: head.j + 1 };
            break;
        case LEFT:
            lookahead = { i: head.i - 1, j: head.j };
            break;
        case RIGHT:
            lookahead = { i: head.i + 1, j: head.j };
            break;
        default:
    }

    if (body.some(f => isPixelsEqual(f, lookahead))) {
        hitAudio.play();
        return getDefaultState();
    }

    if (lookahead.i < 0 || lookahead.i >= columns || lookahead.j < 0 || lookahead.j >= rows) {
        if (state.walls) {
            hitAudio.play();
            return getDefaultState();
        } else {
            lookahead.i = (lookahead.i + columns) % columns;
            lookahead.j = (lookahead.j + rows) % rows;
        }
    }

    const eaten = feed.find(f => isPixelsEqual(f, lookahead));
    if (eaten) {
        pickAudio.play();
        return {
            ...state,
            feed: [...feed.filter(f => f !== eaten), generateFreePixel([...coords, ...feed], rows, columns)],
            coords: [lookahead, head, ...body, tag]
        };
    } else {
        return { ...state, coords: [lookahead, head, ...body] };
    }
};

export default update;
