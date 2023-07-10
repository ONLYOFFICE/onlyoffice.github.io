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
	var authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEyYTNmODkzMWMyMTJkM2VkMDE3ZWEiLCJmaXJzdE5hbWUiOiJNaWxhbiIsImxhc3ROYW1lIjoiSGlycGFyYSIsImVtYWlsIjoibWlsYW4uZW5jb2RlZG90c0BnbWFpbC5jb20iLCJyZXF1ZXN0RnJvbSI6InVzZXIiLCJpYXQiOjE2ODg4MDM5NjgsImV4cCI6MTY5MTM5NTk2OH0.HQBqCPZAKuLn6_7tOhsPvT1iX29Qq7dfzrhahMvuXWo';
	var documentID = '64a390d5d3927f260bc633da';
	var apiBaseUrl = 'http://localhost:3000/api/v1/app';

	$(document).ready(function () {

		// Get contract details
		getOpenContractUserDetails();
		// Get contract details

		// Invite counterparty screen
		const varBtnRedirectInviteCounterpartyForm = document.getElementById('btnRedirectInviteCounterpartyForm');
		varBtnRedirectInviteCounterpartyForm.addEventListener('click', function () {
			document.getElementById('divInviteCounterparty').classList.add('d-none');
			document.getElementById('divInviteCounterpartyForm').classList.remove('d-none');
		});
		// Invite counterparty screen

		// Invite counterparty Form screen
		const varBtnRedirectInviteCounterparty = document.getElementById('btnRedirectInviteCounterparty');
		varBtnRedirectInviteCounterparty.addEventListener('click', function () {
			document.getElementById('divInviteCounterparty').classList.remove('d-none');
			document.getElementById('divInviteCounterpartyForm').classList.add('d-none');
		});

		const varBtnRedirectInviteCounterpartyCancel = document.getElementById('btnRedirectInviteCounterpartyCancel');
		varBtnRedirectInviteCounterpartyCancel.addEventListener('click', function () {
			document.getElementById('divInviteCounterparty').classList.remove('d-none');
			document.getElementById('divInviteCounterpartyForm').classList.add('d-none');
		});
		// Invite counterparty Form screen

		// Invite counterparty Pending screen
		const varBtnResendVerification = document.getElementById('btnResendVerification');
		varBtnResendVerification.addEventListener('click', function () {
			resendCounterpartyInvitation();
		});

		const varBtnCancelInvitation = document.getElementById('btnCancelInvitation');
		varBtnCancelInvitation.addEventListener('click', function () {
			cancelInvitation();
		});
		// Invite counterparty Pending screen

		// Contract clause lists screen
		const varBtnCreateClause = document.getElementById('btnCreateClause');
		varBtnCreateClause.addEventListener('click', function () {
			document.getElementById('divContractLists').classList.add('d-none');
			document.getElementById('divContractCreate').classList.remove('d-none');
		});

		const buttonsOpenChatBoard = document.querySelectorAll('.contract-item');
		// Add a click event listener to each button element
		buttonsOpenChatBoard.forEach(function (button) {
			button.addEventListener('click', function () {
				document.getElementById('divContractLists').classList.add('d-none');
				document.getElementById('divContractChatHistory').classList.remove('d-none');
			});
		});
		// Contract clause lists screen 

		// Create contract clause screen
		const varBtnContractCreateClose = document.getElementById('btnContractCreateClose');
		varBtnContractCreateClose.addEventListener('click', function () {
			document.getElementById('divContractLists').classList.remove('d-none');
			document.getElementById('divContractCreate').classList.add('d-none');
		});

		const varBtnContractCreateCancel = document.getElementById('btnContractCreateCancel');
		varBtnContractCreateCancel.addEventListener('click', function () {
			document.getElementById('divContractLists').classList.remove('d-none');
			document.getElementById('divContractCreate').classList.add('d-none');
		});

		const varBtnRedirectClauseLists = document.getElementById('btnRedirectClauseLists');
		varBtnRedirectClauseLists.addEventListener('click', function () {
			document.getElementById('divContractCreate').classList.add('d-none');
			document.getElementById('divContractChatHistory').classList.remove('d-none');
		});
		// Create contract clause screen

		// Contract chat history screen
		const varBtnRedirectClauseListsA = document.getElementById('btnRedirectClauseListsA');
		varBtnRedirectClauseListsA.addEventListener('click', function () {
			document.getElementById('divContractLists').classList.remove('d-none');
			document.getElementById('divContractChatHistory').classList.add('d-none');
		});

		const varBtnGoToSameSideChat = document.getElementById('btnGoToSameSideChat');
		varBtnGoToSameSideChat.addEventListener('click', function () {
			document.getElementById('divContractSameSideChat').classList.remove('d-none');
			document.getElementById('divContractChatHistory').classList.add('d-none');
		});

		const varBtnGoToCounterparty = document.getElementById('btnGoToCounterparty');
		varBtnGoToCounterparty.addEventListener('click', function () {
			document.getElementById('divContractSameSideChat').classList.remove('d-none');
			document.getElementById('divContractChatHistory').classList.add('d-none');
		});
		// Contract chat history screen

		// Contract sameside chat screen
		const varBtnGoToCounterpartyA = document.getElementById('btnGoToCounterpartyA');
		varBtnGoToCounterpartyA.addEventListener('click', function () {
			document.getElementById('divContractSameSideChat').classList.remove('d-none');
			document.getElementById('divContractChatHistory').classList.add('d-none');
		});

		const varBtnRedirectClauseListsB = document.getElementById('btnRedirectClauseListsB');
		varBtnRedirectClauseListsB.addEventListener('click', function () {
			document.getElementById('divContractLists').classList.remove('d-none');
			document.getElementById('divContractSameSideChat').classList.add('d-none');
		});
		// Contract sameside chat screen

		$("#inviteForm").validate({
			submitHandler: function(form) {
				// $(form).ajaxSubmit();
				inviteCounterparties();
			}
		});
	});

	/**
	 * Get contract user details when plugin init
	 */
	function getOpenContractUserDetails() {
		const getContractUserDetailsUrl = apiBaseUrl + '/contract/getOpenContractUserDetails/'+documentID;
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+authToken
		};
		const requestOptions = {
			method: 'GET',
			headers: headers,
		};
		fetch(getContractUserDetailsUrl, requestOptions)
			.then(response => response.json())
			.then(data => {
				// Handle the response data
				console.log(data);
				const responseData = data;
				if (responseData && responseData.status == true && responseData.code == 200) {
					if (responseData.data.invitationDetail && responseData.data.invitationDetail._id) {
						document.getElementById('divInviteCounterpartyPending').classList.remove('d-none');
						document.getElementById('divInviteCounterparty').classList.add('d-none');
						document.getElementById('organizationName').textContent = responseData.data.invitationDetail.organizationName;
						document.getElementById('counterpartyName').textContent = responseData.data.invitationDetail.firstName + " " + responseData.data.invitationDetail.lastName;
					} else if (responseData.data.oppositeUser && responseData.data.oppositeUser._id) {
						document.getElementById('divInviteCounterpartyPending').classList.remove('d-none');
						document.getElementById('divInviteCounterparty').classList.add('d-none');
						document.getElementById('invitationActionPara').classList.add('d-none');
						document.getElementById('contractCounterpartySection').classList.remove('disabled');
						document.getElementById('organizationName').textContent = responseData.data.oppositeUser.company.companyName;
						document.getElementById('counterpartyName').textContent = responseData.data.oppositeUser.firstName + " " + responseData.data.oppositeUser.lastName;
					}
				} else {

				}
			})
			.catch(error => {
				// Handle any errors
				console.error('Error:', error);
			});
	}

	/**
	 * Invite counterparties
	 */
	function inviteCounterparties() {
		var form = document.getElementById('inviteForm');
		var data = JSON.stringify({
			firstName: form.elements['firstName'].value,
			lastName: form.elements['lastName'].value,
			email: form.elements['email'].value,
			organizationName: form.elements['organisationName'].value
		});
		const inviteCounterpartiesUrl = apiBaseUrl + '/contract/inviteCounterPartyUser/'+documentID;
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+authToken
		};
		const requestOptions = {
			method: 'POST',
			headers: headers,
			body: data
		};
		fetch(inviteCounterpartiesUrl, requestOptions)
			.then(response => response.json())
			.then(data => {
				// Handle the response data
				console.log(data);
				const responseData = data;
				if (responseData && responseData.status == true && responseData.code == 200) {
					document.getElementById('divInviteCounterpartyPending').classList.remove('d-none');
					document.getElementById('divInviteCounterpartyForm').classList.add('d-none');
					document.getElementById('organizationName').textContent = responseData.data.organizationName;
					document.getElementById('counterpartyName').textContent = responseData.data.firstName + " " + responseData.data.lastName;
				}
			})
			.catch(error => {
				// Handle any errors
				console.error('Error:', error);
			});
	}

	/**
	 * Cancel Invitation
	 */
	function cancelInvitation() {
		const cancelInvitationsUrl = apiBaseUrl + '/contract/cancelInvitationEmail/'+documentID;
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+authToken
		};
		const requestOptions = {
			method: 'GET',
			headers: headers,
		};
		fetch(cancelInvitationsUrl, requestOptions)
			.then(response => response.json())
			.then(data => {
				// Handle the response data
				console.log(data);
				const responseData = data;
				if (responseData && responseData.status == true && responseData.code == 200) {
					document.getElementById('divInviteCounterpartyPending').classList.add('d-none');
					document.getElementById('divInviteCounterparty').classList.remove('d-none');
				} else {

				}
			})
			.catch(error => {
				// Handle any errors
				console.error('Error:', error);
			});
	}

	/**
	 * Resend counterparty invitation
	 */
	function resendCounterpartyInvitation() {
		const resendCounterpartyInvitationUrl = apiBaseUrl + '/contract/resendInvitationEmail/'+documentID;
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+authToken
		};
		const requestOptions = {
			method: 'GET',
			headers: headers,
		};
		fetch(resendCounterpartyInvitationUrl, requestOptions)
			.then(response => response.json())
			.then(data => {
				// Handle the response data
				console.log(data);
				const responseData = data;
				if (responseData && responseData.status == true && responseData.code == 200) {
					console.log(responseData.message);
				}
			})
			.catch(error => {
				// Handle any errors
				console.error('Error:', error);
			});
	}

    window.Asc.plugin.init = function(text)
    {

    	// Plugin Code - Start CM //

		// Plugin Code - End CM //

	};

})(window, undefined);