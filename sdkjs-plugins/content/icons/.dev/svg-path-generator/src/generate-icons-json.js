const yaml = require("js-yaml");
const fs = require("fs-extra");
const path = require("path");
const { glob } = require("glob");
const { exec } = require("child_process");
const cheerio = require("cheerio");

const OUTPUT_DIR = "../../src/app/environments/";
const OUTPUT_FILE = "categories.js";
const LICENSE = "../../LICENSE";
const REPO_URL = "https://github.com/FortAwesome/Font-Awesome.git";
const REPO_DEST_FOLDER = "temp-repo";
const SVGS_FULL_TEMP_FOLDER = "./" + REPO_DEST_FOLDER + "/svgs-full";
const CATEGORIES_TEMP_FILE =
    "./" + REPO_DEST_FOLDER + "/metadata/categories.yml";
const INDEX_HTML_FILE = "../../src/index.html";

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

async function updateLocalFiles() {
    try {
        await cloneRepository();
        console.log(`Copied: ${REPO_URL}`);

        // Get all SVG files in folder svgs-full
        const svgFiles = await glob(SVGS_FULL_TEMP_FOLDER + "/**/*.svg");

        const yamlContent = await fs.readFile(CATEGORIES_TEMP_FILE, "utf8");
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

                    const folderName = path.relative(
                        SVGS_FULL_TEMP_FOLDER,
                        dirname
                    );

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

        await copyIconsToIndexHtmlFile(categories);

        await fs.remove("./" + REPO_DEST_FOLDER);
        console.log(`Removed: ${REPO_DEST_FOLDER}`);
    } catch (error) {
        console.error("❌ Error:", error.message);
        console.error(error.stack);
    }
}

async function copyIconsToIndexHtmlFile(categories) {
    let html = fs.readFileSync(INDEX_HTML_FILE, "utf8");
    const $ = cheerio.load(html);
    const iconsBlock = $("#icons");

    iconsBlock.html("");

    categories.forEach((categoryInfo) => {
        categoryInfo.folders.forEach((folderName, index) => {
            let icons = categoryInfo.icons[index];
            icons.forEach((iconName) => {
                const iconPath = path.join(
                    SVGS_FULL_TEMP_FOLDER,
                    folderName,
                    iconName + ".svg"
                );
                let svgContent = fs
                    .readFileSync(iconPath, "utf8")
                    .replace(/<!--[\s\S]*?-->/g, "");

                svgContent = addSVGAttributes(svgContent, {
                    class: "icon",
                    role: "img",
                    tabindex: "0",
                    title: iconName,
                    "data-name": iconName,
                    "data-section": folderName,
                    "data-category": categoryInfo.id,
                });
                iconsBlock.append(svgContent);
            });
        });
    });

    fs.writeFileSync(INDEX_HTML_FILE, $.html(), "utf8");
    console.log(`✅ Icons copied to ${INDEX_HTML_FILE}`);
}

function addSVGAttributes(svgContent, attributes = {}) {
    try {
        const $ = cheerio.load(svgContent, { xmlMode: true });
        const svgElement = $("svg");

        Object.keys(attributes).forEach((attr) => {
            if (attr === "class") {
                const existingClass = svgElement.attr("class") || "";
                svgElement.attr(
                    "class",
                    `${existingClass} ${attributes[attr]}`.trim()
                );
            } else if (attr === "title") {
                if (!$("title").length) {
                    svgElement.prepend(`<title>${attributes[attr]}</title>`);
                }
            } else {
                svgElement.attr(attr, attributes[attr]);
            }
        });

        return $.html("svg");
    } catch (error) {
        console.error(`Error loading icon ${iconPath}:`, error);
        return "";
    }
}

updateLocalFiles();
