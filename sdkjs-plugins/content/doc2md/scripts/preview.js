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
(function(window, undefined){
	let loader = null;
	let Ps = null;

	window.Asc.plugin.init = function() {
		createLoader();
		Ps = new PerfectScrollbar('#container', {});
		// send message that modal window is ready
		window.Asc.plugin.sendToPlugin("onDoc2MdMessage");	
	};

	function createLoader() {
		$('#loader-container').removeClass( "hidden" );
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = showLoader($('#loader-container')[0], window.Asc.plugin.tr('Loading...'));
	};

	function destroyLoader() {
		$('#loader-container').addClass( "hidden" )
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = undefined;
	};

	function mergeOptions(options) {
		const defaults = getDefaults();
		const opts = {};
		const invalidOptions = [
		  'renderer',
		  'tokenizer',
		  'walkTokens',
		  'extensions',
		  'highlight',
		  'sanitizer'
		];
		for (const prop in defaults) {
		  opts[prop] = invalidOptions.includes(prop) || !(prop in options)
			? defaults[prop]
			: options[prop];
		}
		return opts;
	};

	function getDefaults() {
		let defaults = {};
		if (typeof marked.getDefaults === 'function') {
		  defaults = marked.getDefaults();
		  delete defaults.renderer;
		} else if ('defaults' in marked) {
		  for (const prop in marked.defaults) {
			if (prop !== 'renderer') {
			  defaults[prop] = marked.defaults[prop];
			}
		  }
		}
		return defaults;
	};

	const ALLOWED_ATTRS = {
		a: ['href'], blockquote: [], br: [], code: [], del: [], em: [],
		h1: ['id'], h2: ['id'], h3: ['id'], h4: ['id'], h5: ['id'], h6: ['id'],
		hr: [], img: ['src', 'alt'], li: [], ol: ['start'], p: [], pre: [], span: [],
		strong: [], sub: [], sup: [], table: [], thead: [], tbody: [], tr: [],
		th: ['align'], td: ['align'], ul: []
	};
	const DROPPED_TAGS = ['script', 'style', 'template', 'noscript', 'iframe', 'object', 'embed', 'svg', 'math'];
	const ALLOWED_STYLES = ['color', 'background-color', 'text-align', 'font-weight', 'font-style', 'text-decoration'];

	function sanitizeHtml(sHtml) {
		// DOMParser builds an inert document: no scripts run and no resources load
		let oDoc = new DOMParser().parseFromString(sHtml, 'text/html');
		cleanNode(oDoc.body);
		let oFragment = document.createDocumentFragment();
		oFragment.append(...oDoc.body.childNodes);
		return oFragment;
	};

	function cleanNode(oNode) {
		for (const oChild of Array.from(oNode.childNodes)) {
			if (oChild.nodeType === Node.TEXT_NODE)
				continue;
			if (oChild.nodeType !== Node.ELEMENT_NODE) {
				oChild.remove();
				continue;
			}
			let sTag = oChild.localName;
			if (DROPPED_TAGS.includes(sTag)) {
				oChild.remove();
				continue;
			}
			cleanNode(oChild);
			if (!ALLOWED_ATTRS.hasOwnProperty(sTag)) {
				oChild.replaceWith(...oChild.childNodes);
				continue;
			}
			for (const oAttr of Array.from(oChild.attributes)) {
				if (oAttr.name === 'style') {
					let sStyle = filterStyle(oChild.style);
					if (sStyle)
						oChild.setAttribute('style', sStyle);
					else
						oChild.removeAttribute('style');
					continue;
				}
				let isAllowed = ALLOWED_ATTRS[sTag].includes(oAttr.name);
				if (isAllowed && (oAttr.name === 'href' || oAttr.name === 'src'))
					isAllowed = isSafeUrl(oAttr.value, oAttr.name === 'src');
				if (!isAllowed)
					oChild.removeAttribute(oAttr.name);
			}
		}
	};

	function filterStyle(oStyle) {
		// values come back normalized by the CSS parser, so they cannot break out of their declaration
		let arrRules = [];
		for (const sProp of ALLOWED_STYLES) {
			let sValue = oStyle.getPropertyValue(sProp);
			if (sValue && !/url\(|image-set\(/i.test(sValue))
				arrRules.push(sProp + ': ' + sValue);
		}
		return arrRules.join('; ');
	};

	function isSafeUrl(sUrl, isImage) {
		let sValue = sUrl.trim();
		if (!isImage && sValue.startsWith('#'))
			return true;
		if (isImage && /^data:image\/(png|jpe?g|gif|bmp|webp);base64,/i.test(sValue))
			return true;
		try {
			let sProtocol = new URL(sValue, window.location.href).protocol;
			return sProtocol === 'http:' || sProtocol === 'https:' || (!isImage && sProtocol === 'mailto:');
		} catch (e) {
			return false;
		}
	};

	window.Asc.plugin.attachEvent("onDoc2MdData", function(message) {
		let result = message.data;
		if (message.type === 'markdown') {
			const options = mergeOptions({});
			const lexed = marked.lexer(message.data, options);
			result = marked.parser(lexed, options);
		}
		document.getElementById('preview').replaceChildren(sanitizeHtml(result));
		Ps && Ps.update();
		destroyLoader();
	});

})(window, undefined);
