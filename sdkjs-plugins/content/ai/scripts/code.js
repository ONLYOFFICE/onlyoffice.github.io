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

/// <reference path="./text-annotations/custom-annotations/manager.js" />

let settingsWindow = null;
let aiModelsListWindow = null; 
let aiModelEditWindow = null;
let customProvidersWindow = null;
let summarizationWindow = null;
let translateSettingsWindow = null;
let helperWindow = null;
let customAssistantWindow = null;

let spellchecker = null;
let grammar = null;
let customAssistantManager = new CustomAssistantManager();

window.getActionsInfo = function() {
	let actions = [];
	for (const action in AI.ActionType) {
		if (AI.ActionType.hasOwnProperty(action)) {
			let requestEngine = AI.Request.create(action, true);
			if (requestEngine)
				actions.push({ [action] : requestEngine.model });
		}		
	}
	return actions;
};

window.addSupportAgentMode = function(editorVersion) {
	var agentHistory = [];
	var agentDebug = false;

	if (!window.EditorHelper) {
		window.EditorHelper = new EditorHelperImpl();
	}

	var is91 = editorVersion >= 9001000;

	window.Asc.plugin.attachEditorEvent("onKeyDown", function(e) {
		if (e.keyCode === 27 && textAnnotatorPopup) {
			textAnnotatorPopup.close();
		}
		if (e.keyCode === 27 && customAnnotationPopup) {
			customAnnotationPopup.close();
		}

		if (e.keyCode === 27 && helperWindow) {
			helperWindow.close();
			helperWindow = null;
			Asc.Editor.callMethod("FocusEditor");
			return;
		}

		let isCtrl = e.ctrlKey || e.metaKey;
		let isClearHistory = isCtrl && e.altKey;

		let isAgentShow = false;
		if (isCtrl)
		{
			if (is91)
			{
				isAgentShow = e.key === "/";
			}
			else
			{
				isAgentShow = e.keyCode === 191 || e.keyCode === 111;
			}
		}		
		
		if (isAgentShow && isCtrl && !helperWindow) {
			if (isClearHistory)
				agentHistory = [];

			let variation = {
				url : 'helper.html',
				isVisual : true,
				buttons : [],
				isModal : false,
				isCustomWindow : true,
				EditorsSupport : ["word", "slide", "cell", "pdf"],
				size : [500, 50],
				isTargeted : true,
				transparent : true
			};
			helperWindow = new window.Asc.PluginWindow();

			helperWindow.attachEvent("onHelperShow", function() {
				helperWindow.activate(true);
			});

			helperWindow.attachEvent("onHelperClose", function() {
				helperWindow.close();
				helperWindow = null;
				Asc.Editor.callMethod("FocusEditor");
			});

			helperWindow.attachEvent("onHelperAction", async function(prompt) {
				//console.log("Helper action: " + prompt);

				helperWindow.close();
				helperWindow = null;
				Asc.Editor.callMethod("FocusEditor");

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

				let bufferWait = "[functionCalling";
				let checkBuffer = true;
				let buffer = "";

				if (0 === agentHistory.length) {
					let systemPrompt = window.EditorHelper.getSystemPrompt();
					if (systemPrompt !== "") {
						agentHistory.push({
							role: "system", content: systemPrompt
						});
					}
				}

				if (agentHistory.length > 0 && agentHistory[agentHistory.length - 1].role === "user") {
					agentHistory[agentHistory.length - 1].content += "\n" + prompt;
				} else {
					agentHistory.push({
						role: "user",
						content: prompt
					});
				}

				let copyMessages = [];
				for (let i = 0, len = agentHistory.length; i < len; i++) {
					let item = agentHistory[i];
					copyMessages.push({
						role: item.role,
						content: item.content
					});
				}

				let markdownStreamer = new MarkDownStreamer();

				let isSupportStreaming = window.EditorHelper.isSupportStreaming;
				async function onStreamEvent(data, end) {
					if (isSupportStreaming)
						await markdownStreamer.onStreamChunk(data, end);
					else if (end)
						await Asc.Library.PasteText(data);					
				}

				let result = await requestEngine.chatRequest(copyMessages, false, async function(data) {
					if (!data)
						return;

					let oldBuffer = buffer;
					buffer += data;
					if (checkBuffer && buffer.length >= bufferWait.length) {
						if (!buffer.startsWith(bufferWait)) {
							data = oldBuffer + data;
							checkBuffer = false;
						}
					}

					if (isSupportStreaming && !checkBuffer)
						await checkEndAction();

					if (!checkBuffer)
						await onStreamEvent(data);
				});

				if (!isSupportStreaming)
					buffer = result;

				if (checkBuffer && !buffer.startsWith(bufferWait)) {
					checkBuffer = false;
				}

				if (!isSupportStreaming && !checkBuffer)
					await onStreamEvent(buffer, true);

				if (isSupportStreaming)
					markdownStreamer.onStreamEnd();

				await checkEndAction();

				if (checkBuffer) {
					if (agentDebug)
						console.log(buffer);

					let resultFunc = await window.EditorHelper.callFunc(buffer);
					if (resultFunc) {
						if (resultFunc.error) {
							agentHistory.push({
								role: "assistant",
								content: resultFunc.error
							});
						} else if (resultFunc.message !== undefined) {
							agentHistory.push({
								role: "assistant", content: resultFunc.message
							});
						}

						if (resultFunc.prompt !== undefined) {
							agentHistory.push({
								role: "user", content: resultFunc.prompt
							});
						}
					}
				} else {
					if (agentDebug)
						console.log(result);

					agentHistory.push({
						role: "assistant",
						content: result
					});
				}
				await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
			});

			helperWindow.show(variation);
			helperWindow.isSkipClick = true;
			setTimeout(function() {
				if (helperWindow)
					helperWindow.isSkipClick = false;
			}, 500);
		}
	});
	
	window.Asc.plugin.attachEditorEvent("onClick", function(e) {
		if (helperWindow && !helperWindow.isSkipClick) {
			helperWindow.close();
			helperWindow = null;
		}
	});
}

