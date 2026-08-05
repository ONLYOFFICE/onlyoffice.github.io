/*
 * (c) Copyright Ascensio System SIA 2010
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */
var oImage = false;
var imageEditor = null;
var themeStyle = null;
var bNewVersion = false;

(function(window, undefined){

    window.Asc.plugin.onThemeChanged = function (theme) {

        var head  = document.head;
        var link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.media = 'all';

        if(theme.type === "dark") {
            themeStyle = blackTheme;
            link.href = './style/black-theme.css';
        } else {
            themeStyle = whiteTheme;
            link.href = './style/white-theme.css';
        }
        head.appendChild(link);
    };

    var translationDone = false;
    var initializationDone = false;
    var language = null;

    window.Asc.plugin.onTranslate = function () {
        language = {
            'Grayscale': window.Asc.plugin.tr("Grayscale"),
            'Sepia': window.Asc.plugin.tr("Sepia"),
            'Blur': window.Asc.plugin.tr("Blur"),
            'Emboss': window.Asc.plugin.tr("Emboss"),
            'Invert': window.Asc.plugin.tr("Invert"),
            'Sepia2': window.Asc.plugin.tr("Sepia2"),
            'Sharpen': window.Asc.plugin.tr("Sharpen"),
            'Remove White': window.Asc.plugin.tr("Remove White"),
            'Threshold': window.Asc.plugin.tr("Threshold"),
            'Distance': window.Asc.plugin.tr("Distance"),
            'Gradient transparency': window.Asc.plugin.tr("Gradient transparency"),
            'Value': window.Asc.plugin.tr("Value"),
            'Brightness': window.Asc.plugin.tr("Brightness"),
            'Noise': window.Asc.plugin.tr("Noise"),
            'Pixelate': window.Asc.plugin.tr("Pixelate"),
            'Color Filter': window.Asc.plugin.tr("Color Filter"),
            'Tint': window.Asc.plugin.tr("Tint"),
            'Multiply': window.Asc.plugin.tr("Multiply"),
            'Blend': window.Asc.plugin.tr("Blend"),
            'Filter': window.Asc.plugin.tr("Filter"),
            'Mask': window.Asc.plugin.tr("Mask"),
            'Text': window.Asc.plugin.tr("Text"),
            'Icon': window.Asc.plugin.tr("Icon"),
            'Shape': window.Asc.plugin.tr("Shape"),
            'Draw': window.Asc.plugin.tr("Draw"),
            'Rotate': window.Asc.plugin.tr("Rotate"),
            'Flip': window.Asc.plugin.tr("Flip"),
            'Flip X': window.Asc.plugin.tr("Flip X"),
            'Flip Y': window.Asc.plugin.tr("Flip Y"),
            'Crop': window.Asc.plugin.tr("Crop"),
            'DeleteAll': window.Asc.plugin.tr("Delete all"),
            'Delete': window.Asc.plugin.tr("Delete"),
            'Reset': window.Asc.plugin.tr("Reset"),
            'Redo': window.Asc.plugin.tr("Redo"),
            'Undo': window.Asc.plugin.tr("Undo"),
            'Load Mask Image': window.Asc.plugin.tr("Load Mask Image"),
            'Apply': window.Asc.plugin.tr("Apply"),
            'Cancel': window.Asc.plugin.tr("Cancel"),
            'Bold': window.Asc.plugin.tr("Bold"),
            'Italic': window.Asc.plugin.tr("Italic"),
            'Underline': window.Asc.plugin.tr("Underline"),
            'Left': window.Asc.plugin.tr("Left"),
            'Center': window.Asc.plugin.tr("Center"),
            'Right': window.Asc.plugin.tr("Right"),
            'Color': window.Asc.plugin.tr("Color"),
            'Text size': window.Asc.plugin.tr("Text size"),
            'Arrow': window.Asc.plugin.tr("Arrow"),
            'Arrow-1': window.Asc.plugin.tr("Arrow")  + "-1",
            'Arrow-2': window.Asc.plugin.tr("Arrow")  + "-2",
            'Arrow-3': window.Asc.plugin.tr("Arrow") + "-3",
            'Star': window.Asc.plugin.tr("Star"),
            'Star-1': window.Asc.plugin.tr("Star-1"),
            'Star-2': window.Asc.plugin.tr("Star-2"),
            'Polygon': window.Asc.plugin.tr("Polygon"),
            'Location': window.Asc.plugin.tr("Location"),
            'Heart': window.Asc.plugin.tr("Heart"),
            'Bubble': window.Asc.plugin.tr("Bubble"),
            'Custom icon': window.Asc.plugin.tr("Custom icon"),
            'Rectangle': window.Asc.plugin.tr("Rectangle"),
            'Circle': window.Asc.plugin.tr("Circle"),
            'Triangle': window.Asc.plugin.tr("Triangle"),
            'Fill': window.Asc.plugin.tr("Fill"),
            'Stroke': window.Asc.plugin.tr("Stroke"),
            'Free': window.Asc.plugin.tr("Free"),
            'Straight': window.Asc.plugin.tr("Straight"),
            'Range': window.Asc.plugin.tr("Range"),
            'Custom': window.Asc.plugin.tr("Custom"),
            'Square': window.Asc.plugin.tr("Square"),
            'Resize': window.Asc.plugin.tr("Resize"),
            'Width': window.Asc.plugin.tr("Width"),
            'Height': window.Asc.plugin.tr("Height"),
            'Lock Aspect Ratio': window.Asc.plugin.tr("Lock Aspect Ratio"),
            'Hand': window.Asc.plugin.tr("Hand"),
            'History': window.Asc.plugin.tr("History")
        };

        CreateImageEditor();
        translationDone = true;
        let shortLang = 'en';
        if (window.Asc.plugin.tr("Close") !== 'Close') {
            shortLang = window.Asc.plugin.info.lang.split('-')[0];
        }
        document.documentElement.lang = shortLang;
    };

    window.Asc.plugin.init = function (sHtml) {
        window.Asc.plugin.executeMethod("GetImageDataFromSelection", [], function(oResult) {
            if (oResult) {
                oImage = document.createElement("img");
                oImage.src = oResult.src;
                oImage.width = oResult.width;
                oImage.height = oResult.height;
                bNewVersion = true;
            } else {
                oImage = $(sHtml)[0];
                if (!oImage || !$(oImage).is('img')) {
                    oImage = $(sHtml).find('img')[0];
                }
                if (!oImage) {
                    oImage = document.createElement("img");
                    //white rect
                    oImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAIAAAD2HxkiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMrSURBVHhe7dMxAQAADMOg+TfdycgDHrgBKQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJITU9vSZzteUMFOrAAAAAElFTkSuQmCC';
                    oImage.width = 300;
                    oImage.height = 300;
                }
                bNewVersion = (oResult === null);
            }
            CreateImageEditor();
            initializationDone = true;
            var imageHeight = null;
            oImage.height > 500 ? imageHeight = 500 : imageHeight = oImage.height;
            window.Asc.plugin.resizeWindow(undefined, undefined, 870, imageHeight + 300, 0, 0);
        });       
    };

    window.Asc.plugin.button = function (id) {

        if (id == 0) {
            if (imageEditor.getDrawingMode() === 'CROPPER') {
                var imageData = imageEditor.crop(imageEditor.getCropzoneRect()).then(function () {
                        saveImage();
                    }
                );
            } else {
                saveImage();
            }
        } else {
            this.executeCommand("close", "");
        }
    };

    function hideUnwantedElements() {
        const zoomIn = document.getElementsByClassName('tie-btn-zoomIn')[0];
        const zoomOut = document.getElementsByClassName('tie-btn-zoomOut')[0];
        const hand = document.getElementsByClassName('tie-btn-hand')[0];
        const handNext = hand.nextSibling;
        
        zoomIn.style.display = 'none';
        zoomOut.style.display = 'none';
        hand.style.display = 'none';
        handNext.style.display = 'none';
        zoomIn.classList.remove('tui-image-editor-item');
        zoomOut.classList.remove('tui-image-editor-item');
        hand.classList.remove('tui-image-editor-item');
        handNext.classList.remove('tui-image-editor-item');
    }

    function enableToolbarKeyboardNav(container) {
        const ITEM_SELECTOR = '.tui-image-editor-help-menu .tui-image-editor-item.enabled' + 
                             ', .tui-image-editor-menu .tui-image-editor-item' + 
                             ', .tui-image-editor-button';
        const ITEMS_TO_REMOVE_TABINDEX = 'ol.history-list' + 
                                         ', .tui-image-editor-menu-mask li:first-child .tui-image-editor-button' +
                                         ', .tui-image-editor-menu-icon .tie-icon-add-button:nth-child(3) .tui-image-editor-button';

        function initGroup(parent) {
            var items = filterItems(parent.children);
            if (!items.length) {
                return;
            }
            var hasActive = items.some(function (el) {
                return el.getAttribute('tabindex') === '0';
            });
            items.forEach(function (el, i) {
                el.setAttribute('role', el.getAttribute('role') || 'button');
                el.setAttribute('tabindex', !hasActive && i === 0 ? '0' : '-1');
            });
        }

        function filterItems(children) {
            return Array.prototype.filter.call(children, function (el) {
                return el.nodeType === 1 && el.matches(ITEM_SELECTOR);
            });
        }

        function initAll(root) {
            var parents = [];
            Array.prototype.forEach.call(root.querySelectorAll(ITEM_SELECTOR), function (el) {
                if (el.parentElement && parents.indexOf(el.parentElement) === -1) {
                    parents.push(el.parentElement);
                }
            });
            parents.forEach(initGroup);
        }

        function removeTabindex(root) {
            var parents = [];
            Array.prototype.forEach.call(root.querySelectorAll(ITEMS_TO_REMOVE_TABINDEX), function (el) {
                if (el.parentElement && parents.indexOf(el.parentElement) === -1) {
                    parents.push(el.parentElement);
                }
            });
            parents.forEach(function (parent) {
                var items = filterItems(parent.children);
                items.forEach(function (el) {
                    el.removeAttribute('tabindex');
                    el.removeAttribute('role');
                });
            });
        }

        function moveFocus(group, fromIndex, toIndex) {
            group[fromIndex].setAttribute('tabindex', '-1');
            var next = group[(toIndex + group.length) % group.length];
            next.setAttribute('tabindex', '0');
            next.focus();
        }

        function fallbackMoveCursorToHeightRangeValue() {
            const heightRangeValue = document.querySelector('.tui-image-editor-range-value.tie-height-range-value');
            if (heightRangeValue) {
                heightRangeValue.focus();
            }
        }
        function fallbackMoveCursorToAspectRatio() {
            const aspectRatioButton = document.querySelector('.tui-image-editor-menu-resize .tie-lock-aspect-ratio');
            if (aspectRatioButton) {
                aspectRatioButton.focus();
            }
        }

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                Array.prototype.forEach.call(mutation.addedNodes, function (node) {
                    if (node.nodeType !== 1) {
                        return;
                    }
                    if (node.matches && node.matches(ITEM_SELECTOR)) {
                        initGroup(node.parentElement);
                    }
                    if (node.querySelectorAll) {
                        initAll(node);
                    }
                });
            });
        });
        observer.observe(container, { childList: true, subtree: true });

        initAll(container);
        removeTabindex(container);

        container.addEventListener('keydown', function (e) {
            var target = e.target;
            if (!target.matches || !target.matches(ITEM_SELECTOR)) {
                if (e.key === 'Tab' && target.classList && target.classList.contains('tui-image-editor-range-value')) {
                    if (target.classList.contains('tie-width-range-value')) {
                        fallbackMoveCursorToHeightRangeValue();
                    } else {
                        fallbackMoveCursorToAspectRatio();
                    }

                    return;
                }
                return;
            }

            var group = filterItems(target.parentElement.children);
            var currentIndex = group.indexOf(target);
            if (currentIndex === -1) {
                console.log('Current index not found');
                return;
            }

            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    moveFocus(group, currentIndex, currentIndex + 1);
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    moveFocus(group, currentIndex, currentIndex - 1);
                    break;
                case 'Home':
                    e.preventDefault();
                    moveFocus(group, currentIndex, 0);
                    break;
                case 'End':
                    e.preventDefault();
                    moveFocus(group, currentIndex, group.length - 1);
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    target.click();
                    break;
            }
        });
    }

    function enableToolbarAria(container) {
        var menuBar = container.querySelector('.tui-image-editor-menu');
        if (!menuBar) {
            return;
        }
        menuBar.setAttribute('role', 'toolbar');
        menuBar.setAttribute('aria-label', window.Asc.plugin.tr('Photo editor tools'));

        var buttons = Array.prototype.filter.call(menuBar.children, function (el) {
            return el.classList.contains('tui-image-editor-item');
        });

        function syncPressed(el) {
            el.setAttribute('aria-pressed', el.classList.contains('active') ? 'true' : 'false');
        }

        buttons.forEach(function (el) {
            var label = el.getAttribute('tooltip-content');
            if (label) {
                el.setAttribute('aria-label', label);
            }
            syncPressed(el);
        });

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    syncPressed(mutation.target);
                }
            });
        });
        buttons.forEach(function (el) {
            observer.observe(el, { attributes: true, attributeFilter: ['class'] });
        });
    }

    function enableRangeInputAria(container) {
        var inputs = container.querySelectorAll('input.tui-image-editor-range-value');
        Array.prototype.forEach.call(inputs, function (input) {
            var node = input.previousElementSibling;
            while (node && !(node.tagName === 'LABEL' && node.classList.contains('range'))) {
                node = node.previousElementSibling;
            }
            if (node) {
                input.setAttribute('aria-label', node.textContent.trim());
            }
        });

        var maskInput = container.querySelector('.tie-mask-image-file');
        var maskButton = maskInput && maskInput.closest('.tui-image-editor-button');
        var maskLabel = maskButton && maskButton.querySelector('label');
        if (maskInput && maskLabel) {
            maskInput.setAttribute('aria-label', maskLabel.textContent.trim());
        }
    }

    function enableFilterRangeKeyboardAccess(container) {
        var RANGES = {
            'tie-removewhite-distance-range': { min: 0, max: 1 },
            'tie-brightness-range': { min: -1, max: 1 },
            'tie-noise-range': { min: 0, max: 1000 },
            'tie-pixelate-range': { min: 2, max: 20 },
            'tie-colorfilter-threshold-range': { min: 0, max: 1 }
        };

        function findLabel(slider) {
            var prev = slider.previousElementSibling;
            if (prev && prev.tagName === 'LABEL') {
                return prev.textContent.trim();
            }
            var group = slider.closest('.tui-image-editor-checkbox-group');
            var span = group && group.querySelector('.tui-image-editor-checkbox span');
            return span ? span.textContent.trim() : null;
        }

        Object.keys(RANGES).forEach(function (sliderClass) {
            var slider = container.querySelector('.' + sliderClass);
            if (!slider) {
                return;
            }
            var pointer = slider.querySelector('.tui-image-editor-virtual-range-pointer');
            var bar = slider.querySelector('.tui-image-editor-virtual-range-bar');
            if (!pointer || !bar) {
                return;
            }

            var range = RANGES[sliderClass];
            var label = findLabel(slider);

            pointer.setAttribute('role', 'slider');
            pointer.setAttribute('tabindex', '0');
            if (label) {
                pointer.setAttribute('aria-label', label);
            }
            pointer.setAttribute('aria-valuemin', String(range.min));
            pointer.setAttribute('aria-valuemax', String(range.max));

            function rangeWidth() {
                return bar.clientWidth || 0;
            }

            function syncValueNow() {
                var width = rangeWidth();
                var left = parseFloat(pointer.style.left) || 0;
                var ratio = width > 0 ? left / width : 0;
                pointer.setAttribute('aria-valuenow', (range.min + ratio * (range.max - range.min)).toFixed(2));
            }

            new MutationObserver(syncValueNow).observe(pointer, { attributes: true, attributeFilter: ['style'] });
            syncValueNow();

            function dragBy(deltaPx) {
                pointer.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, screenX: 0 }));
                document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, screenX: deltaPx }));
                document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, screenX: deltaPx }));
            }

            pointer.addEventListener('keydown', function (e) {
                var width = rangeWidth();
                var step = Math.max(1, Math.round(width / 20)) * (e.shiftKey ? 5 : 1);
                switch (e.key) {
                    case 'ArrowRight':
                    case 'ArrowUp':
                        e.preventDefault();
                        dragBy(step);
                        break;
                    case 'ArrowLeft':
                    case 'ArrowDown':
                        e.preventDefault();
                        dragBy(-step);
                        break;
                    case 'Home':
                        e.preventDefault();
                        dragBy(-width);
                        break;
                    case 'End':
                        e.preventDefault();
                        dragBy(width);
                        break;
                }
            });
        });
    }

    // Iframe is a single tab stop for the host page, so Tab past the last
    // focusable element normally leaves the plugin instead of wrapping.
    function trapFocusInsideIframe(root) {
        var FOCUSABLE_SELECTOR = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
            '[contenteditable="true"]'
        ].join(',');

        function isVisible(el) {
            return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        }

        function getFocusable() {
            return Array.prototype.filter.call(root.querySelectorAll(FOCUSABLE_SELECTOR), isVisible);
        }

        root.addEventListener('keydown', function (e) {
            if (e.key !== 'Tab') {
                return;
            }

            var focusable = getFocusable();
            if (!focusable.length) {
                return;
            }

            var first = focusable[0];
            var last = focusable[focusable.length - 1];

            if (e.shiftKey && root.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && root.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        });
    }

    function CreateImageEditor() {

        if (initializationDone == true || translationDone == true) {
            imageEditor = new tui.ImageEditor('#tui-image-editor-container', {

                includeUI: {
                    loadImage: {
                        path: oImage.src,
                        name: 'Image'
                    },
                    theme: themeStyle,
                    initMenu: 'filter',
                    menuBarPosition: 'bottom',
                    locale: language
                },
                usageStatistics: false,
                cssMaxWidth: 700,
                cssMaxHeight: 500,
            });
            const container = document.getElementById('tui-image-editor-container');
            hideUnwantedElements();
            enableToolbarKeyboardNav(container);
            enableToolbarAria(container);
            enableRangeInputAria(container);
            enableFilterRangeKeyboardAccess(container);
            trapFocusInsideIframe(document);

            var firstMenuItem = document.querySelector('.tui-image-editor-help-menu .tui-image-editor-item');
            if (firstMenuItem) {
                firstMenuItem.focus();
            }
        }
    }

    window.saveImage = function () {
        if (bNewVersion) {
            let sImageSrc = imageEditor.toDataURL();
            let editorDimension = imageEditor.getCanvasSize();
            let nWidth = editorDimension.width;
            let nHeight = editorDimension.height;
            let oImageData = {
                "src": sImageSrc,
                "width": nWidth,
                "height": nHeight
            };
            window.Asc.plugin.executeMethod ("PutImageDataToSelection", [oImageData]);
            window.Asc.plugin.executeCommand("close", "");
        } else {
            Asc.scope.dataURL = imageEditor.toDataURL();
            var editorDimension = imageEditor.getCanvasSize();
            Asc.scope.editorDimensionWidth = editorDimension.width;
            Asc.scope.editorDimensionHeight = editorDimension.height;
            var saveImage = createScript();
        }
    }

    window.createScript = function () {

        switch (window.Asc.plugin.info.editorType) {
            case 'word': {
                window.Asc.plugin.callCommand(function () {
                    var oDocument = Api.GetDocument();
                    var oParagraph, arrInsertResult = [], oImage;
                
                    var nEmuWidth = ((Asc.scope.editorDimensionWidth / 96) * 914400 + 0.5) >> 0;
                    var nEmuHeight = ((Asc.scope.editorDimensionHeight / 96) * 914400 + 0.5) >> 0;
                    oImage = Api.CreateImage(Asc.scope.dataURL, nEmuWidth, nEmuHeight);
                    var aSelectedImgs = oDocument.GetSelectedDrawings ? oDocument.GetSelectedDrawings() : [];
                    var oSourceImg = aSelectedImgs[0] ? aSelectedImgs[0] : null;
                    
                    // replace selected img by new img
                    if (oSourceImg)
                    {
                        oDocument.ReplaceDrawing(oSourceImg, oImage, true);
                    }
                    // support old version
                    else
                    {
                        oParagraph = Api.CreateParagraph();
                        arrInsertResult.push(oParagraph);
                        oParagraph.AddDrawing(oImage);
                        oDocument.InsertContent(arrInsertResult);
                    }
                }, true);
                break;

            }
            case 'cell': {
                window.Asc.plugin.callCommand(function () {
                    var oWorksheet = Api.GetActiveSheet();
                    var nEmuWidth = ((Asc.scope.editorDimensionWidth / 96) * 914400 + 0.5) >> 0;
                    var nEmuHeight = ((Asc.scope.editorDimensionHeight / 96) * 914400 + 0.5) >> 0;
                    oWorksheet.ReplaceCurrentImage(Asc.scope.dataURL, nEmuWidth, nEmuHeight);
                }, true);
                break;
            }
            case 'slide': {
                window.Asc.plugin.callCommand(function () {
                    var oPresentation = Api.GetPresentation();
                    var nEmuWidth = ((Asc.scope.editorDimensionWidth / 96) * 914400 + 0.5) >> 0;
                    var nEmuHeight = ((Asc.scope.editorDimensionHeight / 96) * 914400 + 0.5) >> 0;
                    oPresentation.ReplaceCurrentImage(Asc.scope.dataURL, nEmuWidth, nEmuHeight);
                }, true);
                break;
            }

        }
    };
    
})(window, undefined);
