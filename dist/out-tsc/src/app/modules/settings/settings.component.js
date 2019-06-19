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
var api_1 = require("../../services/api");
var title_1 = require("../../services/ux/title");
var session_1 = require("../../services/session");
var hashtags_selector_component_1 = require("../../modules/hashtags/hashtag-selector-modal/hashtags-selector.component");
var overlay_modal_1 = require("../../services/ux/overlay-modal");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(session, client, router, route, title, overlayModal) {
        this.session = session;
        this.client = client;
        this.router = router;
        this.route = route;
        this.title = title;
        this.overlayModal = overlayModal;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.session.isLoggedIn()) {
            return this.router.navigate(['/login']);
        }
        this.opspot = window.Opspot;
        this.title.setTitle('Settings');
        this.filter = 'general';
        this.account_time_created = window.Opspot.user.time_created;
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['filter']) {
                _this.filter = params['filter'];
            }
            else {
                _this.filter = 'general';
            }
            if (params['card']) {
                _this.card = params['card'];
            }
        });
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
        if (this.paramsSubscription)
            this.paramsSubscription.unsubscribe();
    };
    SettingsComponent.prototype.openHashtagsSelector = function () {
        this.overlayModal.create(hashtags_selector_component_1.HashtagsSelectorModalComponent, {}, {
            class: 'm-overlay-modal--hashtag-selector m-overlay-modal--medium-large'
        }).present();
    };
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'm-settings',
            templateUrl: 'settings.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            router_1.Router,
            router_1.ActivatedRoute,
            title_1.OpspotTitle,
            overlay_modal_1.OverlayModalService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map