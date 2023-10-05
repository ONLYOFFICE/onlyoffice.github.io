window.initCounter = 0;
function on_init_server(type)
{
    if (type === (window.initCounter & type))
        return;
    window.initCounter |= type;
    if (window.initCounter === 3)
    {
        load_library("onlyoffice", "./libs/" + Asc.plugin.info.editorType + "/api.js");
    }
}

function load_library(name, url) 
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() 
    {
        if (xhr.readyState == 4)
        {
            var EditSession = ace.require("ace/edit_session").EditSession;
            var editDoc = new EditSession(xhr.responseText, "ace/mode/javascript");
            editor.ternServer.addDoc(name, editDoc);
        }
    };
    xhr.send();
}

document.addEventListener("DOMContentLoaded", function() {
    var styleTheme = document.createElement('style');
    styleTheme.type = 'text/css';

    window.lockTooltipsPosition = true;
    var editor_elem = document.getElementById("editorWrapper");
    var rules = ".Ace-Tern-tooltip {\
box-sizing: border-box;\
max-width: " + editor_elem.offsetWidth + "px !important;\
min-width: " + editor_elem.offsetWidth + "px !important;\
left: " + editor_elem.offsetLeft + "px !important;\
bottom: " + parseInt(document.getElementsByClassName("divFooter")[0].offsetHeight) + "px !important;\
}";

    styleTheme.innerHTML = rules;
    document.getElementsByTagName('head')[0].appendChild(styleTheme);
});

var editor = ace.edit("editor");      
editor.session.setMode("ace/mode/javascript");
editor.setValue("");


editor.getSession().setUseWrapMode(true);
editor.getSession().setWrapLimitRange(null, null);
editor.setShowPrintMargin(false);
editor.$blockScrolling = Infinity;

ace.config.loadModule('ace/ext/tern', function () {
    editor.setOptions({
        enableTern: {
            defs: ['browser', 'ecma5'],
            plugins: { doc_comment: { fullDocs: true } },
            useWorker: !!window.Worker,            
            switchToDoc: function (name, start) {},            
            startedCb: function () {
                on_init_server(1);
            },
        }, 
        enableSnippets: false,
        enableBasicAutocompletion: true,
    });
});

ace.config.loadModule('ace/ext/html_beautify', function (beautify) {
    editor.setOptions({
        autoBeautify: true,
        htmlBeautify: true,
    });
    window.beautifyOptions = beautify.options;
});

