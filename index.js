const postcss = require('postcss');
const { EOL } = require('os');

const getCurrentValue = (raws, current, eol) => {
    const re = /\r?\n/g;
    if (typeof raws[current] === 'boolean') {
        return {
            [current]: raws[current]
        };
    }

    if (typeof raws[current] === 'object') {
        return {
            [current]: raws[current].raw.replace(re, eol)
        };
    }

    return {
        [current]: raws[current].replace(re, eol)
    };
};

const replaceToEOL = (raws = {}, eol) => Object.keys(raws).reduce((previous, current) => Object.assign(previous, getCurrentValue(raws, current, eol)), {});

module.exports = postcss.plugin('postcss-eol', (eol = EOL, append = true) => css => {
    css.raws = replaceToEOL(css.raws, eol);
    if (append && !new RegExp(eol + '$').test(css.raws.after)) {
        css.raws.after = eol;
    }
    css.walk(el => {
        el.raws = replaceToEOL(el.raws, eol);
    });
});
