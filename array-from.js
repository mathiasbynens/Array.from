/*! http://mths.be/array-from v0.1.0 by @mathias */
if (!Array.from) {
	(function () {
		'use strict';
		var defineProperty = (function () {
			// IE 8 only supports `Object.defineProperty` on DOM elements
			try {
				var object = {};
				var $defineProperty = Object.defineProperty;
				var result = $defineProperty(object, object, object) && $defineProperty;
			} catch(error) {}
			return result;
		}());
		var toStr = Object.prototype.toString;
		var isCallable = function (fn) {
			return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
		};
		var toInteger = function (value) {
			var number = Number(value);
			if (isNaN(number)) { return 0; }
			if (number === 0 || !isFinite(number)) { return number; }
			return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
		};
		var maxSafeInteger = Math.pow(2, 53) - 1;
		var toLength = function (value) {
			var len = toInteger(value);
			return Math.min(Math.max(len, 0), maxSafeInteger);
		};
		var isConstructor = function (Constructor) {
			try {
				new Constructor();
				return true;
			} catch(_) {
				return false;
			}
		};
		var from = function (arrayLike) {
			var Me = this;
			if (arrayLike == null) {
				throw TypeError("Array.from requires an array-like object - not null or undefined");
			}
			var items = Object(arrayLike);
			var mapFn = arguments.length > 1 ? arguments[1] : undefined;
			var T = arguments.length > 2 ? arguments[2] : undefined;
			var mapping = true;
			if (mapFn === undefined) {
				mapping = false;
			} else if (!isCallable(mapFn)) {
				throw TypeError('Array.from: when provided, the second argument must be a function');
			}
			var len = toLength(items.length);
			var A = isConstructor(Me) ? new Me(len) : new Array(len);
			var k = 0;
			var kValue;
			var mappedValue;
			while (k < len) {
				if (k in items) { // note: `HasProperty` (not `HasOwnProperty`)
					kValue = items[k];
					mappedValue = mapping ? mapFn.call(T, kValue, k, items) : kValue;
					A[k] = mappedValue;
				}
				++k;
			}
			A.length = len;
			return A;
		};
		if (defineProperty) {
			defineProperty(Array, 'from', {
				'value': from,
				'configurable': true,
				'writable': true
			});
		} else {
			Array.from = from;
		}
	}());
}

