/*
Before use this module you need include in your script JQuery library
If you need to create a scrollable div, you must create an instance of ScrollableDiv, like this
your_instance = window.Asc.ScrollableDiv;
after use the function in your code for create div
	your_instance.create_div(parent_id,{
						width: "value",
						height: "value",
						left: "value",
						right: "value",
						top: "value",
						bottom: "value"
	});
	your_instance.addEventListener();	- this function add event listener

parent_id - id of the element, after which the div is inserted;
width - width div;
height - height div;
top, right, left, bottom - the distance from the parent element to the div
If you need to add new properties to a div, you can add them to deffaul_settings {}

div has position: absolute and overflow: hidden
For update scroll use funcrion myscroll.updateScroll(id_innerDiv);
After the creation outer div has id = "scrollable-container-id" + count, and inner div has id = "conteiner_id" + count
count - element serial number
You can apply your classes to this divs
*/

(function(window,undefined) {
	window.Asc.ScrollableDiv = window.Asc.ScrollableDiv || {
		cout: 0,
		lockMouseInterval: -1,
		mousePos: { x : 0, y : 0 },

		create_div: function (parent_id, settings) {
			if ((!parent_id) && (!document.getElementById(parent_id)))
				return;
			this.cout++;
			container = document.createElement("div");
			container.id = "scrollable-container-id" + this.cout;
			textElem = document.createElement("div");
			textElem.id = "conteiner_id" + this.cout;
			textElem.contentEditable = "true";
	
			var deffaul_settings = {
				position: "absolute",
				overflow: "hidden",
				width: "",
				height: "",
				left: "10px",
				right: "10px",
				top: "90px",
				bottom: "5px",
			};
			for (var i in settings)
				deffaul_settings[i] = settings[i];
			
			for (var i in deffaul_settings)
				container.style[i] = deffaul_settings[i];
			
			var inner_settings = {
				minWidth: "98%",
				minHeight: "95%",
				width: "fit-content",
				height: "fit-content",
				padding: "0 15px 15px 0",
				outline: "none",
				whiteSpace: "pre",
				float: "left"
			}
			if (navigator.userAgent.search(/Firefox/) > 0)
			{
				inner_settings.width = "-moz-fit-content";
				inner_settings.height = "-moz-fit-content";
			}
			for (var i in inner_settings)
				textElem.style[i] = inner_settings[i];
	
			container.appendChild(textElem);
			$(container).insertAfter(("#" + parent_id));
			ScrollableDiv.initialize();
		}, 

		updateScroll: function (div)
		{
			Ps.update();

			if (!div.parentNode)
				return;
				
			var _elemV = div.parentNode.getElementsByClassName("ps__rail-y")[0];
			var _elemH = div.parentNode.getElementsByClassName("ps__rail-x")[0];
			
			if (!_elemH || !_elemV)
				return;

			var _styleV = window.getComputedStyle(_elemV);
			var _styleH = window.getComputedStyle(_elemH);

			var _visibleV = (_styleV && _styleV.display == "none") ? false : true;
			var _visibleH = (_styleH && _styleH.display == "none") ? false : true;

			if (_visibleH && _visibleV)
			{
				if ("13px" != _elemV.style.marginBottom)
					_elemV.style.marginBottom = "13px";
				if ("13px" != _elemH.style.marginRight)
					_elemH.style.marginRight = "13px";
			}
			else
			{
				if ("2px" != _elemV.style.marginBottom)
					_elemV.style.marginBottom = "2px";
				if ("2px" != _elemH.style.marginRight)
					_elemH.style.marginRight = "2px";
			}
		},

		onSelectWheel: function (div)
		{
			var $textElem = $(div);
			var position = $textElem.offset();
			
			var width = $textElem.outerWidth();
			var height = $textElem.outerHeight();
			
			var maxX = div.scrollWidth;
			var maxY = div.scrollHeight;
					
			var scrollX = div.scrollLeft;
			var scrollY = div.scrollTop;
			
			var left = position.left;
			var top = position.top;
			
			var step = 20;
			if (ScrollableDiv.mousePos.x < left)
				scrollX -= step;
			else if (ScrollableDiv.mousePos.x > (left + width))
				scrollX += step;

			if (ScrollableDiv.mousePos.y < top)
				scrollY -= step;
			else if (ScrollableDiv.mousePos.y > (top + height))
				scrollY += step;
		
			if (scrollX < 0)
				scrollX = 0;
			if (scrollX > maxX)
				scrollX = maxX;
			if (scrollY < 0)
				scrollY = 0;
			if (scrollY > maxY)
				scrollY = maxY;
			
			div.scrollLeft = scrollX;
			div.scrollTop = scrollY;
		},

		initialize: function() {			
			Ps = new PerfectScrollbar('#' + container.id, {});
		},

		addEventListener: function() {
			textElem.oninput = function(e){
				ScrollableDiv.updateScroll(this);
				ScrollableDiv.updateScroll(this);
			};

			window.addEventListener('mouseup', function() {
		
				if (-1 != ScrollableDiv.lockMouseInterval)
					clearInterval(ScrollableDiv.lockMouseInterval);
				ScrollableDiv.lockMouseInterval = -1;
				
			}, false);

			window.addEventListener('mousemove', function(e) {
		
				if (-1 == ScrollableDiv.lockMouseInterval)
					return;
				
				ScrollableDiv.mousePos.x = e.pageX || e.clientX;
				ScrollableDiv.mousePos.y = e.pageY || e.clientY;
			
			}, false);

			container.onmouseup = function(e) {
		
				if (-1 != ScrollableDiv.lockMouseInterval)
					clearInterval(ScrollableDiv.lockMouseInterval);
				ScrollableDiv.lockMouseInterval = -1;
				
			};

			container.onmousedown = function(e) {
				if (-1 == ScrollableDiv.lockMouseInterval)
					ScrollableDiv.lockMouseInterval = setInterval(ScrollableDiv.onSelectWheel, 20, this);
				
				ScrollableDiv.mousePos.x = e.pageX || e.clientX;
				ScrollableDiv.mousePos.y = e.pageY || e.clientY;
						
			};
		}
	};
	var ScrollableDiv = window.Asc.ScrollableDiv;
	})(window,undefined);