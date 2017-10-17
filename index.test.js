const postcss = require('postcss');

const plugin = require('./');

function run(input, output, opts) {
    return postcss([plugin(opts)])
        .process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

const inAtRule = '@media screen and (min-width: 480px) {\nbody {\nbackground-color: lightgreen;\n}\n}\n';
const outAtRule = '@media screen and (min-width: 480px) {\r\nbody {\r\nbackground-color: lightgreen;\r\n}\r\n}\r\n';

const inIds = '#main {\nborder: 1px solid black;\n}\n';
const outIds = '#main {\r\nborder: 1px solid black;\r\n}\r\n';

const inClass = 'ul li {\npadding: 5px;\n}\n';
const outClass = 'ul li {\r\npadding: 5px;\r\n}\r\n';

it('Check atRule EOL', () => {
    return run(inAtRule, outAtRule, {});
});

it('Check ids EOL', () => {
    return run(inIds, outIds, {});
});

it('Check class EOL', () => {
    return run(inClass, outClass, {});
});
