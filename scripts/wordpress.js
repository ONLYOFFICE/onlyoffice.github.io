/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
(function (window, undefined) {
    var wordpress = null;
    var post = null;

    OAuthError = function(error, ttt) {
        console.log(arguments);
    };
    var docElements  = {};
    var clientID  = '';
    var clientSecret = '';

    var authFlow = {
        authenticate: function () {
            //showLoader(true);

            loginStateHash = new Date().getTime();

            var link = "https://public-api.wordpress.com/oauth2/authorize?client_id=" + clientID + "&redirect_uri=" + encodeURIComponent(redirectUrl) + "&response_type=code";
            if (window.Asc.plugin.mendeley && window.Asc.plugin.mendeley.auth) {
                link = window.Asc.plugin.mendeley.auth();
            }

            var wnd = window.open(link, null, "width=500,height=700");
            var timer = setInterval(function () {
                if (wnd.closed) {
                    clearInterval(timer);
                    //showLoader(false);
                }
            }, 500);
        },
        getToken: function () {
            var matches = document.cookie.match(new RegExp("(?:^|; )mendToken=([^;]*)"));
            return matches ? decodeURIComponent(matches[1]) : null;
        },
        refreshToken: function () {
            return false;
        }
    };
    OAuthCallback = async function (sCode) {
        var data = 'code=' + sCode + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&redirect_uri=' + redirectUrl + '&grant_type=authorization_code';
        var oBlogInfo = null;
        jQuery.ajax( {
            url: 'https://onlyoffice-proxy.herokuapp.com/https://public-api.wordpress.com/oauth2/token',
            type: 'POST',
            data: data,
            success: function( response ) {
                document.cookie = "mendToken=" + response.access_token + "; max-age=43200";
                wordpress = new WordpressHelper(response.access_token);
                localStorage.setItem('wordpress-access-token', response.access_token);
                (async function Temporary() {
                    oBlogInfo = await wordpress.GetWordpressInfo();
                    $(docElements.loginState).hide();
                    updateForm(oBlogInfo);
                }());
            },
            error: function(err) {
                console.log(err);
            }
        });

    };
    window.Asc.plugin.init = function (html) {
        docElements = {
            configState: document.getElementById("configState"),
            redirectConfigUrl: document.getElementById("redirectConfig"),
            redirectUrlCopy: document.getElementById("redirectUrlCopy"),
            reconfigBtn: document.getElementById("reconfigBtn"),
            appIdField: document.getElementById("appIdField"),
            appSecretField: document.getElementById("appSecretField"),
            saveConfigBtn: document.getElementById("saveConfigBtn"),

            loginState: document.getElementById("loginState"),
            loginBtn: document.getElementById("loginBtn"),
        };
        redirectUrl = document.location.protocol + "//" + document.location.host + document.location.pathname.replace("index.html", "oauth.html");
        docElements.redirectConfigUrl.value = redirectUrl;

        $(docElements.redirectConfigUrl).focus(function(){
            if(this.value !== this.defaultValue){
                this.select();
            }
        });
        $(docElements.appIdField).focus(function(){
            if(this.value !== this.defaultValue){
                this.select();
            }
        });
        $(docElements.appSecretField).focus(function(){
            if(this.value !== this.defaultValue){
                this.select();
            }
        });

        $('#publish').on('click', function() {
            if (post == null) {
                showButtons(false);
                post = {
                    title: $('#title')[0].value,
                    status: 1 //publish status code
                };
                window.Asc.plugin.executeMethod("GetFileHTML", []);
            }
        });
        $('#draft').on('click', function () {
            if (post == null) {
                showButtons(false);
                post = {
                    title: $('#title')[0].value,
                    status: 0 //draft status code
                };
                window.Asc.plugin.executeMethod("GetFileHTML", []);
            }
        });
        $('#saveConfigBtn').click(function() {
            if (docElements.appIdField.value.trim() !== '' && docElements.appSecretField.value.trim() !== '') {
                clientID     = docElements.appIdField.value.trim();
                clientSecret = docElements.appSecretField.value.trim();
                localStorage.setItem('wordpress-client-id', clientID);
                localStorage.setItem('wordpress-client-secret', clientSecret);
                $(docElements.configState).hide();
                $(docElements.loginState).show();
            }
        });
        $(docElements.redirectUrlCopy).click(function () {
            docElements.redirectConfigUrl.select();
            document.execCommand("copy");
            window.open("https://developer.wordpress.com/apps/new/", '_blank');
        });
        $(docElements.reconfigBtn).click(function() {
            if (clientID)
                docElements.appIdField.value = clientID;
            if (clientSecret)
                docElements.appSecretField.value = clientSecret;
            $(docElements.configState).show();
            $(docElements.loginState).hide();
        });
        $(docElements.loginBtn).click(function() {
            authFlow.authenticate();
        });
        $('#logout').click(function() {
            $('#publish-form').hide();
            $(docElements.loginState).show();
            $(this).hide();
        });

        getBlogInfo();
        window.Asc.plugin.onTranslate = applyTranslations;
    };
    window.Asc.plugin.onThemeChanged = function(theme)
    {
        window.Asc.plugin.onThemeChangedBase(theme);
        $('#body').css('color', window.Asc.plugin.theme.Color);
        $('#logout_label').css('border-bottom', '1px dashed ' + window.Asc.plugin.theme.Color);
    };
    window.Asc.plugin.onMethodReturn = function (returnValue) {
        var _plugin = window.Asc.plugin;
        if (_plugin.info.methodName == "GetFileHTML") {
            if (post != null) {

                var content = returnValue.replace(/&nbsp;/gi, '');

                content = content.replace(/&apos;/gi, '\'');
                post.content = content;

                sentToWordpress(post);
            }
        }
    };
    window.Asc.plugin.button = function (id) {
        this.executeCommand("close", '');
    };

    function applyTranslations() {
        var elements = document.getElementsByClassName("i18n");

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if (el.attributes["placeholder"]) el.attributes["placeholder"].value = getMessage(el.attributes["placeholder"].value);
            if (el.innerText) el.innerText = getMessage(el.innerText);
        }
    }

    function getMessage(key) {
        return window.Asc.plugin.tr(key);
    }

    async function sentToWordpress(data) {
        var result = await wordpress.CreateWordpressPost(data.title, data.content, data.status);

        if (!(result instanceof Error)) {
            $('#title')[0].value = "";
            if (post.status == 0)
                alert(getMessage("The current document was successfully saved on the website"));
            else
                alert(getMessage("The current document was successfully published on the website"));
                showButtons(true);
        }
        else {
            alert("Error");
        }
        post = null;
    };

    function getBlogInfo() {
        var access_token = localStorage.getItem('wordpress-access-token');
        clientID         = localStorage.getItem('wordpress-client-id');
        clientSecret     = localStorage.getItem('wordpress-client-secret');
        if (access_token) {
            wordpress     = new WordpressHelper(access_token);
            var oBlogInfo = null;

            (async function Temporary() {
                oBlogInfo = await wordpress.GetWordpressInfo();
                $(docElements.loginState).hide(0, $(docElements.configState).hide(0, updateForm(oBlogInfo)));
                $('#logout').show();
                return true;
            }());
        }

        if (clientID && clientSecret) {
            $(docElements.configState).hide();
            $(docElements.loginState).show();
        }
        $('#main-container').addClass('unauthorized');
        $('#main-container').removeClass('authorized');
    };

    function updateForm(data) {
        if (!(data instanceof Error)) {
            $('#publish-form').show();
            $('#logout').show();
            var info = data;
            var host = new URL(info.URL).host;
            showButtons(true);
            $('#main-container').addClass('authorized');
            $('#main-container').removeClass('unauthorized');
            $('.blog p.blog-url').html(host);
            $('.blog p.username').html("@"+info.username);
        }else{
            $('#main-container').addClass('unauthorized');
            $('#main-container').removeClass('authorized');
        }
    };

    function showButtons(show){
        if(show){
            $('#publish-form .publish button').prop( "disabled", false );
            $('#publish-form .publish button').css('opacity', 1);
        }else{
            $('#publish-form .publish button').prop( "disabled", true );
            $('#publish-form .publish button').css( "opacity", 0.5 );
        }
    }
})(window);