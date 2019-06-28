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
var Scheduler = /** @class */ (function () {
    function Scheduler() {
        this.days = 3;
        this.update = new core_1.EventEmitter(true);
        this.selectedDate = 0;
        this.selectedHour = 0;
        this.selectedMinutes = 0;
        this.dates = [];
        this.hours = [];
        this.minutes = [];
        this.setUp();
    }
    Scheduler.prototype.setUp = function () {
        //3 days
        for (var days = 0; days < this.days; days++) {
            var date = new Date();
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() + days);
            this.dates.push({
                date: date,
                ts: date.getTime(),
                formatted: date.getDate() + this.getSuffix(date.getDate()) + ' ' + date.toLocaleString('en-us', { month: 'long' })
            });
        }
        this.setUpHours();
        this.setUpMinutes();
        var now = new Date();
        this.selectedHour = now.getHours();
        this.selectedMinutes = Math.round(now.getMinutes() / 5);
    };
    Scheduler.prototype.onChange = function (e) {
        this.compileTs();
    };
    Scheduler.prototype.setUpHours = function () {
        for (var i = 0; i < 24; i++) {
            this.hours.push({ value: i, label: i });
        }
    };
    Scheduler.prototype.setUpMinutes = function () {
        for (var i = 0; i < 12; i++) {
            var minute = i * 5;
            this.minutes.push({ value: minute, label: minute });
        }
    };
    Scheduler.prototype.getSuffix = function (day) {
        if (day > 20 || day < 10) {
            switch (day % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
            }
        }
        return 'th';
    };
    Scheduler.prototype.compileTs = function () {
        var date = new Date();
        date.setDate(this.dates[this.selectedDate].date.getDate());
        date.setHours(this.selectedHour, this.selectedMinutes * 5, 0, 0);
        var ts = date.getTime();
        console.log('emitting change', ts, date, this.dates[this.selectedDate].date, this.selectedHour, this.selectedMinutes * 5);
        this.update.next(ts);
    };
    Scheduler = __decorate([
        core_1.Component({
            selector: 'm-scheduler',
            inputs: ['days',],
            outputs: ['update: ts'],
            template: "\n    <!-- Day -->\n    <select name=\"date\" [(ngModel)]=\"selectedDate\" (change)=\"onChange($event)\" class=\"mdl-color-text--blue-grey-800 m-form-select\">\n        <option *ngFor=\"let d of dates; let i = index\" [value]=\"i\">{{d.formatted}}</option>\n    </select>\n    <!-- Hour -->\n    <select name=\"hour\" [(ngModel)]=\"selectedHour\" (change)=\"onChange($event)\" class=\"mdl-color-text--blue-grey-800 m-form-select\">\n        <option *ngFor=\"let h of hours; let i = index\" [value]=\"i\">{{h.label}}</option>\n    </select>\n    <b>:</b>\n    <!-- Minutes -->\n    <select name=\"minutes\" [(ngModel)]=\"selectedMinutes\" (change)=\"onChange($event)\" class=\"mdl-color-text--blue-grey-800 m-form-select\">\n        <option *ngFor=\"let m of minutes; let i = index\" [value]=\"i\">{{m.label}}</option>\n    </select>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], Scheduler);
    return Scheduler;
}());
exports.Scheduler = Scheduler;
//# sourceMappingURL=scheduler.js.map