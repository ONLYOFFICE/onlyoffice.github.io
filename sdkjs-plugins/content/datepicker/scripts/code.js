// Helper function to translate and clean up English keys
function tr(key) {
  if (window.Asc && window.Asc.plugin && window.Asc.plugin.tr) {
    const translated = window.Asc.plugin.tr(key);

    // If translation returns the same as key (meaning English), clean it up
    if (translated === key) {
      // Remove context markers for English display
      return key.replace(/ \(full\)|\(short\)/g, "");
    }

    return translated;
  }

  // Fallback: clean up the key for display
  return key.replace(/ \(full\)|\(short\)/g, "");
}

// Helper function to get proper weekday abbreviations
function getWeekdayAbbreviation(fullWeekdayName, index) {
  // Check if this looks like Albanian format (starts with "E " followed by another word)
  if (fullWeekdayName.startsWith("E ") && fullWeekdayName.length > 2) {
    // Extract the first letter of the second word
    const secondWord = fullWeekdayName.substring(2).trim();
    return secondWord.charAt(0).toUpperCase();
  }

  // For other languages, use the first 2 characters as before
  return fullWeekdayName.substring(0, 2);
}

// Custom Calendar Class with Translation Support
class CustomCalendar {
  constructor(input, options = {}) {
    this.input = input;
    this.calendar = document.getElementById("customCalendar");
    this.calendarDays = document.getElementById("calendarDays");
    this.calendarTitle = document.getElementById("monthYearTitle");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.calendarIcon = document.getElementById("calendarIcon");
    this.monthView = document.getElementById("monthView");
    this.yearView = document.getElementById("yearView");
    this.weekdays = document.getElementById("calendarWeekdays");

    this.currentDate = new Date();
    this.selectedDate = new Date();
    this.viewYear = this.currentDate.getFullYear();
    this.viewMonth = this.currentDate.getMonth();
    this.isOpen = false;
    this.currentView = "days";

    // Initialize with English names - will be translated on onTranslate
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May (full)",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    this.monthsShort = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May (short)",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    this.weekdays_full = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    this.init();
  }

  // Method to update translations when language changes
  updateLocalization() {
    if (window.Asc && window.Asc.plugin && window.Asc.plugin.tr) {
      // Update months array with translations using English keys
      this.months = [
        tr("January"),
        tr("February"),
        tr("March"),
        tr("April"),
        tr("May (full)"),
        tr("June"),
        tr("July"),
        tr("August"),
        tr("September"),
        tr("October"),
        tr("November"),
        tr("December"),
      ];

      this.monthsShort = [
        tr("Jan"),
        tr("Feb"),
        tr("Mar"),
        tr("Apr"),
        tr("May (short)"),
        tr("Jun"),
        tr("Jul"),
        tr("Aug"),
        tr("Sep"),
        tr("Oct"),
        tr("Nov"),
        tr("Dec"),
      ];

      this.weekdays_full = [
        tr("Sunday"),
        tr("Monday"),
        tr("Tuesday"),
        tr("Wednesday"),
        tr("Thursday"),
        tr("Friday"),
        tr("Saturday"),
      ];

      // Update month view with translated names
      const monthElements = document.querySelectorAll(".calendar-month");
      monthElements.forEach((el, index) => {
        el.textContent = this.monthsShort[index];
      });

      // Update the calendar display if it's been rendered
      if (this.calendarTitle) {
        this.updateTitle();
      }
    }
  }

  init() {
    this.render();
    this.bindEvents();
    this.updateInput();
    this.setupIcon();
    this.applyThemeToIcon();
  }

