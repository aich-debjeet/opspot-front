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
var OpspotVideoDirectHttpPlayer = /** @class */ (function () {
    function OpspotVideoDirectHttpPlayer(cd) {
        var _this = this;
        this.cd = cd;
        this.muted = false;
        this.poster = '';
        this.autoplay = false;
        this.onPlay = new core_1.EventEmitter();
        this.onPause = new core_1.EventEmitter();
        this.onEnd = new core_1.EventEmitter();
        this.onError = new core_1.EventEmitter();
        this.loading = false;
        this._emitPlay = function () { return _this.onPlay.emit(_this.getPlayer()); };
        this._emitPause = function () { return _this.onPause.emit(_this.getPlayer()); };
        this._emitEnd = function () { return _this.onEnd.emit(_this.getPlayer()); };
        this._emitError = function (e) { return _this.onError.emit({ player: _this.getPlayer(), e: e }); };
        this._canPlayThrough = function () {
            _this.loading = false;
            _this.detectChanges();
        };
        this._dblClick = function () {
            _this.requestFullScreen();
        };
        this._onPlayerError = function (e) {
            if (!e.target.error && (e.target.networkState !== HTMLMediaElement.NETWORK_NO_SOURCE)) {
                // Poster error
                return;
            }
            _this.loading = false;
            _this.detectChanges();
            _this._emitError(e);
        };
    }
    Object.defineProperty(OpspotVideoDirectHttpPlayer.prototype, "_src", {
        set: function (src) {
            this.src = src;
            var player = this.getPlayer();
            if (player) {
                this.loading = true;
                this.detectChanges();
                player.load();
            }
        },
        enumerable: true,
        configurable: true
    });
    OpspotVideoDirectHttpPlayer.prototype.ngOnInit = function () {
        var player = this.getPlayer();
        player.addEventListener('dblclick', this._dblClick);
        player.addEventListener('playing', this._emitPlay);
        player.addEventListener('pause', this._emitPause);
        player.addEventListener('ended', this._emitEnd);
        player.addEventListener('error', this._onPlayerError);
        player.addEventListener('canplaythrough', this._canPlayThrough);
        this.loading = true;
    };
    OpspotVideoDirectHttpPlayer.prototype.ngOnDestroy = function () {
        var player = this.getPlayer();
        if (player) {
            player.removeEventListener('dblclick', this._dblClick);
            player.removeEventListener('playing', this._emitPlay);
            player.removeEventListener('pause', this._emitPause);
            player.removeEventListener('ended', this._emitEnd);
            player.removeEventListener('error', this._onPlayerError);
            player.removeEventListener('canplaythrough', this._canPlayThrough);
        }
    };
    OpspotVideoDirectHttpPlayer.prototype.getPlayer = function () {
        return this.player.nativeElement;
    };
    OpspotVideoDirectHttpPlayer.prototype.play = function () {
        var player = this.getPlayer();
        try {
            player.play();
        }
        catch (e) {
            console.error(e);
        }
    };
    OpspotVideoDirectHttpPlayer.prototype.pause = function () {
        var player = this.getPlayer();
        try {
            player.pause();
        }
        catch (e) {
            console.error(e);
        }
    };
    OpspotVideoDirectHttpPlayer.prototype.toggle = function () {
        var player = this.getPlayer();
        if (player.paused) {
            this.play();
        }
        else {
            this.pause();
        }
    };
    OpspotVideoDirectHttpPlayer.prototype.resumeFromTime = function (time) {
        if (time === void 0) { time = 0; }
        var player = this.getPlayer();
        try {
            player.currentTime = time;
            this.play();
        }
        catch (e) {
            console.error(e);
        }
    };
    OpspotVideoDirectHttpPlayer.prototype.isPlaying = function () {
        var player = this.getPlayer();
        return !player.paused;
    };
    OpspotVideoDirectHttpPlayer.prototype.isLoading = function () {
        return this.loading;
    };
    OpspotVideoDirectHttpPlayer.prototype.requestFullScreen = function () {
        var player = this.getPlayer();
        if (player.requestFullscreen) {
            player.requestFullscreen();
        }
        else if (player.msRequestFullscreen) {
            player.msRequestFullscreen();
        }
        else if (player.mozRequestFullScreen) {
            player.mozRequestFullScreen();
        }
        else if (player.webkitRequestFullscreen) {
            player.webkitRequestFullscreen();
        }
    };
    OpspotVideoDirectHttpPlayer.prototype.getInfo = function () {
        return {};
    };
    OpspotVideoDirectHttpPlayer.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.ViewChild('player'),
        __metadata("design:type", core_1.ElementRef)
    ], OpspotVideoDirectHttpPlayer.prototype, "player", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], OpspotVideoDirectHttpPlayer.prototype, "muted", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OpspotVideoDirectHttpPlayer.prototype, "poster", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], OpspotVideoDirectHttpPlayer.prototype, "autoplay", void 0);
    __decorate([
        core_1.Input('src'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], OpspotVideoDirectHttpPlayer.prototype, "_src", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoDirectHttpPlayer.prototype, "onPlay", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoDirectHttpPlayer.prototype, "onPause", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoDirectHttpPlayer.prototype, "onEnd", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoDirectHttpPlayer.prototype, "onError", void 0);
    OpspotVideoDirectHttpPlayer = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-video--direct-http-player',
            templateUrl: 'direct-http.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], OpspotVideoDirectHttpPlayer);
    return OpspotVideoDirectHttpPlayer;
}());
exports.OpspotVideoDirectHttpPlayer = OpspotVideoDirectHttpPlayer;
//# sourceMappingURL=direct-http.component.js.map