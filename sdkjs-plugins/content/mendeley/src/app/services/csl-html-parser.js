// @ts-check

/// <reference path="../types-global.js" />

class CslHtmlParser {
    /** @type {Set<AllowedTags>} */
    static #allowedTags = new Set([
        "i",
        "u",
        "b",
        "p",
        "sc",
        "sup",
        "sub",
        "em",
        "div",
        "span",
    ]);

    /**
     * Names of attributes whose value is treated as a URL and therefore must
     * not contain `javascript:` / `vbscript:` / `data:` schemes.
     * @type {Set<string>}
     */
    static #dangerousAttributes = new Set([
        "href", "src", "xlink:href", "action", "formaction",
        "background", "poster", "srcdoc", "ping", "data"
    ]);

    /**
     * Remove attributes that may introduce XSS:
     *  - any `on*` event handler (e.g. `onclick`, `onerror`);
     *  - URL-like attributes pointing to `javascript:` / `vbscript:` /
     *    `data:` schemes;
     *  - inline `style` containing `expression(` or `javascript:`.
     * @param {Element} el
     */
    static #stripDangerousAttributes(el) {
        const dangerousScheme = /^\s*(javascript|vbscript|data)\s*:/i;
        for (const attr of Array.from(el.attributes)) {
            const name = attr.name.toLowerCase();
            const value = attr.value || "";

            if (name.startsWith("on")) {
                el.removeAttribute(attr.name);
                continue;
            }

            if (CslHtmlParser.#dangerousAttributes.has(name)) {
                // Strip control chars/whitespace that browsers ignore when resolving URLs.
                const normalized = value.replace(/[\u0000-\u001F\u007F]/g, "");
                if (dangerousScheme.test(normalized)) {
                    el.removeAttribute(attr.name);
                    continue;
                }
            }

            if (name === "style" && /expression\s*\(|javascript\s*:/i.test(value)) {
                el.removeAttribute(attr.name);
            }
        }
    }

    /**
     * Strip every tag that is not in {@link CslHtmlParser.#allowedTags},
     * preserving its text content and any allowed descendants.
     * Allowed tags keep their attributes, except those that can lead to XSS
     * (event handlers, javascript:/vbscript:/data: URLs in href/src-like attrs).
     * @param {string} html - HTML string to sanitize
     * @returns {string} Sanitized HTML string
     */
    static purifyHtml(html) {
        if (typeof html !== "string" || html.length === 0) return "";

        const allowed = this.#allowedTags;
        // Wrap into a single root so DOMParser preserves leading/trailing text nodes verbatim.
        const doc = new DOMParser().parseFromString(
            "<div id=\"__purify_root__\">" + html + "</div>",
            "text/html"
        );
        const root = doc.getElementById("__purify_root__");
        if (!root) return "";

        /**
         * Replace `el` with its child nodes in place.
         * @param {Element} el
         */
        const unwrap = (el) => {
            const parent = el.parentNode;
            if (!parent) return;
            while (el.firstChild) {
                parent.insertBefore(el.firstChild, el);
            }
            parent.removeChild(el);
        };

        // Snapshot first — the live HTMLCollection mutates as we unwrap nodes.
        const all = Array.from(root.getElementsByTagName("*"));
        for (const el of all) {
            const tag = el.tagName.toLowerCase();
            if (!allowed.has(/** @type {AllowedTags} */ (tag))) {
                unwrap(el);
            } else {
                CslHtmlParser.#stripDangerousAttributes(el);
            }
        }

        return root.innerHTML;
    }

}

export { CslHtmlParser };
