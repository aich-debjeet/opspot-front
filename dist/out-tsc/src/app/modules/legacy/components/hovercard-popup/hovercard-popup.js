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
var hovercard_1 = require("../../../../services/hovercard");
var HovercardPopup = /** @class */ (function () {
    function HovercardPopup(hovercardService) {
        this.hovercardService = hovercardService;
    }
    HovercardPopup.prototype.hide = function (guid) {
        var _this = this;
        this.hovercardService.unstick();
        setTimeout(function () {
            _this.hovercardService.hide(guid);
        }, 250);
    };
    HovercardPopup = __decorate([
        core_1.Component({
            selector: 'm-hovercard-popup',
            template: "\n    <div class=\"opspot-avatar-hovercard mdl-shadow--8dp\"\n    *ngIf=\"hovercardService.shown && hovercardService.data\"\n    [style.top]=\"hovercardService.anchor.top\"\n    [style.right]=\"hovercardService.anchor.right\"\n    [style.bottom]=\"hovercardService.anchor.bottom\"\n    [style.left]=\"hovercardService.anchor.left\"\n    (mouseenter)=\"hovercardService.stick(hovercardService.data.guid)\"\n    (mouseleave)=\"hide(hovercardService.data.guid)\"\n    >\n      <opspot-card-user [object]=\"hovercardService.data\"></opspot-card-user>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [hovercard_1.HovercardService])
    ], HovercardPopup);
    return HovercardPopup;
}());
exports.HovercardPopup = HovercardPopup;
//# sourceMappingURL=hovercard-popup.js.map