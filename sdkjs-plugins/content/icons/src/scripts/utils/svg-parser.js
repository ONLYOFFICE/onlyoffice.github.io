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

    static #circleToCubicBezierCommands(circle, segments = 60) {
        const cx = parseFloat(circle.cx);
        const cy = parseFloat(circle.cy);
        const r = parseFloat(circle.r);

        const commands = [];
        const angleStep = (2 * Math.PI) / segments;

        const k = (4 / 3) * Math.tan(Math.PI / (2 * segments)) * r;

        const startAngle = 0;
        const startX = cx + r * Math.cos(startAngle);
        const startY = cy + r * Math.sin(startAngle);
        commands.push(`M ${startX} ${startY}`);

        for (let i = 0; i < segments; i++) {
            const angle1 = (i + 0.5) * angleStep;
            const angle2 = (i + 1) * angleStep;

            const controlAngle1 = i * angleStep;
            const controlAngle2 = (i + 0.5) * angleStep;

            const cp1x =
                cx +
                r * Math.cos(controlAngle1) +
                k * Math.cos(controlAngle1 - Math.PI / 2);
            const cp1y =
                cy +
                r * Math.sin(controlAngle1) +
                k * Math.sin(controlAngle1 - Math.PI / 2);

            const cp2x =
                cx +
                r * Math.cos(controlAngle2) +
                k * Math.cos(controlAngle2 - Math.PI / 2);
            const cp2y =
                cy +
                r * Math.sin(controlAngle2) +
                k * Math.sin(controlAngle2 - Math.PI / 2);

            const endX = cx + r * Math.cos(angle2);
            const endY = cy + r * Math.sin(angle2);

            commands.push(
                `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`
            );
        }

        commands.push("Z");
        return commands.join(" ");
    }

    static #circleToQuadraticCommands(circle, segments = 60) {
        const cx = parseFloat(circle.cx);
        const cy = parseFloat(circle.cy);
        const r = parseFloat(circle.r);

        const commands = [];
        const angleStep = (2 * Math.PI) / segments;
        const k = (4 / 3) * Math.tan(Math.PI / (2 * segments)) * r;

        const startX = cx + r * Math.cos(0);
        const startY = cy + r * Math.sin(0);
        commands.push(`M ${startX} ${startY}`);

        for (let i = 1; i <= segments; i++) {
            const angle = i * angleStep;
            const controlAngle = (i - 0.5) * angleStep;

            const cpx =
                cx +
                r * Math.cos(controlAngle) +
                k * Math.cos(controlAngle - Math.PI / 2);
            const cpy =
                cy +
                r * Math.sin(controlAngle) +
                k * Math.sin(controlAngle - Math.PI / 2);

            const endX = cx + r * Math.cos(angle);
            const endY = cy + r * Math.sin(angle);

            commands.push(`Q ${cpx} ${cpy}, ${endX} ${endY}`);
        }

        commands.push("Z");
        return commands.join(" ");
    }
}

export { SvgParser };
