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
    function _assertClassBrand(e, t, n) {
        if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
        throw new TypeError("Private element is not present on this object");
    }
    function _checkPrivateRedeclaration(e, t) {
        if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
    function _classCallCheck(a, n) {
        if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
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
        return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
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
    var es_array_slice = {};
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
    var objectGetOwnPropertyDescriptor = {};
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
            version: "3.47.0",
            mode: IS_PURE ? "pure" : "global",
            copyright: "© 2014-2025 Denis Pushkarev (zloirock.ru), 2025 CoreJS Company (core-js.io)",
            license: "https://github.com/zloirock/core-js/blob/v3.47.0/LICENSE",
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
    var objectDefineProperty = {};
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
    var hiddenKeys;
    var hasRequiredHiddenKeys;
    function requireHiddenKeys() {
        if (hasRequiredHiddenKeys) return hiddenKeys;
        hasRequiredHiddenKeys = 1;
        hiddenKeys = {};
        return hiddenKeys;
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
    var arraySlice;
    var hasRequiredArraySlice;
    function requireArraySlice() {
        if (hasRequiredArraySlice) return arraySlice;
        hasRequiredArraySlice = 1;
        var uncurryThis = requireFunctionUncurryThis();
        arraySlice = uncurryThis([].slice);
        return arraySlice;
    }
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
    var es_object_keys = {};
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
    var hasRequiredEs_object_keys;
    function requireEs_object_keys() {
        if (hasRequiredEs_object_keys) return es_object_keys;
        hasRequiredEs_object_keys = 1;
        var $ = require_export();
        var toObject = requireToObject();
        var nativeKeys = requireObjectKeys();
        var fails = requireFails();
        var FAILS_ON_PRIMITIVES = fails(function() {
            nativeKeys(1);
        });
        $({
            target: "Object",
            stat: true,
            forced: FAILS_ON_PRIMITIVES
        }, {
            keys: function keys(it) {
                return nativeKeys(toObject(it));
            }
        });
        return es_object_keys;
    }
    requireEs_object_keys();
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
    var web_domCollections_forEach = {};
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
    var es_regexp_constructor = {};
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
    var objectDefineProperties = {};
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
    var es_regexp_exec = {};
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
    var es_string_search = {};
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
                    var constructor = {};
                    constructor[SPECIES] = function() {
                        return re;
                    };
                    re = {
                        constructor: constructor,
                        flags: ""
                    };
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
        setPlaceholder: function setPlaceholder(value) {
            this.input.placeholder = value;
            this._options.placeholder = value;
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
    var es_number_constructor = {};
    var path;
    var hasRequiredPath;
    function requirePath() {
        if (hasRequiredPath) return path;
        hasRequiredPath = 1;
        var globalThis = requireGlobalThis();
        path = globalThis;
        return path;
    }
    var thisNumberValue;
    var hasRequiredThisNumberValue;
    function requireThisNumberValue() {
        if (hasRequiredThisNumberValue) return thisNumberValue;
        hasRequiredThisNumberValue = 1;
        var uncurryThis = requireFunctionUncurryThis();
        thisNumberValue = uncurryThis(1.1.valueOf);
        return thisNumberValue;
    }
    var hasRequiredEs_number_constructor;
    function requireEs_number_constructor() {
        if (hasRequiredEs_number_constructor) return es_number_constructor;
        hasRequiredEs_number_constructor = 1;
        var $ = require_export();
        var IS_PURE = requireIsPure();
        var DESCRIPTORS = requireDescriptors();
        var globalThis = requireGlobalThis();
        var path = requirePath();
        var uncurryThis = requireFunctionUncurryThis();
        var isForced = requireIsForced();
        var hasOwn = requireHasOwnProperty();
        var inheritIfRequired = requireInheritIfRequired();
        var isPrototypeOf = requireObjectIsPrototypeOf();
        var isSymbol = requireIsSymbol();
        var toPrimitive = requireToPrimitive();
        var fails = requireFails();
        var getOwnPropertyNames = requireObjectGetOwnPropertyNames().f;
        var getOwnPropertyDescriptor = requireObjectGetOwnPropertyDescriptor().f;
        var defineProperty = requireObjectDefineProperty().f;
        var thisNumberValue = requireThisNumberValue();
        var trim = requireStringTrim().trim;
        var NUMBER = "Number";
        var NativeNumber = globalThis[NUMBER];
        var PureNumberNamespace = path[NUMBER];
        var NumberPrototype = NativeNumber.prototype;
        var TypeError = globalThis.TypeError;
        var stringSlice = uncurryThis("".slice);
        var charCodeAt = uncurryThis("".charCodeAt);
        var toNumeric = function(value) {
            var primValue = toPrimitive(value, "number");
            return typeof primValue == "bigint" ? primValue : toNumber(primValue);
        };
        var toNumber = function(argument) {
            var it = toPrimitive(argument, "number");
            var first, third, radix, maxCode, digits, length, index, code;
            if (isSymbol(it)) throw new TypeError("Cannot convert a Symbol value to a number");
            if (typeof it == "string" && it.length > 2) {
                it = trim(it);
                first = charCodeAt(it, 0);
                if (first === 43 || first === 45) {
                    third = charCodeAt(it, 2);
                    if (third === 88 || third === 120) return NaN;
                } else if (first === 48) {
                    switch (charCodeAt(it, 1)) {
                      case 66:
                      case 98:
                        radix = 2;
                        maxCode = 49;
                        break;

                      case 79:
                      case 111:
                        radix = 8;
                        maxCode = 55;
                        break;

                      default:
                        return +it;
                    }
                    digits = stringSlice(it, 2);
                    length = digits.length;
                    for (index = 0; index < length; index++) {
                        code = charCodeAt(digits, index);
                        if (code < 48 || code > maxCode) return NaN;
                    }
                    return parseInt(digits, radix);
                }
            }
            return +it;
        };
        var FORCED = isForced(NUMBER, !NativeNumber(" 0o1") || !NativeNumber("0b1") || NativeNumber("+0x1"));
        var calledWithNew = function(dummy) {
            return isPrototypeOf(NumberPrototype, dummy) && fails(function() {
                thisNumberValue(dummy);
            });
        };
        var NumberWrapper = function Number(value) {
            var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
            return calledWithNew(this) ? inheritIfRequired(Object(n), this, NumberWrapper) : n;
        };
        NumberWrapper.prototype = NumberPrototype;
        if (FORCED && !IS_PURE) NumberPrototype.constructor = NumberWrapper;
        $({
            global: true,
            constructor: true,
            wrap: true,
            forced: FORCED
        }, {
            Number: NumberWrapper
        });
        var copyConstructorProperties = function(target, source) {
            for (var keys = DESCRIPTORS ? getOwnPropertyNames(source) : ("MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY," + "EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt," + "fromString,range").split(","), j = 0, key; keys.length > j; j++) {
                if (hasOwn(source, key = keys[j]) && !hasOwn(target, key)) {
                    defineProperty(target, key, getOwnPropertyDescriptor(source, key));
                }
            }
        };
        if (IS_PURE && PureNumberNamespace) copyConstructorProperties(path[NUMBER], PureNumberNamespace);
        if (FORCED || IS_PURE) copyConstructorProperties(path[NUMBER], NativeNumber);
        return es_number_constructor;
    }
    requireEs_number_constructor();
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
    function Message(container, options) {
        if (typeof container === "string") {
            var temp = document.getElementById(container);
            if (temp instanceof HTMLElement) {
                container = temp;
            }
        }
        if (container instanceof HTMLElement) {
            this.container = container;
        } else {
            throw new Error("Invalid container element");
        }
        this._options = Object.assign(this._options, options);
        this._isShow = false;
    }
    Message.prototype = {
        constructor: Message,
        _options: {
            type: "info",
            text: "",
            title: "",
            duration: 0,
            closeButton: true,
            autoClose: false,
            closeOnClickOutside: true
        },
        _outsideClickListener: null,
        _element: null,
        _timeoutId: null,
        _create: function _create() {
            var messageEl = document.createElement("div");
            messageEl.className = "message message-" + this._options.type;
            messageEl.setAttribute("role", "alert");
            var title = this._options.title;
            if (!title) {
                title = "Error";
                switch (this._options.type) {
                  case "success":
                    title = "Success";
                    break;

                  case "warning":
                    title = "Warning";
                    break;

                  case "info":
                    title = "Information";
                    break;
                }
            }
            var text = this._options.text;
            if (!text) {
                text = "";
                switch (this._options.type) {
                  case "success":
                    text = "Operation completed successfully.";
                    break;

                  case "warning":
                    text = "Please be cautious.";
                    break;

                  case "error":
                    text = "Something went wrong.";
                    break;
                }
            }
            messageEl.innerHTML = '<div class="message-content">' + '<span class="message-title">' + title + "</span>" + '<span class="message-text">' + text + "</span>" + "</div>";
            if (this._options.closeButton) {
                var closeBtn = document.createElement("button");
                closeBtn.className = "message-close";
                closeBtn.textContent = "×";
                closeBtn.setAttribute("aria-label", "Close");
                closeBtn.onclick = this.close.bind(this);
                messageEl.appendChild(closeBtn);
            }
            return messageEl;
        },
        addOutsideClickListener: function addOutsideClickListener() {
            if (this._outsideClickListener) {
                document.removeEventListener("click", this._outsideClickListener);
            }
            var self = this;
            this._outsideClickListener = function(e) {
                if (e.target instanceof HTMLElement === false) {
                    return;
                }
                if (self._element && !self._element.contains(e.target)) {
                    self.close();
                }
            };
            setTimeout(function() {
                if (!self._outsideClickListener) {
                    return;
                }
                document.addEventListener("click", self._outsideClickListener);
            }, 10);
        },
        removeOutsideClickListener: function removeOutsideClickListener() {
            if (this._outsideClickListener) {
                document.removeEventListener("click", this._outsideClickListener);
                this._outsideClickListener = null;
            }
        },
        show: function show(text, title) {
            if (this._isShow) {
                return this;
            }
            this._isShow = true;
            if (!this.container.classList.contains("message-container")) {
                this.container.classList.add("message-container");
            }
            if (title) {
                this._options.title = title;
            }
            if (text) {
                this._options.text = text;
            }
            var messageEl = this._create();
            this._element = messageEl;
            this.container.appendChild(messageEl);
            setTimeout(function() {
                messageEl.style.opacity = "1";
                messageEl.style.transform = "translateY(0)";
            }, 10);
            if (this._options.autoClose && Number(this._options.duration) > 0) {
                this._timeoutId = setTimeout(this.close.bind(this), this._options.duration);
            }
            if (this._options.closeOnClickOutside) {
                this.addOutsideClickListener();
            }
            return this;
        },
        close: function close() {
            this._isShow = false;
            if (!this._element || !this._element.parentNode) {
                return;
            }
            if (this._timeoutId) {
                clearTimeout(this._timeoutId);
                this._timeoutId = null;
            }
            this.removeOutsideClickListener();
            var _element = this._element;
            _element.style.opacity = "0";
            _element.style.transform = "translateY(-20px)";
            setTimeout(function() {
                if (_element.parentNode) {
                    _element.parentNode.removeChild(_element);
                }
            }, 300);
        }
    };
    function Button(button, options) {
        var self = this;
        if (typeof button === "string") {
            var temp = document.getElementById(button);
            if (temp instanceof HTMLButtonElement) {
                button = temp;
            }
        }
        if (button instanceof HTMLButtonElement) {
            this._button = button;
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
    Button.prototype = {
        constructor: Button,
        _button: null,
        _buttonText: null,
        _spinner: null,
        _badgeElement: null,
        _createDOM: function _createDOM() {
            var parent = this._button.parentNode;
            var fragment = document.createDocumentFragment();
            fragment.appendChild(this._container);
            this._container.className += " custom-button-container";
            this._button.className += " custom-button";
            this._button.className += " custom-button-" + this._options.variant;
            this._button.className += " custom-button-" + this._options.size;
            if (this._options.disabled) {
                this._button.className += " custom-button-disabled";
            }
            if (this._options.loading) {
                this._container.className += " custom-button-loading";
            }
            if (this._options.type) {
                this._button.type = this._options.type;
            }
            if (this._options.tooltip) {
                this._button.title = this._options.tooltip;
            }
            if (this._options.disabled) {
                this._button.disabled = true;
            }
            if (this._options.text) {
                this._button.textContent = "";
                this._buttonText = document.createElement("span");
                this._buttonText.className = "custom-button-text";
                this._buttonText.textContent = this._options.text || "";
                if (this._options.icon) {
                    var iconSpan = document.createElement("span");
                    iconSpan.className = "custom-button-icon";
                    if (this._options.iconPosition === "left") {
                        iconSpan.className += " custom-button-icon-left";
                        this._button.appendChild(iconSpan);
                        this._button.appendChild(this._buttonText);
                    } else {
                        iconSpan.className += " custom-button-icon-right";
                        this._button.appendChild(this._buttonText);
                        this._button.appendChild(iconSpan);
                    }
                    iconSpan.innerHTML = this._options.icon;
                } else {
                    this._button.appendChild(this._buttonText);
                }
            }
            if (this._options.loading) {
                this._spinner = document.createElement("span");
                this._spinner.className = "custom-button-spinner";
                this._button.appendChild(this._spinner);
            }
            if (this._options.badge) {
                this._badgeElement = document.createElement("span");
                this._badgeElement.className = "custom-button-badge";
                this._badgeElement.textContent = this._options.badge;
                this._button.appendChild(this._badgeElement);
            }
            if (parent) {
                parent.insertBefore(fragment, this._button);
            }
            this._container.appendChild(this._button);
        },
        _bindEvents: function _bindEvents() {
            this._button.addEventListener("click", this._boundHandles.click);
            this._button.addEventListener("mouseenter", this._boundHandles.mouseenter);
            this._button.addEventListener("mouseleave", this._boundHandles.mouseleave);
            this._button.addEventListener("focus", this._boundHandles.focus);
            this._button.addEventListener("blur", this._boundHandles.blur);
            this._button.addEventListener("keydown", this._boundHandles.keydown);
        },
        _handleClick: function _handleClick(e) {
            if (this._options.disabled || this.isLoading) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            this.triggerClickEvent(e);
        },
        _handleMouseEnter: function _handleMouseEnter() {
            var classes = this._button.className.split(" ");
            if (classes.indexOf("custom-button-hover") === -1) {
                this._button.className += " custom-button-hover";
            }
            this.triggerEvent("mouseenter");
        },
        _handleMouseLeave: function _handleMouseLeave() {
            this._button.className = this._button.className.split(" ").filter(function(cls) {
                return cls !== "custom-button-hover";
            }).join(" ");
            this.triggerEvent("mouseleave");
        },
        _handleFocus: function _handleFocus() {
            var classes = this._button.className.split(" ");
            if (classes.indexOf("custom-button-focused") === -1) {
                this._button.className += " custom-button-focused";
            }
            this.triggerEvent("focus");
        },
        _handleBlur: function _handleBlur() {
            this._button.className = this._button.className.split(" ").filter(function(cls) {
                return cls !== "custom-button-focused";
            }).join(" ");
            this.triggerEvent("blur");
        },
        _handleKeydown: function _handleKeydown(e) {
            var key = e.key || e.keyCode;
            if (key === " " || key === "Enter" || key === 32 || key === 13) {
                if (this._button.tagName === "BUTTON") ; else {
                    e.preventDefault();
                    this._button.click();
                }
            } else if (key === "Escape" || key === 27) {
                this._button.blur();
            }
            this.triggerEvent("keydown", {
                key: key
            });
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
        setText: function setText(text) {
            if (typeof text === "undefined") return;
            this._options.text = text;
            if (!this._buttonText) {
                this._buttonText = document.createElement("span");
                this._buttonText.className = "custom-button-text";
                this._buttonText.textContent = "";
                this._button.appendChild(this._buttonText);
            }
            this._buttonText.textContent = text;
        },
        setIcon: function setIcon(icon, position) {
            this._options.icon = icon;
            this._options.iconPosition = position || "left";
        },
        setBadge: function setBadge(badge) {
            if (typeof badge === "undefined") return;
            this._options.badge = badge;
            if (this._badgeElement) {
                this._badgeElement.textContent = badge;
                this._badgeElement.style.display = badge ? "flex" : "none";
            }
        },
        setVariant: function setVariant(variant) {
            if (typeof variant === "undefined") return;
            var oldClass = "custom-button-" + this._options.variant;
            var newClass = "custom-button-" + variant;
            this._button.className = this._button.className.split(" ").filter(function(cls) {
                return cls !== oldClass;
            }).join(" ") + " " + newClass;
            this._options.variant = variant;
        },
        setSize: function setSize(size) {
            if (typeof size === "undefined") return;
            var oldClass = "custom-button-" + this._options.size;
            var newClass = "custom-button-" + size;
            this._button.className = this._button.className.split(" ").filter(function(cls) {
                return cls !== oldClass;
            }).join(" ") + " " + newClass;
            this._options.size = size;
        },
        enable: function enable() {
            this._options.disabled = false;
            this._button.disabled = false;
            this._button.className = this._button.className.split(" ").filter(function(cls) {
                return cls !== "custom-button-disabled";
            }).join(" ");
        },
        disable: function disable() {
            this._options.disabled = true;
            this._button.disabled = true;
            var classes = this._button.className.split(" ");
            if (classes.indexOf("custom-button-disabled") === -1) {
                this._button.className += " custom-button-disabled";
            }
        },
        startLoading: function startLoading() {
            this.isLoading = true;
            if (typeof this._options.text !== "undefined") this._originalText = this._options.text;
            var containerClasses = this._container.className.split(" ");
            if (containerClasses.indexOf("custom-button-loading") === -1) {
                this._container.className += " custom-button-loading";
            }
            if (this._spinner) {
                this._spinner.style.display = "inline-block";
            }
            if (this._buttonText) {
                this._buttonText.textContent = "Loading...";
            }
            this._button.disabled = true;
        },
        stopLoading: function stopLoading() {
            this.isLoading = false;
            this._container.className = this._container.className.split(" ").filter(function(cls) {
                return cls !== "custom-button-loading";
            }).join(" ");
            if (this._spinner) {
                this._spinner.style.display = "none";
            }
            if (this._buttonText) {
                this._buttonText.textContent = this._originalText;
            }
            this._button.disabled = !!this._options.disabled;
        },
        setTooltip: function setTooltip(tooltip) {
            if (typeof tooltip === "undefined") return;
            this._options.tooltip = tooltip;
            this._button.title = tooltip || "";
        },
        triggerClickEvent: function triggerClickEvent(e) {
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
        },
        triggerEvent: function triggerEvent(eventName, detail) {
            detail = detail || {};
            detail.button = this;
            this._subscribers.forEach(function(cb) {
                cb({
                    type: "button:" + eventName,
                    detail: detail
                });
            });
        },
        updateState: function updateState() {
            if (this._options.disabled) {
                this.disable();
            } else {
                this.enable();
            }
            if (this._options.loading) {
                this.startLoading();
            }
        },
        destroy: function destroy() {
            this._subscribers = [];
            if (this._boundHandles) {
                try {
                    this._button.removeEventListener("click", this._boundHandles.click);
                    this._button.removeEventListener("mouseenter", this._boundHandles.mouseenter);
                    this._button.removeEventListener("mouseleave", this._boundHandles.mouseleave);
                    this._button.removeEventListener("focus", this._boundHandles.focus);
                    this._button.removeEventListener("blur", this._boundHandles.blur);
                    this._button.removeEventListener("keydown", this._boundHandles.keydown);
                } catch (error) {
                    console.error(error);
                }
            }
            this._container.innerHTML = "";
            var containerClasses = this._container.className.split(" ").filter(function(cls) {
                return cls !== "custom-button-container";
            }).join(" ");
            this._container.className = containerClasses;
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
    var es_array_splice = {};
    var arraySetLength;
    var hasRequiredArraySetLength;
    function requireArraySetLength() {
        if (hasRequiredArraySetLength) return arraySetLength;
        hasRequiredArraySetLength = 1;
        var DESCRIPTORS = requireDescriptors();
        var isArray = requireIsArray();
        var $TypeError = TypeError;
        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function() {
            if (this !== undefined) return true;
            try {
                Object.defineProperty([], "length", {
                    writable: false
                }).length = 1;
            } catch (error) {
                return error instanceof TypeError;
            }
        }();
        arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function(O, length) {
            if (isArray(O) && !getOwnPropertyDescriptor(O, "length").writable) {
                throw new $TypeError("Cannot set read only .length");
            }
            return O.length = length;
        } : function(O, length) {
            return O.length = length;
        };
        return arraySetLength;
    }
    var deletePropertyOrThrow;
    var hasRequiredDeletePropertyOrThrow;
    function requireDeletePropertyOrThrow() {
        if (hasRequiredDeletePropertyOrThrow) return deletePropertyOrThrow;
        hasRequiredDeletePropertyOrThrow = 1;
        var tryToString = requireTryToString();
        var $TypeError = TypeError;
        deletePropertyOrThrow = function(O, P) {
            if (!delete O[P]) throw new $TypeError("Cannot delete property " + tryToString(P) + " of " + tryToString(O));
        };
        return deletePropertyOrThrow;
    }
    var hasRequiredEs_array_splice;
    function requireEs_array_splice() {
        if (hasRequiredEs_array_splice) return es_array_splice;
        hasRequiredEs_array_splice = 1;
        var $ = require_export();
        var toObject = requireToObject();
        var toAbsoluteIndex = requireToAbsoluteIndex();
        var toIntegerOrInfinity = requireToIntegerOrInfinity();
        var lengthOfArrayLike = requireLengthOfArrayLike();
        var setArrayLength = requireArraySetLength();
        var doesNotExceedSafeInteger = requireDoesNotExceedSafeInteger();
        var arraySpeciesCreate = requireArraySpeciesCreate();
        var createProperty = requireCreateProperty();
        var deletePropertyOrThrow = requireDeletePropertyOrThrow();
        var arrayMethodHasSpeciesSupport = requireArrayMethodHasSpeciesSupport();
        var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("splice");
        var max = Math.max;
        var min = Math.min;
        $({
            target: "Array",
            proto: true,
            forced: !HAS_SPECIES_SUPPORT
        }, {
            splice: function splice(start, deleteCount) {
                var O = toObject(this);
                var len = lengthOfArrayLike(O);
                var actualStart = toAbsoluteIndex(start, len);
                var argumentsLength = arguments.length;
                var insertCount, actualDeleteCount, A, k, from, to;
                if (argumentsLength === 0) {
                    insertCount = actualDeleteCount = 0;
                } else if (argumentsLength === 1) {
                    insertCount = 0;
                    actualDeleteCount = len - actualStart;
                } else {
                    insertCount = argumentsLength - 2;
                    actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
                }
                doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
                A = arraySpeciesCreate(O, actualDeleteCount);
                for (k = 0; k < actualDeleteCount; k++) {
                    from = actualStart + k;
                    if (from in O) createProperty(A, k, O[from]);
                }
                A.length = actualDeleteCount;
                if (insertCount < actualDeleteCount) {
                    for (k = actualStart; k < len - actualDeleteCount; k++) {
                        from = k + actualDeleteCount;
                        to = k + insertCount;
                        if (from in O) O[to] = O[from]; else deletePropertyOrThrow(O, to);
                    }
                    for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
                } else if (insertCount > actualDeleteCount) {
                    for (k = len - actualDeleteCount; k > actualStart; k--) {
                        from = k + actualDeleteCount - 1;
                        to = k + insertCount - 1;
                        if (from in O) O[to] = O[from]; else deletePropertyOrThrow(O, to);
                    }
                }
                for (k = 0; k < insertCount; k++) {
                    O[k + actualStart] = arguments[k + 2];
                }
                setArrayLength(O, len - actualDeleteCount + insertCount);
                return A;
            }
        });
        return es_array_splice;
    }
    requireEs_array_splice();
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
    var es_map = {};
    var es_map_constructor = {};
    var internalMetadata = {
        exports: {}
    };
    var objectGetOwnPropertyNamesExternal = {};
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
    var es_string_iterator = {};
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
    var web_domCollections_iterator = {};
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
    function Checkbox(checkbox, options) {
        if (typeof checkbox === "string") {
            var temp = document.getElementById(checkbox);
            if (temp instanceof HTMLInputElement) {
                checkbox = temp;
            }
        }
        if (checkbox instanceof HTMLInputElement === false) {
            throw new Error("Invalid input element");
        }
        this._options = Object.assign({
            id: "checkbox_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)),
            checked: false,
            disabled: false,
            indeterminate: false,
            label: "",
            name: "",
            value: "on"
        }, options);
        this._options.disabled = options.disabled || false;
        this._handlers = new Map;
        this._createDOM(checkbox);
        this._setupEventListeners();
        this._updateVisualState();
        this._subscribers = [];
    }
    Checkbox.prototype = {
        constructor: Checkbox,
        _container: null,
        _input: null,
        _visualCheckbox: null,
        _labelElement: null,
        _createDOM: function _createDOM(checkbox) {
            var parent = checkbox.parentNode;
            var fragment = document.createDocumentFragment();
            this._container = document.createElement("div");
            fragment.appendChild(this._container);
            this._container.classList.add("checkbox-container");
            this._container.setAttribute("role", "checkbox");
            this._container.setAttribute("aria-checked", this._options.checked ? "true" : "false");
            this._container.setAttribute("aria-disabled", this._options.disabled ? "true" : "false");
            this._container.tabIndex = this._options.disabled ? -1 : 0;
            this._input = checkbox;
            var elId = this._input.getAttribute("id");
            if (elId !== null) {
                this._options.id = elId;
            } else if (this._options.id) {
                this._input.setAttribute("id", this._options.id);
            }
            this._input.type = "checkbox";
            if (this._options.name) {
                this._input.name = this._options.name;
            }
            if (this._options.value) {
                this._input.value = this._options.value;
            }
            this._input.checked = !!this._options.checked;
            if (this._options.disabled) {
                this._input.disabled = true;
            }
            if (this._options.indeterminate) {
                this._input.indeterminate = true;
            }
            this._visualCheckbox = document.createElement("span");
            this._visualCheckbox.className = "checkbox-visual";
            this._visualCheckbox.setAttribute("aria-hidden", "true");
            var svgNS = "http://www.w3.org/2000/svg";
            var checkmarkSVG = document.createElementNS(svgNS, "svg");
            checkmarkSVG.setAttribute("viewBox", "0 0 10 8");
            checkmarkSVG.setAttribute("class", "checkbox-checkmark");
            var path = document.createElementNS(svgNS, "path");
            path.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116");
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", "currentColor");
            path.setAttribute("stroke-width", "2");
            checkmarkSVG.appendChild(path);
            this._visualCheckbox.appendChild(checkmarkSVG);
            var indeterminateLine = document.createElement("span");
            indeterminateLine.className = "checkbox-indeterminate";
            this._visualCheckbox.appendChild(indeterminateLine);
            if (this._options.label) {
                this._labelElement = document.createElement("label");
                this._labelElement.className = "checkbox-label i18n";
                if (this._options.id) this._labelElement.htmlFor = this._options.id;
                this._labelElement.textContent = this._options.label;
                if (this._options.title) {
                    this._labelElement.setAttribute("title", this._options.label);
                }
            } else {
                var label = document.querySelector("label[for='" + this._options.id + "']");
                if (label instanceof HTMLLabelElement) {
                    this._labelElement = label;
                }
            }
            if (this._options.disabled) {
                this._container.classList.add("checkbox--disabled");
            }
            if (parent) {
                parent.insertBefore(fragment, checkbox);
            }
            this._container.appendChild(this._input);
            this._container.appendChild(this._visualCheckbox);
            if (this._labelElement) {
                this._container.appendChild(this._labelElement);
            }
        },
        _setupEventListeners: function _setupEventListeners() {
            var self = this;
            if (!this._container) return;
            var handleClick = function handleClick(e) {
                e.preventDefault();
                if (!self._options.disabled && self._container) {
                    self.toggle();
                    self._container.focus();
                }
            };
            var handleKeyDown = function handleKeyDown(e) {
                if (self._options.disabled) return;
                switch (e.key) {
                  case " ":
                  case "Spacebar":
                  case "Enter":
                    e.preventDefault();
                    self.toggle();
                    break;

                  case "ArrowRight":
                  case "ArrowDown":
                    e.preventDefault();
                    if (!self._options.checked && !self._options.indeterminate) {
                        self._options.checked ? self.setIndeterminate() : self.check();
                    }
                    break;

                  case "ArrowLeft":
                  case "ArrowUp":
                    e.preventDefault();
                    if (self._options.checked || self._options.indeterminate) {
                        self._options.indeterminate ? self.uncheck() : self.setIndeterminate();
                    }
                    break;
                }
            };
            var handleFocus = function handleFocus() {
                if (!self._container) return;
                self._container.classList.add("checkbox--focused");
            };
            var handleBlur = function handleBlur() {
                if (!self._container) return;
                self._container.classList.remove("checkbox--focused");
            };
            this._handlers.set("click", handleClick);
            this._handlers.set("keydown", handleKeyDown);
            this._handlers.set("focus", handleFocus);
            this._handlers.set("blur", handleBlur);
            this._container.addEventListener("click", handleClick);
            this._container.addEventListener("keydown", handleKeyDown);
            this._container.addEventListener("focus", handleFocus);
            this._container.addEventListener("blur", handleBlur);
        },
        _updateVisualState: function _updateVisualState() {
            if (!this._container || !this._input) return;
            this._container.setAttribute("aria-checked", this._options.indeterminate ? "mixed" : String(this._options.checked));
            this._container.classList.toggle("checkbox--checked", this._options.checked);
            this._container.classList.toggle("checkbox--indeterminate", this._options.indeterminate);
            this._input.checked = !!this._options.checked;
            this._input.indeterminate = !!this._options.indeterminate;
        },
        toggle: function toggle() {
            if (this._options.disabled) return !!this._options.checked;
            if (this._options.indeterminate) {
                this._options.indeterminate = false;
                this._options.checked = true;
            } else {
                this._options.checked = !this._options.checked;
            }
            this._updateVisualState();
            this._triggerChange();
            return this._options.checked;
        },
        check: function check(bSilent) {
            if (this._options.disabled || this._options.checked && !this._options.indeterminate) return;
            this._options.checked = true;
            this._options.indeterminate = false;
            this._updateVisualState();
            if (!bSilent) this._triggerChange();
        },
        uncheck: function uncheck(bSilent) {
            if (this._options.disabled || !this._options.checked && !this._options.indeterminate) return;
            this._options.checked = false;
            this._options.indeterminate = false;
            this._updateVisualState();
            if (!bSilent) this._triggerChange();
        },
        setIndeterminate: function setIndeterminate() {
            if (this._options.disabled || this._options.indeterminate) return;
            this._options.indeterminate = true;
            this._updateVisualState();
            this._triggerChange();
        },
        enable: function enable() {
            if (!this._options.disabled || !this._container || !this._input) return;
            this._options.disabled = false;
            this._input.disabled = false;
            this._container.setAttribute("aria-disabled", "false");
            this._container.tabIndex = 0;
            this._container.classList.remove("checkbox--disabled");
        },
        disable: function disable() {
            if (this._options.disabled || !this._container || !this._input) return;
            this._options.disabled = true;
            this._input.disabled = true;
            this._container.setAttribute("aria-disabled", "true");
            this._container.tabIndex = -1;
            this._container.classList.add("checkbox--disabled");
        },
        setLabel: function setLabel(label) {
            this._options.label = label;
            if (this._labelElement) {
                this._labelElement.textContent = label;
            } else if (label && this._container) {
                this._labelElement = document.createElement("label");
                this._labelElement.className = "checkbox-label";
                if (this._options.id) this._labelElement.htmlFor = this._options.id;
                this._labelElement.textContent = label;
                this._container.appendChild(this._labelElement);
            }
            if (this._options.title && this._labelElement) {
                this._labelElement.setAttribute("title", label);
            }
        },
        getState: function getState() {
            if (this._input) {
                return {
                    checked: this._input.checked,
                    disabled: this._input.disabled,
                    value: this._input.value
                };
            }
            return {
                checked: false,
                disabled: false,
                value: ""
            };
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
        _triggerChange: function _triggerChange(e) {
            var detail = this.getState();
            var objEvent = {
                type: "checkbox:change",
                detail: detail
            };
            if (e) {
                objEvent.originalEvent = e;
            }
            this._subscribers.forEach(function(cb) {
                cb(objEvent);
            });
        },
        destroy: function destroy() {
            var _this = this;
            this._subscribers = [];
            this._handlers.forEach(function(handler, event) {
                _this._container && _this._container.removeEventListener(event, handler);
            });
            this._handlers.clear();
            if (this._container && this._container.parentNode) {
                this._container.parentNode.removeChild(this._container);
            }
            this._container = null;
            this._input = null;
            this._visualCheckbox = null;
            this._labelElement = null;
        }
    };
    var es_symbol = {};
    var es_symbol_constructor = {};
    var wellKnownSymbolWrapped = {};
    var hasRequiredWellKnownSymbolWrapped;
    function requireWellKnownSymbolWrapped() {
        if (hasRequiredWellKnownSymbolWrapped) return wellKnownSymbolWrapped;
        hasRequiredWellKnownSymbolWrapped = 1;
        var wellKnownSymbol = requireWellKnownSymbol();
        wellKnownSymbolWrapped.f = wellKnownSymbol;
        return wellKnownSymbolWrapped;
    }
    var wellKnownSymbolDefine;
    var hasRequiredWellKnownSymbolDefine;
    function requireWellKnownSymbolDefine() {
        if (hasRequiredWellKnownSymbolDefine) return wellKnownSymbolDefine;
        hasRequiredWellKnownSymbolDefine = 1;
        var path = requirePath();
        var hasOwn = requireHasOwnProperty();
        var wrappedWellKnownSymbolModule = requireWellKnownSymbolWrapped();
        var defineProperty = requireObjectDefineProperty().f;
        wellKnownSymbolDefine = function(NAME) {
            var Symbol = path.Symbol || (path.Symbol = {});
            if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
                value: wrappedWellKnownSymbolModule.f(NAME)
            });
        };
        return wellKnownSymbolDefine;
    }
    var symbolDefineToPrimitive;
    var hasRequiredSymbolDefineToPrimitive;
    function requireSymbolDefineToPrimitive() {
        if (hasRequiredSymbolDefineToPrimitive) return symbolDefineToPrimitive;
        hasRequiredSymbolDefineToPrimitive = 1;
        var call = requireFunctionCall();
        var getBuiltIn = requireGetBuiltIn();
        var wellKnownSymbol = requireWellKnownSymbol();
        var defineBuiltIn = requireDefineBuiltIn();
        symbolDefineToPrimitive = function() {
            var Symbol = getBuiltIn("Symbol");
            var SymbolPrototype = Symbol && Symbol.prototype;
            var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
            var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
            if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
                defineBuiltIn(SymbolPrototype, TO_PRIMITIVE, function(hint) {
                    return call(valueOf, this);
                }, {
                    arity: 1
                });
            }
        };
        return symbolDefineToPrimitive;
    }
    var hasRequiredEs_symbol_constructor;
    function requireEs_symbol_constructor() {
        if (hasRequiredEs_symbol_constructor) return es_symbol_constructor;
        hasRequiredEs_symbol_constructor = 1;
        var $ = require_export();
        var globalThis = requireGlobalThis();
        var call = requireFunctionCall();
        var uncurryThis = requireFunctionUncurryThis();
        var IS_PURE = requireIsPure();
        var DESCRIPTORS = requireDescriptors();
        var NATIVE_SYMBOL = requireSymbolConstructorDetection();
        var fails = requireFails();
        var hasOwn = requireHasOwnProperty();
        var isPrototypeOf = requireObjectIsPrototypeOf();
        var anObject = requireAnObject();
        var toIndexedObject = requireToIndexedObject();
        var toPropertyKey = requireToPropertyKey();
        var $toString = requireToString();
        var createPropertyDescriptor = requireCreatePropertyDescriptor();
        var nativeObjectCreate = requireObjectCreate();
        var objectKeys = requireObjectKeys();
        var getOwnPropertyNamesModule = requireObjectGetOwnPropertyNames();
        var getOwnPropertyNamesExternal = requireObjectGetOwnPropertyNamesExternal();
        var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
        var getOwnPropertyDescriptorModule = requireObjectGetOwnPropertyDescriptor();
        var definePropertyModule = requireObjectDefineProperty();
        var definePropertiesModule = requireObjectDefineProperties();
        var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
        var defineBuiltIn = requireDefineBuiltIn();
        var defineBuiltInAccessor = requireDefineBuiltInAccessor();
        var shared = requireShared();
        var sharedKey = requireSharedKey();
        var hiddenKeys = requireHiddenKeys();
        var uid = requireUid();
        var wellKnownSymbol = requireWellKnownSymbol();
        var wrappedWellKnownSymbolModule = requireWellKnownSymbolWrapped();
        var defineWellKnownSymbol = requireWellKnownSymbolDefine();
        var defineSymbolToPrimitive = requireSymbolDefineToPrimitive();
        var setToStringTag = requireSetToStringTag();
        var InternalStateModule = requireInternalState();
        var $forEach = requireArrayIteration().forEach;
        var HIDDEN = sharedKey("hidden");
        var SYMBOL = "Symbol";
        var PROTOTYPE = "prototype";
        var setInternalState = InternalStateModule.set;
        var getInternalState = InternalStateModule.getterFor(SYMBOL);
        var ObjectPrototype = Object[PROTOTYPE];
        var $Symbol = globalThis.Symbol;
        var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
        var RangeError = globalThis.RangeError;
        var TypeError = globalThis.TypeError;
        var QObject = globalThis.QObject;
        var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
        var nativeDefineProperty = definePropertyModule.f;
        var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
        var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
        var push = uncurryThis([].push);
        var AllSymbols = shared("symbols");
        var ObjectPrototypeSymbols = shared("op-symbols");
        var WellKnownSymbolsStore = shared("wks");
        var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
        var fallbackDefineProperty = function(O, P, Attributes) {
            var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
            if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
            nativeDefineProperty(O, P, Attributes);
            if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
                nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
            }
        };
        var setSymbolDescriptor = DESCRIPTORS && fails(function() {
            return nativeObjectCreate(nativeDefineProperty({}, "a", {
                get: function() {
                    return nativeDefineProperty(this, "a", {
                        value: 7
                    }).a;
                }
            })).a !== 7;
        }) ? fallbackDefineProperty : nativeDefineProperty;
        var wrap = function(tag, description) {
            var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
            setInternalState(symbol, {
                type: SYMBOL,
                tag: tag,
                description: description
            });
            if (!DESCRIPTORS) symbol.description = description;
            return symbol;
        };
        var $defineProperty = function defineProperty(O, P, Attributes) {
            if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
            anObject(O);
            var key = toPropertyKey(P);
            anObject(Attributes);
            if (hasOwn(AllSymbols, key)) {
                if (!Attributes.enumerable) {
                    if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, nativeObjectCreate(null)));
                    O[HIDDEN][key] = true;
                } else {
                    if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
                    Attributes = nativeObjectCreate(Attributes, {
                        enumerable: createPropertyDescriptor(0, false)
                    });
                }
                return setSymbolDescriptor(O, key, Attributes);
            }
            return nativeDefineProperty(O, key, Attributes);
        };
        var $defineProperties = function defineProperties(O, Properties) {
            anObject(O);
            var properties = toIndexedObject(Properties);
            var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
            $forEach(keys, function(key) {
                if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
            });
            return O;
        };
        var $create = function create(O, Properties) {
            return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
        };
        var $propertyIsEnumerable = function propertyIsEnumerable(V) {
            var P = toPropertyKey(V);
            var enumerable = call(nativePropertyIsEnumerable, this, P);
            if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
            return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
        };
        var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
            var it = toIndexedObject(O);
            var key = toPropertyKey(P);
            if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
            var descriptor = nativeGetOwnPropertyDescriptor(it, key);
            if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
                descriptor.enumerable = true;
            }
            return descriptor;
        };
        var $getOwnPropertyNames = function getOwnPropertyNames(O) {
            var names = nativeGetOwnPropertyNames(toIndexedObject(O));
            var result = [];
            $forEach(names, function(key) {
                if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);
            });
            return result;
        };
        var $getOwnPropertySymbols = function(O) {
            var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
            var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
            var result = [];
            $forEach(names, function(key) {
                if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
                    push(result, AllSymbols[key]);
                }
            });
            return result;
        };
        if (!NATIVE_SYMBOL) {
            $Symbol = function Symbol() {
                if (isPrototypeOf(SymbolPrototype, this)) throw new TypeError("Symbol is not a constructor");
                var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
                var tag = uid(description);
                var setter = function(value) {
                    var $this = this === undefined ? globalThis : this;
                    if ($this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
                    if (hasOwn($this, HIDDEN) && hasOwn($this[HIDDEN], tag)) $this[HIDDEN][tag] = false;
                    var descriptor = createPropertyDescriptor(1, value);
                    try {
                        setSymbolDescriptor($this, tag, descriptor);
                    } catch (error) {
                        if (!(error instanceof RangeError)) throw error;
                        fallbackDefineProperty($this, tag, descriptor);
                    }
                };
                if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
                    configurable: true,
                    set: setter
                });
                return wrap(tag, description);
            };
            SymbolPrototype = $Symbol[PROTOTYPE];
            defineBuiltIn(SymbolPrototype, "toString", function toString() {
                return getInternalState(this).tag;
            });
            defineBuiltIn($Symbol, "withoutSetter", function(description) {
                return wrap(uid(description), description);
            });
            propertyIsEnumerableModule.f = $propertyIsEnumerable;
            definePropertyModule.f = $defineProperty;
            definePropertiesModule.f = $defineProperties;
            getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
            getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
            getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;
            wrappedWellKnownSymbolModule.f = function(name) {
                return wrap(wellKnownSymbol(name), name);
            };
            if (DESCRIPTORS) {
                defineBuiltInAccessor(SymbolPrototype, "description", {
                    configurable: true,
                    get: function description() {
                        return getInternalState(this).description;
                    }
                });
                if (!IS_PURE) {
                    defineBuiltIn(ObjectPrototype, "propertyIsEnumerable", $propertyIsEnumerable, {
                        unsafe: true
                    });
                }
            }
        }
        $({
            global: true,
            constructor: true,
            wrap: true,
            forced: !NATIVE_SYMBOL,
            sham: !NATIVE_SYMBOL
        }, {
            Symbol: $Symbol
        });
        $forEach(objectKeys(WellKnownSymbolsStore), function(name) {
            defineWellKnownSymbol(name);
        });
        $({
            target: SYMBOL,
            stat: true,
            forced: !NATIVE_SYMBOL
        }, {
            useSetter: function() {
                USE_SETTER = true;
            },
            useSimple: function() {
                USE_SETTER = false;
            }
        });
        $({
            target: "Object",
            stat: true,
            forced: !NATIVE_SYMBOL,
            sham: !DESCRIPTORS
        }, {
            create: $create,
            defineProperty: $defineProperty,
            defineProperties: $defineProperties,
            getOwnPropertyDescriptor: $getOwnPropertyDescriptor
        });
        $({
            target: "Object",
            stat: true,
            forced: !NATIVE_SYMBOL
        }, {
            getOwnPropertyNames: $getOwnPropertyNames
        });
        defineSymbolToPrimitive();
        setToStringTag($Symbol, SYMBOL);
        hiddenKeys[HIDDEN] = true;
        return es_symbol_constructor;
    }
    var es_symbol_for = {};
    var symbolRegistryDetection;
    var hasRequiredSymbolRegistryDetection;
    function requireSymbolRegistryDetection() {
        if (hasRequiredSymbolRegistryDetection) return symbolRegistryDetection;
        hasRequiredSymbolRegistryDetection = 1;
        var NATIVE_SYMBOL = requireSymbolConstructorDetection();
        symbolRegistryDetection = NATIVE_SYMBOL && !!Symbol["for"] && !!Symbol.keyFor;
        return symbolRegistryDetection;
    }
    var hasRequiredEs_symbol_for;
    function requireEs_symbol_for() {
        if (hasRequiredEs_symbol_for) return es_symbol_for;
        hasRequiredEs_symbol_for = 1;
        var $ = require_export();
        var getBuiltIn = requireGetBuiltIn();
        var hasOwn = requireHasOwnProperty();
        var toString = requireToString();
        var shared = requireShared();
        var NATIVE_SYMBOL_REGISTRY = requireSymbolRegistryDetection();
        var StringToSymbolRegistry = shared("string-to-symbol-registry");
        var SymbolToStringRegistry = shared("symbol-to-string-registry");
        $({
            target: "Symbol",
            stat: true,
            forced: !NATIVE_SYMBOL_REGISTRY
        }, {
            for: function(key) {
                var string = toString(key);
                if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
                var symbol = getBuiltIn("Symbol")(string);
                StringToSymbolRegistry[string] = symbol;
                SymbolToStringRegistry[symbol] = string;
                return symbol;
            }
        });
        return es_symbol_for;
    }
    var es_symbol_keyFor = {};
    var hasRequiredEs_symbol_keyFor;
    function requireEs_symbol_keyFor() {
        if (hasRequiredEs_symbol_keyFor) return es_symbol_keyFor;
        hasRequiredEs_symbol_keyFor = 1;
        var $ = require_export();
        var hasOwn = requireHasOwnProperty();
        var isSymbol = requireIsSymbol();
        var tryToString = requireTryToString();
        var shared = requireShared();
        var NATIVE_SYMBOL_REGISTRY = requireSymbolRegistryDetection();
        var SymbolToStringRegistry = shared("symbol-to-string-registry");
        $({
            target: "Symbol",
            stat: true,
            forced: !NATIVE_SYMBOL_REGISTRY
        }, {
            keyFor: function keyFor(sym) {
                if (!isSymbol(sym)) throw new TypeError(tryToString(sym) + " is not a symbol");
                if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
            }
        });
        return es_symbol_keyFor;
    }
    var es_json_stringify = {};
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
    var isRawJson;
    var hasRequiredIsRawJson;
    function requireIsRawJson() {
        if (hasRequiredIsRawJson) return isRawJson;
        hasRequiredIsRawJson = 1;
        var isObject = requireIsObject();
        var getInternalState = requireInternalState().get;
        isRawJson = function isRawJSON(O) {
            if (!isObject(O)) return false;
            var state = getInternalState(O);
            return !!state && state.type === "RawJSON";
        };
        return isRawJson;
    }
    var parseJsonString;
    var hasRequiredParseJsonString;
    function requireParseJsonString() {
        if (hasRequiredParseJsonString) return parseJsonString;
        hasRequiredParseJsonString = 1;
        var uncurryThis = requireFunctionUncurryThis();
        var hasOwn = requireHasOwnProperty();
        var $SyntaxError = SyntaxError;
        var $parseInt = parseInt;
        var fromCharCode = String.fromCharCode;
        var at = uncurryThis("".charAt);
        var slice = uncurryThis("".slice);
        var exec = uncurryThis(/./.exec);
        var codePoints = {
            '\\"': '"',
            "\\\\": "\\",
            "\\/": "/",
            "\\b": "\b",
            "\\f": "\f",
            "\\n": "\n",
            "\\r": "\r",
            "\\t": "\t"
        };
        var IS_4_HEX_DIGITS = /^[\da-f]{4}$/i;
        var IS_C0_CONTROL_CODE = /^[\u0000-\u001F]$/;
        parseJsonString = function(source, i) {
            var unterminated = true;
            var value = "";
            while (i < source.length) {
                var chr = at(source, i);
                if (chr === "\\") {
                    var twoChars = slice(source, i, i + 2);
                    if (hasOwn(codePoints, twoChars)) {
                        value += codePoints[twoChars];
                        i += 2;
                    } else if (twoChars === "\\u") {
                        i += 2;
                        var fourHexDigits = slice(source, i, i + 4);
                        if (!exec(IS_4_HEX_DIGITS, fourHexDigits)) throw new $SyntaxError("Bad Unicode escape at: " + i);
                        value += fromCharCode($parseInt(fourHexDigits, 16));
                        i += 4;
                    } else throw new $SyntaxError('Unknown escape sequence: "' + twoChars + '"');
                } else if (chr === '"') {
                    unterminated = false;
                    i++;
                    break;
                } else {
                    if (exec(IS_C0_CONTROL_CODE, chr)) throw new $SyntaxError("Bad control character in string literal at: " + i);
                    value += chr;
                    i++;
                }
            }
            if (unterminated) throw new $SyntaxError("Unterminated string at: " + i);
            return {
                value: value,
                end: i
            };
        };
        return parseJsonString;
    }
    var nativeRawJson;
    var hasRequiredNativeRawJson;
    function requireNativeRawJson() {
        if (hasRequiredNativeRawJson) return nativeRawJson;
        hasRequiredNativeRawJson = 1;
        var fails = requireFails();
        nativeRawJson = !fails(function() {
            var unsafeInt = "9007199254740993";
            var raw = JSON.rawJSON(unsafeInt);
            return !JSON.isRawJSON(raw) || JSON.stringify(raw) !== unsafeInt;
        });
        return nativeRawJson;
    }
    var hasRequiredEs_json_stringify;
    function requireEs_json_stringify() {
        if (hasRequiredEs_json_stringify) return es_json_stringify;
        hasRequiredEs_json_stringify = 1;
        var $ = require_export();
        var getBuiltIn = requireGetBuiltIn();
        var apply = requireFunctionApply();
        var call = requireFunctionCall();
        var uncurryThis = requireFunctionUncurryThis();
        var fails = requireFails();
        var isArray = requireIsArray();
        var isCallable = requireIsCallable();
        var isRawJSON = requireIsRawJson();
        var isSymbol = requireIsSymbol();
        var classof = requireClassofRaw();
        var toString = requireToString();
        var arraySlice = requireArraySlice();
        var parseJSONString = requireParseJsonString();
        var uid = requireUid();
        var NATIVE_SYMBOL = requireSymbolConstructorDetection();
        var NATIVE_RAW_JSON = requireNativeRawJson();
        var $String = String;
        var $stringify = getBuiltIn("JSON", "stringify");
        var exec = uncurryThis(/./.exec);
        var charAt = uncurryThis("".charAt);
        var charCodeAt = uncurryThis("".charCodeAt);
        var replace = uncurryThis("".replace);
        var slice = uncurryThis("".slice);
        var push = uncurryThis([].push);
        var numberToString = uncurryThis(1.1.toString);
        var surrogates = /[\uD800-\uDFFF]/g;
        var lowSurrogates = /^[\uD800-\uDBFF]$/;
        var hiSurrogates = /^[\uDC00-\uDFFF]$/;
        var MARK = uid();
        var MARK_LENGTH = MARK.length;
        var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function() {
            var symbol = getBuiltIn("Symbol")("stringify detection");
            return $stringify([ symbol ]) !== "[null]" || $stringify({
                a: symbol
            }) !== "{}" || $stringify(Object(symbol)) !== "{}";
        });
        var ILL_FORMED_UNICODE = fails(function() {
            return $stringify("\udf06\ud834") !== '"\\udf06\\ud834"' || $stringify("\udead") !== '"\\udead"';
        });
        var stringifyWithProperSymbolsConversion = WRONG_SYMBOLS_CONVERSION ? function(it, replacer) {
            var args = arraySlice(arguments);
            var $replacer = getReplacerFunction(replacer);
            if (!isCallable($replacer) && (it === undefined || isSymbol(it))) return;
            args[1] = function(key, value) {
                if (isCallable($replacer)) value = call($replacer, this, $String(key), value);
                if (!isSymbol(value)) return value;
            };
            return apply($stringify, null, args);
        } : $stringify;
        var fixIllFormedJSON = function(match, offset, string) {
            var prev = charAt(string, offset - 1);
            var next = charAt(string, offset + 1);
            if (exec(lowSurrogates, match) && !exec(hiSurrogates, next) || exec(hiSurrogates, match) && !exec(lowSurrogates, prev)) {
                return "\\u" + numberToString(charCodeAt(match, 0), 16);
            }
            return match;
        };
        var getReplacerFunction = function(replacer) {
            if (isCallable(replacer)) return replacer;
            if (!isArray(replacer)) return;
            var rawLength = replacer.length;
            var keys = [];
            for (var i = 0; i < rawLength; i++) {
                var element = replacer[i];
                if (typeof element == "string") push(keys, element); else if (typeof element == "number" || classof(element) === "Number" || classof(element) === "String") push(keys, toString(element));
            }
            var keysLength = keys.length;
            var root = true;
            return function(key, value) {
                if (root) {
                    root = false;
                    return value;
                }
                if (isArray(this)) return value;
                for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
            };
        };
        if ($stringify) $({
            target: "JSON",
            stat: true,
            arity: 3,
            forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE || !NATIVE_RAW_JSON
        }, {
            stringify: function stringify(text, replacer, space) {
                var replacerFunction = getReplacerFunction(replacer);
                var rawStrings = [];
                var json = stringifyWithProperSymbolsConversion(text, function(key, value) {
                    var v = isCallable(replacerFunction) ? call(replacerFunction, this, $String(key), value) : value;
                    return !NATIVE_RAW_JSON && isRawJSON(v) ? MARK + (push(rawStrings, v.rawJSON) - 1) : v;
                }, space);
                if (typeof json != "string") return json;
                if (ILL_FORMED_UNICODE) json = replace(json, surrogates, fixIllFormedJSON);
                if (NATIVE_RAW_JSON) return json;
                var result = "";
                var length = json.length;
                for (var i = 0; i < length; i++) {
                    var chr = charAt(json, i);
                    if (chr === '"') {
                        var end = parseJSONString(json, ++i).end - 1;
                        var string = slice(json, i, end);
                        result += slice(string, 0, MARK_LENGTH) === MARK ? rawStrings[slice(string, MARK_LENGTH)] : '"' + string + '"';
                        i = end;
                    } else result += chr;
                }
                return result;
            }
        });
        return es_json_stringify;
    }
    var es_object_getOwnPropertySymbols = {};
    var hasRequiredEs_object_getOwnPropertySymbols;
    function requireEs_object_getOwnPropertySymbols() {
        if (hasRequiredEs_object_getOwnPropertySymbols) return es_object_getOwnPropertySymbols;
        hasRequiredEs_object_getOwnPropertySymbols = 1;
        var $ = require_export();
        var NATIVE_SYMBOL = requireSymbolConstructorDetection();
        var fails = requireFails();
        var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
        var toObject = requireToObject();
        var FORCED = !NATIVE_SYMBOL || fails(function() {
            getOwnPropertySymbolsModule.f(1);
        });
        $({
            target: "Object",
            stat: true,
            forced: FORCED
        }, {
            getOwnPropertySymbols: function getOwnPropertySymbols(it) {
                var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
                return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject(it)) : [];
            }
        });
        return es_object_getOwnPropertySymbols;
    }
    var hasRequiredEs_symbol;
    function requireEs_symbol() {
        if (hasRequiredEs_symbol) return es_symbol;
        hasRequiredEs_symbol = 1;
        requireEs_symbol_constructor();
        requireEs_symbol_for();
        requireEs_symbol_keyFor();
        requireEs_json_stringify();
        requireEs_object_getOwnPropertySymbols();
        return es_symbol;
    }
    requireEs_symbol();
    var es_symbol_description = {};
    var hasRequiredEs_symbol_description;
    function requireEs_symbol_description() {
        if (hasRequiredEs_symbol_description) return es_symbol_description;
        hasRequiredEs_symbol_description = 1;
        var $ = require_export();
        var DESCRIPTORS = requireDescriptors();
        var globalThis = requireGlobalThis();
        var uncurryThis = requireFunctionUncurryThis();
        var hasOwn = requireHasOwnProperty();
        var isCallable = requireIsCallable();
        var isPrototypeOf = requireObjectIsPrototypeOf();
        var toString = requireToString();
        var defineBuiltInAccessor = requireDefineBuiltInAccessor();
        var copyConstructorProperties = requireCopyConstructorProperties();
        var NativeSymbol = globalThis.Symbol;
        var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;
        if (DESCRIPTORS && isCallable(NativeSymbol) && (!("description" in SymbolPrototype) || NativeSymbol().description !== undefined)) {
            var EmptyStringDescriptionStore = {};
            var SymbolWrapper = function Symbol() {
                var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
                var result = isPrototypeOf(SymbolPrototype, this) ? new NativeSymbol(description) : description === undefined ? NativeSymbol() : NativeSymbol(description);
                if (description === "") EmptyStringDescriptionStore[result] = true;
                return result;
            };
            copyConstructorProperties(SymbolWrapper, NativeSymbol);
            SymbolWrapper.prototype = SymbolPrototype;
            SymbolPrototype.constructor = SymbolWrapper;
            var NATIVE_SYMBOL = String(NativeSymbol("description detection")) === "Symbol(description detection)";
            var thisSymbolValue = uncurryThis(SymbolPrototype.valueOf);
            var symbolDescriptiveString = uncurryThis(SymbolPrototype.toString);
            var regexp = /^Symbol\((.*)\)[^)]+$/;
            var replace = uncurryThis("".replace);
            var stringSlice = uncurryThis("".slice);
            defineBuiltInAccessor(SymbolPrototype, "description", {
                configurable: true,
                get: function description() {
                    var symbol = thisSymbolValue(this);
                    if (hasOwn(EmptyStringDescriptionStore, symbol)) return "";
                    var string = symbolDescriptiveString(symbol);
                    var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, "$1");
                    return desc === "" ? undefined : desc;
                }
            });
            $({
                global: true,
                constructor: true,
                forced: true
            }, {
                Symbol: SymbolWrapper
            });
        }
        return es_symbol_description;
    }
    requireEs_symbol_description();
    var es_array_find = {};
    var hasRequiredEs_array_find;
    function requireEs_array_find() {
        if (hasRequiredEs_array_find) return es_array_find;
        hasRequiredEs_array_find = 1;
        var $ = require_export();
        var $find = requireArrayIteration().find;
        var addToUnscopables = requireAddToUnscopables();
        var FIND = "find";
        var SKIPS_HOLES = true;
        if (FIND in []) Array(1)[FIND](function() {
            SKIPS_HOLES = false;
        });
        $({
            target: "Array",
            proto: true,
            forced: SKIPS_HOLES
        }, {
            find: function find(callbackfn) {
                return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
            }
        });
        addToUnscopables(FIND);
        return es_array_find;
    }
    requireEs_array_find();
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
    var es_array_map = {};
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
    var es_array_sort = {};
    var arraySort;
    var hasRequiredArraySort;
    function requireArraySort() {
        if (hasRequiredArraySort) return arraySort;
        hasRequiredArraySort = 1;
        var arraySlice = requireArraySlice();
        var floor = Math.floor;
        var sort = function(array, comparefn) {
            var length = array.length;
            if (length < 8) {
                var i = 1;
                var element, j;
                while (i < length) {
                    j = i;
                    element = array[i];
                    while (j && comparefn(array[j - 1], element) > 0) {
                        array[j] = array[--j];
                    }
                    if (j !== i++) array[j] = element;
                }
            } else {
                var middle = floor(length / 2);
                var left = sort(arraySlice(array, 0, middle), comparefn);
                var right = sort(arraySlice(array, middle), comparefn);
                var llength = left.length;
                var rlength = right.length;
                var lindex = 0;
                var rindex = 0;
                while (lindex < llength || rindex < rlength) {
                    array[lindex + rindex] = lindex < llength && rindex < rlength ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++] : lindex < llength ? left[lindex++] : right[rindex++];
                }
            }
            return array;
        };
        arraySort = sort;
        return arraySort;
    }
    var environmentFfVersion;
    var hasRequiredEnvironmentFfVersion;
    function requireEnvironmentFfVersion() {
        if (hasRequiredEnvironmentFfVersion) return environmentFfVersion;
        hasRequiredEnvironmentFfVersion = 1;
        var userAgent = requireEnvironmentUserAgent();
        var firefox = userAgent.match(/firefox\/(\d+)/i);
        environmentFfVersion = !!firefox && +firefox[1];
        return environmentFfVersion;
    }
    var environmentIsIeOrEdge;
    var hasRequiredEnvironmentIsIeOrEdge;
    function requireEnvironmentIsIeOrEdge() {
        if (hasRequiredEnvironmentIsIeOrEdge) return environmentIsIeOrEdge;
        hasRequiredEnvironmentIsIeOrEdge = 1;
        var UA = requireEnvironmentUserAgent();
        environmentIsIeOrEdge = /MSIE|Trident/.test(UA);
        return environmentIsIeOrEdge;
    }
    var environmentWebkitVersion;
    var hasRequiredEnvironmentWebkitVersion;
    function requireEnvironmentWebkitVersion() {
        if (hasRequiredEnvironmentWebkitVersion) return environmentWebkitVersion;
        hasRequiredEnvironmentWebkitVersion = 1;
        var userAgent = requireEnvironmentUserAgent();
        var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);
        environmentWebkitVersion = !!webkit && +webkit[1];
        return environmentWebkitVersion;
    }
    var hasRequiredEs_array_sort;
    function requireEs_array_sort() {
        if (hasRequiredEs_array_sort) return es_array_sort;
        hasRequiredEs_array_sort = 1;
        var $ = require_export();
        var uncurryThis = requireFunctionUncurryThis();
        var aCallable = requireACallable();
        var toObject = requireToObject();
        var lengthOfArrayLike = requireLengthOfArrayLike();
        var deletePropertyOrThrow = requireDeletePropertyOrThrow();
        var toString = requireToString();
        var fails = requireFails();
        var internalSort = requireArraySort();
        var arrayMethodIsStrict = requireArrayMethodIsStrict();
        var FF = requireEnvironmentFfVersion();
        var IE_OR_EDGE = requireEnvironmentIsIeOrEdge();
        var V8 = requireEnvironmentV8Version();
        var WEBKIT = requireEnvironmentWebkitVersion();
        var test = [];
        var nativeSort = uncurryThis(test.sort);
        var push = uncurryThis(test.push);
        var FAILS_ON_UNDEFINED = fails(function() {
            test.sort(undefined);
        });
        var FAILS_ON_NULL = fails(function() {
            test.sort(null);
        });
        var STRICT_METHOD = arrayMethodIsStrict("sort");
        var STABLE_SORT = !fails(function() {
            if (V8) return V8 < 70;
            if (FF && FF > 3) return;
            if (IE_OR_EDGE) return true;
            if (WEBKIT) return WEBKIT < 603;
            var result = "";
            var code, chr, value, index;
            for (code = 65; code < 76; code++) {
                chr = String.fromCharCode(code);
                switch (code) {
                  case 66:
                  case 69:
                  case 70:
                  case 72:
                    value = 3;
                    break;

                  case 68:
                  case 71:
                    value = 4;
                    break;

                  default:
                    value = 2;
                }
                for (index = 0; index < 47; index++) {
                    test.push({
                        k: chr + index,
                        v: value
                    });
                }
            }
            test.sort(function(a, b) {
                return b.v - a.v;
            });
            for (index = 0; index < test.length; index++) {
                chr = test[index].k.charAt(0);
                if (result.charAt(result.length - 1) !== chr) result += chr;
            }
            return result !== "DGBEFHACIJK";
        });
        var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;
        var getSortCompare = function(comparefn) {
            return function(x, y) {
                if (y === undefined) return -1;
                if (x === undefined) return 1;
                if (comparefn !== undefined) return +comparefn(x, y) || 0;
                return toString(x) > toString(y) ? 1 : -1;
            };
        };
        $({
            target: "Array",
            proto: true,
            forced: FORCED
        }, {
            sort: function sort(comparefn) {
                if (comparefn !== undefined) aCallable(comparefn);
                var array = toObject(this);
                if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);
                var items = [];
                var arrayLength = lengthOfArrayLike(array);
                var itemsLength, index;
                for (index = 0; index < arrayLength; index++) {
                    if (index in array) push(items, array[index]);
                }
                internalSort(items, getSortCompare(comparefn));
                itemsLength = lengthOfArrayLike(items);
                index = 0;
                while (index < itemsLength) array[index] = items[index++];
                while (index < arrayLength) deletePropertyOrThrow(array, index++);
                return array;
            }
        });
        return es_array_sort;
    }
    requireEs_array_sort();
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
    var _SelectBox_brand = new WeakSet;
    var SelectBox = function() {
        function SelectBox(_selectbox, _options) {
            var _this = this;
            _classCallCheck(this, SelectBox);
            _classPrivateMethodInitSpec(this, _SelectBox_brand);
            if (typeof _selectbox === "string") {
                var temp = document.getElementById(_selectbox);
                if (temp instanceof HTMLSelectElement) {
                    _selectbox = temp;
                } else if (temp instanceof HTMLElement) {
                    this._container = temp;
                } else {
                    throw new Error("Invalid selectbox");
                }
            } else if (_selectbox instanceof HTMLElement) {
                this._container = _selectbox;
            }
            if (_selectbox instanceof HTMLSelectElement) {
                this._selectbox = _selectbox;
                this._container = document.createElement("div");
            } else if (this._container instanceof HTMLElement === false) {
                throw new Error("Invalid container");
            }
            this._options = Object.assign(_options, {
                placeholder: _options.placeholder || "Select...",
                searchable: _options.searchable || false,
                sortable: _options.sortable || false,
                multiple: _options.multiple || false,
                description: _options.description || ""
            });
            this._selectedValues = new Set;
            this.isOpen = false;
            this._items = [];
            this._customItems = [];
            this._subscribers = [];
            this._boundHandles = {
                toggle: function toggle(e) {
                    _assertClassBrand(_SelectBox_brand, _this, _toggle).call(_this, e);
                },
                search: function search(e) {
                    _assertClassBrand(_SelectBox_brand, _this, _handleSearch).call(_this, e);
                },
                close: function close(e) {
                    if (e.target instanceof HTMLElement && !_this._container.contains(e.target) && !e.target.classList.contains("selectbox-option")) {
                        _assertClassBrand(_SelectBox_brand, _this, _closeDropdown).call(_this);
                    }
                },
                keydown: function keydown(e) {
                    _assertClassBrand(_SelectBox_brand, _this, _handleKeydown).call(_this, e);
                },
                dropdownClick: function dropdownClick(e) {
                    _assertClassBrand(_SelectBox_brand, _this, _handleDropdownClick).call(_this, e);
                }
            };
            this._optionsContainer = null;
            this.searchInput = null;
            this._select = document.createElement("div");
            this._header = document.createElement("div");
            this._selectedText = document.createElement("span");
            this._arrow = document.createElement("span");
            this._dropdown = document.createElement("div");
            _assertClassBrand(_SelectBox_brand, this, _createDOM).call(this);
            _assertClassBrand(_SelectBox_brand, this, _bindEvents).call(this);
            _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this);
            _instances._.add(this);
        }
        return _createClass(SelectBox, [ {
            key: "openDropdown",
            value: function openDropdown() {
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
                _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this);
            }
        }, {
            key: "subscribe",
            value: function subscribe(callback) {
                var self = this;
                this._subscribers.push(callback);
                return {
                    unsubscribe: function unsubscribe() {
                        self._subscribers = self._subscribers.filter(function(cb) {
                            return cb !== callback;
                        });
                    }
                };
            }
        }, {
            key: "addItem",
            value: function addItem(value, text, selected) {
                selected = selected || false;
                var bHasItem = this._items.some(function(item) {
                    return item && item.value === value;
                });
                if (bHasItem) {
                    var item = this._items.find(function(item) {
                        return item && item.value === value;
                    });
                    if (item) item.selected = selected;
                } else {
                    this._items.push({
                        value: value,
                        text: text,
                        selected: selected
                    });
                    if (this._options.sortable) {
                        this._items.sort(function(a, b) {
                            return !!a && !!b ? a.text.localeCompare(b.text) : !!a ? -1 : !!b ? 1 : 0;
                        });
                    }
                }
                if (selected) {
                    if (this._options.multiple) {
                        this._selectedValues.add(value);
                    } else {
                        this._selectedValues.clear();
                        this._selectedValues.add(value);
                    }
                }
                _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
            }
        }, {
            key: "addItems",
            value: function addItems(values, selectedValue) {
                var self = this;
                values.forEach(function(pair, index) {
                    var bHasItem = self._items.some(function(item) {
                        return item && item.value === pair[0];
                    });
                    if (bHasItem) return;
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
                if (this.isOpen) {
                    _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this);
                }
                _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
            }
        }, {
            key: "addCustomItem",
            value: function addCustomItem(value, text) {
                this._customItems.push({
                    value: value,
                    text: text,
                    selected: false
                });
            }
        }, {
            key: "addSeparator",
            value: function addSeparator() {
                this._items.push(null);
            }
        }, {
            key: "removeItem",
            value: function removeItem(value) {
                this._items = this._items.filter(function(item) {
                    if (item === null || item.value !== value) {
                        return true;
                    }
                    return false;
                });
                this._customItems = this._customItems.filter(function(item) {
                    if (item === null || item.value !== value) {
                        return true;
                    }
                    return false;
                });
                this._selectedValues.delete(value);
                _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
            }
        }, {
            key: "getSelectedValue",
            value: function getSelectedValue() {
                if (this._options.multiple) {
                    console.error("Method getSelectedValue is only available for single-select boxes.");
                    return null;
                } else {
                    var values = Array.from(this._selectedValues);
                    return values.length > 0 ? values[0] : null;
                }
            }
        }, {
            key: "getSelectedValues",
            value: function getSelectedValues() {
                if (this._options.multiple) {
                    return Array.from(this._selectedValues);
                } else {
                    var values = Array.from(this._selectedValues);
                    return values.length > 0 ? values[0] : null;
                }
            }
        }, {
            key: "selectItems",
            value: function selectItems(values, bSilent) {
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
                                option.classList.add("checkbox--checked");
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
                            option.classList.remove("checkbox--checked");
                        });
                        var option = this._optionsContainer.querySelector('[data-value="' + value + '"]');
                        if (option) {
                            option.classList.add("selectbox-option-selected");
                            option.classList.add("checkbox--checked");
                        }
                    }
                    _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
                }
                _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
                if (bSilent) {
                    return;
                }
                _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, value, true);
            }
        }, {
            key: "unselectItems",
            value: function unselectItems(values, bSilent) {
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
                            option.classList.remove("checkbox--checked");
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
                _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
                if (bSilent) {
                    return;
                }
                _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, value, true);
            }
        }, {
            key: "disable",
            value: function disable() {
                this._select.classList.add("selectbox-disabled");
            }
        }, {
            key: "enable",
            value: function enable() {
                this._select.classList.remove("selectbox-disabled");
            }
        }, {
            key: "clear",
            value: function clear(bSelectFirst) {
                bSelectFirst = bSelectFirst || false;
                this._selectedValues.clear();
                if (bSelectFirst && this._items.length > 0) {
                    var firstItem = this._items[0];
                    if (firstItem) {
                        this._selectedValues.add(firstItem.value);
                    }
                }
                _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
                _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this);
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this._subscribers = [];
                _instances._.delete(this);
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
            }
        } ]);
    }();
    function _createDOM() {
        this._container.innerHTML = "";
        this._container.className += " selectbox-container";
        var fragment = document.createDocumentFragment();
        this._select.className += " selectbox";
        if (this._options.multiple) {
            this._select.className += " selectbox-multiple";
        }
        fragment.appendChild(this._select);
        this._header.className += " selectbox-header";
        this._select.appendChild(this._header);
        this._header.setAttribute("tabindex", "0");
        this._selectedText.className += " selectbox-selected-text";
        this._selectedText.textContent = this._options.placeholder;
        this._header.appendChild(this._selectedText);
        this._arrow.className += " selectbox-arrow";
        this._arrow.innerHTML = "<b></b>";
        this._header.appendChild(this._arrow);
        this._dropdown.className += " selectbox-dropdown";
        this._select.appendChild(this._dropdown);
        if (this._options.description) {
            var description = document.createElement("div");
            description.className += " i18n selectbox-description";
            description.textContent = this._options.description;
            this._dropdown.appendChild(description);
        }
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
        if (this._selectbox) {
            var parent = this._selectbox.parentNode;
            if (parent) {
                parent.insertBefore(this._container, this._selectbox);
                var options = _assertClassBrand(_SelectBox_brand, this, _extractOptions).call(this, this._selectbox);
                this.addItems(options.values, options.selectedValue);
                this._selectbox.remove();
            }
        }
    }
    function _bindEvents() {
        this._header.addEventListener("click", this._boundHandles.toggle);
        if (this.searchInput) {
            this.searchInput.addEventListener("input", this._boundHandles.search);
        }
        this._dropdown.addEventListener("click", this._boundHandles.dropdownClick);
        this._dropdown.addEventListener("wheel", function(e) {
            e.stopPropagation();
        });
        this._header.addEventListener("keydown", this._boundHandles.keydown);
        this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
    }
    function _toggle(e) {
        e && e.stopPropagation();
        this.isOpen ? _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this) : this.openDropdown();
        if (e && e.type === "click") {
            var _iterator = _createForOfIteratorHelper(_instances._), _step;
            try {
                for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                    var selBox = _step.value;
                    if (selBox.isOpen && selBox !== this) {
                        _assertClassBrand(_SelectBox_brand, selBox, _closeDropdown).call(selBox);
                    }
                }
            } catch (err) {
                _iterator.e(err);
            } finally {
                _iterator.f();
            }
        }
    }
    function _closeDropdown() {
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
    }
    function _handleSearch(e) {
        var target = e.target;
        if (!(target instanceof HTMLInputElement)) {
            return;
        }
        var searchTerm = target.value.toLowerCase();
        _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this, searchTerm);
    }
    function _selectNextPrevItem(direction) {
        var searchTerm = this.searchInput ? this.searchInput.value.toLowerCase() : "";
        var newItem;
        var items = this._items.filter(function(item) {
            return item !== null;
        });
        if (searchTerm) {
            items = items.filter(function(item) {
                return item.text.toLowerCase().indexOf(searchTerm) !== -1;
            });
        }
        if (items.length === 0) {
            return;
        }
        if (direction === "up") {
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
        } else {
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
                if (nextIndex === items.length) {
                    nextIndex = 0;
                }
                this._selectedValues.clear();
                newItem = items[nextIndex];
                this._selectedValues.add(newItem.value);
            }
        }
        _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
        _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this, searchTerm, true);
        _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, newItem.value, true);
    }
    function _handleKeydown(e) {
        var key = e.key || e.keyCode;
        switch (key) {
          case "Enter":
          case 13:
            e.preventDefault();
            _assertClassBrand(_SelectBox_brand, this, _toggle).call(this, e);
            break;

          case "Escape":
          case 27:
            _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
            break;

          case "ArrowDown":
          case 40:
            e.preventDefault();
            _assertClassBrand(_SelectBox_brand, this, _selectNextPrevItem).call(this, "down");
            break;

          case "ArrowUp":
          case 38:
            e.preventDefault();
            _assertClassBrand(_SelectBox_brand, this, _selectNextPrevItem).call(this, "up");
            break;

          case "Tab":
          case 9:
            _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
            break;
        }
    }
    function _renderOptions(searchTerm, scrollIntoView) {
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
                option.className += " selectbox-option-selected checkbox--checked";
                selectedOption = option;
            }
            option.setAttribute("data-value", item.value);
            var label = document.createElement("label");
            label.className += " selectbox-option-text";
            label.textContent = item.text;
            if (this._options.multiple) {
                option.className += " selectbox-option-checkbox";
                var input = document.createElement("input");
                input.type = "checkbox";
                input.id = "checkbox-" + item.value;
                input.className += " selectbox-checkbox";
                input.checked = this._selectedValues.has(item.value);
                option.appendChild(input);
                var visualCheckbox = document.createElement("span");
                visualCheckbox.className = "checkbox-visual";
                visualCheckbox.setAttribute("aria-hidden", "true");
                var svgNS = "http://www.w3.org/2000/svg";
                var checkmarkSVG = document.createElementNS(svgNS, "svg");
                checkmarkSVG.setAttribute("viewBox", "0 0 10 8");
                checkmarkSVG.setAttribute("class", "checkbox-checkmark");
                var path = document.createElementNS(svgNS, "path");
                path.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116");
                path.setAttribute("fill", "none");
                path.setAttribute("stroke", "currentColor");
                path.setAttribute("stroke-width", "2");
                checkmarkSVG.appendChild(path);
                visualCheckbox.appendChild(checkmarkSVG);
                option.appendChild(visualCheckbox);
            }
            option.appendChild(label);
            fragment.appendChild(option);
        }
        if (this._customItems.length) {
            var _hr = document.createElement("hr");
            _hr.className += " selectbox-option-divider";
            fragment.appendChild(_hr);
        }
        for (var i = 0; i < this._customItems.length; i++) {
            var _item = this._customItems[i];
            var _option = document.createElement("label");
            _option.className += " selectbox-custom-option";
            _option.setAttribute("data-value", _item.value);
            _option.setAttribute("for", _item.value);
            var span = document.createElement("span");
            span.className += " selectbox-option-text";
            span.textContent = _item.text;
            _option.appendChild(span);
            fragment.appendChild(_option);
        }
        this._optionsContainer.appendChild(fragment);
        if (scrollIntoView && this.isOpen && this._optionsContainer && selectedOption) {
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
    }
    function _handleDropdownClick(e) {
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
                } else if (classList[i] === "selectbox-custom-option") {
                    var val = target.getAttribute("data-value");
                    if (val) {
                        e.stopPropagation();
                        _assertClassBrand(_SelectBox_brand, this, _triggerCustomChange).call(this, val);
                        _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
                        return;
                    }
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
                    } else if (parentClassList[i] === "selectbox-custom-option") {
                        var _val = target.parentNode.getAttribute("data-value");
                        if (_val) {
                            e.stopPropagation();
                            _assertClassBrand(_SelectBox_brand, this, _triggerCustomChange).call(this, _val);
                            _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
                            return;
                        }
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
            _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
        }
        _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
        _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, value, enabled);
    }
    function _updateSelectedText() {
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
    }
    function _triggerChange(currentValue, enabled) {
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
    }
    function _triggerCustomChange(currentValue) {
        var detail = {
            values: [],
            current: currentValue,
            enabled: false
        };
        this._subscribers.forEach(function(cb) {
            cb({
                type: "selectbox:custom",
                detail: detail
            });
        });
    }
    function _extractOptions(selectbox) {
        var options = Array.from(selectbox.options).map(function(option) {
            return [ option.value, option.text ];
        });
        var result = {
            values: options
        };
        var selectedValue = selectbox.value;
        if (selectedValue) result.selectedValue = selectedValue;
        return result;
    }
    var _instances = {
        _: new Set
    };
    ({
        _: document.getElementById("loader")
    });
    var LOCATOR_VALUES = [ [ "appendix", "Appendix" ], [ "article", "Article" ], [ "book", "Book" ], [ "chapter", "Chapter" ], [ "column", "Column" ], [ "figure", "Figure" ], [ "folio", "Folio" ], [ "issue", "Issue" ], [ "line", "Line" ], [ "note", "Note" ], [ "opus", "Opus" ], [ "page", "Page" ], [ "paragraph", "Paragraph" ], [ "part", "Part" ], [ "rule", "Rule" ], [ "section", "Section" ], [ "sub-verbo", "Sub verbo" ], [ "table", "Table" ], [ "title", "Title" ], [ "verses", "Verses" ], [ "volume", "Volume" ] ];
    var Theme = {
        addStylesForComponents: function addStylesForComponents(theme) {
            var styles = "";
            if (theme["background-toolbar"]) {
                styles += ".loader-body,\n" + ".loader-bg { background-color: " + theme["background-toolbar"] + "; }\n";
                styles += ".loader-body {     box-shadow: 0 0 99px 99px " + theme["background-toolbar"] + "; }\n";
            }
            if (theme["background-loader"]) {
                styles += ".loader-image { color: " + theme["background-loader"] + "; }\n";
            }
            if (theme["background-normal"]) {
                styles += ".custom-button-secondary-icon,\n" + ".custom-button-secondary,\n" + ".input-field-element,\n" + ".selectbox-search-input,\n" + ".selectbox-header,\n" + ".selectbox-dropdown,\n" + ".radio-visual, \n" + ".checkbox-visual, \n" + ".message { background-color: " + theme["background-normal"] + "; }\n";
            }
            if (theme["text-inverse"]) {
                styles += ".custom-button-primary { color: " + theme["text-inverse"] + "; }\n";
            }
            if (theme["border-regular-control"]) {
                styles += ".custom-button-icon-only:active:not(.custom-button-disabled),\n" + ".custom-button-secondary-icon:active:not(.custom-button-disabled),\n" + ".custom-button-secondary:active:not(.custom-button-disabled),\n" + ".custom-button-icon-only:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary-icon:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary,\n" + ".custom-button-secondary-icon,\n" + ".input-field-element,\n" + ".checkbox-visual,\n" + ".radio-visual,\n" + ".selectbox-header,\n" + ".selectbox-dropdown,\n" + ".selectbox-search-input:focus,\n" + ".message { border-color: " + theme["border-regular-control"] + "; }\n";
                styles += ".selectbox-search,\n" + ".selectbox-option-divider { border-color: " + theme["border-regular-control"] + " !important; }\n";
            }
            if (theme["border-error"]) {
                styles += ".input-field-invalid .input-field-element { border-color: " + theme["border-error"] + "; }\n";
            }
            if (theme["border-control-focus"]) {
                styles += ".custom-button-icon-only:focus:not(:active):not(:hover),\n" + ".custom-button-secondary-icon:focus:not(:active):not(:hover),\n" + ".custom-button-secondary:focus:not(:active):not(:hover),\n" + ".input-field-element:focus,\n" + ".input-field-focused .input-field-element,\n" + ".selectbox-header:active,\n" + ".selectbox-header:focus,\n" + ".selectbox-header-open { border-color: " + theme["border-control-focus"] + "; }\n";
            }
            if (theme["highlight-button-hover"]) {
                styles += ".custom-button-icon-only:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary-icon:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary:hover:not(.custom-button-disabled),\n" + ".selectbox-custom-option:hover,\n" + ".selectbox-option:hover { background-color: " + theme["highlight-button-hover"] + "; }\n";
            }
            if (theme["highlight-button-pressed"]) {
                styles += ".custom-button-icon-only:active:not(.custom-button-disabled),\n" + ".custom-button-secondary-icon:active:not(.custom-button-disabled),\n" + ".custom-button-secondary:active:not(.custom-button-disabled),\n" + ".selectbox-option-selected:hover,\n" + ".selectbox-option-selected { background-color: " + theme["highlight-button-pressed"] + "; }\n";
                styles += ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " + theme["highlight-button-pressed"] + "; }\n";
            }
            if (theme["highlight-primary-dialog-button-hover"]) {
                styles += ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " + theme["highlight-primary-dialog-button-hover"] + "; border-color: " + theme["highlight-primary-dialog-button-hover"] + "; }\n";
            }
            if (theme["background-primary-dialog-button"]) {
                styles += ".checkbox-indeterminate,\n" + ".custom-button-primary { background-color: " + theme["background-primary-dialog-button"] + "; border-color: " + theme["background-primary-dialog-button"] + "; }\n";
            }
            if (theme["background-toolbar-additional"]) {
                styles += ".custom-button-secondary-icon:disabled,\n" + ".custom-button-secondary-icon.custom-button-disabled,\n" + ".custom-button-secondary:disabled,\n" + ".custom-button-secondary.custom-button-disabled { background-color: " + theme["background-toolbar-additional"] + "; border-color: " + theme["background-toolbar-additional"] + "; }\n";
            }
            if (theme["text-normal"]) {
                styles += ".custom-button-secondary-icon,\n" + ".custom-button-secondary,\n" + ".custom-button-secondary-icon,\n" + ".custom-button-icon-only,\n" + ".selectbox-search-input,\n" + ".loader-image,\n" + ".input-field-element { color: " + theme["text-normal"] + "; }\n";
                styles += ".input-field-search-icon svg { fill: " + theme["text-normal"] + "; }\n";
                styles += ".selectbox-arrow b { border-color: " + theme["text-normal"] + "; }\n";
            }
            if (theme["text-secondary"]) {
                styles += ".message-close:hover,\n" + ".input-field-clear:hover { color: " + theme["text-secondary"] + "; }\n";
            }
            if (theme["text-tertiary"]) {
                styles += ".input-field-clear,\n" + ".message-container:hover .message-close,\n" + ".custom-button-secondary-icon:disabled,\n" + ".custom-button-secondary-icon.custom-button-disabled,\n" + ".custom-button-secondary:disabled,\n" + ".custom-button-secondary.custom-button-disabled,\n" + ".input-field-element::placeholder,\n" + ".selectbox-search-input::placeholder { color: " + theme["text-tertiary"] + "; }\n";
            }
            var fontSize = "11px";
            if ([ "theme-white", "theme-night" ].indexOf(theme.name) !== -1 || [ "theme-white", "theme-night" ].indexOf(theme.Name) !== -1) {
                fontSize = "12px";
                styles += ".message,\n" + ".custom-button,\n" + ".selectbox-header,\n" + ".input-field-element { border-radius: 4px; }\n";
                styles += ".radio--checked .radio-visual { border-width: 4px; }\n";
                styles += ".checkbox-checkmark { color: " + theme["text-inverse"] + "; }\n";
                styles += ".checkbox--checked .checkbox-visual { background-color: " + theme["background-primary-dialog-button"] + "; }\n";
                styles += ".radio--checked .radio-visual,\n" + ".checkbox--checked .checkbox-visual { border-color: " + theme["background-primary-dialog-button"] + "; }\n";
                styles += ".radio-button-container:hover:not(.radio--checked) .radio-visual,\n" + ".checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { background-color: " + theme["highlight-button-hover"] + "; }\n";
                styles += ".checkbox--checked:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + theme["highlight-primary-dialog-button-hover"] + "; background-color: " + theme["highlight-primary-dialog-button-hover"] + "; }\n";
                styles += ".radio--checked:hover:not(.radio--disabled) .radio-visual { border-color: " + theme["highlight-primary-dialog-button-hover"] + "; }\n";
                styles += "body { font-size: 12px; }\n";
            } else {
                styles += ".checkbox-checkmark { color: " + theme["text-normal"] + "; }\n";
                styles += ".radio--checked .radio-visual { background-color: " + theme["text-normal"] + ";\n box-shadow: 0 0 0 2px" + theme["background-normal"] + " inset; }\n";
                styles += ".radio-button-container:hover .radio-visual,\n" + ".checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + theme["border-control-focus"] + "; }\n";
            }
            styles += "body, input, textarea, select, button { font-size: " + fontSize + "; }\n";
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
        },
        fixThemeForIE: function fixThemeForIE(theme) {
            if (!theme["background-toolbar"]) {
                theme["background-toolbar"] = "#f7f7f7";
            }
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
            if (!theme["background-loader"]) {
                theme["background-loader"] = "rgba(24, 24, 24, 0.9)";
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
    };
    (function() {
        var EditWindow = function() {
            function EditWindow() {
                _classCallCheck(this, EditWindow);
                var container = document.querySelector(".container");
                if (container instanceof HTMLElement === false) {
                    throw new Error("container is not initialized");
                }
                this._container = container;
                this._field = null;
                this.citationObject = null;
                this.forms = [];
            }
            return _createClass(EditWindow, [ {
                key: "createForm",
                value: function createForm(citationItem) {
                    var form = document.createElement("form");
                    form.classList.add("form");
                    this._container.appendChild(form);
                    var title = document.createElement("div");
                    title.classList.add("title");
                    title.textContent = citationItem.itemData.title;
                    form.appendChild(title);
                    var params = document.createDocumentFragment();
                    var prefixSuffixContainer = document.createElement("div");
                    var prefix = document.createElement("input");
                    var suffix = document.createElement("input");
                    var locatorContainer = document.createElement("div");
                    var locatorSelect = document.createElement("div");
                    var locator = document.createElement("input");
                    var omitAuthorContainer = document.createElement("div");
                    var omitAuthor = document.createElement("input");
                    params.appendChild(locatorContainer);
                    locatorContainer.appendChild(locatorSelect);
                    locatorContainer.appendChild(locator);
                    var locatorPlaceholder = "";
                    params.appendChild(prefixSuffixContainer);
                    prefixSuffixContainer.appendChild(prefix);
                    prefixSuffixContainer.appendChild(suffix);
                    params.appendChild(omitAuthorContainer);
                    omitAuthorContainer.appendChild(omitAuthor);
                    var prefixInput = new InputField(prefix, {
                        type: "text",
                        placeholder: "Prefix",
                        value: citationItem.prefix
                    });
                    var suffixInput = new InputField(suffix, {
                        type: "text",
                        placeholder: "Suffix",
                        value: citationItem.suffix
                    });
                    var locatorSelectbox = new SelectBox(locatorSelect, {
                        placeholder: "Locator"
                    });
                    var locatorLabel = citationItem.label || "page";
                    LOCATOR_VALUES.forEach(function(info) {
                        var selected = info[0] === locatorLabel;
                        locatorSelectbox.addItem(info[0], info[1], selected);
                        if (selected) {
                            locatorPlaceholder = info[1];
                        }
                    });
                    var locatorInput = new InputField(locator, {
                        type: "text",
                        placeholder: locatorPlaceholder,
                        value: citationItem.locator
                    });
                    var omitAuthorInput = new Checkbox(omitAuthor, {
                        label: "Omit author",
                        checked: !!citationItem["suppress-author"]
                    });
                    locatorSelectbox.subscribe(function(event) {
                        if (event.type !== "selectbox:change" || !event.detail.items) {
                            return;
                        }
                        var eventItem = event.detail.items[0];
                        locatorInput.setPlaceholder(eventItem.text);
                    });
                    this.forms.push({
                        omitAuthorInput: omitAuthorInput,
                        prefixInput: prefixInput,
                        suffixInput: suffixInput,
                        locatorInput: locatorInput,
                        locatorSelectbox: locatorSelectbox
                    });
                    form.appendChild(params);
                }
            }, {
                key: "onThemeChanged",
                value: function onThemeChanged(theme) {
                    window.Asc.plugin.onThemeChangedBase(theme);
                    Theme.fixThemeForIE(theme);
                    Theme.addStylesForComponents(theme);
                    var rules = "";
                    rules += "body { background-color: " + theme["background-normal"] + " !important;}\n";
                    var styleTheme = document.getElementById("pluginStyles");
                    if (!styleTheme) {
                        styleTheme = document.createElement("style");
                        styleTheme.id = "pluginStyles";
                        styleTheme.innerHTML = rules;
                        document.getElementsByTagName("head")[0].appendChild(styleTheme);
                    } else {
                        styleTheme.innerHTML = rules;
                    }
                }
            }, {
                key: "onAttachedContent",
                value: function onAttachedContent(field) {
                    var _this = this;
                    this._field = field;
                    var citationStartIndex = field.Value.indexOf("{");
                    var citationEndIndex = field.Value.lastIndexOf("}");
                    if (citationStartIndex === -1) {
                        return;
                    }
                    var citationString = field.Value.slice(citationStartIndex, citationEndIndex + 1);
                    this.citationObject = JSON.parse(citationString);
                    if (!this.citationObject) {
                        return;
                    }
                    this.citationObject.citationItems.forEach(function(item) {
                        _this.createForm(item);
                    });
                    window.Asc.plugin.sendToPlugin("onUpdateHeight", document.body.scrollHeight);
                }
            }, {
                key: "onClickSave",
                value: function onClickSave() {
                    var bHasChanges = false;
                    for (var i = 0; i < this.forms.length; i++) {
                        var _this$citationObject;
                        var form = this.forms[i];
                        var citationItem = (_this$citationObject = this.citationObject) === null || _this$citationObject === void 0 ? void 0 : _this$citationObject.citationItems[i];
                        if (!citationItem) {
                            continue;
                        }
                        var prefix = form.prefixInput.getValue();
                        var suffix = form.suffixInput.getValue();
                        var label = form.locatorSelectbox.getSelectedValue();
                        var locator = form.locatorInput.getValue();
                        var omitAuthor = form.omitAuthorInput.getState().checked;
                        if ((citationItem.prefix || prefix) && citationItem.prefix !== prefix) {
                            citationItem.prefix = prefix;
                            bHasChanges = true;
                        }
                        if ((citationItem.suffix || suffix) && citationItem.suffix !== suffix) {
                            citationItem.suffix = suffix;
                            bHasChanges = true;
                        }
                        if ((citationItem.label || label) && citationItem.label !== label) {
                            if (label) {
                                citationItem.label = label;
                                bHasChanges = true;
                            }
                        }
                        if ((citationItem.locator || locator) && citationItem.locator !== locator) {
                            citationItem.locator = locator;
                            bHasChanges = true;
                        }
                        if (!!citationItem["suppress-author"] !== omitAuthor) {
                            citationItem["suppress-author"] = omitAuthor;
                            bHasChanges = true;
                        }
                    }
                    return bHasChanges;
                }
            } ]);
        }();
        var editWindow = new EditWindow;
        window.Asc.plugin.init = function() {
            window.Asc.plugin.sendToPlugin("onWindowReady", {});
        };
        window.Asc.plugin.onThemeChanged = editWindow.onThemeChanged.bind(editWindow);
        window.Asc.plugin.attachEvent("onThemeChanged", editWindow.onThemeChanged.bind(editWindow));
        window.Asc.plugin.attachEvent("onAttachedContent", editWindow.onAttachedContent.bind(editWindow));
        window.Asc.plugin.attachEvent("onClickSave", function() {
            var bHasChanges = editWindow.onClickSave();
            if (bHasChanges) {
                window.Asc.plugin.sendToPlugin("onSaveFields", editWindow.citationObject);
            } else {
                window.Asc.plugin.sendToPlugin("onSaveFields", null);
            }
        });
    })();
});
//# sourceMappingURL=edit-window.es5.js.map
