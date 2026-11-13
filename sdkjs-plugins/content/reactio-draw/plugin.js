/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
   If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* Reactio Draw in ONLYOFFICE: the editor runs in the iframe (reactio/index.html?embed) and is driven through its
   embedding messages (EMBEDDING.md). The drawing goes into the document as an OLE object: a PNG picture plus the
   Reactio document as its data, so a double-click opens it here again for editing. */
(function () {
  'use strict';

  var RD = window.ReactioBridge,
    run = RD.run,
    show = RD.show,
    RI = window.ReactioInsert,
    busy = false;

  var closed = false;
  function close() {
    if (closed) return;
    closed = true;
    window.Asc.plugin.executeCommand('close', '');
  }

  function save() {
    if (busy) return;
    busy = true;
    var info = window.Asc.plugin.info;
    RI.parts(run)
      .then(function (p) {
        return RI.params(p, info.objectId, info.resize);
      })
      .then(function (param) {
        window.Asc.plugin.executeMethod(info.objectId === undefined ? 'AddOleObject' : 'EditOleObject', [param], close);
        /* closed even if the editor does not answer */
        setTimeout(close, 4000);
      })
      .catch(function (e) {
        busy = false;
        /* nothing drawn: nothing to put in the document */
        if (/sheet is empty/i.test(e.message)) return close();
        show('Could not insert the drawing: ' + e.message);
      });
  }


  /* the window's size: the one it had last time, else as large as the screen allows. Giving ONLYOFFICE a minimum and
     no maximum (0) also makes the window resizable by its edges; the size the user gives it is remembered.
     A double-click on the window's title: as large as the editor's window, and again back to the size before. */
  var KEY = 'reactio-onlyoffice-size',
    MIN_W = 800,
    MIN_H = 560,
    BIG = 100000,
    ownUntil = 0;

  function remembered() {
    try {
      var z = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (z && z.w >= MIN_W && z.h >= MIN_H) return z;
    } catch (e) {}
    return null;
  }
  function remember(z) {
    try {
      localStorage.setItem(KEY, JSON.stringify(z));
    } catch (e) {}
  }
  /* a size given here, not by the user: the resize it brings is not remembered as the user's */
  function resizeTo(w, h) {
    ownUntil = Date.now() + 800;
    window.Asc.plugin.resizeWindow(Math.round(w), Math.round(h), MIN_W, MIN_H, 0, 0);
  }

  function toggleBig() {
    var z = remembered();
    if (z && z.max) {
      remember({ w: z.w, h: z.h });
      resizeTo(z.w, z.h);
    } else {
      remember({ w: window.innerWidth, h: window.innerHeight, max: true });
      /* ONLYOFFICE keeps the window inside its own: as large as that */
      resizeTo(BIG, BIG);
    }
  }

  /* the title bar is ONLYOFFICE's, round this page: reachable when the two pages may see each other */
  function titleDoubleClick() {
    try {
      var fe = window.frameElement,
        win = fe && fe.closest && fe.closest('.asc-window');
      var head = win && win.querySelector('.header');
      if (!head || head.__rdBig) return;
      head.__rdBig = true;
      head.title = 'Double-click: whole window / back';
      head.addEventListener('dblclick', function (e) {
        if (e.target && e.target.closest && e.target.closest('.tool, .close, button')) return;
        toggleBig();
      });
    } catch (e) {}
  }

  function sizeWindow() {
    if (typeof window.Asc.plugin.resizeWindow !== 'function') return;
    var sw = (window.screen && window.screen.availWidth) || 1400,
      sh = (window.screen && window.screen.availHeight) || 900,
      z = remembered();
    try {
      if (z && z.max) resizeTo(BIG, BIG);
      else if (z) resizeTo(z.w, z.h);
      else resizeTo(Math.max(MIN_W, Math.min(sw - 60, 2400)), Math.max(MIN_H, Math.min(sh - 140, 1600)));
    } catch (e) {
      return;
    }
    titleDoubleClick();
    /* remembered when the user changes it (by the window's edges) */
    var t = 0;
    setTimeout(function () {
      window.addEventListener('resize', function () {
        clearTimeout(t);
        t = setTimeout(function () {
          if (Date.now() < ownUntil) return;
          var w = window.innerWidth,
            h = window.innerHeight;
          if (w >= MIN_W && h >= MIN_H) remember({ w: w, h: h });
        }, 400);
      });
    }, 1000);
  }

  window.Asc.plugin.init = function (data) {
    RD.themeFromInfo();
    sizeWindow();
    /* a drawing opened by double-click: its Reactio document */
    if (data && String(data).length > 60e6) return show('This drawing is too large to open.');
    if (data)
      run('set', { text: String(data), format: 'json' }).catch(function (e) {
        show('Could not open this drawing: ' + e.message);
      });
  };

  window.Asc.plugin.button = function (id) {
    if (id === 0) save();
    else close();
  };
})();
