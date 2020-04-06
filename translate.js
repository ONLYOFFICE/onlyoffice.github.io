(function(window, undefined){
	window.oncontextmenu = function(e)
	{
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
	};
	
	var translate_data = "";
	var languages = [];
	var language_current = "";
	var translate_data_send = null;
	var isBreakTranslate = false;
	var breakTimeoutId = -1;

	var isInit = false;

	function updateScroll()
	{
		Ps.update();
	}

	function getLanguagesSupport()
	{
		var xhr = new XMLHttpRequest();
		var _url = "https://translate.yandex.net/api/v1.5/tr.json/getLangs?";
		_url += "key=trnsl.1.1.20160604T115612Z.107ebb05a7757bcc.804e900f347ddfbeadd7ca5999bd5cb6ca32805b";
		_url += "&ui=en";
		xhr.open('POST', _url, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				try
				{
					var _obj = JSON.parse(this.responseText);
					var _langs = _obj.langs;

					languages = [];

					for (var i in _langs)
					{
						languages.push( { id : i, lang : _langs[i] } );
					}

					var _defLang = "ru";
					if (window.Asc.plugin.info.lang && window.Asc.plugin.info.lang.length == 5)
					{
						_defLang = Asc.plugin.info.lang.substr(0, 2);
					}

					languages.sort(function(a, b)
					{
						if (a.lang > b.lang)
						{
							return 1;
						}
						if (a.lang < b.lang)
						{
							return -1;
						}
						return 0;
					});

					languages.unshift( { id : "auto", lang : "Auto" } );

					var _len = languages.length;

					var _defaultDest = 0;

					var _langs = "";
					for (var i = 1; i < _len; i++)
					{
						_langs += ("<option value=\"" + languages[i].id + "\">" + languages[i].lang + "</option>");

						if (languages[i].id == _defLang)
							_defaultDest = i - 1;
					}
					
					document.getElementById("lang1_id").innerHTML = "<option value='auto'>Auto</option>" + _langs;
					document.getElementById("lang2_id").innerHTML = _langs;

					document.getElementById("lang2_id").selectedIndex = _defaultDest;

					document.getElementById("lang1_id").onchange = function(e) { translate(); };
					document.getElementById("lang2_id").onchange = function(e) { translate(); };

					translate();
				}
				catch (err)
				{
					window.Asc.plugin.executeCommand("close", "");
				}
			}
			else if (this.readyState == 4)
			{
				try
				{
					var _obj = JSON.parse(this.responseText);
					if (_obj.message)
						console.log("[translator] : " + _obj.message);
				}
				catch (err)
				{					
				}
			}
		};
		xhr.send(null);
	}

	function getTranslateArray(data)
	{
		var return_array = [];
		// split by max_size
		var max_size = 9000;
		var index = 0;
		var test_border = max_size - 500;

		var chars = [".", "%2C", "%20"];

		while (data.length > max_size)
		{
			for (var i = 0; i < chars.length; i++)
			{	
				index = data.lastIndexOf(chars[i], max_size);

				if (index > test_border)
				{
					index += chars[i].length;
					break;
				}
				else
				{
					index = max_size;
				}
			}

			return_array.push(data.substr(0, index));
			data = data.substr(index);
		}

		return_array.push(data);

		return { parts : return_array, current : 0 };
	}

	function translateIter()
	{
		if (!translate_data_send)
			return;

		if (translate_data_send.current >= translate_data_send.parts.length)
		{
			translate_data_send = null;

			var _select1 = document.getElementById("lang1_id");
			var _select2 = document.getElementById("lang2_id");

			_select1.removeAttribute("disabled");
			_select2.removeAttribute("disabled");

			document.getElementById("id_progress").style.display = "none";

			return;
		}

		var _text = translate_data_send.parts[translate_data_send.current];
		translate_data_send.current++;

		if (_text == "")
			return translateIter();

		if (translate_data_send.parts.length != 1)
		{
			document.getElementById("id_progress").style.display = "block";
			var _cur = (100 * translate_data_send.current / translate_data_send.parts.length) >> 0;
			if (_cur > 100)
				_cur = 100;
			document.getElementById("id_progress").style.width = _cur + "%";
		}

		var xhr = new XMLHttpRequest();
		var _url = "https://translate.yandex.net/api/v1.5/tr.json/translate?";
		_url += "key=trnsl.1.1.20160604T115612Z.107ebb05a7757bcc.804e900f347ddfbeadd7ca5999bd5cb6ca32805b";
		_url += "&text=";
		_url += _text;
		_url += ("&lang=" + language_current);
		_url += "&format=plain";
		xhr.open('POST', _url, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200 && !closed)
			{
				try
				{
					if (isBreakTranslate)
					{
						translate();
						return;
					}

					var _obj  = JSON.parse(this.responseText);
					var _text = _obj.text[0];

					if (null == translate_data_send)
						document.getElementById("translateresult_id").innerHTML = "";
					else if (1 == translate_data_send.current)
						document.getElementById("translateresult_id").innerHTML = _text;
					else
						document.getElementById("translateresult_id").innerHTML += _text;

					updateScroll();

					translateIter();
				}
				catch (err)
				{
				}
			}
			else if (401 == this.readyState || 404 == this.readyState || 413 == this.readyState || 422 == this.readyState || 501 == this.readyState || 403 == this.status)
			{
				if (isBreakTranslate)
				{
					translate();
					return;
				}
				translateIter();
			}
			else if (this.readyState == 4)
			{
				try
				{
					var _obj = JSON.parse(this.responseText);
					if (_obj.message)
						console.log("[translator] : " + _obj.message);
				}
				catch (err)
				{					
				}
			}
		};
		xhr.send(null);
	}

	function translate()
	{
		isBreakTranslate = false;
		if (-1 != breakTimeoutId)
		{
			clearTimeout(breakTimeoutId);
			breakTimeoutId = -1;
		}

		document.getElementById("translateresult_id").innerHTML = "";
		updateScroll();

		if (translate_data == "")
			return;

		language_current = "";

		var _select1 = document.getElementById("lang1_id");
		var _select2 = document.getElementById("lang2_id");

		_select1.setAttribute("disabled", "disabled");
		_select2.setAttribute("disabled", "disabled");

		if (!_select1.options[_select1.selectedIndex])
			return;

		if (_select1.selectedIndex != 0)
			language_current += (_select1.options[_select1.selectedIndex].value + "-");
		language_current += _select2.options[_select2.selectedIndex].value;

		translate_data_send = getTranslateArray(encodeURIComponent(translate_data));

		translateIter();
	}

	window.Asc.plugin.init = function(text)
	{
		document.getElementById("translateresult_id").innerHTML = "";
		
		text = text.replace(/;/g, "%3B");

		translate_data = text;

		if (!isInit)
		{
			var container = document.getElementById('scrollable-container-id');
					
			Ps = new PerfectScrollbar('#' + container.id, { minScrollbarLength: 20 });

			getLanguagesSupport();

			window.onresize = function()
			{
				updateScroll();
			};
		}
		else
		{
			if (null == translate_data_send)
			{
				translate();
			}
			else
			{
				isBreakTranslate = true;

				breakTimeoutId = setTimeout(function() { translate(); }, 5000);
			}
		}
		isInit = true;
		updateScroll();
	};
	
	window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};

	window.Asc.plugin.onExternalMouseUp = function()
	{
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
			false, false, false, false, 0, null);

		document.dispatchEvent(evt);
	};

})(window, undefined);
