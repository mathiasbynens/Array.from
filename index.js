'use strict';

var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

// eslint-disable-next-line no-unused-vars
var boundFromShim = function from(array) {
    // eslint-disable-next-line no-invalid-this
	return implementation.apply(this || Array, arguments);
};

define(boundFromShim, {
	'getPolyfill': getPolyfill,
	'implementation': implementation,
	'shim': shim
});

module.exports = boundFromShim;
