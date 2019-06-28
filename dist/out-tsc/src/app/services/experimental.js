"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Experimental = /** @class */ (function () {
    function Experimental() {
    }
    Experimental.prototype.feature = function (feature) {
        return window.Opspot.user &&
            window.Opspot.user.feature_flags &&
            window.Opspot.user.feature_flags.length &&
            window.Opspot.user.feature_flags.indexOf(feature) > -1;
    };
    return Experimental;
}());
exports.Experimental = Experimental;
//# sourceMappingURL=experimental.js.map