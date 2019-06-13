"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Modal = /** @class */ (function () {
    function Modal() {
        this.allowClose = true;
        this.hidden = true;
        this.closed = new core_1.EventEmitter();
    }
    Object.defineProperty(Modal.prototype, "_hidden", {
        set: function (value) {
            this.hidden = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Modal.prototype, "open", {
        set: function (value) {
            this.hidden = !value;
        },
        enumerable: true,
        configurable: true
    });
    Modal.prototype.close = function (event) {
        if (!this.allowClose)
            return;
        this.hidden = !this.hidden;
        this.closed.next(true);
        event.stopPropagation();
    };
    Modal = __decorate([
        core_1.Component({
            selector: 'm-modal',
            host: {
                '[hidden]': 'hidden'
            },
            inputs: ['open', 'allowClose'],
            outputs: ['closed'],
            template: "\n    <div class=\"m-modal-bg\" (click)=\"close($event)\"></div>\n    <div class=\"m-modal-container\">\n      <div class=\"mdl-card mdl-shadow--2dp\">\n        <ng-content></ng-content>\n        <div class=\"mdl-card__menu\" (click)=\"close($event)\" *ngIf=\"allowClose\"><i class=\"material-icons mdl-color-text--blue-grey-300\">close</i>\n        </div>\n      </div>\n    </div>\n  "
        })
    ], Modal);
    return Modal;
}());
exports.Modal = Modal;
//# sourceMappingURL=modal.component.js.map