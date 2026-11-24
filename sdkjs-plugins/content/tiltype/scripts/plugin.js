/**
 * Интеграция автодополнения с ONLYOFFICE.
 * Следит за буфером ввода, управляет штатным списком у курсора и вставляет выбранное слово.
 */
"use strict";

/** @typedef {{ id: string, text: string }} SuggestionItem */
/** @typedef {{ text: string, add?: boolean }} EditorInput */
/** @typedef {{ keyCode: number }} InputHelperKey */
/**
 * @typedef {Object} InputHelper
 * @property {boolean} isVisible Состояние штатного списка.
 * @property {() => void} createWindow
 * @property {(items: SuggestionItem[]) => void} setItems
 * @property {(count: number) => number} getItemsHeight
 * @property {(width: number, height: number, takeKeyboard: boolean) => void} show
 * @property {() => void} unShow
 */
/**
 * @typedef {Object} EditorPlugin
 * @property {string} guid
 * @property {{ lang?: string, editorType?: string }} info
 * @property {() => void} createInputHelper
 * @property {() => InputHelper} getInputHelper
 * @property {{ (event: "onInputHelperInput" | "onInputHelperClear", handler: (data?: EditorInput) => void): void,
 * (event: "onKeyDown", handler: (key: InputHelperKey) => void): void,
 * (event: "onContextMenuShow", handler: (options?: { type: string }) => void): void,
 * (event: "onContextMenuClick", handler: (id: string) => void): void,
 * (event: "onToolbarMenuClick", handler: (id: string) => void): void }} attachEditorEvent
 * @property {(method: string, args: unknown[]) => void} executeMethod
 * @property {(command: string, data: string) => void} executeCommand
 * @property {(command: () => unknown, close: boolean, recalculate: boolean, callback: (result: unknown) => void) => void} callCommand
 * @property {() => void} [init]
 * @property {(id: number, windowId?: string) => void} [button]
 * @property {(item: SuggestionItem | null) => void} [inputHelper_onSelectItem]
 * @property {(key: InputHelperKey) => void} [event_onKeyDown]
 */

