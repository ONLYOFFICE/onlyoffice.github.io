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

var WORD_FUNCTIONS = {};

(function(){
	WORD_FUNCTIONS.commentText = function()
	{
		let func = new RegisteredFunction();
		func.name = "commentText";
		func.description = "Use this function if you asked to comment or explain anything. If text or paragraph number is not specified assume that we are working with the current paragraph. Specify whether the explanation should be added as a comment or as a footnote. The AI will generate the content based on your prompt and insert it in the chosen format.";
		func.params = [
			"type (string): whether to add as a 'comment' or as a 'footnote' (default is 'comment')"
		];


		func.examples = [
			"If you need to explain something, respond with:\n" +
			"[functionCalling (commentText)]: {\"prompt\" : \"Explain this text\", \"type\": \"comment\"}",

			"If you need to explain selected text as a comment, respond with:\n" +
			"[functionCalling (commentText)]: {\"prompt\" : \"Explain this text\", \"type\": \"comment\"}",

			"If you need to add a footnote to selected text, respond with:\n" +
			"[functionCalling (commentText)]: {\"prompt\" : \"Add a footnote to this text\", \"type\": \"footnote\"}",

			"If you need to comment selected text, respond with:\n" +
			"[functionCalling (commentText)]: {\"prompt\" : \"Comment this text\"}",

			"If you need to explain selected text as a footnote, respond with:\n" +
			"[functionCalling (commentText)]: {\"prompt\" : \"Explain this text\", \"type\": \"footnote\"}"
		];
		
		func.call = async function(params) {
			let type = params.type;
			let isFootnote = "footnote" === type;

			let text = await Asc.Editor.callCommand(function(){
				let doc = Api.GetDocument();
				let range = doc.GetRangeBySelect();
				let text = range ? range.GetText() : "";
				if (!text)
				{
					text = doc.GetCurrentWord();
					doc.SelectCurrentWord();
				}

				return text;
			});

			let argPromt = params.prompt + ":\n" + text;

			let requestEngine = AI.Request.create(AI.ActionType.Chat);
			if (!requestEngine)
				return;

			let isSendedEndLongAction = false;
			async function checkEndAction() {
				if (!isSendedEndLongAction) {
					await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
					isSendedEndLongAction = true
				}
			}

			await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
			await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

			if (isFootnote)
			{
				let addFootnote = true;
				let result = await requestEngine.chatRequest(argPromt, false, async function(data) {
					if (!data)
						return;

					await checkEndAction();
					Asc.scope.data = data;
					Asc.scope.model = requestEngine.modelUI.name;

					if (addFootnote)
					{
						await Asc.Editor.callCommand(function(){
							Api.GetDocument().AddFootnote();
						});
						addFootnote = false;
					}
					await Asc.Library.PasteText(data);
				});
			}
			else 
			{
				let commentId = null;
				let result = await requestEngine.chatRequest(argPromt, false, async function(data) {
					if (!data)
						return;

					await checkEndAction();
					Asc.scope.data = data;
					Asc.scope.model = requestEngine.modelUI.name;
					Asc.scope.commentId = commentId;

					commentId = await Asc.Editor.callCommand(function(){
						let doc = Api.GetDocument();

						let commentId = Asc.scope.commentId;
						if (!commentId)
						{
							let range = doc.GetRangeBySelect();
							if (!range)
								return null;

							let comment = range.AddComment(Asc.scope.data, Asc.scope.model, "uid" + Asc.scope.model);
							if (!comment)
								return null;
							doc.ShowComment([comment.GetId()]);
							return comment.GetId();
						}

						let comment = doc.GetCommentById(commentId);
						if (!comment)
							return commentId;

						comment.SetText(comment.GetText() + scope.data);
						return commentId;
					});
				});
			}

			await checkEndAction();
			await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
		};

		return func;
	}
	WORD_FUNCTIONS.rewriteText = function() 
	{
		let func = new RegisteredFunction();
		func.name = "rewriteText";
		func.params = [
			"parNumber (number): the paragraph number to change",
			"prompt (string): instructions on how to change the text",
			"showDifference (boolean): whether to show the difference between the original and new text, or just replace it",
			"type (string): which part of the text to be rewritten (e.g., 'sentence' or 'paragraph')"
		];
		func.description = "Use this function when you asked to rewrite or replace some text. If text or paragraph number is not specified assume that we are working with the current paragraph.";

		func.examples = [
			"if you need to rewrite, respond with:\n" +
			"[functionCalling (rewriteText)]: {\"prompt\": \"Rewrite\", \"type\" : \"paragraph\"}",

			"If you need to rephrase current sentence, respond with:\n" +
			"[functionCalling (rewriteText)]: {\"prompt\": \"rephrase sentence\", \"type\" : \"sentence\"}",

			"If you need to rephrase current sentence and show difference, respond with:\n" +
			"[functionCalling (rewriteText)]: {\"prompt\": \"rephrase sentence\", \"type\" : \"sentence\", \"showDifference\" : true}",

			"if you need to change paragraph 2 to be more emotional, respond with:\n" +
			"[functionCalling (rewriteText)]: {\"parNumber\": 2, \"prompt\": \"make the text more emotional\", \"type\" : \"paragraph\"}",

			"if you need to rewrite the first paragraph, respond with:\n" +
			"[functionCalling (rewriteText)]: {\"parNumber\": 1, \"prompt\": \"Rephrase \", \"type\" : \"paragraph\"}",

			"if you need to rewrite the current paragraph to be more official, respond with:\n" +
			"[functionCalling (rewriteText)]: {\"prompt\": \"Rewrite in official style\", \"type\" : \"paragraph\"}"
		];
		
		func.call = async function(params) {

			let text = "";
			if ("paragraph" === params.type)
			{
				Asc.scope.parNumber = params.parNumber;
				text = await Asc.Editor.callCommand(function(){
					let doc = Api.GetDocument();
					let par = undefined === Asc.scope.parNumber ? doc.GetCurrentParagraph() : doc.GetElement(Asc.scope.parNumber - 1);
					if (!par)
						return "";
					par.Select();
					return par.GetText();
				});
			}
			else // if ("sentence" === params.type)
			{
				text = await Asc.Editor.callCommand(function(){
					return Api.GetDocument().GetCurrentSentence();
				});
			}

			let argPromt = params.prompt + ":\n" + text + "\n Answer with only the new one sentence, no need of any explanations";

			let requestEngine = AI.Request.create(AI.ActionType.Chat);
			if (!requestEngine)
				return;

			await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

			let turnOffTrackChanges = false;
			if (params.showDifference)
			{
				let isTrackChanges = await Asc.Editor.callCommand(function(){
					return Api.GetDocument().IsTrackRevisions();
				});

				if (!isTrackChanges)
				{
					await Asc.Editor.callCommand(function(){
						Api.GetDocument().SetTrackRevisions(true);
					});
					turnOffTrackChanges = true;
				}
			}

			await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);

			let isSendedEndLongAction = false;
			async function checkEndAction() {
				if (!isSendedEndLongAction) {
					await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
					isSendedEndLongAction = true
				}
			}

			let result = await requestEngine.chatRequest(argPromt, false, async function(data) {
				if (!data)
					return;
				await checkEndAction();

				if (text && "sentence" === params.type)
				{
					Asc.scope.data = data;
					await Asc.Editor.callCommand(function(){
						let doc = Api.GetDocument();
						doc.ReplaceCurrentSentence("");
					});
					text = null;
				}

				await Asc.Library.PasteText(data);
			});

			await checkEndAction();

			if (turnOffTrackChanges)
				await Asc.Editor.callCommand(function(){return Api.GetDocument().SetTrackRevisions(false);});

			await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
		};

		return func;
	}
	WORD_FUNCTIONS.changeTextStyle = function()
	{
		let func = new RegisteredFunction();
		func.name = "changeTextStyle";
		func.params = [
			"bold (boolean): whether to make the text bold",
			"italic (boolean): whether to make the text italic",
			"underline (boolean): whether to underline the text",
			"strikeout (boolean): whether to strike out the text",
			"fontSize (number): font size to apply to the selected text"
		];
		
		func.examples = [
			"If you need to make selected text bold and italic, respond with:" +
			"[functionCalling (changeTextStyle)]: {\"bold\": true, \"italic\": true }",
		
			"If you need to underline the selected text, respond with:" +
			"[functionCalling (changeTextStyle)]: {\"underline\": true }",
		
			"If you need to strike out the selected text, respond with:" +
			"[functionCalling (changeTextStyle)]: {\"strikeout\": true }",
		
			"If you need to set the font size of selected text to 18, respond with:" +
			"[functionCalling (changeTextStyle)]: {\"fontSize\": 18 }",
		
			"If you need to make selected text bold, respond with:" +
			"[functionCalling (changeTextStyle)]: {\"bold\": true }",
		
			"If you need to make selected text non-italic, respond with:" +
			"[functionCalling (changeTextStyle)]: {\"italic\": false }"
		];
		
		func.call = async function(params) {
			Asc.scope.bold = params.bold;
			Asc.scope.italic = params.italic;
			Asc.scope.underline = params.underline;
			Asc.scope.strikeout = params.strikeout;
			Asc.scope.fontSize = params.fontSize;
			await Asc.Editor.callCommand(function(){
				let doc = Api.GetDocument();
				let range = doc.GetRangeBySelect();
				if (!range || "" === range.GetText())
				{
					doc.SelectCurrentWord();
					range = doc.GetRangeBySelect();
				}

				if (!range)
					return;

				if (undefined !== Asc.scope.bold)
					range.SetBold(Asc.scope.bold);

				if (undefined !== Asc.scope.italic)
					range.SetItalic(Asc.scope.italic);

				if (undefined !== Asc.scope.underline)
					range.SetUnderline(Asc.scope.underline);

				if (undefined !== Asc.scope.strikeout)
					range.SetStrikeout(Asc.scope.strikeout);

				if (undefined !== Asc.scope.fontSize)
					range.SetFontSize(Asc.scope.fontSize);
			});
		};

		return func;
	}
	WORD_FUNCTIONS.insertPage = function()
	{
		let func = new RegisteredFunction();
		func.name = "insertPage";
		func.params = [
			"location (string): where to insert the new page ('current', 'start', or 'end')"
		];

		func.examples = [
			"If you need to insert blank page to the current location, respond with:" +
			"[functionCalling (insertPage)]: {\"location\": \"current\"}",

			"If you need to add page to the end of the document, respond with:" +
			"[functionCalling (insertPage)]: {\"location\": \"end\"}",

			"If you need to add page to the start of the document, respond with:" +
			"[functionCalling (insertPage)]: {\"location\": \"start\"}"
		];
		
		func.call = async function(params) {
			Asc.scope.location = params.location;

			await Asc.Editor.callCommand(function(){
				let doc = Api.GetDocument();
				if ("start" === Asc.scope.location)
					doc.MoveCursorToStart();
				else if ("end" === Asc.scope.location)
					doc.MoveCursorToEnd();

				Api.GetDocument().InsertBlankPage();
			});
		};

		return func;
	}
	WORD_FUNCTIONS.checkSpelling = function() 
	{
		let func = new RegisteredFunction();
		func.name = "checkSpelling";
		func.params = [
		];

		func.description = "Use this function if you asked to check spelling for current paragraph or fix other type of text errors in the current paragraph."

		func.examples = [
			"if you need to check spelling for the current paragraph, respond with:\n" +
			"[functionCalling (checkSpelling)]: {}"
		];
		
		func.call = async function(params) {

			let text = await Asc.Editor.callCommand(function(){
				let par = Api.GetDocument().GetCurrentParagraph();
				if (!par)
					return "";
				par.Select();
				return par.GetText();
			});

			let argPromt = "Check spelling and grammar for text:" + ":\n" + text + "\n Answer with only the new corrected text, no need of any explanations.";

			let isTrackChanges = await Asc.Editor.callCommand(function(){
				let isOn = Api.GetDocument().IsTrackRevisions();
				if (isOn)
					Api.GetDocument().SetTrackRevisions(false);
				return isOn;
			});

			let requestEngine = AI.Request.create(AI.ActionType.Chat);
			if (!requestEngine)
				return;

			await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

			await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);

			let isSendedEndLongAction = false;
			async function checkEndAction() {
				if (!isSendedEndLongAction) {
					await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
					isSendedEndLongAction = true
				}
			}

			let resultText = "";

			let result = await requestEngine.chatRequest(argPromt, false, async function(data) {
				if (!data)
					return;
				await checkEndAction();

				resultText += data;

				await Asc.Editor.callMethod("EndAction", ["GroupActions", "", "cancel"]);
				await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

				Asc.scope.text = resultText;
				await Asc.Editor.callCommand(function(){
					let par = Api.GetDocument().GetCurrentParagraph();
					if (!par)
						return "";
					par.Select();					
					Api.ReplaceTextSmart([Asc.scope.text]);
				});
			});

			await checkEndAction();

			await Asc.Editor.callMethod("EndAction", ["GroupActions", "", "cancel"]);
			await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

			Asc.scope.modelName = requestEngine.modelUI.name;
			await Asc.Editor.callCommand(function(){
				return Api.GetDocument().SetAssistantTrackRevisions(true, Asc.scope.modelName);
			});

			Asc.scope.text = resultText;
			await Asc.Editor.callCommand(function(){
				let par = Api.GetDocument().GetCurrentParagraph();
				if (!par)
					return "";
				par.Select();
				Api.ReplaceTextSmart([Asc.scope.text]);
			});

			await Asc.Editor.callCommand(function(){
				return Api.GetDocument().SetAssistantTrackRevisions(false);
			});

			if (isTrackChanges)
			{
				await Asc.Editor.callCommand(function(){
					Api.GetDocument().SetTrackRevisions(true);
				});
			}

			await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
		};

		return func;
	}
	WORD_FUNCTIONS.addImage = function()
	{
		let func = new RegisteredFunction();
		func.name = "addImage";
		func.params = [
			"description (string): text description of the image to generate",
			"width (number, optional): image width in mm (default: 100)",
			"height (number, optional): image height in mm (default: 100)",
			"style (string, optional): image style (realistic, cartoon, abstract, etc.)"
		];

		func.description = "Generate an image from text and insert it at the current cursor position. Width and height are in millimeters.";

		func.examples = [
			"If you need to add an image of a sunset, respond with:\n" +
			"[functionCalling (addImage)]: {\"description\": \"sunset over mountains\"}",

			"If you need a cartoon-style team image with custom size, respond with:\n" +
			"[functionCalling (addImage)]: {\"description\": \"team of office workers\", \"style\": \"cartoon\", \"width\": 180, \"height\": 120}",

			"If you need to add a realistic photo of a laptop on a wooden desk, respond with:\n" +
			"[functionCalling (addImage)]: {\"description\": \"realistic photo of a laptop on a wooden desk\", \"style\": \"realistic\", \"width\": 120, \"height\": 80}",

			"If you need to generate an abstract geometric background and insert it near the current text, respond with:\n" +
			"[functionCalling (addImage)]: {\"description\": \"abstract geometric background with vibrant colors\", \"style\": \"abstract\"}"
		];

		func.call = async function(params) {
			
			let requestEngine = null;
			requestEngine = AI.Request.create(AI.ActionType.ImageGeneration);
			if (!requestEngine) {
				return;
			}
			
			let widthMm = params.width || 100;
			let heightMm = params.height || 100;

			let widthPx = (widthMm / 25.4) * 96 + 0.5 >> 0;
			let heightPx = (heightMm / 25.4) * 96 + 0.5 >> 0;

			let fullPrompt = params.description;
			let imageStyle = params.style ? params.style : "realistic";
			let sizeFormat = "";
			let aspectRatio = widthPx / heightPx;
			if (aspectRatio > 1.8) {
				sizeFormat += ", wide panoramic format";
			}
			else if (aspectRatio < 0.6) {
				sizeFormat += ", tall vertical format";
			}
			else if (aspectRatio > 0.9 && aspectRatio < 1.1) {
				sizeFormat += ", square format";
			}
			
			fullPrompt = imageStyle + " style, " + fullPrompt + ", image size " + widthPx + "x" + heightPx + " pixels" + sizeFormat;

		
			try {
				let actionName = "AI (" + requestEngine.modelUI.name + ")";
				await Asc.Editor.callMethod("StartAction", ["Block", actionName]);
				let imageUrl;
				imageUrl = await requestEngine.imageGenerationRequest(fullPrompt);
				
				
				await Asc.Editor.callMethod("EndAction", ["Block", actionName]);
				if (imageUrl) {
					
					const img = new Image();
					img.src = imageUrl;
					await img.decode();

					const widthEmu = img.naturalWidth * 9525 + 0.5 >> 0;
					const heightEmu = img.naturalHeight * 9525 + 0.5 >> 0;
					
					
					Asc.scope.imageUrl = imageUrl;
					Asc.scope.width = widthEmu;
					Asc.scope.height = heightEmu;
					
					await Asc.Editor.callMethod("StartAction", ["GroupActions"]);
					await Asc.Editor.callCommand(function () {
						let doc = Api.GetDocument();
						doc.ReplaceCurrentImage(Asc.scope.imageUrl, Asc.scope.width, Asc.scope.height);
					});
					await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
				}
			} catch (error) {
			}

		};

		return func;
	};

})();

