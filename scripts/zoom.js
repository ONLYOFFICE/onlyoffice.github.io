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
    var proxyUrl = "https://proxy-zoom.herokuapp.com/"
    var zoomApiUrl = "https://api.zoom.us/v2/users/";
    var email = '';
    var apiKey = '';
    var secretKey = '';
    var tokenKey = '';
    for (var nTime = 0; nTime < times.length; nTime++) {
        time_hour_data.push({id: nTime, text: times[nTime]});
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

        var rule = ".select2-container--default.select2-container--open .select2-selection__arrow b { border-color : " + window.Asc.plugin.theme["text-normal"] + " !important; }";
        var styleTheme = document.createElement('style');
        styleTheme.type = 'text/css';
        styleTheme.innerHTML = rule;
        document.getElementsByTagName('head')[0].appendChild(styleTheme);

        $('#reconf-label, #switch-label, #label-settings').css('border-bottom', '1px dashed ' + window.Asc.plugin.theme.Color + ' !important');
        $('.arrow').css('border-color', window.Asc.plugin.theme["text-normal"]);
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
            SaveConfiguration(true);
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
        $('#apiKeyField').focus(function() {
            if(this.value !== this.defaultValue){
                this.select();
            }
        });
        $('#apiKeyField').change(function() {
            if ($(this).hasClass('error_api'))
                $(this).toggleClass('error_api');
        });
        $('#secretKeyField').focus(function() {
            if(this.value !== this.defaultValue){
                this.select();
            }
        });
        $('#secretKeyField').change(function() {
            if ($(this).hasClass('error_api'))
                $(this).toggleClass('error_api');
        });
        $('#tokenKeyField').focus(function() {
            if(this.value !== this.defaultValue){
                this.select();
            }
        });
        $('#tokenKeyField').change(function() {
            if ($(this).hasClass('error_api'))
                $(this).toggleClass('error_api');
        });
        $('#reconf').click(function() {
            $('#create-meeting-container').toggleClass('display-none');
            $('#configState').toggleClass('display-none');
        });
        $('#switch').click(function() {
            $('#create-meeting-container').toggleClass('display-none');
            $('#iframe_join').toggleClass('display-none');
        });
        $('#create_meeting').click(function() {
            CreateMeeting();
        });
        $('#start-meeting').click(function() {
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
        $('#recurring-conf').trigger('change');

        SetSavedFromLocalStorage();

		Ps = new PerfectScrollbar("#create-meeting-container", {suppressScrollX: true});

        document.getElementById('emailField').value = localStorage.getItem($('#emailField').attr("data-id")) || "";
		document.getElementById('apiKeyField').value = localStorage.getItem($('#apiKeyField').attr("data-id")) || "";
		document.getElementById('secretKeyField').value = localStorage.getItem($('#secretKeyField').attr("data-id")) || "";
		document.getElementById('tokenKeyField').value = localStorage.getItem($('#tokenKeyField').attr("data-id")) || "";

		SaveConfiguration(false);
    });

    function SaveToLocalStorage() {
        localStorage.setItem('is-auto-meet-id-zoom', $("input[name=meeting-id]:checked").val());
        localStorage.setItem($('#is-waiting-room').attr('data-id'), $('#is-waiting-room').prop('checked'));
        localStorage.setItem($('#timezone').attr('data-id'), $('#timezone').val());
        localStorage.setItem($('#recurring-conf').attr('data-id'), $('#recurring-conf').val());
    };
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
    };

    async function IsValidConfigData() {
        showLoader(elements, true);
        var url =
        $.ajax({
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + tokenKey,
            },
            dataType: 'json',
            json: true,
            data: JSON.stringify(jsonData),
            url: proxyUrl + zoomApiUrl + email
        }).success(function (oResponse) {
            localStorage.setItem($('#emailField').attr("data-id"), email);
            localStorage.setItem($('#apiKeyField').attr("data-id"), apiKey);
            localStorage.setItem($('#secretKeyField').attr("data-id"), secretKey);
            localStorage.setItem($('#tokenKeyField').attr("data-id"), tokenKey);

            $('#configState').toggleClass('display-none');
            $('#create-meeting-container').toggleClass('display-none');

            showLoader(elements, false);
        }).error(function(e){
            alert('Check your details');
            showLoader(elements, false);
        });
    };

    async function SaveConfiguration(bShowError) {
        if (!IsEmptyFields(bShowError)) {
            email = $('#emailField').val().trim();
            apiKey = $('#apiKeyField').val().trim();
            secretKey = $('#secretKeyField').val().trim();
            tokenKey = $('#tokenKeyField').val().trim();

            await IsValidConfigData();
        }
    };
    function IsEmptyFields(bShowError) {
        var isEmpty = null;

        if ($('#emailField').val() === '') {
            isEmpty = true;

            if (bShowError)
                if (!$('#emailField').hasClass('error_api'))
                    $('#emailField').toggleClass('error_api');
        }
        else {
            isEmpty = false;

            if (bShowError)
                if ($('#emailField').hasClass('error_api'))
                    $('#emailField').toggleClass('error_api');
        }
        if ($('#apiKeyField').val() === '') {
            isEmpty = true;

            if (bShowError)
                if (!$('#apiKeyField').hasClass('error_api'))
                    $('#apiKeyField').toggleClass('error_api');
        }
        else {
            isEmpty = false;

            if (bShowError)
                if ($('#apiKeyField').hasClass('error_api'))
                    $('#apiKeyField').toggleClass('error_api');
        }

        if ($('#secretKeyField').val() === '') {
            isEmpty = isEmpty && true;

            if (bShowError)
                if (!$('#secretKeyField').hasClass('error_api'))
                    $('#secretKeyField').toggleClass('error_api');
        }
        else {
            isEmpty = isEmpty && false;

            if (bShowError)
                if ($('#secretKeyField').hasClass('error_api'))
                    $('#secretKeyField').toggleClass('error_api');
        }

        if ($('#tokenKeyField').val() === '') {
            isEmpty = isEmpty && true;

            if (bShowError)
                if (!$('#tokenKeyField').hasClass('error_api'))
                    $('#tokenKeyField').toggleClass('error_api');
        }
        else {
            isEmpty = isEmpty && false;

            if (bShowError)
                if ($('#tokenKeyField').hasClass('error_api'))
                    $('#tokenKeyField').toggleClass('error_api');
        }

        return isEmpty;
    }
    function CreateMeeting(isNowMeeting) {
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
            var arrSplittedTime = sTime.split(':');
            sTime = String(Number(arrSplittedTime[0]) + 12) + ':' + arrSplittedTime[1];
        }
        sResultTime = sDate + 'T' + sTime + ':00';

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
            jsonData["timezone"]     = sTimeZone;
            jsonData["recurrence"]   = sRecurringConf;
        }
        else {
            jsonData["type"]         = 1;
        }

        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            headers: {
                'Authorization': 'Bearer ' + tokenKey,
            },
            dataType: 'json',
            json: true,
            data: JSON.stringify(jsonData),
            url: proxyUrl + zoomApiUrl + email + '/meetings'
        }).success(function (oResponse) {
            var sTopic    = 'Topic: ' + oResponse.topic;
            var sTime     = 'Time: ' + $('#date-value').val() + ' ' + $('#time-hour').val() + ' ' + $('#time-am-pm').val().toUpperCase() + ' ' + oResponse["timezone"];
            var sJoinUrl  = 'Join URL: ' + oResponse.join_url;
            var sConfId   = 'Conference ID: ' + oResponse.id;
            var sPassword = 'Password: ' + oResponse.password;
            var sResult   = sTopic + '\r' + sTime + '\r' + sJoinUrl +'\r' + sConfId + '\r' + sPassword + '\r';

            Asc.scope.meeting_info = sResult;

            window.Asc.plugin.executeMethod('CoAuthoringChatSendMessage', [Asc.scope.meeting_info], function(isTrue) {
                if (isTrue)
                    alert('Meeting was created');
                else
                    alert('Meeting was create, please update SDK for checking info about created meeting in chat.');
            });

            showLoader(elements, false);
        }).error(function(e) {
            alert('Meeting was not created');
            showLoader(elements, false);
        });
    };
    window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};

    function updateScroll()
	{
		Ps && Ps.update();
	};

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
