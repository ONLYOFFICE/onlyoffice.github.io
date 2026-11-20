// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2026 Desktiny contributors
//
// Pure checker: takes a plain description of a document and returns findings.
// It never touches the editor, so it can be tested in Node.
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory(require("./rules"));
  else root.VnDocChecker = factory(root.VnDocRules);
})(typeof self !== "undefined" ? self : this, function (RULES) {
  "use strict";

  const mm = (twips) => twips / RULES.TWIPS_PER_MM;
  const round1 = (n) => Math.round(n * 10) / 10;
  const hasText = (run) => typeof run.text === "string" && run.text.trim() !== "";

  function normalise(text) {
    return String(text)
      .normalize("NFC")
      .replace(/[‐-―−]/g, "-")
      .replace(/\s+/g, " ")
      .replace(/\s*-\s*/g, " - ")
      .trim();
  }

  function finding(severity, code, params, paragraph) {
    const found = { severity, code, params: params || {} };
    if (paragraph !== undefined) found.paragraph = paragraph;
    return found;
  }

  function inRange(value, [low, high], tolerance) {
    return value >= low - tolerance && value <= high + tolerance;
  }

  function checkSections(sections, out) {
    const marginKeys = ["marginTopTw", "marginBottomTw", "marginLeftTw", "marginRightTw"];
    if (sections.length && sections.every((s) => marginKeys.every((k) => typeof s[k] !== "number")))
      out.push(finding("info", "margin_unavailable", {}));
    sections.forEach((section, i) => {
      if (typeof section.widthTw !== "number" || typeof section.heightTw !== "number") return;
      const width = mm(section.widthTw);
      const height = mm(section.heightTw);
      const { widthMm, heightMm, toleranceMm } = RULES.page;
      const portrait = Math.abs(width - widthMm) <= toleranceMm && Math.abs(height - heightMm) <= toleranceMm;
      const landscape = Math.abs(width - heightMm) <= toleranceMm && Math.abs(height - widthMm) <= toleranceMm;
      if (landscape) out.push(finding("info", "page_landscape", { section: i + 1 }));
      else if (!portrait)
        out.push(finding("error", "page_size", { section: i + 1, widthMm: round1(width), heightMm: round1(height) }));

      const m = RULES.margins;
      const edges = [
        ["top", section.marginTopTw, m.topMm],
        ["bottom", section.marginBottomTw, m.bottomMm],
        ["left", section.marginLeftTw, m.leftMm],
        ["right", section.marginRightTw, m.rightMm],
      ];
      for (const [edge, twips, range] of edges) {
        if (typeof twips !== "number") continue;
        const value = mm(twips);
        // A landscape section swaps which edge is "top"; only check margins on portrait pages.
        if (!landscape && !inRange(value, range, m.toleranceMm))
          out.push(finding("error", "margin", { section: i + 1, edge, valueMm: round1(value), min: range[0], max: range[1] }));
      }
    });
  }

  function isBlack(color) {
    if (!color || color.auto) return true;
    return color.r === 0 && color.g === 0 && color.b === 0;
  }

  function checkRuns(paragraphs, out) {
    let unknownFont = 0;
    paragraphs.forEach((paragraph, index) => {
      const runs = paragraph.runs.filter(hasText);
      const bodyLike = normalise(paragraph.text || "").length >= RULES.bodyMinChars;
      const reported = new Set();
      const once = (key, make) => {
        if (reported.has(key)) return;
        reported.add(key);
        out.push(make());
      };
      for (const run of runs) {
        if (!run.fontFamily) unknownFont += 1;
        else if (RULES.legacyFontPattern.test(run.fontFamily))
          once("legacy", () => finding("error", "legacy_font", { font: run.fontFamily }, index));
        else if (run.fontFamily !== RULES.fontFamily)
          once("font:" + run.fontFamily, () => finding("error", "font_family", { font: run.fontFamily }, index));

        if (!isBlack(run.color)) once("color", () => finding("warning", "font_color", {}, index));

        if (typeof run.sizeHp === "number") {
          const pt = run.sizeHp / 2;
          const { min, max, body } = RULES.sizePt;
          if (pt < min || pt > max) once("size:" + pt, () => finding("warning", "font_size", { sizePt: pt, min, max }, index));
          else if (bodyLike && (pt < body[0] || pt > body[1]))
            once("body:" + pt, () => finding("warning", "body_size", { sizePt: pt, min: body[0], max: body[1] }, index));
        }
      }
    });
    if (unknownFont > 0) out.push(finding("info", "font_inherited", { runs: unknownFont }));
  }

  function wholeParagraph(paragraph, prop) {
    const runs = paragraph.runs.filter(hasText);
    return runs.length > 0 && runs.every((run) => run[prop] === true);
  }

  function paragraphSizes(paragraph) {
    return [...new Set(paragraph.runs.filter(hasText).map((run) => run.sizeHp / 2).filter((n) => !Number.isNaN(n)))];
  }

  function checkHeading(paragraphs, spec, codePrefix, out) {
    const wanted = normalise(spec.text).toLowerCase();
    const index = paragraphs.findIndex((p) => normalise(p.text || "").toLowerCase() === wanted);
    if (index < 0) return null;
    const paragraph = paragraphs[index];
    if (normalise(paragraph.text) !== normalise(spec.text))
      out.push(finding("error", codePrefix + "_text", { expected: spec.text }, index));
    if (spec.bold && !wholeParagraph(paragraph, "bold")) out.push(finding("error", codePrefix + "_bold", {}, index));
    const sizes = paragraphSizes(paragraph);
    if (sizes.length && sizes.some((s) => s < spec.sizePt[0] || s > spec.sizePt[1]))
      out.push(finding("error", codePrefix + "_size", { sizes, min: spec.sizePt[0], max: spec.sizePt[1] }, index));
    return { index, sizes };
  }

  function checkHeader(paragraphs, out) {
    const title = checkHeading(paragraphs, RULES.nationalTitle, "national_title", out);
    const motto = checkHeading(paragraphs, RULES.motto, "motto", out);
    if (!title && !motto) {
      out.push(finding("info", "header_not_found", {}));
      return;
    }
    if (!title) out.push(finding("warning", "national_title_missing", {}));
    if (!motto) out.push(finding("warning", "motto_missing", {}));
    if (title && motto && title.sizes.length === 1 && motto.sizes.length === 1) {
      const ok = RULES.titleMottoPairs.some(([a, b]) => a === title.sizes[0] && b === motto.sizes[0]);
      if (!ok)
        out.push(finding("warning", "title_motto_pair", { titleSize: title.sizes[0], mottoSize: motto.sizes[0] }, motto.index));
    }
  }

  function checkDocument(model) {
    const out = [];
    checkSections(model.sections || [], out);
    checkHeader(model.paragraphs || [], out);
    checkRuns(model.paragraphs || [], out);
    const order = { error: 0, warning: 1, info: 2 };
    out.sort((a, b) => order[a.severity] - order[b.severity]);
    return out;
  }

  const MESSAGES = {
    vi: {
      margin_unavailable: () => "Phiên bản ONLYOFFICE này không cho plugin đọc lề trang nên chưa kiểm lề (cần bản mới hơn 8.3.3).",
      page_size: (p) => `Mục ${p.section}: khổ giấy ${p.widthMm} x ${p.heightMm} mm, cần A4 (210 x 297 mm).`,
      page_landscape: (p) => `Mục ${p.section}: trang nằm ngang. Chỉ nên dùng khi nội dung có bảng, biểu không làm thành phụ lục riêng.`,
      margin: (p) => `Mục ${p.section}: lề ${{ top: "trên", bottom: "dưới", left: "trái", right: "phải" }[p.edge]} ${p.valueMm} mm, cần ${p.min}-${p.max} mm.`,
      legacy_font: (p) => `Phông "${p.font}" thuộc bảng mã cũ, cần Unicode (TCVN 6909:2001) với Times New Roman.`,
      font_family: (p) => `Phông "${p.font}", cần Times New Roman.`,
      font_color: () => "Chữ không phải màu đen.",
      font_size: (p) => `Cỡ chữ ${p.sizePt}, ngoài khoảng ${p.min}-${p.max} mà văn bản hành chính sử dụng.`,
      body_size: (p) => `Nội dung văn bản cỡ ${p.sizePt}, cần ${p.min}-${p.max}.`,
      font_inherited: (p) => `${p.runs} đoạn chữ kế thừa phông từ kiểu, plugin không xác định được phông của chúng.`,
      national_title_text: (p) => `Quốc hiệu cần viết đúng: ${p.expected}.`,
      national_title_bold: () => "Quốc hiệu cần in đậm.",
      national_title_size: (p) => `Quốc hiệu cỡ ${p.sizes.join("/")}, cần ${p.min}-${p.max}.`,
      motto_text: (p) => `Tiêu ngữ cần viết đúng: ${p.expected}.`,
      motto_bold: () => "Tiêu ngữ cần in đậm.",
      motto_size: (p) => `Tiêu ngữ cỡ ${p.sizes.join("/")}, cần ${p.min}-${p.max}.`,
      national_title_missing: () => "Có Tiêu ngữ nhưng không thấy Quốc hiệu.",
      motto_missing: () => "Có Quốc hiệu nhưng không thấy Tiêu ngữ.",
      title_motto_pair: (p) => `Quốc hiệu cỡ ${p.titleSize} đi với Tiêu ngữ cỡ ${p.mottoSize}; cần 12 với 13 hoặc 13 với 14.`,
      header_not_found: () => "Không thấy Quốc hiệu và Tiêu ngữ; bỏ qua phần kiểm tra đầu văn bản.",
    },
    en: {
      margin_unavailable: () => "This ONLYOFFICE version does not let plugins read page margins, so margins were not checked (needs a version newer than 8.3.3).",
      page_size: (p) => `Section ${p.section}: paper is ${p.widthMm} x ${p.heightMm} mm, expected A4 (210 x 297 mm).`,
      page_landscape: (p) => `Section ${p.section}: landscape page. Allowed only for tables that are not a separate annex.`,
      margin: (p) => `Section ${p.section}: ${p.edge} margin is ${p.valueMm} mm, expected ${p.min}-${p.max} mm.`,
      legacy_font: (p) => `Font "${p.font}" uses a legacy encoding; use Unicode (TCVN 6909:2001) with Times New Roman.`,
      font_family: (p) => `Font is "${p.font}", expected Times New Roman.`,
      font_color: () => "Text is not black.",
      font_size: (p) => `Font size ${p.sizePt} is outside ${p.min}-${p.max}, the range used by administrative documents.`,
      body_size: (p) => `Body text is ${p.sizePt} pt, expected ${p.min}-${p.max}.`,
      font_inherited: (p) => `${p.runs} text runs inherit their font from a style; the plugin cannot tell what it is.`,
      national_title_text: (p) => `The national title must read exactly: ${p.expected}.`,
      national_title_bold: () => "The national title must be bold.",
      national_title_size: (p) => `National title is ${p.sizes.join("/")} pt, expected ${p.min}-${p.max}.`,
      motto_text: (p) => `The motto must read exactly: ${p.expected}.`,
      motto_bold: () => "The motto must be bold.",
      motto_size: (p) => `Motto is ${p.sizes.join("/")} pt, expected ${p.min}-${p.max}.`,
      national_title_missing: () => "Motto found but no national title.",
      motto_missing: () => "National title found but no motto.",
      title_motto_pair: (p) => `National title ${p.titleSize} pt with motto ${p.mottoSize} pt; expected 12 with 13 or 13 with 14.`,
      header_not_found: () => "National title and motto not found; header checks skipped.",
    },
  };

  function formatFinding(item, lang) {
    const table = MESSAGES[lang] || MESSAGES.vi;
    const make = table[item.code];
    return make ? make(item.params) : item.code;
  }

  return { checkDocument, formatFinding, normalise, MESSAGES };
});
