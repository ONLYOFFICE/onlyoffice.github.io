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
		if (AI.Endpoints.Types.v1.Chat_Completions === endpoint)
			return "/messages";
		return super.getEndpointUrl(endpoint, model);
	}

	getRequestBodyOptions() {
		return {
			max_tokens : 4096
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

}
