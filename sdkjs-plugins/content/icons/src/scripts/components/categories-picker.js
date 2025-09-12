class CategoriesPicker {
  #container;
  #onSelectCategoryCallback = () => {};
  #selectedCategory = "";

  constructor(catalogOfIcons, containerId) {
    this.#container = document.getElementById(containerId);
    this.#addEventListener();
    this.#show(catalogOfIcons);
  }

  #show(catalogOfIcons) {
    this.#selectedCategory = "";
    const fragment = document.createDocumentFragment();

    catalogOfIcons.forEach((categoryInfo) => {
      let id = categoryInfo.id;
      let label = categoryInfo.label;

      const categoryContainer = document.createElement("div");
      fragment.appendChild(categoryContainer);

      categoryContainer.className = "category";
      const categoryName = document.createElement("span");
      categoryContainer.appendChild(categoryName);
      categoryName.textContent = label;
      categoryName.setAttribute("data-id", id);
      categoryName.className = "category-name";
    });

    this.#container.appendChild(fragment);
  }

  reset() {
    if (this.#selectedCategory !== "") {
      this.#selectedCategory = "";
      this.#container
        .querySelectorAll(".category.selected")
        .forEach((category) => {
          category.classList.remove("selected");
        });
    }
  }

  /**
   * Set the callback function to be called when a category is selected.
   * The callback function will receive the name of the selected category as a parameter.
   * @param {function} callback - The callback function to be called when a category is selected
   */
  setOnSelectCategoryCallback(callback) {
    this.#onSelectCategoryCallback = callback;
  }

  #addEventListener() {
    this.#container.addEventListener("click", (e) => {
      const categoryName = e.target.closest(".category-name");
      if (categoryName) {
        let id = categoryName.getAttribute("data-id");
        let category = categoryName.parentElement;
        let wasSelected = category.classList.contains("selected");

        this.#container
          .querySelectorAll(".category.selected")
          .forEach((category) => {
            category.classList.remove("selected");
          });

        if (wasSelected) {
          category.classList.remove("selected");
          this.#selectedCategory = "";
        } else {
          category.classList.add("selected");
          this.#selectedCategory = id;
        }
        this.#onSelectCategoryCallback(this.#selectedCategory);
      }
    });
  }
}

export { CategoriesPicker };
