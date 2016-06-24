'use strict';

/* eslint-disable no-invalid-this */

var test = require('tape');
var ES = require('es-abstract/es6');

var runTests = function runTests(arrayFrom) {
	test('from has proper length', function (t) {
		t.equal(arrayFrom.length, 1);
		t.end();
	});

	var methodExists = ES.IsCallable(Array.from);

	test('from is not enumerable', { 'skip': !methodExists }, function (t) {
		t.notOk(Object.prototype.propertyIsEnumerable.call(Array, 'from'));
		t.end();
	});

	test('requires an array-like object', function (t) {
		t.throws(function () { arrayFrom(); }, TypeError);
		t.throws(function () { arrayFrom(null); }, TypeError);
		t.end();
	});

	test('throws with invalid lengths', function (t) {
		t.throws(function () { arrayFrom({ 'length': Infinity }); }, RangeError);
		t.throws(function () { arrayFrom({ 'length': Math.pow(2, 32) }); }, RangeError);
		t.end();
	});

	test('swallows negative lengths', function (t) {
		t.equal(arrayFrom({ 'length': -1 }).length, 0);
		t.equal(arrayFrom({ 'length': -Infinity }).length, 0);
		t.equal(arrayFrom({ 'length': -0 }).length, 0);
		t.equal(arrayFrom({ 'length': -42 }).length, 0);
		t.end();
	});

	test('works with primitives', function (t) {
		t.deepEqual(arrayFrom(false), []);
		t.deepEqual(arrayFrom(true), []);
		t.deepEqual(arrayFrom(-Infinity), []);
		t.deepEqual(arrayFrom(-0), []);
		t.deepEqual(arrayFrom(0), []);
		t.deepEqual(arrayFrom(1), []);
		t.deepEqual(arrayFrom(Infinity), []);
		t.end();
	});

	test('works with strings', function (t) {
		t.deepEqual(arrayFrom(''), []);
		t.deepEqual(arrayFrom('abc'), 'abc'.split(''));
		t.end();
	});

	test('works with objects', function (t) {
		t.deepEqual(arrayFrom({}), []);
		t.deepEqual(arrayFrom({ 'a': 1 }), []);
		t.end();
	});

	test('works with arrays', function (t) {
		t.deepEqual(arrayFrom([]), []);
		t.deepEqual(arrayFrom([1, 2, 3]), [1, 2, 3]);
		t.deepEqual(arrayFrom([4, 5, 6]), [4, 5, 6]);
		t.end();
	});

	test('it fills holes in arrays', function (t) {
		var arr = [1, 2, 3];
		delete arr[1];
		t.deepEqual(arrayFrom(arr), [1, undefined, 3]);
		/* eslint-disable no-sparse-arrays */
		t.deepEqual(arrayFrom([4, , 6]), [4, undefined, 6]);
		t.end();
	});

	test('it includes Object.prototype values when it is polluted', function (t) {
		/* eslint-disable no-extend-native */
		Object.prototype[1] = 42;
		t.deepEqual(arrayFrom({ 'length': 3, '0': 1, '2': 3 }), [1, 42, 3]);
		delete Object.prototype[1];
		t.end();
	});

	test('works with arraylike objects', function (t) {
		t.deepEqual(arrayFrom({ 'length': 1 }), [void 0]);
		t.deepEqual(arrayFrom({ '0': 'a', '1': 'b', 'length': 2 }), ['a', 'b']);
		t.end();
	});

	test('throws with an invalid mapping function', function (t) {
		t.throws(function () { arrayFrom([], undefined); }, TypeError);
		t.throws(function () { arrayFrom([], null); }, TypeError);
		t.throws(function () { arrayFrom([], false); }, TypeError);
		t.throws(function () { arrayFrom([], true); }, TypeError);
		t.throws(function () { arrayFrom([], {}); }, TypeError);
		t.throws(function () { arrayFrom([], /a/g); }, TypeError);
		t.throws(function () { arrayFrom([], 'foo'); }, TypeError);
		t.throws(function () { arrayFrom([], 42); }, TypeError);
		t.end();
	});

	test('works with a mapping function', function (t) {
		var original = [1, 2, 3];
		var actual = arrayFrom(original, function (value, index) {
			t.equal(value, original[index], 'value and index are correct');
			t.equal(arguments.length, 2, 'value and index are only arguments passed to the mapping function');
			return value * 2;
		});
		t.deepEqual(actual, [2, 4, 6]);

		t.test('accepts an object thisArg', function (st) {
			var context = {};
			arrayFrom(original, function () {
				t.equal(this, context, 'given context is the actual context');
			}, context);
			st.end();
		});

		t.test('accepts a primitive thisArg', function (st) {
			arrayFrom(original, function () {
				st.equal(this.valueOf(), 42, 'context valueOf() is correct');
				st.equal(Object.prototype.toString.call(this), '[object Number]', 'context "[[Class]]" is correct');
			}, 42);
			st.end();
		});

		t.test('accepts a falsy thisArg', function (st) {
			arrayFrom(original, function () {
				st.equal(this.valueOf(), false, 'context valueOf() is correct');
				st.equal(Object.prototype.toString.call(this), '[object Boolean]', 'context "[[Class]]" is correct');
			}, false);
			st.end();
		});

		t.end();
	});

	test('works when called from a non-constructor context', function (t) {
		var from = arrayFrom;
		/* eslint-disable no-useless-call */
		t.deepEqual(from.call(null, { 'length': 1, '0': 'a' }), ['a']);
		t.deepEqual(arrayFrom({ 'length': 1, '0': 'a' }), ['a']);
		t.end();
	});

	test('no setters are called for indexes', { 'skip': !Object.defineProperty }, function (t) {
		var MyType = function () {};
		Object.defineProperty(MyType.prototype, '0', {
			'get': function () {},
			'set': function (x) { throw new Error('setter called: ' + x); }
		});
		var myInstance = new MyType();
		t.throws(function () { myInstance[0] = 'foo'; });

		var actual = arrayFrom.call(MyType, { '0': 'abc', 'length': 1 });
		var expected = new MyType();
		Object.defineProperty(expected, 0, { 'value': 'abc', 'enumerable': true, 'configurable': true, 'writable': true });
		Object.defineProperty(expected, 'length', { 'value': 1, 'enumerable': true, 'configurable': true, 'writable': true });
		t.deepEqual(actual, expected);
		t.ok(actual instanceof MyType);
		t.end();
	});

	test('allows shift without throwing type error', function (t) {
		t.doesNotThrow(Array.prototype.shift.bind(arrayFrom([1, 2, 3])));
		t.end();
	});

	// These tests take way too long to execute, sadly:
	/*
	test('works with very large lengths', function (t) {
		t.equals(arrayFrom({ 'length': 0xFFFFFFFF }).length, 0xFFFFFFFF);
		var Constructor = function (length) {
			this.length = length;
			return this;
		};
		t.equals(from.call(Constructor, { 'length': 0xFFFFFFFF }).length, 0xFFFFFFFF);
		t.equals(from.call(Constructor, { 'length': 0xFFFFFFFF + 1 }).length, 0xFFFFFFFF + 1 );
		t.equals(from.call(Constructor, { 'length': 0x1FFFFFFFFFFFFF }).length, 0x1FFFFFFFFFFFFF);
		t.equals(from.call(Constructor, { 'length': 0x1FFFFFFFFFFFFF + 1 }).length, 0x1FFFFFFFFFFFFF);
		t.end();
	});
	*/

	var functionsHaveNames = function f() {}.name === 'f';

	test('returns the correct name when called with toString', { 'skip': !functionsHaveNames }, function (t) {
		t.equal(arrayFrom.name, 'from', 'Array#from has name "from"');
		t.end();
	});
};

var from = require('../');

runTests(from.implementation);

runTests(from);

runTests(from.getPolyfill());

from.shim();

runTests(Array.from);
