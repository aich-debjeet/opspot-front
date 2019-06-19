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
var subscription_component_1 = require("./subscription.component");
var client_service_1 = require("../../common/api/client.service");
var PlusMarketingComponent = /** @class */ (function () {
    function PlusMarketingComponent(client, cd) {
        this.client = client;
        this.cd = cd;
        this.user = window.Opspot.user;
        this.opspot = window.Opspot;
        this.showVerify = false;
    }
    __decorate([
        core_1.ViewChild('subscription'),
        __metadata("design:type", subscription_component_1.PlusSubscriptionComponent)
    ], PlusMarketingComponent.prototype, "subscription", void 0);
    PlusMarketingComponent = __decorate([
        core_1.Component({
            selector: 'm-plus--marketing',
            templateUrl: 'marketing.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_service_1.Client, core_1.ChangeDetectorRef])
    ], PlusMarketingComponent);
    return PlusMarketingComponent;
}());
exports.PlusMarketingComponent = PlusMarketingComponent;
//# sourceMappingURL=marketing.component.js.map