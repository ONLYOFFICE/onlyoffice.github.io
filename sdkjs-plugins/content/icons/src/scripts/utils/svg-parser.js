import { SVGPathParser } from "./svg-path-parser.js";

class SvgParser {
    static parse(svgString) {
        const parser = new DOMParser();

        const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
        let width = svgDoc.querySelector("svg")?.getAttribute("width");
        let height = svgDoc.querySelector("svg")?.getAttribute("height");
        const viewBox = svgDoc.querySelector("svg")?.getAttribute("viewBox");
        if (viewBox) {
            width = width ? width : viewBox.split(" ")[2];
            height = height ? height : viewBox.split(" ")[3];
        }

        return {
            width,
            height,
            elements: this.#extractElements(svgDoc),
        };
    }

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

    static #polygonToPathCommands() {}
}

export { SvgParser };
