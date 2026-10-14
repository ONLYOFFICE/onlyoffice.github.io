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
 * @typedef {Object} Writer
 * @property {string} id
 * @property {string} name
 * @property {WritingSession[]} sessions - oldest first
 * @property {number} changes - recorded inserts and deletes, a measure of how much they wrote
 */

/**
 * The people whose writing is recorded in the document, each with their own sessions.
 *
 * A writer's record is read on its own: every writer also records what the others changed while
 * they watched, so adding two writers' records up counts those changes twice.
 */
const Writers = Object.freeze({

	/**
	 * @param {WritingSession[]} sessions
	 * @returns {Writer[]} the writer with the most recorded changes first
	 */
	of(sessions) {
		/** @type {Map<string, Writer>} */
		const writers = new Map();
		sessions.forEach((session) => {
			let writer = writers.get(session.userId);
			if (!writer) {
				writer = { id: session.userId, name: session.userName || session.userId, sessions: [], changes: 0 };
				writers.set(session.userId, writer);
			}
			if (session.userName)
				writer.name = session.userName;
			writer.sessions.push(session);
			writer.changes += session.events.length;
		});

		return Array.from(writers.values())
			.map((writer) => Object.assign(writer, { sessions: writer.sessions.slice().sort((a, b) => a.startedAt - b.startedAt) }))
			.sort((a, b) => b.changes - a.changes);
	},
});
