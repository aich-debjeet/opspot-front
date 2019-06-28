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
var hovercard_1 = require("../../services/hovercard");
var Hovercard = /** @class */ (function () {
    function Hovercard(hovercardService, element) {
        this.hovercardService = hovercardService;
        this.guid = '';
        this.anchor = ['right', 'top'];
        this._element = element.nativeElement;
    }
    Object.defineProperty(Hovercard.prototype, "_hovercard", {
        set: function (value) {
            if (!value) {
                return;
            }
            if (typeof value.guid !== 'undefined') {
                this.guid = value.guid;
                return;
            }
            this.guid = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hovercard.prototype, "_hovercardAnchor", {
        set: function (value) {
            if (!value) {
                return;
            }
            if (typeof value === 'string' || value.length !== 2) {
                return;
            }
            this.anchor = value;
        },
        enumerable: true,
        configurable: true
    });
    Hovercard.prototype.show = function () {
        var _this = this;
        if (!this.guid) {
            return;
        }
        this.showTimer = setTimeout(function () {
            _this.hovercardService.show(_this.guid, _this._element, _this.anchor);
            _this.showTimer = null;
        }, 250);
    };
    Hovercard.prototype.hide = function () {
        var _this = this;
        if (!this.guid) {
            return;
        }
        if (this.showTimer) {
            clearTimeout(this.showTimer);
            this.showTimer = null;
        }
        setTimeout(function () {
            _this.hovercardService.hide(_this.guid);
        }, 250);
    };
    Hovercard.prototype.hideForcefully = function () {
        if (!this.guid) {
            return;
        }
        if (this.showTimer) {
            clearTimeout(this.showTimer);
            this.showTimer = null;
        }
        this.hovercardService.unstick();
        this.hovercardService.hide(this.guid);
    };
    Hovercard.prototype.ngOnDestroy = function () {
        this.hideForcefully();
    };
    Hovercard = __decorate([
        core_1.Directive({
            selector: '[hovercard]',
            inputs: ['_hovercard: hovercard', '_hovercardAnchor: hovercardAnchor'],
            host: {
                '(mouseenter)': 'show()',
                '(mouseleave)': 'hide()',
                '(click)': 'hideForcefully()'
            }
        }),
        __metadata("design:paramtypes", [hovercard_1.HovercardService, core_1.ElementRef])
    ], Hovercard);
    return Hovercard;
}());
exports.Hovercard = Hovercard;
//# sourceMappingURL=hovercard.js.map