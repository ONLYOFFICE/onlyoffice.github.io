/*
 * (c) Copyright Ascensio System SIA 2010
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
(function(window, undefined){

	const plugin = window.Asc.plugin;

	let isPaused = false;

	function getInputs()
	{
		return Array.from(document.querySelectorAll("#settings input"));
	}

	function isCheck(input)
	{
		return input.type == "checkbox";
	}

	function readSettings()
	{
		const settings = {};
		getInputs().forEach(function(input) {
			settings[input.id] = isCheck(input) ? input.checked : parseInt(input.value);
		});
		return settings;
	}

	function showSettings(settings)
	{
		getInputs().forEach(function(input) {
			if (isCheck(input))
				input.checked = settings[input.id];
			else
				input.value = settings[input.id];
		});
	}

	// these texts change, so they are translated here and not with the others
	function showPaused()
	{
		document.getElementById("pauseState").innerText = plugin.tr(isPaused ? "Suggestions are paused" : "Suggestions are switched on");
		document.getElementById("togglePause").innerText = plugin.tr(isPaused ? "Resume" : "Pause");
	}

	function onChange()
	{
		plugin.sendToPlugin("onChange", readSettings());
	}

	plugin.init = function()
	{
		plugin.attachEvent("onSettings", function(settings) {
			showSettings(settings);
			onChange();
		});
		plugin.attachEvent("onPaused", function(paused) {
			isPaused = paused;
			showPaused();
		});
		plugin.attachEvent("onListCounts", function(counts) {
			for (const name in counts)
				document.getElementById(name + "Count").innerText = counts[name];
		});

		getInputs().forEach(function(input) {
			input.addEventListener("change", onChange);
			input.addEventListener("input", onChange);
		});
		Array.from(document.querySelectorAll("[data-edit]")).forEach(function(button) {
			button.addEventListener("click", function() {
				plugin.sendToPlugin("onEditList", button.dataset.edit);
			});
		});
		document.getElementById("togglePause").addEventListener("click", function() {
			plugin.sendToPlugin("onTogglePause");
		});
		document.getElementById("resetLearned").addEventListener("click", function() {
			plugin.sendToPlugin("onResetLearned");
		});

		showPaused();
		plugin.sendToPlugin("onInit");
	};

	plugin.onTranslate = function()
	{
		Array.from(document.querySelectorAll(".i18n")).forEach(function(element) {
			element.innerText = plugin.tr(element.innerText);
		});
		showPaused();
	};

	plugin.onThemeChanged = function(theme)
	{
		plugin.onThemeChangedBase(theme);
	};

})(window, undefined);
