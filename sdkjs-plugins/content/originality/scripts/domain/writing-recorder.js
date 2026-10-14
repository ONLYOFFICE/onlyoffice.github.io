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

/// <reference path="./text-diff.js" />

/**
 * @typedef {"char" | "backspace" | "delete" | "enter" | "paste" | "cut" | "undo" | "redo"} KeystrokeKind
 * What a key did. Which character was typed is never recorded, only that one was.
 */

/**
 * @typedef {Object} Keystroke
 * @property {number} time - ms since the epoch
 * @property {KeystrokeKind} kind
 */

/**
 * @typedef {"typed" | "pasted" | "moved" | "restored" | "other"} InsertSource
 * - `typed` — by the user's keys;
 * - `pasted` — arrived at once: a paste shortcut, or a long text with few keys pressed;
 * - `moved` — the user's own text, cut or deleted a moment ago, put back: not new text;
 * - `restored` — brought back by undo or redo;
 * - `other` — no key of this user was pressed: a co-author, a menu command, another plugin.
 */

/**
 * @typedef {Object} InsertEvent
 * @property {"insert"} type
 * @property {number} time
 * @property {number} index - position in the text before the insert
 * @property {string} text
 * @property {InsertSource} source
 */

/**
 * @typedef {Object} DeleteEvent
 * @property {"delete"} type
 * @property {number} time
 * @property {number} index
 * @property {string} text - what was removed
 * @property {"own" | "other"} source
 */

/**
 * @typedef {InsertEvent | DeleteEvent} WritingEvent
 */

/**
 * @typedef {Object} WritingSession
 * @property {string} userId
 * @property {string} userName
 * @property {number} startedAt
 * @property {number} endedAt - the last key or change of the session
 * @property {string} baseText - the document text when the session started
 * @property {TextChange | null} unrecorded - how the text changed since the previous recorded
 *   session ended, while nothing was recording; null for the first session
 * @property {WritingEvent[]} events
 * @property {Keystroke[]} keystrokes
 */

/**
 * Builds the record of one writing session from what the editor reports: the user's keystrokes
 * as they happen, and snapshots of the document text taken now and then. Each snapshot is compared
 * with the previous one; the difference becomes insert and delete events, and the keys pressed in
 * between tell where the inserted text came from.
 */
class WritingRecorder {

	/** an insert at least this long with few keys behind it counts as pasted */
	static pasteLength = 120;
	/** removed texts at least this long are remembered, to recognise them when put back */
	static movableLength = 20;
	/** how many removed texts are remembered */
	static movedMemory = 20;

	/**
	 * @param {{ id: string, name: string }} user
	 * @param {string} text - the document text at the start
	 * @param {number} time
	 * @param {TextChange | null} unrecorded - see {@link WritingSession}
	 */
	constructor(user, text, time, unrecorded) {
		/** @type {WritingSession} */
		this._session = {
			userId     : user.id,
			userName   : user.name,
			startedAt  : time,
			endedAt    : time,
			baseText   : text,
			unrecorded : unrecorded,
			events     : [],
			keystrokes : [],
		};
		this._text = text;
		this._lastSnapshotAt = time;
		/** @type {string[]} */
		this._removed = [];
	}

	/** @returns {WritingSession} */
	get session() {
		return this._session;
	}

	/** @returns {string} the document text as of the last snapshot */
	get text() {
		return this._text;
	}

	/**
	 * @param {Keystroke} keystroke
	 */
	addKeystroke(keystroke) {
		this._session.keystrokes.push(keystroke);
		this._session.endedAt = Math.max(this._session.endedAt, keystroke.time);
	}

	/**
	 * @param {string} text - the whole document text
	 * @param {number} time - when the text was read; keys pressed later belong to the next snapshot
	 * @returns {WritingEvent[]} the events this snapshot added
	 */
	addSnapshot(text, time) {
		const change = TextDiff.between(this._text, text);
		const keys = this._keysBetween(this._lastSnapshotAt, time);
		this._lastSnapshotAt = time;
		if (!change)
			return [];

		const isOwn = keys.length > 0;
		const eventTime = isOwn ? keys[keys.length - 1].time : time;

		/** @type {WritingEvent[]} */
		const added = [];
		if (change.deleted) {
			added.push({ type: "delete", time: eventTime, index: change.index, text: change.deleted, source: isOwn ? "own" : "other" });
			if (isOwn)
				this._remember(change.deleted);
		}
		if (change.inserted) {
			added.push({ type: "insert", time: eventTime, index: change.index, text: change.inserted,
				source: this._sourceOf(change.inserted, keys) });
		}

		this._text = text;
		this._session.events.push(...added);
		this._session.endedAt = Math.max(this._session.endedAt, eventTime);
		return added;
	}

	/**
	 * @param {string} inserted
	 * @param {Keystroke[]} keys - pressed since the previous snapshot
	 * @returns {InsertSource}
	 * @private
	 */
	_sourceOf(inserted, keys) {
		if (!keys.length)
			return "other";

		const typed = keys.filter((k) => k.kind === "char" || k.kind === "enter").length;
		const surplus = inserted.length - typed;

		// retyping a deleted sentence by hand is typing; put back without the keys, it is a move
		if (surplus > 0 && inserted.length >= WritingRecorder.movableLength
			&& this._removed.some((text) => text.indexOf(inserted) !== -1 || inserted.indexOf(text) !== -1))
			return "moved";
		if (keys.some((k) => k.kind === "paste") && surplus > 0)
			return "pasted";
		if (inserted.length >= WritingRecorder.pasteLength && inserted.length > typed * 2)
			return "pasted";
		if (keys.some((k) => k.kind === "undo" || k.kind === "redo") && surplus > 0)
			return "restored";
		return "typed";
	}

	/**
	 * @param {number} after - exclusive
	 * @param {number} until - inclusive
	 * @returns {Keystroke[]}
	 * @private
	 */
	_keysBetween(after, until) {
		return this._session.keystrokes.filter((k) => k.time > after && k.time <= until);
	}

	/**
	 * @param {string} text
	 * @private
	 */
	_remember(text) {
		if (text.trim().length < WritingRecorder.movableLength)
			return;
		this._removed.push(text);
		if (this._removed.length > WritingRecorder.movedMemory)
			this._removed.shift();
	}
}
