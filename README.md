#Array.from <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![Build Status][travis-svg]][travis-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

A spec-compliant `Array.from` shim/polyfill/replacement that works as far down as ES3.

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment and complies with the proposed [spec](http://www.ecma-international.org/ecma-262/6.0/#sec-array.from).

The `Array.from()` method creates a new Array instance from an array-like or iterable object.

## Installation

In a browser:

Via [npm](https://www.npmjs.com/):

```bash
npm install array.from
```

## Example

```js
var from = require('array.from');
var assert = require('assert');

assert.deepEqual(from('abc'), ['a', 'b', 'c']);
```

```js
var from = require('array.from');
var assert = require('assert');
/* when Array#from is not present */
delete Array.from;
var shimmedFrom = from.shim();
assert.equal(shimmedFrom, from.getPolyfill());
assert.deepEqual(Array.from('foo'), from('foo'));
```

```js
var from = require('array.from');
var assert = require('assert');
/* when Array#from is present */
var shimmedFrom = from.shim();
assert.equal(shimmedFrom, Array.from);
assert.deepEqual(Array.from('abc'), from('abc'));
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

This polyfill is available under the [MIT](https://mths.be/mit) license.

[package-url]: https://npmjs.org/package/array.from
[npm-version-svg]: http://versionbadg.es/mathiasbynens/Array.from.svg
[travis-svg]: https://travis-ci.org/mathiasbynens/Array.from.svg
[travis-url]: https://travis-ci.org/mathiasbynens/Array.from
[deps-svg]: https://david-dm.org/mathiasbynens/Array.from.svg
[deps-url]: https://david-dm.org/mathiasbynens/Array.from
[dev-deps-svg]: https://david-dm.org/mathiasbynens/Array.from/dev-status.svg
[dev-deps-url]: https://david-dm.org/mathiasbynens/Array.from#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/array.from.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/array.from.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/array.from.svg
[downloads-url]: http://npm-stat.com/charts.html?package=array.from
