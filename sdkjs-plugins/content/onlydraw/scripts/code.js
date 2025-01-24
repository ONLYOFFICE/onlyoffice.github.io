// 创建隐藏的canvas元素
const hiddenCanvas = document.createElement('canvas');
const ctx = hiddenCanvas.getContext('2d');
const selectedImages = []; // 用于存储选中的图片路径
let uploadedFiles = []; // 存储上传的文件名
let filePath = '';

const storedFiles=[];

const uploadedFiles2 = localStorage.getItem('uploadedFiles');
// console.log('Array item:', uploadedFiles2);



//第一个图片加载
function loadImages(folder) {
    document.getElementById('drawContainer').style.display = 'none';
    document.getElementById('groupContainer').style.display = 'none'; // 隐藏 groupContainer 容器
    document.getElementById('images').style.display = 'block'; // 显示 images 容器
    const imageContainer = document.getElementById('images');
    imageContainer.innerHTML = ''; // 清空当前显示的图片
    imageContainer.style.overflowY = 'auto'; // 使容器可滚动
    imageContainer.style.maxHeight = 'calc(80vh - 60px)'; // 动态计算容器最大高度，留出一些空间
    //imageContainer.style.maxHeight = '80vh'; // 设置容器最大高度为视口高度的80%
    // 假设图片存放在 img_icon 文件夹下的子文件夹中
    const basePath = `img_icon/${folder}/`;    

    // 这里需要根据实际情况获取文件名，以下是示例文件名
    const imageFiles = [
        'image1.png',
        'image2.png',
        'image3.png',
        'image4.png',
        'image5.png',
        'image6.png',
        'image7.png',
        'image8.png',
        'image9.png',
        'image10.png',
        'image11.png',
        'image12.png',
        'image13.png',
        'image14.png',
        'image15.png',
        'image16.png',
        'image17.png',
        'image18.png',
        'image19.png',
        'image20.png',
        'image21.png',
        'image22.png',
        'image23.png',
        'image24.png',
        'image25.png',
        'image26.png',
        'image27.png',
        'image28.png',
        'image29.png',
        'image30.png',
        'image31.png',
        'image32.png',
        'image33.png',
        'image34.png',
        'image35.png',
        'image36.png',
        'image37.png',
        'image38.png',
        'image39.png',
        'image40.png',
        'image41.png',
        'image42.png',
        'image43.png',
        'image44.png',
        'image45.png',
        'image46.png',
        'image47.png',
        'image48.png',
        'image49.png',
        'image50.png'
        
        // 添加更多文件名
    ];


    // 动态加载图片
    imageFiles.forEach(file => {
        const img = document.createElement('img');
        img.src = basePath + file;
        img.alt = file;

        img.title = document.getElementById('textElement1').innerText; // 从元素获取文本内容

        img.style.cursor = 'pointer'; // 鼠标悬停时显示为手型
        img.style.border = '2px solid transparent'; // 默认边框透明
        img.addEventListener('mouseover', () => {
            const enlargedImg = document.createElement('img'); // 创建放大图片
            enlargedImg.src = img.src; // 设置放大图片源
            enlargedImg.style.position = 'absolute'; // 绝对定位
            enlargedImg.style.zIndex = '1000'; // 确保在最上层
            enlargedImg.style.width = 'auto'; // 设置放大图片宽度
            enlargedImg.style.height = '120px'; // 自适应高度
            enlargedImg.style.border = '2px solid gray'; // 设置边框
            enlargedImg.style.backgroundColor = 'white'; // 设置背景为白色
            // 设置放大图片的位置在鼠标旁边
            enlargedImg.style.left = `${event.pageX - 65}px`; // 鼠标右侧10px
            enlargedImg.style.top = `${event.pageY - 130}px`; // 鼠标下方10px
            
            const timeoutId = setTimeout(() => {
                document.body.appendChild(enlargedImg); // 添加到文档中
            }, 700); // 1秒后显示放大图片
            
            img.addEventListener('mouseout', () => {
                clearTimeout(timeoutId); // 鼠标移出时清除定时器
                if (document.body.contains(enlargedImg)) {
                    document.body.removeChild(enlargedImg); // 移除放大图片
                }
            });
        });
        
            img.addEventListener('dblclick', () => { // 修改为双击事件
                switch (window.Asc.plugin.info.editorType){
                    case 'word': {
                        insertImage_one();
                        // this.executeCommand("close", "");
                        break;
                    }
                    case 'cell':{
                        insertexcel_one();
                        // this.executeCommand("close", "");
                        break;
                    }
                    case 'slide':{
                        insertPPT_one();
                        // this.executeCommand("close", "");
                        break;
                    }
                    case 'pdf':{
                        insertpdf_one();
                        // this.executeCommand("close", "");
                    break;
                    }
            }
            // 清空 hiddenCanvas
            ctx.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height);

        });
    
            img.addEventListener('click', () => {
                // 取消其他图片的选中状态
                const selected = imageContainer.querySelector('.selected');
                if (selected) {
                    selected.classList.remove('selected');
                    selected.style.border = '2px solid transparent'; // 取消边框
                }
                img.classList.add('selected'); // 选中当前图片
                img.style.border = '2px solid gray'; // 设置选中边框颜色
                
                
                // 如果已选中图片，则将其绘制到canvas上
                // ... existing code ...
                if (!selectedImages.includes(img.src)) {
                    selectedImages.push(img.src); // 添加到选中数组
                }

                const imgElement = new Image();
                imgElement.src = img.src;
                imgElement.onload = () => {
                    // 清空canvas内容
                    ctx.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height);

                    // 设置canvas尺寸
                    const maxDimension = Math.max(imgElement.width, imgElement.height);
                    hiddenCanvas.width = maxDimension * 1.02;
                    hiddenCanvas.height = maxDimension * 1.02;

                    // 计算居中位置并绘制
                    const x = (hiddenCanvas.width - imgElement.width) / 2;
                    const y = (hiddenCanvas.height - imgElement.height) / 2;
                    ctx.drawImage(imgElement, x, y);
                };

                // if (!selectedImages.includes(img.src)) {
                //     selectedImages.push(img.src); // 添加到选中数组
                //     const imgElement = new Image();
                //     imgElement.src = img.src;
                //     imgElement.onload = () => {
                //         // 清空canvas内容
                //         ctx.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height); // 清空canvas内容
                //         const maxDimension = Math.max(imgElement.width, imgElement.height);
                //         hiddenCanvas.width = maxDimension * 1.02; // 设置canvas宽度
                //         hiddenCanvas.height = maxDimension * 1.02; // 设置canvas高度
                //         // 计算图片在canvas中的位置，使其居中
                //         const x = (hiddenCanvas.width - imgElement.width) / 2; // 计算x坐标
                //         const y = (hiddenCanvas.height - imgElement.height) / 2; // 计算y坐标
                //         ctx.drawImage(imgElement, x, y); // 绘制图片到canvas
                //     };
                // } else {
                //     // 如果图片已经在selectedImages中，直接加载到canvas
                //     const imgElement = new Image();
                //     imgElement.src = img.src;
                //     imgElement.onload = () => {
                //         // 清空canvas内容
                //         ctx.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height); // 清空canvas内容
                //         // 比较 imgElement 的宽度和高度，使用较大的值设置 canvas 尺寸
                //         const maxDimension = Math.max(imgElement.width, imgElement.height);
                //         hiddenCanvas.width = maxDimension * 1.02; // 设置canvas宽度
                //         hiddenCanvas.height = maxDimension * 1.02; // 设置canvas高度
                //         ctx.drawImage(imgElement, 0, 0); // 绘制图片到canvas
                //         // 计算图片在canvas中的位置，使其居中
                //         const x = (hiddenCanvas.width - imgElement.width) / 2; // 计算x坐标
                //         const y = (hiddenCanvas.height - imgElement.height) / 2; // 计算y坐标
                //         ctx.drawImage(imgElement, x, y); // 绘制图片到canvas
                //     };
                // }
                
            });
            imageContainer.appendChild(img);
        });

}

