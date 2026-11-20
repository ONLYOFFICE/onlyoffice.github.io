// The note numbers citeproc gets as noteIndex. 1.1.0 counted citations
// instead, so a note with two citations or none shifted "supra n." and
// "Ibid." for the citations after it.
import { describe, expect, it } from "vitest";
import { findNoteNumbers, numberAsInNotes } from "./note-numbers.js";

describe("findNoteNumbers", () => {
    it("finds each field's note, as read from a real editor", () => {
        // Body: "(Inline one)", then footnote 1 with two citations and the
        // user's words, footnote 2 without a citation, footnote 3 of two
        // paragraphs, "(Inline two)", endnote 1, footnote 4 repeating the
        // text of the first citation.
        const notes = {
            footnotes: [
                " Alpha 2020, 5 user words Ibid.\n",
                " plain note, Ibid. mentioned\n",
                " first para\nsecond Beta, Study\n",
                " Alpha 2020, 5\n",
            ],
            endnotes: [" Gamma 2021\n"],
        };
        const fields = [
            "(Inline one)",
            "Alpha 2020, 5",
            "Ibid.",
            "Beta, Study",
            "(Inline two)",
            "Gamma 2021",
            "Alpha 2020, 5",
        ];
        expect(findNoteNumbers(fields, notes)).toEqual([0, 1, 1, 3, 0, 1, 4]);
    });

    it("gives 0 to every field of a document without notes", () => {
        expect(findNoteNumbers(["(A)", "(B)"], { footnotes: [], endnotes: [] })).toEqual([0, 0]);
    });

    it("matches text whatever its spacing", () => {
        const notes = { footnotes: [" Alpha,  2020\n"], endnotes: [] };
        expect(findNoteNumbers(["Alpha, 2020"], notes)).toEqual([1]);
    });
});

describe("numberAsInNotes", () => {
    it("numbers the citations in the text as the notes they will get", () => {
        // In the text, note 1, in the text, note 2 twice.
        expect(numberAsInNotes([0, 1, 0, 2, 2])).toEqual([1, 2, 3, 4, 4]);
    });

    it("keeps the numbers of a document all in notes", () => {
        expect(numberAsInNotes([1, 1, 2, 3])).toEqual([1, 1, 2, 3]);
    });
});
