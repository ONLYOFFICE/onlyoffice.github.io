// sr-RS left the CSL repository, and the plugin, for sr-Cyrl-RS. A language
// chosen before, or kept in a document from Word, must still find a locale.
import { afterEach, expect, it, vi } from "vitest";
import { LocalesManager } from "./locales-manager.js";

afterEach(() => {
    vi.unstubAllGlobals();
});

it("reads a saved sr-RS as sr-Cyrl-RS", () => {
    localStorage.setItem("zoteroLang", "sr-RS");
    expect(new LocalesManager().getLastUsedLanguage()).toBe("sr-Cyrl-RS");
});

it("saves the language of a document as the current locale", () => {
    const manager = new LocalesManager();
    manager.saveLastUsedLanguage("sr-RS");
    expect(localStorage.getItem("zoteroLang")).toBe("sr-Cyrl-RS");
    expect(manager.getLastUsedLanguage()).toBe("sr-Cyrl-RS");
});

it("loads sr-Cyrl-RS for sr-RS, and gives it to citeproc by either name", async () => {
    const fetch = vi.fn(async () => new Response("<locale/>", { status: 200 }));
    vi.stubGlobal("fetch", fetch);
    const manager = new LocalesManager();

    await manager.loadLocale("sr-RS");

    expect(String(fetch.mock.calls[0][0])).toContain("locales-sr-Cyrl-RS.xml");
    expect(manager.getLocale("sr-RS")).toBe("<locale/>");
    expect(manager.getLocale("sr-Cyrl-RS")).toBe("<locale/>");
});

it("leaves other languages as they are", () => {
    localStorage.setItem("zoteroLang", "sr-Latn-RS");
    expect(new LocalesManager().getLastUsedLanguage()).toBe("sr-Latn-RS");
});