//---------------------------------------------------------------
//第一个功能的上传文件

document.getElementById('select-file').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true; // 允许选择多个文件
    input.onchange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            uploadedFiles = [...uploadedFiles, ...Array.from(files)]; // 保留之前的文件并添加新文件
            localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles)); // 保存到localStorage
            loadImages_myself(); // 调用加载图片的函数
        }
   
    };
    input.click();
});


//第一个功能的上传文件后，图片加载的代码
function loadImages_myself(folder) {
    document.getElementById('drawContainer').style.display = 'none';
    document.getElementById('groupContainer').style.display = 'none'; // 隐藏 images 容器
    document.getElementById('images').style.display = 'block'; // 显示 images 容器
    const imageContainer = document.getElementById('images');
    imageContainer.innerHTML = ''; // 清空当前显示的图片
    imageContainer.style.overflowY = 'scroll'; // 使容器可滚动
    imageContainer.style.maxHeight = '350px'; // 设置容器最大高度以便滚动
    //uploadedFiles = localStorage.getItem('uploadedFiles');

        // 动态加载图片
    uploadedFiles.forEach(file => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file); // 使用 URL.createObjectURL 来获取文件的 URL
        img.alt = file.name; // 设置图片的 alt 属性
        img.title = document.getElementById('textElement1').innerText; // 设置图片标题
        img.style.cursor = 'pointer'; // 鼠标悬停时显示为手型
        img.style.border = '2px solid transparent'; // 默认边框透明
        // 懒加载
        img.onload = () => {
            // 图片加载完成后执行的代码
            console.log(`${file.name} 加载完成`);
        };
        img.addEventListener('mouseover', () => {
            const enlargedImg = document.createElement('img'); // 创建放大图片
            enlargedImg.src = img.src; // 设置放大图片源
            enlargedImg.style.position = 'absolute'; // 绝对定位
            enlargedImg.style.zIndex = '1000'; // 确保在最上层
            enlargedImg.style.width = 'auto'; // 设置放大图片宽度
            enlargedImg.style.height = '120px'; // 自适应高度
            enlargedImg.style.border = '2px solid gray'; // 设置边框
            // 设置放大图片的位置在鼠标旁边
            enlargedImg.style.left = `${event.pageX - 65}px`; // 鼠标右侧10px
            enlargedImg.style.top = `${event.pageY - 130}px`; // 鼠标下方10px
            
            const timeoutId = setTimeout(() => {
                document.body.appendChild(enlargedImg); // 添加到文档中
            }, 700); // 1秒后显示放大图片
            
            img.addEventListener('mouseout', () => {
                clearTimeout(timeoutId); // 鼠标移出时清除定时器
                if (document.body.contains(enlargedImg)) {
                    document.body.removeChild(enlargedImg); // 移除放大图片
                }
            });
        });

        
            img.addEventListener('dblclick', () => { // 修改为双击事件
               
                switch (window.Asc.plugin.info.editorType){
                    case 'word': {
                        insertImage_one();
                        // this.executeCommand("close", "");
                        break;
                    }
                    case 'cell':{
                        insertexcel_one();
                        // this.executeCommand("close", "");
                        break;
                    }
                    case 'slide':{
                        insertPPT_one();
                        // this.executeCommand("close", "");
                        break;
                    }
                    case 'pdf':{
                        insertpdf_one();
                        // this.executeCommand("close", "");
                    break;
                    }
            }
            // 清空 hiddenCanvas
            ctx.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height);
        });
    
            img.addEventListener('click', () => {
                // 取消其他图片的选中状态
                const selected = imageContainer.querySelector('.selected');
                if (selected) {
                    selected.classList.remove('selected');
                    selected.style.border = '2px solid transparent'; // 取消边框
                }
                img.classList.add('selected'); // 选中当前图片
                img.style.border = '2px solid gray'; // 设置选中边框颜色
                
                // 如果已选中图片，则将其绘制到canvas上
                if (!selectedImages.includes(img.src)) {
                    selectedImages.push(img.src); // 添加到选中数组
                    const imgElement = new Image();
                    imgElement.src = img.src;
                    imgElement.onload = () => {
                        // 清空canvas内容
                        ctx.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height); // 清空canvas内容
                        const maxDimension = Math.max(imgElement.width, imgElement.height);
                        hiddenCanvas.width = maxDimension * 1.02; // 设置canvas宽度
                        hiddenCanvas.height = maxDimension * 1.02; // 设置canvas高度
                        // 计算图片在canvas中的位置，使其居中
                        const x = (hiddenCanvas.width - imgElement.width) / 2; // 计算x坐标
                        const y = (hiddenCanvas.height - imgElement.height) / 2; // 计算y坐标
                        ctx.drawImage(imgElement, x, y); // 绘制图片到canvas
                    };
                } else {
                    // 如果图片已经在selectedImages中，直接加载到canvas
                    const imgElement = new Image();
                    imgElement.src = img.src;
                    imgElement.onload = () => {
                        // 清空canvas内容
                        ctx.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height); // 清空canvas内容
                        const maxDimension = Math.max(imgElement.width, imgElement.height);
                        hiddenCanvas.width = maxDimension * 1.02; // 设置canvas宽度
                        hiddenCanvas.height = maxDimension * 1.02; // 设置canvas高度
                        // 计算图片在canvas中的位置，使其居中
                        const x = (hiddenCanvas.width - imgElement.width) / 2; // 计算x坐标
                        const y = (hiddenCanvas.height - imgElement.height) / 2; // 计算y坐标
                        ctx.drawImage(imgElement, x, y); // 绘制图片到canvas
                    };
                }
            });
            imageContainer.appendChild(img);
        });

}





