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
var AnalyticsImpressions = /** @class */ (function () {
    function AnalyticsImpressions(client) {
        this.client = client;
        this.span = 5;
        this.unit = 'day';
        this.data = [];
    }
    Object.defineProperty(AnalyticsImpressions.prototype, "_key", {
        set: function (value) {
            this.key = value;
            this.get();
        },
        enumerable: true,
        configurable: true
    });
    AnalyticsImpressions.prototype.get = function () {
        var self = this;
        this.client.get('api/v1/analytics/' + this.key, {
            span: this.span,
            unit: this.unit
        })
            .then(function (response) {
            self.data = response.data;
        });
    };
    AnalyticsImpressions = __decorate([
        core_1.Component({
            selector: 'opspot-analytics-impressions',
            inputs: ['_key: key', 'span', 'unit'],
            template: "\n    <opspot-graph-line [data]=\"data\"></opspot-graph-line>\n\n    <div class=\"graph-labels\">\n      <div class=\"graph-label mdl-color-text--blue-grey-300\" *ngFor=\"let point of data\">\n        {{point.total}}\n        <b>{{point.timestamp  * 1000 | date: 'MMMd'}}</b>\n      </div>\n    </div>\n  ",
        }),
        __metadata("design:paramtypes", [api_1.Client])
    ], AnalyticsImpressions);
    return AnalyticsImpressions;
}());
exports.AnalyticsImpressions = AnalyticsImpressions;
//# sourceMappingURL=impressions.js.map