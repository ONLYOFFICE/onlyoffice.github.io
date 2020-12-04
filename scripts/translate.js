(function(window, undefined){
	var isInit = false;
	var ifr;
	
	window.Asc.plugin.init = function(text)
	{
		if (!isInit) {
			document.getElementById("iframe_parent").innerHTML = "";
			ifr                = document.createElement("iframe");
			ifr.position	   = "fixed";
			ifr.name           = "google_name";
			ifr.id             = "google_id";
			ifr.src            = "./index_widget.html";//?text=" + encodeURIComponent(text);
			ifr.style.top      = "0px";
			ifr.style.left     = "0px";
			ifr.style.width    = "100%";
			ifr.style.height   = "100%";
			ifr.setAttribute("frameBorder", "0");		
			document.getElementById("iframe_parent").appendChild(ifr);
			isInit = true;
			ifr.onload = function() {
				if (ifr.contentWindow.document.readyState == 'complete')
					setTimeout(function() {ifr.contentDocument.getElementById("google_translate_element").innerHTML = text;}, 500);
				
				var selectElement = ifr.contentDocument.getElementsByClassName('goog-te-combo')[0];
				selectElement.addEventListener('change', function(event) {
					ifr.contentWindow.postMessage("onchange_goog-te-combo", '*');
					ifr.contentDocument.getElementById("google_translate_element").style.opacity = 0;
				});
			}
		} else {
			ifr.contentWindow.postMessage(text, '*');
			ifr.contentDocument.getElementById("google_translate_element").style.opacity = 0;
		}
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
