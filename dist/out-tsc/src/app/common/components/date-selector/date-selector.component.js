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
var common_1 = require("@angular/common");
var DateSelectorComponent = /** @class */ (function () {
    function DateSelectorComponent() {
        this.dateChange = new core_1.EventEmitter();
        this.dateFormat = 'short';
    }
    DateSelectorComponent.prototype.onDateChange = function (newDate) {
        this.dateChange.emit(newDate);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DateSelectorComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DateSelectorComponent.prototype, "date", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DateSelectorComponent.prototype, "dateChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DateSelectorComponent.prototype, "dateFormat", void 0);
    DateSelectorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-date-selector',
            template: "\n    <label class=\"m-date-selector--label\" *ngIf=\"label\">{{label}}</label>\n    <div class=\"m-date-selector--input\" mdl-datetime-picker [date]=\"date\" (dateChange)=\"onDateChange($event)\">\n      <input type=\"text\" placeholder=\"Select a date\" i18n-placeholder=\"@@COMMON__DATE_SELECTOR__PLACEHOLDER\" [ngModel]=\"date | date:dateFormat\"\n        (ngModelChange)=\"onDateChange($event)\">\n      <i class=\"material-icons\">keyboard_arrow_down</i>\n    </div>\n  ",
            providers: [common_1.DatePipe]
        })
    ], DateSelectorComponent);
    return DateSelectorComponent;
}());
exports.DateSelectorComponent = DateSelectorComponent;
//# sourceMappingURL=date-selector.component.js.map