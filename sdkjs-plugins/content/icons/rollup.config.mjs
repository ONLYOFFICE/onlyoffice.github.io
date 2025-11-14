import resolve from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import license from "rollup-plugin-license";
import terser from "@rollup/plugin-terser";
import html from "@rollup/plugin-html";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import customProperties from "postcss-custom-properties";
import atImport from "postcss-import";
import cssnano from "cssnano";
import postcssNesting from "postcss-nesting";
import fs from "fs";

const isES5Build = process.env.TARGET === "es5";
const template = fs.readFileSync("src/index.html", "utf8");

function getBabelConfig() {
    if (isES5Build) {
        return {
            babelHelpers: "bundled",
            presets: [
                [
                    "@babel/preset-env",
                    {
                        targets: {
                            browsers: ["> 0.5%", "last 2 versions", "IE 11"],
                        },
                        modules: false, // Rollup processes modules itself
                        useBuiltIns: "usage",
                        corejs: 3,
                    },
                ],
            ],
            plugins: ["@babel/plugin-transform-class-properties"],
        };
    }

    return {
        babelHelpers: "bundled",
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

export default {
    input: "src/app/index.js",
    output: {
        file: isES5Build ? "dist/bundle.es5.js" : "dist/bundle.modern.js",
        format: isES5Build ? "umd" : "esm",
        name: isES5Build ? "Icons" : undefined,
        sourcemap: true,
    },
    plugins: [
        postcss({
            extract: "styles.css",
            minimize: true,
            plugins: [
                atImport(), // process @import rules
                customProperties({
                    preserve: false,
                }),
                postcssNesting(),
                autoprefixer({
                    overrideBrowserslist: ["ie >= 11", "last 2 versions"],
                }),
                cssnano({
                    preset: [
                        "default",
                        {
                            discardDuplicates: true,
                            normalizeWhitespace: true,
                            discardEmpty: true,
                            mergeRules: true,
                            discardUnused: {
                                fontFace: false,
                                keyframes: false,
                                counterStyle: false,
                            },
                        },
                    ],
                }),
            ],
            sourceMap: true,
            modules: false, // CSS Modules
            // use: ["sass"], // preprocessor support
        }),
        resolve({
            browser: true,
        }),
        babel({
            ...getBabelConfig(),
            exclude: "node_modules/**",
        }),
        terser({
            format: {
                comments: false,
                beautify: true,
            },
            compress: false,
            mangle: false,
        }),
        html({
            template: () => template,
            fileName: "index.html",
        }),
        license({
            banner: {
                commentStyle: "none", // 'regular', 'none', 'ignored'
                content: {
                    file: "LICENSE", // from file
                    encoding: "utf-8",
                },
            },
        }),
    ],
};
