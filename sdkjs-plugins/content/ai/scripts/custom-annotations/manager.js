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

class CustomAssistantManager {
    constructor() {
		/**
		 * @type {Map<string, CustomAnnotator>}
		 */
        this._customAssistants = new Map();
        this._isCustomAssistantInit = new Map();
        this._isCustomAssistantRunning = new Map();
		/** @type {Map<string, {recalcId: number, text: string, annotations: any}>} */
		this._paragraphsStack = new Map();
    }

    /**
     * @param {localStorageCustomAssistantItem} assistantData
     * @returns
     */
    createAssistant(assistantData) {
        let assistant = this._customAssistants.get(assistantData.id);
        if (assistant) {
            assistant.assistantData = assistantData;
            assistant.type = assistantData.type;
            return assistant;
        }
        switch (assistantData.type) {
            case 0:
                assistant = new AssistantHint(assistantData);
                break;
            case 1:
                assistant = new AssistantReplaceHint(assistantData);
                break;
            case 2:
                assistant = new AssistantReplace(assistantData);
                break;
            default:
                throw new Error(
                    `Unknown assistant type: ${assistantData.type}`
                );
        }
        
        this._isCustomAssistantInit.set(assistantData.id, false);
        this._isCustomAssistantRunning.set(assistantData.id, false);
        this._customAssistants.set(assistantData.id, assistant);

        return assistant;
    }

    /** @param {string} assistantId */
    deleteAssistant(assistantId) {
        this._customAssistants.delete(assistantId);
        this._isCustomAssistantInit.delete(assistantId);
        this._isCustomAssistantRunning.delete(assistantId);
    }

	/** @param {string} assistantId */
    checkNeedToRunAssistant(assistantId) {
		const isRunning = this._isCustomAssistantRunning.get(assistantId);
        this._isCustomAssistantRunning.set(
            assistantId,
            !isRunning
        );
		return isRunning;
    }

    /**
     * @param {string} assistantId
     * @param {string[]} paraIds
     */
    run(assistantId, paraIds) {
        const assistant = this._customAssistants.get(assistantId);
		if (!assistant) {
			console.error("Custom assistant not found: " + assistantId);
			return;
		}

		if (!this._isCustomAssistantInit.get(assistantId)) {
			this._paragraphsStack.forEach((value, paraId) => {
				assistant.onChangeParagraph(
					paraId,
					value.recalcId,
					value.text,
					value.annotations
				)
			});
		}

        assistant.checkParagraphs(paraIds);
		this._isCustomAssistantInit.set(assistantId, true);
    }

    /**
     * @param {string} paragraphId
     * @param {number} recalcId
     * @param {string} text
     * @param {*} annotations
     */
    onChangeParagraph(paragraphId, recalcId, text, annotations) {
		this._paragraphsStack.set(paragraphId, {
			recalcId,
			text,
			annotations
		});
        this._customAssistants.forEach((assistant, assistantId) => {
            const isInit = this._isCustomAssistantInit.get(assistantId);
		    if (!isInit) {
				return;
			}	
			assistant.onChangeParagraph(
                paragraphId,
                recalcId,
                text,
                annotations
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
