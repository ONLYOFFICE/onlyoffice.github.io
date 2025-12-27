(function () {
  "use strict";

  let parameterCount = 0;
  let sideConditionCount = 0;

  function colToNum(col) {
    let num = 0;
    for (let i = 0; i < col.length; i++)
      num = num * 26 + (col.charCodeAt(i) - 64);
    return num;
  }

  function numToCol(num) {
    let col = "";
    while (num > 0) {
      const r = (num - 1) % 26;
      col = String.fromCharCode(65 + r) + col;
      num = Math.floor((num - 1) / 26);
    }
    return col;
  }

  function expandRange(rangeStr) {
    const normalized = rangeStr.replace(/\$/g, "").toUpperCase();
    const parts = normalized.split(":");
    if (parts.length !== 2) return [normalized];
    const sm = parts[0].match(/([A-Z]+)(\d+)/),
      em = parts[1].match(/([A-Z]+)(\d+)/);
    if (!sm || !em) return [normalized];
    const sc = colToNum(sm[1]),
      ec = colToNum(em[1]);
    const sr = parseInt(sm[2]),
      er = parseInt(em[2]);
    const cells = [];
    for (let c = Math.min(sc, ec); c <= Math.max(sc, ec); c++) {
      for (let r = Math.min(sr, er); r <= Math.max(sr, er); r++)
        cells.push(numToCol(c) + r);
    }
    return cells;
  }

  window.getIterations = function () {
    const input = document.getElementById("iterationsInput");
    if (!input) return 1000;
    const val = parseInt(input.value, 10);
    return isNaN(val) || val <= 0 ? 1000 : val;
  };

  window.pickTargetCell = function () {
    window.Asc.plugin.callCommand(
      function () {
        var sheet = Api.GetActiveSheet();
        var sel = sheet.GetSelection();
        if (!sel) return null;
        var addr = sel.GetAddress(true, true, "xlA1", false);
        return addr ? addr.replace(/\$/g, "").split(":")[0] : null;
      },
      false,
      false,
      function (result) {
        if (result)
          document.getElementById("targetCell").value = result.toUpperCase();
      }
    );
  };

  window.pickParameterRange = function () {
    window.Asc.plugin.callCommand(
      function () {
        var sheet = Api.GetActiveSheet();
        var sel = sheet.GetSelection();
        if (!sel) return null;
        var addr = sel.GetAddress(true, true, "xlA1", false);
        return addr ? addr.replace(/\$/g, "") : null;
      },
      false,
      false,
      function (result) {
        if (result) {
          const cells = expandRange(result);
          document.getElementById("parametersList").innerHTML = "";
          parameterCount = 0;
          cells.forEach((c) => addParameterRowWithValues(c, "", ""));
        }
      }
    );
  };

  window.pickSideConditionCellForRow = function (rowId) {
    window.Asc.plugin.callCommand(
      function () {
        var sheet = Api.GetActiveSheet();
        var sel = sheet.GetSelection();
        if (!sel) return null;
        var addr = sel.GetAddress(true, true, "xlA1", false);
        return addr ? addr.replace(/\$/g, "").split(":")[0] : null;
      },
      false,
      false,
      function (result) {
        if (result) {
          const row = document.getElementById(rowId);
          if (row) {
            const cellInput = row.querySelector(".condition-cell");
            if (cellInput) cellInput.value = result.toUpperCase();
          }
        }
      }
    );
  };

  window.addParameterRow = function () {
    window.Asc.plugin.callCommand(
      function () {
        var sheet = Api.GetActiveSheet();
        var sel = sheet.GetSelection();
        if (!sel) return null;
        var addr = sel.GetAddress(true, true, "xlA1", false);
        return addr ? addr.replace(/\$/g, "").split(":")[0] : null;
      },
      false,
      false,
      function (result) {
        var cellValue = result ? result.toUpperCase() : "";
        addParameterRowWithValues(cellValue, "", "");
      }
    );
  };

  function addParameterRowWithValues(cellValue, minValue, maxValue) {
    const container = document.getElementById("parametersList");
    const rowId = `param-${parameterCount++}`;
    const row = document.createElement("div");
    row.className = "parameter-row";
    row.id = rowId;
    row.innerHTML = `
      <div class="param-top-row">
        <span class="param-label">Cell</span>
        <input type="text" class="param-cell" placeholder="B1" value="${cellValue}" />
        <button class="remove-btn" onclick="removeParameterRow('${rowId}')">×</button>
      </div>
      <div class="param-bounds-row">
        <div class="limit-check"><input type="checkbox" class="param-limit-min" /><label>StrictMin</label></div>
        <input type="text" class="param-minmax param-min" placeholder="-1" value="${minValue}" />
        <div class="limit-check"><input type="checkbox" class="param-limit-max" /><label>StrictMax</label></div>
        <input type="text" class="param-minmax param-max" placeholder="1" value="${maxValue}" />
      </div>`;
    container.appendChild(row);
  }

  window.removeParameterRow = function (rowId) {
    const row = document.getElementById(rowId);
    if (row) row.remove();
  };

  window.addSideConditionRow = function () {
    window.Asc.plugin.callCommand(
      function () {
        var sheet = Api.GetActiveSheet();
        var sel = sheet.GetSelection();
        if (!sel) return null;
        var addr = sel.GetAddress(true, true, "xlA1", false);
        return addr ? addr.replace(/\$/g, "").split(":")[0] : null;
      },
      false,
      false,
      function (result) {
        var cellValue = result ? result.toUpperCase() : "";
        addSideConditionRowWithValues(cellValue, "", "", true, true);
      }
    );
  };

  function addSideConditionRowWithValues(
    cellValue,
    minValue,
    maxValue,
    defineMin,
    defineMax
  ) {
    const container = document.getElementById("sideConditionsList");
    const rowId = `sidecond-${sideConditionCount++}`;
    const row = document.createElement("div");
    row.className = "side-condition-row";
    row.id = rowId;
    const minChecked = defineMin ? "checked" : "";
    const maxChecked = defineMax ? "checked" : "";
    const minDisabled = defineMin ? "" : "disabled";
    const maxDisabled = defineMax ? "" : "disabled";
    row.innerHTML = `
      <div class="param-top-row">
        <span class="param-label">Cell</span>
        <input type="text" class="condition-cell" placeholder="C1" value="${cellValue}" />
        <button class="param-picker-btn" onclick="pickSideConditionCellForRow('${rowId}')" title="Pick cell from spreadsheet">
         +
        </button>
        <button class="remove-btn" onclick="removeSideConditionRow('${rowId}')">×</button>
      </div>
      <div class="condition-bounds-row">
        <div class="limit-check">
          <input type="checkbox" class="condition-define-min" ${minChecked} onchange="toggleConditionMin('${rowId}')" />
          <label>DefineMin</label>
        </div>
        <input type="text" class="condition-minmax condition-min" placeholder="0" value="${minValue}" ${minDisabled} />
        <div class="limit-check">
          <input type="checkbox" class="condition-define-max" ${maxChecked} onchange="toggleConditionMax('${rowId}')" />
          <label>DefineMax</label>
        </div>
        <input type="text" class="condition-minmax condition-max" placeholder="0" value="${maxValue}" ${maxDisabled} />
      </div>`;
    container.appendChild(row);
  }

  window.toggleConditionMin = function (rowId) {
    const row = document.getElementById(rowId);
    if (!row) return;
    const checkbox = row.querySelector(".condition-define-min");
    const input = row.querySelector(".condition-min");
    if (checkbox && input) input.disabled = !checkbox.checked;
  };

  window.toggleConditionMax = function (rowId) {
    const row = document.getElementById(rowId);
    if (!row) return;
    const checkbox = row.querySelector(".condition-define-max");
    const input = row.querySelector(".condition-max");
    if (checkbox && input) input.disabled = !checkbox.checked;
  };

  window.removeSideConditionRow = function (rowId) {
    const row = document.getElementById(rowId);
    if (row) row.remove();
  };

  window.getParameterCells = function () {
    const rows = document.querySelectorAll(".parameter-row");
    const params = [];
    rows.forEach((row) => {
      const cell = row.querySelector(".param-cell").value.trim().toUpperCase();
      const minStr = row.querySelector(".param-min").value.trim();
      const maxStr = row.querySelector(".param-max").value.trim();
      if (cell) {
        params.push({
          cell,
          min_value: minStr !== "" ? parseFloat(minStr) : null,
          max_value: maxStr !== "" ? parseFloat(maxStr) : null,
          limit_min: row.querySelector(".param-limit-min").checked,
          limit_max: row.querySelector(".param-limit-max").checked,
        });
      }
    });
    return params;
  };

  window.getSideConditions = function () {
    const rows = document.querySelectorAll(".side-condition-row");
    const conds = [];
    rows.forEach((row) => {
      const cell = row
        .querySelector(".condition-cell")
        .value.trim()
        .toUpperCase();
      const defineMin = row.querySelector(".condition-define-min").checked;
      const defineMax = row.querySelector(".condition-define-max").checked;
      const minStr = row.querySelector(".condition-min").value.trim();
      const maxStr = row.querySelector(".condition-max").value.trim();
      if (cell) {
        conds.push({
          cell,
          min_value: defineMin && minStr !== "" ? parseFloat(minStr) : 0,
          max_value: defineMax && maxStr !== "" ? parseFloat(maxStr) : 0,
          define_min: defineMin,
          define_max: defineMax,
        });
      }
    });
    return conds;
  };

  window.startSolver = function () {
    var addr = document.getElementById("targetCell").value.trim().toUpperCase();
    if (!addr) {
      alert("Please set a target cell first.");
      return;
    }
    var parameterCells = getParameterCells();
    if (parameterCells.length === 0) {
      alert("Please add at least one parameter cell.");
      return;
    }
    var sideConditions = getSideConditions();

    document.getElementById("startBtn").disabled = true;
    document.getElementById("statusText").textContent = "Starting...";
    document.getElementById("statusText").className = "status-value running";

    Asc.scope.parameterCells = parameterCells;
    Asc.scope.targetCell = addr;
    Asc.scope.sideConditions = sideConditions;

    window.Asc.plugin.callCommand(
      function () {
        function getSimpleFormula(addr) {
          var sheet = Api.GetActiveSheet();
          var rng = sheet.GetRange(addr);
          return rng ? rng.GetFormula() : null;
        }
        function getCellValue(addr) {
          var sheet = Api.GetActiveSheet();
          var rng = sheet.GetRange(addr);
          return rng ? rng.GetValue() : null;
        }
        function normalizeRef(ref) {
          return ref.replace(/\$/g, "");
        }
        function colToNum(col) {
          var num = 0;
          for (var i = 0; i < col.length; i++)
            num = num * 26 + (col.charCodeAt(i) - 64);
          return num;
        }
        function numToCol(num) {
          var col = "";
          while (num > 0) {
            var r = (num - 1) % 26;
            col = String.fromCharCode(65 + r) + col;
            num = Math.floor((num - 1) / 26);
          }
          return col;
        }
        function expandRange(rangeStr) {
          var parts = rangeStr.replace(/\$/g, "").split(":");
          if (parts.length !== 2) return [rangeStr.replace(/\$/g, "")];
          var sm = parts[0].match(/([A-Z]+)(\d+)/),
            em = parts[1].match(/([A-Z]+)(\d+)/);
          if (!sm || !em) return [rangeStr.replace(/\$/g, "")];
          var sc = colToNum(sm[1]),
            ec = colToNum(em[1]),
            sr = parseInt(sm[2]),
            er = parseInt(em[2]);
          var cells = [];
          for (var c = sc; c <= ec; c++)
            for (var r = sr; r <= er; r++) cells.push(numToCol(c) + r);
          return cells;
        }
        function getFullFormula(cell, parameterCells) {
          var maxIter = 20;
          var paramSet = {};
          if (parameterCells) {
            for (var p = 0; p < parameterCells.length; p++) {
              if (parameterCells[p].cell)
                paramSet[normalizeRef(parameterCells[p].cell)] = true;
            }
          }
          var result = getSimpleFormula(cell);
          if (!result || result.indexOf("=") !== 0) return result;
          var expanded = {};
          expanded[normalizeRef(cell)] = true;
          for (var iter = 0; iter < maxIter; iter++) {
            var hasRepl = false;
            var matches = result.match(/\$?[A-Z]+\$?\d+(?::\$?[A-Z]+\$?\d+)?/g);
            if (!matches) break;
            var unique = [],
              seen = {};
            for (var i = 0; i < matches.length; i++) {
              var n = normalizeRef(matches[i]);
              if (!seen[n]) {
                seen[n] = true;
                unique.push(matches[i]);
              }
            }
            unique.sort(function (a, b) {
              return b.length - a.length;
            });
            for (var j = 0; j < unique.length; j++) {
              var match = unique[j],
                nm = normalizeRef(match);
              if (match.indexOf(":") >= 0) {
                var cells = expandRange(match),
                  expF = [];
                for (var k = 0; k < cells.length; k++) {
                  var ca = cells[k];
                  if (paramSet[ca]) expF.push(ca);
                  else {
                    var cf = getSimpleFormula(ca);
                    expF.push(
                      cf && cf.indexOf("=") === 0
                        ? "(" + cf.substring(1) + ")"
                        : getCellValue(ca)
                    );
                  }
                }
                var repl = "(" + expF.join("+") + ")";
                var esc = match
                  .replace(/\$/g, "\\$?")
                  .replace(/:/g, "\\s*:\\s*");
                var rp = new RegExp("SUM\\s*\\(\\s*" + esc + "\\s*\\)", "gi");
                var nr = result.replace(rp, repl);
                if (nr !== result) {
                  result = nr;
                  hasRepl = true;
                }
                continue;
              }
              if (paramSet[nm] || expanded[nm]) continue;
              var rf = getSimpleFormula(nm);
              if (rf && rf.indexOf("=") === 0) {
                expanded[nm] = true;
                var fc = "(" + rf.substring(1) + ")";
                var col = nm.match(/[A-Z]+/)[0],
                  row = nm.match(/\d+/)[0];
                var rp = new RegExp(
                  "\\$?" + col + "\\$?" + row + "(?![0-9])",
                  "g"
                );
                var nr = result.replace(rp, fc);
                if (nr !== result) {
                  result = nr;
                  hasRepl = true;
                }
              }
            }
            if (!hasRepl) break;
          }
          var matches = result.match(/\$?[A-Z]+\$?\d+/g);
          if (matches) {
            var unique = [],
              seen = {};
            for (var i = 0; i < matches.length; i++) {
              var n = normalizeRef(matches[i]);
              if (!seen[n]) {
                seen[n] = true;
                unique.push({ o: matches[i], n: n });
              }
            }
            unique.sort(function (a, b) {
              return b.n.length - a.n.length;
            });
            for (var j = 0; j < unique.length; j++) {
              var item = unique[j],
                nr = item.n;
              var col = nr.match(/[A-Z]+/)[0],
                row = nr.match(/\d+/)[0];
              var rp = new RegExp(
                "\\$?" + col + "\\$?" + row + "(?![0-9])",
                "g"
              );
              if (paramSet[nr]) {
                result = result.replace(rp, nr);
                continue;
              }
              var cv = getCellValue(nr);
              if (cv !== null) result = result.replace(rp, cv);
            }
          }
          return result;
        }
        var targetFormula = getFullFormula(
          Asc.scope.targetCell,
          Asc.scope.parameterCells
        );
        var sideFormulas = [];
        if (Asc.scope.sideConditions && Asc.scope.sideConditions.length > 0) {
          for (var i = 0; i < Asc.scope.sideConditions.length; i++) {
            var sc = Asc.scope.sideConditions[i];
            var formula = getFullFormula(sc.cell, Asc.scope.parameterCells);
            sideFormulas.push({
              cell_formula: formula,
              min_value: sc.min_value,
              max_value: sc.max_value,
              define_min: sc.define_min,
              define_max: sc.define_max,
            });
          }
        }
        return { targetFormula: targetFormula, sideConditions: sideFormulas };
      },
      false,
      false,
      function (res) {
        if (res && res.targetFormula && window.goParseInput) {
          var paramsJSON = JSON.stringify(getParameterCells());
          var sideConditionsJSON = JSON.stringify(res.sideConditions || []);
          try {
            var iterations = getIterations();
            if (res.sideConditions && res.sideConditions.length > 0) {
              window.goParseInput(
                res.targetFormula,
                paramsJSON,
                iterations.toString(),
                sideConditionsJSON
              );
            } else {
              window.goParseInput(
                res.targetFormula,
                paramsJSON,
                iterations.toString()
              );
            }
          } catch (err) {

            document.getElementById("statusText").textContent = "Error";
            document.getElementById("statusText").className =
              "status-value error";
            document.getElementById("startBtn").disabled = false;
          }
        } else {
          document.getElementById("statusText").textContent =
            "No formula found";
          document.getElementById("statusText").className =
            "status-value error";
          document.getElementById("startBtn").disabled = false;
        }
      }
    );
  };

  window.transferResults = function () {
    if (!window.goCheckStatus) return;

    const status = window.goCheckStatus();

    const params = status.current_paramters || [];
    const parameterCells = getParameterCells();

    if (params.length === 0 || parameterCells.length === 0) {
      alert("No results to transfer.");
      return;
    }

    Asc.scope.transferData = parameterCells.map((p, i) => ({
      cell: p.cell,
      value: params[i] !== undefined ? params[i] : 0,
    }));

    window.Asc.plugin.callCommand(
      function () {
        var sheet = Api.GetActiveSheet();

        // Check if user uses . or , for dec seps.
        
        var a1 = sheet.GetRange("A1");

        var a1f_old = a1.GetFormula();
        var a1v_old = a1.GetValue();

        a1.SetValue(1.001);
        const a1v = a1.GetValue();
        var needsReplacement = false;

        if (a1v === 1.001 || a1v === "1.001") {
          needsReplacement = false;
        } else {
          needsReplacement = true;
        }

        // restore A1

        if (a1f_old) {
          a1.SetValue(a1f_old);
        } else if (a1v_old) {
          a1.SetValue(a1v_old);
        } else {
          a1.SetValue("");
        }

        var data = Asc.scope.transferData;
        for (var i = 0; i < data.length; i++) {
          var rng = sheet.GetRange(data[i].cell);
          if (rng) {
            if (needsReplacement) {
              rng.SetValue(data[i].value.toString().replace(".", ","));
            } else {
              rng.SetValue(data[i].value);
            }
          }
        }
      },
      false,
      true
    );
  };
})();
