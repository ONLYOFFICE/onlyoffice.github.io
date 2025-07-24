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

		func.call = async function(params) {;
			Asc.scope.range = params.range;
			const columns = params.columns || [];
			const valueColumn = params.valueColumn || "";
			Asc.scope.rowCountToLookup = 20;
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
				let pivotTable;
				if (Asc.scope.range) {
					let ws = Api.GetActiveSheet();
					let range = ws.GetRange(Asc.scope.range);
					pivotTable = Api.InsertPivotNewWorksheet(range);
				} else {
					pivotTable = Api.InsertPivotNewWorksheet();
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
				"1. Choose 1–2 column indices for pivot rows (categorical/grouping).",
				"   For ANY chosen row field (preferences, not hard requirements):",
				"   a) Contain textual (non-numeric) data.",
				"   b) Prefer columns with at least 2 distinct values.",
				"   c) Prefer columns that have at least one repeated value (i.e., not all values are unique and not all identical).",
				"   If no column fully satisfies these preferences, pick the best available textual option.",
				"2. Mandatory grouping columns: " + columns.join(', ') + " (comma-separated header names).",
				"   - Use approximate (fuzzy) matching against header cells: case-insensitive, ignore spaces/punctuation.",
				"   - If multiple headers match the same required name, pick the one with the highest similarity (tie-breaker: lowest index).",
				"3. Choose exactly 1 column index for pivot values (numeric/aggregate). Prefer a numeric column; otherwise pick one that can be meaningfully aggregated.",
				"3. Mandatory value column (combined with selection of the data index): " + valueColumn + " (single header name, can be empty).",
				"   - Use the same fuzzy matching rules (case-insensitive, ignore spaces/punctuation).",
				"   - If found, use its index as the ONLY pivot value column.",
				"   - Fallback: If no acceptable match is found, choose the best available numeric column (or the most aggregatable one) as the value column.",
				"   - If a fallback is used, still follow all output rules (numbers only, correct braces).",
				"4. Ordering rule: Within the rows list and within the columns list, place indices in descending order of “grouping potential” (more suitable for grouping first). Use ascending numeric order only to break ties.",
				"   Definition of “grouping potential”: medium-to-high cardinality (not all identical, not all unique), well-distributed categories, likely to produce useful pivot groups.",
				"5. The answer MUST start with '{' and end with '}'. Missing braces = invalid.",
				"6. No extra text, spaces, or newlines.",
				"7. Output ONLY numbers, no labels like 'rows:' or 'data:'.",
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
					isSendedEndLongAction = true
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


   if (true)
    {
        let func = new RegisteredFunction();
        func.name = "setAutoFilter";
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

                let parText = insertRes.map(function(item){
                    return item.join('\t');
                }).join('\n');

                let argPromt = "Find column index for header '" + Asc.scope.fieldName + "' in the following data. Return only the column number (starting from 1) that matches the header name:\n" + parText;

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
        func.params = [
            "range (string, optional): cell range to sort (e.g., 'A1:D10'). If omitted, uses active/selected range",
            "key1 (string|ApiRange, optional): first sort field - range or named range reference",
            "sortOrder1 (string, optional): sort order for key1 - 'xlAscending' or 'xlDescending' (default: 'xlAscending')",
            "key2 (string|ApiRange, optional): second sort field - range or named range reference",
            "sortOrder2 (string, optional): sort order for key2 - 'xlAscending' or 'xlDescending'",
            "header (string, optional): specifies if first row contains headers - 'xlYes' or 'xlNo' (default: 'xlNo')",
            "orientation (string, optional): sort orientation - 'xlSortColumns' (by rows) or 'xlSortRows' (by columns) (default: 'xlSortColumns')"
        ];

        func.examples = [
            "To sort range A1:D10 by first column in ascending order, respond:" +
            "[functionCalling (setSort)]: {\"range\": \"A1:D10\", \"key1\": \"A1\", \"sortOrder1\": \"xlAscending\"}",

            "To sort active range by first column with headers, respond:" +
            "[functionCalling (setSort)]: {\"key1\": \"A1\", \"header\": \"xlYes\"}",

            "To sort range by multiple columns (first ascending, second descending), respond:" +
            "[functionCalling (setSort)]: {\"range\": \"A1:D10\", \"key1\": \"A1\", \"sortOrder1\": \"xlAscending\", \"key2\": \"B1\", \"sortOrder2\": \"xlDescending\"}",

            "To sort range by three columns, respond:" +
            "[functionCalling (setSort)]: {\"range\": \"A1:D10\", \"key1\": \"A1\", \"sortOrder1\": \"xlAscending\", \"key2\": \"B1\", \"sortOrder2\": \"xlDescending\", \"key3\": \"C1\", \"sortOrder3\": \"xlAscending\"}",

            "To sort range by rows instead of columns, respond:" +
            "[functionCalling (setSort)]: {\"range\": \"A1:D10\", \"key1\": \"A1\", \"orientation\": \"xlSortRows\"}",

            "To sort range with headers by second column descending, respond:" +
            "[functionCalling (setSort)]: {\"range\": \"A1:D10\", \"key1\": \"B1\", \"sortOrder1\": \"xlDescending\", \"header\": \"xlYes\"}",

            "To sort active range by named range key, respond:" +
            "[functionCalling (setSort)]: {\"key1\": \"MyRange\", \"sortOrder1\": \"xlAscending\"}"
        ];

        func.call = async function(params) {
            Asc.scope.range = params.range;
            Asc.scope.key1 = params.key1;
            Asc.scope.sortOrder1 = params.sortOrder1 || "xlAscending";
            Asc.scope.key2 = params.key2;
            Asc.scope.sortOrder2 = params.sortOrder2;
            Asc.scope.key3 = params.key3;
            Asc.scope.sortOrder3 = params.sortOrder3;
            Asc.scope.header = params.header || "xlNo";
            Asc.scope.orientation = params.orientation || "xlSortColumns";

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
                    if (Asc.scope.orientation === "xlSortRows") {
                        range.SetOffset(0, 1);
                    } else {
                        range.SetOffset(1, 0);
                    }
                }

                let key1 = null, key2 = null, key3 = null;

                function adjustSortKey(keyValue) {
                    if (!keyValue) return null;

                    if (typeof keyValue === 'string') {
                        try {
                            let keyRange = ws.GetRange(keyValue);
                            if (keyRange && Asc.scope.header === "xlYes") {
                                if (Asc.scope.orientation === "xlSortRows") {
                                    keyRange.SetOffset(0, 1);
                                } else {
                                    keyRange.SetOffset(1, 0);
                                }
                                return keyRange;
                            }
                            return keyRange || keyValue;
                        } catch {
                            return keyValue;
                        }
                    } else {
                        if (keyValue && Asc.scope.header === "xlYes") {
                            if (Asc.scope.orientation === "xlSortRows") {
                                keyValue.SetOffset(0, 1);
                            } else {
                                keyValue.SetOffset(1, 0);
                            }
                        }
                        return keyValue;
                    }
                }

                key1 = adjustSortKey(Asc.scope.key1);
                key2 = adjustSortKey(Asc.scope.key2);
                key3 = adjustSortKey(Asc.scope.key3);

                range.SetSort(
                    key1,
                    Asc.scope.sortOrder1,
                    key2,
                    Asc.scope.sortOrder2,
                    key3,
                    Asc.scope.sortOrder3,
                    Asc.scope.header,
                    Asc.scope.orientation
                );
            });
        };

        funcs.push(func);
    }

    return funcs;
}
