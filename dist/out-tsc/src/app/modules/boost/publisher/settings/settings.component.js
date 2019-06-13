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
var client_1 = require("../../../../services/api/client");
var session_1 = require("../../../../services/session");
var BoostPublisherSettingsComponent = /** @class */ (function () {
    function BoostPublisherSettingsComponent(client, session) {
        this.client = client;
        this.session = session;
        this.opspot = window.Opspot;
        this.inProgress = false;
    }
    BoostPublisherSettingsComponent.prototype.submit = function (publisher) {
        var _this = this;
        this.inProgress = true;
        this.opspot.user.show_boosts = true;
        this.client.post("api/v1/settings/" + this.opspot.user.guid, { 'show_boosts': publisher })
            .then(function () {
            _this.inProgress = false;
        })
            .catch(function () {
            _this.opspot.user.show_boosts = false;
            _this.inProgress = false;
        });
    };
    BoostPublisherSettingsComponent.prototype.isMerchant = function () {
        var user = this.session.getLoggedInUser();
        return user && user.merchant;
    };
    BoostPublisherSettingsComponent = __decorate([
        core_1.Component({
            selector: 'm-boost-publisher--settings',
            templateUrl: 'settings.component.html'
        }),
        __metadata("design:paramtypes", [client_1.Client,
            session_1.Session])
    ], BoostPublisherSettingsComponent);
    return BoostPublisherSettingsComponent;
}());
exports.BoostPublisherSettingsComponent = BoostPublisherSettingsComponent;
//# sourceMappingURL=settings.component.js.map