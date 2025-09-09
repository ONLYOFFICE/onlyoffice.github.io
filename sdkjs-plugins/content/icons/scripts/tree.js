const ICON_EXTENSIONS = [".svg", ".png", ".jpg", ".jpeg", ".ico", ".gif"];
const EXCLUDE_DIRS = ["node_modules", ".git", "dist", "build"];

class IconTree {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  async buildTree(path = "./resources/font-awesome/mix") {
    const categories = document.createElement("div");
    categories.className = "categories";

    Object.values(FA_CATEGORIES).forEach((cat) => {
      let label = cat.label;
      let icons = cat.icons;
      const category = document.createElement("div");
      category.className = "category collapsed";
      category.textContent = label;
      category.onclick = (e) => {
        e.stopPropagation();
        category.classList.toggle("collapsed");
      };

      for (let i = 0; i < icons.length; i++) {
        let icon = icons[i];
        const fullPath = `${path}/${icon}.svg`;
        let img = this.createIconPreview(category, fullPath);
        category.appendChild(img);
      }

      categories.appendChild(category);
    });

    this.container.appendChild(categories);

    return categories;
  }

  createIconPreview(li, path, title) {
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
