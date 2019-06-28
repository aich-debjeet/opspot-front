"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_1 = require("../cookie");
var http_1 = require("@angular/common/http");
/**
 * API Class
 */
var Client = /** @class */ (function () {
    function Client(http) {
        this.http = http;
        this.base = '/';
        this.cookie = new cookie_1.Cookie();
    }
    Client._ = function (http) {
        return new Client(http);
    };
    /**
     * Return a GET request
     */
    Client.prototype.get = function (endpoint, data, options) {
        var _this = this;
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        endpoint += '?' + this.buildParams(data);
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.base + endpoint, _this.buildOptions(options))
                .subscribe(function (res) {
                var data = res;
                if (!data || data.status !== 'success')
                    return reject(data);
                return resolve(data);
            }, function (err) {
                if (err.data && !err.data()) {
                    return reject(err || new Error('GET error'));
                }
                if (err.status === 401 && err.error.loggedin === false) {
                    window.location.href = '/login';
                    return reject(err);
                }
                return reject(err);
            });
        });
    };
    /**
     * Return a GET request
     */
    Client.prototype.getRaw = function (endpoint, data, options) {
        var _this = this;
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        endpoint += '?' + this.buildParams(data);
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.base + endpoint, _this.buildOptions(options))
                .subscribe(function (res) {
                return resolve(res);
            }, function (err) {
                if (err.data && !err.data()) {
                    return reject(err || new Error('GET error'));
                }
                if (err.status === 401 && err.error.loggedin === false) {
                    window.location.href = '/login';
                    return reject(err);
                }
                return reject(err);
            });
        });
    };
    /**
     * Return a POST request
     */
    Client.prototype.post = function (endpoint, data, options) {
        var _this = this;
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.base + endpoint, JSON.stringify(data), _this.buildOptions(options))
                .subscribe(function (res) {
                var data = res;
                if (!data || data.status !== 'success')
                    return reject(data);
                return resolve(data);
            }, function (err) {
                if (err.data && !err.data()) {
                    return reject(err || new Error('POST error'));
                }
                if (err.status === 401 && err.loggedin === false) {
                    window.location.href = '/login';
                    return reject(err);
                }
                if (err.status !== 200) {
                    return reject(err.error);
                }
            });
        });
    };
    /**
     * Return a PUT request
     */
    Client.prototype.put = function (endpoint, data, options) {
        var _this = this;
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        return new Promise(function (resolve, reject) {
            _this.http.put(_this.base + endpoint, JSON.stringify(data), _this.buildOptions(options))
                .subscribe(function (res) {
                var data = res;
                if (!data || data.status !== 'success')
                    return reject(data);
                return resolve(data);
            }, function (err) {
                if (err.status === 401 && err.data().loggedin === false) {
                    window.location.href = '/login';
                    return reject(err);
                }
                if (err.status !== 200) {
                    return reject(err.error);
                }
            });
        });
    };
    /**
     * Return a DELETE request
     */
    Client.prototype.delete = function (endpoint, data, options) {
        var _this = this;
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        return new Promise(function (resolve, reject) {
            _this.http.delete(_this.base + endpoint, _this.buildOptions(options))
                .subscribe(function (res) {
                var data = res;
                if (!data || data.status !== 'success')
                    return reject(data);
                return resolve(data);
            }, function (err) {
                if (err.status === 401 && err.error.loggedin === false) {
                    window.location.href = '/login';
                    return reject(err);
                }
                if (err.status !== 200) {
                    return reject(err.error);
                }
            });
        });
    };
    Client.prototype.buildParams = function (object) {
        return Object.keys(object).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(object[k]);
        }).join('&');
    };
    /**
     * Build the options
     */
    Client.prototype.buildOptions = function (options) {
        var XSRF_TOKEN = this.cookie.get('XSRF-TOKEN');
        var headers = new http_1.HttpHeaders({
            'X-XSRF-TOKEN': XSRF_TOKEN,
        });
        return Object.assign(options, {
            headers: headers,
            cache: true
        });
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=client.js.map