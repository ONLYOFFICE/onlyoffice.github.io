import { defineConfig } from "vitest/config";
import { resolve } from "path";

const __dirname = import.meta.dirname;

// Separate from vite.config.mjs, whose Babel and ES5 steps belong to the
// build: the tests run the sources as they are.
export default defineConfig({
    resolve: {
        alias: { "@shared": resolve(__dirname, "shared") },
    },
    test: {
        include: ["test/**/*.test.js", "shared/**/*.test.js"],
        environment: "happy-dom",
        setupFiles: ["test/setup.js"],
    },
});
