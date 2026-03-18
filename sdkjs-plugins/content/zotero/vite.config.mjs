import { defineConfig } from "vite";
import { babel } from "@rollup/plugin-babel";
import { resolve } from "path";
import { readFileSync } from "fs";
import { minify } from "terser";

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
                            browsers: ["> 0.5%", "last 2 versions", "IE 11"],
                        },
                        modules: false,
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
        {
            name: "terser-minify",
            enforce: "post",
            async renderChunk(code, chunk) {
                if (chunk.type !== "chunk") return null;
                const result = await minify(code, {
                    sourceMap: true,
                    format: { comments: false },
                    compress: true,
                    mangle: true,
                });
                return result.code ? { code: result.code, map: result.map } : null;
            },
        },
        {
            name: "license-banner",
            generateBundle(_, bundle) {
                const banner = readFileSync(resolve(__dirname, "LICENSE"), "utf-8") + "\n";
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
        minify: false,
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
                babel(getBabelConfig()),
            ],
        },
    },
    css: {
        devSourcemap: true,
    },
});
