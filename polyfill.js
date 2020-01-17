'use strict';

var Call = require('es-abstract/2019/Call');
var IsArray = require('es-abstract/2019/IsArray');
var IsCallable = require('es-abstract/2019/IsCallable');
var implementation = require('./implementation');

var tryCall = function (fn) {
	try {
		return fn();
	} catch (e) {
		return false;
	}
};

module.exports = function getPolyfill() {
	if (IsCallable(Array.from)) {
		var handlesUndefMapper = tryCall(function () {
			// Microsoft Edge v0.11 throws if the mapFn argument is *provided* but undefined,
			// but the spec doesn't care if it's provided or not - undefined doesn't throw.
			return Array.from([0], undefined);
		});
		if (!handlesUndefMapper) {
			var origArrayFrom = Array.from;
			return function from(items) {
				/* eslint no-invalid-this: 0 */
				if (arguments.length > 1 && typeof arguments[1] !== 'undefined') {
					return Call(origArrayFrom, this, arguments);
				} else {
					return Call(origArrayFrom, this, [items]);
				}
			};
		}
		var implemented = tryCall(function () {
			// Detects a Firefox bug in v32
			// https://bugzilla.mozilla.org/show_bug.cgi?id=1063993
			return Array.from({ 'length': -1 }) === 0;
		})
		&& tryCall(function () {
			// Detects a bug in Webkit nightly r181886
			var arr = Array.from([0].entries());
			return arr.length === 1 && IsArray(arr[0]) && arr[0][0] === 0 && arr[0][1] === 0;
		})
		&& tryCall(function () {
			return Array.from({ 'length': -Infinity });
		});
		if (implemented) {
			return Array.from;
		}
	}

	return implementation;
};
