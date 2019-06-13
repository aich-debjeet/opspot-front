"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CacheService = /** @class */ (function () {
    function CacheService() {
        this.storage = {};
    }
    CacheService._ = function () {
        return new CacheService();
    };
    CacheService.prototype.set = function (key, value) {
        this.storage[key] = value;
        return this;
    };
    CacheService.prototype.get = function (key) {
        if (typeof this.storage[key] === 'undefined') {
            return;
        }
        return this.storage[key];
    };
    return CacheService;
}());
exports.CacheService = CacheService;
//# sourceMappingURL=cache.js.map