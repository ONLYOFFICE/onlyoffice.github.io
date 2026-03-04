(function(window, undefined) {
    'use strict';

    // Public CORS proxy for browser mode
    var CORS_PROXY_URL = 'https://corsproxy.io/?';

    // Check if we're running in desktop mode
    function isDesktopMode() {
        return window.AscSimpleRequest && window.AscSimpleRequest.createRequest;
    }

    // Custom fetch using AscSimpleRequest (ONLYOFFICE SDK) to bypass CORS
    // Falls back to public CORS proxy for browser mode
    function odataFetch(url, options) {
        options = options || {};
        var method = options.method || 'GET';
        var headers = options.headers || {};

        return new Promise(function(resolve, reject) {
            // Try AscSimpleRequest first (available in onlyoffice:// protocol - desktop mode)
            if (isDesktopMode()) {
                window.AscSimpleRequest.createRequest({
                    url: url,
                    method: method,
                    headers: headers,
                    body: options.body || '',
                    complete: function(e, status) {
                        var response = {
                            ok: true,
                            status: 200,
                            statusText: 'OK',
                            text: function() {
                                return Promise.resolve(e.responseText || '');
                            },
                            json: function() {
                                return new Promise(function(res, rej) {
                                    try {
                                        res(JSON.parse(e.responseText || '{}'));
                                    } catch (err) {
                                        rej(err);
                                    }
                                });
                            }
                        };
                        resolve(response);
                    },
                    error: function(e, status, error) {
                        var statusCode = e.statusCode || 0;
                        if (statusCode === -102) statusCode = 404;

                        var response = {
                            ok: false,
                            status: statusCode,
                            statusText: error || 'Error',
                            text: function() {
                                return Promise.resolve(e.responseText || '');
                            },
                            json: function() {
                                return new Promise(function(res, rej) {
                                    try {
                                        res(JSON.parse(e.responseText || '{}'));
                                    } catch (err) {
                                        rej(err);
                                    }
                                });
                            }
                        };
                        resolve(response);
                    }
                });
            } else {
                // Use public CORS proxy (corsproxy.io)
                var proxyUrl = CORS_PROXY_URL + encodeURIComponent(url);

                var xhr = new XMLHttpRequest();
                xhr.open(method, proxyUrl, true);

                // Set headers (except Host which browsers don't allow)
                for (var h in headers) {
                    if (headers.hasOwnProperty(h) && h.toLowerCase() !== 'host') {
                        xhr.setRequestHeader(h, headers[h]);
                    }
                }

                xhr.onload = function() {
                    var responseText = xhr.responseText;
                    var response = {
                        ok: xhr.status >= 200 && xhr.status < 300,
                        status: xhr.status,
                        statusText: xhr.statusText,
                        text: function() {
                            return Promise.resolve(responseText);
                        },
                        json: function() {
                            return new Promise(function(res, rej) {
                                try {
                                    res(JSON.parse(responseText));
                                } catch (err) {
                                    rej(err);
                                }
                            });
                        }
                    };
                    resolve(response);
                };

                xhr.onerror = function() {
                    reject(new Error('Network request failed. The OData service may not be accessible due to CORS restrictions.'));
                };

                xhr.ontimeout = function() {
                    reject(new Error('Request timeout'));
                };

                xhr.send(options.body || null);
            }
        });
    }

    var odataServiceUrl = '';
    var availableTables = [];
    var selectedTables = [];
    var tableData = {};

    // Initialize plugin
    window.Asc.plugin.init = function() {
        // Plugin initialized
        updateSelectedCount();
    };

    // Handle button clicks (Insert/Cancel)
    window.Asc.plugin.button = function(id) {
        if (id === 0) {
            // Insert button clicked
            insertSelectedTables();
        }
        // For Cancel (id === -1) or any other, just close
        this.executeCommand("close", "");
    };

    // Translation helper
    function tr(text) {
        return window.Asc && window.Asc.plugin && window.Asc.plugin.tr ? window.Asc.plugin.tr(text) : text;
    }

    // Show status message (near Insert button)
    function showStatus(message, type) {
        var statusEl = document.getElementById('insert-status');
        if (statusEl) {
            statusEl.textContent = message;
            statusEl.className = 'insert-status ' + (type || '');
        }
    }

    // Show fetch status/error message (below tables list)
    function showFetchStatus(message, type) {
        var statusEl = document.getElementById('fetch-status');
        if (statusEl) {
            statusEl.textContent = message;
            statusEl.className = 'status-message ' + (type || '');
        }
    }

    // Hide fetch status message
    function hideFetchStatus() {
        var statusEl = document.getElementById('fetch-status');
        if (statusEl) {
            statusEl.textContent = '';
            statusEl.className = 'status-message';
        }
    }

    // Update selected display (hide actions - shown after data loads)
    function updateSelectedCount() {
        var countEl = document.getElementById('selected-count');
        var actionsSection = document.getElementById('actions-section');
        countEl.textContent = '';
        // Hide actions section - it will be shown after data is fetched
        if (selectedTables.length === 0) {
            if (actionsSection) actionsSection.style.display = 'none';
        }
    }

    // Show actions section (called after data is loaded)
    function showActionsSection() {
        var actionsSection = document.getElementById('actions-section');
        if (actionsSection && selectedTables.length > 0) {
            actionsSection.style.display = 'flex';
        }
    }

    // Insert data (called from UI button)
    window.insertData = function() {
        insertSelectedTables();
    };

    // Fetch OData service metadata and entity sets
    window.fetchOData = function() {
        var urlInput = document.getElementById('odata-url');
        var url = urlInput.value.trim();

        if (!url) {
            showFetchStatus(tr('Please enter an OData service URL'), 'error');
            return;
        }

        // Normalize URL
        odataServiceUrl = url.replace(/\/$/, '');

        hideFetchStatus();
        showFetchStatus(tr('Fetching OData service metadata...'), 'loading');
        document.getElementById('fetch-btn').disabled = true;

        // Clear previous data
        availableTables = [];
        selectedTables = [];
        tableData = {};

        // Hide previous preview and actions
        var previewSection = document.getElementById('preview-section');
        if (previewSection) previewSection.style.display = 'none';
        var actionsSection = document.getElementById('actions-section');
        if (actionsSection) actionsSection.style.display = 'none';

        // First try to get the service document
        fetchServiceDocument(odataServiceUrl);
    };

    // Fetch service document to get available entity sets
    function fetchServiceDocument(baseUrl) {
        // Use $format=json query param (OData v3 doesn't respect Accept header)
        var url = baseUrl + (baseUrl.indexOf('?') === -1 ? '?' : '&') + '$format=json';
        odataFetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            parseServiceDocument(data);
        })
        .catch(function(error) {
            // Try with $metadata endpoint
            fetchMetadata(baseUrl);
        });
    }

    // Parse OData v4 service document
    function parseServiceDocument(data) {
        try {
            if (data.value && Array.isArray(data.value)) {
                // OData v4 format
                availableTables = data.value
                    .filter(function(item) {
                        return item.kind === 'EntitySet' || !item.kind;
                    })
                    .map(function(item) {
                        return {
                            name: item.name,
                            url: item.url || item.name
                        };
                    });
            } else if (data.EntitySets) {
                // OData v3 format
                availableTables = data.EntitySets.map(function(name) {
                    return { name: name, url: name };
                });
            } else {
                throw new Error('Unknown format');
            }

            if (availableTables.length === 0) {
                showFetchStatus(tr('No tables found in OData service'), 'error');
            } else {
                hideFetchStatus();
                renderTablesList();
            }
        } catch (e) {
            fetchMetadata(odataServiceUrl);
        }

        document.getElementById('fetch-btn').disabled = false;
    }

    // Fetch $metadata to extract entity sets
    function fetchMetadata(baseUrl) {
        odataFetch(baseUrl + '/$metadata', {
            headers: {
                'Accept': 'application/xml'
            }
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }
            return response.text();
        })
        .then(function(xmlText) {
            parseMetadataXml(xmlText);
        })
        .catch(function(error) {
            showFetchStatus(tr('Invalid URL or OData service unavailable'), 'error');
            document.getElementById('fetch-btn').disabled = false;
        });
    }

    // Parse $metadata XML to extract entity sets
    function parseMetadataXml(xmlText) {
        try {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlText, 'application/xml');

            // Find EntitySet elements
            var entitySets = xmlDoc.querySelectorAll('EntitySet');
            availableTables = [];

            entitySets.forEach(function(entitySet) {
                var name = entitySet.getAttribute('Name');
                if (name) {
                    availableTables.push({
                        name: name,
                        url: name
                    });
                }
            });

            if (availableTables.length === 0) {
                showFetchStatus(tr('No entity sets found in metadata'), 'error');
            } else {
                hideFetchStatus();
                renderTablesList();
            }
        } catch (e) {
            showFetchStatus(tr('Failed to parse OData metadata'), 'error');
        }

        document.getElementById('fetch-btn').disabled = false;
    }

    // Render the list of available tables
    function renderTablesList() {
        var listEl = document.getElementById('tables-list');

        if (availableTables.length === 0) {
            listEl.innerHTML = '<div class="empty-state"><div class="empty-state-icon">&#128202;</div><div>No tables found</div></div>';
            return;
        }

        // Sort tables alphabetically by name
        availableTables.sort(function(a, b) {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });

        var html = '';
        availableTables.forEach(function(table, index) {
            var isSelected = selectedTables.indexOf(table.name) !== -1;
            html += '<div class="table-item' + (isSelected ? ' selected' : '') + '" data-index="' + index + '" onclick="toggleTable(' + index + ')">';
            html += '<input type="radio" name="table-select" ' + (isSelected ? 'checked' : '') + ' onclick="event.stopPropagation(); toggleTable(' + index + ')" />';
            html += '<span class="table-name">' + escapeHtml(table.name) + '</span>';
            html += '</div>';
        });

        listEl.innerHTML = html;
    }

    // Select table (single selection with toggle)
    window.toggleTable = function(index) {
        var table = availableTables[index];

        // Toggle selection - deselect if already selected, otherwise select
        if (selectedTables.indexOf(table.name) !== -1) {
            selectedTables = [];
            // Hide preview when deselected
            var previewSection = document.getElementById('preview-section');
            if (previewSection) previewSection.style.display = 'none';
        } else {
            selectedTables = [table.name];
            fetchTablePreview(table);
        }

        renderTablesList();
        updateSelectedCount();
    };

    // Fetch preview data for a table
    function fetchTablePreview(table) {
        // Use $format=json for OData v3 compatibility
        var url = odataServiceUrl + '/' + table.url + '?$top=10&$format=json';

        odataFetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var records = data.value || (data.d && data.d.results) || data.d || [];

            if (records.length > 0) {
                tableData[table.name] = {
                    preview: records,
                    columns: Object.keys(records[0]).filter(function(key) {
                        return !key.startsWith('@') && !key.startsWith('__');
                    })
                };
                hideFetchStatus();
                showPreview(table.name);
                showActionsSection();
            } else {
                // Show message and hide preview when no data
                showFetchStatus(tr('Table is empty'), 'error');
                var previewSection = document.getElementById('preview-section');
                if (previewSection) previewSection.style.display = 'none';
                var actionsSection = document.getElementById('actions-section');
                if (actionsSection) actionsSection.style.display = 'none';
            }
        })
        .catch(function(error) {
            showFetchStatus(tr('Failed to load table data'), 'error');
            // Hide preview on error
            var previewSection = document.getElementById('preview-section');
            if (previewSection) previewSection.style.display = 'none';
            var actionsSection = document.getElementById('actions-section');
            if (actionsSection) actionsSection.style.display = 'none';
        });
    }

    // Show preview of selected table
    function showPreview(tableName) {
        var previewSection = document.getElementById('preview-section');
        var previewContent = document.getElementById('preview-content');

        if (!tableData[tableName] || !tableData[tableName].preview.length) {
            previewSection.style.display = 'none';
            return;
        }

        var data = tableData[tableName];
        var html = '<table class="preview-table"><thead><tr>';

        data.columns.forEach(function(col) {
            html += '<th>' + escapeHtml(col) + '</th>';
        });
        html += '</tr></thead><tbody>';

        data.preview.forEach(function(row) {
            html += '<tr>';
            data.columns.forEach(function(col) {
                var value = row[col];
                if (value === null || value === undefined) {
                    value = '';
                } else if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }
                html += '<td>' + escapeHtml(String(value)) + '</td>';
            });
            html += '</tr>';
        });

        html += '</tbody></table>';
        previewContent.innerHTML = html;
        previewSection.style.display = 'flex';
    }

    // Insert selected tables into spreadsheet
    function insertSelectedTables() {
        if (selectedTables.length === 0) {
            showStatus(tr('Please select at least one table'), 'error');
            return;
        }

        showStatus(tr('Fetching data...'), 'loading');

        var tablesToFetch = selectedTables.slice();
        var allData = {};
        var completed = 0;

        tablesToFetch.forEach(function(tableName) {
            var table = availableTables.find(function(t) { return t.name === tableName; });
            if (!table) return;

            // Use $format=json for OData v3 compatibility
            var url = odataServiceUrl + '/' + table.url + '?$format=json';

            odataFetch(url, {
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                var records = data.value || (data.d && data.d.results) || data.d || [];
                allData[tableName] = records;
                completed++;

                if (completed === tablesToFetch.length) {
                    insertDataIntoSpreadsheet(allData);
                }
            })
            .catch(function(error) {
                completed++;
                console.error('Failed to fetch ' + tableName + ': ' + error);

                if (completed === tablesToFetch.length) {
                    insertDataIntoSpreadsheet(allData);
                }
            });
        });
    }

    // Insert data into ONLYOFFICE spreadsheet
    function insertDataIntoSpreadsheet(allData) {
        var tableNames = Object.keys(allData);

        if (tableNames.length === 0) {
            showStatus(tr('No data to insert'), 'error');
            return;
        }

        tableNames.forEach(function(tableName) {
            var records = allData[tableName];

            if (!records || records.length === 0) return;

            // Get columns (filter out OData metadata properties)
            var columns = Object.keys(records[0]).filter(function(key) {
                return !key.startsWith('@') && !key.startsWith('__') &&
                       key !== '__metadata' && key !== '__deferred';
            });

            // Build the data array: header + rows
            var dataArray = [];

            // Add header row
            dataArray.push(columns);

            // Add data rows
            records.forEach(function(record) {
                var row = columns.map(function(col) {
                    var value = record[col];
                    if (value === null || value === undefined) {
                        return '';
                    }
                    if (typeof value === 'object') {
                        return JSON.stringify(value);
                    }
                    return value;
                });
                dataArray.push(row);
            });

            // Store data in Asc.scope for access in callCommand
            window.Asc.scope.tableData = dataArray;
            window.Asc.scope.tableName = tableName;

            // Call ONLYOFFICE API to insert data
            window.Asc.plugin.callCommand(function() {
                var data = Asc.scope.tableData;
                var tableName = Asc.scope.tableName;

                // Create a new worksheet with the table name
                var oWorksheet = Api.AddSheet(tableName);

                var headers = data[0];
                var numRows = data.length;
                var numCols = headers.length;

                // Insert all data (headers + rows) starting from row 0
                for (var r = 0; r < numRows; r++) {
                    var row = data[r];
                    for (var c = 0; c < row.length; c++) {
                        var cell = oWorksheet.GetRangeByNumber(r, c);
                        var value = row[c];

                        // Try to detect and set appropriate type
                        if (typeof value === 'number') {
                            cell.SetValue(value);
                        } else if (typeof value === 'boolean') {
                            cell.SetValue(value ? 'TRUE' : 'FALSE');
                        } else {
                            cell.SetValue(String(value));
                        }
                    }
                }

                // Convert column number to letter (0 = A, 1 = B, etc.)
                function colToLetter(col) {
                    var letter = '';
                    while (col >= 0) {
                        letter = String.fromCharCode((col % 26) + 65) + letter;
                        col = Math.floor(col / 26) - 1;
                    }
                    return letter;
                }

                // Create range string for the table (e.g., "A1:D10")
                var startLetter = colToLetter(0);
                var endLetter = colToLetter(numCols - 1);
                var startRow = 1; // Data starts at row 1 (1-indexed)
                var endRow = numRows;
                var rangeStr = startLetter + startRow + ':' + endLetter + endRow;

                // Format as table with built-in style
                oWorksheet.FormatAsTable(rangeStr);

                // Auto-fit columns (approximate)
                for (var c = 0; c < numCols; c++) {
                    oWorksheet.SetColumnWidth(c, 15);
                }

            }, false);
        });

        showStatus(tr('Data inserted successfully!'), 'success');
    }

    // Escape HTML special characters
    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

})(window);
