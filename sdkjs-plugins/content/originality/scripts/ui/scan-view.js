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

/// <reference path="../app/scan-service.js" />
/// <reference path="../app/highlight-service.js" />
/// <reference path="../domain/scan-findings.js" />
/// <reference path="./scan-result-view.js" />

/**
 * The Scan tab: the two scan buttons, progress while a scan runs, and then either the result or
 * why there is none. The findings of the result are marked in the document where the editor can
 * do that, and choosing one in the panel selects it in the text.
 */
class ScanView {

	/**
	 * @param {ScanService} service
	 * @param {HighlightService} highlights
	 * @param {{
	 *   onScanned: (scope: ScanScope, result: ScanResult, findings: ScanFindings) => void,
	 *   onExportReport: () => void,
	 * }} callbacks
	 */
	constructor(service, highlights, callbacks) {
		this._service = service;
		this._highlights = highlights;
		this._onScanned = callbacks.onScanned;
		const tr = window.Asc.plugin.tr;

		this._documentButton = new Button("scan-document", { variant: "primary", text: tr("Scan document") });
		this._documentButton.subscribe((event) => {
			if (event.type === "button:click")
				this._scan("document");
		});
		this._selectionButton = new Button("scan-selection", { variant: "secondary", text: tr("Scan selection") });
		this._selectionButton.subscribe((event) => {
			if (event.type === "button:click")
				this._scan("selection");
		});

		/** @type {Message | null} */
		this._message = null;
		/** whether the message shown is the one about a missing API key */
		this._showsNoKey = false;
		/** whether scans are kept on Originality.ai, as the settings last said */
		this._storeScan = true;
		this._loader = new Loader("scan-loader", tr("Scanning… A plagiarism check can take up to a minute."));
		this._loader.hide();
		this._result = new ScanResultView(/** @type {HTMLElement} */ (document.getElementById("scan-result")), {
			onSelect: (finding) => this._select(finding),
		});

		this._highlightBar = /** @type {HTMLElement} */ (document.getElementById("scan-highlights"));
		this._highlightStatus = /** @type {HTMLElement} */ (document.getElementById("highlights-status"));
		this._clearButton = new Button("clear-highlights", { variant: "secondary", text: tr("Clear marks") });
		this._clearButton.subscribe((event) => {
			if (event.type === "button:click")
				this._clearHighlights();
		});

		// nothing to report until something is scanned or recorded; the caller says when
		const exportButton = new Button("export-report-scan", { variant: "secondary", text: tr("Export report"), disabled: true });
		this._exportButton = exportButton;
		exportButton.subscribe((event) => {
			if (event.type === "button:click")
				callbacks.onExportReport();
		});

		this._isScanning = false;
	}

	/**
	 * @param {boolean} enabled - whether the report has anything to show
	 */
	setExportEnabled(enabled) {
		if (enabled)
			this._exportButton.enable();
		else
			this._exportButton.disable();
	}

	/**
	 * @param {"error" | "warning" | "info" | "success"} type
	 * @param {string} title
	 * @param {string} text
	 * @private
	 */
	_showMessage(type, title, text) {
		// a message shown where one already is takes its place
		this._message = new Message("scan-message", {
			type                : type,
			title               : title,
			text                : text,
			closeButton         : true,
			closeOnClickOutside : false,
		}).show();
		this._showsNoKey = false;
	}

	/** @private */
	_hideMessage() {
		if (this._message)
			this._message.close();
		this._message = null;
		this._showsNoKey = false;
	}

	/**
	 * A mark was clicked in the document: show its finding.
	 * @param {string} findingId
	 */
	revealFinding(findingId) {
		this._result.markActive(findingId);
	}

	/**
	 * Without an API key there is nothing to scan with; say so up front.
	 * @param {PluginSettings} settings
	 */
	onSettingsChanged(settings) {
		this._storeScan = settings.storeScan;
		if (this._isScanning)
			return;

		// only the message about the key goes with the key: a scan's error stays when other settings change
		if (settings.apiKey) {
			if (this._showsNoKey)
				this._hideMessage();
		} else if (!this._showsNoKey) {
			const tr = window.Asc.plugin.tr;
			this._showMessage("info", tr("No API key"), tr("Add your Originality.ai API key in Settings."));
			this._showsNoKey = true;
		}
	}

	/**
	 * @param {ScanScope} scope
	 * @private
	 */
	async _scan(scope) {
		if (this._isScanning)
			return;

		this._setScanning(true);
		this._hideMessage();
		this._result.clear();
		await this._clearHighlights();

		try {
			const result = await this._service.scan(scope);
			const findings = ScanFindings.fromResult(result);
			this._result.show(result, findings);
			this._onScanned(scope, result, findings);
			await this._showHighlights(findings);
		} catch (e) {
			this._showError(e);
		} finally {
			this._setScanning(false);
		}
	}

	/**
	 * @param {ScanFindings} findings
	 * @private
	 */
	async _showHighlights(findings) {
		const tr = window.Asc.plugin.tr;
		const markable = findings.ai.filter((f) => f.flagged).length + findings.plagiarism.length;
		if (!markable || !(await this._highlights.isSupported()))
			return;

		const marked = await this._highlights.show(findings);
		this._highlightStatus.textContent = marked
			? tr("Marked in the document") + ": " + marked + " / " + markable
			: tr("The passages were not found in the document; it may have changed since the scan.");
		this._highlightBar.classList.remove("hidden");
	}

	/** @private */
	async _clearHighlights() {
		this._highlightBar.classList.add("hidden");
		await this._highlights.clear();
	}

	/**
	 * @param {ScanFinding} finding
	 * @private
	 */
	async _select(finding) {
		const tr = window.Asc.plugin.tr;
		if (!(await this._highlights.select(finding)))
			this._showMessage("info", tr("Not found"), tr("This passage is not in the document any more."));
		else
			this._hideMessage();
	}

	/**
	 * @param {unknown} error
	 * @private
	 */
	_showError(error) {
		const tr = window.Asc.plugin.tr;
		if (error instanceof ScanInputError) {
			this._showMessage("warning", tr("Cannot scan yet"), tr(error.message));
		} else if (error instanceof OriginalityApiError && error.mayHaveRun) {
			this._showMessage("warning", tr("Originality.ai took too long to answer"), [
				tr("The scan may still have finished and used credits."),
				this._storeScan ? tr("If it did, you will find it in your Originality.ai account.") : "",
				tr("Try again with a shorter selection."),
			].filter(Boolean).join(" "));
		} else if (error instanceof OriginalityApiError) {
			// the API's own wording is English and specific ("Invalid API Key", "insufficient credits")
			this._showMessage("error", tr("Originality.ai could not scan the text"),
				error.status ? error.message : tr(error.message));
		} else {
			this._showMessage("error", tr("Something went wrong"), error instanceof Error ? error.message : String(error));
		}
	}

	/**
	 * @param {boolean} isScanning
	 * @private
	 */
	_setScanning(isScanning) {
		this._isScanning = isScanning;
		if (isScanning) {
			this._documentButton.disable();
			this._selectionButton.disable();
			this._loader.show();
		} else {
			this._documentButton.enable();
			this._selectionButton.enable();
			this._loader.hide();
		}
	}
}