  applyThemeToIcon() {
    const body = document.body;
    const mainContent = document.getElementById("mainContent");
    const form = document.getElementById("mainForm");

    let backgroundColor = window.getComputedStyle(body).backgroundColor;

    if (
      !backgroundColor ||
      backgroundColor === "rgba(0, 0, 0, 0)" ||
      backgroundColor === "transparent"
    ) {
      if (mainContent) {
        backgroundColor = window.getComputedStyle(mainContent).backgroundColor;
      }
      if (
        (!backgroundColor ||
          backgroundColor === "rgba(0, 0, 0, 0)" ||
          backgroundColor === "transparent") &&
        form
      ) {
        backgroundColor = window.getComputedStyle(form).backgroundColor;
      }
    }

    let isDark = false;

    if (backgroundColor && backgroundColor.includes("rgb")) {
      const rgb = backgroundColor.match(/\d+/g);
      if (rgb && rgb.length >= 3) {
        const r = parseInt(rgb[0]);
        const g = parseInt(rgb[1]);
        const b = parseInt(rgb[2]);

        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        isDark = luminance < 0.5;
      }
    }

    if (isDark) {
      this.calendarIcon.classList.add("dark-theme");
      this.calendarIcon.classList.remove("light-theme");
    } else {
      this.calendarIcon.classList.add("light-theme");
      this.calendarIcon.classList.remove("dark-theme");
    }
  }

  async setupIcon() {
    try {
      // Try multiple path resolution strategies
      const paths = [
        // Relative to plugin root
        "./resources/button/calendar.png",
        "resources/button/calendar.png",
        // Absolute from plugin base
        `${window.location.origin}${window.location.pathname
          .split("/")
          .slice(0, -1)
          .join("/")}/resources/button/calendar.png`,
      ];

      let success = false;
      for (const imagePath of paths) {
        success = await testBackgroundImage(this.calendarIcon, imagePath);
        if (success) {
          console.log("Icon loaded from:", imagePath);
          // Set the background image explicitly
          this.calendarIcon.style.backgroundImage = `url('${imagePath}')`;
          break;
        }
      }

      if (!success) {
        console.warn("Failed to load calendar icon from all paths");
        // Fallback: use a unicode calendar symbol
        this.calendarIcon.textContent = "📅";
        this.calendarIcon.style.backgroundImage = "none";
      }
    } catch (error) {
      console.error("Error setting up icon:", error);
      this.calendarIcon.textContent = "📅";
    }
  }

