
// Max characters shown in preview snippet
var PREVIEW_LIMIT = 28; 

// Text separators used by ONLYOFFICE API
var PARA_SEP = '\r';
var LINE_SEP = '\n';
var TAB_SYMBOL = '\t';

// Options for GetSelectedText API method
var SELECTION_PROPS = {
    Numbering: false,
    Math: false,
    ParaSeparator: PARA_SEP,
    TableRowSeparator: PARA_SEP,
    TableCellSeparator: PARA_SEP,
    NewLineSeparator: LINE_SEP,
    TabSymbol: TAB_SYMBOL
};

// Actions for conversion
var ACTIONS = {
    cyrToLat: {
        label: 'Cyrillic → Latin',
        convert: function (text) {
            return cyrlatconverter.toLatin(text);
        }
    },
    latToCyr: {
        label: 'Latin → Cyrillic',
        convert: function (text, options) {
            return cyrlatconverter.toCyrillic(text, options);
        }
    },
    autoSwap: {
        label: 'Automatic swap',
        convert: function (text, options) {
            return cyrlatconverter.autoConvert(text, options);
        }
    }
};

// Context menu order
var MENU_ORDER = ['cyrToLat', 'latToCyr', 'autoSwap'];  
var lastSelectedText = '';
var dictionaryLoaded = false;
var dictionaryState = 'loading';
var pendingActionId = null;

// Load Serbian dictionary (~264k words) for foreign word detection.
// Words not in dictionary are considered foreign and kept in Latin.
// dictionaryLoaded gates Latin → Cyrillic while "keep foreign words" is on.
(function loadDict() {
    if (typeof cyrlatconverter === 'undefined' || !cyrlatconverter.loadDictionary) {
        settleDictionary(false);
        return;
    }
    if (cyrlatconverter.isDictionaryLoaded && cyrlatconverter.isDictionaryLoaded()) {
        settleDictionary(true);
        return;
    }
    cyrlatconverter.loadDictionary('resources/dict/sr-Latn.dic', function (err, success) {
        settleDictionary(!!success);
    });
})();

// Settle dictionary state and refresh detection
function settleDictionary(success) {
    dictionaryLoaded = !!success;
    dictionaryState = success ? 'ready' : 'failed';
    var pending = pendingActionId;
    pendingActionId = null;
    refreshDetection();
    if (!pending) return;
    if (dictionaryLoaded) {
        action(pending);
        return;
    }
    showToast(tr('The word list could not be loaded.'), true, 4000);
}

// Latin → Cyrillic with foreign-word protection needs the word list.
// Cyrillic → Latin does not. With the option off, conversion does not wait.
function dictionaryBlocks(actionId, text, options) {
    if (dictionaryState === 'ready' && dictionaryLoaded) return false;
    if (!options || !options.keepForeign) return false;
    if (actionId === 'cyrToLat') return false;
    if (actionId === 'latToCyr') return true;
    var parts = String(text || '').split(PARA_SEP);
    for (var i = 0; i < parts.length; i++) {
        if (cyrlatconverter.detectScript(parts[i]) === 'latin') return true;
    }
    return false;
}

// Called when plugin initializes or selection changes (initOnSelectionChanged)
window.Asc.plugin.init = function (text) {
    if (typeof text === 'string' && text.trim()) {
        updateDetection(text);
        return;
    }
    refreshDetection();
};

// Handle theme changes (light/dark mode)
window.Asc.plugin.onThemeChanged = function (theme) {
    if (window.Asc.plugin.onThemeChangedBase) {
        window.Asc.plugin.onThemeChangedBase(theme);
    }

    var isDark = !!(theme && (theme.type === 'dark' || theme.type === 'contrast-dark'));
    document.documentElement.classList.toggle('theme-dark', isDark);
    document.body.classList.toggle('theme-dark', isDark);
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
};

// Build context menu with conversion options
Asc.plugin.attachEvent('onContextMenuShow', function () {
    var items = MENU_ORDER.map(function (id) {
        return { id: id, text: tr(ACTIONS[id].label) };
    });

    window.Asc.plugin.executeMethod('UpdateContextMenuItem', [{
        guid: window.Asc.plugin.guid,
        items: [{
            id: 'srConverter',
            text: tr('Serbian converter'),
            items: items
        }]
    }]);
});

// Handle context menu item click
window.Asc.plugin.event_onContextMenuClick = function (id) {
    action(id);
};

// Refresh detection when cursor moves
window.Asc.plugin.event_onTargetPositionChanged = function () {
    refreshDetection();
};

