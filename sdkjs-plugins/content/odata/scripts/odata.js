(function(window, undefined) {
    'use strict';

    // Custom fetch using AscSimpleRequest (ONLYOFFICE SDK) to bypass CORS
    // Falls back to XMLHttpRequest for local desktop mode
    function odataFetch(url, options) {
        options = options || {};
        var method = options.method || 'GET';
        var headers = options.headers || {};

        return new Promise(function(resolve, reject) {
            // Try AscSimpleRequest first (available in onlyoffice:// protocol)
            if (window.AscSimpleRequest && window.AscSimpleRequest.createRequest) {
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
                // Fallback to XMLHttpRequest for file:// protocol (local desktop)
                var xhr = new XMLHttpRequest();
                xhr.open(method, url, true);

                for (var h in headers) {
                    if (headers.hasOwnProperty(h)) {
                        xhr.setRequestHeader(h, headers[h]);
                    }
                }

                xhr.onload = function() {
                    var response = {
                        ok: xhr.status >= 200 && xhr.status < 300,
                        status: xhr.status,
                        statusText: xhr.statusText,
                        text: function() {
                            return Promise.resolve(xhr.responseText);
                        },
                        json: function() {
                            return new Promise(function(res, rej) {
                                try {
                                    res(JSON.parse(xhr.responseText));
                                } catch (err) {
                                    rej(err);
                                }
                            });
                        }
                    };
                    resolve(response);
                };

                xhr.onerror = function() {
                    reject(new Error('Network request failed'));
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

    // Show status message (near Insert button)
    function showStatus(message, type) {
        var statusEl = document.getElementById('insert-status');
        if (statusEl) {
            statusEl.textContent = message;
            statusEl.className = 'insert-status ' + (type || '');
        }
    }

    // Hide status message
    function hideStatus() {
        var statusEl = document.getElementById('insert-status');
        if (statusEl) {
            statusEl.textContent = '';
            statusEl.className = 'insert-status';
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
            showStatus('Please enter an OData service URL', 'error');
            return;
        }

        // Normalize URL
        odataServiceUrl = url.replace(/\/$/, '');

        showStatus('Fetching OData service metadata...', 'loading');
        document.getElementById('fetch-btn').disabled = true;

        // Clear previous data
        availableTables = [];
        selectedTables = [];
        tableData = {};

        // First try to get the service document
        fetchServiceDocument(odataServiceUrl);
    };

    // Fetch service document to get available entity sets
    function fetchServiceDocument(baseUrl) {
        odataFetch(baseUrl, {
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
                showStatus('No tables found in OData service', 'error');
            } else {
                hideStatus();
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
            showStatus('Failed to fetch OData service: ' + error.message, 'error');
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
                showStatus('No entity sets found in metadata', 'error');
            } else {
                hideStatus();
                renderTablesList();
            }
        } catch (e) {
            showStatus('Failed to parse OData metadata: ' + e.message, 'error');
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
        var url = odataServiceUrl + '/' + table.url + '?$top=10';

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
                showPreview(table.name);
                showActionsSection();
            }
        })
        .catch(function(error) {
            console.log('Failed to fetch preview for ' + table.name);
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
        previewSection.style.display = 'block';
    }

    // Insert selected tables into spreadsheet
    function insertSelectedTables() {
        if (selectedTables.length === 0) {
            showStatus('Please select at least one table', 'error');
            return;
        }

        showStatus('Fetching data...', 'loading');

        var tablesToFetch = selectedTables.slice();
        var allData = {};
        var completed = 0;

        tablesToFetch.forEach(function(tableName) {
            var table = availableTables.find(function(t) { return t.name === tableName; });
            if (!table) return;

            var url = odataServiceUrl + '/' + table.url;

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
            showStatus('No data to insert', 'error');
            return;
        }

        // Prepare data for insertion
        var currentCol = 0;

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
            window.Asc.scope.startCol = currentCol;
            window.Asc.scope.tableName = tableName;

            // Call ONLYOFFICE API to insert data
            window.Asc.plugin.callCommand(function() {
                var oWorksheet = Api.GetActiveSheet();
                var data = Asc.scope.tableData;
                var startCol = Asc.scope.startCol;
                var tableName = Asc.scope.tableName;

                // Insert table name as title
                var titleCell = oWorksheet.GetRangeByNumber(0, startCol);
                titleCell.SetValue(tableName);
                titleCell.SetBold(true);
                titleCell.SetFontSize(14);

                // Insert headers (row 1, 0-indexed)
                var headers = data[0];
                for (var c = 0; c < headers.length; c++) {
                    var headerCell = oWorksheet.GetRangeByNumber(1, startCol + c);
                    headerCell.SetValue(headers[c]);
                    headerCell.SetBold(true);
                    headerCell.SetFillColor(Api.CreateColorFromRGB(74, 144, 217));
                    headerCell.SetFontColor(Api.CreateColorFromRGB(255, 255, 255));
                }

                // Insert data rows (starting from row 2)
                for (var r = 1; r < data.length; r++) {
                    var row = data[r];
                    for (var c = 0; c < row.length; c++) {
                        var cell = oWorksheet.GetRangeByNumber(r + 1, startCol + c);
                        var value = row[c];

                        // Try to detect and set appropriate type
                        if (typeof value === 'number') {
                            cell.SetValue(value);
                        } else if (typeof value === 'boolean') {
                            cell.SetValue(value ? 'TRUE' : 'FALSE');
                        } else {
                            cell.SetValue(String(value));
                        }

                        // Alternate row colors for readability
                        if (r % 2 === 0) {
                            cell.SetFillColor(Api.CreateColorFromRGB(240, 248, 255));
                        }
                    }
                }

                // Auto-fit columns (approximate)
                for (var c = 0; c < headers.length; c++) {
                    oWorksheet.SetColumnWidth(startCol + c, 15);
                }

            }, false);

            // Move to next table position (columns + 1 gap)
            var colCount = columns.length;
            currentCol += colCount + 2;
        });

        showStatus('Data inserted successfully!', 'success');
    }

    // Escape HTML special characters
    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

})(window);