//---------------------------------------------------------------------
//--------------------------------------------------------------------
//第二个表情包的
    const groupButton = document.getElementById('emoji');
    const groupContainer = document.getElementById('groupContainer');

    // 创建二个部分的容器
    const part1 = document.createElement('div');
    part1.style.overflowX = 'scroll'; // 设置为自动水平滚动
    part1.style.whiteSpace = 'nowrap'; // 防止换行
    part1.style.maxWidth = '100%'; // 设置最大宽度以便滚动
 
    const part2 = document.createElement('div');
    part2.style.overflowX = 'auto'; // 设置为自动水平滚动
    part2.style.whiteSpace = 'nowrap'; // 防止换行
    part2.style.maxWidth = '100%'; // 设置最大宽度以便滚动

    const part3 = document.createElement('div');
   

    const faceMap = 
        [
            'emjoy/face/face1.png',
            'emjoy/face/face2.png',
            'emjoy/face/face3.png',
            'emjoy/face/face4.png',
            'emjoy/face/face5.png',
            'emjoy/face/face6.png',
            'emjoy/face/face7.png',
            'emjoy/face/face8.png',
            'emjoy/face/face9.png'
        ];
    const emoteMap = 
        [
            'emjoy/emote/emote1.png',
            'emjoy/emote/emote2.png',
            'emjoy/emote/emote3.png',
            'emjoy/emote/emote4.png',
            'emjoy/emote/emote5.png',
            'emjoy/emote/emote6.png',
            'emjoy/emote/emote7.png',
            'emjoy/emote/emote8.png',
            'emjoy/emote/emote9.png'
         
        ];

    // 创建保存按钮
    const saveButton = document.createElement('button');
    saveButton.textContent = document.getElementById('textsave2').innerText;;

    // 为emojiButton添加点击事件
    groupButton.addEventListener('click', async () => {
        document.getElementById('images').style.display = 'none'; // 隐藏 images 容器
        document.getElementById('drawContainer').style.display = 'none'; // 隐藏 images 容器
        document.getElementById('groupContainer').style.display = 'block'; // 显示 groupContainer 容器
        // 清空容器
        groupContainer.innerHTML = '';
        part1.innerHTML = '';
        part2.innerHTML = '';
        part3.innerHTML = '';


        // 创建提示信息弹窗
        const messageBox = document.createElement('div');
        messageBox.textContent = document.getElementById('text').innerText;;
        messageBox.style.position = 'fixed';
        messageBox.style.top = '50%';
        messageBox.style.left = '50%';
        messageBox.style.transform = 'translate(-50%, -50%)';
        messageBox.style.padding = '10px 20px';
        messageBox.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        messageBox.style.color = 'white';
        messageBox.style.borderRadius = '5px';
        messageBox.style.zIndex = '1000';
        document.body.appendChild(messageBox);
        // 2秒后自动移除消息
        setTimeout(() => {
            document.body.removeChild(messageBox);
        }, 2500); 

        //设置容器大小
        part1.style.border = '1px solid black';
        part1.style.width = '285px';
        part1.style.height = '68px';
        part1.style.margin = '0 auto';
        part1.style.marginBottom = '10px'; // 添加底部间距

        part2.style.border = '1px solid black';
        part2.style.width = '285px';
        part2.style.height = '68px';
        part2.style.margin = '0 auto';
        part2.style.marginBottom = '10px'; // 添加底部间距

        // 加载faceMap中的图片
        displayImagess(faceMap, part1);
        // 加载emote文件夹中的图片
        displayImagess(emoteMap, part2);

        // 设置画板样式
        part3.style.border = '1px solid black';
        part3.style.width = '140px';
        part3.style.height = '140px';
        part3.style.margin = '0 auto';

        // 将三个部分添加到groupContainer
        groupContainer.appendChild(part1);
        groupContainer.appendChild(part2);
        groupContainer.appendChild(part3);
        //groupContainer.appendChild(saveButton);
    });

    // 显示图片
    function displayImagess(images, container) {
        images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.style.width = '45px'; // 设置图片宽度
            img.style.margin = '5px';   // 设置图片间距
            img.style.cursor = 'pointer'; // 添加鼠标指针样式
            img.addEventListener('click', () => addToCanvas(imageUrl, container));
            container.appendChild(img);
        });
    }

    const groupcanvas = document.createElement('canvas');
    const ctx2 = groupcanvas.getContext('2d');
    groupcanvas.width = 200;  // 与 part3 的宽度相同
    groupcanvas.height = 200; // 与 part3 的高度相同

    function updateCanvas() {
         // 清空 Canvas
        ctx2.clearRect(0, 0, groupcanvas.width, groupcanvas.height);  
        // 绘制 part3 中的所有图片到 Canvas
        Array.from(part3.childNodes).forEach(img => {
        // 获取图片在 part3 中的位置
        const rect = img.getBoundingClientRect();
        const part3Rect = part3.getBoundingClientRect();
        
        // 计算图片在 Canvas 中的位置
        const x = (rect.left - part3Rect.left) * (groupcanvas.width / part3.offsetWidth);
        const y = (rect.top - part3Rect.top) * (groupcanvas.height / part3.offsetHeight);
        
        // 计算图片在 Canvas 中的大小
        const width = img.width * (groupcanvas.width / part3.offsetWidth);
        const height = img.height * (groupcanvas.height / part3.offsetHeight);
        
        // 绘制图片到 Canvas
        ctx2.drawImage(img, x, y, width, height);
    }); 

    }

    // 将选中的图片添加到画板
    function addToCanvas(imageUrl, sourceContainer) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.position = 'absolute';
    
        // 计算居中位置
        img.style.top = '50%';
        img.style.left = '50%';
        img.style.transform = 'translate(-50%, -50%)';
        img.style.width = '100px';  // 设置固定宽度
        img.style.height = '100px'; // 设置固定高度

        // 为图片添加一个标识，用于区分来源
        img.dataset.source = sourceContainer === part1 ? 'part1' : 'part2';

        // 移除同类型的图片
        Array.from(part3.children).forEach(child => {
            if (child.dataset.source === img.dataset.source) {
                part3.removeChild(child);
            }
        });

        // 添加新图片
        if (part3.children.length === 0) {
            part3.style.position = 'relative';
        }
        part3.appendChild(img);

        // 在添加图片后，更新 Canvas
        updateCanvas();

    }

