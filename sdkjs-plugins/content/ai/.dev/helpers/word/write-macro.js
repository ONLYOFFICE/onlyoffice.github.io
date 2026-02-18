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

(function(){
	let func = new RegisteredFunction({
		"name": "writeMacro",
		"description": "Writes and executes an OnlyOffice Document API macro to perform any operation on the document. Use this whenever the user asks to do ANYTHING with the document — selecting content, editing or modifying text, replacing words, reformatting paragraphs, changing styles, inserting or removing elements, moving content, or any other document action. Do NOT require the user to mention 'macro' — trigger this for any user request involving document editing, modification, addition, selection, or any other operation when no other helper covers it.",
		"parameters": {
			"type": "object",
			"properties": {
				"description": {
					"type": "string",
					"description": "Plain-language description of the operation to perform on the document. Can describe selecting content (e.g. 'select all text in the second paragraph'), modifications to existing content (e.g. 'replace all occurrences of X with Y', 'make the second paragraph bold'), or insertions of new content."
				}
			},
			"required": ["description"]
		},
		"examples": [
			{
				"prompt": "Select all text in the first paragraph",
				"arguments": { "description": "Select all text in the first paragraph of the document" }
			},
			{
				"prompt": "Select all headings",
				"arguments": { "description": "Select all heading paragraphs in the document" }
			},
			{
				"prompt": "Replace all occurrences of 'foo' with 'bar'",
				"arguments": { "description": "Replace every occurrence of the word 'foo' with 'bar' throughout the document" }
			},
			{
				"prompt": "Make the first paragraph bold",
				"arguments": { "description": "Apply bold formatting to all runs in the first paragraph of the document" }
			},
			{
				"prompt": "Change all text to Arial 12pt",
				"arguments": { "description": "Change all text in the document to Arial font, size 12pt" }
			},
			{
				"prompt": "Insert a 3x4 table at the end of the document",
				"arguments": { "description": "Insert a table with 3 rows and 4 columns at the end of the document" }
			}
		]
	});

	const MACRO_PROMPT = `You are an OnlyOffice Document API expert. Write a JavaScript macro that performs the following operation on the document:

{description}

The operation may involve selecting content (paragraphs, ranges, specific text), modifying existing text or structure (replacing words, reformatting paragraphs, deleting content, moving elements, etc.), or inserting new content.

Rules:
- Use only the OnlyOffice Document API (Api, Api.GetDocument(), etc.)
- Do NOT wrap the code in a function or IIFE — output only the statements to execute directly
- Do NOT include any explanation, comments, or markdown — output raw JavaScript only
- When changing text formatting (font, size, color, etc.) across paragraphs, you MUST iterate through every paragraph and every run and apply the property directly to each run. Modifying only paragraph-level or default-style properties will NOT work because direct run properties override them.
- To iterate all paragraphs: use Api.GetDocument().GetElementsCount() and GetElement(i); check GetClassType() === 'paragraph'
- To apply formatting to runs in a paragraph: use paragraph.GetAllTextPr() to get an array of text properties and call the setter on each item
- To find and replace text: iterate all paragraphs, then all runs via paragraph.GetElement(i), check GetClassType() === 'run', and use run.GetText() / run.ClearContent() + run.AddText()
- To select content: use paragraph.Select() to select an entire paragraph, or Api.GetDocument().GetRange(startPos, endPos).Select() to select a text range`;

	async function generateMacro(description) {
		let requestEngine = AI.Request.create(AI.ActionType.Chat);
		if (!requestEngine)
			return null;

		let prompt = MACRO_PROMPT.replace("{description}", description);
		let response = await requestEngine.chatRequest(prompt, false);
		if (!response)
			return null;

		return response.trim().replace(/^```(?:\w+)?\s*\n?([\s\S]*?)\n?```$/m, "$1").trim();
	}

	async function runMacro(macroCode) {
		Asc.scope.macroCode = macroCode;
		Asc.scope.executionError = null;

		await Asc.Editor.callCommand(function() {
			try {
				eval(Asc.scope.macroCode);
			} catch(e) {
				Asc.scope.executionError = { message: e.message, name: e.name };
			}
		});

		return Asc.scope.executionError || null;
	}

	func.call = async function(params) {
		let macroCode = await generateMacro(params.description);
		if (!macroCode)
			return { success: false, message: "Failed to generate macro code." };

		let error = await runMacro(macroCode);
		if (!error)
			return { success: true };

		let requestEngine = AI.Request.create(AI.ActionType.Chat);
		if (!requestEngine)
			return { success: false, message: error.name + ": " + error.message };

		let fixPrompt = `The following OnlyOffice Document API macro failed with the error:
${error.name}: ${error.message}

Macro code:
${macroCode}

Fix the macro so it runs without errors. Output only the corrected raw JavaScript — no explanation, no markdown.`;

		let fixedResponse = await requestEngine.chatRequest(fixPrompt, false);
		if (!fixedResponse)
			return { success: false, message: error.name + ": " + error.message };

		let fixedCode = fixedResponse.trim().replace(/^```(?:\w+)?\s*\n?([\s\S]*?)\n?```$/m, "$1").trim();
		let retryError = await runMacro(fixedCode);

		if (!retryError)
			return { success: true };

		return {
			success: false,
			message: retryError.name + ": " + retryError.message
		};
	};

	return func;
})();
