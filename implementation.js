'use strict';
var ES = require('es-abstract/es6');
var supportsDescriptors = require('define-properties').supportsDescriptors;
var has = require('has');
var global = require('system.global')();
var isString = require('is-string');
var isCallable = require('is-callable');

var parseIterable = function (iterator) {
	var done = false;
	var iterableResponse;
	var tempArray = [];

	if (iterator && typeof iterator.next === 'function') {
		while (!done) {
			iterableResponse = iterator.next();
			if (
				has(iterableResponse, 'value')
				&& has(iterableResponse, 'done')
			) {
				if (iterableResponse.done === true) {
					done = true;
					break; // eslint-disable-line no-restricted-syntax

				} else if (iterableResponse.done !== false) {
					break; // eslint-disable-line no-restricted-syntax
				}

				tempArray.push(iterableResponse.value);
			} else if (iterableResponse.done === true) {
				done = true;
				break; // eslint-disable-line no-restricted-syntax
			} else {
				break; // eslint-disable-line no-restricted-syntax
			}
		}
	}

	return done ? tempArray : false;
};

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
var iteratorSymbol;
var forOf;
var hasSet = !!global.Set && isCallable(Set.prototype.values);
var hasMap = !!global.Map && isCallable(Map.prototype.entries);

if (hasSymbols) {
	iteratorSymbol = Symbol.iterator;
} else {
	var supportsStrIterator = (function () {
		try {
			var supported = false;
			var obj = { // eslint-disable-line no-unused-vars
				'@@iterator': function () {
					return {
						'next': function () {
							supported = true;
							return {
								'done': true,
								'value': undefined
							};
						}
					};
				}
			};

			Function('obj', // eslint-disable-line no-new-func
				'for (var x of obj) {}'
			)(obj);
			return supported;
		} catch (e) {
			return false;
		}
	}());

	if (supportsStrIterator) {
		iteratorSymbol = '@@iterator';
	} else {
		try {
			if (Function('for (var x of [0]) x;')() === 0) { // eslint-disable-line no-new-func
				forOf = Function('iterable', 'var arr = []; for (var value of iterable) arr.push(value); return arr;'); // eslint-disable-line no-new-func
			}
		} catch (e) {
		}
	}
}

var isSet;
if (hasSet) {
	var setSize = Object.getOwnPropertyDescriptor(Set.prototype, 'size').get;
	isSet = function (set) {
		try {
			setSize.call(set);
			return true;
		} catch (e) {
			return false;
		}
	};
}

var isMap;
if (hasMap) {
	var mapSize = Object.getOwnPropertyDescriptor(Map.prototype, 'size').get;
	isMap = function (m) {
		try {
			mapSize.call(m);
			return true;
		} catch (e) {
			return false;
		}
	};
}

var setValues = hasSet && Set.prototype.values;
var mapEntries = hasMap && Map.prototype.entries;
var usingIterator = function (items) {
	if (has(items, iteratorSymbol)) {
		return items[iteratorSymbol]();
	} else if (hasSet && isSet(items)) {
		return setValues.call(items);
	} else if (hasMap && isMap(items)) {
		return mapEntries.call(items);
	}
	return items;
};

var strMatch = String.prototype.match;

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

	// variables for rebuilding array from iterator
	var arrayFromIterable = parseIterable(usingIterator(arrayLike));

	if (arrayFromIterable) {
		items = arrayFromIterable;
		len = arrayFromIterable.length;
	} else if (isString(items)) {
		items = strMatch.call(items, /[\uD800-\uDBFF][\uDC00-\uDFFF]?|[^\uD800-\uDFFF]|./g) || [];
		len = items.length;
	} else if (forOf) {
		// Safari 8's native Map or Set can't be iterated except with for..of
		items = forOf(items);
		len = items.length;
	}

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
