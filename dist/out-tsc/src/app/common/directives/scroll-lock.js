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
var ScrollLock = /** @class */ (function () {
    function ScrollLock(_element) {
        this._element = _element;
        this.strictScrollLock = false;
        this.overscroll = new core_1.EventEmitter();
        this.element = _element.nativeElement;
        this.wheelHandler = this._domWheelLock(this);
    }
    ScrollLock.prototype.lock = function () {
        this.element.addEventListener('wheel', this.wheelHandler, true);
    };
    ScrollLock.prototype.unlock = function () {
        this.element.removeEventListener('wheel', this.wheelHandler, true);
    };
    ScrollLock.prototype.ngOnDestroy = function () {
        this.unlock();
    };
    ScrollLock.prototype._domWheelLock = function (_this) {
        return function (event) {
            var el = (event.currentTarget);
            if (event.ctrlKey) { // Zooming
                return;
            }
            event.stopPropagation();
            if (!this.strictScrollLock && el.scrollHeight <= el.clientHeight) {
                return;
            }
            var ratio = el.clientHeight / window.innerHeight, delta = event.wheelDelta || (-1 * event.detail) || (-1 * event.deltaY), normalizedWheel = _this._normalizeWheel(event), deltaY = normalizedWheel.pixelY;
            if ((delta > 0 && el.scrollTop + deltaY <= 0) ||
                (delta < 0 && el.scrollTop + deltaY >= el.scrollHeight - el.clientHeight)) {
                event.preventDefault();
                _this.overscroll.emit({
                    deltaY: deltaY
                });
                if (deltaY) {
                    el.scrollTop += deltaY;
                }
            }
        };
    };
    // https://stackoverflow.com/a/30134826
    ScrollLock.prototype._normalizeWheel = function (event) {
        var PIXEL_STEP = 10;
        var LINE_HEIGHT = 40;
        var PAGE_HEIGHT = 800;
        var sX = 0, sY = 0, // spinX, spinY
        pX = 0, pY = 0; // pixelX, pixelY
        // Legacy
        if ('detail' in event) {
            sY = event.detail;
        }
        if ('wheelDelta' in event) {
            sY = -event.wheelDelta / 120;
        }
        if ('wheelDeltaY' in event) {
            sY = -event.wheelDeltaY / 120;
        }
        if ('wheelDeltaX' in event) {
            sX = -event.wheelDeltaX / 120;
        }
        // side scrolling on FF with DOMMouseScroll
        if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
            sX = sY;
            sY = 0;
        }
        pX = sX * PIXEL_STEP;
        pY = sY * PIXEL_STEP;
        if ('deltaY' in event) {
            pY = event.deltaY;
        }
        if ('deltaX' in event) {
            pX = event.deltaX;
        }
        if ((pX || pY) && event.deltaMode) {
            if (event.deltaMode === 1) {
                pX *= LINE_HEIGHT;
                pY *= LINE_HEIGHT;
            }
            else {
                pX *= PAGE_HEIGHT;
                pY *= PAGE_HEIGHT;
            }
        }
        // Fall-back if spin cannot be determined
        if (pX && !sX) {
            sX = (pX < 1) ? -1 : 1;
        }
        if (pY && !sY) {
            sY = (pY < 1) ? -1 : 1;
        }
        return {
            spinX: sX,
            spinY: sY,
            pixelX: pX,
            pixelY: pY
        };
    };
    ScrollLock = __decorate([
        core_1.Directive({
            selector: '[scrollLock]',
            inputs: ['strictScrollLock'],
            outputs: ['overscroll'],
            host: {
                '(mouseenter)': 'lock()',
                '(mouseleave)': 'unlock()'
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], ScrollLock);
    return ScrollLock;
}());
exports.ScrollLock = ScrollLock;
//# sourceMappingURL=scroll-lock.js.map