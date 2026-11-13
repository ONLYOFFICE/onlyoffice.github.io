# Subscription CLI bridge: desktop integration experiment

This opt-in developer example connects the ONLYOFFICE desktop AI agent and the
in-document AI plugin to locally installed, already authenticated Codex and
Claude Code CLIs. It also provides a restricted LM Studio relay. It is a
reference implementation for review, not a built-in OAuth provider, marketplace
plugin, production security boundary, or assertion of vendor approval.

No runtime plugin files, provider defaults, model assignments, installer, or
user settings are changed by adding this directory. Maintainers can adopt the
example, adapt it into a native integration, or prefer a maintained gateway.

The follow-up deployment replaced this custom bridge with CLIProxyAPI 8.0.23.
See [the maintained gateway migration](MAINTAINED-GATEWAY-MIGRATION.md) for the
measured results, provider limitations, configuration template, and portable
start/stop helpers. The custom bridge below remains an explicitly optional
reference implementation; the migrated deployment no longer requires it.

## Why this exists

The desktop provider interface accepts HTTP model-list/chat requests. The
official CLIs accept noninteractive prompts and authenticate using their own
subscription login. The bridge translates between those interfaces without
extracting a provider token. It does not turn a subscription into a general
Platform API account or grant additional quota. Provider terms and account
eligibility remain applicable.

```text
ONLYOFFICE desktop agent / document chatbot
  | GET /v1/models, POST /v1/chat/completions
  v
Node bridge on 127.0.0.1:18741
  +-- Codex exec (existing ChatGPT login) --> Codex service
  +-- Claude -p (existing claude.ai login) --> Claude service
  +-- /lmstudio/v1/... --> existing LM Studio on 127.0.0.1:1234

ONLYOFFICE built-in Ollama provider --> Ollama on 127.0.0.1:11434/v1
                                       (does not use this bridge)
```

## Files and prerequisites

- `onlyoffice-oauth-adapter.mjs`: Node HTTP server, CLI dispatch, response
  conversion, optional LM Studio relay, and metadata log. Uses Node built-ins;
  no npm packages or install scripts.
- `bridge.config.example.json`: executable paths, verified example model IDs,
  port, and optional LM Studio request defaults. Copy to the ignored local
  `bridge.config.json`. Never put provider credentials in either file.
- `Codex-OAuth-provider.js`, `Claude-OAuth-provider.js`: imports for the document
  AI plugin's custom-provider UI. Each advertises text/chat only and filters the
  shared model list to its respective configured ID.
- `Start-ONLYOFFICE-Adapter.ps1`, `Stop-ONLYOFFICE-Adapter.ps1`: optional Windows
  lifecycle helpers. Start verifies the port belongs to this script; stop
  matches this script's full path. Neither creates a service or startup task.
- `bridge.test.mjs`: isolated transport tests with temporary configuration and
  a fake LM Studio server. Does not invoke signed-in CLIs or spend quota.
- `IMPLEMENTATION-AND-VALIDATION.md`: exact original implementation, deployment
  changes, observed results, failures, and differences in this public example.

Use a current supported Node.js release with built-in fetch (Node 22+),
ONLYOFFICE Desktop Editors, and the official CLIs. The original Windows
verification used Desktop Editors 9.4.0.129. The configured CLI versions must
support the flags below. Verify model IDs against your actual account; the
example IDs describe the tested deployment, not guaranteed account entitlement.

## Start and connect

1. Sign in through each official CLI's supported login flow. Do not copy OAuth
   tokens into the bridge or ONLYOFFICE.
2. Copy `bridge.config.example.json` to `bridge.config.json`; configure absolute
   CLI executable paths if they are not on PATH. On Windows, select the actual
   `.exe`; Node spawn does not run a `.cmd` shim through a shell. If model IDs,
   transport IDs, or port change, update the two provider imports accordingly.
3. Run `node onlyoffice-oauth-adapter.mjs`, or the Windows start helper. To
   locate config elsewhere set the process environment
   `ONLYOFFICE_BRIDGE_CONFIG` to its absolute path. CLI commands run in the
   example's ignored `runtime/` directory.
4. In the desktop home AI agent's connection settings add an OpenAI-compatible
   provider with URL `http://127.0.0.1:18741/v1` and blank provider API key.
   Select a returned model. This is local HTTP backed by CLI login, not an
   OAuth login button in ONLYOFFICE.
5. In a document open AI settings, import each provider JavaScript through the
   custom-provider interface, add its model, and assign Chatbot. This is a
   separate settings surface from the home agent. Use Chatbot, then Insert
   result to apply a generated response. Save, close, and reopen the document.
6. If using LM Studio, keep its existing loopback server running; connect the
   built-in LM Studio provider to
   `http://127.0.0.1:18741/lmstudio/v1`. The relay permits only the model-list and
   chat-completion routes. Configure request defaults per model only if wanted;
   the public example defaults to no inference overrides.

