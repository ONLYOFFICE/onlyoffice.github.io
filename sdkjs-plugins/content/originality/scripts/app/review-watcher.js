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

/// <reference path="../domain/tracked-changes.js" />
/// <reference path="../editor/review-reader.js" />

/**
 * Keeps the latest read of the document's tracked changes. The editor reports every tracked
 * change at once, so while the document keeps changing the watcher reads at most every few seconds.
 */
class ReviewWatcher {

	/** the shortest time between two reads while the document keeps changing */
	static _intervalMs = 10000;

	/**
	 * @param {ReviewReader} reader
	 */
	constructor(reader) {
		this._reader = reader;
		/** @type {ReviewRecord[]} */
		this._records = [];
		this._readAt = 0;
		/** @type {ReturnType<typeof setTimeout> | null} */
		this._timer = null;
		/** @type {Promise<ReviewRecord[]> | null} */
		this._reading = null;
		/** the document changed during a read, which may have missed it */
		this._again = false;
		/** @type {Array<() => void>} */
		this._listeners = [];
	}

	/**
	 * @returns {ReviewRecord[]} as of the last read
	 */
	get records() {
		return this._records;
	}

	/**
	 * @param {() => void} listener - called after a read that changed the records
	 */
	onChange(listener) {
		this._listeners.push(listener);
	}

	/**
	 * Reads now; a read already under way is shared.
	 * @returns {Promise<ReviewRecord[]>}
	 */
	refresh() {
		if (this._timer) {
			clearTimeout(this._timer);
			this._timer = null;
		}
		if (!this._reading) {
			this._reading = this._reader.read().then((records) => {
				this._reading = null;
				this._readAt = Date.now();
				const changed = JSON.stringify(records) !== JSON.stringify(this._records);
				this._records = records;
				if (changed)
					this._listeners.forEach((listener) => listener());
				if (this._again) {
					this._again = false;
					this.refreshSoon();
				}
				return records;
			});
		}
		return this._reading;
	}

	/**
	 * The document changed: read once the interval since the last read is over.
	 */
	refreshSoon() {
		if (this._reading)
			this._again = true;
		if (this._timer || this._reading)
			return;
		const wait = Math.max(0, this._readAt + ReviewWatcher._intervalMs - Date.now());
		this._timer = setTimeout(() => this.refresh(), wait);
	}
}