async function initAssistants() {
	let _this = window.Asc.plugin;
	if (!_this.sendEvent)
		return;

	spellchecker = new SpellChecker(textAnnotatorPopup);
	grammar = new GrammarChecker(textAnnotatorPopup);
	JSON.parse(
			localStorage.getItem("onlyoffice_ai_saved_assistants") || "[]"
		).forEach(assistantData => {
			customAssistantManager.createAssistant(assistantData);
		});

	_this.attachEditorEvent("onParagraphText", function(obj) {
		if (!obj)
			return;
		
		spellchecker.onChangeParagraph(obj["paragraphId"], obj["recalcId"], obj["text"], obj["annotations"]);
		grammar.onChangeParagraph(obj["paragraphId"], obj["recalcId"], obj["text"], obj["annotations"]);

		customAssistantManager.onChangeParagraph(obj["paragraphId"], obj["recalcId"], obj["text"], obj["annotations"]);
	});

	_this.attachEditorEvent("onFocusAnnotation", function(obj) {
		if (!obj)
			return;
	});

	_this.attachEditorEvent("onBlurAnnotation", function(obj) {
		if (!obj)
			return;

		if ("spelling" === obj["name"])
			spellchecker.onBlur();
		else if ("grammar" === obj["name"]) 
			grammar.onBlur();
		else if ("customAssistant" === obj["name"].slice(0, 15)) {
			const assistantId = obj["name"].slice(16);
			customAssistantManager.onBlur(assistantId);
		}	
	});

	_this.attachEditorEvent("onClickAnnotation", function(obj) {
		if (!obj)
			return;

		if ("grammar" === obj["name"])
			grammar.onClick(obj["paragraphId"], obj["ranges"]);
		else if ("spelling" === obj["name"])
			spellchecker.onClick(obj["paragraphId"], obj["ranges"]);
		else if ("customAssistant" === obj["name"].slice(0, 15)) {
			const assistantId = obj["name"].slice(16);
			customAssistantManager.onClick(assistantId, obj["paragraphId"], obj["ranges"]);
		}
	});
}

async function initExternalProviders() {
	let _this = window.Asc.plugin;
	if (!_this.sendEvent)
		return;
	
	function onLoadCustomExternalProviders(providers) {
		for (let i = 0, len = providers.length; i < len; i++) {
			let item = providers[i];
			if (!item.name)
				continue;

			if (!item.content) {
				let url = item.url || "[external]";
				let key = item.key || "";
				let addon = item.addon || "";

				item.content = "\"use strict\";\n\
class Provider extends AI.Provider {\n\
constructor() {\n\
	super(\"" + item.name + "\", \"" + url + "\", \"" + key + "\", \"" + addon + "\");\n\
}\n\
}";
				AI.addExternalProvider(item.content);
			}
		}

		if (0 < providers.length) {
			AI.Storage.save();
			AI.Storage.load();
		}
	}

	_this.attachEditorEvent("ai_onCustomProviders", function(providers) {
		onLoadCustomExternalProviders(providers);
	});

	_this.attachEditorEvent("ai_onCustomInit", function(obj) {
		
		if (obj.settingsLock !== undefined) {
			let isSettingsRemoved = obj.settingsLock === "removed";
			let isSettingsDisabled = obj.settingsLock === "disabled";

			if (window.buttonSettings) {
				if (window.buttonSettings.removed != isSettingsRemoved || 
					window.buttonSettings.disabled != isSettingsDisabled) {
					window.buttonSettings.removed = isSettingsRemoved;
					window.buttonSettings.disabled = isSettingsDisabled;

					Asc.Buttons.updateToolbarMenu(window.buttonMainToolbar.id, window.buttonMainToolbar.name, [window.buttonSettings]);
				}
			}
		}

		// mark model as external (not saved to localstorage)
		if (obj.actions) {
			for (let type in obj.actions) {
				if (obj.actions[type] && obj.actions[type].model) {
					if (!obj.actions[type].model.startsWith(AI.externalModelPrefix))
						obj.actions[type].model = AI.externalModelPrefix + obj.actions[type].model;
				}
			}
		}
		if (obj.models) {
			for (let i = 0, len = obj.models.length; i < len; i++) {
				let model = obj.models[i];
				if (model.id && !model.id.startsWith(AI.externalModelPrefix))
					model.id = AI.externalModelPrefix + model.id;
			}
		}

		// override the actions, if needed
		if (obj.actions) {
			let isActionsOverride = obj.actionsOverride === true;

			for (let type in obj.actions) {
				if (!AI.Actions[type])
					continue;
				
				if (!AI.Actions[type].model || isActionsOverride)
					AI.Actions[type].model = obj.actions[type].model;
			}

			AI.ActionsSave();
		}

		let isUpdate = false;
		if (obj.providers) {
			let customProviders = [];
			for (let type in obj.providers) {
				if (!obj.providers[type].name)
					continue;
				customProviders.push(obj.providers[type]);
			}
			if (customProviders.length > 0)
				onLoadCustomExternalProviders(customProviders);
			isUpdate = true;
		}

		if (obj.models) {
			for (let i = 0, len = obj.models.length; i < len; i++) {
				let model = obj.models[i];
				let isFound = false;

				for (let j = 0, jLen = AI.Models.length; j < jLen; j++) {
					let testModel = AI.Models[j];

					if (testModel.name === model.name && 
						testModel.provider === model.provider &&
						testModel.id === model.id) {
						isFound = true;
						AI.Models[j] = model;
						break;
					}
				}

				if (!isFound) {
					if (!model.endpoints)
						model.endpoints = [AI.Endpoints.Types.v1.Chat_Completions];
					AI.Models.push(model);
				}
			}
			isUpdate = true;
		}

		if (isUpdate)
			AI.Storage.save();
		
	});

	_this.attachEditorEvent("ai_onCallTool", async function(toolCall) {
		let funcName = toolCall.name;
		let funcArgs = toolCall.arguments;
		let argsObj = typeof funcArgs === 'string' ? JSON.parse(funcArgs) : funcArgs;

		await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

		let toolResult = {};
		try {
			toolResult = await window.EditorHelper.names2funcs[funcName].call(argsObj);
			if (!toolResult)
				toolResult = {};
			toolResult.message = "System function '" + funcName + "' executed successfully";
		} catch (e) {
			let errorMsg = "Error calling function: " + funcName;
			console.error(errorMsg);
			toolResult = {
				error: errorMsg
			};
		}

		await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
		window.Asc.plugin.sendEvent("ai_onCallToolResult", toolResult);
	});

	try {
		if (window.AscDesktopEditor) {
			let model = JSON.parse(window.localStorage.getItem("current-model"));
			let provider = JSON.parse(window.localStorage.getItem("current-provider"));

			if (model && provider) {
				AI.DEFAULT_DESKTOP_MODEL = {
					name : model.name,
					id : AI.externalModelPrefix + model.id,
					capabilities : model.capabilities || AI.CapabilitiesUI.Chat,
					endpoints : [AI.Endpoints.Types.v1.Chat_Completions]
				};

				for (let i = 0, len = window.AI.InternalProviders.length; i < len; i++) {
					let internalProvider = window.AI.InternalProviders[i];
					if (provider.baseUrl === internalProvider.url ||
						provider.baseUrl === (internalProvider.url + "/" + internalProvider.addon)) 
					{
						AI.DEFAULT_DESKTOP_MODEL.provider = window.AI.InternalProviders[i].createInstance(provider.name, 
							internalProvider.url, provider.key, internalProvider.addon);
						break;	
					}
				}

				if (!AI.DEFAULT_DESKTOP_MODEL.provider) {
					AI.DEFAULT_DESKTOP_MODEL.provider = new AI.Provider(provider.name, provider.baseUrl, provider.key);
				}
			};
		}

		if (AI.DEFAULT_DESKTOP_MODEL) {
			AI.Models.push(AI.DEFAULT_DESKTOP_MODEL);

			for (let key in AI.Actions) {
				if (AI.Actions[key].capabilities === AI.CapabilitiesUI.Chat && AI.Actions[key].model === "") {
					AI.Actions[key].model = AI.DEFAULT_DESKTOP_MODEL.id;
				}
			}
		}
	} catch (e) {
	}
}

