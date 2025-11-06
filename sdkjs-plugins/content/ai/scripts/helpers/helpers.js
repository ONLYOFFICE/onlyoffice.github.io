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


HELPERS.cell = [];


