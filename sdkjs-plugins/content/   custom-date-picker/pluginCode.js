(function() {
    const monthNames = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];

    let currentDate = new Date();
    let viewYear = currentDate.getFullYear();
    let viewMonth = currentDate.getMonth();
    let selectedDate = null;

    function renderCalendar() {
        const firstDay = new Date(viewYear, viewMonth, 1);
        const lastDay = new Date(viewYear, viewMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        let startDay = firstDay.getDay() - 1;
        if (startDay < 0) startDay = 6;

        document.getElementById('monthYear').textContent = 
            monthNames[viewMonth] + ' ' + viewYear + ' г.';

        const grid = document.getElementById('daysGrid');
        grid.innerHTML = '';

        const today = new Date();

        const prevMonthLastDay = new Date(viewYear, viewMonth, 0).getDate();
        for (let i = startDay - 1; i >= 0; i--) {
            const day = prevMonthLastDay - i;
            const el = document.createElement('div');
            el.className = 'day other-month';
            el.textContent = day;
            grid.appendChild(el);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const el = document.createElement('div');
            el.className = 'day';
            el.textContent = d;

            const isToday = (d === today.getDate() && 
                           viewMonth === today.getMonth() && 
                           viewYear === today.getFullYear());
            if (isToday) el.classList.add('today');

            if (selectedDate && 
                d === selectedDate.getDate() && 
                viewMonth === selectedDate.getMonth() && 
                viewYear === selectedDate.getFullYear()) {
                el.classList.add('selected');
            }

            el.addEventListener('click', function() {
                selectedDate = new Date(viewYear, viewMonth, d);
                updateDateDisplay();
                renderCalendar();
            });

            el.addEventListener('dblclick', function() {
                selectedDate = new Date(viewYear, viewMonth, d);
                updateDateDisplay();
                
                if (window.Asc && window.Asc.plugin) {
                    window.Asc.plugin.executeMethod("SetValue", [formatDate(selectedDate)], function() {
                        window.Asc.plugin.executeCommand("close", "");
                    });
                } else {
                    alert('Дата: ' + formatDate(selectedDate));
                }
            });

            grid.appendChild(el);
        }

        const totalCells = startDay + daysInMonth;
        const remaining = (7 - (totalCells % 7)) % 7;
        for (let i = 1; i <= remaining; i++) {
            const el = document.createElement('div');
            el.className = 'day other-month';
            el.textContent = i;
            grid.appendChild(el);
        }
    }

    function updateDateDisplay() {
        if (selectedDate) {
            const d = String(selectedDate.getDate()).padStart(2, '0');
            const m = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const y = selectedDate.getFullYear();
            document.getElementById('dateDisplay').textContent = d + '.' + m + '.' + y;
        }
    }

    function formatDate(date) {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();
        return d + '.' + m + '.' + y;
    }

    document.getElementById('prevMonth').addEventListener('click', function() {
        viewMonth--;
        if (viewMonth < 0) { viewMonth = 11; viewYear--; }
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', function() {
        viewMonth++;
        if (viewMonth > 11) { viewMonth = 0; viewYear++; }
        renderCalendar();
    });

    document.getElementById('todayBtn').addEventListener('click', function() {
        selectedDate = new Date();
        viewYear = selectedDate.getFullYear();
        viewMonth = selectedDate.getMonth();
        updateDateDisplay();
        renderCalendar();
    });

    selectedDate = new Date();
    updateDateDisplay();
    renderCalendar();
})();
