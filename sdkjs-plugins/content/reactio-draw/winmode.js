/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
   If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* A page of this plugin (index.html, number.html) shown as a window of its background part (background.js). There
   ONLYOFFICE gives the window's buttons to the background part, and a window may not close or size itself; so here:
   the buttons come back from there (rd:button), the page's start waits for what to open (rd:open: a drawing's data
   and objectId), and closing and sizing are asked of the background part. Its calls of the editor (executeMethod,
   callCommand) go through the background part by themselves (plugins.js). Loaded after the page's own script. */
(function () {
  'use strict';

  var P = window.Asc && window.Asc.plugin;
  if (!P || !/[?&]windowID=/.test(location.search)) return;

  var pageInit = P.init,
    opened = false;

  function tell(m) {
    P.sendToPlugin('onWindowMessage', m);
  }

  P.init = function () {
    /* set by plugins.js just before init: replaced for the window */
    P.executeCommand = function (type) {
      if (type === 'close') tell({ type: 'close' });
    };
    P.resizeWindow = function (w, h, minW, minH, maxW, maxH) {
      tell({ type: 'resize', size: [w, h], min: [minW || 0, minH || 0], max: [maxW || 0, maxH || 0] });
    };
    P.attachEvent('rd:button', function (id) {
      if (typeof P.button === 'function') P.button(id);
    });
    P.attachEvent('rd:open', function (m) {
      if (opened) return;
      opened = true;
      m = m || {};
      if (m.objectId !== undefined && m.objectId !== null && m.objectId !== '') P.info.objectId = m.objectId;
      else delete P.info.objectId;
      if (typeof pageInit === 'function') pageInit.call(P, m.data || '');
    });
    tell({ type: 'ready' });
  };
})();
