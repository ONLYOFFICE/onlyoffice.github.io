/**
 * Canonical-text exporters (no editor dependency).
 * Port of libreoffice/marinamoji_kaeriten/export_core.py
 */
(function (global) {
  /** Marks may be split across lines in the document (漢㆒↵㆖字) — whitespace only between mark code points. */
  const CLUSTER_RE =
    /([^\u3190-\u319f\s])([\u3190-\u319f]+(?:\s*[\u3190-\u319f]+)*)/gu;

  function normalizeMarks(marks) {
    return marks.replace(/\s+/g, "");
  }

  function findClusters(text) {
    const out = [];
    if (!text) return out;
    CLUSTER_RE.lastIndex = 0;
    let match;
    while ((match = CLUSTER_RE.exec(text)) !== null) {
      out.push({
        baseChar: match[1],
        marks: normalizeMarks(match[2]),
        start: match.index,
        end: match.index + match[0].length,
      });
    }
    return out;
  }

  function xmlEscape(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function latexEscape(s) {
    let out = "";
    for (const ch of s) {
      if ("\\{}#$%&_~^".includes(ch)) out += "\\" + ch;
      else out += ch;
    }
    return out;
  }

  function mappingByChar(mappingData) {
    const byChar = {};
    if (!mappingData || !mappingData.marks) return byChar;
    for (const entry of mappingData.marks) {
      if (entry.char) byChar[entry.char] = entry;
    }
    return byChar;
  }

  function glyphsForMarks(marks, byChar) {
    const chars = [...marks];
    chars.sort((a, b) => {
      const oa = Number(byChar[a]?.stack_order ?? 0);
      const ob = Number(byChar[b]?.stack_order ?? 0);
      if (oa !== ob) return oa - ob;
      return marks.indexOf(a) - marks.indexOf(b);
    });
    return chars.map((c) => byChar[c]?.display_glyph ?? c).join("\n");
  }

  function glyphLinesForMarks(marks, byChar) {
    return glyphsForMarks(marks, byChar)
      .split("\n")
      .filter((line) => line.length > 0);
  }

  /**
   * Legacy string helper for soft_break / horizontal layouts.
   */
  function glyphsForInlineSdt(marks, byChar, layout) {
    const lines = glyphLinesForMarks(marks, byChar);
    if (lines.length <= 1) return lines[0] || "";
    if (layout === "horizontal") return lines.join("");
    return lines.join("\u000b");
  }

  function teiBodyContent(text) {
    if (!text) return "";
    const parts = [];
    let pos = 0;
    for (const { baseChar, marks, start, end } of findClusters(text)) {
      if (start > pos) parts.push(xmlEscape(text.slice(pos, start)));
      parts.push(
        `<kanbun char="${xmlEscape(baseChar)}" kaeriten="${xmlEscape(marks)}"/>`
      );
      pos = end;
    }
    if (pos < text.length) parts.push(xmlEscape(text.slice(pos)));
    return parts.join("");
  }

  function plainWithDisplayGlyphs(text, byChar) {
    const parts = [];
    let pos = 0;
    for (const { baseChar, marks, start, end } of findClusters(text)) {
      if (start > pos) parts.push(text.slice(pos, start));
      parts.push(baseChar + glyphsForMarks(marks, byChar));
      pos = end;
    }
    if (pos < text.length) parts.push(text.slice(pos));
    return parts.join("");
  }

  function latexBody(text, byChar) {
    if (!text) return "";
    const parts = [];
    let pos = 0;
    for (const { baseChar, marks, start, end } of findClusters(text)) {
      if (start > pos) parts.push(latexEscape(text.slice(pos, start)));
      parts.push(
        `{${latexEscape(baseChar)}}\\marinamojiKaeriten{${latexEscape(marks)}}`
      );
      pos = end;
    }
    if (pos < text.length) parts.push(latexEscape(text.slice(pos)));
    return parts.join("");
  }

  function mapDisplayRangeToCanonical(segments, startIdx, length) {
    let dPos = 0;
    let out = "";
    const endIdx = startIdx + length;
    for (const seg of segments) {
      const segStart = dPos;
      const segEnd = dPos + seg.display.length;
      if (segEnd <= startIdx) {
        dPos = segEnd;
        continue;
      }
      if (segStart >= endIdx) break;
      if (seg.canonical.length === seg.display.length) {
        const overlapStart = Math.max(startIdx, segStart) - segStart;
        const overlapEnd = Math.min(endIdx, segEnd) - segStart;
        out += seg.canonical.substring(overlapStart, overlapEnd);
      } else if (segStart >= startIdx && segEnd <= endIdx) {
        out += seg.canonical;
      } else {
        out += seg.canonical;
      }
      dPos = segEnd;
    }
    return out;
  }

  function canonicalFromDisplaySelection(segments, selectedDisplay) {
    if (!selectedDisplay) return null;
    let disp = "";
    let canon = "";
    for (const seg of segments) {
      disp += seg.display;
      canon += seg.canonical;
    }
    if (selectedDisplay === disp) return canon;
    if (selectedDisplay === canon) return selectedDisplay;
    const idx = disp.indexOf(selectedDisplay);
    if (idx < 0) return null;
    return mapDisplayRangeToCanonical(segments, idx, selectedDisplay.length);
  }

  function buildExportSegments(parts) {
    const segments = parts || [];
    let docCanonical = "";
    for (const part of segments) docCanonical += part.canonical;
    return { docCanonical, segments };
  }

  function resolveExportText(segments, docCanonical, selectedDisplay) {
    if (!selectedDisplay) {
      return { text: docCanonical, fullDocument: true };
    }
    const mapped = canonicalFromDisplaySelection(segments, selectedDisplay);
    if (mapped !== null && mapped.length > 0) {
      return { text: mapped, fullDocument: false };
    }
    return { text: docCanonical, fullDocument: true };
  }

  function buildSegments(text, byChar) {
    const clusters = findClusters(text);
    if (!clusters.length) return [{ type: "text", value: text || "" }];
    const segments = [];
    let pos = 0;
    for (const { baseChar, marks, start, end } of clusters) {
      if (start > pos) segments.push({ type: "text", value: text.slice(pos, start) });
      segments.push({ type: "text", value: baseChar });
      segments.push({
        type: "kaeriten",
        marks,
        glyphs: glyphsForMarks(marks, byChar),
      });
      pos = end;
    }
    if (pos < text.length) segments.push({ type: "text", value: text.slice(pos) });
    return segments;
  }

  global.MarinaMojiExport = {
    findClusters,
    mappingByChar,
    glyphsForMarks,
    glyphLinesForMarks,
    glyphsForInlineSdt,
    buildExportSegments,
    resolveExportText,
    canonicalFromDisplaySelection,
    buildSegments,
    exportPlainText: (text) => text || "",
    exportTeiFragment: (text) => {
      const body = teiBodyContent(text);
      return body ? `<p xml:lang="ja-Hani">${body}</p>` : "";
    },
    exportTeiXml: (text, title) => {
      const body = teiBodyContent(text);
      const titleEsc = xmlEscape(title || "marinaMoji kaeriten export");
      return (
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<TEI xmlns="http://www.tei-c.org/ns/1.0">\n' +
        "  <teiHeader>\n" +
        "    <fileDesc>\n" +
        "      <titleStmt>\n" +
        `        <title>${titleEsc}</title>\n` +
        "      </titleStmt>\n" +
        "    </fileDesc>\n" +
        "  </teiHeader>\n" +
        "  <text>\n" +
        "    <body>\n" +
        `      <p xml:lang="ja-Hani">${body}</p>\n` +
        "    </body>\n" +
        "  </text>\n" +
        "</TEI>\n"
      );
    },
    exportTeiForClipboard: (text, fullDocument) => {
      // Clipboard: TEI fragment to paste into an existing file. Full document: exportTeiXml().
      if (fullDocument) return global.MarinaMojiExport.exportTeiXml(text);
      return global.MarinaMojiExport.exportTeiFragment(text);
    },
    exportLatexFragment: (text, mappingData) => {
      const byChar = mappingByChar(mappingData);
      const body = latexBody(text, byChar);
      const lines = [
        "% marinaMoji kaeriten — paste into a document that defines \\marinamojiKaeriten",
        "% \\newcommand{\\marinamojiKaeriten}[1]{{\\small #1}}",
      ];
      if (Object.keys(byChar).length && findClusters(text).length) {
        lines.push("% Display glyphs: " + plainWithDisplayGlyphs(text, byChar));
      }
      lines.push(body);
      return lines.join("\n") + "\n";
    },
    exportLatex: (text, mappingData) => {
      const byChar = mappingByChar(mappingData);
      const body = latexBody(text, byChar);
      let displayHint = "";
      if (Object.keys(byChar).length && findClusters(text).length) {
        displayHint =
          "% Display glyphs: " + plainWithDisplayGlyphs(text, byChar) + "\n";
      }
      return (
        "% marinaMoji kaeriten export\n" +
        "\\documentclass{article}\n" +
        "\\usepackage{fontspec}\n" +
        "\\usepackage{xeCJK}\n" +
        "\\newcommand{\\marinamojiKaeriten}[1]{{\\small #1}}\n" +
        displayHint +
        "\\begin{document}\n\n" +
        body +
        "\n\n\\end{document}\n"
      );
    },
    exportLatexForClipboard: (text, mappingData, fullDocument) => {
      if (fullDocument) return global.MarinaMojiExport.exportLatex(text, mappingData);
      return global.MarinaMojiExport.exportLatexFragment(text, mappingData);
    },
  };
})(window);
