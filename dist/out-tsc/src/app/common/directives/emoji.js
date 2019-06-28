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
var anchor_position_1 = require("../../services/ux/anchor-position");
var Emoji = /** @class */ (function () {
    function Emoji(element) {
        this.emoji = new core_1.EventEmitter();
        this.shown = false;
        this.style = {};
        this._element = element.nativeElement;
    }
    Emoji.prototype.toggle = function () {
        if (this.shown) {
            this.close();
        }
        else {
            this.open();
        }
    };
    Emoji.prototype.open = function () {
        var position = anchor_position_1.AnchorPosition.getFixed(this._element, ['right', 'top']);
        if (!position) {
            return;
        }
        this.shown = true;
        this.style = {
            top: position.top,
            right: position.right,
            bottom: position.bottom,
            left: position.left
        };
    };
    Emoji.prototype.close = function () {
        this.shown = false;
    };
    Emoji.prototype.ngOnDestroy = function () {
        this.close();
    };
    Emoji = __decorate([
        core_1.Directive({
            selector: '[emoji]',
            outputs: ['emoji'],
            exportAs: 'emoji',
            host: {
                '(click)': 'toggle()'
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], Emoji);
    return Emoji;
}());
exports.Emoji = Emoji;
//# sourceMappingURL=emoji.js.map