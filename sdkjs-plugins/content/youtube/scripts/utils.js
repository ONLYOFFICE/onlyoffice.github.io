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


// @ts-check

const Utils = {
    /** @param {string} url @param {string} param @returns {string | undefined} */
    extractUrlParam: function(url, param) {
        var _questPos = url.indexOf("?");
			if (_questPos < 0 && _questPos >= (url.length - 1))
				return undefined;

			var _url = url.substring(_questPos + 1);
			var _propPos = _url.indexOf(param + "=");
			if (_propPos < 0 && _propPos >= (url.length - 1))
				return undefined; 

			_propPos += param.length;
			_propPos += 1; // '='

			var _last = _url.indexOf("&", _propPos);
			if (_last < 0)
				_last = _url.length;

			return _url.substring(_propPos, _last);
    },
    /** @param {string} url @returns {string} */
    extractVideoId: function(url) {
        var _ids = url.split("/");
        var _id = _ids[_ids.length - 1];

        if (0 == _id.indexOf("watch?v="))
            _id = _id.substr(8);

        var _amp = _id.indexOf("&");
        if (-1 != _amp)
            _id = _id.substr(0, _amp);

        return _id;
    },
    /** @param {string} url @returns {boolean} */
    validateYoutubeUrl1: function(url) {
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (url.match(p)) ? true : false;
    },
    /** @param {string} url @returns {boolean} */
    validateYoutubeUrl: function(url) {
        var p = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(p);
        return (match && match[2] && match[2].length == 11) ? true : false;
    }
};