// 为 groupcanvas 添加鼠标悬停事件
part3.addEventListener('mouseover', () => {
    const tooltip = document.createElement('div');
    tooltip.textContent = document.getElementById('textElement1').innerText;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.zIndex = '1001';
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;

    const timeoutId = setTimeout(() => {
        document.body.appendChild(tooltip);
    }, 500); // 1秒后显示提示文字

    part3.addEventListener('mouseout', () => {
        clearTimeout(timeoutId);
        if (document.body.contains(tooltip)) {
            document.body.removeChild(tooltip);
        }
    });
});

// 为 groupcanvas 添加双击事件
part3.addEventListener('dblclick', () => {
    switch (window.Asc.plugin.info.editorType){
        case 'word': {
            insertImage_two();
            // this.executeCommand("close", "");
            break;
        }
        case 'cell':{
            insertexcel_two();
            // this.executeCommand("close", "");
            break;
        }
        case 'slide':{
            insertPPT_two();
            // this.executeCommand("close", "");
            break;
        }
        case 'pdf':{
            insertpdf_two();
            // this.executeCommand("close", "");
        break;
        }
}
});







//---------------------------------------------------------------------
//--------------------------------------------------------------------
//第三个功能自由绘制的
// 获取必要的DOM元素
const drawButton = document.getElementById('free-draw');
const drawContainer = document.getElementById('drawContainer');

