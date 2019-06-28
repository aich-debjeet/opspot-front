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
var wallet_service_1 = require("./wallet.service");
var session_1 = require("../../services/session");
var storage_1 = require("../../services/storage");
var animations_1 = require("../../animations");
var WalletToggleComponent = /** @class */ (function () {
    function WalletToggleComponent(session, wallet, storage) {
        this.session = session;
        this.wallet = wallet;
        this.storage = storage;
        this.walletPopContent = '';
        this.balance = 0;
        this.toggled = false;
        this.queueWalletAnimationPoints = 0;
    }
    WalletToggleComponent.prototype.ngAfterViewInit = function () {
        this.walletListen();
    };
    WalletToggleComponent.prototype.ngOnDestroy = function () {
        this.walletUnListen();
    };
    WalletToggleComponent.prototype.walletListen = function () {
        var _this = this;
        this.walletSubscription = this.wallet.onPoints().subscribe(function (_a) {
            var batch = _a.batch, total = _a.total;
            if (total === null) {
                total = '…';
            }
            if (batch && !_this.storage.get('disablePointsAnimation')) {
                _this.queueWalletAnimation(batch);
            }
        });
    };
    WalletToggleComponent.prototype.walletUnListen = function () {
        if (this.walletSubscription) {
            this.walletSubscription.unsubscribe();
        }
    };
    WalletToggleComponent.prototype.queueWalletAnimation = function (points) {
        var _this = this;
        if (this.queueWalletAnimationTimer) {
            clearTimeout(this.queueWalletAnimationTimer);
        }
        this.queueWalletAnimationPoints += points;
        this.queueWalletAnimationTimer = setTimeout(function () {
            if (_this.queueWalletAnimationPoints > 0) {
                _this.playWalletAnimation(_this.queueWalletAnimationPoints);
            }
            _this.queueWalletAnimationPoints = 0;
        }, 1000);
    };
    WalletToggleComponent.prototype.playWalletAnimation = function (points) {
        this.walletPopContent = "+" + points;
        this.walletPopState = Date.now();
    };
    WalletToggleComponent.prototype.toggle = function () {
        this.toggled = !this.toggled;
    };
    WalletToggleComponent = __decorate([
        core_1.Component({
            selector: 'm-wallet--topbar-toggle',
            templateUrl: 'toggle.component.html',
            animations: animations_1.animations
        }),
        __metadata("design:paramtypes", [session_1.Session, wallet_service_1.WalletService, storage_1.Storage])
    ], WalletToggleComponent);
    return WalletToggleComponent;
}());
exports.WalletToggleComponent = WalletToggleComponent;
//# sourceMappingURL=toggle.component.js.map