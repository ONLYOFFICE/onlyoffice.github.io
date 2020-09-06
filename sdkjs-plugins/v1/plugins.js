/*
 * (c) Copyright Ascensio System SIA 2010-2019
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
 * You can contact Ascensio System SIA at 20A-12 Ernesta Birznieka-Upisha
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

            if (xhr.status == 200 || (xhr.status == 0 && xhr.readyState == 4)) {
                var objConfig = xhr.response;
                if ((typeof objConfig) == "string")
                    objConfig = JSON.parse(objConfig);

                extend(objConfig, window.Asc.plugin);

                var obj = {
                    type : "initialize",
                    guid : window.Asc.plugin.guid
                };

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

    window.onunload = function() {
        if (window.addEventListener)
            window.removeEventListener("message", onMessage, false);
        else
            window.detachEvent("onmessage", onMessage);
    };
})(window, undefined);
