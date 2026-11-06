// SPDX-License-Identifier: AGPL-3.0-only
"use strict";
class Provider extends AI.Provider {
  constructor() { super("Claude OAuth CLI", "http://127.0.0.1:18741", "", "v1"); }
  checkExcludeModel(model) { return model.id !== "claude-oauth-sonnet-5-5"; }
  checkModelCapability() { return AI.CapabilitiesUI.Chat; }
}
