"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isSafari() {
    return !!(window.safari || /^((?!chrome|android).)*safari/i.test(navigator.userAgent));
}
exports.default = isSafari;
//# sourceMappingURL=is-safari.js.map