(function (root, factory) {
  "use strict";

  const api = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  root.PdfBookmarkStore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const STORAGE_PREFIX = "onlyoffice-pdf-bookmarks:v1:";

  function normalizeIdentity(value) {
    let normalized = String(value || "").trim();

    try {
      normalized = decodeURIComponent(normalized);
    } catch (_error) {
      // Keep the original value when it is not a valid encoded URI.
    }

    normalized = normalized
      .replace(/^file:\/\/+/i, "")
      .replace(/\\/g, "/")
      .replace(/\/+$/, "");

    if (/^[a-z]:\//i.test(normalized)) {
      normalized = normalized.toLowerCase();
    }

    return normalized;
  }

  function hashString(value) {
    const text = String(value);
    let hash = 0x811c9dc5;

    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 0x01000193);
    }

    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  function createStorageKey(identity) {
    const normalized = normalizeIdentity(identity) || "shared-fallback";
    return `${STORAGE_PREFIX}${hashString(normalized)}-${normalized.length}`;
  }

  function getBaseName(identity) {
    const normalized = normalizeIdentity(identity);
    const name = normalized.split("/").pop();
    return name || "Current PDF";
  }

  function createDocumentIdentity(label, firstPageFingerprint) {
    const fileName = getBaseName(label).toLowerCase();
    const fingerprint = String(firstPageFingerprint || "");

    if (!fingerprint) {
      return `pdf-name:${fileName}`;
    }

    return `pdf-name:${fileName}:page-1:${hashString(fingerprint)}`;
  }

  function cleanTitle(title, pageIndex) {
    const value = String(title || "").replace(/\s+/g, " ").trim().slice(0, 120);
    return value || `Page ${pageIndex + 1}`;
  }

  function isValidBookmark(value) {
    return Boolean(
      value &&
      typeof value.id === "string" &&
      Number.isInteger(value.pageIndex) &&
      value.pageIndex >= 0 &&
      typeof value.title === "string"
    );
  }

  class BookmarkStore {
    constructor(storage, identity, now) {
      if (!storage || typeof storage.getItem !== "function" || typeof storage.setItem !== "function") {
        throw new TypeError("A localStorage-compatible object is required.");
      }

      this.storage = storage;
      this.key = createStorageKey(identity);
      this.now = typeof now === "function" ? now : Date.now;
    }

    load() {
      let parsed;

      try {
        const raw = this.storage.getItem(this.key);
        parsed = raw ? JSON.parse(raw) : [];
      } catch (_error) {
        return [];
      }

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .filter(isValidBookmark)
        .map((bookmark) => ({
          id: bookmark.id,
          pageIndex: bookmark.pageIndex,
          title: cleanTitle(bookmark.title, bookmark.pageIndex),
          createdAt: Number.isFinite(bookmark.createdAt) ? bookmark.createdAt : 0
        }))
        .sort((left, right) => left.pageIndex - right.pageIndex || left.createdAt - right.createdAt);
    }

    save(bookmarks) {
      const clean = Array.isArray(bookmarks) ? bookmarks.filter(isValidBookmark) : [];
      this.storage.setItem(this.key, JSON.stringify(clean));
      return clean;
    }

    add(bookmarks, pageIndex, title) {
      if (!Number.isInteger(pageIndex) || pageIndex < 0) {
        throw new RangeError("The PDF page index must be a non-negative integer.");
      }

      const createdAt = this.now();
      const bookmark = {
        id: `${createdAt.toString(36)}-${Math.random().toString(36).slice(2, 9)}`,
        pageIndex,
        title: cleanTitle(title, pageIndex),
        createdAt
      };
      const next = [...bookmarks, bookmark].sort(
        (left, right) => left.pageIndex - right.pageIndex || left.createdAt - right.createdAt
      );

      this.save(next);
      return { bookmark, bookmarks: next };
    }

    rename(bookmarks, id, title) {
      const next = bookmarks.map((bookmark) => (
        bookmark.id === id
          ? { ...bookmark, title: cleanTitle(title, bookmark.pageIndex) }
          : bookmark
      ));

      this.save(next);
      return next;
    }

    remove(bookmarks, id) {
      const next = bookmarks.filter((bookmark) => bookmark.id !== id);
      this.save(next);
      return next;
    }

    clear() {
      this.storage.removeItem(this.key);
      return [];
    }
  }

  return {
    BookmarkStore,
    STORAGE_PREFIX,
    cleanTitle,
    createDocumentIdentity,
    createStorageKey,
    getBaseName,
    hashString,
    normalizeIdentity
  };
});
