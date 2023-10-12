// an Chat plugin of AI
(function (window, undefined) {

    // define prompts for multiple languages
    const prompts = {
        en: {
            'summarize': 'summarize the text in up to 10 concise bullet points in English',
            'explain': 'explain the key concepts by bullet points and then summarize in simple words',
            'generate': 'using English to ',
        },
        de: {
            'summarize': 'fassen Sie den Text in bis zu 10 prägnanten Stichpunkten auf Deutsch zusammen',
            'explain': 'erklären Sie die Schlüsselkonzepte in Stichpunkten und fassen Sie sie dann in einfachen Worten zusammen',
            'generate': 'Deutschland nutzen, um ',
        },
        es: {
            'summary': 'resuma el texto en hasta 10 puntos concisos en español',
            'explain': 'explique los conceptos clave en puntos y luego resuma en palabras sencillas',
            'generate': 'usando español para ',
        },
        ru: {
            'summarize': 'суммируйте текст вплоть до 10 кратких пунктов на русском языке',
            'explain': 'объясните ключевые концепции пунктами, а затем суммируйте простыми словами',
            'generate': 'используя русский язык для ',
        },
        fr: {
            'summarize': 'résumer le texte en 10 points concis en français',
            'explain': 'expliquer les concepts clés par des points, puis résumer en termes simples',
            'generate': 'utiliser le français pour ',
        },
        zh: {
            'summarize': '用要点来总结文本',
            'explain': '用要点来解释涉及的关键概念，然后用简单的话总结',
            'generate': '用中文来',
        }
    }


    let ApiKey = '';
    let hasKey = false;
    let messageHistory = null; // a reference to the message history DOM element
    let conversationHistory = null; // a list of all the messages in the conversation
    let messageInput = null;
    let typingIndicator = null;
    let lang = '';

    function checkApiKey() {
        ApiKey = localStorage.getItem('apikey');
        if (ApiKey) {
            hasKey = true;
        } else {
            hasKey = false;
            displayMessage(generateText('Set Your ZhiPu API Key first'), 'ai-message');
            console.log("Set Your ZhiPu API Key first > translated", generateText('Set Your ZhiPu API Key first'))
        }
    };


    window.Asc.plugin.init = function () {
        lang = window.Asc.plugin.info.lang.substring(0, 2);
        console.log("current lang: ", lang)
        console.log("test translate: " + prompts[lang]['summarize']);
        messageHistory = document.querySelector('.message-history');
        conversationHistory = [];
        typingIndicator = document.querySelector('.typing-indicator');
        checkApiKey();
    };

    window.Asc.plugin.button = function () {
        this.executeCommand("close", "");
    };

    function getContextMenuItems() {
        let settings = {
            guid: window.Asc.plugin.guid,
            items: [
                {
                    id: 'ZhiPu Copilot',
                    text: generateText('ZhiPu Copilot'),
                    items: [
                        {
                            id: 'generate',
                            text: generateText('generate'),
                        },
                        {
                            id: 'summarize',
                            text: generateText('summarize'),
                        },
                        {
                            id: 'explain',
                            text: generateText('explain'),
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
                                {
                                    id: 'translate_to_ru',
                                    text: generateText('translate to Russian'),
                                },
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
                    ]
                }
            ]
        }
        return settings;
    }

    window.Asc.plugin.attachEvent('onContextMenuShow', function (options) {
        if (!options) return;

        if (options.type === 'Selection' || options.type === 'Target')
            this.executeMethod('AddContextMenuItem', [getContextMenuItems()]);
    });

    window.Asc.plugin.attachContextMenuClickEvent('clear_history', function () {
        clearHistory();
    });

    const displayMessage = function (message, messageType) {
        message = message.replace(/^"|"$/g, ''); // remove surrounding quotes
        message = message.replace(/\\n/g, '\n'); // replace \n with newline characters

        // create a new message element
        const messageElement = document.createElement('div');
        messageElement.classList.add(messageType); // Add a class for user messages

        // split the message into lines and create a text node for each line
        const lines = message.split('\n');
        for (const line of lines) {
            const textNode = document.createTextNode(line);
            messageElement.appendChild(textNode);
            messageElement.appendChild(document.createElement('br'));
        }

        // add the message element to the message history
        messageHistory.appendChild(messageElement);

        //  scroll to the bottom of the message history
        messageHistory.scrollTop = messageHistory.scrollHeight;

        console.log("history: ", conversationHistory);
    };


    //summarize
    window.Asc.plugin.attachContextMenuClickEvent('summarize', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            conversationHistory.push({ role: 'user', content: prompts[lang]['summarize'] + text });
            sseRequest(conversationHistory)
                .then(reader => {
                    console.log("SSE请求成功");
                    let currentDiv = null;
                    let currentMessage = null;
                    displaySSEMessage(reader, currentDiv, currentMessage);
                })
                .catch(error => {
                    console.log("SSE请求失败", error);
                });
        });
    });

    // explain 
    window.Asc.plugin.attachContextMenuClickEvent('explain', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            conversationHistory.push({ role: 'user', content: prompts[lang]['explain'] + text });
            sseRequest(conversationHistory)
                .then(reader => {
                    console.log("SSE请求成功");
                    let currentDiv = null;
                    let currentMessage = null;
                    displaySSEMessage(reader, currentDiv, currentMessage);
                })
                .catch(error => {
                    console.log("SSE请求失败", error);
                });
            typingIndicator.style.display = 'none'; // hide the typing indicator
        });
    });

    const translateHelper = function (text, targetLanguage) {
        conversationHistory.push({ role: 'user', content: `翻译为${targetLanguage}: ` + text });
        sseRequest(conversationHistory)
            .then(reader => {
                console.log("SSE请求成功");
                let currentDiv = null;
                let currentMessage = null;
                displaySSEMessage(reader, currentDiv, currentMessage);
            })
            .catch(error => {
                console.log("SSE请求失败", error);
            });
        typingIndicator.style.display = 'none'; // hide the typing indicator
    }

    // translate into Chinese
    window.Asc.plugin.attachContextMenuClickEvent('translate_to_zh', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            translateHelper(text, "中文");
        });
    });

    // translate into English
    window.Asc.plugin.attachContextMenuClickEvent('translate_to_en', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            translateHelper(text, "英文");
        });
    });

    // translate to French
    window.Asc.plugin.attachContextMenuClickEvent('translate_to_fr', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            translateHelper(text, "法文");
        });
    });

    // translate to German
    window.Asc.plugin.attachContextMenuClickEvent('translate_to_de', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            translateHelper(text, "德文");
        });
    });

    // translate to Russian
    window.Asc.plugin.attachContextMenuClickEvent('translate_to_ru', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            translateHelper(text, "俄文");
        });
    });

    // translate to spanish
    window.Asc.plugin.attachContextMenuClickEvent('translate_to_es', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            translateHelper(text, "西班牙文");
        });
    });

    // generate content in document using sse
    window.Asc.plugin.attachContextMenuClickEvent('generate', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            let prompt = ({ role: 'user', content: prompts[lang]['generate'] + text });
            typingIndicator.style.display = 'block'; // display the typing indicator
            let currentMessage = '';
            sseRequest(prompt)
                .then(reader => {
                    console.log("SSE请求成功");
                    Asc.scope.reader = reader;

                    reader.read().then(function processText({ done, value }) {
                        if (done) {
                            console.log("stream done");
                            return;
                        }
                        let lines = value.split('\n');
                        lines.forEach(line => {
                            if (line.includes('data')) {
                                const fragment = line.split(':')[1];
                                currentMessage += fragment;
                                if (fragment.length === 0 ) {
                                    console.log("currentMessage2: ", currentMessage)
                                    Asc.scope.p = currentMessage;
                                    Asc.plugin.callCommand(function () {
                                        let oDocument = Api.GetDocument();
                                        let oParagraph = Api.CreateParagraph();
                                        oParagraph.AddText(Asc.scope.p);
                                        oDocument.InsertContent([oParagraph]);
                                    })
                                    currentMessage = '';
                                }
                            }
                        });

                        // recursively call processResult() to continue reading data from the stream
                        reader.read().then(processText);
                    });
                })
                .catch(error => {
                    console.log("SSE请求失败", error);
                });
            });
            typingIndicator.style.display = 'none'; // hide the typing indicator
            console.log("hide typing indicator")
    });

    // generate async request (for in-doc function)
    let generateResponse = function () {
        return new Promise(function (resolve, reject) {
            let prompt = {
                "prompt": conversationHistory
            }
            window.Asc.sendRequest(prompt)
                .then(function (res) {
                    console.log("获得回复：", res);
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    }

    // Make sure the DOM is fully loaded before querying the DOM elements
    document.addEventListener("DOMContentLoaded", function () {
        // get references to the DOM elements
        messageInput = document.querySelector('.message-input');
        const sendButton = document.querySelector('.send-button');
        typingIndicator = document.querySelector('.typing-indicator');

        // send a message when the user clicks the send button
        function sendMessage() {
            const message = messageInput.value;
            if (message.trim() !== '') {
                displayMessage(message, 'user-message');
                conversationHistory.push({ role: 'user', content: message });
                messageInput.value = '';
                if (hasKey) {
                    typingIndicator.style.display = 'block'; // display the typing indicator
                    sseRequest(conversationHistory)
                        .then(reader => {
                            console.log("SSE请求成功");
                            let currentDiv = null;
                            let currentMessage = null;
                            displaySSEMessage(reader, currentDiv, currentMessage);
                        })
                        .catch(error => {
                            console.log("SSE请求失败", error);
                        });
                    typingIndicator.style.display = 'none'; // hide the typing indicator
                } else {
                    displayMessage('Set Your ZhiPu API Key first', 'ai-message');
                    conversationHistory.push({ role: 'assistant', content: 'Set Your ZhiPu API Key first' });
                }
            }
        }

        sendButton.addEventListener('click', sendMessage);

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

    function clearHistory() {
        messageHistory.innerHTML = '';
        conversationHistory = [];
        messageInput.value = '';
    }


    function sseRequest(conversationHistory) {
        return new Promise((resolve, reject) => {
            console.log("history: ", conversationHistory);
            const jwt = window.Asc.JWT;
            console.log("SSE请求开始");
            const model = localStorage.getItem('model');
            const url = `https://open.bigmodel.cn/api/paas/v3/model-api/${model}/sse-invoke`;

            const headers = {
                'Accept': 'text/event-stream',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            };

            const requestData = {
                prompt: conversationHistory
            };

            fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestData)
            })
                .then(response => {
                    const reader = response.body
                        .pipeThrough(new TextDecoderStream())
                        .getReader();
                    resolve(reader);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    function displaySSEMessage(reader, currentDiv, currentMessage) {
        reader.read().then(function processResult(result) {
            // console.log("stream result: ", result);
            if (result.value.includes('event:end') || result.value.includes('event:error') || result.value.includes('event:interrupt') || result.value.includes('event:finish')) {
                // console.log("result.value of stream", result.value);
                conversationHistory.push({ role: 'assistant', content: currentMessage });
                return;
            }
            if (currentDiv === null) {
                currentDiv = document.createElement('div');
                currentDiv.classList.add('ai-message');
                messageHistory.appendChild(currentDiv);
            }
            if (currentMessage === null) {
                currentMessage = '';
            }
            const lines = result.value.split('\n');
            lines.forEach(line => {
                if (line.includes('data')) {
                    const fragment = line.split(':')[1];
                    currentMessage += fragment;
                    if (fragment === '') {
                        currentDiv.appendChild(document.createElement('br'));
                    } else {
                        currentDiv.appendChild(document.createTextNode(fragment));
                    }
                }
            });

            // recursively call processResult() to continue reading data from the stream
            displaySSEMessage(reader, currentDiv, currentMessage);
        });
    }


    function generateText(text) {
        let lang = window.Asc.plugin.info.lang.substring(0, 2);
        return {
            en: text,
            [lang]: window.Asc.plugin.tr(text)
        }
    };

})(window, undefined);
