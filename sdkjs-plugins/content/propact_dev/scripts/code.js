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
        var disabledClass = "disabled";
        var authToken = '';
        var documentID = '';
        var apiBaseUrl = 'http://localhost:3000/api/v1/app';
        var IMAGE_USER_PATH_LINK = 'https://propact.s3.amazonaws.com/';
        var inviteTeamListIDs = [];
        var inviteUserListIDs = [];
        var toggleInviteUsersDivShow = true;
        var selectedInvitedUsers = [];
        var selectedInvitedTeams = [];

        if (text) {
            document.getElementById('btnCreateClause').classList.remove(disabledClass);
        } else {
            if (!document.getElementById('btnCreateClause').classList.contains(disabledClass)) {
                document.getElementById('btnCreateClause').classList.add(disabledClass);
            }
        }


        // $(document).ready(function () {

        // Get & Set documentID
        documentID = window.Asc.plugin.info.documentId;
        // Get & Set documentID

        // Get & Set AuthToken
        authToken = window.Asc.plugin.info.documentCallbackUrl.split('/').pop();
        // Get & Set AuthToken

        // Get & Set APIBASEURL
        // apiBaseUrl = url.split('/').slice(0, 6).join('/');
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
            if (text) {
                document.getElementById('divContractLists').classList.add(displayNoneClass);
                document.getElementById('divContractCreate').classList.remove(displayNoneClass);
                // var nContentControlType = 2;
                // color = {
                //     R: 104,
                //     G: 215,
                //     B: 248,
                // };
                // window.Asc.plugin.executeMethod("AddContentControl", [nContentControlType, {
                //     "Id": 7,
                //     "Tag": text.replace(/\n/g, "<br>"),
                //     "Lock": 0,
                //     "Color": color
                // }]);
            }
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

        $("#clauseForm").validate({
            submitHandler: function (form) {
                createClauseSection();
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
                        if (responseData.data.invitationDetail && responseData.data.invitationDetail._id) {
                            document.getElementById('divInviteCounterparty').classList.add(displayNoneClass);
                            document.getElementById('divInviteCounterpartyPending').classList.remove(displayNoneClass);
                            document.getElementById('organizationName').textContent = responseData.data.invitationDetail.organizationName;
                            document.getElementById('counterpartyName').textContent = responseData.data.invitationDetail.firstName + " " + responseData.data.invitationDetail.lastName;
                        } else if (responseData.data.oppositeUser && responseData.data.oppositeUser._id) {
                            document.getElementById('divInviteCounterpartyPending').classList.add(displayNoneClass);
                            document.getElementById('divInviteCounterparty').classList.add(displayNoneClass);
                            document.getElementById('invitationActionPara').classList.add(displayNoneClass);
                            document.getElementById('divContractLists').classList.remove(displayNoneClass);
                            document.getElementById('contractCounterpartySection').classList.remove(disabledClass);
                            document.getElementById('userProfileImage').src = responseData.data.loggedInUserDetails.imageUrl;
                            document.getElementById('counterpartyImage').src = responseData.data.oppositeUser.imageUrl;
                            document.getElementById('organizationImage').src = responseData.data.oppositeUser.company.imageUrl;
                            document.getElementById('userProfileName').textContent = responseData.data.loggedInUserDetails.firstName + " " + responseData.data.loggedInUserDetails.lastName;
                            document.getElementById('userProfilerole').textContent = responseData.data.loggedInUserDetails.role;
                            document.getElementById('organizationName').textContent = responseData.data.oppositeUser.company.companyName;
                            document.getElementById('counterpartyName').textContent = responseData.data.oppositeUser.firstName + " " + responseData.data.oppositeUser.lastName;
                            getContractTeamAndUserList();
                        } else if ((responseData.data.openContractDetails && responseData.data.openContractDetails.counterPartyInviteStatus && responseData.data.openContractDetails.counterPartyInviteStatus == 'Pending') || responseData.data.counterPartyInviteStatus == 'Pending') {
                            document.getElementById('divInviteCounterparty').classList.remove(displayNoneClass);
                        }
                    }
                })
                .catch(error => {
                    // Handle any errors
                    console.error('Error:', error);
                });
        }

        /**
         * Get Contract Team And User List
         */
        function getContractTeamAndUserList() {
            const getContractTeamAndUserListUrl = apiBaseUrl + '/meeting/getContractTeamAndUserList/' + documentID;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            };
            const requestOptions = {
                method: 'GET',
                headers: headers,
            };
            fetch(getContractTeamAndUserListUrl, requestOptions)
                .then(response => response.json())
                .then(data => {
                    // Handle the response data
                    const responseData = data;
                    console.log('responseData', responseData);
                    if (responseData && responseData.data) {
                        var teamLists = responseData.data.filter((ele) => {
                            return ele.type == "team";
                        });
                        var userLists = responseData.data.filter((ele) => {
                            return ele.type == "user" && ele.role !== "Contract Creator";
                        });
                        if (teamLists.length > 0) {
                            inviteTeamListIDs = teamLists;
                            document.getElementById('teamsNoteFoundMessage').classList.add(displayNoneClass);
                            document.getElementById('inviteteams').classList.remove(displayNoneClass);
                            var html = '';
                            html += '<div class="filter-inner">\n';
                            html += '<ul>\n';
                            teamLists.forEach((ele) => {
                                html += '<li>\n' +
                                    '<div class="form-check" data-id="' + ele.itemId + '" data-json="' + JSON.stringify(ele) + '">\n' +
                                    '<input type="checkbox" id="inviteteam_' + ele.itemId + '" class="form-check-input team-chkbox" />' +
                                    '<label for="inviteteam_' + ele.itemId + '" class="form-check-label">\n' +
                                    '<div class="invite-users-inner-bar">\n' +
                                    '<div class="invite-users-name">\n' +
                                    '<strong>' + ele.itemName + '</strong>\n' +
                                    '</div>\n' +
                                    '</div>\n' +
                                    '</label>\n' +
                                    '</div>\n' +
                                    '</li>\n';
                            });
                            html += '</ul>\n';
                            html += '</div>';
                            //accordionBodyTeams
                            document.getElementById('accordionBodyTeams').innerHTML = html;
                        }
                        if (userLists.length > 0) {
                            inviteUserListIDs = userLists;
                            document.getElementById('usersNoteFoundMessage').classList.add(displayNoneClass);
                            document.getElementById('inviteusers').classList.remove(displayNoneClass);
                            var html = '';
                            html += '<div class="filter-inner">';
                            html += '<ul>';
                            // ' + IMAGE_USER_PATH_LINK + ele.userImage + '
                            // assets/images/no-profile-image.jpg
                            userLists.forEach((ele) => {
                                html += '<li>';
                                html += '<div class="form-check" data-id="' + ele.itemId + '" data-json="' + JSON.stringify(ele) + '">\n' +
                                    '\t<input type="checkbox" id="inviteuser_' + ele.itemId + '" class="form-check-input user-chkbox" value="' + ele.itemId + '">\n' +
                                    '\t<label for="inviteuser_' + ele.itemId + '" class="form-check-label">\n' +
                                    '\t\t<div class="conversation-left">\n' +
                                    '\t\t\t<span class="user-icon" id="userProfileImage">\n' +
                                    '\t\t\t\t<img src="' + (ele.userImage ? IMAGE_USER_PATH_LINK + ele.userImage : 'images/no-profile-image.jpg') + '" alt="">\n' +
                                    '\t\t\t</span>\n' +
                                    '\t\t\t<div class="user-inner">\n' +
                                    '\t\t\t\t<span class="user-name" id="userProfileName">' + ele.itemName + '</span>\n' +
                                    '\t\t\t\t<p id="userProfilerole">' + ele.role + '</p>\n' +
                                    '\t\t\t</div>\n' +
                                    '\t\t</div>\n' +
                                    '\t</label>\n' +
                                    '</div>';
                                html += '</li>';
                            });
                            html += '</ul>';
                            html += '</div>';
                            document.getElementById('accordionBodyUsers').innerHTML = html;
                        }
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

        /**
         * Create clause section for contract
         */
        function createClauseSection() {
            var form = document.getElementById('clauseForm');
            var data = JSON.stringify({
                contractId: documentID,
                contractSection: form.elements['contractSection'].value,
                contractDescription: form.elements['contractDescription'].value,
                assignedTeamAndUserDetails: [...selectedInvitedTeams, ...selectedInvitedUsers],
                commentId: generateRandomCommentID()
            });
            const createClauseSectionUrl = apiBaseUrl + '/contractSection/createNewContractSection';
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            };
            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: data
            };
            fetch(createClauseSectionUrl, requestOptions)
                .then(response => response.json())
                .then(data => {
                    // Handle the response data
                    document.getElementById("clauseForm").reset();
                    const responseData = data;
                    if (responseData && responseData.status == true && responseData.code == 200) {
                        document.getElementById('divContractChatHistory').classList.remove(displayNoneClass);
                        document.getElementById('divContractCreate').classList.add(displayNoneClass);
                    }
                })
                .catch(error => {
                    // Handle any errors
                    console.error('Error:', error);
                });
        }

        /**
         * Generate Random Comment ID
         * @returns {string}
         */
        function generateRandomCommentID() {
            const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let randomString = '';
            for (let i = 0; i < 8; i++) {
                randomString += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            randomString += '-';
            for (let i = 0; i < 4; i++) {
                randomString += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            randomString += '-';
            for (let i = 0; i < 4; i++) {
                randomString += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            randomString += '-';
            for (let i = 0; i < 4; i++) {
                randomString += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            randomString += '-';
            for (let i = 0; i < 12; i++) {
                randomString += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return randomString;
        }

        $(document).on('click', '#inviteteams', function () {
            $('.team-chkbox').prop('checked', this.checked);
            updateInviteTeamCheckbox();
        })

        $(document).on('click', '.team-chkbox', function () {
            var allChecked = $('.team-chkbox:checked').length === $('.team-chkbox').length;
            $('#inviteteams').prop('checked', allChecked);
            updateInviteTeamCheckbox();
        });

        $(document).on('click', '#inviteusers', function () {
            $('.user-chkbox').prop('checked', this.checked);
            updateInviteUserCheckbox();
        })

        $(document).on('click', '.user-chkbox', function () {
            var allChecked = $('.user-chkbox:checked').length === $('.user-chkbox').length;
            $('#inviteusers').prop('checked', allChecked);
            updateInviteUserCheckbox();
        });

        function updateInviteTeamCheckbox() {
            console.log('selectedInvitedTeams', selectedInvitedTeams);
            $('.team-chkbox').each(function () {
                let isChecked = $(this).prop("checked");
                let dataID = $(this).parent().data('id');
                let jsonData = inviteTeamListIDs.find((ele) => ele.itemId == dataID);
                if (isChecked) {
                    if (selectedInvitedTeams.findIndex((ele) => ele.itemId == jsonData.itemId) < 0) {
                        selectedInvitedTeams.push(jsonData);
                    }
                } else {
                    if (selectedInvitedTeams.findIndex((ele) => ele.itemId == jsonData.itemId) > -1) {
                        selectedInvitedTeams = $.grep(selectedInvitedTeams, function (value) {
                            return value.itemId != dataID;
                        });
                    }
                }
            })
            console.log('selectedInvitedTeams', selectedInvitedTeams);
            updateInviteUsersPlacehoder();
        }

        function updateInviteUserCheckbox() {
            console.log('selectedInvitedUsers', selectedInvitedUsers);
            $('.user-chkbox').each(function () {
                let isChecked = $(this).prop("checked");
                let dataID = $(this).parent().data('id');
                let jsonData = inviteUserListIDs.find((ele) => ele.itemId == dataID);
                if (isChecked) {
                    if (selectedInvitedUsers.findIndex((ele) => ele.itemId == jsonData.itemId) < 0) {
                        selectedInvitedUsers.push(jsonData);
                    }
                } else {
                    if (selectedInvitedUsers.findIndex((ele) => ele.itemId == jsonData.itemId) > -1) {
                        selectedInvitedUsers = $.grep(selectedInvitedUsers, function (value) {
                            return value.itemId != dataID;
                        });
                    }
                }
            });
            console.log('selectedInvitedUsers', selectedInvitedUsers);
            updateInviteUsersPlacehoder();
        }

        function updateInviteUsersPlacehoder() {
            let placeholderText = 'Select users and teams';
            let placeholderTextArray = [];
            if (selectedInvitedUsers && selectedInvitedUsers.length > 0) {
                placeholderTextArray.push(selectedInvitedUsers.length + (selectedInvitedUsers.length == 1 ? ' User' : ' Users'));
            }
            if (selectedInvitedTeams && selectedInvitedTeams.length > 0) {
                placeholderTextArray.push(selectedInvitedTeams.length + (selectedInvitedTeams.length == 1 ? ' Team' : ' Teams'));
            }
            if (placeholderTextArray.length > 0) {
                placeholderText = placeholderTextArray.join(' and ') + ' Selected';
            }
            document.getElementById('inviteUsersInput').placeholder = placeholderText;
        }

        // Plugin Code - End CM //

    };


})(window, undefined);