(function(window, undefined){

    var Content = {

        macrosArray : [],
        
        current : -1
    };

    editor.getSession().on('change', function() {
        
        if (Content.current == -1 || window.isDisable)
            return;

        Content.macrosArray[Content.current].value = editor.getValue();        

    });

    function create_guid(a,b)
    {
       for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'');
       return b
    };

    function updateMenu()
    {
        if (Content.current < 0)
            Content.current = 0;
        if (Content.current >= Content.macrosArray.length)
            Content.current = Content.macrosArray.length - 1;
            
        var menuContent = "";
        for (var i = 0; i < Content.macrosArray.length; i++)
        {
            var cl = (i == Content.current) ? "macrosSelected" : "macros";
            var item = "<div class=\"" + cl + "\" id=\"item" + i + "\" onclick=\"window.onItemClick(" + i + ");\">" + Content.macrosArray[i].name;
            if (true === Content.macrosArray[i].autostart) {
                var PropForMac = "";
                if (navigator.userAgent.indexOf('Macintosh') != -1) {
                    PropForMac = "style = \"top : calc(50% - 6px)\"";
                }
                item += ("<div class=\"macrosAutostart\"" +PropForMac+ ">(A)</div>");
            }
            item += "</div>";
            menuContent += item;

            if (!Content.macrosArray[i]["guid"])
                Content.macrosArray[i]["guid"] = create_guid();
        }
        
        var elem = document.getElementById("menu_content");
        elem.innerHTML = menuContent;
        
        onItemClick(Content.current, true);
        updateScrollMenu();
    }

    function onItemClick(index, isAttack)
    {
        if (index != Content.current || isAttack)
        {
            for (var i = 0; i < Content.macrosArray.length; i++)
            {
                var elem = document.getElementById("item" + i);
                if (i == index)
                {
                    elem.classList.remove("macros");
                    elem.classList.add("macrosSelected");
                }
                else if (i == Content.current)
                {
                    elem.classList.remove("macrosSelected");
                    elem.classList.add("macros");
                }
            }
            Content.current = index;
        }
        
        var buttonAutoStart = document.getElementById("button_autostart");
        if (-1 == Content.current)
        {
            window.isDisable = true;
            editor.setValue('');
            editor.setReadOnly(true);
            window.isDisable = false;
            buttonAutoStart.style.display = "none";
        }
        else
        {
            window.isDisable = true;
            editor.setValue(Content.macrosArray[index].value);
            editor.setReadOnly(false);
            window.isDisable = false;
            buttonAutoStart.style.display = "inline-block";
            editor.focus();
            if (Content.macrosArray[Content.current].autostart)
                buttonAutoStart.classList.add("primary");
            else
                buttonAutoStart.classList.remove("primary");
        }
            
        editor.selection.clearSelection();
    }
    window.onItemClick = onItemClick;

    document.getElementById("button_new").onclick = function() {
        var indexMax = 0;
        var macrosTranslate = window.Asc.plugin.tr("Macros");
        for (var i = 0; i < Content.macrosArray.length; i++)
        {
            if (0 == Content.macrosArray[i].name.indexOf("Macros"))
            {
                var index = parseInt(Content.macrosArray[i].name.substr(6));
                if (!isNaN(index) && (indexMax < index))
                    indexMax = index;
            }
            else if (0 == Content.macrosArray[i].name.indexOf(macrosTranslate))
            {
                var index = parseInt(Content.macrosArray[i].name.substr(macrosTranslate.length));
                if (!isNaN(index) && (indexMax < index))
                    indexMax = index;
            }
        }
        indexMax++;
        Content.macrosArray.push({ name : (macrosTranslate + " " + indexMax), value : "(function()\n{\n})();" });
        Content.current = Content.macrosArray.length - 1;
        updateMenu();
        editor.focus();
    };
    document.getElementById("button_delete").onclick = function() {
        if (Content.current != -1)
        {
            Content.macrosArray.splice(Content.current, 1);
            updateMenu();
        }
    };
    document.getElementById("button_rename").onclick = function() {
        showRename();
    };
    document.getElementById("button_autostart").onclick = function() {
        Content.macrosArray[Content.current].autostart = Content.macrosArray[Content.current].autostart ? false : true;
        onItemClick(Content.current);
        updateMenu();
    };
    document.getElementById("button_run").onclick = function() {
        if (Content.current != -1)
        {
            window.Asc.plugin.info.recalculate = true;
            window.Asc.plugin.executeCommand("command", Content.macrosArray[Content.current].value);
        }
    };

    document.getElementById("rename_ok").onclick = function() {
        unShowRename(true);
    };
    document.getElementById("rename_cancel").onclick = function() {
        unShowRename(false);
    };

	document.addEventListener("keydown", function(event)
	{
		if ( (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's')
		{
			event.preventDefault();
			event.stopPropagation();
			if (!isShowRename)
			{
				window.Asc.plugin.executeMethod("SetMacros", [JSON.stringify(Content)], function() {
					// console.log('saved');
				});
			}
		}
	}, false);

	document.addEventListener("keyup", function(event)
	{
		if ( (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's')
		{
			event.preventDefault();
			event.stopPropagation();
		}
	}, false);

	Ps = new PerfectScrollbar("#menu", {});
    updateScrollMenu();

    function updateScrollMenu()
    {
        Ps.update();
    }

    var isShowRename = false;
    function showRename()
    {
        if (Content.current < 0)
            return;

        var _elem1 = document.getElementById("idRenameMask");
        var _elem2 = document.getElementById("idRename");
        _elem1.style.display = "block";
        _elem2.style.display = "block";
        document.getElementById("rename_text").value = Content.macrosArray[Content.current].name;
        document.getElementById("rename_text").select();

        isShowRename = true;
    }

    function unShowRename(isOK)
    {
        var value = document.getElementById("rename_text").value;

        if ((isOK && value) || !isOK) {
            var _elem1 = document.getElementById("idRenameMask");
            var _elem2 = document.getElementById("idRename");
            _elem1.style.display = "none";
            _elem2.style.display = "none";
            document.getElementById("input_error_id").style.display = "none";
            document.getElementById("rename_text").style.borderColor = "#cfcfcf";
            isShowRename = false;
        }
        

        if (Content.current < 0)
            return;

        if (isOK && value)
        {

            value = value.replace(/&/g,'&amp;');
            value = value.replace(/</g,'&lt;');
            value = value.replace(/>/g,'&gt;');
            value = value.replace(/'/g,'&apos;');
            value = value.replace(/"/g,'&quot;');

            Content.macrosArray[Content.current].name = value;
            updateMenu();
        } else if (isOK && !value) {
            document.getElementById("input_error_id").style.display = "block";
            document.getElementById("rename_text").style.borderColor = "#d9534f";
        }

        value.value = "";
    }

    window.onresize = function()
    {
        updateScrollMenu();
    }

    window.onkeydown = function(e)
    {
        if (isShowRename)
        {
            switch (e.keyCode)
            {
                case 27:
                {
                    unShowRename(false);
                    break;
                }
                case 13:
                {
                    unShowRename(true);
                    break;
                }
                default:
                    break;
            }
        }
    }

    window.Asc.plugin.init = function(text)
	{
        on_init_server(2);
        this.executeMethod("GetMacros", [JSON.stringify(Content)], function(data) {
            
            try
            {
                Content = JSON.parse(data);

                for (var i = 0; i < Content.macrosArray.length; i++)
                {
                    var value = Content.macrosArray[i].name;
                    if (undefined === value)
                        value = "";

                    value = value.replace(/&/g,'&amp;');
                    value = value.replace(/</g,'&lt;');
                    value = value.replace(/>/g,'&gt;');
                    value = value.replace(/'/g,'&apos;');
                    value = value.replace(/"/g,'&quot;');

                    Content.macrosArray[i].name = value;
                }
            }
            catch (err)
            {
                Content = {
                    macrosArray : [],
                    current : -1
                };
            }

            window.Asc.plugin.executeMethod("GetVBAMacros", null, function(data) {
                if (data && typeof data === 'string' && data.includes('<Module')) {
                    var arr = data.split('<Module ').filter(function(el){return el.includes('Type="Procedural"')});
                    arr.forEach(function(el) {
                        var start = el.indexOf('<SourceCode>') + 12;
                        var end = el.indexOf('</SourceCode>', start);
                        var macros = el.slice(start, end);
	
                        start = el.indexOf('Name="') + 6;
                        end = el.indexOf('"', start);
                        var name = el.slice(start, end);
                        var index = Content.macrosArray.findIndex(function(macr){return macr.name == name});
                        if (index == -1) {
                            macros = macros.replace(/&amp;/g,'&');
                            macros = macros.replace(/&lt;/g,'<');
                            macros = macros.replace(/&gt;/g,'>');
                            macros = macros.replace(/&apos;/g,'\'');
                            macros = macros.replace(/&quot;/g,'"');
                            macros = macros.replace(/Attribute [\w \.="\\]*/g,'');
                            Content.macrosArray.push(
                                {
                                    name: name,
                                    value: '(function()\n{\n\t/* Enter your code here. */\n})();\n\n/*\nExecution of VBA commands does not support.\n' + macros + '*/',
                                    guid: create_guid()
                                }
                            );
                        }
                    });
                }
                updateMenu();
                window.CustomContextMenu.init();
                if (Content.current === -1)
                {
                    document.getElementById("button_new").onclick();
                }
            });
        });

        var _textbox = document.getElementById("rename_text");
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
	};
	
	window.Asc.plugin.button = function(id)
	{   
        if (id == 0)
        {
            this.executeMethod("SetMacros", [JSON.stringify(Content)], function(){
                window.Asc.plugin.executeCommand("close", "");    
            });
        }
        else
        {
            this.executeCommand("close", "");
        }
    };
    
    window.Asc.plugin.onExternalMouseUp = function()
    {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
            false, false, false, false, 0, null);

        document.dispatchEvent(evt);
    };
	
	window.Asc.plugin.onTranslate = function()
	{
		document.getElementById("button_new").innerHTML = window.Asc.plugin.tr("New");
		document.getElementById("button_delete").innerHTML = window.Asc.plugin.tr("Delete");
        document.getElementById("button_rename").innerHTML = window.Asc.plugin.tr("Rename");
        document.getElementById("button_autostart").innerHTML = window.Asc.plugin.tr("Autostart");
        document.getElementById("button_run").innerHTML = window.Asc.plugin.tr("Run");
        document.getElementById("rename_ok").innerHTML = window.Asc.plugin.tr("Ok");
        document.getElementById("rename_cancel").innerHTML = window.Asc.plugin.tr("Cancel");
        document.getElementById("input_error_id").title = window.Asc.plugin.tr("Title");
    };
    
    // context menu
    window.CustomContextMenu = {
        element: null,
        visible: false,
        macrosIndex: 0,
        position: function(x, y) {
            if (!this.element)
                return;
            this.element.style.left = x + "px";
            this.element.style.top = y + "px";
            this.visible = true;
            this.element.style.display = "block";
        },
        hide: function(){
            this.visible = false;
            this.element.style.display = "none";
        },
        init: function(){
            if (this.element)
                return;
            this.element = document.getElementById("context-menu-id");
            window.addEventListener("click", function(e) {
                window.CustomContextMenu.visible && window.CustomContextMenu.hide();
            });
            window.addEventListener("contextmenu", function(e) {
                var className = e.srcElement.getAttribute("class");
                if (className && -1 != className.indexOf("macros"))
                {
                    e.preventDefault();
                    window.CustomContextMenu.macrosIndex = parseInt(e.srcElement.id.substr(4));
                    document.getElementById("menu_autostart_id").innerHTML = window.Asc.plugin.tr(
                        Content.macrosArray[window.CustomContextMenu.macrosIndex].autostart ? "Unmake autostart" : "Make autostart");
                    window.CustomContextMenu.position(e.pageX, e.pageY);
                    return;
                }
                if (e.srcElement.id && (0 == e.srcElement.id.indexOf("menu_") || 0 == e.srcElement.id.indexOf("button")))
                {
                    e.preventDefault();
                }
                if (window.CustomContextMenu.visible)
                    window.CustomContextMenu.hide();
            });
        },
        onAutostartClick: function()
        {
            if (!Content.macrosArray[window.CustomContextMenu.macrosIndex])
                return;
            
            Content.macrosArray[window.CustomContextMenu.macrosIndex].autostart = 
                Content.macrosArray[window.CustomContextMenu.macrosIndex].autostart ? false : true;

            updateMenu();
        }
    };

    window.Asc.plugin.onThemeChanged = function(theme)
    {
        window.Asc.plugin.onThemeChangedBase(theme);
        $('#menu_content, .ace_content').css('background', window.Asc.plugin.theme["background-normal"]);
        $('#menu_content, .ace_content').css('color', window.Asc.plugin.theme["text-normal"]);
        $('.ace_layer.ace_gutter-layer.ace_folding-enabled').css('background', window.Asc.plugin.theme["background-toolbar"]);
        $('.ace_layer.ace_gutter-layer.ace_folding-enabled').css('color', window.Asc.plugin.theme["text-normal"]);
        $('#menu, .divFooter').css('border-color', window.Asc.plugin.theme["border-divider"]);
        $('.ace_scroller').css('border-left', 'solid 0.73px ' + window.Asc.plugin.theme["border-divider"]);
        $('.ace_cursor').css('color', window.Asc.plugin.theme["text-normal"]);
        $('#menu').css('background-color', window.Asc.plugin.theme["background-normal"]);
        $('#idRename').css('background-color', window.Asc.plugin.theme["background-toolbar"]);
        $('#idRename').css('border-color', window.Asc.plugin.theme["border-toolbar-button-hover"]);

        var rules = '.macros { color: ' + window.Asc.plugin.theme["text-normal"] + '; background-color: ' + window.Asc.plugin.theme['background-toolbar'] + '}\n';
        rules += '.macros:hover { background-color: ' + window.Asc.plugin.theme['highlight-button-hover'] + '}\n';
        rules += '.macrosSelected { background-color: ' + window.Asc.plugin.theme['highlight-button-pressed'] + '}\n';
        if (theme.type === 'dark')
            rules += '.ace-chrome .ace_marker-layer .ace_selected-word { background: rgb(250, 250, 255, 0.3) !important; border: 1px solid rgb(200, 200, 250); }'
        else
            rules += '.ace-chrome .ace_marker-layer .ace_selected-word { background: rgb(255, 255, 255); border: 1px solid rgb(200, 200, 250); }'
        var styleTheme = document.createElement('style');
        styleTheme.type = 'text/css';
        styleTheme.innerHTML = rules;
        document.getElementsByTagName('head')[0].appendChild(styleTheme);


        if (theme.type === 'dark')
            editor.setTheme("ace/theme/vs-dark")
        else
            editor.setTheme("ace/theme/vs-light")

    };

})(window, undefined);