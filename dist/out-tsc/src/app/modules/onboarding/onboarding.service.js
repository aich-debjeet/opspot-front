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
var overlay_modal_1 = require("../../services/ux/overlay-modal");
var api_1 = require("../../services/api");
var session_1 = require("../../services/session");
var storage_1 = require("../../services/storage");
var modal_component_1 = require("./modal.component");
var OnboardingService = /** @class */ (function () {
    function OnboardingService(client, session, storage, route, overlayModal) {
        this.client = client;
        this.session = session;
        this.storage = storage;
        this.route = route;
        this.overlayModal = overlayModal;
    }
    OnboardingService.prototype.enable = function () {
        this.storage.set('onboarding', true);
    };
    OnboardingService.prototype.shouldShow = function (id) {
        if (!this.storage.get('onboarding'))
            return false;
        if (this.storage.get('onboarding.seen.' + id))
            return false;
        return true;
    };
    OnboardingService.prototype.hide = function (id) {
        this.storage.set('onboarding.seen.' + id, true);
    };
    OnboardingService.prototype.show = function () {
        var modal = this.overlayModal.create(modal_component_1.OnboardingModalComponent, {}, { class: 'm-onboarding--modal-wrapper' });
        modal.present();
    };
    OnboardingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_1.Client,
            session_1.Session,
            storage_1.Storage,
            router_1.ActivatedRoute,
            overlay_modal_1.OverlayModalService])
    ], OnboardingService);
    return OnboardingService;
}());
exports.OnboardingService = OnboardingService;
//# sourceMappingURL=onboarding.service.js.map