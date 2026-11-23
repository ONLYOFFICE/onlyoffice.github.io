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

/** @typedef {import("@shared/services/citation-service").CitationService} CitationService */

import { Button } from "@shared/components";
import { translate } from "../services";

/**
 * The "Repair broken citations" button of the settings page: asks for the
 * citations that lost their fields to be repaired and tells how it went.
 */
class RepairBrokenCitationsButton {
    /**
     * @param {CitationService} citationService - tells how it went
     * @param {() => Promise<{repaired: number, failed: number}>} repair
     *  - repairs them in the document
     */
    constructor(citationService, repair) {
        this._citationService = citationService;
        this._repair = repair;
        this._button = new Button("repairBrokenFieldsBtn", {
            variant: "secondary",
        });
        const self = this;
        this._button.subscribe(function (/** @type {{type: string}} */ event) {
            if (event.type !== "button:click") {
                return;
            }
            self._onClick();
        });
    }

    _onClick() {
        const citationService = this._citationService;
        const button = this._button;
        button.disable();
        this._repair()
            .then(function (repairResult) {
                if (repairResult.repaired > 0) {
                    let message =
                        translate("Repaired") + " " + repairResult.repaired + " " +
                        translate("citation(s) that had lost their formatting.");
                    if (repairResult.failed > 0) {
                        message += " " + repairResult.failed + " " + translate("could not be repaired.");
                    }
                    citationService.showSuccessMessage(message);
                } else if (repairResult.failed > 0) {
                    citationService.showWarningMessage(
                        repairResult.failed + " " + translate("citation(s) could not be repaired.")
                    );
                } else {
                    citationService.showSuccessMessage(
                        translate("No broken citations were found.")
                    );
                }
            })
            .catch(function (error) {
                console.error(error);
                citationService.showWarningMessage(
                    translate("Failed to repair broken citations")
                );
            })
            .finally(function () {
                button.enable();
            });
    }
}

export { RepairBrokenCitationsButton };
