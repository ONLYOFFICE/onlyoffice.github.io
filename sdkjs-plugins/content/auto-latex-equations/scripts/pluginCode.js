(function (window, undefined) {

  var running = false;
  var ignoreUntil = 0;
  var timer = null;
  var skip = {};

  function $(id) { return document.getElementById(id); }


  function tr(text) {
    try {
      if (window.Asc.plugin.tr) return window.Asc.plugin.tr(text);
    } catch (e) {}
    return text;
  }

  var lastStatus = { key: "Ready.", prefix: "", cls: "" };

  function setStatus(key, cls, prefix) {
    lastStatus = { key: key, prefix: prefix || "", cls: cls || "" };
    renderStatus();
  }

  function renderStatus() {
    var s = $("status");
    if (!s) return;
    s.textContent = lastStatus.prefix + tr(lastStatus.key);
    s.className = lastStatus.cls;
  }

  function translateUI() {
    if ($("title")) $("title").textContent = tr("Auto-LaTeX Equations");
    if ($("hint")) $("hint").innerHTML = tr("Detects <code>$...$</code> and <code>$$...$$</code> in the text and turns them into equations.");
    if ($("convertAll")) $("convertAll").textContent = tr("Convert all equations");
    if ($("autoLabel")) $("autoLabel").textContent = tr("Automatic conversion on paste (panel open)");
    renderStatus();
  }


  function convert(manual) {
    if (running) return;
    running = true;
    if (manual) $("convertAll").disabled = true;
    window.Asc.scope.skip = skip;

    window.Asc.plugin.callCommand(function () {
      var doc = Api.GetDocument();
      if (typeof doc.AddMathEquation !== "function") {
        return { unsupported: true };
      }

      var skipList = Asc.scope.skip || {};
      var count = 0;
      var failed = [];


      var re = /\$\$([\s\S]+?)\$\$|(?<!\$)\$(?![\s$])([^$\n]*?[^$\s\\])\$(?![\d$])/g;

      var n = doc.GetElementsCount();
      for (var i = n - 1; i >= 0; i--) {
        var el = doc.GetElement(i);
        if (!el || el.GetClassType() !== "paragraph") continue;

        var text = el.GetText();
        if (!text || text.indexOf("$") === -1) continue;

        var seen = {}, found = [], m;
        re.lastIndex = 0;
        while ((m = re.exec(text)) !== null) {
          var raw = m[0];
          var latex = (m[1] !== undefined ? m[1] : m[2]).trim();
          if (!latex || seen[raw] || skipList[raw]) continue;
          seen[raw] = true;
          found.push({ raw: raw, latex: latex });
        }

        for (var f = 0; f < found.length; f++) {
          var guard = 0;
          while (guard++ < 50) {
            var ranges = el.Search(found[f].raw, true);
            if (!ranges || !ranges.length) break;
            ranges[ranges.length - 1].Select();
            if (!doc.AddMathEquation(found[f].latex, "latex")) { failed.push(found[f].raw); break; }
            count++;
            if (el.GetText().indexOf(found[f].raw) !== -1) { failed.push(found[f].raw); break; }
          }
        }
      }
      return { count: count, failed: failed };
    }, false, true, function (res) {
      if (res && res.failed) {
        for (var i = 0; i < res.failed.length; i++) skip[res.failed[i]] = true;
      }
      ignoreUntil = Date.now() + 1500;
      running = false;
      $("convertAll").disabled = false;

      if (!res) { setStatus("No response from the editor.", "err"); return; }
      if (res.unsupported) { setStatus("AddMathEquation is not available: ONLYOFFICE 8.2 or later is required.", "err"); return; }

      if (res.failed && res.failed.length) {
        $("status").textContent = res.count + " " + tr("equation(s) converted.") + " " + res.failed.length + " " + tr("ignored.");
        $("status").className = "err";
      } else if (res.count > 0) {
        setStatus("equation(s) converted.", "ok", res.count + " ");
      } else if (manual) {
        setStatus("No $...$ or $$...$$ equation found.");
      }
    });
  }


  function onCursorMoved() {
    if (!$("auto") || !$("auto").checked) return;
    if (running || Date.now() < ignoreUntil) return;
    clearTimeout(timer);
    timer = setTimeout(function () { convert(false); }, 400);
  }

  window.Asc.plugin.init = function () {
    translateUI();
    $("convertAll").onclick = function () { skip = {}; convert(true); };
    $("auto").onchange = function () {
      setStatus(this.checked ? "Automatic conversion enabled." : "Automatic conversion disabled.");
      if (this.checked) convert(false);
    };

    if (typeof window.Asc.plugin.attachEditorEvent === "function") {
      window.Asc.plugin.attachEditorEvent("onTargetPositionChanged", onCursorMoved);
    }
  };


  window.Asc.plugin.event_onTargetPositionChanged = function () {
    if (typeof window.Asc.plugin.attachEditorEvent !== "function") onCursorMoved();
  };


  window.Asc.plugin.onTranslate = function () {
    translateUI();
  };


  window.Asc.plugin.onThemeChanged = function (theme) {
    if (typeof window.Asc.plugin.onThemeChangedBase === "function") {
      window.Asc.plugin.onThemeChangedBase(theme);
    }
    try {
      document.body.style.color = theme["text-normal"] || "";
      document.body.style.background = theme["background-normal"] || "";
    } catch (e) {}
  };

  window.Asc.plugin.button = function () {};

})(window, undefined);
