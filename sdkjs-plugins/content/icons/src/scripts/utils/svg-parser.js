import { SVGPathParser } from "./svg-path-parser.js";

class SvgParser {
    static parse(svgString) {
        const parser = new DOMParser();

        const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
        const viewBox = svgDoc.querySelector("svg").getAttribute("viewBox");
        const [minX, minY, width, height] = viewBox.split(" ").map(parseFloat);

        return {
            minX,
            minY,
            width,
            height,
            elements: this.#extractElements(svgDoc),
        };
    }

    static #extractElements(svgDoc) {
        let elements = [];

        svgDoc.querySelectorAll("path").forEach((path) => {
            let pathParser = new SVGPathParser(path.getAttribute("d"));
            elements.push({
                type: "path",
                d: pathParser.parse(),
                style: this.#getElementStyle(path),
            });
        });

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

    static #getElementStyle(element) {
        return {
            fill: element.getAttribute("fill"),
            stroke: element.getAttribute("stroke"),
            strokeWidth: element.getAttribute("stroke-width"),
            opacity: element.getAttribute("opacity"),
        };
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
