/**
 * DocumentModule and Adapters for ONLYOFFICE Citation Management
 */
(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory(require("./docbuilder-helper"));
    } else if (typeof define === "function" && define.amd) {
        define(["./docbuilder-helper"], factory);
    } else {
        var helper = root.DocBuilderHelper || (root.MendeleyApp && root.MendeleyApp.DocBuilderHelper);
        var exp = factory(helper);
        root.DocumentModule = exp.DocumentModule;
        root.OnlyOfficeAdapter = exp.OnlyOfficeAdapter;
        root.InMemoryAdapter = exp.InMemoryAdapter;
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function (DocBuilderHelper) {

    function log(level, event, data) {
        var payload = {
            timestamp: new Date().toISOString(),
            level: level,
            event: event,
            data: data || {}
        };
        try {
            console.log(JSON.stringify(payload));
        } catch (e) {
            console.log(level + ": " + event);
        }
    }

    function encodeBase64(str) {
        if (typeof Buffer !== "undefined") {
            return Buffer.from(str, "utf8").toString("base64");
        }
        return btoa(unescape(encodeURIComponent(str)));
    }

    function decodeBase64(b64) {
        if (typeof Buffer !== "undefined") {
            return Buffer.from(b64, "base64").toString("utf8");
        }
        return decodeURIComponent(escape(atob(b64)));
    }

    var TAG_PREFIX = "MENDELEY_CITATION_v3_";
    var BIB_TAG = "MENDELEY_BIBLIOGRAPHY";

    function InMemoryAdapter() {
        this.controls = [];
        this.nextId = 1;
        this.footnotesCount = 0;
    }

    InMemoryAdapter.prototype.getAllContentControls = function () {
        var list = this.controls.map(function (c) {
            return {
                InternalId: c.internalId,
                Tag: c.tag
            };
        });
        log("debug", "InMemoryAdapter.getAllContentControls", { count: list.length });
        return Promise.resolve(list);
    };

    InMemoryAdapter.prototype.addAddinField = function (field) {
        var rawTag = field.Value || "";
        var tag = rawTag.replace(/^ITEM /, "");
        var control = {
            internalId: "inmem_ctrl_" + this.nextId++,
            tag: tag,
            text: field.Content || "",
            html: field.Content || ""
        };
        this.controls.push(control);
        log("info", "InMemoryAdapter.addAddinField", { internalId: control.internalId, tag: tag });
        return Promise.resolve(control.internalId);
    };
    InMemoryAdapter.prototype.addContentControl = function (type, properties, content, isHtml, options) {
        var control = {
            internalId: "inmem_ctrl_" + this.nextId++,
            tag: properties.Tag || "",
            placeHolderText: properties.PlaceHolderText,
            text: isHtml ? String(content || "").replace(/<[^>]+>/g, "") : (content || ""),
            html: content || "",
            lock: properties.Lock,
            type: type,
            options: options || {}
        };
        this.controls.push(control);
        log("info", "InMemoryAdapter.addContentControl", { internalId: control.internalId, tag: control.tag });
        return Promise.resolve(control.internalId);
    };

    InMemoryAdapter.prototype.addFootnote = function () {
        this.footnotesCount++;
        log("debug", "InMemoryAdapter.addFootnote", { totalFootnotes: this.footnotesCount });
        return Promise.resolve();
    };
    InMemoryAdapter.prototype.addNoteCitation = function (tag, renderedText) {
        this.footnotesCount++;
        var cleanText = String(renderedText || "").replace(/<[^>]+>/g, "");
        var control = {
            internalId: "inmem_ctrl_" + this.nextId++,
            tag: tag,
            placeHolderText: cleanText,
            text: cleanText,
            html: renderedText,
            type: 2,
            isNoteStyle: true
        };
        this.controls.push(control);
        log("info", "InMemoryAdapter.addNoteCitation", { internalId: control.internalId, tag: control.tag });
        return Promise.resolve(control.internalId);
    };

    InMemoryAdapter.prototype.updateControlText = function (internalId, text) {
        for (var i = 0; i < this.controls.length; i++) {
            if (this.controls[i].internalId === internalId) {
                this.controls[i].text = text;
                log("info", "InMemoryAdapter.updateControlText", { internalId: internalId, length: text.length });
                return Promise.resolve();
            }
        }
        log("warn", "InMemoryAdapter.updateControlText.notFound", { internalId: internalId });
        return Promise.resolve();
    };

    InMemoryAdapter.prototype.updateControlHtml = function (internalId, html, options) {
        for (var i = 0; i < this.controls.length; i++) {
            if (this.controls[i].internalId === internalId) {
                this.controls[i].html = html;
                if (options != null) this.controls[i].options = options;
                log("info", "InMemoryAdapter.updateControlHtml", { internalId: internalId, length: html.length });
                return Promise.resolve();
            }
        }
        log("warn", "InMemoryAdapter.updateControlHtml.notFound", { internalId: internalId });
        return Promise.resolve();
    };

    InMemoryAdapter.prototype.removeContentControl = function (internalId) {
        var beforeLen = this.controls.length;
        this.controls = this.controls.filter(function (c) {
            return c.internalId !== internalId;
        });
        log("info", "InMemoryAdapter.removeContentControl", { internalId: internalId, removed: beforeLen !== this.controls.length });
        return Promise.resolve();
    };
    InMemoryAdapter.prototype.getDocumentText = function () {
        return Promise.resolve(this.docText || "");
    };

    InMemoryAdapter.prototype.unlockManagedContentControls = function () {
        return Promise.resolve();
    };

    OnlyOfficeAdapter.prototype.unlockManagedContentControls = function () {
        return new Promise(function (resolve, reject) {
            if (typeof window === "undefined" || !window.Asc || !window.Asc.plugin) {
                resolve();
                return;
            }
            try {
                window.Asc.plugin.callCommand(function () {
                    var controls = Api.GetDocument().GetAllContentControls();
                    for (var i = 0; i < controls.length; i++) {
                        var control = controls[i];
                        var tag = (control.GetTag() || "").replace(/^ITEM /, "");
                        if (tag.indexOf("MENDELEY_CITATION_") === 0 || tag === "MENDELEY_BIBLIOGRAPHY") {
                            control.SetLock("unlocked");
                        }
                    }
                }, false, false, function () {
                    log("success", "OnlyOfficeAdapter.unlockManagedContentControls", {});
                    resolve();
                });
            } catch (error) {
                reject(error);
            }
        });
    };

    function OnlyOfficeAdapter() {}

    OnlyOfficeAdapter.prototype.getAllContentControls = function () {
        return new Promise(function (resolve) {
            if (typeof window === "undefined" || !window.Asc || !window.Asc.plugin) {
                log("error", "OnlyOfficeAdapter.missingPlugin", {});
                resolve([]);
                return;
            }

            var merged = [];
            var pending = 2;
            var done = false;

            function finish() {
                if (done) return;
                done = true;
                log("debug", "OnlyOfficeAdapter.getAllContentControls", {
                    count: merged.length,
                    sample: merged.length ? { id: merged[0].InternalId, tag: (merged[0].Tag || "").substring(0, 60) } : null
                });
                resolve(merged);
            }

            function step() {
                pending--;
                if (pending <= 0) finish();
            }

            // 1. Query Addin Fields (fields created via AddAddinField)
            try {
                window.Asc.plugin.executeMethod("GetAllAddinFields", null, function (fields) {
                    if (Array.isArray(fields)) {
                        for (var i = 0; i < fields.length; i++) {
                            var f = fields[i];
                            if (f) {
                                merged.push({
                                    InternalId: f.FieldId || f.fieldId || f.Id || "",
                                    Tag: f.Value || f.value || f.Tag || f.tag || "",
                                    Content: f.Content || f.content || "",
                                    isAddinField: true
                                });
                            }
                        }
                    }
                    step();
                });
            } catch (e) {
                step();
            }

            // 2. Query Content Controls (controls created via ContentControl API)
            try {
                window.Asc.plugin.executeMethod("GetAllContentControls", [], function (controls) {
                    if (Array.isArray(controls)) {
                        for (var j = 0; j < controls.length; j++) {
                            var ctrl = controls[j];
                            if (ctrl) {
                                merged.push({
                                    InternalId: ctrl.InternalId || ctrl.internalId || ctrl.Id || "",
                                    Tag: ctrl.Tag || ctrl.tag || ctrl.Value || ctrl.value || "",
                                    Content: ctrl.Content || ctrl.content || "",
                                    isAddinField: false
                                });
                            }
                        }
                    }
                    step();
                });
            } catch (e) {
                step();
            }

            // Guard timeout if one executeMethod callback fails to respond
            setTimeout(function () {
                finish();
            }, 500);
        });
    };

    OnlyOfficeAdapter.prototype.getDocumentText = function () {
        return new Promise(function (resolve) {
            if (typeof window === "undefined" || !window.Asc || !window.Asc.plugin) {
                resolve("");
                return;
            }
            try {
                window.Asc.plugin.callCommand(function () {
                    var oDoc = Api.GetDocument();
                    return oDoc.GetText();
                }, false, false, function (text) {
                    resolve(text || "");
                });
            } catch (e) {
                resolve("");
            }
        });
    };

    OnlyOfficeAdapter.prototype.addContentControl = function (type, properties, content, isHtml, options) {
        return new Promise(function (resolve) {
            if (typeof window === "undefined" || !window.Asc || !window.Asc.plugin) {
                log("error", "OnlyOfficeAdapter.missingPlugin", {});
                resolve("");
                return;
            }
            var tag = properties.Tag || "";
            var cleanText = isHtml ? String(content || "") : String(content || "").replace(/<[^>]+>/g, "");
            if (type === 2 && !isHtml) {
                window.Asc.scope = window.Asc.scope || {};
                window.Asc.scope.citationTag = tag;
                window.Asc.scope.citationText = cleanText;

                window.Asc.plugin.executeMethod("AddContentControl", [2, { Tag: tag, Lock: 3 }], function () {
                    window.Asc.plugin.callCommand(function () {
                        var controls = Api.GetDocument().GetAllContentControls();
                        for (var i = 0; i < controls.length; i++) {
                            if (controls[i].GetTag() === Asc.scope.citationTag) {
                                controls[i].AddText(Asc.scope.citationText);
                                break;
                            }
                        }
                    }, false, true, function () {
                        log("success", "OnlyOfficeAdapter.addContentControl.inline", { tag: tag });
                        resolve(tag);
                    });
                });
                return;

            }


            var script = "";
            if (isHtml) {
                try {
                    var helper = DocBuilderHelper || (typeof window !== "undefined" && window.MendeleyApp && window.MendeleyApp.DocBuilderHelper);
                    if (helper && helper.buildBibliographyScript) {
                        script = helper.buildBibliographyScript(content, options);
                    }
                } catch (e) {
                    log("warn", "OnlyOfficeAdapter.buildBibliographyScript.fallback", { error: String(e) });
                }
                if (!script) {
                    var plain = String(content || "").replace(/<[^>]+>/g, "").trim();
                    script = "var oDoc = Api.GetDocument(); var oPara = Api.CreateParagraph(); oPara.AddText(" + JSON.stringify(plain) + "); oDoc.InsertContent([oPara], true, {KeepTextOnly: true});";
                }
            } else {
                script = "var oDoc = Api.GetDocument(); var oPara = Api.CreateParagraph(); oPara.AddText(" + JSON.stringify(cleanText) + "); oDoc.InsertContent([oPara], true, {KeepTextOnly: true});";
            }

            var arr = [{
                Props: { Tag: tag, Lock: 3 },
                Script: script
            }];

            window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [arr], function (res) {
                log("info", "OnlyOfficeAdapter.addContentControl.populated", { tag: tag, isHtml: !!isHtml });
                resolve(tag);
            });
        });
    };

    OnlyOfficeAdapter.prototype.addAddinField = function (field) {
        return new Promise(function (resolve) {
            if (typeof window === "undefined" || !window.Asc || !window.Asc.plugin) {
                log("error", "OnlyOfficeAdapter.missingPlugin", {});
                resolve("");
                return;
            }
            window.Asc.plugin.executeMethod("AddAddinField", [field], function (res) {
                log("info", "OnlyOfficeAdapter.addAddinField", { value: field.Value });
                resolve(res || "");
            });
        });
    };

    OnlyOfficeAdapter.prototype.addFootnote = function () {
        return new Promise(function (resolve) {
            if (typeof window === "undefined" || !window.Asc || !window.Asc.plugin) {
                resolve();
                return;
            }
            window.Asc.plugin.callCommand(function () {
                var oDoc = Api.GetDocument();
                oDoc.AddFootnote();
            }, false, true, function () {
                log("debug", "OnlyOfficeAdapter.addFootnote", {});
                resolve();
            });
        });
    };
    OnlyOfficeAdapter.prototype.addNoteCitation = function (tag, renderedText) {
        return new Promise(function (resolve) {
            if (typeof window === "undefined" || !window.Asc || !window.Asc.plugin) {
                log("error", "OnlyOfficeAdapter.missingPlugin", {});
                resolve("");
                return;
            }

            var helper = DocBuilderHelper || (window.MendeleyApp && window.MendeleyApp.DocBuilderHelper);
            var paragraphs = helper && helper.parseHtmlToRuns ? helper.parseHtmlToRuns(renderedText) : [];
            var runs = paragraphs.length ? paragraphs[0].runs : [{
                text: String(renderedText || "").replace(/<[^>]+>/g, ""),
                italic: false,
                bold: false
            }];

            window.Asc.scope = window.Asc.scope || {};
            window.Asc.scope.noteTag = tag;
            window.Asc.scope.noteRuns = runs;

            window.Asc.plugin.callCommand(function () {
                var oDoc = Api.GetDocument();
                oDoc.AddFootnote();
                var fnParas = oDoc.GetFootnotesFirstParagraphs();
                if (!fnParas || !fnParas.length) return;

                var fnPara = fnParas[fnParas.length - 1];
                var sdt = Api.CreateInlineLvlSdt();
                sdt.SetTag(Asc.scope.noteTag);
                sdt.SetLock("unlocked");
                var runs = Asc.scope.noteRuns || [];
                for (var i = 0; i < runs.length; i++) {
                    var run = Api.CreateRun();
                    run.AddText(runs[i].text);
                    if (runs[i].italic) run.SetItalic(true);
                    if (runs[i].bold) run.SetBold(true);
                    sdt.AddElement(run);
                }
                fnPara.AddInlineLvlSdt(sdt);
            }, false, true, function () {
                log("info", "OnlyOfficeAdapter.addNoteCitation.success", { tag: tag, runCount: runs.length });
                resolve(tag);
            });
        });
    };

    OnlyOfficeAdapter.prototype.updateControlText = function (internalId, text) {
        return new Promise(function (resolve) {
            if (typeof window === "undefined" || !window.Asc || !window.Asc.plugin) {
                resolve();
                return;
            }
            var cleanText = String(text || "").replace(/<[^>]+>/g, "");
            var arr = [{
                Props: { InternalId: internalId, Lock: 3 },
                Script: "var oDoc = Api.GetDocument(); var oPara = Api.CreateParagraph(); var oRun = Api.CreateRun(); oRun.AddText(" + JSON.stringify(cleanText) + "); oRun.SetItalic(false); oRun.SetBold(false); oPara.AddElement(oRun); oDoc.InsertContent([oPara], true, {KeepTextOnly: true});"
            }];
            window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [arr], function () {
                log("info", "OnlyOfficeAdapter.updateControlText", { internalId: internalId });
                resolve();
            });
        });
    };

    OnlyOfficeAdapter.prototype.updateControlHtml = function (internalId, html, options) {
        return new Promise(function (resolve) {
            if (typeof window === "undefined" || !window.Asc || !window.Asc.plugin) {
                resolve();
                return;
            }
            var script = "";
            try {
                var helper = DocBuilderHelper || (typeof window !== "undefined" && window.MendeleyApp && window.MendeleyApp.DocBuilderHelper);
                if (helper && helper.buildBibliographyScript) {
                    script = helper.buildBibliographyScript(html, options);
                }
            } catch (e) {
                log("warn", "OnlyOfficeAdapter.updateControlHtml.fallback", { error: String(e) });
            }
            if (!script) {
                var plain = String(html || "").replace(/<[^>]+>/g, "").trim();
                script = "var oDoc = Api.GetDocument(); var oPara = Api.CreateParagraph(); oPara.AddText(" + JSON.stringify(plain) + "); oDoc.InsertContent([oPara], true, {KeepTextOnly: true});";
            }

            var arr = [{
                Props: { InternalId: internalId, Lock: 3 },
                Script: script
            }];
            window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [arr], function () {
                log("info", "OnlyOfficeAdapter.updateControlHtml", { internalId: internalId });
                resolve();
            });
        });
    };

    OnlyOfficeAdapter.prototype.removeContentControl = function (internalId) {
        return new Promise(function (resolve) {
            if (typeof window === "undefined" || !window.Asc || !window.Asc.plugin) {
                resolve();
                return;
            }
            window.Asc.plugin.executeMethod("RemoveContentControl", [internalId], function () {
                log("info", "OnlyOfficeAdapter.removeContentControl", { internalId: internalId });
                resolve();
            });
        });
    };

    function DocumentModule(adapter) {
        // Store explicit adapter (tests only). Runtime adapter resolved lazily
        // on first use so construction before window.Asc.plugin is safe.
        this._adapter = adapter || null;
    }

    Object.defineProperty(DocumentModule.prototype, "adapter", {
        get: function () {
            if (this._adapter) return this._adapter;
            // Resolve and cache: by the time any method is called, Asc.plugin
            // should already be available (called from within plugin.init).
            if (typeof window !== "undefined" && window.Asc && window.Asc.plugin) {
                this._adapter = new OnlyOfficeAdapter();
            } else {
                this._adapter = new InMemoryAdapter();
            }
            return this._adapter;
        }
    });
    DocumentModule.prototype.unlockManagedContentControls = function () {
        return this.adapter.unlockManagedContentControls().then(function () {
            log("success", "DocumentModule.unlockManagedContentControls", {});
        });
    };


    DocumentModule.prototype.insertCitation = function (citationItems, renderedText, isNoteStyle) {
        var plainText = String(renderedText || "").replace(/<[^>]+>/g, "");
        var cleanText = DocBuilderHelper && DocBuilderHelper.decodeEntities ? DocBuilderHelper.decodeEntities(plainText) : plainText;
        var citationObj = {
            citationId: "CITATION_" + new Date().getTime(),
            citationItems: citationItems,
            schema: "https://github.com/citation-style-language/schema/raw/master/csl-citation.json",
            isNoteStyle: !!isNoteStyle
        };
        var base64Tag = TAG_PREFIX + encodeBase64(JSON.stringify(citationObj));
        var addinField = {
            FieldId: "",
            Value: "ITEM " + base64Tag,
            Content: cleanText
        };

        var self = this;
        if (isNoteStyle && self.adapter && self.adapter.addNoteCitation) {
            return self.adapter.addNoteCitation(base64Tag, renderedText).then(function (result) {
                log("success", "DocumentModule.insertCitation", { citationId: citationObj.citationId, isNoteStyle: true });
                return result;
            });
        }
        var op = Promise.resolve();
        return op.then(function () {
            if (self.adapter && self.adapter.addContentControl) {
                return self.adapter.addContentControl(2, { Tag: base64Tag, Lock: 3, PlaceHolderText: cleanText }, cleanText, false);
            }
            return self.adapter.addAddinField(addinField);
        }).then(function (result) {
            log("success", "DocumentModule.insertCitation", { citationId: citationObj.citationId, isNoteStyle: !!isNoteStyle });
            return result;
        });
    };

    // ONLYOFFICE stores field.Value (e.g. "ITEM MENDELEY_CITATION_v3_...") as ctrl.Tag.
    // Strip the "ITEM " prefix so tag comparisons work consistently.
    function normalizeTag(raw) {
        return (raw || "").replace(/^ITEM /, "");
    }

    DocumentModule.prototype.getDocumentText = function () {
        if (this.adapter && this.adapter.getDocumentText) {
            return this.adapter.getDocumentText();
        }
        return Promise.resolve("");
    };

    DocumentModule.prototype.getCitations = function () {
        return this.adapter.getAllContentControls().then(function (controls) {
            var records = [];
            if (!controls || !controls.length) return records;

            for (var i = 0; i < controls.length; i++) {
                var ctrl = controls[i];
                var tag = normalizeTag(ctrl.Tag);
                var b64 = "";
                if (tag.indexOf(TAG_PREFIX) === 0) {
                    b64 = tag.substring(TAG_PREFIX.length);
                } else if (tag.indexOf("MENDELEY_CITATION_") === 0) {
                    var m = tag.match(/^MENDELEY_CITATION_(?:v\d+_)?(.*)$/);
                    if (m && m[1]) {
                        b64 = m[1];
                    }
                }

                if (b64) {
                    try {
                        var payload = JSON.parse(decodeBase64(b64));
                        if (payload && payload.citationItems) {
                            records.push({
                                internalId: ctrl.InternalId,
                                citationId: payload.citationId,
                                citationItems: payload.citationItems,
                                isNoteStyle: !!payload.isNoteStyle
                            });
                        }
                    } catch (err) {
                        log("error", "DocumentModule.getCitations.parseError", { internalId: ctrl.InternalId, error: err.message });
                    }
                }
            }
            log("debug", "DocumentModule.getCitations", { totalFound: records.length });
            return records;
        });
    };

    DocumentModule.prototype.updateCitationText = function (internalId, renderedText) {
        var plainText = String(renderedText || "").replace(/<[^>]+>/g, "");
        var cleanText = DocBuilderHelper && DocBuilderHelper.decodeEntities ? DocBuilderHelper.decodeEntities(plainText) : plainText;
        return this.adapter.updateControlText(internalId, cleanText).then(function () {
            log("success", "DocumentModule.updateCitationText", { internalId: internalId });
        });
    };

    DocumentModule.prototype.insertBibliography = function (html, options) {
        var rawHtml = (html && html.join) ? html.join("") : String(html || "");
        var self = this;
        if (self.adapter && self.adapter.addContentControl) {
            return self.adapter.addContentControl(1, { Tag: BIB_TAG, Lock: 3, PlaceHolderText: "Bibliography" }, rawHtml, true, options).then(function (res) {
                log("success", "DocumentModule.insertBibliography", {});
                return res;
            });
        }
        var addinBibField = {
            FieldId: "",
            Value: "ITEM " + BIB_TAG,
            Content: rawHtml
        };
        return this.adapter.addAddinField(addinBibField).then(function (res) {
            log("success", "DocumentModule.insertBibliography", {});
            return res;
        });
    };

    DocumentModule.prototype.getBibliography = function () {
        return this.adapter.getAllContentControls().then(function (controls) {
            if (!controls || !controls.length) return null;
            for (var i = 0; i < controls.length; i++) {
                var ctrl = controls[i];
                var tag = normalizeTag(ctrl.Tag);
                if (tag === BIB_TAG) {
                    log("debug", "DocumentModule.getBibliography.found", { internalId: ctrl.InternalId });
                    return { internalId: ctrl.InternalId };
                }
            }
            log("debug", "DocumentModule.getBibliography.notFound", {});
            return null;
        });
    };

    DocumentModule.prototype.updateBibliographyHtml = function (internalId, html, options) {
        var rawHtml = (html && html.join) ? html.join("") : String(html || "");
        return this.adapter.updateControlHtml(internalId, rawHtml, options).then(function () {
            log("success", "DocumentModule.updateBibliographyHtml", { internalId: internalId });
        });
    };

    DocumentModule.prototype.unlinkAll = function () {
        var self = this;
        return this.adapter.getAllContentControls().then(function (controls) {
            if (!controls || !controls.length) return;
            var removalPromises = [];
            for (var i = 0; i < controls.length; i++) {
                var ctrl = controls[i];
                var tag = normalizeTag(ctrl.Tag);
                if (tag.indexOf(TAG_PREFIX) === 0 || tag === BIB_TAG || tag.indexOf("MENDELEY_CITATION_") === 0) {
                    removalPromises.push(self.adapter.removeContentControl(ctrl.InternalId));
                }
            }
            return Promise.all(removalPromises).then(function () {
                log("success", "DocumentModule.unlinkAll", { totalRemoved: removalPromises.length });
            });
        });
    };

    return {
        DocumentModule: DocumentModule,
        OnlyOfficeAdapter: OnlyOfficeAdapter,
        InMemoryAdapter: InMemoryAdapter
    };
});
