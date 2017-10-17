const { EOL } = require('os');

const postcss = require('postcss');

const plugin = require('./');

function run(input, output) {
    return postcss([plugin()])
        .process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

const inAtRule = '@media screen and (min-width: 480px) {\nbody {\nbackground-color: lightgreen;\n}\n}\n';
const outAtRule = `@media screen and (min-width: 480px) {${EOL}body {${EOL}background-color: lightgreen;${EOL}}${EOL}}${EOL}`;

const inIds = '#main {\nborder: 1px solid black;\n}\n';
const outIds = `#main {${EOL}border: 1px solid black;${EOL}}${EOL}`;

const inClass = 'ul li {\npadding: 5px;\n}\n';
const outClass = `ul li {${EOL}padding: 5px;${EOL}}${EOL}`;

const inOne = 'ul li {\n\npadding: 5px;\n\n}\n\n';
const outOne = `ul li {${EOL}${EOL}padding: 5px;${EOL}${EOL}}${EOL}${EOL}`;

describe('Check EOL', () => {
    it('Check atRule EOL', () => {
        return run(inAtRule, outAtRule);
    });

    it('Check ids EOL', () => {
        return run(inIds, outIds);
    });

    it('Check class EOL', () => {
        return run(inClass, outClass);
    });

    it('Check one more', () => {
        return run(inOne, outOne);
    });
});
