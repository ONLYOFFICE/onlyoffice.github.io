(function(){
	function internal_isLocal() {
		if (window.navigator && window.navigator.userAgent.toLowerCase().indexOf("ascdesktopeditor") < 0)
			return false;
		if (window.location && window.location.protocol == "file:")
			return true;
		if (window.document && window.document.currentScript && 0 == window.document.currentScript.src.indexOf("file:///"))
			return true;
		return false;
	}

	if (internal_isLocal)
	{
		window.fetch = function(url, obj) {

			function TextResponse(text, isOk) {
				if (isOk)
					this.textResponse = text;
				else
					this.message = text;

				this.text = function() { return new Promise(function(resolve) {
					resolve(text)
				})};
				this.json = function() { return new Promise(function(resolve, reject) {
					try {
						resolve(JSON.parse(text));
					} catch (error) {
						reject(error);
					}
				})};
				this.ok = isOk;
			};

			return new Promise(function (resolve, reject) {
				var xhr = new XMLHttpRequest();
				xhr.open(obj.method, url, true);

				for (let h in obj.headers)
					if (obj.headers.hasOwnProperty(h))
						xhr.setRequestHeader(h, obj.headers[h]);

				xhr.onload = function ()
				{
					if (this.status == 200 || this.status == 0)
						resolve(new TextResponse(this.response, true));
					else
						resolve(new TextResponse(this.response, false));
				};
				xhr.onerror = function ()
				{
					reject(new TextResponse(this.response, false));
				};

				xhr.send(obj.body);
			});

		};
	}
})();
