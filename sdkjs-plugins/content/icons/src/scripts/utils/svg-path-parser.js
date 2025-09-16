class SVGPathParser {
    #pathString;
    #commands;
    #startX;
    #startY;
    #currentX;
    #currentY;

    constructor(pathString) {
        this.#pathString = pathString;
        this.#currentX = 0;
        this.#currentY = 0;
        this.#startX = 0;
        this.#startY = 0;
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
            case "M": // moveto
                this.#handleMoveto(command, params);
                break;
            case "L": // lineto
                this.#handleLineto(command, params);
                break;
            case "H": // horizontal lineto
                this.#handleHorizontalLineto(command, params);
                break;
            case "V": // vertical lineto
                this.#handleVerticalLineto(command, params);
                break;
            case "C": // cubic Bézier
                this.#handleCubicBezier(command, params);
                break;
            case "Q": // quadratic Bézier
                this.#handleQuadraticBezier(command, params);
                break;
            case "S": // smooth cubic Bézier
                this.#handleSmoothCubicBezier(command, params);
                break;
            case "T": // smooth quadratic Bézier
                this.#handleSmoothQuadraticBezier(command, params);
                break;
            case "A": // elliptical arc
                this.#handleEllipticalArc(command, params);
                break;
            case "Z": // closepath
                this.#handleClosepath();
                break;
        }
    }

    #handleMoveto(command, params) {
        for (let i = 0; i < params.length; i += 2) {
            const x = params[i];
            const y = params[i + 1];

            if (i === 0) {
                this.#startX = x;
                this.#startY = y;
            }

            this.#currentX = x;
            this.#currentY = y;

            this.#commands.push({
                type: "moveto",
                x: x,
                y: y,
                absolute: command === "M",
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

            if (command === "c") {
                // relative
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
                absolute: command === "C",
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

            if (command === "s") {
                // relative
                x2 += this.#currentX;
                y2 += this.#currentY;
                x += this.#currentX;
                y += this.#currentY;
            }

            let x1 = this.#currentX;
            let y1 = this.#currentY;

            this.#commands.push({
                type: "cubicBezier",
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                x: x,
                y: y,
                absolute: command === "S",
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
        // TODO: Review how to handle elliptical arcs more correctly
        for (let i = 0; i < params.length; i += 7) {
            const absolute = command === "A";
            const rx = params[i];
            const ry = params[i + 1];
            const rotation = params[i + 2];
            const largeArc = params[i + 3];
            const sweep = params[i + 4];
            let x = params[i + 5];
            let y = params[i + 6];

            let startX = 0;
            let startY = 0;

            if (!absolute) {
                x += this.#currentX;
                y += this.#currentY;
                startX += this.#currentX;
                startY += this.#currentY;
            }
            const arc = {
                absolute,
                rx,
                ry,
                rotation,
                largeArc,
                sweep,
                x,
                y,
            };
            const canvasParams = this.#svgArcToCanvasArc(arc, startX, startY);
            this.#commands.push(canvasParams);

            this.#currentX = x;
            this.#currentY = y;
        }
    }

    #svgArcToCanvasArc(arc, startX, startY) {
        const { rx, ry, rotation, largeArc, sweep, x: endX, y: endY } = arc;

        const phi = (rotation * Math.PI) / 180;
        const x1 = startX;
        const y1 = startY;
        const x2 = endX;
        const y2 = endY;

        const dx = (x1 - x2) / 2;
        const dy = (y1 - y2) / 2;

        const x1_ = Math.cos(phi) * dx + Math.sin(phi) * dy;
        const y1_ = -Math.sin(phi) * dx + Math.cos(phi) * dy;

        let rx_ = Math.abs(rx);
        let ry_ = Math.abs(ry);

        const lambda = (x1_ * x1_) / (rx_ * rx_) + (y1_ * y1_) / (ry_ * ry_);
        if (lambda > 1) {
            rx_ *= Math.sqrt(lambda);
            ry_ *= Math.sqrt(lambda);
        }

        const sign = largeArc === sweep ? -1 : 1;
        const factor =
            sign *
            Math.sqrt(
                Math.max(
                    0,
                    (rx_ * rx_ * ry_ * ry_ -
                        rx_ * rx_ * y1_ * y1_ -
                        ry_ * ry_ * x1_ * x1_) /
                        (rx_ * rx_ * y1_ * y1_ + ry_ * ry_ * x1_ * x1_)
                )
            );

        const cx_ = (factor * (rx_ * y1_)) / ry_;
        const cy_ = (factor * (-ry_ * x1_)) / rx_;

        const cx = Math.cos(phi) * cx_ - Math.sin(phi) * cy_ + (x1 + x2) / 2;
        const cy = Math.sin(phi) * cx_ + Math.cos(phi) * cy_ + (y1 + y2) / 2;

        const vectorAngle = (ux, uy, vx, vy) => {
            const dot = ux * vx + uy * vy;
            const len =
                Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);
            const cos = Math.max(-1, Math.min(1, dot / len));
            const sign = ux * vy - uy * vx < 0 ? -1 : 1;
            return sign * Math.acos(cos);
        };

        const startVectorX = (x1_ - cx_) / rx_;
        const startVectorY = (y1_ - cy_) / ry_;
        const endVectorX = (-x1_ - cx_) / rx_;
        const endVectorY = (-y1_ - cy_) / ry_;

        let startAngle = vectorAngle(1, 0, startVectorX, startVectorY);
        let sweepAngle = vectorAngle(
            startVectorX,
            startVectorY,
            endVectorX,
            endVectorY
        );

        if (sweep === 0 && sweepAngle > 0) {
            sweepAngle -= 2 * Math.PI;
        } else if (sweep === 1 && sweepAngle < 0) {
            sweepAngle += 2 * Math.PI;
        }

        startAngle = (startAngle * 180) / Math.PI;
        sweepAngle = (sweepAngle * 180) / Math.PI;

        startAngle = ((startAngle % 360) + 360) % 360;
        if (sweepAngle > 360) sweepAngle = 360;
        if (sweepAngle < -360) sweepAngle = -360;

        return {
            type: "arc",
            absolute: arc.absolute,
            wR: rx_,
            hR: ry_,
            stAng: startAngle,
            swAng: sweepAngle,
        };
    }

    #handleClosepath() {
        this.#commands.push({
            type: "closepath",
        });
        this.#currentX = this.#startX;
        this.#currentY = this.#startY;
    }
}

export { SVGPathParser };
