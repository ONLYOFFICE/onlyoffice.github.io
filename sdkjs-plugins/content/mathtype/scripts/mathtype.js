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
(function(window, undefined) {
	const langs_map = {
		"ca-CA": "ca",
		"zh-ZH": "zh",
		"cs-CS": "cs",
		"da-DA": "da",
		"nl-NL": "nl",
		"en-EN": "en",
		"fi-FI": "fi",
		"fr-FR": "fr",
		"de-DE": "de",
		"el-EL": "el",
		"hu-HU": "hu",
		"id-ID": "id",
		"it-IT": "it",
		"ja-JA": "ja",
		"ko-KO": "ko",
		"nb-NB": "nb",
		"pl-PL": "pl",
		"pt-PT": "pt",
		"pt-BR": "pt_br",
		"ro-RO": "ro",
		"ru-RU": "ru",
		"es-ES": "es",
		"sv-SV": "sv",
		"tr-TR": "tr"
	};

	let genericIntegrationInstance;
	let mathML = null;
	let oEditor;
	let wsTelemetry = {
		toolbar : 'general',
		trigger : 'button',
		startTime : 0,
		curMathML : '',
		bChemisty : window.location.href.search("type=chemistry") !== -1
	};

	window.Asc.plugin.init = function(data) {
		if (data) {
			try {
				data = JSON.parse(data);
				mathML = data.mathML;
				wsTelemetry.bChemisty = data.bChemisty;
				wsTelemetry.trigger = 'formula';
			} catch (error) {
				// error in json
			}
		}
		
		let onLoadFunc = function() {
			if (mathML)
				genericIntegrationInstance.core.contentManager.setMathML(mathML);

			genericIntegrationInstance.telemeter.wrsOpenedEditorModal(wsTelemetry.toolbar, wsTelemetry.trigger);
			oEditor = genericIntegrationInstance.core.contentManager.editor;
			wsTelemetry.startTime = Date.now();
		};

		let genericIntegrationProperties = {};
		genericIntegrationProperties.target = document.getElementById('htmlEditor');
		genericIntegrationProperties.toolbar = document.getElementById('toolbar');
		
		genericIntegrationInstance = new WirisPlugin.GenericIntegration(genericIntegrationProperties);

		// setting language
		if (langs_map[window.Asc.plugin.info.lang] != undefined)
			genericIntegrationInstance.editorParameters = { language: langs_map[window.Asc.plugin.info.lang] };

		genericIntegrationInstance.init();
		genericIntegrationInstance.listeners.fire('onTargetReady', {});
		WirisPlugin.currentInstance = this.wiris_generic;

		if (wsTelemetry.bChemisty) {
			const A = genericIntegrationInstance.getCore().getCustomEditors();
			A.enable("chemistry"),
			genericIntegrationInstance.openNewFormulaEditor();
			wsTelemetry.toolbar = 'chemistry';
		} else {
			genericIntegrationInstance.core.getCustomEditors().disable();
			genericIntegrationInstance.openNewFormulaEditor();
		}

		genericIntegrationInstance.core.contentManager.listeners.add({eventName: "onLoad", callback: onLoadFunc});
		WirisPlugin.Configuration.properties.saveMode = "base64";
		window.Asc.plugin.resizeWindow(600, 310, 600, 395, 0, 0);
	};

	function add_to_document(sMethod, oParams) {
		let endTime = Date.now() - wsTelemetry.startTime;
		genericIntegrationInstance.telemeter.wrsInsertedFormula(mathML, wsTelemetry.curMathML, endTime, wsTelemetry.toolbar);
		window.Asc.plugin.executeMethod("GetVersion", [], function(version) {
			let nMajorV = Number(version.split('.')[0]);
			let nMinorV = Number(version.split('.')[1]);
			if (sMethod === "AddOleObject") {
				if ((version === "develop" || (nMajorV >= 7 && nMinorV >= 2)) && window.Asc.plugin.info.editorType === "word") {
					oParams.height = oParams.height * 36000.0; // convert to EMU
					oParams.width  = oParams.width * 36000.0; // convert to EMU
					window.Asc.scope.params = oParams;
					window.Asc.plugin.callCommand(function() {
						let oDocument = Api.GetDocument();
						if (!Api.CreateOleObject)
							return false;
							
						let oOleObject = Api.CreateOleObject(Asc.scope.params.imgSrc, Asc.scope.params.width, Asc.scope.params.height, Asc.scope.params.data, Asc.scope.params.guid);
						let oPara = Api.CreateParagraph();
						let oRun = Api.CreateRun();
						oRun.SetPosition(Asc.scope.params.position);
						oRun.AddDrawing(oOleObject);
						oPara.Push(oRun);
						oDocument.InsertContent([oPara], true);
					}, null, null, function() { closeWithTelemetry('mtct_insert'); } );
				} else {
					window.Asc.plugin.executeMethod(sMethod, [oParams], function() { closeWithTelemetry('mtct_insert'); } );
				}
			} else { // EditOleObject
				window.Asc.plugin.executeMethod(sMethod, [oParams], function() { closeWithTelemetry('mtct_insert'); } );
			}
		});
	};
	
	function paste_formula() {
		function createHTMLElementFromString(htmlString) {
			let div = document.createElement('div');
			div.innerHTML = htmlString.trim();
			return div.firstChild;
		};
		
		wsTelemetry.curMathML = oEditor.getMathML()
		// don't paste empy data
		if (wsTelemetry.curMathML === '<math xmlns="http://www.w3.org/1998/Math/MathML"/>')
			return;

		let oImg = createHTMLElementFromString(WirisPlugin.Parser.initParse(wsTelemetry.curMathML)); 
		oImg.onload = function() {
			let oInfo = window.Asc.plugin.info;
			let sMethod = (oInfo.objectId === undefined) ? "AddOleObject" : "EditOleObject";
			let nFormulaSourceHeight = oEditor.editorModel.formulaModel.getHeight();
			let nFormulaSourceWidth = oEditor.editorModel.formulaModel.getWidth();
			let nBaseLineFromTop = oEditor.editorModel.getFormulaBaseline();
			let nPositionMM = -((nFormulaSourceHeight - nBaseLineFromTop) / (oInfo.mmToPx))
			let nPosition =  2 * (nPositionMM / (25.4 / 72.0)) + (nPositionMM / (25.4 / 72.0)); // convert to hps
			this.width *= 5;
			this.height *= 5;
			let canvas = document.createElement("canvas");
			canvas.width = this.width;
			canvas.height = this.height;
			let oCtx = canvas.getContext('2d');
			oCtx.drawImage(this, 0, 0, canvas.width, canvas.height);
			let base64png = canvas.toDataURL();
			let data = JSON.stringify({
				mathML: wsTelemetry.curMathML,
				bChemisty: wsTelemetry.bChemisty
			});
			let oParams = {
				guid:      oInfo.guid,
				position:  nPosition, 
				width:     nFormulaSourceWidth / oInfo.mmToPx,
				height:    nFormulaSourceHeight / oInfo.mmToPx,
				imgSrc:    base64png,
				data:      data,
				objectId:  oInfo.objectId,
				resize:    oInfo.resize
			};
			add_to_document(sMethod, oParams);
		};
	};

	function closeWithTelemetry(trigger) {
		genericIntegrationInstance.telemeter.wrsClosedEditorModal(wsTelemetry.toolbar, trigger).finally(function(){
			window.Asc.plugin.executeCommand("close", "");
		});
	};

	window.Asc.plugin.button = function(id) {
		if (id === 0) {
			paste_formula();
		}
		else {
			closeWithTelemetry('mtct_close');
		}
	};

	window.Asc.plugin.onExternalMouseUp = function() {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
			false, false, false, false, 0, null);

		document.dispatchEvent(evt);
	};

})(window, undefined);
