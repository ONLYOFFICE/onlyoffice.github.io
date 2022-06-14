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

window.onload = function() {
	//todo
};

localStorage.setItem('ui-theme-id',"theme-light");

let installed = [
	{
		url : "https://raw.githubusercontent.com/ONLYOFFICE/plugin-autocomplete/master/config.json",
		guid : "A103601F-FDA0-418A-BC37-A514031894C0",
		canRemoved : true,
		obj : {
				name: "example_autocomplete",
				guid: "asc.{A103601F-FDA0-418A-BC37-A514031894C0}",
				version: "1.0.0",
				variations: [
								{
									description: "example_autocomplete",
									url: "index.html",
									icons: ["resources/img/icon.png","resources/img/icon@2x.png"],
									isViewer: false,
									EditorsSupport: ["word","slide","cell"],
									isVisual: false,
									isModal: false,
									isInsideMode: false,
									isSystem: true,
									initDataType: "none",
									initData: "",
									isUpdateOleOnResize: false,
									buttons: [],
									events: ["onInputHelperClear","onInputHelperInput"]
								}
							]
			  }
	},
	{
		url : "https://raw.githubusercontent.com/ONLYOFFICE/plugin-macros/master/config.json",
		guid : "E6978D28-0441-4BD7-8346-82FAD68BCA3B",
		canRemoved : false,
		obj : {
				name: "Macros", 
				nameLocale: {
								ru: "Макросы",
								fr: "Macros",
								es: "Macros",
								de: "Makros"
							},
				guid: "asc.{E6978D28-0441-4BD7-8346-82FAD68BCA3B}",
				version: "1.0.0",
				group: {
							name: "Macros",
							rank: 2
					   },
				variations: [
								{
									description: "Macros",
									descriptionLocale: {
															ru: "Макросы",
															fr: "Macros",
															es: "Macros",
															de:"Makros"
													   },
									url: "index.html",
									help: "https://api.onlyoffice.com/plugin/macros",
									icons: ["resources/light/icon.png","resources/light/icon@2x.png"],
									icons2: [
												{
													style: "light",
													"100%": {
																normal: "resources/light/icon.png"
															},
													"125%": {
																normal: "resources/light/icon@1.25x.png"
															},
													"150%": {
																normal: "resources/light/icon@1.5x.png"
															},
													"175%": {
																normal: "resources/light/icon@1.75x.png"
															},
													"200%": {
																normal:"resources/light/icon@2x.png"
															}
												},
												{
													style: "dark", 
													"100%": {
																normal:"resources/dark/icon.png"
															},
													"125%": {
																normal: "resources/dark/icon@1.25x.png"
															},
													"150%": {
																normal: "resources/dark/icon@1.5x.png"
															},
													"175%": {
																normal: "resources/dark/icon@1.75x.png"
															},
													"200%": {
																normal: "resources/dark/icon@2x.png"
															}
												}
											],
									isViewer: false,
									EditorsSupport: ["word","cell","slide"],
									isVisual: true,
									isModal: true,
									isInsideMode: false,
									initDataType: "",
									initData: "",
									isUpdateOleOnResize: false,
									buttons: [
												{
													text: "Ok",
													primary: true
												},
												{
													text: "Cancel",
													primary: false,
													textLocale: {
																	ru:"Отмена",
																	fr:"Annuler",
																	es:"Cancelar",
																	de:"Abbrechen"
																}
												}
											 ]
								}
							]
			}
	},
	{
		url : "https://raw.githubusercontent.com/ONLYOFFICE/plugin-mendeley/master/config.json",
		guid : "BE5CBF95-C0AD-4842-B157-AC40FEDD9441",
		canRemoved : true,
		obj : {
				name: "Mendeley",
				guid: "asc.{BE5CBF95-C0AD-4842-B157-AC40FEDD9441}",
				version: "1.0.0",
				variations: [
								{
									description: "Mendeley",
									url: "index.html",
									icons: ["resources/light/icon.png","resources/light/icon@2x.png"],
									icons2: [
												{
													style: "light",
													"100%": {
																normal:"resources/light/icon.png"
															},
													"125%": {
																normal: "resources/light/icon@1.25x.png"
															},
													"150%": {
																normal:"resources/light/icon@1.5x.png"
															},
													"175%": {
																normal: "resources/light/icon@1.75x.png"
															},
													"200%": {
																normal: "resources/light/icon@2x.png"
															}
												},
												{
													style: "dark",
													"100%": {
																normal: "resources/dark/icon.png"
															},
													"125%": {
																normal: "resources/dark/icon@1.25x.png"
															},
													"150%": {
																normal: "resources/dark/icon@1.5x.png"
															},
													"175%": {
																normal: "resources/dark/icon@1.75x.png"
															},
													"200%": {
																normal: "resources/dark/icon@2x.png"
															}
												}
											],
									isViewer: false,
									EditorsSupport: ["word"],
									initDataType: "text",
									initData: "",
									isVisual: true,
									isModal: false,
									isInsideMode: true,
									isUpdateOleOnResize: false,
									initOnSelectionChanged: false
								}
							]
			}
	},
	{
		url : "https://raw.githubusercontent.com/ONLYOFFICE/plugin-deepl/master/config.json",
		guid : "b78a062b-e349-4634-8a44-99825600d299",
		canRemoved : true,
		obj : {
				name: "DeepL",
				nameLocale: {
					ru: "DeepL",
					fr: "DeepL",
					es: "DeepL",
					de: "DeepL"
				},
				guid: "asc.{b78a062b-e349-4634-8a44-99825600d299}",
				version: "1.0.0",
			
				variations: [
					{
						description: "Translator",
						descriptionLocale: {
							"ru": "DeepL",
							"fr": "DeepL",
							"es": "DeepL",
							"de": "DeepL"
						},
						url: "index.html",
			
						icons: [ "resources/light/icon.png", "resources/light/icon@2x.png" ],
						icons2: [
							{
								theme : "flat",
								style : "light",
								
								"100%": {
									normal: "resources/light/icon.png"
								},
								"125%": {
									normal: "resources/light/icon@1.25x.png"
								},
								"150%": {
									normal: "resources/light/icon@1.5x.png"
								},
								"175%": {
									normal: "resources/light/icon@1.75x.png"
								},
								"200%": {
									normal: "resources/light/icon@2x.png"
								},
								default: {
									normal: "resources/light/icon.png"
								}
							},
							{
								theme : "flatDark",
								style : "dark",
								
								"100%": {
									normal: "resources/dark/icon.png"
								},
								"125%": {
									normal: "resources/dark/icon@1.25x.png"
								},
								"150%": {
									normal: "resources/dark/icon@1.5x.png"
								},
								"175%": {
									normal: "resources/dark/icon@1.75x.png"
								},
								"200%": {
									normal: "resources/dark/icon@2x.png"
								}
							}
						],
						isViewer: true,
						EditorsSupport: [ "word", "slide", "cell" ],
						isVisual: true,
						isModal: false,
						isInsideMode: true,
						initDataType: "text",
						initData: "",
						isUpdateOleOnResize: false,
						buttons: [],
						initOnSelectionChanged: true
					}
				]
			}
	}
]

