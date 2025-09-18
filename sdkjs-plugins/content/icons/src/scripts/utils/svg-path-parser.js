import { convertSingleArcToCubics } from "./svg-arc-to-cubic-bezier.js";

class SVGPathParser {
    #pathString;
    #commands;
    #currentX;
    #currentY;

    constructor(pathString) {
        this.#pathString = pathString;
        this.#currentX = 0;
        this.#currentY = 0;
        this.#commands = [];
    }

    parse() {
        const commandRegex = /([MLHVCSQTAZ])([^MLHVCSQTAZ]*)/gi;
        let match;

        while ((match = commandRegex.exec(this.#pathString)) !== null) {
            const command = match[1];
            const params = match[2]
                .trim()
                .replaceAll(/(\d)-/g, "$1 -")
                .split(/[\s,]+/)
                .filter((p) => p !== "")
                .map(parseFloat);

            this.#processCommand(command, params);
        }

        return this.#commands;
    }

    #processCommand(command, params) {
        switch (command.toUpperCase()) {
            case "M":
                this.#handleMoveto(command, params);
                break;
            case "L":
                this.#handleLineto(command, params);
                break;
            case "H":
                this.#handleHorizontalLineto(command, params);
                break;
            case "V":
                this.#handleVerticalLineto(command, params);
                break;
            case "C":
                this.#handleCubicBezier(command, params);
                break;
            case "Q":
                this.#handleQuadraticBezier(command, params);
                break;
            case "S":
                this.#handleSmoothCubicBezier(command, params);
                break;
            case "T":
                this.#handleSmoothQuadraticBezier(command, params);
                break;
            case "A":
                this.#handleEllipticalArc(command, params);
                break;
            case "Z":
                this.#handleClosepath();
                break;
        }
    }

    #handleMoveto(command, params) {
        for (let i = 0; i < params.length; i += 2) {
            let x = params[i];
            let y = params[i + 1];
            const absolute = command === "M";

            if (!absolute) {
                x += this.#currentX;
                y += this.#currentY;
            }

            this.#currentX = x;
            this.#currentY = y;

            this.#commands.push({
                type: "moveto",
                x: x,
                y: y,
                absolute,
            });
        }
    }

    #handleLineto(command, params) {
        for (let i = 0; i < params.length; i += 2) {
            let x = params[i];
            let y = params[i + 1];

            if (command === "l") {
                // relative
                x += this.#currentX;
                y += this.#currentY;
            }

            this.#commands.push({
                type: "lineto",
                x: x,
                y: y,
                absolute: command === "L",
            });

            this.#currentX = x;
            this.#currentY = y;
        }
    }

    #handleHorizontalLineto(command, params) {
        params.forEach((param) => {
            let x = param;

            if (command === "h") {
                // relative
                x += this.#currentX;
            }

            this.#commands.push({
                type: "lineto",
                x: x,
                y: this.#currentY,
                absolute: command === "H",
                isHorizontal: true,
            });

            this.#currentX = x;
        });
    }

    #handleVerticalLineto(command, params) {
        params.forEach((param) => {
            let y = param;

            if (command === "v") {
                // relative
                y += this.#currentY;
            }

            this.#commands.push({
                type: "lineto",
                x: this.#currentX,
                y: y,
                absolute: command === "V",
                isVertical: true,
            });

            this.#currentY = y;
        });
    }

    #handleCubicBezier(command, params) {
        for (let i = 0; i < params.length; i += 6) {
            let x1 = params[i];
            let y1 = params[i + 1];
            let x2 = params[i + 2];
            let y2 = params[i + 3];
            let x = params[i + 4];
            let y = params[i + 5];
            const absolute = command === "C";

            if (!absolute) {
                x1 += this.#currentX;
                y1 += this.#currentY;
                x2 += this.#currentX;
                y2 += this.#currentY;
                x += this.#currentX;
                y += this.#currentY;
            }

            this.#commands.push({
                type: "cubicBezier",
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                x: x,
                y: y,
                absolute,
            });

            this.#currentX = x;
            this.#currentY = y;
        }
    }

    #handleQuadraticBezier(command, params) {
        for (let i = 0; i < params.length; i += 4) {
            let x1 = params[i];
            let y1 = params[i + 1];
            let x = params[i + 2];
            let y = params[i + 3];

            if (command === "q") {
                // relative
                x1 += this.#currentX;
                y1 += this.#currentY;
                x += this.#currentX;
                y += this.#currentY;
            }

            this.#commands.push({
                type: "quadraticBezier",
                x1: x1,
                y1: y1,
                x2: x,
                y2: y,
                absolute: command === "Q",
            });

            this.#currentX = x;
            this.#currentY = y;
        }
    }

    #handleSmoothCubicBezier(command, params) {
        for (let i = 0; i < params.length; i += 4) {
            let x2 = params[i];
            let y2 = params[i + 1];
            let x = params[i + 2];
            let y = params[i + 3];
            const absolute = command === "S";

            let x1 = this.#currentX;
            let y1 = this.#currentY;

            if (!absolute) {
                x2 += this.#currentX;
                y2 += this.#currentY;
                x += this.#currentX;
                y += this.#currentY;
            }
            if (
                this.#commands[this.#commands.length - 1].type === "cubicBezier"
            ) {
                x1 = 2 * x1 - this.#commands[this.#commands.length - 1].x2;
                y1 = 2 * y1 - this.#commands[this.#commands.length - 1].y2;
            }

            this.#commands.push({
                type: "cubicBezier",
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                x: x,
                y: y,
                absolute,
                isSmooth: true,
            });

            this.#currentX = x;
            this.#currentY = y;
        }
    }

    #handleSmoothQuadraticBezier(command, params) {
        for (let i = 0; i < params.length; i += 2) {
            let x = params[i];
            let y = params[i + 1];

            if (command === "t") {
                // relative
                x += this.#currentX;
                y += this.#currentY;
            }

            this.#commands.push({
                type: "quadraticBezier",
                x1: x1,
                y1: y1,
                x2: x,
                y2: y,
                absolute: command === "T",
                isSmooth: true,
            });

            this.#currentX = x;
            this.#currentY = y;
        }
    }

    #handleEllipticalArc(command, params) {
        for (let i = 0; i < params.length; i += 7) {
            const absolute = command === "A";
            const rx = params[i];
            const ry = params[i + 1];
            const rotation = params[i + 2];
            const largeArc = params[i + 3];
            const sweep = params[i + 4];
            let x = params[i + 5];
            let y = params[i + 6];

            const bezierCommands = convertSingleArcToCubics(
                rx,
                ry,
                rotation,
                largeArc,
                sweep,
                x,
                y,
                this.#currentX,
                this.#currentY
            );

            bezierCommands.forEach((command) => {
                this.#commands.push(command);
            });

            this.#currentX += x;
            this.#currentY += y;
        }
    }

    #handleClosepath() {
        this.#commands.push({
            type: "closepath",
        });
    }
}

export { SVGPathParser };
