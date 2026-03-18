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
		"name": "addDataBars",
		"text": "Add Data Bars",
		"description": "Adds data bar conditional formatting to display values as horizontal bars within cells. The length of each bar represents the value relative to other values in the range. Useful for creating in-cell bar charts and comparing values at a glance without additional charts.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to apply data bars (e.g., 'A1:D10'). If omitted, uses active/selected range."
				},
				"barColor": {
					"type": "object",
					"description": "Color of the data bars {r: 0, g: 112, b: 192} (default: blue).",
					"properties": {
						"r": { "type": "number" },
						"g": { "type": "number" },
						"b": { "type": "number" }
					}
				},
				"showValue": {
					"type": "boolean",
					"description": "Whether to show the cell values along with bars (default: true).",
					"default": true
				},
				"direction": {
					"type": "string",
					"description": "Direction of bars - 'xlLTR' (left to right), 'xlRTL' (right to left), 'xlContext' (context-based, default: 'xlLTR').",
					"enum": ["xlContext", "xlLTR", "xlRTL"],
					"default": "xlLTR"
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Apply data bars conditional formatting to current selection",
				"arguments": {}
			},
			{
				"prompt": "Apply data bars with custom color to range A1:D10",
				"arguments": { "range": "A1:D10", "barColor": { "r": 255, "g": 0, "b": 0 } }
			},
			{
				"prompt": "When user asks to add data bars, bar chart formatting, progress bars",
				"arguments": { "range": "A1:D10" }
			}
		]
	});

	func.call = async function(params) {
		if (params.range !== undefined && typeof params.range !== 'string') {
			throw new window.AgentState.ToolError(
				'Parameter "range" must be a string like "A1:D100". Got: ' + JSON.stringify(params.range)
			);
		}

		const validDirections = ["xlContext", "xlLTR", "xlRTL"];
		if (params.direction !== undefined && params.direction !== null && !validDirections.includes(params.direction))
			throw new window.AgentState.ToolError("Invalid direction \"" + params.direction + "\". Available options: " + JSON.stringify(validDirections));

		if (params.barColor !== undefined && params.barColor !== null) {
			let r = params.barColor.r, g = params.barColor.g, b = params.barColor.b;
			if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number' ||
					r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 ||
					!Number.isInteger(r) || !Number.isInteger(g) || !Number.isInteger(b))
				throw new window.AgentState.ToolError("Invalid barColor: r, g, b must each be integers between 0 and 255. Example: {\"r\": 0, \"g\": 112, \"b\": 192} for blue.");
		}

		Asc.scope.range = params.range;
		Asc.scope.barColor = params.barColor;
		Asc.scope.showValue = params.showValue;
		Asc.scope.direction = params.direction;

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
			let databar = formatConditions.AddDatabar();
			if (!databar)
				return { error: "Failed to create data bar conditional formatting rule." };

			if (Asc.scope.barColor) {
				let barColor = Api.CreateColorFromRGB(Asc.scope.barColor.r, Asc.scope.barColor.g, Asc.scope.barColor.b);
				databar.SetBarColor(barColor);
			} else {
				let defaultBarColor = Api.CreateColorFromRGB(70, 130, 180);
				databar.SetBarColor(defaultBarColor);
			}

			if (typeof Asc.scope.showValue === "boolean")
				databar.SetShowValue(Asc.scope.showValue);

			if (Asc.scope.direction)
				databar.SetDirection(Asc.scope.direction);
		});

		if (result && result.error)
			throw new window.AgentState.ToolError(result.error);
	};

	return func;
})();
