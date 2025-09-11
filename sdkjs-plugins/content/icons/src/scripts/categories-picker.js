import { FA_CATEGORIES } from "./environments/categories.js";

class CategoriesPicker {
  #container;
  #onSelectCategoryCallback;

  constructor(containerId) {
    this.selectedCategory = "";
    this.#container = document.getElementById(containerId);
    this.#addEventListener();
  }

  show() {
    this.selectedCategory = "";
    const fragment = document.createDocumentFragment();
    const categories = document.createElement("div");
    fragment.appendChild(categories);
    categories.className = "categories";

    FA_CATEGORIES.forEach((categoryInfo) => {
      let id = categoryInfo.id;
      let label = categoryInfo.label;

      const categoryContainer = document.createElement("div");
      categories.appendChild(categoryContainer);

      categoryContainer.className = "category";
      const categoryName = document.createElement("span");
      categoryContainer.appendChild(categoryName);
      categoryName.textContent = label;
      categoryName.setAttribute("data-id", id);
      categoryName.className = "category-name";
    });

    this.#container.appendChild(fragment);
  }

  /**
   * Set the callback function to be called when a category is selected.
   * The callback function will receive the name of the selected category as a parameter.
   * @param {function} callback - The callback function to be called when a category is selected
   */
  setOnSelectCategoryCallback(callback) {
    this.#onSelectCategoryCallback = callback;
  }

  #onCategorySelect(categoryName) {
    this.#onSelectCategoryCallback(categoryName);
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
          this.selectedCategory = "";
          this.#onCategorySelect("");
        } else {
          category.classList.add("selected");
          this.selectedCategory = id;
        }
        this.#onCategorySelect(this.selectedCategory);
      }
    });
  }
}

export { CategoriesPicker };
