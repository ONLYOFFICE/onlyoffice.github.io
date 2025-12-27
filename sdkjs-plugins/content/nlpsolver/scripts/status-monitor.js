(function () {
  "use strict";

  let statusInterval = null;

  window.startStatusMonitor = function () {
    if (statusInterval) return;

    statusInterval = setInterval(function () {
      if (window.goCheckStatus) {
        try {
          const status = window.goCheckStatus();
          updateStatusUI(status);
        } catch (err) {
          console.error("[STATUS] Error checking status:", err);
        }
      }
    }, 250); // Poll every 250ms
  };

  window.stopStatusMonitor = function () {
    if (statusInterval) {
      clearInterval(statusInterval);
      statusInterval = null;
    }
  };

  function updateStatusUI(status) {
    if (!status) return;

    const statusText = document.getElementById("statusText");
    const currentFit = document.getElementById("currentFit");
    const currentParams = document.getElementById("currentParams");
    const startBtn = document.getElementById("startBtn");

    // Update status text
    const statusStr =
      status.current_status || status.CurrentStatus || "unknown";
    statusText.textContent = capitalize(statusStr);

    // Update status class
    statusText.className = "status-value";
    if (statusStr === "running") {
      statusText.classList.add("running");
    } else if (statusStr === "done") {
      statusText.classList.add("ready");
    } else if (statusStr === "error") {
      statusText.classList.add("error");
    }

    // Update best fit
    const fit = status.current_best_fit || status.CurrentBestFit;
    if (fit !== undefined && fit !== null && fit < 1e308) {
      currentFit.textContent = formatNumber(fit);
    } else {
      currentFit.textContent = "—";
    }

    // Update iterations
    const iterations = status.iterations || status.Iterations;
    const currentIterations = document.getElementById("currentIterations");
    if (iterations !== undefined && iterations !== null) {
      currentIterations.textContent = iterations.toLocaleString();
    } else {
      currentIterations.textContent = "—";
    }

    // Update fit time
    const fitTime = status.fit_time || status.FitTime;
    const currentFitTime = document.getElementById("currentFitTime");
    if (fitTime !== undefined && fitTime !== null && fitTime > 0) {
      currentFitTime.textContent = fitTime.toFixed(2) + "s";
    } else {
      currentFitTime.textContent = "—";
    }

    // Update parameters
    const params =
      status.current_paramters ||
      status.CurrentParamters ||
      status.current_parameters ||
      [];
    if (params && params.length > 0) {
      currentParams.textContent = params.map((p) => formatNumber(p)).join(", ");
    } else {
      currentParams.textContent = "—";
    }

    const sideConditions = status.side_conditions || status.SideConditons || [];
    const sideConditionsDisplay = document.getElementById(
      "sideConditionsDisplay"
    );
    if (sideConditionsDisplay) {
      if (sideConditions && sideConditions.length > 0) {
        const conditionsHtml = sideConditions
          .map((sc, idx) => {
            const value = formatNumber(sc.value);
            const inLimits = sc.is_in_limits;
            const statusIcon = inLimits ? "✓" : "✗";
            const statusClass = inLimits
              ? "condition-ok"
              : "condition-violation";
            return `<div class="${statusClass}"><span>SC${
              idx + 1
            }: ${value} ${statusIcon}</span></div>`;
          })
          .join("");
        sideConditionsDisplay.innerHTML = conditionsHtml;
      } else {
        sideConditionsDisplay.textContent = "—";
      }
    }

    // Enable/disable buttons based on status
    const transferBtn = document.getElementById("transferBtn");
    if (statusStr === "running") {
      startBtn.disabled = true;
      transferBtn.disabled = true;
    } else if (statusStr === "done") {
      startBtn.disabled = false;
      transferBtn.disabled = false;
    } else if ( // Lol. WTF JS? 
      statusStr === "ready" ||
      statusStr === "Ready" ||
      statusStr === "READY"
    ) {
      startBtn.disabled = false;
      transferBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      transferBtn.disabled = false;
    }
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function formatNumber(num) {
    if (typeof num !== "number") return num;
    if (Math.abs(num) < 0.0001 || Math.abs(num) > 10000) {
      return num.toExponential(4);
    }
    return num.toFixed(4);
  }
})();
