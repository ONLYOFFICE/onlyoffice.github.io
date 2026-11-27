// Mendeley's source is the journal or book, its series the series: each goes
// to its own CSL field, or a style prints the journal twice.
import { expect, it } from "vitest";
import { MendeleyToCls } from "../src/app/sdk/mendeley-to-csl.js";

it("puts the journal into container-title only", () => {
    const item = MendeleyToCls.transform({ type: "journal", source: "Journal of Tests" });

    expect(item["container-title"]).toBe("Journal of Tests");
    expect(item).not.toHaveProperty("collection-title");
    expect(item).not.toHaveProperty("source");
});

it("keeps the book and its series apart", () => {
    const item = MendeleyToCls.transform({
        type: "book_section",
        source: "Handbook of Tests",
        series: "Lecture Notes",
    });

    expect(item["container-title"]).toBe("Handbook of Tests");
    expect(item["collection-title"]).toBe("Lecture Notes");
    expect(item).not.toHaveProperty("series");
});

it("gives a book in a series no container", () => {
    const item = MendeleyToCls.transform({ type: "book", series: "Lecture Notes" });

    expect(item["collection-title"]).toBe("Lecture Notes");
    expect(item).not.toHaveProperty("container-title");
});

it("still takes a patent's source for the publisher", () => {
    const item = MendeleyToCls.transform({ type: "patent", source: "Patent Office" });

    expect(item.publisher).toBe("Patent Office");
});
