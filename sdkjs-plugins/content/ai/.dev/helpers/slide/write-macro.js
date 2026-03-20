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
		"description": `Executes a JavaScript macro using the OnlyOffice Presentation API.
Use this tool to perform any presentation operation when no other specialized tool is available.
This tool can also be used to READ/GET data from the presentation — make the last expression in the script be the value you want to retrieve, and it will be returned as the tool result.
For example, to get the number of slides, write: Api.GetPresentation().GetSlidesCount()
The return value of the last expression will be the tool's output.`,
		"parameters": {
			"type": "object",
			"properties": {
				"code": {
					"type": "string",
					"description": `Valid JavaScript code using the OnlyOffice Presentation API to execute directly via eval. Rules:
- Use only the OnlyOffice Presentation API (Api, Api.GetPresentation(), etc.)
- Do NOT wrap the code in a function or IIFE — output only the statements to execute directly
- Do NOT include any explanation, comments, or markdown — output raw JavaScript only
- To get the presentation object: let oPresentation = Api.GetPresentation()
- To get the current slide: oPresentation.GetCurrentSlide()
- To get slide by index: oPresentation.GetSlideByIndex(index)
- To get total slides: oPresentation.GetSlidesCount()
- To get all slides: oPresentation.GetAllSlides()
- To add a new slide: let oSlide = Api.CreateSlide(); oPresentation.AddSlide(oSlide)
- To remove slides: oPresentation.RemoveSlides(nStart, nCount)
- To delete a slide: oSlide.Delete()
- To duplicate a slide: oSlide.Duplicate()
- To move a slide: oSlide.MoveTo(nPos)
- To set slide background: oSlide.SetBackground(oApiFill)
- To clear slide background: oSlide.ClearBackground()
- To add object to slide: oSlide.AddObject(oDrawing)
- To remove all objects: oSlide.RemoveAllObjects()
- To get all shapes on slide: oSlide.GetAllShapes()
- To get all images on slide: oSlide.GetAllImages()
- To get all charts on slide: oSlide.GetAllCharts()
- To get all tables on slide: oSlide.GetAllTables()
- To create a shape: Api.CreateShape(sType, nWidth, nHeight, oFill, oStroke)
- To create an image: Api.CreateImage(sImageSrc, nWidth, nHeight)
- To create a chart: Api.CreateChart(sType, aSeries, aSeriesNames, aCatNames, nWidth, nHeight)
- To create a table: Api.CreateTable(nCols, nRows)
- To create a paragraph: Api.CreateParagraph()
- To create a text run: Api.CreateRun()
- To create a fill: Api.CreateSolidFill(oColor) or Api.CreateLinearGradientFill(aGradientStop, nAngle)
- To create a stroke: Api.CreateStroke(nWidth, oFill)
- To create a color: Api.CreateRGBColor(r, g, b)
- To set shape position: oDrawing.SetPosition(nPosX, nPosY)
- To set shape size: oDrawing.SetSize(nWidth, nHeight)
- To get shape content: oShape.GetDocContent() returns ApiDocumentContent
- To add text to shape: let oContent = oShape.GetDocContent(); oContent.RemoveAllElements(); let oPar = Api.CreateParagraph(); oPar.AddText("text"); oContent.Push(oPar)
- To format text runs: oRun.SetBold(true), oRun.SetItalic(true), oRun.SetFontSize(nSize), oRun.SetFontFamily(sFontName), oRun.SetColor(r, g, b)
- Dimensions are in EMUs (English Metric Units): 1 inch = 914400 EMUs, 1 cm = 360000 EMUs, 1 pt = 12700 EMUs
- Standard slide size: width = 9144000 EMUs (10 inches), height = 6858000 EMUs (7.5 inches)`
				}
			},
			"required": ["code"]
		},
		"examples": [
			{
				"prompt": "Execute command: add a text box with 'Hello World' to the current slide",
				"arguments": { "code": `\
let oPresentation = Api.GetPresentation();
let oSlide = oPresentation.GetCurrentSlide();
let oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 255, 255));
let oStroke = Api.CreateStroke(0, Api.CreateNoFill());
let oShape = Api.CreateShape("rect", 5000000, 1000000, oFill, oStroke);
oShape.SetPosition(2000000, 3000000);
let oContent = oShape.GetDocContent();
oContent.RemoveAllElements();
let oPar = Api.CreateParagraph();
let oRun = Api.CreateRun();
oRun.AddText("Hello World");
oRun.SetFontSize(36);
oRun.SetBold(true);
oPar.AddElement(oRun);
oContent.Push(oPar);
oSlide.AddObject(oShape);`
				}
			},
			{
				"prompt": "Execute command: set the current slide background to blue",
				"arguments": { "code": `\
let oPresentation = Api.GetPresentation();
let oSlide = oPresentation.GetCurrentSlide();
let oFill = Api.CreateSolidFill(Api.CreateRGBColor(0, 100, 200));
oSlide.SetBackground(oFill);`
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
