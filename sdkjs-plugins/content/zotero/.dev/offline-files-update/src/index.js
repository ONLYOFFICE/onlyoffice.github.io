const fs = require("fs-extra");
const { glob } = require("glob");
const { exec } = require("child_process");
const path = require("path");

const REPO_URL = "https://github.com/citation-style-language/locales.git";
const REPO_DEST_FOLDER = "temp-repo";
const LOCALES_TEMP_FOLDER = "./" + REPO_DEST_FOLDER;
const LOCALES_DEST_FOLDER = "../../resources/csl/locales";
const STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json";
const STYLES_JSON_FOLDER = "../../resources/csl/";
const STYLES_DEST_FOLDER = "../../resources/csl/styles";

const DEFAULT_STYLES = [
    "american-medical-association",
    "american-political-science-association",
    "apa",
    "american-sociological-association",
    "chicago-author-date-17th-edition",
    "harvard-cite-them-right-10th-edition",
    "ieee",
    "modern-language-association-8th-edition",
    "nature",
];

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

async function copyLocales() {
    try {
        const xmlLocalesFiles = await glob(
            LOCALES_TEMP_FOLDER + "/locales-*.xml"
        );
        await fs.ensureDir(LOCALES_DEST_FOLDER);

        let numOfFiles = 0;
        for (const filePath of xmlLocalesFiles) {
            const fileName = path.basename(filePath);
            const targetPath = path.join(LOCALES_DEST_FOLDER, fileName);
            await fs.copy(filePath, targetPath);
            numOfFiles++;
        }
        return numOfFiles;
    } catch (error) {
        console.error("❌ Failed to copy locales");
        throw error;
    }
}

async function downloadStylesJson() {
    try {
        await fs.ensureDir(STYLES_JSON_FOLDER);
        const response = await fetch(STYLES_JSON_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let jsonData = await response.json();
        jsonData = jsonData.filter((style) => style.dependent === 0);

        await fs.writeFile(
            STYLES_JSON_FOLDER + "styles.json",
            JSON.stringify(jsonData, null, 2)
        );

        return jsonData;
    } catch (error) {
        console.error("❌ Failed to download styles.json");
        throw error;
    }
}

async function downloadStyleFiles(arrayOfStyles, concurrency = 50) {
    await fs.ensureDir(STYLES_DEST_FOLDER);
    if (arrayOfStyles.length < concurrency) concurrency = arrayOfStyles.length;
    return Promise.all(
        [...Array(concurrency)].map(async () => {
            while (arrayOfStyles.length > 0) {
                const item = arrayOfStyles.pop();
                if (!item.name || !DEFAULT_STYLES.includes(item.name)) {
                    continue;
                }
                await downloadStyle(item.href, item.name);
            }
        })
    );
}

async function downloadStyle(url, styleName) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const xmlContent = await response.text();
        await fs.writeFile(
            `${STYLES_DEST_FOLDER}/${styleName}.csl`,
            xmlContent
        );
    } catch (error) {
        console.error("❌ Failed to download styles:", styleName);
        throw error;
    }
}

async function updateLocalFiles() {
    try {
        const jsonData = await downloadStylesJson();
        console.log(`Copied: styles.json`);
        console.log(`Try to copy ${jsonData.length} styles`);
        await downloadStyleFiles(jsonData);

        await cloneRepository();
        const numOfFiles = await copyLocales();
        console.log(`Copied: ${numOfFiles} locales`);
        await fs.remove("./" + REPO_DEST_FOLDER);
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

updateLocalFiles();
