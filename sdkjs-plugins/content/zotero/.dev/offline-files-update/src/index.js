const fs = require("fs/promises");
const { exec } = require("child_process");
const path = require("path");

const REPO_URL = "https://github.com/citation-style-language/locales.git";
const REPO_DEST_FOLDER = "temp-repo";
const LOCALES_TEMP_FOLDER = "./" + REPO_DEST_FOLDER;
const LOCALES_DEST_FOLDER = "../../resources/csl/locales";
const STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json";
const STYLES_JSON_FOLDER = "../../resources/csl/";
const STYLES_DEST_FOLDER = "../../resources/csl/styles";
const CSL_FOLDER = "../../resources/csl";
// The plugins that read the same files through the shared CSL managers.
const OTHER_PLUGINS_CSL_FOLDERS = ["../../../mendeley/resources/csl"];

const DEFAULT_STYLES = [
    "american-anthropological-association",
    "american-medical-association",
    "american-political-science-association",
    "american-sociological-association",
    "apa",
    "chicago-author-date",
    "chicago-notes-bibliography",
    "harvard-cite-them-right",
    "ieee",
    "modern-language-association",
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
        const xmlLocalesFiles = (await fs.readdir(LOCALES_TEMP_FOLDER)).filter(
            (fileName) => /^locales-.*\.xml$/.test(fileName)
        );
        await fs.mkdir(LOCALES_DEST_FOLDER, { recursive: true });

        let numOfFiles = 0;
        for (const fileName of xmlLocalesFiles) {
            const filePath = path.join(LOCALES_TEMP_FOLDER, fileName);
            const targetPath = path.join(LOCALES_DEST_FOLDER, fileName);
            await fs.copyFile(filePath, targetPath);
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
        await fs.mkdir(STYLES_JSON_FOLDER, { recursive: true });
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
    await fs.mkdir(STYLES_DEST_FOLDER, { recursive: true });
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

async function copyToOtherPlugins() {
    for (const folder of OTHER_PLUGINS_CSL_FOLDERS) {
        try {
            await fs.cp(CSL_FOLDER, folder, { recursive: true });
        } catch (error) {
            console.error("❌ Failed to copy the files to", folder);
            throw error;
        }
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
        await fs.rm("./" + REPO_DEST_FOLDER, { recursive: true, force: true });

        await copyToOtherPlugins();
        console.log(`Copied the files to ${OTHER_PLUGINS_CSL_FOLDERS.length} other plugin(s)`);
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

updateLocalFiles();