let initCounter = 0;
async function initWithTranslate(counter) {
	initCounter |= counter;
	if (3 === initCounter) {
		initCounter = 5;
		await AI.loadInternalProviders();
		await registerButtons(window);
		Asc.Buttons.registerContextMenu();
		Asc.Buttons.registerToolbarMenu();

		if (Asc.Editor.getType() === "pdf") {
			window.Asc.plugin.attachEditorEvent("onChangeRestrictions", function(value){
				let disabled = (value & 0x80) !== 0;
				if (window.buttonOCRPage.disabled !== disabled)
					window.buttonOCRPage.disabled = disabled;
				Asc.Buttons.updateToolbarMenu(window.buttonMainToolbar.id, window.buttonMainToolbar.name, [window.buttonOCRPage]);
			});

			let restriction = Asc.plugin.info.restrictions;
			if (undefined === restriction)
				restriction = 0;

			let buttonOCRPage = new Asc.ButtonToolbar(null);
			buttonOCRPage.text = "OCR";
			buttonOCRPage.icons = window.getToolBarButtonIcons("ocr");
			window.buttonOCRPage = buttonOCRPage;

			if (0x80 & restriction)
				buttonOCRPage.disabled = true;

			buttonOCRPage.attachOnClick(async function(data){
				let requestEngine = AI.Request.create(AI.ActionType.OCR);
				if (!requestEngine)
					return;

				let pageIndex = await Asc.Editor.callMethod("GetCurrentPage");
				let content = await Asc.Editor.callMethod("GetPageImage", [pageIndex, {
					maxSize : 1024,
					annotations : true,
					fields : false,
					drawings : false
				}]);
				if (!content)
					return;

				let result = await requestEngine.imageOCRRequest(content);
				if (!result) return;

				await Asc.Editor.callMethod("ReplacePageContent", [pageIndex, {
					type : "html",
					options : {
						content : Asc.Library.ConvertMdToHTML(result, [Asc.PluginsMD.latex]),
						separateParagraphs : false
					}					
				}]);
			});

			Asc.Buttons.updateToolbarMenu(window.buttonMainToolbar.id, window.buttonMainToolbar.name, [buttonOCRPage]);
		}

		let editorVersion = await Asc.Library.GetEditorVersion();
		if (editorVersion >= 9000000) {
			window.Asc.plugin.attachEditorEvent("onAIRequest", async function(params){
				let data = {};
				let isFromMethod = params.isFromMethod === true;
				let isBlock = !isFromMethod;

				async function sendResult(data) {
					if (isFromMethod) {
						await Asc.Editor.callMethod("SendEventInternal", ["ai_onRequest", data]);	
					} else {
						await Asc.Editor.callMethod("onAIRequest", [data]);
					}
				}

				if ("Actions" === params.type) {
					data.Actions = window.getActionsInfo();
					return await sendResult(data);
				}
				
				if ("text" === params.type)
					params.type = AI.ActionType.Chat;

				let requestEngine = null;
				if (AI.Actions[params.type])
					requestEngine = AI.Request.create(params.type);

				if (!requestEngine) {
					data.type = "no-engine";
					data.text = "";
					data.error = "No model selected for chat action...";

					return await sendResult(data);
				}

				if (isFromMethod) {
					await Asc.Editor.callMethod("SendEventInternal", ["ai_onStartAction", {
						type : "Block",
						description : "AI (" + requestEngine.modelUI.name + ")"
					}]);
				}

				switch (params.type) {
					case AI.ActionType.Chat:
					{
						data.type = "text";
						data.text = await requestEngine.chatRequest(params.data, isBlock);
						break;
					}
					case AI.ActionType.Translation:
					{
						data.type = "text";
						let prompt = Asc.Prompts.getTranslatePrompt(params.data.text, params.data.lang);
						let result = await requestEngine.chatRequest(prompt, isBlock);
						data.text = result ? Asc.Library.getTranslateResult(result, params.data.text) : "";
						break;
					}
					case AI.ActionType.ImageGeneration:
					{
						data.type = AI.ActionType.ImageGeneration;
						let result = await requestEngine.imageGenerationRequest(params.data, isBlock);
						data.image = result || "";
						break;
					}
					case AI.ActionType.OCR:
					{
						data.type = AI.ActionType.OCR;
						let result = await requestEngine.imageOCRRequest(params.data, isBlock);
						if (result) {
							data.result = Asc.Library.ConvertMdToHTML(result, [Asc.PluginsMD.latex]);
						}
						break;
					}
					case AI.ActionType.Vision:
					{
						data.type = AI.ActionType.Vision;
						let result = await requestEngine.imageVisionRequest({
							prompt : Asc.Prompts.getImageDescription(),
							image : params.data
						}, isBlock);
						data.result = result || "";
						break;
					}
					default:
						break;
				}

				if (isFromMethod) {
					await Asc.Editor.callMethod("SendEventInternal", ["ai_onEndAction", {
						type : "Block",
						description : "AI (" + requestEngine.modelUI.name + ")"
					}]);
				}

				await sendResult(data);			
			});

			if ("cell" === window.Asc.plugin.info.editorType) {
				let AIFunc = {
					guid : "e8ea2fb288054deaa6b82158c04dee37",
					name : "AI",
					value : "\
	(function()\n\
	{\n\
		/**\n\
		 * Function that returns the AI answer.\n\
		 * @customfunction\n\
		 * @param {string} value Prompt.\n\
		 * @param {?boolean} isSaveAIFunction Indicator whether the AI function should be saved.\n\
		 * @returns {string} Answer value.\n\
		 */\n\
		async function AI(value, isSaveAIFunction) {\n\
			let systemMessage = \"As an Excel formula expert, your job is to provide advanced Excel formulas that perform complex calculations or data manipulations as described by the user. Keep your answers as brief as possible. If the user asks for formulas, return only the formula. If the user asks for something, answer briefly and only the result, without descriptions or reflections. If you received a request that is not based on Excel formulas, then simply answer the text request as briefly as possible, without descriptions or reflections\";\n\
			return new Promise(resolve => (function(){\n\
				Api.AI({ type : \"text\", data : [{role: \"system\", content: systemMessage}, {role:\"user\", content: value}] }, function(data){\n\
					if (data.error)\n\
						return resolve(data.error);\n\
					switch (data.type) {\n\
						case \"text\":\n\
						{\n\
							let result = data.text.trim();\n\
							if (isSaveAIFunction !== true)\n\
								result = \"@@\" + result;\n\
							resolve(result);\n\
							break;\n\
						}\n\
						default:\n\
						{\n\
							resolve(\"#ERROR\");\n\
						}\n\
					}\n\
					resolve(data)\n\
				});\n\
			})());\n\
		}\n\
		Api.AddCustomFunction(AI);\n\
	})();"
				};

				let oldCF = await GetOldCustomFunctions();
				let isFound = false;
				let isUpdate = false;

				for (let i = 0, len = oldCF.macrosArray.length; i < len; i++) {
					let item = oldCF.macrosArray[i];
					if (item.name === AIFunc.name) {
						isFound = true;

						if (item.guid === AIFunc.guid) {
							if (item.value !== AIFunc.value) {
								isUpdate = true;
								item.value = AIFunc.value;
							}
						}
					}
				}
				if (!isFound) {
					oldCF.macrosArray.push(AIFunc);
					isUpdate = true;
				}

				if (isUpdate)
					await Asc.Editor.callMethod("SetCustomFunctions", [JSON.stringify(oldCF)]);
			}
		}

		if (editorVersion >= 9000004)
			window.addSupportAgentMode(editorVersion);

		initAssistants();
		initExternalProviders();

		if (window.Asc.plugin.sendEvent)
			window.Asc.plugin.sendEvent("ai_onInit", {});

		if (!window.isCheckGenerationInfo)
			window.checkGenerationInfo();
	}
}

