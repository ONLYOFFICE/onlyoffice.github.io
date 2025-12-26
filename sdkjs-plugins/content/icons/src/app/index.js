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

import { IconsPlugin } from "./services/plugin.js";
import { Theme } from "./theme.js";
import { translate } from "./utils/translate.js";

import "../styles.css";

window.Asc.plugin.init = async function () {
    try {
        let iconsPlugin = new IconsPlugin();
        iconsPlugin.init();
    } catch (e) {
        console.error("Failed to init icons plugin");
        console.error(e);
    }
};

window.Asc.plugin.onTranslate = async function () {
    const elements = document.getElementsByClassName("i18n");

    for (let i = 0; i < elements.length; i++) {
        var el = elements[i];
        if (el.attributes["placeholder"])
            el.attributes["placeholder"].value = translate(
                el.attributes["placeholder"].value
            );
        if (el.attributes["title"])
            el.attributes["title"].value = translate(
                el.attributes["title"].value
            );
        if (el.innerText) el.innerText = translate(el.innerText);
    }
};

window.Asc.plugin.button = async function (id, windowId) {
    if (id === -1 || id === 1) {
        this.executeCommand("close", "");
    } else {
        await iconsPlugin.run();
    }
};

window.Asc.plugin.onThemeChanged = Theme.onThemeChanged;
