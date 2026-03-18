/*
 * (c) Copyright Ascensio System SIA 2010-2025
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */
(function(t) {
  "function" == typeof define && define.amd ? define(t) : t();
})(function() {
  "use strict";!
  function t(t2, e2) {
    (null == e2 || e2 > t2.length) && (e2 = t2.length);
    for (var n2 = 0, i2 = Array(e2); n2 < e2; n2++) i2[n2] = t2[n2];
    return i2;
  }
  function e(t2, e2, n2) {
    if ("function" == typeof t2 ? t2 === e2 : t2.has(e2)) return arguments.length < 3 ? e2 : n2;
    throw new TypeError("Private element is not present on this object");
  }
  function n(t2, e2, n2, i2, r2, o2, s2) {
    try {
      var a2 = t2[o2](s2), c2 = a2.value;
    } catch (t3) {
      return void n2(t3);
    }
    a2.done ? e2(c2) : Promise.resolve(c2).then(i2, r2);
  }
  function i(t2) {
    return function() {
      var e2 = this, i2 = arguments;
      return new Promise(function(r2, o2) {
        var s2 = t2.apply(e2, i2);
        function a2(t3) {
          n(s2, r2, o2, a2, c2, "next", t3);
        }
        function c2(t3) {
          n(s2, r2, o2, a2, c2, "throw", t3);
        }
        a2(void 0);
      });
    };
  }
  function r(t2, e2) {
    if (e2.has(t2)) throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
  function o(t2, e2) {
    if (!(t2 instanceof e2)) throw new TypeError("Cannot call a class as a function");
  }
  function s(t2, n2) {
    return t2.get(e(t2, n2));
  }
  function a(t2, e2, n2) {
    r(t2, e2), e2.set(t2, n2);
  }
  function c(t2, n2, i2) {
    return t2.set(e(t2, n2), i2), i2;
  }
  function u(t2, e2) {
    r(t2, e2), e2.add(t2);
  }
  function l(t2, e2) {
    for (var n2 = 0; n2 < e2.length; n2++) {
      var i2 = e2[n2];
      i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(t2, y(i2.key), i2);
    }
  }
  function h(t2, e2, n2) {
    return e2 && l(t2.prototype, e2), n2 && l(t2, n2), Object.defineProperty(t2, "prototype", { writable: false }), t2;
  }
  function f(t2, e2) {
    var n2 = "undefined" != typeof Symbol && t2[Symbol.iterator] || t2["@@iterator"];
    if (!n2) {
      if (Array.isArray(t2) || (n2 = S(t2)) || e2) {
        n2 && (t2 = n2);
        var i2 = 0, r2 = function() {
        };
        return { s: r2, n: function() {
          return i2 >= t2.length ? { done: true } : { done: false, value: t2[i2++] };
        }, e: function(t3) {
          throw t3;
        }, f: r2 };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o2, s2 = true, a2 = false;
    return { s: function() {
      n2 = n2.call(t2);
    }, n: function() {
      var t3 = n2.next();
      return s2 = t3.done, t3;
    }, e: function(t3) {
      a2 = true, o2 = t3;
    }, f: function() {
      try {
        s2 || null == n2.return || n2.return();
      } finally {
        if (a2) throw o2;
      }
    } };
  }
  function d(t2, e2, n2) {
    return (e2 = y(e2)) in t2 ? Object.defineProperty(t2, e2, { value: n2, enumerable: true, configurable: true, writable: true }) : t2[e2] = n2, t2;
  }
  function p(t2, e2) {
    var n2 = Object.keys(t2);
    if (Object.getOwnPropertySymbols) {
      var i2 = Object.getOwnPropertySymbols(t2);
      e2 && (i2 = i2.filter(function(e3) {
        return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
      })), n2.push.apply(n2, i2);
    }
    return n2;
  }
  function v(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var n2 = null != arguments[e2] ? arguments[e2] : {};
      e2 % 2 ? p(Object(n2), true).forEach(function(e3) {
        d(t2, e3, n2[e3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(n2)) : p(Object(n2)).forEach(function(e3) {
        Object.defineProperty(t2, e3, Object.getOwnPropertyDescriptor(n2, e3));
      });
    }
    return t2;
  }
  function m() {
    var t2, e2, n2 = "function" == typeof Symbol ? Symbol : {}, i2 = n2.iterator || "@@iterator", r2 = n2.toStringTag || "@@toStringTag";
    function o2(n3, i3, r3, o3) {
      var c3 = i3 && i3.prototype instanceof a2 ? i3 : a2, u3 = Object.create(c3.prototype);
      return _(u3, "_invoke", (function(n4, i4, r4) {
        var o4, a3, c4, u4 = 0, l3 = r4 || [], h3 = false, f3 = { p: 0, n: 0, v: t2, a: d2, f: d2.bind(t2, 4), d: function(e3, n5) {
          return o4 = e3, a3 = 0, c4 = t2, f3.n = n5, s2;
        } };
        function d2(n5, i5) {
          for (a3 = n5, c4 = i5, e2 = 0; !h3 && u4 && !r5 && e2 < l3.length; e2++) {
            var r5, o5 = l3[e2], d3 = f3.p, p2 = o5[2];
            n5 > 3 ? (r5 = p2 === i5) && (c4 = o5[(a3 = o5[4]) ? 5 : (a3 = 3, 3)], o5[4] = o5[5] = t2) : o5[0] <= d3 && ((r5 = n5 < 2 && d3 < o5[1]) ? (a3 = 0, f3.v = i5, f3.n = o5[1]) : d3 < p2 && (r5 = n5 < 3 || o5[0] > i5 || i5 > p2) && (o5[4] = n5, o5[5] = i5, f3.n = p2, a3 = 0));
          }
          if (r5 || n5 > 1) return s2;
          throw h3 = true, i5;
        }
        return function(r5, l4, p2) {
          if (u4 > 1) throw TypeError("Generator is already running");
          for (h3 && 1 === l4 && d2(l4, p2), a3 = l4, c4 = p2; (e2 = a3 < 2 ? t2 : c4) || !h3; ) {
            o4 || (a3 ? a3 < 3 ? (a3 > 1 && (f3.n = -1), d2(a3, c4)) : f3.n = c4 : f3.v = c4);
            try {
              if (u4 = 2, o4) {
                if (a3 || (r5 = "next"), e2 = o4[r5]) {
                  if (!(e2 = e2.call(o4, c4))) throw TypeError("iterator result is not an object");
                  if (!e2.done) return e2;
                  c4 = e2.value, a3 < 2 && (a3 = 0);
                } else 1 === a3 && (e2 = o4.return) && e2.call(o4), a3 < 2 && (c4 = TypeError("The iterator does not provide a '" + r5 + "' method"), a3 = 1);
                o4 = t2;
              } else if ((e2 = (h3 = f3.n < 0) ? c4 : n4.call(i4, f3)) !== s2) break;
            } catch (e3) {
              o4 = t2, a3 = 1, c4 = e3;
            } finally {
              u4 = 1;
            }
          }
          return { value: e2, done: h3 };
        };
      })(n3, r3, o3), true), u3;
    }
    var s2 = {};
    function a2() {
    }
    function c2() {
    }
    function u2() {
    }
    e2 = Object.getPrototypeOf;
    var l2 = [][i2] ? e2(e2([][i2]())) : (_(e2 = {}, i2, function() {
      return this;
    }), e2), h2 = u2.prototype = a2.prototype = Object.create(l2);
    function f2(t3) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t3, u2) : (t3.__proto__ = u2, _(t3, r2, "GeneratorFunction")), t3.prototype = Object.create(h2), t3;
    }
    return c2.prototype = u2, _(h2, "constructor", u2), _(u2, "constructor", c2), c2.displayName = "GeneratorFunction", _(u2, r2, "GeneratorFunction"), _(h2), _(h2, r2, "Generator"), _(h2, i2, function() {
      return this;
    }), _(h2, "toString", function() {
      return "[object Generator]";
    }), (m = function() {
      return { w: o2, m: f2 };
    })();
  }
  function _(t2, e2, n2, i2) {
    var r2 = Object.defineProperty;
    try {
      r2({}, "", {});
    } catch (t3) {
      r2 = 0;
    }
    _ = function(t3, e3, n3, i3) {
      function o2(e4, n4) {
        _(t3, e4, function(t4) {
          return this._invoke(e4, n4, t4);
        });
      }
      e3 ? r2 ? r2(t3, e3, { value: n3, enumerable: !i3, configurable: !i3, writable: !i3 }) : t3[e3] = n3 : (o2("next", 0), o2("throw", 1), o2("return", 2));
    }, _(t2, e2, n2, i2);
  }
  function b(t2, e2) {
    return (function(t3) {
      if (Array.isArray(t3)) return t3;
    })(t2) || (function(t3, e3) {
      var n2 = null == t3 ? null : "undefined" != typeof Symbol && t3[Symbol.iterator] || t3["@@iterator"];
      if (null != n2) {
        var i2, r2, o2, s2, a2 = [], c2 = true, u2 = false;
        try {
          if (o2 = (n2 = n2.call(t3)).next, 0 === e3) ;
          else for (; !(c2 = (i2 = o2.call(n2)).done) && (a2.push(i2.value), a2.length !== e3); c2 = true) ;
        } catch (t4) {
          u2 = true, r2 = t4;
        } finally {
          try {
            if (!c2 && null != n2.return && (s2 = n2.return(), Object(s2) !== s2)) return;
          } finally {
            if (u2) throw r2;
          }
        }
        return a2;
      }
    })(t2, e2) || S(t2, e2) || (function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    })();
  }
  function g(e2) {
    return (function(e3) {
      if (Array.isArray(e3)) return t(e3);
    })(e2) || (function(t2) {
      if ("undefined" != typeof Symbol && null != t2[Symbol.iterator] || null != t2["@@iterator"]) return Array.from(t2);
    })(e2) || S(e2) || (function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    })();
  }
  function y(t2) {
    var e2 = (function(t3, e3) {
      if ("object" != typeof t3 || !t3) return t3;
      var n2 = t3[Symbol.toPrimitive];
      if (void 0 !== n2) {
        var i2 = n2.call(t3, e3);
        if ("object" != typeof i2) return i2;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(t3);
    })(t2, "string");
    return "symbol" == typeof e2 ? e2 : e2 + "";
  }
  function w(t2) {
    return w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
      return typeof t3;
    } : function(t3) {
      return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
    }, w(t2);
  }
  function S(e2, n2) {
    if (e2) {
      if ("string" == typeof e2) return t(e2, n2);
      var i2 = {}.toString.call(e2).slice(8, -1);
      return "Object" === i2 && e2.constructor && (i2 = e2.constructor.name), "Map" === i2 || "Set" === i2 ? Array.from(e2) : "Arguments" === i2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i2) ? t(e2, n2) : void 0;
    }
  }
  var O, k, x = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, A = {};
  function C() {
    if (k) return O;
    k = 1;
    var t2 = function(t3) {
      return t3 && t3.Math === Math && t3;
    };
    return O = t2("object" == typeof globalThis && globalThis) || t2("object" == typeof window && window) || t2("object" == typeof self && self) || t2("object" == typeof x && x) || t2("object" == typeof O && O) || /* @__PURE__ */ (function() {
      return this;
    })() || Function("return this")();
  }
  var E, I, L, P, T, N, j, M, D = {};
  function R() {
    return I ? E : (I = 1, E = function(t2) {
      try {
        return !!t2();
      } catch (t3) {
        return true;
      }
    });
  }
  function F() {
    if (P) return L;
    P = 1;
    var t2 = R();
    return L = !t2(function() {
      return 7 !== Object.defineProperty({}, 1, { get: function() {
        return 7;
      } })[1];
    });
  }
  function U() {
    if (N) return T;
    N = 1;
    var t2 = R();
    return T = !t2(function() {
      var t3 = (function() {
      }).bind();
      return "function" != typeof t3 || t3.hasOwnProperty("prototype");
    });
  }
  function B() {
    if (M) return j;
    M = 1;
    var t2 = U(), e2 = Function.prototype.call;
    return j = t2 ? e2.bind(e2) : function() {
      return e2.apply(e2, arguments);
    }, j;
  }
  var H, V, G, z, W, K, q, J, Z, Y, $, X, Q, tt, et, nt, it, rt, ot, st, at, ct, ut, lt, ht, ft, dt, pt, vt, mt, _t, bt, gt, yt, wt, St, Ot, kt, xt, At, Ct, Et = {};
  function It() {
    if (H) return Et;
    H = 1;
    var t2 = {}.propertyIsEnumerable, e2 = Object.getOwnPropertyDescriptor, n2 = e2 && !t2.call({ 1: 2 }, 1);
    return Et.f = n2 ? function(t3) {
      var n3 = e2(this, t3);
      return !!n3 && n3.enumerable;
    } : t2, Et;
  }
  function Lt() {
    return G ? V : (G = 1, V = function(t2, e2) {
      return { enumerable: !(1 & t2), configurable: !(2 & t2), writable: !(4 & t2), value: e2 };
    });
  }
  function Pt() {
    if (W) return z;
    W = 1;
    var t2 = U(), e2 = Function.prototype, n2 = e2.call, i2 = t2 && e2.bind.bind(n2, n2);
    return z = t2 ? i2 : function(t3) {
      return function() {
        return n2.apply(t3, arguments);
      };
    }, z;
  }
  function Tt() {
    if (q) return K;
    q = 1;
    var t2 = Pt(), e2 = t2({}.toString), n2 = t2("".slice);
    return K = function(t3) {
      return n2(e2(t3), 8, -1);
    };
  }
  function Nt() {
    if (Z) return J;
    Z = 1;
    var t2 = Pt(), e2 = R(), n2 = Tt(), i2 = Object, r2 = t2("".split);
    return J = e2(function() {
      return !i2("z").propertyIsEnumerable(0);
    }) ? function(t3) {
      return "String" === n2(t3) ? r2(t3, "") : i2(t3);
    } : i2;
  }
  function jt() {
    return $ ? Y : ($ = 1, Y = function(t2) {
      return null == t2;
    });
  }
  function Mt() {
    if (Q) return X;
    Q = 1;
    var t2 = jt(), e2 = TypeError;
    return X = function(n2) {
      if (t2(n2)) throw new e2("Can't call method on " + n2);
      return n2;
    };
  }
  function Dt() {
    if (et) return tt;
    et = 1;
    var t2 = Nt(), e2 = Mt();
    return tt = function(n2) {
      return t2(e2(n2));
    };
  }
  function Rt() {
    if (it) return nt;
    it = 1;
    var t2 = "object" == typeof document && document.all;
    return nt = void 0 === t2 && void 0 !== t2 ? function(e2) {
      return "function" == typeof e2 || e2 === t2;
    } : function(t3) {
      return "function" == typeof t3;
    };
  }
  function Ft() {
    if (ot) return rt;
    ot = 1;
    var t2 = Rt();
    return rt = function(e2) {
      return "object" == typeof e2 ? null !== e2 : t2(e2);
    };
  }
  function Ut() {
    if (at) return st;
    at = 1;
    var t2 = C(), e2 = Rt();
    return st = function(n2, i2) {
      return arguments.length < 2 ? (r2 = t2[n2], e2(r2) ? r2 : void 0) : t2[n2] && t2[n2][i2];
      var r2;
    }, st;
  }
  function Bt() {
    if (ut) return ct;
    ut = 1;
    var t2 = Pt();
    return ct = t2({}.isPrototypeOf);
  }
  function Ht() {
    if (ht) return lt;
    ht = 1;
    var t2 = C().navigator, e2 = t2 && t2.userAgent;
    return lt = e2 ? String(e2) : "";
  }
  function Vt() {
    if (dt) return ft;
    dt = 1;
    var t2, e2, n2 = C(), i2 = Ht(), r2 = n2.process, o2 = n2.Deno, s2 = r2 && r2.versions || o2 && o2.version, a2 = s2 && s2.v8;
    return a2 && (e2 = (t2 = a2.split("."))[0] > 0 && t2[0] < 4 ? 1 : +(t2[0] + t2[1])), !e2 && i2 && (!(t2 = i2.match(/Edge\/(\d+)/)) || t2[1] >= 74) && (t2 = i2.match(/Chrome\/(\d+)/)) && (e2 = +t2[1]), ft = e2;
  }
  function Gt() {
    if (vt) return pt;
    vt = 1;
    var t2 = Vt(), e2 = R(), n2 = C().String;
    return pt = !!Object.getOwnPropertySymbols && !e2(function() {
      var e3 = Symbol("symbol detection");
      return !n2(e3) || !(Object(e3) instanceof Symbol) || !Symbol.sham && t2 && t2 < 41;
    });
  }
  function zt() {
    if (_t) return mt;
    _t = 1;
    var t2 = Gt();
    return mt = t2 && !Symbol.sham && "symbol" == typeof Symbol.iterator;
  }
  function Wt() {
    if (gt) return bt;
    gt = 1;
    var t2 = Ut(), e2 = Rt(), n2 = Bt(), i2 = zt(), r2 = Object;
    return bt = i2 ? function(t3) {
      return "symbol" == typeof t3;
    } : function(i3) {
      var o2 = t2("Symbol");
      return e2(o2) && n2(o2.prototype, r2(i3));
    };
  }
  function Kt() {
    if (wt) return yt;
    wt = 1;
    var t2 = String;
    return yt = function(e2) {
      try {
        return t2(e2);
      } catch (t3) {
        return "Object";
      }
    };
  }
  function qt() {
    if (Ot) return St;
    Ot = 1;
    var t2 = Rt(), e2 = Kt(), n2 = TypeError;
    return St = function(i2) {
      if (t2(i2)) return i2;
      throw new n2(e2(i2) + " is not a function");
    };
  }
  function Jt() {
    if (xt) return kt;
    xt = 1;
    var t2 = qt(), e2 = jt();
    return kt = function(n2, i2) {
      var r2 = n2[i2];
      return e2(r2) ? void 0 : t2(r2);
    };
  }
  function Zt() {
    if (Ct) return At;
    Ct = 1;
    var t2 = B(), e2 = Rt(), n2 = Ft(), i2 = TypeError;
    return At = function(r2, o2) {
      var s2, a2;
      if ("string" === o2 && e2(s2 = r2.toString) && !n2(a2 = t2(s2, r2))) return a2;
      if (e2(s2 = r2.valueOf) && !n2(a2 = t2(s2, r2))) return a2;
      if ("string" !== o2 && e2(s2 = r2.toString) && !n2(a2 = t2(s2, r2))) return a2;
      throw new i2("Can't convert object to primitive value");
    };
  }
  var Yt, $t, Xt, Qt, te, ee, ne, ie, re, oe, se, ae, ce, ue, le, he, fe, de, pe, ve, me, _e, be, ge, ye = { exports: {} };
  function we() {
    return $t ? Yt : ($t = 1, Yt = false);
  }
  function Se() {
    if (Qt) return Xt;
    Qt = 1;
    var t2 = C(), e2 = Object.defineProperty;
    return Xt = function(n2, i2) {
      try {
        e2(t2, n2, { value: i2, configurable: true, writable: true });
      } catch (e3) {
        t2[n2] = i2;
      }
      return i2;
    };
  }
  function Oe() {
    if (te) return ye.exports;
    te = 1;
    var t2 = we(), e2 = C(), n2 = Se(), i2 = "__core-js_shared__", r2 = ye.exports = e2[i2] || n2(i2, {});
    return (r2.versions || (r2.versions = [])).push({ version: "3.47.0", mode: t2 ? "pure" : "global", copyright: "© 2014-2025 Denis Pushkarev (zloirock.ru), 2025 CoreJS Company (core-js.io)", license: "https://github.com/zloirock/core-js/blob/v3.47.0/LICENSE", source: "https://github.com/zloirock/core-js" }), ye.exports;
  }
  function ke() {
    if (ne) return ee;
    ne = 1;
    var t2 = Oe();
    return ee = function(e2, n2) {
      return t2[e2] || (t2[e2] = n2 || {});
    };
  }
  function xe() {
    if (re) return ie;
    re = 1;
    var t2 = Mt(), e2 = Object;
    return ie = function(n2) {
      return e2(t2(n2));
    };
  }
  function Ae() {
    if (se) return oe;
    se = 1;
    var t2 = Pt(), e2 = xe(), n2 = t2({}.hasOwnProperty);
    return oe = Object.hasOwn || function(t3, i2) {
      return n2(e2(t3), i2);
    };
  }
  function Ce() {
    if (ce) return ae;
    ce = 1;
    var t2 = Pt(), e2 = 0, n2 = Math.random(), i2 = t2(1.1.toString);
    return ae = function(t3) {
      return "Symbol(" + (void 0 === t3 ? "" : t3) + ")_" + i2(++e2 + n2, 36);
    };
  }
  function Ee() {
    if (le) return ue;
    le = 1;
    var t2 = C(), e2 = ke(), n2 = Ae(), i2 = Ce(), r2 = Gt(), o2 = zt(), s2 = t2.Symbol, a2 = e2("wks"), c2 = o2 ? s2.for || s2 : s2 && s2.withoutSetter || i2;
    return ue = function(t3) {
      return n2(a2, t3) || (a2[t3] = r2 && n2(s2, t3) ? s2[t3] : c2("Symbol." + t3)), a2[t3];
    };
  }
  function Ie() {
    if (fe) return he;
    fe = 1;
    var t2 = B(), e2 = Ft(), n2 = Wt(), i2 = Jt(), r2 = Zt(), o2 = Ee(), s2 = TypeError, a2 = o2("toPrimitive");
    return he = function(o3, c2) {
      if (!e2(o3) || n2(o3)) return o3;
      var u2, l2 = i2(o3, a2);
      if (l2) {
        if (void 0 === c2 && (c2 = "default"), u2 = t2(l2, o3, c2), !e2(u2) || n2(u2)) return u2;
        throw new s2("Can't convert object to primitive value");
      }
      return void 0 === c2 && (c2 = "number"), r2(o3, c2);
    };
  }
  function Le() {
    if (pe) return de;
    pe = 1;
    var t2 = Ie(), e2 = Wt();
    return de = function(n2) {
      var i2 = t2(n2, "string");
      return e2(i2) ? i2 : i2 + "";
    };
  }
  function Pe() {
    if (me) return ve;
    me = 1;
    var t2 = C(), e2 = Ft(), n2 = t2.document, i2 = e2(n2) && e2(n2.createElement);
    return ve = function(t3) {
      return i2 ? n2.createElement(t3) : {};
    };
  }
  function Te() {
    if (be) return _e;
    be = 1;
    var t2 = F(), e2 = R(), n2 = Pe();
    return _e = !t2 && !e2(function() {
      return 7 !== Object.defineProperty(n2("div"), "a", { get: function() {
        return 7;
      } }).a;
    });
  }
  function Ne() {
    if (ge) return D;
    ge = 1;
    var t2 = F(), e2 = B(), n2 = It(), i2 = Lt(), r2 = Dt(), o2 = Le(), s2 = Ae(), a2 = Te(), c2 = Object.getOwnPropertyDescriptor;
    return D.f = t2 ? c2 : function(t3, u2) {
      if (t3 = r2(t3), u2 = o2(u2), a2) try {
        return c2(t3, u2);
      } catch (t4) {
      }
      if (s2(t3, u2)) return i2(!e2(n2.f, t3, u2), t3[u2]);
    }, D;
  }
  var je, Me, De, Re, Fe, Ue, Be, He = {};
  function Ve() {
    if (Me) return je;
    Me = 1;
    var t2 = F(), e2 = R();
    return je = t2 && e2(function() {
      return 42 !== Object.defineProperty(function() {
      }, "prototype", { value: 42, writable: false }).prototype;
    });
  }
  function Ge() {
    if (Re) return De;
    Re = 1;
    var t2 = Ft(), e2 = String, n2 = TypeError;
    return De = function(i2) {
      if (t2(i2)) return i2;
      throw new n2(e2(i2) + " is not an object");
    };
  }
  function ze() {
    if (Fe) return He;
    Fe = 1;
    var t2 = F(), e2 = Te(), n2 = Ve(), i2 = Ge(), r2 = Le(), o2 = TypeError, s2 = Object.defineProperty, a2 = Object.getOwnPropertyDescriptor, c2 = "enumerable", u2 = "configurable", l2 = "writable";
    return He.f = t2 ? n2 ? function(t3, e3, n3) {
      if (i2(t3), e3 = r2(e3), i2(n3), "function" == typeof t3 && "prototype" === e3 && "value" in n3 && l2 in n3 && !n3[l2]) {
        var o3 = a2(t3, e3);
        o3 && o3[l2] && (t3[e3] = n3.value, n3 = { configurable: u2 in n3 ? n3[u2] : o3[u2], enumerable: c2 in n3 ? n3[c2] : o3[c2], writable: false });
      }
      return s2(t3, e3, n3);
    } : s2 : function(t3, n3, a3) {
      if (i2(t3), n3 = r2(n3), i2(a3), e2) try {
        return s2(t3, n3, a3);
      } catch (t4) {
      }
      if ("get" in a3 || "set" in a3) throw new o2("Accessors not supported");
      return "value" in a3 && (t3[n3] = a3.value), t3;
    }, He;
  }
  function We() {
    if (Be) return Ue;
    Be = 1;
    var t2 = F(), e2 = ze(), n2 = Lt();
    return Ue = t2 ? function(t3, i2, r2) {
      return e2.f(t3, i2, n2(1, r2));
    } : function(t3, e3, n3) {
      return t3[e3] = n3, t3;
    };
  }
  var Ke, qe, Je, Ze, Ye, $e, Xe, Qe, tn, en, nn, rn, on, sn, an, cn = { exports: {} };
  function un() {
    if (qe) return Ke;
    qe = 1;
    var t2 = F(), e2 = Ae(), n2 = Function.prototype, i2 = t2 && Object.getOwnPropertyDescriptor, r2 = e2(n2, "name"), o2 = r2 && "something" === (function() {
    }).name, s2 = r2 && (!t2 || t2 && i2(n2, "name").configurable);
    return Ke = { EXISTS: r2, PROPER: o2, CONFIGURABLE: s2 };
  }
  function ln() {
    if (Ze) return Je;
    Ze = 1;
    var t2 = Pt(), e2 = Rt(), n2 = Oe(), i2 = t2(Function.toString);
    return e2(n2.inspectSource) || (n2.inspectSource = function(t3) {
      return i2(t3);
    }), Je = n2.inspectSource;
  }
  function hn() {
    if ($e) return Ye;
    $e = 1;
    var t2 = C(), e2 = Rt(), n2 = t2.WeakMap;
    return Ye = e2(n2) && /native code/.test(String(n2));
  }
  function fn() {
    if (Qe) return Xe;
    Qe = 1;
    var t2 = ke(), e2 = Ce(), n2 = t2("keys");
    return Xe = function(t3) {
      return n2[t3] || (n2[t3] = e2(t3));
    };
  }
  function dn() {
    return en ? tn : (en = 1, tn = {});
  }
  function pn() {
    if (rn) return nn;
    rn = 1;
    var t2, e2, n2, i2 = hn(), r2 = C(), o2 = Ft(), s2 = We(), a2 = Ae(), c2 = Oe(), u2 = fn(), l2 = dn(), h2 = "Object already initialized", f2 = r2.TypeError, d2 = r2.WeakMap;
    if (i2 || c2.state) {
      var p2 = c2.state || (c2.state = new d2());
      p2.get = p2.get, p2.has = p2.has, p2.set = p2.set, t2 = function(t3, e3) {
        if (p2.has(t3)) throw new f2(h2);
        return e3.facade = t3, p2.set(t3, e3), e3;
      }, e2 = function(t3) {
        return p2.get(t3) || {};
      }, n2 = function(t3) {
        return p2.has(t3);
      };
    } else {
      var v2 = u2("state");
      l2[v2] = true, t2 = function(t3, e3) {
        if (a2(t3, v2)) throw new f2(h2);
        return e3.facade = t3, s2(t3, v2, e3), e3;
      }, e2 = function(t3) {
        return a2(t3, v2) ? t3[v2] : {};
      }, n2 = function(t3) {
        return a2(t3, v2);
      };
    }
    return nn = { set: t2, get: e2, has: n2, enforce: function(i3) {
      return n2(i3) ? e2(i3) : t2(i3, {});
    }, getterFor: function(t3) {
      return function(n3) {
        var i3;
        if (!o2(n3) || (i3 = e2(n3)).type !== t3) throw new f2("Incompatible receiver, " + t3 + " required");
        return i3;
      };
    } };
  }
  function vn() {
    if (on) return cn.exports;
    on = 1;
    var t2 = Pt(), e2 = R(), n2 = Rt(), i2 = Ae(), r2 = F(), o2 = un().CONFIGURABLE, s2 = ln(), a2 = pn(), c2 = a2.enforce, u2 = a2.get, l2 = String, h2 = Object.defineProperty, f2 = t2("".slice), d2 = t2("".replace), p2 = t2([].join), v2 = r2 && !e2(function() {
      return 8 !== h2(function() {
      }, "length", { value: 8 }).length;
    }), m2 = String(String).split("String"), _2 = cn.exports = function(t3, e3, n3) {
      "Symbol(" === f2(l2(e3), 0, 7) && (e3 = "[" + d2(l2(e3), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), n3 && n3.getter && (e3 = "get " + e3), n3 && n3.setter && (e3 = "set " + e3), (!i2(t3, "name") || o2 && t3.name !== e3) && (r2 ? h2(t3, "name", { value: e3, configurable: true }) : t3.name = e3), v2 && n3 && i2(n3, "arity") && t3.length !== n3.arity && h2(t3, "length", { value: n3.arity });
      try {
        n3 && i2(n3, "constructor") && n3.constructor ? r2 && h2(t3, "prototype", { writable: false }) : t3.prototype && (t3.prototype = void 0);
      } catch (t4) {
      }
      var s3 = c2(t3);
      return i2(s3, "source") || (s3.source = p2(m2, "string" == typeof e3 ? e3 : "")), t3;
    };
    return Function.prototype.toString = _2(function() {
      return n2(this) && u2(this).source || s2(this);
    }, "toString"), cn.exports;
  }
  function mn() {
    if (an) return sn;
    an = 1;
    var t2 = Rt(), e2 = ze(), n2 = vn(), i2 = Se();
    return sn = function(r2, o2, s2, a2) {
      a2 || (a2 = {});
      var c2 = a2.enumerable, u2 = void 0 !== a2.name ? a2.name : o2;
      if (t2(s2) && n2(s2, u2, a2), a2.global) c2 ? r2[o2] = s2 : i2(o2, s2);
      else {
        try {
          a2.unsafe ? r2[o2] && (c2 = true) : delete r2[o2];
        } catch (t3) {
        }
        c2 ? r2[o2] = s2 : e2.f(r2, o2, { value: s2, enumerable: false, configurable: !a2.nonConfigurable, writable: !a2.nonWritable });
      }
      return r2;
    };
  }
  var _n, bn, gn, yn, wn, Sn, On, kn, xn, An, Cn, En, In, Ln, Pn, Tn, Nn, jn = {};
  function Mn() {
    if (yn) return gn;
    yn = 1;
    var t2 = (function() {
      if (bn) return _n;
      bn = 1;
      var t3 = Math.ceil, e2 = Math.floor;
      return _n = Math.trunc || function(n2) {
        var i2 = +n2;
        return (i2 > 0 ? e2 : t3)(i2);
      };
    })();
    return gn = function(e2) {
      var n2 = +e2;
      return n2 != n2 || 0 === n2 ? 0 : t2(n2);
    };
  }
  function Dn() {
    if (Sn) return wn;
    Sn = 1;
    var t2 = Mn(), e2 = Math.max, n2 = Math.min;
    return wn = function(i2, r2) {
      var o2 = t2(i2);
      return o2 < 0 ? e2(o2 + r2, 0) : n2(o2, r2);
    };
  }
  function Rn() {
    if (kn) return On;
    kn = 1;
    var t2 = Mn(), e2 = Math.min;
    return On = function(n2) {
      var i2 = t2(n2);
      return i2 > 0 ? e2(i2, 9007199254740991) : 0;
    };
  }
  function Fn() {
    if (An) return xn;
    An = 1;
    var t2 = Rn();
    return xn = function(e2) {
      return t2(e2.length);
    };
  }
  function Un() {
    if (En) return Cn;
    En = 1;
    var t2 = Dt(), e2 = Dn(), n2 = Fn(), i2 = function(i3) {
      return function(r2, o2, s2) {
        var a2 = t2(r2), c2 = n2(a2);
        if (0 === c2) return !i3 && -1;
        var u2, l2 = e2(s2, c2);
        if (i3 && o2 != o2) {
          for (; c2 > l2; ) if ((u2 = a2[l2++]) != u2) return true;
        } else for (; c2 > l2; l2++) if ((i3 || l2 in a2) && a2[l2] === o2) return i3 || l2 || 0;
        return !i3 && -1;
      };
    };
    return Cn = { includes: i2(true), indexOf: i2(false) };
  }
  function Bn() {
    if (Ln) return In;
    Ln = 1;
    var t2 = Pt(), e2 = Ae(), n2 = Dt(), i2 = Un().indexOf, r2 = dn(), o2 = t2([].push);
    return In = function(t3, s2) {
      var a2, c2 = n2(t3), u2 = 0, l2 = [];
      for (a2 in c2) !e2(r2, a2) && e2(c2, a2) && o2(l2, a2);
      for (; s2.length > u2; ) e2(c2, a2 = s2[u2++]) && (~i2(l2, a2) || o2(l2, a2));
      return l2;
    };
  }
  function Hn() {
    return Tn ? Pn : (Tn = 1, Pn = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]);
  }
  function Vn() {
    if (Nn) return jn;
    Nn = 1;
    var t2 = Bn(), e2 = Hn().concat("length", "prototype");
    return jn.f = Object.getOwnPropertyNames || function(n2) {
      return t2(n2, e2);
    }, jn;
  }
  var Gn, zn, Wn, Kn, qn, Jn, Zn, Yn, $n, Xn, Qn, ti, ei, ni, ii, ri, oi, si, ai, ci, ui, li, hi, fi, di, pi, vi, mi, _i, bi, gi = {};
  function yi() {
    return Gn || (Gn = 1, gi.f = Object.getOwnPropertySymbols), gi;
  }
  function wi() {
    if (Wn) return zn;
    Wn = 1;
    var t2 = Ut(), e2 = Pt(), n2 = Vn(), i2 = yi(), r2 = Ge(), o2 = e2([].concat);
    return zn = t2("Reflect", "ownKeys") || function(t3) {
      var e3 = n2.f(r2(t3)), s2 = i2.f;
      return s2 ? o2(e3, s2(t3)) : e3;
    };
  }
  function Si() {
    if (qn) return Kn;
    qn = 1;
    var t2 = Ae(), e2 = wi(), n2 = Ne(), i2 = ze();
    return Kn = function(r2, o2, s2) {
      for (var a2 = e2(o2), c2 = i2.f, u2 = n2.f, l2 = 0; l2 < a2.length; l2++) {
        var h2 = a2[l2];
        t2(r2, h2) || s2 && t2(s2, h2) || c2(r2, h2, u2(o2, h2));
      }
    };
  }
  function Oi() {
    if (Zn) return Jn;
    Zn = 1;
    var t2 = R(), e2 = Rt(), n2 = /#|\.prototype\./, i2 = function(n3, i3) {
      var c2 = o2[r2(n3)];
      return c2 === a2 || c2 !== s2 && (e2(i3) ? t2(i3) : !!i3);
    }, r2 = i2.normalize = function(t3) {
      return String(t3).replace(n2, ".").toLowerCase();
    }, o2 = i2.data = {}, s2 = i2.NATIVE = "N", a2 = i2.POLYFILL = "P";
    return Jn = i2;
  }
  function ki() {
    if ($n) return Yn;
    $n = 1;
    var t2 = C(), e2 = Ne().f, n2 = We(), i2 = mn(), r2 = Se(), o2 = Si(), s2 = Oi();
    return Yn = function(a2, c2) {
      var u2, l2, h2, f2, d2, p2 = a2.target, v2 = a2.global, m2 = a2.stat;
      if (u2 = v2 ? t2 : m2 ? t2[p2] || r2(p2, {}) : t2[p2] && t2[p2].prototype) for (l2 in c2) {
        if (f2 = c2[l2], h2 = a2.dontCallGetSet ? (d2 = e2(u2, l2)) && d2.value : u2[l2], !s2(v2 ? l2 : p2 + (m2 ? "." : "#") + l2, a2.forced) && void 0 !== h2) {
          if (typeof f2 == typeof h2) continue;
          o2(f2, h2);
        }
        (a2.sham || h2 && h2.sham) && n2(f2, "sham", true), i2(u2, l2, f2, a2);
      }
    };
  }
  function xi() {
    if (Qn) return Xn;
    Qn = 1;
    var t2 = Tt(), e2 = Pt();
    return Xn = function(n2) {
      if ("Function" === t2(n2)) return e2(n2);
    };
  }
  function Ai() {
    if (ei) return ti;
    ei = 1;
    var t2 = xi(), e2 = qt(), n2 = U(), i2 = t2(t2.bind);
    return ti = function(t3, r2) {
      return e2(t3), void 0 === r2 ? t3 : n2 ? i2(t3, r2) : function() {
        return t3.apply(r2, arguments);
      };
    }, ti;
  }
  function Ci() {
    if (ii) return ni;
    ii = 1;
    var t2 = Tt();
    return ni = Array.isArray || function(e2) {
      return "Array" === t2(e2);
    };
  }
  function Ei() {
    if (oi) return ri;
    oi = 1;
    var t2 = {};
    return t2[Ee()("toStringTag")] = "z", ri = "[object z]" === String(t2);
  }
  function Ii() {
    if (ai) return si;
    ai = 1;
    var t2 = Ei(), e2 = Rt(), n2 = Tt(), i2 = Ee()("toStringTag"), r2 = Object, o2 = "Arguments" === n2(/* @__PURE__ */ (function() {
      return arguments;
    })());
    return si = t2 ? n2 : function(t3) {
      var s2, a2, c2;
      return void 0 === t3 ? "Undefined" : null === t3 ? "Null" : "string" == typeof (a2 = (function(t4, e3) {
        try {
          return t4[e3];
        } catch (t5) {
        }
      })(s2 = r2(t3), i2)) ? a2 : o2 ? n2(s2) : "Object" === (c2 = n2(s2)) && e2(s2.callee) ? "Arguments" : c2;
    };
  }
  function Li() {
    if (ui) return ci;
    ui = 1;
    var t2 = Pt(), e2 = R(), n2 = Rt(), i2 = Ii(), r2 = Ut(), o2 = ln(), s2 = function() {
    }, a2 = r2("Reflect", "construct"), c2 = /^\s*(?:class|function)\b/, u2 = t2(c2.exec), l2 = !c2.test(s2), h2 = function(t3) {
      if (!n2(t3)) return false;
      try {
        return a2(s2, [], t3), true;
      } catch (t4) {
        return false;
      }
    }, f2 = function(t3) {
      if (!n2(t3)) return false;
      switch (i2(t3)) {
        case "AsyncFunction":
        case "GeneratorFunction":
        case "AsyncGeneratorFunction":
          return false;
      }
      try {
        return l2 || !!u2(c2, o2(t3));
      } catch (t4) {
        return true;
      }
    };
    return f2.sham = true, ci = !a2 || e2(function() {
      var t3;
      return h2(h2.call) || !h2(Object) || !h2(function() {
        t3 = true;
      }) || t3;
    }) ? f2 : h2;
  }
  function Pi() {
    if (hi) return li;
    hi = 1;
    var t2 = Ci(), e2 = Li(), n2 = Ft(), i2 = Ee()("species"), r2 = Array;
    return li = function(o2) {
      var s2;
      return t2(o2) && (s2 = o2.constructor, (e2(s2) && (s2 === r2 || t2(s2.prototype)) || n2(s2) && null === (s2 = s2[i2])) && (s2 = void 0)), void 0 === s2 ? r2 : s2;
    };
  }
  function Ti() {
    if (di) return fi;
    di = 1;
    var t2 = Pi();
    return fi = function(e2, n2) {
      return new (t2(e2))(0 === n2 ? 0 : n2);
    };
  }
  function Ni() {
    if (vi) return pi;
    vi = 1;
    var t2 = Ai(), e2 = Pt(), n2 = Nt(), i2 = xe(), r2 = Fn(), o2 = Ti(), s2 = e2([].push), a2 = function(e3) {
      var a3 = 1 === e3, c2 = 2 === e3, u2 = 3 === e3, l2 = 4 === e3, h2 = 6 === e3, f2 = 7 === e3, d2 = 5 === e3 || h2;
      return function(p2, v2, m2, _2) {
        for (var b2, g2, y2 = i2(p2), w2 = n2(y2), S2 = r2(w2), O2 = t2(v2, m2), k2 = 0, x2 = _2 || o2, A2 = a3 ? x2(p2, S2) : c2 || f2 ? x2(p2, 0) : void 0; S2 > k2; k2++) if ((d2 || k2 in w2) && (g2 = O2(b2 = w2[k2], k2, y2), e3)) if (a3) A2[k2] = g2;
        else if (g2) switch (e3) {
          case 3:
            return true;
          case 5:
            return b2;
          case 6:
            return k2;
          case 2:
            s2(A2, b2);
        }
        else switch (e3) {
          case 4:
            return false;
          case 7:
            s2(A2, b2);
        }
        return h2 ? -1 : u2 || l2 ? l2 : A2;
      };
    };
    return pi = { forEach: a2(0), map: a2(1), filter: a2(2), some: a2(3), every: a2(4), find: a2(5), findIndex: a2(6), filterReject: a2(7) };
  }
  function ji() {
    if (_i) return mi;
    _i = 1;
    var t2 = R(), e2 = Ee(), n2 = Vt(), i2 = e2("species");
    return mi = function(e3) {
      return n2 >= 51 || !t2(function() {
        var t3 = [];
        return (t3.constructor = {})[i2] = function() {
          return { foo: 1 };
        }, 1 !== t3[e3](Boolean).foo;
      });
    };
  }
  !(function() {
    if (bi) return A;
    bi = 1;
    var t2 = ki(), e2 = Ni().filter;
    t2({ target: "Array", proto: true, forced: !ji()("filter") }, { filter: function(t3) {
      return e2(this, t3, arguments.length > 1 ? arguments[1] : void 0);
    } });
  })();
  var Mi, Di, Ri, Fi, Ui, Bi, Hi, Vi, Gi, zi, Wi, Ki, qi, Ji, Zi, Yi, $i, Xi, Qi, tr, er, nr, ir, rr, or, sr, ar, cr, ur, lr, hr, fr, dr, pr, vr, mr, _r = {}, br = {};
  function gr() {
    if (Di) return Mi;
    Di = 1;
    var t2 = Bn(), e2 = Hn();
    return Mi = Object.keys || function(n2) {
      return t2(n2, e2);
    };
  }
  function yr() {
    if (Ri) return br;
    Ri = 1;
    var t2 = F(), e2 = Ve(), n2 = ze(), i2 = Ge(), r2 = Dt(), o2 = gr();
    return br.f = t2 && !e2 ? Object.defineProperties : function(t3, e3) {
      i2(t3);
      for (var s2, a2 = r2(e3), c2 = o2(e3), u2 = c2.length, l2 = 0; u2 > l2; ) n2.f(t3, s2 = c2[l2++], a2[s2]);
      return t3;
    }, br;
  }
  function wr() {
    if (Ui) return Fi;
    Ui = 1;
    var t2 = Ut();
    return Fi = t2("document", "documentElement");
  }
  function Sr() {
    if (Hi) return Bi;
    Hi = 1;
    var t2, e2 = Ge(), n2 = yr(), i2 = Hn(), r2 = dn(), o2 = wr(), s2 = Pe(), a2 = fn(), c2 = "prototype", u2 = "script", l2 = a2("IE_PROTO"), h2 = function() {
    }, f2 = function(t3) {
      return "<" + u2 + ">" + t3 + "</" + u2 + ">";
    }, d2 = function(t3) {
      t3.write(f2("")), t3.close();
      var e3 = t3.parentWindow.Object;
      return t3 = null, e3;
    }, p2 = function() {
      try {
        t2 = new ActiveXObject("htmlfile");
      } catch (t3) {
      }
      var e3, n3, r3;
      p2 = "undefined" != typeof document ? document.domain && t2 ? d2(t2) : (n3 = s2("iframe"), r3 = "java" + u2 + ":", n3.style.display = "none", o2.appendChild(n3), n3.src = String(r3), (e3 = n3.contentWindow.document).open(), e3.write(f2("document.F=Object")), e3.close(), e3.F) : d2(t2);
      for (var a3 = i2.length; a3--; ) delete p2[c2][i2[a3]];
      return p2();
    };
    return r2[l2] = true, Bi = Object.create || function(t3, i3) {
      var r3;
      return null !== t3 ? (h2[c2] = e2(t3), r3 = new h2(), h2[c2] = null, r3[l2] = t3) : r3 = p2(), void 0 === i3 ? r3 : n2.f(r3, i3);
    };
  }
  function Or() {
    if (Gi) return Vi;
    Gi = 1;
    var t2 = Ee(), e2 = Sr(), n2 = ze().f, i2 = t2("unscopables"), r2 = Array.prototype;
    return void 0 === r2[i2] && n2(r2, i2, { configurable: true, value: e2(null) }), Vi = function(t3) {
      r2[i2][t3] = true;
    };
  }
  function kr() {
    return Ki ? Wi : (Ki = 1, Wi = {});
  }
  function xr() {
    if (Yi) return Zi;
    Yi = 1;
    var t2 = Ae(), e2 = Rt(), n2 = xe(), i2 = fn(), r2 = (function() {
      if (Ji) return qi;
      Ji = 1;
      var t3 = R();
      return qi = !t3(function() {
        function t4() {
        }
        return t4.prototype.constructor = null, Object.getPrototypeOf(new t4()) !== t4.prototype;
      });
    })(), o2 = i2("IE_PROTO"), s2 = Object, a2 = s2.prototype;
    return Zi = r2 ? s2.getPrototypeOf : function(i3) {
      var r3 = n2(i3);
      if (t2(r3, o2)) return r3[o2];
      var c2 = r3.constructor;
      return e2(c2) && r3 instanceof c2 ? c2.prototype : r3 instanceof s2 ? a2 : null;
    };
  }
  function Ar() {
    if (Xi) return $i;
    Xi = 1;
    var t2, e2, n2, i2 = R(), r2 = Rt(), o2 = Ft(), s2 = Sr(), a2 = xr(), c2 = mn(), u2 = Ee(), l2 = we(), h2 = u2("iterator"), f2 = false;
    return [].keys && ("next" in (n2 = [].keys()) ? (e2 = a2(a2(n2))) !== Object.prototype && (t2 = e2) : f2 = true), !o2(t2) || i2(function() {
      var e3 = {};
      return t2[h2].call(e3) !== e3;
    }) ? t2 = {} : l2 && (t2 = s2(t2)), r2(t2[h2]) || c2(t2, h2, function() {
      return this;
    }), $i = { IteratorPrototype: t2, BUGGY_SAFARI_ITERATORS: f2 };
  }
  function Cr() {
    if (tr) return Qi;
    tr = 1;
    var t2 = ze().f, e2 = Ae(), n2 = Ee()("toStringTag");
    return Qi = function(i2, r2, o2) {
      i2 && !o2 && (i2 = i2.prototype), i2 && !e2(i2, n2) && t2(i2, n2, { configurable: true, value: r2 });
    };
  }
  function Er() {
    if (nr) return er;
    nr = 1;
    var t2 = Ar().IteratorPrototype, e2 = Sr(), n2 = Lt(), i2 = Cr(), r2 = kr(), o2 = function() {
      return this;
    };
    return er = function(s2, a2, c2, u2) {
      var l2 = a2 + " Iterator";
      return s2.prototype = e2(t2, { next: n2(+!u2, c2) }), i2(s2, l2, false, true), r2[l2] = o2, s2;
    };
  }
  function Ir() {
    if (sr) return or;
    sr = 1;
    var t2 = Ft();
    return or = function(e2) {
      return t2(e2) || null === e2;
    };
  }
  function Lr() {
    if (cr) return ar;
    cr = 1;
    var t2 = Ir(), e2 = String, n2 = TypeError;
    return ar = function(i2) {
      if (t2(i2)) return i2;
      throw new n2("Can't set " + e2(i2) + " as a prototype");
    };
  }
  function Pr() {
    if (lr) return ur;
    lr = 1;
    var t2 = (function() {
      if (rr) return ir;
      rr = 1;
      var t3 = Pt(), e3 = qt();
      return ir = function(n3, i3, r2) {
        try {
          return t3(e3(Object.getOwnPropertyDescriptor(n3, i3)[r2]));
        } catch (t4) {
        }
      };
    })(), e2 = Ft(), n2 = Mt(), i2 = Lr();
    return ur = Object.setPrototypeOf || ("__proto__" in {} ? (function() {
      var r2, o2 = false, s2 = {};
      try {
        (r2 = t2(Object.prototype, "__proto__", "set"))(s2, []), o2 = s2 instanceof Array;
      } catch (t3) {
      }
      return function(t3, s3) {
        return n2(t3), i2(s3), e2(t3) ? (o2 ? r2(t3, s3) : t3.__proto__ = s3, t3) : t3;
      };
    })() : void 0);
  }
  function Tr() {
    if (fr) return hr;
    fr = 1;
    var t2 = ki(), e2 = B(), n2 = we(), i2 = un(), r2 = Rt(), o2 = Er(), s2 = xr(), a2 = Pr(), c2 = Cr(), u2 = We(), l2 = mn(), h2 = Ee(), f2 = kr(), d2 = Ar(), p2 = i2.PROPER, v2 = i2.CONFIGURABLE, m2 = d2.IteratorPrototype, _2 = d2.BUGGY_SAFARI_ITERATORS, b2 = h2("iterator"), g2 = "keys", y2 = "values", w2 = "entries", S2 = function() {
      return this;
    };
    return hr = function(i3, h3, d3, O2, k2, x2, A2) {
      o2(d3, h3, O2);
      var C2, E2, I2, L2 = function(t3) {
        if (t3 === k2 && M2) return M2;
        if (!_2 && t3 && t3 in N2) return N2[t3];
        switch (t3) {
          case g2:
          case y2:
          case w2:
            return function() {
              return new d3(this, t3);
            };
        }
        return function() {
          return new d3(this);
        };
      }, P2 = h3 + " Iterator", T2 = false, N2 = i3.prototype, j2 = N2[b2] || N2["@@iterator"] || k2 && N2[k2], M2 = !_2 && j2 || L2(k2), D2 = "Array" === h3 && N2.entries || j2;
      if (D2 && (C2 = s2(D2.call(new i3()))) !== Object.prototype && C2.next && (n2 || s2(C2) === m2 || (a2 ? a2(C2, m2) : r2(C2[b2]) || l2(C2, b2, S2)), c2(C2, P2, true, true), n2 && (f2[P2] = S2)), p2 && k2 === y2 && j2 && j2.name !== y2 && (!n2 && v2 ? u2(N2, "name", y2) : (T2 = true, M2 = function() {
        return e2(j2, this);
      })), k2) if (E2 = { values: L2(y2), keys: x2 ? M2 : L2(g2), entries: L2(w2) }, A2) for (I2 in E2) (_2 || T2 || !(I2 in N2)) && l2(N2, I2, E2[I2]);
      else t2({ target: h3, proto: true, forced: _2 || T2 }, E2);
      return n2 && !A2 || N2[b2] === M2 || l2(N2, b2, M2, { name: k2 }), f2[h3] = M2, E2;
    };
  }
  function Nr() {
    return pr ? dr : (pr = 1, dr = function(t2, e2) {
      return { value: t2, done: e2 };
    });
  }
  function jr() {
    if (mr) return vr;
    mr = 1;
    var t2 = Dt(), e2 = Or(), n2 = kr(), i2 = pn(), r2 = ze().f, o2 = Tr(), s2 = Nr(), a2 = we(), c2 = F(), u2 = "Array Iterator", l2 = i2.set, h2 = i2.getterFor(u2);
    vr = o2(Array, "Array", function(e3, n3) {
      l2(this, { type: u2, target: t2(e3), index: 0, kind: n3 });
    }, function() {
      var t3 = h2(this), e3 = t3.target, n3 = t3.index++;
      if (!e3 || n3 >= e3.length) return t3.target = null, s2(void 0, true);
      switch (t3.kind) {
        case "keys":
          return s2(n3, false);
        case "values":
          return s2(e3[n3], false);
      }
      return s2([n3, e3[n3]], false);
    }, "values");
    var f2 = n2.Arguments = n2.Array;
    if (e2("keys"), e2("values"), e2("entries"), !a2 && c2 && "values" !== f2.name) try {
      r2(f2, "name", { value: "values" });
    } catch (t3) {
    }
    return vr;
  }
  !(function() {
    if (zi) return _r;
    zi = 1;
    var t2 = ki(), e2 = Un().includes, n2 = R(), i2 = Or();
    t2({ target: "Array", proto: true, forced: n2(function() {
      return !Array(1).includes();
    }) }, { includes: function(t3) {
      return e2(this, t3, arguments.length > 1 ? arguments[1] : void 0);
    } }), i2("includes");
  })(), jr();
  var Mr, Dr, Rr, Fr = {};
  function Ur() {
    if (Dr) return Mr;
    Dr = 1;
    var t2 = R();
    return Mr = function(e2, n2) {
      var i2 = [][e2];
      return !!i2 && t2(function() {
        i2.call(null, n2 || function() {
          return 1;
        }, 1);
      });
    };
  }
  !(function() {
    if (Rr) return Fr;
    Rr = 1;
    var t2 = ki(), e2 = Pt(), n2 = Nt(), i2 = Dt(), r2 = Ur(), o2 = e2([].join);
    t2({ target: "Array", proto: true, forced: n2 !== Object || !r2("join", ",") }, { join: function(t3) {
      return o2(i2(this), void 0 === t3 ? "," : t3);
    } });
  })();
  var Br, Hr = {};
  !(function() {
    if (Br) return Hr;
    Br = 1;
    var t2 = ki(), e2 = Ni().map;
    t2({ target: "Array", proto: true, forced: !ji()("map") }, { map: function(t3) {
      return e2(this, t3, arguments.length > 1 ? arguments[1] : void 0);
    } });
  })();
  var Vr, Gr, zr, Wr = {};
  function Kr() {
    if (Gr) return Vr;
    Gr = 1;
    var t2 = vn(), e2 = ze();
    return Vr = function(n2, i2, r2) {
      return r2.get && t2(r2.get, i2, { getter: true }), r2.set && t2(r2.set, i2, { setter: true }), e2.f(n2, i2, r2);
    };
  }
  !(function() {
    if (zr) return Wr;
    zr = 1;
    var t2 = F(), e2 = un().EXISTS, n2 = Pt(), i2 = Kr(), r2 = Function.prototype, o2 = n2(r2.toString), s2 = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/, a2 = n2(s2.exec);
    t2 && !e2 && i2(r2, "name", { configurable: true, get: function() {
      try {
        return a2(s2, o2(this))[1];
      } catch (t3) {
        return "";
      }
    } });
  })();
  var qr, Jr = {};
  !(function() {
    if (qr) return Jr;
    qr = 1;
    var t2 = ki(), e2 = xe(), n2 = gr();
    t2({ target: "Object", stat: true, forced: R()(function() {
      n2(1);
    }) }, { keys: function(t3) {
      return n2(e2(t3));
    } });
  })();
  var Zr, Yr, $r, Xr = {};
  !(function() {
    if ($r) return Xr;
    $r = 1;
    var t2 = Ei(), e2 = mn(), n2 = (function() {
      if (Yr) return Zr;
      Yr = 1;
      var t3 = Ei(), e3 = Ii();
      return Zr = t3 ? {}.toString : function() {
        return "[object " + e3(this) + "]";
      };
    })();
    t2 || e2(Object.prototype, "toString", n2, { unsafe: true });
  })();
  var Qr, to, eo, no, io, ro, oo, so, ao, co, uo, lo, ho, fo, po, vo, mo, _o, bo, go, yo, wo, So, Oo, ko, xo, Ao, Co, Eo, Io, Lo, Po, To, No, jo, Mo, Do, Ro, Fo, Uo, Bo, Ho, Vo = {};
  function Go() {
    if (to) return Qr;
    to = 1;
    var t2 = C(), e2 = Ht(), n2 = Tt(), i2 = function(t3) {
      return e2.slice(0, t3.length) === t3;
    };
    return Qr = i2("Bun/") ? "BUN" : i2("Cloudflare-Workers") ? "CLOUDFLARE" : i2("Deno/") ? "DENO" : i2("Node.js/") ? "NODE" : t2.Bun && "string" == typeof Bun.version ? "BUN" : t2.Deno && "object" == typeof Deno.version ? "DENO" : "process" === n2(t2.process) ? "NODE" : t2.window && t2.document ? "BROWSER" : "REST";
  }
  function zo() {
    if (no) return eo;
    no = 1;
    var t2 = Go();
    return eo = "NODE" === t2;
  }
  function Wo() {
    if (ro) return io;
    ro = 1;
    var t2 = C();
    return io = t2;
  }
  function Ko() {
    if (so) return oo;
    so = 1;
    var t2 = Ut(), e2 = Kr(), n2 = Ee(), i2 = F(), r2 = n2("species");
    return oo = function(n3) {
      var o2 = t2(n3);
      i2 && o2 && !o2[r2] && e2(o2, r2, { configurable: true, get: function() {
        return this;
      } });
    };
  }
  function qo() {
    if (co) return ao;
    co = 1;
    var t2 = Bt(), e2 = TypeError;
    return ao = function(n2, i2) {
      if (t2(i2, n2)) return n2;
      throw new e2("Incorrect invocation");
    };
  }
  function Jo() {
    if (lo) return uo;
    lo = 1;
    var t2 = Li(), e2 = Kt(), n2 = TypeError;
    return uo = function(i2) {
      if (t2(i2)) return i2;
      throw new n2(e2(i2) + " is not a constructor");
    };
  }
  function Zo() {
    if (fo) return ho;
    fo = 1;
    var t2 = Ge(), e2 = Jo(), n2 = jt(), i2 = Ee()("species");
    return ho = function(r2, o2) {
      var s2, a2 = t2(r2).constructor;
      return void 0 === a2 || n2(s2 = t2(a2)[i2]) ? o2 : e2(s2);
    };
  }
  function Yo() {
    if (vo) return po;
    vo = 1;
    var t2 = U(), e2 = Function.prototype, n2 = e2.apply, i2 = e2.call;
    return po = "object" == typeof Reflect && Reflect.apply || (t2 ? i2.bind(n2) : function() {
      return i2.apply(n2, arguments);
    }), po;
  }
  function $o() {
    if (_o) return mo;
    _o = 1;
    var t2 = Pt();
    return mo = t2([].slice);
  }
  function Xo() {
    if (go) return bo;
    go = 1;
    var t2 = TypeError;
    return bo = function(e2, n2) {
      if (e2 < n2) throw new t2("Not enough arguments");
      return e2;
    };
  }
  function Qo() {
    if (wo) return yo;
    wo = 1;
    var t2 = Ht();
    return yo = /(?:ipad|iphone|ipod).*applewebkit/i.test(t2);
  }
  function ts() {
    if (Oo) return So;
    Oo = 1;
    var t2, e2, n2, i2, r2 = C(), o2 = Yo(), s2 = Ai(), a2 = Rt(), c2 = Ae(), u2 = R(), l2 = wr(), h2 = $o(), f2 = Pe(), d2 = Xo(), p2 = Qo(), v2 = zo(), m2 = r2.setImmediate, _2 = r2.clearImmediate, b2 = r2.process, g2 = r2.Dispatch, y2 = r2.Function, w2 = r2.MessageChannel, S2 = r2.String, O2 = 0, k2 = {}, x2 = "onreadystatechange";
    u2(function() {
      t2 = r2.location;
    });
    var A2 = function(t3) {
      if (c2(k2, t3)) {
        var e3 = k2[t3];
        delete k2[t3], e3();
      }
    }, E2 = function(t3) {
      return function() {
        A2(t3);
      };
    }, I2 = function(t3) {
      A2(t3.data);
    }, L2 = function(e3) {
      r2.postMessage(S2(e3), t2.protocol + "//" + t2.host);
    };
    return m2 && _2 || (m2 = function(t3) {
      d2(arguments.length, 1);
      var n3 = a2(t3) ? t3 : y2(t3), i3 = h2(arguments, 1);
      return k2[++O2] = function() {
        o2(n3, void 0, i3);
      }, e2(O2), O2;
    }, _2 = function(t3) {
      delete k2[t3];
    }, v2 ? e2 = function(t3) {
      b2.nextTick(E2(t3));
    } : g2 && g2.now ? e2 = function(t3) {
      g2.now(E2(t3));
    } : w2 && !p2 ? (i2 = (n2 = new w2()).port2, n2.port1.onmessage = I2, e2 = s2(i2.postMessage, i2)) : r2.addEventListener && a2(r2.postMessage) && !r2.importScripts && t2 && "file:" !== t2.protocol && !u2(L2) ? (e2 = L2, r2.addEventListener("message", I2, false)) : e2 = x2 in f2("script") ? function(t3) {
      l2.appendChild(f2("script"))[x2] = function() {
        l2.removeChild(this), A2(t3);
      };
    } : function(t3) {
      setTimeout(E2(t3), 0);
    }), So = { set: m2, clear: _2 };
  }
  function es() {
    if (xo) return ko;
    xo = 1;
    var t2 = C(), e2 = F(), n2 = Object.getOwnPropertyDescriptor;
    return ko = function(i2) {
      if (!e2) return t2[i2];
      var r2 = n2(t2, i2);
      return r2 && r2.value;
    };
  }
  function ns() {
    if (Co) return Ao;
    Co = 1;
    var t2 = function() {
      this.head = null, this.tail = null;
    };
    return t2.prototype = { add: function(t3) {
      var e2 = { item: t3, next: null }, n2 = this.tail;
      n2 ? n2.next = e2 : this.head = e2, this.tail = e2;
    }, get: function() {
      var t3 = this.head;
      if (t3) return null === (this.head = t3.next) && (this.tail = null), t3.item;
    } }, Ao = t2;
  }
  function is() {
    if (No) return To;
    No = 1;
    var t2, e2, n2, i2, r2, o2 = C(), s2 = es(), a2 = Ai(), c2 = ts().set, u2 = ns(), l2 = Qo(), h2 = (function() {
      if (Io) return Eo;
      Io = 1;
      var t3 = Ht();
      return Eo = /ipad|iphone|ipod/i.test(t3) && "undefined" != typeof Pebble;
    })(), f2 = (function() {
      if (Po) return Lo;
      Po = 1;
      var t3 = Ht();
      return Lo = /web0s(?!.*chrome)/i.test(t3);
    })(), d2 = zo(), p2 = o2.MutationObserver || o2.WebKitMutationObserver, v2 = o2.document, m2 = o2.process, _2 = o2.Promise, b2 = s2("queueMicrotask");
    if (!b2) {
      var g2 = new u2(), y2 = function() {
        var e3, n3;
        for (d2 && (e3 = m2.domain) && e3.exit(); n3 = g2.get(); ) try {
          n3();
        } catch (e4) {
          throw g2.head && t2(), e4;
        }
        e3 && e3.enter();
      };
      l2 || d2 || f2 || !p2 || !v2 ? !h2 && _2 && _2.resolve ? ((i2 = _2.resolve(void 0)).constructor = _2, r2 = a2(i2.then, i2), t2 = function() {
        r2(y2);
      }) : d2 ? t2 = function() {
        m2.nextTick(y2);
      } : (c2 = a2(c2, o2), t2 = function() {
        c2(y2);
      }) : (e2 = true, n2 = v2.createTextNode(""), new p2(y2).observe(n2, { characterData: true }), t2 = function() {
        n2.data = e2 = !e2;
      }), b2 = function(e3) {
        g2.head || t2(), g2.add(e3);
      };
    }
    return To = b2;
  }
  function rs() {
    return Mo || (Mo = 1, jo = function(t2, e2) {
      try {
        1 === arguments.length ? console.error(t2) : console.error(t2, e2);
      } catch (t3) {
      }
    }), jo;
  }
  function os() {
    return Ro ? Do : (Ro = 1, Do = function(t2) {
      try {
        return { error: false, value: t2() };
      } catch (t3) {
        return { error: true, value: t3 };
      }
    });
  }
  function ss() {
    if (Uo) return Fo;
    Uo = 1;
    var t2 = C();
    return Fo = t2.Promise;
  }
  function as() {
    if (Ho) return Bo;
    Ho = 1;
    var t2 = C(), e2 = ss(), n2 = Rt(), i2 = Oi(), r2 = ln(), o2 = Ee(), s2 = Go(), a2 = we(), c2 = Vt(), u2 = e2 && e2.prototype, l2 = o2("species"), h2 = false, f2 = n2(t2.PromiseRejectionEvent), d2 = i2("Promise", function() {
      var t3 = r2(e2), n3 = t3 !== String(e2);
      if (!n3 && 66 === c2) return true;
      if (a2 && (!u2.catch || !u2.finally)) return true;
      if (!c2 || c2 < 51 || !/native code/.test(t3)) {
        var i3 = new e2(function(t4) {
          t4(1);
        }), o3 = function(t4) {
          t4(function() {
          }, function() {
          });
        };
        if ((i3.constructor = {})[l2] = o3, !(h2 = i3.then(function() {
        }) instanceof o3)) return true;
      }
      return !(n3 || "BROWSER" !== s2 && "DENO" !== s2 || f2);
    });
    return Bo = { CONSTRUCTOR: d2, REJECTION_EVENT: f2, SUBCLASSING: h2 };
  }
  var cs, us, ls = {};
  function hs() {
    if (cs) return ls;
    cs = 1;
    var t2 = qt(), e2 = TypeError, n2 = function(n3) {
      var i2, r2;
      this.promise = new n3(function(t3, n4) {
        if (void 0 !== i2 || void 0 !== r2) throw new e2("Bad Promise constructor");
        i2 = t3, r2 = n4;
      }), this.resolve = t2(i2), this.reject = t2(r2);
    };
    return ls.f = function(t3) {
      return new n2(t3);
    }, ls;
  }
  var fs, ds, ps, vs, ms, _s, bs, gs, ys, ws, Ss, Os, ks, xs, As, Cs = {};
  function Es() {
    if (ds) return fs;
    ds = 1;
    var t2 = Ee(), e2 = kr(), n2 = t2("iterator"), i2 = Array.prototype;
    return fs = function(t3) {
      return void 0 !== t3 && (e2.Array === t3 || i2[n2] === t3);
    };
  }
  function Is() {
    if (vs) return ps;
    vs = 1;
    var t2 = Ii(), e2 = Jt(), n2 = jt(), i2 = kr(), r2 = Ee()("iterator");
    return ps = function(o2) {
      if (!n2(o2)) return e2(o2, r2) || e2(o2, "@@iterator") || i2[t2(o2)];
    };
  }
  function Ls() {
    if (_s) return ms;
    _s = 1;
    var t2 = B(), e2 = qt(), n2 = Ge(), i2 = Kt(), r2 = Is(), o2 = TypeError;
    return ms = function(s2, a2) {
      var c2 = arguments.length < 2 ? r2(s2) : a2;
      if (e2(c2)) return n2(t2(c2, s2));
      throw new o2(i2(s2) + " is not iterable");
    }, ms;
  }
  function Ps() {
    if (gs) return bs;
    gs = 1;
    var t2 = B(), e2 = Ge(), n2 = Jt();
    return bs = function(i2, r2, o2) {
      var s2, a2;
      e2(i2);
      try {
        if (!(s2 = n2(i2, "return"))) {
          if ("throw" === r2) throw o2;
          return o2;
        }
        s2 = t2(s2, i2);
      } catch (t3) {
        a2 = true, s2 = t3;
      }
      if ("throw" === r2) throw o2;
      if (a2) throw s2;
      return e2(s2), o2;
    };
  }
  function Ts() {
    if (ws) return ys;
    ws = 1;
    var t2 = Ai(), e2 = B(), n2 = Ge(), i2 = Kt(), r2 = Es(), o2 = Fn(), s2 = Bt(), a2 = Ls(), c2 = Is(), u2 = Ps(), l2 = TypeError, h2 = function(t3, e3) {
      this.stopped = t3, this.result = e3;
    }, f2 = h2.prototype;
    return ys = function(d2, p2, v2) {
      var m2, _2, b2, g2, y2, w2, S2, O2 = v2 && v2.that, k2 = !(!v2 || !v2.AS_ENTRIES), x2 = !(!v2 || !v2.IS_RECORD), A2 = !(!v2 || !v2.IS_ITERATOR), C2 = !(!v2 || !v2.INTERRUPTED), E2 = t2(p2, O2), I2 = function(t3) {
        return m2 && u2(m2, "normal"), new h2(true, t3);
      }, L2 = function(t3) {
        return k2 ? (n2(t3), C2 ? E2(t3[0], t3[1], I2) : E2(t3[0], t3[1])) : C2 ? E2(t3, I2) : E2(t3);
      };
      if (x2) m2 = d2.iterator;
      else if (A2) m2 = d2;
      else {
        if (!(_2 = c2(d2))) throw new l2(i2(d2) + " is not iterable");
        if (r2(_2)) {
          for (b2 = 0, g2 = o2(d2); g2 > b2; b2++) if ((y2 = L2(d2[b2])) && s2(f2, y2)) return y2;
          return new h2(false);
        }
        m2 = a2(d2, _2);
      }
      for (w2 = x2 ? d2.next : m2.next; !(S2 = e2(w2, m2)).done; ) {
        try {
          y2 = L2(S2.value);
        } catch (t3) {
          u2(m2, "throw", t3);
        }
        if ("object" == typeof y2 && y2 && s2(f2, y2)) return y2;
      }
      return new h2(false);
    };
  }
  function Ns() {
    if (Os) return Ss;
    Os = 1;
    var t2 = Ee()("iterator"), e2 = false;
    try {
      var n2 = 0, i2 = { next: function() {
        return { done: !!n2++ };
      }, return: function() {
        e2 = true;
      } };
      i2[t2] = function() {
        return this;
      }, Array.from(i2, function() {
        throw 2;
      });
    } catch (t3) {
    }
    return Ss = function(n3, i3) {
      try {
        if (!i3 && !e2) return false;
      } catch (t3) {
        return false;
      }
      var r2 = false;
      try {
        var o2 = {};
        o2[t2] = function() {
          return { next: function() {
            return { done: r2 = true };
          } };
        }, n3(o2);
      } catch (t3) {
      }
      return r2;
    };
  }
  function js() {
    if (xs) return ks;
    xs = 1;
    var t2 = ss(), e2 = Ns(), n2 = as().CONSTRUCTOR;
    return ks = n2 || !e2(function(e3) {
      t2.all(e3).then(void 0, function() {
      });
    });
  }
  var Ms, Ds = {};
  var Rs, Fs = {};
  var Us, Bs = {};
  var Hs, Vs, Gs, zs, Ws = {};
  function Ks() {
    if (Vs) return Hs;
    Vs = 1;
    var t2 = Ge(), e2 = Ft(), n2 = hs();
    return Hs = function(i2, r2) {
      if (t2(i2), e2(r2) && r2.constructor === i2) return r2;
      var o2 = n2.f(i2);
      return (0, o2.resolve)(r2), o2.promise;
    };
  }
  zs || (zs = 1, (function() {
    if (us) return Vo;
    us = 1;
    var t2, e2, n2, i2, r2 = ki(), o2 = we(), s2 = zo(), a2 = C(), c2 = Wo(), u2 = B(), l2 = mn(), h2 = Pr(), f2 = Cr(), d2 = Ko(), p2 = qt(), v2 = Rt(), m2 = Ft(), _2 = qo(), b2 = Zo(), g2 = ts().set, y2 = is(), w2 = rs(), S2 = os(), O2 = ns(), k2 = pn(), x2 = ss(), A2 = as(), E2 = hs(), I2 = "Promise", L2 = A2.CONSTRUCTOR, P2 = A2.REJECTION_EVENT, T2 = A2.SUBCLASSING, N2 = k2.getterFor(I2), j2 = k2.set, M2 = x2 && x2.prototype, D2 = x2, R2 = M2, F2 = a2.TypeError, U2 = a2.document, H2 = a2.process, V2 = E2.f, G2 = V2, z2 = !!(U2 && U2.createEvent && a2.dispatchEvent), W2 = "unhandledrejection", K2 = function(t3) {
      var e3;
      return !(!m2(t3) || !v2(e3 = t3.then)) && e3;
    }, q2 = function(t3, e3) {
      var n3, i3, r3, o3 = e3.value, s3 = 1 === e3.state, a3 = s3 ? t3.ok : t3.fail, c3 = t3.resolve, l3 = t3.reject, h3 = t3.domain;
      try {
        a3 ? (s3 || (2 === e3.rejection && X2(e3), e3.rejection = 1), true === a3 ? n3 = o3 : (h3 && h3.enter(), n3 = a3(o3), h3 && (h3.exit(), r3 = true)), n3 === t3.promise ? l3(new F2("Promise-chain cycle")) : (i3 = K2(n3)) ? u2(i3, n3, c3, l3) : c3(n3)) : l3(o3);
      } catch (t4) {
        h3 && !r3 && h3.exit(), l3(t4);
      }
    }, J2 = function(t3, e3) {
      t3.notified || (t3.notified = true, y2(function() {
        for (var n3, i3 = t3.reactions; n3 = i3.get(); ) q2(n3, t3);
        t3.notified = false, e3 && !t3.rejection && Y2(t3);
      }));
    }, Z2 = function(t3, e3, n3) {
      var i3, r3;
      z2 ? ((i3 = U2.createEvent("Event")).promise = e3, i3.reason = n3, i3.initEvent(t3, false, true), a2.dispatchEvent(i3)) : i3 = { promise: e3, reason: n3 }, !P2 && (r3 = a2["on" + t3]) ? r3(i3) : t3 === W2 && w2("Unhandled promise rejection", n3);
    }, Y2 = function(t3) {
      u2(g2, a2, function() {
        var e3, n3 = t3.facade, i3 = t3.value;
        if ($2(t3) && (e3 = S2(function() {
          s2 ? H2.emit("unhandledRejection", i3, n3) : Z2(W2, n3, i3);
        }), t3.rejection = s2 || $2(t3) ? 2 : 1, e3.error)) throw e3.value;
      });
    }, $2 = function(t3) {
      return 1 !== t3.rejection && !t3.parent;
    }, X2 = function(t3) {
      u2(g2, a2, function() {
        var e3 = t3.facade;
        s2 ? H2.emit("rejectionHandled", e3) : Z2("rejectionhandled", e3, t3.value);
      });
    }, Q2 = function(t3, e3, n3) {
      return function(i3) {
        t3(e3, i3, n3);
      };
    }, tt2 = function(t3, e3, n3) {
      t3.done || (t3.done = true, n3 && (t3 = n3), t3.value = e3, t3.state = 2, J2(t3, true));
    }, et2 = function(t3, e3, n3) {
      if (!t3.done) {
        t3.done = true, n3 && (t3 = n3);
        try {
          if (t3.facade === e3) throw new F2("Promise can't be resolved itself");
          var i3 = K2(e3);
          i3 ? y2(function() {
            var n4 = { done: false };
            try {
              u2(i3, e3, Q2(et2, n4, t3), Q2(tt2, n4, t3));
            } catch (e4) {
              tt2(n4, e4, t3);
            }
          }) : (t3.value = e3, t3.state = 1, J2(t3, false));
        } catch (e4) {
          tt2({ done: false }, e4, t3);
        }
      }
    };
    if (L2 && (R2 = (D2 = function(e3) {
      _2(this, R2), p2(e3), u2(t2, this);
      var n3 = N2(this);
      try {
        e3(Q2(et2, n3), Q2(tt2, n3));
      } catch (t3) {
        tt2(n3, t3);
      }
    }).prototype, (t2 = function(t3) {
      j2(this, { type: I2, done: false, notified: false, parent: false, reactions: new O2(), rejection: false, state: 0, value: null });
    }).prototype = l2(R2, "then", function(t3, e3) {
      var n3 = N2(this), i3 = V2(b2(this, D2));
      return n3.parent = true, i3.ok = !v2(t3) || t3, i3.fail = v2(e3) && e3, i3.domain = s2 ? H2.domain : void 0, 0 === n3.state ? n3.reactions.add(i3) : y2(function() {
        q2(i3, n3);
      }), i3.promise;
    }), e2 = function() {
      var e3 = new t2(), n3 = N2(e3);
      this.promise = e3, this.resolve = Q2(et2, n3), this.reject = Q2(tt2, n3);
    }, E2.f = V2 = function(t3) {
      return t3 === D2 || t3 === n2 ? new e2(t3) : G2(t3);
    }, !o2 && v2(x2) && M2 !== Object.prototype)) {
      i2 = M2.then, T2 || l2(M2, "then", function(t3, e3) {
        var n3 = this;
        return new D2(function(t4, e4) {
          u2(i2, n3, t4, e4);
        }).then(t3, e3);
      }, { unsafe: true });
      try {
        delete M2.constructor;
      } catch (t3) {
      }
      h2 && h2(M2, R2);
    }
    r2({ global: true, constructor: true, wrap: true, forced: L2 }, { Promise: D2 }), n2 = c2.Promise, f2(D2, I2, false, true), d2(I2);
  })(), (function() {
    if (As) return Cs;
    As = 1;
    var t2 = ki(), e2 = B(), n2 = qt(), i2 = hs(), r2 = os(), o2 = Ts();
    t2({ target: "Promise", stat: true, forced: js() }, { all: function(t3) {
      var s2 = this, a2 = i2.f(s2), c2 = a2.resolve, u2 = a2.reject, l2 = r2(function() {
        var i3 = n2(s2.resolve), r3 = [], a3 = 0, l3 = 1;
        o2(t3, function(t4) {
          var n3 = a3++, o3 = false;
          l3++, e2(i3, s2, t4).then(function(t5) {
            o3 || (o3 = true, r3[n3] = t5, --l3 || c2(r3));
          }, u2);
        }), --l3 || c2(r3);
      });
      return l2.error && u2(l2.value), a2.promise;
    } });
  })(), (function() {
    if (Ms) return Ds;
    Ms = 1;
    var t2 = ki(), e2 = we(), n2 = as().CONSTRUCTOR, i2 = ss(), r2 = Ut(), o2 = Rt(), s2 = mn(), a2 = i2 && i2.prototype;
    if (t2({ target: "Promise", proto: true, forced: n2, real: true }, { catch: function(t3) {
      return this.then(void 0, t3);
    } }), !e2 && o2(i2)) {
      var c2 = r2("Promise").prototype.catch;
      a2.catch !== c2 && s2(a2, "catch", c2, { unsafe: true });
    }
  })(), (function() {
    if (Rs) return Fs;
    Rs = 1;
    var t2 = ki(), e2 = B(), n2 = qt(), i2 = hs(), r2 = os(), o2 = Ts();
    t2({ target: "Promise", stat: true, forced: js() }, { race: function(t3) {
      var s2 = this, a2 = i2.f(s2), c2 = a2.reject, u2 = r2(function() {
        var i3 = n2(s2.resolve);
        o2(t3, function(t4) {
          e2(i3, s2, t4).then(a2.resolve, c2);
        });
      });
      return u2.error && c2(u2.value), a2.promise;
    } });
  })(), (function() {
    if (Us) return Bs;
    Us = 1;
    var t2 = ki(), e2 = hs();
    t2({ target: "Promise", stat: true, forced: as().CONSTRUCTOR }, { reject: function(t3) {
      var n2 = e2.f(this);
      return (0, n2.reject)(t3), n2.promise;
    } });
  })(), (function() {
    if (Gs) return Ws;
    Gs = 1;
    var t2 = ki(), e2 = Ut(), n2 = we(), i2 = ss(), r2 = as().CONSTRUCTOR, o2 = Ks(), s2 = e2("Promise"), a2 = n2 && !r2;
    t2({ target: "Promise", stat: true, forced: n2 || r2 }, { resolve: function(t3) {
      return o2(a2 && this === s2 ? i2 : this, t3);
    } });
  })());
  var qs, Js = {};
  !(function() {
    if (qs) return Js;
    qs = 1;
    var t2 = ki(), e2 = we(), n2 = ss(), i2 = R(), r2 = Ut(), o2 = Rt(), s2 = Zo(), a2 = Ks(), c2 = mn(), u2 = n2 && n2.prototype;
    if (t2({ target: "Promise", proto: true, real: true, forced: !!n2 && i2(function() {
      u2.finally.call({ then: function() {
      } }, function() {
      });
    }) }, { finally: function(t3) {
      var e3 = s2(this, r2("Promise")), n3 = o2(t3);
      return this.then(n3 ? function(n4) {
        return a2(e3, t3()).then(function() {
          return n4;
        });
      } : t3, n3 ? function(n4) {
        return a2(e3, t3()).then(function() {
          throw n4;
        });
      } : t3);
    } }), !e2 && o2(n2)) {
      var l2 = r2("Promise").prototype.finally;
      u2.finally !== l2 && c2(u2, "finally", l2, { unsafe: true });
    }
  })();
  var Zs, Ys, $s, Xs, Qs, ta, ea, na, ia, ra, oa, sa, aa, ca = {};
  function ua() {
    if (Ys) return Zs;
    Ys = 1;
    var t2 = Ii(), e2 = String;
    return Zs = function(n2) {
      if ("Symbol" === t2(n2)) throw new TypeError("Cannot convert a Symbol value to a string");
      return e2(n2);
    };
  }
  function la() {
    if (Xs) return $s;
    Xs = 1;
    var t2 = Ge();
    return $s = function() {
      var e2 = t2(this), n2 = "";
      return e2.hasIndices && (n2 += "d"), e2.global && (n2 += "g"), e2.ignoreCase && (n2 += "i"), e2.multiline && (n2 += "m"), e2.dotAll && (n2 += "s"), e2.unicode && (n2 += "u"), e2.unicodeSets && (n2 += "v"), e2.sticky && (n2 += "y"), n2;
    };
  }
  function ha() {
    if (ta) return Qs;
    ta = 1;
    var t2 = R(), e2 = C().RegExp, n2 = t2(function() {
      var t3 = e2("a", "y");
      return t3.lastIndex = 2, null !== t3.exec("abcd");
    }), i2 = n2 || t2(function() {
      return !e2("a", "y").sticky;
    }), r2 = n2 || t2(function() {
      var t3 = e2("^r", "gy");
      return t3.lastIndex = 2, null !== t3.exec("str");
    });
    return Qs = { BROKEN_CARET: r2, MISSED_STICKY: i2, UNSUPPORTED_Y: n2 };
  }
  function fa() {
    if (na) return ea;
    na = 1;
    var t2 = R(), e2 = C().RegExp;
    return ea = t2(function() {
      var t3 = e2(".", "s");
      return !(t3.dotAll && t3.test("\n") && "s" === t3.flags);
    });
  }
  function da() {
    if (ra) return ia;
    ra = 1;
    var t2 = R(), e2 = C().RegExp;
    return ia = t2(function() {
      var t3 = e2("(?<a>b)", "g");
      return "b" !== t3.exec("b").groups.a || "bc" !== "b".replace(t3, "$<a>c");
    });
  }
  function pa() {
    if (sa) return oa;
    sa = 1;
    var t2, e2, n2 = B(), i2 = Pt(), r2 = ua(), o2 = la(), s2 = ha(), a2 = ke(), c2 = Sr(), u2 = pn().get, l2 = fa(), h2 = da(), f2 = a2("native-string-replace", String.prototype.replace), d2 = RegExp.prototype.exec, p2 = d2, v2 = i2("".charAt), m2 = i2("".indexOf), _2 = i2("".replace), b2 = i2("".slice), g2 = (e2 = /b*/g, n2(d2, t2 = /a/, "a"), n2(d2, e2, "a"), 0 !== t2.lastIndex || 0 !== e2.lastIndex), y2 = s2.BROKEN_CARET, w2 = void 0 !== /()??/.exec("")[1];
    return (g2 || w2 || y2 || l2 || h2) && (p2 = function(t3) {
      var e3, i3, s3, a3, l3, h3, S2, O2 = this, k2 = u2(O2), x2 = r2(t3), A2 = k2.raw;
      if (A2) return A2.lastIndex = O2.lastIndex, e3 = n2(p2, A2, x2), O2.lastIndex = A2.lastIndex, e3;
      var C2 = k2.groups, E2 = y2 && O2.sticky, I2 = n2(o2, O2), L2 = O2.source, P2 = 0, T2 = x2;
      if (E2 && (I2 = _2(I2, "y", ""), -1 === m2(I2, "g") && (I2 += "g"), T2 = b2(x2, O2.lastIndex), O2.lastIndex > 0 && (!O2.multiline || O2.multiline && "\n" !== v2(x2, O2.lastIndex - 1)) && (L2 = "(?: " + L2 + ")", T2 = " " + T2, P2++), i3 = new RegExp("^(?:" + L2 + ")", I2)), w2 && (i3 = new RegExp("^" + L2 + "$(?!\\s)", I2)), g2 && (s3 = O2.lastIndex), a3 = n2(d2, E2 ? i3 : O2, T2), E2 ? a3 ? (a3.input = b2(a3.input, P2), a3[0] = b2(a3[0], P2), a3.index = O2.lastIndex, O2.lastIndex += a3[0].length) : O2.lastIndex = 0 : g2 && a3 && (O2.lastIndex = O2.global ? a3.index + a3[0].length : s3), w2 && a3 && a3.length > 1 && n2(f2, a3[0], i3, function() {
        for (l3 = 1; l3 < arguments.length - 2; l3++) void 0 === arguments[l3] && (a3[l3] = void 0);
      }), a3 && C2) for (a3.groups = h3 = c2(null), l3 = 0; l3 < C2.length; l3++) h3[(S2 = C2[l3])[0]] = a3[S2[1]];
      return a3;
    }), oa = p2;
  }
  function va() {
    if (aa) return ca;
    aa = 1;
    var t2 = ki(), e2 = pa();
    return t2({ target: "RegExp", proto: true, forced: /./.exec !== e2 }, { exec: e2 }), ca;
  }
  va();
  var ma, _a, ba, ga = {};
  function ya() {
    if (_a) return ma;
    _a = 1;
    var t2 = Pt(), e2 = Mn(), n2 = ua(), i2 = Mt(), r2 = t2("".charAt), o2 = t2("".charCodeAt), s2 = t2("".slice), a2 = function(t3) {
      return function(a3, c2) {
        var u2, l2, h2 = n2(i2(a3)), f2 = e2(c2), d2 = h2.length;
        return f2 < 0 || f2 >= d2 ? t3 ? "" : void 0 : (u2 = o2(h2, f2)) < 55296 || u2 > 56319 || f2 + 1 === d2 || (l2 = o2(h2, f2 + 1)) < 56320 || l2 > 57343 ? t3 ? r2(h2, f2) : u2 : t3 ? s2(h2, f2, f2 + 2) : l2 - 56320 + (u2 - 55296 << 10) + 65536;
      };
    };
    return ma = { codeAt: a2(false), charAt: a2(true) };
  }
  function wa() {
    if (ba) return ga;
    ba = 1;
    var t2 = ya().charAt, e2 = ua(), n2 = pn(), i2 = Tr(), r2 = Nr(), o2 = "String Iterator", s2 = n2.set, a2 = n2.getterFor(o2);
    return i2(String, "String", function(t3) {
      s2(this, { type: o2, string: e2(t3), index: 0 });
    }, function() {
      var e3, n3 = a2(this), i3 = n3.string, o3 = n3.index;
      return o3 >= i3.length ? r2(void 0, true) : (e3 = t2(i3, o3), n3.index += e3.length, r2(e3, false));
    }), ga;
  }
  wa();
  var Sa, Oa, ka, xa, Aa, Ca, Ea, Ia, La, Pa, Ta, Na, ja, Ma = {};
  function Da() {
    if (Oa) return Sa;
    Oa = 1, va();
    var t2 = B(), e2 = mn(), n2 = pa(), i2 = R(), r2 = Ee(), o2 = We(), s2 = r2("species"), a2 = RegExp.prototype;
    return Sa = function(c2, u2, l2, h2) {
      var f2 = r2(c2), d2 = !i2(function() {
        var t3 = {};
        return t3[f2] = function() {
          return 7;
        }, 7 !== ""[c2](t3);
      }), p2 = d2 && !i2(function() {
        var t3 = false, e3 = /a/;
        if ("split" === c2) {
          var n3 = {};
          n3[s2] = function() {
            return e3;
          }, (e3 = { constructor: n3, flags: "" })[f2] = /./[f2];
        }
        return e3.exec = function() {
          return t3 = true, null;
        }, e3[f2](""), !t3;
      });
      if (!d2 || !p2 || l2) {
        var v2 = /./[f2], m2 = u2(f2, ""[c2], function(e3, i3, r3, o3, s3) {
          var c3 = i3.exec;
          return c3 === n2 || c3 === a2.exec ? d2 && !s3 ? { done: true, value: t2(v2, i3, r3, o3) } : { done: true, value: t2(e3, r3, i3, o3) } : { done: false };
        });
        e2(String.prototype, c2, m2[0]), e2(a2, f2, m2[1]);
      }
      h2 && o2(a2[f2], "sham", true);
    };
  }
  function Ra() {
    if (xa) return ka;
    xa = 1;
    var t2 = ya().charAt;
    return ka = function(e2, n2, i2) {
      return n2 + (i2 ? t2(e2, n2).length : 1);
    };
  }
  function Fa() {
    if (Ca) return Aa;
    Ca = 1;
    var t2 = Pt(), e2 = xe(), n2 = Math.floor, i2 = t2("".charAt), r2 = t2("".replace), o2 = t2("".slice), s2 = /\$([$&'`]|\d{1,2}|<[^>]*>)/g, a2 = /\$([$&'`]|\d{1,2})/g;
    return Aa = function(t3, c2, u2, l2, h2, f2) {
      var d2 = u2 + t3.length, p2 = l2.length, v2 = a2;
      return void 0 !== h2 && (h2 = e2(h2), v2 = s2), r2(f2, v2, function(e3, r3) {
        var s3;
        switch (i2(r3, 0)) {
          case "$":
            return "$";
          case "&":
            return t3;
          case "`":
            return o2(c2, 0, u2);
          case "'":
            return o2(c2, d2);
          case "<":
            s3 = h2[o2(r3, 1, -1)];
            break;
          default:
            var a3 = +r3;
            if (0 === a3) return e3;
            if (a3 > p2) {
              var f3 = n2(a3 / 10);
              return 0 === f3 ? e3 : f3 <= p2 ? void 0 === l2[f3 - 1] ? i2(r3, 1) : l2[f3 - 1] + i2(r3, 1) : e3;
            }
            s3 = l2[a3 - 1];
        }
        return void 0 === s3 ? "" : s3;
      });
    };
  }
  function Ua() {
    if (Pa) return La;
    Pa = 1;
    var t2 = B(), e2 = Ae(), n2 = Bt(), i2 = (function() {
      if (Ia) return Ea;
      Ia = 1;
      var t3 = C(), e3 = R(), n3 = t3.RegExp, i3 = !e3(function() {
        var t4 = true;
        try {
          n3(".", "d");
        } catch (e5) {
          t4 = false;
        }
        var e4 = {}, i4 = "", r3 = t4 ? "dgimsy" : "gimsy", o3 = function(t5, n4) {
          Object.defineProperty(e4, t5, { get: function() {
            return i4 += n4, true;
          } });
        }, s2 = { dotAll: "s", global: "g", ignoreCase: "i", multiline: "m", sticky: "y" };
        for (var a2 in t4 && (s2.hasIndices = "d"), s2) o3(a2, s2[a2]);
        return Object.getOwnPropertyDescriptor(n3.prototype, "flags").get.call(e4) !== r3 || i4 !== r3;
      });
      return Ea = { correct: i3 };
    })(), r2 = la(), o2 = RegExp.prototype;
    return La = i2.correct ? function(t3) {
      return t3.flags;
    } : function(s2) {
      return i2.correct || !n2(o2, s2) || e2(s2, "flags") ? s2.flags : t2(r2, s2);
    };
  }
  function Ba() {
    if (Na) return Ta;
    Na = 1;
    var t2 = B(), e2 = Ge(), n2 = Rt(), i2 = Tt(), r2 = pa(), o2 = TypeError;
    return Ta = function(s2, a2) {
      var c2 = s2.exec;
      if (n2(c2)) {
        var u2 = t2(c2, s2, a2);
        return null !== u2 && e2(u2), u2;
      }
      if ("RegExp" === i2(s2)) return t2(r2, s2, a2);
      throw new o2("RegExp#exec called on incompatible receiver");
    };
  }
  !(function() {
    if (ja) return Ma;
    ja = 1;
    var t2 = Yo(), e2 = B(), n2 = Pt(), i2 = Da(), r2 = R(), o2 = Ge(), s2 = Rt(), a2 = Ft(), c2 = Mn(), u2 = Rn(), l2 = ua(), h2 = Mt(), f2 = Ra(), d2 = Jt(), p2 = Fa(), v2 = Ua(), m2 = Ba(), _2 = Ee()("replace"), b2 = Math.max, g2 = Math.min, y2 = n2([].concat), w2 = n2([].push), S2 = n2("".indexOf), O2 = n2("".slice), k2 = function(t3) {
      return void 0 === t3 ? t3 : String(t3);
    }, x2 = "$0" === "a".replace(/./, "$0"), A2 = !!/./[_2] && "" === /./[_2]("a", "$0");
    i2("replace", function(n3, i3, r3) {
      var x3 = A2 ? "$" : "$0";
      return [function(t3, n4) {
        var r4 = h2(this), o3 = a2(t3) ? d2(t3, _2) : void 0;
        return o3 ? e2(o3, t3, r4, n4) : e2(i3, l2(r4), t3, n4);
      }, function(e3, n4) {
        var a3 = o2(this), h3 = l2(e3);
        if ("string" == typeof n4 && -1 === S2(n4, x3) && -1 === S2(n4, "$<")) {
          var d3 = r3(i3, a3, h3, n4);
          if (d3.done) return d3.value;
        }
        var _3 = s2(n4);
        _3 || (n4 = l2(n4));
        var A3, C2 = l2(v2(a3)), E2 = -1 !== S2(C2, "g");
        E2 && (A3 = -1 !== S2(C2, "u"), a3.lastIndex = 0);
        for (var I2, L2 = []; null !== (I2 = m2(a3, h3)) && (w2(L2, I2), E2); ) {
          "" === l2(I2[0]) && (a3.lastIndex = f2(h3, u2(a3.lastIndex), A3));
        }
        for (var P2 = "", T2 = 0, N2 = 0; N2 < L2.length; N2++) {
          for (var j2, M2 = l2((I2 = L2[N2])[0]), D2 = b2(g2(c2(I2.index), h3.length), 0), R2 = [], F2 = 1; F2 < I2.length; F2++) w2(R2, k2(I2[F2]));
          var U2 = I2.groups;
          if (_3) {
            var B2 = y2([M2], R2, D2, h3);
            void 0 !== U2 && w2(B2, U2), j2 = l2(t2(n4, void 0, B2));
          } else j2 = p2(M2, h3, D2, R2, U2, n4);
          D2 >= T2 && (P2 += O2(h3, T2, D2) + j2, T2 = D2 + M2.length);
        }
        return P2 + O2(h3, T2);
      }];
    }, !!r2(function() {
      var t3 = /./;
      return t3.exec = function() {
        var t4 = [];
        return t4.groups = { a: "7" }, t4;
      }, "7" !== "".replace(t3, "$<a>");
    }) || !x2 || A2);
  })();
  var Ha, Va, Ga, za, Wa, Ka, qa, Ja = {};
  function Za() {
    return Va ? Ha : (Va = 1, Ha = "	\n\v\f\r                　\u2028\u2029\uFEFF");
  }
  function Ya() {
    if (za) return Ga;
    za = 1;
    var t2 = Pt(), e2 = Mt(), n2 = ua(), i2 = Za(), r2 = t2("".replace), o2 = RegExp("^[" + i2 + "]+"), s2 = RegExp("(^|[^" + i2 + "])[" + i2 + "]+$"), a2 = function(t3) {
      return function(i3) {
        var a3 = n2(e2(i3));
        return 1 & t3 && (a3 = r2(a3, o2, "")), 2 & t3 && (a3 = r2(a3, s2, "$1")), a3;
      };
    };
    return Ga = { start: a2(1), end: a2(2), trim: a2(3) };
  }
  !(function() {
    if (qa) return Ja;
    qa = 1;
    var t2 = ki(), e2 = Ya().trim, n2 = (function() {
      if (Ka) return Wa;
      Ka = 1;
      var t3 = un().PROPER, e3 = R(), n3 = Za();
      return Wa = function(i2) {
        return e3(function() {
          return !!n3[i2]() || "​᠎" !== "​᠎"[i2]() || t3 && n3[i2].name !== i2;
        });
      };
    })();
    t2({ target: "String", proto: true, forced: n2("trim") }, { trim: function() {
      return e2(this);
    } });
  })();
  var $a, Xa, Qa, tc, ec, nc, ic, rc, oc, sc, ac, cc, uc, lc = {}, hc = {};
  function fc() {
    if (Xa) return $a;
    Xa = 1;
    var t2 = Ft(), e2 = We();
    return $a = function(n2, i2) {
      t2(i2) && "cause" in i2 && e2(n2, "cause", i2.cause);
    };
  }
  function dc() {
    if (rc) return ic;
    rc = 1;
    var t2 = We(), e2 = (function() {
      if (tc) return Qa;
      tc = 1;
      var t3 = Pt(), e3 = Error, n3 = t3("".replace), i3 = String(new e3("zxcasd").stack), r2 = /\n\s*at [^:]*:[^\n]*/, o2 = r2.test(i3);
      return Qa = function(t4, i4) {
        if (o2 && "string" == typeof t4 && !e3.prepareStackTrace) for (; i4--; ) t4 = n3(t4, r2, "");
        return t4;
      };
    })(), n2 = (function() {
      if (nc) return ec;
      nc = 1;
      var t3 = R(), e3 = Lt();
      return ec = !t3(function() {
        var t4 = new Error("a");
        return !("stack" in t4) || (Object.defineProperty(t4, "stack", e3(1, 7)), 7 !== t4.stack);
      });
    })(), i2 = Error.captureStackTrace;
    return ic = function(r2, o2, s2, a2) {
      n2 && (i2 ? i2(r2, o2) : t2(r2, "stack", e2(s2, a2)));
    };
  }
  function pc() {
    if (sc) return oc;
    sc = 1;
    var t2 = ua();
    return oc = function(e2, n2) {
      return void 0 === e2 ? arguments.length < 2 ? "" : n2 : t2(e2);
    }, oc;
  }
  function vc() {
    return cc || (cc = 1, (function() {
      if (ac) return hc;
      ac = 1;
      var t2 = ki(), e2 = Bt(), n2 = xr(), i2 = Pr(), r2 = Si(), o2 = Sr(), s2 = We(), a2 = Lt(), c2 = fc(), u2 = dc(), l2 = Ts(), h2 = pc(), f2 = Ee()("toStringTag"), d2 = Error, p2 = [].push, v2 = function(t3, r3) {
        var a3, _2 = e2(m2, this);
        i2 ? a3 = i2(new d2(), _2 ? n2(this) : m2) : (a3 = _2 ? this : o2(m2), s2(a3, f2, "Error")), void 0 !== r3 && s2(a3, "message", h2(r3)), u2(a3, v2, a3.stack, 1), arguments.length > 2 && c2(a3, arguments[2]);
        var b2 = [];
        return l2(t3, p2, { that: b2 }), s2(a3, "errors", b2), a3;
      };
      i2 ? i2(v2, d2) : r2(v2, d2, { name: true });
      var m2 = v2.prototype = o2(d2.prototype, { constructor: a2(1, v2), message: a2(1, ""), name: a2(1, "AggregateError") });
      t2({ global: true, constructor: true, arity: 2 }, { AggregateError: v2 });
    })()), lc;
  }
  uc || (uc = 1, vc());
  var mc, _c, bc = {};
  _c || (_c = 1, (function() {
    if (mc) return bc;
    mc = 1;
    var t2 = ki(), e2 = B(), n2 = qt(), i2 = hs(), r2 = os(), o2 = Ts();
    t2({ target: "Promise", stat: true, forced: js() }, { allSettled: function(t3) {
      var s2 = this, a2 = i2.f(s2), c2 = a2.resolve, u2 = a2.reject, l2 = r2(function() {
        var i3 = n2(s2.resolve), r3 = [], a3 = 0, u3 = 1;
        o2(t3, function(t4) {
          var n3 = a3++, o3 = false;
          u3++, e2(i3, s2, t4).then(function(t5) {
            o3 || (o3 = true, r3[n3] = { status: "fulfilled", value: t5 }, --u3 || c2(r3));
          }, function(t5) {
            o3 || (o3 = true, r3[n3] = { status: "rejected", reason: t5 }, --u3 || c2(r3));
          });
        }), --u3 || c2(r3);
      });
      return l2.error && u2(l2.value), a2.promise;
    } });
  })());
  var gc, yc, wc = {};
  yc || (yc = 1, (function() {
    if (gc) return wc;
    gc = 1;
    var t2 = ki(), e2 = B(), n2 = qt(), i2 = Ut(), r2 = hs(), o2 = os(), s2 = Ts(), a2 = js(), c2 = "No one promise resolved";
    t2({ target: "Promise", stat: true, forced: a2 }, { any: function(t3) {
      var a3 = this, u2 = i2("AggregateError"), l2 = r2.f(a3), h2 = l2.resolve, f2 = l2.reject, d2 = o2(function() {
        var i3 = n2(a3.resolve), r3 = [], o3 = 0, l3 = 1, d3 = false;
        s2(t3, function(t4) {
          var n3 = o3++, s3 = false;
          l3++, e2(i3, a3, t4).then(function(t5) {
            s3 || d3 || (d3 = true, h2(t5));
          }, function(t5) {
            s3 || d3 || (s3 = true, r3[n3] = t5, --l3 || f2(new u2(r3, c2)));
          });
        }), --l3 || f2(new u2(r3, c2));
      });
      return d2.error && f2(d2.value), l2.promise;
    } });
  })());
  var Sc, Oc, kc, xc, Ac, Cc, Ec, Ic = {};
  function Lc() {
    return Oc ? Sc : (Oc = 1, Sc = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 });
  }
  function Pc() {
    if (xc) return kc;
    xc = 1;
    var t2 = Pe()("span").classList, e2 = t2 && t2.constructor && t2.constructor.prototype;
    return kc = e2 === Object.prototype ? void 0 : e2;
  }
  !(function() {
    if (Ec) return Ic;
    Ec = 1;
    var t2 = C(), e2 = Lc(), n2 = Pc(), i2 = (function() {
      if (Cc) return Ac;
      Cc = 1;
      var t3 = Ni().forEach, e3 = Ur()("forEach");
      return Ac = e3 ? [].forEach : function(e4) {
        return t3(this, e4, arguments.length > 1 ? arguments[1] : void 0);
      }, Ac;
    })(), r2 = We(), o2 = function(t3) {
      if (t3 && t3.forEach !== i2) try {
        r2(t3, "forEach", i2);
      } catch (e3) {
        t3.forEach = i2;
      }
    };
    for (var s2 in e2) e2[s2] && o2(t2[s2] && t2[s2].prototype);
    o2(n2);
  })();
  var Tc, Nc = {};
  !(function() {
    if (Tc) return Nc;
    Tc = 1;
    var t2 = C(), e2 = Lc(), n2 = Pc(), i2 = jr(), r2 = We(), o2 = Cr(), s2 = Ee()("iterator"), a2 = i2.values, c2 = function(t3, n3) {
      if (t3) {
        if (t3[s2] !== a2) try {
          r2(t3, s2, a2);
        } catch (e3) {
          t3[s2] = a2;
        }
        if (o2(t3, n3, true), e2[n3]) {
          for (var c3 in i2) if (t3[c3] !== i2[c3]) try {
            r2(t3, c3, i2[c3]);
          } catch (e3) {
            t3[c3] = i2[c3];
          }
        }
      }
    };
    for (var u2 in e2) c2(t2[u2] && t2[u2].prototype, u2);
    c2(n2, "DOMTokenList");
  })();
  var jc = function(t2) {
    var e2 = "";
    t2["background-toolbar"] && (e2 += ".loader-body,\n.loader-bg { background-color: " + t2["background-toolbar"] + "; }\n", e2 += ".loader-body {     box-shadow: 0 0 99px 99px " + t2["background-toolbar"] + "; }\n"), t2["background-loader"] && (e2 += ".loader-image { color: " + t2["background-loader"] + "; }\n"), t2["background-normal"] && (e2 += ".custom-button-secondary-icon,\n.custom-button-secondary,\n.input-field-element,\n.selectbox-search-input,\n.selectbox-header,\n.selectbox-dropdown,\n.radio-visual, \n.checkbox-visual, \n.message { background-color: " + t2["background-normal"] + "; }\n"), t2["text-inverse"] && (e2 += ".custom-button-primary { color: " + t2["text-inverse"] + "; }\n"), t2["border-regular-control"] && (e2 += ".custom-button-icon-only:active:not(.custom-button-disabled),\n.custom-button-secondary-icon:active:not(.custom-button-disabled),\n.custom-button-secondary:active:not(.custom-button-disabled),\n.custom-button-icon-only:hover:not(.custom-button-disabled),\n.custom-button-secondary-icon:hover:not(.custom-button-disabled),\n.custom-button-secondary:hover:not(.custom-button-disabled),\n.custom-button-secondary,\n.custom-button-secondary-icon,\n.input-field-element,\n.checkbox-visual,\n.radio-visual,\n.selectbox-header,\n.selectbox-dropdown,\n.selectbox-search-input:focus,\n.message { border-color: " + t2["border-regular-control"] + "; }\n", e2 += ".selectbox-search,\n.selectbox-option-divider { border-color: " + t2["border-regular-control"] + " !important; }\n"), t2["border-error"] && (e2 += ".input-field-invalid .input-field-element { border-color: " + t2["border-error"] + "; }\n"), t2["border-control-focus"] && (e2 += ".custom-button-icon-only:focus:not(:active):not(:hover),\n.custom-button-secondary-icon:focus:not(:active):not(:hover),\n.custom-button-secondary:focus:not(:active):not(:hover),\n.input-field-element:focus,\n.input-field-focused .input-field-element,\n.selectbox-header:active,\n.selectbox-header:focus,\n.selectbox-header-open { border-color: " + t2["border-control-focus"] + "; }\n"), t2["highlight-button-hover"] && (e2 += ".custom-button-icon-only:hover:not(.custom-button-disabled),\n.custom-button-secondary-icon:hover:not(.custom-button-disabled),\n.custom-button-secondary:hover:not(.custom-button-disabled),\n.selectbox-custom-option:hover,\n.selectbox-option:hover { background-color: " + t2["highlight-button-hover"] + "; }\n"), t2["highlight-button-pressed"] && (e2 += ".custom-button-icon-only:active:not(.custom-button-disabled),\n.custom-button-secondary-icon:active:not(.custom-button-disabled),\n.custom-button-secondary:active:not(.custom-button-disabled),\n.selectbox-option-selected:hover,\n.selectbox-option-selected { background-color: " + t2["highlight-button-pressed"] + "; }\n", e2 += ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " + t2["highlight-button-pressed"] + "; }\n"), t2["highlight-primary-dialog-button-hover"] && (e2 += ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " + t2["highlight-primary-dialog-button-hover"] + "; border-color: " + t2["highlight-primary-dialog-button-hover"] + "; }\n"), t2["background-primary-dialog-button"] && (e2 += ".checkbox-indeterminate,\n.custom-button-primary { background-color: " + t2["background-primary-dialog-button"] + "; border-color: " + t2["background-primary-dialog-button"] + "; }\n"), t2["background-toolbar-additional"] && (e2 += ".custom-button-secondary-icon:disabled,\n.custom-button-secondary-icon.custom-button-disabled,\n.custom-button-secondary:disabled,\n.custom-button-secondary.custom-button-disabled { background-color: " + t2["background-toolbar-additional"] + "; border-color: " + t2["background-toolbar-additional"] + "; }\n"), t2["text-normal"] && (e2 += ".custom-button-secondary-icon,\n.custom-button-secondary,\n.custom-button-secondary-icon,\n.custom-button-icon-only,\n.selectbox-search-input,\n.loader-image,\n.input-field-element { color: " + t2["text-normal"] + "; }\n", e2 += ".input-field-search-icon svg { fill: " + t2["text-normal"] + "; }\n", e2 += ".selectbox-arrow b { border-color: " + t2["text-normal"] + "; }\n"), t2["text-secondary"] && (e2 += ".message-close:hover,\n.input-field-clear:hover { color: " + t2["text-secondary"] + "; }\n"), t2["text-tertiary"] && (e2 += ".input-field-clear,\n.message-container:hover .message-close,\n.custom-button-secondary-icon:disabled,\n.custom-button-secondary-icon.custom-button-disabled,\n.custom-button-secondary:disabled,\n.custom-button-secondary.custom-button-disabled,\n.input-field-element::placeholder,\n.selectbox-search-input::placeholder { color: " + t2["text-tertiary"] + "; }\n");
    var n2 = "11px";
    -1 !== ["theme-white", "theme-night"].indexOf(t2.name) || -1 !== ["theme-white", "theme-night"].indexOf(t2.Name) ? (n2 = "12px", e2 += ".message,\n.custom-button,\n.selectbox-header,\n.input-field-element { border-radius: 4px; }\n", e2 += ".radio--checked .radio-visual { border-width: 4px; }\n", e2 += ".checkbox-checkmark { color: " + t2["text-inverse"] + "; }\n", e2 += ".checkbox--checked .checkbox-visual { background-color: " + t2["background-primary-dialog-button"] + "; }\n", e2 += ".radio--checked .radio-visual,\n.checkbox--checked .checkbox-visual { border-color: " + t2["background-primary-dialog-button"] + "; }\n", e2 += ".radio-button-container:hover:not(.radio--checked) .radio-visual,\n.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { background-color: " + t2["highlight-button-hover"] + "; }\n", e2 += ".checkbox--checked:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + t2["highlight-primary-dialog-button-hover"] + "; background-color: " + t2["highlight-primary-dialog-button-hover"] + "; }\n", e2 += ".radio--checked:hover:not(.radio--disabled) .radio-visual { border-color: " + t2["highlight-primary-dialog-button-hover"] + "; }\n", e2 += "body { font-size: 12px; }\n") : (e2 += ".checkbox-checkmark { color: " + t2["text-normal"] + "; }\n", e2 += ".radio--checked .radio-visual { background-color: " + t2["text-normal"] + ";\n box-shadow: 0 0 0 2px" + t2["background-normal"] + " inset; }\n", e2 += ".radio-button-container:hover .radio-visual,\n.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + t2["border-control-focus"] + "; }\n"), e2 += "body, input, textarea, select, button { font-size: " + n2 + "; }\n";
    var i2 = document.getElementById("componentsStyles");
    return i2 ? (i2.innerHTML = e2, e2) : ((i2 = document.createElement("style")).id = "componentsStyles", i2.innerHTML = e2, document.getElementsByTagName("head")[0].appendChild(i2), e2);
  }, Mc = function(t2) {
    return t2["background-toolbar"] || (t2["background-toolbar"] = "#f7f7f7"), t2["text-normal"] || (t2["text-normal"] = "rgb(51, 51, 51)"), t2["text-secondary"] || (t2["text-secondary"] = "#848484"), t2["highlight-button-hover"] || (t2["highlight-button-hover"] = "#e0e0e0"), t2["background-normal"] || (t2["background-normal"] = "white"), t2["background-loader"] || (t2["background-loader"] = "rgba(24, 24, 24, 0.9)"), t2["highlight-button-pressed"] || (t2["highlight-button-pressed"] = "#cbcbcb"), t2["text-inverse"] || (t2["text-inverse"] = "white"), t2["border-regular-control"] || (t2["border-regular-control"] = "#c0c0c0"), t2["border-error"] || (t2["border-error"] = "#f62211"), t2["border-control-focus"] || (t2["border-control-focus"] = "#848484"), t2["highlight-primary-dialog-button-hover"] || (t2["highlight-primary-dialog-button-hover"] = "#1c1c1c"), t2["background-primary-dialog-button"] || (t2["background-primary-dialog-button"] = "#444444"), t2["background-toolbar-additional"] || (t2["background-toolbar-additional"] = "#efefef"), t2["text-tertiary"] || (t2["text-tertiary"] = "#bdbdbd"), t2;
  };
  function Dc() {
    this._states = ["mainState", "loginState", "settingsState"], this._routes = ["main", "login", "settings"], this._currentRoute = "login", this._currentRouteIndex = 1, this._containers = this._states.map(function(t2) {
      var e2 = document.getElementById(t2);
      if (!e2) throw new Error("container ".concat(t2, " not found"));
      return e2;
    });
  }
  Dc.prototype.getRoute = function() {
    return this._currentRoute;
  }, Dc.prototype._setCurrentRoute = function(t2) {
    this._containers[this._currentRouteIndex].classList.add("hidden"), this._currentRoute = t2, this._currentRouteIndex = this._routes.indexOf(t2), this._containers[this._currentRouteIndex].classList.remove("hidden");
  }, Dc.prototype.openMain = function() {
    this._setCurrentRoute("main");
  }, Dc.prototype.openLogin = function() {
    this._setCurrentRoute("login");
  }, Dc.prototype.openSettings = function() {
    this._setCurrentRoute("settings");
  };
  var Rc, Fc, Uc, Bc, Hc, Vc = "https://api.zotero.org/", Gc = "http://127.0.0.1:23119/api/", zc = { _done: false, _desktop: false, _hasPermission: true, _online: false, _hasKey: false, _timeout: 1e3, _callback: function(t2) {
  }, _desktopVersion: (function() {
    if (window.navigator && window.navigator.userAgent.toLowerCase().indexOf("ascdesktopeditor") < 0) return false;
    if (window.location && "file:" == window.location.protocol) return true;
    var t2 = window.document.currentScript ? window.document.currentScript.getAttribute("src") : "";
    return !(!t2 || 0 != t2.indexOf("file:///"));
  })(), runApisChecker: function(t2) {
    var e2 = this;
    return e2._done = false, (function n2() {
      e2._done || e2._checkApiAvailable(t2).then(function(t3) {
        e2._done || ((t3.online && t3.hasKey || t3.desktop && t3.hasPermission) && (e2._done = true), e2._callback(t3), setTimeout(n2, e2._timeout));
      });
    })(), { subscribe: function(t3) {
      e2._callback = t3;
    }, unsubscribe: function() {
      e2._done = true, e2._callback = function() {
      };
    } };
  }, checkStatus: function(t2) {
    return this._checkApiAvailable(t2);
  }, successfullyLoggedInUsingApiKey: function() {
    this._done = true, this._callback({ online: true, hasKey: true, desktop: this._desktop, hasPermission: this._hasPermission, desktopVersion: this._desktopVersion });
  }, _checkApiAvailable: function(t2) {
    var e2 = this;
    return Promise.all([fetch(Vc, { method: "GET", cache: "no-cache" }).then(function(t3) {
      return 200 === t3.status;
    }).catch(function() {
      return false;
    }), e2._sendDesktopRequest(Gc).then(function(t3) {
      return e2._hasPermission = t3.hasPermission, t3.isZoteroRunning;
    }).catch(function() {
      return false;
    })]).then(function(n2) {
      return e2._online = n2[0], e2._desktop = n2[1], e2._hasKey = t2.hasSettings(), { online: e2._online, hasKey: e2._hasKey, desktop: e2._desktop, hasPermission: e2._hasPermission, desktopVersion: e2._desktopVersion };
    });
  }, _sendDesktopRequest: function(t2) {
    var e2 = this;
    return new Promise(function(n2, i2) {
      e2._desktopVersion ? window.AscSimpleRequest.createRequest({ url: t2, method: "GET", headers: { "Zotero-API-Version": "3", "User-Agent": "AscDesktopEditor" }, complete: function(t3) {
        var e3 = false, i3 = false;
        403 == t3.responseStatus ? (e3 = false, i3 = true) : 200 === t3.responseStatus && (i3 = true, e3 = true), n2({ hasPermission: e3, isZoteroRunning: i3 });
      }, error: function(t3) {
        -102 == t3.statusCode && (t3.statusCode = 404), i2(t3);
      } }) : n2({ hasPermission: false, isZoteroRunning: false });
    });
  } }, Wc = {};
  function Kc() {
    if (Fc) return Rc;
    Fc = 1;
    var t2 = Rt(), e2 = Ft(), n2 = Pr();
    return Rc = function(i2, r2, o2) {
      var s2, a2;
      return n2 && t2(s2 = r2.constructor) && s2 !== o2 && e2(a2 = s2.prototype) && a2 !== o2.prototype && n2(i2, a2), i2;
    };
  }
  function qc() {
    if (Bc) return Uc;
    Bc = 1;
    var t2 = Pt();
    return Uc = t2(1.1.valueOf);
  }
  !(function() {
    if (Hc) return Wc;
    Hc = 1;
    var t2 = ki(), e2 = we(), n2 = F(), i2 = C(), r2 = Wo(), o2 = Pt(), s2 = Oi(), a2 = Ae(), c2 = Kc(), u2 = Bt(), l2 = Wt(), h2 = Ie(), f2 = R(), d2 = Vn().f, p2 = Ne().f, v2 = ze().f, m2 = qc(), _2 = Ya().trim, b2 = "Number", g2 = i2[b2], y2 = r2[b2], w2 = g2.prototype, S2 = i2.TypeError, O2 = o2("".slice), k2 = o2("".charCodeAt), x2 = function(t3) {
      var e3, n3, i3, r3, o3, s3, a3, c3, u3 = h2(t3, "number");
      if (l2(u3)) throw new S2("Cannot convert a Symbol value to a number");
      if ("string" == typeof u3 && u3.length > 2) {
        if (u3 = _2(u3), 43 === (e3 = k2(u3, 0)) || 45 === e3) {
          if (88 === (n3 = k2(u3, 2)) || 120 === n3) return NaN;
        } else if (48 === e3) {
          switch (k2(u3, 1)) {
            case 66:
            case 98:
              i3 = 2, r3 = 49;
              break;
            case 79:
            case 111:
              i3 = 8, r3 = 55;
              break;
            default:
              return +u3;
          }
          for (s3 = (o3 = O2(u3, 2)).length, a3 = 0; a3 < s3; a3++) if ((c3 = k2(o3, a3)) < 48 || c3 > r3) return NaN;
          return parseInt(o3, i3);
        }
      }
      return +u3;
    }, A2 = s2(b2, !g2(" 0o1") || !g2("0b1") || g2("+0x1")), E2 = function(t3) {
      var e3, n3 = arguments.length < 1 ? 0 : g2((function(t4) {
        var e4 = h2(t4, "number");
        return "bigint" == typeof e4 ? e4 : x2(e4);
      })(t3));
      return u2(w2, e3 = this) && f2(function() {
        m2(e3);
      }) ? c2(Object(n3), this, E2) : n3;
    };
    E2.prototype = w2, A2 && !e2 && (w2.constructor = E2), t2({ global: true, constructor: true, wrap: true, forced: A2 }, { Number: E2 });
    var I2 = function(t3, e3) {
      for (var i3, r3 = n2 ? d2(e3) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","), o3 = 0; r3.length > o3; o3++) a2(e3, i3 = r3[o3]) && !a2(t3, i3) && v2(t3, i3, p2(e3, i3));
    };
    e2 && y2 && I2(r2[b2], y2), (A2 || e2) && I2(r2[b2], g2);
  })();
  var Jc, Zc, Yc, $c, Xc, Qc, tu, eu, nu, iu, ru, ou, su = {};
  function au() {
    if (Zc) return Jc;
    Zc = 1;
    var t2 = R(), e2 = Ee(), n2 = F(), i2 = we(), r2 = e2("iterator");
    return Jc = !t2(function() {
      var t3 = new URL("b?a=1&b=2&c=3", "https://a"), e3 = t3.searchParams, o2 = new URLSearchParams("a=1&a=2&b=3"), s2 = "";
      return t3.pathname = "c%20d", e3.forEach(function(t4, n3) {
        e3.delete("b"), s2 += n3 + t4;
      }), o2.delete("a", 2), o2.delete("b", void 0), i2 && (!t3.toJSON || !o2.has("a", 1) || o2.has("a", 2) || !o2.has("a", void 0) || o2.has("b")) || !e3.size && (i2 || !n2) || !e3.sort || "https://a/c%20d?a=1&c=3" !== t3.href || "3" !== e3.get("c") || "a=1" !== String(new URLSearchParams("?a=1")) || !e3[r2] || "a" !== new URL("https://a@b").username || "b" !== new URLSearchParams(new URLSearchParams("a=b")).get("a") || "xn--e1aybc" !== new URL("https://тест").host || "#%D0%B1" !== new URL("https://a#б").hash || "a1c3" !== s2 || "x" !== new URL("https://x", void 0).host;
    });
  }
  function cu() {
    if ($c) return Yc;
    $c = 1;
    var t2 = F(), e2 = Pt(), n2 = B(), i2 = R(), r2 = gr(), o2 = yi(), s2 = It(), a2 = xe(), c2 = Nt(), u2 = Object.assign, l2 = Object.defineProperty, h2 = e2([].concat);
    return Yc = !u2 || i2(function() {
      if (t2 && 1 !== u2({ b: 1 }, u2(l2({}, "a", { enumerable: true, get: function() {
        l2(this, "b", { value: 3, enumerable: false });
      } }), { b: 2 })).b) return true;
      var e3 = {}, n3 = {}, i3 = Symbol("assign detection"), o3 = "abcdefghijklmnopqrst";
      return e3[i3] = 7, o3.split("").forEach(function(t3) {
        n3[t3] = t3;
      }), 7 !== u2({}, e3)[i3] || r2(u2({}, n3)).join("") !== o3;
    }) ? function(e3, i3) {
      for (var u3 = a2(e3), l3 = arguments.length, f2 = 1, d2 = o2.f, p2 = s2.f; l3 > f2; ) for (var v2, m2 = c2(arguments[f2++]), _2 = d2 ? h2(r2(m2), d2(m2)) : r2(m2), b2 = _2.length, g2 = 0; b2 > g2; ) v2 = _2[g2++], t2 && !n2(p2, m2, v2) || (u3[v2] = m2[v2]);
      return u3;
    } : u2, Yc;
  }
  function uu() {
    if (Qc) return Xc;
    Qc = 1;
    var t2 = Ge(), e2 = Ps();
    return Xc = function(n2, i2, r2, o2) {
      try {
        return o2 ? i2(t2(r2)[0], r2[1]) : i2(r2);
      } catch (t3) {
        e2(n2, "throw", t3);
      }
    };
  }
  function lu() {
    if (eu) return tu;
    eu = 1;
    var t2 = F(), e2 = ze(), n2 = Lt();
    return tu = function(i2, r2, o2) {
      t2 ? e2.f(i2, r2, n2(0, o2)) : i2[r2] = o2;
    };
  }
  function hu() {
    if (iu) return nu;
    iu = 1;
    var t2 = Ai(), e2 = B(), n2 = xe(), i2 = uu(), r2 = Es(), o2 = Li(), s2 = Fn(), a2 = lu(), c2 = Ls(), u2 = Is(), l2 = Array;
    return nu = function(h2) {
      var f2 = n2(h2), d2 = o2(this), p2 = arguments.length, v2 = p2 > 1 ? arguments[1] : void 0, m2 = void 0 !== v2;
      m2 && (v2 = t2(v2, p2 > 2 ? arguments[2] : void 0));
      var _2, b2, g2, y2, w2, S2, O2 = u2(f2), k2 = 0;
      if (!O2 || this === l2 && r2(O2)) for (_2 = s2(f2), b2 = d2 ? new this(_2) : l2(_2); _2 > k2; k2++) S2 = m2 ? v2(f2[k2], k2) : f2[k2], a2(b2, k2, S2);
      else for (b2 = d2 ? new this() : [], w2 = (y2 = c2(f2, O2)).next; !(g2 = e2(w2, y2)).done; k2++) S2 = m2 ? i2(y2, v2, [g2.value, k2], true) : g2.value, a2(b2, k2, S2);
      return b2.length = k2, b2;
    }, nu;
  }
  function fu() {
    if (ou) return ru;
    ou = 1;
    var t2 = Pt(), e2 = 2147483647, n2 = /[^\0-\u007E]/, i2 = /[.\u3002\uFF0E\uFF61]/g, r2 = "Overflow: input needs wider integers to process", o2 = RangeError, s2 = t2(i2.exec), a2 = Math.floor, c2 = String.fromCharCode, u2 = t2("".charCodeAt), l2 = t2([].join), h2 = t2([].push), f2 = t2("".replace), d2 = t2("".split), p2 = t2("".toLowerCase), v2 = function(t3) {
      return t3 + 22 + 75 * (t3 < 26);
    }, m2 = function(t3, e3, n3) {
      var i3 = 0;
      for (t3 = n3 ? a2(t3 / 700) : t3 >> 1, t3 += a2(t3 / e3); t3 > 455; ) t3 = a2(t3 / 35), i3 += 36;
      return a2(i3 + 36 * t3 / (t3 + 38));
    }, _2 = function(t3) {
      var n3 = [];
      t3 = (function(t4) {
        for (var e3 = [], n4 = 0, i4 = t4.length; n4 < i4; ) {
          var r3 = u2(t4, n4++);
          if (r3 >= 55296 && r3 <= 56319 && n4 < i4) {
            var o3 = u2(t4, n4++);
            56320 == (64512 & o3) ? h2(e3, ((1023 & r3) << 10) + (1023 & o3) + 65536) : (h2(e3, r3), n4--);
          } else h2(e3, r3);
        }
        return e3;
      })(t3);
      var i3, s3, f3 = t3.length, d3 = 128, p3 = 0, _3 = 72;
      for (i3 = 0; i3 < t3.length; i3++) (s3 = t3[i3]) < 128 && h2(n3, c2(s3));
      var b2 = n3.length, g2 = b2;
      for (b2 && h2(n3, "-"); g2 < f3; ) {
        var y2 = e2;
        for (i3 = 0; i3 < t3.length; i3++) (s3 = t3[i3]) >= d3 && s3 < y2 && (y2 = s3);
        var w2 = g2 + 1;
        if (y2 - d3 > a2((e2 - p3) / w2)) throw new o2(r2);
        for (p3 += (y2 - d3) * w2, d3 = y2, i3 = 0; i3 < t3.length; i3++) {
          if ((s3 = t3[i3]) < d3 && ++p3 > e2) throw new o2(r2);
          if (s3 === d3) {
            for (var S2 = p3, O2 = 36; ; ) {
              var k2 = O2 <= _3 ? 1 : O2 >= _3 + 26 ? 26 : O2 - _3;
              if (S2 < k2) break;
              var x2 = S2 - k2, A2 = 36 - k2;
              h2(n3, c2(v2(k2 + x2 % A2))), S2 = a2(x2 / A2), O2 += 36;
            }
            h2(n3, c2(v2(S2))), _3 = m2(p3, w2, g2 === b2), p3 = 0, g2++;
          }
        }
        p3++, d3++;
      }
      return l2(n3, "");
    };
    return ru = function(t3) {
      var e3, r3, o3 = [], a3 = d2(f2(p2(t3), i2, "."), ".");
      for (e3 = 0; e3 < a3.length; e3++) r3 = a3[e3], h2(o3, s2(n2, r3) ? "xn--" + _2(r3) : r3);
      return l2(o3, ".");
    };
  }
  var du, pu, vu, mu, _u, bu, gu, yu, wu, Su = {};
  function Ou() {
    if (vu) return pu;
    vu = 1;
    var t2 = mn();
    return pu = function(e2, n2, i2) {
      for (var r2 in n2) t2(e2, r2, n2[r2], i2);
      return e2;
    };
  }
  function ku() {
    if (_u) return mu;
    _u = 1;
    var t2 = $o(), e2 = Math.floor, n2 = function(i2, r2) {
      var o2 = i2.length;
      if (o2 < 8) for (var s2, a2, c2 = 1; c2 < o2; ) {
        for (a2 = c2, s2 = i2[c2]; a2 && r2(i2[a2 - 1], s2) > 0; ) i2[a2] = i2[--a2];
        a2 !== c2++ && (i2[a2] = s2);
      }
      else for (var u2 = e2(o2 / 2), l2 = n2(t2(i2, 0, u2), r2), h2 = n2(t2(i2, u2), r2), f2 = l2.length, d2 = h2.length, p2 = 0, v2 = 0; p2 < f2 || v2 < d2; ) i2[p2 + v2] = p2 < f2 && v2 < d2 ? r2(l2[p2], h2[v2]) <= 0 ? l2[p2++] : h2[v2++] : p2 < f2 ? l2[p2++] : h2[v2++];
      return i2;
    };
    return mu = n2;
  }
  function xu() {
    if (gu) return bu;
    gu = 1, jr(), (function() {
      if (du) return Su;
      du = 1;
      var t3 = ki(), e3 = Pt(), n3 = Dn(), i3 = RangeError, r3 = String.fromCharCode, o3 = String.fromCodePoint, s3 = e3([].join);
      t3({ target: "String", stat: true, arity: 1, forced: !!o3 && 1 !== o3.length }, { fromCodePoint: function(t4) {
        for (var e4, o4 = [], a3 = arguments.length, c3 = 0; a3 > c3; ) {
          if (e4 = +arguments[c3++], n3(e4, 1114111) !== e4) throw new i3(e4 + " is not a valid code point");
          o4[c3] = e4 < 65536 ? r3(e4) : r3(55296 + ((e4 -= 65536) >> 10), e4 % 1024 + 56320);
        }
        return s3(o4, "");
      } });
    })();
    var t2 = ki(), e2 = C(), n2 = es(), i2 = Ut(), r2 = B(), o2 = Pt(), s2 = F(), a2 = au(), c2 = mn(), u2 = Kr(), l2 = Ou(), h2 = Cr(), f2 = Er(), d2 = pn(), p2 = qo(), v2 = Rt(), m2 = Ae(), _2 = Ai(), b2 = Ii(), g2 = Ge(), y2 = Ft(), w2 = ua(), S2 = Sr(), O2 = Lt(), k2 = Ls(), x2 = Is(), A2 = Nr(), E2 = Xo(), I2 = Ee(), L2 = ku(), P2 = I2("iterator"), T2 = "URLSearchParams", N2 = T2 + "Iterator", j2 = d2.set, M2 = d2.getterFor(T2), D2 = d2.getterFor(N2), R2 = n2("fetch"), U2 = n2("Request"), H2 = n2("Headers"), V2 = U2 && U2.prototype, G2 = H2 && H2.prototype, z2 = e2.TypeError, W2 = e2.encodeURIComponent, K2 = String.fromCharCode, q2 = i2("String", "fromCodePoint"), J2 = parseInt, Z2 = o2("".charAt), Y2 = o2([].join), $2 = o2([].push), X2 = o2("".replace), Q2 = o2([].shift), tt2 = o2([].splice), et2 = o2("".split), nt2 = o2("".slice), it2 = o2(/./.exec), rt2 = /\+/g, ot2 = /^[0-9a-f]+$/i, st2 = function(t3, e3) {
      var n3 = nt2(t3, e3, e3 + 2);
      return it2(ot2, n3) ? J2(n3, 16) : NaN;
    }, at2 = function(t3) {
      for (var e3 = 0, n3 = 128; n3 > 0 && 0 !== (t3 & n3); n3 >>= 1) e3++;
      return e3;
    }, ct2 = function(t3) {
      var e3 = null;
      switch (t3.length) {
        case 1:
          e3 = t3[0];
          break;
        case 2:
          e3 = (31 & t3[0]) << 6 | 63 & t3[1];
          break;
        case 3:
          e3 = (15 & t3[0]) << 12 | (63 & t3[1]) << 6 | 63 & t3[2];
          break;
        case 4:
          e3 = (7 & t3[0]) << 18 | (63 & t3[1]) << 12 | (63 & t3[2]) << 6 | 63 & t3[3];
      }
      return e3 > 1114111 ? null : e3;
    }, ut2 = function(t3) {
      for (var e3 = (t3 = X2(t3, rt2, " ")).length, n3 = "", i3 = 0; i3 < e3; ) {
        var r3 = Z2(t3, i3);
        if ("%" === r3) {
          if ("%" === Z2(t3, i3 + 1) || i3 + 3 > e3) {
            n3 += "%", i3++;
            continue;
          }
          var o3 = st2(t3, i3 + 1);
          if (o3 != o3) {
            n3 += r3, i3++;
            continue;
          }
          i3 += 2;
          var s3 = at2(o3);
          if (0 === s3) r3 = K2(o3);
          else {
            if (1 === s3 || s3 > 4) {
              n3 += "�", i3++;
              continue;
            }
            for (var a3 = [o3], c3 = 1; c3 < s3 && !(++i3 + 3 > e3 || "%" !== Z2(t3, i3)); ) {
              var u3 = st2(t3, i3 + 1);
              if (u3 != u3) {
                i3 += 3;
                break;
              }
              if (u3 > 191 || u3 < 128) break;
              $2(a3, u3), i3 += 2, c3++;
            }
            if (a3.length !== s3) {
              n3 += "�";
              continue;
            }
            var l3 = ct2(a3);
            null === l3 ? n3 += "�" : r3 = q2(l3);
          }
        }
        n3 += r3, i3++;
      }
      return n3;
    }, lt2 = /[!'()~]|%20/g, ht2 = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+" }, ft2 = function(t3) {
      return ht2[t3];
    }, dt2 = function(t3) {
      return X2(W2(t3), lt2, ft2);
    }, pt2 = f2(function(t3, e3) {
      j2(this, { type: N2, target: M2(t3).entries, index: 0, kind: e3 });
    }, T2, function() {
      var t3 = D2(this), e3 = t3.target, n3 = t3.index++;
      if (!e3 || n3 >= e3.length) return t3.target = null, A2(void 0, true);
      var i3 = e3[n3];
      switch (t3.kind) {
        case "keys":
          return A2(i3.key, false);
        case "values":
          return A2(i3.value, false);
      }
      return A2([i3.key, i3.value], false);
    }, true), vt2 = function(t3) {
      this.entries = [], this.url = null, void 0 !== t3 && (y2(t3) ? this.parseObject(t3) : this.parseQuery("string" == typeof t3 ? "?" === Z2(t3, 0) ? nt2(t3, 1) : t3 : w2(t3)));
    };
    vt2.prototype = { type: T2, bindURL: function(t3) {
      this.url = t3, this.update();
    }, parseObject: function(t3) {
      var e3, n3, i3, o3, s3, a3, c3, u3 = this.entries, l3 = x2(t3);
      if (l3) for (n3 = (e3 = k2(t3, l3)).next; !(i3 = r2(n3, e3)).done; ) {
        if (s3 = (o3 = k2(g2(i3.value))).next, (a3 = r2(s3, o3)).done || (c3 = r2(s3, o3)).done || !r2(s3, o3).done) throw new z2("Expected sequence with length 2");
        $2(u3, { key: w2(a3.value), value: w2(c3.value) });
      }
      else for (var h3 in t3) m2(t3, h3) && $2(u3, { key: h3, value: w2(t3[h3]) });
    }, parseQuery: function(t3) {
      if (t3) for (var e3, n3, i3 = this.entries, r3 = et2(t3, "&"), o3 = 0; o3 < r3.length; ) (e3 = r3[o3++]).length && (n3 = et2(e3, "="), $2(i3, { key: ut2(Q2(n3)), value: ut2(Y2(n3, "=")) }));
    }, serialize: function() {
      for (var t3, e3 = this.entries, n3 = [], i3 = 0; i3 < e3.length; ) t3 = e3[i3++], $2(n3, dt2(t3.key) + "=" + dt2(t3.value));
      return Y2(n3, "&");
    }, update: function() {
      this.entries.length = 0, this.parseQuery(this.url.query);
    }, updateURL: function() {
      this.url && this.url.update();
    } };
    var mt2 = function() {
      p2(this, _t2);
      var t3 = j2(this, new vt2(arguments.length > 0 ? arguments[0] : void 0));
      s2 || (this.size = t3.entries.length);
    }, _t2 = mt2.prototype;
    if (l2(_t2, { append: function(t3, e3) {
      var n3 = M2(this);
      E2(arguments.length, 2), $2(n3.entries, { key: w2(t3), value: w2(e3) }), s2 || this.size++, n3.updateURL();
    }, delete: function(t3) {
      for (var e3 = M2(this), n3 = E2(arguments.length, 1), i3 = e3.entries, r3 = w2(t3), o3 = n3 < 2 ? void 0 : arguments[1], a3 = void 0 === o3 ? o3 : w2(o3), c3 = 0; c3 < i3.length; ) {
        var u3 = i3[c3];
        if (u3.key !== r3 || void 0 !== a3 && u3.value !== a3) c3++;
        else if (tt2(i3, c3, 1), void 0 !== a3) break;
      }
      s2 || (this.size = i3.length), e3.updateURL();
    }, get: function(t3) {
      var e3 = M2(this).entries;
      E2(arguments.length, 1);
      for (var n3 = w2(t3), i3 = 0; i3 < e3.length; i3++) if (e3[i3].key === n3) return e3[i3].value;
      return null;
    }, getAll: function(t3) {
      var e3 = M2(this).entries;
      E2(arguments.length, 1);
      for (var n3 = w2(t3), i3 = [], r3 = 0; r3 < e3.length; r3++) e3[r3].key === n3 && $2(i3, e3[r3].value);
      return i3;
    }, has: function(t3) {
      for (var e3 = M2(this).entries, n3 = E2(arguments.length, 1), i3 = w2(t3), r3 = n3 < 2 ? void 0 : arguments[1], o3 = void 0 === r3 ? r3 : w2(r3), s3 = 0; s3 < e3.length; ) {
        var a3 = e3[s3++];
        if (a3.key === i3 && (void 0 === o3 || a3.value === o3)) return true;
      }
      return false;
    }, set: function(t3, e3) {
      var n3 = M2(this);
      E2(arguments.length, 1);
      for (var i3, r3 = n3.entries, o3 = false, a3 = w2(t3), c3 = w2(e3), u3 = 0; u3 < r3.length; u3++) (i3 = r3[u3]).key === a3 && (o3 ? tt2(r3, u3--, 1) : (o3 = true, i3.value = c3));
      o3 || $2(r3, { key: a3, value: c3 }), s2 || (this.size = r3.length), n3.updateURL();
    }, sort: function() {
      var t3 = M2(this);
      L2(t3.entries, function(t4, e3) {
        return t4.key > e3.key ? 1 : -1;
      }), t3.updateURL();
    }, forEach: function(t3) {
      for (var e3, n3 = M2(this).entries, i3 = _2(t3, arguments.length > 1 ? arguments[1] : void 0), r3 = 0; r3 < n3.length; ) i3((e3 = n3[r3++]).value, e3.key, this);
    }, keys: function() {
      return new pt2(this, "keys");
    }, values: function() {
      return new pt2(this, "values");
    }, entries: function() {
      return new pt2(this, "entries");
    } }, { enumerable: true }), c2(_t2, P2, _t2.entries, { name: "entries" }), c2(_t2, "toString", function() {
      return M2(this).serialize();
    }, { enumerable: true }), s2 && u2(_t2, "size", { get: function() {
      return M2(this).entries.length;
    }, configurable: true, enumerable: true }), h2(mt2, T2), t2({ global: true, constructor: true, forced: !a2 }, { URLSearchParams: mt2 }), !a2 && v2(H2)) {
      var bt2 = o2(G2.has), gt2 = o2(G2.set), yt2 = function(t3) {
        if (y2(t3)) {
          var e3, n3 = t3.body;
          if (b2(n3) === T2) return e3 = t3.headers ? new H2(t3.headers) : new H2(), bt2(e3, "content-type") || gt2(e3, "content-type", "application/x-www-form-urlencoded;charset=UTF-8"), S2(t3, { body: O2(0, w2(n3)), headers: O2(0, e3) });
        }
        return t3;
      };
      if (v2(R2) && t2({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, { fetch: function(t3) {
        return R2(t3, arguments.length > 1 ? yt2(arguments[1]) : {});
      } }), v2(U2)) {
        var wt2 = function(t3) {
          return p2(this, V2), new U2(t3, arguments.length > 1 ? yt2(arguments[1]) : {});
        };
        V2.constructor = wt2, wt2.prototype = V2, t2({ global: true, constructor: true, dontCallGetSet: true, forced: true }, { Request: wt2 });
      }
    }
    return bu = { URLSearchParams: mt2, getState: M2 };
  }
  function Au() {
    if (yu) return su;
    yu = 1, wa();
    var t2, e2 = ki(), n2 = F(), i2 = au(), r2 = C(), o2 = Ai(), s2 = Pt(), a2 = mn(), c2 = Kr(), u2 = qo(), l2 = Ae(), h2 = cu(), f2 = hu(), d2 = $o(), p2 = ya().codeAt, v2 = fu(), m2 = ua(), _2 = Cr(), b2 = Xo(), g2 = xu(), y2 = pn(), w2 = y2.set, S2 = y2.getterFor("URL"), O2 = g2.URLSearchParams, k2 = g2.getState, x2 = r2.URL, A2 = r2.TypeError, E2 = r2.parseInt, I2 = Math.floor, L2 = Math.pow, P2 = s2("".charAt), T2 = s2(/./.exec), N2 = s2([].join), j2 = s2(1.1.toString), M2 = s2([].pop), D2 = s2([].push), R2 = s2("".replace), U2 = s2([].shift), B2 = s2("".split), H2 = s2("".slice), V2 = s2("".toLowerCase), G2 = s2([].unshift), z2 = "Invalid scheme", W2 = "Invalid host", K2 = "Invalid port", q2 = /[a-z]/i, J2 = /[\d+-.a-z]/i, Z2 = /\d/, Y2 = /^0x/i, $2 = /^[0-7]+$/, X2 = /^\d+$/, Q2 = /^[\da-f]+$/i, tt2 = /[\0\t\n\r #%/:<>?@[\\\]^|]/, et2 = /[\0\t\n\r #/:<>?@[\\\]^|]/, nt2 = /^[\u0000-\u0020]+/, it2 = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/, rt2 = /[\t\n\r]/g, ot2 = function(t3) {
      var e3, n3, i3, r3;
      if ("number" == typeof t3) {
        for (e3 = [], n3 = 0; n3 < 4; n3++) G2(e3, t3 % 256), t3 = I2(t3 / 256);
        return N2(e3, ".");
      }
      if ("object" == typeof t3) {
        for (e3 = "", i3 = (function(t4) {
          for (var e4 = null, n4 = 1, i4 = null, r4 = 0, o3 = 0; o3 < 8; o3++) 0 !== t4[o3] ? (r4 > n4 && (e4 = i4, n4 = r4), i4 = null, r4 = 0) : (null === i4 && (i4 = o3), ++r4);
          return r4 > n4 ? i4 : e4;
        })(t3), n3 = 0; n3 < 8; n3++) r3 && 0 === t3[n3] || (r3 && (r3 = false), i3 === n3 ? (e3 += n3 ? ":" : "::", r3 = true) : (e3 += j2(t3[n3], 16), n3 < 7 && (e3 += ":")));
        return "[" + e3 + "]";
      }
      return t3;
    }, st2 = {}, at2 = h2({}, st2, { " ": 1, '"': 1, "<": 1, ">": 1, "`": 1 }), ct2 = h2({}, at2, { "#": 1, "?": 1, "{": 1, "}": 1 }), ut2 = h2({}, ct2, { "/": 1, ":": 1, ";": 1, "=": 1, "@": 1, "[": 1, "\\": 1, "]": 1, "^": 1, "|": 1 }), lt2 = function(t3, e3) {
      var n3 = p2(t3, 0);
      return n3 > 32 && n3 < 127 && !l2(e3, t3) ? t3 : encodeURIComponent(t3);
    }, ht2 = { ftp: 21, file: null, http: 80, https: 443, ws: 80, wss: 443 }, ft2 = function(t3, e3) {
      var n3;
      return 2 === t3.length && T2(q2, P2(t3, 0)) && (":" === (n3 = P2(t3, 1)) || !e3 && "|" === n3);
    }, dt2 = function(t3) {
      var e3;
      return t3.length > 1 && ft2(H2(t3, 0, 2)) && (2 === t3.length || "/" === (e3 = P2(t3, 2)) || "\\" === e3 || "?" === e3 || "#" === e3);
    }, pt2 = function(t3) {
      return "." === t3 || "%2e" === V2(t3);
    }, vt2 = function(t3) {
      return ".." === (t3 = V2(t3)) || "%2e." === t3 || ".%2e" === t3 || "%2e%2e" === t3;
    }, mt2 = {}, _t2 = {}, bt2 = {}, gt2 = {}, yt2 = {}, wt2 = {}, St2 = {}, Ot2 = {}, kt2 = {}, xt2 = {}, At2 = {}, Ct2 = {}, Et2 = {}, It2 = {}, Lt2 = {}, Tt2 = {}, Nt2 = {}, jt2 = {}, Mt2 = {}, Dt2 = {}, Rt2 = {}, Ft2 = function(t3, e3, n3) {
      var i3, r3, o3, s3 = m2(t3);
      if (e3) {
        if (r3 = this.parse(s3)) throw new A2(r3);
        this.searchParams = null;
      } else {
        if (void 0 !== n3 && (i3 = new Ft2(n3, true)), r3 = this.parse(s3, null, i3)) throw new A2(r3);
        (o3 = k2(new O2())).bindURL(this), this.searchParams = o3;
      }
    };
    Ft2.prototype = { type: "URL", parse: function(e3, n3, i3) {
      var r3, o3, s3, a3, c3 = this, u3 = n3 || mt2, h3 = 0, p3 = "", v3 = false, _3 = false, b3 = false;
      for (e3 = m2(e3), n3 || (c3.scheme = "", c3.username = "", c3.password = "", c3.host = null, c3.port = null, c3.path = [], c3.query = null, c3.fragment = null, c3.cannotBeABaseURL = false, e3 = R2(e3, nt2, ""), e3 = R2(e3, it2, "$1")), e3 = R2(e3, rt2, ""), r3 = f2(e3); h3 <= r3.length; ) {
        switch (o3 = r3[h3], u3) {
          case mt2:
            if (!o3 || !T2(q2, o3)) {
              if (n3) return z2;
              u3 = bt2;
              continue;
            }
            p3 += V2(o3), u3 = _t2;
            break;
          case _t2:
            if (o3 && (T2(J2, o3) || "+" === o3 || "-" === o3 || "." === o3)) p3 += V2(o3);
            else {
              if (":" !== o3) {
                if (n3) return z2;
                p3 = "", u3 = bt2, h3 = 0;
                continue;
              }
              if (n3 && (c3.isSpecial() !== l2(ht2, p3) || "file" === p3 && (c3.includesCredentials() || null !== c3.port) || "file" === c3.scheme && !c3.host)) return;
              if (c3.scheme = p3, n3) return void (c3.isSpecial() && ht2[c3.scheme] === c3.port && (c3.port = null));
              p3 = "", "file" === c3.scheme ? u3 = It2 : c3.isSpecial() && i3 && i3.scheme === c3.scheme ? u3 = gt2 : c3.isSpecial() ? u3 = Ot2 : "/" === r3[h3 + 1] ? (u3 = yt2, h3++) : (c3.cannotBeABaseURL = true, D2(c3.path, ""), u3 = Mt2);
            }
            break;
          case bt2:
            if (!i3 || i3.cannotBeABaseURL && "#" !== o3) return z2;
            if (i3.cannotBeABaseURL && "#" === o3) {
              c3.scheme = i3.scheme, c3.path = d2(i3.path), c3.query = i3.query, c3.fragment = "", c3.cannotBeABaseURL = true, u3 = Rt2;
              break;
            }
            u3 = "file" === i3.scheme ? It2 : wt2;
            continue;
          case gt2:
            if ("/" !== o3 || "/" !== r3[h3 + 1]) {
              u3 = wt2;
              continue;
            }
            u3 = kt2, h3++;
            break;
          case yt2:
            if ("/" === o3) {
              u3 = xt2;
              break;
            }
            u3 = jt2;
            continue;
          case wt2:
            if (c3.scheme = i3.scheme, o3 === t2) c3.username = i3.username, c3.password = i3.password, c3.host = i3.host, c3.port = i3.port, c3.path = d2(i3.path), c3.query = i3.query;
            else if ("/" === o3 || "\\" === o3 && c3.isSpecial()) u3 = St2;
            else if ("?" === o3) c3.username = i3.username, c3.password = i3.password, c3.host = i3.host, c3.port = i3.port, c3.path = d2(i3.path), c3.query = "", u3 = Dt2;
            else {
              if ("#" !== o3) {
                c3.username = i3.username, c3.password = i3.password, c3.host = i3.host, c3.port = i3.port, c3.path = d2(i3.path), c3.path.length--, u3 = jt2;
                continue;
              }
              c3.username = i3.username, c3.password = i3.password, c3.host = i3.host, c3.port = i3.port, c3.path = d2(i3.path), c3.query = i3.query, c3.fragment = "", u3 = Rt2;
            }
            break;
          case St2:
            if (!c3.isSpecial() || "/" !== o3 && "\\" !== o3) {
              if ("/" !== o3) {
                c3.username = i3.username, c3.password = i3.password, c3.host = i3.host, c3.port = i3.port, u3 = jt2;
                continue;
              }
              u3 = xt2;
            } else u3 = kt2;
            break;
          case Ot2:
            if (u3 = kt2, "/" !== o3 || "/" !== P2(p3, h3 + 1)) continue;
            h3++;
            break;
          case kt2:
            if ("/" !== o3 && "\\" !== o3) {
              u3 = xt2;
              continue;
            }
            break;
          case xt2:
            if ("@" === o3) {
              v3 && (p3 = "%40" + p3), v3 = true, s3 = f2(p3);
              for (var g3 = 0; g3 < s3.length; g3++) {
                var y3 = s3[g3];
                if (":" !== y3 || b3) {
                  var w3 = lt2(y3, ut2);
                  b3 ? c3.password += w3 : c3.username += w3;
                } else b3 = true;
              }
              p3 = "";
            } else if (o3 === t2 || "/" === o3 || "?" === o3 || "#" === o3 || "\\" === o3 && c3.isSpecial()) {
              if (v3 && "" === p3) return "Invalid authority";
              h3 -= f2(p3).length + 1, p3 = "", u3 = At2;
            } else p3 += o3;
            break;
          case At2:
          case Ct2:
            if (n3 && "file" === c3.scheme) {
              u3 = Tt2;
              continue;
            }
            if (":" !== o3 || _3) {
              if (o3 === t2 || "/" === o3 || "?" === o3 || "#" === o3 || "\\" === o3 && c3.isSpecial()) {
                if (c3.isSpecial() && "" === p3) return W2;
                if (n3 && "" === p3 && (c3.includesCredentials() || null !== c3.port)) return;
                if (a3 = c3.parseHost(p3)) return a3;
                if (p3 = "", u3 = Nt2, n3) return;
                continue;
              }
              "[" === o3 ? _3 = true : "]" === o3 && (_3 = false), p3 += o3;
            } else {
              if ("" === p3) return W2;
              if (a3 = c3.parseHost(p3)) return a3;
              if (p3 = "", u3 = Et2, n3 === Ct2) return;
            }
            break;
          case Et2:
            if (!T2(Z2, o3)) {
              if (o3 === t2 || "/" === o3 || "?" === o3 || "#" === o3 || "\\" === o3 && c3.isSpecial() || n3) {
                if ("" !== p3) {
                  var S3 = E2(p3, 10);
                  if (S3 > 65535) return K2;
                  c3.port = c3.isSpecial() && S3 === ht2[c3.scheme] ? null : S3, p3 = "";
                }
                if (n3) return;
                u3 = Nt2;
                continue;
              }
              return K2;
            }
            p3 += o3;
            break;
          case It2:
            if (c3.scheme = "file", "/" === o3 || "\\" === o3) u3 = Lt2;
            else {
              if (!i3 || "file" !== i3.scheme) {
                u3 = jt2;
                continue;
              }
              switch (o3) {
                case t2:
                  c3.host = i3.host, c3.path = d2(i3.path), c3.query = i3.query;
                  break;
                case "?":
                  c3.host = i3.host, c3.path = d2(i3.path), c3.query = "", u3 = Dt2;
                  break;
                case "#":
                  c3.host = i3.host, c3.path = d2(i3.path), c3.query = i3.query, c3.fragment = "", u3 = Rt2;
                  break;
                default:
                  dt2(N2(d2(r3, h3), "")) || (c3.host = i3.host, c3.path = d2(i3.path), c3.shortenPath()), u3 = jt2;
                  continue;
              }
            }
            break;
          case Lt2:
            if ("/" === o3 || "\\" === o3) {
              u3 = Tt2;
              break;
            }
            i3 && "file" === i3.scheme && !dt2(N2(d2(r3, h3), "")) && (ft2(i3.path[0], true) ? D2(c3.path, i3.path[0]) : c3.host = i3.host), u3 = jt2;
            continue;
          case Tt2:
            if (o3 === t2 || "/" === o3 || "\\" === o3 || "?" === o3 || "#" === o3) {
              if (!n3 && ft2(p3)) u3 = jt2;
              else if ("" === p3) {
                if (c3.host = "", n3) return;
                u3 = Nt2;
              } else {
                if (a3 = c3.parseHost(p3)) return a3;
                if ("localhost" === c3.host && (c3.host = ""), n3) return;
                p3 = "", u3 = Nt2;
              }
              continue;
            }
            p3 += o3;
            break;
          case Nt2:
            if (c3.isSpecial()) {
              if (u3 = jt2, "/" !== o3 && "\\" !== o3) continue;
            } else if (n3 || "?" !== o3) if (n3 || "#" !== o3) {
              if (o3 !== t2 && (u3 = jt2, "/" !== o3)) continue;
            } else c3.fragment = "", u3 = Rt2;
            else c3.query = "", u3 = Dt2;
            break;
          case jt2:
            if (o3 === t2 || "/" === o3 || "\\" === o3 && c3.isSpecial() || !n3 && ("?" === o3 || "#" === o3)) {
              if (vt2(p3) ? (c3.shortenPath(), "/" === o3 || "\\" === o3 && c3.isSpecial() || D2(c3.path, "")) : pt2(p3) ? "/" === o3 || "\\" === o3 && c3.isSpecial() || D2(c3.path, "") : ("file" === c3.scheme && !c3.path.length && ft2(p3) && (c3.host && (c3.host = ""), p3 = P2(p3, 0) + ":"), D2(c3.path, p3)), p3 = "", "file" === c3.scheme && (o3 === t2 || "?" === o3 || "#" === o3)) for (; c3.path.length > 1 && "" === c3.path[0]; ) U2(c3.path);
              "?" === o3 ? (c3.query = "", u3 = Dt2) : "#" === o3 && (c3.fragment = "", u3 = Rt2);
            } else p3 += lt2(o3, ct2);
            break;
          case Mt2:
            "?" === o3 ? (c3.query = "", u3 = Dt2) : "#" === o3 ? (c3.fragment = "", u3 = Rt2) : o3 !== t2 && (c3.path[0] += lt2(o3, st2));
            break;
          case Dt2:
            n3 || "#" !== o3 ? o3 !== t2 && ("'" === o3 && c3.isSpecial() ? c3.query += "%27" : c3.query += "#" === o3 ? "%23" : lt2(o3, st2)) : (c3.fragment = "", u3 = Rt2);
            break;
          case Rt2:
            o3 !== t2 && (c3.fragment += lt2(o3, at2));
        }
        h3++;
      }
    }, parseHost: function(t3) {
      var e3, n3, i3;
      if ("[" === P2(t3, 0)) {
        if ("]" !== P2(t3, t3.length - 1)) return W2;
        if (e3 = (function(t4) {
          var e4, n4, i4, r3, o3, s3, a3, c3 = [0, 0, 0, 0, 0, 0, 0, 0], u3 = 0, l3 = null, h3 = 0, f3 = function() {
            return P2(t4, h3);
          };
          if (":" === f3()) {
            if (":" !== P2(t4, 1)) return;
            h3 += 2, l3 = ++u3;
          }
          for (; f3(); ) {
            if (8 === u3) return;
            if (":" !== f3()) {
              for (e4 = n4 = 0; n4 < 4 && T2(Q2, f3()); ) e4 = 16 * e4 + E2(f3(), 16), h3++, n4++;
              if ("." === f3()) {
                if (0 === n4) return;
                if (h3 -= n4, u3 > 6) return;
                for (i4 = 0; f3(); ) {
                  if (r3 = null, i4 > 0) {
                    if (!("." === f3() && i4 < 4)) return;
                    h3++;
                  }
                  if (!T2(Z2, f3())) return;
                  for (; T2(Z2, f3()); ) {
                    if (o3 = E2(f3(), 10), null === r3) r3 = o3;
                    else {
                      if (0 === r3) return;
                      r3 = 10 * r3 + o3;
                    }
                    if (r3 > 255) return;
                    h3++;
                  }
                  c3[u3] = 256 * c3[u3] + r3, 2 !== ++i4 && 4 !== i4 || u3++;
                }
                if (4 !== i4) return;
                break;
              }
              if (":" === f3()) {
                if (h3++, !f3()) return;
              } else if (f3()) return;
              c3[u3++] = e4;
            } else {
              if (null !== l3) return;
              h3++, l3 = ++u3;
            }
          }
          if (null !== l3) for (s3 = u3 - l3, u3 = 7; 0 !== u3 && s3 > 0; ) a3 = c3[u3], c3[u3--] = c3[l3 + s3 - 1], c3[l3 + --s3] = a3;
          else if (8 !== u3) return;
          return c3;
        })(H2(t3, 1, -1)), !e3) return W2;
        this.host = e3;
      } else if (this.isSpecial()) {
        if (t3 = v2(t3), T2(tt2, t3)) return W2;
        if (e3 = (function(t4) {
          var e4, n4, i4, r3, o3, s3, a3, c3 = B2(t4, ".");
          if (c3.length && "" === c3[c3.length - 1] && c3.length--, (e4 = c3.length) > 4) return t4;
          for (n4 = [], i4 = 0; i4 < e4; i4++) {
            if ("" === (r3 = c3[i4])) return t4;
            if (o3 = 10, r3.length > 1 && "0" === P2(r3, 0) && (o3 = T2(Y2, r3) ? 16 : 8, r3 = H2(r3, 8 === o3 ? 1 : 2)), "" === r3) s3 = 0;
            else {
              if (!T2(10 === o3 ? X2 : 8 === o3 ? $2 : Q2, r3)) return t4;
              s3 = E2(r3, o3);
            }
            D2(n4, s3);
          }
          for (i4 = 0; i4 < e4; i4++) if (s3 = n4[i4], i4 === e4 - 1) {
            if (s3 >= L2(256, 5 - e4)) return null;
          } else if (s3 > 255) return null;
          for (a3 = M2(n4), i4 = 0; i4 < n4.length; i4++) a3 += n4[i4] * L2(256, 3 - i4);
          return a3;
        })(t3), null === e3) return W2;
        this.host = e3;
      } else {
        if (T2(et2, t3)) return W2;
        for (e3 = "", n3 = f2(t3), i3 = 0; i3 < n3.length; i3++) e3 += lt2(n3[i3], st2);
        this.host = e3;
      }
    }, cannotHaveUsernamePasswordPort: function() {
      return !this.host || this.cannotBeABaseURL || "file" === this.scheme;
    }, includesCredentials: function() {
      return "" !== this.username || "" !== this.password;
    }, isSpecial: function() {
      return l2(ht2, this.scheme);
    }, shortenPath: function() {
      var t3 = this.path, e3 = t3.length;
      !e3 || "file" === this.scheme && 1 === e3 && ft2(t3[0], true) || t3.length--;
    }, serialize: function() {
      var t3 = this, e3 = t3.scheme, n3 = t3.username, i3 = t3.password, r3 = t3.host, o3 = t3.port, s3 = t3.path, a3 = t3.query, c3 = t3.fragment, u3 = e3 + ":";
      return null !== r3 ? (u3 += "//", t3.includesCredentials() && (u3 += n3 + (i3 ? ":" + i3 : "") + "@"), u3 += ot2(r3), null !== o3 && (u3 += ":" + o3)) : "file" === e3 && (u3 += "//"), u3 += t3.cannotBeABaseURL ? s3[0] : s3.length ? "/" + N2(s3, "/") : "", null !== a3 && (u3 += "?" + a3), null !== c3 && (u3 += "#" + c3), u3;
    }, setHref: function(t3) {
      var e3 = this.parse(t3);
      if (e3) throw new A2(e3);
      this.searchParams.update();
    }, getOrigin: function() {
      var t3 = this.scheme, e3 = this.port;
      if ("blob" === t3) try {
        return new Ut2(t3.path[0]).origin;
      } catch (t4) {
        return "null";
      }
      return "file" !== t3 && this.isSpecial() ? t3 + "://" + ot2(this.host) + (null !== e3 ? ":" + e3 : "") : "null";
    }, getProtocol: function() {
      return this.scheme + ":";
    }, setProtocol: function(t3) {
      this.parse(m2(t3) + ":", mt2);
    }, getUsername: function() {
      return this.username;
    }, setUsername: function(t3) {
      var e3 = f2(m2(t3));
      if (!this.cannotHaveUsernamePasswordPort()) {
        this.username = "";
        for (var n3 = 0; n3 < e3.length; n3++) this.username += lt2(e3[n3], ut2);
      }
    }, getPassword: function() {
      return this.password;
    }, setPassword: function(t3) {
      var e3 = f2(m2(t3));
      if (!this.cannotHaveUsernamePasswordPort()) {
        this.password = "";
        for (var n3 = 0; n3 < e3.length; n3++) this.password += lt2(e3[n3], ut2);
      }
    }, getHost: function() {
      var t3 = this.host, e3 = this.port;
      return null === t3 ? "" : null === e3 ? ot2(t3) : ot2(t3) + ":" + e3;
    }, setHost: function(t3) {
      this.cannotBeABaseURL || this.parse(t3, At2);
    }, getHostname: function() {
      var t3 = this.host;
      return null === t3 ? "" : ot2(t3);
    }, setHostname: function(t3) {
      this.cannotBeABaseURL || this.parse(t3, Ct2);
    }, getPort: function() {
      var t3 = this.port;
      return null === t3 ? "" : m2(t3);
    }, setPort: function(t3) {
      this.cannotHaveUsernamePasswordPort() || ("" === (t3 = m2(t3)) ? this.port = null : this.parse(t3, Et2));
    }, getPathname: function() {
      var t3 = this.path;
      return this.cannotBeABaseURL ? t3[0] : t3.length ? "/" + N2(t3, "/") : "";
    }, setPathname: function(t3) {
      this.cannotBeABaseURL || (this.path = [], this.parse(t3, Nt2));
    }, getSearch: function() {
      var t3 = this.query;
      return t3 ? "?" + t3 : "";
    }, setSearch: function(t3) {
      "" === (t3 = m2(t3)) ? this.query = null : ("?" === P2(t3, 0) && (t3 = H2(t3, 1)), this.query = "", this.parse(t3, Dt2)), this.searchParams.update();
    }, getSearchParams: function() {
      return this.searchParams.facade;
    }, getHash: function() {
      var t3 = this.fragment;
      return t3 ? "#" + t3 : "";
    }, setHash: function(t3) {
      "" !== (t3 = m2(t3)) ? ("#" === P2(t3, 0) && (t3 = H2(t3, 1)), this.fragment = "", this.parse(t3, Rt2)) : this.fragment = null;
    }, update: function() {
      this.query = this.searchParams.serialize() || null;
    } };
    var Ut2 = function(t3) {
      var e3 = u2(this, Bt2), i3 = b2(arguments.length, 1) > 1 ? arguments[1] : void 0, r3 = w2(e3, new Ft2(t3, false, i3));
      n2 || (e3.href = r3.serialize(), e3.origin = r3.getOrigin(), e3.protocol = r3.getProtocol(), e3.username = r3.getUsername(), e3.password = r3.getPassword(), e3.host = r3.getHost(), e3.hostname = r3.getHostname(), e3.port = r3.getPort(), e3.pathname = r3.getPathname(), e3.search = r3.getSearch(), e3.searchParams = r3.getSearchParams(), e3.hash = r3.getHash());
    }, Bt2 = Ut2.prototype, Ht2 = function(t3, e3) {
      return { get: function() {
        return S2(this)[t3]();
      }, set: e3 && function(t4) {
        return S2(this)[e3](t4);
      }, configurable: true, enumerable: true };
    };
    if (n2 && (c2(Bt2, "href", Ht2("serialize", "setHref")), c2(Bt2, "origin", Ht2("getOrigin")), c2(Bt2, "protocol", Ht2("getProtocol", "setProtocol")), c2(Bt2, "username", Ht2("getUsername", "setUsername")), c2(Bt2, "password", Ht2("getPassword", "setPassword")), c2(Bt2, "host", Ht2("getHost", "setHost")), c2(Bt2, "hostname", Ht2("getHostname", "setHostname")), c2(Bt2, "port", Ht2("getPort", "setPort")), c2(Bt2, "pathname", Ht2("getPathname", "setPathname")), c2(Bt2, "search", Ht2("getSearch", "setSearch")), c2(Bt2, "searchParams", Ht2("getSearchParams")), c2(Bt2, "hash", Ht2("getHash", "setHash"))), a2(Bt2, "toJSON", function() {
      return S2(this).serialize();
    }, { enumerable: true }), a2(Bt2, "toString", function() {
      return S2(this).serialize();
    }, { enumerable: true }), x2) {
      var Vt2 = x2.createObjectURL, Gt2 = x2.revokeObjectURL;
      Vt2 && a2(Ut2, "createObjectURL", o2(Vt2, x2)), Gt2 && a2(Ut2, "revokeObjectURL", o2(Gt2, x2));
    }
    return _2(Ut2, "URL"), e2({ global: true, constructor: true, forced: !i2, sham: !n2 }, { URL: Ut2 }), su;
  }
  wu || (wu = 1, Au());
  var Cu, Eu = {};
  !(function() {
    if (Cu) return Eu;
    Cu = 1;
    var t2 = ki(), e2 = B();
    t2({ target: "URL", proto: true, enumerable: true }, { toJSON: function() {
      return e2(URL.prototype.toString, this);
    } });
  })();
  var Iu;
  Iu || (Iu = 1, xu());
  var Lu, Pu, Tu, Nu = {};
  function ju() {
    if (Pu) return Lu;
    Pu = 1;
    var t2 = TypeError;
    return Lu = function(e2) {
      if (e2 > 9007199254740991) throw t2("Maximum allowed index exceeded");
      return e2;
    };
  }
  !(function() {
    if (Tu) return Nu;
    Tu = 1;
    var t2 = ki(), e2 = R(), n2 = Ci(), i2 = Ft(), r2 = xe(), o2 = Fn(), s2 = ju(), a2 = lu(), c2 = Ti(), u2 = ji(), l2 = Ee(), h2 = Vt(), f2 = l2("isConcatSpreadable"), d2 = h2 >= 51 || !e2(function() {
      var t3 = [];
      return t3[f2] = false, t3.concat()[0] !== t3;
    }), p2 = function(t3) {
      if (!i2(t3)) return false;
      var e3 = t3[f2];
      return void 0 !== e3 ? !!e3 : n2(t3);
    };
    t2({ target: "Array", proto: true, arity: 1, forced: !d2 || !u2("concat") }, { concat: function(t3) {
      var e3, n3, i3, u3, l3, h3 = r2(this), f3 = c2(h3, 0), d3 = 0;
      for (e3 = -1, i3 = arguments.length; e3 < i3; e3++) if (p2(l3 = -1 === e3 ? h3 : arguments[e3])) for (u3 = o2(l3), s2(d3 + u3), n3 = 0; n3 < u3; n3++, d3++) n3 in l3 && a2(f3, d3, l3[n3]);
      else s2(d3 + 1), a2(f3, d3++, l3);
      return f3.length = d3, f3;
    } });
  })();
  var Mu, Du, Ru, Fu, Uu, Bu, Hu, Vu = {};
  function Gu() {
    if (Du) return Mu;
    Du = 1;
    var t2 = Ft(), e2 = Tt(), n2 = Ee()("match");
    return Mu = function(i2) {
      var r2;
      return t2(i2) && (void 0 !== (r2 = i2[n2]) ? !!r2 : "RegExp" === e2(i2));
    };
  }
  function zu() {
    if (Fu) return Ru;
    Fu = 1;
    var t2 = Gu(), e2 = TypeError;
    return Ru = function(n2) {
      if (t2(n2)) throw new e2("The method doesn't accept regular expressions");
      return n2;
    };
  }
  function Wu() {
    if (Bu) return Uu;
    Bu = 1;
    var t2 = Ee()("match");
    return Uu = function(e2) {
      var n2 = /./;
      try {
        "/./"[e2](n2);
      } catch (i2) {
        try {
          return n2[t2] = false, "/./"[e2](n2);
        } catch (t3) {
        }
      }
      return false;
    };
  }
  !(function() {
    if (Hu) return Vu;
    Hu = 1;
    var t2 = ki(), e2 = Pt(), n2 = zu(), i2 = Mt(), r2 = ua(), o2 = Wu(), s2 = e2("".indexOf);
    t2({ target: "String", proto: true, forced: !o2("includes") }, { includes: function(t3) {
      return !!~s2(r2(i2(this)), r2(n2(t3)), arguments.length > 1 ? arguments[1] : void 0);
    } });
  })();
  var Ku, qu, Ju = {};
  function Zu() {
    if (qu) return Ku;
    qu = 1;
    var t2 = R();
    return Ku = !t2(function() {
      return Object.isExtensible(Object.preventExtensions({}));
    });
  }
  var Yu, $u, Xu, Qu, tl, el, nl, il, rl, ol, sl, al, cl = { exports: {} }, ul = {};
  function ll() {
    if (Yu) return ul;
    Yu = 1;
    var t2 = Tt(), e2 = Dt(), n2 = Vn().f, i2 = $o(), r2 = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
    return ul.f = function(o2) {
      return r2 && "Window" === t2(o2) ? (function(t3) {
        try {
          return n2(t3);
        } catch (t4) {
          return i2(r2);
        }
      })(o2) : n2(e2(o2));
    }, ul;
  }
  function hl() {
    if (tl) return Qu;
    tl = 1;
    var t2 = R(), e2 = Ft(), n2 = Tt(), i2 = (function() {
      if (Xu) return $u;
      Xu = 1;
      var t3 = R();
      return $u = t3(function() {
        if ("function" == typeof ArrayBuffer) {
          var t4 = new ArrayBuffer(8);
          Object.isExtensible(t4) && Object.defineProperty(t4, "a", { value: 8 });
        }
      });
    })(), r2 = Object.isExtensible, o2 = t2(function() {
    });
    return Qu = o2 || i2 ? function(t3) {
      return !!e2(t3) && ((!i2 || "ArrayBuffer" !== n2(t3)) && (!r2 || r2(t3)));
    } : r2;
  }
  function fl() {
    if (el) return cl.exports;
    el = 1;
    var t2 = ki(), e2 = Pt(), n2 = dn(), i2 = Ft(), r2 = Ae(), o2 = ze().f, s2 = Vn(), a2 = ll(), c2 = hl(), u2 = Ce(), l2 = Zu(), h2 = false, f2 = u2("meta"), d2 = 0, p2 = function(t3) {
      o2(t3, f2, { value: { objectID: "O" + d2++, weakData: {} } });
    }, v2 = cl.exports = { enable: function() {
      v2.enable = function() {
      }, h2 = true;
      var n3 = s2.f, i3 = e2([].splice), r3 = {};
      r3[f2] = 1, n3(r3).length && (s2.f = function(t3) {
        for (var e3 = n3(t3), r4 = 0, o3 = e3.length; r4 < o3; r4++) if (e3[r4] === f2) {
          i3(e3, r4, 1);
          break;
        }
        return e3;
      }, t2({ target: "Object", stat: true, forced: true }, { getOwnPropertyNames: a2.f }));
    }, fastKey: function(t3, e3) {
      if (!i2(t3)) return "symbol" == typeof t3 ? t3 : ("string" == typeof t3 ? "S" : "P") + t3;
      if (!r2(t3, f2)) {
        if (!c2(t3)) return "F";
        if (!e3) return "E";
        p2(t3);
      }
      return t3[f2].objectID;
    }, getWeakData: function(t3, e3) {
      if (!r2(t3, f2)) {
        if (!c2(t3)) return true;
        if (!e3) return false;
        p2(t3);
      }
      return t3[f2].weakData;
    }, onFreeze: function(t3) {
      return l2 && h2 && c2(t3) && !r2(t3, f2) && p2(t3), t3;
    } };
    return n2[f2] = true, cl.exports;
  }
  function dl() {
    if (il) return nl;
    il = 1;
    var t2 = ki(), e2 = C(), n2 = Pt(), i2 = Oi(), r2 = mn(), o2 = fl(), s2 = Ts(), a2 = qo(), c2 = Rt(), u2 = jt(), l2 = Ft(), h2 = R(), f2 = Ns(), d2 = Cr(), p2 = Kc();
    return nl = function(v2, m2, _2) {
      var b2 = -1 !== v2.indexOf("Map"), g2 = -1 !== v2.indexOf("Weak"), y2 = b2 ? "set" : "add", w2 = e2[v2], S2 = w2 && w2.prototype, O2 = w2, k2 = {}, x2 = function(t3) {
        var e3 = n2(S2[t3]);
        r2(S2, t3, "add" === t3 ? function(t4) {
          return e3(this, 0 === t4 ? 0 : t4), this;
        } : "delete" === t3 ? function(t4) {
          return !(g2 && !l2(t4)) && e3(this, 0 === t4 ? 0 : t4);
        } : "get" === t3 ? function(t4) {
          return g2 && !l2(t4) ? void 0 : e3(this, 0 === t4 ? 0 : t4);
        } : "has" === t3 ? function(t4) {
          return !(g2 && !l2(t4)) && e3(this, 0 === t4 ? 0 : t4);
        } : function(t4, n3) {
          return e3(this, 0 === t4 ? 0 : t4, n3), this;
        });
      };
      if (i2(v2, !c2(w2) || !(g2 || S2.forEach && !h2(function() {
        new w2().entries().next();
      })))) O2 = _2.getConstructor(m2, v2, b2, y2), o2.enable();
      else if (i2(v2, true)) {
        var A2 = new O2(), C2 = A2[y2](g2 ? {} : -0, 1) !== A2, E2 = h2(function() {
          A2.has(1);
        }), I2 = f2(function(t3) {
          new w2(t3);
        }), L2 = !g2 && h2(function() {
          for (var t3 = new w2(), e3 = 5; e3--; ) t3[y2](e3, e3);
          return !t3.has(-0);
        });
        I2 || ((O2 = m2(function(t3, e3) {
          a2(t3, S2);
          var n3 = p2(new w2(), t3, O2);
          return u2(e3) || s2(e3, n3[y2], { that: n3, AS_ENTRIES: b2 }), n3;
        })).prototype = S2, S2.constructor = O2), (E2 || L2) && (x2("delete"), x2("has"), b2 && x2("get")), (L2 || C2) && x2(y2), g2 && S2.clear && delete S2.clear;
      }
      return k2[v2] = O2, t2({ global: true, constructor: true, forced: O2 !== w2 }, k2), d2(O2, v2), g2 || _2.setStrong(O2, v2, b2), O2;
    };
  }
  function pl() {
    if (ol) return rl;
    ol = 1;
    var t2 = Pt(), e2 = Ou(), n2 = fl().getWeakData, i2 = qo(), r2 = Ge(), o2 = jt(), s2 = Ft(), a2 = Ts(), c2 = Ni(), u2 = Ae(), l2 = pn(), h2 = l2.set, f2 = l2.getterFor, d2 = c2.find, p2 = c2.findIndex, v2 = t2([].splice), m2 = 0, _2 = function(t3) {
      return t3.frozen || (t3.frozen = new b2());
    }, b2 = function() {
      this.entries = [];
    }, g2 = function(t3, e3) {
      return d2(t3.entries, function(t4) {
        return t4[0] === e3;
      });
    };
    return b2.prototype = { get: function(t3) {
      var e3 = g2(this, t3);
      if (e3) return e3[1];
    }, has: function(t3) {
      return !!g2(this, t3);
    }, set: function(t3, e3) {
      var n3 = g2(this, t3);
      n3 ? n3[1] = e3 : this.entries.push([t3, e3]);
    }, delete: function(t3) {
      var e3 = p2(this.entries, function(e4) {
        return e4[0] === t3;
      });
      return ~e3 && v2(this.entries, e3, 1), !!~e3;
    } }, rl = { getConstructor: function(t3, c3, l3, d3) {
      var p3 = t3(function(t4, e3) {
        i2(t4, v3), h2(t4, { type: c3, id: m2++, frozen: null }), o2(e3) || a2(e3, t4[d3], { that: t4, AS_ENTRIES: l3 });
      }), v3 = p3.prototype, b3 = f2(c3), g3 = function(t4, e3, i3) {
        var o3 = b3(t4), s3 = n2(r2(e3), true);
        return true === s3 ? _2(o3).set(e3, i3) : s3[o3.id] = i3, t4;
      };
      return e2(v3, { delete: function(t4) {
        var e3 = b3(this);
        if (!s2(t4)) return false;
        var i3 = n2(t4);
        return true === i3 ? _2(e3).delete(t4) : i3 && u2(i3, e3.id) && delete i3[e3.id];
      }, has: function(t4) {
        var e3 = b3(this);
        if (!s2(t4)) return false;
        var i3 = n2(t4);
        return true === i3 ? _2(e3).has(t4) : i3 && u2(i3, e3.id);
      } }), e2(v3, l3 ? { get: function(t4) {
        var e3 = b3(this);
        if (s2(t4)) {
          var i3 = n2(t4);
          if (true === i3) return _2(e3).get(t4);
          if (i3) return i3[e3.id];
        }
      }, set: function(t4, e3) {
        return g3(this, t4, e3);
      } } : { add: function(t4) {
        return g3(this, t4, true);
      } }), p3;
    } };
  }
  al || (al = 1, (function() {
    if (sl) return Ju;
    sl = 1;
    var t2, e2 = Zu(), n2 = C(), i2 = Pt(), r2 = Ou(), o2 = fl(), s2 = dl(), a2 = pl(), c2 = Ft(), u2 = pn().enforce, l2 = R(), h2 = hn(), f2 = Object, d2 = Array.isArray, p2 = f2.isExtensible, v2 = f2.isFrozen, m2 = f2.isSealed, _2 = f2.freeze, b2 = f2.seal, g2 = !n2.ActiveXObject && "ActiveXObject" in n2, y2 = function(t3) {
      return function() {
        return t3(this, arguments.length ? arguments[0] : void 0);
      };
    }, w2 = s2("WeakMap", y2, a2), S2 = w2.prototype, O2 = i2(S2.set);
    if (h2) if (g2) {
      t2 = a2.getConstructor(y2, "WeakMap", true), o2.enable();
      var k2 = i2(S2.delete), x2 = i2(S2.has), A2 = i2(S2.get);
      r2(S2, { delete: function(e3) {
        if (c2(e3) && !p2(e3)) {
          var n3 = u2(this);
          return n3.frozen || (n3.frozen = new t2()), k2(this, e3) || n3.frozen.delete(e3);
        }
        return k2(this, e3);
      }, has: function(e3) {
        if (c2(e3) && !p2(e3)) {
          var n3 = u2(this);
          return n3.frozen || (n3.frozen = new t2()), x2(this, e3) || n3.frozen.has(e3);
        }
        return x2(this, e3);
      }, get: function(e3) {
        if (c2(e3) && !p2(e3)) {
          var n3 = u2(this);
          return n3.frozen || (n3.frozen = new t2()), x2(this, e3) ? A2(this, e3) : n3.frozen.get(e3);
        }
        return A2(this, e3);
      }, set: function(e3, n3) {
        if (c2(e3) && !p2(e3)) {
          var i3 = u2(this);
          i3.frozen || (i3.frozen = new t2()), x2(this, e3) ? O2(this, e3, n3) : i3.frozen.set(e3, n3);
        } else O2(this, e3, n3);
        return this;
      } });
    } else e2 && l2(function() {
      var t3 = _2([]);
      return O2(new w2(), t3, 1), !v2(t3);
    }) && r2(S2, { set: function(t3, e3) {
      var n3;
      return d2(t3) && (v2(t3) ? n3 = _2 : m2(t3) && (n3 = b2)), O2(this, t3, e3), n3 && n3(t3), this;
    } });
  })());
  var vl, ml;
  ml || (ml = 1, vl || (vl = 1, dl()("WeakSet", function(t2) {
    return function() {
      return t2(this, arguments.length ? arguments[0] : void 0);
    };
  }, pl())));
  var _l = /* @__PURE__ */ new WeakMap(), bl = /* @__PURE__ */ new WeakMap(), gl = /* @__PURE__ */ new WeakMap(), yl = /* @__PURE__ */ new WeakMap(), wl = /* @__PURE__ */ new WeakMap(), Sl = /* @__PURE__ */ new WeakMap(), Ol = /* @__PURE__ */ new WeakMap(), kl = /* @__PURE__ */ new WeakMap(), xl = /* @__PURE__ */ new WeakMap(), Al = /* @__PURE__ */ new WeakMap(), Cl = /* @__PURE__ */ new WeakSet(), El = (function() {
    return h(function t3() {
      var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      o(this, t3), u(this, Cl), a(this, _l, void 0), a(this, bl, void 0), a(this, gl, void 0), a(this, yl, void 0), a(this, wl, void 0), a(this, Sl, void 0), a(this, Ol, void 0), a(this, kl, void 0), a(this, xl, void 0), a(this, Al, void 0), c(_l, this, e2.maxRetries || 5), c(bl, this, e2.initialDelay || 1e3), c(gl, this, e2.maxDelay || 5e3), c(yl, this, e2.backoffFactor || 2), c(wl, this, e2.retryOn || [429, 502, 503, 504]), c(Sl, this, 10), c(Ol, this, 5e3), c(kl, this, []), c(xl, this, 0), c(Al, this, 0);
    }, [{ key: "fetchWithRetry", value: (t2 = i(m().m(function t3(n2, i2, r2) {
      var o2, a2, c2, u2, l2;
      return m().w(function(t4) {
        for (; ; ) switch (t4.p = t4.n) {
          case 0:
            return t4.p = 0, t4.n = 1, e(Cl, this, Ll).call(this);
          case 1:
            return t4.n = 2, fetch(n2, { headers: i2 });
          case 2:
            if (!(o2 = t4.v).ok) {
              t4.n = 3;
              break;
            }
            return t4.a(2, o2);
          case 3:
            if (!(s(wl, this).includes(o2.status) && r2 < s(_l, this))) {
              t4.n = 5;
              break;
            }
            return a2 = e(Cl, this, Tl).call(this, r2, o2), console.log("Attempt ".concat(r2 + 1, "/").concat(s(_l, this), " failed with ").concat(o2.status, ". Retrying in ").concat(a2, "ms")), t4.n = 4, e(Cl, this, Nl).call(this, a2);
          case 4:
          case 8:
            return t4.a(2, this.fetchWithRetry(n2, i2, r2 + 1));
          case 5:
            throw new Error("".concat(o2.status, " ").concat(o2.statusText));
          case 6:
            if (t4.p = 6, l2 = t4.v, !(r2 >= s(_l, this))) {
              t4.n = 7;
              break;
            }
            throw c2 = "", l2 instanceof Error && (c2 = l2.message), new Error("Request failed after ".concat(s(_l, this), " attempts: ").concat(c2));
          case 7:
            if (!(r2 < s(_l, this))) {
              t4.n = 9;
              break;
            }
            return u2 = e(Cl, this, Tl).call(this, r2), console.log("Network error on attempt ".concat(r2 + 1, ". Retrying in ").concat(u2, "ms")), t4.n = 8, e(Cl, this, Nl).call(this, u2);
          case 9:
            throw l2;
          case 10:
            return t4.a(2);
        }
      }, t3, this, [[0, 6]]);
    })), function(e2, n2, i2) {
      return t2.apply(this, arguments);
    }) }, { key: "resetCounter", value: function() {
      c(kl, this, []), c(xl, this, 0), c(Al, this, 0);
    } }]);
    var t2;
  })();
  function Il() {
    var t2 = this, e2 = Date.now();
    c(kl, this, s(kl, this).filter(function(n2) {
      return e2 - n2 < s(Ol, t2);
    }));
  }
  function Ll() {
    return Pl.apply(this, arguments);
  }
  function Pl() {
    return (Pl = i(m().m(function t2() {
      var n2, i2, r2, o2, a2;
      return m().w(function(t3) {
        for (; ; ) switch (t3.n) {
          case 0:
            if (e(Cl, this, Il).call(this), !(s(kl, this).length >= s(Sl, this))) {
              t3.n = 2;
              break;
            }
            if (i2 = s(kl, this)[0], !(Date.now() - i2 < s(Ol, this))) {
              t3.n = 2;
              break;
            }
            return (r2 = 500 * s(kl, this).length - s(Sl, this)) < 0 && (r2 = 0, console.warn("Wait time is less than 0")), console.log("Rate limit prevention: ".concat(s(kl, this).length, " requests in last ").concat(s(Ol, this), "ms. Waiting ").concat(r2, "ms...")), t3.n = 1, e(Cl, this, Nl).call(this, r2);
          case 1:
            e(Cl, this, Il).call(this);
          case 2:
            if (s(kl, this).push(Date.now()), c(xl, this, (n2 = s(xl, this), ++n2)), o2 = Date.now(), a2 = o2 - s(Al, this), !(a2 < 100 && s(Al, this) > 0)) {
              t3.n = 3;
              break;
            }
            return t3.n = 3, e(Cl, this, Nl).call(this, 100 - a2);
          case 3:
            c(Al, this, Date.now());
          case 4:
            return t3.a(2);
        }
      }, t2, this);
    }))).apply(this, arguments);
  }
  function Tl(t2) {
    var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n2 = null == e2 ? void 0 : e2.headers.get("Retry-After");
    if (n2) {
      var i2 = parseInt(n2);
      if (i2 > 86400) {
        var r2 = 1e3 * parseInt(n2);
        return Math.max(0, r2 - Date.now());
      }
      return 1e3 * i2;
    }
    var o2 = s(bl, this) * Math.pow(s(yl, this), t2), a2 = 1e3 * Math.random();
    return Math.min(o2 + a2, s(gl, this));
  }
  function Nl(t2) {
    return new Promise(function(e2) {
      return setTimeout(e2, t2);
    });
  }
  var jl = function() {
    this._apiKey = null, this._userId = 0, this._userGroups = [], this._isOnlineAvailable = true, this._fetcher = new El({ maxRetries: 5, initialDelay: 5e3 });
  };
  jl.prototype.ZOTERO_API_VERSION = "3", jl.prototype.USER_AGENT = "AscDesktopEditor", jl.prototype.DEFAULT_FORMAT = "csljson", jl.prototype.STORAGE_KEYS = { USER_ID: "zoteroUserId", API_KEY: "zoteroApiKey" }, jl.prototype.API_PATHS = { USERS: "users", GROUPS: "groups", ITEMS: "items", KEYS: "keys" }, jl.prototype._getBaseUrl = function() {
    return this._isOnlineAvailable ? Vc : Gc;
  }, jl.prototype._getDesktopRequest = function(t2) {
    var e2 = this;
    return new Promise(function(n2, i2) {
      window.AscSimpleRequest.createRequest({ url: t2, method: "GET", headers: { "Zotero-API-Version": e2.ZOTERO_API_VERSION, "User-Agent": e2.USER_AGENT }, complete: n2, error: function(t3) {
        -102 === t3.statusCode && (t3.statusCode = 404, t3.message = "Connection to Zotero failed. Make sure Zotero is running"), i2(t3);
      } });
    });
  }, jl.prototype._getOnlineRequest = function(t2) {
    var e2 = { "Zotero-API-Version": this.ZOTERO_API_VERSION, "Zotero-API-Key": this._apiKey || "" };
    return fetch(t2, { headers: e2 }).then(function(t3) {
      if (!t3.ok) {
        var e3 = t3.status + " " + t3.statusText;
        throw console.error(e3), new Error(e3);
      }
      return t3;
    }).catch(function(t3) {
      throw "object" === w(t3) && (t3.message = "Connection to Zotero failed"), t3;
    });
  }, jl.prototype._getRequestWithOfflineSupport = function(t2) {
    return this._isOnlineAvailable ? this._getOnlineRequest(t2) : this._getDesktopRequest(t2.href);
  }, jl.prototype._buildGetRequest = function(t2, e2) {
    e2 = e2 || {};
    var n2 = new URL(t2, this._getBaseUrl());
    return Object.keys(e2).forEach(function(t3) {
      void 0 !== e2[t3] && null !== e2[t3] && n2.searchParams.append(t3, e2[t3]);
    }), this._getRequestWithOfflineSupport(n2);
  }, jl.prototype._parseLinkHeader = function(t2) {
    var e2, n2 = {}, i2 = /<(.*?)>; rel="(.*?)"/g;
    if (!t2) return n2;
    for (; null !== (e2 = i2.exec(t2.trim())); ) n2[e2[2]] = e2[1];
    return n2;
  }, jl.prototype._parseDesktopItemsResponse = function(t2, e2) {
    return t2.then(function(t3) {
      return { items: JSON.parse(t3.responseText), id: e2 };
    });
  }, jl.prototype._parseItemsResponse = function(t2, e2) {
    var n2 = this;
    return t2.then(function(t3) {
      return Promise.all([t3.json(), t3]);
    }).then(function(t3) {
      var i2 = t3[0], r2 = t3[1], o2 = n2._parseLinkHeader(r2.headers.get("Link") || ""), s2 = { items: i2, id: e2 };
      return "object" === w(i2) && i2.items && (s2.items = i2.items), o2.next && (s2.next = function() {
        return n2._parseItemsResponse(n2._getOnlineRequest(new URL(o2.next)), e2);
      }), s2;
    });
  }, jl.prototype._parseResponse = function(t2, e2) {
    if (this._isOnlineAvailable) {
      var n2 = t2;
      return this._parseItemsResponse(n2, e2);
    }
    var i2 = t2;
    return this._parseDesktopItemsResponse(i2, e2);
  }, jl.prototype.getItems = function(t2, e2, n2) {
    var i2 = this, r2 = { format: n2 = n2 || i2.DEFAULT_FORMAT, itemType: "-attachment" };
    t2 ? r2.q = t2 : e2 ? r2.itemKey = e2.join(",") : (r2.limit = 20, this._isOnlineAvailable || (r2.format = "json"));
    var o2 = i2.API_PATHS.USERS + "/" + i2._userId + "/" + i2.API_PATHS.ITEMS, s2 = i2._buildGetRequest(o2, r2);
    return i2._parseResponse(s2, i2._userId);
  }, jl.prototype.getGroupItems = function(t2, e2, n2, i2) {
    var r2 = this, o2 = { format: i2 = i2 || r2.DEFAULT_FORMAT };
    t2 ? o2.q = t2 : n2 && (o2.itemKey = n2.join(","));
    var s2 = r2.API_PATHS.GROUPS + "/" + e2 + "/" + r2.API_PATHS.ITEMS, a2 = r2._buildGetRequest(s2, o2);
    return r2._parseResponse(a2, e2);
  }, jl.prototype.getUserGroups = function() {
    var t2 = this;
    return new Promise(function(e2, n2) {
      if (t2._userGroups.length > 0) e2(t2._userGroups);
      else {
        var i2 = t2.API_PATHS.USERS + "/" + t2._userId + "/groups";
        t2._buildGetRequest(i2).then(function(e3) {
          if (t2._isOnlineAvailable) {
            var n3 = e3;
            if (!n3.ok) throw new Error(n3.status + " " + n3.statusText);
            return n3.json();
          }
          var i3 = e3;
          return JSON.parse(i3.responseText);
        }).then(function(n3) {
          t2._userGroups = n3.map(function(t3) {
            return { id: t3.id, name: t3.data.name };
          }), e2(t2._userGroups);
        }).catch(n2);
      }
    });
  }, jl.prototype.setApiKey = function(t2) {
    var e2 = this, n2 = this.API_PATHS.KEYS + "/" + t2;
    return this._buildGetRequest(n2).then(function(t3) {
      var e3 = t3;
      if (!e3.ok) throw new Error(e3.status + " " + e3.statusText);
      return e3.json();
    }).then(function(n3) {
      return e2._saveSettings(n3.userID, t2), true;
    });
  }, jl.prototype._applySettings = function(t2, e2) {
    this._userId = t2, this._apiKey = e2;
  }, jl.prototype._saveSettings = function(t2, e2) {
    this._applySettings(t2, e2), localStorage.setItem(this.STORAGE_KEYS.USER_ID, String(t2)), localStorage.setItem(this.STORAGE_KEYS.API_KEY, e2);
  }, jl.prototype.hasSettings = function() {
    var t2 = localStorage.getItem(this.STORAGE_KEYS.USER_ID), e2 = localStorage.getItem(this.STORAGE_KEYS.API_KEY);
    return !(!t2 || !e2) && (this._applySettings(Number(t2), e2), true);
  }, jl.prototype.clearSettings = function() {
    localStorage.removeItem(this.STORAGE_KEYS.USER_ID), localStorage.removeItem(this.STORAGE_KEYS.API_KEY), this._userGroups = [], this._userId = 0, this._apiKey = null;
  }, jl.prototype.getUserId = function() {
    return this._userId;
  }, jl.prototype.setIsOnlineAvailable = function(t2) {
    this._isOnlineAvailable = t2;
  };
  var Ml, Dl = {};
  !(function() {
    if (Ml) return Dl;
    Ml = 1;
    var t2 = un().PROPER, e2 = mn(), n2 = Ge(), i2 = ua(), r2 = R(), o2 = Ua(), s2 = "toString", a2 = RegExp.prototype, c2 = a2[s2], u2 = r2(function() {
      return "/a/b" !== c2.call({ source: "a", flags: "b" });
    }), l2 = t2 && c2.name !== s2;
    (u2 || l2) && e2(a2, s2, function() {
      var t3 = n2(this);
      return "/" + i2(t3.source) + "/" + i2(o2(t3));
    }, { unsafe: true });
  })();
  var Rl, Fl = {};
  !(function() {
    if (Rl) return Fl;
    Rl = 1;
    var t2 = ki(), e2 = Ci(), n2 = Li(), i2 = Ft(), r2 = Dn(), o2 = Fn(), s2 = Dt(), a2 = lu(), c2 = Ee(), u2 = ji(), l2 = $o(), h2 = u2("slice"), f2 = c2("species"), d2 = Array, p2 = Math.max;
    t2({ target: "Array", proto: true, forced: !h2 }, { slice: function(t3, c3) {
      var u3, h3, v2, m2 = s2(this), _2 = o2(m2), b2 = r2(t3, _2), g2 = r2(void 0 === c3 ? _2 : c3, _2);
      if (e2(m2) && (u3 = m2.constructor, (n2(u3) && (u3 === d2 || e2(u3.prototype)) || i2(u3) && null === (u3 = u3[f2])) && (u3 = void 0), u3 === d2 || void 0 === u3)) return l2(m2, b2, g2);
      for (h3 = new (void 0 === u3 ? d2 : u3)(p2(g2 - b2, 0)), v2 = 0; b2 < g2; b2++, v2++) b2 in m2 && a2(h3, v2, m2[b2]);
      return h3.length = v2, h3;
    } });
  })();
  var Ul, Bl, Hl, Vl = {};
  function Gl() {
    if (Bl) return Ul;
    Bl = 1;
    var t2 = ze().f;
    return Ul = function(e2, n2, i2) {
      i2 in e2 || t2(e2, i2, { configurable: true, get: function() {
        return n2[i2];
      }, set: function(t3) {
        n2[i2] = t3;
      } });
    };
  }
  !(function() {
    if (Hl) return Vl;
    Hl = 1;
    var t2 = F(), e2 = C(), n2 = Pt(), i2 = Oi(), r2 = Kc(), o2 = We(), s2 = Sr(), a2 = Vn().f, c2 = Bt(), u2 = Gu(), l2 = ua(), h2 = Ua(), f2 = ha(), d2 = Gl(), p2 = mn(), v2 = R(), m2 = Ae(), _2 = pn().enforce, b2 = Ko(), g2 = Ee(), y2 = fa(), w2 = da(), S2 = g2("match"), O2 = e2.RegExp, k2 = O2.prototype, x2 = e2.SyntaxError, A2 = n2(k2.exec), E2 = n2("".charAt), I2 = n2("".replace), L2 = n2("".indexOf), P2 = n2("".slice), T2 = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/, N2 = /a/g, j2 = /a/g, M2 = new O2(N2) !== N2, D2 = f2.MISSED_STICKY, U2 = f2.UNSUPPORTED_Y, B2 = t2 && (!M2 || D2 || y2 || w2 || v2(function() {
      return j2[S2] = false, O2(N2) !== N2 || O2(j2) === j2 || "/a/i" !== String(O2(N2, "i"));
    }));
    if (i2("RegExp", B2)) {
      for (var H2 = function(t3, e3) {
        var n3, i3, a3, f3, d3, p3, v3 = c2(k2, this), b3 = u2(t3), g3 = void 0 === e3, S3 = [], C2 = t3;
        if (!v3 && b3 && g3 && t3.constructor === H2) return t3;
        if ((b3 || c2(k2, t3)) && (t3 = t3.source, g3 && (e3 = h2(C2))), t3 = void 0 === t3 ? "" : l2(t3), e3 = void 0 === e3 ? "" : l2(e3), C2 = t3, y2 && "dotAll" in N2 && (i3 = !!e3 && L2(e3, "s") > -1) && (e3 = I2(e3, /s/g, "")), n3 = e3, D2 && "sticky" in N2 && (a3 = !!e3 && L2(e3, "y") > -1) && U2 && (e3 = I2(e3, /y/g, "")), w2 && (f3 = (function(t4) {
          for (var e4, n4 = t4.length, i4 = 0, r3 = "", o3 = [], a4 = s2(null), c3 = false, u3 = false, l3 = 0, h3 = ""; i4 <= n4; i4++) {
            if ("\\" === (e4 = E2(t4, i4))) e4 += E2(t4, ++i4);
            else if ("]" === e4) c3 = false;
            else if (!c3) switch (true) {
              case "[" === e4:
                c3 = true;
                break;
              case "(" === e4:
                if (r3 += e4, "?:" === P2(t4, i4 + 1, i4 + 3)) continue;
                A2(T2, P2(t4, i4 + 1)) && (i4 += 2, u3 = true), l3++;
                continue;
              case (">" === e4 && u3):
                if ("" === h3 || m2(a4, h3)) throw new x2("Invalid capture group name");
                a4[h3] = true, o3[o3.length] = [h3, l3], u3 = false, h3 = "";
                continue;
            }
            u3 ? h3 += e4 : r3 += e4;
          }
          return [r3, o3];
        })(t3), t3 = f3[0], S3 = f3[1]), d3 = r2(O2(t3, e3), v3 ? this : k2, H2), (i3 || a3 || S3.length) && (p3 = _2(d3), i3 && (p3.dotAll = true, p3.raw = H2((function(t4) {
          for (var e4, n4 = t4.length, i4 = 0, r3 = "", o3 = false; i4 <= n4; i4++) "\\" !== (e4 = E2(t4, i4)) ? o3 || "." !== e4 ? ("[" === e4 ? o3 = true : "]" === e4 && (o3 = false), r3 += e4) : r3 += "[\\s\\S]" : r3 += e4 + E2(t4, ++i4);
          return r3;
        })(t3), n3)), a3 && (p3.sticky = true), S3.length && (p3.groups = S3)), t3 !== C2) try {
          o2(d3, "source", "" === C2 ? "(?:)" : C2);
        } catch (t4) {
        }
        return d3;
      }, V2 = a2(O2), G2 = 0; V2.length > G2; ) d2(H2, O2, V2[G2++]);
      k2.constructor = H2, H2.prototype = k2, p2(e2, "RegExp", H2, { constructor: true });
    }
    b2("RegExp");
  })();
  var zl, Wl, Kl, ql = {};
  function Jl() {
    return Wl ? zl : (Wl = 1, zl = Object.is || function(t2, e2) {
      return t2 === e2 ? 0 !== t2 || 1 / t2 == 1 / e2 : t2 != t2 && e2 != e2;
    });
  }
  function Zl(t2, e2) {
    var n2 = this;
    if (e2 = e2 || {}, "string" == typeof t2) {
      var i2 = document.getElementById(t2);
      i2 instanceof HTMLInputElement && (t2 = i2);
    }
    if (!(t2 instanceof HTMLInputElement)) throw new Error("Invalid input element");
    for (var r2 in this.input = t2, this._container = document.createElement("div"), this._options = { type: e2.type || t2.type || "text", placeholder: e2.placeholder || t2.placeholder || "", value: e2.value || t2.value || "", autofocus: e2.autofocus || false, disabled: e2.disabled || false, readonly: e2.readonly || false, required: e2.required || false, showCounter: e2.showCounter || false, showClear: void 0 === e2.showClear || e2.showClear, autocomplete: e2.autocomplete || "off" }, e2) this._options.hasOwnProperty(r2) || (this._options[r2] = e2[r2]);
    this._id = t2.id || "input_" + Math.random().toString(36).slice(2, 9), this.isFocused = false, this.isValid = true, this._validationMessage = "", this._subscribers = [], this._boundHandles = { focus: function(t3) {
      n2._handleFocus(t3);
    }, blur: function(t3) {
      n2._handleBlur(t3);
    }, input: function(t3) {
      n2._handleInput(t3);
    }, keydown: function(t3) {
      n2._handleKeydown(t3);
    }, clear: function() {
      n2.clear();
    }, validate: function() {
      n2.validate();
    } }, this._clearButton = null, this._counter = null, this._counterCurrent = null, this._counterMax = null, this._validationElement = document.createElement("div"), "search" === this._options.type && (this._searchIcon = document.createElement("span"), this._boundHandles.search = this._triggerSubmit.bind(this), this._container.classList.add("input-field-search")), this._createDOM(), this._bindEvents(), this._updateState(), this._options.autofocus && setTimeout(/* @__PURE__ */ (function(t3) {
      return function() {
        t3.focus();
      };
    })(this), 100);
  }
  !(function() {
    if (Kl) return ql;
    Kl = 1;
    var t2 = B(), e2 = Da(), n2 = Ge(), i2 = Ft(), r2 = Mt(), o2 = Jl(), s2 = ua(), a2 = Jt(), c2 = Ba();
    e2("search", function(e3, u2, l2) {
      return [function(n3) {
        var o3 = r2(this), c3 = i2(n3) ? a2(n3, e3) : void 0;
        return c3 ? t2(c3, n3, o3) : new RegExp(n3)[e3](s2(o3));
      }, function(t3) {
        var e4 = n2(this), i3 = s2(t3), r3 = l2(u2, e4, i3);
        if (r3.done) return r3.value;
        var a3 = e4.lastIndex;
        o2(a3, 0) || (e4.lastIndex = 0);
        var h2 = c2(e4, i3);
        return o2(e4.lastIndex, a3) || (e4.lastIndex = a3), null === h2 ? -1 : h2.index;
      }];
    });
  })(), Zl.prototype = { constructor: Zl, input: null, _container: null, _options: {}, _id: "", isFocused: false, isValid: true, _validationMessage: "", _subscribers: [], _boundHandles: null, _clearButton: null, _counter: null, _counterCurrent: null, _counterMax: null, _validationElement: null, _createDOM: function() {
    var t2 = this.input.parentNode, e2 = document.createDocumentFragment();
    e2.appendChild(this._container), this._container.className += " input-field-container  input-field-container-" + this._id;
    var n2 = document.createElement("div");
    this._container.appendChild(n2), n2.className += " input-field", this._options.disabled && (n2.className += " input-field-disabled");
    var i2 = document.createElement("div");
    if (n2.appendChild(i2), i2.className += " input-field-main", this.input.className += " input-field-element", this.input.type = this._options.type || "text", this.input.placeholder = this._options.placeholder || "", this.input.value = String(this._options.value) || "", this._options.disabled && (this.input.disabled = true), this._options.readonly && (this.input.readOnly = true), this._options.required && (this.input.required = true), this._options.maxLength && (this.input.maxLength = this._options.maxLength), this._options.pattern && (this.input.pattern = this._options.pattern), this._options.autocomplete && (this.input.autocomplete = this._options.autocomplete), this._options.showCounter) {
      this._counter = document.createElement("div"), n2.appendChild(this._counter), this._counter.className += " input-field-counter", this._counterCurrent = document.createElement("span"), this._counterCurrent.className += " input-field-counter-current", this._counterCurrent.textContent = "0", this._counter.appendChild(this._counterCurrent);
      var r2 = document.createElement("span");
      r2.textContent = "/", this._counter.appendChild(r2), this._counterMax = document.createElement("span"), this._counterMax.className += " input-field-counter-max", this._counterMax.textContent = String(this._options.maxLength) || "∞", this._counter.appendChild(this._counterMax);
    }
    n2.appendChild(this._validationElement), this._validationElement.className += " input-field-validation", this._validationElement.style.display = "none", this._options.showClear && (this.input.className += " input-field-clearable", this._clearButton = document.createElement("button"), n2.appendChild(this._clearButton), this._clearButton.className += " input-field-clear", this._clearButton.style.display = "none", this._clearButton.textContent = "×"), this._options.showSearchIcon && (this._searchIcon.classList.add("input-field-search-icon"), this._searchIcon.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 5.5C10 7.98528 7.98528 10 5.5 10C3.01472 10 1 7.98528 1 5.5C1 3.01472 3.01472 1 5.5 1C7.98528 1 10 3.01472 10 5.5ZM9.01953 9.72663C8.06578 10.5217 6.83875 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.83875 10.5217 8.06578 9.72663 9.01953L13.8536 13.1465L13.1465 13.8536L9.01953 9.72663Z" fill="currentColor"/></svg>', i2.appendChild(this._searchIcon)), t2 && t2.insertBefore(e2, this.input), i2.appendChild(this.input);
  }, _bindEvents: function() {
    this.input.addEventListener("focus", this._boundHandles.focus), this.input.addEventListener("blur", this._boundHandles.blur), this.input.addEventListener("input", this._boundHandles.input), this.input.addEventListener("keydown", this._boundHandles.keydown), this._clearButton && this._clearButton.addEventListener("click", this._boundHandles.clear), this._options.showSearchIcon && this._boundHandles.search && this._searchIcon.addEventListener("click", this._boundHandles.search), this.input.addEventListener("change", this._boundHandles.validate);
  }, _handleFocus: function(t2) {
    this.isFocused = true, this._container.className += " input-field-focused", this._updateClearButton(), this._triggerFocusEvent(t2);
  }, _handleBlur: function(t2) {
    this.isFocused = false;
    for (var e2 = this._container.className.split(" "), n2 = [], i2 = 0; i2 < e2.length; i2++) "input-field-focused" !== e2[i2] && n2.push(e2[i2]);
    this._container.className = n2.join(" "), this.validate(), this._triggerBlurEvent(t2);
  }, _handleInput: function(t2) {
    this._updateClearButton(), this._updateCounter(), this._triggerInputEvent(t2);
  }, _handleKeydown: function(t2) {
    var e2 = t2.key || t2.keyCode;
    "Escape" !== e2 && 27 !== e2 || !this._options.showClear || (this.clear(), t2.preventDefault()), "Enter" !== e2 && 13 !== e2 || this._triggerSubmit();
  }, _updateClearButton: function() {
    if (this._clearButton) {
      var t2 = this.input.value.length > 0;
      this._clearButton.style.display = t2 ? "block" : "none";
    }
  }, _updateCounter: function() {
    if (this._counter && this._options.maxLength) {
      var t2 = this.input.value.length, e2 = this._options.maxLength;
      if (this._counterCurrent && (this._counterCurrent.textContent = String(t2)), this._counterMax && (this._counterMax.textContent = String(e2)), t2 > 0.9 * e2) -1 === this._counter.className.split(" ").indexOf("input-field-counter-warning") && (this._counter.className += " input-field-counter-warning");
      else this._counter.className = this._counter.className.split(" ").filter(function(t3) {
        return "input-field-counter-warning" !== t3;
      }).join(" ");
      if (t2 > e2) -1 === this._counter.className.split(" ").indexOf("input-field-counter-error") && (this._counter.className += " input-field-counter-error");
      else this._counter.className = this._counter.className.split(" ").filter(function(t3) {
        return "input-field-counter-error" !== t3;
      }).join(" ");
    }
  }, validate: function() {
    if (!this._options.validation) return this.isValid = true, true;
    var t2 = this.input.value, e2 = true, n2 = "";
    if (this._options.required && !t2.trim() ? (e2 = false, n2 = "This field is required") : this._options.minLength && t2.length < this._options.minLength ? (e2 = false, n2 = "Minimum length is " + this._options.minLength + " characters") : this._options.maxLength && t2.length > this._options.maxLength ? (e2 = false, n2 = "Maximum length is " + this._options.maxLength + " characters") : this._options.pattern && !new RegExp(this._options.pattern).test(t2) && (e2 = false, n2 = "Invalid format"), e2 && "function" == typeof this._options.validation) {
      var i2 = this._options.validation(t2);
      i2 && !i2.isValid && (e2 = false, n2 = i2.message || "Invalid value");
    }
    return this.isValid = e2, this._validationMessage = n2, this.updateValidationState(), e2;
  }, updateValidationState: function() {
    if (this.isValid) if (this.input.value.length > 0) {
      this._validationElement.style.display = "none", -1 === this._container.className.split(" ").indexOf("input-field-valid") && (this._container.className += " input-field-valid"), this._container.className = this._container.className.split(" ").filter(function(t2) {
        return "input-field-invalid" !== t2;
      }).join(" ");
    } else this._validationElement.style.display = "none", this._container.className = this._container.className.split(" ").filter(function(t2) {
      return "input-field-valid" !== t2 && "input-field-invalid" !== t2;
    }).join(" ");
    else this._validationElement.textContent = this._validationMessage, this._validationElement.style.display = "block", -1 === this._container.className.split(" ").indexOf("input-field-invalid") && (this._container.className += " input-field-invalid"), this._container.className = this._container.className.split(" ").filter(function(t2) {
      return "input-field-valid" !== t2;
    }).join(" ");
  }, _updateState: function() {
    this._updateClearButton(), this._updateCounter(), this.validate();
  }, getValue: function() {
    return this.input.value.trim();
  }, setValue: function(t2) {
    this.input.value = t2, this._updateState(), this._triggerChange();
  }, setPlaceholder: function(t2) {
    this.input.placeholder = t2, this._options.placeholder = t2;
  }, clear: function(t2) {
    t2 = void 0 === t2 || t2, this.setValue(""), t2 && this.input.focus();
  }, focus: function() {
    this.input.focus();
  }, blur: function() {
    this.input.blur();
  }, enable: function() {
    this.input.disabled = false, this._options.disabled = false, this._container.className = this._container.className.split(" ").filter(function(t2) {
      return "input-field-disabled" !== t2;
    }).join(" ");
  }, disable: function() {
    this.input.disabled = true, this._options.disabled = true, -1 === this._container.className.split(" ").indexOf("input-field-disabled") && (this._container.className += " input-field-disabled");
  }, subscribe: function(t2) {
    var e2 = this;
    return this._subscribers.push(t2), { unsubscribe: function() {
      e2._subscribers = e2._subscribers.filter(function(e3) {
        return e3 !== t2;
      });
    } };
  }, _triggerInputEvent: function(t2) {
    var e2 = { value: this.input.value, originalEvent: t2 };
    this._subscribers.forEach(function(t3) {
      t3({ type: "inputfield:input", detail: e2 });
    });
  }, _triggerFocusEvent: function(t2) {
    var e2 = { value: this.input.value, originalEvent: t2 };
    this._subscribers.forEach(function(t3) {
      t3({ type: "inputfield:focus", detail: e2 });
    });
  }, _triggerBlurEvent: function(t2) {
    var e2 = { value: this.input.value, originalEvent: t2 };
    this._subscribers.forEach(function(t3) {
      t3({ type: "inputfield:blur", detail: e2 });
    });
  }, _triggerChange: function() {
    var t2 = { value: this.input.value, isValid: this.isValid };
    this._subscribers.forEach(function(e2) {
      e2({ type: "inputfield:change", detail: t2 });
    });
  }, _triggerSubmit: function() {
    var t2 = { value: this.input.value, isValid: this.isValid };
    this._subscribers.forEach(function(e2) {
      e2({ type: "inputfield:submit", detail: t2 });
    });
  }, destroy: function() {
    if (this._subscribers = [], this._boundHandles) try {
      this.input.removeEventListener("focus", this._boundHandles.focus), this.input.removeEventListener("blur", this._boundHandles.blur), this.input.removeEventListener("input", this._boundHandles.input), this.input.removeEventListener("keydown", this._boundHandles.keydown), this._clearButton && this._clearButton.removeEventListener("click", this._boundHandles.clear), this._options.showSearchIcon && this._boundHandles.search && this._searchIcon.removeEventListener("click", this._boundHandles.search), this.input.removeEventListener("change", this._boundHandles.validate);
    } catch (t2) {
      console.error(t2);
    }
    this._container.innerHTML = "", this._container.className = this._container.className.split(" ").filter(function(t2) {
      return "input-field-container" !== t2;
    }).join(" ");
  } };
  var Yl, $l = {};
  function Xl(t2, e2) {
    if ("string" == typeof t2) {
      var n2 = document.getElementById(t2);
      n2 instanceof HTMLElement && (t2 = n2);
    }
    if (!(t2 instanceof HTMLElement)) throw new Error("Invalid container element");
    this.container = t2, this._options = Object.assign(this._options, e2), this._isShow = false;
  }
  function Ql(t2, e2) {
    var n2 = this;
    if ("string" == typeof t2) {
      var i2 = document.getElementById(t2);
      i2 instanceof HTMLButtonElement && (t2 = i2);
    }
    if (!(t2 instanceof HTMLButtonElement)) throw new Error("Invalid button");
    this._button = t2, this._container = document.createElement("div"), this._options = e2 || {}, this._options.text = this._options.text || t2.textContent.trim(), this._options.type = this._options.type || "button", this._options.variant = this._options.variant || "primary", this._options.size = this._options.size || "medium", this._options.iconPosition = this._options.iconPosition || "left", this.isLoading = false, this._originalText = this._options.text, this._subscribers = [], this._boundHandles = { click: function(t3) {
      n2._handleClick(t3);
    }, mouseenter: function() {
      n2._handleMouseEnter();
    }, mouseleave: function() {
      n2._handleMouseLeave();
    }, focus: function() {
      n2._handleFocus();
    }, blur: function() {
      n2._handleBlur();
    }, keydown: function(t3) {
      n2._handleKeydown(t3);
    } }, this._createDOM(), this._bindEvents(), this.updateState();
  }
  !(function() {
    if (Yl) return $l;
    Yl = 1;
    var t2 = ki(), e2 = cu();
    t2({ target: "Object", stat: true, arity: 2, forced: Object.assign !== e2 }, { assign: e2 });
  })(), Xl.prototype = { constructor: Xl, _options: { type: "info", text: "", title: "", duration: 0, closeButton: true, autoClose: false, closeOnClickOutside: true }, _outsideClickListener: null, _element: null, _timeoutId: null, _create: function() {
    var t2 = document.createElement("div");
    t2.className = "message message-" + this._options.type, t2.setAttribute("role", "alert");
    var e2 = this._options.title;
    if (!e2) switch (e2 = "Error", this._options.type) {
      case "success":
        e2 = "Success";
        break;
      case "warning":
        e2 = "Warning";
        break;
      case "info":
        e2 = "Information";
    }
    var n2 = this._options.text;
    if (!n2) switch (n2 = "", this._options.type) {
      case "success":
        n2 = "Operation completed successfully.";
        break;
      case "warning":
        n2 = "Please be cautious.";
        break;
      case "error":
        n2 = "Something went wrong.";
    }
    if (t2.innerHTML = '<div class="message-content"><span class="message-title">' + e2 + '</span><span class="message-text">' + n2 + "</span></div>", this._options.closeButton) {
      var i2 = document.createElement("button");
      i2.className = "message-close", i2.textContent = "×", i2.setAttribute("aria-label", "Close"), i2.onclick = this.close.bind(this), t2.appendChild(i2);
    }
    return t2;
  }, addOutsideClickListener: function() {
    this._outsideClickListener && document.removeEventListener("click", this._outsideClickListener);
    var t2 = this;
    this._outsideClickListener = function(e2) {
      e2.target instanceof HTMLElement != false && t2._element && !t2._element.contains(e2.target) && t2.close();
    }, setTimeout(function() {
      t2._outsideClickListener && document.addEventListener("click", t2._outsideClickListener);
    }, 10);
  }, removeOutsideClickListener: function() {
    this._outsideClickListener && (document.removeEventListener("click", this._outsideClickListener), this._outsideClickListener = null);
  }, show: function(t2, e2) {
    if (this._isShow) return this;
    this._isShow = true, this.container.classList.contains("message-container") || this.container.classList.add("message-container"), e2 && (this._options.title = e2), t2 && (this._options.text = t2);
    var n2 = this._create();
    return this._element = n2, this.container.appendChild(n2), setTimeout(function() {
      n2.style.opacity = "1", n2.style.transform = "translateY(0)";
    }, 10), this._options.autoClose && Number(this._options.duration) > 0 && (this._timeoutId = setTimeout(this.close.bind(this), this._options.duration)), this._options.closeOnClickOutside && this.addOutsideClickListener(), this;
  }, close: function() {
    if (this._isShow = false, this._element && this._element.parentNode) {
      this._timeoutId && (clearTimeout(this._timeoutId), this._timeoutId = null), this.removeOutsideClickListener();
      var t2 = this._element;
      t2.style.opacity = "0", t2.style.transform = "translateY(-20px)", setTimeout(function() {
        t2.parentNode && t2.parentNode.removeChild(t2);
      }, 300);
    }
  } }, Ql.prototype = { constructor: Ql, _button: null, _buttonText: null, _spinner: null, _badgeElement: null, _createDOM: function() {
    var t2 = this._button.parentNode, e2 = document.createDocumentFragment();
    if (e2.appendChild(this._container), this._container.className += " custom-button-container", this._button.className += " custom-button", this._button.className += " custom-button-" + this._options.variant, this._button.className += " custom-button-" + this._options.size, this._options.disabled && (this._button.className += " custom-button-disabled"), this._options.loading && (this._container.className += " custom-button-loading"), this._options.type && (this._button.type = this._options.type), this._options.tooltip && (this._button.title = this._options.tooltip), this._options.disabled && (this._button.disabled = true), this._options.text) if (this._button.textContent = "", this._buttonText = document.createElement("span"), this._buttonText.className = "custom-button-text", this._buttonText.textContent = this._options.text || "", this._options.icon) {
      var n2 = document.createElement("span");
      n2.className = "custom-button-icon", "left" === this._options.iconPosition ? (n2.className += " custom-button-icon-left", this._button.appendChild(n2), this._button.appendChild(this._buttonText)) : (n2.className += " custom-button-icon-right", this._button.appendChild(this._buttonText), this._button.appendChild(n2)), n2.innerHTML = this._options.icon;
    } else this._button.appendChild(this._buttonText);
    this._options.loading && (this._spinner = document.createElement("span"), this._spinner.className = "custom-button-spinner", this._button.appendChild(this._spinner)), this._options.badge && (this._badgeElement = document.createElement("span"), this._badgeElement.className = "custom-button-badge", this._badgeElement.textContent = this._options.badge, this._button.appendChild(this._badgeElement)), t2 && t2.insertBefore(e2, this._button), this._container.appendChild(this._button);
  }, _bindEvents: function() {
    this._button.addEventListener("click", this._boundHandles.click), this._button.addEventListener("mouseenter", this._boundHandles.mouseenter), this._button.addEventListener("mouseleave", this._boundHandles.mouseleave), this._button.addEventListener("focus", this._boundHandles.focus), this._button.addEventListener("blur", this._boundHandles.blur), this._button.addEventListener("keydown", this._boundHandles.keydown);
  }, _handleClick: function(t2) {
    if (this._options.disabled || this.isLoading) return t2.preventDefault(), void t2.stopPropagation();
    this.triggerClickEvent(t2);
  }, _handleMouseEnter: function() {
    -1 === this._button.className.split(" ").indexOf("custom-button-hover") && (this._button.className += " custom-button-hover"), this.triggerEvent("mouseenter");
  }, _handleMouseLeave: function() {
    this._button.className = this._button.className.split(" ").filter(function(t2) {
      return "custom-button-hover" !== t2;
    }).join(" "), this.triggerEvent("mouseleave");
  }, _handleFocus: function() {
    -1 === this._button.className.split(" ").indexOf("custom-button-focused") && (this._button.className += " custom-button-focused"), this.triggerEvent("focus");
  }, _handleBlur: function() {
    this._button.className = this._button.className.split(" ").filter(function(t2) {
      return "custom-button-focused" !== t2;
    }).join(" "), this.triggerEvent("blur");
  }, _handleKeydown: function(t2) {
    var e2 = t2.key || t2.keyCode;
    " " === e2 || "Enter" === e2 || 32 === e2 || 13 === e2 ? "BUTTON" === this._button.tagName || (t2.preventDefault(), this._button.click()) : "Escape" !== e2 && 27 !== e2 || this._button.blur(), this.triggerEvent("keydown", { key: e2 });
  }, subscribe: function(t2) {
    var e2 = this;
    return this._subscribers.push(t2), { unsubscribe: function() {
      e2._subscribers = e2._subscribers.filter(function(e3) {
        return e3 !== t2;
      });
    } };
  }, setText: function(t2) {
    void 0 !== t2 && (this._options.text = t2, this._buttonText || (this._buttonText = document.createElement("span"), this._buttonText.className = "custom-button-text", this._buttonText.textContent = "", this._button.appendChild(this._buttonText)), this._buttonText.textContent = t2);
  }, setIcon: function(t2, e2) {
    this._options.icon = t2, this._options.iconPosition = e2 || "left";
  }, setBadge: function(t2) {
    void 0 !== t2 && (this._options.badge = t2, this._badgeElement && (this._badgeElement.textContent = t2, this._badgeElement.style.display = t2 ? "flex" : "none"));
  }, setVariant: function(t2) {
    if (void 0 !== t2) {
      var e2 = "custom-button-" + this._options.variant, n2 = "custom-button-" + t2;
      this._button.className = this._button.className.split(" ").filter(function(t3) {
        return t3 !== e2;
      }).join(" ") + " " + n2, this._options.variant = t2;
    }
  }, setSize: function(t2) {
    if (void 0 !== t2) {
      var e2 = "custom-button-" + this._options.size, n2 = "custom-button-" + t2;
      this._button.className = this._button.className.split(" ").filter(function(t3) {
        return t3 !== e2;
      }).join(" ") + " " + n2, this._options.size = t2;
    }
  }, enable: function() {
    this._options.disabled = false, this._button.disabled = false, this._button.className = this._button.className.split(" ").filter(function(t2) {
      return "custom-button-disabled" !== t2;
    }).join(" ");
  }, disable: function() {
    this._options.disabled = true, this._button.disabled = true, -1 === this._button.className.split(" ").indexOf("custom-button-disabled") && (this._button.className += " custom-button-disabled");
  }, startLoading: function() {
    this.isLoading = true, void 0 !== this._options.text && (this._originalText = this._options.text), -1 === this._container.className.split(" ").indexOf("custom-button-loading") && (this._container.className += " custom-button-loading"), this._spinner && (this._spinner.style.display = "inline-block"), this._buttonText && (this._buttonText.textContent = "Loading..."), this._button.disabled = true;
  }, stopLoading: function() {
    this.isLoading = false, this._container.className = this._container.className.split(" ").filter(function(t2) {
      return "custom-button-loading" !== t2;
    }).join(" "), this._spinner && (this._spinner.style.display = "none"), this._buttonText && (this._buttonText.textContent = this._originalText), this._button.disabled = !!this._options.disabled;
  }, setTooltip: function(t2) {
    void 0 !== t2 && (this._options.tooltip = t2, this._button.title = t2 || "");
  }, triggerClickEvent: function(t2) {
    var e2 = { originalEvent: t2, button: this };
    this._subscribers.forEach(function(t3) {
      t3({ type: "button:click", detail: e2 });
    });
  }, triggerEvent: function(t2, e2) {
    (e2 = e2 || {}).button = this, this._subscribers.forEach(function(n2) {
      n2({ type: "button:" + t2, detail: e2 });
    });
  }, updateState: function() {
    this._options.disabled ? this.disable() : this.enable(), this._options.loading && this.startLoading();
  }, destroy: function() {
    if (this._subscribers = [], this._boundHandles) try {
      this._button.removeEventListener("click", this._boundHandles.click), this._button.removeEventListener("mouseenter", this._boundHandles.mouseenter), this._button.removeEventListener("mouseleave", this._boundHandles.mouseleave), this._button.removeEventListener("focus", this._boundHandles.focus), this._button.removeEventListener("blur", this._boundHandles.blur), this._button.removeEventListener("keydown", this._boundHandles.keydown);
    } catch (t3) {
      console.error(t3);
    }
    this._container.innerHTML = "";
    var t2 = this._container.className.split(" ").filter(function(t3) {
      return "custom-button-container" !== t3;
    }).join(" ");
    this._container.className = t2;
  } };
  var th, eh, nh, ih, rh, oh = {};
  function sh() {
    if (ih) return nh;
    ih = 1;
    var t2 = Kt(), e2 = TypeError;
    return nh = function(n2, i2) {
      if (!delete n2[i2]) throw new e2("Cannot delete property " + t2(i2) + " of " + t2(n2));
    };
  }
  !(function() {
    if (rh) return oh;
    rh = 1;
    var t2 = ki(), e2 = xe(), n2 = Dn(), i2 = Mn(), r2 = Fn(), o2 = (function() {
      if (eh) return th;
      eh = 1;
      var t3 = F(), e3 = Ci(), n3 = TypeError, i3 = Object.getOwnPropertyDescriptor, r3 = t3 && !(function() {
        if (void 0 !== this) return true;
        try {
          Object.defineProperty([], "length", { writable: false }).length = 1;
        } catch (t4) {
          return t4 instanceof TypeError;
        }
      })();
      return th = r3 ? function(t4, r4) {
        if (e3(t4) && !i3(t4, "length").writable) throw new n3("Cannot set read only .length");
        return t4.length = r4;
      } : function(t4, e4) {
        return t4.length = e4;
      };
    })(), s2 = ju(), a2 = Ti(), c2 = lu(), u2 = sh(), l2 = ji()("splice"), h2 = Math.max, f2 = Math.min;
    t2({ target: "Array", proto: true, forced: !l2 }, { splice: function(t3, l3) {
      var d2, p2, v2, m2, _2, b2, g2 = e2(this), y2 = r2(g2), w2 = n2(t3, y2), S2 = arguments.length;
      for (0 === S2 ? d2 = p2 = 0 : 1 === S2 ? (d2 = 0, p2 = y2 - w2) : (d2 = S2 - 2, p2 = f2(h2(i2(l3), 0), y2 - w2)), s2(y2 + d2 - p2), v2 = a2(g2, p2), m2 = 0; m2 < p2; m2++) (_2 = w2 + m2) in g2 && c2(v2, m2, g2[_2]);
      if (v2.length = p2, d2 < p2) {
        for (m2 = w2; m2 < y2 - p2; m2++) b2 = m2 + d2, (_2 = m2 + p2) in g2 ? g2[b2] = g2[_2] : u2(g2, b2);
        for (m2 = y2; m2 > y2 - p2 + d2; m2--) u2(g2, m2 - 1);
      } else if (d2 > p2) for (m2 = y2 - p2; m2 > w2; m2--) b2 = m2 + d2 - 1, (_2 = m2 + p2 - 1) in g2 ? g2[b2] = g2[_2] : u2(g2, b2);
      for (m2 = 0; m2 < d2; m2++) g2[m2 + w2] = arguments[m2 + 2];
      return o2(g2, y2 - p2 + d2), v2;
    } });
  })();
  var ah, ch, uh, lh;
  function hh() {
    if (ch) return ah;
    ch = 1;
    var t2 = Sr(), e2 = Kr(), n2 = Ou(), i2 = Ai(), r2 = qo(), o2 = jt(), s2 = Ts(), a2 = Tr(), c2 = Nr(), u2 = Ko(), l2 = F(), h2 = fl().fastKey, f2 = pn(), d2 = f2.set, p2 = f2.getterFor;
    return ah = { getConstructor: function(a3, c3, u3, f3) {
      var v2 = a3(function(e3, n3) {
        r2(e3, m2), d2(e3, { type: c3, index: t2(null), first: null, last: null, size: 0 }), l2 || (e3.size = 0), o2(n3) || s2(n3, e3[f3], { that: e3, AS_ENTRIES: u3 });
      }), m2 = v2.prototype, _2 = p2(c3), b2 = function(t3, e3, n3) {
        var i3, r3, o3 = _2(t3), s3 = g2(t3, e3);
        return s3 ? s3.value = n3 : (o3.last = s3 = { index: r3 = h2(e3, true), key: e3, value: n3, previous: i3 = o3.last, next: null, removed: false }, o3.first || (o3.first = s3), i3 && (i3.next = s3), l2 ? o3.size++ : t3.size++, "F" !== r3 && (o3.index[r3] = s3)), t3;
      }, g2 = function(t3, e3) {
        var n3, i3 = _2(t3), r3 = h2(e3);
        if ("F" !== r3) return i3.index[r3];
        for (n3 = i3.first; n3; n3 = n3.next) if (n3.key === e3) return n3;
      };
      return n2(m2, { clear: function() {
        for (var e3 = _2(this), n3 = e3.first; n3; ) n3.removed = true, n3.previous && (n3.previous = n3.previous.next = null), n3 = n3.next;
        e3.first = e3.last = null, e3.index = t2(null), l2 ? e3.size = 0 : this.size = 0;
      }, delete: function(t3) {
        var e3 = this, n3 = _2(e3), i3 = g2(e3, t3);
        if (i3) {
          var r3 = i3.next, o3 = i3.previous;
          delete n3.index[i3.index], i3.removed = true, o3 && (o3.next = r3), r3 && (r3.previous = o3), n3.first === i3 && (n3.first = r3), n3.last === i3 && (n3.last = o3), l2 ? n3.size-- : e3.size--;
        }
        return !!i3;
      }, forEach: function(t3) {
        for (var e3, n3 = _2(this), r3 = i2(t3, arguments.length > 1 ? arguments[1] : void 0); e3 = e3 ? e3.next : n3.first; ) for (r3(e3.value, e3.key, this); e3 && e3.removed; ) e3 = e3.previous;
      }, has: function(t3) {
        return !!g2(this, t3);
      } }), n2(m2, u3 ? { get: function(t3) {
        var e3 = g2(this, t3);
        return e3 && e3.value;
      }, set: function(t3, e3) {
        return b2(this, 0 === t3 ? 0 : t3, e3);
      } } : { add: function(t3) {
        return b2(this, t3 = 0 === t3 ? 0 : t3, t3);
      } }), l2 && e2(m2, "size", { configurable: true, get: function() {
        return _2(this).size;
      } }), v2;
    }, setStrong: function(t3, e3, n3) {
      var i3 = e3 + " Iterator", r3 = p2(e3), o3 = p2(i3);
      a2(t3, e3, function(t4, e4) {
        d2(this, { type: i3, target: t4, state: r3(t4), kind: e4, last: null });
      }, function() {
        for (var t4 = o3(this), e4 = t4.kind, n4 = t4.last; n4 && n4.removed; ) n4 = n4.previous;
        return t4.target && (t4.last = n4 = n4 ? n4.next : t4.state.first) ? c2("keys" === e4 ? n4.key : "values" === e4 ? n4.value : [n4.key, n4.value], false) : (t4.target = null, c2(void 0, true));
      }, n3 ? "entries" : "values", !n3, true), u2(e3);
    } }, ah;
  }
  lh || (lh = 1, uh || (uh = 1, dl()("Map", function(t2) {
    return function() {
      return t2(this, arguments.length ? arguments[0] : void 0);
    };
  }, hh())));
  var fh = /* @__PURE__ */ new WeakMap(), dh = /* @__PURE__ */ new WeakMap(), ph = /* @__PURE__ */ new WeakMap(), vh = /* @__PURE__ */ new WeakMap(), mh = /* @__PURE__ */ new WeakMap(), _h = /* @__PURE__ */ new WeakMap(), bh = /* @__PURE__ */ new WeakMap(), gh = /* @__PURE__ */ new WeakSet(), yh = (function() {
    return h(function t2(n2, i2) {
      if (o(this, t2), u(this, gh), a(this, fh, void 0), a(this, dh, void 0), a(this, ph, void 0), a(this, vh, null), a(this, mh, void 0), a(this, _h, /* @__PURE__ */ new Map()), a(this, bh, []), "string" == typeof n2) {
        var r2 = document.getElementById(n2);
        r2 instanceof HTMLInputElement && (n2 = r2);
      }
      if (!(n2 instanceof HTMLInputElement)) throw new Error("Invalid input element");
      if (c(dh, this, n2), c(mh, this, Object.assign({ id: "radio_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)), checked: false, disabled: false, indeterminate: false, label: "", name: "", value: "on" }, i2)), e(gh, this, wh).call(this), c(fh, this, document.createElement("div")), c(ph, this, document.createElement("span")), e(gh, this, Sh).call(this), e(gh, this, kh).call(this), e(gh, this, xh).call(this), !s(mh, this).name) throw new Error("Name attribute is required");
      var l2 = Ch._.get(s(mh, this).name);
      l2 || (l2 = new Array(), Ch._.set(s(mh, this).name, l2)), l2.push(this);
    }, [{ key: "subscribe", value: function(t2) {
      var e2 = this;
      return s(bh, this).push(t2), { unsubscribe: function() {
        c(bh, e2, s(bh, e2).filter(function(e3) {
          return e3 !== t2;
        }));
      } };
    } }, { key: "getElement", value: function() {
      return s(fh, this);
    } }, { key: "check", value: function(t2) {
      var n2 = this;
      if (!s(mh, this).disabled && !s(mh, this).checked) {
        if (s(mh, this).name) {
          var i2 = Ch._.get(s(mh, this).name);
          i2 && i2.forEach(function(t3) {
            t3 !== n2 && s(mh, t3).checked && t3.uncheck();
          });
        }
        s(mh, this).checked = true, e(gh, this, xh).call(this), t2 || e(gh, this, Ah).call(this);
      }
    } }, { key: "uncheck", value: function(t2) {
      !s(mh, this).disabled && s(mh, this).checked && (s(mh, this).checked = false, e(gh, this, xh).call(this), t2 || e(gh, this, Ah).call(this));
    } }, { key: "enable", value: function() {
      s(mh, this).disabled && (s(mh, this).disabled = false, s(dh, this).disabled = false, s(fh, this).setAttribute("aria-disabled", "false"), s(mh, this).checked ? s(fh, this).tabIndex = 0 : e(gh, this, Oh).call(this), s(fh, this).classList.remove("radio--disabled"));
    } }, { key: "disable", value: function() {
      s(mh, this).disabled || (s(mh, this).disabled = true, s(dh, this).disabled = true, s(fh, this).setAttribute("aria-disabled", "true"), s(fh, this).tabIndex = -1, s(fh, this).classList.add("radio--disabled"));
    } }, { key: "setLabel", value: function(t2) {
      s(mh, this).label = t2, s(vh, this) ? s(vh, this).textContent = t2 : t2 && (c(vh, this, document.createElement("label")), s(vh, this).className = "radio-label", s(vh, this).htmlFor = String(s(mh, this).id), s(vh, this).textContent = t2, s(fh, this).appendChild(s(vh, this)));
    } }, { key: "getState", value: function() {
      return { checked: !!s(mh, this).checked, disabled: !!s(mh, this).disabled, value: s(mh, this).value || "", name: s(mh, this).name || "" };
    } }, { key: "destroy", value: function() {
      var t2 = this;
      if (c(bh, this, []), s(mh, this).name) {
        var e2 = Ch._.get(s(mh, this).name);
        if (e2) {
          var n2 = e2.indexOf(this);
          n2 >= 0 && e2.splice(n2, 1);
        }
        s(_h, this).forEach(function(e3, n3) {
          s(fh, t2).removeEventListener(n3, e3);
        }), s(_h, this).clear(), s(fh, this) && s(fh, this).parentNode && s(fh, this).parentNode.removeChild(s(fh, this)), c(vh, this, null);
      }
    } }]);
  })();
  function wh() {
    s(dh, this).type = "radio";
    var t2 = s(dh, this).getAttribute("id"), e2 = s(dh, this).getAttribute("name"), n2 = s(dh, this).getAttribute("value"), i2 = s(dh, this).getAttribute("checked"), r2 = s(dh, this).getAttribute("disabled");
    null !== t2 ? s(mh, this).id = t2 : s(mh, this).id && s(dh, this).setAttribute("id", s(mh, this).id), null !== e2 ? s(mh, this).name = e2 : s(mh, this).name && s(dh, this).setAttribute("name", s(mh, this).name), null !== n2 ? s(mh, this).value = n2 : s(mh, this).value && s(dh, this).setAttribute("value", s(mh, this).value), null !== i2 ? s(mh, this).checked = "true" === i2 : s(mh, this).checked && s(dh, this).setAttribute("checked", "true"), null !== r2 ? s(mh, this).disabled = "true" === r2 : s(mh, this).disabled && s(dh, this).setAttribute("disabled", "true");
  }
  function Sh() {
    var t2 = s(dh, this).parentNode, n2 = document.createDocumentFragment();
    n2.appendChild(s(fh, this)), s(fh, this).classList.add("radio-button-container"), s(fh, this).setAttribute("role", "radio"), s(fh, this).setAttribute("aria-checked", String(!!s(mh, this).checked)), s(fh, this).setAttribute("aria-disabled", String(!!s(mh, this).disabled)), s(fh, this).tabIndex = s(mh, this).disabled ? -1 : 0, s(ph, this).className = "radio-visual", s(ph, this).setAttribute("aria-hidden", "true"), s(mh, this).label && (c(vh, this, document.createElement("label")), s(vh, this).className = "i18n radio-label", s(vh, this).htmlFor = String(s(mh, this).id), s(vh, this).textContent = s(mh, this).label), s(mh, this).disabled && s(fh, this).classList.add("radio--disabled"), t2 && t2.insertBefore(n2, s(dh, this)), s(fh, this).appendChild(s(dh, this)), s(fh, this).appendChild(s(ph, this)), s(vh, this) && s(fh, this).appendChild(s(vh, this)), e(gh, this, Oh).call(this);
  }
  function Oh() {
    var t2 = this;
    if (s(mh, this).checked) s(fh, this).tabIndex = s(mh, this).disabled ? -1 : 0;
    else if (s(mh, this).name && Ch._.has(s(mh, this).name)) {
      var e2 = Ch._.get(s(mh, this).name), n2 = false;
      e2 && e2.forEach(function(e3) {
        s(mh, e3).checked && e3 !== t2 && (n2 = true);
      }), n2 || s(mh, this).checked || s(mh, this).disabled ? s(fh, this).tabIndex = -1 : s(fh, this).tabIndex = 0;
    }
  }
  function kh() {
    var t2 = this, e2 = function(e3) {
      e3.preventDefault(), s(mh, t2).disabled || s(mh, t2).checked || (t2.check(), s(fh, t2).focus());
    }, n2 = function(e3) {
      if (!s(mh, t2).disabled) switch (e3.key) {
        case " ":
        case "Spacebar":
        case "Enter":
          e3.preventDefault(), s(mh, t2).checked || t2.check();
      }
    }, i2 = function() {
      s(fh, t2).classList.add("radio--focused");
    }, r2 = function() {
      s(fh, t2).classList.remove("radio--focused");
    };
    s(_h, this).set("click", e2), s(_h, this).set("keydown", n2), s(_h, this).set("focus", i2), s(_h, this).set("blur", r2), s(fh, this).addEventListener("click", e2), s(fh, this).addEventListener("keydown", n2), s(fh, this).addEventListener("focus", i2), s(fh, this).addEventListener("blur", r2);
  }
  function xh() {
    s(fh, this).setAttribute("aria-checked", String(!!s(mh, this).checked)), s(fh, this).classList.toggle("radio--checked", s(mh, this).checked), s(dh, this).checked = !!s(mh, this).checked, e(gh, this, Oh).call(this);
  }
  function Ah(t2) {
    var e2 = { type: "radio:change", detail: this.getState() };
    t2 && (e2.originalEvent = t2), s(bh, this).forEach(function(t3) {
      t3(e2);
    });
  }
  var Ch = { _: /* @__PURE__ */ new Map() };
  function Eh(t2, e2) {
    if ("string" == typeof t2) {
      var n2 = document.getElementById(t2);
      n2 instanceof HTMLInputElement && (t2 = n2);
    }
    if (t2 instanceof HTMLInputElement == false) throw new Error("Invalid input element");
    this._options = Object.assign({ id: "checkbox_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)), checked: false, disabled: false, indeterminate: false, label: "", name: "", value: "on" }, e2), this._options.disabled = e2.disabled || false, this._handlers = /* @__PURE__ */ new Map(), this._createDOM(t2), this._setupEventListeners(), this._updateVisualState(), this._subscribers = [];
  }
  Eh.prototype = { constructor: Eh, _container: null, _input: null, _visualCheckbox: null, _labelElement: null, _createDOM: function(t2) {
    var e2 = t2.parentNode, n2 = document.createDocumentFragment();
    this._container = document.createElement("div"), n2.appendChild(this._container), this._container.classList.add("checkbox-container"), this._container.setAttribute("role", "checkbox"), this._container.setAttribute("aria-checked", this._options.checked ? "true" : "false"), this._container.setAttribute("aria-disabled", this._options.disabled ? "true" : "false"), this._container.tabIndex = this._options.disabled ? -1 : 0, this._input = t2;
    var i2 = this._input.getAttribute("id");
    null !== i2 ? this._options.id = i2 : this._options.id && this._input.setAttribute("id", this._options.id), this._input.type = "checkbox", this._options.name && (this._input.name = this._options.name), this._options.value && (this._input.value = this._options.value), this._input.checked = !!this._options.checked, this._options.disabled && (this._input.disabled = true), this._options.indeterminate && (this._input.indeterminate = true), this._visualCheckbox = document.createElement("span"), this._visualCheckbox.className = "checkbox-visual", this._visualCheckbox.setAttribute("aria-hidden", "true");
    var r2 = "http://www.w3.org/2000/svg", o2 = document.createElementNS(r2, "svg");
    o2.setAttribute("viewBox", "0 0 10 8"), o2.setAttribute("class", "checkbox-checkmark");
    var s2 = document.createElementNS(r2, "path");
    s2.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), s2.setAttribute("fill", "none"), s2.setAttribute("stroke", "currentColor"), s2.setAttribute("stroke-width", "2"), o2.appendChild(s2), this._visualCheckbox.appendChild(o2);
    var a2 = document.createElement("span");
    if (a2.className = "checkbox-indeterminate", this._visualCheckbox.appendChild(a2), this._options.label) this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label i18n", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = this._options.label, this._options.title && this._labelElement.setAttribute("title", this._options.label);
    else {
      var c2 = document.querySelector("label[for='" + this._options.id + "']");
      c2 instanceof HTMLLabelElement && (this._labelElement = c2);
    }
    this._options.disabled && this._container.classList.add("checkbox--disabled"), e2 && e2.insertBefore(n2, t2), this._container.appendChild(this._input), this._container.appendChild(this._visualCheckbox), this._labelElement && this._container.appendChild(this._labelElement);
  }, _setupEventListeners: function() {
    var t2 = this;
    if (this._container) {
      var e2 = function(e3) {
        e3.preventDefault(), !t2._options.disabled && t2._container && (t2.toggle(), t2._container.focus());
      }, n2 = function(e3) {
        if (!t2._options.disabled) switch (e3.key) {
          case " ":
          case "Spacebar":
          case "Enter":
            e3.preventDefault(), t2.toggle();
            break;
          case "ArrowRight":
          case "ArrowDown":
            e3.preventDefault(), t2._options.checked || t2._options.indeterminate || (t2._options.checked ? t2.setIndeterminate() : t2.check());
            break;
          case "ArrowLeft":
          case "ArrowUp":
            e3.preventDefault(), (t2._options.checked || t2._options.indeterminate) && (t2._options.indeterminate ? t2.uncheck() : t2.setIndeterminate());
        }
      }, i2 = function() {
        t2._container && t2._container.classList.add("checkbox--focused");
      }, r2 = function() {
        t2._container && t2._container.classList.remove("checkbox--focused");
      };
      this._handlers.set("click", e2), this._handlers.set("keydown", n2), this._handlers.set("focus", i2), this._handlers.set("blur", r2), this._container.addEventListener("click", e2), this._container.addEventListener("keydown", n2), this._container.addEventListener("focus", i2), this._container.addEventListener("blur", r2);
    }
  }, _updateVisualState: function() {
    this._container && this._input && (this._container.setAttribute("aria-checked", this._options.indeterminate ? "mixed" : String(this._options.checked)), this._container.classList.toggle("checkbox--checked", this._options.checked), this._container.classList.toggle("checkbox--indeterminate", this._options.indeterminate), this._input.checked = !!this._options.checked, this._input.indeterminate = !!this._options.indeterminate);
  }, toggle: function() {
    return this._options.disabled ? !!this._options.checked : (this._options.indeterminate ? (this._options.indeterminate = false, this._options.checked = true) : this._options.checked = !this._options.checked, this._updateVisualState(), this._triggerChange(), this._options.checked);
  }, check: function(t2) {
    this._options.disabled || this._options.checked && !this._options.indeterminate || (this._options.checked = true, this._options.indeterminate = false, this._updateVisualState(), t2 || this._triggerChange());
  }, uncheck: function(t2) {
    this._options.disabled || !this._options.checked && !this._options.indeterminate || (this._options.checked = false, this._options.indeterminate = false, this._updateVisualState(), t2 || this._triggerChange());
  }, setIndeterminate: function() {
    this._options.disabled || this._options.indeterminate || (this._options.indeterminate = true, this._updateVisualState(), this._triggerChange());
  }, enable: function() {
    this._options.disabled && this._container && this._input && (this._options.disabled = false, this._input.disabled = false, this._container.setAttribute("aria-disabled", "false"), this._container.tabIndex = 0, this._container.classList.remove("checkbox--disabled"));
  }, disable: function() {
    !this._options.disabled && this._container && this._input && (this._options.disabled = true, this._input.disabled = true, this._container.setAttribute("aria-disabled", "true"), this._container.tabIndex = -1, this._container.classList.add("checkbox--disabled"));
  }, setLabel: function(t2) {
    this._options.label = t2, this._labelElement ? this._labelElement.textContent = t2 : t2 && this._container && (this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = t2, this._container.appendChild(this._labelElement)), this._options.title && this._labelElement && this._labelElement.setAttribute("title", t2);
  }, getState: function() {
    return this._input ? { checked: this._input.checked, disabled: this._input.disabled, value: this._input.value } : { checked: false, disabled: false, value: "" };
  }, subscribe: function(t2) {
    var e2 = this;
    return this._subscribers.push(t2), { unsubscribe: function() {
      e2._subscribers = e2._subscribers.filter(function(e3) {
        return e3 !== t2;
      });
    } };
  }, _triggerChange: function(t2) {
    var e2 = { type: "checkbox:change", detail: this.getState() };
    t2 && (e2.originalEvent = t2), this._subscribers.forEach(function(t3) {
      t3(e2);
    });
  }, destroy: function() {
    var t2 = this;
    this._subscribers = [], this._handlers.forEach(function(e2, n2) {
      t2._container && t2._container.removeEventListener(n2, e2);
    }), this._handlers.clear(), this._container && this._container.parentNode && this._container.parentNode.removeChild(this._container), this._container = null, this._input = null, this._visualCheckbox = null, this._labelElement = null;
  } };
  var Ih, Lh, Ph, Th, Nh, jh, Mh = {}, Dh = {};
  function Rh() {
    if (Ih) return Dh;
    Ih = 1;
    var t2 = Ee();
    return Dh.f = t2, Dh;
  }
  function Fh() {
    if (jh) return Mh;
    jh = 1;
    var t2 = ki(), e2 = C(), n2 = B(), i2 = Pt(), r2 = we(), o2 = F(), s2 = Gt(), a2 = R(), c2 = Ae(), u2 = Bt(), l2 = Ge(), h2 = Dt(), f2 = Le(), d2 = ua(), p2 = Lt(), v2 = Sr(), m2 = gr(), _2 = Vn(), b2 = ll(), g2 = yi(), y2 = Ne(), w2 = ze(), S2 = yr(), O2 = It(), k2 = mn(), x2 = Kr(), A2 = ke(), E2 = fn(), I2 = dn(), L2 = Ce(), P2 = Ee(), T2 = Rh(), N2 = (function() {
      if (Ph) return Lh;
      Ph = 1;
      var t3 = Wo(), e3 = Ae(), n3 = Rh(), i3 = ze().f;
      return Lh = function(r3) {
        var o3 = t3.Symbol || (t3.Symbol = {});
        e3(o3, r3) || i3(o3, r3, { value: n3.f(r3) });
      };
    })(), j2 = (function() {
      if (Nh) return Th;
      Nh = 1;
      var t3 = B(), e3 = Ut(), n3 = Ee(), i3 = mn();
      return Th = function() {
        var r3 = e3("Symbol"), o3 = r3 && r3.prototype, s3 = o3 && o3.valueOf, a3 = n3("toPrimitive");
        o3 && !o3[a3] && i3(o3, a3, function(e4) {
          return t3(s3, this);
        }, { arity: 1 });
      };
    })(), M2 = Cr(), D2 = pn(), U2 = Ni().forEach, H2 = E2("hidden"), V2 = "Symbol", G2 = "prototype", z2 = D2.set, W2 = D2.getterFor(V2), K2 = Object[G2], q2 = e2.Symbol, J2 = q2 && q2[G2], Z2 = e2.RangeError, Y2 = e2.TypeError, $2 = e2.QObject, X2 = y2.f, Q2 = w2.f, tt2 = b2.f, et2 = O2.f, nt2 = i2([].push), it2 = A2("symbols"), rt2 = A2("op-symbols"), ot2 = A2("wks"), st2 = !$2 || !$2[G2] || !$2[G2].findChild, at2 = function(t3, e3, n3) {
      var i3 = X2(K2, e3);
      i3 && delete K2[e3], Q2(t3, e3, n3), i3 && t3 !== K2 && Q2(K2, e3, i3);
    }, ct2 = o2 && a2(function() {
      return 7 !== v2(Q2({}, "a", { get: function() {
        return Q2(this, "a", { value: 7 }).a;
      } })).a;
    }) ? at2 : Q2, ut2 = function(t3, e3) {
      var n3 = it2[t3] = v2(J2);
      return z2(n3, { type: V2, tag: t3, description: e3 }), o2 || (n3.description = e3), n3;
    }, lt2 = function(t3, e3, n3) {
      t3 === K2 && lt2(rt2, e3, n3), l2(t3);
      var i3 = f2(e3);
      return l2(n3), c2(it2, i3) ? (n3.enumerable ? (c2(t3, H2) && t3[H2][i3] && (t3[H2][i3] = false), n3 = v2(n3, { enumerable: p2(0, false) })) : (c2(t3, H2) || Q2(t3, H2, p2(1, v2(null))), t3[H2][i3] = true), ct2(t3, i3, n3)) : Q2(t3, i3, n3);
    }, ht2 = function(t3, e3) {
      l2(t3);
      var i3 = h2(e3), r3 = m2(i3).concat(vt2(i3));
      return U2(r3, function(e4) {
        o2 && !n2(ft2, i3, e4) || lt2(t3, e4, i3[e4]);
      }), t3;
    }, ft2 = function(t3) {
      var e3 = f2(t3), i3 = n2(et2, this, e3);
      return !(this === K2 && c2(it2, e3) && !c2(rt2, e3)) && (!(i3 || !c2(this, e3) || !c2(it2, e3) || c2(this, H2) && this[H2][e3]) || i3);
    }, dt2 = function(t3, e3) {
      var n3 = h2(t3), i3 = f2(e3);
      if (n3 !== K2 || !c2(it2, i3) || c2(rt2, i3)) {
        var r3 = X2(n3, i3);
        return !r3 || !c2(it2, i3) || c2(n3, H2) && n3[H2][i3] || (r3.enumerable = true), r3;
      }
    }, pt2 = function(t3) {
      var e3 = tt2(h2(t3)), n3 = [];
      return U2(e3, function(t4) {
        c2(it2, t4) || c2(I2, t4) || nt2(n3, t4);
      }), n3;
    }, vt2 = function(t3) {
      var e3 = t3 === K2, n3 = tt2(e3 ? rt2 : h2(t3)), i3 = [];
      return U2(n3, function(t4) {
        !c2(it2, t4) || e3 && !c2(K2, t4) || nt2(i3, it2[t4]);
      }), i3;
    };
    return s2 || (q2 = function() {
      if (u2(J2, this)) throw new Y2("Symbol is not a constructor");
      var t3 = arguments.length && void 0 !== arguments[0] ? d2(arguments[0]) : void 0, i3 = L2(t3), r3 = function(t4) {
        var o3 = void 0 === this ? e2 : this;
        o3 === K2 && n2(r3, rt2, t4), c2(o3, H2) && c2(o3[H2], i3) && (o3[H2][i3] = false);
        var s3 = p2(1, t4);
        try {
          ct2(o3, i3, s3);
        } catch (t5) {
          if (!(t5 instanceof Z2)) throw t5;
          at2(o3, i3, s3);
        }
      };
      return o2 && st2 && ct2(K2, i3, { configurable: true, set: r3 }), ut2(i3, t3);
    }, k2(J2 = q2[G2], "toString", function() {
      return W2(this).tag;
    }), k2(q2, "withoutSetter", function(t3) {
      return ut2(L2(t3), t3);
    }), O2.f = ft2, w2.f = lt2, S2.f = ht2, y2.f = dt2, _2.f = b2.f = pt2, g2.f = vt2, T2.f = function(t3) {
      return ut2(P2(t3), t3);
    }, o2 && (x2(J2, "description", { configurable: true, get: function() {
      return W2(this).description;
    } }), r2 || k2(K2, "propertyIsEnumerable", ft2, { unsafe: true }))), t2({ global: true, constructor: true, wrap: true, forced: !s2, sham: !s2 }, { Symbol: q2 }), U2(m2(ot2), function(t3) {
      N2(t3);
    }), t2({ target: V2, stat: true, forced: !s2 }, { useSetter: function() {
      st2 = true;
    }, useSimple: function() {
      st2 = false;
    } }), t2({ target: "Object", stat: true, forced: !s2, sham: !o2 }, { create: function(t3, e3) {
      return void 0 === e3 ? v2(t3) : ht2(v2(t3), e3);
    }, defineProperty: lt2, defineProperties: ht2, getOwnPropertyDescriptor: dt2 }), t2({ target: "Object", stat: true, forced: !s2 }, { getOwnPropertyNames: pt2 }), j2(), M2(q2, V2), I2[H2] = true, Mh;
  }
  var Uh, Bh, Hh, Vh = {};
  function Gh() {
    if (Bh) return Uh;
    Bh = 1;
    var t2 = Gt();
    return Uh = t2 && !!Symbol.for && !!Symbol.keyFor;
  }
  var zh, Wh = {};
  var Kh, qh, Jh, Zh, Yh, $h, Xh, Qh = {};
  function tf() {
    if (Xh) return Qh;
    Xh = 1;
    var t2 = ki(), e2 = Ut(), n2 = Yo(), i2 = B(), r2 = Pt(), o2 = R(), s2 = Ci(), a2 = Rt(), c2 = (function() {
      if (qh) return Kh;
      qh = 1;
      var t3 = Ft(), e3 = pn().get;
      return Kh = function(n3) {
        if (!t3(n3)) return false;
        var i3 = e3(n3);
        return !!i3 && "RawJSON" === i3.type;
      };
    })(), u2 = Wt(), l2 = Tt(), h2 = ua(), f2 = $o(), d2 = (function() {
      if (Zh) return Jh;
      Zh = 1;
      var t3 = Pt(), e3 = Ae(), n3 = SyntaxError, i3 = parseInt, r3 = String.fromCharCode, o3 = t3("".charAt), s3 = t3("".slice), a3 = t3(/./.exec), c3 = { '\\"': '"', "\\\\": "\\", "\\/": "/", "\\b": "\b", "\\f": "\f", "\\n": "\n", "\\r": "\r", "\\t": "	" }, u3 = /^[\da-f]{4}$/i, l3 = /^[\u0000-\u001F]$/;
      return Jh = function(t4, h3) {
        for (var f3 = true, d3 = ""; h3 < t4.length; ) {
          var p3 = o3(t4, h3);
          if ("\\" === p3) {
            var v3 = s3(t4, h3, h3 + 2);
            if (e3(c3, v3)) d3 += c3[v3], h3 += 2;
            else {
              if ("\\u" !== v3) throw new n3('Unknown escape sequence: "' + v3 + '"');
              var m3 = s3(t4, h3 += 2, h3 + 4);
              if (!a3(u3, m3)) throw new n3("Bad Unicode escape at: " + h3);
              d3 += r3(i3(m3, 16)), h3 += 4;
            }
          } else {
            if ('"' === p3) {
              f3 = false, h3++;
              break;
            }
            if (a3(l3, p3)) throw new n3("Bad control character in string literal at: " + h3);
            d3 += p3, h3++;
          }
        }
        if (f3) throw new n3("Unterminated string at: " + h3);
        return { value: d3, end: h3 };
      };
    })(), p2 = Ce(), v2 = Gt(), m2 = (function() {
      if ($h) return Yh;
      $h = 1;
      var t3 = R();
      return Yh = !t3(function() {
        var t4 = "9007199254740993", e3 = JSON.rawJSON(t4);
        return !JSON.isRawJSON(e3) || JSON.stringify(e3) !== t4;
      });
    })(), _2 = String, b2 = e2("JSON", "stringify"), g2 = r2(/./.exec), y2 = r2("".charAt), w2 = r2("".charCodeAt), S2 = r2("".replace), O2 = r2("".slice), k2 = r2([].push), x2 = r2(1.1.toString), A2 = /[\uD800-\uDFFF]/g, C2 = /^[\uD800-\uDBFF]$/, E2 = /^[\uDC00-\uDFFF]$/, I2 = p2(), L2 = I2.length, P2 = !v2 || o2(function() {
      var t3 = e2("Symbol")("stringify detection");
      return "[null]" !== b2([t3]) || "{}" !== b2({ a: t3 }) || "{}" !== b2(Object(t3));
    }), T2 = o2(function() {
      return '"\\udf06\\ud834"' !== b2("\uDF06\uD834") || '"\\udead"' !== b2("\uDEAD");
    }), N2 = P2 ? function(t3, e3) {
      var r3 = f2(arguments), o3 = M2(e3);
      if (a2(o3) || void 0 !== t3 && !u2(t3)) return r3[1] = function(t4, e4) {
        if (a2(o3) && (e4 = i2(o3, this, _2(t4), e4)), !u2(e4)) return e4;
      }, n2(b2, null, r3);
    } : b2, j2 = function(t3, e3, n3) {
      var i3 = y2(n3, e3 - 1), r3 = y2(n3, e3 + 1);
      return g2(C2, t3) && !g2(E2, r3) || g2(E2, t3) && !g2(C2, i3) ? "\\u" + x2(w2(t3, 0), 16) : t3;
    }, M2 = function(t3) {
      if (a2(t3)) return t3;
      if (s2(t3)) {
        for (var e3 = t3.length, n3 = [], i3 = 0; i3 < e3; i3++) {
          var r3 = t3[i3];
          "string" == typeof r3 ? k2(n3, r3) : "number" != typeof r3 && "Number" !== l2(r3) && "String" !== l2(r3) || k2(n3, h2(r3));
        }
        var o3 = n3.length, c3 = true;
        return function(t4, e4) {
          if (c3) return c3 = false, e4;
          if (s2(this)) return e4;
          for (var i4 = 0; i4 < o3; i4++) if (n3[i4] === t4) return e4;
        };
      }
    };
    return b2 && t2({ target: "JSON", stat: true, arity: 3, forced: P2 || T2 || !m2 }, { stringify: function(t3, e3, n3) {
      var r3 = M2(e3), o3 = [], s3 = N2(t3, function(t4, e4) {
        var n4 = a2(r3) ? i2(r3, this, _2(t4), e4) : e4;
        return !m2 && c2(n4) ? I2 + (k2(o3, n4.rawJSON) - 1) : n4;
      }, n3);
      if ("string" != typeof s3) return s3;
      if (T2 && (s3 = S2(s3, A2, j2)), m2) return s3;
      for (var u3 = "", l3 = s3.length, h3 = 0; h3 < l3; h3++) {
        var f3 = y2(s3, h3);
        if ('"' === f3) {
          var p3 = d2(s3, ++h3).end - 1, v3 = O2(s3, h3, p3);
          u3 += O2(v3, 0, L2) === I2 ? o3[O2(v3, L2)] : '"' + v3 + '"', h3 = p3;
        } else u3 += f3;
      }
      return u3;
    } }), Qh;
  }
  var ef, nf, rf = {};
  nf || (nf = 1, Fh(), (function() {
    if (Hh) return Vh;
    Hh = 1;
    var t2 = ki(), e2 = Ut(), n2 = Ae(), i2 = ua(), r2 = ke(), o2 = Gh(), s2 = r2("string-to-symbol-registry"), a2 = r2("symbol-to-string-registry");
    t2({ target: "Symbol", stat: true, forced: !o2 }, { for: function(t3) {
      var r3 = i2(t3);
      if (n2(s2, r3)) return s2[r3];
      var o3 = e2("Symbol")(r3);
      return s2[r3] = o3, a2[o3] = r3, o3;
    } });
  })(), (function() {
    if (zh) return Wh;
    zh = 1;
    var t2 = ki(), e2 = Ae(), n2 = Wt(), i2 = Kt(), r2 = ke(), o2 = Gh(), s2 = r2("symbol-to-string-registry");
    t2({ target: "Symbol", stat: true, forced: !o2 }, { keyFor: function(t3) {
      if (!n2(t3)) throw new TypeError(i2(t3) + " is not a symbol");
      if (e2(s2, t3)) return s2[t3];
    } });
  })(), tf(), (function() {
    if (ef) return rf;
    ef = 1;
    var t2 = ki(), e2 = Gt(), n2 = R(), i2 = yi(), r2 = xe();
    t2({ target: "Object", stat: true, forced: !e2 || n2(function() {
      i2.f(1);
    }) }, { getOwnPropertySymbols: function(t3) {
      var e3 = i2.f;
      return e3 ? e3(r2(t3)) : [];
    } });
  })());
  var of, sf = {};
  !(function() {
    if (of) return sf;
    of = 1;
    var t2 = ki(), e2 = F(), n2 = C(), i2 = Pt(), r2 = Ae(), o2 = Rt(), s2 = Bt(), a2 = ua(), c2 = Kr(), u2 = Si(), l2 = n2.Symbol, h2 = l2 && l2.prototype;
    if (e2 && o2(l2) && (!("description" in h2) || void 0 !== l2().description)) {
      var f2 = {}, d2 = function() {
        var t3 = arguments.length < 1 || void 0 === arguments[0] ? void 0 : a2(arguments[0]), e3 = s2(h2, this) ? new l2(t3) : void 0 === t3 ? l2() : l2(t3);
        return "" === t3 && (f2[e3] = true), e3;
      };
      u2(d2, l2), d2.prototype = h2, h2.constructor = d2;
      var p2 = "Symbol(description detection)" === String(l2("description detection")), v2 = i2(h2.valueOf), m2 = i2(h2.toString), _2 = /^Symbol\((.*)\)[^)]+$/, b2 = i2("".replace), g2 = i2("".slice);
      c2(h2, "description", { configurable: true, get: function() {
        var t3 = v2(this);
        if (r2(f2, t3)) return "";
        var e3 = m2(t3), n3 = p2 ? g2(e3, 7, -1) : b2(e3, _2, "$1");
        return "" === n3 ? void 0 : n3;
      } }), t2({ global: true, constructor: true, forced: true }, { Symbol: d2 });
    }
  })();
  var af, cf = {};
  !(function() {
    if (af) return cf;
    af = 1;
    var t2 = ki(), e2 = Ni().find, n2 = Or(), i2 = "find", r2 = true;
    i2 in [] && Array(1)[i2](function() {
      r2 = false;
    }), t2({ target: "Array", proto: true, forced: r2 }, { find: function(t3) {
      return e2(this, t3, arguments.length > 1 ? arguments[1] : void 0);
    } }), n2(i2);
  })();
  var uf, lf = {};
  !(function() {
    if (uf) return lf;
    uf = 1;
    var t2 = ki(), e2 = hu();
    t2({ target: "Array", stat: true, forced: !Ns()(function(t3) {
      Array.from(t3);
    }) }, { from: e2 });
  })();
  var hf, ff, df, pf, vf, mf, _f, bf = {};
  !(function() {
    if (_f) return bf;
    _f = 1;
    var t2 = ki(), e2 = Pt(), n2 = qt(), i2 = xe(), r2 = Fn(), o2 = sh(), s2 = ua(), a2 = R(), c2 = ku(), u2 = Ur(), l2 = (function() {
      if (ff) return hf;
      ff = 1;
      var t3 = Ht().match(/firefox\/(\d+)/i);
      return hf = !!t3 && +t3[1];
    })(), h2 = (function() {
      if (pf) return df;
      pf = 1;
      var t3 = Ht();
      return df = /MSIE|Trident/.test(t3);
    })(), f2 = Vt(), d2 = (function() {
      if (mf) return vf;
      mf = 1;
      var t3 = Ht().match(/AppleWebKit\/(\d+)\./);
      return vf = !!t3 && +t3[1];
    })(), p2 = [], v2 = e2(p2.sort), m2 = e2(p2.push), _2 = a2(function() {
      p2.sort(void 0);
    }), b2 = a2(function() {
      p2.sort(null);
    }), g2 = u2("sort"), y2 = !a2(function() {
      if (f2) return f2 < 70;
      if (!(l2 && l2 > 3)) {
        if (h2) return true;
        if (d2) return d2 < 603;
        var t3, e3, n3, i3, r3 = "";
        for (t3 = 65; t3 < 76; t3++) {
          switch (e3 = String.fromCharCode(t3), t3) {
            case 66:
            case 69:
            case 70:
            case 72:
              n3 = 3;
              break;
            case 68:
            case 71:
              n3 = 4;
              break;
            default:
              n3 = 2;
          }
          for (i3 = 0; i3 < 47; i3++) p2.push({ k: e3 + i3, v: n3 });
        }
        for (p2.sort(function(t4, e4) {
          return e4.v - t4.v;
        }), i3 = 0; i3 < p2.length; i3++) e3 = p2[i3].k.charAt(0), r3.charAt(r3.length - 1) !== e3 && (r3 += e3);
        return "DGBEFHACIJK" !== r3;
      }
    });
    t2({ target: "Array", proto: true, forced: _2 || !b2 || !g2 || !y2 }, { sort: function(t3) {
      void 0 !== t3 && n2(t3);
      var e3 = i2(this);
      if (y2) return void 0 === t3 ? v2(e3) : v2(e3, t3);
      var a3, u3, l3 = [], h3 = r2(e3);
      for (u3 = 0; u3 < h3; u3++) u3 in e3 && m2(l3, e3[u3]);
      for (c2(l3, /* @__PURE__ */ (function(t4) {
        return function(e4, n3) {
          return void 0 === n3 ? -1 : void 0 === e4 ? 1 : void 0 !== t4 ? +t4(e4, n3) || 0 : s2(e4) > s2(n3) ? 1 : -1;
        };
      })(t3)), a3 = r2(l3), u3 = 0; u3 < a3; ) e3[u3] = l3[u3++];
      for (; u3 < h3; ) o2(e3, u3++);
      return e3;
    } });
  })();
  var gf, yf;
  yf || (yf = 1, gf || (gf = 1, dl()("Set", function(t2) {
    return function() {
      return t2(this, arguments.length ? arguments[0] : void 0);
    };
  }, hh())));
  var wf = /* @__PURE__ */ new WeakSet(), Sf = (function() {
    return h(function t2(n2, i2) {
      var r2 = this;
      if (o(this, t2), u(this, wf), "string" == typeof n2) {
        var s2 = document.getElementById(n2);
        if (s2 instanceof HTMLSelectElement) n2 = s2;
        else {
          if (!(s2 instanceof HTMLElement)) throw new Error("Invalid selectbox");
          this._container = s2;
        }
      } else n2 instanceof HTMLElement && (this._container = n2);
      if (n2 instanceof HTMLSelectElement) this._selectbox = n2, this._container = document.createElement("div");
      else if (this._container instanceof HTMLElement == false) throw new Error("Invalid container");
      this._options = Object.assign(i2, { placeholder: i2.placeholder || "Select...", searchable: i2.searchable || false, sortable: i2.sortable || false, multiple: i2.multiple || false, description: i2.description || "" }), this._selectedValues = /* @__PURE__ */ new Set(), this.isOpen = false, this._items = [], this._customItems = [], this._subscribers = [], this._boundHandles = { toggle: function(t3) {
        e(wf, r2, xf).call(r2, t3);
      }, search: function(t3) {
        e(wf, r2, Cf).call(r2, t3);
      }, close: function(t3) {
        t3.target instanceof HTMLElement && !r2._container.contains(t3.target) && !t3.target.classList.contains("selectbox-option") && e(wf, r2, Af).call(r2);
      }, keydown: function(t3) {
        e(wf, r2, If).call(r2, t3);
      }, dropdownClick: function(t3) {
        e(wf, r2, Pf).call(r2, t3);
      } }, this._optionsContainer = null, this.searchInput = null, this._select = document.createElement("div"), this._header = document.createElement("div"), this._selectedText = document.createElement("span"), this._arrow = document.createElement("span"), this._dropdown = document.createElement("div"), e(wf, this, Of).call(this), e(wf, this, kf).call(this), e(wf, this, Lf).call(this), Df._.add(this);
    }, [{ key: "openDropdown", value: function() {
      this.isOpen || document.addEventListener("click", this._boundHandles.close), this.isOpen = true, this._dropdown.style.display = "block", this._arrow.className += " selectbox-arrow-open", this._header.className += " selectbox-header-open", this.searchInput && setTimeout(/* @__PURE__ */ (function(t2) {
        return function() {
          t2.searchInput && t2.searchInput.focus();
        };
      })(this), 100), e(wf, this, Lf).call(this);
    } }, { key: "subscribe", value: function(t2) {
      var e2 = this;
      return this._subscribers.push(t2), { unsubscribe: function() {
        e2._subscribers = e2._subscribers.filter(function(e3) {
          return e3 !== t2;
        });
      } };
    } }, { key: "addItem", value: function(t2, n2, i2) {
      i2 = i2 || false;
      var r2 = this._items.some(function(e2) {
        return e2 && e2.value === t2;
      });
      if (r2) {
        var o2 = this._items.find(function(e2) {
          return e2 && e2.value === t2;
        });
        o2 && (o2.selected = i2);
      } else this._items.push({ value: t2, text: n2, selected: i2 }), this._options.sortable && this._items.sort(function(t3, e2) {
        return t3 && e2 ? t3.text.localeCompare(e2.text) : t3 ? -1 : e2 ? 1 : 0;
      });
      i2 && (this._options.multiple || this._selectedValues.clear(), this._selectedValues.add(t2)), e(wf, this, Tf).call(this);
    } }, { key: "addItems", value: function(t2, n2) {
      var i2 = this;
      t2.forEach(function(t3, e2) {
        if (!i2._items.some(function(e3) {
          return e3 && e3.value === t3[0];
        })) {
          var r2 = n2 ? t3[0] === n2 : 0 === e2;
          r2 && (i2._options.multiple || i2._selectedValues.clear(), i2._selectedValues.add(t3[0])), i2._items.push({ value: t3[0], text: t3[1], selected: r2 });
        }
      }, this), this.isOpen && e(wf, this, Lf).call(this), e(wf, this, Tf).call(this);
    } }, { key: "addCustomItem", value: function(t2, e2) {
      this._customItems.push({ value: t2, text: e2, selected: false });
    } }, { key: "addSeparator", value: function() {
      this._items.push(null);
    } }, { key: "removeItem", value: function(t2) {
      this._items = this._items.filter(function(e2) {
        return null === e2 || e2.value !== t2;
      }), this._customItems = this._customItems.filter(function(e2) {
        return null === e2 || e2.value !== t2;
      }), this._selectedValues.delete(t2), e(wf, this, Tf).call(this);
    } }, { key: "getSelectedValue", value: function() {
      if (this._options.multiple) return console.error("Method getSelectedValue is only available for single-select boxes."), null;
      var t2 = Array.from(this._selectedValues);
      return t2.length > 0 ? t2[0] : null;
    } }, { key: "getSelectedValues", value: function() {
      if (this._options.multiple) return Array.from(this._selectedValues);
      var t2 = Array.from(this._selectedValues);
      return t2.length > 0 ? t2[0] : null;
    } }, { key: "selectItems", value: function(t2, n2) {
      var i2 = this;
      if (this._options.multiple || !Array.isArray(t2)) {
        var r2 = "";
        if (this._options.multiple) {
          var o2 = function(t3) {
            if (i2._optionsContainer) {
              var e2 = i2._optionsContainer.querySelector('[data-value="' + t3 + '"]');
              if (e2) {
                var n3 = e2.querySelector('input[type="checkbox"]');
                n3 && n3 instanceof HTMLInputElement && (n3.checked = true), e2.classList.add("selectbox-option-selected"), e2.classList.add("checkbox--checked");
              }
            }
          };
          if (Array.isArray(t2)) for (var s2 = 0; s2 < t2.length; s2++) r2 = t2[s2], this._selectedValues.has(r2) || (this._selectedValues.add(r2), o2(r2));
          else r2 = t2, this._selectedValues.has(r2) || (this._selectedValues.add(r2), o2(r2));
        } else if (!Array.isArray(t2)) {
          if (r2 = t2, this._selectedValues.clear(), this._selectedValues.add(r2), this._optionsContainer) {
            this._optionsContainer.querySelectorAll('.selectbox-option-selected[data-value="' + r2 + '"]').forEach(function(t3) {
              t3.classList.remove("selectbox-option-selected"), t3.classList.remove("checkbox--checked");
            });
            var a2 = this._optionsContainer.querySelector('[data-value="' + r2 + '"]');
            a2 && (a2.classList.add("selectbox-option-selected"), a2.classList.add("checkbox--checked"));
          }
          e(wf, this, Af).call(this);
        }
        e(wf, this, Tf).call(this), n2 || e(wf, this, Nf).call(this, r2, true);
      } else console.error("Method selectItem is only available for multi-select boxes.");
    } }, { key: "unselectItems", value: function(t2, n2) {
      var i2 = this;
      if (this._options.multiple) {
        var r2 = "", o2 = function(t3) {
          if (i2._optionsContainer) {
            var e2 = i2._optionsContainer.querySelector('[data-value="' + t3 + '"]');
            if (e2) {
              var n3 = e2.querySelector('input[type="checkbox"]');
              n3 && n3 instanceof HTMLInputElement && (n3.checked = false), e2.classList.remove("selectbox-option-selected"), e2.classList.remove("checkbox--checked");
            }
          }
        };
        if (Array.isArray(t2)) for (var s2 = 0; s2 < t2.length; s2++) r2 = t2[s2], this._selectedValues.has(r2) && (this._selectedValues.delete(r2), o2(r2));
        else r2 = t2, this._selectedValues.has(r2) && (this._selectedValues.delete(r2), o2(r2));
        e(wf, this, Tf).call(this), n2 || e(wf, this, Nf).call(this, r2, true);
      } else console.error("Method unselectItem is only available for multi-select boxes.");
    } }, { key: "disable", value: function() {
      this._select.classList.add("selectbox-disabled");
    } }, { key: "enable", value: function() {
      this._select.classList.remove("selectbox-disabled");
    } }, { key: "clear", value: function(t2) {
      if (t2 = t2 || false, this._selectedValues.clear(), t2 && this._items.length > 0) {
        var n2 = this._items[0];
        n2 && this._selectedValues.add(n2.value);
      }
      e(wf, this, Tf).call(this), e(wf, this, Lf).call(this);
    } }, { key: "destroy", value: function() {
      this._subscribers = [], Df._.delete(this);
      try {
        this._header && this._boundHandles && this._header.removeEventListener("click", this._boundHandles.toggle), this.searchInput && this._boundHandles && this.searchInput.removeEventListener("input", this._boundHandles.search), this._dropdown && this._boundHandles && this._dropdown.removeEventListener("click", this._boundHandles.dropdownClick), document && this._boundHandles && document.removeEventListener("click", this._boundHandles.close), this._header && this._boundHandles && this._header.removeEventListener("keydown", this._boundHandles.keydown), this._dropdown && this._boundHandles && this._dropdown.removeEventListener("keydown", this._boundHandles.keydown);
      } catch (t3) {
        console.error(t3);
      }
      this._container.innerHTML = "";
      for (var t2 = this._container.className.split(" "), e2 = [], n2 = 0; n2 < t2.length; n2++) "selectbox-container" !== t2[n2] && e2.push(t2[n2]);
      this._container.className = e2.join(" ");
    } }]);
  })();
  function Of() {
    this._container.innerHTML = "", this._container.className += " selectbox-container";
    var t2 = document.createDocumentFragment();
    if (this._select.className += " selectbox", this._options.multiple && (this._select.className += " selectbox-multiple"), t2.appendChild(this._select), this._header.className += " selectbox-header", this._select.appendChild(this._header), this._header.setAttribute("tabindex", "0"), this._selectedText.className += " selectbox-selected-text", this._selectedText.textContent = this._options.placeholder, this._header.appendChild(this._selectedText), this._arrow.className += " selectbox-arrow", this._arrow.innerHTML = "<b></b>", this._header.appendChild(this._arrow), this._dropdown.className += " selectbox-dropdown", this._select.appendChild(this._dropdown), this._options.description) {
      var n2 = document.createElement("div");
      n2.className += " i18n selectbox-description", n2.textContent = this._options.description, this._dropdown.appendChild(n2);
    }
    if (this._options.searchable) {
      var i2 = document.createElement("div");
      i2.className += " selectbox-search", this._dropdown.appendChild(i2), this.searchInput = document.createElement("input"), this.searchInput.className += " selectbox-search-input", this.searchInput.type = "text", this.searchInput.placeholder = "Search...", i2.appendChild(this.searchInput);
    }
    if (this._optionsContainer = document.createElement("div"), this._optionsContainer.className += " selectbox-options", this._dropdown.appendChild(this._optionsContainer), this._container.appendChild(t2), this._selectbox) {
      var r2 = this._selectbox.parentNode;
      if (r2) {
        r2.insertBefore(this._container, this._selectbox);
        var o2 = e(wf, this, Mf).call(this, this._selectbox);
        this.addItems(o2.values, o2.selectedValue), this._selectbox.remove();
      }
    }
  }
  function kf() {
    this._header.addEventListener("click", this._boundHandles.toggle), this.searchInput && this.searchInput.addEventListener("input", this._boundHandles.search), this._dropdown.addEventListener("click", this._boundHandles.dropdownClick), this._dropdown.addEventListener("wheel", function(t2) {
      t2.stopPropagation();
    }), this._header.addEventListener("keydown", this._boundHandles.keydown), this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
  }
  function xf(t2) {
    if (t2 && t2.stopPropagation(), this.isOpen ? e(wf, this, Af).call(this) : this.openDropdown(), t2 && "click" === t2.type) {
      var n2, i2 = f(Df._);
      try {
        for (i2.s(); !(n2 = i2.n()).done; ) {
          var r2 = n2.value;
          r2.isOpen && r2 !== this && e(wf, r2, Af).call(r2);
        }
      } catch (t3) {
        i2.e(t3);
      } finally {
        i2.f();
      }
    }
  }
  function Af() {
    this.isOpen && document && this._boundHandles && document.removeEventListener("click", this._boundHandles.close), this.isOpen = false, this._dropdown.style.display = "none";
    for (var t2 = this._arrow.className.split(" "), e2 = [], n2 = 0; n2 < t2.length; n2++) "selectbox-arrow-open" !== t2[n2] && e2.push(t2[n2]);
    this._arrow.className = e2.join(" ");
    var i2 = this._header.className.split(" "), r2 = [];
    for (n2 = 0; n2 < i2.length; n2++) "selectbox-header-open" !== i2[n2] && r2.push(i2[n2]);
    this._header.className = r2.join(" "), this.searchInput && (this.searchInput.value = "");
  }
  function Cf(t2) {
    var n2 = t2.target;
    if (n2 instanceof HTMLInputElement) {
      var i2 = n2.value.toLowerCase();
      e(wf, this, Lf).call(this, i2);
    }
  }
  function Ef(t2) {
    var n2, i2 = this.searchInput ? this.searchInput.value.toLowerCase() : "", r2 = this._items.filter(function(t3) {
      return null !== t3;
    });
    if (i2 && (r2 = r2.filter(function(t3) {
      return -1 !== t3.text.toLowerCase().indexOf(i2);
    })), 0 !== r2.length) {
      if ("up" === t2) if (0 === this._selectedValues.size && r2.length > 0) n2 = r2[r2.length - 1], this._selectedValues.add(n2.value);
      else {
        for (var o2 = Array.from(this._selectedValues), s2 = -1, a2 = 0; a2 < r2.length; a2++) if (r2[a2].value === o2[0]) {
          s2 = a2;
          break;
        }
        var c2 = (s2 - 1 + r2.length) % r2.length;
        this._selectedValues.clear(), n2 = r2[c2], this._selectedValues.add(n2.value);
      }
      else if (0 === this._selectedValues.size && r2.length > 0) n2 = r2[0], this._selectedValues.add(n2.value);
      else {
        for (o2 = Array.from(this._selectedValues), s2 = -1, a2 = 0; a2 < r2.length; a2++) if (r2[a2].value === o2[0]) {
          s2 = a2;
          break;
        }
        var u2 = (s2 + 1) % r2.length;
        u2 === r2.length && (u2 = 0), this._selectedValues.clear(), n2 = r2[u2], this._selectedValues.add(n2.value);
      }
      e(wf, this, Tf).call(this), e(wf, this, Lf).call(this, i2, true), e(wf, this, Nf).call(this, n2.value, true);
    }
  }
  function If(t2) {
    switch (t2.key || t2.keyCode) {
      case "Enter":
      case 13:
        t2.preventDefault(), e(wf, this, xf).call(this, t2);
        break;
      case "Escape":
      case 27:
      case "Tab":
      case 9:
        e(wf, this, Af).call(this);
        break;
      case "ArrowDown":
      case 40:
        t2.preventDefault(), e(wf, this, Ef).call(this, "down");
        break;
      case "ArrowUp":
      case 38:
        t2.preventDefault(), e(wf, this, Ef).call(this, "up");
    }
  }
  function Lf(t2, e2) {
    if (t2 = t2 || "", this._optionsContainer) {
      this._optionsContainer.innerHTML = "";
      var n2 = null, i2 = this._items;
      t2 && (i2 = i2.filter(function(e3) {
        return null !== e3 && -1 !== e3.text.toLowerCase().indexOf(t2);
      }));
      for (var r2 = document.createDocumentFragment(), o2 = 0; o2 < i2.length; o2++) {
        var s2 = i2[o2];
        if (s2) {
          var a2 = document.createElement("div");
          a2.className += " selectbox-option", this._selectedValues.has(s2.value) && (a2.className += " selectbox-option-selected checkbox--checked", n2 = a2), a2.setAttribute("data-value", s2.value);
          var c2 = document.createElement("label");
          if (c2.className += " selectbox-option-text", c2.textContent = s2.text, this._options.multiple) {
            a2.className += " selectbox-option-checkbox";
            var u2 = document.createElement("input");
            u2.type = "checkbox", u2.id = "checkbox-" + s2.value, u2.className += " selectbox-checkbox", u2.checked = this._selectedValues.has(s2.value), a2.appendChild(u2);
            var l2 = document.createElement("span");
            l2.className = "checkbox-visual", l2.setAttribute("aria-hidden", "true");
            var h2 = "http://www.w3.org/2000/svg", f2 = document.createElementNS(h2, "svg");
            f2.setAttribute("viewBox", "0 0 10 8"), f2.setAttribute("class", "checkbox-checkmark");
            var d2 = document.createElementNS(h2, "path");
            d2.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), d2.setAttribute("fill", "none"), d2.setAttribute("stroke", "currentColor"), d2.setAttribute("stroke-width", "2"), f2.appendChild(d2), l2.appendChild(f2), a2.appendChild(l2);
          }
          a2.appendChild(c2), r2.appendChild(a2);
        } else {
          var p2 = document.createElement("hr");
          p2.className += " selectbox-option-divider", r2.appendChild(p2);
        }
      }
      if (this._customItems.length) {
        var v2 = document.createElement("hr");
        v2.className += " selectbox-option-divider", r2.appendChild(v2);
      }
      for (o2 = 0; o2 < this._customItems.length; o2++) {
        var m2 = this._customItems[o2], _2 = document.createElement("label");
        _2.className += " selectbox-custom-option", _2.setAttribute("data-value", m2.value), _2.setAttribute("for", m2.value);
        var b2 = document.createElement("span");
        b2.className += " selectbox-option-text", b2.textContent = m2.text, _2.appendChild(b2), r2.appendChild(_2);
      }
      if (this._optionsContainer.appendChild(r2), e2 && this.isOpen && this._optionsContainer && n2) try {
        n2.scrollIntoView && n2.scrollIntoView({ block: "nearest" });
      } catch (t3) {
        console.error(t3);
      }
    }
  }
  function Pf(t2) {
    var n2 = t2.target || t2.srcElement;
    if (n2 && n2 instanceof HTMLElement) {
      for (var i2 = null, r2 = n2.className.split(" "), o2 = false, s2 = 0; s2 < r2.length; s2++) {
        if ("selectbox-option" === r2[s2]) {
          o2 = true;
          break;
        }
        if ("selectbox-custom-option" === r2[s2]) {
          var a2 = n2.getAttribute("data-value");
          if (a2) return t2.stopPropagation(), e(wf, this, jf).call(this, a2), void e(wf, this, Af).call(this);
          break;
        }
      }
      if (o2) i2 = n2;
      else if (n2.parentNode && n2.parentNode instanceof HTMLElement) {
        var c2 = n2.parentNode.className.split(" "), u2 = false;
        for (s2 = 0; s2 < c2.length; s2++) {
          if ("selectbox-option" === c2[s2]) {
            u2 = true;
            break;
          }
          if ("selectbox-custom-option" === c2[s2]) {
            var l2 = n2.parentNode.getAttribute("data-value");
            if (l2) return t2.stopPropagation(), e(wf, this, jf).call(this, l2), void e(wf, this, Af).call(this);
            break;
          }
        }
        u2 && (i2 = n2.parentNode);
      }
      if (i2 instanceof HTMLDivElement) {
        var h2 = i2.getAttribute("data-value");
        if (null !== h2) {
          var f2 = true;
          this._options.multiple ? this._selectedValues.has(h2) ? (this.unselectItems(h2, true), f2 = false) : this.selectItems(h2, true) : (this.selectItems(h2, true), e(wf, this, Af).call(this)), e(wf, this, Tf).call(this), e(wf, this, Nf).call(this, h2, f2);
        }
      }
    }
  }
  function Tf() {
    if (0 !== this._selectedValues.size) if (this._options.multiple) {
      for (var t2 = [], e2 = 0; e2 < this._items.length; e2++) {
        (i2 = this._items[e2]) && this._selectedValues.has(i2.value) && t2.push(i2);
      }
      0 === t2.length ? this._selectedText.textContent = this._options.placeholder : 1 === t2.length ? this._selectedText.textContent = t2[0].text : this._selectedText.textContent = t2.length + " items selected";
    } else {
      var n2 = null;
      for (e2 = 0; e2 < this._items.length; e2++) {
        var i2;
        if ((i2 = this._items[e2]) && this._selectedValues.has(i2.value)) {
          n2 = i2;
          break;
        }
      }
      this._selectedText.textContent = n2 ? n2.text : this._options.placeholder;
    }
    else this._selectedText.textContent = this._options.placeholder;
  }
  function Nf(t2, e2) {
    for (var n2 = Array.from(this._selectedValues), i2 = [], r2 = 0; r2 < this._items.length; r2++) {
      var o2 = this._items[r2];
      o2 && this._selectedValues.has(o2.value) && i2.push(o2);
    }
    var s2 = { values: n2, items: i2, current: t2, enabled: e2 };
    this._subscribers.forEach(function(t3) {
      t3({ type: "selectbox:change", detail: s2 });
    });
  }
  function jf(t2) {
    var e2 = { values: [], current: t2, enabled: false };
    this._subscribers.forEach(function(t3) {
      t3({ type: "selectbox:custom", detail: e2 });
    });
  }
  function Mf(t2) {
    var e2 = { values: Array.from(t2.options).map(function(t3) {
      return [t3.value, t3.text];
    }) }, n2 = t2.value;
    return n2 && (e2.selectedValue = n2), e2;
  }
  var Df = { _: /* @__PURE__ */ new Set() }, Rf = /* @__PURE__ */ new WeakMap(), Ff = /* @__PURE__ */ new WeakSet(), Uf = (function() {
    function t2(n2, i2) {
      o(this, t2), u(this, Ff), a(this, Rf, void 0);
      var r2 = document.getElementById(n2);
      if (r2 instanceof HTMLElement == false) throw new Error("Invalid container");
      c(Rf, this, r2), e(Ff, this, Bf).call(this, i2);
    }
    return h(t2, [{ key: "show", value: function() {
      var t3;
      null === (t3 = s(Rf, this)) || void 0 === t3 || t3.classList.remove("hidden");
    } }, { key: "hide", value: function() {
      var t3;
      null === (t3 = s(Rf, this)) || void 0 === t3 || t3.classList.add("hidden");
    } }], [{ key: "show", value: function() {
      var n2;
      null === (n2 = e(t2, this, Hf)._) || void 0 === n2 || n2.classList.remove("hidden");
    } }, { key: "hide", value: function() {
      var n2;
      null === (n2 = e(t2, this, Hf)._) || void 0 === n2 || n2.classList.add("hidden");
    } }]);
  })();
  function Bf(t2) {
    s(Rf, this).classList.add("loader-container");
    var e2 = "http://www.w3.org/2000/svg", n2 = document.createElementNS(e2, "svg");
    n2.classList.add("loader-image"), n2.setAttribute("viewBox", "0 0 20 20");
    var i2 = document.createElementNS(e2, "circle");
    i2.setAttribute("cx", "10"), i2.setAttribute("cy", "10"), i2.setAttribute("fill", "none"), i2.setAttribute("stroke", "currentColor"), i2.setAttribute("stroke-width", "1.5"), i2.setAttribute("r", "7.25"), i2.setAttribute("stroke-dasharray", "160%, 40%"), n2.appendChild(i2), s(Rf, this).appendChild(n2);
    var r2 = document.createElement("div");
    r2.classList.add("loader-title"), r2.classList.add("i18n"), r2.innerText = t2, s(Rf, this).appendChild(r2);
  }
  var Hf = { _: document.getElementById("loader") };
  function Vf(t2) {
    try {
      return window.Asc.plugin.tr(t2);
    } catch (e2) {
      return console.error(e2), t2;
    }
  }
  var Gf, zf = {};
  !(function() {
    if (Gf) return zf;
    Gf = 1;
    var t2, e2 = ki(), n2 = xi(), i2 = Ne().f, r2 = Rn(), o2 = ua(), s2 = zu(), a2 = Mt(), c2 = Wu(), u2 = we(), l2 = n2("".slice), h2 = Math.min, f2 = c2("endsWith");
    e2({ target: "String", proto: true, forced: !!(u2 || f2 || (t2 = i2(String.prototype, "endsWith"), !t2 || t2.writable)) && !f2 }, { endsWith: function(t3) {
      var e3 = o2(a2(this));
      s2(t3);
      var n3 = arguments.length > 1 ? arguments[1] : void 0, i3 = e3.length, c3 = void 0 === n3 ? i3 : h2(r2(n3), i3), u3 = o2(t3);
      return l2(e3, c3 - u3.length, c3) === u3;
    } });
  })();
  var Wf, Kf, qf = {};
  Kf || (Kf = 1, (function() {
    if (Wf) return qf;
    Wf = 1;
    var t2 = ki(), e2 = B(), n2 = Pt(), i2 = Mt(), r2 = Rt(), o2 = Ft(), s2 = Gu(), a2 = ua(), c2 = Jt(), u2 = Ua(), l2 = Fa(), h2 = Ee(), f2 = we(), d2 = h2("replace"), p2 = TypeError, v2 = n2("".indexOf), m2 = n2("".replace), _2 = n2("".slice), b2 = Math.max;
    t2({ target: "String", proto: true }, { replaceAll: function(t3, n3) {
      var h3, g2, y2, w2, S2, O2, k2, x2, A2, C2, E2 = i2(this), I2 = 0, L2 = "";
      if (o2(t3)) {
        if ((h3 = s2(t3)) && (g2 = a2(i2(u2(t3))), !~v2(g2, "g"))) throw new p2("`.replaceAll` does not allow non-global regexes");
        if (y2 = c2(t3, d2)) return e2(y2, t3, E2, n3);
        if (f2 && h3) return m2(a2(E2), t3, n3);
      }
      for (w2 = a2(E2), S2 = a2(t3), (O2 = r2(n3)) || (n3 = a2(n3)), k2 = S2.length, x2 = b2(1, k2), A2 = v2(w2, S2); -1 !== A2; ) C2 = O2 ? a2(n3(S2, A2, w2)) : l2(S2, w2, A2, [], void 0, n3), L2 += _2(w2, I2, A2) + C2, I2 = A2 + k2, A2 = A2 + x2 > w2.length ? -1 : v2(w2, S2, A2 + x2);
      return I2 < w2.length && (L2 += _2(w2, I2)), L2;
    } });
  })());
  var Jf = (function() {
    function t2() {
      o(this, t2);
    }
    return h(t2, null, [{ key: "parseHtmlFormatting", value: function(n2) {
      for (var i2 = { text: "", formatting: [] }, r2 = [], o2 = 0, s2 = 0; s2 < n2.length; ) if ("<" === n2[s2] && s2 + 1 < n2.length) {
        var a2 = "/" === n2[s2 + 1], c2 = n2.indexOf(">", s2);
        if (-1 === c2) {
          i2.text += n2[s2], s2++;
          continue;
        }
        var u2 = n2.substring(a2 ? s2 + 2 : s2 + 1, c2).trim(), l2 = u2.split(" ");
        if (0 === l2.length) {
          i2.text += n2[s2], s2++;
          continue;
        }
        var h2 = l2[0].toLowerCase();
        if ("br" === h2) {
          i2.text += "\n", s2 = c2 + 1;
          continue;
        }
        var f2 = h2;
        if (-1 !== u2.indexOf("font-variant:small-caps") ? f2 = "sc" : -1 !== u2.indexOf("text-decoration:underline") && (f2 = "u"), e(t2, this, Zf)._.has(h2)) if (a2) {
          for (var d2 = r2.length - 1; d2 >= 0; d2--) if (r2[d2].tag === h2) {
            var p2 = r2.splice(d2, 1)[0], v2 = p2.start, m2 = p2.styleTag;
            i2.formatting.push({ type: m2, start: v2, end: o2 });
            break;
          }
        } else r2.push({ tag: h2, start: o2, styleTag: f2 });
        s2 = c2 + 1;
      } else i2.text += n2[s2], o2++, s2++;
      return i2.formatting.sort(function(t3, e2) {
        return t3.start === e2.start ? e2.end - t3.end : t3.start - e2.start;
      }), i2;
    } }]);
  })(), Zf = { _: /* @__PURE__ */ new Set(["i", "u", "b", "sc", "sup", "sub", "em", "div", "span"]) }, Yf = (function() {
    return h(function t2() {
      o(this, t2);
    }, null, [{ key: "formatAfterInsert", value: function(t2) {
      return new Promise(function(e2) {
        Asc.scope.formatting = t2, Asc.plugin.callCommand(function() {
          for (var t3 = Api.GetDocument().GetCurrentRun(), e3 = Asc.scope.formatting.length - 1; e3 >= 0; e3--) {
            var n2 = Asc.scope.formatting[e3], i2 = t3.GetRange(n2.start, n2.end);
            i2 && ("sup" === n2.type ? i2.SetVertAlign("superscript") : "sub" === n2.type ? i2.SetVertAlign("subscript") : "sc" === n2.type ? i2.SetSmallCaps(true) : "u" === n2.type ? i2.SetUnderline(true) : "b" === n2.type ? i2.SetBold(true) : "i" !== n2.type && "em" !== n2.type || i2.SetItalic(true));
          }
        }, false, true, e2);
      });
    } }, { key: "formatAfterUpdate", value: function(t2, e2) {
      return Asc.scope.fieldId = t2, Asc.scope.text = e2.text, Asc.scope.formatting = e2.formatting, new Promise(function(t3) {
        Asc.plugin.callCommand(function() {
          var t4 = Api.GetDocument(), e3 = t4.GetRangeBySelect();
          if (e3) {
            if (1 === Asc.scope.formatting.length) {
              var n2 = Asc.scope.formatting[0];
              if (0 === n2.start && n2.end === e3.GetText().length) return void a2(e3, n2.type);
            }
            t4.MoveCursorToPos(e3.GetEndPos() - Asc.scope.text.length);
            for (var i2 = t4.GetCurrentRun(), r2 = Asc.scope.formatting.length - 1; r2 >= 0; r2--) {
              var o2 = Asc.scope.formatting[r2], s2 = i2.GetRange(o2.start, o2.end);
              s2 && a2(s2, o2.type);
            }
          }
          function a2(t5, e4) {
            "sup" === e4 ? t5.SetVertAlign("superscript") : "sub" === e4 ? t5.SetVertAlign("subscript") : "sc" === e4 ? t5.SetSmallCaps(true) : "u" === e4 ? t5.SetUnderline(true) : "b" === e4 ? t5.SetBold(true) : "i" !== e4 && "em" !== e4 || t5.SetItalic(true);
          }
        }, false, true, t3);
      });
    } }]);
  })(), $f = /* @__PURE__ */ new WeakMap(), Xf = /* @__PURE__ */ new WeakMap(), Qf = /* @__PURE__ */ new WeakMap(), td = /* @__PURE__ */ new WeakMap(), ed = /* @__PURE__ */ new WeakMap(), nd = /* @__PURE__ */ new WeakMap(), id = /* @__PURE__ */ new WeakSet(), rd = (function() {
    return h(function t3(e2, n3, i2, r3) {
      o(this, t3), u(this, id), a(this, $f, void 0), a(this, Xf, void 0), a(this, Qf, void 0), a(this, td, void 0), a(this, ed, void 0), a(this, nd, void 0), c($f, this, "ZOTERO_CITATION"), c(Qf, this, "ZOTERO_BIBLIOGRAPHY"), c(Xf, this, e2), c(td, this, n3), c(ed, this, i2), c(nd, this, r3);
    }, [{ key: "addBibliography", value: (function() {
      var t3 = i(m().m(function t4(n3, i2) {
        var r3, o2, a2, c2, u2, l3 = this;
        return m().w(function(t5) {
          for (; ; ) switch (t5.n) {
            case 0:
              if (!((r3 = window.Asc.scope.editorVersion) && r3 < 9004e3)) {
                t5.n = 1;
                break;
              }
              return o2 = Jf.parseHtmlFormatting(n3), c2 = { FieldId: a2 = "", Value: s(ed, this) + i2 + s(nd, this), Content: o2.text }, t5.a(2, e(id, this, od).call(this, c2).then(function() {
                return l3.getCurrentField();
              }).then(function(t6) {
                if (a2 = (null == t6 ? void 0 : t6.FieldId) || "", o2.formatting.length) return Yf.formatAfterInsert(o2.formatting);
              }).then(function() {
                return a2;
              }));
            case 1:
              return u2 = { FieldId: "", Value: s(ed, this) + i2 + s(nd, this), Content: " " }, t5.n = 2, e(id, this, pd).call(this, u2, n3);
            case 2:
              return t5.a(2, t5.v);
            case 3:
              return t5.a(2);
          }
        }, t4, this);
      }));
      return function(e2, n3) {
        return t3.apply(this, arguments);
      };
    })() }, { key: "addCitation", value: (_2 = i(m().m(function t3(n3, i2, r3) {
      var o2, a2, c2;
      return m().w(function(t4) {
        for (; ; ) switch (t4.n) {
          case 0:
            if (o2 = Jf.parseHtmlFormatting(n3), a2 = { FieldId: "", Value: s(Xf, this) + " " + s(td, this) + i2, Content: o2.text }, !(c2 = !(!r3 || -1 === ["footnotes", "endnotes"].indexOf(r3)))) {
              t4.n = 1;
              break;
            }
            return t4.n = 1, e(id, this, sd).call(this, r3);
          case 1:
            return t4.n = 2, e(id, this, od).call(this, a2);
          case 2:
            if (o2.formatting.length) {
              t4.n = 3;
              break;
            }
            return t4.a(2, c2);
          case 3:
            return t4.n = 4, Yf.formatAfterInsert(o2.formatting);
          case 4:
            if (!c2) {
              t4.n = 5;
              break;
            }
            return t4.n = 5, e(id, this, fd).call(this);
          case 5:
            return t4.a(2, c2);
        }
      }, t3, this);
    })), function(t3, e2, n3) {
      return _2.apply(this, arguments);
    }) }, { key: "getCurrentField", value: function() {
      return new Promise(function(t3, e2) {
        window.Asc.plugin.executeMethod("GetCurrentAddinField", void 0, t3);
      });
    } }, { key: "getAddinZoteroFields", value: function() {
      var t3 = this;
      return new Promise(function(n3, i2) {
        e(id, t3, ad).call(t3).then(function(e2) {
          try {
            e2.length && (e2 = e2.filter(function(e3) {
              return -1 !== e3.Value.indexOf(s(Xf, t3)) || -1 !== e3.Value.indexOf(s(ed, t3)) || -1 !== e3.Value.indexOf(s($f, t3)) || -1 !== e3.Value.indexOf(s(Qf, t3));
            }));
          } catch (t4) {
            i2(t4);
          }
          n3(e2);
        });
      });
    } }, { key: "saveAsText", value: function() {
      return this.getAddinZoteroFields().then(function(t3) {
        if (!t3.length) return window.Asc.plugin.executeCommand("close", ""), false;
        var e2 = t3.map(function(t4) {
          return new Promise(function(e3) {
            window.Asc.plugin.executeMethod("RemoveFieldWrapper", [t4.FieldId], e3);
          });
        });
        return Promise.all(e2).then(function() {
          return true;
        }).catch(function(t4) {
          return console.error(t4), false;
        });
      });
    } }, { key: "updateAddinFields", value: (v2 = i(m().m(function t3(n3) {
      var i2, r3, o2, a2, c2, u2, l3, h2, d3, p3, v3, _3, g2 = this;
      return m().w(function(t4) {
        for (; ; ) switch (t4.p = t4.n) {
          case 0:
            if (i2 = n3.map(function(t5) {
              return t5.FieldId;
            }), r3 = window.Asc.scope.editorVersion, o2 = n3.filter(function(t5) {
              return 0 === t5.Value.indexOf(s(ed, g2));
            }), !(o2.length && r3 && r3 >= 9004e3)) {
              t4.n = 3;
              break;
            }
            return n3 = n3.filter(function(t5) {
              return 0 !== t5.Value.indexOf(s(ed, g2));
            }), a2 = o2[0], t4.n = 1, e(id, this, hd).call(this, a2.FieldId);
          case 1:
            return c2 = a2.Content || "", a2.Content = " ", t4.n = 2, e(id, this, ld).call(this);
          case 2:
            return t4.n = 3, e(id, this, pd).call(this, a2, c2);
          case 3:
            return u2 = e(id, this, cd).call(this, n3), t4.n = 4, new Promise(function(t5) {
              window.Asc.plugin.executeMethod("UpdateAddinFields", [n3], t5);
            });
          case 4:
            if (u2.size) {
              t4.n = 5;
              break;
            }
            return t4.a(2, i2);
          case 5:
            l3 = f(u2), t4.p = 6, l3.s();
          case 7:
            if ((h2 = l3.n()).done) {
              t4.n = 11;
              break;
            }
            return d3 = b(h2.value, 2), p3 = d3[0], v3 = d3[1], t4.n = 8, e(id, this, hd).call(this, p3);
          case 8:
            if (t4.v) {
              t4.n = 9;
              break;
            }
            return t4.a(3, 10);
          case 9:
            return t4.n = 10, Yf.formatAfterUpdate(p3, v3);
          case 10:
            t4.n = 7;
            break;
          case 11:
            t4.n = 13;
            break;
          case 12:
            t4.p = 12, _3 = t4.v, l3.e(_3);
          case 13:
            return t4.p = 13, l3.f(), t4.f(13);
          case 14:
            return t4.a(2, i2);
        }
      }, t3, this, [[6, 12, 13, 14]]);
    })), function(t3) {
      return v2.apply(this, arguments);
    }) }, { key: "convertNotesToText", value: (p2 = i(m().m(function t3(n3) {
      var i2, r3, o2, s2;
      return m().w(function(t4) {
        for (; ; ) switch (t4.n) {
          case 0:
            i2 = e(id, this, cd).call(this, n3), r3 = 0;
          case 1:
            if (!(r3 < n3.length)) {
              t4.n = 12;
              break;
            }
            if ((o2 = n3[r3]).FieldId) {
              t4.n = 2;
              break;
            }
            return console.error("Field id is not defined"), t4.a(3, 11);
          case 2:
            return t4.n = 3, e(id, this, hd).call(this, o2.FieldId);
          case 3:
            if (t4.v) {
              t4.n = 4;
              break;
            }
            return t4.a(3, 11);
          case 4:
            return t4.n = 5, e(id, this, fd).call(this);
          case 5:
            if (t4.v) {
              t4.n = 6;
              break;
            }
            return t4.a(3, 11);
          case 6:
            return t4.n = 7, e(id, this, dd).call(this);
          case 7:
            return t4.n = 8, e(id, this, ld).call(this);
          case 8:
            return t4.n = 9, e(id, this, od).call(this, o2);
          case 9:
            if (s2 = i2.get(o2.FieldId)) {
              t4.n = 10;
              break;
            }
            return t4.a(3, 11);
          case 10:
            return t4.n = 11, Yf.formatAfterInsert(s2.formatting);
          case 11:
            r3++, t4.n = 1;
            break;
          case 12:
            return t4.a(2);
        }
      }, t3, this);
    })), function(t3) {
      return p2.apply(this, arguments);
    }) }, { key: "convertTextToNotes", value: (d2 = i(m().m(function t3(n3, i2) {
      var r3, o2, s2, a2;
      return m().w(function(t4) {
        for (; ; ) switch (t4.n) {
          case 0:
            r3 = e(id, this, cd).call(this, n3), o2 = 0;
          case 1:
            if (!(o2 < n3.length)) {
              t4.n = 10;
              break;
            }
            if ((s2 = n3[o2]).FieldId) {
              t4.n = 2;
              break;
            }
            return t4.a(3, 9);
          case 2:
            return t4.n = 3, e(id, this, hd).call(this, s2.FieldId);
          case 3:
            if (t4.v) {
              t4.n = 4;
              break;
            }
            return t4.a(3, 9);
          case 4:
            return t4.n = 5, e(id, this, ld).call(this);
          case 5:
            return t4.n = 6, e(id, this, sd).call(this, i2);
          case 6:
            return t4.n = 7, e(id, this, od).call(this, s2);
          case 7:
            if (a2 = r3.get(s2.FieldId)) {
              t4.n = 8;
              break;
            }
            return t4.a(3, 9);
          case 8:
            return t4.n = 9, Yf.formatAfterInsert(a2.formatting);
          case 9:
            o2++, t4.n = 1;
            break;
          case 10:
            return t4.a(2);
        }
      }, t3, this);
    })), function(t3, e2) {
      return d2.apply(this, arguments);
    }) }, { key: "convertNotesStyle", value: (l2 = i(m().m(function t3(n3, i2) {
      var r3, o2, s2, a2, c2;
      return m().w(function(t4) {
        for (; ; ) switch (t4.n) {
          case 0:
            r3 = [], o2 = e(id, this, cd).call(this, n3), s2 = 0;
          case 1:
            if (!(s2 < n3.length)) {
              t4.n = 14;
              break;
            }
            if ((a2 = n3[s2]).FieldId) {
              t4.n = 2;
              break;
            }
            return t4.a(3, 13);
          case 2:
            if (a2.Content) {
              t4.n = 3;
              break;
            }
            return r3.push(a2), t4.a(3, 13);
          case 3:
            return t4.n = 4, e(id, this, hd).call(this, a2.FieldId);
          case 4:
            if (t4.v) {
              t4.n = 5;
              break;
            }
            return t4.a(3, 13);
          case 5:
            return t4.n = 6, e(id, this, fd).call(this);
          case 6:
            if (t4.v) {
              t4.n = 7;
              break;
            }
            return t4.a(3, 13);
          case 7:
            return t4.n = 8, e(id, this, dd).call(this);
          case 8:
            return t4.n = 9, e(id, this, ld).call(this);
          case 9:
            return t4.n = 10, e(id, this, sd).call(this, i2);
          case 10:
            return t4.n = 11, e(id, this, od).call(this, a2);
          case 11:
            if (c2 = o2.get(a2.FieldId)) {
              t4.n = 12;
              break;
            }
            return t4.a(3, 13);
          case 12:
            return t4.n = 13, Yf.formatAfterInsert(c2.formatting);
          case 13:
            s2++, t4.n = 1;
            break;
          case 14:
            if (!r3.length) {
              t4.n = 15;
              break;
            }
            return t4.n = 15, new Promise(function(t5) {
              window.Asc.plugin.executeMethod("UpdateAddinFields", [r3], t5);
            });
          case 15:
            return t4.a(2);
        }
      }, t3, this);
    })), function(t3, e2) {
      return l2.apply(this, arguments);
    }) }, { key: "moveCursorToField", value: (r2 = i(m().m(function t3(e2, n3) {
      return m().w(function(t4) {
        for (; ; ) if (0 === t4.n) return t4.a(2, new Promise(function(t5) {
          n3 = null == n3 || n3, window.Asc.plugin.executeMethod("MoveCursorToField", [e2, n3], t5);
        }));
      }, t3);
    })), function(t3, e2) {
      return r2.apply(this, arguments);
    }) }, { key: "moveCursorOutsideField", value: (n2 = i(m().m(function t3(e2, n3) {
      return m().w(function(t4) {
        for (; ; ) if (0 === t4.n) return t4.a(2, new Promise(function(t5) {
          n3 = null != n3 && n3, window.Asc.plugin.executeMethod("MoveCursorOutsideField", [e2, n3], t5);
        }));
      }, t3);
    })), function(t3, e2) {
      return n2.apply(this, arguments);
    }) }, { key: "moveCursorRight", value: (t2 = i(m().m(function t3() {
      return m().w(function(t4) {
        for (; ; ) if (0 === t4.n) return t4.a(2, new Promise(function(t5) {
          Asc.plugin.callCommand(function() {
            Api.GetDocument().MoveCursorRight(1, false);
          }, false, true, t5);
        }));
      }, t3);
    })), function() {
      return t2.apply(this, arguments);
    }) }]);
    var t2, n2, r2, l2, d2, p2, v2, _2;
  })();
  function od(t2) {
    return new Promise(function(e2) {
      window.Asc.plugin.executeMethod("AddAddinField", [t2], e2);
    });
  }
  function sd(t2) {
    return Asc.scope.notesStyle = t2, new Promise(function(t3) {
      Asc.plugin.callCommand(function() {
        var t4 = Api.GetDocument();
        "footnotes" === Asc.scope.notesStyle ? t4.AddFootnote() : "endnotes" === Asc.scope.notesStyle && t4.AddEndnote();
      }, false, false, t3);
    });
  }
  function ad() {
    return new Promise(function(t2, e2) {
      window.Asc.plugin.executeMethod("GetAllAddinFields", void 0, t2);
    });
  }
  function cd(t2) {
    var e2 = /* @__PURE__ */ new Map();
    return t2.forEach(function(t3) {
      if (t3.Content) {
        var n2 = Jf.parseHtmlFormatting(t3.Content);
        t3.Content = n2.text, n2.formatting.length && t3.FieldId && e2.set(t3.FieldId, n2);
      }
    }), e2;
  }
  function ud(t2) {
    return new Promise(function(e2) {
      window.Asc.plugin.executeMethod("PasteHtml", [t2], e2);
    });
  }
  function ld() {
    return new Promise(function(t2) {
      window.Asc.plugin.executeMethod("RemoveSelectedContent", void 0, t2);
    });
  }
  function hd(t2) {
    return new Promise(function(e2) {
      window.Asc.plugin.executeMethod("SelectAddinField", [t2], function() {
        return e2(true);
      });
    });
  }
  function fd() {
    return new Promise(function(t2) {
      Asc.plugin.callCommand(function() {
        var t3 = Api.GetDocument().GetCurrentFootEndnote();
        if (t3) t3.SelectNoteReference();
      }, false, true, function() {
        return t2(true);
      });
    });
  }
  function dd() {
    return new Promise(function(t2) {
      Asc.plugin.callCommand(function() {
        var t3 = Api.GetDocument().GetRangeBySelect();
        t3 && t3.SetVertAlign("baseline");
      }, false, false, t2);
    });
  }
  function pd(t2, e2) {
    return vd.apply(this, arguments);
  }
  function vd() {
    return vd = i(m().m(function t2(n2, i2) {
      var r2, o2, s2, a2, c2;
      return m().w(function(t3) {
        for (; ; ) switch (t3.n) {
          case 0:
            return t3.n = 1, e(id, this, od).call(this, n2);
          case 1:
            return t3.n = 2, new Promise(function(t4) {
              Asc.plugin.callCommand(function() {
                Api.GetDocument().MoveCursorLeft(1, true);
              }, false, true, t4);
            });
          case 2:
            if (Asc.scope.bibStyle) {
              t3.n = 3;
              break;
            }
            throw "Bibliography style is not defined";
          case 3:
            return r2 = new DOMParser(), o2 = r2.parseFromString(i2, "text/html"), s2 = o2.querySelectorAll(".csl-entry"), a2 = new Array(s2.length), s2.forEach(function(t4, e2) {
              var n3 = t4.querySelector(".csl-left-margin"), i3 = t4.querySelector(".csl-right-inline");
              null == i3 || i3.replaceWith.apply(i3, g(i3.childNodes)), n3 && (a2[e2] = n3.textContent.trim(), n3.remove());
            }), i2 = o2.body.innerHTML, t3.n = 4, e(id, this, ud).call(this, i2);
          case 4:
            return t3.n = 5, this.getCurrentField();
          case 5:
            if (c2 = t3.v) {
              t3.n = 6;
              break;
            }
            return t3.a(2, "");
          case 6:
            return t3.n = 7, e(id, this, hd).call(this, c2.FieldId);
          case 7:
            return t3.n = 8, new Promise(function(t4) {
              Asc.scope.numbers = a2, Asc.plugin.callCommand(function() {
                var t5 = Api.GetDocument().GetRangeBySelect();
                if (t5) {
                  var e2 = Asc.scope.bibStyle;
                  t5.GetAllParagraphs().forEach(function(t6, n3) {
                    if ("" !== t6.GetText().trim()) if ("number" == typeof e2.linespacing && t6.SetSpacingLine(240 * e2.linespacing, "exact"), "number" == typeof e2.entryspacing && t6.SetSpacingAfter(240 * e2.entryspacing), e2["second-field-align"]) {
                      var i3 = Api.CreateRun();
                      i3.AddText(Asc.scope.numbers[n3]), i3.AddTabStop();
                      var r3 = 0 === n3 ? 4 : 0;
                      t6.AddElement(i3, r3), t6.SetIndLeft(120 * e2.maxoffset), t6.SetIndFirstLine(-120 * e2.maxoffset);
                    } else e2.hangingindent && (t6.SetIndLeft(720), t6.SetIndFirstLine(-720));
                  });
                }
              }, false, false, t4);
            });
          case 8:
            return Asc.scope.bibStyle = null, t3.a(2, c2.FieldId);
        }
      }, t2, this);
    })), vd.apply(this, arguments);
  }
  var md, _d = {};
  !(function() {
    if (md) return _d;
    md = 1;
    var t2 = ki(), e2 = Ni().findIndex, n2 = Or(), i2 = "findIndex", r2 = true;
    i2 in [] && Array(1)[i2](function() {
      r2 = false;
    }), t2({ target: "Array", proto: true, forced: r2 }, { findIndex: function(t3) {
      return e2(this, t3, arguments.length > 1 ? arguments[1] : void 0);
    } }), n2(i2);
  })();
  var bd = /* @__PURE__ */ new WeakMap(), gd = /* @__PURE__ */ new WeakMap(), yd = /* @__PURE__ */ new WeakMap(), wd = /* @__PURE__ */ new WeakSet(), Sd = (function() {
    return h(function t2() {
      o(this, t2), u(this, wd), a(this, bd, void 0), a(this, gd, void 0), a(this, yd, void 0), c(bd, this, []), c(gd, this, []), c(yd, this, []), this.size = 0;
    }, [{ key: "getItem", value: function(t2) {
      t2 = t2.toString();
      var e2 = s(gd, this).indexOf(t2);
      return e2 >= 0 ? s(bd, this)[e2] : null;
    } }, { key: "getItemIndex", value: function(t2) {
      return t2 = t2.toString(), s(gd, this).indexOf(t2);
    } }, { key: "clear", value: function() {
      return c(bd, this, []), c(yd, this, []), c(gd, this, []), this.size = 0, this;
    } }, { key: "deleteItem", value: function(t2) {
      t2 = t2.toString();
      var e2 = s(gd, this).indexOf(t2);
      return e2 >= 0 && (s(bd, this).splice(e2, 1), s(gd, this).splice(e2, 1), this.size--), this;
    } }, { key: "forEachItem", value: function(t2) {
      for (var e2 = 0; e2 < this.size; e2++) t2(s(bd, this)[e2], s(gd, this)[e2], this);
    } }, { key: "hasItem", value: function(t2) {
      return t2 = t2.toString(), s(gd, this).indexOf(t2) >= 0;
    } }, { key: "addCslCitation", value: function(t2) {
      var n2 = this;
      return s(yd, this).push(t2), t2.setNoteIndex(s(yd, this).length), t2.getCitationItems().forEach(function(t3) {
        e(wd, n2, Od).call(n2, t3.id, t3);
      }), this;
    } }, { key: "getAllCitationsInJson", value: function() {
      return s(yd, this).map(function(t2) {
        return t2.toJSON();
      });
    } }, { key: "getCitation", value: function(t2) {
      return s(yd, this).find(function(e2) {
        return e2.citationID === t2;
      });
    } }, { key: "getCitationIndex", value: function(t2) {
      return s(yd, this).findIndex(function(e2) {
        return e2.citationID === t2;
      });
    } }, { key: "getCitationsPre", value: function(t2) {
      var e2 = [];
      return s(yd, this).find(function(n2, i2) {
        return n2.citationID === t2 || (e2.push([n2.citationID, i2 + 1]), false);
      }), e2;
    } }, { key: "getCitationsPost", value: function(t2) {
      for (var e2 = [], n2 = this.getCitationIndex(t2) + 1; n2 < s(yd, this).length; n2++) {
        var i2 = s(yd, this)[n2];
        e2.push([i2.citationID, n2 + 1]);
      }
      return e2;
    } }]);
  })();
  function Od(t2, e2) {
    t2 = t2.toString();
    var n2 = s(gd, this).indexOf(t2);
    return n2 >= 0 ? (s(bd, this)[n2] = e2, this) : (s(bd, this).push(e2), s(gd, this).push(t2), this.size++, this);
  }
  function kd(t2) {
    if ("string" != typeof t2 && "number" != typeof t2) throw new Error("CitationItemData: id is required");
    this._id = t2, this._type = void 0, this._citationKey = void 0, this._categories = new Array(), this._language = void 0, this._journalAbbreviation = void 0, this._shortTitle = void 0, this._author = new Array(), this._chair = new Array(), this._collectionEditor = new Array(), this._compiler = new Array(), this._composer = new Array(), this._containerAuthor = new Array(), this._contributor = new Array(), this._curator = new Array(), this._director = new Array(), this._editor = new Array(), this._editorialDirector = new Array(), this._executiveProducer = new Array(), this._guest = new Array(), this._host = new Array(), this._illustrator = new Array(), this._narrator = new Array(), this._organizer = new Array(), this._originalAuthor = new Array(), this._performer = new Array(), this._producer = new Array(), this._recipient = new Array(), this._reviewedAuthor = new Array(), this._scriptwriter = new Array(), this._seriesCreator = new Array(), this._translator = new Array(), this._accessed = {}, this._container = {}, this._eventDate = {}, this._issued = {}, this._originalDate = {}, this._submitted = {}, this._abstract = void 0, this._annote = void 0, this._archive = void 0, this._archiveCollection = void 0, this._archiveLocation = void 0, this._archivePlace = void 0, this._authority = void 0, this._callNumber = void 0, this._chapterNumber = void 0, this._citationNumber = void 0, this._citationLabel = void 0, this._collectionNumber = void 0, this._collectionTitle = void 0, this._containerTitle = void 0, this._containerTitleShort = void 0, this._dimensions = void 0, this._DOI = void 0, this._edition = void 0, this._event = void 0, this._eventTitle = void 0, this._eventPlace = void 0, this._firstReferenceNoteNumber = void 0, this._genre = void 0, this._ISBN = void 0, this._ISSN = void 0, this._issue = void 0, this._jurisdiction = void 0, this._keyword = void 0, this._locator = void 0, this._medium = void 0, this._note = void 0, this._number = void 0, this._numberOfPages = void 0, this._numberOfVolumes = void 0, this._originalPublisher = void 0, this._originalPublisherPlace = void 0, this._originalTitle = void 0, this._page = void 0, this._part = void 0, this._partTitle = void 0, this._pageFirst = void 0, this._PMCID = void 0, this._PMID = void 0, this._printing = void 0, this._publisher = void 0, this._publisherPlace = void 0, this._references = void 0, this._reviewedGenre = void 0, this._reviewedTitle = void 0, this._scale = void 0, this._section = void 0, this._source = void 0, this._status = void 0, this._title = void 0, this._titleShort = void 0, this._URL = void 0, this._version = void 0, this._volume = void 0, this._volumeTitle = void 0, this._volumeTitleShort = void 0, this._yearSuffix = void 0, this._custom = {}, this.schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-data.json#/items";
  }
  function xd(t2) {
    if ("string" != typeof t2 && "number" != typeof t2) throw new Error("CitationItem: id is required");
    this.id = t2, this._itemData = new kd(t2), this._prefix = void 0, this._suffix = void 0, this._locator = void 0, this._label = void 0, this._suppressAuthor = void 0, this._authorOnly = void 0, this._uris = new Array();
  }
  kd.prototype._addCustomProperty = function(t2, e2) {
    return this._custom[t2] = e2, this;
  }, kd.prototype.getCustomProperty = function(t2) {
    return Object.hasOwnProperty.call(this._custom, t2) ? this._custom[t2] : null;
  }, kd.prototype.fillFromObject = function(t2) {
    if (Object.hasOwnProperty.call(t2, "type") && (this._type = t2.type), Object.hasOwnProperty.call(t2, "categories") && (this._categories = t2.categories), Object.hasOwnProperty.call(t2, "citation-key") && (this._citationKey = t2["citation-key"]), Object.hasOwnProperty.call(t2, "language") && (this._language = t2.language), Object.hasOwnProperty.call(t2, "journalAbbreviation") && (this._journalAbbreviation = t2.journalAbbreviation), Object.hasOwnProperty.call(t2, "shortTitle") && (this._shortTitle = t2.shortTitle), Object.hasOwnProperty.call(t2, "author") && (this._author = t2.author), Object.hasOwnProperty.call(t2, "chair") && (this._chair = t2.chair), Object.hasOwnProperty.call(t2, "collection-editor") && (this._collectionEditor = t2["collection-editor"]), Object.hasOwnProperty.call(t2, "compiler") && (this._compiler = t2.compiler), Object.hasOwnProperty.call(t2, "composer") && (this._composer = t2.composer), Object.hasOwnProperty.call(t2, "container-author") && (this._containerAuthor = t2["container-author"]), Object.hasOwnProperty.call(t2, "contributor") && (this._contributor = t2.contributor), Object.hasOwnProperty.call(t2, "curator") && (this._curator = t2.curator), Object.hasOwnProperty.call(t2, "director") && (this._director = t2.director), Object.hasOwnProperty.call(t2, "editorial-director") && (this._editorialDirector = t2["editorial-director"]), Object.hasOwnProperty.call(t2, "editor") && (this._editor = t2.editor), Object.hasOwnProperty.call(t2, "executive-producer") && (this._executiveProducer = t2["executive-producer"]), Object.hasOwnProperty.call(t2, "guest") && (this._guest = t2.guest), Object.hasOwnProperty.call(t2, "host") && (this._host = t2.host), Object.hasOwnProperty.call(t2, "illustrator") && (this._illustrator = t2.illustrator), Object.hasOwnProperty.call(t2, "narrator") && (this._narrator = t2.narrator), Object.hasOwnProperty.call(t2, "organizer") && (this._organizer = t2.organizer), Object.hasOwnProperty.call(t2, "original-author") && (this._originalAuthor = t2["original-author"]), Object.hasOwnProperty.call(t2, "performer") && (this._performer = t2.performer), Object.hasOwnProperty.call(t2, "producer") && (this._producer = t2.producer), Object.hasOwnProperty.call(t2, "recipient") && (this._recipient = t2.recipient), Object.hasOwnProperty.call(t2, "reviewed-author") && (this._reviewedAuthor = t2["reviewed-author"]), Object.hasOwnProperty.call(t2, "script-writer") && (this._scriptWriter = t2["script-writer"]), Object.hasOwnProperty.call(t2, "series-creator") && (this._seriesCreator = t2["series-creator"]), Object.hasOwnProperty.call(t2, "translator") && (this._translator = t2.translator), Object.hasOwnProperty.call(t2, "accessed") && (this._accessed = t2.accessed), Object.hasOwnProperty.call(t2, "container") && (this._container = t2.container), Object.hasOwnProperty.call(t2, "event-date") && (this._eventDate = t2["event-date"]), Object.hasOwnProperty.call(t2, "issued") && (this._issued = t2.issued), Object.hasOwnProperty.call(t2, "original-date") && (this._originalDate = t2["original-date"]), Object.hasOwnProperty.call(t2, "submitted") && (this._submitted = t2.submitted), Object.hasOwnProperty.call(t2, "abstract") && (this._abstract = t2.abstract), Object.hasOwnProperty.call(t2, "annote") && (this._annote = t2.annote), Object.hasOwnProperty.call(t2, "archive") && (this._archive = t2.archive), Object.hasOwnProperty.call(t2, "archive_collection") && (this._archiveCollection = t2.archive_collection), Object.hasOwnProperty.call(t2, "archive_location") && (this._archiveLocation = t2.archive_location), Object.hasOwnProperty.call(t2, "archive-place") && (this._archivePlace = t2["archive-place"]), Object.hasOwnProperty.call(t2, "authority") && (this._authority = t2.authority), Object.hasOwnProperty.call(t2, "call-number") && (this._callNumber = t2["call-number"]), Object.hasOwnProperty.call(t2, "chapter-number") && (this._chapterNumber = t2["chapter-number"]), Object.hasOwnProperty.call(t2, "citation-number") && (this._citationNumber = t2["citation-number"]), Object.hasOwnProperty.call(t2, "citation-label") && (this._citationLabel = t2["citation-label"]), Object.hasOwnProperty.call(t2, "collection-number") && (this._collectionNumber = t2["collection-number"]), Object.hasOwnProperty.call(t2, "collection-title") && (this._collectionTitle = t2["collection-title"]), Object.hasOwnProperty.call(t2, "container-title") && (this._containerTitle = t2["container-title"]), Object.hasOwnProperty.call(t2, "container-title-short") && (this._containerTitleShort = t2["container-title-short"]), Object.hasOwnProperty.call(t2, "dimensions") && (this._dimensions = t2.dimensions), Object.hasOwnProperty.call(t2, "DOI") && (this._DOI = t2.DOI), Object.hasOwnProperty.call(t2, "edition") && (this._edition = t2.edition), Object.hasOwnProperty.call(t2, "event") && (this._event = t2.event), Object.hasOwnProperty.call(t2, "event-title") && (this._eventTitle = t2["event-title"]), Object.hasOwnProperty.call(t2, "event-place") && (this._eventPlace = t2["event-place"]), Object.hasOwnProperty.call(t2, "first-reference-note-number") && (this._firstReferenceNoteNumber = t2["first-reference-note-number"]), Object.hasOwnProperty.call(t2, "genre") && (this._genre = t2.genre), Object.hasOwnProperty.call(t2, "ISBN") && (this._ISBN = t2.ISBN), Object.hasOwnProperty.call(t2, "ISSN") && (this._ISSN = t2.ISSN), Object.hasOwnProperty.call(t2, "issue") && (this._issue = t2.issue), Object.hasOwnProperty.call(t2, "jurisdiction") && (this._jurisdiction = t2.jurisdiction), Object.hasOwnProperty.call(t2, "keyword") && (this._keyword = t2.keyword), Object.hasOwnProperty.call(t2, "locator") && (this._locator = t2.locator), Object.hasOwnProperty.call(t2, "medium") && (this._medium = t2.medium), Object.hasOwnProperty.call(t2, "note") && (this._note = t2.note), Object.hasOwnProperty.call(t2, "number") && (this._number = t2.number), Object.hasOwnProperty.call(t2, "number-of-pages") && (this._numberOfPages = t2["number-of-pages"]), Object.hasOwnProperty.call(t2, "number-of-volumes") && (this._numberOfVolumes = t2["number-of-volumes"]), Object.hasOwnProperty.call(t2, "original-publisher") && (this._originalPublisher = t2["original-publisher"]), Object.hasOwnProperty.call(t2, "original-publisher-place") && (this._originalPublisherPlace = t2["original-publisher-place"]), Object.hasOwnProperty.call(t2, "original-title") && (this._originalTitle = t2["original-title"]), Object.hasOwnProperty.call(t2, "page") && (this._page = t2.page), Object.hasOwnProperty.call(t2, "page-first") && (this._pageFirst = t2["page-first"]), Object.hasOwnProperty.call(t2, "part") && (this._part = t2.part), Object.hasOwnProperty.call(t2, "part-title") && (this._partTitle = t2["part-title"]), Object.hasOwnProperty.call(t2, "PMCID") && (this._PMCID = t2.PMCID), Object.hasOwnProperty.call(t2, "PMID") && (this._PMID = t2.PMID), Object.hasOwnProperty.call(t2, "printing") && (this._printing = t2.printing), Object.hasOwnProperty.call(t2, "publisher") && (this._publisher = t2.publisher), Object.hasOwnProperty.call(t2, "publisher-place") && (this._publisherPlace = t2["publisher-place"]), Object.hasOwnProperty.call(t2, "references") && (this._references = t2.references), Object.hasOwnProperty.call(t2, "reviewed-genre") && (this._reviewedGenre = t2["reviewed-genre"]), Object.hasOwnProperty.call(t2, "reviewed-title") && (this._reviewedTitle = t2["reviewed-title"]), Object.hasOwnProperty.call(t2, "scale") && (this._scale = t2.scale), Object.hasOwnProperty.call(t2, "section") && (this._section = t2.section), Object.hasOwnProperty.call(t2, "source") && (this._source = t2.source), Object.hasOwnProperty.call(t2, "status") && (this._status = t2.status), Object.hasOwnProperty.call(t2, "title") && (this._title = t2.title), Object.hasOwnProperty.call(t2, "title-short") && (this._titleShort = t2["title-short"]), Object.hasOwnProperty.call(t2, "URL") && (this._URL = t2.URL), Object.hasOwnProperty.call(t2, "version") && (this._version = t2.version), Object.hasOwnProperty.call(t2, "volume") && (this._volume = t2.volume), Object.hasOwnProperty.call(t2, "volume-title") && (this._volumeTitle = t2["volume-title"]), Object.hasOwnProperty.call(t2, "volume-title-short") && (this._volumeTitleShort = t2["volume-title-short"]), Object.hasOwnProperty.call(t2, "year-suffix") && (this._yearSuffix = t2["year-suffix"]), Object.hasOwnProperty.call(t2, "custom") && (this._custom = t2.custom), Object.hasOwnProperty.call(t2, "userID") && this._addCustomProperty("userID", t2.userID), Object.hasOwnProperty.call(t2, "groupID") && this._addCustomProperty("groupID", t2.groupID), Object.hasOwnProperty.call(t2, "creators")) {
      var e2 = this;
      t2.creators.forEach(function(t3) {
        var n2 = {};
        t3.firstName && (n2.given = t3.firstName), t3.lastName && (n2.family = t3.lastName), e2._author.some(function(t4) {
          return (t4.family === n2.family || !t4.family && !n2.family) && (t4.given === n2.given || !t4.given && !n2.given);
        }) || e2._author.push(n2);
      }, this);
    }
    Object.hasOwnProperty.call(t2, "libraryCatalog") && (this._source = t2.libraryCatalog), Object.hasOwnProperty.call(t2, "place") && (this._eventPlace = t2.place, this._publisherPlace = t2.place), Object.hasOwnProperty.call(t2, "numberOfVolumes") && (this._numberOfVolumes = t2.numberOfVolumes), Object.hasOwnProperty.call(t2, "callNumber") && (this._callNumber = t2.callNumber), Object.hasOwnProperty.call(t2, "seriesNumber") && (this._collectionNumber = t2.seriesNumber), Object.hasOwnProperty.call(t2, "series") && (this._collectionTitle = t2.series), Object.hasOwnProperty.call(t2, "bookTitle") && (this._containerTitle = t2.bookTitle), Object.hasOwnProperty.call(t2, "extra") && (this._note = t2.extra), Object.hasOwnProperty.call(t2, "rights") && (this._license = t2.rights), Object.hasOwnProperty.call(t2, "archiveLocation") && (this._archiveLocation = t2.archiveLocation), Object.hasOwnProperty.call(t2, "abstractNote") && (this._abstract = t2.abstractNote);
  }, kd.prototype.getTitle = function() {
    return this._title;
  }, kd.prototype.getType = function() {
    return this._type;
  }, kd.prototype.setType = function(t2) {
    return this._type = t2, this;
  }, kd.prototype.setCitationKey = function(t2) {
    return this._citationKey = t2, this;
  }, kd.prototype.setCategories = function(t2) {
    return this._categories = t2, this;
  }, kd.prototype.setLanguage = function(t2) {
    return this._language = t2, this;
  }, kd.prototype.setJournalAbbreviation = function(t2) {
    return this._journalAbbreviation = t2, this;
  }, kd.prototype.setShortTitle = function(t2) {
    return this._shortTitle = t2, this;
  }, kd.prototype.setAuthor = function(t2) {
    return this._author = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setChair = function(t2) {
    return this._chair = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setCollectionEditor = function(t2) {
    return this._collectionEditor = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setCompiler = function(t2) {
    return this._compiler = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setComposer = function(t2) {
    return this._composer = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setContainerAuthor = function(t2) {
    return this._containerAuthor = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setContributor = function(t2) {
    return this._contributor = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setCurator = function(t2) {
    return this._curator = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setDirector = function(t2) {
    return this._director = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setEditor = function(t2) {
    return this._editor = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setEditorialDirector = function(t2) {
    return this._editorialDirector = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setExecutiveProducer = function(t2) {
    return this._executiveProducer = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setGuest = function(t2) {
    return this._guest = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setHost = function(t2) {
    return this._host = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setIllustrator = function(t2) {
    return this._illustrator = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setNarrator = function(t2) {
    return this._narrator = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setOrganizer = function(t2) {
    return this._organizer = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setOriginalAuthor = function(t2) {
    return this._originalAuthor = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setPerformer = function(t2) {
    return this._performer = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setProducer = function(t2) {
    return this._producer = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setRecipient = function(t2) {
    return this._recipient = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setReviewedAuthor = function(t2) {
    return this._reviewedAuthor = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setScriptwriter = function(t2) {
    return this._scriptwriter = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setSeriesCreator = function(t2) {
    return this._seriesCreator = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setTranslator = function(t2) {
    return this._translator = Array.isArray(t2) ? t2 : [t2], this;
  }, kd.prototype.setAccessed = function(t2) {
    return this._accessed = t2 || {}, this;
  }, kd.prototype.setContainer = function(t2) {
    return this._container = t2 || {}, this;
  }, kd.prototype.setEventDate = function(t2) {
    return this._eventDate = t2 || {}, this;
  }, kd.prototype.setIssued = function(t2) {
    return this._issued = t2 || {}, this;
  }, kd.prototype.setOriginalDate = function(t2) {
    return this._originalDate = t2 || {}, this;
  }, kd.prototype.setSubmitted = function(t2) {
    return this._submitted = t2 || {}, this;
  }, kd.prototype.setAbstract = function(t2) {
    return this._abstract = t2, this;
  }, kd.prototype.setAnnote = function(t2) {
    return this._annote = t2, this;
  }, kd.prototype.setArchive = function(t2) {
    return this._archive = t2, this;
  }, kd.prototype.setArchiveCollection = function(t2) {
    return this._archiveCollection = t2, this;
  }, kd.prototype.setArchiveLocation = function(t2) {
    return this._archiveLocation = t2, this;
  }, kd.prototype.setArchivePlace = function(t2) {
    return this._archivePlace = t2, this;
  }, kd.prototype.setAuthority = function(t2) {
    return this._authority = t2, this;
  }, kd.prototype.setCallNumber = function(t2) {
    return this._callNumber = t2, this;
  }, kd.prototype.setChapterNumber = function(t2) {
    return this._chapterNumber = t2, this;
  }, kd.prototype.setCitationNumber = function(t2) {
    return this._citationNumber = t2, this;
  }, kd.prototype.setCitationLabel = function(t2) {
    return this._citationLabel = t2, this;
  }, kd.prototype.setCollectionNumber = function(t2) {
    return this._collectionNumber = t2, this;
  }, kd.prototype.setCollectionTitle = function(t2) {
    return this._collectionTitle = t2, this;
  }, kd.prototype.setContainerTitle = function(t2) {
    return this._containerTitle = t2, this;
  }, kd.prototype.setContainerTitleShort = function(t2) {
    return this._containerTitleShort = t2, this;
  }, kd.prototype.setDimensions = function(t2) {
    return this._dimensions = t2, this;
  }, kd.prototype.setDOI = function(t2) {
    return this._DOI = t2, this;
  }, kd.prototype.setEdition = function(t2) {
    return this._edition = t2, this;
  }, kd.prototype.setEvent = function(t2) {
    return this._event = t2, this;
  }, kd.prototype.setEventTitle = function(t2) {
    return this._eventTitle = t2, this;
  }, kd.prototype.setEventPlace = function(t2) {
    return this._eventPlace = t2, this;
  }, kd.prototype.setFirstReferenceNoteNumber = function(t2) {
    return this._firstReferenceNoteNumber = t2, this;
  }, kd.prototype.setGenre = function(t2) {
    return this._genre = t2, this;
  }, kd.prototype.setISBN = function(t2) {
    return this._ISBN = t2, this;
  }, kd.prototype.setISSN = function(t2) {
    return this._ISSN = t2, this;
  }, kd.prototype.setIssue = function(t2) {
    return this._issue = t2, this;
  }, kd.prototype.setJurisdiction = function(t2) {
    return this._jurisdiction = t2, this;
  }, kd.prototype.setKeyword = function(t2) {
    return this._keyword = t2, this;
  }, kd.prototype.setLocator = function(t2) {
    return this._locator = t2, this;
  }, kd.prototype.setMedium = function(t2) {
    return this._medium = t2, this;
  }, kd.prototype.setNote = function(t2) {
    return this._note = t2, this;
  }, kd.prototype.setNumber = function(t2) {
    return this._number = t2, this;
  }, kd.prototype.setNumberOfPages = function(t2) {
    return this._numberOfPages = t2, this;
  }, kd.prototype.setNumberOfVolumes = function(t2) {
    return this._numberOfVolumes = t2, this;
  }, kd.prototype.setOriginalPublisher = function(t2) {
    return this._originalPublisher = t2, this;
  }, kd.prototype.setOriginalPublisherPlace = function(t2) {
    return this._originalPublisherPlace = t2, this;
  }, kd.prototype.setOriginalTitle = function(t2) {
    return this._originalTitle = t2, this;
  }, kd.prototype.setPage = function(t2) {
    return this._page = t2, this;
  }, kd.prototype.setPageFirst = function(t2) {
    return this._pageFirst = t2, this;
  }, kd.prototype.setPart = function(t2) {
    return this._part = t2, this;
  }, kd.prototype.setPartTitle = function(t2) {
    return this._partTitle = t2, this;
  }, kd.prototype.setPMCID = function(t2) {
    return this._PMCID = t2, this;
  }, kd.prototype.setPMID = function(t2) {
    return this._PMID = t2, this;
  }, kd.prototype.setPrinting = function(t2) {
    return this._printing = t2, this;
  }, kd.prototype.setPublisher = function(t2) {
    return this._publisher = t2, this;
  }, kd.prototype.setPublisherPlace = function(t2) {
    return this._publisherPlace = t2, this;
  }, kd.prototype.setReferences = function(t2) {
    return this._references = t2, this;
  }, kd.prototype.setReviewedGenre = function(t2) {
    return this._reviewedGenre = t2, this;
  }, kd.prototype.setReviewedTitle = function(t2) {
    return this._reviewedTitle = t2, this;
  }, kd.prototype.setScale = function(t2) {
    return this._scale = t2, this;
  }, kd.prototype.setSection = function(t2) {
    return this._section = t2, this;
  }, kd.prototype.setSource = function(t2) {
    return this._source = t2, this;
  }, kd.prototype.setStatus = function(t2) {
    return this._status = t2, this;
  }, kd.prototype.setTitle = function(t2) {
    return this._title = t2, this;
  }, kd.prototype.setTitleShort = function(t2) {
    return this._titleShort = t2, this;
  }, kd.prototype.setURL = function(t2) {
    return this._URL = t2, this;
  }, kd.prototype.setVersion = function(t2) {
    return this._version = t2, this;
  }, kd.prototype.setVolume = function(t2) {
    return this._volume = t2, this;
  }, kd.prototype.setVolumeTitle = function(t2) {
    return this._volumeTitle = t2, this;
  }, kd.prototype.setVolumeTitleShort = function(t2) {
    return this._volumeTitleShort = t2, this;
  }, kd.prototype.setYearSuffix = function(t2) {
    return this._yearSuffix = t2, this;
  }, kd.prototype.setCustom = function(t2) {
    return this._custom = Object.assign(this._custom, t2), this;
  }, kd.prototype.toJSON = function() {
    var t2 = {};
    return t2.id = this._id, void 0 !== this._type && "" !== this._type && (t2.type = this._type), void 0 !== this._citationKey && "" !== this._citationKey && (t2["citation-key"] = this._citationKey), this._categories.length > 0 && (t2.categories = this._categories), void 0 !== this._language && "" !== this._language && (t2.language = this._language), void 0 !== this._journalAbbreviation && "" !== this._journalAbbreviation && (t2.journalAbbreviation = this._journalAbbreviation), void 0 !== this._shortTitle && "" !== this._shortTitle && (t2.shortTitle = this._shortTitle, void 0 === this._titleShort && (t2["title-short"] = this._shortTitle)), this._author.length > 0 && (t2.author = this._author), this._chair.length > 0 && (t2.chair = this._chair), this._collectionEditor.length > 0 && (t2["collection-editor"] = this._collectionEditor), this._compiler.length > 0 && (t2.compiler = this._compiler), this._composer.length > 0 && (t2.composer = this._composer), this._containerAuthor.length > 0 && (t2["container-author"] = this._containerAuthor), this._contributor.length > 0 && (t2.contributor = this._contributor), this._curator.length > 0 && (t2.curator = this._curator), this._director.length > 0 && (t2.director = this._director), this._editor.length > 0 && (t2.editor = this._editor), this._editorialDirector.length > 0 && (t2["editorial-director"] = this._editorialDirector), this._executiveProducer.length > 0 && (t2["executive-producer"] = this._executiveProducer), this._guest.length > 0 && (t2.guest = this._guest), this._host.length > 0 && (t2.host = this._host), this._illustrator.length > 0 && (t2.illustrator = this._illustrator), this._narrator.length > 0 && (t2.narrator = this._narrator), this._organizer.length > 0 && (t2.organizer = this._organizer), this._originalAuthor.length > 0 && (t2["original-author"] = this._originalAuthor), this._performer.length > 0 && (t2.performer = this._performer), this._producer.length > 0 && (t2.producer = this._producer), this._recipient.length > 0 && (t2.recipient = this._recipient), this._reviewedAuthor.length > 0 && (t2["reviewed-author"] = this._reviewedAuthor), this._scriptwriter.length > 0 && (t2["script-writer"] = this._scriptwriter), this._seriesCreator.length > 0 && (t2["series-creator"] = this._seriesCreator), this._translator.length > 0 && (t2.translator = this._translator), Object.keys(this._accessed).length > 0 && (t2.accessed = this._accessed), Object.keys(this._container).length > 0 && (t2.container = this._container), Object.keys(this._eventDate).length > 0 && (t2["event-date"] = this._eventDate), Object.keys(this._issued).length > 0 && (t2.issued = this._issued), Object.keys(this._originalDate).length > 0 && (t2["original-date"] = this._originalDate), Object.keys(this._submitted).length > 0 && (t2.submitted = this._submitted), void 0 !== this._abstract && "" !== this._abstract && (t2.abstract = this._abstract), void 0 !== this._annote && "" !== this._annote && (t2.annote = this._annote), void 0 !== this._archive && "" !== this._archive && (t2.archive = this._archive), void 0 !== this._archiveCollection && "" !== this._archiveCollection && (t2.archive_collection = this._archiveCollection), void 0 !== this._archiveLocation && "" !== this._archiveLocation && (t2.archive_location = this._archiveLocation), void 0 !== this._archivePlace && "" !== this._archivePlace && (t2["archive-place"] = this._archivePlace), void 0 !== this._authority && "" !== this._authority && (t2.authority = this._authority), void 0 !== this._callNumber && "" !== this._callNumber && (t2["call-number"] = this._callNumber), void 0 !== this._chapterNumber && "" !== this._chapterNumber && (t2["chapter-number"] = this._chapterNumber), void 0 !== this._citationNumber && "" !== this._citationNumber && (t2["citation-number"] = this._citationNumber), void 0 !== this._citationLabel && "" !== this._citationLabel && (t2["citation-label"] = this._citationLabel), void 0 !== this._collectionNumber && "" !== this._collectionNumber && (t2["collection-number"] = this._collectionNumber), void 0 !== this._collectionTitle && "" !== this._collectionTitle && (t2["collection-title"] = this._collectionTitle), void 0 !== this._containerTitle && "" !== this._containerTitle && (t2["container-title"] = this._containerTitle), void 0 !== this._containerTitleShort && "" !== this._containerTitleShort && (t2["container-title-short"] = this._containerTitleShort), void 0 !== this._dimensions && "" !== this._dimensions && (t2.dimensions = this._dimensions), void 0 !== this._DOI && "" !== this._DOI && (t2.DOI = this._DOI), void 0 !== this._edition && "" !== this._edition && (t2.edition = this._edition), void 0 !== this._event && "" !== this._event && (t2.event = this._event), void 0 !== this._eventTitle && "" !== this._eventTitle && (t2["event-title"] = this._eventTitle), void 0 !== this._eventPlace && "" !== this._eventPlace && (t2["event-place"] = this._eventPlace), void 0 !== this._firstReferenceNoteNumber && "" !== this._firstReferenceNoteNumber && (t2["first-reference-note-number"] = this._firstReferenceNoteNumber), void 0 !== this._genre && "" !== this._genre && (t2.genre = this._genre), void 0 !== this._ISBN && "" !== this._ISBN && (t2.ISBN = this._ISBN), void 0 !== this._ISSN && "" !== this._ISSN && (t2.ISSN = this._ISSN), void 0 !== this._issue && "" !== this._issue && (t2.issue = this._issue), void 0 !== this._jurisdiction && "" !== this._jurisdiction && (t2.jurisdiction = this._jurisdiction), void 0 !== this._keyword && "" !== this._keyword && (t2.keyword = this._keyword), void 0 !== this._locator && "" !== this._locator && (t2.locator = this._locator), void 0 !== this._medium && "" !== this._medium && (t2.medium = this._medium), void 0 !== this._note && "" !== this._note && (t2.note = this._note), void 0 !== this._number && "" !== this._number && (t2.number = this._number), void 0 !== this._numberOfPages && "" !== this._numberOfPages && (t2["number-of-pages"] = this._numberOfPages), void 0 !== this._numberOfVolumes && "" !== this._numberOfVolumes && (t2["number-of-volumes"] = this._numberOfVolumes), void 0 !== this._originalPublisher && "" !== this._originalPublisher && (t2["original-publisher"] = this._originalPublisher), void 0 !== this._originalPublisherPlace && "" !== this._originalPublisherPlace && (t2["original-publisher-place"] = this._originalPublisherPlace), void 0 !== this._originalTitle && "" !== this._originalTitle && (t2["original-title"] = this._originalTitle), void 0 !== this._page && "" !== this._page && (t2.page = this._page), void 0 !== this._pageFirst && "" !== this._pageFirst && (t2["page-first"] = this._pageFirst), void 0 !== this._part && "" !== this._part && (t2.part = this._part), void 0 !== this._partTitle && "" !== this._partTitle && (t2["part-title"] = this._partTitle), void 0 !== this._PMCID && "" !== this._PMCID && (t2.PMCID = this._PMCID), void 0 !== this._PMID && "" !== this._PMID && (t2.PMID = this._PMID), void 0 !== this._printing && "" !== this._printing && (t2.printing = this._printing), void 0 !== this._publisher && "" !== this._publisher && (t2.publisher = this._publisher), void 0 !== this._publisherPlace && "" !== this._publisherPlace && (t2["publisher-place"] = this._publisherPlace), void 0 !== this._references && "" !== this._references && (t2.references = this._references), void 0 !== this._reviewedGenre && "" !== this._reviewedGenre && (t2["reviewed-genre"] = this._reviewedGenre), void 0 !== this._reviewedTitle && "" !== this._reviewedTitle && (t2["reviewed-title"] = this._reviewedTitle), void 0 !== this._scale && "" !== this._scale && (t2.scale = this._scale), void 0 !== this._section && "" !== this._section && (t2.section = this._section), void 0 !== this._source && "" !== this._source && (t2.source = this._source), void 0 !== this._status && "" !== this._status && (t2.status = this._status), void 0 !== this._title && "" !== this._title && (t2.title = this._title), void 0 !== this._titleShort && "" !== this._titleShort && (t2["title-short"] = this._titleShort), void 0 !== this._URL && "" !== this._URL && (t2.URL = this._URL), void 0 !== this._version && "" !== this._version && (t2.version = this._version), void 0 !== this._volume && "" !== this._volume && (t2.volume = this._volume), void 0 !== this._volumeTitle && "" !== this._volumeTitle && (t2["volume-title"] = this._volumeTitle), void 0 !== this._volumeTitleShort && "" !== this._volumeTitleShort && (t2["volume-title-short"] = this._volumeTitleShort), void 0 !== this._yearSuffix && "" !== this._yearSuffix && (t2["year-suffix"] = this._yearSuffix), 0 !== Object.keys(this._custom).length && (t2.custom = this._custom), void 0 !== this._license && "" !== this._license && (t2.license = this._license), t2;
  }, xd.prototype.fillFromObject = function(t2) {
    var e2 = this;
    Object.hasOwnProperty.call(t2, "version") && Object.hasOwnProperty.call(t2, "library") ? (this._itemData.fillFromObject(t2.data), Object.hasOwnProperty.call(t2, "links") && (Object.hasOwnProperty.call(t2.links, "self") && this.addUri(t2.links.self.href), Object.hasOwnProperty.call(t2.links, "alternate") && this.addUri(t2.links.alternate.href))) : Object.hasOwnProperty.call(t2, "itemData") ? this._itemData.fillFromObject(t2.itemData) : this._itemData.fillFromObject(t2), Object.hasOwnProperty.call(t2, "prefix") && (this._prefix = t2.prefix), Object.hasOwnProperty.call(t2, "suffix") && (this._suffix = t2.suffix), Object.hasOwnProperty.call(t2, "locator") && (this._locator = t2.locator), Object.hasOwnProperty.call(t2, "label") && (this._label = t2.label), Object.hasOwnProperty.call(t2, "suppress-author") && (this._suppressAuthor = t2["suppress-author"]), Object.hasOwnProperty.call(t2, "author-only") && (this._authorOnly = t2["author-only"]), Object.hasOwnProperty.call(t2, "uris") && t2.uris.forEach(function(t3) {
      e2.addUri(t3);
    }, this);
  }, xd.prototype.getInfoForCitationCluster = function() {
    var t2 = { id: this.id, "suppress-author": this._suppressAuthor };
    return this._prefix && (t2.prefix = this._prefix), this._suffix && (t2.suffix = this._suffix), this._locator && (t2.locator = this._locator), this._label && (t2.label = this._label), t2;
  }, xd.prototype.getItemData = function() {
    return this._itemData;
  }, xd.prototype.getProperty = function(t2) {
    return null !== this._itemData.getCustomProperty(t2) ? this._itemData.getCustomProperty(t2) : null;
  }, xd.prototype.setPrefix = function(t2) {
    return this._prefix = t2, this;
  }, xd.prototype.setSuffix = function(t2) {
    return this._suffix = t2, this;
  }, xd.prototype.setLocator = function(t2) {
    return this._locator = t2, this;
  }, xd.prototype.setLabel = function(t2) {
    if (t2) {
      if (-1 === ["act", "appendix", "article-locator", "book", "canon", "chapter", "column", "elocation", "equation", "figure", "folio", "issue", "line", "note", "opus", "page", "paragraph", "part", "rule", "scene", "section", "sub-verbo", "supplement", "table", "timestamp", "title-locator", "verse", "version", "volume"].indexOf(t2)) throw new Error('CitationItem.setLocator: Invalid label "' + t2 + '"');
      this._label = t2;
    }
    return this;
  }, xd.prototype.setSuppressAuthor = function(t2) {
    return this._suppressAuthor = t2, this;
  }, xd.prototype.setAuthorOnly = function(t2) {
    return this._authorOnly = t2, this;
  }, xd.prototype.addUri = function(t2) {
    return -1 !== this._uris.indexOf(t2) || this._uris.push(t2), this;
  }, xd.prototype.toJSON = function() {
    var t2 = {};
    return t2.id = this.id, this._itemData && (t2.itemData = this._itemData.toJSON ? this._itemData.toJSON() : this._itemData), void 0 !== this._prefix && (t2.prefix = this._prefix), void 0 !== this._suffix && (t2.suffix = this._suffix), void 0 !== this._locator && (t2.locator = this._locator), void 0 !== this._label && (t2.label = this._label), void 0 !== this._suppressAuthor && (t2["suppress-author"] = this._suppressAuthor), void 0 !== this._authorOnly && (t2["author-only"] = this._authorOnly), this._uris.length && (t2.uris = this._uris), t2;
  }, xd.prototype.toFlatJSON = function(t2) {
    var e2 = { id: this.id, index: t2 };
    void 0 !== this._suppressAuthor && (e2["suppress-author"] = this._suppressAuthor);
    var n2 = this._itemData.toJSON();
    return Object.assign(e2, n2), void 0 !== this._itemData.getCustomProperty("userID") && null !== this._itemData.getCustomProperty("userID") && (e2.userID = String(this._itemData.getCustomProperty("userID"))), void 0 !== this._itemData.getCustomProperty("groupID") && null !== this._itemData.getCustomProperty("groupID") && (e2.groupID = String(this._itemData.getCustomProperty("groupID"))), e2;
  };
  var Ad = /* @__PURE__ */ new WeakSet(), Cd = (function() {
    return h(function t2(n2) {
      o(this, t2), u(this, Ad), n2 || (n2 = e(Ad, this, Md).call(this)), Dd._.has(n2) && (console.warn("Citation ID must be unique"), n2 = e(Ad, this, Md).call(this)), Dd._.add(n2), this.citationID = n2, this._citationItems = new Array(), this._properties = {}, this._manualOverride = {}, this._schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-citation.json";
    }, [{ key: "fillFromObject", value: function(t2) {
      return Object.hasOwnProperty.call(t2, "properties") || Object.hasOwnProperty.call(t2, "manualOverride") || Object.hasOwnProperty.call(t2, "schema") ? e(Ad, this, Ed).call(this, t2) : Object.hasOwnProperty.call(t2, "citationItems") ? e(Ad, this, Id).call(this, t2) : Object.hasOwnProperty.call(t2, "version") && Object.hasOwnProperty.call(t2, "library") ? e(Ad, this, Pd).call(this, t2) : e(Ad, this, Ld).call(this, t2);
    } }, { key: "getCitationItems", value: function() {
      return this._citationItems;
    } }, { key: "getDoNotUpdate", value: function() {
      return Object.hasOwnProperty.call(this._properties, "dontUpdate") ? !!this._properties.dontUpdate : !!Object.hasOwnProperty.call(this._manualOverride, "isManuallyOverridden") && !!this._manualOverride.isManuallyOverridden;
    } }, { key: "getInfoForCitationCluster", value: function() {
      return this._citationItems.map(function(t2) {
        return t2.getInfoForCitationCluster();
      }, this);
    } }, { key: "getPlainCitation", value: function() {
      return Object.hasOwnProperty.call(this._properties, "plainCitation") ? String(this._properties.plainCitation) : this._manualOverride && Object.keys(this._manualOverride).length > 0 ? String(this._manualOverride.citeprocText) : "";
    } }, { key: "setDoNotUpdate", value: function() {
      return e(Ad, this, Nd).call(this, { dontUpdate: true }), this;
    } }, { key: "setNoteIndex", value: function(t2) {
      return e(Ad, this, Nd).call(this, { noteIndex: t2 }), this;
    } }, { key: "setPlainCitation", value: function(t2) {
      return e(Ad, this, Nd).call(this, { plainCitation: t2 }), this;
    } }, { key: "setManualOverride", value: function(t2, e2) {
      var n2 = { citeprocText: t2, isManuallyOverridden: !!e2, manualOverrideText: e2 || "" };
      return this._manualOverride = n2, this;
    } }, { key: "validate", value: function() {
      var t2 = [];
      if (this._schema || t2.push("Schema is required"), this.citationID || t2.push("citationID is required"), this._citationItems && Array.isArray(this._citationItems)) for (var e2 = 0; e2 < this._citationItems.length; e2++) this._citationItems[e2].id || t2.push("Citation item at index " + e2 + " must have an id");
      return 0 === t2.length || t2;
    } }, { key: "toJSON", value: function() {
      var t2 = { citationID: this.citationID, schema: this._schema };
      return this._properties && Object.keys(this._properties).length > 0 && (t2.properties = this._properties), this._manualOverride && Object.keys(this._manualOverride).length > 0 && (t2.manualOverride = this._manualOverride), this._citationItems && this._citationItems.length > 0 && (t2.citationItems = this._citationItems.map(function(t3) {
        return t3.toJSON();
      })), t2;
    } }], [{ key: "resetUsedIDs", value: function() {
      Dd._ = /* @__PURE__ */ new Set();
    } }]);
  })();
  function Ed(t2) {
    var n2 = this;
    if (Object.hasOwnProperty.call(t2, "schema"), Object.hasOwnProperty.call(t2, "properties") && e(Ad, this, Nd).call(this, t2.properties), Object.hasOwnProperty.call(t2, "manualOverride") && (this._manualOverride = t2.manualOverride), !Object.hasOwnProperty.call(t2, "citationItems")) return console.error("citationItems is empty"), 0;
    var i2 = this._citationItems.map(function(t3) {
      return t3.id;
    });
    return t2.citationItems.forEach(function(t3) {
      var r2, o2 = t3.id;
      i2.indexOf(o2) >= 0 ? r2 = n2._citationItems[i2.indexOf(o2)] : (r2 = new xd(o2), i2.push(o2)), "number" == typeof o2 && (o2 = e(Ad, n2, jd).call(n2, t3)), r2.fillFromObject(t3), e(Ad, n2, Td).call(n2, r2);
    }, this), i2.length;
  }
  function Id(t2) {
    var n2 = this;
    return 0 === t2.citationItems.length ? (console.error("CSLCitation.citationItems: citationItems is empty"), 0) : (t2.citationItems.length > 1 && console.warn("CSLCitation.citationItems: citationItems has more than one item"), t2.citationItems.forEach(function(t3) {
      e(Ad, n2, Ld).call(n2, t3);
    }, this), 1);
  }
  function Ld(t2) {
    var n2, i2 = t2.id, r2 = this._citationItems.map(function(t3) {
      return t3.id;
    });
    return (n2 = r2.indexOf(i2) >= 0 ? this._citationItems[r2.indexOf(i2)] : new xd(i2)).fillFromObject(t2), e(Ad, this, Td).call(this, n2), 1;
  }
  function Pd(t2) {
    if (!Object.hasOwnProperty.call(t2, "data")) return console.error("Invalid citation object"), 0;
    var n2, i2 = this._citationItems.map(function(t3) {
      return t3.id;
    }), r2 = t2.data.key;
    return (n2 = i2.indexOf(r2) >= 0 ? this._citationItems[i2.indexOf(r2)] : new xd(r2)).fillFromObject(t2), e(Ad, this, Td).call(this, n2), 1;
  }
  function Td(t2) {
    var e2 = this._citationItems.map(function(t3) {
      return t3.id;
    });
    return e2.indexOf(t2.id) >= 0 ? (this._citationItems[e2.indexOf(t2.id)] = t2, this) : (this._citationItems.push(t2), this);
  }
  function Nd(t2) {
    var e2 = this;
    return Object.keys(t2).forEach(function(n2) {
      Object.hasOwnProperty.call(t2, n2) && (e2._properties[n2] = t2[n2]);
    }, this), this;
  }
  function jd(t2) {
    if (Object.hasOwnProperty.call(t2, "uris") && t2.uris.length) {
      var e2 = t2.uris[0].lastIndexOf("/");
      return t2.uris[0].slice(e2 + 1);
    }
    return t2.id;
  }
  function Md() {
    return Math.random().toString(36).substring(2, 15);
  }
  var Dd = { _: /* @__PURE__ */ new Set() }, Rd = /* @__PURE__ */ new WeakMap(), Fd = /* @__PURE__ */ new WeakMap(), Ud = /* @__PURE__ */ new WeakMap(), Bd = /* @__PURE__ */ new WeakMap(), Hd = /* @__PURE__ */ new WeakSet(), Vd = (function() {
    return h(function t2() {
      o(this, t2), u(this, Hd), a(this, Rd, void 0), a(this, Fd, void 0), a(this, Ud, void 0), a(this, Bd, void 0), c(Rd, this, new window.Asc.PluginWindow()), c(Fd, this, window.Asc.plugin.button), c(Ud, this, Asc.plugin.onThemeChanged), c(Bd, this, Asc.plugin.onTranslate);
    }, [{ key: "show", value: function(t2, n2) {
      var i2 = this;
      c(Rd, this, new window.Asc.PluginWindow());
      var r2 = { name: "Zotero", url: "info-window.html", description: window.Asc.plugin.tr(t2), isVisual: true, buttons: [{ text: window.Asc.plugin.tr("Yes"), primary: true, isViewer: false }, { text: window.Asc.plugin.tr("No"), primary: false }], isModal: false, EditorsSupport: ["word"], size: [380, 240], isViewer: true, isDisplayedInViewer: false, isInsideMode: false };
      return e(Hd, this, Gd).call(this, r2, n2, "default"), s(Rd, this).show(r2), new Promise(function(t3, n3) {
        window.Asc.plugin.button = function(n4, r3) {
          t3(0 === n4), e(Hd, i2, zd).call(i2);
        };
      });
    } }, { key: "showEditWindow", value: function(t2) {
      var n2 = this;
      c(Rd, this, new window.Asc.PluginWindow());
      var r2 = { name: "Zotero", url: "edit-window.html", description: window.Asc.plugin.tr("Edit citation"), isVisual: true, buttons: [{ text: window.Asc.plugin.tr("Save"), primary: true, isViewer: false }, { text: window.Asc.plugin.tr("Cancel"), primary: false }], isModal: false, EditorsSupport: ["word"], size: [380, 150], isViewer: true, isDisplayedInViewer: false, isInsideMode: false };
      return e(Hd, this, Gd).call(this, r2, t2, "default"), s(Rd, this).show(r2), new Promise(function(t3, r3) {
        window.Asc.plugin.button = (function() {
          var r4 = i(m().m(function i2(r5, o2) {
            var a2;
            return m().w(function(i3) {
              for (; ; ) switch (i3.n) {
                case 0:
                  return i3.n = 1, new Promise(function(t4) {
                    s(Rd, n2) ? (s(Rd, n2).attachEvent("onSaveFields", t4), s(Rd, n2).command("onClickSave")) : t4(null);
                  });
                case 1:
                  a2 = i3.v, t3(0 === r5 ? a2 : null), e(Hd, n2, zd).call(n2);
                case 2:
                  return i3.a(2);
              }
            }, i2);
          }));
          return function(t4, e2) {
            return r4.apply(this, arguments);
          };
        })();
      });
    } }, { key: "showInfoWindow", value: function(t2, n2, i2) {
      var r2 = this;
      "string" != typeof i2 && (i2 = "warning"), c(Rd, this, new window.Asc.PluginWindow());
      var o2 = { name: "Mendeley", url: "info-window.html", description: window.Asc.plugin.tr(t2), isVisual: true, buttons: [{ text: window.Asc.plugin.tr("OK"), primary: true, isViewer: false }], isModal: false, EditorsSupport: ["word"], size: [350, 76], isViewer: true, isDisplayedInViewer: false, isInsideMode: false };
      return e(Hd, this, Gd).call(this, o2, window.Asc.plugin.tr(n2), i2), s(Rd, this).show(o2), new Promise(function(t3, n3) {
        window.Asc.plugin.button = function(n4, i3) {
          t3(0 === n4), e(Hd, r2, zd).call(r2);
        };
      });
    } }, { key: "destroy", value: function() {
      e(Hd, this, zd).call(this), c(Rd, this, null);
    } }]);
  })();
  function Gd(t2, e2, n2) {
    var i2 = this;
    s(Rd, this) && (c(Fd, this, window.Asc.plugin.button), c(Ud, this, Asc.plugin.onThemeChanged), c(Bd, this, Asc.plugin.onTranslate), window.Asc.plugin.onThemeChanged = function(t3) {
      var e3;
      null === (e3 = s(Rd, i2)) || void 0 === e3 || e3.command("onThemeChanged", t3), s(Ud, i2).call(i2, t3);
    }, window.Asc.plugin.onTranslate = function() {
      var t3;
      null === (t3 = s(Rd, i2)) || void 0 === t3 || t3.command("onTranslate"), s(Bd, i2).call(i2);
    }, s(Rd, this).attachEvent("onWindowReady", function() {
      var t3;
      if ("warning" === n2) null === (t3 = s(Rd, i2)) || void 0 === t3 || t3.command("onWarning", e2);
      else if ("success" === n2) {
        var r2;
        null === (r2 = s(Rd, i2)) || void 0 === r2 || r2.command("onSuccess", e2);
      } else {
        var o2;
        null === (o2 = s(Rd, i2)) || void 0 === o2 || o2.command("onAttachedContent", e2);
      }
    }), s(Rd, this).attachEvent("onUpdateHeight", function(e3) {
      var n3;
      Asc.plugin.executeMethod("ResizeWindow", [null === (n3 = s(Rd, i2)) || void 0 === n3 ? void 0 : n3.id, [t2.size[0] - 2, e3]], function() {
      });
    }));
  }
  function zd() {
    s(Rd, this) && s(Rd, this).close(), window.Asc.plugin.button = s(Fd, this), window.Asc.plugin.onThemeChanged = s(Ud, this);
  }
  var Wd = /* @__PURE__ */ new WeakMap(), Kd = /* @__PURE__ */ new WeakSet(), qd = (function() {
    return h(function t3(e2, n3, i2) {
      o(this, t3), u(this, Kd), a(this, Wd, void 0), this._bibPlaceholderIfEmpty = "Please insert some citation into the document.", this._citPrefixNew = "ZOTERO_ITEM", this._citSuffixNew = "CSL_CITATION", this._citPrefix = "ZOTERO_CITATION", this._bibPrefixNew = "ZOTERO_BIBL", this._bibSuffixNew = "CSL_BIBLIOGRAPHY", this._bibPrefix = "ZOTERO_BIBLIOGRAPHY", this._sdk = i2, this._localesManager = e2, this._cslStylesManager = n3, this._storage = new Sd(), this._formatter, this.citationDocService = new rd(this._citPrefixNew, this._citSuffixNew, this._bibPrefixNew, this._bibSuffixNew), c(Wd, this, new Vd());
    }, [{ key: "getCurrentField", value: (w2 = i(m().m(function t3() {
      return m().w(function(t4) {
        for (; ; ) if (0 === t4.n) return t4.a(2, this.citationDocService.getCurrentField());
      }, t3, this);
    })), function() {
      return w2.apply(this, arguments);
    }) }, { key: "saveAsText", value: (y2 = i(m().m(function t3() {
      var e2;
      return m().w(function(t4) {
        for (; ; ) switch (t4.n) {
          case 0:
            return t4.n = 1, this.citationDocService.saveAsText();
          case 1:
            return (e2 = t4.v) && s(Wd, this).showInfoWindow("Success!", "All active Mendeley citations and Bibliography have been replaced.", "success"), t4.a(2, e2);
        }
      }, t3, this);
    })), function() {
      return y2.apply(this, arguments);
    }) }, { key: "insertSelectedCitations", value: (g2 = i(m().m(function t3(n3) {
      var i2, r3, o2, s2, a2 = this;
      return m().w(function(t4) {
        for (; ; ) switch (t4.p = t4.n) {
          case 0:
            return i2 = this, t4.p = 1, t4.n = 2, e(Kd, this, Xd).call(this);
          case 2:
            e(Kd, this, ip).call(this), t4.n = 4;
            break;
          case 3:
            throw t4.p = 3, t4.v;
          case 4:
            for (o2 in r3 = new Cd(""), n3) s2 = n3[o2], r3.fillFromObject(s2);
            return t4.a(2, e(Kd, this, Zd).call(this, n3).then(function(t5) {
              return t5.forEach(function(t6) {
                r3.fillFromObject(t6);
              }), a2._storage.addCslCitation(r3), e(Kd, i2, Jd).call(i2, r3);
            }));
        }
      }, t3, this, [[1, 3]]);
    })), function(t3) {
      return g2.apply(this, arguments);
    }) }, { key: "insertBibliography", value: (b2 = i(m().m(function t3() {
      var n3, i2, r3, o2, s2, a2, c2;
      return m().w(function(t4) {
        for (; ; ) switch (t4.p = t4.n) {
          case 0:
            return t4.p = 0, t4.n = 1, e(Kd, this, Xd).call(this);
          case 1:
            if (n3 = t4.v, i2 = n3.fieldsWithCitations, r3 = n3.bibFieldValue, o2 = n3.bibField, s2 = 0 === i2.length, e(Kd, this, ip).call(this), !o2) {
              t4.n = 3;
              break;
            }
            return t4.n = 2, e(Kd, this, tp).call(this, s2, o2);
          case 2:
            return c2 = t4.v, a2 = [c2], t4.a(2, this.citationDocService.updateAddinFields(a2).then(function(t5) {
              return t5 ? t5[0] : "";
            }));
          case 3:
            return t4.a(2, e(Kd, this, Qd).call(this, s2, r3));
          case 4:
            t4.n = 6;
            break;
          case 5:
            throw t4.p = 5, t4.v;
          case 6:
            return t4.a(2);
        }
      }, t3, this, [[0, 5]]);
    })), function() {
      return b2.apply(this, arguments);
    }) }, { key: "moveCursorToField", value: (_2 = i(m().m(function t3(e2, n3) {
      return m().w(function(t4) {
        for (; ; ) if (0 === t4.n) return t4.a(2, this.citationDocService.moveCursorToField(e2, n3));
      }, t3, this);
    })), function(t3, e2) {
      return _2.apply(this, arguments);
    }) }, { key: "moveCursorOutsideField", value: (v2 = i(m().m(function t3(e2, n3) {
      return m().w(function(t4) {
        for (; ; ) if (0 === t4.n) return t4.a(2, this.citationDocService.moveCursorOutsideField(e2, n3));
      }, t3, this);
    })), function(t3, e2) {
      return v2.apply(this, arguments);
    }) }, { key: "moveCursorRight", value: (p2 = i(m().m(function t3() {
      return m().w(function(t4) {
        for (; ; ) if (0 === t4.n) return t4.a(2, this.citationDocService.moveCursorRight());
      }, t3, this);
    })), function() {
      return p2.apply(this, arguments);
    }) }, { key: "updateCslItems", value: (d2 = i(m().m(function t3(n3) {
      var i2, r3, o2, s2, a2, c2;
      return m().w(function(t4) {
        for (; ; ) switch (t4.p = t4.n) {
          case 0:
            return t4.p = 0, t4.n = 1, e(Kd, this, Xd).call(this);
          case 1:
            if (i2 = t4.v, r3 = i2.fieldsWithCitations, o2 = i2.bibField, s2 = 0 === r3.length, e(Kd, this, ip).call(this), a2 = [], void 0 === n3 && "numeric" === this._cslStylesManager.getLastUsedFormat() && (n3 = true), "boolean" != typeof n3) {
              t4.n = 3;
              break;
            }
            return t4.n = 2, e(Kd, this, ep).call(this, r3, n3);
          case 2:
            a2 = t4.v;
          case 3:
            if (!o2) {
              t4.n = 5;
              break;
            }
            return c2 = a2, t4.n = 4, e(Kd, this, tp).call(this, s2, o2);
          case 4:
            c2.push.call(c2, t4.v);
          case 5:
            if (!a2 || !a2.length) {
              t4.n = 6;
              break;
            }
            return t4.a(2, this.citationDocService.updateAddinFields(a2));
          case 6:
            t4.n = 8;
            break;
          case 7:
            throw t4.p = 7, t4.v;
          case 8:
            return t4.a(2);
        }
      }, t3, this, [[0, 7]]);
    })), function(t3) {
      return d2.apply(this, arguments);
    }) }, { key: "updateCslItemsInNotes", value: (f2 = i(m().m(function t3(n3) {
      var i2, r3, o2, s2, a2, c2, u2;
      return m().w(function(t4) {
        for (; ; ) switch (t4.p = t4.n) {
          case 0:
            return t4.p = 0, t4.n = 1, e(Kd, this, Xd).call(this);
          case 1:
            return i2 = t4.v, r3 = i2.fieldsWithCitations, o2 = i2.bibField, s2 = 0 === r3.length, e(Kd, this, ip).call(this), t4.n = 2, e(Kd, this, ep).call(this, r3, false);
          case 2:
            if (!(a2 = t4.v) || !a2.length) {
              t4.n = 3;
              break;
            }
            return t4.n = 3, this.citationDocService.convertNotesStyle(a2, n3);
          case 3:
            if (!o2) {
              t4.n = 5;
              break;
            }
            return t4.n = 4, e(Kd, this, tp).call(this, s2, o2);
          case 4:
            return u2 = t4.v, c2 = [u2], t4.n = 5, this.citationDocService.updateAddinFields(c2);
          case 5:
            t4.n = 7;
            break;
          case 6:
            throw t4.p = 6, t4.v;
          case 7:
            return t4.a(2);
        }
      }, t3, this, [[0, 6]]);
    })), function(t3) {
      return f2.apply(this, arguments);
    }) }, { key: "updateItem", value: (l2 = i(m().m(function t3(n3, i2) {
      var r3, o2, s2;
      return m().w(function(t4) {
        for (; ; ) switch (t4.p = t4.n) {
          case 0:
            return t4.p = 0, t4.n = 1, e(Kd, this, Xd).call(this, n3);
          case 1:
            return r3 = t4.v, o2 = r3.fieldsWithCitations, r3.bibField, o2.length, e(Kd, this, ip).call(this), t4.n = 2, e(Kd, this, ep).call(this, o2, true);
          case 2:
            if (s2 = t4.v, !(i2 && s2 && s2.length)) {
              t4.n = 4;
              break;
            }
            return t4.n = 3, this.citationDocService.convertNotesStyle(s2, i2);
          case 3:
            s2 = [];
          case 4:
            if (!s2 || !s2.length) {
              t4.n = 5;
              break;
            }
            return t4.a(2, this.citationDocService.updateAddinFields(s2));
          case 5:
            t4.n = 7;
            break;
          case 6:
            throw t4.p = 6, t4.v;
          case 7:
            return t4.a(2);
        }
      }, t3, this, [[0, 6]]);
    })), function(t3, e2) {
      return l2.apply(this, arguments);
    }) }, { key: "switchingBetweenNotesAndText", value: (r2 = i(m().m(function t3(n3) {
      var i2, r3, o2, s2, a2, c2, u2;
      return m().w(function(t4) {
        for (; ; ) switch (t4.p = t4.n) {
          case 0:
            return t4.p = 0, t4.n = 1, e(Kd, this, Xd).call(this);
          case 1:
            return i2 = t4.v, r3 = i2.fieldsWithCitations, o2 = i2.bibField, s2 = 0 === r3.length, e(Kd, this, ip).call(this), t4.n = 2, e(Kd, this, ep).call(this, r3, true);
          case 2:
            if (!(a2 = t4.v) || !a2.length) {
              t4.n = 5;
              break;
            }
            if (!n3) {
              t4.n = 4;
              break;
            }
            return t4.n = 3, this.citationDocService.convertTextToNotes(a2, n3);
          case 3:
            t4.n = 5;
            break;
          case 4:
            return t4.n = 5, this.citationDocService.convertNotesToText(a2);
          case 5:
            if (!o2) {
              t4.n = 7;
              break;
            }
            return t4.n = 6, e(Kd, this, tp).call(this, s2, o2);
          case 6:
            return u2 = t4.v, c2 = [u2], t4.n = 7, this.citationDocService.updateAddinFields(c2);
          case 7:
            t4.n = 9;
            break;
          case 8:
            throw t4.p = 8, t4.v;
          case 9:
            return t4.a(2);
        }
      }, t3, this, [[0, 8]]);
    })), function(t3) {
      return r2.apply(this, arguments);
    }) }, { key: "convertNotesStyle", value: (n2 = i(m().m(function t3(n3) {
      var i2, r3, o2;
      return m().w(function(t4) {
        for (; ; ) switch (t4.p = t4.n) {
          case 0:
            return t4.p = 0, t4.n = 1, e(Kd, this, Xd).call(this);
          case 1:
            return i2 = t4.v, r3 = i2.fieldsWithCitations, e(Kd, this, ip).call(this), t4.n = 2, e(Kd, this, ep).call(this, r3, false, true);
          case 2:
            if ((o2 = t4.v) && o2.length) {
              t4.n = 3;
              break;
            }
            return t4.a(2);
          case 3:
            return t4.n = 4, this.citationDocService.convertNotesStyle(o2, n3);
          case 4:
            t4.n = 6;
            break;
          case 5:
            throw t4.p = 5, t4.v;
          case 6:
            return t4.a(2);
        }
      }, t3, this, [[0, 5]]);
    })), function(t3) {
      return n2.apply(this, arguments);
    }) }, { key: "showEditCitationWindow", value: (t2 = i(m().m(function t3(n3) {
      var i2, r3;
      return m().w(function(t4) {
        for (; ; ) switch (t4.n) {
          case 0:
            if (n3) {
              t4.n = 1;
              break;
            }
            return t4.a(2, null);
          case 1:
            return i2 = e(Kd, this, $d).call(this, n3), t4.n = 2, s(Wd, this).showEditWindow(i2);
          case 2:
            if (r3 = t4.v) {
              t4.n = 3;
              break;
            }
            return t4.a(2, null);
          case 3:
            return t4.a(2, r3);
        }
      }, t3, this);
    })), function(e2) {
      return t2.apply(this, arguments);
    }) }]);
    var t2, n2, r2, l2, f2, d2, p2, v2, _2, b2, g2, y2, w2;
  })();
  function Jd(t2) {
    var n2 = this, i2 = false;
    return Promise.resolve().then(function() {
      if (t2.getCitationItems().forEach(function(t3) {
        n2._storage.hasItem(t3.id) || (i2 = true);
      }), i2) {
        var e2 = [];
        n2._storage.forEachItem(function(t3, n3) {
          e2.push(n3);
        }), n2._formatter.updateItems(e2);
      }
    }).then(function() {
      var i3 = document.createDocumentFragment(), r2 = document.createElement("div"), o2 = n2._storage.getCitationsPre(t2.citationID), s2 = n2._storage.getCitationsPost(t2.citationID), a2 = n2._storage.getAllCitationsInJson();
      n2._formatter.rebuildProcessorState(a2);
      var c2 = n2._formatter.processCitationCluster(t2.toJSON(), o2, s2), u2 = e(Kd, n2, rp).call(n2, c2[1][0][1]);
      i3.appendChild(r2), r2.innerHTML = u2, t2.setPlainCitation(r2.innerText);
      var l2 = null;
      return "note" === n2._cslStylesManager.getLastUsedFormat() && (l2 = n2._cslStylesManager.getLastUsedNotesStyle()), n2.citationDocService.addCitation(u2, JSON.stringify(t2.toJSON()), l2);
    });
  }
  function Zd(t2) {
    var e2 = [], n2 = {};
    for (var i2 in t2) {
      var r2 = t2[i2], o2 = r2.userID, s2 = r2.groupID;
      o2 ? e2.push(r2.id) : s2 && (n2[s2] || (n2[s2] = []), n2[s2].push(r2.id));
    }
    var a2 = [];
    for (var c2 in e2.length && a2.push(this._sdk.getItems(null, e2, "json").then(function(t3) {
      return t3.items || [];
    })), n2) Object.hasOwnProperty.call(n2, c2) && a2.push(this._sdk.getGroupItems(null, c2, n2[c2], "json").then(function(t3) {
      return t3.items || [];
    }));
    return Promise.all(a2).then(function(t3) {
      return t3.reduce(function(t4, e3) {
        return t4.concat(e3);
      }, []);
    });
  }
  function Yd() {
    try {
      for (var t2 = new Array(this._storage.size), n2 = this._formatter.makeBibliography(), i2 = 0; i2 < n2[1].length; i2++) {
        var r2 = e(Kd, this, rp).call(this, n2[1][i2]);
        r2 = r2.replaceAll("\n", "").replaceAll("\r", "").replace(/\s+/g, " ").trim();
        var o2 = '<div class="csl-entry">', a2 = "</div>";
        n2[0]["second-field-align"] ? 0 === r2.indexOf(o2) && r2.endsWith(a2) && (r2 = o2 + r2.substring(23, r2.length - 6).trim() + a2) : r2 = "<p>" + (r2 = r2.replace(/<\/?div[^>]*>/g, "")) + "</p>", window.Asc.scope.editorVersion < 9004e3 && (r2 += "\n"), t2.push(r2);
      }
      var c2 = t2.join("").trim();
      return Asc.scope.bibStyle = n2[0], c2;
    } catch (t3) {
      if (false !== this._cslStylesManager.isLastUsedStyleContainBibliography()) throw console.error(t3), "Failed to apply this style.";
      return s(Wd, this).showInfoWindow("Warning!", "Style does not describe the bibliography"), "";
    }
  }
  function $d(t2) {
    var e2, n2 = t2.Value.indexOf("{"), i2 = t2.Value.lastIndexOf("}");
    if (-1 !== n2) {
      var r2 = t2.Value.slice(n2, i2 + 1);
      e2 = JSON.parse(r2);
    }
    return e2;
  }
  function Xd(t2) {
    var n2 = this;
    return this._storage.clear(), Cd.resetUsedIDs(), this.citationDocService.getAddinZoteroFields().then(function(i2) {
      var r2 = " ", o2 = i2.find(function(t3) {
        return -1 !== t3.Value.indexOf(n2._bibPrefixNew) || -1 !== t3.Value.indexOf(n2._bibPrefix);
      });
      if (o2) {
        var s2 = e(Kd, n2, $d).call(n2, o2);
        "object" === w(s2) && Object.keys(s2).length > 0 && (r2 = JSON.stringify(s2));
      }
      var a2 = i2.filter(function(t3) {
        return -1 !== t3.Value.indexOf(n2._citPrefixNew) || -1 !== t3.Value.indexOf(n2._citPrefix);
      }).map(function(i3) {
        var r3 = e(Kd, n2, $d).call(n2, i3), o3 = "";
        -1 === i3.Value.indexOf(n2._citPrefix) && (o3 = r3.citationID);
        var s3 = new Cd(o3);
        return t2 ? s3.fillFromObject(t2) : s3.fillFromObject(r3), n2._storage.addCslCitation(s3), { field: v({}, i3), cslCitation: s3 };
      });
      return t2 && (a2 = a2.filter(function(e2) {
        return e2.cslCitation.citationID === t2.citationID;
      })), { bibField: o2, bibFieldValue: r2, fieldsWithCitations: a2 };
    });
  }
  function Qd(t2, n2) {
    var i2 = e(Kd, this, Yd).call(this);
    if (t2 && (i2 = Vf(this._bibPlaceholderIfEmpty)), this._cslStylesManager.isLastUsedStyleContainBibliography()) return this.citationDocService.addBibliography(i2, n2);
    throw "The current bibliographic style does not describe the bibliography";
  }
  function tp(t2, n2) {
    if (t2) n2.Content = Vf(this._bibPlaceholderIfEmpty);
    else {
      var i2 = e(Kd, this, Yd).call(this);
      n2.Content = i2;
    }
    return n2;
  }
  function ep(t2, e2, n2) {
    return np.apply(this, arguments);
  }
  function np() {
    return (np = i(m().m(function t2(n2, i2, r2) {
      var o2, a2, c2, u2, l2, h2, f2, d2, p2, v2, _2, b2, g2, y2, w2, S2, O2, k2;
      return m().w(function(t3) {
        for (; ; ) switch (t3.n) {
          case 0:
            o2 = document.createDocumentFragment(), a2 = document.createElement("div"), o2.appendChild(a2), c2 = [], u2 = n2.length - 1;
          case 1:
            if (!(u2 >= 0)) {
              t3.n = 7;
              break;
            }
            if (l2 = !!r2, h2 = n2[u2], f2 = h2.field, d2 = h2.cslCitation, p2 = this._storage.getCitationsPre(d2.citationID), v2 = this._storage.getCitationsPost(d2.citationID), _2 = this._storage.getAllCitationsInJson(), this._formatter.rebuildProcessorState(_2), b2 = this._formatter.processCitationCluster(d2.toJSON(), p2, v2), g2 = e(Kd, this, rp).call(this, b2[1][0][1]), a2.innerHTML = g2, y2 = d2.getPlainCitation(), w2 = f2.Content, "" === y2 && (y2 = w2), S2 = a2.innerText, !d2.getDoNotUpdate()) {
              t3.n = 2;
              break;
            }
            return t3.a(3, 6);
          case 2:
            if (y2 === w2 || i2) {
              t3.n = 4;
              break;
            }
            return O2 = "<p>" + Vf("You have modified this citation since Zotero generated it. Do you want to keep your modifications and prevent future updates?") + "</p><p>" + Vf("Clicking „Yes“ will prevent Zotero from updating this citation if you add additional citations, switch styles, or modify the item to which it refers. Clicking „No“ will erase your changes.") + "</p><p>" + Vf("Original:") + " " + S2 + "</p><p>" + Vf("Modified:") + " " + w2 + "</p>", t3.n = 3, s(Wd, this).show("Saving custom edits", O2);
          case 3:
            t3.v ? (d2.setDoNotUpdate(), delete f2.Content) : (f2.Content = g2, d2.setPlainCitation(S2)), l2 = true, t3.n = 5;
            break;
          case 4:
            S2 === w2 && y2 === w2 && y2 === S2 || (l2 = true), f2.Content = g2, d2.setPlainCitation(S2);
          case 5:
            d2 && (k2 = this._citPrefixNew + " " + this._citSuffixNew + JSON.stringify(d2.toJSON()), f2.Value !== k2 && (l2 = true), f2.Value = k2), l2 && c2.push(f2);
          case 6:
            u2--, t3.n = 1;
            break;
          case 7:
            return t3.a(2, c2);
        }
      }, t2, this);
    }))).apply(this, arguments);
  }
  function ip() {
    var t2 = this, e2 = [];
    this._storage.forEachItem(function(t3, n2) {
      e2.push(n2);
    }), this._formatter = new CSL.Engine({ retrieveLocale: function(e3) {
      return t2._localesManager.getLocale(e3) ? t2._localesManager.getLocale(e3) : t2._localesManager.getLocale();
    }, retrieveItem: function(e3) {
      var n2 = t2._storage.getItem(e3), i2 = t2._storage.getItemIndex(e3);
      return n2 ? n2.toFlatJSON(i2) : null;
    } }, this._cslStylesManager.cached(this._cslStylesManager.getLastUsedStyleIdOrDefault()), this._localesManager.getLastUsedLanguage(), true), e2.length && this._formatter.updateItems(e2);
  }
  function rp(t2) {
    return t2.replace(/\u00A0/g, " ").replace(/&#60;/g, "<").replace(/&#62;/g, ">").replace(/&#38;/g, "&");
  }
  var op = (function() {
    return h(function t2() {
      o(this, t2);
    }, null, [{ key: "getCursorPosition", value: function() {
      return new Promise(function(t2) {
        Asc.plugin.callCommand(function() {
          var t3 = Api.GetDocument();
          if (!t3) return 0;
          var e2 = t3.GetCurrentRun();
          if (!e2) return 0;
          var n2 = e2.GetRange(0, 0);
          return n2 ? n2.GetEndPos() : 0;
        }, false, false, t2);
      });
    } }, { key: "setCursorPosition", value: function(t2) {
      return new Promise(function(e2) {
        Asc.scope.pos = t2, Asc.plugin.callCommand(function() {
          Api.GetDocument().MoveCursorToPos(Asc.scope.pos);
        }, false, false, e2);
      });
    } }]);
  })(), sp = function(t2, e2) {
    var n2 = new DOMParser().parseFromString(e2, "text/xml"), i2 = { categories: { fields: [], format: "" }, dependent: 0, href: "", name: t2, title: "", updated: "" }, r2 = n2.querySelector("info title");
    r2 && (i2.title = r2.textContent);
    var o2 = n2.querySelector('info link[rel="self"]');
    if (o2) {
      var s2 = o2.getAttribute("href");
      s2 && (i2.href = s2);
    }
    var a2 = n2.querySelector('info link[rel="independent-parent"]');
    if (a2) {
      var c2 = a2.getAttribute("href");
      c2 && (i2.parent = c2), i2.dependent = 1;
    }
    var u2 = n2.querySelector("info updated");
    u2 && (i2.updated = u2.textContent);
    var l2 = n2.querySelector("info category[citation-format]");
    if (l2) {
      var h2 = l2.getAttribute("citation-format");
      h2 && (i2.categories.format = h2);
    }
    var f2 = n2.querySelectorAll("info category[field]");
    return f2 && f2.forEach(function(t3) {
      var e3 = t3.getAttribute("field");
      e3 && i2.categories.fields.push(e3);
    }), i2;
  }, ap = function(t2) {
    var e2 = new DOMParser().parseFromString(t2, "text/xml").querySelector("info category[citation-format]");
    if (!e2) throw new Error("Citation format not found");
    var n2 = e2.getAttribute("citation-format");
    if (!n2) throw new Error("Citation format not found");
    switch (n2) {
      case "note":
      case "numeric":
      case "author":
      case "author-date":
      case "label":
        return n2;
    }
    throw new Error("Invalid citation format");
  }, cp = function(t2) {
    return t2.indexOf("<bibliography") > -1;
  };
  function up() {
    this._customStyleNamesKey = "zoteroCustomStyleNames", this._customStylesKey = "zoteroCustomStyles";
  }
  function lp(t2) {
    this._isOnlineAvailable = false, this._isDesktopAvailable = false, this._customStylesStorage = new up(), this._STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json", this._STYLES_JSON_LOCAL = "./resources/csl/styles.json", this._STYLES_URL = "https://www.zotero.org/styles/", this._STYLES_LOCAL = "./resources/csl/styles/", this._lastStyleKey = t2, this._lastNotesStyleKey = "zoteroNotesStyleId", this._lastFormatKey = "zoteroFormatId", this._lastUsedStyleContainBibliographyKey = "zoteroContainBibliography", this._defaultStyles = ["american-anthropological-association", "american-medical-association", "american-political-science-association", "american-sociological-association", "apa", "chicago-author-date", "chicago-notes-bibliography", "harvard-cite-them-right", "ieee", "modern-language-association", "nature"], this._cache = {};
  }
  function hp() {
    this._isOnlineAvailable = false, this._isDesktopAvailable = false, this._LOCALES_URL = "https://raw.githubusercontent.com/citation-style-language/locales/master/", this._LOCALES_PATH = "./resources/csl/locales/", this._lastLanguageKey = "zoteroLang", this._selectedLanguage = null, this._cache = {};
  }
  function fp(t2, e2) {
    if (this._router = t2, this._displayNoneClass = e2, this._saveBtn = new Ql("saveSettingsBtn", { variant: "primary" }), this._cancelBtn = new Ql("cancelBtn", { variant: "secondary" }), this._styleSelect = new Sf("styleSelectList", { placeholder: "Enter style name", sortable: true }), this._styleSelectListOther = new Sf("styleSelectedListOther", { placeholder: "Enter style name", searchable: true }), this._notesStyleWrapper = document.getElementById("notesStyle"), !this._notesStyleWrapper) throw new Error("notesStyleWrapper not found");
    if (this._footNotes = new yh("footNotes", { label: "Footnotes" }), this._endNotes = new yh("endNotes", { label: "Endnotes" }), this._cslFileInput = document.getElementById("cslFileInput"), !this._cslFileInput) throw new Error("cslFileInput not found");
    this._languageSelect = new Sf("styleLangList", { placeholder: "Select language" }), this._cslStylesManager = new lp("zoteroStyleId"), this._localesManager = new hp(), this._selectLists = [], this._onChangeState = function(t3, e3) {
    }, this._styleMessage = new Xl("styleMessage", { type: "error" }), this._langMessage = new Xl("langMessage", { type: "error" }), this._LANGUAGES = [["af-ZA", "Afrikaans"], ["ar", "Arabic"], ["bg-BG", "Bulgarian"], ["ca-AD", "Catalan"], ["cs-CZ", "Czech"], ["cy-GB", "Welsh"], ["da-DK", "Danish"], ["de-AT", "German (Austria)"], ["de-CH", "German (Switzerland)"], ["de-DE", "German (Germany)"], ["el-GR", "Greek"], ["en-GB", "English (UK)"], ["en-US", "English (US)"], ["es-CL", "Spanish (Chile)"], ["es-ES", "Spanish (Spain)"], ["es-MX", "Spanish (Mexico)"], ["et-EE", "Estonian"], ["eu", "Basque"], ["fa-IR", "Persian"], ["fi-FI", "Finnish"], ["fr-CA", "French (Canada)"], ["fr-FR", "French (France)"], ["he-IL", "Hebrew"], ["hr-HR", "Croatian"], ["hu-HU", "Hungarian"], ["id-ID", "Indonesian"], ["is-IS", "Icelandic"], ["it-IT", "Italian"], ["ja-JP", "Japanese"], ["km-KH", "Khmer"], ["ko-KR", "Korean"], ["la", "Latin"], ["lt-LT", "Lithuanian"], ["lv-LV", "Latvian"], ["mn-MN", "Mongolian"], ["nb-NO", "Norwegian (Bokmål)"], ["nl-NL", "Dutch"], ["nn-NO", "Norwegian (Nynorsk)"], ["pl-PL", "Polish"], ["pt-BR", "Portuguese (Brazil)"], ["pt-PT", "Portuguese (Portugal)"], ["ro-RO", "Romanian"], ["ru-RU", "Russian"], ["sk-SK", "Slovak"], ["sl-SI", "Slovenian"], ["sr-RS", "Serbian"], ["sv-SE", "Swedish"], ["th-TH", "Thai"], ["tr-TR", "Turkish"], ["uk-UA", "Ukrainian"], ["vi-VN", "Vietnamese"], ["zh-CN", "Chinese (PRC)"], ["zh-TW", "Chinese (Taiwan)"]], this._bNumFormat = false, this._stateSettings = { style: "", notesStyle: "footnotes", styleFormat: "numeric" };
  }
  function dp(t2, e2) {
    if (this._router = t2, this._sdk = e2, this._apiKeyLoginField = new Zl("apiKeyField", { autofocus: true, autocomplete: "on" }), this._saveApiKeyBtn = new Ql("saveApiKeyBtn", { disabled: true }), this._apiKeyMessage = new Xl("apiKeyMessage", { type: "error" }), this._useDesktopMessage = new Xl("useDesktopMessage", { type: "error" }), this._connectToLocalZotero = new Ql("connectToLocalZotero", { variant: "secondary" }), this._useDesktopApp = document.getElementById("useDesktopApp"), !this._useDesktopApp) throw new Error("useDesktopApp not found");
    if (this._logoutLink = document.getElementById("logoutLink"), !this._logoutLink) throw new Error("logoutLink not found");
    this._onAuthorized = function(t3) {
    }, this._onChangeState = function(t3) {
    }, this._onOpen = function() {
    };
  }
  function pp() {
    this._searchField = new Zl("searchField", { type: "text", autofocus: true, showClear: false }), this._filterButton = new Ql("filterButton", { variant: "secondary-icon", size: "small" }), this._librarySelectList = new Sf("librarySelectList", { placeholder: Vf("No items selected"), multiple: true, description: Vf("Search in:") }), this._subscribers = [], this._addEventListeners();
  }
  up.prototype.getStyleNames = function() {
    var t2 = localStorage.getItem(this._customStyleNamesKey);
    return t2 ? JSON.parse(t2) : [];
  }, up.prototype._getStyles = function() {
    var t2 = localStorage.getItem(this._customStylesKey);
    return t2 ? JSON.parse(t2) : [];
  }, up.prototype.getStyle = function(t2) {
    var e2 = this.getStyleNames().indexOf(t2);
    return -1 === e2 ? null : this._getStyles()[e2];
  }, up.prototype.getStylesInfo = function() {
    for (var t2 = this.getStyleNames(), e2 = this._getStyles(), n2 = [], i2 = 0; i2 < t2.length; i2++) {
      var r2 = sp(t2[i2], e2[i2]);
      n2.push(r2);
    }
    return n2;
  }, up.prototype.setStyle = function(t2, e2) {
    var n2 = this.getStyleNames(), i2 = this._getStyles(), r2 = n2.indexOf(t2);
    return -1 === r2 && (r2 = n2.length), n2[r2] = t2, i2[r2] = e2, localStorage.setItem(this._customStyleNamesKey, JSON.stringify(n2)), localStorage.setItem(this._customStylesKey, JSON.stringify(i2)), sp(t2, e2);
  }, up.prototype.deleteStyle = function(t2) {
    var e2 = this.getStyleNames(), n2 = this._getStyles(), i2 = e2.indexOf(t2);
    return -1 === i2 || (e2.splice(i2, 1), n2.splice(i2, 1), localStorage.setItem(this._customStyleNamesKey, JSON.stringify(e2)), localStorage.setItem(this._customStylesKey, JSON.stringify(n2))), t2;
  }, lp.prototype.addCustomStyle = function(t2) {
    var e2 = this;
    return new Promise(function(e3, n2) {
      var i2 = t2.name.toLowerCase();
      ".csl" === i2.slice(-4) || ".xml" === i2.slice(-4) ? i2 = i2.substring(0, i2.length - 4).trim() : n2("Please select a .csl or .xml file."), t2.size > 1048576 && n2("Maximum file size is 1 MB."), e3(i2);
    }).then(function(n2) {
      return e2._readCSLFile(t2).then(function(t3) {
        return -1 === e2._defaultStyles.indexOf(n2) && e2._defaultStyles.push(n2), e2._customStylesStorage.setStyle(n2, t3);
      });
    });
  }, lp.prototype.getLastUsedFormat = function() {
    var t2 = localStorage.getItem(this._lastFormatKey);
    switch (t2) {
      case "note":
      case "numeric":
      case "author":
      case "author-date":
      case "label":
        return t2;
    }
    return "numeric";
  }, lp.prototype.getLastUsedNotesStyle = function() {
    var t2 = localStorage.getItem(this._lastNotesStyleKey);
    return "footnotes" === t2 || "endnotes" === t2 ? t2 : "footnotes";
  }, lp.prototype.getLastUsedStyleId = function() {
    var t2 = localStorage.getItem(this._lastStyleKey);
    return t2 || null;
  }, lp.prototype.getLastUsedStyleIdOrDefault = function() {
    var t2 = localStorage.getItem(this._lastStyleKey);
    return t2 || "ieee";
  }, lp.prototype.getStyle = function(t2) {
    var e2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n2 = this;
    return Promise.resolve(t2).then(function(t3) {
      if (n2._cache[t3]) return n2._cache[t3];
      if (-1 !== n2._customStylesStorage.getStyleNames().indexOf(t3)) return n2._customStylesStorage.getStyle(t3);
      var e3 = n2._STYLES_LOCAL + t3 + ".csl";
      if (n2._isOnlineAvailable) e3 = n2._STYLES_URL + t3;
      else if (-1 === n2._defaultStyles.indexOf(t3)) throw "The style is not available in the local version of the plugin.";
      return fetch(e3).then(function(t4) {
        return t4.text();
      });
    }).then(function(e3) {
      if (e3 && !n2._isValidCSL(e3) && n2._isOnlineAvailable) {
        var i2 = sp(t2, e3);
        if (i2 && i2.dependent > 0 && i2.parent) return fetch(i2.parent).then(function(t3) {
          return t3.text();
        });
      }
      return e3;
    }).then(function(i2) {
      var r2 = i2 && ap(i2) || "numeric", o2 = { content: i2, styleFormat: r2 };
      return i2 && e2 && n2._saveLastUsedStyle(t2, i2, r2), o2;
    });
  }, lp.prototype.getStylesInfo = function() {
    var t2 = this;
    return Promise.all([this._getStylesJson(), this._customStylesStorage.getStylesInfo()]).then(function(e2) {
      var n2 = t2.getLastUsedStyleId() || "ieee", i2 = [], r2 = t2._customStylesStorage.getStyleNames(), o2 = e2[0], s2 = e2[1];
      return t2._isDesktopAvailable && !t2._isOnlineAvailable && (o2 = o2.filter(function(e3) {
        return t2._defaultStyles.indexOf(e3.name) >= 0 || e3.name == n2;
      })), s2.forEach(function(e3) {
        i2.push(e3), -1 === t2._defaultStyles.indexOf(e3.name) && t2._defaultStyles.push(e3.name);
      }), o2.forEach(function(t3) {
        -1 === r2.indexOf(t3.name) && i2.push(t3);
      }), i2.sort(function(t3, e3) {
        return t3.name.localeCompare(e3.name);
      }), i2;
    });
  }, lp.prototype._getStylesJson = function() {
    var t2 = this._STYLES_JSON_LOCAL;
    return this._isOnlineAvailable && (t2 = this._STYLES_JSON_URL), fetch(t2).then(function(t3) {
      return t3.json();
    });
  }, lp.prototype.cached = function(t2) {
    return Object.hasOwnProperty.call(this._cache, t2) ? this._cache[t2] : null;
  }, lp.prototype.isLastUsedStyleContainBibliography = function() {
    return "false" !== localStorage.getItem(this._lastUsedStyleContainBibliographyKey);
  }, lp.prototype.isStyleDefault = function(t2) {
    return this._defaultStyles.indexOf(t2) >= 0;
  }, lp.prototype._isValidCSL = function(t2) {
    return t2.indexOf("<?xml") > -1 && t2.indexOf("<style") > -1 && t2.indexOf("<macro") > -1 && t2.indexOf("citation") > -1;
  }, lp.prototype._readCSLFile = function(t2) {
    var e2 = this;
    return new Promise(function(n2, i2) {
      var r2 = new FileReader();
      r2.onload = function(t3) {
        var r3 = t3.target ? String(t3.target.result) : "";
        e2._isValidCSL(r3) ? n2(r3) : i2("The file is not a valid CSL file");
      }, r2.onerror = function() {
        i2("Failed to read file");
      }, r2.readAsText(t2);
    });
  }, lp.prototype._saveLastUsedStyle = function(t2, e2, n2) {
    this._cache[t2] = e2, localStorage.setItem(this._lastStyleKey, t2), localStorage.setItem(this._lastFormatKey, n2);
    var i2 = cp(e2);
    localStorage.setItem(this._lastUsedStyleContainBibliographyKey, i2.toString());
  }, lp.prototype.saveLastUsedNotesStyle = function(t2) {
    localStorage.setItem(this._lastNotesStyleKey, t2);
  }, lp.prototype.setDesktopApiAvailable = function(t2) {
    this._isDesktopAvailable = t2;
  }, lp.prototype.setRestApiAvailable = function(t2) {
    this._isOnlineAvailable = t2;
  }, hp.prototype.loadLocale = function(t2) {
    var e2 = this;
    if (this._selectedLanguage = t2, this._cache[t2]) return Promise.resolve(this._cache[t2]);
    var n2 = this._getLocalesUrl() + "locales-" + t2 + ".xml";
    return fetch(n2).catch(function(n3) {
      return console.error("Failed to load locale:", n3), fetch(e2._LOCALES_PATH + "locales-" + t2 + ".xml");
    }).then(function(t3) {
      return t3.text();
    }).then(function(n3) {
      return e2._cache[t2] = n3, n3;
    });
  }, hp.prototype.getLastUsedLanguage = function() {
    return this._selectedLanguage = this._selectedLanguage || localStorage.getItem(this._lastLanguageKey) || "en-US", this._selectedLanguage;
  }, hp.prototype.getLocale = function(t2) {
    return t2 ? this._cache[t2] ? this._cache[t2] : null : this._selectedLanguage && this._cache[this._selectedLanguage] ? this._cache[this._selectedLanguage] : null;
  }, hp.prototype.saveLastUsedLanguage = function(t2) {
    this._selectedLanguage = t2, localStorage.setItem(this._lastLanguageKey, t2);
  }, hp.prototype._getLocalesUrl = function() {
    return this._isOnlineAvailable ? this._LOCALES_URL : this._LOCALES_PATH;
  }, hp.prototype.setDesktopApiAvailable = function(t2) {
    this._isDesktopAvailable = t2;
  }, hp.prototype.setRestApiAvailable = function(t2) {
    this._isOnlineAvailable = t2;
  }, fp.prototype.getLocalesManager = function() {
    return this._localesManager;
  }, fp.prototype.getStyleManager = function() {
    return this._cslStylesManager;
  }, fp.prototype.getLocale = function() {
    return this._localesManager.getLocale();
  }, fp.prototype.getLastUsedStyleId = function() {
    return this._cslStylesManager.getLastUsedStyleId();
  }, fp.prototype.init = function() {
    var t2 = this._cslStylesManager.getLastUsedStyleId() || "ieee", e2 = this._localesManager.getLastUsedLanguage();
    this._addEventListeners(), this._languageSelect.addItems(this._LANGUAGES, e2);
    var n2 = [this._onStyleChange(t2), this._localesManager.loadLocale(e2), this._loadStyles()];
    return Promise.all(n2);
  }, fp.prototype.onChangeState = function(t2) {
    this._onChangeState = t2;
  }, fp.prototype.setDesktopApiAvailable = function(t2) {
    this._localesManager.setDesktopApiAvailable(t2), this._cslStylesManager.setDesktopApiAvailable(t2);
  }, fp.prototype.setRestApiAvailable = function(t2) {
    this._localesManager.setRestApiAvailable(t2), this._cslStylesManager.setRestApiAvailable(t2);
  }, fp.prototype._addEventListeners = function() {
    var t2 = this;
    this._saveBtn.subscribe(function(e2) {
      if ("button:click" === e2.type) {
        var n2 = t2._languageSelect.getSelectedValue();
        if (null !== n2) {
          var i2 = v({}, t2._stateSettings), r2 = [];
          t2._stateSettings.language !== n2 && (t2._localesManager.saveLastUsedLanguage(n2), r2.push(t2._localesManager.loadLocale(n2).catch(function(e3) {
            throw console.error(e3), t2._langMessage.show(Vf("Failed to load language")), e3;
          })));
          var o2 = "footnotes";
          t2._endNotes.getState().checked && (o2 = "endnotes"), t2._stateSettings.notesStyle !== o2 && (t2._cslStylesManager.saveLastUsedNotesStyle(o2), "note" === t2._cslStylesManager.getLastUsedFormat() && r2.push(Promise.resolve()));
          var s2 = t2._styleSelect.getSelectedValue();
          t2._stateSettings.style !== s2 && null !== s2 && r2.push(t2._onStyleChange(s2)), r2.length ? (t2._showLoader(), Promise.all(r2).then(function() {
            t2._hide(), t2._hideLoader();
            var e3 = { language: n2, style: s2 || "ieee", notesStyle: o2, styleFormat: t2._cslStylesManager.getLastUsedFormat() };
            t2._onChangeState(e3, i2);
          }).catch(function(e3) {
            t2._hideLoader();
          })) : t2._hide();
        } else console.error("No language selected");
      }
    }), this._cancelBtn.subscribe(function(e2) {
      if ("button:click" === e2.type) {
        var n2 = t2._languageSelect.getSelectedValue(), i2 = t2._styleSelect.getSelectedValue();
        null !== n2 && t2._localesManager.getLastUsedLanguage() !== n2 && t2._languageSelect.selectItems(t2._localesManager.getLastUsedLanguage(), true), t2._stateSettings.style !== i2 && null !== i2 ? (t2._styleSelect.selectItems(t2._stateSettings.style, true), t2._styleSelectListOther.selectItems(t2._stateSettings.style, true), t2._onStyleChange(t2._stateSettings.style, true).then(function() {
          t2._hide();
        })) : t2._hide();
      }
    }), this._cslFileInput.onchange = function(e2) {
      if (e2.target instanceof HTMLInputElement) {
        var n2 = e2.target;
        if (n2.files) {
          var i2 = n2.files[0];
          i2 ? t2._cslStylesManager.addCustomStyle(i2).then(function(e3) {
            t2._addStylesToList([e3]);
          }).catch(function(e3) {
            console.error(e3), t2._styleMessage.show(Vf("Invalid CSL style file"));
          }).finally(function() {
            t2._hideLoader();
          }) : console.error("No file selected");
        }
      }
    }, this._styleSelect.subscribe(function(e2) {
      if ("selectbox:change" === e2.type) return t2._styleSelectListOther.selectItems(e2.detail.current.toString(), true), t2._somethingWasChanged(), void t2._onStyleChange(e2.detail.current.toString(), true);
      "selectbox:custom" === e2.type && ("more_styles" === e2.detail.current && t2._styleSelectListOther.openDropdown());
    }), t2._styleSelectListOther.subscribe(function(e2) {
      if ("selectbox:change" === e2.type && e2.detail.items) {
        var n2 = e2.detail.items[0];
        t2._styleSelect.addItem(n2.value, n2.text, true), t2._somethingWasChanged(), t2._onStyleChange(n2.value, true);
      }
    }), this._languageSelect.subscribe(function(e2) {
      "selectbox:change" === e2.type && t2._somethingWasChanged();
    }), this._footNotes.subscribe(function(e2) {
      t2._somethingWasChanged();
    }), this._endNotes.subscribe(function(e2) {
      t2._somethingWasChanged();
    });
  }, fp.prototype._hideAllMessages = function() {
    this._langMessage.close(), this._styleMessage.close();
  }, fp.prototype._hide = function() {
    this._router.openMain();
  }, fp.prototype.show = function() {
    this._stateSettings = { language: this._localesManager.getLastUsedLanguage(), style: this._cslStylesManager.getLastUsedStyleIdOrDefault(), notesStyle: this._cslStylesManager.getLastUsedNotesStyle(), styleFormat: this._cslStylesManager.getLastUsedFormat() }, this._saveBtn.disable(), this._router.openSettings(), this._stateSettings.notesStyle === this._endNotes.getState().value ? this._endNotes.check() : this._footNotes.check();
  }, fp.prototype._loadStyles = function() {
    var t2 = this;
    return this._cslStylesManager.getStylesInfo().then(function(e2) {
      t2._addStylesToList(e2), t2._styleSelect.addCustomItem("more_styles", "More Styles..."), t2._styleSelect.addCustomItem("cslFileInput", "Add custom style...");
    }).catch(function(t3) {
      console.error(t3);
    });
  }, fp.prototype._addStylesToList = function(t2) {
    var e2 = this, n2 = this._cslStylesManager.getLastUsedStyleIdOrDefault(), i2 = t2.map(function(t3) {
      return [t3.name, t3.title];
    }), r2 = i2.filter(function(t3) {
      return t3[0] == n2 || !!e2._cslStylesManager.isStyleDefault(t3[0]);
    });
    this._styleSelect.addItems(r2, n2), this._styleSelectListOther.addItems(i2, n2);
  }, fp.prototype._somethingWasChanged = function() {
    this._saveBtn.enable();
  }, fp.prototype._onStyleChange = function(t2, e2) {
    var n2 = this;
    return e2 && n2._showLoader(), n2._cslStylesManager.getStyle(t2, !e2).then(function(t3) {
      var i2 = t3.styleFormat;
      n2._bNumFormat = "numeric" == i2, "note" === i2 ? n2._notesStyleWrapper.classList.remove(n2._displayNoneClass) : n2._notesStyleWrapper.classList.add(n2._displayNoneClass), e2 && n2._hideLoader();
    }).catch(function(t3) {
      throw console.error(t3), "string" == typeof t3 && n2._styleMessage.show(Vf(t3)), e2 && n2._hideLoader(), t3;
    });
  }, fp.prototype._showLoader = function() {
    this._cancelBtn.disable(), this._saveBtn.disable(), this._styleSelect.disable(), this._languageSelect.disable();
  }, fp.prototype._hideLoader = function() {
    this._cancelBtn.enable(), this._saveBtn.enable(), this._styleSelect.enable(), this._languageSelect.enable();
  }, dp.prototype.init = function() {
    var t2 = this;
    this._addEventListeners();
    var e2 = false, n2 = document.querySelectorAll(".for-zotero-online");
    zc.runApisChecker(t2._sdk).subscribe(function(i3) {
      return t2._onChangeState(i3), e2 || (e2 = true, !i3.desktopVersion && t2._useDesktopApp && t2._useDesktopApp.classList.add("hidden"), t2._onOpen(), t2._show()), i3.online ? n2.forEach(function(t3) {
        t3.classList.remove("hidden");
      }) : n2.forEach(function(t3) {
        t3.classList.add("hidden");
      }), i3.online && i3.hasKey ? (t2._sdk.setIsOnlineAvailable(true), t2._hide(true), void t2._onAuthorized(i3)) : i3.desktop && i3.hasPermission ? (t2._sdk.setIsOnlineAvailable(false), t2._hide(), t2._hideAllMessages(), void t2._onAuthorized(i3)) : void 0;
    });
    var i2 = { onOpen: function(e3) {
      return t2._onOpen = e3, i2;
    }, onChangeState: function(e3) {
      return t2._onChangeState = e3, i2;
    }, onAuthorized: function(e3) {
      return t2._onAuthorized = e3, i2;
    } };
    return i2;
  }, dp.prototype._addEventListeners = function() {
    var t2 = this;
    this._apiKeyLoginField.subscribe(function(e2) {
      e2.type, "inputfield:input" === e2.type && (t2._apiKeyLoginField.getValue() ? t2._saveApiKeyBtn.enable() : t2._saveApiKeyBtn.disable());
    }), this._saveApiKeyBtn.subscribe(function(e2) {
      "button:click" === e2.type && t2._tryToApplyKey();
    }), this._connectToLocalZotero.subscribe(function(e2) {
      "button:click" === e2.type && (t2._showLoader(), zc.checkStatus(t2._sdk).then(function(e3) {
        if (e3.desktop && e3.hasPermission) t2._sdk.setIsOnlineAvailable(false), t2._hide(), t2._hideAllMessages();
        else if (e3.desktop && !e3.hasPermission) {
          t2._useDesktopMessage.show(Vf('Connection to Zotero failed. Please enable external connections in Zotero: Edit → Settings → Advanced → Check "Allow other applications on this computer to communicate with Zotero"'));
        } else e3.desktop || t2._useDesktopMessage.show(Vf("Connection to Zotero failed. Make sure Zotero is running."));
      }).finally(function() {
        t2._hideLoader();
      }));
    }), this._logoutLink.onclick = function(e2) {
      return t2._sdk.clearSettings(), t2._show(), true;
    };
  }, dp.prototype._tryToApplyKey = function() {
    var t2 = this, e2 = t2._apiKeyLoginField.getValue();
    e2 && (t2._showLoader(), t2._sdk.setApiKey(e2).then(function() {
      zc.successfullyLoggedInUsingApiKey(), t2._hide(true);
    }).catch(function(e3) {
      console.error(e3), t2._apiKeyMessage.show(Vf("Invalid API key"));
    }).finally(function() {
      t2._hideLoader();
    }));
  }, dp.prototype._hideAllMessages = function() {
    this._apiKeyMessage.close();
  }, dp.prototype._hide = function(t2) {
    this._router.openMain(), t2 && this._logoutLink.classList.remove("hidden");
  }, dp.prototype._show = function() {
    this._router.openLogin(), this._logoutLink.classList.add("hidden");
  }, dp.prototype._showLoader = function() {
    this._saveApiKeyBtn.disable(), this._connectToLocalZotero.disable(), this._apiKeyLoginField.disable();
  }, dp.prototype._hideLoader = function() {
    this._saveApiKeyBtn.enable(), this._connectToLocalZotero.enable(), this._apiKeyLoginField.enable();
  }, pp.prototype._addEventListeners = function() {
    var t2 = this;
    this._searchField.subscribe(function(e2) {
      if ("inputfield:blur" === e2.type || "inputfield:submit" === e2.type) {
        var n2 = t2._getSelectedGroups();
        t2._subscribers.forEach(function(t3) {
          t3(e2.detail.value, n2);
        });
      }
    }), this._filterButton.subscribe(function(e2) {
      "button:click" === e2.type && (t2._librarySelectList.isOpen || (e2.detail.originalEvent && e2.detail.originalEvent.stopPropagation(), t2._librarySelectList.openDropdown()));
    });
  }, pp.prototype.addGroups = function(t2) {
    var e2 = this, n2 = localStorage.getItem("selectedGroups"), i2 = n2 ? JSON.parse(n2).map(function(t3) {
      return t3.toString();
    }) : ["my_library", "group_libraries"], r2 = false;
    t2.forEach(function(t3) {
      t3.id = String(t3.id);
    });
    var o2 = [{ id: "my_library", name: Vf("My Library") }, { id: "group_libraries", name: Vf("Group Libraries") }];
    !r2 && o2.forEach(function(t3) {
      -1 !== i2.indexOf(t3.id) && (r2 = true);
    }), !r2 && t2.forEach(function(t3) {
      -1 !== i2.indexOf(t3.id.toString()) && (r2 = true);
    }), r2 || (i2 = ["my_library", "group_libraries"]);
    for (var s2 = function(t3, n3, i3) {
      "number" == typeof t3 && (t3 = t3.toString()), e2._librarySelectList instanceof Sf && e2._librarySelectList.addItem(t3, n3, i3);
    }, a2 = 0; a2 < o2.length; a2++) {
      var c2 = o2[a2].id;
      s2(c2, o2[a2].name, -1 !== i2.indexOf(c2));
    }
    if (0 !== t2.length) {
      this._librarySelectList.addSeparator();
      var u2 = -1 !== i2.indexOf("group_libraries");
      for (a2 = 0; a2 < t2.length; a2++) {
        var l2 = t2[a2].id;
        s2(l2, t2[a2].name, u2 || -1 !== i2.indexOf(l2.toString()));
      }
      this._selectedGroupsWatcher(o2, t2);
    }
  }, pp.prototype._getSelectedGroups = function() {
    var t2 = this, e2 = this._librarySelectList.getSelectedValues();
    return false !== Array.isArray(e2) && 0 !== e2.length || setTimeout(function() {
      t2._librarySelectList.openDropdown();
    }, 500), null === e2 || "string" == typeof e2 ? [] : e2;
  }, pp.prototype.subscribe = function(t2) {
    var e2 = this;
    return this._subscribers.push(t2), { unsubscribe: function() {
      e2._subscribers = e2._subscribers.filter(function(e3) {
        return e3 !== t2;
      });
    } };
  }, pp.prototype._selectedGroupsWatcher = function(t2, e2) {
    var n2 = this;
    this._librarySelectList instanceof Sf != false && this._librarySelectList.subscribe(function(i2) {
      if ("selectbox:change" === i2.type) {
        var r2 = [], o2 = i2.detail.values, s2 = i2.detail.current, a2 = i2.detail.enabled, c2 = t2.map(function(t3) {
          return t3.id;
        }), u2 = e2.map(function(t3) {
          return t3.id.toString();
        }), l2 = -1 !== c2.indexOf(String(s2));
        if (l2) "group_libraries" === s2 ? (a2 ? (r2.push("group_libraries"), n2._librarySelectList.selectItems(u2, true)) : n2._librarySelectList.unselectItems(u2, true), -1 !== o2.indexOf("my_library") && r2.push("my_library")) : -1 !== o2.indexOf("group_libraries") ? (r2.push("group_libraries"), a2 && r2.push(s2)) : r2 = o2.slice();
        else if (!l2) {
          u2.every(function(t3) {
            return -1 !== o2.indexOf(t3);
          }) ? (n2._librarySelectList.selectItems("group_libraries", true), r2.push("group_libraries"), -1 !== o2.indexOf("my_library") && r2.push("my_library")) : (n2._librarySelectList.unselectItems("group_libraries", true), r2 = o2.filter(function(t3) {
            return "group_libraries" !== t3;
          }));
        }
        0 === r2.length ? localStorage.removeItem("selectedGroups") : localStorage.setItem("selectedGroups", JSON.stringify(r2));
      }
    });
  };
  var vp = [["appendix", "Appendix"], ["article", "Article"], ["book", "Book"], ["chapter", "Chapter"], ["column", "Column"], ["figure", "Figure"], ["folio", "Folio"], ["issue", "Issue"], ["line", "Line"], ["note", "Note"], ["opus", "Opus"], ["page", "Page"], ["paragraph", "Paragraph"], ["part", "Part"], ["rule", "Rule"], ["section", "Section"], ["sub-verbo", "Sub verbo"], ["table", "Table"], ["title", "Title"], ["verses", "Verses"], ["volume", "Volume"]];
  function mp(t2, e2, n2) {
    this._displayNoneClass = t2, this._items = {}, this._html = {}, this._checks = {}, this._cancelSelectBtn = document.getElementById("cancelSelectBtn"), this._docsHolder = document.getElementById("docsHolder"), this._nothingFound = document.getElementById("nothingFound"), this._docsThumb = document.getElementById("docsThumb"), this._selectedWrapper = document.getElementById("selectedWrapper"), this._selectedHolder = document.getElementById("selectedHolder"), this._selectedInfo = document.getElementById("selectedInfo"), this._selectedCount = document.getElementById("selectedCount"), this._selectedThumb = document.getElementById("selectedThumb"), this._selectedHolder && this._selectedThumb && (this._selectedScroller = this._initScrollBox(this._selectedHolder, this._selectedThumb, 20)), this._docsHolder && this._docsThumb && (this._docsScroller = this._initScrollBox(this._docsHolder, this._docsThumb, 40, this._checkDocsScroll.bind(this))), this._lastSearch = null, this._subscribers = [], this._fShouldLoadMore = n2, this._fLoadMore = e2, this._loadTimeout, this._init();
  }
  mp.prototype._init = function() {
    var t2 = this;
    this._cancelSelectBtn && (this._cancelSelectBtn.onclick = function(e2) {
      var n2 = [];
      for (var i2 in t2._items) n2.push(i2);
      for (var r2 = 0; r2 < n2.length; r2++) t2._removeSelected(n2[r2]);
    });
  }, mp.prototype.clearLibrary = function() {
    this._nothingFound && this._nothingFound.classList.add(this._displayNoneClass);
    for (var t2 = this._docsHolder; t2 && t2.lastChild; ) t2.removeChild(t2.lastChild);
    t2 && (t2.scrollTop = 0), this._docsScroller.onscroll();
  }, mp.prototype.displayNothingFound = function() {
    this.clearLibrary(), this._nothingFound && this._nothingFound.classList.remove(this._displayNoneClass);
  }, mp.prototype.displaySearchItems = function(t2, e2, n2) {
    var i2 = this, r2 = this, o2 = this._docsHolder;
    this._lastSearch = n2;
    var s2 = 0;
    return new Promise(function(n3, a2) {
      if (t2 && t2.items && t2.items.length > 0) {
        var c2 = document.createElement("div");
        o2 && c2.classList.add("page" + o2.children.length);
        for (var u2 = 0; u2 < t2.items.length; u2++) {
          var l2 = t2.items[u2];
          l2.title && (c2.appendChild(r2._buildDocElement(l2)), s2++);
        }
        o2 && o2.appendChild(c2);
      } else e2 && a2(e2);
      i2._docsScroller.onscroll(), n3(s2);
    });
  }, mp.prototype.getSelectedItems = function() {
    return Object.assign({}, this._items || {});
  }, mp.prototype.removeItems = function(t2) {
    var e2 = this;
    t2.forEach(function(t3) {
      e2._removeSelected(t3);
    });
  }, mp.prototype.subscribe = function(t2) {
    var e2 = this;
    return this._subscribers.push(t2), { unsubscribe: function() {
      e2._subscribers = e2._subscribers.filter(function(e3) {
        return e3 !== t2;
      });
    } };
  }, mp.prototype._buildDocElement = function(t2) {
    var e2 = this, n2 = document.createElement("div");
    n2.classList.add("doc");
    var i2 = document.createElement("div");
    i2.classList.add("docInfo");
    var r2 = document.createElement("div"), o2 = "";
    t2.author && t2.author.length > 0 && (o2 = t2.author.map(function(t3) {
      return t3.family && t3.given ? t3.family.trim() + ", " + t3.given.trim() : t3.family ? t3.family.trim() : t3.given ? t3.given.trim() : "";
    }).join("; "));
    var s2 = document.createElement("div");
    s2.classList.add("selectbox-arrow"), s2.innerHTML = "<b></b>";
    var a2 = document.createElement("div");
    if (a2.textContent = t2.title.trim(), a2.classList.add("truncate-text"), a2.classList.add("secondary-text"), (t2.publisher || t2["publisher-place"]) && (a2.textContent += " · " + (t2.publisher || t2["publisher-place"] || "")), t2.issued && t2.issued["date-parts"]) {
      var c2 = t2.issued["date-parts"][0];
      o2.length > 20 ? a2.textContent += " (" + c2.join("-") + ")" : (o2.length > 0 && "." !== o2.slice(-1) && "," !== o2.slice(-1) && (o2 += "."), o2 += " " + c2.join("-"));
    }
    0 === o2.length && (o2 = a2.textContent), a2.setAttribute("title", a2.textContent), i2.appendChild(a2);
    var u2 = document.createElement("input");
    r2.appendChild(u2);
    var l2, h2 = new Eh(u2, { checked: !!this._items[t2.id], label: o2, title: true, id: t2.id });
    return this._items[t2.id] && (this._checks[t2.id] = h2), r2.appendChild(s2), n2.appendChild(r2), n2.appendChild(i2), s2.onclick = function() {
      n2.classList.toggle("doc-open"), l2 || (l2 = e2._buildCitationParams(t2), n2.appendChild(l2));
    }, h2.subscribe(function(n3) {
      "checkbox:change" === n3.type && (n3.detail.checked ? e2._addSelected(t2, h2) : e2._removeSelected(t2.id));
    }), n2;
  }, mp.prototype._buildCitationParams = function(t2) {
    var e2 = localStorage.getItem("selectedLocator") || "page";
    t2.label = e2;
    var n2 = document.createDocumentFragment(), i2 = document.createElement("div"), r2 = document.createElement("input"), o2 = document.createElement("input"), s2 = document.createElement("div"), a2 = document.createElement("div"), c2 = document.createElement("input"), u2 = document.createElement("div"), l2 = document.createElement("input");
    n2.appendChild(i2), i2.appendChild(r2), i2.appendChild(o2), n2.appendChild(s2), s2.appendChild(a2), s2.appendChild(c2);
    var h2 = "";
    n2.appendChild(u2), u2.appendChild(l2);
    var f2 = new Zl(r2, { type: "text", placeholder: "Prefix" }), d2 = new Zl(o2, { type: "text", placeholder: "Suffix" }), p2 = new Sf(a2, { placeholder: "Locator" });
    vp.forEach(function(t3) {
      var n3 = t3[0] === e2;
      p2.addItem(t3[0], t3[1], n3), n3 && (h2 = t3[1]);
    });
    var v2 = new Zl(c2, { type: "text", placeholder: h2 }), m2 = new Eh(l2, { label: Vf("Omit author") });
    return f2.subscribe(function(e3) {
      "inputfield:input" === e3.type && (t2.prefix = e3.detail.value);
    }), d2.subscribe(function(e3) {
      "inputfield:input" === e3.type && (t2.suffix = e3.detail.value);
    }), v2.subscribe(function(e3) {
      "inputfield:input" === e3.type && (t2.locator = e3.detail.value);
    }), p2.subscribe(function(e3) {
      if ("selectbox:change" === e3.type && e3.detail.items) {
        var n3 = e3.detail.items[0];
        v2.setPlaceholder(n3.text), t2.label = e3.detail.values[0].toString(), localStorage.setItem("selectedLocator", t2.label);
      }
    }), m2.subscribe(function(e3) {
      "checkbox:change" === e3.type && (t2["suppress-author"] = e3.detail.checked);
    }), n2;
  }, mp.prototype._buildSelectedElement = function(t2) {
    var e2 = this, n2 = document.createElement("div");
    n2.classList.add("selDoc");
    var i2 = document.createElement("span");
    t2.author && t2.author.length > 0 ? i2.textContent = t2.author.map(function(t3) {
      return t3.family + ", " + t3.given;
    }).join("; ") : i2.textContent = t2.title, t2.issued && t2.issued["date-parts"] && (i2.textContent += " " + t2.issued["date-parts"][0].join("-")), i2.setAttribute("title", i2.textContent), n2.appendChild(i2);
    var r2 = document.createElement("span");
    return r2.onclick = function() {
      e2._removeSelected(t2.id);
    }, r2.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0718 4.6333L11.564 5.14404L10.5483 6.1665L8.70459 8.02002L10.3862 9.7124L11.4829 10.8149L12.0308 11.3667L11.3218 12.0718L10.7729 11.52L9.67725 10.4175L7.99951 8.729L6.32275 10.4165L5.22705 11.52L4.67822 12.0718L3.96924 11.3667L4.51709 10.8149L5.61377 9.7124L7.29443 8.02002L5.45166 6.1665L4.43604 5.14404L3.92822 4.6333L4.63721 3.92822L5.14502 4.43896L6.16162 5.46143L7.99951 7.31104L9.83838 5.46143L10.855 4.43896L11.3628 3.92822L12.0718 4.6333Z" fill="currentColor" fill-opacity="0.8"/></svg>', n2.appendChild(r2), n2;
  }, mp.prototype._addSelected = function(t2, e2) {
    var n2 = this._buildSelectedElement(t2);
    this._items[t2.id] = t2, this._html[t2.id] = n2, this._checks[t2.id] = e2, this._selectedHolder && this._selectedHolder.appendChild(n2), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
  }, mp.prototype._checkDocsScroll = function(t2, e2) {
    var n2 = this;
    if (this._fShouldLoadMore(t2)) {
      if (this._loadTimeout && clearTimeout(this._loadTimeout), !this._lastSearch.obj && !this._lastSearch.text.trim() && !this._lastSearch.groups.length) return;
      this._loadTimeout = setTimeout(function() {
        n2._fShouldLoadMore(t2) && n2._fLoadMore();
      }, 500);
    }
  }, mp.prototype._initScrollBox = function(t2, e2, n2, i2) {
    var r2 = {};
    return r2.onscroll = this._checkScroll(t2, e2, n2, i2), t2.onwheel = function(e3) {
      t2.scrollTop += e3.deltaY > 10 || e3.deltaY < -10 ? e3.deltaY : 20 * e3.deltaY, r2.onscroll();
    }, e2.onmousedown = function(n3) {
      e2.classList.add("scrolling");
      var i3 = n3.clientY, o2 = t2.scrollTop;
      window.onmouseup = function(t3) {
        e2.classList.remove("scrolling"), window.onmouseup = null, window.onmousemove = null;
      }, window.onmousemove = function(e3) {
        var n4 = (e3.clientY - i3) / t2.clientHeight, s2 = t2.scrollHeight * n4;
        t2.scrollTop = o2 + s2, r2.onscroll();
      };
    }, document.body.addEventListener("resize", function() {
      r2.onscroll();
    }), r2;
  }, mp.prototype._checkScroll = function(t2, e2, n2, i2) {
    var r2 = this._displayNoneClass;
    return function() {
      if (t2.scrollHeight <= t2.clientHeight) e2.classList.add(r2);
      else {
        e2.classList.remove(r2);
        var o2 = t2.clientHeight / t2.scrollHeight * t2.clientHeight;
        o2 = o2 < n2 ? n2 : o2, e2.style.height = o2 + "px";
        var s2 = t2.scrollHeight - t2.clientHeight, a2 = t2.scrollTop / s2 * (t2.clientHeight - o2);
        e2.style.marginTop = a2 + "px";
      }
      i2 && i2(t2, e2);
    };
  }, mp.prototype._removeSelected = function(t2) {
    var e2 = this._html[t2];
    this._selectedHolder && this._selectedHolder.removeChild(e2), delete this._items[t2], delete this._html[t2], this._checks[t2] && (this._checks[t2].uncheck(true), delete this._checks[t2]), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
  }, mp.prototype._checkSelected = function() {
    var t2 = this.count();
    this._selectedInfo && this._selectedCount && this._selectedWrapper && (t2 <= 0 ? (this._selectedWrapper.classList.add(this._displayNoneClass), this._selectedInfo.classList.add(this._displayNoneClass)) : (this._selectedWrapper.classList.remove(this._displayNoneClass), this._selectedInfo.classList.remove(this._displayNoneClass), this._selectedCount.textContent = t2 + " " + Vf("selected")), this._subscribers.forEach(function(e2) {
      e2(t2);
    }));
  }, mp.prototype.count = function() {
    var t2 = 0;
    for (var e2 in this._items) t2++;
    return t2;
  }, (function() {
    var t2, e2, n2, r2, o2, s2, a2, c2, u2, l2, h2, f2 = "hidden", d2 = { text: "", obj: null, groups: [], groupsHash: "" }, p2 = new Uf("libLoader", Vf("Loading...")), v2 = {};
    function _2() {
      for (var t3 = document.getElementsByClassName("i18n"), e3 = function() {
        var e4 = t3[n3];
        if (e4 instanceof HTMLElement == false) return 1;
        ["placeholder", "title"].forEach(function(t4) {
          e4.hasAttribute(t4) && e4.setAttribute(t4, Vf(e4.getAttribute(t4) || ""));
        });
        var i2 = Vf(e4.innerText.trim().replace(/\s+/g, " "));
        i2 && (e4.innerText = i2);
      }, n3 = 0; n3 < t3.length; n3++) e3();
    }
    function b2(t3) {
      t3 && "string" == typeof t3 ? (Vf(""), v2.error.classList.remove(f2), v2.error.textContent = t3, setTimeout(function() {
        window.onclick = function() {
          b2(false);
        };
      }, 100)) : (v2.error.classList.add(f2), v2.error.textContent = "", window.onclick = null);
    }
    function g2(t3, e3) {
      return y2.apply(this, arguments);
    }
    function y2() {
      return (y2 = i(m().m(function t3(e3, n3) {
        var i2;
        return m().w(function(t4) {
          for (; ; ) switch (t4.n) {
            case 0:
              if (l2.disable(), h2.disable(), c2.disable(), !((i2 = window.Asc.scope.editorVersion) && i2 < 9004e3)) {
                t4.n = 2;
                break;
              }
              return t4.n = 1, op.getCursorPosition();
            case 1:
              window._cursorPosition = t4.v, t4.n = 3;
              break;
            case 2:
              return t4.n = 3, new Promise(function(t5) {
                Asc.plugin.executeMethod("StartAction", ["GroupActions", { lockScroll: true, keepSelection: e3 }], t5);
              });
            case 3:
              return t4.a(2);
          }
        }, t3);
      }))).apply(this, arguments);
    }
    function w2(t3, e3) {
      return S2.apply(this, arguments);
    }
    function S2() {
      return (S2 = i(m().m(function t3(e3, n3) {
        var i2;
        return m().w(function(t4) {
          for (; ; ) switch (t4.n) {
            case 0:
              if (l2.enable(), h2.enable(), E2(), !((i2 = window.Asc.scope.editorVersion) && i2 < 9004e3)) {
                t4.n = 1;
                break;
              }
              op.setCursorPosition(window._cursorPosition || 0), t4.n = 2;
              break;
            case 1:
              return t4.n = 2, new Promise(function(t5) {
                Asc.plugin.executeMethod("EndAction", ["GroupActions", { scrollToTarget: e3 }], t5);
              });
            case 2:
              return t4.a(2);
          }
        }, t3);
      }))).apply(this, arguments);
    }
    function O2(t3) {
      var e3 = document.getElementById("searchLabel");
      if (e3) {
        var n3 = e3.querySelector(".when-empty"), i2 = e3.querySelector(".when-not-empty"), r3 = e3.querySelector(".when-started");
        if (n3 && i2 && r3) switch (n3.classList.add("hidden"), i2.classList.add("hidden"), r3.classList.add("hidden"), t3) {
          case "empty":
            n3.classList.remove("hidden");
            break;
          case "not-empty":
            i2.classList.remove("hidden");
            break;
          case "started":
            i2.classList.remove("hidden"), r3.classList.remove("hidden");
        }
        else console.error("Search label elements not found");
      } else console.error("Search label not found");
    }
    function k2() {
      console.warn("Loading more..."), d2.obj && d2.obj.next && A2(d2.obj.next(), false);
      for (var t3 = 0; t3 < d2.groups.length && d2.groups[t3].next; t3++) A2(e2.getGroupItems(d2.groups[t3].next(), d2.groups[t3].id), true);
    }
    function x2(e3) {
      if ("main" != t2.getRoute()) return false;
      if (e3.scrollTop + e3.clientHeight < e3.scrollHeight) return false;
      var n3 = true;
      return d2.groups.forEach(function(t3) {
        t3.next && (n3 = false);
      }), !!(d2.obj && d2.obj.next && n3) && !!(d2.obj || d2.text.trim() || d2.groups.length);
    }
    function A2(t3, e3) {
      return t3.then(function(t4) {
        return C2(t4, null, e3);
      }).catch(function(t4) {
        return console.error(t4), t4.message && b2(Vf(t4.message)), C2(null, t4, e3);
      }).then(function(t4) {
        return t4;
      });
    }
    function C2(t3, e3, n3) {
      var i2 = false;
      !d2.obj && t3 && t3.items && !t3.items.length && (i2 = true), e3 ? (i2 && (d2.obj = null, d2.groups = []), d2 && d2.obj && delete d2.obj.next) : n3 && t3 && t3.next ? d2.groups.push(t3) : d2.obj = t3 && t3.items.length ? t3 : null;
      return t3 && t3.items && t3.items.length > 0 && (t3.items = t3.items.map(function(e4) {
        return e4 = (function(t4) {
          if (t4.id || !t4.key) return t4;
          var e5 = { id: t4.key, title: t4.data.title, type: t4.data.itemType };
          Object.hasOwnProperty.call(t4, "url") && (e5.URL = t4.data.url);
          Object.hasOwnProperty.call(t4, "volume") && (e5.volume = t4.data.volume);
          Object.hasOwnProperty.call(t4, "language") && (e5.language = t4.data.language);
          Object.hasOwnProperty.call(t4, "abstract") && (e5.abstract = t4.data.abstract);
          Object.hasOwnProperty.call(t4, "note") && (e5.note = t4.data.note);
          Object.hasOwnProperty.call(t4, "page") && (e5.page = t4.data.page);
          Object.hasOwnProperty.call(t4, "shortTitle") && (e5.shortTitle = t4.data.shortTitle);
          Object.hasOwnProperty.call(t4, "links") && (e5.uris = [], Object.hasOwnProperty.call(t4.links, "self") && e5.uris.push(t4.links.self.href), Object.hasOwnProperty.call(t4.links, "alternate") && e5.uris.push(t4.links.alternate.href));
          return e5;
        })(e4), e4[n3 ? "groupID" : "userID"] = t3.id, (function(t4) {
          if (!t4.id) return t4;
          var e5 = t4.id.indexOf("/") + 1, n4 = t4.id.lastIndexOf("/") + 1, i3 = t4.id.indexOf("http");
          e5 !== n4 && 0 === i3 && (t4.uris || (t4.uris = []), t4.uris.push(t4.id)), n4 && (t4.id = t4.id.substring(n4));
        })(e4), e4;
      })), s2.displaySearchItems(t3, e3, d2);
    }
    function E2(t3) {
      void 0 === t3 && (t3 = s2.count()), t3 <= 0 ? (c2.disable(), c2.setText(Vf("Insert Citation"))) : (c2.enable(), t3 > 1 ? c2.setText(Vf("Insert " + t3 + " Citations")) : c2.setText(Vf("Insert Citation")));
    }
    function I2() {
      return (I2 = i(m().m(function t3() {
        var e3, n3, i2;
        return m().w(function(t4) {
          for (; ; ) switch (t4.p = t4.n) {
            case 0:
              return t4.p = 0, t4.n = 1, new Promise(function(t5) {
                Asc.plugin.executeMethod("GetVersion", [], t5);
              });
            case 1:
              for ("develop" == (e3 = t4.v) && (e3 = "99.99.99"), n3 = e3.split("."); 3 > n3.length; ) n3.push("0");
              return t4.a(2, 1e6 * parseInt(n3[0]) + 1e3 * parseInt(n3[1]) + parseInt(n3[2]));
            case 2:
              return t4.p = 2, i2 = t4.v, console.error(i2), t4.a(2, 99999999);
          }
        }, t3, null, [[0, 2]]);
      }))).apply(this, arguments);
    }
    window.Asc.plugin.init = function() {
      Uf.show(), (function() {
        var t3 = document.getElementById("errorWrapper");
        if (!t3) throw new Error("errorWrapper not found");
        var e3 = document.getElementById("mainState");
        if (!e3) throw new Error("mainState not found");
        o2 = new pp(), s2 = new mp(f2, k2, x2), a2 = new Ql("saveAsTextBtn", { variant: "secondary" }), c2 = new Ql("insertLinkBtn", { disabled: true }), u2 = new Ql("settingsBtn", { variant: "icon-only", size: "small" }), l2 = new Ql("insertBibBtn", { variant: "secondary" }), h2 = new Ql("refreshBtn", { variant: "secondary" }), v2 = { error: t3, mainState: e3 };
      })(), t2 = new Dc(), e2 = new jl();
      var y3 = new dp(t2, e2);
      n2 = new fp(t2, f2), r2 = new qd(n2.getLocalesManager(), n2.getStyleManager(), e2);
      var S3 = false;
      !(function() {
        function t3(t4, n3, i2) {
          s2.clearLibrary();
          var r3 = [];
          return e2.getUserGroups().then(function(o3) {
            var s3 = n3.filter(function(t5) {
              return "my_library" !== t5 && "group_libraries" !== t5;
            });
            -1 !== n3.indexOf("my_library") && r3.push(A2(e2.getItems(t4), false));
            for (var a3 = 0; a3 < s3.length; a3++) r3.push(A2(e2.getGroupItems(t4, s3[a3]), true));
            return d2.text = t4, d2.obj = null, d2.groups = [], d2.groupsHash = i2, r3;
          });
        }
        s2.subscribe(E2), o2.subscribe(function(e3, n3) {
          e3 = e3.trim();
          var i2 = n3.join(",");
          v2.mainState.classList.contains(f2) || !e3 || e3 == d2.text && i2 === d2.groupsHash || 0 === n3.length || t3(e3, n3, i2).catch(function() {
            return [];
          }).then(function(t4) {
            return t4.length && (p2.show(), Promise.any(t4).then(function() {
              p2.hide();
            }).finally(function() {
              p2.hide();
            })), Promise.allSettled(t4);
          }).then(function(t4) {
            var e4 = 0;
            t4.forEach(function(t5) {
              "fulfilled" === t5.status && (e4 += t5.value);
            }), 0 === e4 ? (O2("empty"), s2.displayNothingFound()) : O2("not-empty");
          });
        }), h2.subscribe((function() {
          var t4 = i(m().m(function t5(e3) {
            var i2, o3;
            return m().w(function(t6) {
              for (; ; ) switch (t6.n) {
                case 0:
                  if ("button:click" === e3.type) {
                    t6.n = 1;
                    break;
                  }
                  return t6.a(2);
                case 1:
                  if (n2.getLastUsedStyleId()) {
                    t6.n = 2;
                    break;
                  }
                  return b2(Vf("Style is not selected")), t6.a(2);
                case 2:
                  if (n2.getLocale()) {
                    t6.n = 3;
                    break;
                  }
                  return b2(Vf("Language is not selected")), t6.a(2);
                case 3:
                  return t6.n = 4, g2(true, "Zotero (" + Vf("Updating citations") + ")");
                case 4:
                  i2 = r2.updateCslItems.bind(r2, false), "note" === (o3 = n2.getStyleManager()).getLastUsedFormat() && (i2 = r2.updateCslItemsInNotes.bind(r2, o3.getLastUsedNotesStyle())), i2().catch(function(t7) {
                    console.error(t7);
                    var e4 = Vf("Failed to refresh");
                    "string" == typeof t7 && (e4 += ". " + Vf(t7)), b2(e4);
                  }).finally(function() {
                    w2(false, "Zotero (" + Vf("Updating citations") + ")");
                  });
                case 5:
                  return t6.a(2);
              }
            }, t5);
          }));
          return function(e3) {
            return t4.apply(this, arguments);
          };
        })()), l2.subscribe((function() {
          var t4 = i(m().m(function t5(e3) {
            var i2;
            return m().w(function(t6) {
              for (; ; ) switch (t6.n) {
                case 0:
                  if ("button:click" === e3.type) {
                    t6.n = 1;
                    break;
                  }
                  return t6.a(2);
                case 1:
                  if (n2.getLastUsedStyleId()) {
                    t6.n = 2;
                    break;
                  }
                  return b2(Vf("Style is not selected")), t6.a(2);
                case 2:
                  if (n2.getLocale()) {
                    t6.n = 3;
                    break;
                  }
                  return b2(Vf("Language is not selected")), t6.a(2);
                case 3:
                  return t6.n = 4, g2(false, "Zotero (" + Vf("Inserting bibliography") + ")");
                case 4:
                  i2 = "", r2.insertBibliography().then(function(t7) {
                    i2 = t7;
                  }).catch(function(t7) {
                    console.error(t7);
                    var e4 = Vf("Failed to insert bibliography");
                    "string" == typeof t7 && (e4 += ". " + Vf(t7)), b2(e4);
                  }).finally(function() {
                    w2(false, "Zotero (" + Vf("Inserting bibliography") + ")"), i2 && r2.moveCursorOutsideField(i2);
                  });
                case 5:
                  return t6.a(2);
              }
            }, t5);
          }));
          return function(e3) {
            return t4.apply(this, arguments);
          };
        })()), c2.subscribe((function() {
          var t4 = i(m().m(function t5(e3) {
            var o3, a3, c3;
            return m().w(function(t6) {
              for (; ; ) switch (t6.n) {
                case 0:
                  if ("button:click" === e3.type) {
                    t6.n = 1;
                    break;
                  }
                  return t6.a(2);
                case 1:
                  if (n2.getLastUsedStyleId()) {
                    t6.n = 2;
                    break;
                  }
                  return b2(Vf("Style is not selected")), t6.a(2);
                case 2:
                  if (n2.getLocale()) {
                    t6.n = 3;
                    break;
                  }
                  return b2(Vf("Language is not selected")), t6.a(2);
                case 3:
                  return t6.n = 4, g2(true, "Zotero (" + Vf("Inserting citation") + ")");
                case 4:
                  return o3 = s2.getSelectedItems(), a3 = null, c3 = false, t6.a(2, r2.insertSelectedCitations(o3).then(function(t7) {
                    return c3 = t7, s2.removeItems(Object.keys(o3)), r2.getCurrentField();
                  }).then(function(t7) {
                    return a3 = t7, r2.updateCslItems();
                  }).catch(function(t7) {
                    console.error(t7);
                    var e4 = Vf("Failed to insert citation");
                    "string" == typeof t7 && (e4 += ". " + Vf(t7)), b2(e4);
                  }).finally(i(m().m(function t7() {
                    return m().w(function(t8) {
                      for (; ; ) switch (t8.n) {
                        case 0:
                          if (w2(false, "Zotero (" + Vf("Inserting citation") + ")"), !c3) {
                            t8.n = 2;
                            break;
                          }
                          return t8.n = 1, r2.moveCursorRight();
                        case 1:
                          t8.n = 3;
                          break;
                        case 2:
                          if (!a3) {
                            t8.n = 3;
                            break;
                          }
                          return t8.n = 3, r2.moveCursorOutsideField(a3.FieldId);
                        case 3:
                          return t8.a(2);
                      }
                    }, t7);
                  }))));
              }
            }, t5);
          }));
          return function(e3) {
            return t4.apply(this, arguments);
          };
        })()), u2.subscribe(function(t4) {
          "button:click" === t4.type && n2.show();
        }), a2.subscribe((function() {
          var t4 = i(m().m(function t5(e3) {
            return m().w(function(t6) {
              for (; ; ) switch (t6.n) {
                case 0:
                  if ("button:click" === e3.type) {
                    t6.n = 1;
                    break;
                  }
                  return t6.a(2);
                case 1:
                  return t6.n = 2, g2(false, "Zotero (" + Vf("Saving as text") + ")");
                case 2:
                  r2.saveAsText().then(function() {
                    w2(false, "Zotero (" + Vf("Saving as text") + ")");
                  });
                case 3:
                  return t6.a(2);
              }
            }, t5);
          }));
          return function(e3) {
            return t4.apply(this, arguments);
          };
        })()), n2.onChangeState((function() {
          var t4 = i(m().m(function t5(e3, n3) {
            var i2;
            return m().w(function(t6) {
              for (; ; ) switch (t6.n) {
                case 0:
                  return t6.n = 1, g2(true, "Zotero (" + Vf("Updating citations") + ")");
                case 1:
                  i2 = r2.updateCslItems.bind(r2, true), [e3.styleFormat, n3.styleFormat].includes("note") && (i2 = e3.styleFormat !== n3.styleFormat ? "note" === e3.styleFormat ? r2.switchingBetweenNotesAndText.bind(r2, e3.notesStyle) : r2.switchingBetweenNotesAndText.bind(r2) : e3.notesStyle !== n3.notesStyle ? r2.convertNotesStyle.bind(r2, e3.notesStyle) : r2.updateCslItems.bind(r2, true)), i2().catch(function(t7) {
                    console.error(t7);
                    var e4 = Vf("Failed to refresh");
                    "string" == typeof t7 && (e4 += ". " + Vf(t7)), b2(e4);
                  }).finally(function() {
                    w2(false, "Zotero (" + Vf("Updating citations") + ")");
                  });
                case 2:
                  return t6.a(2);
              }
            }, t5);
          }));
          return function(e3, n3) {
            return t4.apply(this, arguments);
          };
        })());
      })(), y3.init().onOpen(function() {
        Uf.hide();
      }).onChangeState(function(t3) {
        n2.setDesktopApiAvailable(t3.desktop), n2.setRestApiAvailable(t3.online);
      }).onAuthorized(function(t3) {
        if (!S3) {
          S3 = true, Uf.show();
          var i2 = e2.getUserGroups().then(function(t4) {
            return o2.addGroups(t4), t4;
          }).catch(function(t4) {
            console.error(t4), b2(Vf("An error occurred while loading library groups. Try restarting the plugin."));
          }), r3 = n2.init().catch(function(t4) {
            console.error(t4), b2(Vf("An error occurred while loading settings. Try restarting the plugin.")), n2.show();
          });
          Promise.all([i2, r3]).then(function() {
            return Uf.hide(), p2.show(), A2(e2.getItems(null).then(function(t4) {
              return delete t4.next, t4;
            }), false).then(function(t4) {
              O2(t4 > 0 ? "started" : "empty");
            }).catch(function(t4) {
              console.error(t4);
            }).finally(function() {
              p2.hide();
            });
          }).finally(function() {
            Uf.hide();
          });
        }
      }), window.Asc.plugin.onTranslate = _2, (function() {
        return I2.apply(this, arguments);
      })().then(function(t3) {
        var e3;
        window.Asc.scope.editorVersion = t3, (e3 = new Asc.ButtonContextMenu()).text = "Edit citation", e3.addCheckers("Target", "Selection"), e3.attachOnClick(i(m().m(function t4() {
          var e4, i2, o3, s3;
          return m().w(function(t5) {
            for (; ; ) switch (t5.n) {
              case 0:
                return t5.n = 1, new Promise(function(t6) {
                  window.Asc.plugin.executeMethod("GetCurrentAddinField", void 0, t6);
                });
              case 1:
                if ((e4 = t5.v) && e4.Value && -1 !== e4.Value.toLowerCase().indexOf("zotero_item")) {
                  t5.n = 2;
                  break;
                }
                return t5.a(2);
              case 2:
                return t5.n = 3, r2.showEditCitationWindow(e4);
              case 3:
                if (i2 = t5.v) {
                  t5.n = 4;
                  break;
                }
                return t5.a(2);
              case 4:
                return t5.n = 5, g2(false, "Zotero (" + Vf("Updating citations") + ")");
              case 5:
                o3 = r2.updateItem.bind(r2, i2), "note" === (s3 = n2.getStyleManager()).getLastUsedFormat() && (o3 = r2.updateItem.bind(r2, i2, s3.getLastUsedNotesStyle())), o3().catch(function(t6) {
                  console.error(t6);
                  var e5 = Vf("Failed to insert citation");
                  "string" == typeof t6 && (e5 += ". " + Vf(t6)), b2(e5);
                }).finally(function() {
                  w2(false, "Zotero (" + Vf("Updating citations") + ")"), e4 && r2.moveCursorOutsideField(e4.FieldId);
                });
              case 6:
                return t5.a(2);
            }
          }, t4);
        }))), Asc.Buttons.registerContextMenu();
      }).catch(function(t3) {
        console.error(t3);
      });
    }, Asc.plugin.onThemeChanged = function(t3) {
      window.Asc.plugin.onThemeChangedBase(t3), Mc(t3), jc(t3);
      var e3 = "";
      e3 += ".link, .link:visited, .link:hover { color : " + window.Asc.plugin.theme["text-normal"] + " !important;}\n", e3 += ".doc { border-color: " + t3["border-regular-control"] + "; background-color: " + t3["background-normal"] + "; }\n", e3 += ".scrollThumb { box-shadow: 0 0 8px 8px " + t3["highlight-button-hover"] + " inset; }\n", e3 += ".scrollThumb:active, .scrollThumb.scrolling { box-shadow: 0 0 8px 8px " + t3["canvas-scroll-thumb-pressed"] + " inset; }\n", e3 += ".scrollThumb:hover { box-shadow: 0 0 8px 8px " + t3["canvas-scroll-thumb-hover"] + " inset; }\n", -1 === ["theme-white", "theme-night"].indexOf(t3.name) && -1 === ["theme-white", "theme-night"].indexOf(t3.Name) || (e3 += ".doc { border-radius: 4px; }\n");
      var n3 = document.getElementById("pluginStyles");
      n3 ? n3.innerHTML = e3 : ((n3 = document.createElement("style")).id = "pluginStyles", n3.innerHTML = e3, document.getElementsByTagName("head")[0].appendChild(n3));
      var i2 = t3.type || "light", r3 = document.body;
      r3.classList.remove("theme-dark"), r3.classList.remove("theme-light"), r3.classList.add("theme-" + i2);
    };
  })();
});
//# sourceMappingURL=bundle.es5.js.map
