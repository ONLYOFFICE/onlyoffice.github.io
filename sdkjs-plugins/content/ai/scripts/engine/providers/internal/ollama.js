"use strict";

class Provider extends AI.Provider {

	constructor() {
		super("Ollama", "http://localhost:11434/api", "", "");
	}

    getEndpointUrl(endpoint, model) {
        let Types = AI.Endpoints.Types;
        switch (endpoint)
        {
        case Types.v1.Models:
            return "/tags";

        case Types.v1.Chat_Completions:
            return "/chat";
        case Types.v1.Completions:
            return "/generate";

        default:
            break;
        }

        return super.getEndpointUrl();
    }
}
