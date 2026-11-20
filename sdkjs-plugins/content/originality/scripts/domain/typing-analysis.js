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
 * @typedef {"natural" | "mixed" | "robotic" | "unknown"} TypingVerdict
 */

/**
 * @typedef {Object} TypingSignal
 * @property {string} id
 * @property {number} penalty - 0 (human-like) .. 1 (machine-like)
 * @property {string} reason - untranslated, shown when the signal counts against the text
 */

/**
 * @typedef {Object} AutoTypingResult
 * @property {number | null} score - 0..1, how human the typing looks; null without enough typing
 * @property {TypingVerdict} verdict
 * @property {string[]} reasons - untranslated
 */

/**
 * @typedef {Object} PasteSummary
 * @property {number} time
 * @property {number} length
 * @property {string} text
 */

/**
 * @typedef {Object} WritingSummary
 * @property {number} typedChars
 * @property {number} pastedChars
 * @property {number} movedChars
 * @property {number} restoredChars
 * @property {number} otherChars
 * @property {number} deletedChars
 * @property {number} unrecordedInserted - characters that appeared while nothing was recording
 * @property {number} unrecordedDeleted - characters that disappeared while nothing was recording
 * @property {number} sessions
 * @property {number | null} firstSessionAt
 * @property {number} keystrokes
 * @property {number} corrections - backspace and delete presses
 * @property {number} activeMs - time spent typing, long pauses left out
 * @property {number | null} wordsPerMinute
 * @property {PasteSummary[]} pastes - newest first
 * @property {AutoTypingResult} autoTyping
 */

/**
 * What a writing session says about how the text was written: how much was typed, pasted or
 * came from elsewhere, and whether the typing rhythm looks like a person's.
 *
 * The auto-typing score reads the intervals between the keys that typed characters. A person
 * types unevenly: the gaps spread widely, the tempo drifts, mistakes get corrected. A program that
 * types for someone keeps a steady or a few fixed rhythms, often faster than anyone can, and makes
 * no corrections. Each of those is a signal with a penalty; the penalties combine into the score.
 */
