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
		"name": "addCellValueCondition",
		"text": "Highlight Cells by Condition",
		"description": "Creates conditional formatting rules based on cell values using comparison operators (greater than, less than, equal to, between, etc.). This is the most flexible conditional formatting option, allowing you to highlight cells that meet specific criteria with custom colors for background and text.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to apply condition (e.g., 'A1:D10'). If omitted, uses active/selected range."
				},
				"operator": {
					"type": "string",
					"description": "Comparison operator - 'xlGreater', 'xlLess', 'xlEqual', 'xlNotEqual', 'xlGreaterEqual', 'xlLessEqual', 'xlBetween', 'xlNotBetween'.",
					"enum": ["xlGreater", "xlLess", "xlEqual", "xlNotEqual", "xlGreaterEqual", "xlLessEqual", "xlBetween", "xlNotBetween"]
				},
				"value1": {
					"type": ["string", "number"],
					"description": "First comparison value or formula."
				},
				"value2": {
					"type": ["string", "number"],
					"description": "Second comparison value for 'xlBetween' and 'xlNotBetween' operators."
				},
				"fillColor": {
					"type": "object",
					"description": "Background color {r: 255, g: 0, b: 0}.",
					"properties": {
						"r": { "type": "number" },
						"g": { "type": "number" },
						"b": { "type": "number" }
					}
				},
				"fontColor": {
					"type": "object",
					"description": "Font color {r: 0, g: 0, b: 0}.",
					"properties": {
						"r": { "type": "number" },
						"g": { "type": "number" },
						"b": { "type": "number" }
					}
				}
			},
			"required": ["operator", "value1"]
		},
		"examples": [
			{
				"prompt": "Highlight cells greater than 10 with red background",
				"arguments": { "operator": "xlGreater", "value1": 10, "fillColor": { "r": 255, "g": 0, "b": 0 } }
			},
			{
				"prompt": "Highlight cells between 5 and 15 with yellow background",
				"arguments": { "range": "A1:D10", "operator": "xlBetween", "value1": 5, "value2": 15, "fillColor": { "r": 255, "g": 255, "b": 0 } }
			},
			{
				"prompt": "When user asks to highlight cells based on values (greater than, less than, equal to)",
				"arguments": { "range": "A1:D10", "operator": "xlGreater", "value1": 100 }
			}
		]
	});

	func.call = async function(params) {
		if (params.range !== undefined && typeof params.range !== 'string') {
			throw new window.AgentState.ToolError(
				'Parameter "range" must be a string like "A1:D100". Got: ' + JSON.stringify(params.range)
			);
		}

		const validOperators = ["xlGreater", "xlLess", "xlEqual", "xlNotEqual", "xlGreaterEqual", "xlLessEqual", "xlBetween", "xlNotBetween"];
		if (params.operator !== undefined && params.operator !== null && !validOperators.includes(params.operator))
			throw new window.AgentState.ToolError("Invalid operator \"" + params.operator + "\". Available options: " + JSON.stringify(validOperators));

		function validateColor(color, paramName) {
			if (color === undefined || color === null) return;
			let r = color.r, g = color.g, b = color.b;
			if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number' ||
					r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 ||
					!Number.isInteger(r) || !Number.isInteger(g) || !Number.isInteger(b))
				throw new window.AgentState.ToolError("Invalid " + paramName + ": r, g, b must each be integers between 0 and 255. Example: {\"r\": 255, \"g\": 0, \"b\": 0} for red.");
		}
		validateColor(params.fillColor, "fillColor");
		validateColor(params.fontColor, "fontColor");

		if ((params.operator === "xlBetween" || params.operator === "xlNotBetween") && params.value2 === undefined)
			throw new window.AgentState.ToolError("Operator \"" + params.operator + "\" requires value2 parameter (the second boundary value).");

		Asc.scope.range = params.range;
		Asc.scope.operator = params.operator;
		Asc.scope.value1 = params.value1;
		Asc.scope.value2 = params.value2;
		Asc.scope.fillColor = params.fillColor;
		Asc.scope.fontColor = params.fontColor;

		let result = await Asc.Editor.callCommand(function() {
			let ws = Api.GetActiveSheet();
			let range;
			if (Asc.scope.range) {
				range = ws.GetRange(Asc.scope.range);
				if (!range)
					return { error: "Invalid range \"" + Asc.scope.range + "\". Please provide a valid Excel range like 'A1:D10'." };
			} else {
				range = ws.Selection;
			}
			
			let formatConditions = range.GetFormatConditions();
			let condition = formatConditions.Add("xlCellValue", Asc.scope.operator, Asc.scope.value1, Asc.scope.value2);
			if (!condition)
				return { error: "Failed to create conditional formatting rule. Check that operator and value1 are valid." };

			if (Asc.scope.fontColor) {
				let fontColor = Api.CreateColorFromRGB(Asc.scope.fontColor.r, Asc.scope.fontColor.g, Asc.scope.fontColor.b);
				let font = condition.GetFont();
				if (font && font.SetColor) {
					font.SetColor(fontColor);
				}
			}

			if (Asc.scope.fillColor) {
				let fillColor = Api.CreateColorFromRGB(Asc.scope.fillColor.r, Asc.scope.fillColor.g, Asc.scope.fillColor.b);
				condition.SetFillColor(fillColor);
			} else {
				let defaultFillColor = Api.CreateColorFromRGB(255, 255, 0);
				condition.SetFillColor(defaultFillColor);
			}
		});

		if (result && result.error)
			throw new window.AgentState.ToolError(result.error);
	};

	return func;
})();
