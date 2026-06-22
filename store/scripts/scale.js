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

const Scale = {
	/** @type {any} */
	PsMain: null,       // scroll for list of plugins
	percent  : '100%', // current scale in percent
	_value    : 1,      // current scale value
	devicePR : 1,       // device pixel ratio
	_supportedScaleValues: [1, 1.25, 1.5, 1.75, 2], // supported scale
	calculateScale: function() {
		let bestIndex = 0;
		this.devicePR = window.devicePixelRatio;
		let bestDistance = Math.abs(this._supportedScaleValues[0] - this.devicePR);
		let currentDistance = 0;
		for (let i = 1, len = this._supportedScaleValues.length; i < len; i++) {
			if (Math.abs(this._supportedScaleValues[i] - this.devicePR) > 0.0001) {
				if ( (this._supportedScaleValues[i] - 0.0501) > (this.devicePR - 0.0001))
					break;
			}

			currentDistance = Math.abs(this._supportedScaleValues[i] - this.devicePR);
			if (currentDistance < (bestDistance - 0.0001)) {
				bestDistance = currentDistance;
				bestIndex = i;
			}
		}
		this.percent = this._supportedScaleValues[bestIndex] * 100 + '%';
		this._value = this._supportedScaleValues[bestIndex];
	},
	/** @param {boolean} bForce */
	onResize: function(bForce) {
		if (this.devicePR !== window.devicePixelRatio || bForce) {
			/** @type {HTMLElement} */
			let html = document.documentElement;
			this.devicePR = window.devicePixelRatio;
			let revZoom = 1 / this.devicePR;
			if (this.devicePR > 2)
				revZoom *= 2;

			if (1 <= this.devicePR && this.devicePR <= 2) {
				// set height for div with image in preview mode
				this.updateScroll();
				if (this.devicePR < 1)
					return;

				this.calculateScale();
				html.setAttribute('style', '');
			} else if (this.devicePR < 1) {
				html.style.zoom = String(revZoom);
			}
			let borderWidth = (revZoom > 1 ? 1 : revZoom);
			const pluginPlates = document.querySelectorAll('.plugin-plate');
			for (let i = 0; i < pluginPlates.length; i++) {
				const element = /** @type {HTMLElement} */ (pluginPlates[i]);
				element.style.borderWidth = borderWidth + 'px';
			}
		}
	},
	
	updateScroll: function() {
		if (!this.PsMain) {
			// @ts-ignore
			this.PsMain = new PerfectScrollbar('.plugins-container', {});
		}
		this.PsMain.update();
	}

};

Scale.calculateScale();

window.onresize = Scale.onResize.bind(Scale, false);

// zoom on start if we start with a non 100% zoom
if (Scale.devicePR < 1) {
	Scale.onResize(true);
}
