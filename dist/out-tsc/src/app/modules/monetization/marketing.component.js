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
var MonetizationMarketingComponent = /** @class */ (function () {
    function MonetizationMarketingComponent(client, cd) {
        this.client = client;
        this.cd = cd;
        this.opspot = window.Opspot;
        this.user = window.Opspot.user;
        this.showOnboardingForm = false;
    }
    MonetizationMarketingComponent.prototype.ngOnInit = function () {
        if (this.user)
            this.load();
    };
    MonetizationMarketingComponent.prototype.load = function () {
        return this.client.get('api/v1/merchant/status')
            .then(function (response) {
            console.log(response);
            return response;
        })
            .catch(function (e) {
            throw e;
        });
    };
    MonetizationMarketingComponent.prototype.isMonetized = function () {
        if (this.user && this.user.merchant.id)
            return true;
        return false;
    };
    MonetizationMarketingComponent.prototype.onboard = function () {
        this.showOnboardingForm = true;
        this.detectChanges();
    };
    MonetizationMarketingComponent.prototype.onboardCompleted = function (response) {
        this.user.merchant = {
            id: response.id,
            service: 'stripe',
            status: 'awaiting-document',
            exclusive: {
                enabled: true,
                amount: 10
            }
        };
        this.showOnboardingForm = false;
        this.detectChanges();
    };
    MonetizationMarketingComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    MonetizationMarketingComponent = __decorate([
        core_1.Component({
            selector: 'm-monetization--marketing',
            templateUrl: 'marketing.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_service_1.Client, core_1.ChangeDetectorRef])
    ], MonetizationMarketingComponent);
    return MonetizationMarketingComponent;
}());
exports.MonetizationMarketingComponent = MonetizationMarketingComponent;
//# sourceMappingURL=marketing.component.js.map