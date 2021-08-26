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
(function(window, undefined)
{
	var text_init = "";
	var is_end_callback = false;

	window.Asc.plugin.init      = function(text)
	{
		if ("" == text)
		{
			window.Asc.plugin.executeCommand("close", "");
			return;
		}

		text_init = text;
		function StartCallback()
		{
			setTimeout(function(){
				if (!is_end_callback && !responsiveVoice.isPlaying())
				{
					responsiveVoice.speak(text_init, undefined, {onstart : StartCallback, onend : EndCallback, onerror : EndCallback});
				}
			}, 5000);
		}

		function EndCallback()
		{
			is_end_callback = true;
			window.Asc.plugin.button(-1);
		}

		function Run(lang)
		{
			var voicelist = responsiveVoice.getVoices();

			var _data  = [];
			var _langs = responsiveVoice.responsivevoices;

			var _map   = {};
			_map["en"] = ["gb"];
			_map["ko"] = ["kr"];
			_map["hy"] = ["ar"];
			_map["uk"] = ["ru"]; //ua not supported
			_map["zh"] = ["cn"];
			_map["ja"] = ["jp"];
			_map["pt-BR"] = ["br"];
			_map["pt-Pt"] = ["pt"];
			_map["zh-TW"] = ["tw"];
			_map["cs"] = ["cz"];
			_map["da"] = ["dk"];
			_map["et"] = ["ee"];
			_map["el"] = ["gr"];
			_map["va"] = ["la"];
			_map["ne"] = ["np"];
			_map["nn"] = ["no"];
			_map["sl"] = ["sk"];
			_map["ta"] = ["hi"];
			_map["ro"] = ["md"];
			_map["sh"] = ["hr"];
			_map["ca"] = ["catalonia"];
			for (var i = 0; i < _langs.length; i++)
			{
				if (_langs[i].flag == lang)
				{
					_data.push({index : i, gender : _langs[i].gender});
				}
				else if (_map[lang])
				{
					for (var k = 0; k < _map[lang].length; k++)
					{
						if (_langs[i].flag == _map[lang][k])
						{
							_data.push({index : i, gender : _langs[i].gender});
							break;
						}
					}
				}
			}
			if (!_data.length) {
				_data.push({index : 0, gender : "f"});
			}
			_data.sort(function(a, b) { return a.gender.charCodeAt(0) - b.gender.charCodeAt(0) }); // family :)
			var voiceName = "";
			for (var j = 0; j < _data.length; j++)
			{
				var nameCandidate = _langs[_data[j].index].name;
				for (var k = 0, k_len = voicelist.length; k < k_len; k++)
				{
					if (voicelist[k].name === nameCandidate)
					{
						voiceName = nameCandidate;
						break;
					}
				}
				if (voiceName !== "")
					break;
			}

			responsiveVoice.speak(text_init, voiceName, {onstart : StartCallback, onend : EndCallback, onerror : EndCallback});
		}

		responsiveVoice.AddEventListener("OnReady", function() {
			setTimeout(function()
			{
				guessLanguage.info(text_init, function(info) {
					//console.log('Detected Language: ' + info[2] + " [" + info[0] + "]" +"_____" +info[1]);
					Run(info[0]);
				});
			}, 1);
		});
	};

	window.Asc.plugin.button = function(id)
	{
		if (-1 == id)
			responsiveVoice.cancel();

		this.executeCommand("close", "");
	};

})(window, undefined);