'use strict';

var Call = require('es-abstract/2021/Call');
var CreateDataPropertyOrThrow = require('es-abstract/2021/CreateDataPropertyOrThrow');
var Get = require('es-abstract/2021/Get');
var IsCallable = require('es-abstract/2021/IsCallable');
var IsConstructor = require('es-abstract/2021/IsConstructor');
var ToObject = require('es-abstract/2021/ToObject');
var ToLength = require('es-abstract/2021/ToLength');
var ToString = require('es-abstract/2021/ToString');

var iterate = require('iterate-value');

module.exports = function from(items) {
	var C = this;
	if (items === null || typeof items === 'undefined') {
		throw new TypeError('`Array.from` requires an array-like object, not `null` or `undefined`');
	}
	var mapFn, T;
	if (typeof arguments[1] !== 'undefined') {
		mapFn = arguments[1];
		if (!IsCallable(mapFn)) {
			throw new TypeError('When provided, the second argument to `Array.from` must be a function');
		}
		if (arguments.length > 2) {
			T = arguments[2];
		}
	}

	var values;
	try {
		values = iterate(items);
	} catch (e) {
		values = items;
	}

	var arrayLike = ToObject(values);
	var len = ToLength(arrayLike.length);
	var A = IsConstructor(C) ? ToObject(new C(len)) : new Array(len);
	var k = 0;
	var kValue, mappedValue;

	while (k < len) {
		var Pk = ToString(k);
		kValue = Get(arrayLike, Pk);
		if (mapFn) {
			mappedValue = typeof T === 'undefined' ? mapFn(kValue, k) : Call(mapFn, T, [kValue, k]);
		} else {
			mappedValue = kValue;
		}
		CreateDataPropertyOrThrow(A, Pk, mappedValue);
		k += 1;
	}
	A.length = len;
	return A;
};
