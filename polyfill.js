'use strict';

var ES = require('es-abstract/es6');

module.exports = function getPolyfill() {
	var implemented = ES.IsCallable(Array.from) && (function () {
		try {
			Array.from({ length: -Infinity });
			return true;
		} catch (e) {
			return false;
		}
	})() && (function () {
		try {
			Array.from([], undefined);
			return false;
		} catch (e) {
			return true;
		}
	})();

	return implemented ? Array.from : require('./implementation');
};
