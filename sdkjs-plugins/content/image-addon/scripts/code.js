/**
 * Image Addon – Cloudflare Workers AI + Free Stock (Wallhaven, Unsplash, Picsum, Pexels, Pixabay)
 * Standalone, no background service, themed, with resize toggle.
 */
(function(window, undefined){
	const STORAGE_ACCOUNT = "cf-image-account-id";
	const STORAGE_TOKEN   = "cf-image-api-token";
	const STORAGE_WORKER  = "cf-image-worker-url";
	const STORAGE_RESIZE  = "cf-image-resize-toggle";
	const MODEL_ID = "@cf/black-forest-labs/flux-1-schnell";

	let elements = {};
	let lastImageDataUrl = "";
	let lastStockUrl = "";

	function showStatus(msg, isError){
		if (!elements.status) return;
		elements.status.textContent = msg || "";
		elements.status.className = isError ? "status status-error show" : (msg ? (msg.includes("Generating")||msg.includes("Searching") ? "status status-loading show" : "status status-ok show") : "status");
		if (elements.genLoader) {
			if (msg && (msg.includes("Generating")||msg.includes("Searching"))) elements.genLoader.classList.add("show");
			else elements.genLoader.classList.remove("show");
		}
		if (msg) console.log("[Image Addon] status:", msg);
		updateSettingsSummary();
	}
	function showStockStatus(msg, isError){
		if (!elements.stockStatus) return;
		elements.stockStatus.textContent = msg || "";
		elements.stockStatus.className = isError ? "status status-error show" : (msg ? "status status-ok show" : "status");
		if (msg) console.log("[Image Addon][Stock] status:", msg);
	}

	function updateSettingsSummary(){
		if (!elements.settingsSummary) return;
		const acc = elements.accountId.value.trim();
		const worker = elements.workerUrl.value.trim();
		if (worker) elements.settingsSummary.textContent = "Worker: " + worker;
		else if (acc) elements.settingsSummary.textContent = "Direct: " + acc.substring(0,8) + "…";
		else elements.settingsSummary.textContent = "Not configured — click Configure";
	}

	function saveSettings(){
		localStorage.setItem(STORAGE_ACCOUNT, elements.accountId.value.trim());
		localStorage.setItem(STORAGE_TOKEN, elements.apiToken.value.trim());
		localStorage.setItem(STORAGE_WORKER, elements.workerUrl.value.trim());
		localStorage.setItem(STORAGE_RESIZE, elements.resizeToggle.classList.contains("on") ? "1" : "0");
		showStatus("Settings saved", false);
		updateSettingsSummary();
	}
	function loadSettings(){
		elements.accountId.value = localStorage.getItem(STORAGE_ACCOUNT) || "";
		elements.apiToken.value  = localStorage.getItem(STORAGE_TOKEN) || "";
		elements.workerUrl.value = localStorage.getItem(STORAGE_WORKER) || "";
		const resize = localStorage.getItem(STORAGE_RESIZE);
		if (resize==="1") elements.resizeToggle.classList.add("on");
		else elements.resizeToggle.classList.remove("on");
		// stock key
		const stockKey = localStorage.getItem("cf-image-stock-key") || "";
		if (elements.stockKey) elements.stockKey.value = stockKey;
		updateSettingsSummary();
		updateStockKeyVisibility();
	}

	function getConfig(){
		return {
			accountId: elements.accountId.value.trim(),
			token: elements.apiToken.value.trim(),
			workerUrl: elements.workerUrl.value.trim(),
			prompt: elements.prompt.value.trim(),
			widthMm: parseFloat(elements.width.value) || 100,
			heightMm: parseFloat(elements.height.value) || 100,
			style: elements.style.value || "realistic",
			resize: elements.resizeToggle.classList.contains("on")
		};
	}

	function updateStockKeyVisibility(){
		const prov = elements.stockProvider.value;
		const needsKey = prov==="unsplash" || prov==="pexels";
		elements.stockKey.style.display = needsKey ? "block" : "none";
		const hint = document.getElementById("stock-hint");
		if (hint) {
			if (prov==="wallhaven") hint.textContent = "Wallhaven: no key needed. SFW, search any term.";
			else if (prov==="unsplash-source") hint.textContent = "Unsplash Source: no key, random images for query (via source.unsplash.com).";
			else if (prov==="picsum") hint.textContent = "Picsum: no key, random placeholders (picsum.photos).";
			else if (prov==="unsplash") hint.textContent = "Unsplash: enter Access Key (https://unsplash.com/developers).";
			else if (prov==="pexels") hint.textContent = "Pexels: enter API Key (https://www.pexels.com/api/).";
		}
	}

	function isDesktop(){ return /AscDesktopEditor/.test(navigator.userAgent); }

	function requestViaAscSimpleRequest(url, method, headers, body){
		return new Promise((resolve, reject)=>{
			if (!window.AscSimpleRequest || !window.AscSimpleRequest.createRequest) return reject(new Error("AscSimpleRequest not available"));
			window.AscSimpleRequest.createRequest({
				url, method, headers, body: body ? JSON.stringify(body) : "",
				complete: function(e){
					try{
						const text = e.responseText;
						const data = text ? JSON.parse(text) : {};
						resolve({ok:true, status:200, json:()=>Promise.resolve(data), text:()=>Promise.resolve(text)});
					}catch(err){ reject(err); }
				},
				error: function(e, status, error){
					const code = e && e.statusCode ? e.statusCode : status;
					reject(new Error(error || ("HTTP "+code)));
				}
			});
		});
	}
	function requestViaExternalFetch(url, options){
		return new Promise((resolve, reject)=>{
			if (!window.Asc || !window.Asc.plugin || !window.Asc.plugin.sendEvent) return reject(new Error("External fetch not available"));
			if (!window.externalFetchRecords) {
				window.externalFetchRecords = {counter:0, requests:{}};
				window.Asc.plugin.attachEditorEvent("ai_onExternalFetch", function(e){
					const req = window.externalFetchRecords.requests[e.id];
					if (!req) return;
					if (e.type==="error"){ if(req.controller) req.controller.close(); req.resolve(new Error(e.error)); delete window.externalFetchRecords.requests[e.id]; return; }
					if (e.type==="response"){
						if (req.streaming){ const s=new ReadableStream({start(c){req.controller=c;}}); const r=new Response(s,{status:e.status, headers:e.headers}); req.resolve(r); }
						else { const r=new Response(e.body,{status:e.status, headers:e.headers}); req.resolve(r); delete window.externalFetchRecords.requests[e.id]; }
					}
					if (e.type==="chunk" && req.streaming && req.controller) req.controller.enqueue(new TextEncoder().encode(e.chunk));
					if (e.type==="end" && req.streaming && req.controller){ req.controller.close(); delete window.externalFetchRecords.requests[e.id]; }
				});
			}
			const id = ++window.externalFetchRecords.counter;
			window.externalFetchRecords.requests[id] = {resolve, reject, streaming:false, controller:null};
			window.Asc.plugin.sendEvent("ai_onExternalFetch", {id, url:"[external]"+url, options, streaming:false, type:"request"});
			setTimeout(()=>{ if(window.externalFetchRecords.requests[id]){ delete window.externalFetchRecords.requests[id]; reject(new Error("External fetch timeout")); } }, 30000);
		});
	}
	async function doFetch(url, options){
		if (isDesktop() && window.AscSimpleRequest) {
			try{ const body = options.body ? JSON.parse(options.body) : undefined; const r=await requestViaAscSimpleRequest(url, options.method||"POST", options.headers||{}, body); return r; }catch(e){ console.warn("[Image Addon] AscSimpleRequest failed", e); }
		}
		if (isDesktop()) {
			try{ const r=await requestViaExternalFetch(url, options); return r; }catch(e){ console.warn("[Image Addon] fetchExternal failed", e); }
		}
		const r=await fetch(url, options); return r;
	}

	async function generateImage(prompt){
		const cfg = getConfig();
		const effectivePrompt = (prompt && prompt.trim()) ? prompt.trim() : cfg.prompt;
		if (!effectivePrompt) throw new Error("Prompt is required");
		const widthPx = (cfg.widthMm/25.4)*96+0.5>>0;
		const heightPx = (cfg.heightMm/25.4)*96+0.5>>0;
		let fullPrompt = cfg.style ? `${cfg.style} style, ${effectivePrompt}, image size ${widthPx}x${heightPx} pixels` : effectivePrompt;
		if (cfg.workerUrl) {
			let workerUrl = cfg.workerUrl.replace(/\/$/, "");
			if (!workerUrl.endsWith("/generate")) workerUrl += "/generate";
			console.log("[Image Addon] Worker", workerUrl);
			const resp = await doFetch(workerUrl, {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({prompt: fullPrompt})});
			const data = await resp.json();
			if (!resp.ok) throw new Error(data.error || `Worker HTTP ${resp.status}`);
			let image = data.image || (data.result && data.result.image) || data.data;
			if (!image) throw new Error("No image in Worker response");
			if (!image.startsWith("data:") && !image.startsWith("http")) {
				if (image.startsWith("iVBOR")) image="data:image/png;base64,"+image;
				else if (image.startsWith("/9j/")) image="data:image/jpeg;base64,"+image;
				else if (image.length>100 && /^[A-Za-z0-9+/=\r\n]+$/.test(image.trim())) image="data:image/jpeg;base64,"+image.trim().replace(/\s/g,"");
			}
			return image;
		} else {
			if (!cfg.accountId) throw new Error("Account ID required");
			if (!cfg.token) throw new Error("API Token required");
			const url = `https://api.cloudflare.com/client/v4/accounts/${cfg.accountId}/ai/run/${MODEL_ID}`;
			console.log("[Image Addon] Direct", url);
			const resp = await doFetch(url, {method:"POST", headers:{"Content-Type":"application/json","Authorization":`Bearer ${cfg.token}`}, body: JSON.stringify({prompt: fullPrompt})});
			const data = await resp.json();
			console.log("[Image Addon] direct keys", Object.keys(data).join(","));
			if (!resp.ok || data.success===false) {
				const err = data.errors ? JSON.stringify(data.errors) : (data.error || `HTTP ${resp.status}`);
				throw new Error(err);
			}
			let image = data.result && data.result.image;
			if (!image) throw new Error("No image in Cloudflare response");
			if (!image.startsWith("data:")) {
				if (image.startsWith("iVBOR")) image="data:image/png;base64,"+image;
				else if (image.startsWith("/9j/")) image="data:image/jpeg;base64,"+image;
				else image="data:image/jpeg;base64,"+image.trim().replace(/\s/g,"");
			}
			return image;
		}
	}

	async function insertImage(dataUrl, widthMm, heightMm, useResize){
		const cfg = getConfig();
		const resize = typeof useResize==="boolean" ? useResize : cfg.resize;
		let wEmu = Math.round(widthMm * 36000);
		let hEmu = Math.round(heightMm * 36000);
		if (!resize) {
			try{
				const img=new Image(); img.src=dataUrl; await img.decode();
				wEmu=Math.round(img.naturalWidth*9525);
				hEmu=Math.round(img.naturalHeight*9525);
			}catch(e){ console.warn("[Image Addon] decode failed, fallback", e); }
		}
		let urlForDoc=dataUrl;
		// For remote stock URLs (http), keep as is but try GetLocalImagePath for desktop
		if (dataUrl.startsWith("http")) {
			try{
				if (window.Asc && window.Asc.Library && window.Asc.Library.GetLocalImagePath) {
					const ver=await window.Asc.Library.GetEditorVersion();
					if (ver>=9000000) {
						const local=await window.Asc.Library.GetLocalImagePath(dataUrl);
						if (local && !local.error && local.url) urlForDoc=local.url;
					}
				}
			}catch(e){}
		} else {
			try{
				if (window.Asc && window.Asc.Library && window.Asc.Library.GetLocalImagePath) {
					const ver=await window.Asc.Library.GetEditorVersion();
					if (ver>=9000000) {
						const local=await window.Asc.Library.GetLocalImagePath(dataUrl);
						if (local && !local.error && local.url) urlForDoc=local.url;
					}
				} else if (window.Asc && window.Asc.plugin) {
					const local=await new Promise(res=>{ window.Asc.plugin.executeMethod("getLocalImagePath", [dataUrl], r=>res(r)); });
					if (local && !local.error && local.url) urlForDoc=local.url;
				}
			}catch(e){}
		}
		const editorType=window.Asc.plugin.info.editorType;
		console.log("[Image Addon] inserting", editorType, wEmu, hEmu, "resize", resize);
		if (editorType==="word") {
			window.Asc.scope=window.Asc.scope||{};
			window.Asc.scope.imageUrl=urlForDoc; window.Asc.scope.width=wEmu; window.Asc.scope.height=hEmu;
			await window.Asc.plugin.callCommand(function(){
				const doc=Api.GetDocument(); const para=Api.CreateParagraph();
				const img=Api.CreateImage(Asc.scope.imageUrl, Asc.scope.width, Asc.scope.height);
				if (!img) return {error:"createImage_failed"};
				para.AddDrawing(img); doc.InsertContent([para], true); return {ok:true};
			}, false, true, ret=>{ if(ret&&ret.error) throw new Error(ret.error); });
		} else if (editorType==="cell") {
			window.Asc.scope=window.Asc.scope||{}; window.Asc.scope.imageUrl=urlForDoc; window.Asc.scope.width=wEmu; window.Asc.scope.height=hEmu;
			await window.Asc.plugin.callCommand(function(){ const ws=Api.GetActiveSheet(); ws.AddImage(Asc.scope.imageUrl, Asc.scope.width, Asc.scope.height, 0,0,0,0); return {ok:true}; }, false, true);
		} else if (editorType==="slide") {
			window.Asc.scope=window.Asc.scope||{}; window.Asc.scope.imageUrl=urlForDoc; window.Asc.scope.width=wEmu; window.Asc.scope.height=hEmu;
			await window.Asc.plugin.callCommand(function(){ const pres=Api.GetPresentation(); const s=pres.GetCurrentSlide(); if(!s) return {error:"no slide"}; const img=Api.CreateImage(Asc.scope.imageUrl, Asc.scope.width, Asc.scope.height); s.AddObject(img); return {ok:true}; }, false, true);
		} else throw new Error("Unsupported editor: "+editorType);
	}

	// Stock
	async function searchStock(query, provider, apiKey){
		query = query.trim();
		if (!query) throw new Error("Search query required");
		console.log("[Image Addon][Stock] search", provider, query);
		if (provider==="wallhaven") {
			const url=`https://wallhaven.cc/api/v1/search?q=${encodeURIComponent(query)}&categories=111&purity=100&sorting=relevance&order=desc`;
			const resp=await doFetch(url, {method:"GET"});
			const data=await resp.json();
			if (!resp.ok) throw new Error(data.error||`Wallhaven HTTP ${resp.status}`);
			// data.data is array
			return (data.data||[]).slice(0,12).map(it=>({
				thumb: it.thumbs?.small || it.thumbs?.large || it.path,
				full: it.path,
				title: (it.category||"")+" "+(it.resolution||"")
			}));
		} else if (provider==="unsplash-source") {
			// No API, generate 12 source URLs with sig
			const out=[];
			for(let i=0;i<12;i++){
				const sig=i;
				const thumb=`https://source.unsplash.com/400x300/?${encodeURIComponent(query)}&sig=${sig}`;
				const full=`https://source.unsplash.com/1200x800/?${encodeURIComponent(query)}&sig=${sig}`;
				out.push({thumb, full, title: query});
			}
			return out;
		} else if (provider==="picsum") {
			// https://picsum.photos/v2/list
			const url=`https://picsum.photos/v2/list?page=${1+Math.floor(Math.random()*5)}&limit=12`;
			const resp=await doFetch(url, {method:"GET"});
			const data=await resp.json();
			return data.slice(0,12).map(it=>({
				thumb: `https://picsum.photos/id/${it.id}/300/200`,
				full: `https://picsum.photos/id/${it.id}/1200/800`,
				title: it.author
			}));
		} else if (provider==="unsplash") {
			if (!apiKey) throw new Error("Unsplash Access Key required in Stock API key field");
			const url=`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12&client_id=${apiKey}`;
			const resp=await doFetch(url, {method:"GET", headers:{"Accept-Version":"v1"}});
			const data=await resp.json();
			if (!resp.ok) throw new Error(data.errors ? data.errors[0] : `Unsplash HTTP ${resp.status}`);
			return (data.results||[]).map(it=>({
				thumb: it.urls.thumb,
				full: it.urls.full || it.urls.regular,
				title: it.alt_description || it.description || query
			}));
		} else if (provider==="pexels") {
			if (!apiKey) throw new Error("Pexels API Key required");
			const url=`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=12`;
			const resp=await doFetch(url, {method:"GET", headers:{"Authorization": apiKey}});
			const data=await resp.json();
			if (!resp.ok) throw new Error(`Pexels HTTP ${resp.status}`);
			return (data.photos||[]).map(it=>({
				thumb: it.src.medium,
				full: it.src.large2x || it.src.large,
				title: it.alt || query
			}));
		} else {
			throw new Error("Unknown provider");
		}
	}

	function renderStockGrid(items){
		elements.stockGrid.innerHTML="";
		items.forEach((it, idx)=>{
			const div=document.createElement("div");
			div.className="stock-item";
			div.innerHTML=`<img src="${it.thumb}" loading="lazy"><div class="overlay">${it.title||""}</div>`;
			div.addEventListener("click", ()=>{
				// select
				document.querySelectorAll(".stock-item").forEach(el=> el.style.borderColor="");
				div.style.borderColor="var(--primary)";
				lastStockUrl=it.full;
				elements.stockPreviewImg.src=it.full;
				elements.stockPreview.style.display="flex";
				elements.stockPreviewImg.style.display="block";
				elements.btnStockInsert.disabled=false;
				showStockStatus("Selected – click Insert", false);
			});
			elements.stockGrid.appendChild(div);
		});
	}

	window.Asc.plugin.init = function(){
		elements = {
			prompt: document.getElementById("prompt"),
			width: document.getElementById("width"),
			height: document.getElementById("height"),
			style: document.getElementById("style"),
			accountId: document.getElementById("accountId"),
			apiToken: document.getElementById("apiToken"),
			workerUrl: document.getElementById("workerUrl"),
			status: document.getElementById("status"),
			stockStatus: document.getElementById("stock-status"),
			previewImg: document.getElementById("preview-img"),
			placeholder: document.getElementById("placeholder"),
			btnGenerate: document.getElementById("btn-generate"),
			btnInsert: document.getElementById("btn-insert"),
			btnSave: document.getElementById("btn-save-settings"),
			btnTest: document.getElementById("btn-test"),
			toggleSettings: document.getElementById("toggle-settings"),
			settings: document.getElementById("settings"),
			settingsSummary: document.getElementById("settings-summary"),
			genLoader: document.getElementById("gen-loader"),
			resizeToggle: document.getElementById("resize-toggle"),
			stockQuery: document.getElementById("stock-query"),
			stockProvider: document.getElementById("stock-provider"),
			stockKey: document.getElementById("stock-key"),
			btnStockSearch: document.getElementById("btn-stock-search"),
			stockGrid: document.getElementById("stock-grid"),
			stockPreview: document.getElementById("stock-preview"),
			stockPreviewImg: document.getElementById("stock-preview-img"),
			btnStockInsert: document.getElementById("btn-stock-insert")
		};

		// Tabs
		document.querySelectorAll(".tab").forEach(tab=>{
			tab.addEventListener("click", ()=>{
				document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
				document.querySelectorAll(".tab-panel").forEach(p=>p.classList.remove("active"));
				tab.classList.add("active");
				document.getElementById("panel-"+tab.dataset.tab).classList.add("active");
			});
		});

		loadSettings();
		updateStockKeyVisibility();
		if (elements.stockProvider) elements.stockProvider.addEventListener("change", updateStockKeyVisibility);
		if (elements.stockKey) elements.stockKey.addEventListener("change", ()=> localStorage.setItem("cf-image-stock-key", elements.stockKey.value.trim()));

		elements.toggleSettings.addEventListener("click", ()=>{ 
			elements.settings.classList.toggle("show");
			elements.settings.style.display = elements.settings.classList.contains("show") ? "block" : "none";
		});
		elements.resizeToggle.addEventListener("click", ()=>{
			elements.resizeToggle.classList.toggle("on");
			localStorage.setItem(STORAGE_RESIZE, elements.resizeToggle.classList.contains("on")?"1":"0");
		});

		elements.btnSave.addEventListener("click", saveSettings);
		elements.btnTest.addEventListener("click", async ()=>{
			try{
				showStatus("Testing...", false);
				const cfg=getConfig();
				if (cfg.workerUrl) { showStatus("Worker URL set – test via Generate", false); return; }
				if (!cfg.accountId || !cfg.token) throw new Error("Set Account ID and Token first");
				const testImg=await generateImage("test");
				showStatus("Test succeeded, length "+testImg.length, false);
			}catch(e){ showStatus("Test failed: "+e.message, true); console.error(e); }
		});

		elements.btnGenerate.addEventListener("click", async ()=>{
			const cfg=getConfig();
			if (!cfg.prompt) { showStatus("Prompt required", true); return; }
			if (!cfg.workerUrl && (!cfg.accountId || !cfg.token)) { showStatus("Set Account ID + Token or Worker URL in Settings", true); elements.settings.classList.add("show"); elements.settings.style.display="block"; return; }
			elements.btnGenerate.disabled=true; elements.btnInsert.disabled=true;
			showStatus("Generating...", false);
			elements.previewImg.style.display="none"; elements.placeholder.style.display="block"; elements.placeholder.innerHTML='<div class="icon-large">⏳</div><div>Generating...</div>';
			try{
				const dataUrl=await generateImage(cfg.prompt);
				lastImageDataUrl=dataUrl;
				elements.previewImg.src=dataUrl; elements.previewImg.style.display="block"; elements.placeholder.style.display="none";
				elements.btnInsert.disabled=false; showStatus("Generated – click Insert", false);
			}catch(e){
				showStatus("Generation failed: "+(e.message||e), true); console.error(e);
				elements.placeholder.innerHTML='<div class="icon-large">⚠️</div><div>Failed – check Settings and console</div>';
				elements.placeholder.style.display="block";
			}finally{ elements.btnGenerate.disabled=false; }
		});

		elements.btnInsert.addEventListener("click", async ()=>{
			if (!lastImageDataUrl) { showStatus("Generate first", true); return; }
			elements.btnInsert.disabled=true; showStatus("Inserting...", false);
			try{
				const cfg=getConfig();
				await insertImage(lastImageDataUrl, cfg.widthMm, cfg.heightMm);
				showStatus("Inserted into document", false);
			}catch(e){ showStatus("Insert failed: "+e.message, true); console.error(e); }finally{ elements.btnInsert.disabled=false; }
		});

		// Stock handlers
		elements.btnStockSearch.addEventListener("click", async ()=>{
			const q=elements.stockQuery.value.trim();
			const prov=elements.stockProvider.value;
			const key=elements.stockKey.value.trim();
			if (!q) { showStockStatus("Enter search query", true); return; }
			if ((prov==="unsplash"||prov==="pexels") && !key) { showStockStatus("API key required for "+prov, true); return; }
			if (key) localStorage.setItem("cf-image-stock-key", key);
			elements.btnStockSearch.disabled=true; showStockStatus("Searching...", false);
			elements.stockGrid.innerHTML=""; lastStockUrl=""; elements.btnStockInsert.disabled=true; elements.stockPreview.style.display="none";
			try{
				const items=await searchStock(q, prov, key);
				if (!items.length) { showStockStatus("No results", true); return; }
				renderStockGrid(items);
				showStockStatus(`Found ${items.length} images – click to preview, then Insert`, false);
			}catch(e){ showStockStatus("Search failed: "+e.message, true); console.error(e); }finally{ elements.btnStockSearch.disabled=false; }
		});
		elements.stockQuery.addEventListener("keydown", e=>{ if(e.key==="Enter") elements.btnStockSearch.click(); });
		elements.btnStockInsert.addEventListener("click", async ()=>{
			if (!lastStockUrl) { showStockStatus("Select an image first", true); return; }
			elements.btnStockInsert.disabled=true; showStockStatus("Inserting...", false);
			try{
				const cfg=getConfig();
				// For stock, respect resize toggle as well
				await insertImage(lastStockUrl, cfg.widthMm, cfg.heightMm);
				showStockStatus("Inserted into document", false);
			}catch(e){ showStockStatus("Insert failed: "+e.message, true); console.error(e); }finally{ elements.btnStockInsert.disabled=false; }
		});
		// Enter on prompt generates
		elements.prompt.addEventListener("keydown", e=>{ if(e.ctrlKey && e.key==="Enter") elements.btnGenerate.click(); });

		window.Asc.plugin.onThemeChanged = function(theme){
			window.Asc.plugin.onThemeChangedBase(theme);
			const isDark = theme.type==="dark";
			document.documentElement.classList.toggle("dark", isDark);
			document.body.classList.toggle("dark", isDark);
		};
		// Apply initial theme
		const initialTheme = window.Asc.plugin.theme || {};
		if (initialTheme.type==="dark") { document.documentElement.classList.add("dark"); document.body.classList.add("dark"); }
	};

	window.Asc.plugin.button = function(id){ if(id==-1) this.executeCommand("close",""); };

})(window, undefined);
