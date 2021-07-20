// This file replaces `index.js` in bundlers like webpack or Rollup,

var nanoid = function nanoid() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 21;
  var id = '';
  var bytes = crypto.getRandomValues(new Uint8Array(size)); // A compact alternative for `for (var i = 0; i < step; i++)`.

  while (size--) {
    // It is incorrect to use bytes exceeding the alphabet size.
    // The following mask reduces the random byte in the 0-255 value
    // range to the 0-63 value range. Therefore, adding hacks, such
    // as empty string fallback or magic numbers, is unneccessary because
    // the bitmask trims bytes down to the alphabet size.
    var _byte = bytes[size] & 63;

    if (_byte < 36) {
      // `0-9a-z`
      id += _byte.toString(36);
    } else if (_byte < 62) {
      // `A-Z`
      id += (_byte - 26).toString(36).toUpperCase();
    } else if (_byte < 63) {
      id += '_';
    } else {
      id += '-';
    }
  }

  return id;
};

export { nanoid };
