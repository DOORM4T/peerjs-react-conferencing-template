function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function n(n) {
  for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; e < t; e++) {
    r[e - 1] = arguments[e];
  }

  throw Error("[Immer] minified error nr: " + n + (r.length ? " " + r.map(function (n) {
    return "'" + n + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}

function t(n) {
  return !!n && !!n[Q];
}

function r(n) {
  return !!n && (function (n) {
    if (!n || "object" != _typeof(n)) return !1;
    var t = Object.getPrototypeOf(n);
    if (null === t) return !0;
    var r = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
    return r === Object || "function" == typeof r && Function.toString.call(r) === Z;
  }(n) || Array.isArray(n) || !!n[L] || !!n.constructor[L] || s(n) || v(n));
}

function i(n, t, r) {
  void 0 === r && (r = !1), 0 === o(n) ? (r ? Object.keys : nn)(n).forEach(function (e) {
    r && "symbol" == _typeof(e) || t(e, n[e], n);
  }) : n.forEach(function (r, e) {
    return t(e, r, n);
  });
}

function o(n) {
  var t = n[Q];
  return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(n) ? 1 : s(n) ? 2 : v(n) ? 3 : 0;
}

function u(n, t) {
  return 2 === o(n) ? n.has(t) : Object.prototype.hasOwnProperty.call(n, t);
}

function a(n, t) {
  return 2 === o(n) ? n.get(t) : n[t];
}

function f(n, t, r) {
  var e = o(n);
  2 === e ? n.set(t, r) : 3 === e ? (n["delete"](t), n.add(r)) : n[t] = r;
}

function c(n, t) {
  return n === t ? 0 !== n || 1 / n == 1 / t : n != n && t != t;
}

function s(n) {
  return X && n instanceof Map;
}

function v(n) {
  return q && n instanceof Set;
}

function p(n) {
  return n.o || n.t;
}

function l(n) {
  if (Array.isArray(n)) return Array.prototype.slice.call(n);
  var t = tn(n);
  delete t[Q];

  for (var r = nn(t), e = 0; e < r.length; e++) {
    var i = r[e],
        o = t[i];
    !1 === o.writable && (o.writable = !0, o.configurable = !0), (o.get || o.set) && (t[i] = {
      configurable: !0,
      writable: !0,
      enumerable: o.enumerable,
      value: n[i]
    });
  }

  return Object.create(Object.getPrototypeOf(n), t);
}

function d(n, e) {
  return void 0 === e && (e = !1), y(n) || t(n) || !r(n) ? n : (o(n) > 1 && (n.set = n.add = n.clear = n["delete"] = h), Object.freeze(n), e && i(n, function (n, t) {
    return d(t, !0);
  }, !0), n);
}

function h() {
  n(2);
}

function y(n) {
  return null == n || "object" != _typeof(n) || Object.isFrozen(n);
}

function b(t) {
  var r = rn[t];
  return r || n(18, t), r;
}

function _() {
  return U;
}

function j(n, t) {
  t && (b("Patches"), n.u = [], n.s = [], n.v = t);
}

function O(n) {
  g(n), n.p.forEach(S), n.p = null;
}

function g(n) {
  n === U && (U = n.l);
}

function w(n) {
  return U = {
    p: [],
    l: U,
    h: n,
    m: !0,
    _: 0
  };
}

function S(n) {
  var t = n[Q];
  0 === t.i || 1 === t.i ? t.j() : t.O = !0;
}

function P(t, e) {
  e._ = e.p.length;
  var i = e.p[0],
      o = void 0 !== t && t !== i;
  return e.h.g || b("ES5").S(e, t, o), o ? (i[Q].P && (O(e), n(4)), r(t) && (t = M(e, t), e.l || x(e, t)), e.u && b("Patches").M(i[Q], t, e.u, e.s)) : t = M(e, i, []), O(e), e.u && e.v(e.u, e.s), t !== H ? t : void 0;
}

function M(n, t, r) {
  if (y(t)) return t;
  var e = t[Q];
  if (!e) return i(t, function (i, o) {
    return A(n, e, t, i, o, r);
  }, !0), t;
  if (e.A !== n) return t;
  if (!e.P) return x(n, e.t, !0), e.t;

  if (!e.I) {
    e.I = !0, e.A._--;
    var o = 4 === e.i || 5 === e.i ? e.o = l(e.k) : e.o;
    i(3 === e.i ? new Set(o) : o, function (t, i) {
      return A(n, e, o, t, i, r);
    }), x(n, o, !1), r && n.u && b("Patches").R(e, r, n.u, n.s);
  }

  return e.o;
}

function A(e, i, o, a, c, s) {
  if (t(c)) {
    var v = M(e, c, s && i && 3 !== i.i && !u(i.D, a) ? s.concat(a) : void 0);
    if (f(o, a, v), !t(v)) return;
    e.m = !1;
  }

  if (r(c) && !y(c)) {
    if (!e.h.F && e._ < 1) return;
    M(e, c), i && i.A.l || x(e, c);
  }
}

function x(n, t, r) {
  void 0 === r && (r = !1), n.h.F && n.m && d(t, r);
}

function z(n, t) {
  var r = n[Q];
  return (r ? p(r) : n)[t];
}

function I(n, t) {
  if (t in n) for (var r = Object.getPrototypeOf(n); r;) {
    var e = Object.getOwnPropertyDescriptor(r, t);
    if (e) return e;
    r = Object.getPrototypeOf(r);
  }
}

function k(n) {
  n.P || (n.P = !0, n.l && k(n.l));
}

function E(n) {
  n.o || (n.o = l(n.t));
}

function R(n, t, r) {
  var e = s(t) ? b("MapSet").N(t, r) : v(t) ? b("MapSet").T(t, r) : n.g ? function (n, t) {
    var r = Array.isArray(n),
        e = {
      i: r ? 1 : 0,
      A: t ? t.A : _(),
      P: !1,
      I: !1,
      D: {},
      l: t,
      t: n,
      k: null,
      o: null,
      j: null,
      C: !1
    },
        i = e,
        o = en;
    r && (i = [e], o = on);
    var u = Proxy.revocable(i, o),
        a = u.revoke,
        f = u.proxy;
    return e.k = f, e.j = a, f;
  }(t, r) : b("ES5").J(t, r);
  return (r ? r.A : _()).p.push(e), e;
}

function D(e) {
  return t(e) || n(22, e), function n(t) {
    if (!r(t)) return t;
    var e,
        u = t[Q],
        c = o(t);

    if (u) {
      if (!u.P && (u.i < 4 || !b("ES5").K(u))) return u.t;
      u.I = !0, e = F(t, c), u.I = !1;
    } else e = F(t, c);

    return i(e, function (t, r) {
      u && a(u.t, t) === r || f(e, t, n(r));
    }), 3 === c ? new Set(e) : e;
  }(e);
}

function F(n, t) {
  switch (t) {
    case 2:
      return new Map(n);

    case 3:
      return Array.from(n);
  }

  return l(n);
}

var G,
    U,
    W = "undefined" != typeof Symbol && "symbol" == _typeof(Symbol("x")),
    X = "undefined" != typeof Map,
    q = "undefined" != typeof Set,
    B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect,
    H = W ? Symbol["for"]("immer-nothing") : ((G = {})["immer-nothing"] = !0, G),
    L = W ? Symbol["for"]("immer-draftable") : "__$immer_draftable",
    Q = W ? Symbol["for"]("immer-state") : "__$immer_state",
    Z = "" + Object.prototype.constructor,
    nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function (n) {
  return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n));
} : Object.getOwnPropertyNames,
    tn = Object.getOwnPropertyDescriptors || function (n) {
  var t = {};
  return nn(n).forEach(function (r) {
    t[r] = Object.getOwnPropertyDescriptor(n, r);
  }), t;
},
    rn = {},
    en = {
  get: function get(n, t) {
    if (t === Q) return n;
    var e = p(n);
    if (!u(e, t)) return function (n, t, r) {
      var e,
          i = I(t, r);
      return i ? "value" in i ? i.value : null === (e = i.get) || void 0 === e ? void 0 : e.call(n.k) : void 0;
    }(n, e, t);
    var i = e[t];
    return n.I || !r(i) ? i : i === z(n.t, t) ? (E(n), n.o[t] = R(n.A.h, i, n)) : i;
  },
  has: function has(n, t) {
    return t in p(n);
  },
  ownKeys: function ownKeys(n) {
    return Reflect.ownKeys(p(n));
  },
  set: function set(n, t, r) {
    var e = I(p(n), t);
    if (null == e ? void 0 : e.set) return e.set.call(n.k, r), !0;

    if (!n.P) {
      var i = z(p(n), t),
          o = null == i ? void 0 : i[Q];
      if (o && o.t === r) return n.o[t] = r, n.D[t] = !1, !0;
      if (c(r, i) && (void 0 !== r || u(n.t, t))) return !0;
      E(n), k(n);
    }

    return n.o[t] === r && "number" != typeof r && (void 0 !== r || t in n.o) || (n.o[t] = r, n.D[t] = !0, !0);
  },
  deleteProperty: function deleteProperty(n, t) {
    return void 0 !== z(n.t, t) || t in n.t ? (n.D[t] = !1, E(n), k(n)) : delete n.D[t], n.o && delete n.o[t], !0;
  },
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(n, t) {
    var r = p(n),
        e = Reflect.getOwnPropertyDescriptor(r, t);
    return e ? {
      writable: !0,
      configurable: 1 !== n.i || "length" !== t,
      enumerable: e.enumerable,
      value: r[t]
    } : e;
  },
  defineProperty: function defineProperty() {
    n(11);
  },
  getPrototypeOf: function getPrototypeOf(n) {
    return Object.getPrototypeOf(n.t);
  },
  setPrototypeOf: function setPrototypeOf() {
    n(12);
  }
},
    on = {};

i(en, function (n, t) {
  on[n] = function () {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
}), on.deleteProperty = function (t, r) {
  return en.deleteProperty.call(this, t[0], r);
}, on.set = function (t, r, e) {
  return en.set.call(this, t[0], r, e, t[0]);
};

var un = function () {
  function e(t) {
    var e = this;
    this.g = B, this.F = !0, this.produce = function (t, i, o) {
      if ("function" == typeof t && "function" != typeof i) {
        var u = i;
        i = t;
        var a = e;
        return function (n) {
          var t = this;
          void 0 === n && (n = u);

          for (var r = arguments.length, e = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) {
            e[o - 1] = arguments[o];
          }

          return a.produce(n, function (n) {
            var r;
            return (r = i).call.apply(r, [t, n].concat(e));
          });
        };
      }

      var f;

      if ("function" != typeof i && n(6), void 0 !== o && "function" != typeof o && n(7), r(t)) {
        var c = w(e),
            s = R(e, t, void 0),
            v = !0;

        try {
          f = i(s), v = !1;
        } finally {
          v ? O(c) : g(c);
        }

        return "undefined" != typeof Promise && f instanceof Promise ? f.then(function (n) {
          return j(c, o), P(n, c);
        }, function (n) {
          throw O(c), n;
        }) : (j(c, o), P(f, c));
      }

      if (!t || "object" != _typeof(t)) {
        if ((f = i(t)) === H) return;
        return void 0 === f && (f = t), e.F && d(f, !0), f;
      }

      n(21, t);
    }, this.produceWithPatches = function (n, t) {
      return "function" == typeof n ? function (t) {
        for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) {
          i[o - 1] = arguments[o];
        }

        return e.produceWithPatches(t, function (t) {
          return n.apply(void 0, [t].concat(i));
        });
      } : [e.produce(n, t, function (n, t) {
        r = n, i = t;
      }), r, i];
      var r, i;
    }, "boolean" == typeof (null == t ? void 0 : t.useProxies) && this.setUseProxies(t.useProxies), "boolean" == typeof (null == t ? void 0 : t.autoFreeze) && this.setAutoFreeze(t.autoFreeze);
  }

  var i = e.prototype;
  return i.createDraft = function (e) {
    r(e) || n(8), t(e) && (e = D(e));
    var i = w(this),
        o = R(this, e, void 0);
    return o[Q].C = !0, g(i), o;
  }, i.finishDraft = function (t, r) {
    var e = t && t[Q];
    var i = e.A;
    return j(i, r), P(void 0, i);
  }, i.setAutoFreeze = function (n) {
    this.F = n;
  }, i.setUseProxies = function (t) {
    t && !B && n(20), this.g = t;
  }, i.applyPatches = function (n, r) {
    var e;

    for (e = r.length - 1; e >= 0; e--) {
      var i = r[e];

      if (0 === i.path.length && "replace" === i.op) {
        n = i.value;
        break;
      }
    }

    var o = b("Patches").$;
    return t(n) ? o(n, r) : this.produce(n, function (n) {
      return o(n, r.slice(e + 1));
    });
  }, e;
}(),
    an = new un(),
    fn = an.produce,
    cn = an.produceWithPatches.bind(an),
    sn = an.setAutoFreeze.bind(an),
    vn = an.setUseProxies.bind(an),
    pn = an.applyPatches.bind(an),
    ln = an.createDraft.bind(an),
    dn = an.finishDraft.bind(an);

export default fn;
export { fn as produce };
