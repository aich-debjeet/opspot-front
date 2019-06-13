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
var material_datetime_picker_1 = require("material-datetime-picker");
var MaterialDateTimePickerDirective = /** @class */ (function () {
    function MaterialDateTimePickerDirective(datePipe) {
        this.datePipe = datePipe;
        this.dateChange = new core_1.EventEmitter();
        this.open = false;
    }
    MaterialDateTimePickerDirective.prototype.onHostClick = function () {
        if (!this.open) {
            this.picker = new material_datetime_picker_1.default()
                .on('submit', this.submitCallback.bind(this))
                .on('close', this.close.bind(this));
            this.open = true;
            this.picker.open();
        }
    };
    MaterialDateTimePickerDirective.prototype.submitCallback = function (value) {
        this.dateChange.emit(this.datePipe.transform(value.format(), 'short'));
        this.close();
    };
    MaterialDateTimePickerDirective.prototype.close = function () {
        this.picker.off('submit', this.submitCallback);
        this.picker.off('close', this.close);
        this.open = false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MaterialDateTimePickerDirective.prototype, "date", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MaterialDateTimePickerDirective.prototype, "dateChange", void 0);
    __decorate([
        core_1.HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MaterialDateTimePickerDirective.prototype, "onHostClick", null);
    MaterialDateTimePickerDirective = __decorate([
        core_1.Directive({
            selector: '[mdl-datetime-picker]',
            providers: [common_1.DatePipe]
        }),
        __metadata("design:paramtypes", [common_1.DatePipe])
    ], MaterialDateTimePickerDirective);
    return MaterialDateTimePickerDirective;
}());
exports.MaterialDateTimePickerDirective = MaterialDateTimePickerDirective;
//# sourceMappingURL=datetimepicker.directive.js.map