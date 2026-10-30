# Research Assistant Citations

Cite papers from your [Research Assistant](https://research-assistant.me) library while you write, and keep a bibliography in step with the citations in the document. Citations are formatted by the Research Assistant app in the style you choose (APA, IEEE, Chicago, MLA, Nature and any CSL style you have imported), so numbering, disambiguation and bibliography order follow the style rules.

The plugin needs the Research Assistant desktop app running on the same computer. It talks to the app over `http://127.0.0.1` and works in the ONLYOFFICE desktop editors only. Web editors cannot reach an app on your computer, so the plugin shows a notice there instead.

## How to use

1. Start Research Assistant on your computer.
2. In the ONLYOFFICE desktop editors, open the Plugins tab and click Research Assistant Citations.
3. Click Connect. Research Assistant asks you to approve the connection and shows a six-digit code; approve it if the code matches the one in the panel. This happens only once. If you changed the HTTP port in Research Assistant's settings, enter the same port in the panel before clicking Connect.
4. Search your library by title, author or year and click Cite to insert a citation at the cursor. The button next to Cite adds a page or other locator, a prefix such as "see" and a suffix.
5. Click Bibliography to insert the bibliography at the cursor. Clicking it again updates the existing one.
6. Pick a citation style from the list to reformat every citation and the bibliography, or click Refresh after editing papers in Research Assistant.

The citation style is saved in the document, so it is kept when you reopen the file. Citations are stored as content controls that Microsoft Word and LibreOffice with the Research Assistant add-ins can refresh as well.

## How to install

Install the plugin from the Plugin Manager in the desktop editors, or follow the [ONLYOFFICE API documentation](https://api.onlyoffice.com/docs/plugin-and-macros/tutorials/installing/onlyoffice-desktop-editors/) to add it manually.
