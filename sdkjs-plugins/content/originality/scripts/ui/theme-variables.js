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

/**
 * Carries the editor theme into a plugin page, the way the AI plugin does: every colour of the
 * theme becomes a CSS custom property of the same name (`background-normal` →
 * `--background-normal`, `RulerDark` → `--ruler-dark`), and the body gets the theme name and a
 * `theme-type-light|dark` class.
 *
 * `onThemeChangedBase` already styles the stock `asc-plugin` classes; this covers the page's own.
 */
const ThemeVariables = Object.freeze({

	_styleId    : "theme-variables",
	_colorRegex : /^(#([0-9a-f]{3}){1,2}|rgba?\([^)]+\)|hsl\([^)]+\))$/i,

	/**
	 * @param {AscTheme} theme
	 */
	apply(theme) {
		if (!theme)
			return;

		this._applyVariables(/** @type {Record<string, unknown>} */ (/** @type {unknown} */ (theme)));
		this._applyBodyClasses(theme.type, theme.name);
	},

	/**
	 * @param {Record<string, unknown>} theme
	 * @private
	 */
	_applyVariables(theme) {
		const previous = document.getElementById(this._styleId);
		if (previous)
			previous.remove();

		let rules = ":root {\n";
		for (const key in theme) {
			const value = theme[key];
			if (typeof value === "string" && this._colorRegex.test(value))
				rules += "\t--" + key.replace(/([A-Z])/g, "-$1").toLowerCase() + ": " + value + ";\n";
		}
		rules += "}";

		const style = document.createElement("style");
		style.id = this._styleId;
		style.textContent = rules;
		document.head.appendChild(style);
	},

	/**
	 * @param {string} type
	 * @param {string} name
	 * @private
	 */
	_applyBodyClasses(type, name) {
		const body = document.body;
		Array.from(body.classList)
			.filter((className) => className.indexOf("theme-") === 0)
			.forEach((className) => body.classList.remove(className));

		if (name)
			body.classList.add(name);
		if (type)
			body.classList.add("theme-type-" + type);
	},
});