const TypingAnalysis = Object.freeze({

	/** fewer typed intervals than this say nothing reliable about rhythm */
	minIntervals: 50,
	/** a gap longer than this is a pause, not typing rhythm */
	pauseMs: 2000,
	/** a gap longer than this is not counted as time spent writing */
	idleMs: 60000,
	/** the verdict bands of the score */
	naturalFrom: 0.7,
	roboticBelow: 0.4,

	/**
	 * @param {WritingSession[]} sessions - oldest first
	 * @returns {WritingSummary}
	 */
	summarize(sessions) {
		/** @type {Record<InsertSource, number>} */
		const inserted = { typed: 0, pasted: 0, moved: 0, restored: 0, other: 0 };
		let deletedChars = 0;
		let unrecordedInserted = 0;
		let unrecordedDeleted = 0;
		/** @type {PasteSummary[]} */
		const pastes = [];

		sessions.forEach((session) => {
			if (session.unrecorded) {
				unrecordedInserted += session.unrecorded.inserted.length;
				unrecordedDeleted += session.unrecorded.deleted.length;
			}
		});

		const events = sessions.reduce((all, session) => all.concat(session.events), /** @type {WritingEvent[]} */ ([]));
		events.forEach((event) => {
			if (event.type === "delete") {
				if (event.source === "own")
					deletedChars += event.text.length;
				return;
			}
			inserted[event.source] += event.text.length;
			if (event.source === "pasted")
				pastes.push({ time: event.time, length: event.text.length, text: event.text });
		});

		// a gap between sessions is longer than any pause, so the joined keys keep each session's rhythm
		const keys = sessions.reduce((all, session) => all.concat(session.keystrokes), /** @type {Keystroke[]} */ ([]));
		const corrections = keys.filter((k) => k.kind === "backspace" || k.kind === "delete").length;
		const activeMs = TypingAnalysis._activeMs(keys);
		const typedWords = TypingAnalysis._typedWords(events);

		return {
			typedChars     : inserted.typed,
			pastedChars    : inserted.pasted,
			movedChars     : inserted.moved,
			restoredChars  : inserted.restored,
			otherChars     : inserted.other,
			deletedChars   : deletedChars,
			unrecordedInserted : unrecordedInserted,
			unrecordedDeleted  : unrecordedDeleted,
			sessions       : sessions.length,
			firstSessionAt : sessions.length ? sessions[0].startedAt : null,
			keystrokes     : keys.length,
			corrections    : corrections,
			activeMs       : activeMs,
			wordsPerMinute : activeMs >= 30000 ? Math.round(typedWords / (activeMs / 60000)) : null,
			pastes         : pastes.reverse(),
			autoTyping     : TypingAnalysis.autoTyping(keys, inserted.typed, inserted.pasted),
		};
	},

	/**
	 * @param {Keystroke[]} keys
	 * @param {number} typedChars
	 * @param {number} pastedChars
	 * @returns {AutoTypingResult}
	 */
	autoTyping(keys, typedChars, pastedChars) {
		const intervals = TypingAnalysis._typingIntervals(keys);
		if (intervals.length < TypingAnalysis.minIntervals)
			return { score: null, verdict: "unknown", reasons: [] };

		const filtered = TypingAnalysis._withoutOutliers(intervals);
		const corrections = keys.filter((k) => k.kind === "backspace" || k.kind === "delete").length;

		/** @type {Array<TypingSignal & { weight: number }>} */
		const signals = [
			Object.assign(TypingAnalysis._uniformSpacing(filtered), { weight: 0.8 }),
			Object.assign(TypingAnalysis._repeatedSpeeds(filtered), { weight: 0.8 }),
			Object.assign(TypingAnalysis._steadyTempo(intervals), { weight: 0.5 }),
			Object.assign(TypingAnalysis._superhumanSpeed(intervals), { weight: 0.9 }),
			Object.assign(TypingAnalysis._noCorrections(typedChars, corrections), { weight: 0.5 }),
		];

		let human = 1;
		signals.forEach((signal) => { human *= 1 - signal.weight * signal.penalty; });

		/** @type {string[]} */
		const reasons = signals.filter((signal) => signal.penalty >= 0.5).map((signal) => signal.reason);

		// the score is about the rhythm of what was typed; pasted text has no rhythm to judge, so it
		// is reported next to the score (see WritingSummary) rather than folded into it
		const pastedShare = typedChars + pastedChars > 0 ? pastedChars / (typedChars + pastedChars) : 0;
		if (pastedShare > 0.25)
			reasons.push("A large part of the text was pasted rather than typed.");

		const score = Math.max(0, Math.min(1, human));
		return {
			score   : score,
			verdict : score >= TypingAnalysis.naturalFrom ? "natural" : score < TypingAnalysis.roboticBelow ? "robotic" : "mixed",
			reasons : reasons,
		};
	},

	// ---- signals ----------------------------------------------------------

	/**
	 * People's key spacing varies a lot (coefficient of variation well above 0.3); a program's
	 * barely does.
	 * @param {number[]} intervals
	 * @returns {TypingSignal}
	 * @private
	 */
	_uniformSpacing(intervals) {
		const cv = TypingAnalysis._cv(intervals);
		return { id: "uniform", penalty: TypingAnalysis._sigmoid((0.22 - cv) / 0.04),
			reason: "Keystroke spacing is unusually uniform." };
	},

	/**
	 * A program set to a speed, or to a few speeds, puts most gaps into a handful of values.
	 * @param {number[]} intervals
	 * @returns {TypingSignal}
	 * @private
	 */
	_repeatedSpeeds(intervals) {
		/** @type {Map<number, number>} */
		const bins = new Map();
		intervals.forEach((ms) => {
			const bin = Math.round(ms / 5);
			bins.set(bin, (bins.get(bin) || 0) + 1);
		});
		const top = Array.from(bins.values()).sort((a, b) => b - a).slice(0, 3).reduce((sum, n) => sum + n, 0);
		const share = top / intervals.length;
		return { id: "repeated", penalty: TypingAnalysis._sigmoid((share - 0.5) / 0.07),
			reason: "The typing keeps returning to the same few speeds." };
	},

	/**
	 * A person speeds up and slows down; the average over a short window wanders.
	 * @param {number[]} intervals
	 * @returns {TypingSignal}
	 * @private
	 */
	_steadyTempo(intervals) {
		const means = TypingAnalysis._windowMeans(intervals, 20);
		const cv = means.length >= 3 ? TypingAnalysis._cv(means) : 1;
		return { id: "steady", penalty: TypingAnalysis._sigmoid((0.06 - cv) / 0.02),
			reason: "The typing tempo hardly changes." };
	},

	/**
	 * Below 40 ms a key (about 300 words a minute), sustained over many keys, is beyond typing.
	 * @param {number[]} intervals
	 * @returns {TypingSignal}
	 * @private
	 */
	_superhumanSpeed(intervals) {
		const means = TypingAnalysis._windowMeans(intervals, 20);
		const fast = means.length ? means.filter((m) => m < 40).length / means.length : 0;
		return { id: "fast", penalty: TypingAnalysis._sigmoid((fast - 0.2) / 0.05),
			reason: "Long stretches were typed faster than a person can type." };
	},

	/**
	 * Hundreds of characters without a single correction is rare for a person.
	 * @param {number} typedChars
	 * @param {number} corrections
	 * @returns {TypingSignal}
	 * @private
	 */
	_noCorrections(typedChars, corrections) {
		const rate = typedChars > 0 ? corrections / typedChars : 0;
		const penalty = typedChars >= 300 ? TypingAnalysis._sigmoid((0.01 - rate) / 0.003) : 0;
		return { id: "corrections", penalty: penalty, reason: "Almost nothing was corrected while typing." };
	},

	// ---- arithmetic -------------------------------------------------------

	/**
	 * Gaps between consecutive keys that typed a character, pauses left out.
	 * @param {Keystroke[]} keys
	 * @returns {number[]}
	 * @private
	 */
	_typingIntervals(keys) {
		/** @type {number[]} */
		const intervals = [];
		let previous = -1;
		keys.forEach((key) => {
			if (key.kind !== "char" && key.kind !== "enter") {
				previous = -1;
				return;
			}
			if (previous >= 0) {
				const gap = key.time - previous;
				if (gap > 0 && gap <= TypingAnalysis.pauseMs)
					intervals.push(gap);
			}
			previous = key.time;
		});
		return intervals;
	},

	/**
	 * @param {Keystroke[]} keys
	 * @returns {number}
	 * @private
	 */
	_activeMs(keys) {
		let total = 0;
		for (let i = 1; i < keys.length; ++i) {
			const gap = keys[i].time - keys[i - 1].time;
			if (gap > 0 && gap <= TypingAnalysis.idleMs)
				total += gap;
		}
		return total;
	},

	/**
	 * @param {WritingEvent[]} events
	 * @returns {number}
	 * @private
	 */
	_typedWords(events) {
		const typed = events
			.filter((e) => e.type === "insert" && e.source === "typed")
			.map((e) => e.text)
			.join(" ");
		return typed.split(/\s+/).filter(Boolean).length;
	},

	/**
	 * Drops values outside 1.5 interquartile ranges.
	 * @param {number[]} values
	 * @returns {number[]}
	 * @private
	 */
	_withoutOutliers(values) {
		const sorted = values.slice().sort((a, b) => a - b);
		const q1 = sorted[Math.floor(sorted.length * 0.25)];
		const q3 = sorted[Math.floor(sorted.length * 0.75)];
		const range = q3 - q1;
		return values.filter((v) => v >= q1 - 1.5 * range && v <= q3 + 1.5 * range);
	},

	/**
	 * @param {number[]} values
	 * @param {number} size
	 * @returns {number[]}
	 * @private
	 */
	_windowMeans(values, size) {
		/** @type {number[]} */
		const means = [];
		for (let i = 0; i + size <= values.length; i += size)
			means.push(values.slice(i, i + size).reduce((sum, v) => sum + v, 0) / size);
		return means;
	},

	/**
	 * Coefficient of variation: spread relative to the mean.
	 * @param {number[]} values
	 * @returns {number}
	 * @private
	 */
	_cv(values) {
		if (!values.length)
			return 0;
		const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
		if (mean === 0)
			return 0;
		const variance = values.reduce((sum, v) => sum + (v - mean) * (v - mean), 0) / values.length;
		return Math.sqrt(variance) / mean;
	},

	/**
	 * @param {number} x
	 * @returns {number}
	 * @private
	 */
	_sigmoid(x) {
		return 1 / (1 + Math.exp(-x));
	},
});