function clearChatState() {
	let key = 'onlyoffice_ai_chat_state';
	if (window.localStorage.getItem(key))
		window.localStorage.removeItem(key);
}

async function GetOldCustomFunctions() {
	let data = await Asc.Editor.callMethod("GetCustomFunctions");
	let obj = {
		macrosArray : [],
		current : -1
	};
	if (data) {
		try {
			obj = JSON.parse(data);
		} catch (err) {
			obj = {
				macrosArray : [],
				current : -1
			};
		}
	}
	return obj;
}

var isPluginInit = false;
var arrayResolveInit = [];

window.waitInit = async function() {
	if (isPluginInit)
		return;	

	return new Promise(resolve => {
		arrayResolveInit.push(resolve);
	});
};

window.setInit = function() {
	if (isPluginInit)
		return;
	isPluginInit = true;
	arrayResolveInit.forEach(resolve => {
		resolve();
	});
	arrayResolveInit = [];
};

window.Asc.plugin.init = async function() {
	// Check server settings
	if (window.Asc.plugin.info.aiPluginSettings) {
		try {
			AI.serverSettings = JSON.parse(window.Asc.plugin.info.aiPluginSettings);
		} catch (e) {
			AI.serverSettings = null;
		}
		delete window.Asc.plugin.info.aiPluginSettings;
	}

	await initWithTranslate(1 << 1);
	clearChatState();

	window.setInit();
};

