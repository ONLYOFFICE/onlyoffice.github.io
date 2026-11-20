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

/// <reference path="./writing-recorder.js" />

/**
 * One change the editor keeps in review mode, as `ApiDocument.GetReviewReport` reports it.
 * @typedef {Object} ReviewRecord
 * @property {string} author - the author's name; the report has no user ids
 * @property {string} type - "TextAdd", "TextRem", "ParaAdd", "ParaRem", "TextPr", "ParaPr", "RowsAdd", ...
 * @property {string} text - the added or removed text; empty for other types
 * @property {number} date - when the change was last made, ms; 0 when unknown
 */

/**
 * @typedef {Object} TrackedAuthor
 * @property {string} name
 * @property {number} insertedChars
 * @property {number} deletedChars
 * @property {number} formatting - changes of text, paragraph or table formatting
 * @property {number} changes - every change of theirs, whatever its type
 * @property {number | null} firstAt
 * @property {number | null} lastAt
 */

/**
 * @typedef {Object} TrackedInsertion
 * @property {string} author
 * @property {string} text
 * @property {number} time - 0 when unknown
 * @property {boolean} unrecorded - made while no panel was recording
 */

/**
 * @typedef {Object} TrackedChangesSummary
 * @property {number} changes
 * @property {TrackedAuthor[]} authors - the most text inserted first
 * @property {TrackedInsertion[]} insertions - the longest first
 * @property {number} unrecordedChanges
 * @property {number} unrecordedChars - inserted while no panel was recording
 */

/**
 * The changes the editor tracks in review mode, read next to the plugin's own record.
 *
 * A tracked change is a stretch of one author's text in one paragraph, not one action: typing a
 * sentence and pasting it look the same, and its date is when the stretch was last changed. So
 * the review tells who changed how much and roughly when, and which changes fall outside every
 * recorded session — not how the text got there. Accepted or rejected changes are gone from it.
 */
const TrackedChanges = Object.freeze({

	/** how far a change may lie outside a session and still count as recorded: the clocks differ */
	toleranceMs: 5000,

	/**
	 * @param {ReviewRecord[]} records
	 * @param {WritingSession[]} sessions - every writer's sessions: a panel records the others' changes too
	 * @returns {TrackedChangesSummary}
	 */
	summarize(records, sessions) {
		/** @type {Map<string, TrackedAuthor>} */
		const authors = new Map();
		/** @type {TrackedInsertion[]} */
		const insertions = [];
		let unrecordedChanges = 0;
		let unrecordedChars = 0;

		records.forEach((record) => {
			let author = authors.get(record.author);
			if (!author) {
				author = { name: record.author, insertedChars: 0, deletedChars: 0, formatting: 0, changes: 0, firstAt: null, lastAt: null };
				authors.set(record.author, author);
			}
			author.changes++;
			if (record.date) {
				author.firstAt = author.firstAt === null ? record.date : Math.min(author.firstAt, record.date);
				author.lastAt = author.lastAt === null ? record.date : Math.max(author.lastAt, record.date);
			}

			const unrecorded = record.date > 0 && !TrackedChanges._isRecorded(record.date, sessions);
			if (unrecorded)
				unrecordedChanges++;

			if (record.type === "TextAdd") {
				author.insertedChars += record.text.length;
				if (record.text.trim()) {
					insertions.push({ author: record.author, text: record.text, time: record.date, unrecorded: unrecorded });
					if (unrecorded)
						unrecordedChars += record.text.length;
				}
			} else if (record.type === "TextRem") {
				author.deletedChars += record.text.length;
			} else if (/Pr$/.test(record.type)) {
				author.formatting++;
			}
		});

		return {
			changes           : records.length,
			authors           : Array.from(authors.values()).sort((a, b) => b.insertedChars - a.insertedChars || b.changes - a.changes),
			insertions        : insertions.sort((a, b) => b.text.length - a.text.length),
			unrecordedChanges : unrecordedChanges,
			unrecordedChars   : unrecordedChars,
		};
	},

	/**
	 * @param {number} time
	 * @param {WritingSession[]} sessions
	 * @returns {boolean} whether some panel was recording then
	 * @private
	 */
	_isRecorded(time, sessions) {
		const tolerance = TrackedChanges.toleranceMs;
		return sessions.some((s) => time >= s.startedAt - tolerance && time <= s.endedAt + tolerance);
	},
});

