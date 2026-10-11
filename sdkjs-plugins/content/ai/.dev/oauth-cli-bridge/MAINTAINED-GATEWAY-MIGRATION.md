# ONLYOFFICE migration to CLIProxyAPI

Verified on 2026-10-11. Upstream contribution: https://github.com/ONLYOFFICE/onlyoffice.github.io/pull/705 (open draft).

## What changed

The original custom Node adapter on port 18741 translated OpenAI-style requests into Codex and Claude CLI commands and relayed LM Studio requests. Its exact implementation, portable source, provider imports, tests, setup, security boundaries, and observed limitations are in the PR and `ONLYOFFICE-setup-notes.md`. That document describes the earlier deployment; this document describes its replacement.

CLIProxyAPI 8.0.23 now serves the maintained OpenAI-compatible gateway at `http://127.0.0.1:8317/v1`. Its official Windows amd64 release archive was verified against the published SHA-256 checksum: `D2839470DF9A3698C9B0A93A6F42F8C569BE4A0F74099F7110BA9350F62CA6F7`.

ONLYOFFICE's home AI agent uses its built-in OpenAI Compatible provider, named `CLIProxyAPI (OAuth + local models)`. The old home-agent Codex/Claude and LM Studio providers pointing to port 18741 were removed. The existing direct Ollama provider remains available.

The document AI plugin uses its built-in OpenAI provider with the gateway URL and local client key. Models configured are `codex-oauth-gpt-6.1-sol`, `claude-oauth-sonnet-5-5`, `gemini-3.8-flash-high`, and `onlyoffice-lmstudio-qwen`, plus the existing direct Ollama `deepseek-v4.1-flash:cloud`. The two custom Codex/Claude JavaScript provider imports and unused LM Studio relay override were removed. The four text-task defaults use local Qwen through the gateway. OCR, vision, and image generation are unassigned; the added gateway models are configured for text.

The old adapter source and helpers are retained as historical evidence and rollback material, but port 18741 is no longer required by the migrated settings. Do not run the old Start-ONLYOFFICE-Adapter helper for normal operation.

## Authentication and provider results

| Provider | Connection and measured result |
|---|---|
| Codex / ChatGPT | OAuth authenticated; pinned alias returned `gpt-6.1-sol` and `CONNECTOR_OK`. Home AI agent and document Chatbot both returned real responses. |
| Claude | OAuth authenticated; pinned alias returned `claude-sonnet-5-5` and `CONNECTOR_OK`. Document Chatbot returned `CLAUDE_DOCUMENT_OK`. |
| Gemini / Antigravity | OAuth authenticated; requested `gemini-3.8-flash-high`, returned model `gemini-3.8-flash-n` and `CONNECTOR_OK`. Document Chatbot returned `GEMINI_DOCUMENT_OK`. The returned model differs from the request label. |
| LM Studio | Gateway forwards to existing `http://127.0.0.1:1234/v1`. Alias `onlyoffice-lmstudio-qwen` returned `halo/qwen3.8-27b-q6-fast`. Document generation, Insert result, save, and reopen passed. |
| Ollama paid account | Gateway forwards to the existing authenticated Ollama server at `http://127.0.0.1:11434/v1`. `ollama/deepseek-v4.1-flash:cloud` returned `deepseek-v4.1-flash` and `CONNECTOR_OK`. No Ollama token was copied into the gateway. |
| Muse / Meta | OAuth completed and models are listed. Generation returned HTTP 402 `billing_not_configured`. Authentication success does not establish usable generation. Billing was not changed. |
| Grok / xAI | Built-in `--xai-login` exists, but the earlier device flow did not produce an xAI credential. Website sign-in alone did not complete the proxy authorization. No working-generation claim. Grok Bot remains untouched. |
| Bionic | Bionic uses an account login. No native Bionic OAuth provider/login command was found in this CLIProxyAPI release. It was not substituted with an API key or modified. |
| Kimi.com, Kimi.ai, Devin | Built-in OAuth login commands exist. No accounts were configured or tested. |

Provider names in `/v1/models` are a catalog, not proof that each model is available to the account or that each capability works. Aliases pin Codex and Claude to their intended OAuth channels instead of relying on overlapping model names from other providers.

## Runtime and startup

### Reproduce the maintained-gateway integration

The public files in this directory contain no binary, credentials, local client
key, account identifiers, or private evidence files. The later sections report
the observed deployment; their local receipts are not included in this PR.

1. Download the Windows amd64 release from the upstream release page and verify
   its published checksum. Extract the executable to
   `runtime/cliproxyapi/bin/cli-proxy-api.exe`.
