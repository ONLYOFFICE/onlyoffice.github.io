/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
   If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* The plugin's part that runs in the background, from the start of the editor: ONLYOFFICE runs one part of a plugin at
   a time, so everything starts here, and the windows open from here.
   - Insert tab: the Reactio Draw button (draw; its menu: Number compounds in the Document editor) and Paste Reactio.
   - Right-click menu: Paste Reactio drawing; on a drawing of this plugin also Edit Reactio drawing.
   - Keys: Alt+Shift+V (Control+Shift+V on a Mac) pastes. ONLYOFFICE tells this part of the keys pressed in the
     document; it looks only for these, keeps nothing, and has no network.
   - A double-click on a drawing: ONLYOFFICE gives its data here (init), and the editor's window opens with it.
   The windows: index.html (the editor), number.html (Number compounds), paste.html (Paste). Their buttons come here and
   are handed on (winmode.js); what they insert or change in the document goes through here too. */
(function () {
  'use strict';

  var P = window.Asc.plugin,
    MAC = /Mac/i.test(navigator.platform || navigator.userAgent || ''),
    started = false,
    win = null,
    winKind = '',
    winTimer = 0,
    lastCall = 0;

  function ru() {
    return /^ru/i.test(String((P.info && P.info.lang) || navigator.language || ''));
  }
  function t(en, r) {
    return ru() ? r : en;
  }

  /* the editor answers each method in turn, and the next call waits for that answer: an answer that never comes would
     hold every call after it, so a wait of more than a while is given up (calls of the windows come through here too) */
  var WAIT = 10000;
  function unstick() {
    if (P.isWaitMethod === true) {
      P.isWaitMethod = false;
      P.methodCallback = null;
      P.executeMethodStack = [];
    }
  }
  function guardMethods() {
    if (P.__rdGuard || typeof P.executeMethod !== 'function') return;
    var orig = P.executeMethod;
    P.executeMethod = function (name, args, cb) {
      var now = Date.now();
      if (P.isWaitMethod === true && now - lastCall > WAIT) unstick();
      if (P.isWaitMethod !== true) lastCall = now;
      return orig.call(P, name, args, cb);
    };
    P.__rdGuard = true;
  }

  /* ---------- the windows ---------- */
  function closeWindow(force) {
    clearTimeout(winTimer);
    if (!win) return;
    var w = win;
    win = null;
    winKind = '';
    if (force === true) unstick();
    P.executeMethod('CloseWindow', [w.id]);
    try {
      w._unregister();
    } catch (e) {}
  }

  var KINDS = {
    draw: function () {
      return {
        url: 'index.html',
        description: 'Reactio Draw',
        buttons: [
          { text: 'OK', primary: true },
          { text: t('Cancel', 'Отмена'), primary: false }
        ],
        size: [1400, 900]
      };
    },
    number: function () {
      return {
        url: 'number.html',
        description: t('Number compounds', 'Нумерация соединений'),
        buttons: [
          { text: t('Number', 'Пронумеровать'), primary: true },
          { text: t('Show marks', 'Показать метки'), primary: false },
          { text: t('Remove marks', 'Убрать метки'), primary: false },
          { text: t('Final copy', 'Чистовик'), primary: false },
          { text: t('Close', 'Закрыть'), primary: false }
        ],
        size: [640, 440]
      };
    },
    paste: function () {
      return {
        url: 'paste.html',
        description: t('Paste Reactio drawing', 'Вставить рисунок Reactio'),
        buttons: [{ text: t('Cancel', 'Отмена'), primary: false }],
        size: [460, 170]
      };
    }
  };

  /* open: the drawing's data and objectId for the editor (a double-click, Edit), else nothing */
  function openWindow(kind, open) {
    if (typeof window.Asc.PluginWindow !== 'function') return;
    if (win) {
      /* one at a time: the open one comes to the front */
      try {
        win.activate();
      } catch (e) {}
      return;
    }
    var v = KINDS[kind]();
    v.isVisual = true;
    v.isModal = true;
    v.EditorsSupport = kind === 'number' ? ['word'] : ['word', 'cell', 'slide'];
    win = new window.Asc.PluginWindow();
    winKind = kind;
    var w = win;
    w.attachEvent('onWindowMessage', function (m) {
      if (w !== win || !m) return;
      if (m.type === 'ready') w.command('rd:open', open || { data: '' });
      else if (m.type === 'resize') {
        var n = function (a) {
          return [Math.max(0, Math.min(100000, +(a && a[0]) || 0)), Math.max(0, Math.min(100000, +(a && a[1]) || 0))];
        };
        P.executeMethod('ResizeWindow', [w.id, n(m.size), n(m.min), n(m.max)]);
      }
      else if (m.type === 'insert' && m.parts) insert(m.parts);
      else closeWindow();
    });
    w.show(v);
  }

  /* Paste's drawing into the document, and its window closed (also when the editor does not answer) */
  function insert(parts) {
    window.ReactioInsert.params(parts)
      .then(function (param) {
        P.executeMethod('AddOleObject', [param], function () {
          closeWindow();
        });
        winTimer = setTimeout(function () {
          closeWindow(true);
        }, 2500);
      })
      .catch(function () {
        closeWindow();
      });
  }

  P.button = function (id, windowId) {
    if (win && windowId === win.id) {
      /* the window's close box and Paste's Cancel close it; the others are the window's to handle */
      if (id === -1 || winKind === 'paste') closeWindow();
      else win.command('rd:button', id);
    } else if (windowId) P.executeMethod('CloseWindow', [windowId]);
  };

  /* ---------- the toolbar, the menu, the keys ---------- */
  function toolbar() {
    var word = P.info && P.info.editorType === 'word',
      draw = {
        id: 'rdDraw',
        type: 'big-button',
        text: 'Reactio Draw',
        hint: t('Draw a structure or a reaction', 'Нарисовать структуру или реакцию'),
        icons: 'resources/img/icon%scale%(default).png',
        lockInViewMode: true
      };
    if (word) {
      draw.split = true;
      draw.items = [
        { id: 'rdDraw', text: t('Draw…', 'Нарисовать…') },
        { id: 'rdNumber', text: t('Number compounds…', 'Нумерация соединений…') }
      ];
    }
    P.executeMethod('AddToolbarMenuItem', [
      {
        guid: P.guid,
        tabs: [
          {
            id: 'ins',
            text: t('Insert', 'Вставка'),
            items: [
              draw,
              {
                id: 'rdPaste',
                type: 'big-button',
                text: t('Paste Reactio', 'Вставить Reactio'),
                hint: t('Paste a drawing copied in Reactio Draw', 'Вставить рисунок, скопированный в Reactio Draw') +
                  (MAC ? ' (⌃⇧V)' : ' (Alt+Shift+V)'),
                icons: 'resources/img/paste%scale%(default).png',
                lockInViewMode: true
              }
            ]
          }
        ]
      }
    ]);
  }

  function ours(id) {
    return String(id || '').split('_oo_sep_')[0];
  }
  function act(id) {
    id = ours(id);
    if (id === 'rdDraw') openWindow('draw');
    else if (id === 'rdNumber') openWindow('number');
    else if (id === 'rdPaste') openWindow('paste');
    else if (id === 'rdEdit') editSelected();
  }
  P.event_onToolbarMenuClick = act;
  P.event_onContextMenuClick = act;

  function editSelected() {
    P.executeMethod('GetSelectedOleObjects', [], function (objects) {
      var o = objects && objects[0];
      if (!o || o.guid !== P.guid) return;
      openWindow('draw', { data: o.data || '', objectId: o.objectId });
    });
  }

  /* the right-click menu: answered every time it opens (ONLYOFFICE waits for each plugin's answer) */
  P.event_onContextMenuShow = function (options) {
    var items = [];
    if (options && options.type === 'OleObject' && options.guid === P.guid)
      items.push({ id: 'rdEdit', text: t('Edit Reactio drawing', 'Изменить рисунок Reactio') });
    items.push({ id: 'rdPaste', text: t('Paste Reactio drawing', 'Вставить рисунок Reactio') });
    P.executeMethod('AddContextMenuItem', [{ guid: P.guid, items: items }]);
  };

  /* Alt+Shift+V; on a Mac Control+Shift+V (Option there types a character, Command+Shift+V pastes as text) */
  P.event_onKeyDown = function (e) {
    if (!e || !(e.keyCode === 86 || e.code === 'KeyV')) return;
    var hit = MAC
      ? e.ctrlKey && e.shiftKey && !e.metaKey && !e.altKey
      : e.altKey && e.shiftKey && !e.ctrlKey && !e.metaKey;
    if (hit) openWindow('paste');
  };

  /* the start, and each double-click on a drawing of this plugin (its data and objectId come with it) */
  P.init = function (data) {
    guardMethods();
    var id = P.info && P.info.objectId;
    if (P.info) delete P.info.objectId;
    if (!started) {
      started = true;
      toolbar();
    }
    if (id !== undefined && id !== null && id !== '') openWindow('draw', { data: data || '', objectId: id });
  };
})();
