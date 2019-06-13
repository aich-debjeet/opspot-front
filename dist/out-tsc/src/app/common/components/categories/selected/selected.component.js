"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
exports.SELECTED_CATEGORIES_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CategoriesSelectedComponent; }),
    multi: true
};
var CategoriesSelectedComponent = /** @class */ (function () {
    function CategoriesSelectedComponent() {
        this.propagateChange = function (_) {
        };
    }
    CategoriesSelectedComponent.prototype.deselect = function (category) {
        var index = this.categories.findIndex(function (value) {
            return value.id === category.id;
        });
        this.categories.splice(index, 1);
        this.categories = this.categories.slice();
    };
    CategoriesSelectedComponent.prototype.ngOnChanges = function (changes) {
        this.propagateChange(changes);
    };
    CategoriesSelectedComponent.prototype.writeValue = function (value) {
        this.categories = value;
    };
    CategoriesSelectedComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    CategoriesSelectedComponent.prototype.registerOnTouched = function (fn) {
    };
    CategoriesSelectedComponent = __decorate([
        core_1.Component({
            selector: 'm-categories--selected',
            template: "\n    <div class=\"m-categories-selected--categories\">\n      <div class=\"m-categories--selected--category\" *ngFor=\"let category of categories\">\n        {{category.label}}\n        <i class=\"material-icons\" (click)=\"deselect(category)\">close</i>\n      </div>\n\n    </div>\n  ",
            providers: [exports.SELECTED_CATEGORIES_VALUE_ACCESSOR]
        })
    ], CategoriesSelectedComponent);
    return CategoriesSelectedComponent;
}());
exports.CategoriesSelectedComponent = CategoriesSelectedComponent;
//# sourceMappingURL=selected.component.js.map