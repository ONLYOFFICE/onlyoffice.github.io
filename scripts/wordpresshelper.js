/*
 * (c) Copyright Ascensio System SIA 2010
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

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