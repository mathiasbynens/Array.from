'use strict';

var AdvanceStringIndex = require('es-abstract/2021/AdvanceStringIndex');
var ArrayCreate = require('es-abstract/2021/ArrayCreate');
var Call = require('es-abstract/2021/Call');
var CreateDataPropertyOrThrow = require('es-abstract/2021/CreateDataPropertyOrThrow');
var Get = require('es-abstract/2021/Get');
var GetIterator = require('es-abstract/2021/GetIterator');
var GetMethod = require('es-abstract/2021/GetMethod');
var IsArray = require('es-abstract/2021/IsArray');
var IsCallable = require('es-abstract/2021/IsCallable');
var IsConstructor = require('es-abstract/2021/IsConstructor');
var IteratorClose = require('es-abstract/2021/IteratorClose');
var IteratorStep = require('es-abstract/2021/IteratorStep');
var IteratorValue = require('es-abstract/2021/IteratorValue');
var LengthOfArrayLike = require('es-abstract/2021/LengthOfArrayLike');
var Set = require('es-abstract/2021/Set');
var ToObject = require('es-abstract/2021/ToObject');
var ToString = require('es-abstract/2021/ToString');
var Type = require('es-abstract/2021/Type');

var getIteratorMethod = require('es-abstract/helpers/getIteratorMethod');

var getIteratorES = {
	'AdvanceStringIndex': AdvanceStringIndex,
	'GetMethod': GetMethod,
	'IsArray': IsArray,
	'Type': Type
};

var makeThrower = function (err) {
	return function thrower() {
		throw err;
	};
};

module.exports = function from(items) {
	var C = this;
	if (items === null || typeof items === 'undefined') {
		throw new TypeError('`Array.from` requires an array-like object, not `null` or `undefined`');
	}
	var mapFn;
	if (arguments.length > 1 && typeof arguments[1] !== 'undefined') {
		mapFn = arguments[1];
		if (!IsCallable(mapFn)) {
			throw new TypeError('When provided, the second argument to `Array.from` must be a function');
		}
	}
	var thisArg = arguments.length > 2 ? arguments[2] : void undefined;

	var usingIterator = getIteratorMethod(getIteratorES, items);

	if (typeof usingIterator !== 'undefined') {
		var A = IsConstructor(C) ? ToObject(new C(0)) : ArrayCreate(0);
		var iteratorRecord = GetIterator(items, 'sync', usingIterator);
		var k = 0;
		while (true) { // eslint-disable-line no-constant-condition
			if (k >= Math.pow(2, 53) - 1) {
				var error = new TypeError('wtf');
				return IteratorClose(
					iteratorRecord,
					makeThrower(error)
				);
			}
			var Pk = ToString(k);
			var next = IteratorStep(iteratorRecord);
			if (!next) {
				Set(A, 'length', k, true);
				return A;
			}
			var nextValue = IteratorValue(next);
			var mappedValue;
			if (mapFn) {
				try {
					mappedValue = Call(mapFn, thisArg, [nextValue, k]);
				} catch (e) {
					IteratorClose(
						iteratorRecord,
						function () { throw e; }
					);
				}
			} else {
				mappedValue = nextValue;
			}

			try {
				CreateDataPropertyOrThrow(A, Pk, mappedValue);
			} catch (e) {
				IteratorClose(
					iteratorRecord,
					function () { throw e; }
				);
			}
			k += 1;
		}
	}

	var values = items;

	var arrayLike = ToObject(values);
	var len = LengthOfArrayLike(arrayLike);
	/* eslint no-redeclare: 0 */
	var A = IsConstructor(C) ? ToObject(new C(len)) : ArrayCreate(len);
	var k = 0;
	var kValue;
	var mappedValue;

	while (k < len) {
		var Pk = ToString(k);
		kValue = Get(arrayLike, Pk);
		if (mapFn) {
			mappedValue = typeof thisArg === 'undefined' ? mapFn(kValue, k) : Call(mapFn, thisArg, [kValue, k]);
		} else {
			mappedValue = kValue;
		}
		CreateDataPropertyOrThrow(A, Pk, mappedValue);
		k += 1;
	}
	A.length = len;
	return A;
};
