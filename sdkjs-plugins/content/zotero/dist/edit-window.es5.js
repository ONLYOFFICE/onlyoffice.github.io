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
  function n(t2, e2) {
    if (!(t2 instanceof e2)) throw new TypeError("Cannot call a class as a function");
  }
  function i(t2, e2) {
    (function(t3, e3) {
      if (e3.has(t3)) throw new TypeError("Cannot initialize the same private elements twice on an object");
    })(t2, e2), e2.add(t2);
  }
  function r(t2, e2, n2) {
    return e2 && (function(t3, e3) {
      for (var n3 = 0; n3 < e3.length; n3++) {
        var i2 = e3[n3];
        i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(t3, s(i2.key), i2);
      }
    })(t2.prototype, e2), Object.defineProperty(t2, "prototype", { writable: false }), t2;
  }
  function o(e2, n2) {
    var i2 = "undefined" != typeof Symbol && e2[Symbol.iterator] || e2["@@iterator"];
    if (!i2) {
      if (Array.isArray(e2) || (i2 = (function(e3, n3) {
        if (e3) {
          if ("string" == typeof e3) return t(e3, n3);
          var i3 = {}.toString.call(e3).slice(8, -1);
          return "Object" === i3 && e3.constructor && (i3 = e3.constructor.name), "Map" === i3 || "Set" === i3 ? Array.from(e3) : "Arguments" === i3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i3) ? t(e3, n3) : void 0;
        }
      })(e2)) || n2) {
        i2 && (e2 = i2);
        var r2 = 0, o2 = function() {
        };
        return { s: o2, n: function() {
          return r2 >= e2.length ? { done: true } : { done: false, value: e2[r2++] };
        }, e: function(t2) {
          throw t2;
        }, f: o2 };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var s2, a2 = true, u2 = false;
    return { s: function() {
      i2 = i2.call(e2);
    }, n: function() {
      var t2 = i2.next();
      return a2 = t2.done, t2;
    }, e: function(t2) {
      u2 = true, s2 = t2;
    }, f: function() {
      try {
        a2 || null == i2.return || i2.return();
      } finally {
        if (u2) throw s2;
      }
    } };
  }
  function s(t2) {
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
  var a, u, c = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, l = {};
  function h() {
    if (u) return a;
    u = 1;
    var t2 = function(t3) {
      return t3 && t3.Math === Math && t3;
    };
    return a = t2("object" == typeof globalThis && globalThis) || t2("object" == typeof window && window) || t2("object" == typeof self && self) || t2("object" == typeof c && c) || t2("object" == typeof a && a) || /* @__PURE__ */ (function() {
      return this;
    })() || Function("return this")();
  }
  var d, f, p, v, b, m, _, g, y = {};
  function x() {
    return f ? d : (f = 1, d = function(t2) {
      try {
        return !!t2();
      } catch (t3) {
        return true;
      }
    });
  }
  function E() {
    if (v) return p;
    v = 1;
    var t2 = x();
    return p = !t2(function() {
      return 7 !== Object.defineProperty({}, 1, { get: function() {
        return 7;
      } })[1];
    });
  }
  function w() {
    if (m) return b;
    m = 1;
    var t2 = x();
    return b = !t2(function() {
      var t3 = (function() {
      }).bind();
      return "function" != typeof t3 || t3.hasOwnProperty("prototype");
    });
  }
  function k() {
    if (g) return _;
    g = 1;
    var t2 = w(), e2 = Function.prototype.call;
    return _ = t2 ? e2.bind(e2) : function() {
      return e2.apply(e2, arguments);
    }, _;
  }
  var C, S, L, O, I, N, A, T, j, M, H, P, V, R, F, B, D, z, U, G, q, W, K, $, J, Y, X, Z, Q, tt, et, nt, it, rt, ot, st, at, ut, ct, lt, ht, dt = {};
  function ft() {
    if (C) return dt;
    C = 1;
    var t2 = {}.propertyIsEnumerable, e2 = Object.getOwnPropertyDescriptor, n2 = e2 && !t2.call({ 1: 2 }, 1);
    return dt.f = n2 ? function(t3) {
      var n3 = e2(this, t3);
      return !!n3 && n3.enumerable;
    } : t2, dt;
  }
  function pt() {
    return L ? S : (L = 1, S = function(t2, e2) {
      return { enumerable: !(1 & t2), configurable: !(2 & t2), writable: !(4 & t2), value: e2 };
    });
  }
  function vt() {
    if (I) return O;
    I = 1;
    var t2 = w(), e2 = Function.prototype, n2 = e2.call, i2 = t2 && e2.bind.bind(n2, n2);
    return O = t2 ? i2 : function(t3) {
      return function() {
        return n2.apply(t3, arguments);
      };
    }, O;
  }
  function bt() {
    if (A) return N;
    A = 1;
    var t2 = vt(), e2 = t2({}.toString), n2 = t2("".slice);
    return N = function(t3) {
      return n2(e2(t3), 8, -1);
    };
  }
  function mt() {
    if (j) return T;
    j = 1;
    var t2 = vt(), e2 = x(), n2 = bt(), i2 = Object, r2 = t2("".split);
    return T = e2(function() {
      return !i2("z").propertyIsEnumerable(0);
    }) ? function(t3) {
      return "String" === n2(t3) ? r2(t3, "") : i2(t3);
    } : i2;
  }
  function _t() {
    return H ? M : (H = 1, M = function(t2) {
      return null == t2;
    });
  }
  function gt() {
    if (V) return P;
    V = 1;
    var t2 = _t(), e2 = TypeError;
    return P = function(n2) {
      if (t2(n2)) throw new e2("Can't call method on " + n2);
      return n2;
    };
  }
  function yt() {
    if (F) return R;
    F = 1;
    var t2 = mt(), e2 = gt();
    return R = function(n2) {
      return t2(e2(n2));
    };
  }
  function xt() {
    if (D) return B;
    D = 1;
    var t2 = "object" == typeof document && document.all;
    return B = void 0 === t2 && void 0 !== t2 ? function(e2) {
      return "function" == typeof e2 || e2 === t2;
    } : function(t3) {
      return "function" == typeof t3;
    };
  }
  function Et() {
    if (U) return z;
    U = 1;
    var t2 = xt();
    return z = function(e2) {
      return "object" == typeof e2 ? null !== e2 : t2(e2);
    };
  }
  function wt() {
    if (q) return G;
    q = 1;
    var t2 = h(), e2 = xt();
    return G = function(n2, i2) {
      return arguments.length < 2 ? (r2 = t2[n2], e2(r2) ? r2 : void 0) : t2[n2] && t2[n2][i2];
      var r2;
    }, G;
  }
  function kt() {
    if (K) return W;
    K = 1;
    var t2 = vt();
    return W = t2({}.isPrototypeOf);
  }
  function Ct() {
    if (J) return $;
    J = 1;
    var t2 = h().navigator, e2 = t2 && t2.userAgent;
    return $ = e2 ? String(e2) : "";
  }
  function St() {
    if (X) return Y;
    X = 1;
    var t2, e2, n2 = h(), i2 = Ct(), r2 = n2.process, o2 = n2.Deno, s2 = r2 && r2.versions || o2 && o2.version, a2 = s2 && s2.v8;
    return a2 && (e2 = (t2 = a2.split("."))[0] > 0 && t2[0] < 4 ? 1 : +(t2[0] + t2[1])), !e2 && i2 && (!(t2 = i2.match(/Edge\/(\d+)/)) || t2[1] >= 74) && (t2 = i2.match(/Chrome\/(\d+)/)) && (e2 = +t2[1]), Y = e2;
  }
  function Lt() {
    if (Q) return Z;
    Q = 1;
    var t2 = St(), e2 = x(), n2 = h().String;
    return Z = !!Object.getOwnPropertySymbols && !e2(function() {
      var e3 = Symbol("symbol detection");
      return !n2(e3) || !(Object(e3) instanceof Symbol) || !Symbol.sham && t2 && t2 < 41;
    });
  }
  function Ot() {
    if (et) return tt;
    et = 1;
    var t2 = Lt();
    return tt = t2 && !Symbol.sham && "symbol" == typeof Symbol.iterator;
  }
  function It() {
    if (it) return nt;
    it = 1;
    var t2 = wt(), e2 = xt(), n2 = kt(), i2 = Ot(), r2 = Object;
    return nt = i2 ? function(t3) {
      return "symbol" == typeof t3;
    } : function(i3) {
      var o2 = t2("Symbol");
      return e2(o2) && n2(o2.prototype, r2(i3));
    };
  }
  function Nt() {
    if (ot) return rt;
    ot = 1;
    var t2 = String;
    return rt = function(e2) {
      try {
        return t2(e2);
      } catch (t3) {
        return "Object";
      }
    };
  }
  function At() {
    if (at) return st;
    at = 1;
    var t2 = xt(), e2 = Nt(), n2 = TypeError;
    return st = function(i2) {
      if (t2(i2)) return i2;
      throw new n2(e2(i2) + " is not a function");
    };
  }
  function Tt() {
    if (ct) return ut;
    ct = 1;
    var t2 = At(), e2 = _t();
    return ut = function(n2, i2) {
      var r2 = n2[i2];
      return e2(r2) ? void 0 : t2(r2);
    };
  }
  function jt() {
    if (ht) return lt;
    ht = 1;
    var t2 = k(), e2 = xt(), n2 = Et(), i2 = TypeError;
    return lt = function(r2, o2) {
      var s2, a2;
      if ("string" === o2 && e2(s2 = r2.toString) && !n2(a2 = t2(s2, r2))) return a2;
      if (e2(s2 = r2.valueOf) && !n2(a2 = t2(s2, r2))) return a2;
      if ("string" !== o2 && e2(s2 = r2.toString) && !n2(a2 = t2(s2, r2))) return a2;
      throw new i2("Can't convert object to primitive value");
    };
  }
  var Mt, Ht, Pt, Vt, Rt, Ft, Bt, Dt, zt, Ut, Gt, qt, Wt, Kt, $t, Jt, Yt, Xt, Zt, Qt, te, ee, ne, ie, re = { exports: {} };
  function oe() {
    return Ht ? Mt : (Ht = 1, Mt = false);
  }
  function se() {
    if (Vt) return Pt;
    Vt = 1;
    var t2 = h(), e2 = Object.defineProperty;
    return Pt = function(n2, i2) {
      try {
        e2(t2, n2, { value: i2, configurable: true, writable: true });
      } catch (e3) {
        t2[n2] = i2;
      }
      return i2;
    };
  }
  function ae() {
    if (Rt) return re.exports;
    Rt = 1;
    var t2 = oe(), e2 = h(), n2 = se(), i2 = "__core-js_shared__", r2 = re.exports = e2[i2] || n2(i2, {});
    return (r2.versions || (r2.versions = [])).push({ version: "3.47.0", mode: t2 ? "pure" : "global", copyright: "© 2014-2025 Denis Pushkarev (zloirock.ru), 2025 CoreJS Company (core-js.io)", license: "https://github.com/zloirock/core-js/blob/v3.47.0/LICENSE", source: "https://github.com/zloirock/core-js" }), re.exports;
  }
  function ue() {
    if (Bt) return Ft;
    Bt = 1;
    var t2 = ae();
    return Ft = function(e2, n2) {
      return t2[e2] || (t2[e2] = n2 || {});
    };
  }
  function ce() {
    if (zt) return Dt;
    zt = 1;
    var t2 = gt(), e2 = Object;
    return Dt = function(n2) {
      return e2(t2(n2));
    };
  }
  function le() {
    if (Gt) return Ut;
    Gt = 1;
    var t2 = vt(), e2 = ce(), n2 = t2({}.hasOwnProperty);
    return Ut = Object.hasOwn || function(t3, i2) {
      return n2(e2(t3), i2);
    };
  }
  function he() {
    if (Wt) return qt;
    Wt = 1;
    var t2 = vt(), e2 = 0, n2 = Math.random(), i2 = t2(1.1.toString);
    return qt = function(t3) {
      return "Symbol(" + (void 0 === t3 ? "" : t3) + ")_" + i2(++e2 + n2, 36);
    };
  }
  function de() {
    if ($t) return Kt;
    $t = 1;
    var t2 = h(), e2 = ue(), n2 = le(), i2 = he(), r2 = Lt(), o2 = Ot(), s2 = t2.Symbol, a2 = e2("wks"), u2 = o2 ? s2.for || s2 : s2 && s2.withoutSetter || i2;
    return Kt = function(t3) {
      return n2(a2, t3) || (a2[t3] = r2 && n2(s2, t3) ? s2[t3] : u2("Symbol." + t3)), a2[t3];
    };
  }
  function fe() {
    if (Yt) return Jt;
    Yt = 1;
    var t2 = k(), e2 = Et(), n2 = It(), i2 = Tt(), r2 = jt(), o2 = de(), s2 = TypeError, a2 = o2("toPrimitive");
    return Jt = function(o3, u2) {
      if (!e2(o3) || n2(o3)) return o3;
      var c2, l2 = i2(o3, a2);
      if (l2) {
        if (void 0 === u2 && (u2 = "default"), c2 = t2(l2, o3, u2), !e2(c2) || n2(c2)) return c2;
        throw new s2("Can't convert object to primitive value");
      }
      return void 0 === u2 && (u2 = "number"), r2(o3, u2);
    };
  }
  function pe() {
    if (Zt) return Xt;
    Zt = 1;
    var t2 = fe(), e2 = It();
    return Xt = function(n2) {
      var i2 = t2(n2, "string");
      return e2(i2) ? i2 : i2 + "";
    };
  }
  function ve() {
    if (te) return Qt;
    te = 1;
    var t2 = h(), e2 = Et(), n2 = t2.document, i2 = e2(n2) && e2(n2.createElement);
    return Qt = function(t3) {
      return i2 ? n2.createElement(t3) : {};
    };
  }
  function be() {
    if (ne) return ee;
    ne = 1;
    var t2 = E(), e2 = x(), n2 = ve();
    return ee = !t2 && !e2(function() {
      return 7 !== Object.defineProperty(n2("div"), "a", { get: function() {
        return 7;
      } }).a;
    });
  }
  function me() {
    if (ie) return y;
    ie = 1;
    var t2 = E(), e2 = k(), n2 = ft(), i2 = pt(), r2 = yt(), o2 = pe(), s2 = le(), a2 = be(), u2 = Object.getOwnPropertyDescriptor;
    return y.f = t2 ? u2 : function(t3, c2) {
      if (t3 = r2(t3), c2 = o2(c2), a2) try {
        return u2(t3, c2);
      } catch (t4) {
      }
      if (s2(t3, c2)) return i2(!e2(n2.f, t3, c2), t3[c2]);
    }, y;
  }
  var _e, ge, ye, xe, Ee, we, ke, Ce = {};
  function Se() {
    if (ge) return _e;
    ge = 1;
    var t2 = E(), e2 = x();
    return _e = t2 && e2(function() {
      return 42 !== Object.defineProperty(function() {
      }, "prototype", { value: 42, writable: false }).prototype;
    });
  }
  function Le() {
    if (xe) return ye;
    xe = 1;
    var t2 = Et(), e2 = String, n2 = TypeError;
    return ye = function(i2) {
      if (t2(i2)) return i2;
      throw new n2(e2(i2) + " is not an object");
    };
  }
  function Oe() {
    if (Ee) return Ce;
    Ee = 1;
    var t2 = E(), e2 = be(), n2 = Se(), i2 = Le(), r2 = pe(), o2 = TypeError, s2 = Object.defineProperty, a2 = Object.getOwnPropertyDescriptor, u2 = "enumerable", c2 = "configurable", l2 = "writable";
    return Ce.f = t2 ? n2 ? function(t3, e3, n3) {
      if (i2(t3), e3 = r2(e3), i2(n3), "function" == typeof t3 && "prototype" === e3 && "value" in n3 && l2 in n3 && !n3[l2]) {
        var o3 = a2(t3, e3);
        o3 && o3[l2] && (t3[e3] = n3.value, n3 = { configurable: c2 in n3 ? n3[c2] : o3[c2], enumerable: u2 in n3 ? n3[u2] : o3[u2], writable: false });
      }
      return s2(t3, e3, n3);
    } : s2 : function(t3, n3, a3) {
      if (i2(t3), n3 = r2(n3), i2(a3), e2) try {
        return s2(t3, n3, a3);
      } catch (t4) {
      }
      if ("get" in a3 || "set" in a3) throw new o2("Accessors not supported");
      return "value" in a3 && (t3[n3] = a3.value), t3;
    }, Ce;
  }
  function Ie() {
    if (ke) return we;
    ke = 1;
    var t2 = E(), e2 = Oe(), n2 = pt();
    return we = t2 ? function(t3, i2, r2) {
      return e2.f(t3, i2, n2(1, r2));
    } : function(t3, e3, n3) {
      return t3[e3] = n3, t3;
    };
  }
  var Ne, Ae, Te, je, Me, He, Pe, Ve, Re, Fe, Be, De, ze, Ue, Ge, qe = { exports: {} };
  function We() {
    if (Ae) return Ne;
    Ae = 1;
    var t2 = E(), e2 = le(), n2 = Function.prototype, i2 = t2 && Object.getOwnPropertyDescriptor, r2 = e2(n2, "name"), o2 = r2 && "something" === (function() {
    }).name, s2 = r2 && (!t2 || t2 && i2(n2, "name").configurable);
    return Ne = { EXISTS: r2, PROPER: o2, CONFIGURABLE: s2 };
  }
  function Ke() {
    if (je) return Te;
    je = 1;
    var t2 = vt(), e2 = xt(), n2 = ae(), i2 = t2(Function.toString);
    return e2(n2.inspectSource) || (n2.inspectSource = function(t3) {
      return i2(t3);
    }), Te = n2.inspectSource;
  }
  function $e() {
    if (He) return Me;
    He = 1;
    var t2 = h(), e2 = xt(), n2 = t2.WeakMap;
    return Me = e2(n2) && /native code/.test(String(n2));
  }
  function Je() {
    if (Ve) return Pe;
    Ve = 1;
    var t2 = ue(), e2 = he(), n2 = t2("keys");
    return Pe = function(t3) {
      return n2[t3] || (n2[t3] = e2(t3));
    };
  }
  function Ye() {
    return Fe ? Re : (Fe = 1, Re = {});
  }
  function Xe() {
    if (De) return Be;
    De = 1;
    var t2, e2, n2, i2 = $e(), r2 = h(), o2 = Et(), s2 = Ie(), a2 = le(), u2 = ae(), c2 = Je(), l2 = Ye(), d2 = "Object already initialized", f2 = r2.TypeError, p2 = r2.WeakMap;
    if (i2 || u2.state) {
      var v2 = u2.state || (u2.state = new p2());
      v2.get = v2.get, v2.has = v2.has, v2.set = v2.set, t2 = function(t3, e3) {
        if (v2.has(t3)) throw new f2(d2);
        return e3.facade = t3, v2.set(t3, e3), e3;
      }, e2 = function(t3) {
        return v2.get(t3) || {};
      }, n2 = function(t3) {
        return v2.has(t3);
      };
    } else {
      var b2 = c2("state");
      l2[b2] = true, t2 = function(t3, e3) {
        if (a2(t3, b2)) throw new f2(d2);
        return e3.facade = t3, s2(t3, b2, e3), e3;
      }, e2 = function(t3) {
        return a2(t3, b2) ? t3[b2] : {};
      }, n2 = function(t3) {
        return a2(t3, b2);
      };
    }
    return Be = { set: t2, get: e2, has: n2, enforce: function(i3) {
      return n2(i3) ? e2(i3) : t2(i3, {});
    }, getterFor: function(t3) {
      return function(n3) {
        var i3;
        if (!o2(n3) || (i3 = e2(n3)).type !== t3) throw new f2("Incompatible receiver, " + t3 + " required");
        return i3;
      };
    } };
  }
  function Ze() {
    if (ze) return qe.exports;
    ze = 1;
    var t2 = vt(), e2 = x(), n2 = xt(), i2 = le(), r2 = E(), o2 = We().CONFIGURABLE, s2 = Ke(), a2 = Xe(), u2 = a2.enforce, c2 = a2.get, l2 = String, h2 = Object.defineProperty, d2 = t2("".slice), f2 = t2("".replace), p2 = t2([].join), v2 = r2 && !e2(function() {
      return 8 !== h2(function() {
      }, "length", { value: 8 }).length;
    }), b2 = String(String).split("String"), m2 = qe.exports = function(t3, e3, n3) {
      "Symbol(" === d2(l2(e3), 0, 7) && (e3 = "[" + f2(l2(e3), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), n3 && n3.getter && (e3 = "get " + e3), n3 && n3.setter && (e3 = "set " + e3), (!i2(t3, "name") || o2 && t3.name !== e3) && (r2 ? h2(t3, "name", { value: e3, configurable: true }) : t3.name = e3), v2 && n3 && i2(n3, "arity") && t3.length !== n3.arity && h2(t3, "length", { value: n3.arity });
      try {
        n3 && i2(n3, "constructor") && n3.constructor ? r2 && h2(t3, "prototype", { writable: false }) : t3.prototype && (t3.prototype = void 0);
      } catch (t4) {
      }
      var s3 = u2(t3);
      return i2(s3, "source") || (s3.source = p2(b2, "string" == typeof e3 ? e3 : "")), t3;
    };
    return Function.prototype.toString = m2(function() {
      return n2(this) && c2(this).source || s2(this);
    }, "toString"), qe.exports;
  }
  function Qe() {
    if (Ge) return Ue;
    Ge = 1;
    var t2 = xt(), e2 = Oe(), n2 = Ze(), i2 = se();
    return Ue = function(r2, o2, s2, a2) {
      a2 || (a2 = {});
      var u2 = a2.enumerable, c2 = void 0 !== a2.name ? a2.name : o2;
      if (t2(s2) && n2(s2, c2, a2), a2.global) u2 ? r2[o2] = s2 : i2(o2, s2);
      else {
        try {
          a2.unsafe ? r2[o2] && (u2 = true) : delete r2[o2];
        } catch (t3) {
        }
        u2 ? r2[o2] = s2 : e2.f(r2, o2, { value: s2, enumerable: false, configurable: !a2.nonConfigurable, writable: !a2.nonWritable });
      }
      return r2;
    };
  }
  var tn, en, nn, rn, on, sn, an, un, cn, ln, hn, dn, fn, pn, vn, bn, mn, _n = {};
  function gn() {
    if (rn) return nn;
    rn = 1;
    var t2 = (function() {
      if (en) return tn;
      en = 1;
      var t3 = Math.ceil, e2 = Math.floor;
      return tn = Math.trunc || function(n2) {
        var i2 = +n2;
        return (i2 > 0 ? e2 : t3)(i2);
      };
    })();
    return nn = function(e2) {
      var n2 = +e2;
      return n2 != n2 || 0 === n2 ? 0 : t2(n2);
    };
  }
  function yn() {
    if (sn) return on;
    sn = 1;
    var t2 = gn(), e2 = Math.max, n2 = Math.min;
    return on = function(i2, r2) {
      var o2 = t2(i2);
      return o2 < 0 ? e2(o2 + r2, 0) : n2(o2, r2);
    };
  }
  function xn() {
    if (un) return an;
    un = 1;
    var t2 = gn(), e2 = Math.min;
    return an = function(n2) {
      var i2 = t2(n2);
      return i2 > 0 ? e2(i2, 9007199254740991) : 0;
    };
  }
  function En() {
    if (ln) return cn;
    ln = 1;
    var t2 = xn();
    return cn = function(e2) {
      return t2(e2.length);
    };
  }
  function wn() {
    if (pn) return fn;
    pn = 1;
    var t2 = vt(), e2 = le(), n2 = yt(), i2 = (function() {
      if (dn) return hn;
      dn = 1;
      var t3 = yt(), e3 = yn(), n3 = En(), i3 = function(i4) {
        return function(r3, o3, s2) {
          var a2 = t3(r3), u2 = n3(a2);
          if (0 === u2) return !i4 && -1;
          var c2, l2 = e3(s2, u2);
          if (i4 && o3 != o3) {
            for (; u2 > l2; ) if ((c2 = a2[l2++]) != c2) return true;
          } else for (; u2 > l2; l2++) if ((i4 || l2 in a2) && a2[l2] === o3) return i4 || l2 || 0;
          return !i4 && -1;
        };
      };
      return hn = { includes: i3(true), indexOf: i3(false) };
    })().indexOf, r2 = Ye(), o2 = t2([].push);
    return fn = function(t3, s2) {
      var a2, u2 = n2(t3), c2 = 0, l2 = [];
      for (a2 in u2) !e2(r2, a2) && e2(u2, a2) && o2(l2, a2);
      for (; s2.length > c2; ) e2(u2, a2 = s2[c2++]) && (~i2(l2, a2) || o2(l2, a2));
      return l2;
    };
  }
  function kn() {
    return bn ? vn : (bn = 1, vn = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]);
  }
  function Cn() {
    if (mn) return _n;
    mn = 1;
    var t2 = wn(), e2 = kn().concat("length", "prototype");
    return _n.f = Object.getOwnPropertyNames || function(n2) {
      return t2(n2, e2);
    }, _n;
  }
  var Sn, Ln, On, In, Nn, An, Tn, jn, Mn, Hn, Pn, Vn, Rn, Fn, Bn, Dn, zn, Un, Gn, qn, Wn, Kn, $n, Jn, Yn, Xn, Zn, Qn, ti, ei, ni = {};
  function ii() {
    return Sn || (Sn = 1, ni.f = Object.getOwnPropertySymbols), ni;
  }
  function ri() {
    if (On) return Ln;
    On = 1;
    var t2 = wt(), e2 = vt(), n2 = Cn(), i2 = ii(), r2 = Le(), o2 = e2([].concat);
    return Ln = t2("Reflect", "ownKeys") || function(t3) {
      var e3 = n2.f(r2(t3)), s2 = i2.f;
      return s2 ? o2(e3, s2(t3)) : e3;
    };
  }
  function oi() {
    if (Nn) return In;
    Nn = 1;
    var t2 = le(), e2 = ri(), n2 = me(), i2 = Oe();
    return In = function(r2, o2, s2) {
      for (var a2 = e2(o2), u2 = i2.f, c2 = n2.f, l2 = 0; l2 < a2.length; l2++) {
        var h2 = a2[l2];
        t2(r2, h2) || s2 && t2(s2, h2) || u2(r2, h2, c2(o2, h2));
      }
    };
  }
  function si() {
    if (Tn) return An;
    Tn = 1;
    var t2 = x(), e2 = xt(), n2 = /#|\.prototype\./, i2 = function(n3, i3) {
      var u2 = o2[r2(n3)];
      return u2 === a2 || u2 !== s2 && (e2(i3) ? t2(i3) : !!i3);
    }, r2 = i2.normalize = function(t3) {
      return String(t3).replace(n2, ".").toLowerCase();
    }, o2 = i2.data = {}, s2 = i2.NATIVE = "N", a2 = i2.POLYFILL = "P";
    return An = i2;
  }
  function ai() {
    if (Mn) return jn;
    Mn = 1;
    var t2 = h(), e2 = me().f, n2 = Ie(), i2 = Qe(), r2 = se(), o2 = oi(), s2 = si();
    return jn = function(a2, u2) {
      var c2, l2, h2, d2, f2, p2 = a2.target, v2 = a2.global, b2 = a2.stat;
      if (c2 = v2 ? t2 : b2 ? t2[p2] || r2(p2, {}) : t2[p2] && t2[p2].prototype) for (l2 in u2) {
        if (d2 = u2[l2], h2 = a2.dontCallGetSet ? (f2 = e2(c2, l2)) && f2.value : c2[l2], !s2(v2 ? l2 : p2 + (b2 ? "." : "#") + l2, a2.forced) && void 0 !== h2) {
          if (typeof d2 == typeof h2) continue;
          o2(d2, h2);
        }
        (a2.sham || h2 && h2.sham) && n2(d2, "sham", true), i2(c2, l2, d2, a2);
      }
    };
  }
  function ui() {
    if (Rn) return Vn;
    Rn = 1;
    var t2 = (function() {
      if (Pn) return Hn;
      Pn = 1;
      var t3 = bt(), e3 = vt();
      return Hn = function(n3) {
        if ("Function" === t3(n3)) return e3(n3);
      };
    })(), e2 = At(), n2 = w(), i2 = t2(t2.bind);
    return Vn = function(t3, r2) {
      return e2(t3), void 0 === r2 ? t3 : n2 ? i2(t3, r2) : function() {
        return t3.apply(r2, arguments);
      };
    }, Vn;
  }
  function ci() {
    if (Bn) return Fn;
    Bn = 1;
    var t2 = bt();
    return Fn = Array.isArray || function(e2) {
      return "Array" === t2(e2);
    };
  }
  function li() {
    if (zn) return Dn;
    zn = 1;
    var t2 = {};
    return t2[de()("toStringTag")] = "z", Dn = "[object z]" === String(t2);
  }
  function hi() {
    if (Gn) return Un;
    Gn = 1;
    var t2 = li(), e2 = xt(), n2 = bt(), i2 = de()("toStringTag"), r2 = Object, o2 = "Arguments" === n2(/* @__PURE__ */ (function() {
      return arguments;
    })());
    return Un = t2 ? n2 : function(t3) {
      var s2, a2, u2;
      return void 0 === t3 ? "Undefined" : null === t3 ? "Null" : "string" == typeof (a2 = (function(t4, e3) {
        try {
          return t4[e3];
        } catch (t5) {
        }
      })(s2 = r2(t3), i2)) ? a2 : o2 ? n2(s2) : "Object" === (u2 = n2(s2)) && e2(s2.callee) ? "Arguments" : u2;
    };
  }
  function di() {
    if (Wn) return qn;
    Wn = 1;
    var t2 = vt(), e2 = x(), n2 = xt(), i2 = hi(), r2 = wt(), o2 = Ke(), s2 = function() {
    }, a2 = r2("Reflect", "construct"), u2 = /^\s*(?:class|function)\b/, c2 = t2(u2.exec), l2 = !u2.test(s2), h2 = function(t3) {
      if (!n2(t3)) return false;
      try {
        return a2(s2, [], t3), true;
      } catch (t4) {
        return false;
      }
    }, d2 = function(t3) {
      if (!n2(t3)) return false;
      switch (i2(t3)) {
        case "AsyncFunction":
        case "GeneratorFunction":
        case "AsyncGeneratorFunction":
          return false;
      }
      try {
        return l2 || !!c2(u2, o2(t3));
      } catch (t4) {
        return true;
      }
    };
    return d2.sham = true, qn = !a2 || e2(function() {
      var t3;
      return h2(h2.call) || !h2(Object) || !h2(function() {
        t3 = true;
      }) || t3;
    }) ? d2 : h2;
  }
  function fi() {
    if ($n) return Kn;
    $n = 1;
    var t2 = ci(), e2 = di(), n2 = Et(), i2 = de()("species"), r2 = Array;
    return Kn = function(o2) {
      var s2;
      return t2(o2) && (s2 = o2.constructor, (e2(s2) && (s2 === r2 || t2(s2.prototype)) || n2(s2) && null === (s2 = s2[i2])) && (s2 = void 0)), void 0 === s2 ? r2 : s2;
    };
  }
  function pi() {
    if (Yn) return Jn;
    Yn = 1;
    var t2 = fi();
    return Jn = function(e2, n2) {
      return new (t2(e2))(0 === n2 ? 0 : n2);
    };
  }
  function vi() {
    if (Zn) return Xn;
    Zn = 1;
    var t2 = ui(), e2 = vt(), n2 = mt(), i2 = ce(), r2 = En(), o2 = pi(), s2 = e2([].push), a2 = function(e3) {
      var a3 = 1 === e3, u2 = 2 === e3, c2 = 3 === e3, l2 = 4 === e3, h2 = 6 === e3, d2 = 7 === e3, f2 = 5 === e3 || h2;
      return function(p2, v2, b2, m2) {
        for (var _2, g2, y2 = i2(p2), x2 = n2(y2), E2 = r2(x2), w2 = t2(v2, b2), k2 = 0, C2 = m2 || o2, S2 = a3 ? C2(p2, E2) : u2 || d2 ? C2(p2, 0) : void 0; E2 > k2; k2++) if ((f2 || k2 in x2) && (g2 = w2(_2 = x2[k2], k2, y2), e3)) if (a3) S2[k2] = g2;
        else if (g2) switch (e3) {
          case 3:
            return true;
          case 5:
            return _2;
          case 6:
            return k2;
          case 2:
            s2(S2, _2);
        }
        else switch (e3) {
          case 4:
            return false;
          case 7:
            s2(S2, _2);
        }
        return h2 ? -1 : c2 || l2 ? l2 : S2;
      };
    };
    return Xn = { forEach: a2(0), map: a2(1), filter: a2(2), some: a2(3), every: a2(4), find: a2(5), findIndex: a2(6), filterReject: a2(7) };
  }
  function bi() {
    if (ti) return Qn;
    ti = 1;
    var t2 = x(), e2 = de(), n2 = St(), i2 = e2("species");
    return Qn = function(e3) {
      return n2 >= 51 || !t2(function() {
        var t3 = [];
        return (t3.constructor = {})[i2] = function() {
          return { foo: 1 };
        }, 1 !== t3[e3](Boolean).foo;
      });
    };
  }
  !(function() {
    if (ei) return l;
    ei = 1;
    var t2 = ai(), e2 = vi().filter;
    t2({ target: "Array", proto: true, forced: !bi()("filter") }, { filter: function(t3) {
      return e2(this, t3, arguments.length > 1 ? arguments[1] : void 0);
    } });
  })();
  var mi, _i, gi, yi = {};
  !(function() {
    if (gi) return yi;
    gi = 1;
    var t2 = li(), e2 = Qe(), n2 = (function() {
      if (_i) return mi;
      _i = 1;
      var t3 = li(), e3 = hi();
      return mi = t3 ? {}.toString : function() {
        return "[object " + e3(this) + "]";
      };
    })();
    t2 || e2(Object.prototype, "toString", n2, { unsafe: true });
  })();
  var xi, Ei, wi, ki, Ci, Si, Li, Oi, Ii, Ni = {};
  function Ai() {
    return Ei ? xi : (Ei = 1, xi = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 });
  }
  function Ti() {
    if (ki) return wi;
    ki = 1;
    var t2 = ve()("span").classList, e2 = t2 && t2.constructor && t2.constructor.prototype;
    return wi = e2 === Object.prototype ? void 0 : e2;
  }
  function ji() {
    if (Si) return Ci;
    Si = 1;
    var t2 = x();
    return Ci = function(e2, n2) {
      var i2 = [][e2];
      return !!i2 && t2(function() {
        i2.call(null, n2 || function() {
          return 1;
        }, 1);
      });
    };
  }
  !(function() {
    if (Ii) return Ni;
    Ii = 1;
    var t2 = h(), e2 = Ai(), n2 = Ti(), i2 = (function() {
      if (Oi) return Li;
      Oi = 1;
      var t3 = vi().forEach, e3 = ji()("forEach");
      return Li = e3 ? [].forEach : function(e4) {
        return t3(this, e4, arguments.length > 1 ? arguments[1] : void 0);
      }, Li;
    })(), r2 = Ie(), o2 = function(t3) {
      if (t3 && t3.forEach !== i2) try {
        r2(t3, "forEach", i2);
      } catch (e3) {
        t3.forEach = i2;
      }
    };
    for (var s2 in e2) e2[s2] && o2(t2[s2] && t2[s2].prototype);
    o2(n2);
  })();
  var Mi, Hi = {};
  !(function() {
    if (Mi) return Hi;
    Mi = 1;
    var t2 = ai(), e2 = vt(), n2 = mt(), i2 = yt(), r2 = ji(), o2 = e2([].join);
    t2({ target: "Array", proto: true, forced: n2 !== Object || !r2("join", ",") }, { join: function(t3) {
      return o2(i2(this), void 0 === t3 ? "," : t3);
    } });
  })();
  var Pi, Vi, Ri, Fi, Bi, Di = {};
  function zi() {
    if (Vi) return Pi;
    Vi = 1;
    var t2 = E(), e2 = Oe(), n2 = pt();
    return Pi = function(i2, r2, o2) {
      t2 ? e2.f(i2, r2, n2(0, o2)) : i2[r2] = o2;
    };
  }
  function Ui() {
    if (Fi) return Ri;
    Fi = 1;
    var t2 = vt();
    return Ri = t2([].slice);
  }
  !(function() {
    if (Bi) return Di;
    Bi = 1;
    var t2 = ai(), e2 = ci(), n2 = di(), i2 = Et(), r2 = yn(), o2 = En(), s2 = yt(), a2 = zi(), u2 = de(), c2 = bi(), l2 = Ui(), h2 = c2("slice"), d2 = u2("species"), f2 = Array, p2 = Math.max;
    t2({ target: "Array", proto: true, forced: !h2 }, { slice: function(t3, u3) {
      var c3, h3, v2, b2 = s2(this), m2 = o2(b2), _2 = r2(t3, m2), g2 = r2(void 0 === u3 ? m2 : u3, m2);
      if (e2(b2) && (c3 = b2.constructor, (n2(c3) && (c3 === f2 || e2(c3.prototype)) || i2(c3) && null === (c3 = c3[d2])) && (c3 = void 0), c3 === f2 || void 0 === c3)) return l2(b2, _2, g2);
      for (h3 = new (void 0 === c3 ? f2 : c3)(p2(g2 - _2, 0)), v2 = 0; _2 < g2; _2++, v2++) _2 in b2 && a2(h3, v2, b2[_2]);
      return h3.length = v2, h3;
    } });
  })();
  var Gi, qi, Wi, Ki, $i, Ji, Yi, Xi, Zi, Qi, tr = {};
  function er() {
    if (Ki) return Wi;
    Ki = 1;
    var t2 = Et();
    return Wi = function(e2) {
      return t2(e2) || null === e2;
    };
  }
  function nr() {
    if (Ji) return $i;
    Ji = 1;
    var t2 = er(), e2 = String, n2 = TypeError;
    return $i = function(i2) {
      if (t2(i2)) return i2;
      throw new n2("Can't set " + e2(i2) + " as a prototype");
    };
  }
  function ir() {
    if (Xi) return Yi;
    Xi = 1;
    var t2 = (function() {
      if (qi) return Gi;
      qi = 1;
      var t3 = vt(), e3 = At();
      return Gi = function(n3, i3, r2) {
        try {
          return t3(e3(Object.getOwnPropertyDescriptor(n3, i3)[r2]));
        } catch (t4) {
        }
      };
    })(), e2 = Et(), n2 = gt(), i2 = nr();
    return Yi = Object.setPrototypeOf || ("__proto__" in {} ? (function() {
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
  function rr() {
    if (Qi) return Zi;
    Qi = 1;
    var t2 = xt(), e2 = Et(), n2 = ir();
    return Zi = function(i2, r2, o2) {
      var s2, a2;
      return n2 && t2(s2 = r2.constructor) && s2 !== o2 && e2(a2 = s2.prototype) && a2 !== o2.prototype && n2(i2, a2), i2;
    };
  }
  var or, sr, ar, ur, cr, lr, hr, dr, fr, pr, vr, br, mr, _r, gr, yr, xr, Er, wr, kr, Cr, Sr, Lr, Or, Ir, Nr, Ar, Tr, jr, Mr, Hr = {};
  function Pr() {
    if (sr) return or;
    sr = 1;
    var t2 = wn(), e2 = kn();
    return or = Object.keys || function(n2) {
      return t2(n2, e2);
    };
  }
  function Vr() {
    if (ar) return Hr;
    ar = 1;
    var t2 = E(), e2 = Se(), n2 = Oe(), i2 = Le(), r2 = yt(), o2 = Pr();
    return Hr.f = t2 && !e2 ? Object.defineProperties : function(t3, e3) {
      i2(t3);
      for (var s2, a2 = r2(e3), u2 = o2(e3), c2 = u2.length, l2 = 0; c2 > l2; ) n2.f(t3, s2 = u2[l2++], a2[s2]);
      return t3;
    }, Hr;
  }
  function Rr() {
    if (cr) return ur;
    cr = 1;
    var t2 = wt();
    return ur = t2("document", "documentElement");
  }
  function Fr() {
    if (hr) return lr;
    hr = 1;
    var t2, e2 = Le(), n2 = Vr(), i2 = kn(), r2 = Ye(), o2 = Rr(), s2 = ve(), a2 = Je(), u2 = "prototype", c2 = "script", l2 = a2("IE_PROTO"), h2 = function() {
    }, d2 = function(t3) {
      return "<" + c2 + ">" + t3 + "</" + c2 + ">";
    }, f2 = function(t3) {
      t3.write(d2("")), t3.close();
      var e3 = t3.parentWindow.Object;
      return t3 = null, e3;
    }, p2 = function() {
      try {
        t2 = new ActiveXObject("htmlfile");
      } catch (t3) {
      }
      var e3, n3, r3;
      p2 = "undefined" != typeof document ? document.domain && t2 ? f2(t2) : (n3 = s2("iframe"), r3 = "java" + c2 + ":", n3.style.display = "none", o2.appendChild(n3), n3.src = String(r3), (e3 = n3.contentWindow.document).open(), e3.write(d2("document.F=Object")), e3.close(), e3.F) : f2(t2);
      for (var a3 = i2.length; a3--; ) delete p2[u2][i2[a3]];
      return p2();
    };
    return r2[l2] = true, lr = Object.create || function(t3, i3) {
      var r3;
      return null !== t3 ? (h2[u2] = e2(t3), r3 = new h2(), h2[u2] = null, r3[l2] = t3) : r3 = p2(), void 0 === i3 ? r3 : n2.f(r3, i3);
    };
  }
  function Br() {
    if (vr) return pr;
    vr = 1;
    var t2 = hi(), e2 = String;
    return pr = function(n2) {
      if ("Symbol" === t2(n2)) throw new TypeError("Cannot convert a Symbol value to a string");
      return e2(n2);
    };
  }
  function Dr() {
    if (gr) return _r;
    gr = 1;
    var t2 = Le();
    return _r = function() {
      var e2 = t2(this), n2 = "";
      return e2.hasIndices && (n2 += "d"), e2.global && (n2 += "g"), e2.ignoreCase && (n2 += "i"), e2.multiline && (n2 += "m"), e2.dotAll && (n2 += "s"), e2.unicode && (n2 += "u"), e2.unicodeSets && (n2 += "v"), e2.sticky && (n2 += "y"), n2;
    };
  }
  function zr() {
    if (xr) return yr;
    xr = 1;
    var t2 = k(), e2 = le(), n2 = kt(), i2 = (function() {
      if (mr) return br;
      mr = 1;
      var t3 = h(), e3 = x(), n3 = t3.RegExp, i3 = !e3(function() {
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
      return br = { correct: i3 };
    })(), r2 = Dr(), o2 = RegExp.prototype;
    return yr = i2.correct ? function(t3) {
      return t3.flags;
    } : function(s2) {
      return i2.correct || !n2(o2, s2) || e2(s2, "flags") ? s2.flags : t2(r2, s2);
    };
  }
  function Ur() {
    if (wr) return Er;
    wr = 1;
    var t2 = x(), e2 = h().RegExp, n2 = t2(function() {
      var t3 = e2("a", "y");
      return t3.lastIndex = 2, null !== t3.exec("abcd");
    }), i2 = n2 || t2(function() {
      return !e2("a", "y").sticky;
    }), r2 = n2 || t2(function() {
      var t3 = e2("^r", "gy");
      return t3.lastIndex = 2, null !== t3.exec("str");
    });
    return Er = { BROKEN_CARET: r2, MISSED_STICKY: i2, UNSUPPORTED_Y: n2 };
  }
  function Gr() {
    if (Cr) return kr;
    Cr = 1;
    var t2 = Oe().f;
    return kr = function(e2, n2, i2) {
      i2 in e2 || t2(e2, i2, { configurable: true, get: function() {
        return n2[i2];
      }, set: function(t3) {
        n2[i2] = t3;
      } });
    };
  }
  function qr() {
    if (Lr) return Sr;
    Lr = 1;
    var t2 = Ze(), e2 = Oe();
    return Sr = function(n2, i2, r2) {
      return r2.get && t2(r2.get, i2, { getter: true }), r2.set && t2(r2.set, i2, { setter: true }), e2.f(n2, i2, r2);
    };
  }
  function Wr() {
    if (Ir) return Or;
    Ir = 1;
    var t2 = wt(), e2 = qr(), n2 = de(), i2 = E(), r2 = n2("species");
    return Or = function(n3) {
      var o2 = t2(n3);
      i2 && o2 && !o2[r2] && e2(o2, r2, { configurable: true, get: function() {
        return this;
      } });
    };
  }
  function Kr() {
    if (Ar) return Nr;
    Ar = 1;
    var t2 = x(), e2 = h().RegExp;
    return Nr = t2(function() {
      var t3 = e2(".", "s");
      return !(t3.dotAll && t3.test("\n") && "s" === t3.flags);
    });
  }
  function $r() {
    if (jr) return Tr;
    jr = 1;
    var t2 = x(), e2 = h().RegExp;
    return Tr = t2(function() {
      var t3 = e2("(?<a>b)", "g");
      return "b" !== t3.exec("b").groups.a || "bc" !== "b".replace(t3, "$<a>c");
    });
  }
  !(function() {
    if (Mr) return tr;
    Mr = 1;
    var t2 = E(), e2 = h(), n2 = vt(), i2 = si(), r2 = rr(), o2 = Ie(), s2 = Fr(), a2 = Cn().f, u2 = kt(), c2 = (function() {
      if (fr) return dr;
      fr = 1;
      var t3 = Et(), e3 = bt(), n3 = de()("match");
      return dr = function(i3) {
        var r3;
        return t3(i3) && (void 0 !== (r3 = i3[n3]) ? !!r3 : "RegExp" === e3(i3));
      };
    })(), l2 = Br(), d2 = zr(), f2 = Ur(), p2 = Gr(), v2 = Qe(), b2 = x(), m2 = le(), _2 = Xe().enforce, g2 = Wr(), y2 = de(), w2 = Kr(), k2 = $r(), C2 = y2("match"), S2 = e2.RegExp, L2 = S2.prototype, O2 = e2.SyntaxError, I2 = n2(L2.exec), N2 = n2("".charAt), A2 = n2("".replace), T2 = n2("".indexOf), j2 = n2("".slice), M2 = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/, H2 = /a/g, P2 = /a/g, V2 = new S2(H2) !== H2, R2 = f2.MISSED_STICKY, F2 = f2.UNSUPPORTED_Y, B2 = t2 && (!V2 || R2 || w2 || k2 || b2(function() {
      return P2[C2] = false, S2(H2) !== H2 || S2(P2) === P2 || "/a/i" !== String(S2(H2, "i"));
    }));
    if (i2("RegExp", B2)) {
      for (var D2 = function(t3, e3) {
        var n3, i3, a3, h2, f3, p3, v3 = u2(L2, this), b3 = c2(t3), g3 = void 0 === e3, y3 = [], x2 = t3;
        if (!v3 && b3 && g3 && t3.constructor === D2) return t3;
        if ((b3 || u2(L2, t3)) && (t3 = t3.source, g3 && (e3 = d2(x2))), t3 = void 0 === t3 ? "" : l2(t3), e3 = void 0 === e3 ? "" : l2(e3), x2 = t3, w2 && "dotAll" in H2 && (i3 = !!e3 && T2(e3, "s") > -1) && (e3 = A2(e3, /s/g, "")), n3 = e3, R2 && "sticky" in H2 && (a3 = !!e3 && T2(e3, "y") > -1) && F2 && (e3 = A2(e3, /y/g, "")), k2 && (h2 = (function(t4) {
          for (var e4, n4 = t4.length, i4 = 0, r3 = "", o3 = [], a4 = s2(null), u3 = false, c3 = false, l3 = 0, h3 = ""; i4 <= n4; i4++) {
            if ("\\" === (e4 = N2(t4, i4))) e4 += N2(t4, ++i4);
            else if ("]" === e4) u3 = false;
            else if (!u3) switch (true) {
              case "[" === e4:
                u3 = true;
                break;
              case "(" === e4:
                if (r3 += e4, "?:" === j2(t4, i4 + 1, i4 + 3)) continue;
                I2(M2, j2(t4, i4 + 1)) && (i4 += 2, c3 = true), l3++;
                continue;
              case (">" === e4 && c3):
                if ("" === h3 || m2(a4, h3)) throw new O2("Invalid capture group name");
                a4[h3] = true, o3[o3.length] = [h3, l3], c3 = false, h3 = "";
                continue;
            }
            c3 ? h3 += e4 : r3 += e4;
          }
          return [r3, o3];
        })(t3), t3 = h2[0], y3 = h2[1]), f3 = r2(S2(t3, e3), v3 ? this : L2, D2), (i3 || a3 || y3.length) && (p3 = _2(f3), i3 && (p3.dotAll = true, p3.raw = D2((function(t4) {
          for (var e4, n4 = t4.length, i4 = 0, r3 = "", o3 = false; i4 <= n4; i4++) "\\" !== (e4 = N2(t4, i4)) ? o3 || "." !== e4 ? ("[" === e4 ? o3 = true : "]" === e4 && (o3 = false), r3 += e4) : r3 += "[\\s\\S]" : r3 += e4 + N2(t4, ++i4);
          return r3;
        })(t3), n3)), a3 && (p3.sticky = true), y3.length && (p3.groups = y3)), t3 !== x2) try {
          o2(f3, "source", "" === x2 ? "(?:)" : x2);
        } catch (t4) {
        }
        return f3;
      }, z2 = a2(S2), U2 = 0; z2.length > U2; ) p2(D2, S2, z2[U2++]);
      L2.constructor = D2, D2.prototype = L2, v2(e2, "RegExp", D2, { constructor: true });
    }
    g2("RegExp");
  })();
  var Jr, Yr, Xr, Zr = {};
  function Qr() {
    if (Yr) return Jr;
    Yr = 1;
    var t2, e2, n2 = k(), i2 = vt(), r2 = Br(), o2 = Dr(), s2 = Ur(), a2 = ue(), u2 = Fr(), c2 = Xe().get, l2 = Kr(), h2 = $r(), d2 = a2("native-string-replace", String.prototype.replace), f2 = RegExp.prototype.exec, p2 = f2, v2 = i2("".charAt), b2 = i2("".indexOf), m2 = i2("".replace), _2 = i2("".slice), g2 = (e2 = /b*/g, n2(f2, t2 = /a/, "a"), n2(f2, e2, "a"), 0 !== t2.lastIndex || 0 !== e2.lastIndex), y2 = s2.BROKEN_CARET, x2 = void 0 !== /()??/.exec("")[1];
    return (g2 || x2 || y2 || l2 || h2) && (p2 = function(t3) {
      var e3, i3, s3, a3, l3, h3, E2, w2 = this, k2 = c2(w2), C2 = r2(t3), S2 = k2.raw;
      if (S2) return S2.lastIndex = w2.lastIndex, e3 = n2(p2, S2, C2), w2.lastIndex = S2.lastIndex, e3;
      var L2 = k2.groups, O2 = y2 && w2.sticky, I2 = n2(o2, w2), N2 = w2.source, A2 = 0, T2 = C2;
      if (O2 && (I2 = m2(I2, "y", ""), -1 === b2(I2, "g") && (I2 += "g"), T2 = _2(C2, w2.lastIndex), w2.lastIndex > 0 && (!w2.multiline || w2.multiline && "\n" !== v2(C2, w2.lastIndex - 1)) && (N2 = "(?: " + N2 + ")", T2 = " " + T2, A2++), i3 = new RegExp("^(?:" + N2 + ")", I2)), x2 && (i3 = new RegExp("^" + N2 + "$(?!\\s)", I2)), g2 && (s3 = w2.lastIndex), a3 = n2(f2, O2 ? i3 : w2, T2), O2 ? a3 ? (a3.input = _2(a3.input, A2), a3[0] = _2(a3[0], A2), a3.index = w2.lastIndex, w2.lastIndex += a3[0].length) : w2.lastIndex = 0 : g2 && a3 && (w2.lastIndex = w2.global ? a3.index + a3[0].length : s3), x2 && a3 && a3.length > 1 && n2(d2, a3[0], i3, function() {
        for (l3 = 1; l3 < arguments.length - 2; l3++) void 0 === arguments[l3] && (a3[l3] = void 0);
      }), a3 && L2) for (a3.groups = h3 = u2(null), l3 = 0; l3 < L2.length; l3++) h3[(E2 = L2[l3])[0]] = a3[E2[1]];
      return a3;
    }), Jr = p2;
  }
  function to() {
    if (Xr) return Zr;
    Xr = 1;
    var t2 = ai(), e2 = Qr();
    return t2({ target: "RegExp", proto: true, forced: /./.exec !== e2 }, { exec: e2 }), Zr;
  }
  to();
  var eo, no = {};
  !(function() {
    if (eo) return no;
    eo = 1;
    var t2 = We().PROPER, e2 = Qe(), n2 = Le(), i2 = Br(), r2 = x(), o2 = zr(), s2 = "toString", a2 = RegExp.prototype, u2 = a2[s2], c2 = r2(function() {
      return "/a/b" !== u2.call({ source: "a", flags: "b" });
    }), l2 = t2 && u2.name !== s2;
    (c2 || l2) && e2(a2, s2, function() {
      var t3 = n2(this);
      return "/" + i2(t3.source) + "/" + i2(o2(t3));
    }, { unsafe: true });
  })();
  var io, ro, oo, so, ao, uo, co, lo = {};
  function ho() {
    return so ? oo : (so = 1, oo = Object.is || function(t2, e2) {
      return t2 === e2 ? 0 !== t2 || 1 / t2 == 1 / e2 : t2 != t2 && e2 != e2;
    });
  }
  !(function() {
    if (co) return lo;
    co = 1;
    var t2 = k(), e2 = (function() {
      if (ro) return io;
      ro = 1, to();
      var t3 = k(), e3 = Qe(), n3 = Qr(), i3 = x(), r3 = de(), o3 = Ie(), s3 = r3("species"), a3 = RegExp.prototype;
      return io = function(u3, c2, l2, h2) {
        var d2 = r3(u3), f2 = !i3(function() {
          var t4 = {};
          return t4[d2] = function() {
            return 7;
          }, 7 !== ""[u3](t4);
        }), p2 = f2 && !i3(function() {
          var t4 = false, e4 = /a/;
          if ("split" === u3) {
            var n4 = {};
            n4[s3] = function() {
              return e4;
            }, (e4 = { constructor: n4, flags: "" })[d2] = /./[d2];
          }
          return e4.exec = function() {
            return t4 = true, null;
          }, e4[d2](""), !t4;
        });
        if (!f2 || !p2 || l2) {
          var v2 = /./[d2], b2 = c2(d2, ""[u3], function(e4, i4, r4, o4, s4) {
            var u4 = i4.exec;
            return u4 === n3 || u4 === a3.exec ? f2 && !s4 ? { done: true, value: t3(v2, i4, r4, o4) } : { done: true, value: t3(e4, r4, i4, o4) } : { done: false };
          });
          e3(String.prototype, u3, b2[0]), e3(a3, d2, b2[1]);
        }
        h2 && o3(a3[d2], "sham", true);
      };
    })(), n2 = Le(), i2 = Et(), r2 = gt(), o2 = ho(), s2 = Br(), a2 = Tt(), u2 = (function() {
      if (uo) return ao;
      uo = 1;
      var t3 = k(), e3 = Le(), n3 = xt(), i3 = bt(), r3 = Qr(), o3 = TypeError;
      return ao = function(s3, a3) {
        var u3 = s3.exec;
        if (n3(u3)) {
          var c2 = t3(u3, s3, a3);
          return null !== c2 && e3(c2), c2;
        }
        if ("RegExp" === i3(s3)) return t3(r3, s3, a3);
        throw new o3("RegExp#exec called on incompatible receiver");
      };
    })();
    e2("search", function(e3, c2, l2) {
      return [function(n3) {
        var o3 = r2(this), u3 = i2(n3) ? a2(n3, e3) : void 0;
        return u3 ? t2(u3, n3, o3) : new RegExp(n3)[e3](s2(o3));
      }, function(t3) {
        var e4 = n2(this), i3 = s2(t3), r3 = l2(c2, e4, i3);
        if (r3.done) return r3.value;
        var a3 = e4.lastIndex;
        o2(a3, 0) || (e4.lastIndex = 0);
        var h2 = u2(e4, i3);
        return o2(e4.lastIndex, a3) || (e4.lastIndex = a3), null === h2 ? -1 : h2.index;
      }];
    });
  })();
  var fo, po, vo, bo, mo, _o, go, yo = {};
  function xo() {
    return po ? fo : (po = 1, fo = "	\n\v\f\r                　\u2028\u2029\uFEFF");
  }
  function Eo() {
    if (bo) return vo;
    bo = 1;
    var t2 = vt(), e2 = gt(), n2 = Br(), i2 = xo(), r2 = t2("".replace), o2 = RegExp("^[" + i2 + "]+"), s2 = RegExp("(^|[^" + i2 + "])[" + i2 + "]+$"), a2 = function(t3) {
      return function(i3) {
        var a3 = n2(e2(i3));
        return 1 & t3 && (a3 = r2(a3, o2, "")), 2 & t3 && (a3 = r2(a3, s2, "$1")), a3;
      };
    };
    return vo = { start: a2(1), end: a2(2), trim: a2(3) };
  }
  function wo(t2, e2) {
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
    if (go) return yo;
    go = 1;
    var t2 = ai(), e2 = Eo().trim, n2 = (function() {
      if (_o) return mo;
      _o = 1;
      var t3 = We().PROPER, e3 = x(), n3 = xo();
      return mo = function(i2) {
        return e3(function() {
          return !!n3[i2]() || "​᠎" !== "​᠎"[i2]() || t3 && n3[i2].name !== i2;
        });
      };
    })();
    t2({ target: "String", proto: true, forced: n2("trim") }, { trim: function() {
      return e2(this);
    } });
  })(), wo.prototype = { constructor: wo, input: null, _container: null, _options: {}, _id: "", isFocused: false, isValid: true, _validationMessage: "", _subscribers: [], _boundHandles: null, _clearButton: null, _counter: null, _counterCurrent: null, _counterMax: null, _validationElement: null, _createDOM: function() {
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
  var ko, Co, So, Lo, Oo, Io = {};
  function No() {
    if (Co) return ko;
    Co = 1;
    var t2 = h();
    return ko = t2;
  }
  function Ao() {
    if (Lo) return So;
    Lo = 1;
    var t2 = vt();
    return So = t2(1.1.valueOf);
  }
  !(function() {
    if (Oo) return Io;
    Oo = 1;
    var t2 = ai(), e2 = oe(), n2 = E(), i2 = h(), r2 = No(), o2 = vt(), s2 = si(), a2 = le(), u2 = rr(), c2 = kt(), l2 = It(), d2 = fe(), f2 = x(), p2 = Cn().f, v2 = me().f, b2 = Oe().f, m2 = Ao(), _2 = Eo().trim, g2 = "Number", y2 = i2[g2], w2 = r2[g2], k2 = y2.prototype, C2 = i2.TypeError, S2 = o2("".slice), L2 = o2("".charCodeAt), O2 = function(t3) {
      var e3, n3, i3, r3, o3, s3, a3, u3, c3 = d2(t3, "number");
      if (l2(c3)) throw new C2("Cannot convert a Symbol value to a number");
      if ("string" == typeof c3 && c3.length > 2) {
        if (c3 = _2(c3), 43 === (e3 = L2(c3, 0)) || 45 === e3) {
          if (88 === (n3 = L2(c3, 2)) || 120 === n3) return NaN;
        } else if (48 === e3) {
          switch (L2(c3, 1)) {
            case 66:
            case 98:
              i3 = 2, r3 = 49;
              break;
            case 79:
            case 111:
              i3 = 8, r3 = 55;
              break;
            default:
              return +c3;
          }
          for (s3 = (o3 = S2(c3, 2)).length, a3 = 0; a3 < s3; a3++) if ((u3 = L2(o3, a3)) < 48 || u3 > r3) return NaN;
          return parseInt(o3, i3);
        }
      }
      return +c3;
    }, I2 = s2(g2, !y2(" 0o1") || !y2("0b1") || y2("+0x1")), N2 = function(t3) {
      var e3, n3 = arguments.length < 1 ? 0 : y2((function(t4) {
        var e4 = d2(t4, "number");
        return "bigint" == typeof e4 ? e4 : O2(e4);
      })(t3));
      return c2(k2, e3 = this) && f2(function() {
        m2(e3);
      }) ? u2(Object(n3), this, N2) : n3;
    };
    N2.prototype = k2, I2 && !e2 && (k2.constructor = N2), t2({ global: true, constructor: true, wrap: true, forced: I2 }, { Number: N2 });
    var A2 = function(t3, e3) {
      for (var i3, r3 = n2 ? p2(e3) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","), o3 = 0; r3.length > o3; o3++) a2(e3, i3 = r3[o3]) && !a2(t3, i3) && b2(t3, i3, v2(e3, i3));
    };
    e2 && w2 && A2(r2[g2], w2), (I2 || e2) && A2(r2[g2], y2);
  })();
  var To, jo, Mo, Ho = {};
  function Po(t2, e2) {
    if ("string" == typeof t2) {
      var n2 = document.getElementById(t2);
      n2 instanceof HTMLElement && (t2 = n2);
    }
    if (!(t2 instanceof HTMLElement)) throw new Error("Invalid container element");
    this.container = t2, this._options = Object.assign(this._options, e2), this._isShow = false;
  }
  function Vo(t2, e2) {
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
    if (Mo) return Ho;
    Mo = 1;
    var t2 = ai(), e2 = (function() {
      if (jo) return To;
      jo = 1;
      var t3 = E(), e3 = vt(), n2 = k(), i2 = x(), r2 = Pr(), o2 = ii(), s2 = ft(), a2 = ce(), u2 = mt(), c2 = Object.assign, l2 = Object.defineProperty, h2 = e3([].concat);
      return To = !c2 || i2(function() {
        if (t3 && 1 !== c2({ b: 1 }, c2(l2({}, "a", { enumerable: true, get: function() {
          l2(this, "b", { value: 3, enumerable: false });
        } }), { b: 2 })).b) return true;
        var e4 = {}, n3 = {}, i3 = Symbol("assign detection"), o3 = "abcdefghijklmnopqrst";
        return e4[i3] = 7, o3.split("").forEach(function(t4) {
          n3[t4] = t4;
        }), 7 !== c2({}, e4)[i3] || r2(c2({}, n3)).join("") !== o3;
      }) ? function(e4, i3) {
        for (var c3 = a2(e4), l3 = arguments.length, d2 = 1, f2 = o2.f, p2 = s2.f; l3 > d2; ) for (var v2, b2 = u2(arguments[d2++]), m2 = f2 ? h2(r2(b2), f2(b2)) : r2(b2), _2 = m2.length, g2 = 0; _2 > g2; ) v2 = m2[g2++], t3 && !n2(p2, b2, v2) || (c3[v2] = b2[v2]);
        return c3;
      } : c2, To;
    })();
    t2({ target: "Object", stat: true, arity: 2, forced: Object.assign !== e2 }, { assign: e2 });
  })(), Po.prototype = { constructor: Po, _options: { type: "info", text: "", title: "", duration: 0, closeButton: true, autoClose: false, closeOnClickOutside: true }, _outsideClickListener: null, _element: null, _timeoutId: null, _create: function() {
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
  } }, Vo.prototype = { constructor: Vo, _button: null, _buttonText: null, _spinner: null, _badgeElement: null, _createDOM: function() {
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
  var Ro, Fo, Bo, Do, zo, Uo, Go, qo, Wo, Ko, $o, Jo, Yo, Xo, Zo, Qo, ts, es, ns, is, rs, os, ss, as = {};
  function us() {
    if (Fo) return Ro;
    Fo = 1;
    var t2 = TypeError;
    return Ro = function(e2) {
      if (e2 > 9007199254740991) throw t2("Maximum allowed index exceeded");
      return e2;
    };
  }
  function cs() {
    if (zo) return Do;
    zo = 1;
    var t2 = de(), e2 = Fr(), n2 = Oe().f, i2 = t2("unscopables"), r2 = Array.prototype;
    return void 0 === r2[i2] && n2(r2, i2, { configurable: true, value: e2(null) }), Do = function(t3) {
      r2[i2][t3] = true;
    };
  }
  function ls() {
    return Go ? Uo : (Go = 1, Uo = {});
  }
  function hs() {
    if ($o) return Ko;
    $o = 1;
    var t2 = le(), e2 = xt(), n2 = ce(), i2 = Je(), r2 = (function() {
      if (Wo) return qo;
      Wo = 1;
      var t3 = x();
      return qo = !t3(function() {
        function t4() {
        }
        return t4.prototype.constructor = null, Object.getPrototypeOf(new t4()) !== t4.prototype;
      });
    })(), o2 = i2("IE_PROTO"), s2 = Object, a2 = s2.prototype;
    return Ko = r2 ? s2.getPrototypeOf : function(i3) {
      var r3 = n2(i3);
      if (t2(r3, o2)) return r3[o2];
      var u2 = r3.constructor;
      return e2(u2) && r3 instanceof u2 ? u2.prototype : r3 instanceof s2 ? a2 : null;
    };
  }
  function ds() {
    if (Yo) return Jo;
    Yo = 1;
    var t2, e2, n2, i2 = x(), r2 = xt(), o2 = Et(), s2 = Fr(), a2 = hs(), u2 = Qe(), c2 = de(), l2 = oe(), h2 = c2("iterator"), d2 = false;
    return [].keys && ("next" in (n2 = [].keys()) ? (e2 = a2(a2(n2))) !== Object.prototype && (t2 = e2) : d2 = true), !o2(t2) || i2(function() {
      var e3 = {};
      return t2[h2].call(e3) !== e3;
    }) ? t2 = {} : l2 && (t2 = s2(t2)), r2(t2[h2]) || u2(t2, h2, function() {
      return this;
    }), Jo = { IteratorPrototype: t2, BUGGY_SAFARI_ITERATORS: d2 };
  }
  function fs() {
    if (Zo) return Xo;
    Zo = 1;
    var t2 = Oe().f, e2 = le(), n2 = de()("toStringTag");
    return Xo = function(i2, r2, o2) {
      i2 && !o2 && (i2 = i2.prototype), i2 && !e2(i2, n2) && t2(i2, n2, { configurable: true, value: r2 });
    };
  }
  function ps() {
    if (ns) return es;
    ns = 1;
    var t2 = ai(), e2 = k(), n2 = oe(), i2 = We(), r2 = xt(), o2 = (function() {
      if (ts) return Qo;
      ts = 1;
      var t3 = ds().IteratorPrototype, e3 = Fr(), n3 = pt(), i3 = fs(), r3 = ls(), o3 = function() {
        return this;
      };
      return Qo = function(s3, a3, u3, c3) {
        var l3 = a3 + " Iterator";
        return s3.prototype = e3(t3, { next: n3(+!c3, u3) }), i3(s3, l3, false, true), r3[l3] = o3, s3;
      };
    })(), s2 = hs(), a2 = ir(), u2 = fs(), c2 = Ie(), l2 = Qe(), h2 = de(), d2 = ls(), f2 = ds(), p2 = i2.PROPER, v2 = i2.CONFIGURABLE, b2 = f2.IteratorPrototype, m2 = f2.BUGGY_SAFARI_ITERATORS, _2 = h2("iterator"), g2 = "keys", y2 = "values", x2 = "entries", E2 = function() {
      return this;
    };
    return es = function(i3, h3, f3, w2, k2, C2, S2) {
      o2(f3, h3, w2);
      var L2, O2, I2, N2 = function(t3) {
        if (t3 === k2 && H2) return H2;
        if (!m2 && t3 && t3 in j2) return j2[t3];
        switch (t3) {
          case g2:
          case y2:
          case x2:
            return function() {
              return new f3(this, t3);
            };
        }
        return function() {
          return new f3(this);
        };
      }, A2 = h3 + " Iterator", T2 = false, j2 = i3.prototype, M2 = j2[_2] || j2["@@iterator"] || k2 && j2[k2], H2 = !m2 && M2 || N2(k2), P2 = "Array" === h3 && j2.entries || M2;
      if (P2 && (L2 = s2(P2.call(new i3()))) !== Object.prototype && L2.next && (n2 || s2(L2) === b2 || (a2 ? a2(L2, b2) : r2(L2[_2]) || l2(L2, _2, E2)), u2(L2, A2, true, true), n2 && (d2[A2] = E2)), p2 && k2 === y2 && M2 && M2.name !== y2 && (!n2 && v2 ? c2(j2, "name", y2) : (T2 = true, H2 = function() {
        return e2(M2, this);
      })), k2) if (O2 = { values: N2(y2), keys: C2 ? H2 : N2(g2), entries: N2(x2) }, S2) for (I2 in O2) (m2 || T2 || !(I2 in j2)) && l2(j2, I2, O2[I2]);
      else t2({ target: h3, proto: true, forced: m2 || T2 }, O2);
      return n2 && !S2 || j2[_2] === H2 || l2(j2, _2, H2, { name: k2 }), d2[h3] = H2, O2;
    };
  }
  function vs() {
    return rs ? is : (rs = 1, is = function(t2, e2) {
      return { value: t2, done: e2 };
    });
  }
  function bs() {
    if (ss) return os;
    ss = 1;
    var t2 = yt(), e2 = cs(), n2 = ls(), i2 = Xe(), r2 = Oe().f, o2 = ps(), s2 = vs(), a2 = oe(), u2 = E(), c2 = "Array Iterator", l2 = i2.set, h2 = i2.getterFor(c2);
    os = o2(Array, "Array", function(e3, n3) {
      l2(this, { type: c2, target: t2(e3), index: 0, kind: n3 });
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
    var d2 = n2.Arguments = n2.Array;
    if (e2("keys"), e2("values"), e2("entries"), !a2 && u2 && "values" !== d2.name) try {
      r2(d2, "name", { value: "values" });
    } catch (t3) {
    }
    return os;
  }
  !(function() {
    if (Bo) return as;
    Bo = 1;
    var t2 = ai(), e2 = x(), n2 = ci(), i2 = Et(), r2 = ce(), o2 = En(), s2 = us(), a2 = zi(), u2 = pi(), c2 = bi(), l2 = de(), h2 = St(), d2 = l2("isConcatSpreadable"), f2 = h2 >= 51 || !e2(function() {
      var t3 = [];
      return t3[d2] = false, t3.concat()[0] !== t3;
    }), p2 = function(t3) {
      if (!i2(t3)) return false;
      var e3 = t3[d2];
      return void 0 !== e3 ? !!e3 : n2(t3);
    };
    t2({ target: "Array", proto: true, arity: 1, forced: !f2 || !c2("concat") }, { concat: function(t3) {
      var e3, n3, i3, c3, l3, h3 = r2(this), d3 = u2(h3, 0), f3 = 0;
      for (e3 = -1, i3 = arguments.length; e3 < i3; e3++) if (p2(l3 = -1 === e3 ? h3 : arguments[e3])) for (c3 = o2(l3), s2(f3 + c3), n3 = 0; n3 < c3; n3++, f3++) n3 in l3 && a2(d3, f3, l3[n3]);
      else s2(f3 + 1), a2(d3, f3++, l3);
      return d3.length = f3, d3;
    } });
  })(), bs();
  var ms, _s, gs, ys, xs, Es = {};
  function ws() {
    if (ys) return gs;
    ys = 1;
    var t2 = Nt(), e2 = TypeError;
    return gs = function(n2, i2) {
      if (!delete n2[i2]) throw new e2("Cannot delete property " + t2(i2) + " of " + t2(n2));
    };
  }
  !(function() {
    if (xs) return Es;
    xs = 1;
    var t2 = ai(), e2 = ce(), n2 = yn(), i2 = gn(), r2 = En(), o2 = (function() {
      if (_s) return ms;
      _s = 1;
      var t3 = E(), e3 = ci(), n3 = TypeError, i3 = Object.getOwnPropertyDescriptor, r3 = t3 && !(function() {
        if (void 0 !== this) return true;
        try {
          Object.defineProperty([], "length", { writable: false }).length = 1;
        } catch (t4) {
          return t4 instanceof TypeError;
        }
      })();
      return ms = r3 ? function(t4, r4) {
        if (e3(t4) && !i3(t4, "length").writable) throw new n3("Cannot set read only .length");
        return t4.length = r4;
      } : function(t4, e4) {
        return t4.length = e4;
      };
    })(), s2 = us(), a2 = pi(), u2 = zi(), c2 = ws(), l2 = bi()("splice"), h2 = Math.max, d2 = Math.min;
    t2({ target: "Array", proto: true, forced: !l2 }, { splice: function(t3, l3) {
      var f2, p2, v2, b2, m2, _2, g2 = e2(this), y2 = r2(g2), x2 = n2(t3, y2), E2 = arguments.length;
      for (0 === E2 ? f2 = p2 = 0 : 1 === E2 ? (f2 = 0, p2 = y2 - x2) : (f2 = E2 - 2, p2 = d2(h2(i2(l3), 0), y2 - x2)), s2(y2 + f2 - p2), v2 = a2(g2, p2), b2 = 0; b2 < p2; b2++) (m2 = x2 + b2) in g2 && u2(v2, b2, g2[m2]);
      if (v2.length = p2, f2 < p2) {
        for (b2 = x2; b2 < y2 - p2; b2++) _2 = b2 + f2, (m2 = b2 + p2) in g2 ? g2[_2] = g2[m2] : c2(g2, _2);
        for (b2 = y2; b2 > y2 - p2 + f2; b2--) c2(g2, b2 - 1);
      } else if (f2 > p2) for (b2 = y2 - p2; b2 > x2; b2--) _2 = b2 + f2 - 1, (m2 = b2 + p2 - 1) in g2 ? g2[_2] = g2[m2] : c2(g2, _2);
      for (b2 = 0; b2 < f2; b2++) g2[b2 + x2] = arguments[b2 + 2];
      return o2(g2, y2 - p2 + f2), v2;
    } });
  })();
  var ks, Cs = {};
  !(function() {
    if (ks) return Cs;
    ks = 1;
    var t2 = E(), e2 = We().EXISTS, n2 = vt(), i2 = qr(), r2 = Function.prototype, o2 = n2(r2.toString), s2 = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/, a2 = n2(s2.exec);
    t2 && !e2 && i2(r2, "name", { configurable: true, get: function() {
      try {
        return a2(s2, o2(this))[1];
      } catch (t3) {
        return "";
      }
    } });
  })();
  var Ss, Ls, Os, Is, Ns, As, Ts, js, Ms, Hs, Ps, Vs, Rs, Fs, Bs, Ds, zs, Us, Gs, qs, Ws, Ks, $s, Js, Ys, Xs, Zs, Qs, ta, ea, na = { exports: {} }, ia = {};
  function ra() {
    if (Ss) return ia;
    Ss = 1;
    var t2 = bt(), e2 = yt(), n2 = Cn().f, i2 = Ui(), r2 = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
    return ia.f = function(o2) {
      return r2 && "Window" === t2(o2) ? (function(t3) {
        try {
          return n2(t3);
        } catch (t4) {
          return i2(r2);
        }
      })(o2) : n2(e2(o2));
    }, ia;
  }
  function oa() {
    if (Ns) return Is;
    Ns = 1;
    var t2 = x(), e2 = Et(), n2 = bt(), i2 = (function() {
      if (Os) return Ls;
      Os = 1;
      var t3 = x();
      return Ls = t3(function() {
        if ("function" == typeof ArrayBuffer) {
          var t4 = new ArrayBuffer(8);
          Object.isExtensible(t4) && Object.defineProperty(t4, "a", { value: 8 });
        }
      });
    })(), r2 = Object.isExtensible, o2 = t2(function() {
    });
    return Is = o2 || i2 ? function(t3) {
      return !!e2(t3) && ((!i2 || "ArrayBuffer" !== n2(t3)) && (!r2 || r2(t3)));
    } : r2;
  }
  function sa() {
    if (Ts) return As;
    Ts = 1;
    var t2 = x();
    return As = !t2(function() {
      return Object.isExtensible(Object.preventExtensions({}));
    });
  }
  function aa() {
    if (js) return na.exports;
    js = 1;
    var t2 = ai(), e2 = vt(), n2 = Ye(), i2 = Et(), r2 = le(), o2 = Oe().f, s2 = Cn(), a2 = ra(), u2 = oa(), c2 = he(), l2 = sa(), h2 = false, d2 = c2("meta"), f2 = 0, p2 = function(t3) {
      o2(t3, d2, { value: { objectID: "O" + f2++, weakData: {} } });
    }, v2 = na.exports = { enable: function() {
      v2.enable = function() {
      }, h2 = true;
      var n3 = s2.f, i3 = e2([].splice), r3 = {};
      r3[d2] = 1, n3(r3).length && (s2.f = function(t3) {
        for (var e3 = n3(t3), r4 = 0, o3 = e3.length; r4 < o3; r4++) if (e3[r4] === d2) {
          i3(e3, r4, 1);
          break;
        }
        return e3;
      }, t2({ target: "Object", stat: true, forced: true }, { getOwnPropertyNames: a2.f }));
    }, fastKey: function(t3, e3) {
      if (!i2(t3)) return "symbol" == typeof t3 ? t3 : ("string" == typeof t3 ? "S" : "P") + t3;
      if (!r2(t3, d2)) {
        if (!u2(t3)) return "F";
        if (!e3) return "E";
        p2(t3);
      }
      return t3[d2].objectID;
    }, getWeakData: function(t3, e3) {
      if (!r2(t3, d2)) {
        if (!u2(t3)) return true;
        if (!e3) return false;
        p2(t3);
      }
      return t3[d2].weakData;
    }, onFreeze: function(t3) {
      return l2 && h2 && u2(t3) && !r2(t3, d2) && p2(t3), t3;
    } };
    return n2[d2] = true, na.exports;
  }
  function ua() {
    if (Hs) return Ms;
    Hs = 1;
    var t2 = de(), e2 = ls(), n2 = t2("iterator"), i2 = Array.prototype;
    return Ms = function(t3) {
      return void 0 !== t3 && (e2.Array === t3 || i2[n2] === t3);
    };
  }
  function ca() {
    if (Vs) return Ps;
    Vs = 1;
    var t2 = hi(), e2 = Tt(), n2 = _t(), i2 = ls(), r2 = de()("iterator");
    return Ps = function(o2) {
      if (!n2(o2)) return e2(o2, r2) || e2(o2, "@@iterator") || i2[t2(o2)];
    };
  }
  function la() {
    if (Fs) return Rs;
    Fs = 1;
    var t2 = k(), e2 = At(), n2 = Le(), i2 = Nt(), r2 = ca(), o2 = TypeError;
    return Rs = function(s2, a2) {
      var u2 = arguments.length < 2 ? r2(s2) : a2;
      if (e2(u2)) return n2(t2(u2, s2));
      throw new o2(i2(s2) + " is not iterable");
    }, Rs;
  }
  function ha() {
    if (Ds) return Bs;
    Ds = 1;
    var t2 = k(), e2 = Le(), n2 = Tt();
    return Bs = function(i2, r2, o2) {
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
  function da() {
    if (Us) return zs;
    Us = 1;
    var t2 = ui(), e2 = k(), n2 = Le(), i2 = Nt(), r2 = ua(), o2 = En(), s2 = kt(), a2 = la(), u2 = ca(), c2 = ha(), l2 = TypeError, h2 = function(t3, e3) {
      this.stopped = t3, this.result = e3;
    }, d2 = h2.prototype;
    return zs = function(f2, p2, v2) {
      var b2, m2, _2, g2, y2, x2, E2, w2 = v2 && v2.that, k2 = !(!v2 || !v2.AS_ENTRIES), C2 = !(!v2 || !v2.IS_RECORD), S2 = !(!v2 || !v2.IS_ITERATOR), L2 = !(!v2 || !v2.INTERRUPTED), O2 = t2(p2, w2), I2 = function(t3) {
        return b2 && c2(b2, "normal"), new h2(true, t3);
      }, N2 = function(t3) {
        return k2 ? (n2(t3), L2 ? O2(t3[0], t3[1], I2) : O2(t3[0], t3[1])) : L2 ? O2(t3, I2) : O2(t3);
      };
      if (C2) b2 = f2.iterator;
      else if (S2) b2 = f2;
      else {
        if (!(m2 = u2(f2))) throw new l2(i2(f2) + " is not iterable");
        if (r2(m2)) {
          for (_2 = 0, g2 = o2(f2); g2 > _2; _2++) if ((y2 = N2(f2[_2])) && s2(d2, y2)) return y2;
          return new h2(false);
        }
        b2 = a2(f2, m2);
      }
      for (x2 = C2 ? f2.next : b2.next; !(E2 = e2(x2, b2)).done; ) {
        try {
          y2 = N2(E2.value);
        } catch (t3) {
          c2(b2, "throw", t3);
        }
        if ("object" == typeof y2 && y2 && s2(d2, y2)) return y2;
      }
      return new h2(false);
    };
  }
  function fa() {
    if (qs) return Gs;
    qs = 1;
    var t2 = kt(), e2 = TypeError;
    return Gs = function(n2, i2) {
      if (t2(i2, n2)) return n2;
      throw new e2("Incorrect invocation");
    };
  }
  function pa() {
    if (Ks) return Ws;
    Ks = 1;
    var t2 = de()("iterator"), e2 = false;
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
    return Ws = function(n3, i3) {
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
  function va() {
    if (Js) return $s;
    Js = 1;
    var t2 = ai(), e2 = h(), n2 = vt(), i2 = si(), r2 = Qe(), o2 = aa(), s2 = da(), a2 = fa(), u2 = xt(), c2 = _t(), l2 = Et(), d2 = x(), f2 = pa(), p2 = fs(), v2 = rr();
    return $s = function(h2, b2, m2) {
      var _2 = -1 !== h2.indexOf("Map"), g2 = -1 !== h2.indexOf("Weak"), y2 = _2 ? "set" : "add", x2 = e2[h2], E2 = x2 && x2.prototype, w2 = x2, k2 = {}, C2 = function(t3) {
        var e3 = n2(E2[t3]);
        r2(E2, t3, "add" === t3 ? function(t4) {
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
      if (i2(h2, !u2(x2) || !(g2 || E2.forEach && !d2(function() {
        new x2().entries().next();
      })))) w2 = m2.getConstructor(b2, h2, _2, y2), o2.enable();
      else if (i2(h2, true)) {
        var S2 = new w2(), L2 = S2[y2](g2 ? {} : -0, 1) !== S2, O2 = d2(function() {
          S2.has(1);
        }), I2 = f2(function(t3) {
          new x2(t3);
        }), N2 = !g2 && d2(function() {
          for (var t3 = new x2(), e3 = 5; e3--; ) t3[y2](e3, e3);
          return !t3.has(-0);
        });
        I2 || ((w2 = b2(function(t3, e3) {
          a2(t3, E2);
          var n3 = v2(new x2(), t3, w2);
          return c2(e3) || s2(e3, n3[y2], { that: n3, AS_ENTRIES: _2 }), n3;
        })).prototype = E2, E2.constructor = w2), (O2 || N2) && (C2("delete"), C2("has"), _2 && C2("get")), (N2 || L2) && C2(y2), g2 && E2.clear && delete E2.clear;
      }
      return k2[h2] = w2, t2({ global: true, constructor: true, forced: w2 !== x2 }, k2), p2(w2, h2), g2 || m2.setStrong(w2, h2, _2), w2;
    };
  }
  function ba() {
    if (Xs) return Ys;
    Xs = 1;
    var t2 = Qe();
    return Ys = function(e2, n2, i2) {
      for (var r2 in n2) t2(e2, r2, n2[r2], i2);
      return e2;
    };
  }
  function ma() {
    if (Qs) return Zs;
    Qs = 1;
    var t2 = Fr(), e2 = qr(), n2 = ba(), i2 = ui(), r2 = fa(), o2 = _t(), s2 = da(), a2 = ps(), u2 = vs(), c2 = Wr(), l2 = E(), h2 = aa().fastKey, d2 = Xe(), f2 = d2.set, p2 = d2.getterFor;
    return Zs = { getConstructor: function(a3, u3, c3, d3) {
      var v2 = a3(function(e3, n3) {
        r2(e3, b2), f2(e3, { type: u3, index: t2(null), first: null, last: null, size: 0 }), l2 || (e3.size = 0), o2(n3) || s2(n3, e3[d3], { that: e3, AS_ENTRIES: c3 });
      }), b2 = v2.prototype, m2 = p2(u3), _2 = function(t3, e3, n3) {
        var i3, r3, o3 = m2(t3), s3 = g2(t3, e3);
        return s3 ? s3.value = n3 : (o3.last = s3 = { index: r3 = h2(e3, true), key: e3, value: n3, previous: i3 = o3.last, next: null, removed: false }, o3.first || (o3.first = s3), i3 && (i3.next = s3), l2 ? o3.size++ : t3.size++, "F" !== r3 && (o3.index[r3] = s3)), t3;
      }, g2 = function(t3, e3) {
        var n3, i3 = m2(t3), r3 = h2(e3);
        if ("F" !== r3) return i3.index[r3];
        for (n3 = i3.first; n3; n3 = n3.next) if (n3.key === e3) return n3;
      };
      return n2(b2, { clear: function() {
        for (var e3 = m2(this), n3 = e3.first; n3; ) n3.removed = true, n3.previous && (n3.previous = n3.previous.next = null), n3 = n3.next;
        e3.first = e3.last = null, e3.index = t2(null), l2 ? e3.size = 0 : this.size = 0;
      }, delete: function(t3) {
        var e3 = this, n3 = m2(e3), i3 = g2(e3, t3);
        if (i3) {
          var r3 = i3.next, o3 = i3.previous;
          delete n3.index[i3.index], i3.removed = true, o3 && (o3.next = r3), r3 && (r3.previous = o3), n3.first === i3 && (n3.first = r3), n3.last === i3 && (n3.last = o3), l2 ? n3.size-- : e3.size--;
        }
        return !!i3;
      }, forEach: function(t3) {
        for (var e3, n3 = m2(this), r3 = i2(t3, arguments.length > 1 ? arguments[1] : void 0); e3 = e3 ? e3.next : n3.first; ) for (r3(e3.value, e3.key, this); e3 && e3.removed; ) e3 = e3.previous;
      }, has: function(t3) {
        return !!g2(this, t3);
      } }), n2(b2, c3 ? { get: function(t3) {
        var e3 = g2(this, t3);
        return e3 && e3.value;
      }, set: function(t3, e3) {
        return _2(this, 0 === t3 ? 0 : t3, e3);
      } } : { add: function(t3) {
        return _2(this, t3 = 0 === t3 ? 0 : t3, t3);
      } }), l2 && e2(b2, "size", { configurable: true, get: function() {
        return m2(this).size;
      } }), v2;
    }, setStrong: function(t3, e3, n3) {
      var i3 = e3 + " Iterator", r3 = p2(e3), o3 = p2(i3);
      a2(t3, e3, function(t4, e4) {
        f2(this, { type: i3, target: t4, state: r3(t4), kind: e4, last: null });
      }, function() {
        for (var t4 = o3(this), e4 = t4.kind, n4 = t4.last; n4 && n4.removed; ) n4 = n4.previous;
        return t4.target && (t4.last = n4 = n4 ? n4.next : t4.state.first) ? u2("keys" === e4 ? n4.key : "values" === e4 ? n4.value : [n4.key, n4.value], false) : (t4.target = null, u2(void 0, true));
      }, n3 ? "entries" : "values", !n3, true), c2(e3);
    } }, Zs;
  }
  ea || (ea = 1, ta || (ta = 1, va()("Map", function(t2) {
    return function() {
      return t2(this, arguments.length ? arguments[0] : void 0);
    };
  }, ma())));
  var _a, ga, ya, xa = {};
  !(function() {
    if (ya) return xa;
    ya = 1;
    var t2 = (function() {
      if (ga) return _a;
      ga = 1;
      var t3 = vt(), e3 = gn(), n3 = Br(), i3 = gt(), r3 = t3("".charAt), o3 = t3("".charCodeAt), s3 = t3("".slice), a3 = function(t4) {
        return function(a4, u2) {
          var c2, l2, h2 = n3(i3(a4)), d2 = e3(u2), f2 = h2.length;
          return d2 < 0 || d2 >= f2 ? t4 ? "" : void 0 : (c2 = o3(h2, d2)) < 55296 || c2 > 56319 || d2 + 1 === f2 || (l2 = o3(h2, d2 + 1)) < 56320 || l2 > 57343 ? t4 ? r3(h2, d2) : c2 : t4 ? s3(h2, d2, d2 + 2) : l2 - 56320 + (c2 - 55296 << 10) + 65536;
        };
      };
      return _a = { codeAt: a3(false), charAt: a3(true) };
    })().charAt, e2 = Br(), n2 = Xe(), i2 = ps(), r2 = vs(), o2 = "String Iterator", s2 = n2.set, a2 = n2.getterFor(o2);
    i2(String, "String", function(t3) {
      s2(this, { type: o2, string: e2(t3), index: 0 });
    }, function() {
      var e3, n3 = a2(this), i3 = n3.string, o3 = n3.index;
      return o3 >= i3.length ? r2(void 0, true) : (e3 = t2(i3, o3), n3.index += e3.length, r2(e3, false));
    });
  })();
  var Ea, wa, ka, Ca, Sa = {};
  function La() {
    if (wa) return Ea;
    wa = 1;
    var t2 = vt(), e2 = ba(), n2 = aa().getWeakData, i2 = fa(), r2 = Le(), o2 = _t(), s2 = Et(), a2 = da(), u2 = vi(), c2 = le(), l2 = Xe(), h2 = l2.set, d2 = l2.getterFor, f2 = u2.find, p2 = u2.findIndex, v2 = t2([].splice), b2 = 0, m2 = function(t3) {
      return t3.frozen || (t3.frozen = new _2());
    }, _2 = function() {
      this.entries = [];
    }, g2 = function(t3, e3) {
      return f2(t3.entries, function(t4) {
        return t4[0] === e3;
      });
    };
    return _2.prototype = { get: function(t3) {
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
    } }, Ea = { getConstructor: function(t3, u3, l3, f3) {
      var p3 = t3(function(t4, e3) {
        i2(t4, v3), h2(t4, { type: u3, id: b2++, frozen: null }), o2(e3) || a2(e3, t4[f3], { that: t4, AS_ENTRIES: l3 });
      }), v3 = p3.prototype, _3 = d2(u3), g3 = function(t4, e3, i3) {
        var o3 = _3(t4), s3 = n2(r2(e3), true);
        return true === s3 ? m2(o3).set(e3, i3) : s3[o3.id] = i3, t4;
      };
      return e2(v3, { delete: function(t4) {
        var e3 = _3(this);
        if (!s2(t4)) return false;
        var i3 = n2(t4);
        return true === i3 ? m2(e3).delete(t4) : i3 && c2(i3, e3.id) && delete i3[e3.id];
      }, has: function(t4) {
        var e3 = _3(this);
        if (!s2(t4)) return false;
        var i3 = n2(t4);
        return true === i3 ? m2(e3).has(t4) : i3 && c2(i3, e3.id);
      } }), e2(v3, l3 ? { get: function(t4) {
        var e3 = _3(this);
        if (s2(t4)) {
          var i3 = n2(t4);
          if (true === i3) return m2(e3).get(t4);
          if (i3) return i3[e3.id];
        }
      }, set: function(t4, e3) {
        return g3(this, t4, e3);
      } } : { add: function(t4) {
        return g3(this, t4, true);
      } }), p3;
    } };
  }
  Ca || (Ca = 1, (function() {
    if (ka) return Sa;
    ka = 1;
    var t2, e2 = sa(), n2 = h(), i2 = vt(), r2 = ba(), o2 = aa(), s2 = va(), a2 = La(), u2 = Et(), c2 = Xe().enforce, l2 = x(), d2 = $e(), f2 = Object, p2 = Array.isArray, v2 = f2.isExtensible, b2 = f2.isFrozen, m2 = f2.isSealed, _2 = f2.freeze, g2 = f2.seal, y2 = !n2.ActiveXObject && "ActiveXObject" in n2, E2 = function(t3) {
      return function() {
        return t3(this, arguments.length ? arguments[0] : void 0);
      };
    }, w2 = s2("WeakMap", E2, a2), k2 = w2.prototype, C2 = i2(k2.set);
    if (d2) if (y2) {
      t2 = a2.getConstructor(E2, "WeakMap", true), o2.enable();
      var S2 = i2(k2.delete), L2 = i2(k2.has), O2 = i2(k2.get);
      r2(k2, { delete: function(e3) {
        if (u2(e3) && !v2(e3)) {
          var n3 = c2(this);
          return n3.frozen || (n3.frozen = new t2()), S2(this, e3) || n3.frozen.delete(e3);
        }
        return S2(this, e3);
      }, has: function(e3) {
        if (u2(e3) && !v2(e3)) {
          var n3 = c2(this);
          return n3.frozen || (n3.frozen = new t2()), L2(this, e3) || n3.frozen.has(e3);
        }
        return L2(this, e3);
      }, get: function(e3) {
        if (u2(e3) && !v2(e3)) {
          var n3 = c2(this);
          return n3.frozen || (n3.frozen = new t2()), L2(this, e3) ? O2(this, e3) : n3.frozen.get(e3);
        }
        return O2(this, e3);
      }, set: function(e3, n3) {
        if (u2(e3) && !v2(e3)) {
          var i3 = c2(this);
          i3.frozen || (i3.frozen = new t2()), L2(this, e3) ? C2(this, e3, n3) : i3.frozen.set(e3, n3);
        } else C2(this, e3, n3);
        return this;
      } });
    } else e2 && l2(function() {
      var t3 = _2([]);
      return C2(new w2(), t3, 1), !b2(t3);
    }) && r2(k2, { set: function(t3, e3) {
      var n3;
      return p2(t3) && (b2(t3) ? n3 = _2 : m2(t3) && (n3 = g2)), C2(this, t3, e3), n3 && n3(t3), this;
    } });
  })());
  var Oa, Ia;
  Ia || (Ia = 1, Oa || (Oa = 1, va()("WeakSet", function(t2) {
    return function() {
      return t2(this, arguments.length ? arguments[0] : void 0);
    };
  }, La())));
  var Na, Aa = {};
  function Ta(t2, e2) {
    if ("string" == typeof t2) {
      var n2 = document.getElementById(t2);
      n2 instanceof HTMLInputElement && (t2 = n2);
    }
    if (t2 instanceof HTMLInputElement == false) throw new Error("Invalid input element");
    this._options = Object.assign({ id: "checkbox_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)), checked: false, disabled: false, indeterminate: false, label: "", name: "", value: "on" }, e2), this._options.disabled = e2.disabled || false, this._handlers = /* @__PURE__ */ new Map(), this._createDOM(t2), this._setupEventListeners(), this._updateVisualState(), this._subscribers = [];
  }
  !(function() {
    if (Na) return Aa;
    Na = 1;
    var t2 = h(), e2 = Ai(), n2 = Ti(), i2 = bs(), r2 = Ie(), o2 = fs(), s2 = de()("iterator"), a2 = i2.values, u2 = function(t3, n3) {
      if (t3) {
        if (t3[s2] !== a2) try {
          r2(t3, s2, a2);
        } catch (e3) {
          t3[s2] = a2;
        }
        if (o2(t3, n3, true), e2[n3]) {
          for (var u3 in i2) if (t3[u3] !== i2[u3]) try {
            r2(t3, u3, i2[u3]);
          } catch (e3) {
            t3[u3] = i2[u3];
          }
        }
      }
    };
    for (var c2 in e2) u2(t2[c2] && t2[c2].prototype, c2);
    u2(n2, "DOMTokenList");
  })(), Ta.prototype = { constructor: Ta, _container: null, _input: null, _visualCheckbox: null, _labelElement: null, _createDOM: function(t2) {
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
      var u2 = document.querySelector("label[for='" + this._options.id + "']");
      u2 instanceof HTMLLabelElement && (this._labelElement = u2);
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
  var ja, Ma, Ha, Pa, Va, Ra, Fa = {}, Ba = {};
  function Da() {
    if (ja) return Ba;
    ja = 1;
    var t2 = de();
    return Ba.f = t2, Ba;
  }
  function za() {
    if (Ra) return Fa;
    Ra = 1;
    var t2 = ai(), e2 = h(), n2 = k(), i2 = vt(), r2 = oe(), o2 = E(), s2 = Lt(), a2 = x(), u2 = le(), c2 = kt(), l2 = Le(), d2 = yt(), f2 = pe(), p2 = Br(), v2 = pt(), b2 = Fr(), m2 = Pr(), _2 = Cn(), g2 = ra(), y2 = ii(), w2 = me(), C2 = Oe(), S2 = Vr(), L2 = ft(), O2 = Qe(), I2 = qr(), N2 = ue(), A2 = Je(), T2 = Ye(), j2 = he(), M2 = de(), H2 = Da(), P2 = (function() {
      if (Ha) return Ma;
      Ha = 1;
      var t3 = No(), e3 = le(), n3 = Da(), i3 = Oe().f;
      return Ma = function(r3) {
        var o3 = t3.Symbol || (t3.Symbol = {});
        e3(o3, r3) || i3(o3, r3, { value: n3.f(r3) });
      };
    })(), V2 = (function() {
      if (Va) return Pa;
      Va = 1;
      var t3 = k(), e3 = wt(), n3 = de(), i3 = Qe();
      return Pa = function() {
        var r3 = e3("Symbol"), o3 = r3 && r3.prototype, s3 = o3 && o3.valueOf, a3 = n3("toPrimitive");
        o3 && !o3[a3] && i3(o3, a3, function(e4) {
          return t3(s3, this);
        }, { arity: 1 });
      };
    })(), R2 = fs(), F2 = Xe(), B2 = vi().forEach, D2 = A2("hidden"), z2 = "Symbol", U2 = "prototype", G2 = F2.set, q2 = F2.getterFor(z2), W2 = Object[U2], K2 = e2.Symbol, $2 = K2 && K2[U2], J2 = e2.RangeError, Y2 = e2.TypeError, X2 = e2.QObject, Z2 = w2.f, Q2 = C2.f, tt2 = g2.f, et2 = L2.f, nt2 = i2([].push), it2 = N2("symbols"), rt2 = N2("op-symbols"), ot2 = N2("wks"), st2 = !X2 || !X2[U2] || !X2[U2].findChild, at2 = function(t3, e3, n3) {
      var i3 = Z2(W2, e3);
      i3 && delete W2[e3], Q2(t3, e3, n3), i3 && t3 !== W2 && Q2(W2, e3, i3);
    }, ut2 = o2 && a2(function() {
      return 7 !== b2(Q2({}, "a", { get: function() {
        return Q2(this, "a", { value: 7 }).a;
      } })).a;
    }) ? at2 : Q2, ct2 = function(t3, e3) {
      var n3 = it2[t3] = b2($2);
      return G2(n3, { type: z2, tag: t3, description: e3 }), o2 || (n3.description = e3), n3;
    }, lt2 = function(t3, e3, n3) {
      t3 === W2 && lt2(rt2, e3, n3), l2(t3);
      var i3 = f2(e3);
      return l2(n3), u2(it2, i3) ? (n3.enumerable ? (u2(t3, D2) && t3[D2][i3] && (t3[D2][i3] = false), n3 = b2(n3, { enumerable: v2(0, false) })) : (u2(t3, D2) || Q2(t3, D2, v2(1, b2(null))), t3[D2][i3] = true), ut2(t3, i3, n3)) : Q2(t3, i3, n3);
    }, ht2 = function(t3, e3) {
      l2(t3);
      var i3 = d2(e3), r3 = m2(i3).concat(_t2(i3));
      return B2(r3, function(e4) {
        o2 && !n2(dt2, i3, e4) || lt2(t3, e4, i3[e4]);
      }), t3;
    }, dt2 = function(t3) {
      var e3 = f2(t3), i3 = n2(et2, this, e3);
      return !(this === W2 && u2(it2, e3) && !u2(rt2, e3)) && (!(i3 || !u2(this, e3) || !u2(it2, e3) || u2(this, D2) && this[D2][e3]) || i3);
    }, bt2 = function(t3, e3) {
      var n3 = d2(t3), i3 = f2(e3);
      if (n3 !== W2 || !u2(it2, i3) || u2(rt2, i3)) {
        var r3 = Z2(n3, i3);
        return !r3 || !u2(it2, i3) || u2(n3, D2) && n3[D2][i3] || (r3.enumerable = true), r3;
      }
    }, mt2 = function(t3) {
      var e3 = tt2(d2(t3)), n3 = [];
      return B2(e3, function(t4) {
        u2(it2, t4) || u2(T2, t4) || nt2(n3, t4);
      }), n3;
    }, _t2 = function(t3) {
      var e3 = t3 === W2, n3 = tt2(e3 ? rt2 : d2(t3)), i3 = [];
      return B2(n3, function(t4) {
        !u2(it2, t4) || e3 && !u2(W2, t4) || nt2(i3, it2[t4]);
      }), i3;
    };
    return s2 || (K2 = function() {
      if (c2($2, this)) throw new Y2("Symbol is not a constructor");
      var t3 = arguments.length && void 0 !== arguments[0] ? p2(arguments[0]) : void 0, i3 = j2(t3), r3 = function(t4) {
        var o3 = void 0 === this ? e2 : this;
        o3 === W2 && n2(r3, rt2, t4), u2(o3, D2) && u2(o3[D2], i3) && (o3[D2][i3] = false);
        var s3 = v2(1, t4);
        try {
          ut2(o3, i3, s3);
        } catch (t5) {
          if (!(t5 instanceof J2)) throw t5;
          at2(o3, i3, s3);
        }
      };
      return o2 && st2 && ut2(W2, i3, { configurable: true, set: r3 }), ct2(i3, t3);
    }, O2($2 = K2[U2], "toString", function() {
      return q2(this).tag;
    }), O2(K2, "withoutSetter", function(t3) {
      return ct2(j2(t3), t3);
    }), L2.f = dt2, C2.f = lt2, S2.f = ht2, w2.f = bt2, _2.f = g2.f = mt2, y2.f = _t2, H2.f = function(t3) {
      return ct2(M2(t3), t3);
    }, o2 && (I2($2, "description", { configurable: true, get: function() {
      return q2(this).description;
    } }), r2 || O2(W2, "propertyIsEnumerable", dt2, { unsafe: true }))), t2({ global: true, constructor: true, wrap: true, forced: !s2, sham: !s2 }, { Symbol: K2 }), B2(m2(ot2), function(t3) {
      P2(t3);
    }), t2({ target: z2, stat: true, forced: !s2 }, { useSetter: function() {
      st2 = true;
    }, useSimple: function() {
      st2 = false;
    } }), t2({ target: "Object", stat: true, forced: !s2, sham: !o2 }, { create: function(t3, e3) {
      return void 0 === e3 ? b2(t3) : ht2(b2(t3), e3);
    }, defineProperty: lt2, defineProperties: ht2, getOwnPropertyDescriptor: bt2 }), t2({ target: "Object", stat: true, forced: !s2 }, { getOwnPropertyNames: mt2 }), V2(), R2(K2, z2), T2[D2] = true, Fa;
  }
  var Ua, Ga, qa, Wa = {};
  function Ka() {
    if (Ga) return Ua;
    Ga = 1;
    var t2 = Lt();
    return Ua = t2 && !!Symbol.for && !!Symbol.keyFor;
  }
  var $a, Ja = {};
  var Ya, Xa, Za, Qa, tu, eu, nu, iu, ru, ou = {};
  function su() {
    if (ru) return ou;
    ru = 1;
    var t2 = ai(), e2 = wt(), n2 = (function() {
      if (Xa) return Ya;
      Xa = 1;
      var t3 = w(), e3 = Function.prototype, n3 = e3.apply, i3 = e3.call;
      return Ya = "object" == typeof Reflect && Reflect.apply || (t3 ? i3.bind(n3) : function() {
        return i3.apply(n3, arguments);
      }), Ya;
    })(), i2 = k(), r2 = vt(), o2 = x(), s2 = ci(), a2 = xt(), u2 = (function() {
      if (Qa) return Za;
      Qa = 1;
      var t3 = Et(), e3 = Xe().get;
      return Za = function(n3) {
        if (!t3(n3)) return false;
        var i3 = e3(n3);
        return !!i3 && "RawJSON" === i3.type;
      };
    })(), c2 = It(), l2 = bt(), h2 = Br(), d2 = Ui(), f2 = (function() {
      if (eu) return tu;
      eu = 1;
      var t3 = vt(), e3 = le(), n3 = SyntaxError, i3 = parseInt, r3 = String.fromCharCode, o3 = t3("".charAt), s3 = t3("".slice), a3 = t3(/./.exec), u3 = { '\\"': '"', "\\\\": "\\", "\\/": "/", "\\b": "\b", "\\f": "\f", "\\n": "\n", "\\r": "\r", "\\t": "	" }, c3 = /^[\da-f]{4}$/i, l3 = /^[\u0000-\u001F]$/;
      return tu = function(t4, h3) {
        for (var d3 = true, f3 = ""; h3 < t4.length; ) {
          var p3 = o3(t4, h3);
          if ("\\" === p3) {
            var v3 = s3(t4, h3, h3 + 2);
            if (e3(u3, v3)) f3 += u3[v3], h3 += 2;
            else {
              if ("\\u" !== v3) throw new n3('Unknown escape sequence: "' + v3 + '"');
              var b3 = s3(t4, h3 += 2, h3 + 4);
              if (!a3(c3, b3)) throw new n3("Bad Unicode escape at: " + h3);
              f3 += r3(i3(b3, 16)), h3 += 4;
            }
          } else {
            if ('"' === p3) {
              d3 = false, h3++;
              break;
            }
            if (a3(l3, p3)) throw new n3("Bad control character in string literal at: " + h3);
            f3 += p3, h3++;
          }
        }
        if (d3) throw new n3("Unterminated string at: " + h3);
        return { value: f3, end: h3 };
      };
    })(), p2 = he(), v2 = Lt(), b2 = (function() {
      if (iu) return nu;
      iu = 1;
      var t3 = x();
      return nu = !t3(function() {
        var t4 = "9007199254740993", e3 = JSON.rawJSON(t4);
        return !JSON.isRawJSON(e3) || JSON.stringify(e3) !== t4;
      });
    })(), m2 = String, _2 = e2("JSON", "stringify"), g2 = r2(/./.exec), y2 = r2("".charAt), E2 = r2("".charCodeAt), C2 = r2("".replace), S2 = r2("".slice), L2 = r2([].push), O2 = r2(1.1.toString), I2 = /[\uD800-\uDFFF]/g, N2 = /^[\uD800-\uDBFF]$/, A2 = /^[\uDC00-\uDFFF]$/, T2 = p2(), j2 = T2.length, M2 = !v2 || o2(function() {
      var t3 = e2("Symbol")("stringify detection");
      return "[null]" !== _2([t3]) || "{}" !== _2({ a: t3 }) || "{}" !== _2(Object(t3));
    }), H2 = o2(function() {
      return '"\\udf06\\ud834"' !== _2("\uDF06\uD834") || '"\\udead"' !== _2("\uDEAD");
    }), P2 = M2 ? function(t3, e3) {
      var r3 = d2(arguments), o3 = R2(e3);
      if (a2(o3) || void 0 !== t3 && !c2(t3)) return r3[1] = function(t4, e4) {
        if (a2(o3) && (e4 = i2(o3, this, m2(t4), e4)), !c2(e4)) return e4;
      }, n2(_2, null, r3);
    } : _2, V2 = function(t3, e3, n3) {
      var i3 = y2(n3, e3 - 1), r3 = y2(n3, e3 + 1);
      return g2(N2, t3) && !g2(A2, r3) || g2(A2, t3) && !g2(N2, i3) ? "\\u" + O2(E2(t3, 0), 16) : t3;
    }, R2 = function(t3) {
      if (a2(t3)) return t3;
      if (s2(t3)) {
        for (var e3 = t3.length, n3 = [], i3 = 0; i3 < e3; i3++) {
          var r3 = t3[i3];
          "string" == typeof r3 ? L2(n3, r3) : "number" != typeof r3 && "Number" !== l2(r3) && "String" !== l2(r3) || L2(n3, h2(r3));
        }
        var o3 = n3.length, u3 = true;
        return function(t4, e4) {
          if (u3) return u3 = false, e4;
          if (s2(this)) return e4;
          for (var i4 = 0; i4 < o3; i4++) if (n3[i4] === t4) return e4;
        };
      }
    };
    return _2 && t2({ target: "JSON", stat: true, arity: 3, forced: M2 || H2 || !b2 }, { stringify: function(t3, e3, n3) {
      var r3 = R2(e3), o3 = [], s3 = P2(t3, function(t4, e4) {
        var n4 = a2(r3) ? i2(r3, this, m2(t4), e4) : e4;
        return !b2 && u2(n4) ? T2 + (L2(o3, n4.rawJSON) - 1) : n4;
      }, n3);
      if ("string" != typeof s3) return s3;
      if (H2 && (s3 = C2(s3, I2, V2)), b2) return s3;
      for (var c3 = "", l3 = s3.length, h3 = 0; h3 < l3; h3++) {
        var d3 = y2(s3, h3);
        if ('"' === d3) {
          var p3 = f2(s3, ++h3).end - 1, v3 = S2(s3, h3, p3);
          c3 += S2(v3, 0, j2) === T2 ? o3[S2(v3, j2)] : '"' + v3 + '"', h3 = p3;
        } else c3 += d3;
      }
      return c3;
    } }), ou;
  }
  var au, uu, cu = {};
  uu || (uu = 1, za(), (function() {
    if (qa) return Wa;
    qa = 1;
    var t2 = ai(), e2 = wt(), n2 = le(), i2 = Br(), r2 = ue(), o2 = Ka(), s2 = r2("string-to-symbol-registry"), a2 = r2("symbol-to-string-registry");
    t2({ target: "Symbol", stat: true, forced: !o2 }, { for: function(t3) {
      var r3 = i2(t3);
      if (n2(s2, r3)) return s2[r3];
      var o3 = e2("Symbol")(r3);
      return s2[r3] = o3, a2[o3] = r3, o3;
    } });
  })(), (function() {
    if ($a) return Ja;
    $a = 1;
    var t2 = ai(), e2 = le(), n2 = It(), i2 = Nt(), r2 = ue(), o2 = Ka(), s2 = r2("symbol-to-string-registry");
    t2({ target: "Symbol", stat: true, forced: !o2 }, { keyFor: function(t3) {
      if (!n2(t3)) throw new TypeError(i2(t3) + " is not a symbol");
      if (e2(s2, t3)) return s2[t3];
    } });
  })(), su(), (function() {
    if (au) return cu;
    au = 1;
    var t2 = ai(), e2 = Lt(), n2 = x(), i2 = ii(), r2 = ce();
    t2({ target: "Object", stat: true, forced: !e2 || n2(function() {
      i2.f(1);
    }) }, { getOwnPropertySymbols: function(t3) {
      var e3 = i2.f;
      return e3 ? e3(r2(t3)) : [];
    } });
  })());
  var lu, hu = {};
  !(function() {
    if (lu) return hu;
    lu = 1;
    var t2 = ai(), e2 = E(), n2 = h(), i2 = vt(), r2 = le(), o2 = xt(), s2 = kt(), a2 = Br(), u2 = qr(), c2 = oi(), l2 = n2.Symbol, d2 = l2 && l2.prototype;
    if (e2 && o2(l2) && (!("description" in d2) || void 0 !== l2().description)) {
      var f2 = {}, p2 = function() {
        var t3 = arguments.length < 1 || void 0 === arguments[0] ? void 0 : a2(arguments[0]), e3 = s2(d2, this) ? new l2(t3) : void 0 === t3 ? l2() : l2(t3);
        return "" === t3 && (f2[e3] = true), e3;
      };
      c2(p2, l2), p2.prototype = d2, d2.constructor = p2;
      var v2 = "Symbol(description detection)" === String(l2("description detection")), b2 = i2(d2.valueOf), m2 = i2(d2.toString), _2 = /^Symbol\((.*)\)[^)]+$/, g2 = i2("".replace), y2 = i2("".slice);
      u2(d2, "description", { configurable: true, get: function() {
        var t3 = b2(this);
        if (r2(f2, t3)) return "";
        var e3 = m2(t3), n3 = v2 ? y2(e3, 7, -1) : g2(e3, _2, "$1");
        return "" === n3 ? void 0 : n3;
      } }), t2({ global: true, constructor: true, forced: true }, { Symbol: p2 });
    }
  })();
  var du, fu = {};
  !(function() {
    if (du) return fu;
    du = 1;
    var t2 = ai(), e2 = vi().find, n2 = cs(), i2 = "find", r2 = true;
    i2 in [] && Array(1)[i2](function() {
      r2 = false;
    }), t2({ target: "Array", proto: true, forced: r2 }, { find: function(t3) {
      return e2(this, t3, arguments.length > 1 ? arguments[1] : void 0);
    } }), n2(i2);
  })();
  var pu, vu, bu, mu, _u, gu = {};
  function yu() {
    if (vu) return pu;
    vu = 1;
    var t2 = Le(), e2 = ha();
    return pu = function(n2, i2, r2, o2) {
      try {
        return o2 ? i2(t2(r2)[0], r2[1]) : i2(r2);
      } catch (t3) {
        e2(n2, "throw", t3);
      }
    };
  }
  !(function() {
    if (_u) return gu;
    _u = 1;
    var t2 = ai(), e2 = (function() {
      if (mu) return bu;
      mu = 1;
      var t3 = ui(), e3 = k(), n2 = ce(), i2 = yu(), r2 = ua(), o2 = di(), s2 = En(), a2 = zi(), u2 = la(), c2 = ca(), l2 = Array;
      return bu = function(h2) {
        var d2 = n2(h2), f2 = o2(this), p2 = arguments.length, v2 = p2 > 1 ? arguments[1] : void 0, b2 = void 0 !== v2;
        b2 && (v2 = t3(v2, p2 > 2 ? arguments[2] : void 0));
        var m2, _2, g2, y2, x2, E2, w2 = c2(d2), k2 = 0;
        if (!w2 || this === l2 && r2(w2)) for (m2 = s2(d2), _2 = f2 ? new this(m2) : l2(m2); m2 > k2; k2++) E2 = b2 ? v2(d2[k2], k2) : d2[k2], a2(_2, k2, E2);
        else for (_2 = f2 ? new this() : [], x2 = (y2 = u2(d2, w2)).next; !(g2 = e3(x2, y2)).done; k2++) E2 = b2 ? i2(y2, v2, [g2.value, k2], true) : g2.value, a2(_2, k2, E2);
        return _2.length = k2, _2;
      }, bu;
    })();
    t2({ target: "Array", stat: true, forced: !pa()(function(t3) {
      Array.from(t3);
    }) }, { from: e2 });
  })();
  var xu, Eu = {};
  !(function() {
    if (xu) return Eu;
    xu = 1;
    var t2 = ai(), e2 = vi().map;
    t2({ target: "Array", proto: true, forced: !bi()("map") }, { map: function(t3) {
      return e2(this, t3, arguments.length > 1 ? arguments[1] : void 0);
    } });
  })();
  var wu, ku, Cu, Su, Lu, Ou, Iu, Nu, Au, Tu = {};
  !(function() {
    if (Au) return Tu;
    Au = 1;
    var t2 = ai(), e2 = vt(), n2 = At(), i2 = ce(), r2 = En(), o2 = ws(), s2 = Br(), a2 = x(), u2 = (function() {
      if (ku) return wu;
      ku = 1;
      var t3 = Ui(), e3 = Math.floor, n3 = function(i3, r3) {
        var o3 = i3.length;
        if (o3 < 8) for (var s3, a3, u3 = 1; u3 < o3; ) {
          for (a3 = u3, s3 = i3[u3]; a3 && r3(i3[a3 - 1], s3) > 0; ) i3[a3] = i3[--a3];
          a3 !== u3++ && (i3[a3] = s3);
        }
        else for (var c3 = e3(o3 / 2), l3 = n3(t3(i3, 0, c3), r3), h3 = n3(t3(i3, c3), r3), d3 = l3.length, f3 = h3.length, p3 = 0, v3 = 0; p3 < d3 || v3 < f3; ) i3[p3 + v3] = p3 < d3 && v3 < f3 ? r3(l3[p3], h3[v3]) <= 0 ? l3[p3++] : h3[v3++] : p3 < d3 ? l3[p3++] : h3[v3++];
        return i3;
      };
      return wu = n3;
    })(), c2 = ji(), l2 = (function() {
      if (Su) return Cu;
      Su = 1;
      var t3 = Ct().match(/firefox\/(\d+)/i);
      return Cu = !!t3 && +t3[1];
    })(), h2 = (function() {
      if (Ou) return Lu;
      Ou = 1;
      var t3 = Ct();
      return Lu = /MSIE|Trident/.test(t3);
    })(), d2 = St(), f2 = (function() {
      if (Nu) return Iu;
      Nu = 1;
      var t3 = Ct().match(/AppleWebKit\/(\d+)\./);
      return Iu = !!t3 && +t3[1];
    })(), p2 = [], v2 = e2(p2.sort), b2 = e2(p2.push), m2 = a2(function() {
      p2.sort(void 0);
    }), _2 = a2(function() {
      p2.sort(null);
    }), g2 = c2("sort"), y2 = !a2(function() {
      if (d2) return d2 < 70;
      if (!(l2 && l2 > 3)) {
        if (h2) return true;
        if (f2) return f2 < 603;
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
    t2({ target: "Array", proto: true, forced: m2 || !_2 || !g2 || !y2 }, { sort: function(t3) {
      void 0 !== t3 && n2(t3);
      var e3 = i2(this);
      if (y2) return void 0 === t3 ? v2(e3) : v2(e3, t3);
      var a3, c3, l3 = [], h3 = r2(e3);
      for (c3 = 0; c3 < h3; c3++) c3 in e3 && b2(l3, e3[c3]);
      for (u2(l3, /* @__PURE__ */ (function(t4) {
        return function(e4, n3) {
          return void 0 === n3 ? -1 : void 0 === e4 ? 1 : void 0 !== t4 ? +t4(e4, n3) || 0 : s2(e4) > s2(n3) ? 1 : -1;
        };
      })(t3)), a3 = r2(l3), c3 = 0; c3 < a3; ) e3[c3] = l3[c3++];
      for (; c3 < h3; ) o2(e3, c3++);
      return e3;
    } });
  })();
  var ju, Mu;
  Mu || (Mu = 1, ju || (ju = 1, va()("Set", function(t2) {
    return function() {
      return t2(this, arguments.length ? arguments[0] : void 0);
    };
  }, ma())));
  var Hu = /* @__PURE__ */ new WeakSet(), Pu = (function() {
    return r(function t2(r2, o2) {
      var s2 = this;
      if (n(this, t2), i(this, Hu), "string" == typeof r2) {
        var a2 = document.getElementById(r2);
        if (a2 instanceof HTMLSelectElement) r2 = a2;
        else {
          if (!(a2 instanceof HTMLElement)) throw new Error("Invalid selectbox");
          this._container = a2;
        }
      } else r2 instanceof HTMLElement && (this._container = r2);
      if (r2 instanceof HTMLSelectElement) this._selectbox = r2, this._container = document.createElement("div");
      else if (this._container instanceof HTMLElement == false) throw new Error("Invalid container");
      this._options = Object.assign(o2, { placeholder: o2.placeholder || "Select...", searchable: o2.searchable || false, sortable: o2.sortable || false, multiple: o2.multiple || false, description: o2.description || "" }), this._selectedValues = /* @__PURE__ */ new Set(), this.isOpen = false, this._items = [], this._customItems = [], this._subscribers = [], this._boundHandles = { toggle: function(t3) {
        e(Hu, s2, Fu).call(s2, t3);
      }, search: function(t3) {
        e(Hu, s2, Du).call(s2, t3);
      }, close: function(t3) {
        t3.target instanceof HTMLElement && !s2._container.contains(t3.target) && !t3.target.classList.contains("selectbox-option") && e(Hu, s2, Bu).call(s2);
      }, keydown: function(t3) {
        e(Hu, s2, Uu).call(s2, t3);
      }, dropdownClick: function(t3) {
        e(Hu, s2, qu).call(s2, t3);
      } }, this._optionsContainer = null, this.searchInput = null, this._select = document.createElement("div"), this._header = document.createElement("div"), this._selectedText = document.createElement("span"), this._arrow = document.createElement("span"), this._dropdown = document.createElement("div"), e(Hu, this, Vu).call(this), e(Hu, this, Ru).call(this), e(Hu, this, Gu).call(this), Yu._.add(this);
    }, [{ key: "openDropdown", value: function() {
      this.isOpen || document.addEventListener("click", this._boundHandles.close), this.isOpen = true, this._dropdown.style.display = "block", this._arrow.className += " selectbox-arrow-open", this._header.className += " selectbox-header-open", this.searchInput && setTimeout(/* @__PURE__ */ (function(t2) {
        return function() {
          t2.searchInput && t2.searchInput.focus();
        };
      })(this), 100), e(Hu, this, Gu).call(this);
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
      i2 && (this._options.multiple || this._selectedValues.clear(), this._selectedValues.add(t2)), e(Hu, this, Wu).call(this);
    } }, { key: "addItems", value: function(t2, n2) {
      var i2 = this;
      t2.forEach(function(t3, e2) {
        if (!i2._items.some(function(e3) {
          return e3 && e3.value === t3[0];
        })) {
          var r2 = n2 ? t3[0] === n2 : 0 === e2;
          r2 && (i2._options.multiple || i2._selectedValues.clear(), i2._selectedValues.add(t3[0])), i2._items.push({ value: t3[0], text: t3[1], selected: r2 });
        }
      }, this), this.isOpen && e(Hu, this, Gu).call(this), e(Hu, this, Wu).call(this);
    } }, { key: "addCustomItem", value: function(t2, e2) {
      this._customItems.push({ value: t2, text: e2, selected: false });
    } }, { key: "addSeparator", value: function() {
      this._items.push(null);
    } }, { key: "removeItem", value: function(t2) {
      this._items = this._items.filter(function(e2) {
        return null === e2 || e2.value !== t2;
      }), this._customItems = this._customItems.filter(function(e2) {
        return null === e2 || e2.value !== t2;
      }), this._selectedValues.delete(t2), e(Hu, this, Wu).call(this);
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
          e(Hu, this, Bu).call(this);
        }
        e(Hu, this, Wu).call(this), n2 || e(Hu, this, Ku).call(this, r2, true);
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
        e(Hu, this, Wu).call(this), n2 || e(Hu, this, Ku).call(this, r2, true);
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
      e(Hu, this, Wu).call(this), e(Hu, this, Gu).call(this);
    } }, { key: "destroy", value: function() {
      this._subscribers = [], Yu._.delete(this);
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
  function Vu() {
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
        var o2 = e(Hu, this, Ju).call(this, this._selectbox);
        this.addItems(o2.values, o2.selectedValue), this._selectbox.remove();
      }
    }
  }
  function Ru() {
    this._header.addEventListener("click", this._boundHandles.toggle), this.searchInput && this.searchInput.addEventListener("input", this._boundHandles.search), this._dropdown.addEventListener("click", this._boundHandles.dropdownClick), this._dropdown.addEventListener("wheel", function(t2) {
      t2.stopPropagation();
    }), this._header.addEventListener("keydown", this._boundHandles.keydown), this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
  }
  function Fu(t2) {
    if (t2 && t2.stopPropagation(), this.isOpen ? e(Hu, this, Bu).call(this) : this.openDropdown(), t2 && "click" === t2.type) {
      var n2, i2 = o(Yu._);
      try {
        for (i2.s(); !(n2 = i2.n()).done; ) {
          var r2 = n2.value;
          r2.isOpen && r2 !== this && e(Hu, r2, Bu).call(r2);
        }
      } catch (t3) {
        i2.e(t3);
      } finally {
        i2.f();
      }
    }
  }
  function Bu() {
    this.isOpen && document && this._boundHandles && document.removeEventListener("click", this._boundHandles.close), this.isOpen = false, this._dropdown.style.display = "none";
    for (var t2 = this._arrow.className.split(" "), e2 = [], n2 = 0; n2 < t2.length; n2++) "selectbox-arrow-open" !== t2[n2] && e2.push(t2[n2]);
    this._arrow.className = e2.join(" ");
    var i2 = this._header.className.split(" "), r2 = [];
    for (n2 = 0; n2 < i2.length; n2++) "selectbox-header-open" !== i2[n2] && r2.push(i2[n2]);
    this._header.className = r2.join(" "), this.searchInput && (this.searchInput.value = "");
  }
  function Du(t2) {
    var n2 = t2.target;
    if (n2 instanceof HTMLInputElement) {
      var i2 = n2.value.toLowerCase();
      e(Hu, this, Gu).call(this, i2);
    }
  }
  function zu(t2) {
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
        var u2 = (s2 - 1 + r2.length) % r2.length;
        this._selectedValues.clear(), n2 = r2[u2], this._selectedValues.add(n2.value);
      }
      else if (0 === this._selectedValues.size && r2.length > 0) n2 = r2[0], this._selectedValues.add(n2.value);
      else {
        for (o2 = Array.from(this._selectedValues), s2 = -1, a2 = 0; a2 < r2.length; a2++) if (r2[a2].value === o2[0]) {
          s2 = a2;
          break;
        }
        var c2 = (s2 + 1) % r2.length;
        c2 === r2.length && (c2 = 0), this._selectedValues.clear(), n2 = r2[c2], this._selectedValues.add(n2.value);
      }
      e(Hu, this, Wu).call(this), e(Hu, this, Gu).call(this, i2, true), e(Hu, this, Ku).call(this, n2.value, true);
    }
  }
  function Uu(t2) {
    switch (t2.key || t2.keyCode) {
      case "Enter":
      case 13:
        t2.preventDefault(), e(Hu, this, Fu).call(this, t2);
        break;
      case "Escape":
      case 27:
      case "Tab":
      case 9:
        e(Hu, this, Bu).call(this);
        break;
      case "ArrowDown":
      case 40:
        t2.preventDefault(), e(Hu, this, zu).call(this, "down");
        break;
      case "ArrowUp":
      case 38:
        t2.preventDefault(), e(Hu, this, zu).call(this, "up");
    }
  }
  function Gu(t2, e2) {
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
          var u2 = document.createElement("label");
          if (u2.className += " selectbox-option-text", u2.textContent = s2.text, this._options.multiple) {
            a2.className += " selectbox-option-checkbox";
            var c2 = document.createElement("input");
            c2.type = "checkbox", c2.id = "checkbox-" + s2.value, c2.className += " selectbox-checkbox", c2.checked = this._selectedValues.has(s2.value), a2.appendChild(c2);
            var l2 = document.createElement("span");
            l2.className = "checkbox-visual", l2.setAttribute("aria-hidden", "true");
            var h2 = "http://www.w3.org/2000/svg", d2 = document.createElementNS(h2, "svg");
            d2.setAttribute("viewBox", "0 0 10 8"), d2.setAttribute("class", "checkbox-checkmark");
            var f2 = document.createElementNS(h2, "path");
            f2.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), f2.setAttribute("fill", "none"), f2.setAttribute("stroke", "currentColor"), f2.setAttribute("stroke-width", "2"), d2.appendChild(f2), l2.appendChild(d2), a2.appendChild(l2);
          }
          a2.appendChild(u2), r2.appendChild(a2);
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
        var b2 = this._customItems[o2], m2 = document.createElement("label");
        m2.className += " selectbox-custom-option", m2.setAttribute("data-value", b2.value), m2.setAttribute("for", b2.value);
        var _2 = document.createElement("span");
        _2.className += " selectbox-option-text", _2.textContent = b2.text, m2.appendChild(_2), r2.appendChild(m2);
      }
      if (this._optionsContainer.appendChild(r2), e2 && this.isOpen && this._optionsContainer && n2) try {
        n2.scrollIntoView && n2.scrollIntoView({ block: "nearest" });
      } catch (t3) {
        console.error(t3);
      }
    }
  }
  function qu(t2) {
    var n2 = t2.target || t2.srcElement;
    if (n2 && n2 instanceof HTMLElement) {
      for (var i2 = null, r2 = n2.className.split(" "), o2 = false, s2 = 0; s2 < r2.length; s2++) {
        if ("selectbox-option" === r2[s2]) {
          o2 = true;
          break;
        }
        if ("selectbox-custom-option" === r2[s2]) {
          var a2 = n2.getAttribute("data-value");
          if (a2) return t2.stopPropagation(), e(Hu, this, $u).call(this, a2), void e(Hu, this, Bu).call(this);
          break;
        }
      }
      if (o2) i2 = n2;
      else if (n2.parentNode && n2.parentNode instanceof HTMLElement) {
        var u2 = n2.parentNode.className.split(" "), c2 = false;
        for (s2 = 0; s2 < u2.length; s2++) {
          if ("selectbox-option" === u2[s2]) {
            c2 = true;
            break;
          }
          if ("selectbox-custom-option" === u2[s2]) {
            var l2 = n2.parentNode.getAttribute("data-value");
            if (l2) return t2.stopPropagation(), e(Hu, this, $u).call(this, l2), void e(Hu, this, Bu).call(this);
            break;
          }
        }
        c2 && (i2 = n2.parentNode);
      }
      if (i2 instanceof HTMLDivElement) {
        var h2 = i2.getAttribute("data-value");
        if (null !== h2) {
          var d2 = true;
          this._options.multiple ? this._selectedValues.has(h2) ? (this.unselectItems(h2, true), d2 = false) : this.selectItems(h2, true) : (this.selectItems(h2, true), e(Hu, this, Bu).call(this)), e(Hu, this, Wu).call(this), e(Hu, this, Ku).call(this, h2, d2);
        }
      }
    }
  }
  function Wu() {
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
  function Ku(t2, e2) {
    for (var n2 = Array.from(this._selectedValues), i2 = [], r2 = 0; r2 < this._items.length; r2++) {
      var o2 = this._items[r2];
      o2 && this._selectedValues.has(o2.value) && i2.push(o2);
    }
    var s2 = { values: n2, items: i2, current: t2, enabled: e2 };
    this._subscribers.forEach(function(t3) {
      t3({ type: "selectbox:change", detail: s2 });
    });
  }
  function $u(t2) {
    var e2 = { values: [], current: t2, enabled: false };
    this._subscribers.forEach(function(t3) {
      t3({ type: "selectbox:custom", detail: e2 });
    });
  }
  function Ju(t2) {
    var e2 = { values: Array.from(t2.options).map(function(t3) {
      return [t3.value, t3.text];
    }) }, n2 = t2.value;
    return n2 && (e2.selectedValue = n2), e2;
  }
  var Yu = { _: /* @__PURE__ */ new Set() };
  document.getElementById("loader");
  var Xu, Zu = [["appendix", "Appendix"], ["article", "Article"], ["book", "Book"], ["chapter", "Chapter"], ["column", "Column"], ["figure", "Figure"], ["folio", "Folio"], ["issue", "Issue"], ["line", "Line"], ["note", "Note"], ["opus", "Opus"], ["page", "Page"], ["paragraph", "Paragraph"], ["part", "Part"], ["rule", "Rule"], ["section", "Section"], ["sub-verbo", "Sub verbo"], ["table", "Table"], ["title", "Title"], ["verses", "Verses"], ["volume", "Volume"]], Qu = function(t2) {
    var e2 = "";
    t2["background-toolbar"] && (e2 += ".loader-body,\n.loader-bg { background-color: " + t2["background-toolbar"] + "; }\n", e2 += ".loader-body {     box-shadow: 0 0 99px 99px " + t2["background-toolbar"] + "; }\n"), t2["background-loader"] && (e2 += ".loader-image { color: " + t2["background-loader"] + "; }\n"), t2["background-normal"] && (e2 += ".custom-button-secondary-icon,\n.custom-button-secondary,\n.input-field-element,\n.selectbox-search-input,\n.selectbox-header,\n.selectbox-dropdown,\n.radio-visual, \n.checkbox-visual, \n.message { background-color: " + t2["background-normal"] + "; }\n"), t2["text-inverse"] && (e2 += ".custom-button-primary { color: " + t2["text-inverse"] + "; }\n"), t2["border-regular-control"] && (e2 += ".custom-button-icon-only:active:not(.custom-button-disabled),\n.custom-button-secondary-icon:active:not(.custom-button-disabled),\n.custom-button-secondary:active:not(.custom-button-disabled),\n.custom-button-icon-only:hover:not(.custom-button-disabled),\n.custom-button-secondary-icon:hover:not(.custom-button-disabled),\n.custom-button-secondary:hover:not(.custom-button-disabled),\n.custom-button-secondary,\n.custom-button-secondary-icon,\n.input-field-element,\n.checkbox-visual,\n.radio-visual,\n.selectbox-header,\n.selectbox-dropdown,\n.selectbox-search-input:focus,\n.message { border-color: " + t2["border-regular-control"] + "; }\n", e2 += ".selectbox-search,\n.selectbox-option-divider { border-color: " + t2["border-regular-control"] + " !important; }\n"), t2["border-error"] && (e2 += ".input-field-invalid .input-field-element { border-color: " + t2["border-error"] + "; }\n"), t2["border-control-focus"] && (e2 += ".custom-button-icon-only:focus:not(:active):not(:hover),\n.custom-button-secondary-icon:focus:not(:active):not(:hover),\n.custom-button-secondary:focus:not(:active):not(:hover),\n.input-field-element:focus,\n.input-field-focused .input-field-element,\n.selectbox-header:active,\n.selectbox-header:focus,\n.selectbox-header-open { border-color: " + t2["border-control-focus"] + "; }\n"), t2["highlight-button-hover"] && (e2 += ".custom-button-icon-only:hover:not(.custom-button-disabled),\n.custom-button-secondary-icon:hover:not(.custom-button-disabled),\n.custom-button-secondary:hover:not(.custom-button-disabled),\n.selectbox-custom-option:hover,\n.selectbox-option:hover { background-color: " + t2["highlight-button-hover"] + "; }\n"), t2["highlight-button-pressed"] && (e2 += ".custom-button-icon-only:active:not(.custom-button-disabled),\n.custom-button-secondary-icon:active:not(.custom-button-disabled),\n.custom-button-secondary:active:not(.custom-button-disabled),\n.selectbox-option-selected:hover,\n.selectbox-option-selected { background-color: " + t2["highlight-button-pressed"] + "; }\n", e2 += ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " + t2["highlight-button-pressed"] + "; }\n"), t2["highlight-primary-dialog-button-hover"] && (e2 += ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " + t2["highlight-primary-dialog-button-hover"] + "; border-color: " + t2["highlight-primary-dialog-button-hover"] + "; }\n"), t2["background-primary-dialog-button"] && (e2 += ".checkbox-indeterminate,\n.custom-button-primary { background-color: " + t2["background-primary-dialog-button"] + "; border-color: " + t2["background-primary-dialog-button"] + "; }\n"), t2["background-toolbar-additional"] && (e2 += ".custom-button-secondary-icon:disabled,\n.custom-button-secondary-icon.custom-button-disabled,\n.custom-button-secondary:disabled,\n.custom-button-secondary.custom-button-disabled { background-color: " + t2["background-toolbar-additional"] + "; border-color: " + t2["background-toolbar-additional"] + "; }\n"), t2["text-normal"] && (e2 += ".custom-button-secondary-icon,\n.custom-button-secondary,\n.custom-button-secondary-icon,\n.custom-button-icon-only,\n.selectbox-search-input,\n.loader-image,\n.input-field-element { color: " + t2["text-normal"] + "; }\n", e2 += ".input-field-search-icon svg { fill: " + t2["text-normal"] + "; }\n", e2 += ".selectbox-arrow b { border-color: " + t2["text-normal"] + "; }\n"), t2["text-secondary"] && (e2 += ".message-close:hover,\n.input-field-clear:hover { color: " + t2["text-secondary"] + "; }\n"), t2["text-tertiary"] && (e2 += ".input-field-clear,\n.message-container:hover .message-close,\n.custom-button-secondary-icon:disabled,\n.custom-button-secondary-icon.custom-button-disabled,\n.custom-button-secondary:disabled,\n.custom-button-secondary.custom-button-disabled,\n.input-field-element::placeholder,\n.selectbox-search-input::placeholder { color: " + t2["text-tertiary"] + "; }\n");
    var n2 = "11px";
    -1 !== ["theme-white", "theme-night"].indexOf(t2.name) || -1 !== ["theme-white", "theme-night"].indexOf(t2.Name) ? (n2 = "12px", e2 += ".message,\n.custom-button,\n.selectbox-header,\n.input-field-element { border-radius: 4px; }\n", e2 += ".radio--checked .radio-visual { border-width: 4px; }\n", e2 += ".checkbox-checkmark { color: " + t2["text-inverse"] + "; }\n", e2 += ".checkbox--checked .checkbox-visual { background-color: " + t2["background-primary-dialog-button"] + "; }\n", e2 += ".radio--checked .radio-visual,\n.checkbox--checked .checkbox-visual { border-color: " + t2["background-primary-dialog-button"] + "; }\n", e2 += ".radio-button-container:hover:not(.radio--checked) .radio-visual,\n.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { background-color: " + t2["highlight-button-hover"] + "; }\n", e2 += ".checkbox--checked:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + t2["highlight-primary-dialog-button-hover"] + "; background-color: " + t2["highlight-primary-dialog-button-hover"] + "; }\n", e2 += ".radio--checked:hover:not(.radio--disabled) .radio-visual { border-color: " + t2["highlight-primary-dialog-button-hover"] + "; }\n", e2 += "body { font-size: 12px; }\n") : (e2 += ".checkbox-checkmark { color: " + t2["text-normal"] + "; }\n", e2 += ".radio--checked .radio-visual { background-color: " + t2["text-normal"] + ";\n box-shadow: 0 0 0 2px" + t2["background-normal"] + " inset; }\n", e2 += ".radio-button-container:hover .radio-visual,\n.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + t2["border-control-focus"] + "; }\n"), e2 += "body, input, textarea, select, button { font-size: " + n2 + "; }\n";
    var i2 = document.getElementById("componentsStyles");
    return i2 ? (i2.innerHTML = e2, e2) : ((i2 = document.createElement("style")).id = "componentsStyles", i2.innerHTML = e2, document.getElementsByTagName("head")[0].appendChild(i2), e2);
  }, tc = function(t2) {
    return t2["background-toolbar"] || (t2["background-toolbar"] = "#f7f7f7"), t2["text-normal"] || (t2["text-normal"] = "rgb(51, 51, 51)"), t2["text-secondary"] || (t2["text-secondary"] = "#848484"), t2["highlight-button-hover"] || (t2["highlight-button-hover"] = "#e0e0e0"), t2["background-normal"] || (t2["background-normal"] = "white"), t2["background-loader"] || (t2["background-loader"] = "rgba(24, 24, 24, 0.9)"), t2["highlight-button-pressed"] || (t2["highlight-button-pressed"] = "#cbcbcb"), t2["text-inverse"] || (t2["text-inverse"] = "white"), t2["border-regular-control"] || (t2["border-regular-control"] = "#c0c0c0"), t2["border-error"] || (t2["border-error"] = "#f62211"), t2["border-control-focus"] || (t2["border-control-focus"] = "#848484"), t2["highlight-primary-dialog-button-hover"] || (t2["highlight-primary-dialog-button-hover"] = "#1c1c1c"), t2["background-primary-dialog-button"] || (t2["background-primary-dialog-button"] = "#444444"), t2["background-toolbar-additional"] || (t2["background-toolbar-additional"] = "#efefef"), t2["text-tertiary"] || (t2["text-tertiary"] = "#bdbdbd"), t2;
  };
  Xu = new ((function() {
    return r(function t2() {
      n(this, t2);
      var e2 = document.querySelector(".container");
      if (e2 instanceof HTMLElement == 0) throw new Error("container is not initialized");
      this._container = e2, this.citationObject = null, this.forms = [];
    }, [{ key: "createForm", value: function(t2) {
      var e2 = document.createElement("form");
      e2.classList.add("form"), e2.classList.add("message-container"), this._container.appendChild(e2);
      var n2 = document.createElement("button");
      n2.className = "message-close i18n", n2.textContent = "×", n2.setAttribute("aria-label", "Close"), n2.setAttribute("title", "Remove"), n2.onclick = this.removeItem.bind(this, e2, t2.id), e2.appendChild(n2);
      var i2 = document.createElement("div");
      i2.classList.add("title"), i2.textContent = t2.itemData.title, e2.appendChild(i2);
      var r2 = document.createDocumentFragment(), o2 = document.createElement("div"), s2 = document.createElement("input"), a2 = document.createElement("input"), u2 = document.createElement("div"), c2 = document.createElement("div"), l2 = document.createElement("input"), h2 = document.createElement("div"), d2 = document.createElement("input");
      r2.appendChild(u2), u2.appendChild(c2), u2.appendChild(l2);
      var f2 = "";
      r2.appendChild(o2), o2.appendChild(s2), o2.appendChild(a2), r2.appendChild(h2), h2.appendChild(d2);
      var p2 = new wo(s2, { type: "text", placeholder: "Prefix", value: t2.prefix, showClear: false }), v2 = new wo(a2, { type: "text", placeholder: "Suffix", value: t2.suffix, showClear: false }), b2 = new Pu(c2, { placeholder: "Locator" }), m2 = t2.label || "page";
      Zu.forEach(function(t3) {
        var e3 = t3[0] === m2;
        b2.addItem(t3[0], t3[1], e3), e3 && (f2 = t3[1]);
      });
      var _2 = new wo(l2, { type: "text", placeholder: f2, value: t2.locator, showClear: false }), g2 = new Ta(d2, { label: "Omit author", checked: !!t2["suppress-author"] });
      b2.subscribe(function(t3) {
        if ("selectbox:change" === t3.type && t3.detail.items) {
          var e3 = t3.detail.items[0];
          _2.setPlaceholder(e3.text);
        }
      }), this.forms.push({ omitAuthorInput: g2, prefixInput: p2, suffixInput: v2, locatorInput: _2, locatorSelectbox: b2 }), e2.appendChild(r2);
    } }, { key: "updateRemoveButtonsVisibility", value: function() {
      var t2;
      if (this.citationObject) {
        var e2 = this.citationObject.citationItems.length;
        e2 > 1 ? this._container.classList.remove("hide-remove-button") : this._container.classList.add("hide-remove-button");
        var n2 = (null === (t2 = document.querySelector("form")) || void 0 === t2 ? void 0 : t2.offsetHeight) || 0, i2 = 1 === e2 ? n2 + 12 : 2 * n2;
        window.Asc.plugin.sendToPlugin("onUpdateHeight", i2);
      }
    } }, { key: "removeItem", value: function(t2, e2) {
      this.citationObject && (this.citationObject.citationItems = this.citationObject.citationItems.filter(function(t3) {
        return t3.id !== e2;
      }), this._container.removeChild(t2), this.updateRemoveButtonsVisibility());
    } }, { key: "onThemeChanged", value: function(t2) {
      window.Asc.plugin.onThemeChangedBase(t2), tc(t2), Qu(t2);
      var e2 = "";
      e2 += "body { background-color: " + t2["background-normal"] + " !important;}\n";
      var n2 = document.getElementById("pluginStyles");
      n2 ? n2.innerHTML = e2 : ((n2 = document.createElement("style")).id = "pluginStyles", n2.innerHTML = e2, document.getElementsByTagName("head")[0].appendChild(n2));
    } }, { key: "onAttachedContent", value: function(t2) {
      var e2 = this;
      this.citationObject = t2, this.citationObject && (this.citationObject.citationItems.forEach(function(t3) {
        e2.createForm(t3);
      }), this.updateRemoveButtonsVisibility());
    } }, { key: "onClickSave", value: function() {
      for (var t2 = false, e2 = 0; e2 < this.forms.length; e2++) {
        var n2, i2 = this.forms[e2], r2 = null === (n2 = this.citationObject) || void 0 === n2 ? void 0 : n2.citationItems[e2];
        if (r2) {
          var o2 = i2.prefixInput.getValue(), s2 = i2.suffixInput.getValue(), a2 = i2.locatorSelectbox.getSelectedValue(), u2 = i2.locatorInput.getValue(), c2 = i2.omitAuthorInput.getState().checked;
          (r2.prefix || o2) && r2.prefix !== o2 && (r2.prefix = o2, t2 = true), (r2.suffix || s2) && r2.suffix !== s2 && (r2.suffix = s2, t2 = true), (r2.label || a2) && r2.label !== a2 && a2 && (r2.label = a2, t2 = true), (r2.locator || u2) && r2.locator !== u2 && (r2.locator = u2, t2 = true), !!r2["suppress-author"] !== c2 && (r2["suppress-author"] = c2, t2 = true);
        }
      }
      return t2;
    } }]);
  })())(), window.Asc.plugin.init = function() {
    window.Asc.plugin.sendToPlugin("onWindowReady", {});
  }, window.Asc.plugin.onThemeChanged = Xu.onThemeChanged.bind(Xu), window.Asc.plugin.attachEvent("onThemeChanged", Xu.onThemeChanged.bind(Xu)), window.Asc.plugin.attachEvent("onAttachedContent", Xu.onAttachedContent.bind(Xu)), window.Asc.plugin.attachEvent("onClickSave", function() {
    Xu.onClickSave() ? window.Asc.plugin.sendToPlugin("onSaveFields", Xu.citationObject) : window.Asc.plugin.sendToPlugin("onSaveFields", null);
  });
});
//# sourceMappingURL=edit-window.es5.js.map
