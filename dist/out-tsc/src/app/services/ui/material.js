"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Material = /** @class */ (function () {
    function Material() {
    }
    Material.rebuild = function () {
        window.componentHandler.upgradeDom();
    };
    Material.updateElement = function (element) {
        window.componentHandler.upgradeElement(element);
    };
    return Material;
}());
exports.Material = Material;
//# sourceMappingURL=material.js.map