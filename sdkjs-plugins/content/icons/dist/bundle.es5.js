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

(function(factory) {
    typeof define === "function" && define.amd ? define(factory) : factory();
})(function() {
    "use strict";
    function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
    }
    function _assertClassBrand(e, t, n) {
        if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
        throw new TypeError("Private element is not present on this object");
    }
    function asyncGeneratorStep(n, t, e, r, o, a, c) {
        try {
            var i = n[a](c), u = i.value;
        } catch (n) {
            return void e(n);
        }
        i.done ? t(u) : Promise.resolve(u).then(r, o);
    }
    function _asyncToGenerator(n) {
        return function() {
            var t = this, e = arguments;
            return new Promise(function(r, o) {
                var a = n.apply(t, e);
                function _next(n) {
                    asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
                }
                function _throw(n) {
                    asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
                }
                _next(void 0);
            });
        };
    }
    function _checkPrivateRedeclaration(e, t) {
        if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
    function _classCallCheck(a, n) {
        if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _classPrivateFieldGet2(s, a) {
        return s.get(_assertClassBrand(s, a));
    }
    function _classPrivateFieldInitSpec(e, t, a) {
        _checkPrivateRedeclaration(e, t), t.set(e, a);
    }
    function _classPrivateFieldSet2(s, a, r) {
        return s.set(_assertClassBrand(s, a), r), r;
    }
    function _classPrivateMethodInitSpec(e, a) {
        _checkPrivateRedeclaration(e, a), a.add(e);
    }
    function _defineProperties(e, r) {
        for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), 
            Object.defineProperty(e, _toPropertyKey(o.key), o);
        }
    }
    function _createClass(e, r, t) {
        return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
            writable: false
        }), e;
    }
    function _createForOfIteratorHelper(r, e) {
        var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (!t) {
            if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
                t && (r = t);
                var n = 0, F = function() {};
                return {
                    s: F,
                    n: function() {
                        return n >= r.length ? {
                            done: true
                        } : {
                            done: false,
                            value: r[n++]
                        };
                    },
                    e: function(r) {
                        throw r;
                    },
                    f: F
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var o, a = true, u = false;
        return {
            s: function() {
                t = t.call(r);
            },
            n: function() {
                var r = t.next();
                return a = r.done, r;
            },
            e: function(r) {
                u = true, o = r;
            },
            f: function() {
                try {
                    a || null == t.return || t.return();
                } finally {
                    if (u) throw o;
                }
            }
        };
    }
    function _defineProperty(e, r, t) {
        return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: true,
            configurable: true,
            writable: true
        }) : e[r] = t, e;
    }
    function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
            var e, n, i, u, a = [], f = true, o = false;
            try {
                if (i = (t = t.call(r)).next, 0 === l) ; else for (;!(f = (e = i.call(t)).done) && (a.push(e.value), 
                a.length !== l); f = !0) ;
            } catch (r) {
                o = true, n = r;
            } finally {
                try {
                    if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                } finally {
                    if (o) throw n;
                }
            }
            return a;
        }
    }
    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function ownKeys$1(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            r && (o = o.filter(function(r) {
                return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })), t.push.apply(t, o);
        }
        return t;
    }
    function _objectSpread2(e) {
        for (var r = 1; r < arguments.length; r++) {
            var t = null != arguments[r] ? arguments[r] : {};
            r % 2 ? ownKeys$1(Object(t), true).forEach(function(r) {
                _defineProperty(e, r, t[r]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
            });
        }
        return e;
    }
    function _regenerator() {
        var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
        function i(r, n, o, i) {
            var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype);
            return _regeneratorDefine(u, "_invoke", function(r, n, o) {
                var i, c, u, f = 0, p = o || [], y = false, G = {
                    p: 0,
                    n: 0,
                    v: e,
                    a: d,
                    f: d.bind(e, 4),
                    d: function(t, r) {
                        return i = t, c = 0, u = e, G.n = r, a;
                    }
                };
                function d(r, n) {
                    for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
                        var o, i = p[t], d = G.p, l = i[2];
                        r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, 
                        G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, 
                        G.n = l, c = 0));
                    }
                    if (o || r > 1) return a;
                    throw y = true, n;
                }
                return function(o, p, l) {
                    if (f > 1) throw TypeError("Generator is already running");
                    for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y; ) {
                        i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
                        try {
                            if (f = 2, i) {
                                if (c || (o = "next"), t = i[o]) {
                                    if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                                    if (!t.done) return t;
                                    u = t.value, c < 2 && (c = 0);
                                } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), 
                                c = 1);
                                i = e;
                            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
                        } catch (t) {
                            i = e, c = 1, u = t;
                        } finally {
                            f = 1;
                        }
                    }
                    return {
                        value: t,
                        done: y
                    };
                };
            }(r, o, i), true), u;
        }
        var a = {};
        function Generator() {}
        function GeneratorFunction() {}
        function GeneratorFunctionPrototype() {}
        t = Object.getPrototypeOf;
        var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function() {
            return this;
        }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
        function f(e) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, 
            _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), 
            e;
        }
        return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), 
        _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), 
        GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), 
        _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function() {
            return this;
        }), _regeneratorDefine(u, "toString", function() {
            return "[object Generator]";
        }), (_regenerator = function() {
            return {
                w: i,
                m: f
            };
        })();
    }
    function _regeneratorDefine(e, r, n, t) {
        var i = Object.defineProperty;
        try {
            i({}, "", {});
        } catch (e) {
            i = 0;
        }
        _regeneratorDefine = function(e, r, n, t) {
            function o(r, n) {
                _regeneratorDefine(e, r, function(e) {
                    return this._invoke(r, n, e);
                });
            }
            r ? i ? i(e, r, {
                value: n,
                enumerable: !t,
                configurable: !t,
                writable: !t
            }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
        }, _regeneratorDefine(e, r, n, t);
    }
    function _slicedToArray(r, e) {
        return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }
    function _toPrimitive(t, r) {
        if ("object" != typeof t || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
            var i = e.call(t, r);
            if ("object" != typeof i) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(t);
    }
    function _toPropertyKey(t) {
        var i = _toPrimitive(t, "string");
        return "symbol" == typeof i ? i : i + "";
    }
    function _unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return _arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
        }
    }
    var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    var fails;
    var hasRequiredFails;
    function requireFails() {
        if (hasRequiredFails) return fails;
        hasRequiredFails = 1;
        fails = function(exec) {
            try {
                return !!exec();
            } catch (error) {
                return true;
            }
        };
        return fails;
    }
    var functionBindNative;
    var hasRequiredFunctionBindNative;
    function requireFunctionBindNative() {
        if (hasRequiredFunctionBindNative) return functionBindNative;
        hasRequiredFunctionBindNative = 1;
        var fails = requireFails();
        functionBindNative = !fails(function() {
            var test = function() {}.bind();
            return typeof test != "function" || test.hasOwnProperty("prototype");
        });
        return functionBindNative;
    }
    var functionUncurryThis;
    var hasRequiredFunctionUncurryThis;
    function requireFunctionUncurryThis() {
        if (hasRequiredFunctionUncurryThis) return functionUncurryThis;
        hasRequiredFunctionUncurryThis = 1;
        var NATIVE_BIND = requireFunctionBindNative();
        var FunctionPrototype = Function.prototype;
        var call = FunctionPrototype.call;
        var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
        functionUncurryThis = NATIVE_BIND ? uncurryThisWithBind : function(fn) {
            return function() {
                return call.apply(fn, arguments);
            };
        };
        return functionUncurryThis;
    }
    var classofRaw;
    var hasRequiredClassofRaw;
    function requireClassofRaw() {
        if (hasRequiredClassofRaw) return classofRaw;
        hasRequiredClassofRaw = 1;
        var uncurryThis = requireFunctionUncurryThis();
        var toString = uncurryThis({}.toString);
        var stringSlice = uncurryThis("".slice);
        classofRaw = function(it) {
            return stringSlice(toString(it), 8, -1);
        };
        return classofRaw;
    }
    var indexedObject;
    var hasRequiredIndexedObject;
    function requireIndexedObject() {
        if (hasRequiredIndexedObject) return indexedObject;
        hasRequiredIndexedObject = 1;
        var uncurryThis = requireFunctionUncurryThis();
        var fails = requireFails();
        var classof = requireClassofRaw();
        var $Object = Object;
        var split = uncurryThis("".split);
        indexedObject = fails(function() {
            return !$Object("z").propertyIsEnumerable(0);
        }) ? function(it) {
            return classof(it) === "String" ? split(it, "") : $Object(it);
        } : $Object;
        return indexedObject;
    }
    var isNullOrUndefined;
    var hasRequiredIsNullOrUndefined;
    function requireIsNullOrUndefined() {
        if (hasRequiredIsNullOrUndefined) return isNullOrUndefined;
        hasRequiredIsNullOrUndefined = 1;
        isNullOrUndefined = function(it) {
            return it === null || it === undefined;
        };
        return isNullOrUndefined;
    }
    var requireObjectCoercible;
    var hasRequiredRequireObjectCoercible;
    function requireRequireObjectCoercible() {
        if (hasRequiredRequireObjectCoercible) return requireObjectCoercible;
        hasRequiredRequireObjectCoercible = 1;
        var isNullOrUndefined = requireIsNullOrUndefined();
        var $TypeError = TypeError;
        requireObjectCoercible = function(it) {
            if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
            return it;
        };
        return requireObjectCoercible;
    }
    var toIndexedObject;
    var hasRequiredToIndexedObject;
    function requireToIndexedObject() {
        if (hasRequiredToIndexedObject) return toIndexedObject;
        hasRequiredToIndexedObject = 1;
        var IndexedObject = requireIndexedObject();
        var requireObjectCoercible = requireRequireObjectCoercible();
        toIndexedObject = function(it) {
            return IndexedObject(requireObjectCoercible(it));
        };
        return toIndexedObject;
    }
    var globalThis_1;
    var hasRequiredGlobalThis;
    function requireGlobalThis() {
        if (hasRequiredGlobalThis) return globalThis_1;
        hasRequiredGlobalThis = 1;
        var check = function(it) {
            return it && it.Math === Math && it;
        };
        globalThis_1 = check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof commonjsGlobal == "object" && commonjsGlobal) || check(typeof globalThis_1 == "object" && globalThis_1) || function() {
            return this;
        }() || Function("return this")();
        return globalThis_1;
    }
    var sharedStore = {
        exports: {}
    };
    var isPure;
    var hasRequiredIsPure;
    function requireIsPure() {
        if (hasRequiredIsPure) return isPure;
        hasRequiredIsPure = 1;
        isPure = false;
        return isPure;
    }
    var defineGlobalProperty;
    var hasRequiredDefineGlobalProperty;
    function requireDefineGlobalProperty() {
        if (hasRequiredDefineGlobalProperty) return defineGlobalProperty;
        hasRequiredDefineGlobalProperty = 1;
        var globalThis = requireGlobalThis();
        var defineProperty = Object.defineProperty;
        defineGlobalProperty = function(key, value) {
            try {
                defineProperty(globalThis, key, {
                    value: value,
                    configurable: true,
                    writable: true
                });
            } catch (error) {
                globalThis[key] = value;
            }
            return value;
        };
        return defineGlobalProperty;
    }
    var hasRequiredSharedStore;
    function requireSharedStore() {
        if (hasRequiredSharedStore) return sharedStore.exports;
        hasRequiredSharedStore = 1;
        var IS_PURE = requireIsPure();
        var globalThis = requireGlobalThis();
        var defineGlobalProperty = requireDefineGlobalProperty();
        var SHARED = "__core-js_shared__";
        var store = sharedStore.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});
        (store.versions || (store.versions = [])).push({
            version: "3.45.1",
            mode: IS_PURE ? "pure" : "global",
            copyright: "© 2014-2025 Denis Pushkarev (zloirock.ru)",
            license: "https://github.com/zloirock/core-js/blob/v3.45.1/LICENSE",
            source: "https://github.com/zloirock/core-js"
        });
        return sharedStore.exports;
    }
    var shared;
    var hasRequiredShared;
    function requireShared() {
        if (hasRequiredShared) return shared;
        hasRequiredShared = 1;
        var store = requireSharedStore();
        shared = function(key, value) {
            return store[key] || (store[key] = value || {});
        };
        return shared;
    }
    var toObject;
    var hasRequiredToObject;
    function requireToObject() {
        if (hasRequiredToObject) return toObject;
        hasRequiredToObject = 1;
        var requireObjectCoercible = requireRequireObjectCoercible();
        var $Object = Object;
        toObject = function(argument) {
            return $Object(requireObjectCoercible(argument));
        };
        return toObject;
    }
    var hasOwnProperty_1;
    var hasRequiredHasOwnProperty;
    function requireHasOwnProperty() {
        if (hasRequiredHasOwnProperty) return hasOwnProperty_1;
        hasRequiredHasOwnProperty = 1;
        var uncurryThis = requireFunctionUncurryThis();
        var toObject = requireToObject();
        var hasOwnProperty = uncurryThis({}.hasOwnProperty);
        hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
            return hasOwnProperty(toObject(it), key);
        };
        return hasOwnProperty_1;
    }
    var uid;
    var hasRequiredUid;
    function requireUid() {
        if (hasRequiredUid) return uid;
        hasRequiredUid = 1;
        var uncurryThis = requireFunctionUncurryThis();
        var id = 0;
        var postfix = Math.random();
        var toString = uncurryThis(1.1.toString);
        uid = function(key) {
            return "Symbol(" + (key === undefined ? "" : key) + ")_" + toString(++id + postfix, 36);
        };
        return uid;
    }
    var environmentUserAgent;
    var hasRequiredEnvironmentUserAgent;
    function requireEnvironmentUserAgent() {
        if (hasRequiredEnvironmentUserAgent) return environmentUserAgent;
        hasRequiredEnvironmentUserAgent = 1;
        var globalThis = requireGlobalThis();
        var navigator = globalThis.navigator;
        var userAgent = navigator && navigator.userAgent;
        environmentUserAgent = userAgent ? String(userAgent) : "";
        return environmentUserAgent;
    }
    var environmentV8Version;
    var hasRequiredEnvironmentV8Version;
    function requireEnvironmentV8Version() {
        if (hasRequiredEnvironmentV8Version) return environmentV8Version;
        hasRequiredEnvironmentV8Version = 1;
        var globalThis = requireGlobalThis();
        var userAgent = requireEnvironmentUserAgent();
        var process = globalThis.process;
        var Deno = globalThis.Deno;
        var versions = process && process.versions || Deno && Deno.version;
        var v8 = versions && versions.v8;
        var match, version;
        if (v8) {
            match = v8.split(".");
            version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
        }
        if (!version && userAgent) {
            match = userAgent.match(/Edge\/(\d+)/);
            if (!match || match[1] >= 74) {
                match = userAgent.match(/Chrome\/(\d+)/);
                if (match) version = +match[1];
            }
        }
        environmentV8Version = version;
        return environmentV8Version;
    }
    var symbolConstructorDetection;
    var hasRequiredSymbolConstructorDetection;
    function requireSymbolConstructorDetection() {
        if (hasRequiredSymbolConstructorDetection) return symbolConstructorDetection;
        hasRequiredSymbolConstructorDetection = 1;
        var V8_VERSION = requireEnvironmentV8Version();
        var fails = requireFails();
        var globalThis = requireGlobalThis();
        var $String = globalThis.String;
        symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails(function() {
            var symbol = Symbol("symbol detection");
            return !$String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION && V8_VERSION < 41;
        });
        return symbolConstructorDetection;
    }
    var useSymbolAsUid;
    var hasRequiredUseSymbolAsUid;
    function requireUseSymbolAsUid() {
        if (hasRequiredUseSymbolAsUid) return useSymbolAsUid;
        hasRequiredUseSymbolAsUid = 1;
        var NATIVE_SYMBOL = requireSymbolConstructorDetection();
        useSymbolAsUid = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
        return useSymbolAsUid;
    }
    var wellKnownSymbol;
    var hasRequiredWellKnownSymbol;
    function requireWellKnownSymbol() {
        if (hasRequiredWellKnownSymbol) return wellKnownSymbol;
        hasRequiredWellKnownSymbol = 1;
        var globalThis = requireGlobalThis();
        var shared = requireShared();
        var hasOwn = requireHasOwnProperty();
        var uid = requireUid();
        var NATIVE_SYMBOL = requireSymbolConstructorDetection();
        var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();
        var Symbol = globalThis.Symbol;
        var WellKnownSymbolsStore = shared("wks");
        var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol["for"] || Symbol : Symbol && Symbol.withoutSetter || uid;
        wellKnownSymbol = function(name) {
            if (!hasOwn(WellKnownSymbolsStore, name)) {
                WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name) ? Symbol[name] : createWellKnownSymbol("Symbol." + name);
            }
            return WellKnownSymbolsStore[name];
        };
        return wellKnownSymbol;
    }
    var isCallable;
    var hasRequiredIsCallable;
    function requireIsCallable() {
        if (hasRequiredIsCallable) return isCallable;
        hasRequiredIsCallable = 1;
        var documentAll = typeof document == "object" && document.all;
        isCallable = typeof documentAll == "undefined" && documentAll !== undefined ? function(argument) {
            return typeof argument == "function" || argument === documentAll;
        } : function(argument) {
            return typeof argument == "function";
        };
        return isCallable;
    }
    var isObject;
    var hasRequiredIsObject;
    function requireIsObject() {
        if (hasRequiredIsObject) return isObject;
        hasRequiredIsObject = 1;
        var isCallable = requireIsCallable();
        isObject = function(it) {
            return typeof it == "object" ? it !== null : isCallable(it);
        };
        return isObject;
    }
    var anObject;
    var hasRequiredAnObject;
    function requireAnObject() {
        if (hasRequiredAnObject) return anObject;
        hasRequiredAnObject = 1;
        var isObject = requireIsObject();
        var $String = String;
        var $TypeError = TypeError;
        anObject = function(argument) {
            if (isObject(argument)) return argument;
            throw new $TypeError($String(argument) + " is not an object");
        };
        return anObject;
    }
    var objectDefineProperties = {};
    var descriptors;
    var hasRequiredDescriptors;
    function requireDescriptors() {
        if (hasRequiredDescriptors) return descriptors;
        hasRequiredDescriptors = 1;
        var fails = requireFails();
        descriptors = !fails(function() {
            return Object.defineProperty({}, 1, {
                get: function() {
                    return 7;
                }
            })[1] !== 7;
        });
        return descriptors;
    }
    var v8PrototypeDefineBug;
    var hasRequiredV8PrototypeDefineBug;
    function requireV8PrototypeDefineBug() {
        if (hasRequiredV8PrototypeDefineBug) return v8PrototypeDefineBug;
        hasRequiredV8PrototypeDefineBug = 1;
        var DESCRIPTORS = requireDescriptors();
        var fails = requireFails();
        v8PrototypeDefineBug = DESCRIPTORS && fails(function() {
            return Object.defineProperty(function() {}, "prototype", {
                value: 42,
                writable: false
            }).prototype !== 42;
        });
        return v8PrototypeDefineBug;
    }
    var objectDefineProperty = {};
    var documentCreateElement;
    var hasRequiredDocumentCreateElement;
    function requireDocumentCreateElement() {
        if (hasRequiredDocumentCreateElement) return documentCreateElement;
        hasRequiredDocumentCreateElement = 1;
        var globalThis = requireGlobalThis();
        var isObject = requireIsObject();
        var document = globalThis.document;
        var EXISTS = isObject(document) && isObject(document.createElement);
        documentCreateElement = function(it) {
            return EXISTS ? document.createElement(it) : {};
        };
        return documentCreateElement;
    }
    var ie8DomDefine;
    var hasRequiredIe8DomDefine;
    function requireIe8DomDefine() {
        if (hasRequiredIe8DomDefine) return ie8DomDefine;
        hasRequiredIe8DomDefine = 1;
        var DESCRIPTORS = requireDescriptors();
        var fails = requireFails();
        var createElement = requireDocumentCreateElement();
        ie8DomDefine = !DESCRIPTORS && !fails(function() {
            return Object.defineProperty(createElement("div"), "a", {
                get: function() {
                    return 7;
                }
            }).a !== 7;
        });
        return ie8DomDefine;
    }
    var functionCall;
    var hasRequiredFunctionCall;
    function requireFunctionCall() {
        if (hasRequiredFunctionCall) return functionCall;
        hasRequiredFunctionCall = 1;
        var NATIVE_BIND = requireFunctionBindNative();
        var call = Function.prototype.call;
        functionCall = NATIVE_BIND ? call.bind(call) : function() {
            return call.apply(call, arguments);
        };
        return functionCall;
    }
    var getBuiltIn;
    var hasRequiredGetBuiltIn;
    function requireGetBuiltIn() {
        if (hasRequiredGetBuiltIn) return getBuiltIn;
        hasRequiredGetBuiltIn = 1;
        var globalThis = requireGlobalThis();
        var isCallable = requireIsCallable();
        var aFunction = function(argument) {
            return isCallable(argument) ? argument : undefined;
        };
        getBuiltIn = function(namespace, method) {
            return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
        };
        return getBuiltIn;
    }
    var objectIsPrototypeOf;
    var hasRequiredObjectIsPrototypeOf;
    function requireObjectIsPrototypeOf() {
        if (hasRequiredObjectIsPrototypeOf) return objectIsPrototypeOf;
        hasRequiredObjectIsPrototypeOf = 1;
        var uncurryThis = requireFunctionUncurryThis();
        objectIsPrototypeOf = uncurryThis({}.isPrototypeOf);
        return objectIsPrototypeOf;
    }
    var isSymbol;
    var hasRequiredIsSymbol;
    function requireIsSymbol() {
        if (hasRequiredIsSymbol) return isSymbol;
        hasRequiredIsSymbol = 1;
        var getBuiltIn = requireGetBuiltIn();
        var isCallable = requireIsCallable();
        var isPrototypeOf = requireObjectIsPrototypeOf();
        var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();
        var $Object = Object;
        isSymbol = USE_SYMBOL_AS_UID ? function(it) {
            return typeof it == "symbol";
        } : function(it) {
            var $Symbol = getBuiltIn("Symbol");
            return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
        };
        return isSymbol;
    }
    var tryToString;
    var hasRequiredTryToString;
    function requireTryToString() {
        if (hasRequiredTryToString) return tryToString;
        hasRequiredTryToString = 1;
        var $String = String;
        tryToString = function(argument) {
            try {
                return $String(argument);
            } catch (error) {
                return "Object";
            }
        };
        return tryToString;
    }
    var aCallable;
    var hasRequiredACallable;
    function requireACallable() {
        if (hasRequiredACallable) return aCallable;
        hasRequiredACallable = 1;
        var isCallable = requireIsCallable();
        var tryToString = requireTryToString();
        var $TypeError = TypeError;
        aCallable = function(argument) {
            if (isCallable(argument)) return argument;
            throw new $TypeError(tryToString(argument) + " is not a function");
        };
        return aCallable;
    }
    var getMethod;
    var hasRequiredGetMethod;
    function requireGetMethod() {
        if (hasRequiredGetMethod) return getMethod;
        hasRequiredGetMethod = 1;
        var aCallable = requireACallable();
        var isNullOrUndefined = requireIsNullOrUndefined();
        getMethod = function(V, P) {
            var func = V[P];
            return isNullOrUndefined(func) ? undefined : aCallable(func);
        };
        return getMethod;
    }
    var ordinaryToPrimitive;
    var hasRequiredOrdinaryToPrimitive;
    function requireOrdinaryToPrimitive() {
        if (hasRequiredOrdinaryToPrimitive) return ordinaryToPrimitive;
        hasRequiredOrdinaryToPrimitive = 1;
        var call = requireFunctionCall();
        var isCallable = requireIsCallable();
        var isObject = requireIsObject();
        var $TypeError = TypeError;
        ordinaryToPrimitive = function(input, pref) {
            var fn, val;
            if (pref === "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
            if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
            if (pref !== "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
            throw new $TypeError("Can't convert object to primitive value");
        };
        return ordinaryToPrimitive;
    }
    var toPrimitive;
    var hasRequiredToPrimitive;
    function requireToPrimitive() {
        if (hasRequiredToPrimitive) return toPrimitive;
        hasRequiredToPrimitive = 1;
        var call = requireFunctionCall();
        var isObject = requireIsObject();
        var isSymbol = requireIsSymbol();
        var getMethod = requireGetMethod();
        var ordinaryToPrimitive = requireOrdinaryToPrimitive();
        var wellKnownSymbol = requireWellKnownSymbol();
        var $TypeError = TypeError;
        var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
        toPrimitive = function(input, pref) {
            if (!isObject(input) || isSymbol(input)) return input;
            var exoticToPrim = getMethod(input, TO_PRIMITIVE);
            var result;
            if (exoticToPrim) {
                if (pref === undefined) pref = "default";
                result = call(exoticToPrim, input, pref);
                if (!isObject(result) || isSymbol(result)) return result;
                throw new $TypeError("Can't convert object to primitive value");
            }
            if (pref === undefined) pref = "number";
            return ordinaryToPrimitive(input, pref);
        };
        return toPrimitive;
    }
    var toPropertyKey;
    var hasRequiredToPropertyKey;
    function requireToPropertyKey() {
        if (hasRequiredToPropertyKey) return toPropertyKey;
        hasRequiredToPropertyKey = 1;
        var toPrimitive = requireToPrimitive();
        var isSymbol = requireIsSymbol();
        toPropertyKey = function(argument) {
            var key = toPrimitive(argument, "string");
            return isSymbol(key) ? key : key + "";
        };
        return toPropertyKey;
    }
    var hasRequiredObjectDefineProperty;
    function requireObjectDefineProperty() {
        if (hasRequiredObjectDefineProperty) return objectDefineProperty;
        hasRequiredObjectDefineProperty = 1;
        var DESCRIPTORS = requireDescriptors();
        var IE8_DOM_DEFINE = requireIe8DomDefine();
        var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
        var anObject = requireAnObject();
        var toPropertyKey = requireToPropertyKey();
        var $TypeError = TypeError;
        var $defineProperty = Object.defineProperty;
        var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        var ENUMERABLE = "enumerable";
        var CONFIGURABLE = "configurable";
        var WRITABLE = "writable";
        objectDefineProperty.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
            anObject(O);
            P = toPropertyKey(P);
            anObject(Attributes);
            if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
                var current = $getOwnPropertyDescriptor(O, P);
                if (current && current[WRITABLE]) {
                    O[P] = Attributes.value;
                    Attributes = {
                        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
                        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
                        writable: false
                    };
                }
            }
            return $defineProperty(O, P, Attributes);
        } : $defineProperty : function defineProperty(O, P, Attributes) {
            anObject(O);
            P = toPropertyKey(P);
            anObject(Attributes);
            if (IE8_DOM_DEFINE) try {
                return $defineProperty(O, P, Attributes);
            } catch (error) {}
            if ("get" in Attributes || "set" in Attributes) throw new $TypeError("Accessors not supported");
            if ("value" in Attributes) O[P] = Attributes.value;
            return O;
        };
        return objectDefineProperty;
    }
    var mathTrunc;
    var hasRequiredMathTrunc;
    function requireMathTrunc() {
        if (hasRequiredMathTrunc) return mathTrunc;
        hasRequiredMathTrunc = 1;
        var ceil = Math.ceil;
        var floor = Math.floor;
        mathTrunc = Math.trunc || function trunc(x) {
            var n = +x;
            return (n > 0 ? floor : ceil)(n);
        };
        return mathTrunc;
    }
    var toIntegerOrInfinity;
    var hasRequiredToIntegerOrInfinity;
    function requireToIntegerOrInfinity() {
        if (hasRequiredToIntegerOrInfinity) return toIntegerOrInfinity;
        hasRequiredToIntegerOrInfinity = 1;
        var trunc = requireMathTrunc();
        toIntegerOrInfinity = function(argument) {
            var number = +argument;
            return number !== number || number === 0 ? 0 : trunc(number);
        };
        return toIntegerOrInfinity;
    }
    var toAbsoluteIndex;
    var hasRequiredToAbsoluteIndex;
    function requireToAbsoluteIndex() {
        if (hasRequiredToAbsoluteIndex) return toAbsoluteIndex;
        hasRequiredToAbsoluteIndex = 1;
        var toIntegerOrInfinity = requireToIntegerOrInfinity();
        var max = Math.max;
        var min = Math.min;
        toAbsoluteIndex = function(index, length) {
            var integer = toIntegerOrInfinity(index);
            return integer < 0 ? max(integer + length, 0) : min(integer, length);
        };
        return toAbsoluteIndex;
    }
    var toLength;
    var hasRequiredToLength;
    function requireToLength() {
        if (hasRequiredToLength) return toLength;
        hasRequiredToLength = 1;
        var toIntegerOrInfinity = requireToIntegerOrInfinity();
        var min = Math.min;
        toLength = function(argument) {
            var len = toIntegerOrInfinity(argument);
            return len > 0 ? min(len, 9007199254740991) : 0;
        };
        return toLength;
    }
    var lengthOfArrayLike;
    var hasRequiredLengthOfArrayLike;
    function requireLengthOfArrayLike() {
        if (hasRequiredLengthOfArrayLike) return lengthOfArrayLike;
        hasRequiredLengthOfArrayLike = 1;
        var toLength = requireToLength();
        lengthOfArrayLike = function(obj) {
            return toLength(obj.length);
        };
        return lengthOfArrayLike;
    }
    var arrayIncludes;
    var hasRequiredArrayIncludes;
    function requireArrayIncludes() {
        if (hasRequiredArrayIncludes) return arrayIncludes;
        hasRequiredArrayIncludes = 1;
        var toIndexedObject = requireToIndexedObject();
        var toAbsoluteIndex = requireToAbsoluteIndex();
        var lengthOfArrayLike = requireLengthOfArrayLike();
        var createMethod = function(IS_INCLUDES) {
            return function($this, el, fromIndex) {
                var O = toIndexedObject($this);
                var length = lengthOfArrayLike(O);
                if (length === 0) return !IS_INCLUDES && -1;
                var index = toAbsoluteIndex(fromIndex, length);
                var value;
                if (IS_INCLUDES && el !== el) while (length > index) {
                    value = O[index++];
                    if (value !== value) return true;
                } else for (;length > index; index++) {
                    if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
                }
                return !IS_INCLUDES && -1;
            };
        };
        arrayIncludes = {
            includes: createMethod(true),
            indexOf: createMethod(false)
        };
        return arrayIncludes;
    }
    var hiddenKeys;
    var hasRequiredHiddenKeys;
    function requireHiddenKeys() {
        if (hasRequiredHiddenKeys) return hiddenKeys;
        hasRequiredHiddenKeys = 1;
        hiddenKeys = {};
        return hiddenKeys;
    }
    var objectKeysInternal;
    var hasRequiredObjectKeysInternal;
    function requireObjectKeysInternal() {
        if (hasRequiredObjectKeysInternal) return objectKeysInternal;
        hasRequiredObjectKeysInternal = 1;
        var uncurryThis = requireFunctionUncurryThis();
        var hasOwn = requireHasOwnProperty();
        var toIndexedObject = requireToIndexedObject();
        var indexOf = requireArrayIncludes().indexOf;
        var hiddenKeys = requireHiddenKeys();
        var push = uncurryThis([].push);
        objectKeysInternal = function(object, names) {
            var O = toIndexedObject(object);
            var i = 0;
            var result = [];
            var key;
            for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
            while (names.length > i) if (hasOwn(O, key = names[i++])) {
                ~indexOf(result, key) || push(result, key);
            }
            return result;
        };
        return objectKeysInternal;
    }
    var enumBugKeys;
    var hasRequiredEnumBugKeys;
    function requireEnumBugKeys() {
        if (hasRequiredEnumBugKeys) return enumBugKeys;
        hasRequiredEnumBugKeys = 1;
        enumBugKeys = [ "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf" ];
        return enumBugKeys;
    }
    var objectKeys;
    var hasRequiredObjectKeys;
    function requireObjectKeys() {
        if (hasRequiredObjectKeys) return objectKeys;
        hasRequiredObjectKeys = 1;
        var internalObjectKeys = requireObjectKeysInternal();
        var enumBugKeys = requireEnumBugKeys();
        objectKeys = Object.keys || function keys(O) {
            return internalObjectKeys(O, enumBugKeys);
        };
        return objectKeys;
    }
    var hasRequiredObjectDefineProperties;
    function requireObjectDefineProperties() {
        if (hasRequiredObjectDefineProperties) return objectDefineProperties;
        hasRequiredObjectDefineProperties = 1;
        var DESCRIPTORS = requireDescriptors();
        var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
        var definePropertyModule = requireObjectDefineProperty();
        var anObject = requireAnObject();
        var toIndexedObject = requireToIndexedObject();
        var objectKeys = requireObjectKeys();
        objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
            anObject(O);
            var props = toIndexedObject(Properties);
            var keys = objectKeys(Properties);
            var length = keys.length;
            var index = 0;
            var key;
            while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
            return O;
        };
        return objectDefineProperties;
    }
    var html;
    var hasRequiredHtml;
    function requireHtml() {
        if (hasRequiredHtml) return html;
        hasRequiredHtml = 1;
        var getBuiltIn = requireGetBuiltIn();
        html = getBuiltIn("document", "documentElement");
        return html;
    }
    var sharedKey;
    var hasRequiredSharedKey;
    function requireSharedKey() {
        if (hasRequiredSharedKey) return sharedKey;
        hasRequiredSharedKey = 1;
        var shared = requireShared();
        var uid = requireUid();
        var keys = shared("keys");
        sharedKey = function(key) {
            return keys[key] || (keys[key] = uid(key));
        };
        return sharedKey;
    }
    var objectCreate;
    var hasRequiredObjectCreate;
    function requireObjectCreate() {
        if (hasRequiredObjectCreate) return objectCreate;
        hasRequiredObjectCreate = 1;
        var anObject = requireAnObject();
        var definePropertiesModule = requireObjectDefineProperties();
        var enumBugKeys = requireEnumBugKeys();
        var hiddenKeys = requireHiddenKeys();
        var html = requireHtml();
        var documentCreateElement = requireDocumentCreateElement();
        var sharedKey = requireSharedKey();
        var GT = ">";
        var LT = "<";
        var PROTOTYPE = "prototype";
        var SCRIPT = "script";
        var IE_PROTO = sharedKey("IE_PROTO");
        var EmptyConstructor = function() {};
        var scriptTag = function(content) {
            return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
        };
        var NullProtoObjectViaActiveX = function(activeXDocument) {
            activeXDocument.write(scriptTag(""));
            activeXDocument.close();
            var temp = activeXDocument.parentWindow.Object;
            activeXDocument = null;
            return temp;
        };
        var NullProtoObjectViaIFrame = function() {
            var iframe = documentCreateElement("iframe");
            var JS = "java" + SCRIPT + ":";
            var iframeDocument;
            iframe.style.display = "none";
            html.appendChild(iframe);
            iframe.src = String(JS);
            iframeDocument = iframe.contentWindow.document;
            iframeDocument.open();
            iframeDocument.write(scriptTag("document.F=Object"));
            iframeDocument.close();
            return iframeDocument.F;
        };
        var activeXDocument;
        var NullProtoObject = function() {
            try {
                activeXDocument = new ActiveXObject("htmlfile");
            } catch (error) {}
            NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
            var length = enumBugKeys.length;
            while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
            return NullProtoObject();
        };
        hiddenKeys[IE_PROTO] = true;
        objectCreate = Object.create || function create(O, Properties) {
            var result;
            if (O !== null) {
                EmptyConstructor[PROTOTYPE] = anObject(O);
                result = new EmptyConstructor;
                EmptyConstructor[PROTOTYPE] = null;
                result[IE_PROTO] = O;
            } else result = NullProtoObject();
            return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
        };
        return objectCreate;
    }
    var addToUnscopables;
    var hasRequiredAddToUnscopables;
    function requireAddToUnscopables() {
        if (hasRequiredAddToUnscopables) return addToUnscopables;
        hasRequiredAddToUnscopables = 1;
        var wellKnownSymbol = requireWellKnownSymbol();
        var create = requireObjectCreate();
        var defineProperty = requireObjectDefineProperty().f;
        var UNSCOPABLES = wellKnownSymbol("unscopables");
        var ArrayPrototype = Array.prototype;
        if (ArrayPrototype[UNSCOPABLES] === undefined) {
            defineProperty(ArrayPrototype, UNSCOPABLES, {
                configurable: true,
                value: create(null)
            });
        }
        addToUnscopables = function(key) {
            ArrayPrototype[UNSCOPABLES][key] = true;
        };
        return addToUnscopables;
    }
    var iterators;
    var hasRequiredIterators;
    function requireIterators() {
        if (hasRequiredIterators) return iterators;
        hasRequiredIterators = 1;
        iterators = {};
        return iterators;
    }
    var weakMapBasicDetection;
    var hasRequiredWeakMapBasicDetection;
    function requireWeakMapBasicDetection() {
        if (hasRequiredWeakMapBasicDetection) return weakMapBasicDetection;
        hasRequiredWeakMapBasicDetection = 1;
        var globalThis = requireGlobalThis();
        var isCallable = requireIsCallable();
        var WeakMap = globalThis.WeakMap;
        weakMapBasicDetection = isCallable(WeakMap) && /native code/.test(String(WeakMap));
        return weakMapBasicDetection;
    }
    var createPropertyDescriptor;
    var hasRequiredCreatePropertyDescriptor;
    function requireCreatePropertyDescriptor() {
        if (hasRequiredCreatePropertyDescriptor) return createPropertyDescriptor;
        hasRequiredCreatePropertyDescriptor = 1;
        createPropertyDescriptor = function(bitmap, value) {
            return {
                enumerable: !(bitmap & 1),
                configurable: !(bitmap & 2),
                writable: !(bitmap & 4),
                value: value
            };
        };
        return createPropertyDescriptor;
    }
    var createNonEnumerableProperty;
    var hasRequiredCreateNonEnumerableProperty;
    function requireCreateNonEnumerableProperty() {
        if (hasRequiredCreateNonEnumerableProperty) return createNonEnumerableProperty;
        hasRequiredCreateNonEnumerableProperty = 1;
        var DESCRIPTORS = requireDescriptors();
        var definePropertyModule = requireObjectDefineProperty();
        var createPropertyDescriptor = requireCreatePropertyDescriptor();
        createNonEnumerableProperty = DESCRIPTORS ? function(object, key, value) {
            return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
        } : function(object, key, value) {
            object[key] = value;
            return object;
        };
        return createNonEnumerableProperty;
    }
    var internalState;
    var hasRequiredInternalState;
    function requireInternalState() {
        if (hasRequiredInternalState) return internalState;
        hasRequiredInternalState = 1;
        var NATIVE_WEAK_MAP = requireWeakMapBasicDetection();
        var globalThis = requireGlobalThis();
        var isObject = requireIsObject();
        var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
        var hasOwn = requireHasOwnProperty();
        var shared = requireSharedStore();
        var sharedKey = requireSharedKey();
        var hiddenKeys = requireHiddenKeys();
        var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
        var TypeError = globalThis.TypeError;
        var WeakMap = globalThis.WeakMap;
        var set, get, has;
        var enforce = function(it) {
            return has(it) ? get(it) : set(it, {});
        };
        var getterFor = function(TYPE) {
            return function(it) {
                var state;
                if (!isObject(it) || (state = get(it)).type !== TYPE) {
                    throw new TypeError("Incompatible receiver, " + TYPE + " required");
                }
                return state;
            };
        };
        if (NATIVE_WEAK_MAP || shared.state) {
            var store = shared.state || (shared.state = new WeakMap);
            store.get = store.get;
            store.has = store.has;
            store.set = store.set;
            set = function(it, metadata) {
                if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
                metadata.facade = it;
                store.set(it, metadata);
                return metadata;
            };
            get = function(it) {
                return store.get(it) || {};
            };
            has = function(it) {
                return store.has(it);
            };
        } else {
            var STATE = sharedKey("state");
            hiddenKeys[STATE] = true;
            set = function(it, metadata) {
                if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
                metadata.facade = it;
                createNonEnumerableProperty(it, STATE, metadata);
                return metadata;
            };
            get = function(it) {
                return hasOwn(it, STATE) ? it[STATE] : {};
            };
            has = function(it) {
                return hasOwn(it, STATE);
            };
        }
        internalState = {
            set: set,
            get: get,
            has: has,
            enforce: enforce,
            getterFor: getterFor
        };
        return internalState;
    }
    var objectGetOwnPropertyDescriptor = {};
    var objectPropertyIsEnumerable = {};
    var hasRequiredObjectPropertyIsEnumerable;
    function requireObjectPropertyIsEnumerable() {
        if (hasRequiredObjectPropertyIsEnumerable) return objectPropertyIsEnumerable;
        hasRequiredObjectPropertyIsEnumerable = 1;
        var $propertyIsEnumerable = {}.propertyIsEnumerable;
        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
            1: 2
        }, 1);
        objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
            var descriptor = getOwnPropertyDescriptor(this, V);
            return !!descriptor && descriptor.enumerable;
        } : $propertyIsEnumerable;
        return objectPropertyIsEnumerable;
    }
    var hasRequiredObjectGetOwnPropertyDescriptor;
    function requireObjectGetOwnPropertyDescriptor() {
        if (hasRequiredObjectGetOwnPropertyDescriptor) return objectGetOwnPropertyDescriptor;
        hasRequiredObjectGetOwnPropertyDescriptor = 1;
        var DESCRIPTORS = requireDescriptors();
        var call = requireFunctionCall();
        var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
        var createPropertyDescriptor = requireCreatePropertyDescriptor();
        var toIndexedObject = requireToIndexedObject();
        var toPropertyKey = requireToPropertyKey();
        var hasOwn = requireHasOwnProperty();
        var IE8_DOM_DEFINE = requireIe8DomDefine();
        var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        objectGetOwnPropertyDescriptor.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
            O = toIndexedObject(O);
            P = toPropertyKey(P);
            if (IE8_DOM_DEFINE) try {
                return $getOwnPropertyDescriptor(O, P);
            } catch (error) {}
            if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
        };
        return objectGetOwnPropertyDescriptor;
    }
    var makeBuiltIn = {
        exports: {}
    };
    var functionName;
    var hasRequiredFunctionName;
    function requireFunctionName() {
        if (hasRequiredFunctionName) return functionName;
        hasRequiredFunctionName = 1;
        var DESCRIPTORS = requireDescriptors();
        var hasOwn = requireHasOwnProperty();
        var FunctionPrototype = Function.prototype;
        var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
        var EXISTS = hasOwn(FunctionPrototype, "name");
        var PROPER = EXISTS && function something() {}.name === "something";
        var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, "name").configurable);
        functionName = {
            EXISTS: EXISTS,
            PROPER: PROPER,
            CONFIGURABLE: CONFIGURABLE
        };
        return functionName;
    }
    var inspectSource;
    var hasRequiredInspectSource;
    function requireInspectSource() {
        if (hasRequiredInspectSource) return inspectSource;
        hasRequiredInspectSource = 1;
        var uncurryThis = requireFunctionUncurryThis();
        var isCallable = requireIsCallable();
        var store = requireSharedStore();
        var functionToString = uncurryThis(Function.toString);
        if (!isCallable(store.inspectSource)) {
            store.inspectSource = function(it) {
                return functionToString(it);
            };
        }
        inspectSource = store.inspectSource;
        return inspectSource;
    }
    var hasRequiredMakeBuiltIn;
    function requireMakeBuiltIn() {
        if (hasRequiredMakeBuiltIn) return makeBuiltIn.exports;
        hasRequiredMakeBuiltIn = 1;
        var uncurryThis = requireFunctionUncurryThis();
        var fails = requireFails();
        var isCallable = requireIsCallable();
        var hasOwn = requireHasOwnProperty();
        var DESCRIPTORS = requireDescriptors();
        var CONFIGURABLE_FUNCTION_NAME = requireFunctionName().CONFIGURABLE;
        var inspectSource = requireInspectSource();
        var InternalStateModule = requireInternalState();
        var enforceInternalState = InternalStateModule.enforce;
        var getInternalState = InternalStateModule.get;
        var $String = String;
        var defineProperty = Object.defineProperty;
        var stringSlice = uncurryThis("".slice);
        var replace = uncurryThis("".replace);
        var join = uncurryThis([].join);
        var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function() {
            return defineProperty(function() {}, "length", {
                value: 8
            }).length !== 8;
        });
        var TEMPLATE = String(String).split("String");
        var makeBuiltIn$1 = makeBuiltIn.exports = function(value, name, options) {
            if (stringSlice($String(name), 0, 7) === "Symbol(") {
                name = "[" + replace($String(name), /^Symbol\(([^)]*)\).*$/, "$1") + "]";
            }
            if (options && options.getter) name = "get " + name;
            if (options && options.setter) name = "set " + name;
            if (!hasOwn(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
                if (DESCRIPTORS) defineProperty(value, "name", {
                    value: name,
                    configurable: true
                }); else value.name = name;
            }
            if (CONFIGURABLE_LENGTH && options && hasOwn(options, "arity") && value.length !== options.arity) {
                defineProperty(value, "length", {
                    value: options.arity
                });
            }
            try {
                if (options && hasOwn(options, "constructor") && options.constructor) {
                    if (DESCRIPTORS) defineProperty(value, "prototype", {
                        writable: false
                    });
                } else if (value.prototype) value.prototype = undefined;
            } catch (error) {}
            var state = enforceInternalState(value);
            if (!hasOwn(state, "source")) {
                state.source = join(TEMPLATE, typeof name == "string" ? name : "");
            }
            return value;
        };
        Function.prototype.toString = makeBuiltIn$1(function toString() {
            return isCallable(this) && getInternalState(this).source || inspectSource(this);
        }, "toString");
        return makeBuiltIn.exports;
    }
    var defineBuiltIn;
    var hasRequiredDefineBuiltIn;
    function requireDefineBuiltIn() {
        if (hasRequiredDefineBuiltIn) return defineBuiltIn;
        hasRequiredDefineBuiltIn = 1;
        var isCallable = requireIsCallable();
        var definePropertyModule = requireObjectDefineProperty();
        var makeBuiltIn = requireMakeBuiltIn();
        var defineGlobalProperty = requireDefineGlobalProperty();
        defineBuiltIn = function(O, key, value, options) {
            if (!options) options = {};
            var simple = options.enumerable;
            var name = options.name !== undefined ? options.name : key;
            if (isCallable(value)) makeBuiltIn(value, name, options);
            if (options.global) {
                if (simple) O[key] = value; else defineGlobalProperty(key, value);
            } else {
                try {
                    if (!options.unsafe) delete O[key]; else if (O[key]) simple = true;
                } catch (error) {}
                if (simple) O[key] = value; else definePropertyModule.f(O, key, {
                    value: value,
                    enumerable: false,
                    configurable: !options.nonConfigurable,
                    writable: !options.nonWritable
                });
            }
            return O;
        };
        return defineBuiltIn;
    }
    var objectGetOwnPropertyNames = {};
    var hasRequiredObjectGetOwnPropertyNames;
    function requireObjectGetOwnPropertyNames() {
        if (hasRequiredObjectGetOwnPropertyNames) return objectGetOwnPropertyNames;
        hasRequiredObjectGetOwnPropertyNames = 1;
        var internalObjectKeys = requireObjectKeysInternal();
        var enumBugKeys = requireEnumBugKeys();
        var hiddenKeys = enumBugKeys.concat("length", "prototype");
        objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
            return internalObjectKeys(O, hiddenKeys);
        };
        return objectGetOwnPropertyNames;
    }
    var objectGetOwnPropertySymbols = {};
    var hasRequiredObjectGetOwnPropertySymbols;
    function requireObjectGetOwnPropertySymbols() {
        if (hasRequiredObjectGetOwnPropertySymbols) return objectGetOwnPropertySymbols;
        hasRequiredObjectGetOwnPropertySymbols = 1;
        objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
        return objectGetOwnPropertySymbols;
    }
    var ownKeys;
    var hasRequiredOwnKeys;
    function requireOwnKeys() {
        if (hasRequiredOwnKeys) return ownKeys;
        hasRequiredOwnKeys = 1;
        var getBuiltIn = requireGetBuiltIn();
        var uncurryThis = requireFunctionUncurryThis();
        var getOwnPropertyNamesModule = requireObjectGetOwnPropertyNames();
        var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
        var anObject = requireAnObject();
        var concat = uncurryThis([].concat);
        ownKeys = getBuiltIn("Reflect", "ownKeys") || function ownKeys(it) {
            var keys = getOwnPropertyNamesModule.f(anObject(it));
            var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
            return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
        };
        return ownKeys;
    }
    var copyConstructorProperties;
    var hasRequiredCopyConstructorProperties;
    function requireCopyConstructorProperties() {
        if (hasRequiredCopyConstructorProperties) return copyConstructorProperties;
        hasRequiredCopyConstructorProperties = 1;
        var hasOwn = requireHasOwnProperty();
        var ownKeys = requireOwnKeys();
        var getOwnPropertyDescriptorModule = requireObjectGetOwnPropertyDescriptor();
        var definePropertyModule = requireObjectDefineProperty();
        copyConstructorProperties = function(target, source, exceptions) {
            var keys = ownKeys(source);
            var defineProperty = definePropertyModule.f;
            var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
                    defineProperty(target, key, getOwnPropertyDescriptor(source, key));
                }
            }
        };
        return copyConstructorProperties;
    }
    var isForced_1;
    var hasRequiredIsForced;
    function requireIsForced() {
        if (hasRequiredIsForced) return isForced_1;
        hasRequiredIsForced = 1;
        var fails = requireFails();
        var isCallable = requireIsCallable();
        var replacement = /#|\.prototype\./;
        var isForced = function(feature, detection) {
            var value = data[normalize(feature)];
            return value === POLYFILL ? true : value === NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
        };
        var normalize = isForced.normalize = function(string) {
            return String(string).replace(replacement, ".").toLowerCase();
        };
        var data = isForced.data = {};
        var NATIVE = isForced.NATIVE = "N";
        var POLYFILL = isForced.POLYFILL = "P";
        isForced_1 = isForced;
        return isForced_1;
    }
    var _export;
    var hasRequired_export;
    function require_export() {
        if (hasRequired_export) return _export;
        hasRequired_export = 1;
        var globalThis = requireGlobalThis();
        var getOwnPropertyDescriptor = requireObjectGetOwnPropertyDescriptor().f;
        var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
        var defineBuiltIn = requireDefineBuiltIn();
        var defineGlobalProperty = requireDefineGlobalProperty();
        var copyConstructorProperties = requireCopyConstructorProperties();
        var isForced = requireIsForced();
        _export = function(options, source) {
            var TARGET = options.target;
            var GLOBAL = options.global;
            var STATIC = options.stat;
            var FORCED, target, key, targetProperty, sourceProperty, descriptor;
            if (GLOBAL) {
                target = globalThis;
            } else if (STATIC) {
                target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
            } else {
                target = globalThis[TARGET] && globalThis[TARGET].prototype;
            }
            if (target) for (key in source) {
                sourceProperty = source[key];
                if (options.dontCallGetSet) {
                    descriptor = getOwnPropertyDescriptor(target, key);
                    targetProperty = descriptor && descriptor.value;
                } else targetProperty = target[key];
                FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
                if (!FORCED && targetProperty !== undefined) {
                    if (typeof sourceProperty == typeof targetProperty) continue;
                    copyConstructorProperties(sourceProperty, targetProperty);
                }
                if (options.sham || targetProperty && targetProperty.sham) {
                    createNonEnumerableProperty(sourceProperty, "sham", true);
                }
                defineBuiltIn(target, key, sourceProperty, options);
            }
        };
        return _export;
    }
    var correctPrototypeGetter;
    var hasRequiredCorrectPrototypeGetter;
    function requireCorrectPrototypeGetter() {
        if (hasRequiredCorrectPrototypeGetter) return correctPrototypeGetter;
        hasRequiredCorrectPrototypeGetter = 1;
        var fails = requireFails();
        correctPrototypeGetter = !fails(function() {
            function F() {}
            F.prototype.constructor = null;
            return Object.getPrototypeOf(new F) !== F.prototype;
        });
        return correctPrototypeGetter;
    }
    var objectGetPrototypeOf;
    var hasRequiredObjectGetPrototypeOf;
    function requireObjectGetPrototypeOf() {
        if (hasRequiredObjectGetPrototypeOf) return objectGetPrototypeOf;
        hasRequiredObjectGetPrototypeOf = 1;
        var hasOwn = requireHasOwnProperty();
        var isCallable = requireIsCallable();
        var toObject = requireToObject();
        var sharedKey = requireSharedKey();
        var CORRECT_PROTOTYPE_GETTER = requireCorrectPrototypeGetter();
        var IE_PROTO = sharedKey("IE_PROTO");
        var $Object = Object;
        var ObjectPrototype = $Object.prototype;
        objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function(O) {
            var object = toObject(O);
            if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
            var constructor = object.constructor;
            if (isCallable(constructor) && object instanceof constructor) {
                return constructor.prototype;
            }
            return object instanceof $Object ? ObjectPrototype : null;
        };
        return objectGetPrototypeOf;
    }
    var iteratorsCore;
    var hasRequiredIteratorsCore;
    function requireIteratorsCore() {
        if (hasRequiredIteratorsCore) return iteratorsCore;
        hasRequiredIteratorsCore = 1;
        var fails = requireFails();
        var isCallable = requireIsCallable();
        var isObject = requireIsObject();
        var create = requireObjectCreate();
        var getPrototypeOf = requireObjectGetPrototypeOf();
        var defineBuiltIn = requireDefineBuiltIn();
        var wellKnownSymbol = requireWellKnownSymbol();
        var IS_PURE = requireIsPure();
        var ITERATOR = wellKnownSymbol("iterator");
        var BUGGY_SAFARI_ITERATORS = false;
        var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
        if ([].keys) {
            arrayIterator = [].keys();
            if (!("next" in arrayIterator)) BUGGY_SAFARI_ITERATORS = true; else {
                PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
                if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
            }
        }
        var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function() {
            var test = {};
            return IteratorPrototype[ITERATOR].call(test) !== test;
        });
        if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {}; else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);
        if (!isCallable(IteratorPrototype[ITERATOR])) {
            defineBuiltIn(IteratorPrototype, ITERATOR, function() {
                return this;
            });
        }
        iteratorsCore = {
            IteratorPrototype: IteratorPrototype,
            BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
        };
        return iteratorsCore;
    }
    var setToStringTag;
    var hasRequiredSetToStringTag;
    function requireSetToStringTag() {
        if (hasRequiredSetToStringTag) return setToStringTag;
        hasRequiredSetToStringTag = 1;
        var defineProperty = requireObjectDefineProperty().f;
        var hasOwn = requireHasOwnProperty();
        var wellKnownSymbol = requireWellKnownSymbol();
        var TO_STRING_TAG = wellKnownSymbol("toStringTag");
        setToStringTag = function(target, TAG, STATIC) {
            if (target && !STATIC) target = target.prototype;
            if (target && !hasOwn(target, TO_STRING_TAG)) {
                defineProperty(target, TO_STRING_TAG, {
                    configurable: true,
                    value: TAG
                });
            }
        };
        return setToStringTag;
    }
    var iteratorCreateConstructor;
    var hasRequiredIteratorCreateConstructor;
    function requireIteratorCreateConstructor() {
        if (hasRequiredIteratorCreateConstructor) return iteratorCreateConstructor;
        hasRequiredIteratorCreateConstructor = 1;
        var IteratorPrototype = requireIteratorsCore().IteratorPrototype;
        var create = requireObjectCreate();
        var createPropertyDescriptor = requireCreatePropertyDescriptor();
        var setToStringTag = requireSetToStringTag();
        var Iterators = requireIterators();
        var returnThis = function() {
            return this;
        };
        iteratorCreateConstructor = function(IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
            var TO_STRING_TAG = NAME + " Iterator";
            IteratorConstructor.prototype = create(IteratorPrototype, {
                next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next)
            });
            setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
            Iterators[TO_STRING_TAG] = returnThis;
            return IteratorConstructor;
        };
        return iteratorCreateConstructor;
    }
    var functionUncurryThisAccessor;
    var hasRequiredFunctionUncurryThisAccessor;
    function requireFunctionUncurryThisAccessor() {
        if (hasRequiredFunctionUncurryThisAccessor) return functionUncurryThisAccessor;
        hasRequiredFunctionUncurryThisAccessor = 1;
        var uncurryThis = requireFunctionUncurryThis();
        var aCallable = requireACallable();
        functionUncurryThisAccessor = function(object, key, method) {
            try {
                return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
            } catch (error) {}
        };
        return functionUncurryThisAccessor;
    }
    var isPossiblePrototype;
    var hasRequiredIsPossiblePrototype;
    function requireIsPossiblePrototype() {
        if (hasRequiredIsPossiblePrototype) return isPossiblePrototype;
        hasRequiredIsPossiblePrototype = 1;
        var isObject = requireIsObject();
        isPossiblePrototype = function(argument) {
            return isObject(argument) || argument === null;
        };
        return isPossiblePrototype;
    }
    var aPossiblePrototype;
    var hasRequiredAPossiblePrototype;
    function requireAPossiblePrototype() {
        if (hasRequiredAPossiblePrototype) return aPossiblePrototype;
        hasRequiredAPossiblePrototype = 1;
        var isPossiblePrototype = requireIsPossiblePrototype();
        var $String = String;
        var $TypeError = TypeError;
        aPossiblePrototype = function(argument) {
            if (isPossiblePrototype(argument)) return argument;
            throw new $TypeError("Can't set " + $String(argument) + " as a prototype");
        };
        return aPossiblePrototype;
    }
    var objectSetPrototypeOf;
    var hasRequiredObjectSetPrototypeOf;
    function requireObjectSetPrototypeOf() {
        if (hasRequiredObjectSetPrototypeOf) return objectSetPrototypeOf;
        hasRequiredObjectSetPrototypeOf = 1;
        var uncurryThisAccessor = requireFunctionUncurryThisAccessor();
        var isObject = requireIsObject();
        var requireObjectCoercible = requireRequireObjectCoercible();
        var aPossiblePrototype = requireAPossiblePrototype();
        objectSetPrototypeOf = Object.setPrototypeOf || ("__proto__" in {} ? function() {
            var CORRECT_SETTER = false;
            var test = {};
            var setter;
            try {
                setter = uncurryThisAccessor(Object.prototype, "__proto__", "set");
                setter(test, []);
                CORRECT_SETTER = test instanceof Array;
            } catch (error) {}
            return function setPrototypeOf(O, proto) {
                requireObjectCoercible(O);
                aPossiblePrototype(proto);
                if (!isObject(O)) return O;
                if (CORRECT_SETTER) setter(O, proto); else O.__proto__ = proto;
                return O;
            };
        }() : undefined);
        return objectSetPrototypeOf;
    }
    var iteratorDefine;
    var hasRequiredIteratorDefine;
    function requireIteratorDefine() {
        if (hasRequiredIteratorDefine) return iteratorDefine;
        hasRequiredIteratorDefine = 1;
        var $ = require_export();
        var call = requireFunctionCall();
        var IS_PURE = requireIsPure();
        var FunctionName = requireFunctionName();
        var isCallable = requireIsCallable();
        var createIteratorConstructor = requireIteratorCreateConstructor();
        var getPrototypeOf = requireObjectGetPrototypeOf();
        var setPrototypeOf = requireObjectSetPrototypeOf();
        var setToStringTag = requireSetToStringTag();
        var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
        var defineBuiltIn = requireDefineBuiltIn();
        var wellKnownSymbol = requireWellKnownSymbol();
        var Iterators = requireIterators();
        var IteratorsCore = requireIteratorsCore();
        var PROPER_FUNCTION_NAME = FunctionName.PROPER;
        var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
        var IteratorPrototype = IteratorsCore.IteratorPrototype;
        var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
        var ITERATOR = wellKnownSymbol("iterator");
        var KEYS = "keys";
        var VALUES = "values";
        var ENTRIES = "entries";
        var returnThis = function() {
            return this;
        };
        iteratorDefine = function(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
            createIteratorConstructor(IteratorConstructor, NAME, next);
            var getIterationMethod = function(KIND) {
                if (KIND === DEFAULT && defaultIterator) return defaultIterator;
                if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];
                switch (KIND) {
                  case KEYS:
                    return function keys() {
                        return new IteratorConstructor(this, KIND);
                    };

                  case VALUES:
                    return function values() {
                        return new IteratorConstructor(this, KIND);
                    };

                  case ENTRIES:
                    return function entries() {
                        return new IteratorConstructor(this, KIND);
                    };
                }
                return function() {
                    return new IteratorConstructor(this);
                };
            };
            var TO_STRING_TAG = NAME + " Iterator";
            var INCORRECT_VALUES_NAME = false;
            var IterablePrototype = Iterable.prototype;
            var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
            var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
            var anyNativeIterator = NAME === "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
            var CurrentIteratorPrototype, methods, KEY;
            if (anyNativeIterator) {
                CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable));
                if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
                    if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
                        if (setPrototypeOf) {
                            setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
                        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
                            defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
                        }
                    }
                    setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
                    if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
                }
            }
            if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
                if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
                    createNonEnumerableProperty(IterablePrototype, "name", VALUES);
                } else {
                    INCORRECT_VALUES_NAME = true;
                    defaultIterator = function values() {
                        return call(nativeIterator, this);
                    };
                }
            }
            if (DEFAULT) {
                methods = {
                    values: getIterationMethod(VALUES),
                    keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
                    entries: getIterationMethod(ENTRIES)
                };
                if (FORCED) for (KEY in methods) {
                    if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
                    }
                } else $({
                    target: NAME,
                    proto: true,
                    forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
                }, methods);
            }
            if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
                defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, {
                    name: DEFAULT
                });
            }
            Iterators[NAME] = defaultIterator;
            return methods;
        };
        return iteratorDefine;
    }
    var createIterResultObject;
    var hasRequiredCreateIterResultObject;
    function requireCreateIterResultObject() {
        if (hasRequiredCreateIterResultObject) return createIterResultObject;
        hasRequiredCreateIterResultObject = 1;
        createIterResultObject = function(value, done) {
            return {
                value: value,
                done: done
            };
        };
        return createIterResultObject;
    }
    var es_array_iterator;
    var hasRequiredEs_array_iterator;
    function requireEs_array_iterator() {
        if (hasRequiredEs_array_iterator) return es_array_iterator;
        hasRequiredEs_array_iterator = 1;
        var toIndexedObject = requireToIndexedObject();
        var addToUnscopables = requireAddToUnscopables();
        var Iterators = requireIterators();
        var InternalStateModule = requireInternalState();
        var defineProperty = requireObjectDefineProperty().f;
        var defineIterator = requireIteratorDefine();
        var createIterResultObject = requireCreateIterResultObject();
        var IS_PURE = requireIsPure();
        var DESCRIPTORS = requireDescriptors();
        var ARRAY_ITERATOR = "Array Iterator";
        var setInternalState = InternalStateModule.set;
        var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);
        es_array_iterator = defineIterator(Array, "Array", function(iterated, kind) {
            setInternalState(this, {
                type: ARRAY_ITERATOR,
                target: toIndexedObject(iterated),
                index: 0,
                kind: kind
            });
        }, function() {
            var state = getInternalState(this);
            var target = state.target;
            var index = state.index++;
            if (!target || index >= target.length) {
                state.target = null;
                return createIterResultObject(undefined, true);
            }
            switch (state.kind) {
              case "keys":
                return createIterResultObject(index, false);

              case "values":
                return createIterResultObject(target[index], false);
            }
            return createIterResultObject([ index, target[index] ], false);
        }, "values");
        var values = Iterators.Arguments = Iterators.Array;
        addToUnscopables("keys");
        addToUnscopables("values");
        addToUnscopables("entries");
        if (!IS_PURE && DESCRIPTORS && values.name !== "values") try {
            defineProperty(values, "name", {
                value: "values"
            });
        } catch (error) {}
        return es_array_iterator;
    }
    requireEs_array_iterator();
    var es_array_map = {};
    var functionUncurryThisClause;
    var hasRequiredFunctionUncurryThisClause;
    function requireFunctionUncurryThisClause() {
        if (hasRequiredFunctionUncurryThisClause) return functionUncurryThisClause;
        hasRequiredFunctionUncurryThisClause = 1;
        var classofRaw = requireClassofRaw();
        var uncurryThis = requireFunctionUncurryThis();
        functionUncurryThisClause = function(fn) {
            if (classofRaw(fn) === "Function") return uncurryThis(fn);
        };
        return functionUncurryThisClause;
    }
    var functionBindContext;
    var hasRequiredFunctionBindContext;
    function requireFunctionBindContext() {
        if (hasRequiredFunctionBindContext) return functionBindContext;
        hasRequiredFunctionBindContext = 1;
        var uncurryThis = requireFunctionUncurryThisClause();
        var aCallable = requireACallable();
        var NATIVE_BIND = requireFunctionBindNative();
        var bind = uncurryThis(uncurryThis.bind);
        functionBindContext = function(fn, that) {
            aCallable(fn);
            return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function() {
                return fn.apply(that, arguments);
            };
        };
        return functionBindContext;
    }
    var isArray;
    var hasRequiredIsArray;
    function requireIsArray() {
        if (hasRequiredIsArray) return isArray;
        hasRequiredIsArray = 1;
        var classof = requireClassofRaw();
        isArray = Array.isArray || function isArray(argument) {
            return classof(argument) === "Array";
        };
        return isArray;
    }
    var toStringTagSupport;
    var hasRequiredToStringTagSupport;
    function requireToStringTagSupport() {
        if (hasRequiredToStringTagSupport) return toStringTagSupport;
        hasRequiredToStringTagSupport = 1;
        var wellKnownSymbol = requireWellKnownSymbol();
        var TO_STRING_TAG = wellKnownSymbol("toStringTag");
        var test = {};
        test[TO_STRING_TAG] = "z";
        toStringTagSupport = String(test) === "[object z]";
        return toStringTagSupport;
    }
    var classof;
    var hasRequiredClassof;
    function requireClassof() {
        if (hasRequiredClassof) return classof;
        hasRequiredClassof = 1;
        var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
        var isCallable = requireIsCallable();
        var classofRaw = requireClassofRaw();
        var wellKnownSymbol = requireWellKnownSymbol();
        var TO_STRING_TAG = wellKnownSymbol("toStringTag");
        var $Object = Object;
        var CORRECT_ARGUMENTS = classofRaw(function() {
            return arguments;
        }()) === "Arguments";
        var tryGet = function(it, key) {
            try {
                return it[key];
            } catch (error) {}
        };
        classof = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
            var O, tag, result;
            return it === undefined ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) === "Object" && isCallable(O.callee) ? "Arguments" : result;
        };
        return classof;
    }
    var isConstructor;
    var hasRequiredIsConstructor;
    function requireIsConstructor() {
        if (hasRequiredIsConstructor) return isConstructor;
        hasRequiredIsConstructor = 1;
        var uncurryThis = requireFunctionUncurryThis();
        var fails = requireFails();
        var isCallable = requireIsCallable();
        var classof = requireClassof();
        var getBuiltIn = requireGetBuiltIn();
        var inspectSource = requireInspectSource();
        var noop = function() {};
        var construct = getBuiltIn("Reflect", "construct");
        var constructorRegExp = /^\s*(?:class|function)\b/;
        var exec = uncurryThis(constructorRegExp.exec);
        var INCORRECT_TO_STRING = !constructorRegExp.test(noop);
        var isConstructorModern = function isConstructor(argument) {
            if (!isCallable(argument)) return false;
            try {
                construct(noop, [], argument);
                return true;
            } catch (error) {
                return false;
            }
        };
        var isConstructorLegacy = function isConstructor(argument) {
            if (!isCallable(argument)) return false;
            switch (classof(argument)) {
              case "AsyncFunction":
              case "GeneratorFunction":
              case "AsyncGeneratorFunction":
                return false;
            }
            try {
                return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
            } catch (error) {
                return true;
            }
        };
        isConstructorLegacy.sham = true;
        isConstructor = !construct || fails(function() {
            var called;
            return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function() {
                called = true;
            }) || called;
        }) ? isConstructorLegacy : isConstructorModern;
        return isConstructor;
    }
    var arraySpeciesConstructor;
    var hasRequiredArraySpeciesConstructor;
    function requireArraySpeciesConstructor() {
        if (hasRequiredArraySpeciesConstructor) return arraySpeciesConstructor;
        hasRequiredArraySpeciesConstructor = 1;
        var isArray = requireIsArray();
        var isConstructor = requireIsConstructor();
        var isObject = requireIsObject();
        var wellKnownSymbol = requireWellKnownSymbol();
        var SPECIES = wellKnownSymbol("species");
        var $Array = Array;
        arraySpeciesConstructor = function(originalArray) {
            var C;
            if (isArray(originalArray)) {
                C = originalArray.constructor;
                if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined; else if (isObject(C)) {
                    C = C[SPECIES];
                    if (C === null) C = undefined;
                }
            }
            return C === undefined ? $Array : C;
        };
        return arraySpeciesConstructor;
    }
    var arraySpeciesCreate;
    var hasRequiredArraySpeciesCreate;
    function requireArraySpeciesCreate() {
        if (hasRequiredArraySpeciesCreate) return arraySpeciesCreate;
        hasRequiredArraySpeciesCreate = 1;
        var arraySpeciesConstructor = requireArraySpeciesConstructor();
        arraySpeciesCreate = function(originalArray, length) {
            return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
        };
        return arraySpeciesCreate;
    }
    var arrayIteration;
    var hasRequiredArrayIteration;
    function requireArrayIteration() {
        if (hasRequiredArrayIteration) return arrayIteration;
        hasRequiredArrayIteration = 1;
        var bind = requireFunctionBindContext();
        var uncurryThis = requireFunctionUncurryThis();
        var IndexedObject = requireIndexedObject();
        var toObject = requireToObject();
        var lengthOfArrayLike = requireLengthOfArrayLike();
        var arraySpeciesCreate = requireArraySpeciesCreate();
        var push = uncurryThis([].push);
        var createMethod = function(TYPE) {
            var IS_MAP = TYPE === 1;
            var IS_FILTER = TYPE === 2;
            var IS_SOME = TYPE === 3;
            var IS_EVERY = TYPE === 4;
            var IS_FIND_INDEX = TYPE === 6;
            var IS_FILTER_REJECT = TYPE === 7;
            var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
            return function($this, callbackfn, that, specificCreate) {
                var O = toObject($this);
                var self = IndexedObject(O);
                var length = lengthOfArrayLike(self);
                var boundFunction = bind(callbackfn, that);
                var index = 0;
                var create = specificCreate || arraySpeciesCreate;
                var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
                var value, result;
                for (;length > index; index++) if (NO_HOLES || index in self) {
                    value = self[index];
                    result = boundFunction(value, index, O);
                    if (TYPE) {
                        if (IS_MAP) target[index] = result; else if (result) switch (TYPE) {
                          case 3:
                            return true;

                          case 5:
                            return value;

                          case 6:
                            return index;

                          case 2:
                            push(target, value);
                        } else switch (TYPE) {
                          case 4:
                            return false;

                          case 7:
                            push(target, value);
                        }
                    }
                }
                return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
            };
        };
        arrayIteration = {
            forEach: createMethod(0),
            map: createMethod(1),
            filter: createMethod(2),
            some: createMethod(3),
            every: createMethod(4),
            find: createMethod(5),
            findIndex: createMethod(6),
            filterReject: createMethod(7)
        };
        return arrayIteration;
    }
    var arrayMethodHasSpeciesSupport;
    var hasRequiredArrayMethodHasSpeciesSupport;
    function requireArrayMethodHasSpeciesSupport() {
        if (hasRequiredArrayMethodHasSpeciesSupport) return arrayMethodHasSpeciesSupport;
        hasRequiredArrayMethodHasSpeciesSupport = 1;
        var fails = requireFails();
        var wellKnownSymbol = requireWellKnownSymbol();
        var V8_VERSION = requireEnvironmentV8Version();
        var SPECIES = wellKnownSymbol("species");
        arrayMethodHasSpeciesSupport = function(METHOD_NAME) {
            return V8_VERSION >= 51 || !fails(function() {
                var array = [];
                var constructor = array.constructor = {};
                constructor[SPECIES] = function() {
                    return {
                        foo: 1
                    };
                };
                return array[METHOD_NAME](Boolean).foo !== 1;
            });
        };
        return arrayMethodHasSpeciesSupport;
    }
    var hasRequiredEs_array_map;
    function requireEs_array_map() {
        if (hasRequiredEs_array_map) return es_array_map;
        hasRequiredEs_array_map = 1;
        var $ = require_export();
        var $map = requireArrayIteration().map;
        var arrayMethodHasSpeciesSupport = requireArrayMethodHasSpeciesSupport();
        var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("map");
        $({
            target: "Array",
            proto: true,
            forced: !HAS_SPECIES_SUPPORT
        }, {
            map: function map(callbackfn) {
                return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
            }
        });
        return es_array_map;
    }
    requireEs_array_map();
    var es_map = {};
    var es_map_constructor = {};
    var internalMetadata = {
        exports: {}
    };
    var objectGetOwnPropertyNamesExternal = {};
    var arraySlice;
    var hasRequiredArraySlice;
    function requireArraySlice() {
        if (hasRequiredArraySlice) return arraySlice;
        hasRequiredArraySlice = 1;
        var uncurryThis = requireFunctionUncurryThis();
        arraySlice = uncurryThis([].slice);
        return arraySlice;
    }
    var hasRequiredObjectGetOwnPropertyNamesExternal;
    function requireObjectGetOwnPropertyNamesExternal() {
        if (hasRequiredObjectGetOwnPropertyNamesExternal) return objectGetOwnPropertyNamesExternal;
        hasRequiredObjectGetOwnPropertyNamesExternal = 1;
        var classof = requireClassofRaw();
        var toIndexedObject = requireToIndexedObject();
        var $getOwnPropertyNames = requireObjectGetOwnPropertyNames().f;
        var arraySlice = requireArraySlice();
        var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
        var getWindowNames = function(it) {
            try {
                return $getOwnPropertyNames(it);
            } catch (error) {
                return arraySlice(windowNames);
            }
        };
        objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
            return windowNames && classof(it) === "Window" ? getWindowNames(it) : $getOwnPropertyNames(toIndexedObject(it));
        };
        return objectGetOwnPropertyNamesExternal;
    }
    var arrayBufferNonExtensible;
    var hasRequiredArrayBufferNonExtensible;
    function requireArrayBufferNonExtensible() {
        if (hasRequiredArrayBufferNonExtensible) return arrayBufferNonExtensible;
        hasRequiredArrayBufferNonExtensible = 1;
        var fails = requireFails();
        arrayBufferNonExtensible = fails(function() {
            if (typeof ArrayBuffer == "function") {
                var buffer = new ArrayBuffer(8);
                if (Object.isExtensible(buffer)) Object.defineProperty(buffer, "a", {
                    value: 8
                });
            }
        });
        return arrayBufferNonExtensible;
    }
    var objectIsExtensible;
    var hasRequiredObjectIsExtensible;
    function requireObjectIsExtensible() {
        if (hasRequiredObjectIsExtensible) return objectIsExtensible;
        hasRequiredObjectIsExtensible = 1;
        var fails = requireFails();
        var isObject = requireIsObject();
        var classof = requireClassofRaw();
        var ARRAY_BUFFER_NON_EXTENSIBLE = requireArrayBufferNonExtensible();
        var $isExtensible = Object.isExtensible;
        var FAILS_ON_PRIMITIVES = fails(function() {});
        objectIsExtensible = FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE ? function isExtensible(it) {
            if (!isObject(it)) return false;
            if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === "ArrayBuffer") return false;
            return $isExtensible ? $isExtensible(it) : true;
        } : $isExtensible;
        return objectIsExtensible;
    }
    var freezing;
    var hasRequiredFreezing;
    function requireFreezing() {
        if (hasRequiredFreezing) return freezing;
        hasRequiredFreezing = 1;
        var fails = requireFails();
        freezing = !fails(function() {
            return Object.isExtensible(Object.preventExtensions({}));
        });
        return freezing;
    }
    var hasRequiredInternalMetadata;
    function requireInternalMetadata() {
        if (hasRequiredInternalMetadata) return internalMetadata.exports;
        hasRequiredInternalMetadata = 1;
        var $ = require_export();
        var uncurryThis = requireFunctionUncurryThis();
        var hiddenKeys = requireHiddenKeys();
        var isObject = requireIsObject();
        var hasOwn = requireHasOwnProperty();
        var defineProperty = requireObjectDefineProperty().f;
        var getOwnPropertyNamesModule = requireObjectGetOwnPropertyNames();
        var getOwnPropertyNamesExternalModule = requireObjectGetOwnPropertyNamesExternal();
        var isExtensible = requireObjectIsExtensible();
        var uid = requireUid();
        var FREEZING = requireFreezing();
        var REQUIRED = false;
        var METADATA = uid("meta");
        var id = 0;
        var setMetadata = function(it) {
            defineProperty(it, METADATA, {
                value: {
                    objectID: "O" + id++,
                    weakData: {}
                }
            });
        };
        var fastKey = function(it, create) {
            if (!isObject(it)) return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;
            if (!hasOwn(it, METADATA)) {
                if (!isExtensible(it)) return "F";
                if (!create) return "E";
                setMetadata(it);
            }
            return it[METADATA].objectID;
        };
        var getWeakData = function(it, create) {
            if (!hasOwn(it, METADATA)) {
                if (!isExtensible(it)) return true;
                if (!create) return false;
                setMetadata(it);
            }
            return it[METADATA].weakData;
        };
        var onFreeze = function(it) {
            if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
            return it;
        };
        var enable = function() {
            meta.enable = function() {};
            REQUIRED = true;
            var getOwnPropertyNames = getOwnPropertyNamesModule.f;
            var splice = uncurryThis([].splice);
            var test = {};
            test[METADATA] = 1;
            if (getOwnPropertyNames(test).length) {
                getOwnPropertyNamesModule.f = function(it) {
                    var result = getOwnPropertyNames(it);
                    for (var i = 0, length = result.length; i < length; i++) {
                        if (result[i] === METADATA) {
                            splice(result, i, 1);
                            break;
                        }
                    }
                    return result;
                };
                $({
                    target: "Object",
                    stat: true,
                    forced: true
                }, {
                    getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
                });
            }
        };
        var meta = internalMetadata.exports = {
            enable: enable,
            fastKey: fastKey,
            getWeakData: getWeakData,
            onFreeze: onFreeze
        };
        hiddenKeys[METADATA] = true;
        return internalMetadata.exports;
    }
    var isArrayIteratorMethod;
    var hasRequiredIsArrayIteratorMethod;
    function requireIsArrayIteratorMethod() {
        if (hasRequiredIsArrayIteratorMethod) return isArrayIteratorMethod;
        hasRequiredIsArrayIteratorMethod = 1;
        var wellKnownSymbol = requireWellKnownSymbol();
        var Iterators = requireIterators();
        var ITERATOR = wellKnownSymbol("iterator");
        var ArrayPrototype = Array.prototype;
        isArrayIteratorMethod = function(it) {
            return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
        };
        return isArrayIteratorMethod;
    }
    var getIteratorMethod;
    var hasRequiredGetIteratorMethod;
    function requireGetIteratorMethod() {
        if (hasRequiredGetIteratorMethod) return getIteratorMethod;
        hasRequiredGetIteratorMethod = 1;
        var classof = requireClassof();
        var getMethod = requireGetMethod();
        var isNullOrUndefined = requireIsNullOrUndefined();
        var Iterators = requireIterators();
        var wellKnownSymbol = requireWellKnownSymbol();
        var ITERATOR = wellKnownSymbol("iterator");
        getIteratorMethod = function(it) {
            if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR) || getMethod(it, "@@iterator") || Iterators[classof(it)];
        };
        return getIteratorMethod;
    }
    var getIterator;
    var hasRequiredGetIterator;
    function requireGetIterator() {
        if (hasRequiredGetIterator) return getIterator;
        hasRequiredGetIterator = 1;
        var call = requireFunctionCall();
        var aCallable = requireACallable();
        var anObject = requireAnObject();
        var tryToString = requireTryToString();
        var getIteratorMethod = requireGetIteratorMethod();
        var $TypeError = TypeError;
        getIterator = function(argument, usingIterator) {
            var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
            if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
            throw new $TypeError(tryToString(argument) + " is not iterable");
        };
        return getIterator;
    }
    var iteratorClose;
    var hasRequiredIteratorClose;
    function requireIteratorClose() {
        if (hasRequiredIteratorClose) return iteratorClose;
        hasRequiredIteratorClose = 1;
        var call = requireFunctionCall();
        var anObject = requireAnObject();
        var getMethod = requireGetMethod();
        iteratorClose = function(iterator, kind, value) {
            var innerResult, innerError;
            anObject(iterator);
            try {
                innerResult = getMethod(iterator, "return");
                if (!innerResult) {
                    if (kind === "throw") throw value;
                    return value;
                }
                innerResult = call(innerResult, iterator);
            } catch (error) {
                innerError = true;
                innerResult = error;
            }
            if (kind === "throw") throw value;
            if (innerError) throw innerResult;
            anObject(innerResult);
            return value;
        };
        return iteratorClose;
    }
    var iterate;
    var hasRequiredIterate;
    function requireIterate() {
        if (hasRequiredIterate) return iterate;
        hasRequiredIterate = 1;
        var bind = requireFunctionBindContext();
        var call = requireFunctionCall();
        var anObject = requireAnObject();
        var tryToString = requireTryToString();
        var isArrayIteratorMethod = requireIsArrayIteratorMethod();
        var lengthOfArrayLike = requireLengthOfArrayLike();
        var isPrototypeOf = requireObjectIsPrototypeOf();
        var getIterator = requireGetIterator();
        var getIteratorMethod = requireGetIteratorMethod();
        var iteratorClose = requireIteratorClose();
        var $TypeError = TypeError;
        var Result = function(stopped, result) {
            this.stopped = stopped;
            this.result = result;
        };
        var ResultPrototype = Result.prototype;
        iterate = function(iterable, unboundFunction, options) {
            var that = options && options.that;
            var AS_ENTRIES = !!(options && options.AS_ENTRIES);
            var IS_RECORD = !!(options && options.IS_RECORD);
            var IS_ITERATOR = !!(options && options.IS_ITERATOR);
            var INTERRUPTED = !!(options && options.INTERRUPTED);
            var fn = bind(unboundFunction, that);
            var iterator, iterFn, index, length, result, next, step;
            var stop = function(condition) {
                if (iterator) iteratorClose(iterator, "normal");
                return new Result(true, condition);
            };
            var callFn = function(value) {
                if (AS_ENTRIES) {
                    anObject(value);
                    return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
                }
                return INTERRUPTED ? fn(value, stop) : fn(value);
            };
            if (IS_RECORD) {
                iterator = iterable.iterator;
            } else if (IS_ITERATOR) {
                iterator = iterable;
            } else {
                iterFn = getIteratorMethod(iterable);
                if (!iterFn) throw new $TypeError(tryToString(iterable) + " is not iterable");
                if (isArrayIteratorMethod(iterFn)) {
                    for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
                        result = callFn(iterable[index]);
                        if (result && isPrototypeOf(ResultPrototype, result)) return result;
                    }
                    return new Result(false);
                }
                iterator = getIterator(iterable, iterFn);
            }
            next = IS_RECORD ? iterable.next : iterator.next;
            while (!(step = call(next, iterator)).done) {
                try {
                    result = callFn(step.value);
                } catch (error) {
                    iteratorClose(iterator, "throw", error);
                }
                if (typeof result == "object" && result && isPrototypeOf(ResultPrototype, result)) return result;
            }
            return new Result(false);
        };
        return iterate;
    }
    var anInstance;
    var hasRequiredAnInstance;
    function requireAnInstance() {
        if (hasRequiredAnInstance) return anInstance;
        hasRequiredAnInstance = 1;
        var isPrototypeOf = requireObjectIsPrototypeOf();
        var $TypeError = TypeError;
        anInstance = function(it, Prototype) {
            if (isPrototypeOf(Prototype, it)) return it;
            throw new $TypeError("Incorrect invocation");
        };
        return anInstance;
    }
    var checkCorrectnessOfIteration;
    var hasRequiredCheckCorrectnessOfIteration;
    function requireCheckCorrectnessOfIteration() {
        if (hasRequiredCheckCorrectnessOfIteration) return checkCorrectnessOfIteration;
        hasRequiredCheckCorrectnessOfIteration = 1;
        var wellKnownSymbol = requireWellKnownSymbol();
        var ITERATOR = wellKnownSymbol("iterator");
        var SAFE_CLOSING = false;
        try {
            var called = 0;
            var iteratorWithReturn = {
                next: function() {
                    return {
                        done: !!called++
                    };
                },
                return: function() {
                    SAFE_CLOSING = true;
                }
            };
            iteratorWithReturn[ITERATOR] = function() {
                return this;
            };
            Array.from(iteratorWithReturn, function() {
                throw 2;
            });
        } catch (error) {}
        checkCorrectnessOfIteration = function(exec, SKIP_CLOSING) {
            try {
                if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
            } catch (error) {
                return false;
            }
            var ITERATION_SUPPORT = false;
            try {
                var object = {};
                object[ITERATOR] = function() {
                    return {
                        next: function() {
                            return {
                                done: ITERATION_SUPPORT = true
                            };
                        }
                    };
                };
                exec(object);
            } catch (error) {}
            return ITERATION_SUPPORT;
        };
        return checkCorrectnessOfIteration;
    }
    var inheritIfRequired;
    var hasRequiredInheritIfRequired;
    function requireInheritIfRequired() {
        if (hasRequiredInheritIfRequired) return inheritIfRequired;
        hasRequiredInheritIfRequired = 1;
        var isCallable = requireIsCallable();
        var isObject = requireIsObject();
        var setPrototypeOf = requireObjectSetPrototypeOf();
        inheritIfRequired = function($this, dummy, Wrapper) {
            var NewTarget, NewTargetPrototype;
            if (setPrototypeOf && isCallable(NewTarget = dummy.constructor) && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) setPrototypeOf($this, NewTargetPrototype);
            return $this;
        };
        return inheritIfRequired;
    }
    var collection;
    var hasRequiredCollection;
    function requireCollection() {
        if (hasRequiredCollection) return collection;
        hasRequiredCollection = 1;
        var $ = require_export();
        var globalThis = requireGlobalThis();
        var uncurryThis = requireFunctionUncurryThis();
        var isForced = requireIsForced();
        var defineBuiltIn = requireDefineBuiltIn();
        var InternalMetadataModule = requireInternalMetadata();
        var iterate = requireIterate();
        var anInstance = requireAnInstance();
        var isCallable = requireIsCallable();
        var isNullOrUndefined = requireIsNullOrUndefined();
        var isObject = requireIsObject();
        var fails = requireFails();
        var checkCorrectnessOfIteration = requireCheckCorrectnessOfIteration();
        var setToStringTag = requireSetToStringTag();
        var inheritIfRequired = requireInheritIfRequired();
        collection = function(CONSTRUCTOR_NAME, wrapper, common) {
            var IS_MAP = CONSTRUCTOR_NAME.indexOf("Map") !== -1;
            var IS_WEAK = CONSTRUCTOR_NAME.indexOf("Weak") !== -1;
            var ADDER = IS_MAP ? "set" : "add";
            var NativeConstructor = globalThis[CONSTRUCTOR_NAME];
            var NativePrototype = NativeConstructor && NativeConstructor.prototype;
            var Constructor = NativeConstructor;
            var exported = {};
            var fixMethod = function(KEY) {
                var uncurriedNativeMethod = uncurryThis(NativePrototype[KEY]);
                defineBuiltIn(NativePrototype, KEY, KEY === "add" ? function add(value) {
                    uncurriedNativeMethod(this, value === 0 ? 0 : value);
                    return this;
                } : KEY === "delete" ? function(key) {
                    return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
                } : KEY === "get" ? function get(key) {
                    return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
                } : KEY === "has" ? function has(key) {
                    return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
                } : function set(key, value) {
                    uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
                    return this;
                });
            };
            var REPLACE = isForced(CONSTRUCTOR_NAME, !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails(function() {
                (new NativeConstructor).entries().next();
            })));
            if (REPLACE) {
                Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
                InternalMetadataModule.enable();
            } else if (isForced(CONSTRUCTOR_NAME, true)) {
                var instance = new Constructor;
                var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) !== instance;
                var THROWS_ON_PRIMITIVES = fails(function() {
                    instance.has(1);
                });
                var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function(iterable) {
                    new NativeConstructor(iterable);
                });
                var BUGGY_ZERO = !IS_WEAK && fails(function() {
                    var $instance = new NativeConstructor;
                    var index = 5;
                    while (index--) $instance[ADDER](index, index);
                    return !$instance.has(-0);
                });
                if (!ACCEPT_ITERABLES) {
                    Constructor = wrapper(function(dummy, iterable) {
                        anInstance(dummy, NativePrototype);
                        var that = inheritIfRequired(new NativeConstructor, dummy, Constructor);
                        if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], {
                            that: that,
                            AS_ENTRIES: IS_MAP
                        });
                        return that;
                    });
                    Constructor.prototype = NativePrototype;
                    NativePrototype.constructor = Constructor;
                }
                if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
                    fixMethod("delete");
                    fixMethod("has");
                    IS_MAP && fixMethod("get");
                }
                if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
                if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
            }
            exported[CONSTRUCTOR_NAME] = Constructor;
            $({
                global: true,
                constructor: true,
                forced: Constructor !== NativeConstructor
            }, exported);
            setToStringTag(Constructor, CONSTRUCTOR_NAME);
            if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
            return Constructor;
        };
        return collection;
    }
    var defineBuiltInAccessor;
    var hasRequiredDefineBuiltInAccessor;
    function requireDefineBuiltInAccessor() {
        if (hasRequiredDefineBuiltInAccessor) return defineBuiltInAccessor;
        hasRequiredDefineBuiltInAccessor = 1;
        var makeBuiltIn = requireMakeBuiltIn();
        var defineProperty = requireObjectDefineProperty();
        defineBuiltInAccessor = function(target, name, descriptor) {
            if (descriptor.get) makeBuiltIn(descriptor.get, name, {
                getter: true
            });
            if (descriptor.set) makeBuiltIn(descriptor.set, name, {
                setter: true
            });
            return defineProperty.f(target, name, descriptor);
        };
        return defineBuiltInAccessor;
    }
    var defineBuiltIns;
    var hasRequiredDefineBuiltIns;
    function requireDefineBuiltIns() {
        if (hasRequiredDefineBuiltIns) return defineBuiltIns;
        hasRequiredDefineBuiltIns = 1;
        var defineBuiltIn = requireDefineBuiltIn();
        defineBuiltIns = function(target, src, options) {
            for (var key in src) defineBuiltIn(target, key, src[key], options);
            return target;
        };
        return defineBuiltIns;
    }
    var setSpecies;
    var hasRequiredSetSpecies;
    function requireSetSpecies() {
        if (hasRequiredSetSpecies) return setSpecies;
        hasRequiredSetSpecies = 1;
        var getBuiltIn = requireGetBuiltIn();
        var defineBuiltInAccessor = requireDefineBuiltInAccessor();
        var wellKnownSymbol = requireWellKnownSymbol();
        var DESCRIPTORS = requireDescriptors();
        var SPECIES = wellKnownSymbol("species");
        setSpecies = function(CONSTRUCTOR_NAME) {
            var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
            if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
                defineBuiltInAccessor(Constructor, SPECIES, {
                    configurable: true,
                    get: function() {
                        return this;
                    }
                });
            }
        };
        return setSpecies;
    }
    var collectionStrong;
    var hasRequiredCollectionStrong;
    function requireCollectionStrong() {
        if (hasRequiredCollectionStrong) return collectionStrong;
        hasRequiredCollectionStrong = 1;
        var create = requireObjectCreate();
        var defineBuiltInAccessor = requireDefineBuiltInAccessor();
        var defineBuiltIns = requireDefineBuiltIns();
        var bind = requireFunctionBindContext();
        var anInstance = requireAnInstance();
        var isNullOrUndefined = requireIsNullOrUndefined();
        var iterate = requireIterate();
        var defineIterator = requireIteratorDefine();
        var createIterResultObject = requireCreateIterResultObject();
        var setSpecies = requireSetSpecies();
        var DESCRIPTORS = requireDescriptors();
        var fastKey = requireInternalMetadata().fastKey;
        var InternalStateModule = requireInternalState();
        var setInternalState = InternalStateModule.set;
        var internalStateGetterFor = InternalStateModule.getterFor;
        collectionStrong = {
            getConstructor: function(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
                var Constructor = wrapper(function(that, iterable) {
                    anInstance(that, Prototype);
                    setInternalState(that, {
                        type: CONSTRUCTOR_NAME,
                        index: create(null),
                        first: null,
                        last: null,
                        size: 0
                    });
                    if (!DESCRIPTORS) that.size = 0;
                    if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], {
                        that: that,
                        AS_ENTRIES: IS_MAP
                    });
                });
                var Prototype = Constructor.prototype;
                var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
                var define = function(that, key, value) {
                    var state = getInternalState(that);
                    var entry = getEntry(that, key);
                    var previous, index;
                    if (entry) {
                        entry.value = value;
                    } else {
                        state.last = entry = {
                            index: index = fastKey(key, true),
                            key: key,
                            value: value,
                            previous: previous = state.last,
                            next: null,
                            removed: false
                        };
                        if (!state.first) state.first = entry;
                        if (previous) previous.next = entry;
                        if (DESCRIPTORS) state.size++; else that.size++;
                        if (index !== "F") state.index[index] = entry;
                    }
                    return that;
                };
                var getEntry = function(that, key) {
                    var state = getInternalState(that);
                    var index = fastKey(key);
                    var entry;
                    if (index !== "F") return state.index[index];
                    for (entry = state.first; entry; entry = entry.next) {
                        if (entry.key === key) return entry;
                    }
                };
                defineBuiltIns(Prototype, {
                    clear: function clear() {
                        var that = this;
                        var state = getInternalState(that);
                        var entry = state.first;
                        while (entry) {
                            entry.removed = true;
                            if (entry.previous) entry.previous = entry.previous.next = null;
                            entry = entry.next;
                        }
                        state.first = state.last = null;
                        state.index = create(null);
                        if (DESCRIPTORS) state.size = 0; else that.size = 0;
                    },
                    delete: function(key) {
                        var that = this;
                        var state = getInternalState(that);
                        var entry = getEntry(that, key);
                        if (entry) {
                            var next = entry.next;
                            var prev = entry.previous;
                            delete state.index[entry.index];
                            entry.removed = true;
                            if (prev) prev.next = next;
                            if (next) next.previous = prev;
                            if (state.first === entry) state.first = next;
                            if (state.last === entry) state.last = prev;
                            if (DESCRIPTORS) state.size--; else that.size--;
                        }
                        return !!entry;
                    },
                    forEach: function forEach(callbackfn) {
                        var state = getInternalState(this);
                        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
                        var entry;
                        while (entry = entry ? entry.next : state.first) {
                            boundFunction(entry.value, entry.key, this);
                            while (entry && entry.removed) entry = entry.previous;
                        }
                    },
                    has: function has(key) {
                        return !!getEntry(this, key);
                    }
                });
                defineBuiltIns(Prototype, IS_MAP ? {
                    get: function get(key) {
                        var entry = getEntry(this, key);
                        return entry && entry.value;
                    },
                    set: function set(key, value) {
                        return define(this, key === 0 ? 0 : key, value);
                    }
                } : {
                    add: function add(value) {
                        return define(this, value = value === 0 ? 0 : value, value);
                    }
                });
                if (DESCRIPTORS) defineBuiltInAccessor(Prototype, "size", {
                    configurable: true,
                    get: function() {
                        return getInternalState(this).size;
                    }
                });
                return Constructor;
            },
            setStrong: function(Constructor, CONSTRUCTOR_NAME, IS_MAP) {
                var ITERATOR_NAME = CONSTRUCTOR_NAME + " Iterator";
                var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
                var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
                defineIterator(Constructor, CONSTRUCTOR_NAME, function(iterated, kind) {
                    setInternalState(this, {
                        type: ITERATOR_NAME,
                        target: iterated,
                        state: getInternalCollectionState(iterated),
                        kind: kind,
                        last: null
                    });
                }, function() {
                    var state = getInternalIteratorState(this);
                    var kind = state.kind;
                    var entry = state.last;
                    while (entry && entry.removed) entry = entry.previous;
                    if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
                        state.target = null;
                        return createIterResultObject(undefined, true);
                    }
                    if (kind === "keys") return createIterResultObject(entry.key, false);
                    if (kind === "values") return createIterResultObject(entry.value, false);
                    return createIterResultObject([ entry.key, entry.value ], false);
                }, IS_MAP ? "entries" : "values", !IS_MAP, true);
                setSpecies(CONSTRUCTOR_NAME);
            }
        };
        return collectionStrong;
    }
    var hasRequiredEs_map_constructor;
    function requireEs_map_constructor() {
        if (hasRequiredEs_map_constructor) return es_map_constructor;
        hasRequiredEs_map_constructor = 1;
        var collection = requireCollection();
        var collectionStrong = requireCollectionStrong();
        collection("Map", function(init) {
            return function Map() {
                return init(this, arguments.length ? arguments[0] : undefined);
            };
        }, collectionStrong);
        return es_map_constructor;
    }
    var hasRequiredEs_map;
    function requireEs_map() {
        if (hasRequiredEs_map) return es_map;
        hasRequiredEs_map = 1;
        requireEs_map_constructor();
        return es_map;
    }
    requireEs_map();
    var es_object_toString = {};
    var objectToString;
    var hasRequiredObjectToString;
    function requireObjectToString() {
        if (hasRequiredObjectToString) return objectToString;
        hasRequiredObjectToString = 1;
        var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
        var classof = requireClassof();
        objectToString = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
            return "[object " + classof(this) + "]";
        };
        return objectToString;
    }
    var hasRequiredEs_object_toString;
    function requireEs_object_toString() {
        if (hasRequiredEs_object_toString) return es_object_toString;
        hasRequiredEs_object_toString = 1;
        var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
        var defineBuiltIn = requireDefineBuiltIn();
        var toString = requireObjectToString();
        if (!TO_STRING_TAG_SUPPORT) {
            defineBuiltIn(Object.prototype, "toString", toString, {
                unsafe: true
            });
        }
        return es_object_toString;
    }
    requireEs_object_toString();
    var es_promise = {};
    var es_promise_constructor = {};
    var environment;
    var hasRequiredEnvironment;
    function requireEnvironment() {
        if (hasRequiredEnvironment) return environment;
        hasRequiredEnvironment = 1;
        var globalThis = requireGlobalThis();
        var userAgent = requireEnvironmentUserAgent();
        var classof = requireClassofRaw();
        var userAgentStartsWith = function(string) {
            return userAgent.slice(0, string.length) === string;
        };
        environment = function() {
            if (userAgentStartsWith("Bun/")) return "BUN";
            if (userAgentStartsWith("Cloudflare-Workers")) return "CLOUDFLARE";
            if (userAgentStartsWith("Deno/")) return "DENO";
            if (userAgentStartsWith("Node.js/")) return "NODE";
            if (globalThis.Bun && typeof Bun.version == "string") return "BUN";
            if (globalThis.Deno && typeof Deno.version == "object") return "DENO";
            if (classof(globalThis.process) === "process") return "NODE";
            if (globalThis.window && globalThis.document) return "BROWSER";
            return "REST";
        }();
        return environment;
    }
    var environmentIsNode;
    var hasRequiredEnvironmentIsNode;
    function requireEnvironmentIsNode() {
        if (hasRequiredEnvironmentIsNode) return environmentIsNode;
        hasRequiredEnvironmentIsNode = 1;
        var ENVIRONMENT = requireEnvironment();
        environmentIsNode = ENVIRONMENT === "NODE";
        return environmentIsNode;
    }
    var path;
    var hasRequiredPath;
    function requirePath() {
        if (hasRequiredPath) return path;
        hasRequiredPath = 1;
        var globalThis = requireGlobalThis();
        path = globalThis;
        return path;
    }
    var aConstructor;
    var hasRequiredAConstructor;
    function requireAConstructor() {
        if (hasRequiredAConstructor) return aConstructor;
        hasRequiredAConstructor = 1;
        var isConstructor = requireIsConstructor();
        var tryToString = requireTryToString();
        var $TypeError = TypeError;
        aConstructor = function(argument) {
            if (isConstructor(argument)) return argument;
            throw new $TypeError(tryToString(argument) + " is not a constructor");
        };
        return aConstructor;
    }
    var speciesConstructor;
    var hasRequiredSpeciesConstructor;
    function requireSpeciesConstructor() {
        if (hasRequiredSpeciesConstructor) return speciesConstructor;
        hasRequiredSpeciesConstructor = 1;
        var anObject = requireAnObject();
        var aConstructor = requireAConstructor();
        var isNullOrUndefined = requireIsNullOrUndefined();
        var wellKnownSymbol = requireWellKnownSymbol();
        var SPECIES = wellKnownSymbol("species");
        speciesConstructor = function(O, defaultConstructor) {
            var C = anObject(O).constructor;
            var S;
            return C === undefined || isNullOrUndefined(S = anObject(C)[SPECIES]) ? defaultConstructor : aConstructor(S);
        };
        return speciesConstructor;
    }
    var functionApply;
    var hasRequiredFunctionApply;
    function requireFunctionApply() {
        if (hasRequiredFunctionApply) return functionApply;
        hasRequiredFunctionApply = 1;
        var NATIVE_BIND = requireFunctionBindNative();
        var FunctionPrototype = Function.prototype;
        var apply = FunctionPrototype.apply;
        var call = FunctionPrototype.call;
        functionApply = typeof Reflect == "object" && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function() {
            return call.apply(apply, arguments);
        });
        return functionApply;
    }
    var validateArgumentsLength;
    var hasRequiredValidateArgumentsLength;
    function requireValidateArgumentsLength() {
        if (hasRequiredValidateArgumentsLength) return validateArgumentsLength;
        hasRequiredValidateArgumentsLength = 1;
        var $TypeError = TypeError;
        validateArgumentsLength = function(passed, required) {
            if (passed < required) throw new $TypeError("Not enough arguments");
            return passed;
        };
        return validateArgumentsLength;
    }
    var environmentIsIos;
    var hasRequiredEnvironmentIsIos;
    function requireEnvironmentIsIos() {
        if (hasRequiredEnvironmentIsIos) return environmentIsIos;
        hasRequiredEnvironmentIsIos = 1;
        var userAgent = requireEnvironmentUserAgent();
        environmentIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);
        return environmentIsIos;
    }
    var task;
    var hasRequiredTask;
    function requireTask() {
        if (hasRequiredTask) return task;
        hasRequiredTask = 1;
        var globalThis = requireGlobalThis();
        var apply = requireFunctionApply();
        var bind = requireFunctionBindContext();
        var isCallable = requireIsCallable();
        var hasOwn = requireHasOwnProperty();
        var fails = requireFails();
        var html = requireHtml();
        var arraySlice = requireArraySlice();
        var createElement = requireDocumentCreateElement();
        var validateArgumentsLength = requireValidateArgumentsLength();
        var IS_IOS = requireEnvironmentIsIos();
        var IS_NODE = requireEnvironmentIsNode();
        var set = globalThis.setImmediate;
        var clear = globalThis.clearImmediate;
        var process = globalThis.process;
        var Dispatch = globalThis.Dispatch;
        var Function = globalThis.Function;
        var MessageChannel = globalThis.MessageChannel;
        var String = globalThis.String;
        var counter = 0;
        var queue = {};
        var ONREADYSTATECHANGE = "onreadystatechange";
        var $location, defer, channel, port;
        fails(function() {
            $location = globalThis.location;
        });
        var run = function(id) {
            if (hasOwn(queue, id)) {
                var fn = queue[id];
                delete queue[id];
                fn();
            }
        };
        var runner = function(id) {
            return function() {
                run(id);
            };
        };
        var eventListener = function(event) {
            run(event.data);
        };
        var globalPostMessageDefer = function(id) {
            globalThis.postMessage(String(id), $location.protocol + "//" + $location.host);
        };
        if (!set || !clear) {
            set = function setImmediate(handler) {
                validateArgumentsLength(arguments.length, 1);
                var fn = isCallable(handler) ? handler : Function(handler);
                var args = arraySlice(arguments, 1);
                queue[++counter] = function() {
                    apply(fn, undefined, args);
                };
                defer(counter);
                return counter;
            };
            clear = function clearImmediate(id) {
                delete queue[id];
            };
            if (IS_NODE) {
                defer = function(id) {
                    process.nextTick(runner(id));
                };
            } else if (Dispatch && Dispatch.now) {
                defer = function(id) {
                    Dispatch.now(runner(id));
                };
            } else if (MessageChannel && !IS_IOS) {
                channel = new MessageChannel;
                port = channel.port2;
                channel.port1.onmessage = eventListener;
                defer = bind(port.postMessage, port);
            } else if (globalThis.addEventListener && isCallable(globalThis.postMessage) && !globalThis.importScripts && $location && $location.protocol !== "file:" && !fails(globalPostMessageDefer)) {
                defer = globalPostMessageDefer;
                globalThis.addEventListener("message", eventListener, false);
            } else if (ONREADYSTATECHANGE in createElement("script")) {
                defer = function(id) {
                    html.appendChild(createElement("script"))[ONREADYSTATECHANGE] = function() {
                        html.removeChild(this);
                        run(id);
                    };
                };
            } else {
                defer = function(id) {
                    setTimeout(runner(id), 0);
                };
            }
        }
        task = {
            set: set,
            clear: clear
        };
        return task;
    }
    var safeGetBuiltIn;
    var hasRequiredSafeGetBuiltIn;
    function requireSafeGetBuiltIn() {
        if (hasRequiredSafeGetBuiltIn) return safeGetBuiltIn;
        hasRequiredSafeGetBuiltIn = 1;
        var globalThis = requireGlobalThis();
        var DESCRIPTORS = requireDescriptors();
        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        safeGetBuiltIn = function(name) {
            if (!DESCRIPTORS) return globalThis[name];
            var descriptor = getOwnPropertyDescriptor(globalThis, name);
            return descriptor && descriptor.value;
        };
        return safeGetBuiltIn;
    }
    var queue;
    var hasRequiredQueue;
    function requireQueue() {
        if (hasRequiredQueue) return queue;
        hasRequiredQueue = 1;
        var Queue = function() {
            this.head = null;
            this.tail = null;
        };
        Queue.prototype = {
            add: function(item) {
                var entry = {
                    item: item,
                    next: null
                };
                var tail = this.tail;
                if (tail) tail.next = entry; else this.head = entry;
                this.tail = entry;
            },
            get: function() {
                var entry = this.head;
                if (entry) {
                    var next = this.head = entry.next;
                    if (next === null) this.tail = null;
                    return entry.item;
                }
            }
        };
        queue = Queue;
        return queue;
    }
    var environmentIsIosPebble;
    var hasRequiredEnvironmentIsIosPebble;
    function requireEnvironmentIsIosPebble() {
        if (hasRequiredEnvironmentIsIosPebble) return environmentIsIosPebble;
        hasRequiredEnvironmentIsIosPebble = 1;
        var userAgent = requireEnvironmentUserAgent();
        environmentIsIosPebble = /ipad|iphone|ipod/i.test(userAgent) && typeof Pebble != "undefined";
        return environmentIsIosPebble;
    }
    var environmentIsWebosWebkit;
    var hasRequiredEnvironmentIsWebosWebkit;
    function requireEnvironmentIsWebosWebkit() {
        if (hasRequiredEnvironmentIsWebosWebkit) return environmentIsWebosWebkit;
        hasRequiredEnvironmentIsWebosWebkit = 1;
        var userAgent = requireEnvironmentUserAgent();
        environmentIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);
        return environmentIsWebosWebkit;
    }
    var microtask_1;
    var hasRequiredMicrotask;
    function requireMicrotask() {
        if (hasRequiredMicrotask) return microtask_1;
        hasRequiredMicrotask = 1;
        var globalThis = requireGlobalThis();
        var safeGetBuiltIn = requireSafeGetBuiltIn();
        var bind = requireFunctionBindContext();
        var macrotask = requireTask().set;
        var Queue = requireQueue();
        var IS_IOS = requireEnvironmentIsIos();
        var IS_IOS_PEBBLE = requireEnvironmentIsIosPebble();
        var IS_WEBOS_WEBKIT = requireEnvironmentIsWebosWebkit();
        var IS_NODE = requireEnvironmentIsNode();
        var MutationObserver = globalThis.MutationObserver || globalThis.WebKitMutationObserver;
        var document = globalThis.document;
        var process = globalThis.process;
        var Promise = globalThis.Promise;
        var microtask = safeGetBuiltIn("queueMicrotask");
        var notify, toggle, node, promise, then;
        if (!microtask) {
            var queue = new Queue;
            var flush = function() {
                var parent, fn;
                if (IS_NODE && (parent = process.domain)) parent.exit();
                while (fn = queue.get()) try {
                    fn();
                } catch (error) {
                    if (queue.head) notify();
                    throw error;
                }
                if (parent) parent.enter();
            };
            if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
                toggle = true;
                node = document.createTextNode("");
                new MutationObserver(flush).observe(node, {
                    characterData: true
                });
                notify = function() {
                    node.data = toggle = !toggle;
                };
            } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
                promise = Promise.resolve(undefined);
                promise.constructor = Promise;
                then = bind(promise.then, promise);
                notify = function() {
                    then(flush);
                };
            } else if (IS_NODE) {
                notify = function() {
                    process.nextTick(flush);
                };
            } else {
                macrotask = bind(macrotask, globalThis);
                notify = function() {
                    macrotask(flush);
                };
            }
            microtask = function(fn) {
                if (!queue.head) notify();
                queue.add(fn);
            };
        }
        microtask_1 = microtask;
        return microtask_1;
    }
    var hostReportErrors;
    var hasRequiredHostReportErrors;
    function requireHostReportErrors() {
        if (hasRequiredHostReportErrors) return hostReportErrors;
        hasRequiredHostReportErrors = 1;
        hostReportErrors = function(a, b) {
            try {
                arguments.length === 1 ? console.error(a) : console.error(a, b);
            } catch (error) {}
        };
        return hostReportErrors;
    }
    var perform;
    var hasRequiredPerform;
    function requirePerform() {
        if (hasRequiredPerform) return perform;
        hasRequiredPerform = 1;
        perform = function(exec) {
            try {
                return {
                    error: false,
                    value: exec()
                };
            } catch (error) {
                return {
                    error: true,
                    value: error
                };
            }
        };
        return perform;
    }
    var promiseNativeConstructor;
    var hasRequiredPromiseNativeConstructor;
    function requirePromiseNativeConstructor() {
        if (hasRequiredPromiseNativeConstructor) return promiseNativeConstructor;
        hasRequiredPromiseNativeConstructor = 1;
        var globalThis = requireGlobalThis();
        promiseNativeConstructor = globalThis.Promise;
        return promiseNativeConstructor;
    }
    var promiseConstructorDetection;
    var hasRequiredPromiseConstructorDetection;
    function requirePromiseConstructorDetection() {
        if (hasRequiredPromiseConstructorDetection) return promiseConstructorDetection;
        hasRequiredPromiseConstructorDetection = 1;
        var globalThis = requireGlobalThis();
        var NativePromiseConstructor = requirePromiseNativeConstructor();
        var isCallable = requireIsCallable();
        var isForced = requireIsForced();
        var inspectSource = requireInspectSource();
        var wellKnownSymbol = requireWellKnownSymbol();
        var ENVIRONMENT = requireEnvironment();
        var IS_PURE = requireIsPure();
        var V8_VERSION = requireEnvironmentV8Version();
        var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
        var SPECIES = wellKnownSymbol("species");
        var SUBCLASSING = false;
        var NATIVE_PROMISE_REJECTION_EVENT = isCallable(globalThis.PromiseRejectionEvent);
        var FORCED_PROMISE_CONSTRUCTOR = isForced("Promise", function() {
            var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor);
            var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor);
            if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
            if (IS_PURE && !(NativePromisePrototype["catch"] && NativePromisePrototype["finally"])) return true;
            if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
                var promise = new NativePromiseConstructor(function(resolve) {
                    resolve(1);
                });
                var FakePromise = function(exec) {
                    exec(function() {}, function() {});
                };
                var constructor = promise.constructor = {};
                constructor[SPECIES] = FakePromise;
                SUBCLASSING = promise.then(function() {}) instanceof FakePromise;
                if (!SUBCLASSING) return true;
            }
            return !GLOBAL_CORE_JS_PROMISE && (ENVIRONMENT === "BROWSER" || ENVIRONMENT === "DENO") && !NATIVE_PROMISE_REJECTION_EVENT;
        });
        promiseConstructorDetection = {
            CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR,
            REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT,
            SUBCLASSING: SUBCLASSING
        };
        return promiseConstructorDetection;
    }
    var newPromiseCapability = {};
    var hasRequiredNewPromiseCapability;
    function requireNewPromiseCapability() {
        if (hasRequiredNewPromiseCapability) return newPromiseCapability;
        hasRequiredNewPromiseCapability = 1;
        var aCallable = requireACallable();
        var $TypeError = TypeError;
        var PromiseCapability = function(C) {
            var resolve, reject;
            this.promise = new C(function($$resolve, $$reject) {
                if (resolve !== undefined || reject !== undefined) throw new $TypeError("Bad Promise constructor");
                resolve = $$resolve;
                reject = $$reject;
            });
            this.resolve = aCallable(resolve);
            this.reject = aCallable(reject);
        };
        newPromiseCapability.f = function(C) {
            return new PromiseCapability(C);
        };
        return newPromiseCapability;
    }
    var hasRequiredEs_promise_constructor;
    function requireEs_promise_constructor() {
        if (hasRequiredEs_promise_constructor) return es_promise_constructor;
        hasRequiredEs_promise_constructor = 1;
        var $ = require_export();
        var IS_PURE = requireIsPure();
        var IS_NODE = requireEnvironmentIsNode();
        var globalThis = requireGlobalThis();
        var path = requirePath();
        var call = requireFunctionCall();
        var defineBuiltIn = requireDefineBuiltIn();
        var setPrototypeOf = requireObjectSetPrototypeOf();
        var setToStringTag = requireSetToStringTag();
        var setSpecies = requireSetSpecies();
        var aCallable = requireACallable();
        var isCallable = requireIsCallable();
        var isObject = requireIsObject();
        var anInstance = requireAnInstance();
        var speciesConstructor = requireSpeciesConstructor();
        var task = requireTask().set;
        var microtask = requireMicrotask();
        var hostReportErrors = requireHostReportErrors();
        var perform = requirePerform();
        var Queue = requireQueue();
        var InternalStateModule = requireInternalState();
        var NativePromiseConstructor = requirePromiseNativeConstructor();
        var PromiseConstructorDetection = requirePromiseConstructorDetection();
        var newPromiseCapabilityModule = requireNewPromiseCapability();
        var PROMISE = "Promise";
        var FORCED_PROMISE_CONSTRUCTOR = PromiseConstructorDetection.CONSTRUCTOR;
        var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
        var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
        var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
        var setInternalState = InternalStateModule.set;
        var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
        var PromiseConstructor = NativePromiseConstructor;
        var PromisePrototype = NativePromisePrototype;
        var TypeError = globalThis.TypeError;
        var document = globalThis.document;
        var process = globalThis.process;
        var newPromiseCapability = newPromiseCapabilityModule.f;
        var newGenericPromiseCapability = newPromiseCapability;
        var DISPATCH_EVENT = !!(document && document.createEvent && globalThis.dispatchEvent);
        var UNHANDLED_REJECTION = "unhandledrejection";
        var REJECTION_HANDLED = "rejectionhandled";
        var PENDING = 0;
        var FULFILLED = 1;
        var REJECTED = 2;
        var HANDLED = 1;
        var UNHANDLED = 2;
        var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
        var isThenable = function(it) {
            var then;
            return isObject(it) && isCallable(then = it.then) ? then : false;
        };
        var callReaction = function(reaction, state) {
            var value = state.value;
            var ok = state.state === FULFILLED;
            var handler = ok ? reaction.ok : reaction.fail;
            var resolve = reaction.resolve;
            var reject = reaction.reject;
            var domain = reaction.domain;
            var result, then, exited;
            try {
                if (handler) {
                    if (!ok) {
                        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
                        state.rejection = HANDLED;
                    }
                    if (handler === true) result = value; else {
                        if (domain) domain.enter();
                        result = handler(value);
                        if (domain) {
                            domain.exit();
                            exited = true;
                        }
                    }
                    if (result === reaction.promise) {
                        reject(new TypeError("Promise-chain cycle"));
                    } else if (then = isThenable(result)) {
                        call(then, result, resolve, reject);
                    } else resolve(result);
                } else reject(value);
            } catch (error) {
                if (domain && !exited) domain.exit();
                reject(error);
            }
        };
        var notify = function(state, isReject) {
            if (state.notified) return;
            state.notified = true;
            microtask(function() {
                var reactions = state.reactions;
                var reaction;
                while (reaction = reactions.get()) {
                    callReaction(reaction, state);
                }
                state.notified = false;
                if (isReject && !state.rejection) onUnhandled(state);
            });
        };
        var dispatchEvent = function(name, promise, reason) {
            var event, handler;
            if (DISPATCH_EVENT) {
                event = document.createEvent("Event");
                event.promise = promise;
                event.reason = reason;
                event.initEvent(name, false, true);
                globalThis.dispatchEvent(event);
            } else event = {
                promise: promise,
                reason: reason
            };
            if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = globalThis["on" + name])) handler(event); else if (name === UNHANDLED_REJECTION) hostReportErrors("Unhandled promise rejection", reason);
        };
        var onUnhandled = function(state) {
            call(task, globalThis, function() {
                var promise = state.facade;
                var value = state.value;
                var IS_UNHANDLED = isUnhandled(state);
                var result;
                if (IS_UNHANDLED) {
                    result = perform(function() {
                        if (IS_NODE) {
                            process.emit("unhandledRejection", value, promise);
                        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
                    });
                    state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
                    if (result.error) throw result.value;
                }
            });
        };
        var isUnhandled = function(state) {
            return state.rejection !== HANDLED && !state.parent;
        };
        var onHandleUnhandled = function(state) {
            call(task, globalThis, function() {
                var promise = state.facade;
                if (IS_NODE) {
                    process.emit("rejectionHandled", promise);
                } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
            });
        };
        var bind = function(fn, state, unwrap) {
            return function(value) {
                fn(state, value, unwrap);
            };
        };
        var internalReject = function(state, value, unwrap) {
            if (state.done) return;
            state.done = true;
            if (unwrap) state = unwrap;
            state.value = value;
            state.state = REJECTED;
            notify(state, true);
        };
        var internalResolve = function(state, value, unwrap) {
            if (state.done) return;
            state.done = true;
            if (unwrap) state = unwrap;
            try {
                if (state.facade === value) throw new TypeError("Promise can't be resolved itself");
                var then = isThenable(value);
                if (then) {
                    microtask(function() {
                        var wrapper = {
                            done: false
                        };
                        try {
                            call(then, value, bind(internalResolve, wrapper, state), bind(internalReject, wrapper, state));
                        } catch (error) {
                            internalReject(wrapper, error, state);
                        }
                    });
                } else {
                    state.value = value;
                    state.state = FULFILLED;
                    notify(state, false);
                }
            } catch (error) {
                internalReject({
                    done: false
                }, error, state);
            }
        };
        if (FORCED_PROMISE_CONSTRUCTOR) {
            PromiseConstructor = function Promise(executor) {
                anInstance(this, PromisePrototype);
                aCallable(executor);
                call(Internal, this);
                var state = getInternalPromiseState(this);
                try {
                    executor(bind(internalResolve, state), bind(internalReject, state));
                } catch (error) {
                    internalReject(state, error);
                }
            };
            PromisePrototype = PromiseConstructor.prototype;
            Internal = function Promise(executor) {
                setInternalState(this, {
                    type: PROMISE,
                    done: false,
                    notified: false,
                    parent: false,
                    reactions: new Queue,
                    rejection: false,
                    state: PENDING,
                    value: null
                });
            };
            Internal.prototype = defineBuiltIn(PromisePrototype, "then", function then(onFulfilled, onRejected) {
                var state = getInternalPromiseState(this);
                var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
                state.parent = true;
                reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
                reaction.fail = isCallable(onRejected) && onRejected;
                reaction.domain = IS_NODE ? process.domain : undefined;
                if (state.state === PENDING) state.reactions.add(reaction); else microtask(function() {
                    callReaction(reaction, state);
                });
                return reaction.promise;
            });
            OwnPromiseCapability = function() {
                var promise = new Internal;
                var state = getInternalPromiseState(promise);
                this.promise = promise;
                this.resolve = bind(internalResolve, state);
                this.reject = bind(internalReject, state);
            };
            newPromiseCapabilityModule.f = newPromiseCapability = function(C) {
                return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
            };
            if (!IS_PURE && isCallable(NativePromiseConstructor) && NativePromisePrototype !== Object.prototype) {
                nativeThen = NativePromisePrototype.then;
                if (!NATIVE_PROMISE_SUBCLASSING) {
                    defineBuiltIn(NativePromisePrototype, "then", function then(onFulfilled, onRejected) {
                        var that = this;
                        return new PromiseConstructor(function(resolve, reject) {
                            call(nativeThen, that, resolve, reject);
                        }).then(onFulfilled, onRejected);
                    }, {
                        unsafe: true
                    });
                }
                try {
                    delete NativePromisePrototype.constructor;
                } catch (error) {}
                if (setPrototypeOf) {
                    setPrototypeOf(NativePromisePrototype, PromisePrototype);
                }
            }
        }
        $({
            global: true,
            constructor: true,
            wrap: true,
            forced: FORCED_PROMISE_CONSTRUCTOR
        }, {
            Promise: PromiseConstructor
        });
        PromiseWrapper = path.Promise;
        setToStringTag(PromiseConstructor, PROMISE, false, true);
        setSpecies(PROMISE);
        return es_promise_constructor;
    }
    var es_promise_all = {};
    var promiseStaticsIncorrectIteration;
    var hasRequiredPromiseStaticsIncorrectIteration;
    function requirePromiseStaticsIncorrectIteration() {
        if (hasRequiredPromiseStaticsIncorrectIteration) return promiseStaticsIncorrectIteration;
        hasRequiredPromiseStaticsIncorrectIteration = 1;
        var NativePromiseConstructor = requirePromiseNativeConstructor();
        var checkCorrectnessOfIteration = requireCheckCorrectnessOfIteration();
        var FORCED_PROMISE_CONSTRUCTOR = requirePromiseConstructorDetection().CONSTRUCTOR;
        promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR || !checkCorrectnessOfIteration(function(iterable) {
            NativePromiseConstructor.all(iterable).then(undefined, function() {});
        });
        return promiseStaticsIncorrectIteration;
    }
    var hasRequiredEs_promise_all;
    function requireEs_promise_all() {
        if (hasRequiredEs_promise_all) return es_promise_all;
        hasRequiredEs_promise_all = 1;
        var $ = require_export();
        var call = requireFunctionCall();
        var aCallable = requireACallable();
        var newPromiseCapabilityModule = requireNewPromiseCapability();
        var perform = requirePerform();
        var iterate = requireIterate();
        var PROMISE_STATICS_INCORRECT_ITERATION = requirePromiseStaticsIncorrectIteration();
        $({
            target: "Promise",
            stat: true,
            forced: PROMISE_STATICS_INCORRECT_ITERATION
        }, {
            all: function all(iterable) {
                var C = this;
                var capability = newPromiseCapabilityModule.f(C);
                var resolve = capability.resolve;
                var reject = capability.reject;
                var result = perform(function() {
                    var $promiseResolve = aCallable(C.resolve);
                    var values = [];
                    var counter = 0;
                    var remaining = 1;
                    iterate(iterable, function(promise) {
                        var index = counter++;
                        var alreadyCalled = false;
                        remaining++;
                        call($promiseResolve, C, promise).then(function(value) {
                            if (alreadyCalled) return;
                            alreadyCalled = true;
                            values[index] = value;
                            --remaining || resolve(values);
                        }, reject);
                    });
                    --remaining || resolve(values);
                });
                if (result.error) reject(result.value);
                return capability.promise;
            }
        });
        return es_promise_all;
    }
    var es_promise_catch = {};
    var hasRequiredEs_promise_catch;
    function requireEs_promise_catch() {
        if (hasRequiredEs_promise_catch) return es_promise_catch;
        hasRequiredEs_promise_catch = 1;
        var $ = require_export();
        var IS_PURE = requireIsPure();
        var FORCED_PROMISE_CONSTRUCTOR = requirePromiseConstructorDetection().CONSTRUCTOR;
        var NativePromiseConstructor = requirePromiseNativeConstructor();
        var getBuiltIn = requireGetBuiltIn();
        var isCallable = requireIsCallable();
        var defineBuiltIn = requireDefineBuiltIn();
        var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
        $({
            target: "Promise",
            proto: true,
            forced: FORCED_PROMISE_CONSTRUCTOR,
            real: true
        }, {
            catch: function(onRejected) {
                return this.then(undefined, onRejected);
            }
        });
        if (!IS_PURE && isCallable(NativePromiseConstructor)) {
            var method = getBuiltIn("Promise").prototype["catch"];
            if (NativePromisePrototype["catch"] !== method) {
                defineBuiltIn(NativePromisePrototype, "catch", method, {
                    unsafe: true
                });
            }
        }
        return es_promise_catch;
    }
    var es_promise_race = {};
    var hasRequiredEs_promise_race;
    function requireEs_promise_race() {
        if (hasRequiredEs_promise_race) return es_promise_race;
        hasRequiredEs_promise_race = 1;
        var $ = require_export();
        var call = requireFunctionCall();
        var aCallable = requireACallable();
        var newPromiseCapabilityModule = requireNewPromiseCapability();
        var perform = requirePerform();
        var iterate = requireIterate();
        var PROMISE_STATICS_INCORRECT_ITERATION = requirePromiseStaticsIncorrectIteration();
        $({
            target: "Promise",
            stat: true,
            forced: PROMISE_STATICS_INCORRECT_ITERATION
        }, {
            race: function race(iterable) {
                var C = this;
                var capability = newPromiseCapabilityModule.f(C);
                var reject = capability.reject;
                var result = perform(function() {
                    var $promiseResolve = aCallable(C.resolve);
                    iterate(iterable, function(promise) {
                        call($promiseResolve, C, promise).then(capability.resolve, reject);
                    });
                });
                if (result.error) reject(result.value);
                return capability.promise;
            }
        });
        return es_promise_race;
    }
    var es_promise_reject = {};
    var hasRequiredEs_promise_reject;
    function requireEs_promise_reject() {
        if (hasRequiredEs_promise_reject) return es_promise_reject;
        hasRequiredEs_promise_reject = 1;
        var $ = require_export();
        var newPromiseCapabilityModule = requireNewPromiseCapability();
        var FORCED_PROMISE_CONSTRUCTOR = requirePromiseConstructorDetection().CONSTRUCTOR;
        $({
            target: "Promise",
            stat: true,
            forced: FORCED_PROMISE_CONSTRUCTOR
        }, {
            reject: function reject(r) {
                var capability = newPromiseCapabilityModule.f(this);
                var capabilityReject = capability.reject;
                capabilityReject(r);
                return capability.promise;
            }
        });
        return es_promise_reject;
    }
    var es_promise_resolve = {};
    var promiseResolve;
    var hasRequiredPromiseResolve;
    function requirePromiseResolve() {
        if (hasRequiredPromiseResolve) return promiseResolve;
        hasRequiredPromiseResolve = 1;
        var anObject = requireAnObject();
        var isObject = requireIsObject();
        var newPromiseCapability = requireNewPromiseCapability();
        promiseResolve = function(C, x) {
            anObject(C);
            if (isObject(x) && x.constructor === C) return x;
            var promiseCapability = newPromiseCapability.f(C);
            var resolve = promiseCapability.resolve;
            resolve(x);
            return promiseCapability.promise;
        };
        return promiseResolve;
    }
    var hasRequiredEs_promise_resolve;
    function requireEs_promise_resolve() {
        if (hasRequiredEs_promise_resolve) return es_promise_resolve;
        hasRequiredEs_promise_resolve = 1;
        var $ = require_export();
        var getBuiltIn = requireGetBuiltIn();
        var IS_PURE = requireIsPure();
        var NativePromiseConstructor = requirePromiseNativeConstructor();
        var FORCED_PROMISE_CONSTRUCTOR = requirePromiseConstructorDetection().CONSTRUCTOR;
        var promiseResolve = requirePromiseResolve();
        var PromiseConstructorWrapper = getBuiltIn("Promise");
        var CHECK_WRAPPER = IS_PURE && !FORCED_PROMISE_CONSTRUCTOR;
        $({
            target: "Promise",
            stat: true,
            forced: IS_PURE || FORCED_PROMISE_CONSTRUCTOR
        }, {
            resolve: function resolve(x) {
                return promiseResolve(CHECK_WRAPPER && this === PromiseConstructorWrapper ? NativePromiseConstructor : this, x);
            }
        });
        return es_promise_resolve;
    }
    var hasRequiredEs_promise;
    function requireEs_promise() {
        if (hasRequiredEs_promise) return es_promise;
        hasRequiredEs_promise = 1;
        requireEs_promise_constructor();
        requireEs_promise_all();
        requireEs_promise_catch();
        requireEs_promise_race();
        requireEs_promise_reject();
        requireEs_promise_resolve();
        return es_promise;
    }
    requireEs_promise();
    var es_string_iterator = {};
    var toString;
    var hasRequiredToString;
    function requireToString() {
        if (hasRequiredToString) return toString;
        hasRequiredToString = 1;
        var classof = requireClassof();
        var $String = String;
        toString = function(argument) {
            if (classof(argument) === "Symbol") throw new TypeError("Cannot convert a Symbol value to a string");
            return $String(argument);
        };
        return toString;
    }
    var stringMultibyte;
    var hasRequiredStringMultibyte;
    function requireStringMultibyte() {
        if (hasRequiredStringMultibyte) return stringMultibyte;
        hasRequiredStringMultibyte = 1;
        var uncurryThis = requireFunctionUncurryThis();
        var toIntegerOrInfinity = requireToIntegerOrInfinity();
        var toString = requireToString();
        var requireObjectCoercible = requireRequireObjectCoercible();
        var charAt = uncurryThis("".charAt);
        var charCodeAt = uncurryThis("".charCodeAt);
        var stringSlice = uncurryThis("".slice);
        var createMethod = function(CONVERT_TO_STRING) {
            return function($this, pos) {
                var S = toString(requireObjectCoercible($this));
                var position = toIntegerOrInfinity(pos);
                var size = S.length;
                var first, second;
                if (position < 0 || position >= size) return CONVERT_TO_STRING ? "" : undefined;
                first = charCodeAt(S, position);
                return first < 55296 || first > 56319 || position + 1 === size || (second = charCodeAt(S, position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? charAt(S, position) : first : CONVERT_TO_STRING ? stringSlice(S, position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
            };
        };
        stringMultibyte = {
            codeAt: createMethod(false),
            charAt: createMethod(true)
        };
        return stringMultibyte;
    }
    var hasRequiredEs_string_iterator;
    function requireEs_string_iterator() {
        if (hasRequiredEs_string_iterator) return es_string_iterator;
        hasRequiredEs_string_iterator = 1;
        var charAt = requireStringMultibyte().charAt;
        var toString = requireToString();
        var InternalStateModule = requireInternalState();
        var defineIterator = requireIteratorDefine();
        var createIterResultObject = requireCreateIterResultObject();
        var STRING_ITERATOR = "String Iterator";
        var setInternalState = InternalStateModule.set;
        var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
        defineIterator(String, "String", function(iterated) {
            setInternalState(this, {
                type: STRING_ITERATOR,
                string: toString(iterated),
                index: 0
            });
        }, function next() {
            var state = getInternalState(this);
            var string = state.string;
            var index = state.index;
            var point;
            if (index >= string.length) return createIterResultObject(undefined, true);
            point = charAt(string, index);
            state.index += point.length;
            return createIterResultObject(point, false);
        });
        return es_string_iterator;
    }
    requireEs_string_iterator();
    var es_weakMap = {};
    var es_weakMap_constructor = {};
    var collectionWeak;
    var hasRequiredCollectionWeak;
    function requireCollectionWeak() {
        if (hasRequiredCollectionWeak) return collectionWeak;
        hasRequiredCollectionWeak = 1;
        var uncurryThis = requireFunctionUncurryThis();
        var defineBuiltIns = requireDefineBuiltIns();
        var getWeakData = requireInternalMetadata().getWeakData;
        var anInstance = requireAnInstance();
        var anObject = requireAnObject();
        var isNullOrUndefined = requireIsNullOrUndefined();
        var isObject = requireIsObject();
        var iterate = requireIterate();
        var ArrayIterationModule = requireArrayIteration();
        var hasOwn = requireHasOwnProperty();
        var InternalStateModule = requireInternalState();
        var setInternalState = InternalStateModule.set;
        var internalStateGetterFor = InternalStateModule.getterFor;
        var find = ArrayIterationModule.find;
        var findIndex = ArrayIterationModule.findIndex;
        var splice = uncurryThis([].splice);
        var id = 0;
        var uncaughtFrozenStore = function(state) {
            return state.frozen || (state.frozen = new UncaughtFrozenStore);
        };
        var UncaughtFrozenStore = function() {
            this.entries = [];
        };
        var findUncaughtFrozen = function(store, key) {
            return find(store.entries, function(it) {
                return it[0] === key;
            });
        };
        UncaughtFrozenStore.prototype = {
            get: function(key) {
                var entry = findUncaughtFrozen(this, key);
                if (entry) return entry[1];
            },
            has: function(key) {
                return !!findUncaughtFrozen(this, key);
            },
            set: function(key, value) {
                var entry = findUncaughtFrozen(this, key);
                if (entry) entry[1] = value; else this.entries.push([ key, value ]);
            },
            delete: function(key) {
                var index = findIndex(this.entries, function(it) {
                    return it[0] === key;
                });
                if (~index) splice(this.entries, index, 1);
                return !!~index;
            }
        };
        collectionWeak = {
            getConstructor: function(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
                var Constructor = wrapper(function(that, iterable) {
                    anInstance(that, Prototype);
                    setInternalState(that, {
                        type: CONSTRUCTOR_NAME,
                        id: id++,
                        frozen: null
                    });
                    if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], {
                        that: that,
                        AS_ENTRIES: IS_MAP
                    });
                });
                var Prototype = Constructor.prototype;
                var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
                var define = function(that, key, value) {
                    var state = getInternalState(that);
                    var data = getWeakData(anObject(key), true);
                    if (data === true) uncaughtFrozenStore(state).set(key, value); else data[state.id] = value;
                    return that;
                };
                defineBuiltIns(Prototype, {
                    delete: function(key) {
                        var state = getInternalState(this);
                        if (!isObject(key)) return false;
                        var data = getWeakData(key);
                        if (data === true) return uncaughtFrozenStore(state)["delete"](key);
                        return data && hasOwn(data, state.id) && delete data[state.id];
                    },
                    has: function has(key) {
                        var state = getInternalState(this);
                        if (!isObject(key)) return false;
                        var data = getWeakData(key);
                        if (data === true) return uncaughtFrozenStore(state).has(key);
                        return data && hasOwn(data, state.id);
                    }
                });
                defineBuiltIns(Prototype, IS_MAP ? {
                    get: function get(key) {
                        var state = getInternalState(this);
                        if (isObject(key)) {
                            var data = getWeakData(key);
                            if (data === true) return uncaughtFrozenStore(state).get(key);
                            if (data) return data[state.id];
                        }
                    },
                    set: function set(key, value) {
                        return define(this, key, value);
                    }
                } : {
                    add: function add(value) {
                        return define(this, value, true);
                    }
                });
                return Constructor;
            }
        };
        return collectionWeak;
    }
    var hasRequiredEs_weakMap_constructor;
    function requireEs_weakMap_constructor() {
        if (hasRequiredEs_weakMap_constructor) return es_weakMap_constructor;
        hasRequiredEs_weakMap_constructor = 1;
        var FREEZING = requireFreezing();
        var globalThis = requireGlobalThis();
        var uncurryThis = requireFunctionUncurryThis();
        var defineBuiltIns = requireDefineBuiltIns();
        var InternalMetadataModule = requireInternalMetadata();
        var collection = requireCollection();
        var collectionWeak = requireCollectionWeak();
        var isObject = requireIsObject();
        var enforceInternalState = requireInternalState().enforce;
        var fails = requireFails();
        var NATIVE_WEAK_MAP = requireWeakMapBasicDetection();
        var $Object = Object;
        var isArray = Array.isArray;
        var isExtensible = $Object.isExtensible;
        var isFrozen = $Object.isFrozen;
        var isSealed = $Object.isSealed;
        var freeze = $Object.freeze;
        var seal = $Object.seal;
        var IS_IE11 = !globalThis.ActiveXObject && "ActiveXObject" in globalThis;
        var InternalWeakMap;
        var wrapper = function(init) {
            return function WeakMap() {
                return init(this, arguments.length ? arguments[0] : undefined);
            };
        };
        var $WeakMap = collection("WeakMap", wrapper, collectionWeak);
        var WeakMapPrototype = $WeakMap.prototype;
        var nativeSet = uncurryThis(WeakMapPrototype.set);
        var hasMSEdgeFreezingBug = function() {
            return FREEZING && fails(function() {
                var frozenArray = freeze([]);
                nativeSet(new $WeakMap, frozenArray, 1);
                return !isFrozen(frozenArray);
            });
        };
        if (NATIVE_WEAK_MAP) if (IS_IE11) {
            InternalWeakMap = collectionWeak.getConstructor(wrapper, "WeakMap", true);
            InternalMetadataModule.enable();
            var nativeDelete = uncurryThis(WeakMapPrototype["delete"]);
            var nativeHas = uncurryThis(WeakMapPrototype.has);
            var nativeGet = uncurryThis(WeakMapPrototype.get);
            defineBuiltIns(WeakMapPrototype, {
                delete: function(key) {
                    if (isObject(key) && !isExtensible(key)) {
                        var state = enforceInternalState(this);
                        if (!state.frozen) state.frozen = new InternalWeakMap;
                        return nativeDelete(this, key) || state.frozen["delete"](key);
                    }
                    return nativeDelete(this, key);
                },
                has: function has(key) {
                    if (isObject(key) && !isExtensible(key)) {
                        var state = enforceInternalState(this);
                        if (!state.frozen) state.frozen = new InternalWeakMap;
                        return nativeHas(this, key) || state.frozen.has(key);
                    }
                    return nativeHas(this, key);
                },
                get: function get(key) {
                    if (isObject(key) && !isExtensible(key)) {
                        var state = enforceInternalState(this);
                        if (!state.frozen) state.frozen = new InternalWeakMap;
                        return nativeHas(this, key) ? nativeGet(this, key) : state.frozen.get(key);
                    }
                    return nativeGet(this, key);
                },
                set: function set(key, value) {
                    if (isObject(key) && !isExtensible(key)) {
                        var state = enforceInternalState(this);
                        if (!state.frozen) state.frozen = new InternalWeakMap;
                        nativeHas(this, key) ? nativeSet(this, key, value) : state.frozen.set(key, value);
                    } else nativeSet(this, key, value);
                    return this;
                }
            });
        } else if (hasMSEdgeFreezingBug()) {
            defineBuiltIns(WeakMapPrototype, {
                set: function set(key, value) {
                    var arrayIntegrityLevel;
                    if (isArray(key)) {
                        if (isFrozen(key)) arrayIntegrityLevel = freeze; else if (isSealed(key)) arrayIntegrityLevel = seal;
                    }
                    nativeSet(this, key, value);
                    if (arrayIntegrityLevel) arrayIntegrityLevel(key);
                    return this;
                }
            });
        }
        return es_weakMap_constructor;
    }
    var hasRequiredEs_weakMap;
    function requireEs_weakMap() {
        if (hasRequiredEs_weakMap) return es_weakMap;
        hasRequiredEs_weakMap = 1;
        requireEs_weakMap_constructor();
        return es_weakMap;
    }
    requireEs_weakMap();
    var web_domCollections_iterator = {};
    var domIterables;
    var hasRequiredDomIterables;
    function requireDomIterables() {
        if (hasRequiredDomIterables) return domIterables;
        hasRequiredDomIterables = 1;
        domIterables = {
            CSSRuleList: 0,
            CSSStyleDeclaration: 0,
            CSSValueList: 0,
            ClientRectList: 0,
            DOMRectList: 0,
            DOMStringList: 0,
            DOMTokenList: 1,
            DataTransferItemList: 0,
            FileList: 0,
            HTMLAllCollection: 0,
            HTMLCollection: 0,
            HTMLFormElement: 0,
            HTMLSelectElement: 0,
            MediaList: 0,
            MimeTypeArray: 0,
            NamedNodeMap: 0,
            NodeList: 1,
            PaintRequestList: 0,
            Plugin: 0,
            PluginArray: 0,
            SVGLengthList: 0,
            SVGNumberList: 0,
            SVGPathSegList: 0,
            SVGPointList: 0,
            SVGStringList: 0,
            SVGTransformList: 0,
            SourceBufferList: 0,
            StyleSheetList: 0,
            TextTrackCueList: 0,
            TextTrackList: 0,
            TouchList: 0
        };
        return domIterables;
    }
    var domTokenListPrototype;
    var hasRequiredDomTokenListPrototype;
    function requireDomTokenListPrototype() {
        if (hasRequiredDomTokenListPrototype) return domTokenListPrototype;
        hasRequiredDomTokenListPrototype = 1;
        var documentCreateElement = requireDocumentCreateElement();
        var classList = documentCreateElement("span").classList;
        var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;
        domTokenListPrototype = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;
        return domTokenListPrototype;
    }
    var hasRequiredWeb_domCollections_iterator;
    function requireWeb_domCollections_iterator() {
        if (hasRequiredWeb_domCollections_iterator) return web_domCollections_iterator;
        hasRequiredWeb_domCollections_iterator = 1;
        var globalThis = requireGlobalThis();
        var DOMIterables = requireDomIterables();
        var DOMTokenListPrototype = requireDomTokenListPrototype();
        var ArrayIteratorMethods = requireEs_array_iterator();
        var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
        var setToStringTag = requireSetToStringTag();
        var wellKnownSymbol = requireWellKnownSymbol();
        var ITERATOR = wellKnownSymbol("iterator");
        var ArrayValues = ArrayIteratorMethods.values;
        var handlePrototype = function(CollectionPrototype, COLLECTION_NAME) {
            if (CollectionPrototype) {
                if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
                    createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
                } catch (error) {
                    CollectionPrototype[ITERATOR] = ArrayValues;
                }
                setToStringTag(CollectionPrototype, COLLECTION_NAME, true);
                if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
                    if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
                        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
                    } catch (error) {
                        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
                    }
                }
            }
        };
        for (var COLLECTION_NAME in DOMIterables) {
            handlePrototype(globalThis[COLLECTION_NAME] && globalThis[COLLECTION_NAME].prototype, COLLECTION_NAME);
        }
        handlePrototype(DOMTokenListPrototype, "DOMTokenList");
        return web_domCollections_iterator;
    }
    requireWeb_domCollections_iterator();
    var es_array_fill = {};
    var arrayFill;
    var hasRequiredArrayFill;
    function requireArrayFill() {
        if (hasRequiredArrayFill) return arrayFill;
        hasRequiredArrayFill = 1;
        var toObject = requireToObject();
        var toAbsoluteIndex = requireToAbsoluteIndex();
        var lengthOfArrayLike = requireLengthOfArrayLike();
        arrayFill = function fill(value) {
            var O = toObject(this);
            var length = lengthOfArrayLike(O);
            var argumentsLength = arguments.length;
            var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
            var end = argumentsLength > 2 ? arguments[2] : undefined;
            var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
            while (endPos > index) O[index++] = value;
            return O;
        };
        return arrayFill;
    }
    var hasRequiredEs_array_fill;
    function requireEs_array_fill() {
        if (hasRequiredEs_array_fill) return es_array_fill;
        hasRequiredEs_array_fill = 1;
        var $ = require_export();
        var fill = requireArrayFill();
        var addToUnscopables = requireAddToUnscopables();
        $({
            target: "Array",
            proto: true
        }, {
            fill: fill
        });
        addToUnscopables("fill");
        return es_array_fill;
    }
    requireEs_array_fill();
    var web_domCollections_forEach = {};
    var arrayMethodIsStrict;
    var hasRequiredArrayMethodIsStrict;
    function requireArrayMethodIsStrict() {
        if (hasRequiredArrayMethodIsStrict) return arrayMethodIsStrict;
        hasRequiredArrayMethodIsStrict = 1;
        var fails = requireFails();
        arrayMethodIsStrict = function(METHOD_NAME, argument) {
            var method = [][METHOD_NAME];
            return !!method && fails(function() {
                method.call(null, argument || function() {
                    return 1;
                }, 1);
            });
        };
        return arrayMethodIsStrict;
    }
    var arrayForEach;
    var hasRequiredArrayForEach;
    function requireArrayForEach() {
        if (hasRequiredArrayForEach) return arrayForEach;
        hasRequiredArrayForEach = 1;
        var $forEach = requireArrayIteration().forEach;
        var arrayMethodIsStrict = requireArrayMethodIsStrict();
        var STRICT_METHOD = arrayMethodIsStrict("forEach");
        arrayForEach = !STRICT_METHOD ? function forEach(callbackfn) {
            return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        } : [].forEach;
        return arrayForEach;
    }
    var hasRequiredWeb_domCollections_forEach;
    function requireWeb_domCollections_forEach() {
        if (hasRequiredWeb_domCollections_forEach) return web_domCollections_forEach;
        hasRequiredWeb_domCollections_forEach = 1;
        var globalThis = requireGlobalThis();
        var DOMIterables = requireDomIterables();
        var DOMTokenListPrototype = requireDomTokenListPrototype();
        var forEach = requireArrayForEach();
        var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
        var handlePrototype = function(CollectionPrototype) {
            if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
                createNonEnumerableProperty(CollectionPrototype, "forEach", forEach);
            } catch (error) {
                CollectionPrototype.forEach = forEach;
            }
        };
        for (var COLLECTION_NAME in DOMIterables) {
            if (DOMIterables[COLLECTION_NAME]) {
                handlePrototype(globalThis[COLLECTION_NAME] && globalThis[COLLECTION_NAME].prototype);
            }
        }
        handlePrototype(DOMTokenListPrototype);
        return web_domCollections_forEach;
    }
    requireWeb_domCollections_forEach();
    var Commands = {
        insertIcon: function insertIcon() {
            var editor = Asc.scope.editor;
            var insertIconFunction = createInsertFunction(editor);
            var fill = Api.CreateSolidFill(Api.CreateRGBColor(100, 150, 255));
            Asc.scope.parsedSvgs.forEach(function(svgParsedObject) {
                var factor = 36e3;
                if (svgParsedObject.width * svgParsedObject.height > 1e4) {
                    factor = factor / 10;
                }
                var width = svgParsedObject.width * factor;
                var height = svgParsedObject.height * factor;
                var customGeometry = createCustomGeometry(svgParsedObject, width, height, factor);
                var stroke = Api.CreateStroke(factor, Api.CreateSolidFill(Api.CreateRGBColor(0, 50, 200)));
                insertIconFunction(customGeometry, width, height, fill, stroke);
            });
            function createCustomGeometry(svgParsedObject, width, height, factor) {
                var customGeometry = Api.CreateCustomGeometry();
                svgParsedObject.elements.forEach(function(svgElement) {
                    if (svgElement.type === "path") {
                        var path = customGeometry.AddPath();
                        path.SetWidth(width);
                        path.SetHeight(height);
                        if (svgElement.style.fill) {
                            path.SetFill(svgElement.style.fill);
                        } else {
                            path.SetFill("darken");
                        }
                        if (svgElement.style.stroke) {
                            path.SetStroke(true);
                        }
                        svgElement.d.forEach(function(d) {
                            switch (d.type) {
                              case "moveto":
                                path.MoveTo(d.x * factor, d.y * factor);
                                break;

                              case "cubicBezier":
                                path.CubicBezTo(d.x1 * factor, d.y1 * factor, d.x2 * factor, d.y2 * factor, d.x * factor, d.y * factor);
                                break;

                              case "quadraticBezier":
                                path.QuadBezTo(d.x1 * factor, d.y1 * factor, d.x2 * factor, d.y2 * factor);
                                break;

                              case "lineto":
                                path.LineTo(d.x * factor, d.y * factor);
                                break;

                              case "closepath":
                                path.Close();
                                break;
                            }
                        });
                    }
                });
                return customGeometry;
            }
            function createInsertFunction(editor) {
                if (editor === "word") {
                    var document = Api.GetDocument();
                    var run = document.GetCurrentRun();
                    return function(customGeometry, width, height, fill, stroke) {
                        var shape = Api.CreateShape("rect", width, height, fill, stroke);
                        shape.SetGeometry(customGeometry);
                        run.AddDrawing(shape);
                    };
                } else if (editor === "slide") {
                    var presentation = Api.GetPresentation();
                    var activeSlide = presentation.GetCurrentVisibleSlide() || presentation.GetCurrentSlide();
                    var slideWidth = activeSlide.GetWidth();
                    var slideHeight = activeSlide.GetHeight();
                    return function(customGeometry, width, height, fill, stroke) {
                        var shape = Api.CreateShape("rect", width, height, fill, stroke);
                        var top = slideHeight / 2 - height / 2;
                        var left = slideWidth / 2 - width / 2;
                        shape.SetGeometry(customGeometry);
                        shape.SetPosition(left, top);
                        activeSlide.AddObject(shape);
                    };
                } else if (editor === "cell") {
                    var worksheet = Api.GetActiveSheet();
                    var activeCell = worksheet.GetActiveCell();
                    var row = activeCell.GetRow();
                    var col = activeCell.GetCol();
                    return function(customGeometry, width, height, fill, stroke) {
                        var shape = worksheet.AddShape("rect", width, height, fill, stroke, col - 1, 0, row - 1, 0);
                        shape.SetGeometry(customGeometry);
                    };
                }
            }
            return true;
        }
    };
    var es_array_concat = {};
    var doesNotExceedSafeInteger;
    var hasRequiredDoesNotExceedSafeInteger;
    function requireDoesNotExceedSafeInteger() {
        if (hasRequiredDoesNotExceedSafeInteger) return doesNotExceedSafeInteger;
        hasRequiredDoesNotExceedSafeInteger = 1;
        var $TypeError = TypeError;
        var MAX_SAFE_INTEGER = 9007199254740991;
        doesNotExceedSafeInteger = function(it) {
            if (it > MAX_SAFE_INTEGER) throw $TypeError("Maximum allowed index exceeded");
            return it;
        };
        return doesNotExceedSafeInteger;
    }
    var createProperty;
    var hasRequiredCreateProperty;
    function requireCreateProperty() {
        if (hasRequiredCreateProperty) return createProperty;
        hasRequiredCreateProperty = 1;
        var DESCRIPTORS = requireDescriptors();
        var definePropertyModule = requireObjectDefineProperty();
        var createPropertyDescriptor = requireCreatePropertyDescriptor();
        createProperty = function(object, key, value) {
            if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value)); else object[key] = value;
        };
        return createProperty;
    }
    var hasRequiredEs_array_concat;
    function requireEs_array_concat() {
        if (hasRequiredEs_array_concat) return es_array_concat;
        hasRequiredEs_array_concat = 1;
        var $ = require_export();
        var fails = requireFails();
        var isArray = requireIsArray();
        var isObject = requireIsObject();
        var toObject = requireToObject();
        var lengthOfArrayLike = requireLengthOfArrayLike();
        var doesNotExceedSafeInteger = requireDoesNotExceedSafeInteger();
        var createProperty = requireCreateProperty();
        var arraySpeciesCreate = requireArraySpeciesCreate();
        var arrayMethodHasSpeciesSupport = requireArrayMethodHasSpeciesSupport();
        var wellKnownSymbol = requireWellKnownSymbol();
        var V8_VERSION = requireEnvironmentV8Version();
        var IS_CONCAT_SPREADABLE = wellKnownSymbol("isConcatSpreadable");
        var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function() {
            var array = [];
            array[IS_CONCAT_SPREADABLE] = false;
            return array.concat()[0] !== array;
        });
        var isConcatSpreadable = function(O) {
            if (!isObject(O)) return false;
            var spreadable = O[IS_CONCAT_SPREADABLE];
            return spreadable !== undefined ? !!spreadable : isArray(O);
        };
        var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport("concat");
        $({
            target: "Array",
            proto: true,
            arity: 1,
            forced: FORCED
        }, {
            concat: function concat(arg) {
                var O = toObject(this);
                var A = arraySpeciesCreate(O, 0);
                var n = 0;
                var i, k, length, len, E;
                for (i = -1, length = arguments.length; i < length; i++) {
                    E = i === -1 ? O : arguments[i];
                    if (isConcatSpreadable(E)) {
                        len = lengthOfArrayLike(E);
                        doesNotExceedSafeInteger(n + len);
                        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
                    } else {
                        doesNotExceedSafeInteger(n + 1);
                        createProperty(A, n++, E);
                    }
                }
                A.length = n;
                return A;
            }
        });
        return es_array_concat;
    }
    requireEs_array_concat();
    var es_array_filter = {};
    var hasRequiredEs_array_filter;
    function requireEs_array_filter() {
        if (hasRequiredEs_array_filter) return es_array_filter;
        hasRequiredEs_array_filter = 1;
        var $ = require_export();
        var $filter = requireArrayIteration().filter;
        var arrayMethodHasSpeciesSupport = requireArrayMethodHasSpeciesSupport();
        var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("filter");
        $({
            target: "Array",
            proto: true,
            forced: !HAS_SPECIES_SUPPORT
        }, {
            filter: function filter(callbackfn) {
                return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
            }
        });
        return es_array_filter;
    }
    requireEs_array_filter();
    var es_array_join = {};
    var hasRequiredEs_array_join;
    function requireEs_array_join() {
        if (hasRequiredEs_array_join) return es_array_join;
        hasRequiredEs_array_join = 1;
        var $ = require_export();
        var uncurryThis = requireFunctionUncurryThis();
        var IndexedObject = requireIndexedObject();
        var toIndexedObject = requireToIndexedObject();
        var arrayMethodIsStrict = requireArrayMethodIsStrict();
        var nativeJoin = uncurryThis([].join);
        var ES3_STRINGS = IndexedObject !== Object;
        var FORCED = ES3_STRINGS || !arrayMethodIsStrict("join", ",");
        $({
            target: "Array",
            proto: true,
            forced: FORCED
        }, {
            join: function join(separator) {
                return nativeJoin(toIndexedObject(this), separator === undefined ? "," : separator);
            }
        });
        return es_array_join;
    }
    requireEs_array_join();
    var es_string_trim = {};
    var whitespaces;
    var hasRequiredWhitespaces;
    function requireWhitespaces() {
        if (hasRequiredWhitespaces) return whitespaces;
        hasRequiredWhitespaces = 1;
        whitespaces = "\t\n\v\f\r      " + "          　\u2028\u2029\ufeff";
        return whitespaces;
    }
    var stringTrim;
    var hasRequiredStringTrim;
    function requireStringTrim() {
        if (hasRequiredStringTrim) return stringTrim;
        hasRequiredStringTrim = 1;
        var uncurryThis = requireFunctionUncurryThis();
        var requireObjectCoercible = requireRequireObjectCoercible();
        var toString = requireToString();
        var whitespaces = requireWhitespaces();
        var replace = uncurryThis("".replace);
        var ltrim = RegExp("^[" + whitespaces + "]+");
        var rtrim = RegExp("(^|[^" + whitespaces + "])[" + whitespaces + "]+$");
        var createMethod = function(TYPE) {
            return function($this) {
                var string = toString(requireObjectCoercible($this));
                if (TYPE & 1) string = replace(string, ltrim, "");
                if (TYPE & 2) string = replace(string, rtrim, "$1");
                return string;
            };
        };
        stringTrim = {
            start: createMethod(1),
            end: createMethod(2),
            trim: createMethod(3)
        };
        return stringTrim;
    }
    var stringTrimForced;
    var hasRequiredStringTrimForced;
    function requireStringTrimForced() {
        if (hasRequiredStringTrimForced) return stringTrimForced;
        hasRequiredStringTrimForced = 1;
        var PROPER_FUNCTION_NAME = requireFunctionName().PROPER;
        var fails = requireFails();
        var whitespaces = requireWhitespaces();
        var non = "​᠎";
        stringTrimForced = function(METHOD_NAME) {
            return fails(function() {
                return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() !== non || PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME;
            });
        };
        return stringTrimForced;
    }
    var hasRequiredEs_string_trim;
    function requireEs_string_trim() {
        if (hasRequiredEs_string_trim) return es_string_trim;
        hasRequiredEs_string_trim = 1;
        var $ = require_export();
        var $trim = requireStringTrim().trim;
        var forcedStringTrimMethod = requireStringTrimForced();
        $({
            target: "String",
            proto: true,
            forced: forcedStringTrimMethod("trim")
        }, {
            trim: function trim() {
                return $trim(this);
            }
        });
        return es_string_trim;
    }
    requireEs_string_trim();
    var es_regexp_exec = {};
    var regexpFlags;
    var hasRequiredRegexpFlags;
    function requireRegexpFlags() {
        if (hasRequiredRegexpFlags) return regexpFlags;
        hasRequiredRegexpFlags = 1;
        var anObject = requireAnObject();
        regexpFlags = function() {
            var that = anObject(this);
            var result = "";
            if (that.hasIndices) result += "d";
            if (that.global) result += "g";
            if (that.ignoreCase) result += "i";
            if (that.multiline) result += "m";
            if (that.dotAll) result += "s";
            if (that.unicode) result += "u";
            if (that.unicodeSets) result += "v";
            if (that.sticky) result += "y";
            return result;
        };
        return regexpFlags;
    }
    var regexpStickyHelpers;
    var hasRequiredRegexpStickyHelpers;
    function requireRegexpStickyHelpers() {
        if (hasRequiredRegexpStickyHelpers) return regexpStickyHelpers;
        hasRequiredRegexpStickyHelpers = 1;
        var fails = requireFails();
        var globalThis = requireGlobalThis();
        var $RegExp = globalThis.RegExp;
        var UNSUPPORTED_Y = fails(function() {
            var re = $RegExp("a", "y");
            re.lastIndex = 2;
            return re.exec("abcd") !== null;
        });
        var MISSED_STICKY = UNSUPPORTED_Y || fails(function() {
            return !$RegExp("a", "y").sticky;
        });
        var BROKEN_CARET = UNSUPPORTED_Y || fails(function() {
            var re = $RegExp("^r", "gy");
            re.lastIndex = 2;
            return re.exec("str") !== null;
        });
        regexpStickyHelpers = {
            BROKEN_CARET: BROKEN_CARET,
            MISSED_STICKY: MISSED_STICKY,
            UNSUPPORTED_Y: UNSUPPORTED_Y
        };
        return regexpStickyHelpers;
    }
    var regexpUnsupportedDotAll;
    var hasRequiredRegexpUnsupportedDotAll;
    function requireRegexpUnsupportedDotAll() {
        if (hasRequiredRegexpUnsupportedDotAll) return regexpUnsupportedDotAll;
        hasRequiredRegexpUnsupportedDotAll = 1;
        var fails = requireFails();
        var globalThis = requireGlobalThis();
        var $RegExp = globalThis.RegExp;
        regexpUnsupportedDotAll = fails(function() {
            var re = $RegExp(".", "s");
            return !(re.dotAll && re.test("\n") && re.flags === "s");
        });
        return regexpUnsupportedDotAll;
    }
    var regexpUnsupportedNcg;
    var hasRequiredRegexpUnsupportedNcg;
    function requireRegexpUnsupportedNcg() {
        if (hasRequiredRegexpUnsupportedNcg) return regexpUnsupportedNcg;
        hasRequiredRegexpUnsupportedNcg = 1;
        var fails = requireFails();
        var globalThis = requireGlobalThis();
        var $RegExp = globalThis.RegExp;
        regexpUnsupportedNcg = fails(function() {
            var re = $RegExp("(?<a>b)", "g");
            return re.exec("b").groups.a !== "b" || "b".replace(re, "$<a>c") !== "bc";
        });
        return regexpUnsupportedNcg;
    }
    var regexpExec;
    var hasRequiredRegexpExec;
    function requireRegexpExec() {
        if (hasRequiredRegexpExec) return regexpExec;
        hasRequiredRegexpExec = 1;
        var call = requireFunctionCall();
        var uncurryThis = requireFunctionUncurryThis();
        var toString = requireToString();
        var regexpFlags = requireRegexpFlags();
        var stickyHelpers = requireRegexpStickyHelpers();
        var shared = requireShared();
        var create = requireObjectCreate();
        var getInternalState = requireInternalState().get;
        var UNSUPPORTED_DOT_ALL = requireRegexpUnsupportedDotAll();
        var UNSUPPORTED_NCG = requireRegexpUnsupportedNcg();
        var nativeReplace = shared("native-string-replace", String.prototype.replace);
        var nativeExec = RegExp.prototype.exec;
        var patchedExec = nativeExec;
        var charAt = uncurryThis("".charAt);
        var indexOf = uncurryThis("".indexOf);
        var replace = uncurryThis("".replace);
        var stringSlice = uncurryThis("".slice);
        var UPDATES_LAST_INDEX_WRONG = function() {
            var re1 = /a/;
            var re2 = /b*/g;
            call(nativeExec, re1, "a");
            call(nativeExec, re2, "a");
            return re1.lastIndex !== 0 || re2.lastIndex !== 0;
        }();
        var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;
        var NPCG_INCLUDED = /()??/.exec("")[1] !== undefined;
        var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
        if (PATCH) {
            patchedExec = function exec(string) {
                var re = this;
                var state = getInternalState(re);
                var str = toString(string);
                var raw = state.raw;
                var result, reCopy, lastIndex, match, i, object, group;
                if (raw) {
                    raw.lastIndex = re.lastIndex;
                    result = call(patchedExec, raw, str);
                    re.lastIndex = raw.lastIndex;
                    return result;
                }
                var groups = state.groups;
                var sticky = UNSUPPORTED_Y && re.sticky;
                var flags = call(regexpFlags, re);
                var source = re.source;
                var charsAdded = 0;
                var strCopy = str;
                if (sticky) {
                    flags = replace(flags, "y", "");
                    if (indexOf(flags, "g") === -1) {
                        flags += "g";
                    }
                    strCopy = stringSlice(str, re.lastIndex);
                    if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== "\n")) {
                        source = "(?: " + source + ")";
                        strCopy = " " + strCopy;
                        charsAdded++;
                    }
                    reCopy = new RegExp("^(?:" + source + ")", flags);
                }
                if (NPCG_INCLUDED) {
                    reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
                }
                if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
                match = call(nativeExec, sticky ? reCopy : re, strCopy);
                if (sticky) {
                    if (match) {
                        match.input = stringSlice(match.input, charsAdded);
                        match[0] = stringSlice(match[0], charsAdded);
                        match.index = re.lastIndex;
                        re.lastIndex += match[0].length;
                    } else re.lastIndex = 0;
                } else if (UPDATES_LAST_INDEX_WRONG && match) {
                    re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
                }
                if (NPCG_INCLUDED && match && match.length > 1) {
                    call(nativeReplace, match[0], reCopy, function() {
                        for (i = 1; i < arguments.length - 2; i++) {
                            if (arguments[i] === undefined) match[i] = undefined;
                        }
                    });
                }
                if (match && groups) {
                    match.groups = object = create(null);
                    for (i = 0; i < groups.length; i++) {
                        group = groups[i];
                        object[group[0]] = match[group[1]];
                    }
                }
                return match;
            };
        }
        regexpExec = patchedExec;
        return regexpExec;
    }
    var hasRequiredEs_regexp_exec;
    function requireEs_regexp_exec() {
        if (hasRequiredEs_regexp_exec) return es_regexp_exec;
        hasRequiredEs_regexp_exec = 1;
        var $ = require_export();
        var exec = requireRegexpExec();
        $({
            target: "RegExp",
            proto: true,
            forced: /./.exec !== exec
        }, {
            exec: exec
        });
        return es_regexp_exec;
    }
    requireEs_regexp_exec();
    var es_string_replace = {};
    var fixRegexpWellKnownSymbolLogic;
    var hasRequiredFixRegexpWellKnownSymbolLogic;
    function requireFixRegexpWellKnownSymbolLogic() {
        if (hasRequiredFixRegexpWellKnownSymbolLogic) return fixRegexpWellKnownSymbolLogic;
        hasRequiredFixRegexpWellKnownSymbolLogic = 1;
        requireEs_regexp_exec();
        var call = requireFunctionCall();
        var defineBuiltIn = requireDefineBuiltIn();
        var regexpExec = requireRegexpExec();
        var fails = requireFails();
        var wellKnownSymbol = requireWellKnownSymbol();
        var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
        var SPECIES = wellKnownSymbol("species");
        var RegExpPrototype = RegExp.prototype;
        fixRegexpWellKnownSymbolLogic = function(KEY, exec, FORCED, SHAM) {
            var SYMBOL = wellKnownSymbol(KEY);
            var DELEGATES_TO_SYMBOL = !fails(function() {
                var O = {};
                O[SYMBOL] = function() {
                    return 7;
                };
                return ""[KEY](O) !== 7;
            });
            var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function() {
                var execCalled = false;
                var re = /a/;
                if (KEY === "split") {
                    re = {};
                    re.constructor = {};
                    re.constructor[SPECIES] = function() {
                        return re;
                    };
                    re.flags = "";
                    re[SYMBOL] = /./[SYMBOL];
                }
                re.exec = function() {
                    execCalled = true;
                    return null;
                };
                re[SYMBOL]("");
                return !execCalled;
            });
            if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
                var nativeRegExpMethod = /./[SYMBOL];
                var methods = exec(SYMBOL, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
                    var $exec = regexp.exec;
                    if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
                        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                            return {
                                done: true,
                                value: call(nativeRegExpMethod, regexp, str, arg2)
                            };
                        }
                        return {
                            done: true,
                            value: call(nativeMethod, str, regexp, arg2)
                        };
                    }
                    return {
                        done: false
                    };
                });
                defineBuiltIn(String.prototype, KEY, methods[0]);
                defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
            }
            if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], "sham", true);
        };
        return fixRegexpWellKnownSymbolLogic;
    }
    var advanceStringIndex;
    var hasRequiredAdvanceStringIndex;
    function requireAdvanceStringIndex() {
        if (hasRequiredAdvanceStringIndex) return advanceStringIndex;
        hasRequiredAdvanceStringIndex = 1;
        var charAt = requireStringMultibyte().charAt;
        advanceStringIndex = function(S, index, unicode) {
            return index + (unicode ? charAt(S, index).length : 1);
        };
        return advanceStringIndex;
    }
    var getSubstitution;
    var hasRequiredGetSubstitution;
    function requireGetSubstitution() {
        if (hasRequiredGetSubstitution) return getSubstitution;
        hasRequiredGetSubstitution = 1;
        var uncurryThis = requireFunctionUncurryThis();
        var toObject = requireToObject();
        var floor = Math.floor;
        var charAt = uncurryThis("".charAt);
        var replace = uncurryThis("".replace);
        var stringSlice = uncurryThis("".slice);
        var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
        var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;
        getSubstitution = function(matched, str, position, captures, namedCaptures, replacement) {
            var tailPos = position + matched.length;
            var m = captures.length;
            var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
            if (namedCaptures !== undefined) {
                namedCaptures = toObject(namedCaptures);
                symbols = SUBSTITUTION_SYMBOLS;
            }
            return replace(replacement, symbols, function(match, ch) {
                var capture;
                switch (charAt(ch, 0)) {
                  case "$":
                    return "$";

                  case "&":
                    return matched;

                  case "`":
                    return stringSlice(str, 0, position);

                  case "'":
                    return stringSlice(str, tailPos);

                  case "<":
                    capture = namedCaptures[stringSlice(ch, 1, -1)];
                    break;

                  default:
                    var n = +ch;
                    if (n === 0) return match;
                    if (n > m) {
                        var f = floor(n / 10);
                        if (f === 0) return match;
                        if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
                        return match;
                    }
                    capture = captures[n - 1];
                }
                return capture === undefined ? "" : capture;
            });
        };
        return getSubstitution;
    }
    var regexpFlagsDetection;
    var hasRequiredRegexpFlagsDetection;
    function requireRegexpFlagsDetection() {
        if (hasRequiredRegexpFlagsDetection) return regexpFlagsDetection;
        hasRequiredRegexpFlagsDetection = 1;
        var globalThis = requireGlobalThis();
        var fails = requireFails();
        var RegExp = globalThis.RegExp;
        var FLAGS_GETTER_IS_CORRECT = !fails(function() {
            var INDICES_SUPPORT = true;
            try {
                RegExp(".", "d");
            } catch (error) {
                INDICES_SUPPORT = false;
            }
            var O = {};
            var calls = "";
            var expected = INDICES_SUPPORT ? "dgimsy" : "gimsy";
            var addGetter = function(key, chr) {
                Object.defineProperty(O, key, {
                    get: function() {
                        calls += chr;
                        return true;
                    }
                });
            };
            var pairs = {
                dotAll: "s",
                global: "g",
                ignoreCase: "i",
                multiline: "m",
                sticky: "y"
            };
            if (INDICES_SUPPORT) pairs.hasIndices = "d";
            for (var key in pairs) addGetter(key, pairs[key]);
            var result = Object.getOwnPropertyDescriptor(RegExp.prototype, "flags").get.call(O);
            return result !== expected || calls !== expected;
        });
        regexpFlagsDetection = {
            correct: FLAGS_GETTER_IS_CORRECT
        };
        return regexpFlagsDetection;
    }
    var regexpGetFlags;
    var hasRequiredRegexpGetFlags;
    function requireRegexpGetFlags() {
        if (hasRequiredRegexpGetFlags) return regexpGetFlags;
        hasRequiredRegexpGetFlags = 1;
        var call = requireFunctionCall();
        var hasOwn = requireHasOwnProperty();
        var isPrototypeOf = requireObjectIsPrototypeOf();
        var regExpFlagsDetection = requireRegexpFlagsDetection();
        var regExpFlagsGetterImplementation = requireRegexpFlags();
        var RegExpPrototype = RegExp.prototype;
        regexpGetFlags = regExpFlagsDetection.correct ? function(it) {
            return it.flags;
        } : function(it) {
            return !regExpFlagsDetection.correct && isPrototypeOf(RegExpPrototype, it) && !hasOwn(it, "flags") ? call(regExpFlagsGetterImplementation, it) : it.flags;
        };
        return regexpGetFlags;
    }
    var regexpExecAbstract;
    var hasRequiredRegexpExecAbstract;
    function requireRegexpExecAbstract() {
        if (hasRequiredRegexpExecAbstract) return regexpExecAbstract;
        hasRequiredRegexpExecAbstract = 1;
        var call = requireFunctionCall();
        var anObject = requireAnObject();
        var isCallable = requireIsCallable();
        var classof = requireClassofRaw();
        var regexpExec = requireRegexpExec();
        var $TypeError = TypeError;
        regexpExecAbstract = function(R, S) {
            var exec = R.exec;
            if (isCallable(exec)) {
                var result = call(exec, R, S);
                if (result !== null) anObject(result);
                return result;
            }
            if (classof(R) === "RegExp") return call(regexpExec, R, S);
            throw new $TypeError("RegExp#exec called on incompatible receiver");
        };
        return regexpExecAbstract;
    }
    var hasRequiredEs_string_replace;
    function requireEs_string_replace() {
        if (hasRequiredEs_string_replace) return es_string_replace;
        hasRequiredEs_string_replace = 1;
        var apply = requireFunctionApply();
        var call = requireFunctionCall();
        var uncurryThis = requireFunctionUncurryThis();
        var fixRegExpWellKnownSymbolLogic = requireFixRegexpWellKnownSymbolLogic();
        var fails = requireFails();
        var anObject = requireAnObject();
        var isCallable = requireIsCallable();
        var isObject = requireIsObject();
        var toIntegerOrInfinity = requireToIntegerOrInfinity();
        var toLength = requireToLength();
        var toString = requireToString();
        var requireObjectCoercible = requireRequireObjectCoercible();
        var advanceStringIndex = requireAdvanceStringIndex();
        var getMethod = requireGetMethod();
        var getSubstitution = requireGetSubstitution();
        var getRegExpFlags = requireRegexpGetFlags();
        var regExpExec = requireRegexpExecAbstract();
        var wellKnownSymbol = requireWellKnownSymbol();
        var REPLACE = wellKnownSymbol("replace");
        var max = Math.max;
        var min = Math.min;
        var concat = uncurryThis([].concat);
        var push = uncurryThis([].push);
        var stringIndexOf = uncurryThis("".indexOf);
        var stringSlice = uncurryThis("".slice);
        var maybeToString = function(it) {
            return it === undefined ? it : String(it);
        };
        var REPLACE_KEEPS_$0 = function() {
            return "a".replace(/./, "$0") === "$0";
        }();
        var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function() {
            if (/./[REPLACE]) {
                return /./[REPLACE]("a", "$0") === "";
            }
            return false;
        }();
        var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function() {
            var re = /./;
            re.exec = function() {
                var result = [];
                result.groups = {
                    a: "7"
                };
                return result;
            };
            return "".replace(re, "$<a>") !== "7";
        });
        fixRegExpWellKnownSymbolLogic("replace", function(_, nativeReplace, maybeCallNative) {
            var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
            return [ function replace(searchValue, replaceValue) {
                var O = requireObjectCoercible(this);
                var replacer = isObject(searchValue) ? getMethod(searchValue, REPLACE) : undefined;
                return replacer ? call(replacer, searchValue, O, replaceValue) : call(nativeReplace, toString(O), searchValue, replaceValue);
            }, function(string, replaceValue) {
                var rx = anObject(this);
                var S = toString(string);
                if (typeof replaceValue == "string" && stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 && stringIndexOf(replaceValue, "$<") === -1) {
                    var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
                    if (res.done) return res.value;
                }
                var functionalReplace = isCallable(replaceValue);
                if (!functionalReplace) replaceValue = toString(replaceValue);
                var flags = toString(getRegExpFlags(rx));
                var global = stringIndexOf(flags, "g") !== -1;
                var fullUnicode;
                if (global) {
                    fullUnicode = stringIndexOf(flags, "u") !== -1;
                    rx.lastIndex = 0;
                }
                var results = [];
                var result;
                while (true) {
                    result = regExpExec(rx, S);
                    if (result === null) break;
                    push(results, result);
                    if (!global) break;
                    var matchStr = toString(result[0]);
                    if (matchStr === "") rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
                }
                var accumulatedResult = "";
                var nextSourcePosition = 0;
                for (var i = 0; i < results.length; i++) {
                    result = results[i];
                    var matched = toString(result[0]);
                    var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
                    var captures = [];
                    var replacement;
                    for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
                    var namedCaptures = result.groups;
                    if (functionalReplace) {
                        var replacerArgs = concat([ matched ], captures, position, S);
                        if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
                        replacement = toString(apply(replaceValue, undefined, replacerArgs));
                    } else {
                        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
                    }
                    if (position >= nextSourcePosition) {
                        accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
                        nextSourcePosition = position + matched.length;
                    }
                }
                return accumulatedResult + stringSlice(S, nextSourcePosition);
            } ];
        }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);
        return es_string_replace;
    }
    requireEs_string_replace();
    var es_string_split = {};
    var hasRequiredEs_string_split;
    function requireEs_string_split() {
        if (hasRequiredEs_string_split) return es_string_split;
        hasRequiredEs_string_split = 1;
        var call = requireFunctionCall();
        var uncurryThis = requireFunctionUncurryThis();
        var fixRegExpWellKnownSymbolLogic = requireFixRegexpWellKnownSymbolLogic();
        var anObject = requireAnObject();
        var isObject = requireIsObject();
        var requireObjectCoercible = requireRequireObjectCoercible();
        var speciesConstructor = requireSpeciesConstructor();
        var advanceStringIndex = requireAdvanceStringIndex();
        var toLength = requireToLength();
        var toString = requireToString();
        var getMethod = requireGetMethod();
        var regExpExec = requireRegexpExecAbstract();
        var stickyHelpers = requireRegexpStickyHelpers();
        var fails = requireFails();
        var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
        var MAX_UINT32 = 4294967295;
        var min = Math.min;
        var push = uncurryThis([].push);
        var stringSlice = uncurryThis("".slice);
        var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function() {
            var re = /(?:)/;
            var originalExec = re.exec;
            re.exec = function() {
                return originalExec.apply(this, arguments);
            };
            var result = "ab".split(re);
            return result.length !== 2 || result[0] !== "a" || result[1] !== "b";
        });
        var BUGGY = "abbc".split(/(b)*/)[1] === "c" || "test".split(/(?:)/, -1).length !== 4 || "ab".split(/(?:ab)*/).length !== 2 || ".".split(/(.?)(.?)/).length !== 4 || ".".split(/()()/).length > 1 || "".split(/.?/).length;
        fixRegExpWellKnownSymbolLogic("split", function(SPLIT, nativeSplit, maybeCallNative) {
            var internalSplit = "0".split(undefined, 0).length ? function(separator, limit) {
                return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit);
            } : nativeSplit;
            return [ function split(separator, limit) {
                var O = requireObjectCoercible(this);
                var splitter = isObject(separator) ? getMethod(separator, SPLIT) : undefined;
                return splitter ? call(splitter, separator, O, limit) : call(internalSplit, toString(O), separator, limit);
            }, function(string, limit) {
                var rx = anObject(this);
                var S = toString(string);
                if (!BUGGY) {
                    var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);
                    if (res.done) return res.value;
                }
                var C = speciesConstructor(rx, RegExp);
                var unicodeMatching = rx.unicode;
                var flags = (rx.ignoreCase ? "i" : "") + (rx.multiline ? "m" : "") + (rx.unicode ? "u" : "") + (UNSUPPORTED_Y ? "g" : "y");
                var splitter = new C(UNSUPPORTED_Y ? "^(?:" + rx.source + ")" : rx, flags);
                var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
                if (lim === 0) return [];
                if (S.length === 0) return regExpExec(splitter, S) === null ? [ S ] : [];
                var p = 0;
                var q = 0;
                var A = [];
                while (q < S.length) {
                    splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
                    var z = regExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
                    var e;
                    if (z === null || (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p) {
                        q = advanceStringIndex(S, q, unicodeMatching);
                    } else {
                        push(A, stringSlice(S, p, q));
                        if (A.length === lim) return A;
                        for (var i = 1; i <= z.length - 1; i++) {
                            push(A, z[i]);
                            if (A.length === lim) return A;
                        }
                        q = p = e;
                    }
                }
                push(A, stringSlice(S, p));
                return A;
            } ];
        }, BUGGY || !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);
        return es_string_split;
    }
    requireEs_string_split();
    var es_weakSet = {};
    var es_weakSet_constructor = {};
    var hasRequiredEs_weakSet_constructor;
    function requireEs_weakSet_constructor() {
        if (hasRequiredEs_weakSet_constructor) return es_weakSet_constructor;
        hasRequiredEs_weakSet_constructor = 1;
        var collection = requireCollection();
        var collectionWeak = requireCollectionWeak();
        collection("WeakSet", function(init) {
            return function WeakSet() {
                return init(this, arguments.length ? arguments[0] : undefined);
            };
        }, collectionWeak);
        return es_weakSet_constructor;
    }
    var hasRequiredEs_weakSet;
    function requireEs_weakSet() {
        if (hasRequiredEs_weakSet) return es_weakSet;
        hasRequiredEs_weakSet = 1;
        requireEs_weakSet_constructor();
        return es_weakSet;
    }
    requireEs_weakSet();
    var esnext_string_replaceAll = {};
    var es_string_replaceAll = {};
    var isRegexp;
    var hasRequiredIsRegexp;
    function requireIsRegexp() {
        if (hasRequiredIsRegexp) return isRegexp;
        hasRequiredIsRegexp = 1;
        var isObject = requireIsObject();
        var classof = requireClassofRaw();
        var wellKnownSymbol = requireWellKnownSymbol();
        var MATCH = wellKnownSymbol("match");
        isRegexp = function(it) {
            var isRegExp;
            return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) === "RegExp");
        };
        return isRegexp;
    }
    var hasRequiredEs_string_replaceAll;
    function requireEs_string_replaceAll() {
        if (hasRequiredEs_string_replaceAll) return es_string_replaceAll;
        hasRequiredEs_string_replaceAll = 1;
        var $ = require_export();
        var call = requireFunctionCall();
        var uncurryThis = requireFunctionUncurryThis();
        var requireObjectCoercible = requireRequireObjectCoercible();
        var isCallable = requireIsCallable();
        var isObject = requireIsObject();
        var isRegExp = requireIsRegexp();
        var toString = requireToString();
        var getMethod = requireGetMethod();
        var getRegExpFlags = requireRegexpGetFlags();
        var getSubstitution = requireGetSubstitution();
        var wellKnownSymbol = requireWellKnownSymbol();
        var IS_PURE = requireIsPure();
        var REPLACE = wellKnownSymbol("replace");
        var $TypeError = TypeError;
        var indexOf = uncurryThis("".indexOf);
        var replace = uncurryThis("".replace);
        var stringSlice = uncurryThis("".slice);
        var max = Math.max;
        $({
            target: "String",
            proto: true
        }, {
            replaceAll: function replaceAll(searchValue, replaceValue) {
                var O = requireObjectCoercible(this);
                var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, position, replacement;
                var endOfLastMatch = 0;
                var result = "";
                if (isObject(searchValue)) {
                    IS_REG_EXP = isRegExp(searchValue);
                    if (IS_REG_EXP) {
                        flags = toString(requireObjectCoercible(getRegExpFlags(searchValue)));
                        if (!~indexOf(flags, "g")) throw new $TypeError("`.replaceAll` does not allow non-global regexes");
                    }
                    replacer = getMethod(searchValue, REPLACE);
                    if (replacer) return call(replacer, searchValue, O, replaceValue);
                    if (IS_PURE && IS_REG_EXP) return replace(toString(O), searchValue, replaceValue);
                }
                string = toString(O);
                searchString = toString(searchValue);
                functionalReplace = isCallable(replaceValue);
                if (!functionalReplace) replaceValue = toString(replaceValue);
                searchLength = searchString.length;
                advanceBy = max(1, searchLength);
                position = indexOf(string, searchString);
                while (position !== -1) {
                    replacement = functionalReplace ? toString(replaceValue(searchString, position, string)) : getSubstitution(searchString, string, position, [], undefined, replaceValue);
                    result += stringSlice(string, endOfLastMatch, position) + replacement;
                    endOfLastMatch = position + searchLength;
                    position = position + advanceBy > string.length ? -1 : indexOf(string, searchString, position + advanceBy);
                }
                if (endOfLastMatch < string.length) {
                    result += stringSlice(string, endOfLastMatch);
                }
                return result;
            }
        });
        return es_string_replaceAll;
    }
    var hasRequiredEsnext_string_replaceAll;
    function requireEsnext_string_replaceAll() {
        if (hasRequiredEsnext_string_replaceAll) return esnext_string_replaceAll;
        hasRequiredEsnext_string_replaceAll = 1;
        requireEs_string_replaceAll();
        return esnext_string_replaceAll;
    }
    requireEsnext_string_replaceAll();
    var _ArcToCubicConverter;
    var ArcToCubicConverter = function() {
        function ArcToCubicConverter() {
            _classCallCheck(this, ArcToCubicConverter);
        }
        return _createClass(ArcToCubicConverter, null, [ {
            key: "convert",
            value: function convert(rx, ry, rotation, largeArc, sweep, dx, dy, startX, startY) {
                var endX = startX + dx;
                var endY = startY + dy;
                return _assertClassBrand(ArcToCubicConverter, this, _convertEllipticalArcToCubics).call(this, startX, startY, endX, endY, rx, ry, rotation, largeArc, sweep);
            }
        } ]);
    }();
    _ArcToCubicConverter = ArcToCubicConverter;
    function _convertEllipticalArcToCubics(startX, startY, endX, endY, rx, ry, rotation, largeArc, sweep) {
        var phi = rotation * Math.PI / 180;
        var center = _assertClassBrand(_ArcToCubicConverter, this, _calculateEllipseCenter).call(this, startX, startY, endX, endY, rx, ry, phi, largeArc, sweep);
        if (!center) {
            return [ {
                type: "lineTo",
                x: endX,
                y: endY
            } ];
        }
        var cx = center.cx, cy = center.cy, theta1 = center.theta1, theta2 = center.theta2;
        var deltaTheta = Math.abs(theta2 - theta1);
        var segments = Math.max(1, Math.min(4, Math.ceil(deltaTheta / (Math.PI / 2))));
        var thetaStep = (theta2 - theta1) / segments;
        var commands = [];
        var currentTheta = theta1;
        for (var i = 0; i < segments; i++) {
            var nextTheta = currentTheta + thetaStep;
            var bezier = _assertClassBrand(_ArcToCubicConverter, this, _ellipseSegmentToCubicBezierCorrected).call(this, cx, cy, rx, ry, phi, currentTheta, nextTheta);
            commands.push({
                type: "cubicBezier",
                x1: bezier.x1,
                y1: bezier.y1,
                x2: bezier.x2,
                y2: bezier.y2,
                x: bezier.x,
                y: bezier.y
            });
            currentTheta = nextTheta;
        }
        return commands;
    }
    function _calculateEllipseCenter(x1, y1, x2, y2, rx, ry, phi, largeArc, sweep) {
        var cosPhi = Math.cos(phi);
        var sinPhi = Math.sin(phi);
        var dx = (x1 - x2) / 2;
        var dy = (y1 - y2) / 2;
        var x1_ = cosPhi * dx + sinPhi * dy;
        var y1_ = -sinPhi * dx + cosPhi * dy;
        var rx2 = rx * rx;
        var ry2 = ry * ry;
        var x1_2 = x1_ * x1_;
        var y1_2 = y1_ * y1_;
        var radicant = (rx2 * ry2 - rx2 * y1_2 - ry2 * x1_2) / (rx2 * y1_2 + ry2 * x1_2);
        if (radicant < 0) {
            var scale = Math.sqrt(1 + Math.abs(radicant));
            rx *= scale;
            ry *= scale;
        }
        var factor = Math.sqrt(Math.max(0, radicant));
        if (largeArc === sweep) factor = -factor;
        var cx_ = factor * rx * y1_ / ry;
        var cy_ = -factor * ry * x1_ / rx;
        var cx = cosPhi * cx_ - sinPhi * cy_ + (x1 + x2) / 2;
        var cy = sinPhi * cx_ + cosPhi * cy_ + (y1 + y2) / 2;
        var ux = (x1_ - cx_) / rx;
        var uy = (y1_ - cy_) / ry;
        var vx = (-x1_ - cx_) / rx;
        var vy = (-y1_ - cy_) / ry;
        var theta1 = Math.atan2(uy, ux);
        var theta2 = Math.atan2(vy, vx);
        if (sweep === 0) {
            if (theta2 > theta1) theta2 -= 2 * Math.PI;
        } else {
            if (theta2 < theta1) theta2 += 2 * Math.PI;
        }
        return {
            cx: cx,
            cy: cy,
            theta1: theta1,
            theta2: theta2
        };
    }
    function _getEllipsePoint(cx, cy, rx, ry, phi, theta) {
        return {
            x: cx + rx * Math.cos(theta) * Math.cos(phi) - ry * Math.sin(theta) * Math.sin(phi),
            y: cy + rx * Math.cos(theta) * Math.sin(phi) + ry * Math.sin(theta) * Math.cos(phi)
        };
    }
    function _ellipseSegmentToCubicBezierCorrected(cx, cy, rx, ry, phi, theta1, theta2) {
        var p1 = _assertClassBrand(_ArcToCubicConverter, this, _getEllipsePoint).call(this, cx, cy, rx, ry, phi, theta1);
        var p4 = _assertClassBrand(_ArcToCubicConverter, this, _getEllipsePoint).call(this, cx, cy, rx, ry, phi, theta2);
        var derivative1 = _assertClassBrand(_ArcToCubicConverter, this, _getEllipseDerivative).call(this, rx, ry, phi, theta1);
        var derivative4 = _assertClassBrand(_ArcToCubicConverter, this, _getEllipseDerivative).call(this, rx, ry, phi, theta2);
        var deltaTheta = theta2 - theta1;
        var alpha = Math.sin(deltaTheta) * (Math.sqrt(4 + 3 * Math.pow(Math.tan(deltaTheta / 2), 2)) - 1) / 3;
        return {
            x1: p1.x + alpha * derivative1.dx,
            y1: p1.y + alpha * derivative1.dy,
            x2: p4.x - alpha * derivative4.dx,
            y2: p4.y - alpha * derivative4.dy,
            x: p4.x,
            y: p4.y
        };
    }
    function _getEllipseDerivative(rx, ry, phi, theta) {
        var dx = -rx * Math.sin(theta) * Math.cos(phi) - ry * Math.cos(theta) * Math.sin(phi);
        var dy = -rx * Math.sin(theta) * Math.sin(phi) + ry * Math.cos(theta) * Math.cos(phi);
        return {
            dx: dx,
            dy: dy
        };
    }
    var _pathString = new WeakMap;
    var _commands = new WeakMap;
    var _currentX = new WeakMap;
    var _currentY = new WeakMap;
    var _SVGPathParser_brand = new WeakSet;
    var SVGPathParser = function() {
        function SVGPathParser(pathString) {
            _classCallCheck(this, SVGPathParser);
            _classPrivateMethodInitSpec(this, _SVGPathParser_brand);
            _classPrivateFieldInitSpec(this, _pathString, void 0);
            _classPrivateFieldInitSpec(this, _commands, void 0);
            _classPrivateFieldInitSpec(this, _currentX, void 0);
            _classPrivateFieldInitSpec(this, _currentY, void 0);
            _classPrivateFieldSet2(_pathString, this, pathString);
            _classPrivateFieldSet2(_currentX, this, 0);
            _classPrivateFieldSet2(_currentY, this, 0);
            _classPrivateFieldSet2(_commands, this, []);
        }
        return _createClass(SVGPathParser, [ {
            key: "parse",
            value: function parse() {
                var commandRegex = /([MLHVCSQTAZ])([^MLHVCSQTAZ]*)/gi;
                var match;
                while ((match = commandRegex.exec(_classPrivateFieldGet2(_pathString, this))) !== null) {
                    var command = match[1];
                    var params = match[2].trim().replaceAll(/(\d)-/g, "$1 -").split(/[\s,]+/).filter(function(p) {
                        return p !== "";
                    }).map(parseFloat);
                    _assertClassBrand(_SVGPathParser_brand, this, _processCommand).call(this, command, params);
                }
                return _classPrivateFieldGet2(_commands, this);
            }
        } ]);
    }();
    function _processCommand(command, params) {
        switch (command.toUpperCase()) {
          case "M":
            _assertClassBrand(_SVGPathParser_brand, this, _handleMoveto).call(this, command, params);
            break;

          case "L":
            _assertClassBrand(_SVGPathParser_brand, this, _handleLineto).call(this, command, params);
            break;

          case "H":
            _assertClassBrand(_SVGPathParser_brand, this, _handleHorizontalLineto).call(this, command, params);
            break;

          case "V":
            _assertClassBrand(_SVGPathParser_brand, this, _handleVerticalLineto).call(this, command, params);
            break;

          case "C":
            _assertClassBrand(_SVGPathParser_brand, this, _handleCubicBezier).call(this, command, params);
            break;

          case "Q":
            _assertClassBrand(_SVGPathParser_brand, this, _handleQuadraticBezier).call(this, command, params);
            break;

          case "S":
            _assertClassBrand(_SVGPathParser_brand, this, _handleSmoothCubicBezier).call(this, command, params);
            break;

          case "T":
            _assertClassBrand(_SVGPathParser_brand, this, _handleSmoothQuadraticBezier).call(this, command, params);
            break;

          case "A":
            _assertClassBrand(_SVGPathParser_brand, this, _handleEllipticalArc).call(this, command, params);
            break;

          case "Z":
            _assertClassBrand(_SVGPathParser_brand, this, _handleClosepath).call(this);
            break;
        }
    }
    function _handleMoveto(command, params) {
        for (var i = 0; i < params.length; i += 2) {
            var x = params[i];
            var y = params[i + 1];
            var absolute = command === "M";
            if (!absolute) {
                x += _classPrivateFieldGet2(_currentX, this);
                y += _classPrivateFieldGet2(_currentY, this);
            }
            _classPrivateFieldSet2(_currentX, this, x);
            _classPrivateFieldSet2(_currentY, this, y);
            _classPrivateFieldGet2(_commands, this).push({
                type: "moveto",
                x: x,
                y: y,
                absolute: absolute
            });
        }
    }
    function _handleLineto(command, params) {
        for (var i = 0; i < params.length; i += 2) {
            var x = params[i];
            var y = params[i + 1];
            var absolute = command === "L";
            if (!absolute) {
                x += _classPrivateFieldGet2(_currentX, this);
                y += _classPrivateFieldGet2(_currentY, this);
            }
            _classPrivateFieldGet2(_commands, this).push({
                type: "lineto",
                x: x,
                y: y,
                absolute: absolute
            });
            _classPrivateFieldSet2(_currentX, this, x);
            _classPrivateFieldSet2(_currentY, this, y);
        }
    }
    function _handleHorizontalLineto(command, params) {
        var _this = this;
        params.forEach(function(param) {
            var x = param;
            var absolute = command === "H";
            if (!absolute) {
                x += _classPrivateFieldGet2(_currentX, _this);
            }
            _classPrivateFieldGet2(_commands, _this).push({
                type: "lineto",
                x: x,
                y: _classPrivateFieldGet2(_currentY, _this),
                absolute: absolute,
                isHorizontal: true
            });
            _classPrivateFieldSet2(_currentX, _this, x);
        });
    }
    function _handleVerticalLineto(command, params) {
        var _this2 = this;
        params.forEach(function(param) {
            var y = param;
            var absolute = command === "V";
            if (!absolute) {
                y += _classPrivateFieldGet2(_currentY, _this2);
            }
            _classPrivateFieldGet2(_commands, _this2).push({
                type: "lineto",
                x: _classPrivateFieldGet2(_currentX, _this2),
                y: y,
                absolute: absolute,
                isVertical: true
            });
            _classPrivateFieldSet2(_currentY, _this2, y);
        });
    }
    function _handleCubicBezier(command, params) {
        for (var i = 0; i < params.length; i += 6) {
            var _x = params[i];
            var _y = params[i + 1];
            var x2 = params[i + 2];
            var y2 = params[i + 3];
            var x = params[i + 4];
            var y = params[i + 5];
            var absolute = command === "C";
            if (!absolute) {
                _x += _classPrivateFieldGet2(_currentX, this);
                _y += _classPrivateFieldGet2(_currentY, this);
                x2 += _classPrivateFieldGet2(_currentX, this);
                y2 += _classPrivateFieldGet2(_currentY, this);
                x += _classPrivateFieldGet2(_currentX, this);
                y += _classPrivateFieldGet2(_currentY, this);
            }
            _classPrivateFieldGet2(_commands, this).push({
                type: "cubicBezier",
                x1: _x,
                y1: _y,
                x2: x2,
                y2: y2,
                x: x,
                y: y,
                absolute: absolute
            });
            _classPrivateFieldSet2(_currentX, this, x);
            _classPrivateFieldSet2(_currentY, this, y);
        }
    }
    function _handleQuadraticBezier(command, params) {
        for (var i = 0; i < params.length; i += 4) {
            var _x2 = params[i];
            var _y2 = params[i + 1];
            var x = params[i + 2];
            var y = params[i + 3];
            var absolute = command === "Q";
            if (!absolute) {
                _x2 += _classPrivateFieldGet2(_currentX, this);
                _y2 += _classPrivateFieldGet2(_currentY, this);
                x += _classPrivateFieldGet2(_currentX, this);
                y += _classPrivateFieldGet2(_currentY, this);
            }
            _classPrivateFieldGet2(_commands, this).push({
                type: "quadraticBezier",
                x1: _x2,
                y1: _y2,
                x2: x,
                y2: y,
                absolute: absolute
            });
            _classPrivateFieldSet2(_currentX, this, x);
            _classPrivateFieldSet2(_currentY, this, y);
        }
    }
    function _handleSmoothCubicBezier(command, params) {
        for (var i = 0; i < params.length; i += 4) {
            var x2 = params[i];
            var y2 = params[i + 1];
            var x = params[i + 2];
            var y = params[i + 3];
            var absolute = command === "S";
            var _x3 = _classPrivateFieldGet2(_currentX, this);
            var _y3 = _classPrivateFieldGet2(_currentY, this);
            if (!absolute) {
                x2 += _classPrivateFieldGet2(_currentX, this);
                y2 += _classPrivateFieldGet2(_currentY, this);
                x += _classPrivateFieldGet2(_currentX, this);
                y += _classPrivateFieldGet2(_currentY, this);
            }
            if (_classPrivateFieldGet2(_commands, this)[_classPrivateFieldGet2(_commands, this).length - 1].type === "cubicBezier") {
                _x3 = 2 * _x3 - _classPrivateFieldGet2(_commands, this)[_classPrivateFieldGet2(_commands, this).length - 1].x2;
                _y3 = 2 * _y3 - _classPrivateFieldGet2(_commands, this)[_classPrivateFieldGet2(_commands, this).length - 1].y2;
            }
            _classPrivateFieldGet2(_commands, this).push({
                type: "cubicBezier",
                x1: _x3,
                y1: _y3,
                x2: x2,
                y2: y2,
                x: x,
                y: y,
                absolute: absolute,
                isSmooth: true
            });
            _classPrivateFieldSet2(_currentX, this, x);
            _classPrivateFieldSet2(_currentY, this, y);
        }
    }
    function _handleSmoothQuadraticBezier(command, params) {
        for (var i = 0; i < params.length; i += 2) {
            var x = params[i];
            var y = params[i + 1];
            var absolute = command === "T";
            if (!absolute) {
                x += _classPrivateFieldGet2(_currentX, this);
                y += _classPrivateFieldGet2(_currentY, this);
            }
            _classPrivateFieldGet2(_commands, this).push({
                type: "quadraticBezier",
                x1: x1,
                y1: y1,
                x2: x,
                y2: y,
                absolute: absolute,
                isSmooth: true
            });
            _classPrivateFieldSet2(_currentX, this, x);
            _classPrivateFieldSet2(_currentY, this, y);
        }
    }
    function _handleEllipticalArc(command, params) {
        var _this3 = this;
        for (var i = 0; i < params.length; i += 7) {
            var rx = params[i];
            var ry = params[i + 1];
            var rotation = params[i + 2];
            var largeArc = params[i + 3];
            var sweep = params[i + 4];
            var x = params[i + 5];
            var y = params[i + 6];
            var bezierCommands = ArcToCubicConverter.convert(rx, ry, rotation, largeArc, sweep, x, y, _classPrivateFieldGet2(_currentX, this), _classPrivateFieldGet2(_currentY, this));
            bezierCommands.forEach(function(command) {
                _classPrivateFieldGet2(_commands, _this3).push(command);
            });
            _classPrivateFieldSet2(_currentX, this, _classPrivateFieldGet2(_currentX, this) + x);
            _classPrivateFieldSet2(_currentY, this, _classPrivateFieldGet2(_currentY, this) + y);
        }
    }
    function _handleClosepath() {
        _classPrivateFieldGet2(_commands, this).push({
            type: "closepath"
        });
    }
    var _SvgParser;
    var SvgParser = function() {
        function SvgParser() {
            _classCallCheck(this, SvgParser);
        }
        return _createClass(SvgParser, null, [ {
            key: "parse",
            value: function parse(svgString) {
                var _svgDoc$querySelector, _svgDoc$querySelector2, _svgDoc$querySelector3;
                var parser = new DOMParser;
                var svgDoc = parser.parseFromString(svgString, "image/svg+xml");
                var width = (_svgDoc$querySelector = svgDoc.querySelector("svg")) === null || _svgDoc$querySelector === void 0 ? void 0 : _svgDoc$querySelector.getAttribute("width");
                var height = (_svgDoc$querySelector2 = svgDoc.querySelector("svg")) === null || _svgDoc$querySelector2 === void 0 ? void 0 : _svgDoc$querySelector2.getAttribute("height");
                var viewBox = (_svgDoc$querySelector3 = svgDoc.querySelector("svg")) === null || _svgDoc$querySelector3 === void 0 ? void 0 : _svgDoc$querySelector3.getAttribute("viewBox");
                if (viewBox) {
                    width = viewBox.split(" ").length > 2 ? viewBox.split(" ")[2] : width;
                    height = viewBox.split(" ").length > 3 ? viewBox.split(" ")[3] : height;
                }
                var elements = _assertClassBrand(SvgParser, this, _extractElements).call(this, svgDoc);
                if (!elements || elements.length === 0) {
                    throw new Error("No elements found in SVG");
                }
                return {
                    width: width,
                    height: height,
                    elements: elements
                };
            }
        } ]);
    }();
    _SvgParser = SvgParser;
    function _extractElements(svgDoc) {
        var elements = [];
        elements = elements.concat(_assertClassBrand(_SvgParser, this, _extractPaths).call(this, svgDoc));
        elements = elements.concat(_assertClassBrand(_SvgParser, this, _extractCircles).call(this, svgDoc));
        elements = elements.concat(_assertClassBrand(_SvgParser, this, _extractRects).call(this, svgDoc));
        elements = elements.concat(_assertClassBrand(_SvgParser, this, _extractEllipses).call(this, svgDoc));
        elements = elements.concat(_assertClassBrand(_SvgParser, this, _extractLines).call(this, svgDoc));
        elements = elements.concat(_assertClassBrand(_SvgParser, this, _extractPolylines).call(this, svgDoc));
        elements = elements.concat(_assertClassBrand(_SvgParser, this, _extractPolygons).call(this, svgDoc));
        return elements;
    }
    function _extractPaths(svgDoc) {
        var _this = this;
        var elements = [];
        svgDoc.querySelectorAll("path").forEach(function(path) {
            var pathParser = new SVGPathParser(path.getAttribute("d"));
            elements.push({
                type: "path",
                d: pathParser.parse(),
                style: _assertClassBrand(_SvgParser, _this, _getElementStyle).call(_this, path)
            });
        });
        return elements;
    }
    function _extractCircles(svgDoc) {
        var _this2 = this;
        var elements = [];
        svgDoc.querySelectorAll("circle").forEach(function(circle) {
            var element = {
                cx: circle.getAttribute("cx"),
                cy: circle.getAttribute("cy"),
                r: circle.getAttribute("r")
            };
            var d = _assertClassBrand(_SvgParser, _this2, _circleToPathCommands).call(_this2, element);
            var pathParser = new SVGPathParser(d);
            elements.push({
                type: "path",
                d: pathParser.parse(),
                style: _assertClassBrand(_SvgParser, _this2, _getElementStyle).call(_this2, circle)
            });
        });
        return elements;
    }
    function _extractRects(svgDoc) {
        var _this3 = this;
        var elements = [];
        svgDoc.querySelectorAll("rect").forEach(function(rect) {
            var element = {
                x: rect.getAttribute("x"),
                y: rect.getAttribute("y"),
                width: rect.getAttribute("width"),
                height: rect.getAttribute("height")
            };
            var d = _assertClassBrand(_SvgParser, _this3, _rectToPathCommands).call(_this3, element);
            var pathParser = new SVGPathParser(d);
            elements.push({
                type: "path",
                d: pathParser.parse(),
                style: _assertClassBrand(_SvgParser, _this3, _getElementStyle).call(_this3, rect)
            });
        });
        return elements;
    }
    function _extractEllipses(svgDoc) {
        var _this4 = this;
        var elements = [];
        svgDoc.querySelectorAll("ellipse").forEach(function(ellipse) {
            var element = {
                cx: ellipse.getAttribute("cx"),
                cy: ellipse.getAttribute("cy"),
                rx: ellipse.getAttribute("rx"),
                ry: ellipse.getAttribute("ry")
            };
            var d = _assertClassBrand(_SvgParser, _this4, _ellipseToPathCommands).call(_this4, element);
            var pathParser = new SVGPathParser(d);
            elements.push({
                type: "path",
                d: pathParser.parse(),
                style: _assertClassBrand(_SvgParser, _this4, _getElementStyle).call(_this4, ellipse)
            });
        });
        return elements;
    }
    function _extractLines(svgDoc) {
        var _this5 = this;
        var elements = [];
        svgDoc.querySelectorAll("line").forEach(function(line) {
            var x1 = line.getAttribute("x1");
            var y1 = line.getAttribute("y1");
            var x2 = line.getAttribute("x2");
            var y2 = line.getAttribute("y2");
            var d = "M ".concat(x1, " ").concat(y1, " L ").concat(x2, " ").concat(y2);
            var pathParser = new SVGPathParser(d);
            elements.push({
                type: "path",
                d: pathParser.parse(),
                style: _assertClassBrand(_SvgParser, _this5, _getElementStyle).call(_this5, line)
            });
        });
        return elements;
    }
    function _extractPolylines(svgDoc) {
        var _this6 = this;
        var elements = [];
        svgDoc.querySelectorAll("polyline").forEach(function(polyline) {
            var points = polyline.getAttribute("points").split(" ").map(function(point) {
                var _point$split = point.split(","), _point$split2 = _slicedToArray(_point$split, 2), x = _point$split2[0], y = _point$split2[1];
                return {
                    x: parseFloat(x),
                    y: parseFloat(y)
                };
            });
            var d = points.map(function(point, index) {
                return "".concat(index === 0 ? "M" : "L", " ").concat(point.x, ",").concat(point.y);
            }).join(" ");
            var pathParser = new SVGPathParser(d);
            elements.push({
                type: "path",
                d: pathParser.parse(),
                style: _assertClassBrand(_SvgParser, _this6, _getElementStyle).call(_this6, polyline)
            });
        });
        return elements;
    }
    function _extractPolygons(svgDoc) {
        var _this7 = this;
        var elements = [];
        svgDoc.querySelectorAll("polygon").forEach(function(polygon) {
            var points = polygon.getAttribute("points").split(" ").map(function(point) {
                var _point$split3 = point.split(","), _point$split4 = _slicedToArray(_point$split3, 2), x = _point$split4[0], y = _point$split4[1];
                return {
                    x: parseFloat(x),
                    y: parseFloat(y)
                };
            });
            var d = points.map(function(point, index) {
                return "".concat(index === 0 ? "M" : "L", " ").concat(point.x, ",").concat(point.y);
            }).join(" ") + " Z";
            var pathParser = new SVGPathParser(d);
            elements.push({
                type: "path",
                d: pathParser.parse(),
                style: _assertClassBrand(_SvgParser, _this7, _getElementStyle).call(_this7, polygon)
            });
        });
        return elements;
    }
    function _getElementStyle(element) {
        var _element$getAttribute;
        var elementStyles = {
            fill: element.getAttribute("fill"),
            stroke: element.getAttribute("stroke"),
            strokeWidth: element.getAttribute("stroke-width"),
            opacity: element.getAttribute("opacity")
        };
        var attributeStyles = (_element$getAttribute = element.getAttribute("style")) === null || _element$getAttribute === void 0 ? void 0 : _element$getAttribute.split(";").map(function(style) {
            return style.trim();
        }).filter(function(style) {
            return style !== "";
        });
        if (attributeStyles && attributeStyles.length > 0) {
            attributeStyles.forEach(function(style) {
                elementStyles[style.split(":")[0]] = style.split(":")[1];
            });
        }
        return elementStyles;
    }
    function _rectToPathCommands(rect) {
        var x = parseFloat(rect.x);
        var y = parseFloat(rect.y);
        var width = parseFloat(rect.width);
        var height = parseFloat(rect.height);
        var commands = [];
        commands.push("M ".concat(x, " ").concat(y));
        commands.push("L ".concat(x + width, " ").concat(y));
        commands.push("L ".concat(x + width, " ").concat(y + height));
        commands.push("L ".concat(x, " ").concat(y + height));
        commands.push("Z");
        return commands.join(" ");
    }
    function _ellipseToPathCommands(ellipse) {
        var cx = parseFloat(ellipse.cx);
        var cy = parseFloat(ellipse.cy);
        var rx = parseFloat(ellipse.rx);
        var ry = parseFloat(ellipse.ry);
        return "M ".concat(cx - rx, ",").concat(cy, " a ").concat(rx, ",").concat(ry, " 0 1,0 ").concat(rx * 2, ",0 a ").concat(rx, ",").concat(ry, " 0 1,0 ").concat(-rx * 2, ",0 Z");
    }
    function _circleToPathCommands(circle) {
        var segments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;
        var cx = parseFloat(circle.cx);
        var cy = parseFloat(circle.cy);
        var r = parseFloat(circle.r);
        var commands = [];
        var angleStep = 2 * Math.PI / segments;
        var startX = cx + r * Math.cos(0);
        var startY = cy + r * Math.sin(0);
        commands.push("M ".concat(startX, " ").concat(startY));
        for (var i = 1; i <= segments; i++) {
            var angle = i * angleStep;
            var x = cx + r * Math.cos(angle);
            var y = cy + r * Math.sin(angle);
            commands.push("L ".concat(x, " ").concat(y));
        }
        commands.push("Z");
        return commands.join(" ");
    }
    var es_array_from = {};
    var callWithSafeIterationClosing;
    var hasRequiredCallWithSafeIterationClosing;
    function requireCallWithSafeIterationClosing() {
        if (hasRequiredCallWithSafeIterationClosing) return callWithSafeIterationClosing;
        hasRequiredCallWithSafeIterationClosing = 1;
        var anObject = requireAnObject();
        var iteratorClose = requireIteratorClose();
        callWithSafeIterationClosing = function(iterator, fn, value, ENTRIES) {
            try {
                return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
            } catch (error) {
                iteratorClose(iterator, "throw", error);
            }
        };
        return callWithSafeIterationClosing;
    }
    var arrayFrom;
    var hasRequiredArrayFrom;
    function requireArrayFrom() {
        if (hasRequiredArrayFrom) return arrayFrom;
        hasRequiredArrayFrom = 1;
        var bind = requireFunctionBindContext();
        var call = requireFunctionCall();
        var toObject = requireToObject();
        var callWithSafeIterationClosing = requireCallWithSafeIterationClosing();
        var isArrayIteratorMethod = requireIsArrayIteratorMethod();
        var isConstructor = requireIsConstructor();
        var lengthOfArrayLike = requireLengthOfArrayLike();
        var createProperty = requireCreateProperty();
        var getIterator = requireGetIterator();
        var getIteratorMethod = requireGetIteratorMethod();
        var $Array = Array;
        arrayFrom = function from(arrayLike) {
            var O = toObject(arrayLike);
            var IS_CONSTRUCTOR = isConstructor(this);
            var argumentsLength = arguments.length;
            var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
            var mapping = mapfn !== undefined;
            if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
            var iteratorMethod = getIteratorMethod(O);
            var index = 0;
            var length, result, step, iterator, next, value;
            if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
                result = IS_CONSTRUCTOR ? new this : [];
                iterator = getIterator(O, iteratorMethod);
                next = iterator.next;
                for (;!(step = call(next, iterator)).done; index++) {
                    value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [ step.value, index ], true) : step.value;
                    createProperty(result, index, value);
                }
            } else {
                length = lengthOfArrayLike(O);
                result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
                for (;length > index; index++) {
                    value = mapping ? mapfn(O[index], index) : O[index];
                    createProperty(result, index, value);
                }
            }
            result.length = index;
            return result;
        };
        return arrayFrom;
    }
    var hasRequiredEs_array_from;
    function requireEs_array_from() {
        if (hasRequiredEs_array_from) return es_array_from;
        hasRequiredEs_array_from = 1;
        var $ = require_export();
        var from = requireArrayFrom();
        var checkCorrectnessOfIteration = requireCheckCorrectnessOfIteration();
        var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function(iterable) {
            Array.from(iterable);
        });
        $({
            target: "Array",
            stat: true,
            forced: INCORRECT_ITERATION
        }, {
            from: from
        });
        return es_array_from;
    }
    requireEs_array_from();
    var es_regexp_constructor = {};
    var proxyAccessor;
    var hasRequiredProxyAccessor;
    function requireProxyAccessor() {
        if (hasRequiredProxyAccessor) return proxyAccessor;
        hasRequiredProxyAccessor = 1;
        var defineProperty = requireObjectDefineProperty().f;
        proxyAccessor = function(Target, Source, key) {
            key in Target || defineProperty(Target, key, {
                configurable: true,
                get: function() {
                    return Source[key];
                },
                set: function(it) {
                    Source[key] = it;
                }
            });
        };
        return proxyAccessor;
    }
    var hasRequiredEs_regexp_constructor;
    function requireEs_regexp_constructor() {
        if (hasRequiredEs_regexp_constructor) return es_regexp_constructor;
        hasRequiredEs_regexp_constructor = 1;
        var DESCRIPTORS = requireDescriptors();
        var globalThis = requireGlobalThis();
        var uncurryThis = requireFunctionUncurryThis();
        var isForced = requireIsForced();
        var inheritIfRequired = requireInheritIfRequired();
        var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
        var create = requireObjectCreate();
        var getOwnPropertyNames = requireObjectGetOwnPropertyNames().f;
        var isPrototypeOf = requireObjectIsPrototypeOf();
        var isRegExp = requireIsRegexp();
        var toString = requireToString();
        var getRegExpFlags = requireRegexpGetFlags();
        var stickyHelpers = requireRegexpStickyHelpers();
        var proxyAccessor = requireProxyAccessor();
        var defineBuiltIn = requireDefineBuiltIn();
        var fails = requireFails();
        var hasOwn = requireHasOwnProperty();
        var enforceInternalState = requireInternalState().enforce;
        var setSpecies = requireSetSpecies();
        var wellKnownSymbol = requireWellKnownSymbol();
        var UNSUPPORTED_DOT_ALL = requireRegexpUnsupportedDotAll();
        var UNSUPPORTED_NCG = requireRegexpUnsupportedNcg();
        var MATCH = wellKnownSymbol("match");
        var NativeRegExp = globalThis.RegExp;
        var RegExpPrototype = NativeRegExp.prototype;
        var SyntaxError = globalThis.SyntaxError;
        var exec = uncurryThis(RegExpPrototype.exec);
        var charAt = uncurryThis("".charAt);
        var replace = uncurryThis("".replace);
        var stringIndexOf = uncurryThis("".indexOf);
        var stringSlice = uncurryThis("".slice);
        var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
        var re1 = /a/g;
        var re2 = /a/g;
        var CORRECT_NEW = new NativeRegExp(re1) !== re1;
        var MISSED_STICKY = stickyHelpers.MISSED_STICKY;
        var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
        var BASE_FORCED = DESCRIPTORS && (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function() {
            re2[MATCH] = false;
            return NativeRegExp(re1) !== re1 || NativeRegExp(re2) === re2 || String(NativeRegExp(re1, "i")) !== "/a/i";
        }));
        var handleDotAll = function(string) {
            var length = string.length;
            var index = 0;
            var result = "";
            var brackets = false;
            var chr;
            for (;index <= length; index++) {
                chr = charAt(string, index);
                if (chr === "\\") {
                    result += chr + charAt(string, ++index);
                    continue;
                }
                if (!brackets && chr === ".") {
                    result += "[\\s\\S]";
                } else {
                    if (chr === "[") {
                        brackets = true;
                    } else if (chr === "]") {
                        brackets = false;
                    }
                    result += chr;
                }
            }
            return result;
        };
        var handleNCG = function(string) {
            var length = string.length;
            var index = 0;
            var result = "";
            var named = [];
            var names = create(null);
            var brackets = false;
            var ncg = false;
            var groupid = 0;
            var groupname = "";
            var chr;
            for (;index <= length; index++) {
                chr = charAt(string, index);
                if (chr === "\\") {
                    chr += charAt(string, ++index);
                } else if (chr === "]") {
                    brackets = false;
                } else if (!brackets) switch (true) {
                  case chr === "[":
                    brackets = true;
                    break;

                  case chr === "(":
                    result += chr;
                    if (stringSlice(string, index + 1, index + 3) === "?:") {
                        continue;
                    }
                    if (exec(IS_NCG, stringSlice(string, index + 1))) {
                        index += 2;
                        ncg = true;
                    }
                    groupid++;
                    continue;

                  case chr === ">" && ncg:
                    if (groupname === "" || hasOwn(names, groupname)) {
                        throw new SyntaxError("Invalid capture group name");
                    }
                    names[groupname] = true;
                    named[named.length] = [ groupname, groupid ];
                    ncg = false;
                    groupname = "";
                    continue;
                }
                if (ncg) groupname += chr; else result += chr;
            }
            return [ result, named ];
        };
        if (isForced("RegExp", BASE_FORCED)) {
            var RegExpWrapper = function RegExp(pattern, flags) {
                var thisIsRegExp = isPrototypeOf(RegExpPrototype, this);
                var patternIsRegExp = isRegExp(pattern);
                var flagsAreUndefined = flags === undefined;
                var groups = [];
                var rawPattern = pattern;
                var rawFlags, dotAll, sticky, handled, result, state;
                if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
                    return pattern;
                }
                if (patternIsRegExp || isPrototypeOf(RegExpPrototype, pattern)) {
                    pattern = pattern.source;
                    if (flagsAreUndefined) flags = getRegExpFlags(rawPattern);
                }
                pattern = pattern === undefined ? "" : toString(pattern);
                flags = flags === undefined ? "" : toString(flags);
                rawPattern = pattern;
                if (UNSUPPORTED_DOT_ALL && "dotAll" in re1) {
                    dotAll = !!flags && stringIndexOf(flags, "s") > -1;
                    if (dotAll) flags = replace(flags, /s/g, "");
                }
                rawFlags = flags;
                if (MISSED_STICKY && "sticky" in re1) {
                    sticky = !!flags && stringIndexOf(flags, "y") > -1;
                    if (sticky && UNSUPPORTED_Y) flags = replace(flags, /y/g, "");
                }
                if (UNSUPPORTED_NCG) {
                    handled = handleNCG(pattern);
                    pattern = handled[0];
                    groups = handled[1];
                }
                result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);
                if (dotAll || sticky || groups.length) {
                    state = enforceInternalState(result);
                    if (dotAll) {
                        state.dotAll = true;
                        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
                    }
                    if (sticky) state.sticky = true;
                    if (groups.length) state.groups = groups;
                }
                if (pattern !== rawPattern) try {
                    createNonEnumerableProperty(result, "source", rawPattern === "" ? "(?:)" : rawPattern);
                } catch (error) {}
                return result;
            };
            for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index; ) {
                proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++]);
            }
            RegExpPrototype.constructor = RegExpWrapper;
            RegExpWrapper.prototype = RegExpPrototype;
            defineBuiltIn(globalThis, "RegExp", RegExpWrapper, {
                constructor: true
            });
        }
        setSpecies("RegExp");
        return es_regexp_constructor;
    }
    requireEs_regexp_constructor();
    var es_regexp_toString = {};
    var hasRequiredEs_regexp_toString;
    function requireEs_regexp_toString() {
        if (hasRequiredEs_regexp_toString) return es_regexp_toString;
        hasRequiredEs_regexp_toString = 1;
        var PROPER_FUNCTION_NAME = requireFunctionName().PROPER;
        var defineBuiltIn = requireDefineBuiltIn();
        var anObject = requireAnObject();
        var $toString = requireToString();
        var fails = requireFails();
        var getRegExpFlags = requireRegexpGetFlags();
        var TO_STRING = "toString";
        var RegExpPrototype = RegExp.prototype;
        var nativeToString = RegExpPrototype[TO_STRING];
        var NOT_GENERIC = fails(function() {
            return nativeToString.call({
                source: "a",
                flags: "b"
            }) !== "/a/b";
        });
        var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name !== TO_STRING;
        if (NOT_GENERIC || INCORRECT_NAME) {
            defineBuiltIn(RegExpPrototype, TO_STRING, function toString() {
                var R = anObject(this);
                var pattern = $toString(R.source);
                var flags = $toString(getRegExpFlags(R));
                return "/" + pattern + "/" + flags;
            }, {
                unsafe: true
            });
        }
        return es_regexp_toString;
    }
    requireEs_regexp_toString();
    var es_set = {};
    var es_set_constructor = {};
    var hasRequiredEs_set_constructor;
    function requireEs_set_constructor() {
        if (hasRequiredEs_set_constructor) return es_set_constructor;
        hasRequiredEs_set_constructor = 1;
        var collection = requireCollection();
        var collectionStrong = requireCollectionStrong();
        collection("Set", function(init) {
            return function Set() {
                return init(this, arguments.length ? arguments[0] : undefined);
            };
        }, collectionStrong);
        return es_set_constructor;
    }
    var hasRequiredEs_set;
    function requireEs_set() {
        if (hasRequiredEs_set) return es_set;
        hasRequiredEs_set = 1;
        requireEs_set_constructor();
        return es_set;
    }
    requireEs_set();
    function Button(button, options) {
        var self = this;
        if (typeof button === "string") {
            var temp = document.getElementById(button);
            if (temp instanceof HTMLButtonElement) {
                button = temp;
            }
        }
        if (button instanceof HTMLButtonElement) {
            this.button = button;
        } else {
            throw new Error("Invalid button");
        }
        this._container = document.createElement("div");
        this._options = options || {};
        this._options.text = this._options.text || button.textContent.trim();
        this._options.type = this._options.type || "button";
        this._options.variant = this._options.variant || "primary";
        this._options.size = this._options.size || "medium";
        this._options.iconPosition = this._options.iconPosition || "left";
        this.isLoading = false;
        this._originalText = this._options.text;
        this._subscribers = [];
        this._boundHandles = {
            click: function click(e) {
                self._handleClick(e);
            },
            mouseenter: function mouseenter() {
                self._handleMouseEnter();
            },
            mouseleave: function mouseleave() {
                self._handleMouseLeave();
            },
            focus: function focus() {
                self._handleFocus();
            },
            blur: function blur() {
                self._handleBlur();
            },
            keydown: function keydown(e) {
                self._handleKeydown(e);
            }
        };
        this._createDOM();
        this._bindEvents();
        this.updateState();
    }
    Button.prototype._createDOM = function() {
        var parent = this.button.parentNode;
        var fragment = document.createDocumentFragment();
        fragment.appendChild(this._container);
        this._container.className += " custom-button-container";
        this.button.className += " custom-button";
        this.button.className += " custom-button-" + this._options.variant;
        this.button.className += " custom-button-" + this._options.size;
        if (this._options.disabled) {
            this.button.className += " custom-button-disabled";
        }
        if (this._options.loading) {
            this._container.className += " custom-button-loading";
        }
        if (this._options.type) {
            this.button.type = this._options.type;
        }
        if (this._options.tooltip) {
            this.button.title = this._options.tooltip;
        }
        if (this._options.disabled) {
            this.button.disabled = true;
        }
        if (this._options.text) {
            this.button.textContent = "";
            this.buttonText = document.createElement("span");
            this.buttonText.className = "custom-button-text";
            this.buttonText.textContent = this._options.text || "";
            if (this._options.icon) {
                var iconSpan = document.createElement("span");
                iconSpan.className = "custom-button-icon";
                if (this._options.iconPosition === "left") {
                    iconSpan.className += " custom-button-icon-left";
                    this.button.appendChild(iconSpan);
                    this.button.appendChild(this.buttonText);
                } else {
                    iconSpan.className += " custom-button-icon-right";
                    this.button.appendChild(this.buttonText);
                    this.button.appendChild(iconSpan);
                }
                iconSpan.innerHTML = this._options.icon;
            } else {
                this.button.appendChild(this.buttonText);
            }
        }
        if (this._options.loading) {
            this.spinner = document.createElement("span");
            this.spinner.className = "custom-button-spinner";
            this.button.appendChild(this.spinner);
        }
        if (this._options.badge) {
            this.badgeElement = document.createElement("span");
            this.badgeElement.className = "custom-button-badge";
            this.badgeElement.textContent = this._options.badge;
            this.button.appendChild(this.badgeElement);
        }
        if (parent) {
            parent.insertBefore(fragment, this.button);
        }
        this._container.appendChild(this.button);
    };
    Button.prototype._bindEvents = function() {
        this.button.addEventListener("click", this._boundHandles.click);
        this.button.addEventListener("mouseenter", this._boundHandles.mouseenter);
        this.button.addEventListener("mouseleave", this._boundHandles.mouseleave);
        this.button.addEventListener("focus", this._boundHandles.focus);
        this.button.addEventListener("blur", this._boundHandles.blur);
        this.button.addEventListener("keydown", this._boundHandles.keydown);
    };
    Button.prototype._handleClick = function(e) {
        if (this._options.disabled || this.isLoading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.triggerClickEvent(e);
    };
    Button.prototype._handleMouseEnter = function() {
        var classes = this.button.className.split(" ");
        if (classes.indexOf("custom-button-hover") === -1) {
            this.button.className += " custom-button-hover";
        }
        this.triggerEvent("mouseenter");
    };
    Button.prototype._handleMouseLeave = function() {
        this.button.className = this.button.className.split(" ").filter(function(cls) {
            return cls !== "custom-button-hover";
        }).join(" ");
        this.triggerEvent("mouseleave");
    };
    Button.prototype._handleFocus = function() {
        var classes = this.button.className.split(" ");
        if (classes.indexOf("custom-button-focused") === -1) {
            this.button.className += " custom-button-focused";
        }
        this.triggerEvent("focus");
    };
    Button.prototype._handleBlur = function() {
        this.button.className = this.button.className.split(" ").filter(function(cls) {
            return cls !== "custom-button-focused";
        }).join(" ");
        this.triggerEvent("blur");
    };
    Button.prototype._handleKeydown = function(e) {
        var key = e.key || e.keyCode;
        if (key === " " || key === "Enter" || key === 32 || key === 13) {
            if (this.button.tagName === "BUTTON") ; else {
                e.preventDefault();
                this.button.click();
            }
        } else if (key === "Escape" || key === 27) {
            this.button.blur();
        }
        this.triggerEvent("keydown", {
            key: key
        });
    };
    Button.prototype.subscribe = function(callback) {
        var self = this;
        this._subscribers.push(callback);
        return {
            unsubscribe: function unsubscribe() {
                self._subscribers = self._subscribers.filter(function(cb) {
                    return cb !== callback;
                });
            }
        };
    };
    Button.prototype.setText = function(text) {
        if (typeof text === "undefined") return;
        this._options.text = text;
        if (!this.buttonText) {
            this.buttonText = document.createElement("span");
            this.buttonText.className = "custom-button-text";
            this.buttonText.textContent = "";
            this.button.appendChild(this.buttonText);
        }
        this.buttonText.textContent = text;
    };
    Button.prototype.setIcon = function(icon, position) {
        this._options.icon = icon;
        this._options.iconPosition = position || "left";
    };
    Button.prototype.setBadge = function(badge) {
        if (typeof badge === "undefined") return;
        this._options.badge = badge;
        if (this.badgeElement) {
            this.badgeElement.textContent = badge;
            this.badgeElement.style.display = badge ? "flex" : "none";
        }
    };
    Button.prototype.setVariant = function(variant) {
        if (typeof variant === "undefined") return;
        var oldClass = "custom-button-" + this._options.variant;
        var newClass = "custom-button-" + variant;
        this.button.className = this.button.className.split(" ").filter(function(cls) {
            return cls !== oldClass;
        }).join(" ") + " " + newClass;
        this._options.variant = variant;
    };
    Button.prototype.setSize = function(size) {
        if (typeof size === "undefined") return;
        var oldClass = "custom-button-" + this._options.size;
        var newClass = "custom-button-" + size;
        this.button.className = this.button.className.split(" ").filter(function(cls) {
            return cls !== oldClass;
        }).join(" ") + " " + newClass;
        this._options.size = size;
    };
    Button.prototype.enable = function() {
        this._options.disabled = false;
        this.button.disabled = false;
        this.button.className = this.button.className.split(" ").filter(function(cls) {
            return cls !== "custom-button-disabled";
        }).join(" ");
    };
    Button.prototype.disable = function() {
        this._options.disabled = true;
        this.button.disabled = true;
        var classes = this.button.className.split(" ");
        if (classes.indexOf("custom-button-disabled") === -1) {
            this.button.className += " custom-button-disabled";
        }
    };
    Button.prototype.startLoading = function() {
        this.isLoading = true;
        if (typeof this._options.text !== "undefined") this._originalText = this._options.text;
        var containerClasses = this._container.className.split(" ");
        if (containerClasses.indexOf("custom-button-loading") === -1) {
            this._container.className += " custom-button-loading";
        }
        if (this.spinner) {
            this.spinner.style.display = "inline-block";
        }
        if (this.buttonText) {
            this.buttonText.textContent = "Loading...";
        }
        this.button.disabled = true;
    };
    Button.prototype.stopLoading = function() {
        this.isLoading = false;
        this._container.className = this._container.className.split(" ").filter(function(cls) {
            return cls !== "custom-button-loading";
        }).join(" ");
        if (this.spinner) {
            this.spinner.style.display = "none";
        }
        if (this.buttonText) {
            this.buttonText.textContent = this._originalText;
        }
        this.button.disabled = !!this._options.disabled;
    };
    Button.prototype.setTooltip = function(tooltip) {
        if (typeof tooltip === "undefined") return;
        this._options.tooltip = tooltip;
        this.button.title = tooltip || "";
    };
    Button.prototype.triggerClickEvent = function(e) {
        var detail = {
            originalEvent: e,
            button: this
        };
        this._subscribers.forEach(function(cb) {
            cb({
                type: "button:click",
                detail: detail
            });
        });
    };
    Button.prototype.triggerEvent = function(eventName, detail) {
        detail = detail || {};
        detail.button = this;
        this._subscribers.forEach(function(cb) {
            cb({
                type: "button:" + eventName,
                detail: detail
            });
        });
    };
    Button.prototype.updateState = function() {
        if (this._options.disabled) {
            this.disable();
        } else {
            this.enable();
        }
        if (this._options.loading) {
            this.startLoading();
        }
    };
    Button.prototype.destroy = function() {
        this._subscribers = [];
        if (this._boundHandles) {
            try {
                this.button.removeEventListener("click", this._boundHandles.click);
                this.button.removeEventListener("mouseenter", this._boundHandles.mouseenter);
                this.button.removeEventListener("mouseleave", this._boundHandles.mouseleave);
                this.button.removeEventListener("focus", this._boundHandles.focus);
                this.button.removeEventListener("blur", this._boundHandles.blur);
                this.button.removeEventListener("keydown", this._boundHandles.keydown);
            } catch (error) {
                console.error(error);
            }
        }
        this._container.innerHTML = "";
        var containerClasses = this._container.className.split(" ").filter(function(cls) {
            return cls !== "custom-button-container";
        }).join(" ");
        this._container.className = containerClasses;
    };
    var _container = new WeakMap;
    var _insertButton = new WeakMap;
    var _onSelectIconCallback = new WeakMap;
    var _listOfIconNames = new WeakMap;
    var _selectedIcons$1 = new WeakMap;
    var _IconPicker_brand = new WeakSet;
    var IconPicker = function() {
        function IconPicker(catalogOfIcons) {
            _classCallCheck(this, IconPicker);
            _classPrivateMethodInitSpec(this, _IconPicker_brand);
            _classPrivateFieldInitSpec(this, _container, void 0);
            _classPrivateFieldInitSpec(this, _insertButton, void 0);
            _classPrivateFieldInitSpec(this, _onSelectIconCallback, function(map, needToRun) {});
            _classPrivateFieldInitSpec(this, _listOfIconNames, void 0);
            _classPrivateFieldInitSpec(this, _selectedIcons$1, void 0);
            var container = document.getElementById("icons");
            if (container) {
                _classPrivateFieldSet2(_container, this, container);
            } else {
                throw new Error("Icons container not found");
            }
            _classPrivateFieldSet2(_insertButton, this, new Button("insertIcon", {
                disabled: true
            }));
            _classPrivateFieldSet2(_listOfIconNames, this, new Set);
            _classPrivateFieldSet2(_selectedIcons$1, this, new Map);
            _assertClassBrand(_IconPicker_brand, this, _addEventListener$1).call(this);
        }
        return _createClass(IconPicker, [ {
            key: "showFound",
            value: function showFound(foundIcons) {
                var _this = this;
                return new Promise(function(resolve) {
                    _assertClassBrand(_IconPicker_brand, _this, _unselectAll).call(_this, true);
                    _assertClassBrand(_IconPicker_brand, _this, _hideAll).call(_this);
                    var displayedIcons = 0;
                    setTimeout(function() {
                        foundIcons.forEach(function(categoryInfo) {
                            categoryInfo.folders.forEach(function(folderName, index) {
                                var icons = categoryInfo.icons[index];
                                icons.forEach(function(iconName) {
                                    var iconElement = _classPrivateFieldGet2(_container, _this).querySelector('.icon[data-name="'.concat(iconName, '"][data-section="').concat(folderName, '"]'));
                                    if (iconElement) {
                                        var currentClass = iconElement.getAttribute("class") || "";
                                        currentClass = currentClass.replace(new RegExp("\\b" + "hidden" + "\\b", "g"), "").trim();
                                        iconElement.setAttribute("class", currentClass);
                                        displayedIcons++;
                                    }
                                });
                            });
                        });
                        _assertClassBrand(_IconPicker_brand, _this, _onChange).call(_this);
                        var noIconsElement = document.getElementById("noIcons");
                        if (noIconsElement) {
                            if (displayedIcons === 0) {
                                noIconsElement.style.display = "block";
                            } else {
                                noIconsElement.style.display = "none";
                            }
                        }
                        resolve(true);
                    }, 0);
                });
            }
        }, {
            key: "showCategory",
            value: function showCategory() {
                var _this2 = this;
                var categoryId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
                return new Promise(function(resolve) {
                    _assertClassBrand(_IconPicker_brand, _this2, _unselectAll).call(_this2, true);
                    setTimeout(function() {
                        var icons = _classPrivateFieldGet2(_container, _this2).getElementsByClassName("icon");
                        for (var i = 0; i < icons.length; i++) {
                            var icon = icons[i];
                            var category = icon.getAttribute("data-category");
                            var currentClass = icon.getAttribute("class") || "";
                            if (categoryId === "" || category === categoryId) {
                                currentClass = currentClass.replace(new RegExp("\\b" + "hidden" + "\\b", "g"), "").trim();
                                icon.setAttribute("class", currentClass);
                            } else {
                                if (currentClass.indexOf("hidden") === -1) {
                                    icon.setAttribute("class", currentClass + (currentClass ? " " : "") + "hidden");
                                }
                            }
                        }
                        _assertClassBrand(_IconPicker_brand, _this2, _onChange).call(_this2);
                        resolve(true);
                    }, 0);
                });
            }
        }, {
            key: "setOnSelectIconCallback",
            value: function setOnSelectIconCallback(callback) {
                _classPrivateFieldSet2(_onSelectIconCallback, this, callback);
            }
        }, {
            key: "getSelectedSvgIcons",
            value: function getSelectedSvgIcons() {
                var icons = _classPrivateFieldGet2(_container, this).querySelectorAll(".icon.selected");
                var serializer = new XMLSerializer;
                return Array.from(icons).map(function(svg) {
                    return serializer.serializeToString(svg);
                });
            }
        } ]);
    }();
    function _addEventListener$1() {
        var _this3 = this;
        _classPrivateFieldGet2(_container, this).addEventListener("click", function(e) {
            var icon;
            var target = e.target;
            if (!target || target instanceof HTMLElement === false && target instanceof SVGElement === false) {
                return;
            }
            var currentClass = target.getAttribute("class") || "";
            if (currentClass.indexOf("icon") !== -1) {
                icon = target;
            }
            if (!icon) {
                console.warn("icon not found");
                return;
            }
            var isModifierPressed = e.ctrlKey || e.metaKey;
            var iconId = icon.getAttribute("data-name");
            var section = icon.getAttribute("data-section");
            if (!iconId || !section) {
                return;
            }
            if (!isModifierPressed) {
                _assertClassBrand(_IconPicker_brand, _this3, _unselectAll).call(_this3, true);
            }
            if (_classPrivateFieldGet2(_selectedIcons$1, _this3).has(iconId)) {
                _assertClassBrand(_IconPicker_brand, _this3, _setSelectedToIcon).call(_this3, icon, false);
                _classPrivateFieldGet2(_selectedIcons$1, _this3).delete(iconId);
            } else {
                _assertClassBrand(_IconPicker_brand, _this3, _setSelectedToIcon).call(_this3, icon, true);
                _classPrivateFieldGet2(_selectedIcons$1, _this3).set(iconId, section);
            }
            icon.setAttribute("tabindex", "0");
            _assertClassBrand(_IconPicker_brand, _this3, _onChange).call(_this3);
        });
        _classPrivateFieldGet2(_container, this).addEventListener("dblclick", function(e) {
            var icon;
            var target = e.target;
            if (!target || target instanceof HTMLElement === false && target instanceof SVGElement === false) {
                return;
            }
            var currentClass = target.getAttribute("class") || "";
            if (currentClass.indexOf("icon") !== -1) {
                icon = target;
            }
            if (!icon) {
                console.log("icon not found");
                return;
            }
            var iconId = icon.getAttribute("data-name");
            var section = icon.getAttribute("data-section");
            _assertClassBrand(_IconPicker_brand, _this3, _setSelectedToIcon).call(_this3, icon, true);
            _classPrivateFieldGet2(_selectedIcons$1, _this3).set(iconId, section);
            var needToRun = true;
            _classPrivateFieldGet2(_onSelectIconCallback, _this3).call(_this3, _classPrivateFieldGet2(_selectedIcons$1, _this3), needToRun);
        });
        _classPrivateFieldGet2(_container, this).addEventListener("keydown", function(e) {
            if ((e.ctrlKey || e.metaKey) && e.code === "KeyA") {
                e.preventDefault();
                _assertClassBrand(_IconPicker_brand, _this3, _selectAll).call(_this3);
            }
            if (e.code === "Escape") {
                e.preventDefault();
                _assertClassBrand(_IconPicker_brand, _this3, _unselectAll).call(_this3);
            }
            if (e.code === "Space") {
                var focusedIcon = _classPrivateFieldGet2(_container, _this3).querySelector(".icon:focus");
                if (focusedIcon) {
                    e.preventDefault();
                    _assertClassBrand(_IconPicker_brand, _this3, _unselectAll).call(_this3);
                    var iconId = focusedIcon.getAttribute("data-name");
                    var section = focusedIcon.getAttribute("data-section");
                    _assertClassBrand(_IconPicker_brand, _this3, _setSelectedToIcon).call(_this3, focusedIcon, true);
                    _classPrivateFieldGet2(_selectedIcons$1, _this3).set(iconId, section);
                    _assertClassBrand(_IconPicker_brand, _this3, _onChange).call(_this3);
                }
            }
            if (e.code === "Enter") {
                e.preventDefault();
                if (_classPrivateFieldGet2(_selectedIcons$1, _this3).size === 0) {
                    return;
                }
                var needToRun = true;
                _classPrivateFieldGet2(_onSelectIconCallback, _this3).call(_this3, _classPrivateFieldGet2(_selectedIcons$1, _this3), needToRun);
            }
        });
        _classPrivateFieldGet2(_insertButton, this).subscribe(function(event) {
            if (event.type === "button:click") {
                var needToRun = true;
                _classPrivateFieldGet2(_onSelectIconCallback, _this3).call(_this3, _classPrivateFieldGet2(_selectedIcons$1, _this3), needToRun);
            }
        });
    }
    function _selectAll() {
        var _this4 = this;
        _classPrivateFieldGet2(_container, this).querySelectorAll(".icon:not(.selected)").forEach(function(icon) {
            var iconId = icon.getAttribute("data-name");
            var section = icon.getAttribute("data-section");
            _assertClassBrand(_IconPicker_brand, _this4, _setSelectedToIcon).call(_this4, icon, true);
            _classPrivateFieldGet2(_selectedIcons$1, _this4).set(iconId, section);
        });
        _assertClassBrand(_IconPicker_brand, this, _onChange).call(this);
    }
    function _unselectAll() {
        var _this5 = this;
        var silent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        _classPrivateFieldSet2(_selectedIcons$1, this, new Map);
        _classPrivateFieldGet2(_container, this).querySelectorAll(".icon.selected").forEach(function(icon) {
            _assertClassBrand(_IconPicker_brand, _this5, _setSelectedToIcon).call(_this5, icon, false);
        });
        if (silent) return;
        _assertClassBrand(_IconPicker_brand, this, _onChange).call(this);
    }
    function _hideAll() {
        _classPrivateFieldGet2(_container, this).querySelectorAll(".icon:not(.hidden)").forEach(function(icon) {
            var currentClass = icon.getAttribute("class") || "";
            icon.setAttribute("class", currentClass + (currentClass ? " " : "") + "hidden");
        });
    }
    function _onChange() {
        if (_classPrivateFieldGet2(_selectedIcons$1, this).size === 0) {
            _classPrivateFieldGet2(_insertButton, this).disable();
        } else {
            _classPrivateFieldGet2(_insertButton, this).enable();
        }
        _classPrivateFieldGet2(_onSelectIconCallback, this).call(this, _classPrivateFieldGet2(_selectedIcons$1, this));
    }
    function _setSelectedToIcon(icon, isSelected) {
        if (isSelected) {
            var currentClass = icon.getAttribute("class") || "";
            if (currentClass.indexOf("selected") === -1) {
                icon.setAttribute("class", currentClass + (currentClass ? " " : "") + "selected");
            }
        } else {
            var _currentClass = icon.getAttribute("class") || "";
            _currentClass = _currentClass.replace(new RegExp("\\b" + "selected" + "\\b", "g"), "").trim();
            icon.setAttribute("class", _currentClass);
        }
    }
    var es_object_assign = {};
    var objectAssign;
    var hasRequiredObjectAssign;
    function requireObjectAssign() {
        if (hasRequiredObjectAssign) return objectAssign;
        hasRequiredObjectAssign = 1;
        var DESCRIPTORS = requireDescriptors();
        var uncurryThis = requireFunctionUncurryThis();
        var call = requireFunctionCall();
        var fails = requireFails();
        var objectKeys = requireObjectKeys();
        var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
        var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
        var toObject = requireToObject();
        var IndexedObject = requireIndexedObject();
        var $assign = Object.assign;
        var defineProperty = Object.defineProperty;
        var concat = uncurryThis([].concat);
        objectAssign = !$assign || fails(function() {
            if (DESCRIPTORS && $assign({
                b: 1
            }, $assign(defineProperty({}, "a", {
                enumerable: true,
                get: function() {
                    defineProperty(this, "b", {
                        value: 3,
                        enumerable: false
                    });
                }
            }), {
                b: 2
            })).b !== 1) return true;
            var A = {};
            var B = {};
            var symbol = Symbol("assign detection");
            var alphabet = "abcdefghijklmnopqrst";
            A[symbol] = 7;
            alphabet.split("").forEach(function(chr) {
                B[chr] = chr;
            });
            return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join("") !== alphabet;
        }) ? function assign(target, source) {
            var T = toObject(target);
            var argumentsLength = arguments.length;
            var index = 1;
            var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
            var propertyIsEnumerable = propertyIsEnumerableModule.f;
            while (argumentsLength > index) {
                var S = IndexedObject(arguments[index++]);
                var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
                var length = keys.length;
                var j = 0;
                var key;
                while (length > j) {
                    key = keys[j++];
                    if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
                }
            }
            return T;
        } : $assign;
        return objectAssign;
    }
    var hasRequiredEs_object_assign;
    function requireEs_object_assign() {
        if (hasRequiredEs_object_assign) return es_object_assign;
        hasRequiredEs_object_assign = 1;
        var $ = require_export();
        var assign = requireObjectAssign();
        $({
            target: "Object",
            stat: true,
            arity: 2,
            forced: Object.assign !== assign
        }, {
            assign: assign
        });
        return es_object_assign;
    }
    requireEs_object_assign();
    var es_string_search = {};
    var sameValue;
    var hasRequiredSameValue;
    function requireSameValue() {
        if (hasRequiredSameValue) return sameValue;
        hasRequiredSameValue = 1;
        sameValue = Object.is || function is(x, y) {
            return x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y;
        };
        return sameValue;
    }
    var hasRequiredEs_string_search;
    function requireEs_string_search() {
        if (hasRequiredEs_string_search) return es_string_search;
        hasRequiredEs_string_search = 1;
        var call = requireFunctionCall();
        var fixRegExpWellKnownSymbolLogic = requireFixRegexpWellKnownSymbolLogic();
        var anObject = requireAnObject();
        var isObject = requireIsObject();
        var requireObjectCoercible = requireRequireObjectCoercible();
        var sameValue = requireSameValue();
        var toString = requireToString();
        var getMethod = requireGetMethod();
        var regExpExec = requireRegexpExecAbstract();
        fixRegExpWellKnownSymbolLogic("search", function(SEARCH, nativeSearch, maybeCallNative) {
            return [ function search(regexp) {
                var O = requireObjectCoercible(this);
                var searcher = isObject(regexp) ? getMethod(regexp, SEARCH) : undefined;
                return searcher ? call(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString(O));
            }, function(string) {
                var rx = anObject(this);
                var S = toString(string);
                var res = maybeCallNative(nativeSearch, rx, S);
                if (res.done) return res.value;
                var previousLastIndex = rx.lastIndex;
                if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
                var result = regExpExec(rx, S);
                if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
                return result === null ? -1 : result.index;
            } ];
        });
        return es_string_search;
    }
    requireEs_string_search();
    function SelectBox(container, options) {
        var self = this;
        if (typeof container === "string") {
            var temp = document.getElementById(container);
            if (temp instanceof HTMLElement) {
                container = temp;
            }
        }
        if (container instanceof HTMLElement) {
            this._container = container;
        } else {
            throw new Error("Invalid container");
        }
        this._options = Object.assign(options, {
            placeholder: options.placeholder || "Select...",
            searchable: options.searchable || false,
            multiple: options.multiple || false
        });
        this._selectedValues = new Set;
        this.isOpen = false;
        this._items = [];
        this._subscribers = [];
        this._boundHandles = {
            toggle: function toggle(e) {
                self._toggle(e);
            },
            search: function search(e) {
                self._handleSearch(e);
            },
            close: function close(e) {
                if (e.target instanceof HTMLElement && !self._container.contains(e.target) && !e.target.classList.contains("selectbox-option")) {
                    self._closeDropdown();
                }
            },
            keydown: function keydown(e) {
                self._handleKeydown(e);
            },
            dropdownClick: function dropdownClick(e) {
                self._handleDropdownClick(e);
            }
        };
        this._optionsContainer = null;
        this.searchInput = null;
        this._header = document.createElement("div");
        this._selectedText = document.createElement("span");
        this._arrow = document.createElement("span");
        this._dropdown = document.createElement("div");
        this._createDOM();
        this._bindEvents();
        this._renderOptions();
    }
    SelectBox.prototype._createDOM = function() {
        this._container.innerHTML = "";
        this._container.className += " selectbox-container";
        var fragment = document.createDocumentFragment();
        var selectBox = document.createElement("div");
        selectBox.className += " selectbox";
        fragment.appendChild(selectBox);
        this._header.className += " selectbox-header";
        selectBox.appendChild(this._header);
        this._header.setAttribute("tabindex", "0");
        this._selectedText.className += " selectbox-selected-text";
        this._selectedText.textContent = this._options.placeholder;
        this._header.appendChild(this._selectedText);
        this._arrow.className += " selectbox-arrow";
        this._arrow.innerHTML = '<svg width="6" height="6" viewBox="0 0 6 6" ' + 'fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path fill-rule="evenodd" clip-rule="evenodd"' + ' d="M3 0L0 2.9978L3 5.99561L6 2.9978L3 0ZM3 0.00053797L0.75 2.24889L3 4.49724L5.25 ' + '2.24889L3 0.00053797Z" fill="currentColor"/>' + "</svg>";
        this._header.appendChild(this._arrow);
        this._dropdown.className += " selectbox-dropdown";
        selectBox.appendChild(this._dropdown);
        if (this._options.searchable) {
            var search = document.createElement("div");
            search.className += " selectbox-search";
            this._dropdown.appendChild(search);
            this.searchInput = document.createElement("input");
            this.searchInput.className += " selectbox-search-input";
            this.searchInput.type = "text";
            this.searchInput.placeholder = "Search...";
            search.appendChild(this.searchInput);
        }
        this._optionsContainer = document.createElement("div");
        this._optionsContainer.className += " selectbox-options";
        this._dropdown.appendChild(this._optionsContainer);
        this._container.appendChild(fragment);
    };
    SelectBox.prototype._bindEvents = function() {
        this._header.addEventListener("click", this._boundHandles.toggle);
        if (this.searchInput) {
            this.searchInput.addEventListener("input", this._boundHandles.search);
        }
        this._dropdown.addEventListener("click", this._boundHandles.dropdownClick);
        this._header.addEventListener("keydown", this._boundHandles.keydown);
        this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
    };
    SelectBox.prototype._toggle = function(e) {
        e && e.stopPropagation();
        this.isOpen ? this._closeDropdown() : this.openDropdown();
    };
    SelectBox.prototype.openDropdown = function() {
        if (!this.isOpen) {
            document.addEventListener("click", this._boundHandles.close);
        }
        this.isOpen = true;
        this._dropdown.style.display = "block";
        this._arrow.className += " selectbox-arrow-open";
        this._header.className += " selectbox-header-open";
        if (this.searchInput) {
            setTimeout(function(self) {
                return function() {
                    if (self.searchInput) {
                        self.searchInput.focus();
                    }
                };
            }(this), 100);
        }
        this._renderOptions();
    };
    SelectBox.prototype._closeDropdown = function() {
        if (this.isOpen && document && this._boundHandles) {
            document.removeEventListener("click", this._boundHandles.close);
        }
        this.isOpen = false;
        this._dropdown.style.display = "none";
        var arrowClasses = this._arrow.className.split(" ");
        var newArrowClasses = [];
        for (var i = 0; i < arrowClasses.length; i++) {
            if (arrowClasses[i] !== "selectbox-arrow-open") {
                newArrowClasses.push(arrowClasses[i]);
            }
        }
        this._arrow.className = newArrowClasses.join(" ");
        var headerClasses = this._header.className.split(" ");
        var newHeaderClasses = [];
        for (var i = 0; i < headerClasses.length; i++) {
            if (headerClasses[i] !== "selectbox-header-open") {
                newHeaderClasses.push(headerClasses[i]);
            }
        }
        this._header.className = newHeaderClasses.join(" ");
        if (this.searchInput) {
            this.searchInput.value = "";
        }
    };
    SelectBox.prototype._handleSearch = function(e) {
        var target = e.target;
        if (!(target instanceof HTMLInputElement)) {
            return;
        }
        var searchTerm = target.value.toLowerCase();
        this._renderOptions(searchTerm);
    };
    SelectBox.prototype._handleKeydown = function(e) {
        var key = e.key || e.keyCode;
        var items = this._items.filter(function(item) {
            return item !== null;
        });
        var newItem;
        switch (key) {
          case " ":
          case "Enter":
          case 32:
          case 13:
            e.preventDefault();
            this._toggle(e);
            break;

          case "Escape":
          case 27:
            this._closeDropdown();
            break;

          case "ArrowDown":
          case 40:
            e.preventDefault();
            if (this._selectedValues.size === 0 && items.length > 0) {
                newItem = items[0];
                this._selectedValues.add(newItem.value);
            } else {
                var selectedArray = Array.from(this._selectedValues);
                var currentIndex = -1;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].value === selectedArray[0]) {
                        currentIndex = i;
                        break;
                    }
                }
                var nextIndex = (currentIndex + 1) % items.length;
                this._selectedValues.clear();
                newItem = items[nextIndex];
                this._selectedValues.add(newItem.value);
            }
            this._updateSelectedText();
            this._renderOptions(this.searchInput ? this.searchInput.value : "");
            this._triggerChange(newItem.value, true);
            break;

          case "ArrowUp":
          case 38:
            e.preventDefault();
            if (this._selectedValues.size === 0 && items.length > 0) {
                newItem = items[items.length - 1];
                this._selectedValues.add(newItem.value);
            } else {
                var selectedArray = Array.from(this._selectedValues);
                var currentIndex = -1;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].value === selectedArray[0]) {
                        currentIndex = i;
                        break;
                    }
                }
                var prevIndex = (currentIndex - 1 + items.length) % items.length;
                this._selectedValues.clear();
                newItem = items[prevIndex];
                this._selectedValues.add(newItem.value);
            }
            this._updateSelectedText();
            this._renderOptions(this.searchInput ? this.searchInput.value : "");
            this._triggerChange(newItem.value, true);
            break;

          case "Tab":
          case 9:
            this._closeDropdown();
            break;
        }
    };
    SelectBox.prototype._renderOptions = function(searchTerm) {
        searchTerm = searchTerm || "";
        if (!this._optionsContainer) return;
        this._optionsContainer.innerHTML = "";
        var selectedOption = null;
        var filteredItems = this._items;
        if (searchTerm) {
            filteredItems = filteredItems.filter(function(item) {
                return item !== null && item.text.toLowerCase().indexOf(searchTerm) !== -1;
            });
        }
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < filteredItems.length; i++) {
            var item = filteredItems[i];
            if (!item) {
                var hr = document.createElement("hr");
                hr.className += " selectbox-option-divider";
                fragment.appendChild(hr);
                continue;
            }
            var option = document.createElement("div");
            option.className += " selectbox-option";
            if (this._selectedValues.has(item.value)) {
                option.className += " selectbox-option-selected";
                selectedOption = option;
            }
            option.setAttribute("data-value", item.value);
            if (this._options.multiple) {
                var input = document.createElement("input");
                input.type = "checkbox";
                input.className += " selectbox-checkbox";
                input.checked = this._selectedValues.has(item.value);
                option.appendChild(input);
            }
            var span = document.createElement("span");
            span.className += " selectbox-option-text";
            span.textContent = item.text;
            option.appendChild(span);
            fragment.appendChild(option);
        }
        this._optionsContainer.appendChild(fragment);
        if (this.isOpen && this._optionsContainer && selectedOption) {
            try {
                if (selectedOption.scrollIntoView) {
                    selectedOption.scrollIntoView({
                        block: "nearest"
                    });
                }
            } catch (err) {
                console.error(err);
            }
        }
    };
    SelectBox.prototype._handleDropdownClick = function(e) {
        var target = e.target || e.srcElement;
        var option = null;
        if (target && target instanceof HTMLElement) {
            var temp = null;
            var classList = target.className.split(" ");
            var hasOptionClass = false;
            for (var i = 0; i < classList.length; i++) {
                if (classList[i] === "selectbox-option") {
                    hasOptionClass = true;
                    break;
                }
            }
            if (hasOptionClass) {
                temp = target;
            } else if (target.parentNode && target.parentNode instanceof HTMLElement) {
                var parentClassList = target.parentNode.className.split(" ");
                var parentHasOptionClass = false;
                for (var i = 0; i < parentClassList.length; i++) {
                    if (parentClassList[i] === "selectbox-option") {
                        parentHasOptionClass = true;
                        break;
                    }
                }
                if (parentHasOptionClass) {
                    temp = target.parentNode;
                }
            }
            if (temp instanceof HTMLDivElement) {
                option = temp;
            } else {
                return;
            }
        } else {
            return;
        }
        var value = option.getAttribute("data-value");
        if (value === null) return;
        var enabled = true;
        if (this._options.multiple) {
            if (this._selectedValues.has(value)) {
                this.unselectItems(value, true);
                enabled = false;
            } else {
                this.selectItems(value, true);
            }
        } else {
            this.selectItems(value, true);
            this._closeDropdown();
        }
        this._updateSelectedText();
        this._triggerChange(value, enabled);
    };
    SelectBox.prototype._updateSelectedText = function() {
        if (this._selectedValues.size === 0) {
            this._selectedText.textContent = this._options.placeholder;
            return;
        }
        if (this._options.multiple) {
            var selectedItems = [];
            for (var i = 0; i < this._items.length; i++) {
                var item = this._items[i];
                if (item && this._selectedValues.has(item.value)) {
                    selectedItems.push(item);
                }
            }
            if (selectedItems.length === 0) {
                this._selectedText.textContent = this._options.placeholder;
            } else if (selectedItems.length === 1) {
                this._selectedText.textContent = selectedItems[0].text;
            } else {
                this._selectedText.textContent = selectedItems.length + " items selected";
            }
        } else {
            var selectedItem = null;
            for (var i = 0; i < this._items.length; i++) {
                var item = this._items[i];
                if (item && this._selectedValues.has(item.value)) {
                    selectedItem = item;
                    break;
                }
            }
            this._selectedText.textContent = selectedItem ? selectedItem.text : this._options.placeholder;
        }
    };
    SelectBox.prototype._triggerChange = function(currentValue, enabled) {
        var values = Array.from(this._selectedValues);
        var items = [];
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            if (item && this._selectedValues.has(item.value)) {
                items.push(item);
            }
        }
        var detail = {
            values: values,
            items: items,
            current: currentValue,
            enabled: enabled
        };
        this._subscribers.forEach(function(cb) {
            cb({
                type: "selectbox:change",
                detail: detail
            });
        });
    };
    SelectBox.prototype.subscribe = function(callback) {
        var self = this;
        this._subscribers.push(callback);
        return {
            unsubscribe: function unsubscribe() {
                self._subscribers = self._subscribers.filter(function(cb) {
                    return cb !== callback;
                });
            }
        };
    };
    SelectBox.prototype.addItem = function(value, text, selected) {
        selected = selected || false;
        this._items.push({
            value: value,
            text: text,
            selected: selected
        });
        if (selected) {
            if (this._options.multiple) {
                this._selectedValues.add(value);
            } else {
                this._selectedValues.clear();
                this._selectedValues.add(value);
            }
        }
        this._updateSelectedText();
    };
    SelectBox.prototype.addItems = function(values, selectedValue) {
        var self = this;
        values.forEach(function(pair, index) {
            var isSelected = selectedValue ? pair[0] === selectedValue : index === 0;
            if (isSelected) {
                if (self._options.multiple) {
                    self._selectedValues.add(pair[0]);
                } else {
                    self._selectedValues.clear();
                    self._selectedValues.add(pair[0]);
                }
            }
            self._items.push({
                value: pair[0],
                text: pair[1],
                selected: isSelected
            });
        }, this);
        this._updateSelectedText();
    };
    SelectBox.prototype.addSeparator = function() {
        this._items.push(null);
    };
    SelectBox.prototype.removeItem = function(value) {
        this._items = this._items.filter(function(item) {
            if (item === null || item.value !== value) {
                return true;
            }
            return false;
        });
        this._selectedValues.delete(value);
        this._updateSelectedText();
    };
    SelectBox.prototype.getSelectedValue = function() {
        if (this._options.multiple) {
            console.error("Method getSelectedValue is only available for single-select boxes.");
            return null;
        } else {
            var values = Array.from(this._selectedValues);
            return values.length > 0 ? values[0] : null;
        }
    };
    SelectBox.prototype.getSelectedValues = function() {
        if (this._options.multiple) {
            return Array.from(this._selectedValues);
        } else {
            var values = Array.from(this._selectedValues);
            return values.length > 0 ? values[0] : null;
        }
    };
    SelectBox.prototype.setSelectedValues = function(value) {
        if (this._options.multiple && Array.isArray(value)) {
            this._selectedValues = new Set(value);
        } else {
            this._selectedValues = new Set([ value ]);
        }
        this._updateSelectedText();
        this._renderOptions();
    };
    SelectBox.prototype.selectItems = function(values, bSilent) {
        var self = this;
        if (!this._options.multiple && Array.isArray(values)) {
            console.error("Method selectItem is only available for multi-select boxes.");
            return;
        }
        var value = "";
        if (this._options.multiple) {
            var checkMultiOption = function checkMultiOption(value) {
                if (self._optionsContainer) {
                    var option = self._optionsContainer.querySelector('[data-value="' + value + '"]');
                    if (option) {
                        var checkbox = option.querySelector('input[type="checkbox"]');
                        if (checkbox && checkbox instanceof HTMLInputElement) {
                            checkbox.checked = true;
                        }
                        option.classList.add("selectbox-option-selected");
                    }
                }
            };
            if (Array.isArray(values)) {
                for (var i = 0; i < values.length; i++) {
                    value = values[i];
                    if (!this._selectedValues.has(value)) {
                        this._selectedValues.add(value);
                        checkMultiOption(value);
                    }
                }
            } else {
                value = values;
                if (!this._selectedValues.has(value)) {
                    this._selectedValues.add(value);
                    checkMultiOption(value);
                }
            }
        } else if (!Array.isArray(values)) {
            value = values;
            this._selectedValues.clear();
            this._selectedValues.add(value);
            if (this._optionsContainer) {
                var selectedOptions = this._optionsContainer.querySelectorAll('.selectbox-option-selected[data-value="' + value + '"]');
                selectedOptions.forEach(function(option) {
                    option.classList.remove("selectbox-option-selected");
                });
                var option = this._optionsContainer.querySelector('[data-value="' + value + '"]');
                if (option) {
                    option.classList.add("selectbox-option-selected");
                }
            }
            this._closeDropdown();
        }
        this._updateSelectedText();
        if (bSilent) {
            return;
        }
        this._triggerChange(value, true);
    };
    SelectBox.prototype.unselectItems = function(values, bSilent) {
        var self = this;
        if (!this._options.multiple) {
            console.error("Method unselectItem is only available for multi-select boxes.");
            return;
        }
        var value = "";
        var uncheckMultiOption = function uncheckMultiOption(value) {
            if (self._optionsContainer) {
                var option = self._optionsContainer.querySelector('[data-value="' + value + '"]');
                if (option) {
                    var checkbox = option.querySelector('input[type="checkbox"]');
                    if (checkbox && checkbox instanceof HTMLInputElement) {
                        checkbox.checked = false;
                    }
                    option.classList.remove("selectbox-option-selected");
                }
            }
        };
        if (Array.isArray(values)) {
            for (var i = 0; i < values.length; i++) {
                value = values[i];
                if (this._selectedValues.has(value)) {
                    this._selectedValues.delete(value);
                    uncheckMultiOption(value);
                }
            }
        } else {
            value = values;
            if (this._selectedValues.has(value)) {
                this._selectedValues.delete(value);
                uncheckMultiOption(value);
            }
        }
        this._updateSelectedText();
        if (bSilent) {
            return;
        }
        this._triggerChange(value, true);
    };
    SelectBox.prototype.clear = function(bSelectFirst) {
        bSelectFirst = bSelectFirst || false;
        this._selectedValues.clear();
        if (bSelectFirst && this._items.length > 0) {
            var firstItem = this._items[0];
            if (firstItem) {
                this._selectedValues.add(firstItem.value);
            }
        }
        this._updateSelectedText();
        this._renderOptions();
    };
    SelectBox.prototype.destroy = function() {
        this._subscribers = [];
        try {
            if (this._header && this._boundHandles) {
                this._header.removeEventListener("click", this._boundHandles.toggle);
            }
            if (this.searchInput && this._boundHandles) {
                this.searchInput.removeEventListener("input", this._boundHandles.search);
            }
            if (this._dropdown && this._boundHandles) {
                this._dropdown.removeEventListener("click", this._boundHandles.dropdownClick);
            }
            if (document && this._boundHandles) {
                document.removeEventListener("click", this._boundHandles.close);
            }
            if (this._header && this._boundHandles) {
                this._header.removeEventListener("keydown", this._boundHandles.keydown);
            }
            if (this._dropdown && this._boundHandles) {
                this._dropdown.removeEventListener("keydown", this._boundHandles.keydown);
            }
        } catch (error) {
            console.error(error);
        }
        this._container.innerHTML = "";
        var containerClasses = this._container.className.split(" ");
        var newClasses = [];
        for (var i = 0; i < containerClasses.length; i++) {
            if (containerClasses[i] !== "selectbox-container") {
                newClasses.push(containerClasses[i]);
            }
        }
        this._container.className = newClasses.join(" ");
    };
    var _categories = new WeakMap;
    var _onSelectCategoryCallback = new WeakMap;
    var _selectedCategory = new WeakMap;
    var _CategoriesPicker_brand = new WeakSet;
    var CategoriesPicker = function() {
        function CategoriesPicker(_catalogOfIcons) {
            _classCallCheck(this, CategoriesPicker);
            _classPrivateMethodInitSpec(this, _CategoriesPicker_brand);
            _classPrivateFieldInitSpec(this, _categories, void 0);
            _classPrivateFieldInitSpec(this, _onSelectCategoryCallback, function(category) {});
            _classPrivateFieldInitSpec(this, _selectedCategory, "");
            _classPrivateFieldSet2(_categories, this, new SelectBox("categorySelectList", {
                placeholder: "Loading..."
            }));
            _assertClassBrand(_CategoriesPicker_brand, this, _addEventListener).call(this);
            _assertClassBrand(_CategoriesPicker_brand, this, _show).call(this, _catalogOfIcons);
        }
        return _createClass(CategoriesPicker, [ {
            key: "reset",
            value: function reset() {
                if (_classPrivateFieldGet2(_selectedCategory, this) === "") {
                    return;
                }
                _classPrivateFieldSet2(_selectedCategory, this, "");
                var selectAll = true;
                _classPrivateFieldGet2(_categories, this).clear(selectAll);
            }
        }, {
            key: "setOnSelectCategoryCallback",
            value: function setOnSelectCategoryCallback(callback) {
                _classPrivateFieldSet2(_onSelectCategoryCallback, this, callback);
            }
        } ]);
    }();
    function _show(catalogOfIcons) {
        var _this = this;
        _classPrivateFieldSet2(_selectedCategory, this, "");
        _classPrivateFieldGet2(_categories, this).addItem("", "All", true);
        catalogOfIcons.forEach(function(categoryInfo) {
            _classPrivateFieldGet2(_categories, _this).addItem(categoryInfo.id, categoryInfo.label);
        });
    }
    function _addEventListener() {
        var _this2 = this;
        _classPrivateFieldGet2(_categories, this).subscribe(function(event) {
            if (event.type === "selectbox:change") {
                var selectedValues = event.detail.values;
                _classPrivateFieldSet2(_selectedCategory, _this2, selectedValues.length > 0 ? selectedValues[0] : "");
                _classPrivateFieldGet2(_onSelectCategoryCallback, _this2).call(_this2, _classPrivateFieldGet2(_selectedCategory, _this2));
            }
        });
    }
    var es_array_includes = {};
    var hasRequiredEs_array_includes;
    function requireEs_array_includes() {
        if (hasRequiredEs_array_includes) return es_array_includes;
        hasRequiredEs_array_includes = 1;
        var $ = require_export();
        var $includes = requireArrayIncludes().includes;
        var fails = requireFails();
        var addToUnscopables = requireAddToUnscopables();
        var BROKEN_ON_SPARSE = fails(function() {
            return !Array(1).includes();
        });
        $({
            target: "Array",
            proto: true,
            forced: BROKEN_ON_SPARSE
        }, {
            includes: function includes(el) {
                return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
            }
        });
        addToUnscopables("includes");
        return es_array_includes;
    }
    requireEs_array_includes();
    var es_array_slice = {};
    var hasRequiredEs_array_slice;
    function requireEs_array_slice() {
        if (hasRequiredEs_array_slice) return es_array_slice;
        hasRequiredEs_array_slice = 1;
        var $ = require_export();
        var isArray = requireIsArray();
        var isConstructor = requireIsConstructor();
        var isObject = requireIsObject();
        var toAbsoluteIndex = requireToAbsoluteIndex();
        var lengthOfArrayLike = requireLengthOfArrayLike();
        var toIndexedObject = requireToIndexedObject();
        var createProperty = requireCreateProperty();
        var wellKnownSymbol = requireWellKnownSymbol();
        var arrayMethodHasSpeciesSupport = requireArrayMethodHasSpeciesSupport();
        var nativeSlice = requireArraySlice();
        var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("slice");
        var SPECIES = wellKnownSymbol("species");
        var $Array = Array;
        var max = Math.max;
        $({
            target: "Array",
            proto: true,
            forced: !HAS_SPECIES_SUPPORT
        }, {
            slice: function slice(start, end) {
                var O = toIndexedObject(this);
                var length = lengthOfArrayLike(O);
                var k = toAbsoluteIndex(start, length);
                var fin = toAbsoluteIndex(end === undefined ? length : end, length);
                var Constructor, result, n;
                if (isArray(O)) {
                    Constructor = O.constructor;
                    if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {
                        Constructor = undefined;
                    } else if (isObject(Constructor)) {
                        Constructor = Constructor[SPECIES];
                        if (Constructor === null) Constructor = undefined;
                    }
                    if (Constructor === $Array || Constructor === undefined) {
                        return nativeSlice(O, k, fin);
                    }
                }
                result = new (Constructor === undefined ? $Array : Constructor)(max(fin - k, 0));
                for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
                result.length = n;
                return result;
            }
        });
        return es_array_slice;
    }
    requireEs_array_slice();
    var es_string_includes = {};
    var notARegexp;
    var hasRequiredNotARegexp;
    function requireNotARegexp() {
        if (hasRequiredNotARegexp) return notARegexp;
        hasRequiredNotARegexp = 1;
        var isRegExp = requireIsRegexp();
        var $TypeError = TypeError;
        notARegexp = function(it) {
            if (isRegExp(it)) {
                throw new $TypeError("The method doesn't accept regular expressions");
            }
            return it;
        };
        return notARegexp;
    }
    var correctIsRegexpLogic;
    var hasRequiredCorrectIsRegexpLogic;
    function requireCorrectIsRegexpLogic() {
        if (hasRequiredCorrectIsRegexpLogic) return correctIsRegexpLogic;
        hasRequiredCorrectIsRegexpLogic = 1;
        var wellKnownSymbol = requireWellKnownSymbol();
        var MATCH = wellKnownSymbol("match");
        correctIsRegexpLogic = function(METHOD_NAME) {
            var regexp = /./;
            try {
                "/./"[METHOD_NAME](regexp);
            } catch (error1) {
                try {
                    regexp[MATCH] = false;
                    return "/./"[METHOD_NAME](regexp);
                } catch (error2) {}
            }
            return false;
        };
        return correctIsRegexpLogic;
    }
    var hasRequiredEs_string_includes;
    function requireEs_string_includes() {
        if (hasRequiredEs_string_includes) return es_string_includes;
        hasRequiredEs_string_includes = 1;
        var $ = require_export();
        var uncurryThis = requireFunctionUncurryThis();
        var notARegExp = requireNotARegexp();
        var requireObjectCoercible = requireRequireObjectCoercible();
        var toString = requireToString();
        var correctIsRegExpLogic = requireCorrectIsRegexpLogic();
        var stringIndexOf = uncurryThis("".indexOf);
        $({
            target: "String",
            proto: true,
            forced: !correctIsRegExpLogic("includes")
        }, {
            includes: function includes(searchString) {
                return !!~stringIndexOf(toString(requireObjectCoercible(this)), toString(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
            }
        });
        return es_string_includes;
    }
    requireEs_string_includes();
    function InputField(input, options) {
        var self = this;
        options = options || {};
        if (typeof input === "string") {
            var temp = document.getElementById(input);
            if (temp instanceof HTMLInputElement) {
                input = temp;
            }
        }
        if (input instanceof HTMLInputElement) {
            this.input = input;
        } else {
            throw new Error("Invalid input element");
        }
        this._container = document.createElement("div");
        this._options = {
            type: options.type || input.type || "text",
            placeholder: options.placeholder || input.placeholder || "",
            value: options.value || input.value || "",
            autofocus: options.autofocus || false,
            disabled: options.disabled || false,
            readonly: options.readonly || false,
            required: options.required || false,
            showCounter: options.showCounter || false,
            showClear: options.showClear !== undefined ? options.showClear : true,
            autocomplete: options.autocomplete || "off"
        };
        for (var key in options) {
            if (!this._options.hasOwnProperty(key)) {
                this._options[key] = options[key];
            }
        }
        this._id = input.id || "input_" + Math.random().toString(36).slice(2, 9);
        this.isFocused = false;
        this.isValid = true;
        this._validationMessage = "";
        this._subscribers = [];
        this._boundHandles = {
            focus: function focus(e) {
                self._handleFocus(e);
            },
            blur: function blur(e) {
                self._handleBlur(e);
            },
            input: function input(e) {
                self._handleInput(e);
            },
            keydown: function keydown(e) {
                self._handleKeydown(e);
            },
            clear: function clear() {
                self.clear();
            },
            validate: function validate() {
                self.validate();
            }
        };
        this._clearButton = null;
        this._counter = null;
        this._counterCurrent = null;
        this._counterMax = null;
        this._validationElement = document.createElement("div");
        if (this._options.type === "search") {
            this._searchIcon = document.createElement("span");
            this._boundHandles.search = this._triggerSubmit.bind(this);
            this._container.classList.add("input-field-search");
        }
        this._createDOM();
        this._bindEvents();
        this._updateState();
        if (this._options.autofocus) {
            setTimeout(function(self) {
                return function() {
                    self.focus();
                };
            }(this), 100);
        }
    }
    InputField.prototype = {
        constructor: InputField,
        input: null,
        _container: null,
        _options: {},
        _id: "",
        isFocused: false,
        isValid: true,
        _validationMessage: "",
        _subscribers: [],
        _boundHandles: null,
        _clearButton: null,
        _counter: null,
        _counterCurrent: null,
        _counterMax: null,
        _validationElement: null,
        _createDOM: function _createDOM() {
            var parent = this.input.parentNode;
            var fragment = document.createDocumentFragment();
            fragment.appendChild(this._container);
            this._container.className += " input-field-container  input-field-container-" + this._id;
            var inputField = document.createElement("div");
            this._container.appendChild(inputField);
            inputField.className += " input-field";
            if (this._options.disabled) {
                inputField.className += " input-field-disabled";
            }
            var inputFieldMain = document.createElement("div");
            inputField.appendChild(inputFieldMain);
            inputFieldMain.className += " input-field-main";
            this.input.className += " input-field-element";
            this.input.type = this._options.type || "text";
            this.input.placeholder = this._options.placeholder || "";
            this.input.value = String(this._options.value) || "";
            if (this._options.disabled) {
                this.input.disabled = true;
            }
            if (this._options.readonly) {
                this.input.readOnly = true;
            }
            if (this._options.required) {
                this.input.required = true;
            }
            if (this._options.maxLength) {
                this.input.maxLength = this._options.maxLength;
            }
            if (this._options.pattern) {
                this.input.pattern = this._options.pattern;
            }
            if (this._options.autocomplete) {
                this.input.autocomplete = this._options.autocomplete;
            }
            if (this._options.showCounter) {
                this._counter = document.createElement("div");
                inputField.appendChild(this._counter);
                this._counter.className += " input-field-counter";
                this._counterCurrent = document.createElement("span");
                this._counterCurrent.className += " input-field-counter-current";
                this._counterCurrent.textContent = "0";
                this._counter.appendChild(this._counterCurrent);
                var span = document.createElement("span");
                span.textContent = "/";
                this._counter.appendChild(span);
                this._counterMax = document.createElement("span");
                this._counterMax.className += " input-field-counter-max";
                this._counterMax.textContent = String(this._options.maxLength) || "∞";
                this._counter.appendChild(this._counterMax);
            }
            inputField.appendChild(this._validationElement);
            this._validationElement.className += " input-field-validation";
            this._validationElement.style.display = "none";
            if (this._options.showClear) {
                this.input.className += " input-field-clearable";
                this._clearButton = document.createElement("button");
                inputField.appendChild(this._clearButton);
                this._clearButton.className += " input-field-clear";
                this._clearButton.style.display = "none";
                this._clearButton.textContent = "×";
            }
            if (this._options.showSearchIcon) {
                this._searchIcon.classList.add("input-field-search-icon");
                this._searchIcon.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" ' + 'fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path fill-rule="evenodd" clip-rule="evenodd" ' + 'd="M10 5.5C10 7.98528 7.98528 10 5.5 10C3.01472 10 1 7.98528 1 5.5C1 3.01472 3.01472 1 5.5 1C7.98528 1 10 3.01472 10 5.5ZM9.01953 9.72663C8.06578 10.5217 6.83875 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.83875 10.5217 8.06578 9.72663 9.01953L13.8536 13.1465L13.1465 13.8536L9.01953 9.72663Z" ' + 'fill="currentColor"/>' + "</svg>";
                inputFieldMain.appendChild(this._searchIcon);
            }
            if (parent) {
                parent.insertBefore(fragment, this.input);
            }
            inputFieldMain.appendChild(this.input);
        },
        _bindEvents: function _bindEvents() {
            this.input.addEventListener("focus", this._boundHandles.focus);
            this.input.addEventListener("blur", this._boundHandles.blur);
            this.input.addEventListener("input", this._boundHandles.input);
            this.input.addEventListener("keydown", this._boundHandles.keydown);
            if (this._clearButton) {
                this._clearButton.addEventListener("click", this._boundHandles.clear);
            }
            if (this._options.showSearchIcon && this._boundHandles.search) {
                this._searchIcon.addEventListener("click", this._boundHandles.search);
            }
            this.input.addEventListener("change", this._boundHandles.validate);
        },
        _handleFocus: function _handleFocus(e) {
            this.isFocused = true;
            this._container.className += " input-field-focused";
            this._updateClearButton();
            this._triggerFocusEvent(e);
        },
        _handleBlur: function _handleBlur(e) {
            this.isFocused = false;
            var classes = this._container.className.split(" ");
            var newClasses = [];
            for (var i = 0; i < classes.length; i++) {
                if (classes[i] !== "input-field-focused") {
                    newClasses.push(classes[i]);
                }
            }
            this._container.className = newClasses.join(" ");
            this.validate();
            this._triggerBlurEvent(e);
        },
        _handleInput: function _handleInput(e) {
            this._updateClearButton();
            this._updateCounter();
            this._triggerInputEvent(e);
        },
        _handleKeydown: function _handleKeydown(e) {
            var key = e.key || e.keyCode;
            if ((key === "Escape" || key === 27) && this._options.showClear) {
                this.clear();
                e.preventDefault();
            }
            if (key === "Enter" || key === 13) {
                this._triggerSubmit();
            }
        },
        _updateClearButton: function _updateClearButton() {
            if (this._clearButton) {
                var hasValue = this.input.value.length > 0;
                this._clearButton.style.display = hasValue ? "block" : "none";
            }
        },
        _updateCounter: function _updateCounter() {
            if (this._counter && this._options.maxLength) {
                var current = this.input.value.length;
                var max = this._options.maxLength;
                if (this._counterCurrent) {
                    this._counterCurrent.textContent = String(current);
                }
                if (this._counterMax) {
                    this._counterMax.textContent = String(max);
                }
                if (current > max * .9) {
                    var counterClasses = this._counter.className.split(" ");
                    if (counterClasses.indexOf("input-field-counter-warning") === -1) {
                        this._counter.className += " input-field-counter-warning";
                    }
                } else {
                    this._counter.className = this._counter.className.split(" ").filter(function(cls) {
                        return cls !== "input-field-counter-warning";
                    }).join(" ");
                }
                if (current > max) {
                    var counterClasses = this._counter.className.split(" ");
                    if (counterClasses.indexOf("input-field-counter-error") === -1) {
                        this._counter.className += " input-field-counter-error";
                    }
                } else {
                    this._counter.className = this._counter.className.split(" ").filter(function(cls) {
                        return cls !== "input-field-counter-error";
                    }).join(" ");
                }
            }
        },
        validate: function validate() {
            if (!this._options.validation) {
                this.isValid = true;
                return true;
            }
            var value = this.input.value;
            var isValid = true;
            var message = "";
            if (this._options.required && !value.trim()) {
                isValid = false;
                message = "This field is required";
            } else if (this._options.minLength && value.length < this._options.minLength) {
                isValid = false;
                message = "Minimum length is " + this._options.minLength + " characters";
            } else if (this._options.maxLength && value.length > this._options.maxLength) {
                isValid = false;
                message = "Maximum length is " + this._options.maxLength + " characters";
            } else if (this._options.pattern && !new RegExp(this._options.pattern).test(value)) {
                isValid = false;
                message = "Invalid format";
            }
            if (isValid && typeof this._options.validation === "function") {
                var customValidation = this._options.validation(value);
                if (customValidation && !customValidation.isValid) {
                    isValid = false;
                    message = customValidation.message || "Invalid value";
                }
            }
            this.isValid = isValid;
            this._validationMessage = message;
            this.updateValidationState();
            return isValid;
        },
        updateValidationState: function updateValidationState() {
            if (!this.isValid) {
                this._validationElement.textContent = this._validationMessage;
                this._validationElement.style.display = "block";
                var containerClasses = this._container.className.split(" ");
                if (containerClasses.indexOf("input-field-invalid") === -1) {
                    this._container.className += " input-field-invalid";
                }
                this._container.className = this._container.className.split(" ").filter(function(cls) {
                    return cls !== "input-field-valid";
                }).join(" ");
            } else if (this.input.value.length > 0) {
                this._validationElement.style.display = "none";
                var containerClasses = this._container.className.split(" ");
                if (containerClasses.indexOf("input-field-valid") === -1) {
                    this._container.className += " input-field-valid";
                }
                this._container.className = this._container.className.split(" ").filter(function(cls) {
                    return cls !== "input-field-invalid";
                }).join(" ");
            } else {
                this._validationElement.style.display = "none";
                this._container.className = this._container.className.split(" ").filter(function(cls) {
                    return cls !== "input-field-valid" && cls !== "input-field-invalid";
                }).join(" ");
            }
        },
        _updateState: function _updateState() {
            this._updateClearButton();
            this._updateCounter();
            this.validate();
        },
        getValue: function getValue() {
            return this.input.value.trim();
        },
        setValue: function setValue(value) {
            this.input.value = value;
            this._updateState();
            this._triggerChange();
        },
        clear: function clear(bFocus) {
            bFocus = bFocus !== undefined ? bFocus : true;
            this.setValue("");
            if (bFocus) {
                this.input.focus();
            }
        },
        focus: function focus() {
            this.input.focus();
        },
        blur: function blur() {
            this.input.blur();
        },
        enable: function enable() {
            this.input.disabled = false;
            this._options.disabled = false;
            this._container.className = this._container.className.split(" ").filter(function(cls) {
                return cls !== "input-field-disabled";
            }).join(" ");
        },
        disable: function disable() {
            this.input.disabled = true;
            this._options.disabled = true;
            var containerClasses = this._container.className.split(" ");
            if (containerClasses.indexOf("input-field-disabled") === -1) {
                this._container.className += " input-field-disabled";
            }
        },
        subscribe: function subscribe(callback) {
            var self = this;
            this._subscribers.push(callback);
            return {
                unsubscribe: function unsubscribe() {
                    self._subscribers = self._subscribers.filter(function(cb) {
                        return cb !== callback;
                    });
                }
            };
        },
        _triggerInputEvent: function _triggerInputEvent(e) {
            var detail = {
                value: this.input.value,
                originalEvent: e
            };
            this._subscribers.forEach(function(cb) {
                cb({
                    type: "inputfield:input",
                    detail: detail
                });
            });
        },
        _triggerFocusEvent: function _triggerFocusEvent(e) {
            var detail = {
                value: this.input.value,
                originalEvent: e
            };
            this._subscribers.forEach(function(cb) {
                cb({
                    type: "inputfield:focus",
                    detail: detail
                });
            });
        },
        _triggerBlurEvent: function _triggerBlurEvent(e) {
            var detail = {
                value: this.input.value,
                originalEvent: e
            };
            this._subscribers.forEach(function(cb) {
                cb({
                    type: "inputfield:blur",
                    detail: detail
                });
            });
        },
        _triggerChange: function _triggerChange() {
            var detail = {
                value: this.input.value,
                isValid: this.isValid
            };
            this._subscribers.forEach(function(cb) {
                cb({
                    type: "inputfield:change",
                    detail: detail
                });
            });
        },
        _triggerSubmit: function _triggerSubmit() {
            var detail = {
                value: this.input.value,
                isValid: this.isValid
            };
            this._subscribers.forEach(function(cb) {
                cb({
                    type: "inputfield:submit",
                    detail: detail
                });
            });
        },
        destroy: function destroy() {
            this._subscribers = [];
            if (this._boundHandles) {
                try {
                    this.input.removeEventListener("focus", this._boundHandles.focus);
                    this.input.removeEventListener("blur", this._boundHandles.blur);
                    this.input.removeEventListener("input", this._boundHandles.input);
                    this.input.removeEventListener("keydown", this._boundHandles.keydown);
                    if (this._clearButton) {
                        this._clearButton.removeEventListener("click", this._boundHandles.clear);
                    }
                    if (this._options.showSearchIcon && this._boundHandles.search) {
                        this._searchIcon.removeEventListener("click", this._boundHandles.search);
                    }
                    this.input.removeEventListener("change", this._boundHandles.validate);
                } catch (error) {
                    console.error(error);
                }
            }
            this._container.innerHTML = "";
            this._container.className = this._container.className.split(" ").filter(function(cls) {
                return cls !== "input-field-container";
            }).join(" ");
        }
    };
    var _catalogOfIcons = new WeakMap;
    var _filteredCatalog = new WeakMap;
    var _onFilterCallback = new WeakMap;
    var _text = new WeakMap;
    var _debounceTimeout = new WeakMap;
    var _SearchFilter_brand = new WeakSet;
    var SearchFilter = function() {
        function SearchFilter(catalogOfIcons) {
            var _this = this;
            _classCallCheck(this, SearchFilter);
            _classPrivateMethodInitSpec(this, _SearchFilter_brand);
            _classPrivateFieldInitSpec(this, _catalogOfIcons, void 0);
            _classPrivateFieldInitSpec(this, _filteredCatalog, void 0);
            _classPrivateFieldInitSpec(this, _onFilterCallback, void 0);
            _defineProperty(this, "input", void 0);
            _classPrivateFieldInitSpec(this, _text, void 0);
            _classPrivateFieldInitSpec(this, _debounceTimeout, void 0);
            _classPrivateFieldSet2(_onFilterCallback, this, function(categories) {});
            _classPrivateFieldSet2(_filteredCatalog, this, catalogOfIcons);
            _classPrivateFieldSet2(_catalogOfIcons, this, catalogOfIcons);
            _classPrivateFieldSet2(_text, this, "");
            this.input = new InputField("searchFilter", {
                autofocus: true,
                type: "search",
                showClear: false,
                showSearchIcon: true
            });
            this.input.subscribe(function(event) {
                if (event.type !== "inputfield:input" || _classPrivateFieldGet2(_text, _this) === event.detail.value) {
                    return;
                }
                if (_classPrivateFieldGet2(_debounceTimeout, _this)) {
                    clearTimeout(_classPrivateFieldGet2(_debounceTimeout, _this));
                }
                _classPrivateFieldSet2(_debounceTimeout, _this, setTimeout(function() {
                    _classPrivateFieldSet2(_text, _this, event.detail.value);
                    _assertClassBrand(_SearchFilter_brand, _this, _onInput).call(_this, event.detail.value.toLowerCase());
                }, 500));
            });
        }
        return _createClass(SearchFilter, [ {
            key: "reset",
            value: function reset() {
                if (this.input.getValue() !== "") {
                    var bFocusInput = false;
                    this.input.clear(bFocusInput);
                    _classPrivateFieldSet2(_text, this, "");
                    _classPrivateFieldSet2(_filteredCatalog, this, _classPrivateFieldGet2(_catalogOfIcons, this));
                }
            }
        }, {
            key: "setOnFilterCallback",
            value: function setOnFilterCallback(callback) {
                _classPrivateFieldSet2(_onFilterCallback, this, callback);
            }
        } ]);
    }();
    function _onInput(value) {
        if (value === "") {
            _classPrivateFieldSet2(_filteredCatalog, this, _classPrivateFieldGet2(_catalogOfIcons, this));
        } else {
            _classPrivateFieldSet2(_filteredCatalog, this, _classPrivateFieldGet2(_catalogOfIcons, this).slice().map(function(categoryInfo) {
                var filteredIcons = [ [] ];
                categoryInfo.folders.forEach(function(folderName, index) {
                    var icons = categoryInfo.icons[index];
                    filteredIcons[index] = icons.filter(function(iconName) {
                        return iconName.toLowerCase().includes(value);
                    });
                });
                return _objectSpread2(_objectSpread2({}, categoryInfo), {
                    icons: filteredIcons
                });
            }));
        }
        _classPrivateFieldGet2(_onFilterCallback, this).call(this, _classPrivateFieldGet2(_filteredCatalog, this));
    }
    var FA_CATEGORIES = [ {
        id: "accessibility",
        label: "Accessibility",
        folders: [ "brands", "regular", "solid" ],
        icons: [ [ "accessible-icon" ], [ "address-card", "circle-question", "closed-captioning", "eye" ], [ "audio-description", "braille", "circle-info", "ear-deaf", "ear-listen", "eye-low-vision", "fingerprint", "hands", "hands-asl-interpreting", "handshake-angle", "person-cane", "person-walking-with-cane", "phone-volume", "question", "tty", "universal-access", "wheelchair", "wheelchair-move" ] ]
    }, {
        id: "alert",
        label: "Alert",
        folders: [ "regular", "solid" ],
        icons: [ [ "alarm-clock", "bell", "bell-slash" ], [ "circle-exclamation", "circle-radiation", "exclamation", "question", "radiation", "skull-crossbones", "triangle-exclamation" ] ]
    }, {
        id: "alphabet",
        label: "Alphabet",
        folders: [ "solid", "regular" ],
        icons: [ [ "a", "b", "c", "circle-h", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "square-h", "t", "u", "v", "w", "x", "y", "z" ], [ "address-card" ] ]
    }, {
        id: "animals",
        label: "Animals",
        folders: [ "solid" ],
        icons: [ [ "bugs", "cat", "cow", "crow", "dog", "dove", "dragon", "feather", "feather-pointed", "fish", "fish-fins", "frog", "hippo", "horse", "horse-head", "kiwi-bird", "locust", "mosquito", "otter", "paw", "shield-cat", "shield-dog", "shrimp", "spider", "worm" ] ]
    }, {
        id: "arrows",
        label: "Arrows",
        folders: [ "solid", "regular" ],
        icons: [ [ "angle-down", "angle-left", "angle-right", "angle-up", "angles-down", "angles-left", "angles-right", "angles-up", "arrow-down", "arrow-down-1-9", "arrow-down-9-1", "arrow-down-a-z", "arrow-down-long", "arrow-down-short-wide", "arrow-down-up-across-line", "arrow-down-up-lock", "arrow-down-wide-short", "arrow-down-z-a", "arrow-left", "arrow-left-long", "arrow-pointer", "arrow-right", "arrow-right-arrow-left", "arrow-right-from-bracket", "arrow-right-long", "arrow-right-to-bracket", "arrow-rotate-left", "arrow-rotate-right", "arrow-trend-down", "arrow-trend-up", "arrow-turn-down", "arrow-turn-up", "arrow-up", "arrow-up-1-9", "arrow-up-9-1", "arrow-up-a-z", "arrow-up-from-bracket", "arrow-up-long", "arrow-up-right-dots", "arrow-up-right-from-square", "arrow-up-short-wide", "arrow-up-wide-short", "arrow-up-z-a", "arrows-down-to-line", "arrows-left-right", "arrows-left-right-to-line", "arrows-rotate", "arrows-spin", "arrows-split-up-and-left", "arrows-to-circle", "arrows-to-dot", "arrows-to-eye", "arrows-turn-right", "arrows-turn-to-dots", "arrows-up-down", "arrows-up-down-left-right", "arrows-up-to-line", "caret-down", "caret-left", "caret-right", "caret-up", "chevron-down", "chevron-left", "chevron-right", "chevron-up", "circle-arrow-down", "circle-arrow-left", "circle-arrow-right", "circle-arrow-up", "circle-chevron-down", "circle-chevron-left", "circle-chevron-right", "circle-chevron-up", "clock-rotate-left", "cloud-arrow-down", "cloud-arrow-up", "down-left-and-up-right-to-center", "down-long", "download", "left-long", "left-right", "location-arrow", "maximize", "recycle", "repeat", "reply", "reply-all", "retweet", "right-from-bracket", "right-left", "right-long", "right-to-bracket", "rotate", "rotate-left", "rotate-right", "share", "shuffle", "sort", "sort-down", "sort-up", "square-arrow-up-right", "square-up-right", "turn-down", "turn-up", "up-down", "up-down-left-right", "up-long", "up-right-and-down-left-from-center", "up-right-from-square", "upload" ], [ "circle-down", "circle-left", "circle-right", "circle-up", "share-from-square", "square-caret-down", "square-caret-left", "square-caret-right", "square-caret-up" ] ]
    }, {
        id: "astronomy",
        label: "Astronomy",
        folders: [ "solid", "regular" ],
        icons: [ [ "binoculars", "globe", "meteor", "satellite", "satellite-dish", "shuttle-space", "user-astronaut" ], [ "moon" ] ]
    }, {
        id: "automotive",
        label: "Automotive",
        folders: [ "solid", "regular" ],
        icons: [ [ "bus", "bus-side", "bus-simple", "car", "car-battery", "car-burst", "car-on", "car-rear", "car-side", "car-tunnel", "caravan", "charging-station", "gas-pump", "gauge", "gauge-high", "gauge-simple", "gauge-simple-high", "motorcycle", "oil-can", "spray-can-sparkles", "taxi", "trailer", "truck-field", "truck-field-un", "truck-medical", "truck-monster", "truck-pickup", "van-shuttle" ], [ "truck" ] ]
    }, {
        id: "buildings",
        label: "Buildings",
        folders: [ "solid", "regular" ],
        icons: [ [ "archway", "arrow-right-to-city", "building-circle-arrow-right", "building-circle-check", "building-circle-exclamation", "building-circle-xmark", "building-columns", "building-flag", "building-lock", "building-ngo", "building-shield", "building-un", "building-user", "building-wheat", "campground", "church", "city", "dungeon", "gopuram", "hospital-user", "hotel", "house-chimney", "house-chimney-crack", "house-chimney-medical", "house-chimney-window", "house-circle-check", "house-circle-exclamation", "house-circle-xmark", "house-crack", "house-fire", "house-flag", "house-lock", "house-medical", "house-medical-circle-check", "house-medical-circle-exclamation", "house-medical-circle-xmark", "house-medical-flag", "igloo", "industry", "kaaba", "landmark", "landmark-dome", "landmark-flag", "monument", "mosque", "mountain-city", "oil-well", "place-of-worship", "school", "school-circle-check", "school-circle-exclamation", "school-circle-xmark", "school-flag", "school-lock", "shop", "shop-lock", "store", "synagogue", "tent", "tent-arrow-down-to-line", "tent-arrow-left-right", "tent-arrow-turn-left", "tent-arrows-down", "tents", "toilet-portable", "toilets-portable", "torii-gate", "tower-observation", "tree-city", "vihara", "warehouse" ], [ "building", "hospital", "house" ] ]
    }, {
        id: "business",
        label: "Business",
        folders: [ "regular", "solid" ],
        icons: [ [ "address-book", "address-card", "building", "calendar", "calendar-days", "clipboard", "compass", "copy", "copyright", "envelope", "envelope-open", "file", "file-lines", "floppy-disk", "folder", "folder-open", "note-sticky", "paste", "pen-to-square", "registered" ], [ "arrows-spin", "arrows-to-dot", "arrows-to-eye", "bars-progress", "bars-staggered", "book", "box-archive", "boxes-packing", "briefcase", "bullhorn", "bullseye", "business-time", "cake-candles", "calculator", "certificate", "chart-line", "chart-pie", "chart-simple", "city", "clipboard-check", "clipboard-question", "envelope-circle-check", "eraser", "fax", "file-circle-plus", "folder-minus", "folder-plus", "folder-tree", "glasses", "globe", "highlighter", "house-laptop", "industry", "landmark", "laptop-file", "list-check", "magnifying-glass-arrow-right", "magnifying-glass-chart", "marker", "mug-saucer", "network-wired", "paperclip", "pen", "pen-clip", "pen-fancy", "pen-nib", "pencil", "percent", "person-chalkboard", "phone", "phone-flip", "phone-slash", "phone-volume", "print", "scale-balanced", "scale-unbalanced", "scale-unbalanced-flip", "scissors", "signature", "sitemap", "socks", "square-envelope", "square-pen", "square-phone", "square-phone-flip", "square-poll-horizontal", "square-poll-vertical", "stapler", "table", "table-columns", "tag", "tags", "thumbtack", "thumbtack-slash", "timeline", "trademark", "vault", "wallet" ] ]
    }, {
        id: "camping",
        label: "Camping",
        folders: [ "solid", "regular" ],
        icons: [ [ "binoculars", "bottle-water", "bucket", "campground", "caravan", "faucet", "faucet-drip", "fire", "fire-burner", "fire-flame-curved", "frog", "kit-medical", "map-location", "map-location-dot", "mattress-pillow", "mosquito", "mosquito-net", "mountain", "mountain-sun", "people-roof", "person-hiking", "person-shelter", "route", "signs-post", "tarp", "tarp-droplet", "tent", "tent-arrow-down-to-line", "tent-arrow-left-right", "tent-arrow-turn-left", "tent-arrows-down", "tents", "toilet-paper", "trailer", "tree" ], [ "compass", "map" ] ]
    }, {
        id: "charity",
        label: "Charity",
        folders: [ "solid", "regular" ],
        icons: [ [ "circle-dollar-to-slot", "dollar-sign", "dove", "gift", "globe", "hand-holding-dollar", "hand-holding-droplet", "hand-holding-hand", "hand-holding-heart", "hands-holding-child", "hands-holding-circle", "handshake-angle", "leaf", "parachute-box", "piggy-bank", "ribbon", "seedling" ], [ "handshake", "heart" ] ]
    }, {
        id: "charts-diagrams",
        label: "Charts + Diagrams",
        folders: [ "solid", "regular" ],
        icons: [ [ "bars-progress", "chart-area", "chart-column", "chart-diagram", "chart-gantt", "chart-line", "chart-pie", "chart-simple", "circle-half-stroke", "diagram-next", "diagram-predecessor", "diagram-project", "diagram-successor", "hexagon-nodes", "hexagon-nodes-bolt", "square-poll-horizontal", "square-poll-vertical" ], [ "chart-bar" ] ]
    }, {
        id: "childhood",
        label: "Childhood",
        folders: [ "solid" ],
        icons: [ [ "apple-whole", "baby", "baby-carriage", "baseball-bat-ball", "bath", "bucket", "cake-candles", "child", "child-dress", "child-reaching", "children", "cookie", "cookie-bite", "cubes-stacked", "gamepad", "hands-holding-child", "ice-cream", "mitten", "person-biking", "person-breastfeeding", "puzzle-piece", "robot", "school", "shapes", "snowman" ] ]
    }, {
        id: "clothing-fashion",
        label: "Clothing + Fashion",
        folders: [ "solid" ],
        icons: [ [ "glasses", "graduation-cap", "hat-cowboy", "hat-cowboy-side", "hat-wizard", "mitten", "shirt", "shoe-prints", "socks", "user-tie", "vest", "vest-patches" ] ]
    }, {
        id: "coding",
        label: "Coding",
        folders: [ "solid", "brands", "regular" ],
        icons: [ [ "barcode", "bars", "bars-staggered", "bath", "box-archive", "bug", "bug-slash", "chart-diagram", "circle-nodes", "code", "code-branch", "code-commit", "code-compare", "code-fork", "code-merge", "code-pull-request", "comment-nodes", "cube", "cubes", "diagram-project", "filter", "fire-extinguisher", "gear", "gears", "hexagon-nodes", "hexagon-nodes-bolt", "laptop-code", "microchip", "mug-saucer", "network-wired", "notdef", "qrcode", "shield", "shield-halved", "sitemap", "square-binary", "terminal", "user-secret" ], [ "css", "web-awesome" ], [ "file", "file-code", "file-lines", "folder", "folder-open", "font-awesome", "keyboard", "rectangle-xmark", "window-maximize", "window-minimize", "window-restore" ] ]
    }, {
        id: "communication",
        label: "Communication",
        folders: [ "regular", "solid", "brands" ],
        icons: [ [ "address-book", "address-card", "comment", "comment-dots", "comments", "envelope", "envelope-open", "face-frown", "face-meh", "face-smile", "message", "paper-plane" ], [ "at", "blender-phone", "bullhorn", "comment-medical", "comment-nodes", "comment-slash", "comment-sms", "ear-deaf", "ear-listen", "envelope-circle-check", "fax", "hands-asl-interpreting", "icons", "inbox", "language", "microphone", "microphone-lines", "microphone-lines-slash", "microphone-slash", "mobile", "mobile-button", "mobile-retro", "mobile-screen", "mobile-screen-button", "mobile-vibrate", "phone", "phone-flip", "phone-slash", "phone-volume", "poo", "quote-left", "quote-right", "single-quote-left", "single-quote-right", "square-envelope", "square-phone", "square-phone-flip", "square-rss", "tower-cell", "tty", "video", "video-slash", "voicemail", "walkie-talkie" ], [ "bluetooth-b" ] ]
    }, {
        id: "connectivity",
        label: "Connectivity",
        folders: [ "brands", "solid", "regular" ],
        icons: [ [ "bluetooth" ], [ "circle-nodes", "cloud-arrow-down", "cloud-arrow-up", "ethernet", "globe", "house-signal", "rss", "satellite-dish", "signal", "tower-broadcast", "tower-cell", "wifi" ], [ "cloud" ] ]
    }, {
        id: "construction",
        label: "Construction",
        folders: [ "solid" ],
        icons: [ [ "arrow-up-from-ground-water", "bore-hole", "brush", "bucket", "compass-drafting", "dumpster", "dumpster-fire", "hammer", "helmet-safety", "mound", "paint-roller", "pen-ruler", "pencil", "person-digging", "ruler", "ruler-combined", "ruler-horizontal", "ruler-vertical", "screwdriver", "screwdriver-wrench", "sheet-plastic", "tarp", "tarp-droplet", "toilet-portable", "toilets-portable", "toolbox", "trowel", "trowel-bricks", "truck-pickup", "wrench" ] ]
    }, {
        id: "design",
        label: "Design",
        folders: [ "solid", "regular", "brands" ],
        icons: [ [ "bezier-curve", "brush", "circle-half-stroke", "circle-nodes", "compass-drafting", "crop", "crop-simple", "crosshairs", "cube", "cubes", "draw-polygon", "droplet", "droplet-slash", "eraser", "eye-dropper", "fill", "fill-drip", "highlighter", "icons", "layer-group", "lines-leaning", "marker", "paint-roller", "paintbrush", "palette", "pen", "pen-clip", "pen-fancy", "pen-nib", "pen-ruler", "pencil", "ruler-combined", "ruler-horizontal", "ruler-vertical", "scissors", "spiral", "splotch", "spray-can", "stamp", "stapler", "swatchbook", "wand-magic", "wand-magic-sparkles" ], [ "clone", "copy", "eye", "eye-slash", "floppy-disk", "font-awesome", "object-group", "object-ungroup", "paste", "pen-to-square" ], [ "web-awesome" ] ]
    }, {
        id: "devices-hardware",
        label: "Devices + Hardware",
        folders: [ "solid", "regular" ],
        icons: [ [ "blender-phone", "camera-retro", "car-battery", "compact-disc", "computer", "computer-mouse", "database", "desktop", "display", "download", "ethernet", "fax", "gamepad", "house-laptop", "laptop", "laptop-file", "memory", "microchip", "mobile", "mobile-button", "mobile-retro", "mobile-screen", "mobile-screen-button", "mobile-vibrate", "plug", "power-off", "print", "satellite", "satellite-dish", "sd-card", "server", "sim-card", "tablet", "tablet-button", "tablet-screen-button", "tachograph-digital", "tv", "upload", "walkie-talkie" ], [ "camera", "floppy-disk", "hard-drive", "headphones", "keyboard" ] ]
    }, {
        id: "disaster",
        label: "Disaster + Crisis",
        folders: [ "solid", "regular" ],
        icons: [ [ "biohazard", "bugs", "burst", "child-combatant", "circle-radiation", "cloud-bolt", "cloud-showers-heavy", "cloud-showers-water", "helmet-un", "hill-avalanche", "hill-rockslide", "house-chimney-crack", "house-crack", "house-fire", "house-flood-water", "house-flood-water-circle-arrow-right", "house-tsunami", "hurricane", "locust", "mosquito", "person-drowning", "person-rifle", "person-walking-arrow-loop-left", "person-walking-arrow-right", "person-walking-dashed-line-arrow-right", "plant-wilt", "radiation", "sun-plant-wilt", "temperature-arrow-down", "temperature-arrow-up", "tornado", "volcano", "wheat-awn-circle-exclamation", "wind", "worm", "xmarks-lines" ], [ "snowflake" ] ]
    }, {
        id: "editing",
        label: "Editing",
        folders: [ "solid", "regular" ],
        icons: [ [ "arrows-rotate", "bandage", "bars", "brush", "chart-simple", "check", "check-double", "circle-half-stroke", "crop", "crop-simple", "cube", "delete-left", "ellipsis", "ellipsis-vertical", "eye-dropper", "gear", "grip", "grip-lines", "grip-lines-vertical", "grip-vertical", "link", "link-slash", "minus", "paintbrush", "pen", "pen-clip", "pen-fancy", "pen-nib", "pen-ruler", "pencil", "plus", "rotate", "scissors", "signature", "sliders", "square-pen", "trash", "trash-arrow-up", "trash-can-arrow-up", "wand-magic", "wand-magic-sparkles", "xmark" ], [ "circle-check", "eye-slash", "pen-to-square", "square-check", "trash-can" ] ]
    }, {
        id: "education",
        label: "Education",
        folders: [ "solid", "regular" ],
        icons: [ [ "apple-whole", "atom", "award", "book-open", "book-open-reader", "chalkboard", "chalkboard-user", "graduation-cap", "laptop-code", "laptop-file", "masks-theater", "microscope", "music", "person-chalkboard", "school", "school-circle-check", "school-circle-exclamation", "school-circle-xmark", "school-flag", "school-lock", "shapes", "user-graduate" ], [ "bell", "bell-slash" ] ]
    }, {
        id: "emoji",
        label: "Emoji",
        folders: [ "regular" ],
        icons: [ [ "face-angry", "face-dizzy", "face-flushed", "face-frown", "face-frown-open", "face-grimace", "face-grin", "face-grin-beam", "face-grin-beam-sweat", "face-grin-hearts", "face-grin-squint", "face-grin-squint-tears", "face-grin-stars", "face-grin-tears", "face-grin-tongue", "face-grin-tongue-squint", "face-grin-tongue-wink", "face-grin-wide", "face-grin-wink", "face-kiss", "face-kiss-beam", "face-kiss-wink-heart", "face-laugh", "face-laugh-beam", "face-laugh-squint", "face-laugh-wink", "face-meh", "face-meh-blank", "face-rolling-eyes", "face-sad-cry", "face-sad-tear", "face-smile", "face-smile-beam", "face-smile-wink", "face-surprise", "face-tired" ] ]
    }, {
        id: "energy",
        label: "Energy",
        folders: [ "solid", "regular" ],
        icons: [ [ "arrow-up-from-ground-water", "atom", "battery-empty", "battery-full", "battery-half", "battery-quarter", "battery-three-quarters", "bolt", "car-battery", "charging-station", "circle-radiation", "explosion", "fan", "fire", "fire-flame-curved", "fire-flame-simple", "gas-pump", "industry", "leaf", "oil-well", "plug", "plug-circle-bolt", "plug-circle-check", "plug-circle-exclamation", "plug-circle-minus", "plug-circle-plus", "plug-circle-xmark", "poop", "power-off", "radiation", "seedling", "solar-panel", "tower-broadcast", "water", "wind" ], [ "lightbulb", "sun" ] ]
    }, {
        id: "files",
        label: "Files",
        folders: [ "solid", "regular" ],
        icons: [ [ "box-archive", "file-arrow-down", "file-arrow-up", "file-circle-check", "file-circle-exclamation", "file-circle-minus", "file-circle-plus", "file-circle-question", "file-circle-xmark", "file-csv", "file-export", "file-fragment", "file-half-dashed", "file-import", "file-pen", "file-shield", "photo-film", "scissors" ], [ "clone", "copy", "file", "file-audio", "file-code", "file-excel", "file-image", "file-lines", "file-pdf", "file-powerpoint", "file-video", "file-word", "file-zipper", "floppy-disk", "folder", "folder-closed", "folder-open", "note-sticky", "paste" ] ]
    }, {
        id: "film-video",
        label: "Film + Video",
        folders: [ "solid", "regular", "brands" ],
        icons: [ [ "audio-description", "clapperboard", "compact-disc", "film", "microphone", "microphone-lines", "microphone-lines-slash", "microphone-slash", "photo-film", "podcast", "square-rss", "ticket", "tower-broadcast", "tower-cell", "tv", "video", "video-slash" ], [ "circle", "closed-captioning", "file-audio", "file-video", "headphones" ], [ "youtube" ] ]
    }, {
        id: "food-beverage",
        label: "Food + Beverage",
        folders: [ "solid", "regular" ],
        icons: [ [ "apple-whole", "bacon", "beer-mug-empty", "blender", "bone", "bottle-droplet", "bottle-water", "bowl-food", "bowl-rice", "bread-slice", "burger", "cake-candles", "candy-cane", "carrot", "champagne-glasses", "cheese", "cloud-meatball", "cookie", "cubes-stacked", "drumstick-bite", "egg", "fish", "fish-fins", "flask", "glass-water", "glass-water-droplet", "hotdog", "ice-cream", "jar", "jar-wheat", "martini-glass", "martini-glass-citrus", "martini-glass-empty", "mug-hot", "mug-saucer", "pepper-hot", "pizza-slice", "plate-wheat", "seedling", "shrimp", "stroopwafel", "wheat-awn", "wheat-awn-circle-exclamation", "whiskey-glass", "wine-bottle", "wine-glass", "wine-glass-empty" ], [ "lemon" ] ]
    }, {
        id: "fruits-vegetables",
        label: "Fruits + Vegetables",
        folders: [ "solid", "regular" ],
        icons: [ [ "apple-whole", "carrot", "leaf", "pepper-hot", "seedling" ], [ "lemon" ] ]
    }, {
        id: "gaming",
        label: "Gaming",
        folders: [ "solid", "regular", "brands" ],
        icons: [ [ "book-skull", "chess", "chess-board", "diamond", "dice", "dice-d20", "dice-d6", "dice-five", "dice-four", "dice-one", "dice-six", "dice-three", "dice-two", "dragon", "dungeon", "gamepad", "ghost", "hand-fist", "hat-wizard", "headset", "puzzle-piece", "ring", "scroll", "shield-halved", "skull-crossbones", "vr-cardboard", "wand-sparkles" ], [ "chess-bishop", "chess-king", "chess-knight", "chess-pawn", "chess-queen", "chess-rook", "heart", "square-full" ], [ "critical-role", "d-and-d", "d-and-d-beyond", "fantasy-flight-games", "playstation", "square-steam", "steam", "steam-symbol", "twitch", "wizards-of-the-coast", "xbox" ] ]
    }, {
        id: "gender",
        label: "Genders",
        folders: [ "solid" ],
        icons: [ [ "genderless", "mars", "mars-and-venus", "mars-double", "mars-stroke", "mars-stroke-right", "mars-stroke-up", "mercury", "neuter", "non-binary", "person-half-dress", "transgender", "venus", "venus-double", "venus-mars" ] ]
    }, {
        id: "halloween",
        label: "Halloween",
        folders: [ "solid" ],
        icons: [ [ "book-skull", "broom", "cat", "cloud-moon", "crow", "ghost", "hat-wizard", "mask", "skull", "skull-crossbones", "spider", "toilet-paper", "wand-sparkles" ] ]
    }, {
        id: "hands",
        label: "Hands",
        folders: [ "regular", "solid" ],
        icons: [ [ "hand", "hand-back-fist", "hand-lizard", "hand-peace", "hand-point-down", "hand-point-left", "hand-point-right", "hand-point-up", "hand-pointer", "hand-scissors", "hand-spock", "handshake", "thumbs-down", "thumbs-up" ], [ "hand-dots", "hand-fist", "hand-holding", "hand-holding-dollar", "hand-holding-droplet", "hand-holding-hand", "hand-holding-heart", "hand-holding-medical", "hand-middle-finger", "hand-sparkles", "hands-bound", "hands-bubbles", "hands-clapping", "hands-holding", "hands-holding-child", "hands-holding-circle", "hands-praying", "handshake-angle", "handshake-slash" ] ]
    }, {
        id: "holidays",
        label: "Holidays",
        folders: [ "solid", "regular" ],
        icons: [ [ "candy-cane", "carrot", "champagne-glasses", "cookie-bite", "gift", "gifts", "holly-berry", "menorah", "mug-hot", "sleigh", "snowman" ], [ "face-grin-hearts", "face-kiss-wink-heart", "heart" ] ]
    }, {
        id: "household",
        label: "Household",
        folders: [ "solid", "regular" ],
        icons: [ [ "arrow-up-from-water-pump", "bath", "bed", "blender", "box-tissue", "chair", "computer", "couch", "door-closed", "door-open", "dungeon", "fan", "faucet", "faucet-drip", "fire-burner", "house-chimney-user", "house-chimney-window", "house-fire", "house-laptop", "house-lock", "house-signal", "house-user", "jar", "jar-wheat", "jug-detergent", "kitchen-set", "mattress-pillow", "mug-saucer", "people-roof", "plug", "pump-soap", "rug", "sheet-plastic", "shower", "sink", "soap", "spoon", "stairs", "temperature-arrow-down", "temperature-arrow-up", "toilet", "toilet-paper", "toilet-paper-slash", "tv", "utensils" ], [ "bell", "lightbulb", "snowflake" ] ]
    }, {
        id: "humanitarian",
        label: "Humanitarian",
        folders: [ "solid", "regular" ],
        icons: [ [ "anchor", "anchor-circle-check", "anchor-circle-exclamation", "anchor-circle-xmark", "anchor-lock", "arrow-down-up-across-line", "arrow-down-up-lock", "arrow-right-to-city", "arrow-up-from-ground-water", "arrow-up-from-water-pump", "arrow-up-right-dots", "arrow-up-right-from-square", "arrows-down-to-line", "arrows-down-to-people", "arrows-left-right-to-line", "arrows-spin", "arrows-split-up-and-left", "arrows-to-circle", "arrows-to-dot", "arrows-to-eye", "arrows-turn-right", "arrows-turn-to-dots", "arrows-up-to-line", "baby", "bacterium", "ban", "bed", "biohazard", "book-bookmark", "bore-hole", "bottle-droplet", "bottle-water", "bowl-food", "bowl-rice", "boxes-packing", "bridge", "bridge-circle-check", "bridge-circle-exclamation", "bridge-circle-xmark", "bridge-lock", "bridge-water", "bucket", "bugs", "building-circle-arrow-right", "building-circle-check", "building-circle-exclamation", "building-circle-xmark", "building-columns", "building-flag", "building-lock", "building-ngo", "building-shield", "building-un", "building-user", "building-wheat", "burst", "bus", "bus-side", "car", "car-on", "car-tunnel", "child-combatant", "children", "church", "circle-h", "circle-nodes", "clipboard-question", "clipboard-user", "cloud-bolt", "cloud-showers-heavy", "cloud-showers-water", "computer", "cow", "cubes-stacked", "display", "droplet", "envelope-circle-check", "explosion", "faucet-drip", "fax", "ferry", "file-circle-check", "file-circle-exclamation", "file-circle-minus", "file-circle-plus", "file-circle-question", "file-circle-xmark", "file-csv", "file-pen", "file-shield", "fire-burner", "fire-flame-simple", "fish-fins", "flask-vial", "gas-pump", "glass-water", "glass-water-droplet", "gopuram", "group-arrows-rotate", "hammer", "hand-holding-hand", "handcuffs", "hands-bound", "hands-bubbles", "hands-holding-child", "hands-holding-circle", "headset", "heart-circle-bolt", "heart-circle-check", "heart-circle-exclamation", "heart-circle-minus", "heart-circle-plus", "heart-circle-xmark", "helicopter", "helicopter-symbol", "helmet-un", "hill-avalanche", "hill-rockslide", "hotel", "house-chimney", "house-chimney-crack", "house-circle-check", "house-circle-exclamation", "house-circle-xmark", "house-fire", "house-flag", "house-flood-water", "house-flood-water-circle-arrow-right", "house-lock", "house-medical", "house-medical-circle-check", "house-medical-circle-exclamation", "house-medical-circle-xmark", "house-medical-flag", "house-signal", "house-tsunami", "hurricane", "jar", "jar-wheat", "jet-fighter-up", "jug-detergent", "kitchen-set", "land-mine-on", "landmark", "landmark-dome", "landmark-flag", "laptop", "laptop-file", "lines-leaning", "location-pin-lock", "locust", "lungs", "magnifying-glass-arrow-right", "magnifying-glass-chart", "mars-and-venus", "mars-and-venus-burst", "mask-face", "mask-ventilator", "mattress-pillow", "microscope", "mobile-retro", "mobile-screen", "money-bill-transfer", "money-bill-trend-up", "money-bill-wheat", "money-bills", "mosque", "mosquito", "mosquito-net", "mound", "mountain-city", "mountain-sun", "oil-well", "parachute-box", "people-arrows", "people-group", "people-line", "people-pulling", "people-robbery", "people-roof", "person", "person-arrow-down-to-line", "person-arrow-up-from-line", "person-breastfeeding", "person-burst", "person-cane", "person-chalkboard", "person-circle-check", "person-circle-exclamation", "person-circle-minus", "person-circle-plus", "person-circle-question", "person-circle-xmark", "person-digging", "person-dress", "person-dress-burst", "person-drowning", "person-falling", "person-falling-burst", "person-half-dress", "person-harassing", "person-military-pointing", "person-military-rifle", "person-military-to-person", "person-pregnant", "person-rays", "person-rifle", "person-shelter", "person-through-window", "person-walking", "person-walking-arrow-loop-left", "person-walking-arrow-right", "person-walking-dashed-line-arrow-right", "person-walking-luggage", "pills", "plane-circle-check", "plane-circle-exclamation", "plane-circle-xmark", "plane-lock", "plane-up", "plant-wilt", "plate-wheat", "plug", "plug-circle-bolt", "plug-circle-check", "plug-circle-exclamation", "plug-circle-minus", "plug-circle-plus", "plug-circle-xmark", "pump-soap", "radiation", "radio", "ranking-star", "road", "road-barrier", "road-bridge", "road-circle-check", "road-circle-exclamation", "road-circle-xmark", "road-lock", "road-spikes", "rug", "sack-dollar", "sack-xmark", "sailboat", "satellite-dish", "scale-balanced", "school", "school-circle-check", "school-circle-exclamation", "school-circle-xmark", "school-flag", "school-lock", "seedling", "sheet-plastic", "shield-cat", "shield-dog", "shield-heart", "ship", "shirt", "shop", "shop-lock", "shower", "skull-crossbones", "soap", "square-nfi", "square-person-confined", "square-virus", "staff-snake", "stethoscope", "suitcase-medical", "sun-plant-wilt", "syringe", "tarp", "tarp-droplet", "temperature-arrow-down", "temperature-arrow-up", "tent", "tent-arrow-down-to-line", "tent-arrow-left-right", "tent-arrow-turn-left", "tent-arrows-down", "tents", "toilet", "toilet-portable", "toilets-portable", "tornado", "tower-broadcast", "tower-cell", "tower-observation", "train-subway", "tree-city", "trowel", "trowel-bricks", "truck-arrow-right", "truck-droplet", "truck-field", "truck-field-un", "truck-front", "truck-medical", "truck-plane", "user-doctor", "user-injured", "users-between-lines", "users-line", "users-rays", "users-rectangle", "users-viewfinder", "vial-circle-check", "vial-virus", "vihara", "virus", "virus-covid", "volcano", "walkie-talkie", "wheat-awn", "wheat-awn-circle-exclamation", "wheelchair-move", "wifi", "wind", "worm", "xmarks-lines" ], [ "building", "envelope", "file", "file-pdf", "flag", "handshake", "hospital", "id-card", "life-ring", "snowflake", "trash-can", "truck" ] ]
    }, {
        id: "logistics",
        label: "Logistics",
        folders: [ "solid", "regular" ],
        icons: [ [ "anchor", "anchor-circle-check", "anchor-circle-exclamation", "anchor-circle-xmark", "anchor-lock", "box", "boxes-packing", "boxes-stacked", "bridge", "bridge-circle-check", "bridge-circle-exclamation", "bridge-circle-xmark", "bridge-lock", "bridge-water", "bus", "bus-side", "bus-simple", "car", "car-tunnel", "cart-flatbed", "chart-simple", "clipboard-check", "clipboard-list", "clipboard-question", "clipboard-user", "dolly", "ferry", "gas-pump", "gears", "helicopter", "helicopter-symbol", "helmet-safety", "jet-fighter-up", "pallet", "plane-circle-check", "plane-circle-exclamation", "plane-circle-xmark", "plane-lock", "road", "road-barrier", "road-bridge", "road-circle-check", "road-circle-exclamation", "road-circle-xmark", "road-lock", "sailboat", "square-nfi", "train", "train-subway", "truck-arrow-right", "truck-fast", "truck-field", "truck-field-un", "truck-front", "truck-plane", "warehouse", "xmarks-lines" ], [ "truck" ] ]
    }, {
        id: "maps",
        label: "Maps",
        folders: [ "solid", "regular" ],
        icons: [ [ "anchor", "bag-shopping", "basket-shopping", "bath", "bed", "beer-mug-empty", "bicycle", "binoculars", "bomb", "book", "book-atlas", "bridge", "bridge-water", "briefcase", "building-columns", "cake-candles", "car", "cart-shopping", "circle-info", "crosshairs", "diamond-turn-right", "dollar-sign", "draw-polygon", "droplet", "eye-low-vision", "fire", "fire-extinguisher", "fire-flame-curved", "flag-checkered", "flask", "gamepad", "gavel", "gift", "globe", "graduation-cap", "heart-pulse", "helicopter", "helicopter-symbol", "industry", "info", "jet-fighter", "key", "landmark", "landmark-flag", "layer-group", "leaf", "location-arrow", "location-crosshairs", "location-dot", "location-pin", "location-pin-lock", "magnet", "magnifying-glass", "magnifying-glass-location", "magnifying-glass-minus", "magnifying-glass-plus", "map-pin", "martini-glass-empty", "money-bill", "monument", "motorcycle", "mountain-sun", "mug-saucer", "music", "paw", "person", "person-walking-with-cane", "phone", "phone-flip", "phone-volume", "plane", "plug", "plus", "print", "recycle", "restroom", "road", "rocket", "route", "scale-balanced", "scale-unbalanced", "scale-unbalanced-flip", "ship", "shoe-prints", "shower", "signs-post", "snowplow", "spoon", "square-h", "square-parking", "square-phone", "square-phone-flip", "street-view", "suitcase", "suitcase-medical", "tag", "tags", "taxi", "thumbtack", "thumbtack-slash", "ticket", "ticket-simple", "traffic-light", "train", "train-subway", "train-tram", "tree", "trophy", "truck-medical", "tty", "umbrella", "utensils", "vest", "vest-patches", "wheelchair", "wheelchair-move", "wifi", "wine-glass", "wrench" ], [ "bell", "bell-slash", "bookmark", "building", "eye", "eye-slash", "flag", "heart", "hospital", "house", "image", "images", "lemon", "life-ring", "lightbulb", "map", "money-bill-1", "newspaper", "square-plus", "truck" ] ]
    }, {
        id: "maritime",
        label: "Maritime",
        folders: [ "solid" ],
        icons: [ [ "anchor", "anchor-circle-check", "anchor-circle-exclamation", "anchor-circle-xmark", "anchor-lock", "ferry", "fish", "fish-fins", "otter", "person-swimming", "sailboat", "ship", "shrimp", "water" ] ]
    }, {
        id: "marketing",
        label: "Marketing",
        folders: [ "solid", "regular" ],
        icons: [ [ "arrows-spin", "arrows-to-dot", "arrows-to-eye", "bullhorn", "bullseye", "chart-simple", "comment-dollar", "comments-dollar", "envelope-open-text", "envelopes-bulk", "filter-circle-dollar", "group-arrows-rotate", "magnifying-glass-arrow-right", "magnifying-glass-chart", "magnifying-glass-dollar", "magnifying-glass-location", "people-group", "person-rays", "ranking-star", "rectangle-ad", "square-poll-horizontal", "square-poll-vertical", "timeline" ], [ "lightbulb" ] ]
    }, {
        id: "mathematics",
        label: "Mathematics",
        folders: [ "solid", "regular" ],
        icons: [ [ "calculator", "circle-minus", "circle-plus", "divide", "equals", "greater-than", "greater-than-equal", "infinity", "less-than", "less-than-equal", "minus", "not-equal", "percent", "plus", "plus-minus", "square-root-variable", "square-xmark", "subscript", "superscript", "wave-square", "xmark" ], [ "circle-xmark", "square-minus" ] ]
    }, {
        id: "media-playback",
        label: "Media Playback",
        folders: [ "solid", "regular" ],
        icons: [ [ "arrow-rotate-left", "arrow-rotate-right", "arrows-rotate", "backward", "backward-fast", "backward-step", "compress", "down-left-and-up-right-to-center", "eject", "expand", "forward", "forward-fast", "forward-step", "maximize", "minimize", "music", "pause", "phone-volume", "play", "plus-minus", "repeat", "rotate", "rotate-left", "rotate-right", "rss", "shuffle", "sliders", "stop", "up-right-and-down-left-from-center", "volume-high", "volume-low", "volume-off", "volume-xmark" ], [ "circle-pause", "circle-play", "circle-stop", "hand" ] ]
    }, {
        id: "medical-health",
        label: "Medical + Health",
        folders: [ "brands", "solid", "regular" ],
        icons: [ [ "accessible-icon" ], [ "bacteria", "bacterium", "ban-smoking", "bandage", "bed-pulse", "biohazard", "bone", "bong", "book-medical", "brain", "briefcase-medical", "cannabis", "capsules", "circle-h", "circle-radiation", "clipboard-user", "clock-rotate-left", "comment-medical", "crutch", "disease", "dna", "droplet", "droplet-slash", "eye-dropper", "file-medical", "file-prescription", "file-waveform", "fire-flame-simple", "flask", "flask-vial", "hand-dots", "hand-holding-droplet", "hand-holding-medical", "head-side-cough", "head-side-cough-slash", "head-side-mask", "head-side-virus", "heart-circle-bolt", "heart-circle-check", "heart-circle-exclamation", "heart-circle-minus", "heart-circle-plus", "heart-circle-xmark", "heart-pulse", "hospital-user", "house-chimney-medical", "house-medical", "house-medical-circle-check", "house-medical-circle-exclamation", "house-medical-circle-xmark", "house-medical-flag", "id-card-clip", "joint", "kit-medical", "laptop-medical", "lungs", "lungs-virus", "mask-face", "mask-ventilator", "microscope", "mortar-pestle", "notes-medical", "pager", "person-breastfeeding", "person-cane", "person-dots-from-line", "person-half-dress", "pills", "plus", "poop", "prescription", "prescription-bottle", "prescription-bottle-medical", "pump-medical", "radiation", "receipt", "shield-virus", "skull", "skull-crossbones", "smoking", "square-h", "square-virus", "staff-snake", "star-of-life", "stethoscope", "suitcase-medical", "syringe", "tablets", "teeth", "teeth-open", "thermometer", "tooth", "truck-droplet", "truck-medical", "user-doctor", "user-nurse", "vial", "vial-circle-check", "vial-virus", "vials", "virus", "virus-covid", "virus-covid-slash", "virus-slash", "viruses", "weight-scale", "wheelchair", "wheelchair-move", "x-ray" ], [ "eye", "heart", "hospital", "square-plus" ] ]
    }, {
        id: "money",
        label: "Money",
        folders: [ "solid", "brands", "regular" ],
        icons: [ [ "austral-sign", "baht-sign", "bangladeshi-taka-sign", "bitcoin-sign", "brazilian-real-sign", "cash-register", "cedi-sign", "cent-sign", "chart-line", "chart-pie", "circle-dollar-to-slot", "coins", "colon-sign", "comment-dollar", "comments-dollar", "cruzeiro-sign", "dollar-sign", "dong-sign", "euro-sign", "file-invoice", "file-invoice-dollar", "florin-sign", "franc-sign", "guarani-sign", "hand-holding-dollar", "hryvnia-sign", "indian-rupee-sign", "kip-sign", "landmark", "lari-sign", "lira-sign", "litecoin-sign", "manat-sign", "mill-sign", "money-bill", "money-bill-1-wave", "money-bill-transfer", "money-bill-trend-up", "money-bill-wave", "money-bill-wheat", "money-bills", "money-check", "money-check-dollar", "naira-sign", "percent", "peseta-sign", "peso-sign", "piggy-bank", "receipt", "ruble-sign", "rupee-sign", "rupiah-sign", "sack-dollar", "sack-xmark", "scale-balanced", "scale-unbalanced", "scale-unbalanced-flip", "shekel-sign", "stamp", "sterling-sign", "tenge-sign", "turkish-lira-sign", "vault", "wallet", "won-sign", "yen-sign" ], [ "bitcoin", "btc", "ethereum", "gg", "gg-circle" ], [ "credit-card", "money-bill-1" ] ]
    }, {
        id: "moving",
        label: "Moving",
        folders: [ "solid" ],
        icons: [ [ "box-archive", "box-open", "boxes-packing", "caravan", "couch", "dolly", "house-chimney", "people-carry-box", "route", "sign-hanging", "suitcase", "tape", "trailer", "truck-moving", "truck-ramp-box", "wine-glass" ] ]
    }, {
        id: "music-audio",
        label: "Music + Audio",
        folders: [ "solid", "regular", "brands" ],
        icons: [ [ "compact-disc", "drum", "drum-steelpan", "guitar", "microphone", "microphone-lines", "microphone-lines-slash", "microphone-slash", "music", "radio", "record-vinyl", "sliders", "volume-high", "volume-low", "volume-off", "volume-xmark", "wave-square" ], [ "file-audio", "headphones" ], [ "napster", "soundcloud", "spotify" ] ]
    }, {
        id: "nature",
        label: "Nature",
        folders: [ "solid" ],
        icons: [ [ "binoculars", "bug", "bugs", "cannabis", "cloud-sun", "clover", "feather", "feather-pointed", "fire", "frog", "icicles", "leaf", "locust", "mosquito", "mound", "mountain", "mountain-city", "mountain-sun", "person-hiking", "plant-wilt", "seedling", "signs-post", "spider", "tree", "volcano", "water", "wind", "worm" ] ]
    }, {
        id: "numbers",
        label: "Numbers",
        folders: [ "solid" ],
        icons: [ [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ] ]
    }, {
        id: "photos-images",
        label: "Photos + Images",
        folders: [ "solid", "regular", "brands" ],
        icons: [ [ "bolt", "bolt-lightning", "camera-retro", "camera-rotate", "chalkboard", "circle-half-stroke", "droplet", "eye-dropper", "film", "image-portrait", "minimize", "panorama", "photo-film", "sliders" ], [ "camera", "clone", "eye", "eye-slash", "file-image", "id-badge", "id-card", "image", "images" ], [ "unsplash" ] ]
    }, {
        id: "political",
        label: "Political",
        folders: [ "solid", "regular" ],
        icons: [ [ "award", "building-flag", "bullhorn", "check-double", "check-to-slot", "circle-dollar-to-slot", "democrat", "dove", "dumpster-fire", "flag-usa", "hand-fist", "landmark-dome", "landmark-flag", "person-booth", "piggy-bank", "republican", "scale-balanced", "scale-unbalanced", "scale-unbalanced-flip" ], [ "handshake" ] ]
    }, {
        id: "punctuation-symbols",
        label: "Punctuation + Symbols",
        folders: [ "solid", "regular" ],
        icons: [ [ "asterisk", "at", "check", "check-double", "circle-exclamation", "equals", "exclamation", "greater-than", "hashtag", "less-than", "minus", "percent", "plus", "question", "quote-left", "quote-right", "section", "single-quote-left", "single-quote-right" ], [ "circle-question" ] ]
    }, {
        id: "religion",
        label: "Religion",
        folders: [ "solid" ],
        icons: [ [ "ankh", "atom", "bahai", "book-bible", "book-journal-whills", "book-quran", "book-tanakh", "church", "cross", "dharmachakra", "dove", "gopuram", "hamsa", "hands-praying", "hanukiah", "jedi", "kaaba", "khanda", "menorah", "mosque", "om", "peace", "person-praying", "place-of-worship", "scroll-torah", "spaghetti-monster-flying", "star-and-crescent", "star-of-david", "synagogue", "torii-gate", "vihara", "yin-yang" ] ]
    }, {
        id: "science",
        label: "Science",
        folders: [ "solid" ],
        icons: [ [ "atom", "biohazard", "brain", "capsules", "circle-radiation", "clipboard-check", "disease", "dna", "eye-dropper", "filter", "fire", "fire-flame-curved", "fire-flame-simple", "flask", "flask-vial", "frog", "magnet", "microscope", "mortar-pestle", "pills", "prescription-bottle", "radiation", "seedling", "skull-crossbones", "square-virus", "syringe", "tablets", "temperature-high", "temperature-low", "vial", "vial-circle-check", "vial-virus", "vials" ] ]
    }, {
        id: "science-fiction",
        label: "Science Fiction",
        folders: [ "solid", "brands", "regular" ],
        icons: [ [ "atom", "book-journal-whills", "explosion", "jedi", "robot", "rocket", "user-astronaut" ], [ "galactic-republic", "galactic-senate", "jedi-order", "old-republic", "space-awesome" ], [ "hand-spock" ] ]
    }, {
        id: "security",
        label: "Security",
        folders: [ "solid", "regular" ],
        icons: [ [ "ban", "bug", "bug-slash", "building-lock", "building-shield", "burst", "car-on", "door-closed", "door-open", "dungeon", "explosion", "file-contract", "file-shield", "file-signature", "fingerprint", "gun", "handcuffs", "hands-bound", "hands-holding-child", "hands-holding-circle", "house-fire", "house-lock", "id-card-clip", "key", "land-mine-on", "lock", "lock-open", "mars-and-venus-burst", "mask", "passport", "people-pulling", "people-robbery", "person-burst", "person-dress-burst", "person-falling-burst", "person-harassing", "person-military-pointing", "person-military-rifle", "person-military-to-person", "person-rifle", "person-shelter", "person-through-window", "road-spikes", "shield", "shield-cat", "shield-dog", "shield-halved", "shield-heart", "skull-crossbones", "square-person-confined", "tower-observation", "unlock", "unlock-keyhole", "user-lock", "user-secret", "user-shield", "vault" ], [ "eye", "eye-slash", "id-badge", "id-card" ] ]
    }, {
        id: "shapes",
        label: "Shapes",
        folders: [ "regular", "solid" ],
        icons: [ [ "bookmark", "calendar", "circle", "cloud", "comment", "file", "folder", "heart", "square", "star" ], [ "burst", "certificate", "circle-half-stroke", "clover", "crown", "cubes-stacked", "diamond", "heart-crack", "hexagon", "lines-leaning", "location-pin", "octagon", "pentagon", "play", "septagon", "shapes", "shield", "spiral", "square-binary", "ticket-simple" ] ]
    }, {
        id: "shopping",
        label: "Shopping",
        folders: [ "brands", "solid", "regular" ],
        icons: [ [ "alipay", "amazon-pay", "apple-pay", "bitcoin", "btc", "cc-amazon-pay", "cc-amex", "cc-apple-pay", "cc-diners-club", "cc-discover", "cc-jcb", "cc-mastercard", "cc-paypal", "cc-stripe", "cc-visa", "ethereum", "google-pay", "google-wallet", "nfc-directional", "nfc-symbol", "paypal", "stripe", "stripe-s" ], [ "bag-shopping", "barcode", "basket-shopping", "bullhorn", "camera-retro", "cart-arrow-down", "cart-plus", "cart-shopping", "cash-register", "certificate", "gift", "gifts", "key", "money-check", "money-check-dollar", "person-booth", "qrcode", "receipt", "shirt", "shop", "shop-lock", "shop-slash", "store", "store-slash", "tag", "tags", "trophy", "truck-fast" ], [ "bell", "bookmark", "camera", "credit-card", "gem", "handshake", "heart", "star", "thumbs-down", "thumbs-up", "truck" ] ]
    }, {
        id: "social",
        label: "Social",
        folders: [ "regular", "brands", "solid" ],
        icons: [ [ "bell", "camera", "circle-user", "comment", "envelope", "heart", "image", "images", "message", "share-from-square", "star", "thumbs-down", "thumbs-up", "user" ], [ "bluesky", "facebook", "square-bluesky" ], [ "cake-candles", "hashtag", "icons", "location-dot", "location-pin", "photo-film", "retweet", "share", "share-nodes", "square-poll-horizontal", "square-poll-vertical", "square-share-nodes", "thumbtack", "thumbtack-slash", "user-group", "user-plus", "users", "video" ] ]
    }, {
        id: "spinners",
        label: "Spinners",
        folders: [ "solid", "regular" ],
        icons: [ [ "arrow-rotate-left", "arrow-rotate-right", "arrows-rotate", "arrows-spin", "asterisk", "atom", "bahai", "certificate", "circle-notch", "compact-disc", "crosshairs", "dharmachakra", "fan", "gear", "hurricane", "palette", "ring", "rotate", "rotate-left", "rotate-right", "slash", "spinner", "stroopwafel", "yin-yang" ], [ "compass", "life-ring", "snowflake", "sun" ] ]
    }, {
        id: "sports-fitness",
        label: "Sports + Fitness",
        folders: [ "solid", "regular" ],
        icons: [ [ "baseball", "baseball-bat-ball", "basketball", "bicycle", "bowling-ball", "broom-ball", "dumbbell", "fire-flame-curved", "fire-flame-simple", "football", "golf-ball-tee", "heart-pulse", "hockey-puck", "medal", "mound", "person-biking", "person-hiking", "person-running", "person-skating", "person-skiing", "person-skiing-nordic", "person-snowboarding", "person-swimming", "person-walking", "ranking-star", "shoe-prints", "spa", "stopwatch-20", "table-tennis-paddle-ball", "volleyball", "weight-hanging" ], [ "futbol", "heart" ] ]
    }, {
        id: "text-formatting",
        label: "Text Formatting",
        folders: [ "solid", "regular" ],
        icons: [ [ "align-center", "align-justify", "align-left", "align-right", "bold", "border-all", "border-none", "border-top-left", "check", "check-double", "filter-circle-xmark", "font", "heading", "highlighter", "i-cursor", "icons", "indent", "italic", "list", "list-check", "list-ol", "list-ul", "outdent", "paragraph", "spell-check", "strikethrough", "subscript", "superscript", "table", "table-cells", "table-cells-column-lock", "table-cells-large", "table-cells-row-lock", "table-cells-row-unlock", "table-columns", "table-list", "text-height", "text-slash", "text-width", "underline" ], [ "circle-check", "rectangle-list", "square-check" ] ]
    }, {
        id: "time",
        label: "Time",
        folders: [ "regular", "solid" ],
        icons: [ [ "alarm-clock", "bell", "bell-slash", "calendar", "calendar-check", "calendar-days", "calendar-minus", "calendar-plus", "calendar-xmark", "clock", "hourglass", "hourglass-half" ], [ "calendar-day", "calendar-week", "hourglass-end", "hourglass-start", "stopwatch", "stopwatch-20" ] ]
    }, {
        id: "toggle",
        label: "Toggle",
        folders: [ "solid", "regular" ],
        icons: [ [ "bullseye", "location-crosshairs", "microphone", "microphone-slash", "plane-up", "signal", "sliders", "toggle-off", "toggle-on", "wifi" ], [ "circle", "circle-check", "circle-dot", "star", "star-half", "star-half-stroke" ] ]
    }, {
        id: "transportation",
        label: "Transportation",
        folders: [ "brands", "solid", "regular" ],
        icons: [ [ "accessible-icon" ], [ "baby-carriage", "bicycle", "bus", "bus-side", "bus-simple", "cable-car", "car", "car-burst", "car-rear", "car-side", "car-tunnel", "cart-shopping", "ferry", "helicopter", "horse", "jet-fighter", "jet-fighter-up", "motorcycle", "mound", "plane", "plane-arrival", "plane-slash", "plane-up", "road", "road-barrier", "road-spikes", "rocket", "sailboat", "ship", "shuttle-space", "sleigh", "snowplow", "taxi", "tractor", "train", "train-subway", "train-tram", "truck-arrow-right", "truck-droplet", "truck-field", "truck-field-un", "truck-front", "truck-medical", "truck-monster", "truck-pickup", "truck-plane", "van-shuttle", "wheelchair", "wheelchair-move" ], [ "paper-plane", "truck" ] ]
    }, {
        id: "travel-hotel",
        label: "Travel + Hotel",
        folders: [ "regular", "solid" ],
        icons: [ [ "alarm-clock", "map", "snowflake" ], [ "archway", "baby-carriage", "ban-smoking", "bath", "bed", "bell-concierge", "book-atlas", "briefcase", "bus", "bus-side", "bus-simple", "cable-car", "car", "caravan", "cart-flatbed-suitcase", "dice", "dice-five", "door-closed", "door-open", "dumbbell", "earth-africa", "earth-americas", "earth-asia", "earth-europe", "earth-oceania", "elevator", "hot-tub-person", "hotel", "infinity", "key", "kitchen-set", "map-location", "map-location-dot", "martini-glass", "martini-glass-citrus", "martini-glass-empty", "monument", "mountain-city", "mug-saucer", "passport", "person-swimming", "person-walking-luggage", "plane", "plane-arrival", "plane-circle-check", "plane-circle-exclamation", "plane-circle-xmark", "plane-departure", "plane-lock", "plane-slash", "plane-up", "shower", "smoking", "spa", "stairs", "suitcase", "suitcase-rolling", "taxi", "toilet", "toilet-paper", "train-tram", "tree-city", "tv", "umbrella-beach", "utensils", "van-shuttle", "water-ladder", "wheelchair", "wheelchair-move", "wifi", "wine-glass", "wine-glass-empty" ] ]
    }, {
        id: "users-people",
        label: "Users + People",
        folders: [ "brands", "regular", "solid" ],
        icons: [ [ "accessible-icon" ], [ "address-book", "address-card", "circle-user", "face-frown", "face-meh", "face-smile", "id-badge", "id-card", "user" ], [ "arrows-down-to-people", "baby", "bed", "chalkboard-user", "child", "child-dress", "child-reaching", "children", "clipboard-user", "elevator", "head-side-cough", "head-side-cough-slash", "head-side-mask", "head-side-virus", "hospital-user", "hot-tub-person", "house-chimney-user", "house-user", "id-card-clip", "image-portrait", "mars-and-venus-burst", "people-arrows", "people-carry-box", "people-group", "people-line", "people-pulling", "people-robbery", "people-roof", "person", "person-arrow-down-to-line", "person-arrow-up-from-line", "person-biking", "person-booth", "person-breastfeeding", "person-burst", "person-cane", "person-chalkboard", "person-circle-check", "person-circle-exclamation", "person-circle-minus", "person-circle-plus", "person-circle-question", "person-circle-xmark", "person-digging", "person-dots-from-line", "person-dress", "person-dress-burst", "person-drowning", "person-falling", "person-falling-burst", "person-half-dress", "person-harassing", "person-hiking", "person-military-pointing", "person-military-rifle", "person-military-to-person", "person-praying", "person-pregnant", "person-rays", "person-rifle", "person-running", "person-shelter", "person-skating", "person-skiing", "person-skiing-nordic", "person-snowboarding", "person-swimming", "person-through-window", "person-walking", "person-walking-arrow-loop-left", "person-walking-arrow-right", "person-walking-dashed-line-arrow-right", "person-walking-luggage", "person-walking-with-cane", "poo", "restroom", "skull", "square-person-confined", "street-view", "user-astronaut", "user-check", "user-clock", "user-doctor", "user-gear", "user-graduate", "user-group", "user-injured", "user-lock", "user-minus", "user-ninja", "user-nurse", "user-pen", "user-plus", "user-secret", "user-shield", "user-slash", "user-tag", "user-tie", "user-xmark", "users", "users-between-lines", "users-gear", "users-line", "users-rays", "users-rectangle", "users-slash", "users-viewfinder", "wheelchair", "wheelchair-move" ] ]
    }, {
        id: "weather",
        label: "Weather",
        folders: [ "solid", "regular" ],
        icons: [ [ "bolt", "bolt-lightning", "cloud-bolt", "cloud-meatball", "cloud-moon", "cloud-moon-rain", "cloud-rain", "cloud-showers-heavy", "cloud-showers-water", "cloud-sun", "cloud-sun-rain", "house-tsunami", "hurricane", "icicles", "meteor", "poo-storm", "rainbow", "smog", "sun-plant-wilt", "temperature-arrow-down", "temperature-arrow-up", "temperature-empty", "temperature-full", "temperature-half", "temperature-high", "temperature-low", "temperature-quarter", "temperature-three-quarters", "tornado", "umbrella", "volcano", "water", "wind" ], [ "cloud", "moon", "snowflake", "sun" ] ]
    }, {
        id: "writing",
        label: "Writing",
        folders: [ "solid", "regular" ],
        icons: [ [ "blog", "book", "book-bookmark", "box-archive", "eraser", "notdef", "paperclip", "paragraph", "pen", "pen-clip", "pencil", "quote-left", "quote-right", "signature", "single-quote-left", "single-quote-right", "square-pen", "thumbtack", "thumbtack-slash" ], [ "bookmark", "envelope", "envelope-open", "file", "file-lines", "folder", "folder-open", "keyboard", "newspaper", "note-sticky", "paper-plane", "pen-to-square" ] ]
    } ];
    var _categoriesPicker = new WeakMap;
    var _iconsPicker = new WeakMap;
    var _searchFilter = new WeakMap;
    var _selectedIcons = new WeakMap;
    var IconsPlugin = function() {
        function IconsPlugin() {
            _classCallCheck(this, IconsPlugin);
            _classPrivateFieldInitSpec(this, _categoriesPicker, void 0);
            _classPrivateFieldInitSpec(this, _iconsPicker, void 0);
            _classPrivateFieldInitSpec(this, _searchFilter, void 0);
            _classPrivateFieldInitSpec(this, _selectedIcons, void 0);
            _classPrivateFieldSet2(_selectedIcons, this, new Map);
            _classPrivateFieldSet2(_iconsPicker, this, new IconPicker(FA_CATEGORIES));
            _classPrivateFieldSet2(_categoriesPicker, this, new CategoriesPicker(FA_CATEGORIES));
            _classPrivateFieldSet2(_searchFilter, this, new SearchFilter(FA_CATEGORIES));
        }
        return _createClass(IconsPlugin, [ {
            key: "init",
            value: function init() {
                var _this = this;
                _classPrivateFieldGet2(_categoriesPicker, this).setOnSelectCategoryCallback(function(categoryName) {
                    _classPrivateFieldGet2(_iconsPicker, _this).showCategory(categoryName);
                    _classPrivateFieldGet2(_searchFilter, _this).reset();
                });
                _classPrivateFieldGet2(_searchFilter, this).setOnFilterCallback(function(catalogOfIcons) {
                    _classPrivateFieldGet2(_iconsPicker, _this).showFound(catalogOfIcons);
                    _classPrivateFieldGet2(_categoriesPicker, _this).reset();
                });
                _classPrivateFieldGet2(_iconsPicker, this).setOnSelectIconCallback(function(icons, needToRun) {
                    _classPrivateFieldSet2(_selectedIcons, _this, icons);
                    needToRun && _this.run();
                });
            }
        }, {
            key: "run",
            value: function run() {
                var _this2 = this;
                return new Promise(function(resolve, reject) {
                    if (!_classPrivateFieldGet2(_selectedIcons, _this2).size) {
                        resolve(false);
                        return;
                    }
                    try {
                        var svgs = _classPrivateFieldGet2(_iconsPicker, _this2).getSelectedSvgIcons();
                        var parsed = svgs.map(function(svg) {
                            return SvgParser.parse(svg);
                        });
                        Asc.scope.editor = Asc.plugin.info.editorType;
                        Asc.scope.parsedSvgs = parsed;
                        var isCalc = true;
                        var isClose = false;
                        Asc.plugin.callCommand(Commands.insertIcon, isClose, isCalc, resolve);
                    } catch (e) {
                        console.error("Failed to run icons plugin");
                        console.error(e);
                        reject(e);
                        return;
                    }
                });
            }
        } ]);
    }();
    var es_function_name = {};
    var hasRequiredEs_function_name;
    function requireEs_function_name() {
        if (hasRequiredEs_function_name) return es_function_name;
        hasRequiredEs_function_name = 1;
        var DESCRIPTORS = requireDescriptors();
        var FUNCTION_NAME_EXISTS = requireFunctionName().EXISTS;
        var uncurryThis = requireFunctionUncurryThis();
        var defineBuiltInAccessor = requireDefineBuiltInAccessor();
        var FunctionPrototype = Function.prototype;
        var functionToString = uncurryThis(FunctionPrototype.toString);
        var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
        var regExpExec = uncurryThis(nameRE.exec);
        var NAME = "name";
        if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
            defineBuiltInAccessor(FunctionPrototype, NAME, {
                configurable: true,
                get: function() {
                    try {
                        return regExpExec(nameRE, functionToString(this))[1];
                    } catch (error) {
                        return "";
                    }
                }
            });
        }
        return es_function_name;
    }
    requireEs_function_name();
    var themes = new Set([ "theme-classic-light", "theme-classic-dark", "theme-light", "theme-dark", "theme-contrast-dark", "theme-gray", "theme-night", "theme-white" ]);
    var Theme = function() {
        function Theme() {
            _classCallCheck(this, Theme);
        }
        return _createClass(Theme, null, [ {
            key: "onThemeChanged",
            value: function onThemeChanged(theme) {
                window.Asc.plugin.onThemeChangedBase(theme);
                theme = Theme.fixThemeForIE(theme);
                var rules = ".icons-container { background-color: " + theme["background-normal"] + "; }\n";
                rules += ".icons .icon { color: " + theme["text-normal"] + "; }\n";
                rules += ".icons .icon:focus { background-color: " + theme["highlight-button-hover"] + "; }\n";
                rules += ".icons .icon:hover { background-color: " + theme["highlight-button-hover"] + "; }\n";
                rules += ".icons .icon.selected { background-color: " + theme["highlight-button-pressed"] + "; }\n";
                var styleTheme = document.getElementById("pluginStyles");
                if (!styleTheme) {
                    styleTheme = document.createElement("style");
                    styleTheme.id = "pluginStyles";
                    styleTheme.innerHTML = rules;
                    document.getElementsByTagName("head")[0].appendChild(styleTheme);
                } else {
                    styleTheme.innerHTML = rules;
                }
                Theme.addStylesForComponents(theme);
                var themeName = theme.name;
                if (!themes.has(themeName)) {
                    console.log('Undefined theme "' + themeName + '"');
                    if (theme.type === "dark") {
                        themeName = "theme-dark";
                    } else {
                        themeName = "theme-light";
                    }
                }
                var body = document.body;
                var _iterator = _createForOfIteratorHelper(themes), _step;
                try {
                    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                        var className = _step.value;
                        body.classList.remove(className);
                    }
                } catch (err) {
                    _iterator.e(err);
                } finally {
                    _iterator.f();
                }
                body.classList.add(themeName);
            }
        }, {
            key: "fixThemeForIE",
            value: function fixThemeForIE(theme) {
                if (!theme["text-normal"]) {
                    theme["text-normal"] = "rgb(51, 51, 51)";
                }
                if (!theme["text-secondary"]) {
                    theme["text-secondary"] = "#848484";
                }
                if (!theme["highlight-button-hover"]) {
                    theme["highlight-button-hover"] = "#e0e0e0";
                }
                if (!theme["background-normal"]) {
                    theme["background-normal"] = "white";
                }
                if (!theme["highlight-button-pressed"]) {
                    theme["highlight-button-pressed"] = "#cbcbcb";
                }
                if (!theme["text-inverse"]) {
                    theme["text-inverse"] = "white";
                }
                if (!theme["border-regular-control"]) {
                    theme["border-regular-control"] = "#c0c0c0";
                }
                if (!theme["border-error"]) {
                    theme["border-error"] = "#f62211";
                }
                if (!theme["border-control-focus"]) {
                    theme["border-control-focus"] = "#848484";
                }
                if (!theme["highlight-primary-dialog-button-hover"]) {
                    theme["highlight-primary-dialog-button-hover"] = "#1c1c1c";
                }
                if (!theme["background-primary-dialog-button"]) {
                    theme["background-primary-dialog-button"] = "#444444";
                }
                if (!theme["background-toolbar-additional"]) {
                    theme["background-toolbar-additional"] = "#efefef";
                }
                if (!theme["text-tertiary"]) {
                    theme["text-tertiary"] = "#bdbdbd";
                }
                return theme;
            }
        }, {
            key: "addStylesForComponents",
            value: function addStylesForComponents(theme) {
                var styles = "";
                styles += ".custom-button-secondary-icon,\n" + ".custom-button-secondary,\n" + ".input-field-element,\n" + ".selectbox-header,\n" + ".selectbox-dropdown,\n" + ".message { background-color: " + theme["background-normal"] + "; }\n";
                styles += ".custom-button-primary { color: " + theme["text-inverse"] + "; }\n";
                styles += ".custom-button-icon-only:active:not(.custom-button-disabled),\n" + ".custom-button-secondary-icon:active:not(.custom-button-disabled),\n" + ".custom-button-secondary:active:not(.custom-button-disabled),\n" + ".custom-button-icon-only:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary-icon:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary,\n" + ".custom-button-secondary-icon,\n" + ".input-field-element,\n" + ".selectbox-header,\n" + ".selectbox-dropdown,\n" + ".selectbox-search-input:focus,\n" + ".selectbox-option-divider,\n" + ".message { border-color: " + theme["border-regular-control"] + "; }\n";
                styles += ".input-field-invalid .input-field-element { border-color: " + theme["border-error"] + "; }\n";
                styles += ".custom-button-icon-only:focus:not(:active):not(:hover),\n" + ".custom-button-secondary-icon:focus:not(:active):not(:hover),\n" + ".custom-button-secondary:focus:not(:active):not(:hover),\n" + ".input-field-element:focus,\n" + ".input-field-focused .input-field-element,\n" + ".selectbox-header:active,\n" + ".selectbox-header:focus,\n" + ".selectbox-header-open { border-color: " + theme["border-control-focus"] + "; }\n";
                styles += ".custom-button-icon-only:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary-icon:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary:hover:not(.custom-button-disabled),\n" + ".selectbox-search,\n" + ".selectbox-option:hover { background-color: " + theme["highlight-button-hover"] + "; }\n";
                styles += ".custom-button-icon-only:active:not(.custom-button-disabled),\n" + ".custom-button-secondary-icon:active:not(.custom-button-disabled),\n" + ".custom-button-secondary:active:not(.custom-button-disabled),\n" + ".selectbox-option-selected:hover,\n" + ".selectbox-option-selected { background-color: " + theme["highlight-button-pressed"] + "; }\n";
                styles += ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " + theme["highlight-button-pressed"] + "; }\n";
                styles += ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " + theme["highlight-primary-dialog-button-hover"] + "; border-color: " + theme["highlight-primary-dialog-button-hover"] + "; }\n";
                styles += ".custom-button-primary { background-color: " + theme["background-primary-dialog-button"] + "; border-color: " + theme["background-primary-dialog-button"] + "; }\n";
                styles += ".custom-button-secondary-icon:disabled,\n" + ".custom-button-secondary-icon.custom-button-disabled,\n" + ".custom-button-secondary:disabled,\n" + ".custom-button-secondary.custom-button-disabled { background-color: " + theme["background-toolbar-additional"] + "; border-color: " + theme["background-toolbar-additional"] + "; }\n";
                styles += ".custom-button-secondary-icon,\n" + ".custom-button-secondary,\n" + ".input-field-element { color: " + theme["text-normal"] + "; }\n";
                styles += ".input-field-search-icon svg { fill: " + theme["text-normal"] + "; }\n";
                styles += ".message-close:hover,\n" + ".input-field-clear:hover { color: " + theme["text-secondary"] + "; }\n";
                styles += ".input-field-clear,\n" + ".message-container:hover .message-close,\n" + ".custom-button-secondary-icon:disabled,\n" + ".custom-button-secondary-icon.custom-button-disabled,\n" + ".custom-button-secondary:disabled,\n" + ".custom-button-secondary.custom-button-disabled,\n" + ".input-field-element::placeholder,\n" + ".selectbox-search-input::placeholder { color: " + theme["text-tertiary"] + "; }\n";
                if ([ "theme-white", "theme-night" ].indexOf(theme.name) !== -1 || [ "theme-white", "theme-night" ].indexOf(theme.Name) !== -1) {
                    styles += ".message,\n" + ".custom-button,\n" + ".selectbox-header,\n" + ".input-field-element { border-radius: 4px; }\n";
                }
                var styleTheme = document.getElementById("componentsStyles");
                if (!styleTheme) {
                    styleTheme = document.createElement("style");
                    styleTheme.id = "componentsStyles";
                    styleTheme.innerHTML = styles;
                    document.getElementsByTagName("head")[0].appendChild(styleTheme);
                    return styles;
                }
                styleTheme.innerHTML = styles;
                return styles;
            }
        } ]);
    }();
    function translate(text) {
        var translatedText = window.Asc.plugin.tr(text);
        return translatedText;
    }
    window.Asc.plugin.init = _asyncToGenerator(_regenerator().m(function _callee() {
        var _iconsPlugin;
        return _regenerator().w(function(_context) {
            while (1) switch (_context.n) {
              case 0:
                try {
                    _iconsPlugin = new IconsPlugin;
                    _iconsPlugin.init();
                } catch (e) {
                    console.error("Failed to init icons plugin");
                    console.error(e);
                }

              case 1:
                return _context.a(2);
            }
        }, _callee);
    }));
    window.Asc.plugin.onTranslate = _asyncToGenerator(_regenerator().m(function _callee2() {
        var elements, i, el;
        return _regenerator().w(function(_context2) {
            while (1) switch (_context2.n) {
              case 0:
                elements = document.getElementsByClassName("i18n");
                for (i = 0; i < elements.length; i++) {
                    el = elements[i];
                    if (el.attributes["placeholder"]) el.attributes["placeholder"].value = translate(el.attributes["placeholder"].value);
                    if (el.attributes["title"]) el.attributes["title"].value = translate(el.attributes["title"].value);
                    if (el.innerText) el.innerText = translate(el.innerText);
                }

              case 1:
                return _context2.a(2);
            }
        }, _callee2);
    }));
    window.Asc.plugin.button = function() {
        var _ref3 = _asyncToGenerator(_regenerator().m(function _callee3(id, windowId) {
            return _regenerator().w(function(_context3) {
                while (1) switch (_context3.n) {
                  case 0:
                    if (!(id === -1 || id === 1)) {
                        _context3.n = 1;
                        break;
                    }
                    this.executeCommand("close", "");
                    _context3.n = 2;
                    break;

                  case 1:
                    _context3.n = 2;
                    return iconsPlugin.run();

                  case 2:
                    return _context3.a(2);
                }
            }, _callee3, this);
        }));
        return function(_x, _x2) {
            return _ref3.apply(this, arguments);
        };
    }();
    window.Asc.plugin.onThemeChanged = Theme.onThemeChanged;
});
//# sourceMappingURL=bundle.es5.js.map
