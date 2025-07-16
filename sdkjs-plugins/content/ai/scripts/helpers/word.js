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

function getWordFunctions() {

	let funcs = [];
	if (true) 
	{
		let func = new RegisteredFunction();
		func.name = "changeParagraph";
		func.params = [
			"parNumber (number): the paragraph number to change",
			"prompt (string): instructions on how to change the text"
		];

		func.examples = [
			"if you need to change paragraph 2 to be more emotional, respond with:\n" +
			"[functionCalling (changeParagraph)]: {\"parNumber\": 2, \"prompt\": \"make the text more emotional\"}"
		];
		
		func.call = async function(params) {
			Asc.scope.parNum = params.parNumber;
			let parText = await Asc.Editor.callCommand(function(){
				let doc = Api.GetDocument();
				let par = doc.GetElement(Asc.scope.parNum - 1);
				if (!par)
					return "";
				par.Select();
				return par.GetText();
			});

			let argPromt = params.prompt + ":\n" + parText;

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
			let result = await requestEngine.chatRequest(argPromt, false, async function(data) {
				if (!data)
					return;
				await checkEndAction();
				await Asc.Library.PasteText(data);
			});

			await checkEndAction();		
		};

		funcs.push(func);		
	}

	if (true) 
	{
		let func = new RegisteredFunction();
		func.name = "changeParagraphStyle";
		func.params = [
			"parNumber (number): the paragraph number to apply style changes to",
			"style (string): the style name to apply to the paragraph"
		];

		func.examples = [
			"If you need to change the style of paragraph 3 to Heading 1, respond with:" +
			"[functionCalling (changeParagraphStyle)]: {\"parNumber\": 3, \"style\": \"Heading 1\"}"
		];
		
		func.call = async function(params) {
			Asc.scope.parNum = params.parNumber;
			Asc.scope.styleName = params.style;
			await Asc.Editor.callCommand(function(){
				let doc = Api.GetDocument();
				let par = doc.GetElement(Asc.scope.parNum - 1);
				if (!par)
					return;

				let style = doc.GetStyle(Asc.scope.styleName);
				par.SetStyle(style);
			});			
		};

		funcs.push(func);
	}

	if (true) 
	{
		let func = new RegisteredFunction();
		func.name = "changeTextStyle";
		func.params = [
			"bold (boolean): whether to make the text bold",
			"italic (boolean): whether to make the text italic"
		];

		func.examples = [
			"If you need to make selected text bold and italic, respond with:" +
			"[functionCalling (changeTextStyle)]: {\"bold\": true, \"italic\": true }"
		];
		
		func.call = async function(params) {
			Asc.scope.isBold = params.bold;
			Asc.scope.isItalic = params.italic;
			await Asc.Editor.callCommand(function(){
				let doc = Api.GetDocument();
				doc.GetRangeBySelect().SetBold(Asc.scope.isBold);
				doc.GetRangeBySelect().SetItalic(Asc.scope.isItalic);
			});			
		};

		funcs.push(func);
	}

	return funcs;

}
