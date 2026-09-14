/**
 * QuickTranslator - Universal OnlyOffice Plugin
 * Compatible with Document Editor (word), Spreadsheet Editor (cell), and Presentation Editor (slide).
 * Built with official window.Asc.plugin APIs.
 * Licensed under GNU General Public License v3.0.
 */

(function (window, undefined) {
  'use strict';

  var STORAGE_KEY_TARGET_LANG = 'quicktranslator_target_lang';
  var DEFAULT_TARGET_LANG = 'it';

  // DOM Elements cache
  var elements = {};
  var isTranslating = false;
  var isInitialized = false;
  var lastTranslatedSource = '';
  var lastTranslatedPair = '';
  var currentRequestId = 0;
  var currentAbortController = null;
  var selectionDebounceTimer = null;
  var positionQueryTimer = null;

  /**
   * Universal Text Cleaner & Markdown/Plain-Text Normalizer
   * Strips HTML tags, XML wrappers, nested table artifacts while preserving line breaks (\n).
   */
  function cleanAndNormalizeText(raw) {
    if (raw === null || raw === undefined) return '';

    var text = '';
    if (typeof raw === 'string') {
      text = raw;
    } else if (typeof raw === 'object') {
      if (typeof raw.text === 'string') text = raw.text;
      else if (typeof raw.Text === 'string') text = raw.Text;
      else if (typeof raw.data === 'string') text = raw.data;
      else if (typeof raw.value === 'string') text = raw.value;
      else if (typeof raw.content === 'string') text = raw.content;
      else if (Array.isArray(raw)) text = raw.join('\n');
      else {
        try {
          text = JSON.stringify(raw);
        } catch (e) {
          text = String(raw);
        }
      }
    } else {
      text = String(raw);
    }

    if (!text || text.trim().length === 0) return '';

    // Process HTML/XML elements (e.g. from rich table or list copy)
    if (/<[a-z][\s\S]*>/i.test(text)) {
      text = text
        .replace(/<\/(p|div|h[1-6]|tr|li|blockquote)>/gi, '\n')
        .replace(/<br\s*[\/]?>/gi, '\n')
        .replace(/<\/td>/gi, '  ')
        .replace(/<[^>]+>/g, '');
    }

    // Decode common HTML entities
    text = text
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&apos;/gi, "'");

    // Standardize line breaks
    text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    // Clean whitespace at line ends while preserving paragraph structure
    var lines = text.split('\n');
    var cleaned = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trimEnd();
      if (line.length > 0) {
        cleaned.push(line);
      } else if (cleaned.length > 0 && cleaned[cleaned.length - 1] !== '') {
        cleaned.push('');
      }
    }
    return cleaned.join('\n').trim();
  }

  function getElements() {
    return {
      sourceLangSelect: document.getElementById('sourceLangSelect'),
      targetLangSelect: document.getElementById('targetLangSelect'),
      swapBtn: document.getElementById('swapBtn'),
      translateBtn: document.getElementById('translateBtn'),
      translateBtnText: document.getElementById('translateBtnText'),
      btnSpinner: document.getElementById('btnSpinner'),
      sourceText: document.getElementById('sourceText'),
      targetText: document.getElementById('targetText'),
      sourceCharCount: document.getElementById('sourceCharCount'),
      clearSourceBtn: document.getElementById('clearSourceBtn'),
      syncSelectionBtn: document.getElementById('syncSelectionBtn'),
      copyTargetBtn: document.getElementById('copyTargetBtn'),
      insertBtn: document.getElementById('insertBtn'),
      statusBadge: document.getElementById('statusBadge'),
      errorAlert: document.getElementById('errorAlert')
    };
  }

  function initUI() {
    if (isInitialized) return true;
    elements = getElements();
    if (!elements.sourceText || !elements.targetLangSelect || !elements.sourceLangSelect) {
      return false;
    }
    isInitialized = true;

    // Load saved target language preference
    try {
      var saved = localStorage.getItem(STORAGE_KEY_TARGET_LANG);
      if (saved && elements.targetLangSelect.querySelector('option[value="' + saved + '"]')) {
        elements.targetLangSelect.value = saved;
      }
    } catch (e) {}

    bindEventListeners();
    return true;
  }

  function bindEventListeners() {
    // Target Language changed
    elements.targetLangSelect.addEventListener('change', function () {
      try {
        localStorage.setItem(STORAGE_KEY_TARGET_LANG, elements.targetLangSelect.value);
      } catch (e) {}
      if (elements.sourceText.value.trim().length > 0) {
        performTranslation(true);
      }
    });

    // Source Language changed
    elements.sourceLangSelect.addEventListener('change', function () {
      if (elements.sourceText.value.trim().length > 0) {
        performTranslation(true);
      }
    });

    // Swap Languages button
    elements.swapBtn.addEventListener('click', function () {
      var src = elements.sourceLangSelect.value;
      var tgt = elements.targetLangSelect.value;

      if (src === 'auto') {
        elements.sourceLangSelect.value = 'it';
        elements.targetLangSelect.value = 'da';
      } else {
        elements.sourceLangSelect.value = tgt;
        elements.targetLangSelect.value = src;
      }

      try {
        localStorage.setItem(STORAGE_KEY_TARGET_LANG, elements.targetLangSelect.value);
      } catch (e) {}

      if (elements.sourceText.value.trim().length > 0) {
        performTranslation(true);
      }
    });

    // Translate button click
    elements.translateBtn.addEventListener('click', function () {
      performTranslation(true);
    });

    // Manual Capture Selection button
    if (elements.syncSelectionBtn) {
      elements.syncSelectionBtn.addEventListener('click', function () {
        fetchSelectionFromEditor(true);
      });
    }

    // Source text typing with debounce
    var inputDebounceTimer = null;
    elements.sourceText.addEventListener('input', function () {
      updateCharCount();
      if (inputDebounceTimer) clearTimeout(inputDebounceTimer);
      inputDebounceTimer = setTimeout(function () {
        if (elements.sourceText.value.trim().length > 0) {
          performTranslation(false);
        }
      }, 400);
    });

    // Ctrl+Enter or Cmd+Enter to translate
    elements.sourceText.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        performTranslation(true);
      }
    });

    // Clear Source button
    elements.clearSourceBtn.addEventListener('click', function () {
      elements.sourceText.value = '';
      elements.targetText.value = '';
      lastTranslatedSource = '';
      lastTranslatedPair = '';
      updateCharCount();
      hideError();
      setStatus('ready', 'Ready');
    });

    // Copy Target button
    elements.copyTargetBtn.addEventListener('click', function () {
      var text = elements.targetText.value;
      if (!text) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          var original = elements.copyTargetBtn.textContent;
          elements.copyTargetBtn.textContent = 'Copied!';
          setTimeout(function () { elements.copyTargetBtn.textContent = original; }, 1500);
        });
      } else {
        elements.targetText.select();
        document.execCommand('copy');
      }
    });

    // Insert into Document button
    elements.insertBtn.addEventListener('click', handleInsertIntoDocument);
  }

  function updateCharCount() {
    if (!elements.sourceText || !elements.sourceCharCount) return;
    var len = elements.sourceText.value.length;
    elements.sourceCharCount.textContent = len + ' chars';
  }

  function setStatus(type, label) {
    if (!elements.statusBadge) return;
    elements.statusBadge.className = 'status-badge status-' + type;
    elements.statusBadge.textContent = label;
  }

  function showError(msg) {
    if (!elements.errorAlert) return;
    elements.errorAlert.textContent = msg;
    elements.errorAlert.style.display = 'block';
    setStatus('error', 'Error');
  }

  function hideError() {
    if (!elements.errorAlert) return;
    elements.errorAlert.style.display = 'none';
  }

  // Core Translation Method with Sequential Request ID & Abort Support
  function performTranslation(force) {
    if (!elements.sourceText) return;
    var text = cleanAndNormalizeText(elements.sourceText.value);
    if (!text) {
      elements.targetText.value = '';
      lastTranslatedSource = '';
      lastTranslatedPair = '';
      return;
    }

    var sourceLang = elements.sourceLangSelect.value;
    var targetLang = elements.targetLangSelect.value;
    var langPair = sourceLang + '->' + targetLang;

    // Prevent redundant requests if already translated
    if (!force && text === lastTranslatedSource && langPair === lastTranslatedPair && elements.targetText.value.trim().length > 0) {
      return;
    }

    if (sourceLang === targetLang && sourceLang !== 'auto') {
      elements.targetText.value = text;
      lastTranslatedSource = text;
      lastTranslatedPair = langPair;
      setStatus('ready', 'Identical');
      return;
    }

    // Assign new sequential request ID to discard any earlier in-flight responses
    var myReqId = ++currentRequestId;

    // Cancel previous in-flight fetch if running
    if (currentAbortController) {
      try { currentAbortController.abort(); } catch (e) {}
    }
    if (typeof AbortController !== 'undefined') {
      currentAbortController = new AbortController();
    }

    isTranslating = true;
    elements.translateBtn.disabled = true;
    if (elements.btnSpinner) elements.btnSpinner.style.display = 'inline-block';
    if (elements.translateBtnText) elements.translateBtnText.textContent = 'Translating...';
    setStatus('busy', 'Translating');
    hideError();

    var currentReqText = text;
    var currentReqPair = langPair;

    translateRequest(text, sourceLang, targetLang, currentAbortController ? currentAbortController.signal : null)
      .then(function (result) {
        if (myReqId !== currentRequestId) return; // Discard superseded result
        elements.targetText.value = result;
        lastTranslatedSource = currentReqText;
        lastTranslatedPair = currentReqPair;
        setStatus('ready', 'Translated');
      })
      .catch(function (err) {
        if (err && err.name === 'AbortError') return; // Deliberately superseded
        if (myReqId === currentRequestId) {
          console.error('QuickTranslator error:', err);
          showError('Translation failed. Please check network connection.');
        }
      })
      .finally(function () {
        if (myReqId === currentRequestId) {
          isTranslating = false;
          elements.translateBtn.disabled = false;
          if (elements.btnSpinner) elements.btnSpinner.style.display = 'none';
          if (elements.translateBtnText) elements.translateBtnText.textContent = 'Traduci (Translate)';

          // If text changed in the textarea while the request was in flight, translate newest content
          var latestText = cleanAndNormalizeText(elements.sourceText.value);
          if (latestText && latestText !== lastTranslatedSource) {
            performTranslation(false);
          }
        }
      });
  }

  // Multi-Engine Translation Service (Google Translate primary + MyMemory fallback)
  function translateRequest(text, sourceLang, targetLang, signal) {
    var src = sourceLang === 'auto' ? 'auto' : sourceLang;
    var tgt = targetLang;

    var googleUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + encodeURIComponent(src) + '&tl=' + encodeURIComponent(tgt) + '&dt=t&q=' + encodeURIComponent(text);

    var fetchOptions = signal ? { signal: signal } : {};

    return fetch(googleUrl, fetchOptions)
      .then(function (res) {
        if (!res.ok) throw new Error('Google Translate HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (data && Array.isArray(data[0])) {
          var translatedParts = data[0].map(function (segment) {
            return segment[0] || '';
          }).join('');

          if (translatedParts && translatedParts.trim().length > 0) {
            return translatedParts;
          }
        }
        throw new Error('Empty translation output');
      })
      .catch(function (err) {
        if (err && err.name === 'AbortError') throw err;

        // Fallback: MyMemory API
        var langPair = (src === 'auto' ? 'autodetect' : src) + '|' + tgt;
        var myMemoryUrl = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=' + encodeURIComponent(langPair);

        return fetch(myMemoryUrl, fetchOptions)
          .then(function (res) {
            if (!res.ok) throw new Error('MyMemory HTTP ' + res.status);
            return res.json();
          })
          .then(function (data) {
            if (data && data.responseData && data.responseData.translatedText) {
              var decoded = decodeHTMLEntities(data.responseData.translatedText);
              if (decoded) return decoded;
            }
            throw new Error('MyMemory fallback failed');
          });
      });
  }

  function decodeHTMLEntities(text) {
    var txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
  }

  // Insert translated text into OnlyOffice document
  function handleInsertIntoDocument() {
    var textToInsert = elements.targetText ? elements.targetText.value : '';
    if (!textToInsert) {
      showError('Please translate some text first.');
      return;
    }

    if (!window.Asc || !window.Asc.plugin || !window.Asc.plugin.executeMethod) {
      if (navigator.clipboard) navigator.clipboard.writeText(textToInsert);
      var span = elements.insertBtn.querySelector('span');
      if (span) {
        var orig = span.textContent;
        span.textContent = 'Copied to Clipboard!';
        setTimeout(function () { span.textContent = orig; }, 1800);
      }
      return;
    }

    try {
      window.Asc.plugin.executeMethod('PasteText', [textToInsert], function () {
        setStatus('ready', 'Inserted');
      });
    } catch (err) {
      try {
        window.Asc.plugin.info = window.Asc.plugin.info || {};
        window.Asc.plugin.info.text = textToInsert;
        window.Asc.plugin.callCommand(function () {
          var oDocument = Api.GetDocument();
          if (oDocument && oDocument.InsertTextAsString) {
            oDocument.InsertTextAsString(Asc.plugin.info.text);
          }
        }, false);
      } catch (e2) {}
    }
  }

  /**
   * Process selected text received from OnlyOffice.
   * Debounces selection changes (220ms) so that rapid multi-clicks
   * (e.g. double-click word -> triple-click entire sentence)
   * seamlessly resolve to the full sentence translation without race conditions.
   */
  function handleIncomingText(rawText, force) {
    if (rawText === null || rawText === undefined) return;
    var clean = cleanAndNormalizeText(rawText);
    if (!clean || clean.length === 0) return;

    initUI();
    if (!elements.sourceText) return;

    // Immediately display the newly selected sentence in the input box
    if (clean !== elements.sourceText.value.trim()) {
      elements.sourceText.value = clean;
      updateCharCount();
    }

    if (force) {
      if (selectionDebounceTimer) clearTimeout(selectionDebounceTimer);
      performTranslation(true);
    } else {
      if (selectionDebounceTimer) clearTimeout(selectionDebounceTimer);
      selectionDebounceTimer = setTimeout(function () {
        performTranslation(false);
      }, 220);
    }
  }

  /**
   * Ask ONLYOFFICE editor for current selection
   */
  function fetchSelectionFromEditor(force) {
    if (!window.Asc || !window.Asc.plugin || !window.Asc.plugin.executeMethod) return;

    try {
      window.Asc.plugin.executeMethod('GetSelectedText', [{ Numbering: false, Math: false }], function (sel) {
        if (sel) handleIncomingText(sel, force);
      });
    } catch (e) {
      try {
        window.Asc.plugin.executeMethod('GetSelectedText', [], function (sel) {
          if (sel) handleIncomingText(sel, force);
        });
      } catch (e2) {}
    }
  }

  /**
   * Handler for cursor position / target selection changes.
   * Performs an immediate query and a 90ms delayed check to capture
   * rapid multi-click selection expansions (e.g. triple-click).
   */
  function onPositionChanged() {
    fetchSelectionFromEditor(false);

    if (positionQueryTimer) {
      clearTimeout(positionQueryTimer);
    }
    positionQueryTimer = setTimeout(function () {
      fetchSelectionFromEditor(false);
    }, 90);
  }

  // ==========================================
  // ONLYOFFICE Asc.plugin LIFECYCLE
  // ==========================================

  window.Asc = window.Asc || {};
  window.Asc.plugin = window.Asc.plugin || {};

  /**
   * ONLYOFFICE Plugin Initialization
   * Called on open and automatically on selection change when initOnSelectionChanged: true.
   */
  window.Asc.plugin.init = function (data) {
    initUI();

    if (data) {
      handleIncomingText(data, false);
    } else {
      fetchSelectionFromEditor(false);
    }

    // Attach to ONLYOFFICE editor position events
    if (window.Asc.plugin.attachEditorEvent) {
      try {
        window.Asc.plugin.attachEditorEvent('onTargetPositionChanged', onPositionChanged);
      } catch (e1) {}
    }
    if (window.Asc.plugin.attachEvent) {
      try {
        window.Asc.plugin.attachEvent('onTargetPositionChanged', onPositionChanged);
      } catch (e2) {}
    }
  };

  /**
   * Selection / Cursor position changed event (ONLYOFFICE event hook)
   */
  window.Asc.plugin.event_onTargetPositionChanged = onPositionChanged;
  window.Asc.plugin.onTargetPositionChanged = onPositionChanged;

  /**
   * Modal / Panel button handler
   */
  window.Asc.plugin.button = function (id) {
    this.executeCommand('close', '');
  };

  // Standalone / preview DOM readiness
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUI);
  } else {
    initUI();
  }

})(window);
