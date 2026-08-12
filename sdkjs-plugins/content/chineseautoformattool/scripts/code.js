// scripts/code.js
(function (window, undefined) {
  // ---------------- 初始化 ----------------
  let __pluginInitialized = false;
  let __toolbarEventsBound = false;
  let __toolbarRefreshPending = false;

  window.Asc.plugin.init = function () { 
	if (!__toolbarEventsBound) {
	  bindToolbarEvents.call(this);
	  __toolbarEventsBound = true;
	}
	__pluginInitialized = true;
	refreshToolbarMenu();
  };

  // 子窗口句柄
  let __toolbarAdded = false;
  let winSetting = null;
  let winOptions = null;
  let winReport = null;
  let winInfo = null;
  let selectedTextToFormat = "";

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null || raw === undefined || raw === "") return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  const tr = (s) => window.Asc && window.Asc.plugin ? window.Asc.plugin.tr(s) : s;
  // —— 本地化回调：词典就绪后，刷新工具栏文本与提示 ——
  window.Asc.plugin.onTranslate = function () {
    __toolbarRefreshPending = true;
    refreshToolbarMenu();
  };

  window.Asc.plugin.onThemeChanged = function (theme) {
    __toolbarRefreshPending = true;
    refreshToolbarMenu();
    broadcastThemeToChildWindows(theme);
  };

  function refreshToolbarMenu() {
    if (
      !__toolbarRefreshPending &&
      __toolbarAdded
    ) {
      return;
    }

    if (
      !__pluginInitialized ||
      !window.Asc ||
      !window.Asc.plugin ||
      typeof window.Asc.plugin.executeMethod !== "function"
    ) {
      return;
    }

    const items = getToolbarItems();
    if (!__toolbarAdded) {
      window.Asc.plugin.executeMethod("AddToolbarMenuItem", [items]);
      __toolbarAdded = true;
    } else {
      window.Asc.plugin.executeMethod("UpdateToolbarMenuItem", [items]);
    }
    __toolbarRefreshPending = false;
  }

  function normalizeEllipsis(text, replacement = "……") {
    return String(text).replace(/(?:\.{3,}|…+)/g, replacement);
  }

  function expandPunctuationSelection(map, chars) {
    if (!Array.isArray(chars) || chars.length === 0) return [];

    const reverseMap = {};
    Object.keys(map).forEach((source) => {
      reverseMap[map[source]] = source;
    });

    const expanded = new Set();
    chars.forEach((char) => {
      expanded.add(char);
      if (Object.prototype.hasOwnProperty.call(map, char)) {
        expanded.add(map[char]);
      }
      if (Object.prototype.hasOwnProperty.call(reverseMap, char)) {
        expanded.add(reverseMap[char]);
      }
    });

    return Array.from(expanded);
  }

  function broadcastThemeToChildWindows(theme) {
    [winSetting, winOptions, winReport, winInfo].forEach((childWindow) => {
      try {
        if (childWindow && typeof childWindow.command === "function") {
          childWindow.command("onThemeChanged", theme);
        }
      } catch (e) {}
    });
  }

  function convertCharactersByMap(text, map, enabledChars, checkMappedChar = true) {
    const enabled = enabledChars && enabledChars.length ? new Set(enabledChars) : null;
    const normalized = normalizeEllipsis(text);
    return Array.from(normalized).map((ch) => {
      if (!Object.prototype.hasOwnProperty.call(map, ch)) {
        return ch;
      }
      const mapped = map[ch];
      const settingsChar = checkMappedChar ? mapped : ch;
      if (enabled && !enabled.has(settingsChar)) {
        return ch;
      }
      return mapped;
    }).join("");
  }

  function isCjkChar(ch) {
    return /[㐀-䶿一-鿿〇]/.test(ch || "");
  }

  function hasCjkTextOnSide(chars, index, step) {
    let sawToken = false;
    for (let cursor = index + step; cursor >= 0 && cursor < chars.length; cursor += step) {
      const ch = chars[cursor];
      if (/\s/.test(ch)) {
        continue;
      }
      if (isCjkChar(ch)) {
        return true;
      }
      if (/[A-Za-z0-9]/.test(ch)) {
        sawToken = true;
        continue;
      }
      if (/[._-]/.test(ch) && sawToken) {
        continue;
      }
      break;
    }
    return false;
  }

  function isFullWidthChineseContext(chars, index) {
    return hasCjkTextOnSide(chars, index, -1) || hasCjkTextOnSide(chars, index, 1);
  }

  function convertCharactersInCjkContext(text, map, enabledChars, checkMappedChar = true) {
    const enabled = enabledChars && enabledChars.length ? new Set(enabledChars) : null;
    const chars = Array.from(normalizeEllipsis(text || ""));
    return chars.map((ch, index) => {
      if (!Object.prototype.hasOwnProperty.call(map, ch)) {
        return ch;
      }
      const mapped = map[ch];
      const settingsChar = checkMappedChar ? mapped : ch;
      if (enabled && !enabled.has(settingsChar)) {
        return ch;
      }
      if (!isFullWidthChineseContext(chars, index)) {
        return ch;
      }
      return mapped;
    }).join("");
  }

  // 生成绝对 URL
  function resolveUrl(path) {
    try {
      return new URL(path, window.location.href).toString();
    } catch (e) {
      return path;
    }
  }

  // ---------------- 统一进入报告流程 ----------------
  function proceedToReport() {
    const editorType = window.Asc.plugin.info.editorType || "word";
    let results;
    try {
      // Depends on runFormatCheck(text) in scripts/formatChecker.js
      results = runFormatCheck(selectedTextToFormat, editorType);
    } catch (e) {
      window.Asc.plugin.executeMethod("ShowError", [
        tr("Detection failed: formatChecker.js is missing or has an error"),
      ]);
      return;
    }

    const lines = editorType === "cell"
        ? selectedTextToFormat.split(/\t|\n/)
        : selectedTextToFormat.split(/\n/); // Do not filter empty lines; preserve line count consistency
    const fixed = results.map((r) => r.fixed);
    const report = results.filter((r) => r.errors && r.errors.length > 0);

    if (lines[lines.length - 1] === "") {
      lines.pop();
      fixed.pop();
    }
    if (lines.length !== fixed.length) {
      window.Asc.plugin.executeMethod("ShowError", [
        tr("Conversion failed: paragraph count mismatch"),
      ]);
      return;
    }
    if (report.length === 0) {
      window.Asc.plugin.executeMethod("ShowError", [
        tr("No fixable issues found"),
      ]);
      return;
    }

	closeWindowIfMatch(winReport);
    winReport = new window.Asc.PluginWindow();
    winReport.attachEvent("onWindowReportReady", function () {
      winReport.command("onReportPageData", {
        zhlintReport: report,
        originalLines: lines,
        fixedLines: fixed,
        type: "report-data",
      });
    });
    winReport.attachEvent("onWindowReportMessage", batchReplaceResultHandler);
    winReport.show({
      url: resolveUrl("panels/report.html"),
      description: tr("Formatting report"),
      isModal: false,
      isVisual: true,
      size: [720, 480],
      EditorsSupport: ["word", "cell"],
      buttons: [
        { text: tr("Apply & Save"), primary: true },
        { text: tr("Cancel"), primary: false },
      ],
    });
  }

  function batchReplaceResultHandler(data) {
    if (!data) return;
    try {
      Asc.scope.convertedLines = JSON.parse(data);
    } catch (e) {
      Asc.scope.convertedLines = null;
    }
    window.Asc.plugin.callCommand(
      function () {
        if (Asc.scope.convertedLines)
          Api.ReplaceTextSmart(Asc.scope.convertedLines, "\t", "\r");
      }, false, true, function () {
        if (winReport) {
          closeWindowIfMatch(winReport);
          winReport = null;
        }
      },
    );
  }

  function bindToolbarEvents() {
    // A. Force Full-width
    this.attachToolbarMenuClickEvent("quanjiao", function () {
      const plugin = window.Asc.plugin;

      Asc.scope.__punct__ = {
        map: {
          ",": "\uFF0C",
          ";": "\uFF1B",
          ":": "\uFF1A",
          ".": "\u3002",
          '"': "\u201D",
          "'": "\u2019",
          "-": "\u2014",
          "\u2013": "\u2014",
          $: "\uFF04",
          "\u00A5": "\uFFE5",
          "\u00A3": "\uFFE1",
          "\u00A2": "\uFFE0",
          "<": "\u300A",
          ">": "\u300B",
          "(": "\uFF08",
          ")": "\uFF09",
          "/": "\uFF0F",
          "?": "\uFF1F",
          "!": "\uFF01",
        },
        settings: {
          punctuation: expandPunctuationSelection({
            ",": "\uFF0C",
            ";": "\uFF1B",
            ":": "\uFF1A",
            ".": "\u3002",
            '"': "\u201D",
            "'": "\u2019",
            "-": "\u2014",
            "\u2013": "\u2014",
            $: "\uFF04",
            "\u00A5": "\uFFE5",
            "\u00A3": "\uFFE1",
            "\u00A2": "\uFFE0",
            "<": "\u300A",
            ">": "\u300B",
            "(": "\uFF08",
            ")": "\uFF09",
            "/": "\uFF0F",
            "?": "\uFF1F",
            "!": "\uFF01",
          }, readJSON("selectedPunctuation", [])),
        },
      };

      const props = {
        Numbering: false,
        Math: false,
        TableCellSeparator: "\t",
        TableRowSeparator: "\n",
        ParaSeparator: "\n",
        TabSymbol: "\t",
        NewLineSeparator: "\r",
      };

      plugin.executeMethod("GetSelectedText", [props], function (t) {
        const picked = t || "";
        const convertLine = (line) =>
          convertCharactersInCjkContext(
            line,
            Asc.scope.__punct__.map,
            Asc.scope.__punct__.settings.punctuation || [],
          );

        if (picked.trim()) {
          const sourceLines = picked.split(/\t|\n/);
          const out = sourceLines.map(convertLine);
          const changedLines = out.filter((line, index) => line !== sourceLines[index]).length;
          if (out[out.length - 1] === "") out.pop();
          if (!changedLines) {
            getInfoModal(tr("No punctuation needed conversion in the selection."));
            return;
          }
          Asc.scope._lines = out;
          plugin.callCommand(
            function () {
              if (Asc.scope._lines && typeof Api.ReplaceTextSmart === "function") {
                Api.ReplaceTextSmart(Asc.scope._lines, "\t", "\r");
              }
            }, false, true, function () {
              getInfoModal(
                tr("Converted selection: ") + changedLines + tr(" line(s)."),
              );
            },
          );
          return;
        }

        plugin.callCommand(
          function () {
            function normalizeEllipsisIn(text) {
              return String(text).replace(/(?:\.{3,}|\u2026+)/g, "\u2026\u2026");
            }
            function buildEnabledSet(chars) {
              if (!chars || !chars.length) return null;
              var set = {};
              for (var i = 0; i < chars.length; i++) set[chars[i]] = true;
              return set;
            }
            function convertIn(line) {
              if (!line) return line;
              var map = Asc.scope.__punct__.map;
              var enabled = buildEnabledSet(Asc.scope.__punct__.settings.punctuation || []);
              var normalized = Array.from(normalizeEllipsisIn(line));
              function isCjk(ch) {
                return /[\u3400-\u4DBF\u4E00-\u9FFF\u3007]/.test(ch || "");
              }
              function hasCjkTextOnSide(index, step) {
                var sawToken = false;
                for (var cursor = index + step; cursor >= 0 && cursor < normalized.length; cursor += step) {
                  var ch = normalized[cursor];
                  if (/\s/.test(ch)) continue;
                  if (isCjk(ch)) return true;
                  if (/[A-Za-z0-9]/.test(ch)) {
                    sawToken = true;
                    continue;
                  }
                  if (/[._-]/.test(ch) && sawToken) continue;
                  break;
                }
                return false;
              }
              return normalized.map(function (ch, index) {
                if (!Object.prototype.hasOwnProperty.call(map, ch)) return ch;
                var mapped = map[ch];
                if (enabled && !enabled[mapped]) return ch;
                if (!hasCjkTextOnSide(index, -1) && !hasCjkTextOnSide(index, 1)) return ch;
                return mapped;
              }).join("");
            }

            try {
              if (typeof Api.GetActiveSheet === "function") {
                var ws = Api.GetActiveSheet();
                var rng = ws && ws.GetSelection && ws.GetSelection();
                if (!rng && typeof Api.GetSelection === "function") rng = Api.GetSelection();
                if (rng && typeof rng.GetValue === "function" && typeof rng.SetValue === "function") {
                  var val = rng.GetValue();
                  var changed = false, out;

                  function convCell(v) {
                    if (typeof v !== "string") return v;
                    var nv = convertIn(v);
                    if (nv !== v) changed = true;
                    return nv;
                  }

                  if (Array.isArray(val)) {
                    out = [];
                    for (var r = 0; r < val.length; r++) {
                      var row = val[r];
                      if (Array.isArray(row)) {
                        var nr = new Array(row.length);
                        for (var c = 0; c < row.length; c++) nr[c] = convCell(row[c]);
                        out.push(nr);
                      } else out.push(convCell(row));
                    }
                  } else {
                    out = convCell(val);
                  }

                  if (changed) {
                    rng.SetValue(out);
                    return true;
                  }
                  return false;
                }
              }
            } catch (e) {}
          },
          false,
          true,
          function (returnValue) {
            if (returnValue) {
              getInfoModal(tr("Converted punctuation in selected cells."));
            }
          },
        );
      });
    });

    // B. Force Half-width
    this.attachToolbarMenuClickEvent("banjiao", function () {
      const plugin = window.Asc.plugin;

      Asc.scope.__punct__ = {
        map: {
          "\uFF0C": ",",
          "\uFF1B": ";",
          "\uFF1A": ":",
          "\u3002": ".",
          "\u201C": '"',
          "\u201D": '"',
          "\u2018": "'",
          "\u2019": "'",
          "\u2014": "-",
          "\uFF0D": "-",
          "\uFF04": "$",
          "\uFFE5": "\u00A5",
          "\uFFE1": "\u00A3",
          "\uFFE0": "\u00A2",
          "\u300A": "<",
          "\u300B": ">",
          "\uFF08": "(",
          "\uFF09": ")",
          "\uFF1F": "?",
          "\uFF01": "!",
          "\uFF0F": "/",
        },
        settings: {
          punctuation: expandPunctuationSelection({
            "\uFF0C": ",",
            "\uFF1B": ";",
            "\uFF1A": ":",
            "\u3002": ".",
            "\u201C": '"',
            "\u201D": '"',
            "\u2018": "'",
            "\u2019": "'",
            "\u2014": "-",
            "\uFF0D": "-",
            "\uFF04": "$",
            "\uFFE5": "\u00A5",
            "\uFFE1": "\u00A3",
            "\uFFE0": "\u00A2",
            "\u300A": "<",
            "\u300B": ">",
            "\uFF08": "(",
            "\uFF09": ")",
            "\uFF1F": "?",
            "\uFF01": "!",
            "\uFF0F": "/",
          }, readJSON("selectedPunctuation", [])),
        },
      };

      const props = {
        Numbering: false,
        Math: false,
        TableCellSeparator: "\t",
        TableRowSeparator: "\n",
        ParaSeparator: "\n",
        TabSymbol: "\t",
        NewLineSeparator: "\r",
      };

      plugin.executeMethod("GetSelectedText", [props], function (t) {
        const picked = t || "";
        const convertLine = (line) =>
          convertCharactersByMap(
            line,
            Asc.scope.__punct__.map,
            Asc.scope.__punct__.settings.punctuation || [],
            false,
          );

        if (picked.trim()) {
          const sourceLines = picked.split(/\t|\n/);
          const out = sourceLines.map(convertLine);
          const changedLines = out.filter((line, index) => line !== sourceLines[index]).length;
          if (out[out.length - 1] === "") out.pop();
          if (!changedLines) {
            getInfoModal(tr("No punctuation needed conversion in the selection."));
            return;
          }
          Asc.scope._lines = out;
          plugin.callCommand(
            function () {
              if (Asc.scope._lines && typeof Api.ReplaceTextSmart === "function") {
                Api.ReplaceTextSmart(Asc.scope._lines, "\t", "\r");
              }
            }, false, true, function () {
              getInfoModal(
                tr("Converted selection: ") + changedLines + tr(" line(s)."),
              );
            },
          );
          return;
        }

        plugin.callCommand(
          function () {
            function escIn(x) {
              return x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            }
            function convertIn(line) {
              if (!line) return line;
              var m = Asc.scope.__punct__.map;
              var on = Asc.scope.__punct__.settings.punctuation || [];
              var v = line.replace(/(?:\u2026+|\.{3,})/g, "\u2026\u2026");
              for (var k in m) {
                if (!m.hasOwnProperty(k)) continue;
                var half = m[k];
                if (on.length === 0 || on.indexOf(k) !== -1) {
                  v = v.replace(new RegExp(escIn(k), "g"), half);
                }
              }
              return v;
            }

            try {
              if (typeof Api.GetActiveSheet === "function") {
                var ws = Api.GetActiveSheet();
                var rng = ws && ws.GetSelection && ws.GetSelection();
                if (!rng && typeof Api.GetSelection === "function") rng = Api.GetSelection();
                if (rng && typeof rng.GetValue === "function" && typeof rng.SetValue === "function") {
                  var val = rng.GetValue();
                  var changed = false, out;

                  function convCell(v) {
                    if (typeof v !== "string") return v;
                    var nv = convertIn(v);
                    if (nv !== v) changed = true;
                    return nv;
                  }

                  if (Array.isArray(val)) {
                    out = [];
                    for (var r = 0; r < val.length; r++) {
                      var row = val[r];
                      if (Array.isArray(row)) {
                        var nr = new Array(row.length);
                        for (var c = 0; c < row.length; c++) nr[c] = convCell(row[c]);
                        out.push(nr);
                      } else out.push(convCell(row));
                    }
                  } else {
                    out = convCell(val);
                  }

                  if (changed) {
                    rng.SetValue(out);
                    return true;
                  }
                  return false;
                }
              }
            } catch (e) {}
          }, false, true, function (returnValue) {
            if (returnValue) {
              getInfoModal(tr("Converted punctuation in selected cells."));
            }
          },
        );
      });
    });

    // C. Smart Convert
    this.attachToolbarMenuClickEvent("zhineng", function () {
      const plugin = window.Asc.plugin;
      const resolveUrl = window.resolveUrl || ((p) => p);

      const props = {
        Numbering: false,
        Math: false,
        TableCellSeparator: "\n",
        TableRowSeparator: "\n",
        ParaSeparator: "\n",
        TabSymbol: "\t",
        NewLineSeparator: "\r",
      };

      plugin.executeMethod("GetSelectedText", [props], function (s) {
        if (s && s.trim()) {
          openPanel(s);
          return;
        }

        plugin.executeMethod("GetSelectedContent", [{ type: "text" }], function (s2) {
          if (s2 && s2.trim()) {
            openPanel(s2.replace(/\r\n?/g, "\n"));
            return;
          }

          plugin.callCommand(
            function () {
              var resultText = "";

              try {
                if (typeof Api.GetActiveSheet === "function") {
                  var ws = Api.GetActiveSheet();
                  var rng = ws && ws.GetSelection && ws.GetSelection();
                  if (!rng && typeof Api.GetSelection === "function") rng = Api.GetSelection();

                  if (rng && typeof rng.GetValue === "function") {
                    var val = rng.GetValue();
                    if (val) {
                      if (typeof val === "string") {
                        resultText = val;
                      } else if (Array.isArray(val)) {
                        var lines = [];
                        for (var r = 0; r < val.length; r++) {
                          lines.push(val[r].join("\t"));
                        }
                        resultText = lines.join("\n");
                      }
                    }
                  }
                }
              } catch (e) {
                console.error(">>> Excel exception:", e);
              }

              try {
                return resultText ? { ready: true, text: resultText } : { ready: false };
              } catch (e) {
                return { ready: false };
              }
            }, false, true, function (returnValue) {
              if (returnValue && returnValue.ready) {
                const text = returnValue.text;
                if (text && text.trim()) {
                  openPanel(text);
                } else {
                  plugin.executeMethod("ShowError", [tr("Please select the text to diagnose!")]);
                }
              } else {
                plugin.executeMethod("ShowError", [tr("Please select the text to diagnose!")]);
              }
            },
          );
        });
      });

      function openPanel(text) {
        selectedTextToFormat = text;
        closeWindowIfMatch(winOptions);

        winOptions = new window.Asc.PluginWindow();
        winOptions.show({
          url: resolveUrl("panels/space-options.html"),
          description: tr("Spacing options"),
          isModal: true,
          isVisual: true,
          size: [560, 340],
          EditorsSupport: ["word", "cell"],
          buttons: [
            { text: tr("Confirm"), primary: true },
            { text: tr("Cancel"), primary: false },
          ],
        });
      }
    });

    // D. Settings
    this.attachToolbarMenuClickEvent("setting", function () {
      closeWindowIfMatch(winSetting);
      winSetting = new window.Asc.PluginWindow();
      winSetting.show({
        url: resolveUrl("panels/setting.html"),
        description: tr("Settings"),
        isModal: true,
        isVisual: true,
        size: [450, 380],
        buttons: [{ text: tr("Save"), primary: false }],
        EditorsSupport: ["word", "cell"],
      });
    });
  }

  // ---------------- Unify window close callback ----------------
  // Helper function to close window if it matches
  function closeWindowIfMatch(win) {
    try {
      win.close();
    } catch (e) {}
  }

  window.Asc.plugin.button = function (id, windowId) {
    if (winInfo && winInfo.id == windowId) {
      closeWindowIfMatch(winInfo);
      winInfo = null;
      return;
    }
    if (winSetting && winSetting.id == windowId) {
      closeWindowIfMatch(winSetting);
      winSetting = null;
      return;
    }

    if (winOptions && windowId === winOptions.id) {
      // ⬇️ Added: id === 0 represents Confirm; id === 1 represents Cancel
      if (id === 0) {
        if (selectedTextToFormat.trim()) {
          proceedToReport();
        }
      }
      closeWindowIfMatch(winOptions);
      winOptions = null;
    }

    if (winReport && windowId === winReport.id) {
      if (id === 0) {
        winReport.command("onReportWindowClosed");
      } else {
        closeWindowIfMatch(winReport);
        winReport = null;
      }
    }
  };

  // ---------------- Toolbar Definition ----------------
  function getToolbarItems() {
    return {
      guid: window.Asc.plugin.guid,
      tabs: [
        {
          id: "tab_2",
          text: window.Asc.plugin.tr("Chinese Formatter"),
          items: [
            {
              id: "zhineng",
              type: "button",
              text: tr("Smart Convert"),
              hint: tr("Validate Chinese typography automatically"),
              icons: "resources/buttons/icon_zhineng.png",
              lockInViewMode: true,
            },
            {
              id: "quanjiao",
              type: "button",
              text: tr("Force Full-width"),
              hint: tr("Force all symbols in selection to full-width"),
              icons: "resources/buttons/icon_quanjiao.png",
              lockInViewMode: true,
              separator: true,
            },
            {
              id: "banjiao",
              type: "button",
              text: tr("Force Half-width"),
              hint: tr("Force all symbols in selection to half-width"),
              icons: "resources/buttons/icon_banjiao.png",
              lockInViewMode: true,
            },
            {
              id: "setting",
              type: "button",
              text: tr("Settings"),
              hint: tr("Configure conversion rules"),
              icons: "resources/buttons/icon_setting.png",
              lockInViewMode: true,
            },
          ],
        },
      ],
    };
  }

  function getInfoModal(message) {
	closeWindowIfMatch(winInfo);
    winInfo = new window.Asc.PluginWindow();
    winInfo.attachEvent("onWindowReady", function () {
      winInfo.command("onWindowMessage", {
        message: message || "",
        type: "info",
      });
    });
    winInfo.show({
      url: resolveUrl("panels/info.html"),
      description: tr("Info"),
      isModal: true,
      isVisual: true,
      size: [400, 100],
      EditorsSupport: ["word", "cell"],
      buttons: [{ text: tr("OK"), primary: true }],
    });
  }
})(window);

