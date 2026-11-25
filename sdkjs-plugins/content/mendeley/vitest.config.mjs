import { defineConfig } from "vitest/config";
import { resolve } from "path";

const __dirname = import.meta.dirname;

// Separate from vite.config.mjs, whose Babel and ES5 steps belong to the
// build: the tests run the sources as they are.
export default defineConfig({
    resolve: {
        alias: { "@shared": resolve(__dirname, "../zotero/src/shared") },
    },
    server: {
        // Vite serves files outside the plugin folder only from listed paths.
        fs: { allow: [__dirname, resolve(__dirname, "../zotero/src/shared")] },
    },
    test: {
        // The parent folder, so that the tests of the code shared with the
        // Zotero plugin run here too.
        dir: resolve(__dirname, ".."),
        include: ["mendeley/test/**/*.test.js", "zotero/src/shared/**/*.test.js"],
        environment: "happy-dom",
        setupFiles: ["test/setup.js"],
        passWithNoTests: true,
    },
});
