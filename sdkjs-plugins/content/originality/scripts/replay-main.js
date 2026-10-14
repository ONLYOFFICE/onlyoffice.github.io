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

/// <reference path="./domain/writing-recorder.js" />
/// <reference path="./domain/writers.js" />
/// <reference path="./app/replay-protocol.js" />
/// <reference path="./ui/page-translator.js" />
/// <reference path="./ui/theme-variables.js" />
/// <reference path="./ui/replay-player.js" />

/**
 * Entry point of the Writer Replay window. The plugin sends every recorded session; the window
 * plays one writer's at a time (see {@link Writers}), starting with the one the panel shows.
 */
(function(window) {

	const translator = new PageTranslator(document.body);
	/** @type {ReplayPlayer | null} */
	let player = null;
	/** @type {ReplayData} */
	let pending = { sessions: [], writerId: null };
	let isReady = false;

	/**
	 * @param {ReplayData} data
	 */
	function show(data) {
		if (!player)
			return;
		const writers = Writers.of(data.sessions);
		const first = writers.find((w) => w.id === data.writerId) || writers[0];
		const current = player;

		const container = /** @type {HTMLElement} */ (document.getElementById("replay-writer"));
		container.textContent = "";
		container.classList.toggle("hidden", writers.length < 2);
		if (writers.length >= 2 && first) {
			const select = new SelectBox(container, { placeholder: "" });
			select.addItems(writers.map((w) => [w.id, w.name]), first.id);
			select.subscribe((event) => {
				const writer = writers.find((w) => w.id === String(event.detail.current));
				if (event.type === "selectbox:change" && writer)
					current.load(writer.sessions);
			});
		}

		current.load(first ? first.sessions : []);
	}

	window.Asc.plugin.init = function() {
		window.Asc.plugin.attachEvent(ReplayProtocol.data, (data) => {
			const payload = /** @type {Partial<ReplayData>} */ (data);
			pending = {
				sessions : payload && Array.isArray(payload.sessions) ? payload.sessions : [],
				writerId : payload && typeof payload.writerId === "string" ? payload.writerId : null,
			};
			show(pending);
		});
		window.Asc.plugin.attachEvent("onThemeChanged", (theme) => {
			window.Asc.plugin.onThemeChangedBase(/** @type {AscTheme} */ (theme));
			ThemeVariables.apply(/** @type {AscTheme} */ (theme));
		});
		isReady = true;
		window.Asc.plugin.sendToPlugin(ReplayProtocol.ready, {});
	};

	window.Asc.plugin.onTranslate = function() {
		translator.translate();
		if (!player) {
			// the player puts translated captions into its controls, so it is built with the dictionary in
			player = new ReplayPlayer();
			if (isReady)
				show(pending);
		}
	};

	window.Asc.plugin.onThemeChanged = function(theme) {
		window.Asc.plugin.onThemeChangedBase(theme);
		ThemeVariables.apply(theme);
	};

})(window);
