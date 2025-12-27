(function () {
  "use strict";

  let wasmReady = false;

  // Load Go WASM
  async function loadWasm() {
    try {
      const go = new Go();
      const result = await WebAssembly.instantiateStreaming(
        fetch("go/main.wasm"),
        go.importObject
      );

      // Run the Go program
      go.run(result.instance);

      wasmReady = true;

    } catch (err) {

      console.error("WASM load error:", err);
    }
  }

  // Initialize WASM when plugin is ready
  window.addEventListener("DOMContentLoaded", function () {
    // Wait a bit for Asc.plugin to be available
    setTimeout(loadWasm, 100);
  });

  // Also expose loadWasm for manual initialization if needed
  window.loadGoWasm = loadWasm;
})();
