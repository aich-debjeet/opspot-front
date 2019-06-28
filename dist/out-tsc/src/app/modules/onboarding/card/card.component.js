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
var onboarding_service_1 = require("../onboarding.service");
var OnboardingCardComponent = /** @class */ (function () {
    function OnboardingCardComponent(service) {
        this.service = service;
    }
    OnboardingCardComponent.prototype.close = function (e) {
        e.stopPropagation();
        this.service.hide(this.id);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OnboardingCardComponent.prototype, "route", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OnboardingCardComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OnboardingCardComponent.prototype, "text", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OnboardingCardComponent.prototype, "subtext", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OnboardingCardComponent.prototype, "class", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OnboardingCardComponent.prototype, "id", void 0);
    OnboardingCardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-onboarding-card',
            templateUrl: 'card.component.html'
        }),
        __metadata("design:paramtypes", [onboarding_service_1.OnboardingService])
    ], OnboardingCardComponent);
    return OnboardingCardComponent;
}());
exports.OnboardingCardComponent = OnboardingCardComponent;
//# sourceMappingURL=card.component.js.map