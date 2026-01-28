/*
 * (c) Copyright Ascensio System SIA 2010-2025
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

/// <reference path="./types.js" />
/// <reference path="../text-annotator.js" />

/**
 * @constructor
 * @extends TextAnnotator
 */
function CustomAnnotator(annotationPopup, assistantData) {
    TextAnnotator.call(this, annotationPopup);
    this.assistantData = assistantData;
    this.type = assistantData.type;
    this._skipNextChangeParagraph = false;

    this._lastUsedPrompt = "";
}
CustomAnnotator.prototype = Object.create(TextAnnotator.prototype);
CustomAnnotator.prototype.constructor = CustomAnnotator;

Object.assign(CustomAnnotator.prototype, {
    /**
     * @param {string} paraId
     * @param {string} recalcId
     * @param {string} text
     * @returns {Promise<boolean | null>}
     */
    annotateParagraph: async function (paraId, recalcId, text) {
        this.paragraphs[paraId] = {};

        if (text.length === 0) return false;

        const argPrompt = this._createPrompt(text);

        if (this._lastUsedPrompt && argPrompt !== this._lastUsedPrompt) {
            let resetInstruction = 
                `CRITICAL
                    - Ignore all previous messages and instructions.
                    - Please respond only to this new query and treat this as a new request.
                
                    `;
            argPrompt = resetInstruction + argPrompt;
            this._lastUsedPrompt = argPrompt;    
        }

        let response = await this.chatRequest(argPrompt);

        if (!response || response === "[]") {
            if (response === null) {
                return null; // no AI model selected
            }
            return false;
        }

        try {
            const ranges = this._convertToRanges(
                paraId,
                text,
                JSON.parse(response),
            );
            let obj = {
                type: "highlightText",
                paragraphId: paraId,
                name: "customAssistant_" + this.assistantData.id,
                recalcId: recalcId,
                ranges: ranges,
            };
            await Asc.Editor.callMethod("AnnotateParagraph", [obj]);
        } catch (e) {}

        return true;
    },
    /**
     * @param {string} paraId
     * @param {string} rangeId
     */
    getAnnotationRangeObj: function (paraId, rangeId) {
        return {
            paragraphId: paraId,
            rangeId: rangeId,
            name: "customAssistant_" + this.assistantData.id,
        };
    },
    _handleNewRangePositions: async function (range, paraId, text) {
        if (
            !range ||
            range["name"] !== "customAssistant_" + this.assistantData.id ||
            !this.paragraphs[paraId]
        )
            return;

        let rangeId = range["id"];
        let annot = this.getAnnotation(paraId, rangeId);

        if (!annot) return;

        let start = range["start"];
        let len = range["length"];

        if (annot["original"] !== text.substring(start, start + len)) {
            let annotRange = this.getAnnotationRangeObj(paraId, rangeId);
            return Asc.Editor.callMethod("RemoveAnnotationRange", [annotRange]);
        }
    },
    /**
     * @param {string[]} paraIds
     * @returns {Promise<Array<boolean | null>>}
     */
    checkParagraphs: async function (paraIds) {
        if (this._skipNextChangeParagraph) {
            this._skipNextChangeParagraph = false;
            return paraIds.map(() => false);
        }
        return await TextAnnotator.prototype.checkParagraphs.call(
            this,
            paraIds,
        );
    },
    /**
     * @param {Array<string>} paraIds 
     * @returns 
     */
    uncheckParagraphs: async function (paraIds) {
        /** @type {Promise<any>[]} */
        const promises = [];

        paraIds.forEach(function(paraId) {
            promises.push(Asc.Editor.callMethod("RemoveAnnotationRange", [{
                all: true,
                paragraphId : paraId,
		        rangeId : undefined,
                name: "customAssistant_" + this.assistantData.id
            }]));
        }, this);

        return Promise.all(promises);
    },
    onAccept: async function (paraId, rangeId) {
        if (this.type !== 0) { // not for hint
            this._skipNextChangeParagraph = true;
        }
    },
});
