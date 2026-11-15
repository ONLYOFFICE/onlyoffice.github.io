/* Plantilles d'estil - logica principal del plugin */
(function (window) {
  "use strict";

  var t = function () { return window.STI18n.t.apply(null, arguments); };
  var STORE_KEY = "onlyoffice-styletemplates.v1";

  /* Estils predefinits que es desen encara que el document no els faci servir */
  var STANDARD_STYLES = [
    "Normal", "Title", "Subtitle",
    "Heading 1", "Heading 2", "Heading 3", "Heading 4", "Heading 5",
    "Heading 6", "Heading 7", "Heading 8", "Heading 9",
    "Quote", "Intense Quote", "List Paragraph", "No Spacing", "Caption",
    "Header", "Footer", "Footnote Text"
  ];

  var el = {};
  var initialized = false;

  /* ---------------- Emmagatzematge ---------------- */

  function loadTemplates() {
    try {
      var data = JSON.parse(window.localStorage.getItem(STORE_KEY) || "[]");
      return Array.isArray(data) ? data : [];
    } catch (e) { return []; }
  }
  function saveTemplates(list) {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(list));
  }
  function upsertTemplate(tpl) {
    var list = loadTemplates().filter(function (x) { return x.name !== tpl.name; });
    list.push(tpl);
    list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    saveTemplates(list);
  }
  function templateExists(name) {
    return loadTemplates().some(function (x) { return x.name === name; });
  }

  /* ---------------- Estat i UI ---------------- */

  function setStatus(msg, kind) {
    el.status.textContent = msg || "";
    el.status.className = "st-status" + (kind ? " " + kind : "");
  }

  function download(blob, fileName) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  function renderList() {
    var list = loadTemplates();
    el.list.innerHTML = "";
    if (!list.length) {
      var p = document.createElement("p");
      p.className = "st-empty";
      p.textContent = t("empty");
      el.list.appendChild(p);
      return;
    }
    list.forEach(function (tpl) {
      var card = document.createElement("div");
      card.className = "st-card";

      var head = document.createElement("div");
      head.className = "st-card-head";
      var nm = document.createElement("span");
      nm.className = "st-card-name";
      nm.textContent = tpl.name;
      var meta = document.createElement("span");
      meta.className = "st-card-meta";
      meta.textContent = tpl.styles.length + " " + t("styles");
      head.appendChild(nm);
      head.appendChild(meta);
      card.appendChild(head);

      var details = document.createElement("details");
      var summary = document.createElement("summary");
      summary.textContent = t("styles");
      details.appendChild(summary);
      var ul = document.createElement("ul");
      ul.className = "st-styles";
      tpl.styles.forEach(function (s) {
        var li = document.createElement("li");
        li.textContent = s.name + (s.type === "run" ? " (a)" : "");
        ul.appendChild(li);
      });
      details.appendChild(ul);
      card.appendChild(details);

      var actions = document.createElement("div");
      actions.className = "st-actions";

      var applyBtn = document.createElement("button");
      applyBtn.type = "button";
      applyBtn.className = "btn-text-default";
      applyBtn.textContent = t("apply");
      applyBtn.addEventListener("click", function () { applyTemplate(tpl); });

      var delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "btn-text-default";
      delBtn.textContent = t("del");
      delBtn.addEventListener("click", function () {
        if (!window.confirm(t("confirmDelete", tpl.name))) return;
        saveTemplates(loadTemplates().filter(function (x) { return x.name !== tpl.name; }));
        renderList();
      });

      var sel = document.createElement("select");
      sel.className = "form-control";
      sel.setAttribute("aria-label", t("exportAs"));
      [["", t("exportAs")], ["dotx", t("exportDotx")], ["ott", t("exportOtt")], ["json", t("exportJson")]]
        .forEach(function (o) {
          var opt = document.createElement("option");
          opt.value = o[0];
          opt.textContent = o[1];
          sel.appendChild(opt);
        });
      sel.addEventListener("change", function () {
        if (!sel.value) return;
        try {
          var r = window.STFormats.exportTemplate(tpl, sel.value);
          download(r.blob, r.fileName);
          setStatus(t("exported", r.fileName), "ok");
        } catch (e) {
          setStatus(t("error", e.message), "err");
        }
        sel.value = "";
      });

      actions.appendChild(applyBtn);
      actions.appendChild(delBtn);
      actions.appendChild(sel);
      card.appendChild(actions);
      el.list.appendChild(card);
    });
  }

  /* ---------------- Capturar estils del document ---------------- */

  function captureStyles() {
    var name = el.name.value.trim();
    if (!name) { setStatus(t("nameRequired"), "err"); el.name.focus(); return; }
    if (templateExists(name) && !window.confirm(t("overwrite"))) return;

    setStatus(t("working"));
    window.Asc.scope.stdNames = STANDARD_STYLES;
    window.Asc.scope.onlyUsed = el.onlyUsed.checked;

    window.Asc.plugin.callCommand(function () {
      /* Aquest codi s'executa dins l'editor (Office JavaScript API) */
      function call(obj, method) {
        try {
          if (obj && typeof obj[method] === "function") {
            var v = obj[method]();
            return (v === null || v === undefined) ? undefined : v;
          }
        } catch (e) { /* metode no disponible en aquesta versio */ }
        return undefined;
      }
      function toObj(j) {
        try { return typeof j === "string" ? JSON.parse(j) : j; } catch (e) { return null; }
      }
      function hex2(n) { var h = Number(n).toString(16).toUpperCase(); return h.length < 2 ? "0" + h : h; }
      function colorHex(textPr) {
        var c = call(textPr, "GetColor");
        if (c) {
          var h = call(c, "GetHex");
          if (typeof h === "string") return h.replace("#", "").toUpperCase().slice(0, 6);
          var rgb = call(c, "GetRGB");
          if (typeof rgb === "number") { var s = rgb.toString(16).toUpperCase(); while (s.length < 6) s = "0" + s; return s.slice(-6); }
        }
        var j = toObj(call(textPr, "ToJSON"));
        var col = j && (j.color || (j.textPr && j.textPr.color));
        if (col && col.r !== undefined && !col.auto) return hex2(col.r) + hex2(col.g) + hex2(col.b);
        return undefined;
      }
      function basedOnName(style) {
        var j = toObj(call(style, "ToJSON"));
        if (!j) return undefined;
        var b = j.basedOn || j.BasedOn || j.based;
        return typeof b === "string" ? b : undefined;
      }

      var doc = Api.GetDocument();
      var names = { "Normal": true };
      if (!Asc.scope.onlyUsed) Asc.scope.stdNames.forEach(function (n) { names[n] = true; });
      var paras = call(doc, "GetAllParagraphs") || [];
      for (var i = 0; i < paras.length; i++) {
        var ps = call(paras[i], "GetStyle");
        var pn = ps && call(ps, "GetName");
        if (pn) names[pn] = true;
      }

      var out = [];
      Object.keys(names).forEach(function (n) {
        var st = null;
        try { st = doc.GetStyle(n); } catch (e) { st = null; }
        if (!st) return;
        var type = call(st, "GetType");
        if (type !== "paragraph" && type !== "run") return;

        var tp = call(st, "GetTextPr");
        var hps = call(tp, "GetFontSize");
        var text = {
          font: call(tp, "GetFontFamily"),
          size: typeof hps === "number" ? hps / 2 : undefined,
          bold: call(tp, "GetBold"),
          italic: call(tp, "GetItalic"),
          underline: call(tp, "GetUnderline"),
          strike: call(tp, "GetStrikeout"),
          caps: call(tp, "GetCaps"),
          smallCaps: call(tp, "GetSmallCaps"),
          color: tp ? colorHex(tp) : undefined,
          spacing: call(tp, "GetSpacing")
        };

        var para;
        if (type === "paragraph") {
          var pp = call(st, "GetParaPr");
          var line = call(pp, "GetSpacingLineValue");
          para = {
            align: call(pp, "GetJc"),
            indLeft: call(pp, "GetIndLeft"),
            indRight: call(pp, "GetIndRight"),
            firstLine: call(pp, "GetIndFirstLine"),
            before: call(pp, "GetSpacingBefore"),
            after: call(pp, "GetSpacingAfter"),
            line: typeof line === "number" ? line : undefined,
            lineRule: typeof line === "number" ? (call(pp, "GetSpacingLineRule") || "auto") : undefined,
            outlineLvl: call(pp, "GetOutlineLvl"),
            keepNext: call(pp, "GetKeepNext"),
            keepLines: call(pp, "GetKeepLines")
          };
        }
        out.push({ name: n, type: type, basedOn: basedOnName(st), text: text, para: para });
      });
      return JSON.stringify(out);
    }, false, false, function (result) {
      var styles = [];
      try { styles = JSON.parse(result || "[]"); } catch (e) { styles = []; }
      /* JSON.stringify ja elimina els valors undefined; treiem objectes buits */
      styles.forEach(function (s) {
        if (s.text && !Object.keys(s.text).length) delete s.text;
        if (s.para && !Object.keys(s.para).length) delete s.para;
      });
      if (!styles.length) { setStatus(t("noStyles"), "err"); return; }
      upsertTemplate({ name: name, created: new Date().toISOString(), styles: styles });
      renderList();
      setStatus(t("saved", name, styles.length), "ok");
    });
  }
  /* ---------------- Aplicar una plantilla al document ---------------- */

  function applyTemplate(tpl) {
    setStatus(t("working"));
    window.Asc.scope.tplStyles = tpl.styles;
    window.Asc.scope.createMissing = el.createMissing.checked;

    window.Asc.plugin.callCommand(function () {
      /* Aquest codi s'executa dins l'editor (Office JavaScript API) */
      function tryDo(fn) { try { fn(); return true; } catch (e) { return false; } }
      function setColor(tp, hex) {
        var r = parseInt(hex.substr(0, 2), 16), g = parseInt(hex.substr(2, 2), 16), b = parseInt(hex.substr(4, 2), 16);
        if (typeof Api.HexColor === "function" && tryDo(function () { tp.SetColor(Api.HexColor("#" + hex)); })) return;
        tryDo(function () { tp.SetColor(r, g, b, false); });
      }

      var doc = Api.GetDocument();
      var styles = Asc.scope.tplStyles || [];
      var updated = 0, created = 0, skipped = 0;
      var map = {};

      styles.forEach(function (s) {
        var st = null;
        tryDo(function () { st = doc.GetStyle(s.name); });
        if (!st) {
          if (!Asc.scope.createMissing) { skipped++; return; }
          tryDo(function () { st = doc.CreateStyle(s.name, s.type === "run" ? "run" : "paragraph"); });
          if (!st) { skipped++; return; }
          created++;
        } else {
          updated++;
        }
        map[s.name] = st;

        var x = s.text;
        if (x) {
          var tp = st.GetTextPr();
          if (x.font) tryDo(function () { tp.SetFontFamily(x.font); });
          if (x.size) tryDo(function () { tp.SetFontSize(Math.round(x.size * 2)); });
          if (x.bold !== undefined) tryDo(function () { tp.SetBold(!!x.bold); });
          if (x.italic !== undefined) tryDo(function () { tp.SetItalic(!!x.italic); });
          if (x.underline !== undefined) tryDo(function () { tp.SetUnderline(!!x.underline); });
          if (x.strike !== undefined) tryDo(function () { tp.SetStrikeout(!!x.strike); });
          if (x.caps !== undefined) tryDo(function () { tp.SetCaps(!!x.caps); });
          if (x.smallCaps !== undefined) tryDo(function () { tp.SetSmallCaps(!!x.smallCaps); });
          if (x.color) setColor(tp, x.color);
          if (x.spacing !== undefined) tryDo(function () { tp.SetSpacing(x.spacing); });
        }

        var p = s.para;
        if (p && s.type !== "run") {
          var pp = st.GetParaPr();
          if (p.align) tryDo(function () { pp.SetJc(p.align); });
          if (p.indLeft !== undefined) tryDo(function () { pp.SetIndLeft(p.indLeft); });
          if (p.indRight !== undefined) tryDo(function () { pp.SetIndRight(p.indRight); });
          if (p.firstLine !== undefined) tryDo(function () { pp.SetIndFirstLine(p.firstLine); });
          if (p.before !== undefined) tryDo(function () { pp.SetSpacingBefore(p.before); });
          if (p.after !== undefined) tryDo(function () { pp.SetSpacingAfter(p.after); });
          if (p.line !== undefined) tryDo(function () { pp.SetSpacingLine(p.line, p.lineRule || "auto"); });
          if (p.outlineLvl !== undefined) tryDo(function () { pp.SetOutlineLvl(p.outlineLvl); });
          if (p.keepNext !== undefined) tryDo(function () { pp.SetKeepNext(!!p.keepNext); });
          if (p.keepLines !== undefined) tryDo(function () { pp.SetKeepLines(!!p.keepLines); });
        }
      });

      /* Herencia (basedOn) un cop existeixen tots els estils */
      styles.forEach(function (s) {
        var st = map[s.name];
        if (!st || !s.basedOn || s.basedOn === s.name) return;
        var parent = map[s.basedOn];
        if (!parent) tryDo(function () { parent = doc.GetStyle(s.basedOn); });
        if (parent) tryDo(function () { st.SetBasedOn(parent); });
      });

      return JSON.stringify({ updated: updated, created: created, skipped: skipped });
    }, false, true, function (result) {
      var r = { updated: 0, created: 0, skipped: 0 };
      try { r = JSON.parse(result); } catch (e) { /* res */ }
      setStatus(t("applied", r.updated, r.created, r.skipped), "ok");
    });
  }
  /* ---------------- Importacio ---------------- */

  function onFileChosen() {
    var file = el.file.files && el.file.files[0];
    el.file.value = "";
    if (!file) return;
    setStatus(t("working"));
    window.STFormats.importFile(file).then(function (res) {
      if (!res.styles.length) { setStatus(t("noStyles"), "err"); return; }
      var name = res.name;
      if (templateExists(name) && !window.confirm(t("overwrite"))) return;
      upsertTemplate({ name: name, created: new Date().toISOString(), styles: res.styles });
      renderList();
      setStatus(t("imported", name, res.styles.length), "ok");
    }).catch(function (e) {
      var msg = e && e.message === "UNSUPPORTED" ? t("unsupported") : (e && e.message) || String(e);
      setStatus(t("importError", msg), "err");
    });
  }

  /* ---------------- Cicle de vida del plugin ---------------- */

  function byId(id) { return document.getElementById(id); }

  window.Asc.plugin.init = function () {
    var info = window.Asc.plugin.info || {};
    window.STI18n.setLang(info.lang || "ca");

    el.name = byId("st-name");
    el.onlyUsed = byId("st-onlyUsed");
    el.createMissing = byId("st-createMissing");
    el.list = byId("st-list");
    el.file = byId("st-file");
    el.status = byId("st-status");

    window.STI18n.translateDom(document);

    if (!initialized) {
      byId("st-save").addEventListener("click", captureStyles);
      byId("st-import").addEventListener("click", function () { el.file.click(); });
      el.file.addEventListener("change", onFileChosen);
      initialized = true;
    }
    renderList();
  };

  window.Asc.plugin.button = function () {
    this.executeCommand("close", "");
  };

  window.Asc.plugin.onThemeChanged = function (theme) {
    if (typeof window.Asc.plugin.onThemeChangedBase === "function") {
      window.Asc.plugin.onThemeChangedBase(theme);
    }
  };
})(window);
