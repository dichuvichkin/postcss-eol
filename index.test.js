const { expect } = require('chai');

const postcss = require('postcss');

const plugin = require('./');

function run(input) {
    return postcss([plugin()])
        .process(input)
        .then(result => result.css);
}

describe('Check EOL', () => {
    const inAtRule = '@media screen and (min-width: 480px) {\nbody {\nbackground-color: lightgreen;\n}\n}\n';
    const outAtRule = '@media screen and (min-width: 480px) {\r\nbody {\r\nbackground-color: lightgreen;\r\n}\r\n}\r\n';

    const inIds = '#main {\nborder: 1px solid black;\n}\n';
    const outIds = '#main {\r\nborder: 1px solid black;\r\n}\r\n';

    const inClass = 'ul li {\npadding: 5px;\n}\n';
    const outClass = 'ul li {\r\npadding: 5px;\r\n}\r\n';
    it('Check atRule EOL', () => {
        return run(inAtRule).then(scss => {
            expect(scss).to.deep.equal(outAtRule);
        });
    });

    it('Check ids EOL', () => {
        return run(inIds).then(scss => {
            expect(scss).to.deep.equal(outIds);
        });
    });

    it('Check class EOL', () => {
        return run(inClass).then(scss => {
            expect(scss).to.deep.equal(outClass);
        });
    });
});
