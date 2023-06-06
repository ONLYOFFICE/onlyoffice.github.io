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
(function(window, undefined){

	window.Asc.plugin.init = function()
	{

		// $('#btn_prev').on('click', function() {
		// 	var text = $('#inp_search').val();
		// 	window.Asc.plugin.executeMethod("SearchText",[text, false]);
		// });

		// $('#btn_next').on('click', function() {
		// 	var text = $('#inp_search').val();
		// 	window.Asc.plugin.executeMethod("SearchText",[text, true]);
		// });

		document.getElementById("btn_bg").onclick = () => {
			var strcolor = document.getElementById("inp_color").value;
			var r = parseInt(strcolor[1] + strcolor[2], 16),
				g = parseInt(strcolor[3] + strcolor[4], 16),
				b = parseInt(strcolor[5] + strcolor[6], 16);
			Asc.scope.color = {
				r : r,
				g : g,
				b : b,
				isNone : false
			};
			window.Asc.plugin.callCommand(function() {
				var oDocument = Api.GetDocument();
				var range = oDocument.GetRangeBySelect();
				range.SetHighlight(Asc.scope.color.r, Asc.scope.color.g, Asc.scope.color.b, Asc.scope.color.isNone);
			}, false, true);
		}

		document.getElementById('btn_bgAll').onclick = () => {
			var strcolor = document.getElementById("inp_color").value;
			var r = parseInt(strcolor[1] + strcolor[2], 16),
				g = parseInt(strcolor[3] + strcolor[4], 16),
				b = parseInt(strcolor[5] + strcolor[6], 16);
			Asc.scope.color = {
				text : document.getElementById("inp_search").value,
				r : r,
				g : g,
				b : b,
				isNone : false
			};
			window.Asc.plugin.callCommand(function() {
				var oDocument = Api.GetDocument();
				var arrRanges = oDocument.Search(Asc.scope.color.text, false);
				for (var i = 0; i < arrRanges.length; i++) {
					arrRanges[i].SetHighlight(Asc.scope.color.r, Asc.scope.color.g, Asc.scope.color.b, Asc.scope.color.isNone);
				}
			}, false, true);
		}

		document.getElementById("btn_resetColor").onclick = () => {
			window.Asc.plugin.callCommand(function() {
				var oDocument = Api.GetDocument();
				var range = oDocument.GetRangeBySelect();
				range.SetHighlight(null, null, null, true);
			}, false, true);
		}

		// $( "#inp_search" ).keydown(function( event ) {
		// 	if ( event.which == 13 ) {
		// 		$( "#btn_next" ).click();
		// 	}
		// });
	};

	window.Asc.plugin.button = function()
	{
		this.executeCommand("close", "");
	};

})(window, undefined);