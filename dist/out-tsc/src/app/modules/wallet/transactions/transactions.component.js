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
var router_1 = require("@angular/router");
var session_1 = require("../../../services/session");
var WalletTransactionsComponent = /** @class */ (function () {
    function WalletTransactionsComponent(session, route, router) {
        this.session = session;
        this.route = route;
        this.router = router;
        this.type = '';
        this.togglePurchase = false;
    }
    WalletTransactionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.type = 'points';
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['type']) {
                _this.type = params['type'];
            }
            if (params['stub'] && params['stub'] === 'purchase') {
                _this.togglePurchase = true;
            }
        });
        this.route.url.subscribe(function (url) {
            if (url[0].path === 'purchase')
                _this.togglePurchase = true;
        });
    };
    WalletTransactionsComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    WalletTransactionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-wallet-transactions',
            templateUrl: 'transactions.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, router_1.ActivatedRoute, router_1.Router])
    ], WalletTransactionsComponent);
    return WalletTransactionsComponent;
}());
exports.WalletTransactionsComponent = WalletTransactionsComponent;
//# sourceMappingURL=transactions.component.js.map