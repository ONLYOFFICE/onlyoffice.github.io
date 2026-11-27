// The settings page, as each plugin lays it out in its index.html, with the
// settings a plugin adds to it.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";

const CONTENT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");

/**
 * Lays the plugin out and loads the page then: the loader finds its
 * elements when it is loaded.
 * @param {string} plugin
 */
async function loadPage(plugin) {
    const html = readFileSync(resolve(CONTENT, plugin, "index.html"), "utf8");
    document.body.innerHTML = html.slice(html.indexOf("<body"), html.lastIndexOf("</body>"));
    vi.resetModules();
    return (await import("./settings.js")).SettingsPage;
}

/** A section of a single setting, saved as `saved`. */
function fakeSection() {
    const section = {
        saved: false,
        shown: false,
        value: false,
        /** @type {Array<() => void>} */
        listeners: [],
        show() {
            section.shown = true;
            section.value = section.saved;
        },
        isChanged() {
            return section.value !== section.saved;
        },
        save() {
            section.saved = section.value;
        },
        /** @param {() => void} callback */
        subscribe(callback) {
            section.listeners.push(callback);
        },
        toggle() {
            section.value = !section.value;
            section.listeners.forEach((cb) => cb());
        },
    };
    return section;
}

function fakeRouter() {
    return { openMain: vi.fn(), openSettings: vi.fn() };
}

/** @param {string} id */
function button(id) {
    return /** @type {HTMLElement} */ (document.getElementById(id));
}

describe.each(["zotero", "mendeley"])("SettingsPage in the %s layout", (plugin) => {
    it("shows the settings of the plugin with its own", async () => {
        const SettingsPage = await loadPage(plugin);
        const section = fakeSection();
        const router = fakeRouter();
        const page = new SettingsPage(router, "display-none", { styleKey: "testStyleId", styleCopyKey: "testStyleCopy", sections: [section] });

        page.show();

        expect(section.shown).toBe(true);
        expect(router.openSettings).toHaveBeenCalled();
        expect(button("saveSettingsBtn").hasAttribute("disabled")).toBe(true);
    });

    it("saves a setting of the plugin changed on the page", async () => {
        const SettingsPage = await loadPage(plugin);
        const section = fakeSection();
        const router = fakeRouter();
        const page = new SettingsPage(router, "display-none", { styleKey: "testStyleId", styleCopyKey: "testStyleCopy", sections: [section] });
        page._addEventListeners();
        page._languageSelect.addItems([["en-US", "English (US)"]], "en-US");
        page.show();

        section.toggle();
        expect(button("saveSettingsBtn").hasAttribute("disabled")).toBe(false);
        button("saveSettingsBtn").click();

        await vi.waitFor(() => expect(router.openMain).toHaveBeenCalled());
        expect(section.saved).toBe(true);
    });

    it("keeps the style it is given a key for", async () => {
        const SettingsPage = await loadPage(plugin);
        localStorage.setItem("testStyleId", "apa");
        const page = new SettingsPage(fakeRouter(), "display-none", { styleKey: "testStyleId", styleCopyKey: "testStyleCopy" });

        expect(page.getLastUsedStyleId()).toBe("apa");
    });
});
