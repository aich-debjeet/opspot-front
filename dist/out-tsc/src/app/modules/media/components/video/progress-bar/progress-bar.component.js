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
var OpspotVideoProgressBar = /** @class */ (function () {
    function OpspotVideoProgressBar(cd, _element) {
        var _this = this;
        this.cd = cd;
        this._element = _element;
        this.time = {
            minutes: '00',
            seconds: '00'
        };
        this.elapsed = {
            minutes: '00',
            seconds: '00'
        };
        this.remaining = null;
        this.seeked = 0;
        this.duration = 0;
        this._loadedMetadata = function () {
            _this.duration = _this.element.duration;
            _this.calculateTime();
        };
    }
    OpspotVideoProgressBar.prototype.ngOnInit = function () {
        this.keyPressListener = this.executeControl.bind(this);
        this.bindToElement();
    };
    OpspotVideoProgressBar.prototype.bindToElement = function () {
        if (this.element) {
            this.element.removeEventListener('loadedmetadata', this._loadedMetadata);
        }
        if (this.playerRef.getPlayer()) {
            this.element = this.playerRef.getPlayer();
            this.element.addEventListener('loadedmetadata', this._loadedMetadata);
            if (this.element.readyState > 0) {
                this._loadedMetadata();
            }
        }
    };
    OpspotVideoProgressBar.prototype.ngOnDestroy = function () {
        this.element.removeEventListener('loadedmetadata', this._loadedMetadata);
        clearInterval(this.seek_interval);
    };
    OpspotVideoProgressBar.prototype.calculateTime = function () {
        var seconds = this.duration;
        this.time.minutes = Math.floor(seconds / 60);
        if (parseInt(this.time.minutes) < 10)
            this.time.minutes = '0' + this.time.minutes;
        this.time.seconds = Math.floor(seconds % 60);
        if (parseInt(this.time.seconds) < 10)
            this.time.seconds = '0' + this.time.seconds;
    };
    OpspotVideoProgressBar.prototype.calculateElapsed = function () {
        var seconds = this.element.currentTime;
        this.elapsed.minutes = Math.floor(seconds / 60);
        if (parseInt(this.elapsed.minutes) < 10)
            this.elapsed.minutes = '0' + this.elapsed.minutes;
        this.elapsed.seconds = Math.floor(seconds % 60);
        if (parseInt(this.elapsed.seconds) < 10)
            this.elapsed.seconds = '0' + this.elapsed.seconds;
    };
    OpspotVideoProgressBar.prototype.calculateRemaining = function () {
        if (!this.duration || this.element.paused) {
            this.remaining = null;
            return;
        }
        var seconds = this.duration - this.element.currentTime;
        this.remaining = { seconds: 0, minutes: 0 };
        this.remaining.minutes = Math.floor(seconds / 60);
        if (parseInt(this.remaining.minutes) < 10)
            this.remaining.minutes = '0' + this.remaining.minutes;
        this.remaining.seconds = Math.floor(seconds % 60);
        if (parseInt(this.remaining.seconds) < 10)
            this.remaining.seconds = '0' + this.remaining.seconds;
    };
    OpspotVideoProgressBar.prototype.seek = function (e) {
        e.preventDefault();
        var seeker = e.target;
        var seek = e.offsetX / seeker.offsetWidth;
        this.element.currentTime = this.seekerToSeconds(seek);
    };
    OpspotVideoProgressBar.prototype.seekerToSeconds = function (seek) {
        var duration = this.element.duration;
        return duration * seek;
    };
    OpspotVideoProgressBar.prototype.getSeeker = function () {
        var _this = this;
        if (this.seek_interval)
            clearInterval(this.seek_interval);
        this.seek_interval = setInterval(function () {
            _this.seeked = (_this.element.currentTime / _this.element.duration) * 100;
            _this.calculateElapsed();
            _this.calculateRemaining();
            _this.cd.markForCheck();
        }, 100);
    };
    OpspotVideoProgressBar.prototype.stopSeeker = function () {
        clearInterval(this.seek_interval);
    };
    OpspotVideoProgressBar.prototype.enableKeyControls = function () {
        window.removeEventListener('keydown', this.keyPressListener, true);
        window.addEventListener('keydown', this.keyPressListener, true);
    };
    OpspotVideoProgressBar.prototype.disableKeyControls = function () {
        window.removeEventListener('keydown', this.keyPressListener, true);
    };
    OpspotVideoProgressBar.prototype.togglePause = function () {
        if (this.element.paused === false) {
            this.element.pause();
        }
        else {
            this.element.play();
        }
    };
    OpspotVideoProgressBar.prototype.moveToTime = function (offset) {
        this.element.currentTime = this.element.currentTime + offset;
    };
    OpspotVideoProgressBar.prototype.executeControl = function (e) {
        e.preventDefault();
        switch (e.keyCode) {
            case 39:
                this.moveToTime(2);
                break;
            case 37:
                this.moveToTime(-2);
                break;
            case 32:
                this.togglePause();
                break;
        }
    };
    __decorate([
        core_1.Input('player'),
        __metadata("design:type", Object)
    ], OpspotVideoProgressBar.prototype, "playerRef", void 0);
    OpspotVideoProgressBar = __decorate([
        core_1.Component({
            selector: 'm-video--progress-bar',
            templateUrl: 'progress-bar.component.html'
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            core_1.ElementRef])
    ], OpspotVideoProgressBar);
    return OpspotVideoProgressBar;
}());
exports.OpspotVideoProgressBar = OpspotVideoProgressBar;
//# sourceMappingURL=progress-bar.component.js.map