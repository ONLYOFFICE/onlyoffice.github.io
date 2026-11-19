(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory(require("./logger"));
    } else if (typeof define === "function" && define.amd) {
        define(["./logger"], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.DocBuilderHelper = factory(root.MendeleyApp.Logger);
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function (Logger) {

    function log(level, event, data) {
        if (Logger && typeof Logger[level] === "function") {
            Logger[level](event, data);
        } else {
            try {
                console.log(JSON.stringify({
                    timestamp: new Date().toISOString(),
                    level: level,
                    event: event,
                    data: data || {}
                }));
            } catch (e) {}
        }
    }

    function decodeEntities(str) {
        if (!str) return "";
        return str
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, "\"")
            .replace(/&#39;/g, "'")
            .replace(/&apos;/g, "'")
            .replace(/&nbsp;/g, " ")
            .replace(/&ndash;|&#8211;/g, "–")
            .replace(/&mdash;|&#8212;/g, "—")
            .replace(/&#(\d+);/g, function (match, dec) {
                return String.fromCharCode(parseInt(dec, 10));
            })
            .replace(/&#x([0-9a-fA-F]+);/g, function (match, hex) {
                return String.fromCharCode(parseInt(hex, 16));
            });
    }

    function extractEntryStrings(rawHtmlOrEntries) {
        if (!rawHtmlOrEntries) return [];
        if (Array.isArray(rawHtmlOrEntries)) {
            var flat = [];
            for (var i = 0; i < rawHtmlOrEntries.length; i++) {
                var item = rawHtmlOrEntries[i];
                if (typeof item === "string") {
                    var sub = extractEntryStrings(item);
                    flat = flat.concat(sub);
                }
            }
            return flat.length ? flat : rawHtmlOrEntries;
        }

        var html = String(rawHtmlOrEntries).trim();
        var entryRegex = /<div class="csl-entry">([\s\S]*?)<\/div>/gi;
        var matches = [];
        var match;

        while ((match = entryRegex.exec(html)) !== null) {
            if (match[1] && match[1].trim()) {
                matches.push(match[1].trim());
            }
        }

        if (matches.length > 0) return matches;

        var pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
        while ((match = pRegex.exec(html)) !== null) {
            if (match[1] && match[1].trim()) {
                matches.push(match[1].trim());
            }
        }
        if (matches.length > 0) return matches;

        return [html];
    }

    function parseHtmlToRuns(rawHtmlOrEntries) {
        var entryStrings = extractEntryStrings(rawHtmlOrEntries);
        var paragraphs = [];

        for (var i = 0; i < entryStrings.length; i++) {
            var raw = entryStrings[i];
            var runs = [];
            var tagRegex = /<(\/)?([a-zA-Z0-9]+)[^>]*>|([^<]+)/g;
            var isItalic = false;
            var isBold = false;
            var m;

            while ((m = tagRegex.exec(raw)) !== null) {
                if (m[3]) {
                    var decoded = decodeEntities(m[3]);
                    if (decoded) {
                        runs.push({
                            text: decoded,
                            italic: isItalic,
                            bold: isBold
                        });
                    }
                } else if (m[2]) {
                    var isClose = !!m[1];
                    var tag = m[2].toLowerCase();
                    if (tag === "i" || tag === "em") {
                        isItalic = !isClose;
                    } else if (tag === "b" || tag === "strong") {
                        isBold = !isClose;
                    }
                }
            }

            if (runs.length === 0) {
                var clean = decodeEntities(raw.replace(/<[^>]+>/g, "").trim());
                if (clean) {
                    runs.push({ text: clean, italic: false, bold: false });
                }
            }

            if (runs.length > 0) {
                paragraphs.push({ runs: runs });
            }
        }

        log("debug", "DocBuilderHelper.parseHtmlToRuns", { paragraphCount: paragraphs.length });
        return paragraphs;
    }

    function buildBibliographyScript(rawHtmlOrEntries, options) {
        options = options || {};
        var hangingIndent = options.hangingIndent !== false;
        var indentLeft = typeof options.indentLeft === "number" ? options.indentLeft : 720;
        var indentFirstLine = typeof options.indentFirstLine === "number" ? options.indentFirstLine : -720;

        var paragraphs = parseHtmlToRuns(rawHtmlOrEntries);
        if (!paragraphs || paragraphs.length === 0) {
            return buildPlainTextScript(String(rawHtmlOrEntries || "").replace(/<[^>]+>/g, ""));
        }

        var lines = [
            "var oDoc = Api.GetDocument();",
            "var aParas = [];"
        ];

        for (var p = 0; p < paragraphs.length; p++) {
            var pVar = "p" + p;
            lines.push("var " + pVar + " = Api.CreateParagraph();");
            if (hangingIndent) {
                lines.push(pVar + ".SetIndLeft(" + indentLeft + ");");
                lines.push(pVar + ".SetIndFirstLine(" + indentFirstLine + ");");
            }

            var runs = paragraphs[p].runs;
            for (var r = 0; r < runs.length; r++) {
                var run = runs[r];
                var rVar = "r" + p + "_" + r;
                lines.push("var " + rVar + " = " + pVar + ".AddText(" + JSON.stringify(run.text) + ");");
                lines.push(rVar + ".SetItalic(" + (run.italic ? "true" : "false") + ");");
                lines.push(rVar + ".SetBold(" + (run.bold ? "true" : "false") + ");");
            }

            lines.push("aParas.push(" + pVar + ");");
        }

        lines.push("oDoc.InsertContent(aParas);");
        var script = lines.join(" ");
        log("debug", "DocBuilderHelper.buildBibliographyScript", { scriptLength: script.length, hangingIndent: hangingIndent });
        return script;
    }

    function buildPlainTextScript(text) {
        var clean = decodeEntities(String(text || "").replace(/<[^>]+>/g, "").trim());
        var lines = [
            "var oDoc = Api.GetDocument();",
            "var oPara = Api.CreateParagraph();",
            "oPara.AddText(" + JSON.stringify(clean) + ");",
            "oDoc.InsertContent([oPara], true, {KeepTextOnly: true});"
        ];
        return lines.join(" ");
    }

    return {
        decodeEntities: decodeEntities,
        parseHtmlToRuns: parseHtmlToRuns,
        buildBibliographyScript: buildBibliographyScript,
        buildPlainTextScript: buildPlainTextScript
    };
});
