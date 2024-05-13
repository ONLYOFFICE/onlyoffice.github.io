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
(function (window, undefined) {

  // Initialize global variables
  let selectedInput;
  // Get the HTML elements
  const activateQRlabel = document.getElementById('activateQRlabel');
  const activateBGlabel = document.getElementById('activateBGlabel');
  const submitButton = document.getElementById('submitButton');
  const qrWidth = document.getElementById('widthLabel');
  const qrHeight = document.getElementById('heightLabel');
  const qrWidthField = document.getElementById('qrWidth');
  const qrHeightField = document.getElementById('qrHeight');
  const qrColorElement = document.getElementById('qrColor')
  const bgColorElement = document.getElementById('bgColor');
  const errSpan = document.getElementById('error-msg');
  let spanMssgMinErr = "";
  let spanMssgMaxErr = "";
  let spanMssgSameClr = "";
  // Define a global variable to store QR parameters
  let storedSettings = {};

  // Call the handleResize function initially to set the initial state
  handleResize();

  window.Asc.plugin.init = function () { };

  // Translation function for plugin
  window.Asc.plugin.onTranslate = function () {
    submitButton.innerText = window.Asc.plugin.tr('Insert QR');
    activateQRlabel.innerText = window.Asc.plugin.tr('Set QR Color');
    activateBGlabel.innerText = window.Asc.plugin.tr('Set Background Color');
    qrWidth.innerText = window.Asc.plugin.tr('Width');
    qrHeight.innerText = window.Asc.plugin.tr('Height');
    spanMssgMinErr = window.Asc.plugin.tr('Minimum QR size is 50px');
    spanMssgMaxErr = window.Asc.plugin.tr('Maximum QR size is 2000px');
    spanMssgSameClr = window.Asc.plugin.tr('The colors must be different');
  };

  // Function to send message to plugin
  function sendPluginMessage(message) {
    window.Asc.plugin.sendToPlugin("onWindowMessage", message);
  }

  // Function to initialize color picker
  function initializeColorPicker() {
    // Initialize colorpicker and store the instance
    const colorpicker = $('#qrColorContainer').colorpicker({
      popover: false,
      inline: true,
      container: '#qrColorContainer',
      format: 'hex'
    });

    // Attach the 'changeColor' event handler during color picker initialization
    colorpicker.on('colorpickerChange', function (e) {
      if (selectedInput === 'qrColor' || selectedInput === 'bgColor') {
        // Check if e.color is an object, if so, extract the color value
        const colorValue = typeof e.color === 'object' ? e.color.toString() : e.color;
        $('#' + selectedInput).val(colorValue);
        // Reset border color
        if (selectedInput === 'qrColor') {
          qrColorElement.style.borderColor = null;
        } else if (selectedInput === 'bgColor') {
          bgColorElement.style.borderColor = null;
        }
      }
    });

    return colorpicker;
  }


  // Initialize color picker
  let colorpicker = initializeColorPicker();
  colorpicker.colorpicker('disable') // Disable the colorpicker to prevent unexpected behavior



  // Retrieve values from localStorage and set default values
  try {
    const storedSettingsJSON = localStorage.getItem("InsertQR_settings");
    if (storedSettingsJSON) {
      storedSettings = JSON.parse(storedSettingsJSON);
    }
  } catch (error) {
    // Handle parsing error, set default settings
    storedSettings = {
      qrWidth: '150',
      qrHeight: '150',
      qrColor: '#000000',
      bgColor: '#ffffff'
    };
  }
  $('#qrWidth').val(storedSettings.qrWidth || '150');
  $('#qrHeight').val(storedSettings.qrHeight || '150');
  $('#qrColor').val(storedSettings.qrColor || '#000000');
  $('#bgColor').val(storedSettings.bgColor || '#ffffff');

  // Set the activeColorInput based on stored values or defaults
  selectedInput = storedSettings.qrColor ? 'qrColor' : (storedSettings.bgColor ? 'bgColor' : '');

  // Set the initial color picker values
  colorpicker.colorpicker('setValue', storedSettings.qrColor || $('#qrColor').val());

  // Add event listener for window resize event
  window.addEventListener('resize', handleResize);

  // Event listener to prevent form submission on Enter key press in  the QR width field
  qrWidthField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  });

  // Event listener to prevent form submission on Enter key press in the QR height field
  qrHeightField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  });


  // Event listener for form submission
  document.getElementById('SubmitForm').addEventListener('submit', function (event) {
    // Get the values from the form elements
    const qrWidthValue = qrWidthField.value;
    const qrHeightValue = qrHeightField.value;
    const qrColor = qrColorElement.value;
    const bgColor = bgColorElement.value;

    // Validate the input fields and prevent form submission if the input is incorrect
    switch (true) {
      case qrColor === '#aN' && bgColor === '#aN':
        event.preventDefault();
        qrColorElement.style.borderColor = 'red';
        bgColorElement.style.borderColor = 'red';
        return;// Exit the function to prevent further execution

      case qrColor === '#aN':
        event.preventDefault();
        qrColorElement.style.borderColor = 'red';
        return; // Exit the function to prevent further execution

      case qrColor.length < 7:
        event.preventDefault();
        qrColorElement.style.borderColor = 'red';
        return; // Exit the function to prevent further execution

      case bgColor === '#aN':
        event.preventDefault();
        bgColorElement.style.borderColor = 'red';
        return; // Exit the function to prevent further execution

      case bgColor.length < 7:
        event.preventDefault();
        bgColorElement.style.borderColor = 'red';
        return; // Exit the function to prevent further execution

      case qrColor === bgColor:
        event.preventDefault();
        qrColorElement.style.borderColor = 'red';
        bgColorElement.style.borderColor = 'red';
        errSpan.innerText = spanMssgSameClr;
        return;

      case parseInt(qrWidthValue, 10) < 50:
        event.preventDefault();
        errSpan.innerText = spanMssgMinErr;
        return; // Exit the function to prevent further execution

      case parseInt(qrHeightValue, 10) < 50:
        event.preventDefault();
        errSpan.innerText = spanMssgMinErr;
        return; // Exit the function to prevent further execution

      case parseInt(qrWidthValue, 10) > 2000:
        event.preventDefault();
        errSpan.innerText = spanMssgMaxErr;
        return; // Exit the function to prevent further execution

      case parseInt(qrHeightValue, 10) > 2000:
        event.preventDefault();
        errSpan.innerText = spanMssgMaxErr;
        return; // Exit the function to prevent further execution

      case qrWidthValue === "":
        event.preventDefault();
        errSpan.innerText = spanMssgMinErr;
        return; // Exit the function to prevent further execution

      case qrHeightValue === "":
        event.preventDefault();
        errSpan.innerText = spanMssgMinErr;
        return; // Exit the function to prevent further execution

      default:
        break;
    }

    // Save values to localStorage
    let settings = {
      qrWidth: qrWidthValue,
      qrHeight: qrHeightValue,
      qrColor: qrColor,
      bgColor: bgColor
    };
    localStorage.setItem('InsertQR_settings', JSON.stringify(settings));

    // Create message object
    const message = {
      qrWidth: qrWidthValue || '150',
      qrHeight: qrHeightValue || '150',
      qrColor: qrColor || '#000000',
      bgColor: bgColor || '#ffffff'
    };

    // Send message to plugin
    sendPluginMessage(message);

    event.preventDefault(); // Prevent the default form submission behavior
  });
  // Event listener for changing QR color activation
  $('#activateQR').change(function () {
    $('#bgColor').prop('disabled', true);
    $('#qrColor').prop('disabled', false);
    colorpicker.colorpicker('enable')
    selectedInput = 'qrColor';
    // Reinitialize color picker
    colorpicker = initializeColorPicker();
    // Set the initial color based on the current input field value
    colorpicker.colorpicker('setValue', $('#qrColor').val());
  });

  // Event listener for changing background color activation
  $('#activateBG').change(function () {
    $('#qrColor').prop('disabled', true);
    $('#bgColor').prop('disabled', false);
    colorpicker.colorpicker('enable')
    selectedInput = 'bgColor';
    // Reinitialize color picker
    colorpicker = initializeColorPicker();
    // Set the initial color based on the current input field value
    colorpicker.colorpicker('setValue', $('#bgColor').val());
  });

  let validationTimeout; // Declare a variable to hold the timeout ID

  // Function to validate input after a delay
  function delayedValidation() {
    clearTimeout(validationTimeout); // Clear any existing timeout
    validationTimeout = setTimeout(() => {
      // Validate input 
      const inputValue = $(this).val();
      if (inputValue.length === 7 && /^#[0-9A-Fa-f]{6}$/.test(inputValue)) {
        // If the input value has reached 7 characters and is a valid hexadecimal color code
        if (selectedInput === 'qrColor') {
          colorpicker.colorpicker('setValue', inputValue);
        } else if (selectedInput === 'bgColor') {
          colorpicker.colorpicker('setValue', $('#bgColor').val());
        }
      } else if (inputValue.length > 7) {
        // If the input value exceeds 7 characters, truncate it
        $(this).val(inputValue.substring(0, 7));
      }

    }, 100); // Set timeout to 100ms
  }

  // Event listener for input change on color inputs
  $('#qrColor, #bgColor').on('input', function (event) {
    // Always prepend '#' if missing
    var inputValue = $(this).val();
    if (!inputValue.startsWith('#')) {
      inputValue = '#' + inputValue;
    }
    $(this).val(inputValue); // Update input value

    // Attach event listener for input events
    $(this).on('input', delayedValidation);
  });

  $('#qrColorContainer').on('mouseleave', function () {
    // Your code to trigger when the mouse leaves $('#qrColorContainer') goes here
    // For example:
    console.log("Mouse left the #qrColorContainer");
    colorpicker.colorpicker('disable')
    // Or you can call a specific function:
    // yourFunction();
  });

  // Enable the colorpicker when the #qrColorContainer' is clciked
  $('#qrColorContainer').on('click', function () {
    colorpicker.colorpicker('enable')
  });

  // Enable the colorpicker when the '#qrColor, #bgColor' are clciked
  $('#qrColor, #bgColor').on('click', function () {
    colorpicker.colorpicker('enable')

  });


  // Function to handle window resize event
  function handleResize() {
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    // Check if body height exceeds window height
    if (bodyHeight > windowHeight) {
      document.body.style.overflowY = 'scroll'; // Add vertical scroll
    } else {
      document.body.style.overflowY = 'auto'; // Remove vertical scroll
    }
  }


})(window, undefined);