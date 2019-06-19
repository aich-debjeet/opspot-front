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
var router_1 = require("@angular/router");
var api_1 = require("../../../services/api");
var RevenueLedgerComponent = /** @class */ (function () {
    function RevenueLedgerComponent(client, currencyPipe, cd, route) {
        var _this = this;
        this.client = client;
        this.currencyPipe = currencyPipe;
        this.cd = cd;
        this.route = route;
        this.type = 'charge';
        this.transactions = [];
        this.inProgress = false;
        this.offset = '';
        this.moreData = false;
        route.url.subscribe(function (url) {
            _this.type = url[0].path;
        });
    }
    RevenueLedgerComponent.prototype.ngOnInit = function () {
        this.loadList(true);
    };
    RevenueLedgerComponent.prototype.loadList = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress) {
            return;
        }
        this.inProgress = true;
        if (refresh) {
            this.offset = '';
            this.moreData = true;
        }
        return this.client.get("api/v1/monetization/service/analytics/list", {
            offset: this.offset,
            limit: 12,
            type: this.type
        })
            .then(function (_a) {
            var transactions = _a.transactions, loadNext = _a["load-next"];
            var _b;
            _this.inProgress = false;
            if (transactions) {
                transactions.map(function (transaction) {
                    switch (transaction.category) {
                        case 'points':
                            transaction.category = 'Points (Affiliate)';
                            break;
                        case 'plus':
                            transaction.category = 'Plus (Affiliate)';
                            break;
                    }
                    return transaction;
                });
                (_b = _this.transactions).push.apply(_b, transactions);
            }
            if (loadNext) {
                _this.offset = loadNext;
            }
            else {
                _this.moreData = false;
            }
            _this.cd.markForCheck();
            _this.cd.detectChanges();
        })
            .catch(function (e) {
            _this.inProgress = false;
            _this.cd.markForCheck();
            _this.cd.detectChanges();
            //this.error = e.message || 'Server error';
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RevenueLedgerComponent.prototype, "type", void 0);
    RevenueLedgerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-revenue--ledger',
            templateUrl: 'ledger.component.html',
            providers: [
                common_1.CurrencyPipe
            ]
        }),
        __metadata("design:paramtypes", [api_1.Client, common_1.CurrencyPipe, core_1.ChangeDetectorRef, router_1.ActivatedRoute])
    ], RevenueLedgerComponent);
    return RevenueLedgerComponent;
}());
exports.RevenueLedgerComponent = RevenueLedgerComponent;
//# sourceMappingURL=ledger.component.js.map