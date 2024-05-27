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
// 下午先用http-serve试下能不能给本地的插件弄上去，不行的话给波波一份试试。在这个编辑器实例上挂载两个属性，就是searchSrtList和replaceStrList ，试试看看通过这个能不能动态的去更新

function batchReplacement(searchSrtList, replaceStrList) {
	searchSrtList.forEach((i, idx) => {
		var oProperties = {
			"searchString": i,
			"replaceString": replaceStrList[idx],
			"matchCase": false
		};
		//method for search and replace in documents
		window.Asc.plugin.executeMethod("SearchAndReplace", [oProperties]);
	})
}

(function (window, undefined) {

	window.Asc.plugin.init = function () {
	};

	window.Asc.plugin.button = function (id) {
		this.executeCommand("close", "");
	};
	window.Asc.plugin.event_onDocumentContentReady = function () {
		//event document is ready
		//all events are specified in the config file in the "events" field
		// var oProperties = {
		// 	"searchString"  : "ONLYOFFICE",
		// 	"replaceString" : "ONLYOFFICE is cool",
		// 	"matchCase"     : false
		// };
		// //method for search and replace in documents
		// window.Asc.plugin.executeMethod("SearchAndReplace", [oProperties], function() {
		//     window.Asc.plugin.executeCommand("close", "");
		// });
		window.Asc.plugin.executeMethod("InputText", [window?.DocEditor?.config]);
		let searchSrtList = ['请输入业务名称', '请输入业务类型', '请输入业务编号', '请输入业务金额', '请输入业务日期', '请输入业务摘要', '请输入主体名称']
		let replaceStrList = ['核销', '核销', '001', 1000, '2020-01-01', '核销摘要', '核销主体']

		if (window.DocEditor?.config?.searchSrtList) searchSrtList = window.DocEditor.config.searchSrtList
		if (window.DocEditor?.config?.replaceStrList) searchSrtList = window.DocEditor.config.replaceStrList
		batchReplacement(searchSrtList, replaceStrList)
	};

})(window, undefined);