2. Copy `cliproxyapi.config.example.yaml` to `runtime/cliproxyapi/config.yaml`.
   Generate a random local client key, replace the placeholder in the private
   configuration, and save the same value in `runtime/cliproxyapi/client-key.txt`.
   Keep these files and `runtime/cliproxyapi/auth/` private and ignored.
3. Run the upstream executable from `runtime/cliproxyapi` using
   `--config config.yaml --codex-login`, `--claude-login`, or
   `--antigravity-login`, one provider at a time. Complete the browser approval
   before starting another flow. Other login flags and account eligibility are
   listed by the upstream release's `--help` and provider documentation.
4. Adjust model IDs and local server addresses to your installation. The
   template's model catalog records this deployment and does not establish
   entitlement for another account. Remove unneeded local forwarding entries.
5. Run `Start-ONLYOFFICE-Gateway.ps1`. The helpers accept `-GatewayDirectory`
   when using a different deployment directory.
6. Add ONLYOFFICE's built-in OpenAI-compatible provider to the home AI agent,
   using `http://127.0.0.1:8317/v1` and the local client key. In the document
   plugin, choose its built-in OpenAI provider, set the same URL/key, choose a
   model, and enable only the capabilities you have tested. Assign task defaults
   explicitly. No custom JavaScript provider import is required.
7. Verify a real response in both interfaces, use Insert result on a test
   document, save/reopen it, restart ONLYOFFICE, and check persisted settings.
   Only then remove obsolete custom-bridge connections and imports.

### Recorded deployment layout

The measured deployment lives in `../work/cliproxyapi` relative to its local outputs directory. The portable reproduction above instead defaults to `runtime/cliproxyapi`. `bin/cli-proxy-api.exe` is the verified upstream binary. `config.yaml`, `client-key.txt`, and `auth/` are private local state. They must not be committed or shared. No OAuth tokens, client key, or account email is included in the PR.

Run `Start-ONLYOFFICE-Gateway.ps1` to start the gateway. Run `Stop-ONLYOFFICE-Gateway.ps1` to stop only the matching gateway executable/configuration. The start helper launches a hidden, normal-user process and verifies authenticated `/v1/models`; running it twice is safe. Stop/start and repeated start were tested. No scheduled task, service, or automatic sign-in startup was added. After Windows restarts, start the gateway before using it in ONLYOFFICE. Ollama must be running for Ollama routes; LM Studio's server and Qwen model must be ready for its local route.

The gateway uses OAuth for configured cloud providers. A separate generated local client key protects the loopback HTTP API and is stored in ONLYOFFICE's provider settings. It is not a purchased provider API key. Requests without it returned HTTP 401. The server binds to 127.0.0.1, discovery and remote management are disabled. CLIProxyAPI's CORS preflight permits `*`; this differs from the custom adapter's exact-origin allowlist. Keep the gateway loopback-only and protect its local key and OAuth files.

LM Studio's `http-server-config.json` matches the original backup SHA-256 `77ABCB86721561EC7176532F0F719301592ECAE4CB9402BA6831D9AEEF4395C9`; CORS remains false. Qwen was reloaded with its existing identifier and 65536 context when it was found unloaded. `reasoning_effort: none` is a request default scoped to the LM Studio model in gateway configuration, rather than a global model setting.

The original user-level `OLLAMA_ORIGINS=onlyoffice://*` remains in place for the direct ONLYOFFICE connection. The migration did not change Ollama inference defaults, models, credentials, or other clients' URLs. Gateway Ollama calls use its clean `/v1` API; unrelated applications can continue using Ollama directly.

## Verification and practical limits

`CLIProxyAPI-verification.json` contains fresh, sanitized API results after a gateway restart. `ONLYOFFICE-CLIProxyAPI-test.docx` contains the actual inserted response; `gateway-document-after-restart.jpg` and `gateway-settings-after-restart.jpg` record reopen and persisted local defaults. The original automatic document-tool failures remain documented in the upstream PR; successful text generation and manual Insert result do not establish automatic document tools work.

The same local gateway can later be configured as an OpenAI-compatible endpoint in TownReporter, using its local client key and an appropriate model ID. TownReporter was not changed in this task.

## Primary references

- https://github.com/router-for-me/CLIProxyAPI/releases/tag/v8.0.23
- https://help.router-for.me/configuration/provider/codex
- https://help.router-for.me/configuration/provider/claude-code
- https://help.router-for.me/configuration/provider/antigravity
- https://help.router-for.me/configuration/provider/xai
- https://lmstudio.ai/docs/bionic

Upstream support and local measured behavior are separate: the table reports actual results where tested, and explicitly identifies unconfigured or unsuccessful providers.
