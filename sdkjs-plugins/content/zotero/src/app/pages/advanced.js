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

/// <reference path="../services/citation-service.js" />

/**
 * @typedef {import('../router').Router} Router
 * @typedef {import('../services/citation-service').CitationService} CitationService
 */

import { Button } from "../shared/components";
import { translate } from "../services";

/**
 * Connection/maintenance actions that most users don't need day to day
 * (repairing broken fields, and - as more of these land - things like
 * switching between API-key/local-Zotero connection or auto-update
 * toggles). Kept off the main screen and out of the citation-formatting
 * Settings screen, reachable via an "Advanced" link from Settings instead.
 * @param {Router} router
 * @param {string} displayNoneClass
 */
function AdvancedPage(router, displayNoneClass) {
    this._router = router;
    this._displayNoneClass = displayNoneClass;

    /** @type {CitationService|null} */
    this._citationService = null;

    this._backBtn = new Button("backToSettingsBtn", {
        variant: "secondary",
    });

    this._repairBrokenFieldsBtn = new Button("repairBrokenFieldsBtn", {
        variant: "secondary",
    });

    this._addEventListeners();
}

/**
 * @param {CitationService} citationService
 */
AdvancedPage.prototype.setCitationService = function (citationService) {
    this._citationService = citationService;
};

AdvancedPage.prototype.show = function () {
    this._router.openAdvanced();
};

AdvancedPage.prototype._addEventListeners = function () {
    const self = this;

    this._backBtn.subscribe(function (event) {
        if (event.type !== "button:click") {
            return;
        }
        self._router.openSettings();
    });

    this._repairBrokenFieldsBtn.subscribe(function (event) {
        if (event.type !== "button:click") {
            return;
        }
        if (!self._citationService) {
            return;
        }
        self._repairBrokenFieldsBtn.disable();
        self._citationService
            .repairBrokenCitations()
            .then(function (repairResult) {
                if (repairResult.repaired > 0) {
                    let message =
                        translate("Repaired") + " " + repairResult.repaired + " " +
                        translate("citation(s) that had lost their formatting.");
                    if (repairResult.failed > 0) {
                        message += " " + repairResult.failed + " " + translate("could not be repaired.");
                    }
                    self._citationService && self._citationService.showSuccessMessage(message);
                } else if (repairResult.failed > 0) {
                    self._citationService && self._citationService.showWarningMessage(
                        repairResult.failed + " " + translate("citation(s) could not be repaired.")
                    );
                } else {
                    self._citationService && self._citationService.showSuccessMessage(
                        translate("No broken citations were found.")
                    );
                }
            })
            .catch(function (error) {
                console.error(error);
                self._citationService && self._citationService.showWarningMessage(
                    translate("Failed to repair broken citations")
                );
            })
            .finally(function () {
                self._repairBrokenFieldsBtn.enable();
            });
    });
};

export { AdvancedPage };
