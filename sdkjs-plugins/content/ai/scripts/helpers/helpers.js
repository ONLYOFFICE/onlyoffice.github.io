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

var HELPERS = {};

HELPERS.word = [];
HELPERS.word.push((function(){
	let func = new RegisteredFunction({
		"name": "addImage",
		"description": "Generate an image from text and insert it at the current cursor position. Width and height are in millimeters.",
		"parameters": {
			"type": "object",
			"properties": {
				"description": {
					"type": "string",
					"description": "Text description of the image to generate."
				},
				"width": {
					"type": "number",
					"description": "Image width in millimeters.",
					"default": 100
				},
				"height": {
					"type": "number",
					"description": "Image height in millimeters.",
					"default": 100
				},
				"style": {
					"type": "string",
					"description": "Image style (realistic, cartoon, abstract, etc.).",
					"default": "realistic"
				}
			},
			"required": ["description"]
		},
		"examples": [
			{
				"prompt": "Add an image of a sunset",
				"arguments": { "description": "sunset over mountains" }
			},
			{
				"prompt": "Create a cartoon-style team image",
				"arguments": { "description": "team of office workers", "style": "cartoon", "width": 180, "height": 120 }
			},
			{
				"prompt": "Add a realistic photo of a laptop",
				"arguments": { "description": "realistic photo of a laptop on a wooden desk", "style": "realistic", "width": 120, "height": 80 }
			},
			{
				"prompt": "Generate an abstract background",
				"arguments": { "description": "abstract geometric background with vibrant colors", "style": "abstract" }
			}
		]
	});

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
					let doc = Api.GetDocument();
					doc.ReplaceCurrentImage(Asc.scope.imageUrl, Asc.scope.width, Asc.scope.height);
				});
				await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
			}
		} catch (error) {
		}

	};

	return func;
})());
HELPERS.word.push((function(){
	let func = new RegisteredFunction({
		"name": "checkSpelling",
		"description": "Checks spelling and fixes text errors in the current paragraph.",
		"parameters": {
			"type": "object",
			"properties": {},
			"required": []
		},
		"examples": [
			{
				"prompt": "Check spelling in this paragraph",
				"arguments": {}
			},
			{
				"prompt": "Fix grammar in current paragraph",
				"arguments": {}
			},
			{
				"prompt": "Check for text errors",
				"arguments": {}
			}
		]
	});
	
	func.call = async function(params) {

		let text = await Asc.Editor.callCommand(function(){
			let par = Api.GetDocument().GetCurrentParagraph();
			if (!par)
				return "";
			par.Select();
			return par.GetText();
		});

		let argPromt = "Check spelling and grammar for text:" + ":\n" + text + "\n Answer with only the new corrected text, no need of any explanations.";

		let isTrackChanges = await Asc.Editor.callCommand(function(){
			let isOn = Api.GetDocument().IsTrackRevisions();
			if (isOn)
				Api.GetDocument().SetTrackRevisions(false);
			return isOn;
		});

		let requestEngine = AI.Request.create(AI.ActionType.Chat);
		if (!requestEngine)
			return;

		await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

		await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);

		let isSendedEndLongAction = false;
		async function checkEndAction() {
			if (!isSendedEndLongAction) {
				await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
				isSendedEndLongAction = true
			}
		}

		let resultText = "";

		let result = await requestEngine.chatRequest(argPromt, false, async function(data) {
			if (!data)
				return;
			await checkEndAction();

			resultText += data;

			await Asc.Editor.callMethod("EndAction", ["GroupActions", "", "cancel"]);
			await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

			Asc.scope.text = resultText;
			await Asc.Editor.callCommand(function(){
				let par = Api.GetDocument().GetCurrentParagraph();
				if (!par)
					return "";
				par.Select();					
				Api.ReplaceTextSmart([Asc.scope.text]);
			});
		});

		await checkEndAction();

		await Asc.Editor.callMethod("EndAction", ["GroupActions", "", "cancel"]);
		await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

		Asc.scope.modelName = requestEngine.modelUI.name;
		await Asc.Editor.callCommand(function(){
			return Api.GetDocument().SetAssistantTrackRevisions(true, Asc.scope.modelName);
		});

		Asc.scope.text = resultText;
		await Asc.Editor.callCommand(function(){
			let par = Api.GetDocument().GetCurrentParagraph();
			if (!par)
				return "";
			par.Select();
			Api.ReplaceTextSmart([Asc.scope.text]);
		});

		await Asc.Editor.callCommand(function(){
			return Api.GetDocument().SetAssistantTrackRevisions(false);
		});

		if (isTrackChanges)
		{
			await Asc.Editor.callCommand(function(){
				Api.GetDocument().SetTrackRevisions(true);
			});
		}

		await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
	};
	
	return func;
})());
HELPERS.word.push((function(){
	let func = new RegisteredFunction({
		"name": "commentText",
		"description": "Adds a comment or footnote to explain or annotate the selected text. If no text is selected, works with the current paragraph.",
		"parameters": {
			"type": "object",
			"properties": {
				"prompt": {
					"type": "string",
					"description": "The instruction for what to explain or comment about the text."
				},
				"type": {
					"type": "string",
					"enum": ["comment", "footnote"],
					"description": "Whether to add as a comment or as a footnote.",
					"default": "comment"
				}
			},
			"required": ["prompt"]
		},
		"examples": [
			{
				"prompt": "Explain this text",
				"arguments": { "prompt": "Explain this text", "type": "comment" }
			},
			{
				"prompt": "Add a historical context as footnote",
				"arguments": { "prompt": "Add historical context", "type": "footnote" }
			},
			{
				"prompt": "Comment on the significance",
				"arguments": { "prompt": "Explain significance", "type": "comment" }
			}
		]
	});
	
	func.call = async function(params) {
		let type = params.type;
		let isFootnote = "footnote" === type;

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

		let argPromt = params.prompt + ":\n" + text;

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

		if (isFootnote)
		{
			let addFootnote = true;
			let result = await requestEngine.chatRequest(argPromt, false, async function(data) {
				if (!data)
					return;

				await checkEndAction();
				Asc.scope.data = data;
				Asc.scope.model = requestEngine.modelUI.name;

				if (addFootnote)
				{
					await Asc.Editor.callCommand(function(){
						Api.GetDocument().AddFootnote();
					});
					addFootnote = false;
				}
				await Asc.Library.PasteText(data);
			});
		}
		else 
		{
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
		}

		await checkEndAction();
		await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
	};

	return func;
})());
HELPERS.word.push((function(){
	let func = new RegisteredFunction({
		"name": "insertPage",
		"description": "Inserts a blank page at the specified location in the document.",
		"parameters": {
			"type": "object",
			"properties": {
				"location": {
					"type": "string",
					"enum": ["current", "start", "end"],
					"description": "Where to insert the new page ('current', 'start', or 'end').",
					"default": "current"
				}
			},
			"required": ["location"]
		},
		"examples": [
			{
				"prompt": "Insert a blank page at current position",
				"arguments": { "location": "current" }
			}, 
			{
				"prompt": "Add a new page at the end",
				"arguments": { "location": "end" }
			},
			{
				"prompt": "Add a page at the beginning",
				"arguments": { "location": "start" }
			}
		],
		"returns": {
			"type": "object",
			"description": "An object indicating whether the page was successfully inserted.",
			"properties": {
				"isApply": {
					"type": "boolean",
					"description": "Indicates whether the blank page was successfully inserted at the specified location."
				}
			},
			"required": ["isApply"]
		}
	});
	
	func.call = async function(params) {
		Asc.scope.location = params.location;

		await Asc.Editor.callCommand(function(){
			let doc = Api.GetDocument();
			if ("start" === Asc.scope.location)
				doc.MoveCursorToStart();
			else if ("end" === Asc.scope.location)
				doc.MoveCursorToEnd();

			Api.GetDocument().InsertBlankPage();
		});
	};
	
	return func;
})());
HELPERS.word.push((function(){
	let func = new RegisteredFunction({
		"name": "changeParagraphStyle",
		"description": "Changes the style of a specified paragraph in the document. If no paragraph number is provided, affects the current paragraph.",
		"parameters": {
			"type": "object",
			"properties": {
				"parNumber": {
					"type": "number",
					"description": "The paragraph number to apply style changes to. If not provided, the current paragraph will be used."
				},
				"style": {
					"type": "string",
					"description": "The style name to apply to the paragraph (e.g., 'Heading 1', 'Normal', etc.)."
				}
			},
			"required": ["style"]
		},
		"examples": [
			{
				"prompt": "Change paragraph 3 to Heading 1 style",
				"arguments": { "parNumber": 3, "style": "Heading 1" }
			},
			{
				"prompt": "Apply Normal style to paragraph 2",
				"arguments": { "parNumber": 2, "style": "Normal" }
			},
			{
				"prompt": "Make paragraph 5 a heading",
				"arguments": { "parNumber": 5, "style": "Heading 2" }
			},
			{
				"prompt": "Change current paragraph to heading style",
				"arguments": { "style": "Heading 1" }
			}
		]
	});
	
	func.call = async function(params) {
		Asc.scope.parNumber = params.parNumber;
		Asc.scope.styleName = params.style;
		await Asc.Editor.callCommand(function(){
			let doc = Api.GetDocument();
			let par = undefined === Asc.scope.parNumber ? doc.GetCurrentParagraph() : doc.GetElement(Asc.scope.parNumber - 1);
			if (!par)
				return;
			let style = doc.GetStyle(Asc.scope.styleName);
			par.SetStyle(style);
		});
	};

	return func;
})());
HELPERS.word.push((function(){
	let func = new RegisteredFunction({
		"name": "rewriteText",
		"description": "Use this function when you asked to rewrite or replace some text. If text or paragraph number is not specified assume that we are working with the current paragraph.",
		
		"parameters": {
			"type": "object",
			"properties": {
				"parNumber": {
					"type": "number",
					"description": "The paragraph number to change."
				},
				"prompt": {
					"type": "string",
					"description": "Instructions on how to change the text."
				},
				"showDifference": {
					"type": "boolean",
					"description": "Whether to show the difference between the original and new text, or just replace it."
				},
				"type": {
					"type": "string",
					"enum": ["sentence", "paragraph"],
					"default": "paragraph",
					"description": "Which part of the text to be rewritten (e.g., 'sentence' or 'paragraph')."
				}
			},
			"required": ["prompt"]
		},
		"examples": [
			{
				"prompt": "Rewrite this text",
				"arguments": { "prompt": "Rewrite", "type": "paragraph" }
			},
			{
				"prompt": "Rephrase this sentence differently",
				"arguments": { "prompt": "rephrase sentence", "type": "sentence" }
			},
			{
				"prompt": "Show me how you would rephrase this sentence",
				"arguments": { "prompt": "rephrase sentence", "type": "sentence", "showDifference": true }
			},
			{
				"prompt": "Make paragraph 2 more emotional",
				"arguments": { "parNumber": 2, "prompt": "make the text more emotional", "type": "paragraph" }
			},
			{
				"prompt": "Rephrase the first paragraph",
				"arguments": { "parNumber": 1, "prompt": "Rephrase", "type": "paragraph" }
			},
			{
				"prompt": "Make this paragraph more formal",
				"arguments": { "prompt": "Rewrite in official style", "type": "paragraph" }
			}
		]
	});
	
	func.call = async function(params) {
		let text = "";
		if ("paragraph" === params.type)
		{
			Asc.scope.parNumber = params.parNumber;
			text = await Asc.Editor.callCommand(function(){
				let doc = Api.GetDocument();
				let par = undefined === Asc.scope.parNumber ? doc.GetCurrentParagraph() : doc.GetElement(Asc.scope.parNumber - 1);
				if (!par)
					return "";
				par.Select();
				return par.GetText();
			});
		}
		else // if ("sentence" === params.type)
		{
			text = await Asc.Editor.callCommand(function(){
				return Api.GetDocument().GetCurrentSentence();
			});
		}

		let argPromt = params.prompt + ":\n" + text + "\n Answer with only the new one sentence, no need of any explanations";

		let requestEngine = AI.Request.create(AI.ActionType.Chat);
		if (!requestEngine)
			return;

		await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

		let turnOffTrackChanges = false;
		if (params.showDifference)
		{
			let isTrackChanges = await Asc.Editor.callCommand(function(){
				return Api.GetDocument().IsTrackRevisions();
			});

			if (!isTrackChanges)
			{
				await Asc.Editor.callCommand(function(){
					Api.GetDocument().SetTrackRevisions(true);
				});
				turnOffTrackChanges = true;
			}
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

			if (text && "sentence" === params.type)
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

		if (turnOffTrackChanges)
			await Asc.Editor.callCommand(function(){return Api.GetDocument().SetTrackRevisions(false);});

		await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
	};

	return func;
})());
HELPERS.word.push((function(){
	let func = new RegisteredFunction({
		"name": "changeTextStyle",
		"description": "Changes the style of the selected text, including bold, italic, underline, strikethrough, and font size.",
		"parameters": {
			"type": "object",
			"properties": {
				"bold": {
					"type": "boolean",
					"description": "Whether to make the text bold (true to enable, false to disable)."
				},
				"italic": {
					"type": "boolean",
					"description": "Whether to make the text italic (true to enable, false to disable)."
				},
				"underline": {
					"type": "boolean",
					"description": "Whether to underline the text (true to enable, false to disable)."
				},
				"strikeout": {
					"type": "boolean",
					"description": "Whether to strike through the text (true to enable, false to disable)."
				},
				"fontSize": {
					"type": "number",
					"description": "The font size to apply to the selected text.",
					"minimum": 1,
					"maximum": 200
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Make selected text bold and italic",
				"arguments": { "bold": true, "italic": true }
			},
			{
				"prompt": "Underline selected text",
				"arguments": { "underline": true }
			},
			{
				"prompt": "Strike out selected text",
				"arguments": { "strikeout": true }
			},
			{
				"prompt": "Set font size to 18",
				"arguments": { "fontSize": 18 }
			},
			{
				"prompt": "Remove italics",
				"arguments": { "italic": false }
			}
		],
		"returns": {
			"type": "object",
			"description": "An object indicating which styles were changed.",
			"properties": {
				"isApply": {
					"type": "boolean",
					"description": "Indicates whether the text style was changed."
				}
			},
			"required": ["isApply"]		
		}
	});
	
	func.call = async function(params) {
		Asc.scope.params = params;
		await Asc.Editor.callCommand(function(){
			let doc = Api.GetDocument();
			let range = doc.GetRangeBySelect();
			if (!range || "" === range.GetText())
			{
				doc.SelectCurrentWord();
				range = doc.GetRangeBySelect();
			}

			if (!range)
				return;

			let props = Asc.scope.params;

			if (undefined !== props.bold)
				range.SetBold(props.bold);

			if (undefined !== props.italic)
				range.SetItalic(props.italic);

			if (undefined !== props.underline)
				range.SetUnderline(props.underline);

			if (undefined !== props.strikeout)
				range.SetStrikeout(props.strikeout);

			if (undefined !== props.fontSize)
				range.SetFontSize(props.fontSize);
		});
	};

	return func;
})());


HELPERS.slide = [];
HELPERS.slide.push((function(){
	let func = new RegisteredFunction({
		"name": "addChartToSlide",
		"description": "Adds a chart to the slide (152x89mm, centered)",
		"parameters": {
			"type": "object",
			"properties": {
				"slideNumber": {
					"type": "number",
					"description": "slide number to add chart to (optional, defaults to current)",
					"minimum": 1
				},
				"chartType": {
					"type": "string",
					"description": "type of chart - bar, barStacked, barStackedPercent, bar3D, barStacked3D, barStackedPercent3D, barStackedPercent3DPerspective, horizontalBar, horizontalBarStacked, horizontalBarStackedPercent, horizontalBar3D, horizontalBarStacked3D, horizontalBarStackedPercent3D, lineNormal, lineStacked, lineStackedPercent, line3D, pie, pie3D, doughnut, scatter, stock, area, areaStacked, areaStackedPercent"
				},
				"data": {
					"type": "array",
					"description": "2D array of numeric data values - all sub-arrays must have same length, number of arrays must match series count"
				},
				"series": {
					"type": "array",
					"description": "array of series names - must have same length as data arrays count"
				},
				"categories": {
					"type": "array",
					"description": "array of category names - must have same length as each data array"
				},
				"prompt": {
					"type": "string",
					"description": "description of what kind of data to generate for the chart"
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "add a bar chart showing sales data on slide 2",
				"arguments": {"slideNumber": 2, "chartType": "bar3D", "data": [[100, 120, 140], [90, 110, 130]], "series": ["Product A", "Product B"], "categories": ["Q1", "Q2", "Q3"]}
			},
			{
				"prompt": "add a pie chart on current slide",
				"arguments": {"chartType": "pie", "data": [[30, 25, 20, 15, 10]], "series": ["Market Share"], "categories": ["Company A", "Company B", "Company C", "Company D", "Others"]}
			},
			{
				"prompt": "add a line chart with 3 series and 4 data points",
				"arguments": {"chartType": "lineNormal", "data": [[10, 20, 30, 40], [15, 25, 35, 45], [12, 22, 32, 42]], "series": ["Series 1", "Series 2", "Series 3"], "categories": ["Jan", "Feb", "Mar", "Apr"]}
			},
			{
				"prompt": "add chart with AI generated data",
				"arguments": {"slideNumber": 3, "chartType": "lineNormal", "prompt": "Create monthly revenue data for 2024 showing steady growth from $50k to $120k"}
			}
		]
	});
	
	func.call = async function (params) {
		Asc.scope.params = params;

		if (params.prompt && !params.data) {
			let requestEngine = AI.Request.create(AI.ActionType.Chat);
			if (!requestEngine) return;

			let isSendedEndLongAction = false;

			async function checkEndAction() {
				if (!isSendedEndLongAction) {
					let actionName = "AI" + (requestEngine.modelUI && requestEngine.modelUI.name ? " (" + requestEngine.modelUI.name + ")" : " (Chart Generation)");
					await Asc.Editor.callMethod("EndAction", ["Block", actionName]);
					isSendedEndLongAction = true;
				}
			}

			let actionName = "AI" + (requestEngine.modelUI && requestEngine.modelUI.name ? " (" + requestEngine.modelUI.name + ")" : " (Chart Generation)");
			await Asc.Editor.callMethod("StartAction", ["Block", actionName]);
			await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

			try {
				let chartPrompt = "Generate chart data for the following request: " + params.prompt + "\n\nReturn ONLY a JSON object in this exact format (no other text):\n" + "{\n" + "  \"data\": [[number, number, ...], [number, number, ...]],\n" + "  \"series\": [\"Series1\", \"Series2\", ...],\n" + "  \"categories\": [\"Category1\", \"Category2\", ...]\n" + "}\n\n" + "IMPORTANT RULES:\n" + "1. The number of arrays in 'data' MUST equal the number of items in 'series'\n" + "2. ALL arrays in 'data' MUST have exactly the same length\n" + "3. The number of items in 'categories' MUST equal the length of each data array\n" + "Example: if data=[[10,20,30],[40,50,60]], then series must have 2 names and categories must have 3 names";

				let generatedData = await requestEngine.chatRequest(chartPrompt, false);

				await checkEndAction();

				try {
					let parsedData = JSON.parse(generatedData);
					Asc.scope.params.data = parsedData.data;
					Asc.scope.params.series = parsedData.series;
					Asc.scope.params.categories = parsedData.categories;

					let dataLength = Asc.scope.params.data.length;
					let seriesLength = Asc.scope.params.series.length;
					let pointsLength = Asc.scope.params.data[0] ? Asc.scope.params.data[0].length : 0;
					let categoriesLength = Asc.scope.params.categories.length;

					for (let i = 1; i < Asc.scope.params.data.length; i++) {
						if (Asc.scope.params.data[i].length !== pointsLength) {
							while (Asc.scope.params.data[i].length < pointsLength) {
								Asc.scope.params.data[i].push(0);
							}
							Asc.scope.params.data[i] = Asc.scope.params.data[i].slice(0, pointsLength);
						}
					}

					if (dataLength !== seriesLength) {
						while (Asc.scope.params.series.length < dataLength) {
							Asc.scope.params.series.push("Series " + (Asc.scope.params.series.length + 1));
						}
						Asc.scope.params.series = Asc.scope.params.series.slice(0, dataLength);
					}

					if (pointsLength !== categoriesLength) {
						while (Asc.scope.params.categories.length < pointsLength) {
							Asc.scope.params.categories.push("Cat " + (Asc.scope.params.categories.length + 1));
						}
						Asc.scope.params.categories = Asc.scope.params.categories.slice(0, pointsLength);
					}
				} catch (e) {
					Asc.scope.params.data = [[100, 120, 140], [90, 110, 130]];
					Asc.scope.params.series = ["Series 1", "Series 2"];
					Asc.scope.params.categories = ["Cat 1", "Cat 2", "Cat 3"];
				}
			} catch (error) {
				await checkEndAction();
				Asc.scope.params.data = [[100, 120, 140], [90, 110, 130]];
				Asc.scope.params.series = ["Series 1", "Series 2"];
				Asc.scope.params.categories = ["Cat 1", "Cat 2", "Cat 3"];
			}

			await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
		}

		await Asc.Editor.callCommand(function () {
			let presentation = Api.GetPresentation();
			let slide;

			if (Asc.scope.params.slideNumber) {
				slide = presentation.GetSlideByIndex(Asc.scope.params.slideNumber - 1);
			}
			else {
				slide = presentation.GetCurrentSlide();
			}

			if (!slide) return;

			let chartType = Asc.scope.params.chartType || "bar3D";
			let data = Asc.scope.params.data || [[100, 120, 140], [90, 110, 130]];
			let series = Asc.scope.params.series || ["Series 1", "Series 2"];
			let categories = Asc.scope.params.categories || ["Category 1", "Category 2", "Category 3"];

			if (!data || data.length === 0 || !data[0] || data[0].length === 0) {
				data = [[100, 120, 140], [90, 110, 130]];
				series = ["Series 1", "Series 2"];
				categories = ["Category 1", "Category 2", "Category 3"];
			}

			if (data.length > 0 && data[0].length > 0) {
				let dataLength = data.length;
				let pointsLength = data[0].length;

				for (let i = 1; i < data.length; i++) {
					if (data[i].length !== pointsLength) {
						while (data[i].length < pointsLength) {
							data[i].push(0);
						}
						data[i] = data[i].slice(0, pointsLength);
					}
				}

				if (series.length !== dataLength) {
					while (series.length < dataLength) {
						series.push("Series " + (series.length + 1));
					}
					series = series.slice(0, dataLength);
				}

				if (categories.length !== pointsLength) {
					while (categories.length < pointsLength) {
						categories.push("Category " + (categories.length + 1));
					}
					categories = categories.slice(0, pointsLength);
				}
			}

			let slideWidth = presentation.GetWidth();
			let slideHeight = presentation.GetHeight();
			let width = 5472000;
			let height = 3204000;

			let x = (slideWidth - width) / 2;
			let y = (slideHeight - height) / 2;

			let chart = Api.CreateChart(chartType, data, series, categories, width, height, 24);

			if (chart) {
				chart.SetPosition(x, y);
				slide.AddObject(chart);
			}
		});
	};
	return func;
})());
HELPERS.slide.push((function(){
	let func = new RegisteredFunction({
		"name": "addNewSlide",
		"description": "Adds a new slide at the end of presentation using default layout from current slide's master",
		"parameters": {
			"type": "object",
			"properties": {
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Add new slide",
				"arguments": {}
			}
		]
	});
	
	func.call = async function(params) {
		Asc.scope.params = params;
		await Asc.Editor.callCommand(function () {
				let presentation = Api.GetPresentation();
				let currentSlide = presentation.GetCurrentSlide();
				let master;
				if (currentSlide) {
					currentSlide = presentation.GetSlideByIndex(0);
					let curLayout = currentSlide.GetLayout();
					master = curLayout.GetMaster();
				}
				else {
					master = presentation.GetMasterByIndex(0);
				}
				if (!master) {
					return;
				}

				let layout = master.GetLayoutByType("obj");
				if (!layout) {
					let layoutsCount = master.GetLayoutsCount();
					if (layoutsCount > 0) {
						layout = master.GetLayout(0);
					}
				}

				if (!layout) return;
				let newSlide = Api.CreateSlide();

				if (layout) {
					newSlide.ApplyLayout(layout);
				}

				presentation.AddSlide(newSlide);
		});
	};

	return func;
})());
HELPERS.slide.push((function(){
	let func = new RegisteredFunction({
		"name": "addShapeToSlide",
		"description": "Adds a shape to the slide with optional text (139x42mm, centered, blue fill with dark border)",
		"parameters": {
			"type": "object",
			"properties": {
				"slideNumber": {
					"type": "number",
					"description": "Slide number to add shape to",
					"minimum": 1
				},
				"shapeType": {
					"type": "string",
					"description": "shape type - rect, roundRect, ellipse, triangle, diamond, pentagon, hexagon, star5, plus, mathMinus, mathMultiply, mathEqual, mathNotEqual, heart, cloud, leftArrow, rightArrow, upArrow, downArrow, leftRightArrow, chevron, bentArrow, curvedRightArrow, blockArc, wedgeRectCallout, cloudCallout, ribbon, wave, can, cube, pie, donut, sun, moon, smileyFace, lightningBolt, noSmoking"
				},
				"text": {
					"type": "string",
					"description": "text to add to the shape"
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "add a rectangle with text on slide 2",
				"arguments": { "slideNumber": 2, "shapeType": "rect" }
			},
			{
				"prompt": "add a star shape on current slide",
				"arguments": { "shapeType": "star5" }
			},
			{
				"prompt": "add a rounded rectangle with text",
				"arguments": { "text": "Key Message" }
			},
			{
				"prompt": "add a diamond shape with text",
				"arguments": { "shapeType": "diamond", "text": "Decision Point" }
			},
			{
				"prompt": "add a right arrow with text",
				"arguments": { "shapeType": "rightArrow", "text": "Next Step" }
			}
		]
	});
	
	func.call = async function(params) {
		Asc.scope.params = params;
		await Asc.Editor.callCommand(function () {
				let presentation = Api.GetPresentation();
				let slide;

				if (Asc.scope.params.slideNumber) {
					slide = presentation.GetSlideByIndex(Asc.scope.params.slideNumber - 1);
				}
				else {
					slide = presentation.GetCurrentSlide();
				}

				if (!slide) return;

				let slideWidth = presentation.GetWidth();
				let slideHeight = presentation.GetHeight();

				let shapeType = Asc.scope.params.shapeType || "rect";
				let width = 2500000;
				let height = 2500000;
				let x = (slideWidth - width) / 2;
				let y = (slideHeight - height) / 2;

				let fill = Api.CreateSolidFill(Api.CreateSchemeColor("accent1"));
				let stroke = Api.CreateStroke(12700, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));

				let shape = Api.CreateShape(shapeType, width, height, fill, stroke);
				shape.SetPosition(x, y);

				if (Asc.scope.params.text) {
					let docContent = shape.GetDocContent();
					if (docContent) {
						let paragraph = docContent.GetElement(0);
						if (!paragraph) {
							paragraph = Api.CreateParagraph();
							docContent.Push(paragraph);
						}
						paragraph.SetJc("center");
						paragraph.AddText(Asc.scope.params.text);
						shape.SetVerticalTextAlign("center");
					}
				}
				slide.AddObject(shape);
		});
	};

	return func;
})());
HELPERS.slide.push((function(){
	let func = new RegisteredFunction({
		"name": "addTableToSlide",
		"description": "Adds a table to the slide (194x97mm, centered)",
		"parameters": {
			"type": "object",
			"properties": {
				"slideNumber": {
					"type": "number",
					"description": "the slide number to add table",
					"minimum": 1
				},
				"rows": {
					"type": "number",
					"description": "number of rows"
				},
				"columns": {
					"type": "number",
					"description": "number of columns"
				},
				"data": {
					"type": "array",
					"description": "2D array of cell values - rows x columns"
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "add a 3x3 table on slide 2",
				"arguments": {"slideNumber": 2, "rows": 3, "columns": 3}
			},
			{
				"prompt": "add a table with data on current slide",
				"arguments": {"data": [["Name", "Age", "City"], ["John", "30", "New York"], ["Jane", "25", "London"]]}
			}
		]
	});
	
	func.call = async function (params) {
		Asc.scope.params = params;

		await Asc.Editor.callCommand(function () {
			let presentation = Api.GetPresentation();
			let slide;

			if (Asc.scope.params.slideNumber) {
				slide = presentation.GetSlideByIndex(Asc.scope.params.slideNumber - 1);
			}
			else {
				slide = presentation.GetCurrentSlide();
			}

			if (!slide) return;

			let slideWidth = presentation.GetWidth();
			let slideHeight = presentation.GetHeight();

			let data = Asc.scope.params.data;
			let rows = Asc.scope.params.rows || 3;
			let columns = Asc.scope.params.columns || 3;

			if (data && Array.isArray(data) && data.length > 0) {
				rows = data.length;
				if (data[0] && Array.isArray(data[0])) {
					columns = data[0].length;
				}
			}

			let tableWidth = 7000000;
			let tableHeight = 3500000;
			let x = (slideWidth - tableWidth) / 2;
			let y = (slideHeight - tableHeight) / 2;

			let table = Api.CreateTable(columns, rows);

			if (table) {
				table.SetPosition(x, y);
				table.SetSize(tableWidth, tableHeight);
				let rowHeight = tableHeight / rows;
				if (data && Array.isArray(data)) {
					let rowCount = Math.min(data.length, rows);
					for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
						let row = table.GetRow(rowIdx);
						if (Array.isArray(data[rowIdx])) {
							let cellCount = Math.min(data[rowIdx].length, columns);
							for (let col = 0; col < cellCount; col++) {
								let cell = row.GetCell(col);
								if (cell) {
									let cellContent = cell.GetContent();
									if (cellContent) {
										cellContent.RemoveAllElements();
										let paragraph = Api.CreateParagraph();
										let value = data[rowIdx][col];
										if (value !== null && value !== undefined) {
											paragraph.AddText(value);
											cellContent.Push(paragraph);
										}
									}
								}
							}
						}
					}
				}

				slide.AddObject(table);
			}
		});
	};
	return func;
})());
HELPERS.slide.push((function(){
	let func = new RegisteredFunction({
		"name": "addTextToPlaceholder",
		"description": "Universal function for adding ANY text content to slides. Use this for ALL text addition requests: recipes, lists, instructions, notes, ideas, or any other text content.",
		"parameters": {
			"type": "object",
			"properties": {
				"slideNumber": {
					"type": "number",
					"description": "the slide number to add text to (optional, default current slide)",
					"minimum": 1
				},
				"text": {
					"type": "string",
					"description": "ANY text content to add - recipes, lists, instructions, notes, ideas, descriptions, stories, data, or whatever user asks to add"
				},
				"textType": {
					"type": "string",
					"description": "type of text - 'body', 'chart', 'clipArt', 'ctrTitle', 'diagram', 'date', 'footer', 'header', 'media', 'object', 'picture', 'sldImage', 'sldNumber', 'subTitle', 'table', 'title' (optional, default 'body')"
				},
				"prompt": {
					"type": "string",
					"description": "AI instructions for text enhancement or generation (optional)"
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "add [anything] or write [anything] or create text about [anything]'",
				"arguments": {"text": "[generated or specified content]", "textType": "body"}
			},
			{
				"prompt": "add recipe for coffee or just recipe for coffee",
				"arguments": {"text": "Coffee Recipe:\\n1. Grind coffee beans\\n2. Heat water to 95°C\\n3. Pour water over coffee\\n4. Wait 4 minutes\\n5. Enjoy", "textType": "body"}
			},
			{
				"prompt": "generate content",
				"arguments": {"text": "Topic", "textType": "body", "prompt": "generate detailed content about this topic"}
			}
		]
	});
	
	func.call = async function (params) {
		Asc.scope.slideNum = params.slideNumber;
		Asc.scope.text = params.text;
		Asc.scope.textType = params.textType || "body";
		Asc.scope.prompt = params.prompt;

		await Asc.Editor.callCommand(function () {
			let presentation = Api.GetPresentation();
			let slide;

			if (Asc.scope.slideNum) {
				slide = presentation.GetSlideByIndex(Asc.scope.slideNum - 1);
			}
			else {
				slide = presentation.GetCurrentSlide();
			}

			if (!slide) return;

			const placeholderGroups = {
				titles: ['title', 'ctrTitle'],
				subTitles: ['subTitle'],
				content: ['body', 'object', 'unknown'],
				media: ['picture', 'chart', 'media', 'clipArt', 'diagram', 'sldImage', 'table'],
				footer: ['footer', 'date', 'sldNumber', 'header']
			};

			function findPlaceholderGroup(type) {
				for (let groupName in placeholderGroups) {
					if (placeholderGroups[groupName].includes(type)) {
						return placeholderGroups[groupName];
					}
				}
				return [type];
			}

			function findShapeByPlaceholderType(slide, placeholderTypes) {
				let allDrawings = slide.GetAllDrawings();

				for (let type of placeholderTypes) {
					for (let i = 0; i < allDrawings.length; i++) {
						let drawing = allDrawings[i];

						let ph = drawing.GetPlaceholder();
						if (ph) {
							if (ph.GetType() === type) {
								return {shape: drawing, foundType: type};
							}
						}
					}
				}

				return null;
			}

			let placeholderGroup = findPlaceholderGroup(Asc.scope.textType);

			let searchResult = findShapeByPlaceholderType(slide, placeholderGroup);
			let targetShape = searchResult ? searchResult.shape : null;
			let foundType = searchResult ? searchResult.foundType : null;

			if (!targetShape && !placeholderGroups.content.includes(Asc.scope.textType)) {
				searchResult = findShapeByPlaceholderType(slide, placeholderGroups.content);
				targetShape = searchResult ? searchResult.shape : null;
				foundType = searchResult ? searchResult.foundType : null;
			}

			let bNewShape = false;
			if (!targetShape) {
				let slideWidth = presentation.GetWidth();
				let slideHeight = presentation.GetHeight();

				let sizes = {
					title: {width: 0.8, height: 0.1},
					ctrTitle: {width: 0.8, height: 0.1},
					subTitle: {width: 0.8, height: 0.08},
					body: {width: 0.8, height: 0.6},
					object: {width: 0.8, height: 0.6},
					picture: {width: 0.5, height: 0.4},
					chart: {width: 0.6, height: 0.5},
					table: {width: 0.8, height: 0.6},
					media: {width: 0.6, height: 0.5},
					clipArt: {width: 0.3, height: 0.3},
					diagram: {width: 0.7, height: 0.5},
					sldImage: {width: 0.6, height: 0.5},
					footer: {width: 0.8, height: 0.06},
					header: {width: 0.8, height: 0.06},
					date: {width: 0.2, height: 0.04},
					sldNumber: {width: 0.1, height: 0.04}
				};

				let size = sizes[Asc.scope.textType] || sizes.body;
				let shapeWidth = slideWidth * size.width;
				let shapeHeight = slideHeight * size.height;
				let x = (slideWidth - shapeWidth) / 2;
				let y = (slideHeight - shapeHeight) / 2;

				let oFill = Api.CreateNoFill();
				let oStroke = Api.CreateStroke(0, Api.CreateNoFill());
				targetShape = Api.CreateShape("rect", shapeWidth, shapeHeight, oFill, oStroke);
				targetShape.SetPosition(x, y);

				slide.AddObject(targetShape);
				foundType = Asc.scope.textType;
				bNewShape = true;
			}

			let docContent = targetShape.GetDocContent();
			if (docContent) {
				let internalContent = docContent.Content || docContent;

				while (internalContent.GetElementsCount() > 1) {
					internalContent.RemoveElement(1);
				}

				let lines = Asc.scope.text.split('\n').filter(line => line.trim() !== '');

				if (lines.length === 1) {
					let paragraph = internalContent.GetElement(0);
					if (paragraph) {
						paragraph.RemoveAllElements();
						paragraph.AddText(lines[0]);
					}
				}
				else {
					let firstParagraph = internalContent.GetElement(0);
					if (firstParagraph) {
						firstParagraph.RemoveAllElements();
						let run = firstParagraph.AddText(lines[0]);
						if (bNewShape) {
							run.SetFill(Api.CreateSolidFill(Api.CreateSchemeColor("tx1")));
						}
					}

					for (let i = 1; i < lines.length; i++) {
						let newParagraph = Api.CreateParagraph();
						let run = newParagraph.AddText(lines[i]);
						if (bNewShape) {
							run.SetFill(Api.CreateSolidFill(Api.CreateSchemeColor("tx1")));
						}
						internalContent.Push(newParagraph);
					}
				}

				return;
			}

			return;
		});

	};
	return func;
})());
HELPERS.slide.push((function(){
	let func = new RegisteredFunction({
		"name": "addImageByDescription",
		"description": "Adds an image on the slide in the presentation",
		"parameters": {
			"type": "object",
			"properties": {
				"slideNumber": {
					"type": "number",
					"description": "the slide number to add generated image to",
					"minimum": 1
				},
				"description": {
					"type": "string",
					"description": "text description of the image to generate"
				},
				"width": {
					"type": "number",
					"description": "image width in mm"
				},
				"height": {
					"type": "number",
					"description": "image height in mm"
				},
				"style": {
					"type": "string",
					"description": "image style (realistic, cartoon, abstract, etc.)"
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "add an image of a sunset over mountains to slide 1",
				"arguments": { "slideNumber": 1, "description": "beautiful sunset over mountain range with orange and purple sky"}
			},
			{
				"prompt": "add a cartoon style image of office workers with custom size",
				"arguments": {"description": "team of diverse office workers collaborating around a table", "style": "cartoon" }
			}
		]
	});
	
	func.call = async function(params) {
		Asc.scope.params = params;
		Asc.scope.description = params.description;

		let widthMm = params.width || 100;
		let heightMm = params.height || 100;
		Asc.scope.width = widthMm * 36000;
		Asc.scope.height = heightMm * 36000;
		Asc.scope.style = params.style || "realistic";

		let widthPx = Math.round((widthMm / 25.4) * 96);
		let heightPx = Math.round((heightMm / 25.4) * 96);

		let requestEngine = null;
		requestEngine = AI.Request.create(AI.ActionType.ImageGeneration);
		if (!requestEngine) {
			return;
		}

		let fullPrompt = Asc.scope.description;
		if (Asc.scope.style && Asc.scope.style !== "realistic") {
			fullPrompt = Asc.scope.style + " style, " + fullPrompt;
		}

		fullPrompt += ", image size " + widthPx + "x" + heightPx + " pixels";

		let aspectRatio = widthPx / heightPx;
		if (aspectRatio > 1.8) {
			fullPrompt += ", wide panoramic format";
		}
		else if (aspectRatio < 0.6) {
			fullPrompt += ", tall vertical format";
		}
		else if (aspectRatio > 0.9 && aspectRatio < 1.1) {
			fullPrompt += ", square format";
		}

		let isSendedEndLongAction = false;

		async function checkEndAction() {
			if (!isSendedEndLongAction) {
				let actionName = "AI (" + requestEngine.modelUI.name + ")";
				await Asc.Editor.callMethod("EndAction", ["Block", actionName]);
				isSendedEndLongAction = true;
			}
		}

		let actionName = "AI (" + requestEngine.modelUI.name + ")";
		await Asc.Editor.callMethod("StartAction", ["Block", actionName]);
		await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

		try {
			let imageUrl;
			imageUrl = await requestEngine.imageGenerationRequest(fullPrompt);

			await checkEndAction();

			if (imageUrl) {
				Asc.scope.imageUrl = imageUrl;
				await Asc.Editor.callCommand(function () {
					let oPresentation = Api.GetPresentation();
					let oSlide;
					if (params.slideNumber !== undefined && params.slideNumber !== null) {
						oSlide = oPresentation.GetSlideByIndex(params.slideNum - 1);
					}
					else {
						oSlide = oPresentation.GetCurrentSlide();
					}
					if (!oSlide) return;

					let slideWidth = oPresentation.GetWidth();
					let slideHeight = oPresentation.GetHeight();

					let x = (slideWidth - Asc.scope.width) / 2;
					let y = (slideHeight - Asc.scope.height) / 2;

					let oImage = Api.CreateImage(Asc.scope.imageUrl, Asc.scope.width, Asc.scope.height);
					oImage.SetPosition(x, y);
					oSlide.AddObject(oImage);
				});
			}
		} catch (error) {
			await checkEndAction();
		}

		await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
	};

	return func;
})());
HELPERS.slide.push((function(){
	let func = new RegisteredFunction({
		"name": "changeSlideBackground",
		"description": "Changes the color of the slide in the presentation.",
		"parameters": {
			"type": "object",
			"properties": {
				"slideNumber": {
					"type": "number",
					"description": "Slide number to apply the color",
					"minimum": 1
				},
				"backgroundType": {
					"type": "string",
					"description": "type of background - 'solid', 'gradient'"
				},
				"color": {
					"type": "string",
					"description": "hex color for solid background (e.g., '#FF5733')"
				},
				"gradientColors": {
					"type": "array",
					"description": "array of hex colors for gradient"
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "set blue background on slide 1",
				"arguments": { "slideNumber": 1, "backgroundType": "solid", "color": "#0066CC" }
			},
			{
				"prompt": "set gradient background",
				"arguments": {"backgroundType": "gradient", "gradientColors": ["#FF0000", "#0000FF"] }
			}
		]
	});
	
	func.call = async function(params) {
		Asc.scope.params = params;
		await Asc.Editor.callCommand(function () {
				let presentation = Api.GetPresentation();
				let slide = presentation.GetSlideByIndex(Asc.scope.params.slideNumber - 1);
				if (!slide) 
					slide = presentation.GetCurrentSlide();
				if (!slide) return;

				let fill;

				switch (Asc.scope.params.backgroundType) {
					case "solid":
						if (Asc.scope.params.color) {
							let rgb = parseInt(Asc.scope.params.color.slice(1), 16);
							let r = (rgb >> 16) & 255;
							let g = (rgb >> 8) & 255;
							let b = rgb & 255;
							fill = Api.CreateSolidFill(Api.CreateRGBColor(r, g, b));
						}
						break;

					case "gradient":
						if (Asc.scope.params.gradientColors && Asc.scope.params.gradientColors.length >= 2) {
							let stops = [];
							let step = 100000 / (Asc.scope.params.gradientColors.length - 1);

							for (let i = 0; i < Asc.scope.params.gradientColors.length; i++) {
								let color = Asc.scope.params.gradientColors[i];
								let rgb = parseInt(color.slice(1), 16);
								let r = (rgb >> 16) & 255;
								let g = (rgb >> 8) & 255;
								let b = rgb & 255;
								let stop = Api.CreateGradientStop(Api.CreateRGBColor(r, g, b), i * step);
								stops.push(stop);
							}

							fill = Api.CreateLinearGradientFill(stops, 5400000);
						}
						break;
				}

				if (fill) {
					slide.SetBackground(fill);
				}
		});
	};

	return func;
})());
HELPERS.slide.push((function(){
	let func = new RegisteredFunction({
		"name": "deleteSlide",
		"description": "Deletes slide with the specific index or current",
		"parameters": {
			"type": "object",
			"properties": {
				"slideNumber": {
					"type": "number",
					"description": "the slide number to delete",
					"minimum": 1
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "delete slide 5",
				"arguments": {"slideNumber": 5}
			}
		]
	});
	
	func.call = async function (params) {
		Asc.scope.slideNum = params.slideNumber;

		await Asc.Editor.callCommand(function () {
			let presentation = Api.GetPresentation();
			let slide = presentation.GetSlideByIndex(Asc.scope.slideNum - 1);
			if (!slide)
				slide = presentation.GetCurrentSlide();
			if (slide) {
				slide.Delete();
			}
		});
	};
	return func;
})());
HELPERS.slide.push((function(){
	let func = new RegisteredFunction({
		"name": "duplicateSlide",
		"description": "Duplicates slide with the specific index or current",
		"parameters": {
			"type": "object",
			"properties": {
				"slideNumber": {
					"type": "number",
					"description": "the slide number to duplicate",
					"minimum": 1
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "delete slide 3",
				"arguments": {"slideNumber": 3}
			}
		]
	});
	
	func.call = async function (params) {
		Asc.scope.slideNum = params.slideNumber;

		await Asc.Editor.callCommand(function () {
			let presentation = Api.GetPresentation();
			let slide = presentation.GetSlideByIndex(Asc.scope.slideNum - 1);
			if (slide) {
				let newSlide = slide.Duplicate(Asc.scope.slideNum);
			}
		});
	};
	return func;
})());


HELPERS.cell = [];
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "addAboveAverage",
		"description": "Highlights cells that contain values above or below the average of all values in the range. This is useful for identifying data points that deviate significantly from the typical values in your dataset.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to apply condition (e.g., 'A1:D10'). If omitted, uses active/selected range."
				},
				"aboveBelow": {
					"type": "boolean",
					"description": "True for above average, false for below average (default: true).",
					"default": true
				},
				"numStdDev": {
					"type": "number",
					"description": "Number of standard deviations from average (default: 0 for simple average).",
					"default": 0
				},
				"fillColor": {
					"type": "object",
					"description": "Background color {r: 255, g: 0, b: 0}.",
					"properties": {
						"r": { "type": "number" },
						"g": { "type": "number" },
						"b": { "type": "number" }
					}
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Highlight cells above average with default color",
				"arguments": {}
			},
			{
				"prompt": "Highlight cells below average with red background",
				"arguments": { "aboveBelow": false, "fillColor": { "r": 255, "g": 0, "b": 0 } }
			},
			{
				"prompt": "When user asks to highlight above/below average values",
				"arguments": { "aboveBelow": true }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "addCellValueCondition",
		"description": "Creates conditional formatting rules based on cell values using comparison operators (greater than, less than, equal to, between, etc.). This is the most flexible conditional formatting option, allowing you to highlight cells that meet specific criteria with custom colors for background and text.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to apply condition (e.g., 'A1:D10'). If omitted, uses active/selected range."
				},
				"operator": {
					"type": "string",
					"description": "Comparison operator - 'xlGreater', 'xlLess', 'xlEqual', 'xlNotEqual', 'xlGreaterEqual', 'xlLessEqual', 'xlBetween', 'xlNotBetween'.",
					"enum": ["xlGreater", "xlLess", "xlEqual", "xlNotEqual", "xlGreaterEqual", "xlLessEqual", "xlBetween", "xlNotBetween"]
				},
				"value1": {
					"type": ["string", "number"],
					"description": "First comparison value or formula."
				},
				"value2": {
					"type": ["string", "number"],
					"description": "Second comparison value for 'xlBetween' and 'xlNotBetween' operators."
				},
				"fillColor": {
					"type": "object",
					"description": "Background color {r: 255, g: 0, b: 0}.",
					"properties": {
						"r": { "type": "number" },
						"g": { "type": "number" },
						"b": { "type": "number" }
					}
				},
				"fontColor": {
					"type": "object",
					"description": "Font color {r: 0, g: 0, b: 0}.",
					"properties": {
						"r": { "type": "number" },
						"g": { "type": "number" },
						"b": { "type": "number" }
					}
				}
			},
			"required": ["operator", "value1"]
		},
		"examples": [
			{
				"prompt": "Highlight cells greater than 10 with red background",
				"arguments": { "operator": "xlGreater", "value1": 10, "fillColor": { "r": 255, "g": 0, "b": 0 } }
			},
			{
				"prompt": "Highlight cells between 5 and 15 with yellow background",
				"arguments": { "range": "A1:D10", "operator": "xlBetween", "value1": 5, "value2": 15, "fillColor": { "r": 255, "g": 255, "b": 0 } }
			},
			{
				"prompt": "When user asks to highlight cells based on values (greater than, less than, equal to)",
				"arguments": { "range": "A1:D10", "operator": "xlGreater", "value1": 100 }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "addChart",
		"description": "Creates charts from data ranges to visualize data. Supports multiple chart types including bar charts, line charts, pie charts, scatter plots, and area charts. Each chart type has variants like stacked, 3D, and percentage views. Charts are automatically positioned below the source data range with configurable dimensions. Optional chart titles can be added for better context.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range with data for chart (e.g., 'A1:D10'). If omitted, uses current selection."
				},
				"chartType": {
					"type": "string",
					"description": "Type of chart to create.",
					"enum": ["bar", "barStacked", "barStackedPercent", "bar3D", "barStacked3D", "barStackedPercent3D", "barStackedPercent3DPerspective", "horizontalBar", "horizontalBarStacked", "horizontalBarStackedPercent", "horizontalBar3D", "horizontalBarStacked3D", "horizontalBarStackedPercent3D", "lineNormal", "lineStacked", "lineStackedPercent", "line3D", "pie", "pie3D", "doughnut", "scatter", "stock", "area", "areaStacked", "areaStackedPercent"],
					"default": "bar"
				},
				"title": {
					"type": "string",
					"description": "Chart title text."
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Create a bar chart from current selection",
				"arguments": {}
			},
			{
				"prompt": "Create a line chart from current selection",
				"arguments": { "chartType": "lineNormal" }
			},
			{
				"prompt": "Create a pie chart from specific range",
				"arguments": { "range": "A1:B10", "chartType": "pie" }
			},
			{
				"prompt": "Create a chart with title",
				"arguments": { "title": "Sales Overview" }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "addColorScale",
		"description": "Applies color scale conditional formatting to visualize data with gradient colors. Creates a heat map effect where values are represented by colors ranging from one color (minimum values) to another color (maximum values). Use 2-color scale for simple comparisons or 3-color scale for more detailed data visualization.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to apply color scale (e.g., 'A1:D10'). If omitted, uses active/selected range."
				},
				"colorScaleType": {
					"type": "number",
					"description": "Color scale type - 2 for two-color scale, 3 for three-color scale (default: 3).",
					"enum": [2, 3],
					"default": 3
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Apply 3-color scale conditional formatting to current selection",
				"arguments": {}
			},
			{
				"prompt": "Apply 2-color scale conditional formatting to range A1:D10",
				"arguments": { "range": "A1:D10", "colorScaleType": 2 }
			},
			{
				"prompt": "When user asks to add color scale, color gradient, heat map formatting",
				"arguments": { "range": "A1:D10", "colorScaleType": 3 }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "addConditionalFormatting",
		"description": "Use this function when user asks for conditional formatting without specifying the exact type. This applies the most commonly used conditional formatting rule - highlighting cells based on values greater than a threshold with color background. Perfect for general requests like 'add conditional formatting', 'highlight important data', or 'format cells conditionally'.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to apply formatting (e.g., 'A1:D10'). If omitted, uses active/selected range."
				},
				"threshold": {
					"type": "number",
					"description": "Value threshold for highlighting (default: calculated from data)."
				},
				"fillColor": {
					"type": "object",
					"description": "Background color {r: 255, g: 200, b: 200} (default: light red).",
					"properties": {
						"r": { "type": "number" },
						"g": { "type": "number" },
						"b": { "type": "number" }
					}
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Apply default conditional formatting to current selection",
				"arguments": {}
			},
			{
				"prompt": "Apply conditional formatting with custom threshold",
				"arguments": { "threshold": 100 }
			},
			{
				"prompt": "When user asks to add conditional formatting without specifics",
				"arguments": { "range": "A1:D10" }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "addDataBars",
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
					"description": "Direction of bars - 'leftToRight', 'rightToLeft' (default: 'leftToRight').",
					"enum": ["leftToRight", "rightToLeft"],
					"default": "leftToRight"
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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "addIconSet",
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
					"description": "Type of icon set - 'threeArrows', 'threeTrafficLights', 'fourArrows', 'fiveArrows', etc. (default: 'threeArrows').",
					"default": "threeArrows"
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
				"arguments": { "range": "A1:D10", "iconSetType": "threeTrafficLights" }
			},
			{
				"prompt": "When user asks to add icon set, arrow icons, traffic lights, symbols formatting",
				"arguments": { "range": "A1:D10" }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "addImage",
		"description": "Use this function when you need to insert an image into the spreadsheet.",
		"parameters": {
			"type": "object",
			"properties": {
				"description": {
					"type": "string",
					"description": "Text description of the image to generate"
				},
				"width": {
					"type": "number",
					"description": "Image width in mm (default: 100)",
					"default": 100
				},
				"height": {
					"type": "number",
					"description": "Image height in mm (default: 100)",
					"default": 100
				},
				"style": {
					"type": "string",
					"description": "Image style (realistic, cartoon, abstract, etc.)"
				}
			},
			"required": ["description"]
		},
		"examples": [
			{
				"prompt": "Add an image of a sunset",
				"arguments": { "description": "sunset over mountains" }
			},
			{
				"prompt": "Add a cartoon-style team image with custom size",
				"arguments": { "description": "team of office workers", "style": "cartoon", "width": 180, "height": 120 }
			},
			{
				"prompt": "Add a realistic photo of a laptop on a wooden desk",
				"arguments": { "description": "realistic photo of a laptop on a wooden desk", "style": "realistic", "width": 120, "height": 80 }
			},
			{
				"prompt": "Generate an abstract geometric background",
				"arguments": { "description": "abstract geometric background with vibrant colors", "style": "abstract" }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "addTop10Condition",
		"description": "Highlights the top or bottom ranked values in a range. You can choose to highlight by item count (e.g., top 10 values) or by percentage (e.g., top 20% of values). Perfect for identifying highest performers, outliers, or values that need attention in your dataset.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to apply condition (e.g., 'A1:D10'). If omitted, uses active/selected range."
				},
				"rank": {
					"type": "number",
					"description": "Number of top/bottom items to highlight (default: 10).",
					"default": 10
				},
				"isBottom": {
					"type": "boolean",
					"description": "True for bottom values, false for top values (default: false).",
					"default": false
				},
				"isPercent": {
					"type": "boolean",
					"description": "True for percentage, false for item count (default: false).",
					"default": false
				},
				"fillColor": {
					"type": "object",
					"description": "Background color {r: 255, g: 0, b: 0}.",
					"properties": {
						"r": { "type": "number" },
						"g": { "type": "number" },
						"b": { "type": "number" }
					}
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Highlight top 10 values with green background",
				"arguments": { "fillColor": { "r": 0, "g": 255, "b": 0 } }
			},
			{
				"prompt": "Highlight bottom 5 values with red background",
				"arguments": { "rank": 5, "isBottom": true, "fillColor": { "r": 255, "g": 0, "b": 0 } }
			},
			{
				"prompt": "When user asks to highlight top/bottom values, highest/lowest cells",
				"arguments": { "rank": 10, "isBottom": false }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "addUniqueValues",
		"description": "Highlights unique values or duplicate values in a range. Use this to identify data that appears only once (unique) or multiple times (duplicates) within the specified range. Perfect for data validation and cleanup tasks.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to apply condition (e.g., 'A1:D10'). If omitted, uses active/selected range."
				},
				"duplicateUnique": {
					"type": "string",
					"description": "'unique' to highlight unique values, 'duplicate' to highlight duplicates (default: 'duplicate').",
					"enum": ["unique", "duplicate"],
					"default": "duplicate"
				},
				"fillColor": {
					"type": "object",
					"description": "Background color {r: 255, g: 255, b: 0}.",
					"properties": {
						"r": { "type": "number" },
						"g": { "type": "number" },
						"b": { "type": "number" }
					}
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Highlight duplicate values with default color",
				"arguments": {}
			},
			{
				"prompt": "Highlight unique values with yellow background",
				"arguments": { "duplicateUnique": "unique", "fillColor": { "r": 255, "g": 255, "b": 0 } }
			},
			{
				"prompt": "When user asks to highlight duplicate or unique values",
				"arguments": { "duplicateUnique": "unique" }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "clearConditionalFormatting",
		"description": "Removes all conditional formatting rules from the specified range or current selection. This function cleans up all existing conditional formatting including color scales, data bars, icon sets, and highlight cell rules, returning cells to their default appearance.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to clear formatting (e.g., 'A1:D10'). If omitted, uses active/selected range."
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Clear all conditional formatting from current selection",
				"arguments": {}
			},
			{
				"prompt": "Clear conditional formatting from range A1:D10",
				"arguments": { "range": "A1:D10" }
			},
			{
				"prompt": "When user asks to remove, delete, clear conditional formatting",
				"arguments": { "range": "A1:D10" }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "explainFormula",
		"description": "Analyzes and explains Excel formulas in natural language. Uses AI to provide detailed explanations of formula logic, function parameters, nested operations, and expected results. The explanation is added as a cell comment to the cell containing the formula. Particularly useful for understanding complex formulas with multiple nested functions or unfamiliar Excel functions. Keeps explanations concise (under 1024 characters recommended) while covering all essential information.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range containing formula to explain (e.g., 'A1'). If omitted, uses active/selected cell."
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Explain formula in active cell",
				"arguments": {}
			},
			{
				"prompt": "Explain formula in specific cell A1",
				"arguments": { "range": "A1" }
			},
			{
				"prompt": "Explain formula in cell B5",
				"arguments": { "range": "B5" }
			}
		]
	});

	func.call = async function(params) {
		Asc.scope.range = params.range;

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "fillMissingData",
		"description": "Intelligently fills missing or empty cells in a data range using appropriate statistical methods. For numeric columns, fills with median values. For categorical columns, uses the most frequent value. For time series data, applies forward fill (uses the previous non-empty value). Automatically detects column types and highlights filled cells with light blue color for easy identification.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to fill missing data (e.g., 'A1:D10'). If omitted, uses active/selected range."
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Fill missing data in the current selection with appropriate values based on column types",
				"arguments": {}
			},
			{
				"prompt": "Fill missing data in range A1:D10",
				"arguments": { "range": "A1:D10" }
			},
			{
				"prompt": "Fill empty cells in active range using smart algorithms (median for numeric, most frequent for categorical, forward fill for time series)",
				"arguments": {}
			},
			{
				"prompt": "Fill missing values, fill empty cells, complete data, or handle null values",
				"arguments": {}
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "fixFormula",
		"description": "Scans cells for formulas containing errors and attempts to fix them automatically. Detects common formula errors including #DIV/0! (division by zero), #REF! (invalid cell references), #NAME? (unrecognized function names), #VALUE! (wrong value types), and #N/A (value not available). Applies appropriate fixes: wraps division operations in IF statements, corrects cell references, fixes function name typos, and adds IFERROR wrappers. Preserves formulas that have no errors. Can scan entire sheet or specific range.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to fix formulas (e.g., 'A1:D10'). If omitted, scans entire sheet."
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Fix formula errors in entire sheet",
				"arguments": {}
			},
			{
				"prompt": "Fix formula errors in specific range A1:D10",
				"arguments": { "range": "A1:D10" }
			},
			{
				"prompt": "Find and fix formula errors like #DIV/0!, #REF!, #NAME?",
				"arguments": {}
			},
			{
				"prompt": "Scan and correct formula errors in selected range",
				"arguments": { "range": "A1:Z100" }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "formatTable",
		"description": "Applies professional table formatting to a data range with consistent styling, colors, and alignment. Features include: automatic or manual color scheme selection (blue, green, orange, gray, red), alternating row colors for readability, optional header row formatting (bold, centered, colored background), table borders, and automatic column width adjustment. Can auto-detect existing formatting to avoid overriding intentional styles. Supports smart content-based text alignment (right-align numbers, left-align text).",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to format as a table (e.g., 'A1:D10'). If omitted, uses active/selected range or entire sheet if no selection."
				},
				"applyHeaderStyle": {
					"type": "boolean",
					"description": "Whether to apply bold and center alignment to first row as headers (default: true).",
					"default": true
				},
				"applyBorders": {
					"type": "boolean",
					"description": "Whether to apply borders to the table (default: true).",
					"default": true
				},
				"colorScheme": {
					"type": "string",
					"description": "Color scheme to apply ('blue', 'green', 'orange', 'gray', 'red', or 'auto' for dominant color detection, default: 'auto').",
					"enum": ["blue", "green", "orange", "gray", "red", "auto"],
					"default": "auto"
				},
				"detectHeaders": {
					"type": "boolean",
					"description": "Whether to automatically detect headers based on content (default: true).",
					"default": true
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Format the selected range as a clean, consistent table",
				"arguments": {}
			},
			{
				"prompt": "Format range A1:E10 as a table with blue color scheme",
				"arguments": { "range": "A1:E10", "colorScheme": "blue" }
			},
			{
				"prompt": "Format current selection as table without header styling",
				"arguments": { "applyHeaderStyle": false }
			},
			{
				"prompt": "Format the entire sheet with green color scheme and borders",
				"arguments": { "colorScheme": "green", "applyBorders": true }
			},
			{
				"prompt": "Format selected range detecting dominant style automatically",
				"arguments": { "colorScheme": "auto" }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "highlightAnomalies",
		"description": "Detects and highlights statistical outliers (anomalies) in numeric data using the IQR (Interquartile Range) method or Z-score analysis. Applies conservative outlier detection to avoid false positives - only marks clear statistical anomalies. Automatically extracts numeric values from the range, calculates quartiles, and identifies values that fall outside Q1-1.5*IQR or Q3+1.5*IQR. Highlights detected anomalies with customizable colors. Requires at least 4 numeric values for analysis.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to analyze for anomalies (e.g., 'A1:D10'). If omitted, uses current selection or entire used range."
				},
				"highlightColor": {
					"type": "string",
					"description": "Color to highlight anomalies (hex color like '#FF0000' or preset color name like 'red'). Default: 'yellow'.",
					"default": "yellow"
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Highlight anomalies in current selection",
				"arguments": {}
			},
			{
				"prompt": "Highlight anomalies in specific range A1:D10",
				"arguments": { "range": "A1:D10" }
			},
			{
				"prompt": "Highlight anomalies in red color",
				"arguments": { "highlightColor": "red" }
			},
			{
				"prompt": "Highlight anomalies in specific range with custom color",
				"arguments": { "range": "A1:D10", "highlightColor": "#FF5733" }
			},
			{
				"prompt": "Analyze selected range for statistical outliers and highlight them",
				"arguments": {}
			},
			{
				"prompt": "Find and highlight anomalous values in data with blue color",
				"arguments": { "highlightColor": "blue" }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "highlightDuplicates",
		"description": "Identifies and highlights duplicate values within a specified range. Compares all cells in the range and highlights cells that contain values appearing more than once. Uses AI to accurately detect duplicates while handling various data types (numbers, text, dates). Highlights all instances of duplicate values with customizable color. Useful for data validation, cleanup tasks, and identifying repeated entries in datasets.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to analyze for duplicates (e.g., 'A1:D10'). If omitted, uses current selection or entire used range."
				},
				"highlightColor": {
					"type": "string",
					"description": "Color to highlight duplicates (hex color like '#FF0000' or preset color name like 'red'). Default: 'orange'.",
					"default": "orange"
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Highlight duplicates in current selection",
				"arguments": {}
			},
			{
				"prompt": "Highlight duplicates in specific range A1:D10",
				"arguments": { "range": "A1:D10" }
			},
			{
				"prompt": "Highlight duplicates in red color",
				"arguments": { "range": "A1:D10", "highlightColor": "red" }
			},
			{
				"prompt": "Highlight duplicates in specific range with custom color",
				"arguments": { "range": "A1:D10", "highlightColor": "#FF5733" }
			},
			{
				"prompt": "Find and highlight duplicate rows in data",
				"arguments": {}
			},
			{
				"prompt": "Detect duplicate entries with blue highlighting",
				"arguments": { "highlightColor": "blue" }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "insertPivotTable",
		"description": "Creates pivot tables for data analysis and summarization. Automatically detects suitable grouping columns and numeric columns for aggregation. Supports custom column selection via parameters. Creates a new worksheet with the pivot table. Intelligently matches column names using fuzzy logic when column names are specified.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to apply autofilter (e.g., 'A1:D10'). If omitted, uses active/selected range"
				},
				"columns": {
					"type": "array",
					"description": "Array of column names to use for pivot rows (categorical/grouping)",
					"items": {
						"type": "string"
					}
				},
				"valueColumn": {
					"type": "string",
					"description": "Column name to use for pivot values (numeric/aggregate)"
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Create or summarize the current selection with a pivot table",
				"arguments": {}
			},
			{
				"prompt": "Insert pivot table to range A1:D10",
				"arguments": { "range": "A1:D10" }
			},
			{
				"prompt": "Create pivot table with specific grouping columns",
				"arguments": { "columns": ["Column1", "Column2"] }
			},
			{
				"prompt": "Create pivot table with specific value column",
				"arguments": { "valueColumn": "Column3" }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "setAutoFilter",
		"description": "Applies autofilter to a data range, enabling dropdown filters on column headers. Supports filtering by column number or column name (with fuzzy matching). Offers multiple filter types: value comparison operators (greater than, less than, equals), multiple value selection, top/bottom N items or percentage, color-based filtering (cell background or font color), and dynamic filters. Can be used to filter active selection or specific ranges.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to apply autofilter (e.g., 'A1:D10'). If omitted, uses active/selected range."
				},
				"field": {
					"type": "number",
					"description": "Field number for filtering (starting from 1, left-most field)."
				},
				"fieldName": {
					"type": "string",
					"description": "Column name/header for filtering (e.g., 'Name', 'Age'). Will automatically find the column number."
				},
				"criteria1": {
					"type": ["string", "array", "object"],
					"description": "Filter criteria - string for operators (e.g., '>10'), array for multiple values (e.g., [1,2,3]), ApiColor object for color filters, or dynamic filter constant."
				},
				"operator": {
					"type": "string",
					"description": "Filter operator.",
					"enum": ["xlAnd", "xlOr", "xlFilterValues", "xlTop10Items", "xlTop10Percent", "xlBottom10Items", "xlBottom10Percent", "xlFilterCellColor", "xlFilterFontColor", "xlFilterDynamic"]
				},
				"criteria2": {
					"type": "string",
					"description": "Second criteria for compound filters (used with xlAnd/xlOr operators)."
				},
				"visibleDropDown": {
					"type": "boolean",
					"description": "Show/hide filter dropdown arrow (default: true)."
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Apply autofilter to range A1:D10",
				"arguments": { "range": "A1:D10" }
			},
			{
				"prompt": "Apply autofilter to active/selected range",
				"arguments": {}
			},
			{
				"prompt": "Filter column 1 for values greater than 10",
				"arguments": { "range": "A1:D10", "field": 1, "criteria1": ">10" }
			},
			{
				"prompt": "Filter by column name 'Name' for specific values",
				"arguments": { "range": "A1:D10", "fieldName": "Name", "criteria1": ["John", "Jane"], "operator": "xlFilterValues" }
			},
			{
				"prompt": "Filter by column header 'Age' for values greater than 18",
				"arguments": { "range": "A1:D10", "fieldName": "Age", "criteria1": ">18" }
			},
			{
				"prompt": "Filter column 2 for specific values [2,5,8]",
				"arguments": { "range": "A1:D10", "field": 2, "criteria1": [2, 5, 8], "operator": "xlFilterValues" }
			},
			{
				"prompt": "Filter column 1 for top 10 items",
				"arguments": { "range": "A1:D10", "field": 1, "criteria1": "10", "operator": "xlTop10Items" }
			},
			{
				"prompt": "Create compound filter (>5 OR <2)",
				"arguments": { "range": "A1:D10", "field": 1, "criteria1": ">5", "operator": "xlOr", "criteria2": "<2" }
			},
			{
				"prompt": "Filter by cell background color (yellow)",
				"arguments": { "range": "A1:D10", "field": 1, "criteria1": { "r": 255, "g": 255, "b": 0 }, "operator": "xlFilterCellColor" }
			},
			{
				"prompt": "Filter by font color (red)",
				"arguments": { "range": "A1:D10", "field": 1, "criteria1": { "r": 255, "g": 0, "b": 0 }, "operator": "xlFilterFontColor" }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "setMultiSort",
		"description": "Sorts data by multiple columns (up to 3 levels). Use this when you need to sort by primary, secondary, and tertiary sort keys. Each level can have its own sort order.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to sort (e.g., 'A1:D10'). If omitted, uses active/selected range."
				},
				"key1": {
					"type": ["string", "number"],
					"description": "First sort field - cell reference, column index (1-based), or column name. If omitted, uses first column."
				},
				"sortOrder1": {
					"type": "string",
					"description": "Sort order for key1: 'xlAscending' or 'xlDescending'.",
					"enum": ["xlAscending", "xlDescending"],
					"default": "xlAscending"
				},
				"key2": {
					"type": ["string", "number"],
					"description": "Second sort field - cell reference, column index, or column name. If omitted, uses second column."
				},
				"sortOrder2": {
					"type": "string",
					"description": "Sort order for key2: 'xlAscending' or 'xlDescending'.",
					"enum": ["xlAscending", "xlDescending"],
					"default": "xlAscending"
				},
				"key3": {
					"type": ["string", "number"],
					"description": "Third sort field - cell reference, column index, or column name."
				},
				"sortOrder3": {
					"type": "string",
					"description": "Sort order for key3: 'xlAscending' or 'xlDescending'.",
					"enum": ["xlAscending", "xlDescending"],
					"default": "xlAscending"
				},
				"header": {
					"type": "string",
					"description": "Specifies if first row contains headers: 'xlYes' or 'xlNo'.",
					"enum": ["xlYes", "xlNo"],
					"default": "xlNo"
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Sort by two columns",
				"arguments": {}
			},
			{
				"prompt": "Sort by Name and Age",
				"arguments": { "key1": "Name", "key2": "Age", "header": "xlYes" }
			},
			{
				"prompt": "Sort first column ascending, second descending",
				"arguments": { "sortOrder1": "xlAscending", "sortOrder2": "xlDescending" }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "setSort",
		"description": "Sorts data in a range by a single column in ascending or descending order.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to sort (e.g., 'A1:D10'). If omitted, uses active/selected range."
				},
				"key1": {
					"type": ["string", "number"],
					"description": "Sort field - cell reference (e.g., 'A1'), column index (1-based), or column name. If omitted, uses first column."
				},
				"sortOrder1": {
					"type": "string",
					"description": "Sort order: 'xlAscending' or 'xlDescending'.",
					"enum": ["xlAscending", "xlDescending"],
					"default": "xlAscending"
				},
				"header": {
					"type": "string",
					"description": "Specifies if first row contains headers: 'xlYes' or 'xlNo'.",
					"enum": ["xlYes", "xlNo"],
					"default": "xlNo"
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Sort range A1:D10 by first column in ascending order",
				"arguments": { "range": "A1:D10", "sortOrder1": "xlAscending" }
			},
			{
				"prompt": "Sort active range in descending order",
				"arguments": { "sortOrder1": "xlDescending" }
			},
			{
				"prompt": "Sort by column name 'Name' with headers",
				"arguments": { "key1": "Name", "header": "xlYes" }
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "summarizeData",
		"description": "Analyzes and creates a comprehensive text summary of data in the specified range. Automatically determines data types (numeric, categorical, dates) and provides relevant statistics for each type. For numeric data: calculates totals, averages, ranges, and identifies outliers. For categorical data: finds most frequent values and distribution patterns. The summary is placed in a new cell adjacent to the data range with proper formatting and text wrapping.",
		"parameters": {
			"type": "object",
			"properties": {
				"range": {
					"type": "string",
					"description": "Cell range to summarize data (e.g., 'A1:D10'). If omitted, uses active/selected range."
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Analyze and summarize data in the current selection with key trends, totals, and insights",
				"arguments": {}
			},
			{
				"prompt": "Summarize data in range A1:D10",
				"arguments": { "range": "A1:D10" }
			},
			{
				"prompt": "Create text summary of active range with statistics, patterns, and anomalies",
				"arguments": {}
			}
		]
	});

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

	return func;
})());
HELPERS.cell.push((function(){

	let func = new RegisteredFunction({
		"name": "changeTextStyle",
		"description": "Applies text formatting styles to cells in the specified range or current selection. Supports comprehensive text styling options including bold, italic, underline (multiple types), strikeout, font family, font size, and font color. Colors can be specified using hex codes (#FF0000) or preset color names (red, blue, etc.). All formatting parameters are optional - only specified properties will be changed, leaving others unchanged.",
		"parameters": {
			"type": "object",
			"properties": {
				"bold": {
					"type": "boolean",
					"description": "Whether to make the text bold (true to enable, false to disable)."
				},
				"italic": {
					"type": "boolean",
					"description": "Whether to make the text italic (true to enable, false to disable)."
				},
				"underline": {
					"type": "string",
					"description": "Underline type to apply.",
					"enum": ["none", "single", "singleAccounting", "double", "doubleAccounting"]
				},
				"strikeout": {
					"type": "boolean",
					"description": "Whether to strike through the text (true to enable, false to disable)."
				},
				"fontSize": {
					"type": "number",
					"description": "Font size to apply to the selected cell(s).",
					"minimum": 1,
					"maximum": 200
				},
				"fontName": {
					"type": "string",
					"description": "Font family name to apply to the selected cell(s)."
				},
				"fontColor": {
					"type": "string",
					"description": "Font color (hex color like '#FF0000' or preset color name like 'red')."
				},
				"range": {
					"type": "string",
					"description": "Cell range to format (e.g., 'A1:B5'). If omitted, uses current selection."
				}
			},
			"required": []
		},
		"examples": [
			{
				"prompt": "Make selected cells bold and italic",
				"arguments": { "bold": true, "italic": true }
			},
			{
				"prompt": "Underline selected cells",
				"arguments": { "underline": "single" }
			},
			{
				"prompt": "Strike out selected cells",
				"arguments": { "strikeout": true }
			},
			{
				"prompt": "Set font size to 18",
				"arguments": { "fontSize": 18 }
			},
			{
				"prompt": "Change font to Arial and make it red",
				"arguments": { "fontName": "Arial", "fontColor": "red" }
			},
			{
				"prompt": "Format range A1:C3 as bold",
				"arguments": { "range": "A1:C3", "bold": true }
			},
			{
				"prompt": "Remove italics from selected cells",
				"arguments": { "italic": false }
			}
		]
	});

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

	return func;
})());


