"use strict";

class Provider extends AI.Provider {

	constructor() {
		super("Mistral", "https://api.mistral.ai", "", "v1");
	}

	checkModelCapability = function(model) {
		if (-1 !== model.id.indexOf("mistral-embed"))
		{
			model.options.max_input_tokens = AI.InputMaxTokens["8k"];
			model.endpoints.push(AI.Endpoints.Types.v1.Embeddings);
			return AI.CapabilitiesUI.Embeddings;
		}
		if (-1 !== model.id.indexOf("mistral-moderation"))
		{
			model.options.max_input_tokens = AI.InputMaxTokens["8k"];
			model.endpoints.push(AI.Endpoints.Types.v1.Moderations);
			return AI.CapabilitiesUI.Moderations;
		}
		if (-1 !== model.id.indexOf("pixtral"))
		{
			model.options.max_input_tokens = AI.InputMaxTokens["128k"];
			model.endpoints.push(AI.Endpoints.Types.v1.Images_Generations);
			model.endpoints.push(AI.Endpoints.Types.v1.Images_Edits);
			model.endpoints.push(AI.Endpoints.Types.v1.Images_Variarions);
			return AI.CapabilitiesUI.Image;
		}
		if (-1 !== model.id.indexOf("mistral-small"))
		{
			model.options.max_input_tokens = AI.InputMaxTokens["32k"];
			model.endpoints.push(AI.Endpoints.Types.v1.Chat_Completions);
			return AI.CapabilitiesUI.Chat;
		}
		if (-1 !== model.id.indexOf("mistral-medium"))
		{
			model.options.max_input_tokens = AI.InputMaxTokens["32k"];
			model.endpoints.push(AI.Endpoints.Types.v1.Chat_Completions);
			return AI.CapabilitiesUI.Chat;
		}
		if (-1 !== model.id.indexOf("codestral"))
		{
			model.options.max_input_tokens = AI.InputMaxTokens["256k"];
			model.endpoints.push(AI.Endpoints.Types.v1.Code);
			return AI.CapabilitiesUI.Code | AI.CapabilitiesUI.Chat;
		}

		model.options.max_input_tokens = AI.InputMaxTokens["128k"];
		model.endpoints.push(AI.Endpoints.Types.v1.Chat_Completions);

		let capUI = AI.CapabilitiesUI.Chat;
		if (model.capabilities && model.capabilities.vision)
			capUI = AI.CapabilitiesUI.Vision;
		return capUI;
	}

}
