const ICON_EXTENSIONS = [".svg", ".png", ".jpg", ".jpeg", ".ico", ".gif"];
const EXCLUDE_DIRS = ["node_modules", ".git", "dist", "build"];

class IconTree {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  async buildTree(path = "./resources/font-awesome/svgs-full/") {
    const categories = document.createElement("div");
    categories.className = "categories";

    FA_CATEGORIES.forEach((categoryInfo) => {
      let label = categoryInfo.label;
      let icons = categoryInfo.icons;
      const category = document.createElement("div");
      category.className = "category collapsed";
      category.textContent = label;
      category.onclick = (e) => {
        e.stopPropagation();
        category.classList.toggle("collapsed");
      };

      for (let i = 0; i < icons.length; i++) {
        let icon = icons[i];
        const fullPath = `${path}${icon.folder}/${icon.name}.svg`;
        let img = this.createIconPreview(fullPath, icon.name);
        category.appendChild(img);
      }

      categories.appendChild(category);
    });

    this.container.appendChild(categories);

    return categories;
  }

  createIconPreview(path, title) {
    const preview = document.createElement("div");
    preview.className = "icon";

    const img = document.createElement("img");
    img.src = path;
    img.title = title;
    img.alt = title;
    preview.appendChild(img);

    return preview;
  }
}
