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

/// <reference path="../domain/writing-recorder.js" />
/// <reference path="../domain/typing-analysis.js" />
/// <reference path="../domain/writers.js" />
/// <reference path="../domain/tracked-changes.js" />
/// <reference path="./format.js" />
/// <reference path="./cards.js" />

/**
 * The Writing tab: how the text recorded so far was written — the typing score with its reasons,
 * where the text came from, typing activity, and the pastes — for one writer at a time, chosen
 * when several recorded (see {@link Writers}); and, for the whole document, the changes the editor
 * tracks in review mode (see {@link TrackedChanges}). Redraws at most once a second, since the
 * record changes on every key.
 */
class WritingView {

	/** the longest a redraw waits */
	static _redrawMs = 1000;
	/** how much of a pasted text the list shows */
	static _previewLength = 140;
	/** how many of the longest tracked insertions the tab lists */
	static _trackedInsertions = 5;

	/**
	 * @param {{
	 *   onSelectText: (text: string) => void,
	 *   onOpenReplay: (writerId: string | null) => void,
	 *   onExportReport: (writerId: string | null) => void,
	 * }} callbacks
	 */
	constructor(callbacks) {
		this._onSelectText = callbacks.onSelectText;
		const replayButton = new Button("open-replay", { variant: "primary", text: window.Asc.plugin.tr("Watch replay") });
		replayButton.subscribe((event) => {
			if (event.type === "button:click")
				callbacks.onOpenReplay(this._writerId);
		});
		// nothing to report until something is scanned or recorded; the caller says when
		const exportButton = new Button("export-report-writing", { variant: "secondary", text: window.Asc.plugin.tr("Export report"), disabled: true });
		this._exportButton = exportButton;
		exportButton.subscribe((event) => {
			if (event.type === "button:click")
				callbacks.onExportReport(this._writerId);
		});

		this._writersBox = /** @type {HTMLElement} */ (document.getElementById("writing-writers"));
		this._writerSelect = /** @type {HTMLElement} */ (document.getElementById("writing-writer"));
		this._others = /** @type {HTMLElement} */ (document.getElementById("writing-others"));
		/** @type {string | null} the writer shown; null until there is one */
		this._writerId = null;
		/** which writers the selector lists, to rebuild it only when they change */
		this._writersKey = "";
		this._status = /** @type {HTMLElement} */ (document.getElementById("recording-status"));
		this._root = /** @type {HTMLElement} */ (document.getElementById("writing-result"));
		/** @type {ReturnType<typeof setTimeout> | null} */
		this._timer = null;
		/** @type {WritingViewState | null} */
		this._state = null;

		this._status.textContent = window.Asc.plugin.tr("Starting…");
	}

	/**
	 * @typedef {Object} WritingViewState
	 * @property {WritingSession[]} sessions - every recorded session, oldest first
	 * @property {number | null} recordingSince
	 * @property {number | null} savedAt
	 * @property {boolean} canSave
	 * @property {ReviewRecord[]} reviewRecords - the document's tracked changes
	 */

	/**
	 * @returns {string | null} the writer the tab shows
	 */
	get writerId() {
		return this._writerId;
	}

	/**
	 * @param {boolean} enabled - whether the report has anything to show
	 */
	setExportEnabled(enabled) {
		if (enabled)
			this._exportButton.enable();
		else
			this._exportButton.disable();
	}

	/**
	 * @param {WritingViewState} state
	 */
	update(state) {
		this._state = state;
		if (!this._timer)
			this._timer = setTimeout(() => this._draw(), WritingView._redrawMs);
	}

	/** @private */
	_draw() {
		this._timer = null;
		const state = this._state;
		if (!state)
			return;

		this._status.textContent = this._statusText(state);

		const writers = Writers.of(state.sessions);
		const writer = writers.find((w) => w.id === this._writerId) || writers[0] || null;
		this._writerId = writer ? writer.id : null;
		this._showWriters(writers, writer);

		const summary = TypingAnalysis.summarize(writer ? writer.sessions : []);
		this._root.textContent = "";
		this._root.appendChild(this._scoreCard(summary));
		this._root.appendChild(this._originCard(summary));
		this._root.appendChild(this._activityCard(summary));
		if (summary.pastes.length)
			this._root.appendChild(this._pastesCard(summary));

		const tracked = TrackedChanges.summarize(state.reviewRecords, state.sessions);
		if (tracked.changes)
			this._root.appendChild(this._trackedCard(tracked));
	}

