'use strict';
var assert = require('assert');
var assertEquals = assert.equal;
var assertDeepEquals = assert.deepEqual;
var assertThrows = assert['throws'];

require('../array-from.js');

Object.prototype[1] = 42;

assertEquals(Array.from.length, 1);
assertEquals(Array.propertyIsEnumerable('from'), false);

assertDeepEquals(Array.from({ '0': 'a', '1': 'b', '2': 'c', 'length': 3 }), ['a', 'b', 'c']);
assertDeepEquals(Array.from({ 'length': 0 }), []);
assertDeepEquals(Array.from({ 'length': -1 }), []);
assertDeepEquals(Array.from({ 'length': -Infinity }), []);
assertThrows(function() { Array.from({ 'length': Infinity }); }, RangeError);
assertThrows(function() { Array.from(undefined); }, TypeError);
assertThrows(function() { Array.from(null); }, TypeError);
assertDeepEquals(Array.from(false), []);
assertDeepEquals(Array.from(-Infinity), []);
assertDeepEquals(Array.from(-0), []);
assertDeepEquals(Array.from(+0), []);
assertDeepEquals(Array.from(1), []);
assertDeepEquals(Array.from(+Infinity), []);
assertDeepEquals(Array.from({}), []);
assertDeepEquals(Array.from({ 'length': 1 }), Array(1));
assertDeepEquals(Array.from({ '0': 'a', '1': 'b', 'length': 2 }, function(x) { return x + x; }), ['aa', 'bb']);
assertDeepEquals(Array.from({ '0': 'a', '1': 'b', 'length': 2 }, function(x) { return String(this); }, undefined), ['undefined', 'undefined']);
assertDeepEquals(Array.from({ '0': 'a', '1': 'b', 'length': 2 }, function(x) { return String(this); }, 'x'), ['x', 'x']);
assertThrows(function() { Array.from({}, 'foo', 'x'); }, TypeError);

// These tests take way too long to execute, sadly:
// assertEquals(Array.from({ 'length': 0xFFFFFFFF }).length, 0xFFFFFFFF);
// var Constructor = function(length) {
// 	this.length = length;
// 	return this;
// };
// assertEquals(Array.from.call(Constructor, { 'length': 0xFFFFFFFF }).length, 0xFFFFFFFF);
assertThrows(function() { Array.from({ 'length': 0xFFFFFFFF + 1 }); }, RangeError);
// assertEquals(Array.from.call(Constructor, { 'length': 0xFFFFFFFF + 1 }).length, 0xFFFFFFFF + 1 );
// assertEquals(Array.from.call(Constructor, { 'length': 0x1FFFFFFFFFFFFF }).length, 0x1FFFFFFFFFFFFF);
// assertEquals(Array.from.call(Constructor, { 'length': 0x1FFFFFFFFFFFFF + 1 }).length, 0x1FFFFFFFFFFFFF);

assertDeepEquals(Array.from.call(null, { 'length': 1, '0': 'a' }), ['a']);

assertEquals(Array.from({ '__proto__': { '0': 'abc', 'length': 1 } })[0], 'abc');

assertThrows(function() { Array.from.call(function() { return Object.freeze({}); }, {}); }, TypeError);

// Ensure no setters are called for the indexes
Object.defineProperty(Array.prototype, '0', {
	'set': function(x) {
		throw Error('Setter called: ' + x);
	}
});
assertDeepEquals(Array.from({ '0': 'abc', 'length': 1 }), ['abc']);
