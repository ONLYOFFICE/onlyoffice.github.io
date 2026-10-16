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
/// <reference path="../ui/format.js" />

/**
 * @typedef {Object} ReportModel
 * @property {string} documentTitle
 * @property {number} generatedAt
 * @property {string} generatedBy
 * @property {{ at: number, scope: "document" | "selection", result: ScanResult, findings: ScanFindings }} scan
 */

/**
 * Renders the report of a scan as one self-contained HTML page: styles inline, no scripts, nothing loaded from
 * elsewhere, so it opens anywhere and prints as it looks. Everything that comes from the API or the
 * document is escaped; only web links are made links.
 */
const ReportDocument = Object.freeze({

	/**
	 * @param {ReportModel} model
	 * @param {(text: string) => string} tr
	 * @returns {string}
	 */
	render(model, tr) {
		const e = ReportDocument._escape;
		const title = tr("Originality report") + " — " + (model.documentTitle || tr("Untitled document"));

		return "<!DOCTYPE html>\n<html><head><meta charset=\"UTF-8\"><title>" + e(title) + "</title>"
			+ "<style>" + ReportDocument._styles + "</style></head><body>"
			+ "<header><h1>" + e(tr("Originality report")) + "</h1>"
			+ "<p class=\"meta\">" + e(model.documentTitle || tr("Untitled document")) + "<br>"
			+ e(tr("Generated")) + ": " + e(Format.dateTime(model.generatedAt))
			+ (model.generatedBy ? " · " + e(model.generatedBy) : "") + "</p></header>"
			+ ReportDocument._scan(model, tr)
			+ "<footer>" + e(tr("Made with the Originality.ai plugin for ONLYOFFICE.")) + "</footer>"
			+ "</body></html>";
	},

	/**
	 * @param {ReportModel} model
	 * @param {(text: string) => string} tr
	 * @returns {string}
	 * @private
	 */
	_scan(model, tr) {
		const e = ReportDocument._escape;
		let html = "<section><h2>" + e(tr("AI and plagiarism scan")) + "</h2>";
		const { at, scope, result, findings } = model.scan;
		html += "<p class=\"muted\">" + e(Format.dateTime(at)) + " · "
			+ e(tr(scope === "selection" ? "Selected text" : "Whole document")) + "</p>";

		if (result.ai) {
			const ai = Math.round(result.ai.ai * 100);
			html += "<h3>" + e(tr("AI detection")) + "</h3><table>"
				+ ReportDocument._row(tr("Original"), (100 - ai) + "%")
				+ ReportDocument._row(tr("AI"), ai + "%")
				+ ReportDocument._row(tr("Verdict"), tr(result.ai.ai >= 0.5 ? "Likely AI-generated" : "Likely original"))
				+ ReportDocument._row(tr("AI allowance"), result.ai.allowance === null ? "—" : result.ai.allowance + "%")
				+ "</table>";
			const flagged = findings.ai.filter((f) => f.flagged);
			if (flagged.length) {
				html += "<h4>" + e(tr("Sentences that look AI-generated")) + " (" + flagged.length + " / " + findings.ai.length + ")</h4><ol>"
					+ flagged.map((f) => "<li><b>" + Math.round(f.ai * 100) + "%</b> " + e(f.text.trim()) + "</li>").join("") + "</ol>";
			}
		} else if (result.errors.ai) {
			html += ReportDocument._failed(tr("AI detection"), result.errors.ai, tr);
		}

		if (result.plagiarism) {
			html += "<h3>" + e(tr("Plagiarism")) + "</h3><table>"
				+ ReportDocument._row(tr("Matching text"), Math.round(result.plagiarism.score) + "%") + "</table>";
			if (result.plagiarism.sources.length) {
				html += "<h4>" + e(tr("Sources")) + "</h4><ol>" + result.plagiarism.sources.map((source) =>
					"<li>" + ReportDocument._link(source.url, source.title) + " — " + e(tr("Matches")) + ": " + source.matches.length
					+ "<ul>" + source.matches.map((m) => "<li class=\"quote\">" + e(m.phrase) + "</li>").join("") + "</ul></li>").join("") + "</ol>";
			}
		} else if (result.errors.plagiarism) {
			html += ReportDocument._failed(tr("Plagiarism"), result.errors.plagiarism, tr);
		}

		if (result.readability) {
			const r = result.readability;
			html += "<h3>" + e(tr("Readability")) + "</h3><table>"
				+ (r.fleschReadingEase !== null ? ReportDocument._row(tr("Flesch reading ease"), r.fleschReadingEase + " — " + tr(Format.readingEase(r.fleschReadingEase))) : "")
				+ (r.fleschGradeLevel !== null ? ReportDocument._row(tr("Grade level"), String(r.fleschGradeLevel)) : "")
				+ "</table>";
		}

		if (result.facts && result.facts.length) {
			html += "<h3>" + e(tr("Fact check")) + "</h3><ol>" + result.facts.map((f) =>
				"<li><b>" + e(f.truthfulness) + "</b> " + e(f.fact) + "<br><span class=\"muted\">" + e(f.explanation) + "</span></li>").join("") + "</ol>";
		}

		const details = [];
		if (result.creditsUsed !== null)
			details.push(e(tr("Credits used")) + ": " + result.creditsUsed);
		if (result.publicLink)
			details.push(ReportDocument._link(result.publicLink, tr("The report on Originality.ai")));
		if (details.length)
			html += "<p class=\"muted\">" + details.join(" · ") + "</p>";

		return html + "</section>";
	},

	/**
	 * @param {string} label
	 * @param {string} value
	 * @returns {string}
	 * @private
	 */
	_row(label, value) {
		return "<tr><th>" + ReportDocument._escape(label) + "</th><td>" + ReportDocument._escape(value) + "</td></tr>";
	},

	/**
	 * @param {string} check
	 * @param {string} message
	 * @param {(text: string) => string} tr
	 * @returns {string}
	 * @private
	 */
	_failed(check, message, tr) {
		const e = ReportDocument._escape;
		return "<h3>" + e(check) + "</h3><p class=\"error\">" + e(tr("This check failed")) + ": " + e(message) + "</p>";
	},

	/**
	 * @param {string} url
	 * @param {string} text
	 * @returns {string} a link for a web address, plain text for anything else
	 * @private
	 */
	_link(url, text) {
		const e = ReportDocument._escape;
		return /^https?:\/\//i.test(url) ? "<a href=\"" + e(url) + "\">" + e(text) + "</a>" : e(text);
	},

	/**
	 * @param {string} value
	 * @returns {string}
	 * @private
	 */
	_escape(value) {
		return String(value)
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;");
	},

	/** @private */
	_styles: [
		"body{font:14px/1.5 -apple-system,'Segoe UI',Arial,sans-serif;color:#222;max-width:780px;margin:32px auto;padding:0 24px}",
		"h1{font-size:24px;margin:0 0 4px}h2{font-size:18px;margin:28px 0 8px;padding-bottom:4px;border-bottom:1px solid #ddd}",
		"h3{font-size:15px;margin:18px 0 6px}h4{font-size:14px;margin:12px 0 4px}",
		"table{border-collapse:collapse;margin:4px 0}th{text-align:left;font-weight:normal;color:#666;padding:2px 24px 2px 0}td{padding:2px 0}",
		".meta,.muted{color:#666}.error{color:#c0392b}",
		".quote{white-space:pre-wrap;border-left:3px solid #ddd;padding-left:8px;margin:4px 0;color:#444}",
		"ol,ul{padding-left:22px}li{margin:4px 0}a{color:#1b55c1}",
		"footer{margin-top:32px;color:#999;font-size:12px}",
		"@media print{body{margin:0}a{color:inherit}}",
	].join(""),
});
