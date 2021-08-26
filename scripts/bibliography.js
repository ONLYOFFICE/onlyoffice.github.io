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

function Bibliography() {
    this.searchOptions = {
        source: 0,
        value: '',
        style: ''
    };
    this.bibliography = [];
    this.bibliographyText = [];
    this.localStorageKey = "Bibliography";
};

Bibliography.prototype.showBookSearchResult = function (results) {
    for (key in results) {
        var title = results[key].display.title;
        var description = "";
        var contributors = results[key].data.contributors;
        contributors.forEach(function (contributors_item) {
            if (description != "") {
                description += ", " + contributors_item.first + " " + contributors_item.last;
            } else {
                description += contributors_item.first + " " + contributors_item.last;
            }
        });
        if (results[key].display.publisher) {
            description += " - " + results[key].display.publisher;
        }
        if (results[key].display.year) {
            description += " - " + results[key].display.year;
        }
        createSearchItem(title, description, key);
    }
};
Bibliography.prototype.showJournalSearchResult = function(results) {
    results.forEach(function(results_item, i) {
        var title = results_item.data.journal.title;
        var description = results_item.data.pubjournal.title;
        createSearchItem(title, description, i);
    });
};
Bibliography.prototype.showWebSiteSearchResult = function (results) {

        var urlSearchResult;
        results.forEach(function(results_item, i) {
            try {
                urlSearchResult = new URL(results_item.display.displayurl).hostname;

            } catch(error) {
                urlSearchResult = results_item.display.displayurl;
            }
            createSearchItem(results_item.display.title + "(" + results_item.display.displayurl + ")", results_item.display.summary, i);
        });
    };


Bibliography.prototype.createCitations = function (id, data, oEasybibHelper) {
    var biblist = this;
    if (oEasybibHelper) {
        (async function Temporary() {
            var oResponse = await oEasybibHelper.GetEasyBibCitation(JSON.stringify(data));
            if (!(oResponse instanceof Error)) {
                if (oResponse.status === 'ok') {
                    biblist.bibliographyText.push({
                        id: id,
                        data: oResponse.data
                    });
                    createBibItem(id, oResponse.data);
                }
            }
            else {
                console.log(oResponse);
            }
        })();
    }
};
Bibliography.prototype.updateCitations = function (id, data, oEasybibHelper) {
    var biblist = this;
    if (oEasybibHelper) {
        (async function Temporary() {
            var oResponse = await oEasybibHelper.GetEasyBibCitation(JSON.stringify(data));
            if (!(oResponse instanceof Error)) {
                if (oResponse.status === 'ok') {
                    if (biblist.bibliographyText.length > 0) {
                        biblist.bibliographyText.forEach(function (item) {
                            if (item.id == id) {
                                item.data = oResponse.data;
                            }
                        });
                    }
                    createBibItem(id, oResponse.data);
                }
            }
            else {
                console.log(oResponse);
            }
        })();
    }
};
Bibliography.prototype.getCitation = function (id, foundData, bibliographyStorage, fileId, oEasybibHelper) {
    var biblist = this;
    var source = foundData.results[id];
    var data;
    switch (this.searchOptions.source) {
    case 0:
        data = {
            style: $('#styles option:selected').val() ? $('#styles option:selected').val() : "3d-research",
            pubtype: source.data.pubtype,
            pubnonperiodical: source.data.pubnonperiodical,
            contributors: source.data.contributors,
            other: source.data.other,
            source: source.data.source
        };
        break;
    case 1:
        data = {
            style: $('#styles option:selected').val() ? $('#styles option:selected').val() : "3d-research",
            pubtype: source.data.pubtype,
            pubjournal: source.data.pubjournal,
            publication_type: source.data.publication_type,
            contributors: source.data.contributors,
            other: source.data.other,
            source: source.data.source
        };
        break;
    case 2:
        source.data.pubonline.url = source.display.displayurl;
        data = {
            style: $('#styles option:selected').val() ? $('#styles option:selected').val() : "3d-research",
            autocite: source.display.displayurl,
            pubtype: source.data.pubtype,
            pubonline: source.data.pubonline,
            other: source.data.other,
            website: source.data.website,
            source: source.data.source
        };
        break;
    default:
        break;
    };

    if (oEasybibHelper) {
        (async function Temporary() {
            var oResponse = await oEasybibHelper.GetEasyBibCitation(JSON.stringify(data));
            if (!(oResponse instanceof Error)) {
                if (oResponse.status === 'ok') {
                    saveCitation.call(biblist, oResponse, data, bibliographyStorage, fileId);
                } else if (oResponse.status === 'error') {
                    alert("ERROR. " + oResponse.msg);
                }
                return true;
            }
            else {
                console.log(oResponse);
            }
        })();
    }
};
Bibliography.prototype.fillListStyles = function (styles, bibliographyStyle) {
    var selectStyles = $('#styles');
    for (var style in styles) {
        var value = styles[style];
        selectStyles[0].options[selectStyles[0].options.length] = new Option(value, style);
    }
    $("#styles :first").remove();
    selectStyles.attr('disabled', false);
    if (bibliographyStyle) {
        $("#styles option[value=" + bibliographyStyle + "]").attr('selected', 'true');
    }
};

function escapeHtml(str) {
    if (str) return $('<div />').text(str).html();
    else return null;
};

function createSearchItem(title, description, id) {
    var searchResult = $("#search_result");

    $("#search_result").show();
    $(".result-container .search-title").show();
    $(".result-container .bibliography-title").hide();
    $("#bib").hide();

    searchResult.show();
    var item =
    "<div class=\"search-item\" id=\"" + id + "\">" +
      "<div class = \"citation\">" +
        "<h4 style=\"overflow-x: hidden;margin:0\">" + escapeHtml(title) + "</h4>" +
        "<p style=\";margin:0\">" + escapeHtml(description) + "</p>" +
      "</div>" +
      "<div class=\"add-button-container\">" +
        "<div class=\"add-button\" onclick=\"addItem(this)\"></div>" +
      "</div>" +
    "</div>";
    $('#titleContent').text('Your Search Results');
    searchResult.append(item);
};
function createBibItem(id, data) {
    var item = "<div class=\"bibliography-part\">" +
        "<div class=\"bibliography-part-data\">" + escapeHtml(data) + "</div>" +
        "<div class=\"del-button-container\">" +
            "<div onclick=\"delBibliographyPart(this)\" id=bibliography-path_" + escapeHtml(id) + " class=\"del-bibliography-part\"></div>" +
        "</div>" +
        "</br>";
    $('#bib').append(item);
};
function saveCitation(citation, data, bibliographyStorage, fileId) {
    var id, bibliographyItem;
    if (this.bibliography.length > 0) {
        id = this.bibliography[this.bibliography.length - 1].id + 1;
    } else {
        id = 1;
    }
    bibliographyItem = {
        id: id,
        data: data
    };
    this.bibliography.push(bibliographyItem);
    this.bibliographyText.push({ id: id, data: citation.data });

    $("#search_result").empty();
    $("#search_result").hide();
    $(".result-container .search-title").hide();
    $(".result-container .bibliography-title").show();
    $("#bib").show();

    createBibItem(id, citation.data);
    if (!localStorageManager.isAvailable || fileId == null) {
        return null;
    } else {
        if (bibliographyStorage) {
            bibliographyStorage[fileId] = this.bibliography;
            localStorageManager.setItem(this.localStorageKey, bibliographyStorage);

        } else {
            bibliographyStorage = {};
            bibliographyStorage[fileId] = this.bibliography;
            localStorageManager.setItem(this.localStorageKey, bibliographyStorage);
        }
    }

};
