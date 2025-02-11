"use strict";

(async function(){

	class Provider {
		/**
		 * Provider base class.
		 * @param {string} name  Provider name.
		 * @param {string} url   Url to service.
		 * @param {string} key   Key for service. This is an optional field. Some providers may require a key for access.
		 * @param {string} addon Addon for url. For example: v1 for many providers. 
		 */
		constructor(name, url, key, addon) {
			this.name  = name  || "";
			this.url   = url   || "";
			this.key   = key   || "";
			this.addon = addon || "";
	
			this.models = [];
			this.modelsUI = [];
		}

		/**
		 * If you add an implementation here, then no request will be made to the service.
		 * @returns {Object[] | undefined}
		 */
		getModels() {
			return undefined;
		}

		/**
		 * Correct received (*models* endpoint) model object.
		 */
		correctModelInfo(model) {
			if (undefined === model.id && model.name) {
				model.id = model.name;
				return;
			}
			model.name = model.id;
		}
	
		/**
		 * Return *true* if you do not want to work with a specific model (model.id). 
		 * The model will not be presented in the combo box with the list of models.
		 * @returns {boolean}
		 */
		checkExcludeModel(model) {
			return false;
		}
	
		/**
		 * Return enumeration with capabilities for this model (model.id). (Some providers does not get the information for this functionalities).
		 * Example: AI.CapabilitiesUI.Chat | AI.CapabilitiesUI.Image;
		 * @returns {number}
		 */
		checkModelCapability(model) {
			return AI.CapabilitiesUI.All;
		}
	
		/**
		 * Url for a specific endpoint.
		 * @returns {string}
		 */
		getEndpointUrl(endpoint, model) {
			let Types = AI.Endpoints.Types;
			switch (endpoint)
			{
			case Types.v1.Models:
				return "/models";

			case Types.v1.Chat_Completions:
				return "/chat/completions";
			case Types.v1.Completions:
				return "/completions";

			case Types.v1.Images_Generations:
				return "/images/generations";
			case Types.v1.Images_Edits:
				return "/images/edits";
			case Types.v1.Images_Variarions:
				return "/images/variations";

			case Types.v1.Embeddings:
				return "/embeddings";

			case Types.v1.Audio_Transcriptions:
				return "/audio/transcriptions";
			case Types.v1.Audio_Translations:
				return "/audio/translations";
			case Types.v1.Audio_Speech:
				return "/audio/speech";

			case Types.v1.Moderations:
				return "/moderations";

			case Types.v1.Language:
				return "/completions";
			case Types.v1.Code:
				return "/completions";

			case Types.v1.Realtime:
				return "/realtime";

			default:
				break;
			}

			return "";
		}
	
		/**
		 * An object-addition to the model. It is used, among other things, to configure the model parameters.
		 * Don't override this method unless you know what you're doing.
		 * @returns {Object}
		 */
		getRequestBodyOptions() {
			return {};
		}

		/**
		 * The returned object is an enumeration of all the headers for the requests.
		 * @returns {Object}
		 */
		getRequestHeaderOptions() {
			let headers = {
				"Content-Type" : "application/json"
			};
			if (this.key)
				headers["Authorization"] = "Bearer " + this.key;
			return headers;
		}
		
		/**
		 * This method returns whether a proxy server needs to be used to work with this provider.
		 * Don't override this method unless you know what you're doing.
		 * @returns {boolean}
		 */
		isUseProxy() {
			return false;
		}
	
		/**
		 * This method returns whether this provider is only supported in the desktop application.
		 * Don't override this method unless you know what you're doing.
		 * @returns {boolean}
		 */
		isOnlyDesktop() {
			return false;
		}

		/**
		 * Get request body object by message.
		 * @param {Object} message 
		 * *message* is in folowing format:
		 * {
		 *     messages: [
		 *         { role: "developer", content: "You are a helpful assistant." },
		 *         { role: "system", content: "You are a helpful assistant." },
		 *         { role: "user", content: "Hello" },
		 *         { role: "assistant", content: "Hey!" },
		 *         { role: "user", content: "Hello" },
		 *         { role: "assistant", content: "Hey again!" }
		 *     ]
		 * }
		 */
		getChatCompletions(message, model) {
			return {
				model : model.id,
				messages : message.messages
			}
		}

		/**
		 * Get request body object by message.
		 * @param {Object} message 
		 * *message* is in folowing format:
		 * {
		 *     text: "Please, calculate 2+2."
		 * }
		 */
		getCompletions(message, model) {
			return {
				model : model.id,
				prompt : message.text
			}
		}

		/**
		 * Convert *getChatCompletions* and *getCompletions* answer to result simple message.
		 * @returns {Object} result 
		 * *result* is in folowing format:
		 * {
		 *     content: ["Hello", "Hi"]
		 * }
		 */
		getChatCompletionsResult(message, model) {
			let result = {
				content : []
			};

			let arrResult = message.data.choices || message.data.content || message.data.candidates;
			if (!arrResult)
				return result;

			let choice = arrResult[0];
			if (!choice)
				return result;
			
			if (choice.message && choice.message.content)
				result.content.push(choice.message.content);
			if (choice.text)
				result.content.push(choice.message.text);
			if (choice.content) {
				if (typeof(choice.content) === "string")
					result.content.push(choice.content);
				else if (Array.isArray(choice.content.parts)) {
					for (let i = 0, len = choice.content.parts.length; i < len; i++) {
						result.content.push(choice.content.parts[i].text);
					}
				}
			}

			let trimArray = ["\n".charCodeAt(0)];
			for (let i = 0, len = result.content.length; i < len; i++) {
				let iEnd = result.content[i].length - 1;
				let iStart = 0;
				while (iStart < iEnd && trimArray.includes(result.content[i].charCodeAt(iStart)))
					iStart++;
				while (iEnd > iStart && trimArray.includes(result.content[i].charCodeAt(iEnd)))
					iEnd--;

				if (iEnd > iStart && ((0 !== iStart) || ((result.content[i].length - 1) !== iEnd)))
					result.content[i] = result.content[i].substring(iStart, iEnd + 1);				
			}

			return result;
		}

		/**
		 * ========================================================================================
		 * The following are methods for internal work. There is no need to overload these methods.
		 * ========================================================================================
		 */	
		createInstance(name, url, key, addon) {
			//let inst   = Object.create(Object.getPrototypeOf(this));
			let inst   = new this.constructor();
			inst.name  = name;
			inst.url   = url;
			inst.key   = key;
			inst.addon = addon || "";
			return inst;
		}

		checkModelsUI() {
			for (let i = 0, len = this.models.length; i < len; i++) {
				let model = this.models[i];
				let modelUI = new window.AI.UI.Model(model.name, model.id, model.provider);
				modelUI.capabilities = this.checkModelCapability(model);
				this.modelsUI.push(modelUI);
			}
		}
	}
	
	window.AI.Provider = Provider;
	await AI.loadInternalProviders();	
	
})();
