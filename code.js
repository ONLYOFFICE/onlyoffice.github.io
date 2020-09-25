var langTools = ace.require("ace/ext/language_tools");
var editor = ace.edit("editor");    
editor.session.setMode("ace/mode/javascript");
// enable autocompletion and snippets
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: false
});
editor.setShowPrintMargin(false);
editor.setValue('');

// Create tern server
var TernServer = ace.require("ace/tern/server").TernServer;
var defs = [ternEcma5Def];
var ternServer = new TernServer({defs: defs});
    
// Tern Completion
langTools.addCompleter(ternServer);

// Tern Tooltip
var TernTooltip = ace.require("ace/tern/tern_tooltip").TernTooltip;
editor.ternTooltip = new TernTooltip(editor, ternServer);

(function(window, undefined){

    /*
    setTimeout(function(){

        var _elements = document.getElementsByClassName("ace_scrollbar");
        
        for (var i = 0; i < _elements.length; i++)
        {
            _elements[i].style.overflow = "hidden";
            Ps.initialize(_elements[i], {
                theme : 'custom-theme'
            });
        }
        
    }, 100);

    function updateScroll()
    {
        var _elements = document.getElementsByClassName("ace_scrollbar");
        
        for (var i = 0; i < _elements.length; i++)
        {
            _elements[i].style.overflow = "hidden";
            Ps.update(_elements[i]);
        }
    }
    */
    var Content = {

        macrosArray : [],
        
        current : -1
    };

    editor.getSession().on('change', function() {
        
        if (Content.current == -1 || window.isDisable)
            return;

        Content.macrosArray[Content.current].value = editor.getValue();        

    });

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
            
            updateMenu();
            window.CustomContextMenu.init();
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

})(window, undefined);