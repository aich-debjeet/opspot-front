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
var InlineAutoGrow = /** @class */ (function () {
    function InlineAutoGrow(element) {
        var _this = this;
        this.boxSizing = 'content-box';
        this._element = element.nativeElement;
        setTimeout(function () {
            _this.grow();
        });
    }
    InlineAutoGrow.prototype.onKeyDown = function () {
        this.grow();
    };
    InlineAutoGrow.prototype.onPaste = function () {
        this.grow();
    };
    InlineAutoGrow.prototype.onChange = function () {
        this.grow();
    };
    InlineAutoGrow.prototype.onNgModelChange = function () {
        this.grow();
    };
    Object.defineProperty(InlineAutoGrow.prototype, "_model", {
        set: function (value) {
            this.grow();
        },
        enumerable: true,
        configurable: true
    });
    InlineAutoGrow.prototype.grow = function () {
        var _this = this;
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = void 0;
        }
        this.timeout = setTimeout(function () {
            _this._element.style.width = '0';
            _this._element.style.width = _this._element.scrollWidth + 'px';
        });
    };
    __decorate([
        core_1.HostBinding('style.boxSizing'),
        __metadata("design:type", String)
    ], InlineAutoGrow.prototype, "boxSizing", void 0);
    __decorate([
        core_1.HostListener('keydown'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], InlineAutoGrow.prototype, "onKeyDown", null);
    __decorate([
        core_1.HostListener('paste'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], InlineAutoGrow.prototype, "onPaste", null);
    __decorate([
        core_1.HostListener('change'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], InlineAutoGrow.prototype, "onChange", null);
    __decorate([
        core_1.HostListener('ngModelChange'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], InlineAutoGrow.prototype, "onNgModelChange", null);
    __decorate([
        core_1.Input('ngModel'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], InlineAutoGrow.prototype, "_model", null);
    InlineAutoGrow = __decorate([
        core_1.Directive({
            selector: '[inlineAutoGrow]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], InlineAutoGrow);
    return InlineAutoGrow;
}());
exports.InlineAutoGrow = InlineAutoGrow;
//# sourceMappingURL=inline-autogrow.js.map