/*
 * (c) Copyright Ascensio System SIA 2010-2025
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

/// <reference path="./types.js" />

function CustomAnnotator()
{
	this.paragraphs = {};
	this.waitParagraphs = {};
	this.paraToCheck = new Set();
	this.checked = new Set(); // was checked on the previous request
	
	this.type = -1;
}
CustomAnnotator.prototype.onChangeParagraph = async function(paraId, recalcId, text, ranges)
{
	this._handleNewRanges(ranges, paraId, text);
	this.waitParagraphs[paraId] = {
		recalcId : recalcId,
		text : text
	};
	
	this._checkParagraph(paraId);
};
CustomAnnotator.prototype.onClick = function(paraId, ranges)
{
	if (!ranges || !ranges.length)
		this._closePopup();
	else
		this._openPopup(paraId, ranges[0]);
};
CustomAnnotator.prototype.onBlur = function()
{
	this._closePopup();
};
CustomAnnotator.prototype.checkParagraphs = async function(paraIds)
{
	this.paraToCheck.clear()
	paraIds.forEach(function(paraId) {
		if (!this.checked.has(paraId) || this.waitParagraphs[paraId]) {
			this.paraToCheck.add(paraId);
			this._checkParagraph(paraId);
		}	
	}, this);
};
CustomAnnotator.prototype._checkParagraph = async function(paraId)
{
	if (!this.paraToCheck.has(paraId) || !this.waitParagraphs[paraId]) {
		return;
	}
	
	let recalcId = this.waitParagraphs[paraId].recalcId;
	let text = this.waitParagraphs[paraId].text;

	// TODO: Temporarily for simplicity
	let range = this.getAnnotationRangeObj(paraId);
	range["rangeId"] = undefined;
	range["all"] = true;
	await Asc.Editor.callMethod("RemoveAnnotationRange", [range]);
	await this.annotateParagraph(paraId, recalcId, text);
	
	delete this.waitParagraphs[paraId];
	this.paraToCheck.delete(paraId);
	
	this.checked.add(paraId);
};
CustomAnnotator.prototype.annotateParagraph = async function(paraId, recalcId, text)
{
};
CustomAnnotator.prototype._openPopup = async function(paraId, rangeId)
{
	if (!customAnnotationPopup)
		return;

	/** @type {InfoForPopup} */
	const popupInfo = this.getInfoForPopup(paraId, rangeId);
		
	let popup = customAnnotationPopup.open(this.type, paraId, rangeId, popupInfo);
	if (!popup)
		return;

	let _t = this;
	popup.onAccept = async function() {
		await _t.onAccept(paraId, rangeId);
		_t._closePopup();
	};
	popup.onReject = async function() {
		await _t.onReject(paraId, rangeId);
		_t._closePopup();
	};
};
CustomAnnotator.prototype._closePopup = function()
{
	if (!customAnnotationPopup)
		return;
	
	customAnnotationPopup.close(this.type);
};
CustomAnnotator.prototype.getInfoForPopup = function(paraId, rangeId)
{
	return {};
};
CustomAnnotator.prototype.onAccept = async function(paraId, rangeId)
{
};
CustomAnnotator.prototype.onReject = async function(paraId, rangeId)
{
	let range = this.getAnnotationRangeObj(paraId, rangeId);
	await Asc.Editor.callMethod("RemoveAnnotationRange", [range]);
};
CustomAnnotator.prototype.getAnnotation = function(paraId, rangeId)
{
	if (!paraId || !rangeId || !this.paragraphs[paraId] || !this.paragraphs[paraId][rangeId])
		return {};
	
	return this.paragraphs[paraId][rangeId];
};
CustomAnnotator.prototype.getAnnotationRangeObj = function(paraId, rangeId)
{
	return {
		"paragraphId" : paraId,
		"rangeId" : rangeId
	};
};
CustomAnnotator.prototype._handleNewRanges = function(ranges, paraId, text)
{
	if (!ranges || !Array.isArray(ranges))
		return;

	for (let i = 0; i < ranges.length; ++i)
	{
		this._handleNewRangePositions(ranges[i], paraId, text);
	}
};
CustomAnnotator.prototype._handleNewRangePositions = function(range, paraId, text)
{
};
/**
 * @param {string} str 
 * @param {string} searchStr 
 * @param {string} [fromIndex] 
 * @returns {number}
 */
CustomAnnotator.prototype.simpleGraphemeIndexOf = function(str, searchStr, fromIndex = 0) {
    const codeUnitIndex = str.indexOf(searchStr, fromIndex);
	if (codeUnitIndex < 2) {
		return codeUnitIndex;
	}
	const adjustedIndex = adjustIndexForSurrogates(str, codeUnitIndex);
		
	function adjustIndexForSurrogates(str, codeUnitIndex) {
		let surrogateCount = 0;
		for (let i = 0; i < codeUnitIndex; i++) {
			const code = str.charCodeAt(i);
			if (code >= 0xD800 && code <= 0xDBFF) {
				surrogateCount++;
			}
		}
		return codeUnitIndex - surrogateCount;
	}
	return adjustedIndex;
}
