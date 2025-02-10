(function(exports, undefined)
{
	// This script must be added after storage.js

	var AI = exports.AI;	

	

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

	AI.Storage.InternalProviders.push(new AI.ProviderGroqAI());

	AI.Storage.isInternalProvider = function(name) {
		for (let i = 0, len = AI.Storage.InternalProviders.length; i < len; i++) {
			if (name === AI.Storage.InternalProviders[i].name)
				return true;
		}
		return false;
	};

})(window);
