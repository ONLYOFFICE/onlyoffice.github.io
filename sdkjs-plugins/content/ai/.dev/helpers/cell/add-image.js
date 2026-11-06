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

(function(){

	let func = new RegisteredFunction({
		"name": "addImage",
		"text": "Insert Image",
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
			
			console.log("[AI.addImage cell] model:", requestEngine.modelUI.name, "imageUrl length:", imageUrl ? imageUrl.length : 0);
			
			await Asc.Editor.callMethod("EndAction", ["Block", actionName]);
			if (!imageUrl) {
				throw new window.AgentState.ToolError("Image generation failed: no image data returned from " + requestEngine.modelUI.name);
			}
			let widthEmu, heightEmu;
			try {
				const img = new Image();
				img.src = imageUrl;
				await img.decode();
				widthEmu = img.naturalWidth * 9525 + 0.5 >> 0;
				heightEmu = img.naturalHeight * 9525 + 0.5 >> 0;
			} catch (e) {
				console.warn("[AI.addImage cell] img.decode failed", e);
				widthEmu = widthMm * 36000;
				heightEmu = heightMm * 36000;
			}
			let urlForDoc = imageUrl;
			try {
				let ver = await Asc.Library.GetEditorVersion();
				if (ver >= 9000000) {
					let local = await Asc.Library.GetLocalImagePath(imageUrl);
					if (local && !local.error && local.url)
						urlForDoc = local.url;
				}
			} catch (e) {}
			Asc.scope.imageUrl = urlForDoc;
			Asc.scope.width = widthEmu;
			Asc.scope.height = heightEmu;
			
			await Asc.Editor.callMethod("StartAction", ["GroupActions"]);
			let insertRes = await Asc.Editor.callCommand(function () {
				let ws = Api.GetActiveSheet();
				// Insert at A1 offset like library.js does; use AddImage with EMU
				ws.AddImage(Asc.scope.imageUrl, Asc.scope.width, Asc.scope.height, 0, 0, 0, 0);
				return { ok: true };
			});
			await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
			if (insertRes && insertRes.error) {
				throw new window.AgentState.ToolError("Failed to insert image: " + insertRes.error);
			}
		} catch (error) {
			console.error("[AI.addImage cell] error:", error);
			if (error && error.name === "ToolError") throw error;
			throw new window.AgentState.ToolError(error ? (error.message || String(error)) : "Unknown image error");
		}

	};

	return func;
})();
