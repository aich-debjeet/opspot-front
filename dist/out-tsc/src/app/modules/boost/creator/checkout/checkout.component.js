"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var BoostCreatorCheckoutComponent = /** @class */ (function () {
    function BoostCreatorCheckoutComponent(_changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this.boostChanged = new core_1.EventEmitter();
        this.rates = {
            balance: null,
            rate: 1,
            min: 250,
            cap: 5000,
            usd: 1000,
            tokens: 1000,
            minUsd: 1,
            priority: 1,
            maxCategories: 3
        };
    }
    BoostCreatorCheckoutComponent.prototype.setNonce = function (nonce) {
        this.boost.nonce = nonce;
        this.boostChanged.next(this.boost);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BoostCreatorCheckoutComponent.prototype, "boost", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], BoostCreatorCheckoutComponent.prototype, "boostChanged", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BoostCreatorCheckoutComponent.prototype, "rates", void 0);
    BoostCreatorCheckoutComponent = __decorate([
        core_1.Component({
            providers: [common_1.CurrencyPipe],
            selector: 'm-boost--creator-checkout',
            templateUrl: 'checkout.component.html'
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], BoostCreatorCheckoutComponent);
    return BoostCreatorCheckoutComponent;
}());
exports.BoostCreatorCheckoutComponent = BoostCreatorCheckoutComponent;
//# sourceMappingURL=checkout.component.js.map