(function(window, undefined){

    var hints = [];
	
	window.Asc.plugin.isEmpty = false;
	window.Asc.plugin.makeEmpty = function()
	{
		document.body.innerHTML = ("<div style=\"font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#848484;font-size:20px;" +
                    "background:#F4F4F4;display:table;width:100%;height:100%;text-align:center;\">" +
                    "<span style=\"display:table-cell;vertical-align: middle;\">" + window.Asc.plugin.tr("Please select text before run plugin!") + "</span></div>");
	}

    window.Asc.plugin.init = function(text)
    {
        text = text.split("\n").join("<br>");

        document.getElementById("id_text").innerHTML = text;

        if (text == "")
        {
			window.Asc.plugin.isEmpty = true;
            window.Asc.plugin.makeEmpty();
            return;
        }

        var uAgent = navigator.userAgent.toLowerCase();
        var isSailfishOS = ((uAgent.indexOf("sailfish") > -1) && (uAgent.indexOf("emulatedevicepixelratio") > -1)) ? true : false;

        glvrd.proofread(text, function(result)
        {
            if (result.status == 'ok')
            {
                document.getElementById("id_score").innerHTML =
                    "<span style='font-size: 30px;position:absolute;bottom:0;left:20px;width:100%;'>" + result.score +
                    "<span style='font-size: 12px;'> балла из 10 по шкале Главреда" + "</span></span>";

                var len = result.fragments.length;
                var output = "";
                var last = 0;
                for (var i = 0; i < len; i++)
                {
                    var fragment = result.fragments[i];
                    hints.push("<h1>" + fragment.hint.name + "</h1><br/>" + fragment.hint.description);

                    if (last != fragment.start)
                        output += text.substr(last, fragment.start - last);

                    output += ("<em id='data" + i + "'>" + text.substr(fragment.start, fragment.end - fragment.start) + "</em>");
                    last = fragment.end;
                }
                if (last != (text.length - 1))
                {
                    output += text.substr(last);
                }

                if (!isSailfishOS)
                {
                    document.getElementById("id_text").innerHTML = output;
                }
                else
                {
                    var inner = "<div style=\"margin:0;padding:0;\">" + output + "</div>";
                    var elem = document.getElementById("id_text");
                    elem.style.overflow = "hidden";
                    elem.style.boxSizing = "border-box";
                    elem.style.padding = "5px";
                    elem.innerHTML = inner;

                    setTimeout(function(){
                        new IScroll(elem, { mouseWheel: true, scrollX: true });
                    }, 100);
                }

                var _elements = document.getElementsByTagName("em");
                for (var j = 0; j < _elements.length; j++)
                {
                    _elements[j].onclick = function(e)
                    {
                        var _ems = document.getElementsByTagName("em");
                        for (var k = 0; k < _ems.length; k++)
                            _ems[k].className = "";

                        this.className = "active current";
                        var hintIndex = parseInt(this.getAttribute("id").substr("4"));

                        if (!isSailfishOS)
                        {
                            document.getElementById("id_hint").innerHTML = hints[hintIndex];
                        }
                        else
                        {
                            var inner = "<div style=\"margin:0;padding:0;word-break:break-all;\">" + hints[hintIndex] + "</div>";
                            var elem = document.getElementById("id_hint");
                            elem.style.overflow = "hidden";
                            elem.style.boxSizing = "border-box";
                            elem.style.padding = "5px";
                            elem.innerHTML = inner;
                            
                            setTimeout(function(){
                                new IScroll(elem, { mouseWheel: true, scrollX: true });
                            }, 100);
                        }                        
                    };
                }
            }
            else
            {
                document.getElementById("id_score").innerHTML = "ERROR";
            }
        });
    };

    window.Asc.plugin.button = function(id)
    {
        this.executeCommand("close", "");
    };
	
	window.Asc.plugin.onTranslate = function(){
		if (window.Asc.plugin.isEmpty)
			window.Asc.plugin.makeEmpty();
	};

})(window, undefined);
