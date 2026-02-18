/*
 * (c) Copyright Ascensio System SIA 2010-2025
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

function fetchExternal(url, options, isStreaming) {
	if (!window.externalFetchRecords) {
		window.externalFetchRecords = {
			counter : 0,
			requests : {}
		};
		window.Asc.plugin.attachEditorEvent("ai_onExternalFetch", function(e) {
			let request = window.externalFetchRecords.requests[e.id];
			if (!request)
				return;

			if (e.type === "error") {
				request.resolve(new Error(e.error));
				delete window.externalFetchRecords.requests[e.id];
				return;
			}

			if (e.type === "response") {
				if (request.streaming) {
					let stream = new ReadableStream({
						start : function(controller) {
							request.controller = controller;
						}
					});

					let response = new Response(stream, { 
						status : e.status,
						headers : e.headers
					});

					request.resolve(response);
				} else {
					let response = new Response(e.body, { 
						status : e.status,
						headers : e.headers
					});

					request.resolve(response);
					delete window.externalFetchRecords.requests[e.id];
				}
			}

			if (e.type === "chunk" && request.streaming && request.controller) {
				request.controller.enqueue(new TextEncoder().encode(e.chunk));
			}

			if (e.type === "end" && request.streaming && request.controller) {
				request.controller.close();
				delete window.externalFetchRecords.requests[e.id];
			}			
		});
	}

	return new Promise((resolve, reject) => {
		let request = {
			id : ++window.externalFetchRecords.counter,
			streaming : isStreaming,
			resolve : resolve,
			reject : reject,
			controller : null
		};

		window.externalFetchRecords.requests[request.id] = request;

		if (options && options.signal) {
			options.signal.addEventListener('abort', function(){
				if (!request.aborted) {
					request.aborted = true;
					
					window.Asc.plugin.sendEvent("ai_onExternalFetch", {
						id : request.id,
						type : "abort"
					});
					
					if (request.controller) {
						request.controller.close();
					}
					
					request.resolve(new Error("Request aborted"));
					delete window.externalFetchRecords.requests[request.id];
				}
			});
		}

		window.Asc.plugin.sendEvent("ai_onExternalFetch", {
			id : request.id,
			url : url,
			options : options,
			streaming : isStreaming,
			type: "request"
		});
	});
}

(function(window, undefined)
{
	async function requestWrapper(message) {
		return new Promise(function (resolve, reject) {
			if (AI.isLocalDesktopForNotStreamedRequests && (AI.isLocalUrl(message.url) || message.isUseProxy)) {
				window.AscSimpleRequest.createRequest({
					url: message.url,
					method: message.method,
					headers: message.headers,
					body: message.isBlob ? message.body : (message.body ? JSON.stringify(message.body) : ""),
					complete: function(e, status) {
						let data = JSON.parse(e.responseText);
						resolve({error: 0, data: data.data ? data.data : data});
					},
					error: function(e, status, error) {
						if ( e.statusCode == -102 ) e.statusCode = 404;
						resolve({error: e.statusCode, message: "Internal error"});
					}
				});
			} else {
				let requestUrl = message.url;
				let request = {
					method: message.method,
					headers: message.headers
				};
				if (request.method != "GET") {
					request.body = message.isBlob ? message.body : (message.body ? JSON.stringify(message.body) : "");

					if (message.isUseProxy) {
						request = {
							"method" : request.method,
							"body" : JSON.stringify({
								"target" : message.url,
								"method" : request.method,
								"headers" : request.headers,
								"data" : request.body
							})
						}
						if (AI.serverSettings){
							requestUrl = AI.serverSettings.proxy;
							request["headers"] = {
								"Authorization" : "Bearer " + Asc.plugin.info.jwt,
							}
						} else {
							requestUrl = AI.PROXY_URL;
						}
					}
				}
				
				try {
					let _fetch = fetch;
					if (requestUrl.startsWith("[external]"))
						_fetch = fetchExternal;
					
					let fetchResponse;
					_fetch(requestUrl, request)
						.then(function(response) {
							fetchResponse = response;
							return response.text();
						})
						.then(function(text) {
							try {
								return JSON.parse(text)
    						} catch {
      							return { error : text };
    						}
						})
						.then(function(data) {
							if (data.error)
								resolve({error: 1, message: data.error.message ? data.error.message : ((typeof data.error === "string") ? data.error : "")});
							else if (fetchResponse && fetchResponse.status == 401 )
								resolve({error: 1, message: fetchResponse.statusText ? fetchResponse.statusText : "Unauthorized"});	
							else
								resolve({error: 0, data: data.data ? data.data : data});
						})
						.catch(function(error) {
							resolve({error: 1, message: error.message ? error.message : ""});                        
						});
				} catch (error) {
					resolve({error: 1, message: error.message ? error.message : ""});
				}
			}
		});
	}

	async function requestWrapperStream(message) {
		function FetchReader(reader, abortController) {
			this.reader = reader;
			this.decoder = new TextDecoder();
			this.abortController = abortController;

			this.read = async function() {
				try {
					const { done, value } = await this.reader.read();
					return {
						done: done,
						value: done ? "" : this.decoder.decode(value, { stream: true })
					};
				}
				catch (error) {
					if (error.name === "AbortError") {
						return { done: true };
					}
					return {
						error: 1,
						message: error.message || ""
					};
				}
			};

			this.abort = async function() {
				try {
					if (this.abortController)
						this.abortController.abort();
				} catch {}

				try {
					if (this.reader)
						await this.reader.cancel();
				} catch {}
			};
		}

		let abortController = new AbortController();

		let request = {
			method: message.method,
			headers: message.headers,
			signal: abortController.signal
		};

		if (request.method !== "GET") {
			request.body = message.isBlob
				? message.body
				: (message.body ? JSON.stringify(message.body) : "");
		}

		try {
			let response = !message.url.startsWith("[external]")
				? await fetch(message.url, request)
				: await fetchExternal(message.url, request, true);

			return response.body
				? new FetchReader(response.body.getReader(), abortController)
				: null;
		}
		catch (error) {
			return null;
		}
	}

	AI.TmpProviderForModels = null;

	AI.PROXY_URL = "https://plugins-services.onlyoffice.com/proxy";

	AI._getHeaders = function(_provider) {
		let provider = _provider.createInstance ? _provider : AI.Storage.getProvider(_provider.name);
		if (!provider) provider = new AI.Provider();
		return provider.getRequestHeaderOptions();
	};

	AI._getModelsSync = function(_provider) {
		let provider = _provider.createInstance ? _provider : AI.Storage.getProvider(_provider.name);
		if (!provider) provider = new AI.Provider();
		return provider.getModels();
	};

	AI._extendBody = function(_provider, body) {
		let provider = _provider.createInstance ? _provider : AI.Storage.getProvider(_provider.name);
		if (!provider) provider = new AI.Provider();
		let bodyPr = provider.getRequestBodyOptions(body);

		if (provider.isUseProxy())
			bodyPr.target = provider.url;

		for (let i in bodyPr) {
			if (!body[i])
				body[i] = bodyPr[i];
		}

		return provider.isUseProxy() || AI.serverSettings;
	};

	AI._getEndpointUrl = function(_provider, endpoint, model, options) {
		let provider = _provider.createInstance ? _provider : AI.Storage.getProvider(_provider.name);
		if (!provider) provider = new AI.Provider(_provider.name, _provider.url, _provider.key);

		if (_provider.key)
			provider.key = _provider.key;

		let url = provider.url;
		if (!_provider.createInstance && _provider.url !== undefined)
			url = _provider.url;

		if (url.endsWith("/"))
			url = url.substring(0, url.length - 1);
		if ("" !== provider.addon)
		{
			let plus = "/" + provider.addon;
			let pos = url.lastIndexOf(plus);
			if (pos === -1 || pos !== (url.length - plus.length))
				url += plus;
		}

		return url + provider.getEndpointUrl(endpoint, model, options);
	};

	AI.getModels = async function(provider)
	{
		AI.TmpProviderForModels = null;
		return new Promise(function (resolve, reject) {

			function resolveRequest(data) {
				if (data.error)
					resolve({
						provider: provider.name,
						error : 1,
						message : data.message,
						models : []
					});
				else {
					AI.TmpProviderForModels = AI.createProviderInstance(provider.name, provider.url, provider.key);
					let models = data.data;
					if (data.data.models)
						models = data.data.models;
					for (let i = 0, len = models.length; i < len; i++)
					{
						let model = models[i];
						AI.TmpProviderForModels.correctModelInfo(model);
						
						if (!model.id)
							continue;

						model.endpoints = [];
						model.options = {};						

						if (AI.TmpProviderForModels.checkExcludeModel(model))
							continue;

						let modelUI = new AI.UI.Model(model.name, model.id, 
							provider.name, AI.TmpProviderForModels.checkModelCapability(model));
						AI.TmpProviderForModels.models.push(model);
						AI.TmpProviderForModels.modelsUI.push(modelUI);
					}

					resolve({
						provider: provider.name,
						error : 0,
						message : "",
						models : AI.TmpProviderForModels.modelsUI
					});
				}
			}

			let syncModels = AI._getModelsSync(provider);
			if (Array.isArray(syncModels))
			{
				resolveRequest({
					error : 0,
					data : syncModels
				});
				return;
			}

			let url = AI._getEndpointUrl(provider, AI.Endpoints.Types.v1.Models);
			let headers = AI._getHeaders(provider);
			requestWrapper({
				url : url,
				headers : headers,
				method : "GET"
			}).then(function(data) {
				resolveRequest(data);
			});
		});
	};

	AI.Request = function(model) {
		this.modelUI = model;
		this.model = null;
		this.errorHandler = null;

		if (model.id.startsWith(AI.externalModelPrefix)) {
			this.model = this.modelUI;
			return;
		}

		if ("" !== model.provider) {
			let provider = null;
			for (let i in AI.Providers) {
				if (model.provider === AI.Providers[i].name) {
					provider = AI.Providers[i];
					break;
				}
			}

			if (provider) {
				for (let i = 0, len = provider.models.length; i < len; i++) {
					if (model.id === provider.models[i].id ||
						model.id === provider.models[i].name)
					{
						this.model = provider.models[i];
					}
				}
			}
		}
	};

	AI.Request.create = function(action, disableSettings) {
		let model = AI.Storage.getModelById(AI.Actions[action].model);
		if (!model) {
			if (!disableSettings)
				onOpenSettingsModal();
			return null;
		}
		return new AI.Request(model);
	};

	AI.Request.prototype.setErrorHandler = function(callback) {
		this.errorHandler = callback;
	};

	AI.Request.prototype._wrapRequest = async function(func, data, block, streamFunc) {
		let isActionRestriction = (block && (undefined !== streamFunc)) ? true : undefined;
		if (block)
			await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + this.modelUI.name + ")"]);
		let result = undefined;
		try {
			result = await func.call(this, data, streamFunc);
		} catch (err) {
			if (err.error) {
				if (block)
					await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + this.modelUI.name + ")"]);
				if (this.errorHandler)
					this.errorHandler(err);
				else {
					if (true) {
						// timer for exit from long action
						setTimeout(async function(){
							await Asc.Library.SendError(err.message, 0);
						}, 100);						
					} else {
						// since 8.3.0!!!
						await Asc.Editor.callMethod("ShowError", [err.message, 0]);
					}
				}
				return;
			}
		}
		if (block)
			await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + this.modelUI.name + ")"]);
		return result;
	};

	// CHAT REQUESTS
	AI.Request.prototype.chatRequest = async function(content, block, streamFunc) {
		return await this._wrapRequest(this._chatRequest, content, block !== false, streamFunc);
	};

	// Chat request with full response (includes tool_calls)
	AI.Request.prototype.chatRequestAgent = async function(content, block, streamFunc) {
		return await this._wrapRequest(this._chatRequestAgent, content, block !== false, streamFunc);
	};

	AI.Request.prototype._chatRequest = async function(content, streamFunc) {
		let provider = null;
		if (this.modelUI)
			provider = AI.Storage.getProvider(this.modelUI.provider);

		if (!provider) {
			throw { 
				error : 1, 
				message : "Please select the correct model for action." 
			};
			return;
		}

		let isUseCompletionsInsteadChat = false;
		if (this.model) {
			let isFoundChatCompletions = false;
			let isFoundCompletions = false;
			for (let i = 0, len = this.model.endpoints.length; i < len; i++) {
				if (this.model.endpoints[i] === AI.Endpoints.Types.v1.Chat_Completions) {
					isFoundChatCompletions = true;
					break;
				}
				if (this.model.endpoints[i] === AI.Endpoints.Types.v1.Completions) {
					isFoundCompletions = true;
					break;
				}
			}

			if (isFoundCompletions && !isFoundChatCompletions)
				isUseCompletionsInsteadChat = true;
		}

		let isNoSplit = false;
		let max_input_tokens = AI.InputMaxTokens["32k"];
		if (this.model && this.model.options && undefined !== this.model.options.max_input_tokens)
			max_input_tokens = this.model.options.max_input_tokens;

		let header_footer_overhead = 500;
		// for test chunks:
		if (false) {
			max_input_tokens = 50;
			let header_footer_overhead = 0;
		}

		if (max_input_tokens < header_footer_overhead)
			max_input_tokens = header_footer_overhead + 1000;

		let headers = AI._getHeaders(provider);

		let isMessages = Array.isArray(content);

		if (isUseCompletionsInsteadChat && isMessages) {
			content = content[content.length - 1].content;
			isMessages = false;
		}

		let isStreaming = (undefined !== streamFunc);

		if (isMessages)
			isNoSplit = true;

		let input_len = content.length;
		let input_tokens = isMessages ? 0 : Asc.OpenAIEncode(content).length;
		
		let messages = [];
		if (input_tokens < max_input_tokens || isNoSplit) {
			messages.push(content);
		} else {
			let chunkLen = (((max_input_tokens - header_footer_overhead) / input_tokens) * input_len) >> 0;
			let currentLen = 0;
			while (currentLen != input_len) {
				let endSymbol = currentLen + chunkLen;
				if (endSymbol >= input_len)
					endSymbol = undefined;
				messages.push(content.substring(currentLen, endSymbol));
				if (undefined === endSymbol)
					currentLen = input_len;
				else
					currentLen = endSymbol;
			}
		}

		let objRequest = {
			headers : headers,
			method : "POST"
		};

		let endpointType = isUseCompletionsInsteadChat ? AI.Endpoints.Types.v1.Completions :
			AI.Endpoints.Types.v1.Chat_Completions;

		let options = {
			streaming : isStreaming
		};
		objRequest.url = AI._getEndpointUrl(provider, endpointType, this.model, options);

		let requestBody = {};
		let model = this.model;
		let processResult = function(data) {
			let result = provider.getChatCompletionsResult(data, model, isStreaming ? false : true);
			if (result.content.length === 0)
				return "";

			if (0 === result.content[0].indexOf("<think>")) {
				let end = result.content[0].indexOf("</think>");
				if (end !== -1)
					result.content[0] = result.content[0].substring(end + 8);
			}

			return result.content[0];
		};

		if (1 === messages.length) {
			if (!isUseCompletionsInsteadChat) {
				if (isMessages)
					requestBody.messages = messages[0];
				else
					requestBody.messages = [{role:"user",content:messages[0]}];

				objRequest.body = provider.getChatCompletions(requestBody, this.model);

				if (isStreaming && options.streamingBody !== false)
					objRequest.body.stream = true;
			} else {
				objRequest.body = provider.getCompletions({ text : messages[0] }, model);
			}

			objRequest.isUseProxy = AI._extendBody(provider, objRequest.body);

			let readerAsync = null;
			if (isStreaming)
				readerAsync = await requestWrapperStream(objRequest);

			if (!readerAsync) {
				if (isStreaming && objRequest.body.stream)
					delete objRequest.body.stream;
				let result = await requestWrapper(objRequest);
				if (result.error) {
					throw {
						error : result.error, 
						message : result.message
					};
					return;
				} else {
					return processResult(result);
				}
			} else {
				
				let allChunks = "";
				let tail = "";
				
				while (true) {
					const readData = await readerAsync.read();
					if (readData.error) {
						throw {
							error : readData.error, 
							message : readData.message
						};
					}

					if (readData.done) 
						break;

					let resultObj = getStreamedResult(tail + readData.value);
					tail = resultObj.tail;

					//let chunks = eval(resultObj.result);
					let chunks = JSON.parse(resultObj.result);

					let errorObj = null;
					try {
						if (chunks.error)
							errorObj = chunks.error;
						else if (chunks[0].error)
							errorObj = chunks[0].error;
						else if (chunks.data && chunks.data.error)
							errorObj = chunks.data.error;
						else if (chunks[0].data && chunks[0].data.error)
							errorObj = chunks[0].data.error;
					} catch (err) {					
					}

					if (errorObj) {
						throw {
							error : errorObj, 
							message : errorObj.message || JSON.stringify(errorObj)
						};
						return;
					}

					let dataChunk = "";
					for (let j = 0, len = chunks.length; j < len; j++) {
						dataChunk += processResult(chunks[j]);

						// TODO: MD support
						//dataChunk = dataChunk.replace(/\n\n/g, '\n');
					}

					allChunks += dataChunk;

					if (streamFunc) {
						let isBreak = await streamFunc(dataChunk);
						if (isBreak === true) {
							await readerAsync.abort();
							break;
						}
					}
				}
				return allChunks;
			}

		} else {

			let lastFooterForOldModels = "";
			let indexTask = content.indexOf(": \"");
			if (-1 != indexTask && indexTask < 100) {
				lastFooterForOldModels = content.substring(0, indexTask);
			}

			function getHeader(part, partsCount) {
				let header = "[START PART " + part + "/" + partsCount + "]\n";
				if (part != partsCount) {
					header = "Do not answer yet. This is just another part of the text I want to send you. Just receive and acknowledge as \"Part " + part + "/" + partsCount + " received\" and wait for the next part.\n" + header;
				}
				return header;
			}

			function getFooter(part, partsCount) {
				let footer = "\n[END PART " + part + "/" + partsCount + "]\n";
				if (part != partsCount) {
					footer += "Remember not answering yet. Just acknowledge you received this part with the message \"Part " + part + "/" + partsCount + " received\" and wait for the next part.";
				} else {
					footer += "ALL PARTS SENT. Now you can continue processing the request." + lastFooterForOldModels;
				}
				return footer;
			}

			let resultText = "";
			for (let i = 0, len = messages.length; i < len; i++) {
				
				let message = getHeader(i + 1, len) + messages[i] + getFooter(i + 1, len);
				if (!isUseCompletionsInsteadChat) {
					objRequest.body = provider.getChatCompletions({ messages : [{role:"user",content:message}] }, model);
				} else {
					objRequest.body = provider.getCompletions( { text : message }, model);
				}

				objRequest.isUseProxy = AI._extendBody(provider, objRequest.body);

				let result = await requestWrapper(objRequest);
				if (result.error) {
					throw {
						error : result.error, 
						message : result.message
					};
					return resultText;
				} else if (i === (len - 1)) {
					resultText += processResult(result);
				}				
			}
			return resultText;
		}
	};

	// Version for agent
	AI.Request.prototype._chatRequestAgent = async function(content, streamFunc) {
		let provider = null;
		if (this.modelUI)
			provider = AI.Storage.getProvider(this.modelUI.provider);

		if (!provider) {
			throw {
				error : 1,
				message : "Please select the correct model for action."
			};
		}

		let headers = AI._getHeaders(provider);

		let objRequest = {
			headers : headers,
			method : "POST"
		};

		let isStreaming = (undefined !== streamFunc);
		let options = { streaming: isStreaming };

		objRequest.url = AI._getEndpointUrl(provider, AI.Endpoints.Types.v1.Chat_Completions, this.model, options);
		objRequest.body = provider.getChatCompletions({ messages : content.messages }, this.model);

		if (content.tools) {
			provider.addTools(objRequest.body, content.tools);
		}

		if (isStreaming && options.streamingBody !== false) {
			objRequest.body.stream = true;
		}

		objRequest.isUseProxy = AI._extendBody(provider, objRequest.body);

		let processResult = function(data, model, isStreaming) {
			let result = provider.getChatCompletionsResult(data, model, isStreaming ? false : true);
			if (result.content.length === 0)
				return "";

			if (0 === result.content[0].indexOf("<think>")) {
				let end = result.content[0].indexOf("</think>");
				if (end !== -1)
					result.content[0] = result.content[0].substring(end + 8);
			}

			return result.content[0];
		};

		if (isStreaming) {
			let readerAsync = await requestWrapperStream(objRequest);

			if (!readerAsync) {
				if (objRequest.body.stream)
					delete objRequest.body.stream;
				let result = await requestWrapper(objRequest);
				if (result.error) {
					throw {
						error : result.error,
						message : result.message
					};
				}
				return {
					content: processResult(result, this.model, true),
					tool_calls: provider.getToolCallsResult ? provider.getToolCallsResult(result) : null,
					raw: result
				};
			}

			// Streaming processing
			let allContent = "";
			let tail = "";
			let isSimpleStream = content.tools ? true : false;
			
			let isBufferingFunction = false;
			let functionBuffer = "";

			let allTools = Object.create(null);

			while (true) {
				if (window.AgentState.isStopped) {
					await readerAsync.abort();
					break;
				}

				const readData = await readerAsync.read();
				if (readData.error) {
					throw {
						error : readData.error,
						message : readData.message
					};
				}

				if (readData.done)
					break;

				let resultObj = getStreamedResult(tail + readData.value);
				tail = resultObj.tail;

				let chunks = JSON.parse(resultObj.result);

				let errorObj = null;
				try {
					if (chunks.error)
						errorObj = chunks.error;
					else if (chunks[0].error)
						errorObj = chunks[0].error;
					else if (chunks.data && chunks.data.error)
						errorObj = chunks.data.error;
					else if (chunks[0].data && chunks[0].data.error)
						errorObj = chunks[0].data.error;
				} catch (err) {
				}

				if (errorObj) {
					throw {
						error : errorObj,
						message : errorObj.message || JSON.stringify(errorObj)
					};
				}

				for (let j = 0, len = chunks.length; j < len; j++) {
					let chunk = chunks[j];

					// TOOLS DETECTION (only if content tools was presented):
					if (content.tools) {
						// chunks from streaming
						let chunkToolCalls = provider.getToolCallsResult ? provider.getToolCallsResult(chunk) : null;
						if (chunkToolCalls && chunkToolCalls.length > 0) {
							for (let tc of chunkToolCalls) {
								let index = tc.index !== undefined ? tc.index : 0;

								if (!allTools[index]) {
									allTools[index] = {
										index: index,
										id: tc.id || '',
										type: tc.type || 'function',
										function: {
											name: tc.function?.name || '',
											arguments: tc.function?.arguments || ''
										}
									};
								} else {
									if (tc.id) allTools[index].id = tc.id;
									if (tc.type) allTools[index].type = tc.type;
									if (tc.function?.name) allTools[index].function.name = tc.function.name;

									if (tc.function?.arguments) {
										allTools[index].function.arguments += tc.function.arguments;
									}
								}
							}
							continue;
						}
					}

					let chunkContent = processResult(chunk, this.model, true);
					if (!chunkContent)
						continue;

					allContent += chunkContent;
					if (isSimpleStream) {
						await streamFunc(chunkContent);
					} else if (isBufferingFunction) {
						functionBuffer += chunkContent;
					} else {
						let testFuncCalling = "[functionCalling";
						let testAllContent = allContent.trimStart();

						if (testAllContent.length >= testFuncCalling.length) {
							if (!allContent.startsWith(testFuncCalling)) {
								isSimpleStream = true;
								functionBuffer = "";
								await streamFunc(allContent);
							} else {
								isBufferingFunction = true;
								functionBuffer = testAllContent;
							}
						} else if (testFuncCalling.startsWith(testAllContent)) {
							functionBuffer = testAllContent;
						} else {
							isSimpleStream = true;
							functionBuffer = "";
							await streamFunc(allContent);
						}
					}
				}				
			}

			if (!window.AgentState.isStopped && !isBufferingFunction && functionBuffer.length > 0) {
				await streamFunc(allContent);
			}

			let finalToolCalls = null;
			if (Object.keys(allTools).length > 0) {
				finalToolCalls = Object.values(allTools);
			}

			return {
				content: allContent,
				tool_calls: finalToolCalls,
				raw: null
			};
		} else {
			let result = await requestWrapper(objRequest);
			if (result.error) {
				throw {
					error : result.error,
					message : result.message
				};
			}

			return {
				content: processResult(result, this.model, true),
				tool_calls: provider.getToolCallsResult ? provider.getToolCallsResult(result) : null,
				raw: result
			};
		}
	};

	// IMAGE REQUESTS
	AI.Request.prototype.imageGenerationRequest = async function(data, block) {
		return await this._wrapRequest(this._imageGenerationRequest, data, block !== false);
	};

	AI.Request.prototype._imageGenerationRequest = async function(data) {
		let provider = null;
		if (this.modelUI)
			provider = AI.Storage.getProvider(this.modelUI.provider);

		if (!provider) {
			throw { 
				error : 1, 
				message : "Please select the correct model for action." 
			};
			return;
		}

		let message = {
			prompt : data
		};

		let objRequest = {
			headers : AI._getHeaders(provider),
			method : "POST",
			url : AI._getEndpointUrl(provider, AI.Endpoints.Types.v1.Images_Generations, this.model),
			body : provider.getImageGeneration(message, this.model)
		};

		if (objRequest.body instanceof FormData)
			objRequest.isBlob = true;

		let requestBody = {};
		let model = this.model;
		let processResult = function(data) {
			return provider.getImageGenerationResult(data, model);			
		};

		objRequest.isUseProxy = AI._extendBody(provider, objRequest.body);

		let result = await requestWrapper(objRequest);
		if (result.error) {
			throw {
				error : result.error, 
				message : result.message
			};
			return;
		}
		if (result.data && result.data.errors) {
			throw {
				error : 1, 
				message : result.data.errors[0]
			};
			return;
		}
		return processResult(result);
	};

	AI.Request.prototype.imageVisionRequest = async function(data, block) {
		return await this._wrapRequest(this._imageVisionRequest, data, block !== false);
	};

	AI.Request.prototype._imageVisionRequest = async function(data) {
		let provider = null;
		if (this.modelUI)
			provider = AI.Storage.getProvider(this.modelUI.provider);

		if (!provider) {
			throw { 
				error : 1, 
				message : "Please select the correct model for action." 
			};
			return;
		}

		let message = {
			prompt : data.prompt,
			image : await AI.ImageEngine.getBase64FromAny(data.image)
		};

		let objRequest = {
			headers : AI._getHeaders(provider),
			method : "POST",
			url : AI._getEndpointUrl(provider, AI.Endpoints.Types.v1.Chat_Completions, this.model),
			body : await provider.getImageVision(message, this.model)
		};

		if (objRequest.body instanceof FormData)
			objRequest.isBlob = true;

		let requestBody = {};
		let model = this.model;
		let processResult = function(data) {
			return provider.getImageVisionResult(data, model);
		};

		objRequest.isUseProxy = AI._extendBody(provider, objRequest.body);

		let result = await requestWrapper(objRequest);
		if (result.error) {
			throw {
				error : result.error, 
				message : result.message
			};
			return;
		}
		if (result.data && result.data.errors) {
			throw {
				error : 1, 
				message : result.data.errors[0]
			};
			return;
		}
		return processResult(result);
	};

	AI.Request.prototype.imageOCRRequest = async function(data, block) {
		return await this._wrapRequest(this._imageOCRRequest, data, block !== false);
	};

	AI.Request.prototype._imageOCRRequest = async function(data) {
		let provider = null;
		if (this.modelUI)
			provider = AI.Storage.getProvider(this.modelUI.provider);

		if (!provider) {
			throw { 
				error : 1, 
				message : "Please select the correct model for action." 
			};
			return;
		}

		let message = {
			image : await AI.ImageEngine.getBase64FromAny(data)
		};

		let objRequest = {
			headers : AI._getHeaders(provider),
			method : "POST",
			url : AI._getEndpointUrl(provider, AI.Endpoints.Types.v1.OCR, this.model),
			body : await provider.getImageOCR(message, this.model)
		};

		if (objRequest.body instanceof FormData)
			objRequest.isBlob = true;

		let requestBody = {};
		let model = this.model;
		let processResult = function(data) {
			return provider.getImageOCRResult(data, model);
		};

		objRequest.isUseProxy = AI._extendBody(provider, objRequest.body);

		let result = await requestWrapper(objRequest);
		if (result.error) {
			throw {
				error : result.error, 
				message : result.message
			};
			return;
		}
		if (result.data && result.data.errors) {
			throw {
				error : 1, 
				message : result.data.errors[0]
			};
			return;
		}
		return processResult(result);
	};
	
	AI.ImageEngine = {};

	AI.ImageEngine.getNearestImageSize = function(w, h, sizes) {
		if (!sizes) {
			return {
				w : sizes[i].w,
				h : sizes[i].h
			};
		}

		let dist = 100000;
		let index = 0;

		for (let i = 0, len = sizes.length; i < len; i++) {
			let tmpDist = Math.abs(w - sizes[i].w) + Math.abs(h - sizes[i].h);
			if (tmpDist < dist) {
				dist = tmpDist;
				index = i;
			}
		}

		return {
			w : sizes[i].w,
			h : sizes[i].h
		};
	};

	AI.ImageEngine.getNearestImage = async function(input, sizes) {
		let canvas = document.createElement('canvas');
		if (input instanceof HTMLImageElement || input instanceof HTMLCanvasElement) {
			let dstSize = AI.ImageEngine.getNearestImageSize(input.width, input.height, sizes);
			canvas.width  = dstSize.w;
			canvas.height = dstSize.h;
			canvas.getContext('2d').drawImage(input, 0, 0, canvas.width, canvas.height);
			return canvas;
		}
		if (image instanceof String) {
			return new Promise(function(resolve) {
				let image = new Image();
				image.onload = function() {
					resolve(AI.ImageEngine.getNearestImage(image, sizes));
				};
				image.onerror = function() {
					return resolve(null);
				};
				image.src = input;
			});
		}
		return null;
	};

	AI.ImageEngine.getBlob = async function(canvas) {
		return new Promise(function(resolve) {
			var canvas_size = {
				width: canvas.width,
				height: canvas.height,
				str: canvas.width + "x" + canvas.height
			};
			canvas.toBlob(function(blob) {resolve({blob, size: canvas_size})}, 'image/png');
		});
	};

	AI.ImageEngine.getBase64 = function(canvas) {
		return canvas.toDataURL("image/png");
	};

	AI.ImageEngine.getBase64FromAny = async function(image) {
		if (image instanceof HTMLImageElement) {
			let canvas = document.createElement('canvas');
			canvas.width = image.width;
			canvas.height = image.height;
			canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
			return canvas.toDataURL("image/png");
		} 
		if (image instanceof HTMLCanvasElement) {
			return canvas.toDataURL("image/png");
		}
		if (image.startsWith("data:image"))
			return image;
		
		let canvas = await AI.ImageEngine.getNearestImage(image);
		if (!canvas)
			return "";

		return AI.ImageEngine.getBase64(canvas);
	};

	AI.ImageEngine.getBase64FromUrl = async function(url) {
		if (url.startsWith("data:image"))
			return url;

		if (url.startsWith("iVBOR"))
			return "data:image/png;base64," + url;

		if (url.startsWith("/9j/"))
			return "data:image/jpeg;base64," + url;

		let canvas = await AI.ImageEngine.getNearestImage(url);
		if (!canvas)
			return "";

		return AI.ImageEngine.getBase64(canvas);
	};

	AI.ImageEngine.getMimeTypeFromBase64 = async function(url) {
		let index = url.indexOf(";");
		return url.substring(5, index);
	};

	AI.ImageEngine.getContentFromBase64 = async function(url) {
		let index = url.indexOf(",");
		return url.substring(index + 1);
	};

	function getStreamedResult(responseText) {

		let result = "[";

		let isEscaped = false;
		let inString = false;
		let braceCount = 0;
		let curObjectPos = 0;
		let curObjectStartPos = 0;
		let firstObject = true;
		let inputLen = responseText.length;
		
		for (let i = 0; i < inputLen; i++) {
			let char = responseText[i];
			
			if (char === '\n') {
				this.lineNumber++;
			}
			
			if (char === '"' && !isEscaped) {
				inString = !inString;
			}
			
			isEscaped = (char === '\\' && !isEscaped);
			
			if (!inString) {
				if (char === '{') {
					braceCount++;
					if (braceCount === 1) {
						curObjectStartPos = i;
					}
				}
				else if (char === '}') {
					braceCount--;

					if (braceCount === 0) {
						i++;

						if (!firstObject)
							result += ",";
						firstObject = false;
						
						
						result += ("{ \"data\" : " + responseText.substring(curObjectStartPos, i) + "}");

						while (i < inputLen) {
							char = responseText[i];
							
							if (char !== '\n' &&
								char !== '\r' && 
								char !== ' ' && 
								char !== '\t') {
								break;
							}
							i++;
						}
						
						curObjectPos = i;
					}
				}				
			}
		}

		result += "]";

		return {
			result : result,
			tail : (curObjectPos === inputLen) ? "" : responseText.substring(curObjectPos)
		};
	}

})(window);
