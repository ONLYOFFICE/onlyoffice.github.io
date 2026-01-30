/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
(function () {
    
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const imageContainer = document.getElementById('imageContainer');
    const recognizeButton = document.getElementById('recognizeButton');
    const clearButton = document.getElementById('clearButton');
    const resultContainer = document.getElementById('resultContainer');
    const appIdInput = document.getElementById('appId');
    const appKeyInput = document.getElementById('appKey');
    const outputFormatCheckboxes = document.querySelectorAll('input[name="outputFormat"]');
    const errorContainer = document.getElementById('errorContainer');
    const configPanel = document.getElementById('configPanel');
    const settingsButton = document.getElementById('settingsButton');
    const saveCredentialsBtn = document.getElementById('saveCredentialsBtn');

    let currentFiles = [];
    let recognitionResults = [];

    function applyTranslations() {
        var elements = document.getElementsByClassName("i18n");
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if (el.attributes["placeholder"]) {
                el.attributes["placeholder"].value = window.Asc.plugin.tr(el.attributes["placeholder"].value);
            }
            if (el.attributes["title"]) {
                el.attributes["title"].value = window.Asc.plugin.tr(el.attributes["title"].value);
            }
            if (el.innerText) {
                el.innerText = window.Asc.plugin.tr(el.innerText);
            }
        }
    }

    window.Asc.plugin.init = function () {
        
        const theme = window.Asc.plugin.theme;
        if (theme) {
            if (theme.type === 'dark') {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        }
        
        // Load saved credentials
        appIdInput.value = localStorage.getItem('mathpixAppId') || '';
        appKeyInput.value = localStorage.getItem('mathpixAppKey') || '';

        // Set up event listeners
        dropZone.addEventListener('click', () => fileInput.click());
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
        dropZone.addEventListener('drop', handleDrop);
        fileInput.addEventListener('change', handleFileSelect);
        document.addEventListener('paste', handlePaste);
        recognizeButton.addEventListener('click', () => {
            if (currentFiles.length > 0) {
                recognizeFormulas(currentFiles);
            } else {
                showError('Please upload at least one image first.');
            }
        });
        clearButton.addEventListener('click', clearAll);
        settingsButton.addEventListener('click', toggleConfigPanel);
        saveCredentialsBtn.addEventListener('click', saveCredentials); 

        // Add translation support
        window.Asc.plugin.onTranslate = applyTranslations;

        // Add theme change listener
        window.Asc.plugin.onThemeChanged = function(theme) {
            if (theme.type === 'dark') {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        };
    };
    
    function handleDrop(e) {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    }

    function handleFileSelect(e) {
        handleFiles(e.target.files);
    }

    function handlePaste(e) {
        const items = e.clipboardData.items;
        for (let item of items) {
            if (item.type.indexOf('image') !== -1) {
                const blob = item.getAsFile();
                handleFiles([blob]);
                break;
            }
        }
    }

    function handleFiles(files) {
        clearError();
        currentFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        imageContainer.innerHTML = '';
        currentFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'image-preview';
                const div = document.createElement('div');
                div.className = 'image-item';
                div.appendChild(img);
                imageContainer.appendChild(div);
            };
            reader.readAsDataURL(file);
        });
        recognizeButton.style.display = currentFiles.length > 0 ? 'inline-block' : 'none';
        clearButton.style.display = currentFiles.length > 0 ? 'inline-block' : 'none';

        // Hide the upload section only if there are files
        dropZone.style.display = currentFiles.length > 0 ? 'none' : 'flex';
    }

    function recognizeFormulas(files) {
        clearError();
        const appId = appIdInput.value;
        const appKey = appKeyInput.value;
        if (!appId || !appKey) {
            showError('Please enter both your Mathpix App ID and APP Key in the configuration panel.');
            toggleConfigPanel();
            return;
        }

        resultContainer.innerHTML = '<h2>Results</h2>';
        recognitionResults = [];

        files.forEach((file, index) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('formats', JSON.stringify(["text", "data", "html", "latex_styled"]));
            formData.append('data_options', JSON.stringify({
                include_latex: true,
                include_mathml: true,
            }));
            formData.append('ocr', JSON.stringify(["math", "text"]));

            fetch('https://api.mathpix.com/v3/text', {
                method: 'POST',
                headers: {
                    'app_id': appId,
                    'app_key': appKey
                },
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    showError(`API Error for image ${index + 1}: ${data.error}`);
                    return;
                }
                recognitionResults[index] = data;
                displayResult(data, index);
            })
            .catch(error => {
                showError(`Network Error for image ${index + 1}: ${error.message}`);
            });
        });

        resultContainer.style.display = 'block';
    }

    function displayResult(data, index) {
        const resultBox = document.createElement('div');
        resultBox.className = 'result-box';
        
        // When the LaTeX result is 'No LaTeX result', the 'Text' option will be selected by default
        const latexResult = data.latex_styled || data.data?.find(item => item.type === 'latex')?.value;
        const isNoLatexResult = !latexResult || latexResult === 'No LaTeX result';
        
        resultBox.innerHTML = `
            <h3 class="i18n">Image ${index + 1}</h3>
            <div class="preview-container"></div>
            <select class="formatSelector">
                ${Array.from(outputFormatCheckboxes)
                    .filter(checkbox => checkbox.checked)
                    .map(checkbox => 
                        `<option value="${checkbox.value}" class="i18n" ${isNoLatexResult && checkbox.value === 'text' ? 'selected' : ''}>${checkbox.value.charAt(0).toUpperCase() + checkbox.value.slice(1)}</option>`
                    ).join('')}
            </select>
            <div class="codeDisplay" contenteditable="true" spellcheck="false"></div>
            <button class="copyCodeBtn i18n">Copy</button>
            <button class="insertCodeBtn i18n">Insert</button>
        `;
        resultContainer.appendChild(resultBox);

        applyTranslations();

        const previewContainer = resultBox.querySelector('.preview-container');
        let htmlContent = data.html || window.Asc.plugin.tr('No preview available');
        htmlContent = htmlContent.replace(/<latex style="display: none">(.*?)<\/latex>/g, '\\($1\\)');
        htmlContent = htmlContent.replace(/<latex style="display: inline">(.*?)<\/latex>/g, '\\($1\\)');
        previewContainer.innerHTML = htmlContent;
        MathJax.typesetPromise([previewContainer]).catch((err) => console.log('MathJax error:', err));

        const formatSelector = resultBox.querySelector('.formatSelector');
        formatSelector.addEventListener('change', () => {
            updateCodeDisplay(index);
            // Add warning message for LaTeX format
            if (formatSelector.value === 'latex') {
                const warningDiv = resultBox.querySelector('.latex-warning') || document.createElement('div');
                warningDiv.className = 'latex-warning';
                warningDiv.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span style="font-size: 14px;">⚠️</span>
                        <span>${window.Asc.plugin.tr('Note: Some advanced LaTeX syntax may not be compatible with Document Editor. Manual adjustment might be needed.')}</span>
                    </div>`;
                warningDiv.style.cssText = `
                    color: #DDAA00;
                    font-size: 10px;
                    margin-top: 6px;
                    padding: 6px 10px;
                    background-color: rgba(221, 170, 0, 0.1);
                    border-radius: 3px;
                `;
                
                const codeDisplay = resultBox.querySelector('.codeDisplay');
                if (!resultBox.querySelector('.latex-warning')) {
                    codeDisplay.parentNode.insertBefore(warningDiv, codeDisplay);
                }
            } else {
                const warningDiv = resultBox.querySelector('.latex-warning');
                if (warningDiv) {
                    warningDiv.remove();
                }
            }
        });

        const copyCodeBtn = resultBox.querySelector('.copyCodeBtn');
        copyCodeBtn.addEventListener('click', () => copyCode(index));

        const insertCodeBtn = resultBox.querySelector('.insertCodeBtn');
        insertCodeBtn.addEventListener('click', () => insertCode(index));

        updateCodeDisplay(index);

        // Trigger the change event to show warning if LaTeX is initially selected
        if (formatSelector.value === 'latex') {
            formatSelector.dispatchEvent(new Event('change'));
        }
    }

    // Per the official request of ONLYOFFICE, perform LaTeX conversion:
    // better format for latex formula is this:
    // \\sum{csc}{\\rightarrow\\above{yelds}}\\begin{matrix}1&0&0\\\\0&1&0\\\\0&0&1\\\\\\end{matrix}
    function convertLatex(code) {
        // Replace \sum \csc with \sum{csc}
        code = code.replace(
            /\\sum\s+\\csc/g,
            '\\sum{csc}'
        );
        
        // Replace \xrightarrow{\text{yields}} with {\rightarrow\above{yields}}
        code = code.replace(
            /\\xrightarrow{\\text\s*{([^}]+)}}/g,
            '{\\rightarrow\\above{$1}}'
        );
        
        // Add more replacements here as needed
        
        return code;
    }

    function updateCodeDisplay(index) {
        const resultBox = resultContainer.children[index + 1];
        const formatSelector = resultBox.querySelector('.formatSelector');
        const codeDisplay = resultBox.querySelector('.codeDisplay');
        const data = recognitionResults[index];

        if (!data) return;

        const format = formatSelector.value;
        let code = '';

        switch (format) {
            case 'latex':
                code = data.latex_styled || data.data?.find(item => item.type === 'latex')?.value || 'No LaTeX result';
                code = convertLatex(code);
                break;
            case 'mathml':
                code = data.data?.find(item => item.type === 'mathml')?.value || 'No MathML result';
                break;
            case 'text':
                code = data.text || 'No Text result';
                break;
            case 'html':
                code = data.html || 'No HTML result';
                break;
        }

        codeDisplay.innerText = code;
    }

    function copyCode(index) {
        const resultBox = resultContainer.children[index + 1];
        const codeDisplay = resultBox.querySelector('.codeDisplay');
        const code = codeDisplay.innerText;
        navigator.clipboard.writeText(code).then(() => {
            alert('Code copied to clipboard!');
        });
    }

    function insertCode(index) {
        clearError();
        const resultBox = resultContainer.children[index + 1];
        const formatSelector = resultBox.querySelector('.formatSelector');
        const codeDisplay = resultBox.querySelector('.codeDisplay');
        const format = formatSelector.value;
        const code = codeDisplay.innerText;
        
        if (format === 'latex') {
            // Proceed with insertion
            Asc.scope.text = code;
            window.Asc.plugin.callCommand(function() {
                try {
                    Api.GetDocument().AddMathEquation(Asc.scope.text, "latex");
                } catch (error) {
                    console.error("Error inserting LaTeX equation:", error);
                }
            }, false);
        } else {
            window.Asc.plugin.executeMethod("PasteText", [code], function(result) {
                if (result !== true) {
                    console.error("Failed to insert text");
                }
            });
        }
    }

    function saveCredentials() {
        const appId = appIdInput.value;
        const appKey = appKeyInput.value;
        localStorage.setItem('mathpixAppId', appId);
        localStorage.setItem('mathpixAppKey', appKey);
        alert('Credentials saved!');
        toggleConfigPanel();
    }

    function toggleConfigPanel() {
        configPanel.style.display = configPanel.style.display === 'none' ? 'block' : 'none';
    }

    function showError(message) {
        errorContainer.classList.add('i18n');
        errorContainer.textContent = window.Asc.plugin.tr(message);
        errorContainer.style.display = 'block';
    }

    function clearError() {
        errorContainer.style.display = 'none';
    }

    function clearAll() {
        clearError();
        currentFiles = [];
        recognitionResults = [];
        imageContainer.innerHTML = '';
        resultContainer.innerHTML = '<h2 class="i18n">Results</h2>';
        applyTranslations();
        
        resultContainer.style.display = 'none';
        recognizeButton.style.display = 'none';
        clearButton.style.display = 'none';
        errorContainer.style.display = 'none';

        dropZone.style.display = 'flex';
        fileInput.value = '';
    }

    // Default to only select latex and text
    outputFormatCheckboxes.forEach((checkbox) => {
        checkbox.checked = checkbox.value === 'latex' || checkbox.value === 'text';
    });

    // Add checkbox change event listener
    outputFormatCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // If there are displayed results, update all result format selectors
            const resultBoxes = document.querySelectorAll('.result-box');
            resultBoxes.forEach((box, index) => {
                const formatSelector = box.querySelector('.formatSelector');
                const currentValue = formatSelector.value;
                
                // Rebuild options
                formatSelector.innerHTML = Array.from(outputFormatCheckboxes)
                    .filter(checkbox => checkbox.checked)
                    .map(checkbox => `<option value="${checkbox.value}">${checkbox.value.charAt(0).toUpperCase() + checkbox.value.slice(1)}</option>`)
                    .join('');

                // If the previously selected format is still available, keep it selected
                if (Array.from(formatSelector.options).some(option => option.value === currentValue)) {
                    formatSelector.value = currentValue;
                }
                
                // Update displayed code
                updateCodeDisplay(index);
            });
        });
    });

})();