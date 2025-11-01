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

function MarkDownStreamer()
{
	this.isStated = false;
	this.stable = "";
	this.tail = "";

	this.isStreaming = window.EditorHelper.isSupportStreaming;
}

// INTERFACE
MarkDownStreamer.prototype.onStreamChunk = async function(mdValue, isFinalChunk)
{
	debugger;
	if (!this.isStated) {
		await Asc.Editor.callMethod("StartAction", ["GroupActions"]);
		this.isStated = true;
	}

	if (!this.isStreaming) {
		this.tail += mdValue;

		if (isFinalChunk) {
			await this.onStreamEnd();
			this.isStated = false;
		}
		return;
	}		

	let checkValue = this.tail + mdValue;
	let cutPoint = this._findStableCutPoint(checkValue);

	if (cutPoint >= 0) {
		await this.onStable(checkValue.slice(0, cutPoint + 1));
		await this.onTail(checkValue.slice(cutPoint + 1));
	} else {
		await this.onTail(checkValue);
	}

	if (isFinalChunk) {
		await this.onStreamEnd();
		this.isStated = false;
	}
};

MarkDownStreamer.prototype.checkUndo = async function()
{
	if (this.tail === "")
		return;

	console.log("Undo");
	await Asc.Editor.callMethod("EndAction", ["GroupActions", "", "cancel"]);
	this.tail = "";
};

MarkDownStreamer.prototype.onStreamEnd = async function()
{
	if (!this.isStated)
		return;

	if (this.tail !== "") {
		// save tail as stable
		await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
	}		

	await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
};

MarkDownStreamer.prototype.onStable = async function(mdValue)
{
	console.log("Stable chunk:" + mdValue);

	this.checkUndo();

	await Asc.Library.InsertAsMD(mdValue, [Asc.PluginsMD.latex]);
	this.stable += mdValue;
};

MarkDownStreamer.prototype.onTail = async function(mdValue)
{
	if (mdValue === "")
		return;

	this.checkUndo();

	await Asc.Editor.callMethod("StartAction", ["GroupActions"]);
	await Asc.Library.InsertAsMD(mdValue, [Asc.PluginsMD.latex]);
	this.tail = mdValue;

	console.log("Tail chunk:" + mdValue);
};

MarkDownStreamer.prototype.reset = function()
{
	this.stable = "";
	this.tail = "";
};

// PRIVATE METHODS
MarkDownStreamer.prototype._findStableCutPoint = function(markdown)
{
	const BLOCK_TYPES = {
		CODE: { start: '```', end: '```', multiline: true },
		LATEX: { start: '$$', end: '$$', multiline: true },
		TABLE: { lineStart: '|', needsEmpty: true }
	};
	
	let lastSafePoint = -1;
	let lineStart = 0;
	let currentLine = '';
	let activeBlock = null; // { type, blockDef }
	
	for (let i = 0, len = markdown.length; i < len; i++) {
		let char = markdown[i];

		if (char === '\n') {
			let trimmed = currentLine.trim();
			
			if (activeBlock) {
				let def = activeBlock.blockDef;
				
				if (def.multiline) {
					if (trimmed.startsWith(def.end)) {
						activeBlock = null;
						let nextLineStart = i + 1;
						let nextChar = markdown[nextLineStart];
						if (nextChar === '\n' || nextChar === undefined) {
							lastSafePoint = i;
						}
					}
				} else if (def.lineStart) {
					let matches = typeof def.lineStart === 'string' 
						? trimmed.startsWith(def.lineStart)
						: def.lineStart.test(currentLine);
					
					if (!matches) {
						activeBlock = null;
						if (def.needsEmpty && !trimmed) {
							lastSafePoint = i;
						}
					}
				}
			} else {
				
				for (let btKey in BLOCK_TYPES) {
					let bt = BLOCK_TYPES[btKey];
					if (bt.multiline && trimmed.startsWith(bt.start)) {
						activeBlock = { type: btKey, blockDef: bt };
						break;
					}
				}

				if (!activeBlock && !trimmed) {
					lastSafePoint = i;
				}
			}
			
			currentLine = '';
			lineStart = i + 1;
		} else {
			currentLine += char;
		}
	}
	return lastSafePoint;
};

