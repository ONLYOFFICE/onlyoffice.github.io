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

var Ps;
(function(window, undefined){
    var displayNoneClass = "display-none";
	var isInit = false;
	var ifr;
    var time_hour_data     = [];
    var duration_hour_data = [];
    var duration_min_data  = [];
    var times = ["12:00","12:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00","5:30","6:00","6:30","7:00","7:30","8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30"];
    var hours = ["0 hour","1 hour","2 hour","3 hour","4 hour","5 hour","6 hour","7 hour","8 hour","9 hour","10 hour","11 hour","12 hour",
    "13 hour","14 hour","15 hour","16 hour","17 hour","18 hour","19 hour","20 hour","21 hour","22 hour","23 hour","24 hour"];
    var minutes = ["0 minutes","15 minutes","30 minutes","45 minutes"];
    var elements = { };
    var zoomProxyUrl = "https://plugins-services.onlyoffice.com/proxy";
    var email = '';
    var sdkKey = '';
    var sdkSecret = '';
    var tokenKey = '';
    var oTheme;
    for (var nTime = 0; nTime < times.length; nTime++) {
        time_hour_data.push({id: times[nTime], text: times[nTime]});
    }
    for (var nHour = 0; nHour < hours.length; nHour++) {
        duration_hour_data.push({id: hours[nHour].split(' hour')[0], text: hours[nHour]});
    }
    for (var nMin = 0; nMin < minutes.length; nMin++) {
        duration_min_data.push({id: minutes[nMin].split(' minutes')[0], text: minutes[nMin]});
    }

    var jsonData = { };

	window.oncontextmenu = function(e)
	{
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
    };

    function showLoader(elements, bShow) {
       switchClass(elements.loader, displayNoneClass, !bShow);
    };
    
    window.Asc.plugin.onFocusContentControl = function() {
        console.log('1111');
    }

    function switchClass(el, className, add) {
        if (add) {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
    };
    
	window.Asc.plugin.init = function () {
	    $('#topic-value').val(window.Asc.plugin.info.documentTitle);

        if (!isInit) {
			document.getElementById("iframe_join").innerHTML = "";
			ifr                = document.createElement("iframe");
			ifr.position	   = "fixed";
			ifr.name           = "zoom";
			ifr.id             = "zoom_id";
			ifr.src            = "./index_zoom.html";
			ifr.style.top      = "0px";
			ifr.style.left     = "0px";
			ifr.style.width    = "100%";
			ifr.style.height   = "100%";
			ifr.setAttribute("frameBorder", "0");
			document.getElementById("iframe_join").appendChild(ifr);
			isInit = true;
			ifr.onload = function() {
			}
		}
    };
    window.Asc.plugin.onThemeChanged = function(theme)
    {
        window.Asc.plugin.onThemeChangedBase(theme);
        oTheme = theme;

        var rule = ".select2-container--default.select2-container--open .select2-selection__arrow b { border-color : " + window.Asc.plugin.theme["text-normal"] + " !important; }";
        var styleTheme = document.createElement('style');
        styleTheme.type = 'text/css';
        styleTheme.innerHTML = rule;
        document.getElementsByTagName('head')[0].appendChild(styleTheme);

        $('.reconf-label, .switch-label, .label-settings').css('border-bottom', '1px dashed ' + window.Asc.plugin.theme["text-normal"]);
        $('.arrow').css('border-color', window.Asc.plugin.theme["text-normal"]);

        var style = document.getElementsByTagName('head')[0].lastChild;
        setTimeout(function() {
            ifr.contentWindow.postMessage({oTheme : oTheme}, '*');
        });
    };

    window.openMeeting = function(sUrl) {

        document.getElementById("iframe_meeting").innerHTML = "";
            ifr                = document.createElement("iframe");
            ifr.position	   = "fixed";
            ifr.name           = "zoom";
            ifr.id             = "zoom_id";
            ifr.src            = sUrl;
            ifr.style.top      = "0px";
            ifr.style.left     = "0px";
            ifr.style.width    = "100%";
            ifr.style.height   = "100%";
            ifr.setAttribute("frameBorder", "0");
            document.getElementById("iframe_meeting").appendChild(ifr);
            isInit = true;
            ifr.onload = function() {
                $('#iframe_join').toggleClass('display-none');
                $('#iframe_meeting').toggleClass('display-none');
            }

    };

    window.switchForms = function(elmToHide, elmToShow) {
        $(elmToHide).toggleClass('display-none');
        $(elmToShow).toggleClass('display-none');
    };

	$(document).ready(function () {
	    elements = {
            loader: document.getElementById("loader-container"),
		};

	    $('input[name="date"]').daterangepicker({
            singleDatePicker: true,
        });
        $('#time-hour').select2({
            data: time_hour_data
        });
        $('#duration-hour').select2({
            data: duration_hour_data
        });
        $('#duration-min').select2({
            data: duration_min_data
        });
        $('.select_example').select2({
			minimumResultsForSearch: Infinity,
			width : 'calc(100% - 24px)',
		});
		$('.select_example.group').select2({
			minimumResultsForSearch: Infinity,
			width : 'calc(50% - 20px)',
		});
		$('.select_example.duration').select2({
			minimumResultsForSearch: Infinity,
			width : '100%',
		});

        $('#timezone').select2({
            minimumResultsForSearch: 0,
            width : 'calc(100% - 24px)'
        });

		$('#adv_settings').click(function() {
		    $('#settings_wrapper').find('.settings_group').slideToggle('fast', function() { updateScroll(); });
            $(this).find(".arrow").toggleClass("down");
            $(this).find(".arrow").toggleClass("up");
		});

        $('#saveConfigBtn').click(function() {
            SaveCredentials(true);
        });
        $('#topic-value').focus(function(){
            if(this.value !== this.defaultValue){
                this.select();
            }
        });
        $('#emailField').focus(function() {
            if(this.value !== this.defaultValue){
                this.select();
            }
        });
        $('#sdkKeyField').focus(function() {
            if(this.value !== this.defaultValue){
                this.select();
            }
        });
        $('#sdkKeyField').change(function() {
            if ($(this).hasClass('error_border'))
                $(this).toggleClass('error_border');
        });
        $('#sdkSecretField').focus(function() {
            if(this.value !== this.defaultValue){
                this.select();
            }
        });
        $('#sdkSecretField').change(function() {
            if ($(this).hasClass('error_border'))
                $(this).toggleClass('error_border');
        });
        $('#tokenKeyField').focus(function() {
            if(this.value !== this.defaultValue){
                this.select();
            }
        });
        $('#tokenKeyField').change(function() {
            if ($(this).hasClass('error_border'))
                $(this).toggleClass('error_border');
        });
        $('#reconf').click(function() {
            $('#create-meeting-container').toggleClass('display-none');
            $('#configState').toggleClass('display-none');
        });
        $('#switch').click(function() {
            if (sdkKey == "" || sdkSecret == "") {
                alert("SDK Key or Secret are empty. Check your credentials.");
                $('#reconf').trigger("click");
                return;
            }

            $('#create-meeting-container').toggleClass('display-none');
            $('#iframe_join').toggleClass('display-none');

            var style = document.getElementsByTagName('head')[0].lastChild;
		    setTimeout(function() {
                ifr.contentWindow.postMessage({oTheme : oTheme}, '*');
            });
        });
        $('#create_meeting').click(function() {
            isNowMeeting = false;
            CreateMeeting();
        });
        $('#start-meeting').click(function() {
            isNowMeeting = true;
            CreateMeeting(true);
        });
        $('#schedule-meeting').click(function() {
            $('#scheduler-container').slideToggle('fast', function() { updateScroll(); });
        });
        $('#recurring-conf').change(function() {
            if ($(this).val() !== 'never') {
                $('input[name="meeting-id"][value="false"]').prop('checked', true);
                $("input[name=meeting-id]").prop("disabled", true);
            }
            else {
                $("input[name=meeting-id]").prop("disabled", false);
            }
        });
        $('#duration-hour').change(CheckDuration);
        $('#duration-min').change(CheckDuration);

        $('#recurring-conf').trigger('change');

        $('#duration-hour').val(1);
        $('#duration-hour').trigger('change');

        SetSavedFromLocalStorage();

		Ps = new PerfectScrollbar("#create-meeting-container", {suppressScrollX: true});
		Ps1 = new PerfectScrollbar("#configState", {suppressScrollX: true});
        
        document.getElementById('emailField').value = localStorage.getItem($('#emailField').attr("data-id")) || "";
		document.getElementById('sdkKeyField').value = localStorage.getItem($('#sdkKeyField').attr("data-id")) || "";
		document.getElementById('sdkSecretField').value = localStorage.getItem($('#sdkSecretField').attr("data-id")) || "";
		document.getElementById('tokenKeyField').value = localStorage.getItem($('#tokenKeyField').attr("data-id")) || "";

		SaveCredentials(false);
    });

    function CheckDuration()
    {
        var hour_container = $('#duration-hour').parent().find('.select2-selection.select2-selection--single')[0];
        var min_container = $('#duration-min').parent().find('.select2-selection.select2-selection--single')[0];

        if ($('#duration-hour').val() === "0" && $('#duration-min').val() === "0") {
            hour_container.style.setProperty('border-color', '#D9534F', 'important');
            min_container.style.setProperty('border-color', '#D9534F', 'important');
        }
        else {
            hour_container.style.setProperty('border-color', '');
            min_container.style.setProperty('border-color', '');
        }
    }

    function SaveToLocalStorage() {
        localStorage.setItem('is-auto-meet-id-zoom', $("input[name=meeting-id]:checked").val());
        localStorage.setItem($('#is-waiting-room').attr('data-id'), $('#is-waiting-room').prop('checked'));
        localStorage.setItem($('#timezone').attr('data-id'), $('#timezone').val());
        localStorage.setItem($('#recurring-conf').attr('data-id'), $('#recurring-conf').val());
    }

    function SetSavedFromLocalStorage() {
        var isPersonalMeetId = localStorage.getItem('is-auto-meet-id-zoom');
        if (isPersonalMeetId !== null) {
            if (isPersonalMeetId === true.toString())
                $('input[name="meeting-id"][value="true"]').prop('checked', true);
            else
                $('input[name="meeting-id"][value="false"]').prop('checked', true);
        }

        var isWaitingRoom = localStorage.getItem($('#is-waiting-room').attr('data-id'));
        if (isWaitingRoom !== null) {
            if (isWaitingRoom === true.toString())
                $('#is-waiting-room').prop("checked", true);
            else
                $('#is-waiting-room').prop("checked", false);
        }

        var sTimeZone = localStorage.getItem($('#timezone').attr('data-id'));
        if (sTimeZone) {
            $('#timezone').val(sTimeZone);
            $('#timezone').trigger('change');
        }

        var sRecurringConf = localStorage.getItem($('#recurring-conf').attr('data-id'));
        if (sRecurringConf) {
            $('#recurring-conf').val(sRecurringConf);
            $('#recurring-conf').trigger('change');
        }
    }

    async function IsValidConfigData() {
        showLoader(elements, true);
        $.ajax({
            method: 'POST',
            contentType: "text/plain",
            data: JSON.stringify({
                'Authorization': 'Bearer ' + tokenKey,
                'endPoint': email,
                "method": "GET"
            }),
            url: zoomProxyUrl
        }).success(function (oResponse) {
            localStorage.setItem($('#emailField').attr("data-id"), email);
            localStorage.setItem($('#sdkKeyField').attr("data-id"), sdkKey);
            localStorage.setItem($('#sdkSecretField').attr("data-id"), sdkSecret);
            localStorage.setItem($('#tokenKeyField').attr("data-id"), tokenKey);

            if (oResponse.message && oResponse.message.search("Invalid") != -1) {
                alert('Invalid access (JWT) token!');
                showLoader(elements, false);
                return;
            }
            else if (oResponse.message && oResponse.message.search("Access token is expired") != -1) {
                alert("Access token (JWT) is expired.");
                showLoader(elements, false);
                return;
            }

            if (email !== "") {
                if (localStorage.getItem($('#timezone').attr('data-id')) === null) {
                    if (oResponse.timezone != "") {
                        localStorage.setItem($('#timezone').attr('data-id'), oResponse.timezone);
                        $('#timezone').val(oResponse.timezone);
                        $('#timezone').trigger('change');
                    }
                }
            }
            else {
                if (localStorage.getItem($('#timezone').attr('data-id')) === null) {
                    if (oResponse.users[0].timezone != "") {
                        localStorage.setItem($('#timezone').attr('data-id'), oResponse.users[0].timezone);
                        $('#timezone').val(oResponse.users[0].timezone);
                        $('#timezone').trigger('change');
                    }
                    if (oResponse.users[0].email) {
                        email = oResponse.users[0].email;
                        $('#emailField').val(email);
                        localStorage.setItem($('#emailField').attr("data-id"), email);
                    }
                }
            }
            

            $('#configState').toggleClass('display-none');
            $('#create-meeting-container').toggleClass('display-none');

            showLoader(elements, false);
        }).error(function(e){
            alert('Server error. Contact to support.');
            showLoader(elements, false);
        });
    };

    async function SaveCredentials(bShowError) {
        if (!IsEmptyFields(bShowError)) {
            email = $('#emailField').val().trim();
            sdkKey = $('#sdkKeyField').val().trim();
            sdkSecret = $('#sdkSecretField').val().trim();
            tokenKey = $('#tokenKeyField').val().trim();

            await IsValidConfigData();
        }
    }

    function IsEmptyFields(bShowError) {
        var isEmpty = null;

        if ($('#emailField').val() === '') {
            isEmpty = true;

            if (bShowError)
                if (!$('#emailField').hasClass('error_border'))
                    $('#emailField').toggleClass('error_border');
        }
        else {
            isEmpty = false;

            if (bShowError)
                if ($('#emailField').hasClass('error_border'))
                    $('#emailField').toggleClass('error_border');
        }
        if ($('#sdkKeyField').val() === '') {
            isEmpty = true;

            if (bShowError)
                if (!$('#sdkKeyField').hasClass('error_border'))
                    $('#sdkKeyField').toggleClass('error_border');
        }
        else {
            isEmpty = false;

            if (bShowError)
                if ($('#sdkKeyField').hasClass('error_border'))
                    $('#sdkKeyField').toggleClass('error_border');
        }

        if ($('#sdkSecretField').val() === '') {
            isEmpty = isEmpty && true;

            if (bShowError)
                if (!$('#sdkSecretField').hasClass('error_border'))
                    $('#sdkSecretField').toggleClass('error_border');
        }
        else {
            isEmpty = isEmpty && false;

            if (bShowError)
                if ($('#sdkSecretField').hasClass('error_border'))
                    $('#sdkSecretField').toggleClass('error_border');
        }

        if ($('#tokenKeyField').val() === '') {
            isEmpty = isEmpty && true;

            if (bShowError)
                if (!$('#tokenKeyField').hasClass('error_border'))
                    $('#tokenKeyField').toggleClass('error_border');
        }
        else {
            isEmpty = isEmpty && false;

            if (bShowError)
                if ($('#tokenKeyField').hasClass('error_border'))
                    $('#tokenKeyField').toggleClass('error_border');
        }

        return isEmpty;
    }

    function CheckValidDate(aDateFromPicker, hour, min, timezone) {

        let [year, month, day] = [parseInt(aDateFromPicker[2]), parseInt(aDateFromPicker[0]) - 1, parseInt(aDateFromPicker[1])];
        hour = parseInt(hour);
        min = parseInt(min);

        let timezoneOffset = parseInt(timezone[4] + String(parseInt(timezone.slice(5,7)) * 60 + parseInt(timezone.slice(8,10))));
        let curDate = new Date(Date.now());
        
        let scheduleDate = new Date();
        scheduleDate.setUTCFullYear(year);
        scheduleDate.setUTCMonth(month);
        scheduleDate.setUTCDate(day);
        scheduleDate.setUTCHours(hour);
        scheduleDate.setUTCMinutes(min);

        scheduleDate.setUTCMinutes(scheduleDate.getUTCMinutes() - timezoneOffset);
        
        if (curDate.getTime() > scheduleDate.getTime()) {
            return false;
        }

        return true;
    }

    var isNowMeeting = false;
    function CreateMeeting() {
        if ($('#duration-hour').val() === "0" && $('#duration-min').val() === "0")
        {
            alert("Duration can't be 0");
            return;
        }

        SaveToLocalStorage();
        showLoader(elements, true);
        
        // getting parameters
        var sTopic         = $('#topic-value').val();
        var meetingType    = 2;
        var sDate          = '';
        var sTime          = $('#time-hour').val();
        var sAmPmTime      = $('#time-am-pm').val();
        var sDurationHour  = $('#duration-hour').val();
        var sDurationMin   = $('#duration-min').val();
        var sMeetPasswd    = $('#password').val();
        var bPersonalId    = ('true' === $("input[name=meeting-id]:checked").val());
        var bWaitingRoom   = document.getElementById("is-waiting-room").checked;
        var sTimeZone      = $('#timezone').val();
        var sRecurringConf = null;
        if ($('#recurring-conf').val() !== 'never') {
            meetingType = 8;
            var nType = null;
            switch ($('#recurring-conf').val()) {
                case 'daily':
                    nType = 1;
                    break;
                case 'weekly':
                    nType = 2;
                    break;
                case 'monthly':
                    nType = 3;
                    break;
            }
            sRecurringConf = {
                "type" : nType
            }
        }

        // bringing the date to the required format
        var sResultTime    = '';
        var arrSplittedDate = $('#date-value').val().split('/');
        sDate += arrSplittedDate[2] + '-' + arrSplittedDate[0] + '-' + arrSplittedDate[1];

        if (sAmPmTime == 'pm') {
            if (sTime != "12:00" && sTime != "12:30") {
                var arrSplittedTime = sTime.split(':');
                sTime = String(Number(arrSplittedTime[0]) + 12) + ':' + arrSplittedTime[1];
            }
        }
        else if (sAmPmTime == 'am') {
            if (sTime == "12:00")
                sTime = "0:00";
            else if (sTime == "12:30")
                sTime = "0:30";
        }
        sResultTime = sDate + 'T' + sTime + ':00';

        if (!isNowMeeting && CheckValidDate(arrSplittedDate, sTime.split(":")[0], sTime.split(":")[1], $('#timezone').find(":selected").text().trim()) == false) {
            alert("Specify a start time and an end time that must be later than the current time.");
            showLoader(elements, false);
            return;
        }

        // calc duration in minutes
        var sResultDuration = String(Number(sDurationHour) * 60 + Number(sDurationMin));

        // filling the jsonData for request
        var meetingSettings = {
            "use_pmi" : bPersonalId,
            "waiting_room" : bWaitingRoom
        }
        jsonData["topic"]        = sTopic;
        jsonData["type"]         = meetingType;
        if (!isNowMeeting) {
            jsonData["start_time"] = sResultTime;
            jsonData["duration"]     = sResultDuration;
            jsonData["settings"]     = meetingSettings;
            if (sMeetPasswd !== "")
                jsonData["password"] = sMeetPasswd;
            jsonData["recurrence"]   = sRecurringConf;
        }
        else {
            jsonData["type"]         = 1;
        }

        jsonData["timezone"]     = sTimeZone;
        jsonData['Authorization'] = 'Bearer ' + tokenKey;
        jsonData['method'] = 'POST';
        jsonData['endPoint'] = email + '/meetings';

        $.ajax({
            type: 'POST',
            contentType: "text/plain",
            data: JSON.stringify(jsonData),
            url: zoomProxyUrl
        }).success(function (oResponse) {
            if (oResponse.message && oResponse.message.search("Invalid") != -1) {
                alert("Invalid access (JWT) token.");
                showLoader(elements, false);
                $('#reconf').trigger("click");
                return;
            }
            else if (oResponse.message && oResponse.message.search("Access token is expired") != -1) {
                alert("Access token (JWT) is expired.");
                showLoader(elements, false);
                $('#reconf').trigger("click");
                return;
            }

            var sTopic    = 'Topic: ' + oResponse.topic;
            var sTime;
            if (isNowMeeting) {
                let timezone = $('#timezone').find(":selected").text().trim();
                let timezoneOffset = parseInt(timezone[4] + String(parseInt(timezone.slice(5,7)) * 60 + parseInt(timezone.slice(8,10))));
                let curDate = new Date(Date.now());
                curDate.setUTCMinutes(curDate.getUTCMinutes() + timezoneOffset);

                let curHour = curDate.getUTCHours();
                let sAmPm = curHour - 12 > 0 ? "PM" : "AM";
                let sCurHoursAmPm = curHour - 12 > 0 ? curHour - 12 : curHour;
                sCurHoursAmPm = sCurHoursAmPm < 10 ? "0" + sCurHoursAmPm : sCurHoursAmPm;
                let curMinutes = curDate.getUTCMinutes() < 10 ? "0" + curDate.getUTCMinutes() : curDate.getUTCMinutes()
                let curDay = curDate.getUTCDate() < 10 ? "0" + curDate.getUTCDate() : curDate.getUTCDate();
                let curMonth = curDate.getUTCMonth() < 10 ? "0" + (curDate.getUTCMonth() + 1) : (curDate.getUTCMonth() + 1);

                sTime = `Time: ${curMonth}/${curDay}/${curDate.getUTCFullYear()} ${sCurHoursAmPm}:${curMinutes} ${sAmPm} ${oResponse["timezone"]}`;
            }
            else
                sTime     = 'Time: ' + $('#date-value').val() + ' ' + $('#time-hour').val() + ' ' + $('#time-am-pm').val().toUpperCase() + ' ' + oResponse["timezone"];
            var sJoinUrl  = 'Join URL: ' + oResponse.join_url;
            var sConfId   = 'Conference ID: ' + oResponse.id;
            var sPassword = 'Password: ' + oResponse.password;
            var sResult   = sTopic + '\r' + sTime + '\r' + sJoinUrl +'\r' + sConfId + '\r' + sPassword + '\r';

            Asc.scope.meeting_info = sResult;

            // for desktop
            if (document.location.href.indexOf('file://') == 0) {
                window.Asc.plugin.executeMethod("AddComment", [{
                    UserName: Asc.plugin.info.userName,
                    Text: sResult,
                    Time: Date.now(),
                    Solver: false
                }]);
            }
            else {
                window.Asc.plugin.executeMethod('CoAuthoringChatSendMessage', [Asc.scope.meeting_info], function(isTrue) {
                    if (isTrue)
                        alert('Meeting was created');
                    else
                        alert('Meeting was create, please update SDK for checking info about created meeting in chat.');
                });
            }

            showLoader(elements, false);
        }).error(function(e) {
            alert('Server error. Contact to support.');
            showLoader(elements, false);
        });
    }

    function formatDate(sDate, timezone) {
        
        return;
    }

    window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};

    function updateScroll()
	{
		Ps && Ps.update();
		Ps1 && Ps1.update();
	}

	window.Asc.plugin.onExternalMouseUp = function()
	{
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
			false, false, false, false, 0, null);

		document.dispatchEvent(evt);
		$('.select_example').select2({
			minimumResultsForSearch: Infinity,
			width : 'calc(100% - 24px)',
		});
		$('.select_example.group').select2({
			minimumResultsForSearch: Infinity,
			width : 'calc(50% - 20px)',
		});
		$('.select_example.duration').select2({
			minimumResultsForSearch: Infinity,
			width : '100%',
		});
		$('#timezone').select2({
            minimumResultsForSearch: 0,
            width : 'calc(100% - 24px)'
        });
	};

})(window, undefined);
