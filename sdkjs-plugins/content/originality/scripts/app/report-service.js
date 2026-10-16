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
/// <reference path="../report/report-document.js" />
/// <reference path="../report/report-download.js" />

/**
 * Keeps the last scan of this panel session and hands its report to the user as a file.
 */
class ReportService {

	constructor() {
		/** @type {ReportModel["scan"] | null} */
		this._scan = null;
	}

	/**
	 * @returns {boolean} whether there is a scan to report
	 */
	get hasContent() {
		return this._scan !== null;
	}

	/**
	 * @param {"document" | "selection"} scope
	 * @param {ScanResult} result
	 * @param {ScanFindings} findings
	 */
	rememberScan(scope, result, findings) {
		this._scan = { at: Date.now(), scope: scope, result: result, findings: findings };
	}

	export() {
		if (!this._scan)
			return;
		const plugin = window.Asc.plugin;
		const info = plugin.info;
		/** @type {ReportModel} */
		const model = {
			documentTitle : (info && info.documentTitle) || "",
			generatedAt   : Date.now(),
			generatedBy   : (info && info.userName) || "",
			scan          : this._scan,
		};
		const name = plugin.tr("Originality report") + " - " + (model.documentTitle || plugin.tr("Untitled document"))
			+ " - " + new Date(model.generatedAt).toISOString().slice(0, 10);
		ReportDownload.save(ReportDocument.render(model, (text) => plugin.tr(text)), name);
	}
}
