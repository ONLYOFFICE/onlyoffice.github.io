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
Use this tool to perform any spreadsheet operation when no other specialized tool is available.
This tool can also be used to READ/GET data from the spreadsheet — make the last expression in the script be the value you want to retrieve, and it will be returned as the tool result.
For example, to get the value of cell A1, write: Api.GetActiveSheet().GetRange("A1").GetValue()
The return value of the last expression will be the tool's output.`,
		"parameters": {
			"type": "object",
			"properties": {
				"code": {
					"type": "string",
					"description": `Valid JavaScript code using the OnlyOffice Spreadsheet API to execute directly via eval. Rules:
- Use only the OnlyOffice Spreadsheet API (Api, ApiWorksheet, ApiRange, etc.)
- Do NOT wrap the code in a function or IIFE — output only the statements to execute directly
- Do NOT include any explanation, comments, or markdown — output raw JavaScript only
- To GET/READ data: make the last expression the value you want to return (e.g. ws.GetRange("A1").GetValue())
- To get the active sheet: var ws = Api.GetActiveSheet()
- To get sheet by name: Api.GetSheet(sName)
- To get all sheet names: Api.GetSheets() returns array of ApiWorksheet
- To get active sheet name: ws.GetName()
- To set active sheet: Api.SetActiveSheet(oSheet) or ws.SetActive()
- To add a new sheet: Api.AddSheet(sName)
- To get a range by address: ws.GetRange(sRange) e.g. ws.GetRange("A1"), ws.GetRange("A1:B10")
- To get current selection: Api.GetSelection()
- To read a cell value: ws.GetRange("A1").GetValue()
- To read a cell value as number: ws.GetRange("A1").GetNumberValue()
- To read a cell formula: ws.GetRange("A1").GetFormula()
- To write a cell value: ws.GetRange("A1").SetValue("text") or .SetValue(42)
- To set a formula: ws.GetRange("A1").SetValue("=SUM(B1:B10)")
- To clear a range: range.Clear()
- To get range address: range.GetAddress()
- To merge cells: range.Merge(isAcross)
- To unmerge cells: range.UnMerge()
- To set number format: range.SetNumberFormat(sFormat) e.g. "0.00", "#,##0", "0%", "mm/dd/yyyy"
- To set column width: ws.SetColumnWidth(nCol, nWidth) — nCol is 0-based index
- To set row height: ws.SetRowHeight(nRow, nHeight) — nRow is 0-based index
- To get rows count in used range: ws.GetUsedRange().GetRows().Count
- To get columns count in used range: ws.GetUsedRange().GetCols().Count
- Range formatting: range.SetBold(true), range.SetItalic(true), range.SetUnderline(true), range.SetStrikeout(true), range.SetFontSize(nSize), range.SetFontName(sFontName), range.SetFontColor(Api.CreateColorFromRGB(r, g, b))
- Fill color: range.SetFillColor(Api.CreateColorFromRGB(r, g, b))
- Borders: range.SetBorders(sBorderType, sLineStyle, Api.CreateColorFromRGB(r, g, b)) — sBorderType: "Top","Bottom","Left","Right","InsideHorizontal","InsideVertical","DiagonalDown","DiagonalUp"
- Text alignment: range.SetAlignHorizontal(sAlign) where sAlign = "left"|"center"|"right"|"justify", range.SetAlignVertical(sAlign) where sAlign = "top"|"center"|"bottom"
- Wrap text: range.SetWrap(true)
- To select a range: ws.GetRange("A1:C5").Select()
- To insert rows: ws.InsertRows(nRow, nCount) — nRow is 0-based
- To delete rows: ws.DeleteRows(nRow, nCount)
- To insert columns: ws.InsertCols(nCol, nCount)
- To delete columns: ws.DeleteCols(nCol, nCount)
- To create a chart: ws.AddChart(sType, sDataRange, bInRows, nStyleIndex, nExtX, nExtY) — sType: "bar","line","pie","scatter","area","barStacked","barStackedPercent","lineStacked","areaStacked"
- To add an image: ws.AddImage(sImageSrc, nWidth, nHeight, nColFrom, nRowFrom)
- To add a shape: ws.AddShape(sType, nWidth, nHeight, oFill, oStroke, nColFrom, nRowFrom)
- Named ranges: Api.AddDefName(sName, sRef), Api.GetDefName(sName)
- Auto filter: ws.SetAutoFilter(sRange) e.g. ws.SetAutoFilter("A1:D10")
- Comments: range.AddComment(sText, sAuthor)
- Freeze panes: ws.SetFreezePanes(nCol, nRow) — 0-based
- To create color: Api.CreateColorFromRGB(r, g, b)
- To create fill: Api.CreateSolidFill(oColor), Api.CreateNoFill()
- To create stroke: Api.CreateStroke(nWidth, oFill)
- Conditional formatting: ws.SetConditionalFormatting(sType, sRange, ...) — use specialized tools for conditional formatting when available`
				}
			},
			"required": ["code"]
		},
		"examples": [
			{
				"prompt": "Fill column A with months of the year",
				"arguments": { "code": `\
var ws = Api.GetActiveSheet();
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
for (var i = 0; i < months.length; i++) {
	ws.GetRange("A" + (i + 1)).SetValue(months[i]);
}`
				}
			},
			{
				"prompt": "Insert a SUM formula in B11 for the range B1:B10",
				"arguments": { "code": `\
var ws = Api.GetActiveSheet();
ws.GetRange("B11").SetValue("=SUM(B1:B10)");`
				}
			},
			{
				"prompt": "Get all values from column A",
				"arguments": { "code": `\
var ws = Api.GetActiveSheet();
var values = [];
var usedRange = ws.GetUsedRange();
var rowCount = usedRange.GetRows().Count;
for (var i = 1; i <= rowCount; i++) {
	values.push(ws.GetRange("A" + i).GetValue());
}
values;`
				}
			}
		]
	});

	func.call = async function(params) {
		Asc.scope.macroCode = params.code;
		let returnValue = await Asc.Editor.callCommand(function() {
			try {
				var __result = eval(Asc.scope.macroCode);
				if (__result !== undefined && __result !== null) {
					return { onlyoffice_id_result: __result };
				}
			} catch(e) {
				return { onlyoffice_id_error_message: e.name + ": " + e.message };
			}
		});

		if (returnValue && returnValue.onlyoffice_id_error_message) {
			throw new window.AgentState.ToolError(returnValue.onlyoffice_id_error_message);
		}

		if (returnValue && returnValue.onlyoffice_id_result !== undefined) {
			return returnValue.onlyoffice_id_result;
		}
	};

	return func;
})();