# Change Log

## 1.2.0

* New (beta): Form fields. An opt-in setting lists the document's native form controls in their own tab — text and rich text fields (including block-level rich text controls), checkboxes, dropdown lists, combo boxes (free text supported), and date pickers with a real date control. Controls marked "contents cannot be edited" appear locked and are never modified; wrappers that group other controls are left untouched.
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
