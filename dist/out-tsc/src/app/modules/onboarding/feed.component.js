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
var session_1 = require("../../services/session");
var OnboardingFeedComponent = /** @class */ (function () {
    function OnboardingFeedComponent(route, session) {
        this.route = route;
        this.session = session;
    }
    OnboardingFeedComponent.prototype.ngOnDestroy = function () {
        if (this.paramsSubscription)
            this.paramsSubscription.unsubscribe();
    };
    OnboardingFeedComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-onboarding-feed',
            templateUrl: 'feed.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            session_1.Session])
    ], OnboardingFeedComponent);
    return OnboardingFeedComponent;
}());
exports.OnboardingFeedComponent = OnboardingFeedComponent;
//# sourceMappingURL=feed.component.js.map