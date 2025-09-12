class SearchFilter {
  #catalogOfIcons;
  #filteredCatalog;
  #onFilterCallback;

  constructor(catalogOfIcons) {
    this.#catalogOfIcons = catalogOfIcons;
    this.input = document.getElementById("searchFilter");
    this.input.addEventListener("input", this.#onInput.bind(this));
  }

  reset() {
    if (this.input.value !== "") {
      this.input.value = "";
      this.#filteredCatalog = this.#catalogOfIcons;
    }
  }

  setOnFilterCallback(callback) {
    this.#onFilterCallback = callback;
  }

  #onInput(e) {
    const value = e.target.value.slice().toLowerCase();
    if (value === "") {
      this.#filteredCatalog = this.#catalogOfIcons;
    } else {
      this.#filteredCatalog = this.#catalogOfIcons
        .slice()
        .map((categoryInfo) => {
          let icons = categoryInfo.icons.filter((icon) =>
            icon.name.toLowerCase().includes(value)
          );
          return { ...categoryInfo, ...{ icons } };
        });
    }
    this.#onFilterCallback(this.#filteredCatalog);
  }
}

export { SearchFilter };
