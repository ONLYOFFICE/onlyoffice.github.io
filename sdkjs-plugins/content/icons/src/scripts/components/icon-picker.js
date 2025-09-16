class IconPicker {
    #container;
    #onSelectIconCallback = () => {};
    #listOfIconNames;
    #selectedIcons;
    #clearSelectionButton;

    constructor(catalogOfIcons) {
        this.#container = document.getElementById("icons");
        this.#clearSelectionButton = document.getElementById("clear");
        this.#addEventListener();
        this.show(catalogOfIcons);
    }

    show(catalogOfIcons, categoryId = "") {
        this.#listOfIconNames = new Set();
        this.#selectedIcons = new Map();
        this.#container.textContent = "";
        const fragment = document.createDocumentFragment();

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
                fragment.appendChild(img);
            });
            this.#onChange();
        });

        this.#container.appendChild(fragment);
    }

    setOnSelectIconCallback(callback) {
        this.#onSelectIconCallback = callback;
    }

    #addEventListener() {
        this.#container.addEventListener("click", (e) => {
            const icon = e.target.closest(".icon");
            if (icon) {
                let iconId = icon.getAttribute("data-name");
                let section = icon.getAttribute("data-section");
                if (this.#selectedIcons.has(iconId)) {
                    icon.classList.remove("selected");
                    this.#selectedIcons.delete(iconId);
                } else {
                    icon.classList.add("selected");
                    this.#selectedIcons.set(iconId, section);
                }
                this.#onChange();
            }
        });
        this.#container.addEventListener("dblclick", (e) => {
            const icon = e.target.closest(".icon");
            if (icon) {
                let iconId = icon.getAttribute("data-name");
                let section = icon.getAttribute("data-section");
                icon.classList.add("selected");
                this.#selectedIcons.set(iconId, section);
                const needToRun = true;
                this.#onSelectIconCallback(this.#selectedIcons, needToRun);
            }
        });
        this.#clearSelectionButton.addEventListener(
            "click",
            this.#unselectAll.bind(this)
        );
    }

    #unselectAll() {
        this.#selectedIcons = new Map();
        this.#container.querySelectorAll(".icon.selected").forEach((icon) => {
            icon.classList.remove("selected");
        });
        this.#onChange();
    }

    #onChange() {
        const total = this.#listOfIconNames.size;
        const selected =
            this.#container.querySelectorAll(".icon.selected").length;
        document.getElementById(
            "total"
        ).textContent = `${total} icons, ${selected} selected`;

        this.#onSelectIconCallback(this.#selectedIcons);
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
