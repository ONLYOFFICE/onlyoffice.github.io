/*
 * (c) Copyright Ascensio System SIA 2010
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */
(function (window, undefined) {
  window.Asc.plugin.init = function () {};

  const invalidLink = "invalidLink";
  const brokenLink = "brokenLink";
  const embedBtn = document.getElementById("embed-btn");
  const widthMessage = document.getElementById("short-width-message");
  const bilibiliLinkBox = document.getElementById("bilibiliLink");

  bilibiliLinkBox.addEventListener("input", validateInput);

  function validateInput(){
    if (bilibiliLinkBox.value.trim() !== "") {
      //Enable the button for click
      embedBtn.removeAttribute("disabled");
    } else {
      embedBtn.setAttribute("disabled", "disabled");
    }
  }

  function generateText(text) {
    let result = window.Asc.plugin.tr(text);
    return result;
  }

  const displayModalBox = function (errorCase) {
    let location = window.location;
    let start = location.pathname.lastIndexOf("/") + 1;
    let file = location.pathname.substring(start);
    let variation;

    switch (errorCase) {
      case invalidLink:
        variation = {
          url: location.href.replace(file, "invalidLink.html"),
          description: generateText("Error"),
          isVisual: true,
          isModal: true,
          buttons: [],
          EditorsSupport: ["word", "slide", "cell"],
          size: [392, 250],
        };
        break;

      case brokenLink:
        variation = {
          url: location.href.replace(file, "brokenLink.html"),
          description: generateText("Error"),
          isVisual: true,
          isModal: true,
          buttons: [],
          EditorsSupport: ["word", "slide", "cell"],
          size: [392, 250],
        };
        break;

      default:
        console.log(
          "invalid Case. Crash Prevented. Try again with valid inputs."
        );
        return;
    }

    //create and display modalWindow
    modalWindow = new window.Asc.PluginWindow();
    modalWindow.show(variation);
  };

  document.getElementById("embed-btn").onclick = embedBilibiliVideo;

  function embedBilibiliVideo() {
    // Get the video link from the input
    const link = document.getElementById("bilibiliLink").value;

    // Validate the link
    if (!link || !link.includes("bilibili.com/video")) {
      displayModalBox(invalidLink);
      return;
    }

    const regex = /\/video\/(BV\w+|av\d+)/;
    const match = link.match(regex);

    if (match && match[1]) {
      const videoID = match[1];
      const embedUrl = `https://player.bilibili.com/player.html?bvid=${videoID}&page=1`;

      // Set the iFrame src to the embed URL
      document.getElementById("bilibiliPlayer").src = embedUrl;
    } else {
      displayModalBox(brokenLink);
    }
  }
  // for future use, incase we find a way to get search functionality

  // function renderVideos(videosToRender) {
  //   resultsContainer.innerHTML = ""; // Clear the previous results
  //   videosToRender.forEach((video) => {
  //     const videoElement = document.createElement("li");
  //     videoElement.textContent = video.title; // Display the title
  //     videoElement.addEventListener("click", () => {
  //       updatePlayer(video.aid); // Pass the 'aid' to updatePlayer when clicked
  //     });
  //     resultsContainer.appendChild(videoElement);
  //   });
  // }


  window.Asc.plugin.onTranslate = function () {
    embedBtn.innerText = window.Asc.plugin.tr("Embed Video");
    widthMessage.innerText = window.Asc.plugin.tr(
      "Please increase the window width to view the content."
    );

    bilibiliLinkBox.placeholder = window.Asc.plugin.tr(
      "Insert Bilibili video link here..."
    );
  };

  // Handle button click events to close the modal window and plugin side panel
  window.Asc.plugin.button = function (id, windowId) {
    switch (true) {
      case windowId !== undefined:
        // Close window if windowId is provided
        switch (id) {
          case -1:
          default:
            window.Asc.plugin.executeMethod("CloseWindow", [windowId]);
            break;
        }
        break;

      default:
        // Close window directly if windowId is not provided
        if (id === -1 && !windowId) {
          this.executeCommand("close", "");
        }
        break;
    }
  };
})(window, undefined);
