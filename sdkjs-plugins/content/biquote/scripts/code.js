/*
 * biquote background plugin.
 *
 * - Registers the BIQUOTE and BIQUOTE_CONVERT custom functions with the
 *   spreadsheet editor. Their source lives in scripts/cf/: each function is
 *   stored as one self-contained string, its own file followed by
 *   shared.js, wrapped in an IIFE that calls Api.AddCustomFunction.
 * - Adds a "biquote" toolbar tab whose button opens the side panel
 *   (panel.html) for symbol search, formula building and refresh.
 */
(function (window) {
  var FUNCTIONS = [
    { name: "BIQUOTE", guid: "8d1f5c0a3b6e4f2a9c7d1e0b5a4f3c21", file: "scripts/cf/biquote.js" },
    { name: "BIQUOTE_CONVERT", guid: "2b7e9d4c1a3f4e8b8f6a0c5d9e2b7a14", file: "scripts/cf/convert.js" }
  ];

  var panel = null;
  var tr = function (s) { return window.Asc.plugin.tr(s); };

  function resolveUrl(path) {
    var base = window.location.href.replace(/[^/]*$/, "");
    return base + path;
  }

  async function loadText(path) {
    var res = await fetch(resolveUrl(path), { cache: "no-cache" });
    if (!res.ok) throw new Error("Cannot load " + path);
    return res.text();
  }

  function callMethod(name, params) {
    return new Promise(function (resolve) {
      window.Asc.plugin.executeMethod(name, params || [], resolve);
    });
  }

  async function buildSources() {
    var shared = await loadText("scripts/cf/shared.js");
    var out = [];
    for (var i = 0; i < FUNCTIONS.length; i++) {
      var f = FUNCTIONS[i];
      out.push({
        guid: f.guid,
        name: f.name,
        value: "(function () {\n" + (await loadText(f.file)) + "\n" + shared +
               "\nApi.AddCustomFunction(" + f.name + ");\n})();"
      });
    }
    return out;
  }

  // Merge our functions into the editor's custom-function library. Other
  // background plugins (the bundled AI plugin, for one) rewrite the same
  // library at startup, so a write can be lost to a concurrent one: read it
  // back and retry a few times until ours are there.
  async function registerFunctions() {
    var sources = await buildSources();
    for (var attempt = 0; attempt < 5; attempt++) {
      var raw = await callMethod("GetCustomFunctions");
      var lib = { macrosArray: [], current: -1 };
      if (raw) {
        try { lib = JSON.parse(raw); } catch (e) { /* start clean */ }
      }
      var changed = false;
      sources.forEach(function (src) {
        var existing = null;
        lib.macrosArray.forEach(function (m) { if (m.guid === src.guid || m.name === src.name) existing = m; });
        if (!existing) {
          lib.macrosArray.push({ guid: src.guid, name: src.name, value: src.value });
          changed = true;
        } else if (existing.guid === src.guid && existing.value !== src.value) {
          existing.value = src.value;
          changed = true;
        }
      });
      if (!changed) return;
      await callMethod("SetCustomFunctions", [JSON.stringify(lib)]);
      await new Promise(function (r) { setTimeout(r, 1000 * (attempt + 1)); });
    }
    console.warn("biquote: custom functions could not be registered");
  }

  var toolbarAdded = false;

  function toolbarItems() {
    return {
      guid: window.Asc.plugin.guid,
      // Lives in the existing Plugins tab: one button does not warrant a tab
      // of its own (review feedback on ONLYOFFICE/onlyoffice.github.io#700).
      tabs: [{
        id: "plugins",
        items: [{
          id: "biquote_open",
          type: "big-button",
          text: tr("Market data"),
          hint: tr("Live prices and currency conversion"),
          icons: "resources/%theme-type%(light|dark)/icon%scale%(default).%extension%(png)",
          lockInViewMode: false
        }]
      }]
    };
  }

  function addToolbar() {
    window.Asc.plugin.executeMethod("AddToolbarMenuItem", [toolbarItems()]);
    toolbarAdded = true;
  }

  function openPanel() {
    if (panel) { panel.activate && panel.activate(); return; }
    panel = new window.Asc.PluginWindow();
    panel.attachEvent("onInsertFormula", insertFormula);
    panel.attachEvent("onRefresh", refresh);
    panel.attachEvent("onClosePanel", function () { closePanel(); });
    panel.show({
      url: resolveUrl("panel.html"),
      description: "biquote",
      isVisual: true,
      isModal: false,
      type: "panelRight",
      EditorsSupport: ["cell"],
      size: [320, 600],
      buttons: []
    });
  }

  function closePanel() {
    if (!panel) return;
    try { panel.close(); } catch (e) { /* already closed */ }
    panel = null;
  }

  function insertFormula(formula) {
    window.Asc.scope.bqFormula = formula;
    window.Asc.plugin.callCommand(function () {
      var cell = Api.GetActiveSheet().GetActiveCell();
      cell.SetValue(Asc.scope.bqFormula);
      return cell.GetAddress(false, false, "xlA1", false);
    }, false, true, function (address) {
      if (panel) panel.command("onInserted", address || "");
    });
  }

  function refresh() {
    window.Asc.plugin.callCommand(function () {
      if (typeof Api.RecalculateAllFormulas === "function") Api.RecalculateAllFormulas();
    }, false, true, function () {
      if (panel) panel.command("onRefreshed", new Date().toLocaleTimeString());
    });
  }

  window.Asc.plugin.init = function () {
    if (this.info.editorType !== "cell") return;
    addToolbar();
    this.attachToolbarMenuClickEvent("biquote_open", openPanel);
    registerFunctions().catch(function (e) { console.error("biquote: custom function registration failed", e); });
  };

  // Translations can arrive after init; relabel the button when they do.
  window.Asc.plugin.onTranslate = function () {
    if (toolbarAdded) window.Asc.plugin.executeMethod("UpdateToolbarMenuItem", [toolbarItems()]);
  };

  // The panel is a separate PluginWindow and does not get theme events on
  // its own: forward them so an open panel follows a theme switch.
  window.Asc.plugin.onThemeChanged = function (theme) {
    if (window.Asc.plugin.onThemeChangedBase) window.Asc.plugin.onThemeChangedBase(theme);
    if (panel) panel.command("onThemeChanged", theme);
  };

  // The panel's own close (X) arrives here with its window id. Only that
  // window closes: the background plugin keeps running so the toolbar
  // button and functions stay available.
  window.Asc.plugin.button = function (id, windowId) {
    if (panel && windowId && panel.id == windowId) {
      closePanel();
      return;
    }
    if (!windowId) this.executeCommand("close", "");
  };
})(window);
