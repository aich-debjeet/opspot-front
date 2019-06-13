"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _isCountry = function (currentCountry, countries) {
    return countries.indexOf(currentCountry) > -1;
};
function requiredFor(countryCodes, _a) {
    var _b = (_a === void 0 ? {} : _a).ignore, ignore = _b === void 0 ? false : _b;
    return function (control) {
        if (ignore) {
            return null;
        }
        var country = control.root.get('country');
        if (!country) {
            return { required: true };
        }
        var selected = country.value;
        if (!_isCountry(selected, countryCodes)) {
            return null;
        }
        return !control.value ? { required: true } : null;
    };
}
exports.requiredFor = requiredFor;
function optionalFor(countryCodes, _a) {
    var _b = (_a === void 0 ? {} : _a).ignore, ignore = _b === void 0 ? false : _b;
    return function (control) {
        if (ignore) {
            return null;
        }
        var country = control.root.get('country');
        if (!country) {
            return { required: true };
        }
        var selected = country.value;
        if (_isCountry(selected, countryCodes)) {
            return null;
        }
        return !control.value ? { required: true } : null;
    };
}
exports.optionalFor = optionalFor;
//# sourceMappingURL=onboarding.validators.js.map