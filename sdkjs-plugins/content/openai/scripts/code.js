/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *	 http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
 // todo поправить readme  и собранный плагин и с синонимами поправить тоже
(function(window, undefined){
	let ApiKey = '';
	let bHasKey = false;
	const model = 'text-davinci-003';
	const maxLen = 4000;
	let loadingPhrase = 'Loading...';
	let thesaurusCounter = 0;
	let settingsWindow = null;
	let chatWindow = null;
	let customReqWindow = null;
	let imgsize = null;
	let link = null;
	let linkWindow = null;

	window.Asc.plugin.init = function() {};

	function checkApiKey() {
		ApiKey = localStorage.getItem('OpenAIApiKey') || '';
		if (!ApiKey.length) {
			bHasKey = false;
		} else {
			bHasKey = true;
		}
	};

	function getContextMenuItems(options) {
		link = null;
		checkApiKey();
		let settings = {
			guid: window.Asc.plugin.guid,
			items: [
				{
					id : 'ChatGPT',
					text : generateText('ChatGPT'),
					items : []
				}
			]
		};

		if (bHasKey)
		{
			switch (options.type)
			{
				case 'Target':
				{
					if (Asc.plugin.info.editorType === 'word') {
						settings.items[0].items.push({
							id : 'onMeaningT',
							text : generateText('Explain text in comment')
						});
					}

					break;
				}
				case 'Selection':
				{
					if (Asc.plugin.info.editorType === 'word') {
						settings.items[0].items.push(
							{
								id : 'TextAnalysis',
								text : generateText('Text analysis'),
								items : [
									{
										id : 'onSummarize',
										text : generateText('Summarize')
									},
									{
										id : 'onKeyWords',
										text : generateText('Keywords')
									},
								]
							},
							{
								id : 'Tex Meaning',
								text : generateText('Word analysis'),
								items : [
									{
										id : 'onMeaningS',
										text : generateText('Explain text in comment'),
									},
									{
										id : 'onMeaningLinkS',
										text : generateText('Explain text in hyperlink')
									}
								]
							},
							{
								id : 'TranslateText',
								text : generateText('Translate'),
								items : [
									{
										id : 'onTranslate',
										text : generateText('Translate to English'),
										data : 'English'
									},
									{
										id : 'onTranslate',
										text : generateText('Translate to French'),
										data : 'French'
									},
									{
										id : 'onTranslate',
										text : generateText('Translate to German'),
										data : 'German'
									},
									{
										id : 'onTranslate',
										text : generateText('Translate to Chinese'),
										data : 'Chinise'
									},
									{
										id : 'onTranslate',
										text : generateText('Translate to Japanese'),
										data : 'Japanese'
									},
									{
										id : 'onTranslate',
										text : generateText('Translate to Russian'),
										data : 'Russian'
									},
									{
										id : 'onTranslate',
										text : generateText('Translate to Korean'),
										data : 'Korean'
									},
									{
										id : 'onTranslate',
										text : generateText('Translate to Spanish'),
										data : 'Spanish'
									},
									{
										id : 'onTranslate',
										text : generateText('Translate to Italian'),
										data : 'Italian'
									}
								]
							},
							{
								id : 'OnGenerateImageList',
								text : generateText('Generate image from text'),
								items : [
									{
										id : 'OnGenerateImage',
										text : generateText('256x256'),
										data : 256
									},
									{
										id : 'OnGenerateImage',
										text : generateText('512x512'),
										data : 512
									},
									{
										id : 'OnGenerateImage',
										text : generateText('1024x1024'),
										data : 1024
									}
								]
							}
						);
					}
					break;
				}
				case 'Image':
				case 'Shape':
					{
						settings.items[0].items.push({
							id : 'onImgVar',
							text : generateText('Generate image variation')
						});

						break;
					}
				case 'Hyperlink':
					{
						settings.items[0].items.push({
							id : 'onHyperlink',
							text : generateText('Show hyperlink content')
						});
						link = options.value;
						break;
					}

				default:
					break;
			}

			settings.items[0].items.push(
				{
					id : 'onChat',
					text : generateText('Chat'),
					separator: true
				},
				{
					id : 'onCustomReq',
					text : generateText('Custom request')
				}
			);
		}

		settings.items[0].items.push({
				id : 'onSettings',
				text : generateText('Settings'),
				separator: true
		});

		return settings;
	}

	window.Asc.plugin.attachEvent('onContextMenuShow', function(options) {
		// todo: change key validation
		if (!options)
			return;

		this.executeMethod('AddContextMenuItem', [getContextMenuItems(options)]);

		if (bHasKey && options.type === "Target")
		{
			window.Asc.plugin.executeMethod('GetCurrentWord', null, function(text) {
				if (!isEmpyText(text, true)) {
					thesaurusCounter++;
					let tokens = window.Asc.OpenAIEncode(text);
					createSettings(text, tokens, 9, true);
				}
			});
		}
	});

	function generateText(text) {
		let lang = window.Asc.plugin.info.lang.substring(0,2);
		let result = { en: text	};
		if (lang !== "en")
			result[lang] = window.Asc.plugin.tr(text);

		return result;
	};

	window.Asc.plugin.attachContextMenuClickEvent('onSettings', function() {
		let location  = window.location;
		let start = location.pathname.lastIndexOf('/') + 1;
		let file = location.pathname.substring(start);

		// default settings for modal window (I created separate settings, because we have many unnecessary field in plugin variations)
		let variation = {
			url : location.href.replace(file, 'settings.html'),
			description : window.Asc.plugin.tr('Settings'),
			isVisual : true,
			buttons : [],
			isModal : true,
			EditorsSupport : ["word", "slide", "cell"],
			size : [ 592, 100 ]
		};

		if (!settingsWindow) {
			settingsWindow = new window.Asc.PluginWindow();
			settingsWindow.attachEvent("onWindowMessage", function(message) {
				messageHandler(settingsWindow, message);
			});
		}
		settingsWindow.show(variation);
	});

	window.Asc.plugin.attachContextMenuClickEvent('onCustomReq', function() {
		let location  = window.location;
		let start = location.pathname.lastIndexOf('/') + 1;
		let file = location.pathname.substring(start);

		// default settings for modal window (I created separate settings, because we have many unnecessary field in plugin variations)
		let variation = {
			url : location.href.replace(file, 'custom.html'),
			description : window.Asc.plugin.tr('OpenAI'),
			isVisual : true,
			buttons : [],
			isModal : true,
			EditorsSupport : ["word", "slide", "cell"],
			size : [ 400, 400 ]
		};

		if (!customReqWindow) {
			customReqWindow = new window.Asc.PluginWindow();
			customReqWindow.attachEvent("onWindowMessage", function(message) {
				messageHandler(customReqWindow, message);
			});
		}
		customReqWindow.show(variation);
	});

	window.Asc.plugin.attachContextMenuClickEvent('onChat', function() {
		let location  = window.location;
		let start = location.pathname.lastIndexOf('/') + 1;
		let file = location.pathname.substring(start);

		// default settings for modal window (I created separate settings, because we have many unnecessary field in plugin variations)
		let variation = {
			url : location.href.replace(file, 'chat.html'),
			description : window.Asc.plugin.tr('ChatGPT'),
			isVisual : true,
			buttons : [],
			isModal : false,
			EditorsSupport : ["word", "slide", "cell"],
			size : [ 400, 400 ]
		};

		if (!chatWindow) {
			chatWindow = new window.Asc.PluginWindow();
			chatWindow.attachEvent("onWindowMessage", function(message){
				messageHandler(chatWindow, message);
			});
		}
		chatWindow.show(variation);
	});

	window.Asc.plugin.attachContextMenuClickEvent('onHyperlink', function(data) {
		let location  = window.location;
		let start = location.pathname.lastIndexOf('/') + 1;
		let file = location.pathname.substring(start);

		// default settings for modal window (I created separate settings, because we have many unnecessary field in plugin variations)
		let variation = {
			url : location.href.replace(file, 'hyperlink.html'),
			description : window.Asc.plugin.tr('Hyperlink'),
			isVisual : true,
			buttons : [],
			isModal : false,
			EditorsSupport : ["word"],
			size : [ 1000, 1000 ]
		};

		if (!linkWindow) {
			linkWindow = new window.Asc.PluginWindow();
			linkWindow.attachEvent("onWindowMessage", function(message){
				messageHandler(linkWindow, message);
			});
		}
		linkWindow.show(variation);
		setTimeout(function() {
			linkWindow.command('onTest', link);
		},500)
	});

	window.Asc.plugin.attachContextMenuClickEvent('onMeaningT', function() {
		window.Asc.plugin.executeMethod('GetCurrentWord', null, function(text) {
			if (!isEmpyText(text)) {
				let tokens = window.Asc.OpenAIEncode(text);
				createSettings(text, tokens, 8);
			}
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('onSummarize', function() {
		window.Asc.plugin.executeMethod('GetSelectedText', null, function(text) {
			if (!isEmpyText(text)) {
				let tokens = window.Asc.OpenAIEncode(text);
				createSettings(text, tokens, 1);
			}
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('onKeyWords', function() {
		window.Asc.plugin.executeMethod('GetSelectedText', null, function(text) {
			if (!isEmpyText(text)) {
				let tokens = window.Asc.OpenAIEncode(text);
				createSettings(text, tokens, 2);
			}
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('onMeaningS', function() {
		window.Asc.plugin.executeMethod('GetSelectedText', null, function(text) {
			if (!isEmpyText(text)) {
				let tokens = window.Asc.OpenAIEncode(text);
				createSettings(text, tokens, 3);
			}
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('onMeaningLinkS', function() {
		window.Asc.plugin.executeMethod('GetSelectedText', null, function(text) {
			if (!isEmpyText(text)) {
				let tokens = window.Asc.OpenAIEncode(text);
				createSettings(text, tokens, 4);
			}
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('onTranslate', function(data) {
		window.Asc.plugin.executeMethod('GetSelectedText', null, function(text) {
			if (!isEmpyText(text)) {
				let tokens = window.Asc.OpenAIEncode(text);
				let prompt = 'Translate to ' + data + ': ' + text;
				createSettings(prompt, tokens, 6);
			}
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('OnGenerateImage', function(data) {
		let size = Number(data);
		imgsize = {width: size, height: size};
		window.Asc.plugin.executeMethod('GetSelectedText', null, function(text) {
			if (!isEmpyText(text)) {
				let tokens = window.Asc.OpenAIEncode(text);
				createSettings(text, tokens, 7);
			}
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('onThesaurus', function(data) {
		window.Asc.plugin.executeMethod('ReplaceCurrentWord', [data]);
	});

	window.Asc.plugin.attachContextMenuClickEvent('onImgVar', function() {
		window.Asc.plugin.executeMethod('GetImageDataFromSelection', null, function(data) {
			createSettings(data, 0, 10);
		});
	});

	function createSettings(text, tokens, type, isNoBlockedAction) {
		let url;
		let settings = {
			model : model,
			max_tokens : maxLen - tokens.length
		};

		if (settings.max_tokens < 100) {
			console.error(new Error('This request is too big!'));
			return;
		}

		window.Asc.plugin.executeMethod('StartAction', [isNoBlockedAction ? 'Information' : 'Block', 'ChatGPT: ' + loadingPhrase]);

		switch (type) {
			case 1:
				settings.prompt	= 'Summarize this text: "' + text + '"';
				url = 'https://api.openai.com/v1/completions';
				break;

			case 2:
				settings.prompt = 'Get Key words from this text: "' + text + '"';
				url = 'https://api.openai.com/v1/completions';
				break;

			case 3:
				settings.prompt = 'What does it mean "' + text + '" ?';
				url = 'https://api.openai.com/v1/completions';
				break;

			case 4:
				settings.prompt = 'Give a link to the explanation of the word "' + text + '"';
				url = 'https://api.openai.com/v1/completions';
				break;

			case 5:
				settings.prompt = text;
				url = 'https://api.openai.com/v1/completions';
				break;

			case 6:
				settings.prompt = text;
				url = 'https://api.openai.com/v1/completions';
				break;

			case 7:
				delete settings.model;
				delete settings.max_tokens;
				settings.prompt = 'Generate image: "' + text + '"';
				settings.n = 1;
				settings.size = imgsize.width + 'x' + imgsize.height;
				settings.response_format = 'b64_json';
				url = 'https://api.openai.com/v1/images/generations';
				break;

			case 8:
				settings.prompt = 'What does it mean "' + text + '" ?';
				url = 'https://api.openai.com/v1/completions';
				break;

			case 9:
				settings.prompt = 'Give synonyms for the word  "' + text + '" as javascript array';
				url = 'https://api.openai.com/v1/completions';
				break;

			case 10:
				imageToBlob(text).then(function(obj) {
					url = 'https://api.openai.com/v1/images/variations';
					const formdata = new FormData();
					formdata.append('image', obj.blob);
					formdata.append('size', obj.size.str);
					formdata.append('n', 1);// Number.parseInt(elements.inpTopSl.value));
					formdata.append('response_format', "b64_json");
					fetchData(formdata, url, type, isNoBlockedAction);
				});
				break;
		}
		if (type !== 10)
			fetchData(settings, url, type, isNoBlockedAction);
	};

	function fetchData(settings, url, type, isNoBlockedAction) {
		let header = {
			'Authorization': 'Bearer ' + ApiKey
		};
		if (type < 10) {
			header['Content-Type'] = 'application/json';
		}
		fetch(url, {
				method: 'POST',
				headers: header,
				body: (type < 10 ? JSON.stringify(settings) : settings),
			})
			.then(function(response) {
				return response.json()
			})
			.then(function(data) {
				if (data.error)
					throw data.error

				processResult(data, type, isNoBlockedAction);
			})
			.catch(function(error) {
				if (type == 9)
					thesaurusCounter--;

				console.error(error);
				window.Asc.plugin.executeMethod('EndAction', [isNoBlockedAction ? 'Information' : 'Block', 'ChatGPT: ' + loadingPhrase]);
			});
	};

	function processResult(data, type, isNoBlockedAction) {
		window.Asc.plugin.executeMethod('EndAction', [isNoBlockedAction ? 'Information' : 'Block', 'ChatGPT: ' + loadingPhrase]);
		let text, start, end, img;
		Asc.scope = {};
		switch (type) {
			case 1:
				Asc.scope.data = data.choices[0].text.split('\n\n');
				window.Asc.plugin.callCommand(function() {
					let oDocument = Api.GetDocument();
					let sumPar = Api.CreateParagraph();
					sumPar.AddText('Summarize selected text: ');
					oDocument.Push(sumPar);
					for(let ind = 0; ind < Asc.scope.data.length; ind++) {
						let text = Asc.scope.data[ind];
						if (text.length) {
							let oParagraph = Api.CreateParagraph();
							oParagraph.AddText(text);
							oDocument.Push(oParagraph);
						}
					}
				}, false);
				break;

			case 2:
				Asc.scope.data = data.choices[0].text.split('\n\n');
				window.Asc.plugin.callCommand(function() {
					let oDocument = Api.GetDocument();
					for(let ind = 0; ind < Asc.scope.data.length; ind++) {
						let text = Asc.scope.data[ind];
						if (text.length) {
							let oParagraph = Api.CreateParagraph();
							oParagraph.AddText(text);
							oDocument.Push(oParagraph);
						}
					}
				}, false);
				break;

			case 3:
				text = data.choices[0].text;
				Asc.scope.comment = text.startsWith('\n\n') ? text.substring(2) : text;
				window.Asc.plugin.callCommand(function() {
					let oDocument = Api.GetDocument();
					let oRange = oDocument.GetRangeBySelect();
					oRange.AddComment(Asc.scope.comment, 'OpenAI');
				}, false);
				break;

			case 4:
				text = data.choices[0].text;
				start = text.indexOf('htt');
				end = text.indexOf(' ', start);
				if (end == -1) {
					end = text.length;
				}
				Asc.scope.link = text.slice(start, end);
				if (Asc.scope.link) {
					window.Asc.plugin.callCommand(function() {
						let oDocument = Api.GetDocument();
						let oRange = oDocument.GetRangeBySelect();
						oRange.AddHyperlink(Asc.scope.link, 'Meaning of the word');
					}, false);
				}
				break;

			case 5:
				text = data.choices[0].text;
				start = text.indexOf('<img');
				end = text.indexOf('/>', start);
				if (end == -1) {
					end = text.length;
				}
				let imgUrl = text.slice(start, end);
				if (imgUrl) {
					window.Asc.plugin.executeMethod('PasteHtml', [imgUrl])
				}
				break;

			case 6:
				text = data.choices[0].text.startsWith('\n\n') ? data.choices[0].text.substring(2) : data.choices[0].text;
				window.Asc.plugin.executeMethod('PasteText', [text]);
				break;

			case 7:
				let url = (data.data && data.data[0]) ? data.data[0].b64_json : null;
				if (url) {
					Asc.scope.url = /^data\:image\/png\;base64/.test(url) ? url : 'data:image/png;base64,' + url + '';
					Asc.scope.imgsize = imgsize;
					imgsize = null;
					window.Asc.plugin.callCommand(function() {
						let oDocument = Api.GetDocument();
						let oParagraph = Api.CreateParagraph();
						let width = Asc.scope.imgsize.width * (25.4 / 96.0) * 36000;
						let height = Asc.scope.imgsize.height * (25.4 / 96.0) * 36000;
						let oDrawing = Api.CreateImage(Asc.scope.url, width, height);
						oParagraph.AddDrawing(oDrawing);
						oDocument.Push(oParagraph);
					}, false);

					// let oImageData = {
					// 	"src": /^data\:image\/png\;base64/.test(url) ? url : `data:image/png;base64,${url}`,
					// 	"width": imgsize.width,
					// 	"height": imgsize.height
					// };
					// imgsize = null;
					// window.Asc.plugin.executeMethod ("PutImageDataToSelection", [oImageData]);
				}
				break;

			case 8:
				text = data.choices[0].text;
				Asc.scope.comment = text.startsWith('\n\n') ? text.substring(2) : text;
				window.Asc.plugin.callCommand(function() {
					var oDocument = Api.GetDocument();
					Api.AddComment(oDocument, Asc.scope.comment, 'OpenAI');
				}, false);
				break;

			case 9:
				thesaurusCounter--;
				if (0 < thesaurusCounter)
					return;

				text = data.choices[0].text;
				let startPos = text.indexOf("[");
				let endPos = text.indexOf("]");

				if (-1 === startPos || -1 === endPos || startPos > endPos)
					return;

				text = text.substring(startPos, endPos + 1);
				let arrayWords = eval(text);

				let items = getContextMenuItems({ type : "Target" });

				let itemNew = {
					id : "onThesaurusList",
					text : generateText("Thesaurus"),
					items : []
				};

				for (let i = 0; i < arrayWords.length; i++)
				{
					itemNew.items.push({
							id : 'onThesaurus',
							data : arrayWords[i],
							text : arrayWords[i]
						}
					);
				}

				items.items[0].items.unshift(itemNew);
				window.Asc.plugin.executeMethod('UpdateContextMenuItem', [items]);
				break;
			case 10:
				img = (data.data && data.data[0]) ? data.data[0].b64_json : null;
				if (img) {
					let sImageSrc = /^data\:image\/png\;base64/.test(img) ? img : 'data:image/png;base64,' + img + '';
					let oImageData = {
						"src": sImageSrc,
						"width": imgsize.width,
						"height": imgsize.height
					};
					imgsize = null;
					window.Asc.plugin.executeMethod ("PutImageDataToSelection", [oImageData]);
				}
				break;
		}
	};

	window.Asc.plugin.button = function(id, windowId) {

		if (!settingsWindow && !chatWindow && !linkWindow && !customReqWindow)
			return;

		if (windowId) {
			switch (id) {
				case -1:
				default:
					window.Asc.plugin.executeMethod('CloseWindow', [windowId]);
			}
		}

	};

	window.Asc.plugin.onTranslate = function() {
		loadingPhrase = window.Asc.plugin.tr(loadingPhrase);
	};

	function imageToBlob(img) {
		return new Promise(function(resolve) {
			const image = new Image();
			image.onload = function() {
				const img_size = {width: image.width, height: image.height};
				const canvas_size = normalizeImageSize(img_size);
				const draw_size = canvas_size.width > image.width ? img_size : canvas_size;
				let canvas = document.createElement('canvas');
				canvas.width = canvas_size.width;
				canvas.height = canvas_size.height;
				canvas.getContext('2d').drawImage(image, 0, 0, draw_size.width, draw_size.height*image.height/image.width);
				imgsize = img_size;
				canvas.toBlob(function(blob) {resolve({blob: blob, size: canvas_size})}, 'image/png');
			};
			image.src = img.src;
		});
	};

	function normalizeImageSize (size) {
		let width = 0, height = 0;
		if ( size.width > 750 || size.height > 750 )
			width = height = 1024;
		else if ( size.width > 375 || size.height > 350 )
			width = height = 512;
		else width = height = 256;

		return {width: width, height: height, str: width + 'x' + height}
	};

	function messageHandler(modal, message) {
		switch (message.type) {
			case 'onWindowReady':
				modal.command('onApiKey', ApiKey)
				break;

			case 'onRemoveApiKey':
				localStorage.removeItem('OpenAIApiKey');
				break;

			case 'onAddApiKey':
				localStorage.setItem('OpenAIApiKey', message.key);
				window.Asc.plugin.executeMethod('CloseWindow', [modal.id]);
				break;

			case 'onExecuteMethod':
				window.Asc.plugin.executeMethod(message.method, [message.data], function() {
					window.Asc.plugin.executeMethod('CloseWindow', [modal.id]);
				});
				break;

			case 'onGetLink':
				modal.command('onSetLink', link);
				break;
		}
	};

	function isEmpyText(text, bDonShowErr) {
		if (text.trim() === '') {
			if (!bDonShowErr)
				console.error('No word in this position or nothing is selected.');

			return true;
		}
		return false;
	};

})(window, undefined);
