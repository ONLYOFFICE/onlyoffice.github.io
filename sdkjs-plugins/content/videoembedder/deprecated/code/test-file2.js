(function(window, undefined){

	try {
		var url = "";
		var isWindowPlayer = false;

		// Function to validate the Bilibili video URL
		function validateBilibiliUrl(url)
		{
			var p = /^(?:https?:\/\/)?(?:www\.)?bilibili\.com\/video\/BV\w+/;
			return (url.match(p)) ? true : false;
		}

		// Function to extract the video ID from the Bilibili URL
		function getBilibiliVideoId(url)
		{
			var match = url.match(/bilibili\.com\/video\/(BV\w+)/);
			return match ? match[1] : undefined;
		}

		window.Asc.plugin.init = function(text)
		{
			var _textbox = document.getElementById("textbox_url");

			// Disable input and button in view mode
			if (this.info.isViewMode) {
				_textbox.disabled = true;
				document.getElementById("textbox_button").disabled = true;
			}

			// Handle input and button click actions
			_textbox.onkeyup = function(e)
			{
				if (e.keyCode == 13) // Enter key
					document.getElementById("textbox_button").onclick();
			};
			
			// Clear validation error on input
			_textbox.oninput = _textbox.onpaste = function(e)
			{
				this.style.borderColor = "";
				document.getElementById("input_error_id").style.display = "none";
			};

			// Button click handler
			document.getElementById("textbox_button").onclick = function(e)
			{
				var _url = document.getElementById("textbox_url").value;

				// URL validation
				if (!validateBilibiliUrl(_url))
				{
					document.getElementById("textbox_url").style.borderColor = "#d9534f";
					document.getElementById("input_error_id").style.display = "block";
					return;
				}

				// Initialize player if not already done
				if (!isWindowPlayer)
				{
					var _table = document.getElementById("id_player");
					_table.innerHTML = "<div id=\"content\" style=\"position:absolute;padding:0;margin:0;left:0;top:0;width:100%;height:100%;\"></div>";
					isWindowPlayer = true;

					window.Asc.plugin.resizeWindow(620, 480, 390, 400, 0, 0);
				}

				// Create iframe to embed the Bilibili video
				var videoId = getBilibiliVideoId(_url);
				var iframe = document.createElement("iframe");
				iframe.src = "https://player.bilibili.com/player.html?bvid=" + videoId + "&page=1"; // Embed URL for Bilibili video
				iframe.width = "100%";
				iframe.height = "100%";
				iframe.frameborder = "0";
				iframe.allow = "autoplay; encrypted-media";
				document.getElementById("content").appendChild(iframe);
			};

			// Load text URL if provided
			url = text;
			if (url !== "")
			{
				document.getElementById("textbox_url").value = url;
				document.getElementById("textbox_button").onclick();
			}
			_textbox.focus();
		};
		
		// Handle button press to embed video
		window.Asc.plugin.button = function(id)
		{
			if (id == 0) // Add video
			{
				url = document.getElementById("textbox_url").value;

				if (!validateBilibiliUrl(url))
				{
					document.getElementById("textbox_url").style.borderColor = "#d9534f";
					document.getElementById("input_error_id").style.display = "block";
					return;
				}

				var videoId = getBilibiliVideoId(url);
				var imgUrl = "https://i2.hdslb.com/bfs/album/" + videoId + "/cover.jpg"; // Example cover URL
				var _info = window.Asc.plugin.info;
				
				var _param = {
					guid : _info.guid,
					widthPix : (_info.mmToPx * _info.width) >> 0,
					heightPix : (_info.mmToPx * _info.height) >> 0,
					width : _info.width ? _info.width : 100,
					height : _info.height ? _info.height : 70,
					imgSrc : imgUrl,
					data : url,
					objectId : _info.objectId,
					resize : _info.resize
				};

				window.Asc.plugin.executeMethod("AddOleObject", [_param], function() {
					window.Asc.plugin.executeCommand("close", "");
				});
			}
			else
			{
				this.executeCommand("close", "");
			}
		};

		window.Asc.plugin.onTranslate = function()
		{
			var label = document.getElementById("td_labelUrl");
			if (label)
				label.innerHTML = window.Asc.plugin.tr("Paste Bilibili video URL");
		};
	} catch (error) {
		console.log("Some problem occurred");
	}

})(window, undefined);
