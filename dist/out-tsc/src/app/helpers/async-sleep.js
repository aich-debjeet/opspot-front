"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function asyncSleep(ms) {
    return new Promise(function (r) { return setTimeout(r, ms); });
}
exports.default = asyncSleep;
//# sourceMappingURL=async-sleep.js.map