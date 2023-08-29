// an Chat plugin of AI
(function (window, undefined) {
    let ApiKey = '';
    let hasKey = false;
    const maxLen = 4000;
    let messageHistory = null;
    let conversationHistory = null;
    let messageInput = null;
    let typingIndicator = null;

    function checkApiKey() {
        ApiKey = localStorage.getItem('apikey');
        if (ApiKey) {
            hasKey = true;
        } else {
            hasKey = false;
            displayMessage('请先设置API Key', 'ai-message');
        }
    };


    window.Asc.plugin.init = function () {
        // 插件初始化
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
                    id: 'AiProcess',
                    text: '智谱 AI Copilot',
                    items: [
                        {
                            id: 'generate',
                            text: '生成',
                        },
                        {
                            id: 'summarize',
                            text: '总结',
                        },
                        {
                            id: 'explain',
                            text: '解释',
                        },
                        {
                            id: 'translate',
                            text: '翻译',
                            items: [
                                {
                                    id: 'translate_to_en',
                                    text: '翻译为英文',
                                },
                                {
                                    id: 'translate_to_zh',
                                    text: '翻译为中文',
                                }
                            ]
                        },
                        {
                            id: 'clear_history',
                            text: '清空对话历史',
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
        message = message.replace(/^"|"$/g, ''); // 去除首尾的双引号
        message = message.replace(/\\n/g, '\n'); // 将字面上的换行符替换为真正的换行符

        // 创建新的消息元素
        const messageElement = document.createElement('div');
        messageElement.classList.add(messageType); // Add a class for user messages

        // 将消息分割为行，并为每一行创建一个文本节点和一个换行符
        const lines = message.split('\n');
        for (const line of lines) {
            const textNode = document.createTextNode(line);
            messageElement.appendChild(textNode);
            messageElement.appendChild(document.createElement('br'));
        }

        // 将新消息添加到历史消息区域
        messageHistory.appendChild(messageElement);

        // 滚动到最新的消息
        messageHistory.scrollTop = messageHistory.scrollHeight;

        conversationHistory.push({ role: messageType === 'user-message' ? 'user' : 'assistant', content: message });
        // console.log("对话历史:", JSON.stringify(conversationHistory));
    };



    // 总结
    window.Asc.plugin.attachContextMenuClickEvent('summarize', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            conversationHistory.push({ role: 'user', content: '总结下面的文本' + text });
            let response = generateResponse();
            response.then(function (res) {
                displayMessage(res, 'ai-message');
            });
        });
    });

    const translateHelper = function (text, targetLanguage) {
        console.log(`翻译为${targetLanguage}选中的文本：`, text);
        conversationHistory.push({ role: 'user', content: `将下面的文本翻译为${targetLanguage}：` + text });
        let response = generateResponse();
        response.then(function (res) {
            // console.log(`翻译为${targetLanguage}-响应: `, res);
            displayMessage(res, 'ai-message');
        });
    }

    // 翻译为中文
    window.Asc.plugin.attachContextMenuClickEvent('translate_to_zh', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            translateHelper(text, "中文");
        });
    });

    // 翻译为英文
    window.Asc.plugin.attachContextMenuClickEvent('translate_to_en', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            translateHelper(text, "英文");
        });
    });

    // 生成
    window.Asc.plugin.attachContextMenuClickEvent('generate', function () {
        window.Asc.plugin.executeMethod('GetSelectedText', null, function (text) {
            conversationHistory.push({ role: 'user', content: '请根据指令生成对应文本：' + text });
            let response = generateResponse();
            response.then(function (res) {
                // console.log("获得回复：", res);
                conversationHistory.push({ role: 'assistant', content: res });
                Asc.scope.paragraphs = res.slice(1, -1).split('\\n');
                Asc.scope.st = Asc.scope.paragraphs;
                Asc.plugin.callCommand(function () {
                    var oDocument = Api.GetDocument();
                    for (var i = 0; i < Asc.scope.st.length; i++) {
                        var oParagraph = Api.CreateParagraph();
                        oParagraph.AddText(Asc.scope.st[i]);
                        oDocument.InsertContent([oParagraph]);
                    }
                }, false);
            });
        });

    });


    // 生成异步请求（用于in-doc功能）
    let generateResponse = async function () {
        let prompt = {
            "prompt": conversationHistory
        }
        let res = await window.Asc.sendRequest(prompt);
        console.log("获得回复：", res)
        return res;
    }

    // Make sure the DOM is fully loaded before running the following code
    document.addEventListener("DOMContentLoaded", function () {
        // 获取相关的DOM元素
        messageInput = document.querySelector('.message-input');
        const sendButton = document.querySelector('.send-button');
        typingIndicator = document.querySelector('.typing-indicator');

        // 发送消息的处理函数
        async function sendMessage() {
            const message = messageInput.value;
            if (message.trim() !== '') {
                displayMessage(message, 'user-message'); // 创建新的用户消息元素
                messageInput.value = ''; // 清空输入框
                typingIndicator.style.display = 'block'; // 显示等待指示器
                // const aiResponse = await generateResponse(); //生成AI回复
                const reader = await sseRequest(conversationHistory);
                typingIndicator.style.display = 'none'; // 隐藏等待指示器
                // displayMessage(aiResponse, 'ai-message'); // 创建新的AI消息元素
                displaySSEMessage(reader);
            }
        }

        // 绑定发送按钮的点击事件
        sendButton.addEventListener('click', sendMessage);

        messageInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();  // 取消默认的Enter键事件
                if (event.shiftKey) {
                    // 如果用户按下Shift+Enter，插入一个换行符
                    messageInput.value += '\n';
                } else {
                    // 如果用户只按下Enter，发送消息
                    sendMessage();
                }
            }
        });
    });

    function clearHistory() {
        // 清空消息历史记录
        messageHistory.innerHTML = '';

        // 清空对话历史记录
        conversationHistory = [];

        // 清空输入框
        messageInput.value = '';
    }


    async function sseRequest(conversationHistory) {
        console.log("history: ", conversationHistory);
        const jwt = window.Asc.JWT;
        // 向服务器发送请求
        console.log("SSE请求开始");
        const model = localStorage.getItem('model');
        const url = `https://open.bigmodel.cn/api/paas/v3/model-api/${model}/sse-invoke`;

        // 请求头
        const headers = {
            'Accept': 'text/event-stream',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        };

        // 请求体数据
        const requestData = {
            prompt: conversationHistory
        };

        // 发送POST请求获取响应
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData)
        });

        return response.body.pipeThrough(new TextDecoderStream()).getReader();
    }

    // 将SSE结果显示在页面上
    async function displaySSEMessage(reader) {
        let currentDiv = null;
        let currentMessage = null;
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            if (value.includes('finish' || 'error' || 'interrupt')) {
                console.log(value);
                currentDiv = null;
                break;
            }
            if (currentDiv === null) {
                currentDiv = document.createElement('div');
                currentDiv.classList.add('ai-message');
                messageHistory.appendChild(currentDiv);
            };
            const lines = value.split('\n');
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
        }

        conversationHistory.push({ role: 'assistant', content: currentMessage });
    }


})(window, undefined);
