"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TokenPipe = /** @class */ (function () {
    function TokenPipe() {
    }
    TokenPipe.prototype.transform = function (number, decimals) {
        if (decimals === void 0) { decimals = 18; }
        decimals = Math.pow(10, decimals);
        return number / decimals;
    };
    TokenPipe = __decorate([
        core_1.Pipe({
            name: 'token'
        })
    ], TokenPipe);
    return TokenPipe;
}());
exports.TokenPipe = TokenPipe;
//# sourceMappingURL=token.pipe.js.map