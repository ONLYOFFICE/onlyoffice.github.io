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
		"description": "Writes and executes an OnlyOffice Spreadsheet API macro to perform any operation on the spreadsheet. Use this whenever the user asks to do ANYTHING with the spreadsheet — filling or entering data, editing or modifying cell values or formulas, selecting cells or ranges, applying formatting, inserting or deleting rows/columns/sheets, sorting, filtering, creating charts, or any other spreadsheet action. Do NOT require the user to mention 'macro' — trigger this for any user request involving spreadsheet editing, modification, addition, selection, or any other operation when no other helper covers it.",
		"parameters": {
			"type": "object",
			"properties": {
				"description": {
					"type": "string",
					"description": "Plain-language description of the operation to perform on the spreadsheet. Can describe filling cells with data (e.g. 'fill column A with months of the year', 'put sequential numbers in A1:A10'), selecting content (e.g. 'select all cells in column A'), modifications (e.g. 'make header row bold'), or structural changes (e.g. 'insert 3 rows after row 5')."
				}
			},
			"required": ["description"]
		},
		"examples": [
			{
				"prompt": "Fill column A with months of the year",
				"arguments": { "description": "Fill cells A1:A12 with the names of the 12 months of the year" }
			},
			{
				"prompt": "Fill A1 to A10 with numbers 1 through 10",
				"arguments": { "description": "Set cell values in A1:A10 to sequential numbers from 1 to 10" }
			},
			{
				"prompt": "Select all cells in column A",
				"arguments": { "description": "Select all used cells in column A of the active sheet" }
			},
			{
				"prompt": "Make the first row bold and fill it with a blue background",
				"arguments": { "description": "Apply bold formatting and a blue background color to all cells in the first row" }
			},
			{
				"prompt": "Insert a SUM formula in B11 for the range B1:B10",
				"arguments": { "description": "Set the formula =SUM(B1:B10) in cell B11" }
			},
			{
				"prompt": "Delete all empty rows in the sheet",
				"arguments": { "description": "Find and delete all rows that have no values in the active sheet" }
			}
		]
	});

	const MACRO_PROMPT = `You are an OnlyOffice Spreadsheet API expert. Write a JavaScript macro that performs the following operation on the spreadsheet:

{description}

The operation may involve selecting cells or ranges, reading or writing cell values and formulas, applying formatting, inserting/deleting rows or columns, or any other spreadsheet operation.

Rules:
- Use only the OnlyOffice Spreadsheet API (Api, Api.GetActiveSheet(), Api.GetSelection(), etc.)
- Do NOT wrap the code in a function or IIFE — output only the statements to execute directly
- Do NOT include any explanation, comments, or markdown — output raw JavaScript only
- To get the active sheet: var ws = Api.GetActiveSheet()
- To get a range by address: ws.GetRange("A1:B10")
- To get the current selection: Api.GetSelection()
- To read a cell value: ws.GetRange("A1").GetValue()
- To write a cell value: ws.GetRange("A1").SetValue("text") or .SetValue(42)
- To set a formula: ws.GetRange("A1").SetValue("=SUM(B1:B10)")
- To apply fill color: range.SetFillColor(Api.CreateColorFromRGB(r, g, b))
- To select a range: ws.GetRange("A1:C5").Select()
- To iterate rows/columns use GetRowsCount() / GetColsCount() and index into the range`;

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

		let fixPrompt = `The following OnlyOffice Spreadsheet API macro failed with the error:
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
