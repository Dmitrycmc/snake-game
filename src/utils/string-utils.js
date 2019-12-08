const transliterationVocabulary = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'x',
    ч: 'ch',
    ш: 'sh',
    щ: 'sh',
    ъ: "'",
    ы: 'y',
    ь: "'",
    э: 'a',
    ю: 'yu',
    я: 'ya'
};

export const translate = str =>
    str &&
    str
        .split('')
        .map(char => transliterationVocabulary[char] || char)
        .join('');

export const capitalize = str =>
    str &&
    str
        .split(' ')
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(' ');
