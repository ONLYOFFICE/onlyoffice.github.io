// @ts-check

/**
 * @typedef {Object} StyleInfo
 * @property {{fields: Array<string>, format: string}} categories - An object containing the citation format and fields.
 * @property {number} dependent - A dependent style is one that requires a specific style to be installed.
 * @property {string} href - The URL of the style.
 * @property {string} name - The name of the style.
 * @property {string} title - The title of the style.
 * @property {string} updated - The date the style was last updated.
 */

/**
 * @typedef {"note"|"numeric"|"author"|"author-date"|"label"|"note-ibid"} StyleFormat
 */

const CslStylesParser = {
    /**
     * Parse a style object to extract relevant information.
     * @param {string} name
     * @param {string} style - A style string
     * @returns {StyleInfo} An object containing the parsed style information.
     */
    getStyleInfo: function (name, style) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(style, "text/xml");

        /** @type {StyleInfo} */
        const styleInfo = {
            categories: {
                fields: [],
                format: "",
            },
            dependent: 0,
            href: "",
            name: name,
            title: "",
            updated: "",
        };

        const title = xmlDoc.querySelector("info title");
        if (title) styleInfo.title = title.textContent;

        const href = xmlDoc.querySelector('info link[rel="self"]');
        if (href) {
            let attribute = href.getAttribute("href");
            if (attribute) styleInfo.href = attribute;
        }

        const updated = xmlDoc.querySelector("info updated");
        if (updated) styleInfo.updated = updated.textContent;

        const categoryFormat = xmlDoc.querySelector(
            "info category[citation-format]"
        );
        if (categoryFormat) {
            let attribute = categoryFormat.getAttribute("citation-format");
            if (attribute) styleInfo.categories.format = attribute;
        }

        const categoryFields = xmlDoc.querySelectorAll("info category[field]");
        if (categoryFields) {
            categoryFields.forEach(function (category) {
                let attribute = category.getAttribute("field");
                if (attribute) styleInfo.categories.fields.push(attribute);
            });
        }

        return styleInfo;
    },
    /**
     * @param {string} styleContent
     * @returns {StyleFormat}
     */
    getCitationFormat: function (styleContent) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(styleContent, "text/xml");
        const format = xmlDoc.querySelector("info category[citation-format]");
        if (!format) throw new Error("Citation format not found");
        const type = format.getAttribute("citation-format");
        if (!type) throw new Error("Citation format not found");
        switch (type) {
            case "note":
            case "note-ibid":
            case "numeric":
            case "author":
            case "author-date":
            case "label":
                return type;
        }

        throw new Error("Invalid citation format");
    },
};
