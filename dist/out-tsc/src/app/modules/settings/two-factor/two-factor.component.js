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
var api_1 = require("../../../services/api");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var modal_component_1 = require("../../modals/confirm-password/modal.component");
var SettingsTwoFactorComponent = /** @class */ (function () {
    function SettingsTwoFactorComponent(client, overlayModal) {
        this.client = client;
        this.overlayModal = overlayModal;
        this.waitingForCheck = false;
        this.sendingSms = false;
        this.inProgress = false;
        this.error = '';
        this.opspot = window.Opspot;
        this.load();
    }
    SettingsTwoFactorComponent.prototype.load = function () {
        var _this = this;
        this.inProgress = true;
        this.client.get('api/v1/twofactor')
            .then(function (response) {
            if (response.telno)
                _this.telno = response.telno;
            _this.inProgress = false;
        });
    };
    SettingsTwoFactorComponent.prototype.setup = function (smsNumber) {
        var _this = this;
        this.telno = smsNumber;
        this.waitingForCheck = true;
        this.sendingSms = true;
        this.error = '';
        this.client.post('api/v1/twofactor/setup', { tel: smsNumber })
            .then(function (response) {
            _this.secret = response.secret;
            _this.sendingSms = false;
        })
            .catch(function (e) {
            _this.waitingForCheck = false;
            _this.sendingSms = false;
            _this.telno = null;
            if (e.message == 'voip phones not allowed') {
                _this.error = "We don't allow voip phones. Please, try again with a different number";
            }
            _this.error = 'The phone number you entered was incorrect. Please, try again.';
        });
    };
    SettingsTwoFactorComponent.prototype.check = function (code) {
        var _this = this;
        this.client.post('api/v1/twofactor/check', {
            code: code,
            telno: this.telno,
            secret: this.secret,
        })
            .then(function (response) {
            _this.waitingForCheck = false;
        })
            .catch(function (response) {
            _this.waitingForCheck = false;
            _this.telno = null;
            _this.error = 'The code was incorrect. Please, try again.';
        });
    };
    SettingsTwoFactorComponent.prototype.retry = function () {
        this.telno = null;
        this.waitingForCheck = false;
    };
    SettingsTwoFactorComponent.prototype.cancel = function () {
        var _this = this;
        var creator = this.overlayModal.create(modal_component_1.ConfirmPasswordModalComponent, {}, {
            class: 'm-overlay-modal--small',
            onComplete: function (_a) {
                var password = _a.password;
                _this.client.post('api/v1/twofactor/remove', {
                    password: password
                });
                _this.telno = null;
                _this.error = '';
            }
        });
        creator.present();
    };
    SettingsTwoFactorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-settings--two-factor',
            inputs: ['object'],
            templateUrl: 'two-factor.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client, overlay_modal_1.OverlayModalService])
    ], SettingsTwoFactorComponent);
    return SettingsTwoFactorComponent;
}());
exports.SettingsTwoFactorComponent = SettingsTwoFactorComponent;
//# sourceMappingURL=two-factor.component.js.map