window.Asc.plugin.onTranslate = async function() {
	await initWithTranslate(1);
};

window.Asc.plugin.button = async function(id, windowId) {
	if (!windowId) {
		return
	}

	if (window.chatWindow && window.chatWindow.id === windowId)
	{
		clearChatState();
		delete window.chatWindow;
	}

	if (textAnnotatorPopup && textAnnotatorPopup.popup && textAnnotatorPopup.popup.id === windowId)
	{
		switch (id) {
			case 0:
				await textAnnotatorPopup.popup.onAccept();
				break;
			case 1:
				await textAnnotatorPopup.popup.onReject();
				break;
			default:
				textAnnotatorPopup.close();
				break;
		}
		return;
	}
	if (customAnnotationPopup && customAnnotationPopup.popup && customAnnotationPopup.popup.id === windowId)
	{
		switch (id) {
			case 0:
				await customAnnotationPopup.popup.onAccept();
				break;
			case 1:
				await customAnnotationPopup.popup.onReject();
				break;
			default:
				customAnnotationPopup.close();
				break;
		}	
		return;
	}

	if (settingsWindow && windowId === settingsWindow.id) {
		settingsWindow.close();
		settingsWindow = null;
	} else if (aiModelsListWindow && windowId === aiModelsListWindow.id) {
		aiModelsListWindow.close();
		aiModelsListWindow = null;
		onOpenSettingsModal();
	} else if (translateSettingsWindow && windowId === translateSettingsWindow.id) {
		if (id == 0) {
			translateSettingsWindow.command('onKeepLang');
		}

		translateSettingsWindow.close();
		delete translateSettingsWindow;
	} else if (aiModelEditWindow && windowId === aiModelEditWindow.id) {
		if (id == 0) {
			aiModelEditWindow.command('onSubmit');
		} else {
			aiModelEditWindow.close();
			aiModelEditWindow = null;
		}
	} else if (customProvidersWindow && windowId === customProvidersWindow.id) {
		customProvidersWindow.close();
		customProvidersWindow = null;
	} else {
		window.Asc.plugin.executeMethod("CloseWindow", [windowId]);
	}
};

window.Asc.plugin.onThemeChanged = function(theme) {
	window.Asc.plugin.onThemeChangedBase(theme);

	settingsWindow && settingsWindow.command('onThemeChanged', theme);
	aiModelsListWindow && aiModelsListWindow.command('onThemeChanged', theme);
	aiModelEditWindow && aiModelEditWindow.command('onThemeChanged', theme);
	summarizationWindow && summarizationWindow.command('onThemeChanged', theme);
	translateSettingsWindow && translateSettingsWindow.command('onThemeChanged', theme);
	customProvidersWindow && customProvidersWindow.command('onThemeChanged', theme);
	window.chatWindow && window.chatWindow.command('onThemeChanged', theme);
	helperWindow && helperWindow.command('onThemeChanged', theme);
	customAssistantWindow && customAssistantWindow.command('onThemeChanged', theme);

	if (textAnnotatorPopup && textAnnotatorPopup.popup)
		textAnnotatorPopup.popup.command('onThemeChanged', theme);
	if (customAnnotationPopup && customAnnotationPopup.popup)
		customAnnotationPopup.popup.command('onThemeChanged', theme);
};

/**
 * ACTIONS WINDOW
 */
function updateModels() {
	if (!AI.Storage.onChangeStorage) {
		AI.Storage.onChangeStorage = function() {
			updateModels();
		};
	}

	let models = AI.Storage.serializeModels();
	if (settingsWindow)
		settingsWindow.command('onUpdateModels', models);
	if (aiModelsListWindow)
		aiModelsListWindow.command('onUpdateModels', models);
}
function updateActions() {
	if (settingsWindow)
		settingsWindow.command('onUpdateActions', AI.ActionsGetSorted());
}

function onOpenSettingsModal() {
	let variation = {
		url : 'settings.html',
		description : window.Asc.plugin.tr('AI configuration'),
		isVisual : true,
		buttons : [
			{ text: window.Asc.plugin.tr('OK'), primary: true }
		],
		isModal : true,
		EditorsSupport : ["word", "slide", "cell", "pdf"],
		size : [320, 350]
	};

	if (!settingsWindow) {
		settingsWindow = new window.Asc.PluginWindow();
		settingsWindow.attachEvent("onInit", function() {
			updateActions();
			updateModels();
		});
		settingsWindow.attachEvent("onUpdateHeight", function(height) {
			if(height > variation.size[1]) {
				Asc.Editor.callMethod("ResizeWindow", [settingsWindow.id, [variation.size[0] - 2, height]]);	//2 is the border-width at the window
			}
		});
		settingsWindow.attachEvent('onChangeAction', function(data){
			AI.ActionsChange(data.id, data.model);
		});
		settingsWindow.attachEvent('onOpenAiModelsModal', onOpenAiModelsModal);
		settingsWindow.attachEvent('onOpenAddModal', function () {
			onOpenEditModal({ type: 'add' })
		});

		settingsWindow.attachEvent('onClose', function(){
			if (settingsWindow) {
				settingsWindow.close();
				settingsWindow = null;
			}
		});
	}
	settingsWindow.show(variation);
}

function onTranslateSettingsModal() {
	let variation = {
		url : 'translationsettings.html',
		description : window.Asc.plugin.tr('Translation settings'),
		isVisual : true,
		buttons : [
			{ text: window.Asc.plugin.tr('OK'), primary: true },
			{ text: window.Asc.plugin.tr('Cancel'), primary: false },
		],
		isModal : true,
		EditorsSupport : ["word", "slide", "cell", "pdf"],
		size : [320, 200]
	};

	translateSettingsWindow = new window.Asc.PluginWindow();
	translateSettingsWindow.show(variation);
}

