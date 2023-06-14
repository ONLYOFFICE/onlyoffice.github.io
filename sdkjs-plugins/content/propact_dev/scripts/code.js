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
(function(window, undefined){
	var flagInit = false;
	var fBtnGetAll = false;
	var fClickLabel = false;
	var fClickBtnCur =  false;

    window.Asc.plugin.init = function(text)
    {
    	// View related javascript code - S
		/* Tabing click events - S */
		// Get all the button elements with the specified class
		const buttonsTabLinks = document.querySelectorAll('.tablinks');

		// Add a click event listener to each button element
		buttonsTabLinks.forEach(function(button) {
			button.addEventListener('click', function() {
				tabcontent = document.getElementsByClassName("tabcontent");
				for (i = 0; i < tabcontent.length; i++) {
					tabcontent[i].style.display = "none";
				}
				tablinks = document.getElementsByClassName("tablinks");
				for (i = 0; i < tablinks.length; i++) {
					tablinks[i].className = tablinks[i].className.replace(" active", "");
				}
				document.getElementById(button.getAttribute('data-attr-tab')).style.display = "block";
				button.className += " active";
			});
		});

		// Get the element with id="allClause" and click on it
		document.getElementById("allClause").click();
		/* Tabing click events - E */

		/* Button: OpenClause Event - S */
		// Get all the button elements with the specified class
		const buttonsOpenChatBoard = document.querySelectorAll('.open-chat-board');

		// Add a click event listener to each button element
		buttonsOpenChatBoard.forEach(function(button) {
			button.addEventListener('click', function () {
				document.getElementById('cluaseLists').classList.add('display-none');
				document.getElementById('openCluase').classList.remove('display-none');
			});
		});
		/* Button: OpenClause Event - E */

		/* Button: CloseEvent - S */
		// Get all the button elements with the specified class
		const buttonsClose = document.querySelectorAll('.btn-close');

		// Add a click event listener to each button element
		buttonsClose.forEach(function(button) {
			button.addEventListener('click', function () {
				document.getElementById('openCluase').classList.add('display-none');
				document.getElementById('createCluase').classList.add('display-none');
				document.getElementById('cluaseLists').classList.remove('display-none');
			});
		});
		/* Button: Close Event - E */

		/* Button: CreateThread - S */
		// Get all the button elements with the specified class
		const buttonsCreateThread = document.querySelectorAll('.btn-create-thread');

		// Add a click event listener to each button element
		buttonsCreateThread.forEach(function(button) {
			button.addEventListener('click', function () {
				document.getElementById('cluaseLists').classList.add('display-none');
				document.getElementById('createCluase').classList.remove('display-none');
			});
		});
		/* Button: CreateThread - E */

		$('#userDropdown').select2({
			placeholder: "Select users and teams",
			width: '100%',
			allowClear: true
		});
		// View related javascript code - E

		const formElem = document.getElementById("contractForm");
		formElem.addEventListener("submit", (e) => {
			// on form submission, prevent default
			e.preventDefault();

			const formData = new FormData(formElem);
			var contractSectionName = formData.get('contractsection');
			var contractDescription = formData.get('contractdescription');

			window.Asc.plugin.executeMethod ("AddContentControl", [2, {"Id" : Math.floor((Math.random() * 10000) + 1), "Description": contractDescription, "Tag" : text, "Lock" : 0, "Color" : { "R" : 0, "G" : 255, "B" : 0 }}]);
			formElem.reset();

		});

	};

})(window, undefined);