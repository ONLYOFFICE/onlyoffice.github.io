# Change Log

## 1.3.0

* Sign in with just your email address — Curly emails you a 6-digit code to confirm it, and you're in. License keys are gone (existing activations keep working unchanged, nobody has to reactivate).
* New emails start a free 14-day trial automatically; known emails simply sign in — one flow for everyone.
* If your email belongs to more than one workspace, a picker lets you choose which one to use on this device.
* New: Insert tag — type a name and Curly drops the {placeholder} at your cursor, with a live preview. Date-like names (e.g. {Invoice date}) are detected automatically and get a real date picker at fill time, with a "type freely" escape for anything unusual.
* Form fields (beta) improvements: filling now identifies each control directly instead of by position, so documents whose fields were edited or reordered fill reliably; and when the document's fields changed since the last scan, the pane says so and asks for a Refresh instead of silently updating nothing.
* Fix: the Insert tag action did nothing in OnlyOffice.

## 1.2.0

* New (beta): Form fields. An opt-in setting lists the document's native form controls in their own tab — text fields, checkboxes, dropdown lists, combo boxes (free text supported), and date pickers with a real date control. Rich-content containers are shown read-only (their multi-paragraph content is edited in the document, not through a form input); controls marked "contents cannot be edited" appear locked, and wrappers that group other controls are left untouched.
* Text and combo controls show their current content as a hint inside the input: typing replaces it, leaving it empty keeps the control unchanged.
* Fix: a stray { in one paragraph and a } in a later paragraph are no longer detected together as one placeholder.
* Fix: replacing placeholders can no longer alter text inside native form controls.
* Fix: placeholders containing a line break (Shift+Enter) are detected and filled reliably.
* Added third-party license notices (THIRD-PARTY-NOTICES.md).

## 1.1.0

* Placeholders that differ only by capitalization (e.g. {Name} and {name}) are now treated as one field. Filling it replaces every variant; a setting restores the old separate-fields behavior, and the pane shows a one-time notice when fields get combined.
* Settings are now applied on the automatic scan when the panel opens (previously only after a manual Refresh).

## 1.0.1

* Interface language metadata: the plugin's languages are now listed in the Plugin Manager (the interface itself follows your editor language automatically).
* Russian store description.
* Added README and license.

## 1.0.0

* Initial release.
