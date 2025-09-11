import { environment } from "./environments/environment.js";

class SvgService {
  constructor() {}

  static loadSprites() {
    return Promise.all([
      this.#loadSprite("regular"),
      this.#loadSprite("solid"),
      this.#loadSprite("brands"),
    ]).catch((e) => {
      console.error("Failed to load font awesome sprites");
      console.error(e);
    });
  }

  static #loadSprite(spriteName) {
    return new Promise((resolve, reject) => {
      const ajax = new XMLHttpRequest();
      ajax.open(
        "GET",
        environment.faSvgSpritesPath + spriteName + ".svg",
        true
      );
      ajax.send();
      ajax.onload = function (e) {
        document.body.insertAdjacentHTML("beforeend", ajax.responseText);
        resolve();
      };
      ajax.onerror = function (e) {
        reject(e);
      };
    });
  }

  /**
   * Loads the SVG string for the given icon from the given section.
   * @param {string} section - The section to load the SVG from.
   * @param {string} name - The name of the icon to load the SVG for.
   */
  static loadSvg(section, name) {
    const ajax = new XMLHttpRequest();
    ajax.open(
      "GET",
      environment.faSvgPath + section + "/" + spriteName + ".svg",
      true
    );
    ajax.send();
    ajax.onload = function (e) {
      const svgContent = Utils.escapeHtml(ajax.responseText);
      resolve(svgContent);
    };
    ajax.onerror = function (e) {
      reject(e);
    };
  }
}

export { SvgService };
