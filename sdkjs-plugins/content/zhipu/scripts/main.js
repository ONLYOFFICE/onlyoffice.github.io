// A Chat plugin of AI
(function (window, undefined) {

    // const models = [
    //     {modelName: "glm-4", modelDescription: "Complete multiple language tasks according to the input natural language instructions."},
    //     {modelName: "glm-4",  modelDescription: "Complete multiple language tasks according to the input natural language instructions"},
    //     {modelName: "glm-4-0520",  modelDescription: "High Intelligence model: Suitable for handling highly complex and diverse tasks, supporting 128k context."},
    //     {modelName: "glm-4-air",  modelDescription: "Cost-effective: The most balanced model between reasoning power and price, supporting 128k context."},
    //     {modelName: "glm-4-airx",  modelDescription: "Ultra-fast reasoning: with ultra-fast reasoning speed and powerful reasoning effect, support 8k context"},
    //     {modelName: "glm-4-flash",  modelDescription: "Intelligent spectrum AI's first free API, zero cost to call large models."},
    //     {modelName: "glm-4-plus",  modelDescription: "High intelligence flagship: overall performance improvement, long text and complex task capabilities significantly enhanced."},
    //     {modelName: "glm-4-long",  modelDescription: "Long input: Designed to handle long text and memory-based tasks, it supports 1M context."},
    //     {modelName: "glm-4V", modelDescription: "Complete multiple language tasks according to the input natural language instructions."},
    //     {modelName: "glm-4-alltools", modelDescription: "AllTools model by planning user questions, choosing the right tools, step by step analysis and take the next action, and finally complete a complex task."},
    //     {modelName: "charglm-3", modelDescription: "It supports human-based role-playing, ultra-long multi-round memory, and thousands of character dialogues. It is widely used in anthropomorphic dialogues or game scenes such as emotional accompaniments, game intelligent NPCS, Internet celebrities/stars/movie and TV series IP clones, digital people/virtual anchors, and text adventure games."},
    //     {modelName: "cogview-3", modelDescription: "Generate images based on the user's text description."},
    //     {modelName: "emohaa", modelDescription: "Emohaa has learned the classic Hill Helping theory, has the professional speaking ability of a human psychological consultant, and has strong emotional support abilities such as listening, emotion mapping and empathy. It can help users understand their own thoughts and feelings, learn to cope with emotional problems, and help users achieve optimistic and positive psychological and emotional states."},
    // ]

    let ApiKey = '';
    let hasKey = false;
    let messageHistory = null; // a reference to the message history DOM element
    let conversationHistory = null; // a list of all the messages in the conversation
    let messageInput = null;
    let lang = '';
    let langMap = null;
    let abortController = null;
    let lastRequest = null;
    let loadElement = null;
    let regenButton = null;
    let stopButton = null;
    // let customReqWindow = null;


    // initialize the plugin
    window.Asc.plugin.init = function () {
        lang = window.Asc.plugin.info.lang.substring(0, 2);
        console.log("current lang: ", lang)

        langMap = new Map();
        langMap.set("en", "English");
        langMap.set("zh", "Chinese");
        langMap.set("fr", "French");
        langMap.set("de", "German");
        langMap.set("ru", "Russian");
        langMap.set("es", "Spanish");
        langMap.set("pt", "Portuguese");

        messageHistory = document.querySelector('.message-history');
        conversationHistory = [];
        checkApiKey();
    };
    window.Asc.plugin.button = function () {
        this.executeCommand("close", "");
    };

    window.Asc.plugin.onTranslate = function (){
        document.getElementById('greeting').innerHTML = window.Asc.plugin.tr("Hi there! I am Zhipu copilot, how can I help you today?");
        document.getElementById('chat-title').innerHTML = window.Asc.plugin.tr("Zhipu Copilot Chat");
        document.getElementById('clear-button').title = window.Asc.plugin.tr("Clear Chat");
        document.getElementById('send-button').title = window.Asc.plugin.tr("Send Message");
        document.getElementById('userInput').placeholder = window.Asc.plugin.tr("Type your message here...");
        document.getElementById('first-insert').title = window.Asc.plugin.tr("insert document");
        document.getElementById('stop-button').innerHTML = "<span>&#x25A0;</span>"+window.Asc.plugin.tr("stop");
        document.getElementById('regenerate-button').innerHTML = "<span>&#x21BA;</span>"+window.Asc.plugin.tr("regeneration");
    }


    // The functions in menu
    function getContextMenuItems(options) {
        console.log("context menu options: ", options);
        console.log(options.type);
        let settings = {
            guid: window.Asc.plugin.guid,
            items: [
                {
                    id: 'ZhiPu Copilot',
                    text: generateText('ZhiPu Copilot'),
                    items: []
                }
            ]
        }
        if(hasKey) {
            switch (options.type) {

                case 'Target':
                {
                    if (Asc.plugin.info.editorType === 'word') {
                        settings.items[0].items.push({
                            id: 'onClearHistory',
                            text: generateText('Clear chat history'),
                        });
                    }else if (Asc.plugin.info.editorType === 'cell') {

                    }else if (Asc.plugin.info.editorType === 'slide') {

                    }
                    break;
                }
                case 'Selection':
                {
                    if (Asc.plugin.info.editorType === 'word'){
                        settings.items[0].items.push({
                            id: 'onAnalyse',
                            text: generateText('Analyse text')
                        },{
                            id: 'onComplete',
                            text: generateText('Complete text')
                        },{
                            id: 'onGenerateDraft',
                            text: generateText('Generate draft')
                        },{
                            id: 'onRewrite',
                            text: generateText('Rewrite text')
                        },{
                            id: 'onShorten',
                            text: generateText('Shorten text')
                        },{
                            id: 'onExpand',
                            text: generateText('Expand text')
                        },{
                            id: 'onTextToImage',
                            text: generateText('Text to image')
                        });

                    }else if (Asc.plugin.info.editorType === 'cell') {
                        settings.items[0].items.push({
                            id : 'onExplainC',
                            text : generateText('Explain cells')
                        },{
                            id : 'onSummariseC',
                            text : generateText('Summarise cells')
                        });
                    }else if (Asc.plugin.info.editorType === 'slide') {
                        settings.items[0].items.push({
                            id : 'onOutline',
                            text : generateText('Get outline of a topic')
                        },{
                            id: 'onTextToImage',
                            text: generateText('Text to image')
                        });
                    }
                    // Common Functions
                    settings.items[0].items.push(
                        {
                            id: 'onSummarize',
                            text: generateText('Summarize text'),
                        },
                        {
                            id: 'onExplain',
                            text: generateText('Explain text'),
                        },{
                            id: 'onCorrect',
                            text: generateText('Correct spelling and grammar')
                        },
                        {
                            id: 'translate',
                            text: generateText('translate'),
                            items: [
                                {
                                    id: 'translate_to_en',
                                    text: generateText('translate to English'),
                                },
                                {
                                    id: 'translate_to_zh',
                                    text: generateText('translate to Chinese'),
                                },
                                {
                                    id: 'translate_to_fr',
                                    text: generateText('translate to French'),
                                },
                                {
                                    id: 'translate_to_de',
                                    text: generateText('translate to German'),
                                },
                                // {
                                //     id: 'translate_to_ru',
                                //     text: generateText('translate to Russian'),
                                // },
                                {
                                    id: 'translate_to_es',
                                    text: generateText('translate to Spanish'),
                                }
                            ]
                        },
                        {
                            id: 'clear_history',
                            text: generateText('clear chat history'),
                        }
                    );

                }

            }
        }
        return settings;
    }
    window.Asc.plugin.attachEvent('onContextMenuShow', function (options) {
        console.log("context menu options: ", options);
        if (!options) return;

        if (options.type === 'Selection' || options.type === 'Target')
            this.executeMethod('AddContextMenuItem', [getContextMenuItems(options)]);
    });



    //ZhiPu Copilot plugin Functions

    // clear chat history
    window.Asc.plugin.attachContextMenuClickEvent('clear_history', function () {
        clearHistory();
    });

    // explain text in cell
    window.Asc.plugin.attachContextMenuClickEvent('onExplainC', function () {
        Asc.plugin.callCommand(function () {

            let oWorksheet = Api.GetActiveSheet();
            let selection = oWorksheet.GetSelection();
            let data = selection.GetValue();

            console.log("se",selection.GetValue());
            return data;

        },false, false ,function (data) {
            console.log(" get select cell text", data);
            let tableString = formatTable(data)
            const prompt = explainCellPrompt(tableString, langMap.get(lang));
            const request = decoratePrompt(prompt);
            const message = window.Asc.plugin.tr('Explain the selected cells');
            displayMessage(message);
            chatRequest(request);
        });
    });


    // summarise cells
    window.Asc.plugin.attachContextMenuClickEvent('onSummariseC', function () {
        Asc.plugin.callCommand(function () {

            let oWorksheet = Api.GetActiveSheet();
            let selection = oWorksheet.GetSelection();
            let data = selection.GetValue();

            console.log("se",selection.GetValue());
            return data;

        },false, false ,function (data) {
            console.log(" get select cell text", data);
            let tableString = formatTable(data)
            const prompt = summariseCellPrompt(tableString, langMap.get(lang));
            const request = decoratePrompt(prompt);
            const message = window.Asc.plugin.tr('Summarise the selected cells')
            displayMessage(message);
            chatRequest(request);
        });
    });

    // summarize slide
    window.Asc.plugin.attachContextMenuClickEvent('onSummariseS', function () {
        Asc.plugin.callCommand(function () {
            // Todo: implement the logic to get the current slide content

            // let oPresentation = Api.GetPresentation();
            // let oSlide = oPresentation.GetCurrentSlide();
            //
            // oSlide.RemoveAllObjects();
            //
            // function addText(oShape, oContent, text, fontSize, isBold, js) {
            //     let oParagraph = Api.CreateParagraph();
            //     oParagraph.SetSpacingBefore(0, undefined);
            //     oParagraph.SetSpacingAfter(0, undefined);
            //     oContent.Push(oParagraph);
            //     var oRun = Api.CreateRun();
            //     oRun.SetFill(Api.CreateSolidFill(Api.CreateRGBColor(0x00, 0x44, 0xff)));
            //     oRun.SetFontSize(fontSize);
            //     oRun.SetFontFamily('Georgia');
            //     oRun.SetBold(isBold);
            //     oRun.AddText(text);
            //     oParagraph.AddElement(oRun);
            //     oParagraph.SetJc(js)
            // }
            //
            //
            //
            // let oShape1 = Api.CreateShape('rect', 300 * 36000, 130 * 36000, Api.CreateNoFill(Api.CreateRGBColor(255, 111, 61)), Api.CreateStroke(0, Api.CreateNoFill()));
            // oShape1.SetPosition(1764000, 1191600);
            // let oPlaceholder = Api.CreatePlaceholder("picture");
            // oShape1.SetPlaceholder(oPlaceholder);
            // let oContent1 = oShape1.GetDocContent();
            // let oParagraph = oContent1.GetElement(0);
            // oParagraph.SetJc("left");
            // oParagraph.AddText("This is a title");
            // oPlaceholder.SetType("title")
            // oSlide.AddObject(oShape1);

            // let oShape2 = Api.CreateShape('rect', 4986000, 2419200, Api.CreateNoFill(), Api.CreateStroke(0, Api.CreateNoFill()));
            // oShape2.SetPosition(3834000, 3888000);
            // let oContent2 = oShape2.GetDocContent();
            // oContent2.RemoveAllElements();
            // addText(oShape2, oContent2, 'This is a content', 100, true, 'right');
            //
            // oSlide.AddObject(oShape2);

            return "success";

        },false, false ,function (data) {
            // console.log(" get select cell text", data);
            // let tableString = formatTable(data)
            // const prompt = summariseCellPrompt(tableString);
            // displayMessage('/explainTable','user-message');
            // chatRequest(prompt);
        });
    });

    // generate outline of a topic
    window.Asc.plugin.attachContextMenuClickEvent('onOutline', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            const prompt = slideOutlinePrompt(text, 5, langMap.get(lang));
            const request = decoratePrompt(prompt);
            const message = window.Asc.plugin.tr('Get outline of a topic');
            displayMessage(message);
            chatRequest(request);
        });
    });

    // generate slides from the outline
    window.Asc.plugin.attachContextMenuClickEvent('onGenerateSlides', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (topic) {
            const prompt = slideOutlinePrompt(topic, 5, langMap.get(lang))
            const request = decoratePrompt(prompt);
            const message = window.Asc.plugin.tr('Generate slides');

            displayMessage(message);
            let config = {model: localStorage.getItem('model')}
            zhipuChatRequest(request, "You are a good PPT assistant, please help user to generate the outline according to the topic", false, config)
                .then(response => {
                    generateSlidesFromOutline(response.data[0].content);
                })
        });
    });

    // Todo: implement the logic to generate slides from the outline
    // function generateSlidesFromOutline(outline) {
    //     Asc.plugin.callCommand(function () {
    //
    //         builder.CreateFile("pptx");
    //         var oPresentation = Api.GetPresentation();
    //         oPresentation.SetSizes(9144000, 6858000);
    //
    //         function createSlide(oPresentation, image_url) {
    //             var oSlide = Api.CreateSlide();
    //             oPresentation.AddSlide(oSlide);
    //             var oFill = Api.CreateBlipFill(image_url, 'stretch');
    //             oSlide.SetBackground(oFill);
    //             oSlide.RemoveAllObjects();
    //             return oSlide;
    //         }
    //
    //         function addText(oShape, oContent, text, fontSize, isBold, js) {
    //             var oParagraph = Api.CreateParagraph();
    //             oParagraph.SetSpacingBefore(0, undefined);
    //             oParagraph.SetSpacingAfter(0, undefined);
    //             oContent.Push(oParagraph);
    //             var oRun = oParagraph.AddText(text);
    //             oRun.SetFill(Api.CreateSolidFill(Api.CreateRGBColor(0xff, 0xff, 0xff)));
    //             oRun.SetFontSize(fontSize);
    //             oRun.SetFontFamily('Georgia');
    //             oRun.SetBold(isBold);
    //             oParagraph.SetJc(js)
    //         }
    //
    //         var image_url = "https://legacy-api.onlyoffice.com/content/img/docbuilder/examples/presentation_gun.png";
    //         var oSlide = createSlide(oPresentation, image_url);
    //         oPresentation.GetSlideByIndex(0).Delete();
    //
    //         var oShape = Api.CreateShape('rect', 8056800, 3020400, Api.CreateNoFill(), Api.CreateStroke(0, Api.CreateNoFill()));
    //         oShape.SetPosition(608400, 1267200);
    //         var oContent = oShape.GetDocContent();
    //         oContent.RemoveAllElements();
    //         addText(oShape, oContent, 'How They', 160, true, 'left');
    //         addText(oShape, oContent, 'Throw Out', 132, false, 'left');
    //         addText(oShape, oContent, 'a Challenge', 132, false, 'left');
    //         oSlide.AddObject(oShape);
    //
    //         oSlide = Api.CreateSlide();
    //         oPresentation.AddSlide(oSlide);
    //         var oFill = Api.CreateBlipFill('https://legacy-api.onlyoffice.com/content/img/docbuilder/examples/presentation_axe.png', 'stretch');
    //         oSlide.SetBackground(oFill);
    //         oSlide.RemoveAllObjects();
    //
    //         oShape = Api.CreateShape('rect', 6904800, 1724400, Api.CreateNoFill(), Api.CreateStroke(0, Api.CreateNoFill()));
    //         oShape.SetPosition(1764000, 1191600);
    //         oContent = oShape.GetDocContent();
    //         oContent.RemoveAllElements();
    //         addText(oShape, oContent, 'American Indians ', 110, true, 'right');
    //         addText(oShape, oContent, '(XVII century)', 94, false, 'right');
    //         oSlide.AddObject(oShape);
    //
    //         oShape = Api.CreateShape('rect', 4986000, 2419200, Api.CreateNoFill(), Api.CreateStroke(0, Api.CreateNoFill()));
    //         oShape.SetPosition(3834000, 3888000);
    //         oContent = oShape.GetDocContent();
    //         oContent.RemoveAllElements();
    //         addText(oShape, oContent, 'put a tomahawk on the ground in the ', 84, false, 'right');
    //         addText(oShape, oContent, "rival's camp", 84, false, 'right');
    //         oSlide.AddObject(oShape);
    //
    //         oSlide = Api.CreateSlide();
    //         oPresentation.AddSlide(oSlide);
    //         oFill = Api.CreateBlipFill('https://legacy-api.onlyoffice.com/content/img/docbuilder/examples/presentation_knight.png', 'stretch');
    //         oSlide.SetBackground(oFill);
    //         oSlide.RemoveAllObjects();
    //
    //         oShape = Api.CreateShape('rect', 6904800, 1724400, Api.CreateNoFill(), Api.CreateStroke(0, Api.CreateNoFill()));
    //         oShape.SetPosition(1764000, 1191600);
    //         oContent = oShape.GetDocContent();
    //         oContent.RemoveAllElements();
    //         addText(oShape, oContent, 'European Knights', 110, true, 'right');
    //         addText(oShape, oContent, ' (XII-XVI centuries)', 94, false, 'right');
    //         oSlide.AddObject(oShape);
    //
    //         oShape = Api.CreateShape('rect', 4986000, 2419200, Api.CreateNoFill(), Api.CreateStroke(0, Api.CreateNoFill()));
    //         oShape.SetPosition(3834000, 3888000);
    //         oContent = oShape.GetDocContent();
    //         oContent.RemoveAllElements();
    //         addText(oShape, oContent, 'threw a glove', 84, false, 'right');
    //         addText(oShape, oContent, "in the rival's face", 84, false, 'right');
    //         oSlide.AddObject(oShape);
    //
    //         oSlide = Api.CreateSlide();
    //         oPresentation.AddSlide(oSlide);
    //         oFill = Api.CreateBlipFill('https://legacy-api.onlyoffice.com/content/img/docbuilder/examples/presentation_sky.png', 'stretch');
    //         oSlide.SetBackground(oFill);
    //         oSlide.RemoveAllObjects();
    //
    //         oShape = Api.CreateShape('rect', 7887600, 3063600, Api.CreateNoFill(), Api.CreateStroke(0, Api.CreateNoFill()));
    //         oShape.SetPosition(630000, 1357200);
    //         oContent = oShape.GetDocContent();
    //         oContent.RemoveAllElements();
    //         addText(oShape, oContent, 'ONLYOFFICE', 176, false, 'center');
    //         addText(oShape, oContent, 'stands for Peace', 132, false, 'center');
    //         oSlide.AddObject(oShape);
    //
    //         builder.SaveFile("pptx", "Presentation.pptx");
    //         builder.CloseFile();
    //
    //     },false, false ,function (data) {
    //
    //     });
    // }

    // Correct Spelling and Grammar
    window.Asc.plugin.attachContextMenuClickEvent('onCorrect', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {

            if (!text  && Asc.plugin.info.editorType === 'cell' ){
                const message = window.Asc.plugin.tr("Sorry, please select text in a cell to proceed correct selected spelling and grammar.");
                displayMessage(message, 'ai-message',true);
                return;
            }
            const prompt = correctContentPrompt(text, langMap.get(lang));
            const request = decoratePrompt(prompt);
            const message = window.Asc.plugin.tr('Correct spelling and grammar');
            displayMessage(message);
            chatRequest(request);
        });
    });

    // generate draft
    window.Asc.plugin.attachContextMenuClickEvent('onGenerateDraft', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            const prompt = generateDraftPrompt(text, langMap.get(lang));
            const request = decoratePrompt(prompt);
            const message = window.Asc.plugin.tr('Generate draft');
            displayMessage(message);
            chatRequest(request);
        });
    });

    //summarize text
    window.Asc.plugin.attachContextMenuClickEvent('onSummarize', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {

            if (!text  && Asc.plugin.info.editorType === 'cell' ){
                const message = window.Asc.plugin.tr("Sorry, please select text in a cell to proceed summarize the selected text.");
                displayMessage(message, 'ai-message',true);
                return;
            }
            const prompt = summarizeContentPrompt(text, langMap.get(lang));
            const request = decoratePrompt(prompt);
            const message = window.Asc.plugin.tr('Summarize the selected text');
            displayMessage(message);
            chatRequest(request);
        });
    });

    // explain text
    window.Asc.plugin.attachContextMenuClickEvent('onExplain', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {

            if (!text  && Asc.plugin.info.editorType === 'cell' ){
                const message = window.Asc.plugin.tr("Sorry, please select text in a cell to proceed explain the selected text.");
                displayMessage(message, 'ai-message',true);
                return;
            }
            const prompt = explainContentPrompt(text, langMap.get(lang));
            const request = decoratePrompt(prompt);
            const message = window.Asc.plugin.tr('Explain the selected text');
            displayMessage(message);
            chatRequest(request);
        });
    });

    // analyse text
    window.Asc.plugin.attachContextMenuClickEvent('onAnalyse', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            const prompt = analyzeTextPrompt(text, langMap.get(lang));
            const request = decoratePrompt(prompt);
            const message = window.Asc.plugin.tr('Analyse the selected text');
            displayMessage(message);
            chatRequest(request);
        });
    });

    // complete text
    window.Asc.plugin.attachContextMenuClickEvent('onComplete', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            const prompt = completeTextPrompt(text, langMap.get(lang));
            const request = decoratePrompt(prompt);
            const message = window.Asc.plugin.tr('Complete the selected text');
            displayMessage(message);
            chatRequest(request);
        });
    });

    // rewrite text
    window.Asc.plugin.attachContextMenuClickEvent('onRewrite', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            const prompt = rewriteContentPrompt(text, langMap.get(lang));
            const request = decoratePrompt(prompt);
            const message = window.Asc.plugin.tr('Rewrite the selected text');
            displayMessage(message);
            chatRequest(request);
        });
    });

    // shorten text
    window.Asc.plugin.attachContextMenuClickEvent('onShorten', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            const prompt = shortenContentPrompt(text, langMap.get(lang));
            const request = decoratePrompt(prompt);
            const message = window.Asc.plugin.tr('Shorten the selected text');
            displayMessage(message);
            chatRequest(request);
        });
    });

    // expand text
    window.Asc.plugin.attachContextMenuClickEvent('onExpand', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            const prompt = expandContentPrompt(text, langMap.get(lang));
            const request = decoratePrompt(prompt);
            const message = window.Asc.plugin.tr('Expand the selected text');
            displayMessage(message);
            chatRequest(request);
        });
    });

    // text to image
    window.Asc.plugin.attachContextMenuClickEvent('onTextToImage', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            const prompt = textToImagePrompt(text);
            generateImageFromText(prompt);
        });
    });


    // translate into Chinese
    window.Asc.plugin.attachContextMenuClickEvent('translate_to_zh', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            translateHelper(text, "Chinese");
        });
    });

    // translate into English
    window.Asc.plugin.attachContextMenuClickEvent('translate_to_en', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            translateHelper(text, "English");
        });
    });

    // translate to French
    window.Asc.plugin.attachContextMenuClickEvent('translate_to_fr', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            translateHelper(text, "French");
        });
    });

    // translate to German
    window.Asc.plugin.attachContextMenuClickEvent('translate_to_de', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            translateHelper(text, "German");
        });
    });

    // translate to Russian
    window.Asc.plugin.attachContextMenuClickEvent('translate_to_ru', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            translateHelper(text, "Russian");
        });
    });

    // translate to spanish
    window.Asc.plugin.attachContextMenuClickEvent('translate_to_es', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            translateHelper(text, "Spanish");
        });
    });

    // Make sure the DOM is fully loaded before querying the DOM elements
    document.addEventListener("DOMContentLoaded", function () {
        // get references to the DOM elements
        messageInput = document.querySelector('#userInput');
        const sendButton = document.querySelector('.send-button');
        const clearButton = document.querySelector('.clear-button');
        stopButton = document.querySelector('.stop-button');
        regenButton = document.querySelector('.regenerate-button');

        // send a message when the user clicks the send button
        function sendMessage() {
            // if the user clicked the send button, delete the last time request
            lastRequest = null;
            const message = messageInput.value;
            if (message.trim() !== '') {
                displayMessage(message);
                messageInput.value = '';
                if (hasKey) {
                    chatRequest(conversationHistory);
                    // chatRequest("hello");
                } else {
                    const message2 = window.Asc.plugin.tr('Set Your ZhiPu API Key first');
                    displayMessage(message2, 'ai-message');
                    conversationHistory.push({ role: 'assistant', content: 'Set Your ZhiPu API Key first' });
                }
            }
        }

        sendButton.addEventListener('click', sendMessage);
        clearButton.addEventListener('click', clearHistory);
        stopButton.addEventListener('click', stopChatRequest);
        regenButton.addEventListener('click', reSend);

        messageInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();  // prevent the default behavior of the Enter key
                if (event.shiftKey) {
                    // if the user pressed Shift+Enter, insert a newline character
                    messageInput.value += '\n';
                } else {
                    // if the user only pressed Enter, send the message
                    sendMessage();
                }
            }
        });
    });

    // utils functions for the plugin


    function checkApiKey() {
        ApiKey = localStorage.getItem('apikey');
        if (ApiKey) {
            hasKey = true;
        } else {
            hasKey = false;
            displayMessage(generateText('Set Your ZhiPu API Key first'), 'assistant',true);
            console.log("Set Your ZhiPu API Key first > translated", generateText('Set Your ZhiPu API Key first'))
        }
    }

    function formatTable(data) {
        if (!Array.isArray(data)) {
            return "Input must be an array.";
        }

        let table = "";
        for (let i = 0; i < data.length; i++) {
            let row = "";
            for (let j = 0; j < data[i].length; j++) {
                row += data[i][j] + "\t";
            }
            table += row.trim() + "\n";
        }
        return table.trim();
    }
    function decoratePrompt(prompt) {
        return [{
            role: 'user',
            content: prompt,
        }];
    }

    function translateHelper(text, targetLanguage) {
        const str = `translate the selected text to ${targetLanguage}`
        const message = window.Asc.plugin.tr(str);

        if (!text  && Asc.plugin.info.editorType === 'cell' ){
            const message = window.Asc.plugin.tr("Sorry, please select text in a cell to proceed translate selected text.");
            displayMessage(message, 'ai-message',true);
            return;
        }
        displayMessage(message);
        const prompt = translatePrompt(text, targetLanguage);
        const request = decoratePrompt(prompt);

        chatRequest(request)
    }

    function generateImageFromText(text) {
        const startMessage = window.Asc.plugin.tr('Zhipu AI is generating');
        window.Asc.plugin.executeMethod('StartAction', ['Block', startMessage]);
        zhipuImgRequest(text).then(response => {
            window.Asc.plugin.executeMethod('EndAction', ['Block', startMessage]);
            const url = response.data[0].url;
            console.log("url: ", url);
            let imgSize = { width: 256, height: 256 };
            if (url) {

                Asc.scope.url = url;
                Asc.scope.imgsize = imgSize;
                insertInto(Asc.plugin.info.editorType);
            }
        });
    }

    function insertInto(editorType) {
        if (editorType === 'word') {
            Asc.plugin.callCommand(function () {
                let oDocument = Api.GetDocument();
                let oParagraph = Api.CreateParagraph();
                let width = Asc.scope.imgsize.width * (25.4 / 96.0) * 36000;
                let height = Asc.scope.imgsize.height * (25.4 / 96.0) * 36000;
                let oDrawing = Api.CreateImage(Asc.scope.url, width, height);
                oParagraph.AddDrawing(oDrawing);

                // insert picture and replace the selecting word
                oDocument.InsertContent([oParagraph]);

                // insert into the bottom
                // oDocument.push([oParagraph]);
            })
        }else if (editorType === 'slide') {
            Asc.plugin.callCommand(function () {
                let oPresentation = Api.GetPresentation();
                let oSlide = oPresentation.GetCurrentSlide();
                // let oShape = Api.CreateShape('rect', 4986000, 2419200, Api.CreateNoFill(), Api.CreateStroke(0, Api.CreateNoFill()));
                let width = Asc.scope.imgsize.width * (25.4 / 96.0) * 36000;
                let height = Asc.scope.imgsize.height * (25.4 / 96.0) * 36000;
                let oDrawing = Api.CreateImage(Asc.scope.url, width, height);
                oSlide.AddObject(oDrawing);
            })
        }
    }

    function getSystemMessage(){
        const language = langMap.get(lang);
        if (Asc.plugin.info.editorType === 'word') {
            return `You are a good word document assistant, you have the ability to analyze text, complete text, generate drafts, rewrite text, and more.. You should try to answer the user's questions in ${language}, unless the user explicitly asks for answers in other languages.`;
        }else if (Asc.plugin.info.editorType === 'cell') {
            return `You are a good spreadsheet assistant, you have the ability to explain cells, summarize cells, and more.. You should try to answer the user's questions in ${language}, unless the user explicitly asks for answers in other languages.`;
        }else if (Asc.plugin.info.editorType === 'slide') {
            return `You are a good slide assistant, you have the ability to get the outline of a topic, generate slides from the outline, and more.. You should try to answer the user's questions in ${language}, unless the user explicitly asks for answers in other languages.`;
        }
        return `You are a good assistant, you should try to answer the user's questions in ${language}, unless the user explicitly asks for answers in other languages.`;
    }
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            const message = window.Asc.plugin.tr("Message copied to clipboard")
            alert(message);
        }, () => {
            const message = window.Asc.plugin.tr("Error copying message to clipboard")
            alert(message);
        });
    }

    const reSend = () => {
        // delete the last message from the conversation history
        messageHistory.removeChild(messageHistory.lastChild);
        if (hasKey) {
            if (lastRequest) {
                // regenerate the last request
                chatRequest(lastRequest);
            }else {
                // regenerate the chat
                chatRequest(conversationHistory)
            }
        } else {
            const message = window.Asc.plugin.tr("Set Your ZhiPu API Key first")
            displayMessage(message, 'ai-message');
            conversationHistory.push({ role: 'assistant', content: 'Set Your ZhiPu API Key first' });
        }
    }

    const insertIntoDocument = (text) => {

        Asc.scope.insert = text;
        if (Asc.plugin.info.editorType === 'word'){
            Asc.plugin.callCommand(function () {
                let oDocument = Api.GetDocument();
                let oParagraph = Api.CreateParagraph();
                oParagraph.AddText(Asc.scope.insert);
                oDocument.InsertContent([oParagraph]);
            })
        }else if (Asc.plugin.info.editorType === 'cell'){
            Asc.plugin.callCommand(function () {
                let oWorksheet = Api.GetActiveSheet();
                let selection = oWorksheet.GetSelection();
                selection.SetValue(Asc.scope.insert);
            })
        }else if (Asc.plugin.info.editorType === 'slide'){
            Asc.plugin.callCommand(function () {
                let oPresentation = Api.GetPresentation();
                let oSlide = oPresentation.GetCurrentSlide();
                let oShape = Api.CreateShape('rect', 4986000, 2419200, Api.CreateNoFill(), Api.CreateStroke(0, Api.CreateNoFill()));
                oShape.SetPosition(3834000, 3888000);
                let oContent = oShape.GetDocContent();
                oContent.RemoveAllElements();
                let oParagraph = Api.CreateParagraph();
                let oRun = Api.CreateRun();
                let oTextPr = oRun.GetTextPr();
                oTextPr.SetFontSize(50);
                let oFill = Api.CreateSolidFill(Api.CreateRGBColor(0, 0, 0));
                oTextPr.SetTextFill(oFill);
                oParagraph.SetJc("left");
                oRun.AddText(Asc.scope.insert);
                oParagraph.AddElement(oRun);
                oContent.Push(oParagraph);
                oSlide.AddObject(oShape);
            })
        }

    }

    function clearHistory() {
        messageHistory.innerHTML = '';
        conversationHistory = [];
        messageInput.value = '';
    }
    function createAIMessageFrame(pin=false) {
        // <div className="message ai-message">
        //     <div className="avatar">
        //         <img src="resources/zhipu-avatar.png">
        //         <!--                    <div class="load-icon">&#x1F504;</div>-->
        //     </div>
        //     <div className="bubble">
        //         <div className="message-content" id="greeting"></div>
        //         <div className="actions">
        //             <button type="button" title="Insert" onClick="">&#x2398;</button>
        //             <button type="button" title="Regenerate" onClick="">&#x21BA;</button>
        //         </div>
        //     </div>
        // </div>

        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add('ai-message');


        // create an avatar element
        const avatarElement = document.createElement('div');
        const avatarImg = document.createElement('img');
        avatarElement.classList.add('avatar');
        avatarImg.src = "resources/zhipu-avatar.png";
        avatarImg.alt = `ai-message avatar`;

        loadElement = document.createElement('div');
        loadElement.classList.add('load-icon');
        loadElement.innerHTML = '&#x1F504;'
        if (pin) {
            loadElement.style.display = 'none';
        }
        avatarElement.appendChild(avatarImg);
        avatarElement.appendChild(loadElement);

        // create a message content element
        const bubbleContentElement = document.createElement('div');
        bubbleContentElement.classList.add('bubble');
        const messageContentElement = document.createElement('div');
        messageContentElement.classList.add('message-content');

        const actions = document.createElement('div');
        actions.classList.add('actions');
        const insertButton = document.createElement('button');
        insertButton.type = 'button';
        insertButton.title = window.Asc.plugin.tr("insert document");
        insertButton.innerHTML = '&#x2398;';
        insertButton.onclick = () => insertIntoDocument(messageContentElement.innerText);
        // const regenerateButton = document.createElement('button');
        // regenerateButton.type = 'button';
        // regenerateButton.title = window.Asc.plugin.tr("regenerate");
        // regenerateButton.innerHTML = '&#x21BA;';
        // regenerateButton.onclick = () => reSend();
        // actions.appendChild(regenerateButton);
        bubbleContentElement.appendChild(messageContentElement);
        actions.appendChild(insertButton);

        bubbleContentElement.appendChild(actions);

        messageElement.appendChild(avatarElement);
        messageElement.appendChild(bubbleContentElement);

        messageHistory.appendChild(messageElement);

        return messageContentElement;
    }

    function createUserMessageFrame() {
        // <div className="message user-message">
        //     <div className="bubble">
        //         <div className="message-content">Hello, nice to meet you.</div>
        //     </div>
        //     <div className="avatar"><img src="user.png"></div>
        // </div>


        // create a new message element
        const messageElement = document.createElement('div');
        messageElement.classList.add("message"); // Add a class for user messages
        messageElement.classList.add("user-message"); // Add a class for user messages

        // create an avatar element
        const avatarElement = document.createElement('div');
        const imgElement = document.createElement('img');
        avatarElement.classList.add('avatar');
        imgElement.src = "resources/user.png";
        imgElement.alt = window.Asc.plugin.tr("user avatar");
        avatarElement.appendChild(imgElement);

        // create a message content element
        const bubbleContentElement = document.createElement('div');
        bubbleContentElement.classList.add('bubble');
        const messageContentElement = document.createElement('div');
        messageContentElement.classList.add('message-content');
        bubbleContentElement.appendChild(messageContentElement);


        // add the message element to the message history
        messageHistory.appendChild(messageElement);
        messageElement.appendChild(bubbleContentElement);
        messageElement.appendChild(avatarElement);

        //  scroll to the bottom of the message history
        messageHistory.scrollTop = messageHistory.scrollHeight;

        return messageContentElement;
    }

    const displayMessage = function (message, role= 'user',pin=false) {
        message = message.replace(/^"|"$/g, ''); // remove surrounding quotes
        message = message.replace(/\\n/g, '\n'); // replace \n with newline characters
        // add the message to the conversation history
        conversationHistory.push({ role: role, content: message });

        const messageContentElement = role === 'user' ? createUserMessageFrame() : createAIMessageFrame(pin);

        // split the message into lines and create a text node for each line
        const lines = message.split('\n');
        for (const line of lines) {
            const textNode = document.createTextNode(line);
            messageContentElement.appendChild(textNode);
            messageContentElement.appendChild(document.createElement('br'));
        }

    };
    function startChat(request) {
        lastRequest = request;
        regenButton.style.display = 'none';
        stopButton.style.display = 'block';
    }
    function endChat() {
        regenButton.style.display = 'block';
        if (loadElement) {
            loadElement.style.display = 'none';
        }
        stopButton.style.display = 'none';
    }
    function chatRequest(request) {
        startChat(request)
        let prompt = request;
        let systemMessage = getSystemMessage();
        let config = {model: localStorage.getItem('model'), temperature: 0.5}
        abortController = new AbortController()
        zhipuChatRequest(prompt, systemMessage, true, config, abortController.signal)
            .then(reader => {
                console.log("SSE request started");
                let messageContentElement = createAIMessageFrame();
                displaySSEMessage(reader, messageContentElement, null)
                    .then(result => {
                        console.log('Chat completed, result :',result);
                        conversationHistory.push({ role: 'assistant', content: result.response });
                        endChat();
                        console.log("current history: ", conversationHistory);
                    })
                    .catch(error => {
                        endChat()
                        if (error.name === 'AbortError') {
                            console.log('The SSE request was stopped manually');
                        } else {
                            console.error("An error occurred: ", error);
                        }
                    });

            })
            .catch(err => {
                endChat();
                let message = window.Asc.plugin.tr(err.message);
                displayMessage(message, 'ai-message',true);
                console.log("SSE request failed", err);
            });
    }

    function stopChatRequest() {
        if (abortController) {
            abortController.abort(); // stop SSE request
            loadElement.style.display = 'none';
        }
    }

    function generateText(text) {
        let lang = window.Asc.plugin.info.lang.substring(0, 2);
        return {
            en: text,
            [lang]: window.Asc.plugin.tr(text)
        }
    }

})(window, undefined);
