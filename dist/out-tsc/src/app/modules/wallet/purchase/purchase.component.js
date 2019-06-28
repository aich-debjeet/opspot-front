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
var api_1 = require("../../../services/api");
var wallet_1 = require("../../../services/wallet");
var WalletPurchaseComponent = /** @class */ (function () {
    function WalletPurchaseComponent(client, wallet, cd) {
        this.client = client;
        this.wallet = wallet;
        this.cd = cd;
        this.card = { month: 'mm', year: 'yyyy' };
        this.ex = 0.01;
        this.points = 10000;
        this.inProgress = false;
        this.confirmation = false;
        this.source = '';
        this.recurring = true;
        this.coupon = '';
        this.error = '';
        this.toggled = true;
        this.getRate();
        this.calculateUSD();
        this.getSubscription();
    }
    WalletPurchaseComponent.prototype.validate = function () {
        if (this.usd < 0.01) {
            return false;
        }
        return true;
    };
    WalletPurchaseComponent.prototype.getRate = function () {
        var _this = this;
        this.client.get('api/v1/wallet/count')
            .then(function (response) {
            _this.ex = response.ex.usd;
            _this.detectChanges();
        });
    };
    WalletPurchaseComponent.prototype.calculatePoints = function () {
        this.points = this.usd / this.ex;
        this.detectChanges();
    };
    WalletPurchaseComponent.prototype.calculateUSD = function () {
        var _this = this;
        this.usd = this.points * this.ex;
        this.client.post('api/v1/wallet/quote', { points: this.points })
            .then(function (response) {
            _this.usd = response.usd;
            _this.detectChanges();
        });
    };
    WalletPurchaseComponent.prototype.getSubscription = function () {
        var _this = this;
        this.client.get('api/v1/wallet/subscription')
            .then(function (response) {
            if (response.subscription) {
                _this.subscription = response.subscription;
            }
            _this.detectChanges();
        });
    };
    WalletPurchaseComponent.prototype.buy = function () {
        if (!this.toggled) {
            this.toggled = true;
        }
        this.detectChanges();
    };
    WalletPurchaseComponent.prototype.purchase = function () {
        var _this = this;
        if (!this.validate()) {
            this.error = 'Sorry, please check your details and try again';
            this.detectChanges();
            return false;
        }
        this.inProgress = true;
        this.error = '';
        if (this.recurring) {
            if (!confirm('Are you sure you want to repeat this transaction every month and get 10% more points?')) {
                return;
            }
            this.client.post('api/v1/wallet/subscription', {
                points: this.points,
                source: this.source,
                coupon: this.coupon
            })
                .then(function (response) {
                if (response.status !== 'success') {
                    _this.error = 'Please check your payment details and try again.';
                    _this.inProgress = false;
                    _this.source = null;
                    _this.detectChanges();
                    return false;
                }
                _this.confirmation = true;
                _this.inProgress = false;
                _this.detectChanges();
            })
                .catch(function (e) {
                _this.error = e.message;
                _this.inProgress = false;
                _this.source = null;
                _this.detectChanges();
            });
        }
        else {
            this.client.post('api/v1/wallet/purchase-once', {
                amount: this.usd,
                points: this.points,
                source: this.source
            })
                .then(function (response) {
                if (response.status !== 'success') {
                    _this.error = 'Please check your payment details and try again.';
                    _this.detectChanges();
                    return false;
                }
                _this.confirmation = true;
                _this.inProgress = false;
                _this.detectChanges();
            })
                .catch(function (e) {
                _this.error = e.message;
                _this.inProgress = false;
                _this.source = null;
                _this.detectChanges();
            });
        }
    };
    WalletPurchaseComponent.prototype.cancelSubscription = function () {
        var _this = this;
        if (!confirm('Are you sure you wish to cancel your monthly points subscription?')) {
            return false;
        }
        this.client.delete('api/v1/wallet/subscription')
            .then(function (response) {
            _this.subscription = null;
            _this.detectChanges();
        });
    };
    WalletPurchaseComponent.prototype.setSource = function (source) {
        this.source = source;
        this.purchase();
        this.detectChanges();
    };
    WalletPurchaseComponent.prototype.reset = function () {
        this.getSubscription();
        this.confirmation = false;
        this.source = null;
        this.detectChanges();
    };
    WalletPurchaseComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    WalletPurchaseComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-wallet-purchase',
            templateUrl: 'purchase.component.html',
            inputs: ['toggled']
        }),
        __metadata("design:paramtypes", [api_1.Client, wallet_1.WalletService, core_1.ChangeDetectorRef])
    ], WalletPurchaseComponent);
    return WalletPurchaseComponent;
}());
exports.WalletPurchaseComponent = WalletPurchaseComponent;
//# sourceMappingURL=purchase.component.js.map