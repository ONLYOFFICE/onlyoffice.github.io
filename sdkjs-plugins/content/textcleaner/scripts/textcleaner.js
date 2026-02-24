((window) => {

    let originalState = null, hasCleanedDoc = false, undoCount = 0;

    const CONFIG = {
        removeBold: { method: 'SetBold', value: false },
        removeItalic: { method: 'SetItalic', value: false },
        removeUnderline: { method: 'SetUnderline', value: false },
        removeStrikeout: { method: 'SetStrikeout', value: false },
        clearTextColor: { method: 'SetColor', value: [0, 0, 0, true] },
        removeHighlight: { method: 'SetHighlight', value: 'none' },
        resetLetterSpacing: { method: 'SetSpacing', value: 0 },
        resetVertOffset: { method: 'SetPosition', value: 0 },
        disableAllCaps: { method: 'SetCaps', value: false },
        disableSmallCaps: { method: 'SetSmallCaps', value: false },
        resetBaseline: { method: 'SetVertAlign', value: 'baseline' }
    };

    const getContextItems = () => [
        {
            id: 'textCleaner',
            text: 'TextCleanerMenuTitle',
            icons: getThemeIcon(),
            items: [
                {
                    id: 'clearFormattingCtx', text: 'ClearFormatting', items: [
                        { id: 'removeBoldCtx', text: 'RemoveBold' },
                        { id: 'removeItalicCtx', text: 'RemoveItalic' },
                        { id: 'removeUnderlineCtx', text: 'RemoveUnderline' },
                        { id: 'removeStrikeoutCtx', text: 'RemoveStrikeout' },
                        { id: 'clearTextColorCtx', text: 'ClearTextColor' },
                        { id: 'removeHighlightCtx', text: 'RemoveHighlight' },
                        { id: 'removeBgOutlineCtx', text: 'RemoveBgOutline' }
                    ]
                },
                {
                    id: 'fontStandardizationCtx', text: 'FontStandardization', items: [
                        { id: 'resetLetterSpacingCtx', text: 'ResetLetterSpacing' },
                        { id: 'resetVertOffsetCtx', text: 'ResetVertOffset' }
                    ]
                },
                {
                    id: 'textCaseConversionCtx', text: 'TextCaseConversion', items: [
                        { id: 'doNotChangeCaseCtx', text: 'CaseNone' },
                        { id: 'sentenceCaseCtx', text: 'SentenceCase' },
                        { id: 'lowerCaseCtx', text: 'LowerCase' },
                        { id: 'upperCaseCtx', text: 'UpperCase' },
                        { id: 'capitalizeEachWordCtx', text: 'CapitalizeEach' },
                        { id: 'toggleCaseCtx', text: 'ToggleCase' }
                    ]
                },
                {
                    id: 'specialFormattingCtx', text: 'SpecialFormatting', items: [
                        { id: 'disableAllCapsCtx', text: 'DisableAllCaps' },
                        { id: 'disableSmallCapsCtx', text: 'DisableSmallCaps' },
                        { id: 'resetBaselineCtx', text: 'ResetBaseline' }
                    ]
                }
            ]
        }
    ];

    function getThemeIcon() {
        try {
            if (window.Asc && window.Asc.plugin && window.Asc.plugin.info && window.Asc.plugin.info.theme) {
                const theme = window.Asc.plugin.info.theme;
                return theme.type === 'dark' ? 'resources/dark/icon.svg' : 'resources/light/icon.svg';
            }

            if (document && document.body) {
                const isDark = document.body.classList.contains('theme-dark') ||
                    getComputedStyle(document.documentElement).getPropertyValue('--theme-type') === 'dark';

                return isDark ? 'resources/dark/icon.svg' : 'resources/light/icon.svg';
            }
        } catch (error) {
            console.log('Theme detection failed, using light theme icon');
        }

        return 'resources/light/icon.svg';
    }

    const $ = id => document.getElementById(id);

    const tr = key => {
        try {
            if (window.Asc && window.Asc.plugin && typeof window.Asc.plugin.tr === 'function') {
                const translation = window.Asc.plugin.tr(key);

                if (translation && translation !== key) {
                    return translation;
                }

                return getEnglishFallback(key);
            }
        } catch (e) {
            console.log('Translation function failed, using fallback:', e);
        }

        return getEnglishFallback(key);
    };

    const getEnglishFallback = key => {
        const englishTranslations = {
            "TextCleaner": "Text Cleaner",
            "AllParameters": "All parameters",
            "ClearFormatting": "Clear Formatting",
            "clean-button": "Clean",
            "PluginInstructions": "Select a section of text to clear its formatting, or click <b>Clean</b> to clear formatting in the entire document.",
            "RemoveBold": "Remove bold",
            "RemoveItalic": "Remove italic",
            "RemoveUnderline": "Remove underline",
            "RemoveStrikeout": "Remove strikethrough",
            "ClearTextColor": "Clear text color",
            "RemoveHighlight": "Remove highlight",
            "RemoveBgOutline": "Remove background & outline",
            "FontStandardization": "Font Standardization",
            "ApplyFontStandardization": "Apply font standardization",
            "ResetLetterSpacing": "Reset letter spacing",
            "ResetVertOffset": "Reset vertical offset",
            "TextCaseConversion": "Text Case Conversion",
            "CaseNone": "Do Not Change",
            "SentenceCase": "Sentence case.",
            "LowerCase": "lowercase",
            "UpperCase": "UPPERCASE",
            "CapitalizeEach": "Capitalize Each Word",
            "ToggleCase": "tOGGLE cASE",
            "SpecialFormatting": "Special Formatting",
            "DisableAllCaps": "Disable ALL CAPS",
            "DisableSmallCaps": "Disable Small Caps",
            "ResetBaseline": "Reset to baseline",
            "TextCleanerMenuTitle": "Text Cleaner",
            "CleaningCompleted": "Text cleaning completed successfully!",
            "OperationsApplied": "operations applied",
            "RevertToOriginal": "Revert to Original",
            "NewClean": "New Clean",
            "DoNotClosePanel": "Please do not close the plugin panel.",
            "Loading": "Loading..."
        };

        return englishTranslations[key] || key;
    };

    const callCommand = (func, callback) => {
        return new Promise((resolve, reject) => {
            if (window.Asc && window.Asc.plugin && window.Asc.plugin.callCommand) {
                window.Asc.plugin.callCommand(func, false, true, (result) => {
                    if (callback) callback(result);
                    resolve(result);
                });
            } else {
                reject(new Error('Asc.plugin.callCommand is not available'));
            }
        });
    };

    const applyTextProp = async (method, value) => {
        if (!window.Asc) window.Asc = {};
        if (!window.Asc.scope) window.Asc.scope = {};

        window.Asc.scope.currentMethod = method;
        window.Asc.scope.currentValue = value;

        await callCommand(() => {
            const doc = Api.GetDocument();
            const range = doc.GetRangeBySelect();
            const textPr = Api.CreateTextPr();

            if (Array.isArray(Asc.scope.currentValue)) {
                textPr[Asc.scope.currentMethod](...Asc.scope.currentValue);
            } else {
                textPr[Asc.scope.currentMethod](Asc.scope.currentValue);
            }

            if (range && range.GetText && range.GetText() !== "") {
                range.SetTextPr(textPr);
            } else {
                const paragraphs = doc.GetAllParagraphs();
                for (let i = 0; i < paragraphs.length; i++) {
                    paragraphs[i].SetTextPr(textPr);
                }
            }
        });
        undoCount++;
    };

    // Special handlers
    const specialHandlers = {
        removeBgOutline: async () => {
            await callCommand(() => {
                const doc = Api.GetDocument();
                const range = doc.GetRangeBySelect();
                const noStroke = Api.CreateStroke(0, Api.CreateSolidFill(Api.CreateRGBColor(0, 0, 0)));

                const processItems = items => {
                    for (let i = 0; i < items.length; i++) {
                        const item = items[i];
                        item.SetShd("clear", 255, 255, 255);
                        const textPr = Api.CreateTextPr();
                        textPr.SetOutLine(noStroke);
                        item.SetTextPr(textPr);

                        const paraPr = item.GetParaPr && item.GetParaPr();
                        if (paraPr) {
                            paraPr.SetLeftBorder("none", 0, 0, 0, 0, 0);
                            paraPr.SetRightBorder("none", 0, 0, 0, 0, 0);
                            paraPr.SetTopBorder("none", 0, 0, 0, 0, 0);
                            paraPr.SetBottomBorder("none", 0, 0, 0, 0, 0);
                            if (paraPr.SetBetweenBorder) paraPr.SetBetweenBorder("none", 0, 0, 0, 0, 0);
                        }
                    }
                };

                if (range && range.GetText && range.GetText() !== "") {
                    processItems([range]);
                } else {
                    processItems(doc.GetAllParagraphs());
                }
            });
            undoCount++;
        },

        applyFontStandardization: async settings => {
            if (!settings.applyFontStandardization || (!settings.targetFontFamily && !settings.targetFontSize)) return;

            if (!window.Asc) window.Asc = {};
            if (!window.Asc.scope) window.Asc.scope = {};

            window.Asc.scope.targetFontFamily = settings.targetFontFamily;
            window.Asc.scope.targetFontSize = settings.targetFontSize;

            await callCommand(() => {
                const doc = Api.GetDocument();
                const range = doc.GetRangeBySelect();
                const textPr = Api.CreateTextPr();

                if (Asc.scope.targetFontFamily) textPr.SetFontFamily(Asc.scope.targetFontFamily);
                if (Asc.scope.targetFontSize) textPr.SetFontSize(Asc.scope.targetFontSize * 2);

                if (range && range.GetText && range.GetText() !== "") {
                    range.SetTextPr(textPr);
                } else {
                    const paragraphs = doc.GetAllParagraphs();
                    for (let i = 0; i < paragraphs.length; i++) {
                        paragraphs[i].SetTextPr(textPr);
                    }
                }
            });
            undoCount++;
        },

        textCaseConversion: async caseOption => {
            if (caseOption === "none") return;

            if (!window.Asc) window.Asc = {};
            if (!window.Asc.scope) window.Asc.scope = {};

            window.Asc.scope.textCaseOption = caseOption;

            await callCommand(() => {
                const doc = Api.GetDocument();
                const range = doc.GetRangeBySelect();

                let convertCase;
                switch (Asc.scope.textCaseOption) {
                    case "upper":
                        convertCase = t => t.toUpperCase();
                        break;
                    case "lower":
                        convertCase = t => t.toLowerCase();
                        break;
                    case "sentence":
                        convertCase = t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
                        break;
                    case "capitalize":
                        convertCase = t => t.replace(/\b\w/g, l => l.toUpperCase());
                        break;
                    case "toggle":
                        convertCase = t => t.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
                        break;
                    default:
                        convertCase = t => t;
                }

                const hasSelection = range && range.GetText && range.GetText().trim() !== "";

                if (hasSelection) {
                    const selectedText = range.GetText();
                    const convertedText = convertCase(selectedText);

                    if (convertedText !== selectedText) {
                        const paragraphs = range.GetAllParagraphs();

                        for (let p = 0; p < paragraphs.length; p++) {
                            const para = paragraphs[p];
                            if (!para.GetElementsCount) continue;

                            const elemCount = para.GetElementsCount();
                            let runs = [];
                            let fullText = "";

                            for (let j = 0; j < elemCount; j++) {
                                const elem = para.GetElement(j);
                                if (elem.GetText) {
                                    const text = elem.GetText();
                                    if (text) {
                                        fullText += text;
                                        runs.push({
                                            element: elem,
                                            text: text,
                                            length: text.length,
                                            textPr: elem.GetTextPr ? elem.GetTextPr() : null
                                        });
                                    }
                                }
                            }

                            const paraText = para.GetText ? para.GetText() : fullText;
                            const selectionStart = paraText.indexOf(selectedText);

                            if (selectionStart !== -1) {
                                const selectionEnd = selectionStart + selectedText.length;
                                const newFullText = paraText.substring(0, selectionStart) +
                                    convertedText +
                                    paraText.substring(selectionEnd);

                                para.RemoveAllElements();

                                let charPos = 0;
                                for (let k = 0; k < runs.length; k++) {
                                    const run = runs[k];
                                    const runStart = charPos;
                                    const runEnd = charPos + run.length;

                                    const newRunText = newFullText.substring(runStart, runEnd);

                                    if (newRunText) {
                                        const newRun = Api.CreateRun();
                                        if (run.textPr) {
                                            newRun.SetTextPr(run.textPr);
                                        }
                                        newRun.AddText(newRunText);
                                        para.AddElement(newRun);
                                    }

                                    charPos += run.length;
                                }
                            }
                        }
                    }
                } else {
                    const allParas = doc.GetAllParagraphs();

                    for (let i = 0; i < allParas.length; i++) {
                        const para = allParas[i];
                        if (!para.GetElementsCount) continue;

                        const elementsCount = para.GetElementsCount();
                        let runs = [];
                        let fullText = "";

                        for (let j = 0; j < elementsCount; j++) {
                            const elem = para.GetElement(j);
                            if (elem.GetText) {
                                const text = elem.GetText();
                                if (text) {
                                    fullText += text;
                                    runs.push({ element: elem, text: text, length: text.length });
                                }
                            }
                        }

                        if (fullText.trim() === "") continue;
                        const newFullText = convertCase(fullText);

                        if (newFullText !== fullText) {
                            para.RemoveAllElements();
                            let currentPos = 0;
                            for (let k = 0; k < runs.length; k++) {
                                const run = runs[k];
                                const newRunText = newFullText.substring(currentPos, currentPos + run.length);
                                const newRun = Api.CreateRun();

                                const oldPr = run.element.GetTextPr();
                                newRun.SetTextPr(oldPr);
                                newRun.AddText(newRunText);

                                para.AddElement(newRun);
                                currentPos += run.length;
                            }
                        }
                    }
                }
            });
            undoCount++;
        }
    };

    // Main functions
    const getSettings = preset => preset || {
        removeBold: $("remove-bold")?.checked || false,
        removeItalic: $("remove-italic")?.checked || false,
        removeUnderline: $("remove-underline")?.checked || false,
        removeStrikeout: $("remove-strikeout")?.checked || false,
        clearTextColor: $("clear-text-color")?.checked || false,
        removeHighlight: $("remove-highlight")?.checked || false,
        removeBgOutline: $("remove-bg-outline")?.checked || false,
        resetLetterSpacing: $("reset-letter-spacing")?.checked || false,
        resetVertOffset: $("reset-vert-offset")?.checked || false,
        applyFontStandardization: $("apply-font-standardization")?.checked || false,
        targetFontFamily: $("font-family-select")?.value || "",
        targetFontSize: parseInt($("font-size-select")?.value || "0"),
        textCaseOption: document.querySelector('input[name="text-case-option"]:checked')?.value || "none",
        disableAllCaps: $("disable-all-caps")?.checked || false,
        disableSmallCaps: $("disable-small-caps")?.checked || false,
        resetBaseline: $("reset-baseline")?.checked || false
    };

    const runCleanCommand = async preset => {
        const settings = getSettings(preset);

        if (!window.Asc) window.Asc = {};
        if (!window.Asc.scope) window.Asc.scope = {};

        window.Asc.scope.settings = settings;

        if (!originalState) {
            originalState = "saved";
        }
        undoCount = 0;

        if (settings.disableAllCaps) {
            settings.textCaseOption = "lower";
        }
        if (settings.disableSmallCaps) {
            settings.textCaseOption = "toggle";
        }

        for (const [key, config] of Object.entries(CONFIG)) {
            if (settings[key]) await applyTextProp(config.method, config.value);
        }

        if (settings.removeBgOutline) await specialHandlers.removeBgOutline();
        await specialHandlers.applyFontStandardization(settings);
        await specialHandlers.textCaseConversion(settings.textCaseOption);
        hideLoadingOverlay();
        showActionButtons();
    };

    const showLoadingOverlay = () => {
        const loading = $('loading-view');
        const main = document.querySelector('.main-container');
        if (loading && main) {
            main.style.display = 'none';
            loading.style.display = 'block';
        }
    };

    const hideLoadingOverlay = () => {
        const loading = $('loading-view');
        if (loading) {
            loading.style.display = 'none';
        }
    };

    const showActionButtons = () => {
        const actionView = $('action-buttons-view');
        const undoInfo = $('undo-steps-info');
        if (actionView) {
            actionView.style.display = 'block';
            hasCleanedDoc = true;
            if (undoInfo) undoInfo.textContent = `${undoCount} ${tr("OperationsApplied")}`;
            setupActionHandlers();
        }
    };

    const setupActionHandlers = () => {
        const revert = $('revert-button');
        const newClean = $('new-clean-button');

        if (revert) revert.onclick = revertToOriginal;
        if (newClean) newClean.onclick = resetToMainView;
    };

    const revertToOriginal = () => {
        if (!originalState || undoCount === 0) return;

        const performUndo = stepsRemaining => {
            if (stepsRemaining <= 0) {
                originalState = null;
                hasCleanedDoc = false;
                undoCount = 0;
                resetToMainView();
                return;
            }

            if (window.Asc && window.Asc.plugin && window.Asc.plugin.executeMethod) {
                window.Asc.plugin.executeMethod("Undo", null, () => {
                    performUndo(stepsRemaining - 1);
                });
            }
        };
        performUndo(undoCount);
    };

    const resetToMainView = () => {
        const actionView = $('action-buttons-view');
        const main = document.querySelector('.main-container');
        if (actionView) actionView.style.display = 'none';
        if (main) main.style.display = 'flex';
    };

    let lastButtonState = null;
    const refreshButtonState = () => {
        if (!window.Asc || !window.Asc.plugin || !window.Asc.plugin.executeMethod) return;

        window.Asc.plugin.executeMethod("CanRedo", [], (canRedo) => {
            if (canRedo) {
                const btn = $('clean-button');
                if (btn && lastButtonState === true) {
                    return;
                }
                window.Asc.plugin.executeMethod("GetSelectedText", [], (text) => {
                    const hasSelection = text && text.trim().length > 0;
                    const btn = $('clean-button');
                    if (btn) {
                        const shouldDisable = !hasSelection && lastButtonState === null;
                        if (lastButtonState !== false) {
                            btn.disabled = false;
                            lastButtonState = false;
                        }
                    }
                });
                return;
            }

            callCommand(() => {
                try {
                    const doc = Api.GetDocument();
                    const text = doc.GetText({ Numbering: false }).trim();
                    return text.length > 0;
                } catch (e) {
                    return false;
                }
            }, (hasText) => {
                const btn = $('clean-button');
                if (btn) {
                    const shouldDisable = !hasText;
                    if (lastButtonState !== shouldDisable) {
                        btn.disabled = shouldDisable;
                        lastButtonState = shouldDisable;
                    }
                }
            });
        });
    };

    const onDomReady = () => {
        const selectAll = $('select-all-options');
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all-options):not(#apply-font-standardization)');

        checkboxes.forEach(cb => cb.checked = true);
        const fontStd = $('apply-font-standardization');
        if (fontStd) fontStd.checked = false;
        if (selectAll) {
            selectAll.checked = true;
            selectAll.addEventListener('change', function () {
                checkboxes.forEach(cb => cb.checked = this.checked);
            });
        }

        const cleanBtn = $('clean-button');
        if (cleanBtn) {
            cleanBtn.addEventListener('click', async () => {
                showLoadingOverlay();
                await runCleanCommand();
                if (window.Asc?.plugin?.button) window.Asc.plugin.button(0);
            });
        }

        document.querySelectorAll('.acc-head').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = document.querySelector(btn.dataset.target);
                if (!target) return;
                const isOpen = target.style.display !== 'none';
                target.style.display = isOpen ? 'none' : 'block';
                const chevron = btn.querySelector('.chevron');
                if (chevron) chevron.style.transform = `rotate(${isOpen ? '0' : '180'}deg)`;
            });

            const target = document.querySelector(btn.dataset.target);
            const chevron = btn.querySelector('.chevron');
            if (target && chevron) {
                chevron.style.transform = target.style.display !== 'none' ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    };

    const contextMenuActions = {
        removeBoldCtx: () => runCleanCommand({ removeBold: true }),
        removeItalicCtx: () => runCleanCommand({ removeItalic: true }),
        removeUnderlineCtx: () => runCleanCommand({ removeUnderline: true }),
        removeStrikeoutCtx: () => runCleanCommand({ removeStrikeout: true }),
        clearTextColorCtx: () => runCleanCommand({ clearTextColor: true }),
        removeHighlightCtx: () => runCleanCommand({ removeHighlight: true }),
        removeBgOutlineCtx: () => runCleanCommand({ removeBgOutline: true }),
        resetLetterSpacingCtx: () => runCleanCommand({ resetLetterSpacing: true }),
        resetVertOffsetCtx: () => runCleanCommand({ resetVertOffset: true }),
        doNotChangeCaseCtx: () => runCleanCommand({ textCaseOption: "none" }),
        sentenceCaseCtx: () => runCleanCommand({ textCaseOption: "sentence" }),
        lowerCaseCtx: () => runCleanCommand({ textCaseOption: "lower" }),
        upperCaseCtx: () => runCleanCommand({ textCaseOption: "upper" }),
        capitalizeEachWordCtx: () => runCleanCommand({ textCaseOption: "capitalize" }),
        toggleCaseCtx: () => runCleanCommand({ textCaseOption: "toggle" }),
        disableAllCapsCtx: () => runCleanCommand({ disableAllCaps: false, textCaseOption: "sentence" }),
        disableSmallCapsCtx: () => runCleanCommand({ disableSmallCaps: true, textCaseOption: "lower" }),
        resetBaselineCtx: () => runCleanCommand({ resetBaseline: true })
    };

    const initializeAscStructure = () => {
        if (!window.Asc) {
            window.Asc = {};
        }
        if (!window.Asc.plugin) {
            window.Asc.plugin = {};
        }
        if (!window.Asc.scope) {
            window.Asc.scope = {};
        }
    };

    const setupPlugin = () => {
        initializeAscStructure();

        if (!window.Asc.plugin.init) {
            window.Asc.plugin.init = function () {
                refreshButtonState();

                if (window.Asc.plugin.attachEditorEvent) {
                    window.Asc.plugin.attachEditorEvent("onParagraphText", () => {
                        refreshButtonState();
                    });
                }
            };
        }

        if (!window.Asc.plugin.button) {
            window.Asc.plugin.button = id => {
                if (id === 0) {
                } else if (window.Asc.plugin.executeCommand) {
                    window.Asc.plugin.executeCommand("close", "");
                }
            };
        }

        if (!window.Asc.plugin.onTranslate) {
            window.Asc.plugin.onTranslate = () => {
                if (!$("PluginInstructions")) return;

                const setTr = idKey => {
                    const el = $(idKey);
                    if (el) el.innerHTML = tr(idKey);
                };

                const addChevron = id => {
                    const head = $(id);
                    if (!head) return;
                    head.innerHTML = tr(id);
                    const img = document.createElement('img');
                    img.src = 'resources/light/chevron-down.svg';
                    img.className = 'chevron';
                    img.style.cssText = 'width:6px; float:right; transition:transform 0.2s';
                    head.appendChild(img);
                };

                ['PluginInstructions', 'AllParameters', 'RemoveBold', 'RemoveItalic', 'RemoveUnderline',
                    'RemoveStrikeout', 'ClearTextColor', 'RemoveHighlight', 'RemoveBgOutline', 'ApplyFontStandardization',
                    'NormalizeSpaces', 'NormalizeNumbers', 'ResetLetterSpacing', 'ResetVertOffset', 'FixCasing',
                    'DisableAllCaps', 'DisableSmallCaps', 'ResetBaseline', 'clean-button', 'CaseNone', 'SentenceCase',
                    'LowerCase', 'UpperCase', 'CapitalizeEach', 'ToggleCase', 'CleaningCompleted', 'OperationsApplied',
                    'RevertToOriginal', 'NewClean', 'DoNotClosePanel', 'Loading'].forEach(setTr);

                ['ClearFormatting', 'FontStandardization', 'TextCaseConversion', 'SpecialFormatting'].forEach(addChevron);
            };
        }

        Asc.plugin.attachEvent("onContextMenuShow", (options) => {
            if (!options) return;

            const contextItems = getContextItems().map(item => ({
                ...item,
                text: tr(item.text),
                icons: getThemeIcon(),
                items: item.items ? translateContextItems(item.items) : undefined
            }));

            const items = {
                guid: window.Asc.plugin.guid,
                items: contextItems
            };

            window.Asc.plugin.executeMethod("AddContextMenuItem", [items]);
        });

        Object.keys(contextMenuActions).forEach(itemId => {
            Asc.plugin.attachContextMenuClickEvent(itemId, () => {
                contextMenuActions[itemId]();
            });
        });

        if (!window.Asc.plugin.event_onDocumentContentReady) {
            window.Asc.plugin.event_onDocumentContentReady = refreshButtonState;
        }

        if (!window.Asc.plugin.event_onTargetChanged) {
            window.Asc.plugin.event_onTargetChanged = refreshButtonState;
        }

        if (!window.Asc.plugin.event_onDocumentContentChange) {
            window.Asc.plugin.event_onDocumentContentChange = refreshButtonState;
        }

        if (!window.Asc.plugin.event_onParagraphText) {
            window.Asc.plugin.event_onParagraphText = refreshButtonState;
        }
    };

    const translateContextItems = items => items.map(item => ({
        ...item,
        text: tr(item.text),
        items: item.items ? translateContextItems(item.items) : undefined
    }));

    const waitForPlugin = () => {
        if (window.Asc && window.Asc.plugin && typeof window.Asc.plugin === 'object') {
            setupPlugin();
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        onDomReady();
        waitForPlugin();
    });

    if (document.readyState === 'loading') {
    } else {
        onDomReady();
        waitForPlugin();
    }

})(window);