const tr = (s) =>
    (window.Asc && window.Asc.plugin && typeof window.Asc.plugin.tr === "function")
        ? window.Asc.plugin.tr(s) : s;

// Initialize the plugin
window.Asc.plugin.init = function() {};

window.Asc.plugin.button = function() {
    this.executeCommand("close", "");
};

// Context menu display event
Asc.plugin.attachEvent("onContextMenuShow", (options) => {
    const items = {
        guid: window.Asc.plugin.guid,
        items: [{
            id: "onClickItem1",
            text: { zh: "繁简转换器", en: "convert" },
            items: [{
                    id: "convertChineseToFan",
                    text: { zh: "简体字转繁体字", en: "Convert Select to Traditional" },
                },
                {
                    id: "convertFanToChinese",
                    text: { zh: "繁体字转简体字", en: "Convert Select to Simplified" },
                },
                {
                    id: "addPinyin",
                    text: { zh: "添加拼音", en: "Add pinyin" },
                },
                {
                    id: "removePinyin",
                    text: { zh: "移除拼音", en: "Remove pinyin" },
                },
            ],
        }]
    };
    window.Asc.plugin.executeMethod("UpdateContextMenuItem", [items]);
});

function handleTextOperation(id) {
    switch (window.Asc.plugin.info.editorType) {
        case 'word': {
            getSelectedText(id);
            break;
        }
        case 'cell': {
            window.Asc.plugin.callCommand(function() {
                var oWorksheet = Api.GetActiveSheet();
                var oRange = oWorksheet.GetSelection();
                var selectedText = oRange.GetValue();
                return selectedText;
            }, false, false, (selectedText) => {
                if (typeof selectedText !== 'string') {
                    core(id, selectedText);
                }else getSelectedText(id, selectedText);
            });
            break;
        }
    }
}

function getSelectedText(id, preselectedText = null) {
    Asc.scope.preselectedText = preselectedText;
    const props = {
        Numbering: false,
        Math: false,
        TableCellSeparator: "\n",
        TableRowSeparator: "\n",
        ParaSeparator: "\n",
        TabSymbol: "\t",
        NewLineSeparator: "\r",
    };
    window.Asc.plugin.executeMethod("GetSelectedText", [props], function (data) {
        data = data || Asc.scope.preselectedText;
        if (data && data.trim() !== '') {
            core(id, data);
        } else {
            showToast(tr("Please select some text first"), "#FFAA00", 3000);
        }
    });
}

window.Asc.plugin.event_onContextMenuClick = (id) => {
    handleTextOperation(id);
};

function action(id) {
    handleTextOperation(id);
}

function core(id, selectedText) {
    const fileType = window.Asc.plugin.info.editorType;
    if (id == "convertChineseToFan") {
        replaceTranslatedText(selectedText, fileType, 'cn', 'tw');
    } else if (id == "convertFanToChinese") {
        replaceTranslatedText(selectedText, fileType, 'tw', 'cn');
    } else if (id == "addPinyin") {
        replaceTextSmart(addPinyinAnnotations(selectedText));
    } else if (id == "removePinyin") {
        replaceTextSmart(removePinyinAnnotations(selectedText));
    }
    showToast(tr("Success!"));
}

function replaceTranslatedText(selectedText, fileType, curLang, targetLang){
    const converter = OpenCC.Converter({ from: curLang, to: targetLang });   // what is openCC.converters
    let translatedArray = [];
    if(fileType === 'cell'){
        if(typeof selectedText === 'string') {
            selectedText = [[selectedText]];
        }
        for(let i = 0; i < selectedText.length; i++) {
            selectedText[i].forEach(element => {
                const translatedText = converter(element);
                translatedArray.push(translatedText);
            });
        }
    }else {
        const translatedText = converter(selectedText);
        translatedArray = textSeperator(translatedText);
    }
    replaceTextSmart(translatedArray);
}

