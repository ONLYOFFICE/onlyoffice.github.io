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

import { SVGPathParser } from "./svg-path-parser.js";

class SvgParser {
    /**
     * Parses an SVG string and returns an object with the width, height, and an array of elements.
     * @param {string} svgString - The SVG string to parse.
     * @returns {object} - An object with the width, height, and elements.
     * @property {string} width - The width of the SVG.
     * @property {string} height - The height of the SVG.
     * @property {{Array<{type: string, d: Array<object>, style: object}>}} elements - An array of parsed SVG elements.
     */
    static parse(svgString) {
        const parser = new DOMParser();

        const svgDoc = parser.parseFromString(svgString, "image/svg+xml");

        let width = svgDoc.querySelector("svg")?.getAttribute("width");
        let height = svgDoc.querySelector("svg")?.getAttribute("height");
        const viewBox = svgDoc.querySelector("svg")?.getAttribute("viewBox");
        if (viewBox) {
            width =
                viewBox.split(" ").length > 2 ? viewBox.split(" ")[2] : width;
            height =
                viewBox.split(" ").length > 3 ? viewBox.split(" ")[3] : height;
        }

        const elements = this.#extractElements(svgDoc);

        if (!elements || elements.length === 0) {
            throw new Error("No elements found in SVG");
        }

        return {
            width,
            height,
            elements,
        };
    }

    /**
     * Extracts elements from an SVG document and returns an array of parsed elements.
     * @param {Document} svgDoc - The SVG document to extract elements from.
     * @returns {Array<{type: string, d: Array<object>, style: object}>} - An array of parsed SVG elements.
     */
    static #extractElements(svgDoc) {
        let elements = [];

        elements = elements.concat(this.#extractPaths(svgDoc));
        elements = elements.concat(this.#extractCircles(svgDoc));
        elements = elements.concat(this.#extractRects(svgDoc));
        elements = elements.concat(this.#extractEllipses(svgDoc));
        elements = elements.concat(this.#extractLines(svgDoc));
        elements = elements.concat(this.#extractPolylines(svgDoc));
        elements = elements.concat(this.#extractPolygons(svgDoc));

        return elements;
    }

    static #extractPaths(svgDoc) {
        let elements = [];

        svgDoc.querySelectorAll("path").forEach((path) => {
            let pathParser = new SVGPathParser(path.getAttribute("d"));
            elements.push({
                type: "path",
                d: pathParser.parse(),
                style: this.#getElementStyle(path),
            });
        });

        return elements;
    }

    static #extractCircles(svgDoc) {
        let elements = [];

        svgDoc.querySelectorAll("circle").forEach((circle) => {
            const element = {
                cx: circle.getAttribute("cx"),
                cy: circle.getAttribute("cy"),
                r: circle.getAttribute("r"),
            };
            const d = this.#circleToPathCommands(element);
            let pathParser = new SVGPathParser(d);
            elements.push({
                type: "path",
                d: pathParser.parse(),
                style: this.#getElementStyle(circle),
            });
        });

        return elements;
    }

    static #extractRects(svgDoc) {
        let elements = [];

        svgDoc.querySelectorAll("rect").forEach((rect) => {
            const element = {
                x: rect.getAttribute("x"),
                y: rect.getAttribute("y"),
                width: rect.getAttribute("width"),
                height: rect.getAttribute("height"),
            };
            const d = this.#rectToPathCommands(element);
            let pathParser = new SVGPathParser(d);
            elements.push({
                type: "path",
                d: pathParser.parse(),
                style: this.#getElementStyle(rect),
            });
        });

        return elements;
    }

    static #extractEllipses(svgDoc) {
        let elements = [];

        svgDoc.querySelectorAll("ellipse").forEach((ellipse) => {
            const element = {
                cx: ellipse.getAttribute("cx"),
                cy: ellipse.getAttribute("cy"),
                rx: ellipse.getAttribute("rx"),
                ry: ellipse.getAttribute("ry"),
            };

            const d = this.#ellipseToPathCommands(element);

            let pathParser = new SVGPathParser(d);
            elements.push({
                type: "path",
                d: pathParser.parse(),
                style: this.#getElementStyle(ellipse),
            });
        });

        return elements;
    }

    static #extractLines(svgDoc) {
        let elements = [];

        svgDoc.querySelectorAll("line").forEach((line) => {
            const x1 = line.getAttribute("x1");
            const y1 = line.getAttribute("y1");
            const x2 = line.getAttribute("x2");
            const y2 = line.getAttribute("y2");

            const d = `M ${x1} ${y1} L ${x2} ${y2}`;

            let pathParser = new SVGPathParser(d);
            elements.push({
                type: "path",
                d: pathParser.parse(),
                style: this.#getElementStyle(line),
            });
        });

        return elements;
    }

    static #extractPolylines(svgDoc) {
        let elements = [];

        svgDoc.querySelectorAll("polyline").forEach((polyline) => {
            const points = polyline
                .getAttribute("points")
                .split(" ")
                .map((point) => {
                    const [x, y] = point.split(",");
                    return { x: parseFloat(x), y: parseFloat(y) };
                });

            const d = points
                .map((point, index) => {
                    return `${index === 0 ? "M" : "L"} ${point.x},${point.y}`;
                })
                .join(" ");

            let pathParser = new SVGPathParser(d);
            elements.push({
                type: "path",
                d: pathParser.parse(),
                style: this.#getElementStyle(polyline),
            });
        });

        return elements;
    }