// 创建画布元素
const canvas = document.createElement('canvas');
canvas.width = 200;
canvas.height = 200;
canvas.style.border = '1px solid black';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let savedImages = []; // 用于存储保存的图片

// 提升变量到更高的作用域
let colorPicker, brushSizePicker;

// 绘画函数
function draw(e) {
    if (!isDrawing) return;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = colorPicker.value; // 使用选择的颜色
    ctx.lineWidth = brushSizePicker.value; // 使用选择的笔刷大小
    ctx.lineCap = 'round';
  
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

// 清屏函数
function clearCanvas() {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// 下载函数
function saveCanvas() {
    const imageData = canvas.toDataURL('image/png');
    savedImages.push(imageData);
    console.log('图片已保存，当前保存的图片数量：', savedImages.length);

     // 创建一个临时的 <a> 元素来下载图片
     const link = document.createElement('a');
     link.href = imageData;
     link.download = '绘图_' + new Date().getTime() + '.png';
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);

    // 显示保存成功的弹窗
    showSaveSuccessMessage();
  }


//插入函数
function insertCanvas() {
    switch (window.Asc.plugin.info.editorType){
        case 'word': {
            insertImage_three();
            // this.executeCommand("close", "");
            break;
        }
        case 'cell':{
            insertexcel_three();
            // this.executeCommand("close", "");
            break;
        }
        case 'slide':{
            insertPPT_three();
            // this.executeCommand("close", "");
            break;
        }
        case 'pdf':{
            insertpdf_three();
            // this.executeCommand("close", "");
        break;
        }
}
  }

// 显示保存成功消息的函数
// function showSaveSuccessMessage() {
//     const messageBox = document.createElement('div');
//     messageBox.textContent = document.getElementById('textsave').innerText;
//     messageBox.style.position = 'fixed';
//     messageBox.style.top = '50%';
//     messageBox.style.left = '50%';
//     messageBox.style.transform = 'translate(-50%, -50%)';
//     messageBox.style.padding = '10px 20px';
//     messageBox.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
//     messageBox.style.color = 'white';
//     messageBox.style.borderRadius = '5px';
//     messageBox.style.zIndex = '1000';
  
//     document.body.appendChild(messageBox);
  
//     // 2秒后自动移除消息
//     setTimeout(() => {
//       document.body.removeChild(messageBox);
//     }, 700);
//   }




// 点击按钮时显示画布、创建新按钮并添加事件监听器
drawButton.addEventListener('click', () => {
    document.getElementById('images').style.display = 'none'; // 隐藏 images 容器
    document.getElementById('groupContainer').style.display = 'none'; // 隐藏 images 容器
    document.getElementById('drawContainer').style.display = 'block'; // 显示 drawContainer 容器
    drawContainer.innerHTML = ''; // 清空容器

  

    // 创建颜色选择器和笔刷大小选择器
    colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = '#000000'; // 默认颜色为黑色

    brushSizePicker = document.createElement('input');
    brushSizePicker.type = 'range';
    brushSizePicker.min = '1';
    brushSizePicker.max = '10';
    brushSizePicker.value = '2'; // 默认笔刷大小

    // 创建一个容器来放置选择器
    const controlsContainer = document.createElement('div');
    controlsContainer.style.display = 'flex';
    controlsContainer.style.justifyContent = 'center'; // 居中对齐
    controlsContainer.style.marginBottom = '10px'; // 添加底部间距

    // 将选择器添加到控制容器
    controlsContainer.appendChild(colorPicker);
    controlsContainer.appendChild(brushSizePicker);

    // 创建按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexDirection = 'column'; // 垂直排列
    buttonContainer.style.marginRight = '10px'; // 添加右边距

    // 创建清屏按钮
    const clearButton = document.createElement('button');
    clearButton.textContent = document.getElementById('textclean').innerText;
    clearButton.style.fontSize = '12px'; // 设置字体大小
    clearButton.addEventListener('click', clearCanvas);
    buttonContainer.appendChild(clearButton);

    // 创建保存按钮
    const saveButton = document.createElement('button');
    saveButton.textContent = document.getElementById('textsave2').innerText;
    saveButton.style.fontSize = '12px'; // 设置字体大小
    saveButton.addEventListener('click', saveCanvas);
    buttonContainer.appendChild(saveButton);

    // // 添加添加按钮
    // const addButton = document.createElement('button');
    // addButton.textContent = document.getElementById('textsave4').innerText;// 设置按钮文本
    // addButton.style.fontSize = '12px'; // 设置字体大小
    // addButton.addEventListener('click', saveCanvas);
    // buttonContainer.appendChild(addButton); // 将按钮添加到容器中
    
    // 添加插入按钮
    const insertButton = document.createElement('button');
    insertButton.textContent = document.getElementById('textsave3').innerText;// 设置按钮文本
    insertButton.style.fontSize = '12px'; // 设置字体大小
    insertButton.addEventListener('click', insertCanvas);
    buttonContainer.appendChild(insertButton); // 将按钮添加到容器中
    

    // 创建一个容器来放置画布和按钮
    const canvasContainer = document.createElement('div');
    canvasContainer.style.display = 'flex';

    // 将按钮容器和画布添加到画布容器中
    canvasContainer.appendChild(buttonContainer);
    canvasContainer.appendChild(canvas);

    // 将控制容器和画布容器添加到绘画容器中
    drawContainer.appendChild(controlsContainer);
    drawContainer.appendChild(canvasContainer);

    // 添加鼠标事件监听器
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
});



// 为 canvas 添加双击事件
canvas.addEventListener('dblclick', () => {
    switch (window.Asc.plugin.info.editorType){
        case 'word': {
            insertImage_three();
            // this.executeCommand("close", "");
            break;
        }
        case 'cell':{
            insertexcel_three();
            // this.executeCommand("close", "");
            break;
        }
        case 'slide':{
            insertPPT_three();
            // this.executeCommand("close", "");
            break;
        }
        case 'pdf':{
            insertpdf_three();
            // this.executeCommand("close", "");
        break;
        }
}
});






//---------------------------------------------------------------------
//---------------------------------------------------------------------
//onlyoffice的代码，下面都是插入功能
//---------------------------------------------------------------------
//第一个功能的插入
function insertImage_one() {
    // var data = signaturePad.toDataURL('image/png');
    Asc.scope.imageUrl = hiddenCanvas.toDataURL('image/png');

    window.Asc.plugin.callCommand(function () {
        var oDocument = Api.GetDocument();
        var oParagraph = Api.CreateParagraph();
        var oImage = Api.CreateImage(Asc.scope.imageUrl,40*36000, 40*36000);
        oImage.SetWrappingStyle("inFront");
        oParagraph.AddDrawing(oImage);
        oDocument.InsertContent([oParagraph]);
    }, false);
};



function insertPPT_one() {
    // var data = signaturePad.toDataURL('image/png');
    Asc.scope.imageUrl = hiddenCanvas.toDataURL('image/png');
    window.Asc.plugin.callCommand(function () {
        var oPresentation = Api.GetPresentation();
        var oSlide = oPresentation.GetSlideByIndex(0);
        var oShape = Api.CreateImage(Asc.scope.imageUrl, 40 * 36000, 40 * 36000);
        oSlide.AddObject(oShape);
    }, false);
  }

  function insertexcel_one() {
    Asc.scope.imageUrl = hiddenCanvas.toDataURL('image/png');
    window.Asc.plugin.callCommand(function () {
        var oWorksheet = Api.GetActiveSheet();
        var oImage = oWorksheet.AddImage(Asc.scope.imageUrl, 40 * 36000, 40 * 36000, 0, 2 * 36000, 2, 3 * 36000);
        var sClassType = oImage.GetClassType();
        oWorksheet.SetColumnWidth(0, 15);
      oWorksheet.SetColumnWidth(1, 10);
    }, false);
  }

  function insertpdf_one() {
    Asc.scope.imageUrl = hiddenCanvas.toDataURL('image/png');
    window.Asc.plugin.callCommand(function () {
        var oDocument = Api.GetDocument();
        // 创建一个图片表单域,设置其属性
        var oPictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false, "shiftX": 50, "shiftY": 50});
        var oParagraph = oDocument.GetElement(0);
        oParagraph.AddElement(oPictureForm);
        oPictureForm.SetImage(Asc.scope.imageUrl, 40 * 36000, 40 * 36000);
    }, false);
  }


  //---------------------------------------------------------------------
  //第二个功能的插入
