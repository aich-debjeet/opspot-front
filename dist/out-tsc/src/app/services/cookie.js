"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A very simple cookie service
 */
var Cookie = /** @class */ (function () {
    function Cookie() {
    }
    /**
     * Return a cookie by name
     */
    Cookie.prototype.get = function (key) {
        var _a;
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        if (!cookies)
            return;
        for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
            var cookie = cookies_1[_i];
            var name_1 = void 0, value = void 0;
            _a = cookie.split('='), name_1 = _a[0], value = _a[1];
            if (name_1 === key)
                return value;
        }
        return;
    };
    return Cookie;
}());
exports.Cookie = Cookie;
//# sourceMappingURL=cookie.js.map