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
    // Paths
    svgDoc.querySelectorAll("path").forEach((path) => {
      let pathParser = new SVGPathParser(path.getAttribute("d"));
      elements.push({
        type: "path",
        d: pathParser.parse(),
        style: this.#getElementStyle(path),
      });
    });

    // Circles
    svgDoc.querySelectorAll("circle").forEach((circle) => {
      elements.push({
        type: "circle",
        cx: circle.getAttribute("cx"),
        cy: circle.getAttribute("cy"),
        r: circle.getAttribute("r"),
        style: this.#getElementStyle(circle),
      });
    });

    // Rectangles
    svgDoc.querySelectorAll("rect").forEach((rect) => {
      elements.push({
        type: "rect",
        x: rect.getAttribute("x"),
        y: rect.getAttribute("y"),
        width: rect.getAttribute("width"),
        height: rect.getAttribute("height"),
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
}

export { SvgParser };
