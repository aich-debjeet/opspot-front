"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var yargs_1 = require("yargs");
var path_1 = require("path");
var fs_1 = require("fs");
var https = require('https');
var querystring = require('querystring');
var url = require('url');
var APP_SRC = path_1.join(__dirname, '..', 'src');
// HTTP
function req(uri, method, data, extraOptions) {
    if (method === void 0) { method = 'get'; }
    if (data === void 0) { data = null; }
    if (extraOptions === void 0) { extraOptions = {}; }
    return new Promise(function (resolve, reject) {
        var isPost = method.toUpperCase() === 'POST';
        var options = __assign({ method: method.toUpperCase(), headers: {} }, url.parse(uri), extraOptions);
        var body = '';
        if (data) {
            body = querystring.stringify(data);
        }
        if (isPost && data && !options.headers['Content-Type']) {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            options.headers['Content-Length'] = body.length;
        }
        var req = https.request(options, function (res) {
            var statusCode = res.statusCode;
            if (statusCode !== 200) {
                res.resume();
                return reject(new Error("HTTP " + statusCode));
            }
            res.setEncoding('utf8');
            var body = '';
            res.on('data', function (chunk) { return body += chunk; });
            res.on('end', function () {
                try {
                    resolve(body);
                }
                catch (e) {
                    reject(e);
                }
            });
        }).on('error', function (e) {
            reject(e);
        });
        if (body) {
            req.write(body);
        }
        req.end();
    });
}
// TRANSFORMER
function transform(fileContent, destination) {
    fileContent = fileContent
        .replace(/%([0-9]+)\$s/g, function (substring, match_1) {
        var idx = parseInt(match_1) - 1;
        if (idx < 1) {
            return "{{id=\"INTERPOLATION\"}}";
        }
        return "{{id=\"INTERPOLATION_" + idx + "\"}}";
    })
        .replace(/{{([^}]+)}}/g, "<x $1 />");
    fs_1.writeFileSync(destination, fileContent);
}
module.exports = function () { return function (cb) { return __awaiter(_this, void 0, void 0, function () {
    var fileContent, file, locale, _a, response, result, _b, _c, dest;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if ((!yargs_1.argv.file && !yargs_1.argv['poeditor-key']) ||
                    (yargs_1.argv.file && yargs_1.argv['poeditor-key'])) {
                    cb('Please specify either an local file (--file) or a poeditor.com API key (--poeditor-key)');
                }
                if (!yargs_1.argv.locale) {
                    cb('Please specify a locale');
                }
                if (!yargs_1.argv.file) return [3 /*break*/, 1];
                file = path_1.join(__dirname, '..', yargs_1.argv.file);
                console.log("* Using " + file + "\u2026");
                fs_1.statSync(file); // check if exists
                fileContent = fs_1.readFileSync(file).toString();
                return [3 /*break*/, 4];
            case 1:
                if (!yargs_1.argv['poeditor-key']) return [3 /*break*/, 4];
                if (!yargs_1.argv['poeditor-id']) {
                    throw new Error('Please specify a poeditor.com Project ID (--poeditor-id');
                }
                locale = yargs_1.argv['poeditor-locale'] || yargs_1.argv.locale;
                console.log("* Requesting '" + locale + "' (as '" + yargs_1.argv['locale'] + "') from Project #" + yargs_1.argv['poeditor-id']);
                _c = (_b = JSON).parse;
                return [4 /*yield*/, req('https://api.poeditor.com/v2/projects/export', 'post', {
                        api_token: yargs_1.argv['poeditor-key'],
                        id: yargs_1.argv['poeditor-id'],
                        language: locale,
                        type: 'xliff',
                    })];
            case 2:
                _a = _c.apply(_b, [_d.sent()]), response = _a.response, result = _a.result;
                if (response.status !== 'success' || !result.url) {
                    throw new Error(response.message || JSON.stringify(response));
                }
                console.log("* Downloading " + result.url + "\u2026");
                return [4 /*yield*/, req(result.url)];
            case 3:
                fileContent = _d.sent();
                if (!fileContent) {
                    throw new Error('Invalid file');
                }
                _d.label = 4;
            case 4:
                dest = path_1.join(APP_SRC, 'locale', "Opspot." + yargs_1.argv.locale + ".xliff");
                transform(fileContent, dest);
                console.log("* Parsed and saved to " + dest + "\u2026");
                cb();
                return [2 /*return*/];
        }
    });
}); }; };
//# sourceMappingURL=import.i18n.xlf.js.map