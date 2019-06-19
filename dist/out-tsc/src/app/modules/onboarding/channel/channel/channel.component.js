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
var upload_1 = require("../../../../services/api/upload");
var client_1 = require("../../../../services/api/client");
var session_1 = require("../../../../services/session");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ChannelSetupOnboardingComponent = /** @class */ (function () {
    function ChannelSetupOnboardingComponent(client, upload, session) {
        this.client = client;
        this.upload = upload;
        this.session = session;
        this.opspot = window.Opspot;
        this.user = session.getLoggedInUser();
    }
    ChannelSetupOnboardingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.displayNameSubscription = rxjs_1.fromEvent(this.displayNameInput.nativeElement, 'keyup')
            .pipe(operators_1.debounceTime(1000))
            .subscribe(function () { return _this.updateUsername(_this.displayNameInput.nativeElement.value); });
        this.descriptionSubscription = rxjs_1.fromEvent(this.descriptionInput.nativeElement, 'keyup')
            .pipe(operators_1.debounceTime(1000))
            .subscribe(function () { return _this.updateDescription(_this.descriptionInput.nativeElement.value); });
    };
    ChannelSetupOnboardingComponent.prototype.upload_avatar = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.upload.post('api/v1/channel/avatar', [file], { filekey: 'file' })];
                    case 1:
                        response = _a.sent();
                        this.updateUser('icontime', Date.now());
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChannelSetupOnboardingComponent.prototype.updateUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.post('api/v1/channel/info', { name: username })];
                    case 1:
                        _a.sent();
                        this.updateUser('name', username);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChannelSetupOnboardingComponent.prototype.updateDescription = function (briefDescription) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.post('api/v1/channel/info', { briefdescription: briefDescription })];
                    case 1:
                        _a.sent();
                        this.updateUser('briefdescription', briefDescription);
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        console.error(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChannelSetupOnboardingComponent.prototype.updateUser = function (prop, value) {
        var opspot = Object.assign({}, window.Opspot);
        opspot.user[prop] = value;
        window.Opspot = opspot;
        this.session.userEmitter.next(window.Opspot.user);
    };
    ChannelSetupOnboardingComponent.items = ['avatar', 'display_name', 'briefdescription'];
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ChannelSetupOnboardingComponent.prototype, "pendingItems", void 0);
    __decorate([
        core_1.ViewChild('displayNameInput'),
        __metadata("design:type", core_1.ElementRef)
    ], ChannelSetupOnboardingComponent.prototype, "displayNameInput", void 0);
    __decorate([
        core_1.ViewChild('descriptionInput'),
        __metadata("design:type", core_1.ElementRef)
    ], ChannelSetupOnboardingComponent.prototype, "descriptionInput", void 0);
    ChannelSetupOnboardingComponent = __decorate([
        core_1.Component({
            selector: 'm-channel--onboarding--onboarding',
            template: "\n    <div class=\"m-channelOnboarding__slide\">\n\n      <div class=\"m-channelOnboardingSlide__component\">\n        <label>Choose an avatar</label>\n\n        <opspot-avatar\n          [object]=\"session.getLoggedInUser()\"\n          [editMode]=\"true\"\n          [icon]=\"'cloud_upload'\"\n          [showPrompt]=\"false\"\n          (added)=\"upload_avatar($event)\"\n          [waitForDoneSignal]=\"false\"\n        ></opspot-avatar>\n      </div>\n\n      <div class=\"m-channelOnboardingSlide__component\">\n        <label for=\"display-name\" i18n=\"@CHANNEL__ONBOARDING__CHOOSE_DISPLAY_NAME\">\n          Choose your display name\n        </label>\n        <input\n          id=\"display-name\"\n          #displayNameInput\n          placeholder=\"eg. John Smith\"\n          i18n-placeholder=\"@CHANNEL__ONBOARDING__USERNAME_PLACEHOLDER\"\n          [ngModel]=\"user.username\"\n        >\n      </div>\n\n      <div class=\"m-channelOnboardingSlide__component\">\n        <label for=\"description\" i18n=\"@CHANNEL__ONBOARDING__BRIEFLY_DESCRIBE_YOUR_CHANNEL\">\n          Briefly describe your channel\n        </label>\n        <input\n          id=\"description\"\n          #descriptionInput\n          placeholder=\"eg. Independent Journalist\"\n          i18n-placeholder=\"@CHANNEL__ONBOARDING__BRIEFDESCRIPTION_PLACEHOLDER\"\n          [ngModel]=\"user.briefdescription\"\n        >\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [client_1.Client,
            upload_1.Upload,
            session_1.Session])
    ], ChannelSetupOnboardingComponent);
    return ChannelSetupOnboardingComponent;
}());
exports.ChannelSetupOnboardingComponent = ChannelSetupOnboardingComponent;
//# sourceMappingURL=channel.component.js.map