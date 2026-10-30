/*
 * marinaMoji character composer -> ONLYOFFICE.
 *
 * Desktop Editors only. Keep this panel open. On Insert the composer writes
 * composer_result.js next to index.html (svg and/or text). The panel polls that
 * file with XHR (no eval; the fixed one-line format is parsed with JSON.parse)
 * and inserts text or an inline PNG at the caret. The clipboard is read only
 * when the user clicks "Insert composed".
 */
(function () {
  "use strict";

  var POLL_MS = 1000;
  var MAX_AGE_MS = 120000;
  var RASTER_HEIGHT_PX = 256;
  var DEFAULT_PT = 12;
  // The drawing fills its square; a font's ink is a little smaller and hangs a
  // little below the baseline. Measured against ONLYOFFICE's own layout (Song-style CJK face).
  var INK_SCALE = 0.94;
  var DROP_EM = 0.15;
  var STORE_KEY = "marinamoji.composer.lastId";

  var busy = false;
  var memoryId = 0;
  var started = false;

  function lastSeenId() {
    try {
      return Number(window.localStorage.getItem(STORE_KEY)) || 0;
    } catch (e) {
      return 0;
    }
  }

  function rememberId(id) {
    try {
      window.localStorage.setItem(STORE_KEY, String(id));
    } catch (e) {}
    memoryId = id;
  }

  function setStatus(text) {
    var el = document.getElementById("composer-status");
    if (el) el.textContent = text;
  }

  function svgSize(svg) {
    var w = /<svg[^>]*\swidth="([\d.]+)"/.exec(svg);
    var h = /<svg[^>]*\sheight="([\d.]+)"/.exec(svg);
    var width = w ? Number(w[1]) : 100;
    var height = h ? Number(h[1]) : width;
    return { width: width || 100, height: height || 100 };
  }

  // The composer both types a Unicode character through the input method and
  // writes it to composer_result.js. Where the input method delivers it
  // (macOS, Windows) the plugin must not insert it a second time. Only Linux
  // Desktop is known to drop the input-method commit, so only there is a
  // text hand-off inserted without being asked.
  function insertsTextAutomatically() {
    var ua = String((window.navigator && window.navigator.userAgent) || "");
    return /Linux|X11/i.test(ua) && !/Android|Mac OS X|Windows/i.test(ua);
  }

  function isDesktop() {
    try {
      return !!(window.AscDesktopEditor || (window.parent && window.parent.AscDesktopEditor));
    } catch (e) {
      return !!window.AscDesktopEditor;
    }
  }

  function svgToPng(svg) {
    return new Promise(function (resolve, reject) {
      var size = svgSize(svg);
      var aspect = size.width / size.height;
      var img = new Image();
      img.onload = function () {
        try {
          var canvas = document.createElement("canvas");
          canvas.height = RASTER_HEIGHT_PX;
          canvas.width = Math.max(1, Math.round(RASTER_HEIGHT_PX * aspect));
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve({ dataUrl: canvas.toDataURL("image/png"), aspect: aspect });
        } catch (e) {
          reject(e);
        }
      };
      img.onerror = function () {
        reject(new Error("SVG could not be rendered"));
      };
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    });
  }

  function pasteHtml(png) {
    var heightPx = Math.round((DEFAULT_PT * 96) / 72);
    var html =
      '<img src="' +
      png.dataUrl +
      '" width="' +
      Math.round(heightPx * png.aspect) +
      '" height="' +
      heightPx +
      '" alt="marinaMoji composed character"/>';
    if (!window.Asc || !window.Asc.plugin || !window.Asc.plugin.executeMethod) {
      throw new Error("ONLYOFFICE plugin API is not ready");
    }
    window.Asc.plugin.executeMethod("PasteHtml", [html]);
  }

  function insertAtCursor(png, done) {
    var asc = window.Asc;
    var settled = false;
    function finish(ok) {
      if (settled) return;
      settled = true;
      done(ok);
    }
    // Desktop sometimes never invokes the callCommand callback; don't leave busy stuck.
    window.setTimeout(function () {
      finish(false);
    }, 8000);
    if (!asc || !asc.plugin || !asc.plugin.callCommand) {
      try {
        pasteHtml(png);
        finish(true);
      } catch (e) {
        finish(false);
      }
      return;
    }
    asc.scope = asc.scope || {};
    asc.scope.composedPng = png.dataUrl;
    asc.scope.composedAspect = png.aspect;
    asc.scope.composedDefaultPt = DEFAULT_PT;
    asc.scope.composedInkScale = INK_SCALE;
    asc.scope.composedDropEm = DROP_EM;
    try {
      asc.plugin.callCommand(
        function () {
          var doc = Api.GetDocument();
          function sizePt(textPr) {
            var hps = textPr && textPr.GetFontSize ? Number(textPr.GetFontSize()) : 0;
            return hps > 0 ? hps / 2 : 0;
          }
          var pt = 0;
          try {
            var cur = doc.GetCurrentParagraph ? doc.GetCurrentParagraph() : null;
            if (cur) {
              for (var i = cur.GetElementsCount() - 1; i >= 0 && !pt; i--) {
                var el = cur.GetElement(i);
                if (el && el.GetText && el.GetText()) {
                  pt = el.GetFontSize
                    ? sizePt({
                        GetFontSize: function () {
                          return el.GetFontSize();
                        },
                      })
                    : sizePt(el.GetTextPr && el.GetTextPr());
                }
              }
              if (!pt && cur.GetTextPr) pt = sizePt(cur.GetTextPr());
            }
          } catch (e) {}
          if (!pt && doc.GetDefaultTextPr) pt = sizePt(doc.GetDefaultTextPr());
          if (!pt) pt = Asc.scope.composedDefaultPt;
          var heightEmu = Math.round(pt * Asc.scope.composedInkScale * 12700);
          var drawing = Api.CreateImage(
            Asc.scope.composedPng,
            Math.round(heightEmu * Asc.scope.composedAspect),
            heightEmu
          );
          if (drawing.SetWrappingStyle) drawing.SetWrappingStyle("inline");
          if (drawing.SetName) drawing.SetName("marinaMoji composed character");
          var run = Api.CreateRun();
          if (run.SetPosition) run.SetPosition(-Math.round(pt * 2 * Asc.scope.composedDropEm));
          run.AddDrawing(drawing);
          var para = Api.CreateParagraph();
          para.AddElement(run);
          var clean = Api.CreateRun();
          if (clean.SetPosition) clean.SetPosition(0);
          para.AddElement(clean);
          doc.InsertContent([para], true);
          return pt || true;
        },
        false,
        true,
        function (ok) {
          if (!ok) {
            try {
              pasteHtml(png);
              finish(true);
            } catch (e) {
              finish(false);
            }
          } else {
            finish(ok);
          }
        }
      );
    } catch (e) {
      try {
        pasteHtml(png);
        finish(true);
      } catch (e2) {
        finish(false);
      }
    }
  }

  function insertText(text, id, opts) {
    opts = opts || {};
    if (typeof text !== "string" || !text) return false;
    id = Number(id) || Date.now();
    if (!opts.force && id <= Math.max(lastSeenId(), memoryId)) {
      setStatus("Already tried this character (id " + id + "). Click Insert composed to retry.");
      return false;
    }
    if (!opts.force && Date.now() - id > MAX_AGE_MS) {
      rememberId(id);
      setStatus("Composer result is older than two minutes. Insert again in the composer.");
      return false;
    }
    if (busy) {
      setStatus("Insert already in progress…");
      return false;
    }
    busy = true;
    rememberId(id);
    setStatus("Inserting character…");
    var asc = window.Asc;
    var settled = false;
    function done(ok) {
      if (settled) return;
      settled = true;
      if (ok) {
        rememberId(id);
        setStatus("Inserted character.");
      } else {
        setStatus("Insert failed. Click in the document, then try Insert composed.");
      }
      busy = false;
    }
    window.setTimeout(function () {
      done(false);
    }, 8000);
    if (!asc || !asc.plugin) {
      done(false);
      return true;
    }
    if (asc.plugin.executeMethod) {
      try {
        asc.plugin.executeMethod("PasteText", [text]);
        done(true);
        return true;
      } catch (e) {}
    }
    if (!asc.plugin.callCommand) {
      done(false);
      return true;
    }
    asc.scope = asc.scope || {};
    asc.scope.composerText = text;
    try {
      asc.plugin.callCommand(
        function () {
          var doc = Api.GetDocument();
          var run = Api.CreateRun();
          run.AddText(Asc.scope.composerText);
          var para = Api.CreateParagraph();
          para.AddElement(run);
          doc.InsertContent([para], true);
          return true;
        },
        false,
        true,
        function (ok) {
          done(!!ok);
        }
      );
    } catch (e) {
      done(false);
    }
    return true;
  }

  function insertSvg(svg, id, opts) {
    opts = opts || {};
    if (typeof svg !== "string" || svg.indexOf("<svg") < 0) return false;
    id = Number(id) || Date.now();
    if (!opts.force && id <= Math.max(lastSeenId(), memoryId)) {
      setStatus("Already tried this drawing (id " + id + "). Click Insert composed to retry.");
      return false;
    }
    if (!opts.force && Date.now() - id > MAX_AGE_MS) {
      rememberId(id);
      setStatus("Composer result is older than two minutes. Insert again in the composer.");
      return false;
    }
    if (busy) {
      setStatus("Insert already in progress…");
      return false;
    }
    busy = true;
    rememberId(id);
    setStatus("Inserting composed character…");
    svgToPng(svg)
      .then(function (png) {
        return new Promise(function (resolve) {
          insertAtCursor(png, resolve);
        });
      })
      .then(function (ok) {
        if (ok) {
          rememberId(id);
          setStatus(
            "Inserted composed character" +
              (typeof ok === "number" ? " at " + ok + " pt." : ".")
          );
        } else {
          setStatus("Insert failed. Click in the document, then try Insert composed.");
        }
      })
      .catch(function (e) {
        setStatus("Insert failed: " + (e && e.message ? e.message : e));
      })
      .then(function () {
        busy = false;
      });
    return true;
  }

  function composerResultBaseUrl() {
    try {
      var href = String(window.location.href || "");
      return href.replace(/[#?].*$/, "").replace(/[^/]*$/, "") + "composer_result.js";
    } catch (e) {
      return "composer_result.js";
    }
  }

  // The IME writes exactly: window.marinaMojiComposerResult={id:N[,svg:"…"][,text:"…"]};
  // Match that shape and hand the string literals to JSON.parse.
  var RESULT_RE =
    /^\s*window\.marinaMojiComposerResult\s*=\s*\{\s*id:\s*(\d+)\s*(?:,\s*svg:\s*("(?:[^"\\\r\n]|\\.)*"))?\s*(?:,\s*text:\s*("(?:[^"\\\r\n]|\\.)*"))?\s*\}\s*;?\s*$/;

  function parseComposerResult(source) {
    var m = RESULT_RE.exec(source);
    if (!m) return undefined;
    try {
      var result = { id: Number(m[1]) };
      if (m[2]) result.svg = JSON.parse(m[2]);
      if (m[3]) result.text = JSON.parse(m[3]);
      return result;
    } catch (e) {
      return undefined;
    }
  }

  function loadComposerResult() {
    return new Promise(function (resolve) {
      var xhr = new XMLHttpRequest();
      try {
        // No ?query — that breaks file:// on Desktop.
        xhr.open("GET", composerResultBaseUrl(), true);
        xhr.overrideMimeType("text/plain; charset=utf-8");
        xhr.onload = function () {
          if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 300)) {
            var result = parseComposerResult(xhr.responseText);
            resolve(result);
          } else {
            resolve(undefined);
          }
        };
        xhr.onerror = function () {
          resolve(undefined);
        };
        xhr.send();
      } catch (e) {
        resolve(undefined);
      }
    });
  }

  function readClipboardSvg() {
    if (!navigator.clipboard || !navigator.clipboard.readText) {
      return Promise.resolve(null);
    }
    return navigator.clipboard
      .readText()
      .then(function (text) {
        if (text && text.indexOf("<svg") >= 0) return text.trim();
        return null;
      })
      .catch(function () {
        return null;
      });
  }

  function poll(opts) {
    opts = opts || {};
    if (busy) {
      if (opts.force) setStatus("Insert already in progress…");
      return;
    }
    loadComposerResult().then(function (result) {
      // Unicode character from the composer (IBus may also try; often fails in Desktop).
      if (result && result.text && !opts.force && !insertsTextAutomatically()) {
        // The input method already typed it.
        if (!result.svg) {
          if (Number(result.id) > Math.max(lastSeenId(), memoryId)) rememberId(Number(result.id));
          return;
        }
      } else if (result && result.text && insertText(result.text, result.id, opts)) {
        return;
      }
      if (result && insertSvg(result.svg, result.id, opts)) return;
      if (opts.force && result) {
        setStatus("Loaded composer_result.js but it has no usable svg/text.");
        return;
      }
      if (opts.force && !result) {
        setStatus("Could not load composer_result.js next to the plugin.");
        return;
      }
      if (!opts.force) return;
      return readClipboardSvg().then(function (svg) {
        if (!svg) {
          setStatus("No composer_result.js and no SVG on the clipboard.");
          return;
        }
        insertSvg(svg, Date.now(), opts);
      });
    });
  }

  function refreshSizes() {
    return new Promise(function (resolve) {
      var asc = window.Asc;
      if (!asc || !asc.plugin || !asc.plugin.callCommand) {
        resolve(0);
        return;
      }
      asc.scope = asc.scope || {};
      asc.scope.composedDefaultPt = DEFAULT_PT;
      asc.scope.composedInkScale = INK_SCALE;
      asc.scope.composedDropEm = DROP_EM;
      try {
        asc.plugin.callCommand(
          function () {
            var doc = Api.GetDocument();
            if (!doc.GetAllDrawingObjects) return 0;
            function sizePt(textPr) {
              var hps = textPr && textPr.GetFontSize ? Number(textPr.GetFontSize()) : 0;
              return hps > 0 ? hps / 2 : 0;
            }
            function paragraphPt(para) {
              var pt = 0;
              for (var i = para.GetElementsCount() - 1; i >= 0 && !pt; i--) {
                var el = para.GetElement(i);
                if (el && el.GetText && el.GetText() && el.GetTextPr) {
                  pt = sizePt(el.GetTextPr());
                }
              }
              if (!pt && para.GetTextPr) pt = sizePt(para.GetTextPr());
              if (!pt && doc.GetDefaultTextPr) pt = sizePt(doc.GetDefaultTextPr());
              return pt || Asc.scope.composedDefaultPt;
            }
            var drawings = doc.GetAllDrawingObjects();
            var count = 0;
            for (var d = 0; d < drawings.length; d++) {
              var drawing = drawings[d];
              try {
                if (!drawing.GetName || drawing.GetName() !== "marinaMoji composed character") {
                  continue;
                }
                var para = drawing.GetParentParagraph();
                if (!para) continue;
                var pt = paragraphPt(para);
                var h = Math.round(pt * Asc.scope.composedInkScale * 12700);
                var oldH = drawing.GetHeight();
                var oldW = drawing.GetWidth();
                if (!oldH || Math.abs(h - oldH) < 1270) continue;
                drawing.SetSize(Math.round((oldW * h) / oldH), h);
                var run = drawing.GetParentRun ? drawing.GetParentRun() : null;
                if (run && run.SetPosition) {
                  run.SetPosition(-Math.round(pt * 2 * Asc.scope.composedDropEm));
                }
                count++;
              } catch (e) {}
            }
            return count;
          },
          false,
          true,
          function (n) {
            resolve(typeof n === "number" ? n : 0);
          }
        );
      } catch (e) {
        resolve(0);
      }
    });
  }

  function hideSection() {
    var el = document.getElementById("composer-section");
    if (el) el.style.display = "none";
  }

  function startPolling() {
    if (started) return;
    if (!isDesktop()) {
      hideSection();
      return;
    }
    started = true;
    setStatus("Composer: waiting for a composed character.");
    poll();
    window.setInterval(poll, POLL_MS);
  }

  window.MarinaMojiComposer = {
    refreshSizes: refreshSizes,
    // Manual button: retry even if this id was already marked seen.
    pollNow: function () {
      if (isDesktop()) poll({ force: true });
    },
    start: startPolling,
  };

  function arm() {
    if (!isDesktop()) {
      hideSection();
      return;
    }
    if (!window.Asc || !window.Asc.plugin) {
      setStatus("Open this panel from Plugins → marinaMoji.");
      window.setTimeout(arm, 500);
      return;
    }
    var prev = window.Asc.plugin.init;
    window.Asc.plugin.init = function (data) {
      if (typeof prev === "function") prev.call(window.Asc.plugin, data);
      startPolling();
    };
    window.setTimeout(function () {
      if (!started) startPolling();
    }, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", arm);
  } else {
    arm();
  }
})();
