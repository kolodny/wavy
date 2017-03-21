# wavy
use ~ in require and import calls

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

### install

```bash
npm install --save wavy
```

This module lets you turn things like `require('../../../../foo')` into something like  
`require('~/foo')`. The way it works is that on postinstall it creates a symlink in `app/node_modules/~` to point to `app/`

Tested on Mac, Linux, and Windows  
Tested with `npm`, [`pnpm`](https://www.npmjs.com/package/pnpm),
and [`ied`](https://www.npmjs.com/package/ied)

[npm-image]: https://img.shields.io/npm/v/wavy.svg?style=flat-square
[npm-url]: https://npmjs.org/package/wavy
[travis-image]: https://img.shields.io/travis/kolodny/wavy.svg?style=flat-square
[travis-url]: https://travis-ci.org/kolodny/wavy
[downloads-image]: http://img.shields.io/npm/dm/wavy.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/wavy
