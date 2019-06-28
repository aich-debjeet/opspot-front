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
var ConfirmModal = /** @class */ (function () {
    function ConfirmModal() {
        var _this = this;
        this.open = false;
        this.closed = new core_1.EventEmitter();
        this.actioned = new core_1.EventEmitter();
        this.inProgressEmitter = new core_1.EventEmitter();
        this.completedEmitter = new core_1.EventEmitter();
        this.inProgress = false;
        this.errorlevel = null;
        this.yesButton = 'Yes';
        this.noButton = 'No';
        this.dismissButton = 'Dismiss';
        this.closeAfterAction = false;
        this.inProgressEmitter.subscribe(function (value) {
            _this.inProgress = value;
        });
        this.completedEmitter.subscribe(function (value) {
            if (_this.closeAfterAction) {
                _this.close(null);
                return;
            }
            _this.errorlevel = value;
        });
    }
    ConfirmModal.prototype.close = function ($event) {
        this.open = false;
        this.closed.emit({
            $event: $event
        });
    };
    ConfirmModal.prototype.action = function ($event) {
        this.actioned.emit({
            $event: $event,
            inProgress: this.inProgressEmitter,
            completed: this.completedEmitter
        });
    };
    ConfirmModal = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-modal-confirm',
            inputs: ['open', 'yesButton', 'noButton', 'closeAfterAction'],
            outputs: ['actioned', 'closed'],
            templateUrl: 'confirm.html'
        }),
        __metadata("design:paramtypes", [])
    ], ConfirmModal);
    return ConfirmModal;
}());
exports.ConfirmModal = ConfirmModal;
//# sourceMappingURL=confirm.js.map