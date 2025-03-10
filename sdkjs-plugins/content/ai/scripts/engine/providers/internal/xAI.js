"use strict";

class Provider extends AI.Provider {

	constructor() {
		super("xAI", "https://api.x.ai", "", "v1");
	}

	checkExcludeModel(model) {
		if (-1 !== model.id.indexOf("-beta"))
			return true;
		return false;
	}

	checkModelCapability = function(model) {
		if (-1 != model.id.indexOf("vision"))
		{
			model.options.max_input_tokens = AI.InputMaxTokens["32k"];
			model.endpoints.push(AI.Endpoints.Types.v1.Chat_Completions);
			return AI.CapabilitiesUI.Chat | AI.CapabilitiesUI.Vision;
		}

		model.options.max_input_tokens = AI.InputMaxTokens["128k"];
		model.endpoints.push(AI.Endpoints.Types.v1.Chat_Completions);
		return AI.CapabilitiesUI.Chat;
	}

}