function insertImage_two() {
    // var data = signaturePad.toDataURL('image/png');
    Asc.scope.imageUrl = groupcanvas.toDataURL('image/png');
    window.Asc.plugin.callCommand(function () {
        var oDocument = Api.GetDocument();
        var oParagraph = Api.CreateParagraph();
        var oImage = Api.CreateImage(Asc.scope.imageUrl, 40 * 36000, 40 * 36000);
        oImage.SetWrappingStyle("inFront");
        oParagraph.AddDrawing(oImage);
        oDocument.InsertContent([oParagraph]);
    }, false);
  }
  
  function insertexcel_two() {
      Asc.scope.imageUrl = groupcanvas.toDataURL('image/png');
      window.Asc.plugin.callCommand(function () {
          var oWorksheet = Api.GetActiveSheet();
          var oImage = oWorksheet.AddImage(Asc.scope.imageUrl, 40 * 36000, 40 * 36000, 0, 2 * 36000, 2, 3 * 36000);
          var sClassType = oImage.GetClassType();
          oWorksheet.SetColumnWidth(0, 15);
        oWorksheet.SetColumnWidth(1, 10);
        // oWorksheet.GetRange("A1").SetValue("Class Type = ");
        // oWorksheet.GetRange("B1").SetValue(sClassType);
      }, false);
    }

  function insertPPT_two() {
      // var data = signaturePad.toDataURL('image/png');
      Asc.scope.imageUrl = groupcanvas.toDataURL('image/png');
      window.Asc.plugin.callCommand(function () {
          var oPresentation = Api.GetPresentation();
          var oSlide = oPresentation.GetSlideByIndex(0);
          //oSlide.RemoveAllObjects();
          var oShape = Api.CreateImage(Asc.scope.imageUrl, 40 * 36000, 40 * 36000);
          oSlide.AddObject(oShape);
      }, false);
    }

    function insertpdf_two() {
        Asc.scope.imageUrl = groupcanvas.toDataURL('image/png');
        window.Asc.plugin.callCommand(function () {
            var oDocument = Api.GetDocument();
            // 创建一个图片表单域,设置其属性
            var oPictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false, "shiftX": 50, "shiftY": 50});
            var oParagraph = oDocument.GetElement(0);
            oParagraph.AddElement(oPictureForm);
            oPictureForm.SetImage(Asc.scope.imageUrl, 40 * 36000, 40 * 36000);
        }, false);
      }




