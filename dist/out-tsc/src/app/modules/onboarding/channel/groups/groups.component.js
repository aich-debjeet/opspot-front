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
var GroupsOnboardingComponent = /** @class */ (function () {
    function GroupsOnboardingComponent() {
        this.opspot = window.Opspot;
    }
    GroupsOnboardingComponent.items = ['suggested_groups'];
    GroupsOnboardingComponent.canSkip = true;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], GroupsOnboardingComponent.prototype, "pendingItems", void 0);
    GroupsOnboardingComponent = __decorate([
        core_1.Component({
            selector: 'm-channel--onboarding--groups',
            template: "\n    <div class=\"m-channelOnboarding__slide\">\n      <h2>Join some popular groups</h2>\n\n      <div class=\"m-channelOnboardingSlide__list\">\n        <m-suggestions__sidebarGroups></m-suggestions__sidebarGroups>\n      </div>\n    </div>\n  "
        })
    ], GroupsOnboardingComponent);
    return GroupsOnboardingComponent;
}());
exports.GroupsOnboardingComponent = GroupsOnboardingComponent;
//# sourceMappingURL=groups.component.js.map