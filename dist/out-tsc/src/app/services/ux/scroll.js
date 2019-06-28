"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ScrollService = /** @class */ (function () {
    function ScrollService() {
        this.viewEmitter = new core_1.EventEmitter();
        this.view = document.getElementsByTagName('body')[0];
        this.view.scrollTop = 0;
        this.scroll = rxjs_1.fromEvent(window, 'scroll');
    }
    ScrollService._ = function () {
        return new ScrollService();
    };
    ScrollService.prototype.listen = function (callback, debounce, throttle) {
        if (debounce === void 0) { debounce = 0; }
        if (throttle === void 0) { throttle = 0; }
        if (debounce) {
            return this.scroll
                .pipe(operators_1.debounceTime(debounce))
                .subscribe(callback);
        }
        if (throttle) {
            return this.scroll
                .pipe(operators_1.throttleTime(throttle))
                .subscribe(callback);
        }
        return this.scroll
            .subscribe(callback);
    };
    ScrollService.prototype.unListen = function (subscription) {
        subscription.unsubscribe();
    };
    ScrollService.prototype.listenForView = function () {
        var _this = this;
        if (!this.viewListener) {
            this.viewListener = this.scroll
                .pipe(operators_1.debounceTime(500))
                .subscribe(function (e) { _this.viewEmitter.next(e); });
        }
        return this.viewEmitter;
    };
    return ScrollService;
}());
exports.ScrollService = ScrollService;
//# sourceMappingURL=scroll.js.map