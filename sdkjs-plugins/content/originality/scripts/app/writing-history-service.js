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

/// <reference path="../domain/history-codec.js" />
/// <reference path="../domain/session-text.js" />
/// <reference path="../storage/history-store.js" />
/// <reference path="./recording-service.js" />

/**
 * The writing history of the document: the sessions stored in it by everyone, plus the one being
 * recorded now. Loads them when the panel opens, starts the recording where the last session
 * left off, and writes the user's history back into the document.
 *
 * Every write is a change to the document and a step in its undo history, so writes are rare:
 * after a quiet spell, and at most once a minute while the user keeps working.
 */
class WritingHistoryService {

	/** quiet time before a write */
	static _quietMs = 15000;
	/** the longest a recorded change waits for a write while the user keeps working */
	static _maxWaitMs = 60000;

	/**
	 * @param {HistoryStore} store
	 * @param {RecordingService} recording
	 */
	constructor(store, recording) {
		this._store = store;
		this._recording = recording;

		/** @type {WritingHistory | null} the user's stored history, without the current session */
		this._mine = null;
		/** @type {WritingSession[]} everyone else's sessions */
		this._others = [];
		this._canSave = false;

		/** @type {number | null} */
		this._savedAt = null;
		this._dirtySince = 0;
		/** @type {ReturnType<typeof setTimeout> | null} */
		this._timer = null;
		/** @type {Array<() => void>} */
		this._listeners = [];

		recording.onChange(() => this._onRecorded());
	}

	/**
	 * @param {{ id: string, name: string }} user
	 * @param {boolean} canSave - false in a viewer, where the editor would discard the write
	 * @returns {Promise<void>}
	 */
	async start(user, canSave) {
		this._canSave = canSave;
		const histories = await this._store.loadAll();
		this._mine = histories.find((h) => h.userId === user.id) || { userId: user.id, userName: user.name, sessions: [] };
		this._mine.userName = user.name;
		this._others = histories
			.filter((h) => h.userId !== user.id)
			.reduce((all, h) => all.concat(h.sessions), /** @type {WritingSession[]} */ ([]));

		const last = this._stored().reduce((latest, s) => (!latest || s.endedAt > latest.endedAt ? s : latest), /** @type {WritingSession | null} */ (null));
		await this._recording.start(user, last ? SessionText.final(last) : null);
		this._notify();
	}

	/**
	 * Every recorded session in the document, the current one included, oldest first.
	 * @returns {WritingSession[]}
	 */
	get sessions() {
		const current = this._recording.session;
		const all = this._stored();
		if (current && (WritingHistoryService._hasActivity(current) || current.unrecorded))
			all.push(current);
		return all.sort((a, b) => a.startedAt - b.startedAt);
	}

	/**
	 * @returns {number | null} when the history was last written into the document
	 */
	get savedAt() {
		return this._savedAt;
	}

	/**
	 * @returns {boolean} whether the history is written into the document at all
	 */
	get canSave() {
		return this._canSave;
	}

	/**
	 * @param {() => void} listener
	 */
	onChange(listener) {
		this._listeners.push(listener);
	}

	/**
	 * Writes now whatever has not been written, e.g. when the panel closes.
	 * @returns {Promise<void>}
	 */
	flush() {
		return this._dirtySince ? this._save() : Promise.resolve();
	}

	/** @private */
	_onRecorded() {
		const now = Date.now();
		if (!this._dirtySince)
			this._dirtySince = now;

		if (this._timer)
			clearTimeout(this._timer);
		const waitLeft = WritingHistoryService._maxWaitMs - (now - this._dirtySince);
		this._timer = setTimeout(() => this._save(), Math.max(0, Math.min(WritingHistoryService._quietMs, waitLeft)));

		this._notify();
	}

	/** @private */
	async _save() {
		if (this._timer)
			clearTimeout(this._timer);
		this._timer = null;

		const current = this._recording.session;
		if (!this._canSave || !this._mine || !current || !WritingHistoryService._hasActivity(current))
			return;

		this._dirtySince = 0;
		const history = { userId: this._mine.userId, userName: this._mine.userName, sessions: this._mine.sessions.concat([current]) };
		if (await this._store.save(history)) {
			this._savedAt = Date.now();
			this._notify();
		} else if (!this._dirtySince) {
			// not written; keep it for the next attempt
			this._dirtySince = Date.now();
		}
	}

	/**
	 * @returns {WritingSession[]}
	 * @private
	 */
	_stored() {
		return this._others.concat(this._mine ? this._mine.sessions : []);
	}

	/**
	 * Whether the user did anything in the session. Only then is it written: opening the panel
	 * alone must not change the document.
	 * @param {WritingSession} session
	 * @returns {boolean}
	 * @private
	 */
	static _hasActivity(session) {
		return session.events.length > 0 || session.keystrokes.length > 0;
	}

	/** @private */
	_notify() {
		this._listeners.forEach((listener) => listener());
	}
}
