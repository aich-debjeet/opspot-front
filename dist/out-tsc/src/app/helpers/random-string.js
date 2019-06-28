"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toDec(dec) {
    return ('0' + dec.toString(16)).substr(-2);
}
function randomString(len) {
    if (len === void 0) { len = 40; }
    var bytes = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, toDec).join('');
}
exports.default = randomString;
//# sourceMappingURL=random-string.js.map