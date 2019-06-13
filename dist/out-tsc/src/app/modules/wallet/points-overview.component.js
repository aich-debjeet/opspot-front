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
var wallet_1 = require("../../services/wallet");
var blockchain_service_1 = require("../blockchain/blockchain.service");
var PointsOverviewComponent = /** @class */ (function () {
    function PointsOverviewComponent(wallet, cd, blockchain) {
        this.wallet = wallet;
        this.cd = cd;
        this.blockchain = blockchain;
        this.isLoading = false;
        this.currency = 'points';
    }
    PointsOverviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.detectChanges();
        var requests = [
            this.wallet.getBalance(true).catch(function () { return false; }),
        ];
        Promise.all(requests)
            .then(function (results) {
            _this.isLoading = false;
            if (results[1]) {
                _this.currency = 'tokens';
                _this.amount = results[1];
            }
            else {
                _this.currency = 'points';
                //this.amount = results[0]; // not used
            }
            _this.detectChanges();
        })
            .catch(function (e) {
            _this.isLoading = false;
            _this.detectChanges();
        });
    };
    PointsOverviewComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    PointsOverviewComponent = __decorate([
        core_1.Component({
            selector: 'm-wallet--points-overview',
            templateUrl: 'points-overview.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [wallet_1.WalletService, core_1.ChangeDetectorRef, blockchain_service_1.BlockchainService])
    ], PointsOverviewComponent);
    return PointsOverviewComponent;
}());
exports.PointsOverviewComponent = PointsOverviewComponent;
//# sourceMappingURL=points-overview.component.js.map