"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        return 'Opera';
    }
    else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return 'Chrome';
    }
    else if (navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari';
    }
    else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return 'Firefox';
    }
    else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
     {
        return 'IE';
    }
    else {
        return 'unknown';
    }
}
exports.getBrowser = getBrowser;
;
//# sourceMappingURL=browser.js.map