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

function TextAnnotationPopup()
{
	this.popup = null;
	this.type = 0; // 0 - spelling, 1 - grammar
	this.paraId = -1;
	this.rangeId = -1;
	
	this.open = function(type, paraId, rangeId)
	{
		if (this.popup && 0 === this.type && 1 === type)
			return null;
		
		return this._open(type, paraId, rangeId);
	};
	
	this._open = function(type, paraId, rangeId) 
	{
		if (this.type === type
			&& rangeId === this.rangeId
			&& paraId === this.paraId)
			return this.popup;
			
		this.type = type;
		this.paraId = paraId;
		this.rangeId = rangeId;
		
		if (this.popup)
			this.popup.close();

		let variation = {
			url : 'annotationPopup.html',
			isVisual : true,
			buttons : [],
			isModal : false,
			isCustomWindow : true,
			EditorsSupport : ["word", "slide", "cell", "pdf"],
			size : [318, 500],
			isTargeted : true,
			transparent : true
		};
		let _t = this;
		let popup = new window.Asc.PluginWindow();
		popup.attachEvent("onClose", function() {
			_t.close();
		});
		popup.attachEvent("onUpdateSize", function(size) {
			if (size[0] !== variation.size[0] || size[1] !== variation.size[1]) {
				Asc.Editor.callMethod("ResizeWindow", [popup.id, [size[0], size[1]]]);
			}
		});
		popup.show(variation);
		this.popup = popup;
		return popup;
	};
	
	this.close = function(type) 
	{
		if (undefined !== type && this.type !== type)
			return;
		
		if (!this.popup)
			return;
		
		this.type = -1;
		this.rangeId = -1;
		this.paraId = -1;

		this.popup.close();
		this.popup = null;
		Asc.Editor.callMethod("FocusEditor");
	}
}

var textAnnotatorPopup = new TextAnnotationPopup();
