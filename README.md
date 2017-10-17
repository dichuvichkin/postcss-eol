# postcss-eol [![Build Status][ci-img]][ci]

[PostCSS] plugin replaces EOL of files.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/dichuvichkin/postcss-eol.svg
[ci]:      https://travis-ci.org/dichuvichkin/postcss-eol

```css
.foo {\n
  @media screen and (min-width: 480px) {\n
    body {\n
        background-color: lightgreen;\n
    }\n
  }\n
\n
  #main {\n
      border: 1px solid black;\n
  }\n
\n
  ul li {\n
      padding: 5px;\n
  }\n
}\n
```

```css
.foo {\r\n
  @media screen and (min-width: 480px) {\r\n
    body {\r\n
        background-color: lightgreen;\r\n
    }\r\n
  }\r\n
\r\n
  #main {\r\n
      border: 1px solid black;\r\n
  }\r\n
\r\n
  ul li {\r\n
      padding: 5px;\r\n
  }\r\n
}\r\n
```

## Install

```js
npm install --save-dev postcss-eol
```

## Usage

```js
postcss([ require('postcss-eol') ])
```

See [PostCSS] docs for examples for your environment.
