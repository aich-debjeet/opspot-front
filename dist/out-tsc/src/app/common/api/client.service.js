"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_1 = require("../../services/cookie");
var http_1 = require("@angular/common/http");
/**
 * API Class
 */
var OpspotHttpClient = /** @class */ (function () {
    function OpspotHttpClient(http) {
        this.http = http;
        this.base = '/';
        this.cookie = new cookie_1.Cookie();
    }
    OpspotHttpClient._ = function (http) {
        return new OpspotHttpClient(http);
    };
    /**
     * Return a GET request
     */
    OpspotHttpClient.prototype.get = function (endpoint, data, options) {
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        endpoint += '?' + this.buildParams(data);
        return this.http.get(this.base + endpoint, this.buildOptions(options));
        //     .map(response => response.json());
    };
    /**
     * Return a POST request
     */
    OpspotHttpClient.prototype.post = function (endpoint, data, options) {
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        return this.http.post(this.base + endpoint, JSON.stringify(data), this.buildOptions(options));
    };
    /**
     * Return a PUT request
     */
    OpspotHttpClient.prototype.put = function (endpoint, data, options) {
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        return this.http.put(this.base + endpoint, JSON.stringify(data), this.buildOptions(options));
    };
    /**
     * Return a DELETE request
     */
    OpspotHttpClient.prototype.delete = function (endpoint, data, options) {
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        return this.http.delete(this.base + endpoint, this.buildOptions(options));
    };
    OpspotHttpClient.prototype.buildParams = function (object) {
        return Object.keys(object).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(object[k]);
        }).join('&');
    };
    /**
     * Build the options
     */
    OpspotHttpClient.prototype.buildOptions = function (options) {
        var XSRF_TOKEN = this.cookie.get('XSRF-TOKEN');
        var headers = new http_1.HttpHeaders({
            'X-XSRF-TOKEN': XSRF_TOKEN,
        });
        return Object.assign(options, {
            headers: headers,
            cache: true
        });
    };
    return OpspotHttpClient;
}());
exports.OpspotHttpClient = OpspotHttpClient;
var client_1 = require("../../services/api/client");
exports.Client = client_1.Client;
//# sourceMappingURL=client.service.js.map