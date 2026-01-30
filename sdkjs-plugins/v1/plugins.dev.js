/**
 *
 * (c) Copyright Ascensio System SIA 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function(window, undefined){

	window.Asc = window.Asc || {};
	window.Asc.plugin = {};

	// ie channel
	window.Asc.plugin.ie_channel = null;
	window.Asc.plugin.ie_channel_check = function(e) {
		var uagent = navigator.userAgent.toLowerCase();
		if (uagent.indexOf("msie") > -1 || uagent.indexOf("trident") > -1)
		{
			if (e.ports && e.ports[0])
				this.ie_channel = e.ports[0];
		}
	};

	function _sendMessageToParent(data) {
		if (window.Asc.plugin.ie_channel)
			window.Asc.plugin.ie_channel.postMessage(data);
		else
			window.parent.postMessage(data, "*");
	}

	window.Asc.plugin.tr_init = false;
	window.Asc.plugin.tr = function(val) { return val; }

	window.Asc.scope = {};
	window.Asc.scope.prototype = {
		clear : function() {
			for (var i in window.Asc.scope) 
				delete window.Asc.scope[i];
		}
	};

	function extend(obj, plugin) {
		if (!obj || !("object" == typeof(obj) || "array" == typeof(obj)))
			return obj;

		var dst = (plugin === undefined) ? {} : plugin;
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				dst[prop] = (obj[prop] && "object" === typeof obj[prop]) ? extend(obj[prop]) : obj[prop];
			}
		}
		return dst;
	}

	function getSearchParam(name) {
		var _windowSearch = window.location.search;
		var _nameSearch = name + "=";
		var _pos1 = _windowSearch.indexOf(_nameSearch);
		if (_pos1 >= 0)
		{
			_pos1 += _nameSearch.length;
			var _pos2 = _windowSearch.indexOf("&", _pos1);
			if (_pos2 < 0)
				_pos2 = _windowSearch.length;

			return _windowSearch.substring(_pos1, _pos2);
		}
		return undefined;
	}

	function checkPluginWindow() {
		var windowID = getSearchParam("windowID");
		if (windowID) {
			window.Asc.plugin.windowID = windowID;

			if (!window.Asc.plugin.guid)
				window.Asc.plugin.guid = decodeURIComponent(getSearchParam("guid"));
		}

		return (undefined !== windowID) ? true : false;
	}

	window.onload = function()
	{
		if (!window.Asc || !window.Asc.plugin)
			return;

		var xhr = new XMLHttpRequest();
		xhr.open("get", "./config.json", true);
		xhr.responseType = "json";
		xhr.onload = function() {
			if (!window.Asc || !window.Asc.plugin)
				return;
			
			if (xhr.status === 404)
				return xhr.onerror();

			if (xhr.status == 200 || (xhr.status == 0 && xhr.readyState == 4)) {
				var objConfig = xhr.response;
				if ((typeof objConfig) == "string")
					objConfig = JSON.parse(objConfig);

				extend(objConfig, window.Asc.plugin);

				var obj = {
					type : "initialize",
					guid : window.Asc.plugin.guid
				};

				if (checkPluginWindow()) {
					obj.windowID = window.Asc.plugin.windowID;
				}

				var _body = document.body;
				if (_body && true !== window.Asc.plugin.enableDrops) {
					_body.ondrop = function(e) {
						if (e && e.preventDefault)
							e.preventDefault();
						return false;
					};
					_body.ondragenter = function(e) {
						if (e && e.preventDefault)
							e.preventDefault();
						return false;
					};
					_body.ondragover = function(e) {
						if (e && e.preventDefault)
							e.preventDefault();
						if (e && e.dataTransfer)
							e.dataTransfer.dropEffect = "none";
						return false;
					};
				}

				// ie11 not support message from another domain
				window.Asc.plugin._initInternal = true;
				window.parent.postMessage(JSON.stringify(obj), "*");
			}
		};
		xhr.onerror = function() {
			if (!window.Asc || !window.Asc.plugin)
				return;

			if (checkPluginWindow()) {
				var obj = {
					type : "initialize",
					guid : window.Asc.plugin.guid
				};
				obj.windowID = window.Asc.plugin.windowID;

				// ie11 not support message from another domain
				window.Asc.plugin._initInternal = true;
				window.parent.postMessage(JSON.stringify(obj), "*");
			}
		}
		xhr.send();
	};

	window.Asc.supportOrigins = {};
	window.Asc.supportOrigins[window.origin] = true;

	function onMessage(event) {
		if (!window.Asc || !window.Asc.plugin)
			return;

		if (window.plugin_onMessage) {
			if (!window.Asc.supportOrigins[event.origin])
				return;
			window.plugin_onMessage(event);
			return;
		}

		if (!window.Asc.plugin._initInternal)
			return;

		if (typeof(event.data) == "string") {
			var pluginData = {};
			try {
				pluginData = JSON.parse(event.data);
			}
			catch(err) {
				pluginData = {};
			}

			if (pluginData.type == "plugin_init") {
				window.Asc.supportOrigins[event.origin] = true;
				window.Asc.plugin.ie_channel_check(event);
				eval(pluginData.data);
			}
		}
	}

	if (window.addEventListener)
		window.addEventListener("message", onMessage, false);
	else
		window.attachEvent("onmessage", onMessage);

	window.Asc.plugin._attachCustomMenuClickEvent = function(type, id, action)
	{
		if (!this[type])
			this[type] = {};

		this[type][id] = action;
	};
	window.Asc.plugin._onCustomMenuClick = function(type, id)
	{
		// parse data from id: text from item.
		var itemId = id;
		var itemData = undefined;
		var itemPos = itemId.indexOf("_oo_sep_");
		if (-1 !== itemPos)
		{
			itemData = itemId.substring(itemPos + 8);
			itemId = itemId.substring(0, itemPos);
		}

		if (this[type] && this[type][itemId])
			this[type][itemId].call(this, itemData);
	};

	window.Asc.plugin.attachContextMenuClickEvent = function(id, action)
	{
		this._attachCustomMenuClickEvent("contextMenuEvents", id, action);
	};
	window.Asc.plugin.event_onContextMenuClick = function(id)
	{
		this._onCustomMenuClick("contextMenuEvents", id);
	};

	window.Asc.plugin.attachToolbarMenuClickEvent = function(id, action)
	{
		this._attachCustomMenuClickEvent("toolbarMenuEvents", id, action);
	};
	window.Asc.plugin.event_onToolbarMenuClick = function(id)
	{
		this._onCustomMenuClick("toolbarMenuEvents", id);
	};
	window.Asc.plugin.attachEvent = function(id, action)
	{
		var pluginObj = window.Asc.plugin;
		if (!pluginObj._events)
			pluginObj._events = {};

		pluginObj._events[id] = action;
	};
	window.Asc.plugin.detachEvent = function(id)
	{
		var pluginObj = window.Asc.plugin;
		if (pluginObj._events && pluginObj._events[id])
			delete pluginObj._events[id];
	};
	window.Asc.plugin.onEvent = function(id, data)
	{
		var pluginObj = window.Asc.plugin;
		if (pluginObj._events && pluginObj._events[id])
			pluginObj._events[id].call(pluginObj, data);
	};

	window.Asc.plugin.attachEditorEvent = function(id, action)
	{
		window.Asc.plugin["event_" + id] = action.bind(window.Asc.plugin);

		_sendMessageToParent(JSON.stringify({
			"guid" : window.Asc.plugin.guid,
			"type" : "attachEvent",
			"name" : id
		}));
	};
	window.Asc.plugin.detachEditorEvent = function(id)
	{
		if (window.Asc.plugin["event_" + id])
			delete window.Asc.plugin["event_" + id];

		_sendMessageToParent(JSON.stringify({
			"guid" : window.Asc.plugin.guid,
			"type" : "detachEvent",
			"name" : id
		}));
	};

	window.onunload = function() {
		if (window.addEventListener)
			window.removeEventListener("message", onMessage, false);
		else
			window.detachEvent("onmessage", onMessage);
	};

})(window, undefined);

(function(window, undefined)
{
	function generateGuid()
	{
		if (!window.crypto || !window.crypto.getRandomValues)
		{
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		}
		
		var array = new Uint16Array(8);
		window.crypto.getRandomValues(array);
		var index = 0;
		function s4() {
			var value = 0x10000 + array[index++];
			return value.toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	function translateItem(text) {
		return window.Asc.plugin.tr(text);
	};

	window.Asc = window.Asc || {};
	var Asc = window.Asc;
	
	Asc.Buttons = {};
	Asc.Buttons.ButtonsContextMenu = [];
	Asc.Buttons.ButtonsToolbar = [];
	Asc.Buttons.ButtonsContentControl = [];

	Asc.Buttons.registerContextMenu = function()
	{
		window.Asc.plugin.attachEvent("onContextMenuShow", function(options) {
			if (!options)
				return;

			let items = {
				guid: window.Asc.plugin.guid,
			};
			for (let i = 0, len = Asc.Buttons.ButtonsContextMenu.length; i < len; i++)
			{
				let button = Asc.Buttons.ButtonsContextMenu[i];
				if (button.parent === null)
				{
					button.onContextMenuShow(options, items);
				}
			}
	
			if (items.items)
				window.Asc.plugin.executeMethod("AddContextMenuItem", [items]);
		});
	};

	Asc.Buttons.registerToolbarMenu = function()
	{
		let items = {
			guid : window.Asc.plugin.guid,
			tabs : []
		};

		for (let i = 0, len = Asc.Buttons.ButtonsToolbar.length; i < len; i++)
		{
			let button = Asc.Buttons.ButtonsToolbar[i];
			if (button.parent === null)
			{
				button.toToolbar(items);
			}

			if (!!button.menu) {
				for (let indexItem in button.menu) {
					let item = button.menu.hasOwnProperty(indexItem) ? button.menu[indexItem] : null;
					if (item && !!item.onclick) {
						window.Asc.plugin.attachToolbarMenuClickEvent(item.id, item.onclick);
					}
				}
			}
		}

		if (items.tabs.length > 0)
			window.Asc.plugin.executeMethod("AddToolbarMenuItem", [items]);
	};

	Asc.Buttons.updateToolbarMenu = function(id, name, buttons)
	{
		let buttonMainToolbar = new Asc.ButtonToolbar(null, id);
		buttonMainToolbar.text = name;

		let items = {
			guid : window.Asc.plugin.guid,
			tabs : []
		};

		buttonMainToolbar.childs = buttons;
		for (let i = 0, len = buttons.length; i < len; i++)
			buttons[i].parent = buttonMainToolbar;

		buttonMainToolbar.toToolbar(items);

		for (let i = 0, len = buttons.length; i < len; i++)
		{
			let button = buttons[i];
			if (!!button.menu) {
				for (let indexItem in button.menu) {
					let item = button.menu.hasOwnProperty(indexItem) ? button.menu[indexItem] : null;
					if (item && !!item.onclick) {
						window.Asc.plugin.attachToolbarMenuClickEvent(item.id, item.onclick);
					}
				}
			}
		}

		if (items.tabs.length > 0)
			window.Asc.plugin.executeMethod("UpdateToolbarMenuItem", [items]);
	};

	Asc.Buttons.registerContentControl = function()
	{
		window.Asc.plugin.attachEditorEvent("onShowContentControlTrack", function(contentControls) {

			let buttons = {
				guid: window.Asc.plugin.guid,
				items : {}
			};

			let promises = [];

			for (let i = 0, len = Asc.Buttons.ButtonsContentControl.length; i < len; ++i)
			{
				promises.push(Asc.Buttons.ButtonsContentControl[i].onShowTrack(contentControls, buttons.items));
			}

			Promise.all(promises).then(function() {
				for (let id in buttons.items)
				{
					window.Asc.plugin.executeMethod("AddContentControlButtons", [buttons]);
					break;	
				}
			});
		});

		window.Asc.plugin._attachContentControlButtonClickEvent = function(buttonId, action)
		{
			const eventName = "ContentControlButtonEvents";
			
			if (!this[eventName])
				this[eventName] = {};
			
			this[eventName][buttonId] = action;
		};

		let _plugin = window.Asc.plugin;
		window.Asc.plugin.attachEditorEvent("onContentControlButtonClick", function(data) {
			const eventName = "ContentControlButtonEvents";
			
			let buttonId = (data && data["buttonId"] ? data["buttonId"] : null);
			let ccId = (data && data["contentControlId"] ? data["contentControlId"] : null);
			
			if (!buttonId || !ccId)
				return;
			
			if (_plugin[eventName] && _plugin[eventName][buttonId])
				_plugin[eventName][buttonId].call(_plugin, ccId);
		});
	};

	var ToolbarButtonType = {
		Button : "button",
		BigButton : "big-button"
	};

	var ItemType = {
		None : 0,
		ContextMenu : 1,
		Toolbar : 2,
		ContentControl : 3
	};

	function Button(parent, id)
	{
		this.itemType = ItemType.None;
		this.editors = ["word", "cell", "slide"];

		this.id = (id === undefined) ? generateGuid() : id;

		this.icons = null;
		
		this.text = "";
		this.hint = null;
		this.data = "";

		this.separator = false;
		this.lockInViewMode = true;
		this.enableToggle = false;
		this.disabled = false;
		this.removed = false;

		this.parent = parent ? parent : null;
		this.childs = null;

		if (this.parent)
		{
			if (!this.parent.childs)
				this.parent.childs = [];
			this.parent.childs.push(this);
		}
	}

	Button.prototype.toItem = function() 
	{
		let item = {
			id : this.id,
			text : translateItem(this.text)
		};

		if (this.hint !== null)
			item.hint = translateItem(this.hint === "" ? this.hint : this.text);
		
		if (this.separator)
			item.separator = true;

		if (this.data)
			item.data = this.data;

		if (this.lockInViewMode)
			item.lockInViewMode = true;

		if (this.enableToggle)
			item.enableToggle = true;

		if (this.disabled)
			item.disabled = true;
		else
			item.disabled = false;

		if (this.removed)
			item.removed = true;

		if (this.icons)
			item.icons = this.icons;

		if (this.itemType === ItemType.Toolbar)
			item.type = this.type;

		if (this.menu)
			item.items = this.menu.map(function(menuItem) {
				menuItem.text = translateItem(menuItem.text);
				return menuItem;
			});

		if (this.split)
			item.split = true;

		return item;
	};

	Button.prototype.attachOnClick = function(handler)
	{
	};

	Button.prototype.onClick = function() 
	{
		console.log("BUTTON: " + this.text);
	};

	function ButtonContextMenu(parent, id)
	{
		Button.call(this, parent, id);

		this.itemType = ItemType.ContextMenu;
		this.showOnOptionsType = [];

		Asc.Buttons.ButtonsContextMenu.push(this);
	}

	ButtonContextMenu.prototype = Object.create(Button.prototype);
	ButtonContextMenu.prototype.constructor = ButtonContextMenu;

	ButtonContextMenu.prototype.copy = function()
	{
		let ret = new ButtonContextMenu(this.parent, this.id);
		ret.editors = this.editors;

		ret.separator = this.separator;
		ret.lockInViewMode = this.lockInViewMode;
		ret.enableToggle = this.enableToggle;
		ret.disabled = this.disabled;
		ret.showOnOptionsType = this.showOnOptionsType.slice();

		return ret;
	};

	ButtonContextMenu.prototype.addCheckers = function()
	{
		let len = arguments.length;
		this.showOnOptionsType = new Array(len);
		for (let i = 0; i < len; i++)
			this.showOnOptionsType[i] = arguments[i];
	};

	ButtonContextMenu.prototype.attachOnClick = function(handler)
	{
		window.Asc.plugin.attachContextMenuClickEvent(this.id, handler);  
	};

	ButtonContextMenu.prototype.onContextMenuShowAnalyze = function(options, parent)
	{
		return false;
	};

	ButtonContextMenu.prototype.onContextMenuShowExtendItem = function(options, item)
	{
	};

	ButtonContextMenu.prototype.onContextMenuShow = function(options, parent) 
	{
		if (this.onContextMenuShowAnalyze(options, parent))
			return;

		let isSupport = false;
		for (let i = 0, len = this.editors.length; i < len; i++)
		{
			if (Asc.plugin.info.editorType === this.editors[i])
			{
				isSupport = true;
				break;
			}
		}

		if (!isSupport)
			return;

		for (let i = 0, len = this.showOnOptionsType.length; i < len; i++)
		{
			if (options.type === this.showOnOptionsType[i] || this.showOnOptionsType[i] === "All")
			{
				if (!parent.items)
					parent.items = [];

				let curItem = this.toItem();   
				this.onContextMenuShowExtendItem(options, curItem);
				
				if (this.childs)
				{
					for (let j = 0, childsLen = this.childs.length; j < childsLen; j++)
					{
						this.childs[j].onContextMenuShow(options, curItem);
					}
				}

				parent.items.push(curItem);
				return;
			}
		}
	};

	function ButtonToolbar(parent, id)
	{
		Button.call(this, parent, id);

		this.itemType = ItemType.Toolbar;
		this.type = ToolbarButtonType.BigButton;
		this.tab = "";
		
		Asc.Buttons.ButtonsToolbar.push(this);
	}

	ButtonToolbar.prototype = Object.create(Button.prototype);
	ButtonToolbar.prototype.constructor = ButtonToolbar;

	ButtonToolbar.prototype.attachOnClick = function(handler)
	{
		window.Asc.plugin.attachToolbarMenuClickEvent(this.id, handler);
	};

	ButtonToolbar.prototype.toItem = function(items)
	{
		let item = Button.prototype.toItem.call(this);
		item.type = this.type;
		return item;
	};

	ButtonToolbar.prototype.toToolbar = function(items)
	{
		let currentItem = null;
		if (this.parent === null)
		{
			let tab = {
				id : this.id,
				text : translateItem(this.text),
				items : []
			};
			if (this.hint !== null)
				tab.hint = translateItem(this.hint === "" ? this.hint : this.text);

			items.tabs.push(tab);

			currentItem = tab;
		}
		else
		{
			currentItem = this.toItem();
			
			if (!items.items)
				items.items = [];
			
			items.items.push(currentItem);
		}

		if (this.childs)
		{
			for (let j = 0, childsLen = this.childs.length; j < childsLen; j++)
			{
				this.childs[j].toToolbar(currentItem);
			}
		}
	};

	function ButtonContentControl(parent, id)
	{
		Button.call(this, parent, id);
		this.itemType = ItemType.ContentControl;
		this.checker = null;


		if (0 === Asc.Buttons.ButtonsContentControl.length)
			Asc.Buttons.registerContentControl();

		Asc.Buttons.ButtonsContentControl.push(this);
	}

	ButtonContentControl.prototype = Object.create(Button.prototype);
	ButtonContentControl.prototype.constructor = ButtonContentControl;

	ButtonContentControl.prototype.attachOnClick = function(handler)
	{
		window.Asc.plugin._attachContentControlButtonClickEvent(this.id, handler);
	};
	ButtonContentControl.prototype.addChecker = function(checker)
	{
		if (!checker || typeof checker !== 'function')
			return;
		
		this.checker = checker;
	};
	ButtonContentControl.prototype.onShowTrack = function(ccIds, items)
	{
		let fChecker = this.checker;
		let promises = [];
		let curItem = this.toItem();
		for (let i = 0, len = ccIds.length; i < len; ++i)
		{
			let ccId = ccIds[i];
			promises.push(new Promise(function(resolve) {

				if (!fChecker)
				{
					resolve(true)
				}
				else
				{
					let result = fChecker(ccId);
					if (result instanceof Promise)
					{
						result.then(function(result) {
							resolve(result);
						});
					}
					else
					{
						resolve(!!result)
					}
				}
			}).then(function(result) {
				if (!result)
					return;

				if (!items[ccId])
					items[ccId] = [];

				items[ccId].push(curItem);
			}));
		}
		return Promise.all(promises);
	};

	Asc.ToolbarButtonType = ToolbarButtonType;
	Asc.ButtonContextMenu = ButtonContextMenu;
	Asc.ButtonToolbar = ButtonToolbar;
	Asc.ButtonContentControl = ButtonContentControl;
})(window);
