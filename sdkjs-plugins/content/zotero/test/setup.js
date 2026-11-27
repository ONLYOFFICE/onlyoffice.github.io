// What the plugin finds around it in the editor: citeproc, loaded by
// index.html, and the plugin SDK's window.Asc.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runInThisContext } from "node:vm";
import { beforeEach } from "vitest";

// As index.html loads it: a script whose top-level CSL becomes a global.
const citeproc = resolve(
    dirname(fileURLToPath(import.meta.url)),
    "../vendor/citeproc/citeproc_commonjs.min.js",
);
runInThisContext(readFileSync(citeproc, "utf8"), { filename: citeproc });

beforeEach(() => {
    localStorage.clear();
    window.Asc = {
        scope: {},
        plugin: {
            tr: (text) => text,
            callCommand: (fn, isClose, isCalc, callback) => callback && callback(undefined),
            executeMethod: (name, args, callback) => callback && callback(undefined),
        },
        /** Records the windows the plugin opens instead of showing them. */
        PluginWindow: function () {
            this.show = (variation) => window.__shownWindows.push(variation);
            this.attachEvent = () => {};
            this.command = () => {};
            this.close = () => {};
        },
    };
    window.__shownWindows = [];
    globalThis.Asc = window.Asc;
});
