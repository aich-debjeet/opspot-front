"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var api_1 = require("../../../../services/api");
var session_1 = require("../../../../services/session");
var WireConsoleSettingsComponent = /** @class */ (function () {
    function WireConsoleSettingsComponent(session, client, upload, cd) {
        this.session = session;
        this.client = client;
        this.upload = upload;
        this.cd = cd;
        this.savedEmitter = new core_1.EventEmitter();
        this.ts = Date.now();
        this.user = window.Opspot.user;
        this.opspot = window.Opspot;
        this.error = '';
        this.exclusive = {
            intro: '',
            background: 0,
            saving: false,
            saved: false
        };
        this.previewEntity = false;
        this.preview = {};
    }
    WireConsoleSettingsComponent.prototype.ngOnInit = function () {
        this.setUp();
    };
    WireConsoleSettingsComponent.prototype.setUp = function () {
        if (this.user.merchant.exclusive) {
            this.exclusive = this.user.merchant.exclusive;
        }
        this.updatePreviewEntity();
    };
    WireConsoleSettingsComponent.prototype.updatePreviewEntity = function () {
        this.previewEntity = {
            _preview: true,
            wire_threshold: {
                type: 'money',
                min: 50
            },
            ownerObj: __assign({}, this.user, { merchant: {
                    exclusive: {
                        intro: this.exclusive.intro,
                        _backgroundPreview: this.preview.src ||
                            this.opspot.cdn_url + 'fs/v1/paywall/preview/' + this.session.getLoggedInUser().guid + '/' + this.exclusive.background,
                    }
                } })
        };
        this.detectChanges();
    };
    WireConsoleSettingsComponent.prototype.updatePreview = function (input) {
        var _this = this;
        var file = input ? input.files[0] : null;
        var reader = new FileReader();
        reader.onloadend = function () {
            input.src = typeof reader.result === 'string' ? reader.result : reader.result.toString();
            _this.preview = { src: typeof reader.result === 'string' ? reader.result : reader.result.toString() };
            _this.updatePreviewEntity();
        };
        reader.readAsDataURL(file);
        this.detectChanges();
    };
    WireConsoleSettingsComponent.prototype.uploadPreview = function (input) {
        var _this = this;
        var file = input ? input.files[0] : null;
        if (!file) {
            return Promise.resolve(true);
        }
        return this.upload.post('api/v1/merchant/exclusive-preview', [file], {}, function (progress) {
            console.log(progress);
        })
            .then(function (response) {
            input.value = null;
            _this.exclusive.background = Math.floor(Date.now() / 1000);
            _this.detectChanges();
            return true;
        })
            .catch(function (e) {
            alert('Sorry, there was a problem. Try again.');
            input.value = null;
            _this.detectChanges();
            return false;
        });
    };
    WireConsoleSettingsComponent.prototype.save = function (file) {
        var _this = this;
        if (this.exclusive.saved || this.exclusive.saving) {
            return;
        }
        this.exclusive.saved = false;
        this.exclusive.saving = true;
        this.detectChanges();
        return this.uploadPreview(file)
            .then(function () {
            return _this.client.post('api/v1/merchant/exclusive', _this.exclusive)
                .then(function () {
                _this.opspot.user.merchant.exclusive = _this.exclusive;
                _this.exclusive.saved = true;
                _this.exclusive.saving = false;
                _this.detectChanges();
                setTimeout(function () { return _this.savedEmitter.emit(true); }, 2500);
            });
        });
    };
    WireConsoleSettingsComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.Output('saved'),
        __metadata("design:type", core_1.EventEmitter)
    ], WireConsoleSettingsComponent.prototype, "savedEmitter", void 0);
    WireConsoleSettingsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-wire-console-settings',
            templateUrl: 'settings.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, api_1.Upload, core_1.ChangeDetectorRef])
    ], WireConsoleSettingsComponent);
    return WireConsoleSettingsComponent;
}());
exports.WireConsoleSettingsComponent = WireConsoleSettingsComponent;
//# sourceMappingURL=settings.component.js.map