// SPDX-License-Identifier: AGPL-3.0-only
"use strict";
class Provider extends AI.Provider {
  constructor() { super("Codex OAuth CLI", "http://127.0.0.1:18741", "", "v1"); }
  checkExcludeModel(model) { return model.id !== "codex-oauth-gpt-6.1-sol"; }
  checkModelCapability() { return AI.CapabilitiesUI.Chat; }
}
