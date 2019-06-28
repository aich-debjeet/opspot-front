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
var SignupOnActionModal = /** @class */ (function () {
    function SignupOnActionModal(session) {
        this.session = session;
        this.open = false;
        this.action = '';
        this.closed = new core_1.EventEmitter();
        this.opspot = window.Opspot;
        this.display = 'register';
        this.overrideOnboarding = false;
    }
    SignupOnActionModal.prototype.close = function () {
        this.open = false;
        this.closed.next(true);
    };
    SignupOnActionModal = __decorate([
        core_1.Component({
            selector: 'm-modal-signup-on-action',
            inputs: ['open', 'action', 'display', 'overrideOnboarding'],
            outputs: ['closed'],
            template: "\n    <m-modal-signup open=\"true\" [display]=\"display\" [overrideOnboarding]=\"overrideOnboarding\" subtitle=\"You need to have a channel in order to {{action}}\" i18n-subtitle=\"@@MODALS__SIGNUP__ON_ACTION_SUBTITLE\" *ngIf=\"open\"></m-modal-signup>\n  "
        }),
        __metadata("design:paramtypes", [session_1.Session])
    ], SignupOnActionModal);
    return SignupOnActionModal;
}());
exports.SignupOnActionModal = SignupOnActionModal;
//# sourceMappingURL=signup-on-action.js.map