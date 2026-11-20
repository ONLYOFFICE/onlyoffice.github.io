/*
 * Random Cat plugin for ONLYOFFICE editors.
 * Licensed under the MIT License. See the LICENSE file for details.
 */

(function (window, undefined) {
	'use strict';

	// Only still images are requested: animated GIFs cannot be inserted as pictures.
	const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=1&size=med&mime_types=jpg,png';
	const REQUEST_TIMEOUT = 15000;            // ms
	const STATUS_TIMEOUT = 4000;              // ms
	const EMU_PER_PIXEL = 914400 / 96;

	const MSG_LOAD_ERROR = 'Failed to load a cat picture. Check your internet connection and try again.';
	const MSG_INSERTED = 'The picture has been inserted.';
	const MSG_INSERT_ERROR = 'Failed to insert the picture.';

	const elements = {};
	let currentCat = null;      // { url, width, height } of the picture shown in the preview
	let lastRequestId = 0;      // lets us ignore responses of outdated requests
	let isInserting = false;
	let statusTimer = null;
	let isInitialized = false;

	function tr(text) {
		return window.Asc.plugin.tr ? window.Asc.plugin.tr(text) : text;
	}

	function isSafeImageUrl(url) {
		if (typeof url !== 'string')
			return false;
		try {
			return new URL(url).protocol === 'https:';
		} catch (e) {
			return false;
		}
	}

	function fetchWithTimeout(url, options) {
		if (typeof AbortController === 'undefined')
			return fetch(url, options);

		const controller = new AbortController();
		const timer = setTimeout(function () {
			controller.abort();
		}, REQUEST_TIMEOUT);

		return fetch(url, Object.assign({ signal: controller.signal }, options)).finally(function () {
			clearTimeout(timer);
		});
	}

	function requestCatUrl() {
		return fetchWithTimeout(API_URL, { cache: 'no-store' })
			.then(function (response) {
				if (!response.ok)
					throw new Error('The Cat API responded with status ' + response.status);
				return response.json();
			})
			.then(function (data) {
				const url = Array.isArray(data) && data[0] ? data[0].url : null;
				if (!isSafeImageUrl(url))
					throw new Error('The Cat API returned an unexpected response');
				return url;
			});
	}

	function preloadImage(url) {
		return new Promise(function (resolve, reject) {
			const img = new Image();
			const timer = setTimeout(function () {
				img.onload = img.onerror = null;
				reject(new Error('Image loading timed out'));
			}, REQUEST_TIMEOUT);

			img.onload = function () {
				clearTimeout(timer);
				if (!img.naturalWidth || !img.naturalHeight)
					reject(new Error('The image is empty'));
				else
					resolve({ url: url, width: img.naturalWidth, height: img.naturalHeight });
			};
			img.onerror = function () {
				clearTimeout(timer);
				reject(new Error('The image cannot be loaded'));
			};
			img.src = url;
		});
	}

	function setPreviewState(state) {
		elements.preview.classList.remove('state-loading', 'state-error');
		if (state)
			elements.preview.classList.add('state-' + state);
	}

	function setStatus(text, isError) {
		clearTimeout(statusTimer);
		elements.status.textContent = text || '';
		elements.status.classList.toggle('is-error', !!isError);
		if (text) {
			statusTimer = setTimeout(function () {
				elements.status.textContent = '';
			}, STATUS_TIMEOUT);
		}
	}

	function updateButtons() {
		elements.btnInsert.disabled = !currentCat || isInserting;
	}

	function loadCat() {
		const requestId = ++lastRequestId;

		currentCat = null;
		setStatus('');
		setPreviewState('loading');
		elements.btnNext.disabled = true;
		updateButtons();

		requestCatUrl()
			.then(preloadImage)
			.then(function (cat) {
				if (requestId !== lastRequestId)
					return;
				currentCat = cat;
				elements.image.src = cat.url;
				setPreviewState('');
			})
			.catch(function (error) {
				if (requestId !== lastRequestId)
					return;
				console.error('[Random Cat] ' + (error && error.message ? error.message : error));
				elements.errorText.textContent = tr(MSG_LOAD_ERROR);
				setPreviewState('error');
			})
			.then(function () {
				if (requestId !== lastRequestId)
					return;
				elements.btnNext.disabled = false;
				updateButtons();
			});
	}

	// Scales the picture so that its longest side equals maxSide (never upscales).
	function fitSize(width, height, maxSide) {
		const scale = Math.min(1, maxSide / Math.max(width, height));
		return {
			width: Math.max(1, Math.round(width * scale)),
			height: Math.max(1, Math.round(height * scale))
		};
	}

	function insertIntoEditor(source, size) {
		return new Promise(function (resolve) {
			window.Asc.scope.randomCat = {
				src: source,
				width: Math.round(size.width * EMU_PER_PIXEL),
				height: Math.round(size.height * EMU_PER_PIXEL),
				editorType: window.Asc.plugin.info.editorType
			};

			// This function is executed in the editor context, not in the plugin frame.
			window.Asc.plugin.callCommand(function () {
				var data = Asc.scope.randomCat;
				try {
					switch (data.editorType) {
						case 'word': {
							var oDocument = Api.GetDocument();
							var oParagraph = Api.CreateParagraph();
							oParagraph.AddDrawing(Api.CreateImage(data.src, data.width, data.height));
							oDocument.InsertContent([oParagraph]);
							return true;
						}
						case 'slide': {
							var oSlide = Api.GetPresentation().GetCurrentSlide();
							if (!oSlide)
								return false;
							var oImage = Api.CreateImage(data.src, data.width, data.height);
							oImage.SetPosition(
								Math.max(0, (oSlide.GetWidth() - data.width) / 2),
								Math.max(0, (oSlide.GetHeight() - data.height) / 2)
							);
							oSlide.AddObject(oImage);
							return true;
						}
						case 'cell': {
							var oWorksheet = Api.GetActiveSheet();
							if (!oWorksheet)
								return false;
							var oCell = oWorksheet.GetActiveCell();
							// GetCol/GetRow are 1-based, AddImage expects 0-based indexes.
							var nCol = Math.max(0, oCell.GetCol() - 1);
							var nRow = Math.max(0, oCell.GetRow() - 1);
							oWorksheet.AddImage(data.src, data.width, data.height, nCol, 0, nRow, 0);
							return true;
						}
					}
				} catch (e) {
					return false;
				}
				return false;
			}, false, true, function (result) {
				resolve(result !== false);
			});
		});
	}

	function insertCat() {
		if (!currentCat || isInserting)
			return;

		const cat = currentCat;
		const maxSide = parseInt(elements.sizeSelect.value, 10) || 300;
		const size = fitSize(cat.width, cat.height, maxSide);

		isInserting = true;
		updateButtons();
		setStatus('');

		// The picture is inserted by its URL: the image CDN does not allow reading
		// the file from the plugin frame, so the editor downloads it itself.
		insertIntoEditor(cat.url, size)
			.then(function (isInserted) {
				setStatus(tr(isInserted ? MSG_INSERTED : MSG_INSERT_ERROR), !isInserted);
			})
			.catch(function (error) {
				console.error('[Random Cat] ' + (error && error.message ? error.message : error));
				setStatus(tr(MSG_INSERT_ERROR), true);
			})
			.then(function () {
				isInserting = false;
				updateButtons();
			});
	}

	function applyTheme(theme) {
		if (!theme)
			return;

		const style = document.documentElement.style;
		const map = {
			'--rc-background': theme['background-normal'],
			'--rc-background-alt': theme['background-toolbar'],
			'--rc-text': theme['text-normal'],
			'--rc-text-secondary': theme['text-secondary'],
			'--rc-border': theme['border-regular-control']
		};

		Object.keys(map).forEach(function (name) {
			if (map[name])
				style.setProperty(name, map[name]);
			else
				style.removeProperty(name);
		});

		const isDark = theme.type === 'dark';
		document.body.classList.toggle('theme-dark', isDark);
		style.setProperty('--rc-error', isDark ? '#f37b78' : '#d9534f');
	}

	window.Asc.plugin.init = function () {
		if (isInitialized)
			return;
		isInitialized = true;

		elements.preview = document.getElementById('preview');
		elements.image = document.getElementById('cat-image');
		elements.errorText = document.getElementById('error-text');
		elements.sizeSelect = document.getElementById('size-select');
		elements.btnNext = document.getElementById('btn-next');
		elements.btnInsert = document.getElementById('btn-insert');
		elements.status = document.getElementById('status');

		elements.btnNext.addEventListener('click', loadCat);
		elements.btnInsert.addEventListener('click', insertCat);

		loadCat();
	};

	window.Asc.plugin.button = function () {
		this.executeCommand('close', '');
	};

	window.Asc.plugin.onTranslate = function () {
		Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (element) {
			element.textContent = tr(element.getAttribute('data-i18n'));
		});
		Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-alt]'), function (element) {
			element.setAttribute('alt', tr(element.getAttribute('data-i18n-alt')));
		});
		if (elements.preview && elements.preview.classList.contains('state-error'))
			elements.errorText.textContent = tr(MSG_LOAD_ERROR);
	};

	window.Asc.plugin.onThemeChanged = function (theme) {
		window.Asc.plugin.onThemeChangedBase(theme);
		applyTheme(theme);
	};

})(window, undefined);
