/*
 * Conversio entre el format intern de plantilla i els formats de Word (.dotx/.docx)
 * i OpenDocument (.ott/.odt). Sense dependencies externes.
 *
 * Model intern d'un estil (unitats inspirades en OOXML):
 * {
 *   name: "Heading 1", type: "paragraph" | "run", basedOn: "Normal",
 *   text: { font, size (pt), bold, italic, underline, strike, caps, smallCaps,
 *           color ("RRGGBB"), spacing (twips) },
 *   para: { align ("left"|"center"|"right"|"both"), indLeft, indRight, firstLine,
 *           before, after (twips), line, lineRule ("auto"|"exact"|"atLeast"),
 *           outlineLvl (0-8), keepNext, keepLines }
 * }
 * line: si lineRule = "auto", 240 = interlineat senzill; si no, twips.
 */
(function (window) {
  "use strict";

  var W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
  var NS = {
    office: "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
    style: "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
    fo: "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
    svg: "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
    text: "urn:oasis:names:tc:opendocument:xmlns:text:1.0"
  };

  /* ---------------- Utilitats ---------------- */

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function num(v) {
    var n = parseFloat(v);
    return isFinite(n) ? n : undefined;
  }
  function clean(obj) {
    var out = {}, has = false;
    for (var k in obj) {
      if (obj[k] !== undefined && obj[k] !== null && obj[k] !== "") { out[k] = obj[k]; has = true; }
    }
    return has ? out : undefined;
  }

  var UNIT_FACTORS = { cm: 567, mm: 56.7, inch: 1440, pt: 20, pc: 240, px: 15 };
  function lengthToTwips(v) {
    if (v === undefined || v === null) return undefined;
    var m = /^\s*(-?[\d.]+)\s*(cm|mm|in|pt|pc|px)?\s*$/i.exec(String(v));
    if (!m) return undefined;
    var unit = (m[2] || "pt").toLowerCase();
    if (unit === "in") unit = "inch";
    return Math.round(parseFloat(m[1]) * UNIT_FACTORS[unit]);
  }
  function twipsToPt(tw) {
    return (Math.round(tw / 20 * 100) / 100) + "pt";
  }

  /* Noms d'estils predefinits (Word en minuscules -> nom visible) */
  var WORD_BUILTIN = {
    "normal": "Normal", "title": "Title", "subtitle": "Subtitle", "quote": "Quote",
    "intense quote": "Intense Quote", "list paragraph": "List Paragraph",
    "no spacing": "No Spacing", "caption": "Caption", "header": "Header",
    "footer": "Footer", "footnote text": "Footnote Text", "toc heading": "TOC Heading"
  };
  function wordNameToDisplay(n) {
    var low = String(n).toLowerCase();
    var h = /^heading ([1-9])$/.exec(low);
    if (h) return "Heading " + h[1];
    return WORD_BUILTIN[low] || n;
  }
  function displayToWordName(n) {
    var h = /^Heading ([1-9])$/.exec(n);
    if (h) return "heading " + h[1];
    if (n === "Caption") return "caption";
    return n;
  }
  function hashStr(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  }
  function wordStyleId(n) {
    var id = String(n).replace(/[^A-Za-z0-9]/g, "");
    return id || "Style" + hashStr(String(n));
  }

  var ODF_MAP = { "Standard": "Normal", "Quotations": "Quote", "Text body": "Body Text" };
  var ODF_MAP_REV = { "Normal": "Standard", "Quote": "Quotations", "Body Text": "Text body" };
  function odfDecode(n) {
    return String(n).replace(/_([0-9A-Fa-f]{2})_/g, function (all, hx) {
      return String.fromCharCode(parseInt(hx, 16));
    });
  }
  function odfEncode(n) {
    return String(n).replace(/[^A-Za-z0-9\-]/g, function (c) {
      var code = c.charCodeAt(0);
      if (code > 255) return "_";
      var hx = code.toString(16).toUpperCase();
      return "_" + (hx.length < 2 ? "0" + hx : hx) + "_";
    });
  }
  function odfToDisplay(name, display) {
    var d = display || odfDecode(name);
    return ODF_MAP[d] || d;
  }
  function displayToOdf(n) {
    return odfEncode(ODF_MAP_REV[n] || n);
  }

  /* ---------------- ZIP: lectura ---------------- */

  function inflateRaw(bytes) {
    if (typeof DecompressionStream === "undefined") {
      return Promise.reject(new Error("DecompressionStream not available"));
    }
    var stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    return new Response(stream).arrayBuffer().then(function (b) { return new Uint8Array(b); });
  }

  function unzip(buffer, wanted) {
    var dv = new DataView(buffer), u8 = new Uint8Array(buffer);
    var eocd = -1;
    for (var i = u8.length - 22; i >= Math.max(0, u8.length - 65557); i--) {
      if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
    }
    if (eocd < 0) return Promise.reject(new Error("ZIP not valid"));
    var count = dv.getUint16(eocd + 10, true);
    var p = dv.getUint32(eocd + 16, true);
    var dec = new TextDecoder("utf-8");
    var jobs = [], out = {};
    function take(nm, m, d) {
      if (m === 0) { out[nm] = d; }
      else if (m === 8) { jobs.push(inflateRaw(d).then(function (r) { out[nm] = r; })); }
    }
    for (var n = 0; n < count; n++) {
      if (dv.getUint32(p, true) !== 0x02014b50) break;
      var method = dv.getUint16(p + 10, true);
      var csize = dv.getUint32(p + 20, true);
      var nlen = dv.getUint16(p + 28, true);
      var elen = dv.getUint16(p + 30, true);
      var clen = dv.getUint16(p + 32, true);
      var loff = dv.getUint32(p + 42, true);
      var name = dec.decode(u8.subarray(p + 46, p + 46 + nlen));
      p += 46 + nlen + elen + clen;
      if (wanted && wanted.indexOf(name) < 0) continue;
      var dstart = loff + 30 + dv.getUint16(loff + 26, true) + dv.getUint16(loff + 28, true);
      take(name, method, u8.subarray(dstart, dstart + csize));
    }
    return Promise.all(jobs).then(function () {
      var txt = {};
      for (var k in out) txt[k] = dec.decode(out[k]);
      return txt;
    });
  }

  /* ---------------- ZIP: escriptura (sense compressio) ---------------- */

  var CRC_TABLE = (function () {
    var t = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[n] = c >>> 0;
    }
    return t;
  })();
  function crc32(u8) {
    var c = 0xFFFFFFFF;
    for (var i = 0; i < u8.length; i++) c = CRC_TABLE[(c ^ u8[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  /* files: [{name, content}] en l'ordre en que han d'apareixer dins el ZIP */
  function makeZip(files) {
    var enc = new TextEncoder();
    var parts = [], central = [], offset = 0;
    files.forEach(function (f) {
      var nameB = enc.encode(f.name), data = enc.encode(f.content), crc = crc32(data);
      var lh = new DataView(new ArrayBuffer(30));
      lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true);
      lh.setUint16(8, 0, true); lh.setUint16(10, 0, true); lh.setUint16(12, 0x21, true);
      lh.setUint32(14, crc, true); lh.setUint32(18, data.length, true); lh.setUint32(22, data.length, true);
      lh.setUint16(26, nameB.length, true); lh.setUint16(28, 0, true);
      parts.push(new Uint8Array(lh.buffer), nameB, data);
      var ch = new DataView(new ArrayBuffer(46));
      ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true);
      ch.setUint16(8, 0x0800, true); ch.setUint16(10, 0, true); ch.setUint16(12, 0, true);
      ch.setUint16(14, 0x21, true); ch.setUint32(16, crc, true); ch.setUint32(20, data.length, true);
      ch.setUint32(24, data.length, true); ch.setUint16(28, nameB.length, true);
      ch.setUint32(42, offset, true);
      central.push(new Uint8Array(ch.buffer), nameB);
      offset += 30 + nameB.length + data.length;
    });
    var cdSize = 0;
    central.forEach(function (a) { cdSize += a.length; });
    var end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true);
    end.setUint16(8, files.length, true); end.setUint16(10, files.length, true);
    end.setUint32(12, cdSize, true); end.setUint32(16, offset, true);
    return new Blob(parts.concat(central, [new Uint8Array(end.buffer)]));
  }

  /* ---------------- Word: lectura de styles.xml ---------------- */

  function wChild(el, name) {
    if (!el) return null;
    for (var c = el.firstElementChild; c; c = c.nextElementSibling) {
      if (c.localName === name) return c;
    }
    return null;
  }
  function wAttr(el, name) {
    if (!el) return null;
    var v = el.getAttributeNS(W_NS, name);
    if (v === null || v === "") v = el.getAttribute("w:" + name);
    return (v === null || v === "") ? null : v;
  }
  function wBool(el, name) {
    var c = wChild(el, name);
    if (!c) return undefined;
    var v = wAttr(c, "val");
    return !(v === "0" || v === "false" || v === "off");
  }

  function readWordRPr(rPr) {
    if (!rPr) return undefined;
    var fonts = wChild(rPr, "rFonts"), sz = wChild(rPr, "sz"), u = wChild(rPr, "u");
    var color = wChild(rPr, "color"), sp = wChild(rPr, "spacing");
    var c = wAttr(color, "val");
    return clean({
      font: fonts ? (wAttr(fonts, "ascii") || wAttr(fonts, "hAnsi")) : undefined,
      size: sz ? num(wAttr(sz, "val")) / 2 : undefined,
      bold: wBool(rPr, "b"),
      italic: wBool(rPr, "i"),
      underline: u ? wAttr(u, "val") !== "none" : undefined,
      strike: wBool(rPr, "strike"),
      caps: wBool(rPr, "caps"),
      smallCaps: wBool(rPr, "smallCaps"),
      color: (c && c !== "auto") ? c.toUpperCase() : undefined,
      spacing: sp ? num(wAttr(sp, "val")) : undefined
    });
  }

  function readWordPPr(pPr) {
    if (!pPr) return undefined;
    var jc = wAttr(wChild(pPr, "jc"), "val");
    var alignMap = { start: "left", left: "left", end: "right", right: "right", center: "center", both: "both", distribute: "both" };
    var ind = wChild(pPr, "ind"), sp = wChild(pPr, "spacing"), ol = wChild(pPr, "outlineLvl");
    var first;
    if (ind) {
      if (wAttr(ind, "hanging") !== null) first = -num(wAttr(ind, "hanging"));
      else if (wAttr(ind, "firstLine") !== null) first = num(wAttr(ind, "firstLine"));
    }
    return clean({
      align: jc ? alignMap[jc] : undefined,
      indLeft: ind ? num(wAttr(ind, "left") || wAttr(ind, "start")) : undefined,
      indRight: ind ? num(wAttr(ind, "right") || wAttr(ind, "end")) : undefined,
      firstLine: first,
      before: sp ? num(wAttr(sp, "before")) : undefined,
      after: sp ? num(wAttr(sp, "after")) : undefined,
      line: sp ? num(wAttr(sp, "line")) : undefined,
      lineRule: (sp && wAttr(sp, "line") !== null) ? (wAttr(sp, "lineRule") || "auto") : undefined,
      outlineLvl: ol ? num(wAttr(ol, "val")) : undefined,
      keepNext: wBool(pPr, "keepNext"),
      keepLines: wBool(pPr, "keepLines")
    });
  }

  function mergeMissing(target, source) {
    if (!source) return target;
    var out = target ? JSON.parse(JSON.stringify(target)) : {};
    for (var k in source) if (out[k] === undefined) out[k] = source[k];
    return out;
  }

  function parseWordStyles(xml) {
    var doc = new DOMParser().parseFromString(xml, "application/xml");
    var all = doc.getElementsByTagNameNS(W_NS, "style");
    var idToName = {}, raw = [];
    for (var i = 0; i < all.length; i++) {
      var el = all[i], type = wAttr(el, "type");
      if (type !== "paragraph" && type !== "character") continue;
      var id = wAttr(el, "styleId");
      var name = wordNameToDisplay(wAttr(wChild(el, "name"), "val") || id);
      idToName[id] = name;
      raw.push({ el: el, name: name, type: type === "character" ? "run" : "paragraph" });
    }
    var styles = [];
    raw.forEach(function (r) {
      var based = wAttr(wChild(r.el, "basedOn"), "val");
      var s = {
        name: r.name, type: r.type,
        basedOn: based ? (idToName[based] || based) : undefined,
        text: readWordRPr(wChild(r.el, "rPr")),
        para: r.type === "paragraph" ? readWordPPr(wChild(r.el, "pPr")) : undefined
      };
      if (s.text || s.para || s.name === "Normal") styles.push(JSON.parse(JSON.stringify(s)));
    });
    /* Les propietats per defecte del document (docDefaults) passen a Normal */
    var defs = doc.getElementsByTagNameNS(W_NS, "docDefaults")[0];
    if (defs) {
      var dr = readWordRPr(wChild(wChild(defs, "rPrDefault"), "rPr"));
      var dp = readWordPPr(wChild(wChild(defs, "pPrDefault"), "pPr"));
      var normal = styles.filter(function (s) { return s.name === "Normal"; })[0];
      if (!normal) { normal = { name: "Normal", type: "paragraph" }; styles.unshift(normal); }
      normal.text = mergeMissing(normal.text, dr);
      normal.para = mergeMissing(normal.para, dp);
    }
    return styles;
  }

  /* ---------------- Word: escriptura (.dotx) ---------------- */

  function wordRPrXml(t) {
    if (!t) return "";
    var x = "";
    if (t.font) x += '<w:rFonts w:ascii="' + esc(t.font) + '" w:hAnsi="' + esc(t.font) + '" w:cs="' + esc(t.font) + '"/>';
    if (t.bold !== undefined) x += '<w:b w:val="' + (t.bold ? 1 : 0) + '"/>';
    if (t.italic !== undefined) x += '<w:i w:val="' + (t.italic ? 1 : 0) + '"/>';
    if (t.caps !== undefined) x += '<w:caps w:val="' + (t.caps ? 1 : 0) + '"/>';
    if (t.smallCaps !== undefined) x += '<w:smallCaps w:val="' + (t.smallCaps ? 1 : 0) + '"/>';
    if (t.strike !== undefined) x += '<w:strike w:val="' + (t.strike ? 1 : 0) + '"/>';
    if (t.color) x += '<w:color w:val="' + esc(t.color) + '"/>';
    if (t.spacing !== undefined) x += '<w:spacing w:val="' + Math.round(t.spacing) + '"/>';
    if (t.size) x += '<w:sz w:val="' + Math.round(t.size * 2) + '"/><w:szCs w:val="' + Math.round(t.size * 2) + '"/>';
    if (t.underline !== undefined) x += '<w:u w:val="' + (t.underline ? "single" : "none") + '"/>';
    return x ? "<w:rPr>" + x + "</w:rPr>" : "";
  }

  function wordPPrXml(p) {
    if (!p) return "";
    var x = "";
    if (p.keepNext !== undefined) x += '<w:keepNext w:val="' + (p.keepNext ? 1 : 0) + '"/>';
    if (p.keepLines !== undefined) x += '<w:keepLines w:val="' + (p.keepLines ? 1 : 0) + '"/>';
    var sp = "";
    if (p.before !== undefined) sp += ' w:before="' + Math.round(p.before) + '"';
    if (p.after !== undefined) sp += ' w:after="' + Math.round(p.after) + '"';
    if (p.line !== undefined) sp += ' w:line="' + Math.round(p.line) + '" w:lineRule="' + (p.lineRule || "auto") + '"';
    if (sp) x += "<w:spacing" + sp + "/>";
    var ind = "";
    if (p.indLeft !== undefined) ind += ' w:left="' + Math.round(p.indLeft) + '"';
    if (p.indRight !== undefined) ind += ' w:right="' + Math.round(p.indRight) + '"';
    if (p.firstLine !== undefined) {
      ind += p.firstLine < 0 ? ' w:hanging="' + Math.round(-p.firstLine) + '"' : ' w:firstLine="' + Math.round(p.firstLine) + '"';
    }
    if (ind) x += "<w:ind" + ind + "/>";
    if (p.align) x += '<w:jc w:val="' + p.align + '"/>';
    if (p.outlineLvl !== undefined) x += '<w:outlineLvl w:val="' + p.outlineLvl + '"/>';
    return x ? "<w:pPr>" + x + "</w:pPr>" : "";
  }

  function buildDotx(tpl) {
    var ids = {};
    tpl.styles.forEach(function (s) { ids[s.name] = wordStyleId(s.name); });
    var stylesXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<w:styles xmlns:w="' + W_NS + '">';
    tpl.styles.forEach(function (s) {
      var isNormal = s.name === "Normal";
      stylesXml += '<w:style w:type="' + (s.type === "run" ? "character" : "paragraph") + '"' +
        (isNormal ? ' w:default="1"' : "") + ' w:styleId="' + esc(ids[s.name]) + '">' +
        '<w:name w:val="' + esc(displayToWordName(s.name)) + '"/>' +
        (s.basedOn && ids[s.basedOn] && s.basedOn !== s.name ? '<w:basedOn w:val="' + esc(ids[s.basedOn]) + '"/>' : "") +
        "<w:qFormat/>" +
        (s.type === "paragraph" ? wordPPrXml(s.para) : "") +
        wordRPrXml(s.text) + "</w:style>";
    });
    stylesXml += "</w:styles>";

    var body = "";
    tpl.styles.forEach(function (s) {
      if (s.type !== "paragraph") return;
      body += '<w:p><w:pPr><w:pStyle w:val="' + esc(ids[s.name]) + '"/></w:pPr>' +
        '<w:r><w:t xml:space="preserve">' + esc(s.name) + "</w:t></w:r></w:p>";
    });
    var documentXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<w:document xmlns:w="' + W_NS + '"><w:body>' + body +
      '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>' +
      '<w:pgMar w:top="1417" w:right="1701" w:bottom="1417" w:left="1701" w:header="708" w:footer="708" w:gutter="0"/>' +
      "</w:sectPr></w:body></w:document>";

    return makeZip([
      { name: "[Content_Types].xml", content:
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
        '<Default Extension="xml" ContentType="application/xml"/>' +
        '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml"/>' +
        '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
        "</Types>" },
      { name: "_rels/.rels", content:
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
        "</Relationships>" },
      { name: "word/_rels/document.xml.rels", content:
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
        "</Relationships>" },
      { name: "word/document.xml", content: documentXml },
      { name: "word/styles.xml", content: stylesXml }
    ]);
  }

  /* ---------------- OpenDocument: lectura de styles.xml ---------------- */

  function oAttr(el, ns, name) {
    if (!el) return null;
    var v = el.getAttributeNS(NS[ns], name);
    return (v === null || v === "") ? null : v;
  }
  function oChild(el, name) {
    if (!el) return null;
    for (var c = el.firstElementChild; c; c = c.nextElementSibling) {
      if (c.localName === name) return c;
    }
    return null;
  }

  function readOdfText(tp, faces) {
    if (!tp) return undefined;
    var fname = oAttr(tp, "style", "font-name");
    var ffam = oAttr(tp, "fo", "font-family");
    var font = fname ? (faces[fname] || fname) : (ffam ? ffam.replace(/^['"]|['"]$/g, "") : undefined);
    var fsize = oAttr(tp, "fo", "font-size");
    var ul = oAttr(tp, "style", "text-underline-style");
    var st = oAttr(tp, "style", "text-line-through-style");
    var fw = oAttr(tp, "fo", "font-weight");
    var fs = oAttr(tp, "fo", "font-style");
    var color = oAttr(tp, "fo", "color");
    var ls = oAttr(tp, "fo", "letter-spacing");
    var tt = oAttr(tp, "fo", "text-transform");
    return clean({
      font: font,
      size: (fsize && /pt$/.test(fsize)) ? num(fsize) : undefined,
      bold: fw ? (fw === "bold" || num(fw) >= 600) : undefined,
      italic: fs ? (fs === "italic" || fs === "oblique") : undefined,
      underline: ul ? ul !== "none" : undefined,
      strike: st ? st !== "none" : undefined,
      caps: tt ? tt === "uppercase" : undefined,
      smallCaps: oAttr(tp, "fo", "font-variant") ? oAttr(tp, "fo", "font-variant") === "small-caps" : undefined,
      color: color ? color.replace("#", "").toUpperCase() : undefined,
      spacing: (ls && ls !== "normal") ? lengthToTwips(ls) : undefined
    });
  }

  function readOdfPara(pp, outline) {
    var alignMap = { start: "left", left: "left", end: "right", right: "right", center: "center", justify: "both" };
    var r = {};
    if (pp) {
      var ta = oAttr(pp, "fo", "text-align");
      var lh = oAttr(pp, "fo", "line-height");
      var lal = oAttr(pp, "style", "line-height-at-least");
      r.align = ta ? alignMap[ta] : undefined;
      r.indLeft = lengthToTwips(oAttr(pp, "fo", "margin-left"));
      r.indRight = lengthToTwips(oAttr(pp, "fo", "margin-right"));
      r.firstLine = lengthToTwips(oAttr(pp, "fo", "text-indent"));
      r.before = lengthToTwips(oAttr(pp, "fo", "margin-top"));
      r.after = lengthToTwips(oAttr(pp, "fo", "margin-bottom"));
      if (lh && /%$/.test(lh)) { r.line = Math.round(num(lh) * 2.4); r.lineRule = "auto"; }
      else if (lh && lh !== "normal") { r.line = lengthToTwips(lh); r.lineRule = "exact"; }
      else if (lal) { r.line = lengthToTwips(lal); r.lineRule = "atLeast"; }
      var kwn = oAttr(pp, "fo", "keep-with-next");
      if (kwn) r.keepNext = kwn === "always";
      var kt = oAttr(pp, "fo", "keep-together");
      if (kt) r.keepLines = kt === "always";
    }
    if (outline) r.outlineLvl = Math.max(0, Math.min(8, num(outline) - 1));
    return clean(r);
  }

  function parseOdfStyles(xml) {
    var doc = new DOMParser().parseFromString(xml, "application/xml");
    var faces = {};
    var ff = doc.getElementsByTagNameNS(NS.style, "font-face");
    for (var i = 0; i < ff.length; i++) {
      var fam = oAttr(ff[i], "svg", "font-family");
      faces[oAttr(ff[i], "style", "name")] = fam ? fam.replace(/^['"]|['"]$/g, "") : oAttr(ff[i], "style", "name");
    }
    var officeStyles = doc.getElementsByTagNameNS(NS.office, "styles")[0];
    if (!officeStyles) return [];
    var nameMap = {}, styles = [], defaults = null;
    for (var c = officeStyles.firstElementChild; c; c = c.nextElementSibling) {
      var family = oAttr(c, "style", "family");
      if (c.localName === "default-style" && family === "paragraph") {
        defaults = {
          text: readOdfText(oChild(c, "text-properties"), faces),
          para: readOdfPara(oChild(c, "paragraph-properties"))
        };
        continue;
      }
      if (c.localName !== "style" || (family !== "paragraph" && family !== "text")) continue;
      var raw = oAttr(c, "style", "name");
      var name = odfToDisplay(raw, oAttr(c, "style", "display-name"));
      nameMap[raw] = name;
      styles.push({
        name: name,
        type: family === "text" ? "run" : "paragraph",
        parent: oAttr(c, "style", "parent-style-name"),
        text: readOdfText(oChild(c, "text-properties"), faces),
        para: family === "paragraph" ? readOdfPara(oChild(c, "paragraph-properties"), oAttr(c, "style", "default-outline-level")) : undefined
      });
    }
    var out = styles.map(function (s) {
      var r = { name: s.name, type: s.type, basedOn: s.parent ? (nameMap[s.parent] || odfToDisplay(s.parent)) : undefined, text: s.text, para: s.para };
      return JSON.parse(JSON.stringify(r));
    }).filter(function (s) { return s.text || s.para || s.name === "Normal"; });
    if (defaults) {
      var normal = out.filter(function (s) { return s.name === "Normal"; })[0];
      if (!normal) { normal = { name: "Normal", type: "paragraph" }; out.unshift(normal); }
      normal.text = mergeMissing(normal.text, defaults.text);
      normal.para = mergeMissing(normal.para, defaults.para);
    }
    return out;
  }

  /* ---------------- OpenDocument: escriptura (.ott) ---------------- */

  function odfTextXml(t) {
    if (!t) return "";
    var a = "";
    if (t.font) a += ' fo:font-family="' + esc("'" + t.font + "'") + '"';
    if (t.size) a += ' fo:font-size="' + t.size + 'pt"';
    if (t.bold !== undefined) a += ' fo:font-weight="' + (t.bold ? "bold" : "normal") + '"';
    if (t.italic !== undefined) a += ' fo:font-style="' + (t.italic ? "italic" : "normal") + '"';
    if (t.underline !== undefined) a += ' style:text-underline-style="' + (t.underline ? "solid" : "none") + '"' + (t.underline ? ' style:text-underline-width="auto" style:text-underline-color="font-color"' : "");
    if (t.strike !== undefined) a += ' style:text-line-through-style="' + (t.strike ? "solid" : "none") + '"';
    if (t.caps !== undefined) a += ' fo:text-transform="' + (t.caps ? "uppercase" : "none") + '"';
    if (t.smallCaps !== undefined) a += ' fo:font-variant="' + (t.smallCaps ? "small-caps" : "normal") + '"';
    if (t.color) a += ' fo:color="#' + esc(t.color) + '"';
    if (t.spacing !== undefined) a += ' fo:letter-spacing="' + twipsToPt(t.spacing) + '"';
    return a ? "<style:text-properties" + a + "/>" : "";
  }

  function odfParaXml(p) {
    if (!p) return "";
    var alignMap = { left: "start", right: "end", center: "center", both: "justify" };
    var a = "";
    if (p.align) a += ' fo:text-align="' + alignMap[p.align] + '"';
    if (p.indLeft !== undefined) a += ' fo:margin-left="' + twipsToPt(p.indLeft) + '"';
    if (p.indRight !== undefined) a += ' fo:margin-right="' + twipsToPt(p.indRight) + '"';
    if (p.firstLine !== undefined) a += ' fo:text-indent="' + twipsToPt(p.firstLine) + '"';
    if (p.before !== undefined) a += ' fo:margin-top="' + twipsToPt(p.before) + '"';
    if (p.after !== undefined) a += ' fo:margin-bottom="' + twipsToPt(p.after) + '"';
    if (p.line !== undefined) {
      if ((p.lineRule || "auto") === "auto") a += ' fo:line-height="' + Math.round(p.line / 2.4) + '%"';
      else if (p.lineRule === "exact") a += ' fo:line-height="' + twipsToPt(p.line) + '"';
      else a += ' style:line-height-at-least="' + twipsToPt(p.line) + '"';
    }
    if (p.keepNext !== undefined) a += ' fo:keep-with-next="' + (p.keepNext ? "always" : "auto") + '"';
    if (p.keepLines !== undefined) a += ' fo:keep-together="' + (p.keepLines ? "always" : "auto") + '"';
    return a ? "<style:paragraph-properties" + a + "/>" : "";
  }

  var ODF_ROOT_NS = ' xmlns:office="' + NS.office + '" xmlns:style="' + NS.style + '" xmlns:fo="' + NS.fo +
    '" xmlns:svg="' + NS.svg + '" xmlns:text="' + NS.text + '" office:version="1.3"';

  function buildOtt(tpl) {
    var stylesXml = '<?xml version="1.0" encoding="UTF-8"?><office:document-styles' + ODF_ROOT_NS + "><office:styles>";
    tpl.styles.forEach(function (s) {
      var odfName = displayToOdf(s.name);
      var isPara = s.type !== "run";
      var outline = (isPara && s.para && s.para.outlineLvl !== undefined) ? ' style:default-outline-level="' + (s.para.outlineLvl + 1) + '"' : "";
      stylesXml += '<style:style style:name="' + esc(odfName) + '" style:display-name="' + esc(ODF_MAP_REV[s.name] || s.name) + '"' +
        ' style:family="' + (isPara ? "paragraph" : "text") + '"' +
        (s.basedOn && s.basedOn !== s.name ? ' style:parent-style-name="' + esc(displayToOdf(s.basedOn)) + '"' : "") +
        outline + (isPara ? ' style:class="text"' : "") + ">" +
        (isPara ? odfParaXml(s.para) : "") + odfTextXml(s.text) + "</style:style>";
    });
    stylesXml += "</office:styles></office:document-styles>";

    var body = "";
    tpl.styles.forEach(function (s) {
      if (s.type === "run") return;
      body += '<text:p text:style-name="' + esc(displayToOdf(s.name)) + '">' + esc(s.name) + "</text:p>";
    });
    var contentXml = '<?xml version="1.0" encoding="UTF-8"?><office:document-content' + ODF_ROOT_NS +
      "><office:body><office:text>" + body + "</office:text></office:body></office:document-content>";
    var mime = "application/vnd.oasis.opendocument.text-template";
    var manifest = '<?xml version="1.0" encoding="UTF-8"?>' +
      '<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.3">' +
      '<manifest:file-entry manifest:full-path="/" manifest:version="1.3" manifest:media-type="' + mime + '"/>' +
      '<manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>' +
      '<manifest:file-entry manifest:full-path="styles.xml" manifest:media-type="text/xml"/>' +
      "</manifest:manifest>";

    return makeZip([
      { name: "mimetype", content: mime },
      { name: "META-INF/manifest.xml", content: manifest },
      { name: "content.xml", content: contentXml },
      { name: "styles.xml", content: stylesXml }
    ]);
  }

  /* ---------------- API publica ---------------- */

  function baseName(fileName) {
    return String(fileName).replace(/\.[^.]+$/, "");
  }

  /* Retorna una Promise amb { name, styles } */
  function importFile(file) {
    var ext = (/\.([^.]+)$/.exec(file.name) || [])[1];
    ext = ext ? ext.toLowerCase() : "";
    return file.arrayBuffer().then(function (buf) {
      if (ext === "json") {
        var j = JSON.parse(new TextDecoder("utf-8").decode(buf));
        if (!j || !Array.isArray(j.styles)) throw new Error("JSON");
        return { name: j.name || baseName(file.name), styles: j.styles };
      }
      if (ext === "dotx" || ext === "docx") {
        return unzip(buf, ["word/styles.xml"]).then(function (f) {
          if (!f["word/styles.xml"]) throw new Error("word/styles.xml");
          return { name: baseName(file.name), styles: parseWordStyles(f["word/styles.xml"]) };
        });
      }
      if (ext === "ott" || ext === "odt") {
        return unzip(buf, ["styles.xml"]).then(function (f) {
          if (!f["styles.xml"]) throw new Error("styles.xml");
          return { name: baseName(file.name), styles: parseOdfStyles(f["styles.xml"]) };
        });
      }
      throw new Error("UNSUPPORTED");
    });
  }

  /* Retorna { blob, fileName } */
  function exportTemplate(tpl, format) {
    var safe = String(tpl.name).replace(/[\\\/:*?"<>|]+/g, "_");
    if (format === "dotx") return { blob: buildDotx(tpl), fileName: safe + ".dotx" };
    if (format === "ott") return { blob: buildOtt(tpl), fileName: safe + ".ott" };
    var json = JSON.stringify({ format: "onlyoffice-styletemplates", version: 1, name: tpl.name, created: tpl.created, styles: tpl.styles }, null, 2);
    return { blob: new Blob([json], { type: "application/json" }), fileName: safe + ".json" };
  }

  window.STFormats = { importFile: importFile, exportTemplate: exportTemplate };
})(window);
