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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var progress_bar_component_1 = require("./progress-bar/progress-bar.component");
var volume_slider_component_1 = require("./volume-slider/volume-slider.component");
var api_1 = require("../../../../services/api");
var scroll_1 = require("../../../../services/ux/scroll");
var webtorrent_service_1 = require("../../../webtorrent/webtorrent.service");
var source_candidates_1 = require("./source-candidates");
var OpspotVideoComponent = /** @class */ (function () {
    function OpspotVideoComponent(scroll, client, webtorrent, cd) {
        this.scroll = scroll;
        this.client = client;
        this.webtorrent = webtorrent;
        this.cd = cd;
        this.muted = false;
        this.poster = '';
        this.finished = new core_1.EventEmitter();
        this.transcoding = false;
        this.playedOnce = false;
        this.playCount = -1;
        this.playCountDisabled = false;
        this.candidates = new source_candidates_1.SourceCandidates();
        this.torrentInfo = false;
        this.torrentEnabled = false;
        this.initialized = false;
        this.availableQualities = [];
        this.currentQuality = '';
        this.autoplay = false;
    }
    Object.defineProperty(OpspotVideoComponent.prototype, "_src", {
        set: function (src) {
            this.src = src;
            if (this.initialized) {
                this.changeSources();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpspotVideoComponent.prototype, "_torrent", {
        set: function (torrent) {
            this.torrent = torrent;
            if (this.initialized) {
                this.changeSources();
            }
        },
        enumerable: true,
        configurable: true
    });
    OpspotVideoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.torrentEnabled = this.webtorrent.isEnabled();
        this.changeSources();
        this.initialized = true;
        if (this.guid && !this.log) {
            this.log = this.guid;
        }
        if (!this.playCountDisabled && this.log && this.playCount === -1) {
            this.client.get("api/v1/analytics/@counter/play/" + this.log)
                .then(function (response) {
                if (!response.data) {
                    return;
                }
                _this.playCount = response.data;
            });
        }
    };
    OpspotVideoComponent.prototype.ngAfterViewInit = function () {
        this.detectChanges();
    };
    Object.defineProperty(OpspotVideoComponent.prototype, "_autoplay", {
        set: function (value) {
            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
                this.autoplay = false;
            }
            else {
                this.autoplay = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpspotVideoComponent.prototype, "_playCount", {
        set: function (value) {
            if (!value && value !== 0) {
                if (value === false) {
                    this.playCountDisabled = true;
                }
                return;
            }
            this.playCount = value;
        },
        enumerable: true,
        configurable: true
    });
    OpspotVideoComponent.prototype.onError = function (_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, player = _b.player, e = _b.e;
        console.error('Received error when trying to reproduce video', e, player);
        setTimeout(function () { return _this.fallback(); }, 0);
    };
    OpspotVideoComponent.prototype.onPlay = function () {
        this.addViewCount();
    };
    OpspotVideoComponent.prototype.onEnd = function () {
        this.sendFinished();
    };
    OpspotVideoComponent.prototype.onPause = function () { };
    OpspotVideoComponent.prototype.sendFinished = function () {
        this.finished.emit(true);
    };
    OpspotVideoComponent.prototype.addViewCount = function () {
        var _this = this;
        if (!this.log || this.playedOnce) {
            return;
        }
        this.client.put('api/v1/analytics/play/' + this.log)
            .then(function () {
            if (!_this.playCountDisabled) {
                _this.playCount++;
            }
        });
        this.playedOnce = true;
    };
    OpspotVideoComponent.prototype.onMouseEnter = function () {
        this.progressBar.getSeeker();
        this.progressBar.enableKeyControls();
    };
    OpspotVideoComponent.prototype.onMouseLeave = function () {
        this.progressBar.stopSeeker();
        this.progressBar.disableKeyControls();
    };
    OpspotVideoComponent.prototype.selectedQuality = function (quality) {
        var _this = this;
        var player = this.playerRef.getPlayer();
        var time = player ? player.currentTime : 0;
        this.playerRef.pause();
        this.currentQuality = quality;
        this.reorderSourcesBasedOnQuality();
        this.changeSources();
        // Update
        this.detectChanges();
        setTimeout(function () { return _this.playerRef.resumeFromTime(time); }, 0);
    };
    // isVisible() {
    //   if (this.autoplay)
    //     return;
    //   // if (!this.visibleplay)
    //   //   return;
    //   if (!this.guid)
    //     return;
    //   if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    //     this.muted = false;
    //     return;
    //   }
    //   /*var bounds = this.element.getBoundingClientRect();
    //   if (bounds.top < this.scroll.view.clientHeight && bounds.top + (this.scroll.view.clientHeight / 2) >= 0) {
    //     if (!this.torrentVideo.isPlaying()) {
    //       this.torrentVideo.play();
    //     }
    //   } else {
    //     if (this.torrentVideo.isPlaying()) {
    //       // this.element.muted = true;
    //       this.torrentVideo.pause();
    //     }
    //   }*/
    // }
    OpspotVideoComponent.prototype.toggleTorrentInfo = function () {
        this.torrentInfo = !this.torrentInfo;
    };
    OpspotVideoComponent.prototype.ngOnDestroy = function () {
        if (this.scroll_listener)
            this.scroll.unListen(this.scroll_listener);
    };
    OpspotVideoComponent.prototype.pause = function () {
        this.playerRef.pause();
    };
    OpspotVideoComponent.prototype.play = function () {
        this.playerRef.play();
    };
    OpspotVideoComponent.prototype.toggle = function () {
        this.playerRef.toggle();
    };
    // Sources
    OpspotVideoComponent.prototype.fallback = function () {
        return __awaiter(this, void 0, void 0, function () {
            var success, response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.candidates.setAsBlacklisted(this.current.type, this.current.src);
                        success = this.pickNextBestSource();
                        if (!!success) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.get("api/v1/media/transcoding/" + this.guid)];
                    case 1:
                        response = _a.sent();
                        this.transcoding = true || response.transcoding; // TODO: Handle this correctly
                        _a.label = 2;
                    case 2:
                        this.detectChanges();
                        setTimeout(function () {
                            _this.progressBar.bindToElement();
                            _this.volumeSlider.bindToElement();
                            _this.playerRef.resumeFromTime(0);
                        }, 0);
                        return [2 /*return*/];
                }
            });
        });
    };
    OpspotVideoComponent.prototype.changeSources = function () {
        this.candidates.empty();
        if (this.torrent && this.torrentEnabled) {
            var sources = this.torrent.map(function (s) { return s.key; });
            this.candidates.setSource('torrent', sources);
        }
        if (this.src) {
            var sources = this.src.map(function (s) { return s.uri; });
            this.candidates.setSource('direct-http', sources);
        }
        this.updateAvailableQualities();
        return this.pickNextBestSource();
    };
    OpspotVideoComponent.prototype.pickNextBestSource = function () {
        var bestSource = this.candidates.pick(['torrent', 'direct-http'], source_candidates_1.SOURCE_CANDIDATE_PICK_ZIGZAG);
        if (!bestSource) {
            // Keep the last player active
            return false;
        }
        this.current = {
            type: bestSource.type,
            src: bestSource.value
        };
        return !!this.current;
    };
    // Qualities
    OpspotVideoComponent.prototype.updateAvailableQualities = function () {
        var qualities = [];
        if (this.src && this.src.length) {
            this.src.forEach(function (item) { return qualities.push(item.res); });
        }
        if (this.torrent && this.torrent.length) {
            this.torrent.forEach(function (item) { return qualities.push(item.res); });
        }
        this.availableQualities = qualities
            .filter(function (item, index, self) { return self.indexOf(item) === index; })
            .sort(function (a, b) { return parseFloat(b) - parseFloat(a); });
        if (!this.currentQuality) {
            this.currentQuality = this.availableQualities[0];
        }
    };
    OpspotVideoComponent.prototype.reorderSourcesBasedOnQuality = function () {
        var _this = this;
        var _a, _b;
        // Torrent
        if (this.torrent && this.torrent.length > 0) {
            var torrentI = this.torrent.findIndex(function (s) { return s.res === _this.currentQuality; });
            if (torrentI > -1) {
                (_a = this.torrent).unshift.apply(_a, this.torrent.splice(torrentI, 1));
            }
        }
        // Src
        if (this.src && this.src.length > 0) {
            var srcI = this.src.findIndex(function (s) { return s.res === _this.currentQuality; });
            if (srcI > -1) {
                (_b = this.src).unshift.apply(_b, this.src.splice(srcI, 1));
            }
        }
    };
    OpspotVideoComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotVideoComponent.prototype, "guid", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotVideoComponent.prototype, "log", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], OpspotVideoComponent.prototype, "muted", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OpspotVideoComponent.prototype, "poster", void 0);
    __decorate([
        core_1.Output('finished'),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoComponent.prototype, "finished", void 0);
    __decorate([
        core_1.ViewChild('progressBar'),
        __metadata("design:type", progress_bar_component_1.OpspotVideoProgressBar)
    ], OpspotVideoComponent.prototype, "progressBar", void 0);
    __decorate([
        core_1.ViewChild('volumeSlider'),
        __metadata("design:type", volume_slider_component_1.OpspotVideoVolumeSlider)
    ], OpspotVideoComponent.prototype, "volumeSlider", void 0);
    __decorate([
        core_1.ViewChild('player'),
        __metadata("design:type", Object)
    ], OpspotVideoComponent.prototype, "playerRef", void 0);
    __decorate([
        core_1.Input('src'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], OpspotVideoComponent.prototype, "_src", null);
    __decorate([
        core_1.Input('torrent'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], OpspotVideoComponent.prototype, "_torrent", null);
    __decorate([
        core_1.Input('autoplay'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], OpspotVideoComponent.prototype, "_autoplay", null);
    __decorate([
        core_1.Input('playCount'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], OpspotVideoComponent.prototype, "_playCount", null);
    OpspotVideoComponent = __decorate([
        core_1.Component({
            selector: 'm-video',
            host: {
                '(mouseenter)': 'onMouseEnter()',
                '(mouseleave)': 'onMouseLeave()'
            },
            templateUrl: 'video.component.html',
        }),
        __metadata("design:paramtypes", [scroll_1.ScrollService,
            api_1.Client,
            webtorrent_service_1.WebtorrentService,
            core_1.ChangeDetectorRef])
    ], OpspotVideoComponent);
    return OpspotVideoComponent;
}());
exports.OpspotVideoComponent = OpspotVideoComponent;
var ads_component_1 = require("./ads.component");
exports.VideoAds = ads_component_1.VideoAds;
//# sourceMappingURL=video.component.js.map