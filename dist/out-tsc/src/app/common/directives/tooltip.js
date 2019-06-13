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
var Tooltip = /** @class */ (function () {
    function Tooltip(element) {
        this.shown = false;
        this.style = {};
        this._element = element.nativeElement;
    }
    Tooltip.prototype.show = function () {
        var _this = this;
        this.timeout = setTimeout(function () {
            _this.timeout = null;
            var position = anchor_position_1.AnchorPosition.getFixed(_this._element, ['left', 'bottom']);
            if (!position) {
                return;
            }
            _this.shown = true;
            _this.style = {
                top: position.top,
                right: position.right,
                bottom: position.bottom,
                left: position.left
            };
        }, 1000);
    };
    Tooltip.prototype.hide = function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.shown = false;
    };
    Tooltip = __decorate([
        core_1.Directive({
            selector: '[tooltip]',
            exportAs: 'tooltip',
            host: {
                '(mouseenter)': 'show()',
                '(mouseleave)': 'hide()'
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], Tooltip);
    return Tooltip;
}());
exports.Tooltip = Tooltip;
//# sourceMappingURL=tooltip.js.map