The optional Windows scripts have no install/uninstall side effects. To stop a
foreground server press Ctrl+C. No cloud account or model download is required
by this example itself.

## Direct Ollama connection and origin permission

Ollama already has the required API and a built-in ONLYOFFICE provider. Use its
existing `/v1` endpoint directly. The document plugin's embedded browser sends
`Origin: onlyoffice://plugin`. In the tested Ollama 0.40.2, the server required
an additional allowed origin. Setting `OLLAMA_ORIGINS=onlyoffice://*` and
restarting Ollama enabled it. Preserve any existing custom origins by appending
the scheme rather than replacing them. This example never edits that variable.

That setting affects the shared Ollama server: it permits all origins in the
`onlyoffice://` scheme, not a cryptographically authenticated application. It
does not change the listener, inference settings, model defaults, or built-in
allowed origins. Restart can interrupt other clients' requests. An exact
`onlyoffice://plugin` value failed the tested server's origin validation; the
scheme wildcard was required by that implementation. Avoid an unrestricted
`*`. Restore the prior environment value and restart to undo the change.

An origin restriction is browser request control, not an authentication
mechanism for native processes.

## Transport details and boundaries

The bridge forwards conversation messages as JSON inside a text prompt. Codex
uses `exec --ignore-user-config --skip-git-repo-check --ephemeral --sandbox
read-only -m MODEL --json -`. Claude uses `-p --output-format json --model MODEL
--tools "" --strict-mcp-config --no-session-persistence --setting-sources ""
--system-prompt INSTRUCTIONS`. No token file is opened by this code. CLI tools
are disabled for Claude; Codex has a read-only sandbox and a prompt instruction
not to inspect files or run tools. This is not proof of complete Codex tool
disablement or isolation from local files.

The response parser takes Codex's completed agent-message events or Claude's
JSON result. It returns a Chat Completions response, or emits a completed
response in SSE framing when streaming was requested. It buffers the CLI
answer first: this is not incremental token streaming. Sampling parameters,
image/audio inputs, embeddings, native conversation sessions, accurate usage
accounting, and full OpenAI API equivalence are not implemented.

When ONLYOFFICE supplies tools, the prompt includes their definitions and asks
for one JSON `tool_call`. The parser checks the returned function name against
the supplied list and converts it to OpenAI `tool_calls`, including a stream
index. It does not validate arguments against JSON Schema. ONLYOFFICE executes
the action under its own approval behavior. Tool results return through later
conversation messages. This text-based emulation is less reliable than native
structured tool support; see the failed real action tests.

The server binds IPv4 loopback. Requests with an Origin are limited to
`onlyoffice://plugin` and its own loopback origin, which the desktop request
bridge was observed to use. Requests without Origin are accepted. There is no
local client authentication: any local process can call it and consume the
signed-in subscriptions. Do not expose it through LAN listeners, tunnels, or
remote proxies. Deployment beyond a trusted single-user desktop needs a
separate security review and stronger client authentication.

Requests have an approximately 1 MB string-length bound (not a strict UTF-8 byte
bound), a 180-second CLI deadline, and no concurrency or CLI-output-size bound.
Child-process termination is not a complete descendant-process cancellation
guarantee. Metadata logging excludes normal prompt/answer content; do not
assume the official CLIs or model servers have identical logging policies.
The public example suppresses raw CLI error output to reduce accidental data
logging. Its LM relay intentionally does not forward upstream auth headers;
it targets an existing unauthenticated loopback LM Studio server.

## Validation and adoption

Run `node --test bridge.test.mjs` and `node --check onlyoffice-oauth-adapter.mjs`.
Then perform the real account/UI checks in the validation record. Transport
tests do not prove subscription authentication, model quality, or document
action success. The portable configuration version has automated coverage;
the original deployed version has the documented manual UI evidence.

For a maintained alternative, evaluate [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI).
It documents Codex and Claude OAuth, protocol translation, streaming, and tool
support. It holds OAuth credentials itself, which is a different trust model
from launching already authenticated official CLIs. Its claims alone do not
prove ONLYOFFICE compatibility or successful document tools. The comparison
does not alter this example or silently migrate any user's configuration.

## Interface references

- [Desktop agent](https://helpcenter.onlyoffice.com/desktop/configuration/desktop-AI-agent.aspx)
- [Custom providers](https://api.onlyoffice.com/docs/ai/guides/custom-providers/)
- [Codex noninteractive mode](https://developers.openai.com/codex/noninteractive)
- [Claude programmatic mode](https://code.claude.com/docs/en/headless)
- [Claude plan / SDK usage](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan)
- [Ollama origins](https://docs.ollama.com/faq#how-can-i-allow-additional-web-origins-to-access-ollama)
- [Ollama 0.40.2 source](https://github.com/ollama/ollama/blob/v0.40.2/envconfig/config.go)
- [LM Studio reasoning-effort support](https://lmstudio.ai/changelog/lmstudio/lmstudio-v0.4.8)

Files in this contribution follow the repository's AGPL-3.0 license.
