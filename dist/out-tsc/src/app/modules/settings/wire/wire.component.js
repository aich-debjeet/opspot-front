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
var session_1 = require("../../../services/session");
var api_1 = require("../../../services/api");
var SettingsWireComponent = /** @class */ (function () {
    function SettingsWireComponent(session, client, upload, cd) {
        this.session = session;
        this.client = client;
        this.upload = upload;
        this.cd = cd;
        this.inProgress = false;
        this.ts = Date.now();
        this.user = window.Opspot.user;
        this.opspot = window.Opspot;
        this.error = '';
        this.exclusive = {
            intro: '',
            background: 0,
            saved: false
        };
        this.rewardsSaved = false;
        this.previewEntity = false;
        this.preview = {};
        this.rewards = this.opspot.user.wire_rewards;
    }
    SettingsWireComponent.prototype.ngOnInit = function () {
        this.setUp();
    };
    SettingsWireComponent.prototype.setUp = function () {
        if (this.user.merchant.exclusive) {
            this.exclusive = this.user.merchant.exclusive;
        }
        this.updatePreviewEntity();
    };
    SettingsWireComponent.prototype.updatePreviewEntity = function () {
        this.previewEntity = {
            _preview: true,
            wire_threshold: {
                type: 'tokens',
                min: 1
            },
            ownerObj: __assign({}, this.user, { merchant: {
                    exclusive: {
                        intro: this.exclusive.intro,
                        _backgroundPreview: this.preview.src ||
                            this.opspot.cdn_url + 'fs/v1/paywall/preview/' + this.session.getLoggedInUser().guid + '/' + this.exclusive.background,
                    }
                } })
        };
        this.exclusive.saved = false;
        this.detectChanges();
    };
    SettingsWireComponent.prototype.updatePreview = function (input) {
        var _this = this;
        var file = input ? input.files[0] : null;
        var reader = new FileReader();
        reader.onloadend = function () {
            input.src = typeof reader.result === 'string' ? reader.result : reader.result.toString();
            _this.backgroundFile = input;
            _this.preview = { src: reader.result };
            _this.updatePreviewEntity();
        };
        reader.readAsDataURL(file);
        this.detectChanges();
    };
    SettingsWireComponent.prototype.uploadPreview = function (input) {
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
    SettingsWireComponent.prototype.canSubmit = function () {
        return !this.exclusive.saved && !this.rewardsSaved;
    };
    SettingsWireComponent.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inProgress = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!!this.exclusive.saved) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.savePreview()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        alert((e_1 && e_1.message) || 'Server error');
                        return [3 /*break*/, 5];
                    case 5:
                        this.inProgress = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingsWireComponent.prototype.savePreview = function () {
        var _this = this;
        this.exclusive.saved = false;
        this.detectChanges();
        return this.uploadPreview(this.backgroundFile)
            .then(function () {
            return _this.client.post('api/v1/merchant/exclusive', _this.exclusive)
                .then(function () {
                if (!_this.opspot.user.merchant) {
                    _this.opspot.user.merchant = {};
                }
                _this.opspot.user.merchant.exclusive = _this.exclusive;
                _this.exclusive.saved = true;
                _this.detectChanges();
            });
        });
    };
    SettingsWireComponent.prototype.onRewardsChange = function (rewards, type) {
        this.rewards.rewards[type] = rewards;
        this.rewardsSaved = false;
        this.detectChanges();
    };
    SettingsWireComponent.prototype.saveRewards = function () {
        var _this = this;
        this.rewards.rewards.tokens = this._cleanAndSortRewards(this.rewards.rewards.tokens);
        return this.client.post('api/v1/wire/rewards', {
            rewards: this.rewards
        })
            .then(function () {
            _this.rewardsSaved = true;
        });
    };
    SettingsWireComponent.prototype._cleanAndSortRewards = function (rewards) {
        if (!rewards) {
            return [];
        }
        return rewards
            .filter(function (reward) { return reward.amount || ("" + reward.description).trim(); })
            .map(function (reward) { return (__assign({}, reward, { amount: Math.abs(Math.floor(reward.amount || 0)) })); })
            .sort(function (a, b) { return a.amount > b.amount ? 1 : -1; });
    };
    SettingsWireComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    SettingsWireComponent = __decorate([
        core_1.Component({
            selector: 'm-settings--wire',
            templateUrl: 'wire.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.Default,
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            api_1.Upload,
            core_1.ChangeDetectorRef])
    ], SettingsWireComponent);
    return SettingsWireComponent;
}());
exports.SettingsWireComponent = SettingsWireComponent;
//# sourceMappingURL=wire.component.js.map