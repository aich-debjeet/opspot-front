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
var scroll_1 = require("../../../services/ux/scroll");
var InfiniteScroll = /** @class */ (function () {
    function InfiniteScroll(_element, scroll) {
        this.scroll = scroll;
        this.loadHandler = new core_1.EventEmitter(true);
        this.inProgress = false;
        this.moreData = true;
        this.hideManual = false;
        this.element = _element.nativeElement;
        this.init();
    }
    InfiniteScroll.prototype.init = function () {
        var _this = this;
        this._listener = this.scroll.listen(function (e) {
            if (_this.element.offsetTop
                - _this.element.clientHeight
                - _this.scroll.view.clientHeight
                <= _this.scroll.view.scrollTop && _this.moreData) {
                _this.loadHandler.next(true);
            }
        }, 100);
    };
    InfiniteScroll.prototype.manualLoad = function () {
        this.loadHandler.next(true);
    };
    InfiniteScroll.prototype.ngOnDestroy = function () {
        if (this._listener)
            this.scroll.unListen(this._listener);
    };
    InfiniteScroll = __decorate([
        core_1.Component({
            selector: 'infinite-scroll',
            inputs: ['distance', 'on', 'inProgress', 'moreData', 'hideManual'],
            outputs: ['loadHandler: load'],
            template: "\n    <div class=\"mdl-spinner mdl-js-spinner is-active\" [mdl] [hidden]=\"!inProgress\"></div>\n    <div class=\"m-infinite-scroll-manual mdl-color--blue-grey-200 mdl-color-text--blue-grey-500\"\n      [hidden]=\"inProgress || !moreData\"\n      (click)=\"manualLoad()\"\n      *ngIf=\"!hideManual\">\n      <ng-container i18n=\"@@COMMON__INFINITE_SCROLL__LOAD_MORE\">Click to load more</ng-container>\n    </div>\n    <div class=\"m-infinite-scroll-manual mdl-color--blue-grey-200 mdl-color-text--blue-grey-500\"\n      [hidden]=\"moreData\"\n      *ngIf=\"!hideManual\">\n      <ng-container i18n=\"@@COMMON__INFINITE_SCROLL__NOTHING_MORE\">Nothing more to load</ng-container>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, scroll_1.ScrollService])
    ], InfiniteScroll);
    return InfiniteScroll;
}());
exports.InfiniteScroll = InfiniteScroll;
//# sourceMappingURL=infinite-scroll.js.map