class IconPicker {
  #container;
  #listOfIconNames;

  constructor(catalogOfIcons, containerId) {
    this.#container = document.getElementById(containerId);
    this.#addEventListener();
    this.show(catalogOfIcons);
  }

  show(catalogOfIcons, categoryId = "") {
    this.#listOfIconNames = new Set();
    this.#container.textContent = "";
    const fragment = document.createDocumentFragment();
    const iconsContainer = document.createElement("div");
    fragment.appendChild(iconsContainer);
    iconsContainer.className = "icons";

    catalogOfIcons.forEach((categoryInfo) => {
      let id = categoryInfo.id;
      let icons = categoryInfo.icons;
      if (categoryId !== "" && categoryId !== id) {
        return;
      }

      icons.forEach((icon) => {
        if (this.#listOfIconNames.has(icon.name)) {
          return;
        }
        this.#listOfIconNames.add(icon.name);
        let img = this.#createIcon(icon.name, icon.folder);
        iconsContainer.appendChild(img);
      });
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
