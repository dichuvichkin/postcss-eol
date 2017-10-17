const postcss = require('postcss');

const plugin = require('./');

const inAtRule = '@media screen and (min-width: 480px) {\nbody {\nbackground-color: lightgreen;\n}\n}\n';
const outAtRule = '@media screen and (min-width: 480px) {\r\nbody {\r\nbackground-color: lightgreen;\r\n}\r\n}\r\n';

const inIds = '#main {\nborder: 1px solid black;\n}\n';
const outIds = '#main {\r\nborder: 1px solid black;\r\n}\r\n';

const inClass = 'ul li {\npadding: 5px;\n}\n';
const outClass = 'ul li {\r\npadding: 5px;\r\n}\r\n';

it('Check atRule EOL', () => {
    return postcss([plugin()])
        .process(inAtRule)
        .then(result => {
            expect(result.css).toEqual(outAtRule);
            expect(result.warnings().length).toBe(0);
        });
});

it('Check ids EOL', () => {
    return postcss([plugin()])
        .process(inIds)
        .then(result => {
            expect(result.css).toEqual(outIds);
            expect(result.warnings().length).toBe(0);
        });
});

it('Check class EOL', () => {
    return postcss([plugin()])
        .process(inClass)
        .then(result => {
            expect(result.css).toEqual(outClass);
            expect(result.warnings().length).toBe(0);
        });
});
