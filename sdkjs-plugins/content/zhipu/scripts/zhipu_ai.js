function sendRequest(prompt) {
    const token = window.Asc.JWT;
    const model = localStorage.getItem('model');
    const async_url = `https://open.bigmodel.cn/api/paas/v3/model-api/${model}/async-invoke`;
    console.log("请求url：", async_url)
    return new Promise((resolve, reject) => {
        try {
            fetch(async_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(prompt),
            })
            .then(res => res.json())
            .then(data => {
                if(data.code === 200) {
                    console.log("请求成功：", data);
                }else {
                    console.log("请求失败：", data);
                }

                const task_id = data.data.task_id;
                // searchTask now needs to resolve to the content you want
                searchTask(task_id)
                .then(content => resolve(content))
                .catch(err => reject(err));
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
        }
        catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

function searchTask(task_id) {
    const token = window.Asc.JWT;
    return new Promise((resolve, reject) => {
        try {
            fetch('https://open.bigmodel.cn/api/paas/v3/model-api/-/async-invoke/' + task_id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(res => res.json())
            .then(resData => {
                if (resData.data && resData.data.choices && resData.data.choices[0]) {
                    console.log(resData.data.choices[0].content);
                    resolve(resData.data.choices[0].content);
                } else {
                    console.log("No content yet, retrying...");
                    setTimeout(() => {
                        searchTask(task_id)
                        .then(content => resolve(content))
                        .catch(err => reject(err));
                    }, 3000);  // Wait for 3 seconds before retrying
                }
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
        }
        catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

window.Asc.sendRequest = sendRequest;