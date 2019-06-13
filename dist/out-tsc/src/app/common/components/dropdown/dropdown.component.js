"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DropdownComponent = /** @class */ (function () {
    function DropdownComponent() {
        this.toggled = false;
    }
    DropdownComponent.prototype.toggle = function () {
        this.toggled = !this.toggled;
    };
    DropdownComponent = __decorate([
        core_1.Component({
            selector: 'm-dropdown',
            template: "\n    <div class=\"m-dropdown\">\n      <div class=\"m-dropdown--label-container\" [class.m-dropdown--label-active]=\"toggled\" (click)=\"toggle()\">\n        <ng-content select=\"label\"></ng-content>\n      </div>\n      <div class=\"m-dropdown--list-container\" [hidden]=\"!toggled\">\n        <ng-content select=\".m-dropdown--list\" ></ng-content>\n      </div>\n    </div>\n\n    <div class=\"opspot-bg-overlay\" *ngIf=\"toggled\" (click)=\"toggle()\"></div>\n  ",
        })
    ], DropdownComponent);
    return DropdownComponent;
}());
exports.DropdownComponent = DropdownComponent;
//# sourceMappingURL=dropdown.component.js.map