'use strict';

(function () {
	function hexNumber(char) {
		var code = char.toLowerCase().charCodeAt(0);
		// 0-9
		if (code >= 48 && code <= 57) {
			return code - 48;
		}
		// a-f
		if (code >= 97 && code <= 102) {
			return code - 87;
		}
		return code;
	}
	function add(sstr, dstr, scale) {
		var slen = sstr.length, dlen = dstr.length;
		var res = [];
		var carry = 0;
		var i = 0;
		var n;
		while(i < slen && i < dlen) {
			n = hexNumber(sstr[slen - i - 1]) + hexNumber(dstr[dlen - i - 1]) + carry;
			carry = Math.floor(n / scale);
			res.push(n % scale);
			i++;
		}
		while(i < slen) {
			n = hexNumber(sstr[slen - i - 1]) + carry;
			carry = Math.floor(n / scale);
			res.push(n % scale);
			i++;
		}
		while(i < dlen) {
			n = hexNumber(dstr[dlen - i - 1]) + carry;
			carry = Math.floor(n / scale);
			res.push(n % scale);
			i++;
		}
		while(carry > 0) {
			res.push(carry % scale);
			carry = Math.floor(carry / scale);
		}
		return res.reverse().join('');
	}
	function multiply(str, multiplier, scale) {
		var res = [];
		var carry = 0;
		var i = str.length;
		var n;
		while(--i >= 0) {
			n = hexNumber(str[i]) * multiplier + carry;
			carry = Math.floor(n / scale);
			res.push(n % scale);
		}
		while(carry > 0) {
			res.push(carry % scale);
			carry = Math.floor(carry / scale);
		}
		return res.reverse().join('');
	}
	function hex2Decimal(hex) {
		if (typeof Buffer !== 'undefined' && hex instanceof Buffer) {
			hex = buff.toString('hex');
		}
		if (typeof hex !== 'string') {
			hex = String(hex);
		}
		if (!(/^[0-9a-fA-F]+$/.test(hex))) {
			return hex;
		}
		var res = '0';
		var i = 0;
		while(i < hex.length) {
			var n = hex[hex.length - 1 - i];
			var j = i;
			while(j--) {
				n = multiply(n, 16, 10);
			}
			res = add(res, n, 10);
			i++;
		}
		return res;
	}
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = hex2Decimal;
	} else if ( typeof define === "function" && define.amd ) {
		define("hex2Decimal", [], function () { return hex2Decimal; })
	} else {
		window.hex2Decimal = hex2Decimal;
	}
})();