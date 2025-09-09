const yaml = require("js-yaml");
const fs = require("fs-extra");
const path = require("path");
const { glob } = require("glob");

async function generateIconsJson() {
  try {
    const FA_SVGS_FOLDER = "../resources/font-awesome/svgs-full/";
    const CATEGORIES_FILE = "../resources/font-awesome/categories.yml";
    const OUTPUT_DIR = "../resources/font-awesome/";
    const OUTPUT_FILE = "paths.json";

    // Get all SVG files in folder svgs-full
    const svgFiles = await glob(FA_SVGS_FOLDER + "**/*.svg");

    const yamlContent = await fs.readFile(CATEGORIES_FILE, "utf8");
    const categoriesData = yaml.load(yamlContent);

    // Create a map of existing files for quick search
    const existingIcons = new Map();
    [...svgFiles].reverse().forEach((file) => {
      const fileName = path.basename(file, ".svg");
      existingIcons.set(fileName, file);
    });

    const result = {
      generated: new Date().toISOString(),
      categories: [],
    };

    let lostIcons = 0;

    for (const [categoryId, categoryData] of Object.entries(categoriesData)) {
      const category = {
        id: categoryId,
        label: categoryData.label || categoryId,
        icons: [],
      };

      // Processing category icons
      if (categoryData.icons && Array.isArray(categoryData.icons)) {
        for (const iconName of categoryData.icons) {
          const iconPath = existingIcons.get(iconName);
          const dirname = path.dirname(iconPath);
          const folderName = path.relative(FA_SVGS_FOLDER, dirname);

          if (iconPath) {
            category.icons.push({
              name: iconName,
              folder: folderName,
            });
          } else {
            lostIcons++;
            console.warn(
              `⚠️ Icon "${iconName}" not found in category "${category.label}"`
            );
          }
        }
      }

      result.categories.push(category);
    }

    // Save the result in JSON
    const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
    await fs.writeJson(outputPath, result, { spaces: 2 });
    console.log(`✅ ${OUTPUT_FILE} successfully created!`);

    // Statistics
    const totalIcons = result.categories.reduce(
      (sum, category) => sum + category.icons.length,
      0
    );

    console.log(`📊 Found ${totalIcons - lostIcons} of ${totalIcons} icons`);
    console.log(`📁 ${result.categories.length} categories processed`);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

generateIconsJson();
