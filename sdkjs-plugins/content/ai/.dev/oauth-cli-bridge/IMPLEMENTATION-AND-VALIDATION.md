# Implementation and validation record

Observed on Windows on October 11, 2026. This record distinguishes the original
deployment from the portable reference version in this contribution. Credentials,
private machine paths, raw user logs, profile files, installers, and binaries are
deliberately excluded from the PR.

## Original deployment steps

1. Inspected the installed CLIs, login status, model-server endpoints, loaded
   models, and existing configurations. Backed up ONLYOFFICE settings, Ollama's
   origin environment value, and LM Studio's HTTP server config locally.
2. Installed official signed ONLYOFFICE Desktop Editors 9.4.0.129 x64. The
   installer had a valid Ascensio System SIA signature. SHA-256:
   `A3B4A7353946A2D836EADFB8F59799F98B906AB961421C05C0BEE00BE9307A9F`.
   Existing Windows user file associations compared unchanged afterward.
   No Windows restart, server edition, cloud signup, or new model download.
3. Used the included document AI plugin
   `{9DC93CDB-B576-4F0C-B55E-FCC9C48DD007}` and desktop agent
   `{9DC93CDB-B576-4F0C-B55E-FCC9C48DD777}`.
4. Set previously absent user `OLLAMA_ORIGINS` to `onlyoffice://*`; restarted
   the existing Ollama tray/server. An initial exact non-HTTP origin caused
   startup validation to fail and was corrected to the scheme wildcard.
   Verified successful API requests and browser preflight afterward.
5. Kept LM Studio 0.4.21+2's server on 127.0.0.1:1234 with `cors: false`.
   Backed-up server configuration hash remained unchanged. The loaded
   `halo/qwen3.8-27b-q6-fast` model was not downloaded, unloaded, or replaced.
6. Implemented the Node bridge and two custom-provider imports. Codex retained
   its ChatGPT login and used `gpt-6.1-sol`. Claude retained its claude.ai Max
   login and used `claude-sonnet-5-5`. No provider token extraction or API key.
7. Added desktop agent providers for direct Ollama, the shared OAuth CLI
   endpoint, and the LM relay. Imported separate Codex/Claude providers in the
   document plugin and configured all four text model entries there.
8. Assigned the new ONLYOFFICE Chatbot, Summarization, Translation, and Text
   analysis slots to the existing LM Studio model. Only Chatbot was tested;
   configuring the other slots is not evidence of their behavior. Image
   generation remained unassigned. No global Ollama/LM model default changed.
9. Ran the tests below, inserted real text into a sample DOCX, saved it, closed
   ONLYOFFICE completely, inspected the stored document XML while closed,
   reopened it, and verified visible text and provider-setting persistence.
10. Added optional start/stop helpers. The bridge was manually started;
    no startup entry, scheduled task, or elevated persistent helper was added.

The first LM request inherited the model's default xhigh reasoning and took
several minutes. The deployed relay subsequently added request-only
`reasoning_effort: "none"` for that model when the caller omitted it. A later
agent request completed in roughly 13 seconds. Other clients and the model's
global defaults were unchanged.

## Verified workflows

| Backend | Home agent | Document chatbot | Insert/save/reopen | Automatic action |
| --- | --- | --- | --- | --- |
| Ollama 0.40.2 / `deepseek-v4.1-flash:cloud` | PASS, library rewrite | PASS, bookstore rewrite | PASS | FAIL, macro append claimed success without document change |
| Codex / `gpt-6.1-sol` | PASS, park rewrite | PASS, community-garden rewrite | PASS | FAIL, `generate_docx` returned `{"status":"error"}` |
| Claude / `claude-sonnet-5-5` | PASS, pool rewrite | PASS, museum rewrite | PASS | NOT VERIFIED |
| LM Studio / `halo/qwen3.8-27b-q6-fast` | PASS, cafe rewrite | PASS, recreation-center rewrite | PASS | NOT VERIFIED |

The tested Ollama model runs in the cloud. Enumerating other installed local
and cloud models is not evidence that they all work. Claude's returned
`modelUsage` identified the selected real model. Codex adapter metadata
recorded the selected model argument. LM Studio native logs independently
identified the processing model. Ollama native logs showed timed HTTP 200
chat requests but not the request-body model field; its routing evidence was
the observed picker plus built-in provider model binding and successful call.

The sample document retained these generated sentences: library opens at 9
a.m. Monday; community garden at 10 a.m. Saturday; museum at 11 a.m. Sunday;
recreation center at 8 a.m. Tuesday; bookstore at noon Friday. Actual text was
generated and inserted, not copied from a fabricated success receipt.

For the Codex automatic test, a structured tool call reached ONLYOFFICE, and
one-time approval was accepted for a disposable document. The UI execution
check mark did not mean success: the tool returned an error and no file was
confirmed. The model accurately reported that failure. In the Ollama macro
test, the model claimed success but inspection found no change. A separate
text-only request followed by manual Insert result succeeded. Neither test
is counted as successful automatic document editing.

Provider configuration persisted after restarting ONLYOFFICE. Selecting a
desktop-agent model automatically added another real LM Studio entry to the
plugin model list; it was not a placeholder or an additional model download.

## Changes made for this public reference

The original deployed source was a 7,595-byte Node file with machine-specific
absolute CLI paths, fixed transport model IDs, port 18741, a hardcoded LM
model effort override, and a sibling scratch runtime directory.

This contribution preserves its HTTP/CLI translation and provider imports,
but moves paths, model IDs, port, LM URL, and per-model request defaults into
an ignored local JSON configuration. Runtime files stay in an ignored local
directory. Helpers use the configured port. Raw CLI failure content is
suppressed instead of logging possibly sensitive stderr/result text. Normal
metadata receipts still omit prompt and response content. Public docs disclose
the original deployment's exact settings and known limits.

The portable version must not be described as having passed the original UI
tests: those were performed on the original deployment. Its automated tests
cover model listing, denied origins, unknown models, LM route restrictions,
and request-only LM defaults. Real CLI login/UI tests are a separate step.

## Reproduction and rollback

Before changing an existing installation, record endpoint URLs, model
assignments, loaded models, origin environment values, file associations,
and server configuration hashes. Preserve unrelated values. Install and
configure only the connections needed; confirm generated text, actual
document state, and persistence independently.

Rollback consists of stopping the bridge, restoring the prior ONLYOFFICE
provider/model assignments, and restoring the prior Ollama origin value
followed by a server restart if that setting was changed. The reference does
not mutate LM Studio config or official CLI auth. Uninstalling ONLYOFFICE is
a separate decision. Preserve generated documents and backups.

This PR makes an integration experiment reviewable. Merging these files
alone would not ship a native OAuth button or eliminate the external process.
Native lifecycle, authentication UX, structured tools, and security hardening
would require a further product implementation and verification.
