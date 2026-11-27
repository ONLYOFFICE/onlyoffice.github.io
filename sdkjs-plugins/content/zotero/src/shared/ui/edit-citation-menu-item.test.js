import { beforeEach, describe, expect, it, vi } from "vitest";
import { EditCitationMenuItem } from "./edit-citation-menu-item.js";

/** @type {Array<any>} */
let answers;
/** @type {(options: any) => Promise<void>} */
let showMenu;

beforeEach(() => {
    answers = [];
    const plugin = {
        guid: "asc.{test}",
        attachEvent: (/** @type {string} */ name, /** @type {any} */ handler) => {
            if (name === "onContextMenuShow") showMenu = handler;
        },
        executeMethod: (/** @type {string} */ name, /** @type {Array<any>} */ params) => {
            if (name === "AddContextMenuItem") answers.push(params[0]);
        },
    };
    // The part of the plugin runtime's button the item relies on: it adds
    // itself to the answer for the kinds of menu it was given.
    class ButtonContextMenu {
        constructor() {
            /** @type {Array<string>} */
            this.kinds = [];
            this.text = "";
        }
        addCheckers(/** @type {Array<string>} */ ...kinds) {
            this.kinds = kinds;
        }
        attachOnClick() {}
        onContextMenuShow(/** @type {any} */ options, /** @type {any} */ parent) {
            if (this.kinds.indexOf(options.type) !== -1) {
                parent.items.push({ id: "edit", text: this.text });
            }
        }
    }
    vi.stubGlobal("Asc", { plugin: plugin, ButtonContextMenu: ButtonContextMenu });
    /** @type {any} */ (window).Asc = { plugin: plugin, ButtonContextMenu: ButtonContextMenu };
});

describe("Edit citation in the context menu", () => {
    it("is offered on a citation", async () => {
        new EditCitationMenuItem(async () => true, () => {});
        await showMenu({ type: "Target" });
        expect(answers).toEqual([{ guid: "asc.{test}", items: [{ id: "edit", text: "Edit citation" }] }]);
    });

    it("is not offered elsewhere, but the editor still gets an answer", async () => {
        new EditCitationMenuItem(async () => false, () => {});
        await showMenu({ type: "Selection" });
        expect(answers).toEqual([{ guid: "asc.{test}", items: [] }]);
    });

    it("does not ask the document for a menu it is not offered in", async () => {
        const isCitationAtCursor = vi.fn(async () => true);
        new EditCitationMenuItem(isCitationAtCursor, () => {});
        await showMenu({ type: "Image" });
        expect(isCitationAtCursor).not.toHaveBeenCalled();
        expect(answers).toEqual([{ guid: "asc.{test}", items: [] }]);
    });

    it("answers with no item when the document cannot be read", async () => {
        vi.spyOn(console, "error").mockImplementation(() => {});
        new EditCitationMenuItem(() => Promise.reject(new Error("busy")), () => {});
        await showMenu({ type: "Target" });
        expect(answers).toEqual([{ guid: "asc.{test}", items: [] }]);
    });
});
