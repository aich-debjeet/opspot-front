"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Credits to Jo Paul (https://stackoverflow.com/a/43281084)
 */
var core_1 = require("@angular/core");
var UtcDatePipe = /** @class */ (function () {
    function UtcDatePipe() {
    }
    UtcDatePipe.prototype.transform = function (value) {
        if (!value) {
            return '';
        }
        var dateValue = new Date(value);
        var dateWithNoTimezone = new Date(dateValue.getUTCFullYear(), dateValue.getUTCMonth(), dateValue.getUTCDate(), dateValue.getUTCHours(), dateValue.getUTCMinutes(), dateValue.getUTCSeconds(), dateValue.getUTCMilliseconds());
        return dateWithNoTimezone;
    };
    UtcDatePipe = __decorate([
        core_1.Pipe({
            name: 'utcDate'
        })
    ], UtcDatePipe);
    return UtcDatePipe;
}());
exports.UtcDatePipe = UtcDatePipe;
//# sourceMappingURL=utcdate.js.map