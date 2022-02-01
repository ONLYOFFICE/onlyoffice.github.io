/**
 *
 * (c) Copyright Ascensio System SIA 2020
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

    window.Asc.plugin.init = function()
    {
        if ((navigator.userAgent.indexOf("Chrome") !== -1) && (navigator.vendor.indexOf("Google Inc") !== -1) && !window.AscDesktopEditor) {
             //check incognito mode only in chrome
             var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
             if (fs) {
                 fs(window.TEMPORARY, 100, function(fs) {
                     document.getElementById("iframe").style.display = "block";
                 }, function(err) {
                     document.getElementById("result").style.display = "block";
                     document.getElementById("iframe").style.display = "none";
                 });
             } 
            
        } else {
           document.getElementById("iframe").style.display = "block";
        }
    };

    window.Asc.plugin.button = function(id)
    {
        this.executeCommand("close", "");
    };

    window.Asc.plugin.onExternalMouseUp = function()
    {        
    };

})(window, undefined);
