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
var service_1 = require("../../modals/signup/service");
var creator_component_1 = require("../creator/creator.component");
var session_1 = require("../../../services/session");
var WireButtonComponent = /** @class */ (function () {
    function WireButtonComponent(session, overlayModal, modal) {
        this.session = session;
        this.overlayModal = overlayModal;
        this.modal = modal;
        this.doneEmitter = new core_1.EventEmitter();
    }
    WireButtonComponent.prototype.wire = function () {
        var _this = this;
        if (!this.session.isLoggedIn()) {
            this.modal.open();
            return;
        }
        var creator = this.overlayModal.create(creator_component_1.WireCreatorComponent, this.object, {
            default: this.object && this.object.wire_threshold,
            onComplete: function (wire) {
                if (_this.object.wire_totals) {
                    _this.object.wire_totals[wire.currency] = wire.amount;
                }
                _this.doneEmitter.emit(wire);
            }
        });
        creator.present();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireButtonComponent.prototype, "object", void 0);
    __decorate([
        core_1.Output('done'),
        __metadata("design:type", core_1.EventEmitter)
    ], WireButtonComponent.prototype, "doneEmitter", void 0);
    WireButtonComponent = __decorate([
        core_1.Component({
            selector: 'm-wire-button',
            template: "\n    <button class=\"m-wire-button\" (click)=\"wire()\">\n      <i class=\"ion-icon ion-flash\"></i>\n    </button>\n  "
        }),
        __metadata("design:paramtypes", [session_1.Session, overlay_modal_1.OverlayModalService, service_1.SignupModalService])
    ], WireButtonComponent);
    return WireButtonComponent;
}());
exports.WireButtonComponent = WireButtonComponent;
//# sourceMappingURL=button.component.js.map