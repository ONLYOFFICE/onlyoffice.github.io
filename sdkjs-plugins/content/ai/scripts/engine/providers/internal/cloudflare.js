/*
 * (c) Copyright Ascensio System SIA 2010-2025
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

"use strict";

class Provider extends AI.Provider {

	constructor() {
		// url can be either Worker URL (https://...) or Cloudflare Account ID (32 hex chars)
		// key is API Token for direct Cloudflare mode; worker mode can leave key empty
		super("Cloudflare", "", "", "");
		this.weight = 90;
	}

	getModels() {
		return [
			{
				id: "@cf/black-forest-labs/flux-1-schnell",
				name: "FLUX.1 Schnell"
			}
		];
	}

	checkModelCapability(model) {
		model.endpoints.push(AI.Endpoints.Types.v1.Images_Generations);
		return AI.CapabilitiesUI.Image;
	}

	isUseProxy() {
		// Direct Cloudflare API (api.cloudflare.com) has no CORS for onlyoffice://plugin
		// and file:// – must use native AscSimpleRequest on desktop and ONLYOFFICE
		// proxy on web. Worker mode already sends CORS but proxy is harmless.
		return true;
	}

	_isDirectMode() {
		let u = (this.url || "").trim();
		if (!u) return false;
		if (u.includes("api.cloudflare.com"))
			return true;
		// Worker URLs always start with http and not api.cloudflare.com
		if (u.startsWith("http://") || u.startsWith("https://"))
			return false;
		// Otherwise treat as Account ID (direct Cloudflare API)
		// Cloudflare Account ID is 32 hex chars, but be permissive: any non-URL string
		return true;
	}

	getEndpointUrl(endpoint, model, options) {
		let Types = AI.Endpoints.Types;
		if (endpoint === Types.v1.Images_Generations) {
			let u = (this.url || "").trim();
			// Direct Cloudflare API mode: url is Account ID or full api URL containing api.cloudflare.com
			if (u && (this._isDirectMode() || u.includes("api.cloudflare.com"))) {
				// If user pasted full API URL already containing /ai/run/, use it as-is
				if (u.startsWith("http://") || u.startsWith("https://")) {
					if (u.includes("/ai/run/"))
						return "";
					// If url is https://api.cloudflare.com/client/v4/accounts/{id}
					if (u.includes("accounts/")) {
						let modelId = model && model.id ? model.id : "@cf/black-forest-labs/flux-1-schnell";
						if (!modelId.startsWith("@cf/"))
							modelId = "@cf/black-forest-labs/flux-1-schnell";
						return "/ai/run/" + modelId;
					}
				}
				// Direct mode with bare Account ID → absolute URL
				let accountId = u;
				let m = u.match(/accounts\/([a-f0-9]{32})/i);
				if (m) accountId = m[1];
				let modelId = model && model.id ? model.id : "@cf/black-forest-labs/flux-1-schnell";
				if (!modelId.startsWith("@cf/"))
					modelId = "@cf/black-forest-labs/flux-1-schnell";
				return "https://api.cloudflare.com/client/v4/accounts/" + accountId + "/ai/run/" + modelId;
			}
			// Worker proxy mode: url is https://... → append /generate
			if (!u || u.startsWith("http://") || u.startsWith("https://")) {
				if (!u) return "/generate";
				if (u.endsWith("/generate"))
					return "";
				if (u.indexOf("/generate") !== -1)
					return "";
				return "/generate";
			}
			// Fallback (should not happen) → treat as Account ID
			let accountId = u;
			let modelId = model && model.id ? model.id : "@cf/black-forest-labs/flux-1-schnell";
			if (!modelId.startsWith("@cf/"))
				modelId = "@cf/black-forest-labs/flux-1-schnell";
			return "https://api.cloudflare.com/client/v4/accounts/" + accountId + "/ai/run/" + modelId;
		}
		return super.getEndpointUrl(endpoint, model, options);
	}

	getRequestHeaderOptions() {
		let headers = {
			"Content-Type" : "application/json"
		};
		if (this.key)
			headers["Authorization"] = "Bearer " + this.key;
		return headers;
	}

	getImageGeneration(message, model) {
		// Debug logging — never log tokens
		console.log("[Cloudflare] provider selected:", this.name);
		console.log("[Cloudflare] model:", model ? model.id : "unknown");
		console.log("[Cloudflare] prompt length:", message.prompt ? message.prompt.length : 0);
		// Worker proxy expects { prompt: "..." } — no API token
		return {
			prompt : message.prompt
		};
	}

	async getImageGenerationResult(message, model) {
		// message is unwrapped by requestWrapper: { error, data } or raw JSON
		// Support both { image: "data:..." } from worker proxy
		// and { result: { image: "<base64>" } } from direct Cloudflare API
		let data = (message && message.data) ? message.data : message;
		if (!data) {
			console.log("[Cloudflare] response status: empty");
			console.log("[Cloudflare] image data exists: false, length: 0");
			return "";
		}

		// Log keys without dumping full base64
		try {
			console.log("[Cloudflare] response keys:", Object.keys(data).join(","));
			if (data.result && typeof data.result === "object")
				console.log("[Cloudflare] result keys:", Object.keys(data.result).join(","));
		} catch(e) {}

		let imageUrl = "";
		let getProp = function(name) {
			if (message[name] !== undefined)
				return message[name];
			if (message.data && message.data[name] !== undefined)
				return message.data[name];
			return undefined;
		};

		// 1) Worker proxy: { image: "data:image/jpeg;base64,..." } or { image: "data:image/png;base64,..." }
		if (!imageUrl) {
			let img = getProp("image");
			if (img && typeof img === "string" && img.length > 0)
				imageUrl = img;
		}

		// 2) Direct Cloudflare Workers AI: { result: { image: "<base64>" } }
		if (!imageUrl) {
			let result = getProp("result");
			if (result) {
				if (typeof result === "string" && result.length > 0) {
					imageUrl = result;
				} else if (result.image && typeof result.image === "string" && result.image.length > 0) {
					imageUrl = result.image;
				}
			}
		}

		// 3) Fallback to generic OpenAI/Stability shapes (rare for Cloudflare, but keep for robustness)
		if (!imageUrl) {
			let d = getProp("data");
			if (d && d[0] && d[0].b64_json)
				imageUrl = d[0].b64_json;
			if (!imageUrl) {
				let artifacts = getProp("artifacts");
				if (artifacts && artifacts[0] && artifacts[0].base64)
					imageUrl = artifacts[0].base64;
			}
		}

		if (!imageUrl) {
			// Check for error payloads — never report success if failed
			let err = data.error || data.errors || data.message;
			if (err) {
				console.log("[Cloudflare] response error payload:", typeof err === "string" ? err.substring(0,300) : JSON.stringify(err).substring(0,300));
			} else {
				console.log("[Cloudflare] no image data found, preview:", JSON.stringify(data).substring(0,500));
			}
			console.log("[Cloudflare] image data exists: false, length: 0");
			return "";
		}

		// Normalize to data URI if raw base64
		if (!imageUrl.startsWith("data:")) {
			if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://") || imageUrl.startsWith("blob:")) {
				// remote URL — keep as is, getBase64FromUrl will fetch/canvas
			} else if (imageUrl.startsWith("iVBOR")) {
				imageUrl = "data:image/png;base64," + imageUrl;
			} else if (imageUrl.startsWith("/9j/")) {
				imageUrl = "data:image/jpeg;base64," + imageUrl;
			} else if (imageUrl.startsWith("R0lGOD")) {
				imageUrl = "data:image/gif;base64," + imageUrl;
			} else {
				// Heuristic: long base64 string -> treat as jpeg (FLUX outputs jpeg)
				let trimmed = imageUrl.trim();
				if (trimmed.length > 100 && /^[A-Za-z0-9+/=\r\n]+$/.test(trimmed)) {
					// Worker proxy should already include mime prefix, but direct Cloudflare returns raw
					imageUrl = "data:image/jpeg;base64," + trimmed.replace(/\s/g, "");
				} else {
					console.warn("[Cloudflare] unexpected image format, prefix:", imageUrl.substring(0,30));
				}
			}
		}

		console.log("[Cloudflare] image data exists: true, length:", imageUrl.length);

		// Keep as base64/data URI — do not write to disk
		// Use helper to ensure proper data URI; handles data: passthrough
		let finalUrl = "";
		try {
			finalUrl = await AI.ImageEngine.getBase64FromUrl(imageUrl);
		} catch(e) {
			console.warn("[Cloudflare] getBase64FromUrl exception", e);
			finalUrl = imageUrl;
		}

		if (!finalUrl) {
			console.warn("[Cloudflare] getBase64FromUrl returned empty, fallback to raw");
			console.log("[Cloudflare] final image length: 0");
			return "";
		}

		console.log("[Cloudflare] final image length:", finalUrl.length);
		return finalUrl;
	}

}
