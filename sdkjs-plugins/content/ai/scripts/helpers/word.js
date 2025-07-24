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

var WORD_FUNCTIONS = {};

(function(){
	WORD_FUNCTIONS.explain = function()
	{
		let func = new RegisteredFunction();
		func.name = "explain";
		func.params = [];

		func.examples = [
			"If you need to explain selected text, respond with:\n" +
			"[functionCalling (explain)]: {}"
		];
		
		func.call = async function(params) {
			let text = await Asc.Editor.callCommand(function(){
				let doc = Api.GetDocument();
				let range = doc.GetRangeBySelect();
				let text = range ? range.GetText() : "";
				if (!text)
				{
					text = doc.GetCurrentWord();
					doc.SelectCurrentWord();
				}

				return text;
			});

			let argPromt = "Explaing this text: " + ":\n" + text;

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

			let commentId = null;
			let result = await requestEngine.chatRequest(argPromt, false, async function(data) {
				if (!data)
					return;

				await checkEndAction();
				Asc.scope.data = data;
				Asc.scope.model = requestEngine.modelUI.name;
				Asc.scope.commentId = commentId;

				commentId = await Asc.Editor.callCommand(function(){
					let doc = Api.GetDocument();

					let commentId = Asc.scope.commentId;
					if (!commentId)
					{
						let range = doc.GetRangeBySelect();
						if (!range)
							return null;

						let comment = range.AddComment(Asc.scope.data, Asc.scope.model, "uid" + Asc.scope.model);
						if (!comment)
							return null;
						doc.ShowComment([comment.GetId()]);
						return comment.GetId();
					}

					let comment = doc.GetCommentById(commentId);
					if (!comment)
						return commentId;

					comment.SetText(comment.GetText() + scope.data);
					return commentId;
				});
			});

			await checkEndAction();
			await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
		};

		return func;
	}
	WORD_FUNCTIONS.rewriteSentence = function() 
	{
		let func = new RegisteredFunction();
		func.name = "rewriteSentence";
		func.params = [
			"prompt (string): instructions on how to change the text"
		];

		func.examples = [
			"If you need to rewrite current sentence, respond with:\n" +
			"[functionCalling (rewriteSentence)]: {\"prompt\": \"rephrase sentence\"}"
		];
		
		func.call = async function(params) {
			let text = await Asc.Editor.callCommand(function(){
				return Api.GetDocument().GetCurrentSentence();
			});

			let argPromt = params.prompt + ":\n" + text + "\n Answer with only the new one sentence, no need of any explanations";

			let requestEngine = AI.Request.create(AI.ActionType.Chat);
			if (!requestEngine)
				return;

			await Asc.Editor.callMethod("StartAction", ["GroupActions"]);
			let isTrackChanges = await Asc.Editor.callCommand(function(){
				return Api.GetDocument().IsTrackRevisions();
			});

			if (!isTrackChanges)
			{
				await Asc.Editor.callCommand(function(){
					Api.GetDocument().SetTrackRevisions(true);
				});
			}			

			await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);

			let isSendedEndLongAction = false;
			async function checkEndAction() {
				if (!isSendedEndLongAction) {
					await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
					isSendedEndLongAction = true
				}
			}

			let result = await requestEngine.chatRequest(argPromt, false, async function(data) {
				if (!data)
					return;
				await checkEndAction();
				if (text)
				{
					Asc.scope.data = data;
					await Asc.Editor.callCommand(function(){
						let doc = Api.GetDocument();
						doc.ReplaceCurrentSentence("");
					});
					text = null;
				}

				await Asc.Library.PasteText(data);
			});

			await checkEndAction();

			if (!isTrackChanges)
				await Asc.Editor.callCommand(function(){return Api.GetDocument().SetTrackRevisions(false);});

			await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
		};

		return func;
	}
})();

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
			Asc.scope.parNumber = params.parNumber;
			let parText = await Asc.Editor.callCommand(function(){
				let doc = Api.GetDocument();
				let par = doc.GetElement(Asc.scope.parNumber - 1);
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
			await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

			let result = await requestEngine.chatRequest(argPromt, false, async function(data) {
				if (!data)
					return;
				await checkEndAction();
				await Asc.Library.PasteText(data);
			});

			await checkEndAction();
			await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
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
			Asc.scope.parNumber = params.parNumber;
			Asc.scope.styleName = params.style;
			await Asc.Editor.callCommand(function(){
				let doc = Api.GetDocument();
				let par = doc.GetElement(Asc.scope.parNumber - 1);
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
			Asc.scope.bold = params.bold;
			Asc.scope.italic = params.italic;
			await Asc.Editor.callCommand(function(){
				let doc = Api.GetDocument();
				doc.GetRangeBySelect().SetBold(Asc.scope.bold);
				doc.GetRangeBySelect().SetItalic(Asc.scope.italic);
			});			
		};

		funcs.push(func);
	}

	funcs.push(WORD_FUNCTIONS.explain());
	funcs.push(WORD_FUNCTIONS.rewriteSentence());

	return funcs;

}
