// The keys of a list of results (Space, Ctrl+A) work from the checkbox the
// user clicked; 1.2.x left the focus on the page after a click.
import { expect, it } from "vitest";
import { Checkbox } from "./checkbox.js";

it("keeps the focus in the list after a click", () => {
    const list = document.createElement("div");
    const input = document.createElement("input");
    list.appendChild(input);
    document.body.appendChild(list);

    new Checkbox(input, { label: "Source" });
    const container = /** @type {HTMLElement} */ (list.querySelector(".checkbox-container"));
    container.click();

    // The input: the container is no tab stop, and a browser does not focus
    // it (happy-dom would, so the test names the element).
    expect(document.activeElement).toBe(input);
    expect(container.classList.contains("checkbox--checked")).toBe(true);
});
