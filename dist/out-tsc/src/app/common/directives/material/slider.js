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
var ui_1 = require("../../../services/ui");
var MaterialSlider = /** @class */ (function () {
    function MaterialSlider(viewContainer) {
        this.value = '0';
        this.element = viewContainer.element.nativeElement;
        ui_1.Material.updateElement(this.element);
    }
    MaterialSlider.prototype.ngAfterViewInit = function () {
        this.element.MaterialSlider.change(this.value);
    };
    Object.defineProperty(MaterialSlider.prototype, "ngModel", {
        set: function (value) {
            if (value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY) {
                return;
            }
            this.element.MaterialSlider.change(value);
            this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    MaterialSlider = __decorate([
        core_1.Directive({
            selector: '[mdlSlider]',
            inputs: ['mdlSlider', 'ngModel', 'value']
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef])
    ], MaterialSlider);
    return MaterialSlider;
}());
exports.MaterialSlider = MaterialSlider;
//# sourceMappingURL=slider.js.map