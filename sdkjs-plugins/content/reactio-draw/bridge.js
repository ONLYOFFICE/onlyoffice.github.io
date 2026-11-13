/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
   If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* Reactio Draw in the page's iframe (#rd, reactio/index.html?embed), driven through its embedding messages
   (EMBEDDING.md in Reactio Draw): ReactioBridge.run(op, args) answers what ReactioAPI.run answers. */
(function () {
  'use strict';

  var frame = null,
    seq = 0,
    /* answers go only to a page of this plugin's own origin (a file:// page's origin is "null": then '*') */
    TARGET = location.origin && location.origin !== 'null' ? location.origin : '*',
    pending = {},
    readyResolve,
    readyReject,
    ready = new Promise(function (r, j) {
      readyResolve = r;
      readyReject = j;
    });
  ready.catch(function () {});

  function show(text) {
    var m = document.getElementById('msg');
    if (!m) return;
    m.textContent = text || '';
    m.style.display = text ? 'block' : 'none';
  }

  /* answers and events from the editor */
  window.addEventListener('message', function (e) {
    if (!frame || e.source !== frame.contentWindow) return;
    var d = e.data;
    if (!d || typeof d !== 'object' || d.reactio !== 1) return;
    if (d.event === 'ready') readyResolve();
    else if (d.id != null && pending[d.id]) {
      var p = pending[d.id];
      delete pending[d.id];
      if (d.ok) p.resolve(d.result);
      else p.reject(new Error(d.error || 'Reactio Draw error'));
    }
  });

  /* one command of the editor's API */
  function run(op, args) {
    return ready.then(function () {
      return new Promise(function (resolve, reject) {
        var id = ++seq;
        pending[id] = { resolve: resolve, reject: reject };
        frame.contentWindow.postMessage({ reactio: 1, id: id, op: op, args: args || {} }, TARGET);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    frame = document.getElementById('rd');
    /* the plugin's own copy; a page may say where else it is (window.ReactioWhere: a promise of the folder) */
    Promise.resolve(typeof window.ReactioWhere === 'function' ? window.ReactioWhere() : '').then(
      function (dir) {
        frame.src = (dir || '') + 'reactio/index.html?embed';
      },
      function (e) {
        var err = new Error((e && e.message) || 'Reactio Draw was not found.');
        err.missing = true;
        show(err.message);
        readyReject(err);
      }
    );
  });

  /* the size of the drawing in mm: its SVG says it in pt (the style's sizes) or in px (96 per inch) */
  function sizeOf(svg) {
    var head = String(svg || '').slice(0, 2000),
      w = /\bwidth="([\d.]+)(pt|px)?"/.exec(head),
      h = /\bheight="([\d.]+)(pt|px)?"/.exec(head);
    if (!w || !h) return null;
    var k = function (u) { return u === 'pt' ? 25.4 / 72 : 25.4 / 96; };
    return { w: +w[1] * k(w[2]), h: +h[1] * k(h[2]) };
  }

  /* width and height of a PNG from its header */
  function pngSize(b64) {
    var s = atob(b64.slice(0, 64)),
      n = function (i) {
        return ((s.charCodeAt(i) << 24) | (s.charCodeAt(i + 1) << 16) | (s.charCodeAt(i + 2) << 8) | s.charCodeAt(i + 3)) >>> 0;
      };
    return { w: n(16), h: n(20) };
  }

  /* ONLYOFFICE's theme: this page takes its colours, and Reactio Draw its light or dark look (its sheet stays the
     colour of the page, white as a document's is) */
  var dark = null;
  function applyTheme(theme) {
    if (!theme) return;
    var d = /dark/i.test(String(theme.type || theme.name || '')),
      root = document.documentElement,
      set = function (k, v) {
        if (v) root.style.setProperty(k, v);
      };
    root.setAttribute('data-theme', d ? 'dark' : 'light');
    set('--bg', theme['background-normal']);
    set('--fg', theme['text-normal']);
    set('--muted', theme['text-secondary']);
    set('--border', theme['border-regular-control']);
    set('--field', theme['background-normal']);
    /* Reactio Draw's look for it: ONLYOFFICE's dark themes are grey, so Gray; its Contrast Dark, Dark; the light ones,
       Light. (A theme chosen in Reactio Draw's Settings → Theme wins and is remembered) */
    var name = String(theme.name || theme.id || '') + ' ' + String(theme.type || ''),
      look = !d ? 'light' : /contrast/i.test(name) ? 'dark' : 'gray';
    if (dark === look) return;
    dark = look;
    run('uiTheme', { theme: look }).catch(function () {});
  }
  var P = window.Asc && window.Asc.plugin;
  if (P) {
    var base = P.onThemeChanged;
    P.onThemeChanged = function (theme) {
      try {
        if (typeof P.onThemeChangedBase === 'function') P.onThemeChangedBase(theme);
        else if (typeof base === 'function') base.call(P, theme);
      } catch (e) {}
      applyTheme(theme);
    };
  }

  window.ReactioBridge = {
    run: run,
    show: show,
    sizeOf: sizeOf,
    pngSize: pngSize,
    /* the theme the editor said at the start (some editors give it in info, others only through onThemeChanged) */
    themeFromInfo: function () {
      try {
        if (P && P.info && P.info.theme) applyTheme(P.info.theme);
      } catch (e) {}
    }
  };
})();
