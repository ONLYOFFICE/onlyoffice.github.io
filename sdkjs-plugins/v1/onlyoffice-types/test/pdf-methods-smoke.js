// @ts-check
/// <reference path="../index.d.ts" />

/**
 * Smoke tests for the official PDF Plugin API method list.
 * Source: https://api.onlyoffice.com/docs/plugins/interacting-with-editors/pdf-api/Methods/
 */
window.Asc.plugin.executeMethod("GetCurrentPage", [], (page) => {
    /** @type {number} */
    var currentPage = page;
    console.log(currentPage);
});

window.Asc.plugin.executeMethod("GetPageImage", [0, {
    maxSize: 1024,
    annotations: true,
    fields: true,
    drawings: true,
}], (image) => {
    /** @type {unknown} */
    var pageImage = image;
    console.log(pageImage);
});

window.Asc.plugin.executeMethod("GoToPage", [0, [10, 10, 100, 100]], (result) => {
    /** @type {boolean} */
    var moved = result;
    console.log(moved);
});

window.Asc.plugin.executeMethod("ReplacePageContent", [0, {
    type: "html",
    options: {
        content: "<p>Updated page</p>",
        separateParagraphs: false,
    },
}], (result) => {
    /** @type {boolean} */
    var replaced = result;
    console.log(replaced);
});

window.Asc.plugin.executeMethod("GetSelectedText", [{
    Numbering: false,
    Math: false,
    TableCellSeparator: "\t",
    ParaSeparator: "\n",
    TabSymbol: " ",
}]);
