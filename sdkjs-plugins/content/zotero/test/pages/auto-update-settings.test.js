// The auto-update settings Zotero adds to the settings page.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeEach, describe, expect, it } from "vitest";
import { AutoUpdateSettings } from "../../src/app/pages/auto-update-settings.js";
import { AutoUpdatePreferences } from "../../src/app/auto-update-preferences.js";

beforeEach(() => {
    const html = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "../../index.html"), "utf8");
    document.body.innerHTML = html.slice(html.indexOf("<body"), html.lastIndexOf("</body>"));
});

/** @param {string} id */
function box(id) {
    return /** @type {HTMLElement} */ (
        /** @type {HTMLElement} */ (document.getElementById(id)).closest(".checkbox-container")
    );
}

describe("AutoUpdateSettings", () => {
    it("shows the preferences saved and saves those changed", () => {
        AutoUpdatePreferences.setShouldUpdateCitations(false);
        const section = new AutoUpdateSettings();
        let changes = 0;
        section.subscribe(() => changes++);

        section.show();
        expect(section.isChanged()).toBe(false);

        box("autoUpdateCitations").click();
        expect(changes).toBe(1);
        expect(section.isChanged()).toBe(true);

        section.save();
        expect(AutoUpdatePreferences.shouldUpdateCitations()).toBe(true);
        expect(AutoUpdatePreferences.shouldUpdateBibliography()).toBe(true);
        expect(section.isChanged()).toBe(false);
    });
});
