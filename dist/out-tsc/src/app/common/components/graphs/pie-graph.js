"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PieGraph = /** @class */ (function () {
    function PieGraph() {
        this.max = 156;
        this.radius = 25;
        this.diameter = 50;
    }
    Object.defineProperty(PieGraph.prototype, "_data", {
        set: function (value) {
            if (!value)
                return;
            this.data = value;
            this.calculate();
        },
        enumerable: true,
        configurable: true
    });
    PieGraph.prototype.getBounds = function () {
        var max = 0;
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var stat = _a[_i];
            if (stat.total > max)
                max = stat.total;
        }
        return max;
    };
    PieGraph.prototype.calculate = function () {
        var r = 25;
        var c = Math.PI * (r * 2);
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var stat = _a[_i];
            var value = stat.total;
            var offset = ((100 - value) / 100) * c;
            this.segments = [
                {
                    array: c,
                    offset: offset
                }
            ];
        }
    };
    PieGraph = __decorate([
        core_1.Component({
            selector: 'opspot-graph-pie',
            inputs: ['_data: data'],
            templateUrl: 'pie-graph.component.html'
        })
    ], PieGraph);
    return PieGraph;
}());
exports.PieGraph = PieGraph;
//# sourceMappingURL=pie-graph.js.map