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

function getCellFunctions() {

	let funcs = [];

	if (true) {
		let func = new RegisteredFunction();
		func.name = "insertPivotTable";
		func.params = [
			"range (string, optional): cell range to apply autofilter (e.g., 'A1:D10'). If omitted, uses active/selected range",
			"columns (array, optional): array of column names to use for pivot rows (categorical/grouping)",
			"valueColumn (string, optional): column name to use for pivot values (numeric/aggregate)",
		];

		func.examples = [
			"Create or summarize the current selection with a pivot table."+
			"Use when the user requests a pivot table or asks to group/aggregate/analyze data(selection):\n" +
			"[functionCalling (insertPivotTable)]: {}",

			"If you need to insert pivot table to range A1:D10, respond:" +
			"[functionCalling (insertPivotTable)]: {\"range\": \"A1:D10\"}",

			"Create or summarize the current grouping columns with a pivot table."+
			"Use when the user requests a pivot table or asks to group/aggregate/analyze specific grouping columns:\n" +
			"[functionCalling (insertPivotTable)]: {\"columns\": [\"Column1\", \"Column2\"]}",

			"Create or summarize the numeric value columns with a pivot table."+
			"Use when the user requests a pivot table or asks to group/aggregate/analyze numeric value columns:\n" +
			"[functionCalling (insertPivotTable)]: {\"valueColumn\": \"Column3\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			const columns = params.columns || [];
			const valueColumn = params.valueColumn || "";
			Asc.scope.rowCountToLookup = 20;
			// Generate relevant sheet name based on user params (language-neutral)
			let nameParts = [];
			if (columns.length > 0) {
				nameParts = columns.slice(0, 2); // Max 2 for readability
			}
			if (valueColumn) {
				nameParts.push(valueColumn);
			}
			let newSheetName = nameParts.length > 0 ? nameParts.join('_') : 'Pivot Analysis';
			// Excel limit 31 (reserve space for uniqueness suffix)
			if (newSheetName.length > 28) {
				newSheetName = newSheetName.substring(0, 28);
			}
			Asc.scope.newSheetName = newSheetName;
			//insert pivot table
			let insertRes = await Asc.Editor.callCommand(function(){
				function limitRangeToRows(address, maxRows) {
					const digits = address.match(/\d+/g);
					if (!digits || digits.length < 2) {
						return address;
					}
					const startRow = parseInt(digits[0], 10);
					const endRow = parseInt(digits[1], 10);
					const currentRowCount = endRow - startRow + 1;
					if (currentRowCount <= maxRows) {
						return address;
					}
					const limitedEndRow = startRow + maxRows - 1;
					return address.replace(/\d+(?=\D*$)/, limitedEndRow.toString());
				}
				function createUniqueSheetName(newSheetName) {
					let sheets = Api.Sheets;
					let items = [];
					for (let i = 0; i < sheets.length; i++) {
						items.push(sheets[i].Name.toLowerCase());
					}
					if (items.indexOf(newSheetName.toLowerCase()) < 0) {
						return newSheetName;
					}
					let index = 0, name;
					while(++index < 1000) {
						name = newSheetName + '_'+ index;
						if (items.indexOf(name.toLowerCase()) < 0) break;
					}

					newSheetName = name;
					return newSheetName;
				}
				let pivotTable;
				if (Asc.scope.range) {
					let ws = Api.GetActiveSheet();
					let range = ws.GetRange(Asc.scope.range);
					pivotTable = Api.InsertPivotNewWorksheet(range, createUniqueSheetName(Asc.scope.newSheetName));
				} else {
					pivotTable = Api.InsertPivotNewWorksheet(undefined, createUniqueSheetName(Asc.scope.newSheetName));
				}
				let wsSource = pivotTable.Source.Worksheet;
				let addressSource = pivotTable.Source.Address;
				// Apply row limitation
				addressSource = limitRangeToRows(addressSource, Asc.scope.rowCountToLookup);
				let rangeSource = wsSource.GetRange(addressSource);
				return [pivotTable.GetParent().Name, pivotTable.TableRange1.Address, rangeSource.GetValue2()];
			});

			//make csv from source data
			let colsMaxIndex = 0;
			let sheetName = insertRes[0];
			let address = insertRes[1];
			let csv = insertRes[2].map(function(item){
				return item.map(function(value) {
					if (value == null) return '';
					colsMaxIndex = value.length;
					const str = String(value);
					if (str.includes(',') || str.includes('\n') || str.includes('\r') || str.includes('"')) {
						return '"' + str.replace(/"/g, '""') + '"';
					}
					return str;
				}).join(',');
			}).join('\n');

			//make ai request for indices to aggregate
			const argPrompt = [
				"You are a data analyst.",
				"Input is CSV (comma-separated, ','). Can contain empty cells. Columns are zero-based from 0 to " + colsMaxIndex + ".",
				"Rules:",
				"1. Column selection priority:",
				"   a) If mandatory grouping columns are specified and found: use ONLY those matched columns as pivot rows.",
				"   b) If no mandatory columns or none found: choose 1–2 best column indices for pivot rows (categorical/grouping).",
				"2. For automatic column selection (when no mandatory columns found):",
				"   a) Contain textual (non-numeric) data.",
				"   b) Prefer columns with at least 2 distinct values.",
				"   c) Prefer columns that have at least one repeated value (i.e., not all values are unique and not all identical).",
				"   If no column fully satisfies these preferences, pick the best available textual option.",
				"3. Mandatory grouping columns: " + columns.join(', ') + " (comma-separated header names).",
				"   - Use approximate (fuzzy) matching against header cells: case-insensitive, ignore spaces/punctuation.",
				"   - If multiple headers match the same required name, pick the one with the highest similarity (tie-breaker: lowest index).",
				"   - IMPORTANT: If any mandatory columns are matched, use ONLY those matched columns. Do NOT add additional columns.",
				"4. Choose exactly 1 column index for pivot values (numeric/aggregate). Prefer a numeric column; otherwise pick one that can be meaningfully aggregated.",
				"5. Mandatory value column (combined with selection of the data index): " + valueColumn + " (single header name, can be empty).",
				"   - Use the same fuzzy matching rules (case-insensitive, ignore spaces/punctuation).",
				"   - If found, use its index as the ONLY pivot value column.",
				"   - Fallback: If no acceptable match is found, choose the best available numeric column (or the most aggregatable one) as the value column.",
				"   - If a fallback is used, still follow all output rules (numbers only, correct braces).",
				"6. Ordering rule: Within the rows list and within the columns list, place indices in descending order of “grouping potential” (more suitable for grouping first). Use ascending numeric order only to break ties.",
				"   Definition of “grouping potential”: medium-to-high cardinality (not all identical, not all unique), well-distributed categories, likely to produce useful pivot groups.",
				"7. The answer MUST start with '{' and end with '}'. Missing braces = invalid.",
				"8. No extra text, spaces, or newlines.",
				"9. Output ONLY numbers, no labels like 'rows:' or 'data:'.",
				"Output format examples:",
				"- Single row field: {1|3} (row index 1, data index 3)",
				"- Two row fields: {2,0|4} (row indices 2,0, data index 4)",
				"Do NOT output: {rows:1|data:2} - this is wrong!",
				"DO output: {1|2} - this is correct!",
				"CSV:",
				csv
			  ].join('\n');

			let requestEngine = AI.Request.create(AI.ActionType.Chat);
			if (!requestEngine)
				return;

			let isSendedEndLongAction = false;
			async function checkEndAction() {
				if (!isSendedEndLongAction) {
					await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
					isSendedEndLongAction = true;
				}
			}

			await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
			await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

			let aiResult = await requestEngine.chatRequest(argPrompt, false, async function(data) {
				if (!data)
					return;
			});
			await checkEndAction();
			await Asc.Editor.callMethod("EndAction", ["GroupActions"]);

			//Parse AI result
			function parseAIResult(result) {
				const matches = result.match(/\{([^}]+)\}/g);
				if (!matches) return null;

				let content = null;
				for (let i = 0; i < matches.length; i++) {
					const bracesContent = matches[i].slice(1, -1);
					if (/\d/.test(bracesContent)) { // Check if contains any digit
						content = bracesContent;
						break;
					}
				}

				if (!content) return null;

				const sections = content.split('|');
				if (sections.length !== 2) return null;

				const rowMatches = sections[0].match(/\d+/g) || [];
				const rowIndices = rowMatches.map(s => parseInt(s, 10)).filter(n => !isNaN(n));

				const dataMatches = sections[1].match(/\d+/g) || [];
				const dataIndex = dataMatches.length > 0 ? parseInt(dataMatches[0], 10) : NaN;

				if (rowIndices.length === 0 || isNaN(dataIndex)) return null;
				return {
					rowIndices,
					colIndices: [],
					dataIndex
				};
			}
			Asc.scope.address = address;
			Asc.scope.sheetName = sheetName;
			Asc.scope.parsedResult = parseAIResult(aiResult);
			if (Asc.scope.parsedResult) {
				//add pivot fields and data values
				await Asc.Editor.callCommand(function() {
					let ws = Api.GetSheet(Asc.scope.sheetName);
					if (!ws) {
						return;
					}
					let range = ws.GetRange(Asc.scope.address);
					let pivotTable = range.PivotTable;
					if (pivotTable) {
						let pivotFields = pivotTable.GetPivotFields();
						const parsedResult = Asc.scope.parsedResult;
						const rowNames = [];
						for (let i = 0; i < parsedResult.rowIndices.length; i++) {
							const rowIndex = parsedResult.rowIndices[i];
							if (rowIndex < pivotFields.length) {
								rowNames.push(pivotFields[rowIndex].GetName());
							}
						}
						const colNames = [];
						for (let j = 0; j < parsedResult.colIndices.length; j++) {
							const colIndex = parsedResult.colIndices[j];
							if (colIndex < pivotFields.length) {
								colNames.push(pivotFields[colIndex].GetName());
							}
						}
						let dataName = "";
						if (parsedResult.dataIndex < pivotFields.length) {
							dataName = pivotFields[parsedResult.dataIndex].GetName();
						}

						if (rowNames.length > 0 || colNames.length > 0) {
							pivotTable.AddFields({rows: rowNames, columns: colNames});
						}

						if (dataName) {
							pivotTable.AddDataField(dataName);
						}
					}
				});
			}
		};

		funcs.push(func);
	}

	if (true) {
		let func = new RegisteredFunction();
		func.name = "fillMissingData";
		func.description = "Intelligently fills missing or empty cells in a data range using appropriate statistical methods. For numeric columns, fills with median values. For categorical columns, uses the most frequent value. For time series data, applies forward fill (uses the previous non-empty value). Automatically detects column types and highlights filled cells with light blue color for easy identification.";
		func.params = [
			"range (string, optional): cell range to fill missing data (e.g., 'A1:D10'). If omitted, uses active/selected range"
		];

		func.examples = [
			"Fill missing data in the current selection with appropriate values based on column types:" +
			"[functionCalling (fillMissingData)]: {}",

			"If you need to fill missing data in range A1:D10, respond:" +
			"[functionCalling (fillMissingData)]: {\"range\": \"A1:D10\"}",

			"Fill empty cells in active range using smart algorithms (median for numeric, most frequent for categorical, forward fill for time series):" +
			"[functionCalling (fillMissingData)]: {}",

			"When user asks to fill missing values, fill empty cells, complete data, or handle null values, respond:" +
			"[functionCalling (fillMissingData)]: {\"range\": \"[specific_range_if_provided]\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			
			let rangeData = await Asc.Editor.callCommand(function(){
				let ws = Api.GetActiveSheet();
				let range;
				if (Asc.scope.range) {
					range = ws.GetRange(Asc.scope.range);
				} else {
					range = ws.Selection;
				}
				return [range.Address, range.GetValue2()];
			});

			//make csv from source data
			let address = rangeData[0];
			let data = rangeData[1];
			let csv = data.map(function(item){
				return item.map(function(value) {
					if (value == null) return '';
					const str = String(value);
					if (str.includes(',') || str.includes('\n') || str.includes('\r') || str.includes('"')) {
						return '"' + str.replace(/"/g, '""') + '"';
					}
					return str;
				}).join(',');
			}).join('\n');

			//make ai request for missing data analysis
			const argPrompt = [
				"You are a data analyst.",
				"Input is CSV (comma-separated, ','). Empty cells represent missing values to be filled.",
				"Rules:",
				"1. NUMERIC columns: Fill missing values with MEDIAN of non-empty values.",
				"2. CATEGORICAL columns: Fill missing values with MOST FREQUENT value.", 
				"3. TIME_SERIES columns: Fill missing values with FORWARD FILL (previous non-empty value).",
				"",
				"Output format: JSON array with exact row/column coordinates (1-based indexing):",
				"[",
				"  {\"row\": 2, \"column\": 1, \"new_value\": 25.5},",
				"  {\"row\": 3, \"column\": 2, \"new_value\": \"Category A\"},",
				"  {\"row\": 4, \"column\": 3, \"new_value\": \"FORWARD_FILL\"}",
				"]",
				"- Use \"FORWARD_FILL\" as new_value for time series columns",
				"- Row and column numbers are 1-based (first row = 1, first column = 1)",
				"- Only include cells that need to be filled",
				"- The answer MUST be valid JSON array",
				"- No extra text, spaces, or newlines outside JSON",
				"",
				"CSV:",
				csv
			].join('\n');

			let requestEngine = AI.Request.create(AI.ActionType.Chat);
			if (!requestEngine)
				return;

			let isSendedEndLongAction = false;
			async function checkEndAction() {
				if (!isSendedEndLongAction) {
					await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
					isSendedEndLongAction = true;
				}
			}

			await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
			await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

			let aiResult = await requestEngine.chatRequest(argPrompt, false, async function(data) {
				if (!data)
					return;
			});
			await checkEndAction();
			await Asc.Editor.callMethod("EndAction", ["GroupActions"]);

			//Parse AI result
			function parseAIResult(result) {
				try {
					const jsonMatch = result.match(/\[[\s\S]*\]/);
					if (!jsonMatch) return null;
					return JSON.parse(jsonMatch[0]);
				} catch (e) {
					return null;
				}
			}

			Asc.scope.address = address;
			Asc.scope.fillData = parseAIResult(aiResult);
			Asc.scope.originalData = data;

			if (Asc.scope.fillData) {
				await Asc.Editor.callCommand(function() {
					let ws = Api.GetActiveSheet();
					let range = ws.GetRange(Asc.scope.address);
					let fillData = Asc.scope.fillData;
					let originalData = Asc.scope.originalData;
					
					let highlightColor = Api.CreateColorFromRGB(173, 216, 230);
					
					for (let i = 0; i < fillData.length; i++) {
						let fillItem = fillData[i];
						let rowNum = fillItem.row;
						let colNum = fillItem.column;
						let newValue = fillItem.new_value;
						
						if (newValue === "FORWARD_FILL") {
							let lastValue = null;
							for (let searchRow = rowNum - 1; searchRow >= 1; searchRow--) {
								let searchValue = originalData[searchRow - 1][colNum - 1];
								if (searchValue != null && searchValue !== '') {
									lastValue = searchValue;
									break;
								}
							}
							if (lastValue != null) {
								let cell = range.GetCells(rowNum, colNum);
								cell.Value = lastValue;
								cell.FillColor = highlightColor;
							}
						} else {
							let cell = range.GetCells(rowNum, colNum);
							cell.Value = newValue;
							cell.FillColor = highlightColor;
						}
					}
				});
			}
		};

		funcs.push(func);
	}

	if (true) {
		let func = new RegisteredFunction();
		func.name = "summarizeData";
		func.description = "Analyzes and creates a comprehensive text summary of data in the specified range. Automatically determines data types (numeric, categorical, dates) and provides relevant statistics for each type. For numeric data: calculates totals, averages, ranges, and identifies outliers. For categorical data: finds most frequent values and distribution patterns. The summary is placed in a new cell adjacent to the data range with proper formatting and text wrapping.";
		func.params = [
			"range (string, optional): cell range to summarize data (e.g., 'A1:D10'). If omitted, uses active/selected range"
		];

		func.examples = [
			"Analyze and summarize data in the current selection with key trends, totals, and insights:" +
			"[functionCalling (summarizeData)]: {}",

			"If you need to summarize data in range A1:D10, respond:" +
			"[functionCalling (summarizeData)]: {\"range\": \"A1:D10\"}",

			"Create text summary of active range with statistics, patterns, and anomalies:" +
			"[functionCalling (summarizeData)]: {}",

			"When user asks to summarize, analyze, overview, or create insights from data, respond:" +
			"[functionCalling (summarizeData)]: {\"range\": \"[specific_range_if_provided]\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			
			let rangeData = await Asc.Editor.callCommand(function(){
				let ws = Api.GetActiveSheet();
				let range;
				if (Asc.scope.range) {
					range = ws.GetRange(Asc.scope.range);
				} else {
					range = ws.Selection; 
				}
				return [range.Address, range.GetValue2()];
			});

			let address = rangeData[0];
			let data = rangeData[1];
			let colCount = data.length > 0 ? data[0].length : 0;
			let rowCount = data.length;
			
			let csv = data.map(function(item){
				return item.map(function(value) {
					if (value == null) return '';
					const str = String(value);
					if (str.includes(',') || str.includes('\n') || str.includes('\r') || str.includes('"')) {
						return '"' + str.replace(/"/g, '""') + '"';
					}
					return str;
				}).join(',');
			}).join('\n');

			const argPrompt = [
				"You are a data analyst. Analyze the provided CSV data and create a comprehensive summary.",
				"",
				"Instructions:",
				"1. Determine data types in each column (numeric, categorical/text, dates, mixed)",
				"2. For NUMERIC data: calculate totals, averages, ranges, identify peaks/outliers",
				"3. For CATEGORICAL data: find most frequent values, distribution patterns",
				"4. For MIXED tables: combine insights (e.g., 'Category A average: 120, Category B: 95, outlier in row 15')",
				"5. Identify trends, patterns, anomalies, and key insights",
				"",
				"Output format: Plain text summary in bullet points",
				"- Start each bullet with '• '",
				"- Keep concise but informative",
				"- Include specific numbers and findings",
				"- Highlight important patterns or anomalies",
				"- Maximum 10-15 bullet points",
				"",
				"CSV data (" + rowCount + " rows, " + colCount + " columns):",
				csv
			].join('\n');

			let requestEngine = AI.Request.create(AI.ActionType.Chat);
			if (!requestEngine)
				return;

			let isSendedEndLongAction = false;
			async function checkEndAction() {
				if (!isSendedEndLongAction) {
					await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
					isSendedEndLongAction = true;
				}
			}

			await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
			await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

			let aiResult = await requestEngine.chatRequest(argPrompt, false, async function(data) {
				if (!data)
					return;
			});
			await checkEndAction();
			await Asc.Editor.callMethod("EndAction", ["GroupActions"]);

			Asc.scope.address = address;
			Asc.scope.summary = aiResult;
			Asc.scope.colCount = colCount;

			if (Asc.scope.summary) {
				await Asc.Editor.callCommand(function() {
					let ws = Api.GetActiveSheet();
					let range = ws.GetRange(Asc.scope.address);
					let summary = Asc.scope.summary;
					let colCount = Asc.scope.colCount;
					
					let summaryCol = range.GetCol() + colCount;
					let summaryRow = range.GetRow();
					
					let summaryCell = ws.GetCells(summaryRow, summaryCol);
					summaryCell.Value = "Data Summary:\n" + summary;
					
					summaryCell.WrapText = true;
					summaryCell.AlignVertical = "top";
					
					let summaryRange = ws.GetRange(summaryCell.Address);
					summaryRange.AutoFit(false, true);
					
					let highlightColor = Api.CreateColorFromRGB(245, 245, 245);
					summaryCell.FillColor = highlightColor;
				});
			}
		};

		funcs.push(func);
	}


   if (true)
    {
        let func = new RegisteredFunction();
        func.name = "setAutoFilter";
		func.description = "Applies autofilter to a data range, enabling dropdown filters on column headers. Supports filtering by column number or column name (with fuzzy matching). Offers multiple filter types: value comparison operators (greater than, less than, equals), multiple value selection, top/bottom N items or percentage, color-based filtering (cell background or font color), and dynamic filters. Can be used to filter active selection or specific ranges.";
        func.params = [
            "range (string, optional): cell range to apply autofilter (e.g., 'A1:D10'). If omitted, uses active/selected range",
            "field (number, optional): field number for filtering (starting from 1, left-most field)",
            "fieldName (string, optional): column name/header for filtering (e.g., 'Name', 'Age'). Will automatically find the column number",
            "criteria1 (string|array|object, optional): filter criteria - string for operators (e.g., '>10'), array for multiple values (e.g., [1,2,3]), ApiColor object for color filters, or dynamic filter constant",
            "operator (string, optional): filter operator - 'xlAnd', 'xlOr', 'xlFilterValues', 'xlTop10Items', 'xlTop10Percent', 'xlBottom10Items', 'xlBottom10Percent', 'xlFilterCellColor', 'xlFilterFontColor', 'xlFilterDynamic'",
            "criteria2 (string, optional): second criteria for compound filters (used with xlAnd/xlOr operators)",
            "visibleDropDown (boolean, optional): show/hide filter dropdown arrow (default: true)"
        ];

        func.examples = [
            "If you need to apply autofilter to range A1:D10, respond:" +
            "[functionCalling (setAutoFilter)]: {\"range\": \"A1:D10\"}",

            "To apply autofilter to active/selected range, respond:" +
            "[functionCalling (setAutoFilter)]: {}",

            "To filter column 1 for values greater than 10, respond:" +
            "[functionCalling (setAutoFilter)]: {\"range\": \"A1:D10\", \"field\": 1, \"criteria1\": \">10\"}",

            "To filter by column name 'Name' for specific values, respond:" +
            "[functionCalling (setAutoFilter)]: {\"range\": \"A1:D10\", \"fieldName\": \"Name\", \"criteria1\": [\"John\", \"Jane\"], \"operator\": \"xlFilterValues\"}",

            "To filter by column header 'Age' for values greater than 18, respond:" +
            "[functionCalling (setAutoFilter)]: {\"range\": \"A1:D10\", \"fieldName\": \"Age\", \"criteria1\": \">18\"}",

            "To filter column 2 for specific values [2,5,8], respond:" +
            "[functionCalling (setAutoFilter)]: {\"range\": \"A1:D10\", \"field\": 2, \"criteria1\": [2,5,8], \"operator\": \"xlFilterValues\"}",

            "To filter column 1 for top 10 items, respond:" +
            "[functionCalling (setAutoFilter)]: {\"range\": \"A1:D10\", \"field\": 1, \"criteria1\": \"10\", \"operator\": \"xlTop10Items\"}",

            "To create compound filter (>5 OR <2), respond:" +
            "[functionCalling (setAutoFilter)]: {\"range\": \"A1:D10\", \"field\": 1, \"criteria1\": \">5\", \"operator\": \"xlOr\", \"criteria2\": \"<2\"}",

            "To filter by cell background color (yellow), respond:" +
            "[functionCalling (setAutoFilter)]: {\"range\": \"A1:D10\", \"field\": 1, \"criteria1\": {\"r\": 255, \"g\": 255, \"b\": 0}, \"operator\": \"xlFilterCellColor\"}",

            "To filter by font color (red), respond:" +
            "[functionCalling (setAutoFilter)]: {\"range\": \"A1:D10\", \"field\": 1, \"criteria1\": {\"r\": 255, \"g\": 0, \"b\": 0}, \"operator\": \"xlFilterFontColor\"}",

            "To filter active range for values greater than 5, respond:" +
            "[functionCalling (setAutoFilter)]: {\"field\": 1, \"criteria1\": \">5\"}",

            "To filter active range by column name 'Price' for values less than 100, respond:" +
            "[functionCalling (setAutoFilter)]: {\"fieldName\": \"Price\", \"criteria1\": \"<100\"}",

            "When user requests filtering by column name with comparison operators (e.g., 'filter more than X by column Y', 'show values greater than Z in field W'), respond:" +
            "[functionCalling (setAutoFilter)]: {\"fieldName\": \"[extracted_column_name]\", \"criteria1\": \"[operator][value]\"}",

            "For filtering by column names with numeric criteria (e.g., 'values > 10', 'less than 50', 'equal to 25'), respond:" +
            "[functionCalling (setAutoFilter)]: {\"fieldName\": \"[column_name_from_request]\", \"criteria1\": \"[comparison_operator][numeric_value]\"}",

            "To filter by any column header with comparison operators mentioned in user request, respond:" +
            "[functionCalling (setAutoFilter)]: {\"fieldName\": \"[header_name_from_user]\", \"criteria1\": \"[operator_and_value_from_request]\"}",

            "When user requests filtering with 'more than', 'greater than', 'above' use '>' operator:" +
            "[functionCalling (setAutoFilter)]: {\"fieldName\": \"[column_name]\", \"criteria1\": \">[value]\"}",

            "When user requests filtering with 'less than', 'below', 'under' use '<' operator:" +
            "[functionCalling (setAutoFilter)]: {\"fieldName\": \"[column_name]\", \"criteria1\": \"<[value]\"}",

            "When user requests filtering with 'equal to', 'equals', 'exactly' use '=' operator:" +
            "[functionCalling (setAutoFilter)]: {\"fieldName\": \"[column_name]\", \"criteria1\": \"=[value]\"}",

            "To remove autofilter from range, respond:" +
            "[functionCalling (setAutoFilter)]: {\"range\": \"A1:D10\", \"field\": null}",

            "To clear filter from specific column, respond:" +
            "[functionCalling (setAutoFilter)]: {\"range\": \"A1:D10\", \"field\": 1, \"criteria1\": null}",

            "To filter range A1:D8 by yellow color, respond:" +
            "[functionCalling (setAutoFilter)]: {\"range\": \"A1:D8\", \"fieldName\": \"color\", \"criteria1\": {\"r\": 255, \"g\": 255, \"b\": 0}, \"operator\": \"xlFilterCellColor\"}"
        ];

        func.call = async function(params) {
            Asc.scope.range = params.range;
            Asc.scope.field = params.field;
            Asc.scope.fieldName = params.fieldName;
            Asc.scope.criteria1 = params.criteria1;
            Asc.scope.operator = params.operator;
            Asc.scope.criteria2 = params.criteria2;
            Asc.scope.visibleDropDown = params.visibleDropDown;

            if (Asc.scope.fieldName && !Asc.scope.field) {
                let insertRes = await Asc.Editor.callCommand(function(){
                    let ws = Api.GetActiveSheet();
                    let _range;

                    if (!Asc.scope.range) {
                        _range = Api.GetSelection();
                    } else {
                        _range = ws.GetRange(Asc.scope.range);
                    }

                    return _range.GetValue2();
                });

                let csv = insertRes.map(function(item){
                    return item.map(function(value) {
                        if (value == null) return '';
                        const str = String(value);
                        if (str.includes(',') || str.includes('\n') || str.includes('\r') || str.includes('"')) {
                            return '"' + str.replace(/"/g, '""') + '"';
                        }
                        return str;
                    }).join(',');
                }).join('\n');

                let argPromt = "Find column index for header '" + Asc.scope.fieldName + "' in the following CSV data.\n\n" +
                "IMPORTANT RULES:\n" +
                "1. Return ONLY a single number (column index starting from 1). No text, no explanations, no additional characters.\n" +
                "2. Find EXACT match first. If exact match exists, return its index.\n" +
                "3. If no exact match, then look for partial matches.\n" +
                "4. Case-insensitive comparison allowed.\n" +
                "5. Data is CSV format (comma-separated). Look ONLY at the first row (header row).\n" +
                "6. Count positions carefully: each comma marks a column boundary.\n" +
                "7. Example: if searching for 'test2' and headers are 'test1,test2,test', return 2 (not 1 or 3).\n" +
                "8. If the header is in the 3rd column, return only: 3\n\n" +
                "CSV data:\n" + csv;

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

                let result = await requestEngine.chatRequest(argPromt, false, async function(data) {
                    if (!data)
                        return;
                    await checkEndAction();
                });

                await checkEndAction();
                await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
                Asc.scope.field = result;
            }

            await Asc.Editor.callCommand(function(){
                let ws = Api.GetActiveSheet();
                let range;

                if (!Asc.scope.range) {
                    range = Api.GetSelection();
                } else {
                    range = ws.GetRange(Asc.scope.range);
                }

                if (!range) {
                    return;
                }

                let field = Asc.scope.field;
                if (!field) {
                    field = 1;
                }

                let criteria1 = Asc.scope.criteria1;
                if (Asc.scope.operator === "xlFilterCellColor" || Asc.scope.operator === "xlFilterFontColor") {
                    if (criteria1 && typeof criteria1 === 'object' && criteria1.r !== undefined && criteria1.g !== undefined && criteria1.b !== undefined) {
                        criteria1 = Api.CreateColorFromRGB(criteria1.r, criteria1.g, criteria1.b);
                    }
                }

                range.SetAutoFilter(
                    field,
                    criteria1,
                    Asc.scope.operator,
                    Asc.scope.criteria2,
                    Asc.scope.visibleDropDown
                );
            });
        };

        funcs.push(func);
    }

	if (true)
	{
		let func = new RegisteredFunction();
		func.name = "setSort";
		func.description = "Sorts data in a range by a single column in ascending or descending order.";
		func.params = [
			"range (string, optional): cell range to sort (e.g., 'A1:D10'). If omitted, uses active/selected range",
			"key1 (string|number, optional): sort field - cell reference (e.g., 'A1'), column index (1-based), or column name. If omitted, uses first column",
			"sortOrder1 (string, optional): 'xlAscending' or 'xlDescending' (default: 'xlAscending')",
			"header (string, optional): 'xlYes' or 'xlNo' (default: 'xlNo')"
		];

		func.examples = [
			"To sort range A1:D10 by first column in ascending order:" +
			"[functionCalling (setSort)]: {\"range\": \"A1:D10\", \"sortOrder1\": \"xlAscending\"}",

			"To sort active range in descending order:" +
			"[functionCalling (setSort)]: {\"sortOrder1\": \"xlDescending\"}",

			"To sort by column name 'Name':" +
			"[functionCalling (setSort)]: {\"key1\": \"Name\", \"header\": \"xlYes\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			Asc.scope.key1 = params.key1;
			Asc.scope.sortOrder1 = params.sortOrder1 || "xlAscending";
			Asc.scope.header = params.header || "xlNo";

			async function findColumnByName(fieldName) {
				if (!fieldName) return null;

				let insertRes = await Asc.Editor.callCommand(function(){
					let ws = Api.GetActiveSheet();
					let _range;

					if (!Asc.scope.range) {
						_range = Api.GetSelection();
					} else {
						_range = ws.GetRange(Asc.scope.range);
					}

					return _range.GetValue2();
				});

				let csv = insertRes.map(function(item){
					return item.map(function(value) {
						if (value == null) return '';
						const str = String(value);
						if (str.includes(',') || str.includes('\n') || str.includes('\r') || str.includes('"')) {
							return '"' + str.replace(/"/g, '""') + '"';
						}
						return str;
					}).join(',');
				}).join('\n');

				let argPromt = "Find column index for header '" + fieldName + "' in the following CSV data.\n\n" +
				"IMPORTANT RULES:\n" +
				"1. Return ONLY a single number (column index starting from 1). No text, no explanations, no additional characters.\n" +
				"2. Find EXACT match first. If exact match exists, return its index.\n" +
				"3. If no exact match, then look for partial matches.\n" +
				"4. Case-insensitive comparison allowed.\n" +
				"5. Data is CSV format (comma-separated). Look ONLY at the first row (header row).\n" +
				"6. Count positions carefully: each comma marks a column boundary.\n" +
				"7. Example: if searching for 'test2' and headers are 'test1,test2,test', return 2 (not 1 or 3).\n" +
				"8. If the header is in the 3rd column, return only: 3\n\n" +
				"CSV data:\n" + csv;
				
				let requestEngine = AI.Request.create(AI.ActionType.Chat);
				if (!requestEngine)
					return null;

				let isSendedEndLongAction = false;
				async function checkEndAction() {
					if (!isSendedEndLongAction) {
						await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
						isSendedEndLongAction = true
					}
				}

				await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
				await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

				let result = await requestEngine.chatRequest(argPromt, false, async function(data) {
					if (!data)
						return;
					await checkEndAction();
				});

				await checkEndAction();
				await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
				return result - 0;
			}

			if (Asc.scope.key1 && typeof Asc.scope.key1 === 'string' && isNaN(Asc.scope.key1) && !Asc.scope.key1.match(/^[A-Z]+\d+$/i)) {
				Asc.scope.key1 = await findColumnByName(Asc.scope.key1);
			}

			await Asc.Editor.callCommand(function(){
				let ws = Api.GetActiveSheet();
				let range;

				if (!Asc.scope.range) {
					range = Api.GetSelection();
				} else {
					range = ws.GetRange(Asc.scope.range);
				}

				if (!range) {
					return;
				}

				if (Asc.scope.header === "xlYes") {
					range.SetOffset(1, 0);
				}

				let key1 = null;

				function adjustSortKey(keyValue) {
					if (!keyValue) {
						return ws.GetCells(range.GetRow(), range.GetCol());
					}

					if (typeof keyValue === 'number') {
						return ws.GetCells(range.GetRow(), range.GetCol() + keyValue - 1);
					} else if (typeof keyValue === 'string') {
						try {
							let keyRange = ws.GetRange(keyValue);
							return keyRange || keyValue;
						} catch {
							return keyValue;
						}
					} else {
						return keyValue;
					}
				}

				key1 = adjustSortKey(Asc.scope.key1);

				range.SetSort(
					key1,
					Asc.scope.sortOrder1,
					null,
					null,
					null,
					null,
					Asc.scope.header
				);
			});
		};

		funcs.push(func);
	}

	if (true)
	{
		let func = new RegisteredFunction();
		func.name = "setMultiSort";
		func.description = "Sorts data by multiple columns (up to 3 levels). Use this when you need to sort by primary, secondary, and tertiary sort keys. Each level can have its own sort order.";
		func.params = [
			"range (string, optional): cell range to sort (e.g., 'A1:D10'). If omitted, uses active/selected range",
			"key1 (string|number, optional): first sort field - cell reference, column index (1-based), or column name. If omitted, uses first column",
			"sortOrder1 (string, optional): sort order for key1 - 'xlAscending' or 'xlDescending' (default: 'xlAscending')",
			"key2 (string|number, optional): second sort field - cell reference, column index, or column name. If omitted, uses second column",
			"sortOrder2 (string, optional): sort order for key2 - 'xlAscending' or 'xlDescending' (default: 'xlAscending')",
			"key3 (string|number, optional): third sort field - cell reference, column index, or column name",
			"sortOrder3 (string, optional): sort order for key3 - 'xlAscending' or 'xlDescending' (default: 'xlAscending')",
			"header (string, optional): specifies if first row contains headers - 'xlYes' or 'xlNo' (default: 'xlNo')"
		];

		func.examples = [
			"To sort by two columns:" +
			"[functionCalling (setMultiSort)]: {}",

			"To sort by Name and Age:" +
			"[functionCalling (setMultiSort)]: {\"key1\": \"Name\", \"key2\": \"Age\", \"header\": \"xlYes\"}",

			"To sort first column ascending, second descending:" +
			"[functionCalling (setMultiSort)]: {\"sortOrder1\": \"xlAscending\", \"sortOrder2\": \"xlDescending\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			Asc.scope.key1 = params.key1;
			Asc.scope.sortOrder1 = params.sortOrder1 || "xlAscending";
			Asc.scope.key2 = params.key2;
			Asc.scope.sortOrder2 = params.sortOrder2 || "xlAscending";
			Asc.scope.key3 = params.key3;
			Asc.scope.sortOrder3 = params.sortOrder3 || "xlAscending";
			Asc.scope.header = params.header || "xlNo";

			async function findColumnByName(fieldName) {
				if (!fieldName) return null;

				let insertRes = await Asc.Editor.callCommand(function(){
					let ws = Api.GetActiveSheet();
					let _range;

					if (!Asc.scope.range) {
						_range = Api.GetSelection();
					} else {
						_range = ws.GetRange(Asc.scope.range);
					}

					return _range.GetValue2();
				});

				let csv = insertRes.map(function(item){
					return item.map(function(value) {
						if (value == null) return '';
						const str = String(value);
						if (str.includes(',') || str.includes('\n') || str.includes('\r') || str.includes('"')) {
							return '"' + str.replace(/"/g, '""') + '"';
						}
						return str;
					}).join(',');
				}).join('\n');

				let argPromt = "Find column index for header '" + fieldName + "' in the following CSV data.\n\n" +
				"IMPORTANT RULES:\n" +
				"1. Return ONLY a single number (column index starting from 1). No text, no explanations, no additional characters.\n" +
				"2. Find EXACT match first. If exact match exists, return its index.\n" +
				"3. If no exact match, then look for partial matches.\n" +
				"4. Case-insensitive comparison allowed.\n" +
				"5. Data is CSV format (comma-separated). Look ONLY at the first row (header row).\n" +
				"6. Count positions carefully: each comma marks a column boundary.\n" +
				"7. Example: if searching for 'test2' and headers are 'test1,test2,test', return 2 (not 1 or 3).\n" +
				"8. If the header is in the 3rd column, return only: 3\n\n" +
				"CSV data:\n" + csv;
				
				let requestEngine = AI.Request.create(AI.ActionType.Chat);
				if (!requestEngine)
					return null;

				let isSendedEndLongAction = false;
				async function checkEndAction() {
					if (!isSendedEndLongAction) {
						await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
						isSendedEndLongAction = true
					}
				}

				await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
				await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

				let result = await requestEngine.chatRequest(argPromt, false, async function(data) {
					if (!data)
						return;
					await checkEndAction();
				});

				await checkEndAction();
				await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
				return result - 0;
			}

			if (Asc.scope.key1 && typeof Asc.scope.key1 === 'string' && isNaN(Asc.scope.key1) && !Asc.scope.key1.match(/^[A-Z]+\d+$/i)) {
				Asc.scope.key1 = await findColumnByName(Asc.scope.key1);
			}
			if (Asc.scope.key2 && typeof Asc.scope.key2 === 'string' && isNaN(Asc.scope.key2) && !Asc.scope.key2.match(/^[A-Z]+\d+$/i)) {
				Asc.scope.key2 = await findColumnByName(Asc.scope.key2);
			}
			if (Asc.scope.key3 && typeof Asc.scope.key3 === 'string' && isNaN(Asc.scope.key3) && !Asc.scope.key3.match(/^[A-Z]+\d+$/i)) {
				Asc.scope.key3 = await findColumnByName(Asc.scope.key3);
			}

			await Asc.Editor.callCommand(function(){
				let ws = Api.GetActiveSheet();
				let range;

				if (!Asc.scope.range) {
					range = Api.GetSelection();
				} else {
					range = ws.GetRange(Asc.scope.range);
				}

				if (!range) {
					return;
				}

				if (Asc.scope.header === "xlYes") {
					range.SetOffset(1, 0);
				}

				let key1 = null, key2 = null, key3 = null;

				function adjustSortKey(keyValue, defaultColumnOffset) {
					if (!keyValue) {
						if (defaultColumnOffset !== undefined) {
							return ws.GetCells(range.GetRow(), range.GetCol() + defaultColumnOffset);
						}
						return null;
					}

					if (typeof keyValue === 'number') {
						return ws.GetCells(range.GetRow(), range.GetCol() + keyValue - 1);
					} else if (typeof keyValue === 'string') {
						try {
							let keyRange = ws.GetRange(keyValue);
							return keyRange || keyValue;
						} catch {
							return keyValue;
						}
					} else {
						return keyValue;
					}
				}

				key1 = adjustSortKey(Asc.scope.key1, 0);
				key2 = adjustSortKey(Asc.scope.key2, 1);
				key3 = adjustSortKey(Asc.scope.key3);

				range.SetSort(
					key1,
					Asc.scope.sortOrder1,
					key2,
					Asc.scope.sortOrder2,
					key3,
					Asc.scope.sortOrder3,
					Asc.scope.header
				);
			});
		};

		funcs.push(func);
	}

	if (true) {
		let func = new RegisteredFunction();
		func.name = "addChart";
		func.params = [
			"range (string, optional): cell range with data for chart (e.g., 'A1:D10'). If omitted, uses current selection",
			"chartType (string, optional): type of chart - bar, barStacked, barStackedPercent, bar3D, barStacked3D, barStackedPercent3D, barStackedPercent3DPerspective, horizontalBar, horizontalBarStacked, horizontalBarStackedPercent, horizontalBar3D, horizontalBarStacked3D, horizontalBarStackedPercent3D, lineNormal, lineStacked, lineStackedPercent, line3D, pie, pie3D, doughnut, scatter, stock, area, areaStacked, areaStackedPercent Default: bar",
			"title (string, optional): chart title text"
		];

		func.examples = [
			"To create a bar chart from current selection, respond:" +
			"[functionCalling (addChart)]: {}",

			"To create a line chart from current selection, respond:" +
			"[functionCalling (addChart)]: {\"chartType\": \"line\"}",

			"To create a pie chart from specific range, respond:" +
			"[functionCalling (addChart)]: {\"range\": \"A1:B10\", \"chartType\": \"pie\"}",

			"To create a chart with title, respond:" +
			"[functionCalling (addChart)]: {\"title\": \"Sales Overview\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			Asc.scope.chartType = params.chartType || "bar";
			Asc.scope.title = params.title;

			await Asc.Editor.callCommand(function(){
				let ws = Api.GetActiveSheet();
				let chartRange;

				if (Asc.scope.range) {
					chartRange = Asc.scope.range;
				} else {
					let selection = Api.GetSelection();
					chartRange = selection.GetAddress(true, true, "xlA1", false);
				}

				let range = ws.GetRange(chartRange);
				let fromRow = range.GetRow() + 3;
				let fromCol = range.GetCol();

				let widthEMU = 130 * 36000;
				let heightEMU = 80 * 36000;

				let chart = ws.AddChart(
					chartRange,
					true,
					Asc.scope.chartType,
					2,
					widthEMU,
					heightEMU,
					fromCol,
					0,
					fromRow,
					0
				);
				if (chart && Asc.scope.title) {
					chart.SetTitle(Asc.scope.title, 14);
				}
			});
		};
		funcs.push(func);
	}

	if (true)
	{
		let func = new RegisteredFunction();
		func.name = "explainFormula";
		func.description = "Analyzes and explains Excel formulas in natural language. Uses AI to provide detailed explanations of formula logic, function parameters, nested operations, and expected results. The explanation is added as a cell comment to the cell containing the formula. Particularly useful for understanding complex formulas with multiple nested functions or unfamiliar Excel functions. Keeps explanations concise (under 1024 characters recommended) while covering all essential information.";
		func.params = [
			"range (string, optional): cell range containing formula to explain (e.g., 'A1'). If omitted, uses active/selected cell"
		];

		func.examples = [
			"To explain formula in active cell, respond:" +
			"[functionCalling (explainFormula)]: {}",

			"To explain formula in specific cell A1, respond:" +
			"[functionCalling (explainFormula)]: {\"range\": \"A1\"}",

			"To explain formula in cell B5, respond:" +
			"[functionCalling (explainFormula)]: {\"range\": \"B5\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;

			// Get formula from the specified cell
			let formulaData = await Asc.Editor.callCommand(function(){
				let ws = Api.GetActiveSheet();
				let _range;

				if (!Asc.scope.range) {
					_range = Api.GetSelection();
				} else {
					_range = ws.GetRange(Asc.scope.range);
				}

				if (!_range || !_range.GetCells(1, 1)) {
					return null;
				}

				let cell = _range.GetCells(1, 1);
				let formula = cell.GetFormula();
				let cellAddress = cell.GetAddress();
				
				return {
					formula: formula,
					address: cellAddress,
					hasFormula: formula && formula.toString().startsWith('=')
				};
			});

			if (!formulaData || !formulaData.hasFormula) {
				return; // No formula to explain
			}
			let argPrompt = "Explain the following Excel formula in detail:\n\n" +
				"Formula: " + formulaData.formula + "\n" +
				"Cell: " + formulaData.address + "\n\n" +
				"IMPORTANT RULES:\n" +
				"1. Provide a clear, detailed explanation of what the formula does.\n" +
				"2. Break down each part of the formula if it's complex.\n" +
				"3. Explain the functions used and their parameters.\n" +
				"4. Describe the expected result or output.\n" +
				"5. Use simple, understandable language.\n" +
				"6. If there are nested functions, explain the order of operations.\n" +
				"7. Mention any potential issues or common mistakes.\n" +
				"8. Keep the explanation concise but comprehensive.\n" +
				"9. Be brief and avoid unnecessary verbose explanations.\n" +
				"10. Get straight to the point without filler text.\n" +
				"11. Focus only on essential information.\n" +
				"12. Keep response length under 1024 characters (recommended), maximum 32767 characters.\n" +
				"13. Prioritize the most important information if length constraint requires cuts.\n\n" +
				"Please provide a detailed but concise explanation of this formula.";

			let requestEngine = AI.Request.create(AI.ActionType.Chat);
			if (!requestEngine)
				return;

			let isSendedEndLongAction = false;
			async function checkEndAction() {
				if (!isSendedEndLongAction) {
					await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
					isSendedEndLongAction = true;
				}
			}

			await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
			await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

			let explanation = await requestEngine.chatRequest(argPrompt, false, async function(data) {
				if (!data)
					return;
				await checkEndAction();
			});

			await checkEndAction();
			await Asc.Editor.callMethod("EndAction", ["GroupActions"]);

			// Add comment with explanation to the cell
			if (explanation) {
				Asc.scope.explanation = explanation;
				await Asc.Editor.callCommand(function(){
					let ws = Api.GetActiveSheet();
					let _range;

					if (!Asc.scope.range) {
						_range = Api.GetSelection();
					} else {
						_range = ws.GetRange(Asc.scope.range);
					}

					if (_range) {
						let cell = _range.GetCells(1, 1);
						if (cell) {
							// Create comment with formula explanation
							let commentText = "Formula Explanation:\n\n" + Asc.scope.explanation;
							cell.AddComment(commentText, "AI Assistant");
						}
					}
				});
			}
		};

		funcs.push(func);
	}

	if (true)
	{
		let func = new RegisteredFunction();
		func.name = "addImage";
		func.params = [
			"description (string): text description of the image to generate",
			"width (number, optional): image width in mm (default: 100)",
			"height (number, optional): image height in mm (default: 100)",
			"style (string, optional): image style (realistic, cartoon, abstract, etc.)"
		];

		func.description = "Use this function when you need to insert an image into the spreadsheet.";

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
						let worksheet = Api.GetActiveSheet();
						worksheet.ReplaceCurrentImage(Asc.scope.imageUrl, Asc.scope.width, Asc.scope.height);
					});
					await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
				}
			} catch (error) {
			}

		};

	funcs.push(func);
}
	if (true) {
		let func = new RegisteredFunction();
		func.name = "changeTextStyle";
		func.description = "Applies text formatting styles to cells in the specified range or current selection. Supports comprehensive text styling options including bold, italic, underline (multiple types), strikeout, font family, font size, and font color. Colors can be specified using hex codes (#FF0000) or preset color names (red, blue, etc.). All formatting parameters are optional - only specified properties will be changed, leaving others unchanged.";
		func.params = [
			"bold (boolean): whether to make the text bold",
			"italic (boolean): whether to make the text italic", 
			"underline (string): underline type ('none', 'single', 'singleAccounting', 'double', 'doubleAccounting')",
			"strikeout (boolean): whether to strike out the text",
			"fontSize (number): font size to apply to the selected cell(s)",
			"fontName (string): font family name to apply to the selected cell(s)",
			"fontColor (string): font color (hex color like '#FF0000' or preset color name like 'red')",
			"range (string, optional): cell range to format (e.g., 'A1:B5'). If omitted, uses current selection"
		];

		func.examples = [
			"If you need to make selected cells bold and italic, respond with:\n" +
			"[functionCalling (changeTextStyle)]: {\"bold\": true, \"italic\": true}",

			"If you need to underline the selected cells, respond with:\n" +
			"[functionCalling (changeTextStyle)]: {\"underline\": \"single\"}",

			"If you need to strike out the selected cells, respond with:\n" +
			"[functionCalling (changeTextStyle)]: {\"strikeout\": true}",

			"If you need to set the font size of selected cells to 18, respond with:\n" +
			"[functionCalling (changeTextStyle)]: {\"fontSize\": 18}",

			"If you need to change font to Arial and make it red, respond with:\n" +
			"[functionCalling (changeTextStyle)]: {\"fontName\": \"Arial\", \"fontColor\": \"red\"}",

			"If you need to format range A1:C3 as bold, respond with:\n" +
			"[functionCalling (changeTextStyle)]: {\"range\": \"A1:C3\", \"bold\": true}",

			"If you need to make selected cells non-italic, respond with:\n" +
			"[functionCalling (changeTextStyle)]: {\"italic\": false}"
		];

		func.call = async function(params) {
			Asc.scope.bold = params.bold;
			Asc.scope.italic = params.italic;
			Asc.scope.underline = params.underline;
			Asc.scope.strikeout = params.strikeout;
			Asc.scope.fontSize = params.fontSize;
			Asc.scope.fontName = params.fontName;
			Asc.scope.fontColor = params.fontColor;
			Asc.scope.range = params.range;

			await Asc.Editor.callCommand(function(){
				let ws = Api.GetActiveSheet();
				let _range;

				if (!Asc.scope.range) {
					_range = Api.GetSelection();
				} else {
					_range = ws.GetRange(Asc.scope.range);
				}

				if (!_range)
					return;

				if (undefined !== Asc.scope.bold)
					_range.SetBold(Asc.scope.bold);

				if (undefined !== Asc.scope.italic)
					_range.SetItalic(Asc.scope.italic);

				if (undefined !== Asc.scope.underline)
					_range.SetUnderline(Asc.scope.underline);

				if (undefined !== Asc.scope.strikeout)
					_range.SetStrikeout(Asc.scope.strikeout);

				if (undefined !== Asc.scope.fontSize)
					_range.SetFontSize(Asc.scope.fontSize);

				if (undefined !== Asc.scope.fontName)
					_range.SetFontName(Asc.scope.fontName);

				if (undefined !== Asc.scope.fontColor) {
					// Handle different color formats
					let color;
					if (Asc.scope.fontColor.startsWith('#')) {
						// Hex color
						color = Api.CreateColorFromRGB(
							parseInt(Asc.scope.fontColor.substring(1, 3), 16),
							parseInt(Asc.scope.fontColor.substring(3, 5), 16),
							parseInt(Asc.scope.fontColor.substring(5, 7), 16)
						);
					} else {
						// Preset color name
						color = Api.CreateColorByName(Asc.scope.fontColor);
					}
					if (color)
						_range.SetFontColor(color);
				}
			});
		};

		funcs.push(func);
	}

	if (true) {
		let func = new RegisteredFunction();
		func.name = "highlightAnomalies";
		func.description = "Detects and highlights statistical outliers (anomalies) in numeric data using the IQR (Interquartile Range) method or Z-score analysis. Applies conservative outlier detection to avoid false positives - only marks clear statistical anomalies. Automatically extracts numeric values from the range, calculates quartiles, and identifies values that fall outside Q1-1.5*IQR or Q3+1.5*IQR. Highlights detected anomalies with customizable colors. Requires at least 4 numeric values for analysis.";
		func.params = [
			"range (string, optional): cell range to analyze for anomalies (e.g., 'A1:D10'). If omitted, uses current selection or entire used range",
			"highlightColor (string, optional): color to highlight anomalies (hex color like '#FF0000' or preset color name like 'red'). Default: 'yellow'"
		];

		func.examples = [
			"To highlight anomalies in current selection, respond:\n" +
			"[functionCalling (highlightAnomalies)]: {}",

			"To highlight anomalies in specific range A1:D10, respond:\n" +
			"[functionCalling (highlightAnomalies)]: {\"range\": \"A1:D10\"}",

			"To highlight anomalies in red color, respond:\n" +
			"[functionCalling (highlightAnomalies)]: {\"highlightColor\": \"red\"}",

			"To highlight anomalies in specific range with custom color, respond:\n" +
			"[functionCalling (highlightAnomalies)]: {\"range\": \"A1:D10\", \"highlightColor\": \"#FF5733\"}",

			"If you need to analyze selected range for statistical outliers and highlight them, respond:\n" +
			"[functionCalling (highlightAnomalies)]: {}",

			"If you need to find and highlight anomalous values in data with blue color, respond:\n" +
			"[functionCalling (highlightAnomalies)]: {\"highlightColor\": \"blue\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			Asc.scope.highlightColor = params.highlightColor || "yellow";

			let rangeData = await Asc.Editor.callCommand(function(){
				let ws = Api.GetActiveSheet();
				let _range;

				if (!Asc.scope.range) {
					_range = Api.GetSelection();
				} else {
					_range = ws.GetRange(Asc.scope.range);
				}

				if (!_range)
					return null;

				let values = _range.GetValue2();
				let address = _range.Address;
				let startRow = _range.Row;
				let startCol = _range.Col;

				return {
					values: values,
					address: address,
					startRow: startRow,
					startCol: startCol
				};
			});

			if (!rangeData || !rangeData.values) {
				return;
			}

			// Extract numeric values with their positions
			let numericData = [];
			let values = rangeData.values;
			
			// Helper function to check if a value is a valid number
			function isValidNumber(value) {
				if (value == null || value === '') {
					return false;
				}
				let numValue = parseFloat(value);
				return !isNaN(numValue) && isFinite(numValue) ? numValue : false;
			}
			
			if (Array.isArray(values)) {
				for (let r = 0; r < values.length; r++) {
					let row = values[r];
					if (Array.isArray(row)) {
						for (let c = 0; c < row.length; c++) {
							let cell = row[c];
							let numValue = isValidNumber(cell);
							if (numValue !== false) {
								numericData.push({row: r, col: c, value: numValue});
							}
						}
					} else {
						let numValue = isValidNumber(row);
						if (numValue !== false) {
							numericData.push({row: r, col: 0, value: numValue});
						}
					}
				}
			} else {
				let numValue = isValidNumber(values);
				if (numValue !== false) {
					numericData.push({row: 0, col: 0, value: numValue});
				}
			}

			if (numericData.length === 0) {
				return; // No numeric data to analyze
			}

			let dataValues = numericData.map(function(item) { return item.value; });
			
			let argPrompt = [
				"You are a statistical data analyst.",
				"Input is numeric array: [" + dataValues.join(',') + "]",
				"Task: Find statistical outliers (anomalies) in the data.",
				"Rules:",
				"1. Use IQR (Interquartile Range) method for outlier detection:",
				"   a) Calculate Q1 (25th percentile) and Q3 (75th percentile)",
				"   b) Calculate IQR = Q3 - Q1",
				"   c) Define outliers as values < Q1 - 1.5*IQR or > Q3 + 1.5*IQR",
				"2. Alternative method: Z-score analysis where |Z| > 2.5 indicates outlier",
				"3. Be conservative - only mark clear statistical outliers to avoid false positives",
				"4. If dataset has less than 4 values, return empty array (insufficient data)",
				"5. Ignore extreme outliers that are obviously data entry errors vs. statistical anomalies",
				"6. The answer MUST be a valid JSON array of indices (0-based positions in input array)",
				"7. Format: [0,2,5] - indices of outlier positions in the input array",
				"8. If no outliers found, return empty array: []",
				"9. No extra text, explanations, or formatting - ONLY the JSON array",
				"10. Example responses:",
				"    - Input [1,2,3,100]: return [3]",
				"    - Input [1,2,3,4,5]: return []",
				"    - Input [10,10,10,50,10]: return [3]",
				"Data to analyze: [" + dataValues.join(',') + "]"
			].join('\n');

			let requestEngine = AI.Request.create(AI.ActionType.Chat);
			if (!requestEngine)
				return;

			let isSendedEndLongAction = false;
			async function checkEndAction() {
				if (!isSendedEndLongAction) {
					await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
					isSendedEndLongAction = true;
				}
			}

			await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
			await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

			let aiResult = await requestEngine.chatRequest(argPrompt, false, async function(data) {
				if (!data)
					return;
			});

			await checkEndAction();

			if (aiResult) {
				try {
					let anomalies = JSON.parse(aiResult.trim());
					if (Array.isArray(anomalies) && anomalies.length > 0) {
						Asc.scope.anomalies = [];
						Asc.scope.numericData = numericData;
						
						for (let i = 0; i < anomalies.length; i++) {
							let dataIndex = anomalies[i];
							if (typeof dataIndex === 'number' && dataIndex >= 0 && dataIndex < Asc.scope.numericData.length) {
								Asc.scope.anomalies.push({
									row: Asc.scope.numericData[dataIndex].row,
									col: Asc.scope.numericData[dataIndex].col
								});
							}
						}
						
						if (Asc.scope.anomalies.length > 0) {
							Asc.scope.rangeData = rangeData;

							await Asc.Editor.callCommand(function(){
								let ws = Api.GetActiveSheet();
								let highlightColor;
								
								// Handle different color formats
								if (Asc.scope.highlightColor.startsWith('#')) {
									// Hex color
									let hex = Asc.scope.highlightColor.substring(1);
									let r = parseInt(hex.substring(0, 2), 16);
									let g = parseInt(hex.substring(2, 4), 16);
									let b = parseInt(hex.substring(4, 6), 16);
									highlightColor = Api.CreateColorFromRGB(r, g, b);
								} else {
									// Named color
									highlightColor = Api.CreateColorByName(Asc.scope.highlightColor);
								}

								for (let i = 0; i < Asc.scope.anomalies.length; i++) {
									let anomaly = Asc.scope.anomalies[i];
									let targetRow = Asc.scope.rangeData.startRow + anomaly.row;
									let targetCol = Asc.scope.rangeData.startCol + anomaly.col;
									
									let cell = ws.GetCells(targetRow, targetCol);
									if (cell) {
										cell.SetFillColor(highlightColor);
									}
								}
							});
						}
					}
				} catch (error) {
					// Handle JSON parsing errors or other issues
					console.error("Error parsing AI result:", error);
				}
			}

			await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
		};

		funcs.push(func);
	}

	if (true) {
		let func = new RegisteredFunction();
		func.name = "highlightDuplicates";
		func.description = "Identifies and highlights duplicate values within a specified range. Compares all cells in the range and highlights cells that contain values appearing more than once. Uses AI to accurately detect duplicates while handling various data types (numbers, text, dates). Highlights all instances of duplicate values with customizable color. Useful for data validation, cleanup tasks, and identifying repeated entries in datasets.";
		func.params = [
			"range (string, optional): cell range to analyze for duplicates (e.g., 'A1:D10'). If omitted, uses current selection or entire used range",
			"highlightColor (string, optional): color to highlight duplicates (hex color like '#FF0000' or preset color name like 'red'). Default: 'orange'"
		];

		func.examples = [
			"To highlight duplicates in current selection, respond:\n" +
			"[functionCalling (highlightDuplicates)]: {}",

			"To highlight duplicates in specific range A1:D10, respond:\n" +
			"[functionCalling (highlightDuplicates)]: {\"range\": \"A1:D10\"}",

			"To highlight duplicates in red color, respond:\n" +
			"[functionCalling (highlightDuplicates)]: {\"range\": \"A1:D10\", \"highlightColor\": \"red\"}",

			"To highlight duplicates in specific range with custom color, respond:\n" +
			"[functionCalling (highlightDuplicates)]: {\"range\": \"A1:D10\", \"highlightColor\": \"#FF5733\"}",

			"If you need to find and highlight duplicate rows in data, respond:\n" +
			"[functionCalling (highlightDuplicates)]: {}",

			"If you need to detect duplicate entries with blue highlighting, respond:\n" +
			"[functionCalling (highlightDuplicates)]: {\"highlightColor\": \"blue\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			Asc.scope.highlightColor = params.highlightColor || "orange";

			let rangeData = await Asc.Editor.callCommand(function(){
				let ws = Api.GetActiveSheet();
				let _range;

				if (!Asc.scope.range) {
					_range = Api.GetSelection();
				} else {
					_range = ws.GetRange(Asc.scope.range);
				}

				if (!_range)
					return null;

				let values = _range.GetValue2();
				let address = _range.Address;
				let startRow = _range.Row;
				let startCol = _range.Col;

				return {
					values: values,
					address: address,
					startRow: startRow,
					startCol: startCol
				};
			});

			if (!rangeData || !rangeData.values) {
				return;
			}

			// Extract all values with their positions for duplicate detection
			let allData = [];
			let values = rangeData.values;
			
			if (Array.isArray(values)) {
				for (let r = 0; r < values.length; r++) {
					let row = values[r];
					if (Array.isArray(row)) {
						for (let c = 0; c < row.length; c++) {
							allData.push({row: r, col: c, value: row[c]});
						}
					} else {
						allData.push({row: r, col: 0, value: row});
					}
				}
			} else {
				allData.push({row: 0, col: 0, value: values});
			}

			if (allData.length === 0) {
				return; // No data to analyze
			}

			let dataValues = allData.map(function(item) { return item.value; });
			
			let argPrompt = "Find duplicate values in this array: [" + dataValues.join(',') + "]\n\n" +
				"Return ONLY a JSON array of indices (0-based) that are duplicates.\n" +
				"Example: if values at positions 0 and 2 are identical, return [0,2]\n" +
				"If no duplicates found, return []\n" +
				"CRITICAL: Response must be ONLY the JSON array, nothing else.\n" +
				"Invalid data formats are not allowed - must be valid JSON array format.\n" +
				"No text, no explanations, no additional formatting - ONLY [1,2,3] format:";

			let requestEngine = AI.Request.create(AI.ActionType.Chat);
			if (!requestEngine)
				return;

			let isSendedEndLongAction = false;
			async function checkEndAction() {
				if (!isSendedEndLongAction) {
					await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
					isSendedEndLongAction = true;
				}
			}

			await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
			await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

			let aiResult = await requestEngine.chatRequest(argPrompt, false, async function(data) {
				if (!data)
					return;
			});

			await checkEndAction();

			if (aiResult) {
				try {
					let duplicates = JSON.parse(aiResult.trim());
					if (Array.isArray(duplicates) && duplicates.length > 0) {
						Asc.scope.duplicates = [];
						Asc.scope.allData = allData;
						
						for (let i = 0; i < duplicates.length; i++) {
							let dataIndex = duplicates[i];
							if (typeof dataIndex === 'number' && dataIndex >= 0 && dataIndex < allData.length) {
								Asc.scope.duplicates.push({
									row: allData[dataIndex].row,
									col: allData[dataIndex].col
								});
							}
						}
						
						if (Asc.scope.duplicates.length > 0) {
							Asc.scope.rangeData = rangeData;

							await Asc.Editor.callCommand(function(){
								let ws = Api.GetActiveSheet();
								let highlightColor;
								
								// Handle different color formats
								if (Asc.scope.highlightColor.startsWith('#')) {
									// Hex color
									let hex = Asc.scope.highlightColor.substring(1);
									let r = parseInt(hex.substring(0, 2), 16);
									let g = parseInt(hex.substring(2, 4), 16);
									let b = parseInt(hex.substring(4, 6), 16);
									highlightColor = Api.CreateColorFromRGB(r, g, b);
								} else {
									// Named color
									highlightColor = Api.CreateColorByName(Asc.scope.highlightColor);
								}

								for (let i = 0; i < Asc.scope.duplicates.length; i++) {
									let duplicate = Asc.scope.duplicates[i];
									let targetRow = Asc.scope.rangeData.startRow + duplicate.row;
									let targetCol = Asc.scope.rangeData.startCol + duplicate.col;
									
									let cell = ws.GetCells(targetRow, targetCol);
									if (cell) {
										cell.SetFillColor(highlightColor);
									}
								}
							});
						}
					}
				} catch (error) {
					// Handle JSON parsing errors or other issues
					console.error("Error parsing duplicate detection result:", error);
				}
			}

			await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
		};

		funcs.push(func);
	}

	if (true) {
		let func = new RegisteredFunction();
		func.name = "fixFormula";
		func.description = "Scans cells for formulas containing errors and attempts to fix them automatically. Detects common formula errors including #DIV/0! (division by zero), #REF! (invalid cell references), #NAME? (unrecognized function names), #VALUE! (wrong value types), and #N/A (value not available). Applies appropriate fixes: wraps division operations in IF statements, corrects cell references, fixes function name typos, and adds IFERROR wrappers. Preserves formulas that have no errors. Can scan entire sheet or specific range.";
		func.params = [
			"range (string, optional): cell range to fix formulas (e.g., 'A1:D10'). If omitted, scans entire sheet"
		];

		func.examples = [
			"To fix formula errors in entire sheet, respond:\n" +
			"[functionCalling (fixFormula)]: {}",

			"To fix formula errors in specific range A1:D10, respond:\n" +
			"[functionCalling (fixFormula)]: {\"range\": \"A1:D10\"}",

			"If you need to find and fix formula errors like #DIV/0!, #REF!, #NAME?, respond:\n" +
			"[functionCalling (fixFormula)]: {}",

			"To scan and correct formula errors in selected range, respond:\n" +
			"[functionCalling (fixFormula)]: {\"range\": \"A1:Z100\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;

			let rangeData = await Asc.Editor.callCommand(function(){
				let ws = Api.GetActiveSheet();
				let _range;

				if (!Asc.scope.range) {
					_range = ws.GetUsedRange();
				} else {
					_range = ws.GetRange(Asc.scope.range);
				}

				if (!_range)
					return null;

				let formulaData = [];
				let startRow = _range.Row;
				let startCol = _range.Col;

				// Use ForEach to iterate through each cell and get formulas
				_range.ForEach(function(cell) {
					let formula = cell.GetFormula();
					if (formula && formula.startsWith('=')) {
						let cellRow = cell.Row - startRow;
						let cellCol = cell.Col - startCol;
						
						formulaData.push({
							row: cellRow,
							col: cellCol,
							formula: formula,
							cellValue: formula,
							address: cell.Address
						});
					}
				});

				return {
					formulas: formulaData,
					startRow: startRow,
					startCol: startCol
				};
			});

			if (!rangeData || !rangeData.formulas || rangeData.formulas.length === 0) {
				return;
			}

			let formulaData = rangeData.formulas;
			let formulaValues = formulaData.map(function(item) { return item.cellValue; });
			
			let argPrompt = "Fix formulas with errors in this array: [" + formulaValues.join(',') + "]\n\n" +
				"Return ONLY a JSON array of fixed formulas.\n" +
				"Fix common errors: #DIV/0! (use IF), #REF! (fix references), #NAME? (fix typos), #VALUE! (fix types), #N/A (use IFERROR)\n" +
				"If formula has no errors, return it unchanged.\n" +
				"Example: input [=A1/B1,=SUM(A:A)] return [=IF(B1<>0,A1/B1,0),=SUM(A:A)]\n" +
				"CRITICAL: Response must be ONLY the JSON array, nothing else.\n" +
				"Invalid data formats are not allowed - must be valid JSON array format.\n" +
				"No text, no explanations, no additional formatting - ONLY [\"=formula1\",\"=formula2\"] format:";

			let requestEngine = AI.Request.create(AI.ActionType.Chat);
			if (!requestEngine)
				return;

			let isSendedEndLongAction = false;
			async function checkEndAction() {
				if (!isSendedEndLongAction) {
					await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
					isSendedEndLongAction = true;
				}
			}

			await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
			await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

			let aiResult = await requestEngine.chatRequest(argPrompt, false, async function(data) {
				if (!data)
					return;
			});

			await checkEndAction();

			if (aiResult) {
				try {
					let fixedFormulas = JSON.parse(aiResult.trim());
					if (Array.isArray(fixedFormulas) && fixedFormulas.length > 0) {
						Asc.scope.fixedFormulas = fixedFormulas;
						Asc.scope.formulaData = formulaData;
						Asc.scope.rangeData = rangeData;
						
						await Asc.Editor.callCommand(function(){
							let ws = Api.GetActiveSheet();
							
							for (let i = 0; i < Asc.scope.fixedFormulas.length && i < Asc.scope.formulaData.length; i++) {
								let fixedFormula = Asc.scope.fixedFormulas[i];
								let originalFormula = Asc.scope.formulaData[i];
								
								if (fixedFormula && originalFormula && typeof fixedFormula === 'string') {
									let targetRow = Asc.scope.rangeData.startRow + originalFormula.row;
									let targetCol = Asc.scope.rangeData.startCol + originalFormula.col;
									
									let cell = ws.GetCells(targetRow, targetCol);
									if (cell) {
										cell.SetValue(fixedFormula);
									}
								}
							}
						});
					}
				} catch (error) {
					console.error("Error parsing formula fix result:", error);
				}
			}

			await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
		};

		funcs.push(func);
	}

	if (true) {
		let func = new RegisteredFunction();
		func.name = "formatTable";
		func.description = "Applies professional table formatting to a data range with consistent styling, colors, and alignment. Features include: automatic or manual color scheme selection (blue, green, orange, gray, red), alternating row colors for readability, optional header row formatting (bold, centered, colored background), table borders, and automatic column width adjustment. Can auto-detect existing formatting to avoid overriding intentional styles. Supports smart content-based text alignment (right-align numbers, left-align text).";
		func.params = [
			"range (string, optional): cell range to format as a table (e.g., 'A1:D10'). If omitted, uses active/selected range or entire sheet if no selection",
			"applyHeaderStyle (boolean, optional): whether to apply bold and center alignment to first row as headers (default: true)",
			"applyBorders (boolean, optional): whether to apply borders to the table (default: true)",
			"colorScheme (string, optional): color scheme to apply ('blue', 'green', 'orange', 'gray', 'red', or 'auto' for dominant color detection, default: 'auto')",
			"detectHeaders (boolean, optional): whether to automatically detect headers based on content (default: true)"
		];

		func.examples = [
			"Format the selected range as a clean, consistent table:\n" +
			"[functionCalling (formatTable)]: {}",

			"Format range A1:E10 as a table with blue color scheme:\n" +
			"[functionCalling (formatTable)]: {\"range\": \"A1:E10\", \"colorScheme\": \"blue\"}",

			"Format current selection as table without header styling:\n" +
			"[functionCalling (formatTable)]: {\"applyHeaderStyle\": false}",

			"Format the entire sheet with green color scheme and borders:\n" +
			"[functionCalling (formatTable)]: {\"colorScheme\": \"green\", \"applyBorders\": true}",

			"Format selected range detecting dominant style automatically:\n" +
			"[functionCalling (formatTable)]: {\"colorScheme\": \"auto\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			Asc.scope.applyHeaderStyle = params.applyHeaderStyle !== false; // default true
			Asc.scope.applyBorders = params.applyBorders !== false; // default true
			Asc.scope.colorScheme = params.colorScheme || 'auto';
			Asc.scope.detectHeaders = params.detectHeaders !== false; // default true

			await Asc.Editor.callMethod("StartAction", ["GroupActions", "Format table"]);

			await Asc.Editor.callCommand(function(){
				let ws = Api.GetActiveSheet();
				let _range;

				if (!Asc.scope.range) {
					_range = Api.GetSelection();
					// If no selection, use the used range of the sheet
					if (!_range || (_range.GetRowsCount() === 1 && _range.GetColumnsCount() === 1)) {
						_range = ws.GetUsedRange();
					}
				} else {
					_range = ws.GetRange(Asc.scope.range);
				}

				if (!_range)
					return;

			
				let rowsCount = _range.GetRowsCount();
				let colsCount = _range.GetColumnsCount();

				// Color schemes definition
				let colorSchemes = {
					blue: { header: '#4472C4', alternate1: '#D9E2F3', alternate2: '#FFFFFF', text: '#000000' },
					green: { header: '#70AD47', alternate1: '#E2EFDA', alternate2: '#FFFFFF', text: '#000000' },
					orange: { header: '#C65911', alternate1: '#FCE4D6', alternate2: '#FFFFFF', text: '#000000' },
					gray: { header: '#7B7B7B', alternate1: '#F2F2F2', alternate2: '#FFFFFF', text: '#000000' },
					red: { header: '#C5504B', alternate1: '#F2DCDB', alternate2: '#FFFFFF', text: '#000000' }
				};

				let selectedScheme = colorSchemes.blue; // default

				// Auto-detect dominant color if requested
				if (Asc.scope.colorScheme === 'auto') {
					// Sample some cells to detect dominant colors
					let colorCounts = {};
					let sampleSize = Math.min(10, rowsCount * colsCount);
					
					for (let i = 0; i < Math.min(5, rowsCount); i++) {
						for (let j = 0; j < Math.min(5, colsCount); j++) {
							let cell = _range.GetRows(i).GetCells(j);
							try {
								let fill = cell.GetFillColor();
								if (fill) {
									let colorStr = fill.GetHexColor();
									if (colorStr && colorStr !== '#FFFFFF' && colorStr !== '#000000') {
										colorCounts[colorStr] = (colorCounts[colorStr] || 0) + 1;
									}
								}
							} catch(e) {
								// Ignore errors in color detection
							}
						}
					}

					// Find most common color and match to scheme
					let dominantColor = null;
					let maxCount = 0;
					for (let color in colorCounts) {
						if (colorCounts[color] > maxCount) {
							maxCount = colorCounts[color];
							dominantColor = color;
						}
					}

					// Map dominant color to closest scheme
					if (dominantColor) {
						let colorLower = dominantColor.toLowerCase();
						if (colorLower.includes('4472c4') || colorLower.includes('blue')) {
							selectedScheme = colorSchemes.blue;
						} else if (colorLower.includes('70ad47') || colorLower.includes('green')) {
							selectedScheme = colorSchemes.green;
						} else if (colorLower.includes('c65911') || colorLower.includes('orange')) {
							selectedScheme = colorSchemes.orange;
						} else if (colorLower.includes('c5504b') || colorLower.includes('red')) {
							selectedScheme = colorSchemes.red;
						} else {
							selectedScheme = colorSchemes.gray;
						}
					}
				} else if (colorSchemes[Asc.scope.colorScheme]) {
					selectedScheme = colorSchemes[Asc.scope.colorScheme];
				}

				// Apply header formatting if requested
				if (Asc.scope.applyHeaderStyle && rowsCount > 0) {
					let headerRow = _range.GetRows(0);
					
					// Check if headers are already formatted (to avoid overriding intentional formatting)
					let shouldFormatHeaders = true;
					if (Asc.scope.detectHeaders) {
						// Simple header detection: check if first row looks different or contains text while others contain numbers
						try {
							let firstCell = headerRow.GetCells(0);
							let isBold = firstCell.GetBold();
							if (isBold) {
								shouldFormatHeaders = false; // Already formatted
							}
						} catch(e) {
							// Continue with formatting
						}
					}

					if (shouldFormatHeaders) {
						// Format header row
						headerRow.SetBold(true);
						headerRow.SetAlignHorizontal('center');
						headerRow.SetAlignVertical('center');
						
						// Apply header color
						let headerColor = Api.CreateColorFromRGB(
							parseInt(selectedScheme.header.substring(1, 3), 16),
							parseInt(selectedScheme.header.substring(3, 5), 16),
							parseInt(selectedScheme.header.substring(5, 7), 16)
						);
						headerRow.SetFillColor(headerColor);
						
						// Set header text color to white for better contrast
						let headerTextColor = Api.CreateColorFromRGB(255, 255, 255);
						headerRow.SetFontColor(headerTextColor);
					}
				}

				// Apply alternating row colors for data rows
				let startRow = Asc.scope.applyHeaderStyle ? 1 : 0;
				for (let i = startRow; i < rowsCount; i++) {
					let row = _range.GetRows(i);
					let isEvenRow = ((i - startRow) % 2) === 0;
					
					let bgColorHex = isEvenRow ? selectedScheme.alternate1 : selectedScheme.alternate2;
					let bgColor = Api.CreateColorFromRGB(
						parseInt(bgColorHex.substring(1, 3), 16),
						parseInt(bgColorHex.substring(3, 5), 16),
						parseInt(bgColorHex.substring(5, 7), 16)
					);
					row.SetFillColor(bgColor);

					// Set consistent text color
					let textColor = Api.CreateColorFromRGB(
						parseInt(selectedScheme.text.substring(1, 3), 16),
						parseInt(selectedScheme.text.substring(3, 5), 16),
						parseInt(selectedScheme.text.substring(5, 7), 16)
					);
					row.SetFontColor(textColor);

					// Apply consistent text alignment for data
					for (let j = 0; j < colsCount; j++) {
						let cell = row.GetCells(j);
						try {
							let value = cell.GetValue();
							// Auto-align based on content type
							if (typeof value === 'number' || (typeof value === 'string' && !isNaN(parseFloat(value)) && isFinite(value))) {
								cell.SetAlignHorizontal('right');
							} else {
								cell.SetAlignHorizontal('left');
							}
							cell.SetAlignVertical('center');
						} catch(e) {
							// Default alignment if detection fails
							cell.SetAlignHorizontal('left');
							cell.SetAlignVertical('center');
						}
					}
				}

				// Apply borders if requested
				if (Asc.scope.applyBorders) {
					// Set border style
					let borderStyle = 'thin';
					let borderColor = Api.CreateColorFromRGB(128, 128, 128); // Gray border

					// Apply borders to the entire range
					for (let i = 0; i < rowsCount; i++) {
						for (let j = 0; j < colsCount; j++) {
							let cell = _range.GetRows(i).GetCells(j);
							
							// Top border
							if (i === 0) {
								cell.SetBorders('top', borderStyle, borderColor);
							}
							// Bottom border  
							if (i === rowsCount - 1) {
								cell.SetBorders('bottom', borderStyle, borderColor);
							}
							// Left border
							if (j === 0) {
								cell.SetBorders('left', borderStyle, borderColor);
							}
							// Right border
							if (j === colsCount - 1) {
								cell.SetBorders('right', borderStyle, borderColor);
							}
							
							// Inner horizontal borders
							if (i > 0) {
								cell.SetBorders('top', borderStyle, borderColor);
							}
							// Inner vertical borders  
							if (j > 0) {
								cell.SetBorders('left', borderStyle, borderColor);
							}
						}
					}
				}

				// Auto-fit column widths for better appearance
				try {
					for (let j = 0; j < colsCount; j++) {
						let col = _range.GetCols(j);
						col.AutoFit();
					}
				} catch(e) {
					// Auto-fit may not be available in all contexts
				}
			});

			await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
		};

		funcs.push(func);
	}

	if (true) {
		let func = new RegisteredFunction();
		func.name = "addConditionalFormatting";
		func.description = "Use this function when user asks for conditional formatting without specifying the exact type. This applies the most commonly used conditional formatting rule - highlighting cells based on values greater than a threshold with color background. Perfect for general requests like 'add conditional formatting', 'highlight important data', or 'format cells conditionally'.";
		func.params = [
			"range (string, optional): cell range to apply formatting (e.g., 'A1:D10'). If omitted, uses active/selected range",
			"threshold (number, optional): value threshold for highlighting (default: calculated from data)",
			"fillColor (object, optional): background color {r: 255, g: 200, b: 200} (default: light red)"
		];

		func.examples = [
			"Apply default conditional formatting to current selection:" +
			"[functionCalling (addConditionalFormatting)]: {}",

			"Apply conditional formatting with custom threshold:" +
			"[functionCalling (addConditionalFormatting)]: {\"threshold\": 100}",

			"When user asks to add conditional formatting without specifics:" +
			"[functionCalling (addConditionalFormatting)]: {\"range\": \"[specific_range_if_provided]\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			Asc.scope.threshold = params.threshold;
			Asc.scope.fillColor = params.fillColor || {r: 255, g: 200, b: 200};

			await Asc.Editor.callCommand(function() {
				let ws = Api.GetActiveSheet();
				let range;
				if (Asc.scope.range) {
					range = ws.GetRange(Asc.scope.range);
				} else {
					range = ws.Selection;
				}
				
				let threshold = Asc.scope.threshold;
				if (!threshold) {
					let values = range.GetValue2();
					let numericValues = [];
					for (let i = 0; i < values.length; i++) {
						for (let j = 0; j < values[i].length; j++) {
							let val = parseFloat(values[i][j]);
							if (!isNaN(val)) {
								numericValues.push(val);
							}
						}
					}
					if (numericValues.length > 0) {
						numericValues.sort((a, b) => a - b);
						threshold = numericValues[Math.floor(numericValues.length * 0.7)];
					} else {
						threshold = 0;
					}
				}
				
				let formatConditions = range.GetFormatConditions();
				let condition = formatConditions.Add("xlCellValue", "xlGreater", threshold);
				
				if (condition) {
					let color = Asc.scope.fillColor ? 
						Api.CreateColorFromRGB(Asc.scope.fillColor.r, Asc.scope.fillColor.g, Asc.scope.fillColor.b) :
						Api.CreateColorFromRGB(255, 200, 200);
					condition.SetFillColor(color);
				}
			});
		};

		funcs.push(func);
	}

	if (true) {
		let func = new RegisteredFunction();
		func.name = "addColorScale";
		func.description = "Applies color scale conditional formatting to visualize data with gradient colors. Creates a heat map effect where values are represented by colors ranging from one color (minimum values) to another color (maximum values). Use 2-color scale for simple comparisons or 3-color scale for more detailed data visualization.";
		func.params = [
			"range (string, optional): cell range to apply color scale (e.g., 'A1:D10'). If omitted, uses active/selected range",
			"colorScaleType (number, optional): color scale type - 2 for two-color scale, 3 for three-color scale (default: 3)"
		];

		func.examples = [
			"Apply 3-color scale conditional formatting to current selection:" +
			"[functionCalling (addColorScale)]: {}",

			"Apply 2-color scale conditional formatting to range A1:D10:" +
			"[functionCalling (addColorScale)]: {\"range\": \"A1:D10\", \"colorScaleType\": 2}",

			"When user asks to add color scale, color gradient, heat map formatting:" +
			"[functionCalling (addColorScale)]: {\"range\": \"[specific_range_if_provided]\", \"colorScaleType\": 3}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			Asc.scope.colorScaleType = params.colorScaleType || 3;

			await Asc.Editor.callCommand(function() {
				let ws = Api.GetActiveSheet();
				let range;
				if (Asc.scope.range) {
					range = ws.GetRange(Asc.scope.range);
				} else {
					range = ws.Selection;
				}
				
				let formatConditions = range.GetFormatConditions();
				formatConditions.AddColorScale(Asc.scope.colorScaleType);
			});
		};

		funcs.push(func);
	}

	if (true) {
		let func = new RegisteredFunction();
		func.name = "addDataBars";
		func.description = "Adds data bar conditional formatting to display values as horizontal bars within cells. The length of each bar represents the value relative to other values in the range. Useful for creating in-cell bar charts and comparing values at a glance without additional charts.";
		func.params = [
			"range (string, optional): cell range to apply data bars (e.g., 'A1:D10'). If omitted, uses active/selected range",
			"barColor (object, optional): color of the data bars {r: 0, g: 112, b: 192} (default: blue)",
			"showValue (boolean, optional): whether to show the cell values along with bars (default: true)",
			"direction (string, optional): direction of bars - 'leftToRight', 'rightToLeft' (default: 'leftToRight')"
		];

		func.examples = [
			"Apply data bars conditional formatting to current selection:" +
			"[functionCalling (addDataBars)]: {}",

			"Apply data bars with custom color to range A1:D10:" +
			"[functionCalling (addDataBars)]: {\"range\": \"A1:D10\", \"barColor\": {\"r\": 255, \"g\": 0, \"b\": 0}}",

			"When user asks to add data bars, bar chart formatting, progress bars:" +
			"[functionCalling (addDataBars)]: {\"range\": \"[specific_range_if_provided]\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			Asc.scope.barColor = params.barColor;
			Asc.scope.showValue = params.showValue;
			Asc.scope.direction = params.direction;

			await Asc.Editor.callCommand(function() {
				let ws = Api.GetActiveSheet();
				let range;
				if (Asc.scope.range) {
					range = ws.GetRange(Asc.scope.range);
				} else {
					range = ws.Selection;
				}
				
				let formatConditions = range.GetFormatConditions();
				let databar = formatConditions.AddDatabar();
				
				if (databar) {
					if (Asc.scope.barColor) {
						let barColor = Api.CreateColorFromRGB(Asc.scope.barColor.r, Asc.scope.barColor.g, Asc.scope.barColor.b);
						databar.SetBarColor(barColor);
					} else {
						let defaultBarColor = Api.CreateColorFromRGB(70, 130, 180);
						databar.SetBarColor(defaultBarColor);
					}
					
					if (typeof Asc.scope.showValue === "boolean") {
						databar.SetShowValue(Asc.scope.showValue);
					}
					
					if (Asc.scope.direction) {
						databar.SetDirection(Asc.scope.direction);
					}
				}
			});
		};

		funcs.push(func);
	}

	if (true) {
		let func = new RegisteredFunction();
		func.name = "addIconSet";
		func.description = "Applies icon set conditional formatting to display icons (arrows, traffic lights, symbols) based on value ranges. Icons provide visual indicators for data trends and performance levels. Each icon represents a different value range, making it easy to identify patterns and outliers in your data.";
		func.params = [
			"range (string, optional): cell range to apply icon set (e.g., 'A1:D10'). If omitted, uses active/selected range",
			"iconSetType (string, optional): type of icon set - 'threeArrows', 'threeTrafficLights', 'fourArrows', 'fiveArrows', etc. (default: 'threeArrows')",
			"showIconOnly (boolean, optional): whether to show only icons without cell values (default: false)",
			"reverseOrder (boolean, optional): whether to reverse the icon order (default: false)"
		];

		func.examples = [
			"Apply icon set conditional formatting to current selection:" +
			"[functionCalling (addIconSet)]: {}",

			"Apply traffic lights icon set to range A1:D10:" +
			"[functionCalling (addIconSet)]: {\"range\": \"A1:D10\", \"iconSetType\": \"threeTrafficLights\"}",

			"When user asks to add icon set, arrow icons, traffic lights, symbols formatting:" +
			"[functionCalling (addIconSet)]: {\"range\": \"[specific_range_if_provided]\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			Asc.scope.iconSetType = params.iconSetType;
			Asc.scope.showIconOnly = params.showIconOnly;
			Asc.scope.reverseOrder = params.reverseOrder;

			await Asc.Editor.callCommand(function() {
				let ws = Api.GetActiveSheet();
				let range;
				if (Asc.scope.range) {
					range = ws.GetRange(Asc.scope.range);
				} else {
					range = ws.GetSelection();
				}
				
				if (!range) {
					return;
				}

				let formatConditions = range.GetFormatConditions();
				let iconSet = formatConditions.AddIconSetCondition();
				
				if (iconSet) {
					if (Asc.scope.iconSetType) {
						iconSet.SetIconSet(Asc.scope.iconSetType);
					}
					
					if (typeof Asc.scope.showIconOnly === "boolean") {
						iconSet.SetShowIconOnly(Asc.scope.showIconOnly);
					}
					
					if (typeof Asc.scope.reverseOrder === "boolean") {
						iconSet.SetReverseOrder(Asc.scope.reverseOrder);
					}
				}
			});
		};

		funcs.push(func);
	}

	if (true) {
		let func = new RegisteredFunction();
		func.name = "addCellValueCondition";
		func.description = "Creates conditional formatting rules based on cell values using comparison operators (greater than, less than, equal to, between, etc.). This is the most flexible conditional formatting option, allowing you to highlight cells that meet specific criteria with custom colors for background and text.";
		func.params = [
			"range (string, optional): cell range to apply condition (e.g., 'A1:D10'). If omitted, uses active/selected range",
			"operator (string): comparison operator - 'xlGreater', 'xlLess', 'xlEqual', 'xlNotEqual', 'xlGreaterEqual', 'xlLessEqual', 'xlBetween', 'xlNotBetween'",
			"value1 (string|number): first comparison value or formula",
			"value2 (string|number, optional): second comparison value for 'xlBetween' and 'xlNotBetween' operators",
			"fillColor (object, optional): background color {r: 255, g: 0, b: 0}",
			"fontColor (object, optional): font color {r: 0, g: 0, b: 0}"
		];

		func.examples = [
			"Highlight cells greater than 10 with red background:" +
			"[functionCalling (addCellValueCondition)]: {\"operator\": \"xlGreater\", \"value1\": 10, \"fillColor\": {\"r\": 255, \"g\": 0, \"b\": 0}}",

			"Highlight cells between 5 and 15 with yellow background:" +
			"[functionCalling (addCellValueCondition)]: {\"range\": \"A1:D10\", \"operator\": \"xlBetween\", \"value1\": 5, \"value2\": 15, \"fillColor\": {\"r\": 255, \"g\": 255, \"b\": 0}}",

			"When user asks to highlight cells based on values (greater than, less than, equal to):" +
			"[functionCalling (addCellValueCondition)]: {\"range\": \"[range_if_provided]\", \"operator\": \"[xl_operator]\", \"value1\": \"[comparison_value]\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			Asc.scope.operator = params.operator;
			Asc.scope.value1 = params.value1;
			Asc.scope.value2 = params.value2;
			Asc.scope.fillColor = params.fillColor;
			Asc.scope.fontColor = params.fontColor;

			await Asc.Editor.callCommand(function() {
				let ws = Api.GetActiveSheet();
				let range;
				if (Asc.scope.range) {
					range = ws.GetRange(Asc.scope.range);
				} else {
					range = ws.Selection;
				}
				
				let formatConditions = range.GetFormatConditions();
				let condition = formatConditions.Add("xlCellValue", Asc.scope.operator, Asc.scope.value1, Asc.scope.value2);
				
				if (condition) {
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
				}
			});
		};

		funcs.push(func);
	}

	if (true) {
		let func = new RegisteredFunction();
		func.name = "addTop10Condition";
		func.description = "Highlights the top or bottom ranked values in a range. You can choose to highlight by item count (e.g., top 10 values) or by percentage (e.g., top 20% of values). Perfect for identifying highest performers, outliers, or values that need attention in your dataset.";
		func.params = [
			"range (string, optional): cell range to apply condition (e.g., 'A1:D10'). If omitted, uses active/selected range",
			"rank (number, optional): number of top/bottom items to highlight (default: 10)",
			"isBottom (boolean, optional): true for bottom values, false for top values (default: false)",
			"isPercent (boolean, optional): true for percentage, false for item count (default: false)",
			"fillColor (object, optional): background color {r: 255, g: 0, b: 0}"
		];

		func.examples = [
			"Highlight top 10 values with green background:" +
			"[functionCalling (addTop10Condition)]: {\"fillColor\": {\"r\": 0, \"g\": 255, \"b\": 0}}",

			"Highlight bottom 5 values with red background:" +
			"[functionCalling (addTop10Condition)]: {\"rank\": 5, \"isBottom\": true, \"fillColor\": {\"r\": 255, \"g\": 0, \"b\": 0}}",

			"When user asks to highlight top/bottom values, highest/lowest cells:" +
			"[functionCalling (addTop10Condition)]: {\"rank\": \"[number_from_request]\", \"isBottom\": \"[true_if_bottom_requested]\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			Asc.scope.rank = params.rank || 10;
			Asc.scope.isBottom = params.isBottom || false;
			Asc.scope.isPercent = params.isPercent || false;
			Asc.scope.fillColor = params.fillColor;

			await Asc.Editor.callCommand(function() {
				let ws = Api.GetActiveSheet();
				let range;
				if (Asc.scope.range) {
					range = ws.GetRange(Asc.scope.range);
				} else {
					range = ws.Selection;
				}
				
				let formatConditions = range.GetFormatConditions();
				let condition = formatConditions.AddTop10();
				
				if (condition) {
					if (condition.SetRank) {
						condition.SetRank(Asc.scope.rank);
					}
					if (condition.SetBottom) {
						condition.SetBottom(Asc.scope.isBottom);
					}
					if (condition.SetPercent) {
						condition.SetPercent(Asc.scope.isPercent);
					}
					
					if (Asc.scope.fillColor) {
						let fillColor = Api.CreateColorFromRGB(Asc.scope.fillColor.r, Asc.scope.fillColor.g, Asc.scope.fillColor.b);
						condition.SetFillColor(fillColor);
					} else {
						let defaultFillColor = Api.CreateColorFromRGB(144, 238, 144);
						condition.SetFillColor(defaultFillColor);
					}
				}
			});
		};

		funcs.push(func);
	}

	if (true) {
		let func = new RegisteredFunction();
		func.name = "addAboveAverage";
		func.description = "Highlights cells that contain values above or below the average of all values in the range. This is useful for identifying data points that deviate significantly from the typical values in your dataset.";
		func.params = [
			"range (string, optional): cell range to apply condition (e.g., 'A1:D10'). If omitted, uses active/selected range",
			"aboveBelow (boolean, optional): true for above average, false for below average (default: true)",
			"numStdDev (number, optional): number of standard deviations from average (default: 0 for simple average)",
			"fillColor (object, optional): background color {r: 255, g: 0, b: 0}"
		];

		func.examples = [
			"Highlight cells above average with default color:" +
			"[functionCalling (addAboveAverage)]: {}",

			"Highlight cells below average with red background:" +
			"[functionCalling (addAboveAverage)]: {\"aboveBelow\": false, \"fillColor\": {\"r\": 255, \"g\": 0, \"b\": 0}}",

			"When user asks to highlight above/below average values:" +
			"[functionCalling (addAboveAverage)]: {\"aboveBelow\": \"[true_for_above_false_for_below]\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			Asc.scope.aboveBelow = params.aboveBelow !== false; // default true
			Asc.scope.numStdDev = params.numStdDev || 0;
			Asc.scope.fillColor = params.fillColor;

			await Asc.Editor.callCommand(function() {
				let ws = Api.GetActiveSheet();
				let range;
				if (Asc.scope.range) {
					range = ws.GetRange(Asc.scope.range);
				} else {
					range = ws.GetSelection();
				}

				if (!range) {
					return;
				}

				let formatConditions = range.GetFormatConditions();
				let condition = formatConditions.AddAboveAverage();
				
				if (condition) {
					condition.SetAboveBelow(Asc.scope.aboveBelow);
					
					if (Asc.scope.numStdDev !== 0) {
						condition.SetNumStdDev(Asc.scope.numStdDev);
					}
					
					if (Asc.scope.fillColor) {
						let fillColor = Api.CreateColorFromRGB(Asc.scope.fillColor.r, Asc.scope.fillColor.g, Asc.scope.fillColor.b);
						condition.SetFillColor(fillColor);
					} else {
						let defaultFillColor = Api.CreateColorFromRGB(255, 165, 0);
						condition.SetFillColor(defaultFillColor);
					}
				}
			});
		};

		funcs.push(func);
	}

	if (true) {
		let func = new RegisteredFunction();
		func.name = "addUniqueValues";
		func.description = "Highlights unique values or duplicate values in a range. Use this to identify data that appears only once (unique) or multiple times (duplicates) within the specified range. Perfect for data validation and cleanup tasks.";
		func.params = [
			"range (string, optional): cell range to apply condition (e.g., 'A1:D10'). If omitted, uses active/selected range",
			"duplicateUnique (string, optional): 'unique' to highlight unique values, 'duplicate' to highlight duplicates (default: 'duplicate')",
			"fillColor (object, optional): background color {r: 255, g: 255, b: 0}"
		];

		func.examples = [
			"Highlight duplicate values with default color:" +
			"[functionCalling (addUniqueValues)]: {}",

			"Highlight unique values with yellow background:" +
			"[functionCalling (addUniqueValues)]: {\"duplicateUnique\": \"unique\", \"fillColor\": {\"r\": 255, \"g\": 255, \"b\": 0}}",

			"When user asks to highlight duplicate or unique values:" +
			"[functionCalling (addUniqueValues)]: {\"duplicateUnique\": \"[unique_or_duplicate]\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;
			Asc.scope.duplicateUnique = params.duplicateUnique || 'duplicate';
			Asc.scope.fillColor = params.fillColor;

			await Asc.Editor.callCommand(function() {
				let ws = Api.GetActiveSheet();
				let range;
				if (Asc.scope.range) {
					range = ws.GetRange(Asc.scope.range);
				} else {
					range = ws.Selection;
				}
				
				let formatConditions = range.GetFormatConditions();
				let condition = formatConditions.AddUniqueValues();

				if (condition) {
					if (Asc.scope.duplicateUnique === 'unique') {
						condition.SetDupeUnique("xlUnique");
					} else {
						condition.SetDupeUnique("xlDuplicate");
					}
					
					if (Asc.scope.fillColor) {
						let fillColor = Api.CreateColorFromRGB(Asc.scope.fillColor.r, Asc.scope.fillColor.g, Asc.scope.fillColor.b);
						condition.SetFillColor(fillColor);
					} else {
						let defaultFillColor = Api.CreateColorFromRGB(255, 192, 203);
						condition.SetFillColor(defaultFillColor);
					}
				}
			});
		};

		funcs.push(func);
	}

	if (true) {
		let func = new RegisteredFunction();
		func.name = "clearConditionalFormatting";
		func.description = "Removes all conditional formatting rules from the specified range or current selection. This function cleans up all existing conditional formatting including color scales, data bars, icon sets, and highlight cell rules, returning cells to their default appearance.";
		func.params = [
			"range (string, optional): cell range to clear formatting (e.g., 'A1:D10'). If omitted, uses active/selected range"
		];

		func.examples = [
			"Clear all conditional formatting from current selection:" +
			"[functionCalling (clearConditionalFormatting)]: {}",

			"Clear conditional formatting from range A1:D10:" +
			"[functionCalling (clearConditionalFormatting)]: {\"range\": \"A1:D10\"}",

			"When user asks to remove, delete, clear conditional formatting:" +
			"[functionCalling (clearConditionalFormatting)]: {\"range\": \"[specific_range_if_provided]\"}"
		];

		func.call = async function(params) {
			Asc.scope.range = params.range;

			await Asc.Editor.callCommand(function() {
				let ws = Api.GetActiveSheet();
				let range;
				if (Asc.scope.range) {
					range = ws.GetRange(Asc.scope.range);
				} else {
					range = ws.Selection;
				}
				
				let formatConditions = range.GetFormatConditions();
				formatConditions.Delete();
			});
		};

		funcs.push(func);
	}

	return funcs;
}
