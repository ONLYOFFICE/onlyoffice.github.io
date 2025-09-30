// scripts/formatChecker.js
function runFormatCheck(text) {
  const addCjkAnSpace   = localStorage.getItem('opt_cjkAnSpace') === '1';
  const addNumUnitSpace = localStorage.getItem('opt_numUnitSpace') === '1';
  const alnumH2F        = localStorage.getItem('opt_alnumHalfToFull') === '1';
  const alnumF2H        = localStorage.getItem('opt_alnumFullToHalf') === '1';

  const lines = text.split(/\r?\n/);
  const results = [];

  for (let line of lines) {
    const errors = [];
    let fixed = line;

    // 0) 省略号规范化：连续 3 个及以上 '.' 或多个 '…' 统一为 “……”
// 0) 省略号规范化：任意连续点号（...、......）或任意个数的“…” → “……”
    const RE_ELLIPSIS = /(?:\.{3,}|…+)/g;
    if (RE_ELLIPSIS.test(fixed)) {
      fixed = fixed.replace(RE_ELLIPSIS, "……");
      errors.push({ message: "识别到省略号，已统一为“……”", rule: "smartEllipsis" });
    }


    // ① 中文 与 英文/数字 相邻：添加/删除空格（保持原有逻辑）
    const zhEn   = /([\u4e00-\u9fa5])([A-Za-z0-9])/g;
    const enZh   = /([A-Za-z0-9])([\u4e00-\u9fa5])/g;
    const zhEnSp = /([\u4e00-\u9fa5])\s+([A-Za-z0-9])/g;
    const enZhSp = /([A-Za-z0-9])\s+([\u4e00-\u9fa5])/g;

    if (addCjkAnSpace) {
      if (zhEn.test(fixed) || enZh.test(fixed)) {
        fixed = fixed.replace(zhEn, "$1 $2").replace(enZh, "$1 $2");
        errors.push({ message: "按设置：中文与英文/数字之间已添加空格", rule: "spaceBetweenMixedLang:add" });
      }
    } else {
      if (zhEnSp.test(fixed) || enZhSp.test(fixed)) {
        fixed = fixed.replace(zhEnSp, "$1$2").replace(enZhSp, "$1$2");
        errors.push({ message: "按设置：已删除中文与英文/数字之间的空格", rule: "spaceBetweenMixedLang:remove" });
      }
    }

    // ② 数字 与 单位/符号（含百分号）（保持原有逻辑）
    if (addNumUnitSpace) {
      const numUnit = /(\d)([A-Za-z]{1,4})(?![A-Za-z])/g; // 10kg -> 10 kg
      if (numUnit.test(fixed)) {
        fixed = fixed.replace(numUnit, "$1 $2");
        errors.push({ message: "按设置：数字与单位之间已添加空格", rule: "numberUnitSpacing:add" });
      }
      const percentAdd = /(\d+)%/g; // 30% -> 30 %
      if (percentAdd.test(fixed)) {
        fixed = fixed.replace(percentAdd, "$1 %");
        errors.push({ message: "按设置：百分号前已添加空格", rule: "percentSpacing:add" });
      }
    } else {
      const rmUnit = /(\d)\s+([A-Za-z]{1,4})(?![A-Za-z])/g; // 10 kg -> 10kg
      if (rmUnit.test(fixed)) {
        fixed = fixed.replace(rmUnit, "$1$2");
        errors.push({ message: "按设置：已删除数字与单位之间的空格", rule: "numberUnitSpacing:remove" });
      }
      const rmPercent = /(\d+)\s+%/g; // 30 % -> 30%
      if (rmPercent.test(fixed)) {
        fixed = fixed.replace(rmPercent, "$1%");
        errors.push({ message: "按设置：已删除百分号前的空格", rule: "percentSpacing:remove" });
      }
    }
    // // ②b 字母数字的半/全角转换（按开关；两者都选时优先“全角→半角”避免互相抵消）
    // if (alnumF2H) {
    //   const reFW = /[\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A]/g; // 全角 0-9 A-Z a-z
    //   if (reFW.test(fixed)) {
    //     fixed = fixed.replace(reFW, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0));
    //     errors.push({ message: "已将全角字母数字转为半角", rule: "alnumFullToHalf" });
    //   }
    // } else if (alnumH2F) {
    //   const reHW = /[0-9A-Za-z]/g; // 半角 0-9 A-Z a-z
    //   if (reHW.test(fixed)) {
    //     fixed = fixed.replace(reHW, ch => String.fromCharCode(ch.charCodeAt(0) + 0xFEE0));
    //     errors.push({ message: "已将半角字母数字转为全角", rule: "alnumHalfToFull" });
    //   }
    // }

  
    // ③a 引号方向性（基础启发式）：把 ASCII 引号尽量转成中文左/右引号
    //   - 开引号：行首或在空白/左括类/左书名号后出现的 " / ' 视为开引号
    //   - 闭引号：在行尾或空白/右括类/右书名号/句读符前的 " / ' 视为闭引号
    const OPEN_LEFT = /(^|[\s(\[（【《])"(?=\S)/g;
    const OPEN_LEFT_S = /(^|[\s(\[（【《])'(?=\S)/g;
    const CLOSE_RIGHT = /"(?=$|[\s)\]）】》，。；：、,.!?！？”])|"(?![^"]*")/g;
    const CLOSE_RIGHT_S = /'(?=$|[\s)\]）】》，。；：、,.!?！?’])|'(?![^']*')/g;

    if (OPEN_LEFT.test(fixed) || CLOSE_RIGHT.test(fixed) || OPEN_LEFT_S.test(fixed) || CLOSE_RIGHT_S.test(fixed)) {
      fixed = fixed
        .replace(OPEN_LEFT,  '$1“')
        .replace(CLOSE_RIGHT, '”')
        .replace(OPEN_LEFT_S, '$1‘')
        .replace(CLOSE_RIGHT_S,'’');
      errors.push({ message: "已智能替换为中文引号（“ ” / ‘ ’）", rule: "smartQuotes" });
    }

    // ③b 半角标点 → 全角（覆盖你要求的 17 类）
    const halfToFullMap = {
      ",":"，",";":"；",":":"：",".":"。",
      "\"":"”","'":"’",           // 若 ③a 未命中，剩余 ASCII 引号默认收敛为右引号
      "<":"《",">":"》",
      "/":"／","?":"？","!":"！",
      "-":"—","–":"—",            // 破折号：半角连字符/短划线 → 中文 EM DASH
      "$":"＄","¥":"￥","£":"￡"   // 货币：美元/人民币/英镑
      // 注：你未要求括号，这里不动（如需加：(":"（"), ):"）"）
    };
    for (const [half, full] of Object.entries(halfToFullMap)) {
      const re = new RegExp(half.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "g");
      if (re.test(fixed)) {
        fixed = fixed.replace(re, full);
        errors.push({ message: `使用了半角标点「${half}」`, rule: "fullwidthPunctuation" });
      }
    }

    // ④ 连续空格 → 单空格（保持原有逻辑）
    const extraSpaces = / {2,}/g;
    if (extraSpaces.test(fixed)) {
      fixed = fixed.replace(extraSpaces, " ");
      errors.push({ message: "存在连续空格", rule: "trimExtraSpaces" });
    }

    results.push({ original: line, fixed, errors });
  }
  return results;
}
