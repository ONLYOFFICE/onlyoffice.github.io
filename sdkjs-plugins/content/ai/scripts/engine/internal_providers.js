(function(exports, undefined)
{
	// This script must be added after storage.js

	var AI = exports.AI;

	// Together AI
	AI.ProviderTogetherAI = function(name, url, key) {
		AI.Provider.call(this, name || "Together AI", url || "https://api.together.xyz", key || "", "v1");
	};

	AI.ProviderTogetherAI.prototype = Object.create(AI.Provider.prototype);
	AI.ProviderTogetherAI.prototype.constructor = AI.ProviderTogetherAI;

	AI.ProviderTogetherAI.prototype.createInstance = function(name, url, key) {
		return new AI.ProviderTogetherAI(name, url, key);
	};

	AI.ProviderTogetherAI.prototype.getUrlAddon = function(endpoint) {
		return undefined;
	};

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
	AI.ProviderOpenAI = function(name, url, key) {
		AI.Provider.call(this, name || "OpenAI", url || "https://api.openai.com", key || "", "v1");
	};

	AI.ProviderOpenAI.prototype = Object.create(AI.Provider.prototype);
	AI.ProviderOpenAI.prototype.constructor = AI.ProviderOpenAI;

	AI.ProviderOpenAI.prototype.createInstance = function(name, url, key) {
		return new AI.ProviderOpenAI(name, url, key);
	};

	AI.ProviderOpenAI.prototype.checkExcludeModel = function(model) {
		if (-1 !== model.id.indexOf("babbage-002") ||
			-1 !== model.id.indexOf("davinci-002"))
			return true;
		return false;
	};

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
		else if (-1 != model.id.indexOf("gpt-3.5-turbo-instruct")) {
			model.options.max_input_tokens = AI.InputMaxTokens["4k"];
			model.endpoints.push(AI.Endpoints.Types.v1.Completions);
			return AI.CapabilitiesUI.Chat;
		}
		else if (0 === model.id.indexOf("gpt-3.5-turbo"))
			model.options.max_input_tokens = AI.InputMaxTokens["16k"];

		model.endpoints.push(AI.Endpoints.Types.v1.Chat_Completions);
		return AI.CapabilitiesUI.Chat | AI.CapabilitiesUI.Vision;
	};

	// GPT4All
	AI.ProviderGpt4All = function(name, url, key) {
		AI.Provider.call(this, name || "GPT4All", url || "http://localhost:4891", key || "", "v1");
	};

	AI.ProviderGpt4All.prototype = Object.create(AI.Provider.prototype);
	AI.ProviderGpt4All.prototype.constructor = AI.ProviderGpt4All;

	AI.ProviderGpt4All.prototype.createInstance = function(name, url, key) {
		return new AI.ProviderGpt4All(name, url, key);
	};

	AI.ProviderGpt4All.prototype.getRequestBodyOptions = function() {
		return {
			max_tokens : 4096
		};
	};

	// Mistral
	AI.ProviderMistral = function(name, url, key) {
		AI.Provider.call(this, name || "Mistral", url || "https://api.mistral.ai", key || "", "v1");
	};

	AI.ProviderMistral.prototype = Object.create(AI.Provider.prototype);
	AI.ProviderMistral.prototype.constructor = AI.ProviderMistral;

	AI.ProviderMistral.prototype.createInstance = function(name, url, key) {
		return new AI.ProviderMistral(name, url, key);
	};

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

		let capUI = AI.CapabilitiesUI.Chat;
		if (model.capabilities && model.capabilities.vision)
			capUI = AI.CapabilitiesUI.Vision;
		return capUI;
	};

	// Anthropic
	AI.ProviderAnthropic = function(name, url, key) {
		AI.Provider.call(this, name || "Anthropic", url || "https://api.anthropic.com", key || "", "v1");
	};

	AI.ProviderAnthropic.prototype = Object.create(AI.Provider.prototype);
	AI.ProviderAnthropic.prototype.constructor = AI.ProviderAnthropic;

	AI.ProviderAnthropic.prototype.createInstance = function(name, url, key) {
		return new AI.ProviderAnthropic(name, url, key);
	};

	AI.ProviderAnthropic.prototype.checkModelCapability = function(model) {
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
	};

	AI.ProviderAnthropic.prototype.overrideEndpointUrl = function(endpoint) {
		if (AI.Endpoints.Types.v1.Chat_Completions === endpoint)
			return "/messages";
		return undefined;
	};

	AI.ProviderAnthropic.prototype.getRequestBodyOptions = function() {
		return {
			"max_tokens": 4096
		};
	};

	AI.ProviderAnthropic.prototype.getRequestHeaderOptions = function(key) {
		let headers = {
			"Content-Type" : "application/json",
			"anthropic-version" : "2023-06-01",
			"anthropic-dangerous-direct-browser-access": "true"
		};
		if (key)
			headers["x-api-key"] = key;
		return headers;
	};

	// Register internal providers
	AI.Storage.InternalProviders = [];

	AI.Storage.InternalProviders.push(new AI.ProviderOpenAI());
	AI.Storage.InternalProviders.push(new AI.ProviderTogetherAI());
	AI.Storage.InternalProviders.push(new AI.ProviderMistral());

	// bug in desktop with simple request
	if (!AI.isLocalDesktop || AI.getDesktopLocalVersion() >= 8003000)
		AI.Storage.InternalProviders.push(new AI.ProviderAnthropic());

	if (window["AscDesktopEditor"])
		AI.Storage.InternalProviders.push(new AI.ProviderGpt4All());

	AI.Storage.isInternalProvider = function(name) {
		for (let i = 0, len = AI.Storage.InternalProviders.length; i < len; i++) {
			if (name === AI.Storage.InternalProviders[i].name)
				return true;
		}
		return false;
	};

})(window);
