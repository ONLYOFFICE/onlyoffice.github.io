// The redirect URL the sign-in page shows and sends to Mendeley.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeEach, describe, expect, it } from "vitest";
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
