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
var BlockchainMarketingCountdownComponent = /** @class */ (function () {
    function BlockchainMarketingCountdownComponent(cd) {
        this.cd = cd;
        this.end = new Date("Aug 13, 2018 12:00:00 UTC").getTime();
    }
    BlockchainMarketingCountdownComponent.prototype.ngOnInit = function () {
        this.countDown();
    };
    BlockchainMarketingCountdownComponent.prototype.countDown = function () {
        var _this = this;
        this.interval = setInterval(function () {
            var now = new Date().getTime();
            var distance = _this.end - now;
            _this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
            _this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            _this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            _this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
            _this.cd.markForCheck();
            _this.cd.detectChanges();
        });
    };
    BlockchainMarketingCountdownComponent.prototype.ngOnDestroy = function () {
        if (this.interval)
            clearInterval(this.interval);
    };
    BlockchainMarketingCountdownComponent = __decorate([
        core_1.Component({
            selector: 'm-blockchain--marketing--countdown',
            templateUrl: 'countdown.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], BlockchainMarketingCountdownComponent);
    return BlockchainMarketingCountdownComponent;
}());
exports.BlockchainMarketingCountdownComponent = BlockchainMarketingCountdownComponent;
//# sourceMappingURL=countdown.component.js.map