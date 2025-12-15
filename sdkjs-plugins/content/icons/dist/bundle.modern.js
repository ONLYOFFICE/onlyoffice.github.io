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

function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r);
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}

function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}

var Commands = {
    insertIcon: function insertIcon() {
        var editor = Asc.scope.editor;
        var insertIconFunction = createInsertFunction(editor);
        var fill = Api.CreateSolidFill(Api.CreateRGBColor(100, 150, 255));
        Asc.scope.parsedSvgs.forEach(svgParsedObject => {
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
            svgParsedObject.elements.forEach(svgElement => {
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
                    svgElement.d.forEach(d => {
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
                return (customGeometry, width, height, fill, stroke) => {
                    var shape = Api.CreateShape("rect", width, height, fill, stroke);
                    shape.SetGeometry(customGeometry);
                    run.AddDrawing(shape);
                };
            } else if (editor === "slide") {
                var presentation = Api.GetPresentation();
                var activeSlide = presentation.GetCurrentVisibleSlide() || presentation.GetCurrentSlide();
                var slideWidth = activeSlide.GetWidth();
                var slideHeight = activeSlide.GetHeight();
                return (customGeometry, width, height, fill, stroke) => {
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
                return (customGeometry, width, height, fill, stroke) => {
                    var shape = worksheet.AddShape("rect", width, height, fill, stroke, col - 1, 0, row - 1, 0);
                    shape.SetGeometry(customGeometry);
                };
            }
        }
        return true;
    }
};

var _ArcToCubicConverter;

class ArcToCubicConverter {
    static convert(rx, ry, rotation, largeArc, sweep, dx, dy, startX, startY) {
        var endX = startX + dx;
        var endY = startY + dy;
        return _assertClassBrand(ArcToCubicConverter, this, _convertEllipticalArcToCubics).call(this, startX, startY, endX, endY, rx, ry, rotation, largeArc, sweep);
    }
}

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
    var {cx: cx, cy: cy, theta1: theta1, theta2: theta2} = center;
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

class SVGPathParser {
    constructor(pathString) {
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
    parse() {
        var commandRegex = /([MLHVCSQTAZ])([^MLHVCSQTAZ]*)/gi;
        var match;
        while ((match = commandRegex.exec(_classPrivateFieldGet2(_pathString, this))) !== null) {
            var command = match[1];
            var params = match[2].trim().replaceAll(/(\d)-/g, "$1 -").split(/[\s,]+/).filter(p => p !== "").map(parseFloat);
            _assertClassBrand(_SVGPathParser_brand, this, _processCommand).call(this, command, params);
        }
        return _classPrivateFieldGet2(_commands, this);
    }
}

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
    params.forEach(param => {
        var x = param;
        var absolute = command === "H";
        if (!absolute) {
            x += _classPrivateFieldGet2(_currentX, this);
        }
        _classPrivateFieldGet2(_commands, this).push({
            type: "lineto",
            x: x,
            y: _classPrivateFieldGet2(_currentY, this),
            absolute: absolute,
            isHorizontal: true
        });
        _classPrivateFieldSet2(_currentX, this, x);
    });
}

function _handleVerticalLineto(command, params) {
    params.forEach(param => {
        var y = param;
        var absolute = command === "V";
        if (!absolute) {
            y += _classPrivateFieldGet2(_currentY, this);
        }
        _classPrivateFieldGet2(_commands, this).push({
            type: "lineto",
            x: _classPrivateFieldGet2(_currentX, this),
            y: y,
            absolute: absolute,
            isVertical: true
        });
        _classPrivateFieldSet2(_currentY, this, y);
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
    for (var i = 0; i < params.length; i += 7) {
        var rx = params[i];
        var ry = params[i + 1];
        var rotation = params[i + 2];
        var largeArc = params[i + 3];
        var sweep = params[i + 4];
        var x = params[i + 5];
        var y = params[i + 6];
        var bezierCommands = ArcToCubicConverter.convert(rx, ry, rotation, largeArc, sweep, x, y, _classPrivateFieldGet2(_currentX, this), _classPrivateFieldGet2(_currentY, this));
        bezierCommands.forEach(command => {
            _classPrivateFieldGet2(_commands, this).push(command);
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

class SvgParser {
    static parse(svgString) {
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
}

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
    var elements = [];
    svgDoc.querySelectorAll("path").forEach(path => {
        var pathParser = new SVGPathParser(path.getAttribute("d"));
        elements.push({
            type: "path",
            d: pathParser.parse(),
            style: _assertClassBrand(_SvgParser, this, _getElementStyle).call(this, path)
        });
    });
    return elements;
}

function _extractCircles(svgDoc) {
    var elements = [];
    svgDoc.querySelectorAll("circle").forEach(circle => {
        var element = {
            cx: circle.getAttribute("cx"),
            cy: circle.getAttribute("cy"),
            r: circle.getAttribute("r")
        };
        var d = _assertClassBrand(_SvgParser, this, _circleToPathCommands).call(this, element);
        var pathParser = new SVGPathParser(d);
        elements.push({
            type: "path",
            d: pathParser.parse(),
            style: _assertClassBrand(_SvgParser, this, _getElementStyle).call(this, circle)
        });
    });
    return elements;
}

function _extractRects(svgDoc) {
    var elements = [];
    svgDoc.querySelectorAll("rect").forEach(rect => {
        var element = {
            x: rect.getAttribute("x"),
            y: rect.getAttribute("y"),
            width: rect.getAttribute("width"),
            height: rect.getAttribute("height")
        };
        var d = _assertClassBrand(_SvgParser, this, _rectToPathCommands).call(this, element);
        var pathParser = new SVGPathParser(d);
        elements.push({
            type: "path",
            d: pathParser.parse(),
            style: _assertClassBrand(_SvgParser, this, _getElementStyle).call(this, rect)
        });
    });
    return elements;
}

function _extractEllipses(svgDoc) {
    var elements = [];
    svgDoc.querySelectorAll("ellipse").forEach(ellipse => {
        var element = {
            cx: ellipse.getAttribute("cx"),
            cy: ellipse.getAttribute("cy"),
            rx: ellipse.getAttribute("rx"),
            ry: ellipse.getAttribute("ry")
        };
        var d = _assertClassBrand(_SvgParser, this, _ellipseToPathCommands).call(this, element);
        var pathParser = new SVGPathParser(d);
        elements.push({
            type: "path",
            d: pathParser.parse(),
            style: _assertClassBrand(_SvgParser, this, _getElementStyle).call(this, ellipse)
        });
    });
    return elements;
}

function _extractLines(svgDoc) {
    var elements = [];
    svgDoc.querySelectorAll("line").forEach(line => {
        var x1 = line.getAttribute("x1");
        var y1 = line.getAttribute("y1");
        var x2 = line.getAttribute("x2");
        var y2 = line.getAttribute("y2");
        var d = "M ".concat(x1, " ").concat(y1, " L ").concat(x2, " ").concat(y2);
        var pathParser = new SVGPathParser(d);
        elements.push({
            type: "path",
            d: pathParser.parse(),
            style: _assertClassBrand(_SvgParser, this, _getElementStyle).call(this, line)
        });
    });
    return elements;
}

function _extractPolylines(svgDoc) {
    var elements = [];
    svgDoc.querySelectorAll("polyline").forEach(polyline => {
        var points = polyline.getAttribute("points").split(" ").map(point => {
            var [x, y] = point.split(",");
            return {
                x: parseFloat(x),
                y: parseFloat(y)
            };
        });
        var d = points.map((point, index) => "".concat(index === 0 ? "M" : "L", " ").concat(point.x, ",").concat(point.y)).join(" ");
        var pathParser = new SVGPathParser(d);
        elements.push({
            type: "path",
            d: pathParser.parse(),
            style: _assertClassBrand(_SvgParser, this, _getElementStyle).call(this, polyline)
        });
    });
    return elements;
}

function _extractPolygons(svgDoc) {
    var elements = [];
    svgDoc.querySelectorAll("polygon").forEach(polygon => {
        var points = polygon.getAttribute("points").split(" ").map(point => {
            var [x, y] = point.split(",");
            return {
                x: parseFloat(x),
                y: parseFloat(y)
            };
        });
        var d = points.map((point, index) => "".concat(index === 0 ? "M" : "L", " ").concat(point.x, ",").concat(point.y)).join(" ") + " Z";
        var pathParser = new SVGPathParser(d);
        elements.push({
            type: "path",
            d: pathParser.parse(),
            style: _assertClassBrand(_SvgParser, this, _getElementStyle).call(this, polygon)
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
    var attributeStyles = (_element$getAttribute = element.getAttribute("style")) === null || _element$getAttribute === void 0 ? void 0 : _element$getAttribute.split(";").map(style => style.trim()).filter(style => style !== "");
    if (attributeStyles && attributeStyles.length > 0) {
        attributeStyles.forEach(style => {
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

class IconPicker {
    constructor(catalogOfIcons) {
        _classPrivateMethodInitSpec(this, _IconPicker_brand);
        _classPrivateFieldInitSpec(this, _container, void 0);
        _classPrivateFieldInitSpec(this, _insertButton, void 0);
        _classPrivateFieldInitSpec(this, _onSelectIconCallback, (map, needToRun) => {});
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
    showFound(foundIcons) {
        return new Promise(resolve => {
            _assertClassBrand(_IconPicker_brand, this, _unselectAll).call(this, true);
            _assertClassBrand(_IconPicker_brand, this, _hideAll).call(this);
            var displayedIcons = 0;
            setTimeout(() => {
                foundIcons.forEach(categoryInfo => {
                    categoryInfo.folders.forEach((folderName, index) => {
                        var icons = categoryInfo.icons[index];
                        icons.forEach(iconName => {
                            var iconElement = _classPrivateFieldGet2(_container, this).querySelector('.icon[data-name="'.concat(iconName, '"][data-section="').concat(folderName, '"]'));
                            if (iconElement) {
                                var currentClass = iconElement.getAttribute("class") || "";
                                currentClass = currentClass.replace(new RegExp("\\b" + "hidden" + "\\b", "g"), "").trim();
                                iconElement.setAttribute("class", currentClass);
                                displayedIcons++;
                            }
                        });
                    });
                });
                _assertClassBrand(_IconPicker_brand, this, _onChange).call(this);
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
    showCategory() {
        var categoryId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        return new Promise(resolve => {
            _assertClassBrand(_IconPicker_brand, this, _unselectAll).call(this, true);
            setTimeout(() => {
                var icons = _classPrivateFieldGet2(_container, this).getElementsByClassName("icon");
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
                _assertClassBrand(_IconPicker_brand, this, _onChange).call(this);
                resolve(true);
            }, 0);
        });
    }
    setOnSelectIconCallback(callback) {
        _classPrivateFieldSet2(_onSelectIconCallback, this, callback);
    }
    getSelectedSvgIcons() {
        var icons = _classPrivateFieldGet2(_container, this).querySelectorAll(".icon.selected");
        var serializer = new XMLSerializer;
        return Array.from(icons).map(svg => serializer.serializeToString(svg));
    }
}

function _addEventListener$1() {
    _classPrivateFieldGet2(_container, this).addEventListener("click", e => {
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
            _assertClassBrand(_IconPicker_brand, this, _unselectAll).call(this, true);
        }
        if (_classPrivateFieldGet2(_selectedIcons$1, this).has(iconId)) {
            _assertClassBrand(_IconPicker_brand, this, _setSelectedToIcon).call(this, icon, false);
            _classPrivateFieldGet2(_selectedIcons$1, this).delete(iconId);
        } else {
            _assertClassBrand(_IconPicker_brand, this, _setSelectedToIcon).call(this, icon, true);
            _classPrivateFieldGet2(_selectedIcons$1, this).set(iconId, section);
        }
        icon.setAttribute("tabindex", "0");
        _assertClassBrand(_IconPicker_brand, this, _onChange).call(this);
    });
    _classPrivateFieldGet2(_container, this).addEventListener("dblclick", e => {
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
        _assertClassBrand(_IconPicker_brand, this, _setSelectedToIcon).call(this, icon, true);
        _classPrivateFieldGet2(_selectedIcons$1, this).set(iconId, section);
        var needToRun = true;
        _classPrivateFieldGet2(_onSelectIconCallback, this).call(this, _classPrivateFieldGet2(_selectedIcons$1, this), needToRun);
    });
    _classPrivateFieldGet2(_container, this).addEventListener("keydown", e => {
        if ((e.ctrlKey || e.metaKey) && e.code === "KeyA") {
            e.preventDefault();
            _assertClassBrand(_IconPicker_brand, this, _selectAll).call(this);
        }
        if (e.code === "Escape") {
            e.preventDefault();
            _assertClassBrand(_IconPicker_brand, this, _unselectAll).call(this);
        }
        if (e.code === "Space") {
            var focusedIcon = _classPrivateFieldGet2(_container, this).querySelector(".icon:focus");
            if (focusedIcon) {
                e.preventDefault();
                _assertClassBrand(_IconPicker_brand, this, _unselectAll).call(this);
                var iconId = focusedIcon.getAttribute("data-name");
                var section = focusedIcon.getAttribute("data-section");
                _assertClassBrand(_IconPicker_brand, this, _setSelectedToIcon).call(this, focusedIcon, true);
                _classPrivateFieldGet2(_selectedIcons$1, this).set(iconId, section);
                _assertClassBrand(_IconPicker_brand, this, _onChange).call(this);
            }
        }
        if (e.code === "Enter") {
            e.preventDefault();
            if (_classPrivateFieldGet2(_selectedIcons$1, this).size === 0) {
                return;
            }
            var needToRun = true;
            _classPrivateFieldGet2(_onSelectIconCallback, this).call(this, _classPrivateFieldGet2(_selectedIcons$1, this), needToRun);
        }
    });
    _classPrivateFieldGet2(_insertButton, this).subscribe(event => {
        if (event.type === "button:click") {
            var needToRun = true;
            _classPrivateFieldGet2(_onSelectIconCallback, this).call(this, _classPrivateFieldGet2(_selectedIcons$1, this), needToRun);
        }
    });
}

function _selectAll() {
    _classPrivateFieldGet2(_container, this).querySelectorAll(".icon:not(.selected)").forEach(icon => {
        var iconId = icon.getAttribute("data-name");
        var section = icon.getAttribute("data-section");
        _assertClassBrand(_IconPicker_brand, this, _setSelectedToIcon).call(this, icon, true);
        _classPrivateFieldGet2(_selectedIcons$1, this).set(iconId, section);
    });
    _assertClassBrand(_IconPicker_brand, this, _onChange).call(this);
}

function _unselectAll() {
    var silent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    _classPrivateFieldSet2(_selectedIcons$1, this, new Map);
    _classPrivateFieldGet2(_container, this).querySelectorAll(".icon.selected").forEach(icon => {
        _assertClassBrand(_IconPicker_brand, this, _setSelectedToIcon).call(this, icon, false);
    });
    if (silent) return;
    _assertClassBrand(_IconPicker_brand, this, _onChange).call(this);
}

function _hideAll() {
    _classPrivateFieldGet2(_container, this).querySelectorAll(".icon:not(.hidden)").forEach(icon => {
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

class CategoriesPicker {
    constructor(_catalogOfIcons) {
        _classPrivateMethodInitSpec(this, _CategoriesPicker_brand);
        _classPrivateFieldInitSpec(this, _categories, void 0);
        _classPrivateFieldInitSpec(this, _onSelectCategoryCallback, category => {});
        _classPrivateFieldInitSpec(this, _selectedCategory, "");
        _classPrivateFieldSet2(_categories, this, new SelectBox("categorySelectList", {
            placeholder: "Loading..."
        }));
        _assertClassBrand(_CategoriesPicker_brand, this, _addEventListener).call(this);
        _assertClassBrand(_CategoriesPicker_brand, this, _show).call(this, _catalogOfIcons);
    }
    reset() {
        if (_classPrivateFieldGet2(_selectedCategory, this) === "") {
            return;
        }
        _classPrivateFieldSet2(_selectedCategory, this, "");
        var selectAll = true;
        _classPrivateFieldGet2(_categories, this).clear(selectAll);
    }
    setOnSelectCategoryCallback(callback) {
        _classPrivateFieldSet2(_onSelectCategoryCallback, this, callback);
    }
}

function _show(catalogOfIcons) {
    _classPrivateFieldSet2(_selectedCategory, this, "");
    _classPrivateFieldGet2(_categories, this).addItem("", "All", true);
    catalogOfIcons.forEach(categoryInfo => {
        _classPrivateFieldGet2(_categories, this).addItem(categoryInfo.id, categoryInfo.label);
    });
}

function _addEventListener() {
    _classPrivateFieldGet2(_categories, this).subscribe(event => {
        if (event.type === "selectbox:change") {
            var selectedValues = event.detail.values;
            _classPrivateFieldSet2(_selectedCategory, this, selectedValues.length > 0 ? selectedValues[0] : "");
            _classPrivateFieldGet2(_onSelectCategoryCallback, this).call(this, _classPrivateFieldGet2(_selectedCategory, this));
        }
    });
}

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

class SearchFilter {
    constructor(catalogOfIcons) {
        _classPrivateMethodInitSpec(this, _SearchFilter_brand);
        _classPrivateFieldInitSpec(this, _catalogOfIcons, void 0);
        _classPrivateFieldInitSpec(this, _filteredCatalog, void 0);
        _classPrivateFieldInitSpec(this, _onFilterCallback, void 0);
        _defineProperty(this, "input", void 0);
        _classPrivateFieldInitSpec(this, _text, void 0);
        _classPrivateFieldInitSpec(this, _debounceTimeout, void 0);
        _classPrivateFieldSet2(_onFilterCallback, this, categories => {});
        _classPrivateFieldSet2(_filteredCatalog, this, catalogOfIcons);
        _classPrivateFieldSet2(_catalogOfIcons, this, catalogOfIcons);
        _classPrivateFieldSet2(_text, this, "");
        this.input = new InputField("searchFilter", {
            autofocus: true,
            type: "search",
            showClear: false,
            showSearchIcon: true
        });
        this.input.subscribe(event => {
            if (event.type !== "inputfield:input" || _classPrivateFieldGet2(_text, this) === event.detail.value) {
                return;
            }
            if (_classPrivateFieldGet2(_debounceTimeout, this)) {
                clearTimeout(_classPrivateFieldGet2(_debounceTimeout, this));
            }
            _classPrivateFieldSet2(_debounceTimeout, this, setTimeout(() => {
                _classPrivateFieldSet2(_text, this, event.detail.value);
                _assertClassBrand(_SearchFilter_brand, this, _onInput).call(this, event.detail.value.toLowerCase());
            }, 500));
        });
    }
    reset() {
        if (this.input.getValue() !== "") {
            var bFocusInput = false;
            this.input.clear(bFocusInput);
            _classPrivateFieldSet2(_text, this, "");
            _classPrivateFieldSet2(_filteredCatalog, this, _classPrivateFieldGet2(_catalogOfIcons, this));
        }
    }
    setOnFilterCallback(callback) {
        _classPrivateFieldSet2(_onFilterCallback, this, callback);
    }
}

function _onInput(value) {
    if (value === "") {
        _classPrivateFieldSet2(_filteredCatalog, this, _classPrivateFieldGet2(_catalogOfIcons, this));
    } else {
        _classPrivateFieldSet2(_filteredCatalog, this, _classPrivateFieldGet2(_catalogOfIcons, this).slice().map(categoryInfo => {
            var filteredIcons = [ [] ];
            categoryInfo.folders.forEach((folderName, index) => {
                var icons = categoryInfo.icons[index];
                filteredIcons[index] = icons.filter(iconName => iconName.toLowerCase().includes(value));
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

class IconsPlugin {
    constructor() {
        _classPrivateFieldInitSpec(this, _categoriesPicker, void 0);
        _classPrivateFieldInitSpec(this, _iconsPicker, void 0);
        _classPrivateFieldInitSpec(this, _searchFilter, void 0);
        _classPrivateFieldInitSpec(this, _selectedIcons, void 0);
        _classPrivateFieldSet2(_selectedIcons, this, new Map);
        _classPrivateFieldSet2(_iconsPicker, this, new IconPicker(FA_CATEGORIES));
        _classPrivateFieldSet2(_categoriesPicker, this, new CategoriesPicker(FA_CATEGORIES));
        _classPrivateFieldSet2(_searchFilter, this, new SearchFilter(FA_CATEGORIES));
    }
    init() {
        _classPrivateFieldGet2(_categoriesPicker, this).setOnSelectCategoryCallback(categoryName => {
            _classPrivateFieldGet2(_iconsPicker, this).showCategory(categoryName);
            _classPrivateFieldGet2(_searchFilter, this).reset();
        });
        _classPrivateFieldGet2(_searchFilter, this).setOnFilterCallback(catalogOfIcons => {
            _classPrivateFieldGet2(_iconsPicker, this).showFound(catalogOfIcons);
            _classPrivateFieldGet2(_categoriesPicker, this).reset();
        });
        _classPrivateFieldGet2(_iconsPicker, this).setOnSelectIconCallback((icons, needToRun) => {
            _classPrivateFieldSet2(_selectedIcons, this, icons);
            needToRun && this.run();
        });
    }
    run() {
        return new Promise((resolve, reject) => {
            if (!_classPrivateFieldGet2(_selectedIcons, this).size) {
                resolve(false);
                return;
            }
            try {
                var svgs = _classPrivateFieldGet2(_iconsPicker, this).getSelectedSvgIcons();
                var parsed = svgs.map(svg => SvgParser.parse(svg));
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
}

var themes = new Set([ "theme-classic-light", "theme-classic-dark", "theme-light", "theme-dark", "theme-contrast-dark", "theme-gray", "theme-night", "theme-white" ]);

class Theme {
    static onThemeChanged(theme) {
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
        for (var className of themes) {
            body.classList.remove(className);
        }
        body.classList.add(themeName);
    }
    static fixThemeForIE(theme) {
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
    static addStylesForComponents(theme) {
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
}

function translate(text) {
    var translatedText = window.Asc.plugin.tr(text);
    return translatedText;
}

window.Asc.plugin.init = _asyncToGenerator(function*() {
    try {
        var _iconsPlugin = new IconsPlugin;
        _iconsPlugin.init();
    } catch (e) {
        console.error("Failed to init icons plugin");
        console.error(e);
    }
});

window.Asc.plugin.onTranslate = _asyncToGenerator(function*() {
    var elements = document.getElementsByClassName("i18n");
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        if (el.attributes["placeholder"]) el.attributes["placeholder"].value = translate(el.attributes["placeholder"].value);
        if (el.attributes["title"]) el.attributes["title"].value = translate(el.attributes["title"].value);
        if (el.innerText) el.innerText = translate(el.innerText);
    }
});

window.Asc.plugin.button = function() {
    var _ref3 = _asyncToGenerator(function*(id, windowId) {
        if (id === -1 || id === 1) {
            this.executeCommand("close", "");
        } else {
            yield iconsPlugin.run();
        }
    });
    return function(_x, _x2) {
        return _ref3.apply(this, arguments);
    };
}();

window.Asc.plugin.onThemeChanged = Theme.onThemeChanged;
//# sourceMappingURL=bundle.modern.js.map
