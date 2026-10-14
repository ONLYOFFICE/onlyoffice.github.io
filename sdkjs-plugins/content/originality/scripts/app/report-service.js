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

/// <reference path="../domain/scan-result.js" />
/// <reference path="../domain/scan-findings.js" />
/// <reference path="../domain/typing-analysis.js" />
/// <reference path="../domain/writers.js" />
/// <reference path="../domain/tracked-changes.js" />
/// <reference path="../report/report-document.js" />
/// <reference path="../report/report-download.js" />
/// <reference path="./writing-history-service.js" />
/// <reference path="./review-watcher.js" />

/**
 * Puts the report together — the last scan of this panel session, one writer's writing record and
 * the document's tracked changes — and hands it to the user as a file.
 */
class ReportService {

	/**
	 * @param {WritingHistoryService} history
	 * @param {ReviewWatcher} reviews
	 */
	constructor(history, reviews) {
		this._history = history;
		this._reviews = reviews;
		/** @type {ReportModel["scan"]} */
		this._scan = null;
	}

	/**
	 * @param {"document" | "selection"} scope
	 * @param {ScanResult} result
	 * @param {ScanFindings} findings
	 */
	rememberScan(scope, result, findings) {
		this._scan = { at: Date.now(), scope: scope, result: result, findings: findings };
	}

	/**
	 * @param {string | null} writerId - whose writing goes into the report; null for the most active
	 * @returns {Promise<void>}
	 */
	async export(writerId) {
		const plugin = window.Asc.plugin;
		const model = this._model(writerId, await this._reviews.refresh());
		const name = plugin.tr("Originality report") + " - " + (model.documentTitle || plugin.tr("Untitled document"))
			+ " - " + new Date(model.generatedAt).toISOString().slice(0, 10);
		ReportDownload.save(ReportDocument.render(model, (text) => plugin.tr(text)), name);
	}

	/**
	 * @param {string | null} writerId
	 * @param {ReviewRecord[]} reviewRecords
	 * @returns {ReportModel}
	 * @private
	 */
	_model(writerId, reviewRecords) {
		const info = window.Asc.plugin.info;
		const sessions = this._history.sessions;
		const writers = Writers.of(sessions);
		const tracked = TrackedChanges.summarize(reviewRecords, sessions);
		const writer = writers.find((w) => w.id === writerId) || writers[0] || null;

		return {
			documentTitle : (info && info.documentTitle) || "",
			generatedAt   : Date.now(),
			generatedBy   : (info && info.userName) || "",
			scan          : this._scan,
			writing       : writer ? {
				writerName   : writer.name,
				summary      : TypingAnalysis.summarize(writer.sessions),
				otherWriters : writers.filter((w) => w !== writer).map((w) => w.name),
			} : null,
			tracked       : tracked.changes ? tracked : null,
		};
	}
}
