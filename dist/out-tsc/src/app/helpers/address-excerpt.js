"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addressExcerpt(address) {
    return "0\u00D7" + address.substr(2, 5) + "..." + address.substr(-5);
}
exports.default = addressExcerpt;
//# sourceMappingURL=address-excerpt.js.map