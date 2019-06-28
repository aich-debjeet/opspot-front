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
var api_1 = require("../../../services/api");
var AdminInteractions = /** @class */ (function () {
    function AdminInteractions(client) {
        this.client = client;
        this.metrics = [
            {
                title: 'Votes Up',
                metric: 'vote:up'
            },
            {
                title: 'Votes Down',
                metric: 'vote:down'
            },
            {
                title: 'Comments',
                metric: 'comment'
            },
            {
                title: 'Subscribers',
                metric: 'subscribe'
            },
            {
                title: 'Reminds',
                metric: 'remind'
            },
            {
                title: 'Referrals',
                metric: 'referral'
            },
        ];
        this.type = 'actors';
        var d = new Date();
        d.setHours(23, 59, 59);
        this.endDate = d.toISOString();
        d.setDate(d.getDate() - 1);
        d.setHours(0, 0, 0);
        this.startDate = d.toISOString();
    }
    AdminInteractions.prototype.onStartDateChange = function (newDate) {
        this.startDate = newDate;
    };
    AdminInteractions.prototype.onEndDateChange = function (newDate) {
        this.endDate = newDate;
    };
    AdminInteractions.prototype.show = function (data) {
        this.type = data;
    };
    AdminInteractions = __decorate([
        core_1.Component({
            selector: 'm-admin--interactions',
            templateUrl: 'interactions.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client])
    ], AdminInteractions);
    return AdminInteractions;
}());
exports.AdminInteractions = AdminInteractions;
//# sourceMappingURL=interactions.component.js.map