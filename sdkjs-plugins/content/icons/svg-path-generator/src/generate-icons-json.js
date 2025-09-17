const yaml = require("js-yaml");
const fs = require("fs-extra");
const path = require("path");
const { glob } = require("glob");

async function generateIconsJson() {
    try {
        const FA_SVGS_FOLDER = "../resources/font-awesome/svgs-full/";
        const CATEGORIES_FILE = "../resources/font-awesome/categories.yml";
        const OUTPUT_DIR = "../src/scripts/environments/";
        const OUTPUT_FILE = "categories.js";

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

        const categories = [];

        let lostIcons = 0;
        let totalIcons = 0;

        for (const [categoryId, categoryData] of Object.entries(
            categoriesData
        )) {
            const category = {
                id: categoryId,
                label: categoryData.label || categoryId,
                folders: [],
                icons: [],
            };

            // Processing category icons
            if (categoryData.icons && Array.isArray(categoryData.icons)) {
                for (const iconName of categoryData.icons) {
                    const iconPath = existingIcons.get(iconName);
                    const dirname = path.dirname(iconPath);
                    const folderName = path.relative(FA_SVGS_FOLDER, dirname);

                    if (iconPath) {
                        let folderIndex = category.folders.indexOf(folderName);
                        if (folderIndex === -1) {
                            folderIndex = category.folders.length;
                            category.folders.push(folderName);
                            category.icons.push([]);
                        }

                        category.icons[folderIndex].push(iconName);
                    } else {
                        lostIcons++;
                        console.warn(
                            `⚠️ Icon "${iconName}" not found in category "${category.label}"`
                        );
                    }
                    totalIcons++;
                }
            }

            categories.push(category);
        }

        // Save the result
        const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
        const fileContent = `export const FA_CATEGORIES = ${JSON.stringify(
            categories,
            null,
            2
        )}`;
        fs.writeFile(outputPath, fileContent, (err) => {
            if (err) {
                console.error("❌ Error:", err);
            } else {
                console.log(`✅ ${OUTPUT_FILE} successfully created!`);
            }
        });

        console.log(
            `📊 Found ${totalIcons - lostIcons} of ${totalIcons} icons`
        );
        console.log(`📁 ${categories.length} categories processed`);
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

generateIconsJson();
