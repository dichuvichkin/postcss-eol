const postcss = require('postcss');
const { EOL } = require('os');

const getCurrentValue = (raws, current) => {
    /* eslint no-control-regex: 0*/
    const re = new RegExp('\n', 'g');
    if (typeof raws[current] === 'boolean') {
        return {
            [current]: raws[current]
        };
    }

    if (typeof raws[current] === 'object') {
        return {
            [current]: raws[current].raw.replace(re, EOL)
        };
    }

    return {
        [current]: raws[current].replace(re, EOL)
    };
};

const replaceToEOL = (raws = {}) =>
    Object.keys(raws).reduce((previous, current) => Object.assign(previous, getCurrentValue(raws, current)), {});

module.exports = postcss.plugin('postcss-eol', () => css => {
    css.raws = replaceToEOL(css.raws);
    css.walk(el => {
        el.raws = replaceToEOL(el.raws);
    });
});
