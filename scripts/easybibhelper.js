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