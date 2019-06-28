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
var client_1 = require("../../../../services/api/client");
var TokenOnboardingVideoComponent = /** @class */ (function () {
    function TokenOnboardingVideoComponent(client, cd) {
        this.client = client;
        this.cd = cd;
    }
    TokenOnboardingVideoComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.videoEl);
        this.videoEl.nativeElement.addEventListener("play", function () {
            _this.detectChanges();
        });
        this.videoEl.nativeElement.addEventListener("pause", function () {
            _this.detectChanges();
        });
    };
    TokenOnboardingVideoComponent.prototype.play = function () {
        this.videoEl.nativeElement.play();
        this.detectChanges();
    };
    TokenOnboardingVideoComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.ViewChild('video'),
        __metadata("design:type", Object)
    ], TokenOnboardingVideoComponent.prototype, "videoEl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TokenOnboardingVideoComponent.prototype, "src", void 0);
    TokenOnboardingVideoComponent = __decorate([
        core_1.Component({
            selector: 'm-token--onboarding--video',
            template: "\n    <video controls #video>\n      <source [src]=\"src\" type=\"video/mp4\" />\n    </video>\n    <i class=\"material-icons\" (click)=\"play()\" *ngIf=\"video.paused\">play_circle_outline</i>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_1.Client,
            core_1.ChangeDetectorRef])
    ], TokenOnboardingVideoComponent);
    return TokenOnboardingVideoComponent;
}());
exports.TokenOnboardingVideoComponent = TokenOnboardingVideoComponent;
//# sourceMappingURL=video.component.js.map