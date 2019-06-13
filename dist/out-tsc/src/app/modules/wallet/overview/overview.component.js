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
var storage_1 = require("../../../services/storage");
var api_1 = require("../../../services/api");
var title_1 = require("../../../services/ux/title");
var session_1 = require("../../../services/session");
var wallet_1 = require("../../../services/wallet");
var blockchain_service_1 = require("../../blockchain/blockchain.service");
var WalletOverviewComponent = /** @class */ (function () {
    function WalletOverviewComponent(client, wallet, router, route, title, storage, blockchain, session) {
        this.client = client;
        this.wallet = wallet;
        this.router = router;
        this.route = route;
        this.title = title;
        this.storage = storage;
        this.blockchain = blockchain;
        this.session = session;
        this.type = '';
        this.togglePurchase = false;
        this.points = 0;
        this.transactions = [];
        this.offset = '';
        this.inProgress = false;
        this.moreData = true;
        this.currency = 'usd';
        this.balance = 0;
        this.payouts = 0;
        this.net = 0;
        this.ready = false;
        this.filter = 'payments';
        this.hasTokens = false;
        this.hasMoney = false;
    }
    WalletOverviewComponent.prototype.ngOnInit = function () {
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
        this.getTotals();
    };
    WalletOverviewComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    WalletOverviewComponent.prototype.getTotals = function () {
        var _this = this;
        var requests = [
            this.client.get('api/v1/monetization/revenue/overview').catch(function () { return false; }),
            this.wallet.getBalance(true).catch(function () { return false; }),
            this.blockchain.getBalance(true).catch(function () { return false; })
        ];
        Promise.all(requests)
            .then(function (results) {
            if (results[0]) {
                _this.currency = results[0].currency;
                _this.balance = results[0].balance;
                _this.payouts = results[0].payouts;
                _this.net = results[0].total.net;
            }
            if (results[2] !== false) {
                _this.tokens = results[2];
            }
            _this.hasMoney = results[0] !== false;
            _this.hasTokens = results[2] !== false;
            _this.overviewColSize = 4;
            if (!_this.hasMoney && !_this.hasTokens) {
                _this.overviewColSize = 12;
            }
            else if (!_this.hasMoney || !_this.hasTokens) {
                _this.overviewColSize = 6;
            }
            _this.ready = true;
        });
    };
    WalletOverviewComponent.prototype.getCurrencySymbol = function (currency) {
        switch (currency) {
            case 'gbp':
                return '£';
            case 'eur':
                return '€';
            case 'usd':
            default:
                return '$';
        }
    };
    WalletOverviewComponent = __decorate([
        core_1.Component({
            selector: 'm-wallet--overview',
            templateUrl: 'overview.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            wallet_1.WalletService,
            router_1.Router,
            router_1.ActivatedRoute,
            title_1.OpspotTitle,
            storage_1.Storage,
            blockchain_service_1.BlockchainService,
            session_1.Session])
    ], WalletOverviewComponent);
    return WalletOverviewComponent;
}());
exports.WalletOverviewComponent = WalletOverviewComponent;
//# sourceMappingURL=overview.component.js.map