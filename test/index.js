'use strict';

/* eslint-disable no-invalid-this */

var test = require('tape');
var IsCallable = require('es-abstract/2019/IsCallable');
var supportsDescriptors = require('define-properties').supportsDescriptors;
var hasSymbols = require('has-symbols')();

var makeIterable = function (array) {
	return array.slice();
};

var runTests = function run(arrayFrom) {
	test('from has proper length', function (t) {
		t.equal(arrayFrom.length, 1);
		t.end();
	});

	var methodExists = IsCallable(Array.from);

	test('from is not enumerable', { 'skip': !methodExists }, function (t) {
		t.notOk(Object.prototype.propertyIsEnumerable.call(Array, 'from'));
		t.end();
	});

	test('requires an array-like object', function (t) {
		t['throws'](function () { arrayFrom(); }, TypeError);
		t['throws'](function () { arrayFrom(null); }, TypeError);
		t.end();
	});

	test('throws with invalid lengths', function (t) {
		t['throws'](function () { arrayFrom({ 'length': Infinity }); }, RangeError);
		t['throws'](function () { arrayFrom({ 'length': Math.pow(2, 32) }); }, RangeError);
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

	test('works with primitive strings', function (t) {
		t.deepEqual(arrayFrom(''), []);
		t.deepEqual(arrayFrom('abc'), 'abc'.split(''));
		t.deepEqual(arrayFrom('a\nb\nc\n\n'), 'a\nb\nc\n\n'.split(''));
		t.deepEqual(arrayFrom('foo\uD834\uDF06bar'), ['f', 'o', 'o', '\uD834\uDF06', 'b', 'a', 'r']);
		t.deepEqual(arrayFrom('foo\uD834bar'), ['f', 'o', 'o', '\uD834', 'b', 'a', 'r']);
		t.deepEqual(arrayFrom('foo\uDF06bar'), ['f', 'o', 'o', '\uDF06', 'b', 'a', 'r']);
		t.end();
	});

	test('works with object strings', function (t) {
		t.deepEqual(arrayFrom(Object('')), []);
		t.deepEqual(arrayFrom(Object('abc')), 'abc'.split(''));
		t.deepEqual(arrayFrom(Object('a\nb\nc\n\n')), 'a\nb\nc\n\n'.split(''));
		t.deepEqual(arrayFrom(Object('foo\uD834\uDF06bar')), ['f', 'o', 'o', '\uD834\uDF06', 'b', 'a', 'r']);
		t.deepEqual(arrayFrom(Object('foo\uD834bar')), ['f', 'o', 'o', '\uD834', 'b', 'a', 'r']);
		t.deepEqual(arrayFrom(Object('foo\uDF06bar')), ['f', 'o', 'o', '\uDF06', 'b', 'a', 'r']);
		t.end();
	});

	test('ensure to use iterators with strings', { 'skip': !hasSymbols }, function (t) {
		var a = Object('a');
		var b = Object('b');
		a[Symbol.iterator] = function () { return b[Symbol.iterator](); };
		t.deepEqual(arrayFrom(a), ['b']);
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
		Object.prototype[4] = 42;
		t.deepEqual(arrayFrom({ '0': 1, '1': 2, '2': 3, '3': 4, 'length': 5 }), [1, 2, 3, 4, 42]);
		delete Object.prototype[4];
		t.end();
	});

	test('works with arraylike objects', function (t) {
		t.deepEqual(arrayFrom({ 'length': 1 }), [void 0]);
		t.deepEqual(arrayFrom({ '0': 'a', '1': 'b', 'length': 2 }), ['a', 'b']);
		t.end();
	});

	test('throws with an invalid mapping function', function (t) {
		t.doesNotThrow(function () { arrayFrom([], undefined); });
		t.doesNotThrow(function () { arrayFrom([], undefined, undefined); });
		t.doesNotThrow(function () { arrayFrom([], undefined, {}); });
		t['throws'](function () { arrayFrom([], null); }, TypeError);
		t['throws'](function () { arrayFrom([], false); }, TypeError);
		t['throws'](function () { arrayFrom([], true); }, TypeError);
		t['throws'](function () { arrayFrom([], {}); }, TypeError);
		t['throws'](function () { arrayFrom([], /a/g); }, TypeError);
		t['throws'](function () { arrayFrom([], 'foo'); }, TypeError);
		t['throws'](function () { arrayFrom([], 42); }, TypeError);
		t.end();
	});

	test('works with a mapping function', function (t) {
		var original = [1, 2, 3];

		t.test('with arrays', function (te) {
			var actual = arrayFrom(original, function (value, index) {
				te.equal(value, original[index], 'value and index are correct');
				te.equal(arguments.length, 2, 'value and index are only arguments passed to the mapping function');
				return value * 2;
			});
			te.deepEqual(actual, [2, 4, 6]);
			te.end();
		});

		t.test('with strings', function (te) {
			var actual = arrayFrom('abc', function (c) {
				return c.toUpperCase();
			});
			te.deepEqual(actual, ['A', 'B', 'C']);
			te.end();
		});

		t.test('accepts an object thisArg', function (st) {
			var context = {};
			arrayFrom(original, function () {
				st.equal(this, context, 'given context is the actual context');
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
		t.deepEqual(from.call(null, { '0': 'a', 'length': 1 }), ['a']);
		t.deepEqual(arrayFrom({ '0': 'a', 'length': 1 }), ['a']);
		t.end();
	});

	var numericPropertySetterBug = supportsDescriptors && (function () {
		// This is a bug in webkit which affects Safari < 10
		// https://bugs.webkit.org/show_bug.cgi?id=151812
		try {
			var obj = {};
			Object.defineProperty(obj, '0', {
				'get': function () {}, // eslint-disable-line getter-return
				'set': function () { throw new Error(); }
			});
			obj[0] = 1;
			return false;
		} catch (e) {
			return true;
		}
	}());

	test('no setters are called for indexes', { 'skip': !supportsDescriptors || numericPropertySetterBug }, function (t) {
		var MyType = function () {};
		Object.defineProperty(MyType.prototype, '0', {
			'get': function () {}, // eslint-disable-line getter-return
			'set': function (x) { throw new Error('setter called: ' + x); }
		});
		var myInstance = new MyType();
		t['throws'](function () { myInstance[0] = 'foo'; });

		var actual = arrayFrom.call(MyType, { '0': 'abc', 'length': 1 });
		var expected = new MyType();
		Object.defineProperty(expected, 0, { 'configurable': true, 'enumerable': true, 'value': 'abc', 'writable': true });
		Object.defineProperty(expected, 'length', { 'configurable': true, 'enumerable': true, 'value': 1, 'writable': true });
		t.deepEqual(actual, expected);
		t.ok(actual instanceof MyType);
		t.end();
	});

	test('allows shift without throwing type error', function (t) {
		t.doesNotThrow(Array.prototype.shift.bind(arrayFrom([1, 2, 3])));
		t.end();
	});

	test('works with iterable objects', function (t) {
		(function () {
			t.deepEqual(arrayFrom(arguments), [1, 2, 3]);
		}(1, 2, 3));

		t.test('works with Array.prototype.values', { 'skip': !Array.prototype.values }, function (te) {
			te.deepEqual(arrayFrom([1, 2, 3].values()), [1, 2, 3]);
			te.end();
		});

		var hasMap = typeof Map === 'function';
		t.test('works with Map objects', { 'skip': !hasMap }, function (te) {
			var map = new Map();
			map.set(1, 2);
			map.set(3, 4);
			te.deepEqual(arrayFrom(map), [[1, 2], [3, 4]], 'works with default iterator');
			te.end();
		});

		var hasMapValues = hasMap && typeof Map.prototype.values === 'function';
		t.test('works with Map iterators', { 'skip': !hasMapValues }, function (te) {
			var map = new Map();
			map.set(1, 2);
			map.set(3, 4);
			te.deepEqual(arrayFrom(map.values()), [2, 4], 'works with values iterator');
			te.deepEqual(arrayFrom(map.keys()), [1, 3], 'works with keys iterator');
			te.deepEqual(arrayFrom(map.entries()), [[1, 2], [3, 4]], 'works with entries iterator');
			te.end();
		});

		var hasSet = typeof Set === 'function';
		t.test('works with Set objects', { 'skip': !hasSet }, function (te) {
			var set = new Set();
			set.add(1);
			set.add(2);
			set.add(3);
			te.deepEqual(arrayFrom(set), [1, 2, 3], 'works with default iterator');
			te.end();
		});

		var hasSetValues = hasSet && typeof Set.prototype.values === 'function';
		t.test('works with Set iterators', { 'skip': !hasSetValues }, function (te) {
			var set = new Set();
			set.add(1);
			set.add(2);
			set.add(3);
			te.deepEqual(arrayFrom(set.values()), [1, 2, 3], 'works with values iterator');
			te.deepEqual(arrayFrom(set.keys()), [1, 2, 3], 'works with keys iterator');
			te.deepEqual(arrayFrom(set.entries()), [[1, 1], [2, 2], [3, 3]], 'works with entries iterator');
			te.end();
		});

		var codePoints = ['a', '\uD834\uDF06', 'b'];
		t.deepEqual(arrayFrom(makeIterable(codePoints)), codePoints);
		t.deepEqual(arrayFrom.call(null, makeIterable(codePoints)), codePoints);
		t.deepEqual(arrayFrom.apply(null, [makeIterable(codePoints)]), codePoints);
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
		t.equals(arrayFrom.call(Constructor, { 'length': 0xFFFFFFFF }).length, 0xFFFFFFFF);
		t.equals(arrayFrom.call(Constructor, { 'length': 0xFFFFFFFF + 1 }).length, 0xFFFFFFFF + 1 );
		t.equals(arrayFrom.call(Constructor, { 'length': 0x1FFFFFFFFFFFFF }).length, 0x1FFFFFFFFFFFFF);
		t.equals(arrayFrom.call(Constructor, { 'length': 0x1FFFFFFFFFFFFF + 1 }).length, 0x1FFFFFFFFFFFFF);
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

require('../auto');

runTests(Array.from);
