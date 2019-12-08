import requestBuilder from '../utils/api-utils';

export const getScoresList = (level, onSuccess, onFailure) => {
    requestBuilder('https://snake-game-backend.glitch.me/api/records', { level }, 'GET', onSuccess, onFailure);
};

export const postScoreResult = ({ name, score, level }, onSuccess, onFailure) => {
    requestBuilder(
        'https://snake-game-backend.glitch.me/api/records',
        { name, score, level },
        'POST',
        onSuccess,
        onFailure
    );
};
