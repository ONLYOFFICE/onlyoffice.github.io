(function(window) {

  let hoverTimeout;

  /**
   * Creates a single history item element.
   * @param {string} code The Typst code for the item.
   * @param {Function} onClick The callback to run when the item is clicked.
   * @returns {HTMLElement} The created item element.
   */
  function _createHistoryItem(code, onClick) {
    const item = document.createElement('div');
    const tooltip = document.getElementById('preview-tooltip');
    
    // Use content inside $$ as display text
    const match = code.match(/\$(.*?)\$/s);
    let displayText = match && match[1] ? match[1].trim().replace(/\s+/g, ' ') : code.split('\n')[0];
    item.textContent = displayText.slice(0, 80) + (displayText.length > 80 ? '...' : '');
    item.title = code; // Full code in native tooltip

    item.addEventListener('click', () => onClick(code, item.textContent));

    // Hover-to-preview logic
    item.addEventListener('mouseenter', (event) => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(async () => {
        try {
          tooltip.innerHTML = 'Loading...';
          tooltip.style.display = 'block';
          
          const svg = await window.$typst.svg({ mainContent: code });
          tooltip.innerHTML = svg;

          const rect = item.getBoundingClientRect();
          let left = rect.right + 10;
          let top = rect.top;
          if (left + tooltip.offsetWidth > window.innerWidth) {
              left = rect.left - tooltip.offsetWidth - 10;
          }
          if (top + tooltip.offsetHeight > window.innerHeight) {
              top = window.innerHeight - tooltip.offsetHeight;
          }
          tooltip.style.left = `${left}px`;
          tooltip.style.top = `${top}px`;

        } catch (e) {
          tooltip.style.display = 'none';
        }
      }, 500);
    });

    item.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
      tooltip.style.display = 'none';
    });

    return item;
  }

  /**
   * Initializes a custom history dropdown.
   * @param {object} options
   * @param {HTMLElement} options.container The container to append the dropdown to.
   * @param {HTMLTextAreaElement} options.input The textarea to update on selection.
   * @param {Function} options.onSelect Callback to run when an item is selected.
   */
  function initialize(options) {
    const { container, input, onSelect } = options;
    const history = window.TypstHistory.load();
    if (history.length === 0) {
      return;
    }

    container.innerHTML = ''; // Clear container

    const label = document.createElement('label');
    label.textContent = 'History:';
    label.style.display = 'block';
    label.style.marginBottom = '8px';
    label.style.fontWeight = 'bold';
    container.appendChild(label);

    const dropdownHeader = document.createElement('div');
    dropdownHeader.className = 'custom-dropdown-header';
    dropdownHeader.textContent = 'Select a formula from history...';
    container.appendChild(dropdownHeader);

    const dropdownList = document.createElement('div');
    dropdownList.className = 'custom-dropdown-list';
    container.appendChild(dropdownList);

    dropdownHeader.onclick = () => {
      dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block';
    };

    history.forEach(code => {
      const item = _createHistoryItem(code, (selectedCode, displayText) => {
        input.value = selectedCode;
        dropdownHeader.textContent = displayText;
        dropdownList.style.display = 'none';
        onSelect();
      });
      dropdownList.appendChild(item);
    });

    // Close dropdown if clicking outside
    window.addEventListener('click', (event) => {
      if (!container.contains(event.target)) {
        dropdownList.style.display = 'none';
      }
    });
  }

  window.TypstUI = {
    initialize: initialize
  };

})(window);
