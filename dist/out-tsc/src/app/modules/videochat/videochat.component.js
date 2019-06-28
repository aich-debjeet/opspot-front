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
var videochat_service_1 = require("./videochat.service");
var VideoChatComponent = /** @class */ (function () {
    function VideoChatComponent(service, cd) {
        this.service = service;
        this.cd = cd;
        this.opspot = window.Opspot;
        this.isActive = false;
    }
    VideoChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isActive$ = this.service.activate$.subscribe(function (configs) {
            if (configs) {
                _this.configs = configs;
                _this.startJitsi();
            }
            else {
                _this.isActive = false;
            }
            _this.cd.markForCheck();
            _this.cd.detectChanges();
        });
    };
    VideoChatComponent.prototype.ngOnDestroy = function () {
        this.service.deactivate();
        this.isActive$.unsubscribe();
    };
    VideoChatComponent.prototype.startJitsi = function () {
        var _this = this;
        this.isActive = true;
        this.cd.markForCheck();
        this.cd.detectChanges();
        var domain = 'meet.jit.si';
        var options = {
            roomName: this.configs.roomName,
            width: '100%',
            parentNode: this.meet.nativeElement,
            avatarUrl: this.opspot.cdn_url + "icon/" + this.opspot.user.guid + "/large/" + this.opspot.user.icontime,
            interfaceConfigOverwrite: {
                // filmStripOnly: true,
                DEFAULT_REMOTE_DISPLAY_NAME: this.configs.username,
                SHOW_JITSI_WATERMARK: false,
                JITSI_WATERMARK_LINK: '',
                SHOW_WATERMARK_FOR_GUESTS: false,
                APP_NAME: 'Opspot',
                TOOLBAR_BUTTONS: [
                    // main toolbar
                    'microphone', 'camera', 'desktop', 'fullscreen', 'fodeviceselection', 'hangup', 'tileview',
                    // extended toolbar
                    'settings',
                    'raisehand',
                    'invite',
                    'livestreaming',
                    'videoquality', 'filmstrip',
                    'stats',
                ],
            },
        };
        var api = new JitsiMeetExternalAPI(domain, options);
        api.executeCommand('displayName', this.configs.username || 'Unknown Opspot User');
        api.executeCommand('avatarUrl', this.opspot.cdn_url + "icon/" + this.opspot.user.guid + "/large/" + this.opspot.user.icontime);
        api.on('videoConferenceLeft', function () {
            _this.service.deactivate();
        });
    };
    VideoChatComponent.prototype.end = function () {
        // this.service.isActive.next(false);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VideoChatComponent.prototype, "configs", void 0);
    __decorate([
        core_1.HostBinding('class.is-active'),
        __metadata("design:type", Object)
    ], VideoChatComponent.prototype, "isActive", void 0);
    __decorate([
        core_1.ViewChild('meet'),
        __metadata("design:type", Object)
    ], VideoChatComponent.prototype, "meet", void 0);
    VideoChatComponent = __decorate([
        core_1.Component({
            selector: 'm-videochat',
            templateUrl: './videochat.component.html',
        }),
        __metadata("design:paramtypes", [videochat_service_1.VideoChatService,
            core_1.ChangeDetectorRef])
    ], VideoChatComponent);
    return VideoChatComponent;
}());
exports.VideoChatComponent = VideoChatComponent;
//# sourceMappingURL=videochat.component.js.map