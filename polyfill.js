'use strict';

var ES = require('es-abstract/es6');
var implementation = require('./implementation');

var tryCall = function (fn) {
	try {
		fn();
		return true;
	} catch (e) {
		return false;
	}
};

module.exports = function getPolyfill() {
	var implemented = ES.IsCallable(Array.from)
		&& tryCall(function () { Array.from({ 'length': -Infinity }); })
		&& !tryCall(function () { Array.from([], undefined); });

	return implemented ? Array.from : implementation;
};