// Check if the current editor is a cell editor
function isCellEditor() {
    var info = window.Asc.plugin && window.Asc.plugin.info;
    return !!(info && info.editorType === 'cell');
}

// Token for detecting changes in the selection
var detectionToken = 0;

// Fetch current selection from document and update UI
function refreshDetection() {
    if (!window.Asc.plugin.executeMethod) {
        updateDetection(lastSelectedText);
        return;
    }

    // In a spreadsheet the panel steals focus, so the text highlight inside a
    // cell disappears. The selected cells themselves are still available.
    if (isCellEditor()) {
        var token = ++detectionToken;
        readActiveCellText(function (text) {
            if (token !== detectionToken) return;
            updateDetection(text || '');
        });
        return;
    }

    window.Asc.plugin.executeMethod('GetSelectedText', [SELECTION_PROPS], function (selectedText) {
        updateDetection(selectedText || '');
    });
}

// Truncate text for preview display
function previewSnippet(text) {
    var compact = String(text || '').replace(/\s+/g, ' ').trim();
    if (compact.length <= PREVIEW_LIMIT) return compact;
    return compact.slice(0, PREVIEW_LIMIT - 1) + '…';
}

// Detect script type (Cyrillic/Latin) and update panel UI
function updateDetection(text) {
    lastSelectedText = text || '';

    var scriptEl = document.getElementById('detectScript');
    var preview = document.getElementById('detectPreview');
    var fromEl = document.getElementById('previewFrom');
    var toEl = document.getElementById('previewTo');
    var primary = document.getElementById('btnPrimary');
    if (!scriptEl || !primary) return;

    var trimmed = lastSelectedText.trim();
    updateDictionaryNotice();

    // No selection - reset UI
    if (!trimmed) {
        scriptEl.textContent = tr('No text selected');
        if (preview) preview.hidden = true;
        if (fromEl) fromEl.textContent = '';
        if (toEl) toEl.textContent = '';
        primary.disabled = true;
        primary.textContent = tr('Convert');
        primary.setAttribute('data-action', 'autoSwap');
        return;
    }

    // Detect script and prepare conversion preview.
    // With foreign words kept, only the words that would change pick the direction.
    var options = currentOptions();
    var script = cyrlatconverter.detectScript(trimmed, options);
    var converted = trimmed;
    var actionId = 'autoSwap';
    var label = tr('Convert');

    if (script === 'cyrillic') {
        scriptEl.textContent = tr('Cyrillic');
        actionId = 'cyrToLat';
        label = tr('Convert to Latin');
    } else if (script === 'latin') {
        scriptEl.textContent = tr('Latin');
        actionId = 'latToCyr';
        label = tr('Convert to Cyrillic');
    } else {
        scriptEl.textContent = tr('Unknown');
    }

    primary.textContent = label;
    primary.setAttribute('data-action', actionId);

    // Check if the dictionary blocks the conversion
    if (dictionaryBlocks(actionId, trimmed, options)) {
        primary.disabled = true;
        if (preview) preview.hidden = true;
        if (fromEl) fromEl.textContent = '';
        if (toEl) toEl.textContent = '';
        return;
    }

    if (script === 'cyrillic') {
        converted = cyrlatconverter.toLatin(trimmed);
    } else if (script === 'latin') {
        converted = cyrlatconverter.toCyrillic(trimmed, options);
    }

    // Update button and preview
    primary.disabled = false;

    if (preview && fromEl && toEl) {
        fromEl.textContent = previewSnippet(trimmed);
        toEl.textContent = previewSnippet(converted);
        preview.hidden = false;
    }
}

// Called when primary button is clicked
function runPrimary() {
    var primary = document.getElementById('btnPrimary');
    action((primary && primary.getAttribute('data-action')) || 'autoSwap');
}

// GetSelectedText ends with PARA_SEP. That final mark is not a paragraph.
// An earlier empty string is a real blank paragraph and stays.
function selectedParagraphs(selectedText) {
    var text = String(selectedText);
    var parts = text.split(PARA_SEP);
    if (parts.length > 1 && text.charAt(text.length - 1) === PARA_SEP) {
        parts.pop();
    }
    return parts;
}

// A formula, a number or a blank cell is not transliterated.
function convertibleCellText(cell) {
    if (!cell) return null;
    if (typeof cell.formula === 'string' && cell.formula.charAt(0) === '=') return null;
    var value = cell.value;
    if (typeof value === 'number' || typeof value === 'boolean') return null;
    if (value === null || typeof value === 'undefined') return null;
    var text = String(value);
    if (text.replace(/^\s+|\s+$/g, '') === '') return null;
    return text;
}

