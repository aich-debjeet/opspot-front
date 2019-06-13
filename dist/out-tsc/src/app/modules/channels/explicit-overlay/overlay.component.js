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
var session_1 = require("../../../services/session");
var router_1 = require("@angular/router");
var storage_1 = require("../../../services/storage");
var ExplicitOverlayComponent = /** @class */ (function () {
    function ExplicitOverlayComponent(session, storage, router) {
        this.session = session;
        this.storage = storage;
        this.router = router;
    }
    Object.defineProperty(ExplicitOverlayComponent.prototype, "channel", {
        set: function (value) {
            this._channel = value;
            this.hidden = !this._channel || !this._channel.is_mature || this._channel.mature_visibility;
        },
        enumerable: true,
        configurable: true
    });
    ExplicitOverlayComponent.prototype.login = function () {
        this.storage.set('redirectTo', window.Opspot.site_url + this._channel.username);
        this.router.navigate(['/login']);
    };
    ExplicitOverlayComponent.prototype.disableFilter = function () {
        this._channel.mature_visibility = true;
        this.hidden = true;
    };
    __decorate([
        core_1.HostBinding('hidden'),
        __metadata("design:type", Boolean)
    ], ExplicitOverlayComponent.prototype, "hidden", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ExplicitOverlayComponent.prototype, "channel", null);
    ExplicitOverlayComponent = __decorate([
        core_1.Component({
            selector: 'm-channel--explicit-overlay',
            templateUrl: 'overlay.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            storage_1.Storage,
            router_1.Router])
    ], ExplicitOverlayComponent);
    return ExplicitOverlayComponent;
}());
exports.ExplicitOverlayComponent = ExplicitOverlayComponent;
//# sourceMappingURL=overlay.component.js.map