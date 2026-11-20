// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2026 Desktiny contributors
//
// ONLYOFFICE glue: reads the open document into a plain model, hands it to VnDocChecker
// and prints the findings. All rules live in src/checker.js and are tested in Node.
(function (window) {
  "use strict";

  // Runs inside the editor. It cannot see anything declared outside this function, and a
  // failure must come back as { error } so it never looks like "the document is fine".
  function readDocument() {
    try {
    var doc = Api.GetDocument();
    var model = { sections: [], paragraphs: [] };

    // The margin getters are missing in older editors (not in 8.3.3): leave them undefined
    // and the checker reports that margins could not be checked.
    function twips(section, method) {
      return typeof section[method] === "function" ? section[method]() : undefined;
    }
    var sections = doc.GetSections();
    for (var s = 0; s < sections.length; s++) {
      model.sections.push({
        widthTw: twips(sections[s], "GetPageWidth"),
        heightTw: twips(sections[s], "GetPageHeight"),
        marginLeftTw: twips(sections[s], "GetPageMarginLeft"),
        marginTopTw: twips(sections[s], "GetPageMarginTop"),
        marginRightTw: twips(sections[s], "GetPageMarginRight"),
        marginBottomTw: twips(sections[s], "GetPageMarginBottom")
      });
    }

    function readColor(textPr) {
      // GetColor exists since 8.1, GetRGB since 9.1. Unknown stays null and is not reported.
      try {
        var color = textPr.GetColor();
        if (!color) return null;
        if (color.IsAutoColor && color.IsAutoColor()) return { auto: true };
        if (color.IsThemeColor && color.IsThemeColor()) return null;
        if (color.GetRGB) {
          var rgb = color.GetRGB();
          return { r: rgb.r, g: rgb.g, b: rgb.b };
        }
      } catch (e) { /* older editor */ }
      return null;
    }

    function readParagraph(paragraph) {
      var runs = [];
      for (var i = 0; i < paragraph.GetElementsCount(); i++) {
        var element = paragraph.GetElement(i);
        if (!element || element.GetClassType() !== "run") continue;
        var props = element.GetTextPr();
        runs.push({
          text: element.GetText({}) || "",
          fontFamily: props.GetFontFamily() || null,
          sizeHp: props.GetFontSize() || null,
          bold: props.GetBold() === true,
          color: readColor(props)
        });
      }
      return { text: paragraph.GetText({}) || "", runs: runs };
    }

    for (var i = 0; i < doc.GetElementsCount(); i++) {
      var element = doc.GetElement(i);
      if (element && element.GetClassType() === "paragraph") model.paragraphs.push(readParagraph(element));
    }
    return model;
    } catch (e) {
      return { error: String(e && e.message ? e.message : e) };
    }
  }

  function language() {
    var lang = (window.Asc.plugin.info && window.Asc.plugin.info.lang) || "vi";
    return String(lang).toLowerCase().indexOf("vi") === 0 ? "vi" : "en";
  }

  var LABELS = {
    vi: { unreadable: "Không đọc được tài liệu: ", ok: "Không phát hiện lỗi thể thức.", count: "Lỗi: {e}, cảnh báo: {w}, lưu ý: {i}", at: "Đoạn {n}: ", button: "Kiểm tra lại" },
    en: { unreadable: "Could not read the document: ", ok: "No formatting problems found.", count: "Errors: {e}, warnings: {w}, notes: {i}", at: "Paragraph {n}: ", button: "Check again" }
  };

  function render(findings) {
    var lang = language();
    var labels = LABELS[lang];
    var list = document.getElementById("findings");
    var summary = document.getElementById("summary");
    var recheck = document.getElementById("recheck");
    recheck.textContent = labels.button;
    list.textContent = "";
    var counts = { error: 0, warning: 0, info: 0 };
    findings.forEach(function (item) {
      counts[item.severity] += 1;
      var li = document.createElement("li");
      li.className = item.severity;
      var prefix = item.paragraph === undefined ? "" : labels.at.replace("{n}", item.paragraph + 1);
      li.textContent = prefix + window.VnDocChecker.formatFinding(item, lang);
      list.appendChild(li);
    });
    summary.textContent = findings.length
      ? labels.count.replace("{e}", counts.error).replace("{w}", counts.warning).replace("{i}", counts.info)
      : labels.ok;
  }

  function showError(detail) {
    var labels = LABELS[language()];
    document.getElementById("findings").textContent = "";
    document.getElementById("summary").textContent = labels.unreadable + detail;
    document.getElementById("recheck").textContent = labels.button;
  }

  function run() {
    window.Asc.plugin.callCommand(readDocument, false, false, function (model) {
      if (!model || model.error) showError(model ? model.error : "no result");
      else render(window.VnDocChecker.checkDocument(model));
    });
  }

  window.Asc.plugin.init = function () {
    document.getElementById("recheck").onclick = run;
    run();
  };
  window.Asc.plugin.button = function () {
    this.executeCommand("close", "");
  };
})(window);
