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
var OpspotVideoVolumeSlider = /** @class */ (function () {
    function OpspotVideoVolumeSlider() {
    }
    OpspotVideoVolumeSlider.prototype.ngOnInit = function () {
        this.bindToElement();
    };
    OpspotVideoVolumeSlider.prototype.ngAfterViewInit = function () {
        this.bindToElement();
    };
    OpspotVideoVolumeSlider.prototype.bindToElement = function () {
        if (this.playerRef.getPlayer()) {
            this.element = this.playerRef.getPlayer();
        }
    };
    __decorate([
        core_1.Input('player'),
        __metadata("design:type", Object)
    ], OpspotVideoVolumeSlider.prototype, "playerRef", void 0);
    OpspotVideoVolumeSlider = __decorate([
        core_1.Component({
            selector: 'm-video--volume-slider',
            templateUrl: 'volume-slider.component.html'
        })
    ], OpspotVideoVolumeSlider);
    return OpspotVideoVolumeSlider;
}());
exports.OpspotVideoVolumeSlider = OpspotVideoVolumeSlider;
//# sourceMappingURL=volume-slider.component.js.map