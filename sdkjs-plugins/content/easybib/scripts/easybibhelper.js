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

var urlProxy         = 'https://plugins-services.onlyoffice.com/proxy';
var searchBookUrl    = "https://worldcat.citation-api.com/query?search=",
    searchJournalUrl = "https://crossref.citation-api.com/query?search=",
    searchWebSiteUrl = "https://web.citation-api.com/query?search=",
    easyBibStyles    = "https://api.citation-api.com/2.1/rest/styles";

var EasyBibHelper = function(sApiKey) {
    this.apiKey           = sApiKey;
};

async function PerformRequest(sUrl, sMethod, oHeaders, sData) {
    var promise = new Promise(function (resolve, reject) {
        $.ajax({
            method: 'POST',
            contentType: "text/plain",
            data: JSON.stringify({
                "headers": oHeaders,
                "data": sData,
                "method": sMethod,
                "target": sUrl
            }),
            url: urlProxy
        }).success(function (oResponse) {
            resolve(oResponse);
        })
        .error(function(error) {
            reject(error);
        });
    });
    var result = await promise;
    return result;
};

EasyBibHelper.prototype.GetEasyBibCitationsList = async function(nSource,  sData) {
    var uri = "";
    switch (nSource)
    {
        case 0:
            uri = searchBookUrl;
            break;
        case 1:
            uri = searchJournalUrl;
            break;
        case 2:
            uri = searchWebSiteUrl;
            break;
        default:
            break;
    }
    uri += sData;

    var method = "GET";

    try {
        var oResponse = await PerformRequest(uri, method, {}, "");
        return oResponse;
    }
    catch (Exception) {
        return new Error('Error!');
    }
};
EasyBibHelper.prototype.GetEasyBibStyles = async function() {
    var uri             = easyBibStyles;
    var method          = "GET";

    try {
        var oResponse = await PerformRequest(uri, method, {}, "");
        return oResponse;
    }
    catch (Exception) {
        return new Error('Error!');
    }
};
EasyBibHelper.prototype.GetEasyBibCitation = async function(sJsonData) {

    var jsonBlogInfo    = JSON.parse(sJsonData);
    var uri             = "https://api.citation-api.com/2.0/rest/cite";
    var contentType     = "application/json";
    var method          = "POST";
    jsonBlogInfo["key"] = this.apiKey;
    var citationData    = JSON.stringify(jsonBlogInfo);

    var headers = {
        "Content-Type" : "application/json"
    };

    try {
        var oResponse = await PerformRequest(uri, method, headers, citationData);
        return oResponse;
    }
    catch (Exception) {
        return new Error('Error!');
    }
};