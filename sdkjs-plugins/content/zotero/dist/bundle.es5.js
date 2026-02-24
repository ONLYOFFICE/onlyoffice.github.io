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
    var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    var es_array_filter = {};
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
    var ownKeys$1;
    var hasRequiredOwnKeys;
    function requireOwnKeys() {
        if (hasRequiredOwnKeys) return ownKeys$1;
        hasRequiredOwnKeys = 1;
        var getBuiltIn = requireGetBuiltIn();
        var uncurryThis = requireFunctionUncurryThis();
        var getOwnPropertyNamesModule = requireObjectGetOwnPropertyNames();
        var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
        var anObject = requireAnObject();
        var concat = uncurryThis([].concat);
        ownKeys$1 = getBuiltIn("Reflect", "ownKeys") || function ownKeys(it) {
            var keys = getOwnPropertyNamesModule.f(anObject(it));
            var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
            return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
        };
        return ownKeys$1;
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
    var objectDefineProperties = {};
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
    var es_array_join = {};
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
    var es_function_name = {};
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
    var arraySlice;
    var hasRequiredArraySlice;
    function requireArraySlice() {
        if (hasRequiredArraySlice) return arraySlice;
        hasRequiredArraySlice = 1;
        var uncurryThis = requireFunctionUncurryThis();
        arraySlice = uncurryThis([].slice);
        return arraySlice;
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
    var es_promise_finally = {};
    var hasRequiredEs_promise_finally;
    function requireEs_promise_finally() {
        if (hasRequiredEs_promise_finally) return es_promise_finally;
        hasRequiredEs_promise_finally = 1;
        var $ = require_export();
        var IS_PURE = requireIsPure();
        var NativePromiseConstructor = requirePromiseNativeConstructor();
        var fails = requireFails();
        var getBuiltIn = requireGetBuiltIn();
        var isCallable = requireIsCallable();
        var speciesConstructor = requireSpeciesConstructor();
        var promiseResolve = requirePromiseResolve();
        var defineBuiltIn = requireDefineBuiltIn();
        var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
        var NON_GENERIC = !!NativePromiseConstructor && fails(function() {
            NativePromisePrototype["finally"].call({
                then: function() {}
            }, function() {});
        });
        $({
            target: "Promise",
            proto: true,
            real: true,
            forced: NON_GENERIC
        }, {
            finally: function(onFinally) {
                var C = speciesConstructor(this, getBuiltIn("Promise"));
                var isFunction = isCallable(onFinally);
                return this.then(isFunction ? function(x) {
                    return promiseResolve(C, onFinally()).then(function() {
                        return x;
                    });
                } : onFinally, isFunction ? function(e) {
                    return promiseResolve(C, onFinally()).then(function() {
                        throw e;
                    });
                } : onFinally);
            }
        });
        if (!IS_PURE && isCallable(NativePromiseConstructor)) {
            var method = getBuiltIn("Promise").prototype["finally"];
            if (NativePromisePrototype["finally"] !== method) {
                defineBuiltIn(NativePromisePrototype, "finally", method, {
                    unsafe: true
                });
            }
        }
        return es_promise_finally;
    }
    requireEs_promise_finally();
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
    var esnext_aggregateError = {};
    var es_aggregateError = {};
    var es_aggregateError_constructor = {};
    var installErrorCause;
    var hasRequiredInstallErrorCause;
    function requireInstallErrorCause() {
        if (hasRequiredInstallErrorCause) return installErrorCause;
        hasRequiredInstallErrorCause = 1;
        var isObject = requireIsObject();
        var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
        installErrorCause = function(O, options) {
            if (isObject(options) && "cause" in options) {
                createNonEnumerableProperty(O, "cause", options.cause);
            }
        };
        return installErrorCause;
    }
    var errorStackClear;
    var hasRequiredErrorStackClear;
    function requireErrorStackClear() {
        if (hasRequiredErrorStackClear) return errorStackClear;
        hasRequiredErrorStackClear = 1;
        var uncurryThis = requireFunctionUncurryThis();
        var $Error = Error;
        var replace = uncurryThis("".replace);
        var TEST = function(arg) {
            return String(new $Error(arg).stack);
        }("zxcasd");
        var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
        var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);
        errorStackClear = function(stack, dropEntries) {
            if (IS_V8_OR_CHAKRA_STACK && typeof stack == "string" && !$Error.prepareStackTrace) {
                while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, "");
            }
            return stack;
        };
        return errorStackClear;
    }
    var errorStackInstallable;
    var hasRequiredErrorStackInstallable;
    function requireErrorStackInstallable() {
        if (hasRequiredErrorStackInstallable) return errorStackInstallable;
        hasRequiredErrorStackInstallable = 1;
        var fails = requireFails();
        var createPropertyDescriptor = requireCreatePropertyDescriptor();
        errorStackInstallable = !fails(function() {
            var error = new Error("a");
            if (!("stack" in error)) return true;
            Object.defineProperty(error, "stack", createPropertyDescriptor(1, 7));
            return error.stack !== 7;
        });
        return errorStackInstallable;
    }
    var errorStackInstall;
    var hasRequiredErrorStackInstall;
    function requireErrorStackInstall() {
        if (hasRequiredErrorStackInstall) return errorStackInstall;
        hasRequiredErrorStackInstall = 1;
        var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
        var clearErrorStack = requireErrorStackClear();
        var ERROR_STACK_INSTALLABLE = requireErrorStackInstallable();
        var captureStackTrace = Error.captureStackTrace;
        errorStackInstall = function(error, C, stack, dropEntries) {
            if (ERROR_STACK_INSTALLABLE) {
                if (captureStackTrace) captureStackTrace(error, C); else createNonEnumerableProperty(error, "stack", clearErrorStack(stack, dropEntries));
            }
        };
        return errorStackInstall;
    }
    var normalizeStringArgument;
    var hasRequiredNormalizeStringArgument;
    function requireNormalizeStringArgument() {
        if (hasRequiredNormalizeStringArgument) return normalizeStringArgument;
        hasRequiredNormalizeStringArgument = 1;
        var toString = requireToString();
        normalizeStringArgument = function(argument, $default) {
            return argument === undefined ? arguments.length < 2 ? "" : $default : toString(argument);
        };
        return normalizeStringArgument;
    }
    var hasRequiredEs_aggregateError_constructor;
    function requireEs_aggregateError_constructor() {
        if (hasRequiredEs_aggregateError_constructor) return es_aggregateError_constructor;
        hasRequiredEs_aggregateError_constructor = 1;
        var $ = require_export();
        var isPrototypeOf = requireObjectIsPrototypeOf();
        var getPrototypeOf = requireObjectGetPrototypeOf();
        var setPrototypeOf = requireObjectSetPrototypeOf();
        var copyConstructorProperties = requireCopyConstructorProperties();
        var create = requireObjectCreate();
        var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
        var createPropertyDescriptor = requireCreatePropertyDescriptor();
        var installErrorCause = requireInstallErrorCause();
        var installErrorStack = requireErrorStackInstall();
        var iterate = requireIterate();
        var normalizeStringArgument = requireNormalizeStringArgument();
        var wellKnownSymbol = requireWellKnownSymbol();
        var TO_STRING_TAG = wellKnownSymbol("toStringTag");
        var $Error = Error;
        var push = [].push;
        var $AggregateError = function AggregateError(errors, message) {
            var isInstance = isPrototypeOf(AggregateErrorPrototype, this);
            var that;
            if (setPrototypeOf) {
                that = setPrototypeOf(new $Error, isInstance ? getPrototypeOf(this) : AggregateErrorPrototype);
            } else {
                that = isInstance ? this : create(AggregateErrorPrototype);
                createNonEnumerableProperty(that, TO_STRING_TAG, "Error");
            }
            if (message !== undefined) createNonEnumerableProperty(that, "message", normalizeStringArgument(message));
            installErrorStack(that, $AggregateError, that.stack, 1);
            if (arguments.length > 2) installErrorCause(that, arguments[2]);
            var errorsArray = [];
            iterate(errors, push, {
                that: errorsArray
            });
            createNonEnumerableProperty(that, "errors", errorsArray);
            return that;
        };
        if (setPrototypeOf) setPrototypeOf($AggregateError, $Error); else copyConstructorProperties($AggregateError, $Error, {
            name: true
        });
        var AggregateErrorPrototype = $AggregateError.prototype = create($Error.prototype, {
            constructor: createPropertyDescriptor(1, $AggregateError),
            message: createPropertyDescriptor(1, ""),
            name: createPropertyDescriptor(1, "AggregateError")
        });
        $({
            global: true,
            constructor: true,
            arity: 2
        }, {
            AggregateError: $AggregateError
        });
        return es_aggregateError_constructor;
    }
    var hasRequiredEs_aggregateError;
    function requireEs_aggregateError() {
        if (hasRequiredEs_aggregateError) return es_aggregateError;
        hasRequiredEs_aggregateError = 1;
        requireEs_aggregateError_constructor();
        return es_aggregateError;
    }
    var hasRequiredEsnext_aggregateError;
    function requireEsnext_aggregateError() {
        if (hasRequiredEsnext_aggregateError) return esnext_aggregateError;
        hasRequiredEsnext_aggregateError = 1;
        requireEs_aggregateError();
        return esnext_aggregateError;
    }
    requireEsnext_aggregateError();
    var esnext_promise_allSettled = {};
    var es_promise_allSettled = {};
    var hasRequiredEs_promise_allSettled;
    function requireEs_promise_allSettled() {
        if (hasRequiredEs_promise_allSettled) return es_promise_allSettled;
        hasRequiredEs_promise_allSettled = 1;
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
            allSettled: function allSettled(iterable) {
                var C = this;
                var capability = newPromiseCapabilityModule.f(C);
                var resolve = capability.resolve;
                var reject = capability.reject;
                var result = perform(function() {
                    var promiseResolve = aCallable(C.resolve);
                    var values = [];
                    var counter = 0;
                    var remaining = 1;
                    iterate(iterable, function(promise) {
                        var index = counter++;
                        var alreadyCalled = false;
                        remaining++;
                        call(promiseResolve, C, promise).then(function(value) {
                            if (alreadyCalled) return;
                            alreadyCalled = true;
                            values[index] = {
                                status: "fulfilled",
                                value: value
                            };
                            --remaining || resolve(values);
                        }, function(error) {
                            if (alreadyCalled) return;
                            alreadyCalled = true;
                            values[index] = {
                                status: "rejected",
                                reason: error
                            };
                            --remaining || resolve(values);
                        });
                    });
                    --remaining || resolve(values);
                });
                if (result.error) reject(result.value);
                return capability.promise;
            }
        });
        return es_promise_allSettled;
    }
    var hasRequiredEsnext_promise_allSettled;
    function requireEsnext_promise_allSettled() {
        if (hasRequiredEsnext_promise_allSettled) return esnext_promise_allSettled;
        hasRequiredEsnext_promise_allSettled = 1;
        requireEs_promise_allSettled();
        return esnext_promise_allSettled;
    }
    requireEsnext_promise_allSettled();
    var esnext_promise_any = {};
    var es_promise_any = {};
    var hasRequiredEs_promise_any;
    function requireEs_promise_any() {
        if (hasRequiredEs_promise_any) return es_promise_any;
        hasRequiredEs_promise_any = 1;
        var $ = require_export();
        var call = requireFunctionCall();
        var aCallable = requireACallable();
        var getBuiltIn = requireGetBuiltIn();
        var newPromiseCapabilityModule = requireNewPromiseCapability();
        var perform = requirePerform();
        var iterate = requireIterate();
        var PROMISE_STATICS_INCORRECT_ITERATION = requirePromiseStaticsIncorrectIteration();
        var PROMISE_ANY_ERROR = "No one promise resolved";
        $({
            target: "Promise",
            stat: true,
            forced: PROMISE_STATICS_INCORRECT_ITERATION
        }, {
            any: function any(iterable) {
                var C = this;
                var AggregateError = getBuiltIn("AggregateError");
                var capability = newPromiseCapabilityModule.f(C);
                var resolve = capability.resolve;
                var reject = capability.reject;
                var result = perform(function() {
                    var promiseResolve = aCallable(C.resolve);
                    var errors = [];
                    var counter = 0;
                    var remaining = 1;
                    var alreadyResolved = false;
                    iterate(iterable, function(promise) {
                        var index = counter++;
                        var alreadyRejected = false;
                        remaining++;
                        call(promiseResolve, C, promise).then(function(value) {
                            if (alreadyRejected || alreadyResolved) return;
                            alreadyResolved = true;
                            resolve(value);
                        }, function(error) {
                            if (alreadyRejected || alreadyResolved) return;
                            alreadyRejected = true;
                            errors[index] = error;
                            --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
                        });
                    });
                    --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
                });
                if (result.error) reject(result.value);
                return capability.promise;
            }
        });
        return es_promise_any;
    }
    var hasRequiredEsnext_promise_any;
    function requireEsnext_promise_any() {
        if (hasRequiredEsnext_promise_any) return esnext_promise_any;
        hasRequiredEsnext_promise_any = 1;
        requireEs_promise_any();
        return esnext_promise_any;
    }
    requireEsnext_promise_any();
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
    function Router() {
        this._states = [ "mainState", "loginState", "settingsState" ];
        this._routes = [ "main", "login", "settings" ];
        this._currentRoute = "login";
        this._currentRouteIndex = 1;
        this._containers = this._states.map(function(route) {
            var container = document.getElementById(route);
            if (!container) throw new Error("container ".concat(route, " not found"));
            return container;
        });
    }
    Router.prototype.getRoute = function() {
        return this._currentRoute;
    };
    Router.prototype._setCurrentRoute = function(route) {
        this._containers[this._currentRouteIndex].classList.add("hidden");
        this._currentRoute = route;
        this._currentRouteIndex = this._routes.indexOf(route);
        this._containers[this._currentRouteIndex].classList.remove("hidden");
    };
    Router.prototype.openMain = function() {
        this._setCurrentRoute("main");
    };
    Router.prototype.openLogin = function() {
        this._setCurrentRoute("login");
    };
    Router.prototype.openSettings = function() {
        this._setCurrentRoute("settings");
    };
    var zoteroEnvironment = {
        restApiUrl: "https://api.zotero.org/",
        desktopApiUrl: "http://127.0.0.1:23119/api/"
    };
    var ZoteroApiChecker = {
        _done: false,
        _desktop: false,
        _hasPermission: true,
        _online: false,
        _hasKey: false,
        _timeout: 1e3,
        _callback: function _callback(e) {},
        _desktopVersion: function() {
            if (window.navigator && window.navigator.userAgent.toLowerCase().indexOf("ascdesktopeditor") < 0) return false;
            if (window.location && window.location.protocol == "file:") return true;
            var src = window.document.currentScript ? window.document.currentScript.getAttribute("src") : "";
            if (src && 0 == src.indexOf("file:///")) return true;
            return false;
        }(),
        runApisChecker: function runApisChecker(sdk) {
            var self = this;
            self._done = false;
            function attemptCheck() {
                if (self._done) return;
                self._checkApiAvailable(sdk).then(function(res) {
                    if (self._done) return;
                    if (res.online && res.hasKey) {
                        self._done = true;
                    } else if (res.desktop && res.hasPermission) {
                        self._done = true;
                    }
                    self._callback(res);
                    setTimeout(attemptCheck, self._timeout);
                });
            }
            attemptCheck();
            return {
                subscribe: function subscribe(callbackFn) {
                    self._callback = callbackFn;
                },
                unsubscribe: function unsubscribe() {
                    self._done = true;
                    self._callback = function() {};
                }
            };
        },
        checkStatus: function checkStatus(sdk) {
            return this._checkApiAvailable(sdk);
        },
        successfullyLoggedInUsingApiKey: function successfullyLoggedInUsingApiKey() {
            this._done = true;
            this._callback({
                online: true,
                hasKey: true,
                desktop: this._desktop,
                hasPermission: this._hasPermission,
                desktopVersion: this._desktopVersion
            });
        },
        _checkApiAvailable: function _checkApiAvailable(sdk) {
            var self = this;
            return Promise.all([ fetch(zoteroEnvironment.restApiUrl, {
                method: "GET",
                cache: "no-cache"
            }).then(function(res) {
                return res.status === 200;
            }).catch(function() {
                return false;
            }), self._sendDesktopRequest(zoteroEnvironment.desktopApiUrl).then(function(res) {
                self._hasPermission = res.hasPermission;
                return res.isZoteroRunning;
            }).catch(function() {
                return false;
            }) ]).then(function(apisAvailable) {
                self._online = apisAvailable[0];
                self._desktop = apisAvailable[1];
                self._hasKey = sdk.hasSettings();
                return {
                    online: self._online,
                    hasKey: self._hasKey,
                    desktop: self._desktop,
                    hasPermission: self._hasPermission,
                    desktopVersion: self._desktopVersion
                };
            });
        },
        _sendDesktopRequest: function _sendDesktopRequest(url) {
            var self = this;
            return new Promise(function(resolve, reject) {
                if (!self._desktopVersion) {
                    resolve({
                        hasPermission: false,
                        isZoteroRunning: false
                    });
                    return;
                }
                window.AscSimpleRequest.createRequest({
                    url: url,
                    method: "GET",
                    headers: {
                        "Zotero-API-Version": "3",
                        "User-Agent": "AscDesktopEditor"
                    },
                    complete: function complete(e) {
                        var hasPermission = false;
                        var isZoteroRunning = false;
                        if (e.responseStatus == 403) {
                            hasPermission = false;
                            isZoteroRunning = true;
                        } else if (e.responseStatus === 200) {
                            isZoteroRunning = true;
                            hasPermission = true;
                        }
                        resolve({
                            hasPermission: hasPermission,
                            isZoteroRunning: isZoteroRunning
                        });
                    },
                    error: function error(e) {
                        if (e.statusCode == -102) e.statusCode = 404;
                        reject(e);
                    }
                });
            });
        }
    };
    function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
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
    function ownKeys(e, r) {
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
            r % 2 ? ownKeys(Object(t), true).forEach(function(r) {
                _defineProperty(e, r, t[r]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
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
    function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
        } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, _typeof(o);
    }
    function _unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return _arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
        }
    }
    var es_number_constructor = {};
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
    var es_object_keys = {};
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
    var web_url = {};
    var web_url_constructor = {};
    var urlConstructorDetection;
    var hasRequiredUrlConstructorDetection;
    function requireUrlConstructorDetection() {
        if (hasRequiredUrlConstructorDetection) return urlConstructorDetection;
        hasRequiredUrlConstructorDetection = 1;
        var fails = requireFails();
        var wellKnownSymbol = requireWellKnownSymbol();
        var DESCRIPTORS = requireDescriptors();
        var IS_PURE = requireIsPure();
        var ITERATOR = wellKnownSymbol("iterator");
        urlConstructorDetection = !fails(function() {
            var url = new URL("b?a=1&b=2&c=3", "https://a");
            var params = url.searchParams;
            var params2 = new URLSearchParams("a=1&a=2&b=3");
            var result = "";
            url.pathname = "c%20d";
            params.forEach(function(value, key) {
                params["delete"]("b");
                result += key + value;
            });
            params2["delete"]("a", 2);
            params2["delete"]("b", undefined);
            return IS_PURE && (!url.toJSON || !params2.has("a", 1) || params2.has("a", 2) || !params2.has("a", undefined) || params2.has("b")) || !params.size && (IS_PURE || !DESCRIPTORS) || !params.sort || url.href !== "https://a/c%20d?a=1&c=3" || params.get("c") !== "3" || String(new URLSearchParams("?a=1")) !== "a=1" || !params[ITERATOR] || new URL("https://a@b").username !== "a" || new URLSearchParams(new URLSearchParams("a=b")).get("a") !== "b" || new URL("https://тест").host !== "xn--e1aybc" || new URL("https://a#б").hash !== "#%D0%B1" || result !== "a1c3" || new URL("https://x", undefined).host !== "x";
        });
        return urlConstructorDetection;
    }
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
    var stringPunycodeToAscii;
    var hasRequiredStringPunycodeToAscii;
    function requireStringPunycodeToAscii() {
        if (hasRequiredStringPunycodeToAscii) return stringPunycodeToAscii;
        hasRequiredStringPunycodeToAscii = 1;
        var uncurryThis = requireFunctionUncurryThis();
        var maxInt = 2147483647;
        var base = 36;
        var tMin = 1;
        var tMax = 26;
        var skew = 38;
        var damp = 700;
        var initialBias = 72;
        var initialN = 128;
        var delimiter = "-";
        var regexNonASCII = /[^\0-\u007E]/;
        var regexSeparators = /[.\u3002\uFF0E\uFF61]/g;
        var OVERFLOW_ERROR = "Overflow: input needs wider integers to process";
        var baseMinusTMin = base - tMin;
        var $RangeError = RangeError;
        var exec = uncurryThis(regexSeparators.exec);
        var floor = Math.floor;
        var fromCharCode = String.fromCharCode;
        var charCodeAt = uncurryThis("".charCodeAt);
        var join = uncurryThis([].join);
        var push = uncurryThis([].push);
        var replace = uncurryThis("".replace);
        var split = uncurryThis("".split);
        var toLowerCase = uncurryThis("".toLowerCase);
        var ucs2decode = function(string) {
            var output = [];
            var counter = 0;
            var length = string.length;
            while (counter < length) {
                var value = charCodeAt(string, counter++);
                if (value >= 55296 && value <= 56319 && counter < length) {
                    var extra = charCodeAt(string, counter++);
                    if ((extra & 64512) === 56320) {
                        push(output, ((value & 1023) << 10) + (extra & 1023) + 65536);
                    } else {
                        push(output, value);
                        counter--;
                    }
                } else {
                    push(output, value);
                }
            }
            return output;
        };
        var digitToBasic = function(digit) {
            return digit + 22 + 75 * (digit < 26);
        };
        var adapt = function(delta, numPoints, firstTime) {
            var k = 0;
            delta = firstTime ? floor(delta / damp) : delta >> 1;
            delta += floor(delta / numPoints);
            while (delta > baseMinusTMin * tMax >> 1) {
                delta = floor(delta / baseMinusTMin);
                k += base;
            }
            return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
        };
        var encode = function(input) {
            var output = [];
            input = ucs2decode(input);
            var inputLength = input.length;
            var n = initialN;
            var delta = 0;
            var bias = initialBias;
            var i, currentValue;
            for (i = 0; i < input.length; i++) {
                currentValue = input[i];
                if (currentValue < 128) {
                    push(output, fromCharCode(currentValue));
                }
            }
            var basicLength = output.length;
            var handledCPCount = basicLength;
            if (basicLength) {
                push(output, delimiter);
            }
            while (handledCPCount < inputLength) {
                var m = maxInt;
                for (i = 0; i < input.length; i++) {
                    currentValue = input[i];
                    if (currentValue >= n && currentValue < m) {
                        m = currentValue;
                    }
                }
                var handledCPCountPlusOne = handledCPCount + 1;
                if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                    throw new $RangeError(OVERFLOW_ERROR);
                }
                delta += (m - n) * handledCPCountPlusOne;
                n = m;
                for (i = 0; i < input.length; i++) {
                    currentValue = input[i];
                    if (currentValue < n && ++delta > maxInt) {
                        throw new $RangeError(OVERFLOW_ERROR);
                    }
                    if (currentValue === n) {
                        var q = delta;
                        var k = base;
                        while (true) {
                            var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                            if (q < t) break;
                            var qMinusT = q - t;
                            var baseMinusT = base - t;
                            push(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
                            q = floor(qMinusT / baseMinusT);
                            k += base;
                        }
                        push(output, fromCharCode(digitToBasic(q)));
                        bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
                        delta = 0;
                        handledCPCount++;
                    }
                }
                delta++;
                n++;
            }
            return join(output, "");
        };
        stringPunycodeToAscii = function(input) {
            var encoded = [];
            var labels = split(replace(toLowerCase(input), regexSeparators, "."), ".");
            var i, label;
            for (i = 0; i < labels.length; i++) {
                label = labels[i];
                push(encoded, exec(regexNonASCII, label) ? "xn--" + encode(label) : label);
            }
            return join(encoded, ".");
        };
        return stringPunycodeToAscii;
    }
    var es_string_fromCodePoint = {};
    var hasRequiredEs_string_fromCodePoint;
    function requireEs_string_fromCodePoint() {
        if (hasRequiredEs_string_fromCodePoint) return es_string_fromCodePoint;
        hasRequiredEs_string_fromCodePoint = 1;
        var $ = require_export();
        var uncurryThis = requireFunctionUncurryThis();
        var toAbsoluteIndex = requireToAbsoluteIndex();
        var $RangeError = RangeError;
        var fromCharCode = String.fromCharCode;
        var $fromCodePoint = String.fromCodePoint;
        var join = uncurryThis([].join);
        var INCORRECT_LENGTH = !!$fromCodePoint && $fromCodePoint.length !== 1;
        $({
            target: "String",
            stat: true,
            arity: 1,
            forced: INCORRECT_LENGTH
        }, {
            fromCodePoint: function fromCodePoint(x) {
                var elements = [];
                var length = arguments.length;
                var i = 0;
                var code;
                while (length > i) {
                    code = +arguments[i++];
                    if (toAbsoluteIndex(code, 1114111) !== code) throw new $RangeError(code + " is not a valid code point");
                    elements[i] = code < 65536 ? fromCharCode(code) : fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320);
                }
                return join(elements, "");
            }
        });
        return es_string_fromCodePoint;
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
    var web_urlSearchParams_constructor;
    var hasRequiredWeb_urlSearchParams_constructor;
    function requireWeb_urlSearchParams_constructor() {
        if (hasRequiredWeb_urlSearchParams_constructor) return web_urlSearchParams_constructor;
        hasRequiredWeb_urlSearchParams_constructor = 1;
        requireEs_array_iterator();
        requireEs_string_fromCodePoint();
        var $ = require_export();
        var globalThis = requireGlobalThis();
        var safeGetBuiltIn = requireSafeGetBuiltIn();
        var getBuiltIn = requireGetBuiltIn();
        var call = requireFunctionCall();
        var uncurryThis = requireFunctionUncurryThis();
        var DESCRIPTORS = requireDescriptors();
        var USE_NATIVE_URL = requireUrlConstructorDetection();
        var defineBuiltIn = requireDefineBuiltIn();
        var defineBuiltInAccessor = requireDefineBuiltInAccessor();
        var defineBuiltIns = requireDefineBuiltIns();
        var setToStringTag = requireSetToStringTag();
        var createIteratorConstructor = requireIteratorCreateConstructor();
        var InternalStateModule = requireInternalState();
        var anInstance = requireAnInstance();
        var isCallable = requireIsCallable();
        var hasOwn = requireHasOwnProperty();
        var bind = requireFunctionBindContext();
        var classof = requireClassof();
        var anObject = requireAnObject();
        var isObject = requireIsObject();
        var $toString = requireToString();
        var create = requireObjectCreate();
        var createPropertyDescriptor = requireCreatePropertyDescriptor();
        var getIterator = requireGetIterator();
        var getIteratorMethod = requireGetIteratorMethod();
        var createIterResultObject = requireCreateIterResultObject();
        var validateArgumentsLength = requireValidateArgumentsLength();
        var wellKnownSymbol = requireWellKnownSymbol();
        var arraySort = requireArraySort();
        var ITERATOR = wellKnownSymbol("iterator");
        var URL_SEARCH_PARAMS = "URLSearchParams";
        var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + "Iterator";
        var setInternalState = InternalStateModule.set;
        var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
        var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);
        var nativeFetch = safeGetBuiltIn("fetch");
        var NativeRequest = safeGetBuiltIn("Request");
        var Headers = safeGetBuiltIn("Headers");
        var RequestPrototype = NativeRequest && NativeRequest.prototype;
        var HeadersPrototype = Headers && Headers.prototype;
        var TypeError = globalThis.TypeError;
        var encodeURIComponent = globalThis.encodeURIComponent;
        var fromCharCode = String.fromCharCode;
        var fromCodePoint = getBuiltIn("String", "fromCodePoint");
        var $parseInt = parseInt;
        var charAt = uncurryThis("".charAt);
        var join = uncurryThis([].join);
        var push = uncurryThis([].push);
        var replace = uncurryThis("".replace);
        var shift = uncurryThis([].shift);
        var splice = uncurryThis([].splice);
        var split = uncurryThis("".split);
        var stringSlice = uncurryThis("".slice);
        var exec = uncurryThis(/./.exec);
        var plus = /\+/g;
        var FALLBACK_REPLACER = "�";
        var VALID_HEX = /^[0-9a-f]+$/i;
        var parseHexOctet = function(string, start) {
            var substr = stringSlice(string, start, start + 2);
            if (!exec(VALID_HEX, substr)) return NaN;
            return $parseInt(substr, 16);
        };
        var getLeadingOnes = function(octet) {
            var count = 0;
            for (var mask = 128; mask > 0 && (octet & mask) !== 0; mask >>= 1) {
                count++;
            }
            return count;
        };
        var utf8Decode = function(octets) {
            var codePoint = null;
            switch (octets.length) {
              case 1:
                codePoint = octets[0];
                break;

              case 2:
                codePoint = (octets[0] & 31) << 6 | octets[1] & 63;
                break;

              case 3:
                codePoint = (octets[0] & 15) << 12 | (octets[1] & 63) << 6 | octets[2] & 63;
                break;

              case 4:
                codePoint = (octets[0] & 7) << 18 | (octets[1] & 63) << 12 | (octets[2] & 63) << 6 | octets[3] & 63;
                break;
            }
            return codePoint > 1114111 ? null : codePoint;
        };
        var decode = function(input) {
            input = replace(input, plus, " ");
            var length = input.length;
            var result = "";
            var i = 0;
            while (i < length) {
                var decodedChar = charAt(input, i);
                if (decodedChar === "%") {
                    if (charAt(input, i + 1) === "%" || i + 3 > length) {
                        result += "%";
                        i++;
                        continue;
                    }
                    var octet = parseHexOctet(input, i + 1);
                    if (octet !== octet) {
                        result += decodedChar;
                        i++;
                        continue;
                    }
                    i += 2;
                    var byteSequenceLength = getLeadingOnes(octet);
                    if (byteSequenceLength === 0) {
                        decodedChar = fromCharCode(octet);
                    } else {
                        if (byteSequenceLength === 1 || byteSequenceLength > 4) {
                            result += FALLBACK_REPLACER;
                            i++;
                            continue;
                        }
                        var octets = [ octet ];
                        var sequenceIndex = 1;
                        while (sequenceIndex < byteSequenceLength) {
                            i++;
                            if (i + 3 > length || charAt(input, i) !== "%") break;
                            var nextByte = parseHexOctet(input, i + 1);
                            if (nextByte !== nextByte) {
                                i += 3;
                                break;
                            }
                            if (nextByte > 191 || nextByte < 128) break;
                            push(octets, nextByte);
                            i += 2;
                            sequenceIndex++;
                        }
                        if (octets.length !== byteSequenceLength) {
                            result += FALLBACK_REPLACER;
                            continue;
                        }
                        var codePoint = utf8Decode(octets);
                        if (codePoint === null) {
                            result += FALLBACK_REPLACER;
                        } else {
                            decodedChar = fromCodePoint(codePoint);
                        }
                    }
                }
                result += decodedChar;
                i++;
            }
            return result;
        };
        var find = /[!'()~]|%20/g;
        var replacements = {
            "!": "%21",
            "'": "%27",
            "(": "%28",
            ")": "%29",
            "~": "%7E",
            "%20": "+"
        };
        var replacer = function(match) {
            return replacements[match];
        };
        var serialize = function(it) {
            return replace(encodeURIComponent(it), find, replacer);
        };
        var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
            setInternalState(this, {
                type: URL_SEARCH_PARAMS_ITERATOR,
                target: getInternalParamsState(params).entries,
                index: 0,
                kind: kind
            });
        }, URL_SEARCH_PARAMS, function next() {
            var state = getInternalIteratorState(this);
            var target = state.target;
            var index = state.index++;
            if (!target || index >= target.length) {
                state.target = null;
                return createIterResultObject(undefined, true);
            }
            var entry = target[index];
            switch (state.kind) {
              case "keys":
                return createIterResultObject(entry.key, false);

              case "values":
                return createIterResultObject(entry.value, false);
            }
            return createIterResultObject([ entry.key, entry.value ], false);
        }, true);
        var URLSearchParamsState = function(init) {
            this.entries = [];
            this.url = null;
            if (init !== undefined) {
                if (isObject(init)) this.parseObject(init); else this.parseQuery(typeof init == "string" ? charAt(init, 0) === "?" ? stringSlice(init, 1) : init : $toString(init));
            }
        };
        URLSearchParamsState.prototype = {
            type: URL_SEARCH_PARAMS,
            bindURL: function(url) {
                this.url = url;
                this.update();
            },
            parseObject: function(object) {
                var entries = this.entries;
                var iteratorMethod = getIteratorMethod(object);
                var iterator, next, step, entryIterator, entryNext, first, second;
                if (iteratorMethod) {
                    iterator = getIterator(object, iteratorMethod);
                    next = iterator.next;
                    while (!(step = call(next, iterator)).done) {
                        entryIterator = getIterator(anObject(step.value));
                        entryNext = entryIterator.next;
                        if ((first = call(entryNext, entryIterator)).done || (second = call(entryNext, entryIterator)).done || !call(entryNext, entryIterator).done) throw new TypeError("Expected sequence with length 2");
                        push(entries, {
                            key: $toString(first.value),
                            value: $toString(second.value)
                        });
                    }
                } else for (var key in object) if (hasOwn(object, key)) {
                    push(entries, {
                        key: key,
                        value: $toString(object[key])
                    });
                }
            },
            parseQuery: function(query) {
                if (query) {
                    var entries = this.entries;
                    var attributes = split(query, "&");
                    var index = 0;
                    var attribute, entry;
                    while (index < attributes.length) {
                        attribute = attributes[index++];
                        if (attribute.length) {
                            entry = split(attribute, "=");
                            push(entries, {
                                key: decode(shift(entry)),
                                value: decode(join(entry, "="))
                            });
                        }
                    }
                }
            },
            serialize: function() {
                var entries = this.entries;
                var result = [];
                var index = 0;
                var entry;
                while (index < entries.length) {
                    entry = entries[index++];
                    push(result, serialize(entry.key) + "=" + serialize(entry.value));
                }
                return join(result, "&");
            },
            update: function() {
                this.entries.length = 0;
                this.parseQuery(this.url.query);
            },
            updateURL: function() {
                if (this.url) this.url.update();
            }
        };
        var URLSearchParamsConstructor = function URLSearchParams() {
            anInstance(this, URLSearchParamsPrototype);
            var init = arguments.length > 0 ? arguments[0] : undefined;
            var state = setInternalState(this, new URLSearchParamsState(init));
            if (!DESCRIPTORS) this.size = state.entries.length;
        };
        var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;
        defineBuiltIns(URLSearchParamsPrototype, {
            append: function append(name, value) {
                var state = getInternalParamsState(this);
                validateArgumentsLength(arguments.length, 2);
                push(state.entries, {
                    key: $toString(name),
                    value: $toString(value)
                });
                if (!DESCRIPTORS) this.size++;
                state.updateURL();
            },
            delete: function(name) {
                var state = getInternalParamsState(this);
                var length = validateArgumentsLength(arguments.length, 1);
                var entries = state.entries;
                var key = $toString(name);
                var $value = length < 2 ? undefined : arguments[1];
                var value = $value === undefined ? $value : $toString($value);
                var index = 0;
                while (index < entries.length) {
                    var entry = entries[index];
                    if (entry.key === key && (value === undefined || entry.value === value)) {
                        splice(entries, index, 1);
                        if (value !== undefined) break;
                    } else index++;
                }
                if (!DESCRIPTORS) this.size = entries.length;
                state.updateURL();
            },
            get: function get(name) {
                var entries = getInternalParamsState(this).entries;
                validateArgumentsLength(arguments.length, 1);
                var key = $toString(name);
                var index = 0;
                for (;index < entries.length; index++) {
                    if (entries[index].key === key) return entries[index].value;
                }
                return null;
            },
            getAll: function getAll(name) {
                var entries = getInternalParamsState(this).entries;
                validateArgumentsLength(arguments.length, 1);
                var key = $toString(name);
                var result = [];
                var index = 0;
                for (;index < entries.length; index++) {
                    if (entries[index].key === key) push(result, entries[index].value);
                }
                return result;
            },
            has: function has(name) {
                var entries = getInternalParamsState(this).entries;
                var length = validateArgumentsLength(arguments.length, 1);
                var key = $toString(name);
                var $value = length < 2 ? undefined : arguments[1];
                var value = $value === undefined ? $value : $toString($value);
                var index = 0;
                while (index < entries.length) {
                    var entry = entries[index++];
                    if (entry.key === key && (value === undefined || entry.value === value)) return true;
                }
                return false;
            },
            set: function set(name, value) {
                var state = getInternalParamsState(this);
                validateArgumentsLength(arguments.length, 1);
                var entries = state.entries;
                var found = false;
                var key = $toString(name);
                var val = $toString(value);
                var index = 0;
                var entry;
                for (;index < entries.length; index++) {
                    entry = entries[index];
                    if (entry.key === key) {
                        if (found) splice(entries, index--, 1); else {
                            found = true;
                            entry.value = val;
                        }
                    }
                }
                if (!found) push(entries, {
                    key: key,
                    value: val
                });
                if (!DESCRIPTORS) this.size = entries.length;
                state.updateURL();
            },
            sort: function sort() {
                var state = getInternalParamsState(this);
                arraySort(state.entries, function(a, b) {
                    return a.key > b.key ? 1 : -1;
                });
                state.updateURL();
            },
            forEach: function forEach(callback) {
                var entries = getInternalParamsState(this).entries;
                var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined);
                var index = 0;
                var entry;
                while (index < entries.length) {
                    entry = entries[index++];
                    boundFunction(entry.value, entry.key, this);
                }
            },
            keys: function keys() {
                return new URLSearchParamsIterator(this, "keys");
            },
            values: function values() {
                return new URLSearchParamsIterator(this, "values");
            },
            entries: function entries() {
                return new URLSearchParamsIterator(this, "entries");
            }
        }, {
            enumerable: true
        });
        defineBuiltIn(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, {
            name: "entries"
        });
        defineBuiltIn(URLSearchParamsPrototype, "toString", function toString() {
            return getInternalParamsState(this).serialize();
        }, {
            enumerable: true
        });
        if (DESCRIPTORS) defineBuiltInAccessor(URLSearchParamsPrototype, "size", {
            get: function size() {
                return getInternalParamsState(this).entries.length;
            },
            configurable: true,
            enumerable: true
        });
        setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);
        $({
            global: true,
            constructor: true,
            forced: !USE_NATIVE_URL
        }, {
            URLSearchParams: URLSearchParamsConstructor
        });
        if (!USE_NATIVE_URL && isCallable(Headers)) {
            var headersHas = uncurryThis(HeadersPrototype.has);
            var headersSet = uncurryThis(HeadersPrototype.set);
            var wrapRequestOptions = function(init) {
                if (isObject(init)) {
                    var body = init.body;
                    var headers;
                    if (classof(body) === URL_SEARCH_PARAMS) {
                        headers = init.headers ? new Headers(init.headers) : new Headers;
                        if (!headersHas(headers, "content-type")) {
                            headersSet(headers, "content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                        }
                        return create(init, {
                            body: createPropertyDescriptor(0, $toString(body)),
                            headers: createPropertyDescriptor(0, headers)
                        });
                    }
                }
                return init;
            };
            if (isCallable(nativeFetch)) {
                $({
                    global: true,
                    enumerable: true,
                    dontCallGetSet: true,
                    forced: true
                }, {
                    fetch: function fetch(input) {
                        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
                    }
                });
            }
            if (isCallable(NativeRequest)) {
                var RequestConstructor = function Request(input) {
                    anInstance(this, RequestPrototype);
                    return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
                };
                RequestPrototype.constructor = RequestConstructor;
                RequestConstructor.prototype = RequestPrototype;
                $({
                    global: true,
                    constructor: true,
                    dontCallGetSet: true,
                    forced: true
                }, {
                    Request: RequestConstructor
                });
            }
        }
        web_urlSearchParams_constructor = {
            URLSearchParams: URLSearchParamsConstructor,
            getState: getInternalParamsState
        };
        return web_urlSearchParams_constructor;
    }
    var hasRequiredWeb_url_constructor;
    function requireWeb_url_constructor() {
        if (hasRequiredWeb_url_constructor) return web_url_constructor;
        hasRequiredWeb_url_constructor = 1;
        requireEs_string_iterator();
        var $ = require_export();
        var DESCRIPTORS = requireDescriptors();
        var USE_NATIVE_URL = requireUrlConstructorDetection();
        var globalThis = requireGlobalThis();
        var bind = requireFunctionBindContext();
        var uncurryThis = requireFunctionUncurryThis();
        var defineBuiltIn = requireDefineBuiltIn();
        var defineBuiltInAccessor = requireDefineBuiltInAccessor();
        var anInstance = requireAnInstance();
        var hasOwn = requireHasOwnProperty();
        var assign = requireObjectAssign();
        var arrayFrom = requireArrayFrom();
        var arraySlice = requireArraySlice();
        var codeAt = requireStringMultibyte().codeAt;
        var toASCII = requireStringPunycodeToAscii();
        var $toString = requireToString();
        var setToStringTag = requireSetToStringTag();
        var validateArgumentsLength = requireValidateArgumentsLength();
        var URLSearchParamsModule = requireWeb_urlSearchParams_constructor();
        var InternalStateModule = requireInternalState();
        var setInternalState = InternalStateModule.set;
        var getInternalURLState = InternalStateModule.getterFor("URL");
        var URLSearchParams = URLSearchParamsModule.URLSearchParams;
        var getInternalSearchParamsState = URLSearchParamsModule.getState;
        var NativeURL = globalThis.URL;
        var TypeError = globalThis.TypeError;
        var parseInt = globalThis.parseInt;
        var floor = Math.floor;
        var pow = Math.pow;
        var charAt = uncurryThis("".charAt);
        var exec = uncurryThis(/./.exec);
        var join = uncurryThis([].join);
        var numberToString = uncurryThis(1.1.toString);
        var pop = uncurryThis([].pop);
        var push = uncurryThis([].push);
        var replace = uncurryThis("".replace);
        var shift = uncurryThis([].shift);
        var split = uncurryThis("".split);
        var stringSlice = uncurryThis("".slice);
        var toLowerCase = uncurryThis("".toLowerCase);
        var unshift = uncurryThis([].unshift);
        var INVALID_AUTHORITY = "Invalid authority";
        var INVALID_SCHEME = "Invalid scheme";
        var INVALID_HOST = "Invalid host";
        var INVALID_PORT = "Invalid port";
        var ALPHA = /[a-z]/i;
        var ALPHANUMERIC = /[\d+-.a-z]/i;
        var DIGIT = /\d/;
        var HEX_START = /^0x/i;
        var OCT = /^[0-7]+$/;
        var DEC = /^\d+$/;
        var HEX = /^[\da-f]+$/i;
        var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
        var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
        var LEADING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+/;
        var TRAILING_C0_CONTROL_OR_SPACE = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/;
        var TAB_AND_NEW_LINE = /[\t\n\r]/g;
        var EOF;
        var parseIPv4 = function(input) {
            var parts = split(input, ".");
            var partsLength, numbers, index, part, radix, number, ipv4;
            if (parts.length && parts[parts.length - 1] === "") {
                parts.length--;
            }
            partsLength = parts.length;
            if (partsLength > 4) return input;
            numbers = [];
            for (index = 0; index < partsLength; index++) {
                part = parts[index];
                if (part === "") return input;
                radix = 10;
                if (part.length > 1 && charAt(part, 0) === "0") {
                    radix = exec(HEX_START, part) ? 16 : 8;
                    part = stringSlice(part, radix === 8 ? 1 : 2);
                }
                if (part === "") {
                    number = 0;
                } else {
                    if (!exec(radix === 10 ? DEC : radix === 8 ? OCT : HEX, part)) return input;
                    number = parseInt(part, radix);
                }
                push(numbers, number);
            }
            for (index = 0; index < partsLength; index++) {
                number = numbers[index];
                if (index === partsLength - 1) {
                    if (number >= pow(256, 5 - partsLength)) return null;
                } else if (number > 255) return null;
            }
            ipv4 = pop(numbers);
            for (index = 0; index < numbers.length; index++) {
                ipv4 += numbers[index] * pow(256, 3 - index);
            }
            return ipv4;
        };
        var parseIPv6 = function(input) {
            var address = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
            var pieceIndex = 0;
            var compress = null;
            var pointer = 0;
            var value, length, numbersSeen, ipv4Piece, number, swaps, swap;
            var chr = function() {
                return charAt(input, pointer);
            };
            if (chr() === ":") {
                if (charAt(input, 1) !== ":") return;
                pointer += 2;
                pieceIndex++;
                compress = pieceIndex;
            }
            while (chr()) {
                if (pieceIndex === 8) return;
                if (chr() === ":") {
                    if (compress !== null) return;
                    pointer++;
                    pieceIndex++;
                    compress = pieceIndex;
                    continue;
                }
                value = length = 0;
                while (length < 4 && exec(HEX, chr())) {
                    value = value * 16 + parseInt(chr(), 16);
                    pointer++;
                    length++;
                }
                if (chr() === ".") {
                    if (length === 0) return;
                    pointer -= length;
                    if (pieceIndex > 6) return;
                    numbersSeen = 0;
                    while (chr()) {
                        ipv4Piece = null;
                        if (numbersSeen > 0) {
                            if (chr() === "." && numbersSeen < 4) pointer++; else return;
                        }
                        if (!exec(DIGIT, chr())) return;
                        while (exec(DIGIT, chr())) {
                            number = parseInt(chr(), 10);
                            if (ipv4Piece === null) ipv4Piece = number; else if (ipv4Piece === 0) return; else ipv4Piece = ipv4Piece * 10 + number;
                            if (ipv4Piece > 255) return;
                            pointer++;
                        }
                        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
                        numbersSeen++;
                        if (numbersSeen === 2 || numbersSeen === 4) pieceIndex++;
                    }
                    if (numbersSeen !== 4) return;
                    break;
                } else if (chr() === ":") {
                    pointer++;
                    if (!chr()) return;
                } else if (chr()) return;
                address[pieceIndex++] = value;
            }
            if (compress !== null) {
                swaps = pieceIndex - compress;
                pieceIndex = 7;
                while (pieceIndex !== 0 && swaps > 0) {
                    swap = address[pieceIndex];
                    address[pieceIndex--] = address[compress + swaps - 1];
                    address[compress + --swaps] = swap;
                }
            } else if (pieceIndex !== 8) return;
            return address;
        };
        var findLongestZeroSequence = function(ipv6) {
            var maxIndex = null;
            var maxLength = 1;
            var currStart = null;
            var currLength = 0;
            var index = 0;
            for (;index < 8; index++) {
                if (ipv6[index] !== 0) {
                    if (currLength > maxLength) {
                        maxIndex = currStart;
                        maxLength = currLength;
                    }
                    currStart = null;
                    currLength = 0;
                } else {
                    if (currStart === null) currStart = index;
                    ++currLength;
                }
            }
            return currLength > maxLength ? currStart : maxIndex;
        };
        var serializeHost = function(host) {
            var result, index, compress, ignore0;
            if (typeof host == "number") {
                result = [];
                for (index = 0; index < 4; index++) {
                    unshift(result, host % 256);
                    host = floor(host / 256);
                }
                return join(result, ".");
            }
            if (typeof host == "object") {
                result = "";
                compress = findLongestZeroSequence(host);
                for (index = 0; index < 8; index++) {
                    if (ignore0 && host[index] === 0) continue;
                    if (ignore0) ignore0 = false;
                    if (compress === index) {
                        result += index ? ":" : "::";
                        ignore0 = true;
                    } else {
                        result += numberToString(host[index], 16);
                        if (index < 7) result += ":";
                    }
                }
                return "[" + result + "]";
            }
            return host;
        };
        var C0ControlPercentEncodeSet = {};
        var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
            " ": 1,
            '"': 1,
            "<": 1,
            ">": 1,
            "`": 1
        });
        var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
            "#": 1,
            "?": 1,
            "{": 1,
            "}": 1
        });
        var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
            "/": 1,
            ":": 1,
            ";": 1,
            "=": 1,
            "@": 1,
            "[": 1,
            "\\": 1,
            "]": 1,
            "^": 1,
            "|": 1
        });
        var percentEncode = function(chr, set) {
            var code = codeAt(chr, 0);
            return code > 32 && code < 127 && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
        };
        var specialSchemes = {
            ftp: 21,
            file: null,
            http: 80,
            https: 443,
            ws: 80,
            wss: 443
        };
        var isWindowsDriveLetter = function(string, normalized) {
            var second;
            return string.length === 2 && exec(ALPHA, charAt(string, 0)) && ((second = charAt(string, 1)) === ":" || !normalized && second === "|");
        };
        var startsWithWindowsDriveLetter = function(string) {
            var third;
            return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (string.length === 2 || ((third = charAt(string, 2)) === "/" || third === "\\" || third === "?" || third === "#"));
        };
        var isSingleDot = function(segment) {
            return segment === "." || toLowerCase(segment) === "%2e";
        };
        var isDoubleDot = function(segment) {
            segment = toLowerCase(segment);
            return segment === ".." || segment === "%2e." || segment === ".%2e" || segment === "%2e%2e";
        };
        var SCHEME_START = {};
        var SCHEME = {};
        var NO_SCHEME = {};
        var SPECIAL_RELATIVE_OR_AUTHORITY = {};
        var PATH_OR_AUTHORITY = {};
        var RELATIVE = {};
        var RELATIVE_SLASH = {};
        var SPECIAL_AUTHORITY_SLASHES = {};
        var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
        var AUTHORITY = {};
        var HOST = {};
        var HOSTNAME = {};
        var PORT = {};
        var FILE = {};
        var FILE_SLASH = {};
        var FILE_HOST = {};
        var PATH_START = {};
        var PATH = {};
        var CANNOT_BE_A_BASE_URL_PATH = {};
        var QUERY = {};
        var FRAGMENT = {};
        var URLState = function(url, isBase, base) {
            var urlString = $toString(url);
            var baseState, failure, searchParams;
            if (isBase) {
                failure = this.parse(urlString);
                if (failure) throw new TypeError(failure);
                this.searchParams = null;
            } else {
                if (base !== undefined) baseState = new URLState(base, true);
                failure = this.parse(urlString, null, baseState);
                if (failure) throw new TypeError(failure);
                searchParams = getInternalSearchParamsState(new URLSearchParams);
                searchParams.bindURL(this);
                this.searchParams = searchParams;
            }
        };
        URLState.prototype = {
            type: "URL",
            parse: function(input, stateOverride, base) {
                var url = this;
                var state = stateOverride || SCHEME_START;
                var pointer = 0;
                var buffer = "";
                var seenAt = false;
                var seenBracket = false;
                var seenPasswordToken = false;
                var codePoints, chr, bufferCodePoints, failure;
                input = $toString(input);
                if (!stateOverride) {
                    url.scheme = "";
                    url.username = "";
                    url.password = "";
                    url.host = null;
                    url.port = null;
                    url.path = [];
                    url.query = null;
                    url.fragment = null;
                    url.cannotBeABaseURL = false;
                    input = replace(input, LEADING_C0_CONTROL_OR_SPACE, "");
                    input = replace(input, TRAILING_C0_CONTROL_OR_SPACE, "$1");
                }
                input = replace(input, TAB_AND_NEW_LINE, "");
                codePoints = arrayFrom(input);
                while (pointer <= codePoints.length) {
                    chr = codePoints[pointer];
                    switch (state) {
                      case SCHEME_START:
                        if (chr && exec(ALPHA, chr)) {
                            buffer += toLowerCase(chr);
                            state = SCHEME;
                        } else if (!stateOverride) {
                            state = NO_SCHEME;
                            continue;
                        } else return INVALID_SCHEME;
                        break;

                      case SCHEME:
                        if (chr && (exec(ALPHANUMERIC, chr) || chr === "+" || chr === "-" || chr === ".")) {
                            buffer += toLowerCase(chr);
                        } else if (chr === ":") {
                            if (stateOverride && (url.isSpecial() !== hasOwn(specialSchemes, buffer) || buffer === "file" && (url.includesCredentials() || url.port !== null) || url.scheme === "file" && !url.host)) return;
                            url.scheme = buffer;
                            if (stateOverride) {
                                if (url.isSpecial() && specialSchemes[url.scheme] === url.port) url.port = null;
                                return;
                            }
                            buffer = "";
                            if (url.scheme === "file") {
                                state = FILE;
                            } else if (url.isSpecial() && base && base.scheme === url.scheme) {
                                state = SPECIAL_RELATIVE_OR_AUTHORITY;
                            } else if (url.isSpecial()) {
                                state = SPECIAL_AUTHORITY_SLASHES;
                            } else if (codePoints[pointer + 1] === "/") {
                                state = PATH_OR_AUTHORITY;
                                pointer++;
                            } else {
                                url.cannotBeABaseURL = true;
                                push(url.path, "");
                                state = CANNOT_BE_A_BASE_URL_PATH;
                            }
                        } else if (!stateOverride) {
                            buffer = "";
                            state = NO_SCHEME;
                            pointer = 0;
                            continue;
                        } else return INVALID_SCHEME;
                        break;

                      case NO_SCHEME:
                        if (!base || base.cannotBeABaseURL && chr !== "#") return INVALID_SCHEME;
                        if (base.cannotBeABaseURL && chr === "#") {
                            url.scheme = base.scheme;
                            url.path = arraySlice(base.path);
                            url.query = base.query;
                            url.fragment = "";
                            url.cannotBeABaseURL = true;
                            state = FRAGMENT;
                            break;
                        }
                        state = base.scheme === "file" ? FILE : RELATIVE;
                        continue;

                      case SPECIAL_RELATIVE_OR_AUTHORITY:
                        if (chr === "/" && codePoints[pointer + 1] === "/") {
                            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
                            pointer++;
                        } else {
                            state = RELATIVE;
                            continue;
                        }
                        break;

                      case PATH_OR_AUTHORITY:
                        if (chr === "/") {
                            state = AUTHORITY;
                            break;
                        } else {
                            state = PATH;
                            continue;
                        }

                      case RELATIVE:
                        url.scheme = base.scheme;
                        if (chr === EOF) {
                            url.username = base.username;
                            url.password = base.password;
                            url.host = base.host;
                            url.port = base.port;
                            url.path = arraySlice(base.path);
                            url.query = base.query;
                        } else if (chr === "/" || chr === "\\" && url.isSpecial()) {
                            state = RELATIVE_SLASH;
                        } else if (chr === "?") {
                            url.username = base.username;
                            url.password = base.password;
                            url.host = base.host;
                            url.port = base.port;
                            url.path = arraySlice(base.path);
                            url.query = "";
                            state = QUERY;
                        } else if (chr === "#") {
                            url.username = base.username;
                            url.password = base.password;
                            url.host = base.host;
                            url.port = base.port;
                            url.path = arraySlice(base.path);
                            url.query = base.query;
                            url.fragment = "";
                            state = FRAGMENT;
                        } else {
                            url.username = base.username;
                            url.password = base.password;
                            url.host = base.host;
                            url.port = base.port;
                            url.path = arraySlice(base.path);
                            url.path.length--;
                            state = PATH;
                            continue;
                        }
                        break;

                      case RELATIVE_SLASH:
                        if (url.isSpecial() && (chr === "/" || chr === "\\")) {
                            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
                        } else if (chr === "/") {
                            state = AUTHORITY;
                        } else {
                            url.username = base.username;
                            url.password = base.password;
                            url.host = base.host;
                            url.port = base.port;
                            state = PATH;
                            continue;
                        }
                        break;

                      case SPECIAL_AUTHORITY_SLASHES:
                        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
                        if (chr !== "/" || charAt(buffer, pointer + 1) !== "/") continue;
                        pointer++;
                        break;

                      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
                        if (chr !== "/" && chr !== "\\") {
                            state = AUTHORITY;
                            continue;
                        }
                        break;

                      case AUTHORITY:
                        if (chr === "@") {
                            if (seenAt) buffer = "%40" + buffer;
                            seenAt = true;
                            bufferCodePoints = arrayFrom(buffer);
                            for (var i = 0; i < bufferCodePoints.length; i++) {
                                var codePoint = bufferCodePoints[i];
                                if (codePoint === ":" && !seenPasswordToken) {
                                    seenPasswordToken = true;
                                    continue;
                                }
                                var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
                                if (seenPasswordToken) url.password += encodedCodePoints; else url.username += encodedCodePoints;
                            }
                            buffer = "";
                        } else if (chr === EOF || chr === "/" || chr === "?" || chr === "#" || chr === "\\" && url.isSpecial()) {
                            if (seenAt && buffer === "") return INVALID_AUTHORITY;
                            pointer -= arrayFrom(buffer).length + 1;
                            buffer = "";
                            state = HOST;
                        } else buffer += chr;
                        break;

                      case HOST:
                      case HOSTNAME:
                        if (stateOverride && url.scheme === "file") {
                            state = FILE_HOST;
                            continue;
                        } else if (chr === ":" && !seenBracket) {
                            if (buffer === "") return INVALID_HOST;
                            failure = url.parseHost(buffer);
                            if (failure) return failure;
                            buffer = "";
                            state = PORT;
                            if (stateOverride === HOSTNAME) return;
                        } else if (chr === EOF || chr === "/" || chr === "?" || chr === "#" || chr === "\\" && url.isSpecial()) {
                            if (url.isSpecial() && buffer === "") return INVALID_HOST;
                            if (stateOverride && buffer === "" && (url.includesCredentials() || url.port !== null)) return;
                            failure = url.parseHost(buffer);
                            if (failure) return failure;
                            buffer = "";
                            state = PATH_START;
                            if (stateOverride) return;
                            continue;
                        } else {
                            if (chr === "[") seenBracket = true; else if (chr === "]") seenBracket = false;
                            buffer += chr;
                        }
                        break;

                      case PORT:
                        if (exec(DIGIT, chr)) {
                            buffer += chr;
                        } else if (chr === EOF || chr === "/" || chr === "?" || chr === "#" || chr === "\\" && url.isSpecial() || stateOverride) {
                            if (buffer !== "") {
                                var port = parseInt(buffer, 10);
                                if (port > 65535) return INVALID_PORT;
                                url.port = url.isSpecial() && port === specialSchemes[url.scheme] ? null : port;
                                buffer = "";
                            }
                            if (stateOverride) return;
                            state = PATH_START;
                            continue;
                        } else return INVALID_PORT;
                        break;

                      case FILE:
                        url.scheme = "file";
                        if (chr === "/" || chr === "\\") state = FILE_SLASH; else if (base && base.scheme === "file") {
                            switch (chr) {
                              case EOF:
                                url.host = base.host;
                                url.path = arraySlice(base.path);
                                url.query = base.query;
                                break;

                              case "?":
                                url.host = base.host;
                                url.path = arraySlice(base.path);
                                url.query = "";
                                state = QUERY;
                                break;

                              case "#":
                                url.host = base.host;
                                url.path = arraySlice(base.path);
                                url.query = base.query;
                                url.fragment = "";
                                state = FRAGMENT;
                                break;

                              default:
                                if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ""))) {
                                    url.host = base.host;
                                    url.path = arraySlice(base.path);
                                    url.shortenPath();
                                }
                                state = PATH;
                                continue;
                            }
                        } else {
                            state = PATH;
                            continue;
                        }
                        break;

                      case FILE_SLASH:
                        if (chr === "/" || chr === "\\") {
                            state = FILE_HOST;
                            break;
                        }
                        if (base && base.scheme === "file" && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ""))) {
                            if (isWindowsDriveLetter(base.path[0], true)) push(url.path, base.path[0]); else url.host = base.host;
                        }
                        state = PATH;
                        continue;

                      case FILE_HOST:
                        if (chr === EOF || chr === "/" || chr === "\\" || chr === "?" || chr === "#") {
                            if (!stateOverride && isWindowsDriveLetter(buffer)) {
                                state = PATH;
                            } else if (buffer === "") {
                                url.host = "";
                                if (stateOverride) return;
                                state = PATH_START;
                            } else {
                                failure = url.parseHost(buffer);
                                if (failure) return failure;
                                if (url.host === "localhost") url.host = "";
                                if (stateOverride) return;
                                buffer = "";
                                state = PATH_START;
                            }
                            continue;
                        } else buffer += chr;
                        break;

                      case PATH_START:
                        if (url.isSpecial()) {
                            state = PATH;
                            if (chr !== "/" && chr !== "\\") continue;
                        } else if (!stateOverride && chr === "?") {
                            url.query = "";
                            state = QUERY;
                        } else if (!stateOverride && chr === "#") {
                            url.fragment = "";
                            state = FRAGMENT;
                        } else if (chr !== EOF) {
                            state = PATH;
                            if (chr !== "/") continue;
                        }
                        break;

                      case PATH:
                        if (chr === EOF || chr === "/" || chr === "\\" && url.isSpecial() || !stateOverride && (chr === "?" || chr === "#")) {
                            if (isDoubleDot(buffer)) {
                                url.shortenPath();
                                if (chr !== "/" && !(chr === "\\" && url.isSpecial())) {
                                    push(url.path, "");
                                }
                            } else if (isSingleDot(buffer)) {
                                if (chr !== "/" && !(chr === "\\" && url.isSpecial())) {
                                    push(url.path, "");
                                }
                            } else {
                                if (url.scheme === "file" && !url.path.length && isWindowsDriveLetter(buffer)) {
                                    if (url.host) url.host = "";
                                    buffer = charAt(buffer, 0) + ":";
                                }
                                push(url.path, buffer);
                            }
                            buffer = "";
                            if (url.scheme === "file" && (chr === EOF || chr === "?" || chr === "#")) {
                                while (url.path.length > 1 && url.path[0] === "") {
                                    shift(url.path);
                                }
                            }
                            if (chr === "?") {
                                url.query = "";
                                state = QUERY;
                            } else if (chr === "#") {
                                url.fragment = "";
                                state = FRAGMENT;
                            }
                        } else {
                            buffer += percentEncode(chr, pathPercentEncodeSet);
                        }
                        break;

                      case CANNOT_BE_A_BASE_URL_PATH:
                        if (chr === "?") {
                            url.query = "";
                            state = QUERY;
                        } else if (chr === "#") {
                            url.fragment = "";
                            state = FRAGMENT;
                        } else if (chr !== EOF) {
                            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
                        }
                        break;

                      case QUERY:
                        if (!stateOverride && chr === "#") {
                            url.fragment = "";
                            state = FRAGMENT;
                        } else if (chr !== EOF) {
                            if (chr === "'" && url.isSpecial()) url.query += "%27"; else if (chr === "#") url.query += "%23"; else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
                        }
                        break;

                      case FRAGMENT:
                        if (chr !== EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
                        break;
                    }
                    pointer++;
                }
            },
            parseHost: function(input) {
                var result, codePoints, index;
                if (charAt(input, 0) === "[") {
                    if (charAt(input, input.length - 1) !== "]") return INVALID_HOST;
                    result = parseIPv6(stringSlice(input, 1, -1));
                    if (!result) return INVALID_HOST;
                    this.host = result;
                } else if (!this.isSpecial()) {
                    if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
                    result = "";
                    codePoints = arrayFrom(input);
                    for (index = 0; index < codePoints.length; index++) {
                        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
                    }
                    this.host = result;
                } else {
                    input = toASCII(input);
                    if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
                    result = parseIPv4(input);
                    if (result === null) return INVALID_HOST;
                    this.host = result;
                }
            },
            cannotHaveUsernamePasswordPort: function() {
                return !this.host || this.cannotBeABaseURL || this.scheme === "file";
            },
            includesCredentials: function() {
                return this.username !== "" || this.password !== "";
            },
            isSpecial: function() {
                return hasOwn(specialSchemes, this.scheme);
            },
            shortenPath: function() {
                var path = this.path;
                var pathSize = path.length;
                if (pathSize && (this.scheme !== "file" || pathSize !== 1 || !isWindowsDriveLetter(path[0], true))) {
                    path.length--;
                }
            },
            serialize: function() {
                var url = this;
                var scheme = url.scheme;
                var username = url.username;
                var password = url.password;
                var host = url.host;
                var port = url.port;
                var path = url.path;
                var query = url.query;
                var fragment = url.fragment;
                var output = scheme + ":";
                if (host !== null) {
                    output += "//";
                    if (url.includesCredentials()) {
                        output += username + (password ? ":" + password : "") + "@";
                    }
                    output += serializeHost(host);
                    if (port !== null) output += ":" + port;
                } else if (scheme === "file") output += "//";
                output += url.cannotBeABaseURL ? path[0] : path.length ? "/" + join(path, "/") : "";
                if (query !== null) output += "?" + query;
                if (fragment !== null) output += "#" + fragment;
                return output;
            },
            setHref: function(href) {
                var failure = this.parse(href);
                if (failure) throw new TypeError(failure);
                this.searchParams.update();
            },
            getOrigin: function() {
                var scheme = this.scheme;
                var port = this.port;
                if (scheme === "blob") try {
                    return new URLConstructor(scheme.path[0]).origin;
                } catch (error) {
                    return "null";
                }
                if (scheme === "file" || !this.isSpecial()) return "null";
                return scheme + "://" + serializeHost(this.host) + (port !== null ? ":" + port : "");
            },
            getProtocol: function() {
                return this.scheme + ":";
            },
            setProtocol: function(protocol) {
                this.parse($toString(protocol) + ":", SCHEME_START);
            },
            getUsername: function() {
                return this.username;
            },
            setUsername: function(username) {
                var codePoints = arrayFrom($toString(username));
                if (this.cannotHaveUsernamePasswordPort()) return;
                this.username = "";
                for (var i = 0; i < codePoints.length; i++) {
                    this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
                }
            },
            getPassword: function() {
                return this.password;
            },
            setPassword: function(password) {
                var codePoints = arrayFrom($toString(password));
                if (this.cannotHaveUsernamePasswordPort()) return;
                this.password = "";
                for (var i = 0; i < codePoints.length; i++) {
                    this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
                }
            },
            getHost: function() {
                var host = this.host;
                var port = this.port;
                return host === null ? "" : port === null ? serializeHost(host) : serializeHost(host) + ":" + port;
            },
            setHost: function(host) {
                if (this.cannotBeABaseURL) return;
                this.parse(host, HOST);
            },
            getHostname: function() {
                var host = this.host;
                return host === null ? "" : serializeHost(host);
            },
            setHostname: function(hostname) {
                if (this.cannotBeABaseURL) return;
                this.parse(hostname, HOSTNAME);
            },
            getPort: function() {
                var port = this.port;
                return port === null ? "" : $toString(port);
            },
            setPort: function(port) {
                if (this.cannotHaveUsernamePasswordPort()) return;
                port = $toString(port);
                if (port === "") this.port = null; else this.parse(port, PORT);
            },
            getPathname: function() {
                var path = this.path;
                return this.cannotBeABaseURL ? path[0] : path.length ? "/" + join(path, "/") : "";
            },
            setPathname: function(pathname) {
                if (this.cannotBeABaseURL) return;
                this.path = [];
                this.parse(pathname, PATH_START);
            },
            getSearch: function() {
                var query = this.query;
                return query ? "?" + query : "";
            },
            setSearch: function(search) {
                search = $toString(search);
                if (search === "") {
                    this.query = null;
                } else {
                    if (charAt(search, 0) === "?") search = stringSlice(search, 1);
                    this.query = "";
                    this.parse(search, QUERY);
                }
                this.searchParams.update();
            },
            getSearchParams: function() {
                return this.searchParams.facade;
            },
            getHash: function() {
                var fragment = this.fragment;
                return fragment ? "#" + fragment : "";
            },
            setHash: function(hash) {
                hash = $toString(hash);
                if (hash === "") {
                    this.fragment = null;
                    return;
                }
                if (charAt(hash, 0) === "#") hash = stringSlice(hash, 1);
                this.fragment = "";
                this.parse(hash, FRAGMENT);
            },
            update: function() {
                this.query = this.searchParams.serialize() || null;
            }
        };
        var URLConstructor = function URL(url) {
            var that = anInstance(this, URLPrototype);
            var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined;
            var state = setInternalState(that, new URLState(url, false, base));
            if (!DESCRIPTORS) {
                that.href = state.serialize();
                that.origin = state.getOrigin();
                that.protocol = state.getProtocol();
                that.username = state.getUsername();
                that.password = state.getPassword();
                that.host = state.getHost();
                that.hostname = state.getHostname();
                that.port = state.getPort();
                that.pathname = state.getPathname();
                that.search = state.getSearch();
                that.searchParams = state.getSearchParams();
                that.hash = state.getHash();
            }
        };
        var URLPrototype = URLConstructor.prototype;
        var accessorDescriptor = function(getter, setter) {
            return {
                get: function() {
                    return getInternalURLState(this)[getter]();
                },
                set: setter && function(value) {
                    return getInternalURLState(this)[setter](value);
                },
                configurable: true,
                enumerable: true
            };
        };
        if (DESCRIPTORS) {
            defineBuiltInAccessor(URLPrototype, "href", accessorDescriptor("serialize", "setHref"));
            defineBuiltInAccessor(URLPrototype, "origin", accessorDescriptor("getOrigin"));
            defineBuiltInAccessor(URLPrototype, "protocol", accessorDescriptor("getProtocol", "setProtocol"));
            defineBuiltInAccessor(URLPrototype, "username", accessorDescriptor("getUsername", "setUsername"));
            defineBuiltInAccessor(URLPrototype, "password", accessorDescriptor("getPassword", "setPassword"));
            defineBuiltInAccessor(URLPrototype, "host", accessorDescriptor("getHost", "setHost"));
            defineBuiltInAccessor(URLPrototype, "hostname", accessorDescriptor("getHostname", "setHostname"));
            defineBuiltInAccessor(URLPrototype, "port", accessorDescriptor("getPort", "setPort"));
            defineBuiltInAccessor(URLPrototype, "pathname", accessorDescriptor("getPathname", "setPathname"));
            defineBuiltInAccessor(URLPrototype, "search", accessorDescriptor("getSearch", "setSearch"));
            defineBuiltInAccessor(URLPrototype, "searchParams", accessorDescriptor("getSearchParams"));
            defineBuiltInAccessor(URLPrototype, "hash", accessorDescriptor("getHash", "setHash"));
        }
        defineBuiltIn(URLPrototype, "toJSON", function toJSON() {
            return getInternalURLState(this).serialize();
        }, {
            enumerable: true
        });
        defineBuiltIn(URLPrototype, "toString", function toString() {
            return getInternalURLState(this).serialize();
        }, {
            enumerable: true
        });
        if (NativeURL) {
            var nativeCreateObjectURL = NativeURL.createObjectURL;
            var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
            if (nativeCreateObjectURL) defineBuiltIn(URLConstructor, "createObjectURL", bind(nativeCreateObjectURL, NativeURL));
            if (nativeRevokeObjectURL) defineBuiltIn(URLConstructor, "revokeObjectURL", bind(nativeRevokeObjectURL, NativeURL));
        }
        setToStringTag(URLConstructor, "URL");
        $({
            global: true,
            constructor: true,
            forced: !USE_NATIVE_URL,
            sham: !DESCRIPTORS
        }, {
            URL: URLConstructor
        });
        return web_url_constructor;
    }
    var hasRequiredWeb_url;
    function requireWeb_url() {
        if (hasRequiredWeb_url) return web_url;
        hasRequiredWeb_url = 1;
        requireWeb_url_constructor();
        return web_url;
    }
    requireWeb_url();
    var web_url_toJson = {};
    var hasRequiredWeb_url_toJson;
    function requireWeb_url_toJson() {
        if (hasRequiredWeb_url_toJson) return web_url_toJson;
        hasRequiredWeb_url_toJson = 1;
        var $ = require_export();
        var call = requireFunctionCall();
        $({
            target: "URL",
            proto: true,
            enumerable: true
        }, {
            toJSON: function toJSON() {
                return call(URL.prototype.toString, this);
            }
        });
        return web_url_toJson;
    }
    requireWeb_url_toJson();
    var web_urlSearchParams = {};
    var hasRequiredWeb_urlSearchParams;
    function requireWeb_urlSearchParams() {
        if (hasRequiredWeb_urlSearchParams) return web_urlSearchParams;
        hasRequiredWeb_urlSearchParams = 1;
        requireWeb_urlSearchParams_constructor();
        return web_urlSearchParams;
    }
    requireWeb_urlSearchParams();
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
    var es_string_includes = {};
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
    var es_weakMap = {};
    var es_weakMap_constructor = {};
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
    var _maxRetries = new WeakMap;
    var _initialDelay = new WeakMap;
    var _maxDelay = new WeakMap;
    var _backoffFactor = new WeakMap;
    var _retryOn = new WeakMap;
    var _requestLimit = new WeakMap;
    var _requestWindow = new WeakMap;
    var _requestTimestamps = new WeakMap;
    var _requestCount = new WeakMap;
    var _lastRequestTime = new WeakMap;
    var _RateLimitedFetcher_brand = new WeakSet;
    var RateLimitedFetcher = function() {
        function RateLimitedFetcher() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            _classCallCheck(this, RateLimitedFetcher);
            _classPrivateMethodInitSpec(this, _RateLimitedFetcher_brand);
            _classPrivateFieldInitSpec(this, _maxRetries, void 0);
            _classPrivateFieldInitSpec(this, _initialDelay, void 0);
            _classPrivateFieldInitSpec(this, _maxDelay, void 0);
            _classPrivateFieldInitSpec(this, _backoffFactor, void 0);
            _classPrivateFieldInitSpec(this, _retryOn, void 0);
            _classPrivateFieldInitSpec(this, _requestLimit, void 0);
            _classPrivateFieldInitSpec(this, _requestWindow, void 0);
            _classPrivateFieldInitSpec(this, _requestTimestamps, void 0);
            _classPrivateFieldInitSpec(this, _requestCount, void 0);
            _classPrivateFieldInitSpec(this, _lastRequestTime, void 0);
            _classPrivateFieldSet2(_maxRetries, this, options.maxRetries || 5);
            _classPrivateFieldSet2(_initialDelay, this, options.initialDelay || 1e3);
            _classPrivateFieldSet2(_maxDelay, this, options.maxDelay || 5e3);
            _classPrivateFieldSet2(_backoffFactor, this, options.backoffFactor || 2);
            _classPrivateFieldSet2(_retryOn, this, options.retryOn || [ 429, 502, 503, 504 ]);
            _classPrivateFieldSet2(_requestLimit, this, 10);
            _classPrivateFieldSet2(_requestWindow, this, 5e3);
            _classPrivateFieldSet2(_requestTimestamps, this, []);
            _classPrivateFieldSet2(_requestCount, this, 0);
            _classPrivateFieldSet2(_lastRequestTime, this, 0);
        }
        return _createClass(RateLimitedFetcher, [ {
            key: "fetchWithRetry",
            value: function() {
                var _fetchWithRetry = _asyncToGenerator(_regenerator().m(function _callee(url, headers, attempt) {
                    var response, delay, message, _delay2, _t;
                    return _regenerator().w(function(_context) {
                        while (1) switch (_context.p = _context.n) {
                          case 0:
                            _context.p = 0;
                            _context.n = 1;
                            return _assertClassBrand(_RateLimitedFetcher_brand, this, _checkAndApplyRateLimit).call(this);

                          case 1:
                            _context.n = 2;
                            return fetch(url, {
                                headers: headers
                            });

                          case 2:
                            response = _context.v;
                            if (!response.ok) {
                                _context.n = 3;
                                break;
                            }
                            return _context.a(2, response);

                          case 3:
                            if (!(_classPrivateFieldGet2(_retryOn, this).includes(response.status) && attempt < _classPrivateFieldGet2(_maxRetries, this))) {
                                _context.n = 5;
                                break;
                            }
                            delay = _assertClassBrand(_RateLimitedFetcher_brand, this, _calculateDelay).call(this, attempt, response);
                            console.log("Attempt ".concat(attempt + 1, "/").concat(_classPrivateFieldGet2(_maxRetries, this), " failed with ").concat(response.status, ". Retrying in ").concat(delay, "ms"));
                            _context.n = 4;
                            return _assertClassBrand(_RateLimitedFetcher_brand, this, _delay).call(this, delay);

                          case 4:
                            return _context.a(2, this.fetchWithRetry(url, headers, attempt + 1));

                          case 5:
                            throw new Error("".concat(response.status, " ").concat(response.statusText));

                          case 6:
                            _context.p = 6;
                            _t = _context.v;
                            if (!(attempt >= _classPrivateFieldGet2(_maxRetries, this))) {
                                _context.n = 7;
                                break;
                            }
                            message = "";
                            if (_t instanceof Error) {
                                message = _t.message;
                            }
                            throw new Error("Request failed after ".concat(_classPrivateFieldGet2(_maxRetries, this), " attempts: ").concat(message));

                          case 7:
                            if (!(attempt < _classPrivateFieldGet2(_maxRetries, this))) {
                                _context.n = 9;
                                break;
                            }
                            _delay2 = _assertClassBrand(_RateLimitedFetcher_brand, this, _calculateDelay).call(this, attempt);
                            console.log("Network error on attempt ".concat(attempt + 1, ". Retrying in ").concat(_delay2, "ms"));
                            _context.n = 8;
                            return _assertClassBrand(_RateLimitedFetcher_brand, this, _delay).call(this, _delay2);

                          case 8:
                            return _context.a(2, this.fetchWithRetry(url, headers, attempt + 1));

                          case 9:
                            throw _t;

                          case 10:
                            return _context.a(2);
                        }
                    }, _callee, this, [ [ 0, 6 ] ]);
                }));
                function fetchWithRetry(_x, _x2, _x3) {
                    return _fetchWithRetry.apply(this, arguments);
                }
                return fetchWithRetry;
            }()
        }, {
            key: "resetCounter",
            value: function resetCounter() {
                _classPrivateFieldSet2(_requestTimestamps, this, []);
                _classPrivateFieldSet2(_requestCount, this, 0);
                _classPrivateFieldSet2(_lastRequestTime, this, 0);
            }
        } ]);
    }();
    function _cleanupOldRequests() {
        var _this = this;
        var now = Date.now();
        _classPrivateFieldSet2(_requestTimestamps, this, _classPrivateFieldGet2(_requestTimestamps, this).filter(function(timestamp) {
            return now - timestamp < _classPrivateFieldGet2(_requestWindow, _this);
        }));
    }
    function _checkAndApplyRateLimit() {
        return _checkAndApplyRateLimit2.apply(this, arguments);
    }
    function _checkAndApplyRateLimit2() {
        _checkAndApplyRateLimit2 = _asyncToGenerator(_regenerator().m(function _callee2() {
            var _this$requestCount;
            var oldestRequest, timeSinceOldest, waitTime, now, timeSinceLastRequest, minDelay;
            return _regenerator().w(function(_context2) {
                while (1) switch (_context2.n) {
                  case 0:
                    _assertClassBrand(_RateLimitedFetcher_brand, this, _cleanupOldRequests).call(this);
                    if (!(_classPrivateFieldGet2(_requestTimestamps, this).length >= _classPrivateFieldGet2(_requestLimit, this))) {
                        _context2.n = 2;
                        break;
                    }
                    oldestRequest = _classPrivateFieldGet2(_requestTimestamps, this)[0];
                    timeSinceOldest = Date.now() - oldestRequest;
                    if (!(timeSinceOldest < _classPrivateFieldGet2(_requestWindow, this))) {
                        _context2.n = 2;
                        break;
                    }
                    waitTime = 500 * _classPrivateFieldGet2(_requestTimestamps, this).length - _classPrivateFieldGet2(_requestLimit, this);
                    if (waitTime < 0) {
                        waitTime = 0;
                        console.warn("Wait time is less than 0");
                    }
                    console.log("Rate limit prevention: ".concat(_classPrivateFieldGet2(_requestTimestamps, this).length, " requests in last ").concat(_classPrivateFieldGet2(_requestWindow, this), "ms. Waiting ").concat(waitTime, "ms..."));
                    _context2.n = 1;
                    return _assertClassBrand(_RateLimitedFetcher_brand, this, _delay).call(this, waitTime);

                  case 1:
                    _assertClassBrand(_RateLimitedFetcher_brand, this, _cleanupOldRequests).call(this);

                  case 2:
                    _classPrivateFieldGet2(_requestTimestamps, this).push(Date.now());
                    _classPrivateFieldSet2(_requestCount, this, (_this$requestCount = _classPrivateFieldGet2(_requestCount, this), 
                    _this$requestCount++, _this$requestCount));
                    now = Date.now();
                    timeSinceLastRequest = now - _classPrivateFieldGet2(_lastRequestTime, this);
                    minDelay = 100;
                    if (!(timeSinceLastRequest < minDelay && _classPrivateFieldGet2(_lastRequestTime, this) > 0)) {
                        _context2.n = 3;
                        break;
                    }
                    _context2.n = 3;
                    return _assertClassBrand(_RateLimitedFetcher_brand, this, _delay).call(this, minDelay - timeSinceLastRequest);

                  case 3:
                    _classPrivateFieldSet2(_lastRequestTime, this, Date.now());

                  case 4:
                    return _context2.a(2);
                }
            }, _callee2, this);
        }));
        return _checkAndApplyRateLimit2.apply(this, arguments);
    }
    function _calculateDelay(attempt) {
        var response = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var retryAfterHeader = response === null || response === void 0 ? void 0 : response.headers.get("Retry-After");
        if (retryAfterHeader) {
            var seconds = parseInt(retryAfterHeader);
            if (seconds > 86400) {
                var timestamp = parseInt(retryAfterHeader) * 1e3;
                return Math.max(0, timestamp - Date.now());
            }
            return seconds * 1e3;
        }
        var exponentialDelay = _classPrivateFieldGet2(_initialDelay, this) * Math.pow(_classPrivateFieldGet2(_backoffFactor, this), attempt);
        var jitter = Math.random() * 1e3;
        return Math.min(exponentialDelay + jitter, _classPrivateFieldGet2(_maxDelay, this));
    }
    function _delay(ms) {
        return new Promise(function(resolve) {
            return setTimeout(resolve, ms);
        });
    }
    var ZoteroSdk = function ZoteroSdk() {
        this._apiKey = null;
        this._userId = 0;
        this._userGroups = [];
        this._isOnlineAvailable = true;
        this._fetcher = new RateLimitedFetcher({
            maxRetries: 5,
            initialDelay: 5e3
        });
    };
    ZoteroSdk.prototype.ZOTERO_API_VERSION = "3";
    ZoteroSdk.prototype.USER_AGENT = "AscDesktopEditor";
    ZoteroSdk.prototype.DEFAULT_FORMAT = "csljson";
    ZoteroSdk.prototype.STORAGE_KEYS = {
        USER_ID: "zoteroUserId",
        API_KEY: "zoteroApiKey"
    };
    ZoteroSdk.prototype.API_PATHS = {
        USERS: "users",
        GROUPS: "groups",
        ITEMS: "items",
        KEYS: "keys"
    };
    ZoteroSdk.prototype._getBaseUrl = function() {
        return this._isOnlineAvailable ? zoteroEnvironment.restApiUrl : zoteroEnvironment.desktopApiUrl;
    };
    ZoteroSdk.prototype._getDesktopRequest = function(url) {
        var self = this;
        return new Promise(function(resolve, reject) {
            window.AscSimpleRequest.createRequest({
                url: url,
                method: "GET",
                headers: {
                    "Zotero-API-Version": self.ZOTERO_API_VERSION,
                    "User-Agent": self.USER_AGENT
                },
                complete: resolve,
                error: function error(_error) {
                    if (_error.statusCode === -102) {
                        _error.statusCode = 404;
                        _error.message = "Connection to Zotero failed. Make sure Zotero is running";
                    }
                    reject(_error);
                }
            });
        });
    };
    ZoteroSdk.prototype._getOnlineRequest = function(url) {
        var headers = {
            "Zotero-API-Version": this.ZOTERO_API_VERSION,
            "Zotero-API-Key": this._apiKey || ""
        };
        return fetch(url, {
            headers: headers
        }).then(function(response) {
            if (!response.ok) {
                var message = response.status + " " + response.statusText;
                console.error(message);
                throw new Error(message);
            }
            return response;
        }).catch(function(error) {
            if (_typeof(error) === "object") {
                error.message = "Connection to Zotero failed";
            }
            throw error;
        });
    };
    ZoteroSdk.prototype._getRequestWithOfflineSupport = function(url) {
        return this._isOnlineAvailable ? this._getOnlineRequest(url) : this._getDesktopRequest(url.href);
    };
    ZoteroSdk.prototype._buildGetRequest = function(path, queryParams) {
        queryParams = queryParams || {};
        var url = new URL(path, this._getBaseUrl());
        Object.keys(queryParams).forEach(function(key) {
            if (queryParams[key] !== undefined && queryParams[key] !== null) {
                url.searchParams.append(key, queryParams[key]);
            }
        });
        return this._getRequestWithOfflineSupport(url);
    };
    ZoteroSdk.prototype._parseLinkHeader = function(headerValue) {
        var links = {};
        var linkHeaderRegex = /<(.*?)>; rel="(.*?)"/g;
        if (!headerValue) return links;
        var match;
        while ((match = linkHeaderRegex.exec(headerValue.trim())) !== null) {
            links[match[2]] = match[1];
        }
        return links;
    };
    ZoteroSdk.prototype._parseDesktopItemsResponse = function(promise, resolve, reject, id) {
        return promise.then(function(response) {
            return {
                items: JSON.parse(response.responseText),
                id: id
            };
        }).then(resolve).catch(reject);
    };
    ZoteroSdk.prototype._parseItemsResponse = function(promise, resolve, reject, id) {
        var self = this;
        return promise.then(function(response) {
            return Promise.all([ response.json(), response ]);
        }).then(function(results) {
            var json = results[0];
            var response = results[1];
            var links = self._parseLinkHeader(response.headers.get("Link") || "");
            var result = {
                items: json,
                id: id
            };
            if (_typeof(json) === "object" && json.items) {
                result.items = json.items;
            }
            if (links.next) {
                result.next = function() {
                    return new Promise(function(rs, rj) {
                        self._parseItemsResponse(self._getOnlineRequest(new URL(links.next)), rs, rj, id);
                    });
                };
            }
            resolve(result);
        }).catch(reject);
    };
    ZoteroSdk.prototype._parseResponse = function(promise, resolve, reject, id) {
        if (this._isOnlineAvailable) {
            var fetchPromise = promise;
            this._parseItemsResponse(fetchPromise, resolve, reject, id);
        } else {
            var ascSimplePromise = promise;
            this._parseDesktopItemsResponse(ascSimplePromise, resolve, reject, id);
        }
    };
    ZoteroSdk.prototype.getItems = function(search, itemsID, format) {
        var self = this;
        format = format || self.DEFAULT_FORMAT;
        return new Promise(function(resolve, reject) {
            var queryParams = {
                format: format
            };
            if (search) {
                queryParams.q = search;
            } else if (itemsID) {
                queryParams.itemKey = itemsID.join(",");
            }
            var path = self.API_PATHS.USERS + "/" + self._userId + "/" + self.API_PATHS.ITEMS;
            var request = self._buildGetRequest(path, queryParams);
            return self._parseResponse(request, resolve, reject, self._userId);
        });
    };
    ZoteroSdk.prototype.getGroupItems = function(search, groupId, itemsID, format) {
        var self = this;
        format = format || self.DEFAULT_FORMAT;
        return new Promise(function(resolve, reject) {
            var queryParams = {
                format: format
            };
            if (search) {
                queryParams.q = search;
            } else if (itemsID) {
                queryParams.itemKey = itemsID.join(",");
            }
            var path = self.API_PATHS.GROUPS + "/" + groupId + "/" + self.API_PATHS.ITEMS;
            var request = self._buildGetRequest(path, queryParams);
            return self._parseResponse(request, resolve, reject, groupId);
        });
    };
    ZoteroSdk.prototype.getUserGroups = function() {
        var self = this;
        return new Promise(function(resolve, reject) {
            if (self._userGroups.length > 0) {
                resolve(self._userGroups);
                return;
            }
            var path = self.API_PATHS.USERS + "/" + self._userId + "/groups";
            self._buildGetRequest(path).then(function(response) {
                if (self._isOnlineAvailable) {
                    var fetchResponse = response;
                    if (!fetchResponse.ok) {
                        throw new Error(fetchResponse.status + " " + fetchResponse.statusText);
                    }
                    return fetchResponse.json();
                }
                var ascSimpleResponse = response;
                return JSON.parse(ascSimpleResponse.responseText);
            }).then(function(groups) {
                self._userGroups = groups.map(function(group) {
                    return {
                        id: group.id,
                        name: group.data.name
                    };
                });
                resolve(self._userGroups);
            }).catch(reject);
        });
    };
    ZoteroSdk.prototype.setApiKey = function(key) {
        var self = this;
        var path = this.API_PATHS.KEYS + "/" + key;
        return this._buildGetRequest(path).then(function(response) {
            var fetchResponse = response;
            if (!fetchResponse.ok) {
                throw new Error(fetchResponse.status + " " + fetchResponse.statusText);
            }
            return fetchResponse.json();
        }).then(function(keyData) {
            self._saveSettings(keyData.userID, key);
            return true;
        });
    };
    ZoteroSdk.prototype._applySettings = function(userId, apiKey) {
        this._userId = userId;
        this._apiKey = apiKey;
    };
    ZoteroSdk.prototype._saveSettings = function(userId, apiKey) {
        this._applySettings(userId, apiKey);
        localStorage.setItem(this.STORAGE_KEYS.USER_ID, String(userId));
        localStorage.setItem(this.STORAGE_KEYS.API_KEY, apiKey);
    };
    ZoteroSdk.prototype.hasSettings = function() {
        var userId = localStorage.getItem(this.STORAGE_KEYS.USER_ID);
        var apiKey = localStorage.getItem(this.STORAGE_KEYS.API_KEY);
        if (userId && apiKey) {
            this._applySettings(Number(userId), apiKey);
            return true;
        }
        return false;
    };
    ZoteroSdk.prototype.clearSettings = function() {
        localStorage.removeItem(this.STORAGE_KEYS.USER_ID);
        localStorage.removeItem(this.STORAGE_KEYS.API_KEY);
        this._userGroups = [];
        this._userId = 0;
        this._apiKey = null;
    };
    ZoteroSdk.prototype.getUserId = function() {
        return this._userId;
    };
    ZoteroSdk.prototype.setIsOnlineAvailable = function(isOnline) {
        this._isOnlineAvailable = isOnline;
    };
    var es_regexp_toString = {};
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
    var es_object_assign = {};
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
    var es_map = {};
    var es_map_constructor = {};
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
    var _container$1 = new WeakMap;
    var _input = new WeakMap;
    var _visualRadio = new WeakMap;
    var _labelElement = new WeakMap;
    var _options = new WeakMap;
    var _handlers = new WeakMap;
    var _subscribers = new WeakMap;
    var _Radio_brand = new WeakSet;
    var Radio = function() {
        function Radio(_radio, options) {
            _classCallCheck(this, Radio);
            _classPrivateMethodInitSpec(this, _Radio_brand);
            _classPrivateFieldInitSpec(this, _container$1, void 0);
            _classPrivateFieldInitSpec(this, _input, void 0);
            _classPrivateFieldInitSpec(this, _visualRadio, void 0);
            _classPrivateFieldInitSpec(this, _labelElement, null);
            _classPrivateFieldInitSpec(this, _options, void 0);
            _classPrivateFieldInitSpec(this, _handlers, new Map);
            _classPrivateFieldInitSpec(this, _subscribers, []);
            if (typeof _radio === "string") {
                var temp = document.getElementById(_radio);
                if (temp instanceof HTMLInputElement) {
                    _radio = temp;
                }
            }
            if (!(_radio instanceof HTMLInputElement)) {
                throw new Error("Invalid input element");
            }
            _classPrivateFieldSet2(_input, this, _radio);
            _classPrivateFieldSet2(_options, this, Object.assign({
                id: "radio_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)),
                checked: false,
                disabled: false,
                indeterminate: false,
                label: "",
                name: "",
                value: "on"
            }, options));
            _assertClassBrand(_Radio_brand, this, _applyInputAttributes).call(this);
            _classPrivateFieldSet2(_container$1, this, document.createElement("div"));
            _classPrivateFieldSet2(_visualRadio, this, document.createElement("span"));
            _assertClassBrand(_Radio_brand, this, _createDOM$2).call(this);
            _assertClassBrand(_Radio_brand, this, _setupEventListeners).call(this);
            _assertClassBrand(_Radio_brand, this, _updateVisualState).call(this);
            if (!_classPrivateFieldGet2(_options, this).name) {
                throw new Error("Name attribute is required");
            }
            var sameNameInstances = _instances$1._.get(_classPrivateFieldGet2(_options, this).name);
            if (!sameNameInstances) {
                sameNameInstances = new Array;
                _instances$1._.set(_classPrivateFieldGet2(_options, this).name, sameNameInstances);
            }
            sameNameInstances.push(this);
        }
        return _createClass(Radio, [ {
            key: "subscribe",
            value: function subscribe(callback) {
                var self = this;
                _classPrivateFieldGet2(_subscribers, this).push(callback);
                return {
                    unsubscribe: function unsubscribe() {
                        _classPrivateFieldSet2(_subscribers, self, _classPrivateFieldGet2(_subscribers, self).filter(function(cb) {
                            return cb !== callback;
                        }));
                    }
                };
            }
        }, {
            key: "getElement",
            value: function getElement() {
                return _classPrivateFieldGet2(_container$1, this);
            }
        }, {
            key: "check",
            value: function check(bSilent) {
                var _this = this;
                if (_classPrivateFieldGet2(_options, this).disabled || _classPrivateFieldGet2(_options, this).checked) return;
                if (_classPrivateFieldGet2(_options, this).name) {
                    var radios = _instances$1._.get(_classPrivateFieldGet2(_options, this).name);
                    radios && radios.forEach(function(radio) {
                        if (radio !== _this && _classPrivateFieldGet2(_options, radio).checked) {
                            radio.uncheck();
                        }
                    });
                }
                _classPrivateFieldGet2(_options, this).checked = true;
                _assertClassBrand(_Radio_brand, this, _updateVisualState).call(this);
                if (bSilent) return;
                _assertClassBrand(_Radio_brand, this, _triggerChange$1).call(this);
            }
        }, {
            key: "uncheck",
            value: function uncheck(bSilent) {
                if (_classPrivateFieldGet2(_options, this).disabled || !_classPrivateFieldGet2(_options, this).checked) return;
                _classPrivateFieldGet2(_options, this).checked = false;
                _assertClassBrand(_Radio_brand, this, _updateVisualState).call(this);
                if (bSilent) return;
                _assertClassBrand(_Radio_brand, this, _triggerChange$1).call(this);
            }
        }, {
            key: "enable",
            value: function enable() {
                if (!_classPrivateFieldGet2(_options, this).disabled) return;
                _classPrivateFieldGet2(_options, this).disabled = false;
                _classPrivateFieldGet2(_input, this).disabled = false;
                _classPrivateFieldGet2(_container$1, this).setAttribute("aria-disabled", "false");
                if (_classPrivateFieldGet2(_options, this).checked) {
                    _classPrivateFieldGet2(_container$1, this).tabIndex = 0;
                } else {
                    _assertClassBrand(_Radio_brand, this, _updateRadioGroupTabIndex).call(this);
                }
                _classPrivateFieldGet2(_container$1, this).classList.remove("radio--disabled");
            }
        }, {
            key: "disable",
            value: function disable() {
                if (_classPrivateFieldGet2(_options, this).disabled) return;
                _classPrivateFieldGet2(_options, this).disabled = true;
                _classPrivateFieldGet2(_input, this).disabled = true;
                _classPrivateFieldGet2(_container$1, this).setAttribute("aria-disabled", "true");
                _classPrivateFieldGet2(_container$1, this).tabIndex = -1;
                _classPrivateFieldGet2(_container$1, this).classList.add("radio--disabled");
            }
        }, {
            key: "setLabel",
            value: function setLabel(label) {
                _classPrivateFieldGet2(_options, this).label = label;
                if (_classPrivateFieldGet2(_labelElement, this)) {
                    _classPrivateFieldGet2(_labelElement, this).textContent = label;
                } else if (label) {
                    _classPrivateFieldSet2(_labelElement, this, document.createElement("label"));
                    _classPrivateFieldGet2(_labelElement, this).className = "radio-label";
                    _classPrivateFieldGet2(_labelElement, this).htmlFor = String(_classPrivateFieldGet2(_options, this).id);
                    _classPrivateFieldGet2(_labelElement, this).textContent = label;
                    _classPrivateFieldGet2(_container$1, this).appendChild(_classPrivateFieldGet2(_labelElement, this));
                }
            }
        }, {
            key: "getState",
            value: function getState() {
                return {
                    checked: !!_classPrivateFieldGet2(_options, this).checked,
                    disabled: !!_classPrivateFieldGet2(_options, this).disabled,
                    value: _classPrivateFieldGet2(_options, this).value || "",
                    name: _classPrivateFieldGet2(_options, this).name || ""
                };
            }
        }, {
            key: "destroy",
            value: function destroy() {
                var _this2 = this;
                _classPrivateFieldSet2(_subscribers, this, []);
                if (!_classPrivateFieldGet2(_options, this).name) return;
                var sameNameInstances = _instances$1._.get(_classPrivateFieldGet2(_options, this).name);
                if (sameNameInstances) {
                    var index = sameNameInstances.indexOf(this);
                    if (index >= 0) sameNameInstances.splice(index, 1);
                }
                _classPrivateFieldGet2(_handlers, this).forEach(function(handler, event) {
                    _classPrivateFieldGet2(_container$1, _this2).removeEventListener(event, handler);
                });
                _classPrivateFieldGet2(_handlers, this).clear();
                if (_classPrivateFieldGet2(_container$1, this) && _classPrivateFieldGet2(_container$1, this).parentNode) {
                    _classPrivateFieldGet2(_container$1, this).parentNode.removeChild(_classPrivateFieldGet2(_container$1, this));
                }
                _classPrivateFieldSet2(_labelElement, this, null);
            }
        } ]);
    }();
    function _applyInputAttributes() {
        _classPrivateFieldGet2(_input, this).type = "radio";
        var elId = _classPrivateFieldGet2(_input, this).getAttribute("id");
        var elName = _classPrivateFieldGet2(_input, this).getAttribute("name");
        var elValue = _classPrivateFieldGet2(_input, this).getAttribute("value");
        var elChecked = _classPrivateFieldGet2(_input, this).getAttribute("checked");
        var elDisabled = _classPrivateFieldGet2(_input, this).getAttribute("disabled");
        if (elId !== null) {
            _classPrivateFieldGet2(_options, this).id = elId;
        } else if (_classPrivateFieldGet2(_options, this).id) {
            _classPrivateFieldGet2(_input, this).setAttribute("id", _classPrivateFieldGet2(_options, this).id);
        }
        if (elName !== null) {
            _classPrivateFieldGet2(_options, this).name = elName;
        } else if (_classPrivateFieldGet2(_options, this).name) {
            _classPrivateFieldGet2(_input, this).setAttribute("name", _classPrivateFieldGet2(_options, this).name);
        }
        if (elValue !== null) {
            _classPrivateFieldGet2(_options, this).value = elValue;
        } else if (_classPrivateFieldGet2(_options, this).value) {
            _classPrivateFieldGet2(_input, this).setAttribute("value", _classPrivateFieldGet2(_options, this).value);
        }
        if (elChecked !== null) {
            _classPrivateFieldGet2(_options, this).checked = elChecked === "true";
        } else if (_classPrivateFieldGet2(_options, this).checked) {
            _classPrivateFieldGet2(_input, this).setAttribute("checked", "true");
        }
        if (elDisabled !== null) {
            _classPrivateFieldGet2(_options, this).disabled = elDisabled === "true";
        } else if (_classPrivateFieldGet2(_options, this).disabled) {
            _classPrivateFieldGet2(_input, this).setAttribute("disabled", "true");
        }
    }
    function _createDOM$2() {
        var parent = _classPrivateFieldGet2(_input, this).parentNode;
        var fragment = document.createDocumentFragment();
        fragment.appendChild(_classPrivateFieldGet2(_container$1, this));
        _classPrivateFieldGet2(_container$1, this).classList.add("radio-button-container");
        _classPrivateFieldGet2(_container$1, this).setAttribute("role", "radio");
        _classPrivateFieldGet2(_container$1, this).setAttribute("aria-checked", String(!!_classPrivateFieldGet2(_options, this).checked));
        _classPrivateFieldGet2(_container$1, this).setAttribute("aria-disabled", String(!!_classPrivateFieldGet2(_options, this).disabled));
        _classPrivateFieldGet2(_container$1, this).tabIndex = _classPrivateFieldGet2(_options, this).disabled ? -1 : 0;
        _classPrivateFieldGet2(_visualRadio, this).className = "radio-visual";
        _classPrivateFieldGet2(_visualRadio, this).setAttribute("aria-hidden", "true");
        if (_classPrivateFieldGet2(_options, this).label) {
            _classPrivateFieldSet2(_labelElement, this, document.createElement("label"));
            _classPrivateFieldGet2(_labelElement, this).className = "i18n radio-label";
            _classPrivateFieldGet2(_labelElement, this).htmlFor = String(_classPrivateFieldGet2(_options, this).id);
            _classPrivateFieldGet2(_labelElement, this).textContent = _classPrivateFieldGet2(_options, this).label;
        }
        if (_classPrivateFieldGet2(_options, this).disabled) {
            _classPrivateFieldGet2(_container$1, this).classList.add("radio--disabled");
        }
        if (parent) {
            parent.insertBefore(fragment, _classPrivateFieldGet2(_input, this));
        }
        _classPrivateFieldGet2(_container$1, this).appendChild(_classPrivateFieldGet2(_input, this));
        _classPrivateFieldGet2(_container$1, this).appendChild(_classPrivateFieldGet2(_visualRadio, this));
        if (_classPrivateFieldGet2(_labelElement, this)) {
            _classPrivateFieldGet2(_container$1, this).appendChild(_classPrivateFieldGet2(_labelElement, this));
        }
        _assertClassBrand(_Radio_brand, this, _updateRadioGroupTabIndex).call(this);
    }
    function _updateRadioGroupTabIndex() {
        var _this3 = this;
        if (_classPrivateFieldGet2(_options, this).checked) {
            _classPrivateFieldGet2(_container$1, this).tabIndex = _classPrivateFieldGet2(_options, this).disabled ? -1 : 0;
        } else if (_classPrivateFieldGet2(_options, this).name && _instances$1._.has(_classPrivateFieldGet2(_options, this).name)) {
            var radios = _instances$1._.get(_classPrivateFieldGet2(_options, this).name);
            var hasChecked = false;
            radios && radios.forEach(function(radio) {
                if (_classPrivateFieldGet2(_options, radio).checked && radio !== _this3) {
                    hasChecked = true;
                }
            });
            if (!hasChecked && !_classPrivateFieldGet2(_options, this).checked && !_classPrivateFieldGet2(_options, this).disabled) {
                _classPrivateFieldGet2(_container$1, this).tabIndex = 0;
            } else {
                _classPrivateFieldGet2(_container$1, this).tabIndex = -1;
            }
        }
    }
    function _setupEventListeners() {
        var _this4 = this;
        var handleClick = function handleClick(e) {
            e.preventDefault();
            if (!_classPrivateFieldGet2(_options, _this4).disabled && !_classPrivateFieldGet2(_options, _this4).checked) {
                _this4.check();
                _classPrivateFieldGet2(_container$1, _this4).focus();
            }
        };
        var handleKeyDown = function handleKeyDown(e) {
            if (_classPrivateFieldGet2(_options, _this4).disabled) return;
            switch (e.key) {
              case " ":
              case "Spacebar":
              case "Enter":
                e.preventDefault();
                if (!_classPrivateFieldGet2(_options, _this4).checked) {
                    _this4.check();
                }
                break;
            }
        };
        var handleFocus = function handleFocus() {
            _classPrivateFieldGet2(_container$1, _this4).classList.add("radio--focused");
        };
        var handleBlur = function handleBlur() {
            _classPrivateFieldGet2(_container$1, _this4).classList.remove("radio--focused");
        };
        _classPrivateFieldGet2(_handlers, this).set("click", handleClick);
        _classPrivateFieldGet2(_handlers, this).set("keydown", handleKeyDown);
        _classPrivateFieldGet2(_handlers, this).set("focus", handleFocus);
        _classPrivateFieldGet2(_handlers, this).set("blur", handleBlur);
        _classPrivateFieldGet2(_container$1, this).addEventListener("click", handleClick);
        _classPrivateFieldGet2(_container$1, this).addEventListener("keydown", handleKeyDown);
        _classPrivateFieldGet2(_container$1, this).addEventListener("focus", handleFocus);
        _classPrivateFieldGet2(_container$1, this).addEventListener("blur", handleBlur);
    }
    function _updateVisualState() {
        _classPrivateFieldGet2(_container$1, this).setAttribute("aria-checked", String(!!_classPrivateFieldGet2(_options, this).checked));
        _classPrivateFieldGet2(_container$1, this).classList.toggle("radio--checked", _classPrivateFieldGet2(_options, this).checked);
        _classPrivateFieldGet2(_input, this).checked = !!_classPrivateFieldGet2(_options, this).checked;
        _assertClassBrand(_Radio_brand, this, _updateRadioGroupTabIndex).call(this);
    }
    function _triggerChange$1(e) {
        var detail = this.getState();
        var objEvent = {
            type: "radio:change",
            detail: detail
        };
        if (e) {
            objEvent.originalEvent = e;
        }
        _classPrivateFieldGet2(_subscribers, this).forEach(function(cb) {
            cb(objEvent);
        });
    }
    var _instances$1 = {
        _: new Map
    };
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
        function SelectBox(container, options) {
            var _this = this;
            _classCallCheck(this, SelectBox);
            _classPrivateMethodInitSpec(this, _SelectBox_brand);
            if (typeof container === "string") {
                var _temp = document.getElementById(container);
                if (_temp instanceof HTMLElement) {
                    container = _temp;
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
                multiple: options.multiple || false,
                description: options.description || ""
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
            _assertClassBrand(_SelectBox_brand, this, _createDOM$1).call(this);
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
    function _createDOM$1() {
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
        this._arrow.innerHTML = '<svg width="6" height="6" viewBox="0 0 6 6" ' + 'fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path fill-rule="evenodd" clip-rule="evenodd"' + ' d="M3 0L0 2.9978L3 5.99561L6 2.9978L3 0ZM3 0.00053797L0.75 2.24889L3 4.49724L5.25 ' + '2.24889L3 0.00053797Z" fill="currentColor"/>' + "</svg>";
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
    var _instances = {
        _: new Set
    };
    var _container = new WeakMap;
    var _Loader_brand = new WeakSet;
    var Loader = function() {
        function Loader(containerId, _text) {
            _classCallCheck(this, Loader);
            _classPrivateMethodInitSpec(this, _Loader_brand);
            _classPrivateFieldInitSpec(this, _container, void 0);
            var temp = document.getElementById(containerId);
            if (temp instanceof HTMLElement === false) throw new Error("Invalid container");
            _classPrivateFieldSet2(_container, this, temp);
            _assertClassBrand(_Loader_brand, this, _createDOM).call(this, _text);
        }
        return _createClass(Loader, [ {
            key: "show",
            value: function show() {
                var _classPrivateFieldGet2$1;
                (_classPrivateFieldGet2$1 = _classPrivateFieldGet2(_container, this)) === null || _classPrivateFieldGet2$1 === void 0 || _classPrivateFieldGet2$1.classList.remove("hidden");
            }
        }, {
            key: "hide",
            value: function hide() {
                var _classPrivateFieldGet3;
                (_classPrivateFieldGet3 = _classPrivateFieldGet2(_container, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.classList.add("hidden");
            }
        } ], [ {
            key: "show",
            value: function show() {
                var _assertClassBrand$_;
                (_assertClassBrand$_ = _assertClassBrand(Loader, this, _mainLoaderContainer)._) === null || _assertClassBrand$_ === void 0 || _assertClassBrand$_.classList.remove("hidden");
            }
        }, {
            key: "hide",
            value: function hide() {
                var _assertClassBrand$_2;
                (_assertClassBrand$_2 = _assertClassBrand(Loader, this, _mainLoaderContainer)._) === null || _assertClassBrand$_2 === void 0 || _assertClassBrand$_2.classList.add("hidden");
            }
        } ]);
    }();
    function _createDOM(text) {
        _classPrivateFieldGet2(_container, this).classList.add("loader-container");
        var svgNS = "http://www.w3.org/2000/svg";
        var image = document.createElementNS(svgNS, "svg");
        image.classList.add("loader-image");
        image.setAttribute("viewBox", "0 0 20 20");
        var circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", "10");
        circle.setAttribute("cy", "10");
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "currentColor");
        circle.setAttribute("stroke-width", "1.5");
        circle.setAttribute("r", "7.25");
        circle.setAttribute("stroke-dasharray", "160%, 40%");
        image.appendChild(circle);
        _classPrivateFieldGet2(_container, this).appendChild(image);
        var title = document.createElement("div");
        title.classList.add("loader-title");
        title.classList.add("i18n");
        title.innerText = text;
        _classPrivateFieldGet2(_container, this).appendChild(title);
    }
    var _mainLoaderContainer = {
        _: document.getElementById("loader")
    };
    function translate(message) {
        return window.Asc.plugin.tr(message);
    }
    var es_string_replace = {};
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
    var es_array_sort = {};
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
    function CitationDocService(citPrefix, citSuffix, bibPrefix, bibSuffix) {
        this._citPrefixOld = "ZOTERO_CITATION";
        this._bibPrefixOld = "ZOTERO_BIBLIOGRAPHY";
        this._citPrefix = citPrefix;
        this._citSuffix = citSuffix;
        this._bibPrefix = bibPrefix;
        this._bibSuffix = bibSuffix;
        this._repeatTimeout;
        this._formatter = null;
    }
    CitationDocService.prototype._addAddinField = function(field) {
        return new Promise(function(resolve) {
            window.Asc.plugin.executeMethod("AddAddinField", [ field ], resolve);
        });
    };
    CitationDocService.prototype.addBibliography = function(text, value) {
        var self = this;
        var supSubPositions = this._removeSuperSubTagsWithPositions(text);
        var field = {
            Value: this._bibPrefix + value + this._bibSuffix,
            Content: supSubPositions.text
        };
        return this._addAddinField(field).then(function() {
            if (!supSubPositions.positions.length) return;
            return self._setSuperSubByPositions(supSubPositions.positions);
        });
    };
    CitationDocService.prototype.addCitation = function(text, value, notesStyle) {
        var self = this;
        var supSubPositions = this._removeSuperSubTagsWithPositions(text);
        var field = {
            Value: this._citPrefix + " " + this._citSuffix + value,
            Content: supSubPositions.text
        };
        if ("footnotes" === notesStyle) {
            window.Asc.plugin.callCommand(function() {
                var oDocument = Api.GetDocument();
                oDocument.AddFootnote();
            });
        } else if ("endnotes" === notesStyle) {
            window.Asc.plugin.callCommand(function() {
                var oDocument = Api.GetDocument();
                oDocument.AddEndnote();
            });
        }
        return this._addAddinField(field).then(function() {
            if (!supSubPositions.positions.length) return;
            return self._setSuperSubByPositions(supSubPositions.positions);
        });
    };
    CitationDocService.prototype._getAllAddinFields = function() {
        return new Promise(function(resolve, reject) {
            window.Asc.plugin.executeMethod("GetAllAddinFields", null, resolve);
        });
    };
    CitationDocService.prototype.getAddinZoteroFields = function() {
        var self = this;
        return new Promise(function(resolve, reject) {
            self._getAllAddinFields().then(function(arrFields) {
                try {
                    if (arrFields.length) {
                        arrFields = arrFields.filter(function(field) {
                            return field.Value.indexOf(self._citPrefix) !== -1 || field.Value.indexOf(self._bibPrefix) !== -1 || field.Value.indexOf(self._citPrefixOld) !== -1 || field.Value.indexOf(self._bibPrefixOld) !== -1;
                        });
                    }
                } catch (e) {
                    reject(e);
                }
                console.warn(arrFields);
                resolve(arrFields);
            });
        });
    };
    CitationDocService.prototype._removeSuperSubTagsWithPositions = function(escapedHtmlText) {
        var positions = [];
        var currentIndex = 0;
        var result = "";
        var tempResult = escapedHtmlText;
        tempResult = tempResult.replace(/<sup\b[^>]*>([^<]*)<\/sup>/gi, function(match, content, offset) {
            var start = offset + currentIndex;
            var end = start + content.length;
            positions.push({
                type: "sup",
                content: content,
                start: start,
                end: end,
                originalMatch: match
            });
            currentIndex += content.length - match.length;
            return content;
        });
        currentIndex = 0;
        result = tempResult;
        tempResult = tempResult.replace(/<sub\b[^>]*>([^<]*)<\/sub>/gi, function(match, content, offset) {
            var start = offset + currentIndex;
            var end = start + content.length;
            positions.push({
                type: "sub",
                content: content,
                start: start,
                end: end,
                originalMatch: match
            });
            currentIndex += content.length - match.length;
            return content;
        });
        result = tempResult;
        return {
            text: result,
            positions: positions.sort(function(a, b) {
                return a.start - b.start;
            })
        };
    };
    CitationDocService.prototype.saveAsText = function() {
        return this.getAddinZoteroFields().then(function(arrFields) {
            var count = arrFields.length;
            if (!count) {
                window.Asc.plugin.executeCommand("close", "");
                return false;
            }
            return new Promise(function(resolve) {
                arrFields.forEach(function(field) {
                    window.Asc.plugin.executeMethod("RemoveFieldWrapper", [ field.FieldId ], function() {
                        count--;
                        if (!count) {
                            resolve(true);
                            window.Asc.plugin.executeCommand("close", "");
                        }
                    });
                });
            });
        });
    };
    CitationDocService.prototype._setSuperSubByPositions = function(positions) {
        return new Promise(function(resolve) {
            var isCalc = true;
            var isClose = false;
            Asc.scope.positions = positions;
            Asc.plugin.callCommand(function() {
                var doc = Api.GetDocument();
                var run = doc.GetCurrentRun();
                Asc.scope.positions.forEach(function(pos) {
                    var range = run.GetRange(pos.start, pos.end);
                    if ("sup" === pos.type) {
                        range.SetVertAlign("superscript");
                    } else {
                        range.SetVertAlign("subscript");
                    }
                });
            }, isClose, isCalc, resolve);
        });
    };
    CitationDocService.prototype.updateAddinFields = function(fields) {
        return new Promise(function(resolve) {
            window.Asc.plugin.executeMethod("UpdateAddinFields", [ fields ], resolve);
        });
    };
    function CitationItemData(id) {
        if (typeof id !== "string" && typeof id !== "number") {
            throw new Error("CitationItemData: id is required");
        }
        this._id = id;
        this._type = undefined;
        this._citationKey = undefined;
        this._categories = new Array;
        this._language = undefined;
        this._journalAbbreviation = undefined;
        this._shortTitle = undefined;
        this._author = new Array;
        this._chair = new Array;
        this._collectionEditor = new Array;
        this._compiler = new Array;
        this._composer = new Array;
        this._containerAuthor = new Array;
        this._contributor = new Array;
        this._curator = new Array;
        this._director = new Array;
        this._editor = new Array;
        this._editorialDirector = new Array;
        this._executiveProducer = new Array;
        this._guest = new Array;
        this._host = new Array;
        this._illustrator = new Array;
        this._narrator = new Array;
        this._organizer = new Array;
        this._originalAuthor = new Array;
        this._performer = new Array;
        this._producer = new Array;
        this._recipient = new Array;
        this._reviewedAuthor = new Array;
        this._scriptwriter = new Array;
        this._seriesCreator = new Array;
        this._translator = new Array;
        this._accessed = {};
        this._container = {};
        this._eventDate = {};
        this._issued = {};
        this._originalDate = {};
        this._submitted = {};
        this._abstract = undefined;
        this._annote = undefined;
        this._archive = undefined;
        this._archiveCollection = undefined;
        this._archiveLocation = undefined;
        this._archivePlace = undefined;
        this._authority = undefined;
        this._callNumber = undefined;
        this._chapterNumber = undefined;
        this._citationNumber = undefined;
        this._citationLabel = undefined;
        this._collectionNumber = undefined;
        this._collectionTitle = undefined;
        this._containerTitle = undefined;
        this._containerTitleShort = undefined;
        this._dimensions = undefined;
        this._DOI = undefined;
        this._edition = undefined;
        this._event = undefined;
        this._eventTitle = undefined;
        this._eventPlace = undefined;
        this._firstReferenceNoteNumber = undefined;
        this._genre = undefined;
        this._ISBN = undefined;
        this._ISSN = undefined;
        this._issue = undefined;
        this._jurisdiction = undefined;
        this._keyword = undefined;
        this._locator = undefined;
        this._medium = undefined;
        this._note = undefined;
        this._number = undefined;
        this._numberOfPages = undefined;
        this._numberOfVolumes = undefined;
        this._originalPublisher = undefined;
        this._originalPublisherPlace = undefined;
        this._originalTitle = undefined;
        this._page = undefined;
        this._part = undefined;
        this._partTitle = undefined;
        this._pageFirst = undefined;
        this._PMCID = undefined;
        this._PMID = undefined;
        this._printing = undefined;
        this._publisher = undefined;
        this._publisherPlace = undefined;
        this._references = undefined;
        this._reviewedGenre = undefined;
        this._reviewedTitle = undefined;
        this._scale = undefined;
        this._section = undefined;
        this._source = undefined;
        this._status = undefined;
        this._title = undefined;
        this._titleShort = undefined;
        this._URL = undefined;
        this._version = undefined;
        this._volume = undefined;
        this._volumeTitle = undefined;
        this._volumeTitleShort = undefined;
        this._yearSuffix = undefined;
        this._custom = {};
        this.schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-data.json#/items";
    }
    CitationItemData.prototype._addCustomProperty = function(key, value) {
        this._custom[key] = value;
        return this;
    };
    CitationItemData.prototype.getCustomProperty = function(key) {
        if (Object.hasOwnProperty.call(this._custom, key)) return this._custom[key];
        return null;
    };
    CitationItemData.prototype.fillFromObject = function(itemDataObject) {
        if (Object.hasOwnProperty.call(itemDataObject, "type")) {
            this._type = itemDataObject.type;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "categories")) {
            this._categories = itemDataObject.categories;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "citation-key")) {
            this._citationKey = itemDataObject["citation-key"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "language")) {
            this._language = itemDataObject.language;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "journalAbbreviation")) {
            this._journalAbbreviation = itemDataObject.journalAbbreviation;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "shortTitle")) {
            this._shortTitle = itemDataObject.shortTitle;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "author")) {
            this._author = itemDataObject.author;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "chair")) {
            this._chair = itemDataObject.chair;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "collection-editor")) {
            this._collectionEditor = itemDataObject["collection-editor"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "compiler")) {
            this._compiler = itemDataObject.compiler;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "composer")) {
            this._composer = itemDataObject.composer;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "container-author")) {
            this._containerAuthor = itemDataObject["container-author"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "contributor")) {
            this._contributor = itemDataObject.contributor;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "curator")) {
            this._curator = itemDataObject.curator;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "director")) {
            this._director = itemDataObject.director;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "editorial-director")) {
            this._editorialDirector = itemDataObject["editorial-director"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "editor")) {
            this._editor = itemDataObject.editor;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "executive-producer")) {
            this._executiveProducer = itemDataObject["executive-producer"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "guest")) {
            this._guest = itemDataObject.guest;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "host")) {
            this._host = itemDataObject.host;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "illustrator")) {
            this._illustrator = itemDataObject.illustrator;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "narrator")) {
            this._narrator = itemDataObject.narrator;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "organizer")) {
            this._organizer = itemDataObject.organizer;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "original-author")) {
            this._originalAuthor = itemDataObject["original-author"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "performer")) {
            this._performer = itemDataObject.performer;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "producer")) {
            this._producer = itemDataObject.producer;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "recipient")) {
            this._recipient = itemDataObject.recipient;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "reviewed-author")) {
            this._reviewedAuthor = itemDataObject["reviewed-author"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "script-writer")) {
            this._scriptWriter = itemDataObject["script-writer"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "series-creator")) {
            this._seriesCreator = itemDataObject["series-creator"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "translator")) {
            this._translator = itemDataObject.translator;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "accessed")) {
            this._accessed = itemDataObject.accessed;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "container")) {
            this._container = itemDataObject.container;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "event-date")) {
            this._eventDate = itemDataObject["event-date"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "issued")) {
            this._issued = itemDataObject.issued;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "original-date")) {
            this._originalDate = itemDataObject["original-date"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "submitted")) {
            this._submitted = itemDataObject.submitted;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "abstract")) {
            this._abstract = itemDataObject.abstract;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "annote")) {
            this._annote = itemDataObject.annote;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "archive")) {
            this._archive = itemDataObject.archive;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "archive_collection")) {
            this._archiveCollection = itemDataObject["archive_collection"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "archive_location")) {
            this._archiveLocation = itemDataObject["archive_location"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "archive-place")) {
            this._archivePlace = itemDataObject["archive-place"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "authority")) {
            this._authority = itemDataObject.authority;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "call-number")) {
            this._callNumber = itemDataObject["call-number"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "chapter-number")) {
            this._chapterNumber = itemDataObject["chapter-number"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "citation-number")) {
            this._citationNumber = itemDataObject["citation-number"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "citation-label")) {
            this._citationLabel = itemDataObject["citation-label"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "collection-number")) {
            this._collectionNumber = itemDataObject["collection-number"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "collection-title")) {
            this._collectionTitle = itemDataObject["collection-title"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "container-title")) {
            this._containerTitle = itemDataObject["container-title"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "container-title-short")) {
            this._containerTitleShort = itemDataObject["container-title-short"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "dimensions")) {
            this._dimensions = itemDataObject.dimensions;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "DOI")) {
            this._DOI = itemDataObject.DOI;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "edition")) {
            this._edition = itemDataObject.edition;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "event")) {
            this._event = itemDataObject.event;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "event-title")) {
            this._eventTitle = itemDataObject["event-title"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "event-place")) {
            this._eventPlace = itemDataObject["event-place"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "first-reference-note-number")) {
            this._firstReferenceNoteNumber = itemDataObject["first-reference-note-number"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "genre")) {
            this._genre = itemDataObject.genre;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "ISBN")) {
            this._ISBN = itemDataObject.ISBN;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "ISSN")) {
            this._ISSN = itemDataObject.ISSN;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "issue")) {
            this._issue = itemDataObject.issue;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "jurisdiction")) {
            this._jurisdiction = itemDataObject.jurisdiction;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "keyword")) {
            this._keyword = itemDataObject.keyword;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "locator")) {
            this._locator = itemDataObject.locator;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "medium")) {
            this._medium = itemDataObject.medium;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "note")) {
            this._note = itemDataObject.note;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "number")) {
            this._number = itemDataObject.number;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "number-of-pages")) {
            this._numberOfPages = itemDataObject["number-of-pages"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "number-of-volumes")) {
            this._numberOfVolumes = itemDataObject["number-of-volumes"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "original-publisher")) {
            this._originalPublisher = itemDataObject["original-publisher"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "original-publisher-place")) {
            this._originalPublisherPlace = itemDataObject["original-publisher-place"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "original-title")) {
            this._originalTitle = itemDataObject["original-title"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "page")) {
            this._page = itemDataObject.page;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "page-first")) {
            this._pageFirst = itemDataObject["page-first"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "part")) {
            this._part = itemDataObject.part;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "part-title")) {
            this._partTitle = itemDataObject["part-title"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "PMCID")) {
            this._PMCID = itemDataObject.PMCID;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "PMID")) {
            this._PMID = itemDataObject.PMID;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "printing")) {
            this._printing = itemDataObject.printing;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "publisher")) {
            this._publisher = itemDataObject.publisher;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "publisher-place")) {
            this._publisherPlace = itemDataObject["publisher-place"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "references")) {
            this._references = itemDataObject.references;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "reviewed-genre")) {
            this._reviewedGenre = itemDataObject["reviewed-genre"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "reviewed-title")) {
            this._reviewedTitle = itemDataObject["reviewed-title"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "scale")) {
            this._scale = itemDataObject.scale;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "section")) {
            this._section = itemDataObject.section;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "source")) {
            this._source = itemDataObject.source;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "status")) {
            this._status = itemDataObject.status;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "title")) {
            this._title = itemDataObject.title;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "title-short")) {
            this._titleShort = itemDataObject["title-short"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "URL")) {
            this._URL = itemDataObject.URL;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "version")) {
            this._version = itemDataObject.version;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "volume")) {
            this._volume = itemDataObject.volume;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "volume-title")) {
            this._volumeTitle = itemDataObject["volume-title"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "volume-title-short")) {
            this._volumeTitleShort = itemDataObject["volume-title-short"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "year-suffix")) {
            this._yearSuffix = itemDataObject["year-suffix"];
        }
        if (Object.hasOwnProperty.call(itemDataObject, "custom")) {
            this._custom = itemDataObject.custom;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "userID")) {
            this._addCustomProperty("userID", itemDataObject.userID);
        }
        if (Object.hasOwnProperty.call(itemDataObject, "groupID")) {
            this._addCustomProperty("groupID", itemDataObject.groupID);
        }
        if (Object.hasOwnProperty.call(itemDataObject, "creators")) {
            var self = this;
            itemDataObject.creators.forEach(function(creator) {
                var author = {};
                if (creator.firstName) {
                    author.given = creator.firstName;
                }
                if (creator.lastName) {
                    author.family = creator.lastName;
                }
                var bHasAuthor = self._author.some(function(a) {
                    if (a.family !== author.family && (a.family || author.family)) {
                        return false;
                    }
                    if (a.given !== author.given && (a.given || author.given)) {
                        return false;
                    }
                    return true;
                });
                if (bHasAuthor) {
                    return;
                }
                self._author.push(author);
            }, this);
        }
        if (Object.hasOwnProperty.call(itemDataObject, "libraryCatalog")) {
            this._source = itemDataObject.libraryCatalog;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "place")) {
            this._eventPlace = itemDataObject.place;
            this._publisherPlace = itemDataObject.place;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "numberOfVolumes")) {
            this._numberOfVolumes = itemDataObject.numberOfVolumes;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "callNumber")) {
            this._callNumber = itemDataObject.callNumber;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "seriesNumber")) {
            this._collectionNumber = itemDataObject.seriesNumber;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "series")) {
            this._collectionTitle = itemDataObject.series;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "bookTitle")) {
            this._containerTitle = itemDataObject.bookTitle;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "extra")) {
            this._note = itemDataObject.extra;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "rights")) {
            this._license = itemDataObject.rights;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "archiveLocation")) {
            this._archiveLocation = itemDataObject.archiveLocation;
        }
        if (Object.hasOwnProperty.call(itemDataObject, "abstractNote")) {
            this._abstract = itemDataObject.abstractNote;
        }
    };
    CitationItemData.prototype.getTitle = function() {
        return this._title;
    };
    CitationItemData.prototype.getType = function() {
        return this._type;
    };
    CitationItemData.prototype.setType = function(type) {
        this._type = type;
        return this;
    };
    CitationItemData.prototype.setCitationKey = function(key) {
        this._citationKey = key;
        return this;
    };
    CitationItemData.prototype.setCategories = function(categories) {
        this._categories = categories;
        return this;
    };
    CitationItemData.prototype.setLanguage = function(language) {
        this._language = language;
        return this;
    };
    CitationItemData.prototype.setJournalAbbreviation = function(journalAbbreviation) {
        this._journalAbbreviation = journalAbbreviation;
        return this;
    };
    CitationItemData.prototype.setShortTitle = function(shortTitle) {
        this._shortTitle = shortTitle;
        return this;
    };
    CitationItemData.prototype.setAuthor = function(author) {
        this._author = Array.isArray(author) ? author : [ author ];
        return this;
    };
    CitationItemData.prototype.setChair = function(chair) {
        this._chair = Array.isArray(chair) ? chair : [ chair ];
        return this;
    };
    CitationItemData.prototype.setCollectionEditor = function(collectionEditor) {
        this._collectionEditor = Array.isArray(collectionEditor) ? collectionEditor : [ collectionEditor ];
        return this;
    };
    CitationItemData.prototype.setCompiler = function(compiler) {
        this._compiler = Array.isArray(compiler) ? compiler : [ compiler ];
        return this;
    };
    CitationItemData.prototype.setComposer = function(composer) {
        this._composer = Array.isArray(composer) ? composer : [ composer ];
        return this;
    };
    CitationItemData.prototype.setContainerAuthor = function(containerAuthor) {
        this._containerAuthor = Array.isArray(containerAuthor) ? containerAuthor : [ containerAuthor ];
        return this;
    };
    CitationItemData.prototype.setContributor = function(contributor) {
        this._contributor = Array.isArray(contributor) ? contributor : [ contributor ];
        return this;
    };
    CitationItemData.prototype.setCurator = function(curator) {
        this._curator = Array.isArray(curator) ? curator : [ curator ];
        return this;
    };
    CitationItemData.prototype.setDirector = function(director) {
        this._director = Array.isArray(director) ? director : [ director ];
        return this;
    };
    CitationItemData.prototype.setEditor = function(editor) {
        this._editor = Array.isArray(editor) ? editor : [ editor ];
        return this;
    };
    CitationItemData.prototype.setEditorialDirector = function(editorialDirector) {
        this._editorialDirector = Array.isArray(editorialDirector) ? editorialDirector : [ editorialDirector ];
        return this;
    };
    CitationItemData.prototype.setExecutiveProducer = function(executiveProducer) {
        this._executiveProducer = Array.isArray(executiveProducer) ? executiveProducer : [ executiveProducer ];
        return this;
    };
    CitationItemData.prototype.setGuest = function(guest) {
        this._guest = Array.isArray(guest) ? guest : [ guest ];
        return this;
    };
    CitationItemData.prototype.setHost = function(host) {
        this._host = Array.isArray(host) ? host : [ host ];
        return this;
    };
    CitationItemData.prototype.setIllustrator = function(illustrator) {
        this._illustrator = Array.isArray(illustrator) ? illustrator : [ illustrator ];
        return this;
    };
    CitationItemData.prototype.setNarrator = function(narrator) {
        this._narrator = Array.isArray(narrator) ? narrator : [ narrator ];
        return this;
    };
    CitationItemData.prototype.setOrganizer = function(organizer) {
        this._organizer = Array.isArray(organizer) ? organizer : [ organizer ];
        return this;
    };
    CitationItemData.prototype.setOriginalAuthor = function(originalAuthor) {
        this._originalAuthor = Array.isArray(originalAuthor) ? originalAuthor : [ originalAuthor ];
        return this;
    };
    CitationItemData.prototype.setPerformer = function(performer) {
        this._performer = Array.isArray(performer) ? performer : [ performer ];
        return this;
    };
    CitationItemData.prototype.setProducer = function(producer) {
        this._producer = Array.isArray(producer) ? producer : [ producer ];
        return this;
    };
    CitationItemData.prototype.setRecipient = function(recipient) {
        this._recipient = Array.isArray(recipient) ? recipient : [ recipient ];
        return this;
    };
    CitationItemData.prototype.setReviewedAuthor = function(reviewedAuthor) {
        this._reviewedAuthor = Array.isArray(reviewedAuthor) ? reviewedAuthor : [ reviewedAuthor ];
        return this;
    };
    CitationItemData.prototype.setScriptwriter = function(scriptwriter) {
        this._scriptwriter = Array.isArray(scriptwriter) ? scriptwriter : [ scriptwriter ];
        return this;
    };
    CitationItemData.prototype.setSeriesCreator = function(seriesCreator) {
        this._seriesCreator = Array.isArray(seriesCreator) ? seriesCreator : [ seriesCreator ];
        return this;
    };
    CitationItemData.prototype.setTranslator = function(translator) {
        this._translator = Array.isArray(translator) ? translator : [ translator ];
        return this;
    };
    CitationItemData.prototype.setAccessed = function(accessed) {
        this._accessed = accessed || {};
        return this;
    };
    CitationItemData.prototype.setContainer = function(container) {
        this._container = container || {};
        return this;
    };
    CitationItemData.prototype.setEventDate = function(eventDate) {
        this._eventDate = eventDate || {};
        return this;
    };
    CitationItemData.prototype.setIssued = function(issued) {
        this._issued = issued || {};
        return this;
    };
    CitationItemData.prototype.setOriginalDate = function(originalDate) {
        this._originalDate = originalDate || {};
        return this;
    };
    CitationItemData.prototype.setSubmitted = function(submitted) {
        this._submitted = submitted || {};
        return this;
    };
    CitationItemData.prototype.setAbstract = function(abstract) {
        this._abstract = abstract;
        return this;
    };
    CitationItemData.prototype.setAnnote = function(annote) {
        this._annote = annote;
        return this;
    };
    CitationItemData.prototype.setArchive = function(archive) {
        this._archive = archive;
        return this;
    };
    CitationItemData.prototype.setArchiveCollection = function(archiveCollection) {
        this._archiveCollection = archiveCollection;
        return this;
    };
    CitationItemData.prototype.setArchiveLocation = function(archiveLocation) {
        this._archiveLocation = archiveLocation;
        return this;
    };
    CitationItemData.prototype.setArchivePlace = function(archivePlace) {
        this._archivePlace = archivePlace;
        return this;
    };
    CitationItemData.prototype.setAuthority = function(authority) {
        this._authority = authority;
        return this;
    };
    CitationItemData.prototype.setCallNumber = function(callNumber) {
        this._callNumber = callNumber;
        return this;
    };
    CitationItemData.prototype.setChapterNumber = function(chapterNumber) {
        this._chapterNumber = chapterNumber;
        return this;
    };
    CitationItemData.prototype.setCitationNumber = function(citationNumber) {
        this._citationNumber = citationNumber;
        return this;
    };
    CitationItemData.prototype.setCitationLabel = function(citationLabel) {
        this._citationLabel = citationLabel;
        return this;
    };
    CitationItemData.prototype.setCollectionNumber = function(collectionNumber) {
        this._collectionNumber = collectionNumber;
        return this;
    };
    CitationItemData.prototype.setCollectionTitle = function(collectionTitle) {
        this._collectionTitle = collectionTitle;
        return this;
    };
    CitationItemData.prototype.setContainerTitle = function(containerTitle) {
        this._containerTitle = containerTitle;
        return this;
    };
    CitationItemData.prototype.setContainerTitleShort = function(containerTitleShort) {
        this._containerTitleShort = containerTitleShort;
        return this;
    };
    CitationItemData.prototype.setDimensions = function(dimensions) {
        this._dimensions = dimensions;
        return this;
    };
    CitationItemData.prototype.setDOI = function(DOI) {
        this._DOI = DOI;
        return this;
    };
    CitationItemData.prototype.setEdition = function(edition) {
        this._edition = edition;
        return this;
    };
    CitationItemData.prototype.setEvent = function(event) {
        this._event = event;
        return this;
    };
    CitationItemData.prototype.setEventTitle = function(eventTitle) {
        this._eventTitle = eventTitle;
        return this;
    };
    CitationItemData.prototype.setEventPlace = function(eventPlace) {
        this._eventPlace = eventPlace;
        return this;
    };
    CitationItemData.prototype.setFirstReferenceNoteNumber = function(firstReferenceNoteNumber) {
        this._firstReferenceNoteNumber = firstReferenceNoteNumber;
        return this;
    };
    CitationItemData.prototype.setGenre = function(genre) {
        this._genre = genre;
        return this;
    };
    CitationItemData.prototype.setISBN = function(ISBN) {
        this._ISBN = ISBN;
        return this;
    };
    CitationItemData.prototype.setISSN = function(ISSN) {
        this._ISSN = ISSN;
        return this;
    };
    CitationItemData.prototype.setIssue = function(issue) {
        this._issue = issue;
        return this;
    };
    CitationItemData.prototype.setJurisdiction = function(jurisdiction) {
        this._jurisdiction = jurisdiction;
        return this;
    };
    CitationItemData.prototype.setKeyword = function(keyword) {
        this._keyword = keyword;
        return this;
    };
    CitationItemData.prototype.setLocator = function(locator) {
        this._locator = locator;
        return this;
    };
    CitationItemData.prototype.setMedium = function(medium) {
        this._medium = medium;
        return this;
    };
    CitationItemData.prototype.setNote = function(note) {
        this._note = note;
        return this;
    };
    CitationItemData.prototype.setNumber = function(number) {
        this._number = number;
        return this;
    };
    CitationItemData.prototype.setNumberOfPages = function(numberOfPages) {
        this._numberOfPages = numberOfPages;
        return this;
    };
    CitationItemData.prototype.setNumberOfVolumes = function(numberOfVolumes) {
        this._numberOfVolumes = numberOfVolumes;
        return this;
    };
    CitationItemData.prototype.setOriginalPublisher = function(originalPublisher) {
        this._originalPublisher = originalPublisher;
        return this;
    };
    CitationItemData.prototype.setOriginalPublisherPlace = function(originalPublisherPlace) {
        this._originalPublisherPlace = originalPublisherPlace;
        return this;
    };
    CitationItemData.prototype.setOriginalTitle = function(originalTitle) {
        this._originalTitle = originalTitle;
        return this;
    };
    CitationItemData.prototype.setPage = function(page) {
        this._page = page;
        return this;
    };
    CitationItemData.prototype.setPageFirst = function(pageFirst) {
        this._pageFirst = pageFirst;
        return this;
    };
    CitationItemData.prototype.setPart = function(part) {
        this._part = part;
        return this;
    };
    CitationItemData.prototype.setPartTitle = function(partTitle) {
        this._partTitle = partTitle;
        return this;
    };
    CitationItemData.prototype.setPMCID = function(PMCID) {
        this._PMCID = PMCID;
        return this;
    };
    CitationItemData.prototype.setPMID = function(PMID) {
        this._PMID = PMID;
        return this;
    };
    CitationItemData.prototype.setPrinting = function(printing) {
        this._printing = printing;
        return this;
    };
    CitationItemData.prototype.setPublisher = function(publisher) {
        this._publisher = publisher;
        return this;
    };
    CitationItemData.prototype.setPublisherPlace = function(publisherPlace) {
        this._publisherPlace = publisherPlace;
        return this;
    };
    CitationItemData.prototype.setReferences = function(references) {
        this._references = references;
        return this;
    };
    CitationItemData.prototype.setReviewedGenre = function(reviewedGenre) {
        this._reviewedGenre = reviewedGenre;
        return this;
    };
    CitationItemData.prototype.setReviewedTitle = function(reviewedTitle) {
        this._reviewedTitle = reviewedTitle;
        return this;
    };
    CitationItemData.prototype.setScale = function(scale) {
        this._scale = scale;
        return this;
    };
    CitationItemData.prototype.setSection = function(section) {
        this._section = section;
        return this;
    };
    CitationItemData.prototype.setSource = function(source) {
        this._source = source;
        return this;
    };
    CitationItemData.prototype.setStatus = function(status) {
        this._status = status;
        return this;
    };
    CitationItemData.prototype.setTitle = function(title) {
        this._title = title;
        return this;
    };
    CitationItemData.prototype.setTitleShort = function(titleShort) {
        this._titleShort = titleShort;
        return this;
    };
    CitationItemData.prototype.setURL = function(URL) {
        this._URL = URL;
        return this;
    };
    CitationItemData.prototype.setVersion = function(version) {
        this._version = version;
        return this;
    };
    CitationItemData.prototype.setVolume = function(volume) {
        this._volume = volume;
        return this;
    };
    CitationItemData.prototype.setVolumeTitle = function(volumeTitle) {
        this._volumeTitle = volumeTitle;
        return this;
    };
    CitationItemData.prototype.setVolumeTitleShort = function(volumeTitleShort) {
        this._volumeTitleShort = volumeTitleShort;
        return this;
    };
    CitationItemData.prototype.setYearSuffix = function(yearSuffix) {
        this._yearSuffix = yearSuffix;
        return this;
    };
    CitationItemData.prototype.setCustom = function(custom) {
        this._custom = Object.assign(this._custom, custom);
        return this;
    };
    CitationItemData.prototype.toJSON = function() {
        var result = {};
        result.id = this._id;
        if (this._type !== undefined && this._type !== "") result.type = this._type;
        if (this._citationKey !== undefined && this._citationKey !== "") result["citation-key"] = this._citationKey;
        if (this._categories.length > 0) result.categories = this._categories;
        if (this._language !== undefined && this._language !== "") result.language = this._language;
        if (this._journalAbbreviation !== undefined && this._journalAbbreviation !== "") result.journalAbbreviation = this._journalAbbreviation;
        if (this._shortTitle !== undefined && this._shortTitle !== "") {
            result.shortTitle = this._shortTitle;
            if (this._titleShort === undefined) result["title-short"] = this._shortTitle;
        }
        if (this._author.length > 0) result.author = this._author;
        if (this._chair.length > 0) result.chair = this._chair;
        if (this._collectionEditor.length > 0) result["collection-editor"] = this._collectionEditor;
        if (this._compiler.length > 0) result.compiler = this._compiler;
        if (this._composer.length > 0) result.composer = this._composer;
        if (this._containerAuthor.length > 0) result["container-author"] = this._containerAuthor;
        if (this._contributor.length > 0) result.contributor = this._contributor;
        if (this._curator.length > 0) result.curator = this._curator;
        if (this._director.length > 0) result.director = this._director;
        if (this._editor.length > 0) result.editor = this._editor;
        if (this._editorialDirector.length > 0) result["editorial-director"] = this._editorialDirector;
        if (this._executiveProducer.length > 0) result["executive-producer"] = this._executiveProducer;
        if (this._guest.length > 0) result.guest = this._guest;
        if (this._host.length > 0) result.host = this._host;
        if (this._illustrator.length > 0) result.illustrator = this._illustrator;
        if (this._narrator.length > 0) result.narrator = this._narrator;
        if (this._organizer.length > 0) result.organizer = this._organizer;
        if (this._originalAuthor.length > 0) result["original-author"] = this._originalAuthor;
        if (this._performer.length > 0) result.performer = this._performer;
        if (this._producer.length > 0) result.producer = this._producer;
        if (this._recipient.length > 0) result.recipient = this._recipient;
        if (this._reviewedAuthor.length > 0) result["reviewed-author"] = this._reviewedAuthor;
        if (this._scriptwriter.length > 0) result["script-writer"] = this._scriptwriter;
        if (this._seriesCreator.length > 0) result["series-creator"] = this._seriesCreator;
        if (this._translator.length > 0) result.translator = this._translator;
        if (Object.keys(this._accessed).length > 0) result.accessed = this._accessed;
        if (Object.keys(this._container).length > 0) result.container = this._container;
        if (Object.keys(this._eventDate).length > 0) result["event-date"] = this._eventDate;
        if (Object.keys(this._issued).length > 0) result.issued = this._issued;
        if (Object.keys(this._originalDate).length > 0) result["original-date"] = this._originalDate;
        if (Object.keys(this._submitted).length > 0) result.submitted = this._submitted;
        if (this._abstract !== undefined && this._abstract !== "") result.abstract = this._abstract;
        if (this._annote !== undefined && this._annote !== "") result.annote = this._annote;
        if (this._archive !== undefined && this._archive !== "") result.archive = this._archive;
        if (this._archiveCollection !== undefined && this._archiveCollection !== "") result["archive_collection"] = this._archiveCollection;
        if (this._archiveLocation !== undefined && this._archiveLocation !== "") result["archive_location"] = this._archiveLocation;
        if (this._archivePlace !== undefined && this._archivePlace !== "") result["archive-place"] = this._archivePlace;
        if (this._authority !== undefined && this._authority !== "") result.authority = this._authority;
        if (this._callNumber !== undefined && this._callNumber !== "") result["call-number"] = this._callNumber;
        if (this._chapterNumber !== undefined && this._chapterNumber !== "") result["chapter-number"] = this._chapterNumber;
        if (this._citationNumber !== undefined && this._citationNumber !== "") result["citation-number"] = this._citationNumber;
        if (this._citationLabel !== undefined && this._citationLabel !== "") result["citation-label"] = this._citationLabel;
        if (this._collectionNumber !== undefined && this._collectionNumber !== "") result["collection-number"] = this._collectionNumber;
        if (this._collectionTitle !== undefined && this._collectionTitle !== "") result["collection-title"] = this._collectionTitle;
        if (this._containerTitle !== undefined && this._containerTitle !== "") result["container-title"] = this._containerTitle;
        if (this._containerTitleShort !== undefined && this._containerTitleShort !== "") result["container-title-short"] = this._containerTitleShort;
        if (this._dimensions !== undefined && this._dimensions !== "") result.dimensions = this._dimensions;
        if (this._DOI !== undefined && this._DOI !== "") result.DOI = this._DOI;
        if (this._edition !== undefined && this._edition !== "") result.edition = this._edition;
        if (this._event !== undefined && this._event !== "") result.event = this._event;
        if (this._eventTitle !== undefined && this._eventTitle !== "") result["event-title"] = this._eventTitle;
        if (this._eventPlace !== undefined && this._eventPlace !== "") result["event-place"] = this._eventPlace;
        if (this._firstReferenceNoteNumber !== undefined && this._firstReferenceNoteNumber !== "") result["first-reference-note-number"] = this._firstReferenceNoteNumber;
        if (this._genre !== undefined && this._genre !== "") result.genre = this._genre;
        if (this._ISBN !== undefined && this._ISBN !== "") result.ISBN = this._ISBN;
        if (this._ISSN !== undefined && this._ISSN !== "") result.ISSN = this._ISSN;
        if (this._issue !== undefined && this._issue !== "") result.issue = this._issue;
        if (this._jurisdiction !== undefined && this._jurisdiction !== "") result.jurisdiction = this._jurisdiction;
        if (this._keyword !== undefined && this._keyword !== "") result.keyword = this._keyword;
        if (this._locator !== undefined && this._locator !== "") result.locator = this._locator;
        if (this._medium !== undefined && this._medium !== "") result.medium = this._medium;
        if (this._note !== undefined && this._note !== "") result.note = this._note;
        if (this._number !== undefined && this._number !== "") result.number = this._number;
        if (this._numberOfPages !== undefined && this._numberOfPages !== "") result["number-of-pages"] = this._numberOfPages;
        if (this._numberOfVolumes !== undefined && this._numberOfVolumes !== "") result["number-of-volumes"] = this._numberOfVolumes;
        if (this._originalPublisher !== undefined && this._originalPublisher !== "") result["original-publisher"] = this._originalPublisher;
        if (this._originalPublisherPlace !== undefined && this._originalPublisherPlace !== "") result["original-publisher-place"] = this._originalPublisherPlace;
        if (this._originalTitle !== undefined && this._originalTitle !== "") result["original-title"] = this._originalTitle;
        if (this._page !== undefined && this._page !== "") result.page = this._page;
        if (this._pageFirst !== undefined && this._pageFirst !== "") result["page-first"] = this._pageFirst;
        if (this._part !== undefined && this._part !== "") result.part = this._part;
        if (this._partTitle !== undefined && this._partTitle !== "") result["part-title"] = this._partTitle;
        if (this._PMCID !== undefined && this._PMCID !== "") result.PMCID = this._PMCID;
        if (this._PMID !== undefined && this._PMID !== "") result.PMID = this._PMID;
        if (this._printing !== undefined && this._printing !== "") result.printing = this._printing;
        if (this._publisher !== undefined && this._publisher !== "") result.publisher = this._publisher;
        if (this._publisherPlace !== undefined && this._publisherPlace !== "") result["publisher-place"] = this._publisherPlace;
        if (this._references !== undefined && this._references !== "") result.references = this._references;
        if (this._reviewedGenre !== undefined && this._reviewedGenre !== "") result["reviewed-genre"] = this._reviewedGenre;
        if (this._reviewedTitle !== undefined && this._reviewedTitle !== "") result["reviewed-title"] = this._reviewedTitle;
        if (this._scale !== undefined && this._scale !== "") result.scale = this._scale;
        if (this._section !== undefined && this._section !== "") result.section = this._section;
        if (this._source !== undefined && this._source !== "") result.source = this._source;
        if (this._status !== undefined && this._status !== "") result.status = this._status;
        if (this._title !== undefined && this._title !== "") result.title = this._title;
        if (this._titleShort !== undefined && this._titleShort !== "") result["title-short"] = this._titleShort;
        if (this._URL !== undefined && this._URL !== "") result.URL = this._URL;
        if (this._version !== undefined && this._version !== "") result.version = this._version;
        if (this._volume !== undefined && this._volume !== "") result.volume = this._volume;
        if (this._volumeTitle !== undefined && this._volumeTitle !== "") result["volume-title"] = this._volumeTitle;
        if (this._volumeTitleShort !== undefined && this._volumeTitleShort !== "") result["volume-title-short"] = this._volumeTitleShort;
        if (this._yearSuffix !== undefined && this._yearSuffix !== "") result["year-suffix"] = this._yearSuffix;
        if (Object.keys(this._custom).length !== 0) result.custom = this._custom;
        if (this._license !== undefined && this._license !== "") result.license = this._license;
        return result;
    };
    function CitationItem(id) {
        if (typeof id !== "string" && typeof id !== "number") {
            throw new Error("CitationItem: id is required");
        }
        this.id = id;
        this._itemData = new CitationItemData(id);
        this._prefix = undefined;
        this._suffix = undefined;
        this._locator = undefined;
        this._label = undefined;
        this._suppressAuthor = undefined;
        this._authorOnly = undefined;
        this._uris = new Array;
    }
    CitationItem.prototype.fillFromObject = function(itemObject) {
        var self = this;
        if (Object.hasOwnProperty.call(itemObject, "version") && Object.hasOwnProperty.call(itemObject, "library")) {
            this._itemData.fillFromObject(itemObject.data);
            if (Object.hasOwnProperty.call(itemObject, "links")) {
                if (Object.hasOwnProperty.call(itemObject.links, "self")) {
                    this.addUri(itemObject.links.self.href);
                }
                if (Object.hasOwnProperty.call(itemObject.links, "alternate")) {
                    this.addUri(itemObject.links.alternate.href);
                }
            }
        } else if (Object.hasOwnProperty.call(itemObject, "itemData")) {
            this._itemData.fillFromObject(itemObject.itemData);
        } else {
            this._itemData.fillFromObject(itemObject);
        }
        if (Object.hasOwnProperty.call(itemObject, "prefix")) this._prefix = itemObject.prefix;
        if (Object.hasOwnProperty.call(itemObject, "suffix")) this._suffix = itemObject.suffix;
        if (Object.hasOwnProperty.call(itemObject, "locator")) this._locator = itemObject.locator;
        if (Object.hasOwnProperty.call(itemObject, "label")) this._label = itemObject.label;
        if (Object.hasOwnProperty.call(itemObject, "suppress-author")) this._suppressAuthor = itemObject["suppress-author"];
        if (Object.hasOwnProperty.call(itemObject, "author-only")) this._authorOnly = itemObject["author-only"];
        if (Object.hasOwnProperty.call(itemObject, "uris")) {
            itemObject.uris.forEach(function(uri) {
                self.addUri(uri);
            }, this);
        }
    };
    CitationItem.prototype.getInfoForCitationCluster = function() {
        var info = {
            id: this.id,
            "suppress-author": this._suppressAuthor
        };
        if (this._prefix) {
            info.prefix = this._prefix;
        }
        if (this._suffix) {
            info.suffix = this._suffix;
        }
        if (this._locator) {
            info.locator = this._locator;
        }
        if (this._label) {
            info.label = this._label;
        }
        return info;
    };
    CitationItem.prototype.getItemData = function() {
        return this._itemData;
    };
    CitationItem.prototype.getProperty = function(key) {
        if (this._itemData.getCustomProperty(key) !== null) {
            return this._itemData.getCustomProperty(key);
        }
        return null;
    };
    CitationItem.prototype.setPrefix = function(prefix) {
        this._prefix = prefix;
        return this;
    };
    CitationItem.prototype.setSuffix = function(suffix) {
        this._suffix = suffix;
        return this;
    };
    CitationItem.prototype.setLocator = function(locator) {
        this._locator = locator;
        return this;
    };
    CitationItem.prototype.setLabel = function(label) {
        if (label) {
            var validLabels = [ "act", "appendix", "article-locator", "book", "canon", "chapter", "column", "elocation", "equation", "figure", "folio", "issue", "line", "note", "opus", "page", "paragraph", "part", "rule", "scene", "section", "sub-verbo", "supplement", "table", "timestamp", "title-locator", "verse", "version", "volume" ];
            if (validLabels.indexOf(label) === -1) {
                throw new Error('CitationItem.setLocator: Invalid label "' + label + '"');
            }
            this._label = label;
        }
        return this;
    };
    CitationItem.prototype.setSuppressAuthor = function(value) {
        this._suppressAuthor = value;
        return this;
    };
    CitationItem.prototype.setAuthorOnly = function(value) {
        this._authorOnly = value;
        return this;
    };
    CitationItem.prototype.addUri = function(uri) {
        if (this._uris.indexOf(uri) !== -1) {
            return this;
        }
        this._uris.push(uri);
        return this;
    };
    CitationItem.prototype.toJSON = function() {
        var result = {};
        result.id = this.id;
        if (this._itemData) {
            result.itemData = this._itemData.toJSON ? this._itemData.toJSON() : this._itemData;
        }
        if (this._prefix !== undefined) result.prefix = this._prefix;
        if (this._suffix !== undefined) result.suffix = this._suffix;
        if (this._locator !== undefined) result.locator = this._locator;
        if (this._label !== undefined) result.label = this._label;
        if (this._suppressAuthor !== undefined) result["suppress-author"] = this._suppressAuthor;
        if (this._authorOnly !== undefined) result["author-only"] = this._authorOnly;
        if (this._uris.length) result.uris = this._uris;
        return result;
    };
    CitationItem.prototype.toFlatJSON = function(index) {
        var oldItem = {
            id: this.id,
            index: index
        };
        if (this._suppressAuthor !== undefined) {
            oldItem["suppress-author"] = this._suppressAuthor;
        }
        var itemDataObject = this._itemData.toJSON();
        Object.assign(oldItem, itemDataObject);
        if (typeof this._itemData.getCustomProperty("userID") !== "undefined" && this._itemData.getCustomProperty("userID") !== null) {
            oldItem.userID = String(this._itemData.getCustomProperty("userID"));
        }
        if (typeof this._itemData.getCustomProperty("groupID") !== "undefined" && this._itemData.getCustomProperty("groupID") !== null) {
            oldItem.groupID = String(this._itemData.getCustomProperty("groupID"));
        }
        return oldItem;
    };
    var _items = new WeakMap;
    var _ids = new WeakMap;
    var CSLCitationStorage = function() {
        function CSLCitationStorage() {
            _classCallCheck(this, CSLCitationStorage);
            _classPrivateFieldInitSpec(this, _items, void 0);
            _classPrivateFieldInitSpec(this, _ids, void 0);
            _classPrivateFieldSet2(_items, this, []);
            _classPrivateFieldSet2(_ids, this, []);
            this.size = 0;
        }
        return _createClass(CSLCitationStorage, [ {
            key: "get",
            value: function get(id) {
                id = id.toString();
                var index = _classPrivateFieldGet2(_ids, this).indexOf(id);
                if (index >= 0) return _classPrivateFieldGet2(_items, this)[index];
                return null;
            }
        }, {
            key: "getIndex",
            value: function getIndex(id) {
                id = id.toString();
                return _classPrivateFieldGet2(_ids, this).indexOf(id);
            }
        }, {
            key: "clear",
            value: function clear() {
                _classPrivateFieldSet2(_items, this, []);
                _classPrivateFieldSet2(_ids, this, []);
                this.size = 0;
                return this;
            }
        }, {
            key: "delete",
            value: function _delete(id) {
                id = id.toString();
                var index = _classPrivateFieldGet2(_ids, this).indexOf(id);
                if (index >= 0) {
                    _classPrivateFieldGet2(_items, this).splice(index, 1);
                    _classPrivateFieldGet2(_ids, this).splice(index, 1);
                    this.size--;
                }
                return this;
            }
        }, {
            key: "forEach",
            value: function forEach(callback) {
                for (var i = 0; i < this.size; i++) {
                    callback(_classPrivateFieldGet2(_items, this)[i], _classPrivateFieldGet2(_ids, this)[i], this);
                }
            }
        }, {
            key: "has",
            value: function has(id) {
                id = id.toString();
                return _classPrivateFieldGet2(_ids, this).indexOf(id) >= 0;
            }
        }, {
            key: "set",
            value: function set(id, item) {
                id = id.toString();
                var index = _classPrivateFieldGet2(_ids, this).indexOf(id);
                if (index >= 0) {
                    _classPrivateFieldGet2(_items, this)[index] = item;
                    return this;
                }
                _classPrivateFieldGet2(_items, this).push(item);
                _classPrivateFieldGet2(_ids, this).push(id);
                this.size++;
                return this;
            }
        } ]);
    }();
    function CSLCitation(itemsStartIndex, citationID) {
        if (!citationID) {
            citationID = this._generateId();
        }
        if (typeof itemsStartIndex !== "number") {
            throw new Error("itemsStartIndex is required");
        }
        this.citationID = citationID;
        this._itemsStartIndex = itemsStartIndex;
        this._citationItems = new Array;
        this._properties = {};
        this._schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-citation.json";
    }
    CSLCitation.prototype.fillFromObject = function(citationObject) {
        if (Object.hasOwnProperty.call(citationObject, "properties") || Object.hasOwnProperty.call(citationObject, "schema")) {
            return this._fillFromCitationObject(citationObject);
        } else if (Object.hasOwnProperty.call(citationObject, "citationItems")) {
            return this._fillFromFlatCitationObject(citationObject);
        } else if (Object.hasOwnProperty.call(citationObject, "version") && Object.hasOwnProperty.call(citationObject, "library")) {
            return this._fillFromJson(citationObject);
        }
        return this._fillFromCslJson(citationObject);
    };
    CSLCitation.prototype._fillFromCitationObject = function(citationObject) {
        var self = this;
        if (Object.hasOwnProperty.call(citationObject, "schema")) ;
        if (Object.hasOwnProperty.call(citationObject, "properties")) {
            this._setProperties(citationObject.properties);
        }
        if (!Object.hasOwnProperty.call(citationObject, "citationItems")) {
            console.error("citationItems is empty");
            return 0;
        }
        var existingIds = this._citationItems.map(function(item) {
            return item.id;
        });
        citationObject.citationItems.forEach(function(item) {
            var id = item.id;
            var citationItem;
            if (existingIds.indexOf(id) >= 0) {
                citationItem = self._citationItems[existingIds.indexOf(id)];
            } else {
                citationItem = new CitationItem(id);
                existingIds.push(id);
            }
            if (typeof id === "number") {
                id = self._extractIdFromWord365Citation(item);
            }
            citationItem.fillFromObject(item);
            self._addCitationItem(citationItem);
        }, this);
        return existingIds.length;
    };
    CSLCitation.prototype._fillFromFlatCitationObject = function(citationObject) {
        var self = this;
        if (citationObject.citationItems.length === 0) {
            console.error("CSLCitation.citationItems: citationItems is empty");
            return 0;
        } else if (citationObject.citationItems.length > 1) {
            console.warn("CSLCitation.citationItems: citationItems has more than one item");
        }
        citationObject.citationItems.forEach(function(itemObject) {
            self._fillFromCslJson(itemObject);
        }, this);
        return 1;
    };
    CSLCitation.prototype._fillFromCslJson = function(itemObject) {
        this._itemsStartIndex;
        var id = itemObject.id;
        var citationItem;
        var existingIds = this._citationItems.map(function(item) {
            return item.id;
        });
        if (existingIds.indexOf(id) >= 0) {
            citationItem = this._citationItems[existingIds.indexOf(id)];
        } else {
            citationItem = new CitationItem(id);
        }
        citationItem.fillFromObject(itemObject);
        this._addCitationItem(citationItem);
        return 1;
    };
    CSLCitation.prototype._fillFromJson = function(itemObject) {
        this._itemsStartIndex;
        if (!Object.hasOwnProperty.call(itemObject, "data")) {
            console.error("Invalid citation object");
            return 0;
        }
        var existingIds = this._citationItems.map(function(item) {
            return item.id;
        });
        var id = itemObject.data.key;
        var citationItem;
        if (existingIds.indexOf(id) >= 0) {
            citationItem = this._citationItems[existingIds.indexOf(id)];
        } else {
            citationItem = new CitationItem(id);
        }
        citationItem.fillFromObject(itemObject);
        this._addCitationItem(citationItem);
        return 1;
    };
    CSLCitation.prototype.getCitationItems = function() {
        return this._citationItems;
    };
    CSLCitation.prototype.getDoNotUpdate = function() {
        if (Object.hasOwnProperty.call(this._properties, "dontUpdate")) {
            return !!this._properties.dontUpdate;
        }
        return false;
    };
    CSLCitation.prototype.getInfoForCitationCluster = function() {
        return this._citationItems.map(function(item) {
            return item.getInfoForCitationCluster();
        }, this);
    };
    CSLCitation.prototype.getPlainCitation = function() {
        if (Object.hasOwnProperty.call(this._properties, "plainCitation")) {
            return String(this._properties.plainCitation);
        }
        return "";
    };
    CSLCitation.prototype._addCitationItem = function(item) {
        var existingIds = this._citationItems.map(function(item) {
            return item.id;
        });
        if (existingIds.indexOf(item.id) >= 0) {
            this._citationItems[existingIds.indexOf(item.id)] = item;
            return this;
        }
        this._citationItems.push(item);
        return this;
    };
    CSLCitation.prototype.addDoNotUpdate = function() {
        this._setProperties({
            dontUpdate: true
        });
        return this;
    };
    CSLCitation.prototype.addPlainCitation = function(plainCitation) {
        this._setProperties({
            plainCitation: plainCitation
        });
        return this;
    };
    CSLCitation.prototype._setProperties = function(properties) {
        var self = this;
        Object.keys(properties).forEach(function(key) {
            if (Object.hasOwnProperty.call(properties, key)) {
                self._properties[key] = properties[key];
            }
        }, this);
        return this;
    };
    CSLCitation.prototype._setSchema = function(schema) {
        this._schema = schema;
        return this;
    };
    CSLCitation.prototype._extractIdFromWord365Citation = function(item) {
        if (Object.hasOwnProperty.call(item, "uris") && item.uris.length) {
            var index = item.uris[0].lastIndexOf("/");
            return item.uris[0].slice(index + 1);
        }
        return item.id;
    };
    CSLCitation.prototype._generateId = function() {
        return Math.random().toString(36).substring(2, 15);
    };
    CSLCitation.prototype.validate = function() {
        var errors = [];
        if (!this._schema) errors.push("Schema is required");
        if (!this.citationID) errors.push("citationID is required");
        if (this._citationItems && Array.isArray(this._citationItems)) {
            for (var i = 0; i < this._citationItems.length; i++) {
                if (!this._citationItems[i].id) {
                    errors.push("Citation item at index " + i + " must have an id");
                }
            }
        }
        return errors.length === 0 ? true : errors;
    };
    CSLCitation.prototype.toJSON = function() {
        var result = {
            citationID: this.citationID,
            schema: this._schema
        };
        if (this._properties && Object.keys(this._properties).length > 0) {
            result.properties = this._properties;
        }
        if (this._citationItems && this._citationItems.length > 0) {
            result.citationItems = this._citationItems.map(function(item) {
                return item.toJSON();
            });
        }
        return result;
    };
    function SearchFilterComponents() {
        this._searchField = new InputField("searchField", {
            type: "text",
            autofocus: true,
            showClear: false
        });
        this._filterButton = new Button("filterButton", {
            variant: "secondary-icon",
            size: "small"
        });
        this._librarySelectList = new SelectBox("librarySelectList", {
            placeholder: translate("No items selected"),
            multiple: true,
            description: translate("Search in:")
        });
        this._subscribers = [];
        this._addEventListeners();
    }
    SearchFilterComponents.prototype._addEventListeners = function() {
        var self = this;
        this._searchField.subscribe(function(e) {
            if (e.type === "inputfield:blur" || e.type === "inputfield:submit") {
                var selectedGroups = self._getSelectedGroups();
                self._subscribers.forEach(function(cb) {
                    cb(e.detail.value, selectedGroups);
                });
            }
        });
        this._filterButton.subscribe(function(e) {
            if (e.type === "button:click") {
                if (!self._librarySelectList.isOpen) {
                    if (e.detail.originalEvent) {
                        e.detail.originalEvent.stopPropagation();
                    }
                    self._librarySelectList.openDropdown();
                }
            }
        });
    };
    SearchFilterComponents.prototype.addGroups = function(groups) {
        var self = this;
        var savedGroups = localStorage.getItem("selectedGroups");
        var selectedItems = savedGroups ? JSON.parse(savedGroups).map(function(id) {
            return id.toString();
        }) : [ "my_library", "group_libraries" ];
        var hasSelected = false;
        groups.forEach(function(group) {
            group.id = String(group.id);
        });
        var customGroups = [ {
            id: "my_library",
            name: translate("My Library")
        }, {
            id: "group_libraries",
            name: translate("Group Libraries")
        } ];
        !hasSelected && customGroups.forEach(function(group) {
            if (selectedItems.indexOf(group.id) !== -1) {
                hasSelected = true;
            }
        });
        !hasSelected && groups.forEach(function(group) {
            if (selectedItems.indexOf(group.id.toString()) !== -1) {
                hasSelected = true;
            }
        });
        if (!hasSelected) {
            selectedItems = [ "my_library", "group_libraries" ];
        }
        var addGroupToSelectBox = function addGroupToSelectBox(id, name, selected) {
            if (typeof id === "number") {
                id = id.toString();
            }
            if (self._librarySelectList instanceof SelectBox) self._librarySelectList.addItem(id, name, selected);
        };
        for (var i = 0; i < customGroups.length; i++) {
            var id = customGroups[i].id;
            var name = customGroups[i].name;
            addGroupToSelectBox(id, name, selectedItems.indexOf(id) !== -1);
        }
        if (groups.length === 0) {
            return;
        }
        this._librarySelectList.addSeparator();
        var selected = selectedItems.indexOf("group_libraries") !== -1;
        for (var i = 0; i < groups.length; i++) {
            var _id = groups[i].id;
            var _name = groups[i].name;
            addGroupToSelectBox(_id, _name, selected || selectedItems.indexOf(_id.toString()) !== -1);
        }
        this._selectedGroupsWatcher(customGroups, groups);
    };
    SearchFilterComponents.prototype._getSelectedGroups = function() {
        var self = this;
        var ids = this._librarySelectList.getSelectedValues();
        if (Array.isArray(ids) === false || ids.length === 0) {
            setTimeout(function() {
                self._librarySelectList.openDropdown();
            }, 500);
        }
        if (ids === null || typeof ids === "string") {
            return [];
        }
        return ids;
    };
    SearchFilterComponents.prototype.subscribe = function(callback) {
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
    SearchFilterComponents.prototype._selectedGroupsWatcher = function(customGroups, groups) {
        var self = this;
        if (this._librarySelectList instanceof SelectBox === false) {
            return;
        }
        this._librarySelectList.subscribe(function(event) {
            if (event.type !== "selectbox:change") {
                return;
            }
            var aGroupsToSave = [];
            var values = event.detail.values;
            var current = event.detail.current;
            var bEnabled = event.detail.enabled;
            var customIds = customGroups.map(function(group) {
                return group.id;
            });
            var ids = groups.map(function(group) {
                return group.id.toString();
            });
            var bWasCustom = customIds.indexOf(String(current)) !== -1;
            if (bWasCustom) {
                if (current === "group_libraries") {
                    if (bEnabled) {
                        aGroupsToSave.push("group_libraries");
                        self._librarySelectList.selectItems(ids, true);
                    } else {
                        self._librarySelectList.unselectItems(ids, true);
                    }
                    if (values.indexOf("my_library") !== -1) {
                        aGroupsToSave.push("my_library");
                    }
                } else {
                    if (values.indexOf("group_libraries") !== -1) {
                        aGroupsToSave.push("group_libraries");
                        if (bEnabled) {
                            aGroupsToSave.push(current);
                        }
                    } else {
                        aGroupsToSave = values.slice();
                    }
                }
            } else if (!bWasCustom) {
                var bAllGroupsSelected = ids.every(function(id) {
                    return values.indexOf(id) !== -1;
                });
                if (bAllGroupsSelected) {
                    self._librarySelectList.selectItems("group_libraries", true);
                    aGroupsToSave.push("group_libraries");
                    if (values.indexOf("my_library") !== -1) {
                        aGroupsToSave.push("my_library");
                    }
                } else {
                    self._librarySelectList.unselectItems("group_libraries", true);
                    aGroupsToSave = values.filter(function(value) {
                        return value !== "group_libraries";
                    });
                }
            }
            if (aGroupsToSave.length === 0) {
                localStorage.removeItem("selectedGroups");
            } else {
                localStorage.setItem("selectedGroups", JSON.stringify(aGroupsToSave));
            }
        });
    };
    function SelectCitationsComponent(displayNoneClass, fLoadMore, fShouldLoadMore) {
        this._displayNoneClass = displayNoneClass;
        this._items = {};
        this._html = {};
        this._checks = {};
        this._LOCATOR_VALUES = [ [ "appendix", "Appendix" ], [ "article", "Article" ], [ "book", "Book" ], [ "chapter", "Chapter" ], [ "column", "Column" ], [ "figure", "Figure" ], [ "folio", "Folio" ], [ "issue", "Issue" ], [ "line", "Line" ], [ "note", "Note" ], [ "opus", "Opus" ], [ "page", "Page" ], [ "paragraph", "Paragraph" ], [ "part", "Part" ], [ "rule", "Rule" ], [ "section", "Section" ], [ "sub-verbo", "Sub verbo" ], [ "table", "Table" ], [ "title", "Title" ], [ "verses", "Verses" ], [ "volume", "Volume" ] ];
        this._cancelSelectBtn = document.getElementById("cancelSelectBtn");
        this._docsHolder = document.getElementById("docsHolder");
        this._nothingFound = document.getElementById("nothingFound");
        this._docsThumb = document.getElementById("docsThumb");
        this._selectedWrapper = document.getElementById("selectedWrapper");
        this._selectedHolder = document.getElementById("selectedHolder");
        this._selectedInfo = document.getElementById("selectedInfo");
        this._selectedCount = document.getElementById("selectedCount");
        this._selectedThumb = document.getElementById("selectedThumb");
        if (this._selectedHolder && this._selectedThumb) {
            this._selectedScroller = this._initScrollBox(this._selectedHolder, this._selectedThumb, 20);
        }
        if (this._docsHolder && this._docsThumb) {
            this._docsScroller = this._initScrollBox(this._docsHolder, this._docsThumb, 40, this._checkDocsScroll.bind(this));
        }
        this._subscribers = [];
        this._fShouldLoadMore = fShouldLoadMore;
        this._fLoadMore = fLoadMore;
        this._loadTimeout;
        this._init();
    }
    SelectCitationsComponent.prototype._init = function() {
        var self = this;
        if (this._cancelSelectBtn) {
            this._cancelSelectBtn.onclick = function(e) {
                var ids = [];
                for (var id in self._items) {
                    ids.push(id);
                }
                for (var i = 0; i < ids.length; i++) {
                    self._removeSelected(ids[i]);
                }
            };
        }
    };
    SelectCitationsComponent.prototype.clearLibrary = function() {
        this._nothingFound && this._nothingFound.classList.add(this._displayNoneClass);
        var holder = this._docsHolder;
        while (holder && holder.lastChild) {
            holder.removeChild(holder.lastChild);
        }
        if (holder) holder.scrollTop = 0;
        this._docsScroller.onscroll();
    };
    SelectCitationsComponent.prototype.displayNothingFound = function() {
        this.clearLibrary();
        this._nothingFound && this._nothingFound.classList.remove(this._displayNoneClass);
    };
    SelectCitationsComponent.prototype.displaySearchItems = function(res, err) {
        var _this = this;
        var self = this;
        var holder = this._docsHolder;
        var numOfShown = 0;
        return new Promise(function(resolve, reject) {
            if (res && res.items && res.items.length > 0) {
                var page = document.createElement("div");
                if (holder) page.classList.add("page" + holder.children.length);
                for (var index = 0; index < res.items.length; index++) {
                    var item = res.items[index];
                    page.appendChild(self._buildDocElement(item));
                    numOfShown++;
                }
                if (holder) holder.appendChild(page);
            } else if (err) {
                reject(err);
            }
            _this._docsScroller.onscroll();
            resolve(numOfShown);
        });
    };
    SelectCitationsComponent.prototype.getSelectedItems = function() {
        var items = Object.assign({}, this._items || {});
        return items;
    };
    SelectCitationsComponent.prototype.removeItems = function(keys) {
        var self = this;
        keys.forEach(function(key) {
            self._removeSelected(key);
        });
    };
    SelectCitationsComponent.prototype.subscribe = function(callback) {
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
    SelectCitationsComponent.prototype._buildDocElement = function(item) {
        var self = this;
        var root = document.createElement("div");
        root.classList.add("doc");
        var docInfo = document.createElement("div");
        docInfo.classList.add("docInfo");
        var checkHolder = document.createElement("div");
        var label = "";
        if (item.author && item.author.length > 0) {
            label = item.author.map(function(a) {
                if (a.family && a.given) {
                    return a.family.trim() + ", " + a.given.trim();
                } else if (a.family) {
                    return a.family.trim();
                } else if (a.given) {
                    return a.given.trim();
                }
                return "";
            }).join("; ");
        }
        var arrow = document.createElement("div");
        arrow.classList.add("selectbox-arrow");
        arrow.innerHTML = '<svg width="6" height="6" viewBox="0 0 6 6" ' + 'fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path fill-rule="evenodd" clip-rule="evenodd"' + ' d="M3 0L0 2.9978L3 5.99561L6 2.9978L3 0ZM3 0.00053797L0.75' + ' 2.24889L3 4.49724L5.25 2.24889L3 0.00053797Z" ' + 'fill="currentColor"/></svg>';
        var title = document.createElement("div");
        title.textContent = item.title.trim();
        title.classList.add("truncate-text");
        title.classList.add("secondary-text");
        if (item.publisher || item["publisher-place"]) {
            title.textContent += " · " + (item.publisher || item["publisher-place"] || "");
        }
        if (item.issued && item.issued["date-parts"]) {
            var date = item.issued["date-parts"][0];
            if (label.length > 20) {
                title.textContent += " (" + date.join("-") + ")";
            } else {
                if (label.length > 0 && label.slice(-1) !== "." && label.slice(-1) !== ",") label += ".";
                label += " " + date.join("-");
            }
        }
        if (label.length === 0) {
            label = title.textContent;
        }
        title.setAttribute("title", title.textContent);
        docInfo.appendChild(title);
        var check = document.createElement("input");
        checkHolder.appendChild(check);
        var checkInput = new Checkbox(check, {
            checked: !!this._items[item.id],
            label: label,
            title: true,
            id: item.id
        });
        if (this._items[item.id]) {
            this._checks[item.id] = checkInput;
        }
        checkHolder.appendChild(arrow);
        root.appendChild(checkHolder);
        root.appendChild(docInfo);
        var params;
        function toggleItem() {
            root.classList.toggle("doc-open");
            if (!params) {
                params = self._buildCitationParams(item);
                root.appendChild(params);
            }
        }
        arrow.onclick = toggleItem;
        checkInput.subscribe(function(event) {
            if (event.type !== "checkbox:change") {
                return;
            }
            if (event.detail.checked) {
                self._addSelected(item, checkInput);
            } else {
                self._removeSelected(item.id);
            }
        });
        return root;
    };
    SelectCitationsComponent.prototype._buildCitationParams = function(item) {
        var locatorLabel = localStorage.getItem("selectedLocator") || "page";
        item.label = locatorLabel;
        var params = document.createDocumentFragment();
        var prefixSuffixContainer = document.createElement("div");
        var prefix = document.createElement("input");
        var suffix = document.createElement("input");
        var locatorContainer = document.createElement("div");
        var locatorSelect = document.createElement("div");
        var locator = document.createElement("input");
        var omitAuthorContainer = document.createElement("div");
        var omitAuthor = document.createElement("input");
        params.appendChild(prefixSuffixContainer);
        prefixSuffixContainer.appendChild(prefix);
        prefixSuffixContainer.appendChild(suffix);
        params.appendChild(locatorContainer);
        locatorContainer.appendChild(locatorSelect);
        locatorContainer.appendChild(locator);
        var locatorPlaceholder = "";
        params.appendChild(omitAuthorContainer);
        omitAuthorContainer.appendChild(omitAuthor);
        var prefixInput = new InputField(prefix, {
            type: "text",
            placeholder: "Prefix"
        });
        var suffixInput = new InputField(suffix, {
            type: "text",
            placeholder: "Suffix"
        });
        var locatorSelectbox = new SelectBox(locatorSelect, {
            placeholder: "Locator"
        });
        this._LOCATOR_VALUES.forEach(function(info) {
            var selected = info[0] === locatorLabel;
            locatorSelectbox.addItem(info[0], info[1], selected);
            if (selected) {
                locatorPlaceholder = info[1];
            }
        });
        var locatorInput = new InputField(locator, {
            type: "text",
            placeholder: locatorPlaceholder
        });
        var omitAuthorInput = new Checkbox(omitAuthor, {
            label: "Omit author"
        });
        prefixInput.subscribe(function(event) {
            if (event.type !== "inputfield:input") {
                return;
            }
            item.prefix = event.detail.value;
        });
        suffixInput.subscribe(function(event) {
            if (event.type !== "inputfield:input") {
                return;
            }
            item.suffix = event.detail.value;
        });
        locatorInput.subscribe(function(event) {
            if (event.type !== "inputfield:input") {
                return;
            }
            item.locator = event.detail.value;
        });
        locatorSelectbox.subscribe(function(event) {
            if (event.type !== "selectbox:change") {
                return;
            }
            if (!event.detail.items) {
                return;
            }
            var eventItem = event.detail.items[0];
            locatorInput.setPlaceholder(eventItem.text);
            item.label = event.detail.values[0].toString();
            localStorage.setItem("selectedLocator", item.label);
        });
        omitAuthorInput.subscribe(function(event) {
            if (event.type !== "checkbox:change") {
                return;
            }
            item["suppress-author"] = event.detail.checked;
        });
        return params;
    };
    SelectCitationsComponent.prototype._buildSelectedElement = function(item) {
        var self = this;
        var root = document.createElement("div");
        root.classList.add("selDoc");
        var span = document.createElement("span");
        if (item.author && item.author.length > 0) {
            span.textContent = item.author.map(function(a) {
                return a.family + ", " + a.given;
            }).join("; ");
        } else {
            span.textContent = item.title;
        }
        if (item.issued && item.issued["date-parts"]) {
            span.textContent += " " + item.issued["date-parts"][0].join("-");
        }
        span.setAttribute("title", span.textContent);
        root.appendChild(span);
        var remove = document.createElement("span");
        remove.onclick = function() {
            self._removeSelected(item.id);
        };
        remove.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M12.0718 4.6333L11.564 5.14404L10.5483 6.1665L8.70459 8.02002L10.3862 9.7124L11.4829' + " 10.8149L12.0308 11.3667L11.3218 12.0718L10.7729 11.52L9.67725 10.4175L7.99951 8.729L6.32275" + " 10.4165L5.22705 11.52L4.67822 12.0718L3.96924 11.3667L4.51709 10.8149L5.61377 9.7124L7.29443" + " 8.02002L5.45166 6.1665L4.43604 5.14404L3.92822 4.6333L4.63721 3.92822L5.14502 4.43896L6.16162" + ' 5.46143L7.99951 7.31104L9.83838 5.46143L10.855 4.43896L11.3628 3.92822L12.0718 4.6333Z"' + ' fill="currentColor" fill-opacity="0.8"/></svg>';
        root.appendChild(remove);
        return root;
    };
    SelectCitationsComponent.prototype._addSelected = function(item, checkbox) {
        var el = this._buildSelectedElement(item);
        this._items[item.id] = item;
        this._html[item.id] = el;
        this._checks[item.id] = checkbox;
        if (this._selectedHolder) {
            this._selectedHolder.appendChild(el);
        }
        this._docsScroller.onscroll();
        this._selectedScroller.onscroll();
        this._checkSelected();
    };
    SelectCitationsComponent.prototype._checkDocsScroll = function(holder, thumb) {
        var self = this;
        if (this._fShouldLoadMore(holder)) {
            if (this._loadTimeout) {
                clearTimeout(this._loadTimeout);
            }
            if (!lastSearch.obj && !lastSearch.text.trim() && !lastSearch.groups.length) return;
            this._loadTimeout = setTimeout(function() {
                if (self._fShouldLoadMore(holder)) {
                    self._fLoadMore();
                }
            }, 500);
        }
    };
    SelectCitationsComponent.prototype._initScrollBox = function(holder, thumb, minThumbHeight, onscroll) {
        var scroller = {};
        scroller.onscroll = this._checkScroll(holder, thumb, minThumbHeight, onscroll);
        holder.onwheel = function(e) {
            holder.scrollTop += e.deltaY > 10 || e.deltaY < -10 ? e.deltaY : e.deltaY * 20;
            scroller.onscroll();
        };
        thumb.onmousedown = function(e) {
            thumb.classList.add("scrolling");
            var y = e.clientY;
            var initialPos = holder.scrollTop;
            window.onmouseup = function(e) {
                thumb.classList.remove("scrolling");
                window.onmouseup = null;
                window.onmousemove = null;
            };
            window.onmousemove = function(e) {
                var delta = e.clientY - y;
                var percMoved = delta / holder.clientHeight;
                var deltaScroll = holder.scrollHeight * percMoved;
                holder.scrollTop = initialPos + deltaScroll;
                scroller.onscroll();
            };
        };
        document.body.addEventListener("resize", function() {
            scroller.onscroll();
        });
        return scroller;
    };
    SelectCitationsComponent.prototype._checkScroll = function(holder, thumb, minThumbHeight, func) {
        var displayNoneClass = this._displayNoneClass;
        return function() {
            if (holder.scrollHeight <= holder.clientHeight) {
                thumb.classList.add(displayNoneClass);
            } else {
                thumb.classList.remove(displayNoneClass);
                var height = holder.clientHeight / holder.scrollHeight * holder.clientHeight;
                height = height < minThumbHeight ? minThumbHeight : height;
                thumb.style.height = height + "px";
                var scroll = holder.scrollHeight - holder.clientHeight;
                var percScrolled = holder.scrollTop / scroll;
                var margin = percScrolled * (holder.clientHeight - height);
                thumb.style.marginTop = margin + "px";
            }
            if (func) func(holder, thumb);
        };
    };
    SelectCitationsComponent.prototype._removeSelected = function(id) {
        var el = this._html[id];
        if (this._selectedHolder) {
            this._selectedHolder.removeChild(el);
        }
        delete this._items[id];
        delete this._html[id];
        if (this._checks[id]) {
            this._checks[id].uncheck(true);
            delete this._checks[id];
        }
        this._docsScroller.onscroll();
        this._selectedScroller.onscroll();
        this._checkSelected();
    };
    SelectCitationsComponent.prototype._checkSelected = function() {
        var numOfSelected = this.count();
        if (!this._selectedInfo || !this._selectedCount || !this._selectedWrapper) {
            return;
        }
        if (numOfSelected <= 0) {
            this._selectedWrapper.classList.add(this._displayNoneClass);
            this._selectedInfo.classList.add(this._displayNoneClass);
        } else {
            this._selectedWrapper.classList.remove(this._displayNoneClass);
            this._selectedInfo.classList.remove(this._displayNoneClass);
            this._selectedCount.textContent = numOfSelected + " " + translate("selected");
        }
        this._subscribers.forEach(function(cb) {
            cb(numOfSelected);
        });
    };
    SelectCitationsComponent.prototype.count = function() {
        var k = 0;
        for (var i in this._items) k++;
        return k;
    };
    var AdditionalWindow = function() {
        function AdditionalWindow() {
            _classCallCheck(this, AdditionalWindow);
            this._window = null;
        }
        return _createClass(AdditionalWindow, [ {
            key: "show",
            value: function show(fileName, description, text) {
                var variation = {
                    url: fileName + ".html",
                    description: window.Asc.plugin.tr(description),
                    isVisual: true,
                    isModal: false,
                    EditorsSupport: [ "word" ],
                    size: [ 400, 310 ],
                    isViewer: true,
                    isDisplayedInViewer: false,
                    isInsideMode: false
                };
                this._window = new window.Asc.PluginWindow;
                this._window.show(variation);
                this._window.button = function(id) {
                    console.log("button", id);
                    window.Asc.plugin.executeCommand("close", "");
                };
            }
        }, {
            key: "hide",
            value: function hide() {}
        } ]);
    }();
    var _onUserEditCitationManuallyWindow = new WeakMap;
    var _CitationService_brand = new WeakSet;
    var CitationService = function() {
        function CitationService(localesManager, cslStylesManager, sdk) {
            _classCallCheck(this, CitationService);
            _classPrivateMethodInitSpec(this, _CitationService_brand);
            _classPrivateFieldInitSpec(this, _onUserEditCitationManuallyWindow, void 0);
            this._bibPlaceholderIfEmpty = "Please insert some citation into the document.";
            this._citPrefixNew = "ZOTERO_ITEM";
            this._citSuffixNew = "CSL_CITATION";
            this._citPrefix = "ZOTERO_CITATION";
            this._bibPrefixNew = "ZOTERO_BIBL";
            this._bibSuffixNew = "CSL_BIBLIOGRAPHY";
            this._bibPrefix = "ZOTERO_BIBLIOGRAPHY";
            this._sdk = sdk;
            this._localesManager = localesManager;
            this._cslStylesManager = cslStylesManager;
            this._storage = new CSLCitationStorage;
            this._formatter;
            this.citationDocService = new CitationDocService(this._citPrefixNew, this._citSuffixNew, this._bibPrefixNew, this._bibSuffixNew);
            this._notesStyle;
            this._styleFormat;
            _classPrivateFieldSet2(_onUserEditCitationManuallyWindow, this, new AdditionalWindow);
        }
        return _createClass(CitationService, [ {
            key: "saveAsText",
            value: function saveAsText() {
                return this.citationDocService.saveAsText();
            }
        }, {
            key: "setNotesStyle",
            value: function setNotesStyle(notesStyle) {
                this._notesStyle = notesStyle;
            }
        }, {
            key: "setStyleFormat",
            value: function setStyleFormat(styleFormat) {
                this._styleFormat = styleFormat;
            }
        }, {
            key: "insertSelectedCitations",
            value: function insertSelectedCitations(items) {
                var self = this;
                var cslCitation = new CSLCitation(self._storage.size, "");
                for (var citationID in items) {
                    var item = items[citationID];
                    cslCitation.fillFromObject(item);
                }
                return _assertClassBrand(_CitationService_brand, this, _getSelectedInJsonFormat).call(this, items).then(function(items) {
                    items.forEach(function(item) {
                        cslCitation.fillFromObject(item);
                    });
                    return _assertClassBrand(_CitationService_brand, self, _formatInsertLink).call(self, cslCitation);
                });
            }
        }, {
            key: "updateCslItems",
            value: function updateCslItems(bUpdateAll, bPastBib) {
                this._storage.clear();
                var self = this;
                return _assertClassBrand(_CitationService_brand, this, _synchronizeStorageWithDocItems).call(this).then(function(info) {
                    info.fields;
                    var updatedFields = info.updatedFields, bibField = info.bibField, bibFieldValue = info.bibFieldValue;
                    if (!bUpdateAll && !bPastBib) {
                        return [];
                    }
                    if (bibField) {
                        if (updatedFields.length === 0) {
                            bibField["Content"] = translate(self._bibPlaceholderIfEmpty);
                        } else {
                            var bibliography = _assertClassBrand(_CitationService_brand, self, _makeBibliography).call(self);
                            bibField["Content"] = bibliography;
                        }
                        updatedFields.push(bibField);
                    } else if (bPastBib) {
                        var _bibliography = _assertClassBrand(_CitationService_brand, self, _makeBibliography).call(self);
                        if (updatedFields.length === 0) {
                            _bibliography = translate(self._bibPlaceholderIfEmpty);
                        }
                        if (self._cslStylesManager.isLastUsedStyleContainBibliography()) {
                            return self.citationDocService.addBibliography(_bibliography, bibFieldValue).then(function() {
                                return updatedFields;
                            });
                        } else {
                            throw "The current bibliographic style does not describe the bibliography";
                        }
                    }
                    return updatedFields;
                }).then(function(updatedFields) {
                    if (updatedFields && updatedFields.length) {
                        return self.citationDocService.updateAddinFields(updatedFields);
                    }
                });
            }
        } ]);
    }();
    function _formatInsertLink(cslCitation) {
        var self = this;
        var bUpdateItems = false;
        var keys = [];
        var keysL = [];
        return Promise.resolve().then(function() {
            cslCitation.getCitationItems().forEach(function(item) {
                if (!self._storage.has(item.id)) {
                    bUpdateItems = true;
                }
                self._storage.set(item.id, item);
                keys.push(item.id);
                keysL.push(item.getInfoForCitationCluster());
            });
            if (bUpdateItems) {
                var arrIds = [];
                self._storage.forEach(function(item, id) {
                    arrIds.push(id);
                });
                self._formatter.updateItems(arrIds);
            }
        }).then(function() {
            var fragment = document.createDocumentFragment();
            var tempElement = document.createElement("div");
            fragment.appendChild(tempElement);
            tempElement.innerHTML = self._formatter.makeCitationCluster(keysL);
            cslCitation.addPlainCitation(tempElement.innerText);
            var notesStyle = null;
            if ("note" === self._styleFormat) {
                notesStyle = self._notesStyle;
            }
            return self.citationDocService.addCitation(tempElement.innerText, JSON.stringify(cslCitation.toJSON()), notesStyle);
        }).then(function() {
            return keys;
        });
    }
    function _getSelectedInJsonFormat(items) {
        var arrUsrItems = [];
        var arrGroupsItems = {};
        for (var citationID in items) {
            var item = items[citationID];
            var userID = item["userID"];
            var _groupID = item["groupID"];
            if (userID) {
                arrUsrItems.push(item.id);
            } else if (_groupID) {
                if (!arrGroupsItems[_groupID]) {
                    arrGroupsItems[_groupID] = [];
                }
                arrGroupsItems[_groupID].push(item.id);
            }
        }
        var promises = [];
        if (arrUsrItems.length) {
            promises.push(this._sdk.getItems(null, arrUsrItems, "json").then(function(res) {
                var items = res.items || [];
                return items;
            }));
        }
        for (var groupID in arrGroupsItems) {
            if (Object.hasOwnProperty.call(arrGroupsItems, groupID)) {
                promises.push(this._sdk.getGroupItems(null, groupID, arrGroupsItems[groupID], "json").then(function(res) {
                    var items = res.items || [];
                    return items;
                }));
            }
        }
        return Promise.all(promises).then(function(res) {
            var items = [];
            res.forEach(function(resItems) {
                items = items.concat(resItems);
            });
            return items;
        });
    }
    function _makeBibliography() {
        var self = this;
        var fragment = document.createDocumentFragment();
        var tempElement = document.createElement("div");
        fragment.appendChild(tempElement);
        try {
            var bibItems = new Array(self._storage.size);
            var bibObject = self._formatter.makeBibliography();
            for (var i = 0; i < bibObject[0].entry_ids.length; i++) {
                var citationId = bibObject[0].entry_ids[i][0];
                var citationIndex = self._storage.getIndex(citationId);
                var bibText = bibObject[1][i];
                while (bibText.indexOf("\n") !== bibText.lastIndexOf("\n")) {
                    bibText = bibText.replace(/\n/, "");
                }
                bibItems[citationIndex] = bibText;
            }
            tempElement.innerHTML = bibItems.join("");
        } catch (e) {
            if (false === self._cslStylesManager.isLastUsedStyleContainBibliography()) {
                tempElement.textContent = "";
            } else {
                console.error(e);
                throw "Failed to apply this style.";
            }
        }
        return tempElement.innerText;
    }
    function _extractField(field) {
        var citationObject;
        var citationStartIndex = field.Value.indexOf("{");
        var citationEndIndex = field.Value.lastIndexOf("}");
        if (citationStartIndex !== -1) {
            var citationString = field.Value.slice(citationStartIndex, citationEndIndex + 1);
            citationObject = JSON.parse(citationString);
        }
        return citationObject;
    }
    function _synchronizeStorageWithDocItems() {
        var self = this;
        return this.citationDocService.getAddinZoteroFields().then(function(arrFields) {
            var fragment = document.createDocumentFragment();
            var tempElement = document.createElement("div");
            fragment.appendChild(tempElement);
            var numOfItems = 0;
            var bibFieldValue = " ";
            var bibField = arrFields.find(function(field) {
                return field.Value.indexOf(self._bibPrefixNew) !== -1 || field.Value.indexOf(self._bibPrefix) !== -1;
            });
            if (bibField) {
                var citationObject = _assertClassBrand(_CitationService_brand, self, _extractField).call(self, bibField);
                if (_typeof(citationObject) === "object" && Object.keys(citationObject).length > 0) {
                    bibFieldValue = JSON.stringify(citationObject);
                }
            }
            var fields = arrFields.filter(function(field) {
                return field.Value.indexOf(self._citPrefixNew) !== -1 || field.Value.indexOf(self._citPrefix) !== -1;
            });
            var fieldsWithCitations = fields.map(function(field) {
                var citationObject = _assertClassBrand(_CitationService_brand, self, _extractField).call(self, field);
                var citationID = "";
                if (field.Value.indexOf(self._citPrefix) === -1) {
                    citationID = citationObject.citationID;
                }
                var cslCitation = new CSLCitation(numOfItems, citationID);
                numOfItems += cslCitation.fillFromObject(citationObject);
                cslCitation.getCitationItems().forEach(function(item) {
                    self._storage.set(item.id, item);
                });
                return {
                    field: _objectSpread2({}, field),
                    cslCitation: cslCitation
                };
            });
            _assertClassBrand(_CitationService_brand, self, _updateFormatter).call(self);
            var updatedFields = fieldsWithCitations.map(function(_ref, index) {
                var field = _ref.field, cslCitation = _ref.cslCitation;
                var keysL = cslCitation.getInfoForCitationCluster();
                tempElement.innerHTML = self._formatter.makeCitationCluster(keysL);
                var oldContent = field["Content"];
                var newContent = tempElement.innerText;
                if (oldContent !== newContent) {
                    field["Content"] = newContent;
                }
                console.log(cslCitation.getDoNotUpdate());
                if (cslCitation) {
                    field["Value"] = self._citPrefixNew + " " + self._citSuffixNew + JSON.stringify(cslCitation.toJSON());
                }
                return field;
            });
            return {
                fields: fields,
                updatedFields: updatedFields,
                bibField: bibField,
                bibFieldValue: bibFieldValue
            };
        });
    }
    function _updateFormatter() {
        var self = this;
        var arrIds = [];
        this._storage.forEach(function(item, id) {
            arrIds.push(id);
        });
        this._formatter = new CSL.Engine({
            retrieveLocale: function retrieveLocale(id) {
                if (self._localesManager.getLocale(id)) {
                    return self._localesManager.getLocale(id);
                }
                return self._localesManager.getLocale();
            },
            retrieveItem: function retrieveItem(id) {
                var item = self._storage.get(id);
                var index = self._storage.getIndex(id);
                if (!item) return null;
                return item.toFlatJSON(index);
            }
        }, this._cslStylesManager.cached(this._cslStylesManager.getLastUsedStyleIdOrDefault()), this._localesManager.getLastUsedLanguage(), true);
        if (arrIds.length) {
            this._formatter.updateItems(arrIds);
        }
        return;
    }
    var CslStylesParser = {
        getStyleInfo: function getStyleInfo(name, style) {
            var parser = new DOMParser;
            var xmlDoc = parser.parseFromString(style, "text/xml");
            var styleInfo = {
                categories: {
                    fields: [],
                    format: ""
                },
                dependent: 0,
                href: "",
                name: name,
                title: "",
                updated: ""
            };
            var title = xmlDoc.querySelector("info title");
            if (title) styleInfo.title = title.textContent;
            var href = xmlDoc.querySelector('info link[rel="self"]');
            if (href) {
                var attribute = href.getAttribute("href");
                if (attribute) styleInfo.href = attribute;
            }
            var parent = xmlDoc.querySelector('info link[rel="independent-parent"]');
            if (parent) {
                var _attribute = parent.getAttribute("href");
                if (_attribute) styleInfo.parent = _attribute;
                styleInfo.dependent = 1;
            }
            var updated = xmlDoc.querySelector("info updated");
            if (updated) styleInfo.updated = updated.textContent;
            var categoryFormat = xmlDoc.querySelector("info category[citation-format]");
            if (categoryFormat) {
                var _attribute2 = categoryFormat.getAttribute("citation-format");
                if (_attribute2) styleInfo.categories.format = _attribute2;
            }
            var categoryFields = xmlDoc.querySelectorAll("info category[field]");
            if (categoryFields) {
                categoryFields.forEach(function(category) {
                    var attribute = category.getAttribute("field");
                    if (attribute) styleInfo.categories.fields.push(attribute);
                });
            }
            return styleInfo;
        },
        getCitationFormat: function getCitationFormat(styleContent) {
            var parser = new DOMParser;
            var xmlDoc = parser.parseFromString(styleContent, "text/xml");
            var format = xmlDoc.querySelector("info category[citation-format]");
            if (!format) throw new Error("Citation format not found");
            var type = format.getAttribute("citation-format");
            if (!type) throw new Error("Citation format not found");
            switch (type) {
              case "note":
              case "numeric":
              case "author":
              case "author-date":
              case "label":
                return type;
            }
            throw new Error("Invalid citation format");
        },
        isStyleContainBibliography: function isStyleContainBibliography(styleContent) {
            return styleContent.indexOf("<bibliography") > -1;
        }
    };
    function CslStylesStorage() {
        this._customStyleNamesKey = "zoteroCustomStyleNames";
        this._customStylesKey = "zoteroCustomStyles";
    }
    CslStylesStorage.prototype.getStyleNames = function() {
        var customStyleNames = localStorage.getItem(this._customStyleNamesKey);
        if (customStyleNames) {
            return JSON.parse(customStyleNames);
        } else {
            return [];
        }
    };
    CslStylesStorage.prototype._getStyles = function() {
        var customStyles = localStorage.getItem(this._customStylesKey);
        if (customStyles) {
            return JSON.parse(customStyles);
        } else {
            return [];
        }
    };
    CslStylesStorage.prototype.getStyle = function(name) {
        var customStyleNames = this.getStyleNames();
        var styleIndex = customStyleNames.indexOf(name);
        if (styleIndex === -1) {
            return null;
        }
        return this._getStyles()[styleIndex];
    };
    CslStylesStorage.prototype.getStylesInfo = function() {
        var customStyleNames = this.getStyleNames();
        var customStyles = this._getStyles();
        var styles = [];
        for (var i = 0; i < customStyleNames.length; i++) {
            var result = CslStylesParser.getStyleInfo(customStyleNames[i], customStyles[i]);
            styles.push(result);
        }
        return styles;
    };
    CslStylesStorage.prototype.setStyle = function(name, data) {
        var customStyleNames = this.getStyleNames();
        var customStyles = this._getStyles();
        var styleIndex = customStyleNames.indexOf(name);
        if (styleIndex === -1) {
            styleIndex = customStyleNames.length;
        }
        customStyleNames[styleIndex] = name;
        customStyles[styleIndex] = data;
        localStorage.setItem(this._customStyleNamesKey, JSON.stringify(customStyleNames));
        localStorage.setItem(this._customStylesKey, JSON.stringify(customStyles));
        return CslStylesParser.getStyleInfo(name, data);
    };
    CslStylesStorage.prototype.deleteStyle = function(name) {
        var customStyleNames = this.getStyleNames();
        var customStyles = this._getStyles();
        var styleIndex = customStyleNames.indexOf(name);
        if (styleIndex === -1) {
            return name;
        }
        customStyleNames.splice(styleIndex, 1);
        customStyles.splice(styleIndex, 1);
        localStorage.setItem(this._customStyleNamesKey, JSON.stringify(customStyleNames));
        localStorage.setItem(this._customStylesKey, JSON.stringify(customStyles));
        return name;
    };
    function CslStylesManager() {
        this._isOnlineAvailable = false;
        this._isDesktopAvailable = false;
        this._customStylesStorage = new CslStylesStorage;
        this._STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json";
        this._STYLES_JSON_LOCAL = "./resources/csl/styles.json";
        this._STYLES_URL = "https://www.zotero.org/styles/";
        this._STYLES_LOCAL = "./resources/csl/styles/";
        this._lastStyleKey = "zoteroStyleId";
        this._lastNotesStyleKey = "zoteroNotesStyleId";
        this._lastFormatKey = "zoteroFormatId";
        this._lastUsedStyleContainBibliographyKey = "zoteroContainBibliography";
        this._defaultStyles = [ "american-medical-association", "american-political-science-association", "apa", "american-sociological-association", "chicago-author-date-17th-edition", "harvard-cite-them-right-10th-edition", "ieee", "modern-language-association-8th-edition", "nature" ];
        this._cache = {};
    }
    CslStylesManager.prototype.addCustomStyle = function(file) {
        var self = this;
        return new Promise(function(resolve, reject) {
            var fileName = file.name.toLowerCase();
            if (fileName.slice(-4) === ".csl" || fileName.slice(-4) === ".xml") {
                fileName = fileName.substring(0, fileName.length - 4).trim();
            } else {
                reject("Please select a .csl or .xml file.");
            }
            if (file.size > 1024 * 1024) {
                reject("Maximum file size is 1 MB.");
            }
            resolve(fileName);
        }).then(function(fileName) {
            return self._readCSLFile(file).then(function(content) {
                if (self._defaultStyles.indexOf(fileName) === -1) {
                    self._defaultStyles.push(fileName);
                }
                return self._customStylesStorage.setStyle(fileName, content);
            });
        });
    };
    CslStylesManager.prototype.getLastUsedFormat = function() {
        var lastUsedFormat = localStorage.getItem(this._lastFormatKey);
        switch (lastUsedFormat) {
          case "note":
          case "numeric":
          case "author":
          case "author-date":
          case "label":
            return lastUsedFormat;
        }
        return "numeric";
    };
    CslStylesManager.prototype.getLastUsedNotesStyle = function() {
        var lastUsedNotesStyle = localStorage.getItem(this._lastNotesStyleKey);
        if (lastUsedNotesStyle === "footnotes" || lastUsedNotesStyle === "endnotes") {
            return lastUsedNotesStyle;
        }
        return "footnotes";
    };
    CslStylesManager.prototype.getLastUsedStyleId = function() {
        var lastUsedStyle = localStorage.getItem(this._lastStyleKey);
        if (lastUsedStyle) {
            return lastUsedStyle;
        }
        return null;
    };
    CslStylesManager.prototype.getLastUsedStyleIdOrDefault = function() {
        var lastUsedStyle = localStorage.getItem(this._lastStyleKey);
        if (lastUsedStyle) {
            return lastUsedStyle;
        }
        return "ieee";
    };
    CslStylesManager.prototype.getStyle = function(styleName) {
        var saveToLocalStorage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var self = this;
        return Promise.resolve(styleName).then(function(styleName) {
            if (self._cache[styleName]) {
                return self._cache[styleName];
            }
            var customStyleNames = self._customStylesStorage.getStyleNames();
            if (customStyleNames.indexOf(styleName) !== -1) {
                return self._customStylesStorage.getStyle(styleName);
            }
            var url = self._STYLES_LOCAL + styleName + ".csl";
            if (self._isOnlineAvailable) {
                url = self._STYLES_URL + styleName;
            }
            return fetch(url).then(function(resp) {
                return resp.text();
            });
        }).then(function(content) {
            if (content && !self._isValidCSL(content) && self._isOnlineAvailable) {
                var styleInfo = CslStylesParser.getStyleInfo(styleName, content);
                if (styleInfo && styleInfo.dependent > 0 && styleInfo.parent) {
                    return fetch(styleInfo.parent).then(function(resp) {
                        return resp.text();
                    });
                }
            }
            return content;
        }).then(function(content) {
            var styleFormat = content && CslStylesParser.getCitationFormat(content) || "numeric";
            var result = {
                content: content,
                styleFormat: styleFormat
            };
            if (content && saveToLocalStorage) {
                self._saveLastUsedStyle(styleName, content, styleFormat);
            }
            return result;
        });
    };
    CslStylesManager.prototype.getStylesInfo = function() {
        var self = this;
        return Promise.all([ this._getStylesJson(), this._customStylesStorage.getStylesInfo() ]).then(function(styles) {
            var lastStyle = self.getLastUsedStyleId() || "ieee";
            var resultStyles = [];
            var resultStyleNames = self._customStylesStorage.getStyleNames();
            var loadedStyles = styles[0];
            var customStyles = styles[1];
            if (self._isDesktopAvailable && !self._isOnlineAvailable) {
                loadedStyles = loadedStyles.filter(function(style) {
                    return self._defaultStyles.indexOf(style.name) >= 0 || style.name == lastStyle;
                });
            }
            customStyles.forEach(function(style) {
                if (lastStyle === style.name) {
                    resultStyles.unshift(style);
                } else {
                    resultStyles.push(style);
                }
                if (self._defaultStyles.indexOf(style.name) === -1) {
                    self._defaultStyles.push(style.name);
                }
            });
            loadedStyles.forEach(function(style) {
                if (resultStyleNames.indexOf(style.name) !== -1) {
                    return;
                }
                if (lastStyle === style.name) {
                    resultStyles.unshift(style);
                } else {
                    resultStyles.push(style);
                }
            });
            return resultStyles;
        });
    };
    CslStylesManager.prototype._getStylesJson = function() {
        var url = this._STYLES_JSON_LOCAL;
        if (this._isOnlineAvailable) {
            url = this._STYLES_JSON_URL;
        }
        return fetch(url).then(function(resp) {
            return resp.json();
        });
    };
    CslStylesManager.prototype.cached = function(id) {
        if (Object.hasOwnProperty.call(this._cache, id)) {
            return this._cache[id];
        }
        return null;
    };
    CslStylesManager.prototype.isLastUsedStyleContainBibliography = function() {
        var containBibliography = localStorage.getItem(this._lastUsedStyleContainBibliographyKey);
        return containBibliography !== "false";
    };
    CslStylesManager.prototype.isStyleDefault = function(styleName) {
        return this._defaultStyles.indexOf(styleName) >= 0;
    };
    CslStylesManager.prototype._isValidCSL = function(content) {
        return content.indexOf("<?xml") > -1 && content.indexOf("<style") > -1 && content.indexOf("<macro") > -1 && content.indexOf("citation") > -1;
    };
    CslStylesManager.prototype._readCSLFile = function(file) {
        var self = this;
        return new Promise(function(resolve, reject) {
            var reader = new FileReader;
            reader.onload = function(e) {
                var fileContent = e.target ? String(e.target.result) : "";
                if (!self._isValidCSL(fileContent)) {
                    reject("The file is not a valid CSL file");
                    return;
                }
                resolve(fileContent);
            };
            reader.onerror = function() {
                reject("Failed to read file");
            };
            reader.readAsText(file);
        });
    };
    CslStylesManager.prototype._saveLastUsedStyle = function(id, content, currentStyleFormat) {
        this._cache[id] = content;
        localStorage.setItem(this._lastStyleKey, id);
        localStorage.setItem(this._lastFormatKey, currentStyleFormat);
        var containBibliography = CslStylesParser.isStyleContainBibliography(content);
        localStorage.setItem(this._lastUsedStyleContainBibliographyKey, containBibliography.toString());
    };
    CslStylesManager.prototype.saveLastUsedNotesStyle = function(notesStyle) {
        localStorage.setItem(this._lastNotesStyleKey, notesStyle);
    };
    CslStylesManager.prototype.setDesktopApiAvailable = function(isApiAvailable) {
        this._isDesktopAvailable = isApiAvailable;
    };
    CslStylesManager.prototype.setRestApiAvailable = function(isApiAvailable) {
        this._isOnlineAvailable = isApiAvailable;
    };
    function LocalesManager() {
        this._isOnlineAvailable = false;
        this._isDesktopAvailable = false;
        this._LOCALES_URL = "https://raw.githubusercontent.com/citation-style-language/locales/master/";
        this._LOCALES_PATH = "./resources/csl/locales/";
        this._lastLanguageKey = "zoteroLang";
        this._selectedLanguage = null;
        this._cache = {};
    }
    LocalesManager.prototype.loadLocale = function(langTag) {
        var self = this;
        this._selectedLanguage = langTag;
        if (this._cache[langTag]) {
            return Promise.resolve(this._cache[langTag]);
        }
        var url = this._getLocalesUrl() + "locales-" + langTag + ".xml";
        return fetch(url).then(function(response) {
            return response.text();
        }).then(function(text) {
            self._cache[langTag] = text;
            return text;
        });
    };
    LocalesManager.prototype.getLastUsedLanguage = function() {
        this._selectedLanguage = this._selectedLanguage || localStorage.getItem(this._lastLanguageKey) || "en-US";
        return this._selectedLanguage;
    };
    LocalesManager.prototype.getLocale = function(localeId) {
        if (localeId) {
            if (this._cache[localeId]) {
                return this._cache[localeId];
            }
            return null;
        }
        if (this._selectedLanguage && this._cache[this._selectedLanguage]) {
            return this._cache[this._selectedLanguage];
        }
        return null;
    };
    LocalesManager.prototype.saveLastUsedLanguage = function(language) {
        this._selectedLanguage = language;
        localStorage.setItem(this._lastLanguageKey, language);
    };
    LocalesManager.prototype._getLocalesUrl = function() {
        return this._isOnlineAvailable ? this._LOCALES_URL : this._LOCALES_PATH;
    };
    LocalesManager.prototype.setDesktopApiAvailable = function(isApiAvailable) {
        this._isDesktopAvailable = isApiAvailable;
    };
    LocalesManager.prototype.setRestApiAvailable = function(isApiAvailable) {
        this._isOnlineAvailable = isApiAvailable;
    };
    function SettingsPage(router, displayNoneClass) {
        this._router = router;
        this._displayNoneClass = displayNoneClass;
        this._openSettingsBtn = new Button("settingsBtn", {
            variant: "icon-only",
            size: "small"
        });
        this._saveBtn = new Button("saveSettingsBtn", {
            variant: "primary"
        });
        this._cancelBtn = new Button("cancelBtn", {
            variant: "secondary"
        });
        this._styleSelect = new SelectBox("styleSelectList", {
            placeholder: "Enter style name"
        });
        this._styleSelectListOther = new SelectBox("styleSelectedListOther", {
            placeholder: "Enter style name",
            searchable: true
        });
        this._notesStyleWrapper = document.getElementById("notesStyle");
        if (!this._notesStyleWrapper) {
            throw new Error("notesStyleWrapper not found");
        }
        this._footNotes = new Radio("footNotes", {
            label: "Footnotes"
        });
        this._endNotes = new Radio("endNotes", {
            label: "Endnotes"
        });
        this._cslFileInput = document.getElementById("cslFileInput");
        if (!this._cslFileInput) {
            throw new Error("cslFileInput not found");
        }
        this._languageSelect = new SelectBox("styleLangList", {
            placeholder: "Select language"
        });
        this._cslStylesManager = new CslStylesManager;
        this._localesManager = new LocalesManager;
        this._selectLists = [];
        this._onChangeState = function(settings) {};
        this._styleMessage = new Message("styleMessage", {
            type: "error"
        });
        this._langMessage = new Message("langMessage", {
            type: "error"
        });
        this._LANGUAGES = [ [ "af-ZA", "Afrikaans" ], [ "ar", "Arabic" ], [ "bg-BG", "Bulgarian" ], [ "ca-AD", "Catalan" ], [ "cs-CZ", "Czech" ], [ "cy-GB", "Welsh" ], [ "da-DK", "Danish" ], [ "de-AT", "German (Austria)" ], [ "de-CH", "German (Switzerland)" ], [ "de-DE", "German (Germany)" ], [ "el-GR", "Greek" ], [ "en-GB", "English (UK)" ], [ "en-US", "English (US)" ], [ "es-CL", "Spanish (Chile)" ], [ "es-ES", "Spanish (Spain)" ], [ "es-MX", "Spanish (Mexico)" ], [ "et-EE", "Estonian" ], [ "eu", "Basque" ], [ "fa-IR", "Persian" ], [ "fi-FI", "Finnish" ], [ "fr-CA", "French (Canada)" ], [ "fr-FR", "French (France)" ], [ "he-IL", "Hebrew" ], [ "hr-HR", "Croatian" ], [ "hu-HU", "Hungarian" ], [ "id-ID", "Indonesian" ], [ "is-IS", "Icelandic" ], [ "it-IT", "Italian" ], [ "ja-JP", "Japanese" ], [ "km-KH", "Khmer" ], [ "ko-KR", "Korean" ], [ "la", "Latin" ], [ "lt-LT", "Lithuanian" ], [ "lv-LV", "Latvian" ], [ "mn-MN", "Mongolian" ], [ "nb-NO", "Norwegian (Bokmål)" ], [ "nl-NL", "Dutch" ], [ "nn-NO", "Norwegian (Nynorsk)" ], [ "pl-PL", "Polish" ], [ "pt-BR", "Portuguese (Brazil)" ], [ "pt-PT", "Portuguese (Portugal)" ], [ "ro-RO", "Romanian" ], [ "ru-RU", "Russian" ], [ "sk-SK", "Slovak" ], [ "sl-SI", "Slovenian" ], [ "sr-RS", "Serbian" ], [ "sv-SE", "Swedish" ], [ "th-TH", "Thai" ], [ "tr-TR", "Turkish" ], [ "uk-UA", "Ukrainian" ], [ "vi-VN", "Vietnamese" ], [ "zh-CN", "Chinese (PRC)" ], [ "zh-TW", "Chinese (Taiwan)" ] ];
        this._bNumFormat = false;
        this._stateSettings = {
            style: "",
            notesStyle: "footnotes",
            styleFormat: "numeric"
        };
    }
    SettingsPage.prototype.getLocalesManager = function() {
        return this._localesManager;
    };
    SettingsPage.prototype.getStyleManager = function() {
        return this._cslStylesManager;
    };
    SettingsPage.prototype.getLocale = function() {
        return this._localesManager.getLocale();
    };
    SettingsPage.prototype.getLastUsedStyleId = function() {
        return this._cslStylesManager.getLastUsedStyleId();
    };
    SettingsPage.prototype.init = function() {
        var lastStyle = this._cslStylesManager.getLastUsedStyleId() || "ieee";
        var savedLang = this._localesManager.getLastUsedLanguage();
        this._addEventListeners();
        this._languageSelect.addItems(this._LANGUAGES, savedLang);
        var promises = [ this._onStyleChange(lastStyle), this._localesManager.loadLocale(savedLang), this._loadStyles() ];
        return Promise.all(promises);
    };
    SettingsPage.prototype.onChangeState = function(callbackFn) {
        this._onChangeState = callbackFn;
    };
    SettingsPage.prototype.setDesktopApiAvailable = function(isAvailable) {
        this._localesManager.setDesktopApiAvailable(isAvailable);
        this._cslStylesManager.setDesktopApiAvailable(isAvailable);
    };
    SettingsPage.prototype.setRestApiAvailable = function(isAvailable) {
        this._localesManager.setRestApiAvailable(isAvailable);
        this._cslStylesManager.setRestApiAvailable(isAvailable);
    };
    SettingsPage.prototype._addEventListeners = function() {
        var self = this;
        this._openSettingsBtn.subscribe(function(event) {
            if (event.type !== "button:click") {
                return;
            }
            self._show();
        });
        this._saveBtn.subscribe(function(event) {
            if (event.type !== "button:click") {
                return;
            }
            var selectedLang = self._languageSelect.getSelectedValue();
            if (selectedLang === null) {
                console.error("No language selected");
                return;
            }
            var promises = [];
            if (self._stateSettings.language !== selectedLang) {
                self._localesManager.saveLastUsedLanguage(selectedLang);
                promises.push(self._localesManager.loadLocale(selectedLang).catch(function(err) {
                    console.error(err);
                    self._langMessage.show(translate("Failed to load language"));
                    throw err;
                }));
            }
            var noteValue = "footnotes";
            if (self._endNotes.getState().checked) {
                noteValue = "endnotes";
            }
            if (self._stateSettings.notesStyle !== noteValue) {
                self._cslStylesManager.saveLastUsedNotesStyle(noteValue);
            }
            var selectedStyleId = self._styleSelect.getSelectedValue();
            if (self._stateSettings.style !== selectedStyleId && selectedStyleId !== null) {
                promises.push(self._onStyleChange(selectedStyleId));
            }
            if (promises.length) {
                self._showLoader();
                Promise.all(promises).then(function() {
                    self._hide();
                    self._hideLoader();
                    self._onChangeState({
                        language: selectedLang,
                        style: selectedStyleId || "ieee",
                        notesStyle: noteValue,
                        styleFormat: self._cslStylesManager.getLastUsedFormat()
                    });
                }).catch(function(err) {
                    self._hideLoader();
                });
            } else {
                self._hide();
            }
        });
        this._cancelBtn.subscribe(function(event) {
            if (event.type !== "button:click") {
                return;
            }
            var selectedLang = self._languageSelect.getSelectedValue();
            var selectedStyleId = self._styleSelect.getSelectedValue();
            if (selectedLang !== null && self._localesManager.getLastUsedLanguage() !== selectedLang) {
                self._languageSelect.selectItems(self._localesManager.getLastUsedLanguage(), true);
            }
            if (self._stateSettings.style !== selectedStyleId && selectedStyleId !== null) {
                self._styleSelect.selectItems(self._stateSettings.style, true);
                self._styleSelectListOther.selectItems(self._stateSettings.style, true);
                self._onStyleChange(self._stateSettings.style, true).then(function() {
                    self._hide();
                });
            } else {
                self._hide();
            }
        });
        this._cslFileInput.onchange = function(e) {
            if (!(e.target instanceof HTMLInputElement)) return;
            var target = e.target;
            if (!target.files) return;
            var file = target.files[0];
            if (!file) {
                console.error("No file selected");
                return;
            }
            self._cslStylesManager.addCustomStyle(file).then(function(styleValue) {
                self._addStylesToList([ styleValue ]);
            }).catch(function(error) {
                console.error(error);
                self._styleMessage.show(translate("Invalid CSL style file"));
            }).finally(function() {
                self._hideLoader();
            });
        };
        this._styleSelect.subscribe(function(event) {
            if (event.type === "selectbox:change") {
                self._styleSelectListOther.selectItems(event.detail.current.toString(), true);
                self._somethingWasChanged();
                self._onStyleChange(event.detail.current.toString(), true);
                return;
            } else if (event.type !== "selectbox:custom") {
                return;
            }
            var actionId = event.detail.current;
            if (actionId === "more_styles") {
                self._styleSelectListOther.openDropdown();
            }
        });
        self._styleSelectListOther.subscribe(function(event) {
            if (event.type !== "selectbox:change") {
                return;
            }
            if (!event.detail.items) return;
            var item = event.detail.items[0];
            self._styleSelect.addItem(item.value, item.text, true);
            self._somethingWasChanged();
            self._onStyleChange(item.value, true);
        });
        this._languageSelect.subscribe(function(event) {
            if (event.type !== "selectbox:change") {
                return;
            }
            self._somethingWasChanged();
        });
        this._footNotes.subscribe(function(event) {
            self._somethingWasChanged();
        });
        this._endNotes.subscribe(function(event) {
            self._somethingWasChanged();
        });
    };
    SettingsPage.prototype._hideAllMessages = function() {
        this._langMessage.close();
        this._styleMessage.close();
    };
    SettingsPage.prototype._hide = function() {
        this._router.openMain();
    };
    SettingsPage.prototype._show = function() {
        this._stateSettings = {
            language: this._localesManager.getLastUsedLanguage(),
            style: this._cslStylesManager.getLastUsedStyleIdOrDefault(),
            notesStyle: this._cslStylesManager.getLastUsedNotesStyle(),
            styleFormat: this._cslStylesManager.getLastUsedFormat()
        };
        this._saveBtn.disable();
        this._router.openSettings();
        if (this._stateSettings.notesStyle === this._endNotes.getState().value) {
            this._endNotes.check();
        } else {
            this._footNotes.check();
        }
    };
    SettingsPage.prototype._loadStyles = function() {
        var self = this;
        return this._cslStylesManager.getStylesInfo().then(function(stylesInfo) {
            self._addStylesToList(stylesInfo);
            self._styleSelect.addCustomItem("more_styles", "More Styles...");
            self._styleSelect.addCustomItem("cslFileInput", "Add custom style...");
        }).catch(function(err) {
            console.error(err);
        });
    };
    SettingsPage.prototype._addStylesToList = function(stylesInfo) {
        var self = this;
        var lastStyle = this._cslStylesManager.getLastUsedStyleIdOrDefault();
        var allStyles = stylesInfo.map(function(style) {
            return [ style.name, style.title ];
        });
        var mainStyles = allStyles.filter(function(style) {
            if (style[0] == lastStyle) return true;
            if (self._cslStylesManager.isStyleDefault(style[0])) return true;
            return false;
        });
        this._styleSelect.addItems(mainStyles, lastStyle);
        this._styleSelectListOther.addItems(allStyles, lastStyle);
    };
    SettingsPage.prototype._somethingWasChanged = function() {
        this._saveBtn.enable();
    };
    SettingsPage.prototype._onStyleChange = function(styleName, isClick) {
        var self = this;
        isClick && self._showLoader();
        return self._cslStylesManager.getStyle(styleName, !isClick).then(function(styleInfo) {
            var styleFormat = styleInfo.styleFormat;
            self._bNumFormat = styleFormat == "numeric";
            if ("note" === styleFormat) {
                self._notesStyleWrapper.classList.remove(self._displayNoneClass);
            } else {
                self._notesStyleWrapper.classList.add(self._displayNoneClass);
            }
            isClick && self._hideLoader();
        }).catch(function(err) {
            console.error(err);
            if (typeof err === "string") {
                self._styleMessage.show(translate(err));
            }
            isClick && self._hideLoader();
        });
    };
    SettingsPage.prototype._showLoader = function() {
        this._cancelBtn.disable();
        this._saveBtn.disable();
        this._styleSelect.disable();
        this._languageSelect.disable();
    };
    SettingsPage.prototype._hideLoader = function() {
        this._cancelBtn.enable();
        this._saveBtn.enable();
        this._styleSelect.enable();
        this._languageSelect.enable();
    };
    function LoginPage(router, sdk) {
        this._router = router;
        this._sdk = sdk;
        this._apiKeyLoginField = new InputField("apiKeyField", {
            autofocus: true,
            autocomplete: "on"
        });
        this._saveApiKeyBtn = new Button("saveApiKeyBtn", {
            disabled: true
        });
        this._apiKeyMessage = new Message("apiKeyMessage", {
            type: "error"
        });
        this._useDesktopMessage = new Message("useDesktopMessage", {
            type: "error"
        });
        this._connectToLocalZotero = new Button("connectToLocalZotero", {
            variant: "secondary"
        });
        this._useDesktopApp = document.getElementById("useDesktopApp");
        if (!this._useDesktopApp) {
            throw new Error("useDesktopApp not found");
        }
        this._logoutLink = document.getElementById("logoutLink");
        if (!this._logoutLink) {
            throw new Error("logoutLink not found");
        }
        this._onAuthorized = function(e) {};
        this._onChangeState = function(e) {};
        this._onOpen = function() {};
    }
    LoginPage.prototype.init = function() {
        var self = this;
        this._addEventListeners();
        var hasFirstAnswer = false;
        var onlineZoteroElements = document.querySelectorAll(".for-zotero-online");
        var apisChecker = ZoteroApiChecker.runApisChecker(self._sdk);
        apisChecker.subscribe(function(apis) {
            self._onChangeState(apis);
            if (!hasFirstAnswer) {
                hasFirstAnswer = true;
                if (!apis.desktopVersion && self._useDesktopApp) {
                    self._useDesktopApp.classList.add("hidden");
                }
                self._onOpen();
                self._show();
            }
            if (apis.online) {
                onlineZoteroElements.forEach(function(element) {
                    element.classList.remove("hidden");
                });
            } else {
                onlineZoteroElements.forEach(function(element) {
                    element.classList.add("hidden");
                });
            }
            if (apis.online && apis.hasKey) {
                self._sdk.setIsOnlineAvailable(true);
                self._hide(true);
                self._onAuthorized(apis);
                return;
            } else if (apis.desktop && apis.hasPermission) {
                self._sdk.setIsOnlineAvailable(false);
                self._hide();
                self._hideAllMessages();
                self._onAuthorized(apis);
                return;
            }
        });
        var triggers = {
            onOpen: function onOpen(callbackFn) {
                self._onOpen = callbackFn;
                return triggers;
            },
            onChangeState: function onChangeState(callbackFn) {
                self._onChangeState = callbackFn;
                return triggers;
            },
            onAuthorized: function onAuthorized(callbackFn) {
                self._onAuthorized = callbackFn;
                return triggers;
            }
        };
        return triggers;
    };
    LoginPage.prototype._addEventListeners = function() {
        var self = this;
        this._apiKeyLoginField.subscribe(function(event) {
            if (event.type !== "inputfield:submit") ;
            if (event.type === "inputfield:input") {
                if (self._apiKeyLoginField.getValue()) {
                    self._saveApiKeyBtn.enable();
                } else {
                    self._saveApiKeyBtn.disable();
                }
            }
        });
        this._saveApiKeyBtn.subscribe(function(event) {
            if (event.type !== "button:click") {
                return;
            }
            self._tryToApplyKey();
        });
        this._connectToLocalZotero.subscribe(function(event) {
            if (event.type !== "button:click") {
                return;
            }
            self._showLoader();
            ZoteroApiChecker.checkStatus(self._sdk).then(function(apis) {
                if (apis.desktop && apis.hasPermission) {
                    self._sdk.setIsOnlineAvailable(false);
                    self._hide();
                    self._hideAllMessages();
                } else if (apis.desktop && !apis.hasPermission) {
                    var errorMessage = "Connection to Zotero failed. " + "Please enable external connections in Zotero: " + 'Edit → Settings → Advanced → Check "Allow other ' + 'applications on this computer to communicate with Zotero"';
                    self._useDesktopMessage.show(translate(errorMessage));
                } else if (!apis.desktop) {
                    self._useDesktopMessage.show(translate("Connection to Zotero failed. Make sure Zotero is running."));
                }
            }).finally(function() {
                self._hideLoader();
            });
        });
        this._logoutLink.onclick = function(e) {
            self._sdk.clearSettings();
            self._show();
            return true;
        };
    };
    LoginPage.prototype._tryToApplyKey = function() {
        var self = this;
        var apiKey = self._apiKeyLoginField.getValue();
        if (apiKey) {
            self._showLoader();
            self._sdk.setApiKey(apiKey).then(function() {
                ZoteroApiChecker.successfullyLoggedInUsingApiKey();
                self._hide(true);
            }).catch(function(err) {
                console.error(err);
                self._apiKeyMessage.show(translate("Invalid API key"));
            }).finally(function() {
                self._hideLoader();
            });
        }
    };
    LoginPage.prototype._hideAllMessages = function() {
        this._apiKeyMessage.close();
    };
    LoginPage.prototype._hide = function(bShowLogoutLink) {
        this._router.openMain();
        if (bShowLogoutLink) {
            this._logoutLink.classList.remove("hidden");
        }
    };
    LoginPage.prototype._show = function() {
        this._router.openLogin();
        this._logoutLink.classList.add("hidden");
    };
    LoginPage.prototype._showLoader = function() {
        this._saveApiKeyBtn.disable();
        this._connectToLocalZotero.disable();
        this._apiKeyLoginField.disable();
    };
    LoginPage.prototype._hideLoader = function() {
        this._saveApiKeyBtn.enable();
        this._connectToLocalZotero.enable();
        this._apiKeyLoginField.enable();
    };
    (function() {
        var displayNoneClass = "hidden";
        var router;
        var sdk;
        var settings;
        var citationService;
        var lastSearch = {
            text: "",
            obj: null,
            groups: [],
            groupsHash: ""
        };
        var searchFilter;
        var selectCitation;
        var saveAsTextBtn;
        var insertLinkBtn;
        var insertBibBtn;
        var refreshBtn;
        var libLoader = new Loader("libLoader", translate("Loading..."));
        var elements = {};
        function initElements() {
            var error = document.getElementById("errorWrapper");
            if (!error) {
                throw new Error("errorWrapper not found");
            }
            var mainState = document.getElementById("mainState");
            if (!mainState) {
                throw new Error("mainState not found");
            }
            searchFilter = new SearchFilterComponents;
            selectCitation = new SelectCitationsComponent(displayNoneClass, loadMore, shouldLoadMore);
            saveAsTextBtn = new Button("saveAsTextBtn", {
                variant: "secondary"
            });
            insertLinkBtn = new Button("insertLinkBtn", {
                disabled: true
            });
            insertBibBtn = new Button("insertBibBtn", {
                variant: "secondary"
            });
            refreshBtn = new Button("refreshBtn", {
                variant: "secondary"
            });
            elements = {
                error: error,
                mainState: mainState
            };
        }
        window.Asc.plugin.init = function() {
            Loader.show();
            initElements();
            router = new Router;
            sdk = new ZoteroSdk;
            var loginPage = new LoginPage(router, sdk);
            settings = new SettingsPage(router, displayNoneClass);
            citationService = new CitationService(settings.getLocalesManager(), settings.getStyleManager(), sdk);
            var isInit = false;
            addEventListeners();
            loginPage.init().onOpen(function() {
                Loader.hide();
            }).onChangeState(function(apis) {
                settings.setDesktopApiAvailable(apis.desktop);
                settings.setRestApiAvailable(apis.online);
            }).onAuthorized(function(apis) {
                if (isInit) return;
                isInit = true;
                Loader.show();
                Promise.all([ loadGroups(), settings.init() ]).then(function() {
                    Loader.hide();
                });
            });
            window.Asc.plugin.onTranslate = applyTranslations;
        };
        function loadGroups() {
            return sdk.getUserGroups().then(function(groups) {
                searchFilter.addGroups(groups);
            });
        }
        function addEventListeners() {
            selectCitation.subscribe(checkSelected);
            function searchFor(text, selectedGroups, groupsHash) {
                selectCitation.clearLibrary();
                var promises = [];
                return sdk.getUserGroups().then(function(userGroups) {
                    var groups = selectedGroups.filter(function(group) {
                        return group !== "my_library" && group !== "group_libraries";
                    });
                    if (selectedGroups.indexOf("my_library") !== -1) {
                        promises.push(loadLibrary(sdk.getItems(text), false));
                    }
                    for (var i = 0; i < groups.length; i++) {
                        promises.push(loadLibrary(sdk.getGroupItems(text, groups[i]), true));
                    }
                    lastSearch.text = text;
                    lastSearch.obj = null;
                    lastSearch.groups = [];
                    lastSearch.groupsHash = groupsHash;
                    return promises;
                });
            }
            searchFilter.subscribe(function(text, selectedGroups) {
                text = text.trim();
                var groupsHash = selectedGroups.join(",");
                if (elements.mainState.classList.contains(displayNoneClass) || !text || text == lastSearch.text && groupsHash === lastSearch.groupsHash || selectedGroups.length === 0) return;
                searchFor(text, selectedGroups, groupsHash).catch(function() {
                    return [];
                }).then(function(promises) {
                    if (promises.length) {
                        libLoader.show();
                        Promise.any(promises).then(function() {
                            libLoader.hide();
                        }).finally(function() {
                            libLoader.hide();
                        });
                    }
                    return Promise.allSettled(promises);
                }).then(function(numOfShownByLib) {
                    var numOfShown = 0;
                    numOfShownByLib.forEach(function(promise) {
                        if (promise.status === "fulfilled") {
                            numOfShown += promise.value;
                        }
                    });
                    if (numOfShown === 0) {
                        selectCitation.displayNothingFound();
                    }
                });
            });
            refreshBtn.subscribe(function(event) {
                if (event.type !== "button:click") {
                    return;
                }
                if (!settings.getLastUsedStyleId()) {
                    showError(translate("Style is not selected"));
                    return;
                }
                if (!settings.getLocale()) {
                    showError(translate("Language is not selected"));
                    return;
                }
                showLoader();
                citationService.updateCslItems(true, false).catch(function(error) {
                    console.error(error);
                    var message = translate("Failed to refresh");
                    if (typeof error === "string") {
                        message += ". " + translate(error);
                    }
                    showError(message);
                }).finally(function() {
                    hideLoader();
                });
            });
            insertBibBtn.subscribe(function(event) {
                if (event.type !== "button:click") {
                    return;
                }
                if (!settings.getLastUsedStyleId()) {
                    showError(translate("Style is not selected"));
                    return;
                }
                if (!settings.getLocale()) {
                    showError(translate("Language is not selected"));
                    return;
                }
                showLoader();
                citationService.updateCslItems(true, true).catch(function(error) {
                    console.error(error);
                    var message = translate("Failed to insert bibliography");
                    if (typeof error === "string") {
                        message += ". " + translate(error);
                    }
                    showError(message);
                }).finally(function() {
                    hideLoader();
                });
            });
            insertLinkBtn.subscribe(function(event) {
                if (event.type !== "button:click") {
                    return;
                }
                if (!settings.getLastUsedStyleId()) {
                    showError(translate("Style is not selected"));
                    return;
                }
                if (!settings.getLocale()) {
                    showError(translate("Language is not selected"));
                    return;
                }
                showLoader();
                citationService.updateCslItems(false, false).then(function() {
                    var items = selectCitation.getSelectedItems();
                    return citationService.insertSelectedCitations(items);
                }).then(function(keys) {
                    selectCitation.removeItems(keys);
                    return citationService.updateCslItems(true, false);
                }).catch(function(error) {
                    console.error(error);
                    var message = translate("Failed to insert citation");
                    if (typeof error === "string") {
                        message += ". " + translate(error);
                    }
                    showError(message);
                }).finally(function() {
                    hideLoader();
                });
            });
            saveAsTextBtn.subscribe(function(event) {
                if (event.type !== "button:click") {
                    return;
                }
                showLoader();
                citationService.saveAsText().then(function() {
                    hideLoader();
                });
            });
            settings.onChangeState(function(settings) {
                citationService.setNotesStyle(settings.notesStyle);
                citationService.setStyleFormat(settings.styleFormat);
                return citationService.updateCslItems(true, false);
            });
        }
        Asc.plugin.onThemeChanged = function(theme) {
            window.Asc.plugin.onThemeChangedBase(theme);
            Theme.fixThemeForIE(theme);
            Theme.addStylesForComponents(theme);
            var rules = "";
            rules += ".link, .link:visited, .link:hover { color : " + window.Asc.plugin.theme["text-normal"] + " !important;}\n";
            rules += ".doc { border-color: " + theme["border-regular-control"] + "; background-color: " + theme["background-normal"] + "; }\n";
            rules += ".scrollThumb { box-shadow: 0 0 8px 8px " + theme["highlight-button-hover"] + " inset; }\n";
            rules += ".scrollThumb:active, .scrollThumb.scrolling { box-shadow: 0 0 8px 8px " + theme["canvas-scroll-thumb-pressed"] + " inset; }\n";
            rules += ".scrollThumb:hover { box-shadow: 0 0 8px 8px " + theme["canvas-scroll-thumb-hover"] + " inset; }\n";
            if ([ "theme-white", "theme-night" ].indexOf(theme.name) !== -1 || [ "theme-white", "theme-night" ].indexOf(theme.Name) !== -1) {
                rules += ".doc { border-radius: 4px; }\n";
            }
            var styleTheme = document.getElementById("pluginStyles");
            if (!styleTheme) {
                styleTheme = document.createElement("style");
                styleTheme.id = "pluginStyles";
                styleTheme.innerHTML = rules;
                document.getElementsByTagName("head")[0].appendChild(styleTheme);
            } else {
                styleTheme.innerHTML = rules;
            }
            var themeType = theme.type || "light";
            var body = document.body;
            body.classList.remove("theme-dark");
            body.classList.remove("theme-light");
            body.classList.add("theme-" + themeType);
        };
        function applyTranslations() {
            var elements = document.getElementsByClassName("i18n");
            for (var i = 0; i < elements.length; i++) {
                var el = elements[i];
                if (el instanceof HTMLElement === false) continue;
                [ "placeholder", "title" ].forEach(function(attr) {
                    if (el.hasAttribute(attr)) {
                        el.setAttribute(attr, translate(el.getAttribute(attr) || ""));
                    }
                });
                var translated = translate(el.innerText.trim());
                if (translated) el.innerText = translated;
            }
        }
        function showError(message) {
            if (message && typeof message === "string") {
                translate("");
                switchClass(elements.error, displayNoneClass, false);
                elements.error.textContent = message;
                setTimeout(function() {
                    window.onclick = function() {
                        showError(false);
                    };
                }, 100);
            } else {
                switchClass(elements.error, displayNoneClass, true);
                elements.error.textContent = "";
                window.onclick = null;
            }
        }
        function showLoader() {
            insertBibBtn.disable();
            refreshBtn.disable();
            insertLinkBtn.disable();
        }
        function hideLoader() {
            insertBibBtn.enable();
            refreshBtn.enable();
            checkSelected();
        }
        function switchClass(el, className, add) {
            if (add) {
                el.classList.add(className);
            } else {
                el.classList.remove(className);
            }
        }
        function loadMore() {
            console.warn("Loading more...");
            if (lastSearch.obj && lastSearch.obj.next) {
                loadLibrary(lastSearch.obj.next(), false);
            }
            for (var i = 0; i < lastSearch.groups.length && lastSearch.groups[i].next; i++) {
                loadLibrary(sdk.getGroupItems(lastSearch.groups[i].next(), lastSearch.groups[i].id), true);
            }
        }
        function shouldLoadMore(holder) {
            if (router.getRoute() != "main") return false;
            if (holder.scrollTop + holder.clientHeight < holder.scrollHeight) {
                return false;
            }
            var flag = true;
            lastSearch.groups.forEach(function(el) {
                if (el.next) flag = false;
            });
            if (!lastSearch.obj || !lastSearch.obj.next || !flag) return false;
            if (!lastSearch.obj && !lastSearch.text.trim() && !lastSearch.groups.length) return false;
            return true;
        }
        function loadLibrary(promise, isGroup) {
            return promise.then(function(res) {
                return displaySearchItems(res, null, isGroup);
            }).catch(function(err) {
                console.error(err);
                if (err.message) {
                    showError(translate(err.message));
                }
                return displaySearchItems(null, err, isGroup);
            }).then(function(numOfShown) {
                return numOfShown;
            });
        }
        function displaySearchItems(res, err, isGroup) {
            var first = false;
            if (!lastSearch.obj && res && res.items && !res.items.length) first = true;
            if (err) {
                if (first) {
                    lastSearch.obj = null;
                    lastSearch.groups = [];
                }
                if (lastSearch && lastSearch.obj) {
                    delete lastSearch.obj.next;
                }
            } else {
                if (isGroup && res && res.next) lastSearch.groups.push(res); else lastSearch.obj = res && res.items.length ? res : null;
            }
            var fillUrisFromId = function fillUrisFromId(item) {
                var slashFirstIndex = item.id.indexOf("/") + 1;
                var slashLastIndex = item.id.lastIndexOf("/") + 1;
                var httpIndex = item.id.indexOf("http");
                if (slashFirstIndex !== slashLastIndex && httpIndex === 0) {
                    if (!item.uris) {
                        item.uris = [];
                    }
                    item.uris.push(item.id);
                }
                if (slashLastIndex) item.id = item.id.substring(slashLastIndex);
                return item;
            };
            if (res && res.items && res.items.length > 0) {
                for (var index = 0; index < res.items.length; index++) {
                    var item = res.items[index];
                    item[isGroup ? "groupID" : "userID"] = res.id;
                    fillUrisFromId(item);
                }
            }
            return selectCitation.displaySearchItems(res, err);
        }
        function checkSelected(numOfSelected) {
            if (typeof numOfSelected === "undefined") {
                numOfSelected = selectCitation.count();
            }
            if (numOfSelected <= 0) {
                insertLinkBtn.disable();
                insertLinkBtn.setText(translate("Insert Citation"));
            } else {
                insertLinkBtn.enable();
                if (numOfSelected > 1) {
                    insertLinkBtn.setText(translate("Insert " + numOfSelected + " Citations"));
                } else {
                    insertLinkBtn.setText(translate("Insert Citation"));
                }
            }
        }
    })();
});
//# sourceMappingURL=bundle.es5.js.map
