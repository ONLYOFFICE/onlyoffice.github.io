/*
 * (c) Copyright Ascensio System SIA 2010
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

/// <reference path="../../scripts/types.js" />
/// <reference types="@onlyoffice/doceditor-plugin-types" />

(function(window, undefined) {
	const isLocal = ( (window.AscDesktopEditor !== undefined) && (window.location.protocol.indexOf('file') !== -1) );
	/** @type {NodeJS.Timeout | undefined} */
	let interval;
	/** @type {NodeJS.Timeout | undefined} */
	let errTimeout;
	/** @type {any} */
	let loader = null;
	/** @type {NodeJS.Timeout | undefined} */
	let loaderTimeout;
	const winSizes = {
		width: 1200,
		height: 776,
		minWidth: 850,
		minHeight: 600
	};

	// create iframe
	const iframe = document.createElement('iframe');

	let removeGuid = '';

	/** Tells the host's mouse-ups that end a drag or resize of a plugin window from clicks. */
	const WindowDragTracker = {
		/** A mouse-up this soon after a drag or resize ends is the one that ended it. */
		_DRAG_END_GRACE_MS: 300,
		_isDragging: false,
		_dragEndedAt: 0,

		/** @param {boolean} isDragging */
		onDragChange: function(isDragging) {
			this._isDragging = isDragging;
			if (!isDragging)
				this._dragEndedAt = Date.now();
		},
		/** @returns {boolean} */
		isClick: function() {
			return !this._isDragging && Date.now() - this._dragEndedAt >= this._DRAG_END_GRACE_MS;
		}
	};

	/** Shows the warning and Developer Mode dialogs, keeps track of the open ones and closes them. */
	const Dialogs = {
		/**
		 * The footer buttons are the host's DOM: a click on them first arrives as a mouse-up outside
		 * and only then as button(). The close waits this long so that button() can cancel it.
		 */
		_CLOSE_ON_CLICK_OUTSIDE_DELAY_MS: 100,

		/** @type {(function(string): void) | null} called with the window ID after a dialog closes */
		onClose: null,

		/** @type {PluginWindow | null} */
		_warningWindow: null,
		/** @type {PluginWindow | null} */
		_developerWindow: null,
		/** @type {Object<string, boolean>} */
		_openDialogBoxes: {},
		/** @type {{windowID: string, timer: number} | null} */
		_pendingClose: null,

		/** Asks the user whether to keep a backup of the plugin being removed. */
		showWarning: function() {
			if (!this._warningWindow) {
				this._warningWindow = new window.Asc.PluginWindow();
				this._listen(this._warningWindow);
			}
			this._show(this._warningWindow, 'warning.html', window.Asc.plugin.tr('Warning'), [350, 100], ['Yes', 'No']);
		},
		/**
		 * Asks the user for a marketplace address. The dialog closes after any message from it.
		 * @param {function({type: string, url: string}): void} onMessage
		 */
		showDeveloper: function(onMessage) {
			if (!this._developerWindow) {
				this._developerWindow = new window.Asc.PluginWindow();
				this._listen(this._developerWindow, onMessage);
			}
			this._show(this._developerWindow, 'developer.html', window.Asc.plugin.tr('Developer Mode'), [500, 150], ['Ok', 'Cancel']);
		},
		/** @param {string} [windowID] */
		isWarning: function(windowID) {
			return !!this._warningWindow && this._warningWindow.id == windowID;
		},
		/** @param {string} [windowID] */
		isDeveloper: function(windowID) {
			return !!this._developerWindow && this._developerWindow.id == windowID;
		},
		/**
		 * @param {string} windowID
		 * @param {string} command
		 */
		sendCommand: function(windowID, command) {
			if (this.isDeveloper(windowID) && this._developerWindow)
				this._developerWindow.command(command);
			else if (this.isWarning(windowID) && this._warningWindow)
				this._warningWindow.command(command);
		},
		/** @param {string} windowID */
		close: function(windowID) {
			this.cancelCloseOnClickOutside(windowID);
			delete this._openDialogBoxes[windowID];
			window.Asc.plugin.executeMethod('CloseWindow', [windowID]);
			if (this.onClose)
				this.onClose(windowID);
		},
		/** @returns {boolean} */
		hasOpenDialogs: function() {
			return Object.keys(this._openDialogBoxes).length !== 0;
		},
		closeOnClickOutside: function() {
			const windowID = Object.keys(this._openDialogBoxes).pop();
			if (!windowID)
				return;
			this.cancelCloseOnClickOutside();
			const self = this;
			this._pendingClose = {
				windowID: windowID,
				timer: window.setTimeout(function() {
					self._pendingClose = null;
					if (self._openDialogBoxes[windowID])
						self._closeAsCross(windowID);
				}, this._CLOSE_ON_CLICK_OUTSIDE_DELAY_MS)
			};
		},
		/** @param {string} [windowID] cancels only a close pending for this window */
		cancelCloseOnClickOutside: function(windowID) {
			if (!this._pendingClose || (windowID && this._pendingClose.windowID !== windowID))
				return;
			window.clearTimeout(this._pendingClose.timer);
			this._pendingClose = null;
		},
		/**
		 * Closes the dialog the same way as the cross in its header: the host sends button(-1) for it,
		 * so the warning cancels the removal and the rest just close.
		 * @param {string} windowID
		 */
		_closeAsCross: function(windowID) {
			window.Asc.plugin.button(-1, windowID);
		},
		/**
		 * Esc in a dialog sends {type: 'Close'}: the dialog closes the same way as the cross in its header.
		 * Any other message goes to onMessage, and then the dialog closes.
		 * @param {PluginWindow} dialog
		 * @param {function({type: string, url: string}): void} [onMessage]
		 */
		_listen: function(dialog, onMessage) {
			const self = this;
			dialog.attachEvent('onWindowMessage', /** @param {{type: string, url: string}} message */ function(message) {
				if (message.type == 'Close') {
					self._closeAsCross(dialog.id);
					return;
				}
				if (onMessage)
					onMessage(message);
				self.close(dialog.id);
			});
		},
		/**
		 * @param {PluginWindow} dialog
		 * @param {string} fileName
		 * @param {string} description
		 * @param {number[]} size
		 * @param {string[]} buttonTexts the first one is the primary button
		 */
		_show: function(dialog, fileName, description, size, buttonTexts) {
			const location = window.location;
			const file = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
			/** @type {VariationConfig} */
			const variation = {
				url : location.href.replace(file, fileName),
				description : description,
				isVisual : true,
				isModal : true,
				isViewer: true,
				EditorsSupport : ['word', 'cell', 'slide', 'pdf'],
				size : size,
				buttons : buttonTexts.map(function(text, index) {
					return { 'text': window.Asc.plugin.tr(text), 'primary': index === 0 };
				})
			};
			dialog.show(variation);
			this._openDialogBoxes[dialog.id] = true;
		}
	};

	// the editor gives the focus back to where it was before the dialog, e.g. to the header button
	// that opened it; the marketplace needs it for its keydown handlers (Escape)
	Dialogs.onClose = function() {
		postMessage( { type: 'Focus' } );
	};

	let editorVersion = '';
	let marketplaceURl = '';
	let pluginOptions = {};
	// address set by the administrator in editorConfig.plugins.options
	let adminMarketplaceUrl = '';
	// true when the current address is not the one this installation expects (we warn the user about it)
	let isDeveloperMarketplace = false;
	// false when the administrator turned the developer mode off in editorConfig.plugins.options
	let isDevModeAllowed = true;
	const OOMarketplaceUrl = isLocal ? './store/index.html' : 'https://onlyoffice.github.io/store/index.html';

	function applyDevModeButton() {
		window.Asc.plugin.executeMethod('ShowButton', ['developer', isDevModeAllowed, 'right']);
	}

	function applyMarketplaceUrl() {
		marketplaceURl = MarketplaceUrlManager.resolve(pluginOptions, OOMarketplaceUrl);

		if (adminMarketplaceUrl && adminMarketplaceUrl === marketplaceURl) {
			isDeveloperMarketplace = false;
		} else {
			isDeveloperMarketplace = marketplaceURl !== OOMarketplaceUrl;
		}
	}

	window.Asc.plugin.init = function() {
		pluginOptions = this.info.options || {};
		isDevModeAllowed = MarketplaceUrlManager.isDevModeAllowed(pluginOptions);
		adminMarketplaceUrl = MarketplaceUrlManager.getAdminUrl(pluginOptions);

		// the ban applies to everyone: an address stored earlier must not outlive it
		if (!isDevModeAllowed)
			MarketplaceUrlManager.setDeveloperUrl('');

		applyMarketplaceUrl();
		applyDevModeButton();

		const baseOnEnableMouseEvent = window.Asc.plugin.onEnableMouseEvent;
		// the host turns mouse events on while a plugin window is dragged or resized and off when it ends
		window.Asc.plugin.onEnableMouseEvent = function(isDragging) {
			if (baseOnEnableMouseEvent)
				baseOnEnableMouseEvent.call(this, isDragging);
			WindowDragTracker.onDragChange(isDragging);
		};

		// resize window
		window.Asc.plugin.resizeWindow(winSizes.width, winSizes.height, winSizes.minWidth, winSizes.minHeight, 0, 0);
		if (!isLocal) {
			checkInternet(true);
			loaderTimeout = setTimeout(createLoader, 500);
		} else {
			initPlugin();
		}
	};

	const PluginCard = {
		/** @type {Partial<PluginCardWindowParams>} */
		data: {},
		/** @type {PluginWindow | null} */
		window: null,
		/** @param {PluginCardWindowParams} data */
		show: function(data) {
			this.data = data;
			/** @type {VariationConfig} */
			let variation = {
				url : 'plugin-card.html',
				description: data.pluginName,
				buttons : [],
				isVisual : true,
				isModal : true,
				isViewer : true,
				EditorsSupport : ["word", "cell", "slide", "pdf"],
				size : [680, 600],
				fixedSize : true,
			};
			if (!this.window) {
				this.window = new window.Asc.PluginWindow();
				this.window.attachEvent('onWindowReady', this._onReady.bind(this));
				this.window.attachEvent('onInstall', this._onInstall.bind(this));
				this.window.attachEvent('onUpdate', this._onUpdate.bind(this));
				this.window.attachEvent('onRemove', this._onRemove.bind(this));
				this.window.attachEvent('onClose', this.hide.bind(this));
			}
			this.window.show(variation);
		},
		/**
		 * @param {*} type 
		 * @param {*} result 
		 */
		sendCommand: function(type, result) {
			if (this.window) {
				this.window.command(type, result);
			}
		},
		_onReady: function() {
			this.data.type = 'onShowPluginCard';
			postMessage(this.data);
		},
		/** @param {IframeMessage} data*/
		_onInstall: function(data) {
			return PluginManager.install(data);
		},
		/** @param {IframeMessage} data*/
		_onUpdate: function(data) {
			return PluginManager.update(data);
		},
		/** @param {IframeMessage} data*/
		_onRemove: function(data) {
			return PluginManager.remove(data);
		},
		hide: function() {
			if (this.window) {
				this.window.close();
				this.window = null;
			}
		},
	};

	const PluginManager = {
		/** @param {IframeMessage} data*/
		getInstalled: function(data) {
			return new Promise(function(fResolve) {
				window.Asc.plugin.executeMethod('GetInstalledPlugins', [], function(result) {
					fResolve(result);
				});
			}).then(function(result) {
				postMessage({ type: 'InstalledPlugins', data: result, updateInstalled: data.updateInstalled } );
			});
		},
		/** @param {IframeMessage} data*/
		install: function(data) {
			return new Promise(function(fResolve) {
				window.Asc.plugin.executeMethod('InstallPlugin', [data.config], fResolve);
			}).then(function(result) {
				postMessage(result);
			});
		},
		/** @param {IframeMessage} data*/
		remove: function(data) {
			removeGuid = data.guid;
			if ( Number( editorVersion.split('.').join('')) < 740 )
				removePlugin(true);
			else if ( !data.backup )
				removePlugin(!!data.backup);
			else
				Dialogs.showWarning();
		},
		/** @param {IframeMessage} data*/
		update: function(data) {
			return new Promise(function(fResolve) {
				window.Asc.plugin.executeMethod('UpdatePlugin', [data.config], fResolve);
			}).then(function(result) {
				postMessage(result);
			});
		}
	};

	function postMessage(message) {
		iframe.contentWindow.postMessage(JSON.stringify(message), '*');
		PluginCard.sendCommand(message.type, message);
	};

	function initPlugin() {
		document.body.appendChild(iframe);

		if (isDeveloperMarketplace)
			document.getElementById('notification').classList.remove('hidden');

		// send message that plugin is ready
		const pluginVersionPromise = new Promise(function(fResolve) {
			window.Asc.plugin.executeMethod('GetVersion', [], fResolve);
		}).then(function(version) {
			editorVersion = version;
		});

		let divNoInt = document.getElementById('div_noIternet');
		let style = document.head.lastChild;
		let pageUrl = marketplaceURl;
		iframe.src = pageUrl + window.location.search;
		iframe.onload = function() {
			pluginVersionPromise.then(function() {
				if (divNoInt && !divNoInt.classList.contains('hidden')) {
					divNoInt.classList.add('hidden');
					clearInterval(interval);
					interval = undefined;
				}
				if (style instanceof HTMLStyleElement) {
					postMessage( { type: 'Theme', theme: window.Asc.plugin.theme, style : style.innerHTML } );
				}
				postMessage({
					type: 'PluginReady',
					version: editorVersion,
					pluginVersion: window.Asc.plugin.version,
					editorType: window.Asc.plugin.info.editorSubType === 'pdf'
						? 'pdf'
						: window.Asc.plugin.info.editorType
				} );
			});
		};
	};

	/**
	 * @param {string|number} id 
	 * @param {string} windowID 
	 */
	window.Asc.plugin.button = function(id, windowID) {
		// a click on a footer button has already scheduled the close as a click outside
		Dialogs.cancelCloseOnClickOutside(windowID);
		if (Dialogs.isWarning(windowID)) {
			switch (id) {
				case 0:
					removePlugin(false);
					break;
				case 1:
					removePlugin(true);
					break;
				default:
					postMessage( {type: 'Removed', guid: ''} );
					break;
			}
			Dialogs.close(windowID);
		} else if (Dialogs.isDeveloper(windowID)) {
			if (id == 0)
				Dialogs.sendCommand(windowID, 'onClickBtn');
			else
				Dialogs.close(windowID);
		} else if (windowID) {
			PluginCard.hide();
		} else if (id == 'back') {
			window.Asc.plugin.executeMethod('ShowButton',['back', false]);
			if (iframe && iframe.contentWindow)
				postMessage( { type: 'onClickBack' } );
		} else if (id == 'developer') {
			Dialogs.showDeveloper(onDeveloperMessage);
		} else {
			this.executeCommand('close', '');
		}
	};

	/** @param {{type: string, url: string}} message */
	function onDeveloperMessage(message) {
		if (message.type != 'SetURL')
			return;
		const notificationElement = document.getElementById('notification');
		if (!notificationElement)
			return;
		MarketplaceUrlManager.setDeveloperUrl(message.url);
		applyMarketplaceUrl();
		if (isDeveloperMarketplace)
			notificationElement.classList.remove('hidden');
		else
			notificationElement.classList.add('hidden');
		applyDevModeButton();
		iframe.src = marketplaceURl + window.location.search;
	}

	window.addEventListener('message', function(message) {
		// getting messages from marketplace
		/** @type {IframeMessage} */
		let data;
		try {
			data = JSON.parse(message.data);
		} catch (error) {
			// if we have a problem, don't process this message
			console.error('Failed to parse message', message);
			return;
		}
			
		switch (data.type) {
			case 'getInstalled':
				// this message is used only during plugin initialization, by default plugins from the store are parsed and rendered
				// added updateInstalled flag - in this case we don't load plugins from the store again, we only work with installed ones
				PluginManager.getInstalled(data);
				break;
			case 'install':
				PluginManager.install(data);
				break;
			case 'remove':
				PluginManager.remove(data);
				break;
			case 'update':
				PluginManager.update(data);
				break;
			case 'showButton' :
				window.Asc.plugin.executeMethod('ShowButton',['back', true]);
				break;
			case 'showPluginCard':
				PluginCard.show(data);
				break;
			case 'hidePluginCard':
				PluginCard.hide();
				break;
			case 'closeMarketplace':
				if (PluginCard.window)
					PluginCard.hide();
				else
					window.Asc.plugin.executeCommand('close', '');
				break;
			case 'resize':
				if (!data.width || !data.height) {
					return;
				}
				window.Asc.plugin.resizeWindow(data.width, data.height, winSizes.minWidth, winSizes.minHeight, 0, 0);
				break;
		}
		
	}, false);

	window.Asc.plugin.onExternalMouseUp = function() {
		// mouse up event outside the plugin window
		if (iframe && iframe.contentWindow) {
			postMessage( { type: 'onExternalMouseUp' } );
		}
		if (!WindowDragTracker.isClick())
			return;
		if (Dialogs.hasOpenDialogs())
			Dialogs.closeOnClickOutside();
		else
			PluginCard.hide();
	};

	/** @param {AscTheme} theme */
	window.Asc.plugin.onThemeChanged = function(theme) {
		// theme changed event
		if ( theme.type.indexOf('light') !== -1 ) {
			theme['background-toolbar'] = '#fff';
		}
		window.Asc.plugin.onThemeChangedBase(theme);
		let style = document.head.lastChild;
		if (iframe && iframe.contentWindow && style instanceof HTMLStyleElement) {
			postMessage( { type: 'Theme', theme: theme, style : style.innerHTML } );
		}
	};

	window.Asc.plugin.onTranslate = function() {
		let label = document.getElementById('lb_notification');
		if (label)
			label.textContent = window.Asc.plugin.tr(label.textContent);
		
		label = document.getElementById('lb_noInternet');
		if (label)
			label.textContent = window.Asc.plugin.tr(label.textContent);
	};

	/** @param {boolean} bSetTimeout */
	function checkInternet(bSetTimeout) {
		try {
			let xhr = new XMLHttpRequest();
			let url = 'https://onlyoffice.github.io/store/translations/langs.json';
			xhr.open('GET', url, true);
			
			xhr.onload = function () {
				if (this.readyState == 4) {
					if (this.status >= 200 && this.status < 300) {
						endInternetChecking(true);
					}
				}
			};

			xhr.onerror = function (err) {
				endInternetChecking(false);
			};

			xhr.send(null);
		} catch (error) {
			endInternetChecking(false);
		}
		if (bSetTimeout) {
			errTimeout = setTimeout(function() {
				// if loading is too long show the error (because sometimes requests can not send error)
				endInternetChecking(false);
			}, 15000);
		}
	};

	/** @param {boolean} isOnline */
	function endInternetChecking(isOnline) {
		clearTimeout(errTimeout);
		errTimeout = undefined;
		destroyLoader();
		if (isOnline) {
			initPlugin();
		} else {
			const noInternetElement = document.getElementById('div_noIternet');
			if (!noInternetElement) {
				console.error('noInternetElement element not found');
				return;
			}
			noInternetElement.classList.remove('hidden');
			if (!interval) {
				interval = setInterval(function() {
					checkInternet(false);
				}, 5000);
			}
		}
	};

	/** @param {boolean} backup */
	function removePlugin(backup) {
		if (removeGuid) {
			return new Promise(function(fResolve) {
				window.Asc.plugin.executeMethod('RemovePlugin', [removeGuid, backup], fResolve);
			}).then(function(result) {
				removeGuid = '';
				postMessage(result);
			});
		}
		return Promise.resolve();
	};

	window.onresize = function() {
		// zoom for all elements in plugin window
		let zoom = 1;
		if (window.devicePixelRatio < 1)
			zoom = 1 / window.devicePixelRatio;
		
		document.documentElement.style.zoom = String(zoom);
	};

	function createLoader() {
		$('#loader-container').removeClass( 'hidden' );
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = showLoader($('#loader-container')[0], window.Asc.plugin.tr('Checking internet connection...'));
	};

	function destroyLoader() {
		clearTimeout(loaderTimeout);
		loaderTimeout = undefined;
		$('#loader-container').addClass( 'hidden' )
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = undefined;
	};

})(window, undefined);