async function onCheckGrammarSpelling(isCurrent)
{
	let paraIds = [];
	
	if (isCurrent)
	{
		paraIds = await Asc.Editor.callCommand(function(){
			let result = [];
			let range = Api.GetDocument().GetRangeBySelect();
			if (!range)
				return [];
			
			let paragraphs = range.GetAllParagraphs();
			paragraphs.forEach(p => result.push(p.GetInternalId()));
			return result;
		});
	}
	else
	{
		paraIds = await Asc.Editor.callCommand(function(){
			let result = [];
			let paragraphs = Api.GetDocument().GetAllParagraphs();
			paragraphs.forEach(p => result.push(p.GetInternalId()));
			return result;
		});
	}
	
	if (spellchecker)
		spellchecker.checkParagraphs(paraIds);
	
	if (grammar)
		grammar.checkParagraphs(paraIds);
}

/**
 * CUSTOM ASSISTANT
 * @param {string} [assistantId] Assistant ID for editing
 * @param {Asc.ButtonToolbar} [buttonAssistant]
 */
function customAssistantWindowShow(assistantId, buttonAssistant)
{
	if (window.customAssistantWindow) {
		customAssistantWindowClose();
	}
	const actionButtonText = assistantId ? 'Save' : 'Create';
	const description = assistantId ? 'Edit' : 'Create a new assistant';

	let variation = {
		url : "customAssistant.html",
		description : window.Asc.plugin.tr(description),
		isVisual : true,
		buttons : [
			{ text: window.Asc.plugin.tr(actionButtonText), primary: true },
			{ text: window.Asc.plugin.tr('Cancel'), primary: false },
		],
		isModal : false,
		isCanDocked: false,
		type: "window",
		EditorsSupport : ["word"],
		size : [ 427, 303 ] //383
	};

	customAssistantWindow = new window.Asc.PluginWindow();
	customAssistantWindow.attachEvent("onWindowReady", function() {
		Asc.Editor.callMethod("ResizeWindow", [customAssistantWindow.id, [427, 303], [427, 303], [0, 0]]);
		if (assistantId) {
			customAssistantWindow.command('onEditAssistant', assistantId);
		}
	});
	
	customAssistantWindow.show(variation);

	window.pluginsButtonsCallback = window.Asc.plugin.button;
	window.Asc.plugin.button = async function(id, windowId, ...args) {
		if (customAssistantWindow && windowId === customAssistantWindow.id) {
			if (id === 0) {
				const element = await new Promise(resolve => {
					customAssistantWindow.attachEvent("onAddEditAssistant", resolve);
					customAssistantWindow.command('onClickAdd');
				});
				if (!element) return;
				if (buttonAssistant) {
					buttonAssistant.text = element.name;
					customAssistantManager.updateAssistant(element);
				} else {
					buttonAssistant = new Asc.ButtonToolbar(null);
					buttonAssistant.text = element.name;
					buttonAssistant.icons = getToolBarButtonIcons("written-plugin");
					buttonAssistant.split = true;
					buttonAssistant.enableToggle = true;
					buttonAssistant.menu = [{
						text: 'Edit',
						id: element.id + '-edit',
						onclick: () => customAssistantWindowShow(element.id, buttonAssistant)
					},
					{
						text: 'Delete',
						id: element.id + '-delete',
						onclick: () => customAssistantWindowDeleteConfirm(element.id, buttonAssistant)
					}];
					buttonAssistant.attachOnClick(async function(){
						customAssistantOnClickToolbarIcon(element.id, buttonAssistant);
					});
					customAssistantManager.createAssistant(element);
				}
				Asc.Buttons.updateToolbarMenu(window.buttonMainToolbar.id, window.buttonMainToolbar.name, [buttonAssistant]);
			}
			customAssistantWindowClose();
		} else {
			await window.pluginsButtonsCallback(id, windowId, ...args);
		}
	}

	window.customAssistantWindow = customAssistantWindow;
}

function customAssistantWindowClose() {
	if (window.customAssistantWindow) {
		window.customAssistantWindow.close();
		window.customAssistantWindow = null;
	}
	if (window.pluginsButtonsCallback) {
		window.Asc.plugin.button = window.pluginsButtonsCallback;
		window.pluginsButtonsCallback = null;
	}
}
/**
 * @param {string} assistantId
 * @param {Asc.ButtonToolbar} buttonAssistant
 */
function customAssistantWindowDeleteConfirm(assistantId, buttonAssistant) {
if (window.customAssistantWindow) {
		customAssistantWindowClose();
	}

	const savedAssistants = JSON.parse(
		localStorage.getItem("onlyoffice_ai_saved_assistants") || "[]"
	);
	const index = savedAssistants.findIndex((item) => item.id === assistantId);
	const assistant = savedAssistants[index];

	let variation = {
		url : "customAssistant.html",
		description : assistant.name + ' - ' + window.Asc.plugin.tr('Delete Assistant'),
		isVisual : true,
		buttons : [
			{ text: window.Asc.plugin.tr('Yes'), primary: true },
			{ text: window.Asc.plugin.tr('No'), primary: false },
		],
		isModal : true,
		isCanDocked: false,
		type: "window",
		EditorsSupport : ["word"],
		size : [ 400, 70 ]
	};

	const customAssistantWindow = new window.Asc.PluginWindow();
	customAssistantWindow.attachEvent("onWindowReady", function() {
		Asc.Editor.callMethod("ResizeWindow", [customAssistantWindow.id, [400, 70], [400, 70], [0, 0]]);
		if (assistantId) {
			let text = window.Asc.plugin.tr('Are you sure you want to delete this assistant?');
			text += '<br>' + window.Asc.plugin.tr("This action cannot be undone.");
			customAssistantWindow.command('onWarningAssistant', text);
		}
	});
	
	customAssistantWindow.show(variation);

	window.pluginsButtonsCallback = window.Asc.plugin.button;
	window.Asc.plugin.button = async function(id, windowId, ...args) {
		if (customAssistantWindow && windowId === customAssistantWindow.id) {
			if (id === 0) {

				if (index !== -1) {
					savedAssistants.splice(index, 1);
					localStorage.setItem(
						"onlyoffice_ai_saved_assistants",
						JSON.stringify(savedAssistants)
					);
					if (buttonAssistant) {
						buttonAssistant.removed = true;
						Asc.Buttons.updateToolbarMenu(window.buttonMainToolbar.id, window.buttonMainToolbar.name, [buttonAssistant]);
					}
				}
			}
			customAssistantWindowClose();
		} else {
			await window.pluginsButtonsCallback(id, windowId, ...args);
		}
	}

	window.customAssistantWindow = customAssistantWindow;
}
/**
 * @param {string} warningText
 * @param {localStorageCustomAssistantItem} [assistantData]
 */
