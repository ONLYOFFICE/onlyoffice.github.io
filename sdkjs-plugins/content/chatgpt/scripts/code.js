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
(function(window, undefined){
	let ApiKey = '';
	let bHasKey = false;
	const model = 'text-davinci-003';
	const maxLen = 4000;
	let loadingPhrase = 'Loading...';
	let thesaurusCounter = 0;
	let settingsWindow = null;
	let chatWindow = null;
	let imgsize = null;

	window.Asc.plugin.init = function() {};

	function checkApiKey() {
		ApiKey = localStorage.getItem('OpenAIApiKey') || '';
		if (!ApiKey.length) {
			console.error(new Error('Please enter Api key!'));
			bHasKey = false;
		} else {
			bHasKey = true;
		}
	};

	function getContextMenuItems(options) {
		checkApiKey();
		let settings = {
			guid: window.Asc.plugin.guid,
			items: [
				{
					id : 'ChatGPT',
					text : generatText('ChatGPT'),
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
					settings.items[0].items.push({
						id : 'onMeaningT',
						text : generatText('Explain text in comment')
					});

					break;
				}
				case 'Selection':
				{
					settings.items[0].items.push(
						{
							id : 'TextAnalysis',
							text : generatText('Text analysis'),
							items : [
								{
									id : 'onSummarize',
									text : generatText('Summarize')
								},
								{
									id : 'onKeyWords',
									text : generatText('Keywords')
								},
							]
						},
						{
							id : 'Tex Meaning',
							text : generatText('Word analysis'),
							items : [
								{
									id : 'onMeaningS',
									text : generatText('Explain text in comment')
								},
								{
									id : 'onMeaningLinkS',
									text : generatText('Explain text in hyperlink')
								}
							]
						},
						{
							id : 'TranslateText',
							text : generatText('Translate'),
							items : [
								{
									id : 'onFrenchTr',
									text : generatText('Translate to French')
								},
								{
									id : 'onGermanTr',
									text : generatText('Translate to German')
								}
							]
						},
						{
							id : 'OnGenerateImage',
							text : generatText('Generate image from text')
						}
					);
					break;
				}
				case 'Image':
				case 'Shape':
					{
						settings.items[0].items.push({
							id : 'onImgVar',
							text : generatText('Generate image varion')
						});
	
						break;
					}

				default:
					break;
			}

			settings.items[0].items.push({
				id : 'onChat',
				text : generatText('Chat'),
				separator: true
			});
		}
		
		settings.items[0].items.push({
				id : 'onSettings',
				text : generatText('Settings'),
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
				if (text && text.length > 1) {
					thesaurusCounter++;
					let tokens = window.Asc.OpenAIEncode(text);
					createSettings(text, tokens, 10, true);
				}
			});
		}
	});

	function generatText(text) {
		let lang = window.Asc.plugin.info.lang.substring(0,2);
		return {
			en: text,
			[lang]: window.Asc.plugin.tr(text)
		}
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
			EditorsSupport : ["word"],
			buttons : [],
            size : [ 592, 100 ]
		};
		
		if (!settingsWindow) {
			settingsWindow = new window.Asc.PluginWindow();
		}
		settingsWindow.show(variation);
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
			isModal : true,
			EditorsSupport : ["word"],
			buttons : [],
			size : [ 400, 400 ]
		};
		
		if (!chatWindow) {
			chatWindow = new window.Asc.PluginWindow();
			chatWindow.attachEvent("onWindowMessage", function(data){
				console.log(data);
			});
		}
		chatWindow.show(variation);
	});

	window.Asc.plugin.attachContextMenuClickEvent('onMeaningT', function() {
		window.Asc.plugin.executeMethod('GetCurrentWord', null, function(text) {
			if (text === '') {
				console.error('No word in this position.')
			} else {
				let tokens = window.Asc.OpenAIEncode(text);
				createSettings(text, tokens, 9);
			}
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('onSummarize', function() {
		window.Asc.plugin.executeMethod('GetSelectedText', null, function(text) {
			let tokens = window.Asc.OpenAIEncode(text);
			createSettings(text, tokens, 1);
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('onKeyWords', function() {
		window.Asc.plugin.executeMethod('GetSelectedText', null, function(text) {
			let tokens = window.Asc.OpenAIEncode(text);
			createSettings(text, tokens, 2);
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('onMeaningS', function() {
		window.Asc.plugin.executeMethod('GetSelectedText', null, function(text) {
			let tokens = window.Asc.OpenAIEncode(text);
			createSettings(text, tokens, 3);
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('onMeaningLinkS', function() {
		window.Asc.plugin.executeMethod('GetSelectedText', null, function(text) {
			let tokens = window.Asc.OpenAIEncode(text);
			createSettings(text, tokens, 4);
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('onFrenchTr', function() {
		window.Asc.plugin.executeMethod('GetSelectedText', null, function(text) {
			let tokens = window.Asc.OpenAIEncode(text);
			createSettings(text, tokens, 6);
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('onGermanTr', function() {
		window.Asc.plugin.executeMethod('GetSelectedText', null, function(text) {
			let tokens = window.Asc.OpenAIEncode(text);
			createSettings(text, tokens, 7);
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('onRandomImage', function() {
		let text = 'Get a random image as html tag.';
		let tokens = window.Asc.OpenAIEncode(text);
		createSettings(text, tokens, 5);
	});

	window.Asc.plugin.attachContextMenuClickEvent('OnGenerateImage', function() {
		window.Asc.plugin.executeMethod('GetSelectedText', null, function(text) {
			let tokens = window.Asc.OpenAIEncode(text);
			createSettings(text, tokens, 8);
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('onThesaurus', function(data) {
		window.Asc.plugin.executeMethod('ReplaceCurrentWord', [data]);
	});

	window.Asc.plugin.attachContextMenuClickEvent('onImgVar', function() {
		window.Asc.plugin.executeMethod('GetImageDataFromSelection', null, function(data) {
			// todo разобраться с размера картинки
			createSettings(data, 0, 11);
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
				settings.prompt	= `Summarize this text: '${text}'`;
				url = 'https://api.openai.com/v1/completions';
				break;

			case 2:
				settings.prompt = `Get Key words from this text: '${text}'`;
				url = 'https://api.openai.com/v1/completions';
				break;

			case 3:
				settings.prompt = `What does it mean '${text}' ?`;
				url = 'https://api.openai.com/v1/completions';
				break;
			
			case 4:
				settings.prompt = `Give a link to the explanation of the word '${text}'`;
				url = 'https://api.openai.com/v1/completions';
				break;

			case 5:
				settings.prompt = text;
				url = 'https://api.openai.com/v1/completions';
				break;

			case 6:
				settings.prompt = `Translate in to Franch: '${text}'`;
				url = 'https://api.openai.com/v1/completions';
				break;

			case 7:
				settings.prompt = `Translate in to German: '${text}'`;
				url = 'https://api.openai.com/v1/completions';
				break;

			case 8:
				delete settings.model;
				delete settings.max_tokens;
				settings.prompt = `Generate image: '${text}'`;
				settings.n = 1;
				settings.size = '256x256';
				settings.response_format = 'b64_json';
				imgsize = {width: 256, height: 256};
				url = 'https://api.openai.com/v1/images/generations';
				break;
			
			case 9:
				settings.prompt = `What does it mean '${text}' ?`;
				url = 'https://api.openai.com/v1/completions';
				break;

			case 10:
				settings.prompt = `Give synonyms for the word '${text}' as javascript array`;
				url = 'https://api.openai.com/v1/completions';
				break;
			case 11:
				imageToBlob(text)
				.then(function(obj) {
					url = 'https://api.openai.com/v1/images/variations';
					console.log(obj);
					const formdata = new FormData();
					formdata.append('image', obj.blob);
					formdata.append('size', obj.size.str);
					formdata.append('n', 1);// Number.parseInt(elements.inpTopSl.value));
					formdata.append('response_format', "b64_json");
					fetchData(formdata, url, type, isNoBlockedAction);
				});
				break;
		}
		if (type !== 11)
			fetchData(settings, url, type, isNoBlockedAction);
	};

	function fetchData(settings, url, type, isNoBlockedAction) {
		let header = {
			'Authorization': 'Bearer ' + ApiKey
		};
		if (type < 11) {
			header['Content-Type'] = 'application/json';
		}
		fetch(url, {
				method: 'POST',
				headers: header,
				body: (type < 11 ? JSON.stringify(settings) : settings),
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
				let link =  text.slice(start, end);
				if (link) {
					window.Asc.plugin.executeMethod('PasteHtml', [link])
				}
				break;

			case 6:
				text = data.choices[0].text.startsWith('\n\n') ? data.choices[0].text.substring(2) : data.choices[0].text;
				//window.Asc.plugin.executeMethod('PasteText', [text]);
				Asc.scope.comment = text;
				window.Asc.plugin.callCommand(function() {
					let oDocument = Api.GetDocument();
					let oRange = oDocument.GetRangeBySelect();
					oRange.AddComment(Asc.scope.comment, 'OpenAI');
				}, false);
				break;

			case 7:
				text = data.choices[0].text.startsWith('\n\n') ? data.choices[0].text.substring(2) : data.choices[0].text;
				window.Asc.plugin.executeMethod('PasteText', [text]);
				break;

			case 8:
				let url = (data.data && data.data[0]) ? data.data[0].b64_json : null;
				if (url) {
					Asc.scope.url = /^data\:image\/png\;base64/.test(url) ? url : `data:image/png;base64,${url}`;
					window.Asc.plugin.callCommand(function() {
						let oDocument = Api.GetDocument();
						let oParagraph = Api.CreateParagraph();
						let oDrawing = Api.CreateImage(Asc.scope.url, 25.5 * 36000, 25.5 * 36000);
						oParagraph.AddDrawing(oDrawing);
						oDocument.Push(oParagraph);
					}, false);
				}
				break;

			case 9:
				text = data.choices[0].text;
				Asc.scope.comment = text.startsWith('\n\n') ? text.substring(2) : text;
				window.Asc.plugin.callCommand(function() {
					var oDocument = Api.GetDocument();
					Api.AddComment(oDocument, Asc.scope.comment, 'OpenAI');
				}, false);
				break;

			case 10:
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
					text : generatText("Thesaurus"),
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
			case 11:
				img = (data.data && data.data[0]) ? data.data[0].b64_json : null;
				if (img) {
					let sImageSrc = /^data\:image\/png\;base64/.test(img) ? img : `data:image/png;base64,${img}`;
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

		if (!settingsWindow && !chatWindow)
			return;

		if (windowId) {

			switch (id)
			{
			case -1:
			default:
				// if we use close, it is unregister this window and we won't be able to receive messages from this window
				// window.Asc.plugin.init();
				// settingsWindow.close();
				// settingsWindow = null;
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
				canvas.toBlob(function(blob) {resolve({blob, size: canvas_size})}, 'image/png');
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

		return {width: width, height: height, str: `${width}x${height}`}
	};

})(window, undefined);
