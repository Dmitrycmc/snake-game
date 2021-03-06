import { generateFreePixel, isPixelsEqual } from '../utils/helper';
import { DOWN, LEFT, RIGHT, UP } from '../constants/directions';
import pickSound from '../assets/sounds/pick.wav';
import hitSound from '../assets/sounds/hit.wav';
import { postScoreResult } from './helpers';
import { capitalize, translate } from '../utils/string-utils';

const pickAudio = new Audio(pickSound);
const hitAudio = new Audio(hitSound);

const askName = state => {
    const name = window.prompt('Enter your name:', localStorage.name || 'Unnamed hero') || 'Unnamed hero';
    const translatedName = translate(name.toLowerCase());
    const capitalizedName = capitalize(translatedName);
    localStorage.name = capitalizedName;
    const score = state.coords.length - 3;
    postScoreResult({ name: capitalizedName, level: 1, score });
    alert(`Congratulation, ${capitalizedName}! You earned ${score} scores`);
};

const update = (viewParams, state) => {
    if (state.scene !== 'game') return state;

    const { coords, lastDirection, feed } = state;
    const { columns, rows } = viewParams;
    const head = coords[0];
    const tag = coords[coords.length - 1];
    const body = coords.slice(1, -1);

    let lookahead;
    switch (lastDirection) {
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

    state = { ...state, snakeDirection: lastDirection };

    /// self crash
    if (body.some(f => isPixelsEqual(f, lookahead))) {
        hitAudio.play();
        askName(state);
        return null;
    }

    if (lookahead.i < 0 || lookahead.i >= columns || lookahead.j < 0 || lookahead.j >= rows) {
        /// wall crash
        if (state.walls) {
            hitAudio.play();
            askName(state);
            return null;
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
