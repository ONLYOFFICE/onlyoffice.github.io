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
    function _arrayWithoutHoles(r) {
        if (Array.isArray(r)) return _arrayLikeToArray(r);
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
    function _defineProperty(e, r, t) {
        return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: true,
            configurable: true,
            writable: true
        }) : e[r] = t, e;
    }
    function _iterableToArray(r) {
        if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
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
    function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
    function _slicedToArray(r, e) {
        return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }
    function _toConsumableArray(r) {
        return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
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
    var toIndexedObject$2 = require("../internals/to-indexed-object");
    var addToUnscopables$2 = require("../internals/add-to-unscopables");
    var Iterators = require("../internals/iterators");
    var InternalStateModule$1 = require("../internals/internal-state");
    var defineProperty = require("../internals/object-define-property").f;
    var defineIterator$1 = require("../internals/iterator-define");
    var createIterResultObject$1 = require("../internals/create-iter-result-object");
    var IS_PURE = require("../internals/is-pure");
    var DESCRIPTORS = require("../internals/descriptors");
    var ARRAY_ITERATOR = "Array Iterator";
    var setInternalState$1 = InternalStateModule$1.set;
    var getInternalState$1 = InternalStateModule$1.getterFor(ARRAY_ITERATOR);
    module.exports = defineIterator$1(Array, "Array", function(iterated, kind) {
        setInternalState$1(this, {
            type: ARRAY_ITERATOR,
            target: toIndexedObject$2(iterated),
            index: 0,
            kind: kind
        });
    }, function() {
        var state = getInternalState$1(this);
        var target = state.target;
        var index = state.index++;
        if (!target || index >= target.length) {
            state.target = null;
            return createIterResultObject$1(undefined, true);
        }
        switch (state.kind) {
          case "keys":
            return createIterResultObject$1(index, false);

          case "values":
            return createIterResultObject$1(target[index], false);
        }
        return createIterResultObject$1([ index, target[index] ], false);
    }, "values");
    var values = Iterators.Arguments = Iterators.Array;
    addToUnscopables$2("keys");
    addToUnscopables$2("values");
    addToUnscopables$2("entries");
    if (!IS_PURE && DESCRIPTORS && values.name !== "values") try {
        defineProperty(values, "name", {
            value: "values"
        });
    } catch (error) {}
    var $$9 = require("../internals/export");
    var $map = require("../internals/array-iteration").map;
    var arrayMethodHasSpeciesSupport$3 = require("../internals/array-method-has-species-support");
    var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3("map");
    $$9({
        target: "Array",
        proto: true,
        forced: !HAS_SPECIES_SUPPORT$2
    }, {
        map: function map(callbackfn) {
            return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        }
    });
    require("../modules/es.map.constructor");
    var TO_STRING_TAG_SUPPORT = require("../internals/to-string-tag-support");
    var defineBuiltIn = require("../internals/define-built-in");
    var toString$4 = require("../internals/object-to-string");
    if (!TO_STRING_TAG_SUPPORT) {
        defineBuiltIn(Object.prototype, "toString", toString$4, {
            unsafe: true
        });
    }
    require("../modules/es.promise.constructor");
    require("../modules/es.promise.all");
    require("../modules/es.promise.catch");
    require("../modules/es.promise.race");
    require("../modules/es.promise.reject");
    require("../modules/es.promise.resolve");
    var charAt = require("../internals/string-multibyte").charAt;
    var toString$3 = require("../internals/to-string");
    var InternalStateModule = require("../internals/internal-state");
    var defineIterator = require("../internals/iterator-define");
    var createIterResultObject = require("../internals/create-iter-result-object");
    var STRING_ITERATOR = "String Iterator";
    var setInternalState = InternalStateModule.set;
    var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
    defineIterator(String, "String", function(iterated) {
        setInternalState(this, {
            type: STRING_ITERATOR,
            string: toString$3(iterated),
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
    require("../modules/es.weak-map.constructor");
    var globalThis$1 = require("../internals/global-this");
    var DOMIterables$1 = require("../internals/dom-iterables");
    var DOMTokenListPrototype$1 = require("../internals/dom-token-list-prototype");
    var ArrayIteratorMethods = require("../modules/es.array.iterator");
    var createNonEnumerableProperty$1 = require("../internals/create-non-enumerable-property");
    var setToStringTag = require("../internals/set-to-string-tag");
    var wellKnownSymbol$3 = require("../internals/well-known-symbol");
    var ITERATOR = wellKnownSymbol$3("iterator");
    var ArrayValues = ArrayIteratorMethods.values;
    var handlePrototype$1 = function(CollectionPrototype, COLLECTION_NAME) {
        if (CollectionPrototype) {
            if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
                createNonEnumerableProperty$1(CollectionPrototype, ITERATOR, ArrayValues);
            } catch (error) {
                CollectionPrototype[ITERATOR] = ArrayValues;
            }
            setToStringTag(CollectionPrototype, COLLECTION_NAME, true);
            if (DOMIterables$1[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
                if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
                    createNonEnumerableProperty$1(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
                } catch (error) {
                    CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
                }
            }
        }
    };
    for (var COLLECTION_NAME$1 in DOMIterables$1) {
        handlePrototype$1(globalThis$1[COLLECTION_NAME$1] && globalThis$1[COLLECTION_NAME$1].prototype, COLLECTION_NAME$1);
    }
    handlePrototype$1(DOMTokenListPrototype$1, "DOMTokenList");
    var $$8 = require("../internals/export");
    var fill = require("../internals/array-fill");
    var addToUnscopables$1 = require("../internals/add-to-unscopables");
    $$8({
        target: "Array",
        proto: true
    }, {
        fill: fill
    });
    addToUnscopables$1("fill");
    var globalThis = require("../internals/global-this");
    var DOMIterables = require("../internals/dom-iterables");
    var DOMTokenListPrototype = require("../internals/dom-token-list-prototype");
    var forEach = require("../internals/array-for-each");
    var createNonEnumerableProperty = require("../internals/create-non-enumerable-property");
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
    var $$7 = require("../internals/export");
    var fails$3 = require("../internals/fails");
    var isArray$1 = require("../internals/is-array");
    var isObject$3 = require("../internals/is-object");
    var toObject = require("../internals/to-object");
    var lengthOfArrayLike$1 = require("../internals/length-of-array-like");
    var doesNotExceedSafeInteger = require("../internals/does-not-exceed-safe-integer");
    var createProperty$1 = require("../internals/create-property");
    var arraySpeciesCreate = require("../internals/array-species-create");
    var arrayMethodHasSpeciesSupport$2 = require("../internals/array-method-has-species-support");
    var wellKnownSymbol$2 = require("../internals/well-known-symbol");
    var V8_VERSION = require("../internals/environment-v8-version");
    var IS_CONCAT_SPREADABLE = wellKnownSymbol$2("isConcatSpreadable");
    var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$3(function() {
        var array = [];
        array[IS_CONCAT_SPREADABLE] = false;
        return array.concat()[0] !== array;
    });
    var isConcatSpreadable = function(O) {
        if (!isObject$3(O)) return false;
        var spreadable = O[IS_CONCAT_SPREADABLE];
        return spreadable !== undefined ? !!spreadable : isArray$1(O);
    };
    var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport$2("concat");
    $$7({
        target: "Array",
        proto: true,
        arity: 1,
        forced: FORCED$1
    }, {
        concat: function concat(arg) {
            var O = toObject(this);
            var A = arraySpeciesCreate(O, 0);
            var n = 0;
            var i, k, length, len, E;
            for (i = -1, length = arguments.length; i < length; i++) {
                E = i === -1 ? O : arguments[i];
                if (isConcatSpreadable(E)) {
                    len = lengthOfArrayLike$1(E);
                    doesNotExceedSafeInteger(n + len);
                    for (k = 0; k < len; k++, n++) if (k in E) createProperty$1(A, n, E[k]);
                } else {
                    doesNotExceedSafeInteger(n + 1);
                    createProperty$1(A, n++, E);
                }
            }
            A.length = n;
            return A;
        }
    });
    var $$6 = require("../internals/export");
    var $filter = require("../internals/array-iteration").filter;
    var arrayMethodHasSpeciesSupport$1 = require("../internals/array-method-has-species-support");
    var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1("filter");
    $$6({
        target: "Array",
        proto: true,
        forced: !HAS_SPECIES_SUPPORT$1
    }, {
        filter: function filter(callbackfn) {
            return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        }
    });
    var $$5 = require("../internals/export");
    var uncurryThis$3 = require("../internals/function-uncurry-this");
    var IndexedObject = require("../internals/indexed-object");
    var toIndexedObject$1 = require("../internals/to-indexed-object");
    var arrayMethodIsStrict = require("../internals/array-method-is-strict");
    var nativeJoin = uncurryThis$3([].join);
    var ES3_STRINGS = IndexedObject !== Object;
    var FORCED = ES3_STRINGS || !arrayMethodIsStrict("join", ",");
    $$5({
        target: "Array",
        proto: true,
        forced: FORCED
    }, {
        join: function join(separator) {
            return nativeJoin(toIndexedObject$1(this), separator === undefined ? "," : separator);
        }
    });
    var $$4 = require("../internals/export");
    var $trim = require("../internals/string-trim").trim;
    var forcedStringTrimMethod = require("../internals/string-trim-forced");
    $$4({
        target: "String",
        proto: true,
        forced: forcedStringTrimMethod("trim")
    }, {
        trim: function trim() {
            return $trim(this);
        }
    });
    var $$3 = require("../internals/export");
    var exec = require("../internals/regexp-exec");
    $$3({
        target: "RegExp",
        proto: true,
        forced: /./.exec !== exec
    }, {
        exec: exec
    });
    var apply = require("../internals/function-apply");
    var call$1 = require("../internals/function-call");
    var uncurryThis$2 = require("../internals/function-uncurry-this");
    var fixRegExpWellKnownSymbolLogic$1 = require("../internals/fix-regexp-well-known-symbol-logic");
    var fails$2 = require("../internals/fails");
    var anObject$1 = require("../internals/an-object");
    var isCallable = require("../internals/is-callable");
    var isObject$2 = require("../internals/is-object");
    var toIntegerOrInfinity = require("../internals/to-integer-or-infinity");
    var toLength$1 = require("../internals/to-length");
    var toString$2 = require("../internals/to-string");
    var requireObjectCoercible$2 = require("../internals/require-object-coercible");
    var advanceStringIndex$1 = require("../internals/advance-string-index");
    var getMethod$1 = require("../internals/get-method");
    var getSubstitution = require("../internals/get-substitution");
    var getRegExpFlags = require("../internals/regexp-get-flags");
    var regExpExec$1 = require("../internals/regexp-exec-abstract");
    var wellKnownSymbol$1 = require("../internals/well-known-symbol");
    var REPLACE = wellKnownSymbol$1("replace");
    var max$1 = Math.max;
    var min$1 = Math.min;
    var concat = uncurryThis$2([].concat);
    var push$1 = uncurryThis$2([].push);
    var stringIndexOf$1 = uncurryThis$2("".indexOf);
    var stringSlice$1 = uncurryThis$2("".slice);
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
    var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$2(function() {
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
    fixRegExpWellKnownSymbolLogic$1("replace", function(_, nativeReplace, maybeCallNative) {
        var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
        return [ function replace(searchValue, replaceValue) {
            var O = requireObjectCoercible$2(this);
            var replacer = isObject$2(searchValue) ? getMethod$1(searchValue, REPLACE) : undefined;
            return replacer ? call$1(replacer, searchValue, O, replaceValue) : call$1(nativeReplace, toString$2(O), searchValue, replaceValue);
        }, function(string, replaceValue) {
            var rx = anObject$1(this);
            var S = toString$2(string);
            if (typeof replaceValue == "string" && stringIndexOf$1(replaceValue, UNSAFE_SUBSTITUTE) === -1 && stringIndexOf$1(replaceValue, "$<") === -1) {
                var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
                if (res.done) return res.value;
            }
            var functionalReplace = isCallable(replaceValue);
            if (!functionalReplace) replaceValue = toString$2(replaceValue);
            var flags = toString$2(getRegExpFlags(rx));
            var global = stringIndexOf$1(flags, "g") !== -1;
            var fullUnicode;
            if (global) {
                fullUnicode = stringIndexOf$1(flags, "u") !== -1;
                rx.lastIndex = 0;
            }
            var results = [];
            var result;
            while (true) {
                result = regExpExec$1(rx, S);
                if (result === null) break;
                push$1(results, result);
                if (!global) break;
                var matchStr = toString$2(result[0]);
                if (matchStr === "") rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
            }
            var accumulatedResult = "";
            var nextSourcePosition = 0;
            for (var i = 0; i < results.length; i++) {
                result = results[i];
                var matched = toString$2(result[0]);
                var position = max$1(min$1(toIntegerOrInfinity(result.index), S.length), 0);
                var captures = [];
                var replacement;
                for (var j = 1; j < result.length; j++) push$1(captures, maybeToString(result[j]));
                var namedCaptures = result.groups;
                if (functionalReplace) {
                    var replacerArgs = concat([ matched ], captures, position, S);
                    if (namedCaptures !== undefined) push$1(replacerArgs, namedCaptures);
                    replacement = toString$2(apply(replaceValue, undefined, replacerArgs));
                } else {
                    replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
                }
                if (position >= nextSourcePosition) {
                    accumulatedResult += stringSlice$1(S, nextSourcePosition, position) + replacement;
                    nextSourcePosition = position + matched.length;
                }
            }
            return accumulatedResult + stringSlice$1(S, nextSourcePosition);
        } ];
    }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);
    var call = require("../internals/function-call");
    var uncurryThis$1 = require("../internals/function-uncurry-this");
    var fixRegExpWellKnownSymbolLogic = require("../internals/fix-regexp-well-known-symbol-logic");
    var anObject = require("../internals/an-object");
    var isObject$1 = require("../internals/is-object");
    var requireObjectCoercible$1 = require("../internals/require-object-coercible");
    var speciesConstructor = require("../internals/species-constructor");
    var advanceStringIndex = require("../internals/advance-string-index");
    var toLength = require("../internals/to-length");
    var toString$1 = require("../internals/to-string");
    var getMethod = require("../internals/get-method");
    var regExpExec = require("../internals/regexp-exec-abstract");
    var stickyHelpers = require("../internals/regexp-sticky-helpers");
    var fails$1 = require("../internals/fails");
    var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
    var MAX_UINT32 = 4294967295;
    var min = Math.min;
    var push = uncurryThis$1([].push);
    var stringSlice = uncurryThis$1("".slice);
    var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$1(function() {
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
            var O = requireObjectCoercible$1(this);
            var splitter = isObject$1(separator) ? getMethod(separator, SPLIT) : undefined;
            return splitter ? call(splitter, separator, O, limit) : call(internalSplit, toString$1(O), separator, limit);
        }, function(string, limit) {
            var rx = anObject(this);
            var S = toString$1(string);
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
    require("../modules/es.weak-set.constructor");
    require("../modules/es.string.replace-all");
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
    var environment = {
        faSvgSpritesPath: "./resources/font-awesome/sprites-full/",
        faSvgPath: "./resources/font-awesome/svgs-full/"
    };
    var SvgLoader = function() {
        function SvgLoader() {
            _classCallCheck(this, SvgLoader);
        }
        return _createClass(SvgLoader, null, [ {
            key: "loadSprites",
            value: function loadSprites() {
                return Promise.all([ _assertClassBrand(SvgLoader, this, _loadSprite).call(this, "regular"), _assertClassBrand(SvgLoader, this, _loadSprite).call(this, "solid"), _assertClassBrand(SvgLoader, this, _loadSprite).call(this, "brands") ]);
            }
        }, {
            key: "loadSvgs",
            value: function loadSvgs(selectedIcons) {
                var _this = this;
                var concurrency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
                var numOfImages = selectedIcons.size;
                if (numOfImages < concurrency) concurrency = numOfImages;
                var results = new Array(numOfImages);
                var arrayOfIcons = _toConsumableArray(selectedIcons);
                var threadPromises = _toConsumableArray(Array(concurrency)).map(_asyncToGenerator(_regenerator().m(function _callee() {
                    var index, item;
                    return _regenerator().w(function(_context) {
                        while (1) switch (_context.n) {
                          case 0:
                            if (!numOfImages) {
                                _context.n = 2;
                                break;
                            }
                            index = --numOfImages;
                            item = arrayOfIcons[index];
                            _context.n = 1;
                            return _assertClassBrand(SvgLoader, _this, _loadSvg).call(_this, item[1], item[0]);

                          case 1:
                            results[index] = _context.v;
                            _context.n = 0;
                            break;

                          case 2:
                            return _context.a(2);
                        }
                    }, _callee);
                })));
                return Promise.all(threadPromises).then(function() {
                    return results;
                });
            }
        } ]);
    }();
    function _loadSprite(spriteName) {
        return new Promise(function(resolve, reject) {
            var ajax = new XMLHttpRequest;
            ajax.open("GET", environment.faSvgSpritesPath + spriteName + ".svg", true);
            ajax.send();
            ajax.onload = function(e) {
                document.body.insertAdjacentHTML("beforeend", ajax.responseText);
                resolve();
            };
            ajax.onerror = function(e) {
                reject(e);
            };
        });
    }
    function _loadSvg(section, name) {
        return new Promise(function(resolve, reject) {
            var ajax = new XMLHttpRequest;
            ajax.open("GET", environment.faSvgPath + section + "/" + name + ".svg", true);
            ajax.send();
            ajax.onload = function(e) {
                resolve(ajax.responseText);
            };
            ajax.onerror = function(e) {
                reject(e);
            };
        });
    }
    require("../modules/es.set.constructor");
    var _container$1 = new WeakMap;
    var _onSelectIconCallback = new WeakMap;
    var _listOfIconNames = new WeakMap;
    var _selectedIcons$1 = new WeakMap;
    var _clearSelectionButton = new WeakMap;
    var _IconPicker_brand = new WeakSet;
    var IconPicker = function() {
        function IconPicker(catalogOfIcons) {
            _classCallCheck(this, IconPicker);
            _classPrivateMethodInitSpec(this, _IconPicker_brand);
            _classPrivateFieldInitSpec(this, _container$1, void 0);
            _classPrivateFieldInitSpec(this, _onSelectIconCallback, function() {});
            _classPrivateFieldInitSpec(this, _listOfIconNames, void 0);
            _classPrivateFieldInitSpec(this, _selectedIcons$1, void 0);
            _classPrivateFieldInitSpec(this, _clearSelectionButton, void 0);
            _classPrivateFieldSet2(_container$1, this, document.getElementById("icons"));
            _classPrivateFieldSet2(_clearSelectionButton, this, document.getElementById("clear"));
            _assertClassBrand(_IconPicker_brand, this, _addEventListener$1).call(this);
            this.show(catalogOfIcons);
        }
        return _createClass(IconPicker, [ {
            key: "show",
            value: function show(catalogOfIcons) {
                var _this = this;
                var categoryId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
                _classPrivateFieldSet2(_listOfIconNames, this, new Set);
                _classPrivateFieldSet2(_selectedIcons$1, this, new Map);
                _classPrivateFieldGet2(_container$1, this).textContent = "";
                var fragment = document.createDocumentFragment();
                catalogOfIcons.forEach(function(categoryInfo) {
                    var id = categoryInfo.id;
                    if (categoryId !== "" && categoryId !== id) {
                        return;
                    }
                    categoryInfo.folders.forEach(function(folderName, index) {
                        var icons = categoryInfo.icons[index];
                        icons.forEach(function(iconName) {
                            if (_classPrivateFieldGet2(_listOfIconNames, _this).has(iconName)) {
                                return;
                            }
                            _classPrivateFieldGet2(_listOfIconNames, _this).add(iconName);
                            var img = _assertClassBrand(_IconPicker_brand, _this, _createIcon).call(_this, iconName, folderName);
                            fragment.appendChild(img);
                        });
                    });
                    _assertClassBrand(_IconPicker_brand, _this, _onChange).call(_this);
                });
                _classPrivateFieldGet2(_container$1, this).appendChild(fragment);
                if (_classPrivateFieldGet2(_listOfIconNames, this).size === 0) {
                    _classPrivateFieldGet2(_container$1, this).textContent = "Your search didn't match any content. Please try another term.";
                }
            }
        }, {
            key: "setOnSelectIconCallback",
            value: function setOnSelectIconCallback(callback) {
                _classPrivateFieldSet2(_onSelectIconCallback, this, callback);
            }
        } ]);
    }();
    function _addEventListener$1() {
        var _this2 = this;
        _classPrivateFieldGet2(_container$1, this).addEventListener("click", function(e) {
            var icon = e.target.closest(".icon");
            if (icon) {
                var isModifierPressed = e.ctrlKey || e.metaKey;
                var iconId = icon.getAttribute("data-name");
                var section = icon.getAttribute("data-section");
                if (!isModifierPressed) {
                    _assertClassBrand(_IconPicker_brand, _this2, _unselectAll).call(_this2, true);
                }
                if (_classPrivateFieldGet2(_selectedIcons$1, _this2).has(iconId)) {
                    icon.classList.remove("selected");
                    _classPrivateFieldGet2(_selectedIcons$1, _this2).delete(iconId);
                } else {
                    icon.classList.add("selected");
                    _classPrivateFieldGet2(_selectedIcons$1, _this2).set(iconId, section);
                }
                _assertClassBrand(_IconPicker_brand, _this2, _onChange).call(_this2);
            }
        });
        _classPrivateFieldGet2(_container$1, this).addEventListener("dblclick", function(e) {
            var icon = e.target.closest(".icon");
            if (icon) {
                var iconId = icon.getAttribute("data-name");
                var section = icon.getAttribute("data-section");
                icon.classList.add("selected");
                _classPrivateFieldGet2(_selectedIcons$1, _this2).set(iconId, section);
                var needToRun = true;
                _classPrivateFieldGet2(_onSelectIconCallback, _this2).call(_this2, _classPrivateFieldGet2(_selectedIcons$1, _this2), needToRun);
            }
        });
        _classPrivateFieldGet2(_clearSelectionButton, this).addEventListener("click", _assertClassBrand(_IconPicker_brand, this, _unselectAll).bind(this, false));
        _classPrivateFieldGet2(_container$1, this).addEventListener("keydown", function(e) {
            if ((e.ctrlKey || e.metaKey) && e.code === "KeyA") {
                e.preventDefault();
                _assertClassBrand(_IconPicker_brand, _this2, _selectAll).call(_this2);
            }
        });
    }
    function _selectAll() {
        var _this3 = this;
        _classPrivateFieldGet2(_container$1, this).querySelectorAll(".icon:not(.selected)").forEach(function(icon) {
            var iconId = icon.getAttribute("data-name");
            var section = icon.getAttribute("data-section");
            icon.classList.add("selected");
            _classPrivateFieldGet2(_selectedIcons$1, _this3).set(iconId, section);
        });
        _assertClassBrand(_IconPicker_brand, this, _onChange).call(this);
    }
    function _unselectAll() {
        var silent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        _classPrivateFieldSet2(_selectedIcons$1, this, new Map);
        _classPrivateFieldGet2(_container$1, this).querySelectorAll(".icon.selected").forEach(function(icon) {
            icon.classList.remove("selected");
        });
        if (silent) return;
        _assertClassBrand(_IconPicker_brand, this, _onChange).call(this);
    }
    function _onChange() {
        var total = _classPrivateFieldGet2(_listOfIconNames, this).size;
        var selected = _classPrivateFieldGet2(_container$1, this).querySelectorAll(".icon.selected").length;
        document.getElementById("total").textContent = "".concat(total, " icons, ").concat(selected, " selected");
        _classPrivateFieldGet2(_onSelectIconCallback, this).call(this, _classPrivateFieldGet2(_selectedIcons$1, this));
    }
    function _createIcon(iconId, section) {
        var svgNS = "http://www.w3.org/2000/svg";
        var xlinkNS = "http://www.w3.org/1999/xlink";
        var fragment = document.createDocumentFragment();
        var svg = document.createElementNS(svgNS, "svg");
        fragment.appendChild(svg);
        svg.setAttribute("class", "icon");
        svg.setAttribute("role", "img");
        svg.setAttribute("data-name", iconId);
        svg.setAttribute("data-section", section);
        svg.setAttribute("tabindex", 0);
        var title = document.createElementNS(svgNS, "title");
        svg.appendChild(title);
        title.textContent = iconId;
        var use = document.createElementNS(svgNS, "use");
        svg.appendChild(use);
        use.setAttributeNS(xlinkNS, "xlink:href", "#".concat(iconId));
        use.setAttribute("href", "#".concat(iconId));
        return fragment;
    }
    var _container = new WeakMap;
    var _onSelectCategoryCallback = new WeakMap;
    var _selectedCategory = new WeakMap;
    var _CategoriesPicker_brand = new WeakSet;
    var CategoriesPicker = function() {
        function CategoriesPicker(_catalogOfIcons) {
            _classCallCheck(this, CategoriesPicker);
            _classPrivateMethodInitSpec(this, _CategoriesPicker_brand);
            _classPrivateFieldInitSpec(this, _container, void 0);
            _classPrivateFieldInitSpec(this, _onSelectCategoryCallback, function() {});
            _classPrivateFieldInitSpec(this, _selectedCategory, "");
            _classPrivateFieldSet2(_container, this, document.getElementById("categories"));
            _assertClassBrand(_CategoriesPicker_brand, this, _addEventListener).call(this);
            _assertClassBrand(_CategoriesPicker_brand, this, _show).call(this, _catalogOfIcons);
        }
        return _createClass(CategoriesPicker, [ {
            key: "reset",
            value: function reset() {
                if (_classPrivateFieldGet2(_selectedCategory, this) !== "") {
                    _classPrivateFieldSet2(_selectedCategory, this, "");
                    _classPrivateFieldGet2(_container, this).querySelectorAll(".category.selected").forEach(function(category) {
                        category.classList.remove("selected");
                    });
                }
            }
        }, {
            key: "setOnSelectCategoryCallback",
            value: function setOnSelectCategoryCallback(callback) {
                _classPrivateFieldSet2(_onSelectCategoryCallback, this, callback);
            }
        } ]);
    }();
    function _show(catalogOfIcons) {
        _classPrivateFieldSet2(_selectedCategory, this, "");
        var fragment = document.createDocumentFragment();
        catalogOfIcons.forEach(function(categoryInfo) {
            var id = categoryInfo.id;
            var label = categoryInfo.label;
            var categoryContainer = document.createElement("div");
            fragment.appendChild(categoryContainer);
            categoryContainer.className = "category";
            var categoryName = document.createElement("span");
            categoryContainer.appendChild(categoryName);
            categoryName.textContent = label;
            categoryName.setAttribute("data-id", id);
            categoryName.className = "category-name";
        });
        _classPrivateFieldGet2(_container, this).appendChild(fragment);
    }
    function _addEventListener() {
        var _this = this;
        _classPrivateFieldGet2(_container, this).addEventListener("click", function(e) {
            var categoryName = e.target.closest(".category-name");
            if (categoryName) {
                var id = categoryName.getAttribute("data-id");
                var category = categoryName.parentElement;
                var wasSelected = category.classList.contains("selected");
                _classPrivateFieldGet2(_container, _this).querySelectorAll(".category.selected").forEach(function(category) {
                    category.classList.remove("selected");
                });
                if (wasSelected) {
                    category.classList.remove("selected");
                    _classPrivateFieldSet2(_selectedCategory, _this, "");
                } else {
                    category.classList.add("selected");
                    _classPrivateFieldSet2(_selectedCategory, _this, id);
                }
                _classPrivateFieldGet2(_onSelectCategoryCallback, _this).call(_this, _classPrivateFieldGet2(_selectedCategory, _this));
            }
        });
    }
    var $$2 = require("../internals/export");
    var $includes = require("../internals/array-includes").includes;
    var fails = require("../internals/fails");
    var addToUnscopables = require("../internals/add-to-unscopables");
    var BROKEN_ON_SPARSE = fails(function() {
        return !Array(1).includes();
    });
    $$2({
        target: "Array",
        proto: true,
        forced: BROKEN_ON_SPARSE
    }, {
        includes: function includes(el) {
            return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
        }
    });
    addToUnscopables("includes");
    var $$1 = require("../internals/export");
    var isArray = require("../internals/is-array");
    var isConstructor = require("../internals/is-constructor");
    var isObject = require("../internals/is-object");
    var toAbsoluteIndex = require("../internals/to-absolute-index");
    var lengthOfArrayLike = require("../internals/length-of-array-like");
    var toIndexedObject = require("../internals/to-indexed-object");
    var createProperty = require("../internals/create-property");
    var wellKnownSymbol = require("../internals/well-known-symbol");
    var arrayMethodHasSpeciesSupport = require("../internals/array-method-has-species-support");
    var nativeSlice = require("../internals/array-slice");
    var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("slice");
    var SPECIES = wellKnownSymbol("species");
    var $Array = Array;
    var max = Math.max;
    $$1({
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
    var $ = require("../internals/export");
    var uncurryThis = require("../internals/function-uncurry-this");
    var notARegExp = require("../internals/not-a-regexp");
    var requireObjectCoercible = require("../internals/require-object-coercible");
    var toString = require("../internals/to-string");
    var correctIsRegExpLogic = require("../internals/correct-is-regexp-logic");
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
    var _catalogOfIcons = new WeakMap;
    var _filteredCatalog = new WeakMap;
    var _onFilterCallback = new WeakMap;
    var _SearchFilter_brand = new WeakSet;
    var SearchFilter = function() {
        function SearchFilter(catalogOfIcons) {
            _classCallCheck(this, SearchFilter);
            _classPrivateMethodInitSpec(this, _SearchFilter_brand);
            _classPrivateFieldInitSpec(this, _catalogOfIcons, void 0);
            _classPrivateFieldInitSpec(this, _filteredCatalog, void 0);
            _classPrivateFieldInitSpec(this, _onFilterCallback, void 0);
            _classPrivateFieldSet2(_catalogOfIcons, this, catalogOfIcons);
            this.input = document.getElementById("searchFilter");
            this.input.addEventListener("input", _assertClassBrand(_SearchFilter_brand, this, _onInput).bind(this));
        }
        return _createClass(SearchFilter, [ {
            key: "reset",
            value: function reset() {
                if (this.input.value !== "") {
                    this.input.value = "";
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
    function _onInput(e) {
        var value = e.target.value.slice().toLowerCase();
        if (value === "") {
            _classPrivateFieldSet2(_filteredCatalog, this, _classPrivateFieldGet2(_catalogOfIcons, this));
        } else {
            _classPrivateFieldSet2(_filteredCatalog, this, _classPrivateFieldGet2(_catalogOfIcons, this).slice().map(function(categoryInfo) {
                var filteredIcons = [];
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
                return new Promise(function(resolve, reject) {
                    SvgLoader.loadSprites().then(resolve).catch(function(e) {
                        console.error("Failed to load font awesome sprites");
                        reject(e);
                    });
                    try {
                        _classPrivateFieldGet2(_categoriesPicker, _this).setOnSelectCategoryCallback(function(categoryName) {
                            _classPrivateFieldGet2(_iconsPicker, _this).show(FA_CATEGORIES, categoryName);
                            _classPrivateFieldGet2(_searchFilter, _this).reset();
                        });
                        _classPrivateFieldGet2(_searchFilter, _this).setOnFilterCallback(function(catalogOfIcons) {
                            _classPrivateFieldGet2(_iconsPicker, _this).show(catalogOfIcons);
                            _classPrivateFieldGet2(_categoriesPicker, _this).reset();
                        });
                        _classPrivateFieldGet2(_iconsPicker, _this).setOnSelectIconCallback(function(icons, needToRun) {
                            _classPrivateFieldSet2(_selectedIcons, _this, icons);
                            needToRun && _this.run();
                        });
                    } catch (e) {
                        console.error("Failed to init icons plugin");
                        reject(e);
                    }
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
                    SvgLoader.loadSvgs(_classPrivateFieldGet2(_selectedIcons, _this2)).then(function(svgs) {
                        console.log("selected", _classPrivateFieldGet2(_selectedIcons, _this2));
                        console.log("svgs", svgs);
                        var parsed = svgs.map(function(svg) {
                            return SvgParser.parse(svg);
                        });
                        console.log("parsed", parsed);
                        Asc.scope.editor = Asc.plugin.info.editorType;
                        Asc.scope.parsedSvgs = parsed;
                        var isCalc = true;
                        var isClose = false;
                        Asc.plugin.callCommand(Commands.insertIcon, isClose, isCalc, resolve);
                    }).catch(function(e) {
                        console.error("Failed to run icons plugin");
                        console.error(e);
                        reject(e);
                    });
                });
            }
        } ]);
    }();
    var Theme = function() {
        function Theme() {
            _classCallCheck(this, Theme);
        }
        return _createClass(Theme, null, [ {
            key: "onThemeChanged",
            value: function onThemeChanged(theme) {
                window.Asc.plugin.onThemeChangedBase(theme);
                var themeType = theme.type || "light";
                var body = document.body;
                body.classList.remove("dark");
                body.classList.remove("light");
                body.classList.add(themeType);
            }
        } ]);
    }();
    var iconsPlugin = new IconsPlugin;
    window.Asc.plugin.init = _asyncToGenerator(_regenerator().m(function _callee() {
        return _regenerator().w(function(_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return iconsPlugin.init().catch(function(e) {
                    console.error("Failed to init icons plugin");
                    console.error(e);
                });

              case 1:
                return _context.a(2);
            }
        }, _callee);
    }));
    window.Asc.plugin.onTranslate = _asyncToGenerator(_regenerator().m(function _callee2() {
        return _regenerator().w(function(_context2) {
            while (1) switch (_context2.n) {
              case 0:
                console.log("onTranslate in icons");

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
