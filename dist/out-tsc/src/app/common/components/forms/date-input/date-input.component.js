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
var DateInputComponent = /** @class */ (function () {
    function DateInputComponent() {
        this.selectedMonth = '';
        this.selectedDay = '';
        this.selectedYear = '';
        this.showClearButton = true;
        this.disabled = false;
        this.dateChange = new core_1.EventEmitter();
    }
    Object.defineProperty(DateInputComponent.prototype, "date", {
        set: function (value) {
            if (!value)
                return;
            if (value === this._date) {
                return;
            }
            var values = value.split('-');
            if (values.length < 1 || values.length > 3) {
                return;
            }
            if (values.length === 3) {
                this.selectedYear = values.shift();
            }
            if (values[0].length === 4) {
                // Old style YYYY-MM (no day)
                this.selectedYear = values[0];
                this.selectedMonth = "" + parseInt(values[1], 10);
            }
            else {
                this.selectedMonth = "" + parseInt(values[0], 10);
                if (values.length === 2) {
                    this.selectedDay = this.pad(values[1], 2);
                }
            }
            this._date = value;
        },
        enumerable: true,
        configurable: true
    });
    DateInputComponent.prototype.ngOnInit = function () {
        this.months = [
            'January', 'February', 'March',
            'April', 'May', 'June',
            'July', 'August', 'September',
            'October', 'November', 'December'
        ];
        this.days = [];
        for (var day = 1; day <= 31; day++) {
            this.days.push(this.pad(day, 2));
        }
        this.years = [];
        var initialYear = (new Date()).getFullYear() - 13;
        for (var year = initialYear; year >= initialYear - 100; year--) {
            this.years.push(this.pad(year, 4));
        }
    };
    DateInputComponent.prototype.build = function () {
        var date = '';
        if (this.selectedMonth !== '') {
            if (this.selectedYear) {
                date = this.pad(this.selectedYear, 4) + "-";
            }
            date += "" + this.pad(this.selectedMonth, 2);
            if (this.selectedDay) {
                date += "-" + this.pad(this.selectedDay, 2);
            }
        }
        this._date = date;
        this.dateChange.emit(date);
    };
    DateInputComponent.prototype.clear = function () {
        this.selectedMonth = '';
        this.selectedDay = '';
        this.selectedYear = '';
        this.build();
    };
    DateInputComponent.prototype.isDayAvailable = function (day, month) {
        if (!month) {
            return true;
        }
        if (typeof day !== 'number') {
            day = parseInt(day, 10);
        }
        if (typeof month !== 'number') {
            month = parseInt(month, 10);
        }
        switch (month) {
            case 2:
                if (day > 29) {
                    return false;
                }
            case 4:
            case 6:
            case 9:
            case 11:
                if (day > 30) {
                    return false;
                }
        }
        return true;
    };
    DateInputComponent.prototype.pad = function (val, pad) {
        if (pad === void 0) { pad = 0; }
        if (!pad) {
            return val;
        }
        return (Array(pad + 1).join('0') + val).slice(-pad);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DateInputComponent.prototype, "showClearButton", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DateInputComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DateInputComponent.prototype, "dateChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], DateInputComponent.prototype, "date", null);
    DateInputComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-date-input',
            template: "\n    <div class=\"m-date-input--field\">\n      <select [ngModel]=\"selectedMonth\" (ngModelChange)=\"selectedMonth = $event; build()\" [disabled]=\"disabled\">\n        <option value=\"\"><i i18n=\"@@COMMON__DATE_INPUT__MONTH_LABEL\">Month</i></option>\n        <option *ngFor=\"let month of months; let i = index\"\n          [value]=\"i + 1\"\n        >{{ month }}</option>\n      </select>\n    </div>\n    <div class=\"m-date-input--field\">\n      <select [ngModel]=\"selectedDay\" (ngModelChange)=\"selectedDay = $event; build()\" [disabled]=\"disabled\">\n        <option value=\"\"><i i18n=\"@@COMMON__DATE_INPUT__DAY_LABEL\">Day</i></option>\n        <option *ngFor=\"let day of days\"\n          [value]=\"day\"\n          [disabled]=\"!isDayAvailable(day, selectedMonth)\"\n        >{{ day }}</option>\n      </select>\n    </div>\n    <div class=\"m-date-input--field\">\n      <select [ngModel]=\"selectedYear\" (ngModelChange)=\"selectedYear = $event; build()\" [disabled]=\"disabled\">\n        <option value=\"\"><i i18n=\"@@COMMON__DATE_INPUT__YEAR_LABEL\">Year</i></option>\n        <option *ngFor=\"let year of years\"\n          [value]=\"year\"\n        >{{ year }}</option>\n      </select>\n    </div>\n  "
        })
    ], DateInputComponent);
    return DateInputComponent;
}());
exports.DateInputComponent = DateInputComponent;
//# sourceMappingURL=date-input.component.js.map