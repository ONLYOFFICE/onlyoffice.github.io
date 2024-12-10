(function(exports, undefined)
{
	// This script must be added after storage.js

	var AI = exports.AI;

	// Together AI
	AI.ProviderTogetherAI = function() {
		AI.Provider.call(this, "Together AI", "https://api.together.xyz", "");
	};

	AI.ProviderTogetherAI.prototype = Object.create(AI.Provider.prototype);
	AI.ProviderTogetherAI.prototype.constructor = AI.ProviderTogetherAI;

	AI.ProviderTogetherAI.prototype.checkModelCapability = function(model) {
		if (model.context_length)
			model.options.max_input_tokens = AI.InputMaxTokens.getFloor(model.context_length);

		if ("chat" === model.type) {
			model.endpoints.push(AI.Endpoints.Types.v1.Chat_Completions);
			let result = AI.CapabilitiesUI.Chat;

			if (-1 !== model.id.toLowerCase().indexOf("vision")) {
				model.endpoints.push(AI.Endpoints.Types.v1.Vision);
				result |= AI.CapabilitiesUI.Vision;
			}
			return result;
		}

		if ("image" === model.type) {
			model.endpoints.push(AI.Endpoints.Types.v1.Images_Generations);
			model.endpoints.push(AI.Endpoints.Types.v1.Images_Edits);
			model.endpoints.push(AI.Endpoints.Types.v1.Images_Variarions);
			return AI.CapabilitiesUI.Image;
		}

		if ("moderation" === model.type) {
			model.endpoints.push(AI.Endpoints.Types.v1.Moderations);
			return AI.CapabilitiesUI.Moderations;
		}

		if ("embedding" === model.type) {
			model.endpoints.push(AI.Endpoints.Types.v1.Embeddings);
			return AI.CapabilitiesUI.Embeddings;
		}

		if ("language" === model.type) {
			model.endpoints.push(AI.Endpoints.Types.v1.Language);
			return AI.CapabilitiesUI.Language | AI.CapabilitiesUI.Chat;
		}

		if ("code" === model.type) {
			model.endpoints.push(AI.Endpoints.Types.v1.Code);
			return AI.CapabilitiesUI.Code | AI.CapabilitiesUI.Chat;
		}

		if ("rerank" === model.type) {
			return AI.CapabilitiesUI.None;
		}		

		model.endpoints.push(AI.Endpoints.Types.v1.Chat_Completions);
		return AI.CapabilitiesUI.Chat;
	};

	// OpenAI
	AI.ProviderOpenAI = function() {
		AI.Provider.call(this, "OpenAI", "https://api.openai.com", "");
	};

	AI.ProviderOpenAI.prototype = Object.create(AI.Provider.prototype);
	AI.ProviderOpenAI.prototype.constructor = AI.ProviderOpenAI;

	AI.ProviderOpenAI.prototype.checkModelCapability = function(model) {
		if (-1 !== model.id.indexOf("whisper-1"))
		{
			model.endpoints.push(AI.Endpoints.Types.v1.Audio_Transcriptions);
			model.endpoints.push(AI.Endpoints.Types.v1.Audio_Translations);
			return AI.CapabilitiesUI.Audio;
		}
		if (-1 !== model.id.indexOf("tts-1"))
		{
			model.endpoints.push(AI.Endpoints.Types.v1.Audio_Speech);
			return AI.CapabilitiesUI.Audio;
		}
		if (-1 !== model.id.indexOf("babbage-002") ||
			-1 !== model.id.indexOf("davinci-002"))
		{
			model.options.max_input_tokens = AI.InputMaxTokens["16k"];
			model.endpoints.push(AI.Endpoints.Types.v1.Completions);
			return AI.CapabilitiesUI.Chat;
		}
		if (-1 !== model.id.indexOf("embedding"))
		{
			model.endpoints.push(AI.Endpoints.Types.v1.Embeddings);
			return AI.CapabilitiesUI.Embeddings;
		}
		if (-1 !== model.id.indexOf("moderation"))
		{
			model.endpoints.push(AI.Endpoints.Types.v1.Moderations);
			return AI.CapabilitiesUI.Moderations;
		}
		if (-1 !== model.id.indexOf("realtime"))
		{
			model.endpoints.push(AI.Endpoints.Types.v1.Realtime);
			return AI.CapabilitiesUI.Realtime;
		}
		if ("dall-e-2" === model.id)
		{
			model.endpoints.push(AI.Endpoints.Types.v1.Images_Generations);
			model.endpoints.push(AI.Endpoints.Types.v1.Images_Edits);
			model.endpoints.push(AI.Endpoints.Types.v1.Images_Variarions);
			return AI.CapabilitiesUI.Image;
		}
		if ("dall-e-3" === model.id)
		{
			model.endpoints.push(AI.Endpoints.Types.v1.Images_Generations);
			return AI.CapabilitiesUI.Image;
		}
		
		if (0 === model.id.indexOf("gpt-4o") ||
			0 === model.id.indexOf("o1-") ||
			0 === model.id.indexOf("gpt-4-turbo"))
			model.options.max_input_tokens = AI.InputMaxTokens["128k"];
		else if (0 === model.id.indexOf("gpt-4"))
			model.options.max_input_tokens = AI.InputMaxTokens["8k"];
		else if ("gpt-3.5-turbo-instruct" === model.id)
			model.options.max_input_tokens = AI.InputMaxTokens["4k"];
		else if (0 === model.id.indexOf("gpt-3.5-turbo"))
			model.options.max_input_tokens = AI.InputMaxTokens["16k"];

		model.endpoints.push(AI.Endpoints.Types.v1.Chat_Completions);
		return AI.CapabilitiesUI.Chat | AI.CapabilitiesUI.Vision;
	};

	// GPT4All
	AI.ProviderGpt4All = function() {
		AI.Provider.call(this, "GPT4All", "http://localhost:4891", "");
	};

	AI.ProviderGpt4All.prototype = Object.create(AI.Provider.prototype);
	AI.ProviderGpt4All.prototype.constructor = AI.ProviderGpt4All;

	// Mistral
	AI.ProviderMistral = function() {
		AI.Provider.call(this, "Mistral", "https://api.mistral.ai", "");
	};

	AI.ProviderMistral.prototype = Object.create(AI.Provider.prototype);
	AI.ProviderMistral.prototype.constructor = AI.ProviderMistral;

	AI.ProviderMistral.prototype.checkModelCapability = function(model) {
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
		return AI.CapabilitiesUI.Chat | AI.CapabilitiesUI.Vision;
	};

	// Register internal providers
	AI.Storage.InternalProviders = [];

	AI.Storage.InternalProviders.push(new AI.ProviderOpenAI());
	AI.Storage.InternalProviders.push(new AI.ProviderTogetherAI());
	AI.Storage.InternalProviders.push(new AI.ProviderMistral());
	AI.Storage.InternalProviders.push(new AI.ProviderGpt4All());

})(window);
