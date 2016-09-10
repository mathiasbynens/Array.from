'use strict';
var ES = require('es-abstract/es6');
var supportsDescriptors = require('define-properties').supportsDescriptors;

/*! https://mths.be/array-from v0.2.0 by @mathias */
module.exports = function from(arrayLike) {
	var defineProperty = supportsDescriptors ? Object.defineProperty : function put(object, key, descriptor) {
		object[key] = descriptor.value;
	};
	var C = this;
	if (arrayLike === null || typeof arrayLike === 'undefined') {
		throw new TypeError('`Array.from` requires an array-like object, not `null` or `undefined`');
	}
	var items = ES.ToObject(arrayLike);

	var mapFn, T;
	if (typeof arguments[1] !== 'undefined') {
		mapFn = arguments[1];
		if (!ES.IsCallable(mapFn)) {
			throw new TypeError('When provided, the second argument to `Array.from` must be a function');
		}
		if (arguments.length > 2) {
			T = arguments[2];
		}
	}

	var len = ES.ToLength(items.length);
	var A = ES.IsCallable(C) ? ES.ToObject(new C(len)) : new Array(len);
	var k = 0;
	var kValue, mappedValue;
	while (k < len) {
		kValue = items[k];
		if (mapFn) {
			mappedValue = typeof T === 'undefined' ? mapFn(kValue, k) : ES.Call(mapFn, T, [kValue, k]);
		} else {
			mappedValue = kValue;
		}
		defineProperty(A, k, {
			'configurable': true,
			'enumerable': true,
			'value': mappedValue,
			'writable': true
		});
		k += 1;
	}
	A.length = len;
	return A;
};