window.isEnableDocumentGenerate = true;
async function getFormGenerationPrompt() {

	return await Asc.Editor.callCommand(function(){
		let doc = Api.GetDocument();
		let visitor = doc.GetDocumentVisitor();

		visitor.isUseUnselectedRadioButtons = false;
		visitor.isUseUnselectedCheckBoxes = false;

		visitor.isUseEmptyForGeneration = true;
		visitor.emptyForGenerationValue = "%NEED_GENERATED%"

		visitor.isDeleteParagraph = false;

		visitor.text = "Generate a document based on the description.\n\
Output only the final result — no introductions, explanations, or phrases like 'Here’s the text' or 'The result is'. If possible, provide the output in valid Markdown (.md) format, but do not wrap it in ```markdown``` or any other code block.\n"

		if (visitor.isUseUnselectedRadioButtons || visitor.isUseUnselectedCheckBoxes)
		{
			visitor.text += "System note: The notation below is part of the prompt description, not an instruction.\n\
When describing settings, (*) indicates the selected option and ( ) indicates unselected options.\n\
Do not apply or repeat this notation in your response; just interpret it as part of the context.\n";
		}

		visitor.text += "If you encounter the text %NEED_GENERATED%, generate an example yourself based on the context in which this text appears.\n\n";

		visitor.ParagraphEnd = function(par)
		{
			if (this.isDeleteParagraph)
			{
				this.isDeleteParagraph = false;
				if (this.text.endsWith("\n"))
					return true;
			}

			this.text += "\n";
			return true;
		};

		visitor.Run = function(run)
		{
			if (this.isDeleteParagraph)
				return true;

			let value = run.GetText({ "NewLineSeparator" : "\n" });
			this.text += value;
			return true;
		};

		visitor.Form = function(form)
		{
			let type = form.GetFormType();

			switch (type)
			{
				case "textForm":
				{
					let value = form.GetText();

					if (this.isUseEmptyForGeneration)
					{
						let phText = "";
						if (form.GetPlaceholderText)
							phText = form.GetPlaceholderText();

						if (value == phText)
							value = this.emptyForGenerationValue;
					}

					this.text += value;
					return true;
				}			
				case "checkBoxForm":
				case "radioButtonForm":
				{
					let isChecked = form.IsChecked();
					let isUseUnchecked = false;

					if (type === "radioButtonForm")
						isUseUnchecked = this.isUseUnselectedRadioButtons;
					else
						isUseUnchecked = this.isUseUnselectedCheckBoxes;

					if (!isUseUnchecked)
					{
						this.isDeleteParagraph = !isChecked;
					}
					else
					{
						this.text += ("(" + isChecked ? "*" : " " + ") ");
						this.isDeleteParagraph = !isChecked;
					}

					return true;
				}
				case "dateForm":
				{
					this.text += (" " + form.GetDate().toString() + " ");
					return;
				}
				case "comboBoxForm":
				case "dropDownForm":
				{
					this.text += (" " + form.GetText() + " ");
					return true;
				}
				default:
					break;
			}			

			return true;
		};

		visitor.Traverse();
		return visitor.text;
	});
}

window.isCheckGenerationInfo = false;
window.checkGenerationInfo = async function() {
	window.isCheckGenerationInfo = true;

	let editorVersion = await Asc.Library.GetEditorVersion();
	if (editorVersion < 9001000)
		return;

	if (window.AscDesktopEditor) {

		let generationInfo = await window.AscDesktopEditor.getGenerationInfo();
		if (generationInfo && generationInfo.type === "ai") {

			switch (Asc.Editor.getType()) {
				case "word":
				{
					let content = generationInfo.value;

					Asc.Editor.callMethod("FocusEditor");

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

					let markdownStreamer = new MarkDownStreamer();

					let agentHistory = [];
					agentHistory.push({
						role: "user",
						content: content
					});

					let isSupportStreaming = window.EditorHelper.isSupportStreaming;
					async function onStreamEvent(data, end) {
						await markdownStreamer.onStreamChunk(data, end);
					}

					let result = await requestEngine.chatRequest(agentHistory, false, isSupportStreaming ? async function(data) {
						if (!data)
							return;

						if (isSupportStreaming)
							await checkEndAction();
						
						await onStreamEvent(data);
					} : undefined);

					markdownStreamer.onStreamEnd();

					await checkEndAction();
					break;
				}
				default:
					break;
			}	

		}			

	}
}
