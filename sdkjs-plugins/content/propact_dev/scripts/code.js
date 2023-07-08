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
	var displayNoneClass = "d-none";

    window.Asc.plugin.init = function(text)
    {

    	// Plugin Code - Start CM //
		// Invite counterparty screen
		const varBtnRedirectInviteCounterpartyForm = document.getElementById('btnRedirectInviteCounterpartyForm');
		varBtnRedirectInviteCounterpartyForm.addEventListener('click', function () {
			document.getElementById('divInviteCounterparty').classList.add(displayNoneClass);
			document.getElementById('divInviteCounterpartyForm').classList.remove(displayNoneClass);
		});
		// Invite counterparty screen

		// Invite counterparty Form screen
		const varBtnRedirectInviteCounterparty = document.getElementById('btnRedirectInviteCounterparty');
		varBtnRedirectInviteCounterparty.addEventListener('click', function () {
			document.getElementById('divInviteCounterparty').classList.remove(displayNoneClass);
			document.getElementById('divInviteCounterpartyForm').classList.add(displayNoneClass);
		});

		const varBtnRedirectInviteCounterpartyCancel = document.getElementById('btnRedirectInviteCounterpartyCancel');
		varBtnRedirectInviteCounterpartyCancel.addEventListener('click', function () {
			document.getElementById('divInviteCounterparty').classList.remove(displayNoneClass);
			document.getElementById('divInviteCounterpartyForm').classList.add(displayNoneClass);
		})

		const varBtnRedirectInviteCounterpartySubmit = document.getElementById('btnRedirectInviteCounterpartySubmit');
		varBtnRedirectInviteCounterpartySubmit.addEventListener('click', function () {
			document.getElementById('divInviteCounterpartyPending').classList.remove(displayNoneClass);
			document.getElementById('divInviteCounterpartyForm').classList.add(displayNoneClass);
		})
		// Invite counterparty Form screen

		// Invite counterparty Pending screen
		const varBtnResendVerification = document.getElementById('btnResendVerification');
		varBtnResendVerification.addEventListener('click', function() {
			document.getElementById('divInviteCounterpartyPending').classList.add(displayNoneClass);
			document.getElementById('divContractLists').classList.remove(displayNoneClass);
		});
		// Invite counterparty Pending screen

		// Contract clause lists screen
		const varBtnCreateClause = document.getElementById('btnCreateClause');
		varBtnCreateClause.addEventListener('click', function () {
			document.getElementById('divContractLists').classList.add(displayNoneClass);
			document.getElementById('divContractCreate').classList.remove(displayNoneClass);
		});

		const buttonsOpenChatBoard = document.querySelectorAll('.contract-item');
		// Add a click event listener to each button element
		buttonsOpenChatBoard.forEach(function(button) {
			button.addEventListener('click', function () {
				document.getElementById('divContractLists').classList.add(displayNoneClass);
				document.getElementById('divContractChatHistory').classList.remove(displayNoneClass);
			});
		});
		// Contract clause lists screen

		// Create contract clause screen
		const varBtnContractCreateClose = document.getElementById('btnContractCreateClose');
		varBtnContractCreateClose.addEventListener('click', function () {
			document.getElementById('divContractLists').classList.remove(displayNoneClass);
			document.getElementById('divContractCreate').classList.add(displayNoneClass);
		});

		const varBtnContractCreateCancel = document.getElementById('btnContractCreateCancel');
		varBtnContractCreateCancel.addEventListener('click', function () {
			document.getElementById('divContractLists').classList.remove(displayNoneClass);
			document.getElementById('divContractCreate').classList.add(displayNoneClass);
		});

		const varBtnRedirectClauseLists = document.getElementById('btnRedirectClauseLists');
		varBtnRedirectClauseLists.addEventListener('click', function () {
			document.getElementById('divContractCreate').classList.add(displayNoneClass);
			document.getElementById('divContractChatHistory').classList.remove(displayNoneClass);
		});
		// Create contract clause screen

		// Contract chat history screen
		const varBtnRedirectClauseListsA = document.getElementById('btnRedirectClauseListsA');
		varBtnRedirectClauseListsA.addEventListener('click', function () {
			document.getElementById('divContractLists').classList.remove(displayNoneClass);
			document.getElementById('divContractChatHistory').classList.add(displayNoneClass);
		});

		const varBtnGoToSameSideChat = document.getElementById('btnGoToSameSideChat');
		varBtnGoToSameSideChat.addEventListener('click', function () {
			document.getElementById('divContractSameSideChat').classList.remove(displayNoneClass);
			document.getElementById('divContractChatHistory').classList.add(displayNoneClass);
		});

		const varBtnGoToCounterparty = document.getElementById('btnGoToCounterparty');
		varBtnGoToCounterparty.addEventListener('click', function () {
			document.getElementById('divContractSameSideChat').classList.remove(displayNoneClass);
			document.getElementById('divContractChatHistory').classList.add(displayNoneClass);
		});
		// Contract chat history screen

		// Contract sameside chat screen
		const varBtnGoToCounterpartyA = document.getElementById('btnGoToCounterpartyA');
		varBtnGoToCounterpartyA.addEventListener('click', function () {
			document.getElementById('divContractSameSideChat').classList.remove(displayNoneClass);
			document.getElementById('divContractChatHistory').classList.add(displayNoneClass);
		});

		const varBtnRedirectClauseListsB = document.getElementById('btnRedirectClauseListsB');
		varBtnRedirectClauseListsB.addEventListener('click', function () {
			document.getElementById('divContractLists').classList.remove(displayNoneClass);
			document.getElementById('divContractSameSideChat').classList.add(displayNoneClass);
		});
		// Contract sameside chat screen
		// Plugin Code - End CM //

		// Plugin test code- Start CM //
		// var myCustomData = window.parent.CustomData['myCustomData'];
		// console.log('myCustomData', myCustomData);


		const btnMarkupMode = document.getElementById('btnMarkupMode');
		btnMarkupMode.addEventListener('click', function () {

			const dataToTransmit = { key: 'value' };
			console.log('dataToTransmit', dataToTransmit);
			this.eventEmitter.emit('onlyOfficeData', dataToTransmit);


			// Retrieve data from LocalStorage
			var myData = localStorage.getItem('applicationAccessToken');

			if (myData) {
				// Data exists in LocalStorage
				console.log('Data retrieved:', myData);
			} else {
				// Data doesn't exist in LocalStorage
				console.log('No data found');
			}
		})

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

		window.Asc.plugin.executeMethod("GetAllContentControls");

		window.Asc.plugin.onMethodReturn = function(returnValue) {
			//evend return for completed methods
			var _plugin = window.Asc.plugin;
			if (_plugin.info.methodName == "GetAllContentControls") {
				for (var i = 0; i < returnValue.length; i++) {
					// addLabel(returnValue[i], "#divP");
					console.log('returnValue[i]', returnValue[i]);
				}
			}
		}
		// Plugin test code- End CM //

	};

})(window, undefined);