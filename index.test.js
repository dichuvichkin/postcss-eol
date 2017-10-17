const { expect } = require('chai');

const postcss = require('postcss');

const plugin = require('./');

function run(input, output) {
    return postcss([plugin()])
        .process(input)
        .then(result => {
            expect(result.css).to.deep.equal(output);
            expect(result.warnings().length).to.deep.equal(0);
        });
}

const inAtRule = `@media screen and (min-width: 480px) {
    body {
        background-color: lightgreen;
    }
}
`;
const outAtRule =
    '@media screen and (min-width: 480px) {\r\n    body {\r\n        background-color: lightgreen;\r\n    }\r\n}\r\n';

const inIds = '#main {\nborder: 1px solid black;\n}\n';
const outIds = '#main {\r\nborder: 1px solid black;\r\n}\r\n';

const inClass = 'ul li {\npadding: 5px;\n}\n';
const outClass = 'ul li {\r\npadding: 5px;\r\n}\r\n';

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
});
