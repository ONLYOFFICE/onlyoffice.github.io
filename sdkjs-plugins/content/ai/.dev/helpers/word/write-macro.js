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
		"description": `Executes a JavaScript macro using the OnlyOffice Document API.
Call this function ONLY when the user explicitly asks to execute/run a command (e.g. 'execute command', 'run this'). 
Do NOT call this for regular editing requests or questions — only when the user explicitly requests execution.`,
		"parameters": {
			"type": "object",
			"properties": {
				"code": {
					"type": "string",
					"description": `Valid JavaScript code using the OnlyOffice Document API to execute directly via eval. Rules:
- Use only the OnlyOffice Document API (Api, Api.GetDocument(), etc.)
- Do NOT wrap the code in a function or IIFE — output only the statements to execute directly
- Do NOT include any explanation, comments, or markdown — output raw JavaScript only
- When changing text formatting (font, size, color, etc.) across paragraphs, you MUST iterate through every paragraph and every run and apply the property directly to each run. Modifying only paragraph-level or default-style properties will NOT work because direct run properties override them.
- To iterate all paragraphs: use Api.GetDocument().GetElementsCount() and GetElement(i); check GetClassType() === 'paragraph'
- To apply formatting to runs in a paragraph: use paragraph.GetAllTextPr() to get an array of text properties and call the setter on each item
- To find and replace text: iterate all paragraphs, then all runs via paragraph.GetElement(i), check GetClassType() === 'run', and use run.GetText() / run.ClearContent() + run.AddText()
- To select content: use paragraph.Select() to select an entire paragraph, or Api.GetDocument().GetRange(startPos, endPos).Select() to select a text range`
				}
			},
			"required": ["code"]
		},
		"examples": [
			{
				"prompt": "Execute command: make the first paragraph bold",
				"arguments": { "code": `\
let oDoc = Api.GetDocument();
let oPar = oDoc.GetElement(0);
for (let i = 0; i < oPar.GetElementsCount(); i++) { 
	let oRun = oPar.GetElement(i); 
	if (oRun.GetClassType() === 'run') { 
		oRun.SetBold(true); 
	} 
}`}
			},
			{
				"prompt": "Execute command: replace all 'foo' with 'bar'",
				"arguments": { "code": `\
let doc = Api.GetDocument();
doc.SearchAndReplace({"searchString": "foo", "replaceString": "bar"});`
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
				return { onlyoffice_id_error_message : e.name + ": " + e.message };
			}
		});

		if (returnValue && returnValue.onlyoffice_id_error_message) {
			throw new window.AgentState.ToolError(returnValue.onlyoffice_id_error_message);
		}
	};

	return func;
})();
