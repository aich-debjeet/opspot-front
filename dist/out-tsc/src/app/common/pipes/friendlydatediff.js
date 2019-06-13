"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FriendlyDateDiffPipe = /** @class */ (function () {
    function FriendlyDateDiffPipe() {
    }
    FriendlyDateDiffPipe.prototype.transform = function (value, reference) {
        if (reference === void 0) { reference = null; }
        if (!value) {
            return value;
        }
        var referenceDate = new Date();
        if (reference) {
            referenceDate = new Date(reference);
        }
        var dateValue = new Date(value);
        if (dateValue >= referenceDate) {
            return "0s ago";
        }
        var differenceMs = referenceDate.getTime() - dateValue.getTime();
        var seconds = Math.floor(differenceMs / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        var weeks = Math.floor(days / 7);
        var years = Math.floor(weeks / 52);
        if (years > 0) {
            return years + "y ago";
        }
        if (weeks > 0) {
            return weeks + "w ago";
        }
        if (days > 0) {
            return days + "d ago";
        }
        if (hours > 0) {
            return hours + "h ago";
        }
        if (minutes > 0) {
            return minutes + "m ago";
        }
        return seconds + "s ago";
    };
    FriendlyDateDiffPipe = __decorate([
        core_1.Pipe({
            name: 'friendlydatediff'
        })
    ], FriendlyDateDiffPipe);
    return FriendlyDateDiffPipe;
}());
exports.FriendlyDateDiffPipe = FriendlyDateDiffPipe;
//# sourceMappingURL=friendlydatediff.js.map