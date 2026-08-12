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
(function(window, undefined){
	
	try {
		var url = "";
		var isWindowPlayer = false;

		window.Asc.plugin.init = function(text)
		{
			if (!YT) {
				document.getElementsByTagName('body')[0].innerHTML = "<p id='message' style='text-align:center; font-size:12pt;'>" + window.Asc.plugin.tr("This service isn't available in your region.") + "<\/p>";
				return;
			}

			const isLocalDesktop = (function(){
				if (window.navigator && window.navigator.userAgent.toLowerCase().indexOf("ascdesktopeditor") < 0)
					return false;
				if (window.location && window.location.protocol == "file:")
					return true;
				if (window.document && window.document.currentScript && 0 == window.document.currentScript.src.indexOf("file:///"))
					return true;
				return false;
			})();

			var _textbox = document.getElementById("textbox_url");

			// disable input and button elements in view mode
			if (this.info.isViewMode) {
				_textbox.disabled = true;
				document.getElementById("textbox_button").disabled = true;
			}

			_textbox.onkeyup = function(e)
			{
				if (e.keyCode == 13) // click on Enter
					document.getElementById("textbox_button").onclick();
			};
			
			// clear validation on input/paste
			_textbox.oninput = _textbox.onpaste = function(e)
			{
				this.style.borderColor = "";
				document.getElementById("input_error_id").style.display = "none";
			};
			// ie
			_textbox.addEventListener("paste", function(e)
			{
				this.style.borderColor = "";
				document.getElementById("input_error_id").style.display = "none";
			});

			document.getElementById("textbox_button").onclick = function(e)
			{
				var _url = document.getElementById("textbox_url").value;
				
				var _searchDoubleStart = 10;
				var _findDoubleUrl = _url.indexOf("http://", _searchDoubleStart);
				if (_findDoubleUrl < 0)
					_findDoubleUrl = _url.indexOf("https://", _searchDoubleStart);
				if (_findDoubleUrl < 0)
					_findDoubleUrl = _url.indexOf("www.", _searchDoubleStart);

				if (_findDoubleUrl > 0)
				{
					_url = _url.substring(0, _findDoubleUrl);
					document.getElementById("textbox_url").value = _url;
				}

				if (!Utils.validateYoutubeUrl(_url))
				{
					document.getElementById("textbox_url").style.borderColor = "#d9534f";
					document.getElementById("input_error_id").style.display = "block";
					return;
				}

				if (!isWindowPlayer)
				{
					var _table     = document.getElementById("id_player");
					_table.textContent = "";
					const div = document.createElement("div");
					div.id = "content";
					div.style.position = "absolute";
					div.style.padding = "0";
					div.style.margin = "0";
					div.style.left = "0";
					div.style.top = "0";
					div.style.width = "100%";
					div.style.height = "100%";
					_table.appendChild(div);
					isWindowPlayer = true;

					window.Asc.plugin.resizeWindow(620, 480, 390, 400, 0, 0);
				}

				url = _url;

				Player.show(url, isLocalDesktop);
			};

			url = text;
			if (url !== "")
			{
				document.getElementById("textbox_url").value = url;
				document.getElementById("textbox_button").onclick();
			}
			_textbox.focus();
		};
		
		window.Asc.plugin.button = function(id)
		{
			Player.stop();

			if (id == 0 && YT)
			{
				url = document.getElementById("textbox_url").value;

				if (!Utils.validateYoutubeUrl(url))
				{
					document.getElementById("textbox_url").style.borderColor = "#d9534f";
					document.getElementById("input_error_id").style.display = "block";
					return;
				}

				var _id = Utils.extractVideoId(url);
				var _questPos = _id.indexOf("?");
				if (_questPos > 0)
					_id = _id.substring(0, _questPos);

				var _url = "http://img.youtube.com/vi/" + _id + "/0.jpg";
				if (_id)
				{
					var _info = window.Asc.plugin.info;

					var _method = (_info.objectId === undefined) ? "AddOleObject" : "EditOleObject";
					
					var _param = {
						guid : _info.guid,
						widthPix : (_info.mmToPx * _info.width) >> 0,
						heightPix : (_info.mmToPx * _info.height) >> 0,
						width : _info.width ? _info.width : 100,
						height : _info.height ? _info.height : 70,
						imgSrc : _url,
						data : url,
						objectId : _info.objectId,
						resize : _info.resize
					};

					window.Asc.plugin.executeMethod(_method, [_param], function() {
						window.Asc.plugin.executeCommand("close", "");
					});
				}
				else
				{
					this.executeCommand("close", "");
				}
			}
			else
			{
				this.executeCommand("close", "");
			}
		};

		window.Asc.plugin.onTranslate = function()
		{
			var label = document.getElementById("td_labelUrl");
			if (label)
				label.textContent = window.Asc.plugin.tr("Paste youtube video URL");
			const loading = document.querySelector(".asc-loader-title");
			if (loading) {
				loading.textContent = window.Asc.plugin.tr("Loading video");
			}
		};
	} catch (error) {
		console.log("Some problem");
	}

})(window, undefined);
