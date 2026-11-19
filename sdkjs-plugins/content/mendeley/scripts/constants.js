(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.Constants = factory();
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {

    // UI Class constants
    var displayNoneClass = "display-none";
    var blurClass = "blur";

    // Default popular styles
    var defaultStyles = {
        "American Medical Association 11th edition": 1,
        "American Political Science Association": 1,
        "American Psychological Association 7th edition": 1,
        "American Sociological Association 6th edition": 1,
        "Chicago Manual of Style 17th edition (author-date)": 1,
        "Cite Them Right 10th edition - Harvard": 1,
        "IEEE": 1,
        "Modern Humanities Research Association 3rd edition (note with bibliography)": 1,
        "Modern Language Association 8th edition": 1,
        "Nature": 1
    };

    // Style display names map
    var styleDisplayNames = {
        "apa": "APA Style 7th edition",
        "american-medical-association": "American Medical Association 11th edition",
        "chicago-author-date": "Chicago Manual of Style 18th edition (author-date)",
        "chicago-notes-bibliography": "Chicago Manual of Style 18th edition (notes-bibliography)",
        "harvard-cite-them-right": "Cite Them Right 10th edition - Harvard",
        "ieee": "IEEE Reference Guide",
        "modern-language-association": "Modern Language Association 9th edition",
        "nature": "Nature",
        "american-political-science-association": "American Political Science Association",
        "american-sociological-association": "American Sociological Association 6th edition"
    };

    // Scalable SVG icons for drawer views
    var DRAWER_ICONS = {
        all: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
        recently_added: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        favorites: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
        folder: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
        group: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
    };

    return {
        displayNoneClass: displayNoneClass,
        blurClass: blurClass,
        defaultStyles: defaultStyles,
        styleDisplayNames: styleDisplayNames,
        DRAWER_ICONS: DRAWER_ICONS
    };
});
