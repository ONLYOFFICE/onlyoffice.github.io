import { environment } from "../environments/environment.js";

class SvgLoader {
    constructor() {}

    static loadSprites() {
        return Promise.all([
            this.#loadSprite("regular"),
            this.#loadSprite("solid"),
            this.#loadSprite("brands"),
        ]);
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
                document.body.insertAdjacentHTML(
                    "beforeend",
                    ajax.responseText
                );
                resolve();
            };
            ajax.onerror = function (e) {
                reject(e);
            };
        });
    }

    static loadSvgs(selectedIcons) {
        return Promise.all(
            [...selectedIcons].map((item) => this.#loadSvg(item[1], item[0]))
        );
    }

    /**
     * Loads the SVG string for the given icon from the given section.
     * @param {string} section - The section to load the SVG from.
     * @param {string} name - The name of the icon to load the SVG for.
     */
    static #loadSvg(section, name) {
        return new Promise((resolve, reject) => {
            const ajax = new XMLHttpRequest();
            ajax.open(
                "GET",
                environment.faSvgPath + section + "/" + name + ".svg",
                true
            );
            ajax.send();
            ajax.onload = function (e) {
                resolve(ajax.responseText);
            };
            ajax.onerror = function (e) {
                reject(e);
            };
        });
    }
}

export { SvgLoader };
