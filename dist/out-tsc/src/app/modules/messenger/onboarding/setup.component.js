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
var client_1 = require("../../../services/api/client");
var session_1 = require("../../../services/session");
var encryption_service_1 = require("../encryption/encryption.service");
var MessengerOnboardingSetupComponent = /** @class */ (function () {
    function MessengerOnboardingSetupComponent(client, cd, session, router, encryption) {
        this.client = client;
        this.cd = cd;
        this.session = session;
        this.router = router;
        this.encryption = encryption;
        this.skippable = true;
        this.next = new core_1.EventEmitter();
        this.inProgress = false;
        this.opspot = window.Opspot;
    }
    MessengerOnboardingSetupComponent.prototype.setup = function () {
        var _this = this;
        if (this.inProgress)
            return;
        this.inProgress = true;
        this.encryption.doSetup(this.password2)
            .then(function () {
            _this.next.next(true);
            _this.inProgress = false;
        })
            .catch(function () {
            _this.error = 'Sorry, there was a problem.';
            _this.inProgress = false;
        });
        this.detectChanges();
    };
    MessengerOnboardingSetupComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MessengerOnboardingSetupComponent.prototype, "skippable", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MessengerOnboardingSetupComponent.prototype, "next", void 0);
    MessengerOnboardingSetupComponent = __decorate([
        core_1.Component({
            selector: 'm-messenger--onboarding--setup',
            templateUrl: 'setup.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_1.Client,
            core_1.ChangeDetectorRef,
            session_1.Session,
            router_1.Router,
            encryption_service_1.MessengerEncryptionService])
    ], MessengerOnboardingSetupComponent);
    return MessengerOnboardingSetupComponent;
}());
exports.MessengerOnboardingSetupComponent = MessengerOnboardingSetupComponent;
//# sourceMappingURL=setup.component.js.map