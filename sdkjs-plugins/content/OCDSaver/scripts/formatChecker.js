// formatChecker.js

function runFormatCheck(text) {
  const lines = text.split(/\r?\n/).filter(line => line.trim());
  const results = [];

  lines.forEach((line) => {
    const errors = [];
    let fixed = line;

    // 中英文之间缺空格
    const zhEn = /([\u4e00-\u9fa5])([A-Za-z0-9])/g;
    const enZh = /([A-Za-z0-9])([\u4e00-\u9fa5])/g;
    if (zhEn.test(fixed) || enZh.test(fixed)) {
      fixed = fixed.replace(zhEn, "$1 $2").replace(enZh, "$1 $2");
      errors.push({ message: "中英文之间缺少空格", rule: "spaceBetweenMixedLang" });
    }

    // 数字和单位粘连
    const numUnit = /(\d)([a-zA-Z]{1,4})(?![a-zA-Z])/g;
    if (numUnit.test(fixed)) {
      fixed = fixed.replace(numUnit, "$1 $2");
      errors.push({ message: "数字与单位之间缺少空格", rule: "numberUnitSpacing" });
    }

    // 百分号前缺空格
    const percent = /(\d+)%/g;
    if (percent.test(fixed)) {
      fixed = fixed.replace(percent, "$1 %");
      errors.push({ message: "百分号前缺少空格", rule: "percentSpacing" });
    }

    // 半角标点替换为全角
    const halfToFullMap = {
      ",": "，", ".": "。", "?": "？", "!": "！", ":": "：", ";": "；"
    };
    for (const [half, full] of Object.entries(halfToFullMap)) {
      const regex = new RegExp(`\\${half}`, "g");
      if (regex.test(fixed)) {
        fixed = fixed.replace(regex, full);
        errors.push({ message: `使用了半角标点「${half}」`, rule: "fullwidthPunctuation" });
      }
    }

    // 多余空格（两个以上空格）
    const extraSpaces = / {2,}/g;
    if (extraSpaces.test(fixed)) {
      fixed = fixed.replace(extraSpaces, " ");
      errors.push({ message: "存在连续空格", rule: "trimExtraSpaces" });
    }

    results.push({
      original: line,
      fixed,
      errors
    });
  });

  return results;
}
