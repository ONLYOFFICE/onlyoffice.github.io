(function(window, undefined) {
    var imgNode = null;
    var msgNode = null;
    
    // 状态变量
    var scale = 1;
    var isDragging = false;
    var startX, startY, translateX = 0, translateY = 0;

    window.Asc.plugin.init = function(sHtml) {
        imgNode = document.getElementById("img_display");
        msgNode = document.getElementById("msg");

        // 1. 初始化尺寸
        window.Asc.plugin.resizeWindow(800, 600, 800, 600);

        // 2. 加载数据
        fetchAndShow();

        // 3. 创建居中的控制按钮
        createControls();

        // 4. 滚轮缩放逻辑
        window.addEventListener("wheel", function(e) {
            e.preventDefault();
            var delta = e.deltaY > 0 ? -0.1 : 0.1;
            var newScale = scale + delta;
            if (newScale >= 0.1 && newScale <= 10) {
                scale = newScale;
                updateTransform();
            }
        }, { passive: false });

        // 5. 拖拽逻辑
        window.addEventListener("mousedown", function(e) {
            if (e.target === imgNode && e.button === 0) {
                isDragging = true;
                imgNode.style.cursor = "grabbing";
                startX = e.clientX - translateX;
                startY = e.clientY - translateY;
                e.preventDefault(); 
            }
        });

        window.addEventListener("mousemove", function(e) {
            if (isDragging) {
                translateX = e.clientX - startX;
                translateY = e.clientY - startY;
                updateTransform();
            }
        });

        window.addEventListener("mouseup", function() {
            isDragging = false;
            if (imgNode) imgNode.style.cursor = "grab";
        });

        // 6. ESC 退出全屏
        window.addEventListener("keydown", function(e) {
            if (e.key === "Escape" || e.keyCode === 27) {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
            }
        });
    };

    function createControls() {
        if (document.getElementById("plugin_controls")) return;

        var container = document.createElement("div");
        container.id = "plugin_controls";
        
        // 修改为底部居中布局
        container.style.position = "fixed";
        container.style.bottom = "20px";
        container.style.left = "50%";
        container.style.transform = "translateX(-50%)";
        container.style.display = "flex";
        container.style.gap = "12px";
        container.style.zIndex = "1000";

        // 全屏按钮
        var btnFull = document.createElement("button");
        btnFull.innerHTML = "全屏查看";
        applyNewStyle(btnFull);
        btnFull.onclick = function() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        };

        // 1:1 按钮
        var btnReset = document.createElement("button");
        btnReset.innerHTML = "1:1 还原";
        applyNewStyle(btnReset);
        btnReset.onclick = function() {
            scale = 1; translateX = 0; translateY = 0;
            updateTransform();
        };

        container.appendChild(btnFull);
        container.appendChild(btnReset);
        document.body.appendChild(container);
    }

    function applyNewStyle(btn) {
        btn.style.padding = "4px 12px";
        btn.style.fontSize = "10px"; 
        btn.style.color = "#ffffff"; // 适应深色背景改用白字
        btn.style.backgroundColor = "rgba(0, 0, 0, 0.4)"; // 半透明背景
        btn.style.border = "1px solid #666";
        btn.style.borderRadius = "4px";
        btn.style.cursor = "pointer";
        btn.style.transition = "background 0.2s";

        btn.onmouseover = function() { this.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; };
        btn.onmouseout = function() { this.style.backgroundColor = "rgba(0, 0, 0, 0.4)"; };
    }

    function updateTransform() {
        if (imgNode) {
            imgNode.style.transform = "translate(" + translateX + "px, " + translateY + "px) scale(" + scale + ")";
        }
    }

    function fetchAndShow() {
        window.Asc.plugin.executeMethod("GetImageDataFromSelection", [], function(oResult) {
            if (oResult && oResult.src) {
                imgNode.src = oResult.src;
                imgNode.style.display = "block";
                imgNode.style.cursor = "grab";
                if (msgNode) msgNode.style.display = "none";
                scale = 1; translateX = 0; translateY = 0;
                updateTransform();
            } else {
                imgNode.style.display = "none";
                if (msgNode) {
                    msgNode.style.display = "block";
                    msgNode.innerHTML = "请先选中一张图片";
                }
            }
        });
    }

    window.Asc.plugin.onSelectionChanged = function() {
        fetchAndShow();
    };

    window.Asc.plugin.button = function(id) {
        this.executeCommand("close", "");
    };

})(window, undefined);