"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author emi
 */
exports.storageMock = new function () {
    var _this = this;
    var _storage = {};
    this.get = function (key) { return _storage[key] || null; };
    this.set = function (key, value) {
        _storage[key] = value;
        return _this;
    };
    this.destroy = function (key) { return _this.set(key, null); };
};
//# sourceMappingURL=storage-mock.spec.js.map