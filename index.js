'use strict';

var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

/* eslint-disable no-unused-vars */
var boundFromShim = function from(array) {
/* eslint-enable no-unused-vars */
	return implementation.apply(this || Array, arguments);
};

define(boundFromShim, {
	'implementation': implementation,
	'getPolyfill': getPolyfill,
	'shim': shim
});

module.exports = boundFromShim;