function customAssistantWarning(warningText, assistantData) {
	if (window.customAssistantWindow) {
		customAssistantWindowClose();
	}

	let variation = {
		url : "customAssistant.html",
		description : window.Asc.plugin.tr('Warning!'),
		isVisual : true,
		buttons : [
			{ text: window.Asc.plugin.tr('OK'), primary: true },
		],
		isModal : true,
		isCanDocked: false,
		type: "window",
		EditorsSupport : ["word"],
		size : [ 350, 76 ]
	};

	const customAssistantWindow = new window.Asc.PluginWindow();
	customAssistantWindow.attachEvent("onWindowReady", function() {
		Asc.Editor.callMethod("ResizeWindow", [customAssistantWindow.id, [350, 76], [350, 76], [0, 0]]);
		customAssistantWindow.command('onWarningAssistant', warningText);

	});
	
	customAssistantWindow.show(variation);

	window.pluginsButtonsCallback = window.Asc.plugin.button;
	window.Asc.plugin.button = async function(id, windowId, ...args) {
		if (customAssistantWindow && windowId === customAssistantWindow.id) {
			customAssistantWindowClose();
		} else {
			await window.pluginsButtonsCallback(id, windowId, ...args);
		}
	}

	window.customAssistantWindow = customAssistantWindow;
}
/** 
 * @param {string} assistantId 
 * @param {Asc.ButtonToolbar} buttonAssistant 
 * @returns 
 */
async function customAssistantOnClickToolbarIcon(assistantId, buttonAssistant)
{
	const isAssistantRunning = customAssistantManager.isCustomAssistantRunning(assistantId);
	if (isAssistantRunning) {
		customAssistantManager.stop(assistantId);
		return;
	}
	let paraIds = [];

	let selectedText = await Asc.Library.GetSelectedText();
	let preloaderMessage = !!selectedText ? window.Asc.plugin.tr("Processing selection...") : window.Asc.plugin.tr("Processing document...");

	Asc.scope.hasSelectedText = !!selectedText;
	paraIds = await Asc.Editor.callCommand(function(){
		let result = [];
		let paragraphs;
		if (Asc.scope.hasSelectedText) {
			const range = Api.GetDocument().GetRangeBySelect();
			paragraphs = range.GetAllParagraphs();
		} else {
			paragraphs = Api.GetDocument().GetAllParagraphs();
		}
		paragraphs.forEach(p => result.push(p.GetInternalId()));
		return result;
	});

	await Asc.Editor.callMethod("StartAction", ["Block", preloaderMessage]);

	const status = await customAssistantManager.run(assistantId, paraIds);
	switch (status) {
		case customAssistantManager.STATUSES.OK:
			break;
		case customAssistantManager.STATUSES.NOT_FOUND:
			console.error("Custom assistant not found: " + assistantId);
            customAssistantWarning(window.Asc.plugin.tr("Custom assistant is not available. Please check your configuration."));
			//buttonAssistant.disabled = true;
			//Asc.Buttons.updateToolbarMenu(window.buttonMainToolbar.id, window.buttonMainToolbar.name, [buttonAssistant]);
			break;
		case customAssistantManager.STATUSES.ERROR:
            customAssistantWarning(
				window.Asc.plugin.tr("Not able to perform this action. Please use prompts related to text analysis, editing, or formatting.")
			);
			// TODO: Add the ability to remove a button press.
			// buttonAssistant.PRESSED = false;
			// Asc.Buttons.updateToolbarMenu(window.buttonMainToolbar.id, window.buttonMainToolbar.name, [buttonAssistant]);
			// customAssistantManager.stop(assistantId);
			break;
		case customAssistantManager.NO_AI_MODEL_SELECTED:
			// A window with settings will appear.
			break;		
	}

	await Asc.Editor.callMethod("EndAction", ["Block", preloaderMessage]);
}

/**
 * MODELS WINDOW
 */
function onOpenAiModelsModal() {
	if (settingsWindow) {
		settingsWindow.close();
		settingsWindow = null;
	}

	let variation = {
		url : 'aiModelsList.html',
		description : window.Asc.plugin.tr('AI Models list'),
		isVisual : true,
		buttons : [
			{ text: window.Asc.plugin.tr('OK'), primary: false },
		],
		isModal : true,
		EditorsSupport : ["word", "slide", "cell", "pdf"],
		size : [320, 230]
	};

	if (!aiModelsListWindow) {
		aiModelsListWindow = new window.Asc.PluginWindow();
		aiModelsListWindow.attachEvent("onInit", function() {
			updateModels();
		});
		aiModelsListWindow.attachEvent("onOpenEditModal", onOpenEditModal);
		aiModelsListWindow.attachEvent("onDeleteAiModel", function(data) {
			AI.Storage.removeModel(data.id);
		});
	}
	aiModelsListWindow.show(variation);
}

/**
 * ADD/EDIT WINDOW
 */
