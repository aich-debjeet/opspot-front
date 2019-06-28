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
var client_1 = require("../../../services/api/client");
var session_1 = require("../../../services/session");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var creator_component_1 = require("../creator/creator.component");
var service_1 = require("../../modals/signup/service");
var WireLockScreenComponent = /** @class */ (function () {
    function WireLockScreenComponent(session, client, cd, overlayModal, modal) {
        this.session = session;
        this.client = client;
        this.cd = cd;
        this.overlayModal = overlayModal;
        this.modal = modal;
        this.update = new core_1.EventEmitter();
        this.showSubmittedInfo = false;
        this.inProgress = false;
    }
    WireLockScreenComponent.prototype.unlock = function () {
        var _this = this;
        if (this.preview) {
            return;
        }
        if (!this.session.isLoggedIn()) {
            this.modal.open();
            return;
        }
        this.showSubmittedInfo = false;
        this.inProgress = true;
        this.detectChanges();
        this.client.get('api/v1/wire/threshold/' + this.entity.guid)
            .then(function (response) {
            if (response.hasOwnProperty('activity')) {
                _this.update.next(response.activity);
                _this.detectChanges();
            }
            else if (response.hasOwnProperty('entity')) {
                _this.update.next(response.entity);
                _this.detectChanges();
            }
            else {
                _this.showWire();
            }
            _this.inProgress = false;
            _this.detectChanges();
        })
            .catch(function (e) {
            _this.inProgress = false;
            _this.detectChanges();
            console.error('got error: ', e);
        });
    };
    WireLockScreenComponent.prototype.showWire = function () {
        var _this = this;
        if (this.preview) {
            return;
        }
        this.overlayModal.create(creator_component_1.WireCreatorComponent, this.entity, {
            onComplete: function () { return _this.wireSubmitted(); },
            default: this.entity.wire_threshold
        })
            .present();
    };
    WireLockScreenComponent.prototype.wireSubmitted = function () {
        this.showSubmittedInfo = true;
        this.detectChanges();
    };
    WireLockScreenComponent.prototype.isOwner = function () {
        return this.entity.ownerObj.guid === this.session.getLoggedInUser().guid;
    };
    WireLockScreenComponent.prototype.getBackground = function () {
        if (!this.entity) {
            return;
        }
        if (this.entity._preview) {
            return "url(" + this.entity.ownerObj.merchant.exclusive._backgroundPreview + ")";
        }
        if (!this.entity.ownerObj
            || !this.entity.ownerObj.merchant
            || !this.entity.ownerObj.merchant.exclusive
            || !this.entity.ownerObj.merchant.exclusive.background) {
            return null;
        }
        var image = window.Opspot.cdn_url + 'fs/v1/paywall/preview/' + this.entity.ownerObj.guid + '/'
            + this.entity.ownerObj.merchant.exclusive.background;
        return "url(" + image + ")";
    };
    WireLockScreenComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireLockScreenComponent.prototype, "entity", void 0);
    __decorate([
        core_1.Output('entityChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], WireLockScreenComponent.prototype, "update", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireLockScreenComponent.prototype, "preview", void 0);
    WireLockScreenComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-wire--lock-screen',
            templateUrl: 'wire-lock-screen.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [session_1.Session,
            client_1.Client,
            core_1.ChangeDetectorRef,
            overlay_modal_1.OverlayModalService,
            service_1.SignupModalService])
    ], WireLockScreenComponent);
    return WireLockScreenComponent;
}());
exports.WireLockScreenComponent = WireLockScreenComponent;
//# sourceMappingURL=wire-lock-screen.component.js.map