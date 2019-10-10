'use strict';

var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var polyfill = getPolyfill();

// eslint-disable-next-line no-unused-vars
var boundFromShim = function from(items) {
	// eslint-disable-next-line no-invalid-this
	return polyfill.apply(this || Array, arguments);
};

define(boundFromShim, {
	'getPolyfill': getPolyfill,
	'implementation': implementation,
	'shim': shim
});

module.exports = boundFromShim;
