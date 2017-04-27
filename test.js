'use strict'

var assert = require('assert');
var hex2Decimal = require('./index');

describe('hex2Decimal', function() {
	it('should work as expect', function(done) {
		var res = hex2Decimal('3fae39239401000');
		assert.equal(res, '286791743456677888');
		done();
	});
	it('should work as expect', function(done) {
		var res = hex2Decimal('7fffffffffffffff');
		assert.equal(res, '9223372036854775807');
		done();
	});
});
