/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
   If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* A drawing as ONLYOFFICE's object: its parts from Reactio Draw (the document, a PNG at 3x, its size), and the
   parameters of AddOleObject / EditOleObject (the size in mm, made smaller to fit the page) */
(function () {
  'use strict';

  /* the widest a drawing may be, in mm: the text width of the page (Document), most of the slide (Presentation);
     0 for no limit (Spreadsheet, or when the editor does not say) */
  function maxWidth() {
    return new Promise(function (resolve) {
      var P = window.Asc.plugin,
        t = P.info && P.info.editorType,
        done = false,
        end = function (v) {
          if (done) return;
          done = true;
          v = +v;
          resolve(isFinite(v) && v > 20 ? v : 0);
        };
      if ((t !== 'word' && t !== 'slide') || typeof P.callCommand !== 'function') return end(0);
      setTimeout(function () { end(0); }, 2000);
      try {
        P.callCommand(
          t === 'word'
            ? function () {
                var s = Api.GetDocument().GetFinalSection();
                return (s.GetPageWidth() - s.GetPageMarginLeft() - s.GetPageMarginRight()) / 56.6929;
              }
            : function () {
                return (Api.GetPresentation().GetWidth() / 36000) * 0.9;
              },
          false,
          false,
          end
        );
      } catch (e) {
        end(0);
      }
    });
  }

  /* the drawing in Reactio Draw (run: ReactioBridge.run): its document, its picture and its size in mm */
  function parts(run) {
    var RD = window.ReactioBridge,
      doc,
      svg;
    return run('export', { format: 'json' })
      .then(function (r) {
        doc = r.json;
        return run('export', { format: 'svg' });
      })
      .then(function (r) {
        svg = r.svg;
        return run('picture', { scale: 3 });
      })
      .then(function (pic) {
        var px = RD.pngSize(pic.png),
          mm = RD.sizeOf(svg) || { w: ((px.w / 3) * 25.4) / 96, h: 0 };
        /* the height from the picture's proportions, so it is never stretched */
        mm.h = (mm.w * px.h) / px.w;
        return { doc: doc, png: pic.png, w: mm.w, h: mm.h };
      });
  }

  /* what AddOleObject (objectId undefined) or EditOleObject takes for these parts */
  function params(p, objectId, resize) {
    var info = window.Asc.plugin.info;
    /* only a PNG (base64) and a text of a sane size go into the document */
    if (!p || typeof p.png !== 'string' || !/^[A-Za-z0-9+\/]+=*$/.test(p.png) || typeof p.doc !== 'string' ||
        p.png.length > 60e6 || p.doc.length > 60e6 || !(p.w > 0) || !(p.h > 0))
      return Promise.reject(new Error('not a drawing'));
    return maxWidth().then(function (mw) {
      var w = p.w,
        h = p.h;
      /* wider than the page: made smaller to fit it, as a picture is */
      if (mw && w > mw) {
        h = (h * mw) / w;
        w = mw;
      }
      return {
        guid: info.guid,
        widthPix: Math.round(info.mmToPx * w),
        heightPix: Math.round(info.mmToPx * h),
        width: w,
        height: h,
        imgSrc: 'data:image/png;base64,' + p.png,
        data: p.doc,
        objectId: objectId,
        resize: resize
      };
    });
  }

  window.ReactioInsert = { maxWidth: maxWidth, parts: parts, params: params };
})();
