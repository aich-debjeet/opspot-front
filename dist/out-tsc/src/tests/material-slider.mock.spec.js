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
var MaterialSliderMock = /** @class */ (function () {
    function MaterialSliderMock(_element) {
        this.value = '0';
        this.element = _element.nativeElement;
    }
    Object.defineProperty(MaterialSliderMock.prototype, "ngModel", {
        set: function (value) {
            if (value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY) {
                return;
            }
            this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    MaterialSliderMock = __decorate([
        core_1.Directive({
            selector: '[mdlSlider]',
            inputs: ['mdlSlider', 'ngModel', 'value']
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], MaterialSliderMock);
    return MaterialSliderMock;
}());
exports.MaterialSliderMock = MaterialSliderMock;
//# sourceMappingURL=material-slider.mock.spec.js.map