(function(window, undefined)
{
    // register contextmenu buttons
    let buttonMain = new Asc.ButtonContextMenu();
    buttonMain.text = "AI";
    buttonMain.addCheckers("All");
    
    if (true)
    {
        let button1 = new Asc.ButtonContextMenu(buttonMain);
        button1.text = "Explain text in comment";
        button1.addCheckers("Target");
        button1.attachOnClick(function(data){
            console.log(data);
        });
    }

    if (true)
    {
        let button1 = new Asc.ButtonContextMenu(buttonMain);
        button1.text = "Fix spelling & grammar";
        button1.editors = ["word"];
        button1.addCheckers("Selection");
        button1.attachOnClick(function(data){
            console.log(data);
        });

        let button2 = new Asc.ButtonContextMenu(buttonMain);
        button2.text = "Rewrite differently";
        button2.editors = ["word"];
        button2.addCheckers("Selection");
        button2.attachOnClick(function(data){
            console.log(data);
        });

        let button3 = new Asc.ButtonContextMenu(buttonMain);
        button3.text = "Make longer";
        button3.editors = ["word"];
        button3.addCheckers("Selection");
        button3.attachOnClick(function(data){
            console.log(data);
        });

        let button4 = new Asc.ButtonContextMenu(buttonMain);
        button4.text = "Make shorter";
        button4.editors = ["word"];
        button4.addCheckers("Selection");
        button4.attachOnClick(function(data){
            console.log(data);
        });
    }

    if (true)
    {
        let button1 = new Asc.ButtonContextMenu(buttonMain);
        button1.text = "Text analysis";
        button1.editors = ["word"];
        button1.addCheckers("Selection");

        let button2 = new Asc.ButtonContextMenu(button1);
        button2.text = "Summarize";
        button2.editors = ["word"];
        button2.addCheckers("Selection");
        button2.attachOnClick(function(data){
            console.log(data);
        });

        let button3 = new Asc.ButtonContextMenu(button1);
        button3.text = "Keywords";
        button3.editors = ["word"];
        button3.addCheckers("Selection");
        button3.attachOnClick(function(data){
            console.log(data);
        });
    }

    if (true)
    {
        let button1 = new Asc.ButtonContextMenu(buttonMain);
        button1.text = "Word analysis";
        button1.editors = ["word"];
        button1.separator = true,
        button1.addCheckers("Selection");

        let button2 = new Asc.ButtonContextMenu(button1);
        button2.text = "Explain text in comment";
        button2.editors = ["word"];
        button2.addCheckers("Selection");
        button2.attachOnClick(function(data){
            console.log(data);
        });

        let button3 = new Asc.ButtonContextMenu(button1);
        button3.text = "Explain text in hyperlink";
        button3.editors = ["word"];
        button3.addCheckers("Selection");
        button3.attachOnClick(function(data){
            console.log(data);
        });
    }

    if (true)
    {
        let button1 = new Asc.ButtonContextMenu(buttonMain);
        button1.text = "Translate";
        button1.editors = ["word"];
        button1.addCheckers("Selection");

        let button2 = new Asc.ButtonContextMenu(button1);
        button2.text = "Transate to English";
        button2.editors = ["word"];
        button2.addCheckers("Selection");
        button2.data = "English";
        button2.attachOnClick(function(data){
            console.log(data);
        });

        let button3 = button2.copy();
        button3.text = "Translate to French";
        button3.data = "French";

        let button4 = button2.copy();
        button4.text = "Translate to German";
        button4.data = "German";

        let button5 = button2.copy();
        button5.text = "Translate to Chinese";
        button5.data = "Chinese";

        let button6 = button2.copy();
        button6.text = "Translate to Japanese";
        button6.data = "Japanese";

        let button7 = button2.copy();
        button7.text = "Translate to Russian";
        button7.data = "Russian";

        let button8 = button2.copy();
        button8.text = "Translate to Korean";
        button8.data = "Korean";

        let button9 = button2.copy();
        button9.text = "Translate to Spanish";
        button9.data = "Spanish";

        let button10 = button2.copy();
        button10.text = "Translate to Italian";
        button10.data = "Italian";
    }

    if (true)
    {
        let button1 = new Asc.ButtonContextMenu(buttonMain);
        button1.text = "Generate image from text";
        button1.editors = ["word"];
        button1.addCheckers("Selection");

        let button2 = new Asc.ButtonContextMenu(button1);
        button2.text = "256x256";
        button2.editors = ["word"];
        button2.addCheckers("Selection");
        button2.data = "256";
        button2.attachOnClick(function(data){
            console.log(data);
        });

        let button3 = button2.copy();
        button3.text = "512x512";
        button3.data = "512";

        let button4 = button2.copy();
        button4.text = "1024x1024";
        button4.data = "1024";        
    }

    if (true)
    {
        let button1 = new Asc.ButtonContextMenu(buttonMain);
        button1.text = "Generate image variation";
        button1.addCheckers("Shape", "Image");
        button1.attachOnClick(function(data){
            console.log(data);
        });
    }

    if (true)
    {
        let button1 = new Asc.ButtonContextMenu(buttonMain);
        button1.text = "Show hyperlink content";
        button1.addCheckers("Hyperlink");
        button1.attachOnClick(function(data){
            console.log(data);
        });
    }

    if (true)
    {
        let button1 = new Asc.ButtonContextMenu(buttonMain);
        button1.text = "Chat";
        button1.separator = true;
        button1.addCheckers("All");
        button1.attachOnClick(function(data){
            console.log(data);
        });

        let button2 = new Asc.ButtonContextMenu(buttonMain);
        button2.text = "Custom request";
        button2.addCheckers("All");
        button2.attachOnClick(function(data){
            console.log(data);
        });
    }

    if (true)
    {
        let button1 = new Asc.ButtonContextMenu(buttonMain);
        button1.text = "Settings";
        button1.separator = true;
        button1.addCheckers("All");
        button1.attachOnClick(function(data){
            console.log(data);
        });
    }

    // register toolbar buttons
    let buttonMainToolbar = new Asc.ButtonToolbar();
    buttonMainToolbar.text = "AI";

    function getToolBarButtonIcons(icon) {
        return "resources/icons/%theme-type%(light|dark)/big/" + icon + "%scale%(default).png";
    }

    if (true)
    {
        let button1 = new Asc.ButtonToolbar(buttonMainToolbar);
        button1.text = "Settings";
        button1.icons = getToolBarButtonIcons("settings");
        button1.attachOnClick(function(data){
            onOpenSettingsModal();
        });
    }

    if (true)
    {
        let button1 = new Asc.ButtonToolbar(buttonMainToolbar);
        button1.separator = true;
        button1.text = "Ask AI";
        button1.icons = getToolBarButtonIcons("ask-ai");
        button1.attachOnClick(function(data){
            console.log(data);
        });

        let button2 = new Asc.ButtonToolbar(buttonMainToolbar);
        button2.text = "Summarization";
        button2.icons = getToolBarButtonIcons("summarization");
        button2.attachOnClick(function(data){
            console.log(data);
        });

        let button3 = new Asc.ButtonToolbar(buttonMainToolbar);
        button3.text = "Text to image";
        button3.icons = getToolBarButtonIcons("text-to-image");
        button3.attachOnClick(function(data){
            console.log(data);
        });

        let button4 = new Asc.ButtonToolbar(buttonMainToolbar);
        button4.text = "Translation";
        button4.icons = getToolBarButtonIcons("translation");
        button4.attachOnClick(function(data){
            console.log(data);
        });
    }

    // register actions
    window.AI = window.AI || {};
    var AI = window.AI;

    AI.ActionType = {
        Chat             : "Chat",
        Summarization    : "Summarization",
        Text2Image       : "Text2Image",
        Transtation      : "Transtation"
    };

    AI.Actions = {};

    AI.Actions[AI.ActionType.Chat]           = { name : "Ask AI",        icon : "ask-ai",        model : "ChatGPT [gpt-3.5-turbo]" };
    AI.Actions[AI.ActionType.Summarization]  = { name : "Summarization", icon : "summarization", model : "" };
    AI.Actions[AI.ActionType.Text2Image]     = { name : "Text to image", icon : "text-to-image", model : "" };
    AI.Actions[AI.ActionType.Transtation]    = { name : "Translation",   icon : "translation",   model : "" };

    AI.ActionsGetKeys = function()
    {
        return [
            AI.ActionType.Chat,
            AI.ActionType.Summarization,
            AI.ActionType.Text2Image,
            AI.ActionType.Transtation
        ];
    };

    AI.ActionsGetSorted = function()
    {
        let keys = AI.ActionsGetKeys();
        let count = keys.length;
        let actions = new Array(count);
        for (let i = 0; i < count; i++)
        {
            let src = AI.Actions[keys[i]];
            actions[i] = {
                id : keys[i],
                name : src.name,
                icon : src.icon,
                model : src.model
            }
        }
        return actions;
    };

    var actions_key = "onlyoffice_ai_actions_key";
    AI.ActionsSave = function()
    {
        try
        {
            window.localStorage.setItem(actions_key, JSON.stringify(AI.Actions));
            return true;
        }
        catch (e)
        {
        }
        return false;
    };

    AI.ActionsLoad = function()
    {
        try
        {
            let obj = JSON.parse(window.localStorage.getItem(actions_key));
            for (let i in obj)
            {
                if (AI.Actions[i] && obj[i].model)
                    AI.Actions[i].model = obj[i].model;
            }
            return true;
        }
        catch (e)
        {
        }
        return false;
    };

    AI.ActionsChange = function(id, model)
    {
        if (AI.Actions[id])
        {
            AI.Actions[id].model = model;
            AI.ActionsSave();
        }
    };

    AI.ActionsLoad();
   
})(window);
