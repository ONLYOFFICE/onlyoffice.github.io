(function (window) {
  "use strict";

  const storeApi = window.PdfBookmarkStore;
  const elements = {};
  let store;
  let bookmarks = [];
  let currentPageIndex = null;
  let currentPageRequestRunning = false;
  let proposedPageIndex = null;
  let statusTimer = null;

  function byId(id) {
    return document.getElementById(id);
  }

  function applyTheme(theme) {
    if (typeof window.Asc.plugin.onThemeChangedBase === "function") {
      window.Asc.plugin.onThemeChangedBase(theme);
    }

    const themeType = theme && typeof theme.type === "string"
      ? theme.type.toLowerCase()
      : "";
    const isDark = themeType === "dark" || themeType === "contrast-dark";
    const root = document.documentElement;

    if (themeType) {
      root.dataset.theme = isDark ? "dark" : "light";
      root.style.colorScheme = isDark ? "dark" : "light";
    } else {
      root.removeAttribute("data-theme");
      root.style.removeProperty("color-scheme");
    }

    document.body.classList.toggle("dark-theme", isDark);
  }

  function cacheElements() {
    elements.documentName = byId("document-name");
    elements.pagePill = byId("page-pill");
    elements.nameInput = byId("bookmark-name");
    elements.addButton = byId("add-bookmark");
    elements.clearAll = byId("clear-all");
    elements.count = byId("bookmark-count");
    elements.empty = byId("empty-state");
    elements.list = byId("bookmark-list");
    elements.status = byId("status");
    elements.storageNote = byId("storage-note");
  }

  function getDesktopBridge() {
    const candidates = [window];

    try {
      if (window.parent && window.parent !== window) {
        candidates.push(window.parent);
      }
    } catch (_error) {
      // Cross-origin parents are expected in hosted editors.
    }

    try {
      if (window.top && !candidates.includes(window.top)) {
        candidates.push(window.top);
      }
    } catch (_error) {
      // Cross-origin top windows are expected in hosted editors.
    }

    for (const candidate of candidates) {
      try {
        if (candidate.AscDesktopEditor) {
          return candidate.AscDesktopEditor;
        }
      } catch (_error) {
        // Try the next candidate.
      }
    }

    return null;
  }

  function resolveDocumentDescriptor() {
    const desktop = getDesktopBridge();

    const info = window.Asc && window.Asc.plugin ? window.Asc.plugin.info || {} : {};
    const friendlyNames = ["fileName", "documentTitle", "title", "documentUrl", "url"];
    const friendlyValue = friendlyNames
      .map((friendlyName) => info[friendlyName])
      .find((value) => typeof value === "string" && value.trim());

    try {
      if (
        desktop &&
        typeof desktop.LocalFileGetSourcePath === "function" &&
        (typeof desktop.IsLocalFile !== "function" || desktop.IsLocalFile())
      ) {
        const sourcePath = desktop.LocalFileGetSourcePath();
        if (sourcePath) {
          return {
            label: friendlyValue ? storeApi.getBaseName(friendlyValue) : storeApi.getBaseName(sourcePath),
            shared: false
          };
        }
      }
    } catch (_error) {
      // Fall through to identifiers supplied by the plugin host.
    }

    const identityNames = [
      "documentUrl",
      "documentKey",
      "documentId",
      "fileName",
      "documentTitle",
      "title",
      "url"
    ];

    for (const name of identityNames) {
      if (typeof info[name] === "string" && info[name].trim()) {
        return {
          label: friendlyValue ? storeApi.getBaseName(friendlyValue) : "Current PDF",
          shared: false
        };
      }
    }

    return {
      label: "Current PDF",
      shared: true
    };
  }

  function serializePageImage(value) {
    if (!value) {
      return "";
    }

    if (typeof value === "string") {
      return value;
    }

    if (typeof value.toDataURL === "function") {
      try {
        return value.toDataURL("image/png");
      } catch (_error) {
        // Continue with serializable host values.
      }
    }

    for (const name of ["data", "url", "src"]) {
      if (typeof value[name] === "string" && value[name]) {
        return value[name];
      }
    }

    try {
      const serialized = JSON.stringify(value);
      return serialized === "{}" ? "" : serialized;
    } catch (_error) {
      return "";
    }
  }

  async function createStableDocumentIdentity(descriptor) {
    let firstPageFingerprint = "";

    try {
      const pageImage = await callEditorMethod("GetPageImage", [0, {
        maxSize: 96,
        annotations: false,
        fields: false,
        drawings: true
      }]);
      firstPageFingerprint = serializePageImage(pageImage);
    } catch (_error) {
      // A stable file name remains a usable offline fallback.
    }

    return storeApi.createDocumentIdentity(descriptor.label, firstPageFingerprint);
  }

  function callEditorMethod(name, args) {
    const parameters = Array.isArray(args) ? args : [];

    if (window.Asc && window.Asc.Editor && typeof window.Asc.Editor.callMethod === "function") {
      return Promise.resolve(window.Asc.Editor.callMethod(name, parameters));
    }

    return new Promise((resolve, reject) => {
      let completed = false;
      const timeout = window.setTimeout(() => {
        if (!completed) {
          completed = true;
          reject(new Error(`${name} did not return a result.`));
        }
      }, 2500);

      try {
        const accepted = window.Asc.plugin.executeMethod(name, parameters, (result) => {
          if (completed) {
            return;
          }

          completed = true;
          window.clearTimeout(timeout);
          resolve(result);
        });

        if (accepted === false && !completed) {
          completed = true;
          window.clearTimeout(timeout);
          reject(new Error(`${name} is not available in this editor.`));
        }
      } catch (error) {
        completed = true;
        window.clearTimeout(timeout);
        reject(error);
      }
    });
  }

  function setStatus(message, isError) {
    window.clearTimeout(statusTimer);
    elements.status.textContent = message || "";
    elements.status.classList.toggle("error", Boolean(isError));

    if (message && !isError) {
      statusTimer = window.setTimeout(() => {
        elements.status.textContent = "";
      }, 2500);
    }
  }

  function escapeForAttribute(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function bookmarkMarkup(bookmark) {
    const title = escapeForAttribute(bookmark.title);
    const pageNumber = bookmark.pageIndex + 1;

    return `
      <li class="bookmark-row" data-bookmark-id="${escapeForAttribute(bookmark.id)}">
        <button class="bookmark-main" type="button" data-action="jump" title="Go to ${title}, page ${pageNumber}">
          <span class="page-number" aria-label="Page ${pageNumber}">${pageNumber}</span>
          <span class="bookmark-title">${title}</span>
        </button>
        <span class="bookmark-actions">
          <button class="icon-button" type="button" data-action="rename" title="Rename ${title}" aria-label="Rename ${title}">
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m14.5 5.5 4 4M4 20l4.4-1 10.8-10.8a1.4 1.4 0 0 0 0-2l-1.4-1.4a1.4 1.4 0 0 0-2 0L5 15.6 4 20Z"/></svg>
          </button>
          <button class="icon-button delete" type="button" data-action="delete" title="Delete ${title}" aria-label="Delete ${title}">
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></svg>
          </button>
        </span>
      </li>`;
  }

  function renderBookmarks() {
    const isEmpty = bookmarks.length === 0;

    elements.count.textContent = String(bookmarks.length);
    elements.empty.hidden = !isEmpty;
    elements.empty.setAttribute("aria-hidden", String(!isEmpty));
    elements.list.hidden = isEmpty;
    elements.clearAll.hidden = isEmpty;
    elements.list.innerHTML = bookmarks.map(bookmarkMarkup).join("");
  }

  function updateCurrentPage(pageIndex) {
    if (!Number.isInteger(pageIndex) || pageIndex < 0) {
      return;
    }

    const pageChanged = pageIndex !== currentPageIndex;
    currentPageIndex = pageIndex;
    elements.pagePill.textContent = `Page ${pageIndex + 1}`;
    elements.addButton.disabled = false;

    if (pageChanged && (!elements.nameInput.value.trim() || proposedPageIndex !== null)) {
      elements.nameInput.value = `Page ${pageIndex + 1}`;
      proposedPageIndex = pageIndex;
    }
  }

  async function refreshCurrentPage() {
    if (currentPageRequestRunning) {
      return;
    }

    currentPageRequestRunning = true;

    try {
      const result = await callEditorMethod("GetCurrentPage", []);
      const pageIndex = Number(result);
      updateCurrentPage(pageIndex);
    } catch (_error) {
      if (currentPageIndex === null) {
        elements.pagePill.textContent = "Page unavailable";
        elements.addButton.disabled = true;
      }
    } finally {
      currentPageRequestRunning = false;
    }
  }

  function persist(action) {
    try {
      bookmarks = action();
      renderBookmarks();
      return true;
    } catch (error) {
      setStatus(`Could not save bookmarks: ${error.message}`, true);
      return false;
    }
  }

  function flushBookmarks() {
    if (!store) {
      return false;
    }

    try {
      bookmarks = store.save(bookmarks);
      return true;
    } catch (_error) {
      // Closing must never be blocked. Normal edits already report save errors.
      return false;
    }
  }

  function addCurrentPage() {
    if (currentPageIndex === null) {
      setStatus("The current PDF page is not available yet.", true);
      return;
    }

    let result;

    try {
      result = store.add(bookmarks, currentPageIndex, elements.nameInput.value);
    } catch (error) {
      setStatus(`Could not save the bookmark: ${error.message}`, true);
      return;
    }

    bookmarks = result.bookmarks;
    renderBookmarks();
    elements.nameInput.value = `Page ${currentPageIndex + 1}`;
    proposedPageIndex = currentPageIndex;
    setStatus(`Bookmarked page ${currentPageIndex + 1}.`);
  }

  async function jumpToBookmark(bookmark) {
    setStatus(`Opening page ${bookmark.pageIndex + 1}…`);

    try {
      const result = await callEditorMethod("GoToPage", [bookmark.pageIndex]);
      if (result === false) {
        throw new Error("The page could not be opened.");
      }
      updateCurrentPage(bookmark.pageIndex);
      setStatus(`Opened page ${bookmark.pageIndex + 1}.`);
      callEditorMethod("FocusEditor", []).catch(() => {});
    } catch (error) {
      setStatus(error.message || "The page could not be opened.", true);
    }
  }

  function renameBookmark(bookmark) {
    const nextTitle = window.prompt("Rename bookmark", bookmark.title);

    if (nextTitle === null) {
      return;
    }

    if (persist(() => store.rename(bookmarks, bookmark.id, nextTitle))) {
      setStatus("Bookmark renamed.");
    }
  }

  function deleteBookmark(bookmark) {
    if (persist(() => store.remove(bookmarks, bookmark.id))) {
      setStatus(`Deleted “${bookmark.title}”.`);
    }
  }

  function handleListClick(event) {
    const actionButton = event.target.closest("[data-action]");
    const row = event.target.closest("[data-bookmark-id]");

    if (!actionButton || !row) {
      return;
    }

    const bookmark = bookmarks.find((item) => item.id === row.dataset.bookmarkId);
    if (!bookmark) {
      return;
    }

    switch (actionButton.dataset.action) {
      case "jump":
        jumpToBookmark(bookmark);
        break;
      case "rename":
        renameBookmark(bookmark);
        break;
      case "delete":
        deleteBookmark(bookmark);
        break;
      default:
        break;
    }
  }

  function clearAllBookmarks() {
    if (!window.confirm("Delete all bookmarks for this PDF?")) {
      return;
    }

    if (persist(() => store.clear())) {
      setStatus("All bookmarks for this PDF were deleted.");
    }
  }

  function bindEvents() {
    elements.addButton.addEventListener("click", addCurrentPage);
    elements.nameInput.addEventListener("input", () => {
      proposedPageIndex = null;
    });
    elements.nameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !elements.addButton.disabled) {
        event.preventDefault();
        addCurrentPage();
      }
    });
    elements.list.addEventListener("click", handleListClick);
    elements.clearAll.addEventListener("click", clearAllBookmarks);

    // localStorage writes are synchronous. These lifecycle hooks provide a
    // final flush when ONLYOFFICE closes the panel, PDF tab, or application.
    window.addEventListener("pagehide", flushBookmarks);
    window.addEventListener("beforeunload", flushBookmarks);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        flushBookmarks();
      }
    });
  }

  async function initialize() {
    cacheElements();
    bindEvents();

    const descriptor = resolveDocumentDescriptor();
    elements.documentName.textContent = descriptor.label;
    elements.documentName.title = descriptor.label;

    if (descriptor.shared) {
      elements.storageNote.textContent = "No document ID was available; this host uses one shared bookmark list.";
    }

    try {
      const identity = await createStableDocumentIdentity(descriptor);
      store = new storeApi.BookmarkStore(window.localStorage, identity);
      bookmarks = store.load();
      renderBookmarks();
    } catch (error) {
      setStatus(`Local bookmark storage is unavailable: ${error.message}`, true);
      elements.addButton.disabled = true;
      return;
    }

    refreshCurrentPage();
    window.setInterval(refreshCurrentPage, 900);
  }

  window.Asc.plugin.init = initialize;
  window.Asc.plugin.button = function () {};
  window.Asc.plugin.onThemeChanged = applyTheme;
})(window);
