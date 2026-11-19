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

const test = require("node:test");
const assert = require("node:assert");
const { loadScripts } = require("./load-scripts");

const { ScanResult, ScanFindings, ReportDocument } = loadScripts(
	["domain/scan-result", "domain/scan-findings", "ui/format", "report/report-document"],
	["ScanResult", "ScanFindings", "ReportDocument"]);

/**
 * @param {unknown} response
 * @param {string[]} requested
 * @returns {string} the report's body text, tags and spacing aside
 */
function report(response, requested) {
	const result = ScanResult.fromResponse(response, requested);
	const html = ReportDocument.render({
		documentTitle : "Doc",
		generatedAt   : 0,
		generatedBy   : "",
		scan          : { at: 0, scope: "document", result: result, findings: ScanFindings.fromResult(result) },
	}, (/** @type {string} */ text) => text);
	return html.slice(html.indexOf("<body>")).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
}

test("a readability or fact check that failed says so in the report", () => {
	const text = report({ results: { readability: { error: "busy" }, facts: { error: "quota" } } }, ["readability", "facts"]);
	assert.match(text, /Readability This check failed: busy/);
	assert.match(text, /Fact check This check failed: quota/);
});

test("an answer the plugin could not read is a failed check in the report, not a missing one", () => {
	const text = report({ results: {} }, ["readability", "facts"]);
	assert.match(text, new RegExp("Readability This check failed: " + ScanResult.unreadable.replace(/\./g, "\.")));
	assert.match(text, new RegExp("Fact check This check failed: " + ScanResult.unreadable.replace(/\./g, "\.")));
});

test("a fact check with nothing to check says so; a check not asked for has no section", () => {
	assert.match(report({ results: { facts: [] } }, ["facts"]), /Fact check No statements to check\./);
	const text = report({ results: { readability: { error: "not selected" }, facts: { error: "not selected" } } }, []);
	assert.doesNotMatch(text, /Readability|Fact check/);
});
