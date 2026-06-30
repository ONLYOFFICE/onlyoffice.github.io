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

// @ts-check

/// <reference path="./utils.js" />

const Player = {
    /**
     * @type {any}
     */
    player: null,
    /**
     * @param {string} url
     * @param {boolean} [isLocalDesktop]
     */
    show: function(url, isLocalDesktop) {
        if (isLocalDesktop) {
            this._showDesktop(url);
        } else {
            this._showBrowser(url);
        }
    },
    stop: function() {
        try {
            if (this.player && this.player.stopVideo) {
                this.player.stopVideo();
            }
        } catch (err) {
        }
    },
    /** @param {HTMLIFrameElement} iframe @param {object} message */
    _postMessage: function(iframe, message) {
        if (!iframe.contentWindow) {
            console.error("iframe.contentWindow is null");
            return;
        }
        iframe.contentWindow.postMessage(JSON.stringify(message), '*');
    },
    /**
     * @param {string} url
     */
    _showBrowser: function(url) {
        if (!this.player) {
            const opt = {
                height: '100%',
                width: '100%',
                videoId: Utils.extractVideoId(url),
                playerVars: { 
                    'fs' : 1,
                    'start' : 0
                }
            };

            var _time = Utils.extractUrlParam(url, "t");
            if (_time && _time.length > 0)
                opt.playerVars.start = parseInt(_time);

            this.player = new YT.Player('content', opt);
        } else {
            if (this.player.stopVideo && this.player.loadVideoById) {
                this.player.stopVideo();
                this.player.loadVideoById(Utils.extractVideoId(url));
            }
        }
    },
    /**
     * @param {string} url
     */
    _showDesktop: function(url) {
        const self = this;
        console.warn(document);
		console.warn(document.querySelector("#desktop_player"));
		console.warn(document.getElementById("desktop_player"));

		const playerContainer = document.getElementById("id_player");
        if (!playerContainer) {
            console.error("Player container not found");
            return;
        }
        playerContainer.textContent = "";
        /** @type {HTMLIFrameElement} */
        let iframe = document.createElement("iframe");
		iframe.style.width = "100%";
		iframe.style.height = "100%";
		iframe.setAttribute("frameborder", "0");
		iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
		iframe.setAttribute("allowfullscreen", "true");
		playerContainer.appendChild(iframe);

		iframe.src = "https://onlyoffice-github-io.pages.dev/sdkjs-plugins/content/youtube/desktop-player.html";
		iframe.onload = this._postMessage.bind(this, iframe, {
			type: 'youtube-video',
			url: url
		});
		
		window.addEventListener("message", function(event) {
			if (!event.data || event.data.type !== "youtube-plugin-message")
				return;
		
			console.log("Received:", event);
		});
    }
};
