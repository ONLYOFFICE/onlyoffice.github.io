import { FA_CATEGORIES } from "./categories.js";

const FA_SVG_PATH = "./resources/font-awesome/sprites-full/";

class IconTree {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  async buildTree() {
    Promise.all([
      this.#loadSprite("regular"),
      this.#loadSprite("solid"),
      this.#loadSprite("brands"),
    ]).catch((e) => {
      console.error("Failed to load font awesome sprites");
      console.error(e);
    });

    const fragment = document.createDocumentFragment();
    const categories = document.createElement("div");
    fragment.appendChild(categories);
    categories.className = "categories";

    FA_CATEGORIES.forEach((categoryInfo) => {
      let label = categoryInfo.label;
      let icons = categoryInfo.icons;
      const categoryContainer = document.createElement("div");
      categories.appendChild(categoryContainer);

      categoryContainer.className = "category collapsed";
      const categoryName = document.createElement("span");
      categoryContainer.appendChild(categoryName);
      categoryName.textContent = label;
      categoryName.className = "category-name";
      categoryName.onclick = (e) => {
        categoryContainer.classList.toggle("collapsed");
      };

      const iconsContainer = document.createElement("div");
      categoryContainer.appendChild(iconsContainer);
      iconsContainer.className = "icons";
      for (let i = 0; i < icons.length; i++) {
        let icon = icons[i];
        let img = this.#createIcon(icon.name);
        iconsContainer.appendChild(img);
      }
    });

    this.container.appendChild(fragment);
  }

  #createIcon(iconId) {
    const svgNS = "http://www.w3.org/2000/svg";
    const xlinkNS = "http://www.w3.org/1999/xlink";

    const fragment = document.createDocumentFragment();
    const svg = document.createElementNS(svgNS, "svg");
    fragment.appendChild(svg);
    svg.setAttribute("class", "icon");
    svg.setAttribute("role", "img");
   
    const title = document.createElementNS(svgNS, "title");
    svg.appendChild(title);
    title.textContent = iconId;

    const use = document.createElementNS(svgNS, "use");
    svg.appendChild(use);
    use.setAttributeNS(xlinkNS, "xlink:href", `#${iconId}`);
    use.setAttribute("href", `#${iconId}`);

    return fragment;
  }

  #loadSprite(spriteName) {
    return new Promise((resolve, reject) => {
      const ajax = new XMLHttpRequest();
      ajax.open("GET", FA_SVG_PATH + spriteName + ".svg", true);
      ajax.send();
      ajax.onload = function (e) {
        document.body.insertAdjacentHTML("afterbegin", ajax.responseText);
        resolve();
      };
      ajax.onerror = function (e) {
        reject(e);
      };
    });
  }
}

export { IconTree };
