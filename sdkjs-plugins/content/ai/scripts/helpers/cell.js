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
		func.params = [];

		func.examples = [
			"to create a pivot table from current selection:\n" +
			"[functionCalling (insertPivotTable)]: {}"
		];

		/**
		 * Inserts a pivot table based on the current selection
		 */
		func.call = async function() {;
			//insert pivot table
			let insertRes = await Asc.Editor.callCommand(function(){
				let pivotTable = Api.InsertPivotNewWorksheet();

				return [pivotTable.Source.GetValue2(), pivotTable.GetParent().Name, pivotTable.TableRange1.Address];
			});
			//make csv from source data
			let parText = insertRes[0].map(function(item){
				return item.join('\t');
			}).join('\n');
			let sheetName = insertRes[1];
			let address = insertRes[2];
			//make csv from source data
			let argPromt = "return 2 column indexes in format '{number,number}' first number - recomended index for pivot row, second number - recomended index for pivot data:\n" + parText;

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
			
			Asc.scope.address = address;
			Asc.scope.sheetName = sheetName;
			Asc.scope.match = result.match(/\{(\d+),(\d+)\}/);
			await Asc.Editor.callCommand(function(){
				let ws = Api.GetSheet(Asc.scope.sheetName);
				if(!ws) {
					return;
				}
				let range = ws.GetRange(Asc.scope.address);
				let pivotTable = range.PivotTable
				if(pivotTable && Asc.scope.match.length>2){
					let pivotFields = pivotTable.GetPivotFields();
					let rowIndex = parseInt(Asc.scope.match[1]);
					let dataIndex = parseInt(Asc.scope.match[2]);
					
					let rowName = rowIndex < pivotFields.length ? pivotFields[rowIndex].GetName() : "";
					let dataName = dataIndex < pivotFields.length ? pivotFields[dataIndex].GetName() : "";
					if(rowName){
						pivotTable.AddFields({
							rows: rowName
						});
					}
					if(dataName)
					{
						pivotTable.AddDataField(dataName);
					}
				}
			});
		};

		funcs.push(func);
	}

	return funcs;
	
}