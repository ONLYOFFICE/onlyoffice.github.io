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
/// <reference path="../editor/document-reader.js" />
/// <reference path="../editor/keystroke-source.js" />
/// <reference path="../editor/document-structure.js" />
/// <reference path="../editor/paragraph-texts.js" />

/**
 * Records the writing session while the plugin panel is open: passes keystrokes to the recorder
 * and decides when to read a snapshot of the document text.
 *
 * Snapshots are read a moment after the user stops typing, at least every few seconds while they
 * keep typing, when paragraphs change, and on a slow timer for changes no key announces (a
 * co-author, a menu command).
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

	/**
	 * @param {DocumentReader} reader
	 * @param {KeystrokeSource} keystrokes
	 * @param {DocumentStructure} structure
	 * @param {ParagraphTexts} paragraphs
	 */
	constructor(reader, keystrokes, structure, paragraphs) {
		this._reader = reader;

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
		paragraphs.onChange(() => this._schedule(RecordingService._settleBulkMs));
	}

	/**
	 * Reads the starting text and begins recording.
	 * @param {{ id: string, name: string }} user
	 * @param {string | null} previousText - the text the last recorded session ended with, by
	 *   anyone; what differs from it now changed while nothing was recording
	 * @returns {Promise<void>}
	 */
	async start(user, previousText) {
		const time = Date.now();
		const text = await this._reader.readDocument();
		const unrecorded = previousText === null ? null : TextDiff.between(previousText, text);
		this._recorder = new WritingRecorder(user, text, time, unrecorded);
		setInterval(() => this._snapshot(), RecordingService._pollMs);
		this._notify();
	}

	/**
	 * @returns {WritingSession | null} null until recording has started
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

		const waitLeft = RecordingService._maxWaitMs - (now - this._pendingSince);
		this._settleTimer = setTimeout(() => this._snapshot(), Math.max(0, Math.min(settleMs, waitLeft)));
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
			const text = await this._reader.readDocument();
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
