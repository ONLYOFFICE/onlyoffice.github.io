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

/// <reference path="./annotation-popup.js" />

/** @param {TextAnnotationPopup} annotatorPopup */
function TextAnnotator(annotatorPopup)
{
	this.annotatorPopup = annotatorPopup;
	this.paraId = null;
	this.rangeId = null;
	
	this.paragraphs = {};
	/** @type {Object.<string, {recalcId: string, text: string}>} */
	this.waitParagraphs = {};
	this.paraToCheck = new Set();
	/** @type {Set<string>} */
	this.checked = new Set(); // was checked on the previous request
	
	this.type = -1;
}
/**
 * @param {string} paraId 
 * @param {string} recalcId 
 * @param {string} text
 * @param {string[]} ranges
 * @returns {Promise<boolean | null>}
 */
TextAnnotator.prototype.onChangeParagraph = async function(paraId, recalcId, text, ranges)
{
	await this._handleNewRanges(ranges, paraId, text);
	this.waitParagraphs[paraId] = {
		recalcId : recalcId,
		text : text
	};
	
	return this._checkParagraph(paraId);
};
/**
 * @param {string[]} paraIds 
 * @returns {Promise<Array<boolean | null>>}
 */
TextAnnotator.prototype.checkParagraphs = async function(paraIds)
{
	this.paraToCheck.clear()
	let _t = this;
	paraIds.forEach(function(paraId) {
		if (!_t.checked.has(paraId) || _t.waitParagraphs[paraId])
			_t.paraToCheck.add(paraId);
	});
	
	/** @type {Promise<boolean | null>[]} */
	const promises = [];
	this.paraToCheck.forEach(paraId => {promises.push(this._checkParagraph(paraId))});
	return Promise.all(promises);
};
/**
 * @param {string} paraId 
 * @returns {Promise<boolean | null>}
 */
TextAnnotator.prototype._checkParagraph = async function(paraId)
{
	if (!this.paraToCheck.has(paraId) || !this.waitParagraphs[paraId])
		return false;
	
	let recalcId = this.waitParagraphs[paraId].recalcId;
	let text = this.waitParagraphs[paraId].text;
	
	// TODO: Temporarily for simplicity
	let range = this.getAnnotationRangeObj(paraId);
	range["rangeId"] = undefined;
	range["all"] = true;
	await Asc.Editor.callMethod("RemoveAnnotationRange", [range]);
	const isAnnotate = await this.annotateParagraph(paraId, recalcId, text);
	
	delete this.waitParagraphs[paraId];
	this.paraToCheck.delete(paraId);
	
	this.checked.add(paraId);

	return isAnnotate;
};
TextAnnotator.prototype.annotateParagraph = async function(paraId, recalcId, text)
{
};
TextAnnotator.prototype.uncheckParagraphs = async function(paraIds)
{
};
TextAnnotator.prototype.openPopup = async function(paraId, rangeId)
{
	if (!this.annotatorPopup)
		return;
		
	let popup = this.annotatorPopup.open(this.type, paraId, rangeId, this.getInfoForPopup(paraId, rangeId));
	if (!popup)
		return;

	let _t = this;
	popup.onAccept = async function() {
		await _t.onAccept(paraId, rangeId);
		_t.closePopup();
	};
	popup.onReject = async function() {
		await _t.onReject(paraId, rangeId);
		_t.closePopup();
	};
};
TextAnnotator.prototype.closePopup = function()
{
	if (!this.annotatorPopup)
		return;
	
	this.annotatorPopup.close(this.type);
};
TextAnnotator.prototype.getInfoForPopup = function(paraId, rangeId)
{
	return {};
};
TextAnnotator.prototype.onAccept = async function(paraId, rangeId)
{
};
TextAnnotator.prototype.onReject = async function(paraId, rangeId)
{
	let range = this.getAnnotationRangeObj(paraId, rangeId);
	await Asc.Editor.callMethod("RemoveAnnotationRange", [range]);
};
TextAnnotator.prototype.getAnnotation = function(paraId, rangeId)
{
	if (!paraId || !rangeId || !this.paragraphs[paraId] || !this.paragraphs[paraId][rangeId])
		return {};
	
	return this.paragraphs[paraId][rangeId];
};
/**
 * @param {string} paraId 
 * @param {string} rangeId 
 * @returns {{paragraphId: string, rangeId: string}}
 */
TextAnnotator.prototype.getAnnotationRangeObj = function(paraId, rangeId)
{
	return {
		"paragraphId" : paraId,
		"rangeId" : rangeId
	};
};
/**
 * @param {string} paraId 
 * @param {string[]} ranges 
 */
TextAnnotator.prototype.onClick = function(paraId, ranges)
{
	if (!ranges || !ranges.length)
		this.closePopup();
	else
		this.openPopup(paraId, ranges[0]);
};
TextAnnotator.prototype.onBlur = function()
{
	this.closePopup();
	this.resetCurrentRange();
};
TextAnnotator.prototype.onFocus = function(paraId, rangeId)
{	
};
TextAnnotator.prototype.resetCurrentRange = function()
{
	this.paraId = null;
	this.rangeId = null;
};
/**
 * @param {Array<string>} ranges 
 * @param {string} paraId 
 * @param {string} text 
 * @returns {Promise<void[]>}
 */
TextAnnotator.prototype._handleNewRanges = function(ranges, paraId, text)
{
	if (!ranges || !Array.isArray(ranges))
		return Promise.resolve([]);
	/** @type {Promise<void>[]} */
	const promises = [];

	for (let i = 0; i < ranges.length; ++i)
	{
		promises[i] = this._handleNewRangePositions(ranges[i], paraId, text);
	}

	return Promise.all(promises);
};
/** @returns {Promise<void>} */
TextAnnotator.prototype._handleNewRangePositions = function(range, paraId, text)
{
};
TextAnnotator.prototype.chatRequest = async function(prompt)
{
	let requestEngine = AI.Request.create(AI.ActionType.Chat);
	if (!requestEngine)
		return null;
	
	let response = await requestEngine.chatRequest(prompt, false);
	return this.normalizeResponse(response);
};
/**
 * Normalizes AI response by removing markdown code block wrappers
 * @param {string} response - The raw AI response that might be wrapped in ```json``` blocks
 * @returns {string} - The normalized response with markdown code blocks removed
 */
TextAnnotator.prototype.normalizeResponse = function(response) {
	if (typeof response !== 'string') {
		return response;
	}

	return Asc.Library.getJSONResult(response);
};
/**
 * @param {string} str
 * @param {string} searchStr
 * @param {string} [fromIndex]
 * @returns {number}
 */
TextAnnotator.prototype.simpleGraphemeIndexOf = function(str, searchStr, fromIndex = 0) {
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

