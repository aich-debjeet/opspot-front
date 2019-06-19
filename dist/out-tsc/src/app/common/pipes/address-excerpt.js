"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var address_excerpt_1 = require("../../helpers/address-excerpt");
var AddressExcerptPipe = /** @class */ (function () {
    function AddressExcerptPipe() {
    }
    AddressExcerptPipe.prototype.transform = function (value, uppercase) {
        if (uppercase === void 0) { uppercase = false; }
        return address_excerpt_1.default(uppercase ? value.toUpperCase() : value);
    };
    AddressExcerptPipe = __decorate([
        core_1.Pipe({
            name: 'addressExcerpt'
        })
    ], AddressExcerptPipe);
    return AddressExcerptPipe;
}());
exports.AddressExcerptPipe = AddressExcerptPipe;
//# sourceMappingURL=address-excerpt.js.map