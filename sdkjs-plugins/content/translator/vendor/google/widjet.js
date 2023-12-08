
if (!Ps) Ps = new PerfectScrollbar('#' + "div_parent", {});
var timeOut;
var select;
var translated = 'Select Language';

function googleTranslateElementInit() {
	document.getElementById("google_translate_element").style.maxHeight = document.getElementById("body").clientHeight- 120 +"px";
	// const urlParams = new URLSearchParams(window.location.search);
	// console.log(urlParams);
	// document.getElementById("google_translate_element").innerHTML = decodeURIComponent(urlParams.get("text"));
	window.googleTranslator = new google.translate.TranslateElement({
		//pageLanguage: 'en',
		layout: google.translate.TranslateElement.InlineLayout.VERTICAL,
		disableAutoTranslation : false,
	}, 'google_translate_state');
};

window.onload = function () {
	var textShower = document.getElementById('google_translate_element');
	select = document.getElementsByClassName("goog-te-combo")[0];
	if (!select)
		return;

	select.classList.add("hidden");
	textShower.addEventListener('copy', function(event) {
		const selection = document.getSelection();
		event.clipboardData.setData('text/html', selection.toString());
		event.clipboardData.setData('text/plain', selection.toString());
		event.preventDefault();
	});
	setTimeout(function() {
		document.getElementById("btn_copy").onclick = function () {
			selectText("google_translate_element");
		};

		$("#select_lang").select2({
			// dataAdapter: customAdapter,
			data : createLangForSelect(),
			width: "calc(100% - 0.001px)"
		}).on('select2:select', function (e) {
			searchLang(e.params.data.value)
		});
		$("#select_lang").val(select.selectedIndex).trigger('change');
		document.getElementById("goog-gt-tt").classList.add("hidden");
	}, 400);
	if (navigator.userAgent.indexOf("Chrome") !== -1) {
		document.getElementById(":0.targetLanguage").firstChild.style = "height:21px;"
	}

	function createLangForSelect() {
		var languages = [{
				id: 0,
				value: '',
				text: translated
		}];
		for (var i = 1; i < select.length; i++) {
			languages.push({
				id : i,
				value : select.options[i].value,
				text : select.options[i].text
			});
		}
		return languages;
	};

	function searchLang(val) {
		var ind = -1;
		for(var i = 0; i < select.options.length; i++) {
			if (select.options[i].value === val) {
				ind = i;
				break;
			}
		}
		if (ind < 0) return;
		select.options[ind].selected = true;
		if ("createEvent" in document) {
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", false, true);
			select.dispatchEvent(evt);
		}
		else {
			select.fireEvent("onchange");
		}
	};

	function selectText(id) {
		var sel, range;
		var el = document.getElementById(id); //get element id
		if (window.getSelection && document.createRange) { //Browser compatibility
		sel = window.getSelection();
		if (sel.toString() == '') { //no text selection
			window.setTimeout(function(){
				range = document.createRange(); //range object
				range.selectNodeContents(el); //sets Range
				sel.removeAllRanges(); //remove all ranges from selection
				sel.addRange(range);//add Range to a Selection.
				document.execCommand("copy"); //copy
				sel.removeAllRanges(); //remove all ranges from selection
			},1);
		}
		} else if (document.selection) { //older ie
			sel = document.selection.createRange();
			if (sel.text == '') { //no text selection
				range = document.body.createTextRange();//Creates TextRange object
				range.moveToElementText(el);//sets Range
				range.select(); //make selection.
				document.execCommand("copy"); //copy
			}
		}
	}
};

window.addEventListener('message', function (msg) {
	if (msg.data.type == 'themeChanged')
	{
		//event for change theme
		if (msg.data.theme) {
			var rule = "\n.select2-container--default.select2-container--open .select2-selection__arrow b { border-color : " + msg.data.theme["text-normal"] + " !important; }\n";
			rule += "#hr {background-color: " + msg.data.theme["text-normal"] + " !important; }\n";
			var styleTheme = document.createElement('style');
			styleTheme.type = 'text/css';
			styleTheme.innerHTML = msg.data.style + rule;
			document.getElementsByTagName('head')[0].appendChild(styleTheme);
			document.getElementById("google_translate_element").style.color = msg.data.theme["text-normal"];
			if (document.getElementsByClassName("goog-te-gadget")[0])
				document.getElementsByClassName("goog-te-gadget")[0].style.color = msg.data.theme["text-normal"];
		}
	}
	else if (msg.data === "update_scroll")
	{
		setTimeout(()=> Ps.update(), 600);
	}
	else if (msg.data.type == 'translate') {
		translated = msg.data.text;
	}
	else
	{
		if (msg.data !== "onchange_goog-te-combo") {
			document.getElementById("google_translate_element").innerHTML = escape(msg.data);
		}
		timeOut = setTimeout(function() {
			document.getElementById("google_translate_element").style.opacity = 1;
			Ps.update();
			if (msg.data.length)
				document.getElementById("div_btn").classList.remove("hidden");
			else
				document.getElementById("div_btn").classList.add("hidden");
		}, 600);
	}
});
