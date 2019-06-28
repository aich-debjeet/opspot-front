"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var api_1 = require("../../../services/api");
var RevenueGraphComponent = /** @class */ (function () {
    function RevenueGraphComponent(client, currencyPipe) {
        this.client = client;
        this.currencyPipe = currencyPipe;
        this.inProgress = false;
        this.chart = null;
    }
    RevenueGraphComponent.prototype.ngOnInit = function () {
        this.loadGraph();
    };
    RevenueGraphComponent.prototype.loadGraph = function () {
        var _this = this;
        if (this.inProgress)
            return false;
        this.inProgress = true;
        //default
        var defaultChart = {
            columns: [
                { label: 'Date' },
                { label: 'Amount', type: 'currency' }
            ],
            rows: []
        };
        for (var i = 0; i < 14; i++) {
            defaultChart.rows[i] = ['0/0', 0];
        }
        this.chart = this._parseChart(defaultChart);
        return this.client.get("api/v1/monetization/service/analytics/chart")
            .then(function (_a) {
            var chart = _a.chart;
            _this.inProgress = false;
            _this.chart = _this._parseChart(chart);
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    RevenueGraphComponent.prototype._parseChart = function (data) {
        if (!data) {
            return null;
        }
        var chart = {
            title: data.title || void 0,
            columns: [],
            rows: []
        };
        for (var _i = 0, _a = (data.columns || []); _i < _a.length; _i++) {
            var dataColumn = _a[_i];
            var column = __assign({}, dataColumn); // clone
            if (column.type === 'currency') {
                column.type = 'number';
            }
            chart.columns.push(column);
        }
        for (var _b = 0, _c = data.rows; _b < _c.length; _b++) {
            var dataRow = _c[_b];
            for (var colIndex = 0; colIndex < dataRow.length; colIndex++) {
                if (data.columns[colIndex] && data.columns[colIndex].type === 'currency') {
                    dataRow[colIndex] = { v: dataRow[colIndex], f: this.currencyPipe.transform(dataRow[colIndex], 'USD', true) };
                }
            }
            chart.rows.push(dataRow);
        }
        return chart;
    };
    RevenueGraphComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-revenue--graph',
            templateUrl: 'graph.component.html',
            providers: [
                common_1.CurrencyPipe
            ]
        }),
        __metadata("design:paramtypes", [api_1.Client, common_1.CurrencyPipe])
    ], RevenueGraphComponent);
    return RevenueGraphComponent;
}());
exports.RevenueGraphComponent = RevenueGraphComponent;
//# sourceMappingURL=graph.component.js.map