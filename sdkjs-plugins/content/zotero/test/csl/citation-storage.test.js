// citeproc reads the note of the citations around one from the storage:
// that must be the note number, not the place of the citation.
import { expect, it } from "vitest";
import { CSLCitation, CSLCitationStorage } from "../../src/app/csl/citation/index.js";

it("gives the citations around one with their note numbers", () => {
    CSLCitation.resetUsedIDs();
    const storage = new CSLCitationStorage();
    [["c1", 1], ["c2", 1], ["c3", 2], ["c4", 3]].forEach(([id, note]) => {
        const citation = new CSLCitation(/** @type {string} */ (id));
        citation.setNoteIndex(/** @type {number} */ (note));
        storage.addCslCitation(citation);
    });

    expect(storage.getCitationsPre("c3")).toEqual([["c1", 1], ["c2", 1]]);
    expect(storage.getCitationsPost("c3")).toEqual([["c4", 3]]);
    expect(storage.getLastNoteIndex()).toBe(3);
});
