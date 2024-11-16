(function(window, undefined)
{
    window.AI = window.AI || {};
    var AI = window.AI;

    /**
     * name => {
     *   url: "",
     *   models: [],
     *   key: ""
     * }
     */
    AI.providers = {

        "ChatGPT" : 
        {
            url : "https://api.openai.com/v1/",

            models : []
        },

        "Mistral" : 
        {
            url : "https://api.mistral.ai/v1/",

            models : []
        },

        "GPT4All" : 
        {
            url : "http://localhost:4891/v1/",

            models : []            
        }

    };

    /**
     * {
     *   name: "",
     *   provider: ""
     * }
     */
    AI.models = [
        {
            name : "ChatGPT [gpt-3.5-turbo]",
            provider : "ChatGPT"
        }
    ];

    AI.storage = {        
        
        localStorageKey : "onlyoffice_ai_plugin_storage_key",
        isLoad : false,

        save : function() {
            try
            {
                let obj = {
                    providers : AI.providers,
                    models : AI.models
                };

                window.localStorage.setItem(this.localStorageKey, JSON.stringify(obj));

                if (this.onChangeStorage)
                    this.onChangeStorage();
                return true;
            }
            catch (e)
            {
            }
            return false;
        },

        load : function() {
            try
            {
                this.isLoad = true;
                let obj = JSON.parse(window.localStorage.getItem(this.localStorageKey));
                
                if (obj)
                {
                    AI.providers = obj.providers;
                    AI.models = obj.models;
                }

                return true;
            }
            catch (e)
            {
            }
            return false;
        },

        getModels : function() {
            if (!this.isLoad)
                this.load();

            let items = [];
            for (let i in AI.models)
            {
                items.push({
                    id : AI.models[i].name,
                    name : AI.models[i].name
                });
            }

            return items;
        },

        getProviders : function() {
            if (!this.isLoad)
                this.load();

            let items = [];
            for (let i in AI.providers)
            {
                items.push(i);
            }

            return items;
        },

        getProvider : function(name)
        {
            if (!this.isLoad)
                this.load();

            for (let i in AI.providers)
            {
                if (i === providerName)
                    return AI.providers[i];
            }

            return null;
        },

        getProviderUrl : function(providerName) {
            let provider = his
            
            if (!this.isLoad)
                this.load();

            for (let i in AI.providers)
            {
                if (i === providerName)
                    return AI.providers[i].url;
            }

            return "";
        },

        addModel : function(model)
        {
            if (!this.isLoad)
                this.load();

            AI.providers[model.provider.name] = {
                url : model.provider.url,
                models : model.provider.models,
                key : model.provider.key
            };

            let isFoundModel = false;
            for (let i = 0, len = AI.models.length; i < len; i++)
            {
                if (AI.models[i].name === model.name)
                {
                    AI.models[i].provider = model.provider.name;
                    isFoundModel = true;
                }
            }

            if (!isFoundModel)
            {
                AI.models.push({
                    name : model.name,
                    provider : model.provider.name
                });
            }

            this.save();
        },

        removeModel : function(modelName)
        {
            for (let i = 0, len = AI.models.length; i < len; i++)
            {
                if (AI.models[i].name === modelName)
                {
                    AI.models.splice(i, 1);
                    this.save();
                    return;
                }
            }
        },

        getModel : function(modelName)
        {
            for (let i = 0, len = AI.models.length; i < len; i++)
            {
                if (AI.models[i].name === modelName)
                    return AI.models[i];
            }
            return null;
        }
    };

    AI.getModels = function(provider)
    {
        return new Promise(function (resolve, reject) {
            let headers = {};
            headers["Content-Type"] = "application/json";
            if (provider.key)
                headers["Authorization"] = "Bearer " + provider.key;

            requestWrapper({
                url : provider.url + "models",
                headers : headers,
                method : "GET"
            }).then(function(data) {
                    if (data.error)
                        resolve(data);
                    else
                    {
                        resolve(data);
                    }
                });
        });
    };

    AI.chatRequest = function(model, content_data)
    {
        return new Promise(function (resolve, reject) {
            let headers = {};
            headers["Content-Type"] = "application/json";
            if (model.options.key)
                headers["Authorization"] = "Bearer " + key;

            let max_tokens = 0;
            if (model.options.max_tokens)
            {
                let tokens_content = window.Asc.OpenAIEncode(content_data);
                max_tokens = model.options.max_tokens - tokens_content.length;
            }

            return requestWrapper({
                url : provider.url + "chat/completions",
                headers : headers,
                method : "POST",
                body: {
                    max_tokens : max_tokens,
                    model : model.model,
                    messages:[{role:"user",content:content_data}]
                }
            }).then(function(data){
                    if (data.error)
                        resolve("")
                    else
                    {
                        text = data.data.choices[0].message.content;
                        let i = 0; let trimStartCh = "\n".charCodeAt(0);
                        while (text.charCodeAt(i) === trimStartCh)
                            i++;
                        if (i > 0)
                            text = text.substring(i);
                        resolve(text);
                    }
                });
        });
    };

    function requestWrapper(message)
    {
        return new Promise(function (resolve, reject) {
            if (window["AscDesktopEditor"] && window["AscDesktopEditor"]["IsLocalFile"]())
            {
                window.AscSimpleRequest.createRequest({
                    url: message.url,
                    method: message.method,
                    headers: message.headers,
                    body: message.isBlob ? message.body : (message.body ? JSON.stringify(message.body) : ""),
                    complete: function(e, status) {
                        resolve({error: 0, data: JSON.parse(e.responseText)});
                    },
                    error: function(e, status, error) {
                        if ( e.statusCode == -102 ) e.statusCode = 404;
                        resolve({error: e.statusCode, data: null});
                    }
                });
                
            }
            else
            {
                let request = {
                    method: message.method,
                    headers: message.headers
                };
                if (request.method != "GET")
                    request.body = message.isBlob ? message.body : (message.body ? JSON.stringify(message.body) : "");

                fetch(message.url, request)
                    .then(function(response) {
                        return response.json()
                    })
                    .then(function(data) {
                        if (data.error)
                            resolve({error: 1, data: null});
                        else
                            resolve({error: 0, data: data});
                    })
                    .catch(function(error) {
                        resolve({error: 1, data: null});                        
                    });
            }
        });
    }

})(window);
