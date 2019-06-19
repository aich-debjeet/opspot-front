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
var OpspotVideoQualitySelector = /** @class */ (function () {
    function OpspotVideoQualitySelector() {
        this.selectEmitter = new core_1.EventEmitter();
        this.qualities = [];
    }
    Object.defineProperty(OpspotVideoQualitySelector.prototype, "_qualities", {
        set: function (qualities) {
            if (!qualities || !qualities.length) {
                this.qualities = [];
                return;
            }
            this.qualities = qualities
                .map(function (quality) { return quality; })
                .sort(function (a, b) { return parseFloat(b) - parseFloat(a); });
        },
        enumerable: true,
        configurable: true
    });
    OpspotVideoQualitySelector.prototype.selectQuality = function (quality) {
        this.current = quality;
        this.selectEmitter.emit(quality);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OpspotVideoQualitySelector.prototype, "current", void 0);
    __decorate([
        core_1.Output('select'),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoQualitySelector.prototype, "selectEmitter", void 0);
    __decorate([
        core_1.Input('qualities'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], OpspotVideoQualitySelector.prototype, "_qualities", null);
    OpspotVideoQualitySelector = __decorate([
        core_1.Component({
            selector: 'm-video--quality-selector',
            templateUrl: 'quality-selector.component.html'
        })
    ], OpspotVideoQualitySelector);
    return OpspotVideoQualitySelector;
}());
exports.OpspotVideoQualitySelector = OpspotVideoQualitySelector;
//# sourceMappingURL=quality-selector.component.js.map