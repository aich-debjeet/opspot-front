"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Storage = /** @class */ (function () {
    function Storage() {
    }
    Storage._ = function () {
        return new Storage();
    };
    Storage.prototype.get = function (key) {
        return window.localStorage.getItem(key);
    };
    Storage.prototype.set = function (key, value) {
        return window.localStorage.setItem(key, value);
    };
    Storage.prototype.destroy = function (key) {
        return window.localStorage.removeItem(key);
    };
    return Storage;
}());
exports.Storage = Storage;
//# sourceMappingURL=storage.js.map