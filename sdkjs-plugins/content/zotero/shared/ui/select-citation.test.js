// The list of found sources, as each plugin lays it out in its index.html:
// both plugins share the component, so it has to find its way in both.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { SelectCitationsComponent } from "./select-citation.js";

const CONTENT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

/** @param {string} plugin */
function loadLayout(plugin) {
    const html = readFileSync(resolve(CONTENT, plugin, "index.html"), "utf8");
    document.body.innerHTML = html.slice(html.indexOf("<body"), html.lastIndexOf("</body>"));
}

/**
 * @param {string} id
 * @param {string} family
 * @param {string} title
 */
function item(id, family, title) {
    return { id: id, type: "book", title: title, author: [{ family: family, given: "J." }], issued: { "date-parts": [[2020]] } };
}

const LAST_SEARCH = { text: "x", obj: null, groups: [], groupOrder: [], groupsHash: "" };

/** @param {HTMLElement} doc */
function titleOf(doc) {
    return doc.textContent || "";
}

describe.each(["zotero", "mendeley"])("SelectCitationsComponent in the %s layout", (plugin) => {
    it("lists the found sources, the ones the document cites first", async () => {
        loadLayout(plugin);
        const list = new SelectCitationsComponent("display-none", () => {}, () => false);
        list.setUsedItemKeys(new Set(["B2"]));

        const shown = await list.displaySearchItems(
            { id: 1, items: [item("A1", "Adams", "Alpha"), item("B2", "Brown", "Beta"), item("C3", "Clark", "Gamma")] },
            null,
            LAST_SEARCH,
        );

        expect(shown).toBe(3);
        const docs = /** @type {Array<HTMLElement>} */ (Array.from(document.querySelectorAll("#docsHolder .doc")));
        expect(docs).toHaveLength(3);
        expect(titleOf(docs[0])).toContain("Beta");
        expect(document.querySelector("#docsHolder > .docs-priority")).not.toBeNull();
    });

    it("selects a source when its box is checked, and drops it on cancel", async () => {
        loadLayout(plugin);
        const list = new SelectCitationsComponent("display-none", () => {}, () => false);
        /** @type {Array<number>} */
        const counts = [];
        list.subscribe((count) => counts.push(count));
        await list.displaySearchItems({ id: 1, items: [item("A1", "Adams", "Alpha")] }, null, LAST_SEARCH);

        /** @type {HTMLElement} */ (document.querySelector("#docsHolder .checkbox-container")).click();

        expect(Object.keys(list.getSelectedItems())).toEqual(["A1"]);
        expect(document.querySelectorAll("#selectedHolder .selDoc")).toHaveLength(1);

        /** @type {HTMLElement} */ (document.getElementById("cancelSelectBtn")).click();

        expect(Object.keys(list.getSelectedItems())).toEqual([]);
        expect(counts[counts.length - 1]).toBe(0);
    });
});