    static #extractPolygons(svgDoc) {
        let elements = [];

        svgDoc.querySelectorAll("polygon").forEach((polygon) => {
            const points = polygon
                .getAttribute("points")
                .split(" ")
                .map((point) => {
                    const [x, y] = point.split(",");
                    return { x: parseFloat(x), y: parseFloat(y) };
                });

            const d =
                points
                    .map((point, index) => {
                        return `${index === 0 ? "M" : "L"} ${point.x},${
                            point.y
                        }`;
                    })
                    .join(" ") + " Z";

            let pathParser = new SVGPathParser(d);
            elements.push({
                type: "path",
                d: pathParser.parse(),
                style: this.#getElementStyle(polygon),
            });
        });

        return elements;
    }

    static #getElementStyle(element) {
        const elementStyles = {
            fill: element.getAttribute("fill"),
            stroke: element.getAttribute("stroke"),
            strokeWidth: element.getAttribute("stroke-width"),
            opacity: element.getAttribute("opacity"),
        };

        let attributeStyles = element
            .getAttribute("style")
            ?.split(";")
            .map((style) => style.trim())
            .filter((style) => style !== "");

        if (attributeStyles && attributeStyles.length > 0) {
            attributeStyles.forEach((style) => {
                elementStyles[style.split(":")[0]] = style.split(":")[1];
            });
        }

        return elementStyles;
    }

    static #rectToPathCommands(rect) {
        const x = parseFloat(rect.x);
        const y = parseFloat(rect.y);
        const width = parseFloat(rect.width);
        const height = parseFloat(rect.height);

        const commands = [];

        commands.push(`M ${x} ${y}`);
        commands.push(`L ${x + width} ${y}`);
        commands.push(`L ${x + width} ${y + height}`);
        commands.push(`L ${x} ${y + height}`);
        commands.push("Z");

        return commands.join(" ");
    }

    static #ellipseToPathCommands(ellipse) {
        const cx = parseFloat(ellipse.cx);
        const cy = parseFloat(ellipse.cy);
        const rx = parseFloat(ellipse.rx);
        const ry = parseFloat(ellipse.ry);

        return `M ${cx - rx},${cy} a ${rx},${ry} 0 1,0 ${
            rx * 2
        },0 a ${rx},${ry} 0 1,0 ${-rx * 2},0 Z`;
    }

    static #circleToPathCommands(circle, segments = 60) {
        const cx = parseFloat(circle.cx);
        const cy = parseFloat(circle.cy);
        const r = parseFloat(circle.r);

        const commands = [];
        const angleStep = (2 * Math.PI) / segments;

        const startX = cx + r * Math.cos(0);
        const startY = cy + r * Math.sin(0);
        commands.push(`M ${startX} ${startY}`);

        for (let i = 1; i <= segments; i++) {
            const angle = i * angleStep;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            commands.push(`L ${x} ${y}`);
        }

        commands.push("Z");

        return commands.join(" ");
    }
}

export { SvgParser };