function replaceTextSmart(replacementText){
    Asc.scope.newText = replacementText;
    window.Asc.plugin.executeMethod ("ReplaceTextSmart", [Asc.scope.newText, "\t", "\n"],
        function (isDone) {
        if (!isDone)
            window.Asc.plugin.callCommand (function () {
                Api.ReplaceTextSmart (Asc.scope.newText);
            });
    });
}

function textSeperator(text) {
    const result = text.split(/\n/).map(line => line.replace('\r', '\n'));
    if (result.length > 0 && result[result.length - 1] === '')result.pop();
    return result;
}

function addPinyinAnnotations(text) {
    let result = [], idx = 0;
    if(typeof text !== 'string') {
        for(let i = 0; i < text.length; i++) {
            text[i].forEach(element => {
                const filteredPinyins = addPinyin(element);
                let tempIdx = 0, tempResult = '';
                for(let i=0; i<element.length; i++) {
                    const ch = element[i];
                    if (/[\u4e00-\u9fa5]/.test(ch)) {
                        tempResult += `${ch}(${filteredPinyins[tempIdx]})`;
                        tempIdx++;
                    }else {
                        tempResult += ch;
                    }
                }
                result.push(tempResult);
            });
        }
    }else {
        const filteredPinyins = addPinyin(text);
        const textArray = textSeperator(text);   
        for (let i = 0; i < textArray.length; i++) {
            const char = textArray[i];
            let lineResult = '';
            for(let j = 0; j < char.length; j++) {
                const ch = char[j];
                if (/[\u4e00-\u9fa5]/.test(ch)) {
                    const py = filteredPinyins[idx];
                    lineResult += `${ch}(${py})`;
                    idx++;
                } else {
                    lineResult += ch;
                }
            }
            result.push(lineResult);
        }
    }
    return result;
}

function addPinyin(text){
    // 1. 使用 pinyin-pro 一次性获取整段文字的拼音数组
    const pinyins = pinyinPro.pinyin(text, {
        toneType: 'symbol', // 带音调符号
        multiple: false, // 只取一个读音（库会根据上下文判断）
        type: 'array' // 返回数组形式，和原文字一一对应
    });
    const filteredPinyins = pinyins.filter((py, index) => {
        // Get the corresponding character from the original text
        const char = text[index];
        // Only keep pinyin for Chinese characters
        return char && /[\u4e00-\u9fa5]/.test(char);
    });
    return filteredPinyins;
}

function removePinyinAnnotations(textArray) {
    let ans = [];
    if(typeof textArray !== 'string') {
        for(let i = 0; i < textArray.length; i++) {
            textArray[i].forEach(element => {
                const noPinyin = element.replace(/([\u4e00-\u9fa5])\([^)]*\)/g, '$1');
                ans.push(noPinyin);
            });
        }
    }else {
        const selectedArray = textSeperator(textArray);
        ans = selectedArray.map(text => text.replace(/([\u4e00-\u9fa5])\([^)]*\)/g, '$1'));
    }
    return ans;
}

function showToast(message, backgroundColor = "#4BB543", duration = 1000) {
    const toast = document.getElementById('toast');
    toast.style.backgroundColor = backgroundColor
    toast.textContent = message; // 更新文字
    toast.classList.add('show'); // 显示

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

window.Asc.plugin.onTranslate = function() {
    document.getElementById("operatorHints").innerHTML = tr("Please select the text you want to operate and click the corresponding operation button.");
    document.getElementById("button1").innerHTML = tr("Simplified → Traditional");
    document.getElementById("button2").innerHTML = tr("Traditional → Simplified");
    document.getElementById("button3").innerHTML = tr("Add pinyin");
    document.getElementById("button4").innerHTML = tr("Remove pinyin");
    document.getElementById("operatorHints2").innerHTML = tr("Tip: Right-click after selecting text to use the function directly.");
}
