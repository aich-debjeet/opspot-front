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
var client_service_1 = require("../../../common/api/client.service");
var AffiliateMarketingComponent = /** @class */ (function () {
    function AffiliateMarketingComponent(client, cd) {
        this.client = client;
        this.cd = cd;
        this.opspot = window.Opspot;
        this.user = window.Opspot.user;
        this.showOnboarding = false;
        this.link = '';
        if (this.user)
            this.link = this.opspot.site_url + 'register;referrer=' + this.user.username;
    }
    AffiliateMarketingComponent.prototype.isAffiliate = function () {
        if (!this.user)
            return false;
        for (var _i = 0, _a = this.user.programs; _i < _a.length; _i++) {
            var program = _a[_i];
            if (program === 'affiliate')
                return true;
        }
        return false;
    };
    AffiliateMarketingComponent.prototype.join = function () {
        if (!this.user.merchant && !this.user.merchant.id) {
            this.showOnboarding = true;
            return;
        }
        this.user.programs.push('affiliate');
        this.client.put('api/v1/monetization/affiliates');
        this.detectChanges();
    };
    AffiliateMarketingComponent.prototype.onboardCompleted = function (response) {
        this.user.merchant = {
            id: response.id,
            service: 'stripe',
            status: 'awaiting-document',
            exclusive: {
                enabled: true,
                amount: 10
            }
        };
        this.showOnboarding = false;
        this.join();
        this.detectChanges();
    };
    AffiliateMarketingComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    AffiliateMarketingComponent = __decorate([
        core_1.Component({
            selector: 'm-affiliate--marketing',
            templateUrl: 'marketing.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_service_1.Client, core_1.ChangeDetectorRef])
    ], AffiliateMarketingComponent);
    return AffiliateMarketingComponent;
}());
exports.AffiliateMarketingComponent = AffiliateMarketingComponent;
//# sourceMappingURL=marketing.component.js.map