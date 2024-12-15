(function(exports, undefined)
{
	exports.AI = exports.AI || {};
	var AI = exports.AI;
	AI.UI = AI.UI || {};
	AI.Storage = AI.Storage || {};
	AI.Storage.Version = 2;

	AI.Endpoints = {

		Types : {

			Undefined                  : -1,

			v1 : {

				Models                 : 0x00,

				Chat_Completions       : 0x01,
				Completions            : 0x02,

				Images_Generations     : 0x11,
				Images_Edits           : 0x12,
				Images_Variarions      : 0x13,

				Embeddings             : 0x21,

				Audio_Transcriptions   : 0x31,
				Audio_Translations     : 0x32,
				Audio_Speech           : 0x33,

				Moderations            : 0x41,

				Realtime               : 0x51,

				Language               : 0x61,
				Code                   : 0x62
			}

		}
	};

	AI.CapabilitiesUI = {

		None            : 0x00,

		Chat            : 0x01,
		
		Image           : 0x02,

		Embeddings      : 0x04,

		Audio           : 0x08,

		Moderations     : 0x10,

		Realtime        : 0x20,

		Code            : 0x40,

		Vision          : 0x80

	};

	let capabilitiesAll = 0;
	for (let item in AI.CapabilitiesUI)
		capabilitiesAll = AI.CapabilitiesUI[item];
	AI.CapabilitiesUI.All = capabilitiesAll;

	AI.Endpoints.getUrl = function(type) {

		let Types = AI.Endpoints.Types;
		switch (type)
		{
		case Types.v1.Models:
			return "/v1/models";

		case Types.v1.Chat_Completions:
			return "/v1/chat/completions";
		case Types.v1.Completions:
			return "/v1/completions";

		case Types.v1.Images_Generations:
			return "/v1/images/generations";
		case Types.v1.Images_Edits:
			return "/v1/images/edits";
		case Types.v1.Images_Variarions:
			return "/v1/images/variations";

		case Types.v1.Embeddings:
			return "/v1/embeddings";

		case Types.v1.Audio_Transcriptions:
			return "/v1/audio/transcriptions";
		case Types.v1.Audio_Translations:
			return "/v1/audio/translations";
		case Types.v1.Audio_Speech:
			return "/v1/audio/speech";

		case Types.v1.Moderations:
			return "/v1/moderations";

		case Types.v1.Language:
			return "/v1/completions";
		case Types.v1.Code:
			return "/v1/completions";

		case Types.v1.Realtime:
			return "/v1/realtime";

		default:
			break;
		}

		return "";

	};

	/**
	 * PROVIDER BASE CLASS
	 */

	AI.Provider = function(name, url, key) {
		this.name = name || "";
		this.url = url || "";
		this.key = key || "";

		this.models = [];
		this.modelsUI = [];		
	};

	AI.Provider.createInstance = function(name, url, key) {
		for (let i = 0, len = AI.Storage.InternalProviders.length; i < len; i++) {
			if (name === AI.Storage.InternalProviders[i].name)
				return AI.Storage.InternalProviders[i].createInstance(name, url, key);
		}
		return AI.Provider.prototype.createInstance(name, url, key);
	};

	AI.Provider.prototype.createInstance = function(name, url, key) {
		return new AI.Provider(name, url, key);
	};
	AI.Provider.prototype.checkExcludeModel = function(model) {
		return false;
	};
	AI.Provider.prototype.checkModelCapability = function(model) {
		return AI.CapabilitiesUI.All;
	};
	AI.Provider.prototype.checkModelsUI = function() {
		for (let i = 0, len = this.models.length; i < len; i++) {
			let model = this.models[i];
			let modelUI = new AI.UI.Model(model.name, model.id, model.provider);
			modelUI.capabilities = this.checkModelCapability(model);
			this.modelsUI.push(modelUI);
		}
	};

	AI.InputMaxTokens = {
		"4k" : 4096,
		"8k" : 8192,
		"16k" : 16384,
		"32k" : 32768,
		"64k" : 65536,
		"128k" : 131072,
		"256k" : 262144
	};

	let keys = [];
	for (let i in AI.InputMaxTokens)
		keys.push(i);

	AI.InputMaxTokens.keys = keys;
	AI.InputMaxTokens.getFloor = function(value) {
		let result = undefined;
		for (let i = 0, len = AI.InputMaxTokens.keys.length; i < len; i++) {
			if (AI.InputMaxTokens[AI.InputMaxTokens.keys[i]] <= value)
				result = AI.InputMaxTokens[AI.InputMaxTokens.keys[i]];
		}
		return result;
	};

	/**
	 * UI
	 */
	AI.UI.Model = function(name, id, provider, capabilities) {
		this.capabilities = capabilities || AI.CapabilitiesUI.None;
		this.provider     = provider || "";
		this.name         = name || "";
		this.id           = id || "";		
	};

	AI.UI.Provider = function(name, key, url) {
		this.name  = name || "";
		this.key   = key || "";
		this.url   = url || "";
	};

	AI.UI.Action = function(name, icon, model) {
		this.name = name || "";
		this.icon = icon || "";
		this.model = model || "";
	};

})(window);
