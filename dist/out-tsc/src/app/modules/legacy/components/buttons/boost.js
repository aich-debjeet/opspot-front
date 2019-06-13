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
var session_1 = require("../../../../services/session");
var overlay_modal_1 = require("../../../../services/ux/overlay-modal");
var creator_component_1 = require("../../../boost/creator/creator.component");
var BoostButton = /** @class */ (function () {
    function BoostButton(session, overlayModal) {
        this.session = session;
        this.overlayModal = overlayModal;
        this.object = {
            'guid': null
        };
        this.showModal = false;
    }
    BoostButton.prototype.boost = function () {
        var creator = this.overlayModal.create(creator_component_1.BoostCreatorComponent, this.object);
        creator.present();
    };
    BoostButton = __decorate([
        core_1.Component({
            selector: 'opspot-button-boost',
            inputs: ['object'],
            template: "\n    <button class=\"m-btn m-btn--action m-btn--slim\"\n      (click)=\"boost()\">\n    <ng-container i18n=\"verb|@@M__ACTION__BOOST\">Boost</ng-container>\n    </button>\n  "
        }),
        __metadata("design:paramtypes", [session_1.Session, overlay_modal_1.OverlayModalService])
    ], BoostButton);
    return BoostButton;
}());
exports.BoostButton = BoostButton;
//# sourceMappingURL=boost.js.map