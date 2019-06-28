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
///<reference path="../../../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/router/testing");
var common_1 = require("@angular/common");
var progress_bar_component_1 = require("./progress-bar.component");
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
    return OpspotVideoDirectHttpPlayerMock;
}());
describe('OpspotVideoProgressBar', function () {
    var comp;
    var fixture;
    var window = {};
    var e;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [progress_bar_component_1.OpspotVideoProgressBar],
            imports: [
                forms_1.FormsModule,
                testing_2.RouterTestingModule,
                common_1.CommonModule
            ],
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        window.removeEventListener = function () { };
        window.addEventListener = function () { };
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(progress_bar_component_1.OpspotVideoProgressBar);
        comp = fixture.componentInstance;
        var video = document.createElement('video');
        video.src = 'thisisavideo.mp4';
        comp.element = video;
        var playerRef = new OpspotVideoDirectHttpPlayerMock();
        playerRef.getPlayer = function () { return video; };
        comp.playerRef = playerRef;
        spyOn(window, 'removeEventListener').and.stub();
        spyOn(window, 'addEventListener').and.stub();
        spyOn(comp.element, 'addEventListener').and.stub();
        fixture.detectChanges();
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
        var seeker = fixture.debugElement.query(platform_browser_1.By.css('#seeker'));
        var seekerBall = fixture.debugElement.query(platform_browser_1.By.css('.seeker-ball'));
        var stamps = fixture.debugElement.query(platform_browser_1.By.css('.progress-stamps'));
        expect(seeker).not.toBeNull();
        expect(seekerBall).not.toBeNull();
        expect(stamps).not.toBeNull();
    });
    it('time is properly calculated', function () {
        comp.duration = 111;
        comp.calculateTime();
        fixture.detectChanges();
        expect(comp.time).toEqual({ minutes: '01', seconds: 51 });
    });
    it('time is properly calculated', function () {
        comp.duration = 113;
        comp.element.currentTime = 111;
        comp.calculateElapsed();
        fixture.detectChanges();
        expect(comp.time).toEqual({ minutes: '00', seconds: '00' });
    });
    it('time is properly calculated', function () {
        comp.duration = 9;
        comp.calculateTime();
        fixture.detectChanges();
        expect(comp.time).toEqual({ minutes: '00', seconds: '09' });
    });
    it('time is properly calculated', function () {
        comp.duration = 9;
        comp.element.currentTime = 9;
        comp.calculateElapsed();
        fixture.detectChanges();
        expect(comp.time).toEqual({ minutes: '00', seconds: '00' });
    });
    it('call play on togglepause', function () {
        spyOn(comp.element, 'play').and.callThrough();
        comp.togglePause();
        fixture.detectChanges();
        expect(comp.element.play).toHaveBeenCalled();
    });
    it('moves over time depending on the event', function () {
        comp.element.currentTime = 11;
        fixture.detectChanges();
        comp.moveToTime(2);
        fixture.detectChanges();
        expect(comp.element.currentTime).toBe(13);
    });
    it('execute control should call controls', function () {
        comp.element.currentTime = 11;
        fixture.detectChanges();
        var e = {};
        e.preventDefault = function () { };
        e.keyCode = 37;
        comp.executeControl(e);
        fixture.detectChanges();
        expect(comp.element.currentTime).toBe(9);
    });
    it('execute control should call controls', function () {
        comp.element.currentTime = 11;
        fixture.detectChanges();
        var e = {};
        e.preventDefault = function () { };
        e.keyCode = 39;
        comp.executeControl(e);
        fixture.detectChanges();
        expect(comp.element.currentTime).toBe(13);
    });
    it('execute control should call controls', function () {
        comp.element.currentTime = 11;
        spyOn(comp.element, 'play').and.callThrough();
        fixture.detectChanges();
        var e = {};
        e.preventDefault = function () { };
        e.keyCode = 32;
        comp.executeControl(e);
        fixture.detectChanges();
        expect(comp.element.play).toHaveBeenCalled();
    });
    it('should calculate remaining', function () {
        comp.element.currentTime = 11;
        comp.duration = 111;
        fixture.detectChanges();
        comp.calculateRemaining();
        fixture.detectChanges();
        expect(comp.remaining).toBeNull();
    });
    it('should calculate remaining', function () {
        comp.element.currentTime = 3;
        comp.duration = 111;
        fixture.detectChanges();
        comp.calculateRemaining();
        fixture.detectChanges();
        expect(comp.elapsed).toEqual({ minutes: '00', seconds: '00' });
    });
    it('should calculate elapsed', function () {
        comp.element.currentTime = 11;
        comp.duration = 111;
        fixture.detectChanges();
        comp.calculateElapsed();
        fixture.detectChanges();
        expect(comp.elapsed).toEqual({ minutes: '00', seconds: 11 });
    });
});
//# sourceMappingURL=progress-bar.component.spec.js.map