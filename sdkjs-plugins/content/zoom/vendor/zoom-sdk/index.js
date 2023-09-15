SIGNATURE_SERVER = "https://plugins-services.onlyoffice.com/sign";

window.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');
  websdkready();
});

$(document).ready(function () {
    $('.sdk-select').trigger('change');
    $('#reconf').click(function() {
        window.parent.switchForms('#iframe_join', '#configState');
    });
    $('#switch').click(function() {
        window.parent.switchForms('#iframe_join', '#create-meeting-container');
    });
});
function websdkready() {
  var testTool = window.testTool;
  if (testTool.isMobileDevice()) {
    vConsole = new VConsole();
  }
  console.log("checkSystemRequirements");
  console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

  // it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
  // if (!china) ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.6/lib', '/av'); // CDN version default
  // else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.8.6/lib', '/av'); // china cdn option
  // ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version
  ZoomMtg.preLoadWasm(); // pre download wasm file to save time.

  var SDK_KEY, SDK_SECRET;

  /**
   * NEVER PUT YOUR ACTUAL API SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
   * The below generateSignature should be done server side as not to expose your api secret in public
   * You can find an eaxmple in here: https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature
   */
  
  // some help code, remember mn, pwd, lang to cookie, and autofill.
  document.getElementById("display_name").value = localStorage.getItem($('#display_name').attr('data-id')) || "";
  document.getElementById("meeting_number").value = testTool.getCookie(
    "meeting_number"
  );
  document.getElementById("meeting_pwd").value = testTool.getCookie(
    "meeting_pwd"
  );
  if (testTool.getCookie("meeting_lang"))
    document.getElementById("meeting_lang").value = testTool.getCookie(
      "meeting_lang"
    );

  document
    .getElementById("meeting_lang")
    .addEventListener("change", function (e) {
      testTool.setCookie(
        "meeting_lang",
        document.getElementById("meeting_lang").value
      );
      testTool.setCookie(
        "_zm_lang",
        document.getElementById("meeting_lang").value
      );
    });
  // copy zoom invite link to mn, autofill mn and pwd.
  document
    .getElementById("meeting_number")
    .addEventListener("input", function (e) {
      var tmpMn = e.target.value.replace(/([^0-9])+/i, "");
      if (tmpMn.match(/([0-9]{9,11})/)) {
        tmpMn = tmpMn.match(/([0-9]{9,11})/)[1];
      }
      var tmpPwd = e.target.value.match(/pwd=([\d,\w]+)/);
      if (tmpPwd) {
        document.getElementById("meeting_pwd").value = tmpPwd[1];
        testTool.setCookie("meeting_pwd", tmpPwd[1]);
      }
      document.getElementById("meeting_number").value = tmpMn;
      testTool.setCookie(
        "meeting_number",
        document.getElementById("meeting_number").value
      );
    });

  var displayNoneClass = "display-none";
  function switchClass(el, className, add) {
    if (add) {
        el.classList.add(className);
    } else {
        el.classList.remove(className);
    }
  };
  function showLoader(bShow) {
    switchClass(document.getElementById("loader-container"), displayNoneClass, !bShow);
  };

  // click join meeting button
  window.joinMeeting = function () {
      showLoader(true);
      SDK_KEY = localStorage.getItem('zoom-sdk-key') || "";
      SDK_SECRET = SDK_SECRET = localStorage.getItem('zoom-sdk-secret') || "";

      var meetingConfig = testTool.getMeetingConfig();
      if (!meetingConfig.mn || !meetingConfig.name) {
        showLoader(false);
        alert("Meeting ID or Your Name is empty");
        return false;
      }

      localStorage.setItem($('#display_name').attr('data-id'), $('#display_name').val());
      localStorage.setItem($('#display_name').attr('data-id'), $('#display_name').val())
      if ($('#meeting_email').val().trim() !== "")
        localStorage.setItem($('#meeting_email').attr('data-id'), $('#meeting_email').val());
      localStorage.setItem($('#display_name').attr('data-id'), $('#display_name').val())

      testTool.setCookie("meeting_number", meetingConfig.mn);
      testTool.setCookie("meeting_pwd", meetingConfig.pwd);

      $.ajax({
          method: 'POST',
          contentType: "text/plain",
          dataType: "text",
          data: JSON.stringify({
            'meet_number': meetingConfig.mn,
            'role_id': meetingConfig.role,
            'sdk_key': SDK_KEY,
            'sdk_secret': SDK_SECRET
          }),
          url: SIGNATURE_SERVER

      }).success(function (oResponse) {
          meetingConfig.signature = oResponse;
          meetingConfig.sdkKey = SDK_KEY;
          var joinUrl = document.location.protocol + "//" + document.location.host + document.location.pathname.replace("index_zoom.html", "meeting.html?") + testTool.serialize(meetingConfig);
          window.parent.openMeeting(joinUrl);
          showLoader(false);
      }).error(function(oResponse) {
          alert('Server error. Contact to support.');
          showLoader(false);
      })
  };

  function copyToClipboard(elementId) {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(elementId).getAttribute('link'));
    document.body.appendChild(aux);  
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  }
    
  // click copy jon link button
  window.copyJoinLink = function (element) {
    SDK_KEY = localStorage.getItem('zoom-sdk-key') || "";
      SDK_SECRET = SDK_SECRET = localStorage.getItem('zoom-sdk-secret') || "";

      var meetingConfig = testTool.getMeetingConfig();
      if (!meetingConfig.mn || !meetingConfig.name) {
        alert("Meeting ID or Your Name is empty");
        return false;
      }

      localStorage.setItem($('#display_name').attr('data-id'), $('#display_name').val());
      localStorage.setItem($('#display_name').attr('data-id'), $('#display_name').val())
      if ($('#meeting_email').val().trim() !== "")
        localStorage.setItem($('#meeting_email').attr('data-id'), $('#meeting_email').val());
      localStorage.setItem($('#display_name').attr('data-id'), $('#display_name').val())

      testTool.setCookie("meeting_number", meetingConfig.mn);
      testTool.setCookie("meeting_pwd", meetingConfig.pwd);

      $.ajax({
          method: 'POST',
          contentType: "text/plain",
          dataType: "text",
          data: JSON.stringify({
              'meet_number': meetingConfig.mn,
              'role_id': meetingConfig.role,
              'sdk_key': SDK_KEY,
              'sdk_secret': SDK_SECRET
          }),
			    url: SIGNATURE_SERVER

      }).success(function (oResponse) {
          meetingConfig.signature = oResponse;
          meetingConfig.sdkKey = SDK_KEY;
          var joinUrl = document.location.protocol + "//" + document.location.host + document.location.pathname.replace("index_zoom.html", "meeting.html?") + testTool.serialize(meetingConfig);
          document.getElementById('copy_link_value').setAttribute('link', joinUrl);
          copyToClipboard('copy_link_value');
          alert('Copy link was copied to clipboard')
      }).error(function(oResponse) {
          alert('Server error. Contact to support.');
          showLoader(false);
      })
  };
  
}
