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
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var ModalPosterComponent = /** @class */ (function () {
    function ModalPosterComponent(overlayModal) {
        this.overlayModal = overlayModal;
    }
    ModalPosterComponent.prototype.onLoad = function (e) {
        var _this = this;
        setTimeout(function () {
            _this.overlayModal.dismiss();
        }, 500);
    };
    ModalPosterComponent = __decorate([
        core_1.Component({
            selector: 'm-newsfeed-poster--modal',
            template: "\n    <opspot-newsfeed-poster (load)=\"onLoad($event)\"></opspot-newsfeed-poster>\n  "
        }),
        __metadata("design:paramtypes", [overlay_modal_1.OverlayModalService])
    ], ModalPosterComponent);
    return ModalPosterComponent;
}());
exports.ModalPosterComponent = ModalPosterComponent;
//# sourceMappingURL=poster-modal.component.js.map