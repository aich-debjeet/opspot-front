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
var rejection_reasons_1 = require("../rejection-reasons");
var RejectionReasonModalComponent = /** @class */ (function () {
    function RejectionReasonModalComponent() {
        this.yesButton = 'Yes';
        this.noButton = 'No';
        this.closeAfterAction = false;
        this.closed = new core_1.EventEmitter();
        this.actioned = new core_1.EventEmitter();
        this.errorlevel = null;
        this.dismissButton = 'Dismiss';
        this.reasons = rejection_reasons_1.rejectionReasons;
        this.open = true;
    }
    RejectionReasonModalComponent.prototype.close = function () {
        this.open = false;
        this.closed.emit();
    };
    RejectionReasonModalComponent.prototype.action = function () {
        this.actioned.emit(this.boost);
    };
    RejectionReasonModalComponent.prototype.selectReason = function (reason) {
        this.boost.rejection_reason = reason.code;
    };
    RejectionReasonModalComponent.prototype.onKeyPress = function (e) {
        e.stopPropagation();
        if (e.ctrlKey || e.altKey || e.shiftKey) {
            return;
        }
        if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105) { // numbers
            var index = Number.parseInt(e.key) - 1;
            if (index >= 0 && index <= this.reasons.length - 1) {
                return this.selectReason(rejection_reasons_1.rejectionReasons[index]);
            }
        }
        if (e.keyCode === 13) { // enter
            if (this.boost.rejection_reason !== -1) {
                return this.action();
            }
        }
        if (e.keyCode === 27) { // escape
            return this.close();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], RejectionReasonModalComponent.prototype, "boost", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RejectionReasonModalComponent.prototype, "yesButton", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RejectionReasonModalComponent.prototype, "noButton", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], RejectionReasonModalComponent.prototype, "closeAfterAction", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], RejectionReasonModalComponent.prototype, "closed", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], RejectionReasonModalComponent.prototype, "actioned", void 0);
    __decorate([
        core_1.HostListener('document:keypress', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], RejectionReasonModalComponent.prototype, "onKeyPress", null);
    RejectionReasonModalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm--rejection-reason-modal',
            outputs: ['actioned', 'closed'],
            templateUrl: 'rejection-reason-modal.component.html'
        })
    ], RejectionReasonModalComponent);
    return RejectionReasonModalComponent;
}());
exports.RejectionReasonModalComponent = RejectionReasonModalComponent;
//# sourceMappingURL=rejection-reason-modal.component.js.map