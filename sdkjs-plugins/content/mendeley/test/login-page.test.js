// The redirect URL the sign-in page shows and sends to Mendeley.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginPage } from "../src/app/pages/login.js";

beforeEach(() => {
    const html = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "../index.html"), "utf8");
    document.body.innerHTML = html.slice(html.indexOf("<body"), html.lastIndexOf("</body>"));
});

/** @param {string} pageUrl */
function redirectUrlAt(pageUrl) {
    window.happyDOM.setURL(pageUrl);
    const router = { openMain() {}, openLogin() {} };
    const page = new LoginPage(/** @type {any} */ (router), false);
    page.init();
    return /** @type {HTMLInputElement} */ (document.getElementById("redirectConfig")).value;
}

describe("LoginPage redirect URL", () => {
    it("points next to index.html", () => {
        expect(redirectUrlAt("https://example.com/plugins/mendeley/index.html?lang=en"))
            .toBe("https://example.com/plugins/mendeley/oauth.html");
    });

    it("points into the folder when the host dropped index.html", () => {
        // Cloudflare Pages redirects …/mendeley/index.html to …/mendeley/.
        expect(redirectUrlAt("https://example.pages.dev/sdkjs-plugins/content/mendeley/"))
            .toBe("https://example.pages.dev/sdkjs-plugins/content/mendeley/oauth.html");
    });
});

describe("LoginPage copy button", () => {
    /** @type {Array<[string, string]>} */
    let commands;
    /** @type {string[]} */
    let opened;

    beforeEach(() => {
        commands = [];
        document.execCommand = (name) => {
            const input = /** @type {HTMLInputElement} */ (document.getElementById("redirectConfig"));
            commands.push([name, input.value.slice(input.selectionStart || 0, input.selectionEnd || 0)]);
            return true;
        };
        opened = [];
        window.open = (url) => { opened.push(String(url)); return null; };
    });

    /** @param {Clipboard | undefined} clipboard */
    function useClipboard(clipboard) {
        Object.defineProperty(navigator, "clipboard", { value: clipboard, configurable: true });
    }

    function clickCopy() {
        /** @type {HTMLElement} */ (document.getElementById("redirectUrlCopy")).click();
    }

    it("copies the redirect URL with the Clipboard API", async () => {
        /** @type {string[]} */
        const written = [];
        useClipboard(/** @type {any} */ ({ writeText: async (/** @type {string} */ text) => { written.push(text); } }));
        const url = redirectUrlAt("https://example.com/plugins/mendeley/index.html");

        clickCopy();

        await vi.waitFor(() => expect(opened).toEqual(["https://dev.mendeley.com/myapps.html"]));
        expect(written).toEqual([url]);
        expect(commands).toEqual([]);
    });

    it("copies by selecting the field where the Clipboard API is blocked", async () => {
        useClipboard(/** @type {any} */ ({
            writeText: () => Promise.reject(new DOMException("blocked", "NotAllowedError")),
        }));
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const url = redirectUrlAt("https://example.com/plugins/mendeley/index.html");

        clickCopy();

        await vi.waitFor(() => expect(opened).toEqual(["https://dev.mendeley.com/myapps.html"]));
        expect(commands).toEqual([["copy", url]]);
        expect(String(warn.mock.calls[0][0])).toContain("clipboard-write");
        warn.mockRestore();
    });
});
