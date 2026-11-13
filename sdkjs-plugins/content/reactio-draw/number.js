/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
   If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* Number compounds (Document editor): the marks [[key]], [[key.sub]], [[key.sub.num]], [[A:key]]… in the Reactio Draw
   drawings and in the text get their numbers. The same rules as Reactio Draw's numbering of Word files: numbers go by
   first appearance in the drawings, in their order in the document; compounds only in the text come after them.
   In the text a mark becomes a content control tagged rdcmpd:<mark> holding the number (as Reactio Draw writes it in
   Word, so either one numbers the file again); a drawing keeps its marks and shows the numbers.
   Show marks: the marks again, in the text and the drawings, to see which key is which. */
(function () {
  'use strict';

  var RD = window.ReactioBridge,
    run = RD.run,
    P = window.Asc.plugin,
    KEY = 'reactio-onlyoffice-numbering',
    busy = false;

  /* ---------- the numbers (as Reactio Draw counts them) ---------- */
  function letter(k) {
    var s = '';
    k = Math.max(1, k);
    while (k > 0) {
      k--;
      s = String.fromCharCode(97 + (k % 26)) + s;
      k = Math.floor(k / 26);
    }
    return s;
  }
  function roman(n) {
    var r = '',
      T = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
    for (var i = 0; i < T.length; i++)
      while (n >= T[i][0]) {
        r += T[i][1];
        n -= T[i][0];
      }
    return r;
  }
  function numText(tpl, k) {
    var t = String(tpl || '{n}');
    if (!/\{n\}|\{a\}/.test(t)) t += '{n}';
    return t.replace(/\{n\}/g, String(k)).replace(/\{a\}/g, letter(k));
  }
  function seriesLabel(p, n) {
    return p === 'A' ? letter(n).toUpperCase() : p === 'a' ? letter(n) : p === 'I' ? roman(n) : roman(n).toLowerCase();
  }
  function numberer(tpl, start) {
    var main = {},
      keyTpl = {},
      subs = {},
      series = {},
      next = start,
      curTpl = tpl;
    function keyNo(key) {
      var sp = /^([AaIi]):/.exec(key);
      if (sp) {
        var m = series[sp[1]] || (series[sp[1]] = { n: 0, k: {} });
        if (!m.k[key]) m.k[key] = ++m.n;
        return m.k[key];
      }
      if (!main[key]) {
        main[key] = next++;
        keyTpl[key] = curTpl;
      }
      return main[key];
    }
    return {
      count: function () {
        return Object.keys(main).length + Object.keys(series).reduce(function (s, p) { return s + series[p].n; }, 0);
      },
      /* a part of the document numbered on its own (a chapter: [[#format 2-{n}]] further down): new compounds from here
         take its style and count from its first number; one numbered before keeps its number */
      section: function (t, s0) {
        curTpl = t;
        next = s0;
      },
      take: function (key, sub) {
        keyNo(key);
        if (sub) {
          var m = subs[key] || (subs[key] = { n: 0, k: {} });
          if (!m.k[sub]) m.k[sub] = ++m.n;
        }
      },
      text: function (key, sub, fmt) {
        var sp = /^([AaIi]):/.exec(key),
          n = sp ? seriesLabel(sp[1], keyNo(key)) : numText(keyTpl[key] || curTpl, keyNo(key));
        if (!sub) return n;
        var m = subs[key],
          i = m && m.k[sub];
        if (!i) return n;
        return fmt === 'num' ? n + '.' + i : fmt === 'dash' ? n + '-' + i : n + letter(i);
      }
    };
  }
  /* a short fingerprint of a drawing's data, the same here and in the editor: a drawing found in the text's order is
     matched to its object */
  function fingerprint(s) {
    var x = 5381;
    for (var i = 0; i < s.length; i++) x = ((x << 5) + x + s.charCodeAt(i)) | 0;
    return s.length + ':' + x;
  }
  /* what is inside [[ ]]: key, sub, format */
  function parseSpec(x) {
    var m = /^((?:[AaIi]:)?[A-Za-z0-9_-]+)(?:\.([A-Za-z0-9_-]+)(?:\.(letter|num|dash))?)?$/.exec(x);
    return m ? { key: m[1], sub: m[2] || '', fmt: m[3] || (m[2] ? 'letter' : '') } : null;
  }

  /* ---------- the editor ---------- */
  function method(name, args) {
    return new Promise(function (resolve) {
      P.executeMethod(name, args || [], resolve);
    });
  }
  /* a function run in the editor; an error there comes back as one here, with what went wrong */
  function command(fn, recalc) {
    var wrapped = new Function(
      'try { return (' + fn.toString() + ')(); } catch (e) { return { rdError: String((e && e.message) || e) + (e && e.stack ? " @ " + String(e.stack).split("\\n").slice(0, 2).join(" ") : "") }; }'
    );
    return new Promise(function (resolve, reject) {
      P.callCommand(wrapped, false, !!recalc, function (r) {
        if (r && r.rdError) reject(new Error('in the editor: ' + r.rdError));
        else resolve(r);
      });
    });
  }

  /* the document in its order: the Reactio Draw drawings (by fingerprint, Asc.scope.rdGuid), the marks of the text
     (plain [[…]] and the numbers put in before, content controls rdcmpd:…) and the settings lines [[#format …]],
     [[#start …]] (runs in the editor: nothing from outside the function) */
  function collectText() {
    var RX = /\[\[(?:#(format|start)\s+([^\]]+?)\s*|((?:[AaIi]:)?[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+(?:\.(?:letter|num|dash))?)?))\]\]/g,
      guid = Asc.scope.rdGuid,
      doc = Api.GetDocument(),
      paras = doc.GetAllParagraphs(),
      seq = [],
      buf = '';
    function fp(s) {
      var x = 5381;
      for (var i = 0; i < s.length; i++) x = ((x << 5) + x + s.charCodeAt(i)) | 0;
      return s.length + ':' + x;
    }
    function flush() {
      var m;
      RX.lastIndex = 0;
      while ((m = RX.exec(buf))) seq.push(m[1] ? { set: m[1], val: m[2] } : { spec: m[3] });
      buf = '';
    }
    function setOf(tg) {
      var m = /^rdset:#(format|start)\s+(.+)$/.exec(tg);
      return m ? { set: m[1], val: m[2] } : null;
    }
    for (var i = 0; i < paras.length; i++) {
      var p = paras[i],
        n0 = p.GetElementsCount();
      /* the settings kept out of sight (content controls rdset:…) stand at the start of their paragraph: before its
         drawings */
      for (var j0 = 0; j0 < n0; j0++) {
        var e0 = p.GetElement(j0);
        if (e0 && e0.GetClassType && e0.GetClassType() === 'inlineLvlSdt') {
          var s0 = setOf(String(e0.GetTag() || ''));
          if (s0) seq.push(s0);
        }
      }
      /* its drawings first (a drawing is a paragraph of its own, as a rule) */
      var oles = p.GetAllOleObjects ? p.GetAllOleObjects() || [] : [];
      for (var o = 0; o < oles.length; o++) {
        try {
          if (oles[o].GetApplicationId() !== guid) continue;
          var d = String(oles[o].GetData() || '');
          if (d) seq.push({ draw: fp(d) });
        } catch (e) {}
      }
      var n = p.GetElementsCount();
      for (var j = 0; j < n; j++) {
        var e = p.GetElement(j),
          ct = e && e.GetClassType ? e.GetClassType() : '';
        if (ct === 'run') buf += e.GetText();
        else if (ct === 'inlineLvlSdt') {
          var tg = String(e.GetTag() || '');
          if (tg.indexOf('rdcmpd:') === 0) {
            flush();
            seq.push({ spec: tg.slice(7) });
          } else if (tg.indexOf('rdset:') === 0) {
            flush();
          } else {
            var r = e.GetRange && e.GetRange();
            if (r) buf += r.GetText();
          }
        } else flush();
      }
      flush();
    }
    return { seq: seq };
  }

  /* the numbers (or the marks) into the text: Asc.scope.rdNums {spec: number}, rdMarks, rdBold */
  function applyText() {
    var RX = /\[\[((?:[AaIi]:)?[A-Za-z0-9_-]+)(?:\.([A-Za-z0-9_-]+)(?:\.(letter|num|dash))?)?\]\]/g,
      nums = Asc.scope.rdNums || {},
      marks = !!Asc.scope.rdMarks,
      bold = !!Asc.scope.rdBold,
      /* strip: the numbers as plain text, no marks and no settings left (Remove marks, Final copy) */
      strip = !!Asc.scope.rdStrip && !marks,
      doc = Api.GetDocument(),
      done = 0;
    function label(spec) {
      if (marks) return '[[' + spec + ']]';
      return nums[spec] != null && nums[spec] !== '' ? String(nums[spec]) : null;
    }
    function runOf(text, tp) {
      var r = Api.CreateRun();
      r.AddText(text);
      if (tp) r.SetTextPr(tp);
      if (bold && !marks) r.SetBold(true);
      return r;
    }
    /* the numbers put in before */
    var ccs = doc.GetAllContentControls();
    for (var i = 0; i < ccs.length; i++) {
      var cc = ccs[i];
      if (!cc.GetClassType || cc.GetClassType() !== 'inlineLvlSdt') continue;
      var tg = String(cc.GetTag() || '');
      if (tg.indexOf('rdcmpd:') !== 0) continue;
      var t = label(tg.slice(7));
      if (t == null) continue;
      var e0 = cc.GetElementsCount() ? cc.GetElement(0) : null,
        tp = e0 && e0.GetClassType && e0.GetClassType() === 'run' ? e0.GetTextPr() : null;
      cc.RemoveAllElements();
      cc.AddElement(runOf(t, tp), 0);
      if (strip) cc.Delete(true);
      done++;
    }
    /* plain marks: each becomes a content control with its number, from the end of a paragraph back so the places
       still found stay right */
    if (!marks) {
      var paras = doc.GetAllParagraphs();
      for (var k = 0; k < paras.length; k++) {
        var p = paras[k],
          txt = p.GetText();
        if (txt.indexOf('[[') < 0) continue;
        var seen = {},
          found = [],
          m;
        RX.lastIndex = 0;
        while ((m = RX.exec(txt))) seen[m[0]] = true;
        for (var mk in seen) {
          var spec = mk.slice(2, -2);
          if (label(spec) == null) continue;
          var rs = p.Search(mk, true) || [];
          for (var q = 0; q < rs.length; q++) found.push({ r: rs[q], spec: spec, pos: rs[q].GetStartPos() });
        }
        found.sort(function (a, b) { return b.pos - a.pos; });
        for (var f = 0; f < found.length; f++) {
          var it = found[f],
            tpr = it.r.GetTextPr();
          if (strip) {
            it.r.Select();
            doc.InsertContent([runOf(label(it.spec), tpr)], true);
            done++;
            continue;
          }
          var sdt = Api.CreateInlineLvlSdt();
          sdt.SetTag('rdcmpd:' + it.spec);
          sdt.SetAlias('Compound ' + it.spec);
          sdt.AddElement(runOf(label(it.spec), tpr), 0);
          it.r.Select();
          doc.InsertContent([sdt], true);
          done++;
        }
      }
    }
    /* the settings lines ([[#format 2-{n}]], [[#start 5]]): kept as content controls (tag rdset:#format 2-{n}) that
       show nothing, so they are neither seen nor printed; Show marks writes them out again in the same place. A line
       that held only settings goes, its settings moving to the start of the next paragraph (no empty line left) */
    var ZW = '\u200b';
    function setSdt(spec) {
      var sdt = Api.CreateInlineLvlSdt();
      sdt.SetTag('rdset:' + spec);
      sdt.SetAlias('Numbering ' + spec);
      var r = Api.CreateRun();
      r.AddText(marks ? '[[' + spec + ']]' : ZW);
      sdt.AddElement(r, 0);
      return sdt;
    }
    for (var c = 0; c < ccs.length; c++) {
      var sc = ccs[c];
      if (!sc.GetClassType || sc.GetClassType() !== 'inlineLvlSdt') continue;
      var stg = String(sc.GetTag() || '');
      if (stg.indexOf('rdset:') !== 0) continue;
      if (strip) {
        sc.Delete(false);
        continue;
      }
      var e1 = sc.GetElementsCount() ? sc.GetElement(0) : null,
        tp1 = e1 && e1.GetClassType && e1.GetClassType() === 'run' ? e1.GetTextPr() : null,
        r1 = Api.CreateRun();
      r1.AddText(marks ? '[[' + stg.slice(6) + ']]' : ZW);
      if (tp1) r1.SetTextPr(tp1);
      sc.RemoveAllElements();
      sc.AddElement(r1, 0);
    }
    if (!marks) {
      var SRX = /\[\[(#(?:format|start)\s+[^\]]+?)\s*\]\]/g,
        ps = doc.GetAllParagraphs();
      for (var a = ps.length - 1; a >= 0; a--) {
        var pp = ps[a],
          tx = pp.GetText();
        if (tx.indexOf('[[#') < 0) continue;
        var sm,
          list = [];
        SRX.lastIndex = 0;
        while ((sm = SRX.exec(tx))) list.push({ s: sm[0], spec: sm[1].replace(/\s+/g, ' ') });
        if (!list.length) continue;
        var rest = tx.replace(SRX, '').replace(/[\s\u200b]/g, ''),
          nx = pp.GetNext ? pp.GetNext() : null;
        if (strip) {
          /* the settings go: a line of settings only with its paragraph */
          if (!rest && nx) pp.Delete();
          else
            list.forEach(function (x) {
              (pp.Search(x.s, true) || []).sort(function (u, v) { return v.GetStartPos() - u.GetStartPos(); }).forEach(function (r) { r.Delete(); });
            });
          continue;
        }
        if (!rest && nx && nx.GetClassType && nx.GetClassType() === 'paragraph') {
          /* a line of settings only: they go to the start of the next paragraph, the line goes */
          for (var b2 = list.length - 1; b2 >= 0; b2--) nx.AddElement(setSdt(list[b2].spec), 0);
          pp.Delete();
          continue;
        }
        var fnd = [];
        list.forEach(function (x) {
          (pp.Search(x.s, true) || []).forEach(function (r) { fnd.push({ r: r, spec: x.spec, pos: r.GetStartPos() }); });
        });
        fnd.sort(function (u, v) { return v.pos - u.pos; });
        fnd.forEach(function (x) {
          x.r.Select();
          doc.InsertContent([setSdt(x.spec)], true);
        });
      }
    }
    try {
      doc.RemoveSelection();
    } catch (e) {}
    return done;
  }

  /* Final copy: each Reactio Draw drawing (by fingerprint, Asc.scope.rdPics {fp: {src, w, h}}) becomes a plain
     picture of the same size in its place */
  function picturesFor() {
    var pics = Asc.scope.rdPics || {},
      guid = Asc.scope.rdGuid,
      doc = Api.GetDocument(),
      paras = doc.GetAllParagraphs(),
      done = 0;
    function fp(s) {
      var x = 5381;
      for (var i = 0; i < s.length; i++) x = ((x << 5) + x + s.charCodeAt(i)) | 0;
      return s.length + ':' + x;
    }
    for (var i = 0; i < paras.length; i++) {
      var p = paras[i],
        oles = p.GetAllOleObjects ? p.GetAllOleObjects() || [] : [];
      for (var o = oles.length - 1; o >= 0; o--) {
        var ole = oles[o];
        if (ole.GetApplicationId() !== guid) continue;
        var pic = pics[fp(String(ole.GetData() || ''))];
        if (!pic) continue;
        var img = Api.CreateImage(pic.src, pic.w || ole.GetWidth(), pic.h || ole.GetHeight());
        if (p.GetText().replace(/[\s\u200b]/g, '') === '' && oles.length === 1) {
          /* alone in its paragraph: the picture goes in, the drawing goes */
          p.AddDrawing(img);
          ole.Delete();
        } else {
          /* among text: put where it was */
          ole.Select();
          doc.InsertContent([img], true);
        }
        done++;
      }
    }
    try {
      doc.RemoveSelection();
    } catch (e) {}
    return done;
  }

  /* ---------- the window ---------- */
  function status(t, err) {
    var s = document.getElementById('status');
    s.textContent = t || '';
    s.className = err ? 'err' : '';
  }
  function settings() {
    return {
      fmt: document.getElementById('fmt').value.trim() || '{n}',
      start: document.getElementById('start').value.trim() || '1',
      boldText: document.getElementById('boldText').checked,
      boldDraw: document.getElementById('boldDraw').checked
    };
  }
  function startNo(s) {
    return /^[a-z]$/i.test(s) ? s.toLowerCase().charCodeAt(0) - 96 : parseInt(s, 10) || 1;
  }
  function loadSettings() {
    try {
      var o = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (!o) return;
      if (o.fmt) document.getElementById('fmt').value = o.fmt;
      if (o.start) document.getElementById('start').value = o.start;
      document.getElementById('boldText').checked = !!o.boldText;
      document.getElementById('boldDraw').checked = !!o.boldDraw;
    } catch (e) {}
  }

  /* the document's own style and first number: settings lines before its first drawing and its first compound */
  function headSettings(seq) {
    var o = {};
    for (var i = 0; i < seq.length; i++) {
      var x = seq[i];
      if (x.draw || x.spec) break;
      if (x.set && !(x.set in o)) o[x.set] = String(x.val).trim();
    }
    return o;
  }

  function readDocument() {
    Asc.scope.rdGuid = P.info.guid;
    return command(collectText).then(function (r) {
      return (r && r.seq) || [];
    });
  }

  /* mode: 'number', 'marks' (Show marks), 'strip' (Remove marks: the numbers as plain text, no marks or settings
     left), 'final' (Final copy: the same, and the drawings plain pictures) */
  async function go(mode) {
    var showMarks = mode === 'marks',
      strip = mode === 'strip' || mode === 'final',
      final = mode === 'final';
    if (busy) return;
    busy = true;
    try {
      var guid = P.info.guid,
        st = settings();
      try {
        localStorage.setItem(KEY, JSON.stringify(st));
      } catch (e) {}
      status('Reading the drawings…');
      var oles = (await method('GetAllOleObjects', [guid])) || [],
        items = [];
      for (var i = 0; i < oles.length; i++) {
        var o = oles[i];
        if (!o || !o.Data || (o.ApplicationId && o.ApplicationId !== guid)) continue;
        await run('set', { text: o.Data, format: 'json' });
        var cm;
        try {
          cm = await run('compoundMarks');
        } catch (e) {
          if (/Unknown command/i.test(e.message)) throw new Error('this plugin carries an older Reactio Draw: update it (update.sh) to number compounds');
          throw e;
        }
        /* a drawing without marks is left as it is, except in the Final copy, where it becomes a picture too */
        if (!cm.marks.length && !final) continue;
        items.push({ ole: o, fp: fingerprint(o.Data), marks: cm.marks, s0: RD.sizeOf((await run('export', { format: 'svg' })).svg) });
      }
      /* the other objects of the document (a drawing put in by Reactio Draw in Word is one of them): said, so
         what this editor makes of them can be seen */
      var others = [];
      try {
        ((await method('GetAllOleObjects', [])) || []).forEach(function (x) {
          if (!x || x.ApplicationId === guid) return;
          var dt = String(x.Data || '');
          others.push((x.ApplicationId || '(no id)') + ' [' + dt.length + ' chars' + (dt ? ': ' + dt.slice(0, 24).replace(/\s+/g, ' ') : '') + ']');
        });
      } catch (e) {}
      status('Reading the text…');
      var seq = await readDocument();
      if (!seq.length && !items.length) throw new Error('no marks found in the text or the drawings');

      /* the parts numbered on their own: the first takes the style and number here; a [[#format …]] or [[#start …]]
         line after compounds opens a new part (a chapter), which counts from 1 unless it says otherwise */
      var secs = [{ tpl: st.fmt, start: startNo(st.start) }],
        used = [false],
        sect = 0,
        entries = [],
        left = items.slice();
      seq.forEach(function (x, pos) {
        if (x.set) {
          if (!used[sect]) {
            if (sect === 0) return;
          } else {
            secs.push({ tpl: secs[sect].tpl, start: 1 });
            used.push(false);
            sect = secs.length - 1;
          }
          if (x.set === 'format') secs[sect].tpl = String(x.val).trim();
          else secs[sect].start = startNo(String(x.val).trim());
          return;
        }
        if (x.draw) {
          var k = -1;
          for (var q = 0; q < left.length; q++) if (left[q].fp === x.draw) { k = q; break; }
          if (k < 0) return;
          var it = left.splice(k, 1)[0];
          used[sect] = true;
          entries.push({ sect: sect, text: 0, pos: pos, item: it });
          return;
        }
        var sp = parseSpec(x.spec);
        if (!sp) return;
        used[sect] = true;
        entries.push({ sect: sect, text: 1, pos: pos, spec: x.spec, s: sp });
      });
      /* drawings the text walk did not meet (in a header, a text box): with the first part's */
      left.forEach(function (it, i) {
        entries.push({ sect: 0, text: 0, pos: -1 - left.length + i, item: it });
      });
      /* part by part: its drawings first, in their order, then its text */
      entries.sort(function (a, b) { return a.sect - b.sect || a.text - b.text || a.pos - b.pos; });
      var N = numberer(secs[0].tpl, secs[0].start),
        cur = 0;
      entries.forEach(function (e) {
        if (e.sect !== cur) {
          cur = e.sect;
          N.section(secs[cur].tpl, secs[cur].start);
        }
        if (e.item) e.item.marks.forEach(function (m) { N.take(m.key, m.sub); });
        else N.take(e.s.key, e.s.sub);
      });

      /* the text first: the editor puts the drawings' new pictures in a moment later (it loads each picture), and a
         command given to it meanwhile is not carried out */
      status('Numbering the text…');
      var nums = {};
      entries.forEach(function (e) {
        if (e.spec) nums[e.spec] = N.text(e.s.key, e.s.sub, e.s.fmt);
      });
      Asc.scope.rdNums = nums;
      Asc.scope.rdMarks = !!showMarks;
      Asc.scope.rdStrip = strip;
      Asc.scope.rdBold = st.boldText;
      var inText = await command(applyText, true);

      /* the drawings */
      var pics = {};
      for (var d = 0; d < items.length; d++) {
        var it2 = items[d];
        status('Drawing ' + (d + 1) + ' of ' + items.length + '…');
        await run('set', { text: it2.ole.Data, format: 'json' });
        var map = {};
        it2.marks.forEach(function (m) { map[m.mark] = N.text(m.key, m.sub, m.format); });
        if (it2.marks.length) await run('showCompoundNumbers', showMarks ? { marks: true } : { numbers: map, bold: st.boldDraw, strip: strip });
        var data = (await run('export', { format: 'json' })).json,
          s1 = RD.sizeOf((await run('export', { format: 'svg' })).svg),
          pic = await run('picture', { scale: 3 }),
          px = RD.pngSize(pic.png),
          /* the picture grows or shrinks with the drawing (a mark is wider than its number), at the scale it had */
          kx = it2.s0 && s1 && it2.s0.w > 0 ? s1.w / it2.s0.w : 1,
          w = (it2.ole.Width || (s1 ? s1.w : 50)) * kx,
          h = (w * px.h) / px.w;
        if (final) {
          /* (sizes in EMU, 36000 to the mm) */
          pics[it2.fp] = { src: 'data:image/png;base64,' + pic.png, w: Math.round(w * 36000), h: Math.round(h * 36000) };
          continue;
        }
        await method('EditOleObject', [
          {
            guid: guid,
            objectId: it2.ole.InternalId,
            width: w,
            height: h,
            widthPix: Math.round(P.info.mmToPx * w),
            heightPix: Math.round(P.info.mmToPx * h),
            imgSrc: 'data:image/png;base64,' + pic.png,
            data: data
          }
        ]);
      }


      var nPics = 0;
      if (final) {
        status('Making the drawings pictures…');
        Asc.scope.rdPics = pics;
        Asc.scope.rdGuid = guid;
        nPics = +(await command(picturesFor, true)) || 0;
      }

      status(
        strip
          ? 'Done: ' + N.count() + ' compound(s), the numbers now plain text and the marks gone' +
              (final ? '; ' + nPics + ' drawing(s) made plain pictures.' : '; the drawings stay Reactio Draw drawings.') +
              ' Save it under a new name (File → Save as); Undo takes it back.'
          : showMarks
          ? 'Marks shown in ' + items.length + ' drawing(s) and ' + (inText || 0) + ' place(s) in the text. Number again to put the numbers back.'
          : N.count() + ' compound(s) numbered: ' + items.length + ' drawing(s), ' + (inText || 0) + ' place(s) in the text' +
              (secs.length > 1 ? ', ' + secs.length + ' parts (chapters).' : '.')
      );
      if (others.length)
        document.getElementById('status').textContent +=
          ' Other objects, not numbered (' + others.length + '): ' + others.slice(0, 4).join('; ') + (others.length > 4 ? '…' : '');
    } catch (e) {
      status('Could not number: ' + ((e && e.message) || e), true);
    } finally {
      busy = false;
    }
  }

  P.init = function () {
    RD.themeFromInfo();
    loadSettings();
    /* the document's own style and first number ([[#format …]], [[#start …]] before its first compound) shown in the
       boxes */
    readDocument()
      .then(function (seq) {
        var h = headSettings(seq);
        if (h.format) document.getElementById('fmt').value = h.format;
        if (h.start) document.getElementById('start').value = h.start;
      })
      .catch(function () {});
    /* the examples under Style fill it in */
    Array.prototype.forEach.call(document.querySelectorAll('.hint a[data-f]'), function (a) {
      a.addEventListener('click', function () {
        document.getElementById('fmt').value = a.getAttribute('data-f');
      });
    });
    try {
      P.resizeWindow(640, 440, 520, 340, 0, 0);
    } catch (e) {}
  };
  /* Remove marks and Final copy change the open document: the first press says so, a second one goes on */
  var armed = null,
    armedAt = 0;
  function confirmThen(mode, what) {
    if (armed === mode && Date.now() - armedAt < 15000) {
      armed = null;
      go(mode);
      return;
    }
    armed = mode;
    armedAt = Date.now();
    status(what + (mode === 'final' ? ' removes the marks and replaces the drawings with ordinary pictures,' : ' turns the numbers into plain text and removes the marks,') + ' in this document itself: save a copy first (File → Save as) if you want to keep them. Press ' + what + ' again to go on.', true);
  }
  P.button = function (id) {
    if (id === 0) go('number');
    else if (id === 1) go('marks');
    else if (id === 2) confirmThen('strip', 'Remove marks');
    else if (id === 3) confirmThen('final', 'Final copy');
    else P.executeCommand('close', '');
  };
})();