// Plan cell updates for conversion
function planCellUpdates(cells, convert) {
    var updates = [];
    for (var i = 0; i < cells.length; i++) {
        var text = convertibleCellText(cells[i]);
        if (text === null) continue;
        var next = convert(text);
        if (next !== text) updates.push({ address: cells[i].address, text: next });
    }
    return updates;
}

// Parse cell payload for conversion
function parseCellPayload(raw) {
    if (!raw) return null;
    if (typeof raw === 'object') return raw;
    try {
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

// Read active cell text
function readActiveCellText(callback) {
    window.Asc.plugin.callCommand(function () {
        try {
            var sheet = Api.GetActiveSheet();
            if (!sheet) return '';
            var cell = sheet.GetActiveCell ? sheet.GetActiveCell() : sheet.GetSelection();
            if (!cell) return '';
            var value = cell.GetValue();
            return typeof value === 'string' ? value : '';
        } catch (e) {
            return '';
        }
    }, false, false, callback);
}

// Read selected cells
function readSelectedCells(callback) {
    window.Asc.plugin.callCommand(function () {
        try {
            var sheet = Api.GetActiveSheet();
            if (!sheet) return '';
            var selection = sheet.GetSelection();
            if (!selection && sheet.GetActiveCell) selection = sheet.GetActiveCell();
            if (!selection) return '';
            var rows = selection.GetRowsCount ? selection.GetRowsCount() : 0;
            var cols = selection.GetColumnsCount ? selection.GetColumnsCount() : 0;
            var count = rows && cols ? rows * cols : (selection.GetCount ? selection.GetCount() : 0);
            if (count > 2000) return JSON.stringify({ error: 'large' });
            var cells = [];
            selection.ForEach(function (cell) {
                var formula = '';
                try {
                    formula = cell.GetFormula();
                } catch (e) {
                    formula = '';
                }
                if (typeof formula !== 'string') formula = '';
                cells.push({
                    address: cell.GetAddress(false, false),
                    formula: formula,
                    value: cell.GetValue()
                });
            });
            return JSON.stringify({ cells: cells });
        } catch (e) {
            return '';
        }
    }, false, false, callback);
}

// Write cell updates for conversion
function writeCellUpdates(updates, callback) {
    Asc.scope.srCellUpdates = updates;
    window.Asc.plugin.callCommand(function () {
        try {
            var sheet = Api.GetActiveSheet();
            var updates = Asc.scope.srCellUpdates || [];
            if (!sheet || !updates.length) return false;
            for (var i = 0; i < updates.length; i++) {
                var cell = sheet.GetRange(updates[i].address);
                if (!cell || cell.SetValue(updates[i].text) === false) return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }, false, true, callback);
}

// Convert cells for conversion
function convertCells(id) {
    var handler = ACTIONS[id];
    if (!handler) return;

    readSelectedCells(function (raw) {
        var payload = parseCellPayload(raw);
        if (payload && payload.error === 'large') {
            showToast(tr('Select a smaller group of cells.'), true, 4000);
            return;
        }
        var cells = payload && payload.cells;
        if (!cells || !cells.length) {
            showToast(tr('Please select some text first.'), true, 3000);
            return;
        }

        var hasText = false;
        var options = currentOptions();
        var waitForDictionary = false;
        for (var i = 0; i < cells.length; i++) {
            var text = convertibleCellText(cells[i]);
            if (!text) continue;
            hasText = true;
            if (dictionaryBlocks(id, text, options)) waitForDictionary = true;
        }
        if (!hasText) {
            showToast(tr('Nothing to convert here.'), true, 3000);
            return;
        }

        if (waitForDictionary) {
            if (dictionaryState === 'loading') {
                pendingActionId = id;
                return;
            }
            showToast(tr('The word list could not be loaded.'), true, 4000);
            return;
        }

        var updates = planCellUpdates(cells, function (text) {
            return handler.convert(text, options);
        });
        if (!updates.length) {
            showToast(tr('Nothing to convert here.'), true, 3000);
            return;
        }

        writeCellUpdates(updates, function (isDone) {
            if (isDone) {
                showToast(tr('Conversion finished.'));
                refreshDetection();
                return;
            }
            showToast(tr('The text could not be converted.'), true, 4000);
        });
    });
}

// Execute conversion action by ID (convert cells or convert text)
function action(id) {
    var handler = ACTIONS[id];
    if (!handler) return;

    if (isCellEditor()) {
        convertCells(id);
        return;
    }

    window.Asc.plugin.executeMethod('GetSelectedText', [SELECTION_PROPS], function (selectedText) {
        if (!selectedText || selectedText.trim() === '') {
            showToast(tr('Please select some text first.'), true, 3000);
            return;
        }

        var options = currentOptions();

        if (dictionaryBlocks(id, selectedText, options)) {
            if (dictionaryState === 'loading') {
                pendingActionId = id;
                return;
            }
            showToast(tr('The word list could not be loaded.'), true, 4000);
            return;
        }

        // Convert each paragraph separately. The trailing separator is not sent,
        // so ReplaceTextSmart does not append a blank paragraph.
        var sourceParts = selectedParagraphs(selectedText);
        var paragraphs = sourceParts.map(function (paragraph) {
            return handler.convert(paragraph, options);
        });

        // Check if any conversion happened
        if (paragraphs.join(PARA_SEP) === sourceParts.join(PARA_SEP)) {
            showToast(tr('Nothing to convert here.'), true, 3000);
            return;
        }

        replaceSelection(paragraphs);
    });
}

// Replace selected text in document with converted text
function replaceSelection(paragraphs) {
    Asc.scope.paragraphs = paragraphs;
    Asc.scope.tabSymbol = TAB_SYMBOL;
    Asc.scope.lineSep = LINE_SEP;

    function reportReplaced(isDone) {
        if (isDone) {
            showToast(tr('Conversion finished.'));
            refreshDetection();
            return;
        }
        showToast(tr('The text could not be converted.'), true, 4000);
    }

    // Try ReplaceTextSmart first (preserves formatting)
    window.Asc.plugin.executeMethod('ReplaceTextSmart', [paragraphs, TAB_SYMBOL, LINE_SEP], function (isDone) {
        if (isDone) {
            reportReplaced(true);
            return;
        }

        // Fallback for older editors. Same tab and soft-break separators as above.
        // The command runs outside this function, so the separators travel on Asc.scope.
        window.Asc.plugin.callCommand(function () {
            try {
                if (typeof Api.ReplaceTextSmart !== "function") {
                    return false;
                }
                return Api.ReplaceTextSmart(Asc.scope.paragraphs, Asc.scope.tabSymbol, Asc.scope.lineSep) === true;
            } catch (e) {
                return false;
            }
        }, false, true, reportReplaced);
    });
}

// Get current conversion options from UI
function currentOptions() {
    return {
        keepForeign: isChecked('optForeign')
    };
}

// Check if checkbox is checked (defaults to true if not found)
function isChecked(id) {
    var checkbox = document.getElementById(id);
    if (!checkbox) return true;
    return !!checkbox.checked;
}

// Translate text using ONLYOFFICE i18n system
function tr(text) {
    return window.Asc.plugin.tr ? window.Asc.plugin.tr(text) : text;
}

// Update dictionary notice (loading, failed or ready)
function updateDictionaryNotice() {
    var el = document.getElementById('dictStatus');
    if (!el) return;
    if (dictionaryState === 'loading') {
        el.hidden = false;
        el.classList.remove('dict-failed');
        el.textContent = tr('Loading the word list…');
        return;
    }
    if (dictionaryState === 'failed') {
        el.hidden = false;
        el.classList.add('dict-failed');
        el.textContent = tr('The word list could not be loaded.');
        return;
    }
    el.hidden = true;
    el.textContent = '';
    el.classList.remove('dict-failed');
}

// Show toast notification
function showToast(message, isWarning, duration) {
    var toast = document.getElementById('toast');
    toast.classList.toggle('toast-warn', !!isWarning);
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(function () {
        toast.classList.remove('show');
    }, duration || 1500);
}

// Called when translations are loaded - update all UI text
window.Asc.plugin.onTranslate = function () {
    setText('hintTop', 'Select text in the document to convert it.');
    setText('detectLabel', 'Selected text is recognized as');
    setText('optForeignLabel', 'Keep foreign words and brands unchanged (Windows, Google)');
    setText('hintBottom', 'Right-click selected text for a quick conversion');
    updateDictionaryNotice();
    updateDetection(lastSelectedText);
};

// Set translated text for element by ID
function setText(id, text) {
    var element = document.getElementById(id);
    if (element) element.textContent = tr(text);
}