	/**
	 * The writer selector and who else recorded, shown when more than one writer did.
	 * @param {Writer[]} writers
	 * @param {Writer | null} shown
	 * @private
	 */
	_showWriters(writers, shown) {
		const tr = window.Asc.plugin.tr;
		this._writersBox.classList.toggle("hidden", writers.length < 2);
		if (writers.length < 2 || !shown)
			return;

		const key = writers.map((w) => w.id + "\n" + w.name).join("\n");
		if (key !== this._writersKey) {
			this._writersKey = key;
			this._writerSelect.textContent = "";
			const select = new SelectBox(this._writerSelect, { placeholder: "" });
			select.addItems(writers.map((w) => [w.id, w.name]), shown.id);
			select.subscribe((event) => {
				// picking the writer already shown reports a change too
				if (event.type !== "selectbox:change" || String(event.detail.current) === this._writerId)
					return;
				this._writerId = String(event.detail.current);
				this._writersKey = "";
				if (this._state)
					this.update(this._state);
			});
		}

		this._others.textContent = tr("Also recorded in this document") + ": " + writers
			.filter((w) => w.id !== shown.id)
			.map((w) => w.name + " (" + tr("sessions") + ": " + w.sessions.length + ")")
			.join(", ");
	}

	/**
	 * @param {WritingViewState} state
	 * @returns {string}
	 * @private
	 */
	_statusText(state) {
		const tr = window.Asc.plugin.tr;
		const parts = [];
		if (state.recordingSince !== null)
			parts.push(tr("Recording since") + " " + Format.time(state.recordingSince));
		if (!state.canSave)
			parts.push(tr("view only: nothing is saved"));
		else if (state.savedAt !== null)
			parts.push(tr("saved to the document at") + " " + Format.time(state.savedAt));
		return parts.join(" · ");
	}

	/**
	 * @param {WritingSummary} summary
	 * @returns {HTMLElement}
	 * @private
	 */
	_scoreCard(summary) {
		const tr = window.Asc.plugin.tr;
		const card = Cards.card(tr("Human typing score"));
		const result = summary.autoTyping;

		if (result.score === null) {
			card.appendChild(Cards.note(tr("Not enough typing yet: the score needs at least 50 typed characters in a row.")));
		} else {
			const score = Cards.element("div", "typing-score");
			score.appendChild(Cards.element("span", "typing-score__value typing-score__value--" + result.verdict, Math.round(result.score * 100) + "%"));
			score.appendChild(Cards.element("span", "typing-score__verdict", tr(Format.verdict(result.verdict))));
			card.appendChild(score);
		}

		if (result.reasons.length) {
			const list = Cards.element("ul", "reason-list");
			result.reasons.forEach((reason) => list.appendChild(Cards.element("li", "reason-list__item", tr(reason))));
			card.appendChild(list);
		}
		return card;
	}

	/**
	 * @param {WritingSummary} summary
	 * @returns {HTMLElement}
	 * @private
	 */
	_originCard(summary) {
		const tr = window.Asc.plugin.tr;
		const card = Cards.card(tr("Where the text came from"));
		const parts = [
			{ key: "typed", label: tr("Typed"), chars: summary.typedChars },
			{ key: "pasted", label: tr("Pasted"), chars: summary.pastedChars },
			{ key: "moved", label: tr("Moved within the document"), chars: summary.movedChars },
			{ key: "restored", label: tr("Restored by undo"), chars: summary.restoredChars },
			{ key: "other", label: tr("Without the writer's typing"), chars: summary.otherChars },
			{ key: "unrecorded", label: tr("Changed while nothing was recording"), chars: summary.unrecordedInserted },
		];
		const total = parts.reduce((sum, part) => sum + part.chars, 0);
		if (!total) {
			card.appendChild(Cards.note(tr("Nothing has been added to the document yet.")));
			return card;
		}

		const bar = Cards.element("div", "origin-bar");
		parts.forEach((part) => {
			if (!part.chars)
				return;
			const segment = Cards.element("div", "origin-bar__part origin-bar__part--" + part.key);
			segment.style.width = (part.chars / total * 100) + "%";
			bar.appendChild(segment);
		});
		card.appendChild(bar);

		parts.forEach((part) => {
			if (!part.chars)
				return;
			const row = Cards.row(part.label, Math.round(part.chars / total * 100) + "% · " + part.chars.toLocaleString() + " " + tr("chars"));
			row.classList.add("result-row--" + part.key);
			card.appendChild(row);
		});
		return card;
	}

