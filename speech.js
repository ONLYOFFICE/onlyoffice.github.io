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
				// detect language with yandex translate api
				var xhr  = new XMLHttpRequest();
				var _url = "https://translate.yandex.net/api/v1.5/tr.json/detect?";
				_url += "key=trnsl.1.1.20160604T115612Z.107ebb05a7757bcc.804e900f347ddfbeadd7ca5999bd5cb6ca32805b";
				_url += "&text=";
				_url += encodeURIComponent(text_init);
				xhr.open('POST', _url, true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onreadystatechange = function()
				{
					if (this.readyState == 4 && this.status == 200)
					{
						try
						{
							var _obj = JSON.parse(this.responseText);
							Run(_obj.lang);
						}
						catch (err)
						{
							Run("en");
						}
					}
					else if ( (this.readyState == 4 && this.status == 403) || (401 == this.readyState || 404 == this.readyState || 413 == this.readyState || 422 == this.readyState || 501 == this.readyState) )
					{
						Run("en");
					}
				};
				xhr.send(null);
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