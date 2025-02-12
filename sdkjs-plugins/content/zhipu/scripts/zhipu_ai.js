function zhipuChatRequest(prompt, systemMessage, stream, config, signal) {
    return new Promise((resolve, reject) => {
        console.log("zhipu Request begin");
        const jwt = sJWT;
        let apikey = localStorage.getItem('apikey');

        // console.log("jwt: ", jwt);
        // console.log("apikey: ", apikey);
        const url = `https://open.bigmodel.cn/api/paas/v4/chat/completions`;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        };
        if (stream) {
            headers['Accept'] = 'text/event-stream';
        }


        const data = {
            messages: [
                {
                    role: "system",
                    content: systemMessage
                },
                ...prompt
            ],
            stream: stream,
            ...config
        };

        console.log("body: ", JSON.stringify(data))
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            signal: signal
        }).then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    let errorMessage;
                    switch (errData.error.code) {
                        case '1000':
                            errorMessage = `Authentication failure, please check that the API KEY is correct`;
                            break;
                        default:
                            errorMessage = errData.error.message;
                    }
                    reject(new Error(errorMessage));
                });
            }
            if (stream) {
                const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
                resolve(reader);
            } else {
                resolve(response.json());
            }
        }).catch(err => {
            reject(err);
        });
    });
}

function zhipuImgRequest(prompt) {
    return new Promise((resolve, reject) => {
        const jwt = window.Asc.JWT;
        console.log("Zhipu image request begin");
        const url = `https://open.bigmodel.cn/api/paas/v4/images/generations`;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        };

        const data = {
            model: "cogview-3",
            prompt: prompt
        };

        console.log("body: ", JSON.stringify(data))
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }).then(response => {
            resolve(response.json());
        }).catch(err => {
            reject(err);
        });
    });
}
const parseValue = (str) => {
    // Use regular expressions to match complete JSON objects and parse them

    const pattern = /data:\s*({.*?})\s*\n/g
    let match = pattern.exec(str)
    const jsonStr = match[1]
    return JSON.parse(jsonStr)
}
function displaySSEMessage(reader, currentDiv, resultContainer) {
    return new Promise((resolve, reject) => {
        reader.read().then(function processResult(result) {
            // console.log("result:",result)
            if (result.done || !result.value){
                resolve(resultContainer);
                return;
            }
            let sseData = parseValue(result.value)
            // console.log("sseData:",sseData)
            if (sseData.choices[0].hasOwnProperty('finish_reason')) {
                switch (sseData.choices[0].finish_reason){
                    case 'stop':
                        console.log('finish SSE response')
                        break
                    case 'length':
                        console.log('Reach the ceiling of tokens')
                        break
                    case 'sensitive':
                        console.log('The representative model inference content is intercepted by the security audit interface.')
                        break
                    case 'network_error':
                        console.log('Model inference exception')
                        break
                    case 'tool_calls':
                        console.log('Call the function')
                        break
                    default:
                }
                resultContainer.prompt_tokens = sseData.usage.prompt_tokens;
                resultContainer.completion_tokens = sseData.usage.completion_tokens;
                resultContainer.total_tokens = sseData.usage.total_tokens;
            }
            if (resultContainer === null) {
                resultContainer = {response:'', prompt_tokens:0, completion_tokens:0, total_tokens:0};
            }
            const lines = sseData.choices[0].delta.content.split('\n');
            lines.forEach(line => {
                const fragment = line;
                resultContainer.response += fragment;
                if (fragment === '') {
                    currentDiv.appendChild(document.createElement('br'));
                } else {
                    currentDiv.appendChild(document.createTextNode(fragment));
                }

            });
            displaySSEMessage(reader, currentDiv, resultContainer).then(resolve).catch(reject);
        }).catch(reject);
    });
}

// window.Asc.sendRequest = sendRequest;