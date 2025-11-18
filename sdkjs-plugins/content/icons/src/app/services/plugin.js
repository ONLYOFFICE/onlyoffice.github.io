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

import { Commands } from "./commands.js";
import { SvgParser } from "../utils/svg-parser.js";
import { IconPicker } from "../components/icon-picker.js";
import { CategoriesPicker } from "../components/categories-picker.js";
import { SearchFilter } from "../components/search-filter.js";
import { FA_CATEGORIES } from "../environments/categories.js";

class IconsPlugin {
    #categoriesPicker;
    #iconsPicker;
    #searchFilter;

    #selectedIcons;

    constructor() {
        this.#selectedIcons = new Map();
        this.#iconsPicker = new IconPicker(FA_CATEGORIES);
        this.#categoriesPicker = new CategoriesPicker(FA_CATEGORIES);
        this.#searchFilter = new SearchFilter(FA_CATEGORIES);
    }

    init() {
        this.#categoriesPicker.setOnSelectCategoryCallback((categoryName) => {
            this.#iconsPicker.showCategory(categoryName);
            this.#searchFilter.reset();
        });

        this.#searchFilter.setOnFilterCallback((catalogOfIcons) => {
            this.#iconsPicker.showFound(catalogOfIcons);
            this.#categoriesPicker.reset();
        });

        this.#iconsPicker.setOnSelectIconCallback((icons, needToRun) => {
            this.#selectedIcons = icons;
            needToRun && this.run();
        });
    }

    run() {
        return new Promise((resolve, reject) => {
            if (!this.#selectedIcons.size) {
                resolve(false);
                return;
            }
            try {
                const svgs = this.#iconsPicker.getSelectedSvgIcons();
                let parsed = svgs.map((svg) => SvgParser.parse(svg));
                Asc.scope.editor = Asc.plugin.info.editorType;
                Asc.scope.parsedSvgs = parsed;
                const isCalc = true;
                const isClose = false;
                Asc.plugin.callCommand(
                    Commands.insertIcon,
                    isClose,
                    isCalc,
                    resolve
                );
            } catch (e) {
                console.error("Failed to run icons plugin");
                console.error(e);
                reject(e);
                return;
            }
        });
    }
}

export { IconsPlugin };
