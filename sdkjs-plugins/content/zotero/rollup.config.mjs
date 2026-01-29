import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import license from "rollup-plugin-license";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import atImport from "postcss-import";
import cssnano from "cssnano";
import postcssNested from "postcss-nested";
import copy from "rollup-plugin-copy";
import fs from "fs";

const isES5Build = process.env.TARGET === "es5";

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
            // for old browsers support
            extract: "styles.css",
            minimize: true,
            plugins: [
                atImport(), // process @import rules
                postcssNested(),
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
        commonjs({
            include: /node_modules/,
            requireReturnsDefault: "auto",
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
        license({
            banner: {
                commentStyle: "none", // 'regular', 'none', 'ignored'
                content: {
                    file: "LICENSE", // from file
                    encoding: "utf-8",
                },
            },
        }),
        copy({
            targets: [
                { src: "src/app/citeproc/citeproc_commonjs.js", dest: "dist" },
            ],
            copyOnce: false, // Copy files only once
            flatten: true, // Do not save folders structure
            verbose: false, // Print info about copied files
            hook: "buildEnd", // When to run
        }),
    ],
};
