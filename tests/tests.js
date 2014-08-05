'use strict';

var test = require('tape');

require('../array-from.js');

test('Array.from has proper length', function (t) {
	t.equal(Array.from.length, 1);
	t.end();
});

test('Array.from is not enumerable', function (t) {
	t.notOk(Array.propertyIsEnumerable('from'));
	t.end();
});

test('requires an array-like object', function (t) {
	t.throws(function () { Array.from(); }, TypeError);
	t.throws(function () { Array.from(null); }, TypeError);
	t.end();
});

test('throws with invalid lengths', function (t) {
	t.throws(function () { Array.from({ length: Infinity }); }, RangeError);
	t.throws(function () { Array.from({ length: Math.pow(2, 32) }); }, RangeError);
	t.end();
});

test('works with primitives', function (t) {
	t.deepEqual(Array.from(false), []);
	t.deepEqual(Array.from(true), []);
	t.deepEqual(Array.from(-Infinity), []);
	t.deepEqual(Array.from(-0), []);
	t.deepEqual(Array.from(0), []);
	t.deepEqual(Array.from(1), []);
	t.deepEqual(Array.from(Infinity), []);
	t.end();
});

test('works with objects', function (t) {
	t.deepEqual(Array.from({}), []);
	t.deepEqual(Array.from({ a: 1 }), []);
	t.end();
});

test('works with arrays', function (t) {
	t.deepEqual(Array.from([]), []);
	t.deepEqual(Array.from([1, 2, 3]), [1, 2, 3]);
	t.deepEqual(Array.from([4, 5, 6]), [4, 5, 6]);
	t.end();
});

test('it fills holes in arrays', function (t) {
	var arr = [1, 2, 3];
	delete arr[1];
	t.deepEqual(Array.from(arr), [1, undefined, 3]);
	t.deepEqual(Array.from([4, , 6]), [4, undefined, 6]);
	t.end();
});

test('it includes Object.prototype values when it is polluted', function (t) {
	Object.prototype[1] = 42;
	t.deepEqual(Array.from({ length: 3, 0: 1, 2: 3 }), [1, 42, 3]);
	delete Object.prototype[1];
	t.end();
});

test('works with arraylike objects', function (t) {
	t.deepEqual(Array.from({ length: 1 }), [void 0]);
	t.deepEqual(Array.from({ 0: 'a', 1: 'b', length: 2 }), ['a', 'b']);
	t.end();
});

test('works with a mapping function', function (t) {
	var original = [1, 2, 3];
	var actual = Array.from(original, function (value, index) {
		t.equal(value, original[index], 'value and index are correct');
		t.equal(arguments.length, 2, 'value and index are only arguments passed to the mapping function');
		return value * 2;
	});
	t.deepEqual(actual, [2, 4, 6]);

	t.test('accepts an object thisArg', function (st) {
		var context = {};
		Array.from(original, function (value, index) {
			t.equal(this, context, 'given context is the actual context');
		}, context);
		st.end();
	});

	t.test('accepts a primitive thisArg', function (st) {
		Array.from(original, function (value, index) {
			st.equal(this.valueOf(), 42, 'context valueOf() is correct');
			st.equal(Object.prototype.toString.call(this), '[object Number]', 'context "[[Class]]" is correct');
		}, 42);
		st.end();
	});

	t.test('accepts a falsy thisArg', function (st) {
		Array.from(original, function (value, index) {
			st.equal(this.valueOf(), false, 'context valueOf() is correct');
			st.equal(Object.prototype.toString.call(this), '[object Boolean]', 'context "[[Class]]" is correct');
		}, false);
		st.end();
	});

	t.end();
});

test('works when called from a non-constructor context', function (t) {
	var from = Array.from;
	t.deepEqual(Array.from.call(null, { length: 1, 0: 'a' }), ['a']);
	t.deepEqual(from({ length: 1, 0: 'a' }), ['a']);
	t.end();
});

// These tests take way too long to execute, sadly:
test.skip('works with very large lengths', function (t) {
	t.equals(Array.from({ length: 0xFFFFFFFF }).length, 0xFFFFFFFF);
	var Constructor = function (length) {
		this.length = length;
		return this;
	};
	t.equals(Array.from.call(Constructor, { length: 0xFFFFFFFF }).length, 0xFFFFFFFF);
	t.equals(Array.from.call(Constructor, { length: 0xFFFFFFFF + 1 }).length, 0xFFFFFFFF + 1 );
	t.equals(Array.from.call(Constructor, { length: 0x1FFFFFFFFFFFFF }).length, 0x1FFFFFFFFFFFFF);
	t.equals(Array.from.call(Constructor, { length: 0x1FFFFFFFFFFFFF + 1 }).length, 0x1FFFFFFFFFFFFF);
	t.end();
});
