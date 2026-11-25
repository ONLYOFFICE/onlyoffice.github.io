const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

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
    execFileSync("git", ["clone", "--depth", "1", REPO_URL, REPO_DEST_FOLDER], {
        stdio: "inherit",
    });
}

// An icon present in several folders is taken from the first folder listed here
const FOLDER_PRIORITY = ["regular", "brands", "solid"];

function folderRank(file) {
    const rank = FOLDER_PRIORITY.indexOf(file.split(path.sep)[0]);
    return rank === -1 ? FOLDER_PRIORITY.length : rank;
}

function findSvgFiles(folder) {
    return fs
        .readdirSync(folder, { recursive: true })
        .filter((file) => file.endsWith(".svg"))
        .sort((a, b) => folderRank(a) - folderRank(b) || a.localeCompare(b))
        .map((file) => path.join(folder, file));
}

function updateLocalFiles() {
    try {
        cloneRepository();
        console.log(`Copied: ${REPO_URL}`);

        // Get all SVG files in folder svgs-full
        const svgFiles = findSvgFiles(SVGS_FULL_TEMP_FOLDER);

        const yamlContent = fs.readFileSync(CATEGORIES_TEMP_FILE, "utf8");
        const categoriesData = parseCategoriesYaml(yamlContent);

        // Create a map of existing files for quick search
        const existingIcons = new Map();
        svgFiles.forEach((file) => {
            const fileName = path.basename(file, ".svg");
            if (!existingIcons.has(fileName)) {
                existingIcons.set(fileName, file);
            }
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
            for (const iconName of categoryData.icons) {
                const iconPath = existingIcons.get(iconName);

                if (iconPath) {
                    const folderName = path.relative(
                        SVGS_FULL_TEMP_FOLDER,
                        path.dirname(iconPath)
                    );

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

            categories.push(category);
        }

        // Save the result
        const licenseText = fs.readFileSync(LICENSE, "utf8");
        const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
        const fileContent = `${licenseText}\n export const FA_CATEGORIES = ${JSON.stringify(
            categories,
            null,
            2
        )};\n`;
        fs.writeFileSync(outputPath, fileContent, "utf8");
        console.log(`✅ ${OUTPUT_FILE} successfully created!`);

        console.log(
            `📊 Found ${totalIcons - lostIcons} of ${totalIcons} icons`
        );
        console.log(`📁 ${categories.length} categories processed`);

        copyIconsToIndexHtmlFile(categories);
    } catch (error) {
        console.error("❌ Error:", error.message);
        console.error(error.stack);
        process.exitCode = 1;
    } finally {
        fs.rmSync("./" + REPO_DEST_FOLDER, { recursive: true, force: true });
        console.log(`Removed: ${REPO_DEST_FOLDER}`);
    }
}

/**
 * Reads Font Awesome's metadata/categories.yml. The file has a fixed shape,
 * so this covers exactly that shape and fails on anything else:
 *
 *   category-id:
 *     icons:
 *       - icon-name
 *     label: Category label
 */
function parseCategoriesYaml(content) {
    const categories = {};
    let category = null;

    content.split(/\r?\n/).forEach((line, index) => {
        let match;
        if (!line.trim() || line.trim().startsWith("#")) {
            return;
        }
        if ((match = /^([^\s:#][^:]*):\s*$/.exec(line))) {
            category = { icons: [] };
            categories[unquoteYaml(match[1])] = category;
        } else if (category && /^\s+icons:\s*$/.test(line)) {
            // the list items follow
        } else if (category && (match = /^\s+label:\s*(.+)$/.exec(line))) {
            category.label = unquoteYaml(match[1]);
        } else if (category && (match = /^\s+-\s*(.+)$/.exec(line))) {
            category.icons.push(unquoteYaml(match[1]));
        } else {
            throw new Error(
                `${CATEGORIES_TEMP_FILE}:${index + 1}: unexpected line "${line}"`
            );
        }
    });

    return categories;
}

function unquoteYaml(value) {
    value = value.trim();
    if (value.startsWith("'") && value.endsWith("'")) {
        return value.slice(1, -1).replace(/''/g, "'");
    }
    if (value.startsWith('"') && value.endsWith('"')) {
        return JSON.parse(value);
    }
    return value;
}

function copyIconsToIndexHtmlFile(categories) {
    const html = fs.readFileSync(INDEX_HTML_FILE, "utf8");
    const iconsBlock = /(<div id="icons"[^>]*>)[\s\S]*?(<\/div>)/;
    if (!iconsBlock.test(html)) {
        throw new Error(`${INDEX_HTML_FILE}: <div id="icons"> not found`);
    }

    let iconsHtml = "";
    categories.forEach((categoryInfo) => {
        categoryInfo.folders.forEach((folderName, index) => {
            categoryInfo.icons[index].forEach((iconName) => {
                const iconPath = path.join(
                    SVGS_FULL_TEMP_FOLDER,
                    folderName,
                    iconName + ".svg"
                );
                const svgContent = fs
                    .readFileSync(iconPath, "utf8")
                    .replace(/<!--[\s\S]*?-->/g, "");

                iconsHtml += addSVGAttributes(svgContent, {
                    class: "icon",
                    role: "img",
                    tabindex: "0",
                    title: iconName,
                    "data-name": iconName,
                    "data-section": folderName,
                    "data-category": categoryInfo.id,
                });
            });
        });
    });

    fs.writeFileSync(
        INDEX_HTML_FILE,
        html.replace(iconsBlock, (_, open, close) => open + iconsHtml + close),
        "utf8"
    );
    console.log(`✅ Icons copied to ${INDEX_HTML_FILE}`);
}

/**
 * Adds attributes and a <title> to a Font Awesome SVG and returns it as HTML
 * markup: self-closing elements such as <path/> become <path></path>.
 */
function addSVGAttributes(svgContent, attributes = {}) {
    const svgOpenTag = /<svg\b([^>]*?)\s*(\/?)>/;
    const svg = svgContent.trim();
    const [openTag, svgAttrs] = svg.match(svgOpenTag) || [];
    if (!openTag) {
        throw new Error(`No <svg> element in "${svg.slice(0, 80)}"`);
    }

    let attrs = svgAttrs;
    let title = "";
    Object.keys(attributes).forEach((attr) => {
        const value = attributes[attr];
        const existing = new RegExp(`\\s${attr}="([^"]*)"`);
        if (attr === "title") {
            if (!/<title\b/.test(svg)) {
                title = `<title>${escapeHtml(value)}</title>`;
            }
        } else if (existing.test(attrs)) {
            attrs = attrs.replace(existing, (_, current) => {
                const merged =
                    attr === "class" ? `${current} ${value}`.trim() : value;
                return ` ${attr}="${escapeHtml(merged)}"`;
            });
        } else {
            attrs += ` ${attr}="${escapeHtml(value)}"`;
        }
    });

    return svg
        .replace(openTag, `<svg${attrs}>${title}`)
        .replace(/<([\w:-]+)([^<>]*?)\s*\/>/g, "<$1$2></$1>");
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

updateLocalFiles();
