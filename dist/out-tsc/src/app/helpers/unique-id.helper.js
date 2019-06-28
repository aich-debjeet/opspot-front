"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UniqueId = /** @class */ (function () {
    function UniqueId() {
    }
    UniqueId.generate = function (prefix) {
        if (prefix === void 0) { prefix = 'id'; }
        UniqueId.counter++;
        return "opspot-" + prefix + "--" + UniqueId.counter;
    };
    UniqueId.counter = 1000;
    return UniqueId;
}());
exports.UniqueId = UniqueId;
//# sourceMappingURL=unique-id.helper.js.map