  bindEvents() {
    this.input.addEventListener("click", () => this.toggle());
    this.calendarIcon.addEventListener("click", () => this.toggle());

    this.prevBtn.addEventListener("click", () => this.handleNavPrev());
    this.nextBtn.addEventListener("click", () => this.handleNavNext());

    this.calendarTitle.addEventListener("click", () => this.handleTitleClick());

    document.querySelectorAll(".calendar-month").forEach((monthEl) => {
      monthEl.addEventListener("click", () => {
        this.viewMonth = parseInt(monthEl.dataset.month);
        this.showDayView();
      });
    });

    document.addEventListener("click", (e) => {
      if (!this.input.parentNode.contains(e.target)) {
        this.hide();
      }
    });

    this.calendar.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  handleNavPrev() {
    if (this.currentView === "days") {
      this.previousMonth();
    } else if (this.currentView === "months") {
      this.viewYear--;
      this.updateTitle();
    } else if (this.currentView === "years") {
      this.viewYear -= 12;
      this.showYearView();
    }
  }

  handleNavNext() {
    if (this.currentView === "days") {
      this.nextMonth();
    } else if (this.currentView === "months") {
      this.viewYear++;
      this.updateTitle();
    } else if (this.currentView === "years") {
      this.viewYear += 12;
      this.showYearView();
    }
  }

  handleTitleClick() {
    if (this.currentView === "days") {
      this.showMonthView();
    } else if (this.currentView === "months") {
      this.showYearView();
    } else {
      this.showDayView();
    }
  }

  toggle() {
    this.isOpen ? this.hide() : this.show();
  }

  show() {
    this.calendar.classList.add("show");
    this.calendarIcon.classList.add("active");
    this.isOpen = true;
    this.applyThemeToCalendar();
  }

  applyThemeToCalendar() {
    const body = document.body;
    const mainContent = document.getElementById("mainContent");
    const form = document.getElementById("mainForm");

    let backgroundColor = window.getComputedStyle(body).backgroundColor;

    if (
      !backgroundColor ||
      backgroundColor === "rgba(0, 0, 0, 0)" ||
      backgroundColor === "transparent"
    ) {
      if (mainContent) {
        backgroundColor = window.getComputedStyle(mainContent).backgroundColor;
      }
      if (
        (!backgroundColor ||
          backgroundColor === "rgba(0, 0, 0, 0)" ||
          backgroundColor === "transparent") &&
        form
      ) {
        backgroundColor = window.getComputedStyle(form).backgroundColor;
      }
    }

    let isDark = false;
    let r = 255,
      g = 255,
      b = 255;

    if (backgroundColor && backgroundColor.includes("rgb")) {
      const rgb = backgroundColor.match(/\d+/g);
      if (rgb && rgb.length >= 3) {
        r = parseInt(rgb[0]);
        g = parseInt(rgb[1]);
        b = parseInt(rgb[2]);

        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        isDark = luminance < 0.5;
      }
    }

    let calendarBgColor, calendarTextColor;

    if (isDark) {
      const darkerR = Math.max(0, r - 15);
      const darkerG = Math.max(0, g - 15);
      const darkerB = Math.max(0, b - 15);
      calendarBgColor = `rgb(${darkerR}, ${darkerG}, ${darkerB})`;
      calendarTextColor = "#ffffff";
    } else {
      const lighterR = Math.min(255, r + 15);
      const lighterG = Math.min(255, g + 15);
      const lighterB = Math.min(255, b + 15);
      calendarBgColor = `rgb(${lighterR}, ${lighterG}, ${lighterB})`;
      calendarTextColor = "#000000";
    }

    this.calendar.style.setProperty(
      "background-color",
      calendarBgColor,
      "important"
    );
    this.calendar.style.setProperty("color", calendarTextColor, "important");

    if (isDark) {
      this.calendarIcon.classList.add("dark-theme");
      this.calendarIcon.classList.remove("light-theme");
    } else {
      this.calendarIcon.classList.add("light-theme");
      this.calendarIcon.classList.remove("dark-theme");
    }

    const allElements = this.calendar.querySelectorAll("*");
    allElements.forEach((element) => {
      if (
        !element.matches(".calendar-day:nth-child(7n+1)") &&
        !element.matches(".calendar-day:nth-child(7n)")
      ) {
        element.style.setProperty("color", calendarTextColor, "important");
      }
    });

    const selectedElements = this.calendar.querySelectorAll(
      ".calendar-day.selected, .calendar-month.active, .calendar-year.active"
    );
    selectedElements.forEach((element) => {
      if (isDark) {
        element.style.setProperty("background-color", "#9ca3af", "important");
        element.style.setProperty("color", "#ffffff", "important");
      } else {
        element.style.setProperty("background-color", "#d1d5db", "important");
        element.style.setProperty("color", "#000000", "important");
      }
    });
  }

  hide() {
    this.calendar.classList.remove("show");
    this.calendarIcon.classList.remove("active");
    this.isOpen = false;
    this.showDayView();
  }

  showMonthView() {
    this.currentView = "months";
    this.monthView.style.display = "grid";
    this.yearView.style.display = "none";
    this.calendarDays.style.display = "none";
    this.weekdays.style.display = "none";

    document.querySelectorAll(".calendar-month").forEach((el) => {
      el.classList.remove("active");
      if (parseInt(el.dataset.month) === this.viewMonth) {
        el.classList.add("active");
      }
    });

    this.updateTitle();
  }

  showYearView() {
    this.currentView = "years";
    this.monthView.style.display = "none";
    this.yearView.style.display = "grid";
    this.calendarDays.style.display = "none";
    this.weekdays.style.display = "none";

    this.generateYears();
    this.updateTitle();
  }

  showDayView() {
    this.currentView = "days";
    this.monthView.style.display = "none";
    this.yearView.style.display = "none";
    this.calendarDays.style.display = "grid";
    this.weekdays.style.display = "grid";

    this.render();
  }

  generateYears() {
    this.yearView.innerHTML = "";
    const currentYear = this.viewYear;
    const startYear = currentYear - 6;

    for (let year = startYear; year < startYear + 12; year++) {
      const yearEl = document.createElement("div");
      yearEl.className = "calendar-year";
      yearEl.textContent = year;
      yearEl.dataset.year = year;
      if (year === currentYear) yearEl.classList.add("active");

      yearEl.addEventListener("click", () => {
        this.viewYear = year;
        this.showMonthView();
      });
      this.yearView.appendChild(yearEl);
    }
  }

  previousMonth() {
    this.viewMonth--;
    if (this.viewMonth < 0) {
      this.viewMonth = 11;
      this.viewYear--;
    }
    this.render();
  }

  nextMonth() {
    this.viewMonth++;
    if (this.viewMonth > 11) {
      this.viewMonth = 0;
      this.viewYear++;
    }
    this.render();
  }

  render() {
    this.updateTitle();
    this.calendarDays.innerHTML = "";

    const firstDay = new Date(this.viewYear, this.viewMonth, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    // 42 days = 6 rows × 7 days (standard calendar grid to show complete weeks)
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const dayEl = document.createElement("div");
      dayEl.classList.add("calendar-day");
      dayEl.textContent = date.getDate();

      if (date.getMonth() !== this.viewMonth) {
        dayEl.classList.add("other-month");
      }

      if (this.isSameDay(date, this.currentDate)) {
        dayEl.classList.add("today");
      }

      if (this.isSameDay(date, this.selectedDate)) {
        dayEl.classList.add("selected");
      }

      dayEl.addEventListener("click", () => {
        this.selectDate(date);
      });

      this.calendarDays.appendChild(dayEl);
    }
  }

  updateTitle() {
    if (this.currentView === "days") {
      this.calendarTitle.textContent = `${this.months[this.viewMonth]} ${
        this.viewYear
      }`;
    } else if (this.currentView === "months") {
      this.calendarTitle.textContent = this.viewYear;
    } else {
      const startYear = this.viewYear - 6;
      this.calendarTitle.textContent = `${startYear}-${startYear + 11}`;
    }
  }

  selectDate(date) {
    this.selectedDate = new Date(date);
    this.updateInput();
    this.render();
    this.hide();
    this.input.dispatchEvent(new Event("datechange"));

    // Use requestAnimationFrame to apply styles after render
    requestAnimationFrame(() => {
      this.applyGreyToSelected();
    });
  }

  applyGreyToSelected() {
    const calendarBg = window.getComputedStyle(this.calendar).backgroundColor;
    const isDark = this.isBackgroundDark(calendarBg);

    const selectedElements = this.calendar.querySelectorAll(
      ".calendar-day.selected, .calendar-month.active, .calendar-year.active"
    );
    selectedElements.forEach((element) => {
      if (isDark) {
        element.style.setProperty("background-color", "#9ca3af", "important");
        element.style.setProperty("color", "#ffffff", "important");
      } else {
        element.style.setProperty("background-color", "#d1d5db", "important");
        element.style.setProperty("color", "#000000", "important");
      }
    });
  }

  isBackgroundDark(backgroundColor) {
    if (backgroundColor && backgroundColor.includes("rgb")) {
      const rgb = backgroundColor.match(/\d+/g);
      if (rgb && rgb.length >= 3) {
        const r = parseInt(rgb[0]);
        const g = parseInt(rgb[1]);
        const b = parseInt(rgb[2]);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
      }
    }
    return false;
  }

  updateInput() {
    const formatSelect = document.getElementById("dateFormat");
    this.input.value = this.formatDate(this.selectedDate, formatSelect.value);
  }

  getDate() {
    return this.selectedDate;
  }

  setDate(date) {
    this.selectedDate = new Date(date);
    this.viewYear = date.getFullYear();
    this.viewMonth = date.getMonth();
    this.updateInput();
    this.render();
  }

  isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  formatDate(date, format) {
    const day = date.getDate();
    const dayPadded = String(day).padStart(2, "0");
    const month = date.getMonth() + 1;
    const monthPadded = String(month).padStart(2, "0");
    const year = date.getFullYear();
    const yearShort = String(year).slice(-2);

    const weekday = this.weekdays_full[date.getDay()];
    const monthFull = this.months[month - 1];
    const monthShort = this.monthsShort[month - 1];

    switch (format) {
      case "MM/DD/YYYY":
        return `${monthPadded}/${dayPadded}/${year}`;
      case "dddd, MMMM D, YYYY":
        return `${weekday}, ${monthFull} ${day}, ${year}`;
      case "MMMM D, YYYY":
        return `${monthFull} ${day}, ${year}`;
      case "M/D/YY":
        return `${month}/${day}/${yearShort}`;
      case "YYYY-MM-DD":
        return `${year}-${monthPadded}-${dayPadded}`;
      case "D-MMM-YY":
        return `${dayPadded}-${monthShort}-${yearShort}`;
      case "M.D.YYYY":
        return `${month}.${day}.${year}`;
      default:
        return `${monthPadded}/${dayPadded}/${year}`;
    }
  }
}

// Global calendar instance
let globalCalendar = null;

// Background image detection utility
function testBackgroundImage(element, url) {
  return new Promise((resolve) => {
    const testImg = new Image();
    testImg.onload = () => {
      element.classList.add("has-bg-image");
      resolve(true);
    };
    testImg.onerror = () => {
      element.classList.remove("has-bg-image");
      resolve(false);
    };
    testImg.src = url;
  });
}

// Initialize plugin
window.Asc = window.Asc || {};
window.Asc.plugin = window.Asc.plugin || {};
window.Asc.scope = window.Asc.scope || {};

window.Asc.plugin.init = function () {
  if (this.executeMethod) window.pluginAPI = this;

  showLoadingScreen(tr("Initializing plugin..."));

  // Use requestAnimationFrame to ensure loading screen renders before heavy work
  requestAnimationFrame(() => {
    initializeDatePicker();

    // Hide loading screen after datepicker renders
    requestAnimationFrame(() => {
      hideLoadingScreen();
    });
  });
};

window.Asc.plugin.onTranslate = function () {
  // Update instruction text
  const instructionText = document.getElementById("instructionText");
  if (instructionText) {
    instructionText.innerHTML = tr(
      "Select the <strong>date and format</strong>, then click the <strong>Insert date</strong> button. The date will be displayed in the selected cell."
    );
  }

  // Update labels
  const selectDateLabel = document.getElementById("selectDateLabel");
  if (selectDateLabel) {
    selectDateLabel.innerHTML = tr("Select date");
  }

  const selectDateFormatLabel = document.getElementById(
    "selectDateFormatLabel"
  );
  if (selectDateFormatLabel) {
    selectDateFormatLabel.innerHTML = tr("Select date format");
  }

  // Update button text
  const insertDateBtn = document.getElementById("insertDate");
  if (insertDateBtn) {
    insertDateBtn.innerHTML = tr("Insert date");
  }

  // Update loading texts
  const pleaseDoNotClose = document.getElementById("pleaseDoNotClose");
  if (pleaseDoNotClose) {
    pleaseDoNotClose.innerHTML = tr(
      "Please <strong>do not close</strong> the plugin panel."
    );
  }

  const loadingText = document.getElementById("loadingText");
  if (loadingText) {
    loadingText.innerHTML = tr("Loading...");
  }

  // Update input placeholder
  const dateInput = document.getElementById("dateInput");
  if (dateInput) {
    dateInput.placeholder = tr("Select a date");
  }

  // Update weekday abbreviations in calendar
  const weekdayElements = document.querySelectorAll("[data-day]");
  const weekdayKeys = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  weekdayElements.forEach((el, index) => {
    if (weekdayKeys[index]) {
      const translated = tr(weekdayKeys[index]);
      const abbreviation = getWeekdayAbbreviation(translated, index);
      el.textContent = abbreviation;
    }
  });

  // Update calendar instance if it exists
  if (globalCalendar) {
    globalCalendar.updateLocalization();
    globalCalendar.render();
  }
};

function showLoadingScreen(message = "Loading...") {
  const loadingOverlay = document.getElementById("loadingOverlay");
  const loadingText = document.getElementById("loadingText");
  if (loadingOverlay && loadingText) {
    loadingText.textContent = tr(message);
    loadingOverlay.style.display = "flex";
    document.getElementById("mainContent").classList.add("loading");
  }
}

function hideLoadingScreen() {
  const loadingOverlay = document.getElementById("loadingOverlay");
  if (loadingOverlay) {
    loadingOverlay.style.display = "none";
    document.getElementById("mainContent").classList.remove("loading");
  }
}

// FIXED: Using Asc.scope instead of eval for security and maintainability
function insertDateValue(formattedDate, selectedDate, selectedFormat) {
  if (!window.pluginAPI) {
    console.error("Plugin API not available");
    throw new Error("Plugin API not available");
  }

  try {
    // Convert JavaScript Date to Excel serial number
    // Excel dates are days since December 30, 1899
    const excelEpoch = new Date(1899, 11, 30);
    const excelSerialNumber = Math.floor(
      (selectedDate - excelEpoch) / (24 * 60 * 60 * 1000)
    );

    // Store the date value and format in Asc.scope
    window.Asc.scope.dateValue = excelSerialNumber;
    window.Asc.scope.formatCode = getExcelFormatCode(selectedFormat);

    // Use Asc.scope - insert as actual date number
    window.pluginAPI.callCommand(function () {
      try {
        // Access the date from Asc.scope
        var dateValue = Asc.scope.dateValue;
        var formatCode = Asc.scope.formatCode;
        var oWorksheet = Api.GetActiveSheet();

        if (!oWorksheet) {
          return false;
        }

        var oSelection = oWorksheet.GetSelection();
        if (!oSelection) {
          var oActiveCell = oWorksheet.GetActiveCell();
          if (oActiveCell) {
            oActiveCell.SetValue(dateValue);
            oActiveCell.SetNumberFormat(formatCode);
            return true;
          }
          return false;
        }

        try {
          oSelection.Clear();
          oSelection.SetValue(dateValue);
          oSelection.SetNumberFormat(formatCode);
          return true;
        } catch (directError) {
          try {
            var oRange = oSelection;
            if (oRange.GetRowsCount && oRange.GetColsCount) {
              var rowCount = oRange.GetRowsCount();
              var colCount = oRange.GetColsCount();

              for (var row = 0; row < rowCount; row++) {
                for (var col = 0; col < colCount; col++) {
                  var oCell = oRange.GetRows(row).GetCells(col);
                  if (oCell) {
                    oCell.SetValue(dateValue);
                    oCell.SetNumberFormat(formatCode);
                  }
                }
              }
              return true;
            } else {
              oSelection.SetValue(dateValue);
              oSelection.SetNumberFormat(formatCode);
              return true;
            }
          } catch (cellError) {
            var oActiveCell = oWorksheet.GetActiveCell();
            if (oActiveCell) {
              oActiveCell.SetValue(dateValue);
              oActiveCell.SetNumberFormat(formatCode);
              return true;
            }
            return false;
          }
        }
      } catch (e) {
        return false;
      }
    });

    // Clean up the scope after use
    delete window.Asc.scope.dateValue;
    delete window.Asc.scope.formatCode;

    return true;
  } catch (e) {
    console.error("Error in insertDateValue:", e);
    // Clean up on error too
    delete window.Asc.scope.dateValue;
    delete window.Asc.scope.formatCode;
    throw e;
  }
}

// Helper function to convert our format strings to Excel number format codes
function getExcelFormatCode(format) {
  switch (format) {
    case "MM/DD/YYYY":
      return "mm/dd/yyyy";
    case "dddd, MMMM D, YYYY":
      return "dddd, mmmm dd, yyyy";
    case "MMMM D, YYYY":
      return "mmmm dd, yyyy";
    case "M/D/YY":
      return "mm/dd/yy";
    case "YYYY-MM-DD":
      return "yyyy-mm-dd";
    case "D-MMM-YY":
      return "dd-mmm-yy";
    case "M.D.YYYY":
      return "mm.dd.yyyy";
    default:
      return "mm/dd/yyyy";
  }
}

function validateAndGetFormat(formatSelect) {
  const format = formatSelect.value;
  const validFormats = [
    "MM/DD/YYYY",
    "dddd, MMMM D, YYYY",
    "MMMM D, YYYY",
    "M/D/YY",
    "YYYY-MM-DD",
    "D-MMM-YY",
    "M.D.YYYY",
  ];

  if (validFormats.includes(format)) {
    return format;
  } else {
    console.warn("Invalid format detected, falling back to default");
    formatSelect.value = "MM/DD/YYYY";
    return "MM/DD/YYYY";
  }
}

function initializeDatePicker() {
  const input = document.getElementById("dateInput");
  const formatSelect = document.getElementById("dateFormat");
  const insertBtn = document.getElementById("insertDate");

  if (!input || !formatSelect || !insertBtn) return;

  input.setAttribute("data-initialized", "true");
  const calendar = new CustomCalendar(input);

  // Store global reference for translation updates
  globalCalendar = calendar;

  function updateFormatOptions(selectedDate) {
    const formats = [
      "MM/DD/YYYY",
      "dddd, MMMM D, YYYY",
      "MMMM D, YYYY",
      "M/D/YY",
      "YYYY-MM-DD",
      "D-MMM-YY",
      "M.D.YYYY",
    ];
    const currentValue = formatSelect.value;
    formatSelect.innerHTML = "";
    formats.forEach((format) => {
      const option = document.createElement("option");
      option.value = format;
      option.textContent = calendar.formatDate(selectedDate, format);
      formatSelect.appendChild(option);
    });
    formatSelect.value = currentValue;
  }

  updateFormatOptions(new Date());

  formatSelect.addEventListener("change", () => {
    calendar.updateInput();
  });

  input.addEventListener("datechange", () =>
    updateFormatOptions(calendar.getDate())
  );

  insertBtn.addEventListener("click", () => {
    const selectedDate = calendar.getDate();
    if (!selectedDate) {
      return;
    }

    // Disable controls
    insertBtn.disabled = true;
    formatSelect.disabled = true;

    const currentFormat = validateAndGetFormat(formatSelect);
    const mainContent = document.getElementById("mainContent");
    if (mainContent) {
      mainContent.classList.add("loading");
    }

    showLoadingScreen(tr("Inserting date..."));

    // Use requestAnimationFrame to ensure loading screen is visible
    requestAnimationFrame(() => {
      try {
        const formattedDate = calendar.formatDate(selectedDate, currentFormat);

        // Insert the date (synchronous operation)
        insertDateValue(formattedDate, selectedDate, currentFormat);

        // Success! Reset to today's date
        const todaysDate = new Date();
        formatSelect.selectedIndex = 0;
        updateFormatOptions(todaysDate);
        calendar.setDate(todaysDate);
      } catch (error) {
        console.error("Failed to insert date:", error);
        alert(tr("Failed to insert date. Please try again."));
      } finally {
        // Re-enable controls and hide loading after a brief delay for visual feedback
        requestAnimationFrame(() => {
          insertBtn.disabled = false;
          formatSelect.disabled = false;
          hideLoadingScreen();

          if (mainContent) {
            mainContent.classList.remove("loading");
          }
        });
      }
    });
  });

  // Initial translation update if translations are already available
  if (window.Asc.plugin.tr) {
    window.Asc.plugin.onTranslate();
  }
}
