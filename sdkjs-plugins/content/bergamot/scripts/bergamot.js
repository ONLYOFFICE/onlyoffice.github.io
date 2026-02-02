/**
 * Bergamot Translator Plugin for ONLYOFFICE
 *
 * Uses the Bergamot neural machine translation engine (WASM-based)
 * for privacy-friendly offline translation.
 *
 * Based on: https://github.com/browsermt/bergamot-translator
 * Models from: https://github.com/mozilla/firefox-translations-models
 *
 * (c) Copyright Ascensio System SIA 2024
 * Licensed under the Apache License, Version 2.0
 */

(function (window, undefined) {
    "use strict";

    // Configuration
    // TRANSLATOR_MODULE_URL: relative to this script (scripts/), so go up one level
    // MODELS_REGISTRY_URL: online registry with full model URLs
    const TRANSLATOR_MODULE_URL = "../vendor/bergamot/translator.js";
    const MODELS_REGISTRY_URL = "https://bergamot.s3.amazonaws.com/models/index.json";
    const DEBUG = false; // Set to true to enable debug logging

    // State
    let translator = null;
    let modelsRegistry = null;
    let allLanguagePairs = {};
    let isInitialized = false;
    let isInitializing = false;
    let txt = "";
    let translatedText = "";
    let paste_done = true;
    let loadedModels = []; // Track loaded models (max 3 to prevent memory overflow)
    const MAX_LOADED_MODELS = 3;

    // Debug logging function
    function debugLog(...args) {
        if (DEBUG) {
            console.log("[Bergamot]", ...args);
        }
    }

    // Language names mapping (ISO 639-1 to display names)
    const LANGUAGE_NAMES = {
        "en": "English",
        "de": "German",
        "es": "Spanish",
        "fr": "French",
        "it": "Italian",
        "pt": "Portuguese",
        "pl": "Polish",
        "nl": "Dutch",
        "ru": "Russian",
        "uk": "Ukrainian",
        "cs": "Czech",
        "bg": "Bulgarian",
        "et": "Estonian",
        "is": "Icelandic",
        "nb": "Norwegian Bokmal",
        "nn": "Norwegian Nynorsk",
        "fa": "Persian",
        "th": "Thai"
    };

    // Load the translator module dynamically using ES module import
    async function loadTranslatorModule() {
        if (translator) {
            return translator;
        }

        try {
            // Dynamic import of ES module
            const module = await import(TRANSLATOR_MODULE_URL);

            // Create a BatchTranslator instance
            // BatchTranslator is optimized for translating multiple texts
            // Note: workerUrl is resolved relative to translator.js via import.meta.url
            // so we don't need to specify it explicitly when using local files
            translator = new module.BatchTranslator({
                registryUrl: MODELS_REGISTRY_URL
            });

            return translator;
        } catch (error) {
            console.error("Failed to load translator module:", error);
            throw new Error("Failed to load translation engine: " + error.message);
        }
    }

    // Fetch models registry to build available language pairs
    async function fetchModelsRegistry() {
        if (modelsRegistry) {
            return modelsRegistry;
        }

        try {
            const response = await fetch(MODELS_REGISTRY_URL);
            if (!response.ok) {
                throw new Error("Failed to fetch models registry");
            }
            modelsRegistry = await response.json();
            return modelsRegistry;
        } catch (error) {
            console.error("Error fetching models registry:", error);
            throw error;
        }
    }

    // Build language pairs from registry
    function buildLanguagePairs(registry) {
        allLanguagePairs = {};

        for (const pairKey of Object.keys(registry)) {
            // pairKey format: "ende" (en->de) or "deen" (de->en)
            if (pairKey.length !== 4) continue;

            const sourceLang = pairKey.substring(0, 2);
            const targetLang = pairKey.substring(2, 4);

            if (!allLanguagePairs[sourceLang]) {
                allLanguagePairs[sourceLang] = [];
            }
            if (!allLanguagePairs[sourceLang].includes(targetLang)) {
                allLanguagePairs[sourceLang].push(targetLang);
            }
        }

        return allLanguagePairs;
    }

    // Update progress bar
    function updateProgress(percent) {
        const progressBar = document.getElementById("model_progress_bar");
        const progressContainer = document.getElementById("model_progress");
        if (progressBar && progressContainer) {
            progressContainer.style.display = "block";
            progressBar.style.width = percent + "%";
        }
    }

    // Hide progress bar
    function hideProgress() {
        const progressContainer = document.getElementById("model_progress");
        if (progressContainer) {
            progressContainer.style.display = "none";
        }
    }

    // Update status bar
    function updateStatus(message, type) {
        const statusBar = document.getElementById("status_bar");
        if (statusBar) {
            statusBar.textContent = message;
            statusBar.className = type || "";
        }
    }

    // Clean up old translation models to free memory
    async function freeOldestModel() {
        if (!translator || !translator.workers || translator.workers.length === 0) {
            return;
        }

        try {
            // Get the oldest model (first in array)
            const oldestModel = loadedModels.shift();
            if (!oldestModel) {
                return;
            }

            // Free the model from all workers
            for (const workerEntry of translator.workers) {
                if (workerEntry && workerEntry.exports && workerEntry.exports.freeTranslationModel) {
                    try {
                        await workerEntry.exports.freeTranslationModel({
                            from: oldestModel.from,
                            to: oldestModel.to
                        });
                        debugLog(`Freed model: ${oldestModel.from}->${oldestModel.to}`);
                    } catch (err) {
                        console.warn(`Failed to free model ${oldestModel.from}->${oldestModel.to}:`, err);
                    }
                }
            }
        } catch (error) {
            console.warn("Error during model cleanup:", error);
        }
    }

    // Perform translation using the high-level API
    async function translate(text, sourceLang, targetLang) {
        if (!text || !text.trim()) {
            return "";
        }

        try {
            if (!translator) {
                await loadTranslatorModule();
            }

            // Track this model and clean up old ones if needed
            const modelKey = `${sourceLang}-${targetLang}`;
            const existingIndex = loadedModels.findIndex(m => `${m.from}-${m.to}` === modelKey);

            if (existingIndex === -1) {
                // New model - check if we need to free space
                if (loadedModels.length >= MAX_LOADED_MODELS) {
                    await freeOldestModel();
                }
                // Add to the end (most recent)
                loadedModels.push({ from: sourceLang, to: targetLang });
            } else {
                // Move existing model to end (mark as most recently used)
                const model = loadedModels.splice(existingIndex, 1)[0];
                loadedModels.push(model);
            }

            updateStatus(getMessage("Translating..."), "info");
            updateProgress(50);

            // Use the translator's translate method
            const result = await translator.translate({
                from: sourceLang,
                to: targetLang,
                text: text,
                html: false
            });

            hideProgress();
            return result.target?.text || result.translation || result;
        } catch (error) {
            hideProgress();
            console.error("Translation error:", error);
            throw error;
        }
    }

    // Initialize the plugin
    async function initializeTranslator() {
        if (isInitialized) return;
        if (isInitializing) return;

        isInitializing = true;
        showLoader(["#loader-container2"], true);
        updateStatus(getMessage("Loading translation engine..."), "info");

        try {
            // Fetch models registry to know available language pairs
            await fetchModelsRegistry();

            // Build language pairs
            buildLanguagePairs(modelsRegistry);

            // Populate dropdowns
            populateLanguageDropdowns();

            // Pre-load the translator module (but don't download models yet)
            await loadTranslatorModule();

            isInitialized = true;
            updateStatus(getMessage("Ready - Select languages to translate"), "success");
        } catch (error) {
            console.error("Initialization error:", error);
            updateStatus(getMessage("Failed to initialize: ") + error.message, "error");
        } finally {
            isInitializing = false;
            showLoader(["#loader-container2"], false);
        }
    }

    // Populate language dropdowns
    function populateLanguageDropdowns() {
        const sourceSelect = document.getElementById("source");
        const targetSelect = document.getElementById("target");

        if (!sourceSelect || !targetSelect) return;

        // Clear existing options
        sourceSelect.innerHTML = "";
        targetSelect.innerHTML = "";

        // Get all source languages
        const sourceLanguages = Object.keys(allLanguagePairs).sort((a, b) => {
            const nameA = LANGUAGE_NAMES[a] || a;
            const nameB = LANGUAGE_NAMES[b] || b;
            return nameA.localeCompare(nameB);
        });

        // Populate source dropdown
        sourceLanguages.forEach(lang => {
            const option = document.createElement("option");
            option.value = lang;
            option.textContent = LANGUAGE_NAMES[lang] || lang.toUpperCase();
            sourceSelect.appendChild(option);
        });

        // Set default source language (English if available)
        if (sourceLanguages.includes("en")) {
            sourceSelect.value = "en";
        }

        // Update target dropdown based on source
        updateTargetLanguages();

        // Initialize Select2
        $(sourceSelect).select2({
            minimumResultsForSearch: Infinity,
            width: "100%"
        });

        $(targetSelect).select2({
            minimumResultsForSearch: Infinity,
            width: "100%"
        });

        // Event handlers
        $(sourceSelect).on("change", function() {
            updateTargetLanguages();
            RunTranslate(txt);
        });

        $(targetSelect).on("change", function() {
            RunTranslate(txt);
        });
    }

    // Update target languages based on selected source
    function updateTargetLanguages() {
        const sourceSelect = document.getElementById("source");
        const targetSelect = document.getElementById("target");

        if (!sourceSelect || !targetSelect) return;

        const sourceLang = sourceSelect.value;
        const targetLanguages = allLanguagePairs[sourceLang] || [];
        const currentTarget = targetSelect.value;

        // Clear and repopulate
        targetSelect.innerHTML = "";

        targetLanguages.sort((a, b) => {
            const nameA = LANGUAGE_NAMES[a] || a;
            const nameB = LANGUAGE_NAMES[b] || b;
            return nameA.localeCompare(nameB);
        }).forEach(lang => {
            const option = document.createElement("option");
            option.value = lang;
            option.textContent = LANGUAGE_NAMES[lang] || lang.toUpperCase();
            targetSelect.appendChild(option);
        });

        // Try to keep the previous selection if still valid
        if (targetLanguages.includes(currentTarget)) {
            targetSelect.value = currentTarget;
        }

        // Update Select2
        $(targetSelect).trigger("change.select2");
    }

    // Run translation based on editor type
    function RunTranslate(sText) {
        switch (window.Asc.plugin.info.editorType) {
            case 'word':
            case 'slide': {
                window.Asc.plugin.executeMethod("GetSelectedText",
                    [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n'}],
                    function(data) {
                        sText = data.replace(/\r/g, ' ');
                        runTranslation(sText);
                    });
                break;
            }
            case 'cell': {
                window.Asc.plugin.executeMethod("GetSelectedText",
                    [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n'}],
                    function(data) {
                        if (data == '')
                            sText = txt.replace(/\r/g, ' ').replace(/\t/g, '\n');
                        else
                            sText = data.replace(/\r/g, ' ');
                        runTranslation(sText);
                    });
                break;
            }
            case 'pdf': {
                window.Asc.plugin.executeMethod("GetSelectedText",
                    [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n'}],
                    function(data) {
                        if (data && data.trim() !== '')
                            sText = data.replace(/\r/g, ' ');
                        runTranslation(sText);
                    });
                break;
            }
            default: {
                // Fallback for other editor types
                runTranslation(sText);
                break;
            }
        }
    }

    // Run translation
    async function runTranslation(textToTranslate) {
        const textInput = textToTranslate || txt;

        if (!textInput || !textInput.trim()) {
            clearTranslation();
            return;
        }

        // Update txt with the actual text to translate
        txt = textInput;

        if (!isInitialized) {
            await initializeTranslator();
        }

        const sourceLang = document.getElementById("source")?.value;
        const targetLang = document.getElementById("target")?.value;

        if (!sourceLang || !targetLang) {
            return;
        }

        updateStatus(getMessage("Translating..."), "info");

        try {
            translatedText = await translate(txt, sourceLang, targetLang);
            displayTranslation(translatedText);
            updateStatus(getMessage("Translation complete"), "success");
        } catch (error) {
            displayTranslation(getMessage("Translation failed: ") + error.message);
            updateStatus(getMessage("Translation failed"), "error");
        }
    }

    // Display translation result
    function displayTranslation(text) {
        const display = document.getElementById("txt_shower");
        const vanishContainer = document.getElementById("vanish_container");

        if (display) {
            display.textContent = text;
        }

        if (vanishContainer && text) {
            vanishContainer.classList.remove("display-none");
        }

        updateScroll();
    }

    // Clear translation
    function clearTranslation() {
        const display = document.getElementById("txt_shower");
        const vanishContainer = document.getElementById("vanish_container");

        if (display) {
            display.textContent = "";
        }

        if (vanishContainer) {
            vanishContainer.classList.add("display-none");
        }

        translatedText = "";
    }

    // Show/hide loader
    function showLoader(selectors, show) {
        selectors.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) {
                if (show) {
                    el.classList.remove("display-none");
                } else {
                    el.classList.add("display-none");
                }
            }
        });
    }

    // Update scroll
    function updateScroll() {
        if (window.Ps && typeof window.Ps.update === "function") {
            window.Ps.update();
        }
    }

    // Get translated message
    function getMessage(key) {
        if (window.Asc && window.Asc.plugin && typeof window.Asc.plugin.tr === "function") {
            const translated = window.Asc.plugin.tr(key);
            return translated || key;
        }
        return key;
    }

    // Copy text to clipboard
    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
        }
    }

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Plugin initialization
    window.Asc.plugin.init = function(text) {
        // Hide paste button in view mode (e.g., PDF viewer)
        if (window.Asc.plugin.info.isViewMode)
            document.getElementById("paste").classList.add('hidden');

        txt = text || "";

        // Populate manual entry field with selected text
        if (txt.trim() !== "") {
            const enterContainer = document.getElementById("enter_container");
            if (enterContainer) {
                enterContainer.value = txt;
            }
        }

        if (!isInitialized && !isInitializing) {
            initializeTranslator().then(() => {
                if (txt) {
                    RunTranslate(txt);
                }
            });
        } else if (txt) {
            RunTranslate(txt);
        }
    };

    // Selection changed handler
    window.Asc.plugin.onExternalMouseUp = function() {
        // Re-run translation if text changed
    };

    // Button handlers
    window.Asc.plugin.button = function(id) {
        this.executeCommand("close", "");
    };

    // Theme change handler
    window.Asc.plugin.onThemeChanged = function(theme) {
        window.Asc.plugin.onThemeChangedBase(theme);

        // Update arrow color based on theme
        const arrowPath = document.getElementById("arrow-svg-path");
        if (arrowPath) {
            const isDark = theme && theme.type === "dark";
            arrowPath.setAttribute("fill", isDark ? "#ffffff" : "#444444");
        }

        // Update manual entry link colors
        const showManually = document.getElementById("show_manually");
        const hideManually = document.getElementById("hide_manually");
        const isDark = theme && theme.type === "dark";
        const borderColor = isDark ? "#ffffff" : "#444444";

        if (showManually) {
            showManually.style.borderBottomColor = borderColor;
        }
        if (hideManually) {
            hideManually.style.borderBottomColor = borderColor;
        }

        // Update status bar colors for dark theme
        const statusBar = document.getElementById("status_bar");
        if (statusBar && isDark) {
            if (statusBar.classList.contains("info")) {
                statusBar.style.backgroundColor = "#1e3a5f";
                statusBar.style.color = "#90caf9";
            } else if (statusBar.classList.contains("success")) {
                statusBar.style.backgroundColor = "#1b5e20";
                statusBar.style.color = "#a5d6a7";
            } else if (statusBar.classList.contains("warning")) {
                statusBar.style.backgroundColor = "#e65100";
                statusBar.style.color = "#ffcc80";
            } else if (statusBar.classList.contains("error")) {
                statusBar.style.backgroundColor = "#b71c1c";
                statusBar.style.color = "#ef9a9a";
            }
        }
    };

    // Translation handler for UI strings
    window.Asc.plugin.onTranslate = function() {
        const elements = document.querySelectorAll(".i18n");
        elements.forEach(el => {
            const text = el.textContent.trim();
            if (text) {
                const translated = getMessage(text);
                if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                    el.placeholder = translated;
                } else {
                    el.textContent = translated;
                }
            }
        });
    };

    // DOM Ready handler
    $(document).ready(function() {
        // Initialize manual text entry field
        const enterContainer = document.getElementById("enter_container");
        if (enterContainer) {
            enterContainer.value = "";
        }

        // Manual text entry toggle
        const showManually = document.getElementById("show_manually");
        const hideManually = document.getElementById("hide_manually");

        if (showManually) {
            showManually.addEventListener("click", function() {
                if (enterContainer) {
                    enterContainer.style.display = "block";
                }
                showManually.style.display = "none";
                if (hideManually) {
                    hideManually.style.display = "inline";
                }
            });
        }

        if (hideManually) {
            hideManually.addEventListener("click", function() {
                if (enterContainer) {
                    enterContainer.style.display = "none";
                }
                hideManually.style.display = "none";
                if (showManually) {
                    showManually.style.display = "inline";
                }
            });
        }

        // Manual text entry handler with debounce
        if (enterContainer) {
            const debouncedTranslate = debounce(function() {
                txt = enterContainer.value;
                RunTranslate(txt);
            }, 500);

            enterContainer.addEventListener("input", debouncedTranslate);
        }

        // Copy button handler
        const copyBtn = document.getElementById("copy");
        if (copyBtn) {
            copyBtn.addEventListener("click", function() {
                if (translatedText) {
                    copyToClipboard(translatedText);
                    updateStatus(getMessage("Copied to clipboard"), "success");
                }
            });
        }

        // Paste/Insert button handler
        const pasteBtn = document.getElementById("paste");
        if (pasteBtn) {
            pasteBtn.addEventListener("click", function() {
                if (!paste_done)
                    return;

                if (!translatedText)
                    return;

                paste_done = false;

                // Store translated text in Asc.scope so it's accessible in callCommand context
                Asc.scope.translatedText = translatedText;
                window.Asc.plugin.info.recalculate = true;

                window.Asc.plugin.executeMethod("GetVersion", [], function(version) {
                    if (version === undefined) {
                        window.Asc.plugin.executeMethod("PasteText", [$("#txt_shower")[0].innerText], function(result) {
                            paste_done = true;
                        });
                    } else {
                        window.Asc.plugin.executeMethod("GetSelectionType", [], function(selectionType) {
                            switch (selectionType) {
                                case "none":
                                case "drawing":
                                    window.Asc.plugin.executeMethod("PasteText", [$("#txt_shower")[0].innerText], function(result) {
                                        paste_done = true;
                                    });
                                    break;
                                case "text":
                                    window.Asc.plugin.callCommand(function() {
                                        Api.ReplaceTextSmart([Asc.scope.translatedText]);
                                    }, undefined, undefined, function(result) {
                                        paste_done = true;
                                    });
                                    break;
                            }
                        });
                    }
                });
            });
        }

        // Initialize translator
        initializeTranslator();
    });

})(window);