function onOpenEditModal(data) {
	let variation = {
		url : 'aiModelEdit.html',
		description : data.type == 'add' ? window.Asc.plugin.tr('Add AI Model') : window.Asc.plugin.tr('Edit AI Model'),
		isVisual : true,
		buttons : [ 
			{ text: window.Asc.plugin.tr('OK'), primary: true },
			{ text: window.Asc.plugin.tr('Cancel'), primary: false },
		],
		isModal : true,
		EditorsSupport : ["word", "slide", "cell", "pdf"],
		size : [365, 425]
	};

	if (!aiModelEditWindow) {
		aiModelEditWindow = new window.Asc.PluginWindow();
		aiModelEditWindow.attachEvent("onChangeModel", function(model){
			//Assign this model to actions without a model
			const models = AI.Storage.serializeModels();
			let needUpdateSettingsWindow = false;
			AI.ActionsGetSorted().forEach(function(action) {
				const hasModel = models.some(function(model) { return model.id == action.model });
				if(!hasModel && (action.capabilities & model.capabilities) !== 0) {
					AI.ActionsChange(action.id, model.id);
					needUpdateSettingsWindow = true;
				}
			});
			if(needUpdateSettingsWindow) {
				updateActions();
			}

			AI.Storage.addModel(model);

			aiModelEditWindow.close();
			aiModelEditWindow = null;
		});
		aiModelEditWindow.attachEvent("onGetModels", async function(provider){
			let models = await AI.getModels(provider);
			aiModelEditWindow && aiModelEditWindow.command("onGetModels", models);
		});

		aiModelEditWindow.attachEvent("onInit", function() {
			aiModelEditWindow.command('onModelInfo', {
				model : data.model ? AI.Storage.getModelByName(data.model.name) : null,
				providers : AI.serializeProviders()
			});
		});
		aiModelEditWindow.attachEvent("onUpdateHeight", function(height) {
			if(height > variation.size[1]) {
				Asc.Editor.callMethod("ResizeWindow", [aiModelEditWindow.id, [variation.size[0] - 2, height]]);	//2 is the border-width at the window
			}
		});
		aiModelEditWindow.attachEvent('onOpenCustomProvidersModal', onOpenCustomProvidersModal);
	}
	aiModelEditWindow.show(variation);
}

/**
 * CUSTOM PROVIDERS WINDOW
 */
function onOpenCustomProvidersModal() {
	let variation = {
		url : 'customProviders.html',
		description : window.Asc.plugin.tr('Custom providers'),
		isVisual : true,
		buttons : [ 
			{ text: window.Asc.plugin.tr('Back'), primary: false },
		],
		isModal : true,
		EditorsSupport : ["word", "slide", "cell", "pdf"],
		size : [350, 222]
	};

	if (!customProvidersWindow) {
		customProvidersWindow = new window.Asc.PluginWindow();
		customProvidersWindow.attachEvent("onInit", function() {
			customProvidersWindow.command('onSetCustomProvider', AI.getCustomProviders());
		});
		customProvidersWindow.attachEvent("onAddCustomProvider", function(item) {
			let isError = !AI.addCustomProvider(item.content);
			if (isError) {
				customProvidersWindow.command('onErrorCustomProvider');
			} else {
				customProvidersWindow.command('onSetCustomProvider', AI.getCustomProviders());

				if (aiModelEditWindow)
					aiModelEditWindow.command('onProvidersUpdate', { providers : AI.serializeProviders() });
			}
		});
		customProvidersWindow.attachEvent("onDeleteCustomProvider", function(item) {
			AI.removeCustomProvider(item.name);

			if (aiModelEditWindow)
				aiModelEditWindow.command('onProvidersUpdate', { providers : AI.serializeProviders() });
		});
	}
	customProvidersWindow.show(variation);
}

/**
 * SUMMARIZATION WINDOW
 */
function onOpenSummarizationModal() {
	let variation = {
		url : 'summarization.html',
		description : window.Asc.plugin.tr('Summarization'),
		isVisual : true,
		buttons : [],
		isModal : true,
		EditorsSupport : ["word", "slide", "cell", "pdf"],
		size : [720, 310]
	};

	summarizationWindow = new window.Asc.PluginWindow();
	summarizationWindow.attachEvent("onInit", async function() {
		let content = await Asc.Library.GetSelectedText();
		summarizationWindow && summarizationWindow.command("onGetSelection", content);
	});
	summarizationWindow.attachEvent("Summarize", async function(content) {
		let requestEngine = AI.Request.create(AI.ActionType.Summarization);
		if (!requestEngine) {
			summarizationWindow.command("onSummarize", {
				error : 1,
				message : "Please, select the model for this action."
			});
			return;
		}

		let isError = false;
		requestEngine.setErrorHandler(function(data){
			summarizationWindow && summarizationWindow.command("onSummarize", data);
			isError = true;
		});

		let prompt = Asc.Prompts.getSummarizationPrompt(content.data, content.lang);
		let result = await requestEngine.chatRequest(prompt);

		if (isError)
			return;

		if (!result) {
			summarizationWindow.command("onSummarize", {
				error : 1,
				message : "Empty result"
			});
			return;
		}

		summarizationWindow && summarizationWindow.command("onSummarize", {
			error : 0,
			data : result
		});
	});
	summarizationWindow.attachEvent("onSummarize", async function(data) {
		switch (data.type) {
		case "review": {
			if (Asc.plugin.info.editorType === "word")
				await Asc.Library.InsertAsReview(data.data);
			else
				await Asc.Library.InsertAsComment(data.data);
			break;
		}
		case "comment": {
			await Asc.Library.InsertAsComment(data.data);
			break;
		}
		case "replace": {
			await Asc.Library.PasteText(data.data);
			break;
		}
		case "end": {
			await Asc.Library.InsertAsText(data.data);
			break;
		}
		}
	});	

	summarizationWindow.show(variation);
}
