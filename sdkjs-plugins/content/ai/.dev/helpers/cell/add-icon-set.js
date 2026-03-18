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
		"name": "addIconSet",
		"text": "Add Icon Indicators",
		"description": "Applies icon set conditional formatting to display icons (arrows, traffic lights, symbols) based on value ranges. Icons provide visual indicators for data trends and performance levels. Each icon represents a different value range, making it easy to identify patterns and outliers in your data.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to apply icon set (e.g., 'A1:D10'). If omitted, uses active/selected range."
				},
				"iconSetType": {
					"type": "string",
					"description": "Type of icon set (default: 'xl3Arrows').",
					"enum": ["xl3Arrows","xl3ArrowsGray","xl3Flags","xl3TrafficLights1","xl3TrafficLights2","xl3Signs","xl3Symbols","xl3Symbols2","xl4Arrows","xl4ArrowsGray","xl4RedToBlack","xl4CRV","xl4TrafficLights","xl5Arrows","xl5ArrowsGray","xl5CRV","xl5Quarters","xl3Stars","xl3Triangles","xl5Boxes"],
					"default": "xl3Arrows"
				},
				"showIconOnly": {
					"type": "boolean",
					"description": "Whether to show only icons without cell values (default: false).",
					"default": false
				},
				"reverseOrder": {
					"type": "boolean",
					"description": "Whether to reverse the icon order (default: false).",
					"default": false
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Apply icon set conditional formatting to current selection",
				"arguments": {}
			},
			{
				"prompt": "Apply traffic lights icon set to range A1:D10",
				"arguments": { "range": "A1:D10", "iconSetType": "xl3TrafficLights1" }
			},
			{
				"prompt": "When user asks to add icon set, arrow icons, traffic lights, symbols formatting",
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

		const validIconSetTypes = ["xl3Arrows","xl3ArrowsGray","xl3Flags","xl3TrafficLights1","xl3TrafficLights2","xl3Signs","xl3Symbols","xl3Symbols2","xl4Arrows","xl4ArrowsGray","xl4RedToBlack","xl4CRV","xl4TrafficLights","xl5Arrows","xl5ArrowsGray","xl5CRV","xl5Quarters","xl3Stars","xl3Triangles","xl5Boxes"];
		if (params.iconSetType !== undefined && params.iconSetType !== null && !validIconSetTypes.includes(params.iconSetType))
			throw new window.AgentState.ToolError("Invalid iconSetType \"" + params.iconSetType + "\". Available options: " + JSON.stringify(validIconSetTypes));

		Asc.scope.range = params.range;
		Asc.scope.iconSetType = params.iconSetType;
		Asc.scope.showIconOnly = params.showIconOnly;
		Asc.scope.reverseOrder = params.reverseOrder;

		let result = await Asc.Editor.callCommand(function() {
			let ws = Api.GetActiveSheet();
			let range;
			if (Asc.scope.range) {
				range = ws.GetRange(Asc.scope.range);
				if (!range)
					return { error: "Invalid range \"" + Asc.scope.range + "\". Please provide a valid Excel range like 'A1:D10'." };
			} else {
				range = ws.GetSelection();
			}

			let formatConditions = range.GetFormatConditions();
			let iconSet = formatConditions.AddIconSetCondition();
			if (!iconSet)
				return { error: "Failed to create icon set conditional formatting rule." };

			if (Asc.scope.iconSetType)
				iconSet.SetIconSet(Asc.scope.iconSetType);

			if (typeof Asc.scope.showIconOnly === "boolean")
				iconSet.SetShowIconOnly(Asc.scope.showIconOnly);

			if (typeof Asc.scope.reverseOrder === "boolean")
				iconSet.SetReverseOrder(Asc.scope.reverseOrder);
		});

		if (result && result.error)
			throw new window.AgentState.ToolError(result.error);
	};

	return func;
})();