	/**
	 * @param {WritingSummary} summary
	 * @returns {HTMLElement}
	 * @private
	 */
	_activityCard(summary) {
		const tr = window.Asc.plugin.tr;
		const card = Cards.card(tr("Activity"));
		if (summary.firstSessionAt !== null)
			card.appendChild(Cards.row(tr("Sessions recorded"), summary.sessions + " " + tr("since") + " " + Format.date(summary.firstSessionAt)));
		card.appendChild(Cards.row(tr("Time spent writing"), Format.duration(summary.activeMs)));
		card.appendChild(Cards.row(tr("Keystrokes"), summary.keystrokes.toLocaleString()));
		card.appendChild(Cards.row(tr("Corrections"), summary.corrections.toLocaleString()));
		card.appendChild(Cards.row(tr("Characters deleted"), summary.deletedChars.toLocaleString()));
		card.appendChild(Cards.row(tr("Typing speed"), summary.wordsPerMinute === null ? "—" : summary.wordsPerMinute + " " + tr("words/min")));
		return card;
	}

	/**
	 * @param {WritingSummary} summary
	 * @returns {HTMLElement}
	 * @private
	 */
	_pastesCard(summary) {
		const tr = window.Asc.plugin.tr;
		const card = Cards.card(tr("Pastes") + " (" + summary.pastes.length + ")");
		const list = Cards.element("ul", "finding-list");
		summary.pastes.forEach((paste) => {
			const item = Cards.element("li", "finding-list__item paste-item");
			const meta = Cards.element("span", "paste-item__meta",
				Format.moment(paste.time) + " · " + paste.length.toLocaleString() + " " + tr("chars"));
			const preview = paste.text.trim().slice(0, WritingView._previewLength);
			item.appendChild(meta);
			item.appendChild(Cards.element("span", "finding-list__text", preview + (paste.text.trim().length > preview.length ? "…" : "")));

			Cards.clickable(item, () => this._onSelectText(paste.text));
			list.appendChild(item);
		});
		card.appendChild(list);
		return card;
	}

	/**
	 * @param {TrackedChangesSummary} tracked
	 * @returns {HTMLElement}
	 * @private
	 */
	_trackedCard(tracked) {
		const tr = window.Asc.plugin.tr;
		const chars = " " + tr("chars");
		const card = Cards.card(tr("Tracked changes") + " (" + tracked.changes + ")");
		card.appendChild(Cards.note(tr("Changes kept in review mode show who changed how much and when, not whether the text was typed or pasted.")));

		tracked.authors.forEach((author) => {
			const parts = ["+" + author.insertedChars.toLocaleString() + chars, "−" + author.deletedChars.toLocaleString() + chars];
			if (author.formatting)
				parts.push(tr("formatting") + ": " + author.formatting);
			card.appendChild(Cards.row(author.name || tr("Unknown author"), parts.join(" · ")));
		});

		if (tracked.unrecordedChanges) {
			const row = Cards.row(tr("Made while nothing was recording"),
				tracked.unrecordedChanges + " · +" + tracked.unrecordedChars.toLocaleString() + chars);
			row.classList.add("result-row--unrecorded");
			card.appendChild(row);
		}

		const longest = tracked.insertions.slice(0, WritingView._trackedInsertions);
		if (longest.length) {
			card.appendChild(Cards.element("div", "result-subtitle", tr("Longest insertions")));
			const list = Cards.element("ul", "finding-list");
			longest.forEach((insertion) => {
				const item = Cards.element("li", "finding-list__item paste-item");
				const meta = Cards.element("span", "paste-item__meta", [
					insertion.time ? Format.moment(insertion.time) : "",
					insertion.text.length.toLocaleString() + chars,
					insertion.author,
				].filter(Boolean).join(" · "));
				if (insertion.unrecorded)
					meta.appendChild(Cards.element("span", "paste-item__flag", " · " + tr("while nothing was recording")));
				item.appendChild(meta);
				const text = insertion.text.trim();
				const preview = text.slice(0, WritingView._previewLength);
				item.appendChild(Cards.element("span", "finding-list__text", preview + (text.length > preview.length ? "…" : "")));
				Cards.clickable(item, () => this._onSelectText(insertion.text));
				list.appendChild(item);
			});
			card.appendChild(list);
		}
		return card;
	}
}
