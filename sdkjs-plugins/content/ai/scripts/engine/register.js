(function(window, undefined)
{
    // register contextmenu buttons
    let buttonMain = new Asc.ButtonContextMenu();
    buttonMain.text = "AI";
    buttonMain.addCheckers("All");

    function chatWindowShow()
    {
        let variation = {
            url : "chat.html",
            description : window.Asc.plugin.tr("AI"),
            isVisual : true,
            buttons : [],
            isModal : false,
            EditorsSupport : ["word", "cell", "slide"],
            size : [ 400, 400 ]
        };

        var chatWindow = new window.Asc.PluginWindow();
        chatWindow.attachEvent("onChatMessage", async function(message) {
            let result = await AI.getActionEngine(AI.ActionType.Chat).chatRequest(message);
            if (!result) return;
            result = result.replace(/\n\n/g, '\n');
            chatWindow.command("onChatReply", result);
        });
        chatWindow.show(variation);
    }
    
    if (true)
    {
        let button1 = new Asc.ButtonContextMenu(buttonMain);
        button1.text = "Explain text in comment";
        button1.addCheckers("Target");
        button1.attachOnClick(async function(){
            let content = await Asc.Library.GetCurrentWord();
            let result = await AI.getActionEngine(AI.ActionType.TextAnalyze).chatRequest(`What does it mean "${content}"?`);
            if (!result) return;
            result = result.replace(/\n\n/g, '\n');
            await Asc.Library.InsertAsComment(result);
        });
    }

    if (true)
    {
        let button1 = new Asc.ButtonContextMenu(buttonMain);
        button1.text = "Fix spelling & grammar";
        button1.editors = ["word"];
        button1.addCheckers("Selection");
        button1.attachOnClick(async function(){
            let content = await Asc.Library.GetSelectedText();
            let result = await AI.getActionEngine(AI.ActionType.TextAnalyze).chatRequest(`Сorrect the errors in this text: ${content}`);
            if (!result) return;
            if (result !== 'The text is correct, there are no errors in it.')
               await Asc.Library.ReplaceTextSmart(result);
            else
                console.log('The text is correct, there are no errors in it.');
        });

        let button2 = new Asc.ButtonContextMenu(buttonMain);
        button2.text = "Rewrite differently";
        button2.editors = ["word"];
        button2.addCheckers("Selection");
        button2.attachOnClick(async function(){
            let content = await Asc.Library.GetSelectedText();
            let result = await AI.getActionEngine(AI.ActionType.TextAnalyze).chatRequest(`Rewrite differently and give result on the same language: ${content}`);
            if (!result) return;
            result = result.replace(/\n\n/g, '\n');
            await Asc.Library.PasteText(result);
        });

        let button3 = new Asc.ButtonContextMenu(buttonMain);
        button3.text = "Make longer";
        button3.editors = ["word"];
        button3.addCheckers("Selection");
        button3.attachOnClick(async function(data){
            let content = await Asc.Library.GetSelectedText();
            let result = await AI.getActionEngine(AI.ActionType.TextAnalyze).chatRequest(`Make this text longer and give result on the same language: ${content}`);
            if (!result) return;
            result = result.replace(/\n\n/g, '\n');
            await Asc.Library.PasteText(result);
        });

        let button4 = new Asc.ButtonContextMenu(buttonMain);
        button4.text = "Make shorter";
        button4.editors = ["word"];
        button4.addCheckers("Selection");
        button4.attachOnClick(async function(data){
            let content = await Asc.Library.GetSelectedText();
            let result = await AI.getActionEngine(AI.ActionType.TextAnalyze).chatRequest(`Make this text simpler and give result on the same language: ${content}`);
            if (!result) return;
            result = result.replace(/\n\n/g, '\n');
            await Asc.Library.PasteText(result);
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
        button2.attachOnClick(async function(data){
            let content = await Asc.Library.GetSelectedText();
            let result = await AI.getActionEngine(AI.ActionType.Summarization).chatRequest(`Summarize this text: "${content}"`);
            if (!result) return;
            result = "Summarize selected text:\n\n" + result;
            await Asc.Library.InsertAsText(result);
        });

        let button3 = new Asc.ButtonContextMenu(button1);
        button3.text = "Keywords";
        button3.editors = ["word"];
        button3.addCheckers("Selection");
        button3.attachOnClick(async function(){
            let content = await Asc.Library.GetSelectedText();
            let result = await AI.getActionEngine(AI.ActionType.TextAnalyze).chatRequest(`Get Key words from this text: "${content}"`);
            if (!result) return;
            await Asc.Library.InsertAsText(result);
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
        button2.attachOnClick(async function(){
            let content = await Asc.Library.GetSelectedText();
            let result = await AI.getActionEngine(AI.ActionType.TextAnalyze).chatRequest(`What does it mean "${content}"?`);
            if (!result) return;
            result = result.replace(/\n\n/g, '\n');
            await Asc.Library.InsertAsComment(result);
        });

        let button3 = new Asc.ButtonContextMenu(button1);
        button3.text = "Explain text in hyperlink";
        button3.editors = ["word"];
        button3.addCheckers("Selection");
        button3.attachOnClick(async function(){
            let content = await Asc.Library.GetSelectedText();
            let result = await AI.getActionEngine(AI.ActionType.TextAnalyze).chatRequest(`Give a link to the explanation of the word "${content}"`);
            if (!result) return;
            result = result.replace(/\n\n/g, '\n');
            await Asc.Library.InsertAsHyperlink(result);
        });
    }

    if (true)
    {
        let button1 = new Asc.ButtonContextMenu(buttonMain);
        button1.text = "Translate";
        button1.editors = ["word"];
        button1.addCheckers("Selection");

        let button2 = new Asc.ButtonContextMenu(button1);
        button2.text = "Translate to English";
        button2.editors = ["word"];
        button2.addCheckers("Selection");
        button2.data = "English";
        button2.attachOnClick(async function(data){
            let lang = data;
            let content = await Asc.Library.GetSelectedText();
            let result = await AI.getActionEngine(AI.ActionType.Translation).chatRequest(`Translate to ${lang}: ${content}`);
            if (!result) return;
            await Asc.Library.PasteText(result);
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

    if (false)
    {
        // TODO:
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

    if (false)
    {
        // TODO:
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

        button1.onContextMenuShowExtendItem = function(options, item)
        {
            item.data = options.value;
        };

        button1.attachOnClick(function(data){
            let variation = {
                url : "hyperlink.html",
                description : window.Asc.plugin.tr("Hyperlink"),
                isVisual : true,
                buttons : [],
                isModal : false,
                EditorsSupport : ["word", "cell", "slide"],
                size : [ 1000, 1000 ]
            };

            var linkWindow = new window.Asc.PluginWindow();
            linkWindow.attachEvent("onGetLink", async function(){
                let link = data;
                if (!link)
                    link = await Asc.Library.GetSelectedText();
                link = link.replace(/\n/g, '');
                link = link.replace(/\r/g, '');
                linkWindow.command("onSetLink", link);
            });
            linkWindow.show(variation);
        });
    }

    if (true)
    {
        let button1 = new Asc.ButtonContextMenu(buttonMain);
        button1.text = "Chat";
        button1.separator = true;
        button1.addCheckers("All");
        button1.attachOnClick(function(){
            chatWindowShow();
        });
    }

    if (true)
    {
        let button1 = new Asc.ButtonContextMenu(buttonMain);
        button1.text = "Settings";
        button1.separator = true;
        button1.addCheckers("All");
        button1.attachOnClick(function(){
            onOpenSettingsModal();
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
            chatWindowShow();
        });

        let button2 = new Asc.ButtonToolbar(buttonMainToolbar);
        button2.text = "Summarization";
        button2.icons = getToolBarButtonIcons("summarization");
        button2.attachOnClick(async function(data) {
            onOpenSummarizationModal();
            // let content = await Asc.Library.GetSelectedText();
            // let result = await AI.getActionEngine(AI.ActionType.Summarization).chatRequest(`Summarize this text: "${content}"`);
            // result = "Summarize selected text:\n\n" + result;
            // if (!result) return;
            // if (Asc.plugin.info.editorType === "word")
            //     await Asc.Library.InsertAsText(result);
            // else
            //     await Asc.Library.PasteText(result);
        });

        /*
        // TODO:
        let button3 = new Asc.ButtonToolbar(buttonMainToolbar);
        button3.text = "Text to image";
        button3.icons = getToolBarButtonIcons("text-to-image");
        button3.attachOnClick(function(data){
            console.log(data);
        });
        */

        let button4 = new Asc.ButtonToolbar(buttonMainToolbar);
        button4.text = "Translation";
        button4.icons = getToolBarButtonIcons("translation");
        button4.attachOnClick(async function(){
            let lang = "english";
            let content = await Asc.Library.GetSelectedText();
            let result = await AI.getActionEngine(AI.ActionType.Translation).chatRequest(`Translate to ${lang}: ${content}`);
            if (!result) return;
            await Asc.Library.PasteText(result);
        });
    }

    // register actions
    window.AI = window.AI || {};
    var AI = window.AI;

    AI.ActionType = {
        Chat             : "Chat",
        Summarization    : "Summarization",
        //Text2Image       : "Text2Image",
        Translation      : "Translation",
        TextAnalyze      : "TextAnalyze"
    };

    AI.Actions = {};

    AI.Actions[AI.ActionType.Chat]           = { name : "Ask AI",        icon : "ask-ai",        model : "" };
    AI.Actions[AI.ActionType.Summarization]  = { name : "Summarization", icon : "summarization", model : "" };
    //AI.Actions[AI.ActionType.Text2Image]     = { name : "Text to image", icon : "text-to-image", model : "" };
    AI.Actions[AI.ActionType.Translation]    = { name : "Translation",   icon : "translation",   model : "" };
    AI.Actions[AI.ActionType.TextAnalyze]    = { name : "Text analysis",   icon : "",   model : "" };

    AI.getActionEngine = function(type)
    {
        return AI.getRequestModel(AI.Actions[type].model);
    };

    AI.ActionsGetKeys = function()
    {
        return [
            AI.ActionType.Chat,
            AI.ActionType.Summarization,
            //AI.ActionType.Text2Image,
            AI.ActionType.Translation,
            AI.ActionType.TextAnalyze
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
                name : Asc.plugin.tr(src.name),
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
