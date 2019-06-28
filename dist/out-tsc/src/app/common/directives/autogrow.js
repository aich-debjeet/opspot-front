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
var AutoGrow = /** @class */ (function () {
    function AutoGrow(element) {
        var _this = this;
        this._element = element.nativeElement;
        setTimeout(function () {
            _this.grow();
        });
    }
    Object.defineProperty(AutoGrow.prototype, "_model", {
        set: function (value) {
            this.grow();
        },
        enumerable: true,
        configurable: true
    });
    AutoGrow.prototype.grow = function () {
        var _this = this;
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.timeout = setTimeout(function () {
            _this._element.style.overflow = 'hidden';
            _this._element.style.maxHeight = 'none';
            _this._element.style.height = 'auto';
            _this._element.style.height = _this._element.scrollHeight + 'px';
            _this._element.style.overflow = '';
            _this._element.style.maxHeight = '';
        });
    };
    AutoGrow = __decorate([
        core_1.Directive({
            selector: '[autoGrow]',
            inputs: ['autoGrow', '_model: ngModel'],
            host: {
                '(keydown)': 'grow()',
                '(paste)': 'grow()',
                '(change)': 'grow()',
                '(ngModelChange)': 'grow()'
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], AutoGrow);
    return AutoGrow;
}());
exports.AutoGrow = AutoGrow;
//# sourceMappingURL=autogrow.js.map