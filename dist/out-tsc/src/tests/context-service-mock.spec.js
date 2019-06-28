"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author emi
 */
exports.contextServiceMock = new function () {
    var _this = this;
    this.listen = function () { return _this; };
    this.unlisten = function () { return _this; };
    this.reset = function () { return _this; };
    this.set = function (product, entity) { return _this; };
    this.get = function () { };
    this.resolveLabel = function (guid) { return guid; };
    this.resolveStaticLabel = function (product) { return product; };
};
//# sourceMappingURL=context-service-mock.spec.js.map