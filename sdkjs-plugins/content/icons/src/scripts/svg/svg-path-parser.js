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

      const x2 = x1;
      const y2 = y1;

      this.#commands.push({
        type: "cubicBezier",
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        x: x,
        y: y,
        absolute: command === "Q",
        fromQuadratic: true,
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

      const x1 = this.#currentX;
      const y1 = this.#currentY;

      this.#commands.push({
        type: "cubicBezier",
        x1: x1,
        y1: y1,
        x2: x1,
        y2: y1,
        x: x,
        y: y,
        absolute: command === "T",
        isSmooth: true,
        fromQuadratic: true,
      });

      this.#currentX = x;
      this.#currentY = y;
    }
  }

  #handleEllipticalArc(command, params) {
    for (let i = 0; i < params.length; i += 7) {
      let rx = params[i];
      let ry = params[i + 1];
      let rotation = params[i + 2];
      let largeArc = params[i + 3];
      let sweep = params[i + 4];
      let x = params[i + 5];
      let y = params[i + 6];

      if (command === "a") {
        // relative
        x += this.#currentX;
        y += this.#currentY;
      }

      this.#commands.push({
        type: "arc",
        rx: rx,
        ry: ry,
        rotation: rotation,
        largeArc: largeArc,
        sweep: sweep,
        x: x,
        y: y,
        absolute: command === "A",
      });

      this.#currentX = x;
      this.#currentY = y;
    }
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
