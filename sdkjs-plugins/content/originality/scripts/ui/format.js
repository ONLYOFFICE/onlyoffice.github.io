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

/// <reference path="../domain/typing-analysis.js" />

/**
 * How the plugin writes times, durations and its verdicts, the same in the panel and the report.
 * Labels come back untranslated, for `Asc.plugin.tr`.
 */
const Format = Object.freeze({

	/**
	 * @param {number} time
	 * @returns {string}
	 */
	time(time) {
		return new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	},

	/**
	 * @param {number} time
	 * @returns {string}
	 */
	date(time) {
		return new Date(time).toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" });
	},

	/**
	 * The time, with the date when it is not today.
	 * @param {number} time
	 * @returns {string}
	 */
	moment(time) {
		const isToday = new Date(time).toDateString() === new Date().toDateString();
		return isToday ? Format.time(time) : Format.date(time) + ", " + Format.time(time);
	},

	/**
	 * @param {number} time
	 * @returns {string}
	 */
	dateTime(time) {
		return Format.date(time) + ", " + Format.time(time);
	},

	/**
	 * @param {number} ms
	 * @returns {string} h:mm:ss or m:ss
	 */
	duration(ms) {
		const minutes = Math.floor(ms / 60000);
		const seconds = Math.floor((ms % 60000) / 1000);
		const hours = Math.floor(minutes / 60);
		const pad = (/** @type {number} */ n) => (n < 10 ? "0" : "") + n;
		return hours ? hours + ":" + pad(minutes % 60) + ":" + pad(seconds) : minutes + ":" + pad(seconds);
	},

	/**
	 * @param {TypingVerdict} verdict
	 * @returns {string} untranslated
	 */
	verdict(verdict) {
		switch (verdict) {
			case "natural": return "Natural typing";
			case "robotic": return "Looks auto-typed";
			case "mixed": return "Mixed signals";
			default: return "";
		}
	},

	/**
	 * The usual bands of the Flesch reading-ease score.
	 * @param {number} score
	 * @returns {string} untranslated
	 */
	readingEase(score) {
		if (score >= 90) return "very easy";
		if (score >= 80) return "easy";
		if (score >= 70) return "fairly easy";
		if (score >= 60) return "standard";
		if (score >= 50) return "fairly difficult";
		if (score >= 30) return "difficult";
		return "very difficult";
	},
});
