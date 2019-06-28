"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_1 = require("../cookie");
/**
 * API Class
 */
var Upload = /** @class */ (function () {
    function Upload(http) {
        this.http = http;
        this.base = '/';
        this.cookie = new cookie_1.Cookie();
    }
    Upload._ = function (http) {
        return new Upload(http);
    };
    /**
     * Return a POST request
     */
    Upload.prototype.post = function (endpoint, files, data, progress, xhr) {
        var _this = this;
        if (files === void 0) { files = []; }
        if (data === void 0) { data = {}; }
        if (progress === void 0) { progress = function () { return; }; }
        if (xhr === void 0) { xhr = null; }
        var formData = new FormData();
        if (!data.filekey) {
            data.filekey = 'file';
        }
        if (files.length > 1) {
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                formData.append(data.filekey + '[]', file);
            }
        }
        else {
            formData.append(data.filekey, files[0]);
        }
        delete data.filekey;
        for (var key in data) {
            if (data[key] !== null) {
                formData.append(key, data[key]);
            }
        }
        return new Promise(function (resolve, reject) {
            if (!xhr) {
                xhr = new XMLHttpRequest();
            }
            xhr.open('POST', _this.base + endpoint, true);
            xhr.upload.addEventListener('progress', function (e) {
                progress(e.loaded / e.total * 100);
            });
            xhr.onload = function () {
                if (this.status === 200) {
                    resolve(JSON.parse(this.response));
                }
                else {
                    reject(this.response);
                }
            };
            xhr.onreadystatechange = function () {
                //console.log(this);
            };
            var XSRF_TOKEN = _this.cookie.get('XSRF-TOKEN');
            xhr.setRequestHeader('X-XSRF-TOKEN', XSRF_TOKEN);
            xhr.send(formData);
        });
    };
    return Upload;
}());
exports.Upload = Upload;
//# sourceMappingURL=upload.js.map