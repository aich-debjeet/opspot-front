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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var google_charts_loader_1 = require("../../../services/third-party/google-charts-loader");
var ChartComponent = /** @class */ (function () {
    function ChartComponent(ngZone, googleChartsLoader) {
        this.ngZone = ngZone;
        this.googleChartsLoader = googleChartsLoader;
        this._chartOptions = {};
    }
    ChartComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.googleChartsLoader.ready()
            .then(function () {
            _this.attach();
            _this.draw();
        });
        this._resizeWatch = rxjs_1.fromEvent(window, 'resize')
            .pipe(operators_1.debounceTime(250))
            .subscribe(function (value) {
            _this.ngZone.run(function () { return _this.draw(); });
        });
    };
    ChartComponent.prototype.ngOnDestroy = function () {
        if (this._resizeWatch) {
            this._resizeWatch.unsubscribe();
        }
    };
    ChartComponent.prototype.ngOnChanges = function () {
        this.draw();
    };
    ChartComponent.prototype.attach = function () {
        var chartClass;
        switch (this.type) {
            case 'line':
                chartClass = window.google.charts.Line;
                //this._chartOptions = {
                //  curveType: 'function',
                //  legend: 'none'
                //};
                break;
            default:
                throw new Error('Unknown chart type');
        }
        this._chartInstance = new chartClass(this.containerElement.nativeElement);
    };
    ChartComponent.prototype.draw = function () {
        if (!this._chartInstance) {
            return;
        }
        if (!this.columns || this.columns.length < 2) {
            throw new Error('Charts must have at least 2 columns');
        }
        var data = new window.google.visualization.DataTable();
        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            data.addColumn(column.type || 'string', column.label);
        }
        data.addRows(this.rows);
        this._chartInstance.draw(data, {
            chart: {
                title: this.title,
                subtitle: this.subtitle
            },
            axisTitlesPosition: 'none',
            axes: {
                x: {
                    0: { side: 'bottom', label: '' }
                }
            },
            legend: {
                position: 'none'
            },
            animation: {
                startup: true,
                duration: 1000,
                easing: 'out',
            },
            chartArea: {
                backgroundColor: 'transparent'
            },
            curveType: 'function'
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ChartComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ChartComponent.prototype, "subtitle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ChartComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ChartComponent.prototype, "columns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ChartComponent.prototype, "rows", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], ChartComponent.prototype, "containerElement", void 0);
    ChartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-chart',
            template: "\n    <div class=\"m-chart-container\" #container></div>\n  ",
            host: {
                '(window:resize)': 'draw()'
            }
        }),
        __metadata("design:paramtypes", [core_1.NgZone, google_charts_loader_1.GoogleChartsLoader])
    ], ChartComponent);
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;
//# sourceMappingURL=chart.component.js.map