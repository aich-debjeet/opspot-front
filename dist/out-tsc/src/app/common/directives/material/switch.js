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
var MaterialSwitch = /** @class */ (function () {
    function MaterialSwitch(_element) {
        this._toggled = false;
        this.element = _element.nativeElement;
    }
    MaterialSwitch.prototype.ngAfterViewInit = function () {
        //MaterialService.updateElement(this.element);
        //let switch = new (<any>window).MaterialSwitch(this.element);
        //switch.checkToggleState();
        //if(this._toggled)
        //this.element.classList.add('is-checked');
    };
    Object.defineProperty(MaterialSwitch.prototype, "toggled", {
        set: function (value) {
            ui_1.Material.updateElement(this.element);
            if (value)
                this.element.classList.add('is-checked');
        },
        enumerable: true,
        configurable: true
    });
    MaterialSwitch = __decorate([
        core_1.Directive({
            selector: '[mdlSwitch]',
            inputs: ['mdlSwitch', 'toggled']
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], MaterialSwitch);
    return MaterialSwitch;
}());
exports.MaterialSwitch = MaterialSwitch;
//# sourceMappingURL=switch.js.map