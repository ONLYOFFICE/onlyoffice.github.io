import { defineConfig } from "vitest/config";

// Separate from vite.config.mjs, whose Babel and ES5 steps belong to the
// build: the tests run the sources as they are.
export default defineConfig({
    test: {
        include: ["test/**/*.test.js"],
        environment: "happy-dom",
        setupFiles: ["test/setup.js"],
    },
});
