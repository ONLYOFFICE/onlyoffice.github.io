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

/// <reference path="../../../../zotero/shared/types-global.js" />

import { CSLCitation } from "@shared/csl/citation";
import { encodeCitationTag } from "./content-control-citation-document";

/** @typedef {import("../services/citation-doc-service").CitationDocService} CitationDocService */

/**
 * The citations the old Mendeley Desktop plugin kept in addin fields, which
 * Mendeley Cite does not read: they are rewritten as its content controls.
 */
class MendeleyDesktopFields {
    /** @type {CitationDocService} */
    #controls;

    /** @param {CitationDocService} controls - the document's controls and fields */
    constructor(controls) {
        this.#controls = controls;
    }

    /**
     * The fields of the old plugin in the document.
     * @returns {Promise<Array<AddinFieldData>>}
     */
    find() {
        return this.#controls.getAddinMendeleyFields();
    }

    /**
     * Rewrites the fields as content controls of Mendeley Cite, keeping their
     * text.
     * @param {Array<AddinFieldData>} fields - from find()
     * @returns {Promise<void>}
     */
    upgrade(fields) {
        CSLCitation.resetUsedIDs();

        const bibField = fields.find((field) => field.Value.indexOf("Mendeley Bibliography") === 0);

        const infoForUpgrade = fields
            .filter((field) => !bibField || bibField.FieldId !== field.FieldId)
            .map((field, index) => {
                /** @type {CitationData} */
                const citationObject = JSON.parse(
                    field.Value.slice(field.Value.indexOf("{"), field.Value.lastIndexOf("}") + 1),
                );
                if (citationObject && citationObject.citationItems) {
                    // Mendeley Cite knows an item by its uuid, which the old
                    // plugin kept only in the item's URIs.
                    citationObject.citationItems.forEach(function (item) {
                        if (item.uris && item.uris.length) {
                            let id = item.id;
                            item.uris.some(/** @param {string} uri */ (uri) => {
                                const sign = "?uuid=";
                                const start = uri.indexOf(sign);
                                if (start === -1) {
                                    return false;
                                }
                                const end = uri.indexOf("&", start + sign.length);
                                id = end === -1
                                    ? uri.slice(start + sign.length)
                                    : uri.slice(start + sign.length, end);
                                return true;
                            });
                            item.id = id;
                            if (item.itemData) item.itemData.id = id;
                        }
                    });
                }
                const cslCitation = new CSLCitation();
                cslCitation.fillFromObject(citationObject);
                cslCitation.setManualOverride(field.Content);
                // Numbered as they follow each other, as Mendeley does.
                cslCitation.setNoteIndex(index + 1);
                return { field: field, newValue: encodeCitationTag(cslCitation.toJSON()) };
            });

        return this.#controls.upgradeCslItems(infoForUpgrade, bibField);
    }
}

export { MendeleyDesktopFields };
