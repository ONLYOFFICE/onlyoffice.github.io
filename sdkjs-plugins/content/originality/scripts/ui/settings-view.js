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

/// <reference path="../settings/settings-store.js" />
/// <reference path="../service/originality-client.js" />

/**
 * The settings page: shows the stored settings in the controls of `index.html` and stores every
 * change at once. How the balance is fetched is the caller's business.
 */
class SettingsView {

	/** how long after the last change to the key it is checked */
	static _keyCheckMs = 1000;

	/**
	 * @param {SettingsStore} store
	 * @param {{
	 *   checkBalance: (apiKey: string) => Promise<CreditBalance>,
	 *   onChange: (settings: PluginSettings) => void,
	 * }} callbacks
	 */
	constructor(store, callbacks) {
		this._store = store;
		this._checkBalance = callbacks.checkBalance;
		this._onChange = callbacks.onChange;
		this._settings = store.load();

		const tr = window.Asc.plugin.tr;

		if (!this._settings.hideStartNotice) {
			const notice = /** @type {HTMLElement} */ (document.getElementById("settings-notice"));
			new Message(notice, {
				type                : "warning",
				title               : tr("Before you start"),
				text                : tr("The Originality.ai API is available on the Enterprise plan. Every scan spends credits, and by default Originality.ai tops credits up automatically from your card."),
				closeButton         : true,
				closeOnClickOutside : false,
			}).show();
			// the message tells nobody it was closed; its cross is the only way to close this one
			notice.addEventListener("click", (event) => {
				if (event.target instanceof Element && event.target.closest(".message-close"))
					this._settings = this._store.update({ hideStartNotice: true });
			});
		}

		this._apiKey = new InputField("api-key", {
			type        : "password",
			placeholder : tr("Paste your API key"),
			value       : this._settings.apiKey,
			showClear   : false,
		});
		this._keyStatus = /** @type {HTMLElement} */ (document.getElementById("api-key-status"));
		/** @type {ReturnType<typeof setTimeout> | null} */
		this._keyTimer = null;
		/** the key in the field; stored only once Originality.ai has accepted it */
		this._typedKey = this._settings.apiKey;
		this._apiKey.subscribe((event) => {
			if (event.type !== "inputfield:input" && event.type !== "inputfield:change")
				return;
			const apiKey = event.detail.value.trim();
			if (apiKey === this._typedKey)
				return;
			this._typedKey = apiKey;
			// until the new key is accepted the panel has none, rather than the old one unseen
			if (this._settings.apiKey)
				this._update({ apiKey: "" });
			this._checkKeySoon();
		});

		// the key's field is a password field, which the browser wants in a form; the form is never sent
		/** @type {HTMLFormElement} */ (document.getElementById("api-key-form")).addEventListener("submit", (event) => event.preventDefault());

		this._balanceButton = new Button("check-balance", { variant: "secondary", text: tr("Check balance") });
		this._balanceButton.subscribe((event) => {
			if (event.type === "button:click")
				this._showBalance();
		});
		this._balance = /** @type {HTMLElement} */ (document.getElementById("balance"));

		this._model = new SelectBox("ai-model", { placeholder: "" });
		this._model.addItems([
			["standard", tr("Standard (English)")],
			["multilang", tr("Multilingual")],
		], this._settings.aiModel);
		this._model.subscribe((event) => {
			if (event.type === "selectbox:change")
				this._update({ aiModel: String(event.detail.current) === "multilang" ? "multilang" : "standard" });
		});

		this._allowance = new SelectBox("ai-allowance", { placeholder: "" });
		this._allowance.addItems(SettingsStore.allowanceLevels.map((level) => [String(level), this._allowanceText(level)]),
			String(this._settings.aiAllowance));
		this._allowance.subscribe((event) => {
			if (event.type === "selectbox:change")
				this._update({ aiAllowance: Number(event.detail.current) });
		});

		this._bindCheckbox("check-ai", tr("AI detection"), "checkAi");
		this._bindCheckbox("check-plagiarism", tr("Plagiarism"), "checkPlagiarism");
		this._bindCheckbox("check-readability", tr("Readability"), "checkReadability");
		this._bindCheckbox("check-facts", tr("Fact check"), "checkFacts");
		this._bindCheckbox("store-scan", tr("Store scans on Originality.ai"), "storeScan");

		this._excludedUrls = /** @type {HTMLTextAreaElement} */ (document.getElementById("excluded-urls"));
		this._excludedUrls.value = this._settings.excludedUrls.join("\n");
		this._excludedUrls.addEventListener("change", () => {
			this._update({ excludedUrls: this._excludedUrls.value.split(/\r?\n/) });
		});

		this._syncAvailability();
	}

