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
var LineGraph = /** @class */ (function () {
    function LineGraph() {
        this.points = '0 200, 500 0';
        this.y = 200;
        this.x = 500;
        this.y_padding = 0;
        //this.calculate();
    }
    Object.defineProperty(LineGraph.prototype, "_data", {
        set: function (value) {
            if (!value)
                return;
            this.data = value;
            this.calculate();
        },
        enumerable: true,
        configurable: true
    });
    LineGraph.prototype.getBounds = function () {
        var max = 0;
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var stat = _a[_i];
            if (stat.total > max)
                max = stat.total;
        }
        return max;
    };
    LineGraph.prototype.calculate = function () {
        var y_bounds = this.getBounds();
        var y_divi = (y_bounds + this.y_padding) / this.y;
        var x_count = this.data.length;
        var x_diff = this.x / (x_count - 1);
        var x_ticker = 0;
        //this.points = x_ticker + " " + this.y;
        this.points = '';
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var stat = _a[_i];
            var y_stat = this.y - (stat.total / y_divi) - (this.y_padding);
            this.points += x_ticker + ' ' + y_stat + ',';
            x_ticker = x_ticker + x_diff;
        }
        this.points = this.points.slice(0, -1);
    };
    LineGraph = __decorate([
        core_1.Component({
            selector: 'opspot-graph-line',
            inputs: ['_data: data', 'y: height', 'x: width'],
            template: "\n    <div [hidden]=\"!data\"> <!-- Angular has svg problems... -->\n      <svg fill=\"currentColor\"\n        [svgHack]\n        [viewBox]=\"'0 0 ' + x + ' ' + y\"\n        style=\"stroke:#757575; opacity:0.8; overflow:visible; max-width:100%;\"\n        xmlns=\"http://www.w3.org/2000/svg\">\n        <!-- X Y, X Y (from top to bottom) -->\n        <g class=\"points\">\n          <polyline [points]=\"points\"\n            style=\"fill:none;stroke-width:5;stroke-linejoin:round;\"\n          />\n        </g>\n\n      </svg>\n    </div>\n    <div class=\"mdl-spinner mdl-js-spinner is-active\" [hidden]=\"data\"></div>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], LineGraph);
    return LineGraph;
}());
exports.LineGraph = LineGraph;
//# sourceMappingURL=line-graph.js.map