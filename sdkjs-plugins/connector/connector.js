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

(function(e){function f(){if(window.crypto&&window.crypto.getRandomValues){var a=function(){return(65536+b[c++]).toString(16).substring(1)},b=new Uint16Array(8);window.crypto.getRandomValues(b);var c=0;return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()}a=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)};return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()}function d(a){this.frame=a.frame;this.guid="asc.{"+f()+"}";this.isConnected=!1;a.autoconnect&&this.connect();
this.callbacks=[];this.events={};this.tasks=[];this.onMessageBound=this.onMessage.bind(this)}d.prototype.onMessage=function(a){if("string"==typeof a.data){var b={};try{b=JSON.parse(a.data)}catch(c){b={}}if("onExternalPluginMessageCallback"===b.type&&(b=b.data,this.guid===b.guid))switch(b.type){case "onMethodReturn":0<this.callbacks.length&&(a=this.callbacks.shift())&&a(b.methodReturnData);0<this.tasks.length&&this.sendMessage(this.tasks.shift());break;case "onCommandCallback":0<this.callbacks.length&&
(a=this.callbacks.shift())&&a();0<this.tasks.length&&this.sendMessage(this.tasks.shift());break;case "onEvent":if(b.eventName&&this.events[b.eventName])this.events[b.eventName](b.eventData)}}};d.prototype.sendMessage=function(a){var b={frameEditorId:"iframeEditor",type:"onExternalPluginMessage",subType:"connector"};b.data=a;b.data.guid=this.guid;a=this.frame;"string"===typeof a&&(a=document.getElementById(this.frame));a&&a.contentWindow.postMessage(JSON.stringify(b),"*")};d.prototype.connect=function(){window.addEventListener?
window.addEventListener("message",this.onMessageBound,!1):window.attachEvent&&window.attachEvent("onmessage",this.onMessageBound);this.isConnected=!0;this.sendMessage({type:"register"})};d.prototype.disconnect=function(){window.removeEventListener?window.removeEventListener("message",this.onMessageBound,!1):window.detachEvent&&window.detachEvent("onmessage",this.onMessageBound);this.isConnected=!1;this.sendMessage({type:"unregister"})};d.prototype.callCommand=function(a,b,c){this.isConnected?(this.callbacks.push(b),
a="var Asc = {}; Asc.scope = "+JSON.stringify(window.Asc.scope||{})+"; var scope = Asc.scope; ("+a.toString()+")();",c={type:"command",recalculate:!0===c?!1:!0,data:a},1!==this.callbacks.length?this.tasks.push(c):this.sendMessage(c)):console.log("Connector is not connected with editor")};d.prototype.callMethod=function(a,b,c){this.isConnected?(this.callbacks.push(c),a={type:"method",methodName:a,data:b},1!==this.callbacks.length?this.tasks.push(a):this.sendMessage(a)):console.log("Connector is not connected with editor")};
d.prototype.attachEvent=function(a,b){this.isConnected?(this.events[a]=b,this.sendMessage({type:"attachEvent",name:a})):console.log("Connector is not connected with editor")};d.prototype.detachEvent=function(a){this.events[a]&&(delete this.events[a],this.isConnected?this.sendMessage({type:"detachEvent",name:a}):console.log("Connector is not connected with editor"))};e.Asc=e.Asc?e.Asc:{};e.Asc.EditorConnector=d})(window);