//第三个功能的插入
function insertImage_three() {
    // var data = signaturePad.toDataURL('image/png');
    Asc.scope.imageUrl = canvas.toDataURL('image/png');
    window.Asc.plugin.callCommand(function () {
        var oDocument = Api.GetDocument();
        var oParagraph = Api.CreateParagraph();
        var oImage = Api.CreateImage(Asc.scope.imageUrl, 40 * 36000, 40 * 36000);
        oImage.SetWrappingStyle("inFront");
        oParagraph.AddDrawing(oImage);
        oDocument.InsertContent([oParagraph]);
    }, false);
  };
  
  function insertPPT_three() {
    // var data = signaturePad.toDataURL('image/png');
    Asc.scope.imageUrl = canvas.toDataURL('image/png');
    window.Asc.plugin.callCommand(function () {
        var oPresentation = Api.GetPresentation();
        var oSlide = oPresentation.GetSlideByIndex(0);
        //oSlide.RemoveAllObjects();
        var oShape = Api.CreateImage(Asc.scope.imageUrl, 40 * 36000, 40 * 36000);
        oSlide.AddObject(oShape);
    }, false);
  }

  function insertexcel_three() {
    Asc.scope.imageUrl = canvas.toDataURL('image/png');
    window.Asc.plugin.callCommand(function () {
        var oWorksheet = Api.GetActiveSheet();
        var oImage = oWorksheet.AddImage(Asc.scope.imageUrl, 40 * 36000, 40 * 36000, 0, 2 * 36000, 2, 3 * 36000);
        var sClassType = oImage.GetClassType();
        oWorksheet.SetColumnWidth(0, 15);
      oWorksheet.SetColumnWidth(1, 10);
      // oWorksheet.GetRange("A1").SetValue("Class Type = ");
      // oWorksheet.GetRange("B1").SetValue(sClassType);
    }, false);
  }

  function insertpdf_three() {
    Asc.scope.imageUrl = canvas.toDataURL('image/png');
    window.Asc.plugin.callCommand(function () {
        var oDocument = Api.GetDocument();
        // 创建一个图片表单域,设置其属性
        var oPictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false, "shiftX": 50, "shiftY": 50});
        var oParagraph = oDocument.GetElement(0);
        oParagraph.AddElement(oPictureForm);
        oPictureForm.SetImage(Asc.scope.imageUrl, 40 * 36000, 40 * 36000);
    }, false);
  }


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//onlyoffice的代码，下面都是本地化
//---------------------------------------------------------------------
//翻译字符

