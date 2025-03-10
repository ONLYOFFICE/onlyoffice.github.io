let currentTime = localStorage.getItem('focusTime') * 60;
let isFocusMode = true;
let timerInterval;
let focusTime = localStorage.getItem('focusTime') * 60;
let breakTime = localStorage.getItem('breakTime') * 60;
let whiteNoise = localStorage.getItem('whiteNoise');

const timerDisplay = document.getElementById('timer');
const modeDisplay = document.getElementById('mode');
const startStopBtn = document.getElementById('start-stop');
const resetBtn = document.getElementById('reset');
const notificationDisplay = document.getElementById('notification');
const whiteNoiseBtn = document.getElementById('white-noise-btn');
const alertSound = new Audio('resources/store/sound/Notification.mp3');
const whiteNoiseAudio = new Audio();
whiteNoiseAudio.loop = true;

window.Asc.plugin.init = function () {
    localStorage.setItem('focusTime', 25);
    localStorage.setItem('breakTime', 5);
    applyLocalization();  // 初始化时应用本地化
};

window.Asc.plugin.onTranslate = function() {
    applyLocalization(); // 切换语言时应用本地化
};

// 应用本地化翻译
function applyLocalization() {
    modeDisplay.innerHTML = isFocusMode ? window.Asc.plugin.tr("Focus Time") : window.Asc.plugin.tr("Break Time");
    startStopBtn.textContent = timerInterval ? window.Asc.plugin.tr("Pause") : window.Asc.plugin.tr("Start");
    resetBtn.textContent = window.Asc.plugin.tr("Reset");
    whiteNoiseBtn.textContent = whiteNoiseAudio.paused ? window.Asc.plugin.tr("Play White Noise") : window.Asc.plugin.tr("Stop White Noise");
}

// 格式化时间显示为MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 独立的白噪音播放控制
function toggleWhiteNoise() {
    if (whiteNoiseAudio.paused) {
        const selectedNoise = whiteNoise || 'none';
        if (selectedNoise === 'none') {
            updatePageNotification(window.Asc.plugin.tr("No white noise selected."));
        } else {
            whiteNoiseAudio.src = `resources/store/whiteNoise/${selectedNoise}.mp3`;
            whiteNoiseAudio.load();
            whiteNoiseAudio.play().catch(error => {
                console.log("Audio playback failed due to browser policies:", error);
            });
            whiteNoiseBtn.textContent = window.Asc.plugin.tr("Stop White Noise");
        }
    } else {
        whiteNoiseAudio.pause();
        whiteNoiseBtn.textContent = window.Asc.plugin.tr("Play White Noise");
    }
}

// 页面内通知显示
function updatePageNotification(message) {
    notificationDisplay.textContent = message;
    notificationDisplay.style.color = 'red';
}

// 更新计时器显示
function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(currentTime); 
}

// 开始或暂停计时器
startStopBtn.addEventListener('click', function() {
    if (timerInterval) {
        // Pause the timer
        clearInterval(timerInterval);
        timerInterval = null;
        startStopBtn.textContent = window.Asc.plugin.tr("Start");
    } else {
        // Clear notification when starting a new session
        notificationDisplay.textContent = "";
        
        // Start the timer
        timerInterval = setInterval(countdown, 1000);
        startStopBtn.textContent = window.Asc.plugin.tr("Pause");
    }
});

// 计时器倒计时逻辑
function countdown() {
    if (currentTime > 0) {
        currentTime--;
        updateTimerDisplay();
    } else {
        alertSound.play();

        if (isFocusMode) {
            updatePageNotification(window.Asc.plugin.tr("Focus time is over! Time for a break."));
            currentTime = breakTime;
            modeDisplay.textContent = window.Asc.plugin.tr("Break Time");
        } else {
            updatePageNotification(window.Asc.plugin.tr("Break time is over! Time to work."));
            currentTime = focusTime;
            modeDisplay.textContent = window.Asc.plugin.tr("Focus Time");
        }

        isFocusMode = !isFocusMode;

        // Stop the timer and reset the Start/Pause button
        clearInterval(timerInterval);
        timerInterval = null;
        startStopBtn.textContent = window.Asc.plugin.tr("Start");
        
        updateTimerDisplay();
    }
}

// 重置计时器
resetBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    timerInterval = null;
    isFocusMode = true;
    currentTime = focusTime;
    updateTimerDisplay();
    modeDisplay.textContent = window.Asc.plugin.tr("Focus Time");
    notificationDisplay.textContent = '';
    startStopBtn.textContent = window.Asc.plugin.tr("Start");
});

// 独立的白噪音控制按钮
whiteNoiseBtn.addEventListener('click', toggleWhiteNoise);

// 页面加载时更新默认显示
updateTimerDisplay();
applyLocalization();  // 初始化应用本地化
