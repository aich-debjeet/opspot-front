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
var webtorrent_service_1 = require("../../../../webtorrent/webtorrent.service");
var client_1 = require("../../../../../services/api/client");
var base64_to_blob_1 = require("../../../../../helpers/base64-to-blob");
var OpspotVideoTorrentPlayer = /** @class */ (function () {
    function OpspotVideoTorrentPlayer(cd, client, webtorrent) {
        var _this = this;
        this.cd = cd;
        this.client = client;
        this.webtorrent = webtorrent;
        this.muted = false;
        this.poster = '';
        this.autoplay = false;
        this.onPlay = new core_1.EventEmitter();
        this.onPause = new core_1.EventEmitter();
        this.onEnd = new core_1.EventEmitter();
        this.onError = new core_1.EventEmitter();
        this.initialized = false;
        this.loading = false;
        this.torrentReady = false;
        this.torrentInfo = {
            progress: 0,
            peers: 0,
            ul: 0,
            dl: 0,
            ulspeed: 0,
            dlspeed: 0,
        };
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
        this._onError = function (e) {
            _this.loading = false;
            _this.detectChanges();
            _this._emitError(e);
        };
        this._onPlayerError = function (e) {
            if (!e.target.error) {
                // Poster error
                return;
            }
            _this.loading = false;
            _this.detectChanges();
            _this._emitError(e);
        };
        this._refreshInfo = function () {
            if (!_this.torrentId || !_this.torrentReady || !_this.webtorrent.get(_this.torrentId)) {
                _this.torrentInfo = {
                    progress: 0,
                    peers: 0,
                    ul: 0,
                    dl: 0,
                    ulspeed: 0,
                    dlspeed: 0,
                };
            }
            else {
                var torrent = _this.webtorrent.get(_this.torrentId);
                _this.torrentInfo = {
                    progress: torrent.progress,
                    peers: torrent.numPeers,
                    ul: torrent.uploaded,
                    dl: torrent.downloaded,
                    ulspeed: torrent.uploadSpeed,
                    dlspeed: torrent.downloadSpeed,
                };
            }
            _this.detectChanges();
        };
    }
    Object.defineProperty(OpspotVideoTorrentPlayer.prototype, "_src", {
        set: function (src) {
            var _this = this;
            this.src = src;
            if (this.initialized) {
                this.removeTorrent();
                setTimeout(function () {
                    _this.loadTorrent();
                }, 0);
            }
        },
        enumerable: true,
        configurable: true
    });
    OpspotVideoTorrentPlayer.prototype.ngOnInit = function () {
        var player = this.getPlayer();
        player.addEventListener('dblclick', this._dblClick);
        player.addEventListener('playing', this._emitPlay);
        player.addEventListener('pause', this._emitPause);
        player.addEventListener('ended', this._emitEnd);
        player.addEventListener('error', this._onPlayerError);
        player.addEventListener('canplaythrough', this._canPlayThrough);
        this.infoTimer$ = setInterval(this._refreshInfo, 1000);
    };
    OpspotVideoTorrentPlayer.prototype.ngAfterViewInit = function () {
        this.initialized = true;
        if (this.autoplay) {
            this.play();
        }
    };
    OpspotVideoTorrentPlayer.prototype.ngOnDestroy = function () {
        if (this.infoTimer$) {
            clearInterval(this.infoTimer$);
        }
        this.removeTorrent();
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
    OpspotVideoTorrentPlayer.prototype.getPlayer = function () {
        return this.player.nativeElement;
    };
    OpspotVideoTorrentPlayer.prototype.play = function () {
        var player = this.getPlayer();
        try {
            if (this.torrentReady) {
                player.play();
            }
            else {
                this.loadTorrent();
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    OpspotVideoTorrentPlayer.prototype.pause = function () {
        var player = this.getPlayer();
        try {
            player.pause();
        }
        catch (e) {
            console.error(e);
        }
    };
    OpspotVideoTorrentPlayer.prototype.toggle = function () {
        var player = this.getPlayer();
        if (player.paused) {
            this.play();
        }
        else {
            this.pause();
        }
    };
    OpspotVideoTorrentPlayer.prototype.resumeFromTime = function (time) {
        if (time === void 0) { time = 0; }
        var player = this.getPlayer();
        try {
            if (this.torrentReady) {
                player.currentTime = time;
                this.play();
            }
            else {
                this.deferredResumeFromTime = time;
                if (!this.loading) {
                    this.loadTorrent();
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    OpspotVideoTorrentPlayer.prototype.isPlaying = function () {
        var player = this.getPlayer();
        return !player.paused;
    };
    OpspotVideoTorrentPlayer.prototype.isLoading = function () {
        return this.loading;
    };
    OpspotVideoTorrentPlayer.prototype.requestFullScreen = function () {
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
    OpspotVideoTorrentPlayer.prototype.getInfo = function () {
        return this.torrentInfo;
    };
    OpspotVideoTorrentPlayer.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    //
    OpspotVideoTorrentPlayer.prototype.loadTorrent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var torrentFile, infoHash, webSeed, response, e_1, torrent, file, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.loading) {
                            return [2 /*return*/];
                        }
                        else if (this.torrentReady) {
                            this.play();
                            return [2 /*return*/];
                        }
                        this.removeTorrent();
                        this.loading = true;
                        this.torrentReady = false;
                        this.detectChanges();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.get("api/v2/media/magnet/" + this.src)];
                    case 2:
                        response = _a.sent();
                        torrentFile = base64_to_blob_1.default(response.encodedTorrent);
                        infoHash = response.infoHash;
                        webSeed = response.httpSrc;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.loading = false;
                        this.detectChanges();
                        console.error('[TorrentVideo] Magnet download', e_1);
                        this._emitError(e_1);
                        return [2 /*return*/];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        this.torrentId = infoHash;
                        return [4 /*yield*/, this.webtorrent.add(torrentFile, infoHash)];
                    case 5:
                        torrent = _a.sent();
                        if (webSeed) {
                            torrent.addWebSeed(webSeed);
                        }
                        this.loading = false;
                        this.detectChanges();
                        file = torrent.files.find(function (file) { return file.name.endsWith('.mp4'); });
                        if (!file) {
                            this.loading = false;
                            this.detectChanges();
                            this.webtorrent.remove(this.torrentId);
                            this.torrentId = void 0;
                            console.error('[TorrentVideo] Video file not found');
                            this._emitError('E_NO_FILE');
                            return [2 /*return*/];
                        }
                        file.renderTo(this.getPlayer(), function (err) {
                            if (err) {
                                _this.loading = false;
                                _this.detectChanges();
                                _this.webtorrent.remove(_this.torrentId);
                                _this.torrentId = void 0;
                                console.error('[TorrentVideo] Video render', err);
                                _this._emitError(err);
                                return;
                            }
                            _this.loading = false;
                            _this.torrentReady = true;
                            _this.detectChanges();
                            if (typeof _this.deferredResumeFromTime) {
                                var time = _this.deferredResumeFromTime;
                                _this.deferredResumeFromTime = void 0;
                                _this.resumeFromTime(time);
                            }
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        e_2 = _a.sent();
                        this.loading = false;
                        this.detectChanges();
                        console.error('[TorrentVideo] Webtorrent general error', e_2);
                        this._emitError(e_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    OpspotVideoTorrentPlayer.prototype.removeTorrent = function () {
        if (this.torrentId) {
            this.webtorrent.remove(this.torrentId);
            this.torrentId = void 0;
            this.loading = false;
            this.torrentReady = false;
        }
    };
    __decorate([
        core_1.ViewChild('player'),
        __metadata("design:type", core_1.ElementRef)
    ], OpspotVideoTorrentPlayer.prototype, "player", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], OpspotVideoTorrentPlayer.prototype, "muted", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OpspotVideoTorrentPlayer.prototype, "poster", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], OpspotVideoTorrentPlayer.prototype, "autoplay", void 0);
    __decorate([
        core_1.Input('src'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], OpspotVideoTorrentPlayer.prototype, "_src", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoTorrentPlayer.prototype, "onPlay", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoTorrentPlayer.prototype, "onPause", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoTorrentPlayer.prototype, "onEnd", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoTorrentPlayer.prototype, "onError", void 0);
    OpspotVideoTorrentPlayer = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-video--torrent-player',
            templateUrl: 'torrent.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            client_1.Client,
            webtorrent_service_1.WebtorrentService])
    ], OpspotVideoTorrentPlayer);
    return OpspotVideoTorrentPlayer;
}());
exports.OpspotVideoTorrentPlayer = OpspotVideoTorrentPlayer;
//# sourceMappingURL=torrent.component.js.map