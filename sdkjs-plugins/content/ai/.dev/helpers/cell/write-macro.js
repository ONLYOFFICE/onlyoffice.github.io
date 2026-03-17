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
		"text": "Run Macro",
		"description": `Executes a JavaScript macro using the OnlyOffice Spreadsheet API.
Call this function ONLY when the user explicitly asks to execute/run a command (e.g. 'execute command', 'run this').
Do NOT call this for regular editing requests or questions — only when the user explicitly requests execution.`,
		"parameters": {
			"type": "object",
			"properties": {
				"code": {
					"type": "string",
					"description": `Valid JavaScript code using the OnlyOffice Spreadsheet API to execute directly via eval. Rules:
- Use only the OnlyOffice Spreadsheet API (Api, Api.GetActiveSheet(), Api.GetSelection(), etc.)
- Do NOT wrap the code in a function or IIFE — output only the statements to execute directly
- Do NOT include any explanation, comments, or markdown — output raw JavaScript only
- To get the active sheet: let ws = Api.GetActiveSheet()
- To get a range by address: ws.GetRange("A1:B10")
- To get the current selection: Api.GetSelection()
- To read a cell value: ws.GetRange("A1").GetValue()
- To write a cell value: ws.GetRange("A1").SetValue("text") or .SetValue(42)
- To set a formula: ws.GetRange("A1").SetValue("=SUM(B1:B10)")
- To apply fill color: range.SetFillColor(Api.CreateColorFromRGB(r, g, b))
- To select a range: ws.GetRange("A1:C5").Select()
- To iterate rows/columns use GetRowsCount() / GetColsCount() and index into the range`
				}
			},
			"required": ["code"]
		},
		"examples": [
			{
				"prompt": "Execute command: fill column A with months of the year",
				"arguments": { "code": `\
let ws = Api.GetActiveSheet();
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
for (let i = 0; i < months.length; i++) {
	ws.GetRange("A" + (i + 1)).SetValue(months[i]);
}`
				}
			},
			{
				"prompt": "Execute command: insert a SUM formula in B11 for the range B1:B10",
				"arguments": { "code": `\
let ws = Api.GetActiveSheet();
ws.GetRange("B11").SetValue("=SUM(B1:B10)");`
				}
			}
		]
	});

	func.call = async function(params) {
		Asc.scope.macroCode = params.code;
		let returnValue = await Asc.Editor.callCommand(function() {
			try {
				eval(Asc.scope.macroCode);
			} catch(e) {
				return { onlyoffice_id_error_message: e.name + ": " + e.message };
			}
		});

		if (returnValue && returnValue.onlyoffice_id_error_message) {
			throw new window.AgentState.ToolError(returnValue.onlyoffice_id_error_message);
		}
	};

	return func;
})();