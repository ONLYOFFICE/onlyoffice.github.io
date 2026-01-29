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

/// <reference path="./custom-annotator.js" />
/// <reference path="./types.js" />

/**
 * @param {localStorageCustomAssistantItem} assistantData
 * @constructor
 * @extends CustomAnnotator
 */
function AssistantHint(annotationPopup, assistantData) {
    CustomAnnotator.call(this, annotationPopup, assistantData);
}
AssistantHint.prototype = Object.create(CustomAnnotator.prototype);
AssistantHint.prototype.constructor = AssistantHint;

Object.assign(AssistantHint.prototype, {
    /**
     * @param {string} text
     * @param {Array<HintAiResponse>} matches
     */
    _convertToRanges: function (paraId, text, matches) {
        const _t = this;
        let rangeId = 1;
        const ranges = [];
        for (const {
            origin,
            reason,
            paragraph,
            occurrence,
            confidence,
        } of matches) {
            if (confidence <= 0.7) continue;

            let count = 0;
            let searchStart = 0;

            while (searchStart < text.length) {
                const index = _t.simpleGraphemeIndexOf(
                    text,
                    origin,
                    searchStart,
                );
                if (index === -1) break;

                count++;
                if (count === occurrence) {
                    ranges.push({
                        start: index,
                        length: [...origin].length,
                        id: rangeId,
                    });
                    _t.paragraphs[paraId][rangeId] = {
                        original: origin,
                        reason: reason,
                    };
                    ++rangeId;
                    break;
                }
                searchStart = index + 1;
            }
        }
        return ranges;
    },

    /**
     * @param {string} text
     * @returns {string}
     */
    _createPrompt: function (text) {
        let prompt = `You are a multi-disciplinary text analysis assistant.
		Your task is to find text fragments that match the user's criteria.
		
		MANDATORY RULES:
			1. Analyze ONLY the provided text.
			2. Find words, phrases, or sentences that match the user's criteria.
			3. For EACH match you find:
			- Provide the exact quote.
			- Explain WHY it matches the criteria.
			- Provide position information (paragraph number).
			4. If no matches are found, return an empty array: [].
			5. Format your response STRICTLY in JSON format.
			6. Support multiple languages (English, Russian, etc.)

		Response format - return ONLY this JSON array with no additional text:
			[
			{
				"origin": "exact text fragment that matches the query",
				"reason": "detailed explanation why it matches the criteria",
				"paragraph": paragraph_number,
				"occurrence": 1,
				"confidence": 0.95
			}
			]

		Guidelines for each field:
			- "origin": EXACT UNCHANGED original text fragment. Do not fix anything in this field.
			- "reason": Clear explanation of why this fragment matches the criteria; IF the user's request contains words like "source", "reference", "link", "cite", "website", "URL", "Wikipedia", "proof", "evidence", "verify" - then you MUST include actual working links in your explanations in html format.
			- "paragraph": Paragraph number where the fragment is found (0-based index)
			- "occurrence": Which occurrence of this sentence if it appears multiple times (1 for first, 2 for second, etc.)
			- "confidence": Value between 0 and 1 indicating certainty (1.0 = completely certain, 0.5 = uncertain)
		
		CRITICAL
			- Output should be in the exact this format
			- No any comments are allowed

		CRITICAL - Output Format:
			- Return ONLY the raw JSON array, nothing else
			- DO NOT wrap the response in markdown code blocks (no \`\`\`json or \`\`\`)
			- DO NOT include any explanatory text before or after the JSON
			- DO NOT use escaped newlines (\\n) - return the JSON on a single line if possible
			- The response should start with [ and end with ]
		`;
        prompt +=
            "\n\nUSER REQUEST:\n```" + this.assistantData.query + "\n```\n\n";

        prompt += "TEXT TO ANALYZE:\n```\n" + text + "\n```\n\n";

        prompt += `Please analyze this text and find all fragments that match the user's request. Be thorough but precise.`;

        return prompt;
    },

    /**
     * @param {string} paraId
     * @param {string} rangeId
     * @return {HintInfoForPopup}
     */
    getInfoForPopup: function (paraId, rangeId) {
        let _s = this.getAnnotation(paraId, rangeId);
        let reason = _s["reason"];
        try {
            reason = reason.replace(/<a\s+(.*?)>/gi, '<a $1 target="_blank">');
        } catch (e) {
            console.error(e);
        }
        return {
            original: _s["original"],
            explanation: reason,
            type: this.type,
        };
    },

    /**
     * @param {string} paraId
     * @param {string} rangeId
     */
    onAccept: async function (paraId, rangeId) {
        await CustomAnnotator.prototype.onAccept.call(this);
        await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

        let range = this.getAnnotationRangeObj(paraId, rangeId);
        await Asc.Editor.callMethod("SelectAnnotationRange", [range]);

        await Asc.Editor.callCommand(function () {
            Api.GetDocument().RemoveSelection();
        });

        await Asc.Editor.callMethod("RemoveAnnotationRange", [range]);
        await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
        await Asc.Editor.callMethod("FocusEditor");
    },
});
