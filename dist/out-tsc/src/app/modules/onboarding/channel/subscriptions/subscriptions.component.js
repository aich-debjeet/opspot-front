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
var SubscriptionsOnboardingComponent = /** @class */ (function () {
    function SubscriptionsOnboardingComponent() {
    }
    SubscriptionsOnboardingComponent.items = ['suggested_channels'];
    SubscriptionsOnboardingComponent.canSkip = true;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], SubscriptionsOnboardingComponent.prototype, "pendingItems", void 0);
    SubscriptionsOnboardingComponent = __decorate([
        core_1.Component({
            selector: 'm-channel--onboarding--subscriptions',
            template: "\n    <div class=\"m-channelOnboarding__slide\">\n      <h2>Subscribe to some popular channels</h2>\n      <div class=\"m-channelOnboardingSlide__list\">\n        <m-suggestions__sidebar></m-suggestions__sidebar>\n      </div>\n    </div>\n  "
        })
    ], SubscriptionsOnboardingComponent);
    return SubscriptionsOnboardingComponent;
}());
exports.SubscriptionsOnboardingComponent = SubscriptionsOnboardingComponent;
//# sourceMappingURL=subscriptions.component.js.map