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

// @ts-check

/// <reference path="./types.js" />
/// <reference path="./assistant-hint.js" />
/// <reference path="./assistant-replace-hint.js" />
/// <reference path="./assistant-replace.js" />
/// <reference path="../text-annotator.js" />
/// <reference path="./annotation-popup.js" />

class CustomAssistantManager {
    constructor() {
        /**
         * @type {Map<string, Assistant>}
         */
        this._customAssistants = new Map();
        this._isCustomAssistantTrackChanges = new Map();
        this._isCustomAssistantRunning = new Map();
        /** @type {Map<string, {recalcId: string, text: string, annotations: any}>} */
        this._paragraphsStack = new Map();
        /**
         * @type {{OK: 0, NOT_FOUND: 1, ERROR: 2, NO_AI_MODEL_SELECTED: 3}} 
         * @enum {0|1|2|3}
         */
        this.STATUSES = {
            OK: 0,
            NOT_FOUND: 1,
            ERROR: 2,
            NO_AI_MODEL_SELECTED: 3
        };
    }

    /**
     * @param {localStorageCustomAssistantItem} assistantData
     * @param {boolean} [isForUpdate]
     */
    createAssistant(assistantData, isForUpdate) {
        /** @type {Assistant | null} */
        let assistant = null;
        switch (assistantData.type) {
            case 0:
                assistant = new AssistantHint(
                    customAnnotationPopup,
                    assistantData,
                );
                break;
            case 1:
                assistant = new AssistantReplaceHint(
                    customAnnotationPopup,
                    assistantData,
                );
                break;
            case 2:
                assistant = new AssistantReplace(
                    customAnnotationPopup,
                    assistantData,
                );
                break;
        }
        if (!assistant) {
            throw new Error(
                "Unknown custom assistant type: " + assistantData.type,
            );
        }

        this._customAssistants.set(assistantData.id, assistant);
        if (!isForUpdate) {
            this._isCustomAssistantTrackChanges.set(assistantData.id, false);
            this._isCustomAssistantRunning.set(assistantData.id, false);
        }

        return assistant;
    }
    /**
     * @param {localStorageCustomAssistantItem} assistantData
     */
    updateAssistant(assistantData) {
        let oldAssistant = this._customAssistants.get(assistantData.id);
        if (!oldAssistant) {
            throw new Error("Custom assistant not found: " + assistantData.id);
        }
        const isRunning = this._isCustomAssistantRunning.get(assistantData.id);
        const newAssistant = this.createAssistant(assistantData, isRunning);
        if (!isRunning) {
            return newAssistant;
        }

        this._paragraphsStack.forEach((value, paraId) => {
            newAssistant.onChangeParagraph(
                paraId,
                value.recalcId,
                value.text,
                value.annotations,
            );
        });
        const paragraphIdsToUpdate = [...oldAssistant.checked];
        oldAssistant.checked.clear();
        newAssistant.checkParagraphs(paragraphIdsToUpdate);

        return newAssistant;
    }

    /** @param {string} assistantId */
    deleteAssistant(assistantId) {
        this._customAssistants.delete(assistantId);
        this._isCustomAssistantTrackChanges.delete(assistantId);
        this._isCustomAssistantRunning.delete(assistantId);
    }

    /** 
     * @param {string} assistantId
     * @returns {boolean}
     */
    isCustomAssistantRunning(assistantId) {
        return this._isCustomAssistantRunning.get(assistantId);
    }

    /**
     * @param {string} assistantId
     * @param {string[]} paraIds
     * @returns {Promise<number>}
     */
    async run(assistantId, paraIds) {
        const assistant = this._customAssistants.get(assistantId);
        if (!assistant) {
            return this.STATUSES.NOT_FOUND;
        }
        this._isCustomAssistantRunning.set(assistantId, true);

        if (!this._isCustomAssistantTrackChanges.get(assistantId)) {
            /** @type {Promise<boolean | null>[]} */
            const promises = [];
            this._paragraphsStack.forEach((value, paraId) => {
                const promise = assistant.onChangeParagraph(
                    paraId,
                    value.recalcId,
                    value.text,
                    value.annotations,
                );
                promises.push(promise);
            });
            await Promise.all(promises);
        }

        /** @type {Array<boolean | null>} */
        const isParagraphsChecked = await assistant.checkParagraphs(paraIds);

        if (
            isParagraphsChecked && 
            isParagraphsChecked.length &&  
            isParagraphsChecked.every(isDone => !isDone) 
        ) {
            if (isParagraphsChecked.some(isDone => isDone === null)) {
                return this.STATUSES.NO_AI_MODEL_SELECTED;
            }
            return this.STATUSES.ERROR;
        }

        this._isCustomAssistantTrackChanges.set(assistantId, true);

        return this.STATUSES.OK;
    }

    /** @param {string} assistantId */
    async stop(assistantId) {
        this._isCustomAssistantRunning.set(assistantId, false);

        let assistant = this._customAssistants.get(assistantId);
        if (!assistant) {
            throw new Error("Custom assistant not found: " + assistantId);
        }
        const paraIdsToUncheck = [...assistant.checked];
        assistant.checked.clear();
        this._isCustomAssistantTrackChanges.set(assistantId, false);
        await assistant.uncheckParagraphs(paraIdsToUncheck);
    }

    /**
     * @param {string} paragraphId
     * @param {string} recalcId
     * @param {string} text
     * @param {*} annotations
     */
    onChangeParagraph(paragraphId, recalcId, text, annotations) {
        this._paragraphsStack.set(paragraphId, {
            recalcId,
            text,
            annotations,
        });
        this._customAssistants.forEach((assistant, assistantId) => {
            const isInit = this._isCustomAssistantTrackChanges.get(assistantId);
            if (!isInit) {
                return;
            }
            assistant.onChangeParagraph(
                paragraphId,
                recalcId,
                text,
                annotations,
            );
            const isRunning = this._isCustomAssistantRunning.get(assistantId);
            if (isRunning) {
                assistant.checkParagraphs([paragraphId]);
            }
        });
    }

    /** @param {string} assistantId */
    onBlur(assistantId) {
        const assistant = this._customAssistants.get(assistantId);
        if (assistant) {
            assistant.onBlur();
        }
    }

    /**
     * @param {string} assistantId
     * @param {string} paragraphId
     * @param {*} ranges
     */
    onClick(assistantId, paragraphId, ranges) {
        const assistant = this._customAssistants.get(assistantId);
        if (assistant) {
            assistant.onClick(paragraphId, ranges);
        } else {
            console.error("Custom assistant not found: " + assistantId);
        }
    }
}
