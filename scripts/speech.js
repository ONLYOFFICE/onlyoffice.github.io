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