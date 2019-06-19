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
var GoogleChartsLoader = /** @class */ (function () {
    function GoogleChartsLoader(ngZone) {
        this.ngZone = ngZone;
        this.packages = [
            'corechart',
            'line',
        ];
    }
    GoogleChartsLoader_1 = GoogleChartsLoader;
    GoogleChartsLoader._ = function (ngZone) {
        return new GoogleChartsLoader_1(ngZone);
    };
    GoogleChartsLoader.prototype.ready = function () {
        var _this = this;
        if (!this.readyPromise) {
            this.readyPromise = this._scriptReady().then(function () { return _this._loaderReady(); });
        }
        return this.readyPromise;
    };
    GoogleChartsLoader.prototype._scriptReady = function () {
        if (window.google && window.google.charts) {
            return Promise.resolve(true);
        }
        return new Promise(function (resolve, reject) {
            var _timer;
            _timer = setInterval(function () {
                if (window.google && window.google.charts) {
                    clearInterval(_timer);
                    resolve(true);
                }
            }, 250);
        });
    };
    GoogleChartsLoader.prototype._loaderReady = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            window.google.charts.load('current', { packages: _this.packages });
            window.google.charts.setOnLoadCallback(function () {
                setTimeout(function () {
                    _this.ngZone.run(function () { return resolve(true); });
                }, 500);
            });
        });
    };
    var GoogleChartsLoader_1;
    GoogleChartsLoader = GoogleChartsLoader_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], GoogleChartsLoader);
    return GoogleChartsLoader;
}());
exports.GoogleChartsLoader = GoogleChartsLoader;
//# sourceMappingURL=google-charts-loader.js.map