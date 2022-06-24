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

var urlProxy         = 'https://onlyoffice-proxy.herokuapp.com/';
var searchBookUrl    = "https://worldcat.citation-api.com/query?search=",
    searchJournalUrl = "https://crossref.citation-api.com/query?search=",
    searchWebSiteUrl = "https://web.citation-api.com/query?search=",
    easyBibStyles    = "https://api.citation-api.com/2.1/rest/styles";

var EasyBibHelper = function(sApiKey) {
    this.apiKey           = sApiKey;
};

async function PerformRequest(sUrl, sMethod, oHeaders, sData) {
    var oParams = {};
    if (oHeaders.length !== 0)
        oParams['headers'] = oHeaders;
    if (sData !== '')
        oParams['data'] = sData;
    oParams['method'] = sMethod;
    oParams['url'] = urlProxy + sUrl;

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