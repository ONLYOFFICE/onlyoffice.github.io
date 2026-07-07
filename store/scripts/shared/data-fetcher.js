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

/// <reference path="../types.js" />
/// <reference path="./utils.js" />

const DataFetcher = {
    _urlToCheckConnection: 'https://onlyoffice.github.io/store/translations/langs.json',
    proxyUrl: 'https://plugins-services.onlyoffice.com/proxy',  // url to proxy for getting rating
    isOnline: true,                                             // flag internet connection
    /** @type {Array<(isOnline: boolean) => void>} */
    _subscribers: [],
    _bMonitoringConnection: false,

    /**
     * @param {string} discussionUrl 
     * @param {boolean} bDesktopRequest 
     * @returns {Promise<Rating | null>}
     */
    getRating: function(discussionUrl, bDesktopRequest) {
        // get discussion page
        const self = this;
        if (bDesktopRequest) {
            return this._makeDesktopRequest(discussionUrl)
                .then(function(data) {
                    if (data.status == 'success') {
                        return Utils.parseRatingPage(data.response.responseText);
                    }
                    return null;
                });
        } else {
            let body = { target: discussionUrl };
            return this.makeRequest(this.proxyUrl, 'POST', null, body)
                .then(function(data) {
                    data = JSON.parse(data);
                    return Utils.parseRatingPage(data);
                });
        }
    },
    /**
     * this function makes GET request and return promise
     * maybe use fetch to in this function
     * @param {string} url 
     * @param {'GET' | 'POST'} method 
     * @param {*} responseType 
     * @param {*} body 
     * @returns 
     */
    makeRequest: function(url, method, responseType, body) {
        const self = this;
        if (!method)
            method = 'GET';
        
        if (body)
            body = JSON.stringify(body);

        return new Promise(function (resolve, reject) {
            try {
                let xhr = new XMLHttpRequest();
                xhr.open(method, url, true);
                if (responseType)
                    xhr.responseType = responseType;
                
                xhr.onload = function () {
                    if (this.readyState == 4) {
                        if (this.status !== 404 && (this.status == 200 || location.href.indexOf("file:") == 0)) {
                            resolve(this.response);
                        }
                        if (this.status >= 400) {
                            let errorText = this.status === 404 ? 'File not found.' : 'Network problem.';
                            reject( new Error(errorText) );
                        }
                    }
                };

                xhr.onerror = function (err) {
                    reject(err);
                    if (!url.includes('https')) {
                        return
                    }
                    self.isOnline = false;
                    self._checkInternet();
                };

                xhr.send(body);
            } catch (error) {
                reject(error);
            }
            
        });
    },
    /**
     * Either onSuccess or onFailure will be triggered,
     * but if onFailure is triggered, then onSuccess will 
     * be additionally called when an Internet connection appears.
     * @param {string} url 
     * @param {'GET' | 'POST'} method 
     * @param {*} responseType 
     * @param {*} body 
     * @returns {{onSuccess: Function, onFailure: Function}}
     */
    makeRequestWithWaitConnectionStrategy: function(url, method, responseType, body) {
        const self = this;
        /** @type {Function} */
        let successCallback = function() {};
        /** @param {unknown} err */
        let failureCallback = function(err) {
            console.error('Request failed:', err);
        };

        // maybe use fetch to in this function
        if (!method)
            method = 'GET';
        
        if (body)
            body = JSON.stringify(body);

        let numOfRetries = 0;

        /** @param {boolean} bIsOnline */
        let makeRequest = function(bIsOnline) {
            if (!bIsOnline) {
                return;
            }
            let xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            if (responseType)
                xhr.responseType = responseType;
            
            xhr.onload = function () {
                if (this.readyState == 4) {
                    if (this.status !== 404 && (this.status == 200 || location.href.indexOf("file:") == 0)) {
                        successCallback(this.response);
                        self._unsubscribeFromAppearanceOfALostInternetConnection(makeRequest)
                    }
                    if (this.status >= 400 && numOfRetries === 0) {
                        let errorText = this.status === 404 ? 'File not found.' : 'Network problem.';
                        failureCallback( new Error(errorText) );
                    }
                }
            };

            xhr.onerror = function (err) {
                if (numOfRetries === 0) {
                    failureCallback(err);
                }
                if (!url.includes('https')) {
                    return
                }
                self.isOnline = false;
                numOfRetries++;
                self.subscribeToTheAppearanceOfALostInternetConnection(makeRequest);
            };

            xhr.send(body);
        }
        try {
            makeRequest(this.isOnline);
        } catch (error) {
            failureCallback(error);
        }

        const result = {
            /** @param {Function} callback */
            onSuccess: function(callback) {
                successCallback = callback;
                return result;
            },
            /** @param {(err: unknown) => void} callback */
            onFailure: function(callback) {
                failureCallback = callback;
                return result;
            }
        };
          
        return result;
    },   
    
    /** @param {(isOnline: boolean) => void} callback */
    subscribeToTheAppearanceOfALostInternetConnection: function(callback) {
        this._subscribers.push(callback);
        this._checkInternet();
    },
    /** @param {(isOnline: boolean) => void} callback */
    _unsubscribeFromAppearanceOfALostInternetConnection: function(callback) {
        const index = this._subscribers.indexOf(callback);
        if (index > -1) {
            this._subscribers.splice(index, 1);
        }
    },
 
    /**
     * @param {string} _url 
     */
    _makeDesktopRequest: function(_url) {
	    // function for getting rating page in desktop
        return new Promise(function(resolve, reject) {
            if ( !_url.startsWith('http') ) {
                resolve({status:'skipped', response: {statusText: _url}});
                return;
            }
            if (!window.AscSimpleRequest) {
                reject({status:'error', response:{statusText:'AscSimpleRequest is not available'}});
                return;
            }
            window.AscSimpleRequest.createRequest({
                url: _url,
                crossOrigin: true,
                crossDomain: true,
                timeout: 10000,
                headers: '',
                complete: function(e, status) {
                    if ( status == 'success' ) {
                        resolve({status:status, response:e});
                    } else {
                        reject({status:status, response:e});
                    }
                },
                error: function(e, status, error) {
                    reject({status:status, response:e});
                }
            });
        });
    },
    
    _checkInternet: function() {
        const self = this;
        if (this._bMonitoringConnection || this.isOnline) {
            return;
        }
        self._subscribers.forEach(function(subscriber) {
            subscriber(false);
        });
        this._bMonitoringConnection = true;
        (function checkInternetRecursion() {
            setTimeout(function() {
                self.makeRequest(self._urlToCheckConnection, 'GET', null, null)
                    .then(function() {
                        return true;
                    }).catch(function() {
                        return false;
                    })
                    .then(function(bOnline) {
                        self.isOnline = bOnline;
                        if (bOnline) {
                            self._subscribers.forEach(function(subscriber) {
                                subscriber(bOnline);
                            });
                            self._bMonitoringConnection = false;
                        } else {
                            return checkInternetRecursion();
                        }
                    });
            }, 3000);
        })();
    },


};