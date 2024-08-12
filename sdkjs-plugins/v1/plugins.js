/**
 *
 * (c) Copyright Ascensio System SIA 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
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
