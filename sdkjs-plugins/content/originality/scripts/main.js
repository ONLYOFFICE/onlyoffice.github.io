/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

// @ts-check

/// <reference path="./settings/settings-store.js" />
/// <reference path="./service/originality-client.js" />
/// <reference path="./editor/document-reader.js" />
/// <reference path="./editor/paragraph-texts.js" />
/// <reference path="./editor/annotation-renderer.js" />
/// <reference path="./editor/annotation-clicks.js" />
/// <reference path="./editor/text-selector.js" />
/// <reference path="./editor/keystroke-source.js" />
/// <reference path="./editor/document-structure.js" />
/// <reference path="./editor/custom-xml-parts.js" />
/// <reference path="./storage/history-store.js" />
/// <reference path="./app/scan-service.js" />
/// <reference path="./app/highlight-service.js" />
/// <reference path="./app/recording-service.js" />
/// <reference path="./app/writing-history-service.js" />
/// <reference path="./app/replay-window.js" />
/// <reference path="./ui/page-translator.js" />
/// <reference path="./ui/theme-variables.js" />
/// <reference path="./ui/tab-view.js" />
/// <reference path="./ui/settings-view.js" />
/// <reference path="./ui/scan-view.js" />
/// <reference path="./ui/writing-view.js" />

/**
 * Entry point of the plugin: builds the parts and wires the editor's plugin callbacks to them.
 * It holds no logic of its own.
 */
(function(window) {

	// the scripts load at the end of <body>, so the markup is there already
	const tabs = new TabView(document.body);
	const translator = new PageTranslator(document.body);
	tabs.show(TabView.tabs.scan);

	const settingsStore = new SettingsStore();
	const client = new OriginalityClient();
	const reader = new DocumentReader();
	const scanService = new ScanService(reader, client, settingsStore);

	const paragraphTexts = new ParagraphTexts();
	const selector = new TextSelector();
	const highlights = new HighlightService(paragraphTexts, reader, new AnnotationRenderer(), selector);

	const keystrokes = new KeystrokeSource();
	const structure = new DocumentStructure();
	const recording = new RecordingService(reader, keystrokes, structure, paragraphTexts);
	const history = new WritingHistoryService(new HistoryStore(new CustomXmlParts()), recording);
	const replayWindow = new ReplayWindow();

	/** @type {ScanView | null} */
	let scanView = null;

	/**
	 * The views put translated text into their controls when they are built, so they are built
	 * once the plugin's dictionary is in: `onTranslate` comes after `init`, even for English.
	 */
	function buildViews() {
		scanView = new ScanView(scanService, highlights);
		const view = scanView;
		new SettingsView(settingsStore, {
			checkBalance : (apiKey) => client.getBalance(apiKey),
			onChange     : (settings) => view.onSettingsChanged(settings),
		});
		view.onSettingsChanged(settingsStore.load());

		const writingView = new WritingView({
			onSelectText : (text) => selector.select(text),
			onOpenReplay : (writerId) => replayWindow.show(history.sessions, writerId),
		});
		const showHistory = () => writingView.update({
			sessions       : history.sessions,
			recordingSince : recording.session ? recording.session.startedAt : null,
			savedAt        : history.savedAt,
			canSave        : history.canSave,
		});
		history.onChange(showHistory);
		showHistory();
	}

	window.Asc.plugin.init = function() {
		const info = window.Asc.plugin.info;
		keystrokes.attach();
		structure.attach();
		paragraphTexts.attach();
		history.start({ id: info.userId || "", name: info.userName || "" }, !info.isViewMode);

		new AnnotationClicks().attach((name, paragraphId, rangeIds) => {
			const findingId = highlights.findingAt(name, paragraphId, rangeIds);
			if (findingId && scanView) {
				tabs.show(TabView.tabs.scan);
				scanView.revealFinding(findingId);
			}
		});
	};

	window.Asc.plugin.onTranslate = function() {
		translator.translate();
		if (!scanView)
			buildViews();
	};

	/**
	 * A close cross. With a window id it is the replay window's, which the plugin closes itself.
	 * Without, it is the panel's: try to write the history before the panel goes. Only a try — the
	 * editor closes the panel without waiting (sdkjs `plugins.js`, `buttonClick`), so the regular
	 * write after a quiet spell is what keeps the history.
	 * @param {number} id
	 * @param {string} [windowId]
	 */
	window.Asc.plugin.button = function(id, windowId) {
		if (windowId)
			replayWindow.onButton(windowId);
		else if (id === -1)
			history.flush();
	};

	window.Asc.plugin.onThemeChanged = function(theme) {
		window.Asc.plugin.onThemeChangedBase(theme);
		ThemeVariables.apply(theme);
		replayWindow.onThemeChanged(theme);
	};

})(window);
