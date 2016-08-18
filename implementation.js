'use strict';
var ES = require('es-abstract/es6');
var supportsDescriptors = require('define-properties').supportsDescriptors;
var global = require('system.global')();
var isCallable = require('is-callable');
var iterator = typeof Symbol === 'function' ? Symbol.iterator : '@@iterator';
var isIterable = function (target) {
	return typeof target[iterator] === 'function';
};
var fromIterable = function (iterable) {
	var array = [];
	var iter = iterable[iterator]();
	var done = false;
	while (!done) {
		var res = iter.next();
		var value = res.value;
		done = res.done;
		if (!done) {
			array.push(value);
		}
	}
	return array;
};

/*! https://mths.be/array-from v0.2.0 by @mathias */
var parse = function (items) {
	if (isIterable(items)) {
		return fromIterable(items);
	}
	if (typeof items === 'string') {
		return items.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[^\uD800-\uDFFF]|./g) || [];
	}
	if (global.Map && items instanceof global.Map && isCallable(items.entries)) {
		return items.entries();
	}
	if (global.Set && items instanceof global.Set && isCallable(items.values)) {
		return items.values();
	}
	return items;
};
module.exports = function from(arrayLike) {
	var defineProperty = supportsDescriptors ? Object.defineProperty : function put(object, key, descriptor) {
		object[key] = descriptor.value;
	};
	var C = this;
	if (arrayLike === null || typeof arrayLike === 'undefined') {
		throw new TypeError('`Array.from` requires an array-like object, not `null` or `undefined`');
	}
	var items = ES.ToObject(parse(arrayLike));

	var mapFn, T;
	if (arguments.length > 1) {
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
			'value': mappedValue,
			'configurable': true,
			'enumerable': true,
			'writable': true
		});
		k += 1;
	}
	A.length = len;
	return A;
};
