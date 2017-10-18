# postcss-eol [![Build Status][ci-img]][ci]

[PostCSS] plugin replaces or appends EOL of files.

[PostCSS]:  https://github.com/postcss/postcss
[ci-img]:   https://travis-ci.org/dichuvichkin/postcss-eol.svg
[ci]:       https://travis-ci.org/dichuvichkin/postcss-eol
[gulp-eol]: https://github.com/fritx/gulp-eol

PostCSS fork of [gulp-eol]
## Install

```js
npm install --save-dev postcss-eol
```

## Usage

### `eol(newline, append)`

- newline: [string] `\n`, `\r\n` or default `os.EOL`
- append: [boolean] whether to append eol end of file if not any, default `true`


```js
postcss([ require('postcss-eol') ])
```

See [PostCSS] docs for examples for your environment.
