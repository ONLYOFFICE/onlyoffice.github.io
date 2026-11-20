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
/// <reference path="./text-diff.js" />
/// <reference path="./session-text.js" />

/**
 * @typedef {"typed" | "pasted" | "moved" | "restored" | "other" | "deleted" | "jump"} ReplayStepKind
 * `jump` — the text changed between two sessions while nothing was recording.
 */

/**
 * @typedef {Object} ReplayStep
 * @property {number} at - when it happened, ms since the epoch
 * @property {number} t - when it plays, ms from the start of the replay
 * @property {ReplayStepKind} kind
 * @property {number} index - where the text changes
 * @property {number} remove - how many characters go
 * @property {string} insert - what comes in
 * @property {number} session - which session it belongs to, from 0
 */

/**
 * @typedef {Object} ReplayFrame
 * @property {string} text - the text after the step
 * @property {ReplayStep | null} step - the step just played; null before the first
 * @property {number} pastes - pastes played so far
 */

/**
 * One writer's sessions turned into steps that play back how the text was written: typed text
 * a character at a time, at the moments its keys were pressed; pasted and other text at once;
 * deletions as they happened; a jump where the text changed between sessions without a record.
 *
 * The play time can leave out long pauses, so an afternoon of writing plays in minutes.
 */
class ReplayTimeline {

	/** with pauses skipped, no gap plays longer than this */
	static maxPauseMs = 1500;
	/** a gap between sessions plays this long either way */
	static sessionGapMs = 1500;
	/** a snapshot of the text is kept every this many steps, so seeking stays fast */
	static _checkpointEvery = 400;

	/**
	 * @param {WritingSession[]} sessions - one writer's sessions, oldest first
	 * @param {{ skipPauses: boolean }} options
	 */
	constructor(sessions, options) {
		/** @type {string} the text before the first step */
		this.initialText = sessions.length ? sessions[0].baseText : "";
		/** @type {ReplayStep[]} */
		this.steps = [];
		this.sessionCount = sessions.length;

		this._build(sessions, options.skipPauses);

		/** @type {string[]} the text after every `_checkpointEvery`-th step, starting before step 0 */
		this._checkpoints = [this.initialText];
		let text = this.initialText;
		this.steps.forEach((step, i) => {
			text = ReplayTimeline._apply(text, step);
			if ((i + 1) % ReplayTimeline._checkpointEvery === 0)
				this._checkpoints.push(text);
		});

		/** @type {number[]} indices of the steps that paste */
		this.pasteSteps = this.steps.map((step, i) => (step.kind === "pasted" ? i : -1)).filter((i) => i >= 0);
	}

	/** @returns {number} play time of the whole replay, ms */
	get duration() {
		return this.steps.length ? this.steps[this.steps.length - 1].t : 0;
	}

	/**
	 * The state after a number of steps.
	 * @param {number} count - steps played, 0..steps.length
	 * @returns {ReplayFrame}
	 */
	frameAfter(count) {
		count = Math.max(0, Math.min(count, this.steps.length));
		const checkpoint = Math.floor(count / ReplayTimeline._checkpointEvery);
		let text = this._checkpoints[checkpoint];
		for (let i = checkpoint * ReplayTimeline._checkpointEvery; i < count; ++i)
			text = ReplayTimeline._apply(text, this.steps[i]);

		let pastes = 0;
		while (pastes < this.pasteSteps.length && this.pasteSteps[pastes] < count)
			++pastes;

		return { text: text, step: count ? this.steps[count - 1] : null, pastes: pastes };
	}

	/**
	 * How many steps have played by a play time.
	 * @param {number} t
	 * @returns {number}
	 */
	countAt(t) {
		let low = 0;
		let high = this.steps.length;
		while (low < high) {
			const middle = (low + high) >> 1;
			if (this.steps[middle].t <= t)
				low = middle + 1;
			else
				high = middle;
		}
		return low;
	}

	/**
	 * @param {WritingSession[]} sessions
	 * @param {boolean} skipPauses
	 * @private
	 */
	_build(sessions, skipPauses) {
		let t = 0;
		/** @type {number | null} */
		let lastAt = null;
		/** @type {string | null} */
		let previousEnd = null;

		/**
		 * @param {number} at
		 * @param {Omit<ReplayStep, "at" | "t">} step
		 */
		const push = (at, step) => {
			if (lastAt !== null) {
				const gap = Math.max(0, at - lastAt);
				t += skipPauses ? Math.min(gap, ReplayTimeline.maxPauseMs) : gap;
			}
			lastAt = at;
			this.steps.push(Object.assign({ at: at, t: t }, step));
		};

		sessions.forEach((session, s) => {
			if (previousEnd !== null) {
				// between sessions: a fixed short gap, then the unrecorded change if there was one
				t += ReplayTimeline.sessionGapMs;
				lastAt = session.startedAt;
				const jump = TextDiff.between(previousEnd, session.baseText);
				if (jump)
					push(session.startedAt, { kind: "jump", index: jump.index, remove: jump.deleted.length, insert: jump.inserted, session: s });
			}

			let previousEventAt = session.startedAt;
			session.events.forEach((event) => {
				if (event.type === "delete") {
					push(event.time, { kind: "deleted", index: event.index, remove: event.text.length, insert: "", session: s });
				} else if (event.source === "typed") {
					const times = ReplayTimeline._typingTimes(session.keystrokes, previousEventAt, event.time, event.text.length);
					Array.from(event.text).reduce((offset, char, i) => {
						push(times[i], { kind: "typed", index: event.index + offset, remove: 0, insert: char, session: s });
						return offset + char.length;
					}, 0);
				} else {
					push(event.time, { kind: event.source, index: event.index, remove: 0, insert: event.text, session: s });
				}
				previousEventAt = event.time;
			});

			previousEnd = SessionText.final(session);
		});
	}

	/**
	 * The moments a typed text's characters appeared: the times of the typing keys pressed for it,
	 * or, where the keys do not match the characters one to one, spread evenly over them.
	 * @param {Keystroke[]} keystrokes
	 * @param {number} after
	 * @param {number} until
	 * @param {number} count
	 * @returns {number[]}
	 * @private
	 */
	static _typingTimes(keystrokes, after, until, count) {
		const keys = keystrokes
			.filter((k) => k.time > after && k.time <= until && (k.kind === "char" || k.kind === "enter"))
			.map((k) => k.time);
		if (!keys.length)
			return new Array(count).fill(until);
		if (keys.length >= count)
			return keys.slice(keys.length - count);

		/** @type {number[]} */
		const times = [];
		for (let i = 0; i < count; ++i)
			times.push(keys[Math.floor(i * keys.length / count)]);
		return times;
	}

	/**
	 * @param {string} text
	 * @param {ReplayStep} step
	 * @returns {string}
	 * @private
	 */
	static _apply(text, step) {
		return text.slice(0, step.index) + step.insert + text.slice(step.index + step.remove);
	}
}
