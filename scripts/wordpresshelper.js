
    var WordpressMeInfoUrl = "https://public-api.wordpress.com/rest/v1/me",
        WordpressSites     = "https://public-api.wordpress.com/rest/v1.2/sites/",
        CodeUrl            = "https://public-api.wordpress.com/oauth2/authorize",
        AccessTokenUrl     = "https://public-api.wordpress.com/oauth2/token";

    var WordpressHelper = function(sToken, sClientID, sClientSecret, sRedirectUri) {
        this.Token        = sToken || '';
        this.ClientID     = sClientID;
        this.ClientSecret = sClientSecret;
        this.RedirectUri  = sRedirectUri;
    };

    async function PerformRequest(sUrl, sMethod, oHeaders, sData) {
        var oParams = {};
        if (oHeaders.length !== 0)
            oParams['headers'] = oHeaders;
        if (sData !== '')
            oParams['data'] = sData;
        oParams['method'] = sMethod;
        oParams['url'] = sUrl;


        var promise = new Promise(function (resolve, reject) {
            $.ajax(oParams
            ).success(function (oResponse) {
                resolve(oResponse);
            })
            .error(function(error) {
                reject(error);
            });
        });
        var result = await promise;
        return result;
    };
    function CreateWordpressPost(sTitle, sContent, sStatus, sBlogId, sToken) {
        var uri = WordpressSites + sBlogId + "/posts/new";
        var method = "POST";
        var body = "title=" + sTitle + "&content=" + sContent + "&status=" + sStatus + "&format=standard";
        var headers = {
            "Authorization": "bearer " + sToken
        };

        return PerformRequest(uri, method, headers, body);
    };
    WordpressHelper.prototype.GetWordpressMeInfo = function() {
        var uri    = WordpressMeInfoUrl;
        var method = "GET";
        var token  = this.Token;

        var headers = {
            "Authorization": "bearer " + token
        };

        return PerformRequest(uri, method, headers, '');
    };

    WordpressHelper.prototype.GetWordpressInfo = async function() {
        var uri = WordpressSites;
        if (this.Token === "")
        {
            return new Error('Invalid token');
        }
        try
        {
            var token    = this.Token;
            var oInfo    = await this.GetWordpressMeInfo();
            var blogId   = oInfo["token_site_id"];

            var wordpressUserName = oInfo["username"];

            var blogInfo         = await PerformRequest(uri + blogId, 'GET', {}, '');
            blogInfo["username"] = wordpressUserName;

            return blogInfo;
        }
        catch (Exception)
        {
            return new Error('Invalid token');
        }
    };
    WordpressHelper.prototype.CreateWordpressPost = async function(sTitle, sContent, sStatus) {
        try
        {
            var token    = this.Token;
            var jsonInfo = await this.GetWordpressMeInfo(token);
            var blogId   = jsonInfo["token_site_id"];

            if (blogId != null)
            {
                var createPost = await CreateWordpressPost(sTitle, sContent, sStatus, blogId, token);
                return createPost;
            }
            return new Error('Invalid token');
        }
        catch (Exception)
        {
            return new Error('Invalid token');
        }
    };