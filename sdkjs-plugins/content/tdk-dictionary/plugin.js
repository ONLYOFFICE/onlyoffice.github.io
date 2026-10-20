(function (window, undefined) {

    let searchInput, searchBtn, statusMsg, resultsContainer, charKeyboard;
    let btnOnline, btnOffline, autocompleteList;
    let currentMode = "online"; // 'online' veya 'offline'
    let offlineDatabase = null;
    let isDbLoading = false;
    let wordList = null;
    let isWordListLoading = false;
    let activeSuggestionIndex = -1;
    let currentSuggestions = [];

    window.Asc.plugin.init = function (text) {
        searchInput = document.getElementById("search-input");
        searchBtn = document.getElementById("search-btn");
        statusMsg = document.getElementById("status-message");
        resultsContainer = document.getElementById("results-container");
        charKeyboard = document.getElementById("char-keyboard");
        btnOnline = document.getElementById("btn-mode-online");
        btnOffline = document.getElementById("btn-mode-offline");
        autocompleteList = document.getElementById("autocomplete-list");

        // Kelime listesini (otomatik tamamlama için) arka planda yükle
        loadWordList();

        // Kayıtlı modu hatırlama (varsayılan: online)
        try {
            const savedMode = localStorage.getItem("tdk_dict_mode");
            if (savedMode === "offline" || savedMode === "online") {
                setSearchMode(savedMode);
            }
        } catch (e) {}

        // Mod Değiştirme Butonları
        if (btnOnline && btnOffline) {
            btnOnline.onclick = function () {
                setSearchMode("online");
            };
            btnOffline.onclick = function () {
                setSearchMode("offline");
            };
        }

        // Arama butonu ve Enter tuşu
        searchBtn.onclick = function () {
            hideAutocomplete();
            const word = searchInput.value.trim();
            if (word) {
                lookupWord(word);
            }
        };

        // Arama kutusuna yazıldıkça (input eventi) dropdown önerileri göster
        searchInput.oninput = function () {
            const query = searchInput.value.trim().toLocaleLowerCase('tr-TR');
            if (!query || query.length < 2) {
                hideAutocomplete();
                return;
            }
            showSuggestions(query);
        };

        // Klavye yön tuşları ve Enter ile dropdown'da gezinme
        searchInput.onkeydown = function (e) {
            if (autocompleteList && autocompleteList.style.display !== "none") {
                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    navigateSuggestions(1);
                    return;
                } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    navigateSuggestions(-1);
                    return;
                } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
                    e.preventDefault();
                    selectSuggestion(currentSuggestions[activeSuggestionIndex]);
                    return;
                } else if (e.key === "Escape") {
                    hideAutocomplete();
                    return;
                }
            }

            if (e.key === "Enter") {
                searchBtn.click();
            }
        };

        // Dışarı tıklayınca öneri kutusunu kapat
        document.addEventListener("click", function (e) {
            if (!e.target.closest(".input-wrapper")) {
                hideAutocomplete();
            }
        });

        // Şapkalı ve Türkçe karakter butonlarına tıklama
        if (charKeyboard) {
            charKeyboard.onclick = function (e) {
                const btn = e.target.closest(".char-btn");
                if (!btn) return;
                const char = btn.getAttribute("data-char");
                insertAtCursor(searchInput, char);
                // Karakter eklenince de önerileri tazele
                searchInput.dispatchEvent(new Event("input"));
            };
        }

        // Belgeden seçilen bir kelime gelmişse doğrudan ara
        if (text && typeof text === "string") {
            const cleanText = text.trim();
            if (cleanText) {
                searchInput.value = cleanText;
                lookupWord(cleanText);
            }
        }
    };

    function setSearchMode(mode) {
        currentMode = mode;
        try {
            localStorage.setItem("tdk_dict_mode", mode);
        } catch (e) {}

        if (mode === "online") {
            btnOnline.classList.add("active");
            btnOffline.classList.remove("active");
            statusMsg.textContent = "Mod: Çevrim İçi";
        } else {
            btnOffline.classList.add("active");
            btnOnline.classList.remove("active");
            statusMsg.textContent = "Mod: Çevrim Dışı";
            // Veritabanını arka planda önden yüklemeye başla
            ensureDatabaseLoaded();
        }

        // Eğer arama kutusunda kelime varsa yeni modla tekrar ara
        const currentWord = searchInput ? searchInput.value.trim() : "";
        if (currentWord) {
            lookupWord(currentWord);
        }
    }

    async function loadWordList() {
        if (wordList || isWordListLoading) return;
        isWordListLoading = true;
        try {
            const resp = await fetch("words.json");
            if (resp.ok) {
                wordList = await resp.json();
            }
        } catch (e) {
            console.error("Kelime listesi yüklenemedi:", e);
        } finally {
            isWordListLoading = false;
        }
    }

    function showSuggestions(query) {
        if (!wordList || !autocompleteList) return;

        // Prefix ve içerir eşleşmeleri bul (En fazla 10 öneri)
        const exactPrefix = [];
        const contains = [];

        for (let i = 0; i < wordList.length; i++) {
            const w = wordList[i];
            if (w.startsWith(query)) {
                exactPrefix.push(w);
                if (exactPrefix.length >= 10) break;
            } else if (w.includes(query) && contains.length < 5) {
                contains.push(w);
            }
        }

        currentSuggestions = exactPrefix.concat(contains).slice(0, 10);

        if (currentSuggestions.length === 0) {
            hideAutocomplete();
            return;
        }

        activeSuggestionIndex = -1;
        autocompleteList.innerHTML = "";

        currentSuggestions.forEach((itemWord, idx) => {
            const li = document.createElement("li");
            li.className = "autocomplete-item";
            
            // Eşleşen kısmı vurgula
            const matchIndex = itemWord.indexOf(query);
            let highlighted = escapeHtml(itemWord);
            if (matchIndex >= 0) {
                const before = escapeHtml(itemWord.substring(0, matchIndex));
                const match = escapeHtml(itemWord.substring(matchIndex, matchIndex + query.length));
                const after = escapeHtml(itemWord.substring(matchIndex + query.length));
                highlighted = `${before}<strong>${match}</strong>${after}`;
            }

            li.innerHTML = `<span>${highlighted}</span><span class="autocomplete-hint">TDK</span>`;
            li.onmousedown = function (e) {
                e.preventDefault(); // Inputun blur olmasını engelle
                selectSuggestion(itemWord);
            };
            autocompleteList.appendChild(li);
        });

        autocompleteList.style.display = "block";
    }

    function navigateSuggestions(direction) {
        if (!currentSuggestions.length || !autocompleteList) return;
        const items = autocompleteList.querySelectorAll(".autocomplete-item");

        if (activeSuggestionIndex >= 0 && items[activeSuggestionIndex]) {
            items[activeSuggestionIndex].classList.remove("active");
        }

        activeSuggestionIndex += direction;
        if (activeSuggestionIndex >= currentSuggestions.length) {
            activeSuggestionIndex = 0;
        } else if (activeSuggestionIndex < 0) {
            activeSuggestionIndex = currentSuggestions.length - 1;
        }

        if (items[activeSuggestionIndex]) {
            items[activeSuggestionIndex].classList.add("active");
            items[activeSuggestionIndex].scrollIntoView({ block: "nearest" });
            searchInput.value = currentSuggestions[activeSuggestionIndex];
        }
    }

    function selectSuggestion(word) {
        if (!word) return;
        searchInput.value = word;
        hideAutocomplete();
        lookupWord(word);
    }

    function hideAutocomplete() {
        if (autocompleteList) {
            autocompleteList.style.display = "none";
            autocompleteList.innerHTML = "";
            activeSuggestionIndex = -1;
            currentSuggestions = [];
        }
    }

    async function ensureDatabaseLoaded() {
        if (offlineDatabase || isDbLoading) return;
        isDbLoading = true;
        statusMsg.textContent = "Yerel veritabanı belleğe yükleniyor...";

        try {
            const response = await fetch("data.json");
            if (!response.ok) throw new Error("data.json yüklenemedi");
            offlineDatabase = await response.json();
            statusMsg.textContent = "Yerel veritabanı hazır (99.000+ kelime).";
        } catch (err) {
            console.error("Yerel veritabanı yükleme hatası:", err);
            statusMsg.textContent = "Yerel veritabanı yüklenemedi!";
        } finally {
            isDbLoading = false;
        }
    }

    // İmlecin olduğu yere karakter ekleme fonksiyonu
    function insertAtCursor(inputEl, text) {
        const start = inputEl.selectionStart || inputEl.value.length;
        const end = inputEl.selectionEnd || inputEl.value.length;
        const val = inputEl.value;
        inputEl.value = val.substring(0, start) + text + val.substring(end);
        inputEl.selectionStart = inputEl.selectionEnd = start + text.length;
        inputEl.focus();
    }

    window.Asc.plugin.onTranslate = function () {};
    window.Asc.plugin.onMethodReturn = function (returnValue) {};

    // Belgede metin seçimi değiştikçe tetiklenir
    window.Asc.plugin.event_onTargetPositionChanged = function () {
        window.Asc.plugin.executeMethod("GetSelectedText", [], function (selectedText) {
            if (selectedText && typeof selectedText === "string") {
                const clean = selectedText.trim();
                if (clean && !clean.includes(" ") && clean.length > 1 && clean !== searchInput.value.trim()) {
                    searchInput.value = clean;
                    lookupWord(clean);
                }
            }
        });
    };

    window.Asc.plugin.button = function (id) {
        this.executeCommand("close", "");
    };

    async function lookupWord(rawWord) {
        const word = rawWord.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'<>\[\]\\|]/g, "").trim();
        if (!word) return;

        const lookupKey = word.toLocaleLowerCase('tr-TR');
        resultsContainer.innerHTML = "";

        if (currentMode === "online") {
            await lookupOnline(word, lookupKey);
        } else {
            await lookupOffline(word, lookupKey);
        }
    }

    async function lookupOnline(originalWord, key) {
        statusMsg.textContent = `"${originalWord}" canlı TDK'de aranıyor...`;
        statusMsg.style.color = "#64748b";

        try {
            const response = await fetch(`https://sozluk.gov.tr/gts?ara=${encodeURIComponent(key)}`);
            if (!response.ok) throw new Error("Sunucu yanıt vermedi");
            const data = await response.json();

            if (!data || data.error || !Array.isArray(data) || data.length === 0) {
                statusMsg.textContent = "";
                resultsContainer.innerHTML = `
                    <div class="empty-state">
                        <strong>"${originalWord}"</strong> sözlükte bulunamadı.<br>
                        <small style="color:#94a3b8; margin-top:6px; display:inline-block;">Dilerseniz Çevrim Dışı sekmesinden de aratabilirsiniz.</small>
                    </div>`;
                return;
            }

            statusMsg.textContent = "";
            renderOnlineResults(data);

        } catch (err) {
            console.error("TDK sorgu hatası:", err);
            statusMsg.textContent = "";
            resultsContainer.innerHTML = `
                <div class="empty-state" style="color:#dc2626;">
                    İnternet bağlantısı kurulamadı.<br>
                    <small style="color:#475569; display:block; margin-top:6px;">
                        Yukarıdan <strong>💾 Çevrim Dışı</strong> seçeneğine tıklayarak internetsiz arayabilirsiniz.
                    </small>
                </div>`;
        }
    }

    async function lookupOffline(originalWord, key) {
        if (!offlineDatabase) {
            await ensureDatabaseLoaded();
        }

        if (!offlineDatabase) {
            resultsContainer.innerHTML = `
                <div class="empty-state" style="color:#dc2626;">
                    Yerel veritabanı dosyası yüklenemedi.
                </div>`;
            return;
        }

        statusMsg.textContent = "";
        const entries = offlineDatabase[key] || offlineDatabase[originalWord.toLowerCase()];

        if (!entries || entries.length === 0) {
            // Küçük büyük i / İ toleransı için alternatif arama
            const altKey = key.replace(/i/g, "ı").replace(/İ/g, "I");
            const altEntries = offlineDatabase[altKey];

            if (altEntries) {
                renderOfflineResults(altEntries);
                return;
            }

            resultsContainer.innerHTML = `
                <div class="empty-state">
                    <strong>"${originalWord}"</strong> yerel veritabanında bulunamadı.<br>
                    <small style="color:#94a3b8; margin-top:6px; display:inline-block;">Yazımı kontrol edin veya Canlı TDK modunu deneyin.</small>
                </div>`;
            return;
        }

        renderOfflineResults(entries);
    }

    // ONLINE SONUÇ RENDER
    function renderOnlineResults(entries) {
        resultsContainer.innerHTML = "";

        entries.forEach((item) => {
            const entryEl = document.createElement("div");
            entryEl.className = "entry-block";

            let lisanText = item.lisan ? `<span class="word-origin">(${escapeHtml(item.lisan)})</span>` : "";

            let html = `
                <div class="word-header">
                    <div class="word-title">
                        ${escapeHtml(item.madde || "")}
                        ${lisanText}
                        <span class="source-badge online">Çevrim İçi</span>
                    </div>
                </div>
            `;

            if (item.anlamlarListe && item.anlamlarListe.length > 0) {
                item.anlamlarListe.forEach((anlamObj, idx) => {
                    let typeBadge = "";
                    if (anlamObj.ozelliklerListe && anlamObj.ozelliklerListe.length > 0) {
                        const types = anlamObj.ozelliklerListe.map(o => o.tam_adi).join(", ");
                        typeBadge = `<span class="type-badge">${escapeHtml(types)}</span>`;
                    }

                    let ornekHtml = "";
                    if (anlamObj.orneklerListe && anlamObj.orneklerListe.length > 0) {
                        const ornek = anlamObj.orneklerListe[0];
                        let yazar = (ornek.yazar && ornek.yazar.length > 0 && ornek.yazar[0].tam_adi) ? `— ${escapeHtml(ornek.yazar[0].tam_adi)}` : "";
                        ornekHtml = `
                            <div class="example-box">
                                "${escapeHtml(ornek.ornek)}"
                                ${yazar ? `<span class="example-author">${yazar}</span>` : ""}
                            </div>
                        `;
                    }

                    html += `
                        <div class="meaning-card">
                            <div>
                                <span class="meaning-num">${idx + 1}</span>
                                ${typeBadge}
                            </div>
                            <div class="meaning-text">${escapeHtml(anlamObj.anlam || "")}</div>
                            ${ornekHtml}
                        </div>
                    `;
                });
            }

            if (item.birlesikler) {
                const arr = item.birlesikler.split(",").map(s => s.trim()).filter(Boolean);
                if (arr.length > 0) {
                    html += `<div class="section-title">🔗 Birleşik Sözler</div><div class="tag-list">`;
                    arr.forEach(b => {
                        html += `<span class="tag-item" onclick="window.tdkSearchTag('${escapeHtml(b)}')">${escapeHtml(b)}</span>`;
                    });
                    html += `</div>`;
                }
            }

            if (item.atasozu && item.atasozu.length > 0) {
                html += `<div class="section-title">💡 Atasözü ve Deyimler</div><div class="tag-list">`;
                item.atasozu.forEach(a => {
                    if (a.madde) {
                        html += `<span class="tag-item" onclick="window.tdkSearchTag('${escapeHtml(a.madde)}')">${escapeHtml(a.madde)}</span>`;
                    }
                });
                html += `</div>`;
            }

            entryEl.innerHTML = html;
            resultsContainer.appendChild(entryEl);
        });

        resultsContainer.scrollTop = 0;
    }

    // OFFLINE SONUÇ RENDER
    function renderOfflineResults(entries) {
        resultsContainer.innerHTML = "";

        entries.forEach((item) => {
            const entryEl = document.createElement("div");
            entryEl.className = "entry-block";

            let lisanText = item.l ? `<span class="word-origin">(${escapeHtml(item.l)})</span>` : "";

            let html = `
                <div class="word-header">
                    <div class="word-title">
                        ${escapeHtml(item.m || "")}
                        ${lisanText}
                        <span class="source-badge db">Çevrim Dışı</span>
                    </div>
                </div>
            `;

            if (item.an && item.an.length > 0) {
                item.an.forEach((anlamObj, idx) => {
                    let typeBadge = anlamObj.t ? `<span class="type-badge">${escapeHtml(anlamObj.t)}</span>` : "";
                    let ornekHtml = "";
                    if (anlamObj.o) {
                        let yazar = anlamObj.y ? `— ${escapeHtml(anlamObj.y)}` : "";
                        ornekHtml = `
                            <div class="example-box">
                                "${escapeHtml(anlamObj.o)}"
                                ${yazar ? `<span class="example-author">${yazar}</span>` : ""}
                            </div>
                        `;
                    }

                    html += `
                        <div class="meaning-card">
                            <div>
                                <span class="meaning-num">${idx + 1}</span>
                                ${typeBadge}
                            </div>
                            <div class="meaning-text">${escapeHtml(anlamObj.a || "")}</div>
                            ${ornekHtml}
                        </div>
                    `;
                });
            }

            if (item.b) {
                const arr = item.b.split(",").map(s => s.trim()).filter(Boolean);
                if (arr.length > 0) {
                    html += `<div class="section-title">🔗 Birleşik Sözler</div><div class="tag-list">`;
                    arr.forEach(b => {
                        html += `<span class="tag-item" onclick="window.tdkSearchTag('${escapeHtml(b)}')">${escapeHtml(b)}</span>`;
                    });
                    html += `</div>`;
                }
            }

            if (item.at && item.at.length > 0) {
                html += `<div class="section-title">💡 Atasözü ve Deyimler</div><div class="tag-list">`;
                item.at.forEach(a => {
                    html += `<span class="tag-item" onclick="window.tdkSearchTag('${escapeHtml(a)}')">${escapeHtml(a)}</span>`;
                });
                html += `</div>`;
            }

            entryEl.innerHTML = html;
            resultsContainer.appendChild(entryEl);
        });

        resultsContainer.scrollTop = 0;
    }

    window.tdkSearchTag = function (tagWord) {
        if (searchInput) {
            searchInput.value = tagWord;
            lookupWord(tagWord);
        }
    };

    function escapeHtml(text) {
        if (!text) return "";
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

})(window);
