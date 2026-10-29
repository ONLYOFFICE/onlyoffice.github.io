(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.CslConverter = factory();
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {

    function convertMendeleyWriter(csl, item, fieldTo, fieldFrom) {
        if (!item[fieldFrom] || item[fieldFrom].length <= 0) return;
        if (!csl[fieldTo]) csl[fieldTo] = [];

        for (var i = 0; i < item[fieldFrom].length; i++) {
            var writer = item[fieldFrom][i];
            if (writer) {
                csl[fieldTo].push({
                    given: writer.first_name || writer.given || "",
                    family: writer.last_name || writer.family || ""
                });
            }
        }
    }

    function convertMendeleyDate(csl, item, field) {
        if (!item.year) return;

        var date = [item.year];

        if (item.month) {
            date.push(item.month);
            if (item.day) {
                date.push(item.day);
            }
        }

        csl[field] = {
            "date-parts": [
                date
            ]
        };
    }

    function convertMendeleyTypeToCSLType(str) {
        str = (str || "").toLowerCase();
        switch (str) {
            case "bill":
            case "book":
            case "patent":
            case "report":
            case "statute":
            case "thesis":
                return str;
            case "book_section":
                return "chapter";
            case "conference_proceedings":
                return "paper-conference";
            case "encyclopedia_article":
                return "entry-encyclopedia";
            case "film":
                return "motion_picture";
            case "hearing":
                return "speech";
            case "journal":
                return "article-journal";
            case "magazine_article":
                return "article-magazine";
            case "newspaper_article":
                return "article-newspaper";
            case "television_broadcast":
                return "broadcast";
            case "web_page":
                return "webpage";
            case "case":
            case "computer_program":
            case "generic":
            case "working_paper":
            default:
                return "article";
        }
    }

    function convertMendeleyToCSL(item) {
        if (!item) return {};
        var cslData = {};

        if (item.citation_key) {
            cslData.id = item.citation_key;
        } else {
            cslData.id = item.id;
        }

        cslData.type = convertMendeleyTypeToCSLType(item.type);

        convertMendeleyWriter(cslData, item, "author", "authors");

        convertMendeleyWriter(cslData, item, "editor", "editors");
        convertMendeleyWriter(cslData, item, "collection-editor", "editors");
        convertMendeleyWriter(cslData, item, "container-author", "editors");

        convertMendeleyWriter(cslData, item, "collection-editor", "series_editor");
        convertMendeleyWriter(cslData, item, "container-author", "series_editor");

        convertMendeleyWriter(cslData, item, "translators", "translators");

        convertMendeleyDate(cslData, item, "issued");
        convertMendeleyDate(cslData, item, "event-date");

        if (item.revision || item.series_number) {
            cslData.number = item.revision || item.series_number;
        }

        if (item.series) cslData["collection-title"] = item.series;
        if (item.source) cslData["container-title"] = item.source;

        if (item.type === "patent" && item.source) {
            cslData.publisher = item.source;
        } else if (item.publisher) {
            cslData.publisher = item.publisher;
        }

        if (item.identifiers) {
            if (item.identifiers.doi) cslData.DOI = item.identifiers.doi;
            if (item.identifiers.isbn) cslData.ISBN = item.identifiers.isbn;
            if (item.identifiers.issn) cslData.ISSN = item.identifiers.issn;
            if (item.identifiers.pmid) cslData.PMID = item.identifiers.pmid;
        }

        if (item.keywords) {
            cslData.keyword = item.keywords.toString();
        }

        if (item.websites && item.websites.length > 0) {
            cslData.URL = item.websites[0];
        }

        if (item.abstract) cslData.abstract = item.abstract;
        if (item.chapter) cslData["chapter-number"] = item.chapter;
        if (item.city) {
            cslData["event-place"] = item.city;
            cslData["publisher-place"] = item.city;
        }
        if (item.edition) cslData.edition = item.edition;
        if (item.genre) cslData.genre = item.genre;
        if (item.issue) cslData.issue = item.issue;
        if (item.language) cslData.language = item.language;
        if (item.medium) cslData.medium = item.medium;
        if (item.short_title) cslData["short-title"] = item.short_title;
        if (item.title) cslData.title = item.title;
        if (item.volume) cslData.volume = item.volume;

        return cslData;
    }

    return {
        convertMendeleyWriter: convertMendeleyWriter,
        convertMendeleyDate: convertMendeleyDate,
        convertMendeleyTypeToCSLType: convertMendeleyTypeToCSLType,
        convertMendeleyToCSL: convertMendeleyToCSL
    };
});
