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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var CommentsScrollDirective = /** @class */ (function () {
    function CommentsScrollDirective(elementRef) {
        this.elementRef = elementRef;
        this.enabled = true;
        this.previous = new core_1.EventEmitter();
        this.next = new core_1.EventEmitter();
        this.DEBOUNCE_TIME_MS = 1000 / 30; // fps
        this.STICK_INTERVAL_MS = this.DEBOUNCE_TIME_MS * 30; // frames
        this.SCROLL_THRESHOLD = 12; // pixels
        this.scroll = rxjs_1.fromEvent(elementRef.nativeElement, 'scroll');
    }
    Object.defineProperty(CommentsScrollDirective.prototype, "_emitter", {
        set: function (emitter) {
            var _this = this;
            if (!(emitter instanceof core_1.EventEmitter)) {
                console.error('Not an emitter');
                return;
            }
            if (this.emitterSubscription) {
                this.emitterSubscription.unsubscribe();
            }
            this.emitterSubscription = emitter.subscribe(function (command) {
                setTimeout(function () {
                    switch (command) {
                        case 'top':
                            _this.top(true, true);
                            break;
                        case 'bottom':
                            _this.bottom(true, true);
                            break;
                    }
                }, _this.DEBOUNCE_TIME_MS);
            });
        },
        enumerable: true,
        configurable: true
    });
    CommentsScrollDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.scrollSubscription = this.scroll
            .pipe(operators_1.debounceTime(this.DEBOUNCE_TIME_MS / 5))
            .subscribe(function (event) { return _this.run(event); });
        this.setStick();
    };
    CommentsScrollDirective.prototype.ngOnDestroy = function () {
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
        if (this.emitterSubscription) {
            this.emitterSubscription.unsubscribe();
        }
        if (this.stickInterval) {
            clearInterval(this.stickInterval);
        }
    };
    CommentsScrollDirective.prototype.run = function (event) {
        var el = this.elementRef.nativeElement;
        if (el.scrollTop <= this.SCROLL_THRESHOLD) {
            this.previous.emit(true);
        }
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) {
            this.next.emit(true);
        }
        else {
            this.setStick(null);
        }
    };
    CommentsScrollDirective.prototype.stick = function () {
        if (!this.stickTo) {
            return;
        }
        switch (this.stickTo) {
            case 'top':
                this.top();
                break;
            case 'bottom':
                this.bottom();
                break;
        }
    };
    CommentsScrollDirective.prototype.setStick = function (value) {
        var _this = this;
        if (value || value === null) {
            this.stickTo = value;
        }
        // Refresh timer
        if (this.stickInterval) {
            clearInterval(this.stickInterval);
        }
        this.stickInterval = setInterval(function () { return _this.stick(); }, this.STICK_INTERVAL_MS);
    };
    CommentsScrollDirective.prototype.top = function (run, stick) {
        if (this.enabled) {
            this.elementRef.nativeElement.scrollTop = 0;
            if (stick) {
                this.setStick('top');
            }
            if (run) {
                this.run();
            }
        }
    };
    CommentsScrollDirective.prototype.bottom = function (run, stick) {
        if (this.enabled) {
            this.elementRef.nativeElement.scrollTop = this.elementRef.nativeElement.scrollHeight;
            if (stick) {
                this.setStick('bottom');
            }
            if (run) {
                this.run();
            }
        }
    };
    CommentsScrollDirective = __decorate([
        core_1.Directive({
            selector: '[commentsScroll]',
            inputs: ['_emitter: emitter', 'enabled'],
            outputs: ['previous', 'next'],
            exportAs: 'commentsScroll'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], CommentsScrollDirective);
    return CommentsScrollDirective;
}());
exports.CommentsScrollDirective = CommentsScrollDirective;
//# sourceMappingURL=scroll.js.map