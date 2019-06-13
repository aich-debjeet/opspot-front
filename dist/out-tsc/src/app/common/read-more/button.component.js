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
var ReadMoreButtonComponent = /** @class */ (function () {
    function ReadMoreButtonComponent(cd) {
        this.cd = cd;
    }
    ReadMoreButtonComponent.prototype.detectChanges = function () {
        var _this = this;
        setTimeout(function () {
            _this.cd.markForCheck();
            _this.cd.detectChanges();
        });
    };
    ReadMoreButtonComponent = __decorate([
        core_1.Component({
            selector: 'm-read-more--button',
            template: "\n    <div class=\"m-read-more--button\" *ngIf=\"content && content.expandable\">\n      <span class=\"mdl-color-text--blue-grey-500\" (click)=\"content.expand()\" i18n=\"@@COMMON__READ_MORE__ACTION\">Read more</span>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], ReadMoreButtonComponent);
    return ReadMoreButtonComponent;
}());
exports.ReadMoreButtonComponent = ReadMoreButtonComponent;
//# sourceMappingURL=button.component.js.map