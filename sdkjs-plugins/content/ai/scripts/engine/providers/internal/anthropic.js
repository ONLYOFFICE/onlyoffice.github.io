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

"use strict";

class Provider extends AI.Provider {

	constructor() {
		super("Anthropic", "https://api.anthropic.com", "", "v1");
	}

	checkModelCapability = function(model) {
		if (0 == model.id.indexOf("claude-2"))
		{
			model.options.max_input_tokens = AI.InputMaxTokens["100k"];
			model.endpoints.push(AI.Endpoints.Types.v1.Chat_Completions);
			return AI.CapabilitiesUI.Chat;
		}

		if (0 == model.id.indexOf("claude-3-5-haiku"))
		{
			model.options.max_input_tokens = AI.InputMaxTokens["200k"];
			model.endpoints.push(AI.Endpoints.Types.v1.Chat_Completions);
			return AI.CapabilitiesUI.Chat;
		}
		
		model.options.max_input_tokens = AI.InputMaxTokens["200k"];
		model.endpoints.push(AI.Endpoints.Types.v1.Chat_Completions);
		return AI.CapabilitiesUI.Chat | AI.CapabilitiesUI.Vision;
	}

	getEndpointUrl(endpoint, model) {
		switch (endpoint)
		{
			case AI.Endpoints.Types.v1.Chat_Completions:
			case AI.Endpoints.Types.v1.Images_Generations:
			case AI.Endpoints.Types.v1.Images_Edits:
			case AI.Endpoints.Types.v1.Images_Variarions:
			{
				return "/messages";
			}
			default:
				break;
		}
		return super.getEndpointUrl(endpoint, model);
	}

	getRequestBodyOptions(body) {
		let max_output_tokens = 64000;
		if (body.model) {
			if (body.model.indexOf("-4-") != -1 || body.model.indexOf("-4-1-") != -1) {
				max_output_tokens = 32000;
			}
			else if (body.model.indexOf("-3-5-") != -1) {
				max_output_tokens = 8096;
			}
			else if (body.model.indexOf("-3-") != -1) {
				max_output_tokens = 4096;
			}
		}

		return {
			max_tokens : max_output_tokens
		};
	}

	getRequestHeaderOptions() {
		let headers = {
			"Content-Type" : "application/json",
			"anthropic-version" : "2023-06-01",
			"anthropic-dangerous-direct-browser-access": "true"
		};
		if (this.key)
			headers["x-api-key"] = this.key;
		return headers;
	}

	getChatCompletions(message, model) {
		let systemPrompt = this.getSystemMessage(message, true);
		let result = super.getChatCompletions(message, model);
		if (systemPrompt !== "") {
			result.system = systemPrompt;
		}

		if (result.messages) {
			let converted = [];
			for (let i = 0; i < result.messages.length; i++) {
				let msg = result.messages[i];

				if (msg.role === "assistant" && msg.tool_calls) 
				{
					let contentBlocks = [];
					if (msg.content) 
					{
						contentBlocks.push({ type: "text", text: msg.content });
					}
					for (let tc of msg.tool_calls) 
					{
						let inputObj = tc.function.arguments;
						if (typeof inputObj === "string")
							try { inputObj = JSON.parse(inputObj); } catch(e) { inputObj = {}; }

						contentBlocks.push({
							type: "tool_use",
							id: tc.id,
							name: tc.function.name,
							input: inputObj
						});
					}
					converted.push({ role: "assistant", content: contentBlocks });
					continue;
				}

				if (msg.role === "tool") {
					converted.push({
						role: "user",
						content: [{
							type: "tool_result",
							tool_use_id: msg.tool_call_id,
							content: msg.content || ""
						}]
					});
					continue;
				}

				converted.push(msg);
			}

			if (true)
			{
				let merged = [];
				for (let i = 0; i < converted.length; i++) 
				{
					let prev = merged.length > 0 ? merged[merged.length - 1] : null;
					if (prev && prev.role === converted[i].role) 
					{
						let prevContent = Array.isArray(prev.content) ? prev.content : [{ type: "text", text: prev.content }];
						let curContent = Array.isArray(converted[i].content) ? converted[i].content : [{ type: "text", text: converted[i].content }];
						prev.content = prevContent.concat(curContent);
					} 
					else 
					{
						merged.push({ role: converted[i].role, content: converted[i].content });
					}
				}
				result.messages = merged;
			}
			else
			{
				result.messages = converted;
			}			
		}

		return result;
	}

	getImageGeneration(message, model) {
		return this.getImageGenerationWithChat(message, model, "Image must be in svg format. ");
	}

	async getImageVision(message, model) {
		return {
			model : model.id,
			messages : [
				{
					role: "user",
					content: [
						{
							type: "text",
							text: message.prompt
						},
						{
							type: "image",
							source: {
								type: "base64",
								media_type: AI.ImageEngine.getMimeTypeFromBase64(message.image),
								data: AI.ImageEngine.getContentFromBase64(message.image)
							}
						}
					]
				}
			]
		}
	}

	addTools(body, tools) {
		if (!tools || tools.length === 0)
			return;

		body.tools = tools.map(tool => ({
			name: tool.name,
			description: tool.description,
			input_schema: tool.parameters
		}));
	}

	getToolCallsResult(message) {
		let data = message.data || message;
		let content = data.content;
		if (content && Array.isArray(content))
		{
			let toolCalls = [];
			for (let item of content) {
				if (item.type === 'tool_use') {
					toolCalls.push({
						id: item.id,
						type: 'function',
						function: {
							name: item.name,
							arguments: JSON.stringify(item.input)
						}
					});
				}
			}

			return toolCalls.length > 0 ? toolCalls : null;
		}

		if (data.type === 'content_block_start' && data.content_block?.type === 'tool_use')
		{
			return [{
				index: data.index || 0,
				id: data.content_block.id,
				type: 'function',
				function: {
					name: data.content_block.name,
					arguments: ''
				}
			}];
		}

		if (data.type === 'content_block_delta' && data.delta?.type === 'input_json_delta')
		{
			return [{
				index: data.index || 0,
				function: {
					arguments: data.delta.partial_json || ''
				}
			}];
		}

		return null;
	}

}
