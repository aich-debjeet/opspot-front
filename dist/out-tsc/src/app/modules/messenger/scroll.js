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
var MessengerScrollDirective = /** @class */ (function () {
    function MessengerScrollDirective(_element) {
        this._element = _element;
        this.previous = new core_1.EventEmitter();
        this.next = new core_1.EventEmitter();
        this.moreData = true;
        this.element = _element.nativeElement;
        this.scroll = rxjs_1.fromEvent(this.element, 'scroll');
    }
    Object.defineProperty(MessengerScrollDirective.prototype, "emitter", {
        set: function (emitter) {
            var _this = this;
            emitter.subscribe({
                next: function () {
                    setTimeout(function () {
                        _this._element.nativeElement.scrollTop = _this._element.nativeElement.scrollHeight;
                    });
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    MessengerScrollDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.scroll
            .pipe(operators_1.debounceTime(100))
            .subscribe(function () {
            if (!_this.moreData)
                return;
            if (_this.element.scrollTop <= 12) {
                _this.previous.next(true);
            }
            if (_this.element.scrollTop + _this.element.clientHeight >= _this.element.scrollHeight - 12) {
                _this.next.next(true);
            }
        });
    };
    MessengerScrollDirective = __decorate([
        core_1.Directive({
            selector: '[opspot-messenger-scroll]',
            inputs: ['emitter', 'moreData'],
            outputs: ['previous', 'next']
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], MessengerScrollDirective);
    return MessengerScrollDirective;
}());
exports.MessengerScrollDirective = MessengerScrollDirective;
//# sourceMappingURL=scroll.js.map