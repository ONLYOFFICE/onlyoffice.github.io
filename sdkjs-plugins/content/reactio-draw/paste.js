/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
   If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* Plugins → Reactio Draw ⌄ → Paste Reactio drawing: the clipboard's text (what Reactio Draw copies: CDXML; also
   SMILES, a Molfile, a Reactio Draw document) is read by Reactio Draw out of sight, and the drawing goes into the
   document as the plugin's object, editable by double-click; the window then closes.
   The clipboard is read only here, when the user asked for it; what is in it is someone's data, read as a file is. */
(function () {
  'use strict';

  var P = window.Asc.plugin,
    RD = window.ReactioBridge,
    MAX = 20 * 1024 * 1024,
    MAC = /Mac/i.test(navigator.platform || navigator.userAgent || ''),
    RU = /^ru/i.test(navigator.language || ''),
    busy = false,
    done = false;

  function t(en, ru) {
    return RU ? ru : en;
  }
  function say(text, err, hint) {
    var s = document.getElementById('say');
    s.textContent = text;
    s.className = err ? 'err' : '';
    document.getElementById('hint').textContent = hint || '';
  }
  var closed = false;
  function close() {
    done = true;
    if (closed) return;
    closed = true;
    if (P.windowID) {
      P.sendToPlugin('onWindowMessage', { type: 'cancel' });
      return;
    }
    P.executeCommand('close', '');
  }
  function insert(parts) {
    done = true;
    if (P.windowID) {
      P.sendToPlugin('onWindowMessage', { type: 'insert', parts: parts });
      return;
    }
    window.ReactioInsert.params(parts)
      .then(function (param) {
        P.executeMethod('AddOleObject', [param], close);
        /* and closed even if the editor does not answer */
        setTimeout(close, 2500);
      })
      .catch(function () {
        done = false;
        busy = false;
        say(t('The drawing could not be inserted.', 'Не удалось вставить рисунок.'), true);
      });
  }
  function askForKeys() {
    say(
      t('Press ' + (MAC ? 'Cmd+V' : 'Ctrl+V') + ' to paste the drawing.', 'Нажмите ' + (MAC ? 'Cmd+V' : 'Ctrl+V') + ', чтобы вставить рисунок.'),
      false,
      t('Copy it in Reactio Draw first (' + (MAC ? 'Cmd+C' : 'Ctrl+C') + '), then come back here.', 'Сначала скопируйте его в Reactio Draw (' + (MAC ? 'Cmd+C' : 'Ctrl+C') + ').')
    );
  }

  function handle(text) {
    if (busy || done) return;
    text = String(text || '');
    if (!text.trim()) return say(t('The clipboard holds no drawing.', 'В буфере обмена нет рисунка.'), true, t('Copy one in Reactio Draw and try again.', 'Скопируйте его в Reactio Draw и попробуйте снова.'));
    if (text.length > MAX) return say(t('What is in the clipboard is too large to be a drawing.', 'В буфере обмена слишком много для рисунка.'), true);
    busy = true;
    say(t('Pasting the drawing…', 'Вставляю рисунок…'));
    RD.run('set', { text: text })
      .then(function () {
        return window.ReactioInsert.parts(RD.run);
      })
      .then(function (parts) {
        insert(parts);
      })
      .catch(function (e) {
        busy = false;
        if (e && e.missing) return say(e.message, true);
        say(
          /sheet is empty/i.test(e.message)
            ? t('The clipboard holds no drawing.', 'В буфере обмена нет рисунка.')
            : t('The clipboard holds no drawing Reactio Draw can read.', 'В буфере обмена нет рисунка, который Reactio Draw может прочитать.'),
          true,
          t('Copy it in Reactio Draw and try again.', 'Скопируйте его в Reactio Draw и попробуйте снова.')
        );
      });
  }

  /* the user's own paste in this window: always allowed */
  document.addEventListener('paste', function (e) {
    e.preventDefault();
    handle(e.clipboardData ? e.clipboardData.getData('text/plain') : '');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  P.init = function () {
    try {
      window.focus();
    } catch (e) {}
    /* reading it straight away, where the editor allows it; else the user's Ctrl+V here */
    if (navigator.clipboard && typeof navigator.clipboard.readText === 'function')
      navigator.clipboard.readText().then(handle, askForKeys);
    else askForKeys();
  };
  P.button = function () {
    close();
  };
})();