function getWordFunctions() {

	let funcs = [];
	if (true) 
	{
		let func = new RegisteredFunction();
		func.name = "changeParagraphStyle";
		func.params = [
			"parNumber (number): the paragraph number to apply style changes to",
			"style (string): the style name to apply to the paragraph"
		];

		func.examples = [
			"If you need to change the style of paragraph 3 to Heading 1, respond with:" +
			"[functionCalling (changeParagraphStyle)]: {\"parNumber\": 3, \"style\": \"Heading 1\"}"
		];
		
		func.call = async function(params) {
			Asc.scope.parNumber = params.parNumber;
			Asc.scope.styleName = params.style;
			await Asc.Editor.callCommand(function(){
				let doc = Api.GetDocument();
				let par = doc.GetElement(Asc.scope.parNumber - 1);
				if (!par)
					return;

				let style = doc.GetStyle(Asc.scope.styleName);
				par.SetStyle(style);
			});			
		};

		funcs.push(func);
	}

	funcs.push(WORD_FUNCTIONS.changeTextStyle());
	funcs.push(WORD_FUNCTIONS.commentText());
	funcs.push(WORD_FUNCTIONS.rewriteText());
	funcs.push(WORD_FUNCTIONS.insertPage());
	funcs.push(WORD_FUNCTIONS.checkSpelling());
	funcs.push(WORD_FUNCTIONS.addImage());

	return funcs;
}

