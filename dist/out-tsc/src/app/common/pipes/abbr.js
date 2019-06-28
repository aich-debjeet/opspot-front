"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AbbrPipe = /** @class */ (function () {
    function AbbrPipe() {
        this.numberAbbrev = ['k', 'm', 'b', 't'];
        this.bytesAbbrev = ['K', 'M', 'G', 'T'];
    }
    AbbrPipe.prototype.transform = function (number, decimals, isBytes) {
        if (decimals === void 0) { decimals = 2; }
        if (isBytes === void 0) { isBytes = false; }
        var abbrev = isBytes ? this.bytesAbbrev : this.numberAbbrev;
        // 2 decimal places => 100, 3 => 1000, etc
        decimals = Math.pow(10, decimals);
        // Go through the array backwards, so we do the largest first
        for (var i = abbrev.length - 1; i >= 0; i--) {
            // Convert array index to "1000", "1000000", etc
            var size = Math.pow(10, (i + 1) * 3);
            // If the number is bigger or equal do the abbreviation
            if (size <= number) {
                // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                // This gives us nice rounding to a particular decimal place.
                number = Math.round(number * decimals / size) / decimals;
                // Handle special case where we round up to the next abbreviation
                if ((number === 1000) && (i < abbrev.length - 1)) {
                    number = 1;
                    i++;
                }
                // Add the letter for the abbreviation
                number += abbrev[i];
                break;
            }
        }
        return number;
    };
    AbbrPipe = __decorate([
        core_1.Pipe({
            name: 'abbr'
        })
    ], AbbrPipe);
    return AbbrPipe;
}());
exports.AbbrPipe = AbbrPipe;
//# sourceMappingURL=abbr.js.map