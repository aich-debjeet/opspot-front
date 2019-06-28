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
///<reference path="../../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/router/testing");
var common_1 = require("@angular/common");
var api_1 = require("../../../../services/api");
var client_mock_spec_1 = require("../../../../../tests/client-mock.spec");
var scroll_1 = require("../../../../services/ux/scroll");
var scroll_service_mock_spec_1 = require("../../../../../tests/scroll-service-mock.spec");
var video_component_1 = require("./video.component");
var abbr_1 = require("../../../../common/pipes/abbr");
var tooltip_component_1 = require("../../../../common/components/tooltip/tooltip.component");
var webtorrent_service_1 = require("../../../webtorrent/webtorrent.service");
var webtorrent_service_mock_spec_1 = require("../../../../../tests/webtorrent-service-mock.spec");
var OpspotVideoDirectHttpPlayerMock = /** @class */ (function () {
    function OpspotVideoDirectHttpPlayerMock() {
        this.onPlay = new core_1.EventEmitter();
        this.onPause = new core_1.EventEmitter();
        this.onEnd = new core_1.EventEmitter();
        this.onError = new core_1.EventEmitter();
        this.getPlayer = function () {
            return null;
        };
        this.play = function () { };
        this.pause = function () { };
        this.toggle = function () { };
        this.resumeFromTime = function () { };
        this.isLoading = function () {
            return false;
        };
        this.isPlaying = function () {
            return false;
        };
        this.requestFullScreen = jasmine.createSpy('requestFullScreen').and.stub();
        this.getInfo = function () { };
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], OpspotVideoDirectHttpPlayerMock.prototype, "muted", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OpspotVideoDirectHttpPlayerMock.prototype, "poster", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], OpspotVideoDirectHttpPlayerMock.prototype, "autoplay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OpspotVideoDirectHttpPlayerMock.prototype, "src", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoDirectHttpPlayerMock.prototype, "onPlay", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoDirectHttpPlayerMock.prototype, "onPause", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoDirectHttpPlayerMock.prototype, "onEnd", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoDirectHttpPlayerMock.prototype, "onError", void 0);
    OpspotVideoDirectHttpPlayerMock = __decorate([
        core_1.Component({
            selector: 'm-video--direct-http-player',
            template: ''
        })
    ], OpspotVideoDirectHttpPlayerMock);
    return OpspotVideoDirectHttpPlayerMock;
}());
var HTMLVideoElementMock = /** @class */ (function () {
    function HTMLVideoElementMock() {
        this.webkitEnterFullScreen = jasmine.createSpy('webkitEnterFullScreen').and.stub();
    }
    return HTMLVideoElementMock;
}());
var OpspotVideoTorrentPlayerMock = /** @class */ (function () {
    function OpspotVideoTorrentPlayerMock() {
        this.onPlay = new core_1.EventEmitter();
        this.onPause = new core_1.EventEmitter();
        this.onEnd = new core_1.EventEmitter();
        this.onError = new core_1.EventEmitter();
        this.getPlayer = function () {
            return null;
        };
        this.play = function () { };
        this.pause = function () { };
        this.toggle = function () { };
        this.resumeFromTime = function () {
        };
        this.isLoading = function () {
            return false;
        };
        this.isPlaying = function () {
            return false;
        };
        this.requestFullScreen = jasmine.createSpy('requestFullScreen').and.stub();
        this.getInfo = function () { };
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], OpspotVideoTorrentPlayerMock.prototype, "muted", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OpspotVideoTorrentPlayerMock.prototype, "poster", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], OpspotVideoTorrentPlayerMock.prototype, "autoplay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OpspotVideoTorrentPlayerMock.prototype, "src", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoTorrentPlayerMock.prototype, "onPlay", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoTorrentPlayerMock.prototype, "onPause", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoTorrentPlayerMock.prototype, "onEnd", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoTorrentPlayerMock.prototype, "onError", void 0);
    OpspotVideoTorrentPlayerMock = __decorate([
        core_1.Component({
            selector: 'm-video--torrent-player',
            template: ''
        })
    ], OpspotVideoTorrentPlayerMock);
    return OpspotVideoTorrentPlayerMock;
}());
var OpspotVideoVolumeSliderMock = /** @class */ (function () {
    function OpspotVideoVolumeSliderMock() {
    }
    OpspotVideoVolumeSliderMock.prototype.bindToElement = function () { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotVideoVolumeSliderMock.prototype, "player", void 0);
    OpspotVideoVolumeSliderMock = __decorate([
        core_1.Component({
            selector: 'm-video--volume-slider',
            template: ''
        })
    ], OpspotVideoVolumeSliderMock);
    return OpspotVideoVolumeSliderMock;
}());
exports.OpspotVideoVolumeSliderMock = OpspotVideoVolumeSliderMock;
var OpspotVideoQualitySelectorMock = /** @class */ (function () {
    function OpspotVideoQualitySelectorMock() {
        this.selectEmitter = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input('qualities'),
        __metadata("design:type", Array)
    ], OpspotVideoQualitySelectorMock.prototype, "qualities", void 0);
    __decorate([
        core_1.Input('current'),
        __metadata("design:type", String)
    ], OpspotVideoQualitySelectorMock.prototype, "current", void 0);
    __decorate([
        core_1.Output('select'),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotVideoQualitySelectorMock.prototype, "selectEmitter", void 0);
    OpspotVideoQualitySelectorMock = __decorate([
        core_1.Component({
            selector: 'm-video--quality-selector',
            template: ''
        })
    ], OpspotVideoQualitySelectorMock);
    return OpspotVideoQualitySelectorMock;
}());
exports.OpspotVideoQualitySelectorMock = OpspotVideoQualitySelectorMock;
var OpspotVideoProgressBarMock = /** @class */ (function () {
    function OpspotVideoProgressBarMock() {
    }
    OpspotVideoProgressBarMock.prototype.getSeeker = function () {
    };
    OpspotVideoProgressBarMock.prototype.bindToElement = function () { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotVideoProgressBarMock.prototype, "player", void 0);
    OpspotVideoProgressBarMock = __decorate([
        core_1.Component({
            selector: 'm-video--progress-bar',
            template: ''
        })
    ], OpspotVideoProgressBarMock);
    return OpspotVideoProgressBarMock;
}());
exports.OpspotVideoProgressBarMock = OpspotVideoProgressBarMock;
var MDLMock = /** @class */ (function () {
    function MDLMock() {
    }
    MDLMock = __decorate([
        core_1.Directive({
            selector: '[mdl]',
            inputs: ['mdl']
        })
    ], MDLMock);
    return MDLMock;
}());
exports.MDLMock = MDLMock;
describe('OpspotVideo', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                MDLMock,
                abbr_1.AbbrPipe,
                OpspotVideoQualitySelectorMock,
                OpspotVideoProgressBarMock,
                OpspotVideoVolumeSliderMock,
                OpspotVideoDirectHttpPlayerMock,
                OpspotVideoTorrentPlayerMock,
                video_component_1.OpspotVideoComponent,
                tooltip_component_1.TooltipComponent,
            ],
            imports: [
                forms_1.FormsModule,
                testing_2.RouterTestingModule,
                common_1.CommonModule,
            ],
            providers: [
                { provide: scroll_1.ScrollService, useValue: scroll_service_mock_spec_1.scrollServiceMock },
                { provide: api_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: webtorrent_service_1.WebtorrentService, useValue: webtorrent_service_mock_spec_1.webtorrentServiceMock }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(video_component_1.OpspotVideoComponent);
        client_mock_spec_1.clientMock.response = {};
        comp = fixture.componentInstance;
        comp.guid = '1';
        comp.current = {
            type: 'direct-http',
            src: 'thisisavideo.mp4'
        };
        fixture.detectChanges(); // re-render
        // const video = document.createElement('video');
        // video.src = 'thisisavideo.mp4';
        var video = new HTMLVideoElementMock();
        comp.playerRef.getPlayer = function () { return video; };
        fixture.detectChanges(); // re-render
        //comp.progressBar.getSeeker = () => {};
        // fixture.detectChanges();
        if (fixture.isStable()) {
            done();
        }
        else {
            fixture.whenStable().then(function () {
                done();
            });
        }
    });
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('should have a Play icon and a Control bar', function () {
        var playIcon = fixture.debugElement.query(platform_browser_1.By.css('.opspot-video-play-icon'));
        var videoBar = fixture.debugElement.query(platform_browser_1.By.css('.opspot-video-bar-full'));
        expect(playIcon).not.toBeNull();
        expect(videoBar).not.toBeNull();
    });
    // it('On hover Control bar should be visible', () => {
    //   expect(comp.playerRef.getPlayer()).not.toBeNull();
    //   comp.playerRef.getPlayer().dispatchEvent(new Event('hover'));
    //   const videoBar = fixture.debugElement.query(By.css('.opspot-video-bar-full'));
    //   expect(videoBar.nativeElement.hasAttribute('hidden')).toEqual(false);
    //   const quality = fixture.debugElement.query(By.css('m-video--quality-selector'));
    //   const volume = fixture.debugElement.query(By.css('m-video--volume-slider'));
    //   const progressBar = fixture.debugElement.query(By.css('m-video--progress-bar'));
    //   expect(progressBar).not.toBeNull();
    //   expect(quality).toBeNull();
    //   expect(volume).not.toBeNull();
    // });
    it('Should call counter', function () {
        var video = fixture.debugElement.query(platform_browser_1.By.css('video'));
        comp.playCountDisabled = false;
        comp.playCount = -1;
        comp.log = '1';
        fixture.detectChanges();
        var calls = client_mock_spec_1.clientMock.get['calls'];
        expect(calls.mostRecent().args[0]).toEqual('api/v1/analytics/@counter/play/1');
    });
    it('If error loading then try to confirm that is being transcoded', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        comp.onError();
        jasmine.clock().tick(100);
        fixture.detectChanges();
        var calls = client_mock_spec_1.clientMock.get['calls'];
        expect(calls.mostRecent().args[0]).toEqual('api/v1/media/transcoding/1');
    }));
    it('should set muted', function () {
        comp.muted = true;
        fixture.detectChanges();
        expect(comp.muted).toEqual(true);
    });
    it('should sets _autoplay', function () {
        comp._autoplay = false;
        fixture.detectChanges();
        expect(comp.autoplay).toEqual(false);
    });
    it('should set src', function () {
        comp._src = [];
        fixture.detectChanges();
        expect(comp.src).toEqual([]);
    });
    // it('should set loop', () => {
    //   comp.loop = true;
    //   fixture.detectChanges();
    //   expect(comp.loop).toEqual(true);
    // });
    //
    // it('should sets visibleplay', () => {
    //   comp.visibleplay = false;
    //   fixture.detectChanges();
    //   expect(comp.visibleplay).toEqual(false);
    // });
    it('should sets _playCount', function () {
        comp._playCount = 70;
        fixture.detectChanges();
        expect(comp.playCount).toEqual(70);
    });
    it('should sets _playCount in 0', function () {
        comp._playCount = false;
        fixture.detectChanges();
        expect(comp.playCountDisabled).toEqual(true);
    });
    it('Should Select Quality, reloading and playing', testing_1.fakeAsync(function () {
        comp._src = [];
        comp._torrent = [];
        fixture.detectChanges();
        comp.playerRef.getPlayer().currentTime = 39;
        spyOn(comp.playerRef, 'resumeFromTime').and.stub();
        spyOn(comp, 'reorderSourcesBasedOnQuality').and.callThrough();
        spyOn(comp, 'changeSources').and.callThrough();
        comp.selectedQuality('360');
        jasmine.clock().tick(100);
        jasmine.clock().tick(100);
        expect(comp.playerRef.resumeFromTime).toHaveBeenCalled();
        expect(comp.reorderSourcesBasedOnQuality).toHaveBeenCalled();
        expect(comp.changeSources).toHaveBeenCalled();
    }));
    // it('should set is visible', () => {
    //   comp.playerRef.getPlayer().getBoundingClientRect = () => {
    //     return <any>{'top':1};
    //   }
    //   comp.scroll.view = {};
    //   comp.scroll.view.clientHeight = 10;
    //   comp.isVisible();
    //   fixture.detectChanges();
    //   expect(comp.element.muted).toEqual(false);
    // });
    // it('should set is visible', () => {
    //   comp.element.getBoundingClientRect = () => {
    //     return {'top':100};
    //   }
    //   comp.scroll.view = {};
    //   comp.scroll.view.clientHeight = 10;
    //   comp.isVisible();
    //   fixture.detectChanges();
    //   expect(comp.element.muted).toEqual(false);
    // });
    // it('should set is visible', () => {
    //   comp.autoplay = true;
    //   comp.isVisible();
    //   fixture.detectChanges();
    //   expect(comp.isVisible()).toEqual(undefined);
    // });
});
//# sourceMappingURL=video.component.spec.js.map