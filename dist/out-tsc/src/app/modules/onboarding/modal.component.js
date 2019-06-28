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
var overlay_modal_1 = require("../../services/ux/overlay-modal");
var OnboardingModalComponent = /** @class */ (function () {
    function OnboardingModalComponent(cd, route, session, overlayModal) {
        this.cd = cd;
        this.route = route;
        this.session = session;
        this.overlayModal = overlayModal;
        this.slide = 1;
    }
    OnboardingModalComponent.prototype.next = function () {
        this.slide++;
        this.detectChanges();
        if (this.slide > 2) {
            this.overlayModal.dismiss();
        }
    };
    OnboardingModalComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    OnboardingModalComponent = __decorate([
        core_1.Component({
            selector: 'm-onboarding--modal',
            templateUrl: 'modal.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            router_1.ActivatedRoute,
            session_1.Session,
            overlay_modal_1.OverlayModalService])
    ], OnboardingModalComponent);
    return OnboardingModalComponent;
}());
exports.OnboardingModalComponent = OnboardingModalComponent;
//# sourceMappingURL=modal.component.js.map