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

function GrammarChecker()
{
	this.popup   = null;
	this.paraId  = null;
	this.rangeId = null;
		
	this.paragraphs = {};

	this.currParaId  = null;
	this.currRangeId = null;
	
	this.checkParagraph = async function (paraId, recalcId, text)
	{
		this.paragraphs[paraId] = {};

		let requestEngine = AI.Request.create(AI.ActionType.Chat);
		if (!requestEngine)
			return false;

		let isSendedEndLongAction = false;
		async function checkEndAction()
		{
			if (!isSendedEndLongAction)
				isSendedEndLongAction = true;
		}

		// 	let argPrompt = `You are a spellcheck corrector. I will provide text that may contain spelling errors. Your task is to identify all spelling mistakes and return ONLY the corrections in the following format:

		// [[startPos, endPos, "correctedText"], [startPos, endPos, "correctedText"], ...]

		// Rules:
		// - startPos: the character position where the error begins (0-indexed)
		// - endPos: the character position where the error ends (0-indexed, exclusive)
		// - correctedText: the correctly spelled replacement text
		// - Return an empty array [] if there are no errors
		// - Return an empty array [] if the text is completely unintelligible or a complete mess
		// - Do not include any explanations, commentary, or additional text
		// - Only correct spelling errors, not grammar or style

		// CRITICAL - Position Counting Method:
		// Before identifying any positions, write out the ENTIRE text with position numbers above or below each character (including spaces) as a mental exercise. Count from 0.
		// - Count EVERY single character including ALL spaces (even multiple consecutive spaces), punctuation, quotes, and special characters
		// - Each space counts as ONE character position
		// - Use 0-based indexing (first character is position 0)
		// - For EACH misspelled word, count from position 0 again to find its exact location
		// - The endPos should be the position AFTER the last character of the misspelled word

		// Example with position marking:
		// Text: "Hi  there"
		// Positions: H=0, i=1, (space)=2, (space)=3, t=4, h=5, e=6, r=7, e=8

		// MANDATORY VERIFICATION:
		// Before providing your final answer, use your calculated positions to extract each substring from the original text and verify it matches the misspelled word exactly. If it doesn't match, recount.

		// Example:
		// Input: "The quck brown fox jumps ovr the lazy dog."
		// Output: [[4, 8, "quick"], [25, 28, "over"]]

		// Example (no errors):
		// Input: "The quick brown fox jumps over the lazy dog."
		// Output: []

		// Example (unintelligible text):
		// Input: "asdfjkl qwerty zxcvbn mnbvcx"
		// Output: []

		// Text to check:`;

		let argPrompt = `You are a grammar correction tool. When I provide text, analyze it ONLY for punctuation and style issues. DO NOT check for spelling errors. Respond with corrections in the following JSON format only:
[
  {
    "sentence": "the original sentence with the error",
    "suggestion": "the corrected version of the sentence",
    "description": "brief explanation of the punctuation or style issue",
    "occurrence": 1,
    "confidence": 0.95
  }
]
Important guidelines:

Return ONLY the JSON array, no additional text
Check ONLY for punctuation errors (commas, periods, semicolons, colons, apostrophes, quotation marks, etc.) and style issues (sentence structure, word order, grammar)
CRITICAL: DO NOT flag or correct spelling errors, typos, or misspelled words - ignore them completely and leave them exactly as written
Each object represents one error found
Only include sentences that have errors - skip sentences with no errors
"sentence" field MUST contain the EXACT original text as provided - do NOT modify, correct, or change it in any way
"suggestion" field contains your corrected version (maintaining all original spelling, even if wrong)
"occurrence" indicates which occurrence of this sentence if it appears multiple times in the text (1 for first, 2 for second, etc.)
"confidence" is a value between 0 and 1 indicating how certain you are about the correction (1.0 = completely certain, 0.5 = uncertain)
If no errors are found in the entire text, return an empty array: []
Include the complete sentence containing the error, not just fragments

Example:
Input: "She dont like apples Me and him goes to school. Its a beautiful day. Its a beautiful day"
Output:
[
  {
    "sentence": "She dont like apples Me and him goes to school.",
    "suggestion": "She dont like apples. Me and him goes to school.",
    "description": "Missing period between two independent sentences",
    "occurrence": 1,
    "confidence": 1.0
  },
  {
    "sentence": "Its a beautiful day",
    "suggestion": "Its a beautiful day.",
    "description": "Missing period at end of sentence",
    "occurrence": 2,
    "confidence": 1.0
  }
]
Note: Spelling errors like "dont" and "Its" are intentionally not corrected. The first occurrence of "Its a beautiful day." has no punctuation errors so it's skipped.
Text to check:`;
		argPrompt += text;

		let response = "";
		await requestEngine.chatRequest(argPrompt, false, async function (data)
		{
			if (!data)
				return;
			await checkEndAction();

			response += data;
		});
		await checkEndAction();

		console.log("AI-response");
		console.log(response);

		let rangeId = 1;
		let ranges = [];

		let _t = this;
		function convertToRanges(text, corrections) 
		{
			for (const { sentence, suggestion, description, occurrence, confidence } of corrections) 
			{
				if (sentence === suggestion || confidence <= 0.7)
					continue;
				
				let count = 0;
				let searchStart = 0;

				while (searchStart < text.length)
				{
					const index = text.indexOf(sentence, searchStart);
					if (index === -1) break;

					const isStartBoundary = index === 0 || isWordBoundary(text[index - 1]);
					const isEndBoundary = index + sentence.length === text.length ||
						isWordBoundary(text[index + sentence.length]);

					if (isStartBoundary && isEndBoundary)
					{
						count++;
						if (count === occurrence)
						{
							ranges.push({
								"start": index,
								"length": sentence.length,
								"id": rangeId
							});
							_t.paragraphs[paraId][rangeId] = {
								"suggestion" : suggestion,
								"description" : description
							};
							++rangeId;
							break;
						}
					}
					searchStart = index + 1;
				}
			}
		}

		function isWordBoundary(char)
		{
			return /[\s.,!?;:'"()\[\]{}\-–—\/\\]/.test(char);
		}

		try 
		{
			convertToRanges(text, JSON.parse(response));
			let obj = {
				"type": "highlightText",
				"paragraphId": paraId,
				"name" : "grammar",
				"recalcId": recalcId,
				"ranges": ranges
			};
			await Asc.Editor.callMethod("AnnotateParagraph", [obj]);
		}
		catch (e)
		{ }
	}

	this.setCurrentRange = function(paraId, rangeId)
	{
		this.currParaId = paraId;
		this.currRangeId = rangeId;
	};

	this.getSuggestion = function(paraId, rangeId)
	{
		if (!this.paraId 
			|| !this.rangeId 
			|| !this.paragraphs[this.paraId] 
			|| !this.paragraphs[this.paraId][this.rangeId])
			return {"suggestion" : "", "description" : ""};

		return this.paragraphs[this.paraId][this.rangeId];
	};

	this.getCurrentRange = function()
	{
		return {
			paragraphId : this.currParaId,
			rangeId : this.currRangeId,
			name : "grammar"
		}
	};

	this.onBlur 

	this.onClickAnnotation = function(paragraphId, ranges)
	{
		console.log(`Click grammar: para=${paragraphId} ranges=${ranges}`);
		if (!ranges || !ranges.length)
			this.closePopup();
		else
			this.openPopup(paragraphId, ranges[0]);
	};

	this.openPopup = async function(paraId, rangeId)
	{
		if (this.paraId === paraId && this.rangeId === rangeId)
			return;

		this.paraId = paraId;
		this.rangeId = rangeId;

		if (this.popup)
			this.popup.close();

		let variation = {
			url : 'grammarPopup.html',
			isVisual : true,
			buttons : [],
			isModal : false,
			isCustomWindow : true,
			EditorsSupport : ["word", "slide", "cell", "pdf"],
			size : [400, 500],
			isTargeted : true,
			transparent : true
		};
		let _t = this;
		let popup = new window.Asc.PluginWindow();
		popup.attachEvent("onWindowReady", function() {
			popup.command("onUpdateSuggestion", _t.getSuggestion(paraId, rangeId));
		});
		popup.attachEvent("onAccept", function() {
		});
		popup.attachEvent("onClose", function() {
			_t.closePopup();
		});
		popup.show(variation);
		this.popup = popup;
	};

	this.closePopup = function()
	{
		if (!this.popup)
			return;

		this.paraId = null;
		this.rangeId = null;

		this.popup.close();
		this.popup = null;
	};

}