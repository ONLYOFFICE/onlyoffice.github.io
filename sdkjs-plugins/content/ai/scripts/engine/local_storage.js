(function(exports, undefined)
{
	exports.AI = exports.AI || {};
	var AI = exports.AI;
	
	var localStorageKey = "onlyoffice_ai_plugin_storage_key";

	AI.Providers = {};
	for (let i = 0, len = AI.Storage.InternalProviders.length; i < len; i++) {
		let pr = AI.Storage.InternalProviders[i];
		AI.Providers[pr.name] = pr;
	}

	AI.serializeProviders = function() {
		let result = [];
		for (let i in AI.Providers) {
			if (AI.Providers[i].name) {
				result.push({
					name : AI.Providers[i].name,
					url : AI.Providers[i].url,
					key : AI.Providers[i].key,
					models : AI.Providers[i].models
				});
			}
		}
		return result;
	};

	AI.Models = [];

	AI.Storage.save = function() {
		try {
			let obj = {
				version : AI.Storage.Version,
				providers : AI.Providers,
				models : AI.Models
			};

			window.localStorage.setItem(localStorageKey, JSON.stringify(obj));

			if (this.onChangeStorage)
				this.onChangeStorage();
			return true;
		}
		catch (e) {
		}
		return false;
	};

	AI.Storage.load = function() {
		try {
			let obj = JSON.parse(window.localStorage.getItem(localStorageKey));

			switch (obj.version)
			{
			case undefined:
				obj = null;
				break;
			case 1:
			default:
				break;
			}
			
			if (obj) {
				let oldProviders = AI.Providers;
				AI.Providers = obj.providers;
				for (let pr in oldProviders)
				{
					if (!AI.Providers[pr])
						AI.Providers[pr] = oldProviders[pr];
				}

				AI.Models = obj.models;
			}

			return true;
		}
		catch (e) {
		}
		return false;
	};

	AI.Storage.addModel = function(model) {

		if (AI.Providers[model.provider.name]) {
			AI.Providers[model.provider.name].name = model.provider.name;
			AI.Providers[model.provider.name].url = model.provider.url;
			AI.Providers[model.provider.name].key = model.provider.key;
		} else {
			AI.Providers[model.provider.name] = {
				name : model.provider.name,
				url : model.provider.url,
				key : model.provider.key,
				models : []
			};
		}

		let isFoundModel = false;
		for (let i = 0, len = AI.Models.length; i < len; i++)
		{
			if (AI.Models[i].id === model.id)
			{
				AI.models[i].provider = model.provider.name;
				AI.models[i].name = model.name;
				AI.models[i].capabilities = model.capabilities;
				isFoundModel = true;
			}
		}

		if (!isFoundModel)
			AI.Models.push(new AI.UI.Model(model.name, model.id, model.provider, 
				model.capabilities === undefined ? AI.CapabilitiesUI.All : model.capabilities));

		this.save();
	};

	AI.Storage.removeModel = function(modelId) {
		for (let i = 0, len = AI.Models.length; i < len; i++)
		{
			if (AI.Models[i].id === modelId)
			{
				AI.Models.splice(i, 1);
				this.save();
				return;
			}
		}
	};

	AI.Storage.getModelByName = function(name) {
		for (let i in AI.Models) {
			if (AI.Models[i].name === name)
				return {
					name : AI.Models[i].name,
					id : AI.Models[i].id,
					provider : AI.Models[i].provider,
					capabilities : AI.Models[i].capabilities,
				};
		}
		return null;
	};

	AI.Storage.serializeModels = function() {
		let result = [];
		for (let i in AI.Models) {
			if (AI.Models[i].id) {
				result.push({
					name : AI.Models[i].name,
					id : AI.Models[i].id,
					provider : AI.Models[i].provider,
					capabilities : AI.Models[i].capabilities,
				});
			}
		}
		return result;
	};

	AI.Storage.getProviderPrototypeByName = function(name) {
		for (let i = 0, len = AI.Storage.InternalProviders.length; i < len; i++) {
			if (name === AI.Storage.InternalProviders[i].name)
				return AI.Storage.InternalProviders[i].checkModelCapability;			
		}
		return AI.Provider.prototype.checkModelCapability;
	};

	AI.Storage.setModelsToProvider = function(provider) {
		if (!provider.models || 0 === provider.models.length)
			return;
		for (let i = 0, len = AI.Providers.length; i < len; i++)
			AI.Providers[i].models = provider.models;
	};

	AI.Storage.load();

})(window);
