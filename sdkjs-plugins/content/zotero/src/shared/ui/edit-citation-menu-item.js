/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

// @ts-check

/**
 * "Edit citation" in the editor's context menu, offered only on a citation
 * of this plugin.
 *
 * The editor fills the menu with the items of plugins once every plugin
 * that listens to it has answered, so this one answers every time, with no
 * item where there is no citation. The editor tells only the kind of the
 * menu, so whether a citation is at the cursor is asked of the document.
 */
class EditCitationMenuItem {
    /** @type {any} */
    #button;
    /** @type {() => Promise<boolean>} */
    #isCitationAtCursor;

    /**
     * @param {() => Promise<boolean>} isCitationAtCursor
     * @param {() => any} onClick
     */
    constructor(isCitationAtCursor, onClick) {
        this.#isCitationAtCursor = isCitationAtCursor;
        this.#button = new Asc.ButtonContextMenu();
        this.#button.text = "Edit citation";
        this.#button.addCheckers("Target", "Selection");
        this.#button.attachOnClick(onClick);
        window.Asc.plugin.attachEvent(
            "onContextMenuShow",
            (/** @type {any} */ options) => this.#answer(options),
        );
    }

    /**
     * @param {any} options - the menu the editor shows
     * @returns {Promise<void>}
     */
    async #answer(options) {
        /** @type {{guid: string, items: Array<any>}} */
        const answer = { guid: window.Asc.plugin.guid, items: [] };
        if (options) {
            // Adds the item if the kind of the menu is one it is offered in.
            this.#button.onContextMenuShow(options, answer);
        }
        if (answer.items.length) {
            const isCitation = await this.#isCitationAtCursor().catch((e) => {
                console.error(e);
                return false;
            });
            if (!isCitation) {
                answer.items = [];
            }
        }
        window.Asc.plugin.executeMethod("AddContextMenuItem", [answer]);
    }
}

export { EditCitationMenuItem };
