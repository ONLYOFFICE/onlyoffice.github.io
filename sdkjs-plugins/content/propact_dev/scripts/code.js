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
    var flagInit = false;
    var fBtnGetAll = false;
    var fClickLabel = false;
    var fClickBtnCur = false;

    window.Asc.plugin.init = function (text) {

        // Plugin Code - Start CM //
        var displayNoneClass = "d-none";
        var authToken = '';
        var documentID = '';
        var loggedInUserID = '';
        var apiBaseUrl = '';


        // $(document).ready(function () {

        // Get & Set documentID
        documentID = window.Asc.plugin.info.documentId;
        // Get & Set documentID

        // Get & Set loggedin user ID
        loggedInUserID = window.Asc.plugin.info.userId;
        // Get & Set loggedin user ID

        // Get & Set AuthToken
        authToken = window.Asc.plugin.info.documentCallbackUrl.split('/').pop();
        // Get & Set AuthToken

        // Get & Set APIBASEURL
        apiBaseUrl = window.Asc.plugin.info.documentCallbackUrl.split('/').slice(0, 6).join('/');
        // Get & Set APIBASEURL

        // Get contract details
        if (documentID && authToken) {
            getOpenContractUserDetails();
        }
        // Get contract details

        // Invite counterparty screen
        const varBtnRedirectInviteCounterpartyForm = document.getElementById('btnRedirectInviteCounterpartyForm');
        varBtnRedirectInviteCounterpartyForm.addEventListener('click', function () {
            document.getElementById('divInviteCounterparty').classList.add(displayNoneClass);
            document.getElementById('divInviteCounterpartyForm').classList.remove(displayNoneClass);
        });
        // Invite counterparty screen

        // Invite counterparty Form screen
        const varBtnRedirectInviteCounterpartyCancel = document.getElementById('btnRedirectInviteCounterpartyCancel');
        varBtnRedirectInviteCounterpartyCancel.addEventListener('click', function () {
            document.getElementById('divInviteCounterparty').classList.remove(displayNoneClass);
            document.getElementById('divInviteCounterpartyForm').classList.add(displayNoneClass);
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
            document.getElementById('divContractLists').classList.add(displayNoneClass);
            document.getElementById('divContractCreate').classList.remove(displayNoneClass);
        });

        const buttonsOpenChatBoard = document.querySelectorAll('.contract-item');
        // Add a click event listener to each button element
        buttonsOpenChatBoard.forEach(function (button) {
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

        $("#inviteForm").validate({
            submitHandler: function (form) {
                // $(form).ajaxSubmit();
                inviteCounterparties();
            }
        });

        // });

        /**
         * Get contract user details when plugin init
         */
        function getOpenContractUserDetails() {
            const getContractUserDetailsUrl = apiBaseUrl + '/contract/getOpenContractUserDetails/' + documentID;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            };
            const requestOptions = {
                method: 'GET',
                headers: headers,
            };
            fetch(getContractUserDetailsUrl, requestOptions)
                .then(response => response.json())
                .then(data => {
                    // Handle the response data
                    const responseData = data;
                    if (responseData && responseData.status == true && responseData.code == 200) {
                        // if (responseData.data.counterPartyInviteStatus) {
						//
                        // } else {
                            if (responseData.data.invitationDetail && responseData.data.invitationDetail._id) {
                                document.getElementById('divInviteCounterpartyPending').classList.remove(displayNoneClass);
                                document.getElementById('divInviteCounterparty').classList.add(displayNoneClass);
                                document.getElementById('organizationName').textContent = responseData.data.invitationDetail.organizationName;
                                document.getElementById('counterpartyName').textContent = responseData.data.invitationDetail.firstName + " " + responseData.data.invitationDetail.lastName;
                            } else if (responseData.data.oppositeUser && responseData.data.oppositeUser._id) {
                                document.getElementById('divContractLists').classList.remove(displayNoneClass);
                                document.getElementById('divInviteCounterparty').classList.add(displayNoneClass);
                                document.getElementById('invitationActionPara').classList.add(displayNoneClass);
                                document.getElementById('contractCounterpartySection').classList.remove('disabled');
                                document.getElementById('counterpartyImage').src = responseData.data.oppositeUser.imageUrl;
                                document.getElementById('organizationImage').src = responseData.data.oppositeUser.company.imageUrl;
                                document.getElementById('organizationName').textContent = responseData.data.oppositeUser.company.companyName;
                                document.getElementById('counterpartyName').textContent = responseData.data.oppositeUser.firstName + " " + responseData.data.oppositeUser.lastName;
                            } else if ((responseData.data.openContractDetails && responseData.data.openContractDetails.counterPartyInviteStatus && responseData.data.openContractDetails.counterPartyInviteStatus == 'Pending') || responseData.data.counterPartyInviteStatus == 'Pending') {
                                document.getElementById('divInviteCounterparty').classList.remove(displayNoneClass);
                            }
                        // }
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
            const inviteCounterpartiesUrl = apiBaseUrl + '/contract/inviteCounterPartyUser/' + documentID;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
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
					document.getElementById("inviteForm").reset();
					const responseData = data;
                    if (responseData && responseData.status == true && responseData.code == 200) {
                        document.getElementById('divInviteCounterpartyPending').classList.remove(displayNoneClass);
                        document.getElementById('divInviteCounterpartyForm').classList.add(displayNoneClass);
                        if (responseData.data && responseData.data._id) {
                            document.getElementById('organizationName').textContent = responseData.data.organizationName;
                            document.getElementById('counterpartyName').textContent = responseData.data.firstName + " " + responseData.data.lastName;
                        } else {
                            getOpenContractUserDetails();
                        }
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
            const cancelInvitationsUrl = apiBaseUrl + '/contract/cancelInvitationEmail/' + documentID;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
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
                        document.getElementById('divInviteCounterpartyPending').classList.add(displayNoneClass);
                        document.getElementById('divInviteCounterparty').classList.remove(displayNoneClass);
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
            const resendCounterpartyInvitationUrl = apiBaseUrl + '/contract/resendInvitationEmail/' + documentID;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
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

        // Plugin Code - End CM //

    };


})(window, undefined);