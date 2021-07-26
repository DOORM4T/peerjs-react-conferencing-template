import { r as react } from '../common/index-9f312225.js';
import { c as createCommonjsModule, a as commonjsGlobal } from '../common/_commonjsHelpers-4f955397.js';
import { r as reactDom } from '../common/index-5da45d9f.js';

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        before = _this.prepend ? _this.container.firstChild : _this.before;
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? "production" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();

var e = "-ms-";
var r = "-moz-";
var a = "-webkit-";
var c = "comm";
var n = "rule";
var t = "decl";
var i = "@import";
var p = "@keyframes";
var k = Math.abs;
var d = String.fromCharCode;

function m(e, r) {
  return (((r << 2 ^ z(e, 0)) << 2 ^ z(e, 1)) << 2 ^ z(e, 2)) << 2 ^ z(e, 3);
}

function g(e) {
  return e.trim();
}

function x(e, r) {
  return (e = r.exec(e)) ? e[0] : e;
}

function y(e, r, a) {
  return e.replace(r, a);
}

function j(e, r) {
  return e.indexOf(r);
}

function z(e, r) {
  return e.charCodeAt(r) | 0;
}

function C(e, r, a) {
  return e.slice(r, a);
}

function A(e) {
  return e.length;
}

function M(e) {
  return e.length;
}

function O(e, r) {
  return r.push(e), e;
}

function S(e, r) {
  return e.map(r).join("");
}

var q = 1;
var B = 1;
var D = 0;
var E = 0;
var F = 0;
var G = "";

function H(e, r, a, c, n, t, s) {
  return {
    value: e,
    root: r,
    parent: a,
    type: c,
    props: n,
    children: t,
    line: q,
    column: B,
    length: s,
    "return": ""
  };
}

function I(e, r, a) {
  return H(e, r.root, r.parent, a, r.props, r.children, 0);
}

function J() {
  return F;
}

function K() {
  F = E > 0 ? z(G, --E) : 0;
  if (B--, F === 10) B = 1, q--;
  return F;
}

function L() {
  F = E < D ? z(G, E++) : 0;
  if (B++, F === 10) B = 1, q++;
  return F;
}

function N() {
  return z(G, E);
}

function P() {
  return E;
}

function Q(e, r) {
  return C(G, e, r);
}

function R(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;

    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;

    case 58:
      return 3;

    case 34:
    case 39:
    case 40:
    case 91:
      return 2;

    case 41:
    case 93:
      return 1;
  }

  return 0;
}

function T(e) {
  return q = B = 1, D = A(G = e), E = 0, [];
}

function U(e) {
  return G = "", e;
}

function V(e) {
  return g(Q(E - 1, _(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}

function X(e) {
  while (F = N()) {
    if (F < 33) L();else break;
  }

  return R(e) > 2 || R(F) > 3 ? "" : " ";
}

function Z(e, r) {
  while (--r && L()) {
    if (F < 48 || F > 102 || F > 57 && F < 65 || F > 70 && F < 97) break;
  }

  return Q(e, P() + (r < 6 && N() == 32 && L() == 32));
}

function _(e) {
  while (L()) {
    switch (F) {
      case e:
        return E;

      case 34:
      case 39:
        return _(e === 34 || e === 39 ? e : F);

      case 40:
        if (e === 41) _(e);
        break;

      case 92:
        L();
        break;
    }
  }

  return E;
}

function ee(e, r) {
  while (L()) {
    if (e + F === 47 + 10) break;else if (e + F === 42 + 42 && N() === 47) break;
  }

  return "/*" + Q(r, E - 1) + "*" + d(e === 47 ? e : L());
}

function re(e) {
  while (!R(N())) {
    L();
  }

  return Q(e, E);
}

function ae(e) {
  return U(ce("", null, null, null, [""], e = T(e), 0, [0], e));
}

function ce(e, r, a, c, n, t, s, u, i) {
  var f = 0;
  var o = 0;
  var l = s;
  var v = 0;
  var h = 0;
  var p = 0;
  var b = 1;
  var w = 1;
  var $ = 1;
  var k = 0;
  var m = "";
  var g = n;
  var x = t;
  var j = c;
  var z = m;

  while (w) {
    switch (p = k, k = L()) {
      case 34:
      case 39:
      case 91:
      case 40:
        z += V(k);
        break;

      case 9:
      case 10:
      case 13:
      case 32:
        z += X(p);
        break;

      case 92:
        z += Z(P() - 1, 7);
        continue;

      case 47:
        switch (N()) {
          case 42:
          case 47:
            O(te(ee(L(), P()), r, a), i);
            break;

          default:
            z += "/";
        }

        break;

      case 123 * b:
        u[f++] = A(z) * $;

      case 125 * b:
      case 59:
      case 0:
        switch (k) {
          case 0:
          case 125:
            w = 0;

          case 59 + o:
            if (h > 0 && A(z) - l) O(h > 32 ? se(z + ";", c, a, l - 1) : se(y(z, " ", "") + ";", c, a, l - 2), i);
            break;

          case 59:
            z += ";";

          default:
            O(j = ne(z, r, a, f, o, n, u, m, g = [], x = [], l), t);
            if (k === 123) if (o === 0) ce(z, r, j, j, g, t, l, u, x);else switch (v) {
              case 100:
              case 109:
              case 115:
                ce(e, j, j, c && O(ne(e, j, j, 0, 0, n, u, m, n, g = [], l), x), n, x, l, u, c ? g : x);
                break;

              default:
                ce(z, j, j, j, [""], x, l, u, x);
            }
        }

        f = o = h = 0, b = $ = 1, m = z = "", l = s;
        break;

      case 58:
        l = 1 + A(z), h = p;

      default:
        if (b < 1) if (k == 123) --b;else if (k == 125 && b++ == 0 && K() == 125) continue;

        switch (z += d(k), k * b) {
          case 38:
            $ = o > 0 ? 1 : (z += "\f", -1);
            break;

          case 44:
            u[f++] = (A(z) - 1) * $, $ = 1;
            break;

          case 64:
            if (N() === 45) z += V(L());
            v = N(), o = A(m = z += re(P())), k++;
            break;

          case 45:
            if (p === 45 && A(z) == 2) b = 0;
        }

    }
  }

  return t;
}

function ne(e, r, a, c, t, s, u, i, f, o, l) {
  var v = t - 1;
  var h = t === 0 ? s : [""];
  var p = M(h);

  for (var b = 0, w = 0, $ = 0; b < c; ++b) {
    for (var d = 0, m = C(e, v + 1, v = k(w = u[b])), x = e; d < p; ++d) {
      if (x = g(w > 0 ? h[d] + " " + m : y(m, /&\f/g, h[d]))) f[$++] = x;
    }
  }

  return H(e, r, a, t === 0 ? n : i, f, o, l);
}

function te(e, r, a) {
  return H(e, r, a, c, d(J()), C(e, 2, -2), 0);
}

function se(e, r, a, c) {
  return H(e, r, a, t, C(e, 0, c), C(e, c + 1, -1), c);
}

function ue(c, n) {
  switch (m(c, n)) {
    case 5103:
      return a + "print-" + c + c;

    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return a + c + c;

    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return a + c + r + c + e + c + c;

    case 6828:
    case 4268:
      return a + c + e + c + c;

    case 6165:
      return a + c + e + "flex-" + c + c;

    case 5187:
      return a + c + y(c, /(\w+).+(:[^]+)/, a + "box-$1$2" + e + "flex-$1$2") + c;

    case 5443:
      return a + c + e + "flex-item-" + y(c, /flex-|-self/, "") + c;

    case 4675:
      return a + c + e + "flex-line-pack" + y(c, /align-content|flex-|-self/, "") + c;

    case 5548:
      return a + c + e + y(c, "shrink", "negative") + c;

    case 5292:
      return a + c + e + y(c, "basis", "preferred-size") + c;

    case 6060:
      return a + "box-" + y(c, "-grow", "") + a + c + e + y(c, "grow", "positive") + c;

    case 4554:
      return a + y(c, /([^-])(transform)/g, "$1" + a + "$2") + c;

    case 6187:
      return y(y(y(c, /(zoom-|grab)/, a + "$1"), /(image-set)/, a + "$1"), c, "") + c;

    case 5495:
    case 3959:
      return y(c, /(image-set\([^]*)/, a + "$1" + "$`$1");

    case 4968:
      return y(y(c, /(.+:)(flex-)?(.*)/, a + "box-pack:$3" + e + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + a + c + c;

    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return y(c, /(.+)-inline(.+)/, a + "$1$2") + c;

    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (A(c) - 1 - n > 6) switch (z(c, n + 1)) {
        case 109:
          if (z(c, n + 4) !== 45) break;

        case 102:
          return y(c, /(.+:)(.+)-([^]+)/, "$1" + a + "$2-$3" + "$1" + r + (z(c, n + 3) == 108 ? "$3" : "$2-$3")) + c;

        case 115:
          return ~j(c, "stretch") ? ue(y(c, "stretch", "fill-available"), n) + c : c;
      }
      break;

    case 4949:
      if (z(c, n + 1) !== 115) break;

    case 6444:
      switch (z(c, A(c) - 3 - (~j(c, "!important") && 10))) {
        case 107:
          return y(c, ":", ":" + a) + c;

        case 101:
          return y(c, /(.+:)([^;!]+)(;|!.+)?/, "$1" + a + (z(c, 14) === 45 ? "inline-" : "") + "box$3" + "$1" + a + "$2$3" + "$1" + e + "$2box$3") + c;
      }

      break;

    case 5936:
      switch (z(c, n + 11)) {
        case 114:
          return a + c + e + y(c, /[svh]\w+-[tblr]{2}/, "tb") + c;

        case 108:
          return a + c + e + y(c, /[svh]\w+-[tblr]{2}/, "tb-rl") + c;

        case 45:
          return a + c + e + y(c, /[svh]\w+-[tblr]{2}/, "lr") + c;
      }

      return a + c + e + c + c;
  }

  return c;
}

function ie(e, r) {
  var a = "";
  var c = M(e);

  for (var n = 0; n < c; n++) {
    a += r(e[n], n, e, r) || "";
  }

  return a;
}

function fe(e, r, a, s) {
  switch (e.type) {
    case i:
    case t:
      return e["return"] = e["return"] || e.value;

    case c:
      return "";

    case n:
      e.value = e.props.join(",");
  }

  return A(a = ie(e.children, s)) ? e["return"] = e.value + "{" + a + "}" : "";
}

function oe(e) {
  var r = M(e);
  return function (a, c, n, t) {
    var s = "";

    for (var u = 0; u < r; u++) {
      s += e[u](a, c, n, t) || "";
    }

    return s;
  };
}

function le(e) {
  return function (r) {
    if (!r.root) if (r = r["return"]) e(r);
  };
}

function ve(c, s, u, i) {
  if (!c["return"]) switch (c.type) {
    case t:
      c["return"] = ue(c.value, c.length);
      break;

    case p:
      return ie([I(y(c.value, "@", "@" + a), c, "")], i);

    case n:
      if (c.length) return S(c.props, function (n) {
        switch (x(n, /(::plac\w+|:read-\w+)/)) {
          case ":read-only":
          case ":read-write":
            return ie([I(y(n, /:(read-\w+)/, ":" + r + "$1"), c, "")], i);

          case "::placeholder":
            return ie([I(y(n, /:(plac\w+)/, ":" + a + "input-$1"), c, ""), I(y(n, /:(plac\w+)/, ":" + r + "$1"), c, ""), I(y(n, /:(plac\w+)/, e + "input-$1"), c, "")], i);
        }

        return "";
      });
  }
}

var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch (R(character)) {
      case 0:
        // &\f
        if (character === 38 && N() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += re(E - 1);
        break;

      case 2:
        parsed[index] += V(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = N() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += d(character);
    }
  } while (character = L());

  return parsed;
};

var getRules = function getRules(value, points) {
  return U(toRules(T(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();

var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // .length indicates if this rule contains pseudo or not
  !element.length) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};

var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};

var defaultStylisPlugins = [ve];

var createCache = function createCache(options) {
  var key = options.key;

  if (key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }

      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  var inserted = {}; // $FlowFixMe

  var container;
  var nodesToHydrate = [];
  {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  {
    var currentSheet;
    var finalizingPlugins = [fe,  le(function (rule) {
      currentSheet.insert(rule);
    })];
    var serializer = oe(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return ie(ae(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }
  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var b = "function" === typeof Symbol && Symbol["for"],
    c$1 = b ? Symbol["for"]("react.element") : 60103,
    d$1 = b ? Symbol["for"]("react.portal") : 60106,
    e$1 = b ? Symbol["for"]("react.fragment") : 60107,
    f = b ? Symbol["for"]("react.strict_mode") : 60108,
    g$1 = b ? Symbol["for"]("react.profiler") : 60114,
    h = b ? Symbol["for"]("react.provider") : 60109,
    k$1 = b ? Symbol["for"]("react.context") : 60110,
    l = b ? Symbol["for"]("react.async_mode") : 60111,
    m$1 = b ? Symbol["for"]("react.concurrent_mode") : 60111,
    n$1 = b ? Symbol["for"]("react.forward_ref") : 60112,
    p$1 = b ? Symbol["for"]("react.suspense") : 60113,
    q$1 = b ? Symbol["for"]("react.suspense_list") : 60120,
    r$1 = b ? Symbol["for"]("react.memo") : 60115,
    t$1 = b ? Symbol["for"]("react.lazy") : 60116,
    v = b ? Symbol["for"]("react.block") : 60121,
    w = b ? Symbol["for"]("react.fundamental") : 60117,
    x$1 = b ? Symbol["for"]("react.responder") : 60118,
    y$1 = b ? Symbol["for"]("react.scope") : 60119;

function z$1(a) {
  if ("object" === _typeof(a) && null !== a) {
    var u = a.$$typeof;

    switch (u) {
      case c$1:
        switch (a = a.type, a) {
          case l:
          case m$1:
          case e$1:
          case g$1:
          case f:
          case p$1:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case k$1:
              case n$1:
              case t$1:
              case r$1:
              case h:
                return a;

              default:
                return u;
            }

        }

      case d$1:
        return u;
    }
  }
}

function A$1(a) {
  return z$1(a) === m$1;
}

var AsyncMode = l;
var ConcurrentMode = m$1;
var ContextConsumer = k$1;
var ContextProvider = h;
var Element$1 = c$1;
var ForwardRef = n$1;
var Fragment = e$1;
var Lazy = t$1;
var Memo = r$1;
var Portal = d$1;
var Profiler = g$1;
var StrictMode = f;
var Suspense = p$1;

var isAsyncMode = function (a) {
  return A$1(a) || z$1(a) === l;
};

var isConcurrentMode = A$1;

var isContextConsumer = function (a) {
  return z$1(a) === k$1;
};

var isContextProvider = function (a) {
  return z$1(a) === h;
};

var isElement = function (a) {
  return "object" === _typeof(a) && null !== a && a.$$typeof === c$1;
};

var isForwardRef = function (a) {
  return z$1(a) === n$1;
};

var isFragment = function (a) {
  return z$1(a) === e$1;
};

var isLazy = function (a) {
  return z$1(a) === t$1;
};

var isMemo = function (a) {
  return z$1(a) === r$1;
};

var isPortal = function (a) {
  return z$1(a) === d$1;
};

var isProfiler = function (a) {
  return z$1(a) === g$1;
};

var isStrictMode = function (a) {
  return z$1(a) === f;
};

var isSuspense = function (a) {
  return z$1(a) === p$1;
};

var isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e$1 || a === m$1 || a === g$1 || a === f || a === p$1 || a === q$1 || "object" === _typeof(a) && null !== a && (a.$$typeof === t$1 || a.$$typeof === r$1 || a.$$typeof === h || a.$$typeof === k$1 || a.$$typeof === n$1 || a.$$typeof === w || a.$$typeof === x$1 || a.$$typeof === y$1 || a.$$typeof === v);
};

var typeOf = z$1;

var reactIs_production_min = {
	AsyncMode: AsyncMode,
	ConcurrentMode: ConcurrentMode,
	ContextConsumer: ContextConsumer,
	ContextProvider: ContextProvider,
	Element: Element$1,
	ForwardRef: ForwardRef,
	Fragment: Fragment,
	Lazy: Lazy,
	Memo: Memo,
	Portal: Portal,
	Profiler: Profiler,
	StrictMode: StrictMode,
	Suspense: Suspense,
	isAsyncMode: isAsyncMode,
	isConcurrentMode: isConcurrentMode,
	isContextConsumer: isContextConsumer,
	isContextProvider: isContextProvider,
	isElement: isElement,
	isForwardRef: isForwardRef,
	isFragment: isFragment,
	isLazy: isLazy,
	isMemo: isMemo,
	isPortal: isPortal,
	isProfiler: isProfiler,
	isStrictMode: isStrictMode,
	isSuspense: isSuspense,
	isValidElementType: isValidElementType,
	typeOf: typeOf
};

var reactIs = createCommonjsModule(function (module) {

{
  module.exports = reactIs_production_min;
}
});

var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

var isBrowser = "object" !== 'undefined';

function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}

var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);
      current = current.next;
    } while (current !== undefined);
  }
};

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {

    return interpolation;
  }

  switch (_typeof$1(interpolation)) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        }

        break;
      }
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (_typeof$1(value) !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "production" !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with @emotion/babel-plugin.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;

var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && _typeof$1(args[0]) === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {

      styles += strings[i];
    }
  }


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = murmur2(styles) + identifierName;

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};

var EmotionCacheContext = /* #__PURE__ */react.createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */createCache({
  key: 'css'
}) : null);
var CacheProvider = EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  // $FlowFixMe
  return /*#__PURE__*/react.forwardRef(function (props, ref) {
    // the cache will never be null in the browser
    var cache = react.useContext(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

var ThemeContext = /* #__PURE__ */react.createContext({});

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    return mergedTheme;
  }

  return _extends({}, outerTheme, theme);
};

var createCacheWithTheme = /* #__PURE__ */weakMemoize(function (outerTheme) {
  return weakMemoize(function (theme) {
    return getTheme(outerTheme, theme);
  });
});

var ThemeProvider = function ThemeProvider(props) {
  var theme = react.useContext(ThemeContext);

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }

  return /*#__PURE__*/react.createElement(ThemeContext.Provider, {
    value: theme
  }, props.children);
};

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _extends.apply(this, arguments);
}

module.exports = _extends;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */withEmotionCache(function (props, cache) {

  var styles = props.styles;
  var serialized = serializeStyles([styles], undefined, typeof styles === 'function' || Array.isArray(styles) ? react.useContext(ThemeContext) : undefined); // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything

  var sheetRef = react.useRef();
  react.useLayoutEffect(function () {
    var key = cache.key + "-global";
    var sheet = new StyleSheet({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false; // $FlowFixMe

    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }

    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  react.useLayoutEffect(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
        rehydrating = sheetRefCurrent[1];

    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }

    if (serialized.next !== undefined) {
      // insert keyframes
      insertStyles(cache, serialized.next, true);
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return serializeStyles(args);
}

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var CSSReset = function CSSReset() {
  return /*#__PURE__*/react.createElement(Global, {
    styles: "\n      html {\n        line-height: 1.5;\n        -webkit-text-size-adjust: 100%;\n        font-family: system-ui, sans-serif;\n        -webkit-font-smoothing: antialiased;\n        text-rendering: optimizeLegibility;      \n        -moz-osx-font-smoothing: grayscale; \n        touch-action: manipulation; \n      }\n\n      body {\n        position: relative;\n        min-height: 100%;\n        font-feature-settings: 'kern';\n      }\n\n      *,\n      *::before,\n      *::after {\n        border-width: 0;\n        border-style: solid;\n        box-sizing: border-box;\n      }\n\n      main {\n        display: block;\n      }\n\n      hr {\n        border-top-width: 1px;\n        box-sizing: content-box;\n        height: 0;\n        overflow: visible;\n      }\n\n      pre,\n      code,\n      kbd,\n      samp {\n        font-family: SFMono-Regular,  Menlo, Monaco, Consolas, monospace;\n        font-size: 1em;\n      }\n\n      a {\n        background-color: transparent;\n        color: inherit;\n        text-decoration: inherit;\n      }\n\n      abbr[title] {\n        border-bottom: none;\n        text-decoration: underline;\n        -webkit-text-decoration: underline dotted;\n        text-decoration: underline dotted;\n      }\n\n      b,\n      strong {\n        font-weight: bold;\n      }\n\n      small {\n        font-size: 80%;\n      }\n\n      sub,\n      sup {\n        font-size: 75%;\n        line-height: 0;\n        position: relative;\n        vertical-align: baseline;\n      }\n\n      sub {\n        bottom: -0.25em;\n      }\n\n      sup {\n        top: -0.5em;\n      }\n\n      img {\n        border-style: none;\n      }\n\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        font-family: inherit;\n        font-size: 100%;\n        line-height: 1.15;\n        margin: 0;\n      }\n\n      button,\n      input {\n        overflow: visible;\n      }\n\n      button,\n      select {\n        text-transform: none;\n      }\n\n      button::-moz-focus-inner,\n      [type=\"button\"]::-moz-focus-inner,\n      [type=\"reset\"]::-moz-focus-inner,\n      [type=\"submit\"]::-moz-focus-inner {\n        border-style: none;\n        padding: 0;\n      }\n\n      fieldset {\n        padding: 0.35em 0.75em 0.625em;\n      }\n\n      legend {\n        box-sizing: border-box;\n        color: inherit;\n        display: table;\n        max-width: 100%;\n        padding: 0;\n        white-space: normal;\n      }\n\n      progress {\n        vertical-align: baseline;\n      }\n\n      textarea {\n        overflow: auto;\n      }\n\n      [type=\"checkbox\"],\n      [type=\"radio\"] {\n        box-sizing: border-box;\n        padding: 0;\n      }\n\n      [type=\"number\"]::-webkit-inner-spin-button,\n      [type=\"number\"]::-webkit-outer-spin-button {\n        -webkit-appearance: none !important;\n      }\n\n      input[type=\"number\"] {\n        -moz-appearance: textfield;\n      }\n\n      [type=\"search\"] {\n        -webkit-appearance: textfield;\n        outline-offset: -2px;\n      }\n\n      [type=\"search\"]::-webkit-search-decoration {\n        -webkit-appearance: none !important;\n      }\n\n      ::-webkit-file-upload-button {\n        -webkit-appearance: button;\n        font: inherit;\n      }\n\n      details {\n        display: block;\n      }\n\n      summary {\n        display: list-item;\n      }\n\n      template {\n        display: none;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n\n      body,\n      blockquote,\n      dl,\n      dd,\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6,\n      hr,\n      figure,\n      p,\n      pre {\n        margin: 0;\n      }\n\n      button {\n        background: transparent;\n        padding: 0;\n      }\n\n      fieldset {\n        margin: 0;\n        padding: 0;\n      }\n\n      ol,\n      ul {\n        margin: 0;\n        padding: 0;\n      }\n\n      textarea {\n        resize: vertical;\n      }\n\n      button,\n      [role=\"button\"] {\n        cursor: pointer;\n      }\n\n      button::-moz-focus-inner {\n        border: 0 !important;\n      }\n\n      table {\n        border-collapse: collapse;\n      }\n\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        font-size: inherit;\n        font-weight: inherit;\n      }\n\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        padding: 0;\n        line-height: inherit;\n        color: inherit;\n      }\n\n      img,\n      svg,\n      video,\n      canvas,\n      audio,\n      iframe,\n      embed,\n      object {\n        display: block;\n        vertical-align: middle;\n      }\n\n      img,\n      video {\n        max-width: 100%;\n        height: auto;\n      }\n\n      [data-js-focus-visible] :focus:not([data-focus-visible-added]) {\n        outline: none;\n        box-shadow: none;\n      }\n\n      select::-ms-expand {\n        display: none;\n      }\n    "
  });
};

function getLastItem(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

function _typeof$2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }

// Number assertions
function isNumber(value) {
  return typeof value === "number";
}

function isArray(value) {
  return Array.isArray(value);
}

function isFunction(value) {
  return typeof value === "function";
} // Generic assertions

function isObject(value) {
  var type = _typeof$2(value);

  return value != null && (type === "object" || type === "function") && !isArray(value);
}
function isEmptyObject(value) {
  return isObject(value) && Object.keys(value).length === 0;
}

function isString(value) {
  return Object.prototype.toString.call(value) === "[object String]";
}
function isCssVar(value) {
  return /^var\(--.+\)$/.test(value);
} // Empty assertions
var __DEV__ = "production" !== "production";

var lodash_mergewith = createCommonjsModule(function (module, exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;
/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used to detect hot functions by number of calls within a span of milliseconds. */

var HOT_COUNT = 800,
    HOT_SPAN = 16;
/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER = 9007199254740991;
/** `Object#toString` result references. */

var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/** Used to identify `toStringTag` values of typed arrays. */

var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
/** Detect free variable `global` from Node.js. */

var freeGlobal = (typeof commonjsGlobal === "undefined" ? "undefined" : _typeof(commonjsGlobal)) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
/** Detect free variable `self`. */

var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/** Detect free variable `exports`. */

var freeExports = ( _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && ( _typeof(module)) == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Detect free variable `process` from Node.js. */

var freeProcess = moduleExports && freeGlobal.process;
/** Used to access faster Node.js helpers. */

var nodeUtil = function () {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    } // Legacy `process.binding('util')` for Node.js < 10.


    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();
/* Node.js helper references. */


var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */

function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);

    case 1:
      return func.call(thisArg, args[0]);

    case 2:
      return func.call(thisArg, args[0], args[1]);

    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }

  return func.apply(thisArg, args);
}
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */


function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */


function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */


function getValue(object, key) {
  return object == null ? undefined : object[key];
}
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */


function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}
/** Used for built-in method references. */


var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to detect overreaching core-js shims. */

var coreJsData = root['__core-js_shared__'];
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to detect methods masquerading as native. */

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */


var nativeObjectToString = objectProto.toString;
/** Used to infer the `Object` constructor. */

var objectCtorString = funcToString.call(Object);
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/** Built-in value references. */

var Buffer = moduleExports ? root.Buffer : undefined,
    _Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

var defineProperty = function () {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();
/* Built-in method references for those with the same name as other `lodash` methods. */


var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeMax = Math.max,
    nativeNow = Date.now;
/* Built-in method references that are verified to be native. */

var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');
/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */

var baseCreate = function () {
  function object() {}

  return function (proto) {
    if (!isObject(proto)) {
      return {};
    }

    if (objectCreate) {
      return objectCreate(proto);
    }

    object.prototype = proto;
    var result = new object();
    object.prototype = undefined;
    return result;
  };
}();
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */


function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function hashGet(key) {
  var data = this.__data__;

  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */


function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
} // Add methods to `Hash`.


Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */


function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  --this.size;
  return true;
}
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */


function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
} // Add methods to `ListCache`.


ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */


function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */


function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
} // Add methods to `MapCache`.


MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */


function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);
  this.size = data.size;
  return result;
}
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function stackGet(key) {
  return this.__data__.get(key);
}
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function stackHas(key) {
  return this.__data__.has(key);
}
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */


function stackSet(key, value) {
  var data = this.__data__;

  if (data instanceof ListCache) {
    var pairs = data.__data__;

    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }

    data = this.__data__ = new MapCache(pairs);
  }

  data.set(key, value);
  this.size = data.size;
  return this;
} // Add methods to `Stack`.


Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}
/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */


function assignMergeValue(object, key, value) {
  if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */


function assignValue(object, key, value) {
  var objValue = object[key];

  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}
/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */


function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}
/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */


var baseFor = createBaseFor();
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */


function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */


function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */


function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */


function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }

  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }

  return result;
}
/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */


function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }

  baseFor(source, function (srcValue, key) {
    stack || (stack = new Stack());

    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + '', object, source, stack) : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }

      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */


function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }

  var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;
  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);
    newValue = srcValue;

    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;

      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }

  assignMergeValue(object, key, newValue);
}
/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */


function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}
/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */


var baseSetToString = !defineProperty ? identity : function (func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};
/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */

function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }

  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */


function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}
/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */


function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */


function copyArray(source, array) {
  var index = -1,
      length = source.length;
  array || (array = Array(length));

  while (++index < length) {
    array[index] = source[index];
  }

  return array;
}
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */


function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }

    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }

  return object;
}
/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */


function createAssigner(assigner) {
  return baseRest(function (object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;
    customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }

    object = Object(object);

    while (++index < length) {
      var source = sources[index];

      if (source) {
        assigner(object, source, index, customizer);
      }
    }

    return object;
  });
}
/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */


function createBaseFor(fromRight) {
  return function (object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];

      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }

    return object;
  };
}
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */


function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */


function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */


function initCloneObject(object) {
  return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */


function isIndex(value, length) {
  var type = _typeof(value);

  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */


function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }

  var type = _typeof(index);

  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
    return eq(object[index], value);
  }

  return false;
}
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */


function isKeyable(value) {
  var type = _typeof(value);

  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */


function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
  return value === proto;
}
/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */


function nativeKeysIn(object) {
  var result = [];

  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }

  return result;
}
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */


function objectToString(value) {
  return nativeObjectToString.call(value);
}
/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */


function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }

    index = -1;
    var otherArgs = Array(start + 1);

    while (++index < start) {
      otherArgs[index] = args[index];
    }

    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */


function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}
/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */


var setToString = shortOut(baseSetToString);
/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */

function shortOut(func) {
  var count = 0,
      lastCalled = 0;
  return function () {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;

    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }

    return func.apply(undefined, arguments);
  };
}
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */


function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */


function eq(value, other) {
  return value === other || value !== value && other !== other;
}
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */


var isArguments = baseIsArguments(function () {
  return arguments;
}()) ? baseIsArguments : function (value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */

var isArray = Array.isArray;
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */

function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */


function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */


var isBuffer = nativeIsBuffer || stubFalse;
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction(value) {
  if (!isObject(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */


function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */


function isObject(value) {
  var type = _typeof(value);

  return value != null && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */


function isObjectLike(value) {
  return value != null && _typeof(value) == 'object';
}
/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */


function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }

  var proto = getPrototype(value);

  if (proto === null) {
    return true;
  }

  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */


var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */

function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}
/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */


function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
/**
 * This method is like `_.merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (_.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * var object = { 'a': [1], 'b': [2] };
 * var other = { 'a': [3], 'b': [4] };
 *
 * _.mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */


var mergeWith = createAssigner(function (object, source, srcIndex, customizer) {
  baseMerge(object, source, srcIndex, customizer);
});
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */

function constant(value) {
  return function () {
    return value;
  };
}
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */


function identity(value) {
  return value;
}
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */


function stubFalse() {
  return false;
}

module.exports = mergeWith;
});

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function omit(object, keys) {
  var result = {};
  Object.keys(object).forEach(function (key) {
    if (keys.includes(key)) return;
    result[key] = object[key];
  });
  return result;
}
function pick(object, keys) {
  var result = {};
  keys.forEach(function (key) {
    if (key in object) {
      result[key] = object[key];
    }
  });
  return result;
}
/**
 * Get value from a deeply nested object using a string path.
 * Memoizes the value.
 * @param obj - the object
 * @param path - the string path
 * @param def  - the fallback value
 */

function get(obj, path, fallback, index) {
  var key = typeof path === "string" ? path.split(".") : [path];

  for (index = 0; index < key.length; index += 1) {
    if (!obj) break;
    obj = obj[key[index]];
  }

  return obj === undefined ? fallback : obj;
}
var memoize$1 = function memoize(fn) {
  var cache = new WeakMap();

  var memoizedFn = function memoizedFn(obj, path, fallback, index) {
    if (typeof obj === "undefined") {
      return fn(obj, path, fallback);
    }

    if (!cache.has(obj)) {
      cache.set(obj, new Map());
    }

    var map = cache.get(obj);

    if (map.has(path)) {
      return map.get(path);
    }

    var value = fn(obj, path, fallback, index);
    map.set(path, value);
    return value;
  };

  return memoizedFn;
};
var memoizedGet = memoize$1(get);
/**
 * Returns the items of an object that meet the condition specified in a callback function.
 *
 * @param object the object to loop through
 * @param fn The filter function
 */

function objectFilter(object, fn) {
  var result = {};
  Object.keys(object).forEach(function (key) {
    var value = object[key];
    var shouldPass = fn(value, key, object);

    if (shouldPass) {
      result[key] = value;
    }
  });
  return result;
}
var filterUndefined = function filterUndefined(object) {
  return objectFilter(object, function (val) {
    return val !== null && val !== undefined;
  });
};
var objectKeys = function objectKeys(obj) {
  return Object.keys(obj);
};
/**
 * Object.entries polyfill for Nodev10 compatibility
 */

var fromEntries = function fromEntries(entries) {
  return entries.reduce(function (carry, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    carry[key] = value;
    return carry;
  }, {});
};
/**
 * Get the CSS variable ref stored in the theme
 */

var getCSSVar = function getCSSVar(theme, scale, value) {
  var _theme$__cssMap$$varR, _theme$__cssMap$;

  return (_theme$__cssMap$$varR = (_theme$__cssMap$ = theme.__cssMap[scale + "." + value]) == null ? void 0 : _theme$__cssMap$.varRef) != null ? _theme$__cssMap$$varR : value;
};

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }

function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }

function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$1(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }

function analyzeCSSValue(value) {
  var num = parseFloat(value.toString());
  var unit = value.toString().replace(String(num), "");
  return {
    unitless: !unit,
    value: num,
    unit: unit
  };
}

function px(value) {
  if (value == null) return value;

  var _analyzeCSSValue = analyzeCSSValue(value),
      unitless = _analyzeCSSValue.unitless;

  return unitless || isNumber(value) ? value + "px" : value;
}

var sortByBreakpointValue = function sortByBreakpointValue(a, b) {
  return parseInt(a[1], 10) > parseInt(b[1], 10) ? 1 : -1;
};

var sortBps = function sortBps(breakpoints) {
  return fromEntries(Object.entries(breakpoints).sort(sortByBreakpointValue));
};

function normalize(breakpoints) {
  var sorted = sortBps(breakpoints);
  return Object.assign(Object.values(sorted), sorted);
}

function keys(breakpoints) {
  var value = Object.keys(sortBps(breakpoints));
  return new Set(value);
}

function subtract(value) {
  var _px;

  if (!value) return value;
  value = (_px = px(value)) != null ? _px : value;
  var factor = value.endsWith("px") ? -1 : // the equivalent of 1px in em using a 16px base
  -0.0635;
  return isNumber(value) ? "" + (value + factor) : value.replace(/([0-9]+\.?[0-9]*)/, function (m) {
    return "" + (parseFloat(m) + factor);
  });
}

function queryString(min, max) {
  var query = [];
  if (min) query.push("@media screen and (min-width: " + px(min) + ")");
  if (query.length > 0 && max) query.push("and");
  if (max) query.push("@media screen and (max-width: " + px(max) + ")");
  return query.join(" ");
}

function analyzeBreakpoints(breakpoints) {
  var _breakpoints$base;

  if (!breakpoints) return null;
  breakpoints.base = (_breakpoints$base = breakpoints.base) != null ? _breakpoints$base : "0px";
  var normalized = normalize(breakpoints);
  var queries = Object.entries(breakpoints).sort(sortByBreakpointValue).map(function (_ref, index, entry) {
    var _entry;

    var _ref2 = _slicedToArray$1(_ref, 2),
        breakpoint = _ref2[0],
        minW = _ref2[1];

    var _ref3 = (_entry = entry[index + 1]) != null ? _entry : [],
        _ref4 = _slicedToArray$1(_ref3, 2),
        maxW = _ref4[1];

    maxW = parseFloat(maxW) > 0 ? subtract(maxW) : undefined;
    return {
      breakpoint: breakpoint,
      minW: minW,
      maxW: maxW,
      maxWQuery: queryString(null, maxW),
      minWQuery: queryString(minW),
      minMaxQuery: queryString(minW, maxW)
    };
  });

  var _keys = keys(breakpoints);

  var _keysArr = Array.from(_keys.values());

  return {
    keys: _keys,
    normalized: normalized,
    isResponsive: function isResponsive(test) {
      var keys = Object.keys(test);
      return keys.length > 0 && keys.every(function (key) {
        return _keys.has(key);
      });
    },
    asObject: sortBps(breakpoints),
    asArray: normalize(breakpoints),
    details: queries,
    media: [null].concat(_toConsumableArray(normalized.map(function (minW) {
      return queryString(minW);
    }).slice(1))),
    toArrayValue: function toArrayValue(test) {
      if (!isObject(test)) {
        throw new Error("toArrayValue: value must be an object");
      }

      var result = _keysArr.map(function (bp) {
        var _test$bp;

        return (_test$bp = test[bp]) != null ? _test$bp : null;
      });

      while (getLastItem(result) === null) {
        result.pop();
      }

      return result;
    },
    toObjectValue: function toObjectValue(test) {
      if (!Array.isArray(test)) {
        throw new Error("toObjectValue: value must be an array");
      }

      return test.reduce(function (acc, value, index) {
        var key = _keysArr[index];
        if (key != null && value != null) acc[key] = value;
        return acc;
      }, {});
    }
  };
}

function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
var isBrowser$1 = canUseDOM();
var dataAttr = function dataAttr(condition) {
  return condition ? "" : undefined;
};
var ariaAttr = function ariaAttr(condition) {
  return condition ? true : undefined;
};
var cx = function cx() {
  for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
    classNames[_key] = arguments[_key];
  }

  return classNames.filter(Boolean).join(" ");
};

/* eslint-disable no-nested-ternary */
function runIfFn(valueOrFn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return isFunction(valueOrFn) ? valueOrFn.apply(void 0, args) : valueOrFn;
}
function callAllHandlers() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return function func(event) {
    fns.some(function (fn) {
      fn == null ? void 0 : fn(event);
      return event == null ? void 0 : event.defaultPrevented;
    });
  };
}
function once(fn) {
  var result;
  return function func() {
    if (fn) {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      result = fn.apply(this, args);
      fn = null;
    }

    return result;
  };
}
var noop = function noop() {};
var warn = once(function (options) {
  return function () {
    var condition = options.condition,
        message = options.message;

    if (condition && __DEV__) {
      console.warn(message);
    }
  };
});

var promiseMicrotask = function promiseMicrotask(callback) {
  Promise.resolve().then(callback);
};

var scheduleMicrotask =  typeof queueMicrotask === "function" ? queueMicrotask : promiseMicrotask;

var defaultTimestep = 1 / 60 * 1000;
var getCurrentTime = typeof performance !== "undefined" ? function () {
  return performance.now();
} : function () {
  return Date.now();
};
var onNextFrame = typeof window !== "undefined" ? function (callback) {
  return window.requestAnimationFrame(callback);
} : function (callback) {
  return setTimeout(function () {
    return callback(getCurrentTime());
  }, defaultTimestep);
};

function createRenderStep(runNextFrame) {
  var toRun = [];
  var toRunNextFrame = [];
  var numToRun = 0;
  var isProcessing = false;
  var toKeepAlive = new WeakSet();
  var step = {
    schedule: function schedule(callback, keepAlive, immediate) {
      if (keepAlive === void 0) {
        keepAlive = false;
      }

      if (immediate === void 0) {
        immediate = false;
      }

      var addToCurrentFrame = immediate && isProcessing;
      var buffer = addToCurrentFrame ? toRun : toRunNextFrame;
      if (keepAlive) toKeepAlive.add(callback);

      if (buffer.indexOf(callback) === -1) {
        buffer.push(callback);
        if (addToCurrentFrame && isProcessing) numToRun = toRun.length;
      }

      return callback;
    },
    cancel: function cancel(callback) {
      var index = toRunNextFrame.indexOf(callback);
      if (index !== -1) toRunNextFrame.splice(index, 1);
      toKeepAlive["delete"](callback);
    },
    process: function process(frameData) {
      var _a;

      isProcessing = true;
      _a = [toRunNextFrame, toRun], toRun = _a[0], toRunNextFrame = _a[1];
      toRunNextFrame.length = 0;
      numToRun = toRun.length;

      if (numToRun) {
        for (var i = 0; i < numToRun; i++) {
          var callback = toRun[i];
          callback(frameData);

          if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame();
          }
        }
      }

      isProcessing = false;
    }
  };
  return step;
}

var maxElapsed = 40;
var useDefaultElapsed = true;
var runNextFrame = false;
var isProcessing = false;
var frame = {
  delta: 0,
  timestamp: 0
};
var stepsOrder = ["read", "update", "preRender", "render", "postRender"];
var steps = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
  acc[key] = createRenderStep(function () {
    return runNextFrame = true;
  });
  return acc;
}, {});
var sync = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
  var step = steps[key];

  acc[key] = function (process, keepAlive, immediate) {
    if (keepAlive === void 0) {
      keepAlive = false;
    }

    if (immediate === void 0) {
      immediate = false;
    }

    if (!runNextFrame) startLoop();
    return step.schedule(process, keepAlive, immediate);
  };

  return acc;
}, {});
var cancelSync = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
  acc[key] = steps[key].cancel;
  return acc;
}, {});
var flushSync = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
  acc[key] = function () {
    return steps[key].process(frame);
  };

  return acc;
}, {});

var processStep = function processStep(stepId) {
  return steps[stepId].process(frame);
};

var processFrame = function processFrame(timestamp) {
  runNextFrame = false;
  frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
  frame.timestamp = timestamp;
  isProcessing = true;
  stepsOrder.forEach(processStep);
  isProcessing = false;

  if (runNextFrame) {
    useDefaultElapsed = false;
    onNextFrame(processFrame);
  }
};

var startLoop = function startLoop() {
  runNextFrame = true;
  useDefaultElapsed = true;
  if (!isProcessing) onNextFrame(processFrame);
};

var getFrameData = function getFrameData() {
  return frame;
};

var breakpoints = Object.freeze(["base", "sm", "md", "lg", "xl", "2xl"]);
function mapResponsive(prop, mapper) {
  if (isArray(prop)) {
    return prop.map(function (item) {
      if (item === null) {
        return null;
      }

      return mapper(item);
    });
  }

  if (isObject(prop)) {
    return objectKeys(prop).reduce(function (result, key) {
      result[key] = mapper(prop[key]);
      return result;
    }, {});
  }

  if (prop != null) {
    return mapper(prop);
  }

  return null;
}
function arrayToObjectNotation(values, bps) {
  if (bps === void 0) {
    bps = breakpoints;
  }

  var result = {};
  values.forEach(function (value, index) {
    var key = bps[index];
    if (value == null) return;
    result[key] = value;
  });
  return result;
}

function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2(); }

function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit$2(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread$1(); }

function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$2(arr); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function walkObject(target, predicate) {
  function inner(value, path) {
    if (path === void 0) {
      path = [];
    }

    if (isArray(value)) {
      return value.map(function (item, index) {
        return inner(item, [].concat(_toConsumableArray$1(path), [String(index)]));
      });
    }

    if (isObject(value)) {
      return Object.fromEntries(Object.entries(value).map(function (_ref) {
        var _ref2 = _slicedToArray$2(_ref, 2),
            key = _ref2[0],
            child = _ref2[1];

        return [key, inner(child, [].concat(_toConsumableArray$1(path), [key]))];
      }));
    }

    return predicate(value, path);
  }

  return inner(target);
}

/**
 * Assigns a value to a ref function or object
 *
 * @param ref the ref to assign to
 * @param value the value
 */

function assignRef(ref, value) {
  if (ref == null) return;

  if (isFunction(ref)) {
    ref(value);
    return;
  }

  try {
    // @ts-ignore
    ref.current = value;
  } catch (error) {
    throw new Error("Cannot assign value '" + value + "' to ref '" + ref + "'");
  }
}
/**
 * Combine multiple React refs into a single ref function.
 * This is used mostly when you need to allow consumers forward refs to
 * internal components
 *
 * @param refs refs to assign to value to
 */

function mergeRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  return function (node) {
    refs.forEach(function (ref) {
      return assignRef(ref, node);
    });
  };
}

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */

function createContext(options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$strict = _options.strict,
      strict = _options$strict === void 0 ? true : _options$strict,
      _options$errorMessage = _options.errorMessage,
      errorMessage = _options$errorMessage === void 0 ? "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider" : _options$errorMessage,
      name = _options.name;
  var Context = /*#__PURE__*/react.createContext(undefined);
  Context.displayName = name;

  function useContext() {
    var context = react.useContext(Context);

    if (!context && strict) {
      var error = new Error(errorMessage);
      error.name = "ContextError";
      Error.captureStackTrace == null ? void 0 : Error.captureStackTrace(error, useContext);
      throw error;
    }

    return context;
  }

  return [Context.Provider, useContext, Context];
}

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */

function getValidChildren(children) {
  return react.Children.toArray(children).filter(function (child) {
    return /*#__PURE__*/react.isValidElement(child);
  });
}

function _slicedToArray$3(arr, i) { return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3(); }

function _nonIterableRest$3() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$3(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$3(arr) { if (Array.isArray(arr)) return arr; }

var _createContext = createContext({
  strict: false,
  name: "PortalManagerContext"
}),
    _createContext2 = _slicedToArray$3(_createContext, 2),
    PortalManagerContextProvider = _createContext2[0],
    usePortalManager = _createContext2[1];
function PortalManager(props) {
  var children = props.children,
      zIndex = props.zIndex;
  return /*#__PURE__*/react.createElement(PortalManagerContextProvider, {
    value: {
      zIndex: zIndex
    }
  }, children);
}

function _slicedToArray$4(arr, i) { return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$4(); }

function _nonIterableRest$4() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }

function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$4(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$4(arr) { if (Array.isArray(arr)) return arr; }
/**
 * React hook to manage boolean (on - off) states
 *
 * @param initialState the initial boolean state value
 */

function useBoolean(initialState) {
  if (initialState === void 0) {
    initialState = false;
  }

  var _useState = react.useState(initialState),
      _useState2 = _slicedToArray$4(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var on = react.useCallback(function () {
    setValue(true);
  }, []);
  var off = react.useCallback(function () {
    setValue(false);
  }, []);
  var toggle = react.useCallback(function () {
    setValue(function (prev) {
      return !prev;
    });
  }, []);
  return [value, {
    on: on,
    off: off,
    toggle: toggle
  }];
}

/**
 * useSafeLayoutEffect enables us to safely call `useLayoutEffect` on the browser
 * (for SSR reasons)
 *
 * React currently throws a warning when using useLayoutEffect on the server.
 * To get around it, we can conditionally useEffect on the server (no-op) and
 * useLayoutEffect in the browser.
 *
 * @see https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 */

var useSafeLayoutEffect = isBrowser$1 ? react.useLayoutEffect : react.useEffect;

/**
 * React hook to persist any value between renders,
 * but keeps it up-to-date if it changes.
 *
 * @param value the value or function to persist
 */

function useCallbackRef(fn, deps) {
  if (deps === void 0) {
    deps = [];
  }

  var ref = react.useRef(fn);
  useSafeLayoutEffect(function () {
    ref.current = fn;
  }); // eslint-disable-next-line react-hooks/exhaustive-deps

  return react.useCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return ref.current == null ? void 0 : ref.current.apply(ref, args);
  }, deps);
}

function useControllableProp(prop, state) {
  var isControlled = prop !== undefined;
  var value = isControlled && typeof prop !== "undefined" ? prop : state;
  return [isControlled, value];
}

var defaultIdContext = {
  prefix: Math.round(Math.random() * 10000000000),
  current: 0
};
var IdContext = /*#__PURE__*/react.createContext(defaultIdContext);
var IdProvider = /*#__PURE__*/react.memo(function (_ref) {
  var children = _ref.children;
  var currentContext = react.useContext(IdContext);
  var isRoot = currentContext === defaultIdContext;
  var context = react.useMemo(function () {
    return {
      prefix: isRoot ? 0 : ++currentContext.prefix,
      current: 0
    };
  }, [isRoot, currentContext]);
  return /*#__PURE__*/react.createElement(IdContext.Provider, {
    value: context
  }, children);
});
function useId(idProp, prefix) {
  var context = react.useContext(IdContext);
  return react.useMemo(function () {
    return idProp || [prefix, context.prefix, ++context.current].filter(Boolean).join("-");
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [idProp, prefix]);
}

function _slicedToArray$5(arr, i) { return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$5(); }

function _nonIterableRest$5() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$5(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }

function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$5(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$5(arr) { if (Array.isArray(arr)) return arr; }

function _extends$1() {
  _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$1.apply(this, arguments);
}
function useDisclosure(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      onCloseProp = _props.onClose,
      onOpenProp = _props.onOpen,
      isOpenProp = _props.isOpen,
      idProp = _props.id;

  var _React$useState = react.useState(props.defaultIsOpen || false),
      _React$useState2 = _slicedToArray$5(_React$useState, 2),
      isOpenState = _React$useState2[0],
      setIsOpen = _React$useState2[1];

  var _useControllableProp = useControllableProp(isOpenProp, isOpenState),
      _useControllableProp2 = _slicedToArray$5(_useControllableProp, 2),
      isControlled = _useControllableProp2[0],
      isOpen = _useControllableProp2[1];

  var id = useId(idProp, "disclosure");
  var onClose = react.useCallback(function () {
    if (!isControlled) {
      setIsOpen(false);
    }

    onCloseProp == null ? void 0 : onCloseProp();
  }, [isControlled, onCloseProp]);
  var onOpen = react.useCallback(function () {
    if (!isControlled) {
      setIsOpen(true);
    }

    onOpenProp == null ? void 0 : onOpenProp();
  }, [isControlled, onOpenProp]);
  var onToggle = react.useCallback(function () {
    var action = isOpen ? onClose : onOpen;
    action();
  }, [isOpen, onOpen, onClose]);
  return {
    isOpen: !!isOpen,
    onOpen: onOpen,
    onClose: onClose,
    onToggle: onToggle,
    isControlled: isControlled,
    getButtonProps: function getButtonProps(props) {
      if (props === void 0) {
        props = {};
      }

      return _extends$1({}, props, {
        "aria-expanded": "true",
        "aria-controls": id,
        onClick: callAllHandlers(props.onClick, onToggle)
      });
    },
    getDisclosureProps: function getDisclosureProps(props) {
      if (props === void 0) {
        props = {};
      }

      return _extends$1({}, props, {
        hidden: !isOpen,
        id: id
      });
    }
  };
}

/**
 * React hook to manage browser event listeners
 *
 * @param event the event name
 * @param handler the event handler function to execute
 * @param doc the dom environment to execute against (defaults to `document`)
 * @param options the event listener options
 *
 * @internal
 */

function useEventListener(event, handler, env, options) {
  var listener = useCallbackRef(handler);
  react.useEffect(function () {
    var _runIfFn;

    var node = (_runIfFn = runIfFn(env)) != null ? _runIfFn : document;
    node.addEventListener(event, listener, options);
    return function () {
      node.removeEventListener(event, listener, options);
    };
  }, [event, env, options, listener]);
  return function () {
    var _runIfFn2;

    var node = (_runIfFn2 = runIfFn(env)) != null ? _runIfFn2 : document;
    node.removeEventListener(event, listener, options);
  };
}

/**
 * React effect hook that invokes only on update.
 * It doesn't invoke on mount
 */

var useUpdateEffect = function useUpdateEffect(effect, deps) {
  var mounted = react.useRef(false);
  react.useEffect(function () {
    if (mounted.current) {
      return effect();
    }

    mounted.current = true;
    return undefined; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return mounted.current;
};

function useUnmountEffect(fn, deps) {
  if (deps === void 0) {
    deps = [];
  }

  return react.useEffect(function () {
    return function () {
      return fn();
    };
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  deps);
}

function _slicedToArray$6(arr, i) { return _arrayWithHoles$6(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$6(arr, i) || _nonIterableRest$6(); }

function _nonIterableRest$6() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$6(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$6(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen); }

function _arrayLikeToArray$6(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$6(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$6(arr) { if (Array.isArray(arr)) return arr; }
function useForceUpdate() {
  var unloadingRef = react.useRef(false);

  var _React$useState = react.useState(0),
      _React$useState2 = _slicedToArray$6(_React$useState, 2),
      count = _React$useState2[0],
      setCount = _React$useState2[1];

  useUnmountEffect(function () {
    unloadingRef.current = true;
  });
  return react.useCallback(function () {
    if (!unloadingRef.current) {
      setCount(count + 1);
    }
  }, [count]);
}

/**
 * React hook that provides a declarative `setTimeout`
 *
 * @param callback the callback to run after specified delay
 * @param delay the delay (in ms)
 */

function useTimeout(callback, delay) {
  var fn = useCallbackRef(callback);
  react.useEffect(function () {
    if (delay == null) return undefined;
    var timeoutId = null;
    timeoutId = window.setTimeout(function () {
      fn();
    }, delay);
    return function () {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [delay, fn]);
}

function _slicedToArray$7(arr, i) { return _arrayWithHoles$7(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$7(); }

function _nonIterableRest$7() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$7(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$7(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen); }

function _arrayLikeToArray$7(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$7(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$7(arr) { if (Array.isArray(arr)) return arr; }

function _extends$2() {
  _extends$2 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$2.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _createContext$1 = createContext({
  strict: false,
  name: "PortalContext"
}),
    _createContext2$1 = _slicedToArray$7(_createContext$1, 2),
    PortalContextProvider = _createContext2$1[0],
    usePortalContext = _createContext2$1[1];

var PORTAL_CLASSNAME = "chakra-portal";
var PORTAL_SELECTOR = ".chakra-portal";

var Container = function Container(props) {
  return /*#__PURE__*/react.createElement("div", {
    className: "chakra-portal-zIndex",
    style: {
      position: "absolute",
      zIndex: props.zIndex,
      top: 0,
      left: 0,
      right: 0 // NB: Don't add `bottom: 0`, it makes the entire app unusable
      // @see https://github.com/chakra-ui/chakra-ui/issues/3201

    }
  }, props.children);
};
/**
 * Portal that uses `document.body` as container
 */


var DefaultPortal = function DefaultPortal(props) {
  var appendToParentPortal = props.appendToParentPortal,
      children = props.children;
  var tempNode = react.useRef(null);
  var portal = react.useRef(null);
  var forceUpdate = useForceUpdate();
  var parentPortal = usePortalContext();
  var manager = usePortalManager();
  useSafeLayoutEffect(function () {
    if (!tempNode.current) return;
    var doc = tempNode.current.ownerDocument;
    var host = appendToParentPortal ? parentPortal != null ? parentPortal : doc.body : doc.body;
    if (!host) return;
    portal.current = doc.createElement("div");
    portal.current.className = PORTAL_CLASSNAME;
    host.appendChild(portal.current);
    forceUpdate();
    var portalNode = portal.current;
    return function () {
      if (host.contains(portalNode)) {
        host.removeChild(portalNode);
      }
    };
  }, []);

  var _children = manager != null && manager.zIndex ? /*#__PURE__*/react.createElement(Container, {
    zIndex: manager == null ? void 0 : manager.zIndex
  }, children) : children;

  return portal.current ? /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/react.createElement(PortalContextProvider, {
    value: portal.current
  }, _children), portal.current) : /*#__PURE__*/react.createElement("span", {
    ref: tempNode
  });
};
/**
 * Portal that uses a custom container
 */


var ContainerPortal = function ContainerPortal(props) {
  var children = props.children,
      containerRef = props.containerRef,
      appendToParentPortal = props.appendToParentPortal;
  var containerEl = containerRef.current;
  var host = containerEl != null ? containerEl : isBrowser$1 ? document.body : undefined;
  var portal = react.useMemo(function () {
    var node = containerEl == null ? void 0 : containerEl.ownerDocument.createElement("div");
    if (node) node.className = PORTAL_CLASSNAME;
    return node;
  }, [containerEl]);
  var forceUpdate = useForceUpdate();
  useSafeLayoutEffect(function () {
    forceUpdate();
  }, []);
  useSafeLayoutEffect(function () {
    if (!portal || !host) return;
    host.appendChild(portal);
    return function () {
      host.removeChild(portal);
    };
  }, [portal, host]);

  if (host && portal) {
    return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/react.createElement(PortalContextProvider, {
      value: appendToParentPortal ? portal : null
    }, children), portal);
  }

  return null;
};
/**
 * Portal
 *
 * Declarative component used to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 *
 * @see Docs https://chakra-ui.com/portal
 */


function Portal$1(props) {
  var containerRef = props.containerRef,
      rest = _objectWithoutPropertiesLoose(props, ["containerRef"]);

  return containerRef ? /*#__PURE__*/react.createElement(ContainerPortal, _extends$2({
    containerRef: containerRef
  }, rest)) : /*#__PURE__*/react.createElement(DefaultPortal, rest);
}
Portal$1.defaultProps = {
  appendToParentPortal: true
};
Portal$1.className = PORTAL_CLASSNAME;
Portal$1.selector = PORTAL_SELECTOR;

var classNames = {
  light: "chakra-ui-light",
  dark: "chakra-ui-dark"
};
/**
 * SSR: Graceful fallback for the `body` element
 */

var mockBody = {
  classList: {
    add: noop,
    remove: noop
  }
};

var getBody = function getBody() {
  return isBrowser$1 ? document.body : mockBody;
};
/**
 * Function to add/remove class from `body` based on color mode
 */


function syncBodyClassName(isDark) {
  var body = getBody();
  body.classList.add(isDark ? classNames.dark : classNames.light);
  body.classList.remove(isDark ? classNames.light : classNames.dark);
}
/**
 * Check if JS media query matches the query string passed
 */

function getMediaQuery(query) {
  var mediaQueryList = window.matchMedia == null ? void 0 : window.matchMedia(query);

  if (!mediaQueryList) {
    return undefined;
  }

  return !!mediaQueryList.media === mediaQueryList.matches;
}

var queries = {
  light: "(prefers-color-scheme: light)",
  dark: "(prefers-color-scheme: dark)"
};
function getColorScheme(fallback) {
  var _getMediaQuery;

  var isDark = (_getMediaQuery = getMediaQuery(queries.dark)) != null ? _getMediaQuery : fallback === "dark";
  return isDark ? "dark" : "light";
}
/**
 * Adds system os color mode listener, and run the callback
 * once preference changes
 */

function addListener(fn) {
  if (!("matchMedia" in window)) {
    return noop;
  }

  var mediaQueryList = window.matchMedia(queries.dark);

  var listener = function listener() {
    fn(mediaQueryList.matches ? "dark" : "light");
  };

  listener();
  mediaQueryList.addListener(listener);
  return function () {
    mediaQueryList.removeListener(listener);
  };
}
var root = {
  get: function get() {
    return document.documentElement.style.getPropertyValue("--chakra-ui-color-mode");
  },
  set: function set(mode) {
    if (isBrowser$1) {
      document.documentElement.style.setProperty("--chakra-ui-color-mode", mode);
    }
  }
};

var hasSupport = function hasSupport() {
  return typeof Storage !== "undefined";
};

var storageKey = "chakra-ui-color-mode";
/**
 * Simple object to handle read-write to localStorage
 */

var localStorageManager = {
  get: function get(init) {
    if (!hasSupport()) return init;

    try {
      var _value = localStorage.getItem(storageKey);

      return _value != null ? _value : init;
    } catch (error) {

      return init;
    }
  },
  set: function set(value) {
    if (!hasSupport()) return;

    try {
      localStorage.setItem(storageKey, value);
    } catch (error) {
    }
  },
  type: "localStorage"
};

function _slicedToArray$8(arr, i) { return _arrayWithHoles$8(arr) || _iterableToArrayLimit$8(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest$8(); }

function _nonIterableRest$8() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$8(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$8(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen); }

function _arrayLikeToArray$8(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$8(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$8(arr) { if (Array.isArray(arr)) return arr; }
var ColorModeContext = /*#__PURE__*/react.createContext({});
/**
 * React hook that reads from `ColorModeProvider` context
 * Returns the color mode and function to toggle it
 */


var useColorMode = function useColorMode() {
  var context = react.useContext(ColorModeContext);

  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }

  return context;
};
/**
 * Provides context for the color mode based on config in `theme`
 * Returns the color mode and function to toggle the color mode
 */

function ColorModeProvider(props) {
  var value = props.value,
      children = props.children,
      _props$options = props.options,
      useSystemColorMode = _props$options.useSystemColorMode,
      initialColorMode = _props$options.initialColorMode,
      _props$colorModeManag = props.colorModeManager,
      colorModeManager = _props$colorModeManag === void 0 ? localStorageManager : _props$colorModeManag;
  /**
   * Only attempt to retrieve if we're on the server. Else this will result
   * in a hydration mismatch warning and partially invalid visuals.
   *
   * Else fallback safely to `theme.config.initialColormode` (default light)
   */

  var _React$useState = react.useState(colorModeManager.type === "cookie" ? colorModeManager.get(initialColorMode) : initialColorMode),
      _React$useState2 = _slicedToArray$8(_React$useState, 2),
      colorMode = _React$useState2[0],
      rawSetColorMode = _React$useState2[1];

  react.useEffect(function () {
    /**
     * Since we cannot initially retrieve localStorage to due above mentioned
     * reasons, do so after hydration.
     *
     * Priority:
     * - system color mode
     * - defined value on <ColorModeScript />, if present
     * - previously stored value
     */
    if (isBrowser$1 && colorModeManager.type === "localStorage") {
      var mode = useSystemColorMode ? getColorScheme(initialColorMode) : root.get() || colorModeManager.get();

      if (mode) {
        rawSetColorMode(mode);
      }
    }
  }, [colorModeManager, useSystemColorMode, initialColorMode]);
  react.useEffect(function () {
    var isDark = colorMode === "dark";
    syncBodyClassName(isDark);
    root.set(isDark ? "dark" : "light");
  }, [colorMode]);
  var setColorMode = react.useCallback(function (value) {
    colorModeManager.set(value);
    rawSetColorMode(value);
  }, [colorModeManager]);
  var toggleColorMode = react.useCallback(function () {
    setColorMode(colorMode === "light" ? "dark" : "light");
  }, [colorMode, setColorMode]);
  react.useEffect(function () {
    var removeListener;

    if (useSystemColorMode) {
      removeListener = addListener(setColorMode);
    }

    return function () {
      if (removeListener && useSystemColorMode) {
        removeListener();
      }
    };
  }, [setColorMode, useSystemColorMode]); // presence of `value` indicates a controlled context

  var context = react.useMemo(function () {
    return {
      colorMode: value != null ? value : colorMode,
      toggleColorMode: value ? noop : toggleColorMode,
      setColorMode: value ? noop : setColorMode
    };
  }, [colorMode, setColorMode, toggleColorMode, value]);
  return /*#__PURE__*/react.createElement(ColorModeContext.Provider, {
    value: context
  }, children);
}

var tokenToCSSVar = function tokenToCSSVar(scale, value) {
  return function (theme) {
    var valueStr = String(value);
    var key = scale ? scale + "." + valueStr : valueStr;
    return isObject(theme.__cssMap) && key in theme.__cssMap ? theme.__cssMap[key].varRef : value;
  };
};
function createTransform(options) {
  var scale = options.scale,
      transform = options.transform,
      compose = options.compose;

  var fn = function fn(value, theme) {
    var _transform;

    var _value = tokenToCSSVar(scale, value)(theme);

    var result = (_transform = transform == null ? void 0 : transform(_value, theme)) != null ? _transform : _value;

    if (compose) {
      result = compose(result, theme);
    }

    return result;
  };

  return fn;
}

function toConfig(scale, transform) {
  return function (property) {
    var result = {
      property: property,
      scale: scale
    };
    result.transform = createTransform({
      scale: scale,
      transform: transform
    });
    return result;
  };
}

var getRtl = function getRtl(_ref) {
  var rtl = _ref.rtl,
      ltr = _ref.ltr;
  return function (theme) {
    return theme.direction === "rtl" ? rtl : ltr;
  };
};

function logical(options) {
  var property = options.property,
      scale = options.scale,
      transform = options.transform;
  return {
    scale: scale,
    property: getRtl(property),
    transform: scale ? createTransform({
      scale: scale,
      compose: transform
    }) : transform
  };
}

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The CSS transform order following the upcoming spec from CSSWG
 * translate => rotate => scale => skew
 * @see https://drafts.csswg.org/css-transforms-2/#ctm
 * @see https://www.stefanjudis.com/blog/order-in-css-transformation-transform-functions-vs-individual-transforms/
 */
var transformTemplate = ["rotate(var(--chakra-rotate, 0))", "scaleX(var(--chakra-scale-x, 1))", "scaleY(var(--chakra-scale-y, 1))", "skewX(var(--chakra-skew-x, 0))", "skewY(var(--chakra-skew-y, 0))"];
function getTransformTemplate() {
  return ["translateX(var(--chakra-translate-x, 0))", "translateY(var(--chakra-translate-y, 0))"].concat(transformTemplate).join(" ");
}
function getTransformGpuTemplate() {
  return ["translate3d(var(--chakra-translate-x, 0), var(--chakra-translate-y, 0), 0)"].concat(transformTemplate).join(" ");
}
var filterTemplate = {
  "--chakra-blur": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-invert": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-sepia": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-drop-shadow": "var(--chakra-empty,/*!*/ /*!*/)",
  filter: ["var(--chakra-blur)", "var(--chakra-brightness)", "var(--chakra-contrast)", "var(--chakra-grayscale)", "var(--chakra-hue-rotate)", "var(--chakra-invert)", "var(--chakra-saturate)", "var(--chakra-sepia)", "var(--chakra-drop-shadow)"].join(" ")
};
var backdropFilterTemplate = {
  backdropFilter: ["var(--chakra-backdrop-blur)", "var(--chakra-backdrop-brightness)", "var(--chakra-backdrop-contrast)", "var(--chakra-backdrop-grayscale)", "var(--chakra-backdrop-hue-rotate)", "var(--chakra-backdrop-invert)", "var(--chakra-backdrop-opacity)", "var(--chakra-backdrop-saturate)", "var(--chakra-backdrop-sepia)"].join(" "),
  "--chakra-backdrop-blur": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-invert": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-opacity": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-sepia": "var(--chakra-empty,/*!*/ /*!*/)"
};
function getRingTemplate(value) {
  return {
    "--chakra-ring-offset-shadow": "var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset-width) var(--chakra-ring-offset-color)",
    "--chakra-ring-shadow": "var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset-width)) var(--chakra-ring-color)",
    "--chakra-ring-width": value,
    boxShadow: ["var(--chakra-ring-offset-shadow)", "var(--chakra-ring-shadow)", "var(--chakra-shadow, 0 0 #0000)"].join(", ")
  };
}
var flexDirectionTemplate = {
  "row-reverse": {
    space: "--chakra-space-x-reverse",
    divide: "--chakra-divide-x-reverse"
  },
  "column-reverse": {
    space: "--chakra-space-y-reverse",
    divide: "--chakra-divide-y-reverse"
  }
};
var owlSelector = "& > :not(style) ~ :not(style)";
var spaceXTemplate = _defineProperty({}, owlSelector, {
  marginInlineStart: "calc(var(--chakra-space-x) * calc(1 - var(--chakra-space-x-reverse)))",
  marginInlineEnd: "calc(var(--chakra-space-x) * var(--chakra-space-x-reverse))"
});
var spaceYTemplate = _defineProperty({}, owlSelector, {
  marginTop: "calc(var(--chakra-space-y) * calc(1 - var(--chakra-space-y-reverse)))",
  marginBottom: "calc(var(--chakra-space-y) * var(--chakra-space-y-reverse))"
});

function _slicedToArray$9(arr, i) { return _arrayWithHoles$9(arr) || _iterableToArrayLimit$9(arr, i) || _unsupportedIterableToArray$9(arr, i) || _nonIterableRest$9(); }

function _iterableToArrayLimit$9(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _toArray(arr) { return _arrayWithHoles$9(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$9(arr) || _nonIterableRest$9(); }

function _nonIterableRest$9() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$9(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$9(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$9(o, minLen); }

function _arrayLikeToArray$9(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray$2(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithHoles$9(arr) { if (Array.isArray(arr)) return arr; }

function _typeof$3(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$3 = function _typeof(obj) { return typeof obj; }; } else { _typeof$3 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$3(obj); }

function _wrapRegExp(re, groups) {
  _wrapRegExp = function _wrapRegExp(re, groups) {
    return new BabelRegExp(re, undefined, groups);
  };

  var _RegExp = _wrapNativeSuper(RegExp);

  var _super = RegExp.prototype;

  var _groups = new WeakMap();

  function BabelRegExp(re, flags, groups) {
    var _this = _RegExp.call(this, re, flags);

    _groups.set(_this, groups || _groups.get(re));

    return _this;
  }

  _inherits(BabelRegExp, _RegExp);

  BabelRegExp.prototype.exec = function (str) {
    var result = _super.exec.call(this, str);

    if (result) result.groups = buildGroups(result, this);
    return result;
  };

  BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
    if (typeof substitution === "string") {
      var groups = _groups.get(this);

      return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
        return "$" + groups[name];
      }));
    } else if (typeof substitution === "function") {
      var _this = this;

      return _super[Symbol.replace].call(this, str, function () {
        var args = [];
        args.push.apply(args, arguments);

        if (_typeof$3(args[args.length - 1]) !== "object") {
          args.push(buildGroups(args, _this));
        }

        return substitution.apply(this, args);
      });
    } else {
      return _super[Symbol.replace].call(this, str, substitution);
    }
  };

  function buildGroups(result, re) {
    var g = _groups.get(re);

    return Object.keys(g).reduce(function (groups, name) {
      groups[name] = result[g[name]];
      return groups;
    }, Object.create(null));
  }

  return _wrapRegExp.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

var directionMap = {
  "to-t": "to top",
  "to-tr": "to top right",
  "to-r": "to right",
  "to-br": "to bottom right",
  "to-b": "to bottom",
  "to-bl": "to bottom left",
  "to-l": "to left",
  "to-tl": "to top left"
};
var valueSet = new Set(Object.values(directionMap));
var globalSet = new Set(["none", "-moz-initial", "inherit", "initial", "revert", "unset"]);

var trimSpace = function trimSpace(str) {
  return str.trim();
};

function parseGradient(value, theme) {
  var _regex$exec$groups, _regex$exec;

  if (value == null || globalSet.has(value)) return value;

  var regex = /*#__PURE__*/_wrapRegExp(/(^[\x2DA-Za-z]+)\(((.*))\)/g, {
    type: 1,
    values: 2
  });

  var _ref = (_regex$exec$groups = (_regex$exec = regex.exec(value)) == null ? void 0 : _regex$exec.groups) != null ? _regex$exec$groups : {},
      type = _ref.type,
      values = _ref.values;

  if (!type || !values) return value;

  var _type = type.includes("-gradient") ? type : type + "-gradient";

  var _values$split$map$fil = values.split(",").map(trimSpace).filter(Boolean),
      _values$split$map$fil2 = _toArray(_values$split$map$fil),
      maybeDirection = _values$split$map$fil2[0],
      stops = _values$split$map$fil2.slice(1);

  if ((stops == null ? void 0 : stops.length) === 0) return value;
  var direction = maybeDirection in directionMap ? directionMap[maybeDirection] : maybeDirection;
  stops.unshift(direction);

  var _values = stops.map(function (stop) {
    // if stop is valid shorthand direction, return it
    if (valueSet.has(stop)) return stop; // color stop could be `red.200 20%` based on css gradient spec

    var _stop$split = stop.split(" "),
        _stop$split2 = _slicedToArray$9(_stop$split, 2),
        _color = _stop$split2[0],
        _stop = _stop$split2[1]; // else, get and transform the color token or css value


    var key = "colors." + _color;
    var color = key in theme.__cssMap ? theme.__cssMap[key].varRef : _color;
    return _stop ? [color, _stop].join(" ") : color;
  });

  return _type + "(" + _values.join(", ") + ")";
}
var gradientTransform = function gradientTransform(value, theme) {
  return parseGradient(value, theme != null ? theme : {});
};

var analyzeCSSValue$1 = function analyzeCSSValue(value) {
  var num = parseFloat(value.toString());
  var unit = value.toString().replace(String(num), "");
  return {
    unitless: !unit,
    value: num,
    unit: unit
  };
};

var wrap = function wrap(str) {
  return function (value) {
    return str + "(" + value + ")";
  };
};

var transformFunctions = {
  filter: function filter(value) {
    return value !== "auto" ? value : filterTemplate;
  },
  backdropFilter: function backdropFilter(value) {
    return value !== "auto" ? value : backdropFilterTemplate;
  },
  ring: function ring(value) {
    return getRingTemplate(transformFunctions.px(value));
  },
  bgClip: function bgClip(value) {
    return value === "text" ? {
      color: "transparent",
      backgroundClip: "text"
    } : {
      backgroundClip: value
    };
  },
  transform: function transform(value) {
    if (value === "auto") return getTransformTemplate();
    if (value === "auto-gpu") return getTransformGpuTemplate();
    return value;
  },
  px: function px(value) {
    if (value == null) return value;

    var _analyzeCSSValue = analyzeCSSValue$1(value),
        unitless = _analyzeCSSValue.unitless;

    return unitless || isNumber(value) ? value + "px" : value;
  },
  fraction: function fraction(value) {
    return !isNumber(value) || value > 1 ? value : value * 100 + "%";
  },
  "float": function float(value, theme) {
    var map = {
      left: "right",
      right: "left"
    };
    return theme.direction === "rtl" ? map[value] : value;
  },
  degree: function degree(value) {
    if (isCssVar(value) || value == null) return value;
    var unitless = isString(value) && !value.endsWith("deg");
    return isNumber(value) || unitless ? value + "deg" : value;
  },
  gradient: gradientTransform,
  blur: wrap("blur"),
  opacity: wrap("opacity"),
  brightness: wrap("brightness"),
  contrast: wrap("contrast"),
  dropShadow: wrap("drop-shadow"),
  grayscale: wrap("grayscale"),
  hueRotate: wrap("hue-rotate"),
  invert: wrap("invert"),
  saturate: wrap("saturate"),
  sepia: wrap("sepia"),
  bgImage: function bgImage(value) {
    if (value == null) return value;
    var prevent = isCSSFunction(value) || globalSet.has(value);
    return !prevent ? "url(" + value + ")" : value;
  },
  outline: function outline(value) {
    var isNoneOrZero = String(value) === "0" || String(value) === "none";
    return value !== null && isNoneOrZero ? {
      outline: "2px solid transparent",
      outlineOffset: "2px"
    } : {
      outline: value
    };
  },
  flexDirection: function flexDirection(value) {
    var _flexDirectionTemplat;

    var _ref = (_flexDirectionTemplat = flexDirectionTemplate[value]) != null ? _flexDirectionTemplat : {},
        space = _ref.space,
        divide = _ref.divide;

    var result = {
      flexDirection: value
    };
    if (space) result[space] = 1;
    if (divide) result[divide] = 1;
    return result;
  }
};

var isCSSFunction = function isCSSFunction(value) {
  return isString(value) && value.includes("(") && value.includes(")");
};

function _extends$3() {
  _extends$3 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$3.apply(this, arguments);
}
var t$2 = {
  borderWidths: toConfig("borderWidths"),
  borderStyles: toConfig("borderStyles"),
  colors: toConfig("colors"),
  borders: toConfig("borders"),
  radii: toConfig("radii", transformFunctions.px),
  space: toConfig("space", transformFunctions.px),
  spaceT: toConfig("space", transformFunctions.px),
  degreeT: function degreeT(property) {
    return {
      property: property,
      transform: transformFunctions.degree
    };
  },
  prop: function prop(property, scale, transform) {
    return _extends$3({
      property: property,
      scale: scale
    }, scale && {
      transform: createTransform({
        scale: scale,
        transform: transform
      })
    });
  },
  propT: function propT(property, transform) {
    return {
      property: property,
      transform: transform
    };
  },
  sizes: toConfig("sizes", transformFunctions.px),
  sizesT: toConfig("sizes", transformFunctions.fraction),
  shadows: toConfig("shadows"),
  logical: logical,
  blur: toConfig("blur", transformFunctions.blur)
};

var background = {
  background: t$2.colors("background"),
  backgroundColor: t$2.colors("backgroundColor"),
  backgroundImage: t$2.propT("backgroundImage", transformFunctions.bgImage),
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundClip: {
    transform: transformFunctions.bgClip
  },
  bgSize: t$2.prop("backgroundSize"),
  bgPosition: t$2.prop("backgroundPosition"),
  bg: t$2.colors("background"),
  bgColor: t$2.colors("backgroundColor"),
  bgPos: t$2.prop("backgroundPosition"),
  bgRepeat: t$2.prop("backgroundRepeat"),
  bgAttachment: t$2.prop("backgroundAttachment"),
  bgGradient: t$2.propT("backgroundImage", transformFunctions.gradient),
  bgClip: {
    transform: transformFunctions.bgClip
  }
};
Object.assign(background, {
  bgImage: background.backgroundImage,
  bgImg: background.backgroundImage
});

var border = {
  border: t$2.borders("border"),
  borderWidth: t$2.borderWidths("borderWidth"),
  borderStyle: t$2.borderStyles("borderStyle"),
  borderColor: t$2.colors("borderColor"),
  borderRadius: t$2.radii("borderRadius"),
  borderTop: t$2.borders("borderTop"),
  borderBlockStart: t$2.borders("borderBlockStart"),
  borderTopLeftRadius: t$2.radii("borderTopLeftRadius"),
  borderStartStartRadius: t$2.logical({
    scale: "radii",
    property: {
      ltr: "borderTopLeftRadius",
      rtl: "borderTopRightRadius"
    }
  }),
  borderEndStartRadius: t$2.logical({
    scale: "radii",
    property: {
      ltr: "borderBottomLeftRadius",
      rtl: "borderBottomRightRadius"
    }
  }),
  borderTopRightRadius: t$2.radii("borderTopRightRadius"),
  borderStartEndRadius: t$2.logical({
    scale: "radii",
    property: {
      ltr: "borderTopRightRadius",
      rtl: "borderTopLeftRadius"
    }
  }),
  borderEndEndRadius: t$2.logical({
    scale: "radii",
    property: {
      ltr: "borderBottomRightRadius",
      rtl: "borderBottomLeftRadius"
    }
  }),
  borderRight: t$2.borders("borderRight"),
  borderInlineEnd: t$2.borders("borderInlineEnd"),
  borderBottom: t$2.borders("borderBottom"),
  borderBlockEnd: t$2.borders("borderBlockEnd"),
  borderBottomLeftRadius: t$2.radii("borderBottomLeftRadius"),
  borderBottomRightRadius: t$2.radii("borderBottomRightRadius"),
  borderLeft: t$2.borders("borderLeft"),
  borderInlineStart: {
    property: "borderInlineStart",
    scale: "borders"
  },
  borderInlineStartRadius: t$2.logical({
    scale: "radii",
    property: {
      ltr: ["borderTopLeftRadius", "borderBottomLeftRadius"],
      rtl: ["borderTopRightRadius", "borderBottomRightRadius"]
    }
  }),
  borderInlineEndRadius: t$2.logical({
    scale: "radii",
    property: {
      ltr: ["borderTopRightRadius", "borderBottomRightRadius"],
      rtl: ["borderTopLeftRadius", "borderBottomLeftRadius"]
    }
  }),
  borderX: t$2.borders(["borderLeft", "borderRight"]),
  borderInline: t$2.borders("borderInline"),
  borderY: t$2.borders(["borderTop", "borderBottom"]),
  borderBlock: t$2.borders("borderBlock"),
  borderTopWidth: t$2.borderWidths("borderTopWidth"),
  borderBlockStartWidth: t$2.borderWidths("borderBlockStartWidth"),
  borderTopColor: t$2.colors("borderTopColor"),
  borderBlockStartColor: t$2.colors("borderBlockStartColor"),
  borderTopStyle: t$2.borderStyles("borderTopStyle"),
  borderBlockStartStyle: t$2.borderStyles("borderBlockStartStyle"),
  borderBottomWidth: t$2.borderWidths("borderBottomWidth"),
  borderBlockEndWidth: t$2.borderWidths("borderBlockEndWidth"),
  borderBottomColor: t$2.colors("borderBottomColor"),
  borderBlockEndColor: t$2.colors("borderBlockEndColor"),
  borderBottomStyle: t$2.borderStyles("borderBottomStyle"),
  borderBlockEndStyle: t$2.borderStyles("borderBlockEndStyle"),
  borderLeftWidth: t$2.borderWidths("borderLeftWidth"),
  borderInlineStartWidth: t$2.borderWidths("borderInlineStartWidth"),
  borderLeftColor: t$2.colors("borderLeftColor"),
  borderInlineStartColor: t$2.colors("borderInlineStartColor"),
  borderLeftStyle: t$2.borderStyles("borderLeftStyle"),
  borderInlineStartStyle: t$2.borderStyles("borderInlineStartStyle"),
  borderRightWidth: t$2.borderWidths("borderRightWidth"),
  borderInlineEndWidth: t$2.borderWidths("borderInlineEndWidth"),
  borderRightColor: t$2.colors("borderRightColor"),
  borderInlineEndColor: t$2.colors("borderInlineEndColor"),
  borderRightStyle: t$2.borderStyles("borderRightStyle"),
  borderInlineEndStyle: t$2.borderStyles("borderInlineEndStyle"),
  borderTopRadius: t$2.radii(["borderTopLeftRadius", "borderTopRightRadius"]),
  borderBottomRadius: t$2.radii(["borderBottomLeftRadius", "borderBottomRightRadius"]),
  borderLeftRadius: t$2.radii(["borderTopLeftRadius", "borderBottomLeftRadius"]),
  borderRightRadius: t$2.radii(["borderTopRightRadius", "borderBottomRightRadius"])
};
Object.assign(border, {
  rounded: border.borderRadius,
  roundedTop: border.borderTopRadius,
  roundedTopLeft: border.borderTopLeftRadius,
  roundedTopRight: border.borderTopRightRadius,
  roundedTopStart: border.borderStartStartRadius,
  roundedTopEnd: border.borderStartEndRadius,
  roundedBottom: border.borderBottomRadius,
  roundedBottomLeft: border.borderBottomLeftRadius,
  roundedBottomRight: border.borderBottomRightRadius,
  roundedBottomStart: border.borderEndStartRadius,
  roundedBottomEnd: border.borderEndEndRadius,
  roundedLeft: border.borderLeftRadius,
  roundedRight: border.borderRightRadius,
  roundedStart: border.borderInlineStartRadius,
  roundedEnd: border.borderInlineEndRadius,
  borderStart: border.borderInlineStart,
  borderEnd: border.borderInlineEnd,
  borderTopStartRadius: border.borderStartStartRadius,
  borderTopEndRadius: border.borderStartEndRadius,
  borderBottomStartRadius: border.borderEndStartRadius,
  borderBottomEndRadius: border.borderEndEndRadius,
  borderStartRadius: border.borderInlineStartRadius,
  borderEndRadius: border.borderInlineEndRadius,
  borderStartWidth: border.borderInlineStartWidth,
  borderEndWidth: border.borderInlineEndWidth,
  borderStartColor: border.borderInlineStartColor,
  borderEndColor: border.borderInlineEndColor,
  borderStartStyle: border.borderInlineStartStyle,
  borderEndStyle: border.borderInlineEndStyle
});
/**
 * The prop types for border properties listed above
 */

var color = {
  color: t$2.colors("color"),
  textColor: t$2.colors("color"),
  fill: t$2.colors("fill"),
  stroke: t$2.colors("stroke")
};

var effect = {
  boxShadow: t$2.shadows("boxShadow"),
  mixBlendMode: true,
  blendMode: t$2.prop("mixBlendMode"),
  backgroundBlendMode: true,
  bgBlendMode: t$2.prop("backgroundBlendMode"),
  opacity: true
};
Object.assign(effect, {
  shadow: effect.boxShadow
});
/**
 * Types for box and text shadow properties
 */

var filter = {
  filter: {
    transform: transformFunctions.filter
  },
  blur: t$2.blur("--chakra-blur"),
  brightness: t$2.propT("--chakra-brightness", transformFunctions.brightness),
  contrast: t$2.propT("--chakra-contrast", transformFunctions.contrast),
  hueRotate: t$2.degreeT("--chakra-hue-rotate"),
  invert: t$2.propT("--chakra-invert", transformFunctions.invert),
  saturate: t$2.propT("--chakra-saturate", transformFunctions.saturate),
  dropShadow: t$2.propT("--chakra-drop-shadow", transformFunctions.dropShadow),
  backdropFilter: {
    transform: transformFunctions.backdropFilter
  },
  backdropBlur: t$2.blur("--chakra-backdrop-blur"),
  backdropBrightness: t$2.propT("--chakra-backdrop-brightness", transformFunctions.brightness),
  backdropContrast: t$2.propT("--chakra-backdrop-contrast", transformFunctions.contrast),
  backdropHueRotate: t$2.degreeT("--chakra-backdrop-hue-rotate"),
  backdropInvert: t$2.propT("--chakra-backdrop-invert", transformFunctions.invert),
  backdropSaturate: t$2.propT("--chakra-backdrop-saturate", transformFunctions.saturate)
};

var flexbox = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: {
    transform: transformFunctions.flexDirection
  },
  experimental_spaceX: {
    "static": spaceXTemplate,
    transform: createTransform({
      scale: "space",
      transform: function transform(value) {
        return value !== null ? {
          "--chakra-space-x": value
        } : null;
      }
    })
  },
  experimental_spaceY: {
    "static": spaceYTemplate,
    transform: createTransform({
      scale: "space",
      transform: function transform(value) {
        return value != null ? {
          "--chakra-space-y": value
        } : null;
      }
    })
  },
  flex: true,
  flexFlow: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: t$2.sizes("flexBasis"),
  justifySelf: true,
  alignSelf: true,
  order: true,
  placeItems: true,
  placeContent: true,
  placeSelf: true
};
Object.assign(flexbox, {
  flexDir: flexbox.flexDirection
});

var grid = {
  gridGap: t$2.space("gridGap"),
  gridColumnGap: t$2.space("gridColumnGap"),
  gridRowGap: t$2.space("gridRowGap"),
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridColumnStart: true,
  gridColumnEnd: true,
  gridRowStart: true,
  gridRowEnd: true,
  gridAutoRows: true,
  gridTemplate: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true
};

var interactivity = {
  appearance: true,
  cursor: true,
  resize: true,
  userSelect: true,
  pointerEvents: true,
  outline: {
    transform: transformFunctions.outline
  },
  outlineOffset: true,
  outlineColor: t$2.colors("outlineColor")
};

var layout = {
  width: t$2.sizesT("width"),
  inlineSize: t$2.sizesT("inlineSize"),
  height: t$2.sizes("height"),
  blockSize: t$2.sizes("blockSize"),
  boxSize: t$2.sizes(["width", "height"]),
  minWidth: t$2.sizes("minWidth"),
  minInlineSize: t$2.sizes("minInlineSize"),
  minHeight: t$2.sizes("minHeight"),
  minBlockSize: t$2.sizes("minBlockSize"),
  maxWidth: t$2.sizes("maxWidth"),
  maxInlineSize: t$2.sizes("maxInlineSize"),
  maxHeight: t$2.sizes("maxHeight"),
  maxBlockSize: t$2.sizes("maxBlockSize"),
  d: t$2.prop("display"),
  overflow: true,
  overflowX: true,
  overflowY: true,
  overscrollBehavior: true,
  overscrollBehaviorX: true,
  overscrollBehaviorY: true,
  display: true,
  verticalAlign: true,
  boxSizing: true,
  boxDecorationBreak: true,
  "float": t$2.propT("float", transformFunctions["float"]),
  objectFit: true,
  objectPosition: true,
  visibility: true,
  isolation: true
};
Object.assign(layout, {
  w: layout.width,
  h: layout.height,
  minW: layout.minWidth,
  maxW: layout.maxWidth,
  minH: layout.minHeight,
  maxH: layout.maxHeight,
  overscroll: layout.overscrollBehavior,
  overscrollX: layout.overscrollBehaviorX,
  overscrollY: layout.overscrollBehaviorY
});
/**
 * Types for layout related CSS properties
 */

var list = {
  listStyleType: true,
  listStylePosition: true,
  listStylePos: t$2.prop("listStylePosition"),
  listStyleImage: true,
  listStyleImg: t$2.prop("listStyleImage")
};

var srOnly = {
  border: "0px",
  clip: "rect(0, 0, 0, 0)",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute"
};
var srFocusable = {
  position: "static",
  width: "auto",
  height: "auto",
  clip: "auto",
  padding: "0",
  margin: "0",
  overflow: "visible",
  whiteSpace: "normal"
};

var getWithPriority = function getWithPriority(theme, key, styles) {
  var result = {};
  var obj = memoizedGet(theme, key, {});

  for (var prop in obj) {
    var isInStyles = prop in styles && styles[prop] != null;
    if (!isInStyles) result[prop] = obj[prop];
  }

  return result;
};

var others = {
  srOnly: {
    transform: function transform(value) {
      if (value === true) return srOnly;
      if (value === "focusable") return srFocusable;
      return {};
    }
  },
  layerStyle: {
    processResult: true,
    transform: function transform(value, theme, styles) {
      return getWithPriority(theme, "layerStyles." + value, styles);
    }
  },
  textStyle: {
    processResult: true,
    transform: function transform(value, theme, styles) {
      return getWithPriority(theme, "textStyles." + value, styles);
    }
  },
  apply: {
    processResult: true,
    transform: function transform(value, theme, styles) {
      return getWithPriority(theme, value, styles);
    }
  }
};

var position = {
  position: true,
  pos: t$2.prop("position"),
  zIndex: t$2.prop("zIndex", "zIndices"),
  inset: t$2.spaceT(["top", "right", "bottom", "left"]),
  insetX: t$2.spaceT(["left", "right"]),
  insetInline: t$2.spaceT("insetInline"),
  insetY: t$2.spaceT(["top", "bottom"]),
  insetBlock: t$2.spaceT("insetBlock"),
  top: t$2.spaceT("top"),
  insetBlockStart: t$2.spaceT("insetBlockStart"),
  bottom: t$2.spaceT("bottom"),
  insetBlockEnd: t$2.spaceT("insetBlockEnd"),
  left: t$2.spaceT("left"),
  insetInlineStart: t$2.logical({
    scale: "space",
    property: {
      ltr: "left",
      rtl: "right"
    }
  }),
  right: t$2.spaceT("right"),
  insetInlineEnd: t$2.logical({
    scale: "space",
    property: {
      ltr: "right",
      rtl: "left"
    }
  })
};
Object.assign(position, {
  insetStart: position.insetInlineStart,
  insetEnd: position.insetInlineEnd
});
/**
 * Types for position CSS properties
 */

/**
 * The parser configuration for common outline properties
 */

var ring = {
  ring: {
    transform: transformFunctions.ring
  },
  ringColor: t$2.colors("--chakra-ring-color"),
  ringOffset: t$2.prop("--chakra-ring-offset-width"),
  ringOffsetColor: t$2.colors("--chakra-ring-offset-color"),
  ringInset: t$2.prop("--chakra-ring-inset")
};

var space = {
  margin: t$2.spaceT("margin"),
  marginTop: t$2.spaceT("marginTop"),
  marginBlockStart: t$2.spaceT("marginBlockStart"),
  marginRight: t$2.spaceT("marginRight"),
  marginInlineEnd: t$2.spaceT("marginInlineEnd"),
  marginBottom: t$2.spaceT("marginBottom"),
  marginBlockEnd: t$2.spaceT("marginBlockEnd"),
  marginLeft: t$2.spaceT("marginLeft"),
  marginInlineStart: t$2.spaceT("marginInlineStart"),
  marginX: t$2.spaceT(["marginInlineStart", "marginInlineEnd"]),
  marginInline: t$2.spaceT("marginInline"),
  marginY: t$2.spaceT(["marginTop", "marginBottom"]),
  marginBlock: t$2.spaceT("marginBlock"),
  padding: t$2.space("padding"),
  paddingTop: t$2.space("paddingTop"),
  paddingBlockStart: t$2.space("paddingBlockStart"),
  paddingRight: t$2.space("paddingRight"),
  paddingBottom: t$2.space("paddingBottom"),
  paddingBlockEnd: t$2.space("paddingBlockEnd"),
  paddingLeft: t$2.space("paddingLeft"),
  paddingInlineStart: t$2.space("paddingInlineStart"),
  paddingInlineEnd: t$2.space("paddingInlineEnd"),
  paddingX: t$2.space(["paddingInlineStart", "paddingInlineEnd"]),
  paddingInline: t$2.space("paddingInline"),
  paddingY: t$2.space(["paddingTop", "paddingBottom"]),
  paddingBlock: t$2.space("paddingBlock")
};
Object.assign(space, {
  m: space.margin,
  mt: space.marginTop,
  mr: space.marginRight,
  me: space.marginInlineEnd,
  marginEnd: space.marginInlineEnd,
  mb: space.marginBottom,
  ml: space.marginLeft,
  ms: space.marginInlineStart,
  marginStart: space.marginInlineStart,
  mx: space.marginX,
  my: space.marginY,
  p: space.padding,
  pt: space.paddingTop,
  py: space.paddingY,
  px: space.paddingX,
  pb: space.paddingBottom,
  pl: space.paddingLeft,
  ps: space.paddingInlineStart,
  paddingStart: space.paddingInlineStart,
  pr: space.paddingRight,
  pe: space.paddingInlineEnd,
  paddingEnd: space.paddingInlineEnd
});
/**
 * Types for space related CSS properties
 */

var textDecoration = {
  textDecorationColor: t$2.colors("textDecorationColor"),
  textDecoration: true,
  textDecor: {
    property: "textDecoration"
  },
  textDecorationLine: true,
  textDecorationStyle: true,
  textDecorationThickness: true,
  textUnderlineOffset: true,
  textShadow: t$2.shadows("textShadow")
};

var transform = {
  clipPath: true,
  transform: t$2.propT("transform", transformFunctions.transform),
  transformOrigin: true,
  translateX: t$2.spaceT("--chakra-translate-x"),
  translateY: t$2.spaceT("--chakra-translate-y"),
  skewX: t$2.degreeT("--chakra-skew-x"),
  skewY: t$2.degreeT("--chakra-skew-y"),
  scaleX: t$2.prop("--chakra-scale-x"),
  scaleY: t$2.prop("--chakra-scale-y"),
  scale: t$2.prop(["--chakra-scale-x", "--chakra-scale-y"]),
  rotate: t$2.degreeT("--chakra-rotate")
};

var transition = {
  transition: true,
  transitionDelay: true,
  animation: true,
  willChange: true,
  transitionDuration: t$2.prop("transitionDuration", "transition.duration"),
  transitionProperty: t$2.prop("transitionProperty", "transition.property"),
  transitionTimingFunction: t$2.prop("transitionTimingFunction", "transition.easing")
};

var typography = {
  fontFamily: t$2.prop("fontFamily", "fonts"),
  fontSize: t$2.prop("fontSize", "fontSizes", transformFunctions.px),
  fontWeight: t$2.prop("fontWeight", "fontWeights"),
  lineHeight: t$2.prop("lineHeight", "lineHeights"),
  letterSpacing: t$2.prop("letterSpacing", "letterSpacings"),
  textAlign: true,
  fontStyle: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  noOfLines: {
    "static": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      //@ts-ignore
      WebkitLineClamp: "var(--chakra-line-clamp)"
    },
    property: "--chakra-line-clamp"
  },
  isTruncated: {
    transform: function transform(value) {
      if (value === true) {
        return {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        };
      }
    }
  }
};
/**
 * Types for typography related CSS properties
 */

var group = {
  hover: function hover(selector) {
    return selector + ":hover &, " + selector + "[data-hover] &";
  },
  focus: function focus(selector) {
    return selector + ":focus &, " + selector + "[data-focus] &";
  },
  active: function active(selector) {
    return selector + ":active &, " + selector + "[data-active] &";
  },
  disabled: function disabled(selector) {
    return selector + ":disabled &, " + selector + "[data-disabled] &";
  },
  invalid: function invalid(selector) {
    return selector + ":invalid &, " + selector + "[data-invalid] &";
  },
  checked: function checked(selector) {
    return selector + ":checked &, " + selector + "[data-checked] &";
  },
  indeterminate: function indeterminate(selector) {
    return selector + ":indeterminate &, " + selector + "[aria-checked=mixed] &, " + selector + "[data-indeterminate] &";
  },
  readOnly: function readOnly(selector) {
    return selector + ":read-only &, " + selector + "[readonly] &, " + selector + "[data-read-only] &";
  },
  expanded: function expanded(selector) {
    return selector + ":read-only &, " + selector + "[aria-expanded=true] &, " + selector + "[data-expanded] &";
  }
};

var toGroup = function toGroup(fn) {
  return merge(fn, "[role=group]", "[data-group]", ".group");
};

var merge = function merge(fn) {
  for (var _len = arguments.length, selectors = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    selectors[_key - 1] = arguments[_key];
  }

  return selectors.map(fn).join(", ");
};

var pseudoSelectors = {
  /**
   * Styles for CSS selector `&:hover`
   */
  _hover: "&:hover, &[data-hover]",

  /**
   * Styles for CSS Selector `&:active`
   */
  _active: "&:active, &[data-active]",

  /**
   * Styles for CSS selector `&:focus`
   *
   */
  _focus: "&:focus, &[data-focus]",

  /**
   * Styles for the highlighted state.
   */
  _highlighted: "&[data-highlighted]",

  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin: "&:focus-within",
  _focusVisible: "&:focus-visible",

  /**
   * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
   * - `&[aria-disabled=true]`
   * - `&:disabled`
   * - `&[data-disabled]`
   */
  _disabled: "&[disabled], &[aria-disabled=true], &[data-disabled]",

  /**
   * Styles for CSS Selector `&:readonly`
   */
  _readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly]",

  /**
   * Styles for CSS selector `&::before`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _before={{content:`""` }}/>
   * ```
   */
  _before: "&::before",

  /**
   * Styles for CSS selector `&::after`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _after={{content:`""` }}/>
   * ```
   */
  _after: "&::after",
  _empty: "&:empty",

  /**
   * Styles to apply when the ARIA attribute `aria-expanded` is `true`
   * - CSS selector `&[aria-expanded=true]`
   */
  _expanded: "&[aria-expanded=true], &[data-expanded]",

  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `true`
   * - CSS selector `&[aria-checked=true]`
   */
  _checked: "&[aria-checked=true], &[data-checked]",

  /**
   * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
   * - CSS selector `&[aria-grabbed=true]`
   */
  _grabbed: "&[aria-grabbed=true], &[data-grabbed]",

  /**
   * Styles for CSS Selector `&[aria-pressed=true]`
   * Typically used to style the current "pressed" state of toggle buttons
   */
  _pressed: "&[aria-pressed=true], &[data-pressed]",

  /**
   * Styles to apply when the ARIA attribute `aria-invalid` is `true`
   * - CSS selector `&[aria-invalid=true]`
   */
  _invalid: "&[aria-invalid=true], &[data-invalid]",

  /**
   * Styles for the valid state
   * - CSS selector `&[data-valid], &[data-state=valid]`
   */
  _valid: "&[data-valid], &[data-state=valid]",

  /**
   * Styles for CSS Selector `&[aria-busy=true]` or `&[data-loading=true]`.
   * Useful for styling loading states
   */
  _loading: "&[data-loading], &[aria-busy=true]",

  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   *
   * - CSS selector `&[aria-selected=true]`
   */
  _selected: "&[aria-selected=true], &[data-selected]",

  /**
   * Styles for CSS Selector `[hidden=true]`
   */
  _hidden: "&[hidden], &[data-hidden]",

  /**
   * Styles for CSS Selector `&:-webkit-autofill`
   */
  _autofill: "&:-webkit-autofill",

  /**
   * Styles for CSS Selector `&:nth-child(even)`
   */
  _even: "&:nth-of-type(even)",

  /**
   * Styles for CSS Selector `&:nth-child(odd)`
   */
  _odd: "&:nth-of-type(odd)",

  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  _first: "&:first-of-type",

  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  _last: "&:last-of-type",

  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  _notFirst: "&:not(:first-of-type)",

  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  _notLast: "&:not(:last-of-type)",

  /**
   * Styles for CSS Selector `&:visited`
   */
  _visited: "&:visited",

  /**
   * Used to style the active link in a navigation
   * Styles for CSS Selector `&[aria-current=page]`
   */
  _activeLink: "&[aria-current=page]",

  /**
   * Used to style the current step within a process
   * Styles for CSS Selector `&[aria-current=step]`
   */
  _activeStep: "&[aria-current=step]",

  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
   * - CSS selector `&[aria-checked=mixed]`
   */
  _indeterminate: "&:indeterminate, &[aria-checked=mixed], &[data-indeterminate]",

  /**
   * Styles to apply when parent is hovered
   */
  _groupHover: toGroup(group.hover),

  /**
   * Styles to apply when parent is focused
   */
  _groupFocus: toGroup(group.focus),

  /**
   * Styles to apply when parent is active
   */
  _groupActive: toGroup(group.active),

  /**
   * Styles to apply when parent is disabled
   */
  _groupDisabled: toGroup(group.disabled),

  /**
   * Styles to apply when parent is invalid
   */
  _groupInvalid: toGroup(group.invalid),

  /**
   * Styles to apply when parent is checked
   */
  _groupChecked: toGroup(group.checked),

  /**
   * Styles for CSS Selector `&::placeholder`.
   */
  _placeholder: "&::placeholder",

  /**
   * Styles for CSS Selector `&:fullscreen`.
   */
  _fullScreen: "&:fullscreen",

  /**
   * Styles for CSS Selector `&::selection`
   */
  _selection: "&::selection",

  /**
   * Styles for CSS Selector `[dir=rtl] &`
   * It is applied when any parent element has `dir="rtl"`
   */
  _rtl: "[dir=rtl] &",

  /**
   * Styles for CSS Selector `@media (prefers-color-scheme: dark)`
   * used when the user has requested the system
   * use a light or dark color theme.
   */
  _mediaDark: "@media (prefers-color-scheme: dark)",

  /**
   * Styles for when `data-theme` is applied to any parent of
   * this component or element.
   */
  _dark: ".chakra-ui-dark &, [data-theme=dark] &, &[data-theme=dark]",

  /**
   * Styles for when `data-theme` is applied to any parent of
   * this component or element.
   */
  _light: ".chakra-ui-light &, [data-theme=light] &, &[data-theme=light]"
};
var pseudoPropNames = objectKeys(pseudoSelectors);

function _toConsumableArray$2(arr) { return _arrayWithoutHoles$2(arr) || _iterableToArray$3(arr) || _unsupportedIterableToArray$a(arr) || _nonIterableSpread$2(); }

function _nonIterableSpread$2() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$a(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$a(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$a(o, minLen); }

function _iterableToArray$3(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles$2(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$a(arr); }

function _arrayLikeToArray$a(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends$4() {
  _extends$4 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$4.apply(this, arguments);
}
var systemProps = lodash_mergewith({}, background, border, color, flexbox, layout, filter, ring, interactivity, grid, others, position, effect, space, typography, textDecoration, transform, list, transition);
var layoutSystem = Object.assign({}, space, layout, flexbox, grid, position);
var propNames = [].concat(_toConsumableArray$2(objectKeys(systemProps)), _toConsumableArray$2(pseudoPropNames));

var styleProps = _extends$4({}, systemProps, pseudoSelectors);

var isStyleProp = function isStyleProp(prop) {
  return prop in styleProps;
};

/**
 * Expands an array or object syntax responsive style.
 *
 * @example
 * expandResponsive({ mx: [1, 2] })
 * // or
 * expandResponsive({ mx: { base: 1, sm: 2 } })
 *
 * // => { mx: 1, "@media(min-width:<sm>)": { mx: 2 } }
 */

var expandResponsive = function expandResponsive(styles) {
  return function (theme) {
    /**
     * Before any style can be processed, the user needs to call `toCSSVar`
     * which analyzes the theme's breakpoint and appends a `__breakpoints` property
     * to the theme with more details of the breakpoints.
     *
     * To learn more, go here: packages/utils/src/responsive.ts #analyzeBreakpoints
     */
    if (!theme.__breakpoints) return styles;
    var _theme$__breakpoints = theme.__breakpoints,
        isResponsive = _theme$__breakpoints.isResponsive,
        toArrayValue = _theme$__breakpoints.toArrayValue,
        medias = _theme$__breakpoints.media;
    var computedStyles = {};

    for (var key in styles) {
      var value = runIfFn(styles[key], theme);
      if (value == null) continue; // converts the object responsive syntax to array syntax

      value = isObject(value) && isResponsive(value) ? toArrayValue(value) : value;

      if (!Array.isArray(value)) {
        computedStyles[key] = value;
        continue;
      }

      var queries = value.slice(0, medias.length).length;

      for (var index = 0; index < queries; index += 1) {
        var media = medias == null ? void 0 : medias[index];

        if (!media) {
          computedStyles[key] = value[index];
          continue;
        }

        computedStyles[media] = computedStyles[media] || {};

        if (value[index] == null) {
          continue;
        }

        computedStyles[media][key] = value[index];
      }
    }

    return computedStyles;
  };
};

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$b(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray$a(arr, i) { return _arrayWithHoles$a(arr) || _iterableToArrayLimit$a(arr, i) || _unsupportedIterableToArray$b(arr, i) || _nonIterableRest$a(); }

function _nonIterableRest$a() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$b(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$b(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$b(o, minLen); }

function _arrayLikeToArray$b(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$a(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$a(arr) { if (Array.isArray(arr)) return arr; }

var isCSSVariableTokenValue = function isCSSVariableTokenValue(key, value) {
  return key.startsWith("--") && isString(value) && !isCssVar(value);
};

var resolveTokenValue = function resolveTokenValue(theme, value) {
  var _ref, _getVar2;

  if (value == null) return value;

  var getVar = function getVar(val) {
    var _theme$__cssMap, _theme$__cssMap$val;

    return (_theme$__cssMap = theme.__cssMap) == null ? void 0 : (_theme$__cssMap$val = _theme$__cssMap[val]) == null ? void 0 : _theme$__cssMap$val.varRef;
  };

  var getValue = function getValue(val) {
    var _getVar;

    return (_getVar = getVar(val)) != null ? _getVar : val;
  };

  var valueSplit = value.split(",").map(function (v) {
    return v.trim();
  });

  var _valueSplit = _slicedToArray$a(valueSplit, 2),
      tokenValue = _valueSplit[0],
      fallbackValue = _valueSplit[1];

  value = (_ref = (_getVar2 = getVar(tokenValue)) != null ? _getVar2 : getValue(fallbackValue)) != null ? _ref : getValue(value);
  return value;
};

function getCss(options) {
  var _options$configs = options.configs,
      configs = _options$configs === void 0 ? {} : _options$configs,
      _options$pseudos = options.pseudos,
      pseudos = _options$pseudos === void 0 ? {} : _options$pseudos,
      theme = options.theme;

  var css = function css(stylesOrFn, nested) {
    if (nested === void 0) {
      nested = false;
    }

    var _styles = runIfFn(stylesOrFn, theme);

    var styles = expandResponsive(_styles)(theme);
    var computedStyles = {};

    for (var key in styles) {
      var _config$transform, _config, _config2, _config3, _config4;

      var valueOrFn = styles[key];
      /**
       * allows the user to pass functional values
       * boxShadow: theme => `0 2px 2px ${theme.colors.red}`
       */

      var value = runIfFn(valueOrFn, theme);
      /**
       * converts pseudo shorthands to valid selector
       * "_hover" => "&:hover"
       */

      if (key in pseudos) {
        key = pseudos[key];
      }
      /**
       * allows the user to use theme tokens in css vars
       * { --banner-height: "sizes.md" } => { --banner-height: "var(--chakra-sizes-md)" }
       *
       * You can also provide fallback values
       * { --banner-height: "sizes.no-exist, 40px" } => { --banner-height: "40px" }
       */


      if (isCSSVariableTokenValue(key, value)) {
        value = resolveTokenValue(theme, value);
      }

      var config = configs[key];

      if (config === true) {
        config = {
          property: key
        };
      }

      if (isObject(value)) {
        var _computedStyles$key;

        computedStyles[key] = (_computedStyles$key = computedStyles[key]) != null ? _computedStyles$key : {};
        computedStyles[key] = lodash_mergewith({}, computedStyles[key], css(value, true));
        continue;
      }

      var rawValue = (_config$transform = (_config = config) == null ? void 0 : _config.transform == null ? void 0 : _config.transform(value, theme, _styles)) != null ? _config$transform : value;
      /**
       * Used for `layerStyle`, `textStyle` and `apply`. After getting the
       * styles in the theme, we need to process them since they might
       * contain theme tokens.
       *
       * `processResult` is the config property we pass to `layerStyle`, `textStyle` and `apply`
       */

      rawValue = (_config2 = config) != null && _config2.processResult ? css(rawValue, true) : rawValue;
      /**
       * allows us define css properties for RTL and LTR.
       *
       * const marginStart = {
       *   property: theme => theme.direction === "rtl" ? "marginRight": "marginLeft",
       * }
       */

      var configProperty = runIfFn((_config3 = config) == null ? void 0 : _config3.property, theme);

      if (!nested && (_config4 = config) != null && _config4["static"]) {
        var staticStyles = runIfFn(config["static"], theme);
        computedStyles = lodash_mergewith({}, computedStyles, staticStyles);
      }

      if (configProperty && Array.isArray(configProperty)) {
        var _iterator = _createForOfIteratorHelper(configProperty),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var property = _step.value;
            computedStyles[property] = rawValue;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        continue;
      }

      if (configProperty) {
        if (configProperty === "&" && isObject(rawValue)) {
          computedStyles = lodash_mergewith({}, computedStyles, rawValue);
        } else {
          computedStyles[configProperty] = rawValue;
        }

        continue;
      }

      if (isObject(rawValue)) {
        computedStyles = lodash_mergewith({}, computedStyles, rawValue);
        continue;
      }

      computedStyles[key] = rawValue;
    }

    return computedStyles;
  };

  return css;
}
var css$1 = function css(styles) {
  return function (theme) {
    var cssFn = getCss({
      theme: theme,
      pseudos: pseudoSelectors,
      configs: systemProps
    });
    return cssFn(styles);
  };
};

/**
 * Thank you @markdalgleish for this piece of art!
 */

function resolveReference(operand) {
  if (isObject(operand) && operand.reference) {
    return operand.reference;
  }

  return String(operand);
}

var toExpression = function toExpression(operator) {
  for (var _len = arguments.length, operands = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    operands[_key - 1] = arguments[_key];
  }

  return operands.map(resolveReference).join(" " + operator + " ").replace(/calc/g, "");
};

var _add = function add() {
  for (var _len2 = arguments.length, operands = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    operands[_key2] = arguments[_key2];
  }

  return "calc(" + toExpression.apply(void 0, ["+"].concat(operands)) + ")";
};

var _subtract = function subtract() {
  for (var _len3 = arguments.length, operands = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    operands[_key3] = arguments[_key3];
  }

  return "calc(" + toExpression.apply(void 0, ["-"].concat(operands)) + ")";
};

var _multiply = function multiply() {
  for (var _len4 = arguments.length, operands = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    operands[_key4] = arguments[_key4];
  }

  return "calc(" + toExpression.apply(void 0, ["*"].concat(operands)) + ")";
};

var _divide = function divide() {
  for (var _len5 = arguments.length, operands = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    operands[_key5] = arguments[_key5];
  }

  return "calc(" + toExpression.apply(void 0, ["/"].concat(operands)) + ")";
};

var _negate = function _negate(x) {
  var value = resolveReference(x);

  if (value != null && !Number.isNaN(parseFloat(value))) {
    return String(value).startsWith("-") ? String(value).slice(1) : "-" + value;
  }

  return _multiply(value, -1);
};

var calc = Object.assign(function (x) {
  return {
    add: function add() {
      for (var _len6 = arguments.length, operands = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        operands[_key6] = arguments[_key6];
      }

      return calc(_add.apply(void 0, [x].concat(operands)));
    },
    subtract: function subtract() {
      for (var _len7 = arguments.length, operands = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        operands[_key7] = arguments[_key7];
      }

      return calc(_subtract.apply(void 0, [x].concat(operands)));
    },
    multiply: function multiply() {
      for (var _len8 = arguments.length, operands = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        operands[_key8] = arguments[_key8];
      }

      return calc(_multiply.apply(void 0, [x].concat(operands)));
    },
    divide: function divide() {
      for (var _len9 = arguments.length, operands = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        operands[_key9] = arguments[_key9];
      }

      return calc(_divide.apply(void 0, [x].concat(operands)));
    },
    negate: function negate() {
      return calc(_negate(x));
    },
    toString: function toString() {
      return x.toString();
    }
  };
}, {
  add: _add,
  subtract: _subtract,
  multiply: _multiply,
  divide: _divide,
  negate: _negate
});

function replaceWhiteSpace(value, replaceValue) {
  if (replaceValue === void 0) {
    replaceValue = "-";
  }

  return value.replace(/\s+/g, replaceValue);
}

function escape(value) {
  var valueStr = replaceWhiteSpace(value.toString());
  if (valueStr.includes("\\.")) return value;
  var isDecimal = !Number.isInteger(parseFloat(value.toString()));
  return isDecimal ? valueStr.replace(".", "\\.") : value;
}

function addPrefix(value, prefix) {
  if (prefix === void 0) {
    prefix = "";
  }

  return [prefix, escape(value)].filter(Boolean).join("-");
}
function toVarReference(name, fallback) {
  return "var(" + escape(name) + (fallback ? ", " + fallback : "") + ")";
}
function toVarDefinition(value, prefix) {
  if (prefix === void 0) {
    prefix = "";
  }

  return "--" + addPrefix(value, prefix);
}
function cssVar(name, fallback, cssVarPrefix) {
  var cssVariable = toVarDefinition(name, cssVarPrefix);
  return {
    variable: cssVariable,
    reference: toVarReference(cssVariable, fallback)
  };
}

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray$1(arr) { return _arrayWithHoles$b(arr) || _iterableToArray$4(arr) || _unsupportedIterableToArray$c(arr) || _nonIterableRest$b(); }

function _iterableToArray$4(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _slicedToArray$b(arr, i) { return _arrayWithHoles$b(arr) || _iterableToArrayLimit$b(arr, i) || _unsupportedIterableToArray$c(arr, i) || _nonIterableRest$b(); }

function _nonIterableRest$b() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$c(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$c(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$c(o, minLen); }

function _arrayLikeToArray$c(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$b(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$b(arr) { if (Array.isArray(arr)) return arr; }

function _extends$5() {
  _extends$5 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$5.apply(this, arguments);
}
function createThemeVars(target, options) {
  var context = {
    cssMap: {},
    cssVars: {}
  };
  walkObject(target, function (value, path) {
    var _tokenHandlerMap$firs; // firstKey will be e.g. "space"


    var _path = _slicedToArray$b(path, 1),
        firstKey = _path[0];

    var handler = (_tokenHandlerMap$firs = tokenHandlerMap[firstKey]) != null ? _tokenHandlerMap$firs : tokenHandlerMap.defaultHandler;

    var _handler = handler(path, value, options),
        cssVars = _handler.cssVars,
        cssMap = _handler.cssMap;

    Object.assign(context.cssVars, cssVars);
    Object.assign(context.cssMap, cssMap);
  });
  return context;
}
/**
 * Define transformation handlers for ThemeScale
 */

var tokenHandlerMap = {
  space: function space(keys, value, options) {
    var properties = tokenHandlerMap.defaultHandler(keys, value, options);

    var _keys = _toArray$1(keys),
        firstKey = _keys[0],
        referenceKeys = _keys.slice(1);

    var negativeLookupKey = firstKey + ".-" + referenceKeys.join(".");
    var negativeVarKey = keys.join("-");

    var _cssVar = cssVar(negativeVarKey, undefined, options.cssVarPrefix),
        variable = _cssVar.variable,
        reference = _cssVar.reference;

    var negativeValue = calc.negate(value);
    var varRef = calc.negate(reference);
    return {
      cssVars: properties.cssVars,
      cssMap: _extends$5({}, properties.cssMap, _defineProperty$1({}, negativeLookupKey, {
        value: "" + negativeValue,
        "var": "" + variable,
        varRef: varRef
      }))
    };
  },
  defaultHandler: function defaultHandler(keys, value, options) {
    var lookupKey = keys.join(".");
    var varKey = keys.join("-");

    var _cssVar2 = cssVar(varKey, undefined, options.cssVarPrefix),
        variable = _cssVar2.variable,
        reference = _cssVar2.reference;

    return {
      cssVars: _defineProperty$1({}, variable, value),
      cssMap: _defineProperty$1({}, lookupKey, {
        value: value,
        "var": variable,
        varRef: reference
      })
    };
  }
};

function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
var tokens = ["colors", "borders", "borderWidths", "borderStyles", "fonts", "fontSizes", "fontWeights", "letterSpacings", "lineHeights", "radii", "space", "shadows", "sizes", "zIndices", "transition", "blur"];
function extractTokens(theme) {
  var _tokens = tokens;
  return pick(theme, _tokens);
}
function omitVars(rawTheme) {
  var cleanTheme = _objectWithoutPropertiesLoose$1(rawTheme, ["__cssMap", "__cssVars", "__breakpoints"]);

  return cleanTheme;
}

function _extends$6() {
  _extends$6 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$6.apply(this, arguments);
}
function toCSSVar(rawTheme) {
  var _theme$config;
  /**
   * In the case the theme has already been converted to css-var (e.g extending the theme),
   * we can omit the computed css vars and recompute it for the extended theme.
   */


  var theme = omitVars(rawTheme); // omit components and breakpoints from css variable map

  var tokens = extractTokens(theme);
  var cssVarPrefix = (_theme$config = theme.config) == null ? void 0 : _theme$config.cssVarPrefix;

  var _createThemeVars = createThemeVars(tokens, {
    cssVarPrefix: cssVarPrefix
  }),
      cssMap = _createThemeVars.cssMap,
      cssVars = _createThemeVars.cssVars;

  var defaultCssVars = {
    "--chakra-ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-ring-offset-width": "0px",
    "--chakra-ring-offset-color": "#fff",
    "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
    "--chakra-ring-offset-shadow": "0 0 #0000",
    "--chakra-ring-shadow": "0 0 #0000",
    "--chakra-space-x-reverse": "0",
    "--chakra-space-y-reverse": "0"
  };
  Object.assign(theme, {
    __cssVars: _extends$6({}, defaultCssVars, cssVars),
    __cssMap: cssMap,
    __breakpoints: analyzeBreakpoints(theme.breakpoints)
  });
  return theme;
}

function _typeof$4(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$4 = function _typeof(obj) { return typeof obj; }; } else { _typeof$4 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$4(obj); }

/* global Map:readonly, Set:readonly, ArrayBuffer:readonly */
var hasElementType = typeof Element !== 'undefined';
var hasMap = typeof Map === 'function';
var hasSet = typeof Set === 'function';
var hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView; // Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

function equal(a, b) {
  // START: fast-deep-equal es6/index.js 3.1.1
  if (a === b) return true;

  if (a && b && _typeof$4(a) == 'object' && _typeof$4(b) == 'object') {
    if (a.constructor !== b.constructor) return false;
    var length, i, keys;

    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) return false;
      }

      return true;
    } // START: Modifications:
    // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
    //    to co-exist with es5.
    // 2. Replace `for of` with es5 compliant iteration using `for`.
    //    Basically, take:
    //
    //    ```js
    //    for (i of a.entries())
    //      if (!b.has(i[0])) return false;
    //    ```
    //
    //    ... and convert to:
    //
    //    ```js
    //    it = a.entries();
    //    while (!(i = it.next()).done)
    //      if (!b.has(i.value[0])) return false;
    //    ```
    //
    //    **Note**: `i` access switches to `i.value`.


    var it;

    if (hasMap && a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      it = a.entries();

      while (!(i = it.next()).done) {
        if (!b.has(i.value[0])) return false;
      }

      it = a.entries();

      while (!(i = it.next()).done) {
        if (!equal(i.value[1], b.get(i.value[0]))) return false;
      }

      return true;
    }

    if (hasSet && a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      it = a.entries();

      while (!(i = it.next()).done) {
        if (!b.has(i.value[0])) return false;
      }

      return true;
    } // END: Modifications


    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) {
        if (a[i] !== b[i]) return false;
      }

      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    } // END: fast-deep-equal
    // START: react-fast-compare
    // custom handling for DOM elements


    if (hasElementType && a instanceof Element) return false; // custom handling for React/Preact

    for (i = length; i-- !== 0;) {
      if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner
        // Preact-specific: avoid traversing Preact elements' __v and __o
        //    __v = $_original / $_vnode
        //    __o = $_owner
        // These properties contain circular references and are not needed when
        // comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of elements
        continue;
      } // all other properties should be traversed as usual


      if (!equal(a[keys[i]], b[keys[i]])) return false;
    } // END: react-fast-compare
    // START: fast-deep-equal


    return true;
  }

  return a !== a && b !== b;
} // end fast-deep-equal


var reactFastCompare = function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if ((error.message || '').match(/stack|recursion/i)) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('react-fast-compare cannot handle circular refs');
      return false;
    } // some other error. we should definitely know about these


    throw error;
  }
};

function _slicedToArray$c(arr, i) { return _arrayWithHoles$c(arr) || _iterableToArrayLimit$c(arr, i) || _unsupportedIterableToArray$d(arr, i) || _nonIterableRest$c(); }

function _nonIterableRest$c() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$d(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$d(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$d(o, minLen); }

function _arrayLikeToArray$d(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$c(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$c(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var ThemeProvider$1 = function ThemeProvider$1(props) {
  var _props$cssVarsRoot = props.cssVarsRoot,
      cssVarsRoot = _props$cssVarsRoot === void 0 ? ":host, :root" : _props$cssVarsRoot,
      theme = props.theme,
      children = props.children;
  var computedTheme = react.useMemo(function () {
    return toCSSVar(theme);
  }, [theme]);
  return /*#__PURE__*/react.createElement(ThemeProvider, {
    theme: computedTheme
  }, /*#__PURE__*/react.createElement(Global, {
    styles: function styles(theme) {
      return _defineProperty$2({}, cssVarsRoot, theme.__cssVars);
    }
  }), children);
};
function useTheme() {
  var theme = react.useContext(ThemeContext);

  if (!theme) {
    throw Error("useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />` or `<ThemeProvider />`");
  }

  return theme;
}

var _createContext$2 = createContext({
  name: "StylesContext",
  errorMessage: "useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` "
}),
    _createContext2$2 = _slicedToArray$c(_createContext$2, 2),
    StylesProvider = _createContext2$2[0],
    useStyles = _createContext2$2[1];
/**
 * Applies styles defined in `theme.styles.global` globally
 * using emotion's `Global` component
 */

var GlobalStyle = function GlobalStyle() {
  var _useColorMode = useColorMode(),
      colorMode = _useColorMode.colorMode;

  return /*#__PURE__*/react.createElement(Global, {
    styles: function styles(theme) {
      var styleObjectOrFn = memoizedGet(theme, "styles.global");
      var globalStyles = runIfFn(styleObjectOrFn, {
        theme: theme,
        colorMode: colorMode
      });
      if (!globalStyles) return undefined;
      var styles = css$1(globalStyles)(theme);
      return styles;
    }
  });
};

/**
 * Carefully selected html elements for chakra components.
 * This is mostly for `chakra.<element>` syntax.
 */

var domElements = ["a", "b", "article", "aside", "blockquote", "button", "caption", "cite", "circle", "code", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "img", "input", "kbd", "label", "li", "main", "mark", "nav", "ol", "p", "path", "pre", "q", "rect", "s", "svg", "section", "select", "strong", "small", "span", "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "tr", "ul"];
function omitThemingProps(props) {
  return omit(props, ["styleConfig", "size", "variant", "colorScheme"]);
}

function _extends$7() {
  _extends$7 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$7.apply(this, arguments);
}
function useChakra() {
  var colorModeResult = useColorMode();
  var theme = useTheme();
  return _extends$7({}, colorModeResult, {
    theme: theme
  });
}

var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid = /* #__PURE__ */memoize(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

var testOmitPropsOnStringTag = isPropValid;

var testOmitPropsOnComponent = function testOmitPropsOnComponent(key) {
  return key !== 'theme';
};

var getDefaultShouldForwardProp = function getDefaultShouldForwardProp(tag) {
  return typeof tag === 'string' && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};

var composeShouldForwardProps = function composeShouldForwardProps(tag, options, isReal) {
  var shouldForwardProp;

  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function (propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }

  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }

  return shouldForwardProp;
};

var createStyled = function createStyled(tag, options) {

  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;

  if (options !== undefined) {
    identifierName = options.label;
    targetClassName = options.target;
  }

  var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp('as');
  return function () {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== undefined ? tag.__emotion_styles.slice(0) : [];

    if (identifierName !== undefined) {
      styles.push("label:" + identifierName + ";");
    }

    if (args[0] == null || args[0].raw === undefined) {
      styles.push.apply(styles, args);
    } else {

      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;

      for (; i < len; i++) {

        styles.push(args[i], args[0][i]);
      }
    } // $FlowFixMe: we need to cast StatelessFunctionalComponent to our PrivateStyledComponent class


    var Styled = withEmotionCache(function (props, cache, ref) {
      var finalTag = shouldUseAs && props.as || baseTag;
      var className = '';
      var classInterpolations = [];
      var mergedProps = props;

      if (props.theme == null) {
        mergedProps = {};

        for (var key in props) {
          mergedProps[key] = props[key];
        }

        mergedProps.theme = react.useContext(ThemeContext);
      }

      if (typeof props.className === 'string') {
        className = getRegisteredStyles(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }

      var serialized = serializeStyles(styles.concat(classInterpolations), cache.registered, mergedProps);
      var rules = insertStyles(cache, serialized, typeof finalTag === 'string');
      className += cache.key + "-" + serialized.name;

      if (targetClassName !== undefined) {
        className += " " + targetClassName;
      }

      var finalShouldForwardProp = shouldUseAs && shouldForwardProp === undefined ? getDefaultShouldForwardProp(finalTag) : defaultShouldForwardProp;
      var newProps = {};

      for (var _key in props) {
        if (shouldUseAs && _key === 'as') continue;

        if ( // $FlowFixMe
        finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }

      newProps.className = className;
      newProps.ref = ref;
      var ele = /*#__PURE__*/react.createElement(finalTag, newProps);
      return ele;
    });
    Styled.displayName = identifierName !== undefined ? identifierName : "Styled(" + (typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component') + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, 'toString', {
      value: function value() {
        if (targetClassName === undefined && "production" !== 'production') {
          return 'NO_COMPONENT_SELECTOR';
        } // $FlowFixMe: coerce undefined to string


        return "." + targetClassName;
      }
    });

    Styled.withComponent = function (nextTag, nextOptions) {
      return createStyled(nextTag, _extends({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles);
    };

    return Styled;
  };
};

var tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];
var newStyled = createStyled.bind();
tags.forEach(function (tagName) {
  // $FlowFixMe: we can ignore this because its exposed type is defined by the CreateStyled type
  newStyled[tagName] = newStyled(tagName);
});

function _toConsumableArray$3(arr) { return _arrayWithoutHoles$3(arr) || _iterableToArray$5(arr) || _unsupportedIterableToArray$e(arr) || _nonIterableSpread$3(); }

function _nonIterableSpread$3() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$e(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$e(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$e(o, minLen); }

function _iterableToArray$5(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles$3(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$e(arr); }

function _arrayLikeToArray$e(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * List of props for emotion to omit from DOM.
 * It mostly consists of Chakra props
 */

var allPropNames = new Set([].concat(_toConsumableArray$3(propNames), ["textStyle", "layerStyle", "apply", "isTruncated", "noOfLines", "focusBorderColor", "errorBorderColor", "as", "__css", "css", "sx"]));
/**
 * htmlWidth and htmlHeight is used in the <Image />
 * component to support the native `width` and `height` attributes
 *
 * https://github.com/chakra-ui/chakra-ui/issues/149
 */

var validHTMLProps = new Set(["htmlWidth", "htmlHeight", "htmlSize"]);
var shouldForwardProp = function shouldForwardProp(prop) {
  return validHTMLProps.has(prop) || !allPropNames.has(prop);
};

function _objectWithoutPropertiesLoose$2(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
/**
 * Style resolver function that manages how style props are merged
 * in combination with other possible ways of defining styles.
 *
 * For example, take a component defined this way:
 * ```jsx
 * <Box fontSize="24px" sx={{ fontSize: "40px" }}></Box>
 * ```
 *
 * We want to manage the priority of the styles properly to prevent unwanted
 * behaviors. Right now, the `sx` prop has the highest priority so the resolved
 * fontSize will be `40px`
 */

var toCSSObject = function toCSSObject(_ref) {
  var baseStyle = _ref.baseStyle;
  return function (props) {
    var cssProp = props.css,
        __css = props.__css,
        sx = props.sx,
        rest = _objectWithoutPropertiesLoose$2(props, ["theme", "css", "__css", "sx"]);

    var styleProps = objectFilter(rest, function (_, prop) {
      return isStyleProp(prop);
    });
    var finalBaseStyle = runIfFn(baseStyle, props);
    var finalStyles = Object.assign({}, __css, finalBaseStyle, filterUndefined(styleProps), sx);
    var computedCSS = css$1(finalStyles)(props.theme);
    return cssProp ? [computedCSS, cssProp] : computedCSS;
  };
};
function styled(component, options) {
  var _ref2 = options != null ? options : {},
      baseStyle = _ref2.baseStyle,
      styledOptions = _objectWithoutPropertiesLoose$2(_ref2, ["baseStyle"]);

  if (!styledOptions.shouldForwardProp) {
    styledOptions.shouldForwardProp = shouldForwardProp;
  }

  var styleObject = toCSSObject({
    baseStyle: baseStyle
  });
  return newStyled(component, styledOptions)(styleObject);
}
var chakra = styled;
domElements.forEach(function (tag) {
  chakra[tag] = chakra(tag);
});

/**
 * All credit goes to Chance (Reach UI), Haz (Reakit) and (fluentui)
 * for creating the base type definitions upon which we improved on
 */
function forwardRef(component) {
  return /*#__PURE__*/react.forwardRef(component);
}

function _objectWithoutPropertiesLoose$3(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
function useStyleConfig(themeKey, props, opts) {
  var _styleConfig$defaultP, _opts2;

  if (props === void 0) {
    props = {};
  }

  if (opts === void 0) {
    opts = {};
  }

  var _props = props,
      styleConfigProp = _props.styleConfig,
      rest = _objectWithoutPropertiesLoose$3(props, ["styleConfig"]);

  var _useChakra = useChakra(),
      theme = _useChakra.theme,
      colorMode = _useChakra.colorMode;

  var themeStyleConfig = memoizedGet(theme, "components." + themeKey);
  var styleConfig = styleConfigProp || themeStyleConfig;
  var mergedProps = lodash_mergewith({
    theme: theme,
    colorMode: colorMode
  }, (_styleConfig$defaultP = styleConfig == null ? void 0 : styleConfig.defaultProps) != null ? _styleConfig$defaultP : {}, filterUndefined(omit(rest, ["children"])));
  /**
   * Store the computed styles in a `ref` to avoid unneeded re-computation
   */

  var stylesRef = react.useRef({});
  return react.useMemo(function () {
    if (styleConfig) {
      var _styleConfig$baseStyl, _styleConfig$variants, _styleConfig$variants2, _styleConfig$sizes$me, _styleConfig$sizes, _opts;

      var baseStyles = runIfFn((_styleConfig$baseStyl = styleConfig.baseStyle) != null ? _styleConfig$baseStyl : {}, mergedProps);
      var variants = runIfFn((_styleConfig$variants = (_styleConfig$variants2 = styleConfig.variants) == null ? void 0 : _styleConfig$variants2[mergedProps.variant]) != null ? _styleConfig$variants : {}, mergedProps);
      var sizes = runIfFn((_styleConfig$sizes$me = (_styleConfig$sizes = styleConfig.sizes) == null ? void 0 : _styleConfig$sizes[mergedProps.size]) != null ? _styleConfig$sizes$me : {}, mergedProps);
      var styles = lodash_mergewith({}, baseStyles, sizes, variants);

      if ((_opts = opts) != null && _opts.isMultiPart && styleConfig.parts) {
        styleConfig.parts.forEach(function (part) {
          var _styles$part;

          styles[part] = (_styles$part = styles[part]) != null ? _styles$part : {};
        });
      }

      var isStyleEqual = reactFastCompare(stylesRef.current, styles);

      if (!isStyleEqual) {
        stylesRef.current = styles;
      }
    }

    return stylesRef.current;
  }, [styleConfig, mergedProps, (_opts2 = opts) == null ? void 0 : _opts2.isMultiPart]);
}
function useMultiStyleConfig(themeKey, props) {
  return useStyleConfig(themeKey, props, {
    isMultiPart: true
  });
}

var parts = ["container", "button", "panel", "icon"];
var baseStyleContainer = {
  borderTopWidth: "1px",
  borderColor: "inherit",
  _last: {
    borderBottomWidth: "1px"
  }
};
var baseStyleButton = {
  transitionProperty: "common",
  transitionDuration: "normal",
  fontSize: "1rem",
  _focus: {
    boxShadow: "outline"
  },
  _hover: {
    bg: "blackAlpha.50"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  },
  px: 4,
  py: 2
};
var baseStylePanel = {
  pt: 2,
  px: 4,
  pb: 5
};
var baseStyleIcon = {
  fontSize: "1.25em"
};
var baseStyle = {
  container: baseStyleContainer,
  button: baseStyleButton,
  panel: baseStylePanel,
  icon: baseStyleIcon
};
var Accordion = {
  parts: parts,
  baseStyle: baseStyle
};

var tinycolor = createCommonjsModule(function (module) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// TinyColor v1.4.2
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License
(function (Math) {
  var trimLeft = /^\s+/,
      trimRight = /\s+$/,
      tinyCounter = 0,
      mathRound = Math.round,
      mathMin = Math.min,
      mathMax = Math.max,
      mathRandom = Math.random;

  function tinycolor(color, opts) {
    color = color ? color : '';
    opts = opts || {}; // If input is already a tinycolor, return itself

    if (color instanceof tinycolor) {
      return color;
    } // If we are called as a function, call using new instead


    if (!(this instanceof tinycolor)) {
      return new tinycolor(color, opts);
    }

    var rgb = inputToRGB(color);
    this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType; // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`

    if (this._r < 1) {
      this._r = mathRound(this._r);
    }

    if (this._g < 1) {
      this._g = mathRound(this._g);
    }

    if (this._b < 1) {
      this._b = mathRound(this._b);
    }

    this._ok = rgb.ok;
    this._tc_id = tinyCounter++;
  }

  tinycolor.prototype = {
    isDark: function isDark() {
      return this.getBrightness() < 128;
    },
    isLight: function isLight() {
      return !this.isDark();
    },
    isValid: function isValid() {
      return this._ok;
    },
    getOriginalInput: function getOriginalInput() {
      return this._originalInput;
    },
    getFormat: function getFormat() {
      return this._format;
    },
    getAlpha: function getAlpha() {
      return this._a;
    },
    getBrightness: function getBrightness() {
      //http://www.w3.org/TR/AERT#color-contrast
      var rgb = this.toRgb();
      return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },
    getLuminance: function getLuminance() {
      //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
      var rgb = this.toRgb();
      var RsRGB, GsRGB, BsRGB, R, G, B;
      RsRGB = rgb.r / 255;
      GsRGB = rgb.g / 255;
      BsRGB = rgb.b / 255;

      if (RsRGB <= 0.03928) {
        R = RsRGB / 12.92;
      } else {
        R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
      }

      if (GsRGB <= 0.03928) {
        G = GsRGB / 12.92;
      } else {
        G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
      }

      if (BsRGB <= 0.03928) {
        B = BsRGB / 12.92;
      } else {
        B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
      }

      return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    },
    setAlpha: function setAlpha(value) {
      this._a = boundAlpha(value);
      this._roundA = mathRound(100 * this._a) / 100;
      return this;
    },
    toHsv: function toHsv() {
      var hsv = rgbToHsv(this._r, this._g, this._b);
      return {
        h: hsv.h * 360,
        s: hsv.s,
        v: hsv.v,
        a: this._a
      };
    },
    toHsvString: function toHsvString() {
      var hsv = rgbToHsv(this._r, this._g, this._b);
      var h = mathRound(hsv.h * 360),
          s = mathRound(hsv.s * 100),
          v = mathRound(hsv.v * 100);
      return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
    },
    toHsl: function toHsl() {
      var hsl = rgbToHsl(this._r, this._g, this._b);
      return {
        h: hsl.h * 360,
        s: hsl.s,
        l: hsl.l,
        a: this._a
      };
    },
    toHslString: function toHslString() {
      var hsl = rgbToHsl(this._r, this._g, this._b);
      var h = mathRound(hsl.h * 360),
          s = mathRound(hsl.s * 100),
          l = mathRound(hsl.l * 100);
      return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
    },
    toHex: function toHex(allow3Char) {
      return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function toHexString(allow3Char) {
      return '#' + this.toHex(allow3Char);
    },
    toHex8: function toHex8(allow4Char) {
      return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
    },
    toHex8String: function toHex8String(allow4Char) {
      return '#' + this.toHex8(allow4Char);
    },
    toRgb: function toRgb() {
      return {
        r: mathRound(this._r),
        g: mathRound(this._g),
        b: mathRound(this._b),
        a: this._a
      };
    },
    toRgbString: function toRgbString() {
      return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function toPercentageRgb() {
      return {
        r: mathRound(bound01(this._r, 255) * 100) + "%",
        g: mathRound(bound01(this._g, 255) * 100) + "%",
        b: mathRound(bound01(this._b, 255) * 100) + "%",
        a: this._a
      };
    },
    toPercentageRgbString: function toPercentageRgbString() {
      return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
    },
    toName: function toName() {
      if (this._a === 0) {
        return "transparent";
      }

      if (this._a < 1) {
        return false;
      }

      return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
    },
    toFilter: function toFilter(secondColor) {
      var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
      var secondHex8String = hex8String;
      var gradientType = this._gradientType ? "GradientType = 1, " : "";

      if (secondColor) {
        var s = tinycolor(secondColor);
        secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
      }

      return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
    },
    toString: function toString(format) {
      var formatSet = !!format;
      format = format || this._format;
      var formattedString = false;
      var hasAlpha = this._a < 1 && this._a >= 0;
      var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

      if (needsAlphaFormat) {
        // Special case for "transparent", all other non-alpha formats
        // will return rgba when there is transparency.
        if (format === "name" && this._a === 0) {
          return this.toName();
        }

        return this.toRgbString();
      }

      if (format === "rgb") {
        formattedString = this.toRgbString();
      }

      if (format === "prgb") {
        formattedString = this.toPercentageRgbString();
      }

      if (format === "hex" || format === "hex6") {
        formattedString = this.toHexString();
      }

      if (format === "hex3") {
        formattedString = this.toHexString(true);
      }

      if (format === "hex4") {
        formattedString = this.toHex8String(true);
      }

      if (format === "hex8") {
        formattedString = this.toHex8String();
      }

      if (format === "name") {
        formattedString = this.toName();
      }

      if (format === "hsl") {
        formattedString = this.toHslString();
      }

      if (format === "hsv") {
        formattedString = this.toHsvString();
      }

      return formattedString || this.toHexString();
    },
    clone: function clone() {
      return tinycolor(this.toString());
    },
    _applyModification: function _applyModification(fn, args) {
      var color = fn.apply(null, [this].concat([].slice.call(args)));
      this._r = color._r;
      this._g = color._g;
      this._b = color._b;
      this.setAlpha(color._a);
      return this;
    },
    lighten: function lighten() {
      return this._applyModification(_lighten, arguments);
    },
    brighten: function brighten() {
      return this._applyModification(_brighten, arguments);
    },
    darken: function darken() {
      return this._applyModification(_darken, arguments);
    },
    desaturate: function desaturate() {
      return this._applyModification(_desaturate, arguments);
    },
    saturate: function saturate() {
      return this._applyModification(_saturate, arguments);
    },
    greyscale: function greyscale() {
      return this._applyModification(_greyscale, arguments);
    },
    spin: function spin() {
      return this._applyModification(_spin, arguments);
    },
    _applyCombination: function _applyCombination(fn, args) {
      return fn.apply(null, [this].concat([].slice.call(args)));
    },
    analogous: function analogous() {
      return this._applyCombination(_analogous, arguments);
    },
    complement: function complement() {
      return this._applyCombination(_complement, arguments);
    },
    monochromatic: function monochromatic() {
      return this._applyCombination(_monochromatic, arguments);
    },
    splitcomplement: function splitcomplement() {
      return this._applyCombination(_splitcomplement, arguments);
    },
    triad: function triad() {
      return this._applyCombination(_triad, arguments);
    },
    tetrad: function tetrad() {
      return this._applyCombination(_tetrad, arguments);
    }
  }; // If input is an object, force 1 into "1.0" to handle ratios properly
  // String input requires "1.0" as input, so 1 will be treated as 1

  tinycolor.fromRatio = function (color, opts) {
    if (_typeof(color) == "object") {
      var newColor = {};

      for (var i in color) {
        if (color.hasOwnProperty(i)) {
          if (i === "a") {
            newColor[i] = color[i];
          } else {
            newColor[i] = convertToPercentage(color[i]);
          }
        }
      }

      color = newColor;
    }

    return tinycolor(color, opts);
  }; // Given a string or object, convert that input to RGB
  // Possible string inputs:
  //
  //     "red"
  //     "#f00" or "f00"
  //     "#ff0000" or "ff0000"
  //     "#ff000000" or "ff000000"
  //     "rgb 255 0 0" or "rgb (255, 0, 0)"
  //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
  //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
  //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
  //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
  //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
  //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
  //


  function inputToRGB(color) {
    var rgb = {
      r: 0,
      g: 0,
      b: 0
    };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;

    if (typeof color == "string") {
      color = stringInputToObject(color);
    }

    if (_typeof(color) == "object") {
      if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
        rgb = rgbToRgb(color.r, color.g, color.b);
        ok = true;
        format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
        s = convertToPercentage(color.s);
        v = convertToPercentage(color.v);
        rgb = hsvToRgb(color.h, s, v);
        ok = true;
        format = "hsv";
      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
        s = convertToPercentage(color.s);
        l = convertToPercentage(color.l);
        rgb = hslToRgb(color.h, s, l);
        ok = true;
        format = "hsl";
      }

      if (color.hasOwnProperty("a")) {
        a = color.a;
      }
    }

    a = boundAlpha(a);
    return {
      ok: ok,
      format: color.format || format,
      r: mathMin(255, mathMax(rgb.r, 0)),
      g: mathMin(255, mathMax(rgb.g, 0)),
      b: mathMin(255, mathMax(rgb.b, 0)),
      a: a
    };
  } // Conversion Functions
  // --------------------
  // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
  // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
  // `rgbToRgb`
  // Handle bounds / percentage checking to conform to CSS color spec
  // <http://www.w3.org/TR/css3-color/>
  // *Assumes:* r, g, b in [0, 255] or [0, 1]
  // *Returns:* { r, g, b } in [0, 255]


  function rgbToRgb(r, g, b) {
    return {
      r: bound01(r, 255) * 255,
      g: bound01(g, 255) * 255,
      b: bound01(b, 255) * 255
    };
  } // `rgbToHsl`
  // Converts an RGB color value to HSL.
  // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
  // *Returns:* { h, s, l } in [0,1]


  function rgbToHsl(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = mathMax(r, g, b),
        min = mathMin(r, g, b);
    var h,
        s,
        l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return {
      h: h,
      s: s,
      l: l
    };
  } // `hslToRgb`
  // Converts an HSL color value to RGB.
  // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
  // *Returns:* { r, g, b } in the set [0, 255]


  function hslToRgb(h, s, l) {
    var r, g, b;
    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: r * 255,
      g: g * 255,
      b: b * 255
    };
  } // `rgbToHsv`
  // Converts an RGB color value to HSV
  // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
  // *Returns:* { h, s, v } in [0,1]


  function rgbToHsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = mathMax(r, g, b),
        min = mathMin(r, g, b);
    var h,
        s,
        v = max;
    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max == min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return {
      h: h,
      s: s,
      v: v
    };
  } // `hsvToRgb`
  // Converts an HSV color value to RGB.
  // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
  // *Returns:* { r, g, b } in the set [0, 255]


  function hsvToRgb(h, s, v) {
    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];
    return {
      r: r * 255,
      g: g * 255,
      b: b * 255
    };
  } // `rgbToHex`
  // Converts an RGB color to hex
  // Assumes r, g, and b are contained in the set [0, 255]
  // Returns a 3 or 6 character hex


  function rgbToHex(r, g, b, allow3Char) {
    var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))]; // Return a 3 character hex if possible

    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
  } // `rgbaToHex`
  // Converts an RGBA color plus alpha transparency to hex
  // Assumes r, g, b are contained in the set [0, 255] and
  // a in [0, 1]. Returns a 4 or 8 character rgba hex


  function rgbaToHex(r, g, b, a, allow4Char) {
    var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16)), pad2(convertDecimalToHex(a))]; // Return a 4 character hex if possible

    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }

    return hex.join("");
  } // `rgbaToArgbHex`
  // Converts an RGBA color to an ARGB Hex8 string
  // Rarely used, but required for "toFilter()"


  function rgbaToArgbHex(r, g, b, a) {
    var hex = [pad2(convertDecimalToHex(a)), pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];
    return hex.join("");
  } // `equals`
  // Can be called with any tinycolor input


  tinycolor.equals = function (color1, color2) {
    if (!color1 || !color2) {
      return false;
    }

    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
  };

  tinycolor.random = function () {
    return tinycolor.fromRatio({
      r: mathRandom(),
      g: mathRandom(),
      b: mathRandom()
    });
  }; // Modification Functions
  // ----------------------
  // Thanks to less.js for some of the basics here
  // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>


  function _desaturate(color, amount) {
    amount = amount === 0 ? 0 : amount || 10;
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
  }

  function _saturate(color, amount) {
    amount = amount === 0 ? 0 : amount || 10;
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
  }

  function _greyscale(color) {
    return tinycolor(color).desaturate(100);
  }

  function _lighten(color, amount) {
    amount = amount === 0 ? 0 : amount || 10;
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
  }

  function _brighten(color, amount) {
    amount = amount === 0 ? 0 : amount || 10;
    var rgb = tinycolor(color).toRgb();
    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
    return tinycolor(rgb);
  }

  function _darken(color, amount) {
    amount = amount === 0 ? 0 : amount || 10;
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
  } // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
  // Values outside of this range will be wrapped into this range.


  function _spin(color, amount) {
    var hsl = tinycolor(color).toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return tinycolor(hsl);
  } // Combination Functions
  // ---------------------
  // Thanks to jQuery xColor for some of the ideas behind these
  // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>


  function _complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
  }

  function _triad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [tinycolor(color), tinycolor({
      h: (h + 120) % 360,
      s: hsl.s,
      l: hsl.l
    }), tinycolor({
      h: (h + 240) % 360,
      s: hsl.s,
      l: hsl.l
    })];
  }

  function _tetrad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [tinycolor(color), tinycolor({
      h: (h + 90) % 360,
      s: hsl.s,
      l: hsl.l
    }), tinycolor({
      h: (h + 180) % 360,
      s: hsl.s,
      l: hsl.l
    }), tinycolor({
      h: (h + 270) % 360,
      s: hsl.s,
      l: hsl.l
    })];
  }

  function _splitcomplement(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [tinycolor(color), tinycolor({
      h: (h + 72) % 360,
      s: hsl.s,
      l: hsl.l
    }), tinycolor({
      h: (h + 216) % 360,
      s: hsl.s,
      l: hsl.l
    })];
  }

  function _analogous(color, results, slices) {
    results = results || 6;
    slices = slices || 30;
    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];

    for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
      hsl.h = (hsl.h + part) % 360;
      ret.push(tinycolor(hsl));
    }

    return ret;
  }

  function _monochromatic(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h = hsv.h,
        s = hsv.s,
        v = hsv.v;
    var ret = [];
    var modification = 1 / results;

    while (results--) {
      ret.push(tinycolor({
        h: h,
        s: s,
        v: v
      }));
      v = (v + modification) % 1;
    }

    return ret;
  } // Utility Functions
  // ---------------------


  tinycolor.mix = function (color1, color2, amount) {
    amount = amount === 0 ? 0 : amount || 50;
    var rgb1 = tinycolor(color1).toRgb();
    var rgb2 = tinycolor(color2).toRgb();
    var p = amount / 100;
    var rgba = {
      r: (rgb2.r - rgb1.r) * p + rgb1.r,
      g: (rgb2.g - rgb1.g) * p + rgb1.g,
      b: (rgb2.b - rgb1.b) * p + rgb1.b,
      a: (rgb2.a - rgb1.a) * p + rgb1.a
    };
    return tinycolor(rgba);
  }; // Readability Functions
  // ---------------------
  // <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)
  // `contrast`
  // Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)


  tinycolor.readability = function (color1, color2) {
    var c1 = tinycolor(color1);
    var c2 = tinycolor(color2);
    return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
  }; // `isReadable`
  // Ensure that foreground and background color combinations meet WCAG2 guidelines.
  // The third argument is an optional Object.
  //      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
  //      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
  // If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.
  // *Example*
  //    tinycolor.isReadable("#000", "#111") => false
  //    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false


  tinycolor.isReadable = function (color1, color2, wcag2) {
    var readability = tinycolor.readability(color1, color2);
    var wcag2Parms, out;
    out = false;
    wcag2Parms = validateWCAG2Parms(wcag2);

    switch (wcag2Parms.level + wcag2Parms.size) {
      case "AAsmall":
      case "AAAlarge":
        out = readability >= 4.5;
        break;

      case "AAlarge":
        out = readability >= 3;
        break;

      case "AAAsmall":
        out = readability >= 7;
        break;
    }

    return out;
  }; // `mostReadable`
  // Given a base color and a list of possible foreground or background
  // colors for that base, returns the most readable color.
  // Optionally returns Black or White if the most readable color is unreadable.
  // *Example*
  //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
  //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
  //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
  //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"


  tinycolor.mostReadable = function (baseColor, colorList, args) {
    var bestColor = null;
    var bestScore = 0;
    var readability;
    var includeFallbackColors, level, size;
    args = args || {};
    includeFallbackColors = args.includeFallbackColors;
    level = args.level;
    size = args.size;

    for (var i = 0; i < colorList.length; i++) {
      readability = tinycolor.readability(baseColor, colorList[i]);

      if (readability > bestScore) {
        bestScore = readability;
        bestColor = tinycolor(colorList[i]);
      }
    }

    if (tinycolor.isReadable(baseColor, bestColor, {
      "level": level,
      "size": size
    }) || !includeFallbackColors) {
      return bestColor;
    } else {
      args.includeFallbackColors = false;
      return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
    }
  }; // Big List of Colors
  // ------------------
  // <http://www.w3.org/TR/css3-color/#svg-color>


  var names = tinycolor.names = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
  }; // Make it easy to access colors via `hexNames[hex]`

  var hexNames = tinycolor.hexNames = flip(names); // Utilities
  // ---------
  // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`

  function flip(o) {
    var flipped = {};

    for (var i in o) {
      if (o.hasOwnProperty(i)) {
        flipped[o[i]] = i;
      }
    }

    return flipped;
  } // Return a valid alpha value [0,1] with all invalid values being set to 1


  function boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
      a = 1;
    }

    return a;
  } // Take input from [0, n] and return it as [0, 1]


  function bound01(n, max) {
    if (isOnePointZero(n)) {
      n = "100%";
    }

    var processPercent = isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n))); // Automatically convert percentage into number

    if (processPercent) {
      n = parseInt(n * max, 10) / 100;
    } // Handle floating point rounding errors


    if (Math.abs(n - max) < 0.000001) {
      return 1;
    } // Convert into [0, 1] range if it isn't already


    return n % max / parseFloat(max);
  } // Force a number between 0 and 1


  function clamp01(val) {
    return mathMin(1, mathMax(0, val));
  } // Parse a base-16 hex value into a base-10 integer


  function parseIntFromHex(val) {
    return parseInt(val, 16);
  } // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
  // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>


  function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
  } // Check to see if string passed in is a percentage


  function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
  } // Force a hex value to have 2 characters


  function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
  } // Replace a decimal with it's percentage value


  function convertToPercentage(n) {
    if (n <= 1) {
      n = n * 100 + "%";
    }

    return n;
  } // Converts a decimal to a hex value


  function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
  } // Converts a hex value to a decimal


  function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
  }

  var matchers = function () {
    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?"; // <http://www.w3.org/TR/css3-values/#number-value>

    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?"; // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.

    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")"; // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren

    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    return {
      CSS_UNIT: new RegExp(CSS_UNIT),
      rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
      rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
      hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
      hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
      hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
      hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
  }(); // `isValidCSSUnit`
  // Take in a single string / number and check to see if it looks like a CSS unit
  // (see `matchers` above for definition).


  function isValidCSSUnit(color) {
    return !!matchers.CSS_UNIT.exec(color);
  } // `stringInputToObject`
  // Permissive string parsing.  Take in a number of formats, and output an object
  // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`


  function stringInputToObject(color) {
    color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
    var named = false;

    if (names[color]) {
      color = names[color];
      named = true;
    } else if (color == 'transparent') {
      return {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
        format: "name"
      };
    } // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.


    var match;

    if (match = matchers.rgb.exec(color)) {
      return {
        r: match[1],
        g: match[2],
        b: match[3]
      };
    }

    if (match = matchers.rgba.exec(color)) {
      return {
        r: match[1],
        g: match[2],
        b: match[3],
        a: match[4]
      };
    }

    if (match = matchers.hsl.exec(color)) {
      return {
        h: match[1],
        s: match[2],
        l: match[3]
      };
    }

    if (match = matchers.hsla.exec(color)) {
      return {
        h: match[1],
        s: match[2],
        l: match[3],
        a: match[4]
      };
    }

    if (match = matchers.hsv.exec(color)) {
      return {
        h: match[1],
        s: match[2],
        v: match[3]
      };
    }

    if (match = matchers.hsva.exec(color)) {
      return {
        h: match[1],
        s: match[2],
        v: match[3],
        a: match[4]
      };
    }

    if (match = matchers.hex8.exec(color)) {
      return {
        r: parseIntFromHex(match[1]),
        g: parseIntFromHex(match[2]),
        b: parseIntFromHex(match[3]),
        a: convertHexToDecimal(match[4]),
        format: named ? "name" : "hex8"
      };
    }

    if (match = matchers.hex6.exec(color)) {
      return {
        r: parseIntFromHex(match[1]),
        g: parseIntFromHex(match[2]),
        b: parseIntFromHex(match[3]),
        format: named ? "name" : "hex"
      };
    }

    if (match = matchers.hex4.exec(color)) {
      return {
        r: parseIntFromHex(match[1] + '' + match[1]),
        g: parseIntFromHex(match[2] + '' + match[2]),
        b: parseIntFromHex(match[3] + '' + match[3]),
        a: convertHexToDecimal(match[4] + '' + match[4]),
        format: named ? "name" : "hex8"
      };
    }

    if (match = matchers.hex3.exec(color)) {
      return {
        r: parseIntFromHex(match[1] + '' + match[1]),
        g: parseIntFromHex(match[2] + '' + match[2]),
        b: parseIntFromHex(match[3] + '' + match[3]),
        format: named ? "name" : "hex"
      };
    }

    return false;
  }

  function validateWCAG2Parms(parms) {
    // return valid WCAG2 parms for isReadable.
    // If input parms are invalid, return {"level":"AA", "size":"small"}
    var level, size;
    parms = parms || {
      "level": "AA",
      "size": "small"
    };
    level = (parms.level || "AA").toUpperCase();
    size = (parms.size || "small").toLowerCase();

    if (level !== "AA" && level !== "AAA") {
      level = "AA";
    }

    if (size !== "small" && size !== "large") {
      size = "small";
    }

    return {
      "level": level,
      "size": size
    };
  } // Node: Export function


  if ( module.exports) {
    module.exports = tinycolor;
  } // AMD/requirejs: Define the module
  else {
        window.tinycolor = tinycolor;
      }
})(Math);
});

/**
 * Get the color raw value from theme
 * @param theme - the theme object
 * @param color - the color path ("green.200")
 * @param fallback - the fallback color
 */

var getColor = function getColor(theme, color, fallback) {
  var hex = memoizedGet(theme, "colors." + color, color);
  var isValid = tinycolor(hex).isValid();
  return isValid ? hex : fallback;
};
/**
 * Determines if the tone of given color is "light" or "dark"
 * @param color - the color in hex, rgb, or hsl
 */

var tone = function tone(color) {
  return function (theme) {
    var hex = getColor(theme, color);
    var isDark = tinycolor(hex).isDark();
    return isDark ? "dark" : "light";
  };
};
/**
 * Determines if a color tone is "dark"
 * @param color - the color in hex, rgb, or hsl
 */

var isDark = function isDark(color) {
  return function (theme) {
    return tone(color)(theme) === "dark";
  };
};
/**
 * Make a color transparent
 * @param color - the color in hex, rgb, or hsl
 * @param opacity - the amount of opacity the color should have (0-1)
 */

var transparentize = function transparentize(color, opacity) {
  return function (theme) {
    var raw = getColor(theme, color);
    return tinycolor(raw).setAlpha(opacity).toRgbString();
  };
};
function generateStripe(size, color) {
  if (size === void 0) {
    size = "1rem";
  }

  if (color === void 0) {
    color = "rgba(255, 255, 255, 0.15)";
  }

  return {
    backgroundImage: "linear-gradient(\n    45deg,\n    " + color + " 25%,\n    transparent 25%,\n    transparent 50%,\n    " + color + " 50%,\n    " + color + " 75%,\n    transparent 75%,\n    transparent\n  )",
    backgroundSize: size + " " + size
  };
}
function randomColor(opts) {
  var fallback = tinycolor.random().toHexString();

  if (!opts || isEmptyObject(opts)) {
    return fallback;
  }

  if (opts.string && opts.colors) {
    return randomColorFromList(opts.string, opts.colors);
  }

  if (opts.string && !opts.colors) {
    return randomColorFromString(opts.string);
  }

  if (opts.colors && !opts.string) {
    return randomFromList(opts.colors);
  }

  return fallback;
}

function randomColorFromString(str) {
  var hash = 0;
  if (str.length === 0) return hash.toString();

  for (var i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  var color = "#";

  for (var j = 0; j < 3; j += 1) {
    var value = hash >> j * 8 & 255;
    color += ("00" + value.toString(16)).substr(-2);
  }

  return color;
}

function randomColorFromList(str, list) {
  var index = 0;
  if (str.length === 0) return list[0];

  for (var i = 0; i < str.length; i += 1) {
    index = str.charCodeAt(i) + ((index << 5) - index);
    index = index & index;
  }

  index = (index % list.length + list.length) % list.length;
  return list[index];
}

function randomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function mode(light, dark) {
  return function (props) {
    return props.colorMode === "dark" ? dark : light;
  };
}
function orient(options) {
  var orientation = options.orientation,
      vertical = options.vertical,
      horizontal = options.horizontal;
  if (!orientation) return {};
  return orientation === "vertical" ? vertical : horizontal;
}

function _extends$8() {
  _extends$8 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$8.apply(this, arguments);
}
var createBreakpoints = function createBreakpoints(config) {
  warn({
    condition: true,
    message: ["[chakra-ui]: createBreakpoints(...) will be deprecated pretty soon", "simply pass the breakpoints as an object. Remove the createBreakpoint(..) call"].join("")
  });
  return _extends$8({
    base: "0em"
  }, config);
};

var parts$1 = ["container", "title", "description", "icon"];
var baseStyle$1 = {
  container: {
    px: 4,
    py: 3
  },
  title: {
    fontWeight: "bold",
    lineHeight: 6,
    marginEnd: 2
  },
  description: {
    lineHeight: 6
  },
  icon: {
    flexShrink: 0,
    marginEnd: 3,
    w: 5,
    h: 6
  }
};

function getBg(props) {
  var theme = props.theme,
      c = props.colorScheme;
  var lightBg = getColor(theme, c + ".100", c);
  var darkBg = transparentize(c + ".200", 0.16)(theme);
  return mode(lightBg, darkBg)(props);
}

function variantSubtle(props) {
  var c = props.colorScheme;
  return {
    container: {
      bg: getBg(props)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props)
    }
  };
}

function variantLeftAccent(props) {
  var c = props.colorScheme;
  return {
    container: {
      paddingStart: 3,
      borderStartWidth: "4px",
      borderStartColor: mode(c + ".500", c + ".200")(props),
      bg: getBg(props)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props)
    }
  };
}

function variantTopAccent(props) {
  var c = props.colorScheme;
  return {
    container: {
      pt: 2,
      borderTopWidth: "4px",
      borderTopColor: mode(c + ".500", c + ".200")(props),
      bg: getBg(props)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props)
    }
  };
}

function variantSolid(props) {
  var c = props.colorScheme;
  return {
    container: {
      bg: mode(c + ".500", c + ".200")(props),
      color: mode("white", "gray.900")(props)
    }
  };
}

var variants = {
  subtle: variantSubtle,
  "left-accent": variantLeftAccent,
  "top-accent": variantTopAccent,
  solid: variantSolid
};
var defaultProps = {
  variant: "subtle",
  colorScheme: "blue"
};
var Alert = {
  parts: parts$1,
  baseStyle: baseStyle$1,
  variants: variants,
  defaultProps: defaultProps
};

var spacing = {
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem"
};
/**
 * @deprecated
 * Spacing tokens are a part of DefaultChakraTheme['sizes']
 */

function _extends$9() {
  _extends$9 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$9.apply(this, arguments);
}
var largeSizes = {
  max: "max-content",
  min: "min-content",
  full: "100%",
  "3xs": "14rem",
  "2xs": "16rem",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  "8xl": "90rem"
};
var container = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px"
};

var sizes = _extends$9({}, spacing, largeSizes, {
  container: container
});

var parts$2 = ["container", "excessLabel", "badge", "label"];

function baseStyleBadge(props) {
  return {
    transform: "translate(25%, 25%)",
    borderRadius: "full",
    border: "0.2em solid",
    borderColor: mode("white", "gray.800")(props)
  };
}

function baseStyleExcessLabel(props) {
  return {
    bg: mode("gray.200", "whiteAlpha.400")(props)
  };
}

function baseStyleContainer$1(props) {
  var name = props.name,
      theme = props.theme;
  var bg = name ? randomColor({
    string: name
  }) : "gray.400";
  var isBgDark = isDark(bg)(theme);
  var color = "white";
  if (!isBgDark) color = "gray.800";
  var borderColor = mode("white", "gray.800")(props);
  return {
    bg: bg,
    color: color,
    borderColor: borderColor,
    verticalAlign: "top"
  };
}

var baseStyle$2 = function baseStyle(props) {
  return {
    badge: baseStyleBadge(props),
    excessLabel: baseStyleExcessLabel(props),
    container: baseStyleContainer$1(props)
  };
};

function getSize(size) {
  var themeSize = sizes[size];
  return {
    container: {
      width: size,
      height: size,
      fontSize: "calc(" + (themeSize != null ? themeSize : size) + " / 2.5)"
    },
    excessLabel: {
      width: size,
      height: size
    },
    label: {
      fontSize: "calc(" + (themeSize != null ? themeSize : size) + " / 2.5)",
      lineHeight: size !== "100%" ? themeSize != null ? themeSize : size : undefined
    }
  };
}

var sizes$1 = {
  "2xs": getSize("4"),
  xs: getSize("6"),
  sm: getSize("8"),
  md: getSize("12"),
  lg: getSize("16"),
  xl: getSize("24"),
  "2xl": getSize("32"),
  full: getSize("100%")
};
var defaultProps$1 = {
  size: "md"
};
var Avatar = {
  parts: parts$2,
  baseStyle: baseStyle$2,
  sizes: sizes$1,
  defaultProps: defaultProps$1
};

var baseStyle$3 = {
  px: 1,
  textTransform: "uppercase",
  fontSize: "xs",
  borderRadius: "sm",
  fontWeight: "bold"
};

function variantSolid$1(props) {
  var c = props.colorScheme,
      theme = props.theme;
  var dark = transparentize(c + ".500", 0.6)(theme);
  return {
    bg: mode(c + ".500", dark)(props),
    color: mode("white", "whiteAlpha.800")(props)
  };
}

function variantSubtle$1(props) {
  var c = props.colorScheme,
      theme = props.theme;
  var darkBg = transparentize(c + ".200", 0.16)(theme);
  return {
    bg: mode(c + ".100", darkBg)(props),
    color: mode(c + ".800", c + ".200")(props)
  };
}

function variantOutline(props) {
  var c = props.colorScheme,
      theme = props.theme;
  var darkColor = transparentize(c + ".200", 0.8)(theme);
  var lightColor = getColor(theme, c + ".500");
  var color = mode(lightColor, darkColor)(props);
  return {
    color: color,
    boxShadow: "inset 0 0 0px 1px " + color
  };
}

var variants$1 = {
  solid: variantSolid$1,
  subtle: variantSubtle$1,
  outline: variantOutline
};
var defaultProps$2 = {
  variant: "subtle",
  colorScheme: "gray"
};
var Badge = {
  baseStyle: baseStyle$3,
  variants: variants$1,
  defaultProps: defaultProps$2
};

var parts$3 = ["container", "item", "link", "separator"];
var baseStyleLink = {
  transitionProperty: "common",
  transitionDuration: "fast",
  transitionTimingFunction: "ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline"
  },
  _focus: {
    boxShadow: "outline"
  }
};
var baseStyle$4 = {
  link: baseStyleLink
};
var Breadcrumb = {
  parts: parts$3,
  baseStyle: baseStyle$4
};

function _extends$a() {
  _extends$a = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$a.apply(this, arguments);
}
var baseStyle$5 = {
  lineHeight: "1.2",
  borderRadius: "md",
  fontWeight: "semibold",
  transitionProperty: "common",
  transitionDuration: "normal",
  _focus: {
    boxShadow: "outline"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none"
  },
  _hover: {
    _disabled: {
      bg: "initial"
    }
  }
};

function variantGhost(props) {
  var c = props.colorScheme,
      theme = props.theme;

  if (c === "gray") {
    return {
      color: mode("inherit", "whiteAlpha.900")(props),
      _hover: {
        bg: mode("gray.100", "whiteAlpha.200")(props)
      },
      _active: {
        bg: mode("gray.200", "whiteAlpha.300")(props)
      }
    };
  }

  var darkHoverBg = transparentize(c + ".200", 0.12)(theme);
  var darkActiveBg = transparentize(c + ".200", 0.24)(theme);
  return {
    color: mode(c + ".600", c + ".200")(props),
    bg: "transparent",
    _hover: {
      bg: mode(c + ".50", darkHoverBg)(props)
    },
    _active: {
      bg: mode(c + ".100", darkActiveBg)(props)
    }
  };
}

function variantOutline$1(props) {
  var c = props.colorScheme;
  var borderColor = mode("gray.200", "whiteAlpha.300")(props);
  return _extends$a({
    border: "1px solid",
    borderColor: c === "gray" ? borderColor : "currentColor"
  }, variantGhost(props));
}
/** Accessible color overrides for less accessible colors. */


var accessibleColorMap = {
  yellow: {
    bg: "yellow.400",
    color: "black",
    hoverBg: "yellow.500",
    activeBg: "yellow.600"
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
    hoverBg: "cyan.500",
    activeBg: "cyan.600"
  }
};

function variantSolid$2(props) {
  var c = props.colorScheme;

  if (c === "gray") {
    var _bg = mode("gray.100", "whiteAlpha.200")(props);

    return {
      bg: _bg,
      _hover: {
        bg: mode("gray.200", "whiteAlpha.300")(props),
        _disabled: {
          bg: _bg
        }
      },
      _active: {
        bg: mode("gray.300", "whiteAlpha.400")(props)
      }
    };
  }

  var _ref = accessibleColorMap[c] || {},
      _ref$bg = _ref.bg,
      bg = _ref$bg === void 0 ? c + ".500" : _ref$bg,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? "white" : _ref$color,
      _ref$hoverBg = _ref.hoverBg,
      hoverBg = _ref$hoverBg === void 0 ? c + ".600" : _ref$hoverBg,
      _ref$activeBg = _ref.activeBg,
      activeBg = _ref$activeBg === void 0 ? c + ".700" : _ref$activeBg;

  var background = mode(bg, c + ".200")(props);
  return {
    bg: background,
    color: mode(color, "gray.800")(props),
    _hover: {
      bg: mode(hoverBg, c + ".300")(props),
      _disabled: {
        bg: background
      }
    },
    _active: {
      bg: mode(activeBg, c + ".400")(props)
    }
  };
}

function variantLink(props) {
  var c = props.colorScheme;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color: mode(c + ".500", c + ".200")(props),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none"
      }
    },
    _active: {
      color: mode(c + ".700", c + ".500")(props)
    }
  };
}

var variantUnstyled = {
  bg: "none",
  color: "inherit",
  display: "inline",
  lineHeight: "inherit",
  m: 0,
  p: 0
};
var variants$2 = {
  ghost: variantGhost,
  outline: variantOutline$1,
  solid: variantSolid$2,
  link: variantLink,
  unstyled: variantUnstyled
};
var sizes$2 = {
  lg: {
    h: 12,
    minW: 12,
    fontSize: "lg",
    px: 6
  },
  md: {
    h: 10,
    minW: 10,
    fontSize: "md",
    px: 4
  },
  sm: {
    h: 8,
    minW: 8,
    fontSize: "sm",
    px: 3
  },
  xs: {
    h: 6,
    minW: 6,
    fontSize: "xs",
    px: 2
  }
};
var defaultProps$3 = {
  variant: "solid",
  size: "md",
  colorScheme: "gray"
};
var Button = {
  baseStyle: baseStyle$5,
  variants: variants$2,
  sizes: sizes$2,
  defaultProps: defaultProps$3
};

var parts$4 = ["container", "control", "label", "icon"];

function baseStyleControl(props) {
  var c = props.colorScheme;
  return {
    w: "100%",
    transitionProperty: "box-shadow",
    transitionDuration: "normal",
    border: "2px solid",
    borderRadius: "sm",
    borderColor: "inherit",
    color: "white",
    _checked: {
      bg: mode(c + ".500", c + ".200")(props),
      borderColor: mode(c + ".500", c + ".200")(props),
      color: mode("white", "gray.900")(props),
      _hover: {
        bg: mode(c + ".600", c + ".300")(props),
        borderColor: mode(c + ".600", c + ".300")(props)
      },
      _disabled: {
        borderColor: mode("gray.200", "transparent")(props),
        bg: mode("gray.200", "whiteAlpha.300")(props),
        color: mode("gray.500", "whiteAlpha.500")(props)
      }
    },
    _indeterminate: {
      bg: mode(c + ".500", c + ".200")(props),
      borderColor: mode(c + ".500", c + ".200")(props),
      color: mode("white", "gray.900")(props)
    },
    _disabled: {
      bg: mode("gray.100", "whiteAlpha.100")(props),
      borderColor: mode("gray.100", "transparent")(props)
    },
    _focus: {
      boxShadow: "outline"
    },
    _invalid: {
      borderColor: mode("red.500", "red.300")(props)
    }
  };
}

var baseStyleLabel = {
  userSelect: "none",
  _disabled: {
    opacity: 0.4
  }
};
var baseStyleIcon$1 = {
  transitionProperty: "transform",
  transitionDuration: "normal"
};

var baseStyle$6 = function baseStyle(props) {
  return {
    icon: baseStyleIcon$1,
    control: baseStyleControl(props),
    label: baseStyleLabel
  };
};

var sizes$3 = {
  sm: {
    control: {
      h: 3,
      w: 3
    },
    label: {
      fontSize: "sm"
    },
    icon: {
      fontSize: "0.45rem"
    }
  },
  md: {
    control: {
      w: 4,
      h: 4
    },
    label: {
      fontSize: "md"
    },
    icon: {
      fontSize: "0.625rem"
    }
  },
  lg: {
    control: {
      w: 5,
      h: 5
    },
    label: {
      fontSize: "lg"
    },
    icon: {
      fontSize: "0.625rem"
    }
  }
};
var defaultProps$4 = {
  size: "md",
  colorScheme: "blue"
};
var Checkbox = {
  parts: parts$4,
  baseStyle: baseStyle$6,
  sizes: sizes$3,
  defaultProps: defaultProps$4
};

function baseStyle$7(props) {
  var hoverBg = mode("blackAlpha.100", "whiteAlpha.100")(props);
  var activeBg = mode("blackAlpha.200", "whiteAlpha.200")(props);
  return {
    borderRadius: "md",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      boxShadow: "none"
    },
    _hover: {
      bg: hoverBg
    },
    _active: {
      bg: activeBg
    },
    _focus: {
      boxShadow: "outline"
    }
  };
}

var sizes$4 = {
  lg: {
    w: "40px",
    h: "40px",
    fontSize: "16px"
  },
  md: {
    w: "32px",
    h: "32px",
    fontSize: "12px"
  },
  sm: {
    w: "24px",
    h: "24px",
    fontSize: "10px"
  }
};
var defaultProps$5 = {
  size: "md"
};
var CloseButton = {
  baseStyle: baseStyle$7,
  sizes: sizes$4,
  defaultProps: defaultProps$5
};

var variants$3 = Badge.variants,
    defaultProps$6 = Badge.defaultProps;
var baseStyle$8 = {
  fontFamily: "mono",
  fontSize: "sm",
  px: "0.2em",
  borderRadius: "sm"
};
var Code = {
  baseStyle: baseStyle$8,
  variants: variants$3,
  defaultProps: defaultProps$6
};

var baseStyle$9 = {
  w: "100%",
  mx: "auto",
  maxW: "60ch",
  px: "1rem"
};
var Container$1 = {
  baseStyle: baseStyle$9
};

var baseStyle$a = {
  opacity: 0.6,
  borderColor: "inherit"
};
var variantSolid$3 = {
  borderStyle: "solid"
};
var variantDashed = {
  borderStyle: "dashed"
};
var variants$4 = {
  solid: variantSolid$3,
  dashed: variantDashed
};
var defaultProps$7 = {
  variant: "solid"
};
var Divider = {
  baseStyle: baseStyle$a,
  variants: variants$4,
  defaultProps: defaultProps$7
};

var parts$5 = ["overlay", "dialogContainer", "dialog", "header", "closeButton", "body", "footer"];
var baseStyleOverlay = {
  bg: "blackAlpha.600",
  zIndex: "modal"
};

function baseStyleDialogContainer(props) {
  var isCentered = props.isCentered,
      scrollBehavior = props.scrollBehavior;
  return {
    display: "flex",
    zIndex: "modal",
    justifyContent: "center",
    alignItems: isCentered ? "center" : "flex-start",
    overflow: scrollBehavior === "inside" ? "hidden" : "auto"
  };
}

function baseStyleDialog(props) {
  var scrollBehavior = props.scrollBehavior;
  return {
    borderRadius: "md",
    bg: mode("white", "gray.700")(props),
    color: "inherit",
    my: "3.75rem",
    zIndex: "modal",
    maxH: scrollBehavior === "inside" ? "calc(100% - 7.5rem)" : undefined,
    boxShadow: mode("lg", "dark-lg")(props)
  };
}

var baseStyleHeader = {
  px: 6,
  py: 4,
  fontSize: "xl",
  fontWeight: "semibold"
};
var baseStyleCloseButton = {
  position: "absolute",
  top: 2,
  insetEnd: 3
};

function baseStyleBody(props) {
  var scrollBehavior = props.scrollBehavior;
  return {
    px: 6,
    py: 2,
    flex: 1,
    overflow: scrollBehavior === "inside" ? "auto" : undefined
  };
}

var baseStyleFooter = {
  px: 6,
  py: 4
};

var baseStyle$b = function baseStyle(props) {
  return {
    overlay: baseStyleOverlay,
    dialogContainer: baseStyleDialogContainer(props),
    dialog: baseStyleDialog(props),
    header: baseStyleHeader,
    closeButton: baseStyleCloseButton,
    body: baseStyleBody(props),
    footer: baseStyleFooter
  };
};
/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */


function getSize$1(value) {
  if (value === "full") {
    return {
      dialog: {
        maxW: "100vw",
        minH: "100vh"
      }
    };
  }

  return {
    dialog: {
      maxW: value
    }
  };
}

var sizes$5 = {
  xs: getSize$1("xs"),
  sm: getSize$1("sm"),
  md: getSize$1("md"),
  lg: getSize$1("lg"),
  xl: getSize$1("xl"),
  "2xl": getSize$1("2xl"),
  "3xl": getSize$1("3xl"),
  "4xl": getSize$1("4xl"),
  "5xl": getSize$1("5xl"),
  "6xl": getSize$1("6xl"),
  full: getSize$1("full")
};
var defaultProps$8 = {
  size: "md"
};
var Modal = {
  parts: parts$5,
  baseStyle: baseStyle$b,
  sizes: sizes$5,
  defaultProps: defaultProps$8
};

function _extends$b() {
  _extends$b = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$b.apply(this, arguments);
}
var parts$6 = Modal.parts;
/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */

function getSize$2(value) {
  if (value === "full") {
    return {
      dialog: {
        maxW: "100vw",
        h: "100vh"
      }
    };
  }

  return {
    dialog: {
      maxW: value
    }
  };
}

var baseStyleOverlay$1 = {
  bg: "blackAlpha.600",
  zIndex: "overlay"
};
var baseStyleDialogContainer$1 = {
  display: "flex",
  zIndex: "modal",
  justifyContent: "center"
};

function baseStyleDialog$1(props) {
  var isFullHeight = props.isFullHeight;
  return _extends$b({}, isFullHeight && {
    height: "100vh"
  }, {
    zIndex: "modal",
    maxH: "100vh",
    bg: mode("white", "gray.700")(props),
    color: "inherit",
    boxShadow: mode("lg", "dark-lg")(props)
  });
}

var baseStyleHeader$1 = {
  px: 6,
  py: 4,
  fontSize: "xl",
  fontWeight: "semibold"
};
var baseStyleCloseButton$1 = {
  position: "absolute",
  top: 2,
  insetEnd: 3
};
var baseStyleBody$1 = {
  px: 6,
  py: 2,
  flex: 1,
  overflow: "auto"
};
var baseStyleFooter$1 = {
  px: 6,
  py: 4
};

var baseStyle$c = function baseStyle(props) {
  return {
    overlay: baseStyleOverlay$1,
    dialogContainer: baseStyleDialogContainer$1,
    dialog: baseStyleDialog$1(props),
    header: baseStyleHeader$1,
    closeButton: baseStyleCloseButton$1,
    body: baseStyleBody$1,
    footer: baseStyleFooter$1
  };
};

var sizes$6 = {
  xs: getSize$2("xs"),
  sm: getSize$2("md"),
  md: getSize$2("lg"),
  lg: getSize$2("2xl"),
  xl: getSize$2("4xl"),
  full: getSize$2("full")
};
var defaultProps$9 = {
  size: "xs"
};
var Drawer = {
  parts: parts$6,
  baseStyle: baseStyle$c,
  sizes: sizes$6,
  defaultProps: defaultProps$9
};

var parts$7 = ["preview", "input"];
var baseStylePreview = {
  borderRadius: "md",
  py: "3px",
  transitionProperty: "common",
  transitionDuration: "normal"
};
var baseStyleInput = {
  borderRadius: "md",
  py: "3px",
  transitionProperty: "common",
  transitionDuration: "normal",
  width: "full",
  _focus: {
    boxShadow: "outline"
  },
  _placeholder: {
    opacity: 0.6
  }
};
var baseStyle$d = {
  preview: baseStylePreview,
  input: baseStyleInput
};
var Editable = {
  parts: parts$7,
  baseStyle: baseStyle$d
};

var parts$8 = ["requiredIndicator", "helperText"];

function baseStyleRequiredIndicator(props) {
  return {
    marginStart: 1,
    color: mode("red.500", "red.300")(props)
  };
}

function baseStyleHelperText(props) {
  return {
    mt: 2,
    color: mode("gray.500", "whiteAlpha.600")(props),
    lineHeight: "normal",
    fontSize: "sm"
  };
}

var baseStyle$e = function baseStyle(props) {
  return {
    requiredIndicator: baseStyleRequiredIndicator(props),
    helperText: baseStyleHelperText(props)
  };
};

var Form = {
  parts: parts$8,
  baseStyle: baseStyle$e
};

var baseStyle$f = {
  fontSize: "md",
  marginEnd: 3,
  mb: 2,
  fontWeight: "medium",
  transitionProperty: "common",
  transitionDuration: "normal",
  opacity: 1,
  _disabled: {
    opacity: 0.4
  }
};
var FormLabel = {
  baseStyle: baseStyle$f
};

var baseStyle$g = {
  fontFamily: "heading",
  fontWeight: "bold"
};
var sizes$7 = {
  "4xl": {
    fontSize: ["6xl", null, "7xl"],
    lineHeight: 1
  },
  "3xl": {
    fontSize: ["5xl", null, "6xl"],
    lineHeight: 1
  },
  "2xl": {
    fontSize: ["4xl", null, "5xl"],
    lineHeight: [1.2, null, 1]
  },
  xl: {
    fontSize: ["3xl", null, "4xl"],
    lineHeight: [1.33, null, 1.2]
  },
  lg: {
    fontSize: ["2xl", null, "3xl"],
    lineHeight: [1.33, null, 1.2]
  },
  md: {
    fontSize: "xl",
    lineHeight: 1.2
  },
  sm: {
    fontSize: "md",
    lineHeight: 1.2
  },
  xs: {
    fontSize: "sm",
    lineHeight: 1.2
  }
};
var defaultProps$a = {
  size: "xl"
};
var Heading = {
  baseStyle: baseStyle$g,
  sizes: sizes$7,
  defaultProps: defaultProps$a
};

var parts$9 = ["field", "addon"];
var baseStyle$h = {
  field: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal"
  }
};
var size = {
  lg: {
    fontSize: "lg",
    px: 4,
    h: 12,
    borderRadius: "md"
  },
  md: {
    fontSize: "md",
    px: 4,
    h: 10,
    borderRadius: "md"
  },
  sm: {
    fontSize: "sm",
    px: 3,
    h: 8,
    borderRadius: "sm"
  },
  xs: {
    fontSize: "xs",
    px: 2,
    h: 6,
    borderRadius: "sm"
  }
};
var sizes$8 = {
  lg: {
    field: size.lg,
    addon: size.lg
  },
  md: {
    field: size.md,
    addon: size.md
  },
  sm: {
    field: size.sm,
    addon: size.sm
  },
  xs: {
    field: size.xs,
    addon: size.xs
  }
};

function getDefaults(props) {
  var fc = props.focusBorderColor,
      ec = props.errorBorderColor;
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props)
  };
}

function variantOutline$2(props) {
  var theme = props.theme;

  var _getDefaults = getDefaults(props),
      fc = _getDefaults.focusBorderColor,
      ec = _getDefaults.errorBorderColor;

  return {
    field: {
      border: "1px solid",
      borderColor: "inherit",
      bg: "inherit",
      _hover: {
        borderColor: mode("gray.300", "whiteAlpha.400")(props)
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed"
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: "0 0 0 1px " + getColor(theme, ec)
      },
      _focus: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: "0 0 0 1px " + getColor(theme, fc)
      }
    },
    addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("gray.100", "whiteAlpha.300")(props)
    }
  };
}

function variantFilled(props) {
  var theme = props.theme;

  var _getDefaults2 = getDefaults(props),
      fc = _getDefaults2.focusBorderColor,
      ec = _getDefaults2.errorBorderColor;

  return {
    field: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
      _hover: {
        bg: mode("gray.200", "whiteAlpha.100")(props)
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed"
      },
      _invalid: {
        borderColor: getColor(theme, ec)
      },
      _focus: {
        bg: "transparent",
        borderColor: getColor(theme, fc)
      }
    },
    addon: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props)
    }
  };
}

function variantFlushed(props) {
  var theme = props.theme;

  var _getDefaults3 = getDefaults(props),
      fc = _getDefaults3.focusBorderColor,
      ec = _getDefaults3.errorBorderColor;

  return {
    field: {
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: 0,
      px: 0,
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: "0px 1px 0px 0px " + getColor(theme, ec)
      },
      _focus: {
        borderColor: getColor(theme, fc),
        boxShadow: "0px 1px 0px 0px " + getColor(theme, fc)
      }
    },
    addon: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: 0,
      px: 0,
      bg: "transparent"
    }
  };
}

var variantUnstyled$1 = {
  field: {
    bg: "transparent",
    px: 0,
    height: "auto"
  },
  addon: {
    bg: "transparent",
    px: 0,
    height: "auto"
  }
};
var variants$5 = {
  outline: variantOutline$2,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled$1
};
var defaultProps$b = {
  size: "md",
  variant: "outline"
};
var Input = {
  parts: parts$9,
  baseStyle: baseStyle$h,
  sizes: sizes$8,
  variants: variants$5,
  defaultProps: defaultProps$b
};

function baseStyle$i(props) {
  return {
    bg: mode("gray.100", "whiteAlpha")(props),
    borderRadius: "md",
    borderWidth: "1px",
    borderBottomWidth: "3px",
    fontSize: "0.8em",
    fontWeight: "bold",
    lineHeight: "normal",
    px: "0.4em",
    whiteSpace: "nowrap"
  };
}

var Kbd = {
  baseStyle: baseStyle$i
};

var baseStyle$j = {
  transitionProperty: "common",
  transitionDuration: "fast",
  transitionTimingFunction: "ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline"
  },
  _focus: {
    boxShadow: "outline"
  }
};
var Link = {
  baseStyle: baseStyle$j
};

var parts$a = ["container", "item", "icon"];
var baseStyleContainer$2 = {};
var baseStyleItem = {};
var baseStyleIcon$2 = {
  marginEnd: "0.5rem",
  display: "inline",
  verticalAlign: "text-bottom"
};
var baseStyle$k = {
  container: baseStyleContainer$2,
  item: baseStyleItem,
  icon: baseStyleIcon$2
};
var List = {
  parts: parts$a,
  baseStyle: baseStyle$k
};

var parts$b = ["item", "command", "list", "button", "groupTitle", "divider"];

function baseStyleList(props) {
  return {
    bg: mode("#fff", "gray.700")(props),
    boxShadow: mode("sm", "dark-lg")(props),
    color: "inherit",
    minW: "3xs",
    py: "2",
    zIndex: 1,
    borderRadius: "md",
    borderWidth: "1px"
  };
}

function baseStyleItem$1(props) {
  return {
    py: "0.4rem",
    px: "0.8rem",
    transitionProperty: "background",
    transitionDuration: "ultra-fast",
    transitionTimingFunction: "ease-in",
    _focus: {
      bg: mode("gray.100", "whiteAlpha.100")(props)
    },
    _active: {
      bg: mode("gray.200", "whiteAlpha.200")(props)
    },
    _expanded: {
      bg: mode("gray.100", "whiteAlpha.100")(props)
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  };
}

var baseStyleGroupTitle = {
  mx: 4,
  my: 2,
  fontWeight: "semibold",
  fontSize: "sm"
};
var baseStyleCommand = {
  opacity: 0.6
};
var baseStyleDivider = {
  border: 0,
  borderBottom: "1px solid",
  borderColor: "inherit",
  my: "0.5rem",
  opacity: 0.6
};
var baseStyleButton$1 = {
  transitionProperty: "common",
  transitionDuration: "normal"
};

var baseStyle$l = function baseStyle(props) {
  return {
    button: baseStyleButton$1,
    list: baseStyleList(props),
    item: baseStyleItem$1(props),
    groupTitle: baseStyleGroupTitle,
    command: baseStyleCommand,
    divider: baseStyleDivider
  };
};

var Menu = {
  parts: parts$b,
  baseStyle: baseStyle$l
};

var typography$1 = {
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    "short": 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem"
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  },
  fonts: {
    heading: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    body: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    mono: "SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace"
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem"
  }
};

var _Input$baseStyle;

function _extends$c() {
  _extends$c = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$c.apply(this, arguments);
}
var parts$c = ["root", "field", "stepper", "stepperGroup"];
var variants$6 = Input.variants,
    defaultProps$c = Input.defaultProps;
var baseStyleRoot = {
  "--number-input-stepper-width": "24px",
  "--number-input-field-padding": "calc(var(--number-input-stepper-width) + 0.5rem)"
};
var baseStyleField = (_Input$baseStyle = Input.baseStyle) == null ? void 0 : _Input$baseStyle.field;
var baseStyleStepperGroup = {
  width: "var(--number-input-stepper-width)"
};

function baseStyleStepper(props) {
  return {
    borderStart: "1px solid",
    borderStartColor: mode("inherit", "whiteAlpha.300")(props),
    color: mode("inherit", "whiteAlpha.800")(props),
    _active: {
      bg: mode("gray.200", "whiteAlpha.300")(props)
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  };
}

var baseStyle$m = function baseStyle(props) {
  return {
    root: baseStyleRoot,
    field: baseStyleField,
    stepperGroup: baseStyleStepperGroup,
    stepper: baseStyleStepper(props)
  };
};

function getSize$3(size) {
  var sizeStyle = Input.sizes[size];
  var radius = {
    lg: "md",
    md: "md",
    sm: "sm",
    xs: "sm"
  };
  var resolvedFontSize = typography$1.fontSizes[sizeStyle.field.fontSize];
  return {
    field: _extends$c({}, sizeStyle.field, {
      paddingInlineEnd: "var(--number-input-field-padding)",
      verticalAlign: "top"
    }),
    stepper: {
      fontSize: "calc(" + resolvedFontSize + " * 0.75)",
      _first: {
        borderTopEndRadius: radius[size]
      },
      _last: {
        borderBottomEndRadius: radius[size],
        mt: "-1px",
        borderTopWidth: 1
      }
    }
  };
}

var sizes$9 = {
  xs: getSize$3("xs"),
  sm: getSize$3("sm"),
  md: getSize$3("md"),
  lg: getSize$3("lg")
};
var NumberInput = {
  parts: parts$c,
  baseStyle: baseStyle$m,
  sizes: sizes$9,
  variants: variants$6,
  defaultProps: defaultProps$c
};

function _extends$d() {
  _extends$d = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$d.apply(this, arguments);
}

var baseStyle$n = _extends$d({}, Input.baseStyle.field, {
  textAlign: "center"
});

var sizes$a = {
  lg: {
    fontSize: "lg",
    w: 12,
    h: 12,
    borderRadius: "md"
  },
  md: {
    fontSize: "md",
    w: 10,
    h: 10,
    borderRadius: "md"
  },
  sm: {
    fontSize: "sm",
    w: 8,
    h: 8,
    borderRadius: "sm"
  },
  xs: {
    fontSize: "xs",
    w: 6,
    h: 6,
    borderRadius: "sm"
  }
};
var variants$7 = {
  outline: function outline(props) {
    return Input.variants.outline(props).field;
  },
  flushed: function flushed(props) {
    return Input.variants.flushed(props).field;
  },
  filled: function filled(props) {
    return Input.variants.filled(props).field;
  },
  unstyled: Input.variants.unstyled.field
};
var defaultProps$d = Input.defaultProps;
var PinInput = {
  baseStyle: baseStyle$n,
  sizes: sizes$a,
  variants: variants$7,
  defaultProps: defaultProps$d
};

var parts$d = ["popper", "content", "header", "body", "footer", "arrow"];
var baseStylePopper = {
  zIndex: 10
};

function baseStyleContent(props) {
  var bg = mode("white", "gray.700")(props);
  var shadowColor = mode("gray.200", "whiteAlpha.300")(props);
  return {
    "--popover-bg": "colors." + bg,
    bg: "var(--popover-bg)",
    "--popper-arrow-bg": "var(--popover-bg)",
    "--popper-arrow-shadow-color": "colors." + shadowColor,
    width: "xs",
    border: "1px solid",
    borderColor: "inherit",
    borderRadius: "md",
    boxShadow: "sm",
    zIndex: "inherit",
    _focus: {
      outline: 0,
      boxShadow: "outline"
    }
  };
}

var baseStyleHeader$2 = {
  px: 3,
  py: 2,
  borderBottomWidth: "1px"
};
var baseStyleBody$2 = {
  px: 3,
  py: 2
};
var baseStyleFooter$2 = {
  px: 3,
  py: 2,
  borderTopWidth: "1px"
};

var baseStyle$o = function baseStyle(props) {
  return {
    popper: baseStylePopper,
    content: baseStyleContent(props),
    header: baseStyleHeader$2,
    body: baseStyleBody$2,
    footer: baseStyleFooter$2,
    arrow: {}
  };
};

var Popover = {
  parts: parts$d,
  baseStyle: baseStyle$o
};

function _extends$e() {
  _extends$e = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$e.apply(this, arguments);
}
var parts$e = ["track", "filledTrack", "label"];

function filledStyle(props) {
  var c = props.colorScheme,
      t = props.theme,
      isIndeterminate = props.isIndeterminate,
      hasStripe = props.hasStripe;
  var stripeStyle = mode(generateStripe(), generateStripe("1rem", "rgba(0,0,0,0.1)"))(props);
  var bgColor = mode(c + ".500", c + ".200")(props);
  var gradient = "linear-gradient(\n    to right,\n    transparent 0%,\n    " + getColor(t, bgColor) + " 50%,\n    transparent 100%\n  )";
  var addStripe = !isIndeterminate && hasStripe;
  return _extends$e({}, addStripe && stripeStyle, isIndeterminate ? {
    bgImage: gradient
  } : {
    bgColor: bgColor
  });
}

var baseStyleLabel$1 = {
  lineHeight: "1",
  fontSize: "0.25em",
  fontWeight: "bold",
  color: "white"
};

function baseStyleTrack(props) {
  return {
    bg: mode("gray.100", "whiteAlpha.300")(props)
  };
}

function baseStyleFilledTrack(props) {
  return _extends$e({
    transitionProperty: "common",
    transitionDuration: "slow"
  }, filledStyle(props));
}

var baseStyle$p = function baseStyle(props) {
  return {
    label: baseStyleLabel$1,
    filledTrack: baseStyleFilledTrack(props),
    track: baseStyleTrack(props)
  };
};

var sizes$b = {
  xs: {
    track: {
      h: "0.25rem"
    }
  },
  sm: {
    track: {
      h: "0.5rem"
    }
  },
  md: {
    track: {
      h: "0.75rem"
    }
  },
  lg: {
    track: {
      h: "1rem"
    }
  }
};
var defaultProps$e = {
  size: "md",
  colorScheme: "blue"
};
var Progress = {
  parts: parts$e,
  sizes: sizes$b,
  baseStyle: baseStyle$p,
  defaultProps: defaultProps$e
};

function _extends$f() {
  _extends$f = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$f.apply(this, arguments);
}
var parts$f = ["container", "control", "label"];

function baseStyleControl$1(props) {
  var _Checkbox$baseStyle = Checkbox.baseStyle(props),
      control = _Checkbox$baseStyle.control;

  return _extends$f({}, control, {
    borderRadius: "full",
    _checked: _extends$f({}, control["_checked"], {
      _before: {
        content: "\"\"",
        display: "inline-block",
        pos: "relative",
        w: "50%",
        h: "50%",
        borderRadius: "50%",
        bg: "currentColor"
      }
    })
  });
}

var baseStyle$q = function baseStyle(props) {
  return {
    label: Checkbox.baseStyle(props).label,
    control: baseStyleControl$1(props)
  };
};

var sizes$c = {
  md: {
    control: {
      w: 4,
      h: 4
    },
    label: {
      fontSize: "md"
    }
  },
  lg: {
    control: {
      w: 5,
      h: 5
    },
    label: {
      fontSize: "lg"
    }
  },
  sm: {
    control: {
      width: 3,
      height: 3
    },
    label: {
      fontSize: "sm"
    }
  }
};
var defaultProps$f = {
  size: "md",
  colorScheme: "blue"
};
var Radio = {
  parts: parts$f,
  baseStyle: baseStyle$q,
  sizes: sizes$c,
  defaultProps: defaultProps$f
};

function _extends$g() {
  _extends$g = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$g.apply(this, arguments);
}
var parts$g = ["field", "icon"];

function baseStyleField$1(props) {
  return _extends$g({}, Input.baseStyle.field, {
    appearance: "none",
    paddingBottom: "1px",
    lineHeight: "normal",
    "> option, > optgroup": {
      bg: mode("white", "gray.700")(props)
    }
  });
}

var baseStyleIcon$3 = {
  width: "1.5rem",
  height: "100%",
  insetEnd: "0.5rem",
  position: "relative",
  color: "currentColor",
  fontSize: "1.25rem",
  _disabled: {
    opacity: 0.5
  }
};

var baseStyle$r = function baseStyle(props) {
  return {
    field: baseStyleField$1(props),
    icon: baseStyleIcon$3
  };
};

var sizes$d = lodash_mergewith({}, Input.sizes, {
  xs: {
    icon: {
      insetEnd: "0.25rem"
    }
  }
});
var Select = {
  parts: parts$g,
  baseStyle: baseStyle$r,
  sizes: sizes$d,
  variants: Input.variants,
  defaultProps: Input.defaultProps
};

var fade = function fade(startColor, endColor) {
  return keyframes({
    from: {
      borderColor: startColor,
      background: startColor
    },
    to: {
      borderColor: endColor,
      background: endColor
    }
  });
};

var baseStyle$s = function baseStyle(props) {
  var defaultStartColor = mode("gray.100", "gray.800")(props);
  var defaultEndColor = mode("gray.400", "gray.600")(props);
  var _props$startColor = props.startColor,
      startColor = _props$startColor === void 0 ? defaultStartColor : _props$startColor,
      _props$endColor = props.endColor,
      endColor = _props$endColor === void 0 ? defaultEndColor : _props$endColor,
      speed = props.speed,
      theme = props.theme;
  var start = getColor(theme, startColor);
  var end = getColor(theme, endColor);
  return {
    opacity: 0.7,
    borderRadius: "2px",
    borderColor: start,
    background: end,
    animation: speed + "s linear infinite alternate " + fade(start, end)
  };
};

var Skeleton = {
  baseStyle: baseStyle$s
};

var baseStyle$t = function baseStyle(props) {
  return {
    borderRadius: "md",
    fontWeight: "semibold",
    _focus: {
      boxShadow: "outline",
      padding: "1rem",
      position: "fixed",
      top: "1.5rem",
      insetStart: "1.5rem",
      bg: mode("white", "gray.700")(props)
    }
  };
};

var SkipLink = {
  baseStyle: baseStyle$t
};

function _extends$h() {
  _extends$h = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$h.apply(this, arguments);
}
var parts$h = ["container", "thumb", "track", "filledTrack"];

function thumbOrientation(props) {
  return orient({
    orientation: props.orientation,
    vertical: {
      left: "50%",
      transform: "translateX(-50%)",
      _active: {
        transform: "translateX(-50%) scale(1.15)"
      }
    },
    horizontal: {
      top: "50%",
      transform: "translateY(-50%)",
      _active: {
        transform: "translateY(-50%) scale(1.15)"
      }
    }
  });
}

var baseStyleContainer$3 = function baseStyleContainer(props) {
  var orientation = props.orientation;
  return _extends$h({
    _disabled: {
      opacity: 0.6,
      cursor: "default",
      pointerEvents: "none"
    }
  }, orient({
    orientation: orientation,
    vertical: {
      h: "100%"
    },
    horizontal: {
      w: "100%"
    }
  }));
};

function baseStyleTrack$1(props) {
  return {
    borderRadius: "sm",
    bg: mode("gray.200", "whiteAlpha.200")(props),
    _disabled: {
      bg: mode("gray.300", "whiteAlpha.300")(props)
    }
  };
}

function baseStyleThumb(props) {
  return _extends$h({
    zIndex: 1,
    borderRadius: "full",
    bg: "white",
    boxShadow: "base",
    border: "1px solid",
    borderColor: "transparent",
    transitionProperty: "transform",
    transitionDuration: "normal",
    _focus: {
      boxShadow: "outline"
    },
    _disabled: {
      bg: "gray.300"
    }
  }, thumbOrientation(props));
}

function baseStyleFilledTrack$1(props) {
  var c = props.colorScheme;
  return {
    bg: mode(c + ".500", c + ".200")(props)
  };
}

var baseStyle$u = function baseStyle(props) {
  return {
    container: baseStyleContainer$3(props),
    track: baseStyleTrack$1(props),
    thumb: baseStyleThumb(props),
    filledTrack: baseStyleFilledTrack$1(props)
  };
};

function sizeLg(props) {
  return {
    thumb: {
      w: "16px",
      h: "16px"
    },
    track: orient({
      orientation: props.orientation,
      horizontal: {
        h: "4px"
      },
      vertical: {
        w: "4px"
      }
    })
  };
}

function sizeMd(props) {
  return {
    thumb: {
      w: "14px",
      h: "14px"
    },
    track: orient({
      orientation: props.orientation,
      horizontal: {
        h: "4px"
      },
      vertical: {
        w: "4px"
      }
    })
  };
}

function sizeSm(props) {
  return {
    thumb: {
      w: "10px",
      h: "10px"
    },
    track: orient({
      orientation: props.orientation,
      horizontal: {
        h: "2px"
      },
      vertical: {
        w: "2px"
      }
    })
  };
}

var sizes$e = {
  lg: sizeLg,
  md: sizeMd,
  sm: sizeSm
};
var defaultProps$g = {
  size: "md",
  colorScheme: "blue"
};
var Slider = {
  parts: parts$h,
  sizes: sizes$e,
  baseStyle: baseStyle$u,
  defaultProps: defaultProps$g
};

var baseStyle$v = {
  width: "var(--spinner-size)",
  height: "var(--spinner-size)"
};
var sizes$f = {
  xs: {
    "--spinner-size": "0.75rem"
  },
  sm: {
    "--spinner-size": "1rem"
  },
  md: {
    "--spinner-size": "1.5rem"
  },
  lg: {
    "--spinner-size": "2rem"
  },
  xl: {
    "--spinner-size": "3rem"
  }
};
var defaultProps$h = {
  size: "md"
};
var Spinner = {
  baseStyle: baseStyle$v,
  sizes: sizes$f,
  defaultProps: defaultProps$h
};

var parts$i = ["label", "number", "icon", "helpText"];
var baseStyleLabel$2 = {
  fontWeight: "medium"
};
var baseStyleHelpText = {
  opacity: 0.8,
  marginBottom: 2
};
var baseStyleNumber = {
  verticalAlign: "baseline",
  fontWeight: "semibold"
};
var baseStyleIcon$4 = {
  marginEnd: 1,
  w: "14px",
  h: "14px",
  verticalAlign: "middle"
};
var baseStyle$w = {
  label: baseStyleLabel$2,
  helpText: baseStyleHelpText,
  number: baseStyleNumber,
  icon: baseStyleIcon$4
};
var sizes$g = {
  md: {
    label: {
      fontSize: "sm"
    },
    helpText: {
      fontSize: "sm"
    },
    number: {
      fontSize: "2xl"
    }
  }
};
var defaultProps$i = {
  size: "md"
};
var Stat = {
  parts: parts$i,
  baseStyle: baseStyle$w,
  sizes: sizes$g,
  defaultProps: defaultProps$i
};

var parts$j = ["container", "track", "thumb"];

function baseStyleTrack$2(props) {
  var c = props.colorScheme;
  return {
    borderRadius: "full",
    p: "2px",
    width: "var(--slider-track-width)",
    height: "var(--slider-track-height)",
    transitionProperty: "common",
    transitionDuration: "fast",
    bg: mode("gray.300", "whiteAlpha.400")(props),
    _focus: {
      boxShadow: "outline"
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    },
    _checked: {
      bg: mode(c + ".500", c + ".200")(props)
    }
  };
}

var baseStyleThumb$1 = {
  bg: "white",
  transitionProperty: "transform",
  transitionDuration: "normal",
  borderRadius: "inherit",
  width: "var(--slider-track-height)",
  height: "var(--slider-track-height)",
  _checked: {
    transform: "translateX(var(--slider-thumb-x))"
  }
};

var baseStyle$x = function baseStyle(props) {
  return {
    container: {
      "--slider-track-diff": "calc(var(--slider-track-width) - var(--slider-track-height))",
      "--slider-thumb-x": "var(--slider-track-diff)",
      _rtl: {
        "--slider-thumb-x": "calc(-1 * var(--slider-track-diff))"
      }
    },
    track: baseStyleTrack$2(props),
    thumb: baseStyleThumb$1
  };
};

var sizes$h = {
  sm: {
    container: {
      "--slider-track-width": "1.375rem",
      "--slider-track-height": "0.75rem"
    }
  },
  md: {
    container: {
      "--slider-track-width": "1.875rem",
      "--slider-track-height": "1rem"
    }
  },
  lg: {
    container: {
      "--slider-track-width": "2.875rem",
      "--slider-track-height": "1.5rem"
    }
  }
};
var defaultProps$j = {
  size: "md",
  colorScheme: "blue"
};
var Switch = {
  parts: parts$j,
  baseStyle: baseStyle$x,
  sizes: sizes$h,
  defaultProps: defaultProps$j
};

function _extends$i() {
  _extends$i = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$i.apply(this, arguments);
}
var parts$k = ["table", "thead", "tbody", "tr", "th", "td", "caption"];
var baseStyle$y = {
  table: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full"
  },
  th: {
    fontFamily: "heading",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    textAlign: "start"
  },
  td: {
    textAlign: "start"
  },
  caption: {
    mt: 4,
    fontFamily: "heading",
    textAlign: "center",
    fontWeight: "medium"
  }
};
var numericStyles = {
  "&[data-is-numeric=true]": {
    textAlign: "end"
  }
};

var simpleVariant = function simpleVariant(props) {
  var c = props.colorScheme;
  return {
    th: _extends$i({
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: mode(c + ".100", c + ".700")(props)
    }, numericStyles),
    td: _extends$i({
      borderBottom: "1px",
      borderColor: mode(c + ".100", c + ".700")(props)
    }, numericStyles),
    caption: {
      color: mode("gray.600", "gray.100")(props)
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: {
            borderBottomWidth: 0
          }
        }
      }
    }
  };
};

var stripedVariant = function stripedVariant(props) {
  var c = props.colorScheme;
  return {
    th: _extends$i({
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: mode(c + ".100", c + ".700")(props)
    }, numericStyles),
    td: _extends$i({
      borderBottom: "1px",
      borderColor: mode(c + ".100", c + ".700")(props)
    }, numericStyles),
    caption: {
      color: mode("gray.600", "gray.100")(props)
    },
    tbody: {
      tr: {
        "&:nth-of-type(odd)": {
          "th, td": {
            borderBottomWidth: "1px",
            borderColor: mode(c + ".100", c + ".700")(props)
          },
          td: {
            background: mode(c + ".100", c + ".700")(props)
          }
        }
      }
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: {
            borderBottomWidth: 0
          }
        }
      }
    }
  };
};

var variants$8 = {
  simple: simpleVariant,
  striped: stripedVariant,
  unstyled: {}
};
var sizes$i = {
  sm: {
    th: {
      px: "4",
      py: "1",
      lineHeight: "4",
      fontSize: "xs"
    },
    td: {
      px: "4",
      py: "2",
      fontSize: "sm",
      lineHeight: "4"
    },
    caption: {
      px: "4",
      py: "2",
      fontSize: "xs"
    }
  },
  md: {
    th: {
      px: "6",
      py: "3",
      lineHeight: "4",
      fontSize: "xs"
    },
    td: {
      px: "6",
      py: "4",
      lineHeight: "5"
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "sm"
    }
  },
  lg: {
    th: {
      px: "8",
      py: "4",
      lineHeight: "5",
      fontSize: "sm"
    },
    td: {
      px: "8",
      py: "5",
      lineHeight: "6"
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "md"
    }
  }
};
var defaultProps$k = {
  variant: "simple",
  size: "md",
  colorScheme: "gray"
};
var Table = {
  parts: parts$k,
  baseStyle: baseStyle$y,
  variants: variants$8,
  sizes: sizes$i,
  defaultProps: defaultProps$k
};

function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var parts$l = ["root", "tablist", "tab", "tabpanels", "tabpanel", "indicator"];

function baseStyleRoot$1(props) {
  var orientation = props.orientation;
  return {
    display: orientation === "vertical" ? "flex" : "block"
  };
}

function baseStyleTab(props) {
  var isFitted = props.isFitted;
  return {
    flex: isFitted ? 1 : undefined,
    transitionProperty: "common",
    transitionDuration: "normal",
    _focus: {
      zIndex: 1,
      boxShadow: "outline"
    }
  };
}

function baseStyleTablist(props) {
  var _props$align = props.align,
      align = _props$align === void 0 ? "start" : _props$align,
      orientation = props.orientation;
  var alignments = {
    end: "flex-end",
    center: "center",
    start: "flex-start"
  };
  return {
    justifyContent: alignments[align],
    flexDirection: orientation === "vertical" ? "column" : "row"
  };
}

var baseStyleTabpanel = {
  p: 4
};

var baseStyle$z = function baseStyle(props) {
  return {
    root: baseStyleRoot$1(props),
    tab: baseStyleTab(props),
    tablist: baseStyleTablist(props),
    tabpanel: baseStyleTabpanel
  };
};

var sizes$j = {
  sm: {
    tab: {
      py: 1,
      px: 4,
      fontSize: "sm"
    }
  },
  md: {
    tab: {
      fontSize: "md",
      py: 2,
      px: 4
    }
  },
  lg: {
    tab: {
      fontSize: "lg",
      py: 3,
      px: 4
    }
  }
};

function variantLine(props) {
  var _tablist, _tab;

  var c = props.colorScheme,
      orientation = props.orientation;
  var isVertical = orientation === "vertical";
  var borderProp = orientation === "vertical" ? "borderStart" : "borderBottom";
  var marginProp = isVertical ? "marginStart" : "marginBottom";
  return {
    tablist: (_tablist = {}, _defineProperty$3(_tablist, borderProp, "2px solid"), _defineProperty$3(_tablist, "borderColor", "inherit"), _tablist),
    tab: (_tab = {}, _defineProperty$3(_tab, borderProp, "2px solid"), _defineProperty$3(_tab, "borderColor", "transparent"), _defineProperty$3(_tab, marginProp, "-2px"), _defineProperty$3(_tab, "_selected", {
      color: mode(c + ".600", c + ".300")(props),
      borderColor: "currentColor"
    }), _defineProperty$3(_tab, "_active", {
      bg: mode("gray.200", "whiteAlpha.300")(props)
    }), _defineProperty$3(_tab, "_disabled", {
      opacity: 0.4,
      cursor: "not-allowed"
    }), _tab)
  };
}

function variantEnclosed(props) {
  var c = props.colorScheme;
  return {
    tab: {
      borderTopRadius: "md",
      border: "1px solid",
      borderColor: "transparent",
      mb: "-1px",
      _selected: {
        color: mode(c + ".600", c + ".300")(props),
        borderColor: "inherit",
        borderBottomColor: mode("white", "gray.800")(props)
      }
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
}

function variantEnclosedColored(props) {
  var c = props.colorScheme;
  return {
    tab: {
      border: "1px solid",
      borderColor: "inherit",
      bg: mode("gray.50", "whiteAlpha.50")(props),
      mb: "-1px",
      _notLast: {
        marginEnd: "-1px"
      },
      _selected: {
        bg: mode("#fff", "gray.800")(props),
        color: mode(c + ".600", c + ".300")(props),
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "transparent"
      }
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
}

function variantSoftRounded(props) {
  var c = props.colorScheme,
      theme = props.theme;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: getColor(theme, c + ".700"),
        bg: getColor(theme, c + ".100")
      }
    }
  };
}

function variantSolidRounded(props) {
  var c = props.colorScheme;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: mode("gray.600", "inherit")(props),
      _selected: {
        color: mode("#fff", "gray.800")(props),
        bg: mode(c + ".600", c + ".300")(props)
      }
    }
  };
}

var variantUnstyled$2 = {};
var variants$9 = {
  line: variantLine,
  enclosed: variantEnclosed,
  "enclosed-colored": variantEnclosedColored,
  "soft-rounded": variantSoftRounded,
  "solid-rounded": variantSolidRounded,
  unstyled: variantUnstyled$2
};
var defaultProps$l = {
  size: "md",
  variant: "line",
  colorScheme: "blue"
};
var Tabs = {
  parts: parts$l,
  baseStyle: baseStyle$z,
  sizes: sizes$j,
  variants: variants$9,
  defaultProps: defaultProps$l
};

var parts$m = ["container", "label", "closeButton"];
var baseStyleContainer$4 = {
  fontWeight: "medium",
  lineHeight: 1.2,
  outline: 0,
  _focus: {
    boxShadow: "outline"
  }
};
var baseStyleLabel$3 = {
  lineHeight: 1.2
};
var baseStyleCloseButton$2 = {
  fontSize: "18px",
  w: "1.25rem",
  h: "1.25rem",
  transitionProperty: "common",
  transitionDuration: "normal",
  borderRadius: "full",
  marginStart: "0.375rem",
  marginEnd: "-1",
  opacity: 0.5,
  _disabled: {
    opacity: 0.4
  },
  _focus: {
    boxShadow: "outline",
    bg: "rgba(0, 0, 0, 0.14)"
  },
  _hover: {
    opacity: 0.8
  },
  _active: {
    opacity: 1
  }
};
var baseStyle$A = {
  container: baseStyleContainer$4,
  label: baseStyleLabel$3,
  closeButton: baseStyleCloseButton$2
};
var sizes$k = {
  sm: {
    container: {
      minH: "1.25rem",
      minW: "1.25rem",
      fontSize: "xs",
      px: 2,
      borderRadius: "md"
    },
    closeButton: {
      marginEnd: "-2px",
      marginStart: "0.35rem"
    }
  },
  md: {
    container: {
      minH: "1.5rem",
      minW: "1.5rem",
      fontSize: "sm",
      borderRadius: "md",
      px: 2
    }
  },
  lg: {
    container: {
      minH: 8,
      minW: 8,
      fontSize: "md",
      borderRadius: "md",
      px: 3
    }
  }
};
var variants$a = {
  subtle: function subtle(props) {
    return {
      container: Badge.variants.subtle(props)
    };
  },
  solid: function solid(props) {
    return {
      container: Badge.variants.solid(props)
    };
  },
  outline: function outline(props) {
    return {
      container: Badge.variants.outline(props)
    };
  }
};
var defaultProps$m = {
  size: "md",
  variant: "subtle",
  colorScheme: "gray"
};
var Tag = {
  parts: parts$m,
  variants: variants$a,
  baseStyle: baseStyle$A,
  sizes: sizes$k,
  defaultProps: defaultProps$m
};

function _extends$j() {
  _extends$j = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$j.apply(this, arguments);
}

var baseStyle$B = _extends$j({}, Input.baseStyle.field, {
  paddingY: "8px",
  minHeight: "80px",
  lineHeight: "short",
  verticalAlign: "top"
});

var variants$b = {
  outline: function outline(props) {
    return Input.variants.outline(props).field;
  },
  flushed: function flushed(props) {
    return Input.variants.flushed(props).field;
  },
  filled: function filled(props) {
    return Input.variants.filled(props).field;
  },
  unstyled: Input.variants.unstyled.field
};
var sizes$l = {
  xs: Input.sizes.xs.field,
  sm: Input.sizes.sm.field,
  md: Input.sizes.md.field,
  lg: Input.sizes.lg.field
};
var defaultProps$n = {
  size: "md",
  variant: "outline"
};
var Textarea = {
  baseStyle: baseStyle$B,
  sizes: sizes$l,
  variants: variants$b,
  defaultProps: defaultProps$n
};

function baseStyle$C(props) {
  var bg = mode("gray.700", "gray.300")(props);
  return {
    "--tooltip-bg": "colors." + bg,
    px: "8px",
    py: "2px",
    bg: "var(--tooltip-bg)",
    "--popper-arrow-bg": "var(--tooltip-bg)",
    color: mode("whiteAlpha.900", "gray.900")(props),
    borderRadius: "sm",
    fontWeight: "medium",
    fontSize: "sm",
    boxShadow: "md",
    maxW: "320px",
    zIndex: "tooltip"
  };
}

var Tooltip = {
  baseStyle: baseStyle$C
};

var parts$n = ["text", "icon"];

function baseStyleText(props) {
  return {
    color: mode("red.500", "red.300")(props),
    mt: 2,
    fontSize: "sm"
  };
}

function baseStyleIcon$5(props) {
  return {
    marginEnd: "0.5em",
    color: mode("red.500", "red.300")(props)
  };
}

var baseStyle$D = function baseStyle(props) {
  return {
    text: baseStyleText(props),
    icon: baseStyleIcon$5(props)
  };
};

var FormError = {
  parts: parts$n,
  baseStyle: baseStyle$D
};

var components = {
  Accordion: Accordion,
  Alert: Alert,
  Avatar: Avatar,
  Badge: Badge,
  Breadcrumb: Breadcrumb,
  Button: Button,
  Checkbox: Checkbox,
  CloseButton: CloseButton,
  Code: Code,
  Container: Container$1,
  Divider: Divider,
  Drawer: Drawer,
  Editable: Editable,
  Form: Form,
  FormLabel: FormLabel,
  Heading: Heading,
  Input: Input,
  Kbd: Kbd,
  Link: Link,
  List: List,
  Menu: Menu,
  Modal: Modal,
  NumberInput: NumberInput,
  PinInput: PinInput,
  Popover: Popover,
  Progress: Progress,
  Radio: Radio,
  Select: Select,
  Skeleton: Skeleton,
  SkipLink: SkipLink,
  Slider: Slider,
  Spinner: Spinner,
  Stat: Stat,
  Switch: Switch,
  Table: Table,
  Tabs: Tabs,
  Tag: Tag,
  Textarea: Textarea,
  Tooltip: Tooltip,
  FormError: FormError
};

var borders = {
  none: 0,
  "1px": "1px solid",
  "2px": "2px solid",
  "4px": "4px solid",
  "8px": "8px solid"
};

/**
 * Breakpoints for responsive design
 */

var breakpoints$1 = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em"
});

/**
 * @deprecated
 * You can derive the Colors type from the DefaultChakraTheme:
 *
 * type Colors = DefaultChakraTheme["colors"]
 */
var colors = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#FFFFFF",
  whiteAlpha: {
    50: "rgba(255, 255, 255, 0.04)",
    100: "rgba(255, 255, 255, 0.06)",
    200: "rgba(255, 255, 255, 0.08)",
    300: "rgba(255, 255, 255, 0.16)",
    400: "rgba(255, 255, 255, 0.24)",
    500: "rgba(255, 255, 255, 0.36)",
    600: "rgba(255, 255, 255, 0.48)",
    700: "rgba(255, 255, 255, 0.64)",
    800: "rgba(255, 255, 255, 0.80)",
    900: "rgba(255, 255, 255, 0.92)"
  },
  blackAlpha: {
    50: "rgba(0, 0, 0, 0.04)",
    100: "rgba(0, 0, 0, 0.06)",
    200: "rgba(0, 0, 0, 0.08)",
    300: "rgba(0, 0, 0, 0.16)",
    400: "rgba(0, 0, 0, 0.24)",
    500: "rgba(0, 0, 0, 0.36)",
    600: "rgba(0, 0, 0, 0.48)",
    700: "rgba(0, 0, 0, 0.64)",
    800: "rgba(0, 0, 0, 0.80)",
    900: "rgba(0, 0, 0, 0.92)"
  },
  gray: {
    50: "#F7FAFC",
    100: "#EDF2F7",
    200: "#E2E8F0",
    300: "#CBD5E0",
    400: "#A0AEC0",
    500: "#718096",
    600: "#4A5568",
    700: "#2D3748",
    800: "#1A202C",
    900: "#171923"
  },
  red: {
    50: "#FFF5F5",
    100: "#FED7D7",
    200: "#FEB2B2",
    300: "#FC8181",
    400: "#F56565",
    500: "#E53E3E",
    600: "#C53030",
    700: "#9B2C2C",
    800: "#822727",
    900: "#63171B"
  },
  orange: {
    50: "#FFFAF0",
    100: "#FEEBC8",
    200: "#FBD38D",
    300: "#F6AD55",
    400: "#ED8936",
    500: "#DD6B20",
    600: "#C05621",
    700: "#9C4221",
    800: "#7B341E",
    900: "#652B19"
  },
  yellow: {
    50: "#FFFFF0",
    100: "#FEFCBF",
    200: "#FAF089",
    300: "#F6E05E",
    400: "#ECC94B",
    500: "#D69E2E",
    600: "#B7791F",
    700: "#975A16",
    800: "#744210",
    900: "#5F370E"
  },
  green: {
    50: "#F0FFF4",
    100: "#C6F6D5",
    200: "#9AE6B4",
    300: "#68D391",
    400: "#48BB78",
    500: "#38A169",
    600: "#2F855A",
    700: "#276749",
    800: "#22543D",
    900: "#1C4532"
  },
  teal: {
    50: "#E6FFFA",
    100: "#B2F5EA",
    200: "#81E6D9",
    300: "#4FD1C5",
    400: "#38B2AC",
    500: "#319795",
    600: "#2C7A7B",
    700: "#285E61",
    800: "#234E52",
    900: "#1D4044"
  },
  blue: {
    50: "#ebf8ff",
    100: "#bee3f8",
    200: "#90cdf4",
    300: "#63b3ed",
    400: "#4299e1",
    500: "#3182ce",
    600: "#2b6cb0",
    700: "#2c5282",
    800: "#2a4365",
    900: "#1A365D"
  },
  cyan: {
    50: "#EDFDFD",
    100: "#C4F1F9",
    200: "#9DECF9",
    300: "#76E4F7",
    400: "#0BC5EA",
    500: "#00B5D8",
    600: "#00A3C4",
    700: "#0987A0",
    800: "#086F83",
    900: "#065666"
  },
  purple: {
    50: "#FAF5FF",
    100: "#E9D8FD",
    200: "#D6BCFA",
    300: "#B794F4",
    400: "#9F7AEA",
    500: "#805AD5",
    600: "#6B46C1",
    700: "#553C9A",
    800: "#44337A",
    900: "#322659"
  },
  pink: {
    50: "#FFF5F7",
    100: "#FED7E2",
    200: "#FBB6CE",
    300: "#F687B3",
    400: "#ED64A6",
    500: "#D53F8C",
    600: "#B83280",
    700: "#97266D",
    800: "#702459",
    900: "#521B41"
  },
  linkedin: {
    50: "#E8F4F9",
    100: "#CFEDFB",
    200: "#9BDAF3",
    300: "#68C7EC",
    400: "#34B3E4",
    500: "#00A0DC",
    600: "#008CC9",
    700: "#0077B5",
    800: "#005E93",
    900: "#004471"
  },
  facebook: {
    50: "#E8F4F9",
    100: "#D9DEE9",
    200: "#B7C2DA",
    300: "#6482C0",
    400: "#4267B2",
    500: "#385898",
    600: "#314E89",
    700: "#29487D",
    800: "#223B67",
    900: "#1E355B"
  },
  messenger: {
    50: "#D0E6FF",
    100: "#B9DAFF",
    200: "#A2CDFF",
    300: "#7AB8FF",
    400: "#2E90FF",
    500: "#0078FF",
    600: "#0063D1",
    700: "#0052AC",
    800: "#003C7E",
    900: "#002C5C"
  },
  whatsapp: {
    50: "#dffeec",
    100: "#b9f5d0",
    200: "#90edb3",
    300: "#65e495",
    400: "#3cdd78",
    500: "#22c35e",
    600: "#179848",
    700: "#0c6c33",
    800: "#01421c",
    900: "#001803"
  },
  twitter: {
    50: "#E5F4FD",
    100: "#C8E9FB",
    200: "#A8DCFA",
    300: "#83CDF7",
    400: "#57BBF5",
    500: "#1DA1F2",
    600: "#1A94DA",
    700: "#1681BF",
    800: "#136B9E",
    900: "#0D4D71"
  },
  telegram: {
    50: "#E3F2F9",
    100: "#C5E4F3",
    200: "#A2D4EC",
    300: "#7AC1E4",
    400: "#47A9DA",
    500: "#0088CC",
    600: "#007AB8",
    700: "#006BA1",
    800: "#005885",
    900: "#003F5E"
  }
};

var radii = {
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px"
};

var shadows = {
  xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
  inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
  none: "none",
  "dark-lg": "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px"
};

var transitionProperty = {
  common: "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
  colors: "background-color, border-color, color, fill, stroke",
  dimensions: "width, height",
  position: "left, right, top, bottom",
  background: "background-color, background-image, background-position"
};
var transitionTimingFunction = {
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
};
var transitionDuration = {
  "ultra-fast": "50ms",
  faster: "100ms",
  fast: "150ms",
  normal: "200ms",
  slow: "300ms",
  slower: "400ms",
  "ultra-slow": "500ms"
};
var transition$1 = {
  property: transitionProperty,
  easing: transitionTimingFunction,
  duration: transitionDuration
};

var zIndices = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
};

var blur = {
  none: 0,
  sm: "4px",
  base: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "40px",
  "3xl": "64px"
};

function _extends$k() {
  _extends$k = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$k.apply(this, arguments);
}

var foundations = _extends$k({
  breakpoints: breakpoints$1,
  zIndices: zIndices,
  radii: radii,
  blur: blur,
  colors: colors
}, typography$1, {
  sizes: sizes,
  shadows: shadows,
  space: spacing,
  borders: borders,
  transition: transition$1
});

var styles = {
  global: function global(props) {
    return {
      body: {
        fontFamily: "body",
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("white", "gray.800")(props),
        transitionProperty: "background-color",
        transitionDuration: "normal",
        lineHeight: "base"
      },
      "*::placeholder": {
        color: mode("gray.400", "whiteAlpha.400")(props)
      },
      "*, *::before, &::after": {
        borderColor: mode("gray.200", "whiteAlpha.300")(props),
        wordWrap: "break-word"
      }
    };
  }
};

function _extends$l() {
  _extends$l = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$l.apply(this, arguments);
}
var direction = "ltr";
var config = {
  useSystemColorMode: false,
  initialColorMode: "light",
  cssVarPrefix: "chakra"
};
var theme = _extends$l({
  direction: direction
}, foundations, {
  components: components,
  styles: styles,
  config: config
});

var doc = {
  body: {
    classList: {
      add: function add() {},
      remove: function remove() {}
    }
  },
  addEventListener: function addEventListener() {},
  removeEventListener: function removeEventListener() {},
  activeElement: {
    blur: function blur() {},
    nodeName: ""
  },
  querySelector: function querySelector() {
    return null;
  },
  querySelectorAll: function querySelectorAll() {
    return [];
  },
  getElementById: function getElementById() {
    return null;
  },
  createEvent: function createEvent() {
    return {
      initEvent: function initEvent() {}
    };
  },
  createElement: function createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute: function setAttribute() {},
      getElementsByTagName: function getElementsByTagName() {
        return [];
      }
    };
  }
};
var ssrDocument = doc;

var noop$1 = function noop() {};

var win = {
  document: ssrDocument,
  navigator: {
    userAgent: ""
  },
  CustomEvent: function CustomEvent() {
    return this;
  },
  addEventListener: noop$1,
  removeEventListener: noop$1,
  getComputedStyle: function getComputedStyle() {
    return {
      getPropertyValue: function getPropertyValue() {
        return "";
      }
    };
  },
  matchMedia: function matchMedia() {
    return {
      matches: false,
      addListener: noop$1,
      removeListener: noop$1
    };
  },
  requestAnimationFrame: function requestAnimationFrame(callback) {
    if (typeof setTimeout === "undefined") {
      callback();
      return null;
    }

    return setTimeout(callback, 0);
  },
  cancelAnimationFrame: function cancelAnimationFrame(id) {
    if (typeof setTimeout === "undefined") return;
    clearTimeout(id);
  },
  setTimeout: function setTimeout() {
    return 0;
  },
  clearTimeout: noop$1,
  setInterval: function setInterval() {
    return 0;
  },
  clearInterval: noop$1
};
var ssrWindow = win;

function _slicedToArray$d(arr, i) { return _arrayWithHoles$d(arr) || _iterableToArrayLimit$d(arr, i) || _unsupportedIterableToArray$f(arr, i) || _nonIterableRest$d(); }

function _nonIterableRest$d() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$f(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$f(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$f(o, minLen); }

function _arrayLikeToArray$f(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$d(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$d(arr) { if (Array.isArray(arr)) return arr; }
var mockEnv = {
  window: ssrWindow,
  document: ssrDocument
};
var defaultEnv = isBrowser$1 ? {
  window: window,
  document: document
} : mockEnv;
var EnvironmentContext = /*#__PURE__*/react.createContext(defaultEnv);

function useEnvironment() {
  return react.useContext(EnvironmentContext);
}
function EnvironmentProvider(props) {
  var children = props.children,
      environmentProp = props.environment;

  var _useState = react.useState(null),
      _useState2 = _slicedToArray$d(_useState, 2),
      node = _useState2[0],
      setNode = _useState2[1];

  var context = react.useMemo(function () {
    var _ref;

    var doc = node == null ? void 0 : node.ownerDocument;
    var win = node == null ? void 0 : node.ownerDocument.defaultView;
    var nodeEnv = doc ? {
      document: doc,
      window: win
    } : undefined;
    var env = (_ref = environmentProp != null ? environmentProp : nodeEnv) != null ? _ref : defaultEnv;
    return env;
  }, [node, environmentProp]);
  var showEnvGetter = !node && !environmentProp;
  return /*#__PURE__*/react.createElement(EnvironmentContext.Provider, {
    value: context
  }, children, showEnvGetter && /*#__PURE__*/react.createElement("span", {
    ref: function ref(el) {
      if (el) setNode(el);
    }
  }));
}

/**
 * The global provider that must be added to make all Chakra components
 * work correctly
 */

var ChakraProvider = function ChakraProvider(props) {
  var children = props.children,
      colorModeManager = props.colorModeManager,
      portalZIndex = props.portalZIndex,
      _props$resetCSS = props.resetCSS,
      resetCSS = _props$resetCSS === void 0 ? true : _props$resetCSS,
      _props$theme = props.theme,
      theme$1 = _props$theme === void 0 ? theme : _props$theme,
      environment = props.environment,
      cssVarsRoot = props.cssVarsRoot;

  var _children = /*#__PURE__*/react.createElement(EnvironmentProvider, {
    environment: environment
  }, children);

  return /*#__PURE__*/react.createElement(IdProvider, null, /*#__PURE__*/react.createElement(ThemeProvider$1, {
    theme: theme$1,
    cssVarsRoot: cssVarsRoot
  }, /*#__PURE__*/react.createElement(ColorModeProvider, {
    colorModeManager: colorModeManager,
    options: theme$1.config
  }, resetCSS && /*#__PURE__*/react.createElement(CSSReset, null), /*#__PURE__*/react.createElement(GlobalStyle, null), portalZIndex ? /*#__PURE__*/react.createElement(PortalManager, {
    zIndex: portalZIndex
  }, _children) : _children)));
};

function _extends$m() {
  _extends$m = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$m.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$4(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
var fallbackIcon = {
  path: /*#__PURE__*/react.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/react.createElement("path", {
    strokeLinecap: "round",
    fill: "none",
    d: "M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
  }), /*#__PURE__*/react.createElement("path", {
    fill: "currentColor",
    strokeLinecap: "round",
    d: "M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
  }), /*#__PURE__*/react.createElement("circle", {
    fill: "none",
    strokeMiterlimit: "10",
    cx: "12",
    cy: "12",
    r: "11.25"
  })),
  viewBox: "0 0 24 24"
};
var Icon = /*#__PURE__*/forwardRef(function (props, ref) {
  var element = props.as,
      viewBox = props.viewBox,
      _props$color = props.color,
      color = _props$color === void 0 ? "currentColor" : _props$color,
      _props$focusable = props.focusable,
      focusable = _props$focusable === void 0 ? false : _props$focusable,
      children = props.children,
      className = props.className,
      __css = props.__css,
      rest = _objectWithoutPropertiesLoose$4(props, ["as", "viewBox", "color", "focusable", "children", "className", "__css"]);

  var _className = cx("chakra-icon", className);

  var styles = _extends$m({
    w: "1em",
    h: "1em",
    display: "inline-block",
    lineHeight: "1em",
    flexShrink: 0,
    color: color
  }, __css);

  var shared = {
    ref: ref,
    focusable: focusable,
    className: _className,
    __css: styles
  };

  var _viewBox = viewBox != null ? viewBox : fallbackIcon.viewBox;
  /**
   * If you're using an icon library like `react-icons`.
   * Note: anyone passing the `as` prop, should manage the `viewBox` from the external component
   */


  if (element && typeof element !== "string") {
    return /*#__PURE__*/react.createElement(chakra.svg, _extends$m({
      as: element
    }, shared, rest));
  }

  var _path = children != null ? children : fallbackIcon.path;

  return /*#__PURE__*/react.createElement(chakra.svg, _extends$m({
    verticalAlign: "middle",
    viewBox: _viewBox
  }, shared, rest), _path);
});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    }
  };

  return _extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

  _extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _assign = function __assign() {
  _assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return _assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || from);
}

var createDefinition = function createDefinition(propNames) {
  return {
    isEnabled: function isEnabled(props) {
      return propNames.some(function (name) {
        return !!props[name];
      });
    }
  };
};

var featureDefinitions = {
  measureLayout: createDefinition(["layout", "layoutId", "drag", "_layoutResetTransform"]),
  animation: createDefinition(["animate", "exit", "variants", "whileHover", "whileTap", "whileFocus", "whileDrag"]),
  exit: createDefinition(["exit"]),
  drag: createDefinition(["drag", "dragControls"]),
  focus: createDefinition(["whileFocus"]),
  hover: createDefinition(["whileHover", "onHoverStart", "onHoverEnd"]),
  tap: createDefinition(["whileTap", "onTap", "onTapStart", "onTapCancel"]),
  pan: createDefinition(["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"]),
  layoutAnimation: createDefinition(["layout", "layoutId"])
};

function loadFeatures(features) {
  for (var key in features) {
    var Component = features[key];
    if (Component !== null) featureDefinitions[key].Component = Component;
  }
}

var invariant = function invariant() {};

var LazyContext = /*#__PURE__*/react.createContext({
  strict: false
});

var featureNames = Object.keys(featureDefinitions);
var numFeatures = featureNames.length;
/**
 * Load features via renderless components based on the provided MotionProps.
 */

function useFeatures(props, visualElement, preloadedFeatures) {
  var features = [];
  var lazyContext = react.useContext(LazyContext);
  if (!visualElement) return null;

  for (var i = 0; i < numFeatures; i++) {
    var name_1 = featureNames[i];
    var _a = featureDefinitions[name_1],
        isEnabled = _a.isEnabled,
        Component = _a.Component;
    /**
     * It might be possible in the future to use this moment to
     * dynamically request functionality. In initial tests this
     * was producing a lot of duplication amongst bundles.
     */

    if (isEnabled(props) && Component) {
      features.push( /*#__PURE__*/react.createElement(Component, _assign({
        key: name_1
      }, props, {
        visualElement: visualElement
      })));
    }
  }

  return features;
}

/**
 * @public
 */

var MotionConfigContext = /*#__PURE__*/react.createContext({
  transformPagePoint: function transformPagePoint(p) {
    return p;
  },
  isStatic: false
});

var MotionContext = /*#__PURE__*/react.createContext({});

function useVisualElementContext() {
  return react.useContext(MotionContext).visualElement;
}

/**
 * @public
 */

var PresenceContext = /*#__PURE__*/react.createContext(null);

/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
 * you can ensure that initialisers don't execute twice or more.
 */

function useConstant(init) {
  var ref = react.useRef(null);

  if (ref.current === null) {
    ref.current = init();
  }

  return ref.current;
}

/**
 * When a component is the child of `AnimatePresence`, it can use `usePresence`
 * to access information about whether it's still present in the React tree.
 *
 * ```jsx
 * import { usePresence } from "framer-motion"
 *
 * export const Component = () => {
 *   const [isPresent, safeToRemove] = usePresence()
 *
 *   useEffect(() => {
 *     !isPresent && setTimeout(safeToRemove, 1000)
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * If `isPresent` is `false`, it means that a component has been removed the tree, but
 * `AnimatePresence` won't really remove it until `safeToRemove` has been called.
 *
 * @public
 */

function usePresence() {
  var context = react.useContext(PresenceContext);
  if (context === null) return [true, null];
  var isPresent = context.isPresent,
      onExitComplete = context.onExitComplete,
      register = context.register; // It's safe to call the following hooks conditionally (after an early return) because the context will always
  // either be null or non-null for the lifespan of the component.
  // Replace with useOpaqueId when released in React

  var id = useUniqueId();
  react.useEffect(function () {
    return register(id);
  }, []);

  var safeToRemove = function safeToRemove() {
    return onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete(id);
  };

  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
/**
 * Similar to `usePresence`, except `useIsPresent` simply returns whether or not the component is present.
 * There is no `safeToRemove` function.
 *
 * ```jsx
 * import { useIsPresent } from "framer-motion"
 *
 * export const Component = () => {
 *   const isPresent = useIsPresent()
 *
 *   useEffect(() => {
 *     !isPresent && console.log("I've been removed!")
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * @public
 */


function useIsPresent() {
  return isPresent(react.useContext(PresenceContext));
}

function isPresent(context) {
  return context === null ? true : context.isPresent;
}

var counter = 0;

var incrementId = function incrementId() {
  return counter++;
};

var useUniqueId = function useUniqueId() {
  return useConstant(incrementId);
};

/**
 * @internal
 */

var LayoutGroupContext = /*#__PURE__*/react.createContext(null);

var isBrowser$2 = typeof window !== "undefined";

var useIsomorphicLayoutEffect = isBrowser$2 ? react.useLayoutEffect : react.useEffect;

function useLayoutId(_a) {
  var layoutId = _a.layoutId;
  var layoutGroupId = react.useContext(LayoutGroupContext);
  return layoutGroupId && layoutId !== undefined ? layoutGroupId + "-" + layoutId : layoutId;
}

function useVisualElement(Component, visualState, props, createVisualElement) {
  var config = react.useContext(MotionConfigContext);
  var lazyContext = react.useContext(LazyContext);
  var parent = useVisualElementContext();
  var presenceContext = react.useContext(PresenceContext);
  var layoutId = useLayoutId(props);
  var visualElementRef = react.useRef(undefined);
  /**
   * If we haven't preloaded a renderer, check to see if we have one lazy-loaded
   */

  if (!createVisualElement) createVisualElement = lazyContext.renderer;

  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component, {
      visualState: visualState,
      parent: parent,
      props: _assign(_assign({}, props), {
        layoutId: layoutId
      }),
      presenceId: presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id,
      blockInitialAnimation: (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false
    });
  }

  var visualElement = visualElementRef.current;
  useIsomorphicLayoutEffect(function () {
    if (!visualElement) return;
    visualElement.setProps(_assign(_assign(_assign({}, config), props), {
      layoutId: layoutId
    }));
    visualElement.isPresent = isPresent(presenceContext);
    visualElement.isPresenceRoot = !parent || parent.presenceId !== (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id);
    /**
     * Fire a render to ensure the latest state is reflected on-screen.
     */

    visualElement.syncRender();
  });
  react.useEffect(function () {
    var _a;

    if (!visualElement) return;
    /**
     * In a future refactor we can replace the features-as-components and
     * have this loop through them all firing "effect" listeners
     */

    (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.animateChanges();
  });
  useIsomorphicLayoutEffect(function () {
    return function () {
      return visualElement === null || visualElement === void 0 ? void 0 : visualElement.notifyUnmount();
    };
  }, []);
  return visualElement;
}

function _typeof$5(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$5 = function _typeof(obj) { return typeof obj; }; } else { _typeof$5 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$5(obj); }

function isRefObject(ref) {
  return _typeof$5(ref) === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}

/**
 * Creates a ref function that, when called, hydrates the provided
 * external ref and VisualElement.
 */

function useMotionRef(visualState, visualElement, externalRef) {
  return react.useCallback(function (instance) {
    var _a;

    instance && ((_a = visualState.mount) === null || _a === void 0 ? void 0 : _a.call(visualState, instance));

    if (visualElement) {
      instance ? visualElement.mount(instance) : visualElement.unmount();
    }

    if (externalRef) {
      if (typeof externalRef === "function") {
        externalRef(instance);
      } else if (isRefObject(externalRef)) {
        externalRef.current = instance;
      }
    }
  },
  /**
   * Only pass a new ref callback to React if we've received a visual element
   * factory. Otherwise we'll be mounting/remounting every time externalRef
   * or other dependencies change.
   */
  [visualElement]);
}

/**
 * Decides if the supplied variable is an array of variant labels
 */
function isVariantLabels(v) {
  return Array.isArray(v);
}
/**
 * Decides if the supplied variable is variant label
 */


function isVariantLabel(v) {
  return typeof v === "string" || isVariantLabels(v);
}
/**
 * Creates an object containing the latest state of every MotionValue on a VisualElement
 */


function getCurrent(visualElement) {
  var current = {};
  visualElement.forEachValue(function (value, key) {
    return current[key] = value.get();
  });
  return current;
}
/**
 * Creates an object containing the latest velocity of every MotionValue on a VisualElement
 */


function getVelocity(visualElement) {
  var velocity = {};
  visualElement.forEachValue(function (value, key) {
    return velocity[key] = value.getVelocity();
  });
  return velocity;
}

function resolveVariantFromProps(props, definition, custom, currentValues, currentVelocity) {
  var _a;

  if (currentValues === void 0) {
    currentValues = {};
  }

  if (currentVelocity === void 0) {
    currentVelocity = {};
  }

  if (typeof definition === "string") {
    definition = (_a = props.variants) === null || _a === void 0 ? void 0 : _a[definition];
  }

  return typeof definition === "function" ? definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity) : definition;
}

function resolveVariant(visualElement, definition, custom) {
  var props = visualElement.getProps();
  return resolveVariantFromProps(props, definition, custom !== null && custom !== void 0 ? custom : props.custom, getCurrent(visualElement), getVelocity(visualElement));
}

function checkIfControllingVariants(props) {
  var _a;

  return typeof ((_a = props.animate) === null || _a === void 0 ? void 0 : _a.start) === "function" || isVariantLabel(props.initial) || isVariantLabel(props.animate) || isVariantLabel(props.whileHover) || isVariantLabel(props.whileDrag) || isVariantLabel(props.whileTap) || isVariantLabel(props.whileFocus) || isVariantLabel(props.exit);
}

function checkIfVariantNode(props) {
  return Boolean(checkIfControllingVariants(props) || props.variants);
}

function getCurrentTreeVariants(props, context) {
  if (checkIfControllingVariants(props)) {
    var initial = props.initial,
        animate = props.animate;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : undefined,
      animate: isVariantLabel(animate) ? animate : undefined
    };
  }

  return props.inherit !== false ? context : {};
}

function useCreateMotionContext(props, isStatic) {
  var _a = getCurrentTreeVariants(props, react.useContext(MotionContext)),
      initial = _a.initial,
      animate = _a.animate;

  return react.useMemo(function () {
    return {
      initial: initial,
      animate: animate
    };
  },
  /**
   * Only break memoisation in static mode
   */
  isStatic ? [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)] : []);
}

function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}

/**
 * Create a `motion` component.
 *
 * This function accepts a Component argument, which can be either a string (ie "div"
 * for `motion.div`), or an actual React component.
 *
 * Alongside this is a config option which provides a way of rendering the provided
 * component "offline", or outside the React render cycle.
 *
 * @internal
 */

function createMotionComponent(_a) {
  var preloadedFeatures = _a.preloadedFeatures,
      createVisualElement = _a.createVisualElement,
      useRender = _a.useRender,
      useVisualState = _a.useVisualState,
      Component = _a.Component;
  preloadedFeatures && loadFeatures(preloadedFeatures);

  function MotionComponent(props, externalRef) {
    /**
     * If we're rendering in a static environment, we only visually update the component
     * as a result of a React-rerender rather than interactions or animations. This
     * means we don't need to load additional memory structures like VisualElement,
     * or any gesture/animation features.
     */
    var isStatic = react.useContext(MotionConfigContext).isStatic;
    var features = null;
    /**
     * Create the tree context. This is memoized and will only trigger renders
     * when the current tree variant changes in static mode.
     */

    var context = useCreateMotionContext(props, isStatic);
    /**
     *
     */

    var visualState = useVisualState(props, isStatic);

    if (!isStatic && isBrowser$2) {
      /**
       * Create a VisualElement for this component. A VisualElement provides a common
       * interface to renderer-specific APIs (ie DOM/Three.js etc) as well as
       * providing a way of rendering to these APIs outside of the React render loop
       * for more performant animations and interactions
       */
      context.visualElement = useVisualElement(Component, visualState, props, createVisualElement);
      /**
       * Load Motion gesture and animation features. These are rendered as renderless
       * components so each feature can optionally make use of React lifecycle methods.
       *
       * TODO: The intention is to move these away from a React-centric to a
       * VisualElement-centric lifecycle scheme.
       */

      features = useFeatures(props, context.visualElement);
    }
    /**
     * The mount order and hierarchy is specific to ensure our element ref
     * is hydrated by the time features fire their effects.
     */


    return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(MotionContext.Provider, {
      value: context
    }, useRender(Component, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic)), features);
  }

  return /*#__PURE__*/react.forwardRef(MotionComponent);
}

/**
 * Convert any React component into a `motion` component. The provided component
 * **must** use `React.forwardRef` to the underlying DOM component you want to animate.
 *
 * ```jsx
 * const Component = React.forwardRef((props, ref) => {
 *   return <div ref={ref} />
 * })
 *
 * const MotionComponent = motion(Component)
 * ```
 *
 * @public
 */

function createMotionProxy(createConfig) {
  function custom(Component, customMotionComponentConfig) {
    if (customMotionComponentConfig === void 0) {
      customMotionComponentConfig = {};
    }

    return createMotionComponent(createConfig(Component, customMotionComponentConfig));
  }
  /**
   * A cache of generated `motion` components, e.g `motion.div`, `motion.input` etc.
   * Rather than generating them anew every render.
   */


  var componentCache = new Map();
  return new Proxy(custom, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: function get(_target, key) {
      /**
       * If this element doesn't exist in the component cache, create it and cache.
       */
      if (!componentCache.has(key)) {
        componentCache.set(key, custom(key));
      }

      return componentCache.get(key);
    }
  });
}

/**
 * We keep these listed seperately as we use the lowercase tag names as part
 * of the runtime bundle to detect SVG components
 */
var lowercaseSVGElements = ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "svg", "switch", "symbol", "text", "tspan", "use", "view"];

function isSVGComponent(Component) {
  if (
  /**
   * If it's not a string, it's a custom React component. Currently we only support
   * HTML custom React components.
   */
  typeof Component !== "string" ||
  /**
   * If it contains a dash, the element is a custom HTML webcomponent.
   */
  Component.includes("-")) {
    return false;
  } else if (
  /**
   * If it's in our list of lowercase SVG tags, it's an SVG component
   */
  lowercaseSVGElements.indexOf(Component) > -1 ||
  /**
   * If it contains a capital letter, it's an SVG component
   */
  /[A-Z]/.test(Component)) {
    return true;
  }

  return false;
}

var valueScaleCorrection = {};
/**
 * @internal
 */

function addScaleCorrection(correctors) {
  for (var key in correctors) {
    valueScaleCorrection[key] = correctors[key];
  }
}

/**
 * A list of all transformable axes. We'll use this list to generated a version
 * of each axes for each transform.
 */
var transformAxes = ["", "X", "Y", "Z"];
/**
 * An ordered array of each transformable value. By default, transform values
 * will be sorted to this order.
 */

var order = ["translate", "scale", "rotate", "skew"];
/**
 * Generate a list of every possible transform key.
 */

var transformProps = ["transformPerspective", "x", "y", "z"];
order.forEach(function (operationKey) {
  return transformAxes.forEach(function (axesKey) {
    return transformProps.push(operationKey + axesKey);
  });
});
/**
 * A function to use with Array.sort to sort transform keys by their default order.
 */

function sortTransformProps(a, b) {
  return transformProps.indexOf(a) - transformProps.indexOf(b);
}
/**
 * A quick lookup for transform props.
 */


var transformPropSet = new Set(transformProps);

function isTransformProp(key) {
  return transformPropSet.has(key);
}
/**
 * A quick lookup for transform origin props
 */


var transformOriginProps = new Set(["originX", "originY", "originZ"]);

function isTransformOriginProp(key) {
  return transformOriginProps.has(key);
}

function isForcedMotionValue(key, _a) {
  var layout = _a.layout,
      layoutId = _a.layoutId;
  return isTransformProp(key) || isTransformOriginProp(key) || (layout || layoutId !== undefined) && (!!valueScaleCorrection[key] || key === "opacity");
}

function _typeof$6(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$6 = function _typeof(obj) { return typeof obj; }; } else { _typeof$6 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$6(obj); }

var isMotionValue = function isMotionValue(value) {
  return value !== null && _typeof$6(value) === "object" && value.getVelocity;
};

var translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
/**
 * Build a CSS transform style from individual x/y/scale etc properties.
 *
 * This outputs with a default order of transforms/scales/rotations, this can be customised by
 * providing a transformTemplate function.
 */

function buildTransform(_a, _b, transformIsDefault, transformTemplate) {
  var transform = _a.transform,
      transformKeys = _a.transformKeys;
  var _c = _b.enableHardwareAcceleration,
      enableHardwareAcceleration = _c === void 0 ? true : _c,
      _d = _b.allowTransformNone,
      allowTransformNone = _d === void 0 ? true : _d; // The transform string we're going to build into.

  var transformString = ""; // Transform keys into their default order - this will determine the output order.

  transformKeys.sort(sortTransformProps); // Track whether the defined transform has a defined z so we don't add a
  // second to enable hardware acceleration

  var transformHasZ = false; // Loop over each transform and build them into transformString

  var numTransformKeys = transformKeys.length;

  for (var i = 0; i < numTransformKeys; i++) {
    var key = transformKeys[i];
    transformString += (translateAlias[key] || key) + "(" + transform[key] + ") ";
    if (key === "z") transformHasZ = true;
  }

  if (!transformHasZ && enableHardwareAcceleration) {
    transformString += "translateZ(0)";
  } else {
    transformString = transformString.trim();
  } // If we have a custom `transform` template, pass our transform values and
  // generated transformString to that before returning


  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (allowTransformNone && transformIsDefault) {
    transformString = "none";
  }

  return transformString;
}
/**
 * Build a transformOrigin style. Uses the same defaults as the browser for
 * undefined origins.
 */


function buildTransformOrigin(_a) {
  var _b = _a.originX,
      originX = _b === void 0 ? "50%" : _b,
      _c = _a.originY,
      originY = _c === void 0 ? "50%" : _c,
      _d = _a.originZ,
      originZ = _d === void 0 ? 0 : _d;
  return originX + " " + originY + " " + originZ;
}

/**
 * Returns true if the provided key is a CSS variable
 */
function isCSSVariable(key) {
  return key.startsWith("--");
}

/**
 * Provided a value and a ValueType, returns the value as that value type.
 */
var getValueAsType = function getValueAsType(value, type) {
  return type && typeof value === "number" ? type.transform(value) : value;
};

var clamp = function clamp(min, max) {
  return function (v) {
    return Math.max(Math.min(v, max), min);
  };
};

var sanitize = function sanitize(v) {
  return v % 1 ? Number(v.toFixed(5)) : v;
};

var floatRegex = /(-)?([\d]*\.?[\d])+/g;
var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;

function isString$1(v) {
  return typeof v === 'string';
}

var number = {
  test: function test(v) {
    return typeof v === 'number';
  },
  parse: parseFloat,
  transform: function transform(v) {
    return v;
  }
};

var alpha = _assign(_assign({}, number), {
  transform: clamp(0, 1)
});

var scale = _assign(_assign({}, number), {
  "default": 1
});

var createUnitType = function createUnitType(unit) {
  return {
    test: function test(v) {
      return isString$1(v) && v.endsWith(unit) && v.split(' ').length === 1;
    },
    parse: parseFloat,
    transform: function transform(v) {
      return "" + v + unit;
    }
  };
};

var degrees = createUnitType('deg');
var percent = createUnitType('%');
var px$1 = createUnitType('px');
var vh = createUnitType('vh');
var vw = createUnitType('vw');

var progressPercentage = _assign(_assign({}, percent), {
  parse: function parse(v) {
    return percent.parse(v) / 100;
  },
  transform: function transform(v) {
    return percent.transform(v * 100);
  }
});

var isColorString = function isColorString(type, testProp) {
  return function (v) {
    return Boolean(isString$1(v) && singleColorRegex.test(v) && v.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v, testProp));
  };
};

var splitColor = function splitColor(aName, bName, cName) {
  return function (v) {
    var _a;

    if (!isString$1(v)) return v;

    var _b = v.match(floatRegex),
        a = _b[0],
        b = _b[1],
        c = _b[2],
        alpha = _b[3];

    return _a = {}, _a[aName] = parseFloat(a), _a[bName] = parseFloat(b), _a[cName] = parseFloat(c), _a.alpha = alpha !== undefined ? parseFloat(alpha) : 1, _a;
  };
};

var hsla = {
  test: isColorString('hsl', 'hue'),
  parse: splitColor('hue', 'saturation', 'lightness'),
  transform: function transform(_a) {
    var hue = _a.hue,
        saturation = _a.saturation,
        lightness = _a.lightness,
        _b = _a.alpha,
        alpha$1 = _b === void 0 ? 1 : _b;
    return 'hsla(' + Math.round(hue) + ', ' + percent.transform(sanitize(saturation)) + ', ' + percent.transform(sanitize(lightness)) + ', ' + sanitize(alpha.transform(alpha$1)) + ')';
  }
};

var clampRgbUnit = clamp(0, 255);

var rgbUnit = _assign(_assign({}, number), {
  transform: function transform(v) {
    return Math.round(clampRgbUnit(v));
  }
});

var rgba = {
  test: isColorString('rgb', 'red'),
  parse: splitColor('red', 'green', 'blue'),
  transform: function transform(_a) {
    var red = _a.red,
        green = _a.green,
        blue = _a.blue,
        _b = _a.alpha,
        alpha$1 = _b === void 0 ? 1 : _b;
    return 'rgba(' + rgbUnit.transform(red) + ', ' + rgbUnit.transform(green) + ', ' + rgbUnit.transform(blue) + ', ' + sanitize(alpha.transform(alpha$1)) + ')';
  }
};

function parseHex(v) {
  var r = '';
  var g = '';
  var b = '';
  var a = '';

  if (v.length > 5) {
    r = v.substr(1, 2);
    g = v.substr(3, 2);
    b = v.substr(5, 2);
    a = v.substr(7, 2);
  } else {
    r = v.substr(1, 1);
    g = v.substr(2, 1);
    b = v.substr(3, 1);
    a = v.substr(4, 1);
    r += r;
    g += g;
    b += b;
    a += a;
  }

  return {
    red: parseInt(r, 16),
    green: parseInt(g, 16),
    blue: parseInt(b, 16),
    alpha: a ? parseInt(a, 16) / 255 : 1
  };
}

var hex = {
  test: isColorString('#'),
  parse: parseHex,
  transform: rgba.transform
};

var color$1 = {
  test: function test(v) {
    return rgba.test(v) || hex.test(v) || hsla.test(v);
  },
  parse: function parse(v) {
    if (rgba.test(v)) {
      return rgba.parse(v);
    } else if (hsla.test(v)) {
      return hsla.parse(v);
    } else {
      return hex.parse(v);
    }
  },
  transform: function transform(v) {
    return isString$1(v) ? v : v.hasOwnProperty('red') ? rgba.transform(v) : hsla.transform(v);
  }
};

var colorToken = '${c}';
var numberToken = '${n}';

function test(v) {
  var _a, _b, _c, _d;

  return isNaN(v) && isString$1(v) && ((_b = (_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0;
}

function analyse(v) {
  var values = [];
  var numColors = 0;
  var colors = v.match(colorRegex);

  if (colors) {
    numColors = colors.length;
    v = v.replace(colorRegex, colorToken);
    values.push.apply(values, colors.map(color$1.parse));
  }

  var numbers = v.match(floatRegex);

  if (numbers) {
    v = v.replace(floatRegex, numberToken);
    values.push.apply(values, numbers.map(number.parse));
  }

  return {
    values: values,
    numColors: numColors,
    tokenised: v
  };
}

function parse(v) {
  return analyse(v).values;
}

function createTransformer(v) {
  var _a = analyse(v),
      values = _a.values,
      numColors = _a.numColors,
      tokenised = _a.tokenised;

  var numValues = values.length;
  return function (v) {
    var output = tokenised;

    for (var i = 0; i < numValues; i++) {
      output = output.replace(i < numColors ? colorToken : numberToken, i < numColors ? color$1.transform(v[i]) : sanitize(v[i]));
    }

    return output;
  };
}

var convertNumbersToZero = function convertNumbersToZero(v) {
  return typeof v === 'number' ? 0 : v;
};

function getAnimatableNone(v) {
  var parsed = parse(v);
  var transformer = createTransformer(v);
  return transformer(parsed.map(convertNumbersToZero));
}

var complex = {
  test: test,
  parse: parse,
  createTransformer: createTransformer,
  getAnimatableNone: getAnimatableNone
};

var maxDefaults = new Set(['brightness', 'contrast', 'saturate', 'opacity']);

function applyDefaultFilter(v) {
  var _a = v.slice(0, -1).split('('),
      name = _a[0],
      value = _a[1];

  if (name === 'drop-shadow') return v;
  var number = (value.match(floatRegex) || [])[0];
  if (!number) return v;
  var unit = value.replace(number, '');
  var defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number !== value) defaultValue *= 100;
  return name + '(' + defaultValue + unit + ')';
}

var functionRegex = /([a-z-]*)\(.*?\)/g;

var filter$1 = _assign(_assign({}, complex), {
  getAnimatableNone: function getAnimatableNone(v) {
    var functions = v.match(functionRegex);
    return functions ? functions.map(applyDefaultFilter).join(' ') : v;
  }
});

var _int = _assign(_assign({}, number), {
  transform: Math.round
});

var numberValueTypes = {
  // Border props
  borderWidth: px$1,
  borderTopWidth: px$1,
  borderRightWidth: px$1,
  borderBottomWidth: px$1,
  borderLeftWidth: px$1,
  borderRadius: px$1,
  radius: px$1,
  borderTopLeftRadius: px$1,
  borderTopRightRadius: px$1,
  borderBottomRightRadius: px$1,
  borderBottomLeftRadius: px$1,
  // Positioning props
  width: px$1,
  maxWidth: px$1,
  height: px$1,
  maxHeight: px$1,
  size: px$1,
  top: px$1,
  right: px$1,
  bottom: px$1,
  left: px$1,
  // Spacing props
  padding: px$1,
  paddingTop: px$1,
  paddingRight: px$1,
  paddingBottom: px$1,
  paddingLeft: px$1,
  margin: px$1,
  marginTop: px$1,
  marginRight: px$1,
  marginBottom: px$1,
  marginLeft: px$1,
  // Transform props
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale: scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px$1,
  translateX: px$1,
  translateY: px$1,
  translateZ: px$1,
  x: px$1,
  y: px$1,
  z: px$1,
  perspective: px$1,
  transformPerspective: px$1,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px$1,
  // Misc
  zIndex: _int,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: _int
};

function buildHTMLStyles(state, latestValues, projection, layoutState, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
  var _a;

  var style = state.style,
      vars = state.vars,
      transform = state.transform,
      transformKeys = state.transformKeys,
      transformOrigin = state.transformOrigin; // Empty the transformKeys array. As we're throwing out refs to its items
  // this might not be as cheap as suspected. Maybe using the array as a buffer
  // with a manual incrementation would be better.

  transformKeys.length = 0; // Track whether we encounter any transform or transformOrigin values.

  var hasTransform = false;
  var hasTransformOrigin = false; // Does the calculated transform essentially equal "none"?

  var transformIsNone = true;
  /**
   * Loop over all our latest animated values and decide whether to handle them
   * as a style or CSS variable.
   *
   * Transforms and transform origins are kept seperately for further processing.
   */

  for (var key in latestValues) {
    var value = latestValues[key];
    /**
     * If this is a CSS variable we don't do any further processing.
     */

    if (isCSSVariable(key)) {
      vars[key] = value;
      continue;
    } // Convert the value to its default value type, ie 0 -> "0px"


    var valueType = numberValueTypes[key];
    var valueAsType = getValueAsType(value, valueType);

    if (isTransformProp(key)) {
      // If this is a transform, flag to enable further transform processing
      hasTransform = true;
      transform[key] = valueAsType;
      transformKeys.push(key); // If we already know we have a non-default transform, early return

      if (!transformIsNone) continue; // Otherwise check to see if this is a default transform

      if (value !== ((_a = valueType["default"]) !== null && _a !== void 0 ? _a : 0)) transformIsNone = false;
    } else if (isTransformOriginProp(key)) {
      transformOrigin[key] = valueAsType; // If this is a transform origin, flag and enable further transform-origin processing

      hasTransformOrigin = true;
    } else {
      /**
       * If layout projection is on, and we need to perform scale correction for this
       * value type, perform it.
       */
      if ((projection === null || projection === void 0 ? void 0 : projection.isHydrated) && (layoutState === null || layoutState === void 0 ? void 0 : layoutState.isHydrated) && valueScaleCorrection[key]) {
        var correctedValue = valueScaleCorrection[key].process(value, layoutState, projection);
        /**
         * Scale-correctable values can define a number of other values to break
         * down into. For instance borderRadius needs applying to borderBottomLeftRadius etc
         */

        var applyTo = valueScaleCorrection[key].applyTo;

        if (applyTo) {
          var num = applyTo.length;

          for (var i = 0; i < num; i++) {
            style[applyTo[i]] = correctedValue;
          }
        } else {
          style[key] = correctedValue;
        }
      } else {
        style[key] = valueAsType;
      }
    }
  }

  if (layoutState && projection && buildProjectionTransform && buildProjectionTransformOrigin) {
    style.transform = buildProjectionTransform(layoutState.deltaFinal, layoutState.treeScale, hasTransform ? transform : undefined);

    if (transformTemplate) {
      style.transform = transformTemplate(transform, style.transform);
    }

    style.transformOrigin = buildProjectionTransformOrigin(layoutState);
  } else {
    if (hasTransform) {
      style.transform = buildTransform(state, options, transformIsNone, transformTemplate);
    }

    if (hasTransformOrigin) {
      style.transformOrigin = buildTransformOrigin(transformOrigin);
    }
  }
}

var createHtmlRenderState = function createHtmlRenderState() {
  return {
    style: {},
    transform: {},
    transformKeys: [],
    transformOrigin: {},
    vars: {}
  };
};

function copyRawValuesOnly(target, source, props) {
  for (var key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}

function useInitialMotionValues(_a, visualState, isStatic) {
  var transformTemplate = _a.transformTemplate;
  return react.useMemo(function () {
    var state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, undefined, undefined, {
      enableHardwareAcceleration: !isStatic
    }, transformTemplate);
    var vars = state.vars,
        style = state.style;
    return _assign(_assign({}, vars), style);
  }, [visualState]);
}

function useStyle(props, visualState, isStatic) {
  var styleProp = props.style || {};
  var style = {};
  /**
   * Copy non-Motion Values straight into style
   */

  copyRawValuesOnly(style, styleProp, props);
  Object.assign(style, useInitialMotionValues(props, visualState, isStatic));

  if (props.transformValues) {
    style = props.transformValues(style);
  }

  return style;
}

function useHTMLProps(props, visualState, isStatic) {
  // The `any` isn't ideal but it is the type of createElement props argument
  var htmlProps = {};
  var style = useStyle(props, visualState, isStatic);

  if (Boolean(props.drag)) {
    // Disable the ghost element when a user drags
    htmlProps.draggable = false; // Disable text selection

    style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none"; // Disable scrolling on the draggable direction

    style.touchAction = props.drag === true ? "none" : "pan-" + (props.drag === "x" ? "y" : "x");
  }

  htmlProps.style = style;
  return htmlProps;
}

/**
 * A list of all valid MotionProps.
 *
 * @internalremarks
 * This doesn't throw if a `MotionProp` name is missing - it should.
 */
var validMotionProps = new Set(["initial", "animate", "exit", "style", "variants", "transition", "transformTemplate", "transformValues", "custom", "inherit", "layout", "layoutId", "_layoutResetTransform", "onLayoutAnimationComplete", "onViewportBoxUpdate", "onLayoutMeasure", "onBeforeLayoutMeasure", "onAnimationStart", "onAnimationComplete", "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock", "onDragTransitionEnd", "drag", "dragControls", "dragListener", "dragConstraints", "dragDirectionLock", "_dragX", "_dragY", "dragElastic", "dragMomentum", "dragPropagation", "dragTransition", "whileDrag", "onPan", "onPanStart", "onPanEnd", "onPanSessionStart", "onTap", "onTapStart", "onTapCancel", "onHoverStart", "onHoverEnd", "whileFocus", "whileTap", "whileHover"]);
/**
 * Check whether a prop name is a valid `MotionProp` key.
 *
 * @param key - Name of the property to check
 * @returns `true` is key is a valid `MotionProp`.
 *
 * @public
 */

function isValidMotionProp(key) {
  return validMotionProps.has(key);
}

var shouldForward = function shouldForward(key) {
  return !isValidMotionProp(key);
};
/**
 * Emotion and Styled Components both allow users to pass through arbitrary props to their components
 * to dynamically generate CSS. They both use the `@emotion/is-prop-valid` package to determine which
 * of these should be passed to the underlying DOM node.
 *
 * However, when styling a Motion component `styled(motion.div)`, both packages pass through *all* props
 * as it's seen as an arbitrary component rather than a DOM node. Motion only allows arbitrary props
 * passed through the `custom` prop so it doesn't *need* the payload or computational overhead of
 * `@emotion/is-prop-valid`, however to fix this problem we need to use it.
 *
 * By making it an optionalDependency we can offer this functionality only in the situations where it's
 * actually required.
 */


try {
  var emotionIsPropValid_1 = require("@emotion/is-prop-valid")["default"];

  shouldForward = function shouldForward(key) {
    // Handle events explicitly as Emotion validates them all as true
    if (key.startsWith("on")) {
      return !isValidMotionProp(key);
    } else {
      return emotionIsPropValid_1(key);
    }
  };
} catch (_a) {// We don't need to actually do anything here - the fallback is the existing `isPropValid`.
}

function filterProps(props, isDom, forwardMotionProps) {
  var filteredProps = {};

  for (var key in props) {
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key)) {
      filteredProps[key] = props[key];
    }
  }

  return filteredProps;
}

function calcOrigin(origin, offset, size) {
  return typeof origin === "string" ? origin : px$1.transform(offset + size * origin);
}
/**
 * The SVG transform origin defaults are different to CSS and is less intuitive,
 * so we use the measured dimensions of the SVG to reconcile these.
 */


function calcSVGTransformOrigin(dimensions, originX, originY) {
  var pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
  var pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
  return pxOriginX + " " + pxOriginY;
}

var progressToPixels = function progressToPixels(progress, length) {
  return px$1.transform(progress * length);
};

var dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
/**
 * Build SVG path properties. Uses the path's measured length to convert
 * our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
 * and stroke-dasharray attributes.
 *
 * This function is mutative to reduce per-frame GC.
 */

function buildSVGPath(attrs, totalLength, length, spacing, offset, useDashCase) {
  if (spacing === void 0) {
    spacing = 1;
  }

  if (offset === void 0) {
    offset = 0;
  }

  if (useDashCase === void 0) {
    useDashCase = true;
  } // We use dash case when setting attributes directly to the DOM node and camel case
  // when defining props on a React component.


  var keys = useDashCase ? dashKeys : camelKeys; // Build the dash offset

  attrs[keys.offset] = progressToPixels(-offset, totalLength); // Build the dash array

  var pathLength = progressToPixels(length, totalLength);
  var pathSpacing = progressToPixels(spacing, totalLength);
  attrs[keys.array] = pathLength + " " + pathSpacing;
}

/**
 * Build SVG visual attrbutes, like cx and style.transform
 */

function buildSVGAttrs(state, _a, projection, layoutState, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
  var attrX = _a.attrX,
      attrY = _a.attrY,
      originX = _a.originX,
      originY = _a.originY,
      pathLength = _a.pathLength,
      _b = _a.pathSpacing,
      pathSpacing = _b === void 0 ? 1 : _b,
      _c = _a.pathOffset,
      pathOffset = _c === void 0 ? 0 : _c,
      // This is object creation, which we try to avoid per-frame.
  latest = __rest(_a, ["attrX", "attrY", "originX", "originY", "pathLength", "pathSpacing", "pathOffset"]);

  buildHTMLStyles(state, latest, projection, layoutState, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin);
  state.attrs = state.style;
  state.style = {};
  var attrs = state.attrs,
      style = state.style,
      dimensions = state.dimensions,
      totalPathLength = state.totalPathLength;
  /**
   * However, we apply transforms as CSS transforms. So if we detect a transform we take it from attrs
   * and copy it into style.
   */

  if (attrs.transform) {
    if (dimensions) style.transform = attrs.transform;
    delete attrs.transform;
  } // Parse transformOrigin


  if (dimensions && (originX !== undefined || originY !== undefined || style.transform)) {
    style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== undefined ? originX : 0.5, originY !== undefined ? originY : 0.5);
  } // Treat x/y not as shortcuts but as actual attributes


  if (attrX !== undefined) attrs.x = attrX;
  if (attrY !== undefined) attrs.y = attrY; // Build SVG path if one has been measured

  if (totalPathLength !== undefined && pathLength !== undefined) {
    buildSVGPath(attrs, totalPathLength, pathLength, pathSpacing, pathOffset, false);
  }
}

var createSvgRenderState = function createSvgRenderState() {
  return _assign(_assign({}, createHtmlRenderState()), {
    attrs: {}
  });
};

function useSVGProps(props, visualState) {
  var visualProps = react.useMemo(function () {
    var state = createSvgRenderState();
    buildSVGAttrs(state, visualState, undefined, undefined, {
      enableHardwareAcceleration: false
    }, props.transformTemplate);
    return _assign(_assign({}, state.attrs), {
      style: _assign({}, state.style)
    });
  }, [visualState]);

  if (props.style) {
    var rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props);
    visualProps.style = _assign(_assign({}, rawStyles), visualProps.style);
  }

  return visualProps;
}

function createUseRender(forwardMotionProps) {
  if (forwardMotionProps === void 0) {
    forwardMotionProps = false;
  }

  var useRender = function useRender(Component, props, ref, _a, isStatic) {
    var latestValues = _a.latestValues;
    var useVisualProps = isSVGComponent(Component) ? useSVGProps : useHTMLProps;
    var visualProps = useVisualProps(props, latestValues, isStatic);
    var filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);

    var elementProps = _assign(_assign(_assign({}, filteredProps), visualProps), {
      ref: ref
    });

    return /*#__PURE__*/react.createElement(Component, elementProps);
  };

  return useRender;
}

var CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
var REPLACE_TEMPLATE = "$1-$2";
/**
 * Convert camelCase to dash-case properties.
 */

var camelToDash = function camelToDash(str) {
  return str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
};

function renderHTML(element, _a) {
  var style = _a.style,
      vars = _a.vars; // Directly assign style into the Element's style prop. In tests Object.assign is the
  // fastest way to assign styles.

  Object.assign(element.style, style); // Loop over any CSS variables and assign those.

  for (var key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}

/**
 * A set of attribute names that are always read/written as camel case.
 */
var camelCaseAttributes = new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes", "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale", "specularConstant", "specularExponent", "stdDeviation", "tableValues", "viewBox", "gradientTransform"]);

function renderSVG(element, renderState) {
  renderHTML(element, renderState);

  for (var key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}

function scrapeMotionValuesFromProps(props) {
  var style = props.style;
  var newValues = {};

  for (var key in style) {
    if (isMotionValue(style[key]) || isForcedMotionValue(key, props)) {
      newValues[key] = style[key];
    }
  }

  return newValues;
}

function scrapeMotionValuesFromProps$1(props) {
  var newValues = scrapeMotionValuesFromProps(props);

  for (var key in props) {
    if (isMotionValue(props[key])) {
      var targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
      newValues[targetKey] = props[key];
    }
  }

  return newValues;
}

function _typeof$7(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$7 = function _typeof(obj) { return typeof obj; }; } else { _typeof$7 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$7(obj); }

function isAnimationControls(v) {
  return _typeof$7(v) === "object" && typeof v.start === "function";
}

var isKeyframesTarget = function isKeyframesTarget(v) {
  return Array.isArray(v);
};

function _typeof$8(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$8 = function _typeof(obj) { return typeof obj; }; } else { _typeof$8 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$8(obj); }

var isCustomValue = function isCustomValue(v) {
  return Boolean(v && _typeof$8(v) === "object" && v.mix && v.toValue);
};

var resolveFinalValueInKeyframes = function resolveFinalValueInKeyframes(v) {
  // TODO maybe throw if v.length - 1 is placeholder token?
  return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
};

/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 *
 * TODO: Remove and move to library
 *
 * @internal
 */

function resolveMotionValue(value) {
  var unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}

function makeState(_a, props, context, presenceContext) {
  var scrapeMotionValuesFromProps = _a.scrapeMotionValuesFromProps,
      createRenderState = _a.createRenderState,
      onMount = _a.onMount;
  var state = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps),
    renderState: createRenderState()
  };

  if (onMount) {
    state.mount = function (instance) {
      return onMount(props, instance, state);
    };
  }

  return state;
}

var makeUseVisualState = function makeUseVisualState(config) {
  return function (props, isStatic) {
    var context = react.useContext(MotionContext);
    var presenceContext = react.useContext(PresenceContext);
    return isStatic ? makeState(config, props, context, presenceContext) : useConstant(function () {
      return makeState(config, props, context, presenceContext);
    });
  };
};

function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  var values = {};
  var blockInitialAnimation = (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false;
  var motionValues = scrapeMotionValues(props);

  for (var key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }

  var initial = props.initial,
      animate = props.animate;
  var isControllingVariants = checkIfControllingVariants(props);
  var isVariantNode = checkIfVariantNode(props);

  if (context && isVariantNode && !isControllingVariants && props.inherit !== false) {
    initial !== null && initial !== void 0 ? initial : initial = context.initial;
    animate !== null && animate !== void 0 ? animate : animate = context.animate;
  }

  var variantToSet = blockInitialAnimation || initial === false ? animate : initial;

  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    var list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    list.forEach(function (definition) {
      var resolved = resolveVariantFromProps(props, definition);
      if (!resolved) return;
      var transitionEnd = resolved.transitionEnd;
      resolved.transition;

      var target = __rest(resolved, ["transitionEnd", "transition"]);

      for (var key in target) {
        values[key] = target[key];
      }

      for (var key in transitionEnd) {
        values[key] = transitionEnd[key];
      }
    });
  }

  return values;
}

var svgMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
    createRenderState: createSvgRenderState,
    onMount: function onMount(props, instance, _a) {
      var renderState = _a.renderState,
          latestValues = _a.latestValues;

      try {
        renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
      } catch (e) {
        // Most likely trying to measure an unrendered element under Firefox
        renderState.dimensions = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }

      if (isPath(instance)) {
        renderState.totalPathLength = instance.getTotalLength();
      }

      buildSVGAttrs(renderState, latestValues, undefined, undefined, {
        enableHardwareAcceleration: false
      }, props.transformTemplate); // TODO: Replace with direct assignment

      renderSVG(instance, renderState);
    }
  })
};

function isPath(element) {
  return element.tagName === "path";
}

var htmlMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps,
    createRenderState: createHtmlRenderState
  })
};

function createDomMotionConfig(Component, _a, preloadedFeatures, createVisualElement) {
  var _b = _a.forwardMotionProps,
      forwardMotionProps = _b === void 0 ? false : _b;
  var baseConfig = isSVGComponent(Component) ? svgMotionConfig : htmlMotionConfig;
  return _assign(_assign({}, baseConfig), {
    preloadedFeatures: preloadedFeatures,
    useRender: createUseRender(forwardMotionProps),
    createVisualElement: createVisualElement,
    Component: Component
  });
}

var AnimationType;

(function (AnimationType) {
  AnimationType["Animate"] = "animate";
  AnimationType["Hover"] = "whileHover";
  AnimationType["Tap"] = "whileTap";
  AnimationType["Drag"] = "whileDrag";
  AnimationType["Focus"] = "whileFocus";
  AnimationType["Exit"] = "exit";
})(AnimationType || (AnimationType = {}));

function addDomEvent(target, eventName, handler, options) {
  target.addEventListener(eventName, handler, options);
  return function () {
    return target.removeEventListener(eventName, handler, options);
  };
}
/**
 * Attaches an event listener directly to the provided DOM element.
 *
 * Bypassing React's event system can be desirable, for instance when attaching non-passive
 * event handlers.
 *
 * ```jsx
 * const ref = useRef(null)
 *
 * useDomEvent(ref, 'wheel', onWheel, { passive: false })
 *
 * return <div ref={ref} />
 * ```
 *
 * @param ref - React.RefObject that's been provided to the element you want to bind the listener to.
 * @param eventName - Name of the event you want listen for.
 * @param handler - Function to fire when receiving the event.
 * @param options - Options to pass to `Event.addEventListener`.
 *
 * @public
 */


function useDomEvent(ref, eventName, handler, options) {
  react.useEffect(function () {
    var element = ref.current;

    if (handler && element) {
      return addDomEvent(element, eventName, handler, options);
    }
  }, [ref, eventName, handler, options]);
}

/**
 *
 * @param props
 * @param ref
 * @internal
 */

function useFocusGesture(_a) {
  var whileFocus = _a.whileFocus,
      visualElement = _a.visualElement;

  var onFocus = function onFocus() {
    var _a;

    (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Focus, true);
  };

  var onBlur = function onBlur() {
    var _a;

    (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Focus, false);
  };

  useDomEvent(visualElement, "focus", whileFocus ? onFocus : undefined);
  useDomEvent(visualElement, "blur", whileFocus ? onBlur : undefined);
}

function isMouseEvent(event) {
  // PointerEvent inherits from MouseEvent so we can't use a straight instanceof check.
  if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
    return !!(event.pointerType === "mouse");
  }

  return event instanceof MouseEvent;
}

function isTouchEvent(event) {
  var hasTouches = !!event.touches;
  return hasTouches;
}

/**
 * Filters out events not attached to the primary pointer (currently left mouse button)
 * @param eventHandler
 */

function filterPrimaryPointer(eventHandler) {
  return function (event) {
    var isMouseEvent = event instanceof MouseEvent;
    var isPrimaryPointer = !isMouseEvent || isMouseEvent && event.button === 0;

    if (isPrimaryPointer) {
      eventHandler(event);
    }
  };
}

var defaultPagePoint = {
  pageX: 0,
  pageY: 0
};

function pointFromTouch(e, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }

  var primaryTouch = e.touches[0] || e.changedTouches[0];
  var point = primaryTouch || defaultPagePoint;
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}

function pointFromMouse(point, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }

  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}

function extractEventInfo(event, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }

  return {
    point: isTouchEvent(event) ? pointFromTouch(event, pointType) : pointFromMouse(event, pointType)
  };
}

function getViewportPointFromEvent(event) {
  return extractEventInfo(event, "client");
}

var wrapHandler = function wrapHandler(handler, shouldFilterPrimaryPointer) {
  if (shouldFilterPrimaryPointer === void 0) {
    shouldFilterPrimaryPointer = false;
  }

  var listener = function listener(event) {
    return handler(event, extractEventInfo(event));
  };

  return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
};

var supportsPointerEvents = function supportsPointerEvents() {
  return isBrowser$2 && window.onpointerdown === null;
};

var supportsTouchEvents = function supportsTouchEvents() {
  return isBrowser$2 && window.ontouchstart === null;
};

var supportsMouseEvents = function supportsMouseEvents() {
  return isBrowser$2 && window.onmousedown === null;
};

var mouseEventNames = {
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointercancel: "mousecancel",
  pointerover: "mouseover",
  pointerout: "mouseout",
  pointerenter: "mouseenter",
  pointerleave: "mouseleave"
};
var touchEventNames = {
  pointerdown: "touchstart",
  pointermove: "touchmove",
  pointerup: "touchend",
  pointercancel: "touchcancel"
};

function getPointerEventName(name) {
  if (supportsPointerEvents()) {
    return name;
  } else if (supportsTouchEvents()) {
    return touchEventNames[name];
  } else if (supportsMouseEvents()) {
    return mouseEventNames[name];
  }

  return name;
}

function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, getPointerEventName(eventName), wrapHandler(handler, eventName === "pointerdown"), options);
}

function usePointerEvent(ref, eventName, handler, options) {
  return useDomEvent(ref, getPointerEventName(eventName), handler && wrapHandler(handler, eventName === "pointerdown"), options);
}

function createLock(name) {
  var lock = null;
  return function () {
    var openLock = function openLock() {
      lock = null;
    };

    if (lock === null) {
      lock = name;
      return openLock;
    }

    return false;
  };
}

var globalHorizontalLock = createLock("dragHorizontal");
var globalVerticalLock = createLock("dragVertical");

function getGlobalLock(drag) {
  var lock = false;

  if (drag === "y") {
    lock = globalVerticalLock();
  } else if (drag === "x") {
    lock = globalHorizontalLock();
  } else {
    var openHorizontal_1 = globalHorizontalLock();
    var openVertical_1 = globalVerticalLock();

    if (openHorizontal_1 && openVertical_1) {
      lock = function lock() {
        openHorizontal_1();
        openVertical_1();
      };
    } else {
      // Release the locks because we don't use them
      if (openHorizontal_1) openHorizontal_1();
      if (openVertical_1) openVertical_1();
    }
  }

  return lock;
}

function isDragActive() {
  // Check the gesture lock - if we get it, it means no drag gesture is active
  // and we can safely fire the tap gesture.
  var openGestureLock = getGlobalLock(true);
  if (!openGestureLock) return true;
  openGestureLock();
  return false;
}

function createHoverEvent(visualElement, isActive, callback) {
  return function (event, info) {
    var _a;

    if (!isMouseEvent(event) || isDragActive()) return;
    callback === null || callback === void 0 ? void 0 : callback(event, info);
    (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Hover, isActive);
  };
}

function useHoverGesture(_a) {
  var onHoverStart = _a.onHoverStart,
      onHoverEnd = _a.onHoverEnd,
      whileHover = _a.whileHover,
      visualElement = _a.visualElement;
  usePointerEvent(visualElement, "pointerenter", onHoverStart || whileHover ? createHoverEvent(visualElement, true, onHoverStart) : undefined);
  usePointerEvent(visualElement, "pointerleave", onHoverEnd || whileHover ? createHoverEvent(visualElement, false, onHoverEnd) : undefined);
}

/**
 * Recursively traverse up the tree to check whether the provided child node
 * is the parent or a descendant of it.
 *
 * @param parent - Element to find
 * @param child - Element to test against parent
 */
var isNodeOrChild = function isNodeOrChild(parent, child) {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};

function useUnmountEffect$1(callback) {
  return react.useEffect(function () {
    return function () {
      return callback();
    };
  }, []);
}

var clamp$1 = function clamp(min, max, v) {
  return Math.min(Math.max(v, min), max);
};

var safeMin = 0.001;
var minDuration = 0.01;
var maxDuration = 10.0;
var minDamping = 0.05;
var maxDamping = 1;

function findSpring(_a) {
  var _b = _a.duration,
      duration = _b === void 0 ? 800 : _b,
      _c = _a.bounce,
      bounce = _c === void 0 ? 0.25 : _c,
      _d = _a.velocity,
      velocity = _d === void 0 ? 0 : _d,
      _e = _a.mass,
      mass = _e === void 0 ? 1 : _e;
  var envelope;
  var derivative;
  var dampingRatio = 1 - bounce;
  dampingRatio = clamp$1(minDamping, maxDamping, dampingRatio);
  duration = clamp$1(minDuration, maxDuration, duration / 1000);

  if (dampingRatio < 1) {
    envelope = function envelope(undampedFreq) {
      var exponentialDecay = undampedFreq * dampingRatio;
      var delta = exponentialDecay * duration;
      var a = exponentialDecay - velocity;
      var b = calcAngularFreq(undampedFreq, dampingRatio);
      var c = Math.exp(-delta);
      return safeMin - a / b * c;
    };

    derivative = function derivative(undampedFreq) {
      var exponentialDecay = undampedFreq * dampingRatio;
      var delta = exponentialDecay * duration;
      var d = delta * velocity + velocity;
      var e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq, 2) * duration;
      var f = Math.exp(-delta);
      var g = calcAngularFreq(Math.pow(undampedFreq, 2), dampingRatio);
      var factor = -envelope(undampedFreq) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = function envelope(undampedFreq) {
      var a = Math.exp(-undampedFreq * duration);
      var b = (undampedFreq - velocity) * duration + 1;
      return -safeMin + a * b;
    };

    derivative = function derivative(undampedFreq) {
      var a = Math.exp(-undampedFreq * duration);
      var b = (velocity - undampedFreq) * (duration * duration);
      return a * b;
    };
  }

  var initialGuess = 5 / duration;
  var undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = duration * 1000;

  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10,
      duration: duration
    };
  } else {
    var stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness: stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration: duration
    };
  }
}

var rootIterations = 12;

function approximateRoot(envelope, derivative, initialGuess) {
  var result = initialGuess;

  for (var i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }

  return result;
}

function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}

var durationKeys = ["duration", "bounce"];
var physicsKeys = ["stiffness", "damping", "mass"];

function isSpringType(options, keys) {
  return keys.some(function (key) {
    return options[key] !== undefined;
  });
}

function getSpringOptions(options) {
  var springOptions = _assign({
    velocity: 0.0,
    stiffness: 100,
    damping: 10,
    mass: 1.0,
    isResolvedFromDuration: false
  }, options);

  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    var derived = findSpring(options);
    springOptions = _assign(_assign(_assign({}, springOptions), derived), {
      velocity: 0.0,
      mass: 1.0
    });
    springOptions.isResolvedFromDuration = true;
  }

  return springOptions;
}

function spring(_a) {
  var _b = _a.from,
      from = _b === void 0 ? 0.0 : _b,
      _c = _a.to,
      to = _c === void 0 ? 1.0 : _c,
      _d = _a.restSpeed,
      restSpeed = _d === void 0 ? 2 : _d,
      restDelta = _a.restDelta,
      options = __rest(_a, ["from", "to", "restSpeed", "restDelta"]);

  var state = {
    done: false,
    value: from
  };

  var _e = getSpringOptions(options),
      stiffness = _e.stiffness,
      damping = _e.damping,
      mass = _e.mass,
      velocity = _e.velocity,
      duration = _e.duration,
      isResolvedFromDuration = _e.isResolvedFromDuration;

  var resolveSpring = zero;
  var resolveVelocity = zero;

  function createSpring() {
    var initialVelocity = velocity ? -(velocity / 1000) : 0.0;
    var initialDelta = to - from;
    var dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    var undampedAngularFreq = Math.sqrt(stiffness / mass) / 1000;
    restDelta !== null && restDelta !== void 0 ? restDelta : restDelta = Math.abs(to - from) <= 1 ? 0.01 : 0.4;

    if (dampingRatio < 1) {
      var angularFreq_1 = calcAngularFreq(undampedAngularFreq, dampingRatio);

      resolveSpring = function resolveSpring(t) {
        var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq_1 * Math.sin(angularFreq_1 * t) + initialDelta * Math.cos(angularFreq_1 * t));
      };

      resolveVelocity = function resolveVelocity(t) {
        var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq_1 * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq_1 + initialDelta * Math.cos(angularFreq_1 * t)) - envelope * (Math.cos(angularFreq_1 * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq_1 * initialDelta * Math.sin(angularFreq_1 * t));
      };
    } else if (dampingRatio === 1) {
      resolveSpring = function resolveSpring(t) {
        return to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
      };
    } else {
      var dampedAngularFreq_1 = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);

      resolveSpring = function resolveSpring(t) {
        var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        var freqForT = Math.min(dampedAngularFreq_1 * t, 300);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq_1 * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq_1;
      };
    }
  }

  createSpring();
  return {
    next: function next(t) {
      var current = resolveSpring(t);

      if (!isResolvedFromDuration) {
        var currentVelocity = resolveVelocity(t) * 1000;
        var isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        var isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t >= duration;
      }

      state.value = state.done ? to : current;
      return state;
    },
    flipTarget: function flipTarget() {
      var _a;

      velocity = -velocity;
      _a = [to, from], from = _a[0], to = _a[1];
      createSpring();
    }
  };
}

spring.needsInterpolation = function (a, b) {
  return typeof a === "string" || typeof b === "string";
};

var zero = function zero(_t) {
  return 0;
};

var progress = function progress(from, to, value) {
  var toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

var mix = function mix(from, to, progress) {
  return -progress * from + progress * to + from;
};

var mixLinearColor = function mixLinearColor(from, to, v) {
  var fromExpo = from * from;
  var toExpo = to * to;
  return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
};

var colorTypes = [hex, rgba, hsla];

var getColorType = function getColorType(v) {
  return colorTypes.find(function (type) {
    return type.test(v);
  });
};

var mixColor = function mixColor(from, to) {
  var fromColorType = getColorType(from);
  var toColorType = getColorType(to);
  invariant(fromColorType.transform === toColorType.transform);
  var fromColor = fromColorType.parse(from);
  var toColor = toColorType.parse(to);

  var blended = _assign({}, fromColor);

  var mixFunc = fromColorType === hsla ? mix : mixLinearColor;
  return function (v) {
    for (var key in blended) {
      if (key !== "alpha") {
        blended[key] = mixFunc(fromColor[key], toColor[key], v);
      }
    }

    blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
    return fromColorType.transform(blended);
  };
};

var isNum = function isNum(v) {
  return typeof v === 'number';
};

var combineFunctions = function combineFunctions(a, b) {
  return function (v) {
    return b(a(v));
  };
};

var pipe = function pipe() {
  var transformers = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    transformers[_i] = arguments[_i];
  }

  return transformers.reduce(combineFunctions);
};

function getMixer(origin, target) {
  if (isNum(origin)) {
    return function (v) {
      return mix(origin, target, v);
    };
  } else if (color$1.test(origin)) {
    return mixColor(origin, target);
  } else {
    return mixComplex(origin, target);
  }
}

var mixArray = function mixArray(from, to) {
  var output = __spreadArray([], from);

  var numValues = output.length;
  var blendValue = from.map(function (fromThis, i) {
    return getMixer(fromThis, to[i]);
  });
  return function (v) {
    for (var i = 0; i < numValues; i++) {
      output[i] = blendValue[i](v);
    }

    return output;
  };
};

var mixObject = function mixObject(origin, target) {
  var output = _assign(_assign({}, origin), target);

  var blendValue = {};

  for (var key in output) {
    if (origin[key] !== undefined && target[key] !== undefined) {
      blendValue[key] = getMixer(origin[key], target[key]);
    }
  }

  return function (v) {
    for (var key in blendValue) {
      output[key] = blendValue[key](v);
    }

    return output;
  };
};

function analyse$1(value) {
  var parsed = complex.parse(value);
  var numValues = parsed.length;
  var numNumbers = 0;
  var numRGB = 0;
  var numHSL = 0;

  for (var i = 0; i < numValues; i++) {
    if (numNumbers || typeof parsed[i] === "number") {
      numNumbers++;
    } else {
      if (parsed[i].hue !== undefined) {
        numHSL++;
      } else {
        numRGB++;
      }
    }
  }

  return {
    parsed: parsed,
    numNumbers: numNumbers,
    numRGB: numRGB,
    numHSL: numHSL
  };
}

var mixComplex = function mixComplex(origin, target) {
  var template = complex.createTransformer(target);
  var originStats = analyse$1(origin);
  var targetStats = analyse$1(target);
  return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
};

function _typeof$9(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$9 = function _typeof(obj) { return typeof obj; }; } else { _typeof$9 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$9(obj); }

var mixNumber = function mixNumber(from, to) {
  return function (p) {
    return mix(from, to, p);
  };
};

function detectMixerFactory(v) {
  if (typeof v === 'number') {
    return mixNumber;
  } else if (typeof v === 'string') {
    if (color$1.test(v)) {
      return mixColor;
    } else {
      return mixComplex;
    }
  } else if (Array.isArray(v)) {
    return mixArray;
  } else if (_typeof$9(v) === 'object') {
    return mixObject;
  }
}

function createMixers(output, ease, customMixer) {
  var mixers = [];
  var mixerFactory = customMixer || detectMixerFactory(output[0]);
  var numMixers = output.length - 1;

  for (var i = 0; i < numMixers; i++) {
    var mixer = mixerFactory(output[i], output[i + 1]);

    if (ease) {
      var easingFunction = Array.isArray(ease) ? ease[i] : ease;
      mixer = pipe(easingFunction, mixer);
    }

    mixers.push(mixer);
  }

  return mixers;
}

function fastInterpolate(_a, _b) {
  var from = _a[0],
      to = _a[1];
  var mixer = _b[0];
  return function (v) {
    return mixer(progress(from, to, v));
  };
}

function slowInterpolate(input, mixers) {
  var inputLength = input.length;
  var lastInputIndex = inputLength - 1;
  return function (v) {
    var mixerIndex = 0;
    var foundMixerIndex = false;

    if (v <= input[0]) {
      foundMixerIndex = true;
    } else if (v >= input[lastInputIndex]) {
      mixerIndex = lastInputIndex - 1;
      foundMixerIndex = true;
    }

    if (!foundMixerIndex) {
      var i = 1;

      for (; i < inputLength; i++) {
        if (input[i] > v || i === lastInputIndex) {
          break;
        }
      }

      mixerIndex = i - 1;
    }

    var progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
    return mixers[mixerIndex](progressInRange);
  };
}

function interpolate(input, output, _a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.clamp,
      isClamp = _c === void 0 ? true : _c,
      ease = _b.ease,
      mixer = _b.mixer;

  var inputLength = input.length;
  invariant(inputLength === output.length);
  invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1);

  if (input[0] > input[inputLength - 1]) {
    input = [].concat(input);
    output = [].concat(output);
    input.reverse();
    output.reverse();
  }

  var mixers = createMixers(output, ease, mixer);
  var interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
  return isClamp ? function (v) {
    return interpolator(clamp$1(input[0], input[inputLength - 1], v));
  } : interpolator;
}

var reverseEasing = function reverseEasing(easing) {
  return function (p) {
    return 1 - easing(1 - p);
  };
};

var mirrorEasing = function mirrorEasing(easing) {
  return function (p) {
    return p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
  };
};

var createExpoIn = function createExpoIn(power) {
  return function (p) {
    return Math.pow(p, power);
  };
};

var createBackIn = function createBackIn(power) {
  return function (p) {
    return p * p * ((power + 1) * p - power);
  };
};

var createAnticipate = function createAnticipate(power) {
  var backEasing = createBackIn(power);
  return function (p) {
    return (p *= 2) < 1 ? 0.5 * backEasing(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
  };
};

var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
var BOUNCE_FIRST_THRESHOLD = 4.0 / 11.0;
var BOUNCE_SECOND_THRESHOLD = 8.0 / 11.0;
var BOUNCE_THIRD_THRESHOLD = 9.0 / 10.0;

var linear = function linear(p) {
  return p;
};

var easeIn = createExpoIn(2);
var easeOut = reverseEasing(easeIn);
var easeInOut = mirrorEasing(easeIn);

var circIn = function circIn(p) {
  return 1 - Math.sin(Math.acos(p));
};

var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circOut);
var backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
var backOut = reverseEasing(backIn);
var backInOut = mirrorEasing(backIn);
var anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
var ca = 4356.0 / 361.0;
var cb = 35442.0 / 1805.0;
var cc = 16061.0 / 1805.0;

var bounceOut = function bounceOut(p) {
  if (p === 1 || p === 0) return p;
  var p2 = p * p;
  return p < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p2 : p < BOUNCE_SECOND_THRESHOLD ? 9.075 * p2 - 9.9 * p + 3.4 : p < BOUNCE_THIRD_THRESHOLD ? ca * p2 - cb * p + cc : 10.8 * p * p - 20.52 * p + 10.72;
};

var bounceIn = reverseEasing(bounceOut);

var bounceInOut = function bounceInOut(p) {
  return p < 0.5 ? 0.5 * (1.0 - bounceOut(1.0 - p * 2.0)) : 0.5 * bounceOut(p * 2.0 - 1.0) + 0.5;
};

function defaultEasing(values, easing) {
  return values.map(function () {
    return easing || easeInOut;
  }).splice(0, values.length - 1);
}

function defaultOffset(values) {
  var numValues = values.length;
  return values.map(function (_value, i) {
    return i !== 0 ? i / (numValues - 1) : 0;
  });
}

function convertOffsetToTimes(offset, duration) {
  return offset.map(function (o) {
    return o * duration;
  });
}

function keyframes$1(_a) {
  var _b = _a.from,
      from = _b === void 0 ? 0 : _b,
      _c = _a.to,
      to = _c === void 0 ? 1 : _c,
      ease = _a.ease,
      offset = _a.offset,
      _d = _a.duration,
      duration = _d === void 0 ? 300 : _d;
  var state = {
    done: false,
    value: from
  };
  var values = Array.isArray(to) ? to : [from, to];
  var times = convertOffsetToTimes(offset && offset.length === values.length ? offset : defaultOffset(values), duration);

  function createInterpolator() {
    return interpolate(times, values, {
      ease: Array.isArray(ease) ? ease : defaultEasing(values, ease)
    });
  }

  var interpolator = createInterpolator();
  return {
    next: function next(t) {
      state.value = interpolator(t);
      state.done = t >= duration;
      return state;
    },
    flipTarget: function flipTarget() {
      values.reverse();
      interpolator = createInterpolator();
    }
  };
}

function decay(_a) {
  var _b = _a.velocity,
      velocity = _b === void 0 ? 0 : _b,
      _c = _a.from,
      from = _c === void 0 ? 0 : _c,
      _d = _a.power,
      power = _d === void 0 ? 0.8 : _d,
      _e = _a.timeConstant,
      timeConstant = _e === void 0 ? 350 : _e,
      _f = _a.restDelta,
      restDelta = _f === void 0 ? 0.5 : _f,
      modifyTarget = _a.modifyTarget;
  var state = {
    done: false,
    value: from
  };
  var amplitude = power * velocity;
  var ideal = from + amplitude;
  var target = modifyTarget === undefined ? ideal : modifyTarget(ideal);
  if (target !== ideal) amplitude = target - from;
  return {
    next: function next(t) {
      var delta = -amplitude * Math.exp(-t / timeConstant);
      state.done = !(delta > restDelta || delta < -restDelta);
      state.value = state.done ? target : target + delta;
      return state;
    },
    flipTarget: function flipTarget() {}
  };
}

var types = {
  keyframes: keyframes$1,
  spring: spring,
  decay: decay
};

function detectAnimationFromOptions(config) {
  if (Array.isArray(config.to)) {
    return keyframes$1;
  } else if (types[config.type]) {
    return types[config.type];
  }

  var keys = new Set(Object.keys(config));

  if (keys.has("ease") || keys.has("duration") && !keys.has("dampingRatio")) {
    return keyframes$1;
  } else if (keys.has("dampingRatio") || keys.has("stiffness") || keys.has("mass") || keys.has("damping") || keys.has("restSpeed") || keys.has("restDelta")) {
    return spring;
  }

  return keyframes$1;
}

function loopElapsed(elapsed, duration, delay) {
  if (delay === void 0) {
    delay = 0;
  }

  return elapsed - duration - delay;
}

function reverseElapsed(elapsed, duration, delay, isForwardPlayback) {
  if (delay === void 0) {
    delay = 0;
  }

  if (isForwardPlayback === void 0) {
    isForwardPlayback = true;
  }

  return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay) : duration - (elapsed - duration) + delay;
}

function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
  return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}

var framesync = function framesync(update) {
  var passTimestamp = function passTimestamp(_a) {
    var delta = _a.delta;
    return update(delta);
  };

  return {
    start: function start() {
      return sync.update(passTimestamp, true);
    },
    stop: function stop() {
      return cancelSync.update(passTimestamp);
    }
  };
};

function animate(_a) {
  var _b, _c;

  var from = _a.from,
      _d = _a.autoplay,
      autoplay = _d === void 0 ? true : _d,
      _e = _a.driver,
      driver = _e === void 0 ? framesync : _e,
      _f = _a.elapsed,
      elapsed = _f === void 0 ? 0 : _f,
      _g = _a.repeat,
      repeatMax = _g === void 0 ? 0 : _g,
      _h = _a.repeatType,
      repeatType = _h === void 0 ? "loop" : _h,
      _j = _a.repeatDelay,
      repeatDelay = _j === void 0 ? 0 : _j,
      onPlay = _a.onPlay,
      onStop = _a.onStop,
      onComplete = _a.onComplete,
      onRepeat = _a.onRepeat,
      onUpdate = _a.onUpdate,
      options = __rest(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);

  var to = options.to;
  var driverControls;
  var repeatCount = 0;
  var computedDuration = options.duration;
  var latest;
  var isComplete = false;
  var isForwardPlayback = true;
  var interpolateFromNumber;
  var animator = detectAnimationFromOptions(options);

  if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
    interpolateFromNumber = interpolate([0, 100], [from, to], {
      clamp: false
    });
    from = 0;
    to = 100;
  }

  var animation = animator(_assign(_assign({}, options), {
    from: from,
    to: to
  }));

  function repeat() {
    repeatCount++;

    if (repeatType === "reverse") {
      isForwardPlayback = repeatCount % 2 === 0;
      elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
    } else {
      elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
      if (repeatType === "mirror") animation.flipTarget();
    }

    isComplete = false;
    onRepeat && onRepeat();
  }

  function complete() {
    driverControls.stop();
    onComplete && onComplete();
  }

  function update(delta) {
    if (!isForwardPlayback) delta = -delta;
    elapsed += delta;

    if (!isComplete) {
      var state = animation.next(Math.max(0, elapsed));
      latest = state.value;
      if (interpolateFromNumber) latest = interpolateFromNumber(latest);
      isComplete = isForwardPlayback ? state.done : elapsed <= 0;
    }

    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);

    if (isComplete) {
      if (repeatCount === 0) computedDuration !== null && computedDuration !== void 0 ? computedDuration : computedDuration = elapsed;

      if (repeatCount < repeatMax) {
        hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
      } else {
        complete();
      }
    }
  }

  function play() {
    onPlay === null || onPlay === void 0 ? void 0 : onPlay();
    driverControls = driver(update);
    driverControls.start();
  }

  autoplay && play();
  return {
    stop: function stop() {
      onStop === null || onStop === void 0 ? void 0 : onStop();
      driverControls.stop();
    }
  };
}

function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1000 / frameDuration) : 0;
}

function inertia(_a) {
  var _b = _a.from,
      from = _b === void 0 ? 0 : _b,
      _c = _a.velocity,
      velocity = _c === void 0 ? 0 : _c,
      min = _a.min,
      max = _a.max,
      _d = _a.power,
      power = _d === void 0 ? 0.8 : _d,
      _e = _a.timeConstant,
      timeConstant = _e === void 0 ? 750 : _e,
      _f = _a.bounceStiffness,
      bounceStiffness = _f === void 0 ? 500 : _f,
      _g = _a.bounceDamping,
      bounceDamping = _g === void 0 ? 10 : _g,
      _h = _a.restDelta,
      restDelta = _h === void 0 ? 1 : _h,
      modifyTarget = _a.modifyTarget,
      driver = _a.driver,
      _onUpdate = _a.onUpdate,
      onComplete = _a.onComplete;
  var currentAnimation;

  function isOutOfBounds(v) {
    return min !== undefined && v < min || max !== undefined && v > max;
  }

  function boundaryNearest(v) {
    if (min === undefined) return max;
    if (max === undefined) return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  }

  function startAnimation(options) {
    currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
    currentAnimation = animate(_assign(_assign({}, options), {
      driver: driver,
      onUpdate: function onUpdate(v) {
        var _a;

        _onUpdate === null || _onUpdate === void 0 ? void 0 : _onUpdate(v);
        (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, v);
      },
      onComplete: onComplete
    }));
  }

  function startSpring(options) {
    startAnimation(_assign({
      type: "spring",
      stiffness: bounceStiffness,
      damping: bounceDamping,
      restDelta: restDelta
    }, options));
  }

  if (isOutOfBounds(from)) {
    startSpring({
      from: from,
      velocity: velocity,
      to: boundaryNearest(from)
    });
  } else {
    var target = power * velocity + from;
    if (typeof modifyTarget !== "undefined") target = modifyTarget(target);
    var boundary_1 = boundaryNearest(target);
    var heading_1 = boundary_1 === min ? -1 : 1;
    var prev_1;
    var current_1;

    var checkBoundary = function checkBoundary(v) {
      prev_1 = current_1;
      current_1 = v;
      velocity = velocityPerSecond(v - prev_1, getFrameData().delta);

      if (heading_1 === 1 && v > boundary_1 || heading_1 === -1 && v < boundary_1) {
        startSpring({
          from: v,
          to: boundary_1,
          velocity: velocity
        });
      }
    };

    startAnimation({
      type: "decay",
      from: from,
      velocity: velocity,
      timeConstant: timeConstant,
      power: power,
      restDelta: restDelta,
      modifyTarget: modifyTarget,
      onUpdate: isOutOfBounds(target) ? checkBoundary : undefined
    });
  }

  return {
    stop: function stop() {
      return currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
    }
  };
}

var isPoint = function isPoint(point) {
  return point.hasOwnProperty('x') && point.hasOwnProperty('y');
};

var isPoint3D = function isPoint3D(point) {
  return isPoint(point) && point.hasOwnProperty('z');
};

var distance1D = function distance1D(a, b) {
  return Math.abs(a - b);
};

function distance(a, b) {
  if (isNum(a) && isNum(b)) {
    return distance1D(a, b);
  } else if (isPoint(a) && isPoint(b)) {
    var xDelta = distance1D(a.x, b.x);
    var yDelta = distance1D(a.y, b.y);
    var zDelta = isPoint3D(a) && isPoint3D(b) ? distance1D(a.z, b.z) : 0;
    return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
  }
}

var a$1 = function a(a1, a2) {
  return 1.0 - 3.0 * a2 + 3.0 * a1;
};

var b$1 = function b(a1, a2) {
  return 3.0 * a2 - 6.0 * a1;
};

var c$2 = function c(a1) {
  return 3.0 * a1;
};

var calcBezier = function calcBezier(t, a1, a2) {
  return ((a$1(a1, a2) * t + b$1(a1, a2)) * t + c$2(a1)) * t;
};

var getSlope = function getSlope(t, a1, a2) {
  return 3.0 * a$1(a1, a2) * t * t + 2.0 * b$1(a1, a2) * t + c$2(a1);
};

var subdivisionPrecision = 0.0000001;
var subdivisionMaxIterations = 10;

function binarySubdivide(aX, aA, aB, mX1, mX2) {
  var currentX;
  var currentT;
  var i = 0;

  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;

    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);

  return currentT;
}

var newtonIterations = 8;
var newtonMinSlope = 0.001;

function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (var i = 0; i < newtonIterations; ++i) {
    var currentSlope = getSlope(aGuessT, mX1, mX2);

    if (currentSlope === 0.0) {
      return aGuessT;
    }

    var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }

  return aGuessT;
}

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2) return linear;
  var sampleValues = new Float32Array(kSplineTableSize);

  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }

  function getTForX(aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }

    --currentSample;
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;
    var initialSlope = getSlope(guessForT, mX1, mX2);

    if (initialSlope >= newtonMinSlope) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function (t) {
    return t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
  };
}

/**
 * @param handlers -
 * @internal
 */

function useTapGesture(_a) {
  var onTap = _a.onTap,
      onTapStart = _a.onTapStart,
      onTapCancel = _a.onTapCancel,
      whileTap = _a.whileTap,
      visualElement = _a.visualElement;
  var hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
  var isPressing = react.useRef(false);
  var cancelPointerEndListeners = react.useRef(null);

  function removePointerEndListener() {
    var _a;

    (_a = cancelPointerEndListeners.current) === null || _a === void 0 ? void 0 : _a.call(cancelPointerEndListeners);
    cancelPointerEndListeners.current = null;
  }

  function checkPointerEnd() {
    var _a;

    removePointerEndListener();
    isPressing.current = false;
    (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Tap, false);
    return !isDragActive();
  }

  function onPointerUp(event, info) {
    if (!checkPointerEnd()) return;
    /**
     * We only count this as a tap gesture if the event.target is the same
     * as, or a child of, this component's element
     */

    !isNodeOrChild(visualElement.getInstance(), event.target) ? onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info) : onTap === null || onTap === void 0 ? void 0 : onTap(event, info);
  }

  function onPointerCancel(event, info) {
    if (!checkPointerEnd()) return;
    onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info);
  }

  function onPointerDown(event, info) {
    var _a;

    removePointerEndListener();
    if (isPressing.current) return;
    isPressing.current = true;
    cancelPointerEndListeners.current = pipe(addPointerEvent(window, "pointerup", onPointerUp), addPointerEvent(window, "pointercancel", onPointerCancel));
    onTapStart === null || onTapStart === void 0 ? void 0 : onTapStart(event, info);
    (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Tap, true);
  }

  usePointerEvent(visualElement, "pointerdown", hasPressListeners ? onPointerDown : undefined);
  useUnmountEffect$1(removePointerEndListener);
}

var makeRenderlessComponent = function makeRenderlessComponent(hook) {
  return function (props) {
    hook(props);
    return null;
  };
};

var gestureAnimations = {
  tap: makeRenderlessComponent(useTapGesture),
  focus: makeRenderlessComponent(useFocusGesture),
  hover: makeRenderlessComponent(useHoverGesture)
};

function shallowCompare(next, prev) {
  if (!Array.isArray(prev)) return false;
  var prevLength = prev.length;
  if (prevLength !== next.length) return false;

  for (var i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i]) return false;
  }

  return true;
}

/**
 * Converts seconds to milliseconds
 *
 * @param seconds - Time in seconds.
 * @return milliseconds - Converted time in milliseconds.
 */
var secondsToMilliseconds = function secondsToMilliseconds(seconds) {
  return seconds * 1000;
};

var easingLookup = {
  linear: linear,
  easeIn: easeIn,
  easeInOut: easeInOut,
  easeOut: easeOut,
  circIn: circIn,
  circInOut: circInOut,
  circOut: circOut,
  backIn: backIn,
  backInOut: backInOut,
  backOut: backOut,
  anticipate: anticipate,
  bounceIn: bounceIn,
  bounceInOut: bounceInOut,
  bounceOut: bounceOut
};

var easingDefinitionToFunction = function easingDefinitionToFunction(definition) {
  if (Array.isArray(definition)) {
    // If cubic bezier definition, create bezier curve
    invariant(definition.length === 4);

    var _a = __read(definition, 4),
        x1 = _a[0],
        y1 = _a[1],
        x2 = _a[2],
        y2 = _a[3];

    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    return easingLookup[definition];
  }

  return definition;
};

var isEasingArray = function isEasingArray(ease) {
  return Array.isArray(ease) && typeof ease[0] !== "number";
};

/**
 * Check if a value is animatable. Examples:
 *
 * ✅: 100, "100px", "#fff"
 * ❌: "block", "url(2.jpg)"
 * @param value
 *
 * @internal
 */

var isAnimatable = function isAnimatable(key, value) {
  // If the list of keys tat might be non-animatable grows, replace with Set
  if (key === "zIndex") return false; // If it's a number or a keyframes array, we can animate it. We might at some point
  // need to do a deep isAnimatable check of keyframes, or let Popmotion handle this,
  // but for now lets leave it like this for performance reasons

  if (typeof value === "number" || Array.isArray(value)) return true;

  if (typeof value === "string" && // It's animatable if we have a string
  complex.test(value) && // And it contains numbers and/or colors
  !value.startsWith("url(") // Unless it starts with "url("
  ) {
      return true;
    }

  return false;
};

var underDampedSpring = function underDampedSpring() {
  return {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restDelta: 0.5,
    restSpeed: 10
  };
};

var criticallyDampedSpring = function criticallyDampedSpring(to) {
  return {
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 2 * Math.sqrt(550) : 30,
    restDelta: 0.01,
    restSpeed: 10
  };
};

var linearTween = function linearTween() {
  return {
    type: "keyframes",
    ease: "linear",
    duration: 0.3
  };
};

var keyframes$2 = function keyframes(values) {
  return {
    type: "keyframes",
    duration: 0.8,
    values: values
  };
};

var defaultTransitions = {
  x: underDampedSpring,
  y: underDampedSpring,
  z: underDampedSpring,
  rotate: underDampedSpring,
  rotateX: underDampedSpring,
  rotateY: underDampedSpring,
  rotateZ: underDampedSpring,
  scaleX: criticallyDampedSpring,
  scaleY: criticallyDampedSpring,
  scale: criticallyDampedSpring,
  opacity: linearTween,
  backgroundColor: linearTween,
  color: linearTween,
  "default": criticallyDampedSpring
};

var getDefaultTransition = function getDefaultTransition(valueKey, to) {
  var transitionFactory;

  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes$2;
  } else {
    transitionFactory = defaultTransitions[valueKey] || defaultTransitions["default"];
  }

  return _assign({
    to: to
  }, transitionFactory(to));
};

/**
 * A map of default value types for common values
 */

var defaultValueTypes = _assign(_assign({}, numberValueTypes), {
  // Color props
  color: color$1,
  backgroundColor: color$1,
  outlineColor: color$1,
  fill: color$1,
  stroke: color$1,
  // Border props
  borderColor: color$1,
  borderTopColor: color$1,
  borderRightColor: color$1,
  borderBottomColor: color$1,
  borderLeftColor: color$1,
  filter: filter$1,
  WebkitFilter: filter$1
});
/**
 * Gets the default ValueType for the provided value key
 */


var getDefaultValueType = function getDefaultValueType(key) {
  return defaultValueTypes[key];
};

function getAnimatableNone$1(key, value) {
  var _a;

  var defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter$1) defaultValueType = complex; // If value is not recognised as animatable, ie "none", create an animatable version origin based on the target

  return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
}

/**
 * Decide whether a transition is defined on a given Transition.
 * This filters out orchestration options and returns true
 * if any options are left.
 */

function isTransitionDefined(_a) {
  _a.when;
  _a.delay;
  _a.delayChildren;
  _a.staggerChildren;
  _a.staggerDirection;
  _a.repeat;
  _a.repeatType;
  _a.repeatDelay;
  _a.from;

  var transition = __rest(_a, ["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from"]);

  return !!Object.keys(transition).length;
}
/**
 * Convert Framer Motion's Transition type into Popmotion-compatible options.
 */

function convertTransitionToAnimationOptions(_a) {
  var ease = _a.ease,
      times = _a.times,
      yoyo = _a.yoyo,
      flip = _a.flip,
      loop = _a.loop,
      transition = __rest(_a, ["ease", "times", "yoyo", "flip", "loop"]);

  var options = _assign({}, transition);

  if (times) options["offset"] = times;
  /**
   * Convert any existing durations from seconds to milliseconds
   */

  if (transition.duration) options["duration"] = secondsToMilliseconds(transition.duration);
  if (transition.repeatDelay) options.repeatDelay = secondsToMilliseconds(transition.repeatDelay);
  /**
   * Map easing names to Popmotion's easing functions
   */

  if (ease) {
    options["ease"] = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
  }
  /**
   * Support legacy transition API
   */


  if (transition.type === "tween") options.type = "keyframes";
  /**
   * TODO: These options are officially removed from the API.
   */

  if (yoyo || loop || flip) {

    if (yoyo) {
      options.repeatType = "reverse";
    } else if (loop) {
      options.repeatType = "loop";
    } else if (flip) {
      options.repeatType = "mirror";
    }

    options.repeat = loop || yoyo || flip || transition.repeat;
  }
  /**
   * TODO: Popmotion 9 has the ability to automatically detect whether to use
   * a keyframes or spring animation, but does so by detecting velocity and other spring options.
   * It'd be good to introduce a similar thing here.
   */


  if (transition.type !== "spring") options.type = "keyframes";
  return options;
}
/**
 * Get the delay for a value by checking Transition with decreasing specificity.
 */


function getDelayFromTransition(transition, key) {
  var _a;

  var valueTransition = getValueTransition(transition, key) || {};
  return (_a = valueTransition.delay) !== null && _a !== void 0 ? _a : 0;
}

function hydrateKeyframes(options) {
  if (Array.isArray(options.to) && options.to[0] === null) {
    options.to = __spreadArray([], __read(options.to));
    options.to[0] = options.from;
  }

  return options;
}

function getPopmotionAnimationOptions(transition, options, key) {
  var _a;

  if (Array.isArray(options.to)) {
    (_a = transition.duration) !== null && _a !== void 0 ? _a : transition.duration = 0.8;
  }

  hydrateKeyframes(options);
  /**
   * Get a default transition if none is determined to be defined.
   */

  if (!isTransitionDefined(transition)) {
    transition = _assign(_assign({}, transition), getDefaultTransition(key, options.to));
  }

  return _assign(_assign({}, options), convertTransitionToAnimationOptions(transition));
}
/**
 *
 */


function getAnimation(key, value, target, transition, onComplete) {
  var _a;

  var valueTransition = getValueTransition(transition, key);
  var origin = (_a = valueTransition.from) !== null && _a !== void 0 ? _a : value.get();
  var isTargetAnimatable = isAnimatable(key, target);

  if (origin === "none" && isTargetAnimatable && typeof target === "string") {
    /**
     * If we're trying to animate from "none", try and get an animatable version
     * of the target. This could be improved to work both ways.
     */
    origin = getAnimatableNone$1(key, target);
  } else if (isZero(origin) && typeof target === "string") {
    origin = getZeroUnit(target);
  } else if (!Array.isArray(target) && isZero(target) && typeof origin === "string") {
    target = getZeroUnit(origin);
  }

  var isOriginAnimatable = isAnimatable(key, origin);

  function start() {
    var options = {
      from: origin,
      to: target,
      velocity: value.getVelocity(),
      onComplete: onComplete,
      onUpdate: function onUpdate(v) {
        return value.set(v);
      }
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia(_assign(_assign({}, options), valueTransition)) : animate(_assign(_assign({}, getPopmotionAnimationOptions(valueTransition, options, key)), {
      onUpdate: function onUpdate(v) {
        var _a;

        options.onUpdate(v);
        (_a = valueTransition.onUpdate) === null || _a === void 0 ? void 0 : _a.call(valueTransition, v);
      },
      onComplete: function onComplete() {
        var _a;

        options.onComplete();
        (_a = valueTransition.onComplete) === null || _a === void 0 ? void 0 : _a.call(valueTransition);
      }
    }));
  }

  function set() {
    var _a;

    value.set(target);
    onComplete();
    (_a = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onComplete) === null || _a === void 0 ? void 0 : _a.call(valueTransition);
    return {
      stop: function stop() {}
    };
  }

  return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set : start;
}

function isZero(value) {
  return value === 0 || typeof value === "string" && parseFloat(value) === 0 && value.indexOf(" ") === -1;
}

function getZeroUnit(potentialUnitType) {
  return typeof potentialUnitType === "number" ? 0 : getAnimatableNone$1("", potentialUnitType);
}

function getValueTransition(transition, key) {
  return transition[key] || transition["default"] || transition;
}
/**
 * Start animation on a MotionValue. This function is an interface between
 * Framer Motion and Popmotion
 *
 * @internal
 */


function startAnimation(key, value, target, transition) {
  if (transition === void 0) {
    transition = {};
  }

  return value.start(function (onComplete) {
    var delayTimer;
    var controls;
    var animation = getAnimation(key, value, target, transition, onComplete);
    var delay = getDelayFromTransition(transition, key);

    var start = function start() {
      return controls = animation();
    };

    if (delay) {
      delayTimer = setTimeout(start, secondsToMilliseconds(delay));
    } else {
      start();
    }

    return function () {
      clearTimeout(delayTimer);
      controls === null || controls === void 0 ? void 0 : controls.stop();
    };
  });
}

/**
 * Check if value is a numerical string, ie a string that is purely a number eg "100" or "-100.1"
 */
var isNumericalString = function isNumericalString(v) {
  return /^\-?\d*\.?\d+$/.test(v);
};

function addUniqueItem(arr, item) {
  arr.indexOf(item) === -1 && arr.push(item);
}

function removeItem(arr, item) {
  var index = arr.indexOf(item);
  index > -1 && arr.splice(index, 1);
}

var SubscriptionManager =
/** @class */
function () {
  function SubscriptionManager() {
    this.subscriptions = [];
  }

  SubscriptionManager.prototype.add = function (handler) {
    var _this = this;

    addUniqueItem(this.subscriptions, handler);
    return function () {
      return removeItem(_this.subscriptions, handler);
    };
  };

  SubscriptionManager.prototype.notify = function (a, b, c) {
    var numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions) return;

    if (numSubscriptions === 1) {
      /**
       * If there's only a single handler we can just call it without invoking a loop.
       */
      this.subscriptions[0](a, b, c);
    } else {
      for (var i = 0; i < numSubscriptions; i++) {
        /**
         * Check whether the handler exists before firing as it's possible
         * the subscriptions were modified during this loop running.
         */
        var handler = this.subscriptions[i];
        handler && handler(a, b, c);
      }
    }
  };

  SubscriptionManager.prototype.getSize = function () {
    return this.subscriptions.length;
  };

  SubscriptionManager.prototype.clear = function () {
    this.subscriptions.length = 0;
  };

  return SubscriptionManager;
}();

var isFloat = function isFloat(value) {
  return !isNaN(parseFloat(value));
};
/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */


var MotionValue =
/** @class */
function () {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  function MotionValue(init) {
    var _this = this;
    /**
     * Duration, in milliseconds, since last updating frame.
     *
     * @internal
     */


    this.timeDelta = 0;
    /**
     * Timestamp of the last time this `MotionValue` was updated.
     *
     * @internal
     */

    this.lastUpdated = 0;
    /**
     * Functions to notify when the `MotionValue` updates.
     *
     * @internal
     */

    this.updateSubscribers = new SubscriptionManager();
    /**
     * Functions to notify when the velocity updates.
     *
     * @internal
     */

    this.velocityUpdateSubscribers = new SubscriptionManager();
    /**
     * Functions to notify when the `MotionValue` updates and `render` is set to `true`.
     *
     * @internal
     */

    this.renderSubscribers = new SubscriptionManager();
    /**
     * Tracks whether this value can output a velocity. Currently this is only true
     * if the value is numerical, but we might be able to widen the scope here and support
     * other value types.
     *
     * @internal
     */

    this.canTrackVelocity = false;

    this.updateAndNotify = function (v, render) {
      if (render === void 0) {
        render = true;
      }

      _this.prev = _this.current;
      _this.current = v; // Update timestamp

      var _a = getFrameData(),
          delta = _a.delta,
          timestamp = _a.timestamp;

      if (_this.lastUpdated !== timestamp) {
        _this.timeDelta = delta;
        _this.lastUpdated = timestamp;
        sync.postRender(_this.scheduleVelocityCheck);
      } // Update update subscribers


      if (_this.prev !== _this.current) {
        _this.updateSubscribers.notify(_this.current);
      } // Update velocity subscribers


      if (_this.velocityUpdateSubscribers.getSize()) {
        _this.velocityUpdateSubscribers.notify(_this.getVelocity());
      } // Update render subscribers


      if (render) {
        _this.renderSubscribers.notify(_this.current);
      }
    };
    /**
     * Schedule a velocity check for the next frame.
     *
     * This is an instanced and bound function to prevent generating a new
     * function once per frame.
     *
     * @internal
     */


    this.scheduleVelocityCheck = function () {
      return sync.postRender(_this.velocityCheck);
    };
    /**
     * Updates `prev` with `current` if the value hasn't been updated this frame.
     * This ensures velocity calculations return `0`.
     *
     * This is an instanced and bound function to prevent generating a new
     * function once per frame.
     *
     * @internal
     */


    this.velocityCheck = function (_a) {
      var timestamp = _a.timestamp;

      if (timestamp !== _this.lastUpdated) {
        _this.prev = _this.current;

        _this.velocityUpdateSubscribers.notify(_this.getVelocity());
      }
    };

    this.hasAnimated = false;
    this.prev = this.current = init;
    this.canTrackVelocity = isFloat(this.current);
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * @library
   *
   * ```jsx
   * function MyComponent() {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.onChange(updateOpacity)
   *     const unsubscribeY = y.onChange(updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <Frame x={x} />
   * }
   * ```
   *
   * @motion
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.onChange(updateOpacity)
   *     const unsubscribeY = y.onChange(updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @internalremarks
   *
   * We could look into a `useOnChange` hook if the above lifecycle management proves confusing.
   *
   * ```jsx
   * useOnChange(x, () => {})
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @public
   */


  MotionValue.prototype.onChange = function (subscription) {
    return this.updateSubscribers.add(subscription);
  };

  MotionValue.prototype.clearListeners = function () {
    this.updateSubscribers.clear();
  };
  /**
   * Adds a function that will be notified when the `MotionValue` requests a render.
   *
   * @param subscriber - A function that's provided the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @internal
   */


  MotionValue.prototype.onRenderRequest = function (subscription) {
    // Render immediately
    subscription(this.get());
    return this.renderSubscribers.add(subscription);
  };
  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @internal
   */


  MotionValue.prototype.attach = function (passiveEffect) {
    this.passiveEffect = passiveEffect;
  };
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */


  MotionValue.prototype.set = function (v, render) {
    if (render === void 0) {
      render = true;
    }

    if (!render || !this.passiveEffect) {
      this.updateAndNotify(v, render);
    } else {
      this.passiveEffect(v, this.updateAndNotify);
    }
  };
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */


  MotionValue.prototype.get = function () {
    return this.current;
  };
  /**
   * @public
   */


  MotionValue.prototype.getPrevious = function () {
    return this.prev;
  };
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */


  MotionValue.prototype.getVelocity = function () {
    // This could be isFloat(this.prev) && isFloat(this.current), but that would be wasteful
    return this.canTrackVelocity ? // These casts could be avoided if parseFloat would be typed better
    velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
  };
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   *
   * @internal
   */


  MotionValue.prototype.start = function (animation) {
    var _this = this;

    this.stop();
    return new Promise(function (resolve) {
      _this.hasAnimated = true;
      _this.stopAnimation = animation(resolve);
    }).then(function () {
      return _this.clearAnimation();
    });
  };
  /**
   * Stop the currently active animation.
   *
   * @public
   */


  MotionValue.prototype.stop = function () {
    if (this.stopAnimation) this.stopAnimation();
    this.clearAnimation();
  };
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */


  MotionValue.prototype.isAnimating = function () {
    return !!this.stopAnimation;
  };

  MotionValue.prototype.clearAnimation = function () {
    this.stopAnimation = null;
  };
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */


  MotionValue.prototype.destroy = function () {
    this.updateSubscribers.clear();
    this.renderSubscribers.clear();
    this.stop();
  };

  return MotionValue;
}();
/**
 * @internal
 */


function motionValue(init) {
  return new MotionValue(init);
}

/**
 * Tests a provided value against a ValueType
 */
var testValueType = function testValueType(v) {
  return function (type) {
    return type.test(v);
  };
};

/**
 * ValueType for "auto"
 */
var auto = {
  test: function test(v) {
    return v === "auto";
  },
  parse: function parse(v) {
    return v;
  }
};

/**
 * A list of value types commonly used for dimensions
 */

var dimensionValueTypes = [number, px$1, percent, degrees, vw, vh, auto];
/**
 * Tests a dimensional value against the list of dimension ValueTypes
 */

var findDimensionValueType = function findDimensionValueType(v) {
  return dimensionValueTypes.find(testValueType(v));
};

/**
 * A list of all ValueTypes
 */

var valueTypes = __spreadArray(__spreadArray([], __read(dimensionValueTypes)), [color$1, complex]);
/**
 * Tests a value against the list of ValueTypes
 */


var findValueType = function findValueType(v) {
  return valueTypes.find(testValueType(v));
};

/**
 * Set VisualElement's MotionValue, creating a new MotionValue for it if
 * it doesn't exist.
 */

function setMotionValue(visualElement, key, value) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key).set(value);
  } else {
    visualElement.addValue(key, motionValue(value));
  }
}

function setTarget(visualElement, definition) {
  var resolved = resolveVariant(visualElement, definition);

  var _a = resolved ? visualElement.makeTargetAnimatable(resolved, false) : {},
      _b = _a.transitionEnd,
      transitionEnd = _b === void 0 ? {} : _b;

  _a.transition;

  var target = __rest(_a, ["transitionEnd", "transition"]);

  target = _assign(_assign({}, target), transitionEnd);

  for (var key in target) {
    var value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement, key, value);
  }
}

function checkTargetForNewValues(visualElement, target, origin) {
  var _a, _b, _c;

  var _d;

  var newValueKeys = Object.keys(target).filter(function (key) {
    return !visualElement.hasValue(key);
  });
  var numNewValues = newValueKeys.length;
  if (!numNewValues) return;

  for (var i = 0; i < numNewValues; i++) {
    var key = newValueKeys[i];
    var targetValue = target[key];
    var value = null;
    /**
     * If the target is a series of keyframes, we can use the first value
     * in the array. If this first value is null, we'll still need to read from the DOM.
     */

    if (Array.isArray(targetValue)) {
      value = targetValue[0];
    }
    /**
     * If the target isn't keyframes, or the first keyframe was null, we need to
     * first check if an origin value was explicitly defined in the transition as "from",
     * if not read the value from the DOM. As an absolute fallback, take the defined target value.
     */


    if (value === null) {
      value = (_b = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
    }
    /**
     * If value is still undefined or null, ignore it. Preferably this would throw,
     * but this was causing issues in Framer.
     */


    if (value === undefined || value === null) continue;

    if (typeof value === "string" && isNumericalString(value)) {
      // If this is a number read as a string, ie "0" or "200", convert it to a number
      value = parseFloat(value);
    } else if (!findValueType(value) && complex.test(targetValue)) {
      value = getAnimatableNone$1(key, targetValue);
    }

    visualElement.addValue(key, motionValue(value));
    (_c = (_d = origin)[key]) !== null && _c !== void 0 ? _c : _d[key] = value;
    visualElement.setBaseTarget(key, value);
  }
}

function getOriginFromTransition(key, transition) {
  if (!transition) return;
  var valueTransition = transition[key] || transition["default"] || transition;
  return valueTransition.from;
}

function getOrigin(target, transition, visualElement) {
  var _a, _b;

  var origin = {};

  for (var key in target) {
    origin[key] = (_a = getOriginFromTransition(key, transition)) !== null && _a !== void 0 ? _a : (_b = visualElement.getValue(key)) === null || _b === void 0 ? void 0 : _b.get();
  }

  return origin;
}

/**
 * @internal
 */

function animateVisualElement(visualElement, definition, options) {
  if (options === void 0) {
    options = {};
  }

  visualElement.notifyAnimationStart();
  var animation;

  if (Array.isArray(definition)) {
    var animations = definition.map(function (variant) {
      return animateVariant(visualElement, variant, options);
    });
    animation = Promise.all(animations);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement, definition, options);
  } else {
    var resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
    animation = animateTarget(visualElement, resolvedDefinition, options);
  }

  return animation.then(function () {
    return visualElement.notifyAnimationComplete(definition);
  });
}

function animateVariant(visualElement, variant, options) {
  var _a;

  if (options === void 0) {
    options = {};
  }

  var resolved = resolveVariant(visualElement, variant, options.custom);
  var _b = (resolved || {}).transition,
      transition = _b === void 0 ? visualElement.getDefaultTransition() || {} : _b;

  if (options.transitionOverride) {
    transition = options.transitionOverride;
  }
  /**
   * If we have a variant, create a callback that runs it as an animation.
   * Otherwise, we resolve a Promise immediately for a composable no-op.
   */


  var getAnimation = resolved ? function () {
    return animateTarget(visualElement, resolved, options);
  } : function () {
    return Promise.resolve();
  };
  /**
   * If we have children, create a callback that runs all their animations.
   * Otherwise, we resolve a Promise immediately for a composable no-op.
   */

  var getChildAnimations = ((_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.size) ? function (forwardDelay) {
    if (forwardDelay === void 0) {
      forwardDelay = 0;
    }

    var _a = transition.delayChildren,
        delayChildren = _a === void 0 ? 0 : _a,
        staggerChildren = transition.staggerChildren,
        staggerDirection = transition.staggerDirection;
    return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
  } : function () {
    return Promise.resolve();
  };
  /**
   * If the transition explicitly defines a "when" option, we need to resolve either
   * this animation or all children animations before playing the other.
   */

  var when = transition.when;

  if (when) {
    var _c = __read(when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation], 2),
        first = _c[0],
        last = _c[1];

    return first().then(last);
  } else {
    return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
  }
}
/**
 * @internal
 */


function animateTarget(visualElement, definition, _a) {
  var _b;

  var _c = _a === void 0 ? {} : _a,
      _d = _c.delay,
      delay = _d === void 0 ? 0 : _d,
      transitionOverride = _c.transitionOverride,
      type = _c.type;

  var _e = visualElement.makeTargetAnimatable(definition),
      _f = _e.transition,
      transition = _f === void 0 ? visualElement.getDefaultTransition() : _f,
      transitionEnd = _e.transitionEnd,
      target = __rest(_e, ["transition", "transitionEnd"]);

  if (transitionOverride) transition = transitionOverride;
  var animations = [];
  var animationTypeState = type && ((_b = visualElement.animationState) === null || _b === void 0 ? void 0 : _b.getState()[type]);

  for (var key in target) {
    var value = visualElement.getValue(key);
    var valueTarget = target[key];

    if (!value || valueTarget === undefined || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }

    var animation = startAnimation(key, value, valueTarget, _assign({
      delay: delay
    }, transition));
    animations.push(animation);
  }

  return Promise.all(animations).then(function () {
    transitionEnd && setTarget(visualElement, transitionEnd);
  });
}

function animateChildren(visualElement, variant, delayChildren, staggerChildren, staggerDirection, options) {
  if (delayChildren === void 0) {
    delayChildren = 0;
  }

  if (staggerChildren === void 0) {
    staggerChildren = 0;
  }

  if (staggerDirection === void 0) {
    staggerDirection = 1;
  }

  var animations = [];
  var maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
  var generateStaggerDuration = staggerDirection === 1 ? function (i) {
    if (i === void 0) {
      i = 0;
    }

    return i * staggerChildren;
  } : function (i) {
    if (i === void 0) {
      i = 0;
    }

    return maxStaggerDuration - i * staggerChildren;
  };
  Array.from(visualElement.variantChildren).sort(sortByTreeOrder).forEach(function (child, i) {
    animations.push(animateVariant(child, variant, _assign(_assign({}, options), {
      delay: delayChildren + generateStaggerDuration(i)
    })).then(function () {
      return child.notifyAnimationComplete(variant);
    }));
  });
  return Promise.all(animations);
}

function sortByTreeOrder(a, b) {
  return a.sortNodePosition(b);
}
/**
 * Decide whether we should block this animation. Previously, we achieved this
 * just by checking whether the key was listed in protectedKeys, but this
 * posed problems if an animation was triggered by afterChildren and protectedKeys
 * had been set to true in the meantime.
 */


function shouldBlockAnimation(_a, key) {
  var protectedKeys = _a.protectedKeys,
      needsAnimating = _a.needsAnimating;
  var shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}

var variantPriorityOrder = [AnimationType.Animate, AnimationType.Hover, AnimationType.Tap, AnimationType.Drag, AnimationType.Focus, AnimationType.Exit];

var reversePriorityOrder = __spreadArray([], __read(variantPriorityOrder)).reverse();

var numAnimationTypes = variantPriorityOrder.length;

function animateList(visualElement) {
  return function (animations) {
    return Promise.all(animations.map(function (_a) {
      var animation = _a.animation,
          options = _a.options;
      return animateVisualElement(visualElement, animation, options);
    }));
  };
}

function createAnimationState(visualElement) {
  var animate = animateList(visualElement);
  var state = createState();
  var allAnimatedKeys = {};
  var isInitialRender = true;
  /**
   * This function will be used to reduce the animation definitions for
   * each active animation type into an object of resolved values for it.
   */

  var buildResolvedTypeValues = function buildResolvedTypeValues(acc, definition) {
    var resolved = resolveVariant(visualElement, definition);

    if (resolved) {
      resolved.transition;

      var transitionEnd = resolved.transitionEnd,
          target = __rest(resolved, ["transition", "transitionEnd"]);

      acc = _assign(_assign(_assign({}, acc), target), transitionEnd);
    }

    return acc;
  };

  function isAnimated(key) {
    return allAnimatedKeys[key] !== undefined;
  }
  /**
   * This just allows us to inject mocked animation functions
   * @internal
   */


  function setAnimateFunction(makeAnimator) {
    animate = makeAnimator(visualElement);
  }
  /**
   * When we receive new props, we need to:
   * 1. Create a list of protected keys for each type. This is a directory of
   *    value keys that are currently being "handled" by types of a higher priority
   *    so that whenever an animation is played of a given type, these values are
   *    protected from being animated.
   * 2. Determine if an animation type needs animating.
   * 3. Determine if any values have been removed from a type and figure out
   *    what to animate those to.
   */


  function animateChanges(options, changedActiveType) {
    var _a;

    var props = visualElement.getProps();
    var context = visualElement.getVariantContext(true) || {};
    /**
     * A list of animations that we'll build into as we iterate through the animation
     * types. This will get executed at the end of the function.
     */

    var animations = [];
    /**
     * Keep track of which values have been removed. Then, as we hit lower priority
     * animation types, we can check if they contain removed values and animate to that.
     */

    var removedKeys = new Set();
    /**
     * A dictionary of all encountered keys. This is an object to let us build into and
     * copy it without iteration. Each time we hit an animation type we set its protected
     * keys - the keys its not allowed to animate - to the latest version of this object.
     */

    var encounteredKeys = {};
    /**
     * If a variant has been removed at a given index, and this component is controlling
     * variant animations, we want to ensure lower-priority variants are forced to animate.
     */

    var removedVariantIndex = Infinity;

    var _loop_1 = function _loop_1(i) {
      var type = reversePriorityOrder[i];
      var typeState = state[type];
      var prop = (_a = props[type]) !== null && _a !== void 0 ? _a : context[type];
      var propIsVariant = isVariantLabel(prop);
      /**
       * If this type has *just* changed isActive status, set activeDelta
       * to that status. Otherwise set to null.
       */

      var activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false) removedVariantIndex = i;
      /**
       * If this prop is an inherited variant, rather than been set directly on the
       * component itself, we want to make sure we allow the parent to trigger animations.
       *
       * TODO: Can probably change this to a !isControllingVariants check
       */

      var isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      /**
       *
       */

      if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) {
        isInherited = false;
      }
      /**
       * Set all encountered keys so far as the protected keys for this type. This will
       * be any key that has been animated or otherwise handled by active, higher-priortiy types.
       */


      typeState.protectedKeys = _assign({}, encounteredKeys); // Check if we can skip analysing this prop early

      if ( // If it isn't active and hasn't *just* been set as inactive
      !typeState.isActive && activeDelta === null || // If we didn't and don't have any defined prop for this animation type
      !prop && !typeState.prevProp || // Or if the prop doesn't define an animation
      isAnimationControls(prop) || typeof prop === "boolean") {
        return "continue";
      }
      /**
       * As we go look through the values defined on this type, if we detect
       * a changed value or a value that was removed in a higher priority, we set
       * this to true and add this prop to the animation list.
       */


      var shouldAnimateType = variantsHaveChanged(typeState.prevProp, prop) || // If we're making this variant active, we want to always make it active
      type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || // If we removed a higher-priority variant (i is in reverse order)
      i > removedVariantIndex && propIsVariant;
      /**
       * As animations can be set as variant lists, variants or target objects, we
       * coerce everything to an array if it isn't one already
       */

      var definitionList = Array.isArray(prop) ? prop : [prop];
      /**
       * Build an object of all the resolved values. We'll use this in the subsequent
       * animateChanges calls to determine whether a value has changed.
       */

      var resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
      if (activeDelta === false) resolvedValues = {};
      /**
       * Now we need to loop through all the keys in the prev prop and this prop,
       * and decide:
       * 1. If the value has changed, and needs animating
       * 2. If it has been removed, and needs adding to the removedKeys set
       * 3. If it has been removed in a higher priority type and needs animating
       * 4. If it hasn't been removed in a higher priority but hasn't changed, and
       *    needs adding to the type's protectedKeys list.
       */

      var _b = typeState.prevResolvedValues,
          prevResolvedValues = _b === void 0 ? {} : _b;

      var allKeys = _assign(_assign({}, prevResolvedValues), resolvedValues);

      var markToAnimate = function markToAnimate(key) {
        shouldAnimateType = true;
        removedKeys["delete"](key);
        typeState.needsAnimating[key] = true;
      };

      for (var key in allKeys) {
        var next = resolvedValues[key];
        var prev = prevResolvedValues[key]; // If we've already handled this we can just skip ahead

        if (encounteredKeys.hasOwnProperty(key)) continue;
        /**
         * If the value has changed, we probably want to animate it.
         */

        if (next !== prev) {
          /**
           * If both values are keyframes, we need to shallow compare them to
           * detect whether any value has changed. If it has, we animate it.
           */
          if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
            if (!shallowCompare(next, prev)) {
              markToAnimate(key);
            } else {
              /**
               * If it hasn't changed, we want to ensure it doesn't animate by
               * adding it to the list of protected keys.
               */
              typeState.protectedKeys[key] = true;
            }
          } else if (next !== undefined) {
            // If next is defined and doesn't equal prev, it needs animating
            markToAnimate(key);
          } else {
            // If it's undefined, it's been removed.
            removedKeys.add(key);
          }
        } else if (next !== undefined && removedKeys.has(key)) {
          /**
           * If next hasn't changed and it isn't undefined, we want to check if it's
           * been removed by a higher priority
           */
          markToAnimate(key);
        } else {
          /**
           * If it hasn't changed, we add it to the list of protected values
           * to ensure it doesn't get animated.
           */
          typeState.protectedKeys[key] = true;
        }
      }
      /**
       * Update the typeState so next time animateChanges is called we can compare the
       * latest prop and resolvedValues to these.
       */


      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      /**
       *
       */

      if (typeState.isActive) {
        encounteredKeys = _assign(_assign({}, encounteredKeys), resolvedValues);
      }

      if (isInitialRender && visualElement.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      /**
       * If this is an inherited prop we want to hard-block animations
       * TODO: Test as this should probably still handle animations triggered
       * by removed values?
       */


      if (shouldAnimateType && !isInherited) {
        animations.push.apply(animations, __spreadArray([], __read(definitionList.map(function (animation) {
          return {
            animation: animation,
            options: _assign({
              type: type
            }, options)
          };
        }))));
      }
    };
    /**
     * Iterate through all animation types in reverse priority order. For each, we want to
     * detect which values it's handling and whether or not they've changed (and therefore
     * need to be animated). If any values have been removed, we want to detect those in
     * lower priority props and flag for animation.
     */


    for (var i = 0; i < numAnimationTypes; i++) {
      _loop_1(i);
    }

    allAnimatedKeys = _assign({}, encounteredKeys);
    /**
     * If there are some removed value that haven't been dealt with,
     * we need to create a new animation that falls back either to the value
     * defined in the style prop, or the last read value.
     */

    if (removedKeys.size) {
      var fallbackAnimation_1 = {};
      removedKeys.forEach(function (key) {
        var fallbackTarget = visualElement.getBaseTarget(key);

        if (fallbackTarget !== undefined) {
          fallbackAnimation_1[key] = fallbackTarget;
        }
      });
      animations.push({
        animation: fallbackAnimation_1
      });
    }

    var shouldAnimate = Boolean(animations.length);

    if (isInitialRender && props.initial === false && !visualElement.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }

    isInitialRender = false;
    return shouldAnimate ? animate(animations) : Promise.resolve();
  }
  /**
   * Change whether a certain animation type is active.
   */


  function setActive(type, isActive, options) {
    var _a; // If the active state hasn't changed, we can safely do nothing here


    if (state[type].isActive === isActive) return Promise.resolve(); // Propagate active change to children

    (_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach(function (child) {
      var _a;

      return (_a = child.animationState) === null || _a === void 0 ? void 0 : _a.setActive(type, isActive);
    });
    state[type].isActive = isActive;
    return animateChanges(options, type);
  }

  return {
    isAnimated: isAnimated,
    animateChanges: animateChanges,
    setActive: setActive,
    setAnimateFunction: setAnimateFunction,
    getState: function getState() {
      return state;
    }
  };
}

function variantsHaveChanged(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (isVariantLabels(next)) {
    return !shallowCompare(next, prev);
  }

  return false;
}

function createTypeState(isActive) {
  if (isActive === void 0) {
    isActive = false;
  }

  return {
    isActive: isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}

function createState() {
  var _a;

  return _a = {}, _a[AnimationType.Animate] = createTypeState(true), _a[AnimationType.Hover] = createTypeState(), _a[AnimationType.Tap] = createTypeState(), _a[AnimationType.Drag] = createTypeState(), _a[AnimationType.Focus] = createTypeState(), _a[AnimationType.Exit] = createTypeState(), _a;
}

var animations = {
  animation: makeRenderlessComponent(function (_a) {
    var visualElement = _a.visualElement,
        animate = _a.animate;
    /**
     * We dynamically generate the AnimationState manager as it contains a reference
     * to the underlying animation library. We only want to load that if we load this,
     * so people can optionally code split it out using the `m` component.
     */

    visualElement.animationState || (visualElement.animationState = createAnimationState(visualElement));
    /**
     * Subscribe any provided AnimationControls to the component's VisualElement
     */

    if (isAnimationControls(animate)) {
      react.useEffect(function () {
        return animate.subscribe(visualElement);
      }, [animate]);
    }
  }),
  exit: makeRenderlessComponent(function (props) {
    var custom = props.custom,
        visualElement = props.visualElement;

    var _a = __read(usePresence(), 2),
        isPresent = _a[0],
        onExitComplete = _a[1];

    var presenceContext = react.useContext(PresenceContext);
    react.useEffect(function () {
      var _a, _b;

      var animation = (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Exit, !isPresent, {
        custom: (_b = presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.custom) !== null && _b !== void 0 ? _b : custom
      });
      !isPresent && (animation === null || animation === void 0 ? void 0 : animation.then(onExitComplete));
    }, [isPresent]);
  })
};

/**
 * @internal
 */

var PanSession =
/** @class */
function () {
  function PanSession(event, handlers, _a) {
    var _this = this;

    var _b = _a === void 0 ? {} : _a,
        transformPagePoint = _b.transformPagePoint;
    /**
     * @internal
     */


    this.startEvent = null;
    /**
     * @internal
     */

    this.lastMoveEvent = null;
    /**
     * @internal
     */

    this.lastMoveEventInfo = null;
    /**
     * @internal
     */

    this.handlers = {};

    this.updatePoint = function () {
      if (!(_this.lastMoveEvent && _this.lastMoveEventInfo)) return;
      var info = getPanInfo(_this.lastMoveEventInfo, _this.history);
      var isPanStarted = _this.startEvent !== null; // Only start panning if the offset is larger than 3 pixels. If we make it
      // any larger than this we'll want to reset the pointer history
      // on the first update to avoid visual snapping to the cursoe.

      var isDistancePastThreshold = distance(info.offset, {
        x: 0,
        y: 0
      }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold) return;
      var point = info.point;
      var timestamp = getFrameData().timestamp;

      _this.history.push(_assign(_assign({}, point), {
        timestamp: timestamp
      }));

      var _a = _this.handlers,
          onStart = _a.onStart,
          onMove = _a.onMove;

      if (!isPanStarted) {
        onStart && onStart(_this.lastMoveEvent, info);
        _this.startEvent = _this.lastMoveEvent;
      }

      onMove && onMove(_this.lastMoveEvent, info);
    };

    this.handlePointerMove = function (event, info) {
      _this.lastMoveEvent = event;
      _this.lastMoveEventInfo = transformPoint(info, _this.transformPagePoint); // Because Safari doesn't trigger mouseup events when it's above a `<select>`

      if (isMouseEvent(event) && event.buttons === 0) {
        _this.handlePointerUp(event, info);

        return;
      } // Throttle mouse move event to once per frame


      sync.update(_this.updatePoint, true);
    };

    this.handlePointerUp = function (event, info) {
      _this.end();

      var _a = _this.handlers,
          onEnd = _a.onEnd,
          onSessionEnd = _a.onSessionEnd;
      var panInfo = getPanInfo(transformPoint(info, _this.transformPagePoint), _this.history);

      if (_this.startEvent && onEnd) {
        onEnd(event, panInfo);
      }

      onSessionEnd && onSessionEnd(event, panInfo);
    }; // If we have more than one touch, don't start detecting this gesture


    if (isTouchEvent(event) && event.touches.length > 1) return;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    var info = extractEventInfo(event);
    var initialInfo = transformPoint(info, this.transformPagePoint);
    var point = initialInfo.point;
    var timestamp = getFrameData().timestamp;
    this.history = [_assign(_assign({}, point), {
      timestamp: timestamp
    })];
    var onSessionStart = handlers.onSessionStart;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
  }

  PanSession.prototype.updateHandlers = function (handlers) {
    this.handlers = handlers;
  };

  PanSession.prototype.end = function () {
    this.removeListeners && this.removeListeners();
    cancelSync.update(this.updatePoint);
  };

  return PanSession;
}();

function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? {
    point: transformPagePoint(info.point)
  } : info;
}

function subtractPoint(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
}

function getPanInfo(_a, history) {
  var point = _a.point;
  return {
    point: point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity$1(history, 0.1)
  };
}

function startDevicePoint(history) {
  return history[0];
}

function lastDevicePoint(history) {
  return history[history.length - 1];
}

function getVelocity$1(history, timeDelta) {
  if (history.length < 2) {
    return {
      x: 0,
      y: 0
    };
  }

  var i = history.length - 1;
  var timestampedPoint = null;
  var lastPoint = lastDevicePoint(history);

  while (i >= 0) {
    timestampedPoint = history[i];

    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }

    i--;
  }

  if (!timestampedPoint) {
    return {
      x: 0,
      y: 0
    };
  }

  var time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1000;

  if (time === 0) {
    return {
      x: 0,
      y: 0
    };
  }

  var currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time
  };

  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }

  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }

  return currentVelocity;
}

function noop$2(any) {
  return any;
}

/**
 * Bounding boxes tend to be defined as top, left, right, bottom. For various operations
 * it's easier to consider each axis individually. This function returns a bounding box
 * as a map of single-axis min/max values.
 */

function convertBoundingBoxToAxisBox(_a) {
  var top = _a.top,
      left = _a.left,
      right = _a.right,
      bottom = _a.bottom;
  return {
    x: {
      min: left,
      max: right
    },
    y: {
      min: top,
      max: bottom
    }
  };
}

function convertAxisBoxToBoundingBox(_a) {
  var x = _a.x,
      y = _a.y;
  return {
    top: y.min,
    bottom: y.max,
    left: x.min,
    right: x.max
  };
}
/**
 * Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
 * provided by Framer to allow measured points to be corrected for device scaling. This is used
 * when measuring DOM elements and DOM event points.
 */


function transformBoundingBox(_a, transformPoint) {
  var top = _a.top,
      left = _a.left,
      bottom = _a.bottom,
      right = _a.right;

  if (transformPoint === void 0) {
    transformPoint = noop$2;
  }

  var topLeft = transformPoint({
    x: left,
    y: top
  });
  var bottomRight = transformPoint({
    x: right,
    y: bottom
  });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}
/**
 * Create an empty axis box of zero size
 */


function axisBox() {
  return {
    x: {
      min: 0,
      max: 1
    },
    y: {
      min: 0,
      max: 1
    }
  };
}

function copyAxisBox(box) {
  return {
    x: _assign({}, box.x),
    y: _assign({}, box.y)
  };
}
/**
 * Create an empty box delta
 */


var zeroDelta = {
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
};

function delta() {
  return {
    x: _assign({}, zeroDelta),
    y: _assign({}, zeroDelta)
  };
}

// Call a handler once for each axis
function eachAxis(handler) {
  return [handler("x"), handler("y")];
}

/**
 * Apply constraints to a point. These constraints are both physical along an
 * axis, and an elastic factor that determines how much to constrain the point
 * by if it does lie outside the defined parameters.
 */

function applyConstraints(point, _a, elastic) {
  var min = _a.min,
      max = _a.max;

  if (min !== undefined && point < min) {
    // If we have a min point defined, and this is outside of that, constrain
    point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== undefined && point > max) {
    // If we have a max point defined, and this is outside of that, constrain
    point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
  }

  return point;
}
/**
 * Calculates a min projection point based on a pointer, pointer progress
 * within the drag target, and constraints.
 *
 * For instance if an element was 100px width, we were dragging from 0.25
 * along this axis, the pointer is at 200px, and there were no constraints,
 * we would calculate a min projection point of 175px.
 */


function calcConstrainedMinPoint(point, length, progress, constraints, elastic) {
  // Calculate a min point for this axis and apply it to the current pointer
  var min = point - length * progress;
  return constraints ? applyConstraints(min, constraints, elastic) : min;
}
/**
 * Calculate constraints in terms of the viewport when defined relatively to the
 * measured axis. This is measured from the nearest edge, so a max constraint of 200
 * on an axis with a max value of 300 would return a constraint of 500 - axis length
 */


function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== undefined ? axis.min + min : undefined,
    max: max !== undefined ? axis.max + max - (axis.max - axis.min) : undefined
  };
}
/**
 * Calculate constraints in terms of the viewport when
 * defined relatively to the measured bounding box.
 */


function calcRelativeConstraints(layoutBox, _a) {
  var top = _a.top,
      left = _a.left,
      bottom = _a.bottom,
      right = _a.right;
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative axis
 */


function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  var _a;

  var min = constraintsAxis.min - layoutAxis.min;
  var max = constraintsAxis.max - layoutAxis.max; // If the constraints axis is actually smaller than the layout axis then we can
  // flip the constraints

  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    _a = __read([max, min], 2), min = _a[0], max = _a[1];
  }

  return {
    min: layoutAxis.min + min,
    max: layoutAxis.min + max
  };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative box
 */


function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
/**
 * Calculate the an axis position based on two axes and a progress value.
 */


function calcPositionFromProgress(axis, constraints, progress) {
  var axisLength = axis.max - axis.min;
  var min = mix(constraints.min, constraints.max - axisLength, progress);
  return {
    min: min,
    max: min + axisLength
  };
}
/**
 * Rebase the calculated viewport constraints relative to the layout.min point.
 */


function rebaseAxisConstraints(layout, constraints) {
  var relativeConstraints = {};

  if (constraints.min !== undefined) {
    relativeConstraints.min = constraints.min - layout.min;
  }

  if (constraints.max !== undefined) {
    relativeConstraints.max = constraints.max - layout.min;
  }

  return relativeConstraints;
}

var defaultElastic = 0.35;
/**
 * Accepts a dragElastic prop and returns resolved elastic values for each axis.
 */

function resolveDragElastic(dragElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }

  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}

function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}

function resolvePointElastic(dragElastic, label) {
  var _a;

  return typeof dragElastic === "number" ? dragElastic : (_a = dragElastic[label]) !== null && _a !== void 0 ? _a : 0;
}

/**
 * Measure and return the element bounding box.
 *
 * We convert the box into an AxisBox2D to make it easier to work with each axis
 * individually and programmatically.
 *
 * This function optionally accepts a transformPagePoint function which allows us to compensate
 * for, for instance, measuring the element within a scaled plane like a Framer devivce preview component.
 */

function getBoundingBox(element, transformPagePoint) {
  var box = element.getBoundingClientRect();
  return convertBoundingBoxToAxisBox(transformBoundingBox(box, transformPagePoint));
}

var clampProgress = function clampProgress(v) {
  return clamp$1(0, 1, v);
};
/**
 * Returns true if the provided value is within maxDistance of the provided target
 */


function isNear(value, target, maxDistance) {
  if (target === void 0) {
    target = 0;
  }

  if (maxDistance === void 0) {
    maxDistance = 0.01;
  }

  return distance(value, target) < maxDistance;
}

function calcLength(axis) {
  return axis.max - axis.min;
}
/**
 * Calculate a transform origin relative to the source axis, between 0-1, that results
 * in an asthetically pleasing scale/transform needed to project from source to target.
 */


function calcOrigin$1(source, target) {
  var origin = 0.5;
  var sourceLength = calcLength(source);
  var targetLength = calcLength(target);

  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }

  return clampProgress(origin);
}
/**
 * Update the AxisDelta with a transform that projects source into target.
 *
 * The transform `origin` is optional. If not provided, it'll be automatically
 * calculated based on the relative positions of the two bounding boxes.
 */


function updateAxisDelta(delta, source, target, origin) {
  if (origin === void 0) {
    origin = 0.5;
  }

  delta.origin = origin;
  delta.originPoint = mix(source.min, source.max, delta.origin);
  delta.scale = calcLength(target) / calcLength(source);
  if (isNear(delta.scale, 1, 0.0001)) delta.scale = 1;
  delta.translate = mix(target.min, target.max, delta.origin) - delta.originPoint;
  if (isNear(delta.translate)) delta.translate = 0;
}
/**
 * Update the BoxDelta with a transform that projects the source into the target.
 *
 * The transform `origin` is optional. If not provided, it'll be automatically
 * calculated based on the relative positions of the two bounding boxes.
 */


function updateBoxDelta(delta, source, target, origin) {
  updateAxisDelta(delta.x, source.x, target.x, defaultOrigin(origin.originX));
  updateAxisDelta(delta.y, source.y, target.y, defaultOrigin(origin.originY));
}
/**
 * Currently this only accepts numerical origins, measured as 0-1, but could
 * accept pixel values by comparing to the target axis.
 */


function defaultOrigin(origin) {
  return typeof origin === "number" ? origin : 0.5;
}

function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}

function calcRelativeBox(projection, parentProjection) {
  calcRelativeAxis(projection.target.x, projection.relativeTarget.x, parentProjection.target.x);
  calcRelativeAxis(projection.target.y, projection.relativeTarget.y, parentProjection.target.y);
}

var compareByDepth = function compareByDepth(a, b) {
  return a.depth - b.depth;
};

function isProjecting(visualElement) {
  var isEnabled = visualElement.projection.isEnabled;
  return isEnabled || visualElement.shouldResetTransform();
}

function collectProjectingAncestors(visualElement, ancestors) {
  if (ancestors === void 0) {
    ancestors = [];
  }

  var parent = visualElement.parent;
  if (parent) collectProjectingAncestors(parent, ancestors);
  if (isProjecting(visualElement)) ancestors.push(visualElement);
  return ancestors;
}

function collectProjectingChildren(visualElement) {
  var children = [];

  var addChild = function addChild(child) {
    if (isProjecting(child)) children.push(child);
    child.children.forEach(addChild);
  };

  visualElement.children.forEach(addChild);
  return children.sort(compareByDepth);
}
/**
 * Update the layoutState by measuring the DOM layout. This
 * should be called after resetting any layout-affecting transforms.
 */


function updateLayoutMeasurement(visualElement) {
  if (visualElement.shouldResetTransform()) return;
  var layoutState = visualElement.getLayoutState();
  visualElement.notifyBeforeLayoutMeasure(layoutState.layout);
  layoutState.isHydrated = true;
  layoutState.layout = visualElement.measureViewportBox();
  layoutState.layoutCorrected = copyAxisBox(layoutState.layout);
  visualElement.notifyLayoutMeasure(layoutState.layout, visualElement.prevViewportBox || layoutState.layout);
  sync.update(function () {
    return visualElement.rebaseProjectionTarget();
  });
}
/**
 * Record the viewport box as it was before an expected mutation/re-render
 */


function snapshotViewportBox(visualElement) {
  if (visualElement.shouldResetTransform()) return;
  visualElement.prevViewportBox = visualElement.measureViewportBox(false);
  /**
   * Update targetBox to match the prevViewportBox. This is just to ensure
   * that targetBox is affected by scroll in the same way as the measured box
   */

  visualElement.rebaseProjectionTarget(false, visualElement.prevViewportBox);
}

function tweenAxis(target, prev, next, p) {
  target.min = mix(prev.min, next.min, p);
  target.max = mix(prev.max, next.max, p);
}

function calcRelativeOffsetAxis(parent, child) {
  return {
    min: child.min - parent.min,
    max: child.max - parent.min
  };
}

function calcRelativeOffset(parent, child) {
  return {
    x: calcRelativeOffsetAxis(parent.x, child.x),
    y: calcRelativeOffsetAxis(parent.y, child.y)
  };
}

function checkIfParentHasChanged(prev, next) {
  var prevId = prev.getLayoutId();
  var nextId = next.getLayoutId();
  return prevId !== nextId || nextId === undefined && prev !== next;
}

function isDraggable(visualElement) {
  var _a = visualElement.getProps(),
      drag = _a.drag,
      _dragX = _a._dragX;

  return drag && !_dragX;
}

/**
 * Reset an axis to the provided origin box.
 *
 * This is a mutative operation.
 */

function resetAxis(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
/**
 * Reset a box to the provided origin box.
 *
 * This is a mutative operation.
 */


function resetBox(box, originBox) {
  resetAxis(box.x, originBox.x);
  resetAxis(box.y, originBox.y);
}
/**
 * Scales a point based on a factor and an originPoint
 */


function scalePoint(point, scale, originPoint) {
  var distanceFromOrigin = point - originPoint;
  var scaled = scale * distanceFromOrigin;
  return originPoint + scaled;
}
/**
 * Applies a translate/scale delta to a point
 */


function applyPointDelta(point, translate, scale, originPoint, boxScale) {
  if (boxScale !== undefined) {
    point = scalePoint(point, boxScale, originPoint);
  }

  return scalePoint(point, scale, originPoint) + translate;
}
/**
 * Applies a translate/scale delta to an axis
 */


function applyAxisDelta(axis, translate, scale, originPoint, boxScale) {
  if (translate === void 0) {
    translate = 0;
  }

  if (scale === void 0) {
    scale = 1;
  }

  axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Applies a translate/scale delta to a box
 */


function applyBoxDelta(box, _a) {
  var x = _a.x,
      y = _a.y;
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
/**
 * Apply a transform to an axis from the latest resolved motion values.
 * This function basically acts as a bridge between a flat motion value map
 * and applyAxisDelta
 */


function applyAxisTransforms(_final, axis, transforms, _a) {
  var _b = __read(_a, 3),
      key = _b[0],
      scaleKey = _b[1],
      originKey = _b[2]; // Copy the current axis to the final axis before mutation


  _final.min = axis.min;
  _final.max = axis.max;
  var axisOrigin = transforms[originKey] !== undefined ? transforms[originKey] : 0.5;
  var originPoint = mix(axis.min, axis.max, axisOrigin); // Apply the axis delta to the final axis

  applyAxisDelta(_final, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
}
/**
 * The names of the motion values we want to apply as translation, scale and origin.
 */


var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
/**
 * Apply a transform to a box from the latest resolved motion values.
 */

function applyBoxTransforms(finalBox, box, transforms) {
  applyAxisTransforms(finalBox.x, box.x, transforms, xKeys);
  applyAxisTransforms(finalBox.y, box.y, transforms, yKeys);
}
/**
 * Remove a delta from a point. This is essentially the steps of applyPointDelta in reverse
 */


function removePointDelta(point, translate, scale, originPoint, boxScale) {
  point -= translate;
  point = scalePoint(point, 1 / scale, originPoint);

  if (boxScale !== undefined) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }

  return point;
}
/**
 * Remove a delta from an axis. This is essentially the steps of applyAxisDelta in reverse
 */


function removeAxisDelta(axis, translate, scale, origin, boxScale) {
  if (translate === void 0) {
    translate = 0;
  }

  if (scale === void 0) {
    scale = 1;
  }

  if (origin === void 0) {
    origin = 0.5;
  }

  var originPoint = mix(axis.min, axis.max, origin) - translate;
  axis.min = removePointDelta(axis.min, translate, scale, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Remove a transforms from an axis. This is essentially the steps of applyAxisTransforms in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */


function removeAxisTransforms(axis, transforms, _a) {
  var _b = __read(_a, 3),
      key = _b[0],
      scaleKey = _b[1],
      originKey = _b[2];

  removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale);
}
/**
 * Remove a transforms from an box. This is essentially the steps of applyAxisBox in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */


function removeBoxTransforms(box, transforms) {
  removeAxisTransforms(box.x, transforms, xKeys);
  removeAxisTransforms(box.y, transforms, yKeys);
}
/**
 * Apply a tree of deltas to a box. We do this to calculate the effect of all the transforms
 * in a tree upon our box before then calculating how to project it into our desired viewport-relative box
 *
 * This is the final nested loop within updateLayoutDelta for future refactoring
 */


function applyTreeDeltas(box, treeScale, treePath) {
  var treeLength = treePath.length;
  if (!treeLength) return; // Reset the treeScale

  treeScale.x = treeScale.y = 1;
  var node;
  var delta;

  for (var i = 0; i < treeLength; i++) {
    node = treePath[i];
    delta = node.getLayoutState().delta; // Incoporate each ancestor's scale into a culmulative treeScale for this component

    treeScale.x *= delta.x.scale;
    treeScale.y *= delta.y.scale; // Apply each ancestor's calculated delta into this component's recorded layout box

    applyBoxDelta(box, delta); // If this is a draggable ancestor, also incorporate the node's transform to the layout box

    if (isDraggable(node)) {
      applyBoxTransforms(box, box, node.getLatestValues());
    }
  }
}

/**
 * Returns a boolean stating whether or not we converted the projection
 * to relative projection.
 */

function convertToRelativeProjection(visualElement, isLayoutDrag) {
  if (isLayoutDrag === void 0) {
    isLayoutDrag = true;
  }

  var projectionParent = visualElement.getProjectionParent();
  if (!projectionParent) return false;
  var offset;

  if (isLayoutDrag) {
    offset = calcRelativeOffset(projectionParent.projection.target, visualElement.projection.target);
    removeBoxTransforms(offset, projectionParent.getLatestValues());
  } else {
    offset = calcRelativeOffset(projectionParent.getLayoutState().layout, visualElement.getLayoutState().layout);
  }

  eachAxis(function (axis) {
    return visualElement.setProjectionTargetAxis(axis, offset[axis].min, offset[axis].max, true);
  });
  return true;
}

var unresolvedJobs = new Set();

function pushJob(stack, job, pointer) {
  if (!stack[pointer]) stack[pointer] = [];
  stack[pointer].push(job);
}

function batchLayout(callback) {
  unresolvedJobs.add(callback);
  return function () {
    return unresolvedJobs["delete"](callback);
  };
}

function flushLayout() {
  if (!unresolvedJobs.size) return;
  var pointer = 0;
  var reads = [[]];
  var writes = [];

  var setRead = function setRead(job) {
    return pushJob(reads, job, pointer);
  };

  var setWrite = function setWrite(job) {
    pushJob(writes, job, pointer);
    pointer++;
  };
  /**
   * Resolve jobs into their array stacks
   */


  unresolvedJobs.forEach(function (callback) {
    callback(setRead, setWrite);
    pointer = 0;
  });
  unresolvedJobs.clear();
  /**
   * Execute jobs
   */

  var numStacks = writes.length;

  for (var i = 0; i <= numStacks; i++) {
    reads[i] && reads[i].forEach(executeJob);
    writes[i] && writes[i].forEach(executeJob);
  }
}

var executeJob = function executeJob(job) {
  return job();
};

var elementDragControls = new WeakMap();
/**
 *
 */

var lastPointerEvent;

var VisualElementDragControls =
/** @class */
function () {
  function VisualElementDragControls(_a) {
    var visualElement = _a.visualElement;
    /**
     * Track whether we're currently dragging.
     *
     * @internal
     */

    this.isDragging = false;
    /**
     * The current direction of drag, or `null` if both.
     *
     * @internal
     */

    this.currentDirection = null;
    /**
     * The permitted boundaries of travel, in pixels.
     *
     * @internal
     */

    this.constraints = false;
    /**
     * The per-axis resolved elastic values.
     *
     * @internal
     */

    this.elastic = axisBox();
    /**
     * A reference to the host component's latest props.
     *
     * @internal
     */

    this.props = {};
    /**
     * @internal
     */

    this.hasMutatedConstraints = false;
    /**
     * Track the initial position of the cursor relative to the dragging element
     * when dragging starts as a value of 0-1 on each axis. We then use this to calculate
     * an ideal bounding box for the VisualElement renderer to project into every frame.
     *
     * @internal
     */

    this.cursorProgress = {
      x: 0.5,
      y: 0.5
    }; // When updating _dragX, or _dragY instead of the VisualElement,
    // persist their values between drag gestures.

    this.originPoint = {}; // This is a reference to the global drag gesture lock, ensuring only one component
    // can "capture" the drag of one or both axes.
    // TODO: Look into moving this into pansession?

    this.openGlobalLock = null;
    /**
     * @internal
     */

    this.panSession = null;
    this.visualElement = visualElement;
    this.visualElement.enableLayoutProjection();
    elementDragControls.set(visualElement, this);
  }
  /**
   * Instantiate a PanSession for the drag gesture
   *
   * @public
   */


  VisualElementDragControls.prototype.start = function (originEvent, _a) {
    var _this = this;

    var _b = _a === void 0 ? {} : _a,
        _c = _b.snapToCursor,
        snapToCursor = _c === void 0 ? false : _c,
        cursorProgress = _b.cursorProgress;

    var onSessionStart = function onSessionStart(event) {
      var _a; // Stop any animations on both axis values immediately. This allows the user to throw and catch
      // the component.


      _this.stopMotion();
      /**
       * Save the initial point. We'll use this to calculate the pointer's position rather
       * than the one we receive when the gesture actually starts. By then, the pointer will
       * have already moved, and the perception will be of the pointer "slipping" across the element
       */


      var initialPoint = getViewportPointFromEvent(event).point;
      (_a = _this.cancelLayout) === null || _a === void 0 ? void 0 : _a.call(_this);
      _this.cancelLayout = batchLayout(function (read, write) {
        var ancestors = collectProjectingAncestors(_this.visualElement);
        var children = collectProjectingChildren(_this.visualElement);

        var tree = __spreadArray(__spreadArray([], __read(ancestors)), __read(children));

        var hasManuallySetCursorOrigin = false;
        /**
         * Apply a simple lock to the projection target. This ensures no animations
         * can run on the projection box while this lock is active.
         */

        _this.isLayoutDrag() && _this.visualElement.lockProjectionTarget();
        write(function () {
          tree.forEach(function (element) {
            return element.resetTransform();
          });
        });
        read(function () {
          updateLayoutMeasurement(_this.visualElement);
          children.forEach(updateLayoutMeasurement);
        });
        write(function () {
          tree.forEach(function (element) {
            return element.restoreTransform();
          });

          if (snapToCursor) {
            hasManuallySetCursorOrigin = _this.snapToCursor(initialPoint);
          }
        });
        read(function () {
          var isRelativeDrag = Boolean(_this.getAxisMotionValue("x") && !_this.isExternalDrag());

          if (!isRelativeDrag) {
            _this.visualElement.rebaseProjectionTarget(true, _this.visualElement.measureViewportBox(false));
          }

          _this.visualElement.scheduleUpdateLayoutProjection();
          /**
           * When dragging starts, we want to find where the cursor is relative to the bounding box
           * of the element. Every frame, we calculate a new bounding box using this relative position
           * and let the visualElement renderer figure out how to reproject the element into this bounding
           * box.
           *
           * By doing it this way, rather than applying an x/y transform directly to the element,
           * we can ensure the component always visually sticks to the cursor as we'd expect, even
           * if the DOM element itself changes layout as a result of React updates the user might
           * make based on the drag position.
           */


          var projection = _this.visualElement.projection;
          eachAxis(function (axis) {
            if (!hasManuallySetCursorOrigin) {
              var _a = projection.target[axis],
                  min = _a.min,
                  max = _a.max;
              _this.cursorProgress[axis] = cursorProgress ? cursorProgress[axis] : progress(min, max, initialPoint[axis]);
            }
            /**
             * If we have external drag MotionValues, record their origin point. On pointermove
             * we'll apply the pan gesture offset directly to this value.
             */


            var axisValue = _this.getAxisMotionValue(axis);

            if (axisValue) {
              _this.originPoint[axis] = axisValue.get();
            }
          });
        });
        write(function () {
          flushSync.update();
          flushSync.preRender();
          flushSync.render();
          flushSync.postRender();
        });
        read(function () {
          return _this.resolveDragConstraints();
        });
      });
    };

    var onStart = function onStart(event, info) {
      var _a, _b, _c; // Attempt to grab the global drag gesture lock - maybe make this part of PanSession


      var _d = _this.props,
          drag = _d.drag,
          dragPropagation = _d.dragPropagation;

      if (drag && !dragPropagation) {
        if (_this.openGlobalLock) _this.openGlobalLock();
        _this.openGlobalLock = getGlobalLock(drag); // If we don 't have the lock, don't start dragging

        if (!_this.openGlobalLock) return;
      }

      flushLayout(); // Set current drag status

      _this.isDragging = true;
      _this.currentDirection = null; // Fire onDragStart event

      (_b = (_a = _this.props).onDragStart) === null || _b === void 0 ? void 0 : _b.call(_a, event, info);
      (_c = _this.visualElement.animationState) === null || _c === void 0 ? void 0 : _c.setActive(AnimationType.Drag, true);
    };

    var onMove = function onMove(event, info) {
      var _a, _b, _c, _d;

      var _e = _this.props,
          dragPropagation = _e.dragPropagation,
          dragDirectionLock = _e.dragDirectionLock; // If we didn't successfully receive the gesture lock, early return.

      if (!dragPropagation && !_this.openGlobalLock) return;
      var offset = info.offset; // Attempt to detect drag direction if directionLock is true

      if (dragDirectionLock && _this.currentDirection === null) {
        _this.currentDirection = getCurrentDirection(offset); // If we've successfully set a direction, notify listener

        if (_this.currentDirection !== null) {
          (_b = (_a = _this.props).onDirectionLock) === null || _b === void 0 ? void 0 : _b.call(_a, _this.currentDirection);
        }

        return;
      } // Update each point with the latest position


      _this.updateAxis("x", info.point, offset);

      _this.updateAxis("y", info.point, offset); // Fire onDrag event


      (_d = (_c = _this.props).onDrag) === null || _d === void 0 ? void 0 : _d.call(_c, event, info); // Update the last pointer event

      lastPointerEvent = event;
    };

    var onSessionEnd = function onSessionEnd(event, info) {
      return _this.stop(event, info);
    };

    var transformPagePoint = this.props.transformPagePoint;
    this.panSession = new PanSession(originEvent, {
      onSessionStart: onSessionStart,
      onStart: onStart,
      onMove: onMove,
      onSessionEnd: onSessionEnd
    }, {
      transformPagePoint: transformPagePoint
    });
  };

  VisualElementDragControls.prototype.resolveDragConstraints = function () {
    var _this = this;

    var _a = this.props,
        dragConstraints = _a.dragConstraints,
        dragElastic = _a.dragElastic;
    var layout = this.visualElement.getLayoutState().layoutCorrected;

    if (dragConstraints) {
      this.constraints = isRefObject(dragConstraints) ? this.resolveRefConstraints(layout, dragConstraints) : calcRelativeConstraints(layout, dragConstraints);
    } else {
      this.constraints = false;
    }

    this.elastic = resolveDragElastic(dragElastic);
    /**
     * If we're outputting to external MotionValues, we want to rebase the measured constraints
     * from viewport-relative to component-relative.
     */

    if (this.constraints && !this.hasMutatedConstraints) {
      eachAxis(function (axis) {
        if (_this.getAxisMotionValue(axis)) {
          _this.constraints[axis] = rebaseAxisConstraints(layout[axis], _this.constraints[axis]);
        }
      });
    }
  };

  VisualElementDragControls.prototype.resolveRefConstraints = function (layoutBox, constraints) {
    var _a = this.props,
        onMeasureDragConstraints = _a.onMeasureDragConstraints,
        transformPagePoint = _a.transformPagePoint;
    var constraintsElement = constraints.current;
    this.constraintsBox = getBoundingBox(constraintsElement, transformPagePoint);
    var measuredConstraints = calcViewportConstraints(layoutBox, this.constraintsBox);
    /**
     * If there's an onMeasureDragConstraints listener we call it and
     * if different constraints are returned, set constraints to that
     */

    if (onMeasureDragConstraints) {
      var userConstraints = onMeasureDragConstraints(convertAxisBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;

      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToAxisBox(userConstraints);
      }
    }

    return measuredConstraints;
  };

  VisualElementDragControls.prototype.cancelDrag = function () {
    var _a, _b;

    this.visualElement.unlockProjectionTarget();
    (_a = this.cancelLayout) === null || _a === void 0 ? void 0 : _a.call(this);
    this.isDragging = false;
    this.panSession && this.panSession.end();
    this.panSession = null;

    if (!this.props.dragPropagation && this.openGlobalLock) {
      this.openGlobalLock();
      this.openGlobalLock = null;
    }

    (_b = this.visualElement.animationState) === null || _b === void 0 ? void 0 : _b.setActive(AnimationType.Drag, false);
  };

  VisualElementDragControls.prototype.stop = function (event, info) {
    var _a, _b, _c;

    (_a = this.panSession) === null || _a === void 0 ? void 0 : _a.end();
    this.panSession = null;
    var isDragging = this.isDragging;
    this.cancelDrag();
    if (!isDragging) return;
    var velocity = info.velocity;
    this.animateDragEnd(velocity);
    (_c = (_b = this.props).onDragEnd) === null || _c === void 0 ? void 0 : _c.call(_b, event, info);
  };

  VisualElementDragControls.prototype.snapToCursor = function (point) {
    var _this = this;

    return eachAxis(function (axis) {
      var drag = _this.props.drag; // If we're not dragging this axis, do an early return.

      if (!shouldDrag(axis, drag, _this.currentDirection)) return;

      var axisValue = _this.getAxisMotionValue(axis);

      if (axisValue) {
        var box = _this.visualElement.getLayoutState().layout;

        var length_1 = box[axis].max - box[axis].min;
        var center = box[axis].min + length_1 / 2;
        var offset = point[axis] - center;
        _this.originPoint[axis] = point[axis];
        axisValue.set(offset);
      } else {
        _this.cursorProgress[axis] = 0.5;
        return true;
      }
    }).includes(true);
  };
  /**
   * Update the specified axis with the latest pointer information.
   */


  VisualElementDragControls.prototype.updateAxis = function (axis, point, offset) {
    var drag = this.props.drag; // If we're not dragging this axis, do an early return.

    if (!shouldDrag(axis, drag, this.currentDirection)) return;
    return this.getAxisMotionValue(axis) ? this.updateAxisMotionValue(axis, offset) : this.updateVisualElementAxis(axis, point);
  };

  VisualElementDragControls.prototype.updateAxisMotionValue = function (axis, offset) {
    var axisValue = this.getAxisMotionValue(axis);
    if (!offset || !axisValue) return;
    var nextValue = this.originPoint[axis] + offset[axis];
    var update = this.constraints ? applyConstraints(nextValue, this.constraints[axis], this.elastic[axis]) : nextValue;
    axisValue.set(update);
  };

  VisualElementDragControls.prototype.updateVisualElementAxis = function (axis, point) {
    var _a; // Get the actual layout bounding box of the element


    var axisLayout = this.visualElement.getLayoutState().layout[axis]; // Calculate its current length. In the future we might want to lerp this to animate
    // between lengths if the layout changes as we change the DOM

    var axisLength = axisLayout.max - axisLayout.min; // Get the initial progress that the pointer sat on this axis on gesture start.

    var axisProgress = this.cursorProgress[axis]; // Calculate a new min point based on the latest pointer position, constraints and elastic

    var min = calcConstrainedMinPoint(point[axis], axisLength, axisProgress, (_a = this.constraints) === null || _a === void 0 ? void 0 : _a[axis], this.elastic[axis]); // Update the axis viewport target with this new min and the length

    this.visualElement.setProjectionTargetAxis(axis, min, min + axisLength);
  };

  VisualElementDragControls.prototype.setProps = function (_a) {
    var _b = _a.drag,
        drag = _b === void 0 ? false : _b,
        _c = _a.dragDirectionLock,
        dragDirectionLock = _c === void 0 ? false : _c,
        _d = _a.dragPropagation,
        dragPropagation = _d === void 0 ? false : _d,
        _e = _a.dragConstraints,
        dragConstraints = _e === void 0 ? false : _e,
        _f = _a.dragElastic,
        dragElastic = _f === void 0 ? defaultElastic : _f,
        _g = _a.dragMomentum,
        dragMomentum = _g === void 0 ? true : _g,
        remainingProps = __rest(_a, ["drag", "dragDirectionLock", "dragPropagation", "dragConstraints", "dragElastic", "dragMomentum"]);

    this.props = _assign({
      drag: drag,
      dragDirectionLock: dragDirectionLock,
      dragPropagation: dragPropagation,
      dragConstraints: dragConstraints,
      dragElastic: dragElastic,
      dragMomentum: dragMomentum
    }, remainingProps);
  };
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - If the component will perform layout animations, we output the gesture to the component's
   *      visual bounding box
   * - Otherwise, we apply the delta to the x/y motion values.
   */


  VisualElementDragControls.prototype.getAxisMotionValue = function (axis) {
    var _a = this.props,
        layout = _a.layout,
        layoutId = _a.layoutId;
    var dragKey = "_drag" + axis.toUpperCase();

    if (this.props[dragKey]) {
      return this.props[dragKey];
    } else if (!layout && layoutId === undefined) {
      return this.visualElement.getValue(axis, 0);
    }
  };

  VisualElementDragControls.prototype.isLayoutDrag = function () {
    return !this.getAxisMotionValue("x");
  };

  VisualElementDragControls.prototype.isExternalDrag = function () {
    var _a = this.props,
        _dragX = _a._dragX,
        _dragY = _a._dragY;
    return _dragX || _dragY;
  };

  VisualElementDragControls.prototype.animateDragEnd = function (velocity) {
    var _this = this;

    var _a = this.props,
        drag = _a.drag,
        dragMomentum = _a.dragMomentum,
        dragElastic = _a.dragElastic,
        dragTransition = _a.dragTransition;
    /**
     * Everything beyond the drag gesture should be performed with
     * relative projection so children stay in sync with their parent element.
     */

    var isRelative = convertToRelativeProjection(this.visualElement, this.isLayoutDrag() && !this.isExternalDrag());
    /**
     * If we had previously resolved constraints relative to the viewport,
     * we need to also convert those to a relative coordinate space for the animation
     */

    var constraints = this.constraints || {};

    if (isRelative && Object.keys(constraints).length && this.isLayoutDrag()) {
      var projectionParent = this.visualElement.getProjectionParent();

      if (projectionParent) {
        var relativeConstraints_1 = calcRelativeOffset(projectionParent.projection.targetFinal, constraints);
        eachAxis(function (axis) {
          var _a = relativeConstraints_1[axis],
              min = _a.min,
              max = _a.max;
          constraints[axis] = {
            min: isNaN(min) ? undefined : min,
            max: isNaN(max) ? undefined : max
          };
        });
      }
    }

    var momentumAnimations = eachAxis(function (axis) {
      var _a;

      if (!shouldDrag(axis, drag, _this.currentDirection)) {
        return;
      }

      var transition = (_a = constraints === null || constraints === void 0 ? void 0 : constraints[axis]) !== null && _a !== void 0 ? _a : {};
      /**
       * Overdamp the boundary spring if `dragElastic` is disabled. There's still a frame
       * of spring animations so we should look into adding a disable spring option to `inertia`.
       * We could do something here where we affect the `bounceStiffness` and `bounceDamping`
       * using the value of `dragElastic`.
       */

      var bounceStiffness = dragElastic ? 200 : 1000000;
      var bounceDamping = dragElastic ? 40 : 10000000;

      var inertia = _assign(_assign({
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness: bounceStiffness,
        bounceDamping: bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10
      }, dragTransition), transition); // If we're not animating on an externally-provided `MotionValue` we can use the
      // component's animation controls which will handle interactions with whileHover (etc),
      // otherwise we just have to animate the `MotionValue` itself.


      return _this.getAxisMotionValue(axis) ? _this.startAxisValueAnimation(axis, inertia) : _this.visualElement.startLayoutAnimation(axis, inertia, isRelative);
    }); // Run all animations and then resolve the new drag constraints.

    return Promise.all(momentumAnimations).then(function () {
      var _a, _b;

      (_b = (_a = _this.props).onDragTransitionEnd) === null || _b === void 0 ? void 0 : _b.call(_a);
    });
  };

  VisualElementDragControls.prototype.stopMotion = function () {
    var _this = this;

    eachAxis(function (axis) {
      var axisValue = _this.getAxisMotionValue(axis);

      axisValue ? axisValue.stop() : _this.visualElement.stopLayoutAnimation();
    });
  };

  VisualElementDragControls.prototype.startAxisValueAnimation = function (axis, transition) {
    var axisValue = this.getAxisMotionValue(axis);
    if (!axisValue) return;
    var currentValue = axisValue.get();
    axisValue.set(currentValue);
    axisValue.set(currentValue); // Set twice to hard-reset velocity

    return startAnimation(axis, axisValue, 0, transition);
  };

  VisualElementDragControls.prototype.scalePoint = function () {
    var _this = this;

    var _a = this.props,
        drag = _a.drag,
        dragConstraints = _a.dragConstraints;
    if (!isRefObject(dragConstraints) || !this.constraintsBox) return; // Stop any current animations as there can be some visual glitching if we resize mid animation

    this.stopMotion(); // Record the relative progress of the targetBox relative to the constraintsBox

    var boxProgress = {
      x: 0,
      y: 0
    };
    eachAxis(function (axis) {
      boxProgress[axis] = calcOrigin$1(_this.visualElement.projection.target[axis], _this.constraintsBox[axis]);
    });
    /**
     * For each axis, calculate the current progress of the layout axis within the constraints.
     * Then, using the latest layout and constraints measurements, reposition the new layout axis
     * proportionally within the constraints.
     */

    this.updateConstraints(function () {
      eachAxis(function (axis) {
        if (!shouldDrag(axis, drag, null)) return; // Calculate the position of the targetBox relative to the constraintsBox using the
        // previously calculated progress

        var _a = calcPositionFromProgress(_this.visualElement.projection.target[axis], _this.constraintsBox[axis], boxProgress[axis]),
            min = _a.min,
            max = _a.max;

        _this.visualElement.setProjectionTargetAxis(axis, min, max);
      });
    });
    /**
     * If any other draggable components are queuing the same tasks synchronously
     * this will wait until they've all been scheduled before flushing.
     */

    setTimeout(flushLayout, 1);
  };

  VisualElementDragControls.prototype.updateConstraints = function (onReady) {
    var _this = this;

    this.cancelLayout = batchLayout(function (read, write) {
      var ancestors = collectProjectingAncestors(_this.visualElement);
      write(function () {
        return ancestors.forEach(function (element) {
          return element.resetTransform();
        });
      });
      read(function () {
        return updateLayoutMeasurement(_this.visualElement);
      });
      write(function () {
        return ancestors.forEach(function (element) {
          return element.restoreTransform();
        });
      });
      read(function () {
        _this.resolveDragConstraints();
      });
      if (onReady) write(onReady);
    });
  };

  VisualElementDragControls.prototype.mount = function (visualElement) {
    var _this = this;

    var element = visualElement.getInstance();
    /**
     * Attach a pointerdown event listener on this DOM element to initiate drag tracking.
     */

    var stopPointerListener = addPointerEvent(element, "pointerdown", function (event) {
      var _a = _this.props,
          drag = _a.drag,
          _b = _a.dragListener,
          dragListener = _b === void 0 ? true : _b;
      drag && dragListener && _this.start(event);
    });
    /**
     * Attach a window resize listener to scale the draggable target within its defined
     * constraints as the window resizes.
     */

    var stopResizeListener = addDomEvent(window, "resize", function () {
      _this.scalePoint();
    });
    /**
     * Ensure drag constraints are resolved correctly relative to the dragging element
     * whenever its layout changes.
     */

    var stopLayoutUpdateListener = visualElement.onLayoutUpdate(function () {
      if (_this.isDragging) {
        _this.resolveDragConstraints();
      }
    });
    /**
     * If the previous component with this same layoutId was dragging at the time
     * it was unmounted, we want to continue the same gesture on this component.
     */

    var prevDragCursor = visualElement.prevDragCursor;

    if (prevDragCursor) {
      this.start(lastPointerEvent, {
        cursorProgress: prevDragCursor
      });
    }
    /**
     * Return a function that will teardown the drag gesture
     */


    return function () {
      stopPointerListener === null || stopPointerListener === void 0 ? void 0 : stopPointerListener();
      stopResizeListener === null || stopResizeListener === void 0 ? void 0 : stopResizeListener();
      stopLayoutUpdateListener === null || stopLayoutUpdateListener === void 0 ? void 0 : stopLayoutUpdateListener();

      _this.cancelDrag();
    };
  };

  return VisualElementDragControls;
}();

function shouldDrag(direction, drag, currentDirection) {
  return (drag === true || drag === direction) && (currentDirection === null || currentDirection === direction);
}
/**
 * Based on an x/y offset determine the current drag direction. If both axis' offsets are lower
 * than the provided threshold, return `null`.
 *
 * @param offset - The x/y offset from origin.
 * @param lockThreshold - (Optional) - the minimum absolute offset before we can determine a drag direction.
 */


function getCurrentDirection(offset, lockThreshold) {
  if (lockThreshold === void 0) {
    lockThreshold = 10;
  }

  var direction = null;

  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }

  return direction;
}

/**
 * A hook that allows an element to be dragged.
 *
 * @internal
 */

function useDrag(props) {
  var groupDragControls = props.dragControls,
      visualElement = props.visualElement;
  var transformPagePoint = react.useContext(MotionConfigContext).transformPagePoint;
  var dragControls = useConstant(function () {
    return new VisualElementDragControls({
      visualElement: visualElement
    });
  });
  dragControls.setProps(_assign(_assign({}, props), {
    transformPagePoint: transformPagePoint
  })); // If we've been provided a DragControls for manual control over the drag gesture,
  // subscribe this component to it on mount.

  react.useEffect(function () {
    return groupDragControls && groupDragControls.subscribe(dragControls);
  }, [dragControls]); // Mount the drag controls with the visualElement

  react.useEffect(function () {
    return dragControls.mount(visualElement);
  }, []);
}

/**
 *
 * @param handlers -
 * @param ref -
 *
 * @internalremarks
 * Currently this sets new pan gesture functions every render. The memo route has been explored
 * in the past but ultimately we're still creating new functions every render. An optimisation
 * to explore is creating the pan gestures and loading them into a `ref`.
 *
 * @internal
 */

function usePanGesture(_a) {
  var onPan = _a.onPan,
      onPanStart = _a.onPanStart,
      onPanEnd = _a.onPanEnd,
      onPanSessionStart = _a.onPanSessionStart,
      visualElement = _a.visualElement;
  var hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
  var panSession = react.useRef(null);
  var transformPagePoint = react.useContext(MotionConfigContext).transformPagePoint;
  var handlers = {
    onSessionStart: onPanSessionStart,
    onStart: onPanStart,
    onMove: onPan,
    onEnd: function onEnd(event, info) {
      panSession.current = null;
      onPanEnd && onPanEnd(event, info);
    }
  };
  react.useEffect(function () {
    if (panSession.current !== null) {
      panSession.current.updateHandlers(handlers);
    }
  });

  function onPointerDown(event) {
    panSession.current = new PanSession(event, handlers, {
      transformPagePoint: transformPagePoint
    });
  }

  usePointerEvent(visualElement, "pointerdown", hasPanEvents && onPointerDown);
  useUnmountEffect$1(function () {
    return panSession.current && panSession.current.end();
  });
}

var drag = {
  pan: makeRenderlessComponent(usePanGesture),
  drag: makeRenderlessComponent(useDrag)
};

/**
 * @public
 */
var Presence;

(function (Presence) {
  Presence[Presence["Entering"] = 0] = "Entering";
  Presence[Presence["Present"] = 1] = "Present";
  Presence[Presence["Exiting"] = 2] = "Exiting";
})(Presence || (Presence = {}));
/**
 * @public
 */


var VisibilityAction;

(function (VisibilityAction) {
  VisibilityAction[VisibilityAction["Hide"] = 0] = "Hide";
  VisibilityAction[VisibilityAction["Show"] = 1] = "Show";
})(VisibilityAction || (VisibilityAction = {}));

function isCSSVariable$1(value) {
  return typeof value === "string" && value.startsWith("var(--");
}
/**
 * Parse Framer's special CSS variable format into a CSS token and a fallback.
 *
 * ```
 * `var(--foo, #fff)` => [`--foo`, '#fff']
 * ```
 *
 * @param current
 */


var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;

function parseCSSVariable(current) {
  var match = cssVariableRegex.exec(current);
  if (!match) return [,];

  var _a = __read(match, 3),
      token = _a[1],
      fallback = _a[2];

  return [token, fallback];
}

function getVariableValue(current, element, depth) {

  var _a = __read(parseCSSVariable(current), 2),
      token = _a[0],
      fallback = _a[1]; // No CSS variable detected


  if (!token) return; // Attempt to read this CSS variable off the element

  var resolved = window.getComputedStyle(element).getPropertyValue(token);

  if (resolved) {
    return resolved.trim();
  } else if (isCSSVariable$1(fallback)) {
    // The fallback might itself be a CSS variable, in which case we attempt to resolve it too.
    return getVariableValue(fallback, element);
  } else {
    return fallback;
  }
}
/**
 * Resolve CSS variables from
 *
 * @internal
 */


function resolveCSSVariables(visualElement, _a, transitionEnd) {
  var _b;

  var target = __rest(_a, []);

  var element = visualElement.getInstance();
  if (!(element instanceof HTMLElement)) return {
    target: target,
    transitionEnd: transitionEnd
  }; // If `transitionEnd` isn't `undefined`, clone it. We could clone `target` and `transitionEnd`
  // only if they change but I think this reads clearer and this isn't a performance-critical path.

  if (transitionEnd) {
    transitionEnd = _assign({}, transitionEnd);
  } // Go through existing `MotionValue`s and ensure any existing CSS variables are resolved


  visualElement.forEachValue(function (value) {
    var current = value.get();
    if (!isCSSVariable$1(current)) return;
    var resolved = getVariableValue(current, element);
    if (resolved) value.set(resolved);
  }); // Cycle through every target property and resolve CSS variables. Currently
  // we only read single-var properties like `var(--foo)`, not `calc(var(--foo) + 20px)`

  for (var key in target) {
    var current = target[key];
    if (!isCSSVariable$1(current)) continue;
    var resolved = getVariableValue(current, element);
    if (!resolved) continue; // Clone target if it hasn't already been

    target[key] = resolved; // If the user hasn't already set this key on `transitionEnd`, set it to the unresolved
    // CSS variable. This will ensure that after the animation the component will reflect
    // changes in the value of the CSS variable.

    if (transitionEnd) (_b = transitionEnd[key]) !== null && _b !== void 0 ? _b : transitionEnd[key] = current;
  }

  return {
    target: target,
    transitionEnd: transitionEnd
  };
}

function pixelsToPercent(pixels, axis) {
  return pixels / (axis.max - axis.min) * 100;
}
/**
 * We always correct borderRadius as a percentage rather than pixels to reduce paints.
 * For example, if you are projecting a box that is 100px wide with a 10px borderRadius
 * into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
 * borderRadius in both states. If we animate between the two in pixels that will trigger
 * a paint each time. If we animate between the two in percentage we'll avoid a paint.
 */


function correctBorderRadius(latest, _layoutState, _a) {
  var target = _a.target;
  /**
   * If latest is a string, if it's a percentage we can return immediately as it's
   * going to be stretched appropriately. Otherwise, if it's a pixel, convert it to a number.
   */

  if (typeof latest === "string") {
    if (px$1.test(latest)) {
      latest = parseFloat(latest);
    } else {
      return latest;
    }
  }
  /**
   * If latest is a number, it's a pixel value. We use the current viewportBox to calculate that
   * pixel value as a percentage of each axis
   */


  var x = pixelsToPercent(latest, target.x);
  var y = pixelsToPercent(latest, target.y);
  return x + "% " + y + "%";
}

var varToken = "_$css";

function correctBoxShadow(latest, _a) {
  var delta = _a.delta,
      treeScale = _a.treeScale;
  var original = latest;
  /**
   * We need to first strip and store CSS variables from the string.
   */

  var containsCSSVariables = latest.includes("var(");
  var cssVariables = [];

  if (containsCSSVariables) {
    latest = latest.replace(cssVariableRegex, function (match) {
      cssVariables.push(match);
      return varToken;
    });
  }

  var shadow = complex.parse(latest); // TODO: Doesn't support multiple shadows

  if (shadow.length > 5) return original;
  var template = complex.createTransformer(latest);
  var offset = typeof shadow[0] !== "number" ? 1 : 0; // Calculate the overall context scale

  var xScale = delta.x.scale * treeScale.x;
  var yScale = delta.y.scale * treeScale.y;
  shadow[0 + offset] /= xScale;
  shadow[1 + offset] /= yScale;
  /**
   * Ideally we'd correct x and y scales individually, but because blur and
   * spread apply to both we have to take a scale average and apply that instead.
   * We could potentially improve the outcome of this by incorporating the ratio between
   * the two scales.
   */

  var averageScale = mix(xScale, yScale, 0.5); // Blur

  if (typeof shadow[2 + offset] === "number") shadow[2 + offset] /= averageScale; // Spread

  if (typeof shadow[3 + offset] === "number") shadow[3 + offset] /= averageScale;
  var output = template(shadow);

  if (containsCSSVariables) {
    var i_1 = 0;
    output = output.replace(varToken, function () {
      var cssVariable = cssVariables[i_1];
      i_1++;
      return cssVariable;
    });
  }

  return output;
}

var borderCorrectionDefinition = {
  process: correctBorderRadius
};
var defaultScaleCorrectors = {
  borderRadius: _assign(_assign({}, borderCorrectionDefinition), {
    applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]
  }),
  borderTopLeftRadius: borderCorrectionDefinition,
  borderTopRightRadius: borderCorrectionDefinition,
  borderBottomLeftRadius: borderCorrectionDefinition,
  borderBottomRightRadius: borderCorrectionDefinition,
  boxShadow: {
    process: correctBoxShadow
  }
};

var progressTarget = 1000;

var Animate =
/** @class */
function (_super) {
  __extends(Animate, _super);

  function Animate() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     * A mutable object that tracks the target viewport box
     * for the current animation frame.
     */


    _this.frameTarget = axisBox();
    /**
     * The current animation target, we use this to check whether to start
     * a new animation or continue the existing one.
     */

    _this.currentAnimationTarget = axisBox();
    /**
     * Track whether we're animating this axis.
     */

    _this.isAnimating = {
      x: false,
      y: false
    };
    _this.stopAxisAnimation = {
      x: undefined,
      y: undefined
    };
    _this.isAnimatingTree = false;

    _this.animate = function (target, origin, _a) {
      if (_a === void 0) {
        _a = {};
      }

      var originBox = _a.originBox,
          targetBox = _a.targetBox,
          visibilityAction = _a.visibilityAction,
          shouldStackAnimate = _a.shouldStackAnimate,
          onComplete = _a.onComplete,
          prevParent = _a.prevParent,
          config = __rest(_a, ["originBox", "targetBox", "visibilityAction", "shouldStackAnimate", "onComplete", "prevParent"]);

      var _b = _this.props,
          visualElement = _b.visualElement,
          layout = _b.layout;
      /**
       * Early return if we've been instructed not to animate this render.
       */

      if (shouldStackAnimate === false) {
        _this.isAnimatingTree = false;
        return _this.safeToRemove();
      }
      /**
       * Prioritise tree animations
       */


      if (_this.isAnimatingTree && shouldStackAnimate !== true) {
        return;
      } else if (shouldStackAnimate) {
        _this.isAnimatingTree = true;
      }
      /**
       * Allow the measured origin (prev bounding box) and target (actual layout) to be
       * overridden by the provided config.
       */


      origin = originBox || origin;
      target = targetBox || target;
      /**
       * If this element has a projecting parent, there's an opportunity to animate
       * it relatively to that parent rather than relatively to the viewport. This
       * allows us to add orchestrated animations.
       */

      var isRelative = false;
      var projectionParent = visualElement.getProjectionParent();

      if (projectionParent) {
        var prevParentViewportBox = projectionParent.prevViewportBox;
        var parentLayout = projectionParent.getLayoutState().layout;
        /**
         * If we're being provided a previous parent VisualElement by AnimateSharedLayout
         */

        if (prevParent) {
          /**
           * If we've been provided an explicit target box it means we're animating back
           * to this previous parent. So we can make a relative box by comparing to the previous
           * parent's layout
           */
          if (targetBox) {
            parentLayout = prevParent.getLayoutState().layout;
          }
          /**
           * Likewise if we've been provided an explicit origin box it means we're
           * animating out from a different element. So we should figure out where that was
           * on screen relative to the new parent element.
           */


          if (originBox && !checkIfParentHasChanged(prevParent, projectionParent) && prevParent.prevViewportBox) {
            prevParentViewportBox = prevParent.prevViewportBox;
          }
        }

        if (prevParentViewportBox && isProvidedCorrectDataForRelativeSharedLayout(prevParent, originBox, targetBox)) {
          isRelative = true;
          origin = calcRelativeOffset(prevParentViewportBox, origin);
          target = calcRelativeOffset(parentLayout, target);
        }
      }

      var boxHasMoved = hasMoved(origin, target);
      var animations = eachAxis(function (axis) {
        var _a, _b;
        /**
         * If layout is set to "position", we can resize the origin box based on the target
         * box and only animate its position.
         */


        if (layout === "position") {
          var targetLength = target[axis].max - target[axis].min;
          origin[axis].max = origin[axis].min + targetLength;
        }

        if (visualElement.projection.isTargetLocked) {
          return;
        } else if (visibilityAction !== undefined) {
          visualElement.setVisibility(visibilityAction === VisibilityAction.Show);
        } else if (boxHasMoved) {
          // If the box has moved, animate between it's current visual state and its
          // final state
          return _this.animateAxis(axis, target[axis], origin[axis], _assign(_assign({}, config), {
            isRelative: isRelative
          }));
        } else {
          (_b = (_a = _this.stopAxisAnimation)[axis]) === null || _b === void 0 ? void 0 : _b.call(_a); // If the box has remained in the same place, immediately set the axis target
          // to the final desired state

          return visualElement.setProjectionTargetAxis(axis, target[axis].min, target[axis].max, isRelative);
        }
      }); // Force a render to ensure there's no flash of uncorrected bounding box.

      visualElement.syncRender();
      /**
       * If this visualElement isn't present (ie it's been removed from the tree by the user but
       * kept in by the tree by AnimatePresence) then call safeToRemove when all axis animations
       * have successfully finished.
       */

      return Promise.all(animations).then(function () {
        _this.isAnimatingTree = false;
        onComplete && onComplete();
        visualElement.notifyLayoutAnimationComplete();
      });
    };

    return _this;
  }

  Animate.prototype.componentDidMount = function () {
    var _this = this;

    var visualElement = this.props.visualElement;
    visualElement.animateMotionValue = startAnimation;
    visualElement.enableLayoutProjection();
    this.unsubLayoutReady = visualElement.onLayoutUpdate(this.animate);

    visualElement.layoutSafeToRemove = function () {
      return _this.safeToRemove();
    };

    addScaleCorrection(defaultScaleCorrectors);
  };

  Animate.prototype.componentWillUnmount = function () {
    var _this = this;

    this.unsubLayoutReady();
    eachAxis(function (axis) {
      var _a, _b;

      return (_b = (_a = _this.stopAxisAnimation)[axis]) === null || _b === void 0 ? void 0 : _b.call(_a);
    });
  };
  /**
   * TODO: This manually performs animations on the visualElement's layout progress
   * values. It'd be preferable to amend the startLayoutAxisAnimation
   * API to accept more custom animations like this.
   */


  Animate.prototype.animateAxis = function (axis, target, origin, _a) {
    var _this = this;

    var _b, _c;

    var _d = _a === void 0 ? {} : _a,
        transition = _d.transition,
        isRelative = _d.isRelative;
    /**
     * If we're not animating to a new target, don't run this animation
     */


    if (this.isAnimating[axis] && axisIsEqual(target, this.currentAnimationTarget[axis])) {
      return;
    }

    (_c = (_b = this.stopAxisAnimation)[axis]) === null || _c === void 0 ? void 0 : _c.call(_b);
    this.isAnimating[axis] = true;
    var visualElement = this.props.visualElement;
    var frameTarget = this.frameTarget[axis];
    var layoutProgress = visualElement.getProjectionAnimationProgress()[axis];
    /**
     * Set layout progress back to 0. We set it twice to hard-reset any velocity that might
     * be re-incoporated into a subsequent spring animation.
     */

    layoutProgress.clearListeners();
    layoutProgress.set(0);
    layoutProgress.set(0);
    /**
     * Create an animation function to run once per frame. This will tween the visual bounding box from
     * origin to target using the latest progress value.
     */

    var frame = function frame() {
      // Convert the latest layoutProgress, which is a value from 0-1000, into a 0-1 progress
      var p = layoutProgress.get() / progressTarget; // Tween the axis and update the visualElement with the latest values

      tweenAxis(frameTarget, origin, target, p);
      visualElement.setProjectionTargetAxis(axis, frameTarget.min, frameTarget.max, isRelative);
    }; // Synchronously run a frame to ensure there's no flash of the uncorrected bounding box.


    frame(); // Create a function to stop animation on this specific axis

    var unsubscribeProgress = layoutProgress.onChange(frame);

    this.stopAxisAnimation[axis] = function () {
      _this.isAnimating[axis] = false;
      layoutProgress.stop();
      unsubscribeProgress();
    };

    this.currentAnimationTarget[axis] = target;
    var layoutTransition = transition || visualElement.getDefaultTransition() || defaultLayoutTransition; // Start the animation on this axis

    var animation = startAnimation(axis === "x" ? "layoutX" : "layoutY", layoutProgress, progressTarget, layoutTransition && getValueTransition(layoutTransition, "layout")).then(this.stopAxisAnimation[axis]);
    return animation;
  };

  Animate.prototype.safeToRemove = function () {
    var _a, _b;

    (_b = (_a = this.props).safeToRemove) === null || _b === void 0 ? void 0 : _b.call(_a);
  };

  Animate.prototype.render = function () {
    return null;
  };

  return Animate;
}(react.Component);

function AnimateLayoutContextProvider(props) {
  var _a = __read(usePresence(), 2),
      safeToRemove = _a[1];

  return /*#__PURE__*/react.createElement(Animate, _assign({}, props, {
    safeToRemove: safeToRemove
  }));
}

function hasMoved(a, b) {
  return !isZeroBox(a) && !isZeroBox(b) && (!axisIsEqual(a.x, b.x) || !axisIsEqual(a.y, b.y));
}

var zeroAxis = {
  min: 0,
  max: 0
};

function isZeroBox(a) {
  return axisIsEqual(a.x, zeroAxis) && axisIsEqual(a.y, zeroAxis);
}

function axisIsEqual(a, b) {
  return a.min === b.min && a.max === b.max;
}

var defaultLayoutTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};

function isProvidedCorrectDataForRelativeSharedLayout(prevParent, originBox, targetBox) {
  return prevParent || !prevParent && !(originBox || targetBox);
}

/**
 * Default handlers for batching VisualElements
 */

var defaultHandler = {
  layoutReady: function layoutReady(child) {
    return child.notifyLayoutReady();
  }
};
/**
 * Create a batcher to process VisualElements
 */

function createBatcher() {
  var queue = new Set();
  return {
    add: function add(child) {
      return queue.add(child);
    },
    flush: function flush(_a) {
      var _b = _a === void 0 ? defaultHandler : _a,
          layoutReady = _b.layoutReady,
          parent = _b.parent;

      batchLayout(function (read, write) {
        var order = Array.from(queue).sort(compareByDepth);
        var ancestors = parent ? collectProjectingAncestors(parent) : [];
        write(function () {
          var allElements = __spreadArray(__spreadArray([], __read(ancestors)), __read(order));

          allElements.forEach(function (element) {
            return element.resetTransform();
          });
        });
        read(function () {
          order.forEach(updateLayoutMeasurement);
        });
        write(function () {
          ancestors.forEach(function (element) {
            return element.restoreTransform();
          });
          order.forEach(layoutReady);
        });
        read(function () {
          /**
           * After all children have started animating, ensure any Entering components are set to Present.
           * If we add deferred animations (set up all animations and then start them in two loops) this
           * could be moved to the start loop. But it needs to happen after all the animations configs
           * are generated in AnimateSharedLayout as this relies on presence data
           */
          order.forEach(function (child) {
            if (child.isPresent) child.presence = Presence.Present;
          });
        });
        write(function () {
          /**
           * Starting these animations will have queued jobs on the frame loop. In some situations,
           * like when removing an element, these will be processed too late after the DOM is manipulated,
           * leaving a flash of incorrectly-projected content. By manually flushing these jobs
           * we ensure there's no flash.
           */
          flushSync.preRender();
          flushSync.render();
        });
        read(function () {
          /**
           * Schedule a callback at the end of the following frame to assign the latest projection
           * box to the prevViewportBox snapshot. Once global batching is in place this could be run
           * synchronously. But for now it ensures that if any nested `AnimateSharedLayout` top-level
           * child attempts to calculate its previous relative position against a prevViewportBox
           * it will be against its latest projection box instead, as the snapshot is useless beyond this
           * render.
           */
          sync.postRender(function () {
            return order.forEach(assignProjectionToSnapshot);
          });
          queue.clear();
        });
      }); // TODO: Need to find a layout-synchronous way of flushing this

      flushLayout();
    }
  };
}

function assignProjectionToSnapshot(child) {
  child.prevViewportBox = child.projection.target;
}

var SharedLayoutContext = /*#__PURE__*/react.createContext(createBatcher());
/**
 * @internal
 */

var FramerTreeLayoutContext = /*#__PURE__*/react.createContext(createBatcher());

function isSharedLayout(context) {
  return !!context.forceUpdate;
}

/**
 * This component is responsible for scheduling the measuring of the motion component
 */

var Measure =
/** @class */
function (_super) {
  __extends(Measure, _super);

  function Measure() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * If this is a child of a SyncContext, register the VisualElement with it on mount.
   */


  Measure.prototype.componentDidMount = function () {
    var _a = this.props,
        syncLayout = _a.syncLayout,
        framerSyncLayout = _a.framerSyncLayout,
        visualElement = _a.visualElement;
    isSharedLayout(syncLayout) && syncLayout.register(visualElement);
    isSharedLayout(framerSyncLayout) && framerSyncLayout.register(visualElement);
    visualElement.onUnmount(function () {
      if (isSharedLayout(syncLayout)) {
        syncLayout.remove(visualElement);
      }

      if (isSharedLayout(framerSyncLayout)) {
        framerSyncLayout.remove(visualElement);
      }
    });
  };
  /**
   * If this is a child of a SyncContext, notify it that it needs to re-render. It will then
   * handle the snapshotting.
   *
   * If it is stand-alone component, add it to the batcher.
   */


  Measure.prototype.getSnapshotBeforeUpdate = function () {
    var _a = this.props,
        syncLayout = _a.syncLayout,
        visualElement = _a.visualElement;

    if (isSharedLayout(syncLayout)) {
      syncLayout.syncUpdate();
    } else {
      snapshotViewportBox(visualElement);
      syncLayout.add(visualElement);
    }

    return null;
  };

  Measure.prototype.componentDidUpdate = function () {
    var syncLayout = this.props.syncLayout;
    if (!isSharedLayout(syncLayout)) syncLayout.flush();
  };

  Measure.prototype.render = function () {
    return null;
  };

  return Measure;
}(react.Component);

function MeasureContextProvider(props) {
  var syncLayout = react.useContext(SharedLayoutContext);
  var framerSyncLayout = react.useContext(FramerTreeLayoutContext);
  return /*#__PURE__*/react.createElement(Measure, _assign({}, props, {
    syncLayout: syncLayout,
    framerSyncLayout: framerSyncLayout
  }));
}

var layoutAnimations = {
  measureLayout: MeasureContextProvider,
  layoutAnimation: AnimateLayoutContextProvider
};

var createProjectionState = function createProjectionState() {
  return {
    isEnabled: false,
    isHydrated: false,
    isTargetLocked: false,
    target: axisBox(),
    targetFinal: axisBox()
  };
};

function createLayoutState() {
  return {
    isHydrated: false,
    layout: axisBox(),
    layoutCorrected: axisBox(),
    treeScale: {
      x: 1,
      y: 1
    },
    delta: delta(),
    deltaFinal: delta(),
    deltaTransform: ""
  };
}

var zeroLayout = createLayoutState();

/**
 * Build a transform style that takes a calculated delta between the element's current
 * space on screen and projects it into the desired space.
 */

function buildLayoutProjectionTransform(_a, treeScale, latestTransform) {
  var x = _a.x,
      y = _a.y;
  /**
   * The translations we use to calculate are always relative to the viewport coordinate space.
   * But when we apply scales, we also scale the coordinate space of an element and its children.
   * For instance if we have a treeScale (the culmination of all parent scales) of 0.5 and we need
   * to move an element 100 pixels, we actually need to move it 200 in within that scaled space.
   */

  var xTranslate = x.translate / treeScale.x;
  var yTranslate = y.translate / treeScale.y;
  var transform = "translate3d(" + xTranslate + "px, " + yTranslate + "px, 0) ";

  if (latestTransform) {
    var rotate = latestTransform.rotate,
        rotateX = latestTransform.rotateX,
        rotateY = latestTransform.rotateY;
    if (rotate) transform += "rotate(" + rotate + ") ";
    if (rotateX) transform += "rotateX(" + rotateX + ") ";
    if (rotateY) transform += "rotateY(" + rotateY + ") ";
  }

  transform += "scale(" + x.scale + ", " + y.scale + ")";
  return !latestTransform && transform === identityProjection ? "" : transform;
}
/**
 * Take the calculated delta origin and apply it as a transform string.
 */


function buildLayoutProjectionTransformOrigin(_a) {
  var deltaFinal = _a.deltaFinal;
  return deltaFinal.x.origin * 100 + "% " + deltaFinal.y.origin * 100 + "% 0";
}

var identityProjection = buildLayoutProjectionTransform(zeroLayout.delta, zeroLayout.treeScale, {
  x: 1,
  y: 1
});

var names = ["LayoutMeasure", "BeforeLayoutMeasure", "LayoutUpdate", "ViewportBoxUpdate", "Update", "Render", "AnimationComplete", "LayoutAnimationComplete", "AnimationStart", "SetAxisTarget", "Unmount"];

function createLifecycles() {
  var managers = names.map(function () {
    return new SubscriptionManager();
  });
  var propSubscriptions = {};
  var lifecycles = {
    clearAllListeners: function clearAllListeners() {
      return managers.forEach(function (manager) {
        return manager.clear();
      });
    },
    updatePropListeners: function updatePropListeners(props) {
      return names.forEach(function (name) {
        var _a;

        (_a = propSubscriptions[name]) === null || _a === void 0 ? void 0 : _a.call(propSubscriptions);
        var on = "on" + name;
        var propListener = props[on];

        if (propListener) {
          propSubscriptions[name] = lifecycles[on](propListener);
        }
      });
    }
  };
  managers.forEach(function (manager, i) {
    lifecycles["on" + names[i]] = function (handler) {
      return manager.add(handler);
    };

    lifecycles["notify" + names[i]] = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return manager.notify.apply(manager, __spreadArray([], __read(args)));
    };
  });
  return lifecycles;
}

function updateMotionValuesFromProps(element, next, prev) {
  var _a;

  for (var key in next) {
    var nextValue = next[key];
    var prevValue = prev[key];

    if (isMotionValue(nextValue)) {
      /**
       * If this is a motion value found in props or style, we want to add it
       * to our visual element's motion value map.
       */
      element.addValue(key, nextValue);
    } else if (isMotionValue(prevValue)) {
      /**
       * If we're swapping to a new motion value, create a new motion value
       * from that
       */
      element.addValue(key, motionValue(nextValue));
    } else if (prevValue !== nextValue) {
      /**
       * If this is a flat value that has changed, update the motion value
       * or create one if it doesn't exist. We only want to do this if we're
       * not handling the value with our animation state.
       */
      if (element.hasValue(key)) {
        var existingValue = element.getValue(key); // TODO: Only update values that aren't being animated or even looked at

        !existingValue.hasAnimated && existingValue.set(nextValue);
      } else {
        element.addValue(key, motionValue((_a = element.getStaticValue(key)) !== null && _a !== void 0 ? _a : nextValue));
      }
    }
  } // Handle removed values


  for (var key in prev) {
    if (next[key] === undefined) element.removeValue(key);
  }

  return next;
}

function updateLayoutDeltas(_a, _b, treePath, transformOrigin) {
  var delta = _a.delta,
      layout = _a.layout,
      layoutCorrected = _a.layoutCorrected,
      treeScale = _a.treeScale;
  var target = _b.target;
  /**
   * Reset the corrected box with the latest values from box, as we're then going
   * to perform mutative operations on it.
   */

  resetBox(layoutCorrected, layout);
  /**
   * Apply all the parent deltas to this box to produce the corrected box. This
   * is the layout box, as it will appear on screen as a result of the transforms of its parents.
   */

  applyTreeDeltas(layoutCorrected, treeScale, treePath);
  /**
   * Update the delta between the corrected box and the target box before user-set transforms were applied.
   * This will allow us to calculate the corrected borderRadius and boxShadow to compensate
   * for our layout reprojection, but still allow them to be scaled correctly by the user.
   * It might be that to simplify this we may want to accept that user-set scale is also corrected
   * and we wouldn't have to keep and calc both deltas, OR we could support a user setting
   * to allow people to choose whether these styles are corrected based on just the
   * layout reprojection or the final bounding box.
   */

  updateBoxDelta(delta, layoutCorrected, target, transformOrigin);
}

var FlatTree =
/** @class */
function () {
  function FlatTree() {
    this.children = [];
    this.isDirty = false;
  }

  FlatTree.prototype.add = function (child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  };

  FlatTree.prototype.remove = function (child) {
    removeItem(this.children, child);
    this.isDirty = true;
  };

  FlatTree.prototype.forEach = function (callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  };

  return FlatTree;
}();

function setCurrentViewportBox(visualElement) {
  var projectionParent = visualElement.getProjectionParent();

  if (!projectionParent) {
    visualElement.rebaseProjectionTarget();
    return;
  }

  var relativeOffset = calcRelativeOffset(projectionParent.getLayoutState().layout, visualElement.getLayoutState().layout);
  eachAxis(function (axis) {
    visualElement.setProjectionTargetAxis(axis, relativeOffset[axis].min, relativeOffset[axis].max, true);
  });
}

var visualElement = function visualElement(_a) {
  var _b = _a.treeType,
      treeType = _b === void 0 ? "" : _b,
      build = _a.build,
      _getBaseTarget = _a.getBaseTarget,
      _makeTargetAnimatable = _a.makeTargetAnimatable,
      _measureViewportBox = _a.measureViewportBox,
      renderInstance = _a.render,
      readValueFromInstance = _a.readValueFromInstance,
      _resetTransform = _a.resetTransform,
      _restoreTransform = _a.restoreTransform,
      removeValueFromRenderState = _a.removeValueFromRenderState,
      _sortNodePosition = _a.sortNodePosition,
      scrapeMotionValuesFromProps = _a.scrapeMotionValuesFromProps;
  return function (_a, options) {
    var parent = _a.parent,
        props = _a.props,
        presenceId = _a.presenceId,
        blockInitialAnimation = _a.blockInitialAnimation,
        visualState = _a.visualState;

    if (options === void 0) {
      options = {};
    }

    var latestValues = visualState.latestValues,
        renderState = visualState.renderState;
    /**
     * The instance of the render-specific node that will be hydrated by the
     * exposed React ref. So for example, this visual element can host a
     * HTMLElement, plain object, or Three.js object. The functions provided
     * in VisualElementConfig allow us to interface with this instance.
     */

    var instance;
    /**
     * Manages the subscriptions for a visual element's lifecycle, for instance
     * onRender and onViewportBoxUpdate.
     */

    var lifecycles = createLifecycles();
    /**
     *
     */

    var projection = createProjectionState();
    /**
     * A reference to the nearest projecting parent. This is either
     * undefined if we haven't looked for the nearest projecting parent,
     * false if there is no parent performing layout projection, or a reference
     * to the projecting parent.
     */

    var projectionParent;
    /**
     * This is a reference to the visual state of the "lead" visual element.
     * Usually, this will be this visual element. But if it shares a layoutId
     * with other visual elements, only one of them will be designated lead by
     * AnimateSharedLayout. All the other visual elements will take on the visual
     * appearance of the lead while they crossfade to it.
     */

    var leadProjection = projection;
    var leadLatestValues = latestValues;
    var unsubscribeFromLeadVisualElement;
    /**
     * The latest layout measurements and calculated projections. This
     * is seperate from the target projection data in visualState as
     * many visual elements might point to the same piece of visualState as
     * a target, whereas they might each have different layouts and thus
     * projection calculations needed to project into the same viewport box.
     */

    var layoutState = createLayoutState();
    /**
     *
     */

    var crossfader;
    /**
     * Keep track of whether the viewport box has been updated since the
     * last time the layout projection was re-calculated.
     */

    var hasViewportBoxUpdated = false;
    /**
     * A map of all motion values attached to this visual element. Motion
     * values are source of truth for any given animated value. A motion
     * value might be provided externally by the component via props.
     */

    var values = new Map();
    /**
     * A map of every subscription that binds the provided or generated
     * motion values onChange listeners to this visual element.
     */

    var valueSubscriptions = new Map();
    /**
     * A reference to the previously-provided motion values as returned
     * from scrapeMotionValuesFromProps. We use the keys in here to determine
     * if any motion values need to be removed after props are updated.
     */

    var prevMotionValues = {};
    /**
     * x/y motion values that track the progress of initiated layout
     * animations.
     *
     * TODO: Target for removal
     */

    var projectionTargetProgress;
    /**
     * When values are removed from all animation props we need to search
     * for a fallback value to animate to. These values are tracked in baseTarget.
     */

    var baseTarget = _assign({}, latestValues); // Internal methods ========================

    /**
     * On mount, this will be hydrated with a callback to disconnect
     * this visual element from its parent on unmount.
     */


    var removeFromVariantTree;
    /**
     *
     */

    function render() {
      if (!instance) return;

      if (element.isProjectionReady()) {
        /**
         * Apply the latest user-set transforms to the targetBox to produce the targetBoxFinal.
         * This is the final box that we will then project into by calculating a transform delta and
         * applying it to the corrected box.
         */
        applyBoxTransforms(leadProjection.targetFinal, leadProjection.target, leadLatestValues);
        /**
         * Update the delta between the corrected box and the final target box, after
         * user-set transforms are applied to it. This will be used by the renderer to
         * create a transform style that will reproject the element from its actual layout
         * into the desired bounding box.
         */

        updateBoxDelta(layoutState.deltaFinal, layoutState.layoutCorrected, leadProjection.targetFinal, latestValues);
      }

      triggerBuild();
      renderInstance(instance, renderState);
    }

    function triggerBuild() {
      var valuesToRender = latestValues;

      if (crossfader && crossfader.isActive()) {
        var crossfadedValues = crossfader.getCrossfadeState(element);
        if (crossfadedValues) valuesToRender = crossfadedValues;
      }

      build(element, renderState, valuesToRender, leadProjection, layoutState, options, props);
    }

    function update() {
      lifecycles.notifyUpdate(latestValues);
    }

    function updateLayoutProjection() {
      if (!element.isProjectionReady()) return;
      var delta = layoutState.delta,
          treeScale = layoutState.treeScale;
      var prevTreeScaleX = treeScale.x;
      var prevTreeScaleY = treeScale.y;
      var prevDeltaTransform = layoutState.deltaTransform;
      updateLayoutDeltas(layoutState, leadProjection, element.path, latestValues);
      hasViewportBoxUpdated && element.notifyViewportBoxUpdate(leadProjection.target, delta);
      hasViewportBoxUpdated = false;
      var deltaTransform = buildLayoutProjectionTransform(delta, treeScale);

      if (deltaTransform !== prevDeltaTransform || // Also compare calculated treeScale, for values that rely on this only for scale correction
      prevTreeScaleX !== treeScale.x || prevTreeScaleY !== treeScale.y) {
        element.scheduleRender();
      }

      layoutState.deltaTransform = deltaTransform;
    }

    function _updateTreeLayoutProjection() {
      element.layoutTree.forEach(fireUpdateLayoutProjection);
    }
    /**
     *
     */


    function bindToMotionValue(key, value) {
      var removeOnChange = value.onChange(function (latestValue) {
        latestValues[key] = latestValue;
        props.onUpdate && sync.update(update, false, true);
      });
      var removeOnRenderRequest = value.onRenderRequest(element.scheduleRender);
      valueSubscriptions.set(key, function () {
        removeOnChange();
        removeOnRenderRequest();
      });
    }
    /**
     * Any motion values that are provided to the element when created
     * aren't yet bound to the element, as this would technically be impure.
     * However, we iterate through the motion values and set them to the
     * initial values for this component.
     *
     * TODO: This is impure and we should look at changing this to run on mount.
     * Doing so will break some tests but this isn't neccessarily a breaking change,
     * more a reflection of the test.
     */


    var initialMotionValues = scrapeMotionValuesFromProps(props);

    for (var key in initialMotionValues) {
      var value = initialMotionValues[key];

      if (latestValues[key] !== undefined && isMotionValue(value)) {
        value.set(latestValues[key], false);
      }
    }
    /**
     * Determine what role this visual element should take in the variant tree.
     */


    var isControllingVariants = checkIfControllingVariants(props);
    var isVariantNode = checkIfVariantNode(props);

    var element = _assign(_assign({
      treeType: treeType,

      /**
       * This is a mirror of the internal instance prop, which keeps
       * VisualElement type-compatible with React's RefObject.
       */
      current: null,

      /**
       * The depth of this visual element within the visual element tree.
       */
      depth: parent ? parent.depth + 1 : 0,
      parent: parent,
      children: new Set(),

      /**
       * An ancestor path back to the root visual element. This is used
       * by layout projection to quickly recurse back up the tree.
       */
      path: parent ? __spreadArray(__spreadArray([], __read(parent.path)), [parent]) : [],
      layoutTree: parent ? parent.layoutTree : new FlatTree(),

      /**
       *
       */
      presenceId: presenceId,
      projection: projection,

      /**
       * If this component is part of the variant tree, it should track
       * any children that are also part of the tree. This is essentially
       * a shadow tree to simplify logic around how to stagger over children.
       */
      variantChildren: isVariantNode ? new Set() : undefined,

      /**
       * Whether this instance is visible. This can be changed imperatively
       * by AnimateSharedLayout, is analogous to CSS's visibility in that
       * hidden elements should take up layout, and needs enacting by the configured
       * render function.
       */
      isVisible: undefined,

      /**
       * Normally, if a component is controlled by a parent's variants, it can
       * rely on that ancestor to trigger animations further down the tree.
       * However, if a component is created after its parent is mounted, the parent
       * won't trigger that mount animation so the child needs to.
       *
       * TODO: This might be better replaced with a method isParentMounted
       */
      manuallyAnimateOnMount: Boolean(parent === null || parent === void 0 ? void 0 : parent.isMounted()),

      /**
       * This can be set by AnimatePresence to force components that mount
       * at the same time as it to mount as if they have initial={false} set.
       */
      blockInitialAnimation: blockInitialAnimation,

      /**
       * Determine whether this component has mounted yet. This is mostly used
       * by variant children to determine whether they need to trigger their
       * own animations on mount.
       */
      isMounted: function isMounted() {
        return Boolean(instance);
      },
      mount: function mount(newInstance) {
        instance = element.current = newInstance;
        element.pointTo(element);

        if (isVariantNode && parent && !isControllingVariants) {
          removeFromVariantTree = parent === null || parent === void 0 ? void 0 : parent.addVariantChild(element);
        }

        parent === null || parent === void 0 ? void 0 : parent.children.add(element);
      },

      /**
       *
       */
      unmount: function unmount() {
        cancelSync.update(update);
        cancelSync.render(render);
        cancelSync.preRender(element.updateLayoutProjection);
        valueSubscriptions.forEach(function (remove) {
          return remove();
        });
        element.stopLayoutAnimation();
        element.layoutTree.remove(element);
        removeFromVariantTree === null || removeFromVariantTree === void 0 ? void 0 : removeFromVariantTree();
        parent === null || parent === void 0 ? void 0 : parent.children["delete"](element);
        unsubscribeFromLeadVisualElement === null || unsubscribeFromLeadVisualElement === void 0 ? void 0 : unsubscribeFromLeadVisualElement();
        lifecycles.clearAllListeners();
      },

      /**
       * Add a child visual element to our set of children.
       */
      addVariantChild: function addVariantChild(child) {
        var _a;

        var closestVariantNode = element.getClosestVariantNode();

        if (closestVariantNode) {
          (_a = closestVariantNode.variantChildren) === null || _a === void 0 ? void 0 : _a.add(child);
          return function () {
            return closestVariantNode.variantChildren["delete"](child);
          };
        }
      },
      sortNodePosition: function sortNodePosition(other) {
        /**
         * If these nodes aren't even of the same type we can't compare their depth.
         */
        if (!_sortNodePosition || treeType !== other.treeType) return 0;
        return _sortNodePosition(element.getInstance(), other.getInstance());
      },

      /**
       * Returns the closest variant node in the tree starting from
       * this visual element.
       */
      getClosestVariantNode: function getClosestVariantNode() {
        return isVariantNode ? element : parent === null || parent === void 0 ? void 0 : parent.getClosestVariantNode();
      },

      /**
       * A method that schedules an update to layout projections throughout
       * the tree. We inherit from the parent so there's only ever one
       * job scheduled on the next frame - that of the root visual element.
       */
      scheduleUpdateLayoutProjection: parent ? parent.scheduleUpdateLayoutProjection : function () {
        return sync.preRender(element.updateTreeLayoutProjection, false, true);
      },

      /**
       * Expose the latest layoutId prop.
       */
      getLayoutId: function getLayoutId() {
        return props.layoutId;
      },

      /**
       * Returns the current instance.
       */
      getInstance: function getInstance() {
        return instance;
      },

      /**
       * Get/set the latest static values.
       */
      getStaticValue: function getStaticValue(key) {
        return latestValues[key];
      },
      setStaticValue: function setStaticValue(key, value) {
        return latestValues[key] = value;
      },

      /**
       * Returns the latest motion value state. Currently only used to take
       * a snapshot of the visual element - perhaps this can return the whole
       * visual state
       */
      getLatestValues: function getLatestValues() {
        return latestValues;
      },

      /**
       * Set the visiblity of the visual element. If it's changed, schedule
       * a render to reflect these changes.
       */
      setVisibility: function setVisibility(visibility) {
        if (element.isVisible === visibility) return;
        element.isVisible = visibility;
        element.scheduleRender();
      },

      /**
       * Make a target animatable by Popmotion. For instance, if we're
       * trying to animate width from 100px to 100vw we need to measure 100vw
       * in pixels to determine what we really need to animate to. This is also
       * pluggable to support Framer's custom value types like Color,
       * and CSS variables.
       */
      makeTargetAnimatable: function makeTargetAnimatable(target, canMutate) {
        if (canMutate === void 0) {
          canMutate = true;
        }

        return _makeTargetAnimatable(element, target, props, canMutate);
      },
      // Motion values ========================

      /**
       * Add a motion value and bind it to this visual element.
       */
      addValue: function addValue(key, value) {
        // Remove existing value if it exists
        if (element.hasValue(key)) element.removeValue(key);
        values.set(key, value);
        latestValues[key] = value.get();
        bindToMotionValue(key, value);
      },

      /**
       * Remove a motion value and unbind any active subscriptions.
       */
      removeValue: function removeValue(key) {
        var _a;

        values["delete"](key);
        (_a = valueSubscriptions.get(key)) === null || _a === void 0 ? void 0 : _a();
        valueSubscriptions["delete"](key);
        delete latestValues[key];
        removeValueFromRenderState(key, renderState);
      },

      /**
       * Check whether we have a motion value for this key
       */
      hasValue: function hasValue(key) {
        return values.has(key);
      },

      /**
       * Get a motion value for this key. If called with a default
       * value, we'll create one if none exists.
       */
      getValue: function getValue(key, defaultValue) {
        var value = values.get(key);

        if (value === undefined && defaultValue !== undefined) {
          value = motionValue(defaultValue);
          element.addValue(key, value);
        }

        return value;
      },

      /**
       * Iterate over our motion values.
       */
      forEachValue: function forEachValue(callback) {
        return values.forEach(callback);
      },

      /**
       * If we're trying to animate to a previously unencountered value,
       * we need to check for it in our state and as a last resort read it
       * directly from the instance (which might have performance implications).
       */
      readValue: function readValue(key) {
        var _a;

        return (_a = latestValues[key]) !== null && _a !== void 0 ? _a : readValueFromInstance(instance, key, options);
      },

      /**
       * Set the base target to later animate back to. This is currently
       * only hydrated on creation and when we first read a value.
       */
      setBaseTarget: function setBaseTarget(key, value) {
        baseTarget[key] = value;
      },

      /**
       * Find the base target for a value thats been removed from all animation
       * props.
       */
      getBaseTarget: function getBaseTarget(key) {
        if (_getBaseTarget) {
          var target = _getBaseTarget(props, key);

          if (target !== undefined && !isMotionValue(target)) return target;
        }

        return baseTarget[key];
      }
    }, lifecycles), {
      /**
       * Build the renderer state based on the latest visual state.
       */
      build: function build() {
        triggerBuild();
        return renderState;
      },

      /**
       * Schedule a render on the next animation frame.
       */
      scheduleRender: function scheduleRender() {
        sync.render(render, false, true);
      },

      /**
       * Synchronously fire render. It's prefered that we batch renders but
       * in many circumstances, like layout measurement, we need to run this
       * synchronously. However in those instances other measures should be taken
       * to batch reads/writes.
       */
      syncRender: render,

      /**
       * Update the provided props. Ensure any newly-added motion values are
       * added to our map, old ones removed, and listeners updated.
       */
      setProps: function setProps(newProps) {
        props = newProps;
        lifecycles.updatePropListeners(newProps);
        prevMotionValues = updateMotionValuesFromProps(element, scrapeMotionValuesFromProps(props), prevMotionValues);
      },
      getProps: function getProps() {
        return props;
      },
      // Variants ==============================

      /**
       * Returns the variant definition with a given name.
       */
      getVariant: function getVariant(name) {
        var _a;

        return (_a = props.variants) === null || _a === void 0 ? void 0 : _a[name];
      },

      /**
       * Returns the defined default transition on this component.
       */
      getDefaultTransition: function getDefaultTransition() {
        return props.transition;
      },

      /**
       * Used by child variant nodes to get the closest ancestor variant props.
       */
      getVariantContext: function getVariantContext(startAtParent) {
        if (startAtParent === void 0) {
          startAtParent = false;
        }

        if (startAtParent) return parent === null || parent === void 0 ? void 0 : parent.getVariantContext();

        if (!isControllingVariants) {
          var context_1 = (parent === null || parent === void 0 ? void 0 : parent.getVariantContext()) || {};

          if (props.initial !== undefined) {
            context_1.initial = props.initial;
          }

          return context_1;
        }

        var context = {};

        for (var i = 0; i < numVariantProps; i++) {
          var name_1 = variantProps[i];
          var prop = props[name_1];

          if (isVariantLabel(prop) || prop === false) {
            context[name_1] = prop;
          }
        }

        return context;
      },
      // Layout projection ==============================

      /**
       * Enable layout projection for this visual element. Won't actually
       * occur until we also have hydrated layout measurements.
       */
      enableLayoutProjection: function enableLayoutProjection() {
        projection.isEnabled = true;
        element.layoutTree.add(element);
      },

      /**
       * Lock the projection target, for instance when dragging, so
       * nothing else can try and animate it.
       */
      lockProjectionTarget: function lockProjectionTarget() {
        projection.isTargetLocked = true;
      },
      unlockProjectionTarget: function unlockProjectionTarget() {
        element.stopLayoutAnimation();
        projection.isTargetLocked = false;
      },
      getLayoutState: function getLayoutState() {
        return layoutState;
      },
      setCrossfader: function setCrossfader(newCrossfader) {
        crossfader = newCrossfader;
      },
      isProjectionReady: function isProjectionReady() {
        return projection.isEnabled && projection.isHydrated && layoutState.isHydrated;
      },

      /**
       * Start a layout animation on a given axis.
       */
      startLayoutAnimation: function startLayoutAnimation(axis, transition, isRelative) {
        if (isRelative === void 0) {
          isRelative = false;
        }

        var progress = element.getProjectionAnimationProgress()[axis];

        var _a = isRelative ? projection.relativeTarget[axis] : projection.target[axis],
            min = _a.min,
            max = _a.max;

        var length = max - min;
        progress.clearListeners();
        progress.set(min);
        progress.set(min); // Set twice to hard-reset velocity

        progress.onChange(function (v) {
          element.setProjectionTargetAxis(axis, v, v + length, isRelative);
        });
        return element.animateMotionValue(axis, progress, 0, transition);
      },

      /**
       * Stop layout animations.
       */
      stopLayoutAnimation: function stopLayoutAnimation() {
        eachAxis(function (axis) {
          return element.getProjectionAnimationProgress()[axis].stop();
        });
      },

      /**
       * Measure the current viewport box with or without transforms.
       * Only measures axis-aligned boxes, rotate and skew must be manually
       * removed with a re-render to work.
       */
      measureViewportBox: function measureViewportBox(withTransform) {
        if (withTransform === void 0) {
          withTransform = true;
        }

        var viewportBox = _measureViewportBox(instance, options);

        if (!withTransform) removeBoxTransforms(viewportBox, latestValues);
        return viewportBox;
      },

      /**
       * Get the motion values tracking the layout animations on each
       * axis. Lazy init if not already created.
       */
      getProjectionAnimationProgress: function getProjectionAnimationProgress() {
        projectionTargetProgress || (projectionTargetProgress = {
          x: motionValue(0),
          y: motionValue(0)
        });
        return projectionTargetProgress;
      },

      /**
       * Update the projection of a single axis. Schedule an update to
       * the tree layout projection.
       */
      setProjectionTargetAxis: function setProjectionTargetAxis(axis, min, max, isRelative) {
        if (isRelative === void 0) {
          isRelative = false;
        }

        var target;

        if (isRelative) {
          if (!projection.relativeTarget) {
            projection.relativeTarget = axisBox();
          }

          target = projection.relativeTarget[axis];
        } else {
          projection.relativeTarget = undefined;
          target = projection.target[axis];
        }

        projection.isHydrated = true;
        target.min = min;
        target.max = max; // Flag that we want to fire the onViewportBoxUpdate event handler

        hasViewportBoxUpdated = true;
        lifecycles.notifySetAxisTarget();
      },

      /**
       * Rebase the projection target on top of the provided viewport box
       * or the measured layout. This ensures that non-animating elements
       * don't fall out of sync differences in measurements vs projections
       * after a page scroll or other relayout.
       */
      rebaseProjectionTarget: function rebaseProjectionTarget(force, box) {
        if (box === void 0) {
          box = layoutState.layout;
        }

        var _a = element.getProjectionAnimationProgress(),
            x = _a.x,
            y = _a.y;

        var shouldRebase = !projection.relativeTarget && !projection.isTargetLocked && !x.isAnimating() && !y.isAnimating();

        if (force || shouldRebase) {
          eachAxis(function (axis) {
            var _a = box[axis],
                min = _a.min,
                max = _a.max;
            element.setProjectionTargetAxis(axis, min, max);
          });
        }
      },

      /**
       * Notify the visual element that its layout is up-to-date.
       * Currently Animate.tsx uses this to check whether a layout animation
       * needs to be performed.
       */
      notifyLayoutReady: function notifyLayoutReady(config) {
        setCurrentViewportBox(element);
        element.notifyLayoutUpdate(layoutState.layout, element.prevViewportBox || layoutState.layout, config);
      },

      /**
       * Temporarily reset the transform of the instance.
       */
      resetTransform: function resetTransform() {
        return _resetTransform(element, instance, props);
      },
      restoreTransform: function restoreTransform() {
        return _restoreTransform(instance, renderState);
      },
      updateLayoutProjection: updateLayoutProjection,
      updateTreeLayoutProjection: function updateTreeLayoutProjection() {
        element.layoutTree.forEach(fireResolveRelativeTargetBox);
        /**
         * Schedule the projection updates at the end of the current preRender
         * step. This will ensure that all layout trees will first resolve
         * relative projection boxes into viewport boxes, and *then*
         * update projections.
         */

        sync.preRender(_updateTreeLayoutProjection, false, true); // sync.postRender(() => element.scheduleUpdateLayoutProjection())
      },
      getProjectionParent: function getProjectionParent() {
        if (projectionParent === undefined) {
          var foundParent = false; // Search backwards through the tree path

          for (var i = element.path.length - 1; i >= 0; i--) {
            var ancestor = element.path[i];

            if (ancestor.projection.isEnabled) {
              foundParent = ancestor;
              break;
            }
          }

          projectionParent = foundParent;
        }

        return projectionParent;
      },
      resolveRelativeTargetBox: function resolveRelativeTargetBox() {
        var relativeParent = element.getProjectionParent();
        if (!projection.relativeTarget || !relativeParent) return;
        calcRelativeBox(projection, relativeParent.projection);

        if (isDraggable(relativeParent)) {
          var target = projection.target;
          applyBoxTransforms(target, target, relativeParent.getLatestValues());
        }
      },
      shouldResetTransform: function shouldResetTransform() {
        return Boolean(props._layoutResetTransform);
      },

      /**
       *
       */
      pointTo: function pointTo(newLead) {
        leadProjection = newLead.projection;
        leadLatestValues = newLead.getLatestValues();
        /**
         * Subscribe to lead component's layout animations
         */

        unsubscribeFromLeadVisualElement === null || unsubscribeFromLeadVisualElement === void 0 ? void 0 : unsubscribeFromLeadVisualElement();
        unsubscribeFromLeadVisualElement = pipe(newLead.onSetAxisTarget(element.scheduleUpdateLayoutProjection), newLead.onLayoutAnimationComplete(function () {
          var _a;

          if (element.isPresent) {
            element.presence = Presence.Present;
          } else {
            (_a = element.layoutSafeToRemove) === null || _a === void 0 ? void 0 : _a.call(element);
          }
        }));
      },
      // TODO: Clean this up
      isPresent: true,
      presence: Presence.Entering
    });

    return element;
  };
};

function fireResolveRelativeTargetBox(child) {
  child.resolveRelativeTargetBox();
}

function fireUpdateLayoutProjection(child) {
  child.updateLayoutProjection();
}

var variantProps = __spreadArray(["initial"], __read(variantPriorityOrder));

var numVariantProps = variantProps.length;

var positionalKeys = new Set(["width", "height", "top", "left", "right", "bottom", "x", "y"]);

var isPositionalKey = function isPositionalKey(key) {
  return positionalKeys.has(key);
};

var hasPositionalKey = function hasPositionalKey(target) {
  return Object.keys(target).some(isPositionalKey);
};

var setAndResetVelocity = function setAndResetVelocity(value, to) {
  // Looks odd but setting it twice doesn't render, it'll just
  // set both prev and current to the latest value
  value.set(to, false);
  value.set(to);
};

var isNumOrPxType = function isNumOrPxType(v) {
  return v === number || v === px$1;
};

var BoundingBoxDimension;

(function (BoundingBoxDimension) {
  BoundingBoxDimension["width"] = "width";
  BoundingBoxDimension["height"] = "height";
  BoundingBoxDimension["left"] = "left";
  BoundingBoxDimension["right"] = "right";
  BoundingBoxDimension["top"] = "top";
  BoundingBoxDimension["bottom"] = "bottom";
})(BoundingBoxDimension || (BoundingBoxDimension = {}));

var getPosFromMatrix = function getPosFromMatrix(matrix, pos) {
  return parseFloat(matrix.split(", ")[pos]);
};

var getTranslateFromMatrix = function getTranslateFromMatrix(pos2, pos3) {
  return function (_bbox, _a) {
    var transform = _a.transform;
    if (transform === "none" || !transform) return 0;
    var matrix3d = transform.match(/^matrix3d\((.+)\)$/);

    if (matrix3d) {
      return getPosFromMatrix(matrix3d[1], pos3);
    } else {
      var matrix = transform.match(/^matrix\((.+)\)$/);

      if (matrix) {
        return getPosFromMatrix(matrix[1], pos2);
      } else {
        return 0;
      }
    }
  };
};

var transformKeys = new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformProps.filter(function (key) {
  return !transformKeys.has(key);
});

function removeNonTranslationalTransform(visualElement) {
  var removedTransforms = [];
  nonTranslationalTransformKeys.forEach(function (key) {
    var value = visualElement.getValue(key);

    if (value !== undefined) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  }); // Apply changes to element before measurement

  if (removedTransforms.length) visualElement.syncRender();
  return removedTransforms;
}

var positionalValues = {
  // Dimensions
  width: function width(_a) {
    var x = _a.x;
    return x.max - x.min;
  },
  height: function height(_a) {
    var y = _a.y;
    return y.max - y.min;
  },
  top: function top(_bbox, _a) {
    var top = _a.top;
    return parseFloat(top);
  },
  left: function left(_bbox, _a) {
    var left = _a.left;
    return parseFloat(left);
  },
  bottom: function bottom(_a, _b) {
    var y = _a.y;
    var top = _b.top;
    return parseFloat(top) + (y.max - y.min);
  },
  right: function right(_a, _b) {
    var x = _a.x;
    var left = _b.left;
    return parseFloat(left) + (x.max - x.min);
  },
  // Transform
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};

var convertChangedValueTypes = function convertChangedValueTypes(target, visualElement, changedKeys) {
  var originBbox = visualElement.measureViewportBox();
  var element = visualElement.getInstance();
  var elementComputedStyle = getComputedStyle(element);
  var display = elementComputedStyle.display,
      top = elementComputedStyle.top,
      left = elementComputedStyle.left,
      bottom = elementComputedStyle.bottom,
      right = elementComputedStyle.right,
      transform = elementComputedStyle.transform;
  var originComputedStyle = {
    top: top,
    left: left,
    bottom: bottom,
    right: right,
    transform: transform
  }; // If the element is currently set to display: "none", make it visible before
  // measuring the target bounding box

  if (display === "none") {
    visualElement.setStaticValue("display", target.display || "block");
  } // Apply the latest values (as set in checkAndConvertChangedValueTypes)


  visualElement.syncRender();
  var targetBbox = visualElement.measureViewportBox();
  changedKeys.forEach(function (key) {
    // Restore styles to their **calculated computed style**, not their actual
    // originally set style. This allows us to animate between equivalent pixel units.
    var value = visualElement.getValue(key);
    setAndResetVelocity(value, positionalValues[key](originBbox, originComputedStyle));
    target[key] = positionalValues[key](targetBbox, elementComputedStyle);
  });
  return target;
};

var checkAndConvertChangedValueTypes = function checkAndConvertChangedValueTypes(visualElement, target, origin, transitionEnd) {
  if (origin === void 0) {
    origin = {};
  }

  if (transitionEnd === void 0) {
    transitionEnd = {};
  }

  target = _assign({}, target);
  transitionEnd = _assign({}, transitionEnd);
  var targetPositionalKeys = Object.keys(target).filter(isPositionalKey); // We want to remove any transform values that could affect the element's bounding box before
  // it's measured. We'll reapply these later.

  var removedTransformValues = [];
  var hasAttemptedToRemoveTransformValues = false;
  var changedValueTypeKeys = [];
  targetPositionalKeys.forEach(function (key) {
    var value = visualElement.getValue(key);
    if (!visualElement.hasValue(key)) return;
    var from = origin[key];
    var to = target[key];
    var fromType = findDimensionValueType(from);
    var toType; // TODO: The current implementation of this basically throws an error
    // if you try and do value conversion via keyframes. There's probably
    // a way of doing this but the performance implications would need greater scrutiny,
    // as it'd be doing multiple resize-remeasure operations.

    if (isKeyframesTarget(to)) {
      var numKeyframes = to.length;

      for (var i = to[0] === null ? 1 : 0; i < numKeyframes; i++) {
        if (!toType) {
          toType = findDimensionValueType(to[i]);
        } else {
          invariant(findDimensionValueType(to[i]) === toType);
        }
      }
    } else {
      toType = findDimensionValueType(to);
    }

    if (fromType !== toType) {
      // If they're both just number or px, convert them both to numbers rather than
      // relying on resize/remeasure to convert (which is wasteful in this situation)
      if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
        var current = value.get();

        if (typeof current === "string") {
          value.set(parseFloat(current));
        }

        if (typeof to === "string") {
          target[key] = parseFloat(to);
        } else if (Array.isArray(to) && toType === px$1) {
          target[key] = to.map(parseFloat);
        }
      } else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from === 0 || to === 0)) {
        // If one or the other value is 0, it's safe to coerce it to the
        // type of the other without measurement
        if (from === 0) {
          value.set(toType.transform(from));
        } else {
          target[key] = fromType.transform(to);
        }
      } else {
        // If we're going to do value conversion via DOM measurements, we first
        // need to remove non-positional transform values that could affect the bbox measurements.
        if (!hasAttemptedToRemoveTransformValues) {
          removedTransformValues = removeNonTranslationalTransform(visualElement);
          hasAttemptedToRemoveTransformValues = true;
        }

        changedValueTypeKeys.push(key);
        transitionEnd[key] = transitionEnd[key] !== undefined ? transitionEnd[key] : target[key];
        setAndResetVelocity(value, to);
      }
    }
  });

  if (changedValueTypeKeys.length) {
    var convertedTarget = convertChangedValueTypes(target, visualElement, changedValueTypeKeys); // If we removed transform values, reapply them before the next render

    if (removedTransformValues.length) {
      removedTransformValues.forEach(function (_a) {
        var _b = __read(_a, 2),
            key = _b[0],
            value = _b[1];

        visualElement.getValue(key).set(value);
      });
    } // Reapply original values


    visualElement.syncRender();
    return {
      target: convertedTarget,
      transitionEnd: transitionEnd
    };
  } else {
    return {
      target: target,
      transitionEnd: transitionEnd
    };
  }
};
/**
 * Convert value types for x/y/width/height/top/left/bottom/right
 *
 * Allows animation between `'auto'` -> `'100%'` or `0` -> `'calc(50% - 10vw)'`
 *
 * @internal
 */


function unitConversion(visualElement, target, origin, transitionEnd) {
  return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement, target, origin, transitionEnd) : {
    target: target,
    transitionEnd: transitionEnd
  };
}

/**
 * Parse a DOM variant to make it animatable. This involves resolving CSS variables
 * and ensuring animations like "20%" => "calc(50vw)" are performed in pixels.
 */

var parseDomVariant = function parseDomVariant(visualElement, target, origin, transitionEnd) {
  var resolved = resolveCSSVariables(visualElement, target, transitionEnd);
  target = resolved.target;
  transitionEnd = resolved.transitionEnd;
  return unitConversion(visualElement, target, origin, transitionEnd);
};

function getComputedStyle$1(element) {
  return window.getComputedStyle(element);
}

var htmlConfig = {
  treeType: "dom",
  readValueFromInstance: function readValueFromInstance(domElement, key) {
    if (isTransformProp(key)) {
      var defaultType = getDefaultValueType(key);
      return defaultType ? defaultType["default"] || 0 : 0;
    } else {
      var computedStyle = getComputedStyle$1(domElement);
      return (isCSSVariable(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
    }
  },
  sortNodePosition: function sortNodePosition(a, b) {
    /**
     * compareDocumentPosition returns a bitmask, by using the bitwise &
     * we're returning true if 2 in that bitmask is set to true. 2 is set
     * to true if b preceeds a.
     */
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  },
  getBaseTarget: function getBaseTarget(props, key) {
    var _a;

    return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
  },
  measureViewportBox: function measureViewportBox(element, _a) {
    var transformPagePoint = _a.transformPagePoint;
    return getBoundingBox(element, transformPagePoint);
  },

  /**
   * Reset the transform on the current Element. This is called as part
   * of a batched process across the entire layout tree. To remove this write
   * cycle it'd be interesting to see if it's possible to "undo" all the current
   * layout transforms up the tree in the same way this.getBoundingBoxWithoutTransforms
   * works
   */
  resetTransform: function resetTransform(element, domElement, props) {
    var transformTemplate = props.transformTemplate;
    domElement.style.transform = transformTemplate ? transformTemplate({}, "") : "none"; // Ensure that whatever happens next, we restore our transform on the next frame

    element.scheduleRender();
  },
  restoreTransform: function restoreTransform(instance, mutableState) {
    instance.style.transform = mutableState.style.transform;
  },
  removeValueFromRenderState: function removeValueFromRenderState(key, _a) {
    var vars = _a.vars,
        style = _a.style;
    delete vars[key];
    delete style[key];
  },

  /**
   * Ensure that HTML and Framer-specific value types like `px`->`%` and `Color`
   * can be animated by Motion.
   */
  makeTargetAnimatable: function makeTargetAnimatable(element, _a, _b, isMounted) {
    var transformValues = _b.transformValues;

    if (isMounted === void 0) {
      isMounted = true;
    }

    var transition = _a.transition,
        transitionEnd = _a.transitionEnd,
        target = __rest(_a, ["transition", "transitionEnd"]);

    var origin = getOrigin(target, transition || {}, element);
    /**
     * If Framer has provided a function to convert `Color` etc value types, convert them
     */

    if (transformValues) {
      if (transitionEnd) transitionEnd = transformValues(transitionEnd);
      if (target) target = transformValues(target);
      if (origin) origin = transformValues(origin);
    }

    if (isMounted) {
      checkTargetForNewValues(element, target, origin);
      var parsed = parseDomVariant(element, target, origin, transitionEnd);
      transitionEnd = parsed.transitionEnd;
      target = parsed.target;
    }

    return _assign({
      transition: transition,
      transitionEnd: transitionEnd
    }, target);
  },
  scrapeMotionValuesFromProps: scrapeMotionValuesFromProps,
  build: function build(element, renderState, latestValues, projection, layoutState, options, props) {
    if (element.isVisible !== undefined) {
      renderState.style.visibility = element.isVisible ? "visible" : "hidden";
    }

    var isProjectionTranform = projection.isEnabled && layoutState.isHydrated;
    buildHTMLStyles(renderState, latestValues, projection, layoutState, options, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : undefined, isProjectionTranform ? buildLayoutProjectionTransformOrigin : undefined);
  },
  render: renderHTML
};
var htmlVisualElement = visualElement(htmlConfig);

var svgVisualElement = visualElement(_assign(_assign({}, htmlConfig), {
  getBaseTarget: function getBaseTarget(props, key) {
    return props[key];
  },
  readValueFromInstance: function readValueFromInstance(domElement, key) {
    var _a;

    if (isTransformProp(key)) {
      return ((_a = getDefaultValueType(key)) === null || _a === void 0 ? void 0 : _a["default"]) || 0;
    }

    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return domElement.getAttribute(key);
  },
  scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
  build: function build(_element, renderState, latestValues, projection, layoutState, options, props) {
    var isProjectionTranform = projection.isEnabled && layoutState.isHydrated;
    buildSVGAttrs(renderState, latestValues, projection, layoutState, options, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : undefined, isProjectionTranform ? buildLayoutProjectionTransformOrigin : undefined);
  },
  render: renderSVG
}));

var createDomVisualElement = function createDomVisualElement(Component, options) {
  return isSVGComponent(Component) ? svgVisualElement(options, {
    enableHardwareAcceleration: false
  }) : htmlVisualElement(options, {
    enableHardwareAcceleration: true
  });
};

var featureBundle = _assign(_assign(_assign(_assign({}, animations), gestureAnimations), drag), layoutAnimations);
/**
 * HTML & SVG components, optimised for use with gestures and animation. These can be used as
 * drop-in replacements for any HTML & SVG component, all CSS & SVG properties are supported.
 *
 * @public
 */


var motion = /*@__PURE__*/createMotionProxy(function (Component, config) {
  return createDomMotionConfig(Component, config, featureBundle, createDomVisualElement);
});

function useForceUpdate$1() {
  var unloadingRef = react.useRef(false);

  var _a = __read(react.useState(0), 2),
      forcedRenderCount = _a[0],
      setForcedRenderCount = _a[1];

  useUnmountEffect$1(function () {
    return unloadingRef.current = true;
  });
  return react.useCallback(function () {
    !unloadingRef.current && setForcedRenderCount(forcedRenderCount + 1);
  }, [forcedRenderCount]);
}

var presenceId = 0;

function getPresenceId() {
  var id = presenceId;
  presenceId++;
  return id;
}

var PresenceChild = function PresenceChild(_a) {
  var children = _a.children,
      initial = _a.initial,
      isPresent = _a.isPresent,
      _onExitComplete = _a.onExitComplete,
      custom = _a.custom,
      presenceAffectsLayout = _a.presenceAffectsLayout;
  var presenceChildren = useConstant(newChildrenMap);
  var id = useConstant(getPresenceId);
  var context = react.useMemo(function () {
    return {
      id: id,
      initial: initial,
      isPresent: isPresent,
      custom: custom,
      onExitComplete: function onExitComplete(childId) {
        presenceChildren.set(childId, true);
        var allComplete = true;
        presenceChildren.forEach(function (isComplete) {
          if (!isComplete) allComplete = false;
        });
        allComplete && (_onExitComplete === null || _onExitComplete === void 0 ? void 0 : _onExitComplete());
      },
      register: function register(childId) {
        presenceChildren.set(childId, false);
        return function () {
          return presenceChildren["delete"](childId);
        };
      }
    };
  },
  /**
   * If the presence of a child affects the layout of the components around it,
   * we want to make a new context value to ensure they get re-rendered
   * so they can detect that layout change.
   */
  presenceAffectsLayout ? undefined : [isPresent]);
  react.useMemo(function () {
    presenceChildren.forEach(function (_, key) {
      return presenceChildren.set(key, false);
    });
  }, [isPresent]);
  /**
   * If there's no `motion` components to fire exit animations, we want to remove this
   * component immediately.
   */

  react.useEffect(function () {
    !isPresent && !presenceChildren.size && (_onExitComplete === null || _onExitComplete === void 0 ? void 0 : _onExitComplete());
  }, [isPresent]);
  return /*#__PURE__*/react.createElement(PresenceContext.Provider, {
    value: context
  }, children);
};

function newChildrenMap() {
  return new Map();
}

function getChildKey(child) {
  return child.key || "";
}

function updateChildLookup(children, allChildren) {
  children.forEach(function (child) {
    var key = getChildKey(child);

    allChildren.set(key, child);
  });
}

function onlyElements(children) {
  var filtered = []; // We use forEach here instead of map as map mutates the component key by preprending `.$`

  react.Children.forEach(children, function (child) {
    if ( /*#__PURE__*/react.isValidElement(child)) filtered.push(child);
  });
  return filtered;
}
/**
 * `AnimatePresence` enables the animation of components that have been removed from the tree.
 *
 * When adding/removing more than a single child, every child **must** be given a unique `key` prop.
 *
 * @library
 *
 * Any `Frame` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { Frame, AnimatePresence } from 'framer'
 *
 * // As items are added and removed from `items`
 * export function Items({ items }) {
 *   return (
 *     <AnimatePresence>
 *       {items.map(item => (
 *         <Frame
 *           key={item.id}
 *           initial={{ opacity: 0 }}
 *           animate={{ opacity: 1 }}
 *           exit={{ opacity: 0 }}
 *         />
 *       ))}
 *     </AnimatePresence>
 *   )
 * }
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * @motion
 *
 * Any `motion` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { motion, AnimatePresence } from 'framer-motion'
 *
 * export const Items = ({ items }) => (
 *   <AnimatePresence>
 *     {items.map(item => (
 *       <motion.div
 *         key={item.id}
 *         initial={{ opacity: 0 }}
 *         animate={{ opacity: 1 }}
 *         exit={{ opacity: 0 }}
 *       />
 *     ))}
 *   </AnimatePresence>
 * )
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * If a child contains multiple `motion` components with `exit` props, it will only unmount the child
 * once all `motion` components have finished animating out. Likewise, any components using
 * `usePresence` all need to call `safeToRemove`.
 *
 * @public
 */


var AnimatePresence = function AnimatePresence(_a) {
  var children = _a.children,
      custom = _a.custom,
      _b = _a.initial,
      initial = _b === void 0 ? true : _b,
      onExitComplete = _a.onExitComplete,
      exitBeforeEnter = _a.exitBeforeEnter,
      _c = _a.presenceAffectsLayout,
      presenceAffectsLayout = _c === void 0 ? true : _c; // We want to force a re-render once all exiting animations have finished. We
  // either use a local forceRender function, or one from a parent context if it exists.

  var forceRender = useForceUpdate$1();
  var layoutContext = react.useContext(SharedLayoutContext);

  if (isSharedLayout(layoutContext)) {
    forceRender = layoutContext.forceUpdate;
  }

  var isInitialRender = react.useRef(true); // Filter out any children that aren't ReactElements. We can only track ReactElements with a props.key

  var filteredChildren = onlyElements(children); // Keep a living record of the children we're actually rendering so we
  // can diff to figure out which are entering and exiting

  var presentChildren = react.useRef(filteredChildren); // A lookup table to quickly reference components by key

  var allChildren = react.useRef(new Map()).current; // A living record of all currently exiting components.

  var exiting = react.useRef(new Set()).current;
  updateChildLookup(filteredChildren, allChildren); // If this is the initial component render, just deal with logic surrounding whether
  // we play onMount animations or not.

  if (isInitialRender.current) {
    isInitialRender.current = false;
    return /*#__PURE__*/react.createElement(react.Fragment, null, filteredChildren.map(function (child) {
      return /*#__PURE__*/react.createElement(PresenceChild, {
        key: getChildKey(child),
        isPresent: true,
        initial: initial ? undefined : false,
        presenceAffectsLayout: presenceAffectsLayout
      }, child);
    }));
  } // If this is a subsequent render, deal with entering and exiting children


  var childrenToRender = __spreadArray([], __read(filteredChildren)); // Diff the keys of the currently-present and target children to update our
  // exiting list.


  var presentKeys = presentChildren.current.map(getChildKey);
  var targetKeys = filteredChildren.map(getChildKey); // Diff the present children with our target children and mark those that are exiting

  var numPresent = presentKeys.length;

  for (var i = 0; i < numPresent; i++) {
    var key = presentKeys[i];

    if (targetKeys.indexOf(key) === -1) {
      exiting.add(key);
    } else {
      // In case this key has re-entered, remove from the exiting list
      exiting["delete"](key);
    }
  } // If we currently have exiting children, and we're deferring rendering incoming children
  // until after all current children have exiting, empty the childrenToRender array


  if (exitBeforeEnter && exiting.size) {
    childrenToRender = [];
  } // Loop through all currently exiting components and clone them to overwrite `animate`
  // with any `exit` prop they might have defined.


  exiting.forEach(function (key) {
    // If this component is actually entering again, early return
    if (targetKeys.indexOf(key) !== -1) return;
    var child = allChildren.get(key);
    if (!child) return;
    var insertionIndex = presentKeys.indexOf(key);

    var onExit = function onExit() {
      allChildren["delete"](key);
      exiting["delete"](key); // Remove this child from the present children

      var removeIndex = presentChildren.current.findIndex(function (presentChild) {
        return presentChild.key === key;
      });
      presentChildren.current.splice(removeIndex, 1); // Defer re-rendering until all exiting children have indeed left

      if (!exiting.size) {
        presentChildren.current = filteredChildren;
        forceRender();
        onExitComplete && onExitComplete();
      }
    };

    childrenToRender.splice(insertionIndex, 0, /*#__PURE__*/react.createElement(PresenceChild, {
      key: getChildKey(child),
      isPresent: false,
      onExitComplete: onExit,
      custom: custom,
      presenceAffectsLayout: presenceAffectsLayout
    }, child));
  }); // Add `MotionContext` even to children that don't need it to ensure we're rendering
  // the same tree between renders

  childrenToRender = childrenToRender.map(function (child) {
    var key = child.key;
    return exiting.has(key) ? child : /*#__PURE__*/react.createElement(PresenceChild, {
      key: getChildKey(child),
      isPresent: true,
      presenceAffectsLayout: presenceAffectsLayout
    }, child);
  });
  presentChildren.current = childrenToRender;

  return /*#__PURE__*/react.createElement(react.Fragment, null, exiting.size ? childrenToRender : childrenToRender.map(function (child) {
    return /*#__PURE__*/react.cloneElement(child);
  }));
};

function _extends$n() {
  _extends$n = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$n.apply(this, arguments);
}
var CheckIcon = function CheckIcon(props) {
  return /*#__PURE__*/react.createElement(Icon, _extends$n({
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/react.createElement("path", {
    fill: "currentColor",
    d: "M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
  }));
};
var InfoIcon = function InfoIcon(props) {
  return /*#__PURE__*/react.createElement(Icon, _extends$n({
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/react.createElement("path", {
    fill: "currentColor",
    d: "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"
  }));
};
var WarningIcon = function WarningIcon(props) {
  return /*#__PURE__*/react.createElement(Icon, _extends$n({
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/react.createElement("path", {
    fill: "currentColor",
    d: "M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
  }));
};

function _slicedToArray$e(arr, i) { return _arrayWithHoles$e(arr) || _iterableToArrayLimit$e(arr, i) || _unsupportedIterableToArray$g(arr, i) || _nonIterableRest$e(); }

function _nonIterableRest$e() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$g(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$g(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$g(o, minLen); }

function _arrayLikeToArray$g(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$e(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$e(arr) { if (Array.isArray(arr)) return arr; }

function _extends$o() {
  _extends$o = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$o.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$5(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
var STATUSES = {
  info: {
    icon: InfoIcon,
    colorScheme: "blue"
  },
  warning: {
    icon: WarningIcon,
    colorScheme: "orange"
  },
  success: {
    icon: CheckIcon,
    colorScheme: "green"
  },
  error: {
    icon: WarningIcon,
    colorScheme: "red"
  }
};

var _createContext$3 = createContext({
  name: "AlertContext",
  errorMessage: "useAlertContext: `context` is undefined. Seems you forgot to wrap alert components in `<Alert />`"
}),
    _createContext2$3 = _slicedToArray$e(_createContext$3, 2),
    AlertProvider = _createContext2$3[0],
    useAlertContext = _createContext2$3[1];
/**
 * Alert is used to communicate the state or status of a
 * page, feature or action
 */


var Alert$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var _props$colorScheme;

  var _omitThemingProps = omitThemingProps(props),
      _omitThemingProps$sta = _omitThemingProps.status,
      status = _omitThemingProps$sta === void 0 ? "info" : _omitThemingProps$sta,
      rest = _objectWithoutPropertiesLoose$5(_omitThemingProps, ["status"]);

  var colorScheme = (_props$colorScheme = props.colorScheme) != null ? _props$colorScheme : STATUSES[status].colorScheme;
  var styles = useMultiStyleConfig("Alert", _extends$o({}, props, {
    colorScheme: colorScheme
  }));

  var alertStyles = _extends$o({
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden"
  }, styles.container);

  return /*#__PURE__*/react.createElement(AlertProvider, {
    value: {
      status: status
    }
  }, /*#__PURE__*/react.createElement(StylesProvider, {
    value: styles
  }, /*#__PURE__*/react.createElement(chakra.div, _extends$o({
    role: "alert",
    ref: ref
  }, rest, {
    className: cx("chakra-alert", props.className),
    __css: alertStyles
  }))));
});
var AlertTitle = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyles();
  return /*#__PURE__*/react.createElement(chakra.div, _extends$o({
    ref: ref
  }, props, {
    className: cx("chakra-alert__title", props.className),
    __css: styles.title
  }));
});
var AlertDescription = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyles();

  var descriptionStyles = _extends$o({
    display: "inline"
  }, styles.description);

  return /*#__PURE__*/react.createElement(chakra.div, _extends$o({
    ref: ref
  }, props, {
    className: cx("chakra-alert__desc", props.className),
    __css: descriptionStyles
  }));
});
var AlertIcon = function AlertIcon(props) {
  var _useAlertContext = useAlertContext(),
      status = _useAlertContext.status;

  var BaseIcon = STATUSES[status].icon;
  var styles = useStyles();
  return /*#__PURE__*/react.createElement(chakra.span, _extends$o({
    display: "inherit"
  }, props, {
    className: cx("chakra-alert__icon", props.className),
    __css: styles.icon
  }), /*#__PURE__*/react.createElement(BaseIcon, {
    w: "100%",
    h: "100%"
  }));
};

/**
 * Styles to visually hide an element
 * but make it accessible to screen-readers
 */

var visuallyHiddenStyle = {
  border: "0px",
  clip: "rect(0px, 0px, 0px, 0px)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute"
};
/**
 * Visually hidden component used to hide
 * elements on screen
 */

var VisuallyHidden = chakra("span", {
  baseStyle: visuallyHiddenStyle
});
/**
 * Visually hidden input component for designing
 * custom input components using the html `input`
 * as a proxy
 */


var VisuallyHiddenInput = chakra("input", {
  baseStyle: visuallyHiddenStyle
});

function _extends$p() {
  _extends$p = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$p.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$6(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
var spin = keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});
/**
 * Spinner is used to indicate the loading state of a page or a component,
 * It renders a `div` by default.
 *
 * @see Docs https://chakra-ui.com/spinner
 */

var Spinner$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyleConfig("Spinner", props);

  var _omitThemingProps = omitThemingProps(props),
      _omitThemingProps$lab = _omitThemingProps.label,
      label = _omitThemingProps$lab === void 0 ? "Loading..." : _omitThemingProps$lab,
      _omitThemingProps$thi = _omitThemingProps.thickness,
      thickness = _omitThemingProps$thi === void 0 ? "2px" : _omitThemingProps$thi,
      _omitThemingProps$spe = _omitThemingProps.speed,
      speed = _omitThemingProps$spe === void 0 ? "0.45s" : _omitThemingProps$spe,
      _omitThemingProps$emp = _omitThemingProps.emptyColor,
      emptyColor = _omitThemingProps$emp === void 0 ? "transparent" : _omitThemingProps$emp,
      className = _omitThemingProps.className,
      rest = _objectWithoutPropertiesLoose$6(_omitThemingProps, ["label", "thickness", "speed", "emptyColor", "className"]);

  var _className = cx("chakra-spinner", className);

  var spinnerStyles = _extends$p({
    display: "inline-block",
    borderColor: "currentColor",
    borderStyle: "solid",
    borderRadius: "99999px",
    borderWidth: thickness,
    borderBottomColor: emptyColor,
    borderLeftColor: emptyColor,
    animation: spin + " " + speed + " linear infinite"
  }, styles);

  return /*#__PURE__*/react.createElement(chakra.div, _extends$p({
    ref: ref,
    __css: spinnerStyles,
    className: _className
  }, rest), label && /*#__PURE__*/react.createElement(VisuallyHidden, null, label));
});

function _slicedToArray$f(arr, i) { return _arrayWithHoles$f(arr) || _iterableToArrayLimit$f(arr, i) || _unsupportedIterableToArray$h(arr, i) || _nonIterableRest$f(); }

function _nonIterableRest$f() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$h(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$h(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$h(o, minLen); }

function _arrayLikeToArray$h(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$f(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$f(arr) { if (Array.isArray(arr)) return arr; }

var _createContext$4 = createContext({
  strict: false,
  name: "ButtonGroupContext"
}),
    _createContext2$4 = _slicedToArray$f(_createContext$4, 2),
    ButtonGroupProvider = _createContext2$4[0],
    useButtonGroup = _createContext2$4[1];

function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray$g(arr, i) { return _arrayWithHoles$g(arr) || _iterableToArrayLimit$g(arr, i) || _unsupportedIterableToArray$i(arr, i) || _nonIterableRest$g(); }

function _nonIterableRest$g() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$i(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$i(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$i(o, minLen); }

function _arrayLikeToArray$i(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$g(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$g(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutPropertiesLoose$7(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _extends$q() {
  _extends$q = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$q.apply(this, arguments);
}
var Button$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var _styles$_focus;

  var group = useButtonGroup();
  var styles = useStyleConfig("Button", _extends$q({}, group, props));

  var _omitThemingProps = omitThemingProps(props),
      _omitThemingProps$isD = _omitThemingProps.isDisabled,
      isDisabled = _omitThemingProps$isD === void 0 ? group == null ? void 0 : group.isDisabled : _omitThemingProps$isD,
      isLoading = _omitThemingProps.isLoading,
      isActive = _omitThemingProps.isActive,
      isFullWidth = _omitThemingProps.isFullWidth,
      children = _omitThemingProps.children,
      leftIcon = _omitThemingProps.leftIcon,
      rightIcon = _omitThemingProps.rightIcon,
      loadingText = _omitThemingProps.loadingText,
      _omitThemingProps$ico = _omitThemingProps.iconSpacing,
      iconSpacing = _omitThemingProps$ico === void 0 ? "0.5rem" : _omitThemingProps$ico,
      type = _omitThemingProps.type,
      spinner = _omitThemingProps.spinner,
      _omitThemingProps$spi = _omitThemingProps.spinnerPlacement,
      spinnerPlacement = _omitThemingProps$spi === void 0 ? "start" : _omitThemingProps$spi,
      className = _omitThemingProps.className,
      as = _omitThemingProps.as,
      rest = _objectWithoutPropertiesLoose$7(_omitThemingProps, ["isDisabled", "isLoading", "isActive", "isFullWidth", "children", "leftIcon", "rightIcon", "loadingText", "iconSpacing", "type", "spinner", "spinnerPlacement", "className", "as"]);
  /**
   * When button is used within ButtonGroup (i.e flushed with sibling buttons),
   * it is important to add a `zIndex` on focus.
   *
   * So let's read the component styles and then add `zIndex` to it.
   */


  var _focus = lodash_mergewith({}, (_styles$_focus = styles == null ? void 0 : styles["_focus"]) != null ? _styles$_focus : {}, {
    zIndex: 1
  });

  var buttonStyles = _extends$q({
    display: "inline-flex",
    appearance: "none",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    position: "relative",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    outline: "none",
    width: isFullWidth ? "100%" : "auto"
  }, styles, !!group && {
    _focus: _focus
  });

  var _useButtonType = useButtonType(as),
      _ref = _useButtonType.ref,
      defaultType = _useButtonType.type;

  return /*#__PURE__*/react.createElement(chakra.button, _extends$q({
    disabled: isDisabled || isLoading,
    ref: mergeRefs(ref, _ref),
    as: as,
    type: type != null ? type : defaultType,
    "data-active": dataAttr(isActive),
    "data-loading": dataAttr(isLoading),
    __css: buttonStyles,
    className: cx("chakra-button", className)
  }, rest), leftIcon && !isLoading && /*#__PURE__*/react.createElement(ButtonIcon, {
    marginEnd: iconSpacing
  }, leftIcon), isLoading && spinnerPlacement === "start" && /*#__PURE__*/react.createElement(ButtonSpinner, {
    className: "chakra-button__spinner--start",
    label: loadingText,
    placement: "start"
  }, spinner), isLoading ? loadingText || /*#__PURE__*/react.createElement(chakra.span, {
    opacity: 0
  }, children) : children, isLoading && spinnerPlacement === "end" && /*#__PURE__*/react.createElement(ButtonSpinner, {
    className: "chakra-button__spinner--end",
    label: loadingText,
    placement: "end"
  }, spinner), rightIcon && !isLoading && /*#__PURE__*/react.createElement(ButtonIcon, {
    marginStart: iconSpacing
  }, rightIcon));
});

function useButtonType(value) {
  var _React$useState = react.useState(!value),
      _React$useState2 = _slicedToArray$g(_React$useState, 2),
      isButton = _React$useState2[0],
      setIsButton = _React$useState2[1];

  var refCallback = react.useCallback(function (node) {
    if (!node) return;
    setIsButton(node.tagName === "BUTTON");
  }, []);
  var type = isButton ? "button" : undefined;
  return {
    ref: refCallback,
    type: type
  };
}

var ButtonIcon = function ButtonIcon(props) {
  var children = props.children,
      className = props.className,
      rest = _objectWithoutPropertiesLoose$7(props, ["children", "className"]);

  var _children = /*#__PURE__*/ /*#__PURE__*/react.isValidElement(children) ? /*#__PURE__*/react.cloneElement(children, {
    "aria-hidden": true,
    focusable: false
  }) : children;

  var _className = cx("chakra-button__icon", className);

  return /*#__PURE__*/react.createElement(chakra.span, _extends$q({
    display: "inline-flex",
    alignSelf: "center",
    flexShrink: 0
  }, rest, {
    className: _className
  }), _children);
};

var ButtonSpinner = function ButtonSpinner(props) {
  var _extends2;

  var label = props.label,
      placement = props.placement,
      _props$children = props.children,
      children = _props$children === void 0 ? /*#__PURE__*/react.createElement(Spinner$1, {
    color: "currentColor",
    width: "1em",
    height: "1em"
  }) : _props$children,
      className = props.className,
      __css = props.__css,
      rest = _objectWithoutPropertiesLoose$7(props, ["label", "placement", "spacing", "children", "className", "__css"]);

  var _className = cx("chakra-button__spinner", className);

  var marginProp = placement === "start" ? "marginEnd" : "marginStart";

  var spinnerStyles = _extends$q((_extends2 = {
    display: "flex",
    alignItems: "center",
    position: label ? "relative" : "absolute"
  }, _defineProperty$4(_extends2, marginProp, label ? "0.5rem" : 0), _defineProperty$4(_extends2, "fontSize", "1em"), _defineProperty$4(_extends2, "lineHeight", "normal"), _extends2), __css);

  return /*#__PURE__*/react.createElement(chakra.div, _extends$q({
    className: _className
  }, rest, {
    __css: spinnerStyles
  }), children);
};

function _objectWithoutPropertiesLoose$8(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _extends$r() {
  _extends$r = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$r.apply(this, arguments);
}

var CloseIcon = function CloseIcon(props) {
  return /*#__PURE__*/react.createElement(Icon, _extends$r({
    focusable: "false",
    "aria-hidden": true
  }, props), /*#__PURE__*/react.createElement("path", {
    fill: "currentColor",
    d: "M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
  }));
};
/**
 * A button with a close icon.
 *
 * It is used to handle the close functionality in feedback and overlay components
 * like Alerts, Toasts, Drawers and Modals.
 */


var CloseButton$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyleConfig("CloseButton", props);

  var _omitThemingProps = omitThemingProps(props),
      children = _omitThemingProps.children,
      isDisabled = _omitThemingProps.isDisabled,
      __css = _omitThemingProps.__css,
      rest = _objectWithoutPropertiesLoose$8(_omitThemingProps, ["children", "isDisabled", "__css"]);

  var baseStyle = {
    outline: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  };
  return /*#__PURE__*/react.createElement(chakra.button, _extends$r({
    type: "button",
    "aria-label": "Close",
    ref: ref,
    disabled: isDisabled,
    __css: _extends$r({}, baseStyle, styles, __css)
  }, rest), children || /*#__PURE__*/react.createElement(CloseIcon, {
    width: "1em",
    height: "1em"
  }));
});

function _slicedToArray$h(arr, i) { return _arrayWithHoles$h(arr) || _iterableToArrayLimit$h(arr, i) || _unsupportedIterableToArray$j(arr, i) || _nonIterableRest$h(); }

function _nonIterableRest$h() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$j(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$j(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$j(o, minLen); }

function _arrayLikeToArray$j(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$h(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$h(arr) { if (Array.isArray(arr)) return arr; }

function _extends$s() {
  _extends$s = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$s.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$9(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _createContext$5 = createContext({
  strict: false,
  name: "FormControlContext"
}),
    _createContext2$5 = _slicedToArray$h(_createContext$5, 2),
    FormControlProvider = _createContext2$5[0],
    useFormControlContext = _createContext2$5[1];

function useFormControlProvider(props) {
  var idProp = props.id,
      isRequired = props.isRequired,
      isInvalid = props.isInvalid,
      isDisabled = props.isDisabled,
      isReadOnly = props.isReadOnly,
      htmlProps = _objectWithoutPropertiesLoose$9(props, ["id", "isRequired", "isInvalid", "isDisabled", "isReadOnly"]); // Generate all the required ids


  var uuid = useId();
  var id = idProp || "field-" + uuid;
  var labelId = id + "-label";
  var feedbackId = id + "-feedback";
  var helpTextId = id + "-helptext";
  /**
   * Track whether the `FormErrorMessage` has been rendered.
   * We use this to append its id the the `aria-describedby` of the `input`.
   */

  var _React$useState = react.useState(false),
      _React$useState2 = _slicedToArray$h(_React$useState, 2),
      hasFeedbackText = _React$useState2[0],
      setHasFeedbackText = _React$useState2[1];
  /**
   * Track whether the `FormHelperText` has been rendered.
   * We use this to append its id the the `aria-describedby` of the `input`.
   */


  var _React$useState3 = react.useState(false),
      _React$useState4 = _slicedToArray$h(_React$useState3, 2),
      hasHelpText = _React$useState4[0],
      setHasHelpText = _React$useState4[1]; // Track whether the form element (e.g, `input`) has focus.


  var _useBoolean = useBoolean(),
      _useBoolean2 = _slicedToArray$h(_useBoolean, 2),
      isFocused = _useBoolean2[0],
      setFocus = _useBoolean2[1];

  var getHelpTextProps = react.useCallback(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return _extends$s({
      id: helpTextId
    }, props, {
      /**
       * Notify the field context when the help text is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
       */
      ref: mergeRefs(forwardedRef, function (node) {
        if (!node) return;
        setHasHelpText(true);
      })
    });
  }, [helpTextId]);
  var getLabelProps = react.useCallback(function (props, forwardedRef) {
    var _props$id, _props$htmlFor;

    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return _extends$s({}, props, {
      ref: forwardedRef,
      "data-focus": dataAttr(isFocused),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly),
      id: (_props$id = props.id) != null ? _props$id : labelId,
      htmlFor: (_props$htmlFor = props.htmlFor) != null ? _props$htmlFor : id
    });
  }, [id, isDisabled, isFocused, isInvalid, isReadOnly, labelId]);
  var getErrorMessageProps = react.useCallback(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return _extends$s({
      id: feedbackId
    }, props, {
      /**
       * Notify the field context when the error message is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
       */
      ref: mergeRefs(forwardedRef, function (node) {
        if (!node) return;
        setHasFeedbackText(true);
      }),
      "aria-live": "polite"
    });
  }, [feedbackId]);
  var getRootProps = react.useCallback(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return _extends$s({}, props, htmlProps, {
      ref: forwardedRef,
      role: "group"
    });
  }, [htmlProps]);
  var getRequiredIndicatorProps = react.useCallback(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return _extends$s({}, props, {
      ref: forwardedRef,
      role: "presentation",
      "aria-hidden": true,
      children: props.children || "*"
    });
  }, []);
  var onFocus = react.useCallback(function () {
    scheduleMicrotask(setFocus.on);
  }, [setFocus]);
  return {
    isRequired: !!isRequired,
    isInvalid: !!isInvalid,
    isReadOnly: !!isReadOnly,
    isDisabled: !!isDisabled,
    isFocused: !!isFocused,
    onFocus: onFocus,
    onBlur: setFocus.off,
    hasFeedbackText: hasFeedbackText,
    setHasFeedbackText: setHasFeedbackText,
    hasHelpText: hasHelpText,
    setHasHelpText: setHasHelpText,
    id: id,
    labelId: labelId,
    feedbackId: feedbackId,
    helpTextId: helpTextId,
    htmlProps: htmlProps,
    getHelpTextProps: getHelpTextProps,
    getErrorMessageProps: getErrorMessageProps,
    getRootProps: getRootProps,
    getLabelProps: getLabelProps,
    getRequiredIndicatorProps: getRequiredIndicatorProps
  };
}
/**
 * FormControl provides context such as
 * `isInvalid`, `isDisabled`, and `isRequired` to form elements.
 *
 * This is commonly used in form elements such as `input`,
 * `select`, `textarea`, etc.
 */


var FormControl = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useMultiStyleConfig("Form", props);
  var ownProps = omitThemingProps(props);

  var _useFormControlProvid = useFormControlProvider(ownProps),
      getRootProps = _useFormControlProvid.getRootProps,
      context = _objectWithoutPropertiesLoose$9(_useFormControlProvid, ["getRootProps", "htmlProps"]);

  var className = cx("chakra-form-control", props.className);
  var contextValue = react.useMemo(function () {
    return context;
  }, [context]);
  return /*#__PURE__*/react.createElement(FormControlProvider, {
    value: contextValue
  }, /*#__PURE__*/react.createElement(StylesProvider, {
    value: styles
  }, /*#__PURE__*/react.createElement(chakra.div, _extends$s({}, getRootProps({}, ref), {
    className: className,
    __css: {
      width: "100%",
      position: "relative"
    }
  }))));
});

function _extends$t() {
  _extends$t = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$t.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$a(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
/**
 * React hook that provides the props that should be spread on to
 * input fields (`input`, `select`, `textarea`, etc.).
 *
 * It provides a convenient way to control a form fields, validation
 * and helper text.
 */

function useFormControl(props) {
  var _useFormControlProps = useFormControlProps(props),
      isDisabled = _useFormControlProps.isDisabled,
      isInvalid = _useFormControlProps.isInvalid,
      isReadOnly = _useFormControlProps.isReadOnly,
      isRequired = _useFormControlProps.isRequired,
      rest = _objectWithoutPropertiesLoose$a(_useFormControlProps, ["isDisabled", "isInvalid", "isReadOnly", "isRequired"]);

  return _extends$t({}, rest, {
    disabled: isDisabled,
    readOnly: isReadOnly,
    required: isRequired,
    "aria-invalid": ariaAttr(isInvalid),
    "aria-required": ariaAttr(isRequired),
    "aria-readonly": ariaAttr(isReadOnly)
  });
}
function useFormControlProps(props) {
  var _ref, _ref2, _ref3;

  var field = useFormControlContext();

  var id = props.id,
      disabled = props.disabled,
      readOnly = props.readOnly,
      required = props.required,
      isRequired = props.isRequired,
      isInvalid = props.isInvalid,
      isReadOnly = props.isReadOnly,
      isDisabled = props.isDisabled,
      onFocus = props.onFocus,
      onBlur = props.onBlur,
      rest = _objectWithoutPropertiesLoose$a(props, ["id", "disabled", "readOnly", "required", "isRequired", "isInvalid", "isReadOnly", "isDisabled", "onFocus", "onBlur"]);

  var labelIds = []; // Error message must be described first in all scenarios.

  if (field != null && field.hasFeedbackText && field != null && field.isInvalid) {
    labelIds.push(field.feedbackId);
  }

  if (field != null && field.hasHelpText) {
    labelIds.push(field.helpTextId);
  }

  return _extends$t({}, rest, {
    "aria-describedby": labelIds.join(" ") || undefined,
    id: id != null ? id : field == null ? void 0 : field.id,
    isDisabled: (_ref = disabled != null ? disabled : isDisabled) != null ? _ref : field == null ? void 0 : field.isDisabled,
    isReadOnly: (_ref2 = readOnly != null ? readOnly : isReadOnly) != null ? _ref2 : field == null ? void 0 : field.isReadOnly,
    isRequired: (_ref3 = required != null ? required : isRequired) != null ? _ref3 : field == null ? void 0 : field.isRequired,
    isInvalid: isInvalid != null ? isInvalid : field == null ? void 0 : field.isInvalid,
    onFocus: callAllHandlers(field == null ? void 0 : field.onFocus, onFocus),
    onBlur: callAllHandlers(field == null ? void 0 : field.onBlur, onBlur)
  });
}

function _extends$u() {
  _extends$u = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$u.apply(this, arguments);
}
/**
 * Input
 *
 * Element that allows users enter single valued data.
 */

var Input$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useMultiStyleConfig("Input", props);
  var ownProps = omitThemingProps(props);
  var input = useFormControl(ownProps);

  var _className = cx("chakra-input", props.className);

  return /*#__PURE__*/react.createElement(chakra.input, _extends$u({}, input, {
    __css: styles.field,
    ref: ref,
    className: _className
  }));
});


Input$1.id = "Input";

/**
 * Box is the most abstract component on top of which other chakra
 * components are built. It renders a `div` element by default.
 *
 * @see Docs https://chakra-ui.com/box
 */

var Box = chakra("div");

function _extends$v() {
  _extends$v = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$v.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$b(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
/**
 * React component used to create flexbox layouts.
 *
 * It renders a `div` with `display: flex` and
 * comes with helpful style shorthand.
 *
 * @see Docs https://chakra-ui.com/flex
 */

var Flex = /*#__PURE__*/forwardRef(function (props, ref) {
  var direction = props.direction,
      align = props.align,
      justify = props.justify,
      wrap = props.wrap,
      basis = props.basis,
      grow = props.grow,
      shrink = props.shrink,
      rest = _objectWithoutPropertiesLoose$b(props, ["direction", "align", "justify", "wrap", "basis", "grow", "shrink"]);

  var styles = {
    display: "flex",
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    flexBasis: basis,
    flexGrow: grow,
    flexShrink: shrink
  };
  return /*#__PURE__*/react.createElement(chakra.div, _extends$v({
    ref: ref,
    __css: styles
  }, rest));
});

function _extends$w() {
  _extends$w = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$w.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$c(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
var Heading$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyleConfig("Heading", props);

  var _omitThemingProps = omitThemingProps(props),
      rest = _objectWithoutPropertiesLoose$c(_omitThemingProps, ["className"]);

  return /*#__PURE__*/react.createElement(chakra.h2, _extends$w({
    ref: ref,
    className: cx("chakra-heading", props.className)
  }, rest, {
    __css: styles
  }));
});

function _defineProperty$5(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/**
 * If we ever run into SSR issues with this, check this post to find a fix for it:
 * @see https://medium.com/@emmenko/patching-lobotomized-owl-selector-for-emotion-ssr-5a582a3c424c
 */

var selector = "& > *:not(style) ~ *:not(style)";
function getStackStyles(options) {
  var spacing = options.spacing,
      direction = options.direction;
  var directionStyles = {
    column: {
      marginTop: spacing,
      marginEnd: 0,
      marginBottom: 0,
      marginStart: 0
    },
    row: {
      marginTop: 0,
      marginEnd: 0,
      marginBottom: 0,
      marginStart: spacing
    },
    "column-reverse": {
      marginTop: 0,
      marginEnd: 0,
      marginBottom: spacing,
      marginStart: 0
    },
    "row-reverse": {
      marginTop: 0,
      marginEnd: spacing,
      marginBottom: 0,
      marginStart: 0
    }
  };
  return _defineProperty$5({
    flexDirection: direction
  }, selector, mapResponsive(direction, function (value) {
    return directionStyles[value];
  }));
}
function getDividerStyles(options) {
  var spacing = options.spacing,
      direction = options.direction;
  var dividerStyles = {
    column: {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    "column-reverse": {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    row: {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    },
    "row-reverse": {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    }
  };
  return {
    "&": mapResponsive(direction, function (value) {
      return dividerStyles[value];
    })
  };
}

function _defineProperty$6(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose$d(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _extends$x() {
  _extends$x = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$x.apply(this, arguments);
}
var StackItem = function StackItem(props) {
  return /*#__PURE__*/react.createElement(chakra.div, _extends$x({
    className: "chakra-stack__item"
  }, props, {
    __css: _extends$x({
      display: "inline-block",
      flex: "0 0 auto",
      minWidth: 0
    }, props["__css"])
  }));
};
/**
 * Stacks help you easily create flexible and automatically distributed layouts
 *
 * You can stack elements in the horizontal or vertical direction,
 * and apply a space or/and divider between each element.
 *
 * It uses `display: flex` internally and renders a `div`.
 *
 * @see Docs https://chakra-ui.com/stack
 *
 */

var Stack = /*#__PURE__*/forwardRef(function (props, ref) {
  var isInline = props.isInline,
      directionProp = props.direction,
      align = props.align,
      justify = props.justify,
      _props$spacing = props.spacing,
      spacing = _props$spacing === void 0 ? "0.5rem" : _props$spacing,
      wrap = props.wrap,
      children = props.children,
      divider = props.divider,
      className = props.className,
      shouldWrapChildren = props.shouldWrapChildren,
      rest = _objectWithoutPropertiesLoose$d(props, ["isInline", "direction", "align", "justify", "spacing", "wrap", "children", "divider", "className", "shouldWrapChildren"]);

  var direction = isInline ? "row" : directionProp != null ? directionProp : "column";
  var styles = react.useMemo(function () {
    return getStackStyles({
      direction: direction,
      spacing: spacing
    });
  }, [direction, spacing]);
  var dividerStyle = react.useMemo(function () {
    return getDividerStyles({
      spacing: spacing,
      direction: direction
    });
  }, [spacing, direction]);
  var hasDivider = !!divider;
  var shouldUseChildren = !shouldWrapChildren && !hasDivider;
  var validChildren = getValidChildren(children);
  var clones = shouldUseChildren ? validChildren : validChildren.map(function (child, index) {
    var isLast = index + 1 === validChildren.length;
    var wrappedChild = /*#__PURE__*/react.createElement(StackItem, {
      key: index
    }, child);

    var _child = shouldWrapChildren ? wrappedChild : child;

    if (!hasDivider) return _child;
    var clonedDivider = /*#__PURE__*/react.cloneElement(divider, {
      __css: dividerStyle
    });

    var _divider = isLast ? null : clonedDivider;

    return /*#__PURE__*/react.createElement(react.Fragment, {
      key: index
    }, _child, _divider);
  });

  var _className = cx("chakra-stack", className);

  return /*#__PURE__*/react.createElement(chakra.div, _extends$x({
    ref: ref,
    display: "flex",
    alignItems: align,
    justifyContent: justify,
    flexDirection: styles.flexDirection,
    flexWrap: wrap,
    className: _className,
    __css: hasDivider ? {} : _defineProperty$6({}, selector, styles[selector])
  }, rest), clones);
});
/**
 * A view that arranges its children in a horizontal line.
 */


var HStack = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/react.createElement(Stack, _extends$x({
    align: "center"
  }, props, {
    direction: "row",
    ref: ref
  }));
});

function _slicedToArray$i(arr, i) { return _arrayWithHoles$i(arr) || _iterableToArrayLimit$i(arr, i) || _unsupportedIterableToArray$k(arr, i) || _nonIterableRest$i(); }

function _nonIterableRest$i() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$k(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$k(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$k(o, minLen); }

function _arrayLikeToArray$k(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$i(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$i(arr) { if (Array.isArray(arr)) return arr; }
function createMediaQueries(breakpoints) {
  return Object.entries(breakpoints) // sort css units in ascending order to ensure media queries are generated
  // in the correct order and reference to each other correctly aswell
  .sort(function (a, b) {
    return Number.parseInt(a[1], 10) > Number.parseInt(b[1], 10) ? 1 : -1;
  }).map(function (_ref, index, arr) {
    var _ref2 = _slicedToArray$i(_ref, 2),
        breakpoint = _ref2[0],
        minWidth = _ref2[1]; // given a following breakpoint


    var next = arr[index + 1]; // this breakpoint must end prior the threshold of the next

    var maxWidth = next ? next[1] : undefined;
    var query = createMediaQueryString(minWidth, maxWidth);
    return {
      minWidth: minWidth,
      maxWidth: maxWidth,
      breakpoint: breakpoint,
      query: query
    };
  });
}
/**
 * Create a media query string from the breakpoints,
 * using a combination of `min-width` and `max-width`.
 */

function createMediaQueryString(minWidth, maxWidth) {
  var hasMinWidth = parseInt(minWidth, 10) >= 0;

  if (!hasMinWidth && !maxWidth) {
    return "";
  }

  var query = "(min-width: " + toMediaString(minWidth) + ")";

  if (!maxWidth) {
    return query;
  }

  if (query) {
    query += " and ";
  }

  query += "(max-width: " + toMediaString(subtract$1(maxWidth)) + ")";
  return query;
}

var measurementRegex = /([0-9]+\.?[0-9]*)/;

var calculateMeasurement = function calculateMeasurement(value, modifier) {
  if (typeof value === "number") {
    return "" + (value + modifier);
  }

  return value.replace(measurementRegex, function (match) {
    return "" + (parseFloat(match) + modifier);
  });
};
/**
 * 0.01 and 0.1 are too small of a difference for `px` breakpoint values
 *
 * @see https://github.com/chakra-ui/chakra-ui/issues/2188#issuecomment-712774785
 */


function subtract$1(value) {
  return calculateMeasurement(value, value.endsWith("px") ? -1 : -0.01);
}
/**
 * Convert media query value to string
 */


function toMediaString(value) {
  return isNumber(value) ? value + "px" : value;
}

function _slicedToArray$j(arr, i) { return _arrayWithHoles$j(arr) || _iterableToArrayLimit$j(arr, i) || _unsupportedIterableToArray$l(arr, i) || _nonIterableRest$j(); }

function _nonIterableRest$j() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$l(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$l(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$l(o, minLen); }

function _arrayLikeToArray$l(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$j(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$j(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutPropertiesLoose$e(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _extends$y() {
  _extends$y = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$y.apply(this, arguments);
}
/**
 * React hook used to get the current responsive media breakpoint.
 *
 * @param defaultBreakpoint default breakpoint name
 * (in non-window environments like SSR)
 *
 * For SSR, you can use a package like [is-mobile](https://github.com/kaimallea/isMobile)
 * to get the default breakpoint value from the user-agent
 */

function useBreakpoint(defaultBreakpoint) {
  var _useTheme = useTheme(),
      breakpoints = _useTheme.breakpoints;

  var env = useEnvironment();
  var mediaQueries = react.useMemo(function () {
    return createMediaQueries(_extends$y({
      base: "0px"
    }, breakpoints));
  }, [breakpoints]);

  var _React$useState = react.useState(function () {
    if (!defaultBreakpoint) {
      return undefined;
    }

    var mediaQuery = mediaQueries.find(function (_ref) {
      var breakpoint = _ref.breakpoint;
      return breakpoint === defaultBreakpoint;
    });

    if (mediaQuery) {
      var breakpoint = _objectWithoutPropertiesLoose$e(mediaQuery, ["query"]);

      return breakpoint;
    }

    return undefined;
  }),
      _React$useState2 = _slicedToArray$j(_React$useState, 2),
      currentBreakpoint = _React$useState2[0],
      setCurrentBreakpoint = _React$useState2[1];

  var current = currentBreakpoint == null ? void 0 : currentBreakpoint.breakpoint;
  var update = react.useCallback(function (query, breakpoint) {
    if (query.matches && current !== breakpoint.breakpoint) {
      setCurrentBreakpoint(breakpoint);
    }
  }, [current]);
  react.useEffect(function () {
    var listeners = new Set();
    mediaQueries.forEach(function (_ref2) {
      var query = _ref2.query,
          breakpoint = _objectWithoutPropertiesLoose$e(_ref2, ["query"]);

      var mediaQuery = env.window.matchMedia(query); // trigger an initial update to determine media query

      update(mediaQuery, breakpoint);

      var handleChange = function handleChange() {
        update(mediaQuery, breakpoint);
      }; // add media query-listener


      mediaQuery.addListener(handleChange); // push the media query list handleChange
      // so we can use it to remove Listener

      listeners.add({
        mediaQuery: mediaQuery,
        handleChange: handleChange
      });
      return function () {
        // clean up 1
        mediaQuery.removeListener(handleChange);
      };
    });
    return function () {
      // clean up 2: for safety
      listeners.forEach(function (_ref3) {
        var mediaQuery = _ref3.mediaQuery,
            handleChange = _ref3.handleChange;
        mediaQuery.removeListener(handleChange);
      });
      listeners.clear();
    };
  }, [mediaQueries, breakpoints, update, env.window]);
  return current;
}

function getClosestValue(values, breakpoint, breakpoints$1) {
  if (breakpoints$1 === void 0) {
    breakpoints$1 = breakpoints;
  }

  var index = Object.keys(values).indexOf(breakpoint);

  if (index !== -1) {
    return values[breakpoint];
  }

  var stopIndex = breakpoints$1.indexOf(breakpoint);

  while (stopIndex >= 0) {
    var key = breakpoints$1[stopIndex];

    if (values[key] != null) {
      index = stopIndex;
      break;
    }

    stopIndex -= 1;
  }

  if (index !== -1) {
    var _key = breakpoints$1[index];
    return values[_key];
  }

  return undefined;
}

function _slicedToArray$k(arr, i) { return _arrayWithHoles$k(arr) || _iterableToArrayLimit$k(arr, i) || _unsupportedIterableToArray$m(arr, i) || _nonIterableRest$k(); }

function _nonIterableRest$k() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$m(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$m(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$m(o, minLen); }

function _arrayLikeToArray$m(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$k(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$k(arr) { if (Array.isArray(arr)) return arr; }
/**
 * React hook for getting the value for the current breakpoint from the
 * provided responsive values object.
 *
 * @param values
 * @param defaultBreakpoint default breakpoint name
 * (in non-window environments like SSR)
 *
 * For SSR, you can use a package like [is-mobile](https://github.com/kaimallea/isMobile)
 * to get the default breakpoint value from the user-agent
 *
 * @example
 * const width = useBreakpointValue({ base: '150px', md: '250px' })
 */

function useBreakpointValue(values, defaultBreakpoint) {
  var breakpoint = useBreakpoint(defaultBreakpoint);
  var theme = useTheme();
  if (!breakpoint) return undefined;
  /**
   * Get the non-number breakpoint keys from the provided breakpoints
   */

  var breakpoints = Object.keys(theme.breakpoints);
  var obj = isArray(values) ? fromEntries(Object.entries(arrayToObjectNotation(values, breakpoints)).map(function (_ref) {
    var _ref2 = _slicedToArray$k(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return [key, value];
  })) : values;
  return getClosestValue(obj, breakpoint, breakpoints);
}

function _extends$z() {
  _extends$z = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$z.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$f(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
var Table$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useMultiStyleConfig("Table", props);

  var _omitThemingProps = omitThemingProps(props),
      className = _omitThemingProps.className,
      tableProps = _objectWithoutPropertiesLoose$f(_omitThemingProps, ["className"]);

  return /*#__PURE__*/react.createElement(StylesProvider, {
    value: styles
  }, /*#__PURE__*/react.createElement(chakra.table, _extends$z({
    role: "table",
    ref: ref,
    __css: styles.table,
    className: cx("chakra-table", className)
  }, tableProps)));
});

var Thead = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyles();
  return /*#__PURE__*/react.createElement(chakra.thead, _extends$z({}, props, {
    ref: ref,
    __css: styles.thead
  }));
});
var Tbody = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyles();
  return /*#__PURE__*/react.createElement(chakra.tbody, _extends$z({}, props, {
    ref: ref,
    __css: styles.tbody
  }));
});
var Th = /*#__PURE__*/forwardRef(function (_ref2, ref) {
  var isNumeric = _ref2.isNumeric,
      rest = _objectWithoutPropertiesLoose$f(_ref2, ["isNumeric"]);

  var styles = useStyles();
  return /*#__PURE__*/react.createElement(chakra.th, _extends$z({}, rest, {
    ref: ref,
    __css: styles.th,
    "data-is-numeric": isNumeric
  }));
});
var Tr = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyles();
  return /*#__PURE__*/react.createElement(chakra.tr, _extends$z({
    role: "row"
  }, props, {
    ref: ref,
    __css: styles.tr
  }));
});
var Td = /*#__PURE__*/forwardRef(function (_ref3, ref) {
  var isNumeric = _ref3.isNumeric,
      rest = _objectWithoutPropertiesLoose$f(_ref3, ["isNumeric"]);

  var styles = useStyles();
  return /*#__PURE__*/react.createElement(chakra.td, _extends$z({
    role: "gridcell"
  }, rest, {
    ref: ref,
    __css: styles.td,
    "data-is-numeric": isNumeric
  }));
});

function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

/*:: import type { Window } from '../types'; */

/*:: declare function getWindow(node: Node | Window): Window; */
function getWindow(node) {
  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  return node;
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/*:: declare function isElement(node: mixed): boolean %checks(node instanceof
  Element); */

function isElement$1(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
/*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
  HTMLElement); */


function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getDocumentElement(element) {
  // $FlowFixMe: assume body is always available
  return (isElement$1(element) ? element.ownerDocument : element.document).documentElement;
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getComputedStyle$2(element) {
  return getWindow(element).getComputedStyle(element);
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle$2(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.
function getLayoutRect(element) {
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// $FlowFixMe: this is a quicker (but less type safe) way to save quite some bytes from the bundle
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    // $FlowFixMe: need a better way to handle this...
    element.host || // ShadowRoot detected
    // $FlowFixMe: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the 
reference element's position.
*/

function listScrollParents(element, list) {
  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = getNodeName(scrollParent) === 'body';
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle$2(element).position === 'fixed') {
    return null;
  }

  var offsetParent = element.offsetParent;

  if (offsetParent) {
    var html = getDocumentElement(offsetParent);

    if (getNodeName(offsetParent) === 'body' && getComputedStyle$2(offsetParent).position === 'static' && getComputedStyle$2(html).position !== 'static') {
      return html;
    }
  }

  return offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var currentNode = getParentNode(element);

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle$2(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.

    if (css.transform !== 'none' || css.perspective !== 'none' || css.willChange && css.willChange !== 'auto') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$2(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && getNodeName(offsetParent) === 'body' && getComputedStyle$2(offsetParent).position === 'static') {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto$1 = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto$1]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function order$1(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order$1(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign(Object.assign(Object.assign({}, existing), current), {}, {
      options: Object.assign(Object.assign({}, existing.options), current.options),
      data: Object.assign(Object.assign({}, existing.data), current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = element.ownerDocument.body;
  var width = Math.max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = Math.max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle$2(body || html).direction === 'rtl') {
    x += Math.max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function contains(parent, child) {
  // $FlowFixMe: hasOwnProperty doesn't seem to work in tests
  var isShadow = Boolean(child.getRootNode && child.getRootNode().host); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (isShadow) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function rectToClientRect(rect) {
  return Object.assign(Object.assign({}, rect), {}, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$2(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement$1(clipperElement)) {
    return [];
  } // $FlowFixMe: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = Math.max(rect.top, accRect.top);
    accRect.right = Math.min(rect.right, accRect.right);
    accRect.bottom = Math.min(rect.bottom, accRect.bottom);
    accRect.left = Math.max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function getVariation(placement) {
  return placement.split('-')[1];
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) - Math.floor(reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) + Math.ceil(reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign(Object.assign({}, getFreshSideObject()), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(referenceElement);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign(Object.assign({}, popperRect), popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign(Object.assign({}, DEFAULT_OPTIONS), defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign(Object.assign(Object.assign({}, defaultOptions), state.options), options);
        state.scrollParents = {
          reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var passive = {
  passive: true
};

function effect$1(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect$1,
  data: {}
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name; // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step

  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsets(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: Math.round(x * dpr) / dpr || 0,
    y: Math.round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive;

  var _roundOffsets = roundOffsets(offsets),
      x = _roundOffsets.x,
      y = _roundOffsets.y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);
    } // $FlowFixMe: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

    /*:: offsetParent = (offsetParent: Element); */


    if (placement === top) {
      sideY = bottom;
      y -= offsetParent.clientHeight - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left) {
      sideX = right;
      x -= offsetParent.clientWidth - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref3) {
  var state = _ref3.state,
      options = _ref3.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive;

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign(Object.assign({}, state.styles.popper), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign(Object.assign({}, state.styles.arrow), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false
    })));
  }

  state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$2,
  requires: ['computeStyles']
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign(Object.assign({}, rects), {}, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

var hash$1 = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash$1[matched];
  });
}

/*:: type OverflowsMap = { [ComputedPlacement]: number }; */

/*;; type OverflowsMap = { [key in ComputedPlacement]: number }; */

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements; // $FlowFixMe

  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  } // $FlowFixMe: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto$1) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto$1 ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


var flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function within(min, value, max) {
  return Math.max(min, Math.min(value, max));
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign(Object.assign({}, state.rects), {}, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = popperOffsets[mainAxis] + overflow[mainSide];
    var max = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _mainSide = mainAxis === 'x' ? top : left;

    var _altSide = mainAxis === 'x' ? bottom : right;

    var _offset = popperOffsets[altAxis];

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var _preventedOffset = within(_min, _offset, _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = state.modifiersData[name + "#persistent"].padding;
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect$3(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element,
      _options$padding = options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {

    return;
  }

  state.elements.arrow = arrowElement;
  state.modifiersData[name + "#persistent"] = {
    padding: mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements))
  };
} // eslint-disable-next-line import/no-unused-modules


var arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect$3,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


var hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

function _typeof$a(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$a = function _typeof(obj) { return typeof obj; }; } else { _typeof$a = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$a(obj); }

function _extends$A() {
  _extends$A = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$A.apply(this, arguments);
}

var toVar = function toVar(value, fallback) {
  return {
    "var": value,
    varRef: fallback ? "var(" + value + ", " + fallback + ")" : "var(" + value + ")"
  };
};

var cssVars = {
  arrowShadowColor: toVar("--popper-arrow-shadow-color"),
  arrowSize: toVar("--popper-arrow-size", "8px"),
  arrowSizeHalf: toVar("--popper-arrow-size-half"),
  arrowBg: toVar("--popper-arrow-bg"),
  transformOrigin: toVar("--popper-transform-origin"),
  arrowOffset: toVar("--popper-arrow-offset")
};
function getBoxShadow(placement) {
  if (placement.includes("top")) return "1px 1px 1px 0 var(--popper-arrow-shadow-color)";
  if (placement.includes("bottom")) return "-1px -1px 1px 0 var(--popper-arrow-shadow-color)";
  if (placement.includes("right")) return "-1px 1px 1px 0 var(--popper-arrow-shadow-color)";
  if (placement.includes("left")) return "1px -1px 1px 0 var(--popper-arrow-shadow-color)";
}
var transforms = {
  top: "bottom center",
  "top-start": "bottom left",
  "top-end": "bottom right",
  bottom: "top center",
  "bottom-start": "top left",
  "bottom-end": "top right",
  left: "right center",
  "left-start": "right top",
  "left-end": "right bottom",
  right: "left center",
  "right-start": "left top",
  "right-end": "left bottom"
};
var toTransformOrigin = function toTransformOrigin(placement) {
  return transforms[placement];
};
var defaultEventListeners = {
  scroll: true,
  resize: true
};
function getEventListenerOptions(value) {
  var eventListeners;

  if (_typeof$a(value) === "object") {
    eventListeners = {
      enabled: true,
      options: _extends$A({}, defaultEventListeners, value)
    };
  } else {
    eventListeners = {
      enabled: value,
      options: defaultEventListeners
    };
  }

  return eventListeners;
}

function _defineProperty$7(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/* -------------------------------------------------------------------------------------------------
 The match width modifier sets the popper width to match the reference.
 It us useful for custom selects, autocomplete, etc.
* -----------------------------------------------------------------------------------------------*/

var matchWidth = {
  name: "matchWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: function fn(_ref) {
    var state = _ref.state;
    state.styles.popper.width = state.rects.reference.width + "px";
  },
  effect: function effect(_ref2) {
    var state = _ref2.state;
    return function () {
      var reference = state.elements.reference;
      state.elements.popper.style.width = reference.offsetWidth + "px";
    };
  }
};
/* -------------------------------------------------------------------------------------------------
  The transform origin modifier sets the css `transformOrigin` value of the popper
  based on the dynamic placement state of the popper.
  
  Useful when we need to animate/transition the popper.
* -----------------------------------------------------------------------------------------------*/

var transformOrigin = {
  name: "transformOrigin",
  enabled: true,
  phase: "write",
  fn: function fn(_ref3) {
    var state = _ref3.state;
    setTransformOrigin(state);
  },
  effect: function effect(_ref4) {
    var state = _ref4.state;
    return function () {
      setTransformOrigin(state);
    };
  }
};

var setTransformOrigin = function setTransformOrigin(state) {
  state.elements.popper.style.setProperty(cssVars.transformOrigin["var"], toTransformOrigin(state.placement));
};
/* -------------------------------------------------------------------------------------------------
  The position arrow modifier adds width, height and overrides the `top/left/right/bottom`
  styles generated by popper.js to properly position the arrow
* -----------------------------------------------------------------------------------------------*/


var positionArrow = {
  name: "positionArrow",
  enabled: true,
  phase: "afterWrite",
  fn: function fn(_ref5) {
    var state = _ref5.state;
    setArrowStyles(state);
  }
};

var setArrowStyles = function setArrowStyles(state) {
  var _state$elements;

  if (!state.placement) return;
  var overrides = getArrowStyle(state.placement);

  if ((_state$elements = state.elements) != null && _state$elements.arrow && overrides) {
    var _Object$assign, _vars;

    Object.assign(state.elements.arrow.style, (_Object$assign = {}, _defineProperty$7(_Object$assign, overrides.property, overrides.value), _defineProperty$7(_Object$assign, "width", cssVars.arrowSize.varRef), _defineProperty$7(_Object$assign, "height", cssVars.arrowSize.varRef), _defineProperty$7(_Object$assign, "zIndex", -1), _Object$assign));
    var vars = (_vars = {}, _defineProperty$7(_vars, cssVars.arrowSizeHalf["var"], "calc(" + cssVars.arrowSize.varRef + " / 2)"), _defineProperty$7(_vars, cssVars.arrowOffset["var"], "calc(" + cssVars.arrowSizeHalf.varRef + " * -1)"), _vars);

    for (var property in vars) {
      state.elements.arrow.style.setProperty(property, vars[property]);
    }
  }
};

var getArrowStyle = function getArrowStyle(placement) {
  if (placement.startsWith("top")) {
    return {
      property: "bottom",
      value: cssVars.arrowOffset.varRef
    };
  }

  if (placement.startsWith("bottom")) {
    return {
      property: "top",
      value: cssVars.arrowOffset.varRef
    };
  }

  if (placement.startsWith("left")) {
    return {
      property: "right",
      value: cssVars.arrowOffset.varRef
    };
  }

  if (placement.startsWith("right")) {
    return {
      property: "left",
      value: cssVars.arrowOffset.varRef
    };
  }
};
/* -------------------------------------------------------------------------------------------------
  The inner arrow modifier, sets the placement styles for the inner arrow that forms
  the popper arrow tip.
* -----------------------------------------------------------------------------------------------*/


var innerArrow = {
  name: "innerArrow",
  enabled: true,
  phase: "main",
  requires: ["arrow"],
  fn: function fn(_ref6) {
    var state = _ref6.state;
    setInnerArrowStyles(state);
  },
  effect: function effect(_ref7) {
    var state = _ref7.state;
    return function () {
      setInnerArrowStyles(state);
    };
  }
};

var setInnerArrowStyles = function setInnerArrowStyles(state) {
  if (!state.elements.arrow) return;
  var inner = state.elements.arrow.querySelector("[data-popper-arrow-inner]");
  if (!inner) return;
  Object.assign(inner.style, {
    transform: "rotate(45deg)",
    background: cssVars.arrowBg.varRef,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "inherit",
    boxShadow: getBoxShadow(state.placement)
  });
};

function _toConsumableArray$4(arr) { return _arrayWithoutHoles$4(arr) || _iterableToArray$6(arr) || _unsupportedIterableToArray$n(arr) || _nonIterableSpread$4(); }

function _nonIterableSpread$4() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$n(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$n(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$n(o, minLen); }

function _iterableToArray$6(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles$4(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$n(arr); }

function _arrayLikeToArray$n(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutPropertiesLoose$g(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _extends$B() {
  _extends$B = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$B.apply(this, arguments);
}
function usePopper(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      _props$enabled = _props.enabled,
      enabled = _props$enabled === void 0 ? true : _props$enabled,
      _props$modifiers = _props.modifiers,
      modifiers = _props$modifiers === void 0 ? [] : _props$modifiers,
      _props$placement = _props.placement,
      placementProp = _props$placement === void 0 ? "bottom" : _props$placement,
      _props$strategy = _props.strategy,
      strategy = _props$strategy === void 0 ? "absolute" : _props$strategy,
      _props$arrowPadding = _props.arrowPadding,
      arrowPadding = _props$arrowPadding === void 0 ? 8 : _props$arrowPadding,
      _props$eventListeners = _props.eventListeners,
      eventListeners = _props$eventListeners === void 0 ? true : _props$eventListeners,
      offset = _props.offset,
      _props$gutter = _props.gutter,
      gutter = _props$gutter === void 0 ? 8 : _props$gutter,
      _props$flip = _props.flip,
      flip = _props$flip === void 0 ? true : _props$flip,
      _props$boundary = _props.boundary,
      boundary = _props$boundary === void 0 ? "clippingParents" : _props$boundary,
      _props$preventOverflo = _props.preventOverflow,
      preventOverflow = _props$preventOverflo === void 0 ? true : _props$preventOverflo,
      matchWidth$1 = _props.matchWidth;
  var reference = react.useRef(null);
  var popper = react.useRef(null);
  var instance = react.useRef(null);
  var cleanup = react.useRef(function () {});
  var setupPopper = react.useCallback(function () {
    if (!enabled || !reference.current || !popper.current) return; // If popper instance exists, destroy it so we can create a new one

    cleanup.current == null ? void 0 : cleanup.current();
    instance.current = createPopper(reference.current, popper.current, {
      placement: placementProp,
      modifiers: [innerArrow, positionArrow, transformOrigin, _extends$B({}, matchWidth, {
        enabled: !!matchWidth$1
      }), _extends$B({
        name: "eventListeners"
      }, getEventListenerOptions(eventListeners)), {
        name: "arrow",
        options: {
          padding: arrowPadding
        }
      }, {
        name: "offset",
        options: {
          offset: offset != null ? offset : [0, gutter]
        }
      }, {
        name: "flip",
        enabled: !!flip,
        options: {
          padding: 8
        }
      }, {
        name: "preventOverflow",
        enabled: !!preventOverflow,
        options: {
          boundary: boundary
        }
      }].concat(_toConsumableArray$4(modifiers)),
      strategy: strategy
    }); // force update one-time to fix any positioning issues

    instance.current.forceUpdate();
    cleanup.current = instance.current.destroy;
  }, [enabled, placementProp, modifiers, matchWidth$1, eventListeners, arrowPadding, offset, gutter, flip, preventOverflow, boundary, strategy]);
  react.useEffect(function () {
    return function () {
      /**
       * Fast refresh might call this function and tear down the popper
       * even if the reference still exists. This checks against that
       */
      if (!reference.current && !popper.current) {
        var _instance$current;

        (_instance$current = instance.current) == null ? void 0 : _instance$current.destroy();
        instance.current = null;
      }
    };
  }, []);
  var referenceRef = react.useCallback(function (node) {
    reference.current = node;
    setupPopper();
  }, [setupPopper]);
  var getReferenceProps = react.useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends$B({}, props, {
      ref: mergeRefs(referenceRef, ref)
    });
  }, [referenceRef]);
  var popperRef = react.useCallback(function (node) {
    popper.current = node;
    setupPopper();
  }, [setupPopper]);
  var getPopperProps = react.useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends$B({}, props, {
      ref: mergeRefs(popperRef, ref),
      style: _extends$B({}, props.style, {
        position: strategy,
        minWidth: "max-content",
        inset: "0 auto auto 0"
      })
    });
  }, [strategy, popperRef]);
  var getArrowProps = react.useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    var rest = _objectWithoutPropertiesLoose$g(props, ["size", "shadowColor", "bg", "style"]);

    return _extends$B({}, rest, {
      ref: ref,
      "data-popper-arrow": "",
      style: getArrowStyle$1(props)
    });
  }, []);
  var getArrowInnerProps = react.useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends$B({}, props, {
      ref: ref,
      "data-popper-arrow-inner": ""
    });
  }, []);
  return {
    update: function update() {
      var _instance$current2;

      (_instance$current2 = instance.current) == null ? void 0 : _instance$current2.update();
    },
    forceUpdate: function forceUpdate() {
      var _instance$current3;

      (_instance$current3 = instance.current) == null ? void 0 : _instance$current3.forceUpdate();
    },
    transformOrigin: cssVars.transformOrigin.varRef,
    referenceRef: referenceRef,
    popperRef: popperRef,
    getPopperProps: getPopperProps,
    getArrowProps: getArrowProps,
    getArrowInnerProps: getArrowInnerProps,
    getReferenceProps: getReferenceProps
  };
}

function getArrowStyle$1(props) {
  var size = props.size,
      shadowColor = props.shadowColor,
      bg = props.bg,
      style = props.style;

  var computedStyle = _extends$B({}, style, {
    position: "absolute"
  });

  if (size) {
    computedStyle["--popper-arrow-size"] = size;
  }

  if (shadowColor) {
    computedStyle["--popper-arrow-shadow-color"] = shadowColor;
  }

  if (bg) {
    computedStyle["--popper-arrow-bg"] = bg;
  }

  return computedStyle;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret;

function emptyFunction() {}

function emptyFunctionWithReset() {}

emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }

    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }
  shim.isRequired = shim;

  function getShim() {
    return shim;
  }
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
{
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

function _extends$C() {
  _extends$C = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$C.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$h(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
/**
 * VisuallyHidden
 *
 * Provides text for screen readers that is visually hidden.
 * It is the logical opposite of the `aria-hidden` attribute.
 */


var VisuallyHidden$1 = /*#__PURE__*/react.forwardRef(function VisuallyHidden(_ref, ref) {
  var _ref$as = _ref.as,
      Comp = _ref$as === void 0 ? "span" : _ref$as,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      props = _objectWithoutPropertiesLoose$h(_ref, ["as", "style"]);

  return /*#__PURE__*/react.createElement(Comp, _extends$C({
    ref: ref,
    style: _extends$C({
      border: 0,
      clip: "rect(0 0 0 0)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      width: "1px",
      // https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
      whiteSpace: "nowrap",
      wordWrap: "normal"
    }, style)
  }, props));
});

/**
 * Passes or assigns an arbitrary value to a ref function or object.
 *
 * @param ref
 * @param value
 */

function assignRef$1(ref, value) {
  if (ref == null) return;

  if (isFunction$1(ref)) {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error("Cannot assign value \"" + value + "\" to ref \"" + ref + "\"");
    }
  }
}

function canUseDOM$1() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
/**
 * This is a hack for sure. The thing is, getting a component to intelligently
 * infer props based on a component or JSX string passed into an `as` prop is
 * kind of a huge pain. Getting it to work and satisfy the constraints of
 * `forwardRef` seems dang near impossible. To avoid needing to do this awkward
 * type song-and-dance every time we want to forward a ref into a component
 * that accepts an `as` prop, we abstract all of that mess to this function for
 * the time time being.
 */


function forwardRefWithAs(render) {
  return /*#__PURE__*/react.forwardRef(render);
}
/**
 * Get an element's owner document. Useful when components are used in iframes
 * or other environments like dev tools.
 *
 * @param element
 */


function getOwnerDocument(element) {
  return canUseDOM$1() ? element ? element.ownerDocument : document : null;
}
/**
 * Checks whether or not a value is a function.
 *
 * @param value
 */


function isFunction$1(value) {
  return !!(value && {}.toString.call(value) == "[object Function]");
}
/**
 * Passes or assigns a value to multiple refs (typically a DOM node). Useful for
 * dealing with components that need an explicit ref for DOM calculations but
 * also forwards refs assigned by an app.
 *
 * @param refs Refs to fork
 */


function useForkedRef() {
  for (var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    refs[_key4] = arguments[_key4];
  }

  return react.useMemo(function () {
    if (refs.every(function (ref) {
      return ref == null;
    })) {
      return null;
    }

    return function (node) {
      refs.forEach(function (ref) {
        assignRef$1(ref, node);
      });
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [].concat(refs));
}
/**
 * Returns the previous value of a reference after a component update.
 *
 * @param value
 */


function usePrevious(value) {
  var ref = react.useRef(null);
  react.useEffect(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function _extends$D() {
  _extends$D = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$D.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$i(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
/*
 * Singleton state is fine because you don't server render
 * an alert (SRs don't read them on first load anyway)
 */


var keys$1 = {
  polite: -1,
  assertive: -1
};
var elements = {
  polite: {},
  assertive: {}
};
var liveRegions = {
  polite: null,
  assertive: null
};
var renderTimer; ////////////////////////////////////////////////////////////////////////////////

/**
 * Alert
 *
 * Screen-reader-friendly alert messages. In many apps developers add "alert"
 * messages when network events or other things happen. Users with assistive
 * technologies may not know about the message unless you develop for it.
 *
 * @see Docs https://reach.tech/alert
 */

var Alert$2 = /*#__PURE__*/forwardRefWithAs(function Alert(_ref, forwardedRef) {
  var _ref$as = _ref.as,
      Comp = _ref$as === void 0 ? "div" : _ref$as,
      children = _ref.children,
      _ref$type = _ref.type,
      regionType = _ref$type === void 0 ? "polite" : _ref$type,
      props = _objectWithoutPropertiesLoose$i(_ref, ["as", "children", "type"]);

  var ownRef = react.useRef(null);
  var ref = useForkedRef(forwardedRef, ownRef);
  var child = react.useMemo(function () {
    return /*#__PURE__*/react.createElement(Comp, _extends$D({}, props, {
      ref: ref,
      "data-reach-alert": true
    }), children);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [children, props]);
  useMirrorEffects(regionType, child, ownRef);
  return child;
});


function createMirror(type, doc) {
  var key = ++keys$1[type];

  var mount = function mount(element) {
    if (liveRegions[type]) {
      elements[type][key] = element;
      renderAlerts();
    } else {
      var node = doc.createElement("div");
      node.setAttribute("data-reach-live-" + type, "true");
      liveRegions[type] = node;
      doc.body.appendChild(liveRegions[type]);
      mount(element);
    }
  };

  var update = function update(element) {
    elements[type][key] = element;
    renderAlerts();
  };

  var unmount = function unmount() {
    delete elements[type][key];
    renderAlerts();
  };

  return {
    mount: mount,
    update: update,
    unmount: unmount
  };
}

function renderAlerts() {
  if (renderTimer != null) {
    window.clearTimeout(renderTimer);
  }

  renderTimer = window.setTimeout(function () {
    Object.keys(elements).forEach(function (elementType) {
      var regionType = elementType;
      var container = liveRegions[regionType];

      if (container) {
        reactDom.render( /*#__PURE__*/react.createElement(VisuallyHidden$1, {
          as: "div"
        }, /*#__PURE__*/react.createElement("div", {
          // The status role is a type of live region and a container whose
          // content is advisory information for the user that is not
          // important enough to justify an alert, and is often presented as
          // a status bar. When the role is added to an element, the browser
          // will send out an accessible status event to assistive
          // technology products which can then notify the user about it.
          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_status_role
          role: regionType === "assertive" ? "alert" : "status",
          "aria-live": regionType
        }, Object.keys(elements[regionType]).map(function (key) {
          return /*#__PURE__*/react.cloneElement(elements[regionType][key], {
            key: key,
            ref: null
          });
        }))), liveRegions[regionType]);
      }
    });
  }, 500);
}

function useMirrorEffects(regionType, element, ref) {
  var prevType = usePrevious(regionType);
  var mirror = react.useRef(null);
  var mounted = react.useRef(false);
  react.useEffect(function () {
    var ownerDocument = getOwnerDocument(ref.current);

    if (!mounted.current) {
      mounted.current = true;
      mirror.current = createMirror(regionType, ownerDocument);
      mirror.current.mount(element);
    } else if (prevType !== regionType) {
      mirror.current && mirror.current.unmount();
      mirror.current = createMirror(regionType, ownerDocument);
      mirror.current.mount(element);
    } else {
      mirror.current && mirror.current.update(element);
    }
  }, [element, regionType, prevType, ref]);
  react.useEffect(function () {
    return function () {
      mirror.current && mirror.current.unmount();
    };
  }, []);
} ////////////////////////////////////////////////////////////////////////////////

/**
 * Given an array of toasts for a specific position.
 * It returns the toast that matches the `id` passed
 */
/**
 * Given the toast manager state, finds the toast that matches
 * the id and return its position and index
 */

function findToast(toasts, id) {
  var position = getToastPosition(toasts, id);
  var index = position ? toasts[position].findIndex(function (toast) {
    return toast.id === id;
  }) : -1;
  return {
    position: position,
    index: index
  };
}
/**
 * Given the toast manager state, finds the position of the toast that
 * matches the `id`
 */

var getToastPosition = function getToastPosition(toasts, id) {
  var _Object$values$flat$f;

  return (_Object$values$flat$f = Object.values(toasts).flat().find(function (toast) {
    return toast.id === id;
  })) == null ? void 0 : _Object$values$flat$f.position;
};
/**
 * Get's the styles to be applied to a toast's container
 * based on its position in the manager
 */

function getToastStyle(position) {
  var isRighty = position.includes("right");
  var isLefty = position.includes("left");
  var alignItems = "center";
  if (isRighty) alignItems = "flex-end";
  if (isLefty) alignItems = "flex-start";
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: alignItems
  };
}

function _slicedToArray$l(arr, i) { return _arrayWithHoles$l(arr) || _iterableToArrayLimit$l(arr, i) || _unsupportedIterableToArray$o(arr, i) || _nonIterableRest$l(); }

function _nonIterableRest$l() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$o(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$o(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$o(o, minLen); }

function _arrayLikeToArray$o(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$l(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$l(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty$8(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/**
 * @todo After Gerrit refactors this implementation,
 * allow users to change the toast transition direction from
 * a `ToastProvider` component.
 *
 * Here's an API example:
 *
 * ```jsx
 * <ToastProvider
 *   motion={customVariants}
 *   component={CustomToastComponent}
 *   autoCloseTimeout={3000}
 *   toastSpacing={32} // this will control the `margin` value applied
 * >
 * </ToastProvider>
 * ```
 */

var toastMotionVariants = {
  initial: function initial(props) {
    var position = props.position;
    var dir = ["top", "bottom"].includes(position) ? "y" : "x";
    var factor = ["top-right", "bottom-right"].includes(position) ? 1 : -1;
    if (position === "bottom") factor = 1;
    return _defineProperty$8({
      opacity: 0
    }, dir, factor * 24);
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1]
    }
  }
};
var Toast = function Toast(props) {
  var id = props.id,
      message = props.message,
      onCloseComplete = props.onCloseComplete,
      onRequestRemove = props.onRequestRemove,
      _props$requestClose = props.requestClose,
      requestClose = _props$requestClose === void 0 ? false : _props$requestClose,
      _props$position = props.position,
      position = _props$position === void 0 ? "bottom" : _props$position,
      _props$duration = props.duration,
      duration = _props$duration === void 0 ? 5000 : _props$duration;

  var _React$useState = react.useState(duration),
      _React$useState2 = _slicedToArray$l(_React$useState, 2),
      delay = _React$useState2[0],
      setDelay = _React$useState2[1];

  var isPresent = useIsPresent();
  useUpdateEffect(function () {
    if (!isPresent) {
      onCloseComplete == null ? void 0 : onCloseComplete();
    }
  }, [isPresent]);
  useUpdateEffect(function () {
    setDelay(duration);
  }, [duration]);

  var onMouseEnter = function onMouseEnter() {
    return setDelay(null);
  };

  var onMouseLeave = function onMouseLeave() {
    return setDelay(duration);
  };

  var close = function close() {
    if (isPresent) onRequestRemove();
  };

  react.useEffect(function () {
    if (isPresent && requestClose) {
      onRequestRemove();
    }
  }, [isPresent, requestClose, onRequestRemove]);
  useTimeout(close, delay);
  var style = react.useMemo(function () {
    return getToastStyle(position);
  }, [position]);
  return /*#__PURE__*/react.createElement(motion.li, {
    layout: true,
    className: "chakra-toast",
    variants: toastMotionVariants,
    initial: "initial",
    animate: "animate",
    exit: "exit",
    onHoverStart: onMouseEnter,
    onHoverEnd: onMouseLeave,
    custom: {
      position: position
    },
    style: style
  }, /*#__PURE__*/react.createElement(Alert$2, {
    className: "chakra-toast__inner",
    style: {
      pointerEvents: "auto",
      maxWidth: 560,
      minWidth: 300,
      margin: "0.5rem"
    }
  }, isFunction(message) ? message({
    id: id,
    onClose: close
  }) : message));
};

function _typeof$b(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$b = function _typeof(obj) { return typeof obj; }; } else { _typeof$b = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$b(obj); }

function _defineProperty2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray$5(arr) { return _arrayWithoutHoles$5(arr) || _iterableToArray$7(arr) || _unsupportedIterableToArray$p(arr) || _nonIterableSpread$5(); }

function _nonIterableSpread$5() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$p(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$p(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$p(o, minLen); }

function _iterableToArray$7(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles$5(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$p(arr); }

function _arrayLikeToArray$p(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$1(subClass, superClass); }

function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof$b(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf$1(o) { _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1(o); }

function _extends$E() {
  _extends$E = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$E.apply(this, arguments);
}

function _defineProperty$9(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
/**
 * Manages the creation, and removal of toasts
 * across all corners ("top", "bottom", etc.)
 */

var ToastManager = /*#__PURE__*/function (_React$Component) {
  _inherits$1(ToastManager, _React$Component);

  var _super = _createSuper(ToastManager);

  /**
   * Static id counter to create unique ids
   * for each toast
   */

  /**
   * State to track all the toast across all positions
   */
  function ToastManager(props) {
    var _this2;

    _classCallCheck(this, ToastManager);

    var _this;

    _this2 = _super.call(this, props);
    _this = _assertThisInitialized(_this2);

    _defineProperty$9(_assertThisInitialized(_this2), "state", {
      top: [],
      "top-left": [],
      "top-right": [],
      "bottom-left": [],
      bottom: [],
      "bottom-right": []
    });

    _defineProperty$9(_assertThisInitialized(_this2), "notify", function (message, options) {
      var toast = _this2.createToast(message, options);

      var position = toast.position,
          id = toast.id;

      _this2.setState(function (prevToasts) {
        var isTop = position.includes("top");
        /**
         * - If the toast is positioned at the top edges, the
         * recent toast stacks on top of the other toasts.
         *
         * - If the toast is positioned at the bottom edges, the recent
         * toast stacks below the other toasts.
         */

        var toasts = isTop ? [toast].concat(_toConsumableArray$5(prevToasts[position])) : [].concat(_toConsumableArray$5(prevToasts[position]), [toast]);
        return _extends$E({}, prevToasts, _defineProperty2({}, position, toasts));
      });

      return id;
    });

    _defineProperty$9(_assertThisInitialized(_this2), "updateToast", function (id, options) {
      _this2.setState(function (prevState) {
        var nextState = _extends$E({}, prevState);

        var _findToast = findToast(nextState, id),
            position = _findToast.position,
            index = _findToast.index;

        if (position && index !== -1) {
          nextState[position][index] = _extends$E({}, nextState[position][index], options);
        }

        return nextState;
      });
    });

    _defineProperty$9(_assertThisInitialized(_this2), "closeAll", function (_temp) {
      var _ref = _temp === void 0 ? {} : _temp,
          positions = _ref.positions; // only one setState here for perf reasons
      // instead of spamming this.closeToast


      _this.setState(function (prev) {
        var allPositions = ["bottom", "bottom-right", "bottom-left", "top", "top-left", "top-right"];
        var positionsToClose = positions != null ? positions : allPositions;
        return positionsToClose.reduce(function (acc, position) {
          acc[position] = prev[position].map(function (toast) {
            return _extends$E({}, toast, {
              requestClose: true
            });
          });
          return acc;
        }, {});
      });
    });

    _defineProperty$9(_assertThisInitialized(_this2), "createToast", function (message, options) {
      var _options$id, _options$position;

      ToastManager.counter += 1;
      var id = (_options$id = options.id) != null ? _options$id : ToastManager.counter;
      var position = (_options$position = options.position) != null ? _options$position : "top";
      return {
        id: id,
        message: message,
        position: position,
        duration: options.duration,
        onCloseComplete: options.onCloseComplete,
        onRequestRemove: function onRequestRemove() {
          return _this2.removeToast(String(id), position);
        },
        status: options.status,
        requestClose: false
      };
    });

    _defineProperty$9(_assertThisInitialized(_this2), "closeToast", function (id) {
      _this2.setState(function (prevState) {
        var position = getToastPosition(prevState, id);
        if (!position) return prevState;
        return _extends$E({}, prevState, _defineProperty2({}, position, prevState[position].map(function (toast) {
          // id may be string or number
          // eslint-disable-next-line eqeqeq
          if (toast.id == id) {
            return _extends$E({}, toast, {
              requestClose: true
            });
          }

          return toast;
        })));
      });
    });

    _defineProperty$9(_assertThisInitialized(_this2), "removeToast", function (id, position) {
      _this2.setState(function (prevState) {
        return _extends$E({}, prevState, _defineProperty2({}, position, prevState[position].filter(function (toast) {
          return toast.id != id;
        })));
      });
    });

    _defineProperty$9(_assertThisInitialized(_this2), "isVisible", function (id) {
      var _findToast2 = findToast(_this2.state, id),
          position = _findToast2.position;

      return Boolean(position);
    });

    _defineProperty$9(_assertThisInitialized(_this2), "getStyle", function (position) {
      var isTopOrBottom = position === "top" || position === "bottom";
      var margin = isTopOrBottom ? "0 auto" : undefined;
      var top = position.includes("top") ? "env(safe-area-inset-top, 0px)" : undefined;
      var bottom = position.includes("bottom") ? "env(safe-area-inset-bottom, 0px)" : undefined;
      var right = !position.includes("left") ? "env(safe-area-inset-right, 0px)" : undefined;
      var left = !position.includes("right") ? "env(safe-area-inset-left, 0px)" : undefined;
      return {
        position: "fixed",
        zIndex: 5500,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        margin: margin,
        top: top,
        bottom: bottom,
        right: right,
        left: left
      };
    });

    var methods = {
      notify: _this2.notify,
      closeAll: _this2.closeAll,
      close: _this2.closeToast,
      update: _this2.updateToast,
      isActive: _this2.isVisible
    };
    props.notify(methods);
    return _this2;
  }
  /**
   * Function to actually create a toast and add it
   * to state at the specified position
   */


  _createClass(ToastManager, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return objectKeys(this.state).map(function (position) {
        var toasts = _this3.state[position];
        return /*#__PURE__*/react.createElement("ul", {
          key: position,
          id: "chakra-toast-manager-" + position,
          style: _this3.getStyle(position)
        }, /*#__PURE__*/react.createElement(AnimatePresence, {
          initial: false
        }, toasts.map(function (toast) {
          return /*#__PURE__*/react.createElement(Toast, _extends$E({
            key: toast.id
          }, toast));
        })));
      });
    }
  }]);

  return ToastManager;
}(react.Component);

_defineProperty$9(ToastManager, "counter", 0);

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty$a(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
var portalId = "chakra-toast-portal";

var Toaster =
/**
 * Initialize the manager and mount it in the DOM
 * inside the portal node.
 *
 * @todo
 *
 * Update toast constructor to use `PortalManager`'s node or document.body.
 * Once done, we can remove the `zIndex` in `toast.manager.tsx`
 */
function Toaster() {
  var _this2 = this;

  _classCallCheck$1(this, Toaster);

  var _this = this;

  _defineProperty$a(this, "createToast", void 0);

  _defineProperty$a(this, "removeAll", void 0);

  _defineProperty$a(this, "closeToast", void 0);

  _defineProperty$a(this, "updateToast", void 0);

  _defineProperty$a(this, "isToastActive", void 0);

  _defineProperty$a(this, "bindFunctions", function (methods) {
    _this2.createToast = methods.notify;
    _this2.removeAll = methods.closeAll;
    _this2.closeToast = methods.close;
    _this2.updateToast = methods.update;
    _this2.isToastActive = methods.isActive;
  });

  _defineProperty$a(this, "notify", function (message, options) {
    if (options === void 0) {
      options = {};
    }

    return _this.createToast == null ? void 0 : _this.createToast(message, options);
  });

  _defineProperty$a(this, "close", function (id) {
    var _this$closeToast;

    (_this$closeToast = _this2.closeToast) == null ? void 0 : _this$closeToast.call(_this2, id);
  });

  _defineProperty$a(this, "closeAll", function (options) {
    var _this$removeAll;

    (_this$removeAll = _this2.removeAll) == null ? void 0 : _this$removeAll.call(_this2, options);
  });

  _defineProperty$a(this, "update", function (id, options) {
    if (options === void 0) {
      options = {};
    }

    _this.updateToast == null ? void 0 : _this.updateToast(id, options);
  });

  _defineProperty$a(this, "isActive", function (id) {
    var _this$isToastActive;

    return (_this$isToastActive = _this2.isToastActive) == null ? void 0 : _this$isToastActive.call(_this2, id);
  });

  if (!isBrowser$1) return;
  var portal;
  var existingPortal = document.getElementById(portalId);

  if (existingPortal) {
    portal = existingPortal;
  } else {
    var _document$body;

    var div = document.createElement("div");
    div.id = portalId;
    (_document$body = document.body) == null ? void 0 : _document$body.appendChild(div);
    portal = div;
  }

  reactDom.render( /*#__PURE__*/react.createElement(ToastManager, {
    notify: this.bindFunctions
  }), portal);
};

var toast = new Toaster();

function _extends$F() {
  _extends$F = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$F.apply(this, arguments);
}

var Toast$1 = function Toast(props) {
  var status = props.status,
      variant = props.variant,
      id = props.id,
      title = props.title,
      isClosable = props.isClosable,
      onClose = props.onClose,
      description = props.description;
  return /*#__PURE__*/react.createElement(Alert$1, {
    status: status,
    variant: variant,
    id: id,
    alignItems: "start",
    borderRadius: "md",
    boxShadow: "lg",
    paddingEnd: 8,
    textAlign: "start",
    width: "auto"
  }, /*#__PURE__*/react.createElement(AlertIcon, null), /*#__PURE__*/react.createElement(chakra.div, {
    flex: "1",
    maxWidth: "100%"
  }, title && /*#__PURE__*/react.createElement(AlertTitle, null, title), description && /*#__PURE__*/react.createElement(AlertDescription, {
    display: "block"
  }, description)), isClosable && /*#__PURE__*/react.createElement(CloseButton$1, {
    size: "sm",
    onClick: onClose,
    position: "absolute",
    insetEnd: 1,
    top: 1
  }));
};

var defaults = {
  duration: 5000,
  position: "bottom",
  variant: "solid"
};
var defaultStandaloneParam = {
  theme: theme,
  colorMode: "light",
  toggleColorMode: noop,
  setColorMode: noop,
  defaultOptions: defaults
};
/**
 * Create a toast from outside of React Components
 */

function createStandaloneToast(_temp) {
  var _ref = _temp === void 0 ? defaultStandaloneParam : _temp,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? defaultStandaloneParam.theme : _ref$theme,
      _ref$colorMode = _ref.colorMode,
      colorMode = _ref$colorMode === void 0 ? defaultStandaloneParam.colorMode : _ref$colorMode,
      _ref$toggleColorMode = _ref.toggleColorMode,
      toggleColorMode = _ref$toggleColorMode === void 0 ? defaultStandaloneParam.toggleColorMode : _ref$toggleColorMode,
      _ref$setColorMode = _ref.setColorMode,
      setColorMode = _ref$setColorMode === void 0 ? defaultStandaloneParam.setColorMode : _ref$setColorMode,
      _ref$defaultOptions = _ref.defaultOptions,
      defaultOptions = _ref$defaultOptions === void 0 ? defaultStandaloneParam.defaultOptions : _ref$defaultOptions;

  var renderWithProviders = function renderWithProviders(props, options) {
    return /*#__PURE__*/react.createElement(ThemeProvider$1, {
      theme: theme
    }, /*#__PURE__*/react.createElement(ColorModeContext.Provider, {
      value: {
        colorMode: colorMode,
        setColorMode: setColorMode,
        toggleColorMode: toggleColorMode
      }
    }, isFunction(options.render) ? options.render(props) : /*#__PURE__*/react.createElement(Toast$1, _extends$F({}, props, options))));
  };

  var toastImpl = function toastImpl(options) {
    var opts = _extends$F({}, defaultOptions, options);

    var Message = function Message(props) {
      return renderWithProviders(props, opts);
    };

    return toast.notify(Message, opts);
  };

  toastImpl.close = toast.close;
  toastImpl.closeAll = toast.closeAll; // toasts can only be updated if they have a valid id

  toastImpl.update = function (id, options) {
    if (!id) return;

    var opts = _extends$F({}, defaultOptions, options);

    toast.update(id, _extends$F({}, opts, {
      message: function message(props) {
        return renderWithProviders(props, opts);
      }
    }));
  };

  toastImpl.isActive = toast.isActive;
  return toastImpl;
}
/**
 * React hook used to create a function that can be used
 * to show toasts in an application.
 */

function useToast(options) {
  var _useChakra = useChakra(),
      theme = _useChakra.theme,
      setColorMode = _useChakra.setColorMode,
      toggleColorMode = _useChakra.toggleColorMode,
      colorMode = _useChakra.colorMode;

  return react.useMemo(function () {
    return createStandaloneToast({
      theme: theme,
      colorMode: colorMode,
      setColorMode: setColorMode,
      toggleColorMode: toggleColorMode,
      defaultOptions: options
    });
  }, [theme, setColorMode, toggleColorMode, colorMode, options]);
}

var scale$1 = {
  exit: {
    scale: 0.85,
    opacity: 0,
    transition: {
      opacity: {
        duration: 0.15,
        easings: "easeInOut"
      },
      scale: {
        duration: 0.2,
        easings: "easeInOut"
      }
    }
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      opacity: {
        easings: "easeOut",
        duration: 0.2
      },
      scale: {
        duration: 0.2,
        ease: [0.175, 0.885, 0.4, 1.1]
      }
    }
  }
};

function _defineProperty$b(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends$G() {
  _extends$G = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$G.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$j(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
function useTooltip(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      _props$openDelay = _props.openDelay,
      openDelay = _props$openDelay === void 0 ? 0 : _props$openDelay,
      _props$closeDelay = _props.closeDelay,
      closeDelay = _props$closeDelay === void 0 ? 0 : _props$closeDelay,
      _props$closeOnClick = _props.closeOnClick,
      closeOnClick = _props$closeOnClick === void 0 ? true : _props$closeOnClick,
      closeOnMouseDown = _props.closeOnMouseDown,
      onOpenProp = _props.onOpen,
      onCloseProp = _props.onClose,
      placement = _props.placement,
      id = _props.id,
      isOpenProp = _props.isOpen,
      defaultIsOpen = _props.defaultIsOpen,
      _props$arrowSize = _props.arrowSize,
      arrowSize = _props$arrowSize === void 0 ? 10 : _props$arrowSize,
      arrowShadowColor = _props.arrowShadowColor,
      arrowPadding = _props.arrowPadding,
      modifiers = _props.modifiers,
      isDisabled = _props.isDisabled,
      gutter = _props.gutter,
      offset = _props.offset,
      htmlProps = _objectWithoutPropertiesLoose$j(props, ["openDelay", "closeDelay", "closeOnClick", "closeOnMouseDown", "onOpen", "onClose", "placement", "id", "isOpen", "defaultIsOpen", "arrowSize", "arrowShadowColor", "arrowPadding", "modifiers", "isDisabled", "gutter", "offset"]);

  var _useDisclosure = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen: defaultIsOpen,
    onOpen: onOpenProp,
    onClose: onCloseProp
  }),
      isOpen = _useDisclosure.isOpen,
      onOpen = _useDisclosure.onOpen,
      onClose = _useDisclosure.onClose;

  var _usePopper = usePopper({
    enabled: isOpen,
    placement: placement,
    arrowPadding: arrowPadding,
    modifiers: modifiers,
    gutter: gutter,
    offset: offset
  }),
      referenceRef = _usePopper.referenceRef,
      getPopperProps = _usePopper.getPopperProps,
      getArrowInnerProps = _usePopper.getArrowInnerProps,
      getArrowProps = _usePopper.getArrowProps;

  var tooltipId = useId(id, "tooltip");
  var ref = react.useRef(null);
  var enterTimeout = react.useRef();
  var exitTimeout = react.useRef();
  var openWithDelay = react.useCallback(function () {
    if (!isDisabled) {
      enterTimeout.current = window.setTimeout(onOpen, openDelay);
    }
  }, [isDisabled, onOpen, openDelay]);
  var closeWithDelay = react.useCallback(function () {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
    }

    exitTimeout.current = window.setTimeout(onClose, closeDelay);
  }, [closeDelay, onClose]);
  var onClick = react.useCallback(function () {
    if (closeOnClick) {
      closeWithDelay();
    }
  }, [closeOnClick, closeWithDelay]);
  var onMouseDown = react.useCallback(function () {
    if (closeOnMouseDown) {
      closeWithDelay();
    }
  }, [closeOnMouseDown, closeWithDelay]);

  var onKeyDown = function onKeyDown(event) {
    if (isOpen && event.key === "Escape") {
      closeWithDelay();
    }
  };

  useEventListener("keydown", onKeyDown);
  react.useEffect(function () {
    return function () {
      clearTimeout(enterTimeout.current);
      clearTimeout(exitTimeout.current);
    };
  }, []);
  /**
   * This allows for catching mouseleave events when the tooltip
   * trigger is disabled. There's currently a known issue in
   * React regarding the onMouseLeave polyfill.
   * @see https://github.com/facebook/react/issues/11972
   */

  useEventListener("mouseleave", closeWithDelay, ref.current);
  var getTriggerProps = react.useCallback(function (props, _ref) {
    if (props === void 0) {
      props = {};
    }

    if (_ref === void 0) {
      _ref = null;
    }

    var triggerProps = _extends$G({}, props, {
      ref: mergeRefs(ref, _ref, referenceRef),
      onMouseEnter: callAllHandlers(props.onMouseEnter, openWithDelay),
      onClick: callAllHandlers(props.onClick, onClick),
      onMouseDown: callAllHandlers(props.onMouseDown, onMouseDown),
      onFocus: callAllHandlers(props.onFocus, openWithDelay),
      onBlur: callAllHandlers(props.onBlur, closeWithDelay),
      "aria-describedby": isOpen ? tooltipId : undefined
    });

    return triggerProps;
  }, [openWithDelay, closeWithDelay, onMouseDown, isOpen, tooltipId, onClick, referenceRef]);
  var getTooltipPositionerProps = react.useCallback(function (props, forwardedRef) {
    var _extends2;

    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return getPopperProps(_extends$G({}, props, {
      style: _extends$G({}, props.style, (_extends2 = {}, _defineProperty$b(_extends2, cssVars.arrowSize["var"], arrowSize ? px(arrowSize) : undefined), _defineProperty$b(_extends2, cssVars.arrowShadowColor["var"], arrowShadowColor), _extends2))
    }), forwardedRef);
  }, [getPopperProps, arrowSize, arrowShadowColor]);
  var getTooltipProps = react.useCallback(function (props, _ref) {
    if (props === void 0) {
      props = {};
    }

    if (_ref === void 0) {
      _ref = null;
    }

    var tooltipProps = _extends$G({
      ref: _ref
    }, htmlProps, props, {
      id: tooltipId,
      role: "tooltip",
      style: _extends$G({}, props.style, {
        position: "relative",
        transformOrigin: cssVars.transformOrigin.varRef
      })
    });

    return tooltipProps;
  }, [htmlProps, tooltipId]);
  return {
    isOpen: isOpen,
    show: openWithDelay,
    hide: closeWithDelay,
    getTriggerProps: getTriggerProps,
    getTooltipProps: getTooltipProps,
    getTooltipPositionerProps: getTooltipPositionerProps,
    getArrowProps: getArrowProps,
    getArrowInnerProps: getArrowInnerProps
  };
}

function _extends$H() {
  _extends$H = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$H.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$k(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
var StyledTooltip = chakra(motion.div);
/**
 * Tooltips display informative text when users hover, focus on, or tap an element.
 *
 * @see Docs     https://chakra-ui.com/components/tooltip
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices/#tooltip
 */

var Tooltip$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyleConfig("Tooltip", props);
  var ownProps = omitThemingProps(props);
  var theme = useTheme();

  var children = ownProps.children,
      label = ownProps.label,
      shouldWrapChildren = ownProps.shouldWrapChildren,
      ariaLabel = ownProps["aria-label"],
      hasArrow = ownProps.hasArrow,
      bg = ownProps.bg,
      portalProps = ownProps.portalProps,
      rest = _objectWithoutPropertiesLoose$k(ownProps, ["children", "label", "shouldWrapChildren", "aria-label", "hasArrow", "bg", "portalProps"]);

  if (bg) {
    styles.bg = bg;
    styles[cssVars.arrowBg["var"]] = getCSSVar(theme, "colors", bg);
  }

  var tooltip = useTooltip(rest);
  var shouldWrap = isString(children) || shouldWrapChildren;
  var trigger;

  if (shouldWrap) {
    trigger = /*#__PURE__*/react.createElement(chakra.span, _extends$H({
      tabIndex: 0
    }, tooltip.getTriggerProps()), children);
  } else {
    /**
     * Ensure tooltip has only one child node
     */
    var child = react.Children.only(children);
    trigger = /*#__PURE__*/react.cloneElement(child, tooltip.getTriggerProps(child.props, child.ref));
  }

  var hasAriaLabel = !!ariaLabel;

  var _tooltipProps = tooltip.getTooltipProps({}, ref);

  var tooltipProps = hasAriaLabel ? omit(_tooltipProps, ["role", "id"]) : _tooltipProps;
  var hiddenProps = pick(_tooltipProps, ["role", "id"]);
  /**
   * If the `label` is empty, there's no
   * point showing the tooltip. Let's simply return back the children
   */

  if (!label) {
    return /*#__PURE__*/react.createElement(react.Fragment, null, children);
  }

  return /*#__PURE__*/react.createElement(react.Fragment, null, trigger, /*#__PURE__*/react.createElement(AnimatePresence, null, tooltip.isOpen && /*#__PURE__*/react.createElement(Portal$1, portalProps, /*#__PURE__*/react.createElement(chakra.div, _extends$H({}, tooltip.getTooltipPositionerProps(), {
    __css: {
      zIndex: styles.zIndex,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/react.createElement(StyledTooltip, _extends$H({
    variants: scale$1
  }, tooltipProps, {
    initial: "exit",
    animate: "enter",
    exit: "exit",
    __css: styles
  }), label, hasAriaLabel && /*#__PURE__*/react.createElement(VisuallyHidden, hiddenProps, ariaLabel), hasArrow && /*#__PURE__*/react.createElement(chakra.div, {
    "data-popper-arrow": true,
    className: "chakra-tooltip__arrow-wrapper"
  }, /*#__PURE__*/react.createElement(chakra.div, {
    "data-popper-arrow-inner": true,
    className: "chakra-tooltip__arrow",
    __css: {
      bg: styles.bg
    }
  })))))));
});

export { Box, Button$1 as Button, ChakraProvider, Flex, FormControl, HStack, Heading$1 as Heading, Input$1 as Input, Table$1 as Table, Tbody, Td, Th, Thead, Tooltip$1 as Tooltip, Tr, useBreakpointValue, useToast };
