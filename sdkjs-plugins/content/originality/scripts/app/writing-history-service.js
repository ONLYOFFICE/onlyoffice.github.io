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
/// <reference path="../domain/session-list.js" />
/// <reference path="../storage/history-store.js" />
/// <reference path="./recording-service.js" />

/**
 * The writing history of the document: the sessions stored in it by everyone, plus the one being
 * recorded now. Loads them when the panel opens, starts and stops the recording where the last
 * session left off, writes the user's history back into the document, and removes it from there.
 *
 * Every write is a change to the document and a step in its undo history, so writes are rare:
 * after a quiet spell, and at most once a minute while the user keeps working. A write merges
 * with what is stored, since the same user may be writing in another tab.
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
		/** @type {{ id: string, name: string } | null} */
		this._user = null;
		this._recordingOn = false;

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
	 * @param {boolean} record - whether to record the user's writing
	 * @returns {Promise<void>}
	 */
	async start(user, canSave, record) {
		this._canSave = canSave;
		this._user = user;
		this._recordingOn = record;
		const histories = await this._store.loadAll();
		this._mine = histories.find((h) => h.userId === user.id) || { userId: user.id, userName: user.name, sessions: [] };
		this._mine.userName = user.name;
		this._others = histories
			.filter((h) => h.userId !== user.id)
			.reduce((all, h) => all.concat(h.sessions), /** @type {WritingSession[]} */ ([]));

		if (record)
			await this._startRecording();
		this._notify();
	}

	/**
	 * Starts or stops recording. What was recorded so far is written into the document first.
	 * @param {boolean} on
	 * @returns {Promise<void>}
	 */
	async setRecording(on) {
		if (on === this._recordingOn || !this._user)
			return;
		if (on) {
			await this._startRecording();
		} else {
			this._recordingOn = false;
			await this.flush();
			const current = this._recording.session;
			if (this._mine && current && WritingHistoryService._hasActivity(current))
				this._mine.sessions = SessionList.merge(this._mine.sessions, [current]);
			this._recording.stop();
		}
		this._notify();
	}

	/**
	 * @returns {boolean} whether the user's writing is being recorded
	 */
	get isRecording() {
		return this._recordingOn;
	}

	/**
	 * Removes the history from the document: the user's, or everyone's. The current session
	 * goes with it; if recording is on, a new one starts from here.
	 *
	 * Someone recording in the document right now keeps their history in their panel and writes
	 * it back on their next save — the same user in another tab included.
	 * @param {boolean} everyone
	 * @returns {Promise<boolean>} whether it is gone; false in a viewer
	 */
	async remove(everyone) {
		if (!this._canSave || !this._mine)
			return false;

		if (this._timer)
			clearTimeout(this._timer);
		this._timer = null;
		this._dirtySince = 0;
		if (!(await this._store.remove(everyone ? null : this._mine.userId)))
			return false;

		this._mine.sessions = [];
		if (everyone)
			this._others = [];
		this._savedAt = null;
		if (this._recordingOn)
			await this._startRecording();
		this._notify();
		return true;
	}

	/**
	 * @returns {Promise<void>}
	 * @private
	 */
	async _startRecording() {
		this._recordingOn = true;
		const last = this._stored().reduce((latest, s) => (!latest || s.endedAt > latest.endedAt ? s : latest), /** @type {WritingSession | null} */ (null));
		await this._recording.start(/** @type {{ id: string, name: string }} */ (this._user), last ? SessionText.final(last) : null);
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
		const mine = this._mine;
		// what another tab of the same user stored since stays
		const stored = await this._store.load(mine.userId);
		const sessions = SessionList.merge(stored ? stored.sessions : [], mine.sessions, [current]);
		mine.sessions = sessions.filter((s) => s.startedAt !== current.startedAt);
		const history = { userId: mine.userId, userName: mine.userName, sessions: sessions };
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
