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
var volume_slider_component_1 = require("./volume-slider.component");
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
describe('OpspotVideoVolumeSlider', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [volume_slider_component_1.OpspotVideoVolumeSlider],
            imports: [
                forms_1.FormsModule,
                testing_2.RouterTestingModule,
                common_1.CommonModule
            ],
        })
            .compileComponents(); // compile template and css
    }));
    beforeEach(function (done) {
        window.addEventListener = function () { };
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(volume_slider_component_1.OpspotVideoVolumeSlider);
        comp = fixture.componentInstance;
        var video = document.createElement('video');
        video.src = 'thisisavideo.mp4';
        comp.element = video;
        var playerRef = new OpspotVideoDirectHttpPlayerMock();
        playerRef.getPlayer = function () { return video; };
        comp.playerRef = playerRef;
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
    it('should render a hidden slider', function () {
        var wrapper = fixture.debugElement.query(platform_browser_1.By.css('.m-video--volume-control-wrapper'));
        var control = fixture.debugElement.query(platform_browser_1.By.css('.m-video--volume-control'));
        var icon = fixture.debugElement.query(platform_browser_1.By.css('.material-icons'));
        var input = fixture.debugElement.query(platform_browser_1.By.css('input'));
        expect(control).not.toBeNull();
        expect(input).not.toBeNull();
        expect(icon).not.toBeNull();
        expect(wrapper).not.toBeNull();
    });
});
//# sourceMappingURL=volume-slider.component.spec.js.map