/**
 * marinaMoji Kaeriten — ONLYOFFICE Document Editor plugin
 */
(function () {
  const SOURCE_PREFIX = "MARINAMOJI:source=";
  const EMU_PER_PT = 12700;
  const PX_PER_PT = 96 / 72;
  const DEFAULT_FONT_FAMILY =
    '"Hiragino Mincho ProN","YuMincho","Yu Mincho","MS Mincho","Songti SC","SimSun",serif';
  let mappingData = null;
  let byChar = {};

  function setStatus(text, isErr) {
    const el = document.getElementById("status");
    if (!el) return;
    el.textContent = text || "";
    el.className = "status" + (isErr ? " err" : "");
  }

  function renderOptions() {
    const r = (mappingData && mappingData.rendering) || {};
    const oo = r.onlyoffice_inline || r.word_content_control || {};
    const ooImg = r.onlyoffice_inline_image || r.word_inline_picture || r.libreoffice_image || {};
    const lo = r.libreoffice_frame || {};
    const primary = String(r.onlyoffice_primary || "inline_content_control").toLowerCase();
    return {
      primary,
      useImages: primary === "inline_image" || primary === "image" || primary === "picture",
      fontSizeRatio: Number(oo.font_size_ratio ?? lo.font_size_ratio ?? 0.42),
      minFontSizePt: Number(oo.min_font_size_pt ?? 6),
      compoundLayout: oo.compound_layout || "stack",
      stackStepHps: Number(oo.stack_step_hps ?? 0),
      imageGlyphRatio: Number(ooImg.glyph_ratio ?? 0.42),
      imageCompoundGlyphRatio: Number(ooImg.compound_glyph_ratio ?? ooImg.glyph_ratio ?? 0.34),
      imageLineGapRatio: Number(ooImg.line_gap_ratio ?? 0),
      imageCompoundLineGapRatio: Number(ooImg.compound_line_gap_ratio ?? -0.15),
      imageCompoundTouch: ooImg.compound_touch !== false,
      imageCompoundTouchOverlapRatio: Number(ooImg.compound_touch_overlap_ratio ?? 0.72),
      imageGlyphFill: Number(ooImg.glyph_fill ?? 0.94),
      imageHeadroomEm: Number(ooImg.headroom_em ?? 0),
      imageBaselinePadEm: Number(ooImg.baseline_pad_em ?? 0),
      imagePositionHps: Number(ooImg.position_hps ?? 0),
      imagePositionHpsPerPt:
        ooImg.position_hps_per_pt != null && ooImg.position_hps_per_pt !== ""
          ? Number(ooImg.position_hps_per_pt)
          : null,
      imageColor: ooImg.color || "#000000",
      imageBackground: ooImg.background || null,
      imageSupersample: Number(ooImg.supersample ?? 4),
      imageFontFamily: ooImg.font_family || DEFAULT_FONT_FAMILY,
    };
  }

  function hashString(text) {
    let h = 5381;
    for (let i = 0; i < text.length; i++) h = ((h << 5) + h) ^ text.charCodeAt(i);
    return (h >>> 0).toString(16);
  }

  function renderingHash() {
    const r = (mappingData && mappingData.rendering) || {};
    return hashString(
      JSON.stringify({
        version: mappingData && mappingData.version,
        onlyoffice_primary: r.onlyoffice_primary,
        onlyoffice_inline: r.onlyoffice_inline,
        onlyoffice_inline_image: r.onlyoffice_inline_image,
        word_inline_picture: r.word_inline_picture,
        marks: mappingData && mappingData.marks,
      })
    );
  }

  function renderFingerprint(opts, hostPt) {
    const pt = Number.isFinite(Number(hostPt))
      ? Number(hostPt)
      : Math.max(opts.minFontSizePt, 8);
    return [
      "v1",
      "renderer=" + (opts.useImages ? "image" : "control"),
      "pt=" + pt.toFixed(1),
      "rh=" + renderingHash(),
    ].join("|");
  }

  function renderFingerprintTemplate(opts) {
    return [
      "v1",
      "renderer=" + (opts.useImages ? "image" : "control"),
      "pt={pt}",
      "rh=" + renderingHash(),
    ].join("|");
  }

  function encodeTag(marks, fp) {
    return SOURCE_PREFIX + marks + (fp ? ";fp=" + String(fp).replace(/;/g, "_") : "");
  }

  function parseTag(tag) {
    if (!tag || tag.indexOf(SOURCE_PREFIX) !== 0) return null;
    const body = tag.substring(SOURCE_PREFIX.length);
    const parts = body.split(";");
    const out = { marks: parts[0] || "", fp: null };
    for (let i = 1; i < parts.length; i++) {
      if (parts[i].indexOf("fp=") === 0) out.fp = parts[i].substring(3);
    }
    return out.marks ? out : null;
  }

  function imageMetrics(glyphCount, opts, hostPt) {
    const em = hostPt || 8;
    const n = Math.max(1, glyphCount);
    const compound = n > 1;
    const ratio = compound ? opts.imageCompoundGlyphRatio : opts.imageGlyphRatio;
    const cellPt = Math.max(1, em * ratio);
    let gapPt = cellPt * (compound ? opts.imageCompoundLineGapRatio : opts.imageLineGapRatio);
    if (compound && opts.imageCompoundTouch) {
      gapPt = -cellPt * opts.imageCompoundTouchOverlapRatio;
    }
    const inkHeightPt = Math.max(cellPt * 0.5, cellPt * n + gapPt * (n - 1));
    const topPadPt = Math.max(0, em * Number(opts.imageHeadroomEm || 0));
    const bottomPadPt = Math.max(0, em * Number(opts.imageBaselinePadEm || 0));
    return {
      cellPt,
      gapPt,
      topPadPt,
      bottomPadPt,
      widthPt: cellPt,
      inkHeightPt,
      heightPt: inkHeightPt + topPadPt + bottomPadPt,
    };
  }

  function drawKaeritenImage(glyphLines, opts, hostPt) {
    const metrics = imageMetrics(glyphLines.length, opts, hostPt);
    const scale = PX_PER_PT * (opts.imageSupersample || 4);
    const widthPx = Math.max(1, Math.round(metrics.widthPt * scale));
    const heightPx = Math.max(1, Math.round(metrics.heightPt * scale));
    const canvas = document.createElement("canvas");
    canvas.width = widthPx;
    canvas.height = heightPx;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, widthPx, heightPx);
    if (opts.imageBackground) {
      ctx.fillStyle = opts.imageBackground;
      ctx.fillRect(0, 0, widthPx, heightPx);
    }
    const cellPx = metrics.cellPt * scale;
    const gapPx = metrics.gapPt * scale;
    ctx.fillStyle = opts.imageColor || "#000000";
    ctx.font = `${cellPx * opts.imageGlyphFill}px ${opts.imageFontFamily || DEFAULT_FONT_FAMILY}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    const inkBottom = (metrics.topPadPt + metrics.inkHeightPt) * scale;
    glyphLines.forEach((glyph, i) => {
      const stackFromBottom = glyphLines.length - 1 - i;
      const x = cellPx / 2;
      const y = inkBottom - (cellPx + gapPx) * stackFromBottom;
      ctx.fillText(glyph, x, y);
    });
    return {
      src: canvas.toDataURL("image/png"),
      widthEmu: Math.max(1, Math.round(metrics.widthPt * EMU_PER_PT)),
      heightEmu: Math.max(1, Math.round(metrics.heightPt * EMU_PER_PT)),
    };
  }

  function loadMapping() {
    return fetch("mapping.json")
      .then((r) => {
        if (!r.ok) throw new Error("mapping.json not found");
        return r.json();
      })
      .then((data) => {
        mappingData = data;
        byChar = MarinaMojiExport.mappingByChar(data);
        return data;
      });
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      window.Asc.plugin.executeMethod("PasteText", [text], function (ok) {
        if (ok === false) reject(new Error("Clipboard failed"));
        else resolve();
      });
    });
  }

  /** Read canonical paragraph texts; skip clean rendered paragraphs. */
  function scanParagraphs(fpTemplate) {
    return new Promise((resolve, reject) => {
      Asc.scope.prefix = SOURCE_PREFIX;
      Asc.scope.fpTemplate = fpTemplate || "";
      Asc.scope.defaultFontSizePt = Math.max(
        (renderOptions() && renderOptions().minFontSizePt) || 6,
        8
      );
      window.Asc.plugin.callCommand(
        function () {
          var prefix = Asc.scope.prefix;
          var fpTemplate = Asc.scope.fpTemplate || "";
          var defaultFontSizePt = Asc.scope.defaultFontSizePt || 8;
          var doc = Api.GetDocument();
          var out = [];
          var n = doc.GetElementsCount();

          function parseTag(tag) {
            if (!tag || tag.indexOf(prefix) !== 0) return null;
            var body = tag.substring(prefix.length);
            var parts = body.split(";");
            var result = { marks: parts[0] || "", fp: null };
            for (var i = 1; i < parts.length; i++) {
              if (parts[i].indexOf("fp=") === 0) result.fp = parts[i].substring(3);
            }
            return result.marks ? result : null;
          }

          function fontSizePtFromHps(value, fallbackPt) {
            var n = Number(value);
            if (!isFinite(n) || n <= 0) return fallbackPt;
            return n / 2;
          }

          function textPrFontSizePt(textPr, fallbackPt) {
            if (!textPr || !textPr.GetFontSize) return fallbackPt;
            return fontSizePtFromHps(textPr.GetFontSize(), fallbackPt);
          }

          function paragraphFontSizePt(para) {
            var fallback = defaultFontSizePt;
            if (doc.GetDefaultTextPr) {
              fallback = textPrFontSizePt(doc.GetDefaultTextPr(), fallback);
            }
            if (para.GetTextPr) {
              fallback = textPrFontSizePt(para.GetTextPr(), fallback);
            }
            var ec = para.GetElementsCount ? para.GetElementsCount() : 0;
            for (var e = 0; e < ec; e++) {
              var child = para.GetElement(e);
              if (!child || !child.GetText || !child.GetText()) continue;
              if (child.GetFontSize) {
                return fontSizePtFromHps(child.GetFontSize(), fallback);
              }
              if (child.GetTextPr) {
                return textPrFontSizePt(child.GetTextPr(), fallback);
              }
            }
            return fallback;
          }

          function fingerprintForFontSize(fontSizePt) {
            if (!fpTemplate) return "";
            return fpTemplate.replace("{pt}", Number(fontSizePt || defaultFontSizePt).toFixed(1));
          }

          function elementTag(el) {
            var tag = "";
            if (el.GetTag) tag = el.GetTag() || "";
            if (!tag && el.GetName) tag = el.GetName() || "";
            return parseTag(tag);
          }

          function appendElementCanonical(el, currentFp, state) {
            if (!el) return;
            var parsed = elementTag(el);
            if (parsed) {
              state.text += parsed.marks;
              if (parsed.fp !== currentFp) state.stale = true;
              return;
            }
            var type = el.GetClassType ? el.GetClassType() : "";
            var childCount = el.GetElementsCount ? el.GetElementsCount() : 0;
            if ((type === "run" || type === "inlineLvlSdt") && childCount > 0) {
              for (var i = 0; i < childCount; i++) {
                appendElementCanonical(el.GetElement(i), currentFp, state);
              }
              return;
            }
            if (el.GetText) {
              state.text += el.GetText() || "";
            }
          }

          function paragraphCanonical(para) {
            var state = { text: "", stale: false };
            var raw = para.GetText ? para.GetText() || "" : "";
            var hasRawMarks = /[\u3190-\u319f]/.test(raw);
            var fontSizePt = paragraphFontSizePt(para);
            var currentFp = fingerprintForFontSize(fontSizePt);
            var ec = para.GetElementsCount ? para.GetElementsCount() : 0;
            for (var e = 0; e < ec; e++) {
              appendElementCanonical(para.GetElement(e), currentFp, state);
            }
            return {
              text: state.text || raw,
              stale: state.stale,
              hasRawMarks: hasRawMarks,
              fontSizePt: fontSizePt,
            };
          }

          for (var i = 0; i < n; i++) {
            var el = doc.GetElement(i);
            if (el.GetClassType && el.GetClassType() === "paragraph") {
              var para = paragraphCanonical(el);
              if (para.hasRawMarks || para.stale) {
                out.push({ index: i, text: para.text, fontSizePt: para.fontSizePt });
              }
            }
          }
          return JSON.stringify(out);
        },
        false,
        true,
        function (result) {
          try {
            resolve(JSON.parse(result || "[]"));
          } catch (e) {
            reject(e);
          }
        }
      );
    });
  }

  function buildRenderPlan(paragraphs, opts) {
    const plan = [];
    for (const para of paragraphs) {
      const hostPt = Math.max(
        opts.minFontSizePt,
        Number.isFinite(Number(para.fontSizePt)) ? Number(para.fontSizePt) : 8
      );
      const fp = renderFingerprint(opts, hostPt);
      const segments = MarinaMojiExport.buildSegments(para.text, byChar).map((seg) => {
        if (seg.type !== "kaeriten") return seg;
        const glyphLines = MarinaMojiExport.glyphLinesForMarks(seg.marks, byChar);
        const view = { tag: encodeTag(seg.marks, fp) };
        if (opts.useImages) {
          view.image = drawKaeritenImage(glyphLines, opts, hostPt);
          view.positionHps =
            opts.imagePositionHpsPerPt != null
              ? Math.round(hostPt * opts.imagePositionHpsPerPt)
              : opts.imagePositionHps;
        }
        return {
          ...seg,
          glyphLines,
          view,
        };
      });
      const hasKaeriten = segments.some((s) => s.type === "kaeriten");
      if (hasKaeriten) plan.push({ index: para.index, segments, fontSizePt: hostPt });
    }
    return plan;
  }

  function applyRenderPlan(plan, fontSizePt, compoundLayout, stackStepHps) {
    return new Promise((resolve, reject) => {
      Asc.scope.plan = JSON.stringify(plan);
      Asc.scope.fontSizePt = fontSizePt;
      Asc.scope.compoundLayout = compoundLayout || "stack";
      Asc.scope.stackStepHps = stackStepHps || 0;
      Asc.scope.sourcePrefix = SOURCE_PREFIX;
      window.Asc.plugin.callCommand(
        function () {
          var plan = JSON.parse(Asc.scope.plan);
          var fontSizePt = Asc.scope.fontSizePt || 8;
          var compoundLayout = Asc.scope.compoundLayout || "stack";
          var stackStepHps = Asc.scope.stackStepHps || 0;
          var sourcePrefix = Asc.scope.sourcePrefix || "MARINAMOJI:source=";
          var doc = Api.GetDocument();

          function fontSizeHps(pt) {
            return Math.max(1, Math.round(Number(pt || fontSizePt || 8) * 2));
          }

          function stackStep() {
            if (stackStepHps > 0) return stackStepHps;
            return Math.max(8, Math.round(fontSizePt * 1.4));
          }

          /** Vertical compound stack without AddLineBreak (breaks escape the inline SDT). */
          function fillPositionStack(sdt, glyphLines) {
            var n = glyphLines.length;
            var step = stackStep();
            var backTwips = -Math.round(fontSizePt * 20 * 0.92);
            var mid = (n - 1) / 2.0;
            for (var i = 0; i < n; i++) {
              var gr = Api.CreateRun();
              gr.SetFontSize(fontSizeHps(fontSizePt));
              gr.SetPosition(Math.round(step * (n - 1 - i - mid)));
              if (i > 0 && gr.SetSpacing) gr.SetSpacing(backTwips);
              gr.AddText(glyphLines[i]);
              sdt.AddElement(gr);
            }
          }

          function fillInlineSdtGlyphs(sdt, glyphLines) {
            var n = sdt.GetElementsCount ? sdt.GetElementsCount() : 0;
            for (var k = n - 1; k >= 0; k--) {
              sdt.RemoveElement(k);
            }
            if (!glyphLines || !glyphLines.length) return;

            if (glyphLines.length === 1) {
              var one = Api.CreateRun();
              one.AddText(glyphLines[0]);
              one.SetFontSize(fontSizeHps(fontSizePt));
              sdt.AddElement(one);
              return;
            }

            if (compoundLayout === "horizontal") {
              var hRun = Api.CreateRun();
              hRun.AddText(glyphLines.join(""));
              hRun.SetFontSize(fontSizeHps(fontSizePt));
              sdt.AddElement(hRun);
              return;
            }

            if (compoundLayout === "soft_break") {
              var sRun = Api.CreateRun();
              sRun.AddText(glyphLines.join("\u000b"));
              sRun.SetFontSize(fontSizeHps(fontSizePt));
              sdt.AddElement(sRun);
              return;
            }

            fillPositionStack(sdt, glyphLines);
          }

          function fillParagraph(oPara, segments, itemFontSizePt) {
            var localFontSizePt = itemFontSizePt || fontSizePt;
            var n = oPara.GetElementsCount();
            for (var k = n - 1; k >= 0; k--) {
              oPara.RemoveElement(k);
            }
            for (var s = 0; s < segments.length; s++) {
              var seg = segments[s];
              if (seg.type === "text" && seg.value) {
                var run = Api.CreateRun();
                if (run.SetFontSize) run.SetFontSize(fontSizeHps(localFontSizePt));
                run.AddText(seg.value);
                oPara.AddElement(run);
              } else if (seg.type === "kaeriten") {
                var tag = (seg.view && seg.view.tag) || (sourcePrefix + seg.marks);
                if (seg.view && seg.view.image && Api.CreateImage && oPara.AddDrawing) {
                  var img = seg.view.image;
                  var drawing = Api.CreateImage(img.src, img.widthEmu, img.heightEmu);
                  if (drawing.SetWrappingStyle) drawing.SetWrappingStyle("inline");
                  if (drawing.SetName) drawing.SetName(tag);
                  var pos = Number((seg.view && seg.view.positionHps) || 0);
                  var placed = false;
                  if (pos && Api.CreateRun && Api.CreateInlineLvlSdt) {
                    var imgSdt = Api.CreateInlineLvlSdt();
                    var imgRun = Api.CreateRun();
                    if (imgRun.SetPosition) imgRun.SetPosition(pos);
                    if (imgRun.AddDrawing) {
                      imgRun.AddDrawing(drawing);
                      imgSdt.AddElement(imgRun);
                      oPara.AddInlineLvlSdt(imgSdt);
                      imgSdt.SetTag(tag);
                      if (imgSdt.SetAlias) imgSdt.SetAlias(seg.marks);
                      placed = true;
                    }
                  }
                  if (!placed) oPara.AddDrawing(drawing);
                } else {
                  var sdt = Api.CreateInlineLvlSdt();
                  var previousFontSizePt = fontSizePt;
                  fontSizePt = localFontSizePt;
                  fillInlineSdtGlyphs(sdt, seg.glyphLines);
                  fontSizePt = previousFontSizePt;
                  oPara.AddInlineLvlSdt(sdt);
                  sdt.SetTag(tag);
                  if (sdt.SetAlias) sdt.SetAlias(seg.marks);
                }
              }
            }
          }

          for (var p = 0; p < plan.length; p++) {
            var item = plan[p];
            var oPara = doc.GetElement(item.index);
            if (oPara && oPara.GetClassType && oPara.GetClassType() === "paragraph") {
              fillParagraph(oPara, item.segments, item.fontSizePt);
            }
          }
          return plan.length;
        },
        false,
        true,
        function (count) {
          if (typeof count === "number") resolve(count);
          else resolve(0);
        }
      );
    });
  }

  function renderAllViews(statusText, doneVerb) {
    setStatus(statusText);
    const opts = renderOptions();
    scanParagraphs("__force_refresh__")
      .then((paragraphs) => {
        const scoped = paragraphs.filter((p) => p.text && p.text.trim());
        const plan = buildRenderPlan(scoped, opts);
        if (!plan.length) {
          setStatus("No kaeriten source or views found (說㆒㆑).", false);
          return;
        }
        const fontSizePt = Math.max(opts.minFontSizePt, 8);
        return applyRenderPlan(plan, fontSizePt, opts.compoundLayout, opts.stackStepHps).then((n) => {
          setStatus(doneVerb + " " + n + " paragraph(s).", false);
        });
      })
      .catch((err) => {
        console.error(err);
        setStatus(String(err.message || err), true);
      });
  }

  function runRender() {
    return renderAllViews("Rendering…", "Rendered");
  }

  function runUnrender() {
    setStatus("Unrendering…");
    Asc.scope.prefix = SOURCE_PREFIX;
    window.Asc.plugin.callCommand(
      function () {
        var prefix = Asc.scope.prefix;
        var doc = Api.GetDocument();

        function parseTag(tag) {
          if (!tag || tag.indexOf(prefix) !== 0) return null;
          var body = tag.substring(prefix.length);
          return (body.split(";")[0]) || null;
        }

        function marksFromElement(el) {
          var tag = el.GetTag ? el.GetTag() || "" : "";
          var marks = parseTag(tag);
          if (marks) return marks;
          var name = el.GetName ? el.GetName() || "" : "";
          marks = parseTag(name);
          if (marks) return marks;
          var alias = el.GetAlias ? el.GetAlias() || "" : "";
          if (/^[\u3190-\u319f]+$/.test(alias)) return alias;
          return null;
        }

        function marksFromElementTree(el) {
          var direct = marksFromElement(el);
          if (direct) return direct;
          var count = el && el.GetElementsCount ? el.GetElementsCount() : 0;
          for (var i = 0; i < count; i++) {
            var childMarks = marksFromElementTree(el.GetElement(i));
            if (childMarks) return childMarks;
          }
          return null;
        }

        /** Collect marinaMoji inline controls/images by walking paragraphs (reliable in Desktop). */
        function collectViews() {
          var found = [];
          var pn = doc.GetElementsCount();
          for (var p = 0; p < pn; p++) {
            var para = doc.GetElement(p);
            if (!para || !para.GetClassType || para.GetClassType() !== "paragraph") continue;
            var ec = para.GetElementsCount();
            for (var e = 0; e < ec; e++) {
              var child = para.GetElement(e);
              if (!child || !child.GetClassType) continue;
              var type = child.GetClassType();
              if (
                type !== "inlineLvlSdt" &&
                type !== "image" &&
                type !== "drawing" &&
                type !== "run"
              ) {
                continue;
              }
              var marks = marksFromElementTree(child);
              if (!marks) continue;
              found.push({ paraIndex: p, pos: e, marks: marks });
            }
          }

          found.sort(function (a, b) {
            if (a.paraIndex !== b.paraIndex) return b.paraIndex - a.paraIndex;
            return b.pos - a.pos;
          });
          return found;
        }

        function replaceControl(item) {
          var para = doc.GetElement(item.paraIndex);
          var pos = item.pos;
          if (!para || pos < 0) return false;

          var run = Api.CreateRun();
          run.AddText(item.marks);
          // Insert marks at the control position, then remove the wrapper.
          // Do not call cc.Delete(false) — ONLYOFFICE can spill display glyphs (レ) to line start.
          para.AddElement(run, pos);
          para.RemoveElement(pos + 1);
          return true;
        }

        var items = collectViews();
        var count = 0;
        for (var i = 0; i < items.length; i++) {
          if (replaceControl(items[i])) count++;
        }
        return count;
      },
      false,
      true,
      function (count) {
        setStatus(
          count ? "Restored source marks (" + count + ")." : "No kaeriten views found.",
          false
        );
      }
    );
  }

  function getTextForExport() {
    return scanExportModel().then((model) => {
      return new Promise((resolve) => {
        window.Asc.plugin.executeMethod("GetSelectedText", [], function (sel) {
          const selectedDisplay = sel && String(sel).length > 0 ? String(sel) : "";
          resolve(
            MarinaMojiExport.resolveExportText(
              model.segments,
              model.docCanonical,
              selectedDisplay
            )
          );
        });
      });
    });
  }

  /** Walk paragraph elements; use control tags for canonical marks, not display glyphs. */
  function scanExportModel() {
    return new Promise((resolve, reject) => {
      Asc.scope.prefix = SOURCE_PREFIX;
      window.Asc.plugin.callCommand(
        function () {
          var prefix = Asc.scope.prefix;
          var doc = Api.GetDocument();

          function marksFromControl(cc) {
            var tag = cc.GetTag ? cc.GetTag() || "" : "";
            if (tag.indexOf(prefix) === 0) return tag.substring(prefix.length).split(";")[0];
            var alias = cc.GetAlias ? cc.GetAlias() || "" : "";
            if (/^[\u3190-\u319f]+$/.test(alias)) return alias;
            return null;
          }

          function marksFromDrawing(drawing) {
            var name = drawing.GetName ? drawing.GetName() || "" : "";
            if (name.indexOf(prefix) === 0) return name.substring(prefix.length).split(";")[0];
            return null;
          }

          function elementParts(el) {
            if (!el || !el.GetClassType) return [];
            if (el.GetClassType() === "inlineLvlSdt") {
              var marks = marksFromControl(el);
              var display = el.GetText ? el.GetText() || "" : "";
              return [{ canonical: marks || display, display: display || marks || "" }];
            }
            if (el.GetClassType() === "image" || el.GetClassType() === "drawing") {
              var dMarks = marksFromDrawing(el);
              return [{ canonical: dMarks || "", display: dMarks || "" }];
            }
            if (el.GetClassType() === "run" && el.GetElementsCount && el.GetElementsCount() > 0) {
              var runParts = [];
              for (var r = 0; r < el.GetElementsCount(); r++) {
                var childParts = elementParts(el.GetElement(r));
                for (var c = 0; c < childParts.length; c++) runParts.push(childParts[c]);
              }
              return runParts;
            }
            if (el.GetText) {
              var text = el.GetText() || "";
              return [{ canonical: text, display: text }];
            }
            return [];
          }

          function paragraphParts(para) {
            var parts = [];
            var ec = para.GetElementsCount();
            for (var e = 0; e < ec; e++) {
              var el = para.GetElement(e);
              var elParts = elementParts(el);
              for (var i = 0; i < elParts.length; i++) parts.push(elParts[i]);
            }
            return parts;
          }

          var segments = [];
          var pn = doc.GetElementsCount();
          for (var p = 0; p < pn; p++) {
            var para = doc.GetElement(p);
            if (!para || !para.GetClassType || para.GetClassType() !== "paragraph") {
              continue;
            }
            if (segments.length) {
              segments.push({ canonical: "\n", display: "\n" });
            }
            var parts = paragraphParts(para);
            for (var i = 0; i < parts.length; i++) {
              segments.push(parts[i]);
            }
          }

          var docCanonical = "";
          for (var s = 0; s < segments.length; s++) {
            docCanonical += segments[s].canonical;
          }
          return JSON.stringify({ docCanonical: docCanonical, segments: segments });
        },
        false,
        true,
        function (result) {
          try {
            resolve(JSON.parse(result || '{"docCanonical":"","segments":[]}'));
          } catch (e) {
            reject(e);
          }
        }
      );
    });
  }

  function runCopyPlain() {
    setStatus("Copying…");
    getTextForExport()
      .then(({ text }) => copyToClipboard(MarinaMojiExport.exportPlainText(text)))
      .then(() => setStatus("Copied plain text.", false))
      .catch((err) => setStatus(String(err.message || err), true));
  }

  function wire(id, fn) {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener("click", () => {
      btn.disabled = true;
      Promise.resolve(fn()).finally(() => {
        btn.disabled = false;
      });
    });
  }

  window.Asc.plugin.init = function () {
    loadMapping()
      .then(() => {
        setStatus("Ready — type 說㆒㆑者, then Render.", false);
        wire("btn-render", runRender);
        wire("btn-unrender", runUnrender);
        wire("btn-plain", runCopyPlain);
      })
      .catch((err) => setStatus(String(err.message || err), true));
  };

  window.Asc.plugin.button = function () {};
})();
