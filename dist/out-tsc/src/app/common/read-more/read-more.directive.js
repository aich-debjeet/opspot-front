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
var button_component_1 = require("./button.component");
var ReadMoreDirective = /** @class */ (function () {
    function ReadMoreDirective(element, cd) {
        this.element = element;
        this.cd = cd;
        this.maxHeightAllowed = 320;
        this.expandable = false;
        this._element = element.nativeElement;
    }
    ReadMoreDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.realHeight = this._element.clientHeight;
        if (this.button && !this.button.content)
            this.button.content = this;
        if (this.realHeight > this.maxHeightAllowed) {
            this._element.style.maxHeight = this.maxHeightAllowed + 'px';
            this._element.style.position = 'relative';
            setTimeout(function () {
                _this.expandable = true;
                _this.detectChanges();
            }, 1);
        }
    };
    ReadMoreDirective.prototype.expand = function () {
        this._element.style.maxHeight = 'none';
        this.expandable = false;
        this.detectChanges();
    };
    ReadMoreDirective.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
        if (this.button) {
            this.button.detectChanges();
        }
    };
    __decorate([
        core_1.ContentChild(button_component_1.ReadMoreButtonComponent),
        __metadata("design:type", Object)
    ], ReadMoreDirective.prototype, "button", void 0);
    ReadMoreDirective = __decorate([
        core_1.Directive({
            selector: '[m-read-more]',
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.ChangeDetectorRef])
    ], ReadMoreDirective);
    return ReadMoreDirective;
}());
exports.ReadMoreDirective = ReadMoreDirective;
//# sourceMappingURL=read-more.directive.js.map