(() => {
  const sdk = Reflect.get(window, "Asc");
  /** @type {EditorPlugin} */
  const plugin = sdk.plugin;
  const POPUP_WIDTH = 240;
  const VISIBLE_ROWS = 7;
  const ENTER_KEY = 13;
  const ESCAPE_KEY = 27;
  const BACKSPACE_KEY = 8;
  const DELETE_KEY = 46;
  const LAYOUT_CONTEXT_MS = 45_000;
  /** @type {Partial<Record<DictionaryLanguage, DictionaryEntry[]>>} */
  const dictionaries = {};
  /** @type {InputHelper} */
  let helper;
  let prefix = "";
  let caretPrefix = "";
  /** @type {{ previous: string, deletion: boolean } | null} */
  let recovery = null;
  let deletionRequested = false;
  /** @type {SuggestionItem[]} */
  let items = [];
  let inputRevision = 0;
  let typingRevision = 0;
  let skipCorrection = "";
  /** @type {ReversibleWordEdit | null} */
  let lastCorrection = null;
  let supportsCorrection = false;
  let supportsCaretRead = false;
  let dismissed = false;
  let addSpaceToSelection = false;
  /** @type {{ language: LayoutLanguage, time: number } | null} */
  let layoutContext = null;
  /** @type {(() => void) | undefined} */
  let closeSettings;
  /** @type {(() => void) | undefined} */
  let queueProofing;

  function hideSuggestions() {
    items = [];
    helper.unShow();
  }

  function clearInput() {
    inputRevision += 1;
    prefix = "";
    caretPrefix = "";
    recovery = null;
    deletionRequested = false;
    skipCorrection = "";
    dismissed = false;
    hideSuggestions();
  }

  function handleEditorClear() {
    const previous = prefix || recovery?.previous || "";
    const deletion = deletionRequested || recovery?.deletion === true;
    clearInput();
    if (!supportsCaretRead || (!deletion && !previous)) return;

    // При открытом списке SDK сбрасывает буфер после Backspace без события клавиши.
    // В таком случае принимаем только укороченный вариант предыдущего слова.
    recovery = { previous, deletion };
    const revision = inputRevision;
    plugin.callCommand(readCaretPrefix, false, false, (remaining) => {
      if (revision !== inputRevision) return;
      recovery = null;
      if (typeof remaining !== "string" || !remaining || completion.getPrefix(remaining) !== remaining) return;
      if (!deletion && (remaining.length >= previous.length || !previous.startsWith(remaining))) return;

      // После сброса SDK сообщает только символы, набранные после удаления.
      caretPrefix = remaining;
      prefix = remaining;
      renderSuggestions();
    });
  }

  function renderSuggestions() {
    if (dismissed) return;
    const words = completion.suggest(prefix, dictionaries);
    if (words.length === 0) {
      hideSuggestions();
      return;
    }

    items = words.map((text, index) => ({ id: `${inputRevision}-${index}`, text }));
    helper.setItems(items);
    // Клавиатура остаётся у редактора, чтобы список не мешал набору текста.
    const height = helper.getItemsHeight(Math.min(items.length, VISIBLE_ROWS));
    helper.show(POPUP_WIDTH, height, false);
  }

  /** @param {string} word */
  function correctWord(word) {
    const options = correctionSettings.read();
    if (!options.layout) layoutContext = null;
    if (!options.spelling && !options.layout) return;

    startSpellcheck();
    const previous = layoutContext && Date.now() - layoutContext.time <= LAYOUT_CONTEXT_MS
      ? layoutContext.language
      : null;
    const correction = corrections.suggest(word, options, dictionaries, spellcheck.dictionaries, previous);
    if (!correction) return;

    const { text, layout } = correction;
    const revision = typingRevision;
    replaceCompletedWord(plugin, word, text, (success, undo) => {
      if (success && layout) layoutContext = { language: layout, time: Date.now() };
      if (revision === typingRevision) lastCorrection = undo;
    });
  }

  function handleEscape() {
    if (lastCorrection) {
      undoCompletedWord(plugin, lastCorrection);
      lastCorrection = null;
      layoutContext = null;
      return;
    }
    skipCorrection = prefix;
    if (items.length > 0) {
      dismissed = true;
      hideSuggestions();
    }
  }

  function startSpellcheck() {
    spellcheck.start().catch((error) => console.error("Autocomplete: Hunspell", error));
  }

  /** @param {CorrectionSettings} options */
  function applyCorrectionSettings(options) {
    if (!options.layout) layoutContext = null;
    if (options.spelling || options.layout || options.proofing) startSpellcheck();
  }

  /** @param {EditorInput} [data] */
  function handleInput(data) {
    typingRevision += 1;
    lastCorrection = null;
    if (!data || typeof data.text !== "string") {
      clearInput();
      return;
    }
    const text = (data.add ? prefix : caretPrefix) + data.text;
    recovery = null;
    deletionRequested = false;
    const completed = /(?:^|[\s(«“])([\p{L}]+) $/u.exec(text)?.[1];
    if (supportsCorrection && completed && completed === prefix && completed !== skipCorrection) correctWord(completed);
    if (data.text) queueProofing?.();

    inputRevision += 1;
    const nextPrefix = completion.getPrefix(text);
    if (nextPrefix !== prefix) {
      dismissed = false;
      skipCorrection = "";
    }
    prefix = nextPrefix;
    renderSuggestions();
  }

  plugin.init = () => {
    if (helper) return;
    plugin.createInputHelper();
    helper = plugin.getInputHelper();
    helper.createWindow();
    const nativeKeyboard = plugin.event_onKeyDown;
    // SDK пересылает клавиши списка только подписавшимся плагинам.
    plugin.attachEditorEvent("onKeyDown", (key) => {
      if (key.keyCode === BACKSPACE_KEY || key.keyCode === DELETE_KEY) {
        typingRevision += 1;
        lastCorrection = null;
        deletionRequested = true;
        return;
      }
      if (key.keyCode === ESCAPE_KEY) {
        handleEscape();
        return;
      }
      if (items.length === 0 || dismissed) return;
      addSpaceToSelection = key.keyCode === ENTER_KEY && correctionSettings.read().spaceAfterEnter;
      try {
        nativeKeyboard?.call(plugin, key);
      } finally {
        addSpaceToSelection = false;
      }
    });
    supportsCorrection = plugin.info.editorType === "word";
    supportsCaretRead = supportsCorrection || plugin.info.editorType === "slide";
    if (supportsCorrection) {
      queueProofing = installProofing(plugin);
      closeSettings = addSettingsButton(plugin, sdk.PluginWindow, applyCorrectionSettings);
      applyCorrectionSettings(correctionSettings.read());
    }
    plugin.attachEditorEvent("onInputHelperClear", handleEditorClear);
    plugin.attachEditorEvent("onInputHelperInput", handleInput);

    for (const language of dictionaryLanguages) {
      loadDictionary(language).then((dictionary) => {
        dictionaries[language] = dictionary;
        if (prefix) {
          inputRevision += 1;
          renderSuggestions();
        }
      }).catch((error) => console.error("Autocomplete:", error));
    }
  };

  plugin.inputHelper_onSelectItem = (item) => {
    if (!item || !prefix || !helper.isVisible || !items.includes(item)) return;

    // SDK заменяет только переданный фрагмент в буфере ввода, сохраняя текст перед ним.
    const text = addSpaceToSelection ? item.text + " " : item.text;
    plugin.executeMethod("InputText", [text, prefix]);
    clearInput();
  };

  plugin.button = (_id, windowId) => {
    if (windowId) {
      closeSettings?.();
      return;
    }
    if (helper) clearInput();
    plugin.executeCommand("close", "");
  };
})();
