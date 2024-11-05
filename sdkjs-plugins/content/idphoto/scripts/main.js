(
    function(window, undefined) {
        let tfliteModel;
        // window.Asc.plugin.button = function(id) {
        //     console.log(id)
        //     this.executeCommand("close", '');
        // };
        // let canvas;
        let stage;
        let layer;
        let group;
        let first = true;
        let tr;
        let session;
        let threshold;
        // var that;
        let pluginWidth;
        let pluginHeight;
        let backgroundRect;
        window.Asc.plugin.button = function(id) {
            this.executeCommand("close", "");
        };
        window.Asc.plugin.init = function() {
            that = this

            pluginWidth = window.innerWidth;
            pluginHeight = window.innerHeight;

            // canvas = document.getElementById("pic");

            loadModelAndSetup();

            const slider = document.getElementById('mySlider');
            const sliderValueDisplay = document.getElementById('sliderValue');
            threshold = 0.65
            slider.addEventListener('input', function() {
                const value = slider.value;
                sliderValueDisplay.textContent = value;
                threshold = value;
            });

            document.getElementById("processButton").addEventListener("click", function() {
                ProcessImg();
                // var pretext = document.getElementById("Previewtext");
                // pretext.style = "display:none;";
            });
            document.getElementById("uploadButton").addEventListener("click", function() {
                upload();
            });
            document.getElementById("saveButton").addEventListener("click", function() {
                savePhoto();
            });
            show1();

            document.getElementById("imageInput").addEventListener("change", function() {
                const fileNameSpan = document.getElementById('fileName');
                const fileName = imageInput.files[0] ? imageInput.files[0].name : 'No file chosen';
                fileNameSpan.textContent = fileName;

                const file = imageInput.files[0];
                const imageUrl = URL.createObjectURL(file);

                var img = new Image();
                img.onload = function() {
                    const parentDiv = document.getElementById('picContainer')
                    const parentWidth = parentDiv.clientWidth;
                    const targetWidth = parentWidth * 0.7;
                    const scaleFactor = targetWidth / img.width;
                    const targetHeight = img.height * scaleFactor;
                    if (first) {
                        stage = new Konva.Stage({
                            container: 'picContainer',
                            width: targetWidth,
                            height: targetHeight
                        });
                        // var pretext = document.getElementById("Previewtext");
                        // pretext.style = "display:none;";
                    } else {
                        stage.width(targetWidth)
                        stage.height(targetHeight)
                        layer.remove()
                    }

                    layer = new Konva.Layer();
                    // darth vader
                    console.log(img)
                    var showImg = new Konva.Image({
                        image: img,
                        x: 0,
                        y: 0,
                        width: targetWidth,
                        height: targetHeight,
                        // draggable: true
                    });

                    layer.add(showImg);
                    // layer.add(showImg);

                    stage.add(layer);
                };
                img.src = imageUrl;
            });



            document.getElementById("usageGauide").addEventListener("click", function() {
                show1();
            });
            document.getElementById("phrequir").addEventListener("click", function() {
                show2();
            });
            document.getElementById("privacysta").addEventListener("click", function() {
                show3();
            });


            const sizeOptions = document.querySelectorAll('#sizeOptions .outStyle');
            sizeOptions.forEach(function(outStyle) {
                outStyle.addEventListener('click', function() {
                    sizeOptions.forEach(function(item) {
                        item.classList.remove('selected');
                    });
                    this.classList.add('selected');
                    let radio = this.querySelector('.radioStyle');
                    radio.checked = true;
                    // console.log("Selected size value:", radio.value);
                    // 根据选择的值来决定显示或隐藏自定义输入框
                    if (radio.value === 'custom') {
                        customInputContainer.classList.remove('hidden'); // 显示自定义输入框
                    } else {
                        customInputContainer.classList.add('hidden'); // 隐藏自定义输入框
                    }
                });
            });

            // 为下面的一组选项添加事件监听器
            const ratioOptions = document.querySelectorAll('#ratioOptions .outStyle');
            ratioOptions.forEach(function(outStyle) {
                outStyle.addEventListener('click', function() {
                    ratioOptions.forEach(function(item) {
                        item.classList.remove('selected');
                    });
                    this.classList.add('selected');
                    let radio = this.querySelector('.radioStyle');
                    radio.checked = true;
                    // console.log("Selected ratio value:", radio.value);
                });
            });

        };

        function show1() {
            const c1 = document.getElementById('help1')
            const c2 = document.getElementById('help2')
            const c3 = document.getElementById('help3')

            c1.style.display = 'block';
            c2.style.display = 'none';
            c3.style.display = 'none';

            const t1 = document.getElementById('usageGauide')
            const t2 = document.getElementById('phrequir')
            const t3 = document.getElementById('privacysta')

            t1.style.backgroundColor = '#94b5ce'
            t2.style.backgroundColor = '#e4e4e4'
            t3.style.backgroundColor = '#e4e4e4'

            t1.style.color = '#fff'
            t2.style.color = '#000'
            t3.style.color = '#000'

        }

        function show2() {
            const c1 = document.getElementById('help1')
            const c2 = document.getElementById('help2')
            const c3 = document.getElementById('help3')

            c1.style.display = 'none';
            c2.style.display = 'block';
            c3.style.display = 'none';

            const t1 = document.getElementById('usageGauide')
            const t2 = document.getElementById('phrequir')
            const t3 = document.getElementById('privacysta')

            t2.style.backgroundColor = '#94b5ce'
            t1.style.backgroundColor = '#e4e4e4'
            t3.style.backgroundColor = '#e4e4e4'

            t1.style.color = '#000'
            t2.style.color = '#fff'
            t3.style.color = '#000'
        }

        function show3() {
            const c1 = document.getElementById('help1')
            const c2 = document.getElementById('help2')
            const c3 = document.getElementById('help3')

            c1.style.display = 'none';
            c2.style.display = 'none';
            c3.style.display = 'block';

            const t1 = document.getElementById('usageGauide')
            const t2 = document.getElementById('phrequir')
            const t3 = document.getElementById('privacysta')

            t3.style.backgroundColor = '#94b5ce'
            t2.style.backgroundColor = '#e4e4e4'
            t1.style.backgroundColor = '#e4e4e4'

            t1.style.color = '#000'
            t2.style.color = '#000'
            t3.style.color = '#fff'
        }

        function savePhoto() {
            tr.hide()
                // 由于使用了group，要单独找到group的区域导出 
            const oldScale = stage.scale();
            const oldPosition = stage.position();
            stage.scale({ x: 1, y: 1 });
            stage.position({ x: 0, y: 0 });

            todatadict = backgroundRect.getClientRect()
            todatadict['pixelRatio'] = 1
            const ouputimgData = group.toDataURL(todatadict); // 获取 base64 编码的 PNG 图像
            stage.scale(oldScale);
            stage.position(oldPosition);
            tr.show()
                // 创建一个隐藏的下载链接
            const link = document.createElement('a');
            link.href = ouputimgData;
            link.download = 'download.png'; // 指定下载的文件名

            // 触发下载操作
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        async function loadModelAndSetup() {
            session = await ort.InferenceSession.create('./model.onnx');
            console.log("Model loaded successfully");
            // return session;
        }

        function ProcessImg() {
            let imageInput = document.getElementById("imageInput");
            if (imageInput.files && imageInput.files[0]) {
                // console('进入upload函数')
                const file = imageInput.files[0];
                const imageUrl = URL.createObjectURL(file);
                // const tfimg = new Image();
                // tfimg.src = imageUrl;

                const img = new Image();
                img.src = imageUrl;
                img.onload = async() => {
                    // console('onload')

                    // 获取用户输入
                    var selectValue = getSelectedSizeValue();
                    // 获取输出像素 可以写个选择框给用户选
                    var targetWidth = 295;
                    var targetHeight = 413;
                    switch (selectValue) {
                        case "1":
                            // 1、 一寸：25mm x 35mm / 电子照：295px x 413px
                            var targetWidth = 295;
                            var targetHeight = 413;
                            break;
                        case "2":
                            // 2、 二寸：35mm x 49mm / 电子照：413px x 579px
                            var targetWidth = 413;
                            var targetHeight = 579;
                            break;
                        case "3":
                            // 3、 三寸：649*991px | 55*84mm
                            var targetWidth = 649;
                            var targetHeight = 991;
                            break;
                        case "4":
                            // 3、 四寸：897*1205px | 76*102mm
                            var targetWidth = 897;
                            var targetHeight = 1205;
                            break;
                        case "5":
                            // 3、 小一寸：22mm x 32mm / 电子照：260px x 378px
                            var targetWidth = 260;
                            var targetHeight = 378;
                            break;
                        case "6":
                            // 4、 小二寸：35mm x 45mm / 电子照：413px x 531px
                            var targetWidth = 413;
                            var targetHeight = 531;
                            break;
                        case "7":
                            // 5、 大一寸：33mm x 48mm / 电子照：390px x 567px
                            var targetWidth = 390;
                            var targetHeight = 567;
                            break;
                        case "8":
                            // 6、 大二寸：35mm x 53mm / 电子照：413px x 626px
                            var targetWidth = 413;
                            var targetHeight = 626;
                            break;
                        case "9":
                            // 7、中国护照：33mm x 48mm / 电子照：390px x 567px
                            var targetWidth = 390;
                            var targetHeight = 567;
                            break;
                        case "10":
                            // 8、驾驶证：22mm x 32mm / 电子照：260px x 378px
                            var targetWidth = 260;
                            var targetHeight = 378;
                            break;
                        case "11":
                            // 9、电子驾照：44mm x 64mm / 电子照：520px x 756px
                            var targetWidth = 520;
                            var targetHeight = 756;
                            break;
                        case "12":
                            // 10、结婚登记照：49mm x 35mm / 电子照：579px x 413
                            var targetWidth = 579;
                            var targetHeight = 413;
                            break;
                        case "13":
                            // 11、二代身份证(350dpi)：26mm x 32mm / 电子照：358px x 441px
                            var targetWidth = 358;
                            var targetHeight = 441;
                            break;
                        case "14":
                            // 12、大学生图像信息采集：41 x 54mm / 电子照：480px x 640px
                            var targetWidth = 480;
                            var targetHeight = 640;
                            break;
                        case "15":
                            // 13、电子社保卡：30mm x 37mm / 电子照：358px x 441px
                            var targetWidth = 358;
                            var targetHeight = 441;
                            break;
                        case "custom":
                            const customWidthInput = document.getElementById('customWidth');
                            const customHeightInput = document.getElementById('customHeight');
                            const width = customWidthInput.value;
                            const height = customHeightInput.value;
                            var targetWidth = parseInt(width);
                            var targetHeight = parseInt(height);
                    }
                    // 1、 一寸：25mm x 35mm / 电子照：295px x 413px
                    // 2、 二寸：35mm x 49mm / 电子照：413px x 579px
                    // 3、 小二寸：35mm x 45mm / 电子照：413px x 531px
                    // 4、 小一寸：22mm x 32mm / 电子照：260px x 378px
                    // 5、 大一寸：33mm x 48mm / 电子照：390px x 567px
                    // 6、 大二寸：35mm x 53mm / 电子照：413px x 626px
                    // 7、中国护照：33mm x 48mm / 电子照：390px x 567px
                    // 8、驾驶证：22mm x 32mm / 电子照：260px x 378px
                    // 9、电子驾照：44mm x 64mm / 电子照：520px x 756px
                    // 8、结婚登记照：49mm x 35mm / 电子照：579px x 413
                    // 9、二代身份证(350dpi)：26mm x 32mm / 电子照：358px x 441px
                    // 10、大学生图像信息采集：41 x 54mm / 电子照：480px x 640px
                    // 11、电子社保卡：30mm x 37mm / 电子照：358px x 441px
                    // const finalImage = tf.image.resizeBilinear(colorImage, [img.height, img.width], alignCorners = true);

                    // 获取背景颜色：
                    var selectColor = getSelectedColorValue();
                    var backgroundColor = [255, 0, 0];
                    switch (selectColor) {
                        case "1":
                            backgroundColor = [255, 0, 0];
                            break;
                        case "2":
                            backgroundColor = [255, 255, 255];
                            break;
                        case "3":
                            backgroundColor = [67, 142, 219]
                            break;
                        default:
                            backgroundColor = [255, 0, 0];
                    }
                    console.log(backgroundColor)
                        // 后面是算法部分 
                        // 读取模型的输入输出key
                    const inputName = session.inputNames[0];
                    const outputName = session.outputNames[0];

                    // 模型的输入size
                    const input_width = 512
                    const input_height = 512

                    // 先将图片用cv转为指定size，onnx的转换size是直接裁切。通过生成一个canvas来得到dataurl
                    const src = cv.imread(img);
                    const dst = new cv.Mat();
                    const newSize = new cv.Size(input_width, input_height); // 指定目标大小
                    cv.resize(src, dst, newSize, 0, 0, cv.INTER_LINEAR);
                    const canvas = document.createElement('canvas');
                    cv.imshow(canvas, dst);
                    const resizeURL = canvas.toDataURL('image/png');

                    // 通过fromImage api读取resize好的图片，此时图片是rgba的格式
                    const resizedTensor = await ort.Tensor.fromImage(resizeURL, {
                        dataType: 'float32'
                    });
                    // 由于onnx得到的tensor格式是nchw，所以可以通过对tensor.data进行slice来实现透明通道的去除
                    const rgbData = resizedTensor.data.slice(0, 3 * input_height * input_width)
                        // 随后再将data转为tensor
                    const rgbTensor = new ort.Tensor('float32', rgbData, [1, 3, input_height, input_width]);

                    // 由于onnx读取数据转为tensor时会自动缩放到[0,1]，所以可以直接放入模型处理
                    inputdict = {}
                    inputdict[inputName] = rgbTensor
                    const results = await session.run(inputdict);
                    const mask = results[outputName];

                    // 将扣出来的人像加上设定的背景，转为tensor再转为图像dataurl
                    for (var i = 0; i < input_height * input_width; i++) {
                        if (mask.data[i] < threshold) {
                            // 由于data是已经被放缩到了[0,1]，所以颜色也要放缩
                            rgbData[i] = backgroundColor[0] / 255
                            rgbData[i + input_height * input_width] = backgroundColor[1] / 255
                            rgbData[i + input_height * input_width * 2] = backgroundColor[2] / 255
                        }
                    }
                    const resulttensor = new ort.Tensor('float32', rgbData, [1, 3, input_height, input_width]);
                    const resultURL = resulttensor.toDataURL()
                        // 现在得到的尺寸是512*512的



                    // 通过konva绘制图像，并使得可以调整
                    // 不要同时动两个变
                    var konvaimg = new Image();
                    konvaimg.src = resultURL
                    konvaimg.onload = function() {
                        stage.width(pluginWidth / 2)
                        stage.height(pluginHeight)
                        layer.remove()
                        layer = new Konva.Layer();
                        // darth vader

                        // 计算图片的新宽度，使得图片可以上下顶格地放入画布中，避免下边缘和画布下边缘不齐。
                        const newWidth = img.width / img.height * targetHeight // 等比例缩放
                        const newx = (targetWidth - newWidth) / 2 // 通过调整x来保证人物在中间
                        var showImg = new Konva.Image({
                            image: konvaimg,
                            x: newx + (pluginWidth / 2 - targetWidth) / 2,
                            y: (pluginHeight - targetHeight) / 2,
                            width: newWidth,
                            height: targetHeight,
                            draggable: true
                        });

                        // 现在设置一个满大的画布，随后通过Group来限制图片的纯色背景，这样可以实现让transformer到图外面去，但是Group和image都要因此加一个偏移
                        group = new Konva.Group({
                            clip: {
                                x: (pluginWidth / 2 - targetWidth) / 2,
                                y: (pluginHeight - targetHeight) / 2,
                                width: targetWidth,
                                height: targetHeight
                            }
                        });

                        // add cursor styling
                        showImg.on('mouseover', function() {
                            document.body.style.cursor = 'pointer';
                        });
                        showImg.on('mouseout', function() {
                            document.body.style.cursor = 'default';
                        });

                        backgroundRect = new Konva.Rect({
                            x: (pluginWidth / 2 - targetWidth) / 2,
                            y: (pluginHeight - targetHeight) / 2,
                            width: targetWidth,
                            height: targetHeight,
                            fill: `rgb(${backgroundColor.join(', ')})`, // 矩形的填充颜色
                        });
                        group.add(backgroundRect);
                        group.add(showImg)
                        layer.add(group);

                        const border = new Konva.Rect({
                            stroke: '#C3C3C3', // 边框颜色
                            strokeWidth: 2, // 边框宽度
                            listening: false, // 禁用事件监听
                            x: (pluginWidth / 2 - targetWidth) / 2,
                            y: (pluginHeight - targetHeight) / 2,
                            width: targetWidth,
                            height: targetHeight,
                        });
                        layer.add(border);

                        tr = new Konva.Transformer({
                            node: showImg,
                            centeredScaling: true,
                            anchorFill: '#0E83CD',
                            rotateAnchorOffset: -35,
                        });
                        layer.add(tr);
                        stage.add(layer);
                    }

                    stage.on('wheel', (e) => {
                        e.evt.preventDefault();

                        // 获取当前缩放比例
                        let scale = stage.scaleX();
                        const scaleBy = 1.05; // 缩放因子

                        // 判断滚轮方向（向上放大，向下缩小）
                        if (e.evt.deltaY < 0) {
                            scale *= scaleBy; // 放大
                        } else {
                            scale /= scaleBy; // 缩小
                        }

                        // 获取画布中心位置
                        const canvasCenter = {
                            x: stage.width() / 2,
                            y: stage.height() / 2,
                        };

                        // 计算新的位置，使缩放以画布中心为基准
                        const newPos = {
                            x: canvasCenter.x - (canvasCenter.x - stage.x()) * scale / stage.scaleX(),
                            y: canvasCenter.y - (canvasCenter.y - stage.y()) * scale / stage.scaleY(),
                        };

                        // 设置缩放比例和位置
                        stage.scale({ x: scale, y: scale });
                        stage.position(newPos);

                        stage.batchDraw(); // 重新绘制 Stage
                    });

                };

            }
        }
        // 获取单选框选中照片大小的值
        function getSelectedSizeValue() {
            // 获取 name 为 'size' 的所有 radio 按钮
            const radios = document.getElementsByName('size');

            // 遍历每个 radio 按钮，找出被选中的那个
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    return radios[i].value; // 返回选中 radio 的值
                }
            }
            return null; // 如果没有选中任何 radio
        }
        // 获取单选框选中照片背景颜色的值
        function getSelectedColorValue() {
            // 获取 name 为 'size' 的所有 radio 按钮
            const radios = document.getElementsByName('color');

            // 遍历每个 radio 按钮，找出被选中的那个
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    return radios[i].value; // 返回选中 radio 的值
                }
            }
            return null; // 如果没有选中任何 radio
        }

        function upload() {
            tr.hide()
            const oldScale = stage.scale();
            const oldPosition = stage.position();
            stage.scale({ x: 1, y: 1 });
            stage.position({ x: 0, y: 0 });

            todatadict = backgroundRect.getClientRect()
            todatadict['pixelRatio'] = 1
            const ouputimgData = group.toDataURL(todatadict); // 获取 base64 编码的 PNG 图像
            stage.scale(oldScale);
            stage.position(oldPosition);
            tr.show()
            let oImageData = {
                "src": ouputimgData,
                "width": stage.width,
                "height": stage.height
            };
            window.Asc.plugin.executeMethod("PutImageDataToSelection", [oImageData]);
            // window.Asc.plugin.executeCommand("close", "");

        }



        window.Asc.plugin.onTranslate = function() {
            document.getElementById("Previewtext").innerHTML = window.Asc.plugin.tr("Select a photo for preview");
            document.getElementById("usageGauide").innerHTML = window.Asc.plugin.tr("Usage Guide");
            document.getElementById("phrequir").innerHTML = window.Asc.plugin.tr("Photo requirements");
            document.getElementById("privacysta").innerHTML = window.Asc.plugin.tr("Privacy Statement");
            document.getElementById("hint1").innerHTML = window.Asc.plugin.tr("Select an image to upload");
            document.getElementById("bt1").innerHTML = window.Asc.plugin.tr("Upload Image");
            document.getElementById("fileName").innerHTML = window.Asc.plugin.tr("No file chosen");
            document.getElementById("rad1").innerHTML = window.Asc.plugin.tr("1 inch");
            document.getElementById("rad2").innerHTML = window.Asc.plugin.tr("2 inches");
            document.getElementById("rad3").innerHTML = window.Asc.plugin.tr("small 1 inch");
            document.getElementById("rad4").innerHTML = window.Asc.plugin.tr("small 2 inches");
            document.getElementById("rad5").innerHTML = window.Asc.plugin.tr("large 1 inch");
            document.getElementById("rad6").innerHTML = window.Asc.plugin.tr("large 2 inches");
            document.getElementById("rad7").innerHTML = window.Asc.plugin.tr("Chinese passport");
            document.getElementById("rad8").innerHTML = window.Asc.plugin.tr("driving license");
            document.getElementById("rad9").innerHTML = window.Asc.plugin.tr("electronic driving license");
            document.getElementById("rad10").innerHTML = window.Asc.plugin.tr("marriage registration photo");
            document.getElementById("rad11").innerHTML = window.Asc.plugin.tr("second-generation identity card");
            document.getElementById("rad12").innerHTML = window.Asc.plugin.tr("image information collection for college students");
            document.getElementById("rad13").innerHTML = window.Asc.plugin.tr("electronic social security card");
            document.getElementById("rad14").innerHTML = window.Asc.plugin.tr("3 inches");
            // document.getElementById("rad15").innerHTML = window.Asc.plugin.tr("4 inches");
            document.getElementById("rad16").innerHTML = window.Asc.plugin.tr("custom size");
            document.getElementById("rad161").innerHTML = window.Asc.plugin.tr("Width(px):");
            document.getElementById("rad162").innerHTML = window.Asc.plugin.tr("Height(px):");
            document.getElementById("hint2").innerHTML = window.Asc.plugin.tr("Select the background color");
            document.getElementById("color1").innerHTML = window.Asc.plugin.tr("red");
            document.getElementById("color2").innerHTML = window.Asc.plugin.tr("white");
            document.getElementById("color3").innerHTML = window.Asc.plugin.tr("blue");
            document.getElementById("processButton").innerHTML = window.Asc.plugin.tr("Process");
            document.getElementById("uploadButton").innerHTML = window.Asc.plugin.tr("Insert to Document");

            document.getElementById("help1").innerHTML = window.Asc.plugin.tr("Step 1: Select a suitable picture to upload.<br>Step 2: Select the required format and size.<br>Step 3: Click the process button to preview the ID photo. You can manually adjust the size, position, and angle of the portrait. If the image is too large, you can use the mouse wheel to fully preview the photo.<br>Step 4: Click Download or Insert to finish the process.<br>Additionally, if you are not satisfied with the cutout result, you can try improving it by adjusting the cutout threshold.");



            document.getElementById("help2").innerHTML = window.Asc.plugin.tr("Not all photos are suitable for conversion into ID photos. The photo you use needs to be a frontal photo without a hat, dressed appropriately. Normally, the two ear contours of a person and the place corresponding to the Adam's apple of a man should be seen in the photo, and the bottom is higher than the chest position.");
            document.getElementById("help3").innerHTML = window.Asc.plugin.tr("After installation, this plug-in runs offline and will not upload or store any processed pictures or other user data.");
            document.getElementById("typeSelect").innerHTML = window.Asc.plugin.tr("Select the photo type:");

            document.getElementById("saveButton").innerHTML = window.Asc.plugin.tr("Download and Save");
            document.getElementById("threshold").innerHTML = window.Asc.plugin.tr("Threshold");

        }

    })(window, undefined);