async function spellCheckWithAI(paraId, recalcId, text)
{
	let requestEngine = AI.Request.create(AI.ActionType.Chat);
	if (!requestEngine)
		return false;

	let isSendedEndLongAction = false;
	async function checkEndAction() {
		if (!isSendedEndLongAction) {
			isSendedEndLongAction = true
		}
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

	let argPrompt = `You are a spellcheck corrector. I will provide text that may contain spelling errors in any language. Your task is to identify ALL spelling mistakes and return ONLY the corrections in the following JSON format:

[
  {"wrong": "misspelledWord", "correct": "correctWord", "occurrence": 1, "confidence": "high"},
  ...
]

Rules:
- "wrong": the exact misspelled word as it appears in the text
- "correct": the correctly spelled replacement
- "occurrence": which occurrence of this word if it appears multiple times (1 for first, 2 for second, etc.)
- "confidence": how certain you are this is a misspelling
  * "high" - definitely misspelled, no valid alternative meaning
  * "medium" - likely misspelled in this context, but could be valid elsewhere
  * "low" - uncertain, highly context-dependent
- Return an empty array [] if there are no errors
- Return an empty array [] if the text is completely unintelligible or a complete mess
- Support multiple languages (English, Russian, etc.)

CRITICAL
- Ouput should be in the exact this format
- No any comments are allowed

CRITICAL - Word Boundaries (MOST IMPORTANT):
- ONLY match complete, standalone words separated by spaces, punctuation, or at the start/end of text
- DO NOT match letters or substrings that are PART of other words
- A word is bounded by: spaces, punctuation (.,!?;:), quotes, or start/end of text
- Examples of what NOT to match:
  * "r" in "letter" - NO! "r" is part of the word "letter"
  * "r" in "great" - NO! "r" is part of the word "great"
  * "te" in "letter" - NO! "te" is part of the word "letter"
- Examples of what TO match:
  * "r" in "r u sure" - YES! "r" is a standalone word
  * "te" in "What te problem" - YES! "te" is a standalone word

CRITICAL - Handling same word with different meanings:
If the same word appears multiple times but only some occurrences are misspelled:
- ONLY include the misspelled occurrences
- Use the "occurrence" number to specify which instance

Example showing word boundaries:
Input: "The letter r. r u sure about it?"
Explanation:
- "letter" - correct word, don't touch it
- "r." - this is the standalone letter r
- "r u" - this "r" is a standalone word (misspelled, should be "are")
Output: [
  {"wrong": "r", "correct": "are", "occurrence": 2, "confidence": "medium"},
  {"wrong": "u", "correct": "you", "occurrence": 1, "confidence": "medium"}
]
Note: The first standalone "r" (after "letter") is correct. The second standalone "r" (in "r u") is misspelled.

Example with substring trap:
Input: "Great! r u coming?"
Output: [
  {"wrong": "r", "correct": "are", "occurrence": 1, "confidence": "medium"},
  {"wrong": "u", "correct": "you", "occurrence": 1, "confidence": "medium"}
]
Note: The "r" in "Great" is NOT matched because it's part of the word "Great", not a standalone word.

CRITICAL - Completeness:
- Find and include EVERY misspelled standalone word in the text
- If the same misspelled word appears multiple times, create separate entries
- Single-letter standalone words can be misspellings (e.g., standalone "r" → "are", standalone "u" → "you")

CRITICAL - What NOT to include:
- DO NOT include letters or substrings within other words
- DO NOT include entries where "wrong" and "correct" are identical
- ONLY include actual spelling mistakes that are standalone words

Example (no errors):
Input: "The quick brown fox jumps over the lazy dog."
Output: []
Text to check:`;
	argPrompt += text;

	let response = "";
	await requestEngine.chatRequest(argPrompt, false, async function(data) {
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
	let rangeToCorrect = {};

	function convertToRanges(text, corrections) 
	{
		for (const { wrong, correct, occurrence } of corrections) 
		{
			let count = 0;
			let searchStart = 0;

			while (searchStart < text.length)
			{
				const index = text.indexOf(wrong, searchStart);
				if (index === -1) break;

				const isStartBoundary = index === 0 || isWordBoundary(text[index - 1]);
				const isEndBoundary = index + wrong.length === text.length ||
					isWordBoundary(text[index + wrong.length]);

				if (isStartBoundary && isEndBoundary)
				{
					count++;
					if (count === occurrence)
					{
						ranges.push({
							"start": index,
							"length": wrong.length,
							"id": rangeId
						});
						rangeToCorrect[rangeId] = correct;
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
			"guid" : "guid-1",
			"type" : "highlightText",
			"paragraphId" : paraId,
			"recalcId" : recalcId,
			"ranges" : ranges
		};
		await Asc.Editor.callMethod("AnnotateParagraph", [obj]);
	}
	catch(e) 
	{}	
}
