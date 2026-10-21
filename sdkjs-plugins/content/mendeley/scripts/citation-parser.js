(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory(require("./csl-converter"));
    } else if (typeof define === "function" && define.amd) {
        define(["./csl-converter"], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.CitationParser = factory(root.MendeleyApp.CslConverter);
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function (CslConverter) {

    var allMendeleyDocsCache = [];

    function fetchAllMendeleyDocs() {
        if (allMendeleyDocsCache.length > 0) {
            return Promise.resolve(allMendeleyDocsCache);
        }
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var token = (app.Auth && app.Auth.authFlow && app.Auth.authFlow.getToken && app.Auth.authFlow.getToken()) || null;
        if (!token) return Promise.resolve([]);

        return fetch("https://api.mendeley.com/documents?view=all&limit=200", {
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/vnd.mendeley-document.1+json"
            }
        })
        .then(function (r) { return r.json(); })
        .then(function (docs) {
            if (Array.isArray(docs)) {
                allMendeleyDocsCache = docs;
            }
            return allMendeleyDocsCache;
        })
        .catch(function () {
            return allMendeleyDocsCache;
        });
    }

    function findCitationsInTextAndLibrary(docText) {
        if (!docText || typeof docText !== "string") {
            return Promise.resolve({ cslItems: {}, ids: [] });
        }

        var citPattern = /\(([^\)]*?\b(19\d\d|20\d\d)\b[^\)]*?)\)/g;
        var targets = [];
        var match;
        while ((match = citPattern.exec(docText)) !== null) {
            var rawInside = match[1] || "";
            var yearMatch = rawInside.match(/\b(19\d\d|20\d\d)\b/);
            if (!yearMatch) continue;
            var year = parseInt(yearMatch[1], 10);
            var authorPart = rawInside.split(yearMatch[1])[0] || "";
            var authorWordMatch = authorPart.match(/([A-Z\u00C0-\u024F][a-zA-Z\u00C0-\u024F\.\-]+)/);
            var authorKeyword = authorWordMatch ? authorWordMatch[1].toLowerCase().replace(/[^a-z]/g, "") : "";
            if (authorKeyword && authorKeyword !== "et" && authorKeyword !== "al") {
                targets.push({ author: authorKeyword, year: year });
            }
        }

        if (!targets.length) {
            return Promise.resolve({ cslItems: {}, ids: [] });
        }

        return fetchAllMendeleyDocs().then(function (docs) {
            var cslItems = {};
            var ids = [];
            var seenIds = {};

            targets.forEach(function (t) {
                for (var i = 0; i < docs.length; i++) {
                    var d = docs[i];
                    if (!d || !d.id || seenIds[d.id]) continue;
                    var docYear = parseInt(d.year, 10);
                    if (docYear === t.year) {
                        var authors = d.authors || [];
                        var authorMatched = false;
                        for (var a = 0; a < authors.length; a++) {
                            var ln = (authors[a].last_name || authors[a].family || "").toLowerCase().replace(/[^a-z]/g, "");
                            if (ln && (ln.indexOf(t.author) !== -1 || t.author.indexOf(ln) !== -1)) {
                                authorMatched = true;
                                break;
                            }
                        }
                        if (authorMatched) {
                            seenIds[d.id] = true;
                            cslItems[d.id] = CslConverter ? CslConverter.convertMendeleyToCSL(d) : d;
                            ids.push(d.id);
                            break;
                        }
                    }
                }
            });

            return { cslItems: cslItems, ids: ids };
        });
    }

    return {
        fetchAllMendeleyDocs: fetchAllMendeleyDocs,
        findCitationsInTextAndLibrary: findCitationsInTextAndLibrary
    };
});
