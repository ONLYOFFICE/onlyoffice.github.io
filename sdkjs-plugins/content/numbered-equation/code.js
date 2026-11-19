(function (window, undefined) {
    window.Asc.plugin.init = function () {
        // Creates the tab with a button on the toolbar
        this.executeMethod("AddToolbarMenuItem", [getToolbarItems()]);

        // What happens when you click the button: open the options window
        this.attachToolbarMenuClickEvent("insertNumberedEquation", function () {
            openOptionsWindow();
        });

        // Settings button: open the settings window
        this.attachToolbarMenuClickEvent("numberedEquationSettings", function () {
            openSettingsWindow();
        });
    };

    //#region: Options window

    let optionsWindow = null;

    function openOptionsWindow() {
        if (optionsWindow) {
            optionsWindow.activate();
            return;
        }

        optionsWindow = new window.Asc.PluginWindow();

        // Messages sent by options.js (sendToPlugin)
        optionsWindow.attachEvent("insert", function (options) {
            closeOptionsWindow();
            insertEquation(options);
        });
        optionsWindow.attachEvent("cancel", function () {
            closeOptionsWindow();
        });

        optionsWindow.show({
            url: "options.html",
            description: "Insert numbered equation",
            isVisual: true,
            isModal: true,
            EditorsSupport: ["word"],
            size: [360, 275],
            buttons: [],
        });
    }

    function closeOptionsWindow() {
        if (!optionsWindow) return;
        optionsWindow.close();
        optionsWindow = null;
    }

    //#endregion
    //#region: Settings window

    let settingsWindow = null;

    function openSettingsWindow() {
        if (settingsWindow) {
            settingsWindow.activate();
            return;
        }

        settingsWindow = new window.Asc.PluginWindow();

        // Messages sent by settings.js (sendToPlugin). settings.js saves the settings itself.
        settingsWindow.attachEvent("save", function () {
            closeSettingsWindow();
        });
        settingsWindow.attachEvent("cancel", function () {
            closeSettingsWindow();
        });

        settingsWindow.show({
            url: "settings.html",
            description: "Numbered equation settings",
            isVisual: true,
            isModal: true,
            EditorsSupport: ["word"],
            size: [360, 280],
            buttons: [],
        });
    }

    function closeSettingsWindow() {
        if (!settingsWindow) return;
        settingsWindow.close();
        settingsWindow = null;
    }

    //#endregion
    //#region: Insert the equation with the chosen options

    const errorMessages = {
        NotEmpty: "Place the cursor on an empty line outside of any table.",
        WidthError: "The number column width must be greater than 0 and less than 50% (Settings).",
        BookmarkError: "A bookmark with this name already exists.",
        AutoBookmarkFull: "No automatic bookmark name left (aaa to zzz all used). Type a name.",
        BookmarkNameError:
            "Invalid bookmark name (prefix + name): start with a letter, use only letters, digits or _ (max. 40).",
    };

    function insertEquation(options) {
        // Options go through Asc.scope: the function below runs inside the editor
        Asc.scope.centered = options.centered;
        Asc.scope.addTitle = options.addTitle;
        Asc.scope.titleStyle = options.titleStyle;
        Asc.scope.bookmarkName = options.bookmarkName;

        // Settings (settings button)
        let settings = window.NumberedEquationSettings.load();
        Asc.scope.numberWidth = settings.numberWidth;
        Asc.scope.autoBookmark = settings.autoBookmark;
        Asc.scope.autoPrefix = settings.autoPrefix;
        Asc.scope.manualPrefix = settings.manualPrefix;

        window.Asc.plugin.callCommand(
            function () {
                let centered = Asc.scope.centered;
                let leftered = !centered;
                let addTitle = Asc.scope.addTitle;
                let titleStyle = Asc.scope.titleStyle;

                let numberWidth = Asc.scope.numberWidth; // number column width (%); centered also uses it on the left
                let bookmarkName = Asc.scope.bookmarkName;
                let autoBookmark = Asc.scope.autoBookmark;
                let autoPrefix = Asc.scope.autoPrefix;
                let manualPrefix = Asc.scope.manualPrefix;

                //#region: Start and inicial check

                let doc = Api.GetDocument();
                let par = doc.GetCurrentParagraph();
                if (!par || !par.IsEmpty() || par.GetParentTable()) {
                    return "NotEmpty";
                }

                if (typeof numberWidth !== "number" || numberWidth <= 0 || numberWidth >= 50) {
                    return "WidthError";
                }

                //#endregion
                //#region: Checks for bookmarks

                let addBookmark = false;
                let names = doc.GetAllBookmarksNames();

                // Name typed by the user: manual prefix + name
                if (bookmarkName !== "") {
                    bookmarkName = manualPrefix + bookmarkName;
                    addBookmark = true;
                }

                // Empty name with automatic bookmarks: prefix + aaa, aab, ... aaz, aba, ... (letters, so they are not
                // mistaken for the real equation number, which can change when equations are renumbered)
                // Each prefix+xxx name is a position (aaa = 0, aab = 1, ...).
                // Next position = the larger of (highest prefix+xxx position + 1, count of names starting with the prefix)
                if (bookmarkName === "" && autoBookmark) {
                    let lastPosition = -1;
                    let prefixCount = 0;
                    for (let i = 0; i < names.length; i++) {
                        if (names[i].indexOf(autoPrefix) === 0) {
                            prefixCount++;
                            let rest = names[i].substring(autoPrefix.length);
                            if (/^[a-z]{3}$/.test(rest)) {
                                let position = 0;
                                for (let k = 0; k < 3; k++) {
                                    position = position * 26 + (rest.charCodeAt(k) - 97);
                                }
                                if (position > lastPosition) {
                                    lastPosition = position;
                                }
                            }
                        }
                    }
                    let nextPosition = lastPosition + 1;
                    if (prefixCount > nextPosition) {
                        nextPosition = prefixCount;
                    }
                    // 26 * 26 * 26 = 17576 names (aaa to zzz)
                    if (nextPosition >= 17576) {
                        return "AutoBookmarkFull";
                    }
                    let letters = "";
                    for (let k = 0; k < 3; k++) {
                        letters = String.fromCharCode(97 + (nextPosition % 26)) + letters;
                        nextPosition = Math.floor(nextPosition / 26);
                    }
                    bookmarkName = autoPrefix + letters;
                    addBookmark = true;
                }

                if (addBookmark) {
                    if (names.indexOf(bookmarkName) >= 0) {
                        return "BookmarkError";
                    }
                    if (!/^[A-Za-z][A-Za-z0-9_]{0,39}$/.test(bookmarkName)) {
                        return "BookmarkNameError";
                    }
                }

                //#endregion
                //#region: Checks for title style

                let titleLevel = 1;

                //#endregion
                //#region: Calculate useful width of the page
                // useful width (twips → EMU: 1 twip = 635 EMU)

                let sec = par.GetSection();
                let width = sec.GetPageWidth();
                let marginLeft = sec.GetPageMarginLeft();
                let marginRight = sec.GetPageMarginRight();
                let useful = (width - marginLeft - marginRight) * 635;

                //#endregion
                //#region: Insert the table

                let columns;
                if (centered) columns = 3;
                if (leftered) columns = 2;
                let table = Api.CreateTable(1, columns);
                doc.InsertContent([table]);

                //#endregion
                //#region: Calculate widths of table columns

                let widths = [];
                if (centered) {
                    let equationWidth = 100 - 2 * numberWidth;
                    widths = [numberWidth, equationWidth, numberWidth];
                }
                if (leftered) {
                    let equationWidth = 100 - numberWidth;
                    widths = [equationWidth, numberWidth];
                }

                //#endregion
                //#region: Set columns widths

                table.SetWidth("percent", 100);
                for (let i = 0; i < widths.length; i++) {
                    table.SetColumnWidth(i, (useful * widths[i]) / 100);
                }

                //#endregion
                //#region: Put number placeholder (x) or (n.x) on right cell

                let rightCell = table.GetCell(0, columns - 1);
                rightCell.SetCellMarginRight(0); // cell right margin width
                rightCell.SetVerticalAlign("center"); // number vertically centered (equations can be taller than one line)
                let rightCellelement = rightCell.GetContent().GetElement(0);
                rightCellelement.SetJc("right"); // right cell justification
                rightCellelement.AddText("(");
                let titleNumber;
                if (addTitle) {
                    titleNumber = rightCellelement.AddText("n");
                    rightCellelement.AddText(".");
                }
                let equationNumber = rightCellelement.AddText("x");
                rightCellelement.AddText(")");

                //#endregion
                //#region: Fill placeholders with numbers from FIELDS

                let eqNumCode = "SEQ Equation \\* ARABIC \\* MERGEFORMAT";
                if (addTitle)
                    eqNumCode = "SEQ Equation \\* ARABIC \\s " + titleLevel + " \\* MERGEFORMAT";

                equationNumber.GetRange().AddField(eqNumCode);

                if (addTitle) {
                    let titleCode = 'STYLEREF "' + titleStyle + '" \\s \\* MERGEFORMAT';
                    titleNumber.GetRange().AddField(titleCode);
                }

                if (addBookmark) rightCellelement.GetRange().AddBookmark(bookmarkName);

                //#endregion
                //#region: Put equation on its cell

                let equationCell = table.GetCell(0, columns - 2);
                let equationCellelement = equationCell.GetContent().GetElement(0);
                let equationCellJustification;
                if (centered) equationCellJustification = "center";
                if (leftered) equationCellJustification = "left";
                equationCellelement.SetJc(equationCellJustification);
                equationCellelement.Select();
                doc.AddMathEquation("", "unicode");

                //#endregion

                return "ok";
            },
            false,
            true,
            function (result) {
                if (result !== "ok") {
                    let message = errorMessages[result] || result;
                    window.Asc.plugin.executeMethod("ShowError", [message, 0]); // 0 = warning (-1 = critical, asks to close)
                }
            },
        );
    }

    //#endregion

    function getToolbarItems() {
        return {
            guid: window.Asc.plugin.info.guid,
            tabs: [
                {
                    // "plugins" = the editor's own Plugins tab: the buttons go there, no new tab is created
                    id: "plugins",
                    text: "Plugins",
                    items: [
                        {
                            id: "insertNumberedEquation",
                            type: "button",
                            text: "Numbered equation",
                            hint: "Insert a numbered equation in a table (centered 1x3 or left 1x2)",
                            icons: "resources/buttons/%theme-type%(light|dark)/equation%scale%(default).png", // light/dark, 100% to 200%
                            lockInViewMode: true,
                            enableToggle: false,
                            separator: true, // separates our buttons from the other plugins
                        },
                        {
                            id: "numberedEquationSettings",
                            type: "button",
                            text: "Equation settings",
                            hint: "Numbered equation settings (number column width, bookmarks)",
                            icons: "resources/buttons/%theme-type%(light|dark)/settings%scale%(default).png",
                            lockInViewMode: true,
                            enableToggle: false,
                            separator: false,
                        },
                    ],
                },
            ],
        };
    }

    // Window close button (X): buttonId = -1, windowId = the window that was closed
    window.Asc.plugin.button = function (id, windowId) {
        if (!windowId) return;
        if (optionsWindow && optionsWindow.id === windowId) {
            closeOptionsWindow();
            return;
        }
        if (settingsWindow && settingsWindow.id === windowId) {
            closeSettingsWindow();
            return;
        }
        // Unknown window id: close both, to be safe
        closeOptionsWindow();
        closeSettingsWindow();
    };
})(window, undefined);
