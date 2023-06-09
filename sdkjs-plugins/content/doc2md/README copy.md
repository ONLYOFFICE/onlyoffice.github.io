## **Information**

This repository is an archive of plugin-doc2md. Now it moved to the marketplace repository [onlyoffice.github.io](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content).

## **Overview**

Convert your formatted document to Markdown or HTML.  
It is is compatible with [self-hosted](https://github.com/ONLYOFFICE/DocumentServer) and [desktop](https://github.com/ONLYOFFICE/DesktopEditors) versions of ONLYOFFICE editors. It can be added to ONLYOFFICE instances manually.

## **How to use**

Find the plugin on the Plugins tab and click it.  
Use the Markdown or HTML buttons in the sidebar window to convert your document to either Markdown or HTML.  
If you select part of the document, Docs to Markdown will convert only the selection. Otherwise, it will convert the entire document.

| Row1col1 | Row1col2 |
| --- | --- |
| Row2 |   |
| col1 | Row1 |
| col2 |   |

## **Options**

*   Demote headings (H1 → H2, etc.): If you have used multiple Heading 1 headings in your Doc, choose this option to demote all heading levels to conform with the following standard: single H1 as title, H2 as top-level heading in the text body.
*   Create base64 images: Select this option if you want images to be created in base64 format.
*   Render HTML tags: By default, angle brackets (\<) will be replaced by the \< entity. If you really want to embed HTML tags in your Markdown, select this option to preserve them. Or, if you just want to use an occasional HTML tag, you can escape the opening angle bracket like this: text.
*   Suppress top comment: Removes the informational comment at the top of the output. Warnings and errors that result from the conversion will still be part of the output.

## **How to install**Detailed instructions can be found in [ONLYOFFICE API documentation](https://api.onlyoffice.com/plugin/installation).