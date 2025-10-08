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

window.isEnableDocumentGenerate = false;
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
					await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

					let isPaste = false;

					let agentHistory = [];
					agentHistory.push({
						role: "user",
						content: content
					});

					let isSupportStreaming = window.EditorHelper.isSupportStreaming;
					let dataStream = "";
					async function onStreamEvent(data, end) {
						dataStream += data;
						if (isSupportStreaming)
						{
							if (isPaste)
							{
								await Asc.Editor.callMethod("EndAction", ["GroupActions", "", "cancel"]);
								await Asc.Editor.callMethod("StartAction", ["GroupActions"]);
							}
							
							isPaste = true;
							await Asc.Library.InsertAsMD(dataStream, [Asc.PluginsMD.latex]);
						}
						else if (true === end && "" !== dataStream)
						{
							await Asc.Library.InsertAsMD(dataStream, [Asc.PluginsMD.latex]);
						}
					}

					let result = await requestEngine.chatRequest(agentHistory, false, isSupportStreaming ? async function(data) {
						if (!data)
							return;

						if (isSupportStreaming)
							await checkEndAction();
						
						await onStreamEvent(data);
					} : undefined);

					if (!isSupportStreaming) {
						dataStream = result;
						await onStreamEvent("", true);
					}

					await checkEndAction();
					await Asc.Editor.callMethod("EndAction", ["GroupActions"]);

					break;
				}
				default:
					break;
			}	

		}			

	}
}
