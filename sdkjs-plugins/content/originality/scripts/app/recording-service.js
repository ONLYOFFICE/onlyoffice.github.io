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
/// <reference path="../domain/text-diff.js" />
/// <reference path="./snapshot-reader.js" />
/// <reference path="../editor/keystroke-source.js" />
/// <reference path="../editor/document-structure.js" />
/// <reference path="../editor/paragraph-texts.js" />

/**
 * Records the writing session while the plugin panel is open: passes keystrokes to the recorder
 * and decides when to read a snapshot of the document text.
 *
 * Snapshots are read a moment after the user stops typing, at least every few seconds while they
 * keep typing, when paragraphs are added or removed, and on a slow timer for changes no key
 * announces (a co-author, a menu command).
 *
 * Where the editor reports changed paragraphs (`onParagraphText`), only those are read, and on
 * those reports rather than on a timer. The editor sends them a second after a paragraph last
 * changed, so a snapshot then waits until the user's own typing has been reported: the keys
 * and the edit they made must land in the same snapshot. A rare full read catches whatever no
 * report announced.
 */
class RecordingService {

	/** quiet time after a key before the text is read */
	static _settleMs = 800;
	/** quiet time after a paste, cut, undo or redo — those change a lot at once */
	static _settleBulkMs = 300;
	/** the longest typing goes without a snapshot */
	static _maxWaitMs = 3000;
	/** the slow timer */
	static _pollMs = 5000;
	/** how long after the last key the editor has reported the paragraph it changed */
	static _paragraphReportMs = 1500;
	/** with paragraph reports, how often everything is read anyway */
	static _fullReadMs = 30000;

	/**
	 * @param {SnapshotReader} snapshots
	 * @param {KeystrokeSource} keystrokes
	 * @param {DocumentStructure} structure
	 * @param {ParagraphTexts} paragraphs
	 */
	constructor(snapshots, keystrokes, structure, paragraphs) {
		this._snapshots = snapshots;
		this._paragraphs = paragraphs;
		/** whether the editor reports changed paragraphs, so that only those are read */
		this._byParagraph = false;
		this._lastKeyAt = 0;
		this._lastFullReadAt = 0;
		this._fullReadNext = false;
		/** @type {ReturnType<typeof setTimeout> | null} */
		this._pollTimer = null;

		/** @type {WritingRecorder | null} */
		this._recorder = null;
		/** @type {Array<() => void>} */
		this._listeners = [];

		/** @type {ReturnType<typeof setTimeout> | null} */
		this._settleTimer = null;
		/** when the oldest change not yet read was announced; 0 when there is none */
		this._pendingSince = 0;
		this._reading = false;
		this._readAgain = false;

		keystrokes.onKeystroke((keystroke) => this._onKeystroke(keystroke));
		structure.onChange(() => this._schedule(RecordingService._settleBulkMs));
		paragraphs.onChange((paragraphId) => {
			snapshots.markChanged(paragraphId);
			this._schedule(RecordingService._settleBulkMs);
		});
	}

	/**
	 * Reads the starting text and begins recording; a session already recording ends first.
	 * @param {{ id: string, name: string }} user
	 * @param {string | null} previousText - the text the last recorded session ended with, by
	 *   anyone; what differs from it now changed while nothing was recording
	 * @returns {Promise<void>}
	 */
	async start(user, previousText) {
		this.stop();
		const time = Date.now();
		const text = await this._snapshots.readAll();
		this._lastFullReadAt = time;
		const unrecorded = previousText === null ? null : TextDiff.between(previousText, text);
		this._recorder = new WritingRecorder(user, text, time, unrecorded);
		this._schedulePoll();
		this._paragraphs.isSupported().then((supported) => {
			if (!supported)
				return;
			this._byParagraph = true;
			this._snapshots.readChangedOnly();
		});
		this._notify();
	}

	/**
	 * Ends the session: nothing more is recorded until {@link RecordingService.start}. The session
	 * is dropped here, so whoever keeps it reads it first.
	 */
	stop() {
		if (this._pollTimer)
			clearTimeout(this._pollTimer);
		if (this._settleTimer)
			clearTimeout(this._settleTimer);
		this._pollTimer = null;
		this._settleTimer = null;
		this._pendingSince = 0;
		if (!this._recorder)
			return;
		this._recorder = null;
		this._notify();
	}

	/**
	 * @returns {WritingSession | null} null while not recording
	 */
	get session() {
		return this._recorder ? this._recorder.session : null;
	}

	/**
	 * @param {() => void} listener - called when the record changed, as often as on every key
	 */
	onChange(listener) {
		this._listeners.push(listener);
	}

	/**
	 * @param {Keystroke} keystroke
	 * @private
	 */
	_onKeystroke(keystroke) {
		if (!this._recorder)
			return;

		this._recorder.addKeystroke(keystroke);
		this._lastKeyAt = keystroke.time;
		this._notify();
		const isBulk = keystroke.kind === "paste" || keystroke.kind === "cut" || keystroke.kind === "undo" || keystroke.kind === "redo";
		this._schedule(isBulk ? RecordingService._settleBulkMs : RecordingService._settleMs);
	}

	/**
	 * @param {number} settleMs
	 * @private
	 */
	_schedule(settleMs) {
		const now = Date.now();
		if (!this._pendingSince)
			this._pendingSince = now;

		if (this._settleTimer)
			clearTimeout(this._settleTimer);

		let delay = Math.max(0, Math.min(settleMs, RecordingService._maxWaitMs - (now - this._pendingSince)));
		// the typing is in a snapshot only once the editor has reported it
		if (this._byParagraph)
			delay = Math.max(settleMs, this._lastKeyAt + RecordingService._paragraphReportMs - now);
		this._settleTimer = setTimeout(() => this._snapshot(), delay);
	}

	/** @private */
	_schedulePoll() {
		this._pollTimer = setTimeout(() => {
			this._pollTimer = null;
			if (!this._recorder)
				return;
			this._poll();
			this._schedulePoll();
		}, RecordingService._pollMs);
	}

	/** @private */
	_poll() {
		if (!this._byParagraph) {
			this._snapshot();
			return;
		}
		if (Date.now() - this._lastFullReadAt >= RecordingService._fullReadMs) {
			this._fullReadNext = true;
			this._schedule(0);
		}
	}

	/** @private */
	async _snapshot() {
		if (!this._recorder)
			return;
		if (this._reading) {
			this._readAgain = true;
			return;
		}

		if (this._settleTimer)
			clearTimeout(this._settleTimer);
		this._settleTimer = null;
		this._pendingSince = 0;
		this._reading = true;

		try {
			const time = Date.now();
			const full = this._fullReadNext;
			this._fullReadNext = false;
			const text = full ? await this._snapshots.readAll() : await this._snapshots.read();
			if (full)
				this._lastFullReadAt = time;
			if (this._recorder.addSnapshot(text, time).length)
				this._notify();
		} finally {
			this._reading = false;
		}

		if (this._readAgain) {
			this._readAgain = false;
			this._snapshot();
		}
	}

	/** @private */
	_notify() {
		this._listeners.forEach((listener) => listener());
	}
}