window.addEventListener("message", function(message) {
	let data = JSON.parse(message.data);
	let iframe = this.document.getElementById('frameEditor');
	let dataMessage = {
		guid : "asc.{AA2EA9B6-9EC2-415F-9762-634EE8D9A95E}",
		type : "onExternalPluginMessage",
		data : {
			type: "getInstalled",
			data: null
		}
	};

	switch (data.type) {
		case 'getInstalled':
			message.source.postMessage({type: 'installed', data: installed}, "*");
			iframe.contentWindow.postMessage(JSON.stringify(dataMessage), "*");
			break;
		case 'install':
			dataMessage.data.type = 'install';
			dataMessage.data.data = data.url;
			iframe.contentWindow.postMessage(JSON.stringify(dataMessage), "*");
			break;
		case 'remove':
			dataMessage.data.type = 'remove';
			dataMessage.data.data = data.guid;
			iframe.contentWindow.postMessage(JSON.stringify(dataMessage), "*");
			break;
		case 'update':
			dataMessage.data.type = 'update';
			dataMessage.data.data = data.url;
			iframe.contentWindow.postMessage(JSON.stringify(dataMessage), "*");
			break;
	}

	if(data.type == 'onExternalPluginMessageCallback') {
		console.log('onExternalPluginMessageCallback');
		console.log(data);
	}
	
	console.log(message.data);
}, false);