	/**
	 * @param {string} id
	 * @param {string} label
	 * @param {"checkAi" | "checkPlagiarism" | "checkReadability" | "checkFacts" | "storeScan"} key
	 * @private
	 */
	_bindCheckbox(id, label, key) {
		const checkbox = new Checkbox(id, { label: label, checked: this._settings[key] });
		checkbox.subscribe((event) => {
			if (event.type === "checkbox:change")
				this._update({ [key]: event.detail.checked });
		});
	}

	/**
	 * @param {Partial<PluginSettings>} change
	 * @private
	 */
	_update(change) {
		this._settings = this._store.update(change);
		this._syncAvailability();
		this._onChange(this._settings);
	}

	/**
	 * The allowance applies to the standard model's AI score only.
	 * @private
	 */
	_syncAvailability() {
		const allowanceApplies = this._settings.checkAi && this._settings.aiModel === "standard";
		allowanceApplies ? this._allowance.enable() : this._allowance.disable();
		this._settings.apiKey ? this._balanceButton.enable() : this._balanceButton.disable();
	}

	/**
	 * Checks the key once the user stops typing it; a key typed meanwhile cancels the check.
	 * @private
	 */
	_checkKeySoon() {
		if (this._keyTimer)
			clearTimeout(this._keyTimer);
		this._keyTimer = null;
		this._showKeyStatus("", false);
		const apiKey = this._typedKey;
		if (apiKey)
			this._keyTimer = setTimeout(() => this._checkKey(apiKey), SettingsView._keyCheckMs);
	}

	/**
	 * Asks for the balance with the key, which costs nothing: a balance means the key works, and
	 * only then is it stored. Originality.ai answers a key it does not know as one without API
	 * access.
	 * @param {string} apiKey
	 * @private
	 */
	async _checkKey(apiKey) {
		const tr = window.Asc.plugin.tr;
		this._keyTimer = null;
		if (!OriginalityClient.acceptsKey(apiKey)) {
			this._showKeyStatus(tr("An API key has Latin letters and digits only. Check the keyboard layout."), true);
			return;
		}
		this._showKeyStatus(tr("Checking the key…"), false);
		try {
			const balance = await this._checkBalance(apiKey);
			if (apiKey !== this._typedKey)
				return;
			this._update({ apiKey: apiKey });
			this._showKeyStatus(tr("The key works.") + " " + tr("Credits") + ": " + balance.credits.toLocaleString(), false);
		} catch (e) {
			if (apiKey !== this._typedKey)
				return;
			if (e instanceof OriginalityApiError && e.status)
				this._showKeyStatus(tr("The key was not accepted") + ": " + e.message, true);
			else
				this._showKeyStatus(tr("The key was not checked: Originality.ai did not answer. Check the internet connection."), true);
		}
	}

	/**
	 * @param {string} text - empty to hide the status
	 * @param {boolean} isError
	 * @private
	 */
	_showKeyStatus(text, isError) {
		this._keyStatus.textContent = text;
		this._keyStatus.classList.toggle("hidden", !text);
		this._keyStatus.classList.toggle("field__hint--error", isError);
	}

	/** @private */
	async _showBalance() {
		const tr = window.Asc.plugin.tr;
		this._balance.textContent = "";
		this._balanceButton.startLoading();
		try {
			const balance = await this._checkBalance(this._settings.apiKey);
			this._balance.textContent = tr("Credits") + ": " + balance.credits.toLocaleString()
				+ (balance.subscriptionCredits ? " · " + tr("subscription") + ": " + balance.subscriptionCredits.toLocaleString() : "");
		} catch (e) {
			this._balance.textContent = tr(e instanceof Error ? e.message : "Request failed");
		} finally {
			this._balanceButton.stopLoading();
		}
	}

	/**
	 * @param {number} level
	 * @returns {string}
	 * @private
	 */
	_allowanceText(level) {
		const tr = window.Asc.plugin.tr;
		return level === 0 ? tr("0% — any AI use counts") : level + "%";
	}
}
