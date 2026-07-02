import { defineConfig } from "vite";
import { resolve } from "path";

const isES5Build = process.env.TARGET === "es5";
const suffix = isES5Build ? "es5" : "modern";

/** @typedef {{ input: string, fileName: string, cssFileName: string }} EntryConfig */
/** @typedef {"main"} EntryKey */

/** @type {EntryKey} */
const entry = process.env.ENTRY || "main";
/** @type {EntryKey[]} */
const VALID_ENTRIES = ["main"];
if (!VALID_ENTRIES.includes(entry)) {
  throw new Error(`Unknown ENTRY: ${entry}`);
}

/** @type {Record<EntryKey, EntryConfig>} */
const entries = {
    main: {
        input: resolve(__dirname, "src/app/index.js"),
        fileName: "bundle",
        cssFileName: "styles",
    },
};
/** @type {EntryConfig} */
const current = entries[entry];

export default defineConfig({
    plugins: [
        {
            name: "license-banner",
            generateBundle(_, bundle) {
                const banner = `/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */\n`;
                for (const chunk of Object.values(bundle)) {
                    if (chunk.type === "chunk") {
                        chunk.code = banner + chunk.code;
                    }
                }
            },
        },
    ],
    build: {
        outDir: "dist",
        emptyOutDir: false,
        sourcemap: true,
        minify: true,
        lib: {
            entry: current.input,
            formats: [isES5Build ? "umd" : "es"],
            name: isES5Build ? "Icons" : undefined,
            fileName: () => `${current.fileName}.${suffix}.js`,
            cssFileName: current.cssFileName,
        },
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === "style.css") return `${current.cssFileName}.css`;
                    return "[name][extname]";
                },
            },
            plugins: [
            ],
        },
    },
    css: {
        devSourcemap: true,
    },
});
