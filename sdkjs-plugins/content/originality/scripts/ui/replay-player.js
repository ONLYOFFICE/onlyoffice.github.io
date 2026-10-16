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

/// <reference path="../domain/replay-timeline.js" />
/// <reference path="./replay-document-view.js" />

/**
 * The replay window's player: plays one writer's sessions, with play/pause, a timeline that can be
 * dragged and shows where text was pasted, speed, skipping long pauses, jumping from paste to
 * paste, and the counts at the current moment. Works on the markup of `replay.html`.
 */
class ReplayPlayer {

	static speeds = Object.freeze([1, 2, 4, 8, 16, 32]);
	/** a timer rather than animation frames: plugin windows are frames that may not get them */
	static _frameMs = 33;
	/** the slider's resolution */
	static _sliderMax = 1000;

	constructor() {
		const tr = window.Asc.plugin.tr;
		/** @param {string} id */
		const element = (id) => /** @type {HTMLElement} */ (document.getElementById(id));

		this._document = new ReplayDocumentView(element("replay-document"));
		this._empty = element("replay-empty");
		this._slider = /** @type {HTMLInputElement} */ (element("replay-position"));
		this._markers = element("replay-markers");
		this._time = element("replay-time");
		this._stats = {
			chars   : element("replay-chars"),
			words   : element("replay-words"),
			pastes  : element("replay-pastes"),
			session : element("replay-session"),
		};

		this._playButton = new Button("replay-play", { variant: "primary", text: tr("Play") });
		this._playButton.subscribe((event) => {
			if (event.type !== "button:click")
				return;
			if (this._playing)
				this.pause();
			else
				this.play();
		});
		this._prevButton = new Button("replay-prev-paste", { variant: "secondary", text: tr("Previous paste") });
		this._prevButton.subscribe((event) => {
			if (event.type === "button:click")
				this._jumpToPaste(-1);
		});
		this._nextButton = new Button("replay-next-paste", { variant: "secondary", text: tr("Next paste") });
		this._nextButton.subscribe((event) => {
			if (event.type === "button:click")
				this._jumpToPaste(1);
		});

		this._speed = 8;
		const speed = new SelectBox("replay-speed", { placeholder: "" });
		speed.addItems(ReplayPlayer.speeds.map((s) => [String(s), s + "×"]), String(this._speed));
		speed.subscribe((event) => {
			if (event.type === "selectbox:change")
				this._speed = Number(event.detail.current) || 1;
		});

		this._skipPauses = true;
		const skip = new Checkbox("replay-skip-pauses", { label: tr("Skip long pauses"), checked: true });
		skip.subscribe((event) => {
			if (event.type === "checkbox:change") {
				this._skipPauses = event.detail.checked;
				this._rebuild();
			}
		});

		this._slider.addEventListener("input", () => {
			this._seek(Number(this._slider.value) / ReplayPlayer._sliderMax * this._timeline.duration);
		});

		/** @type {WritingSession[]} */
		this._sessions = [];
		this._timeline = new ReplayTimeline([], { skipPauses: true });
		this._position = 0;
		this._playing = false;
		/** @type {number | null} */
		this._lastFrameAt = null;
		/** @type {ReturnType<typeof setTimeout> | null} */
		this._timer = null;
	}

	/**
	 * @param {WritingSession[]} sessions - one writer's sessions, oldest first
	 */
	load(sessions) {
		this.pause();
		this._sessions = sessions;
		this._timeline = new ReplayTimeline(sessions, { skipPauses: this._skipPauses });
		this._empty.classList.toggle("hidden", this._timeline.steps.length > 0);
		this._drawMarkers();
		this._seek(0);
	}

	play() {
		if (!this._timeline.steps.length)
			return;
		if (this._position >= this._timeline.duration)
			this._seek(0);

		this._playing = true;
		this._lastFrameAt = performance.now();
		this._playButton.setText(window.Asc.plugin.tr("Pause"));
		if (!this._timer)
			this._nextFrame();
	}

	pause() {
		this._playing = false;
		if (this._timer)
			clearTimeout(this._timer);
		this._timer = null;
		this._playButton.setText(window.Asc.plugin.tr("Play"));
	}

	/** @private */
	_nextFrame() {
		this._timer = setTimeout(() => {
			this._timer = null;
			this._tick(performance.now());
			if (this._playing)
				this._nextFrame();
		}, ReplayPlayer._frameMs);
	}

	/**
	 * @param {number} now
	 * @private
	 */
	_tick(now) {
		if (!this._playing)
			return;

		if (this._lastFrameAt !== null)
			this._position += (now - this._lastFrameAt) * this._speed;
		this._lastFrameAt = now;

		if (this._position >= this._timeline.duration) {
			this._seek(this._timeline.duration);
			this.pause();
			return;
		}
		this._show();
	}

	/**
	 * @param {number} position - play time, ms
	 * @private
	 */
	_seek(position) {
		this._position = Math.max(0, Math.min(position, this._timeline.duration));
		this._show();
	}

	/**
	 * Draws the moment at the current position.
	 * @private
	 */
	_show() {
		const count = this._timeline.countAt(this._position);
		const frame = this._timeline.frameAfter(count);
		this._document.show(frame, this._position);

		const duration = this._timeline.duration;
		this._slider.value = String(duration ? Math.round(this._position / duration * ReplayPlayer._sliderMax) : 0);
		this._time.textContent = frame.step ? ReplayPlayer._moment(frame.step.at) : "";

		this._stats.chars.textContent = frame.text.length.toLocaleString();
		this._stats.words.textContent = frame.text.split(/\s+/).filter(Boolean).length.toLocaleString();
		this._stats.pastes.textContent = frame.pastes + " / " + this._timeline.pasteSteps.length;
		this._stats.session.textContent = (frame.step ? frame.step.session + 1 : this._timeline.sessionCount ? 1 : 0) + " / " + this._timeline.sessionCount;
	}

	/**
	 * Moves to just after the previous or the next paste.
	 * @param {-1 | 1} direction
	 * @private
	 */
	_jumpToPaste(direction) {
		const pastes = this._timeline.pasteSteps;
		const current = this._timeline.countAt(this._position) - 1;
		const target = direction > 0
			? pastes.find((i) => i > current)
			: pastes.slice().reverse().find((i) => i < current);
		if (target === undefined)
			return;

		this.pause();
		this._seek(this._timeline.steps[target].t);
	}

	/**
	 * Skipping pauses changes every play time; keeps the replay at the same step.
	 * @private
	 */
	_rebuild() {
		const count = this._timeline.countAt(this._position);
		this._timeline = new ReplayTimeline(this._sessions, { skipPauses: this._skipPauses });
		this._drawMarkers();
		this._seek(count ? this._timeline.steps[count - 1].t : 0);
	}

	/** @private */
	_drawMarkers() {
		this._markers.textContent = "";
		const duration = this._timeline.duration;
		if (!duration)
			return;

		this._timeline.steps.forEach((step) => {
			if (step.kind !== "pasted" && step.kind !== "jump")
				return;
			const marker = document.createElement("span");
			marker.className = "replay__marker replay__marker--" + step.kind;
			marker.style.left = (step.t / duration * 100) + "%";
			this._markers.appendChild(marker);
		});
	}

	/**
	 * @param {number} time
	 * @returns {string}
	 * @private
	 */
	static _moment(time) {
		return new Date(time).toLocaleString([], { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit" });
	}
}
