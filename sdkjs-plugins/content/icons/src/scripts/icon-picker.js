import { FA_CATEGORIES } from "./environments/categories.js";

class IconPicker {
  #container;

  constructor(containerId) {
    this.#container = document.getElementById(containerId);
    this.#addEventListener();
  }

  /**
   * Populate the container element with all icons from the given category.
   * If no category is provided, all icons will be shown.
   * @param {string} [categoryId=''] - the name of the category to show
   */
  async show(categoryId = "") {
    this.#container.textContent = "";
    const fragment = document.createDocumentFragment();
    const iconsContainer = document.createElement("div");
    fragment.appendChild(iconsContainer);
    iconsContainer.className = "icons";

    FA_CATEGORIES.forEach((categoryInfo) => {
      let id = categoryInfo.id;
      let label = categoryInfo.label;
      let icons = categoryInfo.icons;
      console.log(categoryId);
      if (categoryId !== "" && categoryId !== id) {
        return;
      }
      setTimeout(() => {
        for (let i = 0; i < icons.length; i++) {
          let icon = icons[i];
          let img = this.#createIcon(icon.name, icon.folder);
          iconsContainer.appendChild(img);
        }
      }, 50);
    });

    this.#container.appendChild(fragment);
  }

  #addEventListener() {
    this.#container.addEventListener("click", (e) => {
      const icon = e.target.closest(".icon");
      if (icon) {
        let iconId = icon.getAttribute("data-name");
        let section = icon.getAttribute("data-section");
        console.log(section, iconId);
        icon.classList.toggle("selected");
      }
    });
  }

  #createIcon(iconId, section) {
    const svgNS = "http://www.w3.org/2000/svg";
    const xlinkNS = "http://www.w3.org/1999/xlink";

    const fragment = document.createDocumentFragment();
    const svg = document.createElementNS(svgNS, "svg");
    fragment.appendChild(svg);
    svg.setAttribute("class", "icon");
    svg.setAttribute("role", "img");
    svg.setAttribute("data-name", iconId);
    svg.setAttribute("data-section", section);

    const title = document.createElementNS(svgNS, "title");
    svg.appendChild(title);
    title.textContent = iconId;

    const use = document.createElementNS(svgNS, "use");
    svg.appendChild(use);
    use.setAttributeNS(xlinkNS, "xlink:href", `#${iconId}`);
    use.setAttribute("href", `#${iconId}`);

    return fragment;
  }
}

export { IconPicker };
