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
var client_service_1 = require("../../common/api/client.service");
var MonetizationOverviewComponent = /** @class */ (function () {
    function MonetizationOverviewComponent(client, cd) {
        this.client = client;
        this.cd = cd;
        this.balance = 0;
        this.payouts = 0;
        this.net = 0;
        this.ready = false;
        this.user = window.Opspot.user;
    }
    MonetizationOverviewComponent.prototype.ngOnInit = function () {
        this.getTotals();
    };
    MonetizationOverviewComponent.prototype.getTotals = function () {
        var _this = this;
        this.client.get('api/v1/monetization/revenue/overview')
            .then(function (response) {
            console.log(response);
            _this.balance = response.balance;
            _this.payouts = response.payouts;
            _this.net = response.total.net;
            _this.ready = true;
            _this.cd.markForCheck();
            _this.cd.detectChanges();
        });
    };
    MonetizationOverviewComponent = __decorate([
        core_1.Component({
            selector: 'm-monetization--overview',
            templateUrl: 'overview.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_service_1.Client, core_1.ChangeDetectorRef])
    ], MonetizationOverviewComponent);
    return MonetizationOverviewComponent;
}());
exports.MonetizationOverviewComponent = MonetizationOverviewComponent;
//# sourceMappingURL=overview.component.js.map