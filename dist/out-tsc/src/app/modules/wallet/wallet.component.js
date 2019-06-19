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
var storage_1 = require("../../services/storage");
var title_1 = require("../../services/ux/title");
var session_1 = require("../../services/session");
var WalletComponent = /** @class */ (function () {
    function WalletComponent(session, storage, router, title) {
        this.session = session;
        this.storage = storage;
        this.router = router;
        this.title = title;
        this.disablePointsAnimation = false;
        this.disablePointsAnimation = !!this.storage.get('disablePointsAnimation');
    }
    WalletComponent.prototype.ngOnInit = function () {
        if (!this.session.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        }
        this.title.setTitle('Wallet');
    };
    // Animations
    WalletComponent.prototype.setDisablePointsAnimation = function (value) {
        this.disablePointsAnimation = !!value;
        this.storage.set('disablePointsAnimation', !!value ? '1' : '');
    };
    WalletComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-wallet',
            templateUrl: 'wallet.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            storage_1.Storage,
            router_1.Router,
            title_1.OpspotTitle])
    ], WalletComponent);
    return WalletComponent;
}());
exports.WalletComponent = WalletComponent;
//# sourceMappingURL=wallet.component.js.map