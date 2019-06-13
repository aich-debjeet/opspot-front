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
var client_1 = require("../../../../../services/api/client");
var session_1 = require("../../../../../services/session");
var TokenIntroductionOnboardingComponent = /** @class */ (function () {
    function TokenIntroductionOnboardingComponent(client, cd, session, router) {
        this.client = client;
        this.cd = cd;
        this.session = session;
        this.router = router;
        this.inProgress = false;
        this.opspot = window.Opspot;
        this.next = new core_1.EventEmitter();
    }
    TokenIntroductionOnboardingComponent.prototype.detectChange = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TokenIntroductionOnboardingComponent.prototype, "next", void 0);
    TokenIntroductionOnboardingComponent = __decorate([
        core_1.Component({
            selector: 'm-token--onboarding--introduction',
            templateUrl: 'introduction.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_1.Client,
            core_1.ChangeDetectorRef,
            session_1.Session,
            router_1.Router])
    ], TokenIntroductionOnboardingComponent);
    return TokenIntroductionOnboardingComponent;
}());
exports.TokenIntroductionOnboardingComponent = TokenIntroductionOnboardingComponent;
//# sourceMappingURL=introduction.component.js.map