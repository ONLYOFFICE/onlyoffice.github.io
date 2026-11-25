// The citation editing window as the plugin drives it: the citation comes in
// with onAttachedContent, "Save" answers with onSaveFields - the edited
// citation, or null when nothing was changed.
import { beforeEach, describe, expect, it, vi } from "vitest";

/** @type {Object<string, Function>} */
let events;
/** @type {Array<[string, any]>} */
let sent;

beforeEach(async () => {
    document.body.innerHTML = '<div class="content"><div class="container"></div></div>';
    events = {};
    sent = [];
    Object.assign(window.Asc.plugin, {
        attachEvent: (/** @type {string} */ name, /** @type {Function} */ fn) => (events[name] = fn),
        sendToPlugin: (/** @type {string} */ name, /** @type {any} */ data) =>
            sent.push([name, data && JSON.parse(JSON.stringify(data))]),
        onThemeChangedBase: () => {},
    });
    vi.resetModules();
    await import("./edit-window.js");
});

/** @param {Object} citation */
async function open(citation) {
    await events.onAttachedContent(citation);
}

function save() {
    sent = [];
    events.onClickSave();
    return sent.find((s) => s[0] === "onSaveFields")?.[1];
}

/** @param {Object<string, any>} [fields] */
function citation(fields) {
    return {
        citationID: "c1",
        citationItems: [Object.assign({ id: "A1", itemData: { title: "Alpha", type: "book" } }, fields)],
        properties: { noteIndex: 0 },
    };
}

describe("the citation editing window", () => {
    it("reports no change for a source without a locator label saved as it was", async () => {
        await open(citation());

        expect(save()).toBeNull();
    });

    it("keeps the label a source has", async () => {
        await open(citation({ label: "chapter", locator: "3" }));

        expect(save()).toBeNull();
    });

    it.each([
        ["sorted", {}],
        ["unsorted", { unsorted: true }],
    ])("reports no change for %s sources saved as they were", async (name, properties) => {
        await open({
            citationID: "c1",
            citationItems: [
                { id: "A1", itemData: { title: "Alpha", type: "book" } },
                { id: "B2", itemData: { title: "Beta", type: "book" } },
            ],
            properties: Object.assign({ noteIndex: 0 }, properties),
        });

        expect(save()).toBeNull();
    });

    it("reports unchecking \"Keep sources sorted\"", async () => {
        await open({
            citationID: "c1",
            citationItems: [
                { id: "A1", itemData: { title: "Alpha", type: "book" } },
                { id: "B2", itemData: { title: "Beta", type: "book" } },
            ],
            properties: { noteIndex: 0 },
        });
        /** @type {HTMLElement} */ (document.querySelector(".keep-sorted .checkbox-container")).click();

        expect(save().properties.unsorted).toBe(true);
    });

    it("reports a new locator, keeping the label the window showed out of the data", async () => {
        await open(citation());
        const input = /** @type {HTMLInputElement} */ (
            document.querySelectorAll(".container form input[type=text]")[0]
        );
        input.value = "12";
        input.dispatchEvent(new Event("input", { bubbles: true }));

        const saved = save();

        expect(saved.citationItems[0].locator).toBe("12");
        expect(saved.citationItems[0]).not.toHaveProperty("label");
    });
});

describe("dragging a source", () => {
    it("stops once the button was released outside the window", async () => {
        await open({
            citationID: "c1",
            citationItems: [
                { id: "A1", itemData: { title: "Alpha", type: "book" } },
                { id: "B2", itemData: { title: "Beta", type: "book" } },
            ],
            properties: { noteIndex: 0 },
        });
        const header = /** @type {HTMLElement} */ (document.querySelector(".form-header"));
        const form = /** @type {HTMLElement} */ (header.parentElement);

        header.dispatchEvent(new MouseEvent("mousedown", { button: 0, buttons: 1, clientY: 0, bubbles: true }));
        // The pointer comes back with the button already released.
        document.dispatchEvent(new MouseEvent("mousemove", { buttons: 0, clientY: 500 }));
        document.dispatchEvent(new MouseEvent("mousemove", { buttons: 1, clientY: 1000 }));

        expect(form.classList.contains("dragging")).toBe(false);
        expect(save()).toBeNull();
    });
});
