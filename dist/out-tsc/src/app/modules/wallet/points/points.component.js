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
var session_1 = require("../../../services/session");
var WalletPointsComponent = /** @class */ (function () {
    function WalletPointsComponent(client, cd, session) {
        this.client = client;
        this.cd = cd;
        this.session = session;
        this.transactions = [];
        this.offset = '';
        this.inProgress = false;
        this.moreData = true;
        this.load();
    }
    WalletPointsComponent.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        this.inProgress = true;
        this.client.get('api/v1/wallet/transactions', { limit: 12, offset: this.offset })
            .then(function (response) {
            if (!response.transactions) {
                _this.moreData = false;
                _this.inProgress = false;
                return false;
            }
            if (refresh) {
                _this.transactions = response.transactions;
            }
            else {
                if (_this.offset)
                    response.transactions.shift();
                for (var _i = 0, _a = response.transactions; _i < _a.length; _i++) {
                    var transaction = _a[_i];
                    _this.transactions.push(transaction);
                }
            }
            _this.offset = response['load-next'];
            _this.inProgress = false;
            _this.cd.markForCheck();
            _this.cd.detectChanges();
        });
    };
    WalletPointsComponent = __decorate([
        core_1.Component({
            selector: 'm-wallet--points',
            templateUrl: 'points.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            core_1.ChangeDetectorRef,
            session_1.Session])
    ], WalletPointsComponent);
    return WalletPointsComponent;
}());
exports.WalletPointsComponent = WalletPointsComponent;
//# sourceMappingURL=points.component.js.map