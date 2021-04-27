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
			ifr.src            = "https://web.openrainbow.com/";//?text=" + encodeURIComponent(text);
			ifr.style.top      = "0px";
			ifr.style.left     = "0px";
			ifr.style.width    = "100%";
			ifr.style.height   = "100%";
			ifr.setAttribute("frameBorder", "0");
			ifr.setAttribute("allow", "camera https://web.openrainbow.com; microphone https://web.openrainbow.com");
			document.getElementById("iframe_parent").appendChild(ifr);
			isInit = true;
			ifr.onload = function() {
			    // checking what iframe is downloaded clearly
			    if ($('body[ng-controller="MainController"]'))
			        console.log('Downloaded...')
			    else {
			        $('#google_id').remove();
			        $('<span>', {
                        "class": "error",
                        text: "Refused to frame 'https://web.openrainbow.com/' because an ancestor violates the Content Security Policy directive."
                    }).appendTo('#iframe_parent');
			        $('#iframe_parent').css('text-align', 'center');
			    }
			}
			ifr.onerror = function() {
			     $('#google_id').remove();
			        $('<span>', {
                        "class": "error",
                        text: "Refused to frame 'https://web.openrainbow.com/' because an ancestor violates the Content Security Policy directive."
                    }).appendTo('#iframe_parent');
                $('#iframe_parent').css('text-align', 'center');
			}

		} else {
			console.log('Error while loading...')
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
