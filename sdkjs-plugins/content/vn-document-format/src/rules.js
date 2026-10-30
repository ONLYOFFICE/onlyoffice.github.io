// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2026 Desktiny contributors
//
// Formatting rules for Vietnamese administrative documents (văn bản hành chính).
// Source: Nghị định 30/2020/NĐ-CP ngày 05/3/2020 của Chính phủ về công tác văn thư,
// Phụ lục I "Thể thức, kỹ thuật trình bày văn bản hành chính và bản sao văn bản",
// Phần I, mục I (quy định chung), mục II (thành phần thể thức) và mục V (bảng mẫu chữ).
// Values were read from a PDF copy of the appendix on 2026-10-30. Re-check against the
// official text before relying on them for anything binding.
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.VnDocRules = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  const TWIPS_PER_MM = 1440 / 25.4;

  return {
    TWIPS_PER_MM,
    source: "Nghị định 30/2020/NĐ-CP, Phụ lục I, Phần I",
    // Phần I, mục I.1: "Khổ A4 (210 mm x 297 mm)"; I.2: portrait, landscape allowed for tables.
    page: { widthMm: 210, heightMm: 297, toleranceMm: 1 },
    // Phần I, mục I.3: "Cách mép trên và mép dưới 20 - 25 mm, cách mép trái 30 - 35 mm,
    // cách mép phải 15 - 20 mm."
    margins: {
      topMm: [20, 25],
      bottomMm: [20, 25],
      leftMm: [30, 35],
      rightMm: [15, 20],
      toleranceMm: 0.5,
    },
    // Phần I, mục I.4: "Phông chữ tiếng Việt Times New Roman, bộ mã ký tự Unicode theo
    // TCVN 6909:2001, màu đen."
    fontFamily: "Times New Roman",
    // Fonts of the pre-Unicode encodings (VNI, VietWare, TCVN3 ".Vn..." families).
    legacyFontPattern: /^(\.vn[a-z]|vni-|vps )/i,
    // Phần I, mục V: every element uses 10 to 14 pt, so anything outside is wrong whatever
    // the element is. Body text ("Nội dung văn bản", row 6) is 13 to 14 pt.
    sizePt: { min: 10, max: 14, body: [13, 14] },
    bodyMinChars: 100,
    // Phần I, mục II.1 and the table in mục V (rows 1) plus footnote 1 under that table.
    nationalTitle: {
      text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
      sizePt: [12, 13],
      bold: true,
    },
    motto: {
      text: "Độc lập - Tự do - Hạnh phúc",
      sizePt: [13, 14],
      bold: true,
    },
    // Footnote 1 of the table: sizes move together (12 with 13, or 13 with 14).
    titleMottoPairs: [[12, 13], [13, 14]],
  };
});
