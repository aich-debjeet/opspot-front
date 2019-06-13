"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TimediffPipe = /** @class */ (function () {
    function TimediffPipe() {
    }
    TimediffPipe.prototype.transform = function (time, displaySeconds) {
        if (displaySeconds === void 0) { displaySeconds = false; }
        var seconds = time % 60;
        var minutes = Math.floor(time / 60) % 60;
        var hours = Math.floor(time / 3600);
        var output = '';
        if (hours > 0) {
            output += hours + "h ";
        }
        if (minutes > 0 || !displaySeconds) {
            output += minutes + "m ";
        }
        if (displaySeconds) {
            output += seconds + "s";
        }
        return output;
    };
    TimediffPipe = __decorate([
        core_1.Pipe({
            name: 'timediff'
        })
    ], TimediffPipe);
    return TimediffPipe;
}());
exports.TimediffPipe = TimediffPipe;
//# sourceMappingURL=timediff.pipe.js.map