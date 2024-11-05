(function (window, undefined) {

    let loader;
    let isDarkTheme = false;
    let elements = {};
    let apiKey = '';
    let errTimeout = null;
    let tokenTimeout = null;
    let modalTimeout = null;
    let bCreateLoader = true;
    let maxTokens = 4000;
    const isIE = checkInternetExplorer();
    const models = [
        {id: "glm-4", text: "glm-4", modelDescription: "Complete multiple language tasks according to the input natural language instructions"},
        {id: "glm-4-0520", text: "glm-4-0520", modelDescription: "High Intelligence model: Suitable for handling highly complex and diverse tasks, supporting 128k context."},
        {id: "glm-4-air", text: "glm-4-air", modelDescription: "Cost-effective: The most balanced model between reasoning power and price, supporting 128k context."},
        {id: "glm-4-airx", text: "glm-4-airx", modelDescription: "Ultra-fast reasoning: with ultra-fast reasoning speed and powerful reasoning effect, support 8k context"},
        {id: "glm-4-flash", text: "glm-4-flash", modelDescription: "Intelligent spectrum AI's first free API, zero cost to call large models."},
        {id: "glm-4-plus", text: "glm-4-plus", modelDescription: "High intelligence flagship: overall performance improvement, long text and complex task capabilities significantly enhanced."},
        {id: "glm-4-long", text: "glm-4-long", modelDescription: "Long input: Designed to handle long text and memory-based tasks, it supports 1M context."},
        {id: "glm-4-alltools", text: "glm-4-alltools", modelDescription: "Agent Model: A version of the model that autonomously plans and executes complex tasks, supporting 128k context."},
    ]

    window.Asc.plugin.init = function() {
        sendPluginMessage({type: 'onWindowReady'});
        if (isIE) {
            bCreateLoader = false;
            destroyLoader();
            document.getElementById('div_ie_error').classList.remove('hidden');
            return;
        } else {
            bCreateLoader = true;
        };
        apiKey = localStorage.getItem('apikey') || null;
        addSlidersListeners();
        addTitlelisteners();
        initElements();
        initScrolls();
        if (apiKey) {
            fetchModels();
        } else {
            bCreateLoader = false;
            destroyLoader();
        }

        elements.inpLenSl.oninput = onSlInput;
        elements.inpTempSl.oninput = onSlInput;
        elements.inpTopSl.oninput = onSlInput;

        elements.btnClear.onclick = function() {
            elements.textArea.value = '';
            elements.lbTokens.innerText = 0;
            elements.textArea.focus();
            resetForm();
            checkLen();
        };

        elements.textArea.oninput = function(event) {
            elements.textArea.classList.remove('error_border');
            if (tokenTimeout) {
                clearTimeout(tokenTimeout);
                tokenTimeout = null;
            }
            tokenTimeout = setTimeout(function() {
                let text = event.target.value.trim();
                let tokens = window.Asc.OpenAIEncode(text);
                elements.lbTokens.innerText = tokens.length;
                checkLen();
            }, 250);

        };

        elements.textArea.onkeydown = function(e) {
            if ( (e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                elements.btnSubmit.click();
            }
        };

        elements.divTokens.onmouseenter = function() {
            elements.modal.classList.remove('hidden');
            if (modalTimeout) {
                clearTimeout(modalTimeout);
                modalTimeout = null;
            }
        };

        elements.divTokens.onmouseleave = function() {
            modalTimeout = setTimeout(function() {
                elements.modal.classList.add('hidden');
            },100)
        };

        elements.modal.onmouseenter = function() {
            if (modalTimeout) {
                clearTimeout(modalTimeout);
                modalTimeout = null;
            }
        };

        elements.modal.onmouseleave = function() {
            elements.modal.classList.add('hidden');
        };

        elements.labelMore.onclick = function() {
            elements.linkMore.click();
        };

        elements.btnShowSettins.onclick = function() {
            elements.divParams.classList.toggle('hidden');
            elements.arrow.classList.toggle('arrow_down');
            elements.arrow.classList.toggle('arrow_up');
            updateScroll();
        };

        elements.btnSubmit.onclick = function() {
            document.getElementById('response').innerHTML = '';
            let settings = getSettings();
            if (settings.error || elements.textArea.classList.contains('error_border')) {
                if (Number(elements.lbAvalTokens.innerText) < 0) {
                    setError('Too many tokens in your request.');
                }
                elements.textArea.classList.add('error_border');
                return;
            };
            let prompt = [{role: "user", content: settings.prompt}];
            let systemMessage = 'You are a good assistant, you should try to answer the user\'s questions , your response should use the same language of user\'s question.';
            let stream = true;
            let config = {model: settings.model, temperature: settings.temperature, max_tokens: settings.max_tokens, top_p: settings.top_p, stop: settings.stop };
            zhipuChatRequest(prompt, systemMessage, stream, config, new AbortController().signal).then(reader => {
                displaySSEMessage(reader, elements.response, null).then((result) => {
                    console.log('Chat completed, result :',result);
                }).catch(err => {
                    console.log('Error: ', err);
                })

            }).catch(err => {
                console.log('Error: ', err);
            })
        };
    };

    function initElements() {
        elements.inpLenSl       = document.getElementById('inp_len_sl');
        elements.inpTempSl      = document.getElementById('inp_temp_sl');
        elements.inpTopSl       = document.getElementById('inp_top_sl');
        elements.inpStop        = document.getElementById('inp_stop');
        elements.textArea       = document.getElementById('textarea');
        elements.btnSubmit      = document.getElementById('btn_submit');
        elements.btnClear       = document.getElementById('btn_clear');
        elements.divContent     = document.getElementById('div_content');
        elements.mainError      = document.getElementById('div_err');
        elements.mainErrorLb    = document.getElementById('lb_err');
        elements.lbTokens       = document.getElementById('lb_tokens');
        elements.divTokens      = document.getElementById('div_tokens');
        elements.modal          = document.getElementById('div_modal');
        elements.lbModalLen     = document.getElementById('lb_modal_length');
        elements.labelMore      = document.getElementById('lb_more');
        elements.linkMore       = document.getElementById('link_more');
        elements.btnShowSettins = document.getElementById('div_show_settings');
        elements.divParams      = document.getElementById('div_parametrs');
        elements.arrow          = document.getElementById('arrow');
        elements.lbAvalTokens   = document.getElementById('lbl_avliable_tokens');
        elements.lbUsedTokens   = document.getElementById('lbl_used_tokens');
        elements.response       = document.getElementById('response');
    };

    function initScrolls() {
        PsMain = new PerfectScrollbar('#div_content', {});
    };

    function addSlidersListeners() {
        const rangeInputs = document.querySelectorAll('input[type="range"]');

        function handleInputChange(e) {
            let target = e.target;
            if (e.target.type !== 'range') {
                target = document.getElementById('range');
            }
            const min = target.min;
            const max = target.max;
            const val = target.value;

            target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
        };

        rangeInputs.forEach(function(input) {
            input.addEventListener('input', handleInputChange);
        });
    };

    function addTitlelisteners() {
        let divs = document.querySelectorAll('.div_parametr');
        divs.forEach(function(div) {
            div.addEventListener('mouseenter', function (event) {
                event.target.children[0].classList.remove('hidden');
                let top = event.target.offsetTop - event.target.children[0].clientHeight - 5 + 'px;';
                event.target.children[0].setAttribute('style', 'top:' + top);
            });

            div.addEventListener('mouseleave', function (event) {
                event.target.children[0].classList.add('hidden');
            });
        });

        let modals = document.querySelectorAll('.div_title');
        modals.forEach(function(modal) {
            modal.addEventListener('mouseenter', function (event) {
                event.target.classList.add('hidden');
            });
        });
    };

    function onSlInput(e) {
        e.target.nextElementSibling.innerText = e.target.value;
        if (e.target.id == elements.inpLenSl.id)
            elements.lbModalLen.innerText = e.target.value;
    };

    function fetchModels() {

        $('#sel_models').select2({
            data : models
        }).on('select2:select', function(e) {
            let model = $('#sel_models').val();
            maxTokens =  8000 ;
            checkLen();
        });

        if ($('#sel_models').find('option[value=glm-4v]').length) {
            $('#sel_models').val('glm-4').trigger('change');
        }
        elements.divContent.classList.remove('hidden');
        localStorage.setItem('apikey', apiKey);
        updateScroll();
        destroyLoader();
        console.log("fetchModels finished");

    };

    function getSettings() {
        let model = $('#sel_models').val();
        let prompt = elements.textArea.value.trim();
        let obj = {
            model : model,
        };
        if (!prompt.length) {
            obj.error = true;
            return obj;
        }
        obj.prompt = prompt;
        let temp = Number(elements.inpTempSl.value);
        obj.temperature = ( temp < 0 ? 0 : ( temp > 1 ? 1 : temp ) );
        let len = Number(elements.inpLenSl.value);
        obj.max_tokens = ( len < 0 ? 0 : ( len > maxTokens ? maxTokens : len ) );
        let topP = Number(elements.inpTopSl.value);
        obj.top_p = ( topP < 0 ? 0 : ( topP > 1 ? 1 : topP ) );
        let stop = elements.inpStop.value;
        if (stop.length){
            obj.stop = stop;
        }

        return obj;
    }

    function createLoader() {
        $('#loader-container').removeClass( "hidden" );
        loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
        loader = showLoader($('#loader-container')[0], getTranslated('Loading...'));
    };

    function destroyLoader() {
        $('#loader-container').addClass( "hidden" )
        loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
        loader = undefined;
    };

    function setError(error) {
        elements.mainErrorLb.innerHTML = window.Asc.plugin.tr(error);
        elements.mainError.classList.remove('hidden');
        if (errTimeout) {
            clearTimeout(errTimeout);
            errTimeout = null;
        }
        errTimeout = setTimeout(clearMainError, 5000);
    };

    function clearMainError() {
        elements.mainError.classList.add('hidden');
        elements.mainErrorLb.innerHTML = '';
    };

    function getTranslated(key) {
        return window.Asc.plugin.tr(key);
    };

    function updateScroll() {
        PsMain && PsMain.update();
    };

    function checkInternetExplorer() {
        let rv = -1;
        if (window.navigator.appName == 'Microsoft Internet Explorer') {
            const ua = window.navigator.userAgent;
            const re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
            if (re.exec(ua) != null) {
                rv = parseFloat(RegExp.$1);
            }
        } else if (window.navigator.appName == 'Netscape') {
            const ua = window.navigator.userAgent;
            const re = new RegExp('Trident/.*rv:([0-9]{1,}[\.0-9]{0,})');

            if (re.exec(ua) != null) {
                rv = parseFloat(RegExp.$1);
            }
        }
        return rv !== -1;
    };

    function checkLen() {
        let cur = Number(elements.lbTokens.innerText);
        let maxLen = Number(elements.inpLenSl.value);
        let newValue = maxTokens - cur;

        if (cur > maxTokens) {
            elements.textArea.classList.add('error_border');
        } else {
            elements.textArea.classList.remove('error_border');
        }

        if (cur + maxLen > maxTokens) {
            setTokensLength(newValue, newValue);
        } else {
            setTokensLength(maxLen, newValue);
        }
    };

    function setTokensLength(val, max) {
        elements.inpLenSl.setAttribute('max', max);
        elements.inpLenSl.value = val;
        let event = document.createEvent('Event');
        event.initEvent('input', true, true);
        elements.inpLenSl.dispatchEvent(event);
        elements.lbAvalTokens.innerText = elements.inpLenSl.getAttribute('max');
        elements.lbUsedTokens.innerText = elements.lbTokens.innerText;
    };

    function sendPluginMessage(message) {
        window.Asc.plugin.sendToPlugin("onWindowMessage", message);
    };

    window.Asc.plugin.onTranslate = function() {
        console.log('onTranslate');
        if (bCreateLoader)
            console.log('onTranslate2');
            createLoader();

        let elements = document.querySelectorAll('.i18n');

        destroyLoader();
        bCreateLoader = true;

        for (let index = 0; index < elements.length; index++) {
            let element = elements[index];
            element.innerText = getTranslated(element.innerText);
        }
    };

    window.Asc.plugin.onThemeChanged = function(theme) {
        window.Asc.plugin.onThemeChangedBase(theme);
        if (isIE) return;

        let rule = ".select2-container--default.select2-container--open .select2-selection__arrow b { border-color : " + window.Asc.plugin.theme["text-normal"] + " !important; }";
        let sliderBG, thumbBG
        if (theme.type.indexOf('dark') !== -1) {
            isDarkTheme = true;
            sliderBG = theme.Border || '#757575';
            // for dark '#757575';
            // for contrast dark #616161
            thumbBG = '#fcfcfc';
        } else {
            isDarkTheme = false;
            sliderBG = '#ccc';
            thumbBG = '#444';
        }
        rule += '\n input[type="range"] { background-color: '+sliderBG+' !important; background-image: linear-gradient('+thumbBG+', '+thumbBG+') !important; }';
        rule += '\n input[type="range"]::-webkit-slider-thumb { background: '+thumbBG+' !important; }';
        rule += '\n input[type="range"]::-moz-range-thumb { background: '+thumbBG+' !important; }';
        rule += '\n input[type="range"]::-ms-thumb { background: '+thumbBG+' !important; }';
        rule += '\n .arrow { border-color : ' + theme['text-normal'] + ' !important; }';
        rule += '\n .err_background { background: ' + theme['background-toolbar'] + ' !important; }';

        let styleTheme = document.createElement('style');
        styleTheme.type = 'text/css';
        styleTheme.innerHTML = rule;
        document.getElementsByTagName('head')[0].appendChild(styleTheme);
    };

    window.onresize = function() {
        updateScroll();
        updateScroll();
    };

    window.Asc.plugin.attachEvent("onApiKey", function(key) {
        apiKey = key;
    });

    function resetForm() {
        document.getElementById('response').innerHTML = '';
        document.getElementById('temperature').value = 0.7;
        document.getElementById('topP').value = 0.9;
        document.getElementById('maxTokens').value = 50;
    }
})(window, undefined);