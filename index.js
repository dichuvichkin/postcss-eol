const postcss = require('postcss');
const { EOL } = require('os');

const replaceToEOL = (raws = {}) =>
    Object.keys(raws).reduce((previous, current) => {
        const currentValue =
            typeof raws[current] === 'boolean' ?
            {
                [current]: raws[current]
            } :
            {
                [current]: raws[current].replace(/\r?\n/g, EOL)
            };
        return Object.assign(previous, currentValue);
    }, {});

module.exports = postcss.plugin('postcss-eol', () => css => {
    css.raws = replaceToEOL(css.raws);
    css.walk(el => {
        el.raws = replaceToEOL(el.raws);
    });
});
