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

function runLF(input, output) {
    return postcss([plugin('\n')])
        .process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

function runCRLF(input, output) {
    return postcss([plugin('\r\n')])
        .process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

const inAtRule = '@media screen and (min-width: 480px) {\nbody {\nbackground-color: lightgreen;\n}\n}';
const outAtRuleEOL = `@media screen and (min-width: 480px) {${EOL}body {${EOL}background-color: lightgreen;${EOL}}${EOL}}${EOL}`;
const outAtRuleLF = '@media screen and (min-width: 480px) {\nbody {\nbackground-color: lightgreen;\n}\n}\n';
const outAtRuleCRLF = '@media screen and (min-width: 480px) {\r\nbody {\r\nbackground-color: lightgreen;\r\n}\r\n}\r\n';

const inIds = '#main {\nborder: 1px solid black;\n}';
const outIdsEOL = `#main {${EOL}border: 1px solid black;${EOL}}${EOL}`;
const outIdsLF = '#main {\nborder: 1px solid black;\n}\n';
const outIdsCRLF = '#main {\r\nborder: 1px solid black;\r\n}\r\n';

const inClass = 'ul li {\npadding: 5px;\n}';
const outClassEOL = `ul li {${EOL}padding: 5px;${EOL}}${EOL}`;
const outClassLF = 'ul li {\npadding: 5px;\n}\n';
const outClassCRLF = 'ul li {\r\npadding: 5px;\r\n}\r\n';

const inOne = 'ul li {\n\npadding: 5px;\n\n}';
const outOneEOL = `ul li {${EOL}${EOL}padding: 5px;${EOL}${EOL}}${EOL}`;
const outOneLF = 'ul li {\n\npadding: 5px;\n\n}\n';
const outOneCRLF = 'ul li {\r\n\r\npadding: 5px;\r\n\r\n}\r\n';

describe('Check EOL', () => {
    it('Check atRule EOL', () => {
        return run(inAtRule, outAtRuleEOL);
    });

    it('Check ids EOL', () => {
        return run(inIds, outIdsEOL);
    });

    it('Check class EOL', () => {
        return run(inClass, outClassEOL);
    });

    it('Check one more', () => {
        return run(inOne, outOneEOL);
    });
});

describe('Check LF', () => {
    it('Check atRule LF', () => {
        return runLF(inAtRule, outAtRuleLF);
    });

    it('Check ids LF', () => {
        return runLF(inIds, outIdsLF);
    });

    it('Check class LF', () => {
        return runLF(inClass, outClassLF);
    });

    it('Check one more LF', () => {
        return runLF(inOne, outOneLF);
    });
});

describe('Check CRLF', () => {
    it('Check atRule CRLF', () => {
        return runCRLF(inAtRule, outAtRuleCRLF);
    });

    it('Check ids CRLF', () => {
        return runCRLF(inIds, outIdsCRLF);
    });

    it('Check class CRLF', () => {
        return runCRLF(inClass, outClassCRLF);
    });

    it('Check one more CRLF', () => {
        return runCRLF(inOne, outOneCRLF);
    });
});
