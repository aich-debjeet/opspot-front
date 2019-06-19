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
var MaterialUpload = /** @class */ (function () {
    function MaterialUpload(_element) {
        this.element = _element.nativeElement;
    }
    MaterialUpload.prototype.ngAfterViewInit = function () {
        ui_1.Material.updateElement(this.element);
    };
    Object.defineProperty(MaterialUpload.prototype, "progress", {
        set: function (value) {
            var _this = this;
            if (this.element && this.element.MaterialProgress)
                this.element.MaterialProgress.setProgress(value);
            else
                setTimeout(function () {
                    _this.element.MaterialProgress.setProgress(value);
                });
        },
        enumerable: true,
        configurable: true
    });
    MaterialUpload = __decorate([
        core_1.Directive({
            selector: '[mdlUpload]',
            inputs: ['mdlUpload', 'progress']
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], MaterialUpload);
    return MaterialUpload;
}());
exports.MaterialUpload = MaterialUpload;
//# sourceMappingURL=upload.js.map