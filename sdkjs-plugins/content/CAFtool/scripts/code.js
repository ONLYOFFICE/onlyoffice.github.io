// scripts/code.js
(function (window, undefined) {
  
  // ---------------- 初始化 ----------------
  window.Asc.plugin.init = function () {
    // this.executeMethod("AddToolbarMenuItem", [getToolbarItems()]);
    bindToolbarEvents.call(this);
  };

  // 子窗口句柄
  let __toolbarAdded = false;
  let winSetting = null;
  let winOptions = null;
  let winReport  = null;
  let reportApplyTimer = null; // ⬅️ 新增

  const REPORT_CLOSE_MS = 1000;
  // 放在 (function (window, undefined) { 之后的任意顶层位置
  const tr = (s) => (window.Asc && window.Asc.plugin ? window.Asc.plugin.tr(s) : s);
  // —— 本地化回调：词典就绪后，刷新工具栏文本与提示 —— 
  window.Asc.plugin.onTranslate = function () {
    // ……你原来的 setText / 提示等本地化代码（如果有）……
    const items = getToolbarItems(); // 这里的 tabs[0].text 要用 tr("Chinese Auto-format Tool")
    if (!__toolbarAdded) {
      // ✅ 第一次：用当前语言创建分页，tab 标题会用中文
      window.Asc.plugin.executeMethod("AddToolbarMenuItem", [items]);
      __toolbarAdded = true;
    } else {
      // ✅ 之后语言切换：只更新按钮文字/提示
      window.Asc.plugin.executeMethod("UpdateToolbarMenuItem", [items]);
    }
  };




  // report.html → 主窗口：接收 Asc.PluginWindow 发来的消息
  window.Asc.plugin.onMessage = function (data) {
    if (!data) return;
    if (data.type === 'apply-now' && Array.isArray(data.lines)) {
      Asc.scope.convertedLines = data.lines;

      // 用回调保证替换完成后再关窗
      window.Asc.plugin.callCommand(
        function () {
          if (Asc.scope.convertedLines) {
            Api.ReplaceTextSmart(Asc.scope.convertedLines);
          }
        },
      /* isClose */ false,
      /* isCalculate */ true,
      /* callback */ function () {
          try { localStorage.setItem('currentSelectionLines', JSON.stringify(data.lines)); } catch (e) { }
          // if (winReport) { try { winReport.close(); } catch (e) { } winReport = null; }
          setTimeout(() => {
            if (winReport) { try { winReport.close(); } catch (e) { } winReport = null; }
          }, REPORT_CLOSE_MS);
        }
      );
    }
  };



  // 生成绝对 URL
  function resolveUrl(path) {
    try { return new URL(path, window.location.href).toString(); }
    catch (e) { return path; }
  }

  // ---------------- 统一进入报告流程 ----------------
  function proceedToReport(selectedText) {
    let results;
    try {
      // 依赖 scripts/formatChecker.js 中的 runFormatCheck(text)
      results = runFormatCheck(selectedText);
    } catch (e) {
      console.error("runFormatCheck error:", e);
      window.Asc.plugin.executeMethod("ShowError", [tr("Detection failed: formatChecker.js is missing or has an error")]);
      return;
    }

    const lines  = selectedText.split(/\r?\n/);     // 不过滤空行，保持行数一致
    const fixed  = results.map(r => r.fixed);
    const report = results.filter(r => r.errors && r.errors.length > 0);

    if (lines.length !== fixed.length) {
      window.Asc.plugin.executeMethod("ShowError", [tr("Conversion failed: paragraph count mismatch")]);
      return;
    }
    if (report.length === 0) {
      window.Asc.plugin.executeMethod("ShowError", [tr("No fixable issues found")]);
      return;
    }

    // 供报告页与撤销/连续修改使用的共享数据
    localStorage.setItem("zhlintReport", JSON.stringify(report, null, 2));
    localStorage.setItem("originalLines", JSON.stringify(lines));
    localStorage.setItem("fixedLines", JSON.stringify(fixed));
    localStorage.setItem("currentSelectionLines", JSON.stringify(lines)); // 基线：首次进入报告即为原文
    localStorage.removeItem("batchReplaceResult");
    localStorage.removeItem("zhlintUndoLines");

    if (winReport) { try { winReport.close(); } catch(e) {} winReport = null; }
    winReport = new window.Asc.PluginWindow();
    winReport.show({
      url: resolveUrl("panels/report.html"),
      description: tr("Formatting report"),
      isModal: false,
      isVisual: true,
      size: [720, 480],
      EditorsSupport: ["word","cell","slide"],
      buttons: [{ text: tr("Apply & Save"), primary: true }, { text: tr("Cancel"), primary: false }]
    });
  }

  // 打开选项页后轮询等待结果
  function watchSpaceOptions(selectedText) {
    localStorage.removeItem('spaceOptReady');

    const timer = setInterval(() => {
      const ready = localStorage.getItem('spaceOptReady') === '1';
      const open  = localStorage.getItem('spaceOptOpen')  === '1';

      if (ready) {
        clearInterval(timer);
        try { if (winOptions) { winOptions.close(); winOptions = null; } } catch (e) {}
        localStorage.removeItem('spaceOptReady');
        localStorage.removeItem('spaceOptOpen');
        proceedToReport(selectedText);
      } else if (!open) {
        clearInterval(timer);
      }
    }, 80);
  }

  // ---------------- 绑定工具栏按钮 ----------------
  function bindToolbarEvents() {
    // A. 强制转全角
    this.attachToolbarMenuClickEvent("quanjiao", function () {
      const settings = {
        punctuation: JSON.parse(localStorage.getItem('selectedPunctuation') || '[]')
      };
      const halfToFullMap = {
        ",": "，", ";": "；", ":": "：", ".": "。", "\"": "”", "'": "’",
        // 破折号：将半角连字符/短划线归一到中文常用的 EM DASH（—）
        "-": "—", "–": "—",
        // 货币
        "$": "＄", "¥": "￥", "£": "￡", "¢": "￠",
        "<": "《", ">": "》", "(": "（", ")": "）", "/": "／", "?": "？", "!": "！"
      };
      this.executeMethod("GetSelectedText", [{
        Numbering:false, Math:false,
        TableCellSeparator:'\n', TableRowSeparator:'\n',
        ParaSeparator:'\n', TabSymbol:'\t', NewLineSeparator:'\n'
      }], (selectedText) => {
        if (!selectedText || !selectedText.trim()) {
          window.Asc.plugin.executeMethod("ShowError", [tr("Please select text first!")]);
          return;
        }
        const originalLines = selectedText.split(/\r?\n/);
        const convertedLines = originalLines.map(line => {
          let s = line;

          // ✅ 省略号归一：任何连续 3 个及以上的点，先收敛为中文省略号“……”
          s = s.replace(/(?:\.{3,}|…+)/g, "……")

          for (const [half, full] of Object.entries(halfToFullMap)) {
            if (settings.punctuation.length === 0 || settings.punctuation.includes(full)) {
              s = s.replace(new RegExp(half.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), full);
            }
          }
          return s;
        });
        Asc.scope.convertedLines = convertedLines;
        window.Asc.plugin.callCommand(function () {
          if (Asc.scope.convertedLines) Api.ReplaceTextSmart(Asc.scope.convertedLines);
        });
      });
    });

    // B. 强制转半角
    this.attachToolbarMenuClickEvent("banjiao", function () {
      const settings = {
        punctuation: JSON.parse(localStorage.getItem('selectedPunctuation') || '[]')
      };
      const fullToHalfMap = {
        "，": ",", "；": ";", "：": ":", "。": ".",
        "“": "\"", "”": "\"", "‘": "'", "’": "'",
        // 破折号：中文 EM DASH 与全角连字符都收敛成半角连字符
        "—": "-", "－": "-",
        // 货币
        "＄": "$", "￥": "¥", "￡": "£", "￠": "¢",
        "《": "<", "》": ">", "（": "(", "）": ")", "？": "?", "！": "!", "／": "/"
      };
      this.executeMethod("GetSelectedText", [{
        Numbering:false, Math:false,
        TableCellSeparator:'\n', TableRowSeparator:'\n',
        ParaSeparator:'\n', TabSymbol:'\t', NewLineSeparator:'\n'
      }], (selectedText) => {
        if (!selectedText || !selectedText.trim()) {
          window.Asc.plugin.executeMethod("ShowError", [tr("Please select text first!")]);
          return;
        }
        const originalLines = selectedText.split(/\r?\n/);
        const convertedLines = originalLines.map(line => {
          let s = line;
          for (const [full, half] of Object.entries(fullToHalfMap)) {
            if (settings.punctuation.length === 0 || settings.punctuation.includes(full)) {
              s = s.replace(new RegExp(full.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), half);
            }
          }
          return s;
        });
        Asc.scope.convertedLines = convertedLines;
        window.Asc.plugin.callCommand(function () {
          if (Asc.scope.convertedLines) Api.ReplaceTextSmart(Asc.scope.convertedLines);
        });
      });
    });

    // C. 智能转换 → 空格策略 → 进入报告
    this.attachToolbarMenuClickEvent("zhineng", function () {
      this.executeMethod("GetSelectedText", [{
        Numbering:false, Math:false,
        TableCellSeparator:'\n', TableRowSeparator:'\n',
        ParaSeparator:'\n', TabSymbol:'\t', NewLineSeparator:'\n'
      }], (selectedText) => {
        if (!selectedText || !selectedText.trim()) {
          window.Asc.plugin.executeMethod("ShowError", [tr("Please select the text to diagnose!")]);
          return;
        }

        localStorage.setItem("smart_source_text", selectedText);
        localStorage.removeItem("spaceOptReady");
        if (winOptions) { try { winOptions.close(); } catch (e) {} winOptions = null; }
        winOptions = new window.Asc.PluginWindow();
        winOptions.show({
          url: resolveUrl("panels/space-options.html"),
          description: tr("Spacing options"),
          isModal: true,
          isVisual: true,
          size: [560, 340],
          EditorsSupport: ["word","cell","slide"],
          buttons: [{ text: tr("Confirm"), primary: true }, { text: tr("Cancel"), primary: false }]
        });

        watchSpaceOptions(selectedText);
      });
    });

    // D. 设置
    this.attachToolbarMenuClickEvent("setting", function () {
      if (winSetting) { try { winSetting.close(); } catch (e) {} winSetting = null; }
      winSetting = new window.Asc.PluginWindow();
      winSetting.show({
        url: resolveUrl("panels/setting.html"),
        description: tr("Settings"),
        isModal: true,
        isVisual: true,
        size: [360, 360],
        buttons: [{ text: tr("Save"), primary: false }],
        EditorsSupport: ["word","slide","cell"]
      });
    });
  }

  // ---------------- 统一窗口关闭回调 ----------------
  window.Asc.plugin.button = function (id, windowId) {
    if (winSetting && windowId === winSetting.id) {
      try { winSetting.close(); } catch (e) {}
      winSetting = null;
      return;
    }

    if (winOptions && windowId === winOptions.id) {
      // ⬇️ 新增：id===0 为 Confirm；id===1 为 Cancel
      if (id === 0) {
        localStorage.setItem("spaceOptReady", "1");   // 交给后续逻辑判断/推进
      } else {
        localStorage.removeItem("spaceOptReady");
      }

      try { winOptions.close(); } catch (e) {}
      winOptions = null;

      const ok = (localStorage.getItem("spaceOptReady") === "1");
      const selectedText = localStorage.getItem("smart_source_text") || "";
      localStorage.removeItem("spaceOptReady");

      if (ok && selectedText.trim()) {
        proceedToReport(selectedText);
      }
      return;
    }

    if (winReport && windowId === winReport.id) {
      if (id === 0) {
        localStorage.setItem('reportApplyNow', '1');  // 触发子页执行

        // ✅ 新增：兜底轮询等待子页产出结果（避免消息通道被拦截时卡住）
        if (reportApplyTimer) { clearInterval(reportApplyTimer); reportApplyTimer = null; }
        reportApplyTimer = setInterval(() => {
          // 子窗已经被关就停止
          if (!winReport) { clearInterval(reportApplyTimer); reportApplyTimer = null; return; }

          const ready = localStorage.getItem('reportApplyReady') === '1';
          if (!ready) return;

          clearInterval(reportApplyTimer); reportApplyTimer = null;
          localStorage.removeItem('reportApplyReady');

          const replaceResult = localStorage.getItem('batchReplaceResult');
          if (!replaceResult) return;

          try { Asc.scope.convertedLines = JSON.parse(replaceResult); } catch (e) { Asc.scope.convertedLines = null; }
          window.Asc.plugin.callCommand(function () {
            if (Asc.scope.convertedLines) Api.ReplaceTextSmart(Asc.scope.convertedLines);
          }, false, true, function () {
            try { localStorage.setItem('currentSelectionLines', replaceResult); } catch (e) { }
            if (winReport) { try { winReport.close(); } catch (e) { } winReport = null; }
          }, REPORT_CLOSE_MS);
        }, 1000);

        return; // 交给上面的轮询/消息回调来收尾
      }



      try { winReport.close(); } catch (e) { }
      winReport = null;

      const closeReason = localStorage.getItem("reportCloseReason") || "open";
      localStorage.removeItem("reportCloseReason");

      const replaceResult = localStorage.getItem("batchReplaceResult");

      // ☆ 新增功能：未点击“确定并保存”，直接点 × 关闭 → 弹错误提示
      if (closeReason === "closed_without_save") {
        localStorage.removeItem("batchReplaceResult"); // 清理潜在脏数据
        if (typeof showNotice === "function") {
          // 第二个参数 true 表示“错误/危险”风格（按你项目里的约定）
          showNotice("你没有保存任何需要修改的内容", true);
        } else {
          alert("你没有保存任何需要修改的内容");
        }
        return;
      }

      // 正常保存关闭：应用替换（安全兜底：缺结果就静默返回）
      if (!replaceResult) return;
      Asc.scope.convertedLines = JSON.parse(replaceResult);
      localStorage.removeItem("batchReplaceResult");
      window.Asc.plugin.callCommand(function () {
        if (Asc.scope.convertedLines) Api.ReplaceTextSmart(Asc.scope.convertedLines);
      });
      return;
    }



  };

  // ---------------- 工具栏定义 ----------------
  function getToolbarItems() {
    return {
      guid: window.Asc.plugin.guid,
      tabs: [{
        id: "tab_2",
        text: window.Asc.plugin.tr("Chinese Auto-format Tool"), 
        items: [
          { id:"zhineng", type:"button", text:tr("Smart Convert"), hint:tr("Validate Chinese typography automatically"), icons:"resources/buttons/icon_zhineng.png", lockInViewMode:true, separator:true },
          { id:"quanjiao", type:"button", text:tr("Force Full-width"), hint:tr("Force all symbols in selection to full-width"), icons:"resources/buttons/icon_quanjiao.png", lockInViewMode:true, separator:true },
          { id:"banjiao",  type:"button", text:tr("Force Half-width"), hint:tr("Force all symbols in selection to half-width"), icons:"resources/buttons/icon_banjiao.png", lockInViewMode:true },
          { id:"setting",  type:"button", text:tr("Settings"), hint:tr("Configure conversion rules"), icons:"resources/buttons/icon_setting.png", lockInViewMode:true }
        ]
      }]
    };
  }
})(window);
