import { defineConfig } from "vite";
import { babel } from "@rollup/plugin-babel";
import { transformAsync } from "@babel/core";
import { resolve } from "path";
import { readFileSync } from "fs";

const __dirname = import.meta.dirname;

const isES5Build = process.env.TARGET === "es5";
const suffix = isES5Build ? "es5" : "modern";

// ENTRY: "main" (default) or "edit-window"
const entry = process.env.ENTRY || "main";

const entries = {
    main: {
        input: resolve(__dirname, "src/app/index.js"),
        fileName: "bundle",
        cssFileName: "styles",
    },
    "edit-window": {
        input: resolve(__dirname, "src/app/edit-window.js"),
        fileName: "edit-window",
        cssFileName: "edit-window",
    },
};

const current = entries[entry];

const ES5_BROWSERS = ["> 0.5%", "last 2 versions", "IE 11"];

/**
 * Babel compiles the modules, but the ES5 bundle gets newer syntax after
 * that: the bundler wraps CommonJS modules in arrow functions, and the
 * minifier writes strings as template literals and turns conditional
 * member access back into "?.". So the finished bundle is compiled again.
 */
function es5Output() {
    return {
        name: "es5-output",
        async generateBundle(_, bundle) {
            for (const chunk of Object.values(bundle)) {
                if (chunk.type !== "chunk") continue;
                const result = await transformAsync(chunk.code, {
                    babelrc: false,
                    configFile: false,
                    sourceType: "script",
                    compact: true,
                    minified: true,
                    comments: false,
                    sourceMaps: Boolean(chunk.map),
                    inputSourceMap: chunk.map || undefined,
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: { browsers: ES5_BROWSERS },
                                modules: false,
                            },
                        ],
                    ],
                });
                if (!result || result.code == null) {
                    throw new Error("Babel returned nothing for " + chunk.fileName);
                }
                chunk.code = result.code;
                if (result.map) {
                    chunk.map = result.map;
                    const mapFile = bundle[chunk.fileName + ".map"];
                    if (mapFile && mapFile.type === "asset") {
                        mapFile.source = JSON.stringify(result.map);
                    }
                }
            }
        },
    };
}

function getBabelConfig() {
    if (isES5Build) {
        return {
            babelHelpers: "bundled",
            exclude: "node_modules/**",
            presets: [
                [
                    "@babel/preset-env",
                    {
                        targets: {
                            browsers: ES5_BROWSERS,
                        },
                        modules: false,
                    },
                ],
            ],
            plugins: [
                [
                    "polyfill-corejs3",
                    { method: "usage-global", version: "3.50" },
                ],
                "@babel/plugin-transform-class-properties",
            ],
        };
    }

    return {
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: [
            [
                "@babel/preset-env",
                {
                    targets: { esmodules: true },
                    modules: false,
                },
            ],
        ],
    };
}

export default defineConfig({
    plugins: [
        // Before the banner, which would not survive "comments: false".
        isES5Build && es5Output(),
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
                // The code moves down by the lines of the banner, and so
                // must its source map: an empty line of mappings for each.
                const bannerLines = banner.split("\n").length - 1;
                for (const chunk of Object.values(bundle)) {
                    if (chunk.type === "chunk") {
                        chunk.code = banner + chunk.code;
                        if (chunk.map) {
                            chunk.map.mappings =
                                ";".repeat(bannerLines) + chunk.map.mappings;
                            const mapFile = bundle[chunk.fileName + ".map"];
                            if (mapFile && mapFile.type === "asset") {
                                mapFile.source = JSON.stringify(chunk.map);
                            }
                        }
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
                // In library mode Vite keeps the whitespace of an ES bundle,
                // for the bundlers of whoever uses the library. Nothing
                // bundles this one again, so it is minified in full.
                minify: true,
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === "style.css") return `${current.cssFileName}.css`;
                    return "[name][extname]";
                },
            },
            plugins: [
                babel(getBabelConfig()),
            ],
        },
    },
    css: {
        devSourcemap: true,
    },
});
