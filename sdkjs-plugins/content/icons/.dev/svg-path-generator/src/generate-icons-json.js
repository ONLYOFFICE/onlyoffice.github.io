const yaml = require("js-yaml");
const fs = require("fs-extra");
const path = require("path");
const { glob } = require("glob");
const { exec } = require("child_process");

const FA_FOLDER = "../../resources/font-awesome/";
const FA_SVGS_FOLDER = FA_FOLDER + "svgs-full/";
const FA_SPRITES_FULL_FOLDER = FA_FOLDER + "sprites-full/";
const CATEGORIES_FILE = FA_FOLDER + "categories.yml";
const OUTPUT_DIR = "../../src/js/environments/";
const OUTPUT_FILE = "categories.js";
const LICENSE = "../../LICENSE";
const REPO_URL = "https://github.com/FortAwesome/Font-Awesome.git";
const REPO_DEST_FOLDER = "temp-repo";
const SVGS_FULL_TEMP_FOLDER = "./" + REPO_DEST_FOLDER + "/svgs-full";
const SPRITES_FULL_TEMP_FOLDER = "./" + REPO_DEST_FOLDER + "/sprites-full";
const CATEGORIES_TEMP_FILE =
    "./" + REPO_DEST_FOLDER + "/metadata/categories.yml";

function cloneRepository() {
    return new Promise((resolve, reject) => {
        exec(
            `git clone ${REPO_URL} ${REPO_DEST_FOLDER}`,
            (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve({ stdout, stderr });
            }
        );
    });
}

async function copyDir(src, dest) {
    try {
        await fs.copy(src, dest);
    } catch (err) {
        console.error("Failed to copy directory:", src);
        console.error("Error:", err);
    }
}

async function copyFile(source, destination) {
    try {
        if (destination.endsWith("/") || !path.extname(destination)) {
            const fileName = path.basename(source);
            destination = path.join(destination, fileName);
        }
        await fs.mkdir(path.dirname(destination), { recursive: true });
        await fs.cp(source, destination, { recursive: true });
    } catch (err) {
        console.error("Failed to copy file:", err);
        throw err;
    }
}

async function updateLocalFiles() {
    try {
        await cloneRepository();
        console.log(`Copied: ${REPO_URL}`);
        await fs.ensureDir(FA_SVGS_FOLDER);
        await copyDir(SVGS_FULL_TEMP_FOLDER, FA_SVGS_FOLDER);
        console.log(`Copied: svgs-full`);
        await copyDir(SPRITES_FULL_TEMP_FOLDER, FA_SPRITES_FULL_FOLDER);
        console.log(`Copied: sprites-full`);
        await copyFile(CATEGORIES_TEMP_FILE, FA_FOLDER);
        console.log(`Copied: categories.yml`);
        await fs.remove("./" + REPO_DEST_FOLDER);
        console.log(`Removed: ${REPO_DEST_FOLDER}`);

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
        const licenseText = await fs.readFile(LICENSE, "utf8");
        const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
        const fileContent = `${licenseText}\n export const FA_CATEGORIES = ${JSON.stringify(
            categories,
            null,
            2
        )};\n`;
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

updateLocalFiles();
