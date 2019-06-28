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
var api_1 = require("../../../services/api");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var modal_component_1 = require("../../modals/confirm-password/modal.component");
var SettingsDisableChannelComponent = /** @class */ (function () {
    function SettingsDisableChannelComponent(client, router, overlayModal) {
        this.client = client;
        this.router = router;
        this.overlayModal = overlayModal;
        this.opspot = window.Opspot;
    }
    SettingsDisableChannelComponent.prototype.disable = function () {
        var _this = this;
        this.client.delete('api/v1/channel')
            .then(function (response) {
            _this.router.navigate(['/logout']);
        })
            .catch(function (e) {
            alert('Sorry, we could not disable your account');
        });
    };
    SettingsDisableChannelComponent.prototype.delete = function () {
        var _this = this;
        if (!confirm('Your account and all data related to it will be deleted permanently. Are you sure you want to proceed?')) {
            return;
        }
        var creator = this.overlayModal.create(modal_component_1.ConfirmPasswordModalComponent, {}, {
            class: 'm-overlay-modal--small',
            onComplete: function (_a) {
                var password = _a.password;
                _this.client.post('api/v2/settings/delete', { password: password })
                    .then(function (response) {
                    _this.router.navigate(['/logout']);
                })
                    .catch(function (e) {
                    alert('Sorry, we could not delete your account');
                });
            }
        });
        creator.present();
    };
    SettingsDisableChannelComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-settings--disable-channel',
            inputs: ['object'],
            templateUrl: 'disable.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client, router_1.Router, overlay_modal_1.OverlayModalService])
    ], SettingsDisableChannelComponent);
    return SettingsDisableChannelComponent;
}());
exports.SettingsDisableChannelComponent = SettingsDisableChannelComponent;
//# sourceMappingURL=disable.component.js.map