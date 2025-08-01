(function (window, undefined) {


  // ✅ 初始化插件
  window.Asc.plugin.init = function () {
    this.executeMethod("AddToolbarMenuItem", [getToolbarItems()]);
    bindToolbarEvents.call(this);  // 绑定按钮事件
  };

  // ✅ 工具栏按钮事件绑定
  function bindToolbarEvents() {
    // 🔆 强制转全角
    this.attachToolbarMenuClickEvent("quanjiao", function () {
      console.log("强制转全角按钮被点击了！");


      // 从 localStorage 读取设置
      const settings = {
        punctuation: JSON.parse(localStorage.getItem('selectedPunctuation') || '[]'),
        autoSpace: localStorage.getItem('autoSpace') === '1',
        trimSpaces: localStorage.getItem('trimSpaces') === '1'
      };

      console.log("所选标点符号：", settings.punctuation);

      // 半角 → 全角 映射表（用于转换）
      const halfToFullMap = {
        ",": "，",
        ";": "；",
        ":": "：",
        ".": "。",
        "\"": "”",
        "'": "’",
        "<": "《",
        ">": "》",
        "(": "（",
        ")": "）",
        "/": "／",
        "?": "？",
        "!": "！"
      };

      this.executeMethod("GetSelectedText", [{
        Numbering: false,
        Math: false,
        TableCellSeparator: '\n',
        TableRowSeparator: '\n',
        ParaSeparator: '\n',
        TabSymbol: '\t',
        NewLineSeparator: '\n'
      }], (selectedText) => {

        // 判断是否为空或仅空格
        if (!selectedText || !selectedText.trim()) {
          window.Asc.plugin.executeMethod("ShowError", ["请先选中需要转换的文字！"]);
          return; // 阻止继续执行打开窗口
        }

        if (selectedText && selectedText.trim()) {
          const originalLines = selectedText.split(/\r?\n/).filter(line => line.trim());
          console.log(`📋 原始段落数：${originalLines.length}`);
          console.log("🔍 原始段落内容：", originalLines);

          // ✅ 按照设置执行半角→全角替换
          let convertedLines = originalLines.map(line => {
            Object.entries(halfToFullMap).forEach(([half, full]) => {
              if (settings.punctuation.includes(full)) {
                const regex = new RegExp(half.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                line = line.replace(regex, full);
              }
            });
            return line;
          });

          console.log("🔁 转换后段落内容：", convertedLines);

          if (originalLines.length !== convertedLines.length) {
            console.warn("⚠️ 段落数量不一致，取消替换");
            window.Asc.plugin.executeMethod("ShowError", ["转换失败：段落数量不一致"]);
            return;
          }

          Asc.scope.convertedLines = convertedLines;

          try {
            window.Asc.plugin.callCommand(function () {
              if (Asc.scope.convertedLines && Asc.scope.convertedLines.length > 0) {
                Api.ReplaceTextSmart(Asc.scope.convertedLines);
              }
            });
            console.log("✅ 使用 ReplaceTextSmart 完成段落替换");
          } catch (e) {
            console.error("❌ ReplaceTextSmart 调用失败：", e);
            window.Asc.plugin.executeMethod("ShowError", ["替换操作失败，请检查插件日志"]);
          }

        } else {
          window.Asc.plugin.executeMethod("ShowMessage", ["请先选中要转换的内容"]);
          console.warn("⚠️ 未检测到选中内容，转换中止");
        }
      });
    });

    // 🔆 强制转半角
    this.attachToolbarMenuClickEvent("banjiao", function () {
      console.log("强制转半角按钮被点击了！");

      // ✅ 从 localStorage 获取用户设置
      const settings = {
        punctuation: JSON.parse(localStorage.getItem('selectedPunctuation') || '[]')
      };

      console.log("所选标点符号：", settings.punctuation);

      // ✅ 全角 → 半角 映射表
      const fullToHalfMap = {
        "，": ",",
        "；": ";",
        "：": ":",
        "。": ".",
        "“": "\"",
        "”": "\"",
        "《": "<",
        "》": ">",
        "（": "(",
        "）": ")",
        "？": "?",
        "！": "!",
        "／": "/"
      };


      this.executeMethod("GetSelectedText", [{
        Numbering: false,
        Math: false,
        TableCellSeparator: '\n',
        TableRowSeparator: '\n',
        ParaSeparator: '\n',
        TabSymbol: '\t',
        NewLineSeparator: '\n'
      }], (selectedText) => {

        // 判断是否为空或仅空格
        if (!selectedText || !selectedText.trim()) {
          window.Asc.plugin.executeMethod("ShowError", ["请先选中需要转换的文字！"]);
          return; // 阻止继续执行打开窗口
        }

        if (selectedText && selectedText.trim()) {
          const originalLines = selectedText.split(/\r?\n/).filter(line => line.trim());
          console.log(`📋 原始段落数：${originalLines.length}`);
          console.log("🔍 原始段落内容：", originalLines);

          // ✅ 按照设置执行全角 → 半角转换
          let convertedLines = originalLines.map(line => {
            Object.entries(fullToHalfMap).forEach(([full, half]) => {
              if (settings.punctuation.includes(full)) {
                const regex = new RegExp(full.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                line = line.replace(regex, half);
              }
            });
            return line;
          });

          console.log("🔁 转换后段落内容：", convertedLines);

          if (originalLines.length !== convertedLines.length) {
            console.warn("⚠️ 段落数量不一致，取消替换");
            window.Asc.plugin.executeMethod("ShowError", ["转换失败：段落数量不一致"]);
            return;
          }

          Asc.scope.convertedLines = convertedLines;

          try {
            window.Asc.plugin.callCommand(function () {
              if (Asc.scope.convertedLines && Asc.scope.convertedLines.length > 0) {
                Api.ReplaceTextSmart(Asc.scope.convertedLines);
              }
            });
            console.log("✅ 使用 ReplaceTextSmart 完成段落替换");
          } catch (e) {
            console.error("❌ ReplaceTextSmart 调用失败：", e);
            window.Asc.plugin.executeMethod("ShowError", ["替换操作失败，请检查插件日志"]);
          }

        } else {
          window.Asc.plugin.executeMethod("ShowMessage", ["请先选中要转换的内容"]);
          console.warn("⚠️ 未检测到选中内容，转换中止");
        }
      });
    });



    // 🔆 智能转换
    this.attachToolbarMenuClickEvent("zhineng", function () {
      console.log("🧠 [格式检测] 智能转换按钮被点击");

      this.executeMethod("GetSelectedText", [{
        Numbering: false,
        Math: false,
        TableCellSeparator: '\n',
        TableRowSeparator: '\n',
        ParaSeparator: '\n',
        TabSymbol: '\t',
        NewLineSeparator: '\n'
      }], function (selectedText) {
        // 判断是否为空或仅空格
        if (!selectedText || !selectedText.trim()) {
          window.Asc.plugin.executeMethod("ShowError", ["请先选中需要诊断的文字！"]);
          return; // 阻止继续执行打开窗口
        }

        const lines = selectedText.split(/\r?\n/).filter(l => l.trim());
        const results = runFormatCheck(selectedText);
        const fixedResults = results.map(r => r.fixed);
        const report = results.filter(r => r.errors.length > 0);

        console.log("📥 原始段落数：", lines.length);
        console.log("📤 修复后段落数：", fixedResults.length);

        if (lines.length !== fixedResults.length) {
          window.Asc.plugin.executeMethod("ShowMessage", ["转换失败：段落数量不一致"]);
          return;
        }

        if (report.length === 0) {
          window.Asc.plugin.executeMethod("ShowMessage", ["未发现可修复问题"]);
          return;
        }

        // ✅ 保存中间数据
        localStorage.setItem("zhlintReport", JSON.stringify(report, null, 2));
        localStorage.setItem("originalLines", JSON.stringify(lines));
        localStorage.setItem("fixedLines", JSON.stringify(fixedResults));
        localStorage.removeItem("batchReplaceResult"); // 清除旧数据

        // ✅ 打开报告窗口
        const win = new window.Asc.PluginWindow();
        win.show({
          url: "panels/report.html",
          description: "格式化错误报告",
          isModal: false,
          isVisual: true,
          size: [720, 480],
          EditorsSupport: ["word"]
        });
        window.settingWindow = win;
      });

      window.Asc.plugin.button = function (id, windowId) {
        if (window.settingWindow && windowId === window.settingWindow.id) {
          window.settingWindow.close();
          window.settingWindow = null;
          console.log("🟢 设置窗口已关闭");

          const replaceResult = localStorage.getItem("batchReplaceResult");
          if (replaceResult) {
            console.log("🔁 发现 batchReplaceResult，准备替换");
            Asc.scope.convertedLines = JSON.parse(replaceResult);
            localStorage.removeItem("batchReplaceResult");

            window.Asc.plugin.callCommand(function () {
              console.log("🚀 正在执行 Api.ReplaceTextSmart");
              if (Asc.scope.convertedLines) {
                Api.ReplaceTextSmart(Asc.scope.convertedLines);
              } else {
                console.warn("⚠️ Asc.scope.convertedLines 为空");
              }
            });
          } else {
            console.log("ℹ️ 未发现 batchReplaceResult，不执行替换");
          }
        }
      };


    });




    // 🔆 设置按钮：设置转换规则
    this.attachToolbarMenuClickEvent("setting", function () {
      console.log("设置按钮被点击了！");

      if (window.settingWindow) {
        window.settingWindow.close();
        window.settingWindow = null;
      }

      const modalWindow = new window.Asc.PluginWindow();

      const variation = {
        url: "panels/setting.html",
        description: "",
        isModal: true,
        isVisual: true,
        size: [360, 360],
        buttons: [{ text: "保存", primary: false }],
        EditorsSupport: ["word", "slide", "cell", "pdf"]
      };

      modalWindow.show(variation);
      window.settingWindow = modalWindow;
    });

    window.Asc.plugin.button = function (id, windowId) {
      // ✅ 关闭设置窗口
      if (window.settingWindow && windowId === window.settingWindow.id) {
        window.settingWindow.close();
        window.settingWindow = null;
        console.log("设置窗口已关闭");
      }
    };



  }




  // ✅ 工具栏按钮定义
  function getToolbarItems() {
    return {
      guid: window.Asc.plugin.info.guid,
      tabs: [{
        id: "tab_2",
        text: "强迫症救星",
        items: [
          {
            id: "zhineng", type: "button",
            text: "智能转换", hint: "自动对中文文本内容进行校验",
            icons: "resources/buttons/icon_zhineng.png",
            lockInViewMode: true, separator: true
          },
          {
            id: "quanjiao", type: "button",
            text: "强制转全角", hint: "强制将选中的文字中，所有的符号转为全角符号",
            icons: "resources/buttons/icon_quanjiao.png",
            lockInViewMode: true, separator: true
          },
          {
            id: "banjiao", type: "button",
            text: "强制转半角", hint: "强制将选中的文字中，所有的符号转为半角符号。",
            icons: "resources/buttons/icon_banjiao.png",
            lockInViewMode: true
          },
          {
            id: "setting", type: "button",
            text: "设置", hint: "设置需要转换的条件",
            icons: "resources/buttons/icon_setting.png",
            lockInViewMode: true
          }
        ]
      }]
    };
  